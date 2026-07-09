// Shared UI: scroll-reveal animation + car image helpers.
const AMUI = {
  img(id) { return 'img/' + id + '.jpg'; },

  // set element bg to car image; add .noimg fallback class if the file is missing
  photo(el, id) {
    if (!el || !id) { if (el) el.classList.add('noimg'); return; }
    const url = AMUI.img(id);
    const probe = new Image();
    probe.onload = () => { el.style.backgroundImage = "url('" + url + "')"; };
    probe.onerror = () => { el.classList.add('noimg'); };
    probe.src = url;
  },

  reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  }
};
document.addEventListener('DOMContentLoaded', AMUI.reveal);
