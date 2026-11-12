/* Portfolio v3 internationalization and working interactions.
   Translations are hand-curated for six supported languages.
   Project buttons link only to identifiable destinations; no fake form or fake demo.
*/
(() => {
'use strict';
const email='upendradadal824@gmail.com';
const dict={
en:{
navHome:'Home',navProjects:'Projects',navSkills:'Skills',navAbout:'About',navExperience:'Experience',navEducation:'Education',navContact:'Contact',hire:'Contact',
eyebrow:'DEVELOPER PORTFOLIO · TOKYO',heroLine1:'Building useful',heroLine2:'digital experiences.',heroLead:"I'm Dadal Upendra Singh, an IT student in Tokyo focused on web applications, programming fundamentals, databases, and practical software projects.",
heroWeb:'Web Development',heroApps:'App Development',heroData:'Databases',heroGames:'Game Projects',viewProjects:'View Projects ↗',downloadCv:'Print / Save Resume ↧',viewGithub:'GitHub Profile ↗',heroLocation:'📍 Tokyo, Japan',portraitRole:'IT Student · Software Development Learner',
workLabel:'SELECTED WORK',workTitle:'Projects & practice',workSubtitle:'Applications and learning demos. Project status and available links are clearly labeled.',filterAll:'All',filterApp:'Applications',filterStudy:'Learning Demos',filterProgress:'In Progress',
skillLabel:'TECHNOLOGIES',skillsTitle:"What I'm learning & building with",skillsSubtitle:'An honest overview of my current technical practice, without invented proficiency scores.',skillHtml:'Semantic markup and responsive layouts.',skillJs:'DOM interactions and web applications.',skillJava:'OOP, servlet-based coursework and fundamentals.',skillSql:'Queries, schema basics and stored procedures.',skillNode:'Backend practice and web tooling.',skillReact:'Component-based frontend learning.',skillPython:'Problem solving and programming foundations.',skillGit:'Version control, repositories and project sharing.',
aboutLabel:'ABOUT ME',aboutTitle:'Developer mindset. Continuous learning.',aboutCardTitle:'My background',aboutText:"I'm from Nepal and currently study information processing in Tokyo. I enjoy building practical applications and improving my programming skills through projects.",aboutText2:'My focus is on understanding how software works, writing maintainable code, and learning from real problems.',focusTitle:'Current focus',focus1:'JavaScript, HTML/CSS and web application development',focus2:'Java programming and object-oriented design',focus3:'Oracle SQL, data handling and backend fundamentals',focus4:'Learning by building and documenting projects',
experienceLabel:'EXPERIENCE',experienceTitle:'Work & practical experience',experienceSubtitle:'Professional discipline and technology practice from school projects.',expRole:'Part-time team member — Kaiten Sushi Misaki',expDate:'Tokyo, Japan · Since August 2023',expDesc:'Teamwork, customer service and dependable day-to-day operations.',expSchoolRole:'Student software projects',expSchoolPlace:'Information Processing course',expSchoolDesc:'Web applications, Java/Oracle exercises, teamwork, testing and presentation projects.',
educationLabel:'EDUCATION',educationTitle:'Education & learning',eduJapan:'Tokyo Technical College · 情報処理科',eduJapanDesc:'Information Processing studies in Tokyo: programming, web technologies, databases and software fundamentals.',eduNepal:'Education in Nepal',eduNepalDesc:'Previous studies in Nepal. Continuing to develop multilingual communication and practical IT skills in Japan.',
contactLabel:'CONTACT',contactTitle:"Let's connect",contactSubtitle:'Reach me directly by email or explore my GitHub projects.',contactCall:'Have a project or question?',contactLead:"I'd be glad to hear about opportunities, collaboration and software development conversations.",emailMe:'Email Me ↗',copyEmail:'Copy email',copied:'Copied ✓',footerText:'Built with HTML, CSS and JavaScript.',backTop:'Back to top ↑',legacy:'Previous version / local vault',
statusApp:'Application',statusStudy:'Learning demo',statusProgress:'In progress',openProject:'Open project ↗',openDemo:'Open demo ↗',source:'Source ↗',noPublic:'No public demo yet',empty:'No projects in this category.'
},
ja:{
navHome:'ホーム',navProjects:'制作実績',navSkills:'スキル',navAbout:'自己紹介',navExperience:'経験',navEducation:'学歴',navContact:'お問い合わせ',hire:'連絡する',
eyebrow:'開発ポートフォリオ · 東京',heroLine1:'役立つ',heroLine2:'デジタル体験をつくる。',heroLead:'ダダル・ウペンドラ・シンです。東京で情報処理を学び、Webアプリ開発、プログラミングの基礎、データベース、実践的な制作に取り組んでいます。',
heroWeb:'Web開発',heroApps:'アプリ開発',heroData:'データベース',heroGames:'ゲーム制作',viewProjects:'制作実績を見る ↗',downloadCv:'履歴書を印刷・PDF保存 ↧',viewGithub:'GitHubを見る ↗',heroLocation:'📍 日本・東京',portraitRole:'情報処理科の学生 · ソフトウェア開発を学習中',
workLabel:'制作実績',workTitle:'プロジェクトと演習',workSubtitle:'アプリと学習用デモを紹介します。公開状況とリンクを明確に表示しています。',filterAll:'すべて',filterApp:'アプリ',filterStudy:'学習デモ',filterProgress:'開発中',
skillLabel:'技術',skillsTitle:'学習・使用している技術',skillsSubtitle:'実際に取り組んでいる技術を紹介します。根拠のない習熟度は表示しません。',skillHtml:'意味のあるHTMLとレスポンシブなレイアウト。',skillJs:'DOM操作とWebアプリ開発。',skillJava:'オブジェクト指向、Servletの演習と基礎。',skillSql:'SQL、データベース設計の基礎、ストアドプロシージャ。',skillNode:'バックエンドと開発ツールの演習。',skillReact:'コンポーネントを使ったフロントエンド学習。',skillPython:'問題解決とプログラミングの基礎。',skillGit:'バージョン管理とリポジトリの共有。',
aboutLabel:'自己紹介',aboutTitle:'学び続ける開発者を目指して。',aboutCardTitle:'自己紹介',aboutText:'ネパール出身で、現在は東京で情報処理を学んでいます。実用的なアプリを作りながら、プログラミング力を高めています。',aboutText2:'ソフトウェアの仕組みを理解し、保守しやすいコードを書き、実際の課題から学ぶことを大切にしています。',focusTitle:'現在の学習テーマ',focus1:'JavaScript、HTML/CSS、Webアプリ開発',focus2:'Javaとオブジェクト指向設計',focus3:'Oracle SQL、データ処理、バックエンドの基礎',focus4:'制作と記録を通じた学習',
experienceLabel:'経験',experienceTitle:'仕事と実践経験',experienceSubtitle:'アルバイトでの社会経験と学校での開発演習。',expRole:'アルバイト — 回転寿司みさき',expDate:'東京 · 2023年8月から',expDesc:'チームワーク、接客、日々の業務を責任をもって行う経験。',expSchoolRole:'学校でのソフトウェア制作',expSchoolPlace:'情報処理科',expSchoolDesc:'Webアプリ、Java・Oracle演習、チーム制作、テスト、発表。',
educationLabel:'学歴',educationTitle:'学歴と学習',eduJapan:'専門学校東京テクニカルカレッジ · 情報処理科',eduJapanDesc:'東京でプログラミング、Web技術、データベース、ソフトウェアの基礎を学習。',eduNepal:'ネパールでの学歴',eduNepalDesc:'ネパールでの学習を経て、現在は日本でITと多言語コミュニケーションを学んでいます。',
contactLabel:'お問い合わせ',contactTitle:'お気軽にご連絡ください',contactSubtitle:'メールまたはGitHubからご連絡いただけます。',contactCall:'ご相談やご質問はありますか？',contactLead:'開発の機会、共同制作、ソフトウェアに関するご連絡をお待ちしています。',emailMe:'メールを送る ↗',copyEmail:'メールアドレスをコピー',copied:'コピーしました ✓',footerText:'HTML・CSS・JavaScriptで制作。',backTop:'ページ上部へ ↑',legacy:'旧バージョン・ローカル保管庫',
statusApp:'アプリ',statusStudy:'学習デモ',statusProgress:'開発中',openProject:'プロジェクトを開く ↗',openDemo:'デモを開く ↗',source:'ソースコード ↗',noPublic:'公開デモはまだありません',empty:'このカテゴリにプロジェクトはありません。'
},
ne:{
navHome:'गृहपृष्ठ',navProjects:'प्रोजेक्टहरू',navSkills:'सीपहरू',navAbout:'मेरो बारेमा',navExperience:'अनुभव',navEducation:'शिक्षा',navContact:'सम्पर्क',hire:'सम्पर्क गर्नुहोस्',
eyebrow:'डेभलपर पोर्टफोलियो · टोकियो',heroLine1:'उपयोगी',heroLine2:'डिजिटल समाधान बनाउँदै।',heroLead:'म दादल उपेन्द्र सिंह हुँ। टोकियोमा सूचना प्रविधि पढ्दै वेब एप, प्रोग्रामिङका आधारभूत सीप, डाटाबेस र व्यवहारिक सफ्टवेयर प्रोजेक्टहरूमा काम गरिरहेको छु।',
heroWeb:'वेब विकास',heroApps:'एप विकास',heroData:'डाटाबेस',heroGames:'गेम प्रोजेक्ट',viewProjects:'प्रोजेक्टहरू हेर्नुहोस् ↗',downloadCv:'रिजुमे प्रिन्ट / PDF ↧',viewGithub:'GitHub प्रोफाइल ↗',heroLocation:'📍 टोकियो, जापान',portraitRole:'IT विद्यार्थी · सफ्टवेयर विकास सिक्दै',
workLabel:'मेरो काम',workTitle:'प्रोजेक्ट र अभ्यास',workSubtitle:'वास्तविक एप र सिकाइका डेमो। प्रत्येकको अवस्था र उपलब्ध लिंक स्पष्ट देखाइएको छ।',filterAll:'सबै',filterApp:'एपहरू',filterStudy:'अभ्यास डेमो',filterProgress:'निर्माणाधीन',
skillLabel:'प्रविधि',skillsTitle:'मैले सिकिरहेका र प्रयोग गरेका प्रविधि',skillsSubtitle:'हालको वास्तविक अभ्यास मात्र प्रस्तुत गरिएको छ, बनावटी दक्षता प्रतिशत छैन।',skillHtml:'अर्थपूर्ण HTML र मोबाइलमा मिल्ने डिजाइन।',skillJs:'DOM र वेब एप निर्माण।',skillJava:'OOP, Servlet अभ्यास र आधारभूत Java।',skillSql:'SQL query, schema र stored procedure।',skillNode:'Backend र वेब टुल अभ्यास।',skillReact:'Component आधारित frontend सिकाइ।',skillPython:'समस्या समाधान र प्रोग्रामिङको आधार।',skillGit:'Version control र GitHub मा काम।',
aboutLabel:'मेरो बारेमा',aboutTitle:'निरन्तर सिक्ने डेभलपर।',aboutCardTitle:'मेरो परिचय',aboutText:'म नेपालबाट आएको हुँ र अहिले टोकियोमा सूचना प्रशोधन अध्ययन गर्दैछु। व्यवहारिक एप बनाएर प्रोग्रामिङ सीप सुधार्न मन पर्छ।',aboutText2:'सफ्टवेयर कसरी काम गर्छ बुझ्ने, व्यवस्थित कोड लेख्ने र वास्तविक समस्याबाट सिक्ने मेरो प्राथमिकता हो।',focusTitle:'अहिलेको ध्यान',focus1:'JavaScript, HTML/CSS र वेब एप विकास',focus2:'Java र object-oriented design',focus3:'Oracle SQL, डाटा व्यवस्थापन र backend को आधार',focus4:'प्रोजेक्ट बनाएर र दस्तावेज लेखेर सिक्ने',
experienceLabel:'अनुभव',experienceTitle:'काम र व्यवहारिक अनुभव',experienceSubtitle:'पार्ट-टाइम काममा जिम्मेवारी र विद्यालयमा विकास अभ्यास।',expRole:'पार्ट-टाइम सदस्य — Kaiten Sushi Misaki',expDate:'टोकियो · अगस्ट २०२३ देखि',expDesc:'टोलीमा काम गर्ने, ग्राहक सेवा र नियमित जिम्मेवारी।',expSchoolRole:'विद्यार्थी सफ्टवेयर प्रोजेक्टहरू',expSchoolPlace:'सूचना प्रशोधन पाठ्यक्रम',expSchoolDesc:'वेब एप, Java/Oracle अभ्यास, टोलीको काम, परीक्षण र प्रस्तुति।',
educationLabel:'शिक्षा',educationTitle:'शिक्षा र सिकाइ',eduJapan:'Tokyo Technical College · 情報処理科',eduJapanDesc:'टोकियोमा प्रोग्रामिङ, वेब प्रविधि, डाटाबेस र सफ्टवेयरका आधारभूत विषयहरूको अध्ययन।',eduNepal:'नेपालमा शिक्षा',eduNepalDesc:'नेपालमा अघिल्लो अध्ययन। अहिले जापानमा IT र बहुभाषिक सञ्चारमा सीप विकास गर्दै।',
contactLabel:'सम्पर्क',contactTitle:'सम्पर्कमा रहौँ',contactSubtitle:'इमेल पठाउनुहोस् वा GitHub मा मेरा प्रोजेक्ट हेर्नुहोस्।',contactCall:'कुनै प्रोजेक्ट वा प्रश्न छ?',contactLead:'सहकार्य, अवसर वा सफ्टवेयर विकाससम्बन्धी कुराकानीका लागि सम्पर्क गर्न सक्नुहुन्छ।',emailMe:'इमेल पठाउनुहोस् ↗',copyEmail:'इमेल कपी गर्नुहोस्',copied:'कपी भयो ✓',footerText:'HTML, CSS र JavaScript प्रयोग गरेर बनाइएको।',backTop:'माथि जानुहोस् ↑',legacy:'पुरानो संस्करण / स्थानीय भल्ट',
statusApp:'एप',statusStudy:'अभ्यास डेमो',statusProgress:'निर्माणाधीन',openProject:'प्रोजेक्ट खोल्नुहोस् ↗',openDemo:'डेमो खोल्नुहोस् ↗',source:'स्रोत कोड ↗',noPublic:'सार्वजनिक डेमो अझै छैन',empty:'यो समूहमा प्रोजेक्ट छैन।'
},
hi:{
navHome:'होम',navProjects:'प्रोजेक्ट',navSkills:'कौशल',navAbout:'परिचय',navExperience:'अनुभव',navEducation:'शिक्षा',navContact:'संपर्क',hire:'संपर्क करें',
eyebrow:'डेवलपर पोर्टफोलियो · टोक्यो',heroLine1:'उपयोगी',heroLine2:'डिजिटल अनुभव बनाना।',heroLead:'मैं दादल उपेंद्र सिंह हूँ। टोक्यो में आईटी की पढ़ाई के साथ वेब एप्लिकेशन, प्रोग्रामिंग, डेटाबेस और व्यावहारिक सॉफ्टवेयर प्रोजेक्ट पर काम कर रहा हूँ।',
heroWeb:'वेब डेवलपमेंट',heroApps:'ऐप डेवलपमेंट',heroData:'डेटाबेस',heroGames:'गेम प्रोजेक्ट',viewProjects:'प्रोजेक्ट देखें ↗',downloadCv:'रिज्यूमे प्रिंट / PDF ↧',viewGithub:'GitHub प्रोफाइल ↗',heroLocation:'📍 टोक्यो, जापान',portraitRole:'आईटी छात्र · सॉफ्टवेयर विकास सीख रहा हूँ',
workLabel:'चुने हुए काम',workTitle:'प्रोजेक्ट और अभ्यास',workSubtitle:'एप्लिकेशन और अभ्यास डेमो। स्थिति और उपलब्ध लिंक स्पष्ट रूप से दिखाए गए हैं।',filterAll:'सभी',filterApp:'एप्लिकेशन',filterStudy:'अभ्यास डेमो',filterProgress:'विकासाधीन',
skillLabel:'तकनीक',skillsTitle:'जो तकनीकें मैं सीख और उपयोग कर रहा हूँ',skillsSubtitle:'वर्तमान तकनीकी अभ्यास का वास्तविक विवरण, बिना मनगढ़ंत प्रतिशत के।',skillHtml:'सही HTML संरचना और रिस्पॉन्सिव डिजाइन।',skillJs:'DOM और वेब एप्लिकेशन।',skillJava:'OOP, Servlet अभ्यास और बुनियाद।',skillSql:'SQL क्वेरी, स्कीमा और stored procedures।',skillNode:'बैकएंड और वेब टूल अभ्यास।',skillReact:'कंपोनेंट आधारित फ्रंटएंड सीखना।',skillPython:'समस्या समाधान और प्रोग्रामिंग की बुनियाद।',skillGit:'वर्जन कंट्रोल और रिपॉजिटरी प्रबंधन।',
aboutLabel:'मेरे बारे में',aboutTitle:'सीखते रहने वाला डेवलपर।',aboutCardTitle:'मेरा परिचय',aboutText:'मैं नेपाल से हूँ और अभी टोक्यो में सूचना प्रौद्योगिकी पढ़ रहा हूँ। व्यावहारिक एप बनाकर अपनी प्रोग्रामिंग बेहतर करता हूँ।',aboutText2:'सॉफ्टवेयर कैसे काम करता है यह समझना, अच्छा कोड लिखना और वास्तविक समस्याओं से सीखना मेरा लक्ष्य है।',focusTitle:'वर्तमान फोकस',focus1:'JavaScript, HTML/CSS और वेब विकास',focus2:'Java और ऑब्जेक्ट ओरिएंटेड डिजाइन',focus3:'Oracle SQL, डेटा और बैकएंड की बुनियाद',focus4:'प्रोजेक्ट और दस्तावेज के जरिए सीखना',
experienceLabel:'अनुभव',experienceTitle:'काम और व्यावहारिक अनुभव',experienceSubtitle:'पार्ट-टाइम नौकरी और स्कूल के सॉफ्टवेयर प्रोजेक्ट।',expRole:'पार्ट-टाइम टीम सदस्य — Kaiten Sushi Misaki',expDate:'टोक्यो · अगस्त 2023 से',expDesc:'टीमवर्क, ग्राहक सेवा और नियमित जिम्मेदारियाँ।',expSchoolRole:'छात्र सॉफ्टवेयर प्रोजेक्ट',expSchoolPlace:'सूचना प्रसंस्करण कोर्स',expSchoolDesc:'वेब एप, Java/Oracle अभ्यास, टीमवर्क, परीक्षण और प्रस्तुतियाँ।',
educationLabel:'शिक्षा',educationTitle:'शिक्षा और अध्ययन',eduJapan:'Tokyo Technical College · 情報処理科',eduJapanDesc:'टोक्यो में प्रोग्रामिंग, वेब तकनीक, डेटाबेस और सॉफ्टवेयर की बुनियाद।',eduNepal:'नेपाल में शिक्षा',eduNepalDesc:'नेपाल में पिछली पढ़ाई। अब जापान में आईटी और बहुभाषी संवाद कौशल विकसित कर रहा हूँ।',
contactLabel:'संपर्क',contactTitle:'संपर्क करें',contactSubtitle:'ईमेल करें या मेरे GitHub प्रोजेक्ट देखें।',contactCall:'कोई प्रोजेक्ट या सवाल है?',contactLead:'सहयोग, अवसर और सॉफ्टवेयर विकास के विषयों पर बात करने के लिए संपर्क करें।',emailMe:'ईमेल भेजें ↗',copyEmail:'ईमेल कॉपी करें',copied:'कॉपी हो गया ✓',footerText:'HTML, CSS और JavaScript से बनाया गया।',backTop:'ऊपर जाएँ ↑',legacy:'पुराना संस्करण / लोकल वॉल्ट',
statusApp:'ऐप',statusStudy:'अभ्यास डेमो',statusProgress:'विकासाधीन',openProject:'प्रोजेक्ट खोलें ↗',openDemo:'डेमो खोलें ↗',source:'सोर्स कोड ↗',noPublic:'सार्वजनिक डेमो अभी नहीं',empty:'इस श्रेणी में कोई प्रोजेक्ट नहीं।'
},
zh:{
navHome:'首页',navProjects:'项目',navSkills:'技能',navAbout:'关于我',navExperience:'经历',navEducation:'教育',navContact:'联系',hire:'联系我',
eyebrow:'开发者作品集 · 东京',heroLine1:'创造实用的',heroLine2:'数字体验。',heroLead:'我是 Dadal Upendra Singh，目前在东京学习信息处理，专注于 Web 应用、编程基础、数据库和实践软件项目。',
heroWeb:'网页开发',heroApps:'应用开发',heroData:'数据库',heroGames:'游戏项目',viewProjects:'查看项目 ↗',downloadCv:'打印 / 保存简历 ↧',viewGithub:'GitHub 主页 ↗',heroLocation:'📍 日本东京',portraitRole:'IT 学生 · 软件开发学习者',
workLabel:'精选作品',workTitle:'项目与练习',workSubtitle:'应用项目和学习演示。明确标明项目状态和可用链接。',filterAll:'全部',filterApp:'应用项目',filterStudy:'学习演示',filterProgress:'开发中',
skillLabel:'技术',skillsTitle:'正在学习和使用的技术',skillsSubtitle:'真实展示目前的技术练习，不虚构熟练度。',skillHtml:'语义化 HTML 和响应式布局。',skillJs:'DOM 交互和 Web 应用。',skillJava:'面向对象编程、Servlet 练习与基础。',skillSql:'SQL 查询、数据库设计基础与存储过程。',skillNode:'后端与 Web 工具练习。',skillReact:'组件化前端学习。',skillPython:'问题解决和编程基础。',skillGit:'版本控制和项目共享。',
aboutLabel:'关于我',aboutTitle:'持续学习的开发者。',aboutCardTitle:'我的背景',aboutText:'我来自尼泊尔，目前在东京学习信息处理。我喜欢通过开发实用应用提高编程技能。',aboutText2:'我重视理解软件运行原理、编写易维护的代码，并从真实问题中学习。',focusTitle:'当前重点',focus1:'JavaScript、HTML/CSS 和 Web 应用开发',focus2:'Java 和面向对象设计',focus3:'Oracle SQL、数据处理和后端基础',focus4:'通过项目开发和文档记录学习',
experienceLabel:'经历',experienceTitle:'工作与实践经验',experienceSubtitle:'兼职工作经验及学校软件实践。',expRole:'兼职团队成员 — Kaiten Sushi Misaki',expDate:'东京 · 2023年8月至今',expDesc:'团队合作、客户服务和日常工作责任。',expSchoolRole:'学生软件项目',expSchoolPlace:'信息处理课程',expSchoolDesc:'Web 应用、Java/Oracle 练习、团队合作、测试和项目展示。',
educationLabel:'教育',educationTitle:'教育与学习',eduJapan:'东京技术专门学校 · 情報処理科',eduJapanDesc:'在东京学习编程、Web 技术、数据库和软件开发基础。',eduNepal:'尼泊尔教育经历',eduNepalDesc:'曾在尼泊尔学习，目前在日本继续提高 IT 和多语言交流能力。',
contactLabel:'联系',contactTitle:'欢迎联系',contactSubtitle:'可以直接发送邮件或查看我的 GitHub 项目。',contactCall:'有项目或问题吗？',contactLead:'欢迎交流合作机会、项目和软件开发相关话题。',emailMe:'发送邮件 ↗',copyEmail:'复制邮箱',copied:'已复制 ✓',footerText:'使用 HTML、CSS 和 JavaScript 制作。',backTop:'返回顶部 ↑',legacy:'旧版 / 本地资料库',
statusApp:'应用',statusStudy:'学习演示',statusProgress:'开发中',openProject:'打开项目 ↗',openDemo:'打开演示 ↗',source:'源代码 ↗',noPublic:'暂无公开演示',empty:'此分类暂无项目。'
},
ko:{
navHome:'홈',navProjects:'프로젝트',navSkills:'기술',navAbout:'소개',navExperience:'경험',navEducation:'학력',navContact:'연락',hire:'연락하기',
eyebrow:'개발자 포트폴리오 · 도쿄',heroLine1:'유용한',heroLine2:'디지털 경험을 만듭니다.',heroLead:'저는 도쿄에서 정보처리를 공부하는 Dadal Upendra Singh입니다. 웹 애플리케이션, 프로그래밍 기초, 데이터베이스와 실용적인 소프트웨어 프로젝트를 학습하고 있습니다.',
heroWeb:'웹 개발',heroApps:'앱 개발',heroData:'데이터베이스',heroGames:'게임 프로젝트',viewProjects:'프로젝트 보기 ↗',downloadCv:'이력서 인쇄 / PDF ↧',viewGithub:'GitHub 프로필 ↗',heroLocation:'📍 일본 도쿄',portraitRole:'IT 학생 · 소프트웨어 개발 학습자',
workLabel:'주요 작업',workTitle:'프로젝트와 실습',workSubtitle:'애플리케이션과 학습용 데모입니다. 상태와 이용 가능한 링크를 명확히 표시합니다.',filterAll:'전체',filterApp:'애플리케이션',filterStudy:'학습 데모',filterProgress:'개발 중',
skillLabel:'기술',skillsTitle:'배우고 활용하는 기술',skillsSubtitle:'실제 학습 중인 기술을 소개하며 근거 없는 숙련도는 표시하지 않습니다.',skillHtml:'시맨틱 HTML과 반응형 레이아웃.',skillJs:'DOM 상호작용과 웹 애플리케이션.',skillJava:'객체지향, Servlet 실습과 기본기.',skillSql:'SQL 쿼리, 스키마 기초와 저장 프로시저.',skillNode:'백엔드와 웹 도구 실습.',skillReact:'컴포넌트 기반 프런트엔드 학습.',skillPython:'문제 해결과 프로그래밍 기초.',skillGit:'버전 관리와 프로젝트 공유.',
aboutLabel:'소개',aboutTitle:'계속 배우는 개발자.',aboutCardTitle:'제 배경',aboutText:'저는 네팔 출신이며 현재 도쿄에서 정보처리를 공부하고 있습니다. 실용적인 앱을 만들며 프로그래밍 실력을 키우고 있습니다.',aboutText2:'소프트웨어의 동작 원리를 이해하고 유지보수하기 쉬운 코드를 작성하며 실제 문제에서 배우는 것을 중요하게 생각합니다.',focusTitle:'현재 학습 분야',focus1:'JavaScript, HTML/CSS 및 웹 앱 개발',focus2:'Java와 객체지향 설계',focus3:'Oracle SQL, 데이터 처리 및 백엔드 기초',focus4:'프로젝트 제작과 문서화를 통한 학습',
experienceLabel:'경험',experienceTitle:'업무 및 실무 경험',experienceSubtitle:'아르바이트 경험과 학교 소프트웨어 실습.',expRole:'파트타임 팀원 — Kaiten Sushi Misaki',expDate:'도쿄 · 2023년 8월부터',expDesc:'팀워크, 고객 서비스 및 일상 업무 수행.',expSchoolRole:'학생 소프트웨어 프로젝트',expSchoolPlace:'정보처리 과정',expSchoolDesc:'웹 앱, Java/Oracle 실습, 팀 프로젝트, 테스트 및 발표.',
educationLabel:'학력',educationTitle:'교육 및 학습',eduJapan:'도쿄 테크니컬 칼리지 · 情報処理科',eduJapanDesc:'도쿄에서 프로그래밍, 웹 기술, 데이터베이스 및 소프트웨어 기초 학습.',eduNepal:'네팔에서의 학업',eduNepalDesc:'네팔에서 학업을 마친 뒤 일본에서 IT와 다국어 의사소통 능력을 키우고 있습니다.',
contactLabel:'연락',contactTitle:'연락해 주세요',contactSubtitle:'이메일을 보내거나 GitHub 프로젝트를 확인할 수 있습니다.',contactCall:'프로젝트나 질문이 있나요?',contactLead:'협업, 기회, 소프트웨어 개발에 관한 대화를 환영합니다.',emailMe:'이메일 보내기 ↗',copyEmail:'이메일 복사',copied:'복사 완료 ✓',footerText:'HTML, CSS, JavaScript로 제작.',backTop:'맨 위로 ↑',legacy:'이전 버전 / 로컬 보관함',
statusApp:'앱',statusStudy:'학습 데모',statusProgress:'개발 중',openProject:'프로젝트 열기 ↗',openDemo:'데모 열기 ↗',source:'소스 코드 ↗',noPublic:'공개 데모 없음',empty:'이 카테고리에 프로젝트가 없습니다.'
}
};
/* Accurate school details from user-provided academic documents, without exposing identifying scans. */
Object.assign(dict.en,{"eduIntro":"My education journey from Darchula, Nepal, to Tokyo, Japan.","eduCurrent":"CURRENT STUDIES","eduCompleted":"GRADE XII COMPLETED","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"Shree Sampal Secondary School, Sunsera","eduSchoolPlace":"Byans-4, Darchula, Nepal","eduGrade":"Grade XII","eduGradeLabel":"School Leaving Examination","eduGpaLabel":"GPA (NEB transcript)","eduYearLabel":"Exam year","eduSource":"Based on the uploaded NEB documents. Personal registration numbers and full certificates are not published.","eduRecordLabel":"ACADEMIC DOCUMENTS","eduRecordHeading":"Academic documents on record","eduRecordDescription":"Certificate types are listed without exposing private scans or identity numbers.","eduDoc1":"NEB Grade XII Academic Transcript","eduDoc2":"Provisional Certificate","eduDoc3":"Migration Certificate","eduDoc4":"Character Certificate","eduDoc5":"Transfer Certificate"});
Object.assign(dict.ja,{"eduIntro":"ネパールのダルチュラから東京へ続く学びの歩み。","eduCurrent":"現在の学習","eduCompleted":"高校課程修了","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"シュリー・サンパル中等学校（スンセラ）","eduSchoolPlace":"ネパール・ダルチュラ、ビャンス4","eduGrade":"12年生修了","eduGradeLabel":"学校修了試験","eduGpaLabel":"GPA（NEB成績証明書）","eduYearLabel":"試験年度","eduSource":"提出されたNEB書類に基づく情報です。登録番号や証明書の原本画像は公開していません。","eduRecordLabel":"学業書類","eduRecordHeading":"学業書類の一覧","eduRecordDescription":"本人確認情報を守るため、証明書の種類だけを表示しています。","eduDoc1":"NEB 第12学年 成績証明書","eduDoc2":"暫定修了証明書","eduDoc3":"移行証明書","eduDoc4":"人物証明書","eduDoc5":"転校証明書"});
Object.assign(dict.ne,{"eduIntro":"दार्चुला, नेपालदेखि टोकियो, जापानसम्मको मेरो शैक्षिक यात्रा।","eduCurrent":"हाल अध्ययनरत","eduCompleted":"कक्षा १२ उत्तीर्ण","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"श्री सम्पाल माध्यमिक विद्यालय, सुनसेरा","eduSchoolPlace":"ब्याँस–४, दार्चुला, नेपाल","eduGrade":"कक्षा १२","eduGradeLabel":"विद्यालय तहको अन्तिम परीक्षा","eduGpaLabel":"GPA (NEB ट्रान्सक्रिप्ट)","eduYearLabel":"परीक्षा वर्ष","eduSource":"तपाईंले अपलोड गरेका NEB कागजातमा आधारित विवरण। दर्ता नम्बर र पूरा प्रमाणपत्र सार्वजनिक गरिएको छैन।","eduRecordLabel":"शैक्षिक कागजात","eduRecordHeading":"उपलब्ध शैक्षिक कागजात","eduRecordDescription":"व्यक्तिगत विवरण सुरक्षित राख्न प्रमाणपत्रका प्रकार मात्र देखाइएका छन्।","eduDoc1":"NEB कक्षा १२ शैक्षिक ट्रान्सक्रिप्ट","eduDoc2":"अस्थायी प्रमाणपत्र","eduDoc3":"माइग्रेसन प्रमाणपत्र","eduDoc4":"चारित्रिक प्रमाणपत्र","eduDoc5":"स्थानान्तरण प्रमाणपत्र"});
Object.assign(dict.hi,{"eduIntro":"दार्चुला, नेपाल से टोक्यो, जापान तक मेरी शिक्षा यात्रा।","eduCurrent":"वर्तमान अध्ययन","eduCompleted":"कक्षा 12 उत्तीर्ण","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"श्री सम्पाल माध्यमिक विद्यालय, सुनसेरा","eduSchoolPlace":"ब्याँस-4, दार्चुला, नेपाल","eduGrade":"कक्षा 12","eduGradeLabel":"विद्यालय समापन परीक्षा","eduGpaLabel":"GPA (NEB ट्रांसक्रिप्ट)","eduYearLabel":"परीक्षा वर्ष","eduSource":"अपलोड किए गए NEB दस्तावेज़ों के आधार पर। पंजीकरण संख्या और पूरे प्रमाणपत्र सार्वजनिक नहीं किए गए हैं।","eduRecordLabel":"शैक्षणिक दस्तावेज़","eduRecordHeading":"शैक्षणिक दस्तावेज़ों का विवरण","eduRecordDescription":"निजी जानकारी की सुरक्षा के लिए केवल दस्तावेज़ों के प्रकार दिखाए गए हैं।","eduDoc1":"NEB कक्षा 12 मार्कशीट","eduDoc2":"प्रोविज़नल सर्टिफिकेट","eduDoc3":"माइग्रेशन सर्टिफिकेट","eduDoc4":"चरित्र प्रमाणपत्र","eduDoc5":"स्थानांतरण प्रमाणपत्र"});
Object.assign(dict.zh,{"eduIntro":"从尼泊尔达尔楚拉到日本东京的求学经历。","eduCurrent":"目前在读","eduCompleted":"已完成十二年级","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"Shree Sampal 中学（Sunsera）","eduSchoolPlace":"尼泊尔达尔楚拉 Byans-4","eduGrade":"十二年级","eduGradeLabel":"学校毕业考试","eduGpaLabel":"GPA（NEB 成绩单）","eduYearLabel":"考试年度","eduSource":"根据您上传的 NEB 文件整理。未公开注册编号或完整证书扫描件。","eduRecordLabel":"学历文件","eduRecordHeading":"学历文件类别","eduRecordDescription":"仅列出文件类型，不公开包含个人信息的证书扫描件。","eduDoc1":"NEB 十二年级成绩单","eduDoc2":"临时毕业证明","eduDoc3":"迁移证明","eduDoc4":"品行证明","eduDoc5":"转学证明"});
Object.assign(dict.ko,{"eduIntro":"네팔 다르출라에서 일본 도쿄까지 이어진 학업 여정입니다.","eduCurrent":"현재 학업","eduCompleted":"12학년 수료","eduJapanFocus":"Java · Web · Oracle SQL","eduSchoolName":"Shree Sampal 중등학교, Sunsera","eduSchoolPlace":"네팔 다르출라 Byans-4","eduGrade":"12학년","eduGradeLabel":"학교 졸업 시험","eduGpaLabel":"GPA (NEB 성적 증명서)","eduYearLabel":"시험 연도","eduSource":"업로드한 NEB 문서에 근거합니다. 등록번호 및 증명서 원본 이미지는 공개하지 않습니다.","eduRecordLabel":"학업 서류","eduRecordHeading":"학업 관련 문서 목록","eduRecordDescription":"개인정보 보호를 위해 문서 종류만 표시하고 원본은 공개하지 않습니다.","eduDoc1":"NEB 12학년 성적 증명서","eduDoc2":"임시 수료 증명서","eduDoc3":"이관 증명서","eduDoc4":"품행 증명서","eduDoc5":"전학 증명서"});
Object.assign(dict.en,{"eduGrade10Status":"UP TO GRADE 10","eduGrade10School":"Shree Siddha Secondary School, Sina","eduGrade10Place":"Sina, Darchula, Nepal","eduGrade10Level":"School education through Grade 10"});
Object.assign(dict.ja,{"eduGrade10Status":"10年生まで","eduGrade10School":"シュリー・シッダ中等学校（シナ）","eduGrade10Place":"ネパール・ダルチュラ、シナ","eduGrade10Level":"10年生までの学校教育"});
Object.assign(dict.ne,{"eduGrade10Status":"कक्षा १० सम्म","eduGrade10School":"श्री सिद्ध माध्यमिक विद्यालय, सिना","eduGrade10Place":"सिना, दार्चुला, नेपाल","eduGrade10Level":"कक्षा १० सम्मको विद्यालय शिक्षा"});
Object.assign(dict.hi,{"eduGrade10Status":"कक्षा 10 तक","eduGrade10School":"श्री सिद्ध माध्यमिक विद्यालय, सिना","eduGrade10Place":"सिना, दार्चुला, नेपाल","eduGrade10Level":"कक्षा 10 तक स्कूली शिक्षा"});
Object.assign(dict.zh,{"eduGrade10Status":"至十年级","eduGrade10School":"Shree Siddha 中学（Sina）","eduGrade10Place":"尼泊尔达尔楚拉 Sina","eduGrade10Level":"在该校学习至十年级"});
Object.assign(dict.ko,{"eduGrade10Status":"10학년까지","eduGrade10School":"Shree Siddha 중등학교, Sina","eduGrade10Place":"네팔 다르출라 Sina","eduGrade10Level":"10학년까지 학교 교육"});
Object.assign(dict.en,{"techCaption":"BUILD · LEARN · IMPROVE","statProjects":"Portfolio projects","statSkills":"Skill areas","statStudent":"Student in Tokyo","statGpa":"NEB Grade XII GPA","statLanguages":"Website languages"});
Object.assign(dict.ja,{"techCaption":"作る · 学ぶ · 成長する","statProjects":"掲載プロジェクト","statSkills":"技術分野","statStudent":"東京のIT学生","statGpa":"NEB第12学年 GPA","statLanguages":"サイト対応言語"});
Object.assign(dict.ne,{"techCaption":"बनाउने · सिक्ने · सुधार्ने","statProjects":"पोर्टफोलियो प्रोजेक्ट","statSkills":"प्राविधिक सीप","statStudent":"टोकियोमा IT विद्यार्थी","statGpa":"NEB कक्षा १२ GPA","statLanguages":"वेबसाइटका भाषा"});
Object.assign(dict.hi,{"techCaption":"बनाएँ · सीखें · सुधारें","statProjects":"पोर्टफोलियो प्रोजेक्ट","statSkills":"तकनीकी कौशल","statStudent":"टोक्यो में IT छात्र","statGpa":"NEB कक्षा 12 GPA","statLanguages":"वेबसाइट की भाषाएँ"});
Object.assign(dict.zh,{"techCaption":"构建 · 学习 · 进步","statProjects":"作品集项目","statSkills":"技术领域","statStudent":"东京IT学生","statGpa":"NEB 十二年级 GPA","statLanguages":"网站支持语言"});
Object.assign(dict.ko,{"techCaption":"개발 · 학습 · 성장","statProjects":"포트폴리오 프로젝트","statSkills":"기술 분야","statStudent":"도쿄 IT 학생","statGpa":"NEB 12학년 GPA","statLanguages":"웹사이트 언어"});
dict.en.filterStudy="Web projects";
dict.ja.filterStudy="Web制作";
dict.ne.filterStudy="वेब प्रोजेक्ट";
dict.hi.filterStudy="वेब प्रोजेक्ट";
dict.zh.filterStudy="网页项目";
dict.ko.filterStudy="웹 프로젝트";
const cvTranslations={
  en:{subtitle:'Information Processing Student | Tokyo, Japan',profile:'Profile',profileText:'IT student with practical project experience in HTML/CSS, JavaScript, Java and Oracle SQL.',tech:'Technical skills',work:'Selected work',education:'Education',experience:'Experience'},
  ja:{subtitle:'情報処理科 学生 | 日本・東京',profile:'プロフィール',profileText:'HTML/CSS、JavaScript、Java、Oracle SQLを学び、実践的な制作に取り組む情報処理科の学生。',tech:'技術スキル',work:'主な制作',education:'学歴',experience:'経験'},
  ne:{subtitle:'सूचना प्रविधि विद्यार्थी | टोकियो, जापान',profile:'परिचय',profileText:'HTML/CSS, JavaScript, Java र Oracle SQL सिक्दै व्यवहारिक प्रोजेक्टमा काम गर्ने IT विद्यार्थी।',tech:'प्राविधिक सीप',work:'मुख्य प्रोजेक्टहरू',education:'शिक्षा',experience:'अनुभव'},
  hi:{subtitle:'आईटी छात्र | टोक्यो, जापान',profile:'परिचय',profileText:'HTML/CSS, JavaScript, Java और Oracle SQL सीखने तथा व्यावहारिक प्रोजेक्ट बनाने वाला आईटी छात्र।',tech:'तकनीकी कौशल',work:'प्रमुख प्रोजेक्ट',education:'शिक्षा',experience:'अनुभव'},
  zh:{subtitle:'信息处理专业学生 | 日本东京',profile:'个人简介',profileText:'正在学习 HTML/CSS、JavaScript、Java 和 Oracle SQL，并开展实践项目的信息处理学生。',tech:'技术技能',work:'精选项目',education:'教育',experience:'经历'},
  ko:{subtitle:'정보처리 전공 학생 | 일본 도쿄',profile:'소개',profileText:'HTML/CSS, JavaScript, Java, Oracle SQL을 배우며 실습 프로젝트를 진행하는 IT 학생입니다.',tech:'기술 역량',work:'주요 작업',education:'학력',experience:'경험'}
};
const localized = (en,ja,ne,hi,zh,ko)=>({en,ja,ne,hi,zh,ko});
const projects=[
{id:"nextstep",category:"app",icon:"📚",name:"NextStep Study",description:localized("Real ongoing Japanese-learning application work involving vocabulary, grammar, kanji and practice exams.",
"語彙・文法・漢字・模擬試験に取り組む日本語学習アプリの開発。",
"शब्दावली, व्याकरण, कान्जी र अभ्यास परीक्षासहितको जापानी भाषा अध्ययन एपमा जारी काम।",
"शब्दावली, व्याकरण, कांजी और अभ्यास परीक्षाओं वाला जापानी भाषा अध्ययन ऐप।",
"正在开发的日语学习应用，涵盖词汇、语法、汉字和练习考试。",
"어휘, 문법, 한자 및 모의고사를 포함한 일본어 학습 앱 개발 작업."),tech:["React","PWA","Learning"],link:null,linkKind:null,status:"inprogress"},
{id:"gakusai",category:"app",icon:"🎪",name:"GakusaiNavi",description:localized("School-festival information project using Java Servlet and Oracle, developed for coursework.",
"Java ServletとOracleを使って制作した学園祭情報アプリの学校課題。",
"Java Servlet र Oracle प्रयोग गरिएको विद्यालय उत्सव सूचना प्रणालीको प्रोजेक्ट।",
"Java Servlet और Oracle का उपयोग कर बनाया गया स्कूल उत्सव सूचना प्रोजेक्ट।",
"使用 Java Servlet 和 Oracle 开发的校园祭信息课程项目。",
"Java Servlet 및 Oracle로 제작한 학교 축제 정보 프로젝트."),tech:["Java","Servlet","Oracle"],link:null,linkKind:null,status:"inprogress"},
{id:"nepalquest",category:"inprogress",icon:"🏔️",name:"Nepal Quest: 77 Districts",description:localized("Unity/C# educational game project exploring Nepal's 77 districts; still under development.",
"Unity/C#を使用したネパール77地区を題材とする教育ゲーム。開発途中です。",
"नेपालका ७७ जिल्ला चिनाउने Unity/C# शैक्षिक खेल प्रोजेक्ट, निर्माणाधीन।",
"नेपाल के 77 जिलों पर आधारित Unity/C# शैक्षिक गेम, विकासाधीन।",
"使用 Unity/C# 开发的尼泊尔77个地区教育游戏，仍在开发中。",
"네팔 77개 지역을 주제로 한 Unity/C# 교육 게임으로 개발 중입니다."),tech:["Unity","C#","3D"],link:null,linkKind:null,status:"inprogress"},
{id:"qrmenu",category:"app",icon:"🍽️",name:"QR Menu Generator",description:localized("Node.js and SQLite QR menu application project for restaurant ordering and menu access.",
"Node.jsとSQLiteを使った飲食店のQRメニューアプリの制作。",
"रेस्टुरेन्टको QR मेनुका लागि Node.js र SQLite मा भइरहेको एप विकास।",
"रेस्तराँ QR मेनू के लिए Node.js और SQLite पर एप विकास।",
"使用 Node.js 和 SQLite 制作的餐厅二维码菜单应用。",
"Node.js 및 SQLite 기반 레스토랑 QR 메뉴 앱 프로젝트."),tech:["Node.js","SQLite","QR"],link:null,linkKind:null,status:"inprogress"},
{id:"npl",category:"web",icon:"🏏",name:"NPL 2026 Website",description:localized("Nepal Premier League 2026 cricket information website project; live-data features are being developed.",
"ネパール・プレミアリーグ2026のクリケット情報サイト。ライブデータ機能を開発中。",
"नेपाल प्रिमियर लिग २०२६ को क्रिकेट सूचना वेबसाइट, लाइभ डाटा सुविधा विकासाधीन।",
"नेपाल प्रीमियर लीग 2026 की क्रिकेट वेबसाइट, लाइव डेटा सुविधाएँ विकासाधीन।",
"尼泊尔超级联赛2026板球信息网站，实时数据功能仍在开发。",
"네팔 프리미어리그 2026 크리켓 정보 웹사이트이며 실시간 데이터 기능 개발 중입니다."),tech:["HTML","JavaScript","API"],link:null,linkKind:null,status:"inprogress"},
{id:"raspberry",category:"inprogress",icon:"📟",name:"Posture & Distance Alert",description:localized("Student research project for posture and viewing-distance alerts with Raspberry Pi and sensors.",
"Raspberry Piとセンサーによる姿勢・画面距離の注意喚起を目指す学校研究。",
"Raspberry Pi र सेन्सरद्वारा बसाइको मुद्रा र स्क्रिन दूरी सचेत गर्ने विद्यार्थी अनुसन्धान प्रोजेक्ट।",
"Raspberry Pi और सेंसर से मुद्रा तथा स्क्रीन दूरी अलर्ट देने वाला छात्र शोध प्रोजेक्ट।",
"使用 Raspberry Pi 和传感器提醒坐姿及观看距离的学生研究项目。",
"Raspberry Pi와 센서로 자세 및 화면 시청 거리를 알리는 학생 연구 프로젝트."),tech:["Raspberry Pi","Python","Sensors"],link:null,linkKind:null,status:"inprogress"},
{id:"portfolio",category:"web",icon:"🌐",name:"Developer Portfolio",description:localized("This published portfolio website, made with HTML, CSS, JavaScript and a Three.js 3D scene.",
"HTML・CSS・JavaScript・Three.jsを使用した、現在公開中のポートフォリオサイト。",
"HTML, CSS, JavaScript र Three.js बाट बनेको यो प्रकाशित पोर्टफोलियो वेबसाइट।",
"HTML, CSS, JavaScript और Three.js से बनी यह सार्वजनिक पोर्टफोलियो वेबसाइट।",
"使用 HTML、CSS、JavaScript 和 Three.js 构建的本公开作品集网站。",
"HTML, CSS, JavaScript 및 Three.js로 만든 현재 공개된 포트폴리오 웹사이트."),tech:["HTML","CSS","JavaScript","Three.js"],link:"https://dadalupendra.github.io/portfolio/",linkKind:'project',status:"app"}
];
const $=s=>document.querySelector(s);
const all=s=>Array.from(document.querySelectorAll(s));
let language='en',category='all';
try{const saved=localStorage.getItem('portfolio-language-v3');if(dict[saved])language=saved;}catch{}
function translate(){
  const t=dict[language];
  document.documentElement.lang=language;
  document.title='Dadal Upendra Singh | '+t.navProjects;
  all('[data-i18n]').forEach(element=>{
    const key=element.dataset.i18n;
    if(typeof t[key]==='string')element.textContent=t[key];
  });
  $('#siteLanguage').value=language;
  all('[data-cv]').forEach(el=>{const value=cvTranslations[language][el.dataset.cv];if(value)el.textContent=value;});
  renderProjects();
}
function renderProjects(){
  const t=dict[language],grid=$('#projectsGrid');
  grid.replaceChildren();
  all('#projectFilters button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
  const visible=projects.filter(p=>category==='all'||p.category===category);
  if(!visible.length){const p=document.createElement('p');p.className='empty';p.textContent=t.empty;grid.appendChild(p);return;}
  visible.forEach(p=>{
    const article=document.createElement('article');article.className='project';
    const visual=document.createElement('div');visual.className='project-visual';
    const icon=document.createElement('span');icon.className='project-glyph';icon.textContent=p.icon;
    const status=document.createElement('span');status.className='project-state';status.textContent=t[p.status==='app'?'statusApp':p.status==='study'?'statusStudy':'statusProgress'];
    visual.append(status,icon);
    const body=document.createElement('div');body.className='project-body';
    const name=document.createElement('h3');name.textContent=p.name;
    const desc=document.createElement('p');desc.textContent=p.description[language]||p.description.en;
    const tags=document.createElement('div');tags.className='tech-tags';
    p.tech.forEach(tech=>{const span=document.createElement('span');span.textContent=tech;tags.appendChild(span);});
    const links=document.createElement('div');links.className='project-links';
    if(p.link){
      const link=document.createElement('a');link.href=p.link;
      link.textContent=t[p.linkKind==='demo'?'openDemo':'openProject'];
      if(p.link.startsWith('https://')){link.target='_blank';link.rel='noopener noreferrer';}
      links.appendChild(link);
    } else {
      const msg=document.createElement('span');msg.textContent=t.noPublic;msg.style.cssText='color:var(--muted);font-size:.79rem;';links.appendChild(msg);
    }
    body.append(name,desc,tags,links);article.append(visual,body);grid.appendChild(article);
  });
}
$('#siteLanguage').addEventListener('change',e=>{if(!dict[e.target.value])return;language=e.target.value;try{localStorage.setItem('portfolio-language-v3',language);}catch{}translate();});
all('#projectFilters button').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;renderProjects();}));
const themeButton=$('#themeToggle');
let theme='dark';try{theme=localStorage.getItem('portfolio-theme-v3')==='light'?'light':'dark';}catch{}
function applyTheme(){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='dark'?'☀':'☾';themeButton.setAttribute('aria-label',theme==='dark'?'Switch to light appearance':'Switch to dark appearance');}
themeButton.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('portfolio-theme-v3',theme);}catch{}applyTheme();});
applyTheme();
const nav=$('#mainNav'),menu=$('#menuToggle');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
all('#mainNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
$('#resumeButton').addEventListener('click',()=>window.print());
const copyBtn=$('#copyEmail');copyBtn.addEventListener('click',async()=>{
try{await navigator.clipboard.writeText(email);copyBtn.textContent=dict[language].copied;setTimeout(()=>{copyBtn.textContent=dict[language].copyEmail;},1800);}
catch{window.location.href='mailto:'+email;}
});
$('#footerYear').textContent=new Date().getFullYear();
translate();
})();