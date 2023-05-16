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
{% for car in site.data.carminia %}
<li>{{ car.id }}; {{ car.publicTitle }}</li>
{% endfor %}

{{% assign id = site.data.carminia.car0001-bob %}}
### {{ id.publicTitle }}
{{ id.body }}

(*{{ id.date }}*)

#### notes
{% for nt in id.notes %}
- {{ nt }}
{{% endfor %}}