/* Alyffer Santos M. 3D — Jornada #Blessed (@santos.by1) */

const container = document.getElementById("gameContainer");

// UI Elements
const hud = document.getElementById("hud");
const startScreen = document.getElementById("startScreen");
const pauseScreen = document.getElementById("pauseScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const levelBanner = document.getElementById("levelBanner");
const levelBannerText = document.getElementById("levelBannerText");

const scoreVal = document.getElementById("scoreVal");
const comboVal = document.getElementById("comboVal");
const levelVal = document.getElementById("levelVal");
const orbsVal = document.getElementById("orbsVal");
const livesVal = document.getElementById("livesVal");
const dashBar = document.getElementById("dashBar");
const powerupBadge = document.getElementById("powerupBadge");

const bestScoreStart = document.getElementById("bestScoreStart");
const finalScoreEl = document.getElementById("finalScore");
const finalLevelEl = document.getElementById("finalLevel");
const finalBestEl = document.getElementById("finalBest");

const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const restartPauseBtn = document.getElementById("restartPauseBtn");
const restartBtn = document.getElementById("restartBtn");
const muteBtn = document.getElementById("muteBtn");
const pauseBtn = document.getElementById("pauseBtn");
const bgBtn = document.getElementById("bgBtn");
const bgPhotoEl = document.querySelector(".game-bg-photo");
const postToast = document.getElementById("postToast");
const postToastImg = document.getElementById("postToastImg");
const postToastLabel = document.getElementById("postToastLabel");

const BG_PHOTOS = [
  { src: "assets/profile.jpg", label: "Perfil @santos.by1" },
  { src: "assets/caipira1.jpg", label: "Caipira no Curral" },
  { src: "assets/caipira2.jpg", label: "Caipira na Estrada" },
  { src: "assets/caipira3.jpg", label: "Violeiro na Varanda" },
];
const CAIPIRA_POSTS = BG_PHOTOS.slice(1);
let currentBgIndex = 0;
let postToastTimer;

function setBackgroundPhoto(src) {
  const idx = BG_PHOTOS.findIndex((p) => p.src === src);
  if (idx >= 0) currentBgIndex = idx;
  bgPhotoEl.style.backgroundImage =
    `radial-gradient(circle at center, rgba(12, 8, 22, 0.25) 0%, rgba(7, 6, 13, 0.62) 100%), url("${src}")`;
  document.querySelectorAll(".gallery-thumb").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.bg === src);
  });
}

function cycleBackground() {
  currentBgIndex = (currentBgIndex + 1) % BG_PHOTOS.length;
  setBackgroundPhoto(BG_PHOTOS[currentBgIndex].src);
}

function showPostToast(index) {
  const item = CAIPIRA_POSTS[index % CAIPIRA_POSTS.length];
  postToastImg.src = item.src;
  postToastLabel.textContent = item.label;
  postToast.classList.remove("hidden");
  clearTimeout(postToastTimer);
  postToastTimer = setTimeout(() => {
    postToast.classList.add("hidden");
  }, 2400);
}

document.querySelectorAll(".gallery-thumb").forEach((btn) => {
  btn.addEventListener("click", () => {
    setBackgroundPhoto(btn.dataset.bg);
  });
});

if (bgBtn) {
  bgBtn.addEventListener("click", cycleBackground);
}

const BASE_FOLLOWERS = 148; // Seguidores reais do @santos.by1

// Audio Engine
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play(type) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === "jump") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.14);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === "pad") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.24);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
      osc.start(now);
      osc.stop(now + 0.27);
    } else if (type === "post") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(990, now + 0.06);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === "blessed") {
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, now + i * 0.05);
        g.gain.setValueAtTime(0.12, now + i * 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.05);
        o.stop(now + i * 0.05 + 0.3);
      });
    } else if (type === "flash") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.12);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === "hit") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.28);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "levelup") {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(freq, now + i * 0.08);
        g.gain.setValueAtTime(0.12, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.24);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.24);
      });
    }
  }
}

const sfx = new SoundFX();

// Three.js Setup — Transparent canvas over Alyffer's profile photo background
const scene = new THREE.Scene();
scene.background = null;
scene.fog = new THREE.FogExp2(0x07060d, 0.008);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Lights
const hemiLight = new THREE.HemisphereLight(0xc4b5fd, 0x160f29, 0.75);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfef3c7, 1.15);
dirLight.position.set(22, 38, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 2;
dirLight.shadow.camera.far = 110;
const d = 38;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;
scene.add(dirLight);

const purplePoint = new THREE.PointLight(0x8b5cf6, 1.4, 48);
purplePoint.position.set(0, 9, 0);
scene.add(purplePoint);

function createSignTexture(title, subtitle) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, "#8b5cf6");
  grad.addColorStop(0.5, "#ec4899");
  grad.addColorStop(1, "#facc15");
  ctx.font = "bold 104px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = grad;
  ctx.fillText(title, 512, 122);

  ctx.font = "600 40px 'Inter', sans-serif";
  ctx.fillStyle = "#ede9fe";
  ctx.fillText(subtitle, 512, 190);

  return new THREE.CanvasTexture(canvas);
}

// Starfield, Grid, Sky Banner & Decorative ✝️ Crosses
function createEnvironment() {
  const starGeo = new THREE.BufferGeometry();
  const starCount = 750;
  const pos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 200;
    pos[i * 3 + 1] = Math.random() * 90 - 15;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xe9d5ff, size: 0.45, transparent: true, opacity: 0.78 });
  scene.add(new THREE.Points(starGeo, starMat));

  const grid = new THREE.GridHelper(160, 40, 0x8b5cf6, 0x1e1830);
  grid.position.y = -12;
  scene.add(grid);

  // Sky Hologram matching @santos.by1
  const tex = createSignTexture("ALYFFER SANTOS M.", "@santos.by1  •  ✝️  #blessed");
  const signMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(26, 6.5), signMat);
  signMesh.position.set(0, 18.5, -34);
  scene.add(signMesh);

  // Decorative floating ✝️ Cross Pillars in background
  const crossMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    emissive: 0x6d28d9,
    emissiveIntensity: 0.7,
    roughness: 0.3,
  });
  const spots = [
    [-34, 9, -28],
    [34, 9, -28],
    [-34, 9, 28],
    [34, 9, 28],
  ];
  spots.forEach(([x, y, z]) => {
    const cross = new THREE.Group();
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.9, 5.2, 0.9), crossMat);
    const h = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.9), crossMat);
    h.position.y = 1.1;
    cross.add(v, h);
    cross.position.set(x, y, z);
    cross.lookAt(0, y, 0);
    scene.add(cross);
  });
}
createEnvironment();

// Build Alyffer 3D Character inspired by @santos.by1 mirror selfie
// (All-black outfit, short dark fade hair, holding black smartphone)
function createAlyfferModel() {
  const group = new THREE.Group();

  const blackShirtMat = new THREE.MeshStandardMaterial({ color: 0x141418, roughness: 0.55, metalness: 0.15 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x0f1015, roughness: 0.65 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xc98a63, roughness: 0.6 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.8 });
  const purpleGlowMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    emissive: 0x7c3aed,
    emissiveIntensity: 0.75,
    roughness: 0.25,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xd97706,
    emissiveIntensity: 0.55,
    metalness: 0.6,
    roughness: 0.2,
  });
  const phoneMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8, roughness: 0.15 });
  const screenGlowMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    emissive: 0xec4899,
    emissiveIntensity: 0.8,
  });

  // Torso (All-black tee)
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.15, 0.54), blackShirtMat);
  torso.position.y = 1.4;
  torso.castShadow = true;
  group.add(torso);

  // Subtle Gold ✝️ Chain on chest
  const chainV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.06), goldMat);
  chainV.position.set(0, 1.62, 0.29);
  const chainH = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.06), goldMat);
  chainH.position.set(0, 1.7, 0.29);
  group.add(chainV, chainH);

  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.72), skinMat);
  head.position.y = 2.38;
  head.castShadow = true;
  group.add(head);

  // Short dark hair (fade style)
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.26, 0.76), hairMat);
  hairTop.position.set(0, 2.74, -0.01);
  hairTop.castShadow = true;
  group.add(hairTop);

  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.34, 0.16), hairMat);
  hairBack.position.set(0, 2.52, -0.32);
  group.add(hairBack);

  // Eyes (subtle)
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.05), eyeMat);
  leftEye.position.set(-0.15, 2.42, 0.36);
  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.05), eyeMat);
  rightEye.position.set(0.15, 2.42, 0.36);
  group.add(leftEye, rightEye);

  // Left Arm
  const armGeo = new THREE.BoxGeometry(0.27, 0.88, 0.27);
  const leftArm = new THREE.Mesh(armGeo, skinMat);
  leftArm.position.set(-0.65, 1.42, 0);
  leftArm.castShadow = true;
  group.add(leftArm);

  // Right Arm + Black Smartphone (mirror-selfie signature!)
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.65, 1.75, 0);
  const rightArmMesh = new THREE.Mesh(armGeo, skinMat);
  rightArmMesh.position.set(0, -0.33, 0);
  rightArmMesh.castShadow = true;
  rightArmGroup.add(rightArmMesh);

  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.44, 0.06), phoneMat);
  phone.position.set(-0.12, -0.62, 0.25);
  phone.rotation.x = -0.25;
  rightArmGroup.add(phone);

  const phoneScreen = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.36, 0.02), screenGlowMat);
  phoneScreen.position.set(-0.12, -0.62, 0.215);
  phoneScreen.rotation.x = -0.25;
  rightArmGroup.add(phoneScreen);

  // Camera lens dot on back of phone
  const camDot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.02), purpleGlowMat);
  camDot.position.set(-0.08, -0.5, 0.285);
  camDot.rotation.x = -0.25;
  rightArmGroup.add(camDot);

  group.add(rightArmGroup);

  // Legs (black pants)
  const legGeo = new THREE.BoxGeometry(0.34, 0.85, 0.34);
  const leftLeg = new THREE.Mesh(legGeo, pantsMat);
  leftLeg.position.set(-0.24, 0.44, 0);
  leftLeg.castShadow = true;
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, pantsMat);
  rightLeg.position.set(0.24, 0.44, 0);
  rightLeg.castShadow = true;
  group.add(rightLeg);

  // Sneakers with purple neon sole
  const shoeGeo = new THREE.BoxGeometry(0.36, 0.18, 0.48);
  const leftShoe = new THREE.Mesh(shoeGeo, purpleGlowMat);
  leftShoe.position.set(-0.24, 0.09, 0.06);
  group.add(leftShoe);

  const rightShoe = new THREE.Mesh(shoeGeo, purpleGlowMat);
  rightShoe.position.set(0.24, 0.09, 0.06);
  group.add(rightShoe);

  // Aura ring for #blessed power-up
  const auraRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.95, 0.05, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.85 })
  );
  auraRing.rotation.x = Math.PI / 2;
  auraRing.position.y = 0.2;
  auraRing.visible = false;
  group.add(auraRing);

  group.userData = {
    leftArm,
    rightArm: rightArmGroup,
    leftLeg,
    rightLeg,
    leftShoe,
    rightShoe,
    auraRing,
  };
  return group;
}

const playerMesh = createAlyfferModel();
scene.add(playerMesh);

// Game State
const STORAGE_KEY = "alyffer_ig_3d_best_followers";
let bestScore = Number(localStorage.getItem(STORAGE_KEY) || BASE_FOLLOWERS);
bestScoreStart.textContent = bestScore;

const state = {
  mode: "start", // start | playing | paused | gameover
  followers: BASE_FOLLOWERS,
  combo: 1,
  comboTimer: 0,
  level: 1,
  lives: 3,
  postsCollected: 0,
  postsTotal: 0,
  blessedTimer: 0,
  invulnTimer: 0,
  camYaw: 0,
  camPitch: 0.38,
  camDist: 11.5,
  animTime: 0,
};

const player = {
  pos: new THREE.Vector3(0, 2, 0),
  vel: new THREE.Vector3(0, 0, 0),
  radius: 0.48,
  height: 2.8,
  onGround: false,
  coyoteTimer: 0,
  jumpsLeft: 2,
  dashTimer: 0,
  dashCooldown: 0,
  dashDir: new THREE.Vector3(0, 0, 1),
  facingYaw: 0,
  lastSafePos: new THREE.Vector3(0, 2, 0),
};

// World Collections
let platforms = [];
let storyPads = [];
let posts = [];
let blessedCrosses = [];
let spamBots = [];
let particles = [];
const worldGroup = new THREE.Group();
scene.add(worldGroup);

function clearWorld() {
  while (worldGroup.children.length > 0) {
    worldGroup.remove(worldGroup.children[0]);
  }
  platforms = [];
  storyPads = [];
  posts = [];
  blessedCrosses = [];
  spamBots = [];
}

function addPlatform(x, y, z, w, h, d, color = 0x141221, borderColor = 0x8b5cf6, moveSpec = null) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.25 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  const edges = new THREE.EdgesGeometry(geo);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: borderColor, transparent: true, opacity: 0.85 })
  );
  mesh.add(line);

  worldGroup.add(mesh);
  platforms.push({
    mesh,
    basePos: new THREE.Vector3(x, y, z),
    delta: new THREE.Vector3(0, 0, 0),
    w,
    h,
    d,
    moveSpec,
  });
}

// Mirror Frame centerpiece on the Hub ("Selfie no Espelho")
function addMirrorBackdrop() {
  const frameGroup = new THREE.Group();
  frameGroup.position.set(0, 3.3, -6.5);

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 5.4, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x1c192b, metalness: 0.6, roughness: 0.25 })
  );
  frameGroup.add(frame);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(4.0, 4.8),
    new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.08,
    })
  );
  glass.position.z = 0.16;
  frameGroup.add(glass);

  const infoTex = createSignTexture("0 POSTS", "148 Seguidores • 262 Seguindo");
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 0.95),
    new THREE.MeshBasicMaterial({ map: infoTex, transparent: true })
  );
  label.position.set(0, 0, 0.18);
  frameGroup.add(label);

  worldGroup.add(frameGroup);
}

// Instagram Story Ring Jump Pad
function addStoryPad(x, y, z) {
  const geo = new THREE.CylinderGeometry(1.1, 1.25, 0.28, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    emissive: 0xdb2777,
    emissiveIntensity: 0.8,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y + 0.14, z);
  worldGroup.add(mesh);

  const ringGeo = new THREE.TorusGeometry(1.25, 0.09, 10, 28);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(x, y + 0.35, z);
  worldGroup.add(ring);

  storyPads.push({ pos: new THREE.Vector3(x, y + 0.14, z), ring, radius: 1.35, baseY: y + 0.35 });
}

// Collectible: Instagram Post Tile (📷)
function addPostCollectible(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  // Outer IG gradient-like frame
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.95, 0.14),
    new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xbe185d,
      emissiveIntensity: 0.65,
      roughness: 0.25,
    })
  );
  group.add(card);

  // Inner photo square
  const photo = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.68, 0.18),
    new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.5,
    })
  );
  group.add(photo);

  worldGroup.add(group);
  posts.push({ mesh: group, baseY: y, collected: false, phase: Math.random() * Math.PI * 2 });
}

// Power-up: ✝️ #blessed Golden Cross
function addBlessedCross(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xeab308,
    emissiveIntensity: 0.9,
    metalness: 0.5,
    roughness: 0.15,
  });

  const v = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.05, 0.24), goldMat);
  const h = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 0.24), goldMat);
  h.position.y = 0.22;
  group.add(v, h);

  worldGroup.add(group);
  blessedCrosses.push({ mesh: group, baseY: y, collected: false, phase: Math.random() * 6 });
}

// Obstacle: Red Spam/Hater Drone
function addSpamBot(x, y, z, axis = "x", range = 5, speed = 2.2) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.75,
      roughness: 0.25,
    })
  );
  body.castShadow = true;
  group.add(body);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.06, 8, 24),
    new THREE.MeshBasicMaterial({ color: 0xfca5a5 })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  worldGroup.add(group);
  spamBots.push({
    mesh: group,
    ring,
    basePos: new THREE.Vector3(x, y, z),
    axis,
    range,
    speed,
    phase: Math.random() * Math.PI * 2,
  });
}

function spawnParticles(pos, color = 0xec4899, count = 12) {
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 })
    );
    mesh.position.copy(pos);
    scene.add(mesh);
    particles.push({
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 7,
        Math.random() * 5 + 1.5,
        (Math.random() - 0.5) * 7
      ),
      life: 0.55 + Math.random() * 0.25,
      maxLife: 0.8,
    });
  }
}

function buildLevel(level) {
  clearWorld();

  // Central Hub Platform + Mirror Selfie Backdrop
  addPlatform(0, 0, 0, 14, 1.2, 14, 0x13111c, 0x8b5cf6);
  addMirrorBackdrop();

  // 4 Outer Bridges + Islands
  addPlatform(0, 0.6, -13, 4.5, 0.8, 10, 0x191529, 0xec4899);
  addPlatform(0, 1.5, -23, 10, 1.2, 10, 0x13111c, 0xf59e0b);

  addPlatform(13, 1.2, 0, 10, 0.8, 4.5, 0x191529, 0x8b5cf6);
  addPlatform(23, 2.8, 0, 9, 1.2, 9, 0x13111c, 0xec4899);

  addPlatform(-13, 1.2, 0, 10, 0.8, 4.5, 0x191529, 0x8b5cf6);
  addPlatform(-23, 2.8, 0, 9, 1.2, 9, 0x13111c, 0xec4899);

  addPlatform(0, 0.8, 13, 4.5, 0.8, 10, 0x191529, 0x8b5cf6);
  addPlatform(0, 2.0, 23, 9, 1.2, 9, 0x13111c, 0xf59e0b);

  // High Sky Platforms
  addPlatform(0, 8.5, 0, 6.5, 1.0, 6.5, 0x201538, 0xfacc15);
  addPlatform(16, 7.5, -16, 7, 1.0, 7, 0x1a142d, 0xec4899);
  addPlatform(-16, 7.5, -16, 7, 1.0, 7, 0x1a142d, 0xec4899);

  // Moving Platforms
  addPlatform(9, 4.5, -16, 4.5, 0.8, 4.5, 0x1d1830, 0xfacc15, {
    axis: "x",
    range: 4.5,
    speed: 1.4 + level * 0.15,
  });
  addPlatform(-9, 4.5, 16, 4.5, 0.8, 4.5, 0x1d1830, 0xfacc15, {
    axis: "z",
    range: 4.5,
    speed: 1.4 + level * 0.15,
  });

  // Instagram Story Ring Jump Pads
  addStoryPad(0, 0.6, -3.5);
  addStoryPad(23, 3.4, -2.5);
  addStoryPad(-23, 3.4, -2.5);
  addStoryPad(0, 2.6, 23);

  // Missing Posts to restore the @santos.by1 feed
  const postSpots = [
    [0, 2.2, -11],
    [0, 3.2, -23],
    [2.5, 3.2, -25],
    [-2.5, 3.2, -25],
    [13, 2.8, 0],
    [23, 4.6, 2],
    [-13, 2.8, 0],
    [-23, 4.6, 2],
    [0, 2.4, 13],
    [0, 3.7, 21],
    [0, 10.3, 0],
    [16, 9.3, -16],
    [-16, 9.3, -16],
  ];

  const count = Math.min(postSpots.length, 8 + level * 2);
  for (let i = 0; i < count; i++) {
    const [px, py, pz] = postSpots[i];
    addPostCollectible(px, py, pz);
  }

  // ✝️ #blessed Golden Crosses
  addBlessedCross(4.5, 2.1, 4.5);
  addBlessedCross(-4.5, 2.1, -4.5);

  // Spam Bots
  const spd = 1.9 + level * 0.35;
  addSpamBot(0, 2.8, -23, "x", 3.5, spd);
  addSpamBot(23, 4.2, 0, "z", 3.2, spd);
  addSpamBot(-23, 4.2, 0, "z", 3.2, spd);
  if (level >= 2) {
    addSpamBot(0, 2.1, 1.5, "x", 5.0, spd * 1.05);
    addSpamBot(0, 3.4, 23, "x", 3.2, spd);
  }
  if (level >= 3) {
    addSpamBot(16, 9.0, -16, "x", 2.6, spd * 1.15);
    addSpamBot(-16, 9.0, -16, "z", 2.6, spd * 1.15);
  }

  state.postsCollected = 0;
  state.postsTotal = posts.length;
  resetPlayerPosition();
  updateHUD();
}

function resetPlayerPosition() {
  player.pos.set(0, 2.5, 4);
  player.vel.set(0, 0, 0);
  player.onGround = false;
  player.jumpsLeft = 2;
  player.dashTimer = 0;
  player.lastSafePos.set(0, 2.5, 4);
}

// Input Handling
const keys = {};
let jumpQueued = false;
let dashQueued = false;

window.addEventListener("keydown", (e) => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    if (state.mode === "playing") e.preventDefault();
  }
  if (!keys[e.code]) {
    if (e.code === "Space") jumpQueued = true;
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") dashQueued = true;
    if (e.code === "KeyP" || e.code === "Escape") togglePause();
    if (e.code === "KeyM") toggleMute();
    if (e.code === "KeyB") cycleBackground();
  }
  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

// Mouse drag camera orbit
let dragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

renderer.domElement.addEventListener("pointerdown", (e) => {
  dragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

window.addEventListener("pointermove", (e) => {
  if (!dragging || state.mode !== "playing") return;
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  state.camYaw -= dx * 0.0065;
  state.camPitch = THREE.MathUtils.clamp(state.camPitch + dy * 0.005, 0.14, 1.05);
});

window.addEventListener("pointerup", () => {
  dragging = false;
});

renderer.domElement.addEventListener(
  "wheel",
  (e) => {
    state.camDist = THREE.MathUtils.clamp(state.camDist + e.deltaY * 0.01, 7, 19);
  },
  { passive: true }
);

// Touch Controls
document.querySelectorAll(".dpad .t-btn").forEach((btn) => {
  const code = btn.dataset.key;
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    keys[code] = true;
  });
  btn.addEventListener("pointerup", () => (keys[code] = false));
  btn.addEventListener("pointerleave", () => (keys[code] = false));
});

document.getElementById("touchJump").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  jumpQueued = true;
});
document.getElementById("touchDash").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  dashQueued = true;
});

// Buttons
function startGame() {
  sfx.init();
  state.followers = BASE_FOLLOWERS;
  state.combo = 1;
  state.comboTimer = 0;
  state.level = 1;
  state.lives = 3;
  state.blessedTimer = 0;
  state.invulnTimer = 0;
  state.camYaw = 0;
  state.mode = "playing";

  startScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  hud.classList.remove("hidden");

  buildLevel(1);
  showLevelBanner("FASE 1 — @santos.by1!");
}

function togglePause() {
  if (state.mode === "playing") {
    state.mode = "paused";
    pauseScreen.classList.remove("hidden");
  } else if (state.mode === "paused") {
    state.mode = "playing";
    pauseScreen.classList.add("hidden");
  }
}

function toggleMute() {
  sfx.muted = !sfx.muted;
  muteBtn.textContent = sfx.muted ? "🔇" : "🔊";
}

function showLevelBanner(text) {
  levelBannerText.textContent = text;
  levelBanner.classList.remove("hidden");
  setTimeout(() => {
    levelBanner.classList.add("hidden");
  }, 1900);
}

function triggerGameOver() {
  state.mode = "gameover";
  hud.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");

  if (state.followers > bestScore) {
    bestScore = state.followers;
    localStorage.setItem(STORAGE_KEY, String(bestScore));
  }

  finalScoreEl.textContent = state.followers;
  finalLevelEl.textContent = state.level;
  finalBestEl.textContent = bestScore;
  bestScoreStart.textContent = bestScore;
}

startBtn.addEventListener("click", startGame);
resumeBtn.addEventListener("click", togglePause);
restartPauseBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", togglePause);
muteBtn.addEventListener("click", toggleMute);

function updateHUD() {
  scoreVal.textContent = state.followers;
  comboVal.textContent = `x${state.combo}`;
  levelVal.textContent = state.level;
  orbsVal.textContent = `${state.postsCollected} / ${state.postsTotal}`;
  livesVal.textContent = state.lives > 0 ? "✝️".repeat(state.lives) : "💔";
  powerupBadge.classList.toggle("hidden", state.blessedTimer <= 0);
}

function damagePlayer(fallRespawn = false) {
  if (state.blessedTimer > 0 && !fallRespawn) return;
  if (state.invulnTimer > 0 && !fallRespawn) return;
  sfx.play("hit");
  state.lives -= 1;
  state.combo = 1;
  state.invulnTimer = 1.6;
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xef4444, 18);

  if (state.lives <= 0) {
    updateHUD();
    triggerGameOver();
    return;
  }

  if (fallRespawn) {
    player.pos.copy(player.lastSafePos);
    player.vel.set(0, 0, 0);
  } else {
    player.vel.y = 7;
  }
  updateHUD();
}

// Main Physics & Update
function updateGame(dt) {
  state.animTime += dt;

  if (keys["KeyQ"]) state.camYaw += 2.2 * dt;
  if (keys["KeyE"]) state.camYaw -= 2.2 * dt;

  // Update Moving Platforms
  platforms.forEach((p) => {
    if (!p.moveSpec) {
      p.delta.set(0, 0, 0);
      return;
    }
    const prev = p.mesh.position.clone();
    const offset = Math.sin(state.animTime * p.moveSpec.speed) * p.moveSpec.range;
    p.mesh.position.copy(p.basePos);
    p.mesh.position[p.moveSpec.axis] += offset;
    p.delta.subVectors(p.mesh.position, prev);
  });

  // Combo & #blessed Timers
  if (state.comboTimer > 0) {
    state.comboTimer -= dt;
    if (state.comboTimer <= 0) {
      state.combo = 1;
      updateHUD();
    }
  }
  if (state.blessedTimer > 0) {
    state.blessedTimer -= dt;
    if (state.blessedTimer <= 0) updateHUD();
  }
  if (state.invulnTimer > 0) state.invulnTimer -= dt;

  // Movement Direction relative to camera
  let moveX = 0;
  let moveZ = 0;
  if (keys["KeyW"] || keys["ArrowUp"]) moveZ -= 1;
  if (keys["KeyS"] || keys["ArrowDown"]) moveZ += 1;
  if (keys["KeyA"] || keys["ArrowLeft"]) moveX -= 1;
  if (keys["KeyD"] || keys["ArrowRight"]) moveX += 1;

  const inputVec = new THREE.Vector2(moveX, moveZ);
  const hasInput = inputVec.lengthSq() > 0;
  if (hasInput) inputVec.normalize();

  const sinY = Math.sin(state.camYaw);
  const cosY = Math.cos(state.camYaw);
  const worldMove = new THREE.Vector3(
    inputVec.x * cosY + inputVec.y * sinY,
    0,
    -inputVec.x * sinY + inputVec.y * cosY
  );

  // Flash Dash logic
  if (player.dashCooldown > 0) player.dashCooldown = Math.max(0, player.dashCooldown - dt);
  const dashPct = 100 * (1 - player.dashCooldown / 1.4);
  dashBar.style.width = `${dashPct}%`;

  if (dashQueued && player.dashCooldown <= 0) {
    dashQueued = false;
    player.dashTimer = 0.18;
    player.dashCooldown = 1.4;
    if (hasInput) {
      player.dashDir.copy(worldMove).normalize();
    } else {
      player.dashDir.set(Math.sin(player.facingYaw), 0, Math.cos(player.facingYaw));
    }
    sfx.play("flash");
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.3, 0)), 0xffffff, 14);
  }
  dashQueued = false;

  const baseSpeed = state.blessedTimer > 0 ? 15.5 : 10.5;
  if (player.dashTimer > 0) {
    player.dashTimer -= dt;
    player.vel.x = player.dashDir.x * 26;
    player.vel.z = player.dashDir.z * 26;
    player.vel.y = 0;
  } else {
    const targetVx = hasInput ? worldMove.x * baseSpeed : 0;
    const targetVz = hasInput ? worldMove.z * baseSpeed : 0;
    const accel = player.onGround ? 16 : 9;
    player.vel.x = THREE.MathUtils.lerp(player.vel.x, targetVx, Math.min(1, accel * dt));
    player.vel.z = THREE.MathUtils.lerp(player.vel.z, targetVz, Math.min(1, accel * dt));
    player.vel.y -= 28 * dt;
  }

  if (hasInput) {
    const targetYaw = Math.atan2(worldMove.x, worldMove.z);
    let diff = targetYaw - player.facingYaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    player.facingYaw += diff * Math.min(1, 14 * dt);
  }

  // Coyote time & Double Jump
  if (player.onGround) {
    player.coyoteTimer = 0.12;
    player.jumpsLeft = 2;
  } else {
    player.coyoteTimer = Math.max(0, player.coyoteTimer - dt);
  }

  if (jumpQueued) {
    jumpQueued = false;
    const jumpPower = state.blessedTimer > 0 ? 14.6 : 12.2;
    if (player.coyoteTimer > 0) {
      player.vel.y = jumpPower;
      player.onGround = false;
      player.coyoteTimer = 0;
      player.jumpsLeft = 1;
      sfx.play("jump");
      spawnParticles(player.pos, 0x8b5cf6, 8);
    } else if (player.jumpsLeft > 0) {
      player.vel.y = jumpPower * 0.94;
      player.jumpsLeft -= 1;
      sfx.play("jump");
      spawnParticles(player.pos, 0xfacc15, 12);
    }
  }

  // Platform AABB Collisions
  const prevBottom = player.pos.y;
  player.pos.addScaledVector(player.vel, dt);
  player.onGround = false;

  for (const p of platforms) {
    const halfW = p.w / 2 + player.radius * 0.75;
    const halfD = p.d / 2 + player.radius * 0.75;
    const topY = p.mesh.position.y + p.h / 2;
    const botY = p.mesh.position.y - p.h / 2;

    const inXZ =
      Math.abs(player.pos.x - p.mesh.position.x) <= halfW &&
      Math.abs(player.pos.z - p.mesh.position.z) <= halfD;

    if (inXZ) {
      if (player.vel.y <= 0 && prevBottom >= topY - 0.35 && player.pos.y <= topY + 0.08) {
        player.pos.y = topY;
        player.vel.y = 0;
        player.onGround = true;
        player.pos.add(p.delta);
        if (!p.moveSpec) {
          player.lastSafePos.set(p.mesh.position.x, topY + 0.4, p.mesh.position.z);
        }
      } else if (player.pos.y + player.height > botY && player.pos.y < topY - 0.3) {
        const dx = player.pos.x - p.mesh.position.x;
        const dz = player.pos.z - p.mesh.position.z;
        const overlapX = halfW - Math.abs(dx);
        const overlapZ = halfD - Math.abs(dz);
        if (overlapX < overlapZ) {
          player.pos.x += dx >= 0 ? overlapX : -overlapX;
          player.vel.x = 0;
        } else {
          player.pos.z += dz >= 0 ? overlapZ : -overlapZ;
          player.vel.z = 0;
        }
      }
    }
  }

  if (player.pos.y < -11) {
    damagePlayer(true);
  }

  // Story Ring Pads
  storyPads.forEach((pad) => {
    pad.ring.position.y = pad.baseY + Math.sin(state.animTime * 5) * 0.12;
    const distXZ = Math.hypot(player.pos.x - pad.pos.x, player.pos.z - pad.pos.z);
    if (distXZ < pad.radius && Math.abs(player.pos.y - pad.pos.y) < 1.1) {
      player.vel.y = 20.5;
      player.onGround = false;
      player.jumpsLeft = 1;
      sfx.play("pad");
      spawnParticles(pad.pos, 0xf59e0b, 16);
    }
  });

  // Posts Collectibles
  posts.forEach((post) => {
    if (post.collected) return;
    post.mesh.position.y = post.baseY + Math.sin(state.animTime * 3 + post.phase) * 0.25;
    post.mesh.rotation.y += 2.2 * dt;

    const playerCenter = player.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
    if (playerCenter.distanceTo(post.mesh.position) < 1.45) {
      post.collected = true;
      post.mesh.visible = false;
      state.postsCollected += 1;
      state.followers += 15 * state.combo;
      state.combo = Math.min(8, state.combo + 1);
      state.comboTimer = 4.5;
      sfx.play("post");
      spawnParticles(post.mesh.position, 0xec4899, 16);
      showPostToast(state.postsCollected - 1);
      updateHUD();

      if (state.postsCollected >= state.postsTotal) {
        state.level += 1;
        state.followers += 100;
        sfx.play("levelup");
        buildLevel(state.level);
        showLevelBanner(`FEED COMPLETO • FASE ${state.level}!`);
      }
    }
  });

  // ✝️ #blessed Power-up
  blessedCrosses.forEach((c) => {
    if (c.collected) return;
    c.mesh.position.y = c.baseY + Math.sin(state.animTime * 3.5 + c.phase) * 0.25;
    c.mesh.rotation.y += 2.4 * dt;
    const playerCenter = player.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
    if (playerCenter.distanceTo(c.mesh.position) < 1.45) {
      c.collected = true;
      c.mesh.visible = false;
      state.blessedTimer = 7.5;
      state.followers += 50;
      sfx.play("blessed");
      spawnParticles(c.mesh.position, 0xfacc15, 22);
      updateHUD();
    }
  });

  // Spam Bots
  spamBots.forEach((bot) => {
    bot.mesh.position.copy(bot.basePos);
    bot.mesh.position[bot.axis] += Math.sin(state.animTime * bot.speed + bot.phase) * bot.range;
    bot.ring.rotation.z += 3.5 * dt;
    bot.ring.rotation.x = Math.PI / 2 + Math.sin(state.animTime * 4) * 0.35;

    const playerCenter = player.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
    if (playerCenter.distanceTo(bot.mesh.position) < 1.25 && player.dashTimer <= 0) {
      damagePlayer(false);
    }
  });

  // Update Alyffer Mesh & Limb Animation
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.y = player.facingYaw;
  playerMesh.visible = state.invulnTimer <= 0 || Math.floor(state.invulnTimer * 14) % 2 === 0;

  const horizSpeed = Math.hypot(player.vel.x, player.vel.z);
  const { leftArm, rightArm, leftLeg, rightLeg, leftShoe, rightShoe, auraRing } = playerMesh.userData;

  auraRing.visible = state.blessedTimer > 0;
  if (auraRing.visible) {
    auraRing.rotation.z += 4 * dt;
  }

  // Right arm holds the phone up in mirror-selfie pose when idle/running!
  if (!player.onGround) {
    leftArm.rotation.x = -0.9;
    rightArm.rotation.x = -1.2;
    leftLeg.rotation.x = 0.35;
    rightLeg.rotation.x = -0.35;
  } else if (horizSpeed > 0.6) {
    const swing = Math.sin(state.animTime * 14) * 0.75;
    leftArm.rotation.x = swing;
    rightArm.rotation.x = -0.85 + Math.sin(state.animTime * 14) * 0.25;
    leftLeg.rotation.x = -swing;
    rightLeg.rotation.x = swing;
    leftShoe.position.z = 0.06 - Math.sin(state.animTime * 14) * 0.14;
    rightShoe.position.z = 0.06 + Math.sin(state.animTime * 14) * 0.14;
  } else {
    leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, 0, 10 * dt);
    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -1.05, 10 * dt); // Selfie pose!
    leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, 0, 10 * dt);
    rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, 0, 10 * dt);
    leftShoe.position.z = 0.06;
    rightShoe.position.z = 0.06;
  }

  // Update Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.life -= dt;
    pt.vel.y -= 14 * dt;
    pt.mesh.position.addScaledVector(pt.vel, dt);
    pt.mesh.material.opacity = Math.max(0, pt.life / pt.maxLife);
    pt.mesh.scale.setScalar(Math.max(0.05, pt.life / pt.maxLife));
    if (pt.life <= 0) {
      scene.remove(pt.mesh);
      particles.splice(i, 1);
    }
  }
}

function updateCamera(dt) {
  if (state.mode === "start") {
    state.camYaw += 0.22 * dt;
  }
  const target =
    state.mode === "start"
      ? new THREE.Vector3(0, 3.5, 0)
      : player.pos.clone().add(new THREE.Vector3(0, 1.8, 0));

  const dist = state.mode === "start" ? 24 : state.camDist;
  const pitch = state.mode === "start" ? 0.36 : state.camPitch;

  const camX = target.x + Math.sin(state.camYaw) * Math.cos(pitch) * dist;
  const camY = target.y + Math.sin(pitch) * dist;
  const camZ = target.z + Math.cos(state.camYaw) * Math.cos(pitch) * dist;

  camera.position.lerp(new THREE.Vector3(camX, camY, camZ), state.mode === "start" ? 0.05 : Math.min(1, 10 * dt));
  camera.lookAt(target);
}

// Initial preview
buildLevel(1);

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  if (state.mode === "playing") {
    updateGame(dt);
  }
  updateCamera(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
