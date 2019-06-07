!function(){function t(e,n,r){function o(s,u){if(!n[s]){if(!e[s]){var a="function"==typeof require&&require;if(!u&&a)return a(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[s]={exports:{}};e[s][0].call(c.exports,function(t){return o(e[s][1][t]||t)},c,c.exports,t,e,n,r)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}return t}()({1:[function(require,module,exports){(function(process){!function(t,e){"function"==typeof define&&define.amd&&!0===define.amd.dust?define("dust.core",[],e):"object"==typeof exports?module.exports=e():t.dust=e()}(this,function(){function getTemplate(t,e){if(t)return"function"==typeof t&&t.template?t.template:dust.isTemplateFn(t)?t:!1!==e?dust.cache[t]:void 0}function load(t,e,n){if(!t)return e.setError(new Error("No template or template name provided to render"));var r=getTemplate(t,dust.config.cache);return r?r(e,Context.wrap(n,r.templateName)):dust.onLoad?e.map(function(e){function r(t,r){var i;if(t)return e.setError(t);if(!(i=getTemplate(r,!1)||getTemplate(o,dust.config.cache))){if(!dust.compile)return e.setError(new Error("Dust compiler not available"));i=dust.loadSource(dust.compile(r,o))}i(e,Context.wrap(n,i.templateName)).end()}var o=t;3===dust.onLoad.length?dust.onLoad(o,n.options,r):dust.onLoad(o,r)}):e.setError(new Error("Template Not Found: "+t))}function Context(t,e,n,r,o){void 0===t||t instanceof Stack||(t=new Stack(t)),this.stack=t,this.global=e,this.options=n,this.blocks=r,this.templateName=o,this._isContext=!0}function getWithResolvedData(t,e,n){return function(r){return t.push(r)._get(e,n)}}function Stack(t,e,n,r){this.tail=e,this.isObject=t&&"object"==typeof t,this.head=t,this.index=n,this.of=r}function Stub(t){this.head=new Chunk(this),this.callback=t,this.out=""}function Stream(){this.head=new Chunk(this)}function Chunk(t,e,n){this.root=t,this.next=e,this.data=[],this.flushable=!1,this.taps=n}function Tap(t,e){this.head=t,this.tail=e}var dust={version:"2.7.5"},ERROR="ERROR",WARN="WARN",INFO="INFO",DEBUG="DEBUG",EMPTY_FUNC=function(){};dust.config={whitespace:!1,amd:!1,cjs:!1,cache:!0},dust._aliases={write:"w",end:"e",map:"m",render:"r",reference:"f",section:"s",exists:"x",notexists:"nx",block:"b",partial:"p",helper:"h"},function(){var t,e,n={DEBUG:0,INFO:1,WARN:2,ERROR:3,NONE:4};"undefined"!=typeof console&&console.log?(t=console.log,e="function"==typeof t?function(){t.apply(console,arguments)}:function(){t(Array.prototype.slice.apply(arguments).join(" "))}):e=EMPTY_FUNC,dust.log=function(t,r){r=r||INFO,n[r]>=n[dust.debugLevel]&&e("[DUST:"+r+"]",t)},dust.debugLevel="NONE",void 0!==process&&process.env&&/\bdust\b/.test(process.env.DEBUG)&&(dust.debugLevel=DEBUG)}(),dust.helpers={},dust.cache={},dust.register=function(t,e){t&&(e.templateName=t,!1!==dust.config.cache&&(dust.cache[t]=e))},dust.render=function(t,e,n){var r=new Stub(n).head;try{load(t,r,e).end()}catch(t){r.setError(t)}},dust.stream=function(t,e){var n=new Stream,r=n.head;return dust.nextTick(function(){try{load(t,r,e).end()}catch(t){r.setError(t)}}),n},dust.loadSource=function(source){return eval(source)},Array.isArray?dust.isArray=Array.isArray:dust.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},dust.nextTick=function(){return function(t){setTimeout(t,0)}}(),dust.isEmpty=function(t){return!(0===t||(!dust.isArray(t)||t.length)&&t)},dust.isEmptyObject=function(t){var e;if(null===t)return!1;if(void 0===t)return!1;if(t.length>0)return!1;for(e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0},dust.isTemplateFn=function(t){return"function"==typeof t&&t.__dustBody},dust.isThenable=function(t){return t&&"object"==typeof t&&"function"==typeof t.then},dust.isStreamable=function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pipe},dust.filter=function(t,e,n,r){var o,i,s,u;if(n)for(o=0,i=n.length;o<i;o++)s=n[o],s.length&&(u=dust.filters[s],"s"===s?e=null:"function"==typeof u?t=u(t,r):dust.log("Invalid filter `"+s+"`",WARN));return e&&(t=dust.filters[e](t,r)),t},dust.filters={h:function(t){return dust.escapeHtml(t)},j:function(t){return dust.escapeJs(t)},u:encodeURI,uc:encodeURIComponent,js:function(t){return dust.escapeJSON(t)},jp:function(t){return JSON?JSON.parse(t):(dust.log("JSON is undefined; could not parse `"+t+"`",WARN),t)}},dust.makeBase=dust.context=function(t,e){return new Context(void 0,t,e)},dust.isContext=function(t){return"object"==typeof t&&!0===t._isContext},Context.wrap=function(t,e){return dust.isContext(t)?t:new Context(t,{},{},null,e)},Context.prototype.get=function(t,e){return"string"==typeof t&&("."===t[0]&&(e=!0,t=t.substr(1)),t=t.split(".")),this._get(e,t)},Context.prototype._get=function(t,e){var n,r,o,i,s,u=this.stack||{},a=1;if(r=e[0],o=e.length,t&&0===o)i=u,u=u.head;else{if(t)u&&(u=u.head?u.head[r]:void 0);else{for(;u&&(!u.isObject||(i=u.head,void 0===(n=u.head[r])));)u=u.tail;u=void 0!==n?n:this.global&&this.global[r]}for(;u&&a<o;){if(dust.isThenable(u))return u.then(getWithResolvedData(this,t,e.slice(a)));i=u,u=u[e[a]],a++}}return"function"==typeof u?(s=function(){try{return u.apply(i,arguments)}catch(t){throw dust.log(t,ERROR),t}},s.__dustBody=!!u.__dustBody,s):(void 0===u&&dust.log("Cannot find reference `{"+e.join(".")+"}` in template `"+this.getTemplateName()+"`",INFO),u)},Context.prototype.getPath=function(t,e){return this._get(t,e)},Context.prototype.push=function(t,e,n){return void 0===t?(dust.log("Not pushing an undefined variable onto the context",INFO),this):this.rebase(new Stack(t,this.stack,e,n))},Context.prototype.pop=function(){var t=this.current();return this.stack=this.stack&&this.stack.tail,t},Context.prototype.rebase=function(t){return new Context(t,this.global,this.options,this.blocks,this.getTemplateName())},Context.prototype.clone=function(){var t=this.rebase();return t.stack=this.stack,t},Context.prototype.current=function(){return this.stack&&this.stack.head},Context.prototype.getBlock=function(t){var e,n,r;if("function"==typeof t&&(t=t(new Chunk,this).data.join("")),!(e=this.blocks))return dust.log("No blocks for context `"+t+"` in template `"+this.getTemplateName()+"`",DEBUG),!1;for(n=e.length;n--;)if(r=e[n][t])return r;return dust.log("Malformed template `"+this.getTemplateName()+"` was missing one or more blocks."),!1},Context.prototype.shiftBlocks=function(t){var e,n=this.blocks;return t?(e=n?n.concat([t]):[t],new Context(this.stack,this.global,this.options,e,this.getTemplateName())):this},Context.prototype.resolve=function(t){var e;return"function"!=typeof t?t:(e=(new Chunk).render(t,this),e instanceof Chunk?e.data.join(""):e)},Context.prototype.getTemplateName=function(){return this.templateName},Stub.prototype.flush=function(){for(var t=this.head;t;){if(!t.flushable)return t.error?(this.callback(t.error),dust.log("Rendering failed with error `"+t.error+"`",ERROR),void(this.flush=EMPTY_FUNC)):void 0;this.out+=t.data.join(""),t=t.next,this.head=t}this.callback(null,this.out)},Stream.prototype.flush=function(){for(var t=this.head;t;){if(!t.flushable)return t.error?(this.emit("error",t.error),this.emit("end"),dust.log("Streaming failed with error `"+t.error+"`",ERROR),void(this.flush=EMPTY_FUNC)):void 0;this.emit("data",t.data.join("")),t=t.next,this.head=t}this.emit("end")},Stream.prototype.emit=function(t,e){var n,r,o=this.events||{},i=o[t]||[];if(!i.length)return dust.log("Stream broadcasting, but no listeners for `"+t+"`",DEBUG),!1;for(i=i.slice(0),n=0,r=i.length;n<r;n++)i[n](e);return!0},Stream.prototype.on=function(t,e){var n=this.events=this.events||{},r=n[t]=n[t]||[];return"function"!=typeof e?dust.log("No callback function provided for `"+t+"` event listener",WARN):r.push(e),this},Stream.prototype.pipe=function(t){if("function"!=typeof t.write||"function"!=typeof t.end)return dust.log("Incompatible stream passed to `pipe`",WARN),this;var e=!1;return"function"==typeof t.emit&&t.emit("pipe",this),"function"==typeof t.on&&t.on("error",function(){e=!0}),this.on("data",function(n){if(!e)try{t.write(n,"utf8")}catch(t){dust.log(t,ERROR)}}).on("end",function(){if(!e)try{t.end(),e=!0}catch(t){dust.log(t,ERROR)}})},Chunk.prototype.write=function(t){var e=this.taps;return e&&(t=e.go(t)),this.data.push(t),this},Chunk.prototype.end=function(t){return t&&this.write(t),this.flushable=!0,this.root.flush(),this},Chunk.prototype.map=function(t){var e=new Chunk(this.root,this.next,this.taps),n=new Chunk(this.root,e,this.taps);this.next=n,this.flushable=!0;try{t(n)}catch(t){dust.log(t,ERROR),n.setError(t)}return e},Chunk.prototype.tap=function(t){var e=this.taps;return this.taps=e?e.push(t):new Tap(t),this},Chunk.prototype.untap=function(){return this.taps=this.taps.tail,this},Chunk.prototype.render=function(t,e){return t(this,e)},Chunk.prototype.reference=function(t,e,n,r){return"function"==typeof t?(t=t.apply(e.current(),[this,e,null,{auto:n,filters:r}]),t instanceof Chunk?t:this.reference(t,e,n,r)):dust.isThenable(t)?this.await(t,e,null,n,r):dust.isStreamable(t)?this.stream(t,e,null,n,r):dust.isEmpty(t)?this:this.write(dust.filter(t,n,r,e))},Chunk.prototype.section=function(t,e,n,r){var o,i,s,u=n.block,a=n.else,l=this;if("function"==typeof t&&!dust.isTemplateFn(t)){try{t=t.apply(e.current(),[this,e,n,r])}catch(t){return dust.log(t,ERROR),this.setError(t)}if(t instanceof Chunk)return t}if(dust.isEmptyObject(n))return l;if(dust.isEmptyObject(r)||(e=e.push(r)),dust.isArray(t)){if(u){if((i=t.length)>0){for(s=e.stack&&e.stack.head||{},s.$len=i,o=0;o<i;o++)s.$idx=o,l=u(l,e.push(t[o],o,i));return s.$idx=void 0,s.$len=void 0,l}if(a)return a(this,e)}}else{if(dust.isThenable(t))return this.await(t,e,n);if(dust.isStreamable(t))return this.stream(t,e,n);if(!0===t){if(u)return u(this,e)}else if(t||0===t){if(u)return u(this,e.push(t))}else if(a)return a(this,e)}return dust.log("Section without corresponding key in template `"+e.getTemplateName()+"`",DEBUG),this},Chunk.prototype.exists=function(t,e,n){var r=n.block,o=n.else;if(dust.isEmpty(t)){if(o)return o(this,e)}else{if(r)return r(this,e);dust.log("No block for exists check in template `"+e.getTemplateName()+"`",DEBUG)}return this},Chunk.prototype.notexists=function(t,e,n){var r=n.block,o=n.else;if(dust.isEmpty(t)){if(r)return r(this,e);dust.log("No block for not-exists check in template `"+e.getTemplateName()+"`",DEBUG)}else if(o)return o(this,e);return this},Chunk.prototype.block=function(t,e,n){var r=t||n.block;return r?r(this,e):this},Chunk.prototype.partial=function(t,e,n,r){var o;return void 0===r&&(r=n,n=e),dust.isEmptyObject(r)||(n=n.clone(),o=n.pop(),n=n.push(r).push(o)),dust.isTemplateFn(t)?this.capture(t,e,function(t,e){n.templateName=t,load(t,e,n).end()}):(n.templateName=t,load(t,this,n))},Chunk.prototype.helper=function(t,e,n,r,o){var i,s=this,u=r.filters;if(void 0===o&&(o="h"),!dust.helpers[t])return dust.log("Helper `"+t+"` does not exist",WARN),s;try{return(i=dust.helpers[t](s,e,n,r))instanceof Chunk?i:("string"==typeof u&&(u=u.split("|")),dust.isEmptyObject(n)?s.reference(i,e,o,u):s.section(i,e,n,r))}catch(e){return dust.log("Error in helper `"+t+"`: "+e.message,ERROR),s.setError(e)}},Chunk.prototype.await=function(t,e,n,r,o){return this.map(function(i){t.then(function(t){i=n?i.section(t,e,n):i.reference(t,e,r,o),i.end()},function(t){var r=n&&n.error;r?i.render(r,e.push(t)).end():(dust.log("Unhandled promise rejection in `"+e.getTemplateName()+"`",INFO),i.end())})})},Chunk.prototype.stream=function(t,e,n,r,o){var i=n&&n.block,s=n&&n.error;return this.map(function(u){var a=!1;t.on("data",function(t){a||(i?u=u.map(function(n){n.render(i,e.push(t)).end()}):n||(u=u.reference(t,e,r,o)))}).on("error",function(t){a||(s?u.render(s,e.push(t)):dust.log("Unhandled stream error in `"+e.getTemplateName()+"`",INFO),a||(a=!0,u.end()))}).on("end",function(){a||(a=!0,u.end())})})},Chunk.prototype.capture=function(t,e,n){return this.map(function(r){var o=new Stub(function(t,e){t?r.setError(t):n(e,r)});t(o.head,e).end()})},Chunk.prototype.setError=function(t){return this.error=t,this.root.flush(),this};for(var f in Chunk.prototype)dust._aliases[f]&&(Chunk.prototype[dust._aliases[f]]=Chunk.prototype[f]);Tap.prototype.push=function(t){return new Tap(t,this)},Tap.prototype.go=function(t){for(var e=this;e;)t=e.head(t),e=e.tail;return t};var HCHARS=/[&<>"']/,AMP=/&/g,LT=/</g,GT=/>/g,QUOT=/\"/g,SQUOT=/\'/g;dust.escapeHtml=function(t){return"string"==typeof t||t&&"function"==typeof t.toString?("string"!=typeof t&&(t=t.toString()),HCHARS.test(t)?t.replace(AMP,"&amp;").replace(LT,"&lt;").replace(GT,"&gt;").replace(QUOT,"&quot;").replace(SQUOT,"&#39;"):t):t};var BS=/\\/g,FS=/\//g,CR=/\r/g,LS=/\u2028/g,PS=/\u2029/g,NL=/\n/g,LF=/\f/g,SQ=/'/g,DQ=/"/g,TB=/\t/g;return dust.escapeJs=function(t){return"string"==typeof t?t.replace(BS,"\\\\").replace(FS,"\\/").replace(DQ,'\\"').replace(SQ,"\\'").replace(CR,"\\r").replace(LS,"\\u2028").replace(PS,"\\u2029").replace(NL,"\\n").replace(LF,"\\f").replace(TB,"\\t"):t},dust.escapeJSON=function(t){return JSON?JSON.stringify(t).replace(LS,"\\u2028").replace(PS,"\\u2029").replace(LT,"\\u003c"):(dust.log("JSON is undefined; could not escape `"+t+"`",WARN),t)},dust})}).call(this,require("_process"))},{_process:2}],2:[function(t,e,n){function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(t){if(d===setTimeout)return setTimeout(t,0);if((d===r||!d)&&setTimeout)return d=setTimeout,setTimeout(t,0);try{return d(t,0)}catch(e){try{return d.call(null,t,0)}catch(e){return d.call(this,t,0)}}}function s(t){if(f===clearTimeout)return clearTimeout(t);if((f===o||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function u(){v&&h&&(v=!1,h.length?y=h.concat(y):m=-1,y.length&&a())}function a(){if(!v){var t=i(u);v=!0;for(var e=y.length;e;){for(h=y,y=[];++m<e;)h&&h[m].run();m=-1,e=y.length}h=null,v=!1,s(t)}}function l(t,e){this.fun=t,this.array=e}function c(){}var d,f,p=e.exports={};!function(){try{d="function"==typeof setTimeout?setTimeout:r}catch(t){d=r}try{f="function"==typeof clearTimeout?clearTimeout:o}catch(t){f=o}}();var h,y=[],v=!1,m=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];y.push(new l(t,e)),1!==y.length||v||i(a)},l.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=c,p.addListener=c,p.once=c,p.off=c,p.removeListener=c,p.removeAllListeners=c,p.emit=c,p.prependListener=c,p.prependOnceListener=c,p.listeners=function(t){return[]},p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],3:[function(t,e,n){var r=t("./favoriteListServices"),o=t("dustjs-linkedin");window.dust=window.dust||o,function(t,e,n,o){STAPLES=function(t){return t.favoriteListOverlay=r,t.favoriteListOverlay.setPopArray(),t}(t.STAPLES||{})}(window,document,jQuery)},{"./favoriteListServices":4,"dustjs-linkedin":1}],4:[function(t,e,n){var r=[];e.exports={initFavoriteList:function(){},addSingleItemToFavorites:function(t,e,n,r,o){var i=window.location,s="20001"==n?"CA":"US",u="https://"+document.domain+"/kuber/addToFavList?itemId="+t+"&tid="+s+"&langId="+e,a=STAPLES.Cookies.getCookie("WelcomeMsg");a&&(i+="&isFavoriteListOverlay=true"),i+="&isNewOverlay=true",i=escape(i);var l=$("div[id^='asgard-']"),c=(void 0!==l&&null!==l&&l.size(),"https://"+document.domain+propertyValues.POST_DOMAIN+"login?jumpUrl="+i+"&langId="+propertyValues.DEF_LANG_ID+"&userRedirect=true&storeId="+propertyValues.DEF_STORE_ID+"&catalogId="+propertyValues.DEF_CATALOG_ID);a?window.STAPLES.favoriteListOverlay.popOverlay(t,u,18,e):window.location.href=c,$("#overlayframe").load(function(){try{var t=$(this);if(t.contents().find("a[href*='performSubmit']").click(function(){t.addClass("animated fadeOut"),setTimeout(function(){closePopOverlay()},200)}),window.location.href.indexOf(t[0].contentDocument.location.href)>-1)return void window.STAPLES.favoriteListOverlay.closePopOverlay();if(t.contents().height()>t.height()){var e=t.contents().find("form .f05 .group");e.css({overflowY:"auto",maxHeight:t.height()-2*e.offset().top,float:"none"})}}catch(t){}})},popOverlay:function(t,e,n,o){try{if(window.STAPLES.favoriteListOverlay.removeMask(),window.STAPLES.favoriteListOverlay.closeoverlay(),$("#divOverlay").length>0&&$("#divOverlay").hide(),e.indexOf("bopisFlag")>-1)"20001"==propertyValues.DEF_STORE_ID?window.STAPLES.favoriteListOverlay.overlay(t,e,r[16][2],r[16][3],o):window.STAPLES.favoriteListOverlay.overlay(t,e,r[17][2],r[17][3],o);else{var i=r[n];window.STAPLES.favoriteListOverlay.overlay(t,e,i[2],i[3],i[0],o)}}catch(t){console.error("failed to show overlay",t)}},closePopOverlay:function(){var t=window.STAPLES.favoriteListOverlay.isFavoriteListOverlay(),e=window.STAPLES.favoriteListOverlay.isSkuPageOverlay();if(console.log("isSkuPage "+e),$("#pseudobody").remove(),$("#blanket").remove(),1==t&&location.reload(),1==e){document.cookie="isSKUOverlay=false; path=/";var n=window.location.href+"&isSKUOverlay=false";console.log("url "+n);var r=$("div[id^='asgard-']");void 0!==r&&null!==r&&r.size()>0?(console.log("Inside Asgard"),window.location.url=n,location.reload()):window.location.replace(n)}},removeMask:function(t){$("#mask").remove(),$(".quickViewOverlay").remove(),"undefined"!=typeof quickView&&!0===quickView&&(quickView=void 0),$("body").css("overflow","auto"),$("body #popup").empty().remove(),"yourorder"!=pageId&&"yourcart"!=pageId||(!0,window.STAPLES.favoriteListOverlay.closeoverlay()),$(".addtocart").remove()},closeoverlay:function(t){var e=new Error("dummy");if(e.stack&&e.stack.indexOf("sbdpas/js/closeoverlay.html")>=0)return!0;var n=window.STAPLES.favoriteListOverlay.isProductReviewIframeInSkuPage(),r=window.STAPLES.favoriteListOverlay.isFavoriteListOverlay();if($("#pseudobody").remove(),$("#blanket").remove(),("yourorder"==pageId||"yourcart"==pageId)&&t){var o=document.getElementById("pageRefreshFlag");void 0!==o&&null!=o&&"true"==o.value&&location.reload()}"skuskuset"==pageId&&1==n&&location.reload(),1==r&&location.reload()},overlay:function(t,e,n,r,o,i){document.getElementById("overlaydiv");if(top.location.href!=window.location.href)return window.STAPLES.favoriteListOverlay.overlay(t,e,n,r,o,i),!1;var s=!1;document.getElementById("blanket")&&(s=!0),$("#pseudobody").remove(),void 0===o&&(o="no");var u=$(document),a=u.height(),l=u.scrollTop(),c="";s||(c+="<div id='blanket' style='height: "+a+"px'></div>"),"samhome"==pageId?c+="<div id='pseudobody' style='height: "+a+"px'>":c+="<div id='pseudobody' onclick='STAPLES.favoriteListOverlay.closePopOverlay()' style='height: "+a+"px'>",c+="<div id='overlaydiv' style='height: "+r+"px; width: "+n+"px; margin-top: "+(50+l)+"px'>";var d=window.history.length;d<2&&(d=2),c+="";var f="US";1!==parseInt(i)&&2!==parseInt(i)||(f="CA"),c+="<iframe id='overlayframe' scrolling='yes' style='overflow-x: hidden;' frameborder='0' src='/kuber/addToFavList?itemId="+t+"&tid="+f+"&langId="+i+"'></iframe>",c+="</div></div>",$("body").append(c),$("#overlaydiv").height($("#overlaydiv #overlayframe").outerHeight()+50),$("#overlayframe").load(function(){$(this).width()<$(this).contents().width()&&$(this).contents().find("body, #wrapall .c00").css({minWidth:"inherit"}).each(function(){$(this).attr("style","width:auto!important;height:auto; "+$(this).attr("style"))})})},isProductReviewIframeInSkuPage:function(){if("skuskuset"==pageId){var t=document.getElementById("overlayframe");if(null!=t&&"undefined"!=t)try{var e=t.contentDocument.getElementById("ProductReviewForm");if(null!=e&&"undefined"!=e){if($("#loginmsg").text()==propertyValues.welcomeMsgForGuestUser)return!0}}catch(t){}}return!1},isFavoriteListOverlay:function(){var t=document.getElementById("overlayframe");if(null!=t&&"undefined"!=t)try{var e=t.contentDocument.getElementById("FavoriteListOverlay");if(null!=e&&"undefined"!=e){if($("#loginmsg").text()==propertyValues.welcomeMsgForGuestUser)return!0}}catch(t){}return!1},isSkuPageOverlay:function(){var t=document.getElementById("overlayframe");if(null!=t&&"undefined"!=t)try{var e=t.contentDocument.getElementById("skuoverlay"),n=t.contentDocument.getElementById("revs_content");if(null!=e&&"undefined"!=e)return!0;if(null!=n&&"undefined"!=n)return!0}catch(t){console.log("Error:"+t)}return!1},setPopArray:function(){for(var t=0;t<21;++t)r[t]=[];r[0][0]="yes",r[0][1]="no",r[0][2]=415,r[0][3]=330,r[1][0]="yes",r[1][1]="no",r[1][2]=630,r[1][3]=486,r[2][0]="no",r[2][1]="no",r[2][2]=570,r[2][3]=460,r[3][0]="yes",r[3][1]="yes",r[3][2]=800,r[3][3]=580,r[4][0]="no",r[4][1]="no",r[4][2]=630,r[4][3]=590,r[5][0]="no",r[5][1]="no",r[5][2]=760,r[5][3]=505,r[6][0]="no",r[6][1]="no",r[6][2]=504,r[6][3]=324,r[7][0]="no",r[7][1]="no",r[7][2]=660,r[7][3]=740,r[8][0]="no",r[8][1]="no",r[8][2]=600,r[8][3]=350,r[9][0]="yes",r[9][1]="no",r[9][2]=830,r[9][3]=686,r[10][0]="yes",r[10][1]="no",r[10][2]=400,r[10][3]=690,r[11][0]="yes",r[11][1]="no",r[11][2]=780,r[11][3]=300,r[12][0]="no",r[12][1]="no",r[12][2]=660,r[12][3]=762,r[13][0]="no",r[13][1]="no",r[13][2]=689,r[13][3]=703,r[14][0]="yes",r[14][1]="no",r[14][2]=800,r[14][3]=622,r[14][4]=800,r[14][5]=300,r[15][0]="yes",r[15][1]="no",r[15][2]=835,r[15][3]=770,r[16][0]="no",r[16][1]="no",r[16][2]=850,r[16][3]=670,r[17][0]="yes",r[17][1]="yes",r[17][2]=800,r[17][3]=650,r[18][0]="yes",r[18][1]="no",r[18][2]=835,r[18][3]=580,r[19][0]="yes",r[19][1]="no",r[19][2]=630,r[19][3]=590,r[20][0]="yes",r[20][1]="yes",r[20][2]=1100,r[20][3]=800}}},{}]},{},[3,4]);