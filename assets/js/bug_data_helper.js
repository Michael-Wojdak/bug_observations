---
layout: null
permalink: /assets/js/bug_data_helper.js
---
{%- assign images_path = {{site.baseurl}} | append: "/assets/images/" -%}
{%- assign bug_data_path = {{site.baseurl}} | append: "/assets/js/bug-data.json" -%}


/* Compliles all bugs from each order into a single list */
export async function getAllBugs() {
    console.log("Fetching bug data...");

    /* await is used within async functions to wait until the function returns to continue */
    var response = await fetch("{{bug_data_path}}");
    if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);}

    var bug_data = await response.json();

    var all_bugs = [];

    const bug_orders = Object.keys(bug_data);

    bug_orders.forEach((order, index) => {
        const bugs_in_order = bug_data[order];
        bugs_in_order.forEach((bug, index) => {
            if (bug["name"]) {
                bug["order"] = order;
                all_bugs.push(bug);
            }
        });
    });

    return all_bugs;
}


/* Finds the most recent image of this bug and returns a timestamp as an int in yyyymm format */
export function bugDate(bug) {
    var month_name_to_number = {
        "Jan.": "01",
        "Feb.": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "Aug.": "08",
        "Sept.": "09",
        "Oct.": "10",
        "Nov.": "11",
        "Dec.": "12"
    };

    var date = 0;
    bug["images"].forEach(image => {
        if (image["date"]) {
            var parts = image["date"].split(" ");
            var year = parts[1];
            var month = month_name_to_number[parts[0]];
            var image_date = parseInt(year.concat(month), 10);
            if (image_date > date) {
                date = image_date;
            }
        }
    });  
    return date;    
}


/* Returns an HTML element with an entry for the specified bug */
export function bugEntryHTML(bug) {
    const bug_entry = document.createElement('div');

    const name = document.createElement('h3');
    name.innerHTML = bug["name"];
    bug_entry.appendChild(name);

    if (bug["scientific"]) {
        const scientific = document.createElement('i');
        scientific.innerHTML = bug["scientific"];
        bug_entry.appendChild(scientific);
        bug_entry.appendChild(document.createElement('br'));
    }
    
    if (bug["desc"]) {
        const desc = document.createTextNode(bug["desc"]);
        bug_entry.appendChild(desc);
    }

    const images = document.createElement('div');

    bug["images"].forEach(image => {
        if (image) {
            const bug_image = document.createElement('img');

            bug_image.src = '{{images_path}}' + image["path"]; 
            bug_image.title = image["location"] + ", " + image["date"];
            if (image["width"]) {
                bug_image.style.width = image["width"];
            } else {
                bug_image.style.width = "{{site.image_width}}";
            }

            images.appendChild(bug_image);
            /* Add a space in-between side-by-side images */
            images.appendChild(document.createTextNode(" "));
        }
    });
    
    bug_entry.appendChild(images);

    return bug_entry;
}