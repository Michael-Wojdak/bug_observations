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

### Image formats
iphone images use heic. image search seems to require jpg, png, or webp. avif or webp seem to have the best compression/quality for displaying on the website.

Previously was converting everything to jpg and using window's photo app to edit images. Switching to avif to save space and better quality images.

Can use gimp to crop images and save as avif (check fixed aspect ratio and enter a ratio e.g. `5:4`, export as avif with exif metadata).

Can also use [imagemagick](https://imagemagick.org/download/#windows) command to bulk convert images (should keep metadata and have good quality/size balance)
`magick input.heic output.avif`
`magick mogrify -format avif *.heic`

May need to convert images to jpg for online image search and to avif for inclusion in the site itself.


### Future Feature List
- [ ] Separators for non-insect and unique tabs
- [ ] Redesign site layout (nav/task-bar, unique theme)
- [ ] Metrics (number of species from each order/family, activity over time)
- [ ] Expand image dates to include day of month
- [ ] Filter what pages can be reached from random page

