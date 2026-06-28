// ── Particles ──
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W,
  H,
  particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((W * H) / 12000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.2,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 200, 240, ${p.opacity})`;
    ctx.fill();
    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -5) {
      p.y = H + 5;
      p.x = Math.random() * W;
    }
    if (p.x < 0 || p.x > W) {
      p.x = Math.random() * W;
    }
  });
  requestAnimationFrame(drawParticles);
}

resize();
createParticles();
drawParticles();
window.addEventListener("resize", () => {
  resize();
  createParticles();
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.15 },
);
reveals.forEach((r) => observer.observe(r));

// ── Depth meter ──
const contexts = [
  [0, 200, "你還在珊瑚礁的光世界裡，陽光溫暖，魚兒繁多。"],
  [200, 600, "進入微光層——光線開始消逝，世界染上神秘藍色。"],
  [600, 1000, "壓力是海面的60倍。鯨魚偶爾經過這個邊界地帶。"],
  [1000, 2000, "完全黑暗。你現在看到的星點，都是生物發光。"],
  [2000, 4000, "氣溫接近2°C，壓力超過200個大氣壓，鋼鐵開始變形。"],
  [4000, 7000, "深淵層。食物靠「海雪」飄落，生命以極慢速度運轉。"],
  [7000, 10000, "海溝地帶。已知少數魚類能生存在這裡。"],
  [10000, 11000, "你正接近馬里亞納海溝最深處——地球最深的傷痕。"],
];

function updateDepth(val) {
  const v = parseInt(val);
  document.getElementById("depthReadout").innerHTML =
    `${v.toLocaleString()} <span>公尺</span>`;
  document.getElementById("depthFill").style.width = (v / 11000) * 100 + "%";
  const ctx = contexts.find(([lo, hi]) => v >= lo && v < hi);
  document.getElementById("depthContext").textContent = ctx
    ? ctx[2]
    : "你已到達地球最深處——11,034公尺，馬里亞納海溝挑戰者深淵。";
}

document.getElementById("depthSlider").addEventListener("input", (e) => {
  updateDepth(e.target.value);
});
