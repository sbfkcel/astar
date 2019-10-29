/*! Project:astar, Create:FWS 2019.10.29 15:21, Update:FWS 2019.10.29 15:48 */ 
!function(){"use strict";var t=function(t){return document.getElementById(t)},e=function(t){return t.split(",").map(Number)};(new(function(){function a(){this._drawText=function(t,e,a,n,i){var r=this,o=r.option,p=o.lineSize,l=o.spotSize,d=new PIXI.Container,s={fontFamily:"Arial",fontSize:16,fill:0,align:"left"},h=3*p;return t=new PIXI.Text(t,s),e=new PIXI.Text(e,s),a=new PIXI.Text(a,s),n=n*(l+p)+p,i=i*(l+p)+p,t.x=h,t.y=h,e.x=h,e.y=l-e.height-h+2,a.y=l-a.height-h+2,a.x=l-a.width-h,d.addChild(t),d.addChild(e),d.addChild(a),d.x=n,d.y=i,d};var t=this;t.option={lineSize:4},t.taskData={},t.backObj={text:{},path:undefined,highlight:undefined,graph:{}},t.domBox=document.getElementById("app"),t.domResult=document.getElementById("result"),t.domBox.oncontextmenu=function(t){return t.preventDefault(),!1},t.timer}return a.prototype.init=function(){var t=this;t.setOption(),t.createApp()},a.prototype.getCurrentTaskData=function(){var t=this,e=t.option;return t.taskData[[e.col,e.row]]},a.prototype.setOption=function(){for(var e=this,a=["grid","obstacle","rightAngle","speed","optimalResult"],n=e.option,i={},r=function(t,a){switch(t){case"grid":var i=a.split(",").map(Number),r=n.lineSize,o=void 0,p=void 0,l=void 0;o=n.col=i[0],p=n.row=i[1],e.taskData[[o,p]]=e.getCurrentTaskData()||{start:undefined,end:undefined,obstacle:undefined,list:[]},l=40===i[0]?n.spotSize=48:n.spotSize=96,n.canvasW=(l+r)*o+r,n.canvasH=(l+r)*p+r;break;case"obstacle":n[t]=+a,e.map&&(e.getCurrentTaskData().obstacle=e.map.obstacle(n.obstacle,1));break;case"speed":n[t]=+a;break;case"optimalResult":case"rightAngle":n[t]=!!+a}},o=0,p=a.length;o<p;o++)!function(n,o){var p=a[n];i[p]=t(p);var l=localStorage.getItem(p);l&&(i[p].value=l),r(p,l||i[p].value),i[p].onchange=function(){localStorage.setItem(p,this.value),r(p,this.value),e.clearDraw(),"grid"===p?e.createApp():e.drawInit()}}(o)},a.prototype.createApp=function(){var t=this,e=t.option;t.app&&t.domBox.removeChild(t.app.view),t.app=new PIXI.Application({width:e.canvasW,height:e.canvasH,antialias:!0,backgroundColor:14540253}),t.app.view.style.width="1002px",t.app.view.style.height="602px",t.domBox.appendChild(t.app.view);var a=t.pixiGroup={event:new PIXI.display.Group(6,!0),text:new PIXI.display.Group(5,!0),startEnd:new PIXI.display.Group(4,!0),path:new PIXI.display.Group(3,!0),highlight:new PIXI.display.Group(2,!0),graph:new PIXI.display.Group(1,!0),background:new PIXI.display.Group(0,!0)},n=t.pixiContainer={event:new PIXI.Container,text:new PIXI.Container,startEnd:new PIXI.Container,path:new PIXI.Container,highlight:new PIXI.Container,graph:new PIXI.Container,background:new PIXI.Container};t.app.stage=new PIXI.display.Stage,t.app.stage.sortableChildren=!0;for(var i in a)t.app.stage.addChild(new PIXI.display.Layer(a[i]));for(var i in n)t.app.stage.addChild(n[i]);t.drawInit()},a.prototype.render=function(t){var e=this,a=e.x,n=e.y,i=e.type,r={},o=t.option,p=t.taskData[[o.col,o.row]];if(i)switch(i){case"start":case"end":p[i]=[a,n];break;default:r[i]=[a,n]}Object.keys(r).length&&p.list.push(r)},a.prototype.drawInit=function(){var t=this,a=t.option,n=t.map=new Grid({col:a.col,row:a.row,render:function(){t.render.call(this,t)}}),i=t.getCurrentTaskData(),r=i.obstacle,o=i.start||[0,0],p=i.end||[a.col-1,a.row-1];if(r)for(var l in r)l=e(l),n.set(l,"value",1);else t.getCurrentTaskData().obstacle=n.obstacle(t.option.obstacle,1);var d=t.astar=new Astar(n),s=d.search(o,p,{rightAngle:t.option.rightAngle,optimalResult:t.option.optimalResult}),h=s?s.map(function(t){return"["+t+"]"}):"No result";t.domResult.innerHTML=h,t.domResult.className=s?"result":"result result--notResult",t.drawEventAndBackground(),t.drawStartEnd(),t.drawTask()},a.prototype.clearDraw=function(){var t=this,e=(t.option,t.pixiContainer);t.getCurrentTaskData().list=[],t.timer&&clearTimeout(t.timer);for(var a in e){var n=e[a];n.removeChildren(0,n.children.length)}},a.prototype.drawEventAndBackground=function(){for(var t=this,e=t.map,a=e.grid,n=t.getCurrentTaskData(),i=n.obstacle,r=0,o=a.length;r<o;r++)for(var p=a[r],l=0,d=p.length;l<d;l++){var s=p[l],h=s.x,u=s.y,c=0===s.value?16777215:0,g=void 0,w=void 0;g=t._drawSquare(c,h,u),g.parentGroup=t.pixiGroup.background,t.pixiContainer.background.addChild(g),w=t._drawSquare(c,h,u),w.xy=[h,u],w.interactive=!0,w.cursor="pointer",w.alpha=0,w.parentGroup=t.pixiGroup.event,t.pixiContainer.event.addChild(w),w.mousedown=function(e){n.start=n.end,n.end=this.xy,t.clearDraw(),t.drawInit()},w.rightdown=function(e){null===i[this.xy]?delete i[this.xy]:i[this.xy]===undefined&&(i[this.xy]=null),t.clearDraw(),t.drawInit()}}},a.prototype.drawStartEnd=function(){var t=this,e=t.getCurrentTaskData();[e.start,e.end].forEach(function(e,a){var n=a?32767:16711680,i=e[0],r=e[1],o=t._drawRound(n,i,r);o.parentGroup=t.pixiGroup.startEnd,t.pixiContainer.startEnd.addChild(o)})},a.prototype.drawTask=function(){var t,e,a=this,n=a.option,i=a.getCurrentTaskData().list,r=a.astar,o=a.backObj,p=a.pixiContainer,l=a.pixiGroup;(e=function(d){if((t=i.length)>d){var s=i[d],h=function(){for(var t in s){var i=s[t],h=i[0],u=i[1],c=r.grid.get(i),g=void 0,w=void 0,v=void 0,I=void 0,f=void 0;if(i&&"time"!==t)switch("open"!==t&&"update"!==t||20!==n.col||(v=c.f,I=c.g,f=c.h,v&&(o.text[i]&&p.text.removeChild(o.text[i]),w=o.text[i]=a._drawText(v,I,f,h,u),w.parentGroup=l.text,p.text.addChild(w))),t){case"open":case"close":g="open"===t?13959136:60854,o.graph[i]&&p.graph.removeChild(o.graph[i]),w=o.graph[i]=a._drawSquare(g,h,u),w.parentGroup=l.graph,p.graph.addChild(w);break;case"highlight":g=0,o.highlight&&p.highlight.removeChild(o.highlight),w=o.highlight=a._drawBorder(g,h,u),w.parentGroup=l.highlight,p.highlight.addChild(w);var m=r.getBackPath(i);m.length>1&&(g=16776960,o.path&&p.path.removeChild(o.path),w=o.path=a._drawPath(g,m),w.parentGroup=l.path,p.path.addChild(w))}}e(++d)};d<t&&(a.timer=setTimeout(h,n.speed))}})(0)},a.prototype._drawSquare=function(t,e,a){var n=this,i=n.option,r=i.spotSize,o=i.lineSize,p=new PIXI.Graphics;return p.clear(),p.beginFill(t),p.drawRect(e*(r+o)+o,a*(r+o)+o,r,r),p.endFill(),p},a.prototype._drawRound=function(t,e,a){var n=this,i=n.option,r=i.spotSize,o=i.lineSize,p=new PIXI.Graphics,l=r/4,d=r/2+o+e*(r+o),s=r/2+o+a*(r+o);return p.clear(),p.beginFill(t),p.drawCircle(d,s,l),p.endFill(),p},a.prototype._drawBorder=function(t,e,a){var n=this,i=n.option,r=i.spotSize,o=i.lineSize,p=new PIXI.Graphics,l=~~(r/10);return p.clear(),p.lineStyle(l,t,.3,0),p.beginFill(t,0),p.drawRect(e*(r+o)+o,a*(r+o)+o,r,r),p.endFill(),p},a.prototype._drawPath=function(t,e){var a=this,n=a.option,i=n.spotSize,r=n.lineSize,o=n.canvasW,p=n.canvasH,l=i/4,d=l/2,s=document.createElement("canvas"),h=s.getContext("2d"),u=function(t,e,a,n,i){t.beginPath(),t.arc(e,a,n,0,2*Math.PI),t.fillStyle=i,t.fill()};t="#"+t.toString(16),s.width=o,s.height=p,s.style.background="orange",e.forEach(function(a,n){var o=a[0]*i+i/2+a[0]*r+r,p=a[1]*i+i/2+a[1]*r+r;0===n?(u(h,o,p,d,t),h.beginPath(),h.lineWidth=l,h.lineJoin="round",h.strokeStyle=t,h.moveTo(o,p)):h.lineTo(o,p),n===e.length-1&&(h.stroke(),u(h,o,p,d,t))});var c=new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture.fromCanvas(s),new PIXI.Rectangle(0,0,o,p)));return c.alpha=.8,c},a}())).init()}();