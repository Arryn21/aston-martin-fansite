// Live news: Google News RSS via CORS-friendly proxy. Fails gracefully offline / file://.
(function () {
  const feed = document.getElementById('newsFeed');
  const RSS = 'https://news.google.com/rss/search?q=%22Aston+Martin%22+car+OR+F1&hl=en-GB&gl=GB&ceid=GB:en';
  const PROXY = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(RSS);

  fetch(PROXY, { signal: AbortSignal.timeout ? AbortSignal.timeout(10000) : undefined })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
    .then(xmlText => {
      const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
      const items = [...doc.querySelectorAll('item')].slice(0, 12);
      if (!items.length) throw new Error('empty feed');
      feed.innerHTML = items.map(item => {
        const title = item.querySelector('title')?.textContent || 'Untitled';
        const link = item.querySelector('link')?.textContent || '#';
        const date = item.querySelector('pubDate')?.textContent;
        const source = item.querySelector('source')?.textContent || '';
        const when = date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
        const safeTitle = title.replace(/</g, '&lt;');
        return `<div class="news-item">
          <a href="${encodeURI(link)}" target="_blank" rel="noopener">${safeTitle}</a>
          <div class="meta">${source ? source + ' · ' : ''}${when}</div>
        </div>`;
      }).join('');
    })
    .catch(() => {
      feed.innerHTML = '<p class="news-note">Live feed unavailable right now (offline or feed blocked). Use the sources below — they are always fresh.</p>';
    });
})();
