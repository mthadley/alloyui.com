/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("button-plugin",function(c,b){function a(d){a.superclass.constructor.apply(this,arguments);}c.extend(a,c.ButtonCore,{_afterNodeGet:function(e){var d=this.constructor.ATTRS,f=d[e]&&d[e].getter&&this[d[e].getter];if(f){return new c.Do.AlterReturn("get "+e,f.call(this));}},_afterNodeSet:function(e,g){var d=this.constructor.ATTRS,f=d[e]&&d[e].setter&&this[d[e].setter];if(f){f.call(this,g);}},_initNode:function(d){var e=d.host;this._host=e;c.Do.after(this._afterNodeGet,e,"get",this);c.Do.after(this._afterNodeSet,e,"set",this);},destroy:function(){}},{ATTRS:c.merge(c.ButtonCore.ATTRS),NAME:"buttonPlugin",NS:"button"});a.createNode=function(f,d){var e;if(f&&!d){if(!(f.nodeType||f.getDOMNode||typeof f=="string")){d=f;f=d.srcNode;}}d=d||{};e=d.template||c.Plugin.Button.prototype.TEMPLATE;f=f||d.srcNode||c.DOM.create(e);return c.one(f).plug(c.Plugin.Button,d);};c.namespace("Plugin").Button=a;},"3.7.1pr1",{"requires":["button-core","cssbutton","node-pluginhost"]});