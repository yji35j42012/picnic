/* 原生 JavaScript；所有互動只存在目前頁面，不呼叫外部服務。 */
(() => {
  'use strict';
  const friends = {
    cat: { name: '奶油', greeting: '喵～今天也可以，理直氣壯地偷懶一下。' },
    bunny: { name: '糯米', greeting: '送你一朵小花！希望今天有好事悄悄發芽。' },
    capy: { name: '阿慢', greeting: '先深呼吸，再喝口水。陪你一起慢慢來。' }
  };
  const notes = [
    '今天的你，已經很值得被喜歡了。',
    '沒什麼特別的日子，也可以過得很可愛。',
    '休息不是偷懶，是在替明天長出力氣。',
    '把煩惱放一邊，先收下這個毛茸茸的擁抱。',
    '不用每一天都很厲害，開心一點就很好。'
  ];
  const ids = Object.keys(friends);
  const tabs = [...document.querySelectorAll('.friend-tabs button')];
  const illustration = document.querySelector('.cozy-illustration > div');
  const petButton = document.querySelector('.pet-button');
  const greeting = document.querySelector('.greeting');
  let selected = 'cat';
  let pets = 0;
  let note = 0;

  function renderCompanion() {
    const friend = friends[selected];
    document.querySelector('#cozy-title').textContent = `${friend.name}的陪伴時間`;
    greeting.textContent = pets > 0
      ? `${friend.name}開心地瞇起眼睛，送你第 ${pets} 個小愛心。`
      : friend.greeting;
    const template = document.getElementById(`drawing-${selected}${pets > 0 ? '-happy' : ''}`);
    illustration.replaceChildren(template.content.cloneNode(true));
    illustration.classList.remove('pet-animation');
    if (pets > 0) {
      void illustration.offsetWidth;
      illustration.classList.add('pet-animation');
    }
    document.querySelector('.pet-hearts').textContent = pets > 0 ? '♡  ♡  ♡' : '✧';
    for (const node of [...petButton.childNodes]) {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    }
    petButton.append(document.createTextNode(` 摸摸${friend.name}的頭`));
    tabs.forEach((tab, index) => {
      const active = ids[index] === selected;
      tab.setAttribute('aria-pressed', String(active));
      tab.classList.toggle('selected', active);
    });
  }

  function chooseFriend(id) {
    selected = id;
    pets = 0;
    renderCompanion();
  }

  ids.forEach((id, index) => {
    const card = document.querySelector(`.friend-${id}`);
    const heart = card.querySelector('.heart-button');
    heart.addEventListener('click', () => {
      const liked = heart.getAttribute('aria-pressed') !== 'true';
      heart.setAttribute('aria-pressed', String(liked));
      heart.setAttribute('aria-label', `${liked ? '取消喜歡' : '喜歡'}${friends[id].name}`);
      heart.classList.toggle('liked', liked);
      heart.querySelector('svg').setAttribute('fill', liked ? 'currentColor' : 'none');
    });
    card.querySelector('.friend-link').addEventListener('click', () => chooseFriend(id));
    tabs[index].addEventListener('click', () => chooseFriend(id));
  });
  petButton.addEventListener('click', () => {
    pets += 1;
    renderCompanion();
  });
  document.querySelector('.note-button').addEventListener('click', () => {
    note = (note + 1) % notes.length;
    document.querySelector('.note-message p').textContent = notes[note];
  });
})();
