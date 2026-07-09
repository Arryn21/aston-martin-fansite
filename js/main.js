// Home: daily fact + car of the day (day-of-year rotation), hero + tile photos.
(function () {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);

  const factEl = document.getElementById('dailyFact');
  if (factEl) {
    factEl.textContent = FACTS[dayOfYear % FACTS.length];
    document.getElementById('factDate').textContent =
      now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  const car = CARS[dayOfYear % CARS.length];
  const nameEl = document.getElementById('dailyCarName');
  if (nameEl) {
    nameEl.textContent = car.name;
    document.getElementById('dailyCarBlurb').textContent =
      car.history.split('. ').slice(0, 2).join('. ') + '.';
    AMUI.photo(document.getElementById('carPhoto'), car.id);
    document.getElementById('carSpotlight').addEventListener('click', function () {
      location.href = 'cars.html#' + car.id;
    });
  }

  // fact spotlight photo: different car than car-of-day for variety
  AMUI.photo(document.getElementById('factPhoto'), CARS[(dayOfYear + 11) % CARS.length].id);

  // hero background: rotate through the most beautiful ones
  const heroes = ['db5', 'valkyrie', 'db12', 'one77', 'dbs2007', 'db4gtz', 'vantage2024'];
  const heroEl = document.getElementById('heroImg');
  if (heroEl) heroEl.style.backgroundImage = "url('img/" + heroes[dayOfYear % heroes.length] + ".jpg')";

  // explore tile photos
  document.querySelectorAll('.tile .photo[data-img]').forEach(el => AMUI.photo(el, el.dataset.img));
})();
