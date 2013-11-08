LI.define("RUM.activeTimers");
LI.define("RUM.finishedTimers");
LI.define("RUM.timeMarks");
(function(b){var a=0;
b.startTimer=function(c,e){var d=b.activeTimers;
d[c]=d[c]||[];
d[c].push(e||+new Date())
};
b.markTime=function(c,e){var d=b.timeMarks;
d[c+"ClientTimestampMs"]=e||+new Date()
};
b.stopTimer=function(e,f){var d=f||+new Date(),c=b.activeTimers,h=b.finishedTimers;
h[e]=h[e]||[];
if(c[e]===undefined){return
}var g=c[e].pop();
h[e].push(d-g)
};
b.monkeyTimer=function(e,c,d){return function(){b.startTimer(c);
var f=e.apply(d||this,arguments);
b.stopTimer(c);
return f
}
};
b.monkeyTimeByName=function(d,c,e){var h=d.split("."),g,f=window;
for(g=0;
g<h.length-1;
g++){f=f[h[g]];
if(typeof f!="object"){return
}}if(typeof f[h[g]]!=="function"){return
}f[h[g]]=b.monkeyTimer(f[h[g]],c,e)
};
b.monkeyTimeList=function(d){for(var c in d){if(d.hasOwnProperty(c)){b.monkeyTimeByName(c,d[c])
}}};
b.getNumTimes=function(c){var d=b.finishedTimers;
if(d[c]===undefined){return undefined
}return d[c].length
};
b.getTotalTimes=function(){var e=b.finishedTimers,d={};
for(var c in e){if(e.hasOwnProperty(c)){d[c]=b.getTotalTime(c)
}}return d
};
b.getTotalTime=function(d){var e,c,g=b.finishedTimers,f=0;
if(g[d]===undefined){return undefined
}for(e=0,c=g[d].length;
e<c;
e++){f+=g[d][e]
}return f
};
b.trackEmbeds=function(f){var e,c,d,g=b.finishedTimers;
if(typeof fs=="undefined"){return
}if(typeof f=="string"){f=arguments
}for(e=0;
e<f.length;
e++){(function(h,i){fs.after(f[e],function(){b.markTime("embedsReady");
h()
});
i&&fs.timing(f[e],function(k){for(var l in k){if(k.hasOwnProperty(l)){var j="fizzy"+l.substr(0,1).toUpperCase()+l.substr(1)+"DurationMs";
g[j]=g[j]||[];
g[j].push(k[l])
}}i()
})
})(b.defer(),fs.timing&&b.defer())
}};
b.defer=function(c){a+=1;
return function(){a-=1;
if(a===0&&b.fire){b.fire()
}}
};
b.canFire=function(){return a===0
};
if(LI.TalkIn){b.adTimers=[];
LI.TalkIn.register("adperf",(function(c){return{endTimer:function(d){try{BOOMR.plugins.Ads.endTimer(d)
}catch(f){c.push(d)
}}}
}(b.adTimers)))
}}(LI.RUM));LI.RUM.monkeyTimeList({"fs.embed":"totalFizzyTime","dust.render":"totalDustRenderTime","dust.register":"totalDustTemplateParseTime"});LI.define("A11yMenu");
LI.A11yMenu=function(b,a){if(!b){return
}this.container=b;
this.config=a;
this.trigger=YDom.get("a11y-skip-nav-link");
this.searchSelect=YDom.get("main-search-box");
this.body=document.getElementsByTagName("body")[0];
this.pageBody=YDom.get("body");
this.item=0;
this.init()
};
LI.A11yMenu.prototype={init:function(){if(!YAHOO.env.ua.ie||(YAHOO.env.ua.ie&&YAHOO.env.ua.ie>7)){YEvent.addListener(this.trigger,"focus",this.buildMenu,this,true)
}},buildMenu:function(){var e=document.getElementsByTagName("h2"),p=document.getElementsByTagName("h3"),o,f,c,m,n,h,g,l=(p.length>10)?10:p.length,a=e.length+l,b=[],k='<ul id="a11y-toolbar" role="toolbar">'+'<li role="presentation">'+'<a role="button" id="a11y-jump-to-link" aria-haspopup="true" class="a11y" href="#a11y-content">'+this.config.jumpToText+'<span class="more">'+this.config.moreText+"</span></a>"+'<ol id="a11y-sub-menu" role="menu" class="a11y-hidden">',d="",q="</ol>"+"</li>"+'<li role="presentation">'+'<a id="a11y-search" class="a11y" href="'+this.config.searchUrl+'"><span>'+this.config.skipToText+"</span></a>"+"</li>"+'<li role="presentation" class="options">'+'<a class="a11y" href="mailto:a11y-feedback@linkedin.com">'+this.config.feedbackText+"</a>"+'<button class="close">'+this.config.closeText+"</button>"+"</li>"+"</ul>";
for(h=0;
h<a;
h++){if(e[h]){b.push(e[h])
}if(p[h]){b.push(p[h])
}}for(g=1;
g<a;
g++){n=b[g];
if(this.isVisible(n)){c=n.innerHTML;
f=LI.htmlEncode(this.getText(n.childNodes));
m='<span class="a11y-offscreen" id="a11y-header'+g+'" name="a11y-header'+g+'"></span>';
if(f!==""){d+='<li role="menuitem"><a class="a11y-jump-item" href="#a11y-header'+g+'">'+f+"</a></li>"
}n.innerHTML=m+c
}}if(a<2||d===""){d='<li role="menuitem"><a class="a11y-jump-item" href="#a11y-content-link">'+this.config.smallPageText+"</a></li>"
}o=k+d+q;
YEvent.removeListener(this.trigger,"focus",this.buildMenu);
this.container.innerHTML+=o;
this.displayMenu()
},getText:function(b){var c="",e,d,a;
for(d=0,a=b.length;
d<a;
d++){e=b[d];
if(e.nodeType===3||e.nodeType===4){c+=e.nodeValue
}else{if(e.nodeType!==8&&e.nodeName.toUpperCase()!=="SCRIPT"){c+=(" "+this.getText(e.childNodes))
}}}return c
},displayMenu:function(){this.trigger=YDom.get("a11y-skip-nav-link");
this.toolbar=YDom.get("a11y-toolbar");
this.jumpLink=YDom.get("a11y-jump-to-link");
this.subMenu=YDom.get("a11y-sub-menu");
this.searchTrigger=YDom.get("a11y-search");
YEvent.addListener(this.container,"keydown",this.handleKeyPress,this,true);
YEvent.addListener(this.trigger,"focus",this.showMenu,this,true);
YEvent.addListener(this.container,"click",this.handleClick,this,true);
YEvent.addListener(this.searchTrigger,"focus",this.handleBlur,this,true);
YEvent.addListener(this.jumpLink,"focus",this.handleFocus,this,true);
this.showMenu()
},isVisible:function(d){var c=d.parentElement,e=c.parentElement,f=(YDom.getStyle(d,"display")==="none"||YDom.getStyle(c,"display")==="none"||YDom.getStyle(e,"display")==="none")?true:false,b=(YDom.getStyle(d,"visibility")==="hidden"||YDom.getStyle(c,"visibility")==="hidden"||YDom.getStyle(e,"visibility")==="hidden")?true:false,a=(YDom.getStyle(d,"text-indent")[0]==="-"||YDom.getStyle(c,"text-indent")[0]==="-"||YDom.getStyle(e,"text-indent")[0]==="-")?true:false;
if(f||b||a){return false
}return true
},addBodyMargin:function(){YDom.addClass(this.pageBody,"a11y-open");
YDom.addClass(this.body,"a11y-focus")
},removeBodyMargin:function(){YDom.removeClass(this.pageBody,"a11y-open");
YDom.removeClass(this.body,"a11y-focus")
},hideMenu:function(){YDom.addClass(this.container,"a11y-hidden");
this.removeBodyMargin();
YEvent.removeListener(window,"scroll",this.hideMenu,this,true);
this.hideSubMenu()
},hideSubMenu:function(){YDom.addClass(this.subMenu,"a11y-hidden")
},showSubMenu:function(){YDom.removeClass(this.subMenu,"a11y-hidden")
},showMenu:function(){this.hideSubMenu();
YDom.removeClass(this.container,"a11y-hidden");
this.toolbar.tabIndex=-1;
this.toolbar.focus();
this.addBodyMargin();
YEvent.addListener(window,"scroll",this.hideMenu,this,true)
},skipToSearch:function(){this.hideMenu();
this.searchSelect.focus()
},handleBlur:function(a){this.hideSubMenu();
this.removeTabs()
},handleFocus:function(a){this.showSubMenu();
this.resetTabs()
},resetTabs:function(){var b=this.subMenu.getElementsByTagName("a"),c,a;
for(c=0,a=b.length;
c<a;
c++){YDom.setAttribute(b[c],"tabindex","0")
}},removeTabs:function(){var b=this.subMenu.getElementsByTagName("a"),c,a;
for(c=0,a=b.length;
c<a;
c++){YDom.setAttribute(b[c],"tabindex","-1")
}},handleClick:function(a){var d=YEvent.getTarget(a),c=YDom.getAttribute(d,"href"),b;
if(c&&c.substr(0,1)==="#"&&d!==this.jumpLink&&!YDom.hasClass(d,"close")){b=document.getElementById(c.substr(1)).parentNode
}if(b){b.tabIndex=-1;
b.focus();
this.hideMenu()
}else{if(d===this.jumpLink){YEvent.preventDefault(a);
this.subMenu.tabIndex=-1;
this.subMenu.focus()
}else{if(d===this.searchTrigger||YDom.getAncestorByTagName(d,"a")===this.searchTrigger){YEvent.preventDefault(a);
this.skipToSearch()
}else{if(YDom.hasClass(d,"close")){YEvent.preventDefault(a);
this.hideMenu()
}}}}},handleKeyPress:function(a){var b=YEvent.getCharCode(a);
switch(b){case 13:this.handleEnter(a);
break;
case 27:this.handleEsc(a);
break;
case 32:this.handleSpace(a);
break;
case 37:this.handleLeft(a);
break;
case 38:this.handleUp(a);
break;
case 39:this.handleRight(a);
break;
case 40:this.handleDown(a);
break
}},handleEnter:function(a){if(YDom.hasClass(this.container,"a11y-hidden")){YEvent.preventDefault(a);
this.showMenu()
}},handleEsc:function(a){var b=YEvent.getTarget(a);
if(YDom.getAncestorByTagName(b,"ol")){this.jumpLink.focus()
}else{YEvent.preventDefault(a);
this.hideMenu()
}},handleSpace:function(a){YEvent.preventDefault(a);
this.showMenu()
},handleLeft:function(a){var d=YEvent.getTarget(a),c,b;
YEvent.preventDefault(a);
if(!YDom.getAncestorByTagName(d,"ol")){c=YDom.getAncestorByTagName(d,"li");
b=YDom.getPreviousSibling(c);
if(b){b.getElementsByTagName("a")[0].focus()
}}},handleUp:function(a){var d=YEvent.getTarget(a),c,b;
YEvent.preventDefault(a);
if(YDom.getAncestorByTagName(d,"ol")){c=YDom.getAncestorByTagName(d,"li");
b=YDom.getPreviousSibling(c);
if(b){b.getElementsByTagName("a")[0].focus()
}}},handleRight:function(a){var d=YEvent.getTarget(a),c,b;
YEvent.preventDefault(a);
if(d===this.toolbar){this.toolbar.getElementsByTagName("a")[0].focus()
}else{if(!YDom.getAncestorByTagName(d,"ol")){c=YDom.getAncestorByTagName(d,"li");
b=YDom.getNextSibling(c);
if(b){b.getElementsByTagName("a")[0].focus()
}}}},handleDown:function(a){var d=YEvent.getTarget(a),c,b;
YEvent.preventDefault(a);
if(d===this.subMenu||d===this.jumpLink){this.subMenu.getElementsByTagName("a")[0].focus()
}else{if(YDom.getAncestorByTagName(d,"ol")){c=YDom.getAncestorByTagName(d,"li");
b=YDom.getNextSibling(c);
if(b){b.getElementsByTagName("a")[0].focus()
}}}}};