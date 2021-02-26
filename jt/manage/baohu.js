document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
    	alert('感谢您支持有名源™');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
    	alert('感谢您支持有名源™');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('感谢您支持有名源™');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
           alert('感谢您支持有名源™');
           return false;
    }
}
document.oncontextmenu=function(){
	alert('感谢您支持有名源™');
    return false;
}
try {
	if (window.console && window.console.log) {
		console.log("%c哟，高人您好,祝您扒代码愉快~！","color:red");
		console.log("有问题,请留言：admin@ambier.cn");
		console.log("搞不定,可付费：QQ：906331000");
	};
} catch (e) {};
