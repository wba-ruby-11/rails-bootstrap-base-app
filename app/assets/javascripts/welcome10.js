function SaveUISetting(b,a){a={setting:{name:(a.setting&&a.setting.name)?a.setting.name:null,value:(a.setting&&a.setting.value)?a.setting.value:"false",url:(a.setting&&a.setting.url)?a.setting.url:null},triggerID:a.triggerID||null,preventDefault:(a.preventDefault===false)?false:true,saveOnLoad:(a.saveOnLoad===true)?true:false,saveCustomOnLoad:(a.saveCustomOnLoad===true),container:b};
if(a.triggerID){YEvent.on(a.triggerID,"click",this.saveSetting,a)
}if(a.saveOnLoad){if(typeof(oUISettings)!=="undefined"&&oUISettings.saveSettings){oUISettings.saveSettings(a.setting.name,a.setting.value)
}}if(a.saveCustomOnLoad){this.saveSetting(null,{setting:a.setting})
}}SaveUISetting.prototype={saveSetting:function(a,c){if(typeof(oUISettings)!=="undefined"&&oUISettings.saveSettings){if(c.setting.name){oUISettings.saveSettings(c.setting.name,c.setting.value)
}}if(c.setting&&c.setting.url){LI.asyncRequest("POST",c.setting.url,{custom:{exception:function(){return false
}}})
}if(c.preventDefault){YEvent.preventDefault(a)
}var b=YDom.get(c.triggerID);
if(!c.preventDefault&&b&&b.tagName.toLowerCase()==="a"){YEvent.preventDefault(a);
window.setTimeout(function(){location.href=b.href
},1)
}var d=YDom.get(c.container);
LI.fade(d)
}};(function(){var c="interrupt success-plus success-timeout task-modal task-modeless task-modeless-secondary no-header noheader-modal";
var b="POST";
var a="GET";
var f={autoSize:"no-header task-modeless success-plus success-timeout",modal:"interrupt task-modal noheader-modal",dragNDrop:"task-modeless task-modeless-secondary success-plus success-timeout",docClick:"success-plus success-timeout",timeout:"success-timeout"};
var g=null;
var e={or:LI.i18n.get("Dialog-or"),closeThisWindow:LI.i18n.get("Dialog-closeWindow"),cancel:LI.i18n.get("Dialog-cancel"),submit:LI.i18n.get("Dialog-submit"),start:LI.i18n.get("Dialog-start"),end:LI.i18n.get("Dialog-end")};
LI.Dialog=function(j,i){var h=g||new d();
g=h;
if(j){e=(i.i18n)?i.i18n:e;
i=i||{};
i.content=i.content||{};
i.webtrack=i.webtrack||{};
i={content:{attentionMsg:i.content.attentionMsg||null,successMsg:i.content.successMsg||null,title:i.content.title||null,node:i.content.node||null,url:i.content.url||null,method:(i.content.method===b)?b:a,postData:i.content.postData||"",useCache:i.content.useCache||false,html:i.content.html||null,submitButton:i.content.submitButton||false,dustData:i.content.dustData||null,dustDataUrl:i.content.dustDataUrl||null,dustTemplate:i.content.dustTemplate||null},dependencies:i.dependencies||null,name:i.name||"config.name=not_set",className:i.className||"",type:(i&&i.type&&c.match(i.type))?i.type:"task-modeless",width:(i&&i.width)?parseInt(i.width,10):500,webtrack:{key:i.webtrack.key||null,val:i.webtrack.val||null},container:(i.container)?i.container:null,extra:(i.extra)?i.extra:null,lazyEvent:(i.lazyEvent)?i.lazyEvent:null,stopEvent:(typeof(i.stopEvent)==="undefined")?true:(!!i.stopEvent),showOnlyWhenReady:i.showOnlyWhenReady||false,childTarget:i.childTarget||null,allowMultipleChildren:i.allowMultipleChildren||false,scrollTopOnOpen:(typeof(i.scrollTopOnOpen)==="undefined")?true:(!!i.scrollTopOnOpen),disableFocusOnClose:(!!i.disableFocusOnClose)?i.disableFocusOnClose:false};
if(i.childTarget){j=Y$(i.childTarget,j,!i.allowMultipleChildren)||j
}YEvent.on(j,"click",g.open,i);
if(i.lazyEvent){g.open(i.lazyEvent,i)
}}return g
};
function d(){var O;
var y;
var D=null,q=null,H=null;
var A=parseInt(YDom.getStyle("body","padding-right"),10);
var w=document.createElement("DIV");
var I=document.createElement("DIV");
I.id="dialog-place-holder";
var p=new YAHOO.util.CustomEvent("close");
var r=new YAHOO.util.CustomEvent("open");
var j=new YAHOO.util.CustomEvent("beforeOpen");
var z=new YAHOO.util.CustomEvent("submit");
var n=new YAHOO.util.CustomEvent("swap");
var B=new YAHOO.util.CustomEvent("contentChange");
var E={};
function h(){if(O.container){var Q=YDom.getRegion(O.container);
return Q.width
}else{return(YDom.getViewportWidth()+30)
}}function J(Y){var X=(Y&&Y.type==="click"||(Y==="keyPressed"||Y==="timer"||Y==="selfClose")),S=Y$("#dialog-wrapper iframe"),Q=YDom.get("body"),V=(Q)?Q.getElementsByTagName("a")[0]:document.getElementsByTagName("a")[1];
if(X){if(S.length){LI.hide(S)
}L();
var T=YDom.get("dialog-wrapper");
if(!T){return
}var R=Y$(".dialog-content",T,true);
if(R){R.innerHTML=""
}l();
YEvent.removeListener(window,"resize",m);
document.body.removeChild(T);
YDom.removeClass(document.body,"dialog-mask-active");
YDom.removeClass(document.body,"dialog-hide-select");
t.disable();
YDom.setStyle("body","padding-right",A+"px");
YDom.setStyle([YDom.get("header"),YDom.get("footer")],"margin-right","auto");
YDom.setStyle(document.getElementsByTagName("HTML")[0],"overflow","");
if(q){YEvent.removeListener(document,"click",J);
q=null
}if(D){clearTimeout(D);
D=null
}if(!O.disableFocusOnClose){if(y&&y.focus){try{y.focus()
}catch(U){try{V.focus()
}catch(W){}}}else{if(V){try{V.focus()
}catch(U){}}}}}YEvent.removeListener(document,"focusin",G);
return X
}var t=new YAHOO.util.KeyListener(document,{keys:27},{fn:J});
function F(R){O=R;
var T,S,Q="&nbsp";
if(O.content){if(O.content.title){T=O.content.title
}else{if(O.content.node){S=Y$(".dialog-title",O.content.node,true);
if(S){T=S.innerHTML;
YDom.setStyle(S,"display","none")
}}}}if(!T){T=Q
}w.innerHTML=YAHOO.lang.substitute(['<div class="dialog-window">','<span class="dialog-a11y-hidden">{start}</span>','<div class="dialog-title"><button class="dialog-close" title="{closeWindow}"></button><h3 id="li-dialog-aria-label" class="title">{title}</h3></div>','<div class="dialog-body"></div>','<span class="dialog-a11y-hidden">{end}</span>',"</div>"].join(""),{title:T.replace(/</g,"&lt;").replace(/>/g,"&gt;"),closeWindow:e.closeThisWindow,start:e.start,end:e.end})
}function k(Q){var R=YEvent.getTarget(Q);
if(YDom.hasClass(R,"dialog-close")&&!R.disabled){var S=J(Q);
if(S){YEvent.preventDefault(Q);
p.fire(R,H.name,H.extra)
}}else{if(YDom.hasClass(R,"dialog-submit")||(R.tagName==="INPUT"&&R.type&&R.type==="submit")){if(YDom.hasClass(R,"dialog-submit-suppress")){YEvent.preventDefault(Q)
}z.fire(R,H.name,H.extra)
}else{if(YDom.hasClass(R,"dialog-mask")&&f.modal.match(H.type)){YEvent.preventDefault(Q);
J(Q);
p.fire(R,H.name,H.extra)
}}}}YEvent.on(w,"click",k);
function P(Q){var S='<p class="dialog-close">{closeWindow}</p>';
var R='<input class="btn-primary" type="submit" value="{submit}"> {cancel}';
return YAHOO.lang.substitute(['<div class="dialog-message">{message}</div>','<div class="dialog-content">{content}</div>','<div class="dialog-actions">',(Q&&Q.content&&Q.content.submitButton)?R:"",(Q&&Q.content&&Q.content.closeMessage)?S:"","</div>"].join(""),{cancel:e.or+' <span class="dialog-cancel dialog-close">'+e.cancel+"</span>",closeWindow:'<span class="dialog-cancel dialog-close">'+e.closeThisWindow+"</span>",message:(Q&&Q.content&&Q.content.msg)?"<p>"+Q.content.msg+"</p>":"",submit:(Q&&Q.content&&Q.content.submitButton!==true)?Q.content.submitButton:e.submit})
}function C(){YEvent.on(Y$(".dialog-title",w,true),"mousedown",function(Z){if(!YDom.hasClass(YEvent.getTarget(Z),"dialog-close")){T(Z)
}});
var X={};
var W={};
var Q=0,U=0;
var V=YDom.get("dialog-wrapper");
function T(Z){var aa=parseInt(YDom.getStyle(V,"width"),10)||0;
var ab=parseInt(YDom.getStyle(V,"height"),10)||0;
YDom.addClass(document.body,"dragging");
X={x:Z.clientX,y:Z.clientY};
W.left=W.left||parseInt(YDom.getStyle(V,"left"),10)||0;
W.top=W.top||parseInt(YDom.getStyle(V,"top"),10)||0;
Q=YDom.getDocumentWidth()-aa;
U=YDom.getDocumentHeight()-ab;
YEvent.on(document,"mouseup",S);
YEvent.on(document,"mousemove",Y);
R(true);
YEvent.stopEvent(Z)
}function Y(Z){W.left+=Z.clientX-X.x;
W.top+=Z.clientY-X.y;
W.left=Math.min(Math.max(W.left,0),Q);
W.top=Math.min(Math.max(W.top,0),U);
YDom.setStyle(V,"left",W.left+"px");
YDom.setStyle(V,"top",W.top+"px");
X={x:Z.clientX,y:Z.clientY}
}function S(){YDom.removeClass(document.body,"dragging");
YEvent.removeListener(document,"mouseup",S);
YEvent.removeListener(document,"mousemove",Y);
R(false)
}function R(Z){if(Z){document.body.ondrag=document.body.onselectstart=function(){return false
};
document.body.style.MozUserSelect="none"
}else{document.body.ondrag=document.body.onselectstart=null;
document.body.style.MozUserSelect=""
}}}function v(R){var T=O.content.method,S,Q;
YAHOO.util.Connect.initHeader("X-IsDialog","1");
S={success:function(U){if(H.showOnlyWhenReady){YDom.setStyle(w,"visibility","")
}var V=Y$(".dialog-body",w,true);
YDom.removeClass(V,"dialog-body-loading");
if(!U){x();
return false
}if(U&&U.responseText){var Y=U.getResponseHeader["Content-Type"];
if(Y&&Y.indexOf("application/json")>-1){var X=LI.parseJSON(U.responseText);
u({content:{html:X.html}})
}else{var W=YAHOO.lang.trim(U.responseText);
if(W.indexOf("<!DOCTYPE")===0||W.indexOf("<html")===0){x()
}else{u({content:{html:W}})
}}}},failure:function(){x()
},timeout:15000};
if(T===b){Q=O.content.postData;
YAHOO.util.Connect.asyncRequest(b,R,S,Q)
}else{YAHOO.util.Connect.asyncRequest(a,R,S)
}}function x(){LI.Dialog().close();
if(!H.showOnlyWhenReady){LI.injectAlert(LI.i18n.get("Dialog-error-generic"),"error")
}}function o(Q,R){LI.asyncRequest(a,Q,{success:function(S){N(S.responseText,R)
},failure:x})
}function N(R,S){dust.render(S||O.content.dustTemplate,R,function Q(U,T){if(U){x()
}else{YDom.removeClass(Y$(".dialog-body",w,true),"dialog-body-loading");
u({content:{html:T,attentionMsg:O.content.attentionMsg,successMsg:O.content.successMsg}})
}})
}function m(Q){if(f.modal.match(O.type)){if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<7){var U=YDom.getClientRegion();
YDom.setStyle(w,"height",(U.bottom-U.top)+"px")
}}else{var S=Y$(".dialog-window",w,true),T=YDom.get("dialog-wrapper"),R=parseInt(YDom.getStyle(S,"width"),10);
YDom.setStyle(T,"left",(h()-R)/2+"px");
YDom.setStyle(T,"top",YDom.getDocumentScrollTop()+105+"px")
}}function M(ac,S){var U=(ac===null||typeof ac==="boolean")?"publicAPI":YEvent.getTarget(ac),ab;
if(YDom.inDocument("dialog-wrapper")&&(U!==y||U==="publicAPI")){J("selfClose")
}S.className=S.className||"";
var X=LI.DialogRetrofitV2Enabled||false;
if(X&&(S.className.split(" ").indexOf("dialog-v2")==-1)){S.className+=" dialog-v2-retrofit"
}H=S;
var Z=null;
if(typeof S.i18n==="object"){Z={};
YAHOO.lang.augmentObject(Z,e);
YAHOO.lang.augmentObject(e,S.i18n,true)
}w.className="dialog-mask dialog-"+S.type;
if(U!==y||U==="publicAPI"){F(S);
y=U
}u(S);
var W=Y$(".dialog-window",w,true);
YDom.setStyle(W,"width",S.width+"px");
YDom.setStyle(w,"visibility","hidden");
var Q=YDom.get("dialog-wrapper")||document.body.appendChild(document.createElement("DIV"));
Q.id="dialog-wrapper";
Q.innerHTML="";
if(S.className!==""){Q.className=S.className
}YDom.setStyle(Q,"top","");
YDom.setStyle(Q,"left","");
Q.appendChild(w);
LI.Controls.parseFragment(w);
var R=YDom.getStyle(w,"filter")||null;
if(f.modal.match(S.type)){ab=YAHOO.util.Region.getRegion(W);
YDom.setStyle(W,"margin-left",(S.width*-0.5)+"px");
var Y=YAHOO.util.Region.getRegion(Q);
if(S.scrollTopOnOpen){YDom.setStyle(document.getElementsByTagName("HTML")[0],"overflow","hidden")
}var T=YAHOO.util.Region.getRegion(Q).right-Y.right;
var ad=T+A;
YDom.addClass(document.body,"dialog-mask-active");
if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<7){var V=YDom.getClientRegion();
YDom.setStyle(w,"height",(V.bottom-V.top)+"px")
}}else{ab=YAHOO.util.Region.getRegion(w);
var aa=parseInt(YDom.getStyle(W,"width"),10);
YDom.setStyle(Q,"left",(h()-aa)/2+"px");
YDom.setStyle(Q,"top",YDom.getDocumentScrollTop()+105+"px");
if(f.autoSize.match(S.type)){YDom.addClass(Q,"auto-size")
}else{YDom.removeClass(Q,"auto-size")
}if(f.dragNDrop.match(S.type)){C()
}}YEvent.on(window,"resize",m);
j.fire(U,S.name,S.extra);
if(YDom.getLastChild(document.body)!==Q){document.body.appendChild(document.body.removeChild(Q))
}if(!H.showOnlyWhenReady){YDom.setStyle(w,"visibility","")
}t.enable();
if(f.timeout.match(S.type)){D=setTimeout(function(){J("timer")
},2000)
}if(f.docClick.match(S.type)){YEvent.on(document,"click",J);
q=true
}if((YAHOO.env.ua.ie===6)&&(S.type==="task-modal"||S.type==="interrupt")){document.location.href="#header"
}if(ac!==null){if(S.stopEvent){YEvent.stopEvent(ac)
}else{YEvent.preventDefault(ac)
}}r.fire(U,S.name,S.extra);
if(S.webtrack&&S.webtrack.key&&typeof(WebTracking)!=="undefined"){WebTracking.trackUserAction(S.webtrack.key,S.webtrack.val)
}if(Z){e=Z
}s();
if(S.type==="task-modal"){YEvent.addListener(document,"focus",G)
}}function G(Q){YEvent.stopEvent(Q);
var R=YEvent.getTarget(Q);
if(!YDom.isAncestor(w,R)){w.focus()
}}function s(){if(!w){return
}YDom.setAttribute(w,"aria-labelledby","li-dialog-aria-label");
w.tabIndex=-1;
w.focus()
}function L(){var Q=YDom.getFirstChild(Y$(".dialog-content",w,true));
if(!Q){return
}if(YDom.inDocument(I)){I.parentNode.replaceChild(Q,I)
}else{if(H.content&&(H.content.url||H.content.dustDataUrl)){E[H.content.url||H.content.dustDataUrl]=Q.parentNode.removeChild(Q)
}}}function K(R,Q,S){S=S||Y$(".dialog-message",w,true);
Q=(Q)?Q:"attention";
S.innerHTML="<p>"+(R)+"</p>";
YDom.addClass(S,"alert");
YDom.removeClass(S,"attention");
YDom.removeClass(S,"success");
YDom.removeClass(S,"error");
YDom.addClass(S,Q);
YDom.setStyle(S,"display","")
}function l(Q){Q=Q||Y$(".dialog-message",w,true);
if(Q){Q.innerHTML="";
LI.hide(Q)
}}function u(R){var X=(R&&R.content)?R.content:{};
var Q=Y$(".dialog-body",w,true);
if(R.dependencies){i(R)
}else{if((X.url&&(!X.useCache||!E[X.url]))||(X.dustDataUrl&&(!X.useCache||!E[X.dustDataUrl]))){var S=Y$(".dialog-content",w,true);
if(S){S.innerHTML=""
}YDom.addClass(Q,"dialog-body-loading");
if(X.url){v(X.url)
}else{if(X.dustDataUrl){o(X.dustDataUrl,X.dustTemplate)
}}}else{if(X.dustData){N(X.dustData,X.dustTemplate)
}else{if(X.attentionMsg||X.successMsg||X.node||X.html||(X.useCache&&X.url&&E[X.url])||(X.useCache&&X.dustDataUrl&&E[X.dustDataUrl])){var V=function(ad){var af=Y$(".dialog-message",ad,true);
var ae=Y$(".dialog-content",ad,true);
var aa=YDom.getNextSibling(ae);
var ac;
YDom.setStyle([af,ae,aa],"display","none");
if(X.attentionMsg||X.successMsg){ae.innerHTML="";
K((X.attentionMsg||X.successMsg),((X.successMsg)?"success":"attention"),af)
}if(X.node){var ab=YDom.get(X.node);
ab.parentNode.replaceChild(I,ab);
ae.innerHTML="";
ae.appendChild(ab);
YDom.setStyle(ae,"display","")
}else{if(X.html){ae.innerHTML=X.html;
YDom.setStyle(ae,"display","")
}else{if(X.useCache&&X.url&&E[X.url]){ae.innerHTML="";
ae.appendChild(E[X.url]);
YDom.setStyle(ae,"display","")
}}}if(R.content&&(R.content.submitButton||R.content.closeMessage)){YDom.setStyle(aa,"display","")
}LI.Controls.parseFragment(Q);
ac=Y$("iframe",ae);
if(ac.length){LI.show(ac)
}B.fire(H.name,H.extra)
};
var Z=P(R);
var U=YDom.inDocument("dialog-wrapper");
var T=Q.cloneNode(true);
var W=Q.parentNode;
var Y=YDom.getStyle(Q,"height");
YDom.setStyle(Q,"height",Y);
L();
YDom.setStyle(Q,"height","");
Q.innerHTML=Z;
V(Q)
}}}}}function i(V){var X=V.dependencies;
if(typeof X==="string"){X=LI.Controls.resolveName(X)
}if(!X){return
}var Q=(X.jsFiles===undefined),W=(X.cssFiles===undefined),S;
var U=Y$(".dialog-body",w,true);
YDom.addClass(U,"dialog-body-loading");
var T=function(){if(S){return
}if(Q&&W){S=true;
YDom.removeClass(U,"dialog-body-loading");
delete V.dependencies;
u(V)
}};
var R=function(){var Y=['<div class="dialog-container interrupt">','<div class="alert attention"><p><strong>'+LI.i18n.get("Dialog-error-generic")+"</strong></p></div>","</div>"].join(" ");
u({name:V.name,content:{html:Y,closeMessage:true}})
};
if(!Q||!W){if(!Q){YAHOO.util.Get.script(X.jsFiles,{onSuccess:function(){Q=true;
T()
},onFailure:function(){R()
},timeout:1000})
}if(!W){YAHOO.util.Get.css(X.cssFiles,{onSuccess:function(){W=true;
T()
},onFailure:function(){R()
},timeout:1000})
}}else{T()
}}return{contentChangeEvent:B,close:function(){J("selfClose")
},closeEvent:p,open:function(){var Q,R;
if(arguments.length===1){Q=null;
R=arguments[0]
}else{Q=arguments[0];
R=arguments[1]
}M(Q,R)
},openEvent:r,beforeOpenEvent:j,submitEvent:z,swapEvent:n,swap:function(R){var Q=(H&&H.name)?H.name:"";
l();
u(R);
if(H){n.fire("",Q,H.extra)
}},injectAlert:K,removeAlert:l,handlesOwnLazyLoading:true}
}}());
YAHOO.register("LI.Dialog",LI.Dialog,{});LI.define("FrontierAJAXForm");
LI.FrontierAJAXForm=function(c,e){e=e||{};
e.backgroundColor=e.backgoundColor||"#fff";
e.injectAfter=e.injectAfter||".actions .btn-primary";
e.enableAJAX=(e.enableAJAX!==false)?true:false;
e.enableDemo=e.enableDemo||false;
e.errorId=e.errorId||YDom.generateId();
e.useGlobalError=e.useGlobalError||false;
e.injectGlobalError=(e.injectGlobalError!=="undefined"&&e.injectGlobalError===false)?false:true;
e.injectGlobalErrorOnly=e.injectGlobalErrorOnly||false;
e.successCallback=e.successCallback||null;
e.successCallbackScope=e.successCallbackScope||window;
e.exceptionCallback=e.exceptionCallback||null;
e.errorCallback=e.errorCallback||null;
e.failureCallback=e.failureCallback||null;
e.failureCallbackScope=e.failureCallbackScope||window;
e.scrollIntoViewOnError=(e.scrollIntoViewOnError!==undefined)?e.scrollIntoViewOnError:true;
e.showCloseInError=(e.showCloseInError!==undefined)?e.showCloseInError:false;
e.successParameters=(e.successParameters!==undefined)?e.successParameters:{};
e.addProgressIndicator=(e.addProgressIndicator!==undefined)?e.addProgressIndicator:true;
e.enableResizeScreen=(e.enableResizeScreen!==undefined)?e.enableResizeScreen:true;
if(e.useGlobalError){e.errorId="global-error"
}var b=this;
var j=YDom.getRegion(c);
var l=16;
b.successHandlers=[];
b.failureHandlers=[];
var f=Y$(e.injectAfter,c,true);
var k=f;
if(k){while(k.nextSibling){if(k.nextSibling.nodeType===1){YDom.addClass(k.nextSibling,"hidden")
}k=k.nextSibling
}}var o=document.createElement("div");
YDom.addClass(o,"screen");
c.appendChild(o);
if(e.addProgressIndicator){var g=document.createElement("div");
var n=YDom.getRegion(f).height;
n=(n>l)?n:l;
if(f){if(f.nextSibling){f.parentNode.insertBefore(g,f.nextSibling)
}else{f.parentNode.appendChild(g)
}}YDom.addClass(g,"progress-indicator");
YDom.setStyle(g,"lineHeight",n+"px")
}var a=function(r){var q=YDom.get(e.errorId);
if(!q){q=document.createElement("div");
q.id=e.errorId;
c.parentNode.insertBefore(q,c)
}LI.injectAlert(r,"error",q,false,e.showCloseInError);
if(e.scrollIntoViewOnError){q.scrollIntoView()
}};
var m=function(){YDom.removeClass(c,"form-submit-processing");
YDom.removeClass(f,"disabled");
YDom.setStyle(o,"display","none")
};
var d=function(){var q=YDom.getRegion(c);
if(!j||!j.width){j=YDom.getRegion(c)
}YDom.setStyle(o,"width",j.width+"px");
YDom.setStyle(o,"height",q.height+"px");
YDom.setStyle(o,"margin-top",(q.height*-1)+"px")
};
var i=function(q){location.href=q
};
var p=function(t){if(YDom.hasClass(c,"form-submit-processing")){return
}YDom.addClass(c,"form-submit-processing");
YDom.addClass(f,"disabled");
var s=YDom.getRegion(c);
YDom.setStyle(o,"backgroundColor",e.backgroundColor);
YDom.setStyle(o,"display","block");
if(e.enableResizeScreen){d()
}var q=document.createElement("input");
YDom.setStyle(q,"opacity",0);
YDom.setStyle(q,"height","1px");
YDom.setStyle(q,"width","1px");
YDom.setStyle(q,"display","inline");
c.appendChild(q);
q.focus();
c.removeChild(q);
delete (q);
if(e.enableDemo){if(t){YEvent.stopEvent(t)
}var r=(e.enableDemo=="success")?LI.FrontierAJAXForm.DEMO_SUCCESS:LI.FrontierAJAXForm.DEMO_FAILURE;
b.handleFormSuccess=i;
b.injectGlobalFormError=a;
b.markFormErrors=markFormErrors;
b.resetFormSubmission=m;
window.setTimeout(function(){r.call(b)
},5000);
return false
}if(e.enableAJAX){if(t){YEvent.preventDefault(t)
}window.setTimeout(function(){h()
},1);
return false
}};
var h=function(){YAHOO.util.Connect.setForm(c);
LI.asyncRequest("POST",YDom.getAttribute(c,"action"),{custom:{error:function(q){LI.removeAlert();
if(e.injectGlobalError||e.injectGlobalErrorOnly){if(q.globalError){a(q.globalError)
}else{if(!e.injectGlobalErrorOnly){a(LI.i18n.get("oneOrMoreErrors"))
}}}if(e.errorCallback){e.errorCallback(q)
}m();
if(e.enableResizeScreen){d()
}},exception:function(){if(e.exceptionCallback){e.exceptionCallback()
}}},success:function(t){t.successParameters=e.successParameters;
for(var r=0,q=b.successHandlers.length;
r<q;
r++){var s=b.successHandlers[r];
s.fn.call(s.scope,t)
}},failure:function(t){for(var r=0,q=b.failureHandlers.length;
r<q;
r++){var s=b.failureHandlers[r];
s.fn.call(s.scope,t)
}},timeout:25000})
};
this.addSuccessHandler=function(r,q){b.successHandlers.push({fn:r||function(){},scope:q||window})
};
this.addFailureHandler=function(r,q){b.failureHandlers.push({fn:r||function(){},scope:q||window})
};
if(e.successCallback){e.successCallback=(typeof(e.successCallback)=="string")?LI.Controls.resolveName(e.successCallback):e.successCallback;
if(!e.successCallback){throw new Error(e.successCallback+" is not defined")
}this.addSuccessHandler(e.successCallback,e.successCallbackScope)
}if(e.failureCallback){this.addFailureHandler(e.failureCallback,e.failureCallbackScope)
}this.resetFormSubmit=m;
this.submitForm=p;
YEvent.on(c,"submit",p)
};LI.Feedback=function(e,c){c=c||{};
c.id=c.id||"feedback_info";
c.containerId=c.containerId||"feedback-form";
function d(){LI.Dialog().closeEvent.unsubscribe(d)
}function a(){LI.hide(c.containerId);
LI.show("feedback-success");
LI.Dialog().closeEvent.subscribe(d)
}LI.Dialog().contentChangeEvent.subscribe(function(g,i){var f=i[1];
if(i[0]!="feedback-dialog"){return
}if(f&&f.feedbackSubjectLine){var h=YDom.get("subject-feedbackInfoForm");
h.value=YAHOO.lang.trim(f.feedbackSubjectLine)
}});
var b=LI.Controls.getControl(c.id,"FrontierAJAXForm");
if(b){b.addSuccessHandler(function(){a()
})
}};LI.define("ResponsiveNavEventsSub");
LI.ResponsiveNavEventsSub=function(a){return LI.ResponsiveNavEventsSub.prototype.getInstance(a)
};
LI.ResponsiveNavEventsSub.prototype.getInstance=function(a){if(!LI.ResponsiveNavEventsSub.prototype.singleton){LI.ResponsiveNavEventsSub.prototype.singleton=this;
this.init(a)
}return LI.ResponsiveNavEventsSub.prototype.singleton
};
LI.ResponsiveNavEventsSub.prototype.init=function(g){var h=["globalnav:show","globalnav:hide","globalnav:showStart","globalnav:hideStart","globalnav:showStop","globalnav:hideStop"],b="chrome-v5-retract-nav-enabled",d,a;
function f(i){return i.replace(":","-")
}function c(){for(d=0,a=h.length;
d<a;
d++){YDom.removeClass(g,f(h[d]))
}}function e(i){c();
YDom.addClass(g,f(i.name))
}if(YDom.hasClass(document.body,b)){for(d=0,a=h.length;
d<a;
d++){if(LI.Events&&LI.Events.bind){LI.Events.bind(h[d],e)
}}}};
YEvent.onDOMReady(function(){LI.ResponsiveNavEventsSub(YDom.get("body"))
});(function(m,o,c){var b=YDom.get("header"),d=o.body,l="position",a="fixed",n=false,f=null,k=10;
if(!b&&(YDom.getStyle(b,l)===a)){return n
}function h(){var p=parseInt(YDom.getStyle(b,"height"),10),q=(parseInt(YDom.getStyle(b,"margin-bottom"),10)===0)?k:parseInt(YDom.getStyle(b,"margin-bottom"),10);
return(p+q)
}function i(){if(!m.location.hash){return f
}return m.location.hash.substr(1)
}function g(p){if(!p.href&&p.href.indexOf("#")<=0){return f
}return p.href.substr(p.href.indexOf("#")+1)
}function e(q){var r,p;
if(!YDom.get(q)){return n
}r=YDom.getY(YDom.get(q));
p=r-h();
m.scroll(0,p)
}function j(){YEvent.on(d,"click",function(p){var v=YEvent.getTarget(p),t=null,q,u,s,w,r;
if(v.tagName.toLowerCase()!=="a"){t=YDom.getAncestorByTagName(v,"a");
if(t){v=t
}else{return
}}q=v.href;
u=q.indexOf("#")>0;
s=q.indexOf(location.pathname)>0;
w=g(v);
r=p.defaultPrevented||(p.returnValue===false)||(p.getPreventDefault&&p.getPreventDefault());
if(q&&u&&s&&YDom.get(w)&&!r){YEvent.preventDefault(p);
e(w)
}})
}YEvent.onDOMReady(function(){if(i()!==f){e(i())
}j()
})
}(this,this.document));var langSwitch=function(){var c;
function b(){var j;
var g=YDom.get("nav-utility-lang");
var h=g.getElementsByTagName("a");
YEvent.on(g,"click",function(){var i=this;
if(YDom.hasClass(i,"hover")){return
}j=setTimeout(function(){YDom.addClass(i,"hover")
},0)
});
YEvent.on(g,"mouseout",function(k){var l=this;
var i=YEvent.getRelatedTarget(k);
if(l!=i&&!YDom.isAncestor(l,i)){YDom.removeClass(l,"hover")
}clearTimeout(j)
});
h[0].onclick=function(){return false
};
var d=YDom.get("lang-list");
var f=d.getElementsByTagName("a");
for(var e=0;
f.length>e;
e++){f[e].onclick=function(){a(this.lang);
return false
}
}}function a(d){c.i18nLang.value=d;
c.submit()
}return{init:function(){if(!document.languageSelectorForm){return false
}c=document.languageSelectorForm;
b()
}}
}();
YEvent.on(window,"load",langSwitch.init);LI.QuickHelpManager={startTour:function(c,b,a){if(typeof c==="string"){this.qh.initiateTour(c,b,a)
}else{this.qh.registerTour(c);
this.qh.initiateTour(c.id,b)
}},tourRunning:function(){return !!this.qh.getState(this.qh.cookieName)
},loadHopscotch:function(b,a){this.qh.loadHopscotch(b,a)
},isReady:function(){return(typeof this.qh!=="undefined")
},_register:function(a){this.qh=a;
LI.Events.fire("QuickHelpRegistered")
}};
LI.define("QuickHelp2");
LI.QuickHelp2=function(ag,U){var ac={},l=[],O="undefined",e="help-center",j="quick-help",N="act-set-name",d="qh-page-tours",an="hopscotch-bubble-arrow-container",aa="hopscotch-bubble",z="hopscotch-bubble-content",D="hopscotch-bubble-container",I=YDom.getAncestorByClassName(ag,e),B=Y$("."+N,I,true),J=Y$("."+d,ag,true),u=(typeof window.sessionStorage!==O),P=LI.getPageKey(),F=false,t=false,T=false,ai=false,Q=(typeof JSON!==O?JSON.parse:YAHOO.lang.JSON.parse),H="li_hs",m="hide",s=240,y=320,f,n,ab,o=false,i,am,E,ak,A,ap="done-state",M,r,aj,V,k,W,h,al=function(){var ar=[],aw=hopscotch.getCurrTour().relatedTours,ax,ay,aA,av,aB,aq,aD,au,aC,at,az;
if(!aw&&am){aw=[];
for(ax in am){if(ax!==ak.id&&E["quickhelp_"+ax]==="show"){aw.push(ax)
}}}if(aw&&aw.length){for(ay=0,aA=aw.length;
ay<aA;
++ay){ax=aw[ay];
av=am[ax];
if(av&&E["quickhelp_"+ax]){ar.push(av)
}}}aB=ah(H+"-origin-page");
if(aB){aq=aB.lastIndexOf("::");
aD=aB.substring(aq+2);
aB=aB.substring(0,aq)
}if(ar.length&&(k<y)){az=y
}else{if(k<s){az=s
}else{az=k
}}dust.render("tl/apps/chrome/quickhelp/embed/done_state",{topics:ar,originPage:aB,i18n_tour_complete:LI.i18n.get("QuickHelp-tour-complete"),i18n_related_tours:LI.i18n.get("QuickHelp-related-tours"),i18n_go_back:LI.i18n.get("QuickHelp-go-back")},function(aF,aE){A=hopscotch.getCalloutManager();
A.createCallout({id:ap,target:"main-search-box",orientation:"bottom",showNavButtons:false,showNumber:false,fixedElement:true,width:az,height:160,bubblePadding:0,zindex:10001});
M=A.getCallout(ap);
au=M.element;
aC=Y$("."+z,au,true);
aC.innerHTML=aE;
YDom.addClass(au,"quickhelp-tour-done");
YDom.setStyle(au,"top",r);
YDom.setStyle(au,"left",aj);
YDom.setStyle(au,"position",V);
at=Y$("."+an,au,true);
at.className=W;
YDom.setStyle(at,"left",h);
YEvent.on(au,"click",S)
})
},x=function(){var at=Y$("."+aa,null,true),ar=Y$("."+D,at,true),aq=Y$("."+an,at,true);
r=YDom.getStyle(at,"top");
aj=YDom.getStyle(at,"left");
V=YDom.getStyle(at,"position");
k=YDom.getStyle(ar,"width");
W=aq.className;
h=YDom.getStyle(aq,"left")
},Z=function(){var at,aq,ar,av,au;
for(at=0,aq=l.length;
at<aq;
at++){ar=l[at];
av=ar.callback;
au=ar.scope;
if(au){av.call(au)
}else{av.call(window)
}}l=[]
},C=function(){hopscotch.configure({onEnd:al,onShow:x,bubblePadding:0,i18n:{nextBtn:LI.i18n.get("QuickHelp-next"),prevBtn:LI.i18n.get("QuickHelp-prev"),closeTooltip:LI.i18n.get("QuickHelp-close"),skipBtn:LI.i18n.get("QuickHelp-skip"),doneBtn:LI.i18n.get("QuickHelp-done")}}).setCookieName(H);
if(n){R(n);
n=null
}Z()
},p=function(at,aq){var ar;
if(at&&typeof at==="function"){l.push({callback:at,scope:aq})
}if(!window.hopscotch&&!T){T=true;
ar=U.dependencies;
YUtil.Get.script(ar.jsFiles,{onSuccess:C});
YUtil.Get.css(ar.cssFiles)
}else{if(window.hopscotch){ar=U.dependencies;
YUtil.Get.script(ar.helpers);
C()
}}},q=function(at,ar){var aq={success:function(av){var au;
if(av.statusText==="OK"&&av.responseText){au=Q(av.responseText);
if(au.status==="ok"&&au.content&&au.content["lite-lix-result"]){ar(au.content["lite-lix-result"])
}}}};
YUtil.Connect.asyncRequest("POST",U.lixResultUrl,aq,"keys="+at.join(","))
},b=function(ax,ay,at){var av=false,aw=false,az=false,aq=LI.JSContentBasePath+"&f="+ay,au,ar;
ar=function(){if(av&&aw){dust.render(ay,au.content,at)
}};
YUtil.Connect.asyncRequest("GET",ax,{success:function(aA){if(aA&&aA.responseText){av=true;
au=Q(aA.responseText);
ar()
}else{if(!az&&(typeof at==="function")){az=true;
at({message:"No data returned."})
}}},failure:function(){if(!az&&(typeof at==="function")){az=true;
at({message:"No data returned."})
}}});
YUtil.Get.script(aq,{onSuccess:function(){aw=true;
ar()
},onFailure:function(){if(!az&&(typeof at==="function")){az=true;
at({message:"Failed to load tour catalog."})
}},onTimeout:function(){if(!az&&(typeof at==="function")){az=true;
at({message:"Tour catalog timed out."})
}}})
},g=function(ar){var aq=[],at,av,au;
at=Q(ar);
if(!am){am={}
}for(au in at){am[au]=at[au];
aq.push("quickhelp_"+au)
}q(aq,function(aw){E=aw;
a(aw);
av=Y$(".loading",ag,true);
YDom.addClass(av,m)
})
},af=function(au,aq){var at=(au||U.product),ar="tl/apps/chrome/quickhelp/catalogs/"+at,av=U.catalogUrls[at];
if(!F&&!t){if(!at||!av){L();
return
}t=true;
b(av,ar,function(ax,aw){t=false;
F=true;
if(ax){L();
return
}g(aw);
if(typeof aq==="function"){aq()
}});
p()
}else{if(F&&!t&&au){t=true;
b(av,ar,function(ax,aw){t=false;
if(ax){return
}g(aw);
if(typeof aq==="function"){aq()
}})
}}},w=function(aq){if(ac&&ac[aq]){R(ac[aq])
}else{if(am&&am[aq]){v(aq,am[aq].dataUrl)
}else{af(null,function(){v(aq,am[aq].dataUrl)
})
}}},v=function(au,ar){var at=au.substring(0,au.indexOf("_")),aq=["tl/apps/chrome/quickhelp/tours",at,au].join("/");
b(ar,aq,function(ax,av){var aw;
if(ax){c();
return
}av=av.replace(/(\\')/g,"'").replace(/(\\\/)/g,"/").replace(/(\\&)/g,"&");
aw=Q(av);
if(aw){ac[au]=aw;
if(!window.hopscotch){n=aw
}else{R(aw)
}}c()
})
},c=function(){t=false;
YDom.removeClass(Y$("."+d+" .loading",ag,true),"loading")
},Y=function(aw,av){var at,aq,au,ar="*";
au=am[aw].pagekeys;
if(!au||!au.length){return false
}if((typeof au[0]!=="string")&&(au.length>=av)){au=au[av]
}for(at=0,aq=au.length;
at<aq;
++at){if(au[at]===P||au[at]===ar){return true
}}return false
},G=function(av,at){var ar=am[av],au,aq;
ad(H,av+":"+at,1);
if(typeof ar.pageUrl!=="string"){if(ar.pageUrl.length>=at){au=ar.pageUrl[at]
}else{au=ar.pageUrl[0];
ad(H,av+":0",1)
}}else{au=ar.pageUrl
}if(i&&(au.indexOf("?")!==-1)){if(au.indexOf("trk=")!==-1&&i){aq=au.replace(/(&|\?)trk=[^&]*/i,"$1trk="+i+"&");
window.location.href=aq
}else{window.location.href=au+"&trk="+i
}}else{if(i){window.location.href=au+"?trk="+i
}else{window.location.href=au
}}},S=function(aA){var ax=YEvent.getTarget(aA),au=ax.className,aw=ax.parentNode,at,av,ay,az,ar,aB,aq;
if(ax.nodeName==="A"||(aw&&aw.nodeName==="A")){at=aw?aw.className:"";
if(au.indexOf("qh-tour-link")>=0&&!t){hopscotch.endTour(true,false);
if(M){A.removeCallout(ap)
}t=true;
av=ax.getAttribute("data-hs-id");
YDom.addClass(YDom.getAncestorByTagName(ax,"li"),"loading");
X(av,"qhmenu");
YEvent.preventDefault(aA)
}}else{if(au.indexOf("qh-back-to-start")>=0||aw.className.indexOf("qh-back-to-start")>=0){if(M){A.removeCallout(ap)
}ay=ah(H+"-origin-page");
if(ay){ar=ay.lastIndexOf("::");
az=ay.substring(ar+2);
ay=ay.substring(0,ar);
hopscotch.endTour(true,false);
if(ay&&window.location.href!==ay){window.location.href=ay
}else{aB=YAHOO.env.ua.webkit?document.body:document.documentElement;
aq=new YAHOO.util.Scroll(aB,{scroll:{to:[0,az]}},1,YAHOO.util.Easing.easeOut);
aq.animate();
hopscotch.endTour(true,false)
}}else{hopscotch.endTour(true,false)
}}}},K=function(){YDom.removeClass(I,e);
YDom.addClass(I,j);
f=B.innerHTML;
B.innerHTML=U.helpCenterTourText
},L=function(){var aq;
YDom.removeClass(I,j);
YDom.addClass(I,e);
B.innerHTML=f;
aq=Y$(".loading",ag,true);
YDom.addClass(aq,m)
},a=function(aq){var ar=[],at;
if(!am){L();
return
}for(at in am){if(aq["quickhelp_"+at]==="show"){ar.push(am[at])
}}if(!ar.length){L()
}dust.render("tl/apps/chrome/quickhelp/embed/tour_list",{topics:ar},function(av,au){J.innerHTML=au
})
},ah=function(ar){var au=ar+"=",aq,at,av;
if(u){return sessionStorage.getItem(ar)
}else{aq=document.cookie.split(";");
for(at=0;
at<aq.length;
at++){av=aq[at];
while(av.charAt(0)===" "){av=av.substring(1,av.length)
}if(av.indexOf(au)===0){return av.substring(au.length,av.length)
}}}},ad=function(at,au,av){var aq="",ar;
if(u){sessionStorage.setItem(at,au)
}else{if(av){ar=new Date();
ar.setTime(ar.getTime()+(av*24*60*60*1000));
aq="; expires="+ar.toGMTString()
}document.cookie=at+"="+au+aq+"; path=/"
}},ao=function(){var aq=ah(H),at,ar;
if(aq){at=aq.split(":");
ar=ah(H+"-data-url");
o=true;
if(ar){p();
v(at[0],ar);
af();
return
}af(null,function(){w(at[0])
})
}},R=function(aq){ak=aq;
if(!hopscotch){return
}if(!o&&WebTracking&&i){WebTracking.trackUserAction(i)
}function ar(){ai=false;
o=false;
c();
hopscotch.setCookieName(H);
if(ab){hopscotch.startTour(aq,ab)
}else{hopscotch.startTour(aq)
}}if(ak.hasHelpers){YUtil.Get.script(LI.JSContentBasePath+"&f=scripts/apps/chrome/quickhelp/"+ak.id+"_helpers",{onSuccess:ar})
}else{ar()
}},ae=function(){K();
YEvent.on(Y$("."+j),"click",S,null,this);
ao();
LI.QuickHelpManager._register(this);
U.catalogUrl=decodeURIComponent(U.catalogUrl);
af()
},X=function(av,au,ar){var at,aq;
ar=ar||0;
if(!am||!am[av]){af(av.substring(0,av.indexOf("_")),function(){X(av,au,ar)
})
}else{if(am[av]){ad(H+"-data-url",am[av].dataUrl,1);
at=(typeof window.pageYOffset!==O?window.pageYOffset:document.documentElement.scrollTop);
aq=am[av].goBackUrl?am[av].goBackUrl:window.location.href;
ad(H+"-origin-page",aq+"::"+at,1);
if(am[av].trkCode){if(au){i=am[av].trkCode+"-"+au
}else{i=am[av].trkCode
}}if(hopscotch.getCurrTour()!==null){hopscotch.endTour(true,false)
}if(Y(av,ar)){ab=ar;
w(av)
}else{G(av,ar)
}}}};
this.initiateTour=X;
this.loadHopscotch=p;
this.getState=ah;
this.cookieName=H;
this.registerTour=function(aq){ac[aq.id]=aq;
if(!am){am={}
}am[aq.id]={id:aq.id,title:aq.title};
dust.render("tl/shared/quickhelp/embed/tour_list",{topics:[aq]},function(at,ar){J.innerHTML+=ar
})
};
ae.call(this)
};(function(){dust.register("tl/apps/chrome/quickhelp/embed/tour_list",b);
function b(d,c){return d.section(c.get("topics"),c,{"block":a},null)
}function a(d,c){return d.write('<li><a class="qh-tour-link" href="#" data-hs-id="').reference(c.get("id"),c,"h").write('" data-hs-url="').reference(c.get("dataUrl"),c,"h").write('">').reference(c.get("title"),c,"h").write("</a></li>")
}return b
})();
(function(){dust.register("tour_list",dust.cache["tl/apps/chrome/quickhelp/embed/tour_list"])
})();(function(){dust.register("tl/apps/chrome/quickhelp/embed/done_state",b);
function b(d,c){return d.write('<span class="done-icon"></span><div class="tour-complete-content"><h2 class="tour-complete-head">').reference(c.get("i18n_tour_complete"),c,"h").write("</h2>").exists(c.get("topics"),c,{"block":a},null).write('<div  class="go-back"><span class="qh-arrow left"></span><a href="').reference(c.get("originPage"),c,"h").write('">').reference(c.get("i18n_go_back"),c,"h").write("</a></div></div>")
}function a(d,c){return d.write('<div class="related-tours"><h3>').reference(c.get("i18n_related_tours"),c,"h").write('</h3><ul class="related-tours-list">').partial("tl/apps/chrome/quickhelp/embed/tour_list",c,null).write("</ul></div>")
}return b
})();
(function(){dust.register("done_state",dust.cache["tl/apps/chrome/quickhelp/embed/done_state"])
})();