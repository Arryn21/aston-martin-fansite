// Quiz: 10 random questions, answers shuffled per question, best score in localStorage.
(function () {
  const box = document.getElementById('quizBox');
  const ROUND = 10;
  let questions = [], idx = 0, score = 0;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function best() { return Number(localStorage.getItem('am-quiz-best') || 0); }

  function start() {
    questions = shuffle(QUIZ).slice(0, ROUND).map(q => {
      // shuffle answer order, track new correct index
      const order = shuffle(q.a.map((_, i) => i));
      return { q: q.q, a: order.map(i => q.a[i]), correct: order.indexOf(q.correct) };
    });
    idx = 0; score = 0;
    showQuestion();
  }

  function showQuestion() {
    const q = questions[idx];
    box.innerHTML = `
      <div class="quiz-progress">Question ${idx + 1} / ${ROUND} · Score ${score} · Best ${best()}</div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-opts">
        ${q.a.map((opt, i) => `<button data-i="${i}">${opt}</button>`).join('')}
      </div>`;
    box.querySelector('.quiz-opts').addEventListener('click', onAnswer);
  }

  function onAnswer(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    const q = questions[idx];
    const chosen = Number(btn.dataset.i);
    const buttons = box.querySelectorAll('.quiz-opts button');
    buttons.forEach(b => b.disabled = true);
    buttons[q.correct].classList.add('correct');
    if (chosen === q.correct) score++;
    else btn.classList.add('wrong');

    setTimeout(() => {
      idx++;
      if (idx < questions.length) showQuestion();
      else finish();
    }, 1100);
  }

  function finish() {
    const prev = best();
    if (score > prev) localStorage.setItem('am-quiz-best', String(score));
    const msg = score === ROUND ? "Perfect! Q Branch wants your CV." :
                score >= 7 ? "Excellent — true Aston aficionado." :
                score >= 4 ? "Solid. The Garage page awaits for revision." :
                "Time to binge the History page!";
    box.innerHTML = `
      <div class="center">
        <h2 style="border:none">Round complete</h2>
        <div class="score-big">${score} / ${ROUND}</div>
        <p style="color:var(--text-dim)">${msg}</p>
        <p style="color:var(--gold); margin:0.5rem 0 1.5rem">Best score: ${Math.max(score, prev)} / ${ROUND}</p>
        <button class="btn" id="againBtn">Play again</button>
      </div>`;
    document.getElementById('againBtn').addEventListener('click', start);
  }

  start();
})();
