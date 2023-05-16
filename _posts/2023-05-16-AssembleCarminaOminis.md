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

{% assign poem = site.data.carminia.car0001-bob %}
### {{ poem.publicTitle }}
{{ poem.body }}
{% for nt in poem.notes  %}
#### Notes
- {{ nt }}
{% endfor %}

---
