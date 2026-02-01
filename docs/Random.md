---
layout: default
title: Random
---
{%- assign images_path = {{site.baseurl}} | append: "/assets/images/" -%}
{%- assign bug_data_path = {{site.baseurl}} | append: "/assets/js/bug-data.json" -%}

<div class="random_bug_header" id="random_header">
    <button id="random_bug_button">New Random Bug</button>
    <button id="goto_order_button"></button>
    <button id="goto_family_button"></button>
</div>
<div class="random_bug" id="random_bug">
    <h3 id="bug_name"></h3>
    <i id="scientific"></i>
    <p id="desc"></p>
    <div id="bug_images"></div>
</div>

<script type="module">
    import {getAllBugs} from '{{site.baseurl}}/assets/js/bug_data_helper.js';

    function gotoPage(rel_path) {
        window.location.href = "{{site.url}}" + "{{site.baseurl}}/" + rel_path;
    }

    /* Returns a random bug from the data */
    async function getRandomBug() {
        var all_bugs = await getAllBugs();

        var random_bug = all_bugs[Math.floor(Math.random() * all_bugs.length)];

        console.log("Random bug: ", random_bug);

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
        order_btn.innerHTML = "go to " + bug["order"];
        order_btn.addEventListener("click", (event) => gotoPage(bug["order"], event));

        const family_btn = document.getElementById("goto_family_button");
        if (bug["group"]) {
            family_btn.style.display = 'inline';
            family_btn.innerHTML = "go to " + bug["group"];
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
    document.getElementById("random_bug_button").addEventListener('click', displayRandomBug);

</script>