!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var i=document.getElementById("taskList"),o=document.getElementById("searchInput"),r=document.getElementById("searchButton"),c=document.getElementById("status"),l=document.getElementById("priority"),u=document.getElementById("createButton"),d=document.getElementById("createNewItemModal"),a=document.getElementById("newItemTitle"),s=document.getElementById("newItemDescription"),m=document.getElementById("newItemPriority"),v=document.getElementById("submitButton"),p=document.getElementById("cancelButton"),f=document.getElementById("editItemModal"),y=document.getElementById("editItemTitle"),I=document.getElementById("editItemDescription"),E=document.getElementById("editItemPriority"),g=document.getElementById("editSubmitButton"),b=document.getElementById("editCancelButton"),k=[];function B(){d.style.display="none"}function h(e){for(var t=0;t<e.length;++t){var n=e[t];x(n.title,n.description,n.priority,n.id)}}function L(){for(;i.childElementCount>0;)i.removeChild(i.querySelector(".taskItem, .taskItemDone"))}function A(e){f.style.display="block";var t=k[e],n=t.title,i=t.description,o=t.priority;y.value=n,I.value=i,E.value=o,g.addEventListener("click",(function(){var t=y.value,r=I.value,c=E.value;t===n&&r===i&&c===o||(!function(e,t,n,i){k[i].title=e,k[i].description=t,k[i].priority=n}(t,r,c,e),L(),h(k),f.style.display="none")}))}function x(e,t,n,o){var r="".concat(o),c=document.createElement("div");c.innerHTML='<div class="task-item-title">\n                        <p>'.concat(e,'</p>\n                      </div>\n                      <div class="task-item-description">\n                        <p>').concat(t,'</p>\n                      </div>\n                      <div class="task-item-priority">\n                        <p>').concat(n,'</p>\n                      </div>\n                      <div class="task-item-more">\n                        <button class="dropbtn">...</button>\n                        <div class="task-item-more-content">\n                        </div>\n                      </div>\n                      <div class="checkbox-checked">\n                      </div> \n                '),"open"===k[r].status?c.setAttribute("class","taskItem"):c.setAttribute("class","taskItemDone"),c.setAttribute("id","taskItem_".concat(o)),i.appendChild(c);var l=document.querySelector("#taskItem_".concat(o," .task-item-more-content")),u=document.createElement("a");u.setAttribute("href","#"),u.setAttribute("class","completeButton"),u.innerText="done",u.addEventListener("click",(function(){k[r].status="done",document.querySelector("#taskItem_".concat(o)).setAttribute("class","taskItemDone")})),l.appendChild(u);var d=document.createElement("a");d.setAttribute("href","#"),d.setAttribute("class","editButton"),d.innerText="edit",d.addEventListener("click",(function(){A(r)})),l.appendChild(d);var a=document.createElement("a");a.setAttribute("href","#"),a.setAttribute("class","deleteButton"),a.innerText="delete",a.addEventListener("click",(function(){k.splice(r,1),function(){for(var e=0;e<k.length;e++)k[e].id=e}(),L(),h(k)})),l.appendChild(a)}function S(){event.preventDefault();var e=o.value,t=l.value,n=c.value;if(""===e&&"all"===t&&"all"===n)return L(),void h(k);if(0!==k.length){for(var i=[],r=0;r<k.length;++r){var u=k[r];u.title.includes(e)&&("all"!==t&&u.priority!==t||"all"!==n&&u.status!==n||i.push(u))}L(),h(i),i=[]}}u.onclick=function(){d.style.display="block"},p.onclick=B,b.onclick=function(){f.style.display="none"},v.addEventListener("click",(function(e){e.preventDefault();var t=a.value,n=m.value,i=s.value,o=k.length;t&&n&&(k.push({title:t,description:i,priority:n,id:o,status:"open"}),x(t,i,n,o)),B(),a.value="",s.value="",m.value="high"})),r.addEventListener("click",S),o.addEventListener("keyup",(function(e){e.preventDefault(),"Enter"===e.key&&S()})),c.addEventListener("change",S),l.addEventListener("change",S)}]);