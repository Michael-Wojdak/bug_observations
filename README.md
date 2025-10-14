# A Website for Recording all the Images of Bugs I have Accumulated

Visit the site here: [https://michael-wojdak.github.io/bug_observations/]

bundle exec jekyll serve --livereload


images can be referenced from the base url:
"{{site.baseurl}}/assets/images/Hymenoptera/rusty_spider_wasp.jpg"
"{{'/assets/images/Hymenoptera/Hairy Scoliid Wasp.jpg' | relative_url}}"
or using relative paths (allows editor preview, less flexible):
"../../assets/images/Lepidoptera/Luna Moth.jpg"


### Feature List
- navigation: tab for each insect order plus maybe seperators for other categories (spiders, centipeds, etc.)
- organize entries by date? (search by date probably requires a non static site)
