//统计字数 v1
// append this line in HTML: <script src="wordCount.js"></script> 

	var reg_zh = /[\u4e00-\u9fe6]/g;
	var reg_sym = /[，。：；“？！]/g;
	var reg_la = /[A-z]+/g;
	
	function wordcount(str){
		let zh,sym,la;
	
		zh=(str.match(reg_zh)==null)? 0 : str.match(reg_zh).length;
		sym=(str.match(reg_sym)==null)? 0 : str.match(reg_sym).length;
		la=(str.match(reg_la)==null)? 0 : str.match(reg_la).length;
	
		let total=zh+sym+la;
		console.log('chinese characters: '+zh);
		console.log('symbol characters: '+sym);
		console.log('latin words: '+la);
		console.log('total words: '+total);
		
		return total;
	};
	
//接口
	var sum = wordcount(document.getElementsByClassName('post')[0].innerHTML);/*统计 class=post 的第一个内容*/
	
//document.getElementsById('wordcount').innerHTML="<span>总字数："+sum+"</span>";