const envelope = document.querySelector("#envelope");
const letterCard = document.querySelector("#letterCard");
const openButton = document.querySelector("#openButton");
const resetButton = document.querySelector("#resetButton");
const messageElement = document.querySelector("#message");
const fromText = document.querySelector("#fromText");
const heartsContainer = document.querySelector("#hearts");

const letterMessage = `쑥스러워 자주 표현하지 못했지만
두 분께 받은 사랑에 늘 감사하고 있습니다.

앞으로도 오래오래 건강하시고,
행복한 일들이 더 많았으면 좋겠습니다.

항상 감사하고 사랑합니다 ❤️`;

let isOpened = false;
let typingIndex = 0;
let typingTimer = null;

function openCard() {
  if (isOpened) return;

  isOpened = true;

  envelope.classList.add("open");
  openButton.textContent = "마음 전달 완료 ♥";
  openButton.disabled = true;

  setTimeout(() => {
    letterCard.classList.add("flip");
  }, 1000);

  setTimeout(() => {
    typeMessage();
    createHearts();
  }, 1800);
}

function resetCard() {
  isOpened = false;
  typingIndex = 0;

  clearTimeout(typingTimer);

  envelope.classList.remove("open");
  letterCard.classList.remove("flip");
  fromText.classList.remove("show");

  messageElement.textContent = "";
  openButton.textContent = "편지 열어보기";
  openButton.disabled = false;

  resetButton.classList.add("hidden");
  heartsContainer.innerHTML = "";
}

function typeMessage() {
  if (typingIndex < letterMessage.length) {
    messageElement.textContent += letterMessage[typingIndex];
    typingIndex += 1;

    typingTimer = setTimeout(typeMessage, 55);
  } else {
    fromText.classList.add("show");
    resetButton.classList.remove("hidden");
  }
}

function createHearts() {
  const heartCount = 16;

  for (let i = 0; i < heartCount; i += 1) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.classList.add("heart");
      heart.textContent = Math.random() > 0.5 ? "♥" : "♡";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${14 + Math.random() * 14}px`;
      heart.style.animationDuration = `${2.8 + Math.random() * 1.8}s`;

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }, i * 150);
  }
}

envelope.addEventListener("click", openCard);
openButton.addEventListener("click", openCard);
resetButton.addEventListener("click", resetCard);
