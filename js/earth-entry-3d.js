/* Real 3D Earth → Nepal → Darchula → Portfolio, GitHub Pages, no build step.
   THREE r152 is loaded in index.html from pinned cdnjs.
   Earth images: three.js r152 /examples/textures/planets/ (MIT project; source:
   https://github.com/mrdoob/three.js/tree/r152/examples/textures/planets)
   Location: supplied Darchula/Byans-Sunsera coordinate 29.9470454, 80.6626123.
   External images are fixed-version public assets; no API key or user tracking.
*/
(()=>{
 'use strict';
 const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
 const portal=$('#earthPortal'),canvas=$('#earthCanvas'),stage=$('#earthStage');
 if(!portal||!canvas||!stage)return;
 const marker=$('#earthDarchulaMarker'),entry=$('#earthEnter'),skip=$('#earthSkip'),reset=$('#earthReset'),staticScene=$('#earthStatic');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),mobile=window.matchMedia('(max-width: 700px)');
 const T=window.THREE,point={lat:29.9470454,lon:80.6626123},radius=3.3;
 const EARTH='https://raw.githubusercontent.com/mrdoob/three.js/r152/examples/textures/planets/earth_atmos_2048.jpg';
 const EARTH_BACKUP='https://cdn.jsdelivr.net/gh/mrdoob/three.js@r152/examples/textures/planets/earth_atmos_2048.jpg';
 const CLOUDS='https://raw.githubusercontent.com/mrdoob/three.js/r152/examples/textures/planets/earth_clouds_1024.png';
 const translations={
   en:{label:'DARCHULA',sub:'Nepal · Enter portfolio',skip:'Open portfolio',reset:'Reset Earth view',entry:'Open portfolio from Darchula',hint:'Drag the globe. Select the Nepal flag at Darchula to enter.'},
   ne:{label:'दार्चुला',sub:'नेपाल · पोर्टफोलियो खोल्नुहोस्',skip:'पोर्टफोलियो खोल्नुहोस्',reset:'पृथ्वी फेरि मिलाउनुहोस्',entry:'दार्चुलाबाट पोर्टफोलियो खोल्नुहोस्',hint:'पृथ्वी घुमाउनुहोस्। दार्चुलाको नेपाली झण्डा छानेर पोर्टफोलियो खोल्नुहोस्।'},
   ja:{label:'ダルチュラ',sub:'ネパール · ポートフォリオへ',skip:'ポートフォリオを開く',reset:'地球の表示をリセット',entry:'ダルチュラから開く',hint:'地球をドラッグ。ダルチュラの旗を選んで開きます。'},
   hi:{label:'दार्चुला',sub:'नेपाल · पोर्टफोलियो खोलें',skip:'पोर्टफोलियो खोलें',reset:'पृथ्वी रीसेट करें',entry:'दार्चुला से खोलें',hint:'ग्लोब घुमाएँ और दार्चुला का नेपाली झंडा चुनें।'},
   zh:{label:'DARCHULA',sub:'尼泊尔 · 进入作品集',skip:'打开作品集',reset:'重置地球视角',entry:'从 Darchula 进入',hint:'拖动地球，点击 Darchula 的尼泊尔旗帜进入。'},
   ko:{label:'DARCHULA',sub:'네팔 · 포트폴리오 열기',skip:'포트폴리오 열기',reset:'지구 보기 초기화',entry:'Darchula에서 열기',hint:'지구를 드래그하고 Darchula의 네팔 국기를 누르세요.'}
 };
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 let renderer=null,scene=null,camera=null,globePivot=null,globe=null,globeMaterial=null,halo=null,spot=null,hitSphere=null,stars=null,cloudMesh=null;
 let raf=0,last=0,elapsed=0,active=false,has3D=false,textureLoaded=false;
 let baseDistance=12,targetZoom=1,zoom=1,yaw=0,pitch=0,currentYaw=0,currentPitch=0;
 const pointers=new Map();let pinchDist=0,dragDist=0,suppressClick=false;
 function labelUpdate(){
  const code=document.documentElement.lang,data=translations[code]||translations.en;
  const main=$('#earthMarkerName'),sub=$('#earthMarkerSub');
  if(main)main.textContent=data.label;
  if(sub)sub.textContent=data.sub;
  marker.setAttribute('aria-label',data.entry);
  skip.setAttribute('aria-label',data.skip);
  reset.setAttribute('aria-label',data.reset);
  entry.setAttribute('aria-label',data.entry);
  canvas.setAttribute('aria-label',data.hint);
 }
 new MutationObserver(labelUpdate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 function concealBehind(value){
  $$('.site-header,main,.footer,.print-cv').forEach(el=>{el.inert=value});
 }
 function openPortfolio(){
  active=false;stop();portal.hidden=true;
  document.body.classList.remove('earth-gateway-open');
  concealBehind(false);
  window.scrollTo({top:0,behavior:'auto'});
  const main=$('#main');
  if(main){main.setAttribute('tabindex','-1');main.focus({preventScroll:true})}
 }
 function showPortal(){
  portal.hidden=false;document.body.classList.add('earth-gateway-open');
  concealBehind(true);active=true;labelUpdate();
  window.scrollTo({top:0,behavior:'auto'});
  resize();
  if(has3D){if(reduced.matches)renderOnce();else start()}
  requestAnimationFrame(()=>{(marker&&!marker.hidden?marker:skip).focus({preventScroll:true})});
 }
 entry.addEventListener('click',openPortfolio);
 skip.addEventListener('click',openPortfolio);
 marker.addEventListener('click',openPortfolio);
 $('#npMapReopen')?.addEventListener('click',showPortal);
 reset.addEventListener('click',()=>{
  yaw=0;pitch=0;targetZoom=1;
  if(reduced.matches){currentYaw=0;currentPitch=0;zoom=1;renderOnce()}
 });
 document.addEventListener('keydown',e=>{
  if(portal.hidden)return;
  if(e.key==='Escape'){e.preventDefault();openPortfolio();return}
  if(e.key==='Enter'&&document.activeElement===canvas){e.preventDefault();openPortfolio()}
  if(e.key!=='Tab')return;
  const focusables=$$('#earthPortal button:not([hidden])').filter(el=>el.getClientRects().length>0);
  if(!focusables.length)return;
  if(e.shiftKey&&document.activeElement===focusables[0]){e.preventDefault();focusables.at(-1).focus()}
  else if(!e.shiftKey&&document.activeElement===focusables.at(-1)){e.preventDefault();focusables[0].focus()}
 });
 function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0}
 function start(){if(active&&!document.hidden&&!reduced.matches&&has3D&&!raf)raf=requestAnimationFrame(frame)}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(active){if(reduced.matches)renderOnce();else start()}});
 reduced.addEventListener?.('change',()=>{if(reduced.matches){stop();renderOnce()}else start()});
 function latLonPoint(lat,lon,r){
  const p=lat*Math.PI/180,l=lon*Math.PI/180;
  return new T.Vector3(r*Math.cos(p)*Math.cos(l),r*Math.sin(p),-r*Math.cos(p)*Math.sin(l));
 }
 const markerLocal=T?latLonPoint(point.lat,point.lon,radius+.17):null;
 function setup3D(){
  if(!T)return false;
  try{
   renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:!mobile.matches,powerPreference:mobile.matches?'low-power':'high-performance'});
  }catch(err){console.warn('WebGL unavailable — use static globe fallback',err);return false}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile.matches?1.45:2));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=T.SRGBColorSpace;
  scene=new T.Scene();
  camera=new T.PerspectiveCamera(43,1,.1,150);
  const light=new T.DirectionalLight(0xfff0dc,2.6);
  light.position.set(-7,5,11);scene.add(light);
  scene.add(new T.AmbientLight(0x7daacf,.57));
  const fill=new T.DirectionalLight(0x398ee3,.75);
  fill.position.set(7,-3,-5);scene.add(fill);
  globePivot=new T.Group();scene.add(globePivot);
  globe=new T.Group();globePivot.add(globe);
  // Rotates the REAL longitude/latitude spot to face the viewer at startup.
  globe.quaternion.setFromUnitVectors(markerLocal.clone().normalize(),new T.Vector3(0,0,1));
  const earthGeometry=new T.SphereGeometry(radius,mobile.matches?56:96,mobile.matches?40:64);
  globeMaterial=new T.MeshPhongMaterial({color:0x245077,shininess:26,specular:0x1b4665,emissive:0x061322,emissiveIntensity:.17});
  globe.add(new T.Mesh(earthGeometry,globeMaterial));
  // Fixed-version real Earth texture; if raw GitHub is unreachable, try jsDelivr.
  const loader=new T.TextureLoader();
  const installEarth=img=>{
    img.colorSpace=T.SRGBColorSpace;
    img.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
    globeMaterial.map=img;globeMaterial.color.setHex(0xffffff);globeMaterial.needsUpdate=true;
    textureLoaded=true;staticScene.hidden=true;
    if(reduced.matches)renderOnce();
  };
  loader.load(EARTH,installEarth,undefined,()=>loader.load(EARTH_BACKUP,installEarth,undefined,()=>{
    console.warn('Earth image unavailable from both fixed sources; displaying geographic globe fallback');
    if(!has3D)staticScene.hidden=false;
  }));
  if(!mobile.matches){
   const cloudsMaterial=new T.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.2,depthWrite:false});
   cloudMesh=new T.Mesh(new T.SphereGeometry(radius*1.009,72,48),cloudsMaterial);
   globe.add(cloudMesh);
   loader.load(CLOUDS,cloudTex=>{
     cloudsMaterial.alphaMap=cloudTex;cloudsMaterial.needsUpdate=true;
   },undefined,()=>{cloudMesh.visible=false});
  }
  // Atmosphere: a rim-glow shader around the actual 3D sphere.
  const atmosphere=new T.Mesh(new T.SphereGeometry(radius*1.055,64,48),
    new T.ShaderMaterial({
     vertexShader:'varying vec3 vNormalWorld; varying vec3 vPositionWorld; void main(){vec4 world=modelMatrix*vec4(position,1.0); vPositionWorld=world.xyz; vNormalWorld=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*world;}',
     fragmentShader:'varying vec3 vNormalWorld; varying vec3 vPositionWorld; void main(){vec3 v=normalize(cameraPosition-vPositionWorld); float f=pow(1.0-max(dot(normalize(vNormalWorld),v),0.0),4.0);gl_FragColor=vec4(0.08,0.65,0.95,clamp(f*0.62,0.0,0.72));}',
     transparent:true,depthWrite:false,side:T.FrontSide,blending:T.AdditiveBlending
    }));
  globe.add(atmosphere);
  // Glowing, geo-anchored Darchula point. Touchable 3D sphere for raycaster.
  spot=new T.Group();spot.position.copy(markerLocal);
  globe.add(spot);
  const dot=new T.Mesh(new T.SphereGeometry(.085,18,14),new T.MeshBasicMaterial({color:0x4ffff0}));
  spot.add(dot);
  const glow=new T.Mesh(new T.SphereGeometry(.16,18,14),new T.MeshBasicMaterial({color:0x22eade,transparent:true,opacity:.12,depthWrite:false}));
  spot.add(glow);
  halo=new T.Mesh(new T.RingGeometry(.15,.245,48),new T.MeshBasicMaterial({color:0x4cfbe7,side:T.DoubleSide,transparent:true,opacity:.65,depthWrite:false}));
  halo.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),markerLocal.clone().normalize());
  spot.add(halo);
  hitSphere=new T.Mesh(new T.SphereGeometry(.31,22,16),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
  spot.add(hitSphere);
  // Sparse starfield behind Earth, mobile-friendly.
  const num=mobile.matches?95:260,starPos=new Float32Array(num*3);
  for(let i=0;i<num;i++){
    const a=Math.random()*Math.PI*2,z=(Math.random()-.5)*1.8;
    const spread=22+Math.random()*50;
    starPos[i*3]=Math.cos(a)*spread;
    starPos[i*3+1]=Math.sin(a)*spread;
    starPos[i*3+2]=-16-z*10;
  }
  const starGeom=new T.BufferGeometry();
  starGeom.setAttribute('position',new T.BufferAttribute(starPos,3));
  stars=new T.Points(starGeom,new T.PointsMaterial({color:0x88cfff,size:mobile.matches?.075:.105,transparent:true,opacity:.76,sizeAttenuation:true,depthWrite:false}));
  scene.add(stars);
  has3D=true;
  staticScene.hidden=true;
  marker.hidden=false;reset.hidden=false;
  attachControls();
  resize();
  return true;
 }
 function resize(){
  if(!renderer||!camera)return;
  const w=Math.max(240,stage.clientWidth),h=Math.max(210,stage.clientHeight),tan=Math.tan(T.MathUtils.degToRad(camera.fov/2));
  const targetDiameter=w/h<.9?Math.min(h*.71,w*1.48):Math.min(h*.94,w*.67);
  baseDistance=clamp(radius*h/(targetDiameter*tan),radius*2.6,35);
  renderer.setSize(w,h,false);
  camera.aspect=w/h;camera.position.set(0,0,baseDistance/zoom);camera.lookAt(0,0,0);
  camera.updateProjectionMatrix();
  updateMarker();
 }
 function updateMarker(){
  if(!camera||!globe||!spot||!active||!renderer)return;
  scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
  const world=spot.getWorldPosition(new T.Vector3());
  const normal=world.clone().normalize();
  const towardCamera=camera.position.clone().sub(world).normalize();
  const visible=normal.dot(towardCamera)>.08;
  const projected=world.project(camera);
  if(!visible||projected.z>=1||projected.z<=-1){marker.hidden=true;return}
  const w=stage.clientWidth,h=stage.clientHeight;
  const x=(projected.x*.5+.5)*w,y=(-projected.y*.5+.5)*h;
  if(x<-55||x>w+55||y<-55||y>h+55){marker.hidden=true;return}
  marker.style.left=clamp(x,76,w-76)+'px';
  marker.style.top=clamp(y,78,h-38)+'px';
  marker.hidden=false;
 }
 function renderOnce(){
  if(!has3D||!renderer||!camera||portal.hidden)return;
  globePivot.rotation.set(currentPitch,currentYaw,0);
  renderer.render(scene,camera);updateMarker();
 }
 function frame(now){
  raf=0;
  if(!active||document.hidden||reduced.matches||!renderer||!has3D)return;
  if(last&&now-last<(mobile.matches?45:30)){raf=requestAnimationFrame(frame);return}
  const dt=last?Math.min((now-last)/1000,.07):.033;
  last=now;elapsed+=dt;
  currentYaw+=(yaw-currentYaw)*.095;
  currentPitch+=(pitch-currentPitch)*.095;
  zoom+=(targetZoom-zoom)*.1;
  globePivot.rotation.set(currentPitch+.018*Math.sin(elapsed*.21),currentYaw+.09*Math.sin(elapsed*.115),0);
  if(halo){const phase=elapsed*1.6;halo.scale.setScalar(1+.2*Math.sin(phase));halo.material.opacity=.5+.24*Math.sin(phase)}
  if(cloudMesh&&cloudMesh.visible)cloudMesh.rotation.y+=dt*.007;
  if(stars)stars.rotation.z=elapsed*.001;
  camera.position.z=baseDistance/zoom;
  camera.lookAt(0,0,0);
  renderer.render(scene,camera);
  updateMarker();
  raf=requestAnimationFrame(frame);
 }
 function attachControls(){
  const ray=new T.Raycaster(),mouse=new T.Vector2();
  const getHit=e=>{
    const r=canvas.getBoundingClientRect();
    mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
    ray.setFromCamera(mouse,camera);
    return ray.intersectObject(hitSphere,false).length>0;
  };
  canvas.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1){dragDist=0;suppressClick=false}
    if(pointers.size===2){pinchDist=0;suppressClick=true}
    canvas.setPointerCapture?.(e.pointerId);
  });
  canvas.addEventListener('pointermove',e=>{
    if(!pointers.has(e.pointerId))return;
    const prev=pointers.get(e.pointerId),dx=e.clientX-prev.x,dy=e.clientY-prev.y;
    dragDist+=Math.abs(dx)+Math.abs(dy);
    if(dragDist>6)suppressClick=true;
    pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===2){
      const [a,b]=[...pointers.values()];
      const dist=Math.hypot(a.x-b.x,a.y-b.y);
      if(pinchDist>0)targetZoom=clamp(targetZoom*clamp(dist/pinchDist,.76,1.28),.85,2.1);
      pinchDist=dist;
    }else{
      yaw+=dx*.0046;
      pitch=clamp(pitch+dy*.0046,-1,1);
    }
    canvas.classList.add('is-dragging');
  },{passive:true});
  const finish=e=>{
    pointers.delete(e.pointerId);
    try{canvas.releasePointerCapture?.(e.pointerId)}catch{}
    if(pointers.size<2)pinchDist=0;
    if(pointers.size===0)canvas.classList.remove('is-dragging');
  };
  canvas.addEventListener('pointerup',finish);
  canvas.addEventListener('pointercancel',finish);
  canvas.addEventListener('click',e=>{
    if(suppressClick){suppressClick=false;return}
    if(getHit(e))openPortfolio();
  });
  canvas.addEventListener('wheel',e=>{
    if(portal.hidden)return;
    e.preventDefault();
    targetZoom=clamp(targetZoom*(e.deltaY<0?1.12:.89),.85,2.1);
  },{passive:false});
 }
 function fallback(){
  canvas.hidden=true;reset.hidden=true;staticScene.hidden=false;marker.hidden=false;
  marker.style.left='51%';marker.style.top='46%';
  // The fallback only provides a stylized view. It never claims to be 3D.
  document.body.classList.add('earth-static-mode');
 }
 window.addEventListener('resize',()=>{
   clearTimeout(window.__earthResize);
   window.__earthResize=setTimeout(()=>{resize();if(reduced.matches)renderOnce()},120);
 },{passive:true});
 async function init(){
  labelUpdate();
  const deepLink=location.hash&&location.hash!=='#home'&&$$('main section').some(el=>'#'+el.id===location.hash);
  if(deepLink){portal.hidden=true;document.body.classList.remove('earth-gateway-open');concealBehind(false)}
  else showPortal();
  if(!setup3D()){fallback();return}
  if(active){
    if(reduced.matches)renderOnce();
    else start();
  }
 }
 init();
})();