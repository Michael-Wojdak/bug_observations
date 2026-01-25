---
layout: default
title: Nepal
---
{% assign images_path = "../assets/images/" %}

# Bugs from Nepal

{% for order in site.data %}
{%- for bug in order[1] -%}
{%- for image in bug.images -%}
{%- if image.location=="Nepal" -%}
{% include bug_entry.html bug=bug %}
{% break %}
{%- endif -%}
{% endfor %}
{% endfor %}
{% endfor %}