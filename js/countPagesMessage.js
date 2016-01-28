(function(){
	"use strict";
		var obddc = {
			url: 'http://demiart.ru/forum/index.php',
			def: 'http://demiart.ru/forum/index.php',
			ddc: 0
		},
		insetrLink = function(o){
			return '<a href="'+o.url+'" class="noty" title="(+'+o.ddc+') непрочитанные комментарии">+'+o.ddc+'</a>';
		},
		nextDDC = function(e){
			e.preventDefault();
			return !1;
			if(e.shiftKey){
				if(e.keyCode==13 && obddc.ddc){
					window.location.href = obddc.url;
					return !1;
				}
				if(e.keyCode==32){
					window.location.href = obddc.def;
					return !1;
				}
			}
		},
		removeFavicon = function(){
			var links = document.getElementsByTagName('link');
			var head = document.getElementsByTagName('head')[0];
			for(var i=0, len=links.length; i < len; i++) {
				var exists = (typeof(links[i]) !== 'undefined');
				if (exists && (links[i].getAttribute('type') || '').match(/image\/x-icon/)) {
					head.removeChild(links[i]);
				}
			}
		},
		setFaviconTag = function(url){
			removeFavicon();
			var link = document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut Icon';
			link.href = url;
			document.getElementsByTagName('head')[0].appendChild(link);
		};
		chrome.runtime.onMessage.addListener(function(msg, ob, sendResponse) {
			var s = document.getElementById('scrolldiscuss'),
				su = document.getElementById('scrollup');
			if(msg.message == 'ddc'){
				obddc.url = msg.url;
				obddc.def = msg.def;
				obddc.ddc = msg.ddc;
				if(obddc.ddc){
					/*if(s){
						s.innerHTML = insetrLink(obddc);
					}else{
						if(su){
							s = document.createElement('div');
							s.id = 'scrolldiscuss';
							su.parentNode.insertBefore(s,su);
							s.innerHTML = insetrLink(obddc);
						}
					}*/
					$('#adiscuss2, #adiscuss').html(insetrLink(obddc));
				}else{
					/*if(s){
						s.parentNode.removeChild(s);
					}
					$('#adiscuss2, #adiscuss').html("");*/
				}
			}else if(msg.message=='favicon'){
				setFaviconTag(msg.data);
			}
		});
}());