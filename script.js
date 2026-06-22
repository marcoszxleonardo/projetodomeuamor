(function () {
  const screenStart = document.getElementById('screen-start');
  const screenAsk = document.getElementById('screen-ask');
  const screenLetter = document.getElementById('screen-letter');
  const btnStart = document.getElementById('btnStart');
  const bgMusic = document.getElementById('bgMusic');

  const btnRow = document.getElementById('btnRow');
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const taunt = document.getElementById('taunt');

  btnStart.addEventListener('click', function () {
    screenStart.classList.remove('active');
    screenAsk.classList.add('active');

    bgMusic.volume = 0.7;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {});
    }
  });

  const taunts = [
    'opa, quase!',
    'não vale fugir assim 😅',
    'pera, tenta de novo',
    'esse botão não quer ser clicado',
    'só clica no "Sim", vai...',
    'eu sei que você quer clicar no sim',
    'tá difícil hein',
    'última chance... brincadeira 😂'
  ];

  let dodgeCount = 0;
  let yesScale = 1;
  let yesDodgeCount = 0;

  const yesMessages = [
    'calma aí 😅',
    'tem certeza mesmo? 😂',
    'última chance de pensar ❤️'
  ];

  function getRowBounds() {
    return btnRow.getBoundingClientRect();
  }

  function moveNoButton() {
    const rowRect = getRowBounds();
    const btnRect = btnNo.getBoundingClientRect();
    const yesRect = btnYes.getBoundingClientRect();

    const maxX = rowRect.width - btnRect.width;
    const maxY = rowRect.height - btnRect.height;

    let newX, newY, distance;

    do {
      newX = Math.random() * Math.max(maxX, 0);
      newY = Math.random() * Math.max(maxY, 0);

      const yesX = yesRect.left - rowRect.left;
      const yesY = yesRect.top - rowRect.top;

      distance = Math.sqrt(
        Math.pow(newX - yesX, 2) +
        Math.pow(newY - yesY, 2)
      );

    } while (distance < 150);

    btnNo.style.position = 'absolute';
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';

    dodgeCount++;

    taunt.textContent =
      taunts[Math.min(dodgeCount - 1, taunts.length - 1)];

    yesScale = Math.min(1 + dodgeCount * 0.06, 1.6);
    btnYes.style.transform = `scale(${yesScale})`;
  }

  function moveYesButton() {
    const rowRect = getRowBounds();
    const btnRect = btnYes.getBoundingClientRect();
    const noRect = btnNo.getBoundingClientRect();

    const maxX = rowRect.width - btnRect.width;
    const maxY = rowRect.height - btnRect.height;

    let newX, newY, distance;

    do {
      newX = Math.random() * Math.max(maxX, 0);
      newY = Math.random() * Math.max(maxY, 0);

      const noX = noRect.left - rowRect.left;
      const noY = noRect.top - rowRect.top;

      distance = Math.sqrt(
        Math.pow(newX - noX, 2) +
        Math.pow(newY - noY, 2)
      );

    } while (distance < 150);

    btnYes.style.position = 'absolute';
    btnYes.style.left = newX + 'px';
    btnYes.style.top = newY + 'px';
  }

  btnNo.addEventListener('mouseenter', moveNoButton);

  btnNo.addEventListener(
    'touchstart',
    function (e) {
      e.preventDefault();
      moveNoButton();
    },
    { passive: false }
  );

  btnNo.addEventListener('click', function (e) {
    e.preventDefault();
    moveNoButton();
  });

  btnYes.addEventListener('click', function (e) {

    if (yesDodgeCount < 3) {
      e.preventDefault();

      moveYesButton();

      taunt.textContent = yesMessages[yesDodgeCount];

      yesDodgeCount++;
      return;
    }

    screenAsk.classList.remove('active');
    screenLetter.classList.add('active');
  });

  window.addEventListener('resize', function () {
    if (dodgeCount > 0) {
      moveNoButton();
    }
  });

})();