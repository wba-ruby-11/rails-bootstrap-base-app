/*! talkin 1.3.0 */
window.LI||(window.LI={}),LI.TalkIn=LI.Talkin||function(n){"use strict";function t(){var n=A.domain.split(".").slice(-2).join(".");return A.domain!==n?(A.domain=n,!0):!1}function e(n){for(var t=I.length,e=L(n);t--;)if(I[t]===e)return!0;return!1}function r(){n.addEventListener?(s=function(n,t,e){n.addEventListener(t,e,!1)},l=function(n,t,e){n.removeEventListener(t,e)}):n.attachEvent&&(s=function(n,t,e){n.attachEvent("on"+t,e)},l=function(n,t,e){n.detachEvent("on"+t,e)})}function o(n){return T.call(n)===p}function i(n,t){var e,r,f;if(o(n))for(e in n)i(e,n[e]);else e=n.split("."),r=e[0],f=c.hasOwnProperty(r)?c[r]:null,e.length>1?(r=e[1],f.hasOwnProperty(r)&&f[r](t)):f(t)}function f(t){var r,o,s,p=t.data;if(e(t.origin))if(D)if(p===h||p===d)c=LI.TalkIn.endpoints,t.source.postMessage(h,t.origin);else try{r=JSON.parse(p),o=r[g]||r,delete r[g],i(o,r)}catch(I){}else if(!u&&(p===h||p===d))for(u=t.origin,l(n,v,f),a&&(n.clearInterval(a),a=null);w.length;)s=w.pop(),s[g]?LI.TalkIn.send(s[g],s):LI.TalkIn.send(s)}var a,c,u,s,l,h="__READY__",d="ADTALK_READY",g="ADTALK_ENDPOINT",v="message",p="[object Object]",I=["nsN0FYX3oxPXHFo7F61hk3BLmgw","qOB2HzNYRUAtmrFigAFhhIdKZX8","ft6Qf4NlUr+igYY6o7gL3U9PAzA","r/LByGpOBknQftv1+tpZONO+1e8","UN2TmDNo1h5c+Bty9q7GqXYZ94Y","ilgaq1nh7Zup+ZAk5SgZPeLQKAE","j/jyhrBSfizuVEh/YcNna4pJlBM","4rlVmy8S5DGns8N9yQ1S1zxQfyg","oYU1rheOj0XNs4hgDNyodd2YW8w","wC3CbUDuIqAJmcb/jGre+Rlb4T4","+3DJhQPlY5rBArZfhlWss5X0P+I","JDYCNYT++v4sSG+FZL1+BAkzkGs","ue5T9aOY34YF+XnDD5Drnf5MOMg","Mfoz2r9CRt9122j7jy7TL5Fs5Dg"],L=function(){function n(n){return a(t(f(n),n.length*u))}function t(n,t){var f,a,c,u,s,l,h,d,g=[80],v=1732584193,p=-271733879,I=-1732584194,L=271733878,A=-1009589776;for(n[t>>5]|=128<<24-t%32,n[(t+64>>9<<4)+15]=t,l=0;n.length>l;l+=16){for(f=v,a=p,c=I,u=L,s=A,h=0;80>h;h++)g[h]=16>h?n[l+h]:i(g[h-3]^g[h-8]^g[h-14]^g[h-16],1),d=o(o(i(v,5),e(h,p,I,L)),o(o(A,g[h]),r(h))),A=L,L=I,I=i(p,30),p=v,v=d;v=o(v,f),p=o(p,a),I=o(I,c),L=o(L,u),A=o(A,s)}return[v,p,I,L,A]}function e(n,t,e,r){return 20>n?t&e|~t&r:40>n?t^e^r:60>n?t&e|t&r|e&r:t^e^r}function r(n){return 20>n?1518500249:40>n?1859775393:60>n?-1894007588:-899497514}function o(n,t){var e=(65535&n)+(65535&t),r=(n>>16)+(t>>16)+(e>>16);return r<<16|65535&e}function i(n,t){return n<<t|n>>>32-t}function f(n){var t,e=[],r=(1<<u)-1;for(t=0;n.length*u>t;t+=u)e[t>>5]|=(n.charCodeAt(t/u)&r)<<32-u-t%32;return e}function a(n){var t,e,r,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i="";for(e=0;4*n.length>e;e+=3)for(t=(255&n[e>>2]>>8*(3-e%4))<<16|(255&n[e+1>>2]>>8*(3-(e+1)%4))<<8|255&n[e+2>>2]>>8*(3-(e+2)%4),r=0;4>r;r++)i+=8*e+6*r>32*n.length?c:o.charAt(63&t>>6*(3-r));return i}var c="",u=8;return function(t){return n(t)}}(),A=n.document,Y=n.top,D=n.window===Y,N=void 0!==n.webkitURL,O=void 0!==n.postMessage,T=Object.prototype.toString,w=[];if(r(),D)O&&s(n,v,f);else{if(!N)try{c=Y.LI.TalkIn.endpoints}catch(y){try{t()&&(c=Y.LI.TalkIn.endpoints)}catch(k){}}O&&!c&&s(n,v,f)}return{endpoints:{},register:function(n,t){var e,r,i=this.endpoints;if(n&&t&&t instanceof Object)if(i[n]&&o(t)){e=i[n];for(r in t)e[r]=t[r]}else i[n]=t},VERSION:"1.3.0"}}(window);LI.TalkIn.register("ads",(function(f){var b="data-expandable-initialized",n="data-expandable-closedWidth",d="true",i=5,e=10000,j="px",l=f.document,a={containers:{}};
function m(o){return parseInt(o,10)
}function k(o){return o.getAttribute(b)===d
}function h(q){var p=a.containers,o=p[q];
if(!o){o=p[q]=isNaN(q)?l.getElementById(q):c(q)
}return o
}function g(o,p){if(o&&p){if(f.getComputedStyle){return f.getComputedStyle(o).getPropertyValue(p)
}else{if(o.currentStyle){return o.currentStyle[p]
}}}}function c(t){var s=/tile=\d/,r=l.getElementsByTagName("iframe"),o=r.length,q,p;
while(o--){q=r[o];
p=q.src.match(s);
if(p&&p[0].slice(p[0].indexOf("=")+1)===t){return q
}}return null
}return{openRichMediaDialog:function(q){var o=a[q.mediaId];
function p(t){var v=l.getElementById("dialog-slideshare"),w=l.getElementById("media-player"),x,s,r,u;
if(!v||!w){return false
}x=t.mediaId||"";
s=LI.ads.assetURL.SLIDESHARE_PLAYER_CSS||"";
r=(typeof t.isLeadgenDisabled!=="undefined")?t.isLeadgenDisabled:"true";
u=(t.title)?encodeURIComponent(t.title.slice(-20)):"";
w.setAttribute("src","//www.slideshare.net/slideshow/embed_code/"+x+"?custom_css="+s+"&disable_leads="+r+"&lead_source=linkedin_"+u);
l.getElementById("header-slideshare").innerHTML=t.title;
l.getElementById("description-slideshare").innerHTML=t.description;
l.getElementById("btn-learnMore").onclick=function(){f.open(t.clickThroughUrl,"_blank")
};
o=a[x]={dialog:new LI.Dialog(),player:w,config:{name:"slideshare-ad-dialog",className:"dialog-v2 slideshare-ad",type:"task-modal",width:708,content:{title:t.dialogTitle,node:"dialog-slideshare-container"},dependencies:LI.SlideshareAdDependencies}};
return true
}if(!o&&!(p(q))){f.open(q.clickThroughUrl,"_blank")
}else{o.player.style.display="block";
o.dialog.open(o.config)
}},initialize:function(t){var p=h(t.containerId),s,r,q,u,o;
if(!p||k(p)){return
}u=l.createElement("div");
q=u.style;
q.width=p.offsetWidth+j;
q.height=p.offsetHeight+j;
r=g(p,"display");
q.display=(r==="inline")?"inline-block":r;
p.parentNode.insertBefore(u,p.nextSibling);
s=p.style;
s.position="absolute";
s.top=p.offsetTop+j;
s.left=p.offsetLeft+j;
s.zIndex=i;
p.setAttribute(b,d)
},expand:function(t){var o=h(t.containerId),s,r,p,q;
if(!o){return
}else{if(!k(o)){this.initialize(t)
}}r=o.style.left!==""?m(o.style.left):0;
p=o.offsetWidth;
q=((t.delta===true)?p:0)+(t.width||p);
s=o.style;
s.left=(r-(q-p))+j;
s.width=q+j;
s.zIndex=t.zIndex||e;
o.setAttribute(n,p)
},collapse:function(s){var p=h(s.containerId),r,o,t,q;
if(p){q=p.getAttribute(n);
if(q){r=p.style;
o=m(r.left);
t=p.offsetWidth;
r.width=q+j;
r.left=(o+(t-q))+j;
r.zIndex=s.zIndex||i
}}}}
}(window)));