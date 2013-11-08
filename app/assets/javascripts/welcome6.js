(function(){var e="hide",c=2500;
function d(g){var f=parseInt(YDom.getStyle(g,"margin-bottom")),h=new YAnim(g,{marginBottom:{to:0}},-f/c);
h.animate()
}function b(g){var f=g.offsetHeight+10,h=new YAnim(g,{marginBottom:{to:-f}},f/c);
h.onComplete.subscribe(function(){h=null;
if(!YDom.hasClass(g,e)){YDom.addClass(g,e)
}});
h.animate()
}function a(g,f){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusAggregation.js")
}f=f||{};
this.el=YDom.get(g);
YEvent.on(g,"click",this._onClick,this,true);
if(f.lazyEvent){this._onClick(f.lazyEvent)
}}a.prototype={_onClick:function(h){var g=YEvent.getTarget(h),f=g;
if(f.tagName!="A"){f=YDom.getAncestorByTagName(f,"A")
}if(!f){return
}if(YDom.hasClass(f,"expand")){YEvent.preventDefault(h);
this.expandAggregatedItems(f)
}else{if(YDom.hasClass(f,"nest-expand")){YEvent.preventDefault(h);
if(!YDom.hasClass(f,"nest-expand-loading")){this.expandNestedItems(f)
}}else{if(YDom.hasClass(f,"nest-collapse")){YEvent.preventDefault(h);
this.collapseNestedItems(f)
}else{if(YDom.hasClass(f,"split")){YEvent.preventDefault(h);
this.splitAggregatedItems(f)
}else{if(YDom.hasClass(f,"collapse")){YEvent.preventDefault(h);
this.collapseAggregatedItems(f)
}}}}}},collapseAggregatedItems:function(f){var g=YDom.getAncestorByClassName(f,"feed-item");
while(true){if(!YDom.hasClass(g,"feed-item-agg")){break
}YDom.addClass(g,"nus-hidden");
g=g.previousSibling
}YDom.removeClass(g,"feed-item-expanded")
},collapseNestedItems:function(g){var f=YDom.getAncestorByClassName(g,"feed-body"),h=YDom.getChildrenBy(f,function(i){return YDom.hasClass(i,"chron")
})[0];
b(h);
YDom.replaceClass(g,"nest-collapse","nest-expand");
if(YDom.hasClass(g.parentNode,"aggregation")){g.setAttribute("data-li-collapse-text",g.innerHTML);
g.innerHTML=g.getAttribute("data-li-expand-text")
}},expandAggregatedItems:function(f){if(this.fetchAggregatedItems(f,this.expandAggregatedItemsOnFetch)){return
}var g=YDom.getAncestorByClassName(f,"feed-item");
YDom.addClass(g,"feed-item-expanded");
while(true){g=g.nextSibling;
if(!YDom.hasClass(g,"feed-item-agg")){break
}YDom.removeClass(g,"nus-hidden")
}},expandAggregatedItemsOnFetch:function(j,i){var h=YDom.getElementsByClassName("expand","a",j)[0],f=YDom.getElementsByClassName("n","span",h)[0].innerHTML,g=i[i.length-1];
YDom.addClass(j,"feed-item-expanded");
if(g){g.appendChild(LI.domify('<p class="aggregation"><a class="collapse" href="#">'+YAHOO.lang.substitute((i.length>1)?LI.i18n.get("Nus-collapse-updates"):LI.i18n.get("Nus-collapse-update"),{"0":i.length,"1":f})+"</a></p>"))
}},fetchAggregatedItems:function(h,f){var g=h.getAttribute("data-li-agg-url");
if(!g||g=="#"){return false
}h.setAttribute("data-li-agg-url","#");
var i={success:function(n){var m=YDom.getAncestorByClassName(h,"feed-item"),l=YDom.getNextSibling(m)||m.parentNode,j;
try{j=LI.addToList(n.responseText,l,function(o){YDom.addClass(o,"feed-item-agg")
})
}catch(k){j=[]
}LI.highlight(m);
LI.each(j,function(o){LI.highlight(o);
LI.showAllDeferredImg(o)
});
if(f){f.apply(this,[m,j])
}},failure:function(j){},scope:this};
YAHOO.util.Connect.asyncRequest("GET",g,i);
return true
},expandNestedItems:function(i){var g=i.getAttribute("data-li-agg-url"),f=YDom.getAncestorByClassName(i,"feed-body"),j=i.getAttribute("data-li-bf-enabled"),h="chron",l;
if(j){h+=" backfill"
}if(!g||g=="#"){l=YDom.getChildrenBy(f,function(m){return YDom.hasClass(m,"chron")
})[0];
if(l){YDom.removeClass(l,e)
}d(l);
YDom.replaceClass(i,"nest-expand","nest-collapse");
if(YDom.hasClass(i.parentNode,"aggregation")){i.innerHTML=i.getAttribute("data-li-collapse-text")
}}else{i.setAttribute("data-li-agg-url","#");
YDom.addClass(i,"nest-expand-loading");
var k={success:function(r){var s=f.appendChild(LI.domify('<div style="position: absolute; top: 0; left: 0; width: 100%; visibility: hidden;"></div>')),q,m,p,n;
l=LI.domify('<ol class="'+h+'">'+r.responseText+"</ol>");
s.appendChild(l);
m=l.offsetHeight;
YDom.setStyle(l,"margin-bottom",(-m-10)+"px");
if(YDom.hasClass(i.parentNode,"backfill")){q=YDom.getElementsByClassName("feed-item","li",l)[0];
if(q){l.removeChild(q)
}}f.appendChild(l);
f.removeChild(s);
LI.showAllDeferredImg(l);
LI.Controls.parseFragment(l);
d(l);
YDom.replaceClass(i,"nest-expand","nest-collapse");
YDom.removeClass(i,"nest-expand-loading");
if(YDom.hasClass(i.parentNode,"aggregation")){n=YDom.getElementsByClassName("n","span",i)[0].innerHTML,p=YDom.getChildren(l).length;
i.setAttribute("data-li-expand-text",i.innerHTML);
i.innerHTML=YAHOO.lang.substitute((p>1)?LI.i18n.get("Nus-collapse-updates"):LI.i18n.get("Nus-collapse-update"),{"0":p,"1":n});
if(YDom.hasClass(i.parentNode,"backfill")){i.innerHTML=YAHOO.lang.substitute(LI.i18n.get("Nus-collapse-from"),{"0":n})
}}},failure:function(m){YDom.removeClass(i,"nest-expand-loading")
},scope:this};
YAHOO.util.Connect.asyncRequest("GET",g,k)
}},splitAggregatedItems:function(f){this.fetchAggregatedItems(f,this.splitAggregatedItemsOnFetch)
},splitAggregatedItemsOnFetch:function(g,f){g.parentNode.removeChild(g);
YDom.batch(f,function(h){var j=YDom.getElementsByClassName("comments","div",h)[0];
YDom.removeClass(j,e);
var i=YDom.getElementsByClassName("form","div",j)[0];
YDom.addClass(i,"mini")
})
}};
LI.NusAggregation=a
})();
YAHOO.register("LI.NusAggregation",LI.NusAggregation,{});(function(){var m="data-li-config",c="data-li-num-liked",d="data-li-summary-url",u=".feed-like .like",x=".feed-like .unlike",h="feed-like",n="feed-item",q="show-like",e="rollup-update-detail",f="social-gestures-likes",o="zero-count",s="liker",r="count-container",b="data-li-permLink",w="data-li-article-like-url",j="data-li-article-unlike-url",k="data-li-pulse-like-url",g="data-li-pulse-unlike-url",v="data-li-article-id",l="data-li-megaphoneFlag",a="data-li-lite-url",t="pre-rendered",p="likers";
function i(z,y){if(LI.__HPA===true){window.console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusLiking.js")
}y=y||{};
this.el=YDom.get(z);
this.cache={};
this.isKatyEnabled=y.isFeedKatificationEnabled;
this.isDust=!!y.isDust;
this.dustAllLikersTemplate=y.dustAllLikersTemplate||"tl/shared/uscp/social_activity/likes/_detail";
this.dustRecentLikersTemplate=y.dustRecentLikersTemplate||"tl/shared/uscp/social_activity/_recent_likes";
YEvent.on(z,"click",this._onClick,this,true);
if(y.lazyEvent){this._onClick(y.lazyEvent)
}}i.prototype={_onClick:function(y){this.likeOrUnlike(y);
this.likeOrUnlikeNewsUpdate(y);
this.showLikers(y);
this.hideLikers(y)
},hideLikers:function(B){var A=YEvent.getTarget(B),z,C,y;
if(!A||!YDom.hasClass(A,"show-less")){return
}YEvent.preventDefault(B);
z=A.parentNode;
C=z.id;
if(!C||!this.cache[C]){return
}y=this.cache[C];
this.cache[C]=z.innerHTML;
z.innerHTML=y
},updateLikeCount:function(z,A,y,H,G,D){var E=Y$(x,H,true),B=y&&y.parentNode,C,F;
if(D){if(A){if(y){B.replaceChild(A,y)
}else{G.insertBefore(A,G.firstChild)
}}else{if(y){B.removeChild(y)
}}}else{if(this.isDust){if(!z&&parseInt(E.getAttribute(c),10)===1){B.removeChild(y)
}else{C=E.getAttribute(d);
F={success:function(I){var J=YAHOO.lang.JSON.parse(I.responseText).content;
dust.render(this.dustRecentLikersTemplate,J,function(L,K){var M=LI.domify(YAHOO.lang.trim(K));
if(L){return
}if(y){B.replaceChild(M,y)
}else{G.insertBefore(M,G.firstChild)
}})
},failure:function(I){},scope:this};
YAHOO.util.Connect.asyncRequest("GET",C,F)
}}}if(z){this.incrementLike(H)
}else{this.decrementLike(H)
}},incrementLike:function(B){var z=Y$(".feed-like .like span",B,true),y=Y$(".feed-like .unlike span",B,true),A,D,C;
if(z&&y){D=z.parentNode;
C=y.parentNode;
A=parseInt(D.getAttribute(c),10);
y.innerHTML=z.innerHTML=LI.numberFormat(++A);
D.setAttribute(c,A);
C.setAttribute(c,A)
}else{A=1;
z=Y$(u,B,true);
y=Y$(x,B,true);
y.innerHTML=z.innerHTML=LI.i18n.get("NUS_LIKING_LIKE_LINK",1);
z.setAttribute(c,A);
y.setAttribute(c,A)
}},decrementLike:function(B){var z=Y$(".feed-like .like span",B,true),y=Y$(".feed-like .unlike span",B,true),A,D,C;
if(z&&y){D=z.parentNode;
C=y.parentNode;
A=parseInt(D.getAttribute(c),10);
if(A===1){z=Y$(u,B,true);
y=Y$(x,B,true);
y.innerHTML=z.innerHTML=LI.i18n.get("NUS_LIKING_LIKE",0);
z.setAttribute(c,0);
y.setAttribute(c,0)
}else{y.innerHTML=z.innerHTML=LI.numberFormat(--A);
D.setAttribute(c,A);
C.setAttribute(c,A)
}}},likeOrUnlike:function(B){var C=YEvent.getTarget(B),D=C,z,H,y,E,A,F;
if(D.tagName!=="A"){D=YDom.getAncestorByTagName(D,"A")
}if(!D){return
}y=D.getAttribute("data-li-unlike-url");
F=Boolean(parseInt(D.getAttribute(a),2));
z=!y;
y=y||D.getAttribute("data-li-like-url");
A=Boolean(parseInt(D.getAttribute(l),2));
if(!y||A===true){return
}YEvent.preventDefault(B);
H=D.parentNode;
E=YDom.getAncestorByClassName(D,"feed-uscp")?true:false;
YDom.addClass(H,"loading");
var G={success:function(K){var P,L,R,Y,S,U,I,X,M,V,J,O,T=E?false:true,Q=YAHOO.env.ua.ie,W=(Q&&Q<10)?K.responseXML.documentElement:K.responseXML;
if(W){G.failure(K)
}else{if(F){var N=YAHOO.lang.JSON.parse(K.responseText);
if(N.content&&N.content.toLowerCase()!=="success"){return
}}YDom.removeClass(H,"loading");
LI.toggleClass(D.parentNode,"show-like");
Y=YDom.getAncestorByClassName(D,e)||YDom.getAncestorByClassName(D,n);
if(!Y){return
}X=Y$("div.comments > ul",Y,true);
if(!X){R=Y$(".feed-body",Y,true);
this.createInsertDiscussionList(R);
X=Y$("div.comments > ul",Y,true)
}if(F&&!A){P=Y$("li.likers",X,true);
V=Y$("li.pre-rendered",X,true);
if(z&&V){YDom.replaceClass(V,t,p);
if(P){YDom.replaceClass(P,p,t)
}}else{if(P){YDom.replaceClass(P,p,t);
if(V){YDom.replaceClass(V,t,p)
}}}this.updateLikeCount(z,false,false,Y,false,false)
}else{S=(K.responseText)?LI.domify(K.responseText):null;
P=Y$("li.likers",X,true);
if(this.isKatyEnabled){if(E){J=YDom.getAncestorByTagName(D,"LI");
O=(J)?J.getAttribute("data-li-update-html"):null;
if(O&&O.toLowerCase()==="true"){S=YAHOO.lang.JSON.parse(K.responseText);
S=(S.content&&S.status&&S.status.toLowerCase()==="ok")?LI.domify(S.content):null;
T=true
}}this.updateLikeCount(z,S,P,Y,X,T)
}else{if(S){if(P){P.parentNode.replaceChild(S,P)
}else{X.insertBefore(S,X.firstChild)
}}else{if(P){P.parentNode.removeChild(P)
}}}}M=X.parentNode;
LI.show(M);
I=LI.Controls.getControl(this.el,"NusDiscussion");
if(!I){return
}U=YDom.getElementsByClassName("form","div",M)[0];
if(!U){return
}if(!YDom.getChildren(U).length){L=YAHOO.lang.JSON.parse(M.getAttribute(m));
I.createCommentForm(L,U)
}}},failure:function(I){window.location=D.href
},scope:this};
if(E||F){YAHOO.util.Connect.initHeader("X-IsAJAXForm","1")
}YAHOO.util.Connect.asyncRequest("GET",y,G)
},likeOrUnlikeNewsUpdate:function(H){var I=YEvent.getTarget(H),K=I,L,y,E,B,N,G,J,D,A,C,F,z;
if(K.tagName!=="A"){K=YDom.getAncestorByTagName(K,"A")
}if(!K){return
}F=Boolean(parseInt(K.getAttribute(l),2));
if(F){C=K.getAttribute(b)
}L=YDom.getAncestorByTagName(K,"LI");
if(YDom.hasClass(L,h)){L=K.parentNode;
if(YDom.hasClass(L,q)){y=(F===true)?K.getAttribute(k):K.getAttribute(w);
E=true
}else{y=(F===true)?K.getAttribute(g):K.getAttribute(j);
E=false
}if(!y){return
}J=E?"like":"unlike";
D=(LI.readCookie("JSESSIONID")||"").replace(/"/g,"");
A=K.getAttribute(v);
YEvent.preventDefault(H);
if(!YDom.hasClass(L,"loading")){YDom.addClass(L,"loading");
var M={success:function(Q){var T,P,O,S,R=(YAHOO.env.ua.ie)?Q.responseXML.documentElement:Q.responseXML;
if(R){M.failure(Q)
}else{YDom.removeClass(L,"loading");
LI.toggleClass(L,q);
P=YDom.getAncestorByClassName(K,e)||YDom.getAncestorByClassName(K,n);
if(!P){return
}O=T=S=null;
if(this.isKatyEnabled){this.updateLikeCount(E,O,T,P,S,true)
}}},failure:function(O){window.location=K.href
},custom:{error:function(O){window.location=K.href
}},scope:this};
z="submit="+J+"&csrfToken="+D+"&articleId="+A;
if(F===true){z+="&permLink="+C
}LI.asyncRequest("POST",y,M,z)
}}else{if(YDom.hasClass(L,f)){if(!YDom.hasClass(L,s)){y=K.getAttribute(w);
N=YDom.getNextSibling(K);
E=true
}else{y=K.getAttribute(j);
N=YDom.getPreviousSibling(K);
E=false
}if(!y){return
}B=YDom.getFirstChild(K);
G=YDom.getFirstChild(N);
if(!YDom.hasClass(B,r)||!YDom.hasClass(G,r)){return
}J=E?"like":"unlike";
D=(LI.readCookie("JSESSIONID")||"").replace(/"/g,"");
A=K.getAttribute(v);
YEvent.preventDefault(H);
if(!YDom.hasClass(B,"loading")){YDom.addClass(L,"is-loading");
YDom.addClass(B,"loading");
var M={success:function(Q){var O,P,R=(YAHOO.env.ua.ie)?Q.responseXML.documentElement:Q.responseXML;
if(R){M.failure(Q)
}else{O=parseInt(K.getAttribute(c),10);
if(E){YDom.addClass(L,s);
P=LI.numberFormat(++O)
}else{YDom.removeClass(L,s);
P=LI.numberFormat(--O)
}K.setAttribute(c,P);
N.setAttribute(c,P);
B.innerHTML=P;
G.innerHTML=P;
if(parseInt(P,10)===0){YDom.addClass(L,o)
}else{YDom.removeClass(L,o)
}YDom.removeClass(L,"is-loading");
YDom.removeClass(B,"loading")
}},failure:function(O){window.location=K.href
},custom:{error:function(O){window.location=K.href
}},scope:this};
LI.asyncRequest("POST",y,M,"submit="+J+"&csrfToken="+D+"&articleId="+A)
}}}},showLikers:function(C){var D=YEvent.getTarget(C),E=D,F=false,y,A,G,z,H,B;
if(E.tagName!=="A"){E=YDom.getAncestorByTagName(E,"A")
}if(!E||!YDom.hasClass(E,"other-likers")){return
}YEvent.preventDefault(C);
A=E.parentNode;
z=YDom.generateId(A);
if(!this.cache[z]){G=A.parentNode;
y=G.getAttribute("data-li-likers-url");
if(YDom.hasClass(G,"uscp-likers")){F=true
}H={success:function(I){var J;
this.cache[z]=A.innerHTML;
if(F){J=YAHOO.lang.JSON.parse(I.responseText).content;
if(this.isDust){dust.render(this.dustAllLikersTemplate,J,function(L,K){if(!L){A.innerHTML=K
}})
}else{A.innerHTML=J
}}else{A.innerHTML=I.responseText
}},failure:function(I){},scope:this};
if(F){YAHOO.util.Connect.initHeader("X-IsAJAXForm","1")
}YAHOO.util.Connect.asyncRequest("GET",y,H)
}else{B=this.cache[z];
this.cache[z]=A.innerHTML;
A.innerHTML=B
}},createInsertDiscussionList:function(y){var A,z=null;
if(y){A=document.createElement("div");
A.appendChild(document.createElement("ul"));
A.setAttribute("class","comments");
z=y.appendChild(A)
}return z
}};
LI.NusLiking=i
}());
YAHOO.register("LI.NusLiking",LI.NusLiking,{});LI.define("NusHiding");
LI.NusHiding=function(b,a){var a={showHiddenLink:a.showHiddenLink||null,hideHiddenLink:a.hideHiddenLink||null,countLink:"nus-hidden-count-link",count:"nus-hidden-count",lazyEvent:a.lazyEvent||null,breakoutHomeUrl:a.breakoutHomeUrl||false,breakoutPage:Boolean(parseInt(a.breakoutPage,2))||false};
YEvent.on(b,"click",this.hideMember,a);
YEvent.on(b,"click",this.refreshFeed,a);
if(a.lazyEvent){this.hideMember(a.lazyEvent,a);
this.refreshFeed(a.lazyEvent,a)
}};
LI.NusHiding.prototype={hideMember:function(h,c){var f=YEvent.getTarget(h),b=c.breakoutPage,g=c.breakoutHomeUrl;
if(!YDom.hasClass(f,"nus-hide-member")){return
}function i(k){if(!k.responseXML||k.responseXML.getElementsByTagName("responseInfo")[0].firstChild.nodeValue==="FAILURE"){e();
return
}var m=YDom.getAncestorByClassName(f,"feed-item");
if(!m.getAttribute("data-config")||m.getAttribute("data-config")===null){return
}var p=YJson.parse(m.getAttribute("data-config"));
var q=YDom.getElementsByClassName("nus-mid-"+p.mid,"li","feed-content");
YDom.addClass(q,"nus-hidden");
YDom.addClass(m,"nus-hidden-undo");
YDom.removeClass(m,"nus-hidden");
var t=k.responseXML.getElementsByTagName("responseMsg")[0].firstChild.nodeValue;
var l=YJson.parse(k.responseXML.getElementsByTagName("jsonPayLoad")[0].firstChild.nodeValue);
var r={undoUrl:l.undoUrl,undoTrackUrl:l.undoTrackUrl?l.undoTrackUrl:"",undoText:LI.i18n.get("NUS_HIDING_UNDO"),undoClose:LI.i18n.get("NUS_HIDING_CLOSE"),undoMessage:LI.i18n.get("NUS_HIDING_YOU_WILL_NO_LONGER_RECEIVE_UPDATES_FROM_THIS_MEMBER")};
var u=YAHOO.lang.substitute(['<div class="nus-undo">','<p>{undoMsg} &middot; <a href="{link}" data-li-track-url="{trackLink}" class="nus-undo-link">{text}</a></p>','<span class="dismiss">{close}</span>',"</div>"].join(""),{undoMsg:r.undoMessage,link:r.undoUrl,trackLink:r.undoTrackUrl,text:r.undoText,close:r.undoClose});
var v=LI.domify(u);
m.appendChild(v);
YEvent.on(Y$("a.nus-undo-link",m)[0],"click",LI.NusHiding.prototype.undoHideMember,[m,q,v,c]);
YEvent.on(Y$("span.dismiss",m)[0],"click",function(){LI.fade(m);
if(b&&g){window.location=g
}});
var n=YDom.get(c.count);
var j=YDom.get(c.countLink);
if(n){var s=(n.innerHTML)?parseInt(n.innerHTML,10):0;
if(!LI.NusHiding.prototype.isShowingHiddenUpdates()){if(s){var s=s+q.length
}else{var s=q.length
}if(s===0){LI.NusHiding.prototype.resetMasterLink()
}else{YDom.replaceClass(YDom.getAncestorByTagName(j,"li"),"hide","show");
n.innerHTML=s
}}}}function e(){var j=f.href.replace("format=ajax","format=page");
window.location=j
}YEvent.preventDefault(h);
var d={success:i,failure:e,timeout:15000};
var a=f.getAttribute("data-url");
YAHOO.util.Connect.asyncRequest("GET",a,d,null)
},undoHideMember:function(b,c){var e=YEvent.getTarget(b);
if(!YDom.hasClass(e,"nus-undo-link")){return
}function f(h){if(!h.responseXML||h.responseXML.getElementsByTagName("responseInfo")[0].firstChild.nodeValue==="FAILURE"){a();
return
}var l=c[0];
var p=c[1];
var m=c[2];
var j=c[3];
YDom.removeClass(l,"nus-hidden-undo");
YDom.removeClass(p,"nus-hidden");
l.removeChild(m);
for(var k=0;
k<p.length;
k++){LI.highlight(p[k])
}var n=YDom.get(j.count);
var g=YDom.get(j.countLink);
if(n){var q=(n.innerHTML)?parseInt(n.innerHTML,10):0;
if(LI.NusHiding.prototype.isShowingHiddenUpdates()===false){if(q){var q=q-p.length
}else{var q=p.length
}if(q===0){LI.NusHiding.prototype.resetMasterLink()
}else{YDom.replaceClass(YDom.getAncestorByTagName(g,"li"),"hide","show");
n.innerHTML=q
}}}}function a(){var g=e.href.replace("format=ajax","format=page");
window.location=g
}YEvent.preventDefault(b);
var d={success:f,failure:a,timeout:15000};
YAHOO.util.Connect.asyncRequest("GET",e.href,d,null)
},refreshFeed:function(b,d){var f=YEvent.getTarget(b),c;
if(!YDom.hasClass(f,"nus-refresh")){return
}function g(m){if(!m.responseText){a();
return
}var p=YDom.get("feed-content");
p.innerHTML=m.responseText;
LI.Controls.parseFragment(p);
window.networkUpdatesShowMore.init();
var h=Y$(".nus-now-showing","feed-content");
for(var j=0;
j<h.length;
j++){LI.highlight(h[j],null,null,10)
}if(typeof miniProfile!==undefined){window.miniProfile.init(p)
}var l=YDom.get(d.countLink);
var k=YDom.get("nus-hidden-count-master");
var n=(k.innerHTML)?parseInt(k.innerHTML,10):0;
if(LI.NusHiding.prototype.isShowingHiddenUpdates()){l.href=d.showHiddenLink;
if(YDom.hasClass(f,"master")){l.innerHTML=YAHOO.lang.substitute(LI.i18n.get("NUS_HIDING_IS_HIDING_MSG"),{0:n});
YDom.replaceClass(l,"is-showing","is-hiding")
}}else{l.href=d.showHiddenLink;
l.innerHTML=YAHOO.lang.substitute(LI.i18n.get("NUS_HIDING_IS_SHOWING_MSG"),{0:""});
YDom.replaceClass(l,"is-hiding","is-showing")
}if(n===0){LI.NusHiding.prototype.resetMasterLink()
}}function a(){}YEvent.preventDefault(b);
if(YDom.hasClass(f,"master")){var c=(LI.NusHiding.prototype.isShowingHiddenUpdates())?d.hideHiddenLink:d.showHiddenLink
}else{c=f.getAttribute("data-url")
}var e={success:g,failure:a,timeout:15000};
YAHOO.util.Connect.asyncRequest("GET",c,e,null)
},isShowingHiddenUpdates:function(){return YDom.hasClass("nus-hidden-count-link","is-showing")
},resetMasterLink:function(){var a=YDom.get("nus-hidden-count-link");
YDom.replaceClass(YDom.getAncestorByTagName(a,"li"),"show","hide");
YDom.get(a).innerHTML=YAHOO.lang.substitute(LI.i18n.get("NUS_HIDING_IS_HIDING_MSG"),{0:""});
YDom.replaceClass(a,"is-showing","is-hiding")
}};
YAHOO.register("LI.NusHiding",LI.NusHiding,{});LI.define("NusDeleteUpdate");
(function(){function f(i,j,g){var h;
if(i.indexOf("biz_remove_activity")===-1){i=LI.addParams(i,{ajax:1});
YAHOO.util.Connect.initHeader("X-IsAJAXForm","1")
}h=YConn.asyncRequest("GET",i,{success:function(p){var m=p.responseText,n,l;
try{n=p.responseXML.documentElement
}catch(k){n=p.responseXML
}LI.Dialog().close();
if(n){l=n.getElementsByTagName("responseInfo")[0];
if(l&&l.firstChild.nodeValue==="SUCCESS"){LI.injectAlert(n.getElementsByTagName("responseMsg")[0].firstChild.nodeValue,"success");
if(j&&j.parentNode){j.parentNode.removeChild(j)
}window.setTimeout(function(){LI.removeAlert(null,true);
if(g){window.location=g
}},2000)
}}else{if(m){l=YJson.parse(m);
if(l&&l.status==="ok"&&j&&j.parentNode){j.parentNode.removeChild(j)
}}}}})
}function e(g){var h=YEvent.getTarget(g);
if(YDom.hasClass(h,this.hideClass)){YEvent.preventDefault(g);
a.call(this,h.href,YDom.getAncestorByClassName(h,"feed-item"))
}}function b(h,j){var i=YEvent.getTarget(h),g=this.breakoutHomeUrl;
if(this.useAjax&&YDom.hasClass(i,"confirm-delete")){YEvent.preventDefault(h);
f(i.href,j,g)
}}function a(i,j){var g=['<div class="dialog-container interrupt">','<div class="attention"><p><strong>{0}</strong></p></div>','<p class="actions">','<a href="{3}" class="btn-primary confirm-delete">{1}</a>','<a href="#" class="dialog-close" role="button">{2}</a>',"</p>","</div>"].join(" "),h;
h=LI.domify(YAHOO.lang.substitute(g,{0:LI.i18n.get("NusDeleteUpdate-are-you"),1:LI.i18n.get("NusDeleteUpdate-yes"),2:LI.i18n.get("NusDeleteUpdate-cancel"),3:i}));
LI.Dialog().open({name:"nusDeleteUdpate",type:"interrupt",width:"500",className:"dialog-v2 nusDeleteUpdate",content:{node:h,title:LI.i18n.get("NusDeleteUpdate-please-confirm")}});
YEvent.on(h,"click",b,j,this)
}function c(){var g=this.tracking.onClose;
if(g.code){LI.Dialog().closeEvent.subscribe(function(){WebTracking.trackUserAction(g.code,g.data)
})
}}function d(h,g){if(LI.__HPA===true){window.console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusDeleteUpdate.js")
}g=g||{};
this.hideClass=g.clzName||"nus-hide-item";
this.useAjax=g.useAjax||false;
this.breakoutHomeUrl=g.breakoutHomeUrl||false;
this.tracking=g.tracking||{onClose:{code:null,data:{}}};
c.apply(this);
YEvent.on(h,"click",e,null,this);
if(g.lazyEvent){e.call(this,g.lazyEvent)
}}LI.NusDeleteUpdate=d
}());
YAHOO.register("LI.NusDeleteUpdate",LI.NusDeleteUpdate,{});LI.define("NusDiscussion");
(function(){var h="data-li-comment-id",n="data-li-config",r="data-li-discussion-id",l="data-li-member-name",z="data-li-scope-id",x="data-li-scope-type",u="data-li-topic-id",g="data-li-topic-type",A="data-li-urn-id",d="data-li-actor-type",y="data-li-actor-id",f="data-li-action-token",a="cancel-comment",j="comments",m="comment-item",k="comments-loading",b="disabled",q="loading",e="feed-delete-comment",s="feed-item",c="rollup-update-detail",p="focus-comment-form",v="post-comment",i="invalid",t="first",o="last",w="flag";
LI.NusDiscussion=function(C,B){this.el=YDom.get(C);
this.useDwr=(B.useDwr!=="undefined"&&B.useDwr===false)?false:true;
this.imgSize=B.imgSize||30;
this.maxLength=B.maxLength||700;
this.addCommentUrl=B.addCommentLink;
this.deleteCommentUrl=B.deleteCommentLink;
this.addCommentUrlUscp=B.addCommentLinkUscp;
this.addCommentUrlMegaphone=B.addCommentMegaphone;
this.deleteCommentUrlMegaphone=B.deleteCommentMegaphone;
this.deleteCommentUrlUscp=B.deleteCommentLinkUscp;
this.addCommentUrlTreasury=B.addCommentTreasury||"";
this.addCommentUrlEdu=B.addCommentEdu||"";
this.isFeedKatificationEnabled=!!B.isFeedKatificationEnabled;
this.isInCompany=!!B.isInCompany;
this.companyId=B.companyId||"";
this.commentSpamFlaggingEnabled=B.commentSpamFlaggingEnabled||false;
this.useMentions=B.useMentions||false;
this.useNewMiniProfile=B.useNewMiniProfile||false;
this.mentionsTriggerKeyString=B.mentionsTriggerKeyString||"A";
this.mentionsDedupeConnections=B.mentionsDedupeConnections||false;
this.mentionsDelay=B.mentionsQueryDelay||250;
this.isDust=!!B.isDust;
this.dustCommentThreadTemplate=B.dustCommentThreadTemplate||"tl/shared/uscp/social_activity/_comments";
this.urlRegEx=new RegExp(B.urlRegEx);
YEvent.on(C,"click",this._onClick,this,true);
YEvent.onFocus(C,this._onFocus,this,true);
this.isInDialog=B.isInDialog||false
};
LI.NusDiscussion.prototype={_onClick:function(E){var D=YEvent.getTarget(E),C=D,B=YDom.getAncestorByClassName(D,c)||YDom.getAncestorByClassName(D,s);
if(YDom.hasClass(D,v)){YEvent.preventDefault(E);
this.postComment(B);
return
}if(C.tagName!=="A"){C=YDom.getAncestorByTagName(C,"A")
}if(YDom.hasClass(C,e)){YEvent.preventDefault(E);
if(!YDom.hasClass(C,w)){this.deleteComment(C,B)
}return
}if(YDom.hasClass(C,a)){YEvent.preventDefault(E);
this.clearCommentForm(YDom.getAncestorByClassName(C,"form"));
return
}if(YDom.hasClass(C,p)){if(this.focusCommentForm(B)){YEvent.preventDefault(E)
}return
}if(YDom.hasClass(C,"show-all-comments")){YEvent.preventDefault(E);
this.showAllComments(C);
return
}},_onFocus:function(D){var C=YEvent.getTarget(D),B;
if(C.tagName==="TEXTAREA"&&YDom.hasClass(C,"comment-text")){YEvent.on(C,"blur",this._onBlur,this,true);
YEvent.on(C,"keyup",this._onKeyup,this,true);
B=YDom.getAncestorByClassName(C,c)||YDom.getAncestorByClassName(C,s);
this.focusCommentForm(B)
}},_onBlur:function(C){var B=YEvent.getTarget(C);
if(B.tagName==="TEXTAREA"&&YDom.hasClass(B,"comment-text")){YEvent.removeListener(B,"keyup",this._onKeyup);
YEvent.removeListener(B,"blur",this._onBlur)
}},_onKeyup:function(E){var D=YEvent.getTarget(E),B=YDom.getAncestorByClassName(D,c)||YDom.getAncestorByClassName(D,s),C=YDom.getElementsByClassName(v,"input",B)[0];
if(D.tagName==="TEXTAREA"&&YDom.hasClass(D,"comment-text")){if(this.isValid(B)){this.enableInput(C)
}else{this.disableInput(C)
}}},isValid:function(B){var C=YDom.getElementsByClassName("ghost","label",B)[0],D=YDom.getElementsByClassName("comment-text","textarea",B)[0];
return((D.value!=="")&&(C.innerHTML!==D.value)&&(!YDom.hasClass(D,i)))
},clearCommentForm:function(C){var B=C.getElementsByTagName("textarea")[0],D=$(".mentions-highlighter",C);
if(D.length){D[0].innerHTML=""
}B.value="";
B.blur();
YDom.addClass(C,"mini")
},createCommentForm:function(V,O){var J,M,I,C,N,L,K,R,S,T,F,Q,E,P,H,G,U,D,W,B;
J=V.activityID||new Date().getMilliseconds();
H=V.topicType+"-"+V.topicID+"-"+V.scopeType+"-"+V.scopeID+"-"+J;
P=V.ghostText||LI.i18n.get("NUS_DISCUSSION_ADD_A_COMMENT");
L="mentions-container-"+H;
S="mentions-data-"+H;
F="comment-highlighter-"+H;
Q="comment-body-"+H;
G="typeahead-container-"+H;
U="comment-typeahead-"+H;
D="comment-typeahead-"+H+"-script";
if(this.isFeedKatificationEnabled){if(this.useMentions){N=['<form action="#">','<div id="',L,'" class="mentions-container">','<pre class="mentions-highlighter" id="',F,'"></pre>','<label for="',Q,'" class="ghost">',P,"</label>",'<textarea class="texta comment-text mentions-input" id="',Q,'"></textarea></div>','<input type="hidden" name="comment-typeahead" id="',U,'" />','<script id="',D,'"><\/script>','<div class="mentions-typeahead-container" id="',G,'"></div>','<input type="hidden" name="mentions" id="',S,'" />','<div class="actions">','<input type="submit" class="',v,' btn-primary" value="',LI.i18n.get("NUS_DISCUSSION_COMMENT"),'">',"</div>","</form>"].join("")
}else{N=['<form action="#">','<label for="comment-body-',H,'" class="ghost">',P,"</label>",'<textarea class="texta comment-text" id="comment-body-',H,'"></textarea>','<div class="actions" >','<input type="submit" class="',v,' btn-primary" value="',LI.i18n.get("NUS_DISCUSSION_COMMENT"),'">',"</div>","</form>"].join("")
}}else{N=['<form action="#" id="form-network-update-',H,'">','<label for="comment-body-',H,'" id="comment-body-',H,'-label" class="ghost">',LI.i18n.get("NUS_DISCUSSION_ADD_A_COMMENT"),"</label>",'<textarea class="texta comment-text" id="comment-body-',H,'"></textarea>','<div class="actions" id="btn-',H,'">','<input type="submit" class="',v,' btn-primary" value="',LI.i18n.get("NUS_DISCUSSION_COMMENT"),'">'," ",LI.i18n.get("NUS_DISCUSSION_OR")," ",'<a href="#" class="',a,'">',LI.i18n.get("NUS_DISCUSSION_CANCEL"),"</a>","</div>","</form>"].join("")
}O.innerHTML=N;
if(!this.isValid(O)){B=YDom.getElementsByClassName(v,"input",O)[0];
this.disableInput(B)
}if(LI.hasPlaceholder||!this.useMentions){C=new LI.GhostLabel(YDom.getElementsByClassName("ghost","label",O)[0])
}M=new window.CheckTextarea(YDom.getElementsByClassName("comment-text","textarea",O)[0],{maxLength:this.maxLength,grow:{onFocus:40,infinite:this.useMentions},showMsgOn:"error"});
if(this.useMentions){I=V.topicID||0;
R="nus-discussion";
if(LI.MentionsDecorator.isInfluencer){K="mynetwork"
}else{K="my1stnetwork"
}E=LI.Controls.addControl(D,"LI.Typeahead2",{handleEventAs:["DEFAULT"],source:"TYPE_DISCUSSION_PARTICIPANTS_COMPANIES_FIRST_DEGREE_CONNECTIONS",maxResultsDisplayed:11,maxResultsPerSource:[{sourceID:"discussionparticipants",max:3},{sourceID:K,max:5},{sourceID:"company",max:3}],renderAs:["DEFAULT","AUTOCHOOSE",{autoSnapContainer:false}],containerEl:document.getElementById(G),resultsClass:"mentions-typeahead"});
W="&ta-updateId="+I+"&ta-posterId="+V.scopeID;
if(I!==J){W+="&ta-isMegaphone=true"
}T=LI.Controls.addControl(Q,"LI.MentionsDecorator",{triggers:this.mentionsTriggerKeyString,mentionsInputEl:"#"+Q,typeaheadEl:"#"+U,mentionsEl:"#"+S,highlightEl:"#"+F,context:R,urlAppend:W,dedupeConnections:this.mentionsDedupeConnections,queryDelay:this.mentionsQueryDelay})
}},disableInput:function(B){YDom.addClass(B,b);
B.disabled=true
},enableInput:function(B){YDom.removeClass(B,b);
B.disabled=false
},focusCommentForm:function(B){var G,C,F,E,D;
if(!B){return false
}G=YDom.getElementsByClassName(j,"div",B)[0];
if(!G){return false
}LI.show(G);
F=YDom.getElementsByClassName("form","div",G)[0];
if(!F){return false
}YDom.removeClass(F,"mini");
if(!YDom.getChildren(F).length){C=this.getConfigFromContainer(G);
this.createCommentForm(C,F)
}E=F.getElementsByTagName("textarea")[0];
if(!E){return false
}E.focus();
if(!this.isValid(G)){D=YDom.getElementsByClassName(v,"input",G)[0];
this.disableInput(D)
}return true
},getConfigFromContainer:function(B){var C=YJson.parse(B.getAttribute(n));
C.memberName=B.getAttribute(l)||"";
return C
},postComment:function(Q){function C(ah){var X="",V=YDom.getFirstChild(H),ab=YDom.getChildren(V),ar=T.value,Y=o,at=0,ap,ae=YDom.getElementsByClassName(p,"A",Q)[0],ai,ao,aj,ag,ac,aa,ad,Z=[],al,am,an,W=LI.htmlEncode(LI.htmlUnencode(U.memberName)),af=ah.mention||"",aq,ak=0;
ap=ae.getElementsByTagName("span");
am=ab[ab.length-1];
if(af&&af!=="[]"&&af.length&&J.useMentions){af=YJson.parse(af);
aq=af.length;
al=aq;
af=af.sort(function(av,au){return au.index-av.index
});
while(al--){aj=af[al];
aa=aj.index;
ao=aj.length;
ai=aa+ao;
ad=ar.substr(aa,ao);
ag=aj.mini||"";
ac=aj.profile||"";
if(aa){Z.push(M(ar.substr(ak,(aa-ak))))
}if(ac){if(ag){if(J.useNewMiniProfile){Z.push(['<span class="new-miniprofile-container ',aj.mini,'" data-li-url="',aj.mini,'" data-li-tl="tl/shared/profile/mini_profile_shell">','<a href="',aj.profile,'" class="mention">',LI.htmlEncode(ad),"</a></span>"].join(""))
}else{Z.push(['<span class="miniprofile-container ',aj.mini,'">','<a href="',aj.profile,'" class="mention">',LI.htmlEncode(ad),"</a>","</span>"].join(""))
}}else{Z.push(['<a href="',aj.profile,'" class="mention">',LI.htmlEncode(ad),"</a>"].join(""))
}}else{Z.push(LI.htmlEncode(ad))
}if(!al){Z.push(M(ar.substr(ai)))
}ak=ai
}Z=Z.join("")
}else{Z=M(ar)
}if(ap.length){ap=ap[0];
at=parseInt(ap.innerHTML.replace(/[^0-9]/,""),10)
}if(J.isFeedKatificationEnabled&&(at===0)){X='<div class="bubble"></div>';
Y=t
}YDom.removeClass(am,o);
an=['<li class="',m," ",Y,'">',X,'<img class="feed-photo photo" width="',J.imgSize,'" height="',J.imgSize,'" alt="',W,'" src="',U.memberPhoto,'">',"<p>",'<a id="nus-comment-',ah.commentID,'" data-li-uscp-action="delete-my-comment" href="',ah.deleteCommentLink,'" class="delete ',e,'" ',g,'="',U.topicType,'" ',u,'="',U.topicID,'" ',x,'="',U.scopeType,'" ',z,'="',U.scopeID,'" ',r,'="',ah.discussionID,'" ',h,'="',ah.commentID,'" ',A,'="',U.objectUrnId,'">',LI.i18n.get("NUS_DISCUSSION_DELETE"),"</a>",'<a href="',U.profileLink,'" class="commenter">',W,"</a> ","<q>",Z,"</q> ",'<span class="nus-timestamp">',LI.i18n.get("NUS_DISCUSSION_TIME_MSG"),"</span> ","</p>","</li>"].join("");
V.appendChild(LI.domify(an));
J.clearCommentForm(YDom.getElementsByClassName("form","div",Q)[0]);
if(at===0){ae.innerHTML+=" (<span>1</span>)"
}else{ap.innerHTML=LI.numberFormat(at+1)
}J.enableInput(B);
if(J.isInDialog){LI.Events.fire("nusPostSuccess")
}}function O(V){var W;
J.error=LI.domify('<span class="error">'+LI.i18n.get("NUS_DISCUSSION_ERROR_GENERIC")+"</span>");
if(J.useMentions){W=YDom.getAncestorByClassName(T,"form");
W.insertBefore(J.error,W.firstChild)
}else{T.parentNode.insertBefore(J.error,T)
}J.enableInput(B)
}function M(ad){var Y=LI.htmlEncode(ad).split(" ");
var ae=[],X=Y.length,W="",ac=J.urlRegEx,aa="http://",ab="https://";
for(var Z=0;
Z<X;
Z++){var V=Y[Z];
if(ac.test(V)){W=V;
if(W.indexOf(aa)!=0&&W.indexOf(ab)!=0){W=aa+W
}V='<a class="comment-url" data-li-trkcode="commentURL" href="'+W+'" target="_blank">'+V+"</a>"
}ae.push(V)
}return ae.join(" ")
}var H=YDom.getElementsByClassName(j,"div",Q)[0],U=this.getConfigFromContainer(H),T=YDom.getElementsByClassName("comment-text","textarea",H)[0],D=YDom.getElementsByClassName("ghost","label",H)[0],L=YDom.getAncestorByClassName(H,"feed-uscp")?true:false,E=YDom.getAncestorByClassName(H,"linkedin-profile-update-treasury")?true:false,I=U.megaphoneFlag&&Boolean(parseInt(U.megaphoneFlag,2)),R=U.eduFlag&&Boolean(parseInt(U.eduFlag,2)),P="",N=Y$("input[name=mentions]",Q),G,J=this,S=window.escape,K,B,F;
if(L){if(E&&this.addCommentUrlTreasury!==""){G=this.addCommentUrlTreasury
}else{if(R&&this.addCommentUrlEdu!==""){G=this.addCommentUrlEdu
}else{G=this.addCommentUrlUscp
}}}else{if(I){G=this.addCommentUrlMegaphone
}else{G=this.addCommentUrl
}}if((T.value==="")||(D.innerHTML===T.value)){return
}if(N.length){P="&mentions="+N[0].value
}K={async:true,callback:C,errorHandler:O,timeout:12000};
if(!this.isFeedKatificationEnabled){LI.hide(YDom.getNextSibling(T))
}B=YDom.getElementsByClassName(v,"input",H)[0];
this.disableInput(B);
this.removeError();
if(this.useDwr){LI.later(window.NetworkUpdateDiscussionAjaxService,0,"comment",U.topicType,U.topicID,U.scopeType,U.scopeID,T.value,K)
}else{if(G){if(this.isInCompany){F=["activityId=",S(U.topicID),"&companyId=",encodeURIComponent(this.companyId),"&content=",encodeURIComponent(T.value),P].join("")
}else{if(L){F=["activityUrn=",S(U.objectUrn),"&objectUrn=",S(U.objectUrnId),"&attributedObjectUrn=",S(U.attributedObjectUrnId),"&comment=true","&createViralActivity=",S(U.createViralActivity),"&message=",encodeURIComponent(T.value),P,"&actorId=",S(U.actorId),"&actorType=",S(U.actorType),"&actionToken=",S(U.actionToken)].join("");
if(E){F=["activityId=",S(U.activityID),"&objectUrn=",S(U.objectUrnId),"&threadUrn=",S(U.objectUrnId),"&attributedObjectUrn=",S(U.attributedObjectUrnId),"&comment=true","&createViralActivity=",S(U.createViralActivity),"&message=",encodeURIComponent(T.value),P,"&actorId=",S(U.actorId),"&actorType=",S(U.actorType),"&actionToken=",S(U.actionToken)].join("")
}}else{if(I){F=["articleId=",S(U.topicID),"&commentBody=",encodeURIComponent(T.value),"&permLink=",S(U.permLink),P].join("")
}else{F=["topicType=",S(U.topicType),"&topicId=",S(U.topicID),"&scopeType=",S(U.scopeType),"&scopeId=",S(U.scopeID),"&comment=",encodeURIComponent(T.value),P].join("")
}}}LI.asyncRequest("POST",G,{custom:{error:O},failure:function(){O()
},success:function(W){var V=W.responseText,X;
if(V){if((typeof V!=="object")&&(V==="error"||LI.isFullPage(V))){O()
}else{if(J.isInCompany||L){X=V
}else{if(I){X={commentID:V.pulseComment.commentIdStr,deleteCommentLink:"#",mention:V.pulseComment.mentions}
}else{X=YJson.parse(V)
}}C(X)
}}}},F)
}}},removeError:function(){if(this.error){this.error.parentNode.removeChild(this.error);
this.error=null
}},showAllComments:function(F){function B(I){var G;
if(this.isDust){try{G=LI.parseJSON(I.responseText);
if(G.status==="ok"){dust.render(this.dustCommentThreadTemplate,G.content,function(K,J){if(K){YDom.removeClass(D,k)
}else{J=YAHOO.lang.trim(J);
LI.addToList(J,D)
}})
}}catch(H){}D.parentNode.removeChild(D)
}else{try{LI.addToList(I.responseText,D)
}catch(H){}D.parentNode.removeChild(D)
}}function C(){YDom.removeClass(D,k)
}var E={success:B,failure:C,timeout:12000,scope:this},D=YDom.getAncestorByTagName(F,"li");
YDom.addClass(D,k);
YAHOO.util.Connect.asyncRequest("GET",F.getAttribute("data-li-more-url"),E)
},deleteComment:function(K,N){function H(){var O=YDom.getAncestorByTagName(K,"li"),Q,R,S,P;
O.parentNode.removeChild(O);
Q=YDom.getElementsByClassName(p,"A",N)[0];
S=Q.getElementsByTagName("span");
if(S.length){S=S[0];
R=parseInt(S.innerHTML.replace(/[^0-9]/,""),10)-1;
if(R>0){S.innerHTML=LI.numberFormat(R)
}else{P=Q.innerHTML.indexOf("(");
Q.innerHTML=Q.innerHTML.substring(0,P)
}}}function F(){YDom.removeClass(M,q)
}var G={async:true,callback:H,errorHandler:F,timeout:120000},M=K.parentNode,E=YDom.getElementsByClassName(j,"div",N)[0],D=this.getConfigFromContainer(E),J=Y$(".feed-uscp",N,true),C=D.megaphoneFlag&&Boolean(parseInt(D.megaphoneFlag,2)),I=J?this.deleteCommentUrlUscp:(C?this.deleteCommentUrlMegaphone:this.deleteCommentUrl),L=window.escape,B;
YDom.addClass(M,q);
if(this.useDwr){LI.later(window.NetworkUpdateDiscussionAjaxService,0,"deleteComment",K.getAttribute(g),K.getAttribute(u),K.getAttribute(x),K.getAttribute(z),K.getAttribute(r),K.getAttribute(h),G)
}else{if(I){if(this.isInCompany){B="activityId="+L(K.getAttribute(u))+"&companyId="+encodeURIComponent(this.companyId)+"&commentId="+L(K.getAttribute(h))
}else{if(J){B="threadUrn="+L(K.getAttribute(A))+"&commentId="+L(K.getAttribute(h));
if(D){B+="&actorId="+L(D.actorId)+"&actorType="+L(D.actorType)+"&actionToken="+L(D.actionToken)
}else{B+="&actorId="+L(K.getAttribute(y))+"&actorType="+L(K.getAttribute(d))+"&actionToken="+L(K.getAttribute(f))
}}else{if(C){B=["submit=delete","&articleId=",L(D.topicID),"&commentId=",L(K.getAttribute(h)),"&permLink=",L(D.permLink)].join("")
}else{B="topicType="+L(K.getAttribute(g))+"&topicId="+L(K.getAttribute(u))+"&scopeType="+L(K.getAttribute(x))+"&scopeId="+L(K.getAttribute(z))+"&discussionId="+L(K.getAttribute(r))+"&commentId="+L(K.getAttribute(h))
}}}LI.asyncRequest("POST",I,{failure:function(){F()
},success:function(P){var O=P.responseText;
if(O){if(O==="error"){F()
}else{H()
}}},custom:{error:F}},B)
}}}}
}());LI.define("NusTweetStatus");
LI.NusTweetStatus=function(c,b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusTweetStatus.js")
}if(c.tagName!=="INPUT"&&Y$("input[type=checkbox]",c).length>0){c=Y$("input[type=checkbox]",c,true)
}b={mode:(b.mode)?b.mode:null,popupURL:(b.popupURL)?b.popupURL:null,settingsURL:(b.settingsURL)?b.settingsURL:null,selectId:(b.selectId)?b.selectId:"twit-account-select",ulId:(b.ulId)?b.ulId:"twit-account-list",isOffsite:(b.isOffsite)?b.isOffsite:false,i18n:(b.i18n)?{editLinkText:(b.i18n.editLinkText)?b.i18n.editLinkText:null,logoTooltip:(b.i18n.logoTooltip)?b.i18n.logoTooltip:null}:null};
function d(){YEvent.on(c,"click",function(f){var g=YEvent.getTarget(f);
if(this.checked&&!YDom.hasClass(c,"bound")){LI.popup(b.popupURL,{width:850,height:500});
setTimeout(function(){g.checked=false
},500)
}});
YDom.removeClass(c,"check-nojs")
}function a(){YEvent.on(c,"click",function(f){YEvent.stopPropagation(f);
LI.toggleClass(c,"open")
});
YEvent.on(document,"click",function(f){YDom.removeClass(c,"open")
})
}function e(){var m=YDom.get(b.ulId);
var n=YDom.get(b.selectId);
var f=n.options;
var k=[];
var o;
for(var l=0;
f.length>l;
l++){if(f[l].selected){o='<li><a href="#" class="selected twit-userID" title="'+b.i18n.logoTooltip+'" data-twit-id="{0}">{1}</a></li>'
}else{o='<li><a href="#" class="twit-userID" title="'+b.i18n.logoTooltip+'" data-twit-id="{0}">{1}</a></li>'
}o=YAHOO.lang.substitute(o,{0:f[l].value,1:f[l].innerHTML});
k.push(o)
}var g=(b.isOffsite)?' target="_blank"':"";
var h=YAHOO.lang.substitute('<li class="separator"><a href="{0}" '+g+">{1}</a></li>",{0:b.settingsURL,1:b.i18n.editLinkText});
k.push(h);
m.innerHTML=k.join("");
var j=Y$("a.twit-userID",m);
YEvent.on(j,"click",function(p){YEvent.preventDefault(p);
YEvent.stopPropagation(p);
if(!YDom.hasClass(this,"selected")){YDom.removeClass(j,"selected");
YDom.addClass(this,"selected");
for(var q=0;
f.length>q;
q++){if(this.getAttribute("data-twit-id")===f[q].value){n.selectedIndex=q
}}c.title=this.title
}})
}switch(b.mode){case"no-account":d();
break;
case"multiple-accounts":e(c);
a();
break
}};(function(){var e="rollup-update-detail-hidden",f="photo-large",h="photo-bigger",g=".rollup-member-photos .photo",c=".rollup-update-detail",a="li-selected",i="data-li-track-hover-url",b=YAHOO.env.ua;
LI.DigestHoverReveal=function d(k,j){this.container=k;
this.member_photos=Y$(g,k);
this.details=Y$(c,k);
this.trackingKey=j.trackingKey||"NUS_DIG_NEW-hover";
this.isDisableTracking=j.isDisableTracking||false;
this.timer=null,this.biggerImageEnable=j.biggerImageEnable,this.lastEl;
YEvent.on(this.member_photos,"mouseover",this.digestFocus,this);
YEvent.on(this.member_photos,"mouseout",this.clearTimer,this)
};
LI.DigestHoverReveal.prototype={digestFocus:function(k,o){var q=YEvent.getTarget(k),p="#"+q.id.replace("photo","detail"),n=Y$(p,o.container),m=o.details,j,l;
if(o.lastEl===q){return
}this.timer=setTimeout(function(){o.lastEl=q;
var s=o.biggerImageEnable?h:f;
YDom.removeClass(o.member_photos,s);
YDom.addClass(q,s);
if(b.ie&&b.ie<8){var v=o.member_photos.length,t,r;
for(var u=0;
u<v;
u++){t=o.member_photos[u];
r=YDom.getAncestorByTagName(t,"li");
YDom.removeClass(r,a)
}r=YDom.getAncestorByTagName(q,"li");
YDom.addClass(r,a)
}YDom.addClass(m,e);
YDom.removeClass(n,e);
if(o.isDisableTracking===false){WebTracking.trackUserAction(o.trackingKey)
}j=$(q).closest("["+i+"]");
if(j){l=j.attr(i);
if(l){$.ajax(l)
}}return this
},200)
},clearTimer:function(j){if(this.timer){clearTimeout(this.timer)
}}}
}());
YAHOO.register("LI.DigestHoverReveal",LI.DigestHoverReveal,{});(function(){var a="gyml-home-carousel",l=".delete",f=".logo-hover",c=".ol-carousel",h=".carousel-element",d=".next-button",q=".action-join",m=".private-join",o=".public-join",r=".showmore-no-interaction",e=".showmore-interaction",i="next-button-hidden",j="hidden",b="fadeout",k="on",p="off",n=YAHOO.env.ua;
LI.RecommendationsHover=function g(t,s){this.container=t;
this.deleteButton=Y$(l,t,true);
this.logoHover=Y$(f,t,true);
this.nextButton=Y$(d);
this.joinButton=Y$(q,t);
this.privateJoin=Y$(m,t,true);
this.publicJoin=Y$(o,t,true);
this.noInteraction=Y$(r,a);
this.interaction=Y$(e,a);
this.olCarousel=Y$(c,a);
this.liCarousel=Y$(h,a);
this.interactionTimeout=null;
YEvent.on(this.container,"mouseover",this.reveal,this);
YEvent.on(this.container,"mouseout",this.hide,this);
YEvent.on(this.deleteButton,"mouseup",this.remove,this);
YEvent.on(this.joinButton,"click",this.joinGroup,this);
if(!YEvent.getListeners("gyml-next-button","mouseup")){YEvent.on(this.nextButton,"mouseup",this.slide,this)
}};
LI.RecommendationsHover.prototype={findFirstOff:function(u){var v=0,s=u.liCarousel,t;
for(t=s.length-1;
t>=0;
t--){if(YDom.hasClass(s[t],k)){v=t+1;
break
}}return v
},reveal:function(s,t){var v=YEvent.getTarget(s),u=50;
clearTimeout(t.interactionTimeout);
if((v===t.joinButton)||(v.parentNode===t.joinButton)){YEvent.preventDefault(s);
YDom.addClass(t.deleteButton,b);
YDom.addClass(t.logoHover,b);
setTimeout(function(){YDom.addClass(t.deleteButton,j);
YDom.addClass(t.logoHover,j)
},u)
}else{YDom.removeClass(t.deleteButton,j);
YDom.removeClass(t.logoHover,j);
setTimeout(function(){YDom.removeClass(t.deleteButton,b);
YDom.removeClass(t.logoHover,b)
},u)
}return this
},hide:function(s,u){var t=this,v=50;
u.interactionTimeout=setTimeout(function(){YDom.addClass(u.deleteButton,b);
YDom.addClass(u.logoHover,b);
setTimeout(function(){YDom.addClass(u.deleteButton,j);
YDom.addClass(u.logoHover,j)
},v);
return t
},v)
},remove:function(s,x){var u={width:{to:0},margin:{to:0}},y=new YAnim(x.container,u),t=x.liCarousel,z,w,v;
y.duration=0.15;
z=x.findFirstOff(x);
YDom.removeClass(t[z],p);
YDom.addClass(t[z],k);
setTimeout(function(){if(!n.ie){YDom.addClass(x.nextButton,i)
}y.animate()
},500);
setTimeout(function(){if(!n.ie){YDom.removeClass(x.nextButton,i)
}v=null;
v=x.container;
v.parentNode.removeChild(v)
},650);
return this
},slide:function(A,x){var B,y,v,s=x.liCarousel,t=516,w=YDom.getStyle(x.olCarousel,"right"),u=parseInt(w),z=u+t;
B=x.findFirstOff(x);
if(YDom.hasClass(s[B],p)){if(s[B+3]){for(v=B;
v<B+3;
v++){YDom.removeClass(s[v],p);
YDom.addClass(s[v],k)
}}else{y=s.slice(B).length;
for(v=B;
v<B+y;
v++){YDom.removeClass(s[v],p);
YDom.addClass(s[v],k)
}}for(v=B-1;
v>=B-3;
v--){YDom.removeClass(s[v],k);
YDom.addClass(s[v],p)
}YDom.setStyle(x.olCarousel,"right",z+"px");
B=x.findFirstOff(x);
if(!s[B]){YDom.addClass(x.nextButton,i)
}}return this
},joinGroup:function(s,v){var w=YEvent.getTarget(s),x=v.joinButton,u,y,t;
YEvent.preventDefault(s);
if(w.tagName!=="A"){w=YDom.getAncestorByTagName(w,"A")
}u=w.getAttribute("data-gyml-feed-join-url");
YDom.addClass(x,"loading");
y={success:function(z){t=z.responseText||"";
if(t.indexOf("auto_granted")>=0||t.indexOf("pending_approval")>=0){YDom.removeClass(x,"loading");
YDom.addClass(x,j);
if(w.getAttribute("data-gyml-ispublic")=="false"){YDom.removeClass(v.privateJoin,j)
}else{YDom.removeClass(v.publicJoin,j)
}YDom.addClass(v.noInteraction,j);
YDom.removeClass(v.interaction,j);
setTimeout(function(){YDom.removeClass(v.interaction,b)
},50)
}else{y.failure(z)
}},failure:function(z){window.location=w.href
},scope:this};
LI.asyncRequest("POST",u,y)
}}
}());
YAHOO.register("LI.RecommendationsHover",LI.RecommendationsHover,{});(function(){var e=".followCurrentCompany",a=".not-following",c=".currently-following",d="hide";
LI.FormerCoworkers=function b(g,f){this.container=g;
this.followButton=Y$(e,g);
this.notFollowing=Y$(a,g);
this.currentlyFollowing=Y$(c,g);
YEvent.on(this.followButton,"mouseup",this.followCompany,this)
};
LI.FormerCoworkers.prototype={followCompany:function(g,i){var j=YEvent.getTarget(g),f=i.followButton,h,k;
YEvent.preventDefault(g);
if(j.tagName!=="A"){j=YDom.getAncestorByTagName(j,"A")
}h=j.getAttribute("data-former-coworkers-follow-url");
YDom.addClass(f,"loading");
k={success:function(l){var m=(YAHOO.env.ua.ie)?l.responseXML.documentElement:l.responseXML;
if(m){k.failure(l)
}else{YDom.removeClass(f,"loading");
YDom.addClass(i.notFollowing,d);
YDom.removeClass(i.currentlyFollowing,d)
}},failure:function(l){window.location=j.href
},scope:this};
YAHOO.util.Connect.asyncRequest("GET",h,k)
}}
}());
YAHOO.register("LI.FormerCoworkers",LI.FormerCoworkers,{});LI.define("NusFollow");
LI.NusFollow=function(a,b){var h="loading",c="following",g="not-following",e="followed",d="not-followed",f=this;
if(LI.__HPA===true){LI.log("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusFollow.js")
}b=b||{};
this.config={trackAndFollowUrl:b.trackAndFollowUrl||null,unfollowUrl:b.unfollowUrl||null};
function i(j){var n=YEvent.getTarget(j),l=n,m=null,p={};
YEvent.preventDefault(j);
function o(q){YDom.removeClass(a,h);
if(m==="follow"){YDom.replaceClass(a,d,e)
}else{YDom.replaceClass(a,e,d)
}}function k(q){YDom.removeClass(a,h)
}p={success:o,failure:k,custom:{error:k},timeout:5000};
if(l.tagName.toUpperCase()!=="A"){l=YDom.getAncestorByTagName(l,"A")
}if(l){YDom.addClass(a,h);
if(YDom.hasClass(l,g)){m="follow";
LI.asyncRequest("GET",f.config.trackAndFollowUrl,p,null)
}else{if(YDom.hasClass(l,c)){m="unfollow";
LI.asyncRequest("GET",f.config.unfollowUrl,p,null)
}else{k()
}}}}YEvent.on(a,"click",i)
};(function(){var a="followed",c="not-followed",d="following";
LI.FollowPeople=function b(f,e){this.container=f;
YEvent.on(f,"click",this.unfollowPeople,null,this)
};
LI.FollowPeople.prototype={callback:function(e){return{success:function(){YDom.removeClass(this.container,"loading");
YDom.replaceClass(this.container,a,c)
},failure:function(){YDom.removeClass(this.container,"loading")
},scope:e}
},unfollowPeople:function(e){var g=this,h=YEvent.getTarget(e),f;
h=YDom.hasClass(h,d)?h:YDom.getAncestorByClassName(h,d);
if(h){YEvent.preventDefault(e);
f=h.getAttribute("data-unfollow-people-url");
if(f){YDom.addClass(this.container,"loading");
YAHOO.util.Connect.asyncRequest("POST",f,g.callback(g))
}}}}
}());
LI.define("FollowPeople");LI.define("FollowToggler");
LI.FollowToggler=(function(){var i="followee",l="is-following",e="",g="",r,m,o="loading",q="changed",c="href",d="follow",s="unfollow",n="action-"+d,j="action-"+s;
function k(u,t){var v=(u&&u.id)||(new Date()).getTime();
if(!t.disabled){i=t.toggleContainerClass||i;
l=t.toggleClass||l;
e=t.actionClassSuffix||e;
g=t.selectedClass||g;
YEvent.on(u,"click",h);
r=new YAHOO.util.CustomEvent(q+v);
return{change:r}
}}function h(u){var v=YEvent.getTarget(u),t=true;
if(g&&v.tagName&&v.tagName!=="A"){v=YDom.getAncestorByTagName(v,"a")
}if(YDom.hasClass(v,n+e)){b(v)
}else{if(YDom.hasClass(v,j+e)){p(v)
}else{t=false
}}if(t){YEvent.preventDefault(u)
}}function a(u){var t=u.match(/(followee|memberId|channels)[=|\/](\d+)/i),v=null;
if(t&&!!t.length){v=t[2]||null
}return v
}function f(t,v,u){LI.asyncRequest(v||"GET",t,{success:u.success,failure:u.failure,custom:{exception:u.failure,error:u.failure}})
}function b(v){var t=YDom.getAttribute(v,c),u=YDom.getAncestorByClassName(v,i),w=a(t);
if(!t){return
}YDom.addClass(u,o);
f(t,"POST",{success:function(x){YDom.removeClass(u,o);
YDom.addClass(u,l);
if(g){m=Y$("."+j,u);
YDom.removeClass(v,g);
YDom.addClass(m,g)
}r.fire(d,{success:true,id:w})
},failure:function(){YDom.removeClass(u,o);
r.fire(d,{success:false,id:w})
}})
}function p(v){var t=YDom.getAttribute(v,c),u=YDom.getAncestorByClassName(v,i),w=a(t);
if(!t){return
}YDom.addClass(u,o);
f(t,"POST",{success:function(x){YDom.removeClass(u,o);
YDom.removeClass(u,l);
if(g){m=Y$("."+n,u);
YDom.removeClass(v,g);
YDom.addClass(m,g)
}r.fire(s,{success:true,id:w})
},failure:function(){YDom.removeClass(u,o);
r.fire(s,{success:false,id:w})
}})
}return k
}());(function(){var b="feed-search-prompt";
function a(g,f){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusSearchUpdates.js")
}var i=YDom.get("search-updates-keywords"),e=null;
function h(k){var l=YEvent.getTarget(k);
if(!YDom.isAncestor(e,l)&&l!=i){c()
}}function j(){if(e===null){e=YDom.get("search-updates-saved-searches");
if(!e){e=false
}}return e
}function c(){var k=j();
if(k){LI.hide(k);
YEvent.removeListener(document.body,"click",h)
}}function d(){var k=j();
if(k){LI.show(k);
YEvent.on(document.body,"click",h)
}}YEvent.on(i,"focus",function(k){d()
});
YEvent.on(i,"keypress",function(k){c()
});
YDom.addClass(g,b);
YEvent.on(g,"click",function(k){var l=YEvent.getTarget(k);
if(YDom.hasClass(l,"toggle")){YEvent.stopEvent(k);
YDom.removeClass(g,b);
g.keywords.focus();
d()
}})
}LI.NusSearchUpdates=a
})();LI.ZeppelinForm=function(X,N){if(LI.__HPA===true){LI.log("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/zeppelin/ZepplinForm.js ")
}var N={passwordResolutionUrl:N.passwordResolutionUrl||"",formID:N.formID||"nwmi-form",formImportMessageID:N.formImportMessageID||"import_msg",formEmailInputID:N.formEmailInputID||"email-nWMIForm",formEmailInputName:N.formEmailInputName||"",formEmailProgressID:N.formEmailProgressID||"wmi_progress",formPasswordDivID:N.formPasswordDivID||"pswd-div",formUsernameDivID:N.formUsernameDivID||"email-username",formSubmitButtonID:N.formSubmitButtonID||"resolve-btn",webmailAddrElId:N.webmailAddrElId||"webmail-addr",formDisclaimerMessageID:N.formDisclaimerMessageID||"disclaimer_msg",openInPopup:N.openInPopup||false,popupUrl:N.popupUrl||"",successUrl:N.successUrl||"",newGoBackValue:N.newGoBackValue||null,successMonitorUrl:N.successMonitorUrl||null,authOnlySuccessUrl:N.authOnlySuccessUrl||"",controlNameOverride:N.controlNameOverride||null,progressMessage:N.progressMessage||"",errorMessage:N.errorMessage||null,invalidEmailMessage:N.invalidEmailMessage||"",generalErrorMessage:N.generalErrorMessage||"",invalidLoginMessage:N.invalidLoginMessage||"",unsupportedEmailTypeMessage:N.unsupportedEmailTypeMessage||"",loginLimitMessage:N.loginLimitMessage||"",noContactsReturnedMessage:N.noContactsReturnedMessage||"",webmailUrlErrorMessage:N.webmailUrlErrorMessage||"",userEnteredWebmailUrlErrorMessage:N.userEnteredWebmailUrlErrorMessage||"",quickResolveDomains:{},domainPopupSizes:{"hotmail.com":{width:905,height:580},"live.com":{width:905,height:580},"msn.com":{width:905,height:580},"aol.com":{width:520,height:315},"default":{width:790,height:580}},exception:{},isPromo:N.isPromo||false,providerNameFieldID:N.providerNameFieldID||"",providerNameFieldName:N.providerNameFieldName||"",importerNameFieldID:N.importerNameFieldID||"",importerNameFieldName:N.importerNameFieldName||"",useGenieFieldID:N.useGenieFieldID||"",useGenieFieldName:N.useGenieFieldName||"",useZeppelinXFieldName:N.useZeppelinXFieldName||"",defaultProviderFieldName:N.defaultProviderFieldName||"",usernameFieldId:N.usernameFieldId||"",usernameFieldName:N.usernameFieldName||"",originNameFieldName:N.originNameFieldName||"",referrerFieldName:N.referrerFieldName||"referrer_alias",hasWebmailField:N.hasWebmailField||false,fandangoParam:N.fandangoParam||"fandango",importerProviderParam:N.importerProviderParam||"importerProvider",authOnly:N.authOnly||false,formTarget:N.formTarget||"zeppelin_popup",eventNotify:N.eventNotify||false,hidePopupForExchangeIMAP:N.hidePopupForExchangeIMAP||false,userEnteredEmailTrackingCode:N.userEnteredEmailTrackingCode||"",userChangedEmailTrackingCode:N.userChangedEmailTrackingCode||"",webmailURLPromptedTrackingCode:N.webmailURLPromptedTrackingCode||"",extraParamsFunc:N.extraParamsFunc||null,hidePasswordInit:N.hidePasswordInit||false,externalErrContainerId:N.externalErrContainerId||"",skipInitialResolve:N.skipInitialResolve||false,origins:N.origins||[],isNewAddConnectionsFlow:N.isNewAddConnectionsFlow||false,isGlobalNav:N.isGlobalNav||false},Z=null,s=null,E="",d="",ab=N.domainPopupSizes,u=ab["default"],J=u.width,S=u.height,e=new YAHOO.util.CustomEvent("error"),Q=new YAHOO.util.CustomEvent("emailResolved"),b=new YAHOO.util.CustomEvent("displayMsg"),l=YDom.get(N.formID),y=YDom.get(N.externalErrContainerId),L=Y$(".alt_unsupported_msg",y?y:l,true),O=YDom.get(N.formSubmitButtonID),aa=YDom.get(N.formImportMessageID),t=(N.formEmailInputName)?l[N.formEmailInputName]:YDom.get(N.formEmailInputID),G=(t)?t.value:"",M=YDom.getElementsByClassName("username-suggestion"),g=null,ac=(N.formEmailInputName)?l[N.formEmailInputName]:YDom.get(N.formEmailInputID),H=YDom.get(N.formPasswordDivID),m=Y$("input",H,true),h=YDom.get(N.webmailAddrElId),B=Y$("input",h,true),n=YDom.get("promo-subhead")||null,r=YDom.get("zeppelin-loading"),i="loading",W="error",U=false,R=("placeholder" in document.createElement("input")),I,T,z,c,w,f,v;
N.useZeppelinXFieldNameOld=(N.useZeppelinXFieldName?N.useZeppelinXFieldName.replace("_","-"):"");
N.originNameFieldNameOld=(N.originNameFieldName?N.originNameFieldName.replace("_","-"):"");
if(N.newGoBackValue){f=new RegExp("[\\?&]goback=%2E([^&#]*)");
v=f.exec(N.successUrl);
N.successUrl=N.successUrl.replace(v[1],N.newGoBackValue)
}function k(){g=window.open("#",N.formTarget,"width="+J+",height="+S+",toolbar=0,location=0,toolbar=0,status=0,scrollbars=no")
}function a(ad){var ae=ad.split("@")[1];
if(ab[ae]){J=ab[ae].width;
S=ab[ae].height
}else{J=u.width;
S=u.height
}}function F(ad){var ae=ad.value;
if(!ae||(!R&&ae===ad.getAttribute("data-placeholder"))){setTimeout(function(){O.disabled=true
},0);
return false
}return true
}YEvent.on(M,"click",function(ad){var af=YDom.get(N.formUsernameDivID),ae=Y$("input",af,true);
if(af&&YDom.getStyle(af,"display")!=="none"){if(ae){ae.value=this.innerHTML
}YDom.removeClass(af,"hidden")
}});
var D=false;
YEvent.on(l,"submit",function(ad){var ak=Y$(".submit-spinner",l,true),af=ac.value;
if(D){YEvent.stopEvent(ad);
return
}D=true;
setTimeout(function(){D=false
},3000);
if(!ac.value){YEvent.stopEvent(ad);
return
}if(N.eventNotify){LI.ZeppelinFormInstance=null
}else{var aj=LI.Controls.getControl(l,N.controlNameOverride||"LI.ZeppelinForm");
LI.ZeppelinFormInstance=aj
}var ae,ah=l[N.originNameFieldName];
if(ah){ae=ah.value
}var ag=LI.Controls.getControl("addconnpolling","AddConnPolling");
if(!N.hidePopupForExchangeIMAP||(ae!=="webmailImportExchange"&&ae!=="webmailImportIMAP"&&!(YDom.hasClass(l,"async")))){YDom.setAttribute(l,"target",N.formTarget);
k()
}else{YDom.setAttribute(l,"target","LI_ifrm_abook_import_form_"+ae);
if(ag){ag.addAsync(ae);
ag.startAsyncTimer(ae)
}O.disabled=true;
if(ak){YDom.addClass(ak,"show");
if(LI.Events){var ai=function(){O.disabled=false;
YDom.removeClass(ak,"show");
LI.Events.unbind("add-conn-import-error",ai)
};
LI.Events.bind("add-conn-import-error",ai)
}}}LI.clearFormErrors(X);
aa.innerHTML="";
if(WebTracking){if(N.userEnteredEmailTrackingCode&&(G!=="")&&G!==af){WebTracking.trackUserAction(N.userEnteredEmailTrackingCode,{email:af,origin:ae})
}else{WebTracking.trackUserAction("fetch_import_start",{email:af,origin:ae})
}}});
YEvent.on(window,"unload",function(){if(g){g.close()
}});
w=N.extraParamsFunc||function(){return""
};
if(!N.isPromo){var q=null;
var I=function(ad){if(!ad||ad.value===E){return
}if(s!=null){window.clearTimeout(s);
s=null
}if(Z!=null){window.clearInterval(Z);
Z=null
}if(!ad.value){O.disabled=true
}E=YAHOO.lang.trim(ad.value);
if(!q){q=/^([a-zA-Z0-9_\-=\.\'\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i
}if(E.match(q)){Z=window.setInterval(function(){if(E===d){T(N)
}else{d=E
}},500)
}else{if(E.length>1){s=window.setTimeout(function(){var ae=N.invalidEmailMessage;
YDom.addClass(ad,W);
c(ae,false,N);
if(U){YDom.removeClass(r,i);
U=false
}},5000)
}else{if(U){YDom.removeClass(r,i);
U=false
}return
}}if(!U){YDom.addClass(r,i);
U=true
}O.disabled=true
};
T=function(){var af,ad,ai,aj;
LI.clearFormErrors(X);
if(L){YDom.addClass(L,"hidden")
}if(Z!=null){window.clearInterval(Z);
Z=null
}aa.innerHTML="";
YDom.removeClass(ac,W);
var ah=E.split("@")[1];
if(N.quickResolveDomains[ah]){af=N.quickResolveDomains[ah].domain;
ad=N.quickResolveDomains[ah].passwordRequired
}a(E);
function ae(ak){ag(ak.responseText)
}function ag(ak){var ay,az,aB,at,av,an,ar=false,am=E,aC=ak.origin,aA=l[N.originNameFieldName],al=l[N.originNameFieldNameOld],aq=YDom.get(N.formUsernameDivID),ap=(N.useGenieFieldName)?l[N.useGenieFieldName]:YDom.get(N.useGenieFieldID),aw=l[N.useZeppelinXFieldName],au=l[N.useZeppelinXFieldNameOld];
N.isEmailChanged=false;
if(s!=null){window.clearTimeout(s)
}if(U){YDom.removeClass(r,i);
U=false
}var ao=(N.importerNameFieldName)?l[N.importerNameFieldName]:YDom.get(N.importerNameFieldID),ax=(N.providerNameFieldName)?l[N.providerNameFieldName]:YDom.get(N.providerNameFieldID);
if(ao){if(ak.importerName){ao.value=ak.importerName
}else{ao.value=""
}}if(ax){if(ak.providerName){ax.value=ak.providerName
}else{ax.value=""
}}if(ak.error){WebTracking.trackUserAction("email-resolution-response-error");
c(N.generalErrorMessage)
}if(ak.email!==am){return
}if(ak.origin!==undefined){if(aA){aA.value=aC;
if(al){al.value=aC
}}if(N.formUsernameDivID){if(aq){if(aC==="webmailImportExchange"){YDom.removeClass(aq,"hidden");
LI.show(aq)
}else{YDom.addClass(aq,"hidden");
LI.hide(aq)
}}}}if(N.isNewAddConnectionsFlow){aB=N.formID;
if(aB&&(an=aB.lastIndexOf("-"))!==-1){av=aB.substring(an+1)
}if(av!==ak.origin&&aB.indexOf(ak.origin)===-1){if(av!=="anyemail"){ar=true
}else{for(ay=0,az=N.origins.length;
ay<az;
ay++){if(ak.origin===N.origins[ay]){ar=true;
break
}}}}}if(!(at=YDom.get("reimport-check-"+aC))){at=YDom.get("reimport-check-x-anyemail")
}if(N.isNewAddConnectionsFlow){if(!ar){if(ak.passwordRequired){LI.show(H);
LI.hide(at);
YDom.addClass(l,"async");
if(ap){ap.value=false
}}else{LI.hide(H);
LI.show(at);
if(ap){ap.value=true
}YDom.removeClass(l,"async")
}}}else{if(ak.passwordRequired){LI.show(H);
LI.hide(at);
if(ap){ap.value=false
}}else{LI.hide(H);
LI.show(at);
if(ap){ap.value=true
}}}if(ak.notSupported){x();
return
}if(ak.showPartnersNotice){LI.show(N.formDisclaimerMessageID)
}else{LI.hide(N.formDisclaimerMessageID)
}if(ak.rateLimit){c(N.loginLimitMessage);
return
}if(!N.hasWebmailField&&(ak.WEBMAIL_ADDRESS||ak.WEBMAIL_ADDRESS==="")){x();
return
}if(ak.ZEPPELINX_ROUTING){aw.value=ak.ZEPPELINX_ROUTING;
au.value=ak.ZEPPELINX_ROUTING
}else{YDom.setAttribute(aw,"value","false");
YDom.setAttribute(au,"value","false")
}if(N.isNewAddConnectionsFlow){if(ar){E=G
}}Q.fire(ak);
if(LI.Events&&!N.isGlobalNav){LI.Events.fire("zeppelin-form-email-resolved",ak,l,av)
}z()
}if(af){ai={"isCustomDomain":false,"type":af,"email":E,"passwordRequired":ad};
ag(ai)
}else{aj={custom:{exception:function(){return false
}},success:ae,failure:function(){ag({error:true})
}};
O.disabled=true;
LI.asyncRequest("GET",N.passwordResolutionUrl+"?email="+E+w(),aj)
}};
z=function(){if(ac.value&&((YDom.getStyle(H,"display")!=="none")?m.value:true)&&(h===null||((YDom.getStyle(h,"display")!=="none")?B.value:true))){O.disabled=false
}else{O.disabled=true
}};
d=ac.value;
if(!N.skipInitialResolve&&F(ac)){E=ac.value;
T(N)
}else{if(N.hidePasswordInit){LI.hide(H)
}else{LI.show(H)
}}YEvent.on(ac,"keyup",function(ad){I(YEvent.getTarget(ad))
});
YEvent.on([H,h],"keyup",z);
z();
if(LI.Events){LI.Events.bind("zeppelin-form-check-address",function(ad){if(ad===ac){I(ac)
}})
}YEvent.on(Y$(".change-email",l,true),"click",function(ad){YEvent.preventDefault(ad);
YDom.addClass(Y$(".email-display",l,true),"hidden");
YDom.removeClass(Y$(".email-address",l,true),"hidden");
if(WebTracking&&N.userChangedEmailTrackingCode){WebTracking.trackUserAction(N.userChangedEmailTrackingCode)
}})
}if(L){YEvent.on(Y$(".file_import_opener",l,true),"click",function(){LI.Events.fire("zeppelin-form-jump-to-file-upload")
})
}c=function(ah,ad){var af,ae,ag;
if(L){if(ah!==N.unsupportedEmailTypeMessage){YDom.addClass(L,"hidden")
}}if(ad){LI.injectAlert(ah,"success",N.formImportMessageID)
}else{e.fire();
af=N.formImportMessageID;
ae=(!af)?YDom.get("global-error"):YDom.get(af);
ae.innerHTML="";
ag="<span class='{type}'>{msg}</span>";
if(n){YDom.setStyle(n,"display","none");
n=null
}ah=LI.htmlEncode(ah);
ae.innerHTML=YAHOO.lang.substitute(ag,{msg:ah,type:"error"});
WebTracking.trackUserAction("display-error")
}b.fire()
};
function A(){if(g){g.focus();
setTimeout(function(){g.close()
},5)
}}function P(){A();
c(N.generalErrorMessage);
WebTracking.trackUserAction("general-error")
}function C(){A();
c(N.invalidLoginMessage);
WebTracking.trackUserAction("invalid-login-error")
}function j(){A();
c(N.noContactsReturnedMessage);
WebTracking.trackUserAction("no-contacts-returned-error")
}function x(){if(L){if(aa){aa.innerHTML=""
}YDom.removeClass(L,"hidden")
}else{c(N.unsupportedEmailTypeMessage);
YDom.addClass(ac,W)
}WebTracking.trackUserAction("email-resolution-unsupported-email-error")
}function Y(){A();
c(N.loginLimitMessage);
WebTracking.trackUserAction("login-limit-error")
}function V(){var ad=Y$("input",N.webmailAddrElId,true);
A();
if(N.webmailAddrElId){if(YDom.getStyle(YDom.get(N.webmailAddrElId),"display")==="none"){c(N.webmailUrlErrorMessage);
WebTracking.trackUserAction("webmail-url-error");
LI.show(N.webmailAddrElId);
if(ad){ad.value=""
}}else{c(N.userEnteredWebmailUrlErrorMessage);
WebTracking.trackUserAction("webmail-url-error")
}}}function p(ad,ae){if(WebTracking){WebTracking.trackUserAction("add_conn_client_success",{origin:ae,event:ad})
}if(N.successMonitorUrl){var af=l[N.referrerFieldName].value;
LI.asyncRequest("POST",N.successMonitorUrl,{custom:{error:function(ag){},exception:function(){return false
}}},"referrer="+af)
}}function o(ai,ae){A();
var af=l[N.originNameFieldName],ah=(N.providerNameFieldName)?l[N.providerNameFieldName]:YDom.get(N.providerNameFieldID),ag,ad;
if(af){ad=af.value
}if(N.authOnly&&N.authOnlySuccessUrl!==""){p("auth_only",ad);
window.location.href=N.authOnlySuccessUrl;
return
}if(ah){ag=ah.value
}if(N.successUrl.indexOf("?")<0){N.successUrl=N.successUrl+"?"
}if(ae){p("not_complete",ad);
window.location.href=N.successUrl+"&"+N.fandangoParam+"="+ae+"&"+N.importerProviderParam+"="+ag;
return
}p("success",ad);
window.location.href=N.successUrl+(ai?"&batchID="+ai:"")+(ag?"&"+N.importerProviderParam+"="+ag:"")+(ad?"&origin="+ad:"")
}function K(){return N.authOnly
}return{overrideDisplayMsg:function(ad){c=ad
},overrideGetExtraResolveEmailParams:function(ad){w=ad
},showGeneralError:P,showBadLoginError:C,showUnsupportedEmailError:x,showLoginLimitError:Y,showNoContactsReturnedError:j,showWebmailUrlErrorMessage:V,adjustPopupSize:a,openPopup:k,success:o,errorEvent:e,emailResolvedEvent:Q,displayMsgEvent:b,isAuthOnly:K,closePopup:true}
};(function(){var i="nus-carousel",a="carousel-wheel",h="carousel-item",d="removed",b="disabled",n="delete",k="next",j="prev",e="active",c="only-active",s="both-active",q="next",p="prev",l="mouseover",r="mouseout";
function o(){this.nextButton.addClass(b);
this.prevButton.addClass(b);
this.isPrevButtonDisabled=this.isNextButtonDisabled=true
}function m(){var t=this.carouselWheel.hasClass(s);
if(this.objIndex>0){this.nextButton.removeClass(b);
this.isNextButtonDisabled=false
}else{if(t){this.carouselWheel.removeClass(s)
}this.prevButton.addClass(c)
}if(this.objIndex+this.itemsToShift!==this.numOfItems){this.prevButton.removeClass(b);
this.isPrevButtonDisabled=false;
this.carouselWheel.addClass(s)
}else{if(t){this.carouselWheel.removeClass(s)
}this.nextButton.addClass(c)
}}function g(u){var y,w,v=this.itemsToShift,x=(this.numOfItems-v)-this.objIndex,A=parseInt(this.carouselWheel.css("left"),10)||0,t=this.objIndex+v===this.numOfItems,z;
o.call(this);
if(u===q){w=(this.objIndex>v)?v:this.objIndex;
z=w*this.itemWidth;
if(((this.objIndex>=w)&&(this.objIndex+w===this.numOfItems))||w===1&&t){A-=z-this.nextPrevWidth
}else{A-=w*this.itemWidth
}this.objIndex-=w
}else{if(u===p){w=x>v?v:x;
if(this.objIndex+v+w<this.numOfItems){A+=w*this.itemWidth
}else{A+=w*this.itemWidth-this.nextPrevWidth
}this.objIndex+=w
}}y=w*this.shiftDuration;
this.carouselWheel.animate({left:A},y,"linear",_.bind(m,this))
}function f(u,t){}f.prototype={init:function(u,t){this.carousel=this.carousel||$(u).closest("."+i);
this.carouselWheel=this.carouselWheel||$("ul."+a,u);
this.carouselItems=this.carouselItems||$("li."+h,this.carouselWheel);
this.nextButton=this.nextButton||$("button."+k,this.carousel);
this.prevButton=this.prevButton||$("button."+j,this.carousel);
this.itemsToShift=this.itemsToShift||2;
this.itemWidth=this.itemWidth||this.carouselItems.first().outerWidth(true);
this.numOfItems=this.numOfItems||this.carouselItems.length;
this.isNextButtonDisabled=this.isNextButtonDisabled||false;
this.isPrevButtonDisabled=this.isPrevButtonDisabled||true;
this.shiftDuration=this.shiftDuration||500;
this.objIndex=this.objIndex||this.numOfItems-this.itemsToShift;
this.nextPrevWidth=this.nextPrevWidth||0;
$(this.carousel).on("click",$.proxy(this.onClickNusCarousel,this)).on(l,$.proxy(this.onMouseEventNusCarousel,this)).on(r,$.proxy(this.onMouseEventNusCarousel,this));
this.isPrevButtonDisabled=true;
this.prevButton.addClass(b);
this.nextButton.addClass(c)
},getCarousel:function(t){return $(t).closest("."+a)
},getCarouselItem:function(t){return $(t).closest("."+h)
},removeCarouselItem:function(t){t.addClass(d);
this.objIndex-=1;
this.numOfItems-=1;
m.call(this)
},onMouseEventNusCarousel:function(v){var t=$(v.target),u=this.getCarouselItem(t);
if(t.hasClass(n)||t.hasClass(k)||t.hasClass(j)){if(v.type===l){t.addClass(e)
}else{if(v.type===r){t.removeClass(e)
}}}if(u){if(v.type===l){u.addClass(e)
}else{if(v.type===r){u.removeClass(e)
}}}},onClickNusCarousel:function(x){var v,w,A,v=$(x.target),B=v.hasClass(n),t=v.hasClass(k),z=v.hasClass(j),y=v.hasClass(c),u;
if(B||t||z){x.preventDefault();
if(B){u=v.attr("href");
LI.asyncRequest("GET",u,{});
o.call(this);
w=this.getCarouselItem(v);
this.removeCarouselItem(w)
}else{if(t){this.prevButton.removeClass(b);
this.isPrevButtonDisabled=false;
if(!this.isNextButtonDisabled){g.call(this,q)
}}else{if(z){this.nextButton.removeClass(b);
this.isNextButtonDisabled=false;
if(!this.isPrevButtonDisabled){g.call(this,p)
}}}}if(y){v.removeClass(c)
}}}};
LI.NusCarousel=f
}());(function(){var h="action-join",i="loading",e="pending-join",f="joined",c=2000,j=10000,l,k;
function g(){this.init=function(q,p){l=p.gymlJoinEndpointLix==="treatment";
this.shiftDuration=333;
this.itemsToShift=3;
k.init.call(this,q,p)
};
this.onClickNusCarousel=function(v){k.onClickNusCarousel.call(this,v);
var s,u,q,p=$(v.target),t=p.closest("."+h),r=p.closest(".carousel-showmore");
if(t.length){q=t.data("gyml-feed-join-url");
v.preventDefault();
if(!q){return
}t.addClass(i);
this.getCarouselItem(t).addClass(e);
s={success:function(y){s.removeClasses.call(this);
var x=this.getCarouselItem(t),w=y.responseText||"",z=JSON.parse(w);
if(b[z.content]){m();
b[z.content].call(this,x)
}else{o(z.content)
}},failure:function(w){s.removeClasses.call(this);
o("OTHER")
},scope:this,removeClasses:function(){this.getCarouselItem(t).removeClass(e);
t.removeClass(i)
}};
u={success:function(y){var x=this.getCarouselItem(t),w=y.responseText||"";
if(w.indexOf("auto_granted")>=0||w.indexOf("pending_approval")>=0){x.addClass(f);
this.getCarousel(t).addClass(f);
t.removeClass(i);
setTimeout(_.bind(this.removeCarouselItem,this,x),c)
}else{u.failure.call(this,y)
}},failure:function(x){var w=this.getCarouselItem(t);
this.removeCarouselItem(w)
},scope:this};
LI.asyncRequest("POST",q,l?s:u)
}else{if(r.length){q=r.find("a").attr("href");
if(q&&q.length){window.location=q
}}}}
}g.prototype=new LI.NusCarousel();
g.prototype.constructor=LI.NusCarousel;
k=g.prototype.constructor.prototype;
function n(q,p){var r=new g();
r.init(q,p)
}LI.NusGYMLCarousel=n;
var b={CONFIRMED:function(p){p.addClass(f)
},ALREADY_IN_GROUP:function(p){p.addClass(f)
},PENDING:function(p){p.addClass(e)
},BLOCKED:function(p){a("BLOCKED",p)
},NON_EXISTENT_GROUP:function(p){a("NON_EXISTENT_GROUP",p)
},USER_ALREADY_REQUESTED_ACCESS:function(p){a("USER_ALREADY_REQUESTED_ACCESS",p)
},INACTIVE_GROUP:function(p){a("INACTIVE_GROUP",p)
},GROUP_MAX_SIZE_REACHED:function(p){a("GROUP_MAX_SIZE_REACHED",p)
},USER_MAX_GROUP_SIZE_REACHED:function(){o("USER_MAX_GROUP_SIZE_REACHED")
}};
function a(p,q){o(p);
setTimeout(_.bind(this.removeCarouselItem,this,q),c)
}function o(p){$(".error-message-text").html(LI.i18n.get(p||"OTHER"));
d();
setTimeout(m,j)
}$(".error-message-close").click(function(){m()
});
function m(){$(".error-message-box").slideUp()
}function d(){$(".error-message-box").slideDown()
}}());(function(){var g="connect",b="joining",h="joined",d="interacted",f=2000,i;
function a(j){var k=j.attr("href");
if(k){window.location=k
}}function e(){if(LI.__HPA===true){}this.init=function(k,j){this.itemsToShift=2;
this.nextPrevWidth=29;
i.init.call(this,k,j)
};
this.onClickNusCarousel=function(m){i.onClickNusCarousel.call(this,m);
var j,n,k,l;
j=$(m.target);
if(j.hasClass(g)){m.preventDefault();
k=j.attr("data-li-connect");
if(!k){return
}l=this.getCarouselItem(j);
l.addClass(b);
n={success:function(q){var p=q.responseText||"";
if(p&&p.status&&p.status==="success"){l.addClass(h);
this.getCarousel(l).addClass(d);
l.removeClass(b);
setTimeout(_.bind(this.removeCarouselItem,this,l),f)
}else{a(j)
}},failure:function(p){a(j)
},custom:{error:function(p){a(j)
}},scope:this};
LI.asyncRequest("POST",k,n)
}}
}e.prototype=new LI.NusCarousel();
e.prototype.constructor=LI.NusCarousel;
i=e.prototype.constructor.prototype;
function c(k,j){var l=new e();
l.init(k,j)
}LI.NusPYMKCarousel=c
})();LI.define("Share");
LI.Share=typeof LI.Share==="function"?LI.Share:function(g,e){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/Share.js")
}var d="",c,a,h,f=LI.SharingDialog;
e=e||{};
e={url:e.url||null,title:(e.title)?e.title:LI.i18n.get("share-dialog-title"),lazyEvent:(e.lazyEvent)?e.lazyEvent:null,showOnlyWhenReady:e.showOnlyWhenReady||false,extra:e.extra,dialogV2:e.dialogV2};
c=f.Scripts;
a=f.Styles;
h=f.Version==="v2";
function b(i){try{YEvent.preventDefault(i)
}catch(j){i.returnValue=false
}if(e.dialogV2||h){d="dialog-v2 share-dialog-v2"
}LI.Dialog().open(i,{name:"sharingDialog",type:h?"task-modal":"task-modeless",width:(h?515:500),className:d,content:{title:e.title,url:e.url},dependencies:{jsFiles:c,cssFiles:a},showOnlyWhenReady:e.showOnlyWhenReady,extra:e.extra})
}if(e.lazyEvent){b(e.lazyEvent)
}if(!LI.Share.listenersSet){LI.Share.listenersSet=true;
LI.Dialog().contentChangeEvent.subscribe(function(k,j){var i=j[1],l=YDom.get("input-attributedObjectUrn");
if(j[0]==="sharingDialog"&&i&&i.attributedObjectUrnId&&l){l.value=i.attributedObjectUrnId
}});
LI.Dialog().submitEvent.subscribe(function(k,j){var i=j[2];
if(i&&i.trackingUrl){YAHOO.util.Connect.asyncRequest("GET",i.trackingUrl,function(){})
}})
}YEvent.on(g,"click",b);
this.openAndFetch=b
};(function(){LI.define("SlideshareViewer");
var a="width",d="height",c="max",b={width:d,height:a};
LI.SlideshareViewer=function(g,e){e||(e={});
var f={iframe:function(){var i;
e.constraint||(e.constraint=a);
e.toolbarHeight||(e.toolbarHeight=30);
if(e.aspectRatio){h(e.aspectRatio)
}else{if(e.aspectRatioEl){i=YDom.get(e.aspectRatioEl);
if(i.height&&i.width){h(i.width/i.height)
}else{i.onload=function(){if(this.height&&this.width){h(this.width/this.height)
}}
}}}},img:function(){var i=g.src.replace("-large","-original");
YEvent.on(g,"click",function(){window.open(i)
})
}};
if(g&&g.tagName&&f.hasOwnProperty(g.tagName.toLowerCase())){f[g.tagName.toLowerCase()]()
}function h(k){if(!isNaN(k)&&!(e.rejectTinyAspectRatio&&k<e.minAspectRatio)){k=Math.max(k,e.minAspectRatio||0);
var m={},j=e.constraint,l=b[j],i=e[j]||g[j];
m[j]=Math.min(i,e[c+j]||Infinity);
m[l]=m[j]*Math.pow(k,(j===a?-1:1));
if(e[c+l]&&m[l]>e[c+l]){m[l]=e[c+l];
m[j]=m[l]*Math.pow(k,(l===a?-1:1))
}if(m.width&&m.height){m={width:Math.floor(m.width),height:Math.floor(m.height)+e.toolbarHeight};
g.width=m.width;
g.height=m.height;
g.style.width=m.width+"px";
g.style.height=m.height+"px"
}}}}
})(undefined);LI.define("ShareImageChooser");
LI.ShareImageChooser=function(d,e){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/ShareImageChooser.js")
}var e={images:e.images||[],origImages:e.origImages||[],current:0,total:e.images.length,imgInputID:(e.imgInputID)?e.imgInputID:null,imgSelectedIdxID:(e.imgSelectedIdxID)?e.imgSelectedIdxID:null,imgIdxLengthID:(e.imgIdxLengthID)?e.imgIdxLengthID:null,showGalleryID:(e.showGalleryID)?e.showGalleryID:null};
var g=Y$("img",d,true),h=Y$(".previous",d,true),a=Y$(".next",d,true),j=Y$(".current",d,true),m=Y$(".controls",d,true),k=Y$(".total",d,true),b=YDom.get(e.showGalleryID),i=YDom.get(e.imgInputID),n=YDom.get(e.imgIdxLengthID);
function o(p){var q=YEvent.getTarget(p);
if(YDom.hasClass(q,"next")){e.current++;
if(e.current>=e.images.length){l(0)
}else{l(e.current)
}}if(YDom.hasClass(q,"previous")){e.current--;
if(e.current<0){l(e.images.length-1)
}else{l(e.current)
}}}function l(p){e.current=p;
var q=e.origImages[p]||e.images[p];
g.src=e.images[p];
j.innerHTML=p+1;
if(i&&q){i.value=q
}if(YDom.get(e.imgSelectedIdxID)){YDom.get(e.imgSelectedIdxID).value=e.current
}}function f(){var u=[],s=1,q,w=document.createElement("div"),t=function(x){var y=YDom.getRegion(this);
if(parseInt(y.width,10)>60&&parseInt(y.height,10)>60){u.push(this.src)
}s++;
v()
},p=function(x){s++;
v()
};
document.body.appendChild(w);
YDom.setStyle(w,"position","absolute");
YDom.setStyle(w,"left","70000px");
for(var r=0;
e.images.length>r;
r++){q=null;
if(r===0){u.push(e.images[0])
}else{q=document.createElement("img");
w.appendChild(q);
YEvent.on(q,"load",t);
YEvent.on(q,"error",p);
q.src=e.images[r]
}}function v(){if(s===e.images.length){document.body.removeChild(w);
e.images=u;
if(u.length>1){LI.show(m)
}k.innerHTML=u.length;
YEvent.on([h,a],"click",o)
}}}function c(p){var r=YEvent.getTarget(p),q=e.current;
if(r.checked&&i){i.value=e.origImages[q]||e.images[q];
YDom.setStyle(d,"visibility","visible")
}else{YDom.setStyle(d,"visibility","hidden");
i.value=""
}}YEvent.on([h,a],"click",YEvent.preventDefault);
if(e.images.length>1){f()
}if(n){n.value=e.images.length
}if(b){YEvent.on(b,"click",c);
b.checked=true
}l(0)
};var sortModules=function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/home.js")
}var a=YAHOO.util.DDM;
DDList=function(e,b,c){DDList.superclass.constructor.call(this,e,b,c);
var d=this.getDragEl();
YDom.setStyle(d,"opacity",0.67);
this.goingUp=false;
this.lastY=0;
this.setXConstraint(0,0)
};
YAHOO.extend(DDList,YAHOO.util.DDProxy,{startDrag:function(c,e){var b=this.getDragEl();
var d=this.getEl();
YDom.setStyle(d,"visibility","hidden");
b.innerHTML=d.innerHTML;
YDom.setStyle(b,"color",YDom.getStyle(d,"color"));
YDom.setStyle(b,"backgroundColor",YDom.getStyle(d,"backgroundColor"))
},endDrag:function(i){var f;
var h=YDom.getNextSibling(this.id);
if(h==null){f=0
}else{f=ChameleonService.getAppInstanceID(h.id)
}ChameleonService.moveApplication(1,1,ChameleonService.getAppInstanceID(this.id),f);
var d=this.getEl();
var g=this.getDragEl();
YDom.setStyle(g,"visibility","");
var b=new YAHOO.util.Motion(g,{points:{to:YDom.getXY(d)}},0.2,YAHOO.util.Easing.easeOut);
var c=g.id;
var j=this.id;
b.onComplete.subscribe(function(){YDom.setStyle(c,"visibility","hidden");
YDom.setStyle(j,"visibility","")
});
b.animate()
},onDragDrop:function(g,h){if(a.interactionInfo.drop.length===1){var f=a.interactionInfo.point;
var d=a.interactionInfo.sourceRegion;
if(!d.intersect(f)){var b=YDom.get(h);
var c=a.getDDById(h);
b.appendChild(this.getEl());
c.isEmpty=false;
a.refreshCache()
}}},onDrag:function(b){var c=YEvent.getPageY(b);
if(c<this.lastY){this.goingUp=true
}else{if(c>this.lastY){this.goingUp=false
}}this.lastY=c
},onDragOver:function(g,h){var d=this.getEl();
var c=YDom.get(h);
if(c.nodeName.toLowerCase()=="div"){var b=d.parentNode;
var f=c.parentNode;
if(this.goingUp){f.insertBefore(d,c)
}else{f.insertBefore(d,c.nextSibling)
}a.refreshCache()
}}})
}();
YAHOO.widget.Effect=function(a){this.oEl=YDom.get(a);
this.height=parseInt(YDom.getStyle(this.oEl,"height"));
this.width=parseInt(YDom.getStyle(this.oEl,"width"))
};
YAHOO.widget.Effect.prototype.BlindUp=function(a,c){var d=a||1;
this.oEl.style.overflow="hidden";
var b=new YAnim(this.oEl,{height:{to:0}},d,YAHOO.util.Easing.easeOut);
if(c){b.onComplete.subscribe(c)
}b.animate()
};
YAHOO.widget.Effect.prototype.BlindDown=function(b,d){this.oEl.style.visibility="hidden";
this.oEl.style.overflow="hidden";
this.oEl.style.height="";
var a=parseInt(YDom.getStyle(this.oEl,"height"));
this.oEl.style.height="0";
this.oEl.style.visibility="visible";
var e=b||1;
var c=new YAnim(this.oEl,{height:{to:a,from:0}},e,YAHOO.util.Easing.easeOut);
if(d){c.onComplete.subscribe(d)
}c.animate()
};
YDom.getElementsByAttribute=function(c,d,a,b){var e=function(g){var f=new RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)");
if(g.getAttribute(c)&&f.test(g.getAttribute(c))){return true
}return false
};
return this.getElementsBy(e,a,b)
};
var loadAdSlots=function(){var a=function(){var d=YDom.getElementsByClassName("ad-load","div");
for(var c=0;
c<d.length;
c++){var e=d[c].id.split("ad-load-")[1];
YDom.get("ad-slot-"+e).innerHTML=d[c].innerHTML;
var b=YDom.get("ad-loader");
b.removeChild(d[c])
}};
return{init:function(){a()
}}
}();LI.define("JobsForYou");
LI.JobsForYou=function(d,c){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/JobsForYou.js")
}var c=c||{},a=document.getElementById("recJobs");
var f=function(){YEvent.on(YDom.getElementsByClassName("remove","a",a),"click",e);
if(c.tracking){YEvent.on(YDom.getElementsByClassName("track-job","a",a),"click",b)
}var g=YDom.getElementsByClassName("droplist","div",a);
YEvent.on(g,"mouseover",function(h){YDom.addClass(this,"open");
YDom.setStyle(this,"position","relative")
});
YEvent.on(g,"mouseout",function(h){LI.DropListMgr.closeAll();
YDom.removeClass(this,"open");
YDom.setStyle(this,"position","static")
})
};
var b=function(j){var i=YEvent.getTarget(j);
if(i.nodeName.toLowerCase()!="a"){i=YDom.getAncestorByTagName(i,"a")
}var h=i.getAttribute("data-li-trk-url"),g=i.href;
if(h==""||h==null){return
}YEvent.stopEvent(j);
YAHOO.util.Connect.asyncRequest("GET",h,{success:function(k){window.location.href=g
},failure:function(k){window.location.href=g
},timeout:1000})
};
var e=function(j){YEvent.stopEvent(j);
var i=YEvent.getTarget(j),k=YDom.getAncestorByClassName(i,"job"),g=YDom.hasClass(k,"sponsored"),h=Y$("li.extra"+(g?".sponsored":".organic"),a),l=new YAHOO.util.Anim(k,{opacity:{to:0}},0.3);
YAHOO.util.Connect.asyncRequest("GET",i.href,{timeout:10000});
l.onComplete.subscribe(function(){k.parentNode.removeChild(k);
var n=null,o=YDom.getChildrenBy(a,function(r){return(!YDom.hasClass(r,"extra")&&!YDom.hasClass(r,"empty-message"))
}),q=document.getElementById("recJobs-empty-message"),p=document.getElementById("recjobs-see-more");
if(h.length){n=h[0];
YDom.removeClass(n,"extra");
h=h.slice(1)
}else{if(!o.length&&q){YDom.addClass(d,"empty");
n=q
}}if(!h.length){if(p&&!c.hasMoreRecJobs){LI.hide(p)
}}if(n){YDom.setStyle(n,"opacity",0);
var m=new YAnim(n,{opacity:{to:1}},0.8);
m.animate()
}});
l.animate()
};
f()
};LI.define("GroupsForYou");
LI.GroupsForYou=function(c,b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/GroupsForYou.js")
}var b=b||{},d=document.getElementById("recGroups");
var e=function(){if(b.tracking){YEvent.on(YDom.getElementsByClassName("track-group","a",d),"click",a)
}};
var a=function(i){var h=YEvent.getTarget(i);
if(h.nodeName.toLowerCase()!="a"){h=YDom.getAncestorByTagName(h,"a")
}var g=h.getAttribute("data-li-trk-url"),f=h.href;
if(!g){return
}YEvent.stopEvent(i);
YAHOO.util.Connect.asyncRequest("GET",g,{success:function(j){window.location.href=f
},failure:function(j){window.location.href=f
},timeout:1000})
};
e()
};LI.define("CompaniesForYou");
LI.CompaniesForYou=function(d,c){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/CompaniesForYou.js")
}var c=c||{},b=document.getElementById("recCompanies");
var e=function(){if(c.tracking){YEvent.on(YDom.getElementsByClassName("track-company","a",b),"click",a)
}};
var a=function(i){var h=YEvent.getTarget(i);
if(h.nodeName.toLowerCase()!="a"){h=YDom.getAncestorByTagName(h,"a")
}var g=h.getAttribute("data-li-trk-url"),f=h.href;
if(!g){return
}YEvent.stopEvent(i);
YAHOO.util.Connect.asyncRequest("GET",g,{success:function(j){window.location.href=f
},failure:function(j){window.location.href=f
},timeout:1000})
};
e()
};LI.define("ReferralCenterModule");
LI.ReferralCenterModule=function(c,a){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/ReferralCenterModule.js")
}var d=document.getElementById("rc-matches");
a=a||{};
var b=function(e){YEvent.stopEvent(e);
var g=YEvent.getTarget(e),f=YDom.getElementsByClassName("buffer","li",d),h=YDom.getAncestorByClassName(g,"rc-match-item"),i=new YAHOO.util.Anim(h,{opacity:{to:0}},0.3);
YConn.asyncRequest("GET",g.href,{timeout:10000});
i.onComplete.subscribe(function(){h.parentNode.removeChild(h);
var k=null,l=YDom.getChildrenBy(d,function(o){return(!YDom.hasClass(o,"buffer")&&!YDom.hasClass(o,"empty-message"))
}),n=document.getElementById("rc-no-matches"),m=document.getElementById("rc-see-more");
if(f.length){k=f[0];
YDom.removeClass(k,"buffer");
f=f.slice(1)
}else{if(!l.length&&n){YDom.addClass(c,"empty");
k=n;
if(m){LI.hide(m)
}}}if(k){YDom.setStyle(k,"opacity",0);
var j=new YAnim(k,{opacity:{to:1}},0.8);
j.animate()
}});
i.animate()
};
YEvent.on(YDom.getElementsByClassName("remove","a",d),"click",b)
};LI.define("SitePromotion");
LI.SitePromotion=function(d,f){var e="PromoFramework",g="forceClose",o="1",n="2",b="3",h="4",c="5";
f.promoID=f.promoID||"";
f.pageKey=f.pageKey||"";
f.actionTriggerID=f.actionTriggerID||null;
f.actionLinkID=f.actionLinkID||null;
f.interactLinkID=f.interactLinkID||null;
f.closeTriggerID=f.closeTriggerID||null;
f.suspendTriggerID=f.suspendTriggerID||null;
f.cancelLinkID=f.cancelLinkID||null;
f.actionTriggerClass=f.actionTriggerClass||null;
f.actionLinkClass=f.actionLinkClass||null;
f.closeTriggerClass=f.closeTriggerClass||null;
f.suspendTriggerClass=f.suspendTriggerClass||null;
f.cancelLinkClass=f.cancelLinkClass||null;
f.url=f.url||null;
f.skipImp=f.skipImp||false;
f.skipInitialImp=f.skipInitialImp||false;
f.closeOnAction=f.closeOnAction||false;
f.skipHidePromo=f.skipHidePromo||false;
f.variant=f.variant||null;
if(f.elementID){d=YDom.get(f.elementID)
}function a(r){if(!f.skipImp){var q="&sPromoId="+f.promoID+"&sAction="+r+"&sPageKey="+f.pageKey;
if(f.variant!==null){q=q+"&sVariant="+f.variant
}LI.asyncRequest("POST",f.url,{custom:{exception:function(){return false
}}},q)
}}function m(){a(o)
}function p(q){var r=YEvent.getTarget(q);
if(YDom.getAttribute(r,"href")==="#"){YEvent.preventDefault(q)
}if(YDom.hasClass(d,"closedOnce")){return
}a(n);
if(!f.skipHidePromo){LI.fade(d)
}YDom.addClass(d,"closedOnce")
}function j(){if(YDom.hasClass(d,"closedOnce")){return
}a(b);
if(f.closeOnAction){LI.fade(d)
}YDom.addClass(d,"closedOnce")
}function k(){if(YDom.hasClass(d,"closedOnce")){return
}a(h);
if(!f.skipHidePromo){LI.fade(d)
}YDom.addClass(d,"closedOnce")
}function l(){if(YDom.hasClass(d,"closedOnce")){return
}a(c);
YDom.addClass(d,"closedOnce")
}function i(){YEvent.on(d,"click",function(q){var r=YEvent.getTarget(q);
if(r.id&&(r.id===f.actionTriggerID||r.id===f.actionLinkID)){j()
}else{if(r.id&&(r.id===f.closeTriggerID||r.id===f.cancelLinkID)){p(q)
}else{if(r.id&&(r.id===f.suspendTriggerID)){k()
}else{if(r.id&&(r.id===f.interactLinkID)){l()
}else{if(YDom.hasClass(r,f.actionTriggerClass)||YDom.hasClass(r,f.actionLinkClass)){j()
}else{if(YDom.hasClass(r,f.closeTriggerClass)||YDom.hasClass(r,f.cancelLinkClass)){p(q)
}else{if(YDom.hasClass(r,f.suspendTriggerClass)){k()
}else{if(YDom.hasClass(r,f.interactLinkID)){l()
}}}}}}}}})
}if(LI.MediatorFactory){LI.MediatorFactory.create(e).createEvent(g).subscribe(k)
}if(!f.skipInitialImp){YEvent.onDOMReady(m)
}YEvent.onDOMReady(i)
};(function(){if(LI.BalloonCalloutManager!==undefined){return
}LI.define("BalloonCalloutManager");
LI.BalloonCalloutManager=(function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/util/BalloonCallout.js")
}var f=500,p=f,d=100,u="callout-overlay",y="callout-",n='<span class="callout-arrow"></span>',h={},j={zIndex:10,constraintoviewport:true},v=null,A=false,i=null,l=null,m=null,c=false,s={},g=new YAHOO.util.KeyListener(document,{keys:27},{fn:function(){if(i){i.close(null)
}}});
var b=function(C,B){h[C]=B
};
var x=function(B){delete h[B]
};
var q=function(){A=true
};
var r=function(){A=false;
k()
};
var w=function(J){var G=J.config,I,D;
if(m){window.clearTimeout(m);
m=null;
i=null;
YDom.removeClass(l,"shown")
}if(i){i.close()
}i=J;
if(G.relativeToTrigger===true){v.cfg.setProperty("constraintoviewport",false)
}if(G.zIndex!==null&&G.zIndex!==undefined){v.cfg.setProperty("zIndex",G.zIndex)
}f=G.persist?d:p;
YDom.setStyle(l,"width",G.width);
l.className=[G.type," ",y,G.orientation," ",G.id].join("");
if(!G.cacheCalloutContent&&G.id){v.setBody(document.getElementById(G.id).innerHTML+n)
}else{v.setBody(G.content+n)
}v.render(document.body);
v.cfg.setProperty("context",[J.el,G.overlayCorner,G.contextCorner]);
l.dimensions=o(l);
J.el.dimensions=o(J.el);
I=G.orientation.split("-");
D=s[I[0]](J.el,l,I);
D.dx+=G.offsetX;
D.dy+=G.offsetY;
YDom.setXY(l,[l.dimensions.x+D.dx,l.dimensions.y+D.dy]);
if(YAHOO.env.ua.ie===6){v.moveTo([l.dimensions.x+D.dx,l.dimensions.y+D.dy])
}YDom.addClass(l,"shown");
if(G.eventsOnInternalElements){var C=G.eventsOnInternalElements;
if(C.elementClass&&C.elementClass!==""){var F=YDom.getElementsByClassName(C.elementClass),H=F.length;
for(var E=0,B;
E<H;
E++){B=F[E];
YEvent.purgeElement(B,false,C.elementEvent);
YEvent.on(B,C.elementEvent,J[C.elementAction],J,true)
}}c=true
}if(G.persist){g.enable()
}};
s={top:function(H,C,B,E){var I=H.dimensions||o(H),G=C.dimensions||o(C),D,F;
E=E||{};
if(B[0]==="top"){E.dx=I.x+0.5*I.width-(G.x+0.5*G.width);
E.dy=I.y+I.height-G.y;
if(B[1]){this[B[1]](H,C,B,E)
}}else{D=Y$(".callout-arrow",C,true);
F=o(D);
F.height=F.height||0;
E.dy+=(0.5*G.height-0.5*F.height)
}return E
},right:function(H,C,B,E){var I=H.dimensions||o(H),G=C.dimensions||o(C),D,F;
E=E||{};
if(B[0]==="right"){E.dx=I.x-(G.x+G.width);
E.dy=I.y+0.5*I.height-(G.y+0.5*G.height);
if(B[1]){this[B[1]](H,C,B,E)
}}else{D=Y$(".callout-arrow",C,true);
F=o(D);
F.width=F.width||0;
E.dx+=(-0.5*G.width+0.5*F.width)
}return E
},bottom:function(H,C,B,E){var I=H.dimensions||o(H),G=C.dimensions||o(C),D,F;
E=E||{};
if(B[0]==="bottom"){E.dx=I.x+0.5*I.width-(G.x+0.5*G.width);
E.dy=I.y-(G.y+G.height);
if(B[1]){this[B[1]](H,C,B,E)
}}else{D=Y$(".callout-arrow",C,true);
F=o(D);
F.height=F.height||0;
E.dy+=(-0.5*G.height+0.5*F.height)
}return E
},left:function(H,C,B,E){var I=H.dimensions||o(H),G=C.dimensions||o(C),D,F;
E=E||{};
if(B[0]==="left"){E.dx=I.x+I.width-G.x;
E.dy=I.y+0.5*I.height-(G.y+0.5*G.height);
if(B[1]){this[B[1]](H,C,B,E)
}}else{D=Y$(".callout-arrow",C,true);
F=o(D);
F.width=F.width||0;
E.dx+=(0.5*G.width-0.5*F.width)
}return E
}};
var o=function(D){var C=YDom.getXY(D),F,B,E;
if(!C||!C.length){return{}
}F=D.getBoundingClientRect();
E=parseInt(F.right-F.left,10);
B=parseInt(F.bottom-F.top,10);
return{height:B,width:E,x:C[0],y:C[1]}
};
var z=function(C){var B=i&&!i.isActive();
if((!A&&B)||C){v.setBody("");
i=null;
YDom.removeClass(l,"shown");
g.disable()
}};
var k=function(){if(!m){m=window.setTimeout(function(){window.clearTimeout(m);
m=null;
z(false)
},f)
}};
var t=function(){z(true)
};
var e=function(){v=new YAHOO.widget.Overlay(u,j);
v.render(document.body);
l=YDom.get(u);
YEvent.on(l,"mouseover",q);
YEvent.on(l,"mouseout",r);
if(LI.Events&&typeof LI.Events.trigger==="function"){LI.Events.trigger("LI.BalloonCalloutManager:initialized")
}};
var a=function(){return i
};
YEvent.onDOMReady(function(){if(YAHOO&&YAHOO.widget&&YAHOO.widget.Overlay){e()
}else{var B;
if(!(LI&&LI.UrlPackage&&LI.UrlPackage.containerCore)){throw new Error("The package url for container-core does not exist.")
}B=LI.UrlPackage.containerCore;
YAHOO.util.Get.script(B,{onSuccess:e,onFailure:function(){throw new Error("Failed to load dependency: "+B)
}})
}});
return{register:b,destroy:x,overlay:v,show:w,hide:k,showing:a,forceClose:t}
})()
})();
LI.define("BalloonCallout");
LI.BalloonCallout=function(c,r){var p=LI.BalloonCalloutManager,b=null,f=350,d="hover",a=YDom.get("callout-overlay")||null,m={"left":["tl","tr",5,0],"right":["tr","tl",-5,0],"top":["tl","tl",0,5],"bottom":["bl","tl",0,-5],"top-left":["tl","bl",0,5],"top-right":["tr","br",0,5],"right-top":["tr","tl",-5,0],"right-bottom":["br","bl",-5,0],"bottom-right":["br","tr",0,-5],"bottom-left":["bl","tl",0,-5],"left-bottom":["bl","br",5,0],"left-top":["tl","tr",5,0]},n,k,h,g;
r=r||{};
if(c.tagName&&c.tagName.toLowerCase()==="a"&&c.href.indexOf("#")>-1){r.anchor=true;
r.id=c.href.substring(c.href.indexOf("#")+1)
}else{r.anchor=false
}r={anchor:r.anchor,width:r.width||300,id:r.id||"",overlayCorner:r.overlayCorner||null,contextCorner:r.contextCorner||null,orientation:r.orientation||"left-top",content:r.content||null,events:r.events||["mouseover","mouseout"],eventsOnInternalElements:r.eventsOnInternalElements||null,type:r.type||"balloon-callout",offsetX:r.offsetX||0,offsetY:r.offsetY||0,relativeToTrigger:r.relativeToTrigger||false,zIndex:r.zIndex,persist:r.persist||false,delayOpen:r.delayOpen||false,cacheCalloutContent:r.cacheCalloutContent!==undefined?r.cacheCalloutContent:true,toolTipTextAttr:r.toolTipTextAttr||null,openCallback:r.openCallback||null,closeCallback:r.closeCallback||null};
var o=function(s){YEvent.preventDefault(s);
if(r.persist){YEvent.stopPropagation(s)
}};
var q=function(s){this.persist=true;
if(YAHOO.util.Dom.hasClass(s.target,"callout-close")){j()
}};
var e=function(s){var t=false;
if(s.button){t=(s.button===2);
this.persist=t?true:false
}if(!this.persist){j.call(this,s)
}else{this.persist=false
}};
var i=function(){var t=this;
this.active=true;
YDom.addClass(c,d);
if(g){n=c.title;
c.title=""
}function s(){p.show(t);
t.openEvent.fire();
if(!a){a=YDom.get("callout-overlay")
}if(r.persist){YEvent.on(a,"click",q,t,true);
YEvent.on(document,"click",e,t,true);
var u=YDom.getElementsByClassName("callout-close",null,a);
if(u.length>0){u[0].focus()
}}else{YEvent.removeListener(a,"click",q);
YEvent.removeListener(document,"click",e)
}if(r.openCallback&&typeof(r.openCallback)==="function"){r.openCallback(t)
}}if(r.delayOpen&&!b){b=window.setTimeout(function(){b=null;
s()
},f)
}else{s()
}};
var j=function(s){this.active=false;
this.persist=false;
YDom.removeClass(c,d);
if(g){c.title=n
}if(r.delayOpen&&b){window.clearTimeout(b);
b=null
}if(s){p.hide()
}else{p.forceClose()
}if(r.persist){YEvent.removeListener(a,"click",q);
YEvent.removeListener(document,"click",e);
if(c){c.focus()
}}if(r.closeCallback&&typeof(r.closeCallback)==="function"){r.closeCallback(self)
}};
var l=function(s){this.active=!this.active;
if(this.active||this!==p.showing()){i.call(this,s)
}else{if(!r.persist||(r.events[0]!=="mouseover")){j.call(this,s)
}else{this.active=true
}}};
this.isActive=function(){return this.active
};
this.destroy=function(){if(r.anchor){YEvent.removeListener(c,"click",o)
}if(r.persist){YEvent.removeListener(c,r.events[0],l)
}else{YEvent.removeListener(c,r.events[0],i);
YEvent.removeListener(c,r.events[1],j)
}if(r.eventsOnInternalElements){var w=r.eventsOnInternalElements;
if(w.elementClass&&w.elementClass!==""){var t=YDom.getElementsByClassName(w.elementClass),v=t.length;
for(var u=0,s;
u<v;
u++){s=t[u];
YEvent.removeListener(s,w.elementEvent,w.elementAction)
}}}j();
p.destroy(c.id)
};
this.setContent=function(s){if(!s){s=document.getElementById(r.id).innerHTML
}r.content=s
};
if(!r.content){r.content=document.getElementById(r.id);
if(!r.content){throw"Could not find info element"
}else{k=r.content.innerHTML;
if(r.toolTipTextAttr){n=c.getAttribute(r.toolTipTextAttr);
k=k.replace("__PLACEHOLDER__",LI.htmlEncode(n))
}r.content=k
}}if(r.width!=="auto"){r.width+="px"
}if(r.anchor){YEvent.on(c,"click",o)
}if(!r.overlayCorner){r.overlayCorner=m[r.orientation][0]
}if(!r.contextCorner){r.contextCorner=m[r.orientation][1]
}r.offsetX+=m[r.orientation][2];
r.offsetY+=m[r.orientation][3];
this.openEvent=new YAHOO.util.CustomEvent("open");
YDom.generateId(c,"callout-trigger-");
g=(r.toolTipTextAttr==="title");
this.config=r;
this.el=c;
this.active=false;
this.close=j;
this.open=i;
this.toggle=l;
this.persist=false;
p.register(c.id,this);
if(r.persist){YEvent.on(c,r.events[0],l,this,true)
}else{YEvent.on(c,r.events[0],i,this,true);
YEvent.on(c,r.events[1],j,this,true)
}};
LI.Controls.register("LI.BalloonCallout");
LI.define("BalloonCalloutDelegator");
LI.BalloonCalloutDelegator=function(c,a){var b={};
a=a||{};
a.dataId=a.dataId?("data"+a.dataId):"data-li-tooltip-id";
function d(g,e){if(e&&!b[e.id]){a.id=g;
var f=new LI.BalloonCallout(e,a);
f.toggle();
b[e.id]=true
}}YEvent.on(c,"mouseover",function(e){var f=YEvent.getTarget(e),g=YDom.getAttribute(f,a.dataId);
if(g){YDom.generateId(f);
d(g,f);
YEvent.stopPropagation(e)
}})
};(function(){var a="data-embedLink",d="iframe",g="inline-view",f="share-object";
function c(h){var i,j=YEvent.getTarget(h);
if(YDom.hasClass(j,"inline-share")&&j.hasAttribute(a)){YEvent.preventDefault(h);
i=j.getAttribute(a);
b(j,i)
}else{if(YDom.hasClass(j,"close-document")){YEvent.preventDefault(h);
e(j)
}}}function e(j){var h=YDom.getAncestorByClassName(j,f),i=Y$(d,h)[0];
i.parentNode.removeChild(i);
YDom.removeClass(h,g)
}function b(k,j){var i=document.createElement(d),h=YDom.getAncestorByClassName(k,f);
h.appendChild(i);
i.src=j;
YDom.addClass(h,g)
}YEvent.onDOMReady(function(){YEvent.on("body","click",c)
})
})();(function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusInlineVideo.js")
}var r=300,b="DDDDDD",k="E8E8E8",h=/^https?\:\/\/www\.youtube\.com\/watch\?/,j=/^https?\:\/\/youtu\.be\//,u,o="feed-item",e="video-container",d="video-body",l="video-share",s="video-shown",v="share-object",g="photo",m="properties",p="div",q="a",f=8;
function n(x){return h.test(x)||j.test(x)
}function t(y){var x=/[\?&]v=([^&#]*)/.exec(y);
if(x){return x[1]
}x=/\/([^/]*)$/.exec(y);
if(x){return x[1]
}return null
}function c(y){var x=null,z;
if(n(y)){z=t(y);
if(z){x={url:"https://www.youtube.com/v/"+z+"?autoplay=1&fs=1&rel=0&color1="+b+"&color2="+k,width:"100%",height:r+"px",params:{allowfullscreen:"true",wmode:"transparent",allowScriptAccess:"never"}}
}}return x
}function a(B){var y=B.url,z=B.id||"player-"+(new Date().getTime()),A=B.width||"100%",J=B.height||"100%",D=B.params||{},C=B.flashvars||{},I=D["quality"]||"high",G="",F="",x=[],H,E,K=null;
for(H in D){if(D.hasOwnProperty(H)){G+='<param name="'+H+'" value="'+D[H]+'" />';
F+=" "+H+'="'+D[H]+'" '
}}for(H in C){if(C.hasOwnProperty(H)){x[x.length]=H+"="+C[H]
}}if(x.length){E=x.join("&");
G+='<param name="flashvars" value="'+E+'" />';
F+=' flashvars="'+E+'" '
}K='<object id="'+z+'" width="'+A+'" height="'+J+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">'+'<param name="movie" value="'+y+'" />'+'<param name="quality" value="'+I+'" />'+G+'<embed name="'+z+'" width="'+A+'" height="'+J+'" src="'+y+'" quality="'+I+'" '+F+' type="application/x-shockwave-flash"></embed>'+"</object>";
return K
}function w(){var y=0,x,A,z;
if(navigator.plugins&&navigator.plugins.length){x=navigator.plugins["Shockwave Flash"];
if(x&&x.description&&x.description.length){A=/[0-9]+./;
y=parseInt(x.description.match(A)[0],10)
}}else{if(YAHOO.env.ua.ie){for(z=(f+10);
z>=f;
z--){try{x=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+z);
y=z;
break
}catch(B){}}}}return(y>=f)
}function i(I){var G=YEvent.getTarget(I),B=G.getAttribute("data-contentpermalink")||(G.parentNode&&G.parentNode.getAttribute("data-contentpermalink")),x,J,A,D,C,F,E,H,y;
function z(K){J=YDom.getAncestorByClassName(K,o);
C=YDom.getElementsByClassName(e,p,J)[0];
E=YDom.getElementsByClassName(g,p,J)[0];
H=YDom.getElementsByClassName(m,p,J)[0];
A=YDom.getElementsByClassName(v,p,J)[0];
D=YDom.getElementsByClassName(l,q,A)[0];
F=YDom.getElementsByClassName(d,p,C)[0];
A=D||A
}if(B&&n(B)){if(u===undefined){u=(!YAHOO.env.ua.mobile&&w())
}if(u){YEvent.preventDefault(I);
z(G);
if(!C){location.href=B
}F.innerHTML=a(c(B));
YDom.setStyle(F,"opacity",0);
F.style.height=(A.offsetHeight-20)+"px";
A.style.display="none";
C.style.display="block";
YDom.addClass(E,s);
YDom.addClass(H,s);
y=new YAHOO.util.Anim(F,{height:{to:r}},0.2);
y.onComplete.subscribe(function(){new YAHOO.util.Anim(F,{opacity:{to:1}},0.2).animate()
});
y.animate();
if(WebTracking){WebTracking.trackUserAction("NusInlineVideo-play")
}}}else{if(YDom.hasClass(G,"video-close")){YEvent.stopEvent(I);
z(G);
C.style.display="none";
A.style.display="block";
YDom.removeClass(E,s);
YDom.removeClass(H,s);
F.innerHTML=""
}}}YEvent.onDOMReady(function(){YEvent.on("body","click",i)
})
})();LI.define("JSONPRequest");
LI.JSONPRequest=function(){this._init.apply(this,arguments)
};
LI.JSONPRequest.prototype={_requests:0,_init:function(a,c){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/util/JSONPRequest.js")
}this.url=a;
c=(YAHOO.lang.isFunction(c))?{on:{success:c}}:c||{};
var b=c.on||{};
if(!b.success){b.success=this._defaultCallback(a,c)
}this._config=YAHOO.lang.merge({context:this,args:[],format:this._format,allowCache:false},c,{on:b})
},_defaultCallback:function(){},send:function(){var a=this,d=Array.prototype.slice.call(arguments),c=a._config,e=a._proxy||a._uniqid(),b;
if(c.allowCache){a._proxy=e;
a._requests++
}d.unshift(a.url,"LI.JSONP."+e);
b=c.format.apply(a,d);
if(!c.on.success){return a
}function f(g){return(YAHOO.lang.isFunction(g))?function(h){if(!c.allowCache||!--a._requests){delete LI.JSONP[e]
}g.apply(c.context,[h].concat(c.args))
}:null
}LI.JSONP[e]=f(c.on.success);
YAHOO.util.Get.script(b,{onFailure:f(c.on.failure),onTimeout:f(c.on.timeout),timeout:c.timeout});
return a
},_format:function(a,b){return a.replace(/\{callback\}/,b)
},_uniqid:function(){return("LI"+this._S4()+this._S4()+"_"+this._S4()+"_"+this._S4()+"_"+this._S4()+"_"+this._S4()+this._S4()+this._S4())
},_S4:function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)
}};
if(!LI.JSONP){LI.JSONP={}
};(function(){function a(c,b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusSignalHits.js")
}YEvent.on(c,"mouseover",function(f){var i=YEvent.getTarget(f),d,h,g,e;
if(!YDom.hasClass(i,"signal-hit")){i=YDom.getAncestorByClassName(i,"signal-hit")
}if(i){d=Y$(".signal-hit-content",i,true);
if(d){h=d.innerHTML
}g=YDom.getElementsByClassName("signal-share-comment","div",c)[0];
if(g){g.innerHTML=h;
e=YDom.getElementsByClassName("signal-share-comment-container","div",c)[0];
if(e){arrowBorderEl=YDom.getChildrenBy(e,function(j){return YDom.hasClass(j,"arrow-border")
})[0];
YDom.setX(arrowBorderEl,YDom.getX(i)+15)
}}}})
}LI.NusSignalHits=a
})();(function(){function a(c,b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusTodayTracking.js")
}if(!WebTracking){return
}var d="data-li-trk-code";
YEvent.on(c,"click",function(f){var g=YEvent.getTarget(f),e;
if(g&&(g.tagName.toLowerCase()==="a"||g.tagName.toLowerCase()==="img"||g.tagName.toLowerCase()==="cite"||g.tagName.toLowerCase()==="span")){if(LI.hasDataAttribute(g,d)){e=LI.getDataAttribute(g,d);
WebTracking.trackUserAction(e)
}}})
}LI.NusTodayTracking=a
})();LI.define("InviteDialog");
LI.InviteDialog=function(c,d){if(LI.__HPA===true){LI.log("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/InviteDialog.js")
}var j=this;
var a=(c.nodeName==="A");
var f,h,i;
d=d||{};
d={successRedirectURL:(d.successRedirectURL)?d.successRedirectURL:null,showGlobalSuccess:(d.showGlobalSuccess===false)?false:true};
this.onInviteSuccess=new YAHOO.util.CustomEvent("inviteSuccess");
function g(k){j.onInviteSuccess.fire(k);
if(d.successRedirectURL){document.location.href=d.successRedirectURL
}if(d.showGlobalSuccess){var l=LI.i18n.get("search-consumer-vcard-connect-success");
l=l.replace(/__(.*?)__/g,"{$1}");
l=YAHOO.lang.substitute(l,k);
LI.injectAlert(l,"success")
}f.close()
}function b(k){YDom.removeClass(h,"dialog-body-loading");
if(i){YDom.removeClass(i,"invite-dialog-loading")
}f.swap({content:{node:k}});
i=k;
LI.Controls.parseFragment(i);
e()
}function e(){if(!h){return
}var l=h.getElementsByTagName("form");
var n=function(o){var p=this;
YEvent.preventDefault(o);
function q(){p.submit()
}YDom.addClass(i,"invite-dialog-loading");
YAHOO.util.Connect.setForm(p,false);
LI.asyncRequest("POST",p.action,{success:function(s){var r=s.responseText;
if(typeof r==="object"&&r.status&&r.status==="success"&&r.user){if(LI.Events){LI.Events.fire("inbox-pending-invite_pymk-invite-sent",r.user)
}g(r.user)
}else{}},custom:{exception:function(t){var s=document.createElement("div");
s.innerHTML=t.responseText;
var r=Y$(".invite-content",s,true);
if(r){b(r)
}else{return true
}return false
}},failure:function(r){q()
}})
};
for(var m=0,k=l.length;
m<k;
m++){YEvent.on(l[m],"submit",n)
}}YEvent.on(c,"click",function(k){var l=YEvent.getTarget(k);
if(k.metaKey){return true
}if(l.nodeName!=="A"){l=YDom.getAncestorByTagName(l,"a")
}if(l&&(a||YDom.hasClass(l,"invite-dialog"))){YEvent.preventDefault(k)
}j.open(l,k)
});
LI.InviteDialog.prototype.open=function(m,k){if(m&&(a||YDom.hasClass(m,"invite-dialog"))){var n=m.getAttribute("title");
if(!n||n===""){n=LI.i18n.get("InviteDialog-default-title")
}f=new LI.Dialog();
f.open(k||null,{content:{title:n,html:""},name:"one-click-invite-dialog",type:"task-modeless",className:"invite-dialog dialog-v2",width:"410"});
h=Y$("#dialog-wrapper .dialog-body",document,true);
if(h){YDom.addClass(h,"dialog-body-loading")
}LI.removeAlert(null,true);
var l=function(){document.location.href=m.href
};
YAHOO.util.Connect.initHeader("X-IsDialog","1");
YAHOO.util.Connect.asyncRequest("GET",m.href,{success:function(r){var q=document.createElement("div");
q.innerHTML=r.responseText;
var p=Y$(".invite-content",q,true);
if(p){b(p)
}else{l()
}},failure:function(){l()
}})
}}
};(function(){function a(b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/SignalInviteDialog.js")
}if(LI.InviteDialog){var c=new LI.InviteDialog(b,{showGlobalSuccess:true});
c.onInviteSuccess.subscribe(function(j,g,l){var f=g[0],e,k,h,d;
e=YDom.getElementsByClassName("connect-link-"+f.id,"li",b);
d=e.length;
for(h=0;
h<d;
h++){k=e[h];
k.parentNode.removeChild(k)
}})
}}LI.SignalInviteDialog=a
})();var a;
(function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/miniprofile_popup.js ")
}var i=500,f=400,d="lui-panel-body",c={zIndex:1007,underlay:"none",close:false,draggable:false,visible:false},h="panel-left",e="miniprofile-container",g="data-li-miniprofile-id";
function b(l,j,k){this.url=l.className.split(" ")[1];
this.id=l.id;
this.node=l;
this.panel=j;
this.manager=k
}b.prototype={addListeners:function(){LI.Controls.parseFragment(this.panel.getDomNode());
YEvent.on("miniprofile-close","click",this.hide,this,true)
},calculatePosition:function(l){var m=this.node,j=YDom.getRegion(m),q=YDom.getViewportWidth(),n=YDom.getViewportHeight(),u=this.panel.getDomNode(),o=YDom.getRegion(u),k=o.width||0,p=o.height||0,s,r,t;
if(l===true){if((q-j.right)>k){s=j.right+3;
r=j.top-10;
t=false
}else{s=j.left-k;
r=j.top-10;
t=true
}}else{s=j.left-(k/2.4);
r=j.bottom+2;
t=false
}if(window.self!=window.top){s=(s<0)?0:s;
if(r+p>n){r=n-p-20
}}return{x:s,y:r,flipped:t}
},getID:function(){return this.id
},hide:function(){var j=this.panel;
this.removeListeners();
j.setBody("");
j.clearMiniProfileReference();
j.hide()
},removeListeners:function(){YEvent.removeListener("miniprofile-close","click",this.hide)
},setContent:function(j){this.content=j
},show:function(){var o=this.content,n=this.node,l=this.manager,j=this.panel,m,k=n.getAttribute("data-li-getjs");
if(!o&&o!==false){if(k){YAHOO.util.Get.script(k)
}l.requestContent(this.url,{success:function(p){if(!LI.isFullPage(p)){this.setContent(p);
this.show()
}},scope:this});
return
}if(o===false){return
}j.setBody(o);
this.addListeners();
if(n.getAttribute("data-li-panelclass")){j.setClass(n.getAttribute("data-li-panelclass"));
m=this.calculatePosition(false)
}else{m=this.calculatePosition(true)
}j.setMiniProfileReference(this.id);
j.show();
j.setPosition(m.x,m.y,m.flipped);
l.onShowMiniProfileEvent.fire()
},clearCachedData:function(){var j=this.manager;
j.removeFromCache(this.url)
}};
window.MiniProfileManager=(function(){var E={},w={},B={},r=false,u=null,A=null,k,t=false,n=false,s=new YAHOO.util.CustomEvent("onShowMiniProfile"),F=(YAHOO&&YAHOO.widget&&typeof YAHOO.widget.Overlay==="function")?true:false;
if(!F){var m;
if(!(LI&&LI.UrlPackage&&LI.UrlPackage.containerCore)){throw new Error("The package url for container-core does not exist.")
}m=LI.UrlPackage.containerCore;
YAHOO.util.Get.script(m,{onSuccess:function(){F=true
},onFailure:function(){throw new Error("Failed to load dependency: "+m)
}})
}function l(){if(!u&&r&&F){A=YDom.get(d);
if(!A){A=document.createElement("div");
document.body.appendChild(A);
A.id=d
}u=new YAHOO.widget.Overlay(A,c);
u.render(document.body);
YEvent.on(A,"mouseover",x);
YEvent.on(A,"mouseout",G)
}}k={setBody:function(I){l();
if(A){A.innerHTML=I
}},setPosition:function(I,K,J){l();
if(!u){return
}u.moveTo(I,K);
if(!J){YDom.removeClass(A,h)
}else{YDom.addClass(A,h)
}},setClass:function(I){l();
if(!u){return
}YDom.addClass(A,I);
u.hideEvent.subscribe(function(){YDom.removeClass(A,I);
u.hideEvent.unsubscribe()
})
},show:function(){l();
if(u){u.show()
}},hide:function(){l();
if(u){u.hide()
}},getDomNode:function(){l();
return A
},setMiniProfileReference:function(I){l();
if(A){A.setAttribute(g,I)
}},clearMiniProfileReference:function(){l();
if(A){A.setAttribute(g,"")
}}};
var q={requestShow:D,requestHide:o,requestContent:y,onShowMiniProfileEvent:s,removeFromCache:v};
YEvent.onDOMReady(function(){r=true
});
function H(J,I){E[J]=I
}function j(I){return E[I]
}function p(){if(!n&&!t){k.hide()
}}function D(I){n=true;
B[I.getID()]=window.setTimeout(function(){I.show()
},i)
}function o(){n=false;
window.setTimeout(p,f)
}function z(K,J){if(K&&K.success){var I=K.scope||window;
K.success.call(I,J)
}}function y(I,J){if(!YAHOO.lang.isUndefined(w[I])){z(J,w[I]);
return
}YAHOO.util.Connect.asyncRequest("GET",I,{success:function(L){var K=L.responseText||false;
w[I]=K;
z(J,K)
},failure:function(K){w[I]=false
}})
}function v(I){delete w[I]
}function x(){t=true
}function G(I){var L=YEvent.getRelatedTarget(I);
var K=YDom.get(d);
if(L==K){return
}var J=L;
if(YDom.isAncestor(K,J)){return
}t=false;
window.setTimeout(p,f)
}function C(){var I=YDom.get(d),J;
if(!I){return null
}J=I.getAttribute(g);
if(J){return j(J)
}return null
}YEvent.on(document,"mouseover",function(J){var L=YEvent.getTarget(J),K,I=C();
for(miniProfileId in B){if(YAHOO.lang.hasOwnProperty(E,miniProfileId)){window.clearTimeout(B[miniProfileId]);
delete B[miniProfileId]
}}while(L){if(YDom.hasClass(L,e)){if(!L.id){L.id=YDom.generateId()
}K=j(L.id);
if(!K){K=new b(L,k,q);
H(L.id,K)
}if(!u||!u.cfg.getProperty("visible")||!I||I.id!==K.id){D(K)
}return
}L=L.parentNode
}o()
});
return{init:function(){},getCurrentMiniProfile:C,onShowMiniProfileEvent:s}
})();
window.MiniProfileManager.init()
})();
window.miniProfile=window.MiniProfileManager;