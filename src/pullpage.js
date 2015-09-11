var full_page = function() {
	"use strict";
	this._dom = {
		content: $("#content"),
		paging_UL: $("#pull-paging-ul")
	}

	this.startX = 0;
	this.startY = 0;
	this.endX = 0;
	this.endY = 0;
	this.X = 0;
	this.Y = 0;

	this._dom.content.on('touchstart',this.full_touchStart.bind(this));
	this._dom.content.on('touchmove',this.full_touchMove.bind(this));
	this._dom.content.on('touchend',this.full_touchEnd.bind(this));

}

full_page.prototype.full_touchStart = function(e){
	e.preventDefault();
	// e.stopPropagation();
	this.startX = e.originalEvent.changedTouches[0].pageX,
	this.startY = e.originalEvent.changedTouches[0].pageY;
}

full_page.prototype.full_touchMove = function(e){
	e.preventDefault();
	// e.stopPropagation();
	this.endX = e.originalEvent.changedTouches[0].pageX,
	this.endY = e.originalEvent.changedTouches[0].pageY;
}

full_page.prototype.full_touchEnd = function (e) {
	e.preventDefault();
	// e.stopPropagation();
	var ev = e || window.e;
	var target = ev.target || ev.srcElement;
	var labels = target.nodeName.toLowerCase() ;
	this.X = this.endX - this.startX,
	this.Y = this.endY - this.startY;

	touchEnd_Method(target,labels,this.X,this.Y);
}

full_page.prototype.init = function (e) {
	console.log('init');
	var h = window.screen.height,
		w = window.screen.width;
	$("#first-page,#scend-page,#tr-page").css({
		height: h + "px"
	});
}

var full = new full_page();
full.init();
window.onresize = function () {
	var full = new full_page();
	full.init();
}
var iCurIndex = 0,
	total = full._dom.content.children().length,
	page_H = full._dom.content.children().height();

var paging_index = 0,
	paging_count = full._dom.paging_UL.find('li').length,
	paging_w = full._dom.paging_UL.find('li').eq(0).width();

function touchEnd_Method (target,label,x,y) {
	if (full.endY==0 || full.endX ==0){
		clearCoor();
		return;
	} else if (Math.abs(y) > Math.abs(x) && y > 30) {
		if (iCurIndex <= 0) {
			return;
		}
		var page = full._dom.content;
		page.children()
		.eq(iCurIndex)
		.removeClass('pre-page pre-page-out nxt-page nxt-page-out')
		.css("opacity","0").addClass('nxt-page-out');
		--iCurIndex;
		var top = _getDivHeight(iCurIndex);
		page.css({
			top: -top + "px"
		}).children().eq(iCurIndex)
		.removeClass('pre-page pre-page-out nxt-page nxt-page-out')
		.css("opacity","0").addClass('nxt-page').css("opacity","1");
		clearCoor();

	} else if (Math.abs(y) > Math.abs(x) && y < -30) {
		if (iCurIndex >= 2) {
			return;
		}
		var page = full._dom.content;
		page.children()
		.eq(iCurIndex)
		.removeClass('pre-page pre-page-out nxt-page nxt-page-out')
		.css("opacity","0").addClass('pre-page-out');
		++iCurIndex;
		var top = _getDivHeight(iCurIndex);
		page.css({
			top: -top + "px"
		}).children().eq(iCurIndex)
		.removeClass('pre-page pre-page-out nxt-page nxt-page-out')
		.css("opacity","0").addClass('pre-page').css("opacity","1");
		clearCoor();
	}else{
		clearCoor();
		return ;
	}
	
}
function _getDivHeight (num) {
	if (num < 0 ) {
		iCurIndex = 0;
		return;
	}else if( num >= total){
		iCurIndex = total-1;
		return;
	}
	return  num * page_H;
}
function clearCoor(){
	full.startX = 0;
	full.startY = 0;
	full.endX = 0;
	full.endY = 0;
	full.X = 0;
	full.Y = 0;
}

///////////////////////////////////
window.onload = function(){
	$(window).scroll(function(event) {
		$(this).scrollTop(0);
	})
	navigator.userAgent.match(/Android/i) ? hideAddressBar_android() : hideAddressBar_ios();
	function hideAddressBar_ios() {
		if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
			bodyTag = document.getElementsByTagName('body')[0];
			bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
		}
		setTimeout(function() {
			window.scrollTo(0, 1);
		}, 100);
	}
	function hideAddressBar_android() {
		var n = navigator.userAgent;
		if (n.match(/UCBrowser/i)) {
			//uc浏览器
			hideAddressBar_ios();
			return false;
		}

		var self = document.getElementsByTagName('body')[0];
		if (self.requestFullscreen) {
			self.requestFullscreen();
		} else if (self.mozRequestFullScreen) {
			self.mozRequestFullScreen();
		} else if (self.webkitRequestFullScreen) {
			self.webkitRequestFullScreen();
		}
	}
	setTimeout(function(){
		$("#mask-load").fadeOut(500);
	},200)
}