/* Nepal 3D entry map — real extruded Three.js geometry from 77 district boundaries.
   Data: Acesmndr/nepal-geojson (MIT, c 2018 Aashish Manandhar).
   Boundaries simplified for visual navigation, not a cadastral/survey map.
   No accounts, tokens, tracking, terrain-height claims or build steps.
*/
(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const portal=$('#npPortal'),stage=$('#npMapStage'),canvas=$('#npMapCanvas');
if(!portal||!stage||!canvas)return;
const marker=$('#npDarchulaMarker'),entry=$('#npPortalEnter'),skip=$('#npSkipMap'),reopen=$('#npMapReopen');
const hint=$('#npHoverText'),langPicker=$('#npPortalLanguage');
const controlTargets=$$('.site-header,main,.footer,.print-cv').filter(Boolean);
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 690px)');
const words={
en:{eyebrow:'INTERACTIVE 3D NEPAL MAP',titleA:'From Nepal,',titleB:'to my portfolio.',intro:'Explore the real district boundaries of Nepal. Darchula, my home district, is highlighted in cyan. Click Darchula to enter my interactive portfolio.',pathCountry:'NEPAL',pathDistrict:'DARCHULA',pathPortfolio:'MY PORTFOLIO',enter:'📍 Enter via Darchula ↗',skip:'Skip map / Open portfolio',mapLabel:'NEPAL · 77 DISTRICTS',mapCount:'REAL BOUNDARIES · 3D',hover:'Point to Darchula or choose the highlighted district.',darchula:'DARCHULA · CLICK TO ENTER',district:'District:',other:'Select Darchula to open my portfolio.',loading:'Loading district map…',fallback:'Interactive map unavailable; use the Enter via Darchula button.',source:'Visual map boundaries simplified from the MIT-licensed Nepal GeoJSON dataset.',sourceLink:'Map data / license',status:'CLICK DARCHULA TO ENTER',reopen:'Reopen interactive Nepal map'},
ja:{eyebrow:'ネパールの3Dインタラクティブ地図',titleA:'ネパールから、',titleB:'私のポートフォリオへ。',intro:'ネパール77地区の境界をもとにした3D地図です。出身地ダルチュラを水色で強調しています。ダルチュラを選ぶとポートフォリオが開きます。',pathCountry:'ネパール',pathDistrict:'ダルチュラ',pathPortfolio:'ポートフォリオ',enter:'📍 ダルチュラから開く ↗',skip:'地図をスキップして開く',mapLabel:'ネパール · 77地区',mapCount:'実際の境界データ · 3D',hover:'ダルチュラを選んでください。',darchula:'ダルチュラ · ここから入る',district:'地区：',other:'ポートフォリオを開くにはダルチュラを選んでください。',loading:'地図を読み込んでいます…',fallback:'3D地図を利用できません。「ダルチュラから開く」を押してください。',source:'MITライセンスのネパールGeoJSONを簡略化して表示しています。',sourceLink:'地図データ / ライセンス',status:'ダルチュラから入る',reopen:'3Dネパール地図を開く'},
ne:{eyebrow:'नेपालको अन्तरक्रियात्मक 3D नक्सा',titleA:'नेपालबाट,',titleB:'मेरो पोर्टफोलियोसम्म।',intro:'नेपालका ७७ जिल्लाको वास्तविक सीमाको आधारमा बनेको 3D नक्सा हेर्नुहोस्। मेरो गृहजिल्ला दार्चुला निलो रङमा देखाइएको छ। दार्चुलामा क्लिक गरेपछि मेरो पोर्टफोलियो खुल्छ।',pathCountry:'नेपाल',pathDistrict:'दार्चुला',pathPortfolio:'मेरो पोर्टफोलियो',enter:'📍 दार्चुला क्लिक गरेर खोल्नुहोस् ↗',skip:'नक्सा छोडेर पोर्टफोलियो खोल्नुहोस्',mapLabel:'नेपाल · ७७ जिल्ला',mapCount:'वास्तविक सीमा · 3D',hover:'दार्चुलामा क्लिक गर्नुहोस् वा चम्किएको जिल्ला छान्नुहोस्।',darchula:'दार्चुला · पोर्टफोलियो खोल्नुहोस्',district:'जिल्ला:',other:'पोर्टफोलियो खोल्न दार्चुला छान्नुहोस्।',loading:'नक्सा लोड हुँदैछ…',fallback:'3D नक्सा उपलब्ध भएन। दार्चुलाबाट खोल्ने बटन थिच्नुहोस्।',source:'नक्साको सीमा MIT अनुमति भएको Nepal GeoJSON बाट दृश्यका लागि सरल बनाइएको हो।',sourceLink:'नक्सा स्रोत / लाइसेन्स',status:'दार्चुलाबाट प्रवेश',reopen:'नेपालको 3D नक्सा फेरि खोल्नुहोस्'},
hi:{eyebrow:'नेपाल का इंटरएक्टिव 3D नक्शा',titleA:'नेपाल से,',titleB:'मेरे पोर्टफोलियो तक।',intro:'नेपाल के 77 जिलों की वास्तविक सीमाओं पर आधारित 3D नक्शा देखें। मेरे गृह-जिले दार्चुला को सियान रंग में दिखाया गया है। दार्चुला पर क्लिक करके पोर्टफोलियो खोलें।',pathCountry:'नेपाल',pathDistrict:'दार्चुला',pathPortfolio:'मेरा पोर्टफोलियो',enter:'📍 दार्चुला से खोलें ↗',skip:'नक्शा छोड़कर पोर्टफोलियो खोलें',mapLabel:'नेपाल · 77 जिले',mapCount:'वास्तविक सीमाएँ · 3D',hover:'दार्चुला पर क्लिक करें।',darchula:'दार्चुला · यहाँ क्लिक करें',district:'जिला:',other:'पोर्टफोलियो खोलने के लिए दार्चुला चुनें।',loading:'नक्शा लोड हो रहा है…',fallback:'3D नक्शा उपलब्ध नहीं है। प्रवेश बटन दबाएँ।',source:'MIT-लाइसेंस वाले नेपाल GeoJSON की सरलीकृत सीमाएँ।',sourceLink:'नक्शा डेटा / लाइसेंस',status:'दार्चुला से प्रवेश',reopen:'नेपाल का 3D नक्शा खोलें'},
zh:{eyebrow:'尼泊尔互动 3D 地图',titleA:'从尼泊尔，',titleB:'走进我的作品集。',intro:'根据尼泊尔77个地区的边界数据绘制的三维地图。我的家乡地区 Darchula 以青色高亮，点击即可进入作品集。',pathCountry:'尼泊尔',pathDistrict:'Darchula',pathPortfolio:'我的作品集',enter:'📍 从 Darchula 进入 ↗',skip:'跳过地图并打开作品集',mapLabel:'尼泊尔 · 77个地区',mapCount:'真实边界数据 · 3D',hover:'请选择高亮的 Darchula 地区。',darchula:'DARCHULA · 点击进入',district:'地区：',other:'请选择 Darchula 进入作品集。',loading:'正在加载地图…',fallback:'无法加载三维地图，请使用进入按钮。',source:'使用 MIT 许可的 Nepal GeoJSON 简化边界进行可视化。',sourceLink:'地图数据与许可证',status:'点击 DARCHULA 进入',reopen:'重新打开尼泊尔3D地图'},
ko:{eyebrow:'네팔 인터랙티브 3D 지도',titleA:'네팔에서,',titleB:'나의 포트폴리오로.',intro:'네팔 77개 지역의 실제 경계 데이터를 이용한 3D 지도입니다. 고향 지역 Darchula가 청록색으로 표시되며 클릭하면 포트폴리오가 열립니다.',pathCountry:'네팔',pathDistrict:'Darchula',pathPortfolio:'포트폴리오',enter:'📍 Darchula에서 열기 ↗',skip:'지도 건너뛰고 포트폴리오 열기',mapLabel:'네팔 · 77개 지역',mapCount:'실제 경계 데이터 · 3D',hover:'강조된 Darchula 지역을 선택하세요.',darchula:'DARCHULA · 입장',district:'지역:',other:'포트폴리오에 들어가려면 Darchula를 선택하세요.',loading:'지도를 불러오는 중…',fallback:'3D 지도를 사용할 수 없습니다. 입장 버튼을 이용하세요.',source:'MIT 허가 Nepal GeoJSON의 경계를 시각화용으로 단순화했습니다.',sourceLink:'지도 데이터 / 라이선스',status:'DARCHULA를 클릭해 입장',reopen:'네팔 3D 지도 다시 열기'}
};
let locale='en',districts=[],scene=null,renderer=null,camera=null,mapGroup=null,mapMeshes=[],mapIsActive=false,raf=0,last=0,time=0;
let meshDarchula=null,anchor=null,prevFocus=null,selectedHover='',mouseX=0,mouseY=0,raycaster=null,pointer=null,hasMap=false;
let limits={minLon:80,minLat:26,maxLon:89,maxLat:31},coordCenter={x:84.5,y:28.5};
let fallbackSVG=null;let frameSkip=0;
function lang(){return words[document.documentElement.lang]?document.documentElement.lang:'en'}
function tr(k){return words[locale][k]||words.en[k]||k}
function translate(){
 locale=lang();
 $$('[data-np-i18n]').forEach(el=>{const k=el.dataset.npI18n;if(words[locale][k])el.textContent=words[locale][k]});
 if(langPicker)langPicker.value=locale;
 if(reopen)reopen.setAttribute('aria-label',tr('reopen'));
 if(marker)marker.setAttribute('aria-label',tr('darchula'));
 if(canvas)canvas.setAttribute('aria-label',tr('mapLabel')+'. '+tr('hover'));
 if(!selectedHover)hint.textContent=tr('hover');
}
function setInert(active){controlTargets.forEach(el=>{el.inert=active})}
function openPortfolio(){
 portal.hidden=true;
 document.body.classList.remove('np-gateway-open');
 setInert(false);mapIsActive=false;stop();
 window.scrollTo({top:0,behavior:'auto'});
 const first=$('#main');
 if(first){first.tabIndex=-1;first.focus({preventScroll:true});}
}
function showPortal(){
 prevFocus=document.activeElement;
 portal.hidden=false;
 document.body.classList.add('np-gateway-open');
 window.scrollTo({top:0,behavior:'auto'});
 setInert(true);
 mapIsActive=true;
 translate();
 if(hasMap&&!reduce.matches)start();
 requestAnimationFrame(()=>{resize();entry.focus({preventScroll:true});});
}
entry?.addEventListener('click',openPortfolio);
skip?.addEventListener('click',openPortfolio);
marker?.addEventListener('click',openPortfolio);
reopen?.addEventListener('click',showPortal);
document.addEventListener('keydown',event=>{
 if(portal.hidden)return;
 if(event.key==='Escape'){event.preventDefault();openPortfolio();return}
 if(event.key!=='Tab')return;
 const focusables=$$('#npPortal button:not([disabled]):not([hidden]),#npPortal select,#npPortal a[href]').filter(el=>!el.hidden&&el.getClientRects().length>0);
 if(!focusables.length)return;
 const first=focusables[0],last=focusables.at(-1);
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
langPicker?.addEventListener('change',e=>{
 const existing=$('#siteLanguage');if(existing){existing.value=e.target.value;existing.dispatchEvent(new Event('change',{bubbles:true}))}
 else{document.documentElement.lang=e.target.value;translate()}
});
new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0}
function start(){if(!raf&&mapIsActive&&!document.hidden&&!reduce.matches&&hasMap)raf=requestAnimationFrame(tick)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else start()});
reduce.addEventListener?.('change',()=>{
 if(reduce.matches){stop();renderSVG()}
 else {
   if(fallbackSVG)fallbackSVG.hidden=true;
   canvas.hidden=false;
   if(!hasMap&&districts.length){try{plotGeo()}catch(e){renderSVG();return}}
   if(hasMap){resize();start()}
 }
});
function getColor(){return document.documentElement.dataset.theme==='light'?
 {base:0x8ad1f4,side:0x6badd2,outline:0x3985b3,hot:0x0086a0,hotEmissive:0x00ccd1,point:0x129ab8}:
 {base:0x083d6e,side:0x082845,outline:0x238bb6,hot:0x05b8cf,hotEmissive:0x00e7de,point:0x69edf6};}
function coordToWorld(lon,lat,z=0){
 return new THREE.Vector3((lon-coordCenter.x)*1.45,(lat-coordCenter.y)*1.45,z)
}
function centroid(ring){
 let sum=0,x=0,y=0;
 for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length],cross=a[0]*b[1]-b[0]*a[1];sum+=cross;x+=(a[0]+b[0])*cross;y+=(a[1]+b[1])*cross}
 if(Math.abs(sum)>1e-8)return [x/(3*sum),y/(3*sum)];
 return ring.reduce((a,p)=>[a[0]+p[0]/ring.length,a[1]+p[1]/ring.length],[0,0]);
}
function setHint(label,onlyDarchula=false){
 selectedHover=onlyDarchula?label:'';
 hint.textContent=label;
}
function plotGeo(){
 const T=window.THREE;if(!T||reduce.matches)throw Error('WebGL disabled or reduced-motion enabled');
 renderer=new T.WebGLRenderer({canvas,alpha:true,antialias:!mobile.matches,powerPreference:mobile.matches?'low-power':'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
 renderer.setClearColor(0x000000,0);
 scene=new T.Scene();camera=new T.PerspectiveCamera(43,1,.1,100);camera.position.set(0,1,18);
 mapGroup=new T.Group();mapGroup.rotation.x=-.24;mapGroup.rotation.y=.03;scene.add(mapGroup);
 const ambient=new T.AmbientLight(0xa9e7ff,1.1);scene.add(ambient);
 const key=new T.DirectionalLight(0x84f9ff,2);key.position.set(-5,7,10);scene.add(key);
 const warm=new T.DirectionalLight(0x1ca6ed,.78);warm.position.set(8,-6,3);scene.add(warm);
 const colors=getColor();
 for(const d of districts){
  for(const ring of d.r){
    if(ring.length<3)continue;
    const shape=new T.Shape();
    const first=coordToWorld(ring[0][0],ring[0][1]);
    shape.moveTo(first.x,first.y);
    ring.slice(1).forEach(([lon,lat])=>{const v=coordToWorld(lon,lat);shape.lineTo(v.x,v.y)});
    shape.closePath();
    const hot=d.n.toUpperCase()==='DARCHULA';
    const geometry=new T.ExtrudeGeometry(shape,{depth:hot?.34:.13,steps:1,bevelEnabled:true,bevelThickness:.013,bevelSize:.011,bevelSegments:1});
    const side=new T.MeshStandardMaterial({color:colors.side,metalness:.26,roughness:.42,transparent:false});
    const top=new T.MeshStandardMaterial({color:hot?colors.hot:colors.base,emissive:hot?colors.hotEmissive:0x081d32,emissiveIntensity:hot?.52:.07,metalness:.3,roughness:.39});
    const mesh=new T.Mesh(geometry,[top,side]);
    mesh.userData={district:d.n,hot};mesh.renderOrder=hot?2:1;
    mapGroup.add(mesh);mapMeshes.push(mesh);
    if(hot)meshDarchula=mesh;
    const edge=new T.LineSegments(new T.EdgesGeometry(geometry,12),new T.LineBasicMaterial({color:hot?0x83fff6:colors.outline,transparent:true,opacity:hot?.92:.45,depthWrite:false}));
    mapGroup.add(edge);
  }
 }
 const d=districts.find(x=>x.n.toUpperCase()==='DARCHULA');
 const c=centroid(d.r[0]);anchor=coordToWorld(c[0],c[1],.5);
 const ringGeo=new T.RingGeometry(.13,.19,32);
 const ring=new T.Mesh(ringGeo,new T.MeshBasicMaterial({color:0xa0fff6,side:T.DoubleSide,transparent:true,opacity:.94,depthWrite:false}));
 ring.position.copy(anchor);ring.renderOrder=8;mapGroup.add(ring);
 const pointNum=mobile.matches?56:150;
 const points=[];
 for(let i=0;i<pointNum;i++){const r=8+Math.random()*10,a=Math.random()*Math.PI*2;points.push(Math.cos(a)*r,(Math.random()-.5)*11,Math.sin(a)*2-6)}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));
 const cloud=new T.Points(g,new T.PointsMaterial({color:colors.point,size:mobile.matches?.065:.105,transparent:true,opacity:.65,depthWrite:false}));
 scene.add(cloud);scene.userData.cloud=cloud;
 raycaster=new T.Raycaster();pointer=new T.Vector2();
 resize();
 hasMap=true;marker.hidden=false;
 canvas.classList.remove('np-map-hover');
 stage.addEventListener('pointermove',onPointerMove,{passive:true});
 stage.addEventListener('pointerleave',()=>{mouseX=0;mouseY=0;canvas.classList.remove('np-map-hover');setHint(tr('hover'))});
 canvas.addEventListener('click',onMapClick);
}
function resize(){
 if(!renderer||!camera)return;
 const w=Math.max(240,stage.clientWidth),h=Math.max(210,stage.clientHeight);
 renderer.setSize(w,h,false);camera.aspect=w/h;
 camera.position.z=mobile.matches?22:((w/h)<1.3?20:17.5);
 camera.updateProjectionMatrix();
 if(renderer.domElement!==canvas)return;
 updateMarker();
}
function getHovered(event){
 if(!renderer||!camera||!raycaster||!pointer||!mapGroup)return null;
 const rect=canvas.getBoundingClientRect();
 pointer.set((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
 raycaster.setFromCamera(pointer,camera);
 return raycaster.intersectObjects(mapMeshes,false).find(hit=>hit.object.userData?.district)?.object||null;
}
function onPointerMove(e){
 if(e.target.closest('#npDarchulaMarker'))return;
 const rect=stage.getBoundingClientRect();
 mouseX=(e.clientX-rect.left)/rect.width*2-1;
 mouseY=(e.clientY-rect.top)/rect.height*2-1;
 if(mobile.matches)return;
 const hit=getHovered(e);const name=hit?.userData?.district||'';
 if(name.toUpperCase()==='DARCHULA'){
   canvas.classList.add('np-map-hover');setHint(tr('darchula'),true);
 }else if(name){canvas.classList.remove('np-map-hover');setHint(tr('district')+' '+name+' · '+tr('other'),true)}
 else{canvas.classList.remove('np-map-hover');setHint(tr('hover'))}
}
function onMapClick(e){
 const hit=getHovered(e);
 if(hit?.userData?.hot){openPortfolio();}
 else if(hit?.userData?.district){setHint(tr('district')+' '+hit.userData.district+' · '+tr('other'),true)}
}
function updateMarker(){
 if(!marker||!anchor||!mapGroup||!camera||!renderer)return;
 mapGroup.updateMatrixWorld(true);camera.updateMatrixWorld(true);
 const screen=anchor.clone().applyMatrix4(mapGroup.matrixWorld).project(camera);
 if(screen.z>1||screen.z< -1){marker.hidden=true;return}
 const r=stage.getBoundingClientRect(),px=(screen.x*.5+.5)*r.width,py=(-screen.y*.5+.5)*r.height;
 marker.hidden=false;
 marker.style.left=Math.max(88,Math.min(r.width-88,px))+'px';
 marker.style.top=Math.max(48,Math.min(r.height-35,py))+'px';
}
function tick(now){
 raf=0;if(!mapIsActive||document.hidden||reduce.matches||!renderer||!hasMap)return;
 const budget=mobile.matches?50:33;
 if(last&&now-last<budget){raf=requestAnimationFrame(tick);return}
 const dt=last?Math.min((now-last)/1000,.08):.033;last=now;time+=dt;
 if(mapGroup){
   mapGroup.rotation.x+=( -.24 - mouseY*.075-mapGroup.rotation.x)*.035;
   mapGroup.rotation.y+=( .01 + mouseX*.085+Math.sin(time*.17)*.055-mapGroup.rotation.y)*.025;
   mapGroup.position.z=Math.sin(time*.48)*.07;
 }
 if(meshDarchula){const m=meshDarchula.material[0];m.emissiveIntensity=.46+Math.sin(time*1.7)*.15}
 const cloud=scene.userData.cloud;if(cloud)cloud.rotation.z=time*.004;
 renderer.render(scene,camera);
 if(!mobile.matches||frameSkip++%3===0)updateMarker();
 raf=requestAnimationFrame(tick);
}
function renderSVG(){
 if(!districts.length)return;
 stop();if(canvas)canvas.hidden=true;if(marker)marker.hidden=true;
 if(fallbackSVG){fallbackSVG.hidden=false;return}
 const NS='http://www.w3.org/2000/svg';
 fallbackSVG=document.createElementNS(NS,'svg');fallbackSVG.classList.add('np-geo-fallback');
 fallbackSVG.setAttribute('viewBox','0 0 1200 650');fallbackSVG.setAttribute('role','img');fallbackSVG.setAttribute('aria-label','Nepal district map with Darchula highlighted');
 for(const d of districts){
   for(const ring of d.r){
    const el=document.createElementNS(NS,'path');
    const coords=ring.map(([lon,lat])=>[(lon-limits.minLon)/(limits.maxLon-limits.minLon)*1120+40,(limits.maxLat-lat)/(limits.maxLat-limits.minLat)*540+55]);
    el.setAttribute('d',coords.map(([x,y],i)=>(i?'L':'M')+x.toFixed(2)+','+y.toFixed(2)).join(' ')+'Z');
    const hot=d.n.toUpperCase()==='DARCHULA';
    el.setAttribute('aria-label',d.n+(hot?' — enter portfolio':''));
    el.setAttribute('tabindex',hot?'0':'-1');
    if(hot){
      el.classList.add('np-darchula-svg');
      el.setAttribute('role','button');
      el.addEventListener('click',openPortfolio);
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPortfolio();}});
    }
    const title=document.createElementNS(NS,'title');title.textContent=d.n;el.appendChild(title);fallbackSVG.appendChild(el);
   }
 }
 stage.insertBefore(fallbackSVG,canvas);hint.textContent=tr('hover');
}
window.addEventListener('resize',()=>{clearTimeout(window.__npResizeTimer);window.__npResizeTimer=setTimeout(()=>{resize()},110)},{passive:true});
new MutationObserver(()=>{
 if(!scene)return;
 const c=getColor();
 mapMeshes.forEach(m=>{const hot=m.userData.hot;m.material[0].color.setHex(hot?c.hot:c.base);m.material[1].color.setHex(c.side)});
 scene.userData.cloud?.material.color.setHex(c.point);
}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
async function init(){
 translate();
 const requested=location.hash&&location.hash!=='#home'&&$$('main section').some(el=>'#'+el.id===location.hash);
 if(requested){portal.hidden=true;document.body.classList.remove('np-gateway-open');setInert(false);}
 else {showPortal();hint.textContent=tr('loading');}
 try{
  const response=await fetch('data/nepal-districts-lite.json',{cache:'force-cache'});
  if(!response.ok)throw Error('Map JSON response '+response.status);
  const data=await response.json();districts=data.districts;
  if(districts?.length!==77||!districts.some(d=>d.n.toUpperCase()==='DARCHULA'))throw Error('Incomplete district data');
  const pts=districts.flatMap(d=>d.r.flat());limits={minLon:Math.min(...pts.map(p=>p[0])),minLat:Math.min(...pts.map(p=>p[1])),maxLon:Math.max(...pts.map(p=>p[0])),maxLat:Math.max(...pts.map(p=>p[1]))};
  coordCenter={x:(limits.minLon+limits.maxLon)/2,y:(limits.minLat+limits.maxLat)/2};
  if(reduce.matches||!window.THREE){renderSVG();return}
  try{plotGeo();if(mapIsActive)start();setHint(tr('hover'))}catch(e){console.warn('3D Nepal map unavailable; showing SVG fallback',e);renderSVG()}
 }catch(err){console.warn('Nepal map data unavailable',err);canvas.hidden=true;marker.hidden=true;hint.textContent=tr('fallback')}
}
init();
})();