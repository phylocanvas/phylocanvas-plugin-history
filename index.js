!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("PhyloCanvas"));else if("function"==typeof define&&define.amd)define(["PhyloCanvas"],t);else{var n=t("object"==typeof exports?require("PhyloCanvas"):e.PhyloCanvas);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e){e(this,"createTree",function(e,t){var n=e.apply(void 0,r(t)),i=a(t,2),o=i[1],s=void 0===o?{}:o;if(s.history||"undefined"==typeof s.history){var l=s.history&&"undefined"!=typeof s.history.collapsed;n.historySnapshots=[],n.history=new y(n,l?s.history.collapsed:!0)}return n}),e(l.Tree,"resizeToContainer",function(e){return this.history?void this.history.resizeTree():e.apply(this)}),this.History=y}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(l){i=!0,o=l}finally{try{!r&&s["return"]&&s["return"]()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t["default"]=o;var l=n(1),c=n(2),d=c.dom.addClass,u=c.dom.hasClass,h=c.dom.removeClass,p=c.events.fireEvent,f=c.events.addEvent,v=c.events.killEvent,y=function(){function e(t,n){i(this,e),this.tree=t,this.injectCss(),this.div=this.createDiv(t.containerElement),this.tree.addListener("subtree",function(e){this.addSnapshot(e.node)}.bind(this)),this.tree.addListener("loaded",this.reset.bind(this)),this.tree.addListener("typechanged",function(){this.addSnapshot(this.tree.root.id)}.bind(this)),n?this.collapse():this.expand()}return s(e,[{key:"reset",value:function(){this.clear(),this.tree.drawn&&this.addSnapshot(this.tree.root.id)}},{key:"collapse",value:function(){d(this.div,"collapsed"),this.toggleDiv.firstChild.data=">",this.resizeTree(),this.tree.draw()}},{key:"expand",value:function(){h(this.div,"collapsed"),this.toggleDiv.firstChild.data="<",this.resizeTree(),this.tree.draw()}},{key:"isCollapsed",value:function(){return u(this.div,"collapsed")}},{key:"toggle",value:function(){this.isCollapsed()?this.expand():this.collapse(),p(this.tree.containerElement,"historytoggle",{isOpen:!this.isCollapsed()})}},{key:"createDiv",value:function(e){var t=document.createElement("div");t.className="pc-history",f(t,"click",v),f(t,"contextmenu",v);var n=document.createElement("div");n.innerHTML="History",n.className="pc-history-title",t.appendChild(n);var r=document.createElement("div");r.appendChild(document.createTextNode("<")),r.className="toggle",f(r,"click",this.toggle.bind(this)),t.appendChild(r),this.toggleDiv=r;var i=document.createElement("ul");return i.className="pc-history-snapshots",t.appendChild(i),this.snapshotList=i,e.appendChild(t),t}},{key:"resizeTree",value:function(){var e=this.tree;this.width=this.div.offsetWidth,e.setSize(e.containerElement.offsetWidth-this.width,e.containerElement.offsetHeight),this.isCollapsed()?e.containerElement.getElementsByTagName("canvas")[0].style.marginLeft=this.width+"px":e.containerElement.getElementsByTagName("canvas")[0].style.marginLeft="20%"}},{key:"addSnapshot",value:function(e){var t="phylocanvas-history-",n=this.tree.treeType,r=!1;if(this.tree.historySnapshots.forEach(function(i){i.style.background="transparent",i.id===t+e&&i.getAttribute("data-tree-type")===n&&(r=!0,i.style.background="lightblue")}),!r){var i=this.tree.getPngUrl(),o=document.createElement("li"),a=document.createElement("img");a.width=this.width,a.src=i,a.id=t+e,a.setAttribute("data-tree-type",this.tree.treeType),a.style.background="lightblue",this.tree.historySnapshots.push(a),o.appendChild(a),this.snapshotList.appendChild(o),f(a,"click",this.goBackTo.bind(this))}}},{key:"clear",value:function(){for(var e=this.snapshotList.getElementsByTagName("li"),t=e.length;t--;)this.snapshotList.removeChild(e[0])}},{key:"goBackTo",value:function(e){var t=e.target;this.tree.setTreeType(t.getAttribute("data-tree-type"),!0),this.tree.redrawFromBranch(this.tree.originalTree.branches[t.id.replace("phylocanvas-history-","")])}},{key:"injectCss",value:function(){var e=".pc-history { position: absolute; top: 0; bottom: 0; left: 0; box-sizing: border-box; width: 20%; overflow: hidden; background: #EEE }.pc-history .pc-history-title { box-sizing: border-box; height: 20px; text-align: center; font-size: 13px; color: #666; padding: 2px; border-bottom: 1px solid #bbb }.pc-history .toggle { position: absolute; top: 0; right: 0; padding: 2px 8px; cursor: pointer; border-top-left-radius: 50%; border-bottom-left-radius: 50%; background-color: #666; color: #FFF; box-sizing: border-box; height: 20px; }.pc-history.collapsed .toggle { border-radius: 0 50% 50% 0 }.pc-history .toggle:hover { background-color: #FFF; color: #CCC }.pc-history.collapsed { width: 25px }.pc-history.collapsed .pc-history-snapshots { display: none }.pc-history.collapsed .pc-history-title { writing-mode: sideways-rl; -webkit-writing-mode: vertical-rl; margin-top: 30px; background: 0 0; color: #666; letter-spacing: 1.2px; border-bottom: none }.pc-history-snapshots { position: absolute; top: 20px; bottom: 0; margin: 0; padding: 0; overflow-x: hidden; overflow-y: scroll; }.pc-history-snapshots li { list-style: outside none none }.pc-history img { border: 0px solid #CCC; border-top-width: 1px; cursor: pointer; width: 100%; box-sizing: border-box; transition: background-color .25s ease; display: block }.pc-history img:hover { background-color: #fff }",t=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),t.appendChild(n)}}]),e}();e.exports=t["default"]},function(t,n){t.exports=e},function(e,t,n){"use strict";!function(t,n){e.exports=n()}(void 0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=r(i),a=n(4),s=r(a),l=n(2),c=r(l),d=n(3),u=r(d);t["default"]={canvas:o,constants:s,dom:c,events:u},e.exports=t["default"]},function(e,t,n){function r(e){return e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||1}function i(e){return(window.devicePixelRatio||1)/r(e)}function o(e){return e=e-l.getX(this.canvas.canvas)+window.pageXOffset,e*=i(this.canvas),e-=this.canvas.canvas.width/2,e-=this.offsetx,e/=this.zoom}function a(e){return e=e-l.getY(this.canvas.canvas)+window.pageYOffset,e*=i(this.canvas),e-=this.canvas.canvas.height/2,e-=this.offsety,e/=this.zoom}function s(e,t,n){return[o.call(n,e),a.call(n,t)]}Object.defineProperty(t,"__esModule",{value:!0}),t.getBackingStorePixelRatio=r,t.getPixelRatio=i,t.translateClick=s;var l=n(2)},function(e,t,n){function r(e){var t=new Blob([e],{type:"text/csv;charset=utf-8"});return u.createObjectURL(t)}function i(e,t){var n=document.createElement("a"),r="undefined"!=typeof n.download;n.href=e,n.target="_blank",r&&(n.download=t),d.fireEvent(n,"click"),r&&u.revokeObjectURL(n.href)}function o(e){for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;return t}function a(e){for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;return t}function s(e,t){var n=e.className.split(" ");-1===n.indexOf(t)&&(n.push(t),e.className=n.join(" "))}function l(e,t){var n=e.className.split(" "),r=n.indexOf(t);-1!==r&&(n.splice(r,1),e.className=n.join(" "))}function c(e,t){var n=e.className.split(" "),r=n.indexOf(t);return-1!==r}Object.defineProperty(t,"__esModule",{value:!0}),t.createBlobUrl=r,t.setupDownloadLink=i,t.getX=o,t.getY=a,t.addClass=s,t.removeClass=l,t.hasClass=c;var d=n(3),u=window.URL||window.webkitURL},function(e,t){function n(e){return e.preventDefault(),!1}function r(e,t){var n,r,i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t),n.eventName=t;for(r in i)i.hasOwnProperty(r)&&(n[r]=i[r]);document.createEvent?e.dispatchEvent(n):e.fireEvent("on"+n.eventType,n)}function i(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,function(){return n.call(e,window.event)})}function o(e){e.stopPropagation(),e.preventDefault()}function a(e,t){var n;return n="string"==typeof t?function(n){return e[t]?e[t](n):void 0}:function(){return t(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.preventDefault=n,t.fireEvent=r,t.addEvent=i,t.killEvent=o,t.createHandler=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n={FORTYFIVE:Math.PI/4,QUARTER:Math.PI/2,HALF:Math.PI,FULL:2*Math.PI};t.Angles=n;var r={x:"star",s:"square",o:"circle",t:"triangle"};t.Shapes=r}])})}])});