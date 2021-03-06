LI.define("NMP.Constants");
LI.NMP.Constants.NEW_ORDER_SAVE_KEY="newOrder";
LI.NMP.Constants.OLD_ORDER_SAVE_KEY="oldOrder";
LI.NMP.Constants.COLLAPSABLE_CLASS="collapsable";
LI.NMP.Constants.IS_COLLAPSED_CLASS="collapsed";
LI.NMP.Constants.COLLAPSE_HANDLE_CLASS="collapse-handle";
LI.NMP.Constants.COLLAPSE_HANDLE_HOVER_CLASS="collapse-handle-hover";
LI.NMP.Constants.MODULE_FORM_ID="inAppsOrder";
LI.NMP.Constants.MODULE_FORM_ORDER_KEY="order";
LI.NMP.Constants.MODULE_FORM_TRANSACTION_KEY="txID";
LI.NMP.Constants.MODULE_FORM_DELETED_APP_KEY="deleteAppId";
LI.NMP.Constants.MODULE_FORM_DELETED_INSTALL_KEY="deleteInstallId";
LI.NMP.Constants.MODULE_FORM_DELETED_APP_TYPE="deleteAppType";
if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NMPConstants.js")
};if(lui!=null&&lui.goback==null){Lui.GoBack={};Lui.GoBack.GOBACK="goback";lui.goback=function(){if (LI.__HPA === true) {console.info( 'HOMEPAGE_PERFORMANCE_ANALYSIS :: lib/lui/linkedin_goback-min.js');}var N="jsstate";var C="placeholder";var O="goback";var D={};var Q=new Lui.Url(window.location.href);var L=null;var K=[];function R(T,Y){var Z=T+(Y?"Secure":"");var V=D[Z];if(V!=null){return V}var X=YDom.get(Z);if(X==null){return""}var W="file://";var U=X.href;if(U.toLowerCase().indexOf(W)==0){U=U.substring(W.length)}V=new Lui.Url(U);D[Z]=V;return V}function S(T,V){if(V!=null){var W;if(M(T)){W=V.getPath().replace(C,T.getPath(T.isSecure()))}else{W=T.getPath()}var U=[];if(V.hasParameters()){U.push(V.getParameterString())}if(T.hasParameters()){U.push(T.getParameterString())}if(U.length>0){W+="?"+U.join("&")}if(T.hasFragment()){W+="#"+T.getFragment()}return W}}function M(T){if(T instanceof Lui.Url){T=T.getPath()}return !new RegExp(/^\s*(http:|https:|ftp:|javascript:|mailto:|#)/ig).test(T)}function P(T){var U=new Lui.Url(T);var V=R("aGoBackTemplateLink",U.isSecure());return S(U,V)}function J(T){var U=new Lui.Url(T);var V=R("anogbGoBackTemplateLink",U.isSecure());return S(U,V)}function E(T){var U=new Lui.Url(T);U.appendParameter(N,G());var V=R("agbpushGoBackTemplateLink",U.isSecure());return S(U,V)}function H(T){T.href=lui.goback.agbpushHref(T.href);return true}function B(T){T.action=lui.goback.agbpushHref(T.action);return true}function G(){if(K.length==0){return""}var U=[];for(var T=0;T<K.length;T++){U.push(K[T].serializeState())}return U.join("")}function A(X,Y){if(X&&X instanceof Lui.GoBack.State){X[Lui.GoBack.State.PARAM_OBJ_ID]=Y;K.push(X);var W=Lui.Url.decode(Q.getParameterValueByKey(N));if(W!=null){if(L==null){L={};var V=W.split(".");V.shift();for(var U=0;U<V.length;U++){var T=V[U].split("_");L[T.shift()]=T.join("_")}}X.deserializeState(L[X[Lui.GoBack.State.PARAM_OBJ_ID]])}}}function I(){K=[];return this}function F(T){Q=new Lui.Url(T)}return{register:A,clearRegistry:I,checkUrl:M,aHref:P,anogbHref:J,agbpushHref:E,agbpushHrefOnclick:H,setUrl:F}}();Lui.GoBack.State=function(){};Lui.GoBack.State.PARAM_OBJ_ID="jsstateId";Lui.GoBack.State.prototype.serializeState=function(C){if(this[Lui.GoBack.State.PARAM_OBJ_ID]==null){var B="Unique id not set";throw B}var D=[];D.push(".");D.push(this[Lui.GoBack.State.PARAM_OBJ_ID]);if(C&&YAHOO.lang.isArray(C)&&C.length>0){for(var A=0;A<C.length;A++){D.push("_");D.push(Lui.GoBack.STRING_CODEC.encode(YAHOO.lang.trim(C[A])))}}return D.join("")};Lui.GoBack.State.prototype.deserializeState=function(B){if(B==null){return null}var C=(""+B).split("_");for(var A=0;A<C.length;A++){C[A]=Lui.GoBack.STRING_CODEC.decode(C[A])}return C};Lui.GoBack.StringCodec=function(B,C){if(YAHOO.lang.isUndefined(B)){B="*"}if(C==null||!YAHOO.lang.isArray(C)||C.length>7){throw"The array you provide must be not null, not empty, and contain less than 7 characters"}for(var A=0;A<C.length;A++){if(C[A]==B){throw"The characters you can encode must be different from the encoding character!"}if(C[A]>="0"&&C[A]<="9"){throw"The character you encode must not be one of '0'-'9'"}}if(B>="0"&&B<="9"){throw"The encoding character must not be one of '0'-'9'"}this._charactersToEncode=C;this._encodingChar=B;var D="0";this._encodedEncodingCharString=this._encodingChar+(D++);this._encodedNullString=this._encodingChar+(D++);this._encodedEmptyString=this._encodingChar+(D++);this._encodedCharsString=[];for(var A=0;A<C.length;A++){this._encodedCharsString.push(this._encodingChar+(D++))}};Lui.GoBack.StringCodec.prototype.encode=function(C){if(C==null){return this._encodedNullString}if(C.length==0){return this._encodedEmptyString}var E=[];var D;var A=C.length;mainloop:for(var B=0;B<A;B++){D=C.charAt(B);if(D==this._encodingChar){E.push(this._encodedEncodingCharString);continue}for(j=0;j<this._charactersToEncode.length;j++){if(D==this._charactersToEncode[j]){E.push(this._encodedCharsString[j]);continue mainloop}}E.push(D)}return E.join("")};Lui.GoBack.StringCodec.prototype.decode=function(D){if(D==null){return null}if(D==this._encodedNullString){return null}if(D==this._encodedEmptyString){return""}var H=[];var G;var B=D.length;var F=B-1;for(var C=0;C<B;C++){G=D.charAt(C);if(G==this._encodingChar){if(C==F){throw"Cannot decode exception: "+D}G=D.charAt(++C);if(G=="0"){H.push(this._encodingChar)}else{var A=G-"3";try{H.push(this._charactersToEncode[A])}catch(E){throw"Cannot decode exception: "+D}}}else{H.push(G)}}return H.join("")};Lui.GoBack.STRING_CODEC=new Lui.GoBack.StringCodec("*",[".","_","-"])};LI.define("ContactsFileUpload");
LI.ContactsFileUpload=function(c,b){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/apps/ContactsFileUpload.js")
}var b={fetchPermMediaIDURL:b.fetchPermMediaIDURL||null,checkStatusURL:b.checkStatusURL||null,displayImportedContactsToInviteURL:b.displayImportedContactsToInviteURL||null,progressMessage:b.progressMessage||null,fileUploadId:b.fileUploadId||null,proccessingIconUrl:b.proccessingIconUrl||"#"};
b.checkStatusReqCount=0;
b.processingIcon='<img src="'+b.proccessingIconUrl+'" alt="'+b.progressMessage+'" style="vertical-align:middle;" >';
var a=YDom.get("fileUploadForm");
YDom.get("uploadFileSubmit").disabled=true;
YEvent.on(b.fileUploadId,"click",function(){YDom.get("uploadFileSubmit").disabled=false;
YDom.get("upload_msg").innerHTML=""
});
YEvent.on("uploadFileSubmit","click",this.mediaUpload,b)
};
LI.ContactsFileUpload.prototype={displayMsg:function(b,a){if(a){LI.injectAlert(b,"success","upload_msg")
}else{LI.injectAlert(b,"error","upload_msg")
}},mediaUpload:function(evt,config){YEvent.preventDefault(evt);
if(YDom.get(config.fileUploadId).value==""){window.LI.ContactsFileUpload.prototype.displayMsg(LI.i18n.get("TEXT_NOFILE_ERROR"),false);
YDom.get("upload_progress").innerHTML=""
}else{YDom.get("upload_progress").innerHTML=config.processingIcon;
var form=YDom.get("fileUploadForm");
var isHttps=location.href.match(new RegExp("https://"));
YAHOO.util.Connect.setForm(form,true,isHttps);
YAHOO.util.Connect.asyncRequest("POST",form.action,{upload:function(o){var success=false;
var response=eval("("+o.responseText+")");
if(response!=null){var status=response.status;
if(status=="SUCCESS"){success=true;
var tempMediaID=response.value;
window.LI.ContactsFileUpload.prototype.fetchPermMediaID(config,tempMediaID)
}}if(!success){window.LI.ContactsFileUpload.prototype.displayMsg(LI.i18n.get("TEXT_FILEUPLOAD_ERROR"),false);
YDom.get("upload_progress").innerHTML=""
}}})
}},fetchPermMediaID:function(config,tempMediaID){window.LI.ContactsFileUpload.prototype.trackFileUpload();
var fetchPermMediaIDURL=config.fetchPermMediaIDURL+"&tempMediaID="+tempMediaID;
YAHOO.util.Connect.asyncRequest("GET",fetchPermMediaIDURL,{success:function(o){var status=o.responseXML.getElementsByTagName("responseInfo")[0].firstChild.nodeValue;
var message=null;
if(status=="SUCCESS"){var permMediaID=eval("("+o.responseXML.getElementsByTagName("jsonPayLoad")[0].firstChild.nodeValue+")").permMediaID;
window.LI.ContactsFileUpload.prototype.checkStatus(config,permMediaID)
}else{message=o.responseXML.getElementsByTagName("responseMsg")[0].firstChild.nodeValue;
window.LI.ContactsFileUpload.prototype.displayMsg(message,false);
YDom.get("upload_progress").innerHTML=""
}},failure:function(ex){window.LI.ContactsFileUpload.prototype.displayMsg(LI.i18n.get("TEXT_FILEUPLOAD_ERROR"),false);
YDom.get("upload_progress").innerHTML=""
},timeout:5000})
},checkStatus:function(config,permMediaID){YAHOO.util.Connect.asyncRequest("POST",config.checkStatusURL,{success:function(o){var status=o.responseXML.getElementsByTagName("responseInfo")[0].firstChild.nodeValue;
var message=null;
if(status=="SUCCESS"){var jsonPayload=eval("("+o.responseXML.getElementsByTagName("jsonPayLoad")[0].firstChild.nodeValue+")");
var flag=jsonPayload.flag;
switch(flag){case"success":window.LI.ContactsFileUpload.prototype.displayImportedContacts(config,jsonPayload.batchID);
break;
case"waiting":window.setTimeout(function(){window.LI.ContactsFileUpload.prototype.checkStatus(config,permMediaID)
},2000);
break;
case"timeout":message=o.responseXML.getElementsByTagName("responseMsg")[0].firstChild.nodeValue;
window.LI.ContactsFileUpload.prototype.displayMsg(message,true);
YDom.get("upload_progress").innerHTML="";
break
}}else{message=o.responseXML.getElementsByTagName("responseMsg")[0].firstChild.nodeValue;
window.LI.ContactsFileUpload.prototype.displayMsg(message,false);
YDom.get("upload_progress").innerHTML=""
}},failure:function(ex){window.LI.ContactsFileUpload.prototype.displayMsg(LI.i18n.get("TEXT_FILEUPLOAD_ERROR"),false);
YDom.get("upload_progress").innerHTML=""
},timeout:5000},"checkStatusReqCount="+config.checkStatusReqCount+++"&permMediaID="+permMediaID)
},displayImportedContacts:function(b,d){var c=YDom.getElementBy(function(e){return(e.name=="goback")?true:false
},"input","fileUploadForm");
var a=(c)?"&goback="+c.value:"";
YDom.get("upload_progress").innerHTML="";
window.location=b.displayImportedContactsToInviteURL+"&batchID="+d+a
},trackFileUpload:function(a){WebTracking.trackUserAction("abook_file_upload","")
}};(function(){var a=2,d=500,e=400,k="btn-menu-open",b="btn-split-toggle-hover",g="menu-btn-item-selected",c="click",l="mouseout",f="mouseover";
function h(q,p){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/SplitButton.js")
}var s,n,o,r,m;
if(!q){return
}this.listEl=r=YDom.getChildrenBy(q,function(t){return t.tagName=="UL"
})[0];
if(!r){return
}p=p||{};
YAHOO.lang.augmentObject(p,{tier:"quaternary",split:false,camo:true,showOnHover:false,appendMenuToDocumentBody:false,appendMenuToElement:false});
this.el=q;
this.config=p;
n="btn-"+p.tier;
s="btn-menu "+n;
if(p.split){s+=" btn-split"
}if(p.camo){s+=" btn-camo"
}this.buttonContainer=o=LI.domify('<span class="'+s+'"><span class="toggle-btn"></span></span>');
this.toggleEl=YDom.getFirstChild(o);
q.insertBefore(o,r);
LI.hide(r);
YDom.removeClass(YDom.getElementsByClassName(n,"",r),n);
m=YDom.getElementsByClassName(g,"li",r)[0]||YDom.getFirstChild(r);
this.setButtonEl(m);
YEvent.on(o,f,this._onMouseOver,this,true);
YEvent.on(o,l,this._onMouseOut,this,true);
YEvent.on(o,c,this._onClick,this,true)
}h.prototype={_onClick:function(m){var o=YEvent.getTarget(m),n=o;
if(!this.config.split||o!=this.buttonEl){YEvent.preventDefault(m);
if(!this.menu){this.initMenu()
}this.menu.setVisible(!this.menu.getVisible())
}},_onDocMouseOver:function(m){var o=YEvent.getTarget(m),n=this,p=n.menu,q=n.hideMenuTimer;
if(p){if(YDom.isAncestor(n.el,o)||YDom.isAncestor(p.getEl(),o)){if(q){window.clearTimeout(q);
n.hideMenuTimer=null
}}else{if(!q){n.hideMenuTimer=window.setTimeout(function(){p.setVisible(false);
YEvent.removeListener(document.body,f,n._onDocMouseOver);
n.hideMenuTimer=null
},e)
}}}},_onMenuItemClick:function(m){},_onMenuVisibleChange:function(n){var o=this.buttonContainer,q,p,m;
if(n.newValue){q=YDom.getRegion(o);
p=this.menu.el;
m=(this.config.split)?q.right-YDom.getRegion(p).width:q.left;
YDom.setXY(p,[m,q.bottom+a]);
YDom.addClass(o,k)
}else{YDom.removeClass(o,k)
}},_onMouseOut:function(m){var n=YEvent.getTarget(m);
if(this.config.split&&n!==this.buttonEl){YDom.removeClass(this.buttonContainer,b)
}if(this.showMenuTimer&&!YDom.isAncestor(this.el,n)){window.clearTimeout(this.showMenuTimer)
}},_onMouseOver:function(m){var o=YEvent.getTarget(m),n=this;
if(n.config.split&&o!==n.buttonEl){YDom.addClass(n.buttonContainer,b)
}if(n.config.showOnHover){if(!n.menu){n.initMenu()
}if(!n.menu.getVisible()&&!n.showMenuTimer){n.showMenuTimer=window.setTimeout(function(){n.menu.setVisible(true);
YEvent.on(document.body,f,n._onDocMouseOver,n,true);
n.showMenuTimer=null
},d)
}}},initMenu:function(){var n=this.listEl,m=(this.config.appendMenuToDocumentBody)?document.body:((this.config.appendMenuToElement)?this.config.appendMenuToElement:this.el);
LI.show(n);
m.appendChild(n);
this.menu=new j(n);
this.menu.subscribe("visibleChange",this._onMenuVisibleChange,this,true);
this.menu.subscribe("menuItemClick",this._onMenuItemClick,this,true)
},setButtonEl:function(q){var r=YDom.getFirstChild(q),p=(this.config.split)?r:r.cloneNode(true),n=this.buttonEl,m=this.config.split,o;
YDom.addClass(p,"btn");
if(m){YDom.addClass(p,"btn-"+this.config.tier)
}p.setAttribute("data-li-backref",YDom.generateId(q));
this.buttonContainer.insertBefore(p,this.toggleEl);
if(m){YDom.setStyle(q,"display","none")
}else{YDom.addClass(q,g)
}this.buttonEl=p;
if(n){YDom.removeClass(n,"btn");
if(m){YDom.removeClass(n,"btn-"+this.config.tier)
}o=YDom.get(n.getAttribute("data-li-backref"));
if(m){YDom.setStyle(o,"display","");
o.appendChild(n)
}else{YDom.removeClass(o,g);
n.parentNode.removeChild(n)
}}}};
function i(n,m){m={tier:m.type||"ternary",split:true,camo:false};
return new h(n,m)
}function j(n,m){this.el=n;
m=m||{};
this.config={closeonclick:m.closeonclick||true,visible:false};
YDom.addClass(n,"menu-btn drop");
this.createEvent("visibleChange");
this.createEvent("menuItemClick")
}j.prototype={_onDocClick:function(m){this.setVisible(false)
},_onClick:function(m){var p=YEvent.getTarget(m),o=p,n;
if(this.el!==p){while(o.parentNode!==this.el){o=o.parentNode
}n={el:o};
this.fireEvent("menuItemClick",n)
}},getEl:function(){return this.el
},getVisible:function(){return this.config.visible
},setVisible:function(o){var n,m;
if(o==this.getVisible()){return false
}if(o){YDom.setStyle(this.el,"visibility","visible");
if(this.config.closeonclick){n=this;
window.setTimeout(function(){YEvent.on(document.body,c,n._onDocClick,n,true);
YEvent.on(n.el,c,n._onClick,n,true)
},10)
}}else{YDom.setStyle(this.el,"visibility","hidden");
if(this.config.closeonclick){YEvent.removeListener(document.body,c,this._onDocClick);
YEvent.removeListener(this.el,c,this._onClick)
}}m={name:"visible",prevValue:this.config.visible,newValue:o};
this.config.visible=o;
this.fireEvent("visibleChange",m)
}};
YAHOO.lang.augmentProto(j,YAHOO.util.EventProvider);
LI.MenuButton=h;
LI.SplitButton=i
})();(function(){var d="load",b="scroll";
function c(){var e=YDom.get("feed-show-more"),f=YDom.get("nus-deferred-spinner");
if(e){YDom.removeClass(e,"feed-show-more-deferred")
}if(f){f.parentNode.removeChild(f)
}}function a(f,e){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusDeferredLoading.js")
}e=e||{};
this.nusList=YDom.getElementsByClassName("chron","ul",f)[0];
if(!this.nusList){return
}this.loaded=false;
this.nusUrl=e.nusUrl||null;
if(this.nusUrl){YEvent.on(window,b,this.load,this,true);
YEvent.on(window,d,this.load,this,true)
}else{c()
}}a.prototype={load:function(){if(this.loaded){return
}this.removeListeners();
this.loaded=true;
this.loadNus();
return true
},loadNus:function(){var e;
if(this.nusUrl){e={success:function(n){var m=YDom.getLastChild(this.nusList),g=n.responseText,k,l,h,j,f;
g=(!LI.isFullPage(g))?LI.domify("<ul>"+g+"</ul>"):null;
if(g){k=YDom.getChildren(g);
f=k.length;
for(j=0;
j<f;
++j){l=k[j];
h=l.cloneNode(false);
m.parentNode.insertBefore(h,m.nextSibling);
h.innerHTML=l.innerHTML;
LI.Controls.parseFragment(h);
LI.showAllDeferredImg(h);
m=h
}}c()
},failure:function(f){c()
},scope:this};
YAHOO.util.Connect.asyncRequest("GET",this.nusUrl,e)
}},removeListeners:function(){YEvent.removeListener(window,b,this.load);
YEvent.removeListener(window,d,this.load)
}};
LI.NusDeferredLoading=a
})();YAHOO.util.History=(function(){var c=null;var l=null;var g=false;var d=[];var b=[];function j(){var n,m;m=self.location.href;n=m.indexOf("#");return n>=0?m.substr(n+1):null}function a(){var n,o,p=[],m=[];for(n in d){if(YAHOO.lang.hasOwnProperty(d,n)){o=d[n];p.push(n+"="+o.initialState);m.push(n+"="+o.currentState)}}l.value=p.join("&")+"|"+m.join("&");if(YAHOO.env.ua.webkit){l.value+="|"+b.join(",")}}function i(m){var r,s,n,p,q,u,t,o;if(!m){for(n in d){if(YAHOO.lang.hasOwnProperty(d,n)){p=d[n];p.currentState=p.initialState;p.onStateChange(unescape(p.currentState))}}return}q=[];u=m.split("&");for(r=0,s=u.length;r<s;r++){t=u[r].split("=");if(t.length===2){n=t[0];o=t[1];q[n]=o}}for(n in d){if(YAHOO.lang.hasOwnProperty(d,n)){p=d[n];o=q[n];if(!o||p.currentState!==o){p.currentState=o||p.initialState;p.onStateChange(unescape(p.currentState))}}}}function k(q){var m,p,n;m='<html><body><div id="state">'+q.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")+"</div></body></html>";try{p=c.contentWindow.document;n=p.domain;p.open();p.write(m);p.close();if(p.domain!==n){p.domain=n}return true}catch(o){return false}}var e=1000;function h(){e--;var q,n,p,o;try{q=c.contentWindow.document}catch(m){if(e>0){setTimeout(h,10)}return}n=q.getElementById("state");p=n?n.innerText:null;o=j();setInterval(function(){var w,s,t,u,v,r;q=c.contentWindow.document;n=q.getElementById("state");w=n?n.innerText:null;v=j();if(w!==p){p=w;i(p);if(!p){s=[];for(t in d){if(YAHOO.lang.hasOwnProperty(d,t)){u=d[t];s.push(t+"="+u.initialState)}}v=s.join("&")}else{v=p}self.location.hash=v;o=v;a()}else{if(v!==o){o=v;k(v)}}},50);g=true;YAHOO.util.History.onLoadEvent.fire()}function f(){var t,v,r,x,n,p,w,q,u,o,m,s;r=l.value.split("|");if(r.length>1){w=r[0].split("&");for(t=0,v=w.length;t<v;t++){x=w[t].split("=");if(x.length===2){n=x[0];q=x[1];p=d[n];if(p){p.initialState=q}}}u=r[1].split("&");for(t=0,v=u.length;t<v;t++){x=u[t].split("=");if(x.length>=2){n=x[0];o=x[1];p=d[n];if(p){p.currentState=o}}}}if(r.length>2){b=r[2].split(",")}if(YAHOO.env.ua.ie){if(typeof document.documentMode==="undefined"||document.documentMode<8){h()}else{YAHOO.util.Event.on(self,"hashchange",function(){var y=j();i(y);a()});g=true;YAHOO.util.History.onLoadEvent.fire()}}else{m=history.length;s=j();setInterval(function(){var A,y,z;y=j();z=history.length;if(y!==s){s=y;m=z;i(s);a()}else{if(z!==m&&YAHOO.env.ua.webkit&&YAHOO.env.ua.webkit<500){s=y;m=z;A=b[m-1];i(A);a()}}},50);g=true;YAHOO.util.History.onLoadEvent.fire()}}return{onLoadEvent:new YAHOO.util.CustomEvent("onLoad"),onReady:function(m,n,o){if(g){setTimeout(function(){var p=window;if(o){if(o===true){p=n}else{p=o}}m.call(p,"onLoad",[],n)},0)}else{YAHOO.util.History.onLoadEvent.subscribe(m,n,o)}},register:function(o,m,q,r,s){var p,n;if(typeof o!=="string"||YAHOO.lang.trim(o)===""||typeof m!=="string"||typeof q!=="function"){throw new Error("Missing or invalid argument")}if(d[o]){return}if(g){throw new Error("All modules must be registered before calling YAHOO.util.History.initialize")}o=escape(o);m=escape(m);p=null;if(s===true){p=r}else{p=s}n=function(t){return q.call(p,t,r)};d[o]={name:o,initialState:m,currentState:m,onStateChange:n}},initialize:function(m,n){if(g){return}if(YAHOO.env.ua.opera&&typeof history.navigationMode!=="undefined"){history.navigationMode="compatible"}if(typeof m==="string"){m=document.getElementById(m)}if(!m||m.tagName.toUpperCase()!=="TEXTAREA"&&(m.tagName.toUpperCase()!=="INPUT"||m.type!=="hidden"&&m.type!=="text")){throw new Error("Missing or invalid argument")}l=m;if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){if(typeof n==="string"){n=document.getElementById(n)}if(!n||n.tagName.toUpperCase()!=="IFRAME"){throw new Error("Missing or invalid argument")}c=n}YAHOO.util.Event.onDOMReady(f)},navigate:function(n,o){var m;if(typeof n!=="string"||typeof o!=="string"){throw new Error("Missing or invalid argument")}m={};m[n]=o;return YAHOO.util.History.multiNavigate(m)},multiNavigate:function(n){var m,o,q,p,r;if(typeof n!=="object"){throw new Error("Missing or invalid argument")}if(!g){throw new Error("The Browser History Manager is not initialized")}for(o in n){if(!d[o]){throw new Error("The following module has not been registered: "+o)}}m=[];for(o in d){if(YAHOO.lang.hasOwnProperty(d,o)){q=d[o];if(YAHOO.lang.hasOwnProperty(n,o)){p=n[unescape(o)]}else{p=unescape(q.currentState)}o=escape(o);p=escape(p);m.push(o+"="+p)}}r=m.join("&");if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){return k(r)}else{self.location.hash=r;if(YAHOO.env.ua.webkit){b[history.length]=r;a()}return true}},getCurrentState:function(m){var n;if(typeof m!=="string"){throw new Error("Missing or invalid argument")}if(!g){throw new Error("The Browser History Manager is not initialized")}n=d[m];if(!n){throw new Error("No such registered module: "+m)}return unescape(n.currentState)},getBookmarkedState:function(r){var q,n,m,t,o,s,p;if(typeof r!=="string"){throw new Error("Missing or invalid argument")}m=self.location.href.indexOf("#");if(m>=0){t=self.location.href.substr(m+1);o=t.split("&");for(q=0,n=o.length;q<n;q++){s=o[q].split("=");if(s.length===2){p=s[0];if(p===r){return unescape(s[1])}}}}return null},getQueryStringParameter:function(r,o){var p,n,m,t,s,q;o=o||self.location.href;m=o.indexOf("?");t=m>=0?o.substr(m+1):o;m=t.lastIndexOf("#");t=m>=0?t.substr(0,m):t;s=t.split("&");for(p=0,n=s.length;p<n;p++){q=s[p].split("=");if(q.length>=2){if(q[0]===r){return unescape(q[1])}}}return null}}})();YAHOO.register("history",YAHOO.util.History,{version:"2.8.1",build:"19"});(function(){var c=YAHOO.util.History,a="yui-history-iframe",d="yui-history-field";
function b(){var f,g,h;
if(!YDom.get(d)){g=document.createElement("input");
g.id=d;
g.type="hidden";
document.body.insertBefore(g,document.body.firstChild)
}if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<8&&!YDom.get(a)){h=document.createElement("iframe");
h.id=a;
h.src="javascript:'<script>window.onload=function(){document.write(\\'<script>if(document.domain !== \\\""+document.domain+'\\")document.domain=\\"'+document.domain+"\\\";<\\\\/script>\\');document.close();};<\/script>'";
YDom.setStyle(h,"position","absolute");
YDom.setStyle(h,"left","0");
YDom.setStyle(h,"top","0");
YDom.setStyle(h,"width","1px");
YDom.setStyle(h,"height","1px");
YDom.setStyle(h,"visibility","hidden");
document.body.insertBefore(h,document.body.firstChild)
}try{c.initialize(d,a)
}catch(i){HistoryManager.failed=true
}}HistoryManager={failed:false,getCurrentState:function(e){return c.getCurrentState(e)
},navigate:function(e,f){c.navigate(e,f)
},register:function(h){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/HistoryManager.js")
}var g=h.name,k=h.onHistoryStateChange,f=h.onHistoryManagerReady,j=h.scope||null,i=h.queryParam||"",e=h.defaultState||"";
initialState=c.getBookmarkedState(g);
if(!initialState&&i){initialState=c.getQueryStringParameter(i)
}if(!initialState){initialState=e
}c.register(g,initialState,k,{name:g},j);
c.onReady(f,{name:g},j)
}};
YEvent.onDOMReady(b);
LI.HistoryManager=HistoryManager
})();(function(){function a(b){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/ARBase.js")
}this.url=b.url||"";
this.callback=b.callback||{};
this.method=b.method||"GET";
this.postData=b.postData||"";
this.mode=b.mode||"YUI";
this.beforeRequestEvent=new YAHOO.util.CustomEvent("beforeRequest")
}a.prototype={addParams:function(b){if(this.getMethod()==="POST"){this.setPostData(LI.addParams(this.getPostData(),b,true))
}else{this.setUrl(LI.addParams(this.getUrl(),b))
}},asyncRequest:function(){this.beforeRequestEvent.fire();
var d=this,f=d.getMethod(),c=d.getUrl(),e=d.getCallback(),b=d.getPostData();
if(this.mode==="YUI"){return YConn.asyncRequest(f,c,e,b)
}else{if(this.mode==="LI"){return LI.asyncRequest(f,c,e,b)
}}},getCallback:function(){return this.callback
},getMethod:function(){return this.method
},getMode:function(){return this.mode
},getPostData:function(){return this.postData
},getUrl:function(){return this.url
},setCallback:function(b){this.callback=b
},setMethod:function(b){this.method=b
},setMode:function(b){this.mode=b
},setPostData:function(b){this.postData=b
},setUrl:function(b){this.url=b
}};
LI.ARBase=a
})();(function(){var c="disabled",q="feed-no-more",f="feed-item-insert",d='<span class="loading"></span>',p="noMoreResults",h=false,k=false,j=0,m=3,e=false,l=600,a,r=true;
function n(z){var A,w,v,y,t,u;
try{A=LI.addToList(z.responseText,this.el,function(C,B){if(!B){YDom.addClass(C,f)
}})
}catch(x){A=[]
}w=A.length;
v=z.argument.triggers;
y=v.length;
if(w){this.fetchEvent.fire();
if(YAHOO.util.ImageLoader){LI.each(A,LI.showAllDeferredImg)
}YDom.removeClass(v,c);
for(u=0;
u<y;
++u){YDom.removeClass(v[u].el,c)
}}else{this.noMoreResultsEvent.fire();
this.showNoMoreResultsEl();
h=true
}for(u=0;
u<y;
++u){t=v[u];
t.el.innerHTML=t.html
}this.addedToListEvent.fire();
j++;
k=false
}function s(x){var v=x.argument.triggers,w=v.length,t,u;
this.noMoreResultsEvent.fire();
this.showNoMoreResultsEl();
h=true;
for(u=0;
u<w;
++u){t=v[u];
t.el.innerHTML=t.html
}}function g(t){var u=YEvent.getTarget(t);
YEvent.preventDefault(t);
if(!YDom.hasClass(u,c)&&!k&&r){this.triggerClickEvent.fire(u);
this.fetchMoreResults(u)
}}function b(){if(!k&&!h&&(j!==m)&&r){this.triggerScrollEvent.fire();
this.fetchMoreResults()
}if(!e&&(j===m)){this.infiniteScrollStopEvent.fire();
e=true
}}function i(w){var v="LI_",u=(w.indexOf(v)===0),t=parseInt(w.replace(v,""),10);
m=(!u||isNaN(t))?m:t
}function o(v,u){if(LI.__HPA===true){window.console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/InfinitePagination.js")
}var t;
o.superclass.constructor.call(this,u);
this.attributes=u.attributes||["data-li-date","before"];
this.triggers=u.triggers||".feed-show-more";
this.enableInfiniteScroll=u.enableInfiniteScroll||false;
this.i18n=u.i18n||{};
t={};
t[p]=LI.i18n.get("InfinitePagination-no-more-results");
YAHOO.lang.augmentObject(this.i18n,t);
this.el=v;
this.triggerClickEvent=new YAHOO.util.CustomEvent("triggerClick");
this.triggerScrollEvent=new YAHOO.util.CustomEvent("triggerScroll");
this.beforeFetchEvent=new YAHOO.util.CustomEvent("beforeFetch");
this.fetchEvent=new YAHOO.util.CustomEvent("fetch");
this.addedToListEvent=new YAHOO.util.CustomEvent("addedToListEvent");
this.noMoreResultsEvent=new YAHOO.util.CustomEvent("noMoreResults");
this.infiniteScrollStopEvent=new YAHOO.util.CustomEvent("infiniteScrollStop");
this.originUUIDEnabled=u.originUUIDEnabled||false;
this.infiniteScrollStopThreshold=u.infiniteScrollStopThreshold||"";
i(this.infiniteScrollStopThreshold);
this.setCallback({success:n,failure:s,scope:this});
if(this.enableInfiniteScroll){a=LI.ElementVisible?new LI.ElementVisible(document.getElementById("feed-show-more"),l,b,this):null
}YEvent.on(Y$(this.triggers),"click",g,null,this)
}YAHOO.extend(o,LI.ARBase,{destroy:function(){if(this.enableInfiniteScroll&&!!a){a.destroy();
a=null
}YEvent.removeListener(Y$(this.triggers),"click",g);
this.triggerClickEvent.unsubscribeAll();
this.triggerScrollEvent.unsubscribeAll();
this.beforeFetchEvent.unsubscribeAll();
this.fetchEvent.unsubscribeAll();
this.noMoreResultsEvent.unsubscribeAll();
this.infiniteScrollStopEvent.unsubscribeAll();
h=false;
k=false;
j=0
},disableTriggers:function(){YDom.addClass(Y$(this.triggers),c);
r=false
},enableTriggers:function(){YDom.removeClass(Y$(this.triggers),c);
r=true
},fetchMoreResults:function(){var z=this.getLastResult(),y=Y$(this.triggers),t=y.length,v=this.attributes,x={},A=[],C,B,w,u;
if(k||!z){return
}k=true;
this.beforeFetchEvent.fire();
for(w=0;
w<t;
++w){C=y[w];
A[A.length]={el:C,html:C.innerHTML};
C.innerHTML=d;
YDom.addClass(C,c)
}for(w=v.length-1;
w>=0;
--w){u=v[w];
x[u.urlParam]=z.getAttribute(u.attribute)
}this.addParams(x);
B=this.getCallback();
B.argument={triggers:A};
this.setCallback(B);
if(this.originUUIDEnabled){LI.originUUID()
}this.asyncRequest()
},getLastResult:function(){var x=YDom.getChildren(this.el),u=this.attributes,w,t,v,y;
for(w=x.length-1;
w>=0;
--w){t=x[w];
y=true;
for(v=u.length-1;
v>=0;
--v){if(u[v].notRequired){continue
}if(!t.getAttribute(u[v].attribute)){y=false;
break
}}if(y){return t
}}return null
},hideNoMoreResultsEl:function(){var t=this.noMoreResultsEl;
if(t){t.parentNode.removeChild(t)
}},showNoMoreResultsEl:function(){var t=this.el;
if(!this.noMoreResultsEl){this.noMoreResultsEl=LI.domify('<div class="'+q+'">'+this.i18n[p]+"</div>")
}t.parentNode.insertBefore(this.noMoreResultsEl,t.nextSibling)
},getRequestMade:function(){return j
}});
LI.InfinitePagination=o
}());(function(){var d=86400000;
function a(e){this.pollFailureEvent.fire(e);
if(this.stopOnFail){this.stop()
}else{this.start()
}}function c(e){if(LI.isFullPage(e.responseText)){a.call(this,e)
}else{this.pollSuccessEvent.fire(e);
if(!this.hasBeenDestroyed){this.start()
}}}function b(e){if(LI.__HPA===true){window.console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/Polling.js")
}b.superclass.constructor.call(this,e);
this.interval=e.interval||function(f){return 1000*Math.pow(1.3,f)+20000*(f+1)
};
this.stopOnFail=YAHOO.lang.isUndefined(e.stopOnFail)?true:e.stopOnFail;
this.pollSuccessEvent=new YAHOO.util.CustomEvent("pollSuccess");
this.pollFailureEvent=new YAHOO.util.CustomEvent("pollFailure");
this.numCalls=0;
this.hasBeenDestroyed=false;
this.setCallback({success:c,failure:a,scope:this});
this.originUUIDEnabled=e.originUUIDEnabled||false
}YAHOO.extend(b,LI.ARBase,{destroy:function(){this.stop();
this.pollSuccessEvent.unsubscribeAll();
this.pollFailureEvent.unsubscribeAll();
this.hasBeenDestroyed=true
},requestNow:function(){this.stop();
this.req=this.asyncRequest()
},resetInterval:function(){this.numCalls=0
},stop:function(){var e=this.timeout;
if(e){window.clearTimeout(this.timeout);
this.timeout=null
}if(this.req){YConn.abort(this.req);
this.req=null
}},start:function(){var g=this,f=g.interval,e=g.originUUIDEnabled;
g.stop();
if(YAHOO.lang.isFunction(f)){f=f(g.numCalls)
}if(YAHOO.lang.isNumber(f)){f=Math.min(f,d);
if(g.url){g.timeout=window.setTimeout(function(){if(e){LI.originUUID()
}g.req=g.asyncRequest();
++g.numCalls
},f)
}}}});
LI.Polling=b
}());(function(){var j,h="feed-item-insert",u="text-indent",f=1326941342812,p='<div class="real-time-notification"></div>',l="newResult",v="newResults",a="newResultsMax",i="Relevance",b="data-li-update-date",q="none",d="display";
function e(w){if(w==="A"){return 20
}else{if(w==="B"){return 100
}else{if(w==="C"){return 1000
}else{return 20
}}}}function s(z){if(!z){return[]
}var w=z.split("&"),A={},y,x;
for(x=w.length-1;
x>=0;
--x){y=w[x].split("=");
A[y[0]]=y[1]
}return A
}function g(){if(!j){j={monthAgo:LI.i18n.get("RealTimeResults-month-ago"),monthsAgo:LI.i18n.get("RealTimeResults-months-ago"),dayAgo:LI.i18n.get("RealTimeResults-day-ago"),daysAgo:LI.i18n.get("RealTimeResults-days-ago"),hourAgo:LI.i18n.get("RealTimeResults-hour-ago"),hoursAgo:LI.i18n.get("RealTimeResults-hours-ago"),minuteAgo:LI.i18n.get("RealTimeResults-minute-ago"),minutesAgo:LI.i18n.get("RealTimeResults-minutes-ago"),secondAgo:LI.i18n.get("RealTimeResults-second-ago"),secondsAgo:LI.i18n.get("RealTimeResults-seconds-ago")}
}return j
}function t(w){this.pendingResults.unshift.apply(this.pendingResults,w)
}function r(){var w=(this.incompany)?YDom.get("feed-content"):this.resultsEl;
if(!this.notificationEl||!YDom.inDocument(this.notificationEl)){if(this.isNewRealTimeUX){this.rtNotifyContainer=YDom.get("rt-notify-container");
this.originalTop=YDom.getStyle(this.rtNotifyContainer,"top");
this.notificationEl=Y$(".button",this.rtNotifyContainer,true);
if(!this.hasNotificationElListener){YEvent.on(this.notificationEl,"click",k,null,this);
this.hasNotificationElListener=true
}}else{this.notificationEl=w.parentNode.insertBefore(LI.domify(p),w);
YEvent.on(this.notificationEl,"click",k,null,this)
}}return this.notificationEl
}function o(w){return function(x){var y=x.getAttribute(w);
return(y&&(!isNaN(y)))
}
}function c(){var z={},w=this.pendingResults,x=(w.length)?this.getDateFromEl(this.pendingResults[0]):-1,y=this.getDateFromEl(YDom.getFirstChildBy(this.resultsEl,o(this.dateAttribute)));
z[this.dateUrlParam]=Math.max(x,y)+1;
if(this.progressivePoll&&this.ppSinceDate){z[this.dateUrlParam]=this.ppSinceDate
}this.polling.addParams(z)
}function k(w){if(this.disableFetch){this.notificationClickEvent.fire();
return
}if(this.fetchUrl){if(this.numResults>this.maxPendingResults){window.location.reload()
}else{this.fetchAndInsertResults()
}}else{if(this.pendingResults.length>this.maxPendingResults){window.location.reload()
}else{this.insertPendingResults()
}}this.notificationClickEvent.fire()
}function m(x,y){var B=y[0],A,z=YAHOO.lang.trim(B.responseText),w=0,C;
if(!LI.isFullPage(z)){if(this.fetchUrl){if(this.progressivePoll){A=z.split("_");
if(A.length===2){w=parseInt(A[0],10);
this.ppSinceDate=parseInt(A[1],10)
}this.numResults=isNaN(this.numResults)?0:this.numResults;
w+=this.numResults
}else{w=parseInt(z,10)||0
}this.updateNotification(w);
this.numResults=w
}else{C=YDom.getChildren(LI.domify("<ul>"+z+"</ul>"));
if(C){w=C.length;
if(w){t.call(this,C);
this.resultsFoundEvent.fire(C);
this.updateNotification(this.pendingResults.length)
}}}if(w){if(this.stopOnResults){this.polling.stop()
}if(w>this.maxPendingResults){this.polling.stop()
}}}this.pollSuccessEvent.fire(w)
}function n(z,y){if(LI.__HPA===true){window.console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/RealTimeResults.js")
}var w=y.originUUIDEnabled||false,A={method:y.method||"POST",url:(y.uscpUrl)?y.uscpUrl:y.url,uscpUrl:y.uscpUrl||"",interval:y.interval||function(E){return 1000*Math.pow(1.3,E)+20000*(E+1)
},postData:y.postData||"",mode:y.mode||"YUI",originUUIDEnabled:w},B=new LI.Polling(A),x,D=y.realTimeMaxDisplay||"A";
this.config=y;
this.originUUIDEnabled=w;
this.maxPendingResults=e(D);
this.fetchUrl=y.fetchUrl||"";
this.uscpFetchUrl=y.uscpFetchUrl||"";
this.sortType=y.sortType||"";
this.countUrlParam=y.countUrlParam||"";
this.defaultDate=y.defaultDate||f;
this.disableFetch=y.disableFetch||false;
this.pendingResults=[];
this.polling=B;
this.pollConfig=A;
this.dateAttribute=y.dateAttribute||"data-li-date";
this.dateUrlParam=y.dateUrlParam||"since-date";
this.stopOnResults=YAHOO.lang.isUndefined(y.stopOnResults)?false:y.stopOnResults;
this.autoStartMode=y.autoStartMode||"onLoad";
this.timestampSelector=y.timestampSelector||null;
this.updateTitle=YAHOO.lang.isUndefined(y.updateTitle)?true:y.updateTitle;
this.progressivePoll=YAHOO.lang.isUndefined(y.progressivePoll)?false:y.progressivePoll;
this.ppSinceDate=null;
this.resultsEl=z;
this.isNewRealTimeUX=!!y.isNewRealTimeUX;
this.hasNotificationElListener=false;
this.i18n=y.i18n||{};
x={};
x[l]=LI.i18n.get("RealTimeResults-new-result");
x[v]=LI.i18n.get("RealTimeResults-new-results");
x[a]=LI.i18n.get("RealTimeResults-new-results-max");
YAHOO.lang.augmentObject(this.i18n,x);
if(this.updateTitle){this.originalTitle=document.title
}B.pollSuccessEvent.subscribe(m,null,this);
B.beforeRequestEvent.subscribe(c,null,this);
this.pollSuccessEvent=new YAHOO.util.CustomEvent("pollSuccess");
this.resultsFoundEvent=new YAHOO.util.CustomEvent("resultsFound");
this.notificationClickEvent=new YAHOO.util.CustomEvent("notificationClick");
this.resultsInsertedEvent=new YAHOO.util.CustomEvent("resultsInserted");
this.incompany=y.incompany||false;
function C(){B.start()
}switch(this.autoStartMode){case"now":C();
break;
case"onDomReady":YEvent.onDOMReady(C);
break;
case"onLoad":YEvent.on(window,"load",C);
break
}}n.prototype={addParams:function(w){this.polling.addParams(w)
},clearPendingResults:function(){this.pendingResults=[];
this.updateNotification(0)
},destroy:function(){this.clearPendingResults();
this.polling.destroy();
this.cleanupClickListener();
this.resultsFoundEvent.unsubscribeAll();
this.resultsInsertedEvent.unsubscribeAll()
},getHeight:function(y,z){var x=document.createElement("div"),w;
x.appendChild(LI.domify("<ul>"+y+"</ul>"));
YDom.setStyle(x,"position","absolute");
x=z.appendChild(x);
w=YDom.getRegion(x).height;
z.removeChild(x);
x=null;
return w
},cleanupClickListener:function(){YEvent.removeListener(this.notificationEl,"click",k);
this.originalTop=this.notificationEl=this.rtNotifyContainer=null
},slideData:function(z){var x,y=YDom.get("feed-wrapper"),A=YDom.get("feed-content"),w=this.getHeight(z,A);
YDom.setStyle(A,"top",(w*-1)+"px");
YDom.setStyle(A,"position","relative");
YDom.setStyle(y,"overflow","hidden");
x=new YAnim(A,{top:{to:0}},0.5);
x.animate();
x.onComplete.subscribe(function(){YDom.setStyle(A,"position","");
YDom.setStyle(y,"overflow","");
x=null
})
},fetchAndInsertResults:function(){var C=this.polling.getMode(),w=this.polling.getMethod(),z=this.polling.getPostData(),A=this.polling.getUrl(),x=this.uscpFetchUrl||this.fetchUrl,D=r.call(this),F=new LI.ProcessingOverlay(D,{width:16,additionalClassName:this.isNewRealTimeUX?"new-realtime":""}),E={success:function(H){var G=H.responseText;
if(!LI.isFullPage(G)){t.call(this,YDom.getChildren(LI.domify("<ul>"+G+"</ul>")));
this.insertPendingResults();
if(this.isNewRealTimeUX){this.slideData(G);
this.hideNotification(this.rtNotifyContainer)
}}YDom.setStyle(D,u,"");
F.hide()
},failure:function(G){YDom.setStyle(D,u,"");
F.hide()
},scope:this},B,y;
y=A.split("?");
B=s(y[1]);
if(this.countUrlParam){B[this.countUrlParam]=this.numResults
}if(this.progressivePoll&&B[this.dateUrlParam]){B[this.dateUrlParam]=this.getDateFromEl(YDom.getFirstChild(this.resultsEl))+1;
this.numResults=0
}if(B){x=LI.addParams(x,B)
}if(C==="YUI"){if(this.originUUIDEnabled){LI.originUUID()
}YConn.asyncRequest(w,x,E,z)
}else{if(C==="LI"){LI.asyncRequest(w,x,E,z)
}}if(this.isNewRealTimeUX){YDom.setStyle(D,"visibility","hidden")
}YDom.setStyle(D,u,"-12345px");
F.show()
},getDateFromEl:function(w){var x;
x=parseInt(w.getAttribute(this.dateAttribute),10);
if(isNaN(x)){x=this.defaultDate
}return x
},getFetchUrl:function(){return this.fetchUrl
},getPendingResults:function(){return this.pendingResults
},getUrl:function(){return this.polling.getUrl()
},insertPendingResults:function(E){E=E||0;
var F=this.pendingResults,D=F.splice(E,F.length-E),w=YDom.getFirstChild(this.resultsEl),C=this.timestampSelector,A,G,x,z,B,y;
D=LI.addToList(D,w);
if(this.incompany){LI.NusInjection.removeInjectionContainer()
}this.resultsInsertedEvent.fire(D,this.resultsEl);
YDom.addClass(w,h);
if(C){A=YDom.getChildren(this.resultsEl);
for(z=A.length-1;
z>=0;
--z){G=A[z];
x=G.getAttribute(this.dateAttribute);
B=Y$(C,G,true);
if(B){y=LI.timeFormat(x,g());
if(y){B.innerHTML=y
}}}}this.updateNotification(F.length);
if(this.progressivePoll){this.ppSinceDate=this.getDateFromEl(YDom.getFirstChild(this.resultsEl))+1
}if(this.stopOnResults){this.polling.start()
}},requestNow:function(){this.polling.requestNow()
},reset:function(){this.stop();
this.clearPendingResults();
this.start()
},resetInterval:function(){this.polling.resetInterval()
},setFetchUrl:function(w){this.fetchUrl=w
},setUrl:function(w){this.polling.setUrl(w)
},start:function(){this.polling.start()
},stop:function(){this.polling.stop()
},showNotification:function(x){var w;
if(x){YDom.setStyle(x,"top",this.originalTop);
w=new YAnim(x,{top:{to:this.isNewRealTimeUX?-3:0}},0.5);
YDom.setStyle(this.notificationEl,"visibility","visible");
YDom.setStyle(x,d,"block");
w.animate()
}},hideNotification:function(w){YDom.setStyle(w,d,q);
YDom.setStyle(w,"top",this.originalTop)
},updateNotification:function(z){var x=r.call(this),D=this.i18n,y,C=LI.i18n.get("RealTimeResults-new-results-max"),w=this.maxPendingResults,B=YAHOO.lang.substitute(C,{"0":w}),A;
if(z<=1){A=D[l]
}else{if((z>1)&&(z<=w)){A=D[v]
}else{if(z>w){A=D[a]
}}}if(this.isNewRealTimeUX){y=this.rtNotifyContainer;
if(z){if(this.updateTitle){if(z<=w){x.innerHTML=YAHOO.lang.substitute(A,{"0":z});
document.title="("+z+") "+this.originalTitle
}else{x.innerHTML=YAHOO.lang.substitute(A,{"0":w});
document.title="("+B+") "+this.originalTitle
}}if(YDom.getStyle(y,d)===q){this.showNotification(y)
}}else{this.hideNotification(y);
if(this.updateTitle){document.title=this.originalTitle
}}}else{if(z){if(this.updateTitle){if(z<=w){x.innerHTML=YAHOO.lang.substitute(A,{"0":z});
document.title="("+z+") "+this.originalTitle
}else{x.innerHTML=YAHOO.lang.substitute(A,{"0":w});
document.title="("+B+") "+this.originalTitle
}}LI.show(x)
}else{x.parentNode.removeChild(x);
if(this.updateTitle){document.title=this.originalTitle
}}}}};
LI.RealTimeResults=n
}());(function(){var b,a="feature-update-spot";
function d(){if(!b||!YDom.inDocument(b)){b=YDom.get("my-feed-post");
if(!b){b=LI.domify('<ul id="my-feed-post" class="chron"></ul>');
var e=YDom.get("feed-content");
if(e){e.insertBefore(b,YDom.getFirstChild(e))
}}}return b
}function c(){var e=YDom.getElementsByClassName("post-home","div")[0],f;
if(!e){return null
}f=(e)?YDom.getElementsByClassName("my-current","div",e)[0]:null;
if(!f){f=e.appendChild(LI.domify('<div class="my-current"></div>'))
}return f
}LI.NusInjection={injectEvent:new YAHOO.util.CustomEvent("inject_feed_item"),injectFeedItem:function(k){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusInjection.js LI.NusInjection.injectFeedItem()")
}var l=d(),i=YDom.getFirstChild(l),g=YDom.getAncestorByClassName(l,"feed"),j=(g)?LI.Controls.getControl(g,"Nus"):null,e=(j)?j.getTypeFilter():null,f=(e&&e!=="ALL"&&e!=="SHARE"&&e!=="COWORKERS_V2"),h,n,m;
if(!f){h=LI.domify(k);
n=h.cloneNode(false);
if(i){if(YDom.hasClass(i,a)){YDom.insertAfter(n,i)
}else{l.insertBefore(n,i)
}}else{l.appendChild(n)
}n.innerHTML=h.innerHTML;
LI.Controls.parseFragment(n);
LI.highlight(n);
LI.showAllDeferredImg(n)
}else{if(!i){LI.NusInjection.removeInjectionContainer()
}}this.injectEvent.fire()
},injectUrl:function(f,e){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusInjection.js LI.NusInjection.injectUrl()")
}var i=1;
var h=e.onInject||null;
var j={success:function(l){var k=(l.getResponseHeader)?l.getResponseHeader["Content-Type"]:null;
if(k===null||k.indexOf("text/xml")>-1){if(i<7){pollTimeout=window.setTimeout(g,1300);
i++
}else{this.failure()
}}else{LI.NusInjection.injectFeedItem(l.responseText);
if(h&&h.success){h.success.call()
}}},failure:function(k){if(h&&h.failure){h.failure.call()
}},timeout:12000};
function g(){var k=YAHOO.util.Connect.asyncRequest("GET",f,j)
}g()
},removeInjectionContainer:function(e){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/apps/NusInjection.js LI.NusInjection.removeInjectionContainer()")
}if(!e){e=d()
}if(e){e.parentNode.removeChild(e)
}}}
})();
YAHOO.register("LI.NusInjection",LI.NusInjection,{});(function(){var a=window.YDom,c=a.setStyle;
function b(e,d){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: js/util/ProcessingOverlay.js")
}if(e){this.contextEl=e
}this.width=(d&&d.width)?d.width:75;
this.isFlexHeight=(d&&d.isFlexHeight);
if(d&&d.relative){this.relative=true
}else{this.relative=false
}this.fixed=!!(d&&d.fixed);
this.additionalClassName=(d&&d.additionalClassName)?d.additionalClassName:"";
this.overlay=null
}b.prototype={getContextEl:function(){return this.contextEl
},setContextEl:function(d){this.contextEl=d
},resetFixedOverlayPosition:function(f){var e=a.getXY(this.contextEl),d=f?f:0;
if(e&&e.length){a.setStyle(this.overlay,"left",e[0]+"px");
a.setStyle(this.overlay,"top",e[1]-d/2+a.getViewportHeight()/2+"px")
}},hide:function(){var d=this.overlay,e;
if(d){e=d.parentNode;
if(e){e.removeChild(d)
}}},show:function(i){i=i||this.contextEl;
var f=this.overlay,l=i.offsetHeight,g=i.offsetWidth,j=a.getXY(i),d=this.width,k=(l<d)?d:l,e=(g<d)?d:g,h=document.body;
if(!f){f=LI.domify('<div class="processing-overlay processing-overlay-'+d+" "+this.additionalClassName+'"></div>');
if(!this.relative){h.appendChild(f)
}else{i.appendChild(f)
}this.overlay=f
}if(f.parentNode!==h){if(!this.relative){h.appendChild(f)
}else{i.appendChild(f)
}}c(f,"height",(this.isFlexHeight)?"100%":k+"px");
c(f,"width",e+"px");
if(!this.relative){if(!this.fixed){a.setXY(f,j)
}else{c(f,"position","fixed");
this.resetFixedOverlayPosition(k)
}}else{c(f,"left","0");
c(f,"top","0")
}c(f,"visibility","visible")
}};
LI.ProcessingOverlay=b
})();(function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/util/Loader.js")
}var Y=YAHOO,util=Y.util,lang=Y.lang,env=Y.env;
var prefix="LI.",prefixLength=prefix.length;
var YUI={info:{"root":"2.8.1/build/","base":"http://vphan-md.linkedin.biz:8080/","comboBase":"http://yui.yahooapis.com/combo?","moduleInfo":{}},ObjectUtil:{appendArray:function(o,a){if(a){for(var i=0;
i<a.length;
i=i+1){o[a[i]]=true
}}},keys:function(o,ordered){var a=[],i;
for(i in o){if(lang.hasOwnProperty(o,i)){a.push(i)
}}return a
}},ArrayUtil:{appendArray:function(a1,a2){Array.prototype.push.apply(a1,a2)
},indexOf:function(a,val){for(var i=0;
i<a.length;
i=i+1){if(a[i]===val){return i
}}return -1
},toObject:function(a){var o={};
for(var i=0;
i<a.length;
i=i+1){o[a[i]]=true
}return o
},uniq:function(a){return YUI.ObjectUtil.keys(YUI.ArrayUtil.toObject(a))
}}};
LI.Loader=function(o){this._internalCallback=null;
this._useYahooListener=false;
this.onSuccess=null;
this.onProgress=null;
this.onTimeout=null;
this.scope=this;
this.data=null;
this.insertBefore=null;
this.charset=null;
this.varName=null;
this.base=YUI.info.base;
this.comboBase=YUI.info.comboBase;
this.combine=false;
this.root=YUI.info.root;
this.timeout=0;
this.required={};
this.moduleInfo=lang.merge(YUI.info.moduleInfo);
this.loadOptional=false;
this.sorted=[];
this.loaded={};
this.dirty=true;
this.inserted={};
var self=this;
env.listeners.push(function(m){if(self._useYahooListener){self.loadNext(m.name)
}});
this._config(o)
};
LI.Loader.prototype={_config:function(o){if(o){for(var i in o){if(lang.hasOwnProperty(o,i)){if(i=="require"){this.require(o[i])
}else{this[i]=o[i]
}}}}},require:function(what){var a=(typeof what==="string")?arguments:what;
this.dirty=true;
YUI.ObjectUtil.appendArray(this.required,a)
},getRequires:function(mod){if(!mod){return[]
}if(!this.dirty&&mod.expanded){return mod.expanded
}mod.requires=mod.requires||[];
var i,d=[],r=mod.requires,o=mod.optional,info=this.moduleInfo,m;
for(i=0;
i<r.length;
i=i+1){d.push(r[i]);
m=info[r[i]];
YUI.ArrayUtil.appendArray(d,this.getRequires(m))
}if(o&&this.loadOptional){for(i=0;
i<o.length;
i=i+1){d.push(o[i]);
YUI.ArrayUtil.appendArray(d,this.getRequires(info[o[i]]))
}}mod.expanded=YUI.ArrayUtil.uniq(d);
return mod.expanded
},calculate:function(o){if(o||this.dirty){this._config(o);
this._setup();
this._explode();
this._reduce();
this._sort();
this.dirty=false
}},_setup:function(){var i,l=lang.merge(this.inserted);
if(!this._sandbox){l=lang.merge(l,env.modules)
}this.loaded=l
},_explode:function(){var r=this.required,i,mod;
for(i in r){if(lang.hasOwnProperty(r,i)){mod=this.moduleInfo[i];
if(mod){var req=this.getRequires(mod);
if(req){YUI.ObjectUtil.appendArray(r,req)
}}}}},_reduce:function(){var i,r=this.required;
for(i in r){if(i in this.loaded){delete r[i]
}}},_onTimeout:function(){var f=this.onTimeout;
if(f){f.call(this.scope,{msg:"timeout",data:this.data,success:false})
}},_sort:function(){var s=[],info=this.moduleInfo,loaded=this.loaded,checkOptional=!this.loadOptional;
var requires=function(aa,bb){var mm=info[aa];
if(loaded[bb]||!mm){return false
}var rr=mm.expanded,after=mm.after,other=info[bb],optional=mm.optional;
if(rr&&YUI.ArrayUtil.indexOf(rr,bb)>-1){return true
}if(after&&YUI.ArrayUtil.indexOf(after,bb)>-1){return true
}if(checkOptional&&optional&&YUI.ArrayUtil.indexOf(optional,bb)>-1){return true
}if(mm.ext&&mm.type=="css"&&!other.ext&&other.type=="css"){return true
}return false
};
for(var i in this.required){if(lang.hasOwnProperty(this.required,i)){s.push(i)
}}var p=0;
for(;
;
){var l=s.length,a,b,j,k,moved=false;
for(j=p;
j<l;
j=j+1){a=s[j];
for(k=j+1;
k<l;
k=k+1){if(requires(a,s[k])){b=s.splice(k,1);
s.splice(j,0,b[0]);
moved=true;
break
}}if(moved){break
}else{p=p+1
}}if(!moved){break
}}this.sorted=s
},toString:function(){var o={type:"YUILoader",base:this.base,required:this.required,loaded:this.loaded,inserted:this.inserted};
lang.dump(o,1)
},_combine:function(){this._combining=[];
var self=this,s=this.sorted,len=s.length,js=this.comboBase+"js?",css=this.comboBase+"css?",target,jsStartLen=js.length,cssStartLen=css.length,i,m,type=this.loadType,buildingHash=false,encodeRegex=/\//g;
for(i=0;
i<len;
i=i+1){m=this.moduleInfo[s[i]];
if(m&&!m.ext&&(!type||type===m.type)){if(this.hashingEnabled&&m.md5Hash){if(!buildingHash){buildingHash=true;
target="h="+m.md5Hash
}else{target="-"+m.md5Hash
}}else{target="f="+this.getPath(s[i]).replace(encodeRegex,"%2F");
buildingHash=false
}if(i!=len-1&&!buildingHash){target+="&"
}if(m.type=="js"||m.type=="lib"){js+=target
}else{css+=target
}this._combining.push(s[i])
}}if(js.indexOf("h=")<0){js+="&h="
}LI.log("Loading: "+js,"info","Loader.js");
if(this._combining.length){var callback=function(o){var c=this._combining,len=c.length,i;
for(i=0;
i<len;
i=i+1){this.inserted[c[i]]=true
}this.loadNext(o.data)
},loadScript=function(){if(js.length>jsStartLen){YAHOO.util.Get.script(js,{data:self._loading,onSuccess:callback,onTimeout:self._onTimeout,insertBefore:self.insertBefore,charset:self.charset,timeout:self.timeout,scope:self})
}};
if(css.length>cssStartLen){YAHOO.util.Get.css(css,{data:this._loading,onSuccess:loadScript,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,scope:self})
}else{loadScript()
}return
}else{this.loadNext(this._loading)
}},insert:function(o,type){this.calculate(o);
this._loading=true;
this.loadType=type;
if(this.combine){return this._combine()
}if(!type){var self=this;
this._internalCallback=function(){self._internalCallback=null;
self.insert(null,"js")
};
this.insert(null,"css");
return
}this.loadNext()
},sandbox:function(o,type){this._config(o);
if(!this.onSuccess){throw new Error("You must supply an onSuccess handler for your sandbox")
}this._sandbox=true;
var self=this;
if(!type||type!=="js"){this._internalCallback=function(){self._internalCallback=null;
self.sandbox(null,"js")
};
this.insert(null,"css");
return
}if(!util.Connect){var ld=new LI.Loader();
ld.insert({base:this.base,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){this.sandbox(null,"js")
},scope:this},"js");
return
}this._scriptText=[];
this._loadCount=0;
this._stopCount=this.sorted.length;
this._xhr=[];
this.calculate();
var s=this.sorted,l=s.length,i,m,url;
for(i=0;
i<l;
i=i+1){m=this.moduleInfo[s[i]];
if(!m){for(var j=0;
j<this._xhr.length;
j=j+1){this._xhr[j].abort()
}return
}if(m.type!=="js"){this._loadCount++;
continue
}url=this.getUrl(s[i]);
var xhrData={success:function(o){var idx=o.argument[0],name=o.argument[2];
this._scriptText[idx]=o.responseText;
if(this.onProgress){this.onProgress.call(this.scope,{name:name,scriptText:o.responseText,xhrResponse:o,data:this.data})
}this._loadCount++;
if(this._loadCount>=this._stopCount){var v=this.varName||"YAHOO";
var t="(function() {\n";
var b="\nreturn "+v+";\n})();";
var ref=eval(t+this._scriptText.join("\n")+b);
if(ref){this.onSuccess.call(this.scope,{reference:ref,data:this.data})
}}},scope:this,argument:[i,url,s[i]]};
this._xhr.push(util.Connect.asyncRequest("GET",url,xhrData))
}},loadNext:function(mname){if(!this._loading){return
}if(mname){if(mname!==this._loading){return
}this.inserted[mname]=true;
if(this.onProgress){this.onProgress.call(this.scope,{name:mname,data:this.data})
}}var s=this.sorted,len=s.length,i,m;
for(i=0;
i<len;
i=i+1){if(s[i] in this.inserted){continue
}if(s[i]===this._loading){return
}m=this.moduleInfo[s[i]];
if(!m){return
}if(!this.loadType||this.loadType===m.type){this._loading=s[i];
var fn=(m.type==="css")?util.Get.css:util.Get.script,url=this.getUrl(s[i]),self=this,c=function(o){self.loadNext(o.data)
};
if(env.ua.webkit&&env.ua.webkit<420&&m.type==="js"&&!m.varName){c=null;
this._useYahooListener=true
}fn(url,{data:s[i],onSuccess:c,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,varName:m.varName,scope:self});
return
}}this._loading=null;
if(this._internalCallback){var f=this._internalCallback;
this._internalCallback=null;
f.call(this)
}else{if(this.onSuccess){this.onSuccess.call(this.scope,{data:this.data})
}}},_url:function(path){return(this.base||"")+path
},getPath:function(moduleName){var moduleData=this.moduleInfo[moduleName],path="";
if(moduleData.path){return moduleData.path.replace(".js","")
}if(moduleData.type=="js"){if(moduleData.subtype=="util"||moduleData.subtype=="apps"){path="js/"+moduleData.subtype+"/"+moduleName.substr(prefixLength)
}else{if(moduleData.subtype=="yui"){path="lib/yui/2.8.1/"+moduleData.path
}}}return path
},getUrl:function(moduleName){var path=this.getPath(moduleName);
return this._url(path)
}};
LI.Loader.addModule=function(moduleName,module){YUI.info.moduleInfo[moduleName]=module
};
YAHOO.env.listeners.push(function(m){LI.log("Module loaded: "+m.name,"info","Loader.js")
})
})();LI.define("AnetNusLike");
(function(){function a(d,c){if(!d){return null
}return(YDom.hasClass(d,c))?d:YDom.getAncestorByClassName(d,c)
}function b(c){var g=YEvent.getTarget(c),e=a(g,"gu-like-action"),f,d,h;
if(e){YEvent.preventDefault(c);
f=YDom.hasClass(e.parentNode,"show-like")?e.parentNode:null;
d=e.getAttribute("data-like-toggle-link");
if(!d){return
}if(f){LI.toggleClass(f,"loading")
}h={success:function(n){var p=(YAHOO.env.ua.ie)?n.responseXML.documentElement:n.responseXML,l,j,k,m;
if(f){LI.toggleClass(f,"loading")
}if(p){h.failure(n)
}else{l=YAHOO.lang.JSON.parse(n.responseText);
if(YDom.hasClass(e,"like-on-comment")){j=YDom.getElementsByClassName("like-count","",e.parentNode)
}else{j=YDom.getElementsByClassName("like-count","",e)
}m=parseInt(l.item_like_count,10);
for(k=j.length-1;
k>=0;
--k){j[k].innerHTML=(m>0)?" ("+m+")":""
}if(YDom.hasClass(e,"like-on-comment")){LI.toggleClass(e.parentNode,"show-like")
}else{LI.toggleClass(e,"show-like")
}}},failure:function(i){if(f){LI.toggleClass(f,"loading")
}}};
YAHOO.util.Connect.asyncRequest("GET",d,h)
}}LI.AnetNusLike=function(d,c){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/AnetNusLike.js")
}YEvent.on(d,"click",b)
}
})();(function(){var a="data-li-tweet-action",c="bindDialog";
function b(e,f){var m=null;
if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusTweetAction.js")
}b.showBindDialog=!!f.showBindDialog;
function l(q){var s=YEvent.getTarget(q),r=s.getAttribute(a);
if(r){YEvent.preventDefault(q);
i(r,s.href)
}else{if(YDom.hasClass(s,"feed-twitter-handle")){if(typeof WebTracking!=="undefined"){WebTracking.trackUserAction("NUS_viewTwitterProfile")
}}}}function g(s){var q=h(s,"feed-tweet-actions"),u,t,r;
if(q){u=YDom.getElementsByClassName("drop","ul",q)[0];
if(u&&u!==m){if(m){LI.hide(m)
}r=YDom.getElementsByClassName("feed-tweet-retweet","span",q)[0]||q;
t=YDom.getXY(r);
t[0]-=4;
t[1]-=8;
LI.show(u);
YDom.setXY(u,t);
m=u
}}else{if(m){LI.hide(m);
m=null
}}}function j(q){g(YEvent.getTarget(q))
}function k(q){g(YEvent.getRelatedTarget(q))
}function d(q){YConn.asyncRequest("GET",f.bindCheckUrl,q)
}function n(){if(typeof(oUISettings)!=="undefined"&&oUISettings.saveSettings){oUISettings.saveSettings("showTwitterBindModal","false")
}}function h(r,q){if(!r){return null
}return(YDom.hasClass(r,q))?r:YDom.getAncestorByClassName(r,q)
}function i(r,q){if(b.showBindDialog){d({success:function(s){if(s.responseText==="false"){p(r,q)
}else{b.showBindDialog=false;
o(r,q);
n()
}}})
}else{o(r,q)
}}function p(s,q){var t=LI.addParams(f.bindDialogUrl,{action:s}),r=false;
LI.Dialog().open({name:"bindDialog",type:"task-modeless",className:"twitter-dialog",width:500,content:{title:LI.i18n.get("NusTweetActions-connect-your-twitter"),url:t},dependencies:LI.TwitterBindDialogDependencies});
if(LI.readCookie){r=!!LI.readCookie(c);
if(r){n();
if(LI.eraseCookie){LI.eraseCookie(c)
}}else{if(LI.createCookie){LI.createCookie(c,1,14)
}}}}function o(s,q){var r=LI.popup(q,{width:550,height:420});
if(r&&typeof WebTracking!=="undefined"){WebTracking.trackUserAction("NUS_twitter_"+s)
}}YEvent.on(e,"click",l);
YEvent.on(e,"mouseover",j);
YEvent.on(e,"mouseout",k)
}b.showBindDialog=false;
LI.NusTweetActions=b
})();/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.1
*/
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){
  if( LI.__HPA === true ) {
    console.info( 'HOMPAGE_PERFORMANCE_ANALYSIS :: lib/yui/2.8.1_li/dragdrop/dragdrop-min.js' );
  }
var A=YAHOO.util.Event,B=YAHOO.util.Dom;return{useShim:false,_shimActive:false,_shimState:false,_debugShim:false,_createShim:function(){var C=document.createElement("div");C.id="yui-ddm-shim";if(document.body.firstChild){document.body.insertBefore(C,document.body.firstChild);}else{document.body.appendChild(C);}C.style.display="none";C.style.backgroundColor="red";C.style.position="absolute";C.style.zIndex="99999";B.setStyle(C,"opacity","0");this._shim=C;A.on(C,"mouseup",this.handleMouseUp,this,true);A.on(C,"mousemove",this.handleMouseMove,this,true);A.on(window,"scroll",this._sizeShim,this,true);},_sizeShim:function(){if(this._shimActive){var C=this._shim;C.style.height=B.getDocumentHeight()+"px";C.style.width=B.getDocumentWidth()+"px";C.style.top="0";C.style.left="0";}},_activateShim:function(){if(this.useShim){if(!this._shim){this._createShim();}this._shimActive=true;var C=this._shim,D="0";if(this._debugShim){D=".5";}B.setStyle(C,"opacity",D);this._sizeShim();C.style.display="block";}},_deactivateShim:function(){this._shim.style.display="none";this._shimActive=false;},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){for(var F in this.ids){for(var C in this.ids[F]){var G=this.ids[F][C];if(!this.isTypeOfDD(G)){continue;}G[E].apply(G,D);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(C){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(D,C){if(!this.initialized){this.init();}if(!this.ids[C]){this.ids[C]={};}this.ids[C][D.id]=D;},removeDDFromGroup:function(E,C){if(!this.ids[C]){this.ids[C]={};}var D=this.ids[C];if(D&&D[E.id]){delete D[E.id];}},_remove:function(E){for(var D in E.groups){if(D){var C=this.ids[D];if(C&&C[E.id]){delete C[E.id];}}}delete this.handleIds[E.id];},regHandle:function(D,C){if(!this.handleIds[D]){this.handleIds[D]={};}this.handleIds[D][C]=C;},isDragDrop:function(C){return(this.getDDById(C))?true:false;},getRelated:function(H,D){var G=[];for(var F in H.groups){for(var E in this.ids[F]){var C=this.ids[F][E];if(!this.isTypeOfDD(C)){continue;}if(!D||C.isTarget){G[G.length]=C;}}}return G;},isLegalTarget:function(G,F){var D=this.getRelated(G,true);for(var E=0,C=D.length;E<C;++E){if(D[E].id==F.id){return true;}}return false;},isTypeOfDD:function(C){return(C&&C.__ygDragDrop);},isHandle:function(D,C){return(this.handleIds[D]&&this.handleIds[D][C]);},getDDById:function(D){for(var C in this.ids){if(this.ids[C][D]){return this.ids[C][D];}}return null;},handleMouseDown:function(E,D){this.currentTarget=YAHOO.util.Event.getTarget(E);this.dragCurrent=D;var C=D.getEl();this.startX=YAHOO.util.Event.getPageX(E);this.startY=YAHOO.util.Event.getPageY(E);this.deltaX=this.startX-C.offsetLeft;this.deltaY=this.startY-C.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var F=YAHOO.util.DDM;F.startDrag(F.startX,F.startY);F.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(C,E){if(this.dragCurrent&&this.dragCurrent.useShim){this._shimState=this.useShim;this.useShim=true;}this._activateShim();clearTimeout(this.clickTimeout);var D=this.dragCurrent;if(D&&D.events.b4StartDrag){D.b4StartDrag(C,E);D.fireEvent("b4StartDragEvent",{x:C,y:E});}if(D&&D.events.startDrag){D.startDrag(C,E);D.fireEvent("startDragEvent",{x:C,y:E});}this.dragThreshMet=true;},handleMouseUp:function(C){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(C);}this.fromTimeout=false;this.fireEvents(C,true);}else{}this.stopDrag(C);this.stopEvent(C);}},stopEvent:function(C){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(C);}if(this.preventDefault){YAHOO.util.Event.preventDefault(C);}},stopDrag:function(E,D){var C=this.dragCurrent;if(C&&!D){if(this.dragThreshMet){if(C.events.b4EndDrag){C.b4EndDrag(E);C.fireEvent("b4EndDragEvent",{e:E});}if(C.events.endDrag){C.endDrag(E);C.fireEvent("endDragEvent",{e:E});}}if(C.events.mouseUp){C.onMouseUp(E);C.fireEvent("mouseUpEvent",{e:E});}}if(this._shimActive){this._deactivateShim();if(this.dragCurrent&&this.dragCurrent.useShim){this.useShim=this._shimState;this._shimState=false;}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(F){var C=this.dragCurrent;if(C){if(YAHOO.env.ua.ie&&(YAHOO.env.ua.ie<9)&&!F.button){this.stopEvent(F);return this.handleMouseUp(F);}else{if(F.clientX<0||F.clientY<0){}}if(!this.dragThreshMet){var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F));var D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));if(E>this.clickPixelThresh||D>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(C&&C.events.b4Drag){C.b4Drag(F);C.fireEvent("b4DragEvent",{e:F});}if(C&&C.events.drag){C.onDrag(F);C.fireEvent("dragEvent",{e:F});}if(C){this.fireEvents(F,false);}}this.stopEvent(F);}},fireEvents:function(V,L){var a=this.dragCurrent;if(!a||a.isLocked()||a.dragOnly){return;}var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var S in this.dragOvers){var d=this.dragOvers[S];if(!this.isTypeOfDD(d)){continue;
}if(!this.isOverTarget(P,d,this.mode,U)){c.outEvts.push(d);}I[S]=true;delete this.dragOvers[S];}for(var R in a.groups){if("string"!=typeof R){continue;}for(S in this.ids[R]){var G=this.ids[R][S];if(!this.isTypeOfDD(G)){continue;}if(G.isTarget&&!G.isLocked()&&G!=a){if(this.isOverTarget(P,G,this.mode,U)){D[R]=true;if(L){c.dropEvts.push(G);}else{if(!I[G.id]){c.enterEvts.push(G);}else{c.overEvts.push(G);}this.dragOvers[G.id]=G;}}}}}this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};for(var C in D){Q.push(C);}if(L&&!c.dropEvts.length){this.interactionInfo.validDrop=false;if(a.events.invalidDrop){a.onInvalidDrop(V);a.fireEvent("invalidDropEvent",{e:V});}}for(S=0;S<E.length;S++){var Y=null;if(c[E[S]+"Evts"]){Y=c[E[S]+"Evts"];}if(Y&&Y.length){var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;if(this.mode){if(a.events[J]){a[J](V,Y,Q);a.fireEvent(J+"Event",{event:V,info:Y,group:Q});}if(a.events[W]){a[X](V,Y,Q);a.fireEvent(O,{event:V,info:Y,group:Q});}}else{for(var Z=0,T=Y.length;Z<T;++Z){if(a.events[J]){a[J](V,Y[Z].id,Q[0]);a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]});}if(a.events[W]){a[X](V,Y[Z].id,Q[0]);a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]});}}}}}},getBestMatch:function(E){var G=null;var D=E.length;if(D==1){G=E[0];}else{for(var F=0;F<D;++F){var C=E[F];if(this.mode==this.INTERSECT&&C.cursorIsOver){G=C;break;}else{if(!G||!G.overlap||(C.overlap&&G.overlap.getArea()<C.overlap.getArea())){G=C;}}}}return G;},refreshCache:function(D){var F=D||this.ids;for(var C in F){if("string"!=typeof C){continue;}for(var E in this.ids[C]){var G=this.ids[C][E];if(this.isTypeOfDD(G)){var H=this.getLocation(G);if(H){this.locationCache[G.id]=H;}else{delete this.locationCache[G.id];}}}}},verifyEl:function(D){try{if(D){var C=D.offsetParent;if(C){return true;}}}catch(E){}return false;},getLocation:function(H){if(!this.isTypeOfDD(H)){return null;}var F=H.getEl(),K,E,D,M,L,N,C,J,G;try{K=YAHOO.util.Dom.getXY(F);}catch(I){}if(!K){return null;}E=K[0];D=E+F.offsetWidth;M=K[1];L=M+F.offsetHeight;N=M-H.padding[0];C=D+H.padding[1];J=L+H.padding[2];G=E-H.padding[3];return new YAHOO.util.Region(N,C,J,G);},isOverTarget:function(K,C,E,F){var G=this.locationCache[C.id];if(!G||!this.useCache){G=this.getLocation(C);this.locationCache[C.id]=G;}if(!G){return false;}C.cursorIsOver=G.contains(K);var J=this.dragCurrent;if(!J||(!E&&!J.constrainX&&!J.constrainY)){return C.cursorIsOver;}C.overlap=null;if(!F){var H=J.getTargetCoord(K.x,K.y);var D=J.getDragEl();F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x);}var I=F.intersect(G);if(I){C.overlap=I;return(E)?true:C.cursorIsOver;}else{return false;}},_onUnload:function(D,C){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(D){var C=this.elementCache[D];if(!C||!C.el){C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));}return C;},getElement:function(C){return YAHOO.util.Dom.get(C);},getCss:function(D){var C=YAHOO.util.Dom.get(D);return(C)?C.style:null;},ElementWrapper:function(C){this.el=C||null;this.id=this.el&&C.id;this.css=this.el&&C.style;},getPosX:function(C){return YAHOO.util.Dom.getX(C);},getPosY:function(C){return YAHOO.util.Dom.getY(C);},swapNode:function(E,C){if(E.swapNode){E.swapNode(C);}else{var F=C.parentNode;var D=C.nextSibling;if(D==E){F.insertBefore(E,C);}else{if(C==E.nextSibling){F.insertBefore(C,E);}else{E.parentNode.replaceChild(C,E);F.insertBefore(E,D);}}}},getScroll:function(){var E,C,F=document.documentElement,D=document.body;if(F&&(F.scrollTop||F.scrollLeft)){E=F.scrollTop;C=F.scrollLeft;}else{if(D){E=D.scrollTop;C=D.scrollLeft;}else{}}return{top:E,left:C};},getStyle:function(D,C){return YAHOO.util.Dom.getStyle(D,C);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(C,E){var D=YAHOO.util.Dom.getXY(E);YAHOO.util.Dom.setXY(C,D);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(D,C){return(D-C);},_timeoutCount:0,_addListeners:function(){var C=YAHOO.util.DDM;if(YAHOO.util.Event&&document){C._onLoad();}else{if(C._timeoutCount>2000){}else{setTimeout(C._addListeners,10);if(document&&document.body){C._timeoutCount+=1;}}}},handleWasClicked:function(C,E){if(this.isHandle(E,C.id)){return true;}else{var D=C.parentNode;while(D){if(this.isHandle(E,D.id)){return true;}else{D=D.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,useShim:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);
}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);this.useShim=((this.config.useShim===true)?true:false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(J,I){var D=J.which||J.button;if(this.primaryButtonOnly&&D>1){return;}if(this.isLocked()){return;}var C=this.b4MouseDown(J),F=true;if(this.events.b4MouseDown){F=this.fireEvent("b4MouseDownEvent",J);}var E=this.onMouseDown(J),H=true;if(this.events.mouseDown){H=this.fireEvent("mouseDownEvent",J);}if((C===false)||(E===false)||(F===false)||(H===false)){return;}this.DDM.refreshCache(this.groups);var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(G,this)){}else{if(this.clickValidator(J)){this.setStartPosition();this.DDM.handleMouseDown(J,this);this.DDM.stopEvent(J);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);
}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return;}var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.8.1",build:"19"});LI.define("EnableNusEndorsements");
LI.EnableNusEndorsements=function(c,b){b=b||{};
b={dataURLTemplate:b.dataURLTemplate,dialogTitle:b.dialogTitle||"",dialogSrc:b.dialogSrc||""};
var a=function(e){YEvent.preventDefault(e);
var f=Math.floor((Math.random()*1000000)+1),g=LI.addParams(b.dataURLTemplate,{randomizeSuggestionsSeed:f});
LI.asyncRequest("GET",g,{success:function(i){var h;
if(i.responseText){h=i.responseText["suggested_member_skill_endorsements_for_multiple_members"];
if(h){if(h.connections&&h.connections.length){LI.SuggestedEndorsementsData={data:i,randomizationSeed:f};
LI.Dialog().open({content:{"title":b.dialogTitle,"url":b.dialogSrc},"width":545,"type":"task-modeless","className":"endorse-dialog dialog-v2","dependencies":LI.EndorseDialogDependencies});
return
}}}d()
},custom:{error:d,exception:d}})
};
var d=function(){if(c.href){window.location=c.href
}};
YEvent.on(c,"click",a)
};LI.define("WebMailNMP");
LI.WebMailNMP=function(a,b){var d={application:b.application||null};
var o=YDom.get(Y$(".service-providers",a));
var j=YDom.get(Y$(".service-providers input",a));
var n=YDom.get(Y$(".service-providers li",a));
var p=Y$('select[name="otherDomain"]',a)[0];
var f=Y$('input[name="defaultGmail"]',a)[0];
var i=Y$('input[name="defaultOther"]',a)[0];
var h=LI.i18n.getLocale().value;
var l=function(){m(this.value,f,i);
YEvent.on(j,"click",function(){m(this.value,f,i)
});
YEvent.on(p,"change",function(){var t=p.options[p.selectedIndex].text.replace(/\.com/,"");
if(t==="googlemail"){t="gmail"
}var u=false;
var r=null;
for(var s=0,q=j.length;
s<q;
s++){if(j[s].value==="other"){r=j[s]
}if(j[s].value===t){j[s].checked=true;
u=true
}}if(!u){r.checked=true
}})
};
var m=function(t,s,r){e();
for(var q=0;
j.length>q;
q++){if(j[q].checked){switch(j[q].value){case"yahoo":LI.show(Y$(".login-yahoo",a));
break;
case"hotmail":LI.show(Y$(".login-hotmail",a));
break;
case"aol":if(d.application==="registration"){LI.show(Y$(".login-aol",a))
}else{LI.show(Y$(".anti-pattern",a));
c(j[q].value)
}break;
case"gmail":LI.show(Y$(".anti-pattern",a));
if(h==="de_DE"){c("googlemail")
}else{k(p,s.value)
}break;
case"other":LI.show(Y$(".anti-pattern",a));
k(p,r.value);
break
}}}};
var e=function(){LI.hide(Y$(".login-yahoo",a));
LI.hide(Y$(".login-hotmail",a));
LI.hide(Y$(".login-aol",a));
LI.hide(Y$(".anti-pattern",a))
};
var g=function(){p.selectedIndex=0
};
var c=function(q){k(p,q+".com")
};
function k(v,u){var t=false;
for(var r=0,q=v.options.length;
r<q;
r++){var s=v.options[r];
if(s.text===u){v.selectedIndex=r;
t=true
}}if(!t){if(v!=null&&v.options!=null){v.options[v.options.length]=new Option(u,"",false,true);
v.selectedIndex=v.options.length-1
}}}l()
};var networkUpdatesShowMore=function(){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/network_updates.js ")
}var c,a;
var b=function(){YEvent.on(showHideLinks,"click",function(d){YEvent.preventDefault(d);
if(YDom.hasClass(this.parentNode,"digest-show")){YDom.removeClass(this.parentNode,"digest-show")
}else{YDom.addClass(this.parentNode,"digest-show")
}})
};
return{init:function(){c=YDom.getElementsByClassName("digest-item","li","body");
if(c==""){return
}showHideLinks=YDom.getElementsByClassName("digest-link","p","body");
b()
}}
}();
networkUpdatesShowMore.init();function CheckboxHelper(a,c){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/util/CheckboxHelper.js ")
}var c={toggleID:(c.toggleID)?c.toggleID:null,noMaster:(c.noMaster)?c.noMaster:null,inputClass:(c.inputClass)?c.inputClass:null,onState:{newClass:(c.onState.newClass)?c.onState.newClass:null,tag:(c.onState.tag)?c.onState.tag:null}};
if(!c.noMaster){if(c.toggleID){var b=YDom.get(c.toggleID)
}else{var b=YDom.getElementsBy(function(i){return i.type=="checkbox"
},"input",a)[0]
}YEvent.on(b,"click",g)
}if(c.inputClass){var e=YDom.getElementsByClassName(c.inputClass,"input",a)
}else{var e=YDom.getElementsBy(function(i){return i.type=="checkbox"
},"input",a)
}this.inputs=e;
if(c.onState){var h=c.onState.newClass;
var j=c.onState.tag;
for(var d=0;
e.length>d;
d++){if(e[d].checked){var f=YDom.getAncestorByTagName(e[d],j);
YDom.addClass(f,h)
}}}YEvent.on(e,"click",this.toggleOne,{cls:c.onState.newClass,tag:c.onState.tag});
function g(){if(this.checked){for(var k=0;
e.length>k;
k++){e[k].checked="checked";
if(c.onState){var l=YDom.getAncestorByTagName(e[k],j);
YDom.addClass(l,h)
}}}else{for(var k=0;
e.length>k;
k++){e[k].checked="";
if(c.onState){var l=YDom.getAncestorByTagName(e[k],j);
YDom.removeClass(l,h)
}}}}}CheckboxHelper.prototype={toggleOne:function(a,b){if(this.checked){var c=YDom.getAncestorByTagName(this,b.tag);
YDom.addClass(c,b.cls)
}else{var c=YDom.getAncestorByTagName(this,b.tag);
YDom.removeClass(c,b.cls)
}},isChecked:function(){var c=false,a=this.inputs;
for(var b=a.length;
b--;
){if(a[b].checked){c=true;
break
}}return c
}};function DropList(d,b){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/util/DropList.js ")
}b=b||{};
b={actionableNode:b.actionableNode||null,actionType:b.actionType||"click",skipStopPropOnClassName:b.skipStopPropOnClassName||null,disableOnClassName:b.disableOnClassName||null};
this.open=function(g){YDom.addClass(this,"open");
YDom.setStyle(this,"position","relative")
};
this.close=function(g,h){LI.DropListMgr.closeAll();
YDom.removeClass(h,"open");
YDom.setStyle(h,"position","static")
};
this.toggle=function(g,h){var i=(YAHOO.lang.isArray(h))?h[0]:h;
if(b.disableOnClassName&&YDom.hasClass(d,b.disableOnClassName)){return
}if(YDom.hasClass(i,"open")){YDom.removeClass(i,"open");
YDom.setStyle(i,"position","static");
this.onToggleClose.fire({evt:g})
}else{LI.DropListMgr.closeAll();
LI.DropListMgr.add(i);
YDom.addClass(i,"open");
YDom.setStyle(i,"position","relative")
}};
var a=function(g,h){var i=YEvent.getTarget(g),j=b.skipStopPropOnClassName;
if(!j||!YDom.hasClass(i,j)){YEvent.stopPropagation(g)
}this.toggle(g,h)
};
this.onToggleClose=new YAHOO.util.CustomEvent("dropListToggleClose");
var f=(b.actionableNode)?YDom.get(b.actionableNode):YDom.getElementsByClassName("droplist","*",d),e=function(g){YEvent.preventDefault(g)
};
if(YDom.hasClass(d,"droplist")){f.push(d)
}if(b.actionType&&b.actionType=="click"){for(var c=0;
f.length>c;
c++){YEvent.on(Y$("a",f[c])[0],"click",e)
}YEvent.on(document,"click",this.close,f);
if(!b.skipStopPropOnClassName){YEvent.on(f,"click",YEvent.stopPropagation);
YEvent.on(f,"click",this.toggle,f,this)
}else{YEvent.on(f,"click",a,f,this)
}}else{YEvent.on(f,"mouseover",this.open);
YEvent.on(f,"mouseout",this.close,f)
}}LI.define("DropListMgr");
LI.DropListMgr=(function(){var a=[];
return{add:function(b){a.push(b)
},closeAll:function(){YDom.removeClass(a,"open");
YDom.setStyle(a,"position","static");
a=[]
}}
})();LI.define("ToggleClassOnHover");
LI.ToggleClassOnHover=function(b,a){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/util/ToggleClassOnHover.js ")
}a={nodes:(a&&a.nodes)?a.nodes:b,targetSelector:(a&&a.targetSelector)?a.targetSelector:null,toggleClassName:(a&&a.toggleClassName)?a.toggleClassName:"hover"};
YEvent.on(a.nodes,"mouseover",function(){var c=a.targetSelector?Y$(a.targetSelector,this):this;
YDom.addClass(c,a.toggleClassName)
});
YEvent.on(a.nodes,"mouseout",function(c){var d=a.targetSelector?Y$(a.targetSelector,this):this;
YDom.removeClass(d,a.toggleClassName)
})
};LI.define("PymkRiver");
LI.PymkRiver=function(a,x){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/PMYKRiver.js")
}var o=this;
x=x||{};
x={riverHasDropList:(x.riverHasDropList===true)?true:false};
var k=0;
var s=false;
var g=true;
var j=false;
var e=[];
var w={};
this.onBeforeRowRemoved=new YAHOO.util.CustomEvent("beforeRowRemoved");
this.onRowRemoved=new YAHOO.util.CustomEvent("rowRemoved");
this.onRowAdded=new YAHOO.util.CustomEvent("rowAdded");
this.onNoMoreRows=new YAHOO.util.CustomEvent("noMoreRows");
this.onErrorMessageReceived=new YAHOO.util.CustomEvent("errorMessageReceived");
function n(i){return Y$("li.vcard.extra-row:first",i,true)
}function q(i){return Y$("li.vcard.extra-row",i)
}function v(){return Y$("li.vcard:not(.extra-row)",a)
}function y(){return Y$("li.vcard",a)
}function p(){if(!j){YDom.setStyle(a,"height",YDom.getStyle(a,"height"));
j=true
}}function t(){var i=v();
if(j&&!s&&(k==i.length||!g)){YDom.setStyle(a,"height","");
j=false
}}function z(A){YEvent.stopEvent(A);
var i=YEvent.getTarget(A);
if(!YDom.hasClass(i,"remove-row")||!i.nodeName=="A"){return
}var B=YDom.getAncestorByClassName(i,"vcard");
l(B)
}function l(B,i){var D=B,A=i||Y$(".remove-row",B)[0].href;
if(YDom.hasClass(D,"removing-row")){return
}YDom.addClass(D,"removing-row");
o.onBeforeRowRemoved.fire(D);
p();
e.push(A);
d();
var C=new YAnim(D,{opacity:{to:0}},0.3);
C.onComplete.subscribe(function(){YDom.setStyle(D,"height",D.clientHeight);
YDom.setStyle(D,"min-height","0");
var E=new YAnim(D,{height:{to:0}},0.3);
E.onComplete.subscribe(function(){D.parentNode.removeChild(D);
o.onRowRemoved.fire(D);
if(YDom.hasClass(D,"first")){var F=Y$("li.vcard:first",a,true);
if(F){YDom.addClass(F,"first")
}}b()
});
E.animate()
});
C.animate()
}function b(){var A=v();
var C=n();
if(C){var i,D;
YDom.removeClass(C,"extra-row");
i=parseInt(YDom.getStyle(C,"height"));
D=YDom.getStyle(C,"min-height");
YDom.setStyle(C,"height","0");
YDom.setStyle(C,"min-height","0");
YDom.setStyle(C,"display","block");
var B=new YAnim(C,{height:{to:i}},0.5);
B.onComplete.subscribe(function(){YDom.removeClass(C,"extra-row");
YDom.setStyle(C,"height","");
YDom.setStyle(C,"display","");
YDom.setStyle(C,"min-height",D);
t();
o.onRowAdded.fire(C)
});
B.animate()
}else{if(A.length===0){o.onNoMoreRows.fire(a)
}t()
}}function d(){if(s){return
}s=true;
var i=e.shift();
if(!i){s=false;
return
}var A=i.split("?");
if(A.length>0){i=A[0];
A=A[1]
}else{A=""
}YAHOO.util.Connect.initHeader("X-IsAJAXForm","1");
YAHOO.util.Connect.asyncRequest("POST",i,{success:function(B){var J=B.responseText,D;
try{D=LI.parseJSON(J);
J=D.content||""
}catch(I){J=""
}var E,L;
E=document.createElement("div");
E.innerHTML=J;
L=q(E);
empty=Y$("#no-results",E,true);
var K;
for(var F=0,H=L.length;
F<H;
F++){K=L[F];
if(!K.id.match(/[0-9]/)||!w[K.id]){YDom.removeClass(K,"first");
a.appendChild(K);
LI.Controls.parseFragment(K);
w[K.id]=true
}}var G=q();
if(G.length===0){g=false;
o.onNoMoreRows.fire(a);
if(empty){t();
o.onErrorMessageReceived.fire(empty)
}}else{var C=v();
if(C.length<k){b()
}}E=null;
s=false;
d()
},failure:function(B){s=false;
d()
},cache:false},A)
}var m=y();
k=v().length;
var h,c;
if(!x.riverHasDropList){YEvent.addListener(a,"click",function(A){var i=YEvent.getTarget(A);
if(YDom.hasClass(i,"remove-row")&&i.nodeName=="A"){YEvent.stopEvent(A);
z(A)
}})
}for(var r=0,u=m.length;
r<u;
r++){h=m[r];
if(h.id.match(/[0-9]/)){w[h.id]=true
}if(x.riverHasDropList){c=LI.Controls.getControl(Y$(".remove-list",m[r],true).id,"DropList");
c.onToggleClose.subscribe(function(i,B){var A=B[0].evt,C=YEvent.getTarget(A);
if(YDom.hasClass(C,"remove-row")&&C.nodeName=="A"){YEvent.stopEvent(A);
z(A)
}})
}}o.hideRow=l;
(function f(){if(LI.PymkRiverExperiment){return
}LI.PymkRiverExperiment=true;
var A=YDom.get("pymk"),E=YDom.hasClass,C=0,i="ontouchstart" in document.documentElement?"touchend":"click";
if(E(A,"pymk-new-design")){var G=E(A,"refresh-to-full"),H=E(A,"click-to-profile"),D=E(A,"click-to-connect"),B=E(A,"click-to-full-pymk"),I=E(A,"ignore-to-pymk"),F=Y$("#pymk .header")[0];
YEvent.on(F,i,function(){window.location.href=YDom.getAttribute(F,"data-url")
});
if(I){YEvent.addListener(a,i,function(K){var J=YEvent.getTarget(K),L=J.nodeName.toLowerCase();
if(E(J,"remove-row")&&L==="a"){if(++C>=2){window.location.href=YDom.getAttribute(F,"data-url-item")
}}})
}if(H||D||B){YEvent.addListener(a,i,function(M){var L=YEvent.getTarget(M),N=L.nodeName.toLowerCase(),J="nmp_pymk_click_result",K;
if(E(L,"vcard")&&N==="li"){if(B){window.location.href=YDom.getAttribute(F,"data-url-item-click")
}else{if(H){K=YDom.getAttribute(YDom.getChildren(L)[0],"href");
K=K.replace("nmp_pymk_photo",J);
window.location.href=K
}else{if(D){K=YDom.getAttribute(YDom.getFirstChild(YDom.getChildren(L)[2]),"href");
K=K.replace("nmp_pymk_connect",J);
window.location.href=K
}}}}})
}}})()
};