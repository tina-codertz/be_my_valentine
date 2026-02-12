const nameSection = document.getElementById("name-section");
const questionSection = document.getElementById("question-section");
const continueBtn = document.getElementById("continueBtn");
const nameInput = document.getElementById("nameInput");
const questionText = document.getElementById("question-text");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const teasePopup = document.getElementById("tease-popup");

let noClickCount = 0;
let userName = "";

const messages = [
  "Are you sure? 🥲🤨",
  "Don't break my heart 😞😔",
  "I'll buy you chocolate 🍫😢",
  "I can't survive without you 😫🥺",
  "Just say yes babe 🤕💗",
  "Please... 🥹❤️",
  "Okay but I'll keep asking! 💘",
  "My heart is crying 💔😭"
];

continueBtn.addEventListener("click", () => {
  userName = nameInput.value.trim();
  if (!userName) {
    alert("Please enter your name 💕");
    return;
  }

  localStorage.setItem("valentineName", userName);

  nameSection.classList.add("hidden");
  questionSection.classList.remove("hidden");

  questionText.innerText = `Will you be my Valentine, ${userName}? ❤️`;
  
  // Reset buttons
  noClickCount = 0;
  yesBtn.style.transform = "scale(1)";
  noBtn.style.transform = "translate(0, 0)";
  yesBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transition = "transform 0.2s ease";
});

noBtn.addEventListener("click", () => {
  if (noClickCount < messages.length) {
    questionText.innerText = messages[noClickCount];
    teasePopup.textContent = messages[noClickCount];
  } else {
    questionText.innerText = "Okay... but my heart is broken 💔";
    teasePopup.textContent = "I'll never give up on you! 💪❤️";
  }

  // Show tease popup
  teasePopup.style.opacity = "1";
  setTimeout(() => {
    teasePopup.style.opacity = "0";
  }, 2000);

  noClickCount++;

  // Grow Yes button (but not too big)
  const scale = 1 + Math.min(noClickCount * 0.15, 2.2);
  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.zIndex = "10";

  // Move No button randomly
  const randomX = (Math.random() - 0.5) * 160;
  const randomY = (Math.random() - 0.5) * 80;
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  
  // Add a little confetti when no is clicked (ironic but fun)
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 5,
      spread: 30,
      origin: { y: 0.6 },
      colors: ['#ff0033', '#ffffff']
    });
  }
});

yesBtn.addEventListener("click", () => {
  // Celebration confetti burst
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0033', '#ff6b6b', '#ffb6b6', '#ffffff']
    });
  }
  
  // Redirect to celebration page
  window.location.href = "yes.html";
});

// Try to play music after user interaction
const bgMusic = document.getElementById("bg-music");
if (bgMusic) {
  // Try to play on any click on the page
  document.body.addEventListener('click', function initMusic() {
    bgMusic.play().catch(e => console.log("Music play prevented:", e));
    document.body.removeEventListener('click', initMusic);
  }, { once: true });
}

// Enter key submits name
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    continueBtn.click();
  }
});