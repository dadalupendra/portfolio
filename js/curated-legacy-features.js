/* Selectively reused from the uploaded My Profile archive:
   three-language personal introduction, current real work, education timeline
   and featured published project. No demo URLs, unverified statistics or local
   document-vault data are imported.
*/
(()=>{
'use strict';
const translations={
en:{
 featuredLabel:'🚀 PUBLISHED PROJECT',featuredHeading:'NPL 2026 Cricket Information Website',
 featuredDesc:'A real, published fan-built website based on my own HTML project. It contains historical NPL information, player pages and cricket statistics. Live score updates depend on external providers and are not guaranteed.',
 featuredOpen:'Open published website ↗',featuredCode:'View source on GitHub ↗',
 bioHeading:'Meet me in three languages',bioLead:'A short personal introduction in English, Japanese and Nepali. Choose one to read.',
 buildingHeading:'Currently building',buildingLead:'A selection of my actual projects and coursework. Unfinished projects are not presented as completed products.',
 buildingOne:'📚 NextStep Study · In development',buildingTwo:'🍽️ QR Menu Generator · In development',buildingThree:'🏏 NPL 2026 · Published website',buildingFour:'🌶️ Nepal Spice · School project',buildingView:'Explore actual projects ↗',
 journeyHeading:'My education journey',journeyLead:'From school in Darchula, Nepal, to Information Processing in Tokyo. Select a stage for its details and location map.',
 journeyOne:'Up to Grade 10 · Shree Siddha Secondary School',journeyOneSub:'Sina, Darchula, Nepal',journeyTwo:'Grade XII · Shree Sampal Secondary School',journeyTwoSub:'Sunsera · 2078 B.S. · GPA 2.73',journeyThree:'Information Processing · Tokyo Technical College',journeyThreeSub:'Higashinakano, Tokyo, Japan',journeyOpen:'View school & map ↗'
},
ja:{
 featuredLabel:'🚀 公開済みプロジェクト',featuredHeading:'NPL 2026 クリケット情報サイト',
 featuredDesc:'自分で制作したHTMLを使って公開した独立ファンサイトです。過去のNPL情報、選手ページ、統計などを掲載しています。ライブスコアの更新は外部データ提供元に依存し、保証されません。',
 featuredOpen:'公開サイトを見る ↗',featuredCode:'GitHubでソースを見る ↗',
 bioHeading:'3つの言語で自己紹介',bioLead:'英語・日本語・ネパール語で書いた短い自己紹介です。言語を選んでください。',
 buildingHeading:'現在取り組んでいること',buildingLead:'実際の制作や学校課題を紹介しています。開発中のものを完成済みとは表示しません。',
 buildingOne:'📚 NextStep Study · 開発中',buildingTwo:'🍽️ QR Menu Generator · 開発中',buildingThree:'🏏 NPL 2026 · 公開中',buildingFour:'🌶️ Nepal Spice · 学校制作',buildingView:'実際のプロジェクトを見る ↗',
 journeyHeading:'学歴の歩み',journeyLead:'ネパール・ダルチュラでの学校生活から東京の情報処理科まで。項目を選ぶと学校情報と地図が表示されます。',
 journeyOne:'10年生まで · Shree Siddha Secondary School',journeyOneSub:'ネパール・ダルチュラ、シナ',journeyTwo:'12年生 · Shree Sampal Secondary School',journeyTwoSub:'スンセラ · 2078 B.S. · GPA 2.73',journeyThree:'情報処理科 · 東京テクニカルカレッジ',journeyThreeSub:'東京都中野区東中野',journeyOpen:'学校と地図を見る ↗'
},
ne:{
 featuredLabel:'🚀 सार्वजनिक प्रोजेक्ट',featuredHeading:'NPL 2026 क्रिकेट जानकारी वेबसाइट',
 featuredDesc:'मेरो आफ्नै HTML प्रोजेक्टबाट प्रकाशित गरिएको स्वतन्त्र फ्यान वेबसाइट हो। यसमा पुराना NPL विवरण, खेलाडीका पेज र क्रिकेट तथ्याङ्क छन्। लाइभ स्कोर बाहिरी डाटा प्रदायकमा निर्भर भएकाले सधैँ चल्ने ग्यारेन्टी छैन।',
 featuredOpen:'प्रकाशित वेबसाइट खोल्नुहोस् ↗',featuredCode:'GitHub मा स्रोत कोड हेर्नुहोस् ↗',
 bioHeading:'तीन भाषामा मेरो परिचय',bioLead:'अङ्ग्रेजी, जापानी र नेपालीमा मेरो छोटो परिचय। पढ्न मन लागेको भाषा छान्नुहोस्।',
 buildingHeading:'अहिले बनाउँदै गरेका प्रोजेक्ट',buildingLead:'मैले काम गरेका वास्तविक प्रोजेक्ट र विद्यालयको काम। निर्माणाधीन प्रोजेक्टलाई पूरा भएको भनेर देखाइएको छैन।',
 buildingOne:'📚 NextStep Study · निर्माणाधीन',buildingTwo:'🍽️ QR Menu Generator · निर्माणाधीन',buildingThree:'🏏 NPL 2026 · प्रकाशित साइट',buildingFour:'🌶️ Nepal Spice · विद्यालय प्रोजेक्ट',buildingView:'वास्तविक प्रोजेक्टहरू हेर्नुहोस् ↗',
 journeyHeading:'मेरो शैक्षिक यात्रा',journeyLead:'दार्चुला, नेपालका विद्यालयदेखि टोकियोमा सूचना प्रविधिको अध्ययनसम्म। विद्यालय विवरण र नक्सा हेर्न कुनै चरण छान्नुहोस्।',
 journeyOne:'कक्षा १० सम्म · श्री सिद्ध माध्यमिक विद्यालय',journeyOneSub:'सिना, दार्चुला, नेपाल',journeyTwo:'कक्षा १२ · श्री सम्पाल माध्यमिक विद्यालय',journeyTwoSub:'सुनसेरा · २०७८ वि.सं. · GPA 2.73',journeyThree:'सूचना प्रशोधन · टोकियो टेक्निकल कलेज',journeyThreeSub:'हिगाशिनाकानो, टोकियो, जापान',journeyOpen:'विद्यालय र नक्सा हेर्नुहोस् ↗'
},
hi:{
 featuredLabel:'🚀 प्रकाशित प्रोजेक्ट',featuredHeading:'NPL 2026 क्रिकेट जानकारी वेबसाइट',
 featuredDesc:'मेरे अपने HTML प्रोजेक्ट से प्रकाशित स्वतंत्र फैन वेबसाइट है। इसमें पुराने NPL रिकॉर्ड, खिलाड़ियों के पेज और आँकड़े हैं। लाइव स्कोर बाहरी डेटा सेवाओं पर निर्भर हैं और उनकी गारंटी नहीं है।',
 featuredOpen:'प्रकाशित वेबसाइट खोलें ↗',featuredCode:'GitHub पर सोर्स देखें ↗',
 bioHeading:'तीन भाषाओं में मेरा परिचय',bioLead:'अंग्रेज़ी, जापानी और नेपाली में परिचय। पढ़ने के लिए भाषा चुनें।',
 buildingHeading:'अभी जिन प्रोजेक्ट पर काम है',buildingLead:'वास्तविक प्रोजेक्ट और स्कूल का काम। अधूरे प्रोजेक्ट को पूरा हुआ नहीं दिखाया गया है।',
 buildingOne:'📚 NextStep Study · विकासाधीन',buildingTwo:'🍽️ QR Menu Generator · विकासाधीन',buildingThree:'🏏 NPL 2026 · प्रकाशित वेबसाइट',buildingFour:'🌶️ Nepal Spice · स्कूल प्रोजेक्ट',buildingView:'वास्तविक प्रोजेक्ट देखें ↗',
 journeyHeading:'मेरी शैक्षिक यात्रा',journeyLead:'नेपाल के दार्चुला से टोक्यो में सूचना प्रसंस्करण की पढ़ाई तक। स्कूल और नक्शा देखने के लिए चरण चुनें।',
 journeyOne:'कक्षा 10 तक · Shree Siddha Secondary School',journeyOneSub:'सिना, दार्चुला, नेपाल',journeyTwo:'कक्षा 12 · Shree Sampal Secondary School',journeyTwoSub:'सुनसेरा · 2078 B.S. · GPA 2.73',journeyThree:'सूचना प्रसंस्करण · Tokyo Technical College',journeyThreeSub:'हिगाशिनाकानो, टोक्यो, जापान',journeyOpen:'स्कूल और नक्शा देखें ↗'
},
zh:{
 featuredLabel:'🚀 已发布项目',featuredHeading:'NPL 2026 板球信息网站',
 featuredDesc:'这是基于本人HTML项目发布的独立球迷网站，包含历史NPL资料、球员页面和板球统计。实时比分依赖第三方数据服务，无法保证持续更新。',
 featuredOpen:'打开已发布网站 ↗',featuredCode:'在 GitHub 查看源代码 ↗',
 bioHeading:'用三种语言介绍自己',bioLead:'以英语、日语、尼泊尔语撰写的简短自我介绍，选择一种阅读。',
 buildingHeading:'正在开发',buildingLead:'展示真实的项目和学校作业，不将尚未完成的项目标为已完成。',
 buildingOne:'📚 NextStep Study · 开发中',buildingTwo:'🍽️ QR Menu Generator · 开发中',buildingThree:'🏏 NPL 2026 · 已发布网站',buildingFour:'🌶️ Nepal Spice · 学校项目',buildingView:'查看实际项目 ↗',
 journeyHeading:'我的求学经历',journeyLead:'从尼泊尔达尔楚拉的学校到东京的信息处理专业。点击阶段可查看学校详情及地图。',
 journeyOne:'至十年级 · Shree Siddha Secondary School',journeyOneSub:'尼泊尔达尔楚拉 Sina',journeyTwo:'十二年级 · Shree Sampal Secondary School',journeyTwoSub:'Sunsera · 2078 B.S. · GPA 2.73',journeyThree:'信息处理专业 · 东京技术专门学校',journeyThreeSub:'日本东京东中野',journeyOpen:'查看学校和地图 ↗'
},
ko:{
 featuredLabel:'🚀 공개된 프로젝트',featuredHeading:'NPL 2026 크리켓 정보 웹사이트',
 featuredDesc:'직접 만든 HTML 프로젝트를 기반으로 공개한 독립 팬 사이트입니다. 과거 NPL 정보, 선수 페이지와 통계가 포함되어 있습니다. 실시간 점수는 외부 서비스에 의존하며 지속적인 갱신을 보장하지 않습니다.',
 featuredOpen:'공개된 웹사이트 열기 ↗',featuredCode:'GitHub 소스 보기 ↗',
 bioHeading:'세 가지 언어로 소개',bioLead:'영어, 일본어, 네팔어로 작성한 짧은 소개입니다. 원하는 언어를 선택하세요.',
 buildingHeading:'현재 진행 중인 작업',buildingLead:'실제 프로젝트와 학교 과제를 소개하며, 미완성 프로젝트를 완료된 것으로 표시하지 않습니다.',
 buildingOne:'📚 NextStep Study · 개발 중',buildingTwo:'🍽️ QR Menu Generator · 개발 중',buildingThree:'🏏 NPL 2026 · 공개 웹사이트',buildingFour:'🌶️ Nepal Spice · 학교 프로젝트',buildingView:'실제 프로젝트 보기 ↗',
 journeyHeading:'나의 학업 여정',journeyLead:'네팔 다르출라의 학교부터 도쿄의 정보처리 과정까지. 단계를 선택하면 학교 정보와 지도를 볼 수 있습니다.',
 journeyOne:'10학년까지 · Shree Siddha Secondary School',journeyOneSub:'네팔 다르출라 Sina',journeyTwo:'12학년 · Shree Sampal Secondary School',journeyTwoSub:'Sunsera · 2078 B.S. · GPA 2.73',journeyThree:'정보처리 · 도쿄 테크니컬 칼리지',journeyThreeSub:'일본 도쿄 히가시나카노',journeyOpen:'학교 및 지도 보기 ↗'
}
};
const all=s=>Array.from(document.querySelectorAll(s));
const tabs=all('[data-bio-lang]');
const panels={en:document.getElementById('bioPanelEn'),ja:document.getElementById('bioPanelJa'),ne:document.getElementById('bioPanelNe')};
let selected='en';
function selectBio(lang,focus=false){
 if(!panels[lang])return;
 selected=lang;
 tabs.forEach(tab=>{
   const active=tab.dataset.bioLang===lang;
   tab.setAttribute('aria-selected',String(active));
   tab.tabIndex=active?0:-1;
   if(active&&focus)tab.focus();
 });
 Object.entries(panels).forEach(([code,panel])=>{if(panel)panel.hidden=code!==lang;});
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectBio(tab.dataset.bioLang));
 tab.addEventListener('keydown',event=>{
   if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
   event.preventDefault();
   let pos=event.key==='Home'?0:event.key==='End'?tabs.length-1:
     (index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
   selectBio(tabs[pos].dataset.bioLang,true);
 });
});
function updateLanguage(lang){
 const entries=translations[lang]||translations.en;
 all('[data-curated-i18n]').forEach(node=>{
   const value=entries[node.dataset.curatedI18n];
   if(value)node.textContent=value;
 });
 if(['en','ja','ne'].includes(lang))selectBio(lang);
}
const root=document.documentElement;
new MutationObserver(records=>{
 if(records.some(x=>x.attributeName==='lang'))updateLanguage(root.lang);
}).observe(root,{attributes:true,attributeFilter:['lang']});
const selector=document.getElementById('siteLanguage');
selector?.addEventListener('change',()=>updateLanguage(selector.value));
updateLanguage(root.lang);
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
all('[data-journey-target]').forEach(button=>{
 button.addEventListener('click',()=>{
   const target=document.getElementById(button.dataset.journeyTarget);
   if(!target)return;
   target.classList.add('journey-focus');
   target.tabIndex=-1;
   target.scrollIntoView({behavior:prefersReducedMotion.matches?'auto':'smooth',block:'center'});
   target.focus({preventScroll:true});
   window.setTimeout(()=>target.classList.remove('journey-focus'),1800);
 });
});
})();
