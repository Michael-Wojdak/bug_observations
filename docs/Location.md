---
layout: default
title: Nepal
---
{% assign images_path = "../assets/images/" %}

# Bugs from Nepal

{% for order in site.data %}
{%- for bug in order[1] -%} <!-- order[0] gives the name of the order while order[1] contains the actual data -->
{%- for image in bug.images -%} <!-- hyphens strip whitespace> -->
{%- if image.location=="Nepal" -%}
<img src="{{images_path}}{{image.path}}" title="{{image.location}}, {{image.date}}" width="{{site.image_width}}">
{%- endif -%}
{% endfor %}
{% endfor %}
{% endfor %}