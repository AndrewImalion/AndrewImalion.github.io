//我的语法糖 v1.1
// append this line in HTML: <script src="mySugar.js"></script>
// you can add your new syntax-sugar in the Arry: mySug

var mySug =[
//cata badge for status
		{
        regx:/:bot:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:lightgrey;">植物学</span>'//botany
    },
		{
        regx:/:nat:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:lightgrey;">博物学</span>'//natural historia
    },
		{
        regx:/:lia:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:violet;">文艺</span>'//literature et art
    },
		{
        regx:/:ius:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:olive;">法学</span>'//juris
    },
		{
        regx:/:eth:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:lightgrey;">伦理学</span>'//ethics
    },
		{
        regx:/:politics:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:teal;">政治学</span>'
    },
		{
        regx:/:eco:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:lightgrey;">经济学</span>'//economics
    },
		{
        regx:/:soc:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:green;">社会学</span>'//socialogy
    },
		{
        regx:/:phi:/gi,
        sug:'<span class="badge rounded-pill" style="background-color:crimson;">哲学</span>'//philosophy
    },
		{
        regx:/:his:/gi,
        sug:'<span class="badge rounded-pill bg-warning">历史</span>'//history
    },
		{
        regx:/:skt:/gi,
        sug:'<span class="badge rounded-pill bg-secondary">sketch</span>'//sketch
    },
//end my cata badge
    {
        regx:/{sug}/gi,
        sug:'🍬'
    },
    {
        regx:/{baron}/gi,
        sug:"<span style='background-color:black;color:white;font-family:Fantasy,Arial,sans-serif;padding:0px 2px;border-radius: 5px;white-space:nowrap;'>GreatBaron</span>"
    },
    {
        regx:/{sad}/gi,
        sug:'😭'
    },
    {
        regx:/{hah}/gi,
        sug:'😄'
    },
]

function myLiquid(str) {
    var html = ""+str;

    for (let i = 0; i < mySug.length; i++) {
        html=html.replace(mySug[i].regx,mySug[i].sug);
    };

    //all sugar list
    let allSug="<ul>";
    for (let i = 0; i < mySug.length; i++) {
        allSug=allSug+"<li>"+mySug[i].regx + mySug[i].sug+"</li>"        
    };
    allSug=allSug+"</ul>";
    html=html.replace(/{sugar-list}/g,allSug);

    return html;
};

var slash=document.getElementsByTagName('html')[0].innerHTML;
//console.log(slash);
document.getElementsByTagName('html')[0].innerHTML=myLiquid(slash);
