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

total sum of my carminia: {{site.data.carminia | size}}


### index
{% for list_hash in site.data.carminia %}
{% assign li = list_hash[1] %}
1. [{{ li.id }}: {{ li.publicTitle }}](#{{ li.id }})
{% endfor %}
---

{% for car_hash in site.data.carminia %}
{% assign car = car_hash[1] %}
<h3 id="{{ car.id }}">{{ car.publicTitle }}</h3>
{{ car.body }}  
(*{{ car.date }}*)

{{% if car.notes.size >= 1 %}}
**Notes**
{% for nt in car.notes  %}
1. {{ nt }}
{% endfor %}
{{% endif %}}
<!--
{{ car.log }}
-->
{% endfor %}
<p>&emsp;</p>
