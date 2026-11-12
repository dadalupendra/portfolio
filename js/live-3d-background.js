/* Animated, lightweight 3D-perspective background without external libraries.
   Continues while page is visible, caps frame rate and DPR, respects reduced motion.
   Decorative canvas is aria-hidden and never blocks interaction.
*/
(() => {
 'use strict';
 const canvas=document.getElementById('live3dBackground');
 if(!canvas)return;
 const ctx=canvas.getContext('2d',{alpha:false,desynchronized:true});
 if(!ctx)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const rand=(min,max)=>Math.random()*(max-min)+min;
 const stars=Array.from({length:125},()=>({x:Math.random(),y:Math.random()*.9,z:rand(.24,1),r:rand(.45,1.65),phase:rand(0,6.28)}));
 const particles=Array.from({length:75},(_,i)=>({a:rand(0,6.283),radius:rand(2,13),height:rand(-5,5),speed:rand(.035,.14),size:rand(.5,1.7),phase:rand(0,6.283)}));
 let width=1,height=1,dpr=1,last=0,raf=0,clock=0,alive=true;
 const TAU=Math.PI*2;
 function resize(){
   width=Math.max(1,innerWidth);height=Math.max(1,innerHeight);
   dpr=Math.min(devicePixelRatio||1,1.5);
   canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
 }
 const project=(x,y,z,spin=0)=>{
   const c=Math.cos(spin),s=Math.sin(spin);
   const rx=x*c-z*s,rz=x*s+z*c;
   const depth=19+rz;
   const perspective=580/depth;
   return {x:width*.56+rx*perspective,y:height*.43+y*perspective,z:depth,p:perspective};
 };
 function line(a,b,color,lw=1){
   ctx.strokeStyle=color;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
 }
 function mountainLayer(y,amplitude,frequency,baseColor,phase){
   ctx.beginPath();ctx.moveTo(0,height);
   for(let x=0;x<=width+12;x+=12){
     const u=x/width;
     const peak=Math.abs(Math.sin(u*frequency+phase))*.62+Math.abs(Math.sin(u*frequency*2.13-phase*.7))*.22;
     const slope=Math.sin(u*frequency*.6+1.1)*.11;
     ctx.lineTo(x,y-(peak+slope)*amplitude);
   }
   ctx.lineTo(width,height);ctx.closePath();ctx.fillStyle=baseColor;ctx.fill();
 }
 function render(now){
   if(!alive)return;
   raf=requestAnimationFrame(render);
   if(!reduced.matches && now-last<28)return; // ~35 fps; CSS remains live, even while scrolling
   const delta=last?Math.min((now-last)/1000,.06):.028;last=now;
   if(!reduced.matches)clock+=delta;
   const t=clock;
   const bg=ctx.createLinearGradient(0,0,width,height);
   bg.addColorStop(0,'#020b1a');bg.addColorStop(.5,'#08264a');bg.addColorStop(1,'#02091b');
   ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
   const glow=ctx.createRadialGradient(width*.57,height*.45,5,width*.57,height*.45,Math.max(width,height)*.68);
   glow.addColorStop(0,'rgba(0,169,253,.19)');glow.addColorStop(.43,'rgba(9,87,167,.12)');glow.addColorStop(1,'rgba(0,0,0,0)');
   ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
   stars.forEach(st=>{
     const x=st.x*width,y=st.y*height,alpha=.12+st.z*.42*(.82+.18*Math.sin(t*.8+st.phase));
     ctx.fillStyle='rgba(111,225,255,'+alpha+')';ctx.beginPath();ctx.arc(x,y,st.r,0,TAU);ctx.fill();
   });
   // Slowly rotating 3D latitude/longitude rings evoke a holographic network globe.
   const spin=t*.055;
   const cx=width*.62,cy=height*.42;
   const ringR=Math.min(width*.17,165);
   for(let longitude=0;longitude<9;longitude++){
     const angle=longitude*Math.PI/9+spin;
     ctx.beginPath();let started=false;
     for(let k=0;k<=60;k++){
       const lat=-Math.PI/2+k*Math.PI/60;
       const x=Math.cos(lat)*Math.cos(angle)*ringR;
       const y=Math.sin(lat)*ringR;
       const z=Math.cos(lat)*Math.sin(angle)*ringR;
       const p=1/(1+z/700);
       const px=cx+x*p,py=cy+y*p;
       if(!started){ctx.moveTo(px,py);started=true;}else ctx.lineTo(px,py);
     }
     ctx.strokeStyle='rgba(25,210,244,.075)';ctx.lineWidth=1;ctx.stroke();
   }
   for(let latIdx=-3;latIdx<=3;latIdx++){
     const lat=latIdx*Math.PI/9,r=Math.cos(lat)*ringR,y=Math.sin(lat)*ringR;
     ctx.beginPath();
     for(let j=0;j<=84;j++){
       const a=j*TAU/84+spin,x=Math.cos(a)*r,z=Math.sin(a)*r,p=1/(1+z/700);
       const xx=cx+x*p,yy=cy+y*p;
       if(j===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);
     }
     ctx.strokeStyle='rgba(31,139,237,.085)';ctx.stroke();
   }
   // 3D perspective lattice, animated gently for a feeling of endless space.
   const baseY=height*.75,horizon=height*.56;
   for(let i=-11;i<=11;i++){
     const bottom={x:width*.54+i*width*.12,y:height+50};
     const top={x:width*.54+i*width*.012,y:horizon};
     line(top,bottom,'rgba(14,194,229,.13)');
   }
   for(let i=1;i<15;i++){
     const depth=(i+((t*.17)%1))/15;
     const y=horizon+(baseY-horizon)*Math.pow(depth,1.85)*2.8;
     if(y>height+10)continue;
     line({x:0,y},{x:width,y},'rgba(12,206,233,'+(.02+depth*.14)+')');
   }
   // Holographic particles orbit in actual projected 3D coordinates.
   for(let i=0;i<particles.length;i++){
     const p=particles[i],a=p.a+t*p.speed;
     const x=Math.cos(a)*p.radius,y=p.height+Math.sin(a*.9+p.phase)*1.7,z=Math.sin(a)*p.radius;
     const point=project(x,y,z,t*.07);
     if(point.x<0||point.x>width||point.y<0||point.y>height)continue;
     const opacity=.08+(point.p/33)*.27;
     ctx.fillStyle='rgba(32,221,248,'+Math.min(opacity,.5)+')';
     ctx.beginPath();ctx.arc(point.x,point.y,p.size*Math.min(point.p/24,2.6),0,TAU);ctx.fill();
   }
   mountainLayer(height*.92,height*.13,10,'#06152e',.8);
   mountainLayer(height*.985,height*.1,16,'#020a1c',2);
   // Cyan light on the ridge; subtle movement rather than large distractions.
   ctx.strokeStyle='rgba(23,206,240,.17)';ctx.lineWidth=1.2;ctx.beginPath();
   for(let x=0;x<=width;x+=12){const u=x/width;const py=height*.92-(Math.abs(Math.sin(u*10+.8))*.62+Math.abs(Math.sin(u*21.3-.56))*.22+Math.sin(u*6+1.1)*.11)*height*.13;
    if(x===0)ctx.moveTo(x,py);else ctx.lineTo(x,py);
   }ctx.stroke();
   // The background stays crisp on long sessions without retaining canvases or frames.
 }
 function start(){if(raf||document.hidden)return;alive=true;last=0;raf=requestAnimationFrame(render)}
 function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0}
 const onVisibility=()=>{if(document.hidden)stop();else start()};
 document.addEventListener('visibilitychange',onVisibility);
 let resizeTimer=0;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(resize,120)},{passive:true});
 reduced.addEventListener?.('change',()=>{clock=0;if(!document.hidden){stop();start()}});
 resize();start();
})();