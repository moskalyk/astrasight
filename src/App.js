import react, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';

import worldID from "@worldcoin/id"; // If you installed the JS package as a module

import jQuery from 'jquery'

// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const result = await worldID.enable();
//     console.log("World ID verified succesfully:", result);
//   } catch (failure) {
//     console.warn("World ID verification failed:", failure);
//     // Re-activate here so your end user can try again
//   }
// });

const body=document.getElementsByTagName("body").item(0);
const TP=2*Math.PI;
const CSIZE=190;

const ctx=(()=>{
  let d=document.createElement("div");
  d.style.textAlign="center";
  body.append(d);
  let c=document.createElement("canvas");
  c.width=c.height=2*CSIZE;
  d.append(c);
  return c.getContext("2d");
})();
ctx.translate(CSIZE,CSIZE);
ctx.rotate(TP/4);


// onresize=()=>{ 
//   let D=Math.min(window.innerWidth,window.innerHeight)-40; 
//   ctx.canvas.style.width=D+"px";
//   ctx.canvas.style.height=D+"px";
// }

const getRandomInt=(min,max,low)=>{
  if (low) {
    return Math.floor(Math.random()*Math.random()*(max-min))+min;
  } else {
    return Math.floor(Math.random()*(max-min))+min;
  }
}

function start() {
  if (stopped) {
    requestAnimationFrame(animate);
    stopped=false;
  } else {
    stopped=true;
  }
}
ctx.canvas.addEventListener("click", start, false);

var dashLength=10;
var rotOff=TP/4;
var stopped=true;
var t=-200;
function animate(ts) {
  if (stopped) return;
  t++;
  if (t%300==0) {
    if (t%1200==0) t=0;
    reset();
  }
  a=TP*t/1200;
if (t%40==0) huex++;
  for (let i=0; i<circles.length; i++) {
    let hue=(huex+Math.round(circles[i].hDiff*Math.pow(Math.sin(2*a),2)))%360;
    circles[i].col="hsl("+hue+",100%,50%)";
  }
  draw();
  requestAnimationFrame(animate);
}

const radius=25;

var circles=[];
var cia=[];
var Circle=function(x) {
  this.x=x;
  this.dmx=new DOMMatrix([1,0,0,1,x,0]);
  this.dmx2=false;
  this.col="hsl("+huex+",100%,50%)";
  this.sf=1;
  this.hDiff=80;
}

var huex=getRandomInt(0,360);
let wColor="hsl("+huex+",100%,50%)";

for (let i=0; i<2*CSIZE/radius-1; i++) {
  circles.push(new Circle(-CSIZE+radius+i*radius));
  cia.push(i);
}

var rots=[8,10,12,14,16,18,20,22,-6,-10,-12,-14,-16,-18,20,22];
var sf=[-1,1][getRandomInt(0,2)];

var a=0;
let cc=0;

var createCognates=(i1,i2)=>{
  let mp=(circles[i1].x+circles[i2].x)/2;
  circles[i1].dmx.e=mp;
  circles[i1].dmx2=new DOMMatrix([1,0,0,1,(i1-i2)*radius/2,0]);
  circles[i2].dmx.e=mp;
  circles[i2].dmx2=new DOMMatrix([1,0,0,1,(i2-i1)*radius/2,0]);
let rr=Math.abs(circles[i1].x-circles[i2].x);
if (rr>300) circles[i1].sf=[-2,2][getRandomInt(0,2)];
else if (rr>200) circles[i1].sf=[-6,-4,-2,2,4,6][getRandomInt(0,6)];
else if (rr>100) circles[i1].sf=[-10-8,-6,-4,-2,2,4,6,8,10][getRandomInt(0,8)];
else if (rr>40) circles[i1].sf=[-14,-12,-10,-8,-6,6,8,10,12,14][getRandomInt(0,10)];
else circles[i1].sf=rots[getRandomInt(0,rots.length)];
  circles[i2].sf=circles[i1].sf;
  cc++;
  circles[i1].hDiff=circles[i2].hDiff=80+100*(cc%4);
  circles[i1].col=circles[i2].col="hsl("+huex+",100%,50%)";
}

var getNextCognate=()=>{
  if (cia.length==0) return false;
  if (cia.length==1) {
    cia=[];
    return false;
  }
  let idx=cia.splice(getRandomInt(0,cia.length),1)[0];
  let fc=false;
  for (let i=idx+1; i<circles.length; i++) { 
    fc=i-1;
    if (circles[i].dmx2 || i==circles.length-1) {
      if (i==idx+1) {
        break;
      } else {
  let mp=(circles[idx].x+circles[fc].x)/2;
  createCognates(idx,fc);
  cia.splice(cia.indexOf(fc),1);
  return true;
      }
    }
  }
  for (let i=idx-1; i>=0; i--) { 
    if (i==-1 || circles[i].dmx2) {
      if (i==idx-1) {
        return true;
      } else {
        fc=i+1;
        createCognates(idx,fc);
        cia.splice(cia.indexOf(fc),1);
        return true;
      }
    }
  }
  if (idx==0) {
    if (!circles[circles.length-1].dmx2) {
      createCognates(0,circles.length-1);
      cia.splice(cia.indexOf(circles.length-1),1);
    }
  } else if (idx==circles.length-1) {
    if (!circles[0].dmx2) {
      createCognates(0,circles.length-1);
      cia.splice(cia.indexOf(0),1);
    }
  }
  return true;
}

for (let i=0; i<24; i++) {  // radius 20
  if (!getNextCognate()) {
    break;
  }
}

var draw=()=>{
  ctx.fillStyle="#FFF";
  ctx.fillRect(-CSIZE,-CSIZE,2*CSIZE,2*CSIZE);
  let dmr=new DOMMatrix([Math.cos(sf*a),Math.sin(sf*a),-Math.sin(sf*a),Math.cos(sf*a),0,0])
  for (let i=0; i<circles.length; i++) { 
    let dp=new DOMPoint();
    if (circles[i].dmx2) {
      let cos=Math.cos(circles[i].sf*a);
      let sin=Math.sin(circles[i].sf*a);
      let dmr2=new DOMMatrix([cos,sin,-sin,cos,0,0]);
      dp=dp.matrixTransform(dmr2.multiply(circles[i].dmx2));
    }
    dp=dp.matrixTransform(dmr.multiply(circles[i].dmx));
    ctx.beginPath();
    ctx.arc(dp.x,dp.y,radius/2,0,TP);
    ctx.fillStyle=circles[i].col;
    ctx.fill();
  }
}

var reset=()=>{
  cia=[];
  for (let i=0; i<circles.length; i++) {
     circles[i].dmx.e=circles[i].x;
     circles[i].dmx2=false;
     circles[i].sf=1;
     circles[i].hDiff=80;
     cia.push(i);
  }
  for (let i=0; i<24; i++) {  // radius 20
    if (!getNextCognate()) {
      break;
    }
  }
}

start();

    (function( $ ) {
 
    $.fn.timeline = function( data ) {
      return this.each(function() {
      
        var $el = $(this);
        $el.addClass('timeline');


        // calc ratio for event positions
        var ratio = 100/(data.stop_time - data.start_time)
        
        $.each(data.lines, function(i,line){
          var lineTmpl = $('<div class="line"><h4>'+line.title+'</h4><div class="events"></div></div>').addClass("line "+ line.css).appendTo($el);
          
          $.each(line.events, function(index,event){
            var position = ((event.time - data.start_time)*ratio).toFixed(2);

            var eventTmpl = $('<div class="event"><div class="circle"><div class="circle-inner"></div><div class="label"><label>'+event.title+'</label><time>'+(new Date(event.time).toLocaleString())+'</time></div></div></div>').appendTo($('.events', lineTmpl)).css('left',position+'%');
          });
        });

        var timeTmpl = $('<div class="time">').appendTo($el);
        var periodTmpl = $('<div class="period"><div class="label last">'+(new Date(data.stop_time).toLocaleString())+'</div><div class="label first">'+(new Date(data.start_time).toLocaleString())+'</div></div>').css({left:"0%", width:"100%"}).appendTo(timeTmpl);
        
      });
    };

    var data = {
      start_time: 90000,
      stop_time: 120000,
      lines: {
        'Neptune': {
          title: 'Neptune',
          css: 'checklist',
          events: [
            {
              id: 1,
              type: 'start_work',
              time: 92000,
              title: 'Start Work',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 4,
              type: 'trailer_pickup',
              time: 105000,
              title: 'Trailer Pickup',
              status: 'complete',
              description: 'O-la-la'
            },
          ]
        },
        'Jupiter': {
          title: 'Jupiter',
          css: 'liquid',
          events: [
            {
              id: 1,
              type: 'start_work',
              time: 92000,
              title: 'Start Work',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 2,
              type: 'vehicle',
              time: 96000,
              title: 'Vehicle',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 3,
              type: 'fuel',
              time: 98000,
              title: 'Vehicle',
              status: 'resolve',
              description: 'O-la-la'
            },
            {
              id: 4,
              type: 'trailer_pickup',
              time: 103000,
              title: 'Trailer Pickup',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 5,
              type: 'hms',
              time: 105000,
              title: 'Danger situation',
              status: 'alert',
              description: 'O-la-la'
            },
            {
              id: 6,
              type: 'trailer_delivery',
              time: 118000,
              title: 'Trailer delivery ',
              status: 'complete',
              description: 'O-la-la'
            }
          ]
        },
        'Mars': {
          title: 'Mars',
          css: 'red',
          events: [
            {
              id: 1,
              type: 'start_work',
              time: 100000,
              title: 'Start Work',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 2,
              type: 'vehicle',
              time: 115000,
              title: 'Vehicle',
              status: 'complete',
              description: 'O-la-la'
            }
          ]
        },
        'Moon': {
          title: 'Moon',
          css: 'whte',
          events: [
            {
              id: 1,
              type: 'start_work',
              time: 100000,
              title: 'Start Work',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 2,
              type: 'vehicle',
              time: 115000,
              title: 'Vehicle',
              status: 'complete',
              description: 'O-la-la'
            }
          ]
        },
        'Executor': {
          title: 'Executor',
          css: 'controller',
          events: [
          {
              id: 1,
              type: 'start_work',
              time: 92000,
              title: 'Call Option',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 1,
              type: 'start_work',
              time: 100000,
              title: 'Call Option',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 4,
              type: 'trailer_pickup',
              time: 105000,
              title: 'Trailer Pickup',
              status: 'complete',
              description: 'O-la-la'
            },
            {
              id: 2,
              type: 'vehicle',
              time: 115000,
              title: 'Vehicle',
              status: 'complete',
              description: 'O-la-la'
            }
          ]
        }
      }
    };

    setTimeout(() => {
      $('.tl').timeline(data)
    }, 1000)
 
}( jQuery ));

const nemInstance = async () => {
  try {

      const result = await worldID.enable();
      console.log("World ID verified succesfully:", result);
    } catch (failure) {
      console.warn("World ID verification failed:", failure);
      // Re-activate here so your end user can try again
    }
}

function App() {

  const [state, setState] = useState(false)
  useEffect(() => {

    if(!state){
      setState(true)
      worldID.init("world-id-container", {
        enableTelemetry: true,
        actionId: "0x330C8452C879506f313D1565702560435b0fee4C",
      });
    }

  })
  return (
    <div id="app">
    <div id="world-id-container" />
    <button onClick={() => nemInstance()}>login</button>
      
<div className="tl"></div>
    </div>
  );
}

export default App;
