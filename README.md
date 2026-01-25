# A Website for Recording all the Images of Bugs I have Accumulated

Visit the site here: [https://michael-wojdak.github.io/bug_observations/]

bundle exec jekyll serve --livereload

Liquid templating:
Add hyphens to tags removes whitespace `{%- for image in bug.images -%}`
`{% comment %} hi {% endcomment %}`


images can be referenced from the base url:
"{{site.baseurl}}/assets/images/Hymenoptera/rusty_spider_wasp.jpg"
"{{'/assets/images/Hymenoptera/Hairy Scoliid Wasp.jpg' | relative_url}}"
or using relative paths (allows editor preview, less flexible):
"../../assets/images/Lepidoptera/Luna Moth.jpg"

For side by side images total width should equal 98% (anything >= 99% overflows on mobile. Maybe someday I'll add proper css styling for image layouts)


### Future Feature List
- navigation: tab for each insect order plus maybe separators for other categories (spiders, centipeds, etc.)
- metrics (number of species from each order/family, tree of found species)
