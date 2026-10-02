(() => {
  const root = document.querySelector('.page');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = 'cubic-bezier(0.22,1,0.36,1)';

  // Unsplash attribution links need referral params.
  root.querySelectorAll('.credit a').forEach(a => {
    const u = new URL(a.href);
    u.searchParams.set('utm_source', 'safari_today');
    u.searchParams.set('utm_medium', 'referral');
    a.href = u.toString();
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // ---------- mobile menu ----------
  const menu = document.getElementById('menu');
  const burger = root.querySelector('.nav__burger');
  const setMenu = open => {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
  };
  root.querySelectorAll('[data-menu-toggle]').forEach(b => b.addEventListener('click', () => setMenu(menu.hidden)));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });
  // The menu only exists below 1024px; close it if the page widens.
  new ResizeObserver(([e]) => { if (e.contentRect.width >= 1024 && !menu.hidden) setMenu(false); }).observe(root);

  // ---------- safari types: hover-expand gallery ----------
  const cards = [...root.querySelectorAll('.type-card')];
  const activate = card => cards.forEach(c => c.classList.toggle('is-active', c === card));
  cards.forEach(c => {
    c.addEventListener('mouseenter', () => activate(c));
    c.querySelector('.card-link').addEventListener('focus', () => activate(c));
  });

  const config = window.SAFARI_CONFIG || {};

  // ---------- analytics (GA4, only if configured) ----------
  const gaId = config.ga4MeasurementId;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (gaId) {
    const loadGa = () => {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
      document.head.appendChild(s);
    };
    gtag('js', new Date());
    gtag('config', gaId);
    // Load after the page is interactive so it never competes with the hero.
    if (document.readyState === 'complete') setTimeout(loadGa, 1500);
    else window.addEventListener('load', () => setTimeout(loadGa, 1500));
  }
  const trackLead = method => { if (gaId) gtag('event', 'generate_lead', { method }); };

  // ---------- WhatsApp leads (click-to-chat with a pre-filled message) ----------
  const waNumber = String(config.whatsappNumber || '').replace(/\D/g, '');
  if (waNumber) {
    document.querySelectorAll('[data-whatsapp]').forEach(a => {
      const text = a.dataset.waText || (config.whatsappMessages || {})[a.dataset.whatsapp] || '';
      a.href = `https://wa.me/${waNumber}` + (text ? `?text=${encodeURIComponent(text)}` : '');
      a.target = '_blank';
      a.rel = 'noopener';
      a.hidden = false;
      a.addEventListener('click', () => trackLead('whatsapp_' + a.dataset.whatsapp));
    });
  }

  // ---------- planner signup (posts to lead.php) ----------
  const form = root.querySelector('.signup');
  if (form) {
    const input = form.querySelector('input[type=email]');
    const submit = form.querySelector('button');
    const error = root.querySelector('[data-signup-error]');
    const subscribe = async () => {
      const res = await fetch(config.signupEndpoint || form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Signup failed');
    };
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!input.checkValidity()) {
        input.setAttribute('aria-invalid', 'true');
        input.reportValidity();
        return;
      }
      input.removeAttribute('aria-invalid');
      error.hidden = true;
      submit.disabled = true;
      submit.textContent = 'Sending…';
      try {
        await subscribe();
        trackLead('email_planner');
        root.querySelector('[data-signup-email]').textContent = input.value.trim();
        root.querySelector('[data-signup]').hidden = true;
        root.querySelector('[data-signup-done]').hidden = false;
      } catch (err) {
        error.hidden = false;
      } finally {
        submit.disabled = false;
        submit.textContent = 'Get the Free Guide';
      }
    });
    // No-JS fallback lands back here with #thanks after lead.php redirects.
    if (location.hash === '#thanks') {
      root.querySelector('[data-signup-email]').textContent = 'your inbox';
      root.querySelector('[data-signup]').hidden = true;
      root.querySelector('[data-signup-done]').hidden = false;
    }
    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
  }

  // ---------- display headings: shrink just enough that the longest word fits ----------
  // Syne is very wide; long single words (UNDERSTANDING, TANGANYIKA) can't wrap.
  const FIT = '.hero__title,.closing__title,.page-hero__title,.h2,.zambezi__title,.intro__title,.prose h2,.dest__name,.cta-band__title,.menu__links';
  const fitHeadings = () => {
    root.querySelectorAll(FIT).forEach(el => {
      el.style.fontSize = '';
      el.style.overflowWrap = 'normal'; // measure real word widths, not the CSS fallback's broken words
      for (let i = 0; i < 4; i++) {
        const widest = Math.max(el.scrollWidth, ...[...el.children].map(c => c.scrollWidth));
        const avail = el.clientWidth;
        if (!avail || widest <= avail + 1) break;
        const size = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = Math.max(18, Math.floor(size * (avail / widest) * 0.98)) + 'px';
      }
      el.style.overflowWrap = '';
    });
  };
  let fitFrame;
  const scheduleFit = () => { cancelAnimationFrame(fitFrame); fitFrame = requestAnimationFrame(fitHeadings); };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(scheduleFit);
  new ResizeObserver(scheduleFit).observe(root);

  if (reduce) return;

  // The full intro (homepage only) plays once per browser session; later views get a quick
  // fade-in so returning visitors reach the calls to action immediately.
  const kb = root.querySelector('[data-kenburns]');
  if (root.querySelector('[data-preloader]')) {
    let seen = false;
    try { seen = sessionStorage.getItem('st-intro') === '1'; sessionStorage.setItem('st-intro', '1'); } catch (e) {}
    if (seen) {
      root.querySelectorAll('.hero [data-reveal]').forEach((n, i) => { n.dataset.reveal = String(100 + i * 150); });
      kb.style.setProperty('--kb-delay', '0s');
    } else {
      playIntro();
    }
  }
  if (kb) kb.classList.add('is-animating');

  // ---------- hero intro: typewriter → lift → headline lines slide up ----------
  function playIntro() {
    const pre = root.querySelector('[data-preloader]');
    const type = root.querySelector('[data-type]');
    const cursor = root.querySelector('[data-cursor]');
    const lines = root.querySelectorAll('[data-line]');
    const TXT = 'Safari.today', START = 400, STEP = 110, LIFT = START + TXT.length * STEP + 450;

    pre.style.display = 'flex';
    lines.forEach(l => { l.style.transform = 'translateY(105%)'; });
    [...TXT].forEach((ch, i) => setTimeout(() => {
      const sp = document.createElement('span');
      sp.textContent = ch;
      sp.style.fontWeight = ch === '.' ? '800' : '700';
      type.appendChild(sp);
    }, START + i * STEP));
    setTimeout(() => { cursor.style.display = 'none'; }, LIFT - 150);
    setTimeout(() => {
      pre.style.transition = 'transform 1.4s cubic-bezier(0.45,0,0.15,1)';
      pre.style.transform = 'translateY(-100%)';
    }, LIFT);
    lines.forEach((l, i) => setTimeout(() => {
      l.style.transition = `transform 1.2s ${ease}`;
      l.style.transform = 'none';
    }, LIFT + 450 + i * 130));
    setTimeout(() => { pre.style.display = 'none'; }, LIFT + 1500);
  }

  // ---------- scroll reveals (data-reveal = delay in ms) ----------
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.style.opacity = '1';
    e.target.style.transform = 'none';
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  root.querySelectorAll('[data-reveal]').forEach(n => {
    const d = +n.dataset.reveal || 0;
    n.style.opacity = '0';
    n.style.transform = 'translateY(32px)';
    n.style.transition = `opacity .9s ${ease} ${d}ms, transform 1.1s ${ease} ${d}ms`;
    io.observe(n);
  });
})();
