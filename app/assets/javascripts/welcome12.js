LI.define("Discovery");
LI.Discovery=function(b,a){if(!b){return
}this.module=b;
this.config=a;
this.highlightedItem=0;
this.numVisible=this.config.numVisible||4;
this.pageWidth=this.config.pageWidth||244;
this.itemWidth=this.config.itemWidth||61;
this.currentItemWidth=this.config.currentItemWidth||65;
this.panelWidth=this.config.panelWidth||278;
this.peekWidth=this.config.peekWidth||27;
this.peek="right";
this.startMargin=0;
this.sliderOffset=this.config.sliderOffset||0;
this.panel=Y$(".discovery-panel",this.module,true);
this.tabSlider=this.module.getElementsByTagName("ol")[0];
this.detailList=this.tabSlider.getElementsByTagName("dl");
this.navNext=YDom.get(this.config.navNext)||Y$(".discovery-next",this.module,true);
this.navPrevious=YDom.get(this.config.navPrevious)||Y$(".discovery-prev",this.module,true);
this.itemList=this.tabSlider.getElementsByTagName("li");
this.imgList=this.tabSlider.getElementsByTagName("img");
this.loader=Y$(".discovery-spinner",this.module,true);
this.itemCount=this.itemList.length;
this.prefetchedPages=this.config.prefetchedPages||3;
this.startPage=0;
this.currentPage=0;
this.maxPages=this.itemCount%this.numVisible===0?(Math.floor(this.itemCount/this.numVisible)-1):Math.floor(this.itemCount/this.numVisible);
this.timer=null;
this.endpoint=this.config.endpoint||"";
this.offset=+this.config.offset||0;
this.fetch=this.config.fetch||false;
this.fetches=[];
this.fetchParams=this.config.fetchParams||{};
this.vieweeId=this.config.viewerId||LI.getQueryStringParam("id");
this.template=this.config.template;
this.max=+this.config.max||false;
this.rootContext=this.config.rootContext||"RightTop.discovery.people";
this.offsetKey=this.config.offsetKey||"offset";
this.recordsKey=this.config.recordsKey||"records";
this.panelTransitions=this.config.panelTransitions||false;
this.nextEvent=new YAHOO.util.CustomEvent("next",this);
this.prevEvent=new YAHOO.util.CustomEvent("prev",this);
if(a.legacy){this.init=function(){YEvent.addListener(this.module,"click",this.handleClick,this,true);
YEvent.addListener(this.module,"focusin",this.handleFocus,this,true);
YEvent.addListener(this.imgList,"mouseover",this.handleHover,this,true);
YEvent.addListener(this.imgList,"mouseout",this.clearTimer,this,true);
this.setupNav();
this.setupTabs();
this.setupIndex();
this.updateHighlight()
};
this.handleClick=function(c){if(YEvent.getTarget(c)===this.navNext){if(this.currentPage<this.maxPages){this.goNext()
}else{if(this.fetch){this.fetchMore()
}}}if(YEvent.getTarget(c)===this.navPrevious){if(this.currentPage>this.startPage){this.goBack()
}}};
this.handleHover=function(d){var e=this,f=YEvent.getTarget(d),c=LI.getDataAttribute(f.parentNode.parentNode,"index");
this.timer=setTimeout(function(){e.updateHighlight(c)
},300)
};
this.goNext=function(){this.currentPage++;
this.startMargin=this.startMargin-this.pageWidth;
YDom.setStyle(this.tabSlider,"margin-left",this.startMargin+"px");
this.setupNav();
this.updateHighlight();
this.setupTabs()
};
this.goBack=function(){this.currentPage--;
this.startMargin=this.startMargin+this.pageWidth;
YDom.setStyle(this.tabSlider,"margin-left",this.startMargin+"px");
this.setupNav();
this.updateHighlight();
this.setupTabs()
};
this.fetchMore=function(){var c,k,i,g,e,f,h,m,d,l,j;
c=this.endpoint;
i=(this.currentPage*this.numVisible)+this.numVisible+this.offset;
g=this.numVisible*2;
e=this.fetchParams;
f=this.vieweeId;
j="";
h={id:f,offset:i,records:g};
for(k in e){if(e.hasOwnProperty(k)){h[k]=e[k]
}}for(k in h){if(h.hasOwnProperty(k)){j+=k+"="+h[k]+"&"
}}m=function(o){var n;
if(o.responseText){n=o.responseText.RightTop||o.responseText.Discovery||o.responseText
}if((n&&n.discovery&&n.discovery.people&&n.discovery.people.length<this.numVisible)||(this.max&&this.max<=this.itemCount+this.offset+this.numVisible)){this.fetch=false;
this.setupNav()
}if(n&&n.discovery&&n.discovery.people&&n.discovery.people.length>0){n.discovery.people=n.discovery.people.splice(0,this.numVisible);
this.itemCount=this.itemCount+this.numVisible;
this.maxPages++;
this.renderMore(n);
this.setupIndex();
this.goNext()
}LI.hide(this.loader)
};
d=function(){LI.hide(this.loader)
};
l={success:m,failure:d,scope:this};
LI.show(this.loader);
LI.asyncRequest("POST",c,l,j)
};
this.renderMore=function(d){var c=this.tabSlider;
YEvent.purgeElement(this.tabSlider,true);
dust.render(this.template,d.discovery,function(f,e){c.innerHTML+=e
});
YEvent.addListener(this.imgList,"mouseover",this.handleHover,this,true);
YEvent.addListener(this.imgList,"mouseout",this.clearTimer,this,true)
}
}this.init()
};
LI.Discovery.prototype={init:function(){var a=this.prefetchedPages*this.numVisible,b=this.itemCount;
if(a!==b){this.fetch=false
}YDom.addClass(this.module,"discovery-peek-right");
YEvent.addListener(this.module,"click",this.handleClick,this,true);
YEvent.addListener(this.module,"focusin",this.handleFocus,this,true);
YEvent.addListener(this.module,"mouseover",this.handleMouseOver,this,true);
YEvent.addListener(this.module,"mouseout",this.handleMouseOut,this,true);
this.setupNav();
this.setupTabs();
this.setupIndex();
this.updateHighlight()
},handleClick:function(a){if(YEvent.getTarget(a)===this.navNext){if(this.fetches.length&&this.currentPage===this.maxPages-1){YDom.addClass(this.module,"discovery-loading")
}else{if(this.fetch){if(this.currentPage+this.prefetchedPages>=this.maxPages&&this.currentPage<this.maxPages){this.goNext();
this.fetchMore()
}else{if(this.currentPage+this.prefetchedPages<this.maxPages){this.goNext()
}else{if(this.currentPage===this.maxPages){this.fetchMore(true)
}}}}else{if(this.currentPage<this.maxPages){this.goNext()
}}}}if(YEvent.getTarget(a)===this.navPrevious){if(this.currentPage>this.startPage){this.goBack()
}}},handleFocus:function(b){var a;
if(YEvent.getTarget(b).parentNode.parentNode===this.tabSlider){a=LI.getDataAttribute(YEvent.getTarget(b).parentNode,"index");
this.updateHighlight(a)
}},clearTimer:function(){if(this.timer){clearTimeout(this.timer)
}},handleMouseOver:function(c){var d=this,f=YEvent.getTarget(c),b=parseInt(LI.getDataAttribute(f.parentNode.parentNode,"index"),10),e=(this.currentPage+1)*this.numVisible,a=(this.currentPage)*this.numVisible;
if(b>=0){this.timer=setTimeout(function(){if(d.peek==="right"&&b===e){d.goTo(b,"right")
}else{if(d.peek==="left"&&b===a){d.goTo(b)
}}d.updateHighlight(b)
},250)
}},handleMouseOut:function(){this.clearTimer()
},emitEvent:function(b){var a=b+"Event";
if(this[a]){this[a].fire({currentPage:this.currentPage,maxPages:this.maxPages,itemsPerPage:this.numVisible,totalItems:this.itemCount})
}},goNext:function(){this.currentPage++;
this.goTo(this.currentPage*this.numVisible);
this.updateHighlight();
this.setupNav();
this.setupTabs();
this.emitEvent("next")
},goBack:function(){this.currentPage--;
this.goTo(this.currentPage*this.numVisible);
this.updateHighlight();
this.setupNav();
this.setupTabs();
this.emitEvent("prev")
},goTo:function(a,b){b=b||"left";
if(a>=0){if(b==="left"){this.peek="right";
YDom.addClass(this.module,"discovery-peek-right");
YDom.removeClass(this.module,"discovery-peek-left");
this.startMargin=-(a*(this.itemWidth+this.sliderOffset))
}else{this.peek="left";
YDom.addClass(this.module,"discovery-peek-left");
YDom.removeClass(this.module,"discovery-peek-right");
this.startMargin=-((a-this.numVisible)*(this.itemWidth+this.sliderOffset)+this.peekWidth)
}YDom.setStyle(this.tabSlider,"margin-left",this.startMargin+"px")
}},setupNav:function(){if((this.itemCount<=this.numVisible&&!this.fetch)||(this.itemCount<this.numVisible)||(this.max&&this.max-this.offset<=this.numVisible)){this.hideNav()
}else{if(this.currentPage===this.startPage){YDom.addClass(this.navPrevious,"disabled");
YDom.removeClass(this.navNext,"disabled")
}else{if((this.currentPage===this.maxPages&&!this.fetch)||(this.max&&this.max<=this.itemCount+this.offset)){YDom.addClass(this.navNext,"disabled");
YDom.removeClass(this.navPrevious,"disabled")
}else{YDom.removeClass(this.navNext,"disabled");
YDom.removeClass(this.navPrevious,"disabled")
}}}},setupTabs:function(){var d,b=this.itemList,c,a;
for(c=0,a=this.itemCount;
c<a;
c++){if(b[c]){d=Y$("a",this.itemList[c],true);
if(d){YDom.setAttribute(this.itemList[c].getElementsByTagName("a")[0],"tabindex","-1")
}}}for(c=this.currentPage*this.numVisible,a=c+this.numVisible;
c<a;
c++){if(this.itemList[c]){d=Y$("a",this.itemList[c],true);
if(c<this.itemCount&&d){YDom.setAttribute(this.itemList[c].getElementsByTagName("a")[0],"tabindex","0")
}}}},setupIndex:function(){for(var a=0;
a<this.itemCount;
a++){if(this.itemList[a]){LI.setDataAttribute(this.itemList[a],"index",a)
}}},updateHighlight:function(a){YDom.removeClass(this.detailList[this.highlightedItem],"selected");
YDom.removeClass(this.itemList[this.highlightedItem],"discovery-active");
if(a){this.highlightedItem=a
}else{this.highlightedItem=this.currentPage*this.numVisible
}YDom.addClass(this.detailList[this.highlightedItem],"selected");
YDom.addClass(this.itemList[this.highlightedItem],"discovery-active");
if(this.panelTransitions){this.panel.className="discovery-panel";
YDom.addClass(this.panel,LI.getDataAttribute(this.itemList[this.highlightedItem],"type")+"-active")
}},fetchMore:function(n){var a=this.endpoint,k=this.itemCount+this.offset,g=(this.currentPage-this.maxPages+this.prefetchedPages)*this.numVisible,e=this.fetchParams,f=this.vieweeId,b="",j,d,o,m,h;
if(this.fetches.length){for(m=0,h=this.fetches.length;
m<h;
m+=1){k+=this.fetches[m];
g-=this.fetches[m]
}}this.fetches.push(g);
j={};
if(f){j.id=f
}j[this.offsetKey]=k;
j[this.recordsKey]=g;
for(o in e){if(e.hasOwnProperty(o)){j[o]=e[o]
}}for(o in j){if(j.hasOwnProperty(o)){b+=o+"="+j[o]+"&"
}}function p(s){var y=s.responseText,w=y,u=0,z,r,t,v,x=this.max,q=this.offset,l=this.itemCount,A=this.numVisible;
if(y&&y.Discovery){this.rootContext="Discovery.discovery.people"
}if(w){r=this.rootContext.split(".");
for(t=0,v=r.length;
t<v;
t++){if(!w[r[t]]){break
}z=w;
w=w[r[t]]
}u=w.length||0
}this.fetches.shift();
if(u<A||x&&x<=l+q+A){this.fetch=false
}if(YAHOO.lang.isArray(w)&&u>0){this.itemCount+=u;
this.maxPages+=Math.ceil(u/A);
this.renderMore(z);
this.setupIndex();
this.setupNav()
}if((n&&u>0)||YDom.hasClass(this.module,"discovery-loading")){this.goNext();
if(this.fetch&&YDom.hasClass(this.module,"discovery-loading")){this.fetchMore()
}}YDom.removeClass(this.module,"discovery-loading")
}function c(){this.fetches.shift();
YDom.removeClass(this.module,"discovery-loading")
}d={success:p,failure:c,scope:this};
if(n){YDom.addClass(this.module,"discovery-loading")
}LI.asyncRequest("POST",a,d,b)
},renderMore:function(e){var d=this.tabSlider,c=document.createElement("div"),f=document.createDocumentFragment(),b,a;
dust.render(this.template,e,function(h,g){c.innerHTML=g;
for(b=0,a=c.children.length;
b<a;
b+=1){f.appendChild(c.children[0])
}d.appendChild(f)
})
},hideNav:function(){LI.hide(this.navNext);
LI.hide(this.navPrevious)
}};LI.define("RecentActivities");
LI.RecentActivities=function(g,b){var f,e,d;
if(!g||!b){return
}f=g,e="discovery-photo",d="li-trkcode";
function c(){YEvent.on(f,"mouseover",h)
}function h(i){var l=YEvent.getTarget(i),k=l.tagName==="A"?l:YDom.getAncestorByTagName(l,"A"),j="";
if(k&&YDom.hasClass(k,e)){j=LI.getDataAttribute(k,d);
if(WebTracking&&j){WebTracking.trackUserAction(j)
}}}(function a(){c()
})()
};LI.define("ShareStats");
LI.ShareStats=function(c,aF){var E,bb,bu,ao,br,A,ay,y,aY,O,aw,aj,ah,aD,n,bo,R,ab,bf,l,I,aO,v,H,m,a5,av,aJ,aE,a4,W,bd,N,a3,ap,e,bk,bm,bq,ai,a9,aR,J,j,bg,ak,q,aT,w,k,ac,bs,S,B,ar,r,T,ae,ax,ag,K,aC,be,i,C,L,b,aI,bi,al,a8,aN,bn,aa,aK,at,a0,U,aq,o,bc,aQ,M,aU,aX,a;
if(!c||!aF){return
}aF={idStats:aF.idStats||"",idUpdate:aF.idUpdate||"",idCallout:aF.idCallout||"",idShareDetails:aF.idShareDetails||"",instructionsLabel:aF.instructionsLabel||"",viewsOnlyTotal:aF.viewsOnlyTotal||"",viewsOnlyLabel:aF.viewsOnlyLabel||"",dataViews:aF.dataViews||["",0,0,0],dataLikes:aF.dataLikes||["",0,0,0],dataComments:aF.dataComments||["",0,0,0],dataReshares:aF.dataReshares||["",0,0,0],totalsFormatted:aF.totalsFormatted||["","","",""],memberPhotoURL:aF.memberPhotoURL||"http://www.linkedin.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_60x60_v1.png",isViewsOnly:aF.isViewsOnly||false,isConnectionsOnly:aF.isConnectionsOnly||false,isNo2ndDegree:aF.isNo2ndDegree||false,isNo3rdDegree:aF.isNo3rdDegree||false,isAggregate:aF.isAggregate||false,isShareTeaser:aF.isShareTeaser||false,isInitialEntry:aF.isInitialEntry||false,SVGAriaLabel:aF.SVGAriaLabel||"",SVGDesc:aF.SVGDesc||"",locale:aF.locale||""};
E=aF.idStats,bb=aF.idUpdate,bu=aF.idCallout,ao=aF.idShareDetails,br="callout-overlay",A="share-stats-widget",ay="callout-content",y="carousel-entry",aY="carousel-viewport",O="comment",aw="content-inner",aj="share-teaser-overlay",ah="transparent-overlay",aD="wvyu-callout-content",n=105,bo=185,R=78,ab=70,bf=22,l=12,I=4,aO=I+2,v=30,H=100,m={"DEFAULT":278},a5={"DEFAULT":290,"SHARE_TEASER":204,"VIEWS_ONLY":220,"AGGREGATE":312},av={"LEGEND":"LEGEND","NETWORK":"NETWORK"},aJ={"FIRST":"1ST","SECOND":"2ND","THIRD":"3RD"},aE={"LEGEND":"LEGEND","NETWORK_DOT":"NETWORK_DOT"},a4={"VIEWS":"VIEWS","LIKES":"LIKES","COMMENTS":"COMMENTS","RESHARES":"RESHARES"},W={"DEFAULT":"DEFAULT","VIEWS_AND_CONNECTIONS":"VIEWS_AND_CONNECTIONS","VIEWS_ONLY":"VIEWS_ONLY","CONNECTIONS_ONLY":"CONNECTIONS_ONLY","NO_2ND_DEGREE_AND_NO_3RD_DEGREE":"NO_2ND_DEGREE_AND_NO_3RD_DEGREE","NO_3RD_DEGREE":"NO_3RD_DEGREE"},bd={"DEFAULT":"DEFAULT","AGGREGATE":"AGGREGATE"},N={"ENGLISH":"en_US","FRENCH":"fr_FR"},a3="#7A30CE",ap="#6A9530",e="#DD6423",bk="#E31D74",bm={"fill":"#333","font-family":"Helvetica","font-size":"32","text-anchor":"start"},bq={"fill":"#333","font-family":"Helvetica","font-size":"13","text-anchor":"start"},ai={"fill":"url("+aF.memberPhotoURL+")","stroke":"transparent"},a9={"stroke":"#333"},aR={"fill":"#FFF","stroke":"#333","stroke-dasharray":". "},J={"fill":"#FFF"},j={"fill":"#CCE9FF"},bg={"stroke":"#2E8DD7","stroke-dasharray":""},ak={"fill":a3,"stroke-width":"0"},q={"fill":a3,"stroke":a3},aT={"fill":ap,"stroke":ap},w={"fill":e,"stroke":e},k={"fill":bk,"stroke":bk},ac={"fill":"none","stroke":a3},bs={"fill":"none","stroke":ap},S={"fill":"none","stroke":e},B={"fill":"none","stroke":bk},ar={"stroke":"#999"},r={"fill":"#999","font-size":"11","text-anchor":"end"},T={"cursor":"default","fill":"#FFF","font-family":"Helvetica","font-size":"32","text-anchor":"start"},ae={"cursor":"default","fill":"#FFF","font-size":"13","text-anchor":"start"},ax="balloon-callout-type",ag=aJ.FIRST.concat("-",av.NETWORK),K=aJ.SECOND.concat("-",av.NETWORK),aC=aJ.THIRD.concat("-",av.NETWORK),be="li-trkcode",L=W.DEFAULT,b=bd.DEFAULT,aI=c,bi=null,al=null,a8=null,aN={},bn=YDom.get(bb),aa=YDom.get(bu),aK=aa?YDom.getElementsByClassName(ay,"div",aa)[0]:null,at=YDom.get(A),a0={},U={"circle":null,"degree":null,"setDots":null,"setDotsOutline":null},aq=false,bc=null,aQ=200,M=500;
aU=[];
function af(){var bv=YDom.get(br),bw=YDom.getElementsByClassName(O,"a",bn)[0];
YEvent.on(bv,"mouseover",function(bx){if(YDom.hasClass(this,bu)){clearTimeout(bc)
}an(bx)
});
YEvent.on(bv,"mouseout",function(){if(YDom.hasClass(this,bu)){clearTimeout(bc);
bt()
}});
YEvent.on(bw,"mouseover",function(){clearTimeout(bc);
s()
});
aq=true
}function g(bv,by){var bx=bv.data("typeAction"),bw=bx?("nmp_wvmu_dot_"+by+"_"+bx+"_hover").toLowerCase():("nmp_wvmu_lowstate_"+by+"_circle_hover").toLowerCase();
if(!aU[bw]&&WebTracking){aU[bw]=true;
WebTracking.trackUserAction(bw)
}}function aH(bz,bB,bA,by,bv){var bx=null,bw=null;
if(!V()){bx=function(){aG(this,bB,bA,by,bv);
g(this,bA)
};
bw=function(){bt()
};
bz.hover(bx,bw);
bv.hide()
}}function a1(){YEvent.on(at,"mouseover",an)
}function f(bv,bz,by,bx){var bw=bi.circle(bv,bz,I).data("typeAction",by);
bw.data(ax,bx.concat("-",by));
switch(by){case a4.VIEWS:return bw.attr(q);
case a4.LIKES:return bw.attr(aT);
case a4.COMMENTS:return bw.attr(w);
case a4.RESHARES:return bw.attr(k);
default:return{}
}}function G(bv,by,bx){var bw=bi.circle(bv,by,aO);
switch(bx){case a4.VIEWS:return bw.attr(ac);
case a4.LIKES:return bw.attr(bs);
case a4.COMMENTS:return bw.attr(S);
case a4.RESHARES:return bw.attr(B);
default:return{}
}}function aA(bv,bw){bi.path("M"+bv+","+bw+" "+"h"+l).attr(a9)
}function am(bz,by){var bv=0,bC=0,bw=0,bD=0,bB=0,bA=0,bx="",bE="";
al=bi.set();
if(b===bd.AGGREGATE){bv=bz+192;
bC=bv-5;
bw=bv+20;
bD=by-15;
bB=bD-2;
bA=bD-33;
bx="l-8,1 l2,-8";
bE="c0,0,19,-10,9,-21"
}else{bv=bz+35;
bC=bv-15;
bw=bv-13;
bD=by+75;
bB=bD+8;
bA=bD;
bx="l8,-3 l0,8";
bE="c0,0,10,10,20,-7"
}al.push(bi.path("M"+bv+","+bD+" "+bx+" "+"M"+bC+","+bB+" "+bE).attr(ar),bi.text(bw,bA,aF.instructionsLabel).attr(r));
return al
}function Y(bx,bw){var bD=d(aE.LEGEND),bB=bD.length,bv="",bA=0,bE=0,bF=0,bC={"dot":0,"total":0,"label":0},bz={"dot":0,"total":0,"label":0};
bz.dot=bw-124;
bz.total=bw-150;
bz.label=bw-125;
for(var by=0;
by<bB;
by++){bv=bD[by];
bA=by+1;
bE=t(bv);
bF=F(bv);
switch(bA){case 1:bC.dot=7;
break;
case 2:bC.dot=102;
break;
case 3:bC.dot=(aF.locale===N.FRENCH?187:197);
break;
default:break
}f(bC.dot,bz.dot,bv,av.LEGEND);
bi.text(bC.dot-I,bz.total,bE).attr(bm);
bi.text(bC.dot+I+5,bz.label,bF).attr(bq)
}}function ad(bw,by,bx,bv){a2(bw,by);
aA(bw,by);
Q(bw,by,bx,bv);
if(V()){bl()
}else{am(bw,by);
Y(bw,by)
}}function Q(bA,by,bE,bF){var bI=bF[aJ.FIRST],bD=bF[aJ.SECOND],bx=bF[aJ.THIRD],bB=bA+l,bH=bB+bI,bz=bB+bD,bw=bB+bx,bC=null,bv=null,bJ=null,bG=null;
bJ=bi.circle(bw,by,bx).attr(aR);
bv=bi.circle(bz,by,bD).attr(aR);
bC=bi.circle(bH,by,bI).attr(aR);
bJ.data(ax,aC);
bv.data(ax,K);
bC.data(ax,ag);
if(aB()){bC.attr(ak)
}else{bC.attr(bg)
}a0[aJ.FIRST]=0;
a0[aJ.SECOND]=0;
a0[aJ.THIRD]=0;
if(u()){D(bE,bC,aJ.FIRST);
bG=bi.set();
bG.push(bv,bJ);
aH(bG,bG,aJ.SECOND,bi.set(),bi.set())
}else{D(bE,bC,aJ.FIRST);
D(bE,bv,aJ.SECOND);
D(bE,bJ,aJ.THIRD)
}}function D(bR,bD,bA){var bE=bR.length,bN=bD.attrs,bG=bN.cx,bI=bN.cy,bC=bN.r,bJ=aV(bR,bA),bF=bJ.length,bO=0,bL={},bH={},bP=0,by=0,bw=0,bQ="",bB="",bz=null,bM=null,bv=null,bx=null,bK=null;
if((aB())&&(bA===aJ.FIRST)){bF=0;
bx=bi.text(bG-(0.6*bC),bI-10,aF.viewsOnlyTotal).attr(T);
bK=bi.text(bG-(0.6*bC)+4,bI+12,aF.viewsOnlyLabel).attr(ae);
bx.data(ax,ag);
bK.data(ax,ag);
aH(bD,bD,bA,bi.set(),bi.set())
}else{if(bF===0){aH(bD,bD,bA,bi.set(),bi.set())
}else{for(bP=0;
bP<bE;
bP++){bQ=bR[bP];
bL[bQ]=bi.set();
bH[bQ]=bi.set()
}for(bP=0;
bP<bF;
bP++){bz=Z(bG,bI,bA,bP+1);
by=bz.cx;
bw=bz.cy;
bB=bJ[bP];
bM=f(by,bw,bB,bA);
bL[bB].push(bM);
if(!V()){bv=G(by,bw,bB);
bH[bB].push(bv)
}bO++
}if(!V()){for(bP=0;
bP<bE;
bP++){bQ=bR[bP];
if(bL[bQ].length>0){aH(bL[bQ],bD,bA,bL[bQ],bH[bQ])
}}}a0[bA]=bO
}}}function a2(bv,bw){bi.circle(bv-v,bw,v).attr(ai)
}function aV(bD,bx){var bK=h(bD,bx),bC=aM(bx),bB=bD.length,bv={},bE=[],bA=0,by=0,bH=0,bI=0,bG=0,bJ=0,bF=0,bz=0,bw="";
for(bA=0;
bA<bB;
bA++){bw=bD[bA];
bH=bK?aP(bw,bx):P(bw,bx);
bv[bw]=bH;
for(by=0;
by<bH;
by++){bE.push(bw)
}}bI=bE.length;
while(bI--){bG=Math.floor(Math.random()*(bI+1));
bJ=bE[bI];
bE[bI]=bE[bG];
bE[bG]=bJ
}bE=bE.slice(0,Math.min(bC,bE.length));
for(bA=0;
bA<bB;
bA++){bw=bD[bA];
bH=bv[bw];
if((bH>0)&&(bE.indexOf(bw)===-1)){bE.unshift(bw);
bF=bE.length;
do{bz=bE[--bF]
}while(bF&&(typeof(bz)!=="undefined")&&(bE.indexOf(bz)===_.lastIndexOf(bE,bz)));
bE.splice(bF,1)
}}return bE
}function X(bA,by,bx,bw){var bv=bA,bz=by;
if(bx===aJ.FIRST){if(bw===1){bv=bA-5;
bz=by+1
}else{if(bw===2){bv=bA+3;
bz=by+16
}else{if(bw===3){bv=bA+9;
bz=by-3
}else{if(bw===4){bv=bA-9;
bz=by-16
}else{if(bw===5){bv=bA-12;
bz=by+17
}else{if(bw===6){bv=bA+17;
bz=by+10
}else{if(bw===7){bv=bA+8;
bz=by-19
}else{if(bw===8){bv=bA-20;
bz=by-1
}}}}}}}}}else{if(bx===aJ.SECOND){if(bw===1){bv=bA+22;
bz=by+1
}else{if(bw===2){bv=bA+27;
bz=by-15
}else{if(bw===3){bv=bA+40;
bz=by
}else{if(bw===4){bv=bA+32;
bz=by+15
}else{if(bw===5){bv=bA+12;
bz=by+15
}else{if(bw===6){bv=bA+14;
bz=by+31
}else{if(bw===7){bv=bA+31;
bz=by+33
}else{if(bw===8){bv=bA+42;
bz=by-18
}else{if(bw===9){bv=bA+12;
bz=by-17
}else{if(bw===10){bv=bA-2;
bz=by+33
}else{if(bw===11){bv=bA+27;
bz=by-31
}else{if(bw===12){bv=bA+14;
bz=by+45
}else{if(bw===13){bv=bA+3;
bz=by-33
}else{if(bw===14){bv=bA-7;
bz=by+47
}else{if(bw===15){bv=bA+16;
bz=by-44
}else{if(bw===16){bv=bA-22;
bz=by+40
}else{if(bw===17){bv=bA-15;
bz=by-40
}}}}}}}}}}}}}}}}}}else{if(bx===aJ.THIRD){if(bw===1){bv=bA+44;
bz=by+2
}else{if(bw===2){bv=bA+50;
bz=by+18
}else{if(bw===3){bv=bA+63;
bz=by+2
}else{if(bw===4){bv=bA+65;
bz=by+21
}else{if(bw===5){bv=bA+59;
bz=by-15
}else{if(bw===6){bv=bA+54;
bz=by+35
}else{if(bw===7){bv=bA+39;
bz=by-17
}else{if(bw===8){bv=bA+34;
bz=by+41
}else{if(bw===9){bv=bA+35;
bz=by+24
}else{if(bw===10){bv=bA+62;
bz=by-31
}else{if(bw===11){bv=bA+43;
bz=by-33
}else{if(bw===12){bv=bA+47;
bz=by+52
}else{if(bw===13){bv=bA+26;
bz=by-41
}else{if(bw===14){bv=bA+33;
bz=by+61
}else{if(bw===15){bv=bA+50;
bz=by-48
}else{if(bw===15){bv=bA+18;
bz=by+51
}else{if(bw===14){bv=bA+50;
bz=by-48
}else{if(bw===15){bv=bA+34;
bz=by-56
}else{if(bw===16){bv=bA+12;
bz=by-54
}else{if(bw===17){bv=bA+35;
bz=by-56
}else{if(bw===18){bv=bA+17;
bz=by+51
}else{if(bw===19){bv=bA+22;
bz=by-68
}else{if(bw===20){bv=bA+14;
bz=by+68
}else{if(bw===21){bv=bA+2;
bz=by-68
}else{if(bw===22){bv=bA-3;
bz=by+62
}else{if(bw===23){bv=bA-17;
bz=by-66
}else{if(bw===24){bv=bA-21;
bz=by+66
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}return{"cx":bv,"cy":bz}
}function ba(bA,by,bx,bw){var bv=bA,bz=by;
if(bx===aJ.FIRST){if(bw===1){bv=bA-5;
bz=by+1
}else{if(bw===2){bv=bA+7;
bz=by-12
}else{if(bw===3){bv=bA+12;
bz=by+7
}else{if(bw===4){bv=bA+2;
bz=by+22
}else{if(bw===5){bv=bA+22;
bz=by+22
}else{if(bw===6){bv=bA-14;
bz=by+17
}else{if(bw===7){bv=bA-12;
bz=by-15
}else{if(bw===8){bv=bA+24;
bz=by-8
}else{if(bw===9){bv=bA-24;
bz=by
}else{if(bw===10){bv=bA-31;
bz=by-16
}else{if(bw===11){bv=bA-31;
bz=by+21
}else{if(bw===12){bv=bA+23;
bz=by+38
}else{if(bw===13){bv=bA-17;
bz=by+34
}else{if(bw===14){bv=bA+33;
bz=by+7
}else{if(bw===15){bv=bA+16;
bz=by-25
}else{if(bw===16){bv=bA-25;
bz=by-34
}else{if(bw===17){bv=bA+5;
bz=by+41
}else{if(bw===18){bv=bA-3;
bz=by-31
}else{if(bw===19){bv=bA-43;
bz=by+4
}else{if(bw===20){bv=bA+41;
bz=by-14
}else{if(bw===21){bv=bA+40;
bz=by+27
}else{if(bw===22){bv=bA+35;
bz=by-31
}else{if(bw===23){bv=bA+21;
bz=by-44
}else{if(bw===24){bv=bA-13;
bz=by-48
}else{if(bw===25){bv=bA+5;
bz=by-50
}else{if(bw===26){bv=bA-41;
bz=by-27
}else{if(bw===27){bv=bA-33;
bz=by+38
}else{if(bw===28){bv=bA-49;
bz=by-11
}else{if(bw===29){bv=bA+49;
bz=by+6
}else{if(bw===30){bv=bA-46;
bz=by+21
}else{if(bw===31){bv=bA-10;
bz=by+48
}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}return{"cx":bv,"cy":bz}
}function x(bA,by,bx,bw){var bv=bA,bz=by;
if(bx===aJ.FIRST){if(bw===1){bv=bA+3;
bz=by-10
}else{if(bw===2){bv=bA-7;
bz=by+6
}else{if(bw===3){bv=bA+10;
bz=by+7
}else{if(bw===4){bv=bA+20;
bz=by-4
}else{if(bw===5){bv=bA-17;
bz=by-9
}else{if(bw===6){bv=bA-24;
bz=by+14
}else{if(bw===7){bv=bA-7;
bz=by+22
}else{if(bw===8){bv=bA+15;
bz=by+24
}else{if(bw===9){bv=bA-32;
bz=by-1
}else{if(bw===10){bv=bA+17;
bz=by-21
}else{if(bw===11){bv=bA-6;
bz=by-22
}else{if(bw===12){bv=bA-27;
bz=by-21
}else{if(bw===13){bv=bA+27;
bz=by+13
}else{if(bw===14){bv=bA-20;
bz=by+30
}else{if(bw===15){bv=bA+8;
bz=by-35
}else{if(bw===16){bv=bA+2;
bz=by+35
}else{if(bw===17){bv=bA+33;
bz=by-13
}else{if(bw===18){bv=bA-14;
bz=by-34
}}}}}}}}}}}}}}}}}}}else{if(bx===aJ.SECOND){if(bw===1){bv=bA+44;
bz=by-1
}else{if(bw===2){bv=bA+35;
bz=by+15
}else{if(bw===3){bv=bA+54;
bz=by+11
}else{if(bw===4){bv=bA+51;
bz=by+27
}else{if(bw===5){bv=bA+57;
bz=by-8
}else{if(bw===6){bv=bA+38;
bz=by+35
}else{if(bw===7){bv=bA+52;
bz=by-24
}else{if(bw===8){bv=bA+37;
bz=by-16
}else{if(bw===9){bv=bA+29;
bz=by
}else{if(bw===10){bv=bA+24;
bz=by+24
}else{if(bw===11){bv=bA+24;
bz=by-27
}else{if(bw===12){bv=bA+41;
bz=by-36
}else{if(bw===13){bv=bA+17;
bz=by-42
}else{if(bw===14){bv=bA+32;
bz=by-50
}else{if(bw===15){bv=bA+30;
bz=by+50
}else{if(bw===16){bv=bA+16;
bz=by+40
}else{if(bw===17){bv=bA+14;
bz=by+56
}else{if(bw===18){bv=bA+14;
bz=by-58
}else{if(bw===19){bv=bA+1;
bz=by-48
}else{if(bw===20){bv=bA+1;
bz=by+47
}else{if(bw===21){bv=bA-6;
bz=by+59
}else{if(bw===22){bv=bA-7;
bz=by-61
}else{if(bw===23){bv=bA-21;
bz=by+54
}else{if(bw===24){bv=bA-23;
bz=by-54
}}}}}}}}}}}}}}}}}}}}}}}}}}return{"cx":bv,"cy":bz}
}function Z(by,bx,bw,bv){switch(L){case W.DEFAULT:return X(by,bx,bw,bv);
case W.CONNECTIONS_ONLY:return ba(by,bx,bw,bv);
case W.NO_2ND_DEGREE_AND_NO_3RD_DEGREE:return ba(by,bx,bw,bv);
case W.NO_3RD_DEGREE:return x(by,bx,bw,bv);
default:return{"cx":by,"cy":bx}
}}function aM(bv){if(L===W.DEFAULT){switch(bv){case aJ.FIRST:return 8;
case aJ.SECOND:return 17;
case aJ.THIRD:return 24;
default:return 0
}}else{if((L===W.CONNECTIONS_ONLY)||(L===W.NO_2ND_DEGREE_AND_NO_3RD_DEGREE)){if(bv===aJ.FIRST){return 31
}else{return 0
}}else{if(L===W.NO_3RD_DEGREE){switch(bv){case aJ.FIRST:return 18;
case aJ.SECOND:return 24;
case aJ.THIRD:return 0;
default:return 0
}}}}return 0
}function F(bv){switch(bv){case a4.VIEWS:return aF.dataViews[0];
case a4.LIKES:return aF.dataLikes[0];
case a4.COMMENTS:return aF.dataComments[0];
case a4.RESHARES:return aF.dataReshares[0];
default:return""
}}function t(bw){var bv=0;
switch(bw){case a4.LIKES:bv=1;
break;
case a4.COMMENTS:bv=2;
break;
case a4.RESHARES:bv=3;
break;
default:break
}return aF.totalsFormatted[bv]
}function P(by,bx){var bw=[0],bv=0;
switch(by){case a4.VIEWS:bw=aF.dataViews;
break;
case a4.LIKES:bw=aF.dataLikes;
break;
case a4.COMMENTS:bw=aF.dataComments;
break;
case a4.RESHARES:bw=aF.dataReshares;
break;
default:break
}switch(bx){case aJ.FIRST:bv=1;
break;
case aJ.SECOND:bv=2;
break;
case aJ.THIRD:bv=3;
break;
default:break
}return V()?H:bw[bv]
}function aP(bx,bw){var bv=P(bx,bw),by=1;
if((bx===a4.VIEWS)&&(bv>7)){by=7
}else{if(bv>5){by=5
}}return Math.ceil(bv/by)
}function aZ(by){var bw=0,bx=0,bv="";
for(bv in aJ){bx=aJ[bv];
bw+=P(by,bx)
}return bw
}function an(bv){var bA=YEvent.getTarget(bv),bz=bA.tagName.toLowerCase()==="a"?bA:YDom.getAncestorByTagName(bA,"a"),by=bA.tagName.toLowerCase()==="button"?bA:YDom.getAncestorByTagName(bA,"button"),bx=bz||by,bw;
if(bx){bw=LI.getDataAttribute(bx,be);
if(WebTracking&&bw){WebTracking.trackUserAction(bw)
}}}function s(){if(!((aB())&&(U.degree===aJ.FIRST))){if(U.circle){U.circle.attr(J);
U.setDotsOutline.hide()
}}U={"circle":null,"degree":null,"setDots":null,"setDotsOutline":null}
}function aL(){var bx=m.DEFAULT,bw=a5.DEFAULT,bv=null,by=null,bz={};
a1();
if(!V()){p();
bj()
}if(V()){bw=a5.SHARE_TEASER
}else{if(aB()){bw=a5.VIEWS_ONLY
}else{if(b===bd.AGGREGATE){bw=a5.AGGREGATE
}}}bi=Raphael(E,bx,bw);
aS();
if(aF.isInitialEntry){bv=YDom.getAncestorByClassName(aI,aY),by=YDom.getAncestorByClassName(aI,y);
bz=YDom.getRegion(by);
YDom.setStyle(bv,"height",bz.height+"px")
}}function a6(bv){return(bv?(bv.hasOwnProperty("length")&&(bv.length>1)):false)
}function h(bw,bC){var by=aM(bC),bA=bw.length,bz=0,bB="",bv=false;
for(var bx=0;
bx<bA;
bx++){bB=h[bx];
bz+=P(bB,bC)
}bv=(bz>by)?true:false;
return bv
}function aW(by){var bw=U.setDots,bx=U.circle,bv=0,bz=0;
if(bw){bv=bw.length;
while(bv--){if(by===bw[bv]){return true
}}}if(a6(bx)){bz=bx.length;
while(bz--){if(by===bx[bz]){return true
}}}else{return by===bx
}}function u(){return((L===W.VIEWS_AND_CONNECTIONS)||(L===W.CONNECTIONS_ONLY))
}function aB(){return((L===W.VIEWS_AND_CONNECTIONS)||(L===W.VIEWS_ONLY))
}function V(){return aF.isShareTeaser
}function bp(){var bv={};
if(V()){bv[aJ.FIRST]=30;
bv[aJ.SECOND]=55;
bv[aJ.THIRD]=80
}else{if((L===W.VIEWS_AND_CONNECTIONS)||(L===W.VIEWS_ONLY)||(L===W.CONNECTIONS_ONLY)||(L===W.NO_2ND_DEGREE_AND_NO_3RD_DEGREE)){bv[aJ.FIRST]=60;
bv[aJ.SECOND]=70;
bv[aJ.THIRD]=80
}else{if(L===W.NO_3RD_DEGREE){bv[aJ.FIRST]=45;
bv[aJ.SECOND]=70;
bv[aJ.THIRD]=80
}else{bv[aJ.FIRST]=30;
bv[aJ.SECOND]=55;
bv[aJ.THIRD]=80
}}}return bv
}function au(){var bv=n,bw=bo;
if(V()){bw-=R
}else{if(aB()){bw-=ab
}else{if(b===bd.AGGREGATE){bv=2*v+5;
bw+=bf
}}}return{"cx":bv,"cy":bw}
}function d(bA){var bx=(bA===aE.LEGEND),by=0,bz=0,bw=0,bC=0,bB=[],bv=3;
if(bx){by=t(a4.VIEWS);
bz=t(a4.LIKES);
bw=t(a4.COMMENTS);
bC=t(a4.RESHARES)
}else{by=aZ(a4.VIEWS);
bz=aZ(a4.LIKES);
bw=aZ(a4.COMMENTS);
bC=aZ(a4.RESHARES)
}if(!aB()){if(by&&(by!=="0")){bB.push(a4.VIEWS)
}if(bz&&(bz!=="0")){bB.push(a4.LIKES)
}if(bw&&(bw!=="0")){bB.push(a4.COMMENTS)
}if(bC&&(bC!=="0")&&(bB.length<bv)){bB.push(a4.RESHARES)
}}return bB
}function aS(){var bx={},bw=[],bv={};
az();
bx=au(),bw=d(aE.NETWORK_DOT),bv=bp();
ad(bx.cx,bx.cy,bw,bv);
z()
}function p(){var bx=aF.isViewsOnly&&aF.isConnectionsOnly,bv=aF.isViewsOnly,by=aF.isConnectionsOnly,bw=aF.isNo2ndDegree,bz=aF.isNo3rdDegree;
if(bx){L=W.VIEWS_AND_CONNECTIONS
}else{if(bv){L=W.VIEWS_ONLY
}else{if(by){L=W.CONNECTIONS_ONLY
}else{if(bw&&bz){L=W.NO_2ND_DEGREE_AND_NO_3RD_DEGREE
}else{if(bz){L=W.NO_3RD_DEGREE
}}}}}}function bj(){b=aF.isAggregate?bd.AGGREGATE:bd.DEFAULT
}function bh(bN,bz,by){var bw=bN.data(ax),bF=bN.node,bB=bF.raphaelid,bH=bw.concat("-",bB),bG=a0[by],bL=15,bJ=10,bE={},bA={},bM=0,bD=0,bC=0,bx=0,bv=0,bK=0,bI=0;
if(aN.hasOwnProperty(bH)){a8=aN[bH]
}else{if((!a6(bz))&&(bN!==bz)){bE=bz.attrs;
bA=bN.attrs;
bM=bE.cx;
bD=bE.cy;
bC=bE.r;
bx=bA.hasOwnProperty("cx")?bA.cx:(bA.x-(bF.offsetWidth/2));
bv=bA.hasOwnProperty("cy")?bA.cy:(bA.y-(bF.offsetHeight/2));
bK=-(Math.abs((bM-bC)-bx));
bI=-(Math.abs((bD-bC)-bv));
bL=bK+bC-10;
bJ=bI+15;
if(bG>0){if(by===aJ.FIRST){if((L===W.CONNECTIONS_ONLY)||(L===W.NO_2ND_DEGREE_AND_NO_3RD_DEGREE)){if(bG<15){bL+=5;
bJ+=25
}}else{if(L===W.NO_3RD_DEGREE){if(bG<10){bL+=5;
bJ+=15
}}}}else{if(by===aJ.SECOND){if(L===W.NO_3RD_DEGREE){if(bG<7){bL+=50;
bJ+=40
}else{if(bG<13){bL+=35;
bJ+=25
}}}else{if(L===W.DEFAULT){if(bG<11){bL+=20;
bJ+=15
}}}}else{if(by===aJ.THIRD){if(L===W.DEFAULT){if(bG<10){bL+=60;
bJ+=40
}else{if(bG<16){bL+=35;
bJ+=15
}}}}}}}}else{if((bw===aC)&&(u())){bL-=10;
bJ+=10
}}aK.className=ay;
YDom.addClass(aK,aD);
YDom.addClass(aK,"content-"+bw.toLowerCase());
a8=new LI.BalloonCallout(bF,{id:bu,type:"hovercard-callout",orientation:"bottom",width:"auto",offsetX:bL,offsetY:bJ,events:[]});
aN[bH]=a8
}if(!aq){af()
}}function a7(bz,by,bx,bw,bv){al.hide();
if(!((aB())&&(bx===aJ.FIRST))){if(by){by.attr(j);
bv.show()
}}U={"circle":by,"degree":bx,"setDots":bw,"setDotsOutline":bv}
}function bl(){var by=YDom.getAncestorByClassName(aI,y),bx=by?YDom.getElementsByClassName(aj,"div",by)[0]:null,bA=bx?YDom.getElementsByClassName(aw,"div",bx)[0]:null,bw=bA?YDom.getElementsByClassName(ah,"div",bA)[0]:null,bz={},bv={};
if(bw){bz=YDom.getRegion(by);
bv=YDom.getRegion(bA);
YDom.setStyle(bx,"width",bz.width+"px");
YDom.setStyle(bx,"height",bz.height+"px")
}}function z(){var bx=YDom.getElementsByClassName(O,"a",bn)[0],bv=YDom.get(ao),bw=null;
if(b!==bd.AGGREGATE){if(bx&&bv){bw=new LI.BalloonCallout(bx,{id:ao,type:"hovercard-callout",orientation:"bottom",width:"auto"})
}LI.show(bn)
}}function aG(bz,by,bx,bw,bv){clearTimeout(bc);
bc=setTimeout(function(){if(U.setDots&&!aW(bz)){s()
}a7(bz,by,bx,bw,bv);
bh(bz,by,bx);
a8.open()
},(U.circle?aQ:0))
}function bt(){clearTimeout(bc);
bc=setTimeout(function(){s();
a8.close()
},M)
}function az(){var bv=bi.hasOwnProperty("canvas")?bi.canvas:null,bw=bi.hasOwnProperty("desc")?bi.desc:null;
if(bv){bv.setAttribute("role","img");
bv.setAttribute("aria-label",aF.SVGAriaLabel)
}if(bw){bw.textContent=aF.SVGDesc
}}if(!(YDom.get(E).innerHTML)){if(window.Raphael){aL()
}else{YAHOO.util.Get.script(LI.ShareStatsDependencies.scripts,{onFailure:function(){at.parentNode.removeChild(at)
},onSuccess:aL})
}}};LI.define("ShareStatsCarousel");
LI.ShareStatsCarousel=function(Y,J){var l,S,ac,B,W,K,q,z,b,f,C,N,Q,X,e,L,m,E,a,h,M,aa,A,I,i,O,P,T,p,n,ab,D,R,t;
if(!Y||!J){return
}J={idViewport:J.idViewport||"",idEntries:J.idEntries||"",URLAggregate:J.URLAggregate||""};
l=J.idViewport;
S=J.idEntries;
ac="wvyu-carousel-controls";
B="wvyu-carousel-entries";
W="share-teaser-close";
K="share-stats-widget";
q="active";
z="arrow-prev";
b="arrow-next";
f="counter";
C="carousel-entry";
N="disabled";
Q="loading";
X="share-teaser-overlay";
e="is-stale";
L="wvyu-container";
m="data-li-offset";
E="data-li-offset-url";
a="data-li-variation-type";
h="data-li-config";
M={"PREVIOUS":"PREVIOUS","NEXT":"NEXT"};
aa={"DEFAULT":"DEFAULT","AGGREGATE":"AGGREGATE"};
A=Y;
I=YDom.getElementsByClassName(z,"button",A)[0];
i=YDom.getElementsByClassName(b,"button",A)[0];
O=YDom.get(l);
P=YDom.get(S);
T=YDom.get(W);
p=YDom.get(K);
n=0;
ab=false;
D=false;
R=null;
t=function(){var af=document.getElementById(B),ah=YDom.getElementsByClassName(e,"li",af)[0],ae=YDom.getElementsByClassName(X,"div",ah)[0],ag={},ad;
if(ah){LI.hide(ae);
ad=YDom.getRegion(ah).height;
ag=new YAnim(O,{"height":{to:ad}},0.3);
ag.animate()
}t=function(){}
};
function H(){return YDom.getElementsByClassName(q,"li",P)[0]
}function c(ad){return YDom.getPreviousSibling(ad)
}function F(ad){return YDom.getNextSibling(ad)
}function o(ad){return u(ad,m)
}function y(ad){return u(ad,E)
}function u(af,ad){var ae=YDom.getElementsByClassName(L,"div",af)[0];
if(ad===m){return ae?parseInt(ae.getAttribute(ad),10):-1
}return ae?ae.getAttribute(ad):""
}function g(ad){return u(ad,a)
}function v(ad){return g(ad)===aa.AGGREGATE
}function r(ad){return !YDom.hasClass(ad,N)
}function U(ae,af){var ag=((af===M.PREVIOUS)&&(c(ae))),ad=((af===M.NEXT)&&(F(ae)));
return(ag||ad)
}function x(ad){return !c(ad)&&v(ad)
}function k(ad){return(o(ad)===-1)&&s(ad)
}function s(ad){return g(ad)===aa.DEFAULT
}function Z(al,aj){var an={},am={},ae=c(al),af=F(al),ai=aj===M.PREVIOUS,ah=ai?ae:af,ag=ai?n:-n,ak=YDom.getRegion(ah).height,ad=YDom.getRegion(O).height;
an=new YAnim(P,{"left":{by:ag}},0.3);
am=new YAnim(O,{"height":{to:ak}},0.3);
an.onComplete.subscribe(function(){if(ad!==ak){am.animate()
}else{V(al,ah)
}});
am.onComplete.subscribe(function(){V(al,ah)
});
if(!D){D=true;
an.animate()
}}function G(){var ae=YDom.getFirstChild(P),ad={};
YDom.addClass(ae,q);
w(ae)
}function j(ae,ai){var ah=this,ag=H(),aj=o(ag),af=y(ag),ad=(ai===M.PREVIOUS)&&s(ag)&&!c(ag);
if(r(ah)&&!ab&&!D){if(U(ag,ai)){Z(ag,ai)
}else{ab=true;
if(ad&&(aj===1)){af=J.URLAggregate
}YDom.addClass(A,Q);
LI.originUUID();
YConn.asyncRequest("GET",af,{success:function(al){var ak=null;
ab=false;
if(al.responseText){ak=LI.domify(al.responseText);
YDom.setStyle(P,"width",parseInt(YDom.getStyle(P,"width"),10)+n+"px");
if(ad){YDom.insertBefore(ak,YDom.getFirstChild(P));
YDom.setStyle(P,"left",parseInt(YDom.getStyle(P,"left"),10)-n+"px")
}else{P.appendChild(ak)
}LI.Controls.parseFragment(ak);
Z(ag,ai);
t()
}else{YDom.removeClass(A,Q)
}},failure:function(){ab=false;
YDom.removeClass(A,Q)
}},null)
}}}function V(ad,ae){D=false;
YDom.removeClass(ad,q);
YDom.addClass(ae,q);
if(x(ae)){YDom.addClass(I,N)
}else{YDom.removeClass(I,N)
}if(k(ae)){YDom.addClass(i,N)
}else{YDom.removeClass(i,N)
}YDom.removeClass(A,Q);
w(ae)
}function w(ag){var ah=document.getElementById(ac),ae=YDom.getElementsByClassName(f,"p",ah)[0],ad=YDom.getElementsByClassName(L,"div",ag)[0],af=ad?YAHOO.lang.JSON.parse(ad.getAttribute(h)):{};
if(ae&&af.counterText){ae.innerHTML=af.counterText
}}function d(){var ad="click";
G();
YEvent.on(T,ad,t);
if(A&&O&&P){n=YDom.getRegion(O).width;
YEvent.on(I,ad,j,M.PREVIOUS);
YEvent.on(i,ad,j,M.NEXT)
}}if(LI.ShareStats){d()
}else{YAHOO.util.Get.script(LI.ShareStatsCarouselDependencies.scripts,{onFailure:function(){p.parentNode.removeChild(p)
},onSuccess:function(){LI.Controls.processQueue();
d()
}})
}};LI.define("DebounceEvent");
LI.DebounceEvent=function(c,e,d){var a=false,b=c===window?"window":c.id;
d=d||100;
e=e||"scroll";
YEvent.on(c,e,function(f){a=true
});
setInterval(function(){if(a){a=false;
LI.Events.fire("debounced-"+b+"-"+e,b)
}},d)
};LI.define("Scroller");
LI.Scroller=(function(){var b={};
function e(i,h){var g;
b[h]={evtName:h+"-scroll",scrollPos:d(h)};
g=b[h];
g.prevScrollPos=g.scrollPos;
LI.DebounceEvent(i,"scroll",10);
if(i===window){LI.DebounceEvent(i,"resize",10);
g.elHeight=YDom.getViewportHeight()
}else{g.elHeight=i.offsetHeight;
g.contentEl=YDom.getFirstChild(i)
}LI.Events.bind("debounced-"+h+"-scroll",c);
if(i===window){LI.Events.bind("debounced-window-resize",function(){g.elHeight=YDom.getViewportHeight()
})
}}function a(h,i,g){return h-(i+g)
}function d(g){var h;
if(g==="window"){h=YDom.getDocumentScrollTop()
}else{h=YDom.get(g).scrollTop
}return h
}function f(g,h){if(g>h){return"up"
}else{return"down"
}}function c(j){var h,k,i,g=b[j];
if(typeof g==="undefined"){return
}if(j==="window"){i=YDom.getDocumentHeight()
}else{i=g.contentEl.offsetHeight
}g.prevScrollPos=g.scrollPos;
g.scrollPos=d(j);
h=a(i,g.scrollPos,g.elHeight);
k=f(g.prevScrollPos,g.scrollPos);
LI.Events.fire(g.evtName,{"scrollPos":g.scrollPos,"distToBottom":h,"scrollDirection":k})
}return{register:function(h){var g;
g=h===window?"window":h.id;
if(typeof b[g]!=="undefined"){return b[g].evtName
}else{e(h,g);
return b[g].evtName
}},destroyItem:function(i){var h,g;
h=i===window?"window":i.id;
g=b[h];
if(typeof g!=="undefined"){LI.Events.unbind(g.evtName);
delete b[h]
}}}
})();LI.define("Sticky");
LI.Sticky=function(b,v){var e=v.stickyClass||false,g=v.stickyDistance||0,n=v.fixedHeaderHeight||0,o=v.unstickHeight||0,j=v.resultsLoadedEvtName||"",d,l,m="position",q="fixed",r="top",i="px",f=YDom.getStyle(b,m),h=YDom.getStyle(b,r),u=LI.Scroller.register(window),a,t="notSticky";
if(!b||f==="absolute"){return
}function c(){d=s(b.parentNode);
l=parseInt(YDom.getStyle(b,"height"),10)
}function s(x){var z=0,y=x||b;
if(y.offsetParent){do{z+=y.offsetTop;
y=y.offsetParent
}while(y);
return z
}else{return b.offsetTop
}}function p(){if(e){YDom.addClass(b,e)
}else{YDom.setStyle(b,m,q);
YDom.setStyle(b,r,(g+n)+i)
}t="sticky"
}function w(){if(e){YDom.removeClass(b,e)
}else{YDom.setStyle(b,m,f);
h=typeof h==="number"?h+i:h;
YDom.setStyle(b,r,h)
}t="notSticky"
}function k(){YDom.setStyle(b,m,"relative");
YDom.setStyle(b,r,(YDom.getDocumentHeight()-d-l-o)+i);
t="footerSticky"
}LI.Events.bind(u,function(x){var z=x.scrollPos+g+n,y=o-x.distToBottom;
if(t==="notSticky"){a=s();
if(a&&z>=a){p()
}}if(t!=="notSticky"){if(a&&z<a){w()
}else{if(y>0&&(YDom.getViewportHeight()-n-g-l-y)<0){k()
}else{p()
}}}});
if(typeof j==="string"&&j!==""){LI.Events.bind(j,function(){window.scrollTo(0,(YDom.getDocumentScrollTop()+1))
})
}c();
YEvent.on(window,"load",function(){c()
})
};(function(S,h,m){var f=1000001,L=YDom.get("header"),V=YDom.get("body"),P=YDom.get("content"),d=YDom.get("extra"),b=YDom.get("right-rail-ad"),U=YDom.get("footer"),u=YDom.get("ad-slot-2"),a="new-ad",R="hp-ad-rr-1",s=S.location,e=s.host,j="/csp/ads?f=f300x250_exp_3_1&fk=true&p=1&c=2&r=",q=LI.domify('<div class="content" id="ad-slot-4"></div>'),O=LI.domify('<iframe width="300" id="ad-iframe-4" scrolling="no" height="250" frameborder="0" allowtransparency="true" border="0"></iframe>'),r=LI.domify('<div class="sticky-elems-placeholder"></div>'),W=".leo-module",c="absolute-sticky",l="fixed-sticky",aa="static-sticky",z="transparent-sticky",Q="hidden-sticky",Z=false,J=false,K=true,N=false,M=false,I=false,p=0,X=false,t=false,Y=0,y=0,A=0,x=87,k=100,n=880,g=3,o=":";
function i(ag){var ab=[],ac=[],af=ag.length,ae,ad;
for(ad=0;
ad<af;
ad++){ae=ag[ad];
if(!ac[ae]){ab.push(ae);
ac[ae]=1
}}return ab
}function H(ad){if(!N){N=true;
var ac=Math.floor(Math.random()*f),ab="//"+e+j+ac;
YDom.setAttribute(ad,"src",ab)
}}function T(){if(!M&&LI.inViewPort(q)){H(O);
M=true
}}function G(ab){YEvent.on(ab,"click",function(ac){WebTracking.trackUserAction(R,"")
})
}function C(ab){YDom.removeClass(ab,l);
YDom.removeClass(ab,aa);
J=K=false;
YDom.addClass(ab,c);
Z=true
}function F(ab){YDom.removeClass(ab,c);
YDom.removeClass(ab,aa);
Z=K=false;
YDom.addClass(ab,l);
J=true
}function B(ab){YDom.removeClass(ab,c);
YDom.removeClass(ab,l);
Z=J=false;
YDom.addClass(ab,aa);
K=true
}function E(ae,ag){var ad=YDom.getY(ae),ab=YDom.getRegion(ae).height,af=u?YDom.getY(u):YDom.getY(U),ac=YDom.getDocumentScrollTop();
if(K&&(ac+x>=ad)){p=ad-x;
F(ae)
}else{if(J&&(ad+ab-ac>=af-ac)){C(ae)
}else{if(Z&&(ac+x<=ad)){F(ae)
}else{if(J&&(ac<=p)){B(ae)
}}}}if(X){w(ae,ac)
}}function D(ab,ac){var ad=YDom.getViewportHeight();
if((ad>=n)&&(I)){LI.show(ab);
E(ac);
I=false
}else{if((ad<n)&&(!I)){LI.hide(ab);
E(ac);
I=true
}}}function v(ac){var ab=YDom.getY(ac);
y=ab-10;
A=ab+20;
YDom.addClass(ac,z);
YDom.addClass(ac,Q);
t=true
}function w(ad,ac){var ae=ac>Y,ab=ac<Y;
if(t&&ae&&(ac>y)){YDom.removeClass(ad,z);
YDom.removeClass(ad,Q);
t=false
}else{if(!t&&ab&&(ac<A)){YDom.addClass(ad,z);
t=true;
setTimeout(function(){YDom.addClass(ad,Q)
},k)
}}Y=ac
}LI.define("NUSStickyRightRail");
LI.NUSStickyRightRail=function(ad,ae){var ag=YDom.getRegion(ad).height,ak=YDom.getRegion("content").height,af=ae.stickyRightRailOption,aj=i(af.split(o)),ai=aj.length,an=(YDom.getClientRegion().height>=ag+x),am=((ag+x)>=ak),al=(ai>g),ac,ab,ah;
if(an||al){return false
}X=ae.isFadeTransitionEnabled||false;
YEvent.onDOMReady(function(){for(ah=0;
ah<ai;
ah++){ab=aj[ah];
if(ab===a){q.appendChild(O);
G(q);
r.appendChild(q)
}else{ac=Y$("#"+ab,ad,true);
clonedModule=ac.cloneNode(true);
YDom.removeClass(clonedModule,"candy-pymk-hide");
if(ac){r.appendChild(clonedModule)
}}}if(r.childNodes.length===g){var ao=r.childNodes[g-1];
D(ao,r);
YEvent.addListener(S,"resize",function(){D(ao,r)
})
}ad.appendChild(r);
LI.Controls.parseFragment(ad);
if(X){v(r)
}E(r);
T();
YEvent.addListener(S,"scroll",function(){E(r);
T()
})
});
this.togglePosition=function(){E(r)
};
this.loadNewAd=function(){N=false;
H(O)
}
}
}(this,this.document));(function(){var a=/Firefox\/(\d+\.\d+)/.exec(navigator.userAgent);
if(a&&a[1]&&parseFloat(a[1])<=3.6){var b=dust.escapeHtml,d="--",c=new RegExp(d,"g");
dust.escapeHtml=function(e){e=b(e);
if(typeof e==="string"&&e.indexOf(d)>-1){return e.replace(c,"&#45;&#45;")
}return e
}
}})();$.fn.MiniProfile=function(c,b,a){this.id=c;
this.$panel=b;
this.content="";
this.manager=a
};
$.extend($.fn.MiniProfile.prototype,{calculatePosition:function(x){var k=this,r=80,d=80,q=-115,a=10,s=10,f=k.$panel,g=f.find(".new-miniprofile-content"),p=$(window).height(),w=$(window).width(),h=$(document).scrollTop(),b=$(document).scrollLeft(),m={},i=0,v=0,e=0,c=0,j,u,t={},o=k.manager.getDefaultShownBelow(),l=false,n=false;
$("img",x).each(function(y){x=$(this);
return false
});
i=x.innerHeight();
v=x.innerWidth();
f.css({"visibility":"hidden"}).removeClass("hidden");
e=g.outerHeight();
c=g.outerWidth();
f.addClass("hidden").css({"visibility":"visible"});
j={x:x.offset().left+(v/2),y:x.offset().top};
u={x:x.offset().left+(v/2),y:x.offset().top+i};
if(u.y+e<h+p){n=true
}if(j.y-e-r>h){l=true
}if(o&&n){m.bottom=true
}else{if(!o&&l){m.top=true
}else{if(n){m.bottom=true
}else{m.top=true
}}}if(j.x+c+q<b+w){m.right=true
}else{if(j.x-c+d>b){m.left=true
}else{m.right=true
}}if(m.top){t.y=j.y-e-a
}if(m.bottom){t.y=u.y+a
}if(m.left){t.x=j.x-c+d
}if(m.right){t.x=j.x+q-s
}return{x:t.x,y:t.y,directions:m}
},id:function(){return this.id
},getContent:function(){return this.content
},show:function(a){var b=this;
b.manager.loadProfile(a,{success:function(e){var c=b.manager.config,d=b.manager,g=b.$panel,f=d.$lastSelectedNode;
if(e){b.content=e;
if(d.areDifferentLinkNodes(f,a)){return
}g.html(e);
LI.Controls.parseFragment(g.get(0));
var h=b.calculatePosition(a);
if(h){g.css({"visibility":"hidden"}).removeClass("hidden").offset({top:h.y,left:h.x}).addClass("hidden").css({"visibility":"visible"});
b.setPointer(h.directions);
b.manager.showPanel(g)
}}}});
return b
},setPointer:function(f){var e=this.$panel,d=[],b,c;
d=[];
for(var a in f){d.push(a)
}e.find(".triangle").removeClass("top bottom left right").addClass(d.join(" "));
if(e.find(".miniprofile-shared-connections").length){b="triangle-bottom";
c="triangle-bottom-grey"
}else{b="triangle-bottom-grey";
c="triangle-bottom"
}e.find("."+b).removeClass(b).addClass(c)
}});
$.fn.MiniProfileManager=(function(b){var a={};
$.extend(a,{config:b,profileRegistry:{},defaultShownBelow:false,$panel:null,showPanelTimer:null,currentProfileId:null,mouseInsidePanel:false,mouseInsideLink:false,$lastSelectedNode:null,$lastMouseOverNode:null,isHiding:null,initPanel:function(){var d=this,c=d.config,e;
if(!d.$panel){e=$("<div></div>");
d.$panel=e;
e.attr("id",d.config.PANEL_ID_NAME);
$("body").append(e);
e.css("z-index",d.config.zIndex);
e.mouseenter(function(){d.mouseInsidePanel=true
});
e.mouseleave(function(){d.mouseInsidePanel=false
})
}},showPanel:function(c){c.removeClass("hidden")
},hidePanel:function(c){c.addClass("hidden")
},isPanelHidden:function(c){return c.hasClass("hidden")
},setDefaultShownBelow:function(c){this.defaultShownBelow=c
},getDefaultShownBelow:function(){return this.defaultShownBelow
},delayShowPanel:function(d,e){var c=this;
c.showPanelTimer=setTimeout(function(){if(c.mouseInsideLink){d.show(e)
}c.showPanelTimer=null
},b.SHOW_PANEL_DELAY)
},delayHidePanel:function(g,c){var e=this,d=e.config,f;
if(e.mouseInsidePanel){return
}e.isHiding=true;
setTimeout(function(){var h=e.areDifferentLinkNodes(c,e.$lastSelectedNode);
if((!e.mouseInsidePanel&&!e.mouseInsideLink)||(e.mouseInsideLink&&h)){e.hidePanel(g)
}if(e.isHiding){e.isHiding=false;
f=e.registerMiniProfile(e.$lastSelectedNode);
if(h){e.delayShowPanel(f,e.$lastSelectedNode)
}}},d.HIDE_PANEL_DELAY)
},loadProfile:function(d,n){var l=this,g=l.config,f="throw /*LI:DBE*/ 1;",e=d.attr(g.MINIPROFILE_JS_ATTRIBUTE_NAME),o=d.attr(g.MINIPROFILE_TEMPLATE_ATTRIBUTE_NAME)||"tl/shared/profile/mini_profile_shell",c=d.attr(g.MINIPROFILE_URL_ATTRIBUTE_NAME),j=(typeof window.console!=="undefined")?window.console:{log:$.noop()},h,m,k;
if(c){m=l.getProfileContent(c);
if(m){n.success(m);
return
}}if(e){$.getScript(e)
}var i=function(p){if(p){n.success(p);
$("body").trigger(g.NEW_CONTENT_EVENT)
}};
$.ajax({type:"GET",url:c,headers:{"X-IsAJAXForm":1},data:"",dataType:"text",success:function(u,p,q){var s,r=false,t=LI.Profile2;
if(t&&t.Render){t.Render.render({template:o,response:q,success:i})
}else{if(o&&window.dust){try{u=u.replace(f,"");
s=$.parseJSON(u);
dust.render(o,s.content,function(x,w){if(x){j.log(x);
return
}i(w)
})
}catch(v){}}}},error:function(p,r,q){}})
},getProfileContent:function(c){var d=this.profileRegistry[c];
if(!d){return null
}return d.getContent()
},getMiniProfile:function(e){var d=this,c=e.attr(b.MINIPROFILE_URL_ATTRIBUTE_NAME);
return d.profileRegistry[c]
},registerMiniProfile:function(h){var f=this,e=f.config,g=f.getMiniProfile(h),c,d;
c=h.attr(e.MINIPROFILE_ID_ATTRIBUTE_NAME);
if(!c){c="LI-"+Math.floor(Math.random()*9999999);
h.attr(e.MINIPROFILE_ID_ATTRIBUTE_NAME,c)
}if(!g){d=h.attr(e.MINIPROFILE_URL_ATTRIBUTE_NAME);
g=new $.fn.MiniProfile(c,f.$panel,f);
f.profileRegistry[d]=g
}return g
},areDifferentLinkNodes:function(e,d){var f=this,c=f.config;
return(!e||!d||e.attr(c.MINIPROFILE_ID_ATTRIBUTE_NAME)!==d.attr(c.MINIPROFILE_ID_ATTRIBUTE_NAME))
},handleMouseEvent:function(k){var j=this,f=j.config,e=$(k.target),g,i,c,h,d;
if(!j.$panel){j.initPanel()
}j.$lastMouseOverNode=e;
g=e.closest("."+f.MINIPROFILE_SEARCH_CLASS_NAME);
if(g.length){j.mouseInsideLink=true;
h=j.registerMiniProfile(g);
if(!j.currentProfileId||j.currentProfileId!==h.id){j.currentProfileId=h.id;
if(j.showPanelTimer){d=j.showPanelTimer;
window.clearTimeout(d);
d=null
}j.$lastSelectedNode=g;
if(j.isHiding){}else{j.isHiding=false;
j.delayShowPanel(h,g)
}}}else{j.mouseInsideLink=false;
if(j.mouseInsidePanel){return
}j.currentProfileId=null;
if(!j.isPanelHidden(j.$panel)&&j.$panel.find("."+f.MINIPROFILE_CONTENT_CLASS_NAME).length){j.delayHidePanel(j.$panel,j.$lastSelectedNode)
}}}});
return a
}({SHOW_PANEL_DELAY:500,HIDE_PANEL_DELAY:400,PANEL_ID_NAME:"lui-mini-profile-body",PANEL_ZINDEX:1007,MINIPROFILE_SEARCH_CLASS_NAME:"new-miniprofile-container",MINIPROFILE_CONTENT_CLASS_NAME:"new-miniprofile-content",MINIPROFILE_ID_ATTRIBUTE_NAME:"data-li-miniprofile-id",MINIPROFILE_JS_ATTRIBUTE_NAME:"data-li-getjs",MINIPROFILE_TEMPLATE_ATTRIBUTE_NAME:"data-li-tl",MINIPROFILE_URL_ATTRIBUTE_NAME:"data-li-url",NEW_CONTENT_EVENT:"show-mini-profile"}));
$(function(){var b=$(document);
function a(d){$.fn.MiniProfileManager.handleMouseEvent(d)
}(function c(){if(b.on){b.on("mouseover",a)
}}())
});(function(){var f="click",e="remove-mention-dialog-content",c="",a="error",d="loading",g="prompt",b="success";
LI.define("RemoveMentionDialog");
LI.RemoveMentionDialog=function(h,i){var m,o,l,j,n,k,p;
h=$(h);
j=function(q){q.preventDefault();
if(!m){m=new LI.Dialog()
}m.open(q,{className:"dialog-v2 remove-mention-dialog",content:{node:e,title:LI.i18n.get("remove-mention-dialog-remove-mention")},name:"removeMentionDialog",type:"task-modal",width:400});
o=$("#"+e);
m.submitEvent.subscribe(k,null,this)
};
h.on(f,_.bind(j,this));
l=function(){o.addClass(a).removeClass(d).removeClass(g)
};
n=function(r){var q=r.responseText||r;
if(q&&(q.isRemoveMentionSuccessful||q.result==="SUCCESS")){o.addClass(b).removeClass(d);
p()
}else{l()
}};
k=function(t,s){var q,u=$(s[0]),v="GET",r=u.attr("href");
o.addClass(d).removeClass(g);
if(u.attr("data-li-mention-type")==="GRP_CMT"){$.ajax({"method":v,"url":r,"error":l,"success":n})
}else{LI.asyncRequest(v,r,{failure:l,success:n})
}if(u.hasClass("remove-mention-confirm")){q={mention_category:u.attr("data-li-mention-type"),update_id:u.attr("data-li-update-id")};
WebTracking.trackUserAction(u.attr("data-li-action-type"),q,true)
}};
p=function(){var q=$("."+h.attr("data-li-mention-class"));
$.each(q,function(r,u){u=$(u);
var t=u.html(),s=u.parent();
if(s.hasClass("new-miniprofile-container")){s.attr({"class":c,"data-li-tl":c,"data-li-url":c});
s.html(t)
}})
}
}
}());(function(){dust.register("tl/shared/profile/mini_profile_info",W);
function W(ak,aj){return ak.section(aj.get("MiniProfile"),aj,{"block":V},null)
}function V(ak,aj){return ak.section(aj.get("mini_profile"),aj,{"block":T},null)
}function T(ak,aj){return ak.exists(aj.get("showFollow"),aj,{"block":R},null).write('<div class="miniprofile-body"><p class="photo">').exists(aj.get("pictureId"),aj,{"else":P,"block":N},null).write('</p><p class="name"><a href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-name-link">').reference(aj.get("full_name"),aj,"h").write("</a>").exists(aj.get("networkDistance"),aj,{"block":L},null).write('</p><div class="title" title="').reference(aj.get("headline"),aj,"h").write('">').reference(aj.get("fmt__trunc_headline"),aj,"h").write('</div><div class="miniprofile-actions">').helper("eq",aj,{"else":G,"block":y},{"key":c,"value":"unMention"}).write("</div></div>").exists(aj.get("showPositionIndustry"),aj,{"block":a},null)
}function R(ak,aj){return ak
}function P(ak,aj){return ak.write('<a href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-photo-placeholder"><img alt="').reference(aj.get("full_name"),aj,"h").write('" src="').reference(aj.get("no_photo_img_link"),aj,"h").write('" width="100" height="100"></a>')
}function N(ak,aj){return ak.write('<a href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-photo"><img alt="').reference(aj.get("full_name"),aj,"h").write('" src="').reference(aj.get("resolved_photo"),aj,"h").write('"/></a>')
}function L(ak,aj){return ak.helper("gt",aj,{"block":J},{"key":aj.get("networkDistance"),"value":"0","type":"number"})
}function J(ak,aj){return ak.write('<span class="degree">').helper("partial",aj,{"block":I},{"distanceP":aj.get("networkDistance"),"fNameP":aj.get("firstName"),"lNameP":aj.get("lastName")}).write("</span>")
}function I(ak,aj){return ak.partial("tl/shared/degree_icon",aj,null)
}function G(ak,aj){return ak.exists(aj.get("showPositionIndustry"),aj,{"block":z},null).exists(aj.get("networkDistance"),aj,{"else":r,"block":l},null)
}function z(ak,aj){return ak.write('<div class="location-industry">').exists(aj.get("fmt_location"),aj,{"block":x},null).exists(aj.get("fmt_industry"),aj,{"block":t},null).write("</div>")
}function x(ak,aj){return ak.reference(aj.get("fmt_location"),aj,"h",["s"]).exists(aj.get("fmt_industry"),aj,{"block":v},null)
}function v(ak,aj){return ak.write("<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>")
}function t(ak,aj){return ak.reference(aj.get("fmt_industry"),aj,"h")
}function r(ak,aj){return ak.exists(aj.get("showFollow"),aj,{"else":p,"block":n},null)
}function p(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("connect"),aj,"h").write('">').reference(aj.get("miniprofile_connect"),aj,"h").write("</a>")
}function n(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("follow"),aj,"h").write('">').reference(aj.get("miniprofile_follow"),aj,"h").write("</a>")
}function l(ak,aj){return ak.helper("gt",aj,{"block":j},{"key":aj.get("networkDistance"),"value":"-1","type":"number"})
}function j(ak,aj){return ak.helper("select",aj,{"block":i},{"key":A})
}function i(ak,aj){return ak.helper("eq",aj,{"block":f},{"value":"0"}).helper("eq",aj,{"block":d},{"value":"1"}).helper("eq",aj,{"block":X},{"value":"2"}).helper("default",aj,{"block":E},null)
}function f(ak,aj){return ak.write('<a class="miniprofile-button bt-view-profile" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function d(ak,aj){return ak.exists(aj.get("showSendMessage"),aj,{"else":b,"block":aa},null)
}function b(ak,aj){return ak.exists(aj.get("showFollow"),aj,{"else":ai,"block":ae},null)
}function ai(ak,aj){return ak.exists(aj.get("showViewProfile"),aj,{"block":ag},null)
}function ag(ak,aj){return ak.write('<a class="miniprofile-button bt-view-profile" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function ae(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("follow"),aj,"h").write('">').reference(aj.get("miniprofile_follow"),aj,"h").write("</a>").exists(aj.get("showViewProfile"),aj,{"block":ac},null)
}function ac(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function aa(ak,aj){return ak.write('<a class="miniprofile-button bt-send" href="').reference(aj.get("send_message"),aj,"h").write('">').reference(aj.get("miniprofile_send_a_message"),aj,"h").write("</a>").exists(aj.get("showViewProfile"),aj,{"block":Y},null)
}function Y(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function X(ak,aj){return ak.exists(aj.get("showConnect"),aj,{"else":S,"block":H},null)
}function S(ak,aj){return ak.exists(aj.get("showFollow"),aj,{"else":Q,"block":M},null)
}function Q(ak,aj){return ak.exists(aj.get("showViewProfile"),aj,{"block":O},null)
}function O(ak,aj){return ak.write('<a class="miniprofile-button bt-view-profile" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function M(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("follow"),aj,"h").write('">').reference(aj.get("miniprofile_follow"),aj,"h").write("</a>").exists(aj.get("showViewProfile"),aj,{"block":K},null)
}function K(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function H(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("connect"),aj,"h").write('">').reference(aj.get("miniprofile_connect"),aj,"h").write("</a>").exists(aj.get("showViewProfile"),aj,{"block":F},null)
}function F(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function E(ak,aj){return ak.exists(aj.get("showFollow"),aj,{"else":D,"block":C},null).exists(aj.get("showViewProfile"),aj,{"block":B},null)
}function D(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("connect"),aj,"h").write('">').reference(aj.get("miniprofile_connect"),aj,"h").write("</a>")
}function C(ak,aj){return ak.write('<a class="miniprofile-button bt-connect" href="').reference(aj.get("follow"),aj,"h").write('">').reference(aj.get("miniprofile_follow"),aj,"h").write("</a>")
}function B(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary" href="').reference(aj.get("pview"),aj,"h").write('&trk=miniprofile-primary-view-button">').reference(aj.get("miniprofile_view_profile"),aj,"h").write("</a>")
}function A(ak,aj){return ak.reference(aj.get("networkDistance"),aj,"h")
}function y(ak,aj){return ak.notexists(aj.get("excludeUnmention"),aj,{"block":w},null)
}function w(ak,aj){return ak.partial("tl/shared/mentions/remove_mention_dialog_content",aj,null).exists(aj.get("groupID"),aj,{"else":u,"block":e},null).helper("jsControl",aj,{},{"name":"RemoveMentionDialog"})
}function u(ak,aj){return ak.exists(aj.get("shareID"),aj,{"block":s},null).exists(aj.get("commentID"),aj,{"block":o},null)
}function s(ak,aj){return ak.exists(aj.get("updateID"),aj,{"block":q},null)
}function q(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary remove-mention-confirm" href="').reference(aj.get("remove_mention_from_update_link"),aj,"h").write('" data-li-mention-class="').reference(aj.get("shareID"),aj,"h").write("-").reference(aj.get("memberID"),aj,"h").write('">').reference(aj.get("miniprofile_remove_mention"),aj,"h").write("</a>")
}function o(ak,aj){return ak.exists(aj.get("updateID"),aj,{"block":m},null)
}function m(ak,aj){return ak.exists(aj.get("discussionScopeID"),aj,{"else":k,"block":h},null)
}function k(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary remove-mention-confirm" href="').reference(aj.get("remove_mention_from_article_comment_link"),aj,"h").write('" data-li-mention-class="').reference(aj.get("commentID"),aj,"h").write("--").reference(aj.get("memberID"),aj,"h").write('">').reference(aj.get("miniprofile_remove_mention"),aj,"h").write("</a>")
}function h(ak,aj){return ak.exists(aj.get("discussionID"),aj,{"block":g},null)
}function g(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary remove-mention-confirm" href="').reference(aj.get("remove_mention_from_comment_link"),aj,"h").write('" data-li-mention-class="').reference(aj.get("commentID"),aj,"h").write("-").reference(aj.get("discussionID"),aj,"h").write("-").reference(aj.get("memberID"),aj,"h").write('">').reference(aj.get("miniprofile_remove_mention"),aj,"h").write("</a>")
}function e(ak,aj){return ak.write('<a class="miniprofile-button bt-secondary remove-mention-confirm" href="').reference(aj.get("remove_mention_from_group_discussion_comment"),aj,"h").write('" data-li-mention-class="').reference(aj.get("commentID"),aj,"h").write("-").reference(aj.get("discussionScopeID"),aj,"h").write("-").reference(aj.get("groupID"),aj,"h").write("-").reference(aj.get("memberID"),aj,"h").write('">').reference(aj.get("miniprofile_remove_mention"),aj,"h").write("</a>")
}function c(ak,aj){return ak.reference(aj.get("context"),aj,"h")
}function a(ak,aj){return ak.write('<div class="miniprofile-summary-sections">').exists(aj.get("currentCompaniesSummary"),aj,{"block":ah},null).exists(aj.get("pastCompaniesSummary"),aj,{"block":ad},null).exists(aj.get("educationsSummary"),aj,{"block":Z},null).write("</div>")
}function ah(ak,aj){return ak.helper("gt",aj,{"block":af},{"key":aj.getPath(false,["currentCompaniesSummary","length"]),"value":"0","type":"number"})
}function af(ak,aj){return ak.write('<div class="label summary-label">').reference(aj.get("miniprofile_current_position"),aj,"h").write('</div><div class="summary">').reference(aj.get("_truncated_current_position"),aj,"h").write("</div>")
}function ad(ak,aj){return ak.helper("gt",aj,{"block":ab},{"key":aj.getPath(false,["pastCompaniesSummary","length"]),"value":"0","type":"number"})
}function ab(ak,aj){return ak.write('<div class="label summary-label">').reference(aj.get("miniprofile_past_position"),aj,"h").write('</div><div class="summary">').reference(aj.get("_truncated_past_position"),aj,"h").write("</div>")
}function Z(ak,aj){return ak.helper("gt",aj,{"block":U},{"key":aj.getPath(false,["educationsSummary","length"]),"value":"0","type":"number"})
}function U(ak,aj){return ak.write('<div class="label summary-label">').reference(aj.get("miniprofile_education"),aj,"h").write('</div><div class="summary">').reference(aj.get("_truncated_educations"),aj,"h").write("</div>")
}return W
})();
(function(){dust.register("mini_profile_info",dust.cache["tl/shared/profile/mini_profile_info"])
})();(function(){dust.register("tl/shared/profile/sorted_shared_connections",p);
var w={"fmtName":h,"viewProfileLink":b,"picLink":f,"img_src":e,"connectionsLink":l};
function p(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("MiniProfile"),y,{"else":o,"block":s},null)
}function o(z,y){y=y.shiftBlocks(w);
return z.section(y.get("sorted_shared_connections"),y,{"block":m},null)
}function m(z,y){y=y.shiftBlocks(w);
return z.write("<ul>").section(y.get("sortedSharedConnections"),y,{"block":k},{"numConnections":"4"}).write("</ul>")
}function k(z,y){y=y.shiftBlocks(w);
return z.helper("lt",y,{"block":v},{"key":u,"value":t,"type":"number"})
}function i(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("full_name"),y,"h")
}function g(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("profile_link"),y,"h",["s"])
}function f(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("pic_link_1"),y,"h",["s"])
}function e(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("pictureId"),y,{"else":d,"block":c},null)
}function d(z,y){y=y.shiftBlocks(w);
return z.write("/scds/common/u/img/icon/icon_no_photo_40x40.png")
}function c(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("linkAuto_media_1"),y,"h",["s"])
}function v(z,y){y=y.shiftBlocks(w);
return z.write('<li><a href="').block(y.getBlock("viewProfileLink"),y,{},null).write('"><img class="photo" src="').block(y.getBlock("img_src"),y,{},null).write('" alt="').block(y.getBlock("fmtName"),y,{},null).write('" /><span class="name"> ').block(y.getBlock("fmtName"),y,{},null).write(' </span><span class="headline"> ').reference(y.get("headline"),y,"h").write(" </span></a></li>")
}function u(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("$idx"),y,"h")
}function t(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("maxIdx"),y,"h")
}function s(z,y){y=y.shiftBlocks(w);
return z.exists(y.getPath(false,["sorted_shared_connections","sortedSharedConnections"]),y,{"block":r},null)
}function r(z,y){y=y.shiftBlocks(w);
return z.section(y.get("mini_profile"),y,{"block":q},null)
}function q(z,y){y=y.shiftBlocks(w);
return z.write('<div class="miniprofile-shared-connections">').section(y.get("sorted_shared_connections"),y,{"block":n},null).write("</div>")
}function n(z,y){y=y.shiftBlocks(w);
return z.write('<div class="shared-connections">').write('<span class="label"><a href="').block(y.getBlock("connectionsLink"),y,{},null).write('"><span class="connections-label">&nbsp;</span></a>').reference(y.get("sharedConnectionsCount"),y,"h").write("</span><ul>").section(y.get("sortedSharedConnections"),y,{"block":j},null).write("</ul></div>")
}function l(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("connections_link"),y,"h",["s"])
}function j(z,y){y=y.shiftBlocks(w);
return z.write('<li><a href="').block(y.getBlock("viewProfileLink"),y,{},null).write('" title="').block(y.getBlock("fmtName"),y,{},null).write('"><img src="').exists(y.getPath(true,["pictureId"]),y,{"else":a,"block":x},null).write('" alt="').block(y.getBlock("fmtName"),y,{},null).write('" width="30" height="30"/></a></li>')
}function h(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("full_name"),y,"h")
}function b(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("profile_link"),y,"h",["s"])
}function a(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("media_gh"),y,"h")
}function x(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("media_link"),y,"h")
}return p
})();
(function(){dust.register("sorted_shared_connections",dust.cache["tl/shared/profile/sorted_shared_connections"])
})();(function(){dust.register("tl/shared/profile/mini_profile_shell",c);
function c(e,d){return e.section(d.get("MiniProfile"),d,{"block":b},null)
}function b(e,d){return e.exists(d.get("full_name"),d,{"block":a},null)
}function a(e,d){return e.write('<div class="new-miniprofile-content"><div class="triangle triangle-top"></div>').partial("tl/shared/profile/mini_profile_info",d,null).partial("tl/shared/profile/sorted_shared_connections",d,null).write('<div class="triangle triangle-bottom"></div></div>')
}return c
})();
(function(){dust.register("mini_profile_shell",dust.cache["tl/shared/profile/mini_profile_shell"])
})();(function(){dust.register("tl/shared/mentions/remove_mention_dialog_content",p);
var w={"unmentionUrl":o,"unmentionTracking":d};
function p(z,y){y=y.shiftBlocks(w);
return z.write('<div id="remove-mention-dialog-content" class="prompt"><div class="prompt-content">').helper("select",y,{"block":q},{"key":j}).write('<ul class="actions"><li><a class="remove-mention-confirm dialog-submit dialog-submit-suppress" data-li-action-type="mention_remove" data-li-mention-type="').block(y.getBlock("unmentionTracking"),y,{},null).write('" data-li-update-id="').reference(y.get("updateID"),y,"h").write('" href="').block(y.getBlock("unmentionUrl"),y,{},null).write('">').reference(y.get("remove_mention_dialog__text_plain__remove_mention"),y,"h").write('</a></li><li><a class="remove-mention-cancel dialog-close" href="#">').reference(y.get("remove_mention_dialog__text_plain__cancel"),y,"h").write("</a></li>").helper("eq",y,{"block":h},{"key":b,"value":"treatment"}).write('</ul></div><div class="loading-content">').reference(y.get("remove_mention_dialog__text_plain__loading"),y,"h").write('</div><div class="success-content"><p>').reference(y.get("remove_mention_dialog__text_plain__you_have_successfully_removed"),y,"h").write('</p><ul class="actions"><li><a class="remove-mention-continue dialog-close" href="#">').reference(y.get("remove_mention_dialog__text_plain__continue"),y,"h").write("</a></li>").helper("eq",y,{"block":a},{"key":x,"value":"treatment"}).write('</ul></div><div class="error-content"><p>').reference(y.get("remove_mention_dialog__text_plain__sorry_there_was_an_error"),y,"h").write('</p><ul class="actions"><li><a class="remove-mention-try-again dialog-submit dialog-submit-suppress" data-li-mention-type="').block(y.getBlock("unmentionTracking"),y,{},null).write('" href="').block(y.getBlock("unmentionUrl"),y,{},null).write('">').reference(y.get("remove_mention_dialog__text_plain__try_again"),y,"h").write("</a></li></ul></div></div>")
}function o(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("groupID"),y,{"else":m,"block":e},null)
}function m(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("shareID"),y,{"else":k,"block":f},null)
}function k(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("discussionScopeID"),y,{"else":i,"block":g},null)
}function i(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("remove_mention_from_article_comment_link"),y,"h")
}function g(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("remove_mention_from_comment_link"),y,"h")
}function f(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("remove_mention_from_update_link"),y,"h")
}function e(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("remove_mention_from_group_discussion_comment_link"),y,"h")
}function d(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("groupID"),y,{"else":c,"block":r},null)
}function c(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("shareID"),y,{"else":v,"block":s},null)
}function v(z,y){y=y.shiftBlocks(w);
return z.exists(y.get("discussionScopeID"),y,{"else":u,"block":t},null)
}function u(z,y){y=y.shiftBlocks(w);
return z.write("TOD_CMT")
}function t(z,y){y=y.shiftBlocks(w);
return z.write("NUS_CMT")
}function s(z,y){y=y.shiftBlocks(w);
return z.write("NUS_SHARE")
}function r(z,y){y=y.shiftBlocks(w);
return z.write("GRP_CMT")
}function q(z,y){y=y.shiftBlocks(w);
return z.helper("eq",y,{"block":n},{"value":"treatment"}).helper("default",y,{"block":l},null)
}function n(z,y){y=y.shiftBlocks(w);
return z.write("<p>").reference(y.get("remove_mention_dialog__text_plain__this_will_remove_the_link_to_your_profile_and_delete"),y,"h").write("</p>")
}function l(z,y){y=y.shiftBlocks(w);
return z.write("<p>").reference(y.get("remove_mention_dialog__text_plain__this_will_remove_the_link_to_your_profile"),y,"h").write("</p>")
}function j(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("lix_mentions_viral_updates"),y,"h")
}function h(z,y){y=y.shiftBlocks(w);
return z.write('<li class="privacy-settings"><a href="').reference(y.get("privacy_settings_link"),y,"h").write('" target="_blank">').reference(y.get("remove_mention_dialog__text_plain__privacy_settings"),y,"h").write("</a></li>")
}function b(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("lix_mentions_viral_updates"),y,"h")
}function a(z,y){y=y.shiftBlocks(w);
return z.write('<li class="privacy-settings"><a href="').reference(y.get("privacy_settings_link"),y,"h").write('" target="_blank">').reference(y.get("remove_mention_dialog__text_plain__privacy_settings"),y,"h").write("</a></li>")
}function x(z,y){y=y.shiftBlocks(w);
return z.reference(y.get("lix_mentions_viral_updates"),y,"h")
}return p
})();
(function(){dust.register("remove_mention_dialog_content",dust.cache["tl/shared/mentions/remove_mention_dialog_content"])
})();(function(){dust.register("tl/shared/degree_icon",b);
function b(d,c){return d.helper("param",c,{},{"key":"fNameP","defaultVal":""}).helper("param",c,{},{"key":"lNameP","defaultVal":""}).helper("param",c,{},{"key":"title","defaultVal":""}).helper("param",c,{},{"key":"distanceP","defaultVal":"-1"}).partial(a,c,null)
}function a(d,c){return d.write("tl/shared/degree_icon_").reference(c.get("distanceP"),c,"h")
}return b
})();
(function(){dust.register("degree_icon",dust.cache["tl/shared/degree_icon"])
})();(function(){dust.register("tl/shared/degree_icon_base",e);
function e(g,f){return g.write('<abbr title="').exists(f.get("title"),f,{"else":d,"block":b},null).write('" class="degree-icon ').block(f.getBlock("customStyle"),f,{},null).write('">').block(f.getBlock("iconTxt"),f,{"block":a},null).write("</abbr>")
}function d(g,f){return g.block(f.getBlock("distanceStr"),f,{"block":c},null)
}function c(g,f){return g.reference(f.get("degree_icon_base__text_plain__formatted_name"),f,"h")
}function b(g,f){return g.reference(f.get("title"),f,"h")
}function a(g,f){return g.reference(f.get("distanceP"),f,"h").reference(f.get("degree_icon_base__text_plain__degree_icon_symbol"),f,"h",["s"])
}return e
})();
(function(){dust.register("degree_icon_base",dust.cache["tl/shared/degree_icon_base"])
})();(function(){dust.register("tl/shared/degree_icon_-1",a);
function a(c,b){return c
}return a
})();
(function(){dust.register("degree_icon_-1",dust.cache["tl/shared/degree_icon_-1"])
})();(function(){dust.register("tl/shared/degree_icon_0",c);
var d={"distanceStr":b,"iconTxt":a};
function c(f,e){e=e.shiftBlocks(d);
return f.partial("tl/shared/degree_icon_base",e,null)
}function b(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_0__text_plain__you_distance_str_key"),e,"h")
}function a(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_0__text_plain__you_icon_txt_key"),e,"h")
}return c
})();
(function(){dust.register("degree_icon_0",dust.cache["tl/shared/degree_icon_0"])
})();(function(){dust.register("tl/shared/degree_icon_1",c);
var d={"distanceStr":b,"iconTxt":a};
function c(f,e){e=e.shiftBlocks(d);
return f.partial("tl/shared/degree_icon_base",e,null)
}function b(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_1__text_plain__NAME_is_your_connection"),e,"h",["s"])
}function a(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_1__text_plain__1st"),e,"h",["s"])
}return c
})();
(function(){dust.register("degree_icon_1",dust.cache["tl/shared/degree_icon_1"])
})();(function(){dust.register("tl/shared/degree_icon_2",c);
var d={"distanceStr":b,"iconTxt":a};
function c(f,e){e=e.shiftBlocks(d);
return f.partial("tl/shared/degree_icon_base",e,null)
}function b(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_2__text_plain__NAME_is_2nd_degree_contact_key"),e,"h",["s"])
}function a(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_2__text_plain__2nd"),e,"h",["s"])
}return c
})();
(function(){dust.register("degree_icon_2",dust.cache["tl/shared/degree_icon_2"])
})();(function(){dust.register("tl/shared/degree_icon_3",c);
var d={"distanceStr":b,"iconTxt":a};
function c(f,e){e=e.shiftBlocks(d);
return f.partial("tl/shared/degree_icon_base",e,null)
}function b(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_3__text_plain__NAME_is_3rd_degree_connection_key"),e,"h",["s"])
}function a(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_3__text_plain__3rd"),e,"h",["s"])
}return c
})();
(function(){dust.register("degree_icon_3",dust.cache["tl/shared/degree_icon_3"])
})();(function(){dust.register("tl/shared/degree_icon_100",c);
var d={"distanceStr":b,"iconTxt":a};
function c(f,e){e=e.shiftBlocks(d);
return f.partial("tl/shared/degree_icon_base",e,null)
}function b(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_100__text_plain__you_and_NAME_have_groups_in_common_key"),e,"h",["s"])
}function a(f,e){e=e.shiftBlocks(d);
return f.reference(e.get("degree_icon_100__text_plain__group_icon_txt_key"),e,"h")
}return c
})();
(function(){dust.register("degree_icon_100",dust.cache["tl/shared/degree_icon_100"])
})();(function(){dust.register("tl/shared/degree_icon_200",d);
var e={"distanceStr":c,"iconTxt":b,"customStyle":a};
function d(g,f){f=f.shiftBlocks(e);
return g.partial("tl/shared/degree_icon_base",f,null)
}function c(g,f){f=f.shiftBlocks(e);
return g.reference(f.get("degree_icon_200__text_plain__NAME_is_in_your_teams_network"),f,"h",["s"])
}function b(g,f){f=f.shiftBlocks(e);
return g.reference(f.get("degree_icon_200__text_plain__TeamLink"),f,"h")
}function a(g,f){f=f.shiftBlocks(e);
return g.write("teamlink")
}return d
})();
(function(){dust.register("degree_icon_200",dust.cache["tl/shared/degree_icon_200"])
})();(function(){var g="inputChange",a="character",d="",f="hide",c="match",b="hp-share",i="nus-discussion",h="group-discussion-open",j="group-discussion-closed";
LI.MentionsDecorator=function(al,Y){var Q=Y.triggers||"A",ao=Y.context||d,F=d,ap=false,G=(Y.inputCallout&&Y.inputCallout.currentImpressionCount)||0,E=Y$(Y.mentionsEl)[0],U,O=Y$(Y.highlightEl)[0],aj,L=YAHOO.env.ua.ie,m=Y$(Y.mentionsInputEl)[0],A,S,K,am,s=d,v=d,M=false,t,ai=Y.maximumMentions||30,q,z,aa=[],B=Y.queryDelay||250,w=this,ad=(Y.inputCallout&&Y.inputCallout.enabled)||false,x,n=Y.typeahead,ak=Y.typeaheadEl&&Y$(Y.typeaheadEl)[0],D=true,ag=Y.dedupeConnections||false,C=Y.urlAppend||d,V=YAHOO.lang,N=Y.isFromCap||false;
if(LI.MentionsDecorator.debugMode===undefined){LI.MentionsDecorator.debugMode=(window.location.href.indexOf("mentions_debug=true")!==-1)
}ap=LI.MentionsDecorator.debugMode;
w.mentionEntities=[];
w.currentMatch={};
w.previousToken="";
w.sendSecondWord=w.hasLastResults=w.usedSecondToken=w.sentSecondQuery=w.dependenciesLoaded=false;
w.upperRegexObj=/^[A-Z\u00C0-\u00D6\u00D8-\u00DE]$/;
q=function(aq){if(ap){var ar=(window.console&&window.console.log)?window.console.log:window.alert;
ar(w);
ar(aq)
}};
function af(){function aq(au){var at=false,ar;
try{ar=au.responseText.influencer_entitlement.result;
at=ar.isInfluencer||ar.isAuthor
}catch(av){q("influencer check failed")
}LI.MentionsDecorator.isInfluencer=at
}if(!LI.MentionsDecorator.isInfluencer&&!LI.MentionsDecorator.influencerCheckPerformed){LI.MentionsDecorator.influencerCheckPerformed=true;
if(LI.MentionsIsInfluencerUrl&&LI.MentionsIsInfluencerUrl.length){LI.asyncRequest("POST",LI.MentionsIsInfluencerUrl,{failure:aq,success:aq},null)
}else{q("failed to get influencer check url");
LI.MentionsDecorator.isInfluencer=false
}}}if(!N&&(ao===i||ao===b)){af()
}function H(){u();
p(true);
if(K){K.close()
}}function p(aq){if(!z){z=YDom.getAncestorByClassName(m,"mentions-container")
}LI.toggleClass(z,"hasFocus",aq)
}function u(){var ar=false,aq=false,au=!!window._;
if(!au){YAHOO.util.Get.script(LI.MentionsUnderscore.scripts[0],{onSuccess:function(){au=true;
at()
},onFailure:function(){q("LI.MentionsUnderscore failed")
}})
}if(!w.dependenciesLoaded){if(!aq){YAHOO.util.Get.script(LI.MentionsDependencies.scripts[0],{onSuccess:function(){aq=true;
at()
},onFailure:function(){q("LI.MentionsDependencies failed")
}})
}if(ao&&!LI.DataSource&&!ar){YAHOO.util.Get.script(LI.MentionsDataSourceDependencies.scripts[0],{onSuccess:function(){ar=true;
at()
},onFailure:function(){q("LI.MentionsDataSourceDependencies failed")
}})
}else{ar=true
}}function at(){if(aq&&ar&&au){t=LI.DataSource;
w.dependenciesLoaded=true;
if(ao){J()
}else{ah()
}}}}function J(){var ar=[],au=[],aq,aw,ax,av=LI.i18n.get("typeahead2-search-connections"),at="&query="+new Date().getTime();
ax={discussionparticipants:LI.i18n.get("typeahead2-search-discussion-participants"),company:LI.i18n.get("typeahead2-search-companies"),mynetwork:av,my1stnetwork:av};
switch(ao){case i:if(LI.MentionsDecorator.isInfluencer){ar[0]=V.merge(t.Sources.TYPE_COMPANIES_AND_NETWORK,{})
}else{ar[0]=V.merge(t.Sources.TYPE_COMPANIES_AND_FIRST_DEGREE_CONNECTIONS,{})
}au[0]="connectionsAndCompany";
ar[1]=V.merge(t.Sources.TYPE_DISCUSSION_PARTICIPANTS,{});
ar[1].liveData+="?"+(C.indexOf("&")===0?C.substr(1):C)+at;
au[1]="discussionparticipants";
break;
case b:if(LI.MentionsDecorator.isInfluencer){ar[0]="TYPE_COMPANIES_AND_NETWORK"
}else{ar[0]="TYPE_COMPANIES_AND_FIRST_DEGREE_CONNECTIONS"
}break;
case h:ar[0]=V.merge(t.Sources.TYPE_GROUP_MEMBERS_AND_NETWORK,{});
ar[0].config.scriptQueryAppend+=C;
break;
case j:ar[0]=V.merge(t.Sources.TYPE_GROUP_MEMBERS,{});
ar[0].config.scriptQueryAppend+=C;
break
}aq=ar.length;
if(aq>1){F={};
aw={};
for(aj=0;
aj<aq;
aj++){aw[au[aj]]=ar[aj].create(m)
}F.create=function(){var ay={};
if(ag){ay.doWithSourceSuccessCallback=y
}return t.Helper.createAggregatedDataSource(aw,ay,ax)
}
}else{if(aq===1){F=ar[0]
}}q("contextDataSource: "+F);
ah()
}function y(ar,ax){q("function call: deDupeDataSources");
var aw,au,av=ar.results,aq=[],at,ay;
for(ay in ax){if(ay==="discussionparticipants"){au=av.length;
at=ax[ay].resultList;
while(au--){aw=at.length;
if(av[au].sourceID==="mynetwork"||av[au].sourceID==="my1stnetwork"){while(aw--){if(av[au].id===at[aw].id){aq.push(au)
}}}}}}aq.sort();
aw=aq.length;
while(aw--){av.splice(aq[aw],1)
}return{results:av}
}function ah(){var ar,at,aq;
if(!M&&w.dependenciesLoaded){B=parseInt(B.toString().replace(/(?:\D*)(\d+)(?:\D*)/gi,"$1"),10);
if(isNaN(B)){B=250
}S=new LI.InputChangeObserver(m);
S[g].subscribe(Z);
w.typeahead=Y.typeahead||LI.Controls.getControl(ak,"LI.Typeahead2");
aq=w.typeahead;
if(ao){aq.source=F
}aq.onItemSelect=W;
if(Q==="H"){aq.onDataReturn=l
}aq.init();
x=new LI.TokenMatcher(S,Q);
x[c].subscribe(P);
x[f].subscribe(I);
U=new LI.TokenHighlighter(O);
YEvent.on(m,"blur",o);
M=true
}}function l(av,aw,aq){q("function call: handleDataReturn");
var aE=w.currentMatch,ay,aB,az,at=aw[2],aD,aC,au,ar,ax=decodeURIComponent(aw[1]),aA;
if(Q==="H"){ay=aE.trigger;
if(ay==="upper"){if(!w.sentSecondQuery){ar=aE.token;
aD=at.length;
w.hasLastResults=!!aD;
aB=(ar.indexOf(" ")!==-1);
aC=aB?ar.substr(ar.indexOf(" ")+1):"";
au=aC.length;
az=aB?w.upperRegexObj.test(aC.substr(0,1)):false;
aA=(ax===ar.substr(0,ax.length))||(ax===aC.substr(0,ax.length));
if(aA&&aB&&az&&au&&((!w.usedSecondToken&&!aD)||w.usedSecondToken)){w.sendSecondWord=true;
if(!aD&&au>=4&&ax===ar&&aC!==ar){T();
w.sentSecondQuery=true
}}else{if(!aA&&aB&&az){if(au<=3){w.sendSecondWord=false
}else{if(au>=4&&!aD){w.sendSecondWord=true;
T();
w.sentSecondQuery=true
}}}}}else{w.sentSecondQuery=false;
w.sendSecondWord=false
}}}}function P(at,ar){var aq=ar[0].match;
q("match: "+YJson.stringify(aq));
if(k(aq)){ac();
w.currentMatch=aq;
aa.push(window.setTimeout(T,B))
}}function T(){var az=w.currentMatch,at,ax,av,aw=false,au,ay,aq,ar;
if(Q==="H"){at=az.trigger;
if(at==="upper"){ar=az.token;
ax=ar.indexOf(" ")!==-1;
ay=ax?ar.substr(ar.indexOf(" ")+1):"";
au=w.previousToken;
av=ax?w.upperRegexObj.test(ay.substr(0,1)):false;
if(au.length){aw=(au===ay.substr(0,au.length))||(au===ar.substr(0,au.length))
}if(ay.length>=4){if(ax&&av&&(w.sendSecondWord||(aw&&((!w.usedSecondToken&&!w.hasLastResults)||w.usedSecondToken)))){aq=az.start;
az.token=ay;
az.start=aq+ar.lastIndexOf(" ");
if(aq){az.start++
}w.usedSecondToken=true
}else{w.usedSecondToken=false
}}}w.previousToken=w.currentMatch.token
}q("query: "+w.currentMatch.token);
w.typeahead.sendQuery(w.currentMatch.token)
}function k(aw){var aq=aw.start,ax=aw.end,av,au,at,ar=w.mentionEntities;
aj=ar.length;
while(aj--){av=ar[aj];
au=av.index-1;
at=au+av.length;
if((aq>=au&&aq<at)||(ax>=au&&ax<=at)){return false
}}return true
}function I(){ac();
ak.value=d;
try{w.typeahead.collapseContainer()
}catch(aq){}}function Z(){v=s;
s=m.value;
ab(v)
}function W(aE,aD){var aw=m.value,aH=w.currentMatch,at,ax,aB,aF=d,ay,aG=aD[2],aC,ar,aq,au,aA,av,az=w.currentMatch.triggerIncluded;
aC=aG.sourceID;
at=LI.htmlUnencode(aG.displayName);
av=at.length;
if(aG.type!=="category"){aq=aH.start;
q("itemType: "+aC);
switch(aC){case"groupmembers":case"my1stnetwork":case"mynetwork":case"discussionparticipants":aC="member";
break
}if(aq){++aq
}ar=[aw.substr(0,aq),at,aw.substr(w.currentMatch.end)].join(d);
if(aq){aB=at.indexOf(" ");
if(aB!==-1){aF=LI.htmlUnencode(at.substr(0,aB));
if(aF!==d){aA=aq-(aF.length+1);
au=aq+av;
ay=ar.substr(aA,au).toLowerCase();
ax=[aF," ",at].join(d).toLowerCase();
if(ax===ay){if(k({"start":aA,"end":(aA+av)})){ar=[ar.substr(0,aA),at,ar.substr(au)].join(d);
aq=aA
}}}}}m.value=ar;
if(w.mentionEntities.length<ai){w.mentionEntities.push({"id":aG.id,"index":aq,"length":av,"type":aC,"token":at,"triggerIncluded":az,"caretPosition":aH.caretPosition});
an();
Z();
R();
m.focus();
if(aq&&!az){aq++
}e(m,aq+av);
U.render(m.value,w.mentionEntities)
}}}function o(){p(false);
if(K){K.close()
}ak.value=d;
window.setTimeout(function(){w.typeahead.collapseContainer();
w.currentMatch=d
},250)
}function ac(){var aq=aa.length;
while(aq--){window.clearTimeout(aa[aq])
}}this.clearMentions=function(){w.mentionEntities=[];
R();
U.render(d,[])
};
function R(){E.value=YJson.stringify(r())
}function r(){var ar,at=[],aq=w.mentionEntities.length;
for(aj=0;
aj<aq;
aj++){ar=w.mentionEntities[aj];
at[aj]={"id":ar.id,"index":ar.index,"length":ar.length,"type":ar.type}
}return at
}function X(ar){var av=ar,aq=false,at;
if(M){try{aq=w.typeahead.isContainerOpen()
}catch(au){}if(aq){at=ar.keyCode;
switch(at){case 9:case 13:if(!((!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")===-1))||(YAHOO.env.ua.webkit>420))){av={type:"keydown",keyCode:39,target:ak,currentTarget:ak}
}case 27:case 38:case 40:w.typeahead.proxyKeyDown(av);
YEvent.stopEvent(ar);
break
}}}else{ah()
}}function ab(aH){var aw,aI=[],aL,aA,aB,aD,aE=false,aM,az,aN,aS=w.mentionEntities.length,aQ=[],aG,aK,aq,at,aF,au,aC,ay,av,aO,aP=" ",ar,ax,aJ,aR=(L&&L<=9);
s=m.value;
ay=aR&&D?-1:0;
aD=s.length-aH.length;
for(aj=0;
aj<aS;
aj++){aL=w.mentionEntities[aj];
aB=aL.token;
aA=aL.index;
aM=encodeURIComponent(aB);
if(aM.indexOf("%00")>-1){aB=decodeURIComponent(aM.replace("%00",""))
}at=s.indexOf(aB);
aN=aH.indexOf(aB)===aH.lastIndexOf(aB)&&at===s.lastIndexOf(aB);
az=at===-1;
if(aN&&at!==aA&&at!==-1){w.mentionEntities[aj].index=s.indexOf(aB)
}else{aJ=aB.length;
ar=s.substr(aA,aJ);
if(ar!==aB){q("adjustMentions: strCheck !== curToken");
aw=aA+aD+ay;
ax=s.substr(aw,aJ);
if(ax===aB){q("adjustMentions: strDiffCheck === curToken");
w.mentionEntities[aj].index=aw
}else{q("adjustMentions: strDiffCheck !== curToken");
aG=aB.split(aP);
av=new RegExp("[^"+aB.replace(/\s/g,d).replace(/\-/g,"\\-")+"\\s]","gi");
aK=ar.replace(av,"").split(aP);
aI=_.intersection(aG,aK);
q("curToken: "+aB);
q("strCheck: "+ar);
q("strDiffCheck: "+ax);
q("commonTokens: "+aI);
if(aI.length){aE=true;
au=aI.join(aP);
at=aL.index;
aF=au.length;
aq=at+aF;
aL.token=au;
aL.length=aF;
aL.end=aq;
w.mentionEntities[aj]=aL;
aC=s.substr(0,at)+au+d+s.substr(at-1+aJ);
m.value=aC;
if(aR){aD=s.length-m.value.length;
ae(m,aq,0)
}else{e(m,aq)
}}else{aQ.push(aj)
}ay=0
}}}}aO=aQ.length;
aQ.sort().reverse();
if(aO){for(aj=0;
aj<aO;
aj++){w.mentionEntities.splice(aQ[aj],1)
}}an();
if(aE){ab(s)
}R();
U.render(s,w.mentionEntities);
D=false
}function ae(aq,at,ar){setTimeout(function(){e(aq,at)
},ar)
}function an(){w.mentionEntities.sort(function(ar,aq){return ar.index-aq.index
})
}q("input focused before init: "+(m===document.activeElement));
if(m===document.activeElement){H()
}YEvent.on(m,"focus",H,w);
YEvent.on(m,"keydown",X,w);
if(ad&&!K){YEvent.on(window,"load",function(){A=Y.inputCallout;
function ar(at){if(at.target.className==="hopscotch-bubble-close"&&Y$(".mentions-share-box-promo-content",Y$(".hopscotch-bubble-container")[0],true)){window.oUISettings.saveSettings(this.uiSetting,3)
}}function aq(){if(!K){return
}K.open();
window.oUISettings.saveSettings(A.uiSetting,++G);
YEvent.on(Y$(".hopscotch-bubble-container")[0],"click",ar,A,true)
}am=Y$("#"+A.contentID,document,true);
if(am){K=new LI.HopscotchCallout(m,{id:A.contentID,orientation:"bottom",showOn:false,xOffset:A.offsetX,yOffset:A.offsetY,width:A.width,title:"",content:am.innerHTML})
}if(L&&L<=7){window.setTimeout(aq,500)
}else{aq()
}})
}this.adjustMentions=ab
};
LI.MentionsDecorator.highlight=function(q,l,k){var o=l,x,v,w,n,r,t,s,u,p=[],m=0;
if(o&&o.length&&o!=="[]"){o=YJson.parse(o);
x=o.length;
o=o.sort(function(z,y){return y.index-z.index
});
while(x--){n=o[x];
s=n.index;
w=n.length;
v=s+w;
u=q.substr(s,w);
r=n.mini||"";
t=n.profile||"";
if(s){p.push(LI.htmlEncode(q.substr(m,(s-m))))
}if(t){if(r){if(k){p.push(['<span class="miniprofile-container ',n.mini,'">','<a href="',n.profile,'" class="mention">',LI.htmlEncode(u),"</a></span>"].join(""))
}else{p.push(['<span class="new-miniprofile-container ',n.mini,'" data-li-url="',n.mini,'" data-li-tl="tl/shared/profile/mini_profile_shell">','<a href="',n.profile,'" class="mention">',LI.htmlEncode(u),"</a></span>"].join(""))
}}else{p.push(['<a href="',n.profile,'" class="mention">',LI.htmlEncode(u),"</a>"].join(""))
}}else{p.push(LI.htmlEncode(u))
}if(!x){p.push(LI.htmlEncode(q.substr(v)))
}m=v
}p=p.join("")
}else{p=LI.htmlEncode(q)
}return p
};
function e(m,k){var l;
if(m.setSelectionRange){m.setSelectionRange(k,k)
}else{if(m.createTextRange){l=m.createTextRange();
l.collapse(true);
l.moveEnd(a,k);
l.moveStart(a,k);
l.select()
}}}}());