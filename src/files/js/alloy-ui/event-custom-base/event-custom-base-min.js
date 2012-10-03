/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("event-custom-base",function(c){c.Env.evt={handles:{},plugins:{}};var l=0,e=1,k={objs:null,before:function(w,y,z,A){var x=w,v;if(A){v=[w,A].concat(c.Array(arguments,4,true));x=c.rbind.apply(c,v);}return this._inject(l,x,y,z);},after:function(w,y,z,A){var x=w,v;if(A){v=[w,A].concat(c.Array(arguments,4,true));x=c.rbind.apply(c,v);}return this._inject(e,x,y,z);},_inject:function(v,x,y,A){var B=c.stamp(y),z,w;if(!y._yuiaop){y._yuiaop={};}z=y._yuiaop;if(!z[A]){z[A]=new c.Do.Method(y,A);y[A]=function(){return z[A].exec.apply(z[A],arguments);};}w=B+c.stamp(x)+A;z[A].register(w,x,v);return new c.EventHandle(z[A],w);},detach:function(v){if(v.detach){v.detach();}},_unload:function(w,v){}};c.Do=k;k.Method=function(v,w){this.obj=v;this.methodName=w;this.method=v[w];this.before={};this.after={};};k.Method.prototype.register=function(w,x,v){if(v){this.after[w]=x;}else{this.before[w]=x;}};k.Method.prototype._delete=function(v){delete this.before[v];delete this.after[v];};k.Method.prototype.exec=function(){var x=c.Array(arguments,0,true),y,w,B,z=this.before,v=this.after,A=false;for(y in z){if(z.hasOwnProperty(y)){w=z[y].apply(this.obj,x);if(w){switch(w.constructor){case k.Halt:return w.retVal;case k.AlterArgs:x=w.newArgs;break;case k.Prevent:A=true;break;default:}}}}if(!A){w=this.method.apply(this.obj,x);}k.originalRetVal=w;k.currentRetVal=w;for(y in v){if(v.hasOwnProperty(y)){B=v[y].apply(this.obj,x);if(B&&B.constructor==k.Halt){return B.retVal;}else{if(B&&B.constructor==k.AlterReturn){w=B.newRetVal;k.currentRetVal=w;}}}}return w;};k.AlterArgs=function(w,v){this.msg=w;this.newArgs=v;};k.AlterReturn=function(w,v){this.msg=w;this.newRetVal=v;};k.Halt=function(w,v){this.msg=w;this.retVal=v;};k.Prevent=function(v){this.msg=v;};k.Error=k.Halt;var i=c.Array,s="after",b=["broadcast","monitored","bubbles","context","contextFn","currentTarget","defaultFn","defaultTargetOnly","details","emitFacade","fireOnce","async","host","preventable","preventedFn","queuable","silent","stoppedFn","target","type"],d=i.hash(b),r=Array.prototype.slice,j=9,f="yui:log",a=function(x,w,v){var y;for(y in w){if(d[y]&&(v||!(y in x))){x[y]=w[y];}}return x;};c.CustomEvent=function(v,w){this._kds=c.CustomEvent.keepDeprecatedSubs;w=w||{};this.id=c.stamp(this);this.type=v;this.context=c;this.logSystem=(v==f);this.silent=this.logSystem;if(this._kds){this.subscribers={};}this._subscribers=[];if(this._kds){this.afters={};}this._afters=[];this.preventable=true;this.bubbles=true;this.signature=j;this.applyConfig(w,true);};c.CustomEvent.keepDeprecatedSubs=false;c.CustomEvent.mixConfigs=a;c.CustomEvent.prototype={constructor:c.CustomEvent,hasSubs:function(v){var y=this._subscribers.length,w=this._afters.length,x=this.sibling;if(x){y+=x._subscribers.length;w+=x._afters.length;}if(v){return(v=="after")?w:y;}return(y+w);},monitor:function(x){this.monitored=true;var w=this.id+"|"+this.type+"_"+x,v=r.call(arguments,0);v[0]=w;return this.host.on.apply(this.host,v);},getSubs:function(){var x=this._subscribers,v=this._afters,w=this.sibling;x=(w)?x.concat(w._subscribers):x.concat();v=(w)?v.concat(w._afters):v.concat();return[x,v];},applyConfig:function(w,v){a(this,w,v);},_on:function(z,x,w,v){var y=new c.Subscriber(z,x,w,v);if(this.fireOnce&&this.fired){if(this.async){setTimeout(c.bind(this._notify,this,y,this.firedWith),0);}else{this._notify(y,this.firedWith);}}if(v==s){this._afters.push(y);}else{this._subscribers.push(y);}if(this._kds){if(v==s){this.afters[y.id]=y;}else{this.subscribers[y.id]=y;}}return new c.EventHandle(this,y);},subscribe:function(x,w){var v=(arguments.length>2)?r.call(arguments,2):null;return this._on(x,w,v,true);},on:function(x,w){var v=(arguments.length>2)?r.call(arguments,2):null;if(this.monitored&&this.host){this.host._monitor("attach",this,{args:arguments});}return this._on(x,w,v,true);},after:function(x,w){var v=(arguments.length>2)?r.call(arguments,2):null;return this._on(x,w,v,s);},detach:function(z,x){if(z&&z.detach){return z.detach();}var w,y,A=0,v=this._subscribers,B=this._afters;for(w=v.length;w>=0;w--){y=v[w];if(y&&(!z||z===y.fn)){this._delete(y,v,w);A++;}}for(w=B.length;w>=0;w--){y=B[w];if(y&&(!z||z===y.fn)){this._delete(y,B,w);A++;}}return A;},unsubscribe:function(){return this.detach.apply(this,arguments);},_notify:function(y,x,v){var w;w=y.notify(x,this);if(false===w||this.stopped>1){return false;}return true;},log:function(w,v){},fire:function(){if(this.fireOnce&&this.fired){return true;}else{var v=r.call(arguments,0);this.fired=true;if(this.fireOnce){this.firedWith=v;}if(this.emitFacade){return this.fireComplex(v);}else{return this.fireSimple(v);}}},fireSimple:function(v){this.stopped=0;this.prevented=0;if(this.hasSubs()){var w=this.getSubs();this._procSubs(w[0],v);this._procSubs(w[1],v);}this._broadcast(v);return this.stopped?false:true;},fireComplex:function(v){v[0]=v[0]||{};return this.fireSimple(v);},_procSubs:function(z,x,v){var A,y,w;for(y=0,w=z.length;y<w;y++){A=z[y];if(A&&A.fn){if(false===this._notify(A,x,v)){this.stopped=2;}if(this.stopped==2){return false;}}}return true;},_broadcast:function(w){if(!this.stopped&&this.broadcast){var v=w.concat();v.unshift(this.type);if(this.host!==c){c.fire.apply(c,v);}if(this.broadcast==2){c.Global.fire.apply(c.Global,v);}}},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},detachAll:function(){return this.detach();},_delete:function(y,x,w){var v=y._when;if(!x){x=(v===s)?this._afters:this._subscribers;w=i.indexOf(x,y,0);}if(y&&x[w]===y){x.splice(w,1);}if(this._kds){if(v===s){delete this.afters[y.id];}else{delete this.subscribers[y.id];}}if(this.monitored&&this.host){this.host._monitor("detach",this,{ce:this,sub:y});}if(y){y.deleted=true;}}};c.Subscriber=function(y,x,w,v){this.fn=y;this.context=x;this.id=c.stamp(this);this.args=w;this._when=v;};c.Subscriber.prototype={constructor:c.Subscriber,_notify:function(z,x,y){if(this.deleted&&!this.postponed){if(this.postponed){delete this.fn;delete this.context;}else{delete this.postponed;return null;}}var v=this.args,w;
switch(y.signature){case 0:w=this.fn.call(z,y.type,x,z);break;case 1:w=this.fn.call(z,x[0]||null,z);break;default:if(v||x){x=x||[];v=(v)?x.concat(v):x;w=this.fn.apply(z,v);}else{w=this.fn.call(z);}}if(this.once){y._delete(this);}return w;},notify:function(w,y){var z=this.context,v=true;if(!z){z=(y.contextFn)?y.contextFn():y.context;}if(c.config&&c.config.throwFail){v=this._notify(z,w,y);}else{try{v=this._notify(z,w,y);}catch(x){c.error(this+" failed: "+x.message,x);}}return v;},contains:function(w,v){if(v){return((this.fn==w)&&this.context==v);}else{return(this.fn==w);}},valueOf:function(){return this.id;}};c.EventHandle=function(v,w){this.evt=v;this.sub=w;};c.EventHandle.prototype={batch:function(v,w){v.call(w||this,this);if(c.Lang.isArray(this.evt)){c.Array.each(this.evt,function(x){x.batch.call(w||x,v);});}},detach:function(){var v=this.evt,x=0,w;if(v){if(c.Lang.isArray(v)){for(w=0;w<v.length;w++){x+=v[w].detach();}}else{v._delete(this.sub);x=1;}}return x;},monitor:function(v){return this.evt.monitor.apply(this.evt,arguments);}};var h=c.Lang,u=":",t="|",g="~AFTER~",o=/(.*?)(:)(.*?)/,q=c.cached(function(v){return v.replace(o,"*$2$3");}),m=c.cached(function(v,w){if(!w||(typeof v!=="string")||v.indexOf(u)>-1){return v;}return w+u+v;}),n=c.cached(function(x,z){var w=x,y,A,v;if(!h.isString(w)){return w;}v=w.indexOf(g);if(v>-1){A=true;w=w.substr(g.length);}v=w.indexOf(t);if(v>-1){y=w.substr(0,(v));w=w.substr(v+1);if(w=="*"){w=null;}}return[y,(z)?m(w,z):w,A,w];}),p=function(v){var w=(h.isObject(v))?v:{};this._yuievt=this._yuievt||{id:c.guid(),events:{},targets:{},config:w,chain:("chain" in w)?w.chain:c.config.chain,bubbling:false,defaults:{context:w.context||this,host:this,emitFacade:w.emitFacade,fireOnce:w.fireOnce,queuable:w.queuable,monitored:w.monitored,broadcast:w.broadcast,defaultTargetOnly:w.defaultTargetOnly,bubbles:("bubbles" in w)?w.bubbles:true}};};p.prototype={constructor:p,once:function(){var v=this.on.apply(this,arguments);v.batch(function(w){if(w.sub){w.sub.once=true;}});return v;},onceAfter:function(){var v=this.after.apply(this,arguments);v.batch(function(w){if(w.sub){w.sub.once=true;}});return v;},parseType:function(v,w){return n(v,w||this._yuievt.config.prefix);},on:function(z,F,x){var C=this._yuievt,J=n(z,C.config.prefix),K,L,w,O,H,G,M,B=c.Env.evt.handles,y,v,D,N=c.Node,I,E,A;this._monitor("attach",J[1],{args:arguments,category:J[0],after:J[2]});if(h.isObject(z)){if(h.isFunction(z)){return c.Do.before.apply(c.Do,arguments);}K=F;L=x;w=r.call(arguments,0);O=[];if(h.isArray(z)){A=true;}y=z._after;delete z._after;c.each(z,function(R,Q){if(h.isObject(R)){K=R.fn||((h.isFunction(R))?R:K);L=R.context||L;}var P=(y)?g:"";w[0]=P+((A)?R:Q);w[1]=K;w[2]=L;O.push(this.on.apply(this,w));},this);return(C.chain)?this:new c.EventHandle(O);}G=J[0];y=J[2];D=J[3];if(N&&c.instanceOf(this,N)&&(D in N.DOM_EVENTS)){w=r.call(arguments,0);w.splice(2,0,N.getDOMNode(this));return c.on.apply(c,w);}z=J[1];if(c.instanceOf(this,YUI)){v=c.Env.evt.plugins[z];w=r.call(arguments,0);w[0]=D;if(N){I=w[2];if(c.instanceOf(I,c.NodeList)){I=c.NodeList.getDOMNodes(I);}else{if(c.instanceOf(I,N)){I=N.getDOMNode(I);}}E=(D in N.DOM_EVENTS);if(E){w[2]=I;}}if(v){M=v.on.apply(c,w);}else{if((!z)||E){M=c.Event._attach(w);}}}if(!M){H=C.events[z]||this.publish(z);M=H._on(F,x,(arguments.length>3)?r.call(arguments,3):null,(y)?"after":true);}if(G){B[G]=B[G]||{};B[G][z]=B[G][z]||[];B[G][z].push(M);}return(C.chain)?this:M;},subscribe:function(){return this.on.apply(this,arguments);},detach:function(E,G,v){var K=this._yuievt.events,z,B=c.Node,I=B&&(c.instanceOf(this,B));if(!E&&(this!==c)){for(z in K){if(K.hasOwnProperty(z)){K[z].detach(G,v);}}if(I){c.Event.purgeElement(B.getDOMNode(this));}return this;}var y=n(E,this._yuievt.config.prefix),D=h.isArray(y)?y[0]:null,L=(y)?y[3]:null,A,H=c.Env.evt.handles,J,F,C,x,w=function(Q,O,P){var N=Q[O],R,M;if(N){for(M=N.length-1;M>=0;--M){R=N[M].evt;if(R.host===P||R.el===P){N[M].detach();}}}};if(D){F=H[D];E=y[1];J=(I)?c.Node.getDOMNode(this):this;if(F){if(E){w(F,E,J);}else{for(z in F){if(F.hasOwnProperty(z)){w(F,z,J);}}}return this;}}else{if(h.isObject(E)&&E.detach){E.detach();return this;}else{if(I&&((!L)||(L in B.DOM_EVENTS))){C=r.call(arguments,0);C[2]=B.getDOMNode(this);c.detach.apply(c,C);return this;}}}A=c.Env.evt.plugins[L];if(c.instanceOf(this,YUI)){C=r.call(arguments,0);if(A&&A.detach){A.detach.apply(c,C);return this;}else{if(!E||(!A&&B&&(E in B.DOM_EVENTS))){C[0]=E;c.Event.detach.apply(c.Event,C);return this;}}}x=K[y[1]];if(x){x.detach(G,v);}return this;},unsubscribe:function(){return this.detach.apply(this,arguments);},detachAll:function(v){return this.detach(v);},unsubscribeAll:function(){return this.detachAll.apply(this,arguments);},publish:function(x,y){var w,C,v,B,A=this._yuievt,z=A.config.prefix;if(h.isObject(x)){v={};c.each(x,function(E,D){v[D]=this.publish(D,E||y);},this);return v;}x=(z)?m(x,z):x;w=A.events;C=w[x];this._monitor("publish",x,{args:arguments});if(C){if(y){C.applyConfig(y,true);}}else{B=A.defaults;C=new c.CustomEvent(x,B);if(y){C.applyConfig(y,true);}w[x]=C;}return w[x];},_monitor:function(z,v,A){var x,y,w;if(v){if(typeof v==="string"){w=v;y=this.getEvent(v,true);}else{y=v;w=v.type;}if((this._yuievt.config.monitored&&(!y||y.monitored))||(y&&y.monitored)){x=w+"_"+z;A.monitored=z;this.fire.call(this,x,A);}}},fire:function(B){var D=h.isString(B),C=(D)?B:(B&&B.type),y=this._yuievt,x=y.config.prefix,v,z,w,A=(D)?r.call(arguments,1):arguments;C=(x)?m(C,x):C;v=this.getEvent(C,true);w=this.getSibling(C,v);if(w&&!v){v=this.publish(C);}this._monitor("fire",(v||C),{args:A});if(!v){if(y.hasTargets){return this.bubble({type:C},A,this);}z=true;}else{v.sibling=w;z=v.fire.apply(v,A);}return(y.chain)?this:z;},getSibling:function(v,x){var w;if(v.indexOf(u)>-1){v=q(v);w=this.getEvent(v,true);if(w){w.applyConfig(x);w.bubbles=false;w.broadcast=0;}}return w;},getEvent:function(w,v){var y,x;if(!v){y=this._yuievt.config.prefix;w=(y)?m(w,y):w;}x=this._yuievt.events;return x[w]||null;},after:function(x,w){var v=r.call(arguments,0);
switch(h.type(x)){case"function":return c.Do.after.apply(c.Do,arguments);case"array":case"object":v[0]._after=true;break;default:v[0]=g+x;}return this.on.apply(this,v);},before:function(){return this.on.apply(this,arguments);}};c.EventTarget=p;c.mix(c,p.prototype);p.call(c,{bubbles:false});YUI.Env.globalEvents=YUI.Env.globalEvents||new p();c.Global=YUI.Env.globalEvents;},"3.7.1pr1",{requires:["oop"]});