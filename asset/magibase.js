//这是给magi.html使用的脚本
//copyright-GreatBaron All Rights Reserved

//字数统计，仅统计CJK统一字符
var reg = /[\u4e00-\u9fa5]/g;
var str = document.getElementById('maincon').innerText;
document.getElementById('num').innerText=str.match(reg).length;

//baronica处理
document.getElementById('maincon').innerHTML=baronic4Magi(document.getElementById('maincon').innerHTML);

var greekstr = document.getElementsByClassName("greek");
var devastr = document.getElementsByClassName("deva");
var hebstr = document.getElementsByClassName("heb");
var i;
for (i = 0; i < greekstr.length; i++) {
    greekstr[i].innerHTML=latin2Greek(greekstr[i].innerHTML);
};
for (i = 0; i < devastr.length; i++) {
    devastr[i].innerHTML=latin2Deva(devastr[i].innerHTML);
};
for (i = 0; i < hebstr.length; i++) {
    hebstr[i].innerHTML=latin2Heb(hebstr[i].innerHTML);
};

//baronica kernel
function baronic4Magi(str) {
    var html = ""+str;

    html=html.replace(/\\floris/g,"<img src='decorate.png' class='slice'/>");
    html=html.replace(/greek{/g,"<span class='greek'>");
    html=html.replace(/deva{/g,"<span class='deva'>");
    html=html.replace(/heb{/g,"<span class='heb'>");
    //汉字乱数假文（需要Chipsum.js）
    html=html.replace(/chipsum{/g,"<span class='chipsum'>");

    html=html.replace(/kai{/g,"<span class='kai'>");
    html=html.replace(/str{/g,"<span class='del'>");
    html=html.replace(/del{/g,"<span class='del red'>");
    html=html.replace(/add{/g,"<span class='green'>");
    html=html.replace(/aqua{/g,"<span class='aqua'>");
    html=html.replace(/note{/g,"<span class='note'>");
    html=html.replace(/}/g,"</span>");

    html=html.replace(/\/\//g,"</p>");
    html=html.replace(/\/ /g,"<br/>");

    //定制内容
    //塞斯第斯
    html=html.replace(/\/IIS/g,"<span style='display:inline-block;text-decoration:line-through;'>IIS</span>");
    //Denarius
    html=html.replace(/\/X/g,"<span style='display:inline-block;text-decoration:line-through;'>X</span>");

    return html;
};

//拉丁转写成希腊字母
function latin2Greek(latin) {
    var greek=""+latin;

    greek=greek.replace(/a/g,"&#945;");
    greek=greek.replace(/v/g,"&#946;");
    greek=greek.replace(/b/g,"&#946;");
    greek=greek.replace(/c/g,"&#947;");
    greek=greek.replace(/g/g,"&#947;");
    greek=greek.replace(/d/g,"&#948;");
    greek=greek.replace(/e/g,"&#949;");
    greek=greek.replace(/z/g,"&#950;");
    greek=greek.replace(/psi/g,"&#968;");
    greek=greek.replace(/ph/g,"&#966;");
    greek=greek.replace(/th/g,"&#952;");
    greek=greek.replace(/h/g,"&#951;"); 
    greek=greek.replace(/i/g,"&#953;");
    greek=greek.replace(/k/g,"&#954;");
    greek=greek.replace(/l/g,"&#955;");
    greek=greek.replace(/m/g,"&#956;");
    greek=greek.replace(/n/g,"&#957;");
    greek=greek.replace(/q/g,"&#958;");
    greek=greek.replace(/o/g,"&#959;");
    greek=greek.replace(/p/g,"&#960;");
    greek=greek.replace(/r/g,"&#961;");
    greek=greek.replace(/s /g,"&#962;");
    greek=greek.replace(/s/g,"&#963;");
    greek=greek.replace(/t/g,"&#964;");
    greek=greek.replace(/u/g,"&#965;");
    greek=greek.replace(/f/g,"&#966;");
    greek=greek.replace(/x/g,"&#967;");
    greek=greek.replace(/w/g,"&#969;");

    greek=greek.replace(/C/g,"&#915;");
    greek=greek.replace(/G/g,"&#915;");
    greek=greek.replace(/D/g,"&#916;");
    greek=greek.replace(/TH/g,"&#920;");
    greek=greek.replace(/L/g,"&#923;");
    greek=greek.replace(/Q/g,"&#926;");
    greek=greek.replace(/PSI/g,"&#936;");
    greek=greek.replace(/P/g,"&#928;");
    greek=greek.replace(/R/g,"&#929;");
    greek=greek.replace(/S/g,"&#931;");
    greek=greek.replace(/U/g,"&#933;");
    greek=greek.replace(/F/g,"&#934;");
    greek=greek.replace(/X/g,"&#935;");
    greek=greek.replace(/W/g,"&#937;");

    return greek; 
};

//拉丁转写天城文
function latin2Deva(latin) {
    
    var deva=""+latin.toLowerCase();

    deva=deva.replace(/a/g,"&#2309;");
    deva=deva.replace(/b/g,"&#2311;");
    deva=deva.replace(/c/g,"&#2331;");
    deva=deva.replace(/d/g,"&#2313;");
    deva=deva.replace(/e/g,"&#2314;");
    deva=deva.replace(/f/g,"&#2315;");
    deva=deva.replace(/g/g,"&#2316;");
    deva=deva.replace(/h/g,"&#2317;");
    deva=deva.replace(/i/g,"&#2318;");
    deva=deva.replace(/j/g,"&#2318;");
    deva=deva.replace(/k/g,"&#2331;");
    deva=deva.replace(/l/g,"&#2319;");
    deva=deva.replace(/m/g,"&#2320;");
    deva=deva.replace(/n/g,"&#2321;");
    deva=deva.replace(/o/g,"&#2384;");
    deva=deva.replace(/p/g,"&#2323;");
    deva=deva.replace(/q/g,"&#2324;");
    deva=deva.replace(/r/g,"&#2325;");
    deva=deva.replace(/s/g,"&#2326;");
    deva=deva.replace(/t/g,"&#2327;");
    deva=deva.replace(/u/g,"&#2328;");
    deva=deva.replace(/v/g,"&#2328;");
    deva=deva.replace(/x/g,"&#2329;");
    deva=deva.replace(/y/g,"&#2318;");
    deva=deva.replace(/z/g,"&#2330;");

    deva=deva.replace(/,/g,"&#2372;");
    deva=deva.replace(/\./g,"&#2416;");

    return deva;
};

//拉丁转写希伯来文
function latin2Heb(latin) {
    var deva=""+latin.toLowerCase();

    deva=deva.replace(/a/g,"&#1488;");
    deva=deva.replace(/b/g,"&#1489;");
    deva=deva.replace(/c/g,"&#1490;");
    deva=deva.replace(/d/g,"&#1491;");
    deva=deva.replace(/e/g,"&#1492;");
    deva=deva.replace(/f/g,"&#1493;");
    deva=deva.replace(/g/g,"&#1494;");
    deva=deva.replace(/h/g,"&#1495;");
    deva=deva.replace(/i/g,"&#1496;");
    deva=deva.replace(/j/g,"&#1497;");
    deva=deva.replace(/k/g,"&#1498;");
    deva=deva.replace(/l/g,"&#1499;");
    deva=deva.replace(/m/g,"&#1500;");
    deva=deva.replace(/n/g,"&#1501;");
    deva=deva.replace(/o/g,"&#1502;");
    deva=deva.replace(/p/g,"&#1503;");
    deva=deva.replace(/q/g,"&#1504;");
    deva=deva.replace(/r/g,"&#1505;");
    deva=deva.replace(/s/g,"&#1506;");
    deva=deva.replace(/t/g,"&#1507;");
    deva=deva.replace(/u/g,"&#1508;");
    deva=deva.replace(/w/g,"&#1514;");
    deva=deva.replace(/v/g,"&#1509;");
    deva=deva.replace(/x/g,"&#1511;");
    deva=deva.replace(/y/g,"&#1512;");
    deva=deva.replace(/z/g,"&#1513;");

    deva=deva.replace(/,/g,"&#1524;");
    deva=deva.replace(/\./g,"&#1462;");

    return deva;
};

//隐藏注释
function noteVisi() {
    var notestr = document.getElementsByClassName("note");
    var i;

    for (i = 0; i < notestr.length; i++) {
        notestr[i].style.display='none';
    };
    document.getElementById('bottom-tools').style.display='none';
    document.getElementById('numcount').style.display='none';
    document.getElementById('index').style.display='none';
};
