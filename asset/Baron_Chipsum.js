//汉字乱数假文
//copyright-GreatBaron All Rights Reserved
//document.getElementById('maincon').innerHTML=baronic4Magi(document.getElementById('maincon').innerHTML);

var chi = document.getElementsByClassName("chipsum");
var i;
for (i = 0; i < chi.length; i++) {
    chi[i].innerHTML=chipsum(chi[i].innerHTML)
};

//baronica
/*
function baronic4Magi(str) {
    var html = ""+str;

    html=html.replace(/chipsum{/g,"<span class='chipsum'>");
    html=html.replace(/}/g,"</span>");

    return html;
};*/

//KERNEL
function chipsum(num) {
    var chichar="";
    num=Number(num);
    if (num==NaN) {
        num=1;
    };
    if (num=='') {
        num=1;
    };

    for (let index = 0; index < num; index++) {
        var sandi=Math.round(13312+Math.random()*6592);
        chichar=chichar+"&#"+sandi+";"
        
    };

    return chichar;
};

/*function chipsumP(para) {
    

    return str;
}*/
