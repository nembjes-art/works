/* =========================================================
   Витрина работ — логика страницы.
   Данные о проектах — data/projects.js, тексты — data/i18n.js.
   ========================================================= */
(function () {
'use strict';

var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var root = document.documentElement;

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var SWAP = reduce ? 1 : 900;      /* длительность перехода слайдера */
var LOCK = reduce ? 60 : 470;     /* защита от слишком частых переключений */

document.getElementById('year').textContent = new Date().getFullYear();

/* появление блоков при скролле — наблюдатель нужен раньше отрисовки секций */
var revealIO = new IntersectionObserver(function (ents) {
  ents.forEach(function (en) {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    revealIO.unobserve(en.target);
  });
}, { threshold: .12, rootMargin: '0px 0px -8% 0px' });

function revealWatch(el) { if (reduce) { el.classList.add('in'); return; } revealIO.observe(el); }

/* ═════════ язык ═════════ */

var LANG = root.getAttribute('data-lang');
if (LANGS.indexOf(LANG) < 0) LANG = 'ru';

function t(key) {
  var d = I18N[LANG] || I18N.ru;
  return (key in d) ? d[key] : (I18N.ru[key] !== undefined ? I18N.ru[key] : key);
}
/* многоязычное поле проекта -> строка */
function tr(v) {
  if (v == null) return '';
  return (typeof v === 'string') ? v : (v[LANG] || v.ru || v.en || '');
}
function pad(n) { return (n < 10 ? '0' : '') + n; }

function applyStatic() {
  $$('[data-t]').forEach(function (el) { el.textContent = t(el.dataset.t); });
  $$('[data-t-html]').forEach(function (el) { el.innerHTML = t(el.dataset.tHtml); });
  $$('[data-t-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.tAria)); });
}

/* ═════════ тема ═════════ */

var themeBtn = $('#theme');

function applyTheme(th, save) {
  root.setAttribute('data-theme', th);
  themeBtn.setAttribute('aria-pressed', String(th === 'light'));
  if (save) { try { localStorage.setItem('works-theme', th); } catch (e) {} }
  syncThemeColor();
}
function syncThemeColor() {
  var m = document.querySelector('meta[name="theme-color"]');
  if (!m) return;
  var light = root.getAttribute('data-theme') === 'light';
  m.setAttribute('content', light ? '#F2EEE8' : (PROJECTS[idx] && PROJECTS[idx].backgroundAccent) || '#060506');
}
themeBtn.addEventListener('click', function () {
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
});

/* ═════════ навигация ═════════ */

var nav = $('#nav'), burger = $('#burger'), navLinks = $('#navLinks');

burger.addEventListener('click', function () {
  var open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('show', !open);
});
navLinks.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('show');
    burger.setAttribute('aria-expanded', 'false');
  }
});

var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 24); };
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

(function () {
  var links = $$('#navLinks a'), map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('on'); });
      var a = map[en.target.id];
      if (a) a.classList.add('on');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'projects', 'services', 'about', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();

/* ═════════ декоративные деления вокруг круга ═════════ */
(function () {
  var g = $('#ticks'), html = '';
  for (var i = 0; i < 72; i++) {
    var a = (i / 72) * Math.PI * 2;
    var long = i % 6 === 0;
    var r1 = 404, r2 = 404 + (long ? 13 : 6);
    html += '<line x1="' + (500 + Math.cos(a) * r1).toFixed(1) + '" y1="' + (500 + Math.sin(a) * r1).toFixed(1) +
            '" x2="' + (500 + Math.cos(a) * r2).toFixed(1) + '" y2="' + (500 + Math.sin(a) * r2).toFixed(1) +
            '" opacity="' + (long ? '.55' : '.25') + '"/>';
  }
  g.insertAdjacentHTML('beforeend', html);
})();

/* ═════════ ГЕРОЙ-СЛАЙДЕР ═════════ */

var stage = $('#stage'), orbMedia = $('#orbMedia'), wordmark = $('#wordmark'), ticker = $('#ticker');
var idx = 0, busy = false, queued = null, layers = [];

PROJECTS.forEach(function (p, i) {
  var fig = document.createElement('figure');
  fig.innerHTML = '<img src="' + p.image + '" alt="' + p.title + '" ' +
                  (i === 0 ? 'fetchpriority="high"' : 'loading="lazy"') + '>';
  if (i === 0) fig.className = 'is-active';
  orbMedia.appendChild(fig);
  layers.push(fig);
});

PROJECTS.forEach(function (p, i) {
  var b = document.createElement('button');
  b.className = 'tick'; b.type = 'button'; b.setAttribute('role', 'tab');
  b.setAttribute('aria-selected', String(i === 0));
  b.setAttribute('aria-label', p.title);
  b.innerHTML = '<i></i><span>' + (p.shortTitle || p.title) + '</span>';
  b.addEventListener('click', function () { go(i); });
  ticker.appendChild(b);
});

var F = {};
$$('[data-f]').forEach(function (el) { F[el.dataset.f] = el; });

function applyAccent(p) {
  root.style.setProperty('--accent', p.accent);
  root.style.setProperty('--bg-accent', p.backgroundAccent || '#140d08');
  syncThemeColor();
}

/* поля героя для текущего проекта */
function heroFields(p) {
  return [
    [F.type,        p.type],
    [F.year,        p.year],
    [F.role,        tr(p.role) || '—'],
    [F.tagline,     tr(p.tagline)],
    [F.num,         pad(idx + 1)],
    [F.status,      null],
    [F.title,       p.title],
    [F.category,    tr(p.category)],
    [F.description, tr(p.description)],
    [F.tech,        null]
  ];
}
function writeHero(p) {
  heroFields(p).forEach(function (pair) {
    if (pair[0] && pair[1] !== null) pair[0].textContent = pair[1];
  });
  F.status.className = 'status st-' + (p.status || 'live');
  F.status.innerHTML = '<span class="dot-live"></span>' + (STATUS_LABEL[p.status] || 'Live');
  F.tech.innerHTML = p.technologies.map(function (x) { return '<li>' + x + '</li>'; }).join('');
  F.total.textContent = pad(PROJECTS.length);
  if (F.statProjects) F.statProjects.textContent = PROJECTS.length;
}

/* текст меняется с небольшой задержкой относительно картинки */
function swapText(p) {
  var items = heroFields(p);
  items.forEach(function (pair, i) {
    if (!pair[0]) return;
    pair[0].style.transitionDelay = reduce ? '0ms' : (60 + i * 26) + 'ms';
    pair[0].classList.add('swap');
  });
  setTimeout(function () {
    writeHero(p);
    items.forEach(function (pair) { if (pair[0]) pair[0].classList.remove('swap'); });
  }, reduce ? 0 : 260);
}

function go(i, dir) {
  i = ((i % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
  if (i === idx) return;
  if (busy) { queued = i; return; }

  busy = true;
  var prevIdx = idx;
  idx = i;
  var p = PROJECTS[idx];

  var out = layers[prevIdx], next = layers[idx];
  out.classList.remove('is-active');
  out.classList.add('is-out');
  next.classList.remove('is-out');
  void next.offsetWidth;          /* перезапуск стартового состояния */
  next.classList.add('is-active');

  stage.classList.add('turning');

  wordmark.style.opacity = '0';
  wordmark.style.transform = 'translateX(-50%) scale(' + (dir === -1 ? 1.06 : .94) + ')';
  setTimeout(function () {
    wordmark.textContent = p.shortTitle || p.title;
    wordmark.style.transform = 'translateX(-50%) scale(1)';
    wordmark.style.opacity = '1';
  }, reduce ? 0 : 300);

  applyAccent(p);
  swapText(p);
  $$('.tick', ticker).forEach(function (b, n) { b.setAttribute('aria-selected', String(n === idx)); });

  setTimeout(function () { out.classList.remove('is-out'); stage.classList.remove('turning'); }, SWAP);
  setTimeout(function () {
    busy = false;
    if (queued !== null) { var q = queued; queued = null; go(q); }
  }, LOCK);
}
function move(d) { go(idx + d, d); }

$('#prev').addEventListener('click', function () { move(-1); });
$('#next').addEventListener('click', function () { move(1); });

var heroVisible = true;
document.addEventListener('keydown', function (e) {
  if ($('#viewer').classList.contains('open')) return;
  if (!heroVisible) return;
  var el = e.target;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
  if (e.key === 'ArrowLeft')  move(-1);
  if (e.key === 'ArrowRight') move(1);
});

/* колесо — только над центральной композицией */
var wheelAcc = 0, wheelAt = 0;
stage.addEventListener('wheel', function (e) {
  var now = Date.now();
  if (now - wheelAt > 220) wheelAcc = 0;
  wheelAt = now;
  wheelAcc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (Math.abs(wheelAcc) > 42) {
    e.preventDefault();
    move(wheelAcc > 0 ? 1 : -1);
    wheelAcc = 0;
  }
}, { passive: false });

/* свайпы */
(function () {
  var x0 = 0, y0 = 0, on = false;
  stage.addEventListener('touchstart', function (e) {
    on = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (!on) return; on = false;
    var tch = e.changedTouches[0], dx = tch.clientX - x0, dy = tch.clientY - y0;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) move(dx < 0 ? 1 : -1);
  }, { passive: true });
})();

$('#btnView').addEventListener('click', function () { openViewer(idx); });
$('#orb').addEventListener('click', function () { openViewer(idx); });
$('#btnCase').addEventListener('click', function () {
  var p = PROJECTS[idx];
  if (p.caseStudyUrl) { window.open(p.caseStudyUrl, '_blank', 'noopener'); return; }
  activeFilter = 'all';
  renderBento();
  document.getElementById('projects').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  setTimeout(function () {
    var card = $('.pc[data-id="' + p.id + '"]');
    if (!card) return;
    setCardOpen(card, true);
    card.classList.add('flash');
    setTimeout(function () { card.classList.remove('flash'); }, 1600);
  }, reduce ? 0 : 700);
});

/* ═════════ SERVICES ═════════ */

var SERVICES = [
  { k:'srv1', s:'lg' }, { k:'srv2', s:'' },   { k:'srv3', s:'' },  { k:'srv4', s:'lg' },
  { k:'srv5', s:'' },   { k:'srv6', s:'sm' }, { k:'srv7', s:'sm' }, { k:'srv8', s:'' }
];

function renderServices() {
  $('#srv').innerHTML = SERVICES.map(function (s, i) {
    return '<li' + (s.s ? ' data-scale="' + s.s + '"' : '') + ' class="rv">' +
      '<a class="srv-row" href="#contact">' +
        '<span class="srv-n">' + pad(i + 1) + '</span>' +
        '<span class="srv-name">' + t(s.k) + '</span>' +
        '<span class="srv-desc">' + t(s.k + 'd') + '</span>' +
        '<svg class="srv-go" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1"/></svg>' +
      '</a></li>';
  }).join('');
  $$('#srv .rv').forEach(revealWatch);
}

/* ═════════ PROCESS ═════════ */

var stepsShown = false;

function renderSteps() {
  var ol = $('#steps');
  ol.innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) {
    return '<li' + (stepsShown ? ' class="on"' : '') + '><span class="step-n">' + pad(n) + '</span>' +
      '<span class="step-dot"></span><h3 class="step-t">' + t('st' + n) + '</h3>' +
      '<p class="step-d">' + t('st' + n + 'd') + '</p></li>';
  }).join('');
  if (stepsShown) ol.style.setProperty('--fill', '100%');
}

(function watchSteps() {
  var ol = $('#steps');
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (!en.isIntersecting) return;
      stepsShown = true;
      ol.style.setProperty('--fill', '100%');
      $$('li', ol).forEach(function (li, i) {
        setTimeout(function () { li.classList.add('on'); }, reduce ? 0 : i * 160);
      });
      io.disconnect();
    });
  }, { threshold: .35 });
  io.observe(ol);
})();

/* ═════════ SELECTED PROJECTS ═════════ */

var activeFilter = 'all';
var bento = $('#bento'), filters = $('#filters'), emptyMsg = $('#empty');

function renderFilters() {
  var counts = {};
  PROJECTS.forEach(function (p) { counts[p.type] = (counts[p.type] || 0) + 1; });

  var html = '<button class="chip" data-t-filter="all" aria-pressed="' + (activeFilter === 'all') + '">' +
             t('fAll') + ' <u>' + pad(PROJECTS.length) + '</u></button>';
  PROJECT_TYPES.forEach(function (pt) {
    var c = counts[pt.id] || 0;
    html += '<button class="chip" data-t-filter="' + pt.id + '" aria-pressed="' + (activeFilter === pt.id) + '"' +
            (c ? '' : ' disabled') + '>' + t(pt.key) + ' <u>' + pad(c) + '</u></button>';
  });
  filters.innerHTML = html;
  filters.setAttribute('aria-label', t('fAll'));
}

filters.addEventListener('click', function (e) {
  var b = e.target.closest('.chip');
  if (!b || b.disabled) return;
  activeFilter = b.dataset.tFilter;
  $$('.chip', filters).forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
  renderBento();
});

/* раскладка бенто: без полупустых рядов при любом числе работ */
function computeSpans(n) {
  var out = [], i = 0;
  while (i < n) {
    var left = n - i;
    if (left === 1) { out.push(6); i += 1; }
    else if (left === 2) { out.push(4, 2); i += 2; }
    else { out.push(3, 3); i += 2; }
  }
  return out;
}

function setCardOpen(card, open) {
  card.classList.toggle('open', open);
  var b = $('.pc-toggle', card);
  b.setAttribute('aria-expanded', String(open));
  b.lastChild.textContent = open ? t('cLess') : t('cMore');
}

function renderBento() {
  var wasOpen = {};
  $$('.pc.open', bento).forEach(function (c) { wasOpen[c.dataset.id] = true; });

  var list = PROJECTS.filter(function (p) { return activeFilter === 'all' || p.type === activeFilter; });
  var spans = computeSpans(list.length);
  emptyMsg.hidden = list.length > 0;

  bento.innerHTML = list.map(function (p, i) {
    var facts = (p.facts || []).map(function (f) {
      return '<div><b>' + f.v + '</b><span>' + tr(f.k) + '</span></div>';
    }).join('');
    var tech = p.technologies.map(function (x) { return '<span>' + x + '</span>'; }).join('');
    return '' +
    '<article class="pc rv" data-id="' + p.id + '" data-span="' + spans[i] + '" style="--pa:' + p.accent + '">' +
      '<button class="pc-shot" type="button" aria-label="' + t('cOpenAria') + ' ' + p.title + '">' +
        '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
        '<span class="pc-shade"></span><span class="pc-tint"></span>' +
        '<span class="pc-live st-' + (p.status || 'live') + '">' +
          '<span class="dot-live"></span>' + (STATUS_LABEL[p.status] || 'Live') + '</span>' +
        '<span class="pc-open">' + t('cOpen') + '</span>' +
      '</button>' +
      '<div class="pc-body">' +
        '<div class="pc-top"><h3 class="pc-title">' + p.title + '</h3>' +
        '<span class="pc-year">' + p.year + ' · ' + p.locale + '</span></div>' +
        '<p class="pc-cat">' + tr(p.category) + '</p>' +
        '<p class="pc-desc">' + tr(p.description) + '</p>' +
        '<button class="pc-toggle" type="button" aria-expanded="false"><i></i>' + t('cMore') + '</button>' +
        '<div class="pc-more"><div>' +
          '<div class="pc-facts">' + facts + '</div>' +
          '<div class="pc-tech">' + tech + '</div>' +
          '<div class="pc-actions">' +
            '<a class="pc-link" href="' + p.liveUrl + '" target="_blank" rel="noopener">' + t('cNewTab') + '</a>' +
            '<span class="pc-link pc-role">' + tr(p.role) + '</span>' +
          '</div>' +
        '</div></div>' +
      '</div>' +
    '</article>';
  }).join('');

  $$('.pc', bento).forEach(function (card) {
    var id = card.dataset.id;
    var n = -1;
    PROJECTS.forEach(function (p, k) { if (p.id === id) n = k; });
    $('.pc-shot', card).addEventListener('click', function () { openViewer(n); });
    $('.pc-toggle', card).addEventListener('click', function () {
      setCardOpen(card, !card.classList.contains('open'));
    });
    if (wasOpen[id]) setCardOpen(card, true);
    revealWatch(card);
  });
}

/* ═════════ ПРОСМОТРЩИК ═════════ */

var viewer = $('#viewer'), vFrame = $('#vFrame'), vName = $('#vName'),
    vDesc = $('#vDesc'), vOpen = $('#vOpen'), vCur = 0, vWidth = 0;

function renderViewer() {
  var p = PROJECTS[vCur];
  vName.textContent = p.title;
  vDesc.textContent = tr(p.category) + ' · ' + p.year + ' · ' + (STATUS_LABEL[p.status] || 'Live');
  vOpen.href = p.liveUrl;
  vFrame.innerHTML = '<iframe src="' + p.liveUrl + '" title="' + p.title + '" loading="lazy"></iframe>';
  root.style.setProperty('--accent', p.accent);
  vFrame.style.maxWidth = vWidth ? vWidth + 'px' : '100%';
}
function openViewer(i) {
  vCur = i; viewer.classList.add('open'); document.body.style.overflow = 'hidden';
  renderViewer(); $('#vClose').focus();
}
function closeViewer() {
  viewer.classList.remove('open'); vFrame.innerHTML = ''; document.body.style.overflow = '';
  applyAccent(PROJECTS[idx]);
}
function vMove(d) { vCur = (vCur + d + PROJECTS.length) % PROJECTS.length; renderViewer(); }

$('#vClose').addEventListener('click', closeViewer);
$('#vPrev').addEventListener('click', function () { vMove(-1); });
$('#vNext').addEventListener('click', function () { vMove(1); });
$('#vSizes').addEventListener('click', function (e) {
  var b = e.target.closest('button'); if (!b) return;
  $$('button', this).forEach(function (c) { c.setAttribute('aria-pressed', String(c === b)); });
  vWidth = +b.dataset.w;
  vFrame.style.maxWidth = vWidth ? vWidth + 'px' : '100%';
});
viewer.addEventListener('click', function (e) {
  if (e.target === viewer || e.target.classList.contains('stage-v')) closeViewer();
});
document.addEventListener('keydown', function (e) {
  if (!viewer.classList.contains('open')) return;
  if (e.key === 'Escape') closeViewer();
  if (e.key === 'ArrowLeft') vMove(-1);
  if (e.key === 'ArrowRight') vMove(1);
});

/* ═════════ переключатель языка ═════════ */

var langBox = $('#lang'), langBtn = $('#langBtn'), langMenu = $('#langMenu'), langCur = $('#langCur');

function openLang(open) {
  langBox.classList.toggle('open', open);
  langBtn.setAttribute('aria-expanded', String(open));
}
langBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  openLang(!langBox.classList.contains('open'));
});
langMenu.addEventListener('click', function (e) {
  var b = e.target.closest('button[data-l]');
  if (!b) return;
  applyLang(b.dataset.l, true);
  openLang(false);
  langBtn.focus();
});
document.addEventListener('click', function (e) {
  if (!langBox.contains(e.target)) openLang(false);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && langBox.classList.contains('open')) { openLang(false); langBtn.focus(); }
});

function applyLang(l, save) {
  LANG = (LANGS.indexOf(l) >= 0) ? l : 'ru';
  root.setAttribute('data-lang', LANG);
  root.lang = LANG_HTML[LANG] || LANG;
  if (save) { try { localStorage.setItem('works-lang', LANG); } catch (e) {} }

  langCur.textContent = LANG.toUpperCase();
  $$('button[data-l]', langMenu).forEach(function (b) {
    b.setAttribute('aria-selected', String(b.dataset.l === LANG));
  });

  applyStatic();
  writeHero(PROJECTS[idx]);
  renderServices();
  renderSteps();
  renderFilters();
  renderBento();
  if (viewer.classList.contains('open')) renderViewer();
}

/* ═════════ старт ═════════ */

applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);
applyAccent(PROJECTS[0]);
wordmark.textContent = PROJECTS[0].shortTitle || PROJECTS[0].title;
applyLang(LANG, false);

$$('.rv').forEach(revealWatch);
$$('.section .s-head, .about-body, .cta-title, .cta-lead, .cta-row, .socials').forEach(function (el) {
  el.classList.add('rv'); revealWatch(el);
});

/* ═════════ деликатный параллакс ═════════ */
if (!reduce && window.matchMedia('(pointer:fine)').matches) {
  var rings = $('.rings'), px = 0, py = 0, tx = 0, ty = 0, raf = 0;
  var tick = function () {
    px += (tx - px) * .06; py += (ty - py) * .06;
    rings.style.transform    = 'translate3d(' + (px * 22).toFixed(2) + 'px,' + (py * 22).toFixed(2) + 'px,0)';
    orbMedia.style.transform = 'translate3d(' + (px * -9).toFixed(2) + 'px,' + (py * -9).toFixed(2) + 'px,0) scale(1.04)';
    wordmark.style.marginLeft = (px * 10).toFixed(2) + 'px';
    raf = (Math.abs(tx - px) > .001 || Math.abs(ty - py) > .001) ? requestAnimationFrame(tick) : 0;
  };
  $('#home').addEventListener('mousemove', function (e) {
    var r = stage.getBoundingClientRect();
    tx = (e.clientX - (r.left + r.width / 2)) / r.width;
    ty = (e.clientY - (r.top + r.height / 2)) / r.height;
    if (!raf) raf = requestAnimationFrame(tick);
  });
}

/* ═════════ редкие частицы ═════════ */
if (!reduce) (function () {
  var c = $('#dust'), ctx = c.getContext('2d'), dots = [], w = 0, h = 0, run = true, dpr;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    dots = [];
    var n = Math.round(Math.min(70, (w * h) / 26000));
    for (var i = 0; i < n; i++) {
      dots.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.3 + .3, s: Math.random() * .16 + .04,
        d: Math.random() * .3 - .15, a: Math.random() * .5 + .1,
        w: Math.random() * .02 + .004, t: Math.random() * 6.28
      });
    }
  }
  function frame() {
    if (!run) return;
    ctx.clearRect(0, 0, w, h);
    var cs = getComputedStyle(root);
    var accent = cs.getPropertyValue('--accent').trim() || '#ff7a2f';
    var base = cs.getPropertyValue('--dust').trim() || '#ffffff';
    var mul = parseFloat(cs.getPropertyValue('--dust-op')) || .35;
    for (var i = 0; i < dots.length; i++) {
      var p = dots[i];
      p.y -= p.s; p.x += p.d * .3; p.t += p.w;
      if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
      if (p.x < -6) p.x = w + 6; if (p.x > w + 6) p.x = -6;
      var al = p.a * (.45 + .55 * Math.sin(p.t));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = (i % 5 === 0) ? accent : base;
      ctx.globalAlpha = (i % 5 === 0) ? al * .8 : al * mul;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  size(); seed(); frame();

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { size(); seed(); }, 180);
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    run = !document.hidden && heroVisible;
    if (run) frame();
  });

  new IntersectionObserver(function (e) {
    heroVisible = e[0].isIntersecting;
    run = heroVisible && !document.hidden;
    if (run) frame();
  }, { threshold: .18 }).observe($('#home'));
})();
else {
  new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; },
    { threshold: .18 }).observe($('#home'));
}

})();
