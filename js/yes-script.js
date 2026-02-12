const celebrationText = document.getElementById("celebrationText");
const bgMusic = document.getElementById("bgMusic");
const bigHeart = document.getElementById("bigHeart");
const heartsContainer = document.querySelector(".hearts");
const rotatingQuote = document.getElementById("rotatingQuote");
const particleCanvas = document.getElementById("particleCanvas");
const ctx = particleCanvas.getContext("2d");

// Music elements
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const musicText = document.getElementById("music-text");

let isMusicPlaying = false; // Will be set to true when autoplay works

// Music toggle functionality
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicIcon.textContent = "🔇";
    musicText.textContent = "Play Music";
    isMusicPlaying = false;
  } else {
    bgMusic.play()
      .then(() => {
        musicIcon.textContent = "🔊";
        musicText.textContent = "Pause Music";
        isMusicPlaying = true;
      })
      .catch(e => {
        console.log("Music play prevented:", e);
      });
  }
}

musicToggle.addEventListener("click", toggleMusic);

// AUTOPLAY MUSIC - Try immediately
function attemptAutoplay() {
  bgMusic.volume = 0.5; // Set volume to 50%
  bgMusic.play()
    .then(() => {
      // Success! Music is playing
      musicIcon.textContent = "🔊";
      musicText.textContent = "Pause Music";
      isMusicPlaying = true;
      console.log("Music autoplay started!");
    })
    .catch(e => {
      // Autoplay blocked - wait for user interaction
      console.log("Autoplay blocked, waiting for user interaction:", e);
      musicIcon.textContent = "🔇";
      musicText.textContent = "Play Music";
      isMusicPlaying = false;
      
      // Set up one-time click handler to start music
      document.body.addEventListener('click', function initMusic() {
        bgMusic.play()
          .then(() => {
            musicIcon.textContent = "🔊";
            musicText.textContent = "Pause Music";
            isMusicPlaying = true;
          })
          .catch(() => {});
        document.body.removeEventListener('click', initMusic);
      }, { once: true });
    });
}

// Set canvas size
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  initParticles();
});

// Get user name
const userName = localStorage.getItem("valentineName") || "My Love";
celebrationText.innerText = `You just made me the happiest person alive, ${userName} ❤️`;

// Romantic quotes
const quotes = [
  "Forever starts now ❤️",
  "You're my reason to smile 😘",
  "All my love is yours 💌",
  "Every heartbeat is for you 💖",
  "You complete me 😍",
  "My heart is yours forever 💝",
  "Together is our favorite place to be 🏠",
  "You're the best thing that's ever happened to me ✨",
  "I love you more every day 📈",
  "You + Me = Forever ♾️"
];

let quoteIndex = 0;

function rotateQuotes() {
  rotatingQuote.style.opacity = "0";
  setTimeout(() => {
    rotatingQuote.innerText = quotes[quoteIndex];
    rotatingQuote.style.opacity = "0.9";
  }, 300);
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

setInterval(rotateQuotes, 4000);
rotateQuotes();

// Initialize everything
window.addEventListener("load", () => {
  // Try to autoplay music
  attemptAutoplay();
  
  // Big heart animation + confetti
  setTimeout(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#ff0033', '#ff6b6b', '#ffb6b6', '#ffffff'],
      shapes: ['heart', 'circle']
    });
  }, 500);
  
  createFloatingHearts();
  initParticles();
  
  // Fireworks effect every 2 seconds
  setInterval(() => {
    confetti({
      particleCount: 30,
      spread: 80,
      origin: { 
        x: Math.random(), 
        y: Math.random() * 0.4 
      },
      colors: ['#ff0033', '#ff6b6b', '#ffb6b6']
    });
  }, 2000);
});

// Floating hearts generator
function createFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("span");
    const hearts = ["❤️", "💖", "💕", "💗", "💘", "💝", "💓"];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 25 + 18) + "px";
    heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 300);
}

// Particle system
let particles = [];

function initParticles() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 80, 120, ${p.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ff0033";
      ctx.fill();
      
      p.x += p.dx;
      p.y += p.dy;
      
      if (p.x < 0 || p.x > particleCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > particleCanvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Add more confetti on click
document.body.addEventListener('click', (e) => {
  // Don't trigger if clicking music button
  if (!e.target.closest('.music-btn')) {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff0033', '#ff6b6b', '#ffb6b6']
    });
  }
});

// Initial confetti burst
setTimeout(() => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { 
          x: Math.random(), 
          y: Math.random() * 0.5 
        }
      });
    }, i * 200);
  }
}, 200);