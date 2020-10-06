"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(d){return typeof d}:function(d){return d&&"function"==typeof Symbol&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},_createClass=function(){function d(f,g){for(var j,h=0;h<g.length;h++){j=g[h],j.enumerable=j.enumerable||!1,j.configurable=!0,"value" in j&&(j.writable=!0),Object.defineProperty(f,j.key,j)}}return function(f,g,h){return g&&d(f.prototype,g),h&&d(f,h),f}}();function _classCallCheck(d,f){if(!(d instanceof f)){throw new TypeError("Cannot call a class as a function")}}var Dialog=function(){window.addEventListener("load",function(){document.body.addEventListener("touchstart",function(){},!1)},!1);var g=function(){function h(){_classCallCheck(this,h),this.timer=null,this.set={}}return _createClass(h,[{key:"extend",value:function extend(j,k){for(var l in k){j[l]=k[l]}}},{key:"init",value:function init(j,k){k&&"object"===("undefined"==typeof k?"undefined":_typeof(k))&&this.extend(this.set,k);var m=document.createElement("div"),p=document.createElement("div"),q=this,r=q.set;if(m.classList.add("c_alert_dialog"),r.index&&(m.dataset.index=r.index),p.classList.add("c_alert_wrap"),p.innerHTML='<div class="c_alert_con" style="'+r.style+'">'+j+"</div>",r.addClass&&p.classList.add(r.addClass),r.title&&(p.classList.add("c_alert_width"),p.insertAdjacentHTML("afterbegin",'<div class="c_alert_title">'+k.title+"</div>")),r.button){p.classList.add("c_alert_width");var s="";for(var u in r.button){s+='<a href="javascript:;" data-name="'+u+'">'+u+"</a>"}p.insertAdjacentHTML("beforeend",'<div class="c_alert_btn">'+s+"</div>");var v=p.querySelectorAll(".c_alert_btn a");[].forEach.call(v,function(w){w.onclick=function(x){x.preventDefault(),r.button[w.dataset.name].call(p,q)}})}r.time&&(q.timer=setTimeout(function(){_D_obj.close(p,r.after)},r.time+300)),k&&"object"!==("undefined"==typeof k?"undefined":_typeof(k))&&(q.timer=setTimeout(function(){_D_obj.close(p,r.after)},k+300)),r.before&&r.before.call(p),(void 0===r.mask||r.mask)&&m.insertAdjacentHTML("beforeend","<div class='c_alert_mask'  ontouchmove='return false'></div>"),m.appendChild(p),document.body.appendChild(m),(void 0===r.mask||r.mask)&&(m.querySelector(".c_alert_mask").onclick=function(w){w.preventDefault(),(r.maskClick||void 0===r.maskClick)&&_D_obj.close(p,r.after)
}),r.onload&&r.onload.call(p),setTimeout(function(){m.classList.add("dialog_open")},50)}}]),h}();return window._D_obj={init:function init(h,j,k){new g().init(h,j,k)},close:function close(h,j){var k=document.querySelectorAll(".c_alert_dialog");[].forEach.call(k,function(l){(l.dataset.index==h||l===h.parentNode)&&(l.classList.remove("dialog_open"),l.classList.add("dialog_close"),j&&j.call(l.querySelector(".c_alert_wrap"),h),l.querySelector(".c_alert_wrap").addEventListener("animationend",function(){l.remove()}))})}},_D_obj}(window,document);
!function(t){t.document;var e={};e.util={parseOptions:function(t){},sessionStorage:void 0,serialize:function(t){},deserialize:function(t){}};function i(t,e){this.$element=$(t),this.options=$.extend({},i.DEFAULTS,e||{}),this.init()}function i(t,e){this.$element=$(t),this.options=$.extend({},i.DEFAULTS,e||{}),this.init()}$.fn.emulateTransitionEnd=function(t){},"function"==typeof define?define(e):t.YDUI=e,i.DEFAULTS={speed:300,autoplay:5000,lazyLoad:!1,pagination:".slider-pagination",wrapperClass:"slider-wrapper",slideClass:"slider-item",bulletClass:"slider-pagination-item",bulletActiveClass:"slider-pagination-item-active"},i.DEFAULTS={speed:300,autoplay:3000,lazyLoad:!1,pagination:".slider-pagination",wrapperClass:"slider-wrapper",slideClass:"slider-item",bulletClass:"slider-pagination-item",bulletActiveClass:"slider-pagination-item-active"},i.prototype.init=function(){var t=this,e=t.options,i=t.$element;t.index=1,t.autoPlayTimer=null,t.$pagination=i.find(e.pagination),t.$wrapper=i.find("."+e.wrapperClass),t.itemNums=t.$wrapper.find("."+e.slideClass).length,e.lazyLoad&&t.loadImage(0),t.createBullet(),t.cloneItem().bindEvent()},i.prototype.bindEvent=function(){var e=this,i=e.touchEvents();e.$wrapper.find("."+e.options.slideClass).on(i.start,(function(t){e.onTouchStart(t)})).on(i.move,(function(t){e.onTouchMove(t)})).on(i.end,(function(t){e.onTouchEnd(t)})),$(t).on("resize.ydui.slider",(function(){e.setSlidesSize()})),~~e.options.autoplay>0&&e.autoPlay(),e.$wrapper.on("click.ydui.slider",(function(t){e.touches.allowClick||t.preventDefault()}))},i.prototype.cloneItem=function(){var t=this,e=t.$wrapper,i=t.$wrapper.find("."+t.options.slideClass),n=i.filter(":first-child").clone(),o=i.filter(":last-child").clone();return e.prepend(o),e.append(n),t.setSlidesSize(),t},i.prototype.createBullet=function(){var t=this;if(t.$pagination[0]){var e='<span class="'+t.options.bulletClass+" "+t.options.bulletActiveClass+'"></span>';t.$pagination.append(e+new Array(t.itemNums).join('<span class="'+t.options.bulletClass+'"></span>'))
}},i.prototype.activeBullet=function(){var t=this;if(t.$pagination[0]){var e=t.itemNums,i=t.index%e>=e?0:t.index%e-1,n=t.options.bulletActiveClass;t.$pagination[0]&&t.$pagination.find("."+t.options.bulletClass).removeClass(n).eq(i).addClass(n)}},i.prototype.setSlidesSize=function(){var t=this,e=t.$wrapper.width();t.$wrapper.css("transform","translate3d(-"+e+"px,0,0)"),t.$wrapper.find("."+t.options.slideClass).css({width:e})},i.prototype.autoPlay=function(){var t=this;t.autoPlayTimer=setInterval((function(){t.index>t.itemNums&&(t.index=1,t.setTranslate(0,-t.$wrapper.width())),t.setTranslate(t.options.speed,-++t.index*t.$wrapper.width())}),t.options.autoplay)},i.prototype.stopAutoplay=function(){return clearInterval(this.autoPlayTimer),this},i.prototype.setTranslate=function(t,e){var i=this;i.options.lazyLoad&&i.loadImage(i.index),i.activeBullet(),i.$wrapper.css({transitionDuration:t+"ms",transform:"translate3d("+e+"px,0,0)"})},i.prototype.touches={moveTag:0,startClientX:0,moveOffset:0,touchStartTime:0,isTouchEvent:!1,allowClick:!1},i.prototype.onTouchStart=function(t){t.originalEvent.touches&&(t=t.originalEvent.touches[0]);var e=this,i=e.touches;if(i.allowClick=!0,i.isTouchEvent="touchstart"===t.type,(i.isTouchEvent||!("which" in t)||3!==t.which)&&0==i.moveTag){i.moveTag=1,i.startClientX=t.clientX,i.touchStartTime=Date.now();var n=e.itemNums;if(0==e.index){return e.index=n,void e.setTranslate(0,-n*e.$wrapper.width())}e.index>n&&(e.index=1,e.setTranslate(0,-e.$wrapper.width()))}},i.prototype.onTouchMove=function(t){t.preventDefault(),t.originalEvent.touches&&(t=t.originalEvent.touches[0]);var e=this,i=e.touches;if(i.allowClick=!1,!i.isTouchEvent||"mousemove"!==t.type){var n=i.moveOffset=t.clientX-i.startClientX;0!=n&&0!=i.moveTag&&(1==i.moveTag&&(e.stopAutoplay(),i.moveTag=2),2==i.moveTag&&e.setTranslate(0,-e.index*e.$wrapper.width()+n))}},i.prototype.onTouchEnd=function(){var t=this,e=t.options.speed,i=t.$wrapper.width(),n=t.touches,o=n.moveOffset;(setTimeout((function(){n.allowClick=!0
}),0),1==n.moveTag&&(n.moveTag=0),2==n.moveTag)&&(n.moveTag=0,Date.now()-n.touchStartTime>300&&Math.abs(o)<=0.5*t.$wrapper.width()?t.setTranslate(e,-t.index*t.$wrapper.width()):t.setTranslate(e,-(o>0?--t.index:++t.index)*i),t.autoPlay())},i.prototype.touchEvents=function(){var e=t.Modernizr&&!!t.Modernizr.touch||!!("ontouchstart" in t||t.DocumentTouch&&document instanceof DocumentTouch);return{start:e?"touchstart.ydui.slider":"mousedown.ydui.slider",move:e?"touchmove.ydui.slider":"mousemove.ydui.slider",end:e?"touchend.ydui.slider":"mouseup.ydui.slider"}},$(t).on("load.ydui.slider",(function(){$("[data-ydui-slider]").each((function(){var e=$(this);e.slider(t.YDUI.util.parseOptions(e.data("ydui-slider")))}))})),$.fn.slider=function(t){return this.each((function(){var e=$(this);e.data("ydui.slider")||e.data("ydui.slider",new i(this,t))}))}}(window);
