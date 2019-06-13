//实现 MySketch 的脚本，依赖DivSketch_v0.css
/*var mySkt=new aSketch("14th May. 2019(Tue)<hr/>set in 190514-1318","Lipsum","Cicero","history philosophy 【【排版】】","There is no man who loves the \\em{pain }","no foot")*/
//document.getElementById("container").innerHTML = printaSketh2html(mySkt);

document.getElementById("container").innerHTML = baronica2aSketch(document.getElementById("rawsrc").innerHTML);



function printaSketh2html(skt) {
    var html = "<div class='aSketch'";

    html = html + "id='" + skt.sid + "'>"
        + "<div class='headline'>" + skt.headline + "</div>"
        + "<h1 class='sketchTitle'>" + skt.title + "</h1>"
        + "<h2 class='sketchTitle'>" + skt.subtitle + "</h2>"
        + bufTags2html(skt.tags) + "<hr />"
        + "<div class='maincon'>"
        + baronica2aSketch(skt.mainbody)
        + "</div><hr />"
        + "<div class='footline'>" + skt.footline + "</div></div>";

    return html;
}
function bufTags2html(str) {
    var html = "" + str;

    html = html.replace(/philosophy/g, "<span class='tag phi'>philosophy</span>");
    html = html.replace(/history/g, "<span class='tag iso'>history</span>");
    html = html.replace(/social/g, "<span class='tag soc'>social</span>");
    html = html.replace(/lingual/g, "<span class='tag lin'>lingual</span>");
    html = html.replace(/economic/g, "<span class='tag eco'>economic</span>");
    html = html.replace(/literature/g, "<span class='tag lit'>literature</span>");
    html = html.replace(/poetry/g, "<span class='tag lit poe'>poetry</span>");

    html = html.replace(/\\tag{/g, "<span class='tag cus'>");
    html = html.replace(/【【/g, "<span class='tag cus'>");
    html = html.replace(/}/g, "</span>");
    html = html.replace(/】】/g, "</span>");

    return html;
}

function baronica2aSketch(str) {
    
    var html = "" + bufTags2html(str);

    html = html.replace(/\\quo/g, "<blockquote>");
    html = html.replace(/\\equo/g, "</blockquote>");
    html = html.replace(/\\gquo/g, "<div class='quotation'>");
    html = html.replace(/\\egquo/g, "</div>");
    html = html.replace(/\\lrc/g, "<div class='poetrybody'>");
    html = html.replace(/\\elrc/g, "</div>");

    html = html.replace(/\\begin-skt/g, "<div class='aSketch'>");
    html = html.replace(/\\end-skt/g, "</div>");

    html = html.replace(/\\begin-head/g, "<div class='headline'>");
    html = html.replace(/\\end-head/g, "</div>");

    html = html.replace(/\\begin-foot/g, "<div class='footline'>");
    html = html.replace(/\\end-foot/g, "---Powered by ©GreatBaron</div>");

    html = html.replace(/\\begin-main/g, "<div class='maincon'>");
    html = html.replace(/\\end-main/g, "</div>");

    html = html.replace(/e##/g, "</h2>");
    html = html.replace(/e#/g, "</h1>");
    html = html.replace(/##/g, "<h2 class='sketchTitle'>");
    html = html.replace(/#/g, "<h1 class='sketchTitle'>");

    //自定义
    html = html.replace(/\\Baronica{/g, "<span class='baronlogo'>");
    
    html = html.replace(/\\em{/g, "<span style='font-weight:700;'>");
    html = html.replace(/\\italic{/g, "<span style='font-style:italic'>");
    html = html.replace(/\\del{/g, "<span style='text-decoration:line-through;'>");
    html = html.replace(/\\underl{/g, "<span style='text-decoration:underline;'>");
    html = html.replace(/\\red{/g, "<span style='color:red'>");
    html = html.replace(/\\green{/g, "<span style='color:lime'>");
    html = html.replace(/\\yellow{/g, "<span style='color:yellow'>");
    html = html.replace(/\\high{/g, "<span style='background-color:hotpink'>");
    html = html.replace(/}/g, "</span>");

    

    //空行、换行
    html = html.replace(/\\nn/g, "<br/><br/>");
    html = html.replace(/\\n/g, "<br/>");
    html = html.replace(/\/\//g, "<p/>");
    html = html.replace(/\/ /g, "<br/>");
    //horizon
    html = html.replace(/---/g, "<hr/>");
    //缩进
    html = html.replace(/\\ind1/g, "<span style='visibility:hidden;'>烫</span>");
    html = html.replace(/\\ind2/g, "<span style='visibility:hidden;'>烫烫</span>");
    html = html.replace(/\\ind4/g, "<span style='visibility:hidden;'>烫烫烫烫</span>");

    //TODO:table

    return html;
}



//constructor of Object aSketch()
function aSketch(headline, title, subtitle, tags, mainbody, footline,sid) {
    this.headline = headline;

    this.sid = sid;
    if (sid == undefined) {
        this.sid = headline.slice(-12);
    };

    this.title = title;
    if (title == undefined) {
        title = " ";
    };

    this.subtitle = subtitle;
    if (subtitle == undefined) {
        subtitle = " ";
    };

    this.tags = tags;
    if (tags == undefined) {
        tags = "【【sketch】】";
    };

    this.mainbody = mainbody;
    this.footline = footline;
}
