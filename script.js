(function () {
  const screenStart = document.getElementById("screen-start");
  const screenAsk = document.getElementById("screen-ask");
  const screenLetter = document.getElementById("screen-letter");

  const btnStart = document.getElementById("btnStart");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const btnRow = document.getElementById("btnRow");

  const taunt = document.getElementById("taunt");
  const bgMusic = document.getElementById("bgMusic");

  let yesClicks = 0;
  let noDodges = 0;

  btnStart.addEventListener("click", function () {
    screenStart.classList.remove("active");
    screenAsk.classList.add("active");

    bgMusic.volume = 0.7;

    try {
      bgMusic.play();
    } catch (e) {
      console.log(e);
    }
  });

  function moveButton(button) {
    const rowRect = btnRow.getBoundingClientRect();

    const maxX = rowRect.width - button.offsetWidth;
    const maxY = rowRect.height - button.offsetHeight;

    const x = Math.random() * Math.max(maxX, 0);
    const y = Math.random() * Math.max(maxY, 0);

    button.style.position = "absolute";
    button.style.left = x + "px";
    button.style.top = y + "px";
  }

  const noMessages = [
    "opa, quase!",
    "não vale fugir assim 😅",
    "pera, tenta de novo",
    "esse botão não quer ser clicado 😂"
  ];

  function moveNoButton(e) {
    if (e) e.preventDefault();

    moveButton(btnNo);

    taunt.textContent =
      noMessages[Math.min(noDodges, noMessages.length - 1)];

    noDodges++;
  }

  btnNo.addEventListener("mouseenter", moveNoButton);

  btnNo.addEventListener(
    "touchstart",
    function (e) {
      moveNoButton(e);
    },
    { passive: false }
  );

  btnNo.addEventListener("click", moveNoButton);

  btnYes.addEventListener("click", function (e) {
    if (yesClicks < 3) {
      e.preventDefault();

      const msgs = [
        "calma aí 😅",
        "tem certeza mesmo? 😂",
        "agora pode clicar ❤️"
      ];

      taunt.textContent = msgs[yesClicks];
      yesClicks++;

      return;
    }

    screenAsk.classList.remove("active");
    screenLetter.classList.add("active");
  });
})();