YEvent.onDOMReady(function(){var a=Y$("[data-jsenabled=check]"),e,g,c=0,b=a.length;
for(;
c<b;
c++){e=a[c];
g=Y$("input[name=isJsEnabled]",e);
if(g.length===1){g[0].value="true"
}YEvent.on(e,"submit",function(){var l,m,k,j,i,h;
if(Y$("#session_key-login",e).length>0){i=Y$("#session_key-login")[0].value
}else{if(Y$("input[name=email]",e).length>0){i=Y$("input[name=email]",e,true).value
}else{i=""
}}l=Date.now();
m=d().join(":");
k=i+":"+m;
if(window.jsRandomCalculator){j=window.jsRandomCalculator.compute(m,i,l);
h=window.jsRandomCalculator.version
}else{j="";
h=""
}f("client_ts",l,e);
f("client_r",k,e);
f("client_n",m,e);
f("client_output",j,e);
f("client_v",h,e)
})
}function d(){var h=[],j;
for(j=0;
j<3;
j++){h[j]=Math.floor(Math.random()*900000000)+100000000
}return h
}function f(i,k,j){var h=Y$("input[name="+i+"]",j,true);
if(h){h.value=k
}else{h=document.createElement("input");
h.setAttribute("type","hidden");
h.setAttribute("name",i);
h.setAttribute("value",k);
j.appendChild(h)
}}});