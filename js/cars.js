// Garage: filterable grid with photos + detail modal. Deep-link via #carId.
(function () {
  const grid = document.getElementById('carGrid');
  const filtersEl = document.getElementById('filters');
  const overlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');

  const eras = ['All'].concat([...new Set(CARS.map(c => c.era))]);
  let activeEra = 'All';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  }

  function renderFilters() {
    filtersEl.innerHTML = eras.map(e =>
      `<button class="${e === activeEra ? 'active' : ''}" data-era="${esc(e)}">${esc(e)}</button>`
    ).join('');
  }

  function renderGrid() {
    const list = CARS.filter(c => activeEra === 'All' || c.era === activeEra);
    grid.innerHTML = list.map(c => `
      <div class="card reveal" data-id="${c.id}">
        <div class="photo" data-img="${c.id}"></div>
        <div class="body">
          <h3>${esc(c.name)}</h3>
          <div class="years">${esc(c.years)}</div>
          <span class="cat">${esc(c.category)}</span>
          <div class="stat-mini">${esc(c.power)} · ${esc(c.topSpeed)}</div>
          ${PRICING[c.id] ? `<div class="stat-mini price">${esc(PRICING[c.id].value)}</div>` : ''}
        </div>
      </div>`).join('');
    grid.querySelectorAll('.photo[data-img]').forEach(el => AMUI.photo(el, el.dataset.img));
    AMUI.reveal();
  }

  function bar(label, val) {
    return `<div class="row"><span>${label}</span><div class="bar"><div class="fill" style="width:${val * 10}%"></div></div><span>${val}/10</span></div>`;
  }

  function openModal(car) {
    modalBody.innerHTML = `
      <button class="close" aria-label="Close">✕</button>
      <div class="hero-photo" id="modalPhoto"></div>
      <div class="inner">
        <h2>${esc(car.name)}</h2>
        <div class="years">${esc(car.years)} · ${esc(car.era)} era · ${esc(car.category)}</div>

        <div class="spec-grid">
          <div class="spec"><div class="k">Engine</div><div class="v">${esc(car.engine)}</div></div>
          <div class="spec"><div class="k">Power</div><div class="v">${esc(car.power)}</div></div>
          <div class="spec"><div class="k">Top speed</div><div class="v">${esc(car.topSpeed)}</div></div>
          <div class="spec"><div class="k">0–60 mph</div><div class="v">${esc(car.zeroSixty)}</div></div>
          <div class="spec"><div class="k">Weight</div><div class="v">${esc(car.weight)}</div></div>
          <div class="spec"><div class="k">Production</div><div class="v">${esc(car.production)}</div></div>
        </div>

        <div class="section-label">Designer</div>
        <p>${esc(car.designer)}</p>

        <div class="section-label">Story</div>
        <p>${esc(car.history)}</p>

        <div class="section-label">Technology</div>
        <p>${esc(car.tech)}</p>

        ${car.movies.length ? `<div class="section-label">Screen appearances</div>
          <ul>${car.movies.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}

        <div class="section-label">Fun facts</div>
        <ul>${car.funFacts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>

        ${PRICING[car.id] ? `
        <div class="section-label">Price &amp; where to buy</div>
        <div class="price-box">
          <div class="price-value">${esc(PRICING[car.id].value)}</div>
          <p class="price-note">${esc(PRICING[car.id].note)}</p>
          <div class="buy-links">
            ${PRICING[car.id].links.map(l =>
              `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('')}
          </div>
          <p class="price-disclaimer">Guide values, mid-2026. Classic prices follow the auction market; new-car prices vary by region and specification.</p>
        </div>` : ''}

        <div class="section-label">Simulator stats</div>
        <div class="stat-bars">
          ${bar('Speed', car.game.speed)}${bar('Accel', car.game.accel)}${bar('Handling', car.game.handling)}
        </div>
        <a class="btn" href="game.html#${car.id}">Race this car</a>
      </div>`;
    AMUI.photo(document.getElementById('modalPhoto'), car.id);
    overlay.classList.add('open');
    history.replaceState(null, '', '#' + car.id);
    modalBody.querySelector('.close').addEventListener('click', closeModal);
  }

  function closeModal() {
    overlay.classList.remove('open');
    history.replaceState(null, '', location.pathname);
  }

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    activeEra = btn.dataset.era;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const car = CARS.find(c => c.id === card.dataset.id);
    if (car) openModal(car);
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  renderFilters();
  renderGrid();

  const hash = location.hash.slice(1);
  if (hash) {
    const car = CARS.find(c => c.id === hash);
    if (car) openModal(car);
  }
})();
