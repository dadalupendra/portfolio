/* Real Three.js 0.152.2 3D portfolio enhancement.
 * Pinned CDN loaded in index.html. No build step, no tokens or tracking.
 * Motion/accessibility/mobile/performance safeguards included.
 */
(() => {
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const coarse=window.matchMedia('(pointer: coarse)');
 const mobile=()=>window.innerWidth<=750||coarse.matches;
 const canvas=document.querySelector('#threeBackground');
 const portrait=document.querySelector('.portrait');
 const noThree=()=>typeof window.THREE==='undefined'||!canvas;
 const math={lerp:(a,b,k)=>a+(b-a)*k,clamp:(v,a,b)=>Math.min(b,Math.max(a,v))};
 const state={mouseX:0,mouseY:0,scroll:0,hidden:document.hidden,last:0,raf:0,reduced:reduced.matches};
 let engine=null,portraitEngine=null,resizeTimer=0;
 const all=(s)=>Array.from(document.querySelectorAll(s));
 const $=(s)=>document.querySelector(s);
 const colors=()=>document.documentElement.dataset.theme==='light'?
  {particles:0x1570bb,globe:0x1590be,lines:0x54b5d0,accent:0x00a8bf}:
  {particles:0x50dfff,globe:0x16dce5,lines:0x1479c9,accent:0x00f2e6};
 function dispose(root){
   root.traverse?.(o=>{o.geometry?.dispose?.();const mat=o.material;if(Array.isArray(mat))mat.forEach(m=>m.dispose());else mat?.dispose?.()});
 }
 function createGlobal(){
  if(noThree()||reduced.matches)return;
  const T=THREE;
  let renderer;
  try{renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:!mobile(),powerPreference:mobile()?'low-power':'high-performance'})}
  catch(err){console.warn('WebGL unavailable, using static gradient fallback',err);return}
  renderer.setClearColor(0x000000,0);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  const scene=new T.Scene();
  const camera=new T.PerspectiveCamera(55,1,.1,170);
  camera.position.set(0,0,27);
  const globe=new T.Group();globe.position.set(5.5,0,-7);scene.add(globe);
  const size=mobile()?3.9:5.6;
  const wire=new T.LineSegments(new T.EdgesGeometry(new T.IcosahedronGeometry(size,2)),
   new T.LineBasicMaterial({color:colors().globe,transparent:true,opacity:mobile()?.1:.18,depthWrite:false}));
  globe.add(wire);
  const grid=new T.SphereGeometry(size,28,20);
  const meshwire=new T.LineSegments(new T.WireframeGeometry(grid),new T.LineBasicMaterial({color:colors().lines,transparent:true,opacity:.095,depthWrite:false}));
  globe.add(meshwire);grid.dispose();
  const N=mobile()?58:175,verts=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const theta=Math.acos(1-2*(i+.5)/N),phi=Math.PI*(3-Math.sqrt(5))*i;
    const r=size*1.01;
    verts.set([r*Math.sin(theta)*Math.cos(phi),r*Math.cos(theta),r*Math.sin(theta)*Math.sin(phi)],i*3);
  }
  const pointsGeometry=new T.BufferGeometry();pointsGeometry.setAttribute('position',new T.BufferAttribute(verts,3));
  const points=new T.Points(pointsGeometry,new T.PointsMaterial({color:colors().particles,size:mobile()?.065:.09,transparent:true,opacity:.83,sizeAttenuation:true,depthWrite:false}));
  globe.add(points);
  // Connect nearby points on the sphere into a live network.
  const edges=[];
  for(let i=0;i<N;i++){
   const near=[];
   const ai=i*3;
   for(let j=0;j<N;j++){
    if(j===i)continue;
    const bj=j*3,dx=verts[ai]-verts[bj],dy=verts[ai+1]-verts[bj+1],dz=verts[ai+2]-verts[bj+2];
    const d=dx*dx+dy*dy+dz*dz;
    if(d<(mobile()?3.5:2.8))near.push([d,j]);
   }
   near.sort((a,b)=>a[0]-b[0]);
   for(const [,j] of near.slice(0,2)){if(j>i)edges.push(...verts.slice(ai,ai+3),...verts.slice(j*3,j*3+3));}
  }
  const edgeGeo=new T.BufferGeometry();edgeGeo.setAttribute('position',new T.Float32BufferAttribute(edges,3));
  const links=new T.LineSegments(edgeGeo,new T.LineBasicMaterial({color:colors().lines,transparent:true,opacity:.22,depthWrite:false}));
  globe.add(links);
  const particleN=mobile()?54:200,cloudPos=new Float32Array(particleN*3);
  const seeds=[];
  for(let i=0;i<particleN;i++){
   const theta=Math.random()*Math.PI*2,rad=9+Math.random()*33;
   cloudPos.set([Math.cos(theta)*rad,(Math.random()-.5)*26,Math.sin(theta)*rad-10],i*3);
   seeds.push(Math.random()*Math.PI*2);
  }
  const cloudGeo=new T.BufferGeometry();cloudGeo.setAttribute('position',new T.BufferAttribute(cloudPos,3));
  const cloud=new T.Points(cloudGeo,new T.PointsMaterial({color:colors().particles,size:mobile()?.085:.12,transparent:true,opacity:.57,depthWrite:false}));
  scene.add(cloud);
  // Distant moving lattice: actual geometries with correct perspective.
  const lattice=new T.Group(),lineMat=new T.LineBasicMaterial({color:colors().lines,transparent:true,opacity:.12,depthWrite:false});
  for(let a=-12;a<=12;a++){
   const geo=new T.BufferGeometry().setFromPoints([new T.Vector3(a*2,-9,-30),new T.Vector3(a*2,-9,22)]);
   lattice.add(new T.Line(geo,lineMat));
  }
  for(let z=-30;z<=22;z+=3){
   const geo=new T.BufferGeometry().setFromPoints([new T.Vector3(-27,-9,z),new T.Vector3(27,-9,z)]);
   lattice.add(new T.Line(geo,lineMat));
  }
  scene.add(lattice);
  function sizeScene(){
   const w=window.innerWidth,h=window.innerHeight;
   renderer.setSize(w,h,false);
   camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix();
   globe.position.x=mobile()?3.2:5.5;
  }
  sizeScene();
  engine={renderer,scene,camera,globe,cloud,lattice,wire,meshwire,points,links,lineMat,cloudPos,seeds,sizeScene,elapsed:0};
 }
 function labelTexture(label,T){
  const cvs=document.createElement('canvas');cvs.width=256;cvs.height=128;
  const context=cvs.getContext('2d');
  context.clearRect(0,0,256,128);
  context.font='bold 36px system-ui,sans-serif';context.textAlign='center';context.textBaseline='middle';
  context.fillStyle='#ecfbff';context.fillText(label,128,64);
  const map=new T.CanvasTexture(cvs);map.minFilter=T.LinearFilter;map.generateMipmaps=false;return map;
 }
 function makePortrait(){
  if(!portrait||noThree()||mobile()||reduced.matches)return;
  const T=THREE;
  const overlay=document.createElement('canvas');
  overlay.id='portrait3d';overlay.setAttribute('aria-hidden','true');portrait.appendChild(overlay);
  let renderer;
  try{renderer=new T.WebGLRenderer({canvas:overlay,alpha:true,antialias:true,powerPreference:'low-power'})}
  catch{return}
  renderer.setClearColor(0,0);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(43,1,.1,60);
  camera.position.z=12;
  scene.add(new T.AmbientLight(0x7fbcff,.95));
  const key=new T.PointLight(0x00ffff,3,35);key.position.set(5,7,9);scene.add(key);
  const orbit=new T.Group();scene.add(orbit);
  const words=['Java','Python','JS','HTML','CSS','React'],hues=[0xffac64,0xffd86d,0xf4df55,0xff9054,0x64b3ff,0x38f2ef],objects=[];
  words.forEach((word,i)=>{
   const mat=new T.MeshStandardMaterial({color:hues[i],metalness:.45,roughness:.28,transparent:true,opacity:.92,emissive:hues[i],emissiveIntensity:.19});
   const geo=i%2===0?new T.BoxGeometry(.82,.82,.82):new T.IcosahedronGeometry(.58,0);
   const mesh=new T.Mesh(geo,mat);orbit.add(mesh);
   const tex=labelTexture(word,T),sprite=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthTest:false}));
   sprite.scale.set(1.45,.72,1);sprite.position.set(0,-.78,0);mesh.add(sprite);
   objects.push({mesh,tex,angle:i*Math.PI/3});
  });
  function sizePortrait(){
   const rect=overlay.getBoundingClientRect();if(!rect.width||!rect.height)return;
   renderer.setSize(rect.width,rect.height,false);
   camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();
  }
  sizePortrait();
  portraitEngine={renderer,scene,camera,orbit,objects,sizePortrait,overlay,elapsed:0};
 }
 function updateTheme(){
  const c=colors();
  if(engine){
   engine.wire.material.color.setHex(c.globe);
   engine.meshwire.material.color.setHex(c.lines);
   engine.points.material.color.setHex(c.particles);
   engine.links.material.color.setHex(c.lines);
   engine.cloud.material.color.setHex(c.particles);
   engine.lineMat.color.setHex(c.lines);
  }
 }
 function frame(now){
  state.raf=requestAnimationFrame(frame);
  if(state.hidden||state.reduced||document.body.classList.contains('np-gateway-open'))return; // Pause covered portfolio WebGL while Nepal gateway is visible
  if(state.last&&now-state.last<(mobile()?48:29))return;
  const dt=state.last?math.clamp((now-state.last)/1000,0,.06):.03;
  state.last=now;
  if(engine){
   const e=engine;e.elapsed+=dt;
   e.globe.rotation.y+=dt*.068;
   e.globe.rotation.x=math.lerp(e.globe.rotation.x,state.mouseY*.09+state.scroll*.21,.025);
   e.cloud.rotation.y+=dt*.004;
   e.lattice.position.z=(e.elapsed*.19)%3;
   const cam=e.camera;
   cam.position.x=math.lerp(cam.position.x,state.mouseX*1.1,.028);
   cam.position.y=math.lerp(cam.position.y,-state.scroll*2.3-state.mouseY*.58,.023);
   cam.position.z=math.lerp(cam.position.z,27-state.scroll*3,.02);
   cam.lookAt(0,-state.scroll*.6,0);
   e.renderer.render(e.scene,cam);
  }
  if(portraitEngine){
   const p=portraitEngine;p.elapsed+=dt;
   p.objects.forEach(({mesh,angle},i)=>{
    const a=angle+p.elapsed*.32,rad=3.7;
    mesh.position.set(Math.cos(a)*rad,Math.sin(a)*3.35,Math.sin(a)*.55);
    mesh.rotation.x+=dt*.37;mesh.rotation.y+=dt*.6;
    mesh.scale.setScalar(1+.035*Math.sin(p.elapsed+i));
   });
   p.renderer.render(p.scene,p.camera);
  }
 }
 function stop(){if(state.raf)cancelAnimationFrame(state.raf);state.raf=0;state.last=0;}
 function start(){if(state.raf||state.hidden||state.reduced)return;state.raf=requestAnimationFrame(frame);}
 function onMotionChange(){
  state.reduced=reduced.matches;
  if(state.reduced){stop();canvas.style.display='none';portraitEngine?.overlay?.style.setProperty('display','none');}
  else{canvas.style.display='block';if(engine)start();else if(!noThree()){createGlobal();makePortrait();start();}}
 }
 document.addEventListener('visibilitychange',()=>{state.hidden=document.hidden;if(state.hidden)stop();else start()});
 window.addEventListener('pointermove',e=>{if(mobile()||state.reduced)return;state.mouseX=e.clientX/innerWidth*2-1;state.mouseY=e.clientY/innerHeight*2-1;},{passive:true});
 window.addEventListener('scroll',()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);state.scroll=window.scrollY/max;},{passive:true});
 window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{engine?.sizeScene();portraitEngine?.sizePortrait();},150);
 },{passive:true});
 reduced.addEventListener?.('change',onMotionChange);
 new MutationObserver(updateTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 if(!noThree()&&!reduced.matches){
   createGlobal();makePortrait();start();
 }else{canvas.style.display='none';}
 // Mouse-follow tilt, works independently even if WebGL is unavailable.
 function tilt(el,limit){
  if(!el)return;
  const target=el; // Tilt the entire portrait stack so the name overlay has real parallax depth.
  if(!target)return;
  el.addEventListener('pointermove',e=>{
   if(mobile()||reduced.matches||e.pointerType==='touch')return;
   const r=el.getBoundingClientRect();
   const x=math.clamp((e.clientX-r.left)/r.width*2-1,-1,1);
   const y=math.clamp((e.clientY-r.top)/r.height*2-1,-1,1);
   target.style.transform=`perspective(1100px) rotateY(${x*limit}deg) rotateX(${-y*limit}deg) translateY(-3px)`;
   target.style.setProperty('--glow-x',((x+1)*50)+'%');
   target.style.setProperty('--glow-y',((y+1)*50)+'%');
  },{passive:true});
  el.addEventListener('pointerleave',()=>{target.style.transform='';});
  el.addEventListener('focusout',()=>{target.style.transform='';});
 }
 tilt(portrait,6);
 const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('is-visible');
   observer.unobserve(entry.target);
  });
 },{threshold:.08,rootMargin:'0px 0px 30px 0px'}):null;
 function enhanceCards(){
  all('.project').forEach(card=>{
   if(card.dataset.depthReady)return;
   card.dataset.depthReady='1';card.classList.add('portfolio-project');
   tilt(card,4.2);
  });
 }
 // The existing language switcher re-renders cards; reapply tilt when it does.
 const grid=$('#projectsGrid');
 if(grid){new MutationObserver(enhanceCards).observe(grid,{childList:true});enhanceCards();}
 all('.skill-box').forEach(card=>card.classList.add('depth-skill'));
 function reveal(){
  all('.section-title,.section-subtitle,.education-card,.info-card').forEach(el=>{
   if(el.dataset.revealReady)return;
   el.dataset.revealReady='1';
   if(reduced.matches||!observer)return;
   el.classList.add('depth-reveal');observer.observe(el);
  });
 }
 reveal();
 // Stats: start at zero and animate on first view, avoiding arbitrary invented values.
 const numeric=all('.stat-chip strong').filter(el=>/^\d+(?:\.\d+)?$/.test(el.textContent.trim()));
 let counted=false;
 const runCounters=()=>{
  if(counted)return;counted=true;
  if(reduced.matches)return;
  const start=performance.now(),duration=1150;
  const values=numeric.map(el=>({el,value:Number(el.textContent),precision:el.textContent.includes('.')?2:0}));
  function step(t){
    const u=math.clamp((t-start)/duration,0,1),eased=1-Math.pow(1-u,3);
    values.forEach(v=>{v.el.textContent=(v.value*eased).toFixed(v.precision)});
    if(u<1)requestAnimationFrame(step);
  }requestAnimationFrame(step);
 };
 const stats=$('.stat-strip');
 if(stats&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){runCounters();io.disconnect()}},{threshold:.15});io.observe(stats);
 }else runCounters();
})();
