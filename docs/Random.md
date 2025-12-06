---
layout: default
title: Random
---

{% comment %} {% include random_bug.html %} {% endcomment %}

{%- assign images_path = {{site.baseurl}} | append: "/assets/images/" -%}
{%- assign bug_data_path = {{site.baseurl}} | append: "/assets/js/bug-data.json" -%}

<div id="random_bug">
    <h2 id="bug_name"></h2>
    <i id="scientific"></i>
    <p id="desc"></p>
    <img id="bug_image_0" width="{{site.image_width}}">
    <img id="bug_image_1" width="{{site.image_width}}">
    <img id="bug_image_2" width="{{site.image_width}}">
    <img id="bug_image_3" width="{{site.image_width}}">
    <img id="bug_image_4" width="{{site.image_width}}">
</div>

<script>
    /* Returns a random bug from the data */
    async function getRandomBug() {
        console.log("Fetching bug data...");

        /* await is used within async functions to wait until the function returns to continue */
        var response = await fetch("{{bug_data_path}}");
        if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);}

        var bug_data = await response.json();

        var number_of_bugs = 0;
        var all_bugs = [];

        const bug_orders = Object.keys(bug_data);

        bug_orders.forEach((order, index) => {
            const bugs_in_order = bug_data[order];
            bugs_in_order.forEach((bug, index) => {
                number_of_bugs++;
                all_bugs.push(bug);
            });
        });
        
        var random_bug = null;
        var i = 0;
        /* could loop forever if there are no valid bugs */
        do {
            /* var random_bug_index = Math.floor(Math.random() * number_of_bugs); */
            random_bug = all_bugs[Math.floor(Math.random() * all_bugs.length)];

            console.log("Random bug: ", random_bug);
            i++;
        } while (i < 10 && (random_bug == null || random_bug["name"] == null))

        return random_bug;
    }

    /* edit html to add random bug */
    async function displayRandomBug() {
        var bug = await getRandomBug();
        console.log("Adding bug content to page...");

        /*const bug_image = document.createElement('img');

        console.log('{{images_path}}' + bug["images"][0]["path"]);
        bug_image.src = '{{images_path}}' + bug["images"][0]["path"]; 

        document.getElementById("main-content").appendChild(bug_image);*/

        document.getElementById("bug_name").innerHTML = bug["name"];
        document.getElementById("scientific").innerHTML = bug["scientific"];
        document.getElementById("desc").innerHTML = bug["desc"];


        bug["images"].forEach((image, index) => {
            /* todo - add new images instead of overwriting pre html */
            if (image && index < 5) {
                var img_id = "bug_image_" + index.toString();
                console.log(img_id);

                var bug_image = document.getElementById(img_id);

                bug_image.src = '{{images_path}}' + image["path"]; 
                bug_image.title = image["location"] + ", " + image["date"];
                if (image["width"]) {
                    /*bug_image.width = "\"" + image["width"] + "\""; cant resolve percent value when still loading or something*/
                    bug_image.style.width = image["width"];
                }
                
                console.log(bug_image);

            }
        });      
    }

    displayRandomBug(); 
</script>