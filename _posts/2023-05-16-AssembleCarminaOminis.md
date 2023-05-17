---
layout: post-minibo
header-img: 
title: 伯伦大人·精选集
subtitle: 'Baronis Assemble Carmina Omnia'
description: '自2014年起'
permalink: carmina-omnia
published: true
date: 2023-05-16
author: GreatBaron
tags:
- Carmen
- Archive
---

total sum of my carmina: `{{site.data.carminia | size}}`

### index

{% assign list = site.data.carminia | sort %}<ul>
{% for li_hash in list %}{%- assign li = li_hash[1] -%}
<li><a href="#{{- li.id -}}">ID:{{- li.id -}}&emsp;{{- li.publicTitle -}}</a></li>{% endfor %}</ul>

---

{% for car_hash in site.data.carminia | sort %}
{% assign car = car_hash[1] %}
<h3 id="{{ car.id }}">{{ car.publicTitle }}</h3>
{{ car.body }}  
(*{{ car.date }}*)
{% if car.notes.size >= 1 %}
<details>
<summary>Notes({{ car.notes.size }})</summary>
<ol>
{% for nt in car.notes  %}
<li>{{ nt }}</li>
{% endfor %}
</ol>
</details>{% endif %}
<!--
{{ car.log }}
-->
<p>&emsp;</p>
{% endfor %}
