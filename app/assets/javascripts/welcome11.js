LI.define("NusFlagging");
(function(){var m="data-selected-nus-item",b="comment-item",l="loading",n="nus-undo",i="feed-delete-comment",d=".nusDeleteUpdate [data-li-dialog-action=ok]",c=".nusDeleteUpdate [data-li-dialog-action=cancel]",a=".homepage-nus-comment .standard-form [data-li-dialog-action=ok]",f=".homepage-nus-comment .standard-form [data-li-dialog-action=cancel]",k=".report-copyright-material [data-li-dialog-action=ok]",h=".report-copyright-material [data-li-dialog-action=cancel]",g="click",e="flaggingComment";
function j(o,w){if(LI.__HPA===true){console.info("HOMEPAGE_PERFORMANCE_ANALYSIS :: /js/apps/NusFlagging.js")
}var q={flagLinkSelector:"li.comment-item [data-li-uscp-action=flag-member-comment]",undoFlagLinkSelector:"li.comment-item [data-li-uscp-action=undo-flag-member-comment]",reportLinkSelector:"li.comment-item [data-li-uscp-action=report-member-comment]",copyrightReportUrl:null},p=$.extend({},q,w),v=document.getElementById("feed-content")||document.getElementById("feed-container"),r=$(v),s=$("body");
j.Dialog=new LI.Dialog();
if(p.reportLinkSelector){r.delegate(p.reportLinkSelector,g,this.reportMember)
}if(p.flagLinkSelector){r.delegate(p.flagLinkSelector,g,this.flagMember)
}if(p.undoFlagLinkSelector){r.delegate(p.undoFlagLinkSelector,g,this.undoFlagMember)
}s.delegate(k,g,this.continueToReportCopyright);
s.delegate(h,g,this.cancelReportCopyright);
s.delegate(f,g,this.cancelReportFlaggedMemberComment);
s.delegate(a,g,this.reportFlaggedMemberComment);
var t=$("<span></span>").addClass("callout-content").text(LI.i18n.get("NUS_FLAGGING_DELETE")),u=$("<span></span>").addClass("callout-content").text(LI.i18n.get("NUS_FLAGGING_FLAG_AND_HIDE"));
$("<span></span>").attr("id","delete-my-comment").css("display","none").html(t).appendTo("body");
$("<span></span>").attr("id","flag-member-comment").css("display","none").html(u).appendTo("body")
}j.prototype={flagMember:function(p){p.preventDefault();
var s=$(p.target),t=s.parents(".comment-item"),r=t.attr("li-data-uscp-entity"),q=t.attr("data-flag-url")+"&entityId="+r+"&reason="+e;
function o(){var x=['<div class="',n,'">',"<p>",LI.i18n.get("NUS_FLAGGING_COMMENT_HIDDEN_YOU_CAN_UNDO_OR_REPORT"),"</p></div>"].join(""),w=$(this),v=$(x);
w.addClass("nus-hidden-undo");
w.append(v).removeClass(l)
}function u(){var v=$(this);
LI.injectAlert(LI.i18n.get("NUS_FLAGGING_THERE_WAS_AN_ERROR"),"error");
v.removeClass(l)
}t.addClass(l);
$.ajax({url:q,context:t,success:o,error:u})
},undoFlagMember:function(o){o.preventDefault();
var s=$(o.target),u=s.parents(".comment-item"),q=u.attr("li-data-uscp-entity"),p=u.attr("data-uflag-url")+"&entityId="+q+"&reason="+e;
function r(){var x=$(o.target),v=$(this),w=x.parents("."+n);
w.remove();
v.removeClass("nus-hidden-undo")
}function t(){LI.injectAlert(LI.i18n.get("NUS_FLAGGING_THERE_WAS_AN_ERROR"),"error")
}$.ajax({url:p,context:u,success:r,error:t})
},reportMember:function(o,q){o.preventDefault();
var r=j.prototype,p,u,t=LI.CommentFlagReportDependencies.url,s={title:LI.i18n.get("NUS_FLAGGING_REPORT"),dustTemplate:"comment_report_form",dustDataUrl:t};
if(q){j.Dialog.swap({content:s})
}else{p=$(o.target);
u=p.parents(".comment-item");
u.attr(m,true);
j.Dialog.open(o,{name:"CommentFlagReportDialog",width:500,className:"dialog-v2 comment-report-form copyright-enabled homepage-nus-comment",type:"interrupt",content:s,dependencies:LI.CommentFlagReportDependencies})
}},reportFlaggedMemberComment:function(o){o.preventDefault();
var t=$("li."+b+"["+m+"]"),q=$(o.target).parents(".standard-form"),s=t.attr("li-data-uscp-entity"),u=$("#social_flag_comment_form_id").find("[name=reason]:radio:checked").val(),r=t.attr("data-flag-url")+"&entityId="+s+"&reason="+u;
function v(){var y=$("li."+b+"["+m+"]"),w=$(this),z=y.children("."+n),A=w.find("li.copyright :radio").is(":checked"),x=LI.i18n.get("NUS_FLAGGING_THANK_YOU_FOR_REPORTING");
if(A){j.prototype.reportCommentAsCopyright()
}else{j.Dialog.close();
z.children("p").html(x).end().children("a").remove();
y.removeAttr(m)
}}function p(w){var x=$(this);
j.Dialog.close();
LI.injectAlert(LI.i18n.get("NUS_FLAGGING_THERE_WAS_AN_ERROR"),"error");
x.removeAttr(m)
}$.ajax({url:r,method:"POST",context:q,success:v,error:p})
},cancelReportFlaggedMemberComment:function(o){o.preventDefault();
var p=$("li."+b+"["+m+"]");
p.removeAttr(m);
j.Dialog.close()
},reportCommentAsCopyright:function(){var q=j.prototype,p=['<div class="report-copyright-material dialog-container interrupt">',"<p>",LI.i18n.get("NUS_FLAGGING_THANK_YOU_COPYRIGHT_REPORTED"),"</p>","<p>",LI.i18n.get("NUS_FLAGGING_CONTINUE_TO_FILE_COPYRIGHT_FORM"),"</p>",'<div class="dialog-actions">','<a href="#" data-li-dialog-action="open-form"><button class="btn-primary confirm-delete" type="button">',LI.i18n.get("NUS_FLAGGING_OPEN_THE_FORM"),"</button></a>",'<a href="#" data-li-dialog-action="cancel" class="dialog-close"><button class="btn-secondary" type="button">',LI.i18n.get("NUS_FLAGGING_CANCEL"),"</button></a>","</div></div>"].join(""),o=$(p);
j.Dialog.swap({content:{node:o.get(0)}})
},continueToReportCopyright:function(o){var r=$("li."+b+"["+m+"]"),s=r.children("."+n),p=this.reportCopyrightUrl,q=LI.i18n.get("NUS_FLAGGING_THANK_YOU_FOR_REPORTING");
window.open(p,"","height=600,width=800");
j.Dialog.close();
s.children("p").html(q).end().children("a").remove();
r.removeAttr(m)
},cancelReportCopyright:function(o){j.prototype.reportMember(o,true)
},deleteEntity:function(o){o.preventDefault();
var s=j.prototype,q=$(o.target),t=q.parents("li."+b),r=['<div class="dialog-container interrupt">','<div class="alert attention"><p><strong>',LI.i18n.get("NUS_FLAGGING_ARE_YOU_SURE_DELETE_COMMENT"),"</strong></p></div>",'<p class="actions">','<a href="#" data-li-uscp-item-id="',q.attr("id"),'" data-li-dialog-action="ok" class="btn-primary confirm-delete">',LI.i18n.get("NUS_FLAGGING_YES_PLEASE_DELETE_IT"),"</a>",'<a href="#" data-li-dialog-action="cancel" class="dialog-close btn-secondary">',LI.i18n.get("NUS_FLAGGING_CANCEL"),"</a>","</p></div>"].join(""),p=$(r);
t.attr(m,true);
j.Dialog.open(o,{name:"nusDeleteUdpate",type:"interrupt",width:"500",className:"dialog-v2 nusDeleteUpdate",content:{node:p.get(0),title:LI.i18n.get("NusDeleteUpdate-please-confirm")}});
$(d).bind(g,s.hideDeletedEntity);
$(c).bind(g,s.unHideDeletedEntity)
},hideDeletedEntity:function(o){o.preventDefault();
var p=$("li."+b+"["+m+"]"),q=p.find("."+i);
LI.Controls.getControl("feed-wrapper","NusDiscussion").deleteComment(q[0],p[0]);
p.removeAttr(m).removeClass("."+l);
$(d).unbind(g);
$(c).unbind(g);
j.Dialog.close()
},unHideDeletedEntity:function(o){o.preventDefault();
var p=$("li."+b+"["+m+"]");
p.removeAttr(m).removeClass("."+l);
$(d).unbind(g);
$(c).unbind(g);
j.Dialog.close()
}};
LI.NusFlagging=j
}());LI.define("SCINHiding");
LI.SCINHiding=LI.BaseControl.extend(function(b){var j="nus-scin-hide-item",c="linkedin-sponsor",m="scin-nus-hide-undo",d="scin-nus-hide-close",l="scin-feed-item",a="scin-nus-hide",e="scin-nus-hide-content",h="tl/apps/home/embed/scin_hide_confirmation",n="data-li-scin-hideurl",k="data-li-scin-track-undo",f=500,g="click",i={breakoutPage:0};
return{beforeDecoration:function(){this._config=_.defaults(this._config,i)
},attachEventListeners:function(){this._$el.on(g,_.bind(this.click,this))
},onResolve:function(o){this.click()
},click:function(v){var p=$(v.target),s=p.attr(n),r,o,q,u=Boolean(parseInt(this._config.breakoutPage,2));
if(s){r=p.closest("."+c);
if(r.length){o=$(r[0]);
v.preventDefault();
if(p.hasClass(j)){q=p.attr(k);
LI.asyncRequest("GET",s,{success:function(x){o.children().addClass(e);
var w;
if(x.responseText.hideEntity&&x.responseText.hideEntity.result===200){x.responseText.hideEntity.undoTrackUrl=q;
w=x.responseText;
dust.render(h,w,function(y,z){if(!y&&z){o.append(z);
o.addClass(l)
}else{return
}})
}else{return
}},failure:function(){return
}})
}else{if(p.hasClass(m)){o.children().removeClass(e);
o.children("."+a).remove();
LI.asyncRequest("GET",s,{success:function(w){if(w.responseText.hideEntity.result===204){return
}else{return
}},failure:function(){return
}})
}else{if(p.hasClass(d)){var t=p.attr(n);
o.animate({opacity:0},f,function(){$(this).remove();
if(u){window.location=t
}})
}else{return
}}}}else{return
}}}}
});(function(){dust.register("tl/apps/home/embed/scin_hide_confirmation",b);
function b(d,c){return d.section(c.get("hideEntity"),c,{"block":a},null)
}function a(d,c){return d.write('<div class="scin-nus-hide"><p class="scin-nus-hide-text">').reference(c.get("i18n_scin_hidden_update"),c,"h",["s"]).write(' <a href="').reference(c.get("undo_link"),c,"h").write('" class="scin-nus-hide-undo" data-li-track-url="').reference(c.get("undoTrackUrl"),c,"h").write('" data-li-scin-hideurl="').reference(c.get("undo_link"),c,"h").write('">').reference(c.get("i18n_scin_hide_undo"),c,"h",["s"]).write('</a><a href="close_home_link" data-li-scin-hideurl="').reference(c.get("close_home_link"),c,"h").write('" class="scin-nus-hide-close">').reference(c.get("i18n_scin_hide_close"),c,"h").write("</a></p></div>")
}return b
})();
(function(){dust.register("scin_hide_confirmation",dust.cache["tl/apps/home/embed/scin_hide_confirmation"])
})();(function(){LI.ChannelFollow=function(c,d){var b="not-following",e="not-followed",h="href",a="POST",f=".feed-item-meta",k="trigger-inline-recommendation",i="adding-inline-recommendation";
var l=function(){this.isFollowRecommendationEnabled=d.isFollowRecommendationEnabled||false;
$(c).on("click","a",g)
};
var g=function(o){var q=$(o.target),p,n,m,r;
if(q.get(0).tagName.toUpperCase()!=="A"){q=q.parent("a")
}if(q){n=q.parent("li");
if(n.hasClass("feed-see-more-channels")){o.preventDefault();
j(n,o)
}else{if(n.hasClass("channel-feed-follow")){p=q.attr(h);
if(p){o.preventDefault();
LI.asyncRequest(a,p,{success:function(t,s,v){var u=q.hasClass(b);
if(u){n.removeClass(e);
j(n,o)
}else{n.addClass(e)
}}})
}}}}};
var j=function(m,n){var o=m.closest(".feed-item-meta").siblings();
if(m&&!(m.hasClass(i))&&this.isFollowRecommendationEnabled&&((o.closest(".rollup-member-details")).length===0)&&(!(o.hasClass("recommended-item-section")))){m.addClass(i);
LI.Events.fire(k,n,m)
}};
l()
}
}());(function(){LI.define("FollowRecommendation");
LI.FollowRecommendation=function(b,d){var l="trigger-inline-recommendation",a="POST",g="GET",j="hide",c="show",h="data-inl-recom-url",i="data-inl-recom-tmpl",k="adding-inline-recommendation";
var m=function(){LI.Events.bind(l,f);
$(b).on("click","a",e)
};
var f=function(s,n){var q=$(s.target),r,o,p;
r=q.closest(".feed-body");
o=q.attr(i);
p=q.attr(h);
LI.asyncRequest(g,p,{success:function(u,t,v){if(u.responseText){dust.render(o,u.responseText,function(x,w){if(!x){$(w).appendTo(r).hide().addClass("animate").show()
}})
}n.removeClass(k)
},error:function(t){n.removeClass(k)
}})
};
var e=function(n){var p=$(n.target),o;
if(p&&(p.get(0).tagName.toUpperCase()==="A")&&p.hasClass("recommended-item-follow-action")){n.preventDefault();
o=p.attr("href");
LI.asyncRequest(a,o,{success:function(u,q,s){var r,t;
p.addClass(j);
p.next().removeClass(j).addClass(c);
r=p.prev().find("span:first-child");
t=parseInt(r.text().replace(",",""),10);
r.text(isFinite(t)?++t:t)
}})
}};
m()
}
}());(function(){var a={};
LI.Events={repository:a,logging:false,bind:function(e,f){a[e]=a[e]||[];
for(var c=0,d=a[e],b=d.length;
c<b;
c++){if(d[c].callback===f){return
}}a[e].push({th:this,callback:f})
},unbind:function(e,f){a[e]=a[e]||[];
if(!f){delete a[e];
return
}for(var c=0,d=a[e],b=d.length;
c<b;
c++){if(d[c].callback===f){d.splice(c,1)
}}},fire:function(){var d=[].concat(Array.prototype.slice.apply(arguments)),g=d.shift(),f=a[g],c,e,b;
if(f){for(e=0,b=f.length;
e<b;
e++){c=f[e].callback;
c.apply(f[e].th,d)
}}if(LI.Events.logging){window.console&&window.console.log(g,d);
LI.Events.lastEventId=g;
LI.Events.lastEventParams=d
}}}
})();(function(){dust.register("tl/shared/uscp/_follow_recommendations",e);
function e(i,h){return i.write('<div class="recommended-item-section">').section(h.get("recommended_channels"),h,{"block":d},null).write("</div>")
}function d(i,h){return i.exists(h.get("channels"),h,{"block":c},null)
}function c(i,h){return i.write('<ul class="recommended-items">').section(h.get("channels"),h,{"block":b},null).write('</ul><div class="recommended_items_see_more"><a href="').reference(h.get("_follow_recommendations_see_more"),h,"h").write('" class="see-more">').reference(h.get("_follow_recommendation_follow_more_channels"),h,"h",["s"]).write(' <span class="text">').reference(h.get("_follow_recommendation_see_more"),h,"h",["s"]).write('</span><span class="glyph"></span></a></div>')
}function b(i,h){return i.section(h.get("channel"),h,{"block":a},null)
}function a(i,h){return i.write('<li class="recommended-item"><div class="recommended-item-photo">').exists(h.get("logo"),h,{"else":g,"block":f},null).write('</div><div class="recommended-item-properties"><a class="recommended-item-title" href="').reference(h.get("_follow_recommendations_item_link"),h,"h").write('">').reference(h.get("fmtAuto_string_truncate_1"),h,"h").write('</a><p class="recommended-item-follower-count">').reference(h.get("_num_followers"),h,"h",["s"]).write('</p><a class="recommended-item-follow-action follow show" href="').reference(h.get("_follow_recommendations_follow_action_link"),h,"h").write('"><span class="glyph"></span>').reference(h.get("_follow_recommendation_action_text"),h,"h").write('</a><span class="recommended-item-follow-action following hide"><span class="glyph"></span>').reference(h.get("_follow_recommendation_following"),h,"h").write("</span></div></li>")
}function g(i,h){return i.write('<a href="').reference(h.get("_follow_recommendations_item_link_img"),h,"h").write('"><img alt="').reference(h.get("title"),h,"h").write('" src="').reference(h.get("no_photo_img_link"),h,"h").write('" width="65" height="65"/></a>')
}function f(i,h){return i.write('<a href="').reference(h.get("_follow_recommendations_item_link_img"),h,"h").write('"><img alt="').reference(h.get("title"),h,"h").write('" src="').reference(h.get("resolved_photo"),h,"h").write('" width="65" height="65"/></a>')
}return e
})();
(function(){dust.register("_follow_recommendations",dust.cache["tl/shared/uscp/_follow_recommendations"])
})();(function(){var BLUR="blur",CANCEL_FILE_UPLOAD_CLASS="cancel-file-upload",CHECKTEXTAREA_MESSAGE_SELECTOR="p.check-textarea-message",CLICK="click",DECORATOR_COMPONENT,EVERYONE_AND_TWITTER="EVERYONE_AND_TWITTER",FILE_TYPES,GET="GET",KEY_CODE_ENTER=13,KEY_CODE_SPACE=32,MANAGER_STATE,SHARE_VIEW_SUMMARY="share-view-summary",SHARE_VIEW_TITLE="share-view-title",SHOW_IMAGE_ID="share-include-photo",TICKET_STATUS={InternalError:"INTERNAL_ERROR",Ok:"OK",TaskTimeout:"TASK_TIMEOUT",TicketClosed:"TICKET_CLOSED"},UPLOAD_STATE,YUI_UA=YAHOO.env.ua,YLANG=YAHOO.lang,CheckTextareaControl,Slideshare={};
FILE_TYPES={"image":"image","presentation":"presentation","document":"document"};
LI.define("ShareModule");
LI.ShareModule=function(el,config){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: /js/apps/ShareModule.js")
}CheckTextareaControl=LI.Controls.getControl(YDom.get("postText-postModuleForm"),"CheckTextarea");
var dataURI,decorator,defaults={trackingPrefix:"hp-shr-",injectionMode:"inject"},allowImageEdit=config.allowImageEdit||false,dustActivityTemplate=config.dustActivityTemplate||"tl/shared/uscp/_activity",fileUploadForm,form=YDom.get("share-form"),hasMentions=config.hasMentions||false,lastPost=Y$(".last-post",el)[0],link=Y$(".post-link",el)[0],mentionsDecorator,message=Y$(".post-message",el)[0],postLinkClose,postMap,postModuleURL,preview=Y$(".share-preview",el)[0],previewContent,requestManager,messageGhostLabel,summaryGhostLabel,titleGhostLabel,shareEditSummary,shareEditSummaryWrapper,shareEditTitle,shareEditTitleWrapper,shareIncludePhotoWrapper,shareIncludePhotoMarkup,shareViewSummary,shareViewTitle,showImageCheckbox,singleInputShareModuleEnabled=config.singleInputShareModuleEnabled,bizShareModule=config.bizShareModule,enableSlideshare=config.enableSlideshare==="true",teamSharingEnabled=config.teamSharingEnabled||false,showTwitterCountdown=!!config.showTwitterCountdown,stateManager,submit=YDom.get("share-submit"),urlInputHelper,visibilityDropdown;
function getMentionsDecorator(){if(!mentionsDecorator){mentionsDecorator=LI.Controls.getControl(YDom.getAncestorByClassName(message,"mentions-container"),"MentionsDecorator")
}return mentionsDecorator
}function handleVisibilityDropdownChange(evt){var checkTextAreaCountdown,value=visibilityDropdown.getSelectedValue();
if(showTwitterCountdown){checkTextAreaCountdown=Y$(CHECKTEXTAREA_MESSAGE_SELECTOR,form,true);
LI.toggle(checkTextAreaCountdown)
}if(value===EVERYONE_AND_TWITTER){CheckTextareaControl.setCountMethod("twitter");
if(!config.twitterTethered){LI.popup(config.twitterPopupURL,{height:500,width:850})
}}else{if(config.dropdownDialogValue&&value===config.dropdownDialogValue){LI.Dialog().open(config.dropdownDialogConfig)
}else{CheckTextareaControl.setCountMethod("default")
}}CheckTextareaControl.checkLength()
}function Decorator(){var decorations=YDom.getAttribute(el,"class").split(" ");
this.decorate=function(string){var index=decorations.indexOf(string);
if(index===-1){YDom.addClass(el,string);
decorations.push(string)
}};
this.getDecorations=function(){return decorations
};
this.strip=function(string){var index=decorations.indexOf(string);
if(index>-1){YDom.removeClass(el,string);
decorations.splice(index,1)
}};
this.is_a=function(strings){var is=false;
strings=[].concat(strings);
LI.each(strings,function(string){if(LI.indexOf(decorations,string)>-1){is=true
}});
return is
};
this.COMPONENT=Decorator.COMPONENT
}function animateMemberPhoto(marginMovement){var memberPhoto=Y$(".animated-member-photo"),memberPhotoAnim=null,memberPhotoAnimAttr={},ANIMATION_DURATION=config.photoAnimDuration||0.3;
memberPhotoAnimAttr={marginTop:{to:marginMovement}};
memberPhotoAnim=new YAHOO.util.Anim(memberPhoto,memberPhotoAnimAttr,ANIMATION_DURATION,YAHOO.util.Easing.easeOut);
memberPhotoAnim.animate()
}Decorator.COMPONENT={Active:"active",ActiveLink:"active_link",ActiveMessage:"active_message",Inactive:"inactive",PreviewLoaded:"preview_loaded",PreviewLoading:"preview_loading",ShareLoading:"share_loading",ShowingCharCount:"showing_char_count",Transition:"transition",UploadActive:"upload_active",UploadError:"upload_error",UploadCancel:"upload_cancel",UploadProgress:"upload_progress",UploadConvert:"upload_convert",UploadPreview:"upload_preview",UploadProgressStart:"upload_progress_start",UploadProgressEnd:"upload_progress_end",UploadFileComplete:"upload_complete",UploadImageComplete:"upload_image_complete",UploadConvertThresholdOne:"upload_convert_threshold_one",UploadConvertThresholdTwo:"upload_convert_threshold_two"};
DECORATOR_COMPONENT=Decorator.COMPONENT;
decorator=new Decorator();
function StateManager(){var state;
this.changed=new YAHOO.util.CustomEvent("changed");
this.state=function(string,args){if(arguments.length>=1){this.changed.fire(string,state,args||[]);
state=string
}else{return state
}};
this.STATE=StateManager.STATE
}StateManager.UPLOADSTATE={Upload:"upload",Convert:"convert",Preview:"preview",ErrorState:"error"};
UPLOAD_STATE=StateManager.UPLOADSTATE;
StateManager.STATE={ActiveLink:"active_link",ActiveMessage:"active_message",AttachDone:"attach_done",Inactive:"inactive",PreviewAborted:"preview_aborted",PreviewFailed:"preview_failed",PreviewLoaded:"preview_loaded",PreviewLoading:"preview_loading",ShareErred:"share_erred",ShareFailed:"share_failed",ShareInjected:"share_injected",ShareInjecting:"share_injecting",ShareLoading:"share_loading",ShareReady:"share_ready",BeforeShareSubmit:"before_share_submitted",ShareSubmitted:"share_submitted",ShareSucceeded:"share_succeeded",ShowingCharCount:"showing_char_count",UrlCaptured:"url_captured",UploadActive:"upload_active",UploadError:"upload_error",UploadCancel:"upload_cancel",UploadProgressStart:"upload_progress_start",UploadProgressStatus:"upload_progress_status",UploadProgressEnd:"upload_progress_end",UploadFileComplete:"upload_complete",UploadImageComplete:"upload_image_complete",UploadQueueStart:"upload_queue_start",UploadQueueStatus:"upload_queue_status",UploadQueueEnd:"upload_queue_end",UploadConvertStart:"upload_convert_start",UploadConvertStatus:"upload_convert_status",UploadConvertEnd:"upload_convert_end",UploadPreview:"upload_preview",UploadConvertThresholdOne:"upload_convert_threshold_one",UploadConvertThresholdTwo:"upload_convert_threshold_two"};
MANAGER_STATE=StateManager.STATE;
stateManager=new StateManager();
stateManager.changed.subscribe(function(event,passedArgs){var args=[].concat(passedArgs),state=args.shift(),previousState=args.shift();
switch(state){case MANAGER_STATE.Inactive:requestManager.kill();
decorator.strip(DECORATOR_COMPONENT.Transition);
decorator.strip(DECORATOR_COMPONENT.ActiveLink);
decorator.strip(DECORATOR_COMPONENT.ShowingCharCount);
decorator.strip(DECORATOR_COMPONENT.UploadActive);
decorator.strip(DECORATOR_COMPONENT.UploadPreview);
decorator.strip(DECORATOR_COMPONENT.UploadFileComplete);
unloadPreview();
enableSubmit();
if(enableSlideshare){Slideshare.unsetFilePreview()
}break;
case MANAGER_STATE.ActiveMessage:decorator.decorate(DECORATOR_COMPONENT.Transition);
decorator.decorate(DECORATOR_COMPONENT.Active);
if(!YLANG.trim(link.value).length){decorator.strip(DECORATOR_COMPONENT.ActiveLink)
}decorator.strip(DECORATOR_COMPONENT.Inactive);
decorator.decorate(DECORATOR_COMPONENT.ActiveMessage);
animateMemberPhoto(15);
break;
case MANAGER_STATE.ActiveLink:decorator.decorate(DECORATOR_COMPONENT.Transition);
decorator.decorate(DECORATOR_COMPONENT.Active);
decorator.strip(DECORATOR_COMPONENT.ActiveMessage);
decorator.strip(DECORATOR_COMPONENT.Inactive);
decorator.decorate(DECORATOR_COMPONENT.ActiveLink);
break;
case MANAGER_STATE.UrlCaptured:if(!previewContent&&!decorator.is_a(DECORATOR_COMPONENT.UploadActive)){urlInputHelper.url=urlInputHelper.getUrl();
link.value=urlInputHelper.url;
decorator.decorate(DECORATOR_COMPONENT.PreviewLoading);
window.setTimeout(function urlCaptured(){retrievePreview(dataURI+encodeURIComponent(urlInputHelper.url));
stateManager.state(MANAGER_STATE.PreviewLoading)
},300)
}break;
case MANAGER_STATE.PreviewLoading:disableSubmit();
break;
case MANAGER_STATE.PreviewFailed:enableSubmit();
decorator.strip(DECORATOR_COMPONENT.PreviewLoading);
break;
case MANAGER_STATE.PreviewAborted:enableSubmit();
decorator.strip(DECORATOR_COMPONENT.PreviewLoading);
break;
case MANAGER_STATE.PreviewLoaded:enableSubmit();
decorator.strip(DECORATOR_COMPONENT.PreviewLoading);
decorator.decorate(DECORATOR_COMPONENT.PreviewLoaded);
break;
case MANAGER_STATE.BeforeShareSubmit:if(enableSlideshare&&wasFileUploaded()){Slideshare.validateFileUploadSubmit()
}break;
case MANAGER_STATE.ShareSubmitted:disableSubmit();
break;
case MANAGER_STATE.ShareErred:disableSubmit();
break;
case MANAGER_STATE.ShareFailed:enableSubmit();
break;
case MANAGER_STATE.ShareSucceeded:LI.removeAlert();
urlInputHelper.clear();
break;
case MANAGER_STATE.ShareInjecting:break;
case MANAGER_STATE.ShareInjected:urlInputHelper.clear();
if(hasMentions&&getMentionsDecorator()){getMentionsDecorator().clearMentions()
}break;
case MANAGER_STATE.ShareLoading:disableSubmit();
break;
case MANAGER_STATE.ShareReady:decorator.strip(DECORATOR_COMPONENT.ShareLoading);
enableSubmit();
break;
case MANAGER_STATE.UploadActive:decorator.strip(DECORATOR_COMPONENT.PreviewLoading);
decorator.strip(DECORATOR_COMPONENT.UploadError);
decorator.strip(DECORATOR_COMPONENT.Inactive);
decorator.decorate(DECORATOR_COMPONENT.UploadActive);
decorator.decorate(DECORATOR_COMPONENT.Active);
decorator.decorate(DECORATOR_COMPONENT.Transition);
if(enableSlideshare){Slideshare.initFilePreview(args[0])
}disableSubmit();
break;
case MANAGER_STATE.UploadError:decorator.decorate(DECORATOR_COMPONENT.UploadError);
decorator.strip(DECORATOR_COMPONENT.UploadPreview);
decorator.strip(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadProgress);
decorator.strip(DECORATOR_COMPONENT.UploadProgressStart);
decorator.strip(DECORATOR_COMPONENT.UploadProgressEnd);
decorator.strip(DECORATOR_COMPONENT.UploadFileComplete);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdOne);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdTwo);
if(enableSlideshare){Slideshare.setFileUploadError(args[0])
}break;
case MANAGER_STATE.UploadCancel:decorator.strip(DECORATOR_COMPONENT.UploadActive);
decorator.strip(DECORATOR_COMPONENT.UploadPreview);
decorator.strip(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadProgress);
decorator.strip(DECORATOR_COMPONENT.UploadProgressStart);
decorator.strip(DECORATOR_COMPONENT.UploadProgressEnd);
decorator.strip(DECORATOR_COMPONENT.UploadFileComplete);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdOne);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdTwo);
if(enableSlideshare){Slideshare.unsetFilePreview()
}break;
case MANAGER_STATE.UploadProgressStart:decorator.strip(DECORATOR_COMPONENT.UploadError);
decorator.strip(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadFileComplete);
decorator.decorate(DECORATOR_COMPONENT.UploadProgress);
decorator.decorate(DECORATOR_COMPONENT.UploadProgressStart);
break;
case MANAGER_STATE.UploadProgressStatus:if(enableSlideshare){Slideshare.setFileUploadProgress(args[0])
}break;
case MANAGER_STATE.UploadQueueStart:case MANAGER_STATE.UploadConvertStart:decorator.decorate(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadError);
decorator.strip(DECORATOR_COMPONENT.UploadProgress);
decorator.strip(DECORATOR_COMPONENT.UploadProgressStart);
break;
case MANAGER_STATE.UploadConvertEnd:decorator.strip(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadProgressEnd);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdOne);
decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdTwo);
decorator.decorate(DECORATOR_COMPONENT.UploadFileComplete);
enableSubmit();
if(!teamSharingEnabled){visibilityDropdown.enableDropdown()
}break;
case MANAGER_STATE.UploadConvertThresholdOne:if(!(decorator.is_a([DECORATOR_COMPONENT.UploadFileComplete,DECORATOR_COMPONENT.UploadError,DECORATOR_COMPONENT.Inactive]))){decorator.decorate(DECORATOR_COMPONENT.UploadConvertThresholdOne)
}break;
case MANAGER_STATE.UploadConvertThresholdTwo:decorator.strip(DECORATOR_COMPONENT.UploadConvertThresholdOne);
if(!(decorator.is_a([DECORATOR_COMPONENT.UploadFileComplete,DECORATOR_COMPONENT.UploadError,DECORATOR_COMPONENT.Inactive]))){decorator.decorate(DECORATOR_COMPONENT.UploadConvertThresholdTwo)
}break;
case MANAGER_STATE.UploadImageComplete:decorator.strip(DECORATOR_COMPONENT.UploadError);
decorator.strip(DECORATOR_COMPONENT.UploadProgress);
decorator.strip(DECORATOR_COMPONENT.UploadConvert);
decorator.strip(DECORATOR_COMPONENT.UploadProgressStart);
decorator.strip(DECORATOR_COMPONENT.UploadProgressEnd);
decorator.decorate(DECORATOR_COMPONENT.UploadFileComplete);
enableSubmit();
if(!teamSharingEnabled){visibilityDropdown.enableDropdown()
}if(enableSlideshare){Slideshare.setFilePreview(args[0])
}break;
case MANAGER_STATE.UploadPreview:decorator.decorate(DECORATOR_COMPONENT.UploadPreview);
if(enableSlideshare){Slideshare.setFilePreview(args[0])
}break;
case MANAGER_STATE.UploadProgressEnd:decorator.strip(DECORATOR_COMPONENT.UploadProgressStart);
if(!(decorator.is_a([DECORATOR_COMPONENT.UploadFileComplete,DECORATOR_COMPONENT.UploadError,DECORATOR_COMPONENT.Inactive]))){decorator.decorate(DECORATOR_COMPONENT.UploadProgressEnd)
}break;
case MANAGER_STATE.UploadQueueStatus:case MANAGER_STATE.UploadQueueEnd:case MANAGER_STATE.UploadConvertStatus:default:break
}if(LI.__DEBUG){console.info("ShareModule:StateChanged:"+state)
}});
stateManager.state(MANAGER_STATE.ShareLoading);
if(singleInputShareModuleEnabled){postLinkClose=Y$(".post-link-close",el)[0];
shareEditSummary=YDom.get("share-edit-summary");
shareEditTitle=YDom.get("share-edit-title");
shareEditTitleWrapper=YDom.get("share-edit-title-wrapper");
shareEditSummaryWrapper=YDom.get("share-edit-summary-wrapper");
messageGhostLabel=Y$(".post-message-label",el,true);
if(messageGhostLabel){messageGhostLabel=LI.Controls.getControl(messageGhostLabel,"GhostLabel")
}summaryGhostLabel=LI.Controls.getControl("share-edit-summary-label","GhostLabel");
titleGhostLabel=LI.Controls.getControl("share-edit-title-label","GhostLabel");
shareIncludePhotoWrapper=YDom.get("share-include-photo-wrapper");
shareIncludePhotoMarkup=shareIncludePhotoWrapper.innerHTML;
shareIncludePhotoWrapper.innerHTML="";
if(!teamSharingEnabled){visibilityDropdown=new LI.StyledDropdown(Y$(".menu-basic",el)[0],{listClass:"doc-sharing-dropdown"});
handleVisibilityDropdownChange();
LI.StyledDropdown.itemSelectEvent.subscribe(handleVisibilityDropdownChange,visibilityDropdown)
}}config=YLANG.merge(defaults,config);
try{dataURI=config.dataURI.substr(0,config.dataURI.indexOf("url=")+4)
}catch(error){throw ("dataURI not provided to ShareModule")
}try{postModuleURL=config.postModuleURL
}catch(error){throw ("postModuleURL not provided to ShareModule")
}postMap={ajax:Y$("#share-ajax")[0],contentEntityID:Y$("#share-entity-id")[0],contentImage:Y$("#share-img-selected-url")[0],contentImageCount:Y$("#share-img-total")[0],contentImageIncluded:Y$("#share-include-photo")[0],contentImageIndex:Y$("#share-img-selected-idx")[0],contentImageWidth:Y$("#share-img-width")[0],contentImageHeight:Y$("#share-img-height")[0],contentSummary:Y$("#share-edit-summary")[0],contentTitle:Y$("#share-edit-title")[0],contentSource:Y$("#share-entity-source")[0],shareEntityUrl:Y$("#share-entity-url")[0],contentUrl:Y$("#contentUrl-postModuleForm")[0],postText:Y$("#postText-postModuleForm")[0],fileShareFileType:Y$("#file-share-ext-input")[0],fileShareFileId:Y$("#file-share-id-input")[0]};
(function(context){if(!enableSlideshare){return
}var messageInputField=Y$(".post-message",el,true),filePreview=Y$(".file-preview",el,true),filePreviewStatus=Y$(".file-preview-status",el,true),filePercentage=Y$(".file-upload-percentage",filePreview,true),fileErrors=Y$(".file-preview-errors",filePreview,true),type=Y$(".meta",filePreview,true),title=Y$(".share-view-title",filePreview,true),summary=Y$(".share-view-summary",filePreview,true),image=Y$(".file-upload-image",filePreview,true),editContent=Y$(".share-content",filePreview,true),originalImageSrc=YDom.getAttribute(image,"src")||image.src,originalAltText=YDom.getAttribute(image,"alt")||image.alt,originalSummaryText=summaryGhostLabel?summaryGhostLabel.getLabel():"",originalTitleText=titleGhostLabel?titleGhostLabel.getLabel():"",originalLabelText=messageGhostLabel?messageGhostLabel.getLabel():"",filePreviewPreviousNode=YDom.getPreviousSibling(filePreview),filePreviewNode=filePreview.parentNode.removeChild(filePreview),filePreviewStatusNode=filePreviewStatus.parentNode.removeChild(filePreviewStatus),editContentPreviousNode=YDom.getPreviousSibling(editContent),editContentNode=editContent.parentNode.removeChild(editContent),previousTitle=shareEditTitle.value,previousSummary=shareEditSummary.value;
function setTitleText(text){if(title){shareEditTitle.value=previousTitle=text;
title.innerHTML=LI.htmlEncode(text)
}}function setSummaryText(text){if(summary){shareEditSummary.value=previousSummary=text;
summary.innerHTML=LI.htmlEncode(text)
}}context["initFilePreview"]=function(args){var ghostMessage;
if(filePreview&&args.type){filePreview.className=args.type+"-upload-type "+filePreview.className.replace(/(^|\s)[a-z]+-upload-type(\s|$)/,"$1 $2")
}if(args.type!=="image"||allowImageEdit){YDom.insertAfter(editContentNode,editContentPreviousNode)
}setSummaryText(originalSummaryText);
setTitleText(originalTitleText);
YDom.insertAfter(filePreviewNode,filePreviewPreviousNode);
if(!args||!args.isImageUpload){YDom.insertAfter(filePreviewStatusNode,filePreviewNode)
}if(messageGhostLabel){if(args.type&&FILE_TYPES[args.type]){ghostMessage=LI.i18n.get("share-module-file-upload-message-"+FILE_TYPES[args.type])
}messageGhostLabel.setLabel(ghostMessage||LI.i18n.get("share-module-file-upload-message")||originalLabelText);
if(!messageInputField||(!messageInputField.value||messageInputField.value===originalLabelText)){messageGhostLabel.updateLabel()
}}message.focus();
if(!postMap.contentImageIncluded){shareIncludePhotoWrapper.innerHTML=shareIncludePhotoMarkup;
postMap.contentImageIncluded=YDom.get(SHOW_IMAGE_ID)
}};
context["setFilePreview"]=function(args){var title=YLANG.trim(args.title),summary=YLANG.trim(args.summary);
if(args.type&&type){type.innerHTML=args.type
}if(args.extension){postMap.fileShareFileType.value=args.extension
}if(title&&shareEditTitle.value===previousTitle){setTitleText(title);
YDom.setAttribute(image,"alt",title)
}if(summary&&shareEditSummary.value===previousSummary){setSummaryText(summary)
}if(args.image){YDom.setAttribute(image,"src",args.image.replace(/^https?\:/,"").replace(/\-(medium|large)(\.[a-z]+)$/,"-small$2"));
postMap.contentImage.value=args.image;
postMap.contentImageIndex.value=0;
postMap.contentImageCount.value=1;
postMap.contentImageIncluded.checked=true
}if(args.url){postMap.contentUrl.value=args.url;
postMap.shareEntityUrl.value=args.url
}if(args.id){postMap.fileShareFileId.value=args.id
}postMap.contentEntityID.value="FSHR_38"
};
context["unsetFilePreview"]=function(){var inputs=[postMap.fileShareFileType,postMap.contentImage,postMap.contentImageIndex,postMap.contentImageCount,postMap.contentImageIncluded,postMap.contentUrl,postMap.shareEntityUrl,postMap.fileShareFileId,postMap.contentEntityID];
if(filePreview.parentNode){filePreviewNode=filePreview.parentNode.removeChild(filePreview)
}if(filePreviewStatus.parentNode){filePreviewStatusNode=filePreviewStatus.parentNode.removeChild(filePreviewStatus)
}if(editContent.parentNode){editContentNode=editContent.parentNode.removeChild(editContent)
}if(type){type.innerHTML=""
}YDom.setAttribute(image,"src",originalImageSrc);
YDom.setAttribute(image,"alt",originalAltText);
setSummaryText(originalSummaryText);
setTitleText(originalTitleText);
LI.each(inputs,function(input){if(input){input.value=input.defaultValue
}});
shareIncludePhotoWrapper.innerHTML="";
postMap.contentImageIncluded=null;
if(messageGhostLabel){messageGhostLabel.setLabel(originalLabelText);
messageGhostLabel.updateLabel()
}};
context["setFileUploadProgress"]=function(args){filePercentage.innerHTML=args.percentage
};
context["validateFileUploadSubmit"]=function(){if(shareEditSummary.value===originalSummaryText){shareEditSummary.value=""
}if(shareEditTitle.value===originalTitleText){shareEditTitle.value=""
}};
context["setFileUploadError"]=function(args){var errors=["convert-error","progress-error","type-error","size-error"],type=args.type,supported=false;
LI.each(errors,function(err){YDom.removeClass(fileErrors,err);
if(!supported&&err.indexOf(type)===0){supported=true
}});
if(!supported){type="progress"
}YDom.addClass(fileErrors,type+"-error")
}
}(Slideshare));
stateManager.state(MANAGER_STATE.ShareReady);
function typeIsXML(response){var doc=(YAHOO.env.ua.ie)?(response.responseXML&&response.responseXML.documentElement):response.responseXML;
return doc
}function disableSubmit(){YDom.setAttribute(submit,"disabled","true");
YDom.addClass(submit,"disabled")
}function enableSubmit(){submit.disabled=false;
YDom.removeClass(submit,"disabled")
}function loadPreview(){var meta,toggleImageContent,shareImageNode,contentMeta,shareTitle,shareSummary;
if(LI.isFullPage(previewContent)){stateManager.state(MANAGER_STATE.PreviewFailed);
return
}link.blur();
preview.innerHTML=previewContent;
if(bizShareModule){var toggleImgContent=document.createElement("div"),shareContainer=YDom.get("share-preview-in");
YDom.addClass(toggleImgContent,"toggle-img-content");
shareContainer.appendChild(toggleImgContent)
}if(singleInputShareModuleEnabled){shareImageNode=YDom.get("share-image");
toggleImageContent=Y$(".toggle-img-content",el)[0];
shareIncludePhotoWrapper.innerHTML="";
if(toggleImageContent){toggleImageContent.innerHTML=shareImageNode?shareIncludePhotoMarkup:""
}showImageCheckbox=YDom.get(SHOW_IMAGE_ID);
YEvent.on(showImageCheckbox,CLICK,handleShowImageCheckboxClick)
}shareTitle=YDom.get("share-view-title");
if(shareTitle){postMap.contentTitle.value=LI.htmlUnencode(shareTitle.innerHTML)
}if(postMap.contentSource){contentMeta=YDom.get("share-view-meta");
postMap.contentSource.value=LI.htmlUnencode(YLANG.trim(contentMeta?contentMeta.innerHTML:""))
}shareSummary=YDom.get("share-view-summary");
if(shareSummary){postMap.contentSummary.value=LI.htmlUnencode(shareSummary.innerHTML)
}postMap.contentImage.value=YDom.getAttribute(Y$("#share-image .sheen img")[0],"src");
meta=YDom.get("share-content");
postMap.contentEntityID.value=YDom.getAttribute(meta,"data-entity-id");
postMap.shareEntityUrl.value=YDom.getAttribute(meta,"data-entity-url");
LI.Controls.parseFragment(preview);
stateManager.state(MANAGER_STATE.PreviewLoaded)
}function unloadPreview(){postMap.contentTitle.value=postMap.contentTitle.defaultValue||"";
postMap.contentSummary.value=postMap.contentSummary.defaultValue||"";
if(postMap.contentSource){postMap.contentSource.value=postMap.contentSource.defaultValue||""
}postMap.contentEntityID.value="";
if(postMap.contentUrl){postMap.contentUrl.value=""
}preview.innerHTML="";
decorator.strip(DECORATOR_COMPONENT.PreviewLoaded);
decorator.strip(DECORATOR_COMPONENT.PreviewLoading);
LI.GhostLabel.Manager.show(form.id);
urlInputHelper.unload();
previewContent=undefined
}function retrievePreview(url){var timeout=12000,frequency=1200,delay;
requestManager.kill();
function fail(){stateManager.state(MANAGER_STATE.PreviewFailed)
}function abort(){stateManager.state(MANAGER_STATE.PreviewAborted)
}function success(response){var xml=typeIsXML(response),ticket;
function handleTicket(){var url=ticket[0].firstChild.nodeValue;
if(url){retrievePreview(url)
}else{fail()
}}if(delay){window.clearTimeout(delay)
}if(xml){ticket=xml.getElementsByTagName("responseInfo");
if(ticket.length>0){if(ticket[0].firstChild.nodeValue==="FAILURE"){fail()
}else{if(ticket[0].firstChild.nodeValue===TICKET_STATUS.TicketClosed){ticket=xml.getElementsByTagName("forwardUrl");
if(ticket.length>0){handleTicket()
}else{fail()
}}else{delay=window.setTimeout(function(){retrievePreview(url)
},frequency)
}}}else{ticket=xml.getElementsByTagName("ticketStatusUrl");
if(ticket.length>0){handleTicket()
}else{fail()
}}}else{if(LI.isFullPage(response.responseText)){stateManager.state(MANAGER_STATE.PreviewFailed)
}else{previewContent=response.responseText;
loadPreview()
}}}requestManager.request(YAHOO.util.Connect.asyncRequest(GET,url,{success:success,fail:fail,abort:abort,timeout:timeout}));
stateManager.state(MANAGER_STATE.PreviewLoading)
}function postStatus(response){var _response=response.responseText;
function injectFeedItem(responseText){if(LI.NusInjection&&LI.NusInjection.injectFeedItem){LI.NusInjection.injectFeedItem(responseText);
stateManager.state(MANAGER_STATE.ShareInjected)
}}if(config.injectionMode==="inject"){requestManager.request(YAHOO.util.Connect.asyncRequest(GET,config.postModuleURL,{success:function(response){var _lastPost=LI.domify(response.responseText);
lastPost.innerHTML=Y$(".last-post",_lastPost)[0].innerHTML;
stateManager.state(MANAGER_STATE.Inactive)
},failure:function(response){stateManager.state(MANAGER_STATE.Inactive)
}}));
stateManager.state(MANAGER_STATE.ShareInjecting)
}else{stateManager.state(MANAGER_STATE.Inactive)
}injectFeedItem(_response)
}function submitPost(){var fileWasUploaded=wasFileUploaded(),frequency=1200,timeout=12000,oldValue,pageKeyInput;
function success(data){var xml=typeIsXML(data),response,Errors,json;
response=data.responseXML;
function poll(url,cb){var callCount=1;
function success(response){var status;
if(!typeIsXML(response)){postStatus(response)
}else{if(response.responseXML.getElementsByTagName("responseInfo")[0]){status=response.responseXML.getElementsByTagName("responseInfo")[0].firstChild.nodeValue;
if(status===TICKET_STATUS.TicketClosed){url=response.responseXML.getElementsByTagName("forwardUrl")[0].firstChild.nodeValue;
makeRequest()
}else{if(callCount<12){window.setTimeout(makeRequest,frequency);
callCount+=1
}else{failure(response)
}}}}}function failure(response){stateManager.state(MANAGER_STATE.ShareFailed)
}function makeRequest(){requestManager.request(YAHOO.util.Connect.asyncRequest(GET,url,{success:success,failure:failure,timeout:timeout}))
}makeRequest()
}if(xml){if(response.getElementsByTagName("formErrors")[0]){Errors=eval("("+response.getElementsByTagName("formErrors")[0].firstChild.nodeValue+")");
LI.showFormErrors(response);
stateManager.state(MANAGER_STATE.ShareErred)
}else{if(response.getElementsByTagName("responseInfo")[0]&&response.getElementsByTagName("responseInfo")[0].firstChild.nodeValue==="DUPLICATE"){LI.injectAlert(response.getElementsByTagName("responseMsg")[0].firstChild.nodeValue,"error");
stateManager.state(MANAGER_STATE.ShareFailed)
}else{if(response.getElementsByTagName("responseInfo")[0]&&response.getElementsByTagName("responseInfo")[0].firstChild.nodeValue==="FAILURE"){stateManager.state(MANAGER_STATE.ShareFailed)
}else{if(response.getElementsByTagName("jsonPayLoad")[0]){json=eval("("+response.getElementsByTagName("jsonPayLoad")[0].firstChild.nodeValue+")");
if(json.sharingUpdateUrl){stateManager.state(MANAGER_STATE.ShareSucceeded);
poll(json.sharingUpdateUrl)
}else{stateManager.state(MANAGER_STATE.ShareFailed)
}}}}}}else{if(data.status===200&&data.responseText){json=LI.parseJSON(data.responseText);
if(!(json.status==="ok"&&json.content)){stateManager.state(MANAGER_STATE.ShareFailed);
return
}if(teamSharingEnabled&&json.content.activityPollingUrl){stateManager.state(MANAGER_STATE.ShareSucceeded);
poll(json.content.activityPollingUrl)
}else{if(json.content.activityWithActor){dust.render(dustActivityTemplate,json.content,function(error,output){if(error){stateManager.state(MANAGER_STATE.ShareFailed)
}else{output=YAHOO.lang.trim(output);
postStatus({responseText:output});
stateManager.state(MANAGER_STATE.ShareSucceeded)
}})
}else{stateManager.state(MANAGER_STATE.ShareFailed)
}}}else{stateManager.state(MANAGER_STATE.ShareFailed)
}}}function failure(response){var msgNode,msg;
if(typeIsXML(response)){msgNode=response.responseXML.getElementsByTagName("responseMsg")[0];
if(msgNode){msg=msgNode.firstChild.nodeValue;
if(msg){LI.injectAlert(msg,"error")
}}}else{postMap.ajax.value=false;
form.submit();
LI.injectAlert(LI.i18n.get("error"),"error")
}}LI.clearFormErrors(form.id);
LI.GhostLabel.Manager.hide(form.id);
if(link&&!urlInputHelper.extractUrl(link.value)){link.value=""
}if(YLANG.trim(message.value)===""&&YLANG.trim(link.value)===""&&!fileWasUploaded){window.setTimeout(function(){LI.GhostLabel.Manager.show(form.id)
},0);
return
}if(teamSharingEnabled){YAHOO.util.Connect.initHeader("X-IsAJAXForm","1")
}if(hasMentions){if(getMentionsDecorator()&&getMentionsDecorator().mentionEntities&&getMentionsDecorator().mentionEntities.length){oldValue=message.value;
message.value=YLANG.trim(message.value);
mentionsDecorator.adjustMentions(oldValue)
}}if(!form.pageKey&&LI.getPageKey){pageKeyInput=document.createElement("input");
pageKeyInput.type="hidden";
pageKeyInput.name="pageKey";
pageKeyInput.value=LI.getPageKey();
form.appendChild(pageKeyInput)
}YAHOO.util.Connect.setForm(form);
requestManager.request(YAHOO.util.Connect.asyncRequest("POST",form.action,{success:success,failure:failure,timeout:timeout}));
stateManager.state(MANAGER_STATE.ShareSubmitted)
}function blurLinkInput(event){if(!YLANG.trim(link.value).length){decorator.strip(DECORATOR_COMPONENT.ActiveLink)
}}function cancelFileUpload(event){YEvent.preventDefault(event);
stateManager.state(MANAGER_STATE.Active)
}function checkShowingCharacterCountState(){var checkTextAreaCountdown;
if(singleInputShareModuleEnabled){checkTextAreaCountdown=Y$(CHECKTEXTAREA_MESSAGE_SELECTOR,form,true);
if(checkTextAreaCountdown&&YDom.getStyle(checkTextAreaCountdown,"display")!=="none"){decorator.decorate(DECORATOR_COMPONENT.ShowingCharCount);
YDom.addClass(fileUploadForm,DECORATOR_COMPONENT.ShowingCharCount)
}else{decorator.strip(DECORATOR_COMPONENT.ShowingCharCount);
YDom.removeClass(fileUploadForm,DECORATOR_COMPONENT.ShowingCharCount)
}}}function handleCloseLinkClick(event){YEvent.preventDefault(event);
decorator.strip(DECORATOR_COMPONENT.ActiveLink)
}function handleShareEditTitleBlur(event){setLinkPreviewTitle()
}function handleShowImageCheckboxClick(event){showImageCheckbox.value=showImageCheckbox.checked
}function setLinkPreviewSummary(){var val=LI.htmlEncode(shareEditSummary.value)||summaryGhostLabel&&summaryGhostLabel.getLabel();
if(YLANG.trim(val)!==""){shareViewSummary.innerHTML=val
}shareEditSummary.parentNode.replaceChild(shareViewSummary,shareEditSummary);
shareEditSummaryWrapper.appendChild(shareEditSummary)
}function setLinkPreviewTitle(){var val=LI.htmlEncode(shareEditTitle.value)||titleGhostLabel&&titleGhostLabel.getLabel();
if(YLANG.trim(val)!==""){shareViewTitle.innerHTML=val
}shareEditTitle.parentNode.replaceChild(shareViewTitle,shareEditTitle);
shareEditTitleWrapper.appendChild(shareEditTitle)
}function RequestManager(){var requests={},count=0;
this.request=function(request){var key="request_"+count;
count+=1;
requests[key]={request:request};
return key
};
this.kill=function(key){var i;
if(requests[key]){YAHOO.util.Connect.abort(requests[key].request,{},false);
delete requests[key]
}else{for(i in requests){this.kill(i)
}}}
}function UrlInputHelper(){var timeout,timeoutIds=[],delay=1200,hasLoaded=false,_url,inputs=link?[message,link]:[message];
function resolve(target){var __url;
if(decorator.is_a(DECORATOR_COMPONENT.UploadActive)){return
}__url=extractUrl(target.value);
if(__url&&__url!==_url&&hasLoaded===false){_url=__url;
stateManager.state(MANAGER_STATE.UrlCaptured);
WebTracking.trackUserAction(config.trackingPrefix+"url_captured")
}}function clearResolveUrlTimeouts(){var id;
while(timeoutIds.length){id=timeoutIds.pop();
window.clearTimeout(id)
}}function extractUrl(string){var strings=string.replace(/\n/g," ").split(" "),match,i=0,j;
j=strings.length;
for(;
i<j;
i+=1){match=strings[i].match(LI.patterns.sharingUrl);
if(match&&match.input.search("@")===-1){return strings[i].replace(",","")
}}return false
}this.extractUrl=extractUrl;
this.getUrl=function(){return _url
};
this.clear=function(){var i=0,j=inputs.length,checkTextAreaCountDown=Y$(CHECKTEXTAREA_MESSAGE_SELECTOR,form,true);
hasLoaded=false;
urlInputHelper.url=undefined;
for(;
i<j;
i+=1){inputs[i].value=""
}if(checkTextAreaCountDown){checkTextAreaCountDown.parentNode.removeChild(checkTextAreaCountDown)
}LI.GhostLabel.Manager.show(form.id)
};
this.unload=function(){hasLoaded=false;
_url=undefined
};
YEvent.on(inputs,"keyup",function(event){var target=YEvent.getTarget(event),keyCode=event.keyCode;
if(keyCode===KEY_CODE_ENTER||keyCode===KEY_CODE_SPACE){resolve(target);
clearResolveUrlTimeouts()
}else{timeout=window.setTimeout(function(){resolve(target)
},delay);
timeoutIds.push(timeout)
}checkShowingCharacterCountState()
});
YEvent.on(inputs,"keydown",function(event){clearResolveUrlTimeouts()
});
YEvent.on(inputs,"paste",function(event){var target=YEvent.getTarget(event);
window.setTimeout(function(){resolve(target)
},0);
checkShowingCharacterCountState();
WebTracking.trackUserAction(config.trackingPrefix+"paste")
});
YEvent.on(inputs,"blur",function(event){resolve(YEvent.getTarget(event))
})
}requestManager=new RequestManager();
urlInputHelper=new UrlInputHelper();
YEvent.on(message,"focus",function(event){stateManager.state(MANAGER_STATE.ActiveMessage);
WebTracking.trackUserAction(config.trackingPrefix+"actvt-msg")
});
if(singleInputShareModuleEnabled){YEvent.on(shareEditSummary,BLUR,setLinkPreviewSummary);
YEvent.on(shareEditTitle,BLUR,handleShareEditTitleBlur);
YEvent.on(postLinkClose,CLICK,handleCloseLinkClick)
}YEvent.on(link,CLICK,function(event){stateManager.state(MANAGER_STATE.ActiveLink);
WebTracking.trackUserAction(config.trackingPrefix+"actvt-lnk")
});
YEvent.on(link,BLUR,blurLinkInput);
YEvent.on(el,CLICK,function(event){var target=YEvent.getTarget(event),checkTextAreaCountDown=Y$(CHECKTEXTAREA_MESSAGE_SELECTOR,form,true),defaultSummaryText=LI.htmlUnencode(summaryGhostLabel&&summaryGhostLabel.getLabel()||""),defaultTitleText=LI.htmlUnencode(titleGhostLabel&&titleGhostLabel.getLabel()||""),uploadCancelState;
if(YDom.hasClass(target,"share-close")){YEvent.preventDefault(event);
link.value="";
if(decorator.is_a(DECORATOR_COMPONENT.UploadError)){uploadCancelState=UPLOAD_STATE.ErrorState
}else{if(decorator.is_a(DECORATOR_COMPONENT.UploadFileComplete)){uploadCancelState=UPLOAD_STATE.Preview
}else{if(decorator.is_a(DECORATOR_COMPONENT.UploadConvert)){uploadCancelState=UPLOAD_STATE.Convert
}else{if(decorator.is_a([DECORATOR_COMPONENT.UploadProgressStart,DECORATOR_COMPONENT.UploadProgressEnd])){uploadCancelState=UPLOAD_STATE.Upload
}}}}decorator.strip(DECORATOR_COMPONENT.ActiveLink);
stateManager.state(MANAGER_STATE.ActiveMessage);
unloadPreview();
if(enableSlideshare&&decorator.is_a(DECORATOR_COMPONENT.UploadActive)){stateManager.state(MANAGER_STATE.UploadCancel,{uploadState:uploadCancelState})
}WebTracking.trackUserAction(config.trackingPrefix+"prvw_unld")
}if(YDom.hasClass(target,"share-cancel")){YEvent.preventDefault(event);
stateManager.state(MANAGER_STATE.Inactive);
if(checkTextAreaCountDown){checkTextAreaCountDown.parentNode.removeChild(checkTextAreaCountDown)
}WebTracking.trackUserAction(config.trackingPrefix+"cancel")
}if(singleInputShareModuleEnabled){if(YDom.hasClass(target,SHARE_VIEW_SUMMARY)){shareViewSummary=YDom.get(SHARE_VIEW_SUMMARY);
if(shareEditSummary){shareEditSummary.value=shareViewSummary.innerHTML===defaultSummaryText?"":LI.htmlUnencode(shareViewSummary.innerHTML);
shareViewSummary.parentNode.replaceChild(shareEditSummary,shareViewSummary);
shareEditSummary.focus()
}if(YUI_UA.ie){YEvent.stopPropagation(event)
}}else{if(YDom.hasClass(target,SHARE_VIEW_TITLE)){shareViewTitle=YDom.get(SHARE_VIEW_TITLE);
shareEditTitle.value=shareViewTitle.innerHTML===defaultTitleText?"":LI.htmlUnencode(shareViewTitle.innerHTML);
shareViewTitle.parentNode.replaceChild(shareEditTitle,shareViewTitle);
shareEditTitle.focus();
if(YUI_UA.ie){YEvent.stopPropagation(event)
}}else{if(YDom.hasClass(target,CANCEL_FILE_UPLOAD_CLASS)){cancelFileUpload(event)
}}}}});
YEvent.on(submit,CLICK,function(event){YEvent.preventDefault(event);
stateManager.state(MANAGER_STATE.BeforeShareSubmit);
submitPost();
WebTracking.trackUserAction(config.trackingPrefix+"submit")
});
function wasFileUploaded(){return decorator.is_a([DECORATOR_COMPONENT.UploadPreview])
}urlInputHelper.clear();
postMap.ajax.value="true";
LI.define("DocSharing");
LI.DocSharing.setTwitterTethered=function(twitterTethered){config.twitterTethered=twitterTethered
};
return{decorator:decorator,stateManager:stateManager}
};
YAHOO.register("LI.ShareModule",LI.ShareModule,{})
}());LI.define("Genie");
LI.Genie=function(c,p){var q="oid_cb_"+YDom.generateId().replace(/[^a-z]/i,"_"),r=q+"_allow",s=q+"_deny",n=q+"_error",l=q+"_close",d=q+"_scope",i={},k=c.tagName.toLowerCase(),a=this,m=false,b=null,h,e,j,f;
p=p||{};
p={url:p.url||null,handleClickManual:p.handleClickManual||null,onAllow:p.onAllow||function(){},onDeny:p.onDeny||function(){},onError:p.onError||function(){},onClose:p.onClose||function(){},scope:p.scope||window,popupWidth:p.popupWidth||790,popupHeight:p.popupHeight||580,obj:p.obj||{}};
if(!p.url){if(k=="a"){p.url=c.href
}else{throw new Error("No URL was supplied and no URL was found in the control.")
}}i=YAHOO.lang.JSON.stringify({onAllow:r,onDeny:s,onError:n,onClose:l,scope:d});
i=escape(i);
p.url=p.url+"&cb="+i;
f=function(u){var t=u;
if(typeof(u)=="string"){t=LI.Controls.resolveName(u)
}return t
};
p.onAllow=f(p.onAllow);
if(!p.onAllow){throw new Error("onAllow could not be found or resolved")
}p.onDeny=f(p.onDeny);
if(!p.onDeny){throw new Error("onDeny could not be found or resolved")
}p.onError=f(p.onError);
if(!p.onError){throw new Error("onError could not be found or resolved")
}p.onClose=f(p.onClose);
if(!p.onClose){throw new Error("onClose could not be found or resolved")
}if(p.scope!="window"&&p.scope!=window){p.scope=f(p.scope);
if(!p.scope){throw new Error("scope could not be found or resolved")
}}function o(){window[r]=null;
window[s]=null;
window[n]=null;
window[l]=null;
window[d]=null;
m=false;
clearInterval(b);
b=null
}j=function(){window[r]=function(t){o();
p.onAllow.call(p.scope,t,p.obj)
};
window[s]=function(t){o();
p.onDeny.call(p.scope,t,p.obj)
};
window[n]=function(t){o();
p.onError.call(p.scope,t,p.obj)
};
window[l]=function(t){o();
p.onClose.call(p.scope,t,p.obj)
};
window[d]=a
};
function g(t){YEvent.preventDefault(t);
j();
h=window.open(p.url,"genie_popup","width="+p.popupWidth+",height="+p.popupHeight);
m=true;
b=setInterval(function(){if(m&&h.closed){o();
p.onClose.call(p.scope,{},p.obj)
}},300)
}if(!p.handleClickManual){YEvent.on(c,"click",g)
}return{handleClick:g}
};LI.define("ExternalShareButton");
LI.ExternalShareButton=LI.BaseControl.extend(function(e){var c="selected",b="callout-content",d="open",f="hidden",a="checked",g="click";
return{beforeDecoration:function(){var h=this._config;
this._el=this._$el.get(0),this._$button=$("#"+h.buttonToggleId),this._$toggle=$("#"+h.providerToggleId),this._$toolTip=$("#"+h.toolTipId),this._$toolTipContent=this._$toolTip.find("."+b),this._$dropArrow=$("#"+h.dropArrowId),this._$menu=$("#"+h.menuId),this._$tetherAccountIdInput=$("#"+h.tetherAccountIdInputId);
this._userName=h.userName;
if(this._$menu&&this._userName){this.populateMenu()
}this.genie=new LI.Genie(this._el,{url:this._config.bindUrl,handleClickManual:true,onAllow:function(i,j){i.win.close();
if(i&&i.hasOwnProperty("results")){this.bind(this.tidyBindResults(i.results))
}},onDeny:function(i,j){i.win.close()
},onError:function(i,j){i.win.close()
},onClose:function(i,j){},scope:this})
},attachEventListeners:function(){if(this._$button.length){this._$button.on(g,_.bind(function(h){if(this._userName){this._$toggle.prop(a,!this._$toggle.prop(a));
this.updateUI()
}else{this.genie.handleClick(this._el)
}h.preventDefault()
},this))
}else{this._$toggle.on(g,_.bind(function(h){if(!this._userName){h.preventDefault();
this.genie.handleClick(this._el)
}},this))
}if(this._$dropArrow.length){this._$dropArrow.on(g,_.bind(function(h){h.stopPropagation();
$(document).trigger(g,[this]);
LI.toggleClass(this._$menu.get(0),d)
},this));
$(document).on(g,_.bind(function(i,h){if(!h||h._$dropArrow!==this._$dropArrow){this._$menu.removeClass(d)
}},this))
}},tidyBindResults:function(h){var i={};
if(h){switch(h.provider){case"TWITTER":i.userName=h.tetheredAccountHandle;
i.tetherAccountId=h.tetheredAccountId;
break;
case"TENCENT":case"WEIBO":i.userName=h.identificationData.PROVIDER_USERNAME;
i.tetherAccountId=h.tetheredAccountId;
break
}}return i
},populateMenu:function(){var h=this._$menu.find("ul");
h.prepend("<li><a class='selected' href='#'>"+this._userName+"</a></li>")
},updateUI:function(){if(this._$button.length){this._$button.toggleClass(c,this._$toggle.prop(a))
}this.setToolTips();
if(this._$dropArrow.length){this._userName?this._$dropArrow.removeClass(f):this._$dropArrow.addClass(f)
}},setToolTips:function(){var h=this._config,i="";
if(this._$toolTip.length){if(this._userName){i=(this._$toggle.prop(a)?h.boundToolTipText:h.boundOffToolTipText).replace("@","@"+this._userName)
}else{i=h.toolTipText
}this._$toolTipContent.html(i)
}},bind:function(h){if(h.hasOwnProperty("userName")){this._userName=h.userName;
this._$tetherAccountIdInput.val(h.tetherAccountId);
this._$toggle.prop(a,true);
this.populateMenu();
this.updateUI()
}}}
});LI.define("SlideshareUploader");
LI.SlideshareUploader=(function(){var M={usePostMessage:true,transportName:"slideShareIframeTransport",paths:{},fileInputId:"",domain:document.domain.split(".").slice(-3).join("."),slideshareDomain:"",enableUnload:true,enableImageUpload:true,checkSize:true,maxFileSize:104857600,enableTranscriptAsDescription:true,enableHealthCheck:false,trackingPrefix:"ssu-",promoStatus:0,bypassFrameCheck:false},p={PRESENTATION:"presentation",DOCUMENT:"document",IMAGE:"image",UNKNOWN:"unknown"},u={"jpeg":p.IMAGE,"jpg":p.IMAGE,"gif":p.IMAGE,"png":p.IMAGE,"pdf":p.DOCUMENT,"doc":p.DOCUMENT,"docx":p.DOCUMENT,"rtf":p.DOCUMENT,"odt":p.DOCUMENT,"ppt":p.PRESENTATION,"pps":p.PRESENTATION,"pptx":p.PRESENTATION,"ppsx":p.PRESENTATION,"pot":p.PRESENTATION,"potx":p.PRESENTATION,"odp":p.PRESENTATION},D={QUEUED:0,CONVERTING:1,DONE:2,FAILED:3},G={STARTING:"starting",UPLOADING:"uploading",DONE:"done",ERROR:"error"},v={CONVERT:"convert",TYPE:"type",SIZE:"size",PROGRESS:"progress",HALT:"halt",HEALTH:"health",IFRAME:"iframe"},b={"upload_active":"act","upload_error":"err","upload_error_convert":"err-cnvr","upload_error_halt":"err-halt","upload_error_health":"err-hlth","upload_error_iframe":"err-ifrm","upload_error_progress":"err-pgrs","upload_error_size":"err-fsiz","upload_error_type":"err-ftyp","upload_cancel":"cncl","upload_cancel_convert":"cncl-cnvr","upload_cancel_error":"cncl-err","upload_cancel_preview":"cncl-prvw","upload_cancel_upload":"cncl-upld","upload_progress_start":"ustart","upload_progress_end":"uend","upload_convert_start":"cstart","upload_convert_end":"cend","upload_icon_click":"clck","upload_file_upload":"sbmt","upload_preview":"prvw","upload_complete":"fcmpt","upload_image_complete":"icmpt"},H={SUCCEEDED:"succeed",CANCELLED:"cancelled",FAILED:"failed",UPLOAD:"upload",QUEUE:"queue",CONVERT:"convert"},k="is-active",x="is-interactive",L="is-errored",E="is-focused",aa=false,ad=null,V=false,ah={},U=null,F=YAHOO.lang,K=window.YUtil,I=I,w=new RegExp("^(https?:)?\\/\\/"+(window.location.host.replace(/\./g,"[.]"))+"\\/?","i"),i=LI.i18n.get("slideshare-uploader-percentage"),ai=LI.i18n.get("slideshare-uploader-beforeunload"),W,g,T,af,O;
var R=Date.now||function(){return +new Date()
};
function h(ak){F.augmentObject(this,ak,true);
this.progressId=this.progressPrefix+(R())+Math.random();
this.timer=new n();
this.base=M.slideshareDomain
}h.prototype={convert:"/nhome/slideshare/convert-upload",status:"/nhome/slideshare/get-convert-status",slideshow:"/nhome/slideshare/get-slideshow",imageStore:"http://image-store.slidesharecdn.com/",progressPrefix:"_",uploadCallback:I,update:function(ak){F.augmentObject(this,ak,true);
return this
},updateTimer:function(){var ak=this.timer;
if(ak){return ak.update.apply(ak,arguments)
}return this
},getProgressUrl:function(){return this.base+"/progress?X-Progress-ID="+this.progressId+"&jsonp_callback={callback}"
},getHealthCheckUrl:function(){var ak=this.base+"/health_check?X-Progress-ID="+this.progressId+"&jsonp_callback=void&iframe_jsonp=true";
if(M.usePostMessage){ak+="&window_post=true&post_window=parent"
}else{ak+="&set_document_domain=true"
}return ak
},getUploadUrl:function(){var ak="SlideshareUploader"+this.progressPrefix+(R()),al;
if(!(/^\w+$/g.test(ak))){throw new Error()
}LI[ak]=(function(am,an){return function(){delete LI[ak];
am.apply(an,arguments)
}
}(this.uploadCallback,this));
al=this.base+"/upload?X-Progress-ID="+this.progressId+"&iframe_jsonp=true";
if(M.usePostMessage){al+="&window_post=true&post_window=parent&jsonp_callback="+ak
}else{al+="&set_document_domain=true&jsonp_callback=parent.LI."+ak
}return al
},getConvertUrl:function(){return this.convert.replace("*",this.fileId)
},getConvertStatusUrl:function(){return this.status.replace("*",this.slideshowId)
},getPreviewUrl:function(){return this.slideshow.replace("*",this.slideshowId)
},getImageUploadUrl:function(){var ak=this.fileId.split(".");
return this.imageStore+ak[0]+"-large."+ak[1]
}};
function n(){var aq={start:{},end:{}},am=M.paths&&M.paths.monitor,ak="&fileAction={action}&actionResult={result}&time={time}&fileType={type}",al=this,ap="",ao="unknown";
function an(at){function ar(au){return function(ax){var aw=typeof ax!=="string",av=[].slice.call(arguments,aw?0:1);
return al[au].apply(al,[aw?at:ax].concat(av))
}
}return{reset:ar("reset"),update:ar("update"),start:ar("start"),end:ar("end"),send:ar("send")}
}this.reset=function(){aq={start:{},end:{}};
delete this.action;
delete this.result;
delete this.type;
return this
};
this.update=function(at,ar){var au=typeof at==="string";
F.augmentObject(this,au?ar:at,true);
return au?an(at):this
};
this.start=function(ar){if(ar!==ap){this.update({action:ar})
}ar=ar||ao;
ap=ar;
aq.start[ar]=R();
return an(ar)
};
this.end=function(ar){ar=ar||ao;
aq.end[ar]=R();
return an(ar)
};
this.send=function(at,ar){var ax="",aw=typeof at==="string",au=(aw?at:(at&&at.state))||ao,av=(aq.end[au]||R())-aq.start[au];
if(aw){at=ar||{}
}if(!am||isNaN(av)){return this
}ax=F.substitute(ak,{action:au||at.action||this.action||ao,result:at.result||this.result||ao,time:av,type:at.type||this.type||ao});
K.Connect.asyncRequest("GET",am+ax,{});
return an(au)
}
}function r(ak){var al=b[ak];
if(al&&window.WebTracking){WebTracking.trackUserAction(M.trackingPrefix+al)
}}function y(ak){var al;
if(!ak||ak.source!==g.contentWindow||ak.type!=="message"||(ak.origin!=="https:"+M.slideshareDomain&&ak.origin!=="http:"+M.slideshareDomain)){return
}al=YAHOO.lang.JSON.parse(ak.data);
if(al.type!=="slidesharestatus"){return
}LI[al.method](al.payload)
}function Z(al,ak){M=F.merge(M,ak);
if(!al.id){YDom.generateId(al,"slideshare-upload-form-")
}O=al.id+R();
if(M.usePostMessage&&window.postMessage){YEvent.on(window,"message",y);
M.domain=document.location.hostname
}else{if(!!M.domain&&M.domain!=="control"){M.usePostMessage=false;
if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<8&&document.domain===M.domain){M.bypassFrameCheck=true
}else{document.domain=M.domain
}}}if(!ak.slideshareDomain){M.slideshareDomain="//slideshare."+M.domain
}ad=al;
z();
YDom.setAttribute(ad,"target",M.transportName);
g=S(function(){YEvent.on(g,"load",X);
aj()
});
ad.appendChild(g);
P();
YEvent.on(ad,"submit",C);
YEvent.on(ad,"reset",Y);
YEvent.on(M.fileInputId,"change",c);
YEvent.on(M.fileInputId,"click",e);
YEvent.on(M.fileInputId,"focus",l);
YEvent.on(M.fileInputId,"blur",ag);
if(M.enableUnload){YEvent.on(window,"beforeunload",ac)
}YEvent.onDOMReady(s)
}function z(){T=new h({progressPrefix:M.progressPrefix}).update(M.paths)
}function S(aq){var ak,ap=M.enableHealthCheck,ao,an=M.transportName;
try{ak=document.createElement('<iframe name="'+LI.htmlEncode(an)+'"">')
}catch(am){ak=document.createElement("iframe");
ak.name=an
}ak.className="slideshare-upload-iframe";
ak.style.display="none";
ak.frameborder="none";
ak.height=0;
ak.width=0;
YEvent.on(ak,"load",function al(){var ar=!ap||f(ak);
YEvent.removeListener(ak,"load",al);
if(ar){aq.apply(this,arguments)
}});
if(ap&&T){ao=T.getHealthCheckUrl()
}else{if(M.usePostMessage){ao="about:blank"
}else{ao="javascript:false;"
}}ak.src=ao;
return ak
}function s(){W=LI.Controls.getControl("post-module-neu","ShareModule");
if(W){ah=W.stateManager;
U=W.decorator;
ah.changed.subscribe(B);
aj()
}}function a(al,ap,ak){var ao=al.indexOf("//")===0||al.indexOf("http")===0,an=al.match(w)!==null;
function am(ar){var aq=this;
return function(au){var at={};
if(au&&au.responseText){at=LI.parseJSON(LI.htmlUnencode(au.responseText))
}ar.call(aq,at,au)
}
}if(ao&&!an){(new LI.JSONPRequest(al,{on:{success:ap,failure:ak,timeout:ak}})).send()
}else{LI.asyncRequest("GET",al,{success:am(ap),failure:am(ak),custom:{exception:am(ak),error:am(ak)}})
}}function P(){ad.reset()
}function Y(){z();
if(af){af.kill()
}aa=false
}function N(ak){var ap=ak.success||function(){},ao=ak.failure||function(){},av=0,aq=ak.failureLimit||3,al=ak.name,am=ak.url,an=false,au;
function at(aw){if(typeof aw==="undefined"||aw===al){an=true;
clearTimeout(au)
}}(function ar(){function ax(){if(!an){au=setTimeout(ar,1000)
}}function ay(az){var aA;
aA=ap(az);
av=0;
if(aA){ax()
}}function aw(az){var aA=true;
if(++av>=aq){aA=ao(az)
}if(aA){ax()
}}a(am,ay,aw)
}());
return{kill:at}
}function t(){var an,al=0,am=0;
ah.state(ah.STATE.UploadProgressStatus,{percentage:F.substitute(i,{0:0})});
function ao(ar){var au=true,at=ar.state,av=ar.received||0,aq=ar.size||0,ap=Math.max(0,Math.round(av/aq*100))||0;
if(av&&av<=al){am+=1;
if(am>=30){return ak({errorType:v.HALT})
}}else{am=0
}al=av;
if(at===G.STARTING||at===G.UPLOADING){ah.state(ah.STATE.UploadProgressStatus,{percentage:F.substitute(i,{0:ap})});
if(ap===100){au=false;
ah.state(ah.STATE.UploadProgressEnd,ar)
}}else{if(at===G.DONE){au=false;
ah.state(ah.STATE.UploadProgressStatus,{percentage:F.substitute(i,{0:100})});
ah.state(ah.STATE.UploadProgressEnd,ar)
}else{return ak(ar)
}}return au
}function ak(aq){aq=aq||{};
var ap=aq.status,ar=ap===413?v.SIZE:(ap===415?v.TYPE:(aq.errorType||v.PROGRESS));
ah.state(ah.STATE.UploadError,{type:ar});
return false
}an=N({name:ah.STATE.UploadProgressEnd,url:T.getProgressUrl(),success:ao,failure:ak});
return an
}function Q(){var al;
function am(ao){var aq=ao.state,ap=ah.state(),an=[ah.STATE.UploadFileComplete,ah.STATE.UploadQueueStatus,ah.STATE.UploadQueueStart],ar=true;
if(aq===D.QUEUED){ah.state(ah.STATE.UploadQueueStatus,ao)
}else{if(aq===D.CONVERTING&&LI.indexOf(an,ap)>-1){ah.state(ah.STATE.UploadQueueEnd,ao);
ah.state(ah.STATE.UploadConvertStart,ao)
}else{if(aq===D.CONVERTING){ah.state(ah.STATE.UploadConvertStatus,ao)
}else{if(aq===D.DONE){ar=false;
ah.state(ah.STATE.UploadConvertEnd,ao)
}else{if(aq===D.FAILED){return ak(ao)
}}}}}return ar
}function ak(){ah.state(ah.STATE.UploadError,{type:v.CONVERT});
return false
}al=N({name:ah.STATE.UploadConvertEnd,url:T.getConvertStatusUrl(),success:am,failure:ak});
return al
}function ae(){function al(an){var am=an.content&&an.content.Slideshow,ao=an.transcript&&an.transcript.transcript_body,aq=M.enableTranscriptAsDescription&&ao,ap=window.location.protocol;
if(am){ah.state(ah.STATE.UploadPreview,{title:am.Title,summary:aq&&ao||am.Description,image:(am.ThumbnailURL.indexOf("http")===0?"":ap)+am.ThumbnailURL,extension:am.Format,type:A(am.Format),id:am.ID,url:"http://www.slideshare.net/slideshow/embed_code/"+am.ID})
}else{ak(an)
}}function ak(am){ah.state(ah.STATE.UploadError,{type:v.CONVERT})
}a(T.getPreviewUrl(),al,ak)
}function ab(ak){var am=ak.split("."),al=am[am.length-1];
return al.toLowerCase()
}function d(ak){var am=ab(ak),al=T.type||u[am]||p.UNKNOWN;
T.update({type:al,ext:am}).updateTimer({type:am});
return(M.enableImageUpload||!M.enableImageUpload&&al!==p.IMAGE)&&u.hasOwnProperty(am)
}function m(ak){return(!M.checkSize)||(ak===undefined)||(ak&&ak<=M.maxFileSize)
}function A(ak){var am=ab(ak),al=u[am]||p.UNKNOWN;
return LI.i18n.get("slideshare-uploader-"+al)||""
}function J(al){var an=T&&T.getHealthCheckUrl(),ap=an&&LI.domify('<iframe src="'+an+'" height="0" width="0" style="display: none"></iframe>'),ar=al||function(){},aq;
function am(at){if(ap&&ap.parentNode){ap.parentNode.removeChild(ap);
ap=null
}clearTimeout(aq);
ar(at)
}function ak(){var at=ap&&(!M.enableHealthCheck||f(ap));
YEvent.removeListener(ap,"load",ak);
am(at)
}function ao(){am(false)
}if(ap){YEvent.on(ap,"load",ak);
document.body.appendChild(ap);
aq=setTimeout(ao,10000)
}else{ao()
}}function c(){var ap=YDom.get(M.fileInputId),al=ap.files?ap.files[0].size:undefined,aq=ap.value.replace(/\\/g,"/").split(/\//g),an=aq.pop(),ao=u[ab(an)]||p.UNKNOWN,ak=ao===p.IMAGE;
ah.state(ah.STATE.UploadActive,{isImageUpload:ak,type:ao});
if(!m(al)){ah.state(ah.STATE.UploadError,{type:v.SIZE});
return
}if(d(an)){J(function am(ar){if(ar){YDom.setAttribute(ad,"action",T.getUploadUrl());
ad.submit();
ah.state(ah.STATE.UploadPreview,{track:ak,title:an,type:A(an)})
}else{ah.state(ah.STATE.UploadError,{type:v.HEALTH})
}})
}else{ah.state(ah.STATE.UploadError,{type:v.TYPE})
}}function e(){r("upload_icon_click");
o(true,true)
}function l(){YDom.addClass(ad,E)
}function ag(){YDom.removeClass(ad,E)
}function f(am){var an=am||g,ak=true,ao;
if(M.usePostMessage||M.bypassFrameCheck){return true
}try{ao=an.contentDocument?an.contentDocument:(an.contentWindow.document||an.document);
if(!ao.getElementsByTagName("script").length){ak=false
}}catch(al){ak=false
}return ak
}function X(){setTimeout(function(){var ak=f(g);
if(!ak){ah.state(ah.STATE.UploadError,{type:v.IFRAME})
}},100)
}function I(ak){function am(an){if(an&&an.status!=="fail"){ah.state(ah.STATE.UploadFileComplete,an)
}else{al(an)
}}function al(an){ah.state(ah.STATE.UploadError,{type:v.CONVERT})
}T.update({fileId:ak.file_key});
ah.state(ah.STATE.UploadProgressEnd,ak);
if(T.type===p.IMAGE){ah.state(ah.STATE.UploadImageComplete,{image:T.getImageUploadUrl(),extension:T.ext,type:A(T.ext),id:T.fileId,url:T.getImageUploadUrl()})
}else{a(T.getConvertUrl(),am,al)
}}function C(){r("upload_file_upload")
}function ac(ak){var al=ah.STATE||{};
if(U&&U.is_a(al.UploadActive)&&!U.is_a(al.UploadError)){ak.returnValue=ai;
return ai
}}function B(an){var am=[].concat(arguments[1]),aq=am.shift(),ap=am[1]||{},al=ap.type||"",ar=T.timer,ao=ah.STATE||{};
if(ap.track!==false){r(aq)
}function ak(at){if(af){af.kill(at)
}}switch(aq){case ao.Inactive:P();
YDom.removeClass(ad,k);
YDom.removeClass(ad,x);
YDom.removeClass(ad,L);
YDom.setStyle(ad,"bottom","");
break;
case ao.ActiveMessage:case ao.Active:YDom.addClass(ad,k);
if(!aa){YDom.addClass(ad,x)
}break;
case ao.UploadActive:af=t();
ar.reset();
q();
ah.state(ah.STATE.UploadProgressStart);
break;
case ao.UploadProgressStart:ar.start(H.UPLOAD);
break;
case ao.UploadProgressEnd:ak(aq);
j();
break;
case ao.UploadImageComplete:ar.update({result:H.SUCCEEDED}).end(H.UPLOAD).send().reset();
break;
case ao.UploadFileComplete:T.update({slideshowId:ap.slideshow_id});
ah.state(ah.STATE.UploadQueueStart);
ar.update({result:H.SUCCEEDED}).end(H.UPLOAD).send();
af=Q();
break;
case ao.UploadQueueStart:ar.start(H.QUEUE);
break;
case ao.UploadQueueEnd:ar.update({result:H.SUCCEEDED}).end(H.QUEUE).send();
break;
case ao.UploadConvertStart:ar.start(H.CONVERT);
break;
case ao.UploadConvertEnd:ak(aq);
ae();
ar.update({result:H.SUCCEEDED}).end(H.CONVERT).send().reset();
break;
case ao.UploadError:ak();
YDom.addClass(ad,x);
YDom.addClass(ad,L);
P();
if(al===v.TYPE||al===v.SIZE){ar.reset()
}ar.send(ar.action,{result:H.FAILED});
if(al){r("upload_error_"+v[al.toUpperCase()])
}break;
case ao.UploadCancel:ah.state(ah.STATE.Inactive,true);
ak();
ar.send(ar.action,{result:H.CANCELLED});
if(ap.uploadState){r("upload_cancel_"+ap.uploadState)
}break;
default:break
}}function q(){YDom.addClass(ad,k);
YDom.removeClass(ad,x);
aa=true
}function j(){var am=M.convertTimeThresholds,al=function(ao,an){if(typeof ao==="string"&&(ao=ao.match(/\d+/))){ao=parseInt(ao[0],10)
}if(an&&ao&&!isNaN(ao)){ao=ao*1000;
window.setTimeout(function(){ah.state(an)
},ao)
}};
if(am){for(var ak in am){if(am.hasOwnProperty(ak)){al(am[ak],ah.STATE[ak])
}}}}function o(am,al){var ao=YDom.get("slideshare-hopscotch-placeholder"),ak=window.hopscotch,an=ak&&ak.getCalloutManager&&ak.getCalloutManager();
if(an){if(am){an.removeCallout(O)
}if(M.promoStatus){if(!am){M.promoStatus--;
an.createCallout({id:O,title:LI.i18n.get("slideshare-uploader-promo-title"),content:ao.innerHTML||"",target:ad.id,orientation:"bottom",showNavButtons:false,showNumber:false,width:315,xOffset:-280,arrowOffset:266,bubblePadding:0,ctaLabel:LI.i18n.get("slideshare-uploader-promo-cta"),showCTAButton:(YAHOO.env.ua.ie?false:true),onCTA:function(){e();
Y$(".file-input",ad,true).click()
}});
YEvent.on(Y$(".hopscotch-bubble-close",an.getCallout(O).element,true),"click",function(){o(true,true)
})
}if(window.oUISettings){window.oUISettings.saveSettings("slideshareUploadStatus",al?"0":""+M.promoStatus)
}}}}function aj(){if(V){YDom.addClass(ad,"is-ready");
o()
}V=true
}return Z
}());/*! SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
	
	(This is a LI modified version to support lazy loading)
*/

var swfobject = function() {
	if( LI.__HPA === true ) {
    console.info( 'HOMPAGE_PERFORMANCE_ANALYSIS :: /lib/swfobject/swfobject-li.js' );
  }
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		
		win = window,
		doc = document,
		nav = navigator,
		
		domLoadFnArr = [],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		script,
		timer = null,
		storedAltContent = null,
		storedAltContentId = null,
		isDomLoaded = false,
		isExpressInstallActive = false;
	
	/* Centralized function for browser feature detection
		- Proprietary feature detection (conditional compiling) is used to detect Internet Explorer's features
		- User agent string detection is only used when no alternative is possible
		- Is executed directly for optimal performance
	*/	
	var ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			var a = null, fp6Crash = false;
			try {
				a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
			}
			catch(e) {
				try { 
					a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
					playerVersion = [6,0,21];
					a.AllowScriptAccess = "always";	 // Introduced in fp6.0.47
				}
				catch(e) {
					if (playerVersion[0] == 6) {
						fp6Crash = true;
					}
				}
				if (!fp6Crash) {
					try {
						a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
					}
					catch(e) {}
				}
			}
			if (!fp6Crash && a) { // a will return null when ActiveX is disabled
				try {
					d = a.GetVariable("$version");	// Will crash fp6.0.21/23/29
					if (d) {
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				catch(e) {}
			}
		}
		var u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = false,
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u);
		/*@cc_on
			ie = true;
			@if (@_win32)
				windows = true;
			@elif (@_mac)
				mac = true;
			@end
		@*/
		return { w3cdom:w3cdom, pv:playerVersion, webkit:webkit, ie:ie, win:windows, mac:mac };
	}();

	/* Cross-browser onDomLoad
		- Based on Dean Edwards' solution: http://dean.edwards.name/weblog/2006/06/again/
		- Will fire an event as soon as the DOM of a page is loaded (supported by Gecko based browsers - like Firefox -, IE, Opera9+, Safari)
	*/ 
	var onDomLoad = function() {
		if (!ua.w3cdom) {
			return;
		}
		addDomLoadEvent(main);
		if (ua.ie && ua.win) {
			try {	 // Avoid a possible Operation Aborted error
				doc.write("<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"); // String is split into pieces to avoid Norton AV to add code that can cause errors 
				script = getElementById("__ie_ondomload");
				if (script) {
					addListener(script, "onreadystatechange", checkReadyState);
				}
			}
			catch(e) {}
		}
		if (ua.webkit && typeof doc.readyState != UNDEF) {
			timer = setInterval(function() { if (/loaded|complete/.test(doc.readyState)) { callDomLoadFunctions(); }}, 10);
		}
		if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, null);
		}
		addLoadEvent(callDomLoadFunctions);
	}();
	
	function checkReadyState() {
		if (script.readyState == "complete") {
			script.parentNode.removeChild(script);
			callDomLoadFunctions();
		}
	}
	
	function callDomLoadFunctions() {
		if (isDomLoaded) {
			return;
		}
		if (ua.ie && ua.win) { // Test if we can really add elements to the DOM; we don't want to fire it too early
			var s = createElement("span");
			try { // Avoid a possible Operation Aborted error
				var t = doc.getElementsByTagName("body")[0].appendChild(s);
				t.parentNode.removeChild(t);
			}
			catch (e) {
				return;
			}
		}
		isDomLoaded = true;
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { // Static publishing only
		var rl = regObjArr.length;
		for (var i = 0; i < rl; i++) { // For each registered object element
			var id = regObjArr[i].id;
			if (ua.pv[0] > 0) {
				var obj = getElementById(id);
				if (obj) {
					regObjArr[i].width = obj.getAttribute("width") ? obj.getAttribute("width") : "0";
					regObjArr[i].height = obj.getAttribute("height") ? obj.getAttribute("height") : "0";
					if (hasPlayerVersion(regObjArr[i].swfVersion)) { // Flash plug-in version >= Flash content version: Houston, we have a match!
						if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements
							fixParams(obj);
						}
						setVisibility(id, true);
					}
					else if (regObjArr[i].expressInstall && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) { // Show the Adobe Express Install dialog if set by the web page author and if supported (fp6.0.65+ on Win/Mac OS only)
						showExpressInstall(regObjArr[i]);
					}
					else { // Flash plug-in and Flash content version mismatch: display alternative content instead of Flash content
						displayAltContent(obj);
					}
				}
			}
			else {	// If no fp is installed, we let the object element do its job (show alternative content)
				setVisibility(id, true);
			}
		}
	}
	
	/* Fix nested param elements, which are ignored by older webkit engines
		- This includes Safari up to and including version 1.2.2 on Mac OS 10.3
		- Fall back to the proprietary embed element
	*/
	function fixParams(obj) {
		var nestedObj = obj.getElementsByTagName(OBJECT)[0];
		if (nestedObj) {
			var e = createElement("embed"), a = nestedObj.attributes;
			if (a) {
				var al = a.length;
				for (var i = 0; i < al; i++) {
					if (a[i].nodeName == "DATA") {
						e.setAttribute("src", a[i].nodeValue);
					}
					else {
						e.setAttribute(a[i].nodeName, a[i].nodeValue);
					}
				}
			}
			var c = nestedObj.childNodes;
			if (c) {
				var cl = c.length;
				for (var j = 0; j < cl; j++) {
					if (c[j].nodeType == 1 && c[j].nodeName == "PARAM") {
						e.setAttribute(c[j].getAttribute("name"), c[j].getAttribute("value"));
					}
				}
			}
			obj.parentNode.replaceChild(e, obj);
		}
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(regObj) {
		isExpressInstallActive = true;
		var obj = getElementById(regObj.id);
		if (obj) {
			if (regObj.altContentId) {
				var ac = getElementById(regObj.altContentId);
				if (ac) {
					storedAltContent = ac;
					storedAltContentId = regObj.altContentId;
				}
			}
			else {
				storedAltContent = abstractAltContent(obj);
			}
			if (!(/%$/.test(regObj.width)) && parseInt(regObj.width, 10) < 310) {
				regObj.width = "310";
			}
			if (!(/%$/.test(regObj.height)) && parseInt(regObj.height, 10) < 137) {
				regObj.height = "137";
			}
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				dt = doc.title,
				fv = "MMredirectURL=" + win.location + "&MMplayerType=" + pt + "&MMdoctitle=" + dt,
				replaceId = regObj.id;
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceId += "SWFObjectNew";
				newObj.setAttribute("id", replaceId);
				obj.parentNode.insertBefore(newObj, obj); // Insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				var fn = function() {
					obj.parentNode.removeChild(obj);
				};
				addListener(win, "onload", fn);
			}
			createSWF({ data:regObj.expressInstall, id:EXPRESS_INSTALL_ID, width:regObj.width, height:regObj.height }, { flashvars:fv }, replaceId);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // Insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			var fn = function() {
				obj.parentNode.removeChild(obj);
			};
			addListener(win, "onload", fn);
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // IE, the object element and W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries, like Object.prototype.toJSONString = function() {}
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // Stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements: fall back to the proprietary embed element
				var e = createElement("embed");
				e.setAttribute("type", FLASH_MIME_TYPE);
				for (var k in attObj) {
					if (attObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
						if (k.toLowerCase() == "data") {
							e.setAttribute("src", attObj[k]);
						}
						else if (k.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							e.setAttribute("class", attObj[k]);
						}
						else if (k.toLowerCase() != "classid") { // Filter out IE specific attribute
							e.setAttribute(k, attObj[k]);
						}
					}
				}
				for (var l in parObj) {
					if (parObj[l] != Object.prototype[l]) { // Filter out prototype additions from other potential libraries
						if (l.toLowerCase() != "movie") { // Filter out IE specific param element
							e.setAttribute(l, parObj[l]);
						}
					}
				}
				el.parentNode.replaceChild(e, el);
				r = e;
			}
			else { // Well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // Filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // Filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // Filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && (obj.nodeName == "OBJECT" || obj.nodeName == "EMBED")) {
			if (ua.ie && ua.win) {
				if (obj.readyState == 4) {
					removeObjectInIE(id);
				}
				else {
					win.attachEvent("onload", function() {
						removeObjectInIE(id);
					});
				}
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl) {
		if (ua.ie && ua.mac) {
			return;
		}
		var h = doc.getElementsByTagName("head")[0], s = createElement("style");
		s.setAttribute("type", "text/css");
		s.setAttribute("media", "screen");
		if (!(ua.ie && ua.win) && typeof doc.createTextNode != UNDEF) {
			s.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
		}
		h.appendChild(s);
		if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
			var ls = doc.styleSheets[doc.styleSheets.length - 1];
			if (typeof ls.addRule == OBJECT) {
				ls.addRule(sel, decl);
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks 
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/SWFObject_2_0_documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr) {
			if (!ua.w3cdom || !objectIdStr || !swfVersionStr) {
				return;
			}
			var regObj = {};
			regObj.id = objectIdStr;
			regObj.swfVersion = swfVersionStr;
			regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : false;
			regObjArr[regObjArr.length] = regObj;
			setVisibility(objectIdStr, false);
		},
		
		getObjectById: function(objectIdStr) {
			var r = null;
			if (ua.w3cdom) {
				var o = getElementById(objectIdStr);
				if (o) {
					var n = o.getElementsByTagName(OBJECT)[0];
					if (!n || (n && typeof o.SetVariable != UNDEF)) {
							r = o;
					}
					else if (typeof n.SetVariable != UNDEF) {
						r = n;
					}
				}
			}
			return r;
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
			if (!ua.w3cdom || !swfUrlStr || !replaceElemIdStr || !widthStr || !heightStr || !swfVersionStr) {
				return;
			}
			widthStr += ""; // Auto-convert to string
			heightStr += "";
			if (hasPlayerVersion(swfVersionStr)) {
				setVisibility(replaceElemIdStr, false);
				var att = {};
				if (attObj && typeof attObj === OBJECT) {
					for (var i in attObj) {
						if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries
							att[i] = attObj[i];
						}
					}
				}
				att.data = swfUrlStr;
				att.width = widthStr;
				att.height = heightStr;
				var par = {}; 
				if (parObj && typeof parObj === OBJECT) {
					for (var j in parObj) {
						if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
							par[j] = parObj[j];
						}
					}
				}
				if (flashvarsObj && typeof flashvarsObj === OBJECT) {
					for (var k in flashvarsObj) {
						if (flashvarsObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
				}
				addDomLoadEvent(function() {
					createSWF(att, par, replaceElemIdStr);
					if (att.id == replaceElemIdStr) {
						setVisibility(replaceElemIdStr, true);
					}
				});
			}
			else if (xiSwfUrlStr && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) {
				isExpressInstallActive = true; // deferred execution
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					var regObj = {};
					regObj.id = regObj.altContentId = replaceElemIdStr;
					regObj.width = widthStr;
					regObj.height = heightStr;
					regObj.expressInstall = xiSwfUrlStr;
					showExpressInstall(regObj);
				});
			}
		},
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3cdom) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3cdom) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(sel, decl) {
			if (ua.w3cdom) {
				createCSS(sel, decl);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (param == null) {
				return urlEncodeIfNecessary(q);
			}
			if (q) {
				var pairs = q.substring(1).split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive && storedAltContent) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) {
							storedAltContent.style.display = "block";
						}
					}
					storedAltContent = null;
					storedAltContentId = null;
					isExpressInstallActive = false;
				}
			} 
		},
		
		triggerOnDomLoad: callDomLoadFunctions
	};
}();

LI.Controls.register("LI.swfobject");var signalTrigger=YDom.get("signal-callout-trigger"),signalCallout;
if(signalTrigger){if(LI.__HPA===true){console.info("HOMPAGE_PERFORMANCE_ANALYSIS :: js/apps/SignalPromo.js")
}signalCallout=new LI.BalloonCallout(signalTrigger,{id:"signal-callout",width:686,offsetX:224,offsetY:3,orientation:"top-right",type:"instructional-callout",anchor:true,events:["click"],eventsOnInternalElements:{elementClass:"callout-close",elementEvent:"click",elementAction:"close"},relativeToTrigger:true});
signalCallout.openEvent.subscribe(function(){var g=YDom.getElementsByClassName("instructional-callout-video-wrapper","div","callout-overlay")[0],e="https://www.youtube.com/v/BDhj72OPCZk?rel=1&fs=1",d="instructional-callout-video",c="425",a="264",f={allowScriptAccess:"never",wmode:"opaque"},b;
if(g){g.innerHTML='<div id="'+d+'"></div>';
swfobject.embedSWF(e,d,c,a,"9.0.0",false,{},f);
b=YDom.getFirstChild(g);
if(!b.firstChild){b.innerHTML='<a rel="nofollow" href="https://www.youtube.com/watch?v=BDhj72OPCZk"><img src="https://img.youtube.com/vi/BDhj72OPCZk/hqdefault.jpg" width="'+c+'" height="'+a+'"></a>'
}}})
};(function(){var g=9,q="f090ba28b73911e091d04040d3dc5c07",o=545,d={EMBEDLY:"//api.embed.ly/1/oembed",SLIDESHARE:"//www.slideshare.net/api/oembed/2",VIMEO:"//vimeo.com/api/oembed.json",YOUTUBE:"//www.youtube.com/oembed"},h={SLIDESHARE:/^https?:\/\/(www\.)?slideshare\.net\/.*\/.*/i,VIMEO:/https?:\/\/(www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*)/i,YOUTUBE:/^https?:\/\/(www\.youtube\.com\/watch.*|youtu.be\/.*)/i},v="feed-content",f="video-container",e="video-body",a="video-head",k="video-share",r="video-shown",u="share-object",i="photo",l="properties",n="div",p="a",s;
function t(){var x=0,w,z,y;
if(navigator.plugins&&navigator.plugins.length){w=navigator.plugins["Shockwave Flash"];
if(w&&w.description&&w.description.length){z=/[0-9]+./;
x=parseInt(w.description.match(z)[0],10)
}}else{if(YAHOO.env.ua.ie){for(y=(g+10);
y>=g;
y--){try{w=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+y);
x=y;
break
}catch(A){}}}}return(x>=g)
}function c(w){return(w&&w.html)||""
}function m(y,z){var w=null,x;
if(y.nodeName.toLowerCase()==="a"){w=y.getAttribute(z)
}else{x=YDom.getAncestorByTagName(y,"a");
if(x){w=x.getAttribute(z)
}}return w
}function b(w){var y,x,z={url:encodeURIComponent(w),format:"json",maxwidth:o,callback:"{callback}"};
if(h.SLIDESHARE.test(w)){y=d.SLIDESHARE;
x="Slideshare"
}else{if(h.VIMEO.test(w)){y=d.VIMEO;
z.autoplay=true;
x="Vimeo"
}else{return
}}if(x&&WebTracking){WebTracking.trackUserAction("Inline"+x+"-play")
}return LI.addParams(y,z)
}function j(B){var O=YEvent.getTarget(B),A=m(O,"data-contentpermalink"),G,J="",E,y,w,F,C,L,M,x,z,I,N,D,P,K;
function H(R){var Q=_.bind(YDom.getElementsByClassName,YDom);
F=YDom.getAncestorByClassName(R,v);
L=Q(f,n,F)[0];
N=Q(i,n,F)[0];
D=Q(l,n,F)[0];
C=Q(u,n,F)[0];
M=Q(k,p,C)[0];
x=Q(a,n,L)[0];
z=Q(e,n,L)[0];
C=M||C
}if(A){if(!(E=b(A))){return
}if(s===undefined){s=(!YAHOO.env.ua.mobile&&t())
}if(!s){return
}YEvent.preventDefault(B);
I=YDom.getElementsByClassName("embed-icon","span",F)[0];
if(!I){I=document.createElement("span");
YDom.addClass(I,"embed-icon");
P=YDom.getElementsByClassName("image","a",F)[0];
if(P){YDom.addClass(P,"embed-image");
I.style.left=(P.offsetWidth/2-8)+"px";
I.style.top=(P.offsetHeight/2-8)+"px";
P.appendChild(I)
}}if(I){YDom.addClass(I,"loading-icon")
}G=m(O,"href");
y={on:{success:function(Q){if(!Q||!Q.type||!(YAHOO.lang.isNumber(Q.width))||!(YAHOO.lang.isNumber(Q.height))){location.href=G;
return
}if(Q.type==="video"||Q.type==="rich"){J=c(Q)
}else{if(Q.type==="photo"){J='<a href="'+G+'" target="_blank"><img src="'+Q.url+'" width='+Q.width+'" height="'+Q.height+'" border="0"></a>'
}else{location.href=G;
return
}}if(!J){location.href=G;
return
}H(O);
if(!L){L=document.createElement("div");
L.className="video-container";
L.innerHTML='<div class="video-head"><a href="#" role="button" class="video-close">x</a></div><div class="video-body"></div>';
F.insertBefore(L,C);
H(O)
}L.style.width=Q.width+"px";
x.style.backgroundPosition="0 -2940px";
z.innerHTML=J;
YDom.setStyle(z,"opacity",0);
z.style.height=(C.offsetHeight-20)+"px";
C.style.display="none";
L.style.display="block";
YDom.addClass(N,r);
YDom.addClass(D,r);
K=new YAHOO.util.Anim(z,{height:{to:Q.height}},0.2);
K.onComplete.subscribe(function(){new YAHOO.util.Anim(z,{opacity:{to:1}},0.2).animate()
});
K.animate();
if(I){YDom.removeClass(I,"loading-icon")
}},failure:function(Q){location.href=G
},timeout:function(Q){location.href=G
}},timeout:8000};
w=new LI.JSONPRequest(E,y);
w.send()
}else{if(YDom.hasClass(O,"video-close")){YEvent.stopEvent(B);
H();
L.style.display="none";
C.style.display="block";
YDom.removeClass(N,r);
YDom.removeClass(D,r);
z.innerHTML=""
}}}YEvent.onDOMReady(function(){YEvent.on("body","click",j)
})
})();(function(){function a(c,e,j,k){e=e||0;
function i(m){var l=0;
while(!!m){l+=m.offsetTop;
m=m.offsetParent
}return l
}function d(l){if(!!l){return _posY(l)+l.offsetHeight
}}function b(){var l=document.documentElement;
if(!!window.innerWidth){return window.innerHeight
}else{if(l.clientHeight>0){return l.clientHeight
}}return 0
}function g(){if(window.pageYOffset){return window.pageYOffset
}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)
}function f(l,m){var m=m?m:0;
viewPortHeight=b(),scrollDistance=g(),y=i(l);
return((y-m)<(viewPortHeight+scrollDistance))
}function h(){if(f(c,e)){j.call(this)
}}this.destroy=function(){YEvent.removeListener(window,"scroll",h)
};
YEvent.on(window,"scroll",h,null,k)
}LI.ElementVisible=a
})();LI.define("DelayedAdLoad");
LI.DelayedAdLoad=function(d,b){var c=Y$("iframe",d,true),a=c?c.offsetHeight:null,f=c?c.getAttribute("data-src"):null;
b={elementId:b.elementId||"my-feed-post",controlName:b.controlName||"LI.NusInfinitePagination",subProperty:b.subProperty||null,customEvent:b.customEvent||"infiniteScrollStopEvent"};
function e(){if(c){LI.grow(c,a);
c.src=f
}}function g(){var k=YDom.get(b.elementId),m=b.customEvent,j=null;
if(!c||!f||!k){throw"Could not initialize DelayedAdLoad"
}c.style.height=0;
j=LI.Controls.getControl(k,b.controlName);
if(j&&b.subProperty){j=j[b.subProperty]
}if(j){if(YAHOO.lang.isArray(m)){for(var l=0,h=m.length;
l<h;
l++){j[m[l]].subscribe(e,null,this)
}}else{j[m].subscribe(e,null,this)
}}else{e()
}}g()
};(function(){var an="data-li-filter",D="data-li-nus-sort",ac="data-li-update-date",aL="data-li-update-id",r="data-li-update-request-id",v="data-li-update-next-batch-offset",i="data-li-update-position",A="data-li-update-sb",aM="data-li-update-token",J="data-li-track-url",B="href",y="chron",M="rollup-update-detail",aa="feed-no-more",ao="feed-unfilter",m="selected",ap="trigger",ad="feed-item",aw="filter-",Y="twitter",N="menu-basic",aP="inside-li",c="filters-menu",d="feed-filters",Q="droplist",T="open",f="post-comment",j="comments-form",av="feed-content",aN="feed-sort-time",t="feed-sort-relevance",aq="share-form",G="ad-iframe-4",at="div",ai="ul",x="form",aK="adPageView",q="beforeParamChange",p="beforeReplaceList",au="paramChange",aA="realTimePollSuccess",ah="replaceList",ab="loadingData",n="feed-wrapper",aj="today-news-wrapper",z="post-txt-label",l="slick-sharing-cont",aG="filters-wrapper",s="tabbed-filters-wrapper",aH="extra",u="GhostLabel",H="StyledDropdown",Z="NUSStickyRightRail",O="filterType",S="lastUpdateId",e="nusRequestId",ax="showHidden",az="backfillOffset",k="orderBy",ae="typeFilter",aF="orderBySel",K="offset",P="filterValue",W="paginationToken",F="nusFilterBy-relevanceClick",g="nusFilterBy-timeClick",aD="nusTypeFilter-btnClick",R="nusTypeFilter-menuClick-",X="nusTypeFilter-unfilter",C="ALL",am="COWORKERS",aO="COWORKERS_V2",ag="MYUPDATE",ar="NEWS",h="USCP",a="Relevance",E="Time",aE=null,L=false,aI=false;
function aC(aQ){var aR;
for(aR in aQ){if(aQ.hasOwnProperty(aR)){if(aQ[aR]===undefined){delete aQ[aR]
}}}return aQ
}function b(aQ){return aQ===ag
}function o(aQ){return aQ===am||aQ===aO
}function af(aQ,aR,aS){return(aS&&((aQ&&aS==="Relevance")||(aR&&aS==="Time")))
}function I(aQ){return o(aQ)||b(aQ)
}function w(aQ){return aQ===E||aQ===a
}function aB(aQ){if(YAHOO.lang.isUndefined(aQ)){aQ=C
}return aQ===C||aQ===aO
}function U(){var aS,aU,aR,aQ=YDom.get(aN),aT=YDom.get(t);
if(aQ&&YDom.hasClass(aQ,m)){aS=aQ
}else{if(aT&&YDom.hasClass(aT,m)){aS=aT
}}if(aS){aR=aS.getElementsByTagName("a");
aU=aR[0]?aR[0].getAttribute(D):null
}return aU
}function ay(aU,aR){var aT,aS,aQ;
if(!w(aR)){aS=aU.innerHTML;
aT=YDom.getAttribute(aU,B);
aQ=YDom.getElementsByClassName("sprite-facetsearch","span","nus-filters");
aQ[0].innerHTML=aS;
YDom.setAttribute(aQ[0],B,aT)
}}function V(aR,aS,aY){var aT,aQ,aU,aX,a2,aZ,a1,a0,aV,aW;
aQ=aS.getElementsByTagName("a");
aU=aQ.length;
if(aU>0){for(aW=aU-1;
aW>=0;
--aW){aX=aQ[aW];
a2=aX.getAttribute(an);
if(a2){aZ=aX.parentNode;
if(a2===aR){if(aY){ay(aX,aR)
}YDom.addClass(aZ,m);
a1=aZ;
a0=aZ.parentNode;
if(a0!==aS){aV=YDom.getChildren(aS);
aT=aV[aV.length-2]
}}else{YDom.removeClass(aZ,m)
}}}if(aT){aS.replaceChild(a1,aT);
a0.insertBefore(aT,YDom.getFirstChild(a0))
}}}function ak(){var aQ;
if(!this.refreshAdsEnabled){return
}aQ={success:function(aW){var aT,aX,aV,aU,aR,aS;
aV=LI.domify(aW.responseText);
aT=YDom.getChildren(aV);
aR=aT.length;
if(aR===3){for(aS=0;
aS<aR;
++aS){aU=YDom.get("ad-slot-"+(aS+1));
aX=aT[aS];
if(aU&&aX){aU.innerHTML=aX.innerHTML
}}}},scope:this};
YAHOO.util.Connect.asyncRequest("GET",this.adsUrl,aQ)
}function aJ(aQ){var aR=aQ.getAttribute(ac);
return(aR&&!isNaN(aR))
}function al(aT){var aR,aS,aQ;
aR=YDom.getFirstChild(aT);
if(!aR.getAttribute(ac)){aQ=YDom.getFirstChildBy(aT,aJ);
aS=parseInt(aQ.getAttribute(ac),10);
aR.setAttribute(ac,aS)
}}(function(){LI.NusEvents=new YAHOO.util.EventProvider();
LI.NusEvents.createEvent(aK);
LI.NusEvents.createEvent(q);
LI.NusEvents.createEvent(p);
LI.NusEvents.createEvent(au);
LI.NusEvents.createEvent(aA);
LI.NusEvents.createEvent(ah);
LI.NusEvents.createEvent(ab)
}());
(function(){var aW={},aR=false,aQ,aV,aT,aS,aU=false;
aW[ax]=false;
aW[k]=U();
function aX(aZ,aY){if(aR){LI.NusEvents.fireEvent(q,aZ);
aW[aY]=aZ.newValue;
LI.NusEvents.fireEvent(au,aZ);
aR=false
}}LI.NusParams={remove:function(aY){delete aW[aY]
},get:function(aY){return aW[aY]
},getAll:function(){var aY={};
YAHOO.lang.augmentObject(aY,aW);
return aY
},set:function(aZ,a1){var aY=a1.split("."),a0;
if(aZ===ae||aZ===k){aQ=aW[aZ]
}if(aQ!==a1){aR=true;
aV=aY[0];
aW[aZ]=aY[0]
}if(aY.length===2&&aZ===ae){aT=aZ;
aS=aY[0];
aU=true;
this.set(k,aY[1]);
return
}a0={type:aT,key:aZ,prevValue:aQ,newValue:(aU)?aS+"."+aV:aV};
aU=false;
aX(a0,aZ)
},silentSet:function(aY,aZ){if(aQ!==aZ){aW[aY]=aZ
}}}
}());
(function(){var aR=LI.HistoryManager,aX="orderBy",aQ=LI.NusParams;
function aT(aY){var a0=YEvent.getTarget(aY),aZ=a0.getAttribute(D);
if(aZ!==null){YEvent.preventDefault(aY);
aQ.silentSet(aF,"true");
if(aZ===a){WebTracking.trackUserAction(F)
}else{WebTracking.trackUserAction(g)
}if(!this.historyOn||aR.failed){aQ.set(k,aZ)
}else{if(aI&&LI.NusParams&&LI.NusParams.get(k)!==aZ){aQ.silentSet(ae,C)
}aR.navigate(aX,aZ)
}}}function aW(a0,aZ,a2){var a3=a2.name,a1=aR.getCurrentState(a3),aY;
if(a3===aX&&a1!==aY){aY=YAHOO.util.History.getBookmarkedState(a3);
if(aY!==null){aQ.set(k,a1)
}}}function aV(aY){aQ.set(k,aY)
}function aU(aY){if((aY.key===k)&&w(aY.newValue)){this.toggleSelection(aY.newValue)
}}function aS(aZ,aY){this.el=aZ;
this.historyOn=(aR!==undefined);
this.defaultToRelevance=aY.defaultToRelevance||false;
this.sortDefaultState=this.defaultToRelevance?a:E;
if(this.historyOn){aR.register({name:aX,scope:this,onHistoryStateChange:aV,onHistoryManagerReady:aW,defaultState:this.sortDefaultState})
}YEvent.on(aZ,"click",aT,null,this);
LI.NusEvents.subscribe(au,aU,null,this)
}aS.prototype={toggleSelection:function(aZ){var a0=YDom.get(t),aY=YDom.get(aN);
if(aZ===E){YDom.removeClass(a0,m);
YDom.addClass(aY,m)
}else{if(aZ===a){YDom.removeClass(aY,m);
YDom.addClass(a0,m)
}}this.replaceList()
}};
LI.NusSortMenu=aS
}());
(function(){var aY=LI.HistoryManager,aQ="typeFilter",aS=LI.NusParams;
function aT(aZ){var a1=YEvent.getTarget(aZ),a0=a1.getAttribute(an);
if(a0!==null){YEvent.preventDefault(aZ);
if(YDom.hasClass(a1,"btn")){WebTracking.trackUserAction(aD)
}else{WebTracking.trackUserAction(R+a0)
}if(!this.historyOn||aY.failed){aS.set(ae,a0)
}else{aY.navigate(aQ,a0)
}}else{if(YDom.hasClass(a1,ao)){YEvent.preventDefault(aZ);
WebTracking.trackUserAction(X);
if(!this.historyOn||aY.failed){aS.set(ae,C)
}else{aY.navigate(aQ,C)
}}else{if(YDom.hasClass(a1,ap)||YDom.hasClass(a1.parentNode,ap)){YEvent.preventDefault(aZ)
}}}}function aV(a1,a0,a3){var a4=a3.name,a2=aY.getCurrentState(a4),aZ;
if(a4===aQ){aZ=YAHOO.util.History.getBookmarkedState(a4);
if(null!==aZ){aS.set(ae,a2)
}}}function aU(aZ){aS.set(ae,aZ)
}function aW(aZ){if(aZ.key===ae&&I(aZ.newValue)){aS.set(O,aZ.newValue);
if(this.isCoworkersV2Enabled&&this.isVerifiedEmployee){aS.set(P,this.anetId)
}}if(aZ.key===ae&&I(aZ.prevValue)){aS.remove(O);
if(this.isCoworkersV2Enabled&&this.isVerifiedEmployee){aS.remove(P,this.anetId)
}}}function aX(aZ){if((aZ.key===ae||aZ.type===ae)&&!w(aZ.newValue)&&aZ.key!==aF){this.toggleSelection(aZ.newValue)
}}function aR(a0,aZ){this.el=a0;
this.isTabbedFiltersEnabled=aZ.isTabbedFiltersEnabled||false;
this.isCoworkersV2Enabled=aZ.isCoworkersV2Enabled||false;
this.isVerifiedEmployee=aZ.isVerifiedEmployee||false;
this.isNewRealTimeUX=aZ.isNewRealTimeUX;
this.anetId=aZ.anetId||0;
this.historyOn=(aY!==undefined);
this.filterDefaultState=C;
this.tabbedFiltersWrapper=null;
this.activeIndex=0;
if(this.historyOn){aY.register({name:aQ,scope:this,onHistoryStateChange:aU,onHistoryManagerReady:aV,defaultState:this.filterDefaultState})
}YEvent.on(a0,"click",aT,null,this);
LI.NusEvents.subscribe(q,aW,null,this);
LI.NusEvents.subscribe(au,aX,null,this)
}aR.prototype={getSelectedFilterIndex:function(a3){var a1,aZ=0,a4=a3.parentNode,a0=YDom.getChildren(a4),a2=a0.length;
for(a1=0;
a1<a2;
a1++){if(a0[a1]===a3){aZ=a1;
break
}}return aZ
},setSelectedClass:function(){var aZ=0,a0;
if(!YAHOO.lang.isObject(this.tabbedFiltersWrapper)){this.tabbedFiltersWrapper=YDom.get(s)
}a0=YDom.getElementsByClassName(m,"li",this.tabbedFiltersWrapper);
if(a0.length>0){aZ=this.getSelectedFilterIndex(a0[0]);
YDom.replaceClass(this.tabbedFiltersWrapper,aw+this.activeIndex,aw+aZ);
this.activeIndex=aZ
}},toggleSelection:function(a0){var a1=YDom.getElementsByClassName(d,ai,this.el),aZ,a2;
if(a1.length>0){aZ=a1[0];
V(a0,aZ,this.isNewRealTimeUX);
a2=YDom.getElementsByClassName(Q,"div",aZ);
if(a2.length>0){YDom.removeClass(a2[0],T)
}if(this.isTabbedFiltersEnabled){this.setSelectedClass()
}}}};
LI.NusFilterMenu=aR
}());
(function(){function aR(aU){return !!aU.getAttribute(J)
}function aS(aU){var aW=YEvent.getTarget(aU),aX=aR(aW),aV;
if(!aX){aW=YDom.getAncestorBy(aW,aR)
}if(aW){aV=aW.getAttribute(J);
if(aV){aT(aV)
}}}function aT(aU){YAHOO.util.Connect.asyncRequest("GET",aU,function(){})
}function aQ(aV,aU){YEvent.on(aV,"click",aS)
}LI.NusTracking=aQ
}());
(function(){function aS(aT){if(aT.key===k||aT.key===ae){this.replaceList()
}}function aR(aT,aU){al(this.feedListEl)
}function aQ(aU,aT){this.el=aU;
this.adsUrl=aT.adsUrl||"";
this.refreshAdsEnabled=aT.refreshAdsEnabled||false;
this.feedItemsUrl=aT.feedItemsUrl||"";
this.uscpItemsUrl=aT.uscpItemsUrl||"";
this.uscpItemsMyUpdatesUrl=aT.uscpItemsMyUpdatesUrl||"";
this.isTodayPromoEnabled=aT.isTodayPromoEnabled||false;
this.isTabbedFiltersEnabled=aT.isTabbedFiltersEnabled||false;
this.isCoworkersV2Enabled=aT.isCoworkersV2Enabled||false;
this.isVerifiedEmployee=aT.isVerifiedEmployee||false;
this.anetId=aT.anetId||0;
this.isTodayFeedEnabled=aT.isTodayFeedEnabled||false;
this.isUSCPSortingEnabled=aT.isUSCPSortingEnabled||false;
this.isUSCPTimeSortingEnabled=aT.isUSCPTimeSortingEnabled||false;
L=this.isUSCPSortingEnabled||this.isUSCPTimeSortingEnabled;
aI=((this.isUSCPSortingEnabled&&!this.isUSCPTimeSortingEnabled)||(!this.isUSCPSortingEnabled&&this.isUSCPTimeSortingEnabled));
this.feedWrapperEl=YDom.get(n);
this.feedListEl=YDom.getElementsByClassName(y,ai,this.feedWrapperEl)[0];
this.todayNewsContainer=null;
this.defaultGhostLabel="";
this.ghostLabelForCoworkers="";
this.visibilityValue="EVERYONE";
this.isShareBoxHidden=false;
this.isCoworkerFilterSelected=false;
if(!this.feedListEl){return
}if(this.isTodayPromoEnabled){this.todayNewsContainer=YDom.get(aj);
this.manageTodayModule()
}LI.NusEvents.subscribe(au,aS,null,this);
LI.NusEvents.subscribe(aK,ak,null,this);
if(LI.NusInjection){LI.NusInjection.injectEvent.subscribe(aR,null,this)
}if(this.isCoworkersV2Enabled&&this.isVerifiedEmployee){LI.StyledDropdown.itemSelectEvent.subscribe(this._setVisibilityToCoworkers,this,true)
}LI.Dialog().submitEvent.subscribe(function(aX,aW){var aV=aW[2];
if(aV&&aV.onSubmitTrackingUrl){YAHOO.util.Connect.asyncRequest("GET",aV.onSubmitTrackingUrl,function(){})
}});
if(LI.NusTracking){LI.NusTracking(aU,aT)
}}aQ.prototype={getTypeFilter:function(){return LI.NusParams.get(ae)
},hideProcessingOverlay:function(){var aT=this.mask;
if(aT){aT.hide()
}},replaceList:function(){function aZ(a2){a2.innerHTML='<li class="'+aa+'">'+LI.i18n.get("Nus-no-updates")+' <button class="btn-link '+ao+'">'+LI.i18n.get("Nus-click-to-see-all")+"</button></li>"
}var aW=this.feedListEl,aY=LI.NusParams.getAll(),aV={},aU=[aV,aY,ax,k],a1=aY[ae],aT,aX,a0={success:function(a4){var a3=a4.responseText,a2={hasErrors:false,hasResults:false,selectedFilter:a1};
LI.NusEvents.fireEvent(p);
if(this.isTodayPromoEnabled){aX=this.todayNewsContainer;
if(YDom.inDocument(aX)){this.todayNewsContainer=aW.removeChild(aX)
}}if(a3){if(LI.isFullPage(a3)){aZ(aW);
a2.hasErrors=true
}else{aW.innerHTML=a3;
LI.Controls.parseFragment(aW);
LI.showAllDeferredImg(aW);
if(af(this.isUSCPSortingEnabled,this.isUSCPTimeSortingEnabled,aV.orderBy)){this._swapFilterMenu(a1)
}}a2.hasResults=true
}else{if(a1&&a1!==C){aZ(aW)
}}if(!L&&window.li!==undefined&&li.NMPTodayFeed&&a1!==ar){li.NMPTodayFeed.hideFeed()
}if(this.isTodayPromoEnabled&&(YAHOO.lang.isUndefined(a1)||(a1===C))){this.manageTodayModule()
}if(this.isTabbedFiltersEnabled){this.toggleShareBoxVisibility(a1);
if(this.isVerifiedEmployee){this.manageSharingOptions(a1)
}}this.hideProcessingOverlay();
LI.NusEvents.fireEvent(aK);
LI.NusEvents.fireEvent(ah,a2)
},failure:function(a2){aZ(aW)
},scope:this};
if(aY[aF]){aU.push(aF)
}if(I(aY[O])){aU.push(O);
if(this.isCoworkersV2Enabled&&this.isVerifiedEmployee){aU.push(P)
}}else{aU.push(ae)
}YAHOO.lang.augmentObject.apply(this,aU);
aV=aC(aV);
if(aV.orderBy){(function(){var a2=aV.orderBy.split(".");
aV.orderBy=a2[a2.length-1]
}())
}if(af(this.isUSCPSortingEnabled,this.isUSCPTimeSortingEnabled,aV.orderBy)){aT=(a1===ag)?LI.addParams(this.uscpItemsMyUpdatesUrl,aV):LI.addParams(this.uscpItemsUrl,aV)
}else{aT=LI.addParams(this.feedItemsUrl,aV)
}if(!L&&(this.isTodayFeedEnabled&&aY[ae]===ar)){if(this.isTabbedFiltersEnabled){this.toggleShareBoxVisibility(a1)
}if(aY[ae]===ar&&li.NMPTodayFeed.triggerTodayFilterClick){li.NMPTodayFeed.triggerTodayFilterClick()
}}else{this.showProcessingOverlay();
LI.NusEvents.fireEvent(ab);
YAHOO.util.Connect.asyncRequest("GET",aT,a0)
}},showProcessingOverlay:function(){var aT=this.mask;
if(!aT){aT=new LI.ProcessingOverlay(this.el);
this.mask=aT
}aT.show()
},manageSharingOptions:function(aY){var aX,aV,aW,aT,aU;
if(this.isCoworkerFilterSelected||aY===aO){if(!aE){aE=YDom.get(av)
}aX=YDom.get(aq);
aW=YDom.getElementsByClassName(N,at,aX)[0];
aV=LI.Controls.getControl(aW,H);
aT=LI.Controls.getControl(z,u);
aU=YDom.getElementsByClassName(Y,at,aX)[0];
if(YAHOO.lang.isObject(aV)&&YAHOO.lang.isObject(aT)){if(this.defaultGhostLabel===""||this.ghostLabelForCoworkers===""){this.defaultGhostLabel=aT.getLabel();
this.ghostLabelForCoworkers=LI.i18n.get("GhostLabelForCoworkersPost")
}if(aY===aO){YDom.addClass(aE,aP);
aV.setSelectedValue(this.anetId);
aV.disableDropdown();
aT.setLabel(this.ghostLabelForCoworkers);
aT.updateLabel();
if(YAHOO.lang.isObject(aU)){LI.hide(aU)
}this.isCoworkerFilterSelected=true
}else{YDom.removeClass(aE,aP);
aV.setSelectedValue(this.visibilityValue);
aV.enableDropdown();
aT.setLabel(this.defaultGhostLabel);
aT.updateLabel();
if(YAHOO.lang.isObject(aU)){LI.show(aU)
}this.isCoworkerFilterSelected=false
}}}},manageTodayModule:function(){var aW,aV,aU=this.todayNewsContainer,aT=!YDom.inDocument(aU);
if(YAHOO.lang.isNull(aU)){return
}aW=YDom.getElementsByClassName(ad,"li",this.feedListEl)[0];
if(aW&&aW.id===aj){aW=YDom.getNextSibling(aW)
}if(!aW&&aT){this.feedListEl.appendChild(aU)
}else{aV=parseInt(aW.getAttribute(ac),10);
aU.setAttribute(ac,aV);
if(aT){YDom.insertBefore(aU,aW)
}}},toggleShareBoxVisibility:function(aW){var aV=YDom.get(l),aU=aB(aW),aT=this.isShareBoxHidden?true:false;
if(!YAHOO.lang.isObject(aV)){return
}if(aT&&aU){LI.show(aV);
this.isShareBoxHidden=false
}else{if(!aT&&!aU){LI.hide(aV);
this.isShareBoxHidden=true
}}},_setVisibilityToCoworkers:function(aX,aV){var aT=this,aU=aV[0],aZ=aV[1],aW=LI.NusParams.getAll(),aY=aW[ae];
if(aU==="share-visibility-selector"&&(aY===aO)&&(aZ.value!==aT.anetId)){setTimeout(function(){aT.manageSharingOptions(aO)
},10)
}},_swapFilterMenu:function(a2){var aZ=YDom.getElementsByClassName(d,ai,aG),a1=YDom.getElementsByClassName(c,"li"),aV,aT,aU,aW,aY,a0,aX;
if(aZ.length>0&&a1.length>0){aZ=aZ[0];
a1=a1[0];
aT=aZ.parentNode;
aV=YDom.getElementsByClassName(d,ai,a1);
if(aV.length>0){V(a2,aV[0]);
aT.removeChild(aZ);
aT.appendChild(aV[0]);
a1.parentNode.removeChild(a1);
if(a2===ag){aU=aV[0].getElementsByTagName("a");
aW=aU.length;
for(aX=aW-1;
aX>=0;
--aX){aY=aU[aX];
a0=aY.getAttribute(an);
if(a0===ag){ay(aY,ag);
break
}}}}}}};
LI.Nus=aQ
}());
(function(){var aR="nusInfPag-noMore",a0="nusInfPag-showMoreClick",aT="nusInfiniteScroll";
function aQ(){WebTracking.trackUserAction(aR)
}function aZ(){WebTracking.trackUserAction(a0);
if(window.COMSCORE){COMSCORE.beacon({c1:2,c2:6402952,c3:"",c4:"",c5:"",c6:"",c15:""})
}}function aY(){WebTracking.trackUserAction(aT);
if(window.COMSCORE){COMSCORE.beacon({c1:2,c2:6402952,c3:"",c4:"",c5:"",c6:"",c15:""})
}}function aX(){var a6,a5,a7,a9,a4,a8;
a6=YDom.getChildren(this.el);
a5=a6[a6.length-1];
a7=a5.getAttribute(A)!=="_";
a9=YDom.get(G);
if(a7){this.disableParam(r)
}a8=this.infinitePagination.getRequestMade();
if(a9&&a8>0){a4=a9.src;
a9.src=a4
}LI.NusEvents.fireEvent(aK)
}function aS(){var a4,a6=LI.NusParams.getAll(),a7={},a5=[a7,a6,ax,k];
if(af(this.isUSCPSortingEnabled,this.isUSCPTimeSortingEnabled,a6.orderBy)&&this.uscpConfig){this.config=this.uscpConfig;
if(this.uscpItemsMyUpdatesUrl&&b(a6.filterType)){this.config.url=this.uscpItemsMyUpdatesUrl
}}else{this.config=this.signalConfig
}a4=new LI.InfinitePagination(this.el,this.config);
if(I(a6[O])){a5.push(O);
if(a6[O]===aO){a5.push(P)
}}else{a5.push(ae)
}YAHOO.lang.augmentObject.apply(this,a5);
a7=aC(a7);
a4.addParams(a7);
a4.triggerClickEvent.subscribe(aZ);
a4.triggerScrollEvent.subscribe(aY);
a4.noMoreResultsEvent.subscribe(aQ);
a4.addedToListEvent.subscribe(aV);
a4.fetchEvent.subscribe(aX,null,this);
return a4
}function aV(){var a4=LI.Controls.getControl(aH,Z);
if(!a4){return false
}a4.togglePosition()
}function aU(a4,a5){if(a5===ah||(a5===au&&(a4.newValue==="NEWS.Time"||a4.newValue==="Relevance"))){if(this.infinitePagination){this.infinitePagination.hideNoMoreResultsEl();
this.infinitePagination.disableTriggers();
this.infinitePagination.destroy()
}if((!a4.hasErrors&&a4.hasResults)||(a4.newValue==="NEWS.Time"||a4.newValue==="Relevance")){this.infinitePagination=aS.call(this);
this.infinitePagination.enableTriggers()
}}}function aW(){this.infinitePagination.disableTriggers()
}function a3(){this.infinitePagination.enableTriggers()
}var a1=_.once(function(a4){if(window.track&&window.track.errors){window.track.errors.push({code:window.track.errors.codes.HP_STREAM_SERVER_ERROR,message:a4.statusText||""})
}});
function a2(ba,a8){var a5=a8.isUSCPSortingEnabled||false,a9=a8.isUSCPTimeSortingEnabled||false,a4=a8.originUUIDEnabled||false,a6={originUUIDEnabled:a4},a7={i18n:{noMoreResults:LI.i18n.get("Nus-no-more-updates")},enableInfiniteScroll:a8.enableInfiniteScroll};
this.uscpBackfillUrl=a8.uscpBackfillUrl;
signalConfig=YAHOO.lang.merge(a7,{url:a8.url,attributes:[{urlParam:az,attribute:A},{urlParam:S,attribute:aL},{urlParam:e,attribute:r},{urlParam:K,attribute:i}],infiniteScrollStopThreshold:a8.infiniteScrollStopThreshold||""});
if(a5||a9){a6=YAHOO.lang.merge(a7,{originUUIDEnabled:a4,url:a8.uscpUrl,attributes:[{urlParam:W,attribute:aM},{urlParam:e,attribute:r},{urlParam:K,attribute:v}],infiniteScrollStopThreshold:a8.infiniteScrollStopThreshold||""})
}this.el=ba;
this.config=null;
this.isUSCPSortingEnabled=a5;
this.isUSCPTimeSortingEnabled=a9;
this.uscpConfig=a6;
this.signalConfig=signalConfig;
this.uscpItemsMyUpdatesUrl=a8.uscpItemsMyUpdatesUrl||"";
LI.NusEvents.subscribe(ah,aU,ah,this);
LI.NusEvents.subscribe(au,aU,au,this);
LI.NusEvents.subscribe(ab,aW,null,this);
LI.NusEvents.subscribe(ah,a3,null,this);
this.infinitePagination=aS.call(this);
if(this.uscpBackfillUrl){this._backfillUscp()
}}a2.prototype={disableParam:function(a6){var a5,a4;
a4=this.infinitePagination.attributes.length;
for(a5=0;
a5<a4;
++a5){if(this.infinitePagination.attributes[a5].attribute===a6){this.infinitePagination.attributes[a5].notRequired=true
}}},_backfillUscp:function(){var a5=this,a4=this.infinitePagination,a6=a4.url;
setTimeout(function(){var a8=a4.callback,a7=a8&&_.bind(a8.failure,a4);
if(a7){a4.callback.failure=function(a9){a7(a9);
a1(a9)
}
}a8.timeout=3000;
a4.url=a5.uscpBackfillUrl;
a4.fetchMoreResults();
a4.url=a6
},50)
}};
LI.NusInfinitePagination=a2
}());
(function(){var aW="realTimeTest",aX="nusRealTime-click";
function aS(){WebTracking.trackUserAction(aX)
}function aV(aY,a6,a3){var a5=a6[0],a4=a6[1],a1=a5.length,a0=(a1<10),a2,aZ;
for(a2=0;
a2<a1;
++a2){aZ=a5[a2];
LI.showAllDeferredImg(aZ);
if(a0){LI.highlight(aZ)
}}al(a4);
LI.NusEvents.fireEvent(aK)
}function aU(aY,aZ){LI.NusEvents.fireEvent.apply(LI.NusEvents,[aA].concat(aZ))
}function aR(){var a3={},a1,a0=LI.NusParams.getAll(),aZ=[a3,a0,ax,ae,k],a2=a0[O]||"",aY=a0[k]||"";
if(this.realTimeResults){this.realTimeResults.destroy()
}if((a2&&o(a2))||(!this.config.isFeedKatificationEnabled&&aY===a)){a1=null
}else{this.config.sortType=aY;
a1=new LI.RealTimeResults(this.el,this.config);
a3[aW]="C";
YAHOO.lang.augmentObject.apply(this,aZ);
a3[k]=E;
a3=aC(a3);
a1.addParams(a3);
a1.notificationClickEvent.subscribe(aS);
a1.resultsInsertedEvent.subscribe(aV);
a1.pollSuccessEvent.subscribe(aU,null,this)
}return a1
}function aQ(){var aY=aR.call(this);
if(aY){aY.start()
}this.realTimeResults=aY
}function aT(aZ,aY){this.realTimeResultsOn=aY.realTimeResultsOn||false;
if(this.realTimeResultsOn){this.el=aZ;
this.config={method:"GET",url:aY.url,fetchUrl:aY.fetchUrl,uscpUrl:aY.uscpUrl,uscpFetchUrl:aY.uscpFetchUrl,realTimeMaxDisplay:aY.realTimeMaxDisplay,dateUrlParam:"queryAfter",dateAttribute:ac,i18n:{newResult:aY.isNewRealTimeUX?LI.i18n.get("Nus-see-new-update"):LI.i18n.get("Nus-new-result"),newResults:aY.isNewRealTimeUX?LI.i18n.get("Nus-see-new-updates"):LI.i18n.get("Nus-new-results"),newResultsMax:aY.isNewRealTimeUX?LI.i18n.get("Nus-see-new-updates-max"):LI.i18n.get("Nus-new-results")},isNewRealTimeUX:aY.isNewRealTimeUX,progressivePoll:aY.progressivePoll||false,isFeedKatificationEnabled:aY.isFeedKatificationEnabled,interval:function(a0){return 1000*Math.pow(1.3,a0)+20000*(a0+1)
},originUUIDEnabled:aY.originUUIDEnabled||false};
this.realTimeResults=aR.call(this);
LI.NusEvents.subscribe(ah,aQ,null,this)
}}LI.NusRealTimeResults=aT
}());
(function(){var a6,aS,a1,a9=false,a8,a5,aV=265,aU=2,aT;
function aR(bb,ba){a6=a7(bb,"jymbii-carousel");
aS=YDom.getElementsByClassName("carousel-wheel","ul",bb)[0];
a1=YDom.getElementsByClassName("carousel-item","li",aS);
a8=a1.length;
a5=a8-aU;
aY();
YEvent.on(bb,"click",aQ);
YEvent.on(bb,"mouseover",a3);
YEvent.on(bb,"mouseout",aX)
}function aY(){if(a5<=0){a2()
}aU=(a5>1)?2:1;
aT=aV*aU
}function a2(){var ba=YDom.getElementsByClassName("next","div",a6)[0];
YDom.addClass(ba,"disabled");
a9=true
}function a7(bc,bb){var ba;
if(YDom.hasClass(bc,bb)){ba=bc
}else{ba=YDom.getAncestorByClassName(bc,bb)
}return ba
}function a0(ba){return a7(ba,"carousel-item")
}function aW(ba){return a7(ba,"carousel-wheel")
}function a4(ba){YDom.addClass(ba,"hidden")
}function aZ(ba){var bb;
if(!a9){bb=parseInt(aS.style.left,10)||0;
bb-=aT;
aS.style.left=bb+"px";
a5-=aU
}aY()
}function a3(bc){var bb=YEvent.getTarget(bc),ba=a0(bb);
if(ba){YDom.addClass(ba,"active")
}if(YDom.hasClass(bb,"remove-button")||YDom.hasClass(bb,"next")){YDom.addClass(bb,"active")
}}function aX(bc){var bb=YEvent.getTarget(bc),ba=a0(bb);
if(ba){YDom.removeClass(ba,"active")
}if(YDom.hasClass(bb,"remove-button")||YDom.hasClass(bb,"next")){YDom.removeClass(bb,"active")
}}function aQ(bc){var bb,ba;
bb=YEvent.getTarget(bc);
if(YDom.hasClass(bb,"remove-button")){YEvent.preventDefault(bc);
ba=a0(bb);
a4(ba);
a5--;
aY()
}else{if(YDom.hasClass(bb,"next")){YEvent.preventDefault(bc);
aZ(aS)
}}}LI.NusJYMBIICarousel=aR
}())
}());LI.define("TodayModuleCarousel");
LI.TodayModuleCarousel=(function(){var e={scrollerContainer:".scroller",triggerContainer:".trigger",itemClass:"item",delay:300},h=new YUtil.Scroll(document.body,{scroll:{to:[0,0]}},0.4,YUtil.Easing.easeOut),o=YAHOO.lang,p=0,c="tod-home-",d,m,j,k;
function b(r){if(r&&window.WebTracking){WebTracking.trackUserAction(c+r)
}}function f(s,r){if(YDom.hasClass(s,r)){return s
}else{return YDom.getAncestorByClassName(s,r)
}}function n(r){h.stop();
h.attributes.scroll.to=[r.offsetLeft-p,0];
h.animate()
}function g(t){var s=Y$(".current",d,true),r=LI.indexOf(j,t),u=k[r];
YDom.removeClass(s,"current");
YDom.addClass(t,"current");
if(u){n(u);
b("activate-"+r)
}}function q(u,t){var s,r;
e=o.merge(e,t);
d=u;
s=Y$(e.scrollerContainer,d,true);
r=Y$(e.triggerContainer,d,true);
p=s.offsetLeft;
j=Y$("."+e.itemClass,r);
k=Y$("."+e.itemClass,s);
h.setEl(s.parentNode);
g(j[0]);
YEvent.on(j,"mouseover",a);
YEvent.on(r,"click",l)
}function a(s){var t=YEvent.getTarget(s),r=f(t,e.itemClass);
if(r){YEvent.on(r,"mouseout",i);
m=setTimeout(function(){e.delay=100;
g(r);
YEvent.removeListener(r,"mouseout",i)
},e.delay)
}}function i(r){clearTimeout(m)
}function l(s){var t=YEvent.getTarget(s),r=f(t,e.itemClass);
if(r&&!YDom.hasClass(r,"current")){g(r);
YEvent.preventDefault(s)
}}return q
}());