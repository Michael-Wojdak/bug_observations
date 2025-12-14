---
layout: default
title: Random
---
{%- assign images_path = {{site.baseurl}} | append: "/assets/images/" -%}
{%- assign bug_data_path = {{site.baseurl}} | append: "/assets/js/bug-data.json" -%}

<div class="random_bug_header" id="random_header">
    <button onClick="displayRandomBug();">New Random Bug</button>
    <button id="goto_order_button"></button>
    <button id="goto_family_button"></button>
</div>
<div class="random_bug" id="random_bug">
    <h2 id="bug_name"></h2>
    <i id="scientific"></i>
    <p id="desc"></p>
    <div id="bug_images"></div>
</div>

<script>
    function gotoPage(rel_path) {
        window.location.href = "{{site.url}}" + "{{site.baseurl}}/" + rel_path;
    }

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
                bug["order"] = order;
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

    async function displayRandomBug() {
        const bug = await getRandomBug();
        displayBug(bug);
    }

    /* edit html to add random bug */
    async function displayBug(bug) {
        console.log("Adding bug content to page...");

        document.getElementById("bug_images").innerHTML = "";
        document.getElementById("bug_name").innerHTML = bug["name"];
        document.getElementById("scientific").innerHTML = bug["scientific"];
        document.getElementById("desc").innerHTML = bug["desc"];

        const order_btn = document.getElementById("goto_order_button");
        order_btn.innerHTML = "goto " + bug["order"];
        order_btn.addEventListener("click", (event) => gotoPage(bug["order"], event));

        const family_btn = document.getElementById("goto_family_button");
        if (bug["group"]) {
            family_btn.style.display = 'inline';
            family_btn.innerHTML = "goto " + bug["group"];
            family_btn.addEventListener("click", (event) => gotoPage(bug["order"] + "/" + bug["group"], event));
        } else {
            family_btn.style.display = 'none';
        }
        
        

        bug["images"].forEach(image => {
            if (image) {
                const bug_image = document.createElement('img');

                /*
                var img_id = "bug_image_" + index.toString();
                console.log(img_id);

                var bug_image = document.getElementById(img_id);
                */

                bug_image.src = '{{images_path}}' + image["path"]; 
                bug_image.title = image["location"] + ", " + image["date"];
                if (image["width"]) {
                    /*bug_image.width = "\"" + image["width"] + "\""; cant resolve percent value when still loading or something*/
                    bug_image.style.width = image["width"];
                } else {
                    bug_image.style.width = "{{site.image_width}}";
                }
                
                console.log(bug_image);

                document.getElementById("bug_images").appendChild(bug_image);
                /* Add a space in-between side-by-side images */
                document.getElementById("bug_images").appendChild(document.createTextNode(" "));
            }
        });      
    }
    
    displayRandomBug();

</script>