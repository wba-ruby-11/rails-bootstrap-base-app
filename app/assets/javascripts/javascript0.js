LI.define("Registration.PostToUAS");
LI.Registration.PostToUAS=function(b){var f=b.responseText,e=b.successParameters.postUrl,d=b.successParameters.uasLoginErrorUrl,c=YAHOO.lang.JSON.parse(f),g=YDom.get("email-coldRegistrationForm").value,i={custom:{error:function(){var j=document.getElementById("global-error");
j.style.display="none";
d=d+"&emailAddress="+encodeURIComponent(g);
if(c.goback){d=d+"&session_redirect="+encodeURIComponent(c.goback)
}window.location=d
}},timeout:25000},h=YDom.get("password-coldRegistrationForm").value,a="session_key="+LI.htmlEncode(g)+"&session_password="+LI.htmlEncode(h);
if(c.goback){e=LI.addParams(e,{"session_redirect":c.goback})
}LI.asyncRequest("POST",e,i,a)
};/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.1
*/
(function(){var l=YAHOO.lang,isFunction=l.isFunction,isObject=l.isObject,isArray=l.isArray,_toStr=Object.prototype.toString,Native=(YAHOO.env.ua.caja?window:this).JSON,_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/^[\],:{}\s]*$/,_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},UNDEFINED="undefined",OBJECT="object",NULL="null",STRING="string",NUMBER="number",BOOLEAN="boolean",DATE="date",_allowable={"undefined":UNDEFINED,"string":STRING,"[object String]":STRING,"number":NUMBER,"[object Number]":NUMBER,"boolean":BOOLEAN,"[object Boolean]":BOOLEAN,"[object Date]":DATE,"[object RegExp]":OBJECT},EMPTY="",OPEN_O="{",CLOSE_O="}",OPEN_A="[",CLOSE_A="]",COMMA=",",COMMA_CR=",\n",CR="\n",COLON=":",COLON_SP=": ",QUOTE='"';Native=_toStr.call(Native)==="[object JSON]"&&Native;function _char(c){if(!_CHARS[c]){_CHARS[c]="\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}return _CHARS[c];}function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(l.hasOwnProperty(value,k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function _prepare(s){return s.replace(_UNICODE_EXCEPTIONS,_char);}function _isSafe(str){return l.isString(str)&&_UNSAFE.test(str.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""));}function _parse(s,reviver){s=_prepare(s);if(_isSafe(s)){return _revive(eval("("+s+")"),reviver);}throw new SyntaxError("JSON.parse");}function _type(o){var t=typeof o;return _allowable[t]||_allowable[_toStr.call(o)]||(t===OBJECT?(o?OBJECT:NULL):UNDEFINED);}function _string(s){return QUOTE+s.replace(_SPECIAL_CHARS,_char)+QUOTE;}function _indent(s,space){return s.replace(/^/gm,space);}function _stringify(o,w,space){if(o===undefined){return undefined;}var replacer=isFunction(w)?w:null,format=_toStr.call(space).match(/String|Number/)||[],_date=YAHOO.lang.JSON.dateToString,stack=[],tmp,i,len;if(replacer||!isArray(w)){w=undefined;}if(w){tmp={};for(i=0,len=w.length;i<len;++i){tmp[w[i]]=true;}w=tmp;}space=format[0]==="Number"?new Array(Math.min(Math.max(0,space),10)+1).join(" "):(space||EMPTY).slice(0,10);function _serialize(h,key){var value=h[key],t=_type(value),a=[],colon=space?COLON_SP:COLON,arr,i,keys,k,v;if(isObject(value)&&isFunction(value.toJSON)){value=value.toJSON(key);}else{if(t===DATE){value=_date(value);}}if(isFunction(replacer)){value=replacer.call(h,key,value);}if(value!==h[key]){t=_type(value);}switch(t){case DATE:case OBJECT:break;case STRING:return _string(value);case NUMBER:return isFinite(value)?value+EMPTY:NULL;case BOOLEAN:return value+EMPTY;case NULL:return NULL;default:return undefined;}for(i=stack.length-1;i>=0;--i){if(stack[i]===value){throw new Error("JSON.stringify. Cyclical reference");}}arr=isArray(value);stack.push(value);if(arr){for(i=value.length-1;i>=0;--i){a[i]=_serialize(value,i)||NULL;}}else{keys=w||value;i=0;for(k in keys){if(keys.hasOwnProperty(k)){v=_serialize(value,k);if(v){a[i++]=_string(k)+colon+v;}}}}stack.pop();if(space&&a.length){return arr?OPEN_A+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_A:OPEN_O+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_O;}else{return arr?OPEN_A+a.join(COMMA)+CLOSE_A:OPEN_O+a.join(COMMA)+CLOSE_O;}}return _serialize({"":o},"");}YAHOO.lang.JSON={useNativeParse:!!Native,useNativeStringify:!!Native,isSafe:function(s){return _isSafe(_prepare(s));},parse:function(s,reviver){return Native&&YAHOO.lang.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);},stringify:function(o,w,space){return Native&&YAHOO.lang.JSON.useNativeStringify?Native.stringify(o,w,space):_stringify(o,w,space);},dateToString:function(d){function _zeroPad(v){return v<10?"0"+v:v;}return d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+COLON+_zeroPad(d.getUTCMinutes())+COLON+_zeroPad(d.getUTCSeconds())+"Z";},stringToDate:function(str){var m=str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);if(m){var d=new Date();d.setUTCFullYear(m[1],m[2]-1,m[3]);d.setUTCHours(m[4],m[5],m[6],(m[7]||0));return d;}return str;}};YAHOO.lang.JSON.isValid=YAHOO.lang.JSON.isSafe;})();YAHOO.register("json",YAHOO.lang.JSON,{version:"2.8.1",build:"19"});LI.define("FrontierAJAXForm");
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
};LI.define("GhostLabel");
LI.GhostLabel=function(c,r){var h=YDom.get(c.htmlFor),j,a,g="password",b=!!("placeholder" in document.createElement("input")&&"placeholder" in document.createElement("textarea")),o="ghost-hide",l="ghost-show",e="hint",i="clone-hint",k=this;
r=r||{};
r={placeholder:(YAHOO&&YAHOO.lang&&YAHOO.lang.trim)?YAHOO.lang.trim(r.placeholder||c.firstChild.nodeValue):(r.placeholder||c.firstChild.nodeValue),showLabel:r.showLabel||false,isDefault:r.isDefault||false};
if(b){h.setAttribute("placeholder",r.placeholder)
}var s=function(){if(!b){if(r.placeholder&&h.value===""){if(h.type===g){if(!j){j=document.createElement("input");
j.type="text";
j.value=r.placeholder;
YDom.addClass(j,e);
YDom.addClass(j,i);
YDom.addClass(j,YDom.getAttribute(h,"class"));
j.setAttribute("tabindex",h.getAttribute("tabindex"));
YDom.insertAfter(j,h);
a=true;
YEvent.on(j,"focus",t)
}if(!a){YDom.removeClass(j,o);
YDom.removeClass(h,l)
}YDom.addClass(j,l);
YDom.addClass(h,o);
a=true
}YDom.addClass(h,e);
h.value=r.placeholder
}}};
var t=function(){if(!b){if(r.placeholder&&(h.value===r.placeholder)&&YDom.hasClass(h,e)){if(j&&h.type===g){if(a){YDom.removeClass(j,l);
YDom.removeClass(h,o)
}YDom.addClass(j,o);
YDom.addClass(h,l);
a=false;
h.focus()
}h.value="";
YDom.removeClass(h,e)
}}};
var d=function(){if(b){if(h.value===""){return true
}}else{if(YDom.hasClass(h,e)){return true
}}return false
};
var p=function(u){r.placeholder=u
};
var q=function(){return r.placeholder
};
var f=function(u){if(b){h.setAttribute("placeholder",r.placeholder)
}else{if(u){if(d()){h.value=r.placeholder
}}else{h.value=r.placeholder;
YDom.addClass(h,e)
}}};
var m=function(){if(r.isDefault){if(h.value===""){h.value=r.placeholder
}}else{t()
}};
var n=function(){var u=h.form;
if(!r.showLabel){LI.hide(c)
}if(!b){if(h.type!==g){YEvent.on(h,"focus",t)
}YEvent.on(h,"blur",s);
if(r.placeholder&&(h.value===r.placeholder)){h.value="";
YDom.removeClass(h,e)
}s()
}if(u){YEvent.on(u,"submit",m)
}if(u&&u.id&&h.id){LI.GhostLabel.Manager.register(u.id,h.id,k)
}};
n();
this.showGhostLabel=s;
this.hideGhostLabel=t;
this.setLabel=p;
this.getLabel=q;
this.updateLabel=f;
this.isGhostLabelVisible=d
};
LI.GhostLabel.Manager={registry:{},register:function(c,a,b){if(!this.registry[c]){this.registry[c]={}
}this.registry[c][a]=b
},destroy:function(b,a){if(this.registry[b][a]){delete this.registry[b][a]
}},show:function(b){if(this.registry[b]){for(var a in this.registry[b]){if(YAHOO.lang.hasOwnProperty(this.registry[b],a)){this.registry[b][a].showGhostLabel()
}}}},hide:function(b){if(this.registry[b]){for(var a in this.registry[b]){if(YAHOO.lang.hasOwnProperty(this.registry[b],a)){this.registry[b][a].hideGhostLabel()
}}}}};LI.define("Login");
LI.Login=function(g,d){d=d||{};
d={autoFocus:(d.autoFocus!==false)?true:false,disableSubmit:d.disableSubmit||false,submitId:d.submitId||"btn-login",showErrorOnLoad:d.showErrorOnLoad||false,errorOnLoadMessage:d.errorOnLoadMessage||"",resetPasswordURL:d.resetPasswordURL||"",passwordReminderMessage:d.passwordReminderMessage||""};
var b=YDom.getElementsBy(function(i){return(i.type==="text"||i.type==="password")
},"input",g),a=YDom.get(d.submitId);
function c(){for(var k=0,j=b.length;
k<j;
k++){if(b[k].value===""){b[k].focus();
break
}}}function f(){if(b[0].value!==""&&b[1].value!==""){a.disabled=false
}else{a.disabled=true
}}function e(){var k={},m,n,p,l,j,o;
k["session_password-login"]=d.errorOnLoadMessage;
for(m=0,l=YDom.getElementsByClassName("error","span"),j=l.length;
m<j;
m++){o=l[m];
n=o.id.replace(/-error$/,"");
if(k[n]){o.innerHTML=k[n]+'<a class="reg-autologin-error" id="password-reminder" href="'+d.resetPasswordURL+'">'+d.passwordReminderMessage+"</a>"+"<br>"
}else{o.innerHTML=""
}}p=YDom.get("session_password-login");
YDom.addClass(p,"error");
p.focus()
}if(d.autoFocus){c()
}if(d.disableSubmit){f();
var h=setInterval(f,100)
}if(d.showErrorOnLoad){e()
}YEvent.onDOMReady(function(m){var j=YDom.get("password-reminder"),l=j.href,k=YDom.get("session_key-login");
function i(n){var o=k.value;
YEvent.getTarget(n).href=(LI.patterns.email.test(o))?LI.addParams(l,{"email":o}):l
}YEvent.addListener(j,"click",i,true)
})
};
(function(){function a(){var e,c,f=["recaptcha_reload_btn","recaptcha_switch_audio_btn","recaptcha_switch_img_btn","recaptcha_whatsthis_btn"],d,b=f.length;
for(d=0;
d<b;
d++){e=f[d];
c=YDom.get(e);
if(c){c.setAttribute("href","#")
}}}YEvent.onContentReady("recaptcha_reload_btn",a)
})();/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.8.1
*/
/**
 * The Connection Manager provides a simplified interface to the XMLHttpRequest
 * object.  It handles cross-browser instantiantion of XMLHttpRequest, negotiates the
 * interactive states and server response, returning the results to a pre-defined
 * callback you create.
 *
 * @namespace YAHOO.util
 * @module connection
 * @requires yahoo
 * @requires event
 */

/**
 * The Connection Manager singleton provides methods for creating and managing
 * asynchronous transactions.
 *
 * @class Connect
 */

YAHOO.util.Connect =
{
  /**
   * @description Array of MSFT ActiveX ids for XMLHttpRequest.
   * @property _msxml_progid
   * @private
   * @static
   * @type array
   */
	_msxml_progid:[
		'Microsoft.XMLHTTP',
		'MSXML2.XMLHTTP.3.0',
		'MSXML2.XMLHTTP'
		],

  /**
   * @description Object literal of HTTP header(s)
   * @property _http_header
   * @private
   * @static
   * @type object
   */
	_http_headers:{},

  /**
   * @description Determines if HTTP headers are set.
   * @property _has_http_headers
   * @private
   * @static
   * @type boolean
   */
	_has_http_headers:false,

 /**
  * @description Determines if a default header of
  * Content-Type of 'application/x-www-form-urlencoded'
  * will be added to any client HTTP headers sent for POST
  * transactions.
  * @property _use_default_post_header
  * @private
  * @static
  * @type boolean
  */
    _use_default_post_header:true,

 /**
  * @description The default header used for POST transactions.
  * @property _default_post_header
  * @private
  * @static
  * @type boolean
  */
    _default_post_header:'application/x-www-form-urlencoded; charset=UTF-8',

 /**
  * @description The default header used for transactions involving the
  * use of HTML forms.
  * @property _default_form_header
  * @private
  * @static
  * @type boolean
  */
    _default_form_header:'application/x-www-form-urlencoded',

 /**
  * @description Determines if a default header of
  * 'X-Requested-With: XMLHttpRequest'
  * will be added to each transaction.
  * @property _use_default_xhr_header
  * @private
  * @static
  * @type boolean
  */
    _use_default_xhr_header:true,

 /**
  * @description The default header value for the label
  * "X-Requested-With".  This is sent with each
  * transaction, by default, to identify the
  * request as being made by YUI Connection Manager.
  * @property _default_xhr_header
  * @private
  * @static
  * @type boolean
  */
    _default_xhr_header:'XMLHttpRequest',

 /**
  * @description Determines if custom, default headers
  * are set for each transaction.
  * @property _has_default_header
  * @private
  * @static
  * @type boolean
  */
    _has_default_headers:true,

 /**
  * @description Determines if custom, default headers
  * are set for each transaction.
  * @property _has_default_header
  * @private
  * @static
  * @type boolean
  */
    _default_headers:{},

 /**
  * @description Collection of polling references to the polling mechanism in handleReadyState.
  * @property _poll
  * @private
  * @static
  * @type object
  */
    _poll:{},

 /**
  * @description Queue of timeout values for each transaction callback with a defined timeout value.
  * @property _timeOut
  * @private
  * @static
  * @type object
  */
    _timeOut:{},

  /**
   * @description The polling frequency, in milliseconds, for HandleReadyState.
   * when attempting to determine a transaction's XHR readyState.
   * The default is 50 milliseconds.
   * @property _polling_interval
   * @private
   * @static
   * @type int
   */
     _polling_interval:50,

  /**
   * @description A transaction counter that increments the transaction id for each transaction.
   * @property _transaction_id
   * @private
   * @static
   * @type int
   */
     _transaction_id:0,

  /**
   * @description Custom event that fires at the start of a transaction
   * @property startEvent
   * @private
   * @static
   * @type CustomEvent
   */
	startEvent: new YAHOO.util.CustomEvent('start'),

  /**
   * @description Custom event that fires when a transaction response has completed.
   * @property completeEvent
   * @private
   * @static
   * @type CustomEvent
   */
	completeEvent: new YAHOO.util.CustomEvent('complete'),

  /**
   * @description Custom event that fires when handleTransactionResponse() determines a
   * response in the HTTP 2xx range.
   * @property successEvent
   * @private
   * @static
   * @type CustomEvent
   */
	successEvent: new YAHOO.util.CustomEvent('success'),

  /**
   * @description Custom event that fires when handleTransactionResponse() determines a
   * response in the HTTP 4xx/5xx range.
   * @property failureEvent
   * @private
   * @static
   * @type CustomEvent
   */
	failureEvent: new YAHOO.util.CustomEvent('failure'),

  /**
   * @description Custom event that fires when a transaction is successfully aborted.
   * @property abortEvent
   * @private
   * @static
   * @type CustomEvent
   */
	abortEvent: new YAHOO.util.CustomEvent('abort'),

  /**
   * @description A reference table that maps callback custom events members to its specific
   * event name.
   * @property _customEvents
   * @private
   * @static
   * @type object
   */
	_customEvents:
	{
		onStart:['startEvent', 'start'],
		onComplete:['completeEvent', 'complete'],
		onSuccess:['successEvent', 'success'],
		onFailure:['failureEvent', 'failure'],
		onUpload:['uploadEvent', 'upload'],
		onAbort:['abortEvent', 'abort']
	},

  /**
   * @description Member to add an ActiveX id to the existing xml_progid array.
   * In the event(unlikely) a new ActiveX id is introduced, it can be added
   * without internal code modifications.
   * @method setProgId
   * @public
   * @static
   * @param {string} id The ActiveX id to be added to initialize the XHR object.
   * @return void
   */
	setProgId:function(id)
	{
		this._msxml_progid.unshift(id);
	},

  /**
   * @description Member to override the default POST header.
   * @method setDefaultPostHeader
   * @public
   * @static
   * @param {boolean} b Set and use default header - true or false .
   * @return void
   */
	setDefaultPostHeader:function(b)
	{
		if(typeof b == 'string'){
			this._default_post_header = b;
		}
		else if(typeof b == 'boolean'){
			this._use_default_post_header = b;
		}
	},

  /**
   * @description Member to override the default transaction header..
   * @method setDefaultXhrHeader
   * @public
   * @static
   * @param {boolean} b Set and use default header - true or false .
   * @return void
   */
	setDefaultXhrHeader:function(b)
	{
		if(typeof b == 'string'){
			this._default_xhr_header = b;
		}
		else{
			this._use_default_xhr_header = b;
		}
	},

  /**
   * @description Member to modify the default polling interval.
   * @method setPollingInterval
   * @public
   * @static
   * @param {int} i The polling interval in milliseconds.
   * @return void
   */
	setPollingInterval:function(i)
	{
		if(typeof i == 'number' && isFinite(i)){
			this._polling_interval = i;
		}
	},

  /**
   * @description Instantiates a XMLHttpRequest object and returns an object with two properties:
   * the XMLHttpRequest instance and the transaction id.
   * @method createXhrObject
   * @private
   * @static
   * @param {int} transactionId Property containing the transaction id for this transaction.
   * @return object
   */
	createXhrObject:function(transactionId)
	{
		var obj,http,i;
		try
		{
			// Instantiates XMLHttpRequest in non-IE browsers and assigns to http.
			http = new XMLHttpRequest();
			//  Object literal with http and tId properties
			obj = { conn:http, tId:transactionId, xhr: true };
		}
		catch(e)
		{
			for(i=0; i<this._msxml_progid.length; ++i){
				try
				{
					// Instantiates XMLHttpRequest for IE and assign to http
					http = new ActiveXObject(this._msxml_progid[i]);
					//  Object literal with conn and tId properties
					obj = { conn:http, tId:transactionId, xhr: true };
					break;
				}
				catch(e1){}
			}
		}
		finally
		{
			return obj;
		}
	},

  /**
   * @description This method is called by asyncRequest to create a
   * valid connection object for the transaction.  It also passes a
   * transaction id and increments the transaction id counter.
   * @method getConnectionObject
   * @private
   * @static
   * @return {object}
   */
	getConnectionObject:function(t)
	{
		var o, tId = this._transaction_id;

		try
		{
			if(!t){
				o = this.createXhrObject(tId);
			}
			else{
				o = {tId:tId};
				if(t==='xdr'){
					o.conn = this._transport;
					o.xdr = true;
				}
				else if(t==='upload'){
					o.upload = true;
				}
			}

			if(o){
				this._transaction_id++;
			}
		}
		catch(e){}
		return o;
	},

  /**
   * @description Method for initiating an asynchronous request via the XHR object.
   * @method asyncRequest
   * @public
   * @static
   * @param {string} method HTTP transaction method
   * @param {string} uri Fully qualified path of resource
   * @param {callback} callback User-defined callback function or object
   * @param {string} postData POST body
   * @return {object} Returns the connection object
   */
	asyncRequest:function(method, uri, callback, postData)
	{
		var o,t,args = (callback && callback.argument)?callback.argument:null;

		if(this._isFileUpload){
			t = 'upload';
		}
		else if(callback.xdr){
			t = 'xdr';
		}

		o = this.getConnectionObject(t);
		if(!o){
			return null;
		}
		else{

			// Intialize any transaction-specific custom events, if provided.
			if(callback && callback.customevents){
				this.initCustomEvents(o, callback);
			}

			if(this._isFormSubmit){
				if(this._isFileUpload){
					this.uploadFile(o, callback, uri, postData);
					return o;
				}

				// If the specified HTTP method is GET, setForm() will return an
				// encoded string that is concatenated to the uri to
				// create a querystring.
				if(method.toUpperCase() == 'GET'){
					if(this._sFormData.length !== 0){
						// If the URI already contains a querystring, append an ampersand
						// and then concatenate _sFormData to the URI.
						uri += ((uri.indexOf('?') == -1)?'?':'&') + this._sFormData;
					}
				}
				else if(method.toUpperCase() == 'POST'){
					// If POST data exist in addition to the HTML form data,
					// it will be concatenated to the form data.
					postData = postData?this._sFormData + "&" + postData:this._sFormData;
				}
			}

			if(method.toUpperCase() == 'GET' && (callback && callback.cache === false)){
				// If callback.cache is defined and set to false, a
				// timestamp value will be added to the querystring.
				uri += ((uri.indexOf('?') == -1)?'?':'&') + "rnd=" + new Date().valueOf().toString();
			}

			// Each transaction will automatically include a custom header of
			// "X-Requested-With: XMLHttpRequest" to identify the request as
			// having originated from Connection Manager.
			if(this._use_default_xhr_header){
				if(!this._default_headers['X-Requested-With']){
					this.initHeader('X-Requested-With', this._default_xhr_header, true);
				}
			}

			//If the transaction method is POST and the POST header value is set to true
			//or a custom value, initalize the Content-Type header to this value.
			if((method.toUpperCase() === 'POST' && this._use_default_post_header) && this._isFormSubmit === false){
				this.initHeader('Content-Type', this._default_post_header);
			}

			if(o.xdr){
				this.xdr(o, method, uri, callback, postData);
				return o;
			}

			o.conn.open(method, uri, true);
			//Initialize all default and custom HTTP headers,
			if(this._has_default_headers || this._has_http_headers){
				this.setHeader(o);
			}

			this.handleReadyState(o, callback);
			o.conn.send(postData || '');

			// Reset the HTML form data and state properties as
			// soon as the data are submitted.
			if(this._isFormSubmit === true){
				this.resetFormState();
			}

			// Fire global custom event -- startEvent
			this.startEvent.fire(o, args);

			if(o.startEvent){
				// Fire transaction custom event -- startEvent
				o.startEvent.fire(o, args);
			}

			return o;
		}
	},

  /**
   * @description This method creates and subscribes custom events,
   * specific to each transaction
   * @method initCustomEvents
   * @private
   * @static
   * @param {object} o The connection object
   * @param {callback} callback The user-defined callback object
   * @return {void}
   */
	initCustomEvents:function(o, callback)
	{
		var prop;
		// Enumerate through callback.customevents members and bind/subscribe
		// events that match in the _customEvents table.
		for(prop in callback.customevents){
			if(this._customEvents[prop][0]){
				// Create the custom event
				o[this._customEvents[prop][0]] = new YAHOO.util.CustomEvent(this._customEvents[prop][1], (callback.scope)?callback.scope:null);

				// Subscribe the custom event
				o[this._customEvents[prop][0]].subscribe(callback.customevents[prop]);
			}
		}
	},

  /**
   * @description This method serves as a timer that polls the XHR object's readyState
   * property during a transaction, instead of binding a callback to the
   * onreadystatechange event.  Upon readyState 4, handleTransactionResponse
   * will process the response, and the timer will be cleared.
   * @method handleReadyState
   * @private
   * @static
   * @param {object} o The connection object
   * @param {callback} callback The user-defined callback object
   * @return {void}
   */

    handleReadyState:function(o, callback)

    {
		var oConn = this,
			args = (callback && callback.argument)?callback.argument:null;

		if(callback && callback.timeout){
			this._timeOut[o.tId] = window.setTimeout(function(){ oConn.abort(o, callback, true); }, callback.timeout);
		}

		this._poll[o.tId] = window.setInterval(
			function(){
				if(o.conn && o.conn.readyState === 4){

					// Clear the polling interval for the transaction
					// and remove the reference from _poll.
					window.clearInterval(oConn._poll[o.tId]);
					delete oConn._poll[o.tId];

					if(callback && callback.timeout){
						window.clearTimeout(oConn._timeOut[o.tId]);
						delete oConn._timeOut[o.tId];
					}

					// Fire global custom event -- completeEvent
					oConn.completeEvent.fire(o, args);

					if(o.completeEvent){
						// Fire transaction custom event -- completeEvent
						o.completeEvent.fire(o, args);
					}

					oConn.handleTransactionResponse(o, callback);
				}
			}
		,this._polling_interval);
    },

  /**
   * @description This method attempts to interpret the server response and
   * determine whether the transaction was successful, or if an error or
   * exception was encountered.
   * @method handleTransactionResponse
   * @private
   * @static
   * @param {object} o The connection object
   * @param {object} callback The user-defined callback object
   * @param {boolean} isAbort Determines if the transaction was terminated via abort().
   * @return {void}
   */
    handleTransactionResponse:function(o, callback, isAbort)
    {
		var httpStatus, responseObject,
			args = (callback && callback.argument)?callback.argument:null,
			xdrS = (o.r && o.r.statusText === 'xdr:success')?true:false,
			xdrF = (o.r && o.r.statusText === 'xdr:failure')?true:false,
			xdrA = isAbort;

		try
		{
			if((o.conn.status !== undefined && o.conn.status !== 0) || xdrS){
				// XDR requests will not have HTTP status defined. The
				// statusText property will define the response status
				// set by the Flash transport.
				httpStatus = o.conn.status;
			}
			else if(xdrF && !xdrA){
				// Set XDR transaction failure to a status of 0, which
				// resolves as an HTTP failure, instead of an exception.
				httpStatus = 0;
			}
			else{
				httpStatus = 13030;
			}
		}
		catch(e){

			 // 13030 is a custom code to indicate the condition -- in Mozilla/FF --
			 // when the XHR object's status and statusText properties are
			 // unavailable, and a query attempt throws an exception.
			httpStatus = 13030;
		}

		if((httpStatus >= 200 && httpStatus < 300) || httpStatus === 1223 || xdrS){
			responseObject = o.xdr ? o.r : this.createResponseObject(o, args);
			if(callback && callback.success){
				if(!callback.scope){
					callback.success(responseObject);
				}
				else{
					// If a scope property is defined, the callback will be fired from
					// the context of the object.
					callback.success.apply(callback.scope, [responseObject]);
				}
			}

			// Fire global custom event -- successEvent
			this.successEvent.fire(responseObject);

			if(o.successEvent){
				// Fire transaction custom event -- successEvent
				o.successEvent.fire(responseObject);
			}
		}
		else{
			switch(httpStatus){
				// The following cases are wininet.dll error codes that may be encountered.
				case 12002: // Server timeout
				case 12029: // 12029 to 12031 correspond to dropped connections.
				case 12030:
				case 12031:
				case 12152: // Connection closed by server.
				case 13030: // See above comments for variable status.
					// XDR transactions will not resolve to this case, since the
					// response object is already built in the xdr response.
					responseObject = this.createExceptionObject(o.tId, args, (isAbort?isAbort:false));
					if(callback && callback.failure){
						if(!callback.scope){
							callback.failure(responseObject);
						}
						else{
							callback.failure.apply(callback.scope, [responseObject]);
						}
					}

					break;
				default:
					responseObject = (o.xdr) ? o.response : this.createResponseObject(o, args);
					if(callback && callback.failure){
						if(!callback.scope){
							callback.failure(responseObject);
						}
						else{
							callback.failure.apply(callback.scope, [responseObject]);
						}
					}
			}

			// Fire global custom event -- failureEvent
			this.failureEvent.fire(responseObject);

			if(o.failureEvent){
				// Fire transaction custom event -- failureEvent
				o.failureEvent.fire(responseObject);
			}

		}

		this.releaseObject(o);
		responseObject = null;
    },

  /**
   * @description This method evaluates the server response, creates and returns the results via
   * its properties.  Success and failure cases will differ in the response
   * object's property values.
   * @method createResponseObject
   * @private
   * @static
   * @param {object} o The connection object
   * @param {callbackArg} callbackArg The user-defined argument or arguments to be passed to the callback
   * @return {object}
   */
    createResponseObject:function(o, callbackArg)
    {
		var obj = {}, headerObj = {},
			i, headerStr, header, delimitPos;

		try
		{
			headerStr = o.conn.getAllResponseHeaders();
			header = headerStr.split('\n');
			for(i=0; i<header.length; i++){
				delimitPos = header[i].indexOf(':');
				if(delimitPos != -1){
					headerObj[header[i].substring(0,delimitPos)] = YAHOO.lang.trim(header[i].substring(delimitPos+2));
				}
			}
		}
		catch(e){}

		obj.tId = o.tId;
		// Normalize IE's response to HTTP 204 when Win error 1223.
		obj.status = (o.conn.status == 1223)?204:o.conn.status;
		// Normalize IE's statusText to "No Content" instead of "Unknown".
		obj.statusText = (o.conn.status == 1223)?"No Content":o.conn.statusText;
		obj.getResponseHeader = headerObj;
		obj.getAllResponseHeaders = headerStr;
		obj.responseText = o.conn.responseText;
		obj.responseXML = o.conn.responseXML;

		if(callbackArg){
			obj.argument = callbackArg;
		}

		return obj;
    },

  /**
   * @description If a transaction cannot be completed due to dropped or closed connections,
   * there may be not be enough information to build a full response object.
   * The failure callback will be fired and this specific condition can be identified
   * by a status property value of 0.
   *
   * If an abort was successful, the status property will report a value of -1.
   *
   * @method createExceptionObject
   * @private
   * @static
   * @param {int} tId The Transaction Id
   * @param {callbackArg} callbackArg The user-defined argument or arguments to be passed to the callback
   * @param {boolean} isAbort Determines if the exception case is caused by a transaction abort
   * @return {object}
   */
    createExceptionObject:function(tId, callbackArg, isAbort)
    {
		var COMM_CODE = 0,
			COMM_ERROR = 'communication failure',
			ABORT_CODE = -1,
			ABORT_ERROR = 'transaction aborted',
			obj = {};

		obj.tId = tId;
		if(isAbort){
			obj.status = ABORT_CODE;
			obj.statusText = ABORT_ERROR;
		}
		else{
			obj.status = COMM_CODE;
			obj.statusText = COMM_ERROR;
		}

		if(callbackArg){
			obj.argument = callbackArg;
		}

		return obj;
    },

  /**
   * @description Method that initializes the custom HTTP headers for the each transaction.
   * @method initHeader
   * @public
   * @static
   * @param {string} label The HTTP header label
   * @param {string} value The HTTP header value
   * @param {string} isDefault Determines if the specific header is a default header
   * automatically sent with each transaction.
   * @return {void}
   */
	initHeader:function(label, value, isDefault)
	{
		var headerObj = (isDefault)?this._default_headers:this._http_headers;

		headerObj[label] = value;
		if(isDefault){
			this._has_default_headers = true;
		}
		else{
			this._has_http_headers = true;
		}
	},


  /**
   * @description Accessor that sets the HTTP headers for each transaction.
   * @method setHeader
   * @private
   * @static
   * @param {object} o The connection object for the transaction.
   * @return {void}
   */
	setHeader:function(o)
	{
		var prop;
		if(this._has_default_headers){
			for(prop in this._default_headers){
				if(YAHOO.lang.hasOwnProperty(this._default_headers, prop)){
					o.conn.setRequestHeader(prop, this._default_headers[prop]);
				}
			}
		}

		if(this._has_http_headers){
			for(prop in this._http_headers){
				if(YAHOO.lang.hasOwnProperty(this._http_headers, prop)){
					o.conn.setRequestHeader(prop, this._http_headers[prop]);
				}
			}

			this._http_headers = {};
			this._has_http_headers = false;
		}
	},

  /**
   * @description Resets the default HTTP headers object
   * @method resetDefaultHeaders
   * @public
   * @static
   * @return {void}
   */
	resetDefaultHeaders:function(){
		this._default_headers = {};
		this._has_default_headers = false;
	},

  /**
   * @description Method to terminate a transaction, if it has not reached readyState 4.
   * @method abort
   * @public
   * @static
   * @param {object} o The connection object returned by asyncRequest.
   * @param {object} callback  User-defined callback object.
   * @param {string} isTimeout boolean to indicate if abort resulted from a callback timeout.
   * @return {boolean}
   */
	abort:function(o, callback, isTimeout)
	{
		var abortStatus,
			args = (callback && callback.argument)?callback.argument:null;
			o = o || {};

		if(o.conn){
			if(o.xhr){
				if(this.isCallInProgress(o)){
					// Issue abort request
					o.conn.abort();

					window.clearInterval(this._poll[o.tId]);
					delete this._poll[o.tId];

					if(isTimeout){
						window.clearTimeout(this._timeOut[o.tId]);
						delete this._timeOut[o.tId];
					}

					abortStatus = true;
				}
			}
			else if(o.xdr){
				o.conn.abort(o.tId);
				abortStatus = true;
			}
		}
		else if(o.upload){
			var frameId = 'yuiIO' + o.tId;
			var io = document.getElementById(frameId);

			if(io){
				// Remove all listeners on the iframe prior to
				// its destruction.
				YAHOO.util.Event.removeListener(io, "load");
				// Destroy the iframe facilitating the transaction.
				document.body.removeChild(io);

				if(isTimeout){
					window.clearTimeout(this._timeOut[o.tId]);
					delete this._timeOut[o.tId];
				}

				abortStatus = true;
			}
		}
		else{
			abortStatus = false;
		}

		if(abortStatus === true){
			// Fire global custom event -- abortEvent
			this.abortEvent.fire(o, args);

			if(o.abortEvent){
				// Fire transaction custom event -- abortEvent
				o.abortEvent.fire(o, args);
			}

			this.handleTransactionResponse(o, callback, true);
		}

		return abortStatus;
	},

  /**
   * @description Determines if the transaction is still being processed.
   * @method isCallInProgress
   * @public
   * @static
   * @param {object} o The connection object returned by asyncRequest
   * @return {boolean}
   */
	isCallInProgress:function(o)
	{
		o = o || {};
		// if the XHR object assigned to the transaction has not been dereferenced,
		// then check its readyState status.  Otherwise, return false.
		if(o.xhr && o.conn){
			return o.conn.readyState !== 4 && o.conn.readyState !== 0;
		}
		else if(o.xdr && o.conn){
			return o.conn.isCallInProgress(o.tId);
		}
		else if(o.upload === true){
			return document.getElementById('yuiIO' + o.tId)?true:false;
		}
		else{
			return false;
		}
	},

  /**
   * @description Dereference the XHR instance and the connection object after the transaction is completed.
   * @method releaseObject
   * @private
   * @static
   * @param {object} o The connection object
   * @return {void}
   */
	releaseObject:function(o)
	{
		if(o && o.conn){
			//dereference the XHR instance.
			o.conn = null;


			//dereference the connection object.
			o = null;
		}
	}
};

/**
  * @for Connect
  */
(function() {
	var YCM = YAHOO.util.Connect, _fn = {};

   /**
    * @description This method creates and instantiates the Flash transport.
    * @method _swf
    * @private
    * @static
    * @param {string} URI to connection.swf.
    * @return {void}
    */
	function _swf(uri) {
		var o = '<object id="YUIConnectionSwf" type="application/x-shockwave-flash" data="' +
		        uri + '" width="0" height="0">' +
		     	'<param name="movie" value="' + uri + '">' +
                '<param name="allowScriptAccess" value="always">' +
		    	'</object>',
		    c = document.createElement('div');

		document.body.appendChild(c);
		c.innerHTML = o;
	}

   /**
    * @description This method calls the public method on the
    * Flash transport to start the XDR transaction.  It is analogous
    * to Connection Manager's asyncRequest method.
    * @method xdr
    * @private
    * @static
    * @param {object} The transaction object.
    * @param {string} HTTP request method.
    * @param {string} URI for the transaction.
    * @param {object} The transaction's callback object.
    * @param {object} The JSON object used as HTTP POST data.
    * @return {void}
    */
	function _xdr(o, m, u, c, d) {
		_fn[parseInt(o.tId)] = { 'o':o, 'c':c };
		if (d) {
			c.method = m;
			c.data = d;
		}

		o.conn.send(u, c, o.tId);
	}

   /**
    * @description This method instantiates the Flash transport and
    * establishes a static reference to it, used for all XDR requests.
    * @method transport
    * @public
    * @static
    * @param {string} URI to connection.swf.
    * @return {void}
    */
	function _init(uri) {
		_swf(uri);
		YCM._transport = document.getElementById('YUIConnectionSwf');
	}

	function _xdrReady() {
		YCM.xdrReadyEvent.fire();
	}

   /**
    * @description This method fires the global and transaction start
    * events.
    * @method _xdrStart
    * @private
    * @static
    * @param {object} The transaction object.
    * @param {string} The transaction's callback object.
    * @return {void}
    */
	function _xdrStart(o, cb) {
		if (o) {
			// Fire global custom event -- startEvent
			YCM.startEvent.fire(o, cb.argument);

			if(o.startEvent){
				// Fire transaction custom event -- startEvent
				o.startEvent.fire(o, cb.argument);
			}
		}
	}

   /**
    * @description This method is the initial response handler
    * for XDR transactions.  The Flash transport calls this
    * function and sends the response payload.
    * @method handleXdrResponse
    * @private
    * @static
    * @param {object} The response object sent from the Flash transport.
    * @return {void}
    */
	function _handleXdrResponse(r) {
		var o = _fn[r.tId].o,
			cb = _fn[r.tId].c;

		if (r.statusText === 'xdr:start') {
			_xdrStart(o, cb);
			return;
		}

		r.responseText = decodeURI(r.responseText);
		o.r = r;
		if (cb.argument) {
			o.r.argument = cb.argument;
		}

		this.handleTransactionResponse(o, cb, r.statusText === 'xdr:abort' ? true : false);
		delete _fn[r.tId];
	}

	// Bind the functions to Connection Manager as static fields.
	YCM.xdr = _xdr;
	YCM.swf = _swf;
	YCM.transport = _init;
	YCM.xdrReadyEvent = new YAHOO.util.CustomEvent('xdrReady');
	YCM.xdrReady = _xdrReady;
	YCM.handleXdrResponse = _handleXdrResponse;
})();

/**
  * @for Connect
  */
(function(){
	var YCM = YAHOO.util.Connect,
		YE = YAHOO.util.Event;
   /**
	* @description Property modified by setForm() to determine if the data
	* should be submitted as an HTML form.
	* @property _isFormSubmit
	* @private
	* @static
	* @type boolean
	*/
	YCM._isFormSubmit = false;

   /**
	* @description Property modified by setForm() to determine if a file(s)
	* upload is expected.
	* @property _isFileUpload
	* @private
	* @static
	* @type boolean
	*/
	YCM._isFileUpload = false;

   /**
	* @description Property modified by setForm() to set a reference to the HTML
	* form node if the desired action is file upload.
	* @property _formNode
	* @private
	* @static
	* @type object
	*/
	YCM._formNode = null;

   /**
	* @description Property modified by setForm() to set the HTML form data
	* for each transaction.
	* @property _sFormData
	* @private
	* @static
	* @type string
	*/
	YCM._sFormData = null;

   /**
	* @description Tracks the name-value pair of the "clicked" submit button if multiple submit
	* buttons are present in an HTML form; and, if YAHOO.util.Event is available.
	* @property _submitElementValue
	* @private
	* @static
	* @type string
	*/
	YCM._submitElementValue = null;

   /**
    * @description Custom event that fires when handleTransactionResponse() determines a
    * response in the HTTP 4xx/5xx range.
    * @property failureEvent
    * @private
    * @static
    * @type CustomEvent
    */
	YCM.uploadEvent = new YAHOO.util.CustomEvent('upload'),

   /**
	* @description Determines whether YAHOO.util.Event is available and returns true or false.
	* If true, an event listener is bound at the document level to trap click events that
	* resolve to a target type of "Submit".  This listener will enable setForm() to determine
	* the clicked "Submit" value in a multi-Submit button, HTML form.
	* @property _hasSubmitListener
	* @private
	* @static
	*/
	YCM._hasSubmitListener = function() {
		if(YE){
			YE.addListener(
				document,
				'click',
				function(e){
					var obj = YE.getTarget(e),
						name = obj.nodeName.toLowerCase();

					if((name === 'input' || name === 'button') && (obj.type && obj.type.toLowerCase() == 'submit')){
						YCM._submitElementValue = encodeURIComponent(obj.name) + "=" + encodeURIComponent(obj.value);
					}
				});
			return true;
		}
		return false;
	}();

  /**
   * @description This method assembles the form label and value pairs and
   * constructs an encoded string.
   * asyncRequest() will automatically initialize the transaction with a
   * a HTTP header Content-Type of application/x-www-form-urlencoded.
   * @method setForm
   * @public
   * @static
   * @param {string || object} form id or name attribute, or form object.
   * @param {boolean} optional enable file upload.
   * @param {boolean} optional enable file upload over SSL in IE only.
   * @return {string} string of the HTML form field name and value pairs..
   */
	function _setForm(formId, isUpload, secureUri)
	{
		var oForm, oElement, oName, oValue, oDisabled,
			hasSubmit = false,
			data = [], item = 0,
			i,len,j,jlen,opt;

		this.resetFormState();

		if(typeof formId == 'string'){
			// Determine if the argument is a form id or a form name.
			// Note form name usage is deprecated by supported
			// here for legacy reasons.
			oForm = (document.getElementById(formId) || document.forms[formId]);
		}
		else if(typeof formId == 'object'){
			// Treat argument as an HTML form object.
			oForm = formId;
		}
		else{
			return;
		}

		// If the isUpload argument is true, setForm will call createFrame to initialize
		// an iframe as the form target.
		//
		// The argument secureURI is also required by IE in SSL environments
		// where the secureURI string is a fully qualified HTTP path, used to set the source
		// of the iframe, to a stub resource in the same domain.
		if(isUpload){

			// Create iframe in preparation for file upload.
			this.createFrame(secureUri?secureUri:null);

			// Set form reference and file upload properties to true.
			this._isFormSubmit = true;
			this._isFileUpload = true;
			this._formNode = oForm;

			return;
		}

		// Iterate over the form elements collection to construct the
		// label-value pairs.
		for (i=0,len=oForm.elements.length; i<len; ++i){
			oElement  = oForm.elements[i];
			oDisabled = oElement.disabled;
			oName     = oElement.name;

			// Do not submit fields that are disabled or
			// do not have a name attribute value.
			if(!oDisabled && oName)
			{
				oName  = encodeURIComponent(oName)+'=';
				oValue = encodeURIComponent(oElement.value);

				switch(oElement.type)
				{
					// Safari, Opera, FF all default opt.value from .text if
					// value attribute not specified in markup
					case 'select-one':
						if (oElement.selectedIndex > -1) {
							opt = oElement.options[oElement.selectedIndex];
							data[item++] = oName + encodeURIComponent(
								(opt.attributes.value && opt.attributes.value.specified) ? opt.value : opt.text);
						}
						break;
					case 'select-multiple':
						if (oElement.selectedIndex > -1) {
							for(j=oElement.selectedIndex, jlen=oElement.options.length; j<jlen; ++j){
								opt = oElement.options[j];
								if (opt.selected) {
									data[item++] = oName + encodeURIComponent(
										(opt.attributes.value && opt.attributes.value.specified) ? opt.value : opt.text);
								}
							}
						}
						break;
					case 'radio':
					case 'checkbox':
						if(oElement.checked){
							data[item++] = oName + oValue;
						}
						break;
					case 'file':
						// stub case as XMLHttpRequest will only send the file path as a string.
					case undefined:
						// stub case for fieldset element which returns undefined.
					case 'reset':
						// stub case for input type reset button.
					case 'button':
						// stub case for input type button elements.
						break;
					case 'submit':
						if(hasSubmit === false){
							if(this._hasSubmitListener && this._submitElementValue){
								data[item++] = this._submitElementValue;
							}
							hasSubmit = true;
						}
						break;
					default:
						data[item++] = oName + oValue;
				}
			}
		}

		this._isFormSubmit = true;
		this._sFormData = data.join('&');


		this.initHeader('Content-Type', this._default_form_header);

		return this._sFormData;
	}

   /**
    * @description Resets HTML form properties when an HTML form or HTML form
    * with file upload transaction is sent.
    * @method resetFormState
    * @private
    * @static
    * @return {void}
    */
	function _resetFormState(){
		this._isFormSubmit = false;
		this._isFileUpload = false;
		this._formNode = null;
		this._sFormData = "";
	}


   /**
    * @description Creates an iframe to be used for form file uploads.  It is remove from the
    * document upon completion of the upload transaction.
    * @method createFrame
    * @private
    * @static
    * @param {string} optional qualified path of iframe resource for SSL in IE.
    * @return {void}
    */
	function _createFrame(secureUri){

		// IE does not allow the setting of id and name attributes as object
		// properties via createElement().  A different iframe creation
		// pattern is required for IE.
		var frameId = 'yuiIO' + this._transaction_id,
			io;
		if(YAHOO.env.ua.ie){
			io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');

			// IE will throw a security exception in an SSL environment if the
			// iframe source is undefined.
			if(typeof secureUri == 'boolean'){
				io.src = 'javascript:false';
			}
		}
		else{
			io = document.createElement('iframe');
			io.id = frameId;
			io.name = frameId;
		}

		io.style.position = 'absolute';
		io.style.top = '-1000px';
		io.style.left = '-1000px';

		document.body.appendChild(io);
	}

   /**
    * @description Parses the POST data and creates hidden form elements
    * for each key-value, and appends them to the HTML form object.
    * @method appendPostData
    * @private
    * @static
    * @param {string} postData The HTTP POST data
    * @return {array} formElements Collection of hidden fields.
    */
	function _appendPostData(postData){
		var formElements = [],
			postMessage = postData.split('&'),
			i, delimitPos;

		for(i=0; i < postMessage.length; i++){
			delimitPos = postMessage[i].indexOf('=');
			if(delimitPos != -1){
				formElements[i] = document.createElement('input');
				formElements[i].type = 'hidden';
				formElements[i].name = decodeURIComponent(postMessage[i].substring(0,delimitPos));
				formElements[i].value = decodeURIComponent(postMessage[i].substring(delimitPos+1));
				this._formNode.appendChild(formElements[i]);
			}
		}

		return formElements;
	}

   /**
    * @description Uploads HTML form, inclusive of files/attachments, using the
    * iframe created in createFrame to facilitate the transaction.
    * @method uploadFile
    * @private
    * @static
    * @param {int} id The transaction id.
    * @param {object} callback User-defined callback object.
    * @param {string} uri Fully qualified path of resource.
    * @param {string} postData POST data to be submitted in addition to HTML form.
    * @return {void}
    */
	function _uploadFile(o, callback, uri, postData){
		// Each iframe has an id prefix of "yuiIO" followed
		// by the unique transaction id.
		var frameId = 'yuiIO' + o.tId,
		    uploadEncoding = 'multipart/form-data',
		    io = document.getElementById(frameId),
		    ie8 = (document.documentMode && document.documentMode === 8) ? true : false,
		    oConn = this,
			args = (callback && callback.argument)?callback.argument:null,
            oElements,i,prop,obj, rawFormAttributes, uploadCallback;

		// Track original HTML form attribute values.
		rawFormAttributes = {
			action:this._formNode.getAttribute('action'),
			method:this._formNode.getAttribute('method'),
			target:this._formNode.getAttribute('target')
		};

		// Initialize the HTML form properties in case they are
		// not defined in the HTML form.
		this._formNode.setAttribute('action', uri);
		this._formNode.setAttribute('method', 'POST');
		this._formNode.setAttribute('target', frameId);

		if(YAHOO.env.ua.ie && !ie8){
			// IE does not respect property enctype for HTML forms.
			// Instead it uses the property - "encoding".
			this._formNode.setAttribute('encoding', uploadEncoding);
		}
		else{
			this._formNode.setAttribute('enctype', uploadEncoding);
		}

		if(postData){
			oElements = this.appendPostData(postData);
		}

		// Start file upload.
		this._formNode.submit();

		// Fire global custom event -- startEvent
		this.startEvent.fire(o, args);

		if(o.startEvent){
			// Fire transaction custom event -- startEvent
			o.startEvent.fire(o, args);
		}

		// Start polling if a callback is present and the timeout
		// property has been defined.
		if(callback && callback.timeout){
			this._timeOut[o.tId] = window.setTimeout(function(){ oConn.abort(o, callback, true); }, callback.timeout);
		}

		// Remove HTML elements created by appendPostData
		if(oElements && oElements.length > 0){
			for(i=0; i < oElements.length; i++){
				this._formNode.removeChild(oElements[i]);
			}
		}

		// Restore HTML form attributes to their original
		// values prior to file upload.
		for(prop in rawFormAttributes){
			if(YAHOO.lang.hasOwnProperty(rawFormAttributes, prop)){
				if(rawFormAttributes[prop]){
					this._formNode.setAttribute(prop, rawFormAttributes[prop]);
				}
				else{
					this._formNode.removeAttribute(prop);
				}
			}
		}

		// Reset HTML form state properties.
		this.resetFormState();

		// Create the upload callback handler that fires when the iframe
		// receives the load event.  Subsequently, the event handler is detached
		// and the iframe removed from the document.
		uploadCallback = function() {
			if(callback && callback.timeout){
				window.clearTimeout(oConn._timeOut[o.tId]);
				delete oConn._timeOut[o.tId];
			}

			// Fire global custom event -- completeEvent
			oConn.completeEvent.fire(o, args);

			if(o.completeEvent){
				// Fire transaction custom event -- completeEvent
				o.completeEvent.fire(o, args);
			}

			obj = {
			    tId : o.tId,
			    argument : callback.argument
            };

			try
			{
				// responseText and responseXML will be populated with the same data from the iframe.
				// Since the HTTP headers cannot be read from the iframe
				obj.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:io.contentWindow.document.documentElement.textContent;
				obj.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
			}
			catch(e){}

			if(callback && callback.upload){
				if(!callback.scope){
					callback.upload(obj);
				}
				else{
					callback.upload.apply(callback.scope, [obj]);
				}
			}

			// Fire global custom event -- uploadEvent
			oConn.uploadEvent.fire(obj);

			if(o.uploadEvent){
				// Fire transaction custom event -- uploadEvent
				o.uploadEvent.fire(obj);
			}

			YE.removeListener(io, "load", uploadCallback);

			setTimeout(
				function(){
					document.body.removeChild(io);
					oConn.releaseObject(o);
				}, 100);
		};

		// Bind the onload handler to the iframe to detect the file upload response.
		YE.addListener(io, "load", uploadCallback);
	}

	YCM.setForm = _setForm;
	YCM.resetFormState = _resetFormState;
	YCM.createFrame = _createFrame;
	YCM.appendPostData = _appendPostData;
	YCM.uploadFile = _uploadFile;
})();

YAHOO.register("connection", YAHOO.util.Connect, {version: "2.8.1", build: "19"});
var langSwitch=function(){var c;
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
YEvent.on(window,"load",langSwitch.init);(function(){LI.define("StackShow");
LI.StackShow=function(U){U=(typeof(U)=="string")?document.getElementById(U):U;
var Q=document.styleSheets[document.styleSheets.length-1],I=YDom.getElementsByClassName("photo-card","li",U),H=I[0].parentNode,D=Math.floor(Math.random()*I.length),S=[],s=false,x=false,W,j,g,l,E,G=function(){try{var i=document.createElement("div");
i.style.msTransform="rotate(9deg)";
return(i.style["-ms-transform"]=="rotate(9deg)")
}catch(Y){return false
}},m=function(){try{var i=document.createElement("div"),aa=navigator.userAgent,Y=aa.match(/firefox\D*([\.\d]*)/i),Z=(Y)?parseFloat(Y[Y.length-1]):0;
i.style["-webkit-transition"]="inherit";
i.style["-moz-transition"]="inherit";
i.style["-ms-transition"]="inherit";
i.style["-o-transition"]="inherit";
i.style["transition"]="inherit";
return(i.style.webkitTransition=="inherit"||i.style.mozTransition=="inherit"||Z>=4||i.style.msTransition=="inherit"||i.style.oTransition=="inherit")
}catch(ab){return false
}},b=function(i,Y){return i-Math.floor(Math.random()*Y+1)
},z=function(Z,i,aa,Y){return(function(){YDom.setStyle(Z,"opacity","1");
YDom.setStyle(Z,"left",aa+"px");
YDom.removeClass(Z,"intro"+i);
YEvent.removeListener(Z,"webkitAnimationEnd",Y);
YEvent.on(Z,"webkitAnimationEnd",K)
})
},N=function(){var Z=E,ac=(S.length>0)?S[E].card:I[E],ab=100,aa;
YDom.setStyle(ac,"z-index",ab);
for(var Y=0;
Y<I.length-1;
Y++){Z=(Z<I.length-1)?Z+1:0;
aa=(S.length>0)?S[Z].card:I[Z];
ab=+(ab-1);
YDom.setStyle(aa,"z-index",ab)
}},K=function(i){var Y=YEvent.getTarget(i);
YDom.removeClass(Y,"animate");
r()
},r=function(){var Y=S[E],i=S[s];
s=E;
clearTimeout(l)
},J=function(ac){if(s==+(ac)){return
}E=+(ac);
switch(ac){case"next":E=(s<S.length-1)?+(s+1):0;
var ab=S[E].card,Y=S[s].card;
YDom.addClass(Y,"animate");
YDom.removeClass(S[s].page,"selected");
YDom.addClass(S[E].page,"selected");
l=setTimeout(function(){YDom.addClass(ab,"current");
N();
YDom.removeClass(Y,"current")
},550);
if(x){setTimeout(function(){var i=YDom.getElementsByClassName("animate");
YDom.removeClass(i,"animate");
r()
},1000)
}break;
case"prev":default:if(ac=="prev"){E=(s>0)?+(s-1):S.length-1
}else{for(var aa=0,Z;
Z=I[aa];
aa++){var ad=YDom.getStyle(S[E].card,"z-index"),ae=YDom.getStyle(Z,"z-index");
if(ad>ae&&aa!=s){YDom.addClass(Z,"animate")
}}}var ab=S[E].card,Y=S[s].card;
YDom.addClass(ab,"animate");
YDom.removeClass(S[s].page,"selected");
YDom.addClass(S[E].page,"selected");
l=setTimeout(function(){YDom.addClass(ab,"current");
N();
YDom.removeClass(Y,"current")
},550);
if(x){setTimeout(function(){var i=YDom.getElementsByClassName("animate");
YDom.removeClass(i,"animate");
r()
},1000)
}break
}},O=function(){var ad=document.createElement("div"),Z=document.createElement("div"),ab=document.createElement("button"),Y=document.createElement("button");
YDom.addClass(ad,"carousel-controls");
Z.id="pagination";
YDom.addClass(Z,"pagination");
ab.innerHTML="Previous";
Y.innerHTML="Next";
ab.id="prev-btn";
Y.id="next-btn";
YDom.addClass(ab,"prev-btn");
YDom.addClass(Y,"next-btn");
YEvent.on(ab,"click",function(){J("prev")
});
YEvent.on(Y,"click",function(){J("next")
});
function af(i){var ag=document.createElement("a");
ag.innerHTML=i;
ag.href="javascript:void(0);";
YDom.addClass(ag,"page");
YDom.addClass(ag,"page"+i);
YEvent.on(ag,"click",function(ah){YEvent.stopEvent(ah);
J(i)
},this);
return ag
}for(var aa=0,ac;
ac=S[aa];
aa++){var ae=af(aa);
Z.appendChild(ae);
S[aa].page=ae
}ad.appendChild(Z);
if(navigator.appVersion.indexOf("Mobile")<0){ad.appendChild(ab);
ad.appendChild(Y)
}U.appendChild(ad);
YEvent.on(H,"touchstart",function(i){var ag=YEvent.getTarget(i);
if(ag.tagName=="A"){return
}YEvent.preventDefault(i);
J("next")
});
YEvent.on(document,"keyup",function(ah){var ag=YEvent.getTarget(ah);
if(ag.tagName=="INPUT"){return
}var i=YEvent.getCharCode(ah);
YEvent.preventDefault(ah);
switch(i){case 39:J("next");
break;
case 37:J("prev");
break
}})
},u=D,E=u;
N();
for(var T=0,e;
e=I[T];
T++){var L="photoCard"+T,f="shuffleCard"+T,u=(u<I.length-1)?+(u+1):0,W=(D===T)?0:b(10,20),M=(W-360)*Math.PI/180,y=Math.cos(M),h=Math.sin(M),w=(W<0)?true:false,d=z(e,T,W,d),a=(navigator.appVersion.indexOf("Mobile")<0)?500:600,C=y,B=-h,p=h,o=y,A=G(),V=navigator.userAgent,q=V.match(/msie\D*([\.\d]*)/i),v=(q)?q[1]:0;
S[T]={"id":"photo-card"+T,"card":e,"page":false,"current":false,"rotate":W,"top":b(10,20),"left":b(10,20),"introNum":u};
e.id="photo-card"+T;
if(YDom.hasClass(e,"current")){YDom.removeClass(e,"current");
H.appendChild(e)
}if(V.indexOf("MSIE")>=0&&!A){var t=document.createElement("img"),R=YDom.getFirstChild(e),X=YDom.getElementsByClassName("snapshot","img",e)[0],n=YDom.getElementsByClassName("message","div",e)[0];
S[T].top=(W<0)?S[T].top-20:S[T].top-20;
S[T].left=(W<0)?S[T].left-20:S[T].left;
YDom.setStyle(e,"filter","progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11='"+C+"', M12='"+B+"', M21='"+p+"', M22='"+o+"')");
YDom.setStyle(e,"-ms-filter","progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11='"+C+"', M12='"+B+"', M21='"+p+"', M22='"+o+"')");
YDom.setStyle(e,"top",S[T].top+"px");
YDom.setStyle(e,"left",S[T].left+"px")
}e.style.webkitTransform="rotate("+W+"deg)";
e.style.mozTransform="rotate("+W+"deg)";
e.style.msTransform="rotate("+W+"deg)";
e.style.oTransform="rotate("+W+"deg)";
e.style.transform="rotate("+W+"deg)";
YDom.setStyle(e,"top",S[T].top+"px");
if(navigator.userAgent.match(/webkit\D*([\.\d]*)/i)){var P=document.createElement("style"),c;
c="@-webkit-keyframes "+L+" { from { left: -900px; -webkit-opacity: 1; } to { left: "+S[T].left+"px; -webkit-opacity: 1; } }";
c+="#stack-show li.photo-card.intro"+u+" { -webkit-animation-name: "+L+"; -webkit-animation-delay: "+(0.2*T)+"s; -webkit-animation-duration: 0.7s; -webkit-animation-iteration-count: 1; -webkit-animation-fill-mode: forwards; }";
c+="@-webkit-keyframes "+f+" { 0% { left: "+W+"px; -webkit-transform: rotate("+W+"deg) scale(1); } 70% { left: -"+(a+W)+"px; -webkit-transform: rotate(-10deg) scale(0.9); } 100% { left: "+W+"px; -webkit-transform: rotate("+W+"deg) scale(1); }}";
c+="#main #stack-show li.photo-card"+T+".animate { -webkit-animation-name: "+f+"; -webkit-animation-duration: 0.8s; -webkit-animation-iteration-count: 1; }";
P.type="text/css";
if(P.styleSheet){P.styleSheet.cssText=c
}else{P.appendChild(document.createTextNode(c))
}document.getElementsByTagName("head")[0].appendChild(P);
YDom.addClass(e,"intro"+T)
}else{var P=document.createElement("style"),c="",V=navigator.userAgent,F=V.match(/firefox\D*([\.\d]*)/i),k=(F)?parseFloat(F[F.length-1]):0;
c+="#main #stack-show li.photo-card.intro"+u+" { -webkit-transition: left 1s ease; -moz-transition: left 1s ease "+(0.4*T)+"s; -ms-transition: left 1s ease; -o-transition: left 1s ease; transition: left 1s ease; left: "+S[T].left+"px; }";
c+="#main #stack-show li.photo-card.end-state"+u+" { left: "+S[T].left+"px; -moz-transform: rotate("+W+"deg) scale(1); }";
if(m()){c+="#main #stack-show li.photo-card.end-state"+u+".animate { left: -"+(a+W)+"px; -moz-transform: rotate(-10deg) scale(0.9); }"
}if(k>=4){c+="#main #stack-show li.photo-card.end-state"+u+".animate { -moz-transition-property: left, -moz-transform; -moz-transition-duration: 0.7s; -moz-transition-function: ease; left: -"+(a+W)+"px; -moz-transform: rotate(-10deg) scale(0.9); }"
}P.type="text/css";
if(P.styleSheet){P.styleSheet.cssText=c
}else{P.appendChild(document.createTextNode(c))
}document.getElementsByTagName("head")[0].appendChild(P);
if(k>=4){YDom.addClass(S[T].card,"end-state"+S[T].introNum)
}else{YDom.addClass(S[T].card,"intro"+S[T].introNum);
YDom.addClass(S[T].card,"end-state"+S[T].introNum)
}if(m()){YEvent.on(S[T].card,"transitionend",function(Y){var ab=YEvent.getTarget(Y);
for(var aa=0,Z;
Z=S[aa];
aa++){if(Z.card==ab){YDom.removeClass(ab,"intro"+Z.introNum);
YDom.setStyle(ab,"-moz-transition-property","left, -moz-transform");
YDom.setStyle(ab,"-moz-transition-duration","0.7s");
YDom.setStyle(ab,"-moz-transition-function","ease")
}}})
}x=true
}YDom.addClass(e,"photo-card"+T);
YEvent.addListener(e,"webkitAnimationEnd",d)
}O();
YDom.addClass(S[E].page,"selected");
YDom.addClass(S[E].card,"current");
s=E
};
YEvent.onDOMReady(function(){new LI.StackShow("stack-show")
})
})();