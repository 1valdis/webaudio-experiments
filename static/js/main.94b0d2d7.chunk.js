(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(37)},3:function(e){e.exports=[[0,0,0],[0,0,1],[0,0,3],[0,0,4],[0,0,6],[0,0,7],[0,0,9],[0,0,10],[0,0,12],[0,0,13],[0,0,15],[0,0,16],[0,0,18],[0,0,19],[0,0,21],[0,0,22],[0,0,24],[0,0,25],[0,0,26],[0,0,28],[0,0,29],[0,0,31],[0,0,32],[0,0,34],[0,0,35],[0,0,37],[0,0,38],[0,0,40],[0,0,41],[0,0,43],[0,0,44],[0,0,46],[0,0,47],[0,0,49],[0,0,50],[0,0,51],[0,0,53],[0,0,54],[0,0,56],[0,0,57],[0,0,59],[0,0,60],[0,0,62],[0,0,63],[0,0,65],[0,0,66],[0,0,68],[0,0,69],[0,0,71],[0,0,72],[0,0,74],[0,0,75],[0,0,76],[0,0,78],[0,0,79],[0,0,81],[0,0,82],[0,0,84],[0,0,85],[0,0,87],[0,0,88],[0,0,90],[0,0,91],[0,0,93],[0,0,94],[0,0,96],[0,0,97],[0,0,99],[0,0,100],[2,0,101],[4,0,101],[6,0,102],[8,0,102],[10,0,103],[11,0,103],[13,0,104],[15,0,104],[17,0,105],[19,0,105],[21,0,106],[23,0,106],[25,0,107],[27,0,107],[29,0,108],[30,0,108],[32,0,109],[34,0,110],[36,0,110],[38,0,111],[40,0,111],[42,0,112],[44,0,112],[46,0,113],[48,0,113],[49,0,114],[51,0,114],[53,0,115],[57,0,116],[59,0,116],[61,0,117],[63,0,118],[65,0,118],[67,0,119],[68,0,119],[70,0,120],[72,0,120],[74,0,121],[76,0,121],[78,0,122],[80,0,122],[82,0,123],[84,0,123],[86,0,124],[87,0,124],[89,0,125],[91,0,125],[93,0,126],[95,0,127],[97,0,127],[99,0,128],[101,0,128],[103,0,129],[105,0,129],[106,0,130],[108,0,130],[110,0,131],[112,0,131],[114,0,132],[116,0,132],[118,0,133],[120,0,133],[122,0,134],[124,0,135],[125,0,135],[127,0,136],[129,0,136],[131,0,137],[133,0,137],[135,0,138],[137,0,138],[139,0,139],[141,0,139],[143,0,140],[144,0,140],[146,0,141],[148,0,141],[150,0,142],[152,0,142],[154,0,143],[156,4,142],[158,8,142],[160,11,141],[162,15,141],[165,19,140],[165,19,140],[167,23,140],[169,27,139],[171,31,139],[173,34,138],[175,38,137],[177,42,137],[179,46,136],[181,50,136],[183,53,135],[186,57,135],[188,61,134],[190,65,133],[192,69,133],[194,72,132],[194,72,132],[196,76,132],[198,80,131],[200,84,131],[202,88,130],[205,92,130],[207,95,129],[209,99,128],[211,103,128],[213,107,127],[215,111,127],[217,114,126],[219,118,126],[219,118,126],[221,122,125],[223,126,124],[226,130,124],[228,133,123],[230,137,123],[232,141,122],[234,145,122],[236,149,121],[236,149,121],[238,153,121],[240,156,120],[242,160,119],[244,164,119],[247,168,118],[249,172,118],[251,175,117],[253,179,117],[255,183,116],[255,184,119],[255,186,121],[255,187,124],[255,188,126],[255,190,129],[255,191,131],[255,192,134],[255,193,136],[255,195,139],[255,196,141],[255,197,144],[255,199,146],[255,200,149],[255,201,151],[255,203,154],[255,204,156],[255,205,159],[255,207,161],[255,208,164],[255,209,167],[255,210,169],[255,212,172],[255,213,174],[255,214,177],[255,216,179],[255,217,182],[255,218,184],[255,220,187],[255,221,189],[255,222,192],[255,224,194],[255,225,197],[255,226,199],[255,228,202],[255,229,204],[255,230,207],[255,231,210],[255,233,212],[255,234,215],[255,235,217],[255,237,220],[255,238,222],[255,239,225],[255,241,227],[255,242,230],[255,243,232],[255,245,235],[255,246,237],[255,247,240],[255,248,242],[255,250,245],[255,251,247],[255,252,250],[255,254,252],[255,255,255]]},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(11),s=(n(36),n(13)),u=(n(29),n(1)),o=n.n(u),c=n(2),f=n(4),l=n(5),h=n(8),d=n(6),p=n(7),m=(n(31),n(3)),v=(r.PureComponent,r.PureComponent,n(32),function(e){function t(){var e,n;Object(f.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={secondsPerPixel:.02},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.audioBuffer&&this.renderCanvas()}},{key:"renderCanvas",value:function(){var e=Object(c.a)(o.a.mark(function e(){var t,n,r,a,i,s,u,f,l,h,d,p,v,y,x,b,g=this;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.ctx.canvas.width=Math.ceil(this.props.audioBuffer?this.props.audioBuffer.duration/this.state.secondsPerPixel:0),this.ctx.canvas.height=1024,t=new window.OfflineAudioContext(2,this.props.audioBuffer.length,this.props.audioBuffer.sampleRate),(n=t.createBufferSource()).buffer=this.props.audioBuffer,(r=t.createAnalyser()).fftSize=2*this.ctx.canvas.height,r.smoothingTimeConstant=0,n.connect(r),r.connect(t.destination),n.start(),a=Array.from({length:this.ctx.canvas.width},function(e,t){return g.state.secondsPerPixel*t}),i=a.map(function(){var e=Object(c.a)(o.a.mark(function e(n){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.suspend(n);case 2:return a=new Uint8Array(r.frequencyBinCount),r.getByteFrequencyData(a),e.next=6,t.resume();case 6:return e.abrupt("return",a);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),s=t.startRendering(),e.next=16,Promise.all(i);case 16:for(u=e.sent,f=this.ctx.canvas.width,l=this.ctx.canvas.height,h=this.ctx.getImageData(0,0,f,l),d=new ArrayBuffer(h.data.length),p=new Uint8ClampedArray(d),v=new Uint32Array(d),y=0;y<l;++y)for(x=0;x<f;++x)b=u[x][l-y-1],v[y*f+x]=255<<24|m[b][2]<<16|m[b][1]<<8|m[b][0];return h.data.set(p),this.ctx.putImageData(h,0,0),e.next=28,s;case 28:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=Math.min(this.ctx?Math.max(this.props.currentTime/this.state.secondsPerPixel-this.ctx.canvas.parentElement.clientWidth/2,0):0,this.ctx?this.props.audioBuffer.duration/this.state.secondsPerPixel-this.ctx.canvas.parentElement.clientWidth:0);return a.a.createElement("div",{className:"timeline"},a.a.createElement("canvas",{ref:function(t){return e.ctx=t&&t.getContext("2d")},style:{marginLeft:-t}}),a.a.createElement("div",{className:"timelinepointer",style:{left:this.props.currentTime/this.state.secondsPerPixel-t}}))}}]),t}(r.PureComponent)),y=(n(33),function(e){function t(){return Object(f.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"playpause"},a.a.createElement("button",{onClick:this.props.onChange,disabled:this.props.disabled},this.props.isPlaying?"Pause":"Play"))}}]),t}(r.PureComponent)),x=(n(34),function(e){function t(){var e,n;Object(f.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={isWorking:!1},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"audioopener"},a.a.createElement("input",{type:"file",id:"input",accept:"audio/*",onChange:function(t){return e.openFile(t)},disabled:this.state.isWorking}))}},{key:"openFile",value:function(e){var t=this;this.setState({isWorking:!0});var n=new window.FileReader;n.onload=function(){var e=Object(c.a)(o.a.mark(function e(n){var r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.props.audioContext.decodeAudioData(n.target.result);case 2:r=e.sent,t.setState({isWorking:!1}),t.props.onOpen(r);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.readAsArrayBuffer(e.target.files[0])}}]),t}(r.PureComponent)),b=(n(35),function(e){function t(){var e,n;Object(f.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={audioBuffer:null,audioBufferKey:0,currentTime:0,startTime:0,isPlaying:!1},n.audioContext=new window.AudioContext,n.sourceNode=null,n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"player"},a.a.createElement(v,{audioBuffer:this.state.audioBuffer,currentTime:this.state.currentTime,onCurrentTimeChange:this.setTime,key:this.state.audioBufferKey}),a.a.createElement(y,{isPlaying:this.state.isPlaying,onChange:this.state.isPlaying?function(){return e.pause()}:function(){return e.play()},disabled:!this.state.audioBuffer}),a.a.createElement(x,{audioContext:this.audioContext,onOpen:function(t){e.fileOpened(t),e.play()}}))}},{key:"fileOpened",value:function(e){var t=this;this.setState(function(n){return{audioBuffer:e,audioBufferKey:n.audioBufferKey+1,currentTime:0,startTime:t.audioContext.currentTime}},function(){t.state.isPlaying&&t.play()})}},{key:"play",value:function(){var e=Object(c.a)(o.a.mark(function e(){var t,n=this,r=arguments;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.length>0&&void 0!==r[0]?r[0]:this.state.currentTime,this.state.audioBuffer){e.next=3;break}return e.abrupt("return");case 3:if("suspended"!==this.audioContext.state){e.next=6;break}return e.next=6,this.audioContext.resume();case 6:this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode.stop()),this.sourceNode=this.audioContext.createBufferSource(),this.sourceNode.connect(this.audioContext.destination),this.sourceNode.buffer=this.state.audioBuffer,this.sourceNode.start(0,t),this.setState({isPlaying:!0,startTime:this.audioContext.currentTime-t}),requestAnimationFrame(function(){return n.updateCurrentTime()});case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"updateCurrentTime",value:function(){var e=this;this.setState(function(t){return e.state.isPlaying?{currentTime:e.audioContext.currentTime-t.startTime}:{}},function(){return requestAnimationFrame(function(){return e.updateCurrentTime()})})}},{key:"pause",value:function(){var e=Object(c.a)(o.a.mark(function e(){var t=this;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.sourceNode.disconnect(),this.sourceNode.stop(),this.sourceNode=null,this.setState(function(e){return{isPlaying:!1,currentTime:t.audioContext.currentTime-e.startTime}});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),t}(r.PureComponent)),g=function(e){function t(){var e,n;Object(f.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).audioContext=new AudioContext,n.state={working:!1,audioBuffer:null},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(b,null))}},{key:"play",value:function(){var e=Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(this.audioContext.state),"suspended"!==this.audioContext.state){e.next=5;break}return e.next=4,this.audioContext.resume();case 4:console.log("resumed");case 5:this.source.start(0),console.log("started");case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),t}(r.Component);window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.b;Object(i.render)(a.a.createElement(r.StrictMode,null,a.a.createElement(g,null)),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.94b0d2d7.chunk.js.map