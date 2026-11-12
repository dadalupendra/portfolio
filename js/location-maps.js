/* Place cards: real Google Maps coordinates supplied by the portfolio owner.
   No Maps API key. Iframes load only after the user chooses Show map. */
(() => {
  'use strict';
  const places = Object.freeze({
    misaki: {
      lat:35.6961095,lng:139.7090098,
      link:'https://maps.google.com/?cid=13326173137837470062',
      photo:'images/misaki.jpg',
      names:{en:'Kaiten Sushi Misaki — Shinjuku East Side Square',ja:'回転寿司みさき 新宿イーストサイドスクエア店',ne:'काइतेन सुशी मिसाकी — शिन्जुकु इस्ट साइड स्क्वायर',hi:'काइतेन सुशी मिसाकी — शिंजुकु ईस्ट साइड स्क्वायर',zh:'回转寿司 Misaki — 新宿 East Side Square',ko:'회전초밥 미사키 — 신주쿠 이스트 사이드 스퀘어'},
      address:{en:'Shinjuku East Side Square B1F, Shinjuku, Tokyo, Japan',ja:'東京都新宿区 新宿イーストサイドスクエア B1F',ne:'शिन्जुकु इस्ट साइड स्क्वायर B1F, टोकियो, जापान',hi:'शिंजुकु ईस्ट साइड स्क्वायर B1F, टोक्यो, जापान',zh:'日本东京都新宿区 新宿 East Side Square B1F',ko:'일본 도쿄 신주쿠 이스트 사이드 스퀘어 B1F'}
    },
    ttc: {
      lat:35.7064974,lng:139.6853488,
      link:'https://maps.google.com/?cid=18049602238910089556',
      photo:'images/tokyo-technical-college.jpg',
      names:{en:'Tokyo Technical College — Information Processing',ja:'専門学校東京テクニカルカレッジ 情報処理科',ne:'टोकियो टेक्निकल कलेज — सूचना प्रशोधन',hi:'टोक्यो टेक्निकल कॉलेज — सूचना प्रसंस्करण',zh:'东京技术专门学校 — 信息处理',ko:'도쿄 테크니컬 칼리지 — 정보처리'},
      address:{en:'4-2-3 Higashinakano, Nakano City, Tokyo, Japan',ja:'東京都中野区東中野4丁目2番3号',ne:'हिगाशिनाकानो ४-२-३, नाकानो, टोकियो, जापान',hi:'हिगाशिनाकानो 4-2-3, नाकानो, टोक्यो, जापान',zh:'日本东京都中野区东中野4丁目2番3号',ko:'일본 도쿄 나카노구 히가시나카노 4-2-3'}
    },
    sampal: {
      lat:29.9470454,lng:80.6626123,
      link:'https://maps.google.com/?cid=2668171649872943203',
      photo:'images/sampal-school.jpg',
      names:{en:'Shree Sampal Secondary School, Sunsera',ja:'シュリー・サンパル中等学校（スンセラ）',ne:'श्री सम्पाल माध्यमिक विद्यालय, सुनसेरा',hi:'श्री सम्पाल माध्यमिक विद्यालय, सुनसेरा',zh:'Shree Sampal 中学（Sunsera）',ko:'Shree Sampal 중등학교, Sunsera'},
      address:{en:'Byans-4, Sunsera, Darchula, Nepal',ja:'ネパール・ダルチュラ、ビャンス4・スンセラ',ne:'ब्याँस–४, सुनसेरा, दार्चुला, नेपाल',hi:'ब्याँस-4, सुनसेरा, दार्चुला, नेपाल',zh:'尼泊尔达尔楚拉 Byans-4，Sunsera',ko:'네팔 다르출라 Byans-4, Sunsera'}
    },
    siddha: {
      lat:29.9223567,lng:80.6681549,
      link:'https://maps.google.com/?cid=16045468399624881930',
      photo:'images/siddha-school.jpg',
      names:{en:'Shree Siddha Secondary School, Sina',ja:'シュリー・シッダ中等学校（シナ）',ne:'श्री सिद्ध माध्यमिक विद्यालय, सिना',hi:'श्री सिद्ध माध्यमिक विद्यालय, सिना',zh:'Shree Siddha 中学（Sina）',ko:'Shree Siddha 중등학교, Sina'},
      address:{en:'Byans-3, Sina, Darchula, Nepal',ja:'ネパール・ダルチュラ、ビャンス3・シナ',ne:'ब्याँस–३, सिना, दार्चुला, नेपाल',hi:'ब्याँस-3, सिना, दार्चुला, नेपाल',zh:'尼泊尔达尔楚拉 Byans-3，Sina',ko:'네팔 다르출라 Byans-3, Sina'}
    }
  });
  const words = {
    en:{maps:'📍 Open in Google Maps ↗',show:'Show map',hide:'Hide map',photo:'Location photo not added yet',mapOf:'Map of'},
    ja:{maps:'📍 Googleマップで開く ↗',show:'地図を表示',hide:'地図を閉じる',photo:'写真はまだ登録されていません',mapOf:'地図：'},
    ne:{maps:'📍 Google Maps मा खोल्नुहोस् ↗',show:'नक्सा देखाउनुहोस्',hide:'नक्सा लुकाउनुहोस्',photo:'स्थानको फोटो अझै थपिएको छैन',mapOf:'नक्सा:'},
    hi:{maps:'📍 Google Maps में खोलें ↗',show:'नक्शा दिखाएँ',hide:'नक्शा छिपाएँ',photo:'स्थान की फोटो अभी नहीं जोड़ी गई',mapOf:'मानचित्र:'},
    zh:{maps:'📍 在 Google 地图中打开 ↗',show:'显示地图',hide:'隐藏地图',photo:'尚未添加地点照片',mapOf:'地图：'},
    ko:{maps:'📍 Google 지도에서 열기 ↗',show:'지도 보기',hide:'지도 닫기',photo:'장소 사진이 아직 없습니다',mapOf:'지도:'}
  };
  const languageSupported = l=>words[l]?l:'en';
  const cards = Array.from(document.querySelectorAll('[data-place-id]'));
  const mapIds = new Set();
  for (const card of cards) {
    const key=card.dataset.placeId;
    const p=places[key];
    if (!p) continue;
    const isExperience = card.closest('#experience');
    const prefix = isExperience ? 'experience' : 'education';
    const id = 'location-map-'+prefix+'-'+key+'-'+cards.indexOf(card);
    if(mapIds.has(id))continue;mapIds.add(id);
    const area=document.createElement('div');
    area.className='place-details';
    const photoArea=document.createElement('div');photoArea.className='place-photo';
    const pic=document.createElement('img');
    pic.src=p.photo;pic.loading='lazy';pic.decoding='async';pic.alt='';
    const fallback=document.createElement('div');fallback.className='place-photo-placeholder';
    const icon=document.createElement('span');icon.setAttribute('aria-hidden','true');icon.textContent='📍';
    const label=document.createElement('span');label.className='place-photo-label';
    fallback.append(icon,label);
    photoArea.append(pic,fallback);
    pic.addEventListener('load',()=>{
      pic.classList.add('loaded');
      fallback.hidden=true;
      pic.alt=p.names[document.documentElement.lang] || p.names.en;
    });
    pic.addEventListener('error',()=>{pic.hidden=true;fallback.hidden=false});
    const address=document.createElement('p');address.className='place-address';
    const placeName=document.createElement('strong');placeName.className='place-name';
    const addressDetail=document.createElement('span');addressDetail.className='place-address-detail';
    address.append(placeName,addressDetail);
    const actions=document.createElement('div');actions.className='place-actions';
    const mapsLink=document.createElement('a');
    mapsLink.href=p.link;mapsLink.target='_blank';mapsLink.rel='noopener noreferrer';
    mapsLink.className='place-map-link';
    const toggle=document.createElement('button');toggle.type='button';
    toggle.className='place-map-toggle';
    toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',id);
    const panel=document.createElement('div');
    panel.className='place-map-panel';panel.id=id;panel.hidden=true;
    const updateToggle=()=>{
      const l=languageSupported(document.documentElement.lang);
      toggle.textContent=panel.hidden?words[l].show:words[l].hide;
    };
    toggle.addEventListener('click',()=>{
      const opening=panel.hidden;
      panel.hidden=!opening;
      toggle.setAttribute('aria-expanded',String(opening));
      if(opening&&!panel.querySelector('iframe')){
        const iframe=document.createElement('iframe');
        iframe.src='https://www.google.com/maps?q='+p.lat+','+p.lng+'&z=16&output=embed';
        iframe.loading='lazy';
        iframe.referrerPolicy='no-referrer-when-downgrade';
        iframe.setAttribute('allowfullscreen','');
        iframe.title=words[languageSupported(document.documentElement.lang)].mapOf+' '+p.names[languageSupported(document.documentElement.lang)];
        panel.appendChild(iframe);
      }
      updateToggle();
    });
    actions.append(mapsLink,toggle);
    area.append(photoArea,address,actions,panel);
    card.prepend(area);
    card.dataset.placeReady='true';
    card._placeText={p,pic,label,mapsLink,addressDetail,placeName,panel,updateToggle};
  }
  const refresh=(language)=>{
    const l=languageSupported(language);
    for(const card of cards){
      const record=card._placeText;if(!record)continue;
      const {p,pic,label,mapsLink,addressDetail,placeName,panel,updateToggle}=record;
      placeName.textContent=p.names[l];
      addressDetail.textContent=p.address[l];
      label.textContent=words[l].photo;
      mapsLink.textContent=words[l].maps;
      if(pic.classList.contains('loaded'))pic.alt=p.names[l];
      const frame=panel.querySelector('iframe');
      if(frame)frame.title=words[l].mapOf+' '+p.names[l];
      updateToggle();
    }
  };
  window.refreshPortfolioMaps=refresh;
  refresh(document.documentElement.lang);
})();
