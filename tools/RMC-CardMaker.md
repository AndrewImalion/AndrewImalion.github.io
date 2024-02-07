---
layout: miniboots
header-img: 
title: 'RMC 卡片制作器'
subtitle: 'A Card Maker for RMC'
description: 'for RMC'
permalink: rmc-card-maker
---

<h1>RMC CardMaker ver3.02</h1>
<details>
    <summary>更新日志</summary>
    <div id="UpdateLog" style="font-family: 'Courier New', Courier, monospace;">
        <strong>2.23</strong> (2022.May.2) <br/>
        set path of renders.<br/>
        supports English Rarity also.<br/>
        <strong>3.0</strong> (2022.May.3) <br/>
        supports JSON <br/>
        new function to clean screen<br/>
        new Template of JSON<br/>
        <strong>3.01</strong> (2022.May.5) <br/>
        new display for UpdateLog<br/>
        <strong>3.02</strong> (2023.Jan.18)<br/>
        fixed several bugs<br/>
        new path of renders.<br/>
        <strong>3.03</strong> (2024.Feb.7)<br/>
        supports user watermark.<br/>
    </div>
</details>

<p>
    代码模板：
    <a href="CardMaking_Template.xml" target="_blank">🏷️XML模板</a>  
    <a href="CardMaking_Template.json" target="_blank">📜JSON模板</a>
</p>

<div>
<!--功能柄-->
<form>
  背景渐变色（左上角）<input type="color" name="favcolor" value="#E0E0E0"><br/>
  背景渐变色（右下角）<input type="color" name="favcolor" value="#000000"><br/>
  正文字号（15 到 25 之间）：<input type="number" name="favfont" min="15" max="25" value="16"><br/>
  正文字体：<select name="favfont">
		<option value="Arial">Arial</option>
		<option value="Times">Serif</option>
		<option value="Fantasy">Fantasy</option>
		</select><br/>
  字体颜色（正文）：
  <input type="color" name="favfontcolor" value="#000000"><br/>
  字体颜色（卡名）：
  <input type="color" name="favnomencolor" value="#000000"><br/>
  <input type="checkbox" id="showWatermark" value="showWatermark" checked="true">显示水印
</form>
</div>
<hr/>
Input your code here then press go-button.<br/>
请将您的代码写进此处，然后点击 go 按钮：
<div>
    <!--此处输入代码-->
        <textarea id="inputCode" style="width:80%; height:350px; font-family: 'Courier New', Courier, monospace;"></textarea>
        <br/>
        <button onclick="doTheseCards()">go(xml)</button>
        <button onclick="doTheseCardsByJSON()">go(JSON)</button>
        <button id="favClean" onclick="javascript:void(0)">清屏</button>
</div>


<div id="OutputZone">
        <!--此处输出卡片-->
</div>
<button onclick="downloadAll()">保存全部</button>

<div id='RenderZone' style="display:none;">
		<!--此处储存水印蒙版-->
		<img id='watermark' src='file:///C:/Users/Administrator/Documents/ilovebaron/watermark.png' alt="WARNING watermark Failed" srcset="{{ site.url }}/welcome-marcus.jpg">
</div>

<footer style="display:none;">
        <!--此处储存版权声明-->
        <div class="copyrightlines" id='copyrightclaim'>©GreatBaron 2022,All Rights Reserved.</div><br>
</footer>

<script>
    //Balance Constant 平衡常数
    var /*边框渐变参数*/  BC_BORDER = ['silver', 'white'],
        /*底面渐变参数*/  BC_BKG = [],
        /*下载命名前缀*/  BC_FILLE_NAME = 'PoweredByBaron',
		/*预设文本字体*/  BC_FONT = "16px Arial",
        /*预设文本颜色*/  BC_FONTC = "black",
        /*是否启用水印*/  BC_WATERMARK = false;


    //下载api
    function exportCanvasAsPNG(id, fileName) {
        //down pic
        var canvasElement = document.getElementById(id);

        var MIME_TYPE = "image/png";

        var imgURL = canvasElement.toDataURL(MIME_TYPE);

        var dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    };

    //下面这堆构造能够换行的canvas功能 context.wrapText(text,x,y,maxWidth,lineHeight)
    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
        if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
            return;
        }

        var context = this;
        var canvas = context.canvas;

        if (typeof maxWidth == 'undefined') {
            maxWidth = (canvas && canvas.width) || 300;
        }
        if (typeof lineHeight == 'undefined') {
            lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
        }

        // 字符分隔为数组
        var arrText = text.split('');
        var line = '';

        for (var n = 0; n < arrText.length; n++) {
            var testLine = line + arrText[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = arrText[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
		//Baron新增的换行命令
		if(arrText[n]=='丨'){
                context.fillText(line.slice(0,-1), x, y);
                line = '';
                y += lineHeight;
            };
        if(arrText[n]=='|'){
                context.fillText(line.slice(0,-1), x, y);
                line = '';
                y += lineHeight;
            };
		//换行命令到此结束

        }
        context.fillText(line, x, y);
    };

    //抽出xml
    function abstractValueByTagname(str, tagName) {
        //创建文档对象
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(str, "text/xml");


        //提取数据
        var countrys = xmlDoc.getElementsByTagName(tagName);
        var arr = [];
        for (var i = 0; i < countrys.length; i++) {
            arr.push(countrys[i].textContent);
        };

        return arr;
    };



    //统计卡片数量
    var canvasSum = 0;

    //清屏
    function cleanAll()
    {
        document.getElementById("OutputZone").innerHTML=""
        canvasSum=0;
        return 0
    };
    document.getElementById("favClean").onclick=function()
    {
        var msg="你确定要清屏么？该操作将会清楚此页面所有图片";
        if (confirm(msg)==true) {
            cleanAll();
            return 0;
        } else {
            return 1;
        }
    }

    //构造卡片字段
    var nomens,
        raritys,
        iniHPs,
        catas,
        trtDetls,
        UIdes;

function rarity2Num(str) {
        //将 普通-传说-未定返回为0-3
        switch (str) {
            case '普通': return 0; break;
            case '稀有': return 1; break;
            case '史诗': return 2; break;
            case '传说': return 3; break;
            case 'Common': return rarity2Num('普通'); break;
            case 'Rare': return rarity2Num('稀有'); break;
            case 'Epic': return rarity2Num('史诗'); break;
            case 'Legendary': return rarity2Num('传说'); break;
            default: return -1; break;
        }
    };

//初始化用户设置
function iniFavorite(){

//设置背景色
BC_BKG[0]=document.getElementsByName("favcolor")[0].value;
BC_BKG[1]=document.getElementsByName("favcolor")[1].value;

//设置字体字号颜色
BC_FONT=document.getElementsByName("favfont")[0].value+"px "
	   +document.getElementsByName("favfont")[1].value;
BC_FONTC=document.getElementsByName("favfontcolor")[0].value;

//设置水印
BC_WATERMARK=document.getElementById("showWatermark").checked;
if (document.getElementById("showWatermark").checked) {
    console.log("showWatermark yes")
}else{
    console.log("showWatermark no")};

return 0;
};

    //启动钩子XML
    function doTheseCards() {
        iniFavorite();

        var code = document.getElementById("inputCode").value;

        nomens = abstractValueByTagname(code, "Nomen");
        //flavors = abstractValueByTagname(code, "flavor");
        raritys = abstractValueByTagname(code, "Rarity");
        iniHPs = abstractValueByTagname(code, "Influence");
        catas = abstractValueByTagname(code, "Group");
        //traits = abstractValueByTagname(code, "trait");
        trtDetls = abstractValueByTagname(code, "Description");
        UIdes = abstractValueByTagname(code,"UId");
        /*
        mv1Ttls = abstractValueByTagname(code, "mv1Ttl");
        mv2Ttls = abstractValueByTagname(code, "mv2Ttl");
        mv1Detls = abstractValueByTagname(code, "mv1Detail");
        mv2Detls = abstractValueByTagname(code, "mv2Detail");
        wknsses = abstractValueByTagname(code, "wknss");
        antitates = abstractValueByTagname(code, "antitas");
        rtrtcsts = abstractValueByTagname(code, "retreat");
        //console.log(raritys);
        //console.log(rarity2Num(raritys[0]))
        
        for (var j = 0; j < UIdes.length; j++) {
            document.getElementById("RenderZone").innerHTML=document.getElementById("RenderZone").innerHTML+
                "<img id='"+UIdes[j]+"' src='C:/Users/Administrator/Documents/MyRenders/"+UIdes[j]+".png'>";
            //console.log(UIdes[j]);
            //TODO: 加载问题，图片还没来及加载，drawImg()就急着执行
        };*/

        for (var i = 0; i < nomens.length; i++) {      
            printPic(nomens[i], rarity2Num(raritys[i]), iniHPs[i], catas[i],trtDetls[i],UIdes[i]);
            console.log("print"+nomens[i])
        };

        console.log("printed "+canvasSum);
    };

    //启动钩子JSON
    function doTheseCardsByJSON(){
        iniFavorite();
        var code=JSON.parse(document.getElementById("inputCode").value);

        //console.log(document.getElementById("inputCode").value);
        console.log(code.length+" card(s) from JSON");
        
        for (let i = 0; i < code.length; i++) {
            printPic(code[i].Nomen,rarity2Num(code[i].Rarity),code[i].Influence,code[i].Group,code[i].Description,code[i].UId)
        };

        console.log("printed "+canvasSum);
    };

    //下载全部
    function downloadAll() {
        for (var i = 0; i < canvasSum; i++) {
            exportCanvasAsPNG("card" + i, BC_FILLE_NAME + i);
            console.log("download card" + i);
        }
    };

//KERNELcanvas
    function printPic(nomen,
        rarity, iniHP, category,
        traitDetail, Uuid
        ) {
        

        //加载蒙板，卡图
        document.getElementById("RenderZone").innerHTML=
            document.getElementById("RenderZone").innerHTML+
            "<img id='"+Uuid+"' src='MyRenders/"+Uuid+".png'>";

		//稀有度分类
        var raricolor=[];
        switch (rarity) {
            case 0: raricolor = ["普通", "black"]; break;
            case 1: raricolor = ["稀★有", "aqua"]; break;
            case 2: raricolor = ["★史诗★", "fuchsia"]; break;
            case 3: raricolor = ["★传💎说★", "gold"]; break;
            default: raricolor = ["未分级", "white"];
        }

		//生成画布上下文
        var canvas = document.createElement('canvas');
        canvas.id = "card"+canvasSum;
        canvasSum += 1;
        canvas.width = 500;
        canvas.height = 750;
        document.getElementById('OutputZone').appendChild(canvas);
        var ctx = canvas.getContext("2d");

        //BC_BORDER 决定边框颜色
        var borderFlavor = ctx.createRadialGradient(250,375,500,300,500,80)
        borderFlavor.addColorStop(0, BC_BORDER[0]);
        borderFlavor.addColorStop(1, BC_BORDER[1]);
        ctx.fillStyle = borderFlavor;
        ctx.fillRect(0, 0, 500, 750);

        //BC_BKG 决定 backgroud gradient
        var grd = ctx.createLinearGradient(0, 0, 500, 750);
        grd.addColorStop(0, BC_BKG[0]);
        grd.addColorStop(1, BC_BKG[1]);
        ctx.fillStyle = grd;
        ctx.fillRect(10, 10, 480, 730);

        //nomen zone
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillRect(30, 30, 440, 50);

        //HP zone
        ctx.beginPath();
        ctx.arc(250, 250, 160, 0, 2 * Math.PI);
        ctx.fill();
        //HP zone uter
        //ctx.fillRect(30, 100, 440, 320);

        //rarity & category
        ctx.fillRect(30, 420, 440, 50);
        //trait
        ctx.fillRect(30, 480, 440, 250);
        //move1
        //ctx.fillRect(180, 480, 140, 160);
        //move2
        ///ctx.fillRect(330, 480, 140, 160);

        //weakness
        //ctx.fillRect(30, 650, 140, 80);
        //antitas
        //ctx.fillRect(180, 650, 140, 80);
        //retreat
        //ctx.fillRect(330, 650, 140, 80);

        //nomen 最顶部的名字
        ctx.fillStyle = "black";            //TODO: 用户自定义选择字体颜色
        ctx.font = "45px 华文隶书";
        ctx.textAlign = "center";
        ctx.textBaseline = "hanging";
        ctx.fillText(nomen, 250, 40, 440);

        //rarity
        ctx.fillStyle = raricolor[1];
        ctx.font = "30px 华文隶书";
        ctx.textBaseline = "bottom";
        ctx.fillText(raricolor[0], 110, 460);

        //iniHP
        ctx.fillStyle = "black";
        ctx.font = "144px Georgia";
        ctx.textAlign = "center";
        //ctx.textBaseline = "bottom";
        ctx.fillText(iniHP, 250, 320, 200);

        //category
        ctx.fillStyle = "black";
        ctx.font = "25px Georgia";
        ctx.textAlign = "end";
        ctx.textBaseline = "bottom";
        ctx.fillText(category, 460, 460, 180);
        ctx.textAlign = "center";
        //ctx.fillText(iniHP, 250, 460, 200);
		ctx.fillText(iniHP, 230, 460, 200);

        //trait&moves titles
        //ctx.fillStyle = "black";
        //ctx.font = "25px 华文新魏";
        //ctx.fillText(traitTitle, 100, 515, 120);
        //ctx.fillText(mv1Title, 250, 515, 120);
        //ctx.fillText(mv2Title, 400, 515, 120);

        //reaction&retreat
        //ctx.font = "20px Arial";
        //ctx.fillText("弱点", 100, 675, 120);
        //ctx.fillText(weakness, 100, 710, 120);
        //ctx.fillText("抵抗", 250, 675, 120);
        //ctx.fillText(antitas, 250, 710, 120);
        //ctx.fillText("撤退", 400, 675, 120);
        //ctx.fillText("（"+retreatCost+"）", 400, 710, 120);

        //moves details 详情描述
		ctx.font=BC_FONT;
        ctx.textAlign = "left";
        ctx.fillStyle=BC_FONTC;
        ctx.wrapText(traitDetail, 45, 510, 420, 21);
        //ctx.wrapText(mv1Detail, 250, 550, 120, 20)
        //ctx.wrapText(mv2Detail, 400, 550, 120, 20);

        //覆盖蒙版卡图
        ctx.drawImage(document.getElementById(Uuid),0,0);

		//加戳版权声明
		ctx.font="10px Times";
		ctx.textAlign="center";
		ctx.fillText(document.getElementById('copyrightclaim').innerHTML, 250,730,400);

        //加盖水印
        if (BC_WATERMARK==true) {
            ctx.drawImage(document.getElementById('watermark'),0,0);
        };

    }

</script>
