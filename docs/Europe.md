---
layout: default
title: Europe
---

# Bugs from Europe

{% for order in site.data %}
{%- for bug in order[1] -%}
{%- for image in bug.images -%}
{%- if image.location=="Bosnia" or image.location=="Croatia" or image.location=="Switzerland" or image.location=="Montenegro" -%}
{% include bug_entry.html bug=bug %}
{% break %}
{% endif %}
{% endfor %}
{% endfor %}
{% endfor %}