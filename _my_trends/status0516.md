---
title:	
date:	2023-05-16
weather:	haze
feeling:	flamboyant
cata:
---

testing carmen

total sum of my carminia: {{site.data.carminia | size}}

<ol>
{% for car_hash in site.data.carminia %}
{% assign car = car_hash[1] %}
<li>{{ car.id }}; {{ car.publicTitle }}</li>
{% endfor %}
