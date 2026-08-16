(() => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal-on-scroll
  const reveals = document.querySelectorAll('.section, .hero__inner, .usp__item, .vcard, .scard, .about__panel');
  reveals.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  // Contact form: client-side only (no backend on GitHub Pages)
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.classList.remove('error');
      status.textContent = '';

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const consent = data.get('consent');

      if (!name || !email || !subject || !message || !consent) {
        status.classList.add('error');
        status.textContent = 'Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Datenschutzerklärung.';
        return;
      }

      // Fallback: open the user's mail client with a pre-filled message.
      const body = [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${(data.get('phone') || '').toString().trim() || '—'}`,
        '',
        message
      ].join('\n');
      const href = 'mailto:info@weilbacher-automobile.de'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      status.textContent = 'Ihr E-Mail-Programm wird geöffnet, um die Nachricht zu senden…';
      window.location.href = href;
    });
  }
})();
