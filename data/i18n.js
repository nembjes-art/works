/* ============================================================
   Словарь интерфейса: русский, английский, эстонский.
   Ключи проставлены в разметке атрибутом data-t (текст)
   и data-t-aria (aria-label). Тексты самих работ — в projects.js.
   ============================================================ */

const LANGS = ['ru', 'en', 'et'];
const LANG_HTML = { ru: 'ru', en: 'en', et: 'et' };

const I18N = {

  ru: {
    navHome:'Главная', navProjects:'Работы', navServices:'Услуги', navAbout:'Обо мне', navContact:'Контакты',
    navAvail:'Свободен для проекта',
    langLabel:'Язык интерфейса', themeLabel:'Светлая или тёмная тема', menuLabel:'Меню',

    hType:'Тип', hYear:'Год', hRole:'Роль',
    hView:'Смотреть проект', hCase:'Подробнее',
    hPrev:'Предыдущий проект', hNext:'Следующий проект', hTicker:'Проекты',
    railL:'Избранные работы — 2026', railR:'Сделано и запущено',

    perk1:'Сайты',              perk1s:'Лендинги и сайты компаний',
    perk2:'Веб-приложения',     perk2s:'Личные кабинеты и панели',
    perk3:'Мобильные приложения', perk3s:'Приложения и PWA',
    perk4:'UI/UX и разработка',  perk4s:'От макета до продакшена',

    sSrvNum:'01 — Услуги', sSrvTitle:'Что я делаю', sSrvEm:'от идеи до релиза',
    sSrvLead:'Один человек ведёт проект целиком: исследование, дизайн, вёрстка, код, запуск и поддержка. Без передачи между отделами и потерь по дороге.',
    srv1:'Лендинги',              srv1d:'Одна страница, которая продаёт: оффер, доказательства, форма заявки.',
    srv2:'Корпоративные сайты',   srv2d:'Сайт компании: услуги, команда, цены, контакты и понятная SEO-структура.',
    srv3:'Интернет-магазины',     srv3d:'Каталог, корзина, оплата и выгрузка заказов туда, где вам удобно их читать.',
    srv4:'Веб-приложения',        srv4d:'Личные кабинеты, панели управления, калькуляторы и внутренние сервисы.',
    srv5:'Мобильные приложения',  srv5d:'Приложения и PWA: один код — телефон, планшет и десктоп.',
    srv6:'UI/UX-дизайн',          srv6d:'Прототип, макет и дизайн-система до того, как написана первая строка кода.',
    srv7:'Frontend-разработка',   srv7d:'Чистая семантика, доступность, 60 fps и вес страницы в килобайтах.',
    srv8:'Full-stack разработка', srv8d:'База, API, авторизация, интеграции и деплой — под ключ.',

    sPrjNum:'02 — Избранные работы', sPrjTitle:'Работы,', sPrjEm:'которые можно потрогать',
    sPrjLead:'Не картинки и не мокапы: любой проект запускается прямо здесь — можно скроллить, кликать и смотреть, как он ведёт себя на телефоне.',
    fAll:'Все работы', fWebsite:'Сайты', fWebApp:'Веб-приложения', fMobile:'Мобильные', fEcom:'Магазины',
    cMore:'Подробнее о проекте', cLess:'Свернуть', cOpen:'Открыть демо →',
    cNewTab:'Открыть в новой вкладке ↗', cEmpty:'В этом направлении работ пока нет — напишите, и она появится.',
    cOpenAria:'Открыть',

    sPrcNum:'03 — Процесс', sPrcTitle:'Как идёт работа',
    st1:'Знакомство', st1d:'Разбираем задачу, аудиторию и конкурентов. Что должно произойти после запуска.',
    st2:'Стратегия',  st2d:'Структура, сценарии, приоритеты экранов и метрики, по которым сверяемся.',
    st3:'Дизайн',     st3d:'Прототип и визуальный язык: типографика, цвет, ритм и движение.',
    st4:'Разработка', st4d:'Вёрстка и код. Чистый стек, без лишних зависимостей и конструкторов.',
    st5:'Тестирование', st5d:'Телефоны, браузеры, скорость, доступность, формы и аналитика.',
    st6:'Запуск',     st6d:'Домен, хостинг, поисковики и поддержка после запуска.',

    sAbtNum:'04 — Обо мне', sAbtTitle:'Разработчик', sAbtEm:'цифровых продуктов',
    ab1:'Меня зовут Артём. Я делаю сайты и приложения из Нарвы — от первого разговора о задаче до сайта, который уже работает и приносит заявки.',
    ab2:'Дизайн и код у меня не разделены: я сам рисую интерфейс и сам его пишу, поэтому макет не «упрощается при вёрстке», а анимация закладывается там, где она действительно нужна. Пишу на чистом стеке без лишних зависимостей — страницы получаются лёгкими и открываются мгновенно даже на слабом телефоне.',
    ab3:'Работаю на русском, эстонском и английском. Беру проекты целиком и остаюсь на связи после запуска.',
    abs1:'проекта в витрине', abs2:'живых демо', abs3:'языка интерфейса', abs4:'шаблонов и конструкторов',

    sCntNum:'05 — Контакты', sCntTitle:'Расскажите,<br>что нужно сделать',
    sCntLead:'Опишите задачу в двух словах — отвечу в течение дня, предложу решение и назову сроки. Первая консультация ничего не стоит.',
    cBtn:'Написать письмо',
    soc1:'GitHub', soc2:'Почта', soc3:'Живые демо', soc3s:'открываются на странице',

    vDesktop:'Десктоп', vTablet:'Планшет', vPhone:'Телефон',
    vOpen:'Открыть в новой вкладке ↗', vClose:'Закрыть', vPrev:'Предыдущий', vNext:'Следующий',
    vDialog:'Просмотр проекта',

    fCopy:'— все проекты собраны вручную', fHost:'Витрина работает на GitHub Pages',
    skip:'К проектам'
  },

  en: {
    navHome:'Home', navProjects:'Projects', navServices:'Services', navAbout:'About', navContact:'Contact',
    navAvail:'Available for work',
    langLabel:'Interface language', themeLabel:'Light or dark theme', menuLabel:'Menu',

    hType:'Type', hYear:'Year', hRole:'Role',
    hView:'View project', hCase:'Case study',
    hPrev:'Previous project', hNext:'Next project', hTicker:'Projects',
    railL:'Selected work — 2026', railR:'Built & shipped',

    perk1:'Websites',             perk1s:'Landing pages and company sites',
    perk2:'Web Applications',     perk2s:'Dashboards and client areas',
    perk3:'Mobile Applications',  perk3s:'Apps and PWAs',
    perk4:'UI/UX & Development',  perk4s:'From layout to production',

    sSrvNum:'01 — Services', sSrvTitle:'What I do', sSrvEm:'from idea to release',
    sSrvLead:'One person runs the whole project: research, design, markup, code, launch and support. No handovers between departments, nothing lost on the way.',
    srv1:'Landing Pages',          srv1d:'One page that sells: the offer, the proof, the enquiry form.',
    srv2:'Corporate Websites',     srv2d:'A company site: services, team, pricing, contacts and a clear SEO structure.',
    srv3:'E-commerce',             srv3d:'Catalogue, cart, payments and orders exported wherever you actually read them.',
    srv4:'Web Applications',       srv4d:'Client areas, dashboards, calculators and internal tools.',
    srv5:'Mobile Applications',    srv5d:'Apps and PWAs: one codebase for phone, tablet and desktop.',
    srv6:'UI/UX Design',           srv6d:'Prototype, layout and design system before the first line of code.',
    srv7:'Frontend Development',   srv7d:'Clean semantics, accessibility, 60 fps and a page weighed in kilobytes.',
    srv8:'Full-stack Development', srv8d:'Database, API, auth, integrations and deployment — end to end.',

    sPrjNum:'02 — Selected projects', sPrjTitle:'Work you can', sPrjEm:'actually touch',
    sPrjLead:'Not pictures, not mock-ups: every project runs right here — scroll it, click it, and see how it behaves on a phone.',
    fAll:'All work', fWebsite:'Websites', fWebApp:'Web Apps', fMobile:'Mobile', fEcom:'E-commerce',
    cMore:'More about the project', cLess:'Collapse', cOpen:'Open demo →',
    cNewTab:'Open in a new tab ↗', cEmpty:'Nothing here yet — get in touch and it will be.',
    cOpenAria:'Open',

    sPrcNum:'03 — Process', sPrcTitle:'How the work goes',
    st1:'Discovery',   st1d:'The task, the audience, the competitors. What should happen after launch.',
    st2:'Strategy',    st2d:'Structure, scenarios, screen priorities and the metrics we check against.',
    st3:'Design',      st3d:'Prototype and visual language: typography, colour, rhythm and motion.',
    st4:'Development', st4d:'Markup and code. A clean stack, no needless dependencies or page builders.',
    st5:'Testing',     st5d:'Phones, browsers, speed, accessibility, forms and analytics.',
    st6:'Launch',      st6d:'Domain, hosting, search engines and support after go-live.',

    sAbtNum:'04 — About', sAbtTitle:'Developer of', sAbtEm:'digital products',
    ab1:'My name is Artjom. I build websites and applications from Narva — from the first conversation about the task to a site that already works and brings in enquiries.',
    ab2:'Design and code are not separate here: I draw the interface and I write it, so the layout is never "simplified during markup" and motion goes exactly where it earns its place. I write on a clean stack without extra dependencies — pages stay light and open instantly even on a slow phone.',
    ab3:'I work in Russian, Estonian and English. I take projects whole and stay reachable after launch.',
    abs1:'projects on show', abs2:'live demos', abs3:'interface languages', abs4:'templates or builders',

    sCntNum:'05 — Contact', sCntTitle:'Tell me what<br>needs building',
    sCntLead:'Describe the task in a couple of lines — I answer within a day with an approach and a timeline. The first consultation costs nothing.',
    cBtn:'Send an email',
    soc1:'GitHub', soc2:'Email', soc3:'Live demos', soc3s:'they run on this page',

    vDesktop:'Desktop', vTablet:'Tablet', vPhone:'Phone',
    vOpen:'Open in a new tab ↗', vClose:'Close', vPrev:'Previous', vNext:'Next',
    vDialog:'Project preview',

    fCopy:'— every project built by hand', fHost:'This showcase runs on GitHub Pages',
    skip:'To the projects'
  },

  et: {
    navHome:'Avaleht', navProjects:'Tööd', navServices:'Teenused', navAbout:'Minust', navContact:'Kontakt',
    navAvail:'Vaba uue projekti jaoks',
    langLabel:'Liidese keel', themeLabel:'Hele või tume teema', menuLabel:'Menüü',

    hType:'Tüüp', hYear:'Aasta', hRole:'Roll',
    hView:'Vaata projekti', hCase:'Lähemalt',
    hPrev:'Eelmine projekt', hNext:'Järgmine projekt', hTicker:'Projektid',
    railL:'Valitud tööd — 2026', railR:'Tehtud ja käivitatud',

    perk1:'Veebilehed',            perk1s:'Maandumislehed ja ettevõtte lehed',
    perk2:'Veebirakendused',       perk2s:'Kliendialad ja töölauad',
    perk3:'Mobiilirakendused',     perk3s:'Rakendused ja PWA',
    perk4:'UI/UX ja arendus',      perk4s:'Maketist tootmiseni',

    sSrvNum:'01 — Teenused', sSrvTitle:'Mida ma teen', sSrvEm:'ideest väljalaskeni',
    sSrvLead:'Üks inimene veab projekti algusest lõpuni: uuring, disain, küljendus, kood, käivitamine ja tugi. Ilma üleandmisteta osakondade vahel.',
    srv1:'Maandumislehed',      srv1d:'Üks leht, mis müüb: pakkumine, tõestus ja päringuvorm.',
    srv2:'Ettevõtte veebilehed', srv2d:'Teenused, meeskond, hinnad, kontaktid ja selge SEO-struktuur.',
    srv3:'E-pood',              srv3d:'Kataloog, ostukorv, maksed ja tellimused sinna, kus neid tegelikult loed.',
    srv4:'Veebirakendused',     srv4d:'Kliendialad, töölauad, kalkulaatorid ja sisemised tööriistad.',
    srv5:'Mobiilirakendused',   srv5d:'Rakendused ja PWA: üks kood telefonile, tahvlile ja lauaarvutile.',
    srv6:'UI/UX disain',        srv6d:'Prototüüp, makett ja disainisüsteem enne esimest koodirida.',
    srv7:'Frontend-arendus',    srv7d:'Puhas semantika, ligipääsetavus, 60 fps ja lehekaal kilobaitides.',
    srv8:'Full-stack arendus',  srv8d:'Andmebaas, API, autentimine, liidestused ja juurutus — võtmed kätte.',

    sPrjNum:'02 — Valitud tööd', sPrjTitle:'Tööd, mida saab', sPrjEm:'päriselt katsuda',
    sPrjLead:'Mitte pildid ega maketid: iga projekt käivitub siinsamas — keri, klõpsa ja vaata, kuidas ta telefonis käitub.',
    fAll:'Kõik tööd', fWebsite:'Veebilehed', fWebApp:'Veebirakendused', fMobile:'Mobiil', fEcom:'E-pood',
    cMore:'Projektist lähemalt', cLess:'Sulge', cOpen:'Ava demo →',
    cNewTab:'Ava uues aknas ↗', cEmpty:'Selles suunas veel töid pole — kirjuta ja tuleb.',
    cOpenAria:'Ava',

    sPrcNum:'03 — Protsess', sPrcTitle:'Kuidas töö käib',
    st1:'Tutvumine', st1d:'Ülesanne, sihtrühm ja konkurendid. Mis peab pärast käivitamist juhtuma.',
    st2:'Strateegia', st2d:'Struktuur, stsenaariumid, ekraanide tähtsus ja mõõdikud, mille järgi vaatame.',
    st3:'Disain',    st3d:'Prototüüp ja visuaalne keel: tüpograafia, värv, rütm ja liikumine.',
    st4:'Arendus',   st4d:'Küljendus ja kood. Puhas tehnoloogia, ilma liigsete sõltuvusteta.',
    st5:'Testimine', st5d:'Telefonid, brauserid, kiirus, ligipääsetavus, vormid ja analüütika.',
    st6:'Käivitamine', st6d:'Domeen, majutus, otsingumootorid ja tugi pärast avaldamist.',

    sAbtNum:'04 — Minust', sAbtTitle:'Digitoodete', sAbtEm:'arendaja',
    ab1:'Minu nimi on Artjom. Teen veebilehti ja rakendusi Narvast — esimesest vestlusest kuni lehena, mis juba töötab ja toob päringuid.',
    ab2:'Disain ja kood ei ole minu juures lahus: joonistan liidese ise ja kirjutan selle ise, nii et makett ei „lihtsustu küljendamisel“ ning animatsioon läheb sinna, kus seda päriselt vaja on. Kirjutan puhta tehnoloogiaga ilma liigsete sõltuvusteta — lehed jäävad kergeks ja avanevad kohe ka nõrgas telefonis.',
    ab3:'Töötan vene, eesti ja inglise keeles. Võtan projekti tervikuna ja jään pärast käivitamist kättesaadavaks.',
    abs1:'projekti vitriinis', abs2:'elavat demo', abs3:'liidese keelt', abs4:'malli või konstruktorit',

    sCntNum:'05 — Kontakt', sCntTitle:'Räägi, mida<br>on vaja teha',
    sCntLead:'Kirjelda ülesannet paari lausega — vastan päeva jooksul, pakun lahenduse ja ütlen tähtaja. Esimene konsultatsioon on tasuta.',
    cBtn:'Kirjuta kiri',
    soc1:'GitHub', soc2:'E-post', soc3:'Elavad demod', soc3s:'avanevad siinsamas lehel',

    vDesktop:'Lauaarvuti', vTablet:'Tahvel', vPhone:'Telefon',
    vOpen:'Ava uues aknas ↗', vClose:'Sulge', vPrev:'Eelmine', vNext:'Järgmine',
    vDialog:'Projekti vaade',

    fCopy:'— kõik projektid tehtud käsitsi', fHost:'Vitriin töötab GitHub Pagesil',
    skip:'Projektide juurde'
  }
};
