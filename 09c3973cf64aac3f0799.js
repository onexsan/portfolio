(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{388:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"block-item__container"},[s("div",{staticClass:"item__visuals"},[s("div",{staticClass:"item__thumb"},[s("img",{staticClass:"project__image",staticStyle:{"object-fit":"cover","object-position":"center"},attrs:{src:t.workPhoto(t.work.photo)}})]),s("projects-tags",{attrs:{techs:t.work.techs}})],1),s("div",{staticClass:"projects__item-content"},[s("div",{staticClass:"item__info"},[s("h4",{staticClass:"item__name"},[t._v(t._s(t.work.title))]),s("div",{staticClass:"item__desc"},[s("p",[t._v(t._s(t.work.description))])]),s("div",{staticClass:"item__link"},[s("a",{staticClass:"project-link",attrs:{href:t.work.link}},[s("p",[t._v(t._s(t.work.link))])])])]),s("div",{staticClass:"item__controls"},[s("button",{staticClass:"edit-btn",attrs:{type:"button"},on:{click:t.editWork}},[s("p",[t._v("Править")]),s("div",{staticClass:"edit-btn__icon"})]),s("button",{staticClass:"discard-btn",attrs:{type:"button"},on:{click:function(e){return t.deleteThisWork(t.work.id)}}},[s("p",[t._v("Удалить")]),s("div",{staticClass:"discard-btn__icon"})])])])])};i._withStripped=!0;var o=s(93);function r(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var c={components:{projectsTags:function(){return s.e(3).then(s.bind(null,393))}},props:{work:Object},methods:function(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?Object(arguments[e]):{},i=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(s).filter(function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable}))),i.forEach(function(e){r(t,e,s[e])})}return t}({},Object(o.b)("works",["deleteWork"]),Object(o.b)("tooltip",["showTooltip"]),{workPhoto:function(t){return"https://webdev-api.loftschool.com/".concat(t)},editWork:function(){this.$emit("editWork",this.work)},deleteThisWork:function(t){try{this.deleteWork(t),this.showTooltip({type:"success",message:"Работа успешно удалена"})}catch(t){var e=t.message;this.showTooltip({type:"error",message:e})}}})},n=(s(360),s(92)),a=Object(n.a)(c,i,[],!1,null,null,null);a.options.__file="src/admin/pages/projects/projects-item.vue";e.default=a.exports}}]);