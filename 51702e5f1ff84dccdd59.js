(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{393:function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ul",{staticClass:"project-form__tags"},t._l(t.tags,function(s,n){return e("li",{key:s,staticClass:"project-tags__item"},[e("p",[t._v(t._s(s))]),t.tagButton?e("button",{staticClass:"project-tags__icon",attrs:{type:"button"},on:{click:function(s){return t.delTag(n)}}}):t._e()])}),0)};n._withStripped=!0;var a={props:["techs","tagButton"],data:function(){return{tags:Object}},methods:{delTag:function(t){this.tags.splice(t,1),this.$emit("updateTag",this.tags.join(","))}},created:function(){this.techs.length>0&&(this.tags=this.techs.split(","))},watch:{techs:function(){this.tags=this.techs.split(",")}}},i=(e(360),e(92)),c=Object(i.a)(a,n,[],!1,null,null,null);c.options.__file="src/admin/pages/projects/projects-tags.vue";s.default=c.exports}}]);