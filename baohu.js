document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
    	alert('请尊重劳动成果！');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
    	alert('请尊重劳动成果！');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('请尊重劳动成果！');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
           alert('请尊重劳动成果！');
           return false;
    }
}
document.oncontextmenu=function(){
	alert('请尊重劳动成果！');
    return false;
}
try {
	if (window.console && window.console.log) {
		console.log("%c哟，高人您好,祝您扒代码愉快~！","color:red");
		console.log("有问题,请留言：2648616832@qq.com");
		console.log("搞不定,可付费：QQ：2648616832");
	};
} catch (e) {};
