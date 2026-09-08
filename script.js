/* =====================================================================
   EVERYTHING YOU'D WANT TO EDIT LIVES IN THIS ONE CONFIG OBJECT.
   Change text, add photos, swap quotes, drop in your own video/links,
   and write the secret message — the page rebuilds itself from this.
   See README.md for a plain-language walkthrough.
   ===================================================================== */
const CONFIG = {

  name: "Tithi; aka Devi Ji🙏🏻",

  hero: {
    kicker: "A little something for🎁",
    subtitle: "Another year of you🫴🏻 — loved❤️, celebrated🎉, adored🥰.",
  },

  // Add/remove as many photos as you like. "src" should point to a file
  // inside the images/ folder (or a full https:// link).
  photos: [
    { src: "Screenshot 2026-09-03 124526.png", caption: "That laugh🤗, though" },
    { src: "Screenshot_20260901-103659_Instagram.jpg", caption: "Golden hour🕒, golden girl❣️" },
    { src: "vlcsnap-2026-09-03-12h29m32s829.png", caption: "Best trip yet🚗" },
    { src: "Screenshot_20260830-005202_Instagram.jpg", caption: "Just being you🤭" },
  ],

  // Each quote becomes a button on page 3. label = button text,
  // text = what appears in the card when it's tapped.
  quotes: [
    { label: "Today", text: "Today the world🌍 got a little louder📢, a little brighter🔆, and a lot luckier🍀 — happy birthday, Tithi🎉🎁🎂." },
    { label: "Your laugh", text: "A wise man once said (me😎) a room isn't fully alive until you laugh😄 in it. They were right." },
    { label: "This year", text: "May this year hand you everything last year taught you to want🙂‍↕️." },
    { label: "You, always", text: "Some people search for their favorite person their whole life. Nd i hope u will get someone for you." },
    { label: "One wish", text: "If I could give you one thing🫴🏻, it would be the ability to see yourself the way the people who love you do💖." },
  ],

  // Video shown in the secret section. Point src at a file inside video/
  // or a full https:// link. Leave as-is and it'll just show a friendly
  // placeholder message until you add your own file.
  video: {
    src: "c785bd1ddd1b433f817c9916c44b8243.mp4",
    poster: "Screenshot 2026-09-03 124405.png",
  },

  // Buttons shown under the secret message. Point url at anything —
  // a Spotify playlist, a Google Photos album, a YouTube link, etc.
  links: [
    { label: "a song dedicated to u🎶", url: "https://open.spotify.com/track/3gixnmepHSsyAuho34rprN" },
  ],

  // Supports line breaks — just keep writing on new lines inside the
  // backticks.
  secretMessage: `Dear Tithi🌸,

Happy Birthday, Devi Ji🛐! You’re kute🩷, gorjus nd stunig girl (ignore spellings🙂‍↕️) who also happens to have a single brain cell🧠. Hearing you say "kuch kehne wali thi pr bhul gyi" for the hundredth time is annoying but adorable. Thanks for blessing us with your pretty face and beautiful dumbness. Have a fabulous day, you lovable goddess! 🎂💖✨

There are things I don't say enough, so I'm putting them here instead.
You make ordinary days feel like something worth remembering.😌

Happy birthday. I hope this year is as good to you as you are to
everyone around you.💖💖💖`,

};

/* =====================================================================
   RENDER — turn CONFIG into DOM content
   ===================================================================== */
function renderContent(){
  document.getElementById("hero-name").textContent = CONFIG.name;
  document.getElementById("hero-kicker").textContent = CONFIG.hero.kicker;
  document.getElementById("hero-subtitle").textContent = CONFIG.hero.subtitle;
  document.title = `Happy Birthday, ${CONFIG.name}`;

  const grid = document.getElementById("polaroid-grid");
  grid.innerHTML = CONFIG.photos.map(p => `
    <figure class="polaroid">
      <img src="${p.src}" alt="${p.caption}" loading="lazy"
           onerror="this.src='https://placehold.co/400x400/f6c9d0/6a4a52?text=Add+a+photo';">
      <figcaption>${p.caption}</figcaption>
    </figure>
  `).join("");

  const wishButtons = document.getElementById("wish-buttons");
  wishButtons.innerHTML = CONFIG.quotes.map((q, i) => `
    <button class="wish-btn" data-index="${i}">${q.label}</button>
  `).join("");

  document.getElementById("secret-video-src").src = CONFIG.video.src;
  const posterEl = document.getElementById("secret-video");
  if (CONFIG.video.poster) posterEl.setAttribute("poster", CONFIG.video.poster);

  document.getElementById("secret-message").textContent = CONFIG.secretMessage;

  const linksEl = document.getElementById("secret-links");
  linksEl.innerHTML = CONFIG.links.map(l => `
    <li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>
  `).join("");
}

/* =====================================================================
   PAGE-DOT NAVIGATION
   ===================================================================== */
function setupPageDots(){
  const scroller = document.getElementById("scroller");
  const dots = Array.from(document.querySelectorAll(".dot"));
  const pages = Array.from(document.querySelectorAll(".page"));

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      document.getElementById(dot.dataset.target)
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        dots.forEach(d => d.classList.remove("active"));
        const match = dots.find(d => d.dataset.target === entry.target.id);
        if (match) match.classList.add("active");
      }
    });
  }, { root: scroller, threshold: 0.6 });

  pages.forEach(p => observer.observe(p));

  document.getElementById("scroll-cue").addEventListener("click", () => {
    document.getElementById("page-2").scrollIntoView({ behavior: "smooth" });
  });
}

/* =====================================================================
   FLOATING HEARTS
   ===================================================================== */
function spawnHearts(x, y, count = 10){
  const layer = document.getElementById("heart-layer");
  const symbols = ["♥  💖  🩷", "❤  💝  💖", "♡  💞  💕"];

  for (let i = 0; i < count; i++){
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const startX = x ?? (Math.random() * window.innerWidth);
    const startY = y ?? window.innerHeight;
    const drift = (Math.random() - 0.5) * 160;
    const duration = 2.4 + Math.random() * 1.6;
    const size = 16 + Math.random() * 18;
    const delay = Math.random() * 0.3;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY - 20}px`;
    heart.style.fontSize = `${size}px`;
    heart.style.setProperty("--drift", `${drift}px`);
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.color = Math.random() > 0.5 ? "var(--blush)" : "var(--gold-soft)";

    layer.appendChild(heart);
    setTimeout(() => heart.remove(), (duration + delay) * 1000 + 200);
  }
}

/* =====================================================================
   CONFETTI (canvas-based, no external library required)
   ===================================================================== */
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");
let confettiParticles = [];
let confettiRunning = false;

function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = ["#e8b75a", "#f6c9d0", "#d46a82", "#f0d29b", "#ffffff"];

function burstConfetti(originX, originY, count = 90){
  const cx = originX ?? window.innerWidth / 2;
  const cy = originY ?? window.innerHeight / 3;

  for (let i = 0; i < count; i++){
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 7;
    confettiParticles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 4 + Math.random() * 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.5 ? "rect" : "circle",
      life: 0,
      maxLife: 90 + Math.random() * 40,
    });
  }

  if (!confettiRunning){
    confettiRunning = true;
    requestAnimationFrame(runConfetti);
  }
}

function runConfetti(){
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach(p => {
    p.vy += 0.12; // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.life++;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.fillStyle = p.color;
    if (p.shape === "rect"){
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });

  confettiParticles = confettiParticles.filter(p => p.life < p.maxLife);

  if (confettiParticles.length > 0){
    requestAnimationFrame(runConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

/* =====================================================================
   INTERACTIONS
   ===================================================================== */
function setupInteractions(){

  // Page 1 — tap for a heart burst
  document.getElementById("hero-heart-btn").addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    spawnHearts(rect.left + rect.width / 2, rect.top, 14);
  });

  // Page 3 — wish buttons: reveal quote + confetti + hearts
  document.getElementById("wish-buttons").addEventListener("click", (e) => {
    const btn = e.target.closest(".wish-btn");
    if (!btn) return;
    const q = CONFIG.quotes[Number(btn.dataset.index)];
    const card = document.getElementById("wish-card");
    document.getElementById("wish-text").textContent = q.text;
    card.classList.add("lit");

    const rect = btn.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top);
    spawnHearts(rect.left + rect.width / 2, rect.top, 8);
  });

  // Page 4 — reply form: she types a message, it's saved locally as a
  // backup and, if the Node server is running, sent there too so you
  // can read it later (see README for where messages end up).
  const replyForm = document.getElementById("reply-form");
  replyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("reply-input");
    const status = document.getElementById("reply-status");
    const text = input.value.trim();
    if (!text) return;

    const entry = { message: text, timestamp: new Date().toISOString() };

    // Always keep a local backup in this browser, even if the server
    // isn't running (e.g. the page was just double-clicked open).
    try {
      const stored = JSON.parse(localStorage.getItem("tithi-messages") || "[]");
      stored.push(entry);
      localStorage.setItem("tithi-messages", JSON.stringify(stored));
    } catch (err) { /* localStorage unavailable — safe to ignore */ }

    status.textContent = "Sending…";
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error("Server responded with an error");
      status.textContent = "Sent 💌";
      input.value = "";
      const rect = replyForm.getBoundingClientRect();
      spawnHearts(rect.left + 30, rect.top, 8);
    } catch (err) {
      status.textContent = "Saved on this device — start the Node server (see README) so it reaches you too.";
    }
  });

  // Page 4 — envelope opens the secret message
  const envelopeBtn = document.getElementById("envelope-btn");
  const secretPanel = document.getElementById("secret-panel");
  envelopeBtn.addEventListener("click", () => {
    const isOpen = envelopeBtn.getAttribute("aria-expanded") === "true";
    envelopeBtn.setAttribute("aria-expanded", String(!isOpen));
    secretPanel.hidden = isOpen;
    if (!isOpen){
      const rect = envelopeBtn.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top, 70);
      spawnHearts(rect.left + rect.width / 2, rect.top, 12);
    }
  });
}

/* =====================================================================
   INIT
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  setupPageDots();
  setupInteractions();
});
