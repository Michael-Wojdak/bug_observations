---
layout: default
title: Latest Additions
nav_order: 900
# nav_exclude: true
# search_exclude: true
---

# Recent Additions

<script type="module">
    import {getAllBugs, bugDate, bugEntryHTML}  from '{{site.baseurl}}/assets/js/bug_data_helper.js';
    
    function compareBugDates(a, b) {
        return bugDate(b) - bugDate(a);
    }

    /* Returns 'count' most recent bugs */
    async function getRecentBugs(count) {
        var all_bugs = await getAllBugs();
        /* Directly sorting the entire list seems like it could impact performance */
        all_bugs.sort(compareBugDates);

        return all_bugs.slice(0, count);
    }

    async function displayRecentBugs(count) {
        const bugs = await getRecentBugs(count);
        bugs.forEach((bug) => {
            displayBug(bug);
        });
    }

    /* edit html to add random bug */
    async function displayBug(bug) {
        console.log("Adding bug content to page...");

        var entry = bugEntryHTML(bug);
        
        document.getElementById("main-content").children[0].appendChild(entry);
    }
    
    await displayRecentBugs(10);

</script>
