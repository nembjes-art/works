/* ============================================================
   Единственный источник данных о работах.
   Все секции витрины (герой-слайдер, сетка проектов, счётчики,
   фильтры, просмотрщик) строятся из этого массива.

   Текстовые поля многоязычные: { ru, en, et }. Всё остальное —
   обычные строки. Хелпер tr() в app.js достаёт нужный язык.

   type Localized = { ru: string; en: string; et: string };
   type Project = {
     id: string;                 // папка projects/<id>/ и файл assets/<id>.jpg
     title: string;
     shortTitle?: string;        // крупная типографика поверх круга
     category: Localized;        // конкретный жанр работы
     type: 'Website'|'Web App'|'Mobile App'|'E-commerce';
     year: string;
     role?: Localized;
     tagline?: Localized;        // короткая вспомогательная подпись
     description: Localized;
     technologies: string[];     // универсальные названия, не переводятся
     image: string;
     mobileImage?: string;
     accent: string;             // акцентный цвет проекта
     backgroundAccent?: string;  // цвет фонового свечения
     liveUrl?: string;           // открывается в iframe и в новой вкладке
     caseStudyUrl?: string;      // если нет — кнопка раскрывает карточку ниже
     status?: 'live' | 'concept' | 'development';
     locale?: string;            // язык самого сайта, не интерфейса витрины
     facts?: { k: Localized, v: string }[];
   }
   ============================================================ */

const PROJECTS = [
  {
    id: 'kiri',
    title: 'KIRI 桐',
    shortTitle: 'KIRI',
    category: { ru:'Путешествия по Японии', en:'Japan travel atelier', et:'Jaapani reisiateljee' },
    type: 'Website',
    year: '2026',
    role: { ru:'Дизайн и разработка', en:'Design & development', et:'Disain ja arendus' },
    tagline: {
      ru:'Концепт-сайт ателье частных путешествий',
      en:'Concept site for a private-travel atelier',
      et:'Erareiside ateljee kontseptsioonileht'
    },
    description: {
      ru:'Ателье частных путешествий по Японии: нарисованная сакура и тории, проход сквозь ворота при скролле, десять разделов, три языка и собственная светлая/тёмная тема. Концепт — бренда не существует, фото и отзывы помечены как плейсхолдеры.',
      en:'An atelier of private journeys through Japan: drawn sakura and torii, a walk through the gate as you scroll, ten sections, three languages and its own light/dark theme. A concept — the brand does not exist, and photos and reviews are marked as placeholders.',
      et:'Erareiside ateljee Jaapanis: joonistatud sakura ja torii, väravast läbiminek kerimisel, kümme osa, kolm keelt ning oma hele/tume teema. Kontseptsioon — brändi ei ole olemas, fotod ja arvustused on märgitud kohatäideteks.'
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'i18n'],
    image: 'assets/kiri.jpg',
    accent: '#D2604A',
    backgroundAccent: '#25110D',
    liveUrl: 'projects/kiri/index.html',
    status: 'concept',
    locale: 'RU / EN / JA',
    facts: [
      { k:{ ru:'Разделов', en:'Sections', et:'Osa' }, v:'10' },
      { k:{ ru:'Языка сайта', en:'Site languages', et:'Lehe keelt' }, v:'3' },
      { k:{ ru:'Темы', en:'Themes', et:'Teemat' }, v:'2' }
    ]
  },

  {
    id: 'aria',
    title: 'ARIA — The Crimson Vow',
    shortTitle: 'ARIA',
    category: { ru:'Промо-сайт игры', en:'Game promo site', et:'Mängu promoleht' },
    type: 'Website',
    year: '2026',
    role: { ru:'Дизайн и разработка', en:'Design & development', et:'Disain ja arendus' },
    tagline: {
      ru:'Пятисекундное видео, которое отматывается скроллом',
      en:'A five-second film you scrub with the scroll wheel',
      et:'Viiesekundiline film, mida keritakse hiirerattaga'
    },
    description: {
      ru:'Промо-сайт вымышленной open-world RPG. Пятисекундный ролик нарезан на 121 кадр и отрисовывается на canvas: позиция скролла становится номером кадра, между кадрами идёт сглаживание — камера тянется за колесом мыши и замирает там, где остановились вы. Поверх кадров живут слои параллакса: побуквенный заголовок, реплики, привязанные к отрезкам таймлайна, угольки и плёночное зерно. Ниже — параллакс-полосы регионов, карточки героев, галерея с лайтбоксом и предзаказ. Английский с переключателем на русский, отдельный набор кадров для телефонов.',
      en:'A promo site for a fictional open-world RPG. A five-second clip is cut into 121 frames and painted on a canvas: scroll position becomes the frame index, with smoothing in between — the camera follows the wheel and stops where you stop. Parallax layers ride on top: a per-letter title, captions pinned to slices of the timeline, embers and film grain. Below it, parallax region bands, character cards, a gallery with a lightbox and a pre-order block. English with a Russian toggle, plus a separate frame set for phones.',
      et:'Väljamõeldud avatud maailma RPG promoleht. Viiesekundiline klipp on lõigatud 121 kaadriks ja joonistatakse canvasele: kerimiskoht on kaadri number, vahepeal silumine — kaamera järgneb rattale ja peatub seal, kus sina. Peal liiguvad parallaksikihid: tähthaaval ilmuv pealkiri, ajateljega seotud tekstid, sädemed ja filmiterake. Allpool parallaksiribad, tegelaskaardid, galerii ja eeltellimuse plokk. Inglise keel vene keele lülitiga ning eraldi kaadrikomplekt telefonidele.'
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'Frame sequence', 'Parallax', 'WebP', 'i18n'],
    image: 'assets/aria.jpg',
    accent: '#E0AE5A',
    backgroundAccent: '#1B0A0E',
    liveUrl: 'projects/aria/index.html',
    status: 'live',
    locale: 'EN / RU',
    facts: [
      { k:{ ru:'Кадров в секвенции', en:'Frames in sequence', et:'Kaadrit jadas' }, v:'121' },
      { k:{ ru:'Библиотек', en:'Libraries', et:'Teeke' }, v:'0' },
      { k:{ ru:'Языка сайта', en:'Site languages', et:'Lehe keelt' }, v:'EN / RU' }
    ]
  },

  {
    id: 'renew',
    title: 'Renew',
    shortTitle: 'RENEW',
    category: { ru:'Косметология', en:'Skincare clinic', et:'Iluteenused' },
    type: 'Website',
    year: '2026',
    role: { ru:'Дизайн и разработка', en:'Design & development', et:'Disain ja arendus' },
    tagline: {
      ru:'Сайт клиники: услуги, цены, запись',
      en:'Clinic site: services, prices, booking',
      et:'Kliiniku leht: teenused, hinnad, broneering'
    },
    description: {
      ru:'Сайт косметологической клиники в Нарве: услуги, прозрачные цены и запись в один клик. Мягкая тёплая типографика, спокойный ритм блоков, всё читается с телефона.',
      en:'A skincare clinic in Narva: services, honest prices and one-click booking. Soft warm typography, a calm rhythm of blocks, all of it readable from a phone.',
      et:'Iluteenuste kliinik Narvas: teenused, ausad hinnad ja broneering ühe klõpsuga. Pehme soe tüpograafia, rahulik plokkide rütm, kõik loetav telefonist.'
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'SEO'],
    image: 'assets/renew.jpg',
    accent: '#D98A94',
    backgroundAccent: '#2A1620',
    liveUrl: 'projects/renew/index.html',
    status: 'live',
    locale: 'RU',
    facts: [
      { k:{ ru:'Секций', en:'Sections', et:'Osa' }, v:'7' },
      { k:{ ru:'Вес страницы', en:'Page weight', et:'Lehe kaal' }, v:'12 KB' },
      { k:{ ru:'Язык сайта', en:'Site language', et:'Lehe keel' }, v:'Русский' }
    ]
  },

  {
    id: 'kohvik',
    title: 'Põhja Kohvik',
    shortTitle: 'KOHVIK',
    category: { ru:'Кофейня', en:'Coffee house', et:'Kohvik' },
    type: 'Website',
    year: '2026',
    role: { ru:'Дизайн и разработка', en:'Design & development', et:'Disain ja arendus' },
    tagline: {
      ru:'Меню, часы работы и дорога до кофейни',
      en:'Menu, opening hours and the way there',
      et:'Menüü, lahtiolekuajad ja tee kohale'
    },
    description: {
      ru:'Кофейня и завтраки в старой Нарве. Меню, часы работы, атмосферные фото-блоки и карта. Эстонский язык, бумажная палитра и много воздуха — сайт, который не спорит с едой.',
      en:'Coffee and breakfast in old Narva. Menu, opening hours, atmospheric photo blocks and a map. Estonian, a paper palette and plenty of air — a site that does not argue with the food.',
      et:'Kohv ja hommikusöök Narva vanalinnas. Menüü, lahtiolekuajad, meeleolukad fotoplokid ja kaart. Eesti keel, paberine palett ja palju õhku — leht, mis toiduga ei võistle.'
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Local SEO', 'i18n'],
    image: 'assets/kohvik.jpg',
    accent: '#D2864B',
    backgroundAccent: '#1E1409',
    liveUrl: 'projects/kohvik/index.html',
    status: 'live',
    locale: 'ET',
    facts: [
      { k:{ ru:'Секций', en:'Sections', et:'Osa' }, v:'6' },
      { k:{ ru:'Вес страницы', en:'Page weight', et:'Lehe kaal' }, v:'12 KB' },
      { k:{ ru:'Язык сайта', en:'Site language', et:'Lehe keel' }, v:'Eesti' }
    ]
  }
];

/* Типы работ, которые я делаю. Чипы фильтра строятся отсюда,
   чтобы пустые направления были видны, но не кликались.
   Подписи — ключи словаря в i18n.js. */
const PROJECT_TYPES = [
  { id:'Website',    key:'fWebsite' },
  { id:'Web App',    key:'fWebApp' },
  { id:'Mobile App', key:'fMobile' },
  { id:'E-commerce', key:'fEcom' }
];

const STATUS_LABEL = {
  live: 'Live',
  concept: 'Concept',
  development: 'In development'
};
