LI.define("TreasuryNmp");
LI.TreasuryNmp=function(c,b){var d="treasury-open-item",a;
a=LI.TREASURY_CONF=b;
YAHOO.util.Get.css(LI.TreasuryNmpDependencies.treasuryCSS);
YAHOO.util.Get.script(LI.TreasuryNmpDependencies.treasuryJS);
$(document).on("click",'a[href*="mediaId"]',function(j){var h=$(this),f=unescape(h.attr("href")),g=f&&f.match(/mediaId=(\d+)/),i=g&&g[1],k,l,i;
if(i){k=f.match(/id=(\d+)/);
l=k&&k[1]&&parseInt(k[1],10);
a.url.post_view_event=a.url.post_view_event.replace("_ownerId",l);
a.isNmp=true;
a.selfView=(l===a.sessionId);
a.memberId=l;
h.attr("data-event-id",d);
h.attr("data-item-id",i);
LI.Events.fire(d,h);
j.preventDefault()
}})
};