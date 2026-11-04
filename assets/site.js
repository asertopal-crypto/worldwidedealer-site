(function(){
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* menu and header */
  var mb = $('.mbtn'), sheet = $('.sheet'), hd = $('.hd');
  if (mb) mb.addEventListener('click', function(){
    var open = sheet.classList.toggle('open');
    mb.setAttribute('aria-expanded', open);
    mb.textContent = open ? 'Close' : 'Menu';
  });
  var onScroll = function(){ hd.classList.toggle('on', scrollY > 8) };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* market picker */
  var R = window.REGIONS;
  if (R) {
    var btns = $$('.regions button'), box = $('.rp');
    var set = function(k){
      var d = R[k];
      btns.forEach(function(b){b.setAttribute('aria-pressed', b.dataset.k === k)});
      $$('.arc,.pin').forEach(function(e){e.classList.toggle('on', e.dataset.k === k)});
      $('img', box).src = d.img; $('img', box).alt = d.alt;
      $('h3', box).textContent = d.name;
      $('.num', box).textContent = d.num;
      $('.lab', box).textContent = d.lab;
      $('.txt', box).textContent = d.txt;
      var s = $('a', box); s.textContent = 'Source: ' + d.src; s.href = d.url;
      if (window.gsap && !reduced) gsap.fromTo(box.children, {y:10, opacity:0}, {y:0, opacity:1, duration:.45, stagger:.04, ease:'power3.out'});
    };
    btns.forEach(function(b){b.addEventListener('click', function(){set(b.dataset.k)})});
    $$('.hit').forEach(function(h){h.addEventListener('click', function(){set(h.dataset.k)})});
  }

  /* contact form writes the email for the visitor */
  var form = $('#cform');
  if (form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(n){return form.elements[n].value.trim()};
    var body = 'Name: ' + v('name') + '\nBrand: ' + v('brand') + '\nWebsite: ' + v('site') + '\nEmail: ' + v('email') + '\nMarkets of interest: ' + v('market') + '\n\n' + v('msg');
    location.href = 'mailto:partnerships@worldwidedealerllc.com?subject=' + encodeURIComponent('Brand partnership: ' + v('brand')) + '&body=' + encodeURIComponent(body);
    $('#sent').hidden = false;
  });

  /* motion: quiet, once, never hides content for long */
  if (!window.gsap || !window.ScrollTrigger || reduced) return;
  gsap.registerPlugin(ScrollTrigger);

  var hi = $('.hero img');
  if (hi) {
    gsap.fromTo(hi, {scale:1.06}, {scale:1, duration:2.2, ease:'power2.out'});
    gsap.from('.hero h1, .hero p, .hero .acts', {y:18, opacity:0, duration:.8, stagger:.09, ease:'power3.out'});
  }
  if ($('.ban')) gsap.from('.ban h1, .ban p', {y:16, opacity:0, duration:.7, stagger:.08, ease:'power3.out'});
  if ($('.trust li')) gsap.from('.trust li', {y:12, opacity:.15, duration:.6, stagger:.07, delay:.2, ease:'power3.out'});

  ScrollTrigger.batch('.card, .step, .post, .wh2 article, .st, details, .pg > div, .chips li', {
    start:'top 92%', once:true,
    onEnter:function(b){gsap.fromTo(b, {y:20, opacity:.15}, {y:0, opacity:1, duration:.7, stagger:.06, ease:'power3.out', clearProps:'transform'})}
  });
  $$('.head, .panel, .mapwrap, .cta, .ab, .chart, .cg, .art, .legal, .mq').forEach(function(e){
    gsap.from(e, {y:22, opacity:.15, duration:.8, ease:'power3.out', scrollTrigger:{trigger:e, start:'top 90%', once:true}});
  });

  $$('[data-n]').forEach(function(b){
    var end = +b.dataset.n, o = {v:end > 100 ? end - 12 : 0};
    gsap.to(o, {v:end, duration:1.3, ease:'power3.out', scrollTrigger:{trigger:b, start:'top 90%', once:true},
      onUpdate:function(){b.textContent = Math.round(o.v)}});
  });

  var arcs = $$('.arc');
  if (arcs.length) {
    arcs.forEach(function(a){var n = a.getTotalLength(); a.style.strokeDasharray = n; a.style.strokeDashoffset = n});
    gsap.to(arcs, {strokeDashoffset:0, duration:1.4, stagger:.18, ease:'power2.inOut', scrollTrigger:{trigger:'.map', start:'top 78%', once:true},
      onComplete:function(){arcs.forEach(function(a){a.style.strokeDasharray = 'none'})}});
  }
  var bars = $$('.bar i');
  if (bars.length) gsap.from(bars, {scaleY:0, duration:.9, stagger:.07, ease:'power3.out', scrollTrigger:{trigger:'.bars', start:'top 84%', once:true}});

  addEventListener('load', function(){ScrollTrigger.refresh()});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ScrollTrigger.refresh()});
})();
