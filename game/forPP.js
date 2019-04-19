function befUniTable(data) {//将形如“46f3”的字符串转换为html表格
        var html = "<table class='hero-data'><tr><th>攻击</th><th>移动</th><th>韧性</th><th>军饷</th></tr>";
        if (data.length!= 4) {
            //data = "数据错误";长度不合法
            data = data.concat('0000');//先用0补满它
            data = data.slice(0, 4);//再截取前4个
        };
        html = html + "<tr>";
        html = html + "<td class='data-" + unitDataRank(data[0]) + "'>" + data[0] + "</td>";//attack
        html = html + "<td class='data-" + unitDataRank(data[1]) + "'>" + data[1] + "</td>";//attack
        html = html + "<td class='data-" + unitDataRank(data[2]) + "'>" + data[2] + "</td>";//attack
        html = html + "<td class='data-" + unitDPayRank(data[3]) + "'>" + data[3] + "</td>";//attack//payment,ATTENTION! it use func unitDPayRank(), NOT unitDataRnk()
        html = html + "</tr></table>";
        return html;
    };//一般单位表格
    function befAblTable(data) {//将形如“46f3”的字符串转换为html表格
        var html = "<table class='hero-data'><tr><th>统驭</th><th>武力</th><th>智力</th><th>魅力</th></tr>";
        if (data.length != 4) {
            //data = "数据错误";长度不合法
            data = data.concat('0000');//先用0补满它
            data = data.slice(0, 4);//再截取前4个
        };
        html = html + "<tr>";
        html = html + "<td class='data-" + ablRank(data[0]) + "'>" + data[0] + "</td>";
        html = html + "<td class='data-" + ablRank(data[1]) + "'>" + data[1] + "</td>";
        html = html + "<td class='data-" + ablRank(data[2]) + "'>" + data[2] + "</td>";
        html = html + "<td class='data-" + ablRank(data[3]) + "'>" + data[3] + "</td>";
        html = html + "</tr></table>";
        return html;
    };//英雄能力表格
    function befCivTable(data) {//如果是臣民返回1115，否则返回2221
        var html = "<table class='hero-data'><tr><th>政治</th><th>文娱</th><th>商贸</th><th>采集</th></tr>";
        
        html=html+"<tr><td>"+data[0]+"</td><td>"+data[1]+"</td><td>"+data[2]+"</td><td>"+data[3]+"</td><tr></table>";
        return html;
    }; //公民臣民能力表格 TODO:在外面控制平衡常数
    function ablRank(ablInt) {
        /*Makes an Int into "Abilitiy Rank"*/
        switch (ablInt) {
            case 'x':
                return 'ss';
                break;
            case '9':
                return 's';
                break;
            case '8':
            case '7':
                return 'a';
                break;
            case '6':
            case '5':
                return 'b';
                break;
            default:
                return 'c';
        }
    }       //befAblTable()的职责
    function unitDataRank(chara) {//通过单位能力值返回能力级别，能力值为0-f,级别为{C,D,A,S,SS}
        chara = chara.toLowerCase();//大小姐不敏感
        var rank = "c";
        switch (chara) {
            case "f":
                rank = "ss";
                break;
            case "e":
            case "d":
            case "c":
                rank = "s";
                break;
            case "b":
            case "a":
            case "9":
            case "8":
                rank = "a";
                break;
            case "7":
            case "6":
            case "5":
            case "4":
                rank = "b";
                break;
            default:
                rank = "c";
        }
        return rank;
    }   //befUniTable(),befAblTable()的职责
    function unitDPayRank(chara) {//通过单位军饷值返回级别，能力值为0-f,级别为{C,D,A,S,SS},军饷要求越低，则级别越高
        chara = chara.toLowerCase();//大小姐不敏感
        var rank = "c";
        switch (chara) {
            case "f":
            case "e":
            case "d":
            case "c":
                rank = "c";
                break;
            case "b":
            case "a":
            case "9":
            case "8":
                rank = "b";
                break;
            case "7":
            case "6":
            case "5":
            case "4":
                rank = "a";
                break;
            case "3":
            case "2":
            case "1":
                rank = "s";
                break;
            case "0":
                rank = "ss";
                break;
            default:
                rank = "c";
        }
        return rank;
    }   //befUniTable(),befAblTable()的职责
    function tagBef(str) {//徽章替换
        var outstr = str;
        outstr = outstr.toLowerCase();
        outstr = outstr.replace(/athens/g, "<div class='badge'><img src = 'bg-athens-64px.png' /><div class='badge-drop-content'><b>“雅典人管着希腊……”</b><br />我管雅典人，你又管着我，而你又听儿子的。告诉儿子，可得让他小心手里的权力。这是一个雅典人。</div></div >");
        outstr = outstr.replace(/carthego/g, "<div class='badge'><img src='bg-carthego-64px.png' /><div class='badge-drop-content'><b>“看着那巍峨城墙上的火，他留下了眼泪”</b><br />这是一个迦太基人。</div></div>");
        outstr = outstr.replace(/spqr/g, "<div class='badge'><img src='bg-spqr-64px.png' /><div class='badge-drop-content'><b>“Civis Romanus sum.”</b><br />我是罗马人。</div></div>");
        outstr = outstr.replace(/hellen/g, "<div class='badge'><img src='bg-greek-64px.png' /><div class='badge-drop-content'><b>δόξα για την Ελλάδα！</b><br />这是一个属于希腊世界或受希腊化影响的人物。</div></div>");
        outstr = outstr.replace(/serica/g, "<div class='badge'><img src='bg-serica-64px.png' /><div class='badge-drop-content'><b>海内皆臣<br />歲登成熟<br />道毋飢人</b><br />这是一个中国人。</div></div>");
        //outstr = outstr.replace();
        return outstr;
    };//输出徽章html
    function typeBef(str) {//类型替换
        str = str.toLowerCase();
        //英雄
        str = str.replace(/政治家/g, "<span class='hero-type polician'>政治家</span>");
        str = str.replace(/军事家/g, "<span class='hero-type military'>军事家</span>");
        str = str.replace(/学者/g, "<span class='hero-type philosopher'>学者</span>");
        str = str.replace(/艺术家/g, "<span class='hero-type artist'>艺术家</span>");
        str = str.replace(/大商人/g, "<span class='hero-type merchant'>大商人</span>");
        //基础军事单位
        str = str.replace(/骑兵/, "<span class='hero-type merchant'>骑兵</span>");
        str = str.replace(/步兵/, "<span class='hero-type infantry'>步兵</span>");
        str = str.replace(/重甲/, "<span class='hero-type hoplite'>重甲</span>");
        str = str.replace(/远程/, "<span class='hero-type military'>远程</span>");
        str = str.replace(/战舰/, "<span class='hero-type navy'>战舰</span>");
        //其他
        str = str.replace(/非军事/, "<span class='hero-type nonmilitary'>非军事单位</span>");
        str = str.replace(/大型建筑/, "<span class='hero-type builds'>大型建筑</span>");
        str = str.replace(/小型建筑/, "<span class='hero-type builds'>小型建筑</span>");
        str = str.replace(/平民/, "<span class='hero-type commons'>平民</span>");
        return str;
    };//输出单位类型html
    function conBef(str) {
        str = str.replace(/【共和】/, "<div class='hero-politic republic'>Hail For Republic 仅共和政体可征召</div>");
        str = str.replace(/【君主】/, "<div class='hero-politic monarchy'>Long Live Emperor 仅君主政体可征召</div>");
        str = str.replace(/【【/, "<div class='hero-politic limit'>");
        str = str.replace(/】】/, "</div>");
        str = str.replace(/￥/, "<ul><li>");
        str = str.replace(/￥/g, "</li><li>");
        str = str + "</li></ul>";
        return str;
    };//输出征召条件html
    function splBef(str) {
        //str = str.replace(/【共和】/g, "<div class='hero-politic republic'>共和政体下的技能</div>");
        //str = str.replace(/【君主】/g, "<div class='hero-politic monarchy'>君主政体下的技能</div>");
        str = str.replace(/【被动】/g, "<span class='hero-skillmode pas'>被动</span>");
        str = str.replace(/【招募】/g, "<span class='hero-skillmode rec'>招募</span>");
        str = str.replace(/【进场】/g, "<span class='hero-skillmode ent'>进场</span>");
        str = str.replace(/【献身】/g, "<span class='hero-skillmode sac'>献身</span>");
        str = str.replace(/【唯一】/g, "<span class='hero-skillmode oo'>唯一一次</span>");
        str = str.replace(/￥/, "<ul><li>");
        str = str.replace(/￥/g, "</li><li>");
        str = str + "</li></ul>";
        return str;
    };//输出技能html
    
    
    function printUnit(unit) {
        var html = "<div class='unit'>";
        var daTable="";
        
        daTable=befUniTable(unit.data);
        
        if (unit.isHero=="true"){daTable=befAblTable(unit.data)};
        if (unit.isCommon=="true"){daTable=befCivTable(unit.data)};
        
        html = html + daTable
            + "<h2 id='"+unit.uId+"'>"+ unit.nominee + "</h2>"
            + tagBef(unit.tag)
            + "<h4><i>"+unit.title+"</i></h4>"
            + "<blockquote>"+unit.quo+"</blockquote>"
            + typeBef(unit.type)+"<hr/>"
            + conBef(unit.cons) + "<hr/>"
            + splBef(unit.spells);
        html = html + "<hr/><center><table class='notes'><tr><td>" + unit.note
            + "<img src='" + unit.uId + ".png' class='heroPro'/></td></tr>" + "<tr><td colspan='2'>link</td></tr></table></center>";
        html=html+"</div>";
            
        
        return html;
    }
    //XML to object aUnit
    function xml2aUnit(xml) {
        var unit = new aUnit();
        unit.nominee = xml.getElementsByTagName("NOMINEE")[0].childNodes[0].nodeValue;
        unit.title = xml.getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
        unit.quo = xml.getElementsByTagName("QUO")[0].childNodes[0].nodeValue;
        unit.data = xml.getElementsByTagName("DATA")[0].childNodes[0].nodeValue;
        unit.tag = xml.getElementsByTagName("TAG")[0].childNodes[0].nodeValue;
        unit.type = xml.getElementsByTagName("UTYPE")[0].childNodes[0].nodeValue;
        unit.cons = xml.getElementsByTagName("CONS")[0].childNodes[0].nodeValue;
        unit.spells = xml.getElementsByTagName("SPL")[0].childNodes[0].nodeValue;
        unit.note = xml.getElementsByTagName("NOTE")[0].childNodes[0].nodeValue;
        unit.uId = xml.getElementsByTagName("UID")[0].childNodes[0].nodeValue;
        unit.isBuild = xml.getElementsByTagName("ISBUILDING")[0].childNodes[0].nodeValue;
        unit.isCommon = xml.getElementsByTagName("ISCOMMON")[0].childNodes[0].nodeValue;
        unit.isMilitary = xml.getElementsByTagName("ISMILITARY")[0].childNodes[0].nodeValue;
        unit.isShooter = xml.getElementsByTagName("ISSHOOTER")[0].childNodes[0].nodeValue;
        unit.isHero=xml.getElementsByTagName("ISHERO")[0].childNodes[0].nodeValue;
        
        
        return unit;
    }
    //单位构造器====================================
    function aUnit(
        no,
        ti,
        qu,
        data,
        tag,
        typ,
        cc,
        sp,
        note,
        id,
        isMil,
        isBld,
        isCom,
        isSht,
        isHero
    ) {
        this.nominee = no;
        this.title = ti;
        this.quo = qu;
        this.data = data;
        this.tag = tag;
        this.type = typ;
        this.cons = cc;
        this.spells = sp;
        this.note = note;
        this.uId = id;
        this.isMilitary = isMil;
        this.isBuild = isBld;
        this.isCommon = isCom;
        this.isShooter = isSht;
        this.isHero = isHero;
            
        /*    
        if (this.isHero == "true") { this.isCommon = "false" };//英雄必然不是平民
        if (this.isCommon == "true") {
            this.isMilitary = "false";
            this.tag = this.tag + "非军事平民";
        };//如果是平民则必然不是军事单位
            
        if (this.isBuild == "true") { 
            this.data[1] = "0" ;
            this.data[3]="0";
        };//如果是建筑则必然不能移动*/
    };
