/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("base-core",function(a){var f=a.Object,j=a.Lang,i=".",m="initialized",e="destroyed",c="initializer",d="value",b=Object.prototype.constructor,k="deep",n="shallow",l="destructor",h=a.AttributeCore,g=function(u,t,q){var v;for(v in t){if(q[v]){u[v]=t[v];}}return u;};function o(p){if(!this._BaseInvoked){this._BaseInvoked=true;this._initBase(p);}}o._ATTR_CFG=h._ATTR_CFG.concat("cloneDefaultValue");o._ATTR_CFG_HASH=a.Array.hash(o._ATTR_CFG);o._NON_ATTRS_CFG=["plugins"];o.NAME="baseCore";o.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};o.prototype={_initBase:function(p){a.stamp(this);this._initAttribute(p);var q=a.Plugin&&a.Plugin.Host;if(this._initPlugins&&q){q.call(this);}if(this._lazyAddAttrs!==false){this._lazyAddAttrs=true;}this.name=this.constructor.NAME;this.init.apply(this,arguments);},_initAttribute:function(){h.apply(this);},init:function(p){this._baseInit(p);return this;},_baseInit:function(p){this._initHierarchy(p);if(this._initPlugins){this._initPlugins(p);}this._set(m,true);},destroy:function(){this._baseDestroy();return this;},_baseDestroy:function(){if(this._destroyPlugins){this._destroyPlugins();}this._destroyHierarchy();this._set(e,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(t,q){var r=null,p,s=t.ATTRS;if(s){for(p in s){if(q[p]){r=r||{};r[p]=q[p];q[p]=null;}}}return r;},_filterAdHocAttrs:function(s,q){var r,t=this._nonAttrs,p;if(q){r={};for(p in q){if(!s[p]&&!t[p]&&q.hasOwnProperty(p)){r[p]={value:q[p]};}}}return r;},_initHierarchyData:function(){var v=this.constructor,s,p,t,u=(this._allowAdHocAttrs)?{}:null,r=[],q=[];while(v){r[r.length]=v;if(v.ATTRS){q[q.length]=v.ATTRS;}if(this._allowAdHocAttrs){t=v._NON_ATTRS_CFG;if(t){for(s=0,p=t.length;s<p;s++){u[t[s]]=true;}}}v=v.superclass?v.superclass.constructor:null;}this._classes=r;this._nonAttrs=u;this._attrs=this._aggregateAttrs(q);},_attrCfgHash:function(){return o._ATTR_CFG_HASH;},_aggregateAttrs:function(x){var t,y,s,q,z,r,w,v=this._attrCfgHash(),p,u={};if(x){for(r=x.length-1;r>=0;--r){y=x[r];for(t in y){if(y.hasOwnProperty(t)){s=g({},y[t],v);q=s.value;w=s.cloneDefaultValue;if(q){if((w===undefined&&(b===q.constructor||j.isArray(q)))||w===k||w===true){s.value=a.clone(q);}else{if(w===n){s.value=a.merge(q);}}}z=null;if(t.indexOf(i)!==-1){z=t.split(i);t=z.shift();}p=u[t];if(z&&p&&p.value){f.setValue(p.value,z,q);}else{if(!z){if(!p){u[t]=s;}else{if(p.valueFn&&d in s){p.valueFn=null;}g(p,s,v);}}}}}}}return u;},_initHierarchy:function(v){var r=this._lazyAddAttrs,w,y,A,t,q,z,u,s=this._getClasses(),p=this._getAttrCfgs(),x=s.length-1;for(A=x;A>=0;A--){w=s[A];y=w.prototype;u=w._yuibuild&&w._yuibuild.exts;if(u){for(t=0,q=u.length;t<q;t++){u[t].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(w,p),v,r);if(this._allowAdHocAttrs&&A===x){this.addAttrs(this._filterAdHocAttrs(p,v),v,r);}if(y.hasOwnProperty(c)){y.initializer.apply(this,arguments);}if(u){for(t=0;t<q;t++){z=u[t].prototype;if(z.hasOwnProperty(c)){z.initializer.apply(this,arguments);}}}}},_destroyHierarchy:function(){var t,u,x,v,r,p,s,w,q=this._getClasses();for(x=0,v=q.length;x<v;x++){t=q[x];u=t.prototype;s=t._yuibuild&&t._yuibuild.exts;if(s){for(r=0,p=s.length;r<p;r++){w=s[r].prototype;if(w.hasOwnProperty(l)){w.destructor.apply(this,arguments);}}}if(u.hasOwnProperty(l)){u.destructor.apply(this,arguments);}}},toString:function(){return this.name+"["+a.stamp(this,true)+"]";}};a.mix(o,h,false,null,1);o.prototype.constructor=o;a.BaseCore=o;},"3.7.1pr1",{requires:["attribute-core"]});