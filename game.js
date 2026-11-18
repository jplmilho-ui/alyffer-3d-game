/* Simulador do Macho 3D — Horta no Quintal do Alyffer (Pau Arcado & Campo Limpo Paulista) */

const container = document.getElementById("gameContainer");

// UI Elements
const hud = document.getElementById("hud");
const startScreen = document.getElementById("startScreen");
const pauseScreen = document.getElementById("pauseScreen");
const sellModal = document.getElementById("sellModal");
const shopModal = document.getElementById("shopModal");
const npcModal = document.getElementById("npcModal");
const guideModal = document.getElementById("guideModal");
const dayBanner = document.getElementById("dayBanner");
const dayBannerText = document.getElementById("dayBannerText");

const farmerTagPill = document.getElementById("farmerTagPill");
const titleBadge = document.getElementById("titleBadge");
const moneyVal = document.getElementById("moneyVal");
const dayTimeVal = document.getElementById("dayTimeVal");
const locationVal = document.getElementById("locationVal");
const basketVal = document.getElementById("basketVal");
const waterBar = document.getElementById("waterBar");
const waterText = document.getElementById("waterText");
const insanityPill = document.getElementById("insanityPill");
const insanityLabel = document.getElementById("insanityLabel");
const insanityBar = document.getElementById("insanityBar");
const insanityText = document.getElementById("insanityText");
const buffBadge = document.getElementById("buffBadge");
const buffText = document.getElementById("buffText");

const contextPrompt = document.getElementById("contextPrompt");
const contextKey = document.getElementById("contextKey");
const contextText = document.getElementById("contextText");

const toastBox = document.getElementById("toastBox");
const toastIcon = document.getElementById("toastIcon");
const toastTitle = document.getElementById("toastTitle");
const toastText = document.getElementById("toastText");
const coringaBubble = document.getElementById("coringaBubble");
const coringaBubbleText = document.getElementById("coringaBubbleText");

const startBtn = document.getElementById("startBtn");
const resetSaveBtn = document.getElementById("resetSaveBtn");
const saveInfoLine = document.getElementById("saveInfoLine");
const resumeBtn = document.getElementById("resumeBtn");
const sleepPauseBtn = document.getElementById("sleepPauseBtn");
const restartPauseBtn = document.getElementById("restartPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const pauseBtn = document.getElementById("pauseBtn");
const guideHudBtn = document.getElementById("guideHudBtn");
const ordersHudBtn = document.getElementById("ordersHudBtn");
const shopHudBtn = document.getElementById("shopHudBtn");

const closeSellBtn = document.getElementById("closeSellBtn");
const sellModeNotice = document.getElementById("sellModeNotice");
const sellActionArea = document.getElementById("sellActionArea");
const sellInventoryList = document.getElementById("sellInventoryList");
const sellAllBtn = document.getElementById("sellAllBtn");
const ordersList = document.getElementById("ordersList");

const closeNpcBtn = document.getElementById("closeNpcBtn");
const npcTag = document.getElementById("npcTag");
const npcName = document.getElementById("npcName");
const npcAppearance = document.getElementById("npcAppearance");
const npcDialogue = document.getElementById("npcDialogue");
const npcMissionBox = document.getElementById("npcMissionBox");
const npcMissionTitle = document.getElementById("npcMissionTitle");
const npcMissionReq = document.getElementById("npcMissionReq");
const npcMissionReward = document.getElementById("npcMissionReward");
const npcActionBtn = document.getElementById("npcActionBtn");

const closeShopBtn = document.getElementById("closeShopBtn");
const shopMoneyVal = document.getElementById("shopMoneyVal");
const shopItemsList = document.getElementById("shopItemsList");

const closeGuideBtn = document.getElementById("closeGuideBtn");
const titlesList = document.getElementById("titlesList");
const guideQuestsList = document.getElementById("guideQuestsList");

// Crop & Product Definitions (Alface principalmente + produtos do quintal!)
const CROPS = {
  alface_crespa: {
    id: "alface_crespa",
    name: "Alface Crespa",
    emoji: "🥬",
    seedCost: 4,
    basePrice: 12,
    growTime: 13,
    color: 0x4ade80,
    leafColor: 0x22c55e,
    style: "lettuce_curly",
    plantable: true,
  },
  alface_americana: {
    id: "alface_americana",
    name: "Alface Americana",
    emoji: "🥗",
    seedCost: 8,
    basePrice: 22,
    growTime: 18,
    color: 0xa3e635,
    leafColor: 0x84cc16,
    style: "lettuce_round",
    plantable: true,
  },
  alface_roxa: {
    id: "alface_roxa",
    name: "Alface Roxa",
    emoji: "🟣",
    seedCost: 12,
    basePrice: 34,
    growTime: 24,
    color: 0xa855f7,
    leafColor: 0x7e22ce,
    style: "lettuce_purple",
    plantable: true,
  },
  tomate: {
    id: "tomate",
    name: "Tomate Cereja",
    emoji: "🍅",
    seedCost: 15,
    basePrice: 42,
    growTime: 27,
    color: 0xef4444,
    leafColor: 0x16a34a,
    style: "tomato",
    plantable: true,
  },
  cenoura: {
    id: "cenoura",
    name: "Cenoura",
    emoji: "🥕",
    seedCost: 10,
    basePrice: 27,
    growTime: 20,
    color: 0xf97316,
    leafColor: 0x15803d,
    style: "carrot",
    plantable: true,
  },
  morango: {
    id: "morango",
    name: "Morango",
    emoji: "🍓",
    seedCost: 18,
    basePrice: 52,
    growTime: 30,
    color: 0xf43f5e,
    leafColor: 0x15803d,
    style: "strawberry",
    plantable: true,
  },
  ovo_caipira: {
    id: "ovo_caipira",
    name: "Ovo Caipira",
    emoji: "🥚",
    seedCost: 0,
    basePrice: 16,
    growTime: 0,
    color: 0xfef3c7,
    leafColor: 0xfde68a,
    style: "egg",
    plantable: false,
  },
};

const SEED_KEYS = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango"];
const CROP_KEYS = Object.keys(CROPS);
const ALL_TITLES = ["Estudante ETEC", "PAC", "Homem Guloso", "Airfryer", "Macho"];
const STORAGE_KEY = "macho_horta_3d_save_v2";

function formatBRL(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Web Audio SFX
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
    const playTone = (freqStart, freqEnd, dur, wave = "sine", vol = 0.12, delay = 0) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freqStart, now + delay);
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + delay + dur);
      }
      gain.gain.setValueAtTime(vol, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    };

    if (type === "dig") {
      playTone(150, 70, 0.12, "triangle", 0.16);
    } else if (type === "plant") {
      playTone(320, 520, 0.11, "sine", 0.12);
    } else if (type === "water") {
      playTone(440, 680, 0.1, "sine", 0.09, 0);
      playTone(540, 780, 0.12, "sine", 0.08, 0.06);
    } else if (type === "refill") {
      playTone(330, 580, 0.14, "sine", 0.12, 0);
      playTone(580, 880, 0.16, "sine", 0.12, 0.08);
    } else if (type === "harvest") {
      playTone(523, 784, 0.12, "triangle", 0.14, 0);
      playTone(784, 1046, 0.16, "sine", 0.12, 0.08);
    } else if (type === "sell") {
      playTone(880, 880, 0.08, "sine", 0.12, 0);
      playTone(1174, 1318, 0.18, "triangle", 0.14, 0.07);
    } else if (type === "upgrade") {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        playTone(f, f * 1.02, 0.16, "triangle", 0.12, i * 0.07);
      });
    } else if (type === "sleep") {
      [392, 329.6, 261.6].forEach((f, i) => {
        playTone(f, f, 0.25, "sine", 0.1, i * 0.14);
      });
    } else if (type === "bark") {
      playTone(280, 420, 0.07, "sawtooth", 0.09, 0);
      playTone(310, 450, 0.08, "sawtooth", 0.09, 0.09);
    } else if (type === "coringa") {
      [587.3, 440, 698.5, 523.3, 880, 659.3].forEach((f, i) => {
        playTone(f, f * 1.18, 0.09, "sawtooth", 0.1, i * 0.065);
      });
    } else if (type === "chuckle") {
      [620, 480, 740].forEach((f, i) => {
        playTone(f, f * 1.12, 0.07, "triangle", 0.08, i * 0.055);
      });
    } else if (type === "error") {
      playTone(210, 140, 0.15, "sawtooth", 0.08);
    }
  }
}

const sfx = new SoundFX();

// Toast & Day Banner helpers
let toastTimer;
function showToast(icon, title, message) {
  toastIcon.textContent = icon;
  toastTitle.textContent = title;
  toastText.textContent = message;
  toastBox.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBox.classList.add("hidden");
  }, 2600);
}

let bannerTimer;
function showDayBanner(text) {
  dayBannerText.textContent = text;
  dayBanner.classList.remove("hidden");
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => {
    dayBanner.classList.add("hidden");
  }, 2600);
}

// Three.js Scene & Renderer Setup (with ACES Filmic ToneMapping & sRGB)
const scene = new THREE.Scene();
const skyColor = new THREE.Color(0x87ceeb);
scene.background = skyColor;
scene.fog = new THREE.FogExp2(0x9fd8e8, 0.0055);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 360);

function getResponsiveFov(aspect) {
  return aspect < 1 ? THREE.MathUtils.clamp(55 / Math.pow(Math.max(0.45, aspect), 0.42), 55, 76) : 55;
}

camera.fov = getResponsiveFov(camera.aspect);
camera.updateProjectionMatrix();

function createRenderer() {
  const attempts = [
    { antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true },
    { antialias: false, preserveDrawingBuffer: true },
  ];
  for (const opts of attempts) {
    try {
      const r = new THREE.WebGLRenderer(opts);
      r.setSize(window.innerWidth, window.innerHeight);
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      r.shadowMap.enabled = true;
      r.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.sRGBEncoding) r.outputEncoding = THREE.sRGBEncoding;
      if (THREE.ACESFilmicToneMapping) {
        r.toneMapping = THREE.ACESFilmicToneMapping;
        r.toneMappingExposure = 1.06;
      }
      return r;
    } catch (_) {
      // fallback
    }
  }
  return null;
}

const renderer = createRenderer();
if (!renderer) {
  container.innerHTML =
    '<div style="color:#fff;padding:24px;font-family:sans-serif">Erro ao iniciar WebGL 3D neste navegador.</div>';
  throw new Error("WebGLRenderer unavailable");
}
container.appendChild(renderer.domElement);

function updateCameraProjection() {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const aspect = w / h;
  camera.aspect = aspect;
  camera.fov = getResponsiveFov(aspect);
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
}

// Lights
const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x2d4c2b, 0.88);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.25);
sunLight.position.set(28, 44, 24);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 2;
sunLight.shadow.camera.far = 140;
const shadowBound = 38;
sunLight.shadow.camera.left = -shadowBound;
sunLight.shadow.camera.right = shadowBound;
sunLight.shadow.camera.top = shadowBound;
sunLight.shadow.camera.bottom = -shadowBound;
scene.add(sunLight);

const porchLight = new THREE.PointLight(0xffb74d, 0.4, 22);
porchLight.position.set(0, 3.6, -7.8);
scene.add(porchLight);

// Procedural High-Res Textures & Sign Generators
function createWoodSignTexture(line1, line2, bgColor = "#5c3a21", textColor = "#fef3c7") {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 240;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.font = "bold 62px 'Space Grotesk', sans-serif";
  ctx.fillText(line1, 384, 106, 710);

  ctx.fillStyle = "#86efac";
  ctx.font = "600 38px 'Inter', sans-serif";
  ctx.fillText(line2, 384, 180, 710);

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createTileFloorTexture(c1 = "#e2e8f0", c2 = "#cbd5e1", repeat = 16) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillRect(64, 64, 64, 64);
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createPacPosterTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, "#0ea5e9");
  grad.addColorStop(1, "#1e3a8a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 300);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let x = 0; x < 256; x += 32) {
    ctx.fillRect(x, 0, 2, 300);
  }

  // Stylized blocky PAC (TazerCraft) portrait
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(48, 175, 160, 75);
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(48, 175, 30, 75);
  ctx.fillRect(178, 175, 30, 75);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(110, 185, 7, 36);
  ctx.fillRect(139, 185, 7, 36);

  ctx.fillStyle = "#f1c29b";
  ctx.fillRect(76, 70, 104, 104);
  ctx.fillStyle = "#291d14";
  ctx.fillRect(76, 62, 104, 30);
  ctx.fillRect(76, 86, 16, 22);
  ctx.fillRect(164, 86, 16, 22);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(92, 114, 22, 14);
  ctx.fillRect(142, 114, 22, 14);
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(99, 116, 12, 12);
  ctx.fillRect(145, 116, 12, 12);
  ctx.fillStyle = "#7c2d12";
  ctx.fillRect(108, 148, 40, 8);

  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.fillRect(12, 240, 232, 48);
  ctx.fillStyle = "#38bdf8";
  ctx.textAlign = "center";
  ctx.font = "bold 24px 'Space Grotesk', sans-serif";
  ctx.fillText("PAC • TazerCraft", 128, 265);
  ctx.fillStyle = "#fef08a";
  ctx.font = "600 13px 'Inter', sans-serif";
  ctx.fillText("YouTuber Favorito do Macho", 128, 282);

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

// Scene Groups & Collections
const exteriorGroup = new THREE.Group();
scene.add(exteriorGroup);

const interiorGroup = new THREE.Group();
interiorGroup.visible = false;
scene.add(interiorGroup);

const terminalGroup = new THREE.Group();
terminalGroup.visible = false;
scene.add(terminalGroup);

const etecGroup = new THREE.Group();
etecGroup.visible = false;
scene.add(etecGroup);

const etecInsideGroup = new THREE.Group();
etecInsideGroup.visible = false;
scene.add(etecInsideGroup);

const rainGroup = new THREE.Group();
rainGroup.visible = false;
scene.add(rainGroup);
const rainDrops = [];

const clouds = [];
const chickens = [];
const fireflies = [];
const obstacles = []; // Yard AABB colliders
const interiorObstacles = []; // Bedroom AABB colliders
const terminalObstacles = []; // Terminal + Station AABB colliders
const etecObstacles = []; // ETEC courtyard AABB colliders
const etecInsideObstacles = []; // ETEC large indoor school AABB colliders
const etecNpcs = [];

let windowMat;
let lanternMat;
let wellWaterMesh;
let bus402YardMesh;
let ceilingFanMesh;
let dogCaramelo;
let coopEggVisuals = [];

function addObstacleBox(cx, cz, w, d, targetList = obstacles) {
  targetList.push({
    minX: cx - w / 2,
    maxX: cx + w / 2,
    minZ: cz - d / 2,
    maxZ: cz + d / 2,
  });
}

// Vehicle Builders (Ônibus Rápido Campinas & Trem Linha 7-Rubi)
function createBusModel(lineTitle = "402 PAU ARCADO", subTitle = "Rápido Campinas", bodyColor = 0x1d4ed8) {
  const bus = new THREE.Group();
  const topMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.38 });
  const lowerMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.65, roughness: 0.15 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 });

  const lower = new THREE.Mesh(new THREE.BoxGeometry(2.55, 1.35, 6.6), lowerMat);
  lower.position.y = 1.05;
  lower.castShadow = true;
  bus.add(lower);

  const upper = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.28, 6.55), topMat);
  upper.position.y = 2.35;
  upper.castShadow = true;
  bus.add(upper);

  const windows = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.86, 5.5), glassMat);
  windows.position.set(0, 2.35, 0.1);
  bus.add(windows);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.95, 0.1), glassMat);
  windshield.position.set(0, 2.3, -3.26);
  bus.add(windshield);

  const ledTex = createWoodSignTexture(lineTitle, subTitle, "#09090b", "#facc15");
  const led = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 0.44), new THREE.MeshBasicMaterial({ map: ledTex }));
  led.position.set(0, 2.86, -3.3);
  led.rotation.y = Math.PI;
  bus.add(led);

  const ledFront = led.clone();
  ledFront.position.set(0, 2.86, 3.3);
  ledFront.rotation.y = 0;
  bus.add(ledFront);

  [
    [-1.18, 0.44, -2.0],
    [1.18, 0.44, -2.0],
    [-1.18, 0.44, 2.0],
    [1.18, 0.44, 2.0],
  ].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.34, 14), wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(wx, wy, wz);
    bus.add(w);
  });

  return bus;
}

function createTrain7RubiModel(label = "LINHA 7-RUBI") {
  const train = new THREE.Group();
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.65, roughness: 0.25 });
  const rubiMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.4 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.1 });

  const car = new THREE.Mesh(new THREE.BoxGeometry(3.15, 3.25, 17.5), steelMat);
  car.position.y = 2.05;
  car.castShadow = true;
  train.add(car);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.56, 17.55), rubiMat);
  stripe.position.y = 1.5;
  train.add(stripe);

  const sideWin = new THREE.Mesh(new THREE.BoxGeometry(3.19, 0.92, 14.8), glassMat);
  sideWin.position.y = 2.45;
  train.add(sideWin);

  const frontSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.65, 0.72),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(label, "Jundiaí ↔ Campo Limpo ↔ Barra Funda", "#881337", "#ffffff"),
    })
  );
  frontSign.position.set(0, 3.05, 8.78);
  train.add(frontSign);

  const roofAC = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.32, 13.5), steelMat);
  roofAC.position.y = 3.82;
  train.add(roofAC);

  return train;
}

// 1. SÍTIO EM PAU ARCADO (Estrada do Garcia / Zona Rural de Campo Limpo Paulista)
function buildCountrysideEnvironment() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(280, 280),
    new THREE.MeshStandardMaterial({ color: 0x4b8b3b, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  exteriorGroup.add(ground);

  const yardLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 44),
    new THREE.MeshStandardMaterial({ color: 0x589a45, roughness: 0.92 })
  );
  yardLawn.rotation.x = -Math.PI / 2;
  yardLawn.position.set(0, 0.015, 1);
  yardLawn.receiveShadow = true;
  exteriorGroup.add(yardLawn);

  // Estrada do Garcia / Estrada Rural de Pau Arcado
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x9b7248, roughness: 0.95 });
  const mainRoad = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 130), roadMat);
  mainRoad.rotation.x = -Math.PI / 2;
  mainRoad.position.set(12.5, 0.025, 68);
  mainRoad.receiveShadow = true;
  exteriorGroup.add(mainRoad);

  const crossRoad = new THREE.Mesh(new THREE.PlaneGeometry(80, 5.2), roadMat);
  crossRoad.rotation.x = -Math.PI / 2;
  crossRoad.position.set(0, 0.024, 24.2);
  crossRoad.receiveShadow = true;
  exteriorGroup.add(crossRoad);

  // Footpaths inside yard
  const path1 = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 14), roadMat);
  path1.rotation.x = -Math.PI / 2;
  path1.position.set(5.5, 0.022, -1.5);
  exteriorGroup.add(path1);

  const path2 = new THREE.Mesh(new THREE.PlaneGeometry(11, 3.0), roadMat);
  path2.rotation.x = -Math.PI / 2;
  path2.position.set(7.5, 0.023, 6.2);
  exteriorGroup.add(path2);

  // Serra / Hills around Pau Arcado
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x3b7430, roughness: 1 });
  [
    [-70, -75, 34, 15],
    [0, -90, 46, 20],
    [72, -78, 38, 17],
    [-85, 25, 36, 14],
    [88, 18, 40, 16],
    [-65, 85, 36, 13],
    [68, 88, 34, 14],
  ].forEach(([x, z, r, h]) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(r, h, 14), hillMat);
    hill.position.set(x, h * 0.35, z);
    hill.scale.set(1.4, 1, 1.1);
    exteriorGroup.add(hill);
  });

  // Distant Campo Limpo Paulista urban skyline
  const cityGroup = new THREE.Group();
  cityGroup.position.set(14, 0, 125);
  const bldgMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
  [
    [-12, 12, 4],
    [-6, 18, 4.5],
    [0, 24, 5],
    [6, 15, 4],
    [11, 20, 4.5],
    [16, 11, 3.5],
  ].forEach(([bx, bh, bw]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bw), bldgMat);
    b.position.set(bx, bh / 2, 0);
    cityGroup.add(b);
  });
  exteriorGroup.add(cityGroup);

  // Pesqueiro / Lago de Pau Arcado (outside right fence at x = 29, z = -8)
  const pond = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 20),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.3 })
  );
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(29, 0.03, -8);
  exteriorGroup.add(pond);

  // Fence around the homestead (x: -22..22, z: -21..21, gate at x: 9.2..15.8, z: 21)
  const fenceMat = new THREE.MeshStandardMaterial({ color: 0x7c502b, roughness: 0.85 });
  function addFenceSegment(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    const steps = Math.max(1, Math.round(len / 3.2));
    for (let i = 0; i <= steps; i++) {
      const px = x1 + (dx * i) / steps;
      const pz = z1 + (dz * i) / steps;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.45, 0.24), fenceMat);
      post.position.set(px, 0.72, pz);
      post.castShadow = true;
      exteriorGroup.add(post);
    }
    const angle = Math.atan2(dx, dz);
    [0.55, 1.15].forEach((ry) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, len), fenceMat);
      rail.position.set((x1 + x2) / 2, ry, (z1 + z2) / 2);
      rail.rotation.y = angle;
      rail.castShadow = true;
      exteriorGroup.add(rail);
    });
  }
  addFenceSegment(-22, -21, 22, -21);
  addFenceSegment(-22, -21, -22, 21);
  addFenceSegment(22, -21, 22, 21);
  addFenceSegment(-22, 21, 9.2, 21);
  addFenceSegment(15.8, 21, 22, 21);

  // Estrada do Garcia Road Sign at the Gate
  const gatePost = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.4, 0.22), fenceMat);
  gatePost.position.set(16.4, 1.2, 21.3);
  gatePost.castShadow = true;
  exteriorGroup.add(gatePost);
  const roadSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTRADA DO GARCIA →", "Pau Arcado • Campo Limpo Pta.", "#14532d", "#fef08a"),
    })
  );
  roadSign.position.set(16.4, 2.15, 21.3);
  exteriorGroup.add(roadSign);

  // Alyffer's House in Pau Arcado
  const house = new THREE.Group();
  house.position.set(0, 0, -14.5);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5ecd9, roughness: 0.8 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.75 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.7 });
  const porchMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(10.8, 4.4, 7.2), wallMat);
  body.position.y = 2.2;
  body.castShadow = true;
  body.receiveShadow = true;
  house.add(body);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(8.8, 3.2, 4), roofMat);
  roof.position.y = 5.95;
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.16, 1, 0.86);
  roof.castShadow = true;
  house.add(roof);

  // Classic Blue Water Tank (Caixa d'água azul) on a side tower
  const waterTower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.95, 0.85, 1.15, 14),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.45 })
  );
  waterTower.position.set(3.4, 5.4, -1.6);
  waterTower.castShadow = true;
  house.add(waterTower);

  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 2.2, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x8c3b23, roughness: 0.85 })
  );
  chimney.position.set(-3.2, 6.2, -1.2);
  chimney.castShadow = true;
  house.add(chimney);

  const porchDeck = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.35, 3.2), porchMat);
  porchDeck.position.set(0, 0.175, 5.1);
  porchDeck.receiveShadow = true;
  house.add(porchDeck);

  const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.25, 3.4), roofMat);
  porchRoof.position.set(0, 3.7, 5.1);
  porchRoof.rotation.x = 0.14;
  porchRoof.castShadow = true;
  house.add(porchRoof);

  [-4.9, -1.9, 1.9, 4.9].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 3.4, 0.26), trimMat);
    pillar.position.set(px, 1.85, 6.45);
    pillar.castShadow = true;
    house.add(pillar);
  });

  const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.75, 0.18), trimMat);
  door.position.set(0, 1.55, 3.62);
  house.add(door);

  windowMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.3,
    roughness: 0.2,
  });
  [-3.2, 3.2].forEach((wx) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1.45, 0.16), trimMat);
    frame.position.set(wx, 2.25, 3.6);
    house.add(frame);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.15, 0.18), windowMat);
    glass.position.set(wx, 2.25, 3.62);
    house.add(glass);
  });

  // Porch Bench & Coffee Table
  const bench = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.45, 0.7), trimMat);
  bench.position.set(-3.3, 0.6, 4.7);
  bench.castShadow = true;
  house.add(bench);

  lanternMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.45,
  });
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.32), lanternMat);
  lantern.position.set(1.2, 3.25, 6.2);
  house.add(lantern);

  const houseSign = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 1.05, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SÍTIO DO MACHO", "Pau Arcado • ETEC CLP"),
    })
  );
  houseSign.position.set(0, 4.45, 5.95);
  house.add(houseSign);

  exteriorGroup.add(house);
  addObstacleBox(0, -12.8, 11.0, 10.2);

  // Galinheiro Caipira (Chicken Coop — produces Ovos Caipiras daily!) at (-14.5, 0, -5.8)
  const coop = new THREE.Group();
  coop.position.set(-14.5, 0, -5.8);
  const coopBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 1.8, 2.6),
    new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.85 })
  );
  coopBody.position.y = 0.9;
  coopBody.castShadow = true;
  coop.add(coopBody);
  const coopRoof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 1.0, 4), roofMat);
  coopRoof.position.y = 2.25;
  coopRoof.rotation.y = Math.PI / 4;
  coopRoof.castShadow = true;
  coop.add(coopRoof);
  const coopSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.65, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("GALINHEIRO", "Ovos Caipiras Frescos", "#7c2d12", "#fef08a"),
    })
  );
  coopSign.position.set(0, 2.45, 1.25);
  coop.add(coopSign);

  // Visual eggs in nest box in front of coop
  coopEggVisuals = [];
  [-0.45, 0, 0.45].forEach((ex) => {
    const egg = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 })
    );
    egg.scale.set(1, 1.25, 1);
    egg.position.set(ex, 0.22, 1.52);
    coop.add(egg);
    coopEggVisuals.push(egg);
  });

  exteriorGroup.add(coop);
  addObstacleBox(-14.5, -5.8, 3.3, 2.7);

  // Water Well (Poço de Água) at (-14.5, 0, 2)
  const well = new THREE.Group();
  well.position.set(-14.5, 0, 2);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 });
  const wellBase = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.5, 1.1, 14), stoneMat);
  wellBase.position.y = 0.55;
  wellBase.castShadow = true;
  well.add(wellBase);

  wellWaterMesh = new THREE.Mesh(
    new THREE.CircleGeometry(1.12, 16),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.15,
    })
  );
  wellWaterMesh.rotation.x = -Math.PI / 2;
  wellWaterMesh.position.y = 1.12;
  well.add(wellWaterMesh);

  [-1.1, 1.1].forEach((px) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), trimMat);
    post.position.set(px, 1.85, 0);
    well.add(post);
  });
  const wellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.85, 1.1, 4), roofMat);
  wellRoof.position.y = 3.25;
  wellRoof.rotation.y = Math.PI / 4;
  well.add(wellRoof);

  const wellSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.6, 0.1),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("POÇO D'ÁGUA", "Encher Regador") })
  );
  wellSign.position.set(0, 2.55, 1.05);
  well.add(wellSign);

  exteriorGroup.add(well);
  addObstacleBox(-14.5, 2, 2.7, 2.7);

  // Composteira Orgânica at (-14.5, 0, 8.8)
  const compost = new THREE.Group();
  compost.position.set(-14.5, 0, 8.8);
  const compBin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 2.2), trimMat);
  compBin.position.y = 0.55;
  compBin.castShadow = true;
  compost.add(compBin);
  const compHumus = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.25, 1.9),
    new THREE.MeshStandardMaterial({ color: 0x291d12, roughness: 1 })
  );
  compHumus.position.y = 1.05;
  compost.add(compHumus);
  const compSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.6, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("COMPOSTEIRA", "Adubo Caseiro Grátis", "#14532d", "#86efac"),
    })
  );
  compSign.position.set(0, 1.65, 1.05);
  compost.add(compSign);
  exteriorGroup.add(compost);
  addObstacleBox(-14.5, 8.8, 2.3, 2.3);

  // Cooperativa Rural (Melhorias do Quintal) at (10.5, 0, 6.2)
  const stand = new THREE.Group();
  stand.position.set(10.5, 0, 6.2);
  stand.rotation.y = -0.35;

  const counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.15, 1.7), trimMat);
  counter.position.y = 0.575;
  counter.castShadow = true;
  stand.add(counter);

  [-1.9, 1.9].forEach((px) => {
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.8, 0.18), trimMat);
    pole.position.set(px, 1.8, -0.65);
    stand.add(pole);
  });

  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.22, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.65 })
  );
  awning.position.set(0, 3.1, 0.15);
  awning.rotation.x = 0.18;
  stand.add(awning);

  const standSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.9, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("COOPERATIVA RURAL", "Melhorias • Pegue o 402 p/ Vender"),
    })
  );
  standSign.position.set(0, 3.65, 0.1);
  stand.add(standSign);

  exteriorGroup.add(stand);
  addObstacleBox(10.5, 6.2, 4.0, 2.2);

  // Ponto do Ônibus 402 (Pau Arcado -> Terminal Campo Limpo Paulista) at (8.2, 0, 17.5)
  const stopGroup = new THREE.Group();
  stopGroup.position.set(8.2, 0, 17.5);
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 });
  const shelterBack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.3, 0.12), metalMat);
  shelterBack.position.set(0, 1.15, -0.6);
  stopGroup.add(shelterBack);
  const shelterRoof = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.14, 1.8), metalMat);
  shelterRoof.position.set(0, 2.35, 0.1);
  shelterRoof.castShadow = true;
  stopGroup.add(shelterRoof);
  const benchStop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 0.55), trimMat);
  benchStop.position.set(0, 0.25, -0.15);
  stopGroup.add(benchStop);

  const bus402StopBanner = new THREE.Mesh(
    new THREE.BoxGeometry(3.3, 0.85, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PONTO ÔNIBUS 402", "Pau Arcado → Terminal CLP", "#1e3a8a", "#fef08a"),
    })
  );
  bus402StopBanner.position.set(0, 2.9, 0.85);
  stopGroup.add(bus402StopBanner);
  exteriorGroup.add(stopGroup);
  addObstacleBox(8.2, 17.2, 3.3, 1.2);

  // Bus 402 parked on the road outside the gate (hidden on rainy days!)
  bus402YardMesh = createBusModel("402 PAU ARCADO", "Via Estrada do Garcia");
  bus402YardMesh.position.set(13.2, 0, 17.5);
  exteriorGroup.add(bus402YardMesh);
  addObstacleBox(13.2, 17.5, 2.7, 6.6);

  // Cachorro Caramelo 3D ("Caramelo") in the yard!
  const dog = new THREE.Group();
  const carameloMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 });
  const dogBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.42, 0.82), carameloMat);
  dogBody.position.y = 0.46;
  dogBody.castShadow = true;
  dog.add(dogBody);
  const dogHead = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.4), carameloMat);
  dogHead.position.set(0, 0.72, 0.42);
  dog.add(dogHead);
  const dogSnout = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x451a03 })
  );
  dogSnout.position.set(0, 0.66, 0.66);
  dog.add(dogSnout);
  const dogTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.1), carameloMat);
  dogTail.position.set(0, 0.68, -0.45);
  dogTail.rotation.x = -0.5;
  dog.add(dogTail);
  [
    [-0.16, 0.18, 0.28],
    [0.16, 0.18, 0.28],
    [-0.16, 0.18, -0.28],
    [0.16, 0.18, -0.28],
  ].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.36, 0.12), carameloMat);
    leg.position.set(lx, ly, lz);
    dog.add(leg);
  });
  const dogTag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.42),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CARAMELO 🐕", "Espaço / E: Carinho", "#78350f", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  dogTag.position.set(0, 1.35, 0);
  dog.add(dogTag);
  dog.position.set(4.2, 0, -3.5);
  exteriorGroup.add(dog);
  dogCaramelo = {
    mesh: dog,
    tail: dogTail,
    home: new THREE.Vector3(4.2, 0, -3.5),
    target: new THREE.Vector3(4.2, 0, -3.5),
    wait: 1.5,
  };

  // Trees around the yard & distant countryside
  function addTree(x, z, scale = 1, type = "round") {
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.46, 2.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 })
    );
    trunk.position.y = 1.4;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliageColor = type === "ipe" ? 0xfacc15 : 0x2e7d32;
    const fMat = new THREE.MeshStandardMaterial({ color: foliageColor, roughness: 0.85 });
    const crown1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.85, 1), fMat);
    crown1.position.y = 3.6;
    crown1.castShadow = true;
    tree.add(crown1);

    const crown2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 1), fMat);
    crown2.position.set(0.8, 4.4, 0.4);
    crown2.castShadow = true;
    tree.add(crown2);

    exteriorGroup.add(tree);
    if (Math.abs(x) < 22 && Math.abs(z) < 22) {
      addObstacleBox(x, z, 0.95, 0.95);
    }
  }

  [
    [-19, -17, 1.15, "round"],
    [19, -16, 1.25, "ipe"],
    [-20, 14, 1.1, "round"],
    [19, -3, 1.05, "round"],
    [-28, -28, 1.4, "round"],
    [-32, 4, 1.5, "ipe"],
    [30, -24, 1.35, "round"],
    [32, 12, 1.45, "round"],
    [-26, 30, 1.3, "round"],
    [28, 32, 1.3, "ipe"],
    [-42, -12, 1.6, "round"],
    [40, -10, 1.5, "round"],
  ].forEach(([x, z, s, t]) => addTree(x, z, s, t));

  // Fluffy drifting clouds
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.88 });
  for (let i = 0; i < 10; i++) {
    const cGroup = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(2.6 + (j % 2), 1), cloudMat);
      puff.position.set((j - 1) * 2.5, (j % 2) * 0.7, 0);
      puff.scale.set(1.3, 0.65, 1.0);
      cGroup.add(puff);
    }
    cGroup.position.set((Math.random() - 0.5) * 140, 28 + Math.random() * 12, (Math.random() - 0.5) * 120);
    exteriorGroup.add(cGroup);
    clouds.push({ mesh: cGroup, speed: 0.8 + Math.random() * 0.7 });
  }

  // Backyard Chickens
  for (let i = 0; i < 3; i++) {
    const ch = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.4, 0.6),
      new THREE.MeshStandardMaterial({ color: i === 0 ? 0xffffff : 0xd97706, roughness: 0.8 })
    );
    body.position.y = 0.35;
    body.castShadow = true;
    ch.add(body);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.26, 0.24),
      new THREE.MeshStandardMaterial({ color: i === 0 ? 0xfef3c7 : 0xb45309, roughness: 0.8 })
    );
    head.position.set(0, 0.6, 0.26);
    ch.add(head);

    const comb = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xef4444 })
    );
    comb.position.set(0, 0.77, 0.26);
    ch.add(comb);

    const beak = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.07, 0.12),
      new THREE.MeshStandardMaterial({ color: 0xfacc15 })
    );
    beak.position.set(0, 0.58, 0.42);
    ch.add(beak);

    const home = new THREE.Vector3(i === 0 ? -11 : i === 1 ? -13.5 : 4.5, 0, i === 0 ? 11 : i === 1 ? -2.8 : -5.5);
    ch.position.copy(home);
    exteriorGroup.add(ch);
    chickens.push({
      mesh: ch,
      home,
      target: home.clone(),
      wait: Math.random() * 2,
    });
  }

  // Fireflies for dusk/night atmosphere
  for (let i = 0; i < 24; i++) {
    const ff = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0 })
    );
    ff.position.set((Math.random() - 0.5) * 38, 0.8 + Math.random() * 2.5, (Math.random() - 0.5) * 34);
    exteriorGroup.add(ff);
    fireflies.push({
      mesh: ff,
      base: ff.position.clone(),
      phase: Math.random() * Math.PI * 2,
    });
  }
}
buildCountrysideEnvironment();

// 2. QUARTO DO ALYFFER (Casa em Pau Arcado — Mangás, Pôster do PAC, Mesa da ETEC)
function buildBedroomInterior() {
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe6e2d3, roughness: 0.85 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.75 });

  const roomLamp = new THREE.PointLight(0xfff1c9, 1.2, 24);
  roomLamp.position.set(0, 3.9, 0.5);
  interiorGroup.add(roomLamp);

  // Rotating Ceiling Fan
  ceilingFanMesh = new THREE.Group();
  ceilingFanMesh.position.set(0, 3.85, 0);
  const fanHub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 10), woodMat);
  ceilingFanMesh.add(fanHub);
  for (let b = 0; b < 4; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.22), woodMat);
    blade.rotation.y = (b * Math.PI) / 2;
    ceilingFanMesh.add(blade);
  }
  interiorGroup.add(ceilingFanMesh);

  const floor = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.2, 8.6), floorMat);
  floor.position.y = -0.1;
  floor.receiveShadow = true;
  interiorGroup.add(floor);

  const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 3.2),
    new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.95 })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.015, 0.4);
  interiorGroup.add(rug);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(10.8, 4.3, 0.2), wallMat);
  backWall.position.set(0, 2.15, -4.2);
  backWall.receiveShadow = true;
  interiorGroup.add(backWall);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.3, 8.6), wallMat);
  leftWall.position.set(-5.3, 2.15, 0);
  interiorGroup.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.3, 8.6), wallMat);
  rightWall.position.set(5.3, 2.15, 0);
  interiorGroup.add(rightWall);

  // Bed (Cama do Alyffer) at (-3.2, 0, -2.2)
  const bed = new THREE.Group();
  bed.position.set(-3.2, 0, -2.2);
  const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.45, 2.9), woodMat);
  bedBase.position.y = 0.225;
  bedBase.castShadow = true;
  bed.add(bedBase);
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.28, 2.72),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
  );
  mattress.position.y = 0.58;
  bed.add(mattress);
  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(1.98, 0.3, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.8 })
  );
  blanket.position.set(0, 0.59, 0.45);
  bed.add(blanket);
  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.18, 0.55),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
  );
  pillow.position.set(0, 0.78, -0.95);
  bed.add(pillow);
  interiorGroup.add(bed);
  addObstacleBox(-3.2, -2.2, 2.2, 2.95, interiorObstacles);

  // Framed Poster of YouTuber "PAC do TazerCraft"
  const pacFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 2.0, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
  );
  pacFrame.position.set(-3.2, 2.38, -4.06);
  interiorGroup.add(pacFrame);

  const pacPoster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.78),
    new THREE.MeshBasicMaterial({ map: createPacPosterTexture() })
  );
  pacPoster.position.set(-3.2, 2.38, -4.0);
  interiorGroup.add(pacPoster);

  // Bookshelf full of Mangás at (0, 0, -3.65)
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(0, 0, -3.65);
  const shelfBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.6, 0.6), woodMat);
  shelfBody.position.y = 1.3;
  shelfBody.castShadow = true;
  shelfGroup.add(shelfBody);

  const mangaColors = [0xffffff, 0x18181b, 0xef4444, 0x3b82f6, 0xfacc15, 0x22c55e, 0xa855f7, 0xf97316];
  [0.55, 1.22, 1.88].forEach((sy, rowIdx) => {
    const recess = new THREE.Mesh(
      new THREE.BoxGeometry(1.92, 0.48, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x2b1a0e })
    );
    recess.position.set(0, sy, 0.25);
    shelfGroup.add(recess);

    for (let m = 0; m < 9; m++) {
      const col = mangaColors[(m + rowIdx * 3) % mangaColors.length];
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.38, 0.28),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.65 })
      );
      book.position.set(-0.76 + m * 0.19, sy - 0.03, 0.22);
      if (m === 7 && rowIdx === 1) book.rotation.z = 0.22;
      shelfGroup.add(book);
    }
  });

  const mangaSign = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.48, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("MANGÁS", "Coleção do Macho", "#1e1b4b", "#facc15") })
  );
  mangaSign.position.set(0, 2.86, 0.15);
  shelfGroup.add(mangaSign);

  interiorGroup.add(shelfGroup);
  addObstacleBox(0, -3.65, 2.3, 0.75, interiorObstacles);

  // Study Desk + ETEC de Campo Limpo Paulista Backpack & Notebook at (3.2, 0, -2.95)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(3.2, 0, -2.95);

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.14, 1.25), woodMat);
  deskTop.position.y = 0.95;
  deskTop.castShadow = true;
  deskGroup.add(deskTop);
  [
    [-1.0, -0.5],
    [1.0, -0.5],
    [-1.0, 0.5],
    [1.0, 0.5],
  ].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.95, 0.12), woodMat);
    leg.position.set(lx, 0.475, lz);
    deskGroup.add(leg);
  });

  const notebook = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.05, 0.4),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  notebook.position.set(-0.35, 1.05, 0.1);
  deskGroup.add(notebook);

  const backpack = new THREE.Mesh(
    new THREE.BoxGeometry(0.48, 0.62, 0.3),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.75 })
  );
  backpack.position.set(0.85, 0.31, 0.52);
  backpack.rotation.y = -0.35;
  deskGroup.add(backpack);

  const etecSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.25, 0.85, 0.08),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ETEC CAMPO LIMPO", "Cadernos & Tarefas", "#7f1d1d", "#fef08a"),
    })
  );
  etecSign.position.set(0, 2.25, -1.04);
  deskGroup.add(etecSign);

  interiorGroup.add(deskGroup);
  addObstacleBox(3.2, -2.95, 2.45, 1.4, interiorObstacles);

  // Exit Doormat
  const doormat = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.04, 1.1),
    new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.9 })
  );
  doormat.position.set(0, 0.02, 3.5);
  interiorGroup.add(doormat);

  const exitSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.62, 0.08),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SAIR P/ QUINTAL", "Pau Arcado", "#14532d", "#fef08a"),
    })
  );
  exitSign.position.set(0, 0.55, 4.08);
  interiorGroup.add(exitSign);
}
buildBedroomInterior();

// 3. TERMINAL URBANO DE CAMPO LIMPO PAULISTA & ESTAÇÃO LINHA 7-RUBI (Av. Alfried Krupp)
function buildTerminalAndStation() {
  const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.92 });
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5, metalness: 0.25 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.55, roughness: 0.35 });
  const rubiMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.45 });
  const yellowTactile = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.7 });

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(110, 110), asphaltMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  terminalGroup.add(ground);

  // Rio Jundiaí channel passing behind/alongside the railway corridor
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 90),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.25, metalness: 0.25 })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.set(23.5, 0.02, 0);
  terminalGroup.add(river);

  // Av. Alfried Krupp road markings & crosswalk
  for (let x = -22; x <= 20; x += 4) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.22), yellowTactile);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(x, 0.02, 12.2);
    terminalGroup.add(dash);
  }

  // Terminal Bus Platform Island (left side: x = -14..2.5, z = -3.5..8.5)
  const termPlatform = new THREE.Mesh(new THREE.BoxGeometry(16.5, 0.26, 12), concreteMat);
  termPlatform.position.set(-5.75, 0.13, 2.5);
  termPlatform.receiveShadow = true;
  terminalGroup.add(termPlatform);

  const termRoof = new THREE.Mesh(new THREE.BoxGeometry(16.8, 0.32, 10.6), roofMat);
  termRoof.position.set(-5.75, 4.35, 2.5);
  termRoof.castShadow = true;
  terminalGroup.add(termRoof);

  [-12.0, -5.75, 0.5].forEach((px) => {
    [-1.4, 6.4].forEach((pz) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 4.2, 10), steelMat);
      col.position.set(px, 2.1, pz);
      col.castShadow = true;
      terminalGroup.add(col);
      addObstacleBox(px, pz, 0.55, 0.55, terminalObstacles);
    });
  });

  // Main Terminal Sign (NO "Vila Thomazina")
  const termSign = new THREE.Mesh(
    new THREE.BoxGeometry(7.6, 1.25, 0.18),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("TERMINAL CAMPO LIMPO PTA", "Av. Alfried Krupp • Centro", "#1e3a8a", "#ffffff"),
    })
  );
  termSign.position.set(-5.75, 5.05, 7.85);
  terminalGroup.add(termSign);

  // Bus 402 at Bay 1 (back to Pau Arcado)
  const busTerm402 = createBusModel("402 PAU ARCADO", "Via Estrada do Garcia", 0x1d4ed8);
  busTerm402.position.set(-8.6, 0, -5.9);
  busTerm402.rotation.y = Math.PI / 2;
  terminalGroup.add(busTerm402);
  addObstacleBox(-8.6, -5.9, 6.7, 2.7, terminalObstacles);

  // Bus 401 Botujuru parked at Bay 2 (left side for realism)
  const busTerm401 = createBusModel("401 BOTUJURU", "Rápido Campinas", 0x0284c7);
  busTerm401.position.set(-16.2, 0, 2.5);
  terminalGroup.add(busTerm401);
  addObstacleBox(-16.2, 2.5, 2.7, 6.7, terminalObstacles);

  const baySign = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 0.85, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BAIA 1 • ÔNIBUS 402", "Voltar p/ Pau Arcado", "#0f172a", "#facc15"),
    })
  );
  baySign.position.set(-8.6, 2.8, -2.5);
  terminalGroup.add(baySign);

  // Bancas do Produtor no Terminal (Sell crops & fulfill orders) at (-1.6, 0.26, 2.5)
  const stall = new THREE.Group();
  stall.position.set(-1.6, 0.26, 2.5);
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.15, 1.7),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 })
  );
  counter.position.y = 0.575;
  counter.castShadow = true;
  stall.add(counter);
  const stallAwning = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 0.22, 2.3),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.65 })
  );
  stallAwning.position.set(0, 2.6, 0.15);
  stallAwning.rotation.x = 0.14;
  stall.add(stallAwning);
  [-1.3, -0.4, 0.5, 1.3].forEach((lx, idx) => {
    const veg = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.28, 1),
      new THREE.MeshStandardMaterial({ color: idx === 2 ? 0xa855f7 : 0x4ade80 })
    );
    veg.position.set(lx, 1.32, 0.2);
    stall.add(veg);
  });
  const stallSign = new THREE.Mesh(
    new THREE.BoxGeometry(4.1, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BANCAS DO TERMINAL", "Vender Alface & Encomendas", "#14532d", "#fef08a"),
    })
  );
  stallSign.position.set(0, 3.25, 0.2);
  stall.add(stallSign);
  terminalGroup.add(stall);
  addObstacleBox(-1.6, 2.5, 4.5, 2.0, terminalObstacles);

  // Barraca do Pastel & Caldo de Cana no Terminal at (-9.2, 0.26, 2.5)
  const pastelStall = new THREE.Group();
  pastelStall.position.set(-9.2, 0.26, 2.5);
  const pCounter = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 1.1, 1.5),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.75 })
  );
  pCounter.position.y = 0.55;
  pCounter.castShadow = true;
  pastelStall.add(pCounter);
  const pAwning = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 0.2, 2.0),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 })
  );
  pAwning.position.set(0, 2.5, 0.1);
  pastelStall.add(pAwning);
  const pSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.3, 0.82, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PASTEL & CALDO DE CANA", "R$ 8 • +Energia & -Insanidade", "#991b1b", "#fef08a"),
    })
  );
  pSign.position.set(0, 3.1, 0.15);
  pastelStall.add(pSign);
  terminalGroup.add(pastelStall);
  addObstacleBox(-9.2, 2.5, 3.4, 1.8, terminalObstacles);

  // Integrated Train Station: ESTAÇÃO CAMPO LIMPO PAULISTA (LINHA 7-RUBI)
  const stationPlatform = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.95, 24), concreteMat);
  stationPlatform.position.set(8.5, 0.475, -1);
  stationPlatform.receiveShadow = true;
  terminalGroup.add(stationPlatform);

  const termRamp = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.25, 4.2), concreteMat);
  termRamp.position.set(4.5, 0.46, 0.5);
  termRamp.rotation.z = 0.34;
  terminalGroup.add(termRamp);
  addObstacleBox(5.9, -7.3, 0.6, 11.4, terminalObstacles);
  addObstacleBox(5.9, 6.8, 0.6, 8.4, terminalObstacles);
  addObstacleBox(12.8, -1, 3.5, 24, terminalObstacles);

  const tactile = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 24), yellowTactile);
  tactile.position.set(10.95, 0.97, -1);
  terminalGroup.add(tactile);

  const stRoof = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.24, 18), steelMat);
  stRoof.position.set(8.3, 4.5, -1);
  terminalGroup.add(stRoof);

  [-6, 0, 6].forEach((pz) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.6, 0.28), steelMat);
    pillar.position.set(7.5, 2.7, pz);
    terminalGroup.add(pillar);
    addObstacleBox(7.5, pz, 0.48, 0.48, terminalObstacles);
  });

  const rubiBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1.25, 6.2),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CAMPO LIMPO PAULISTA", "Linha 7-Rubi • Sentido Botujuru", "#881337", "#ffffff"),
    })
  );
  rubiBoard.position.set(7.5, 3.5, 1.5);
  rubiBoard.rotation.y = -Math.PI / 2;
  terminalGroup.add(rubiBoard);

  // Overpass & Elevator Tower (Passarela e Elevador da Estação CLP)
  const overpassDeck = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.38, 2.8), concreteMat);
  overpassDeck.position.set(11.5, 5.6, -7.5);
  terminalGroup.add(overpassDeck);
  const overpassRail = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.9, 0.14), rubiMat);
  overpassRail.position.set(11.5, 6.2, -6.15);
  terminalGroup.add(overpassRail);
  const elevTower = new THREE.Mesh(new THREE.BoxGeometry(2.1, 6.6, 2.1), steelMat);
  elevTower.position.set(6.2, 3.3, -7.5);
  terminalGroup.add(elevTower);
  addObstacleBox(6.2, -7.5, 2.2, 2.2, terminalObstacles);

  const railMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
  const ballast = new THREE.Mesh(
    new THREE.BoxGeometry(7.5, 0.1, 44),
    new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 1 })
  );
  ballast.position.set(15.2, 0.05, 0);
  terminalGroup.add(ballast);

  [12.7, 14.1, 16.5, 17.9].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 44), railMat);
    rail.position.set(rx, 0.16, 0);
    terminalGroup.add(rail);
  });

  const trainTerm = createTrain7RubiModel("7-RUBI • BOTUJURU");
  trainTerm.position.set(13.4, 0.1, 0);
  terminalGroup.add(trainTerm);
}
buildTerminalAndStation();

// 3D NPC Character Builder for ETEC de Campo Limpo Paulista
function createNpcModel({
  name,
  roleSub = "Espaço / E: Falar",
  skinColor,
  shirtColor,
  pantsColor,
  shoeColor,
  hairStyle, // "messy" | "sparse" | "long" | "short"
  hairColor = 0x1e1b18,
  trenchCoat = false,
  redGlasses = false,
  etecBadge = false,
}) {
  const npc = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.65 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.75 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.45, metalness: 0.15 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.85 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.12, 0.5), shirtMat);
  torso.position.y = 1.4;
  torso.castShadow = true;
  npc.add(torso);

  if (trenchCoat) {
    // Sobretudo do Kaio Wendell
    const coatSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.68, 0.56), shirtMat);
    coatSkirt.position.y = 0.78;
    coatSkirt.castShadow = true;
    npc.add(coatSkirt);
    const lapel = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.8, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    lapel.position.set(0, 1.48, 0.26);
    npc.add(lapel);
  }

  if (etecBadge) {
    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.18, 0.04),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    badge.position.set(0, 1.58, 0.27);
    npc.add(badge);
  }

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.66, 0.66), skinMat);
  head.position.y = 2.32;
  head.castShadow = true;
  npc.add(head);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const lEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.05), eyeMat);
  lEye.position.set(-0.14, 2.36, 0.34);
  const rEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.05), eyeMat);
  rEye.position.set(0.14, 2.36, 0.34);
  npc.add(lEye, rEye);

  if (redGlasses) {
    // Óculos vermelho do Muzzonline
    const glassFrameMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const lRim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.06), glassFrameMat);
    lRim.position.set(-0.15, 2.36, 0.36);
    const rRim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.06), glassFrameMat);
    rRim.position.set(0.15, 2.36, 0.36);
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.06), glassFrameMat);
    bridge.position.set(0, 2.38, 0.36);
    npc.add(lRim, rRim, bridge);
  }

  if (hairStyle === "messy") {
    const baseHair = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 0.72), hairMat);
    baseHair.position.set(0, 2.66, -0.02);
    npc.add(baseHair);
    [
      [-0.22, 2.82, 0.15, 0.35],
      [0.18, 2.84, -0.1, -0.4],
      [0, 2.86, 0.1, 0.2],
      [-0.1, 2.8, -0.22, -0.3],
      [0.26, 2.76, 0.12, 0.45],
    ].forEach(([hx, hy, hz, rot]) => {
      const tuft = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), hairMat);
      tuft.position.set(hx, hy, hz);
      tuft.rotation.z = rot;
      npc.add(tuft);
    });
  } else if (hairStyle === "sparse") {
    // Cabelo visível do Kaio Wendell (topo coberto + mechas de cientista)
    const topHair = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.2, 0.68), hairMat);
    topHair.position.set(0, 2.68, -0.02);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.32, 0.64), hairMat);
    sideL.position.set(-0.34, 2.48, -0.04);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.32, 0.64), hairMat);
    sideR.position.set(0.34, 2.48, -0.04);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.14), hairMat);
    back.position.set(0, 2.46, -0.31);
    const frontStrand = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.16), hairMat);
    frontStrand.position.set(-0.05, 2.67, 0.29);
    const wisp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.14), hairMat);
    wisp.position.set(0.16, 2.8, 0.06);
    wisp.rotation.z = -0.28;
    npc.add(topHair, sideL, sideR, back, frontStrand, wisp);
  } else if (hairStyle === "long") {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.74), hairMat);
    top.position.set(0, 2.66, -0.02);
    const backLong = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.05, 0.18), hairMat);
    backLong.position.set(0, 2.15, -0.32);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.32), hairMat);
    sideL.position.set(-0.34, 2.18, -0.08);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.32), hairMat);
    sideR.position.set(0.34, 2.18, -0.08);
    npc.add(top, backLong, sideL, sideR);
  } else {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.7), hairMat);
    top.position.set(0, 2.65, -0.02);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.32, 0.14), hairMat);
    back.position.set(0, 2.44, -0.29);
    npc.add(top, back);
  }

  const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.82, 0.24), trenchCoat ? shirtMat : skinMat);
  lArm.position.set(-0.6, 1.4, 0);
  const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.82, 0.24), trenchCoat ? shirtMat : skinMat);
  rArm.position.set(0.6, 1.4, 0);
  npc.add(lArm, rArm);

  const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), pantsMat);
  lLeg.position.set(-0.22, 0.44, 0);
  const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), pantsMat);
  rLeg.position.set(0.22, 0.44, 0);
  npc.add(lLeg, rLeg);

  const lShoe = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.44), shoeMat);
  lShoe.position.set(-0.22, 0.09, 0.06);
  const rShoe = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.44), shoeMat);
  rShoe.position.set(0.22, 0.09, 0.06);
  npc.add(lShoe, rShoe);

  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.58),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(name, roleSub, "#0f172a", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  tag.position.set(0, 3.38, 0);
  npc.add(tag);

  return npc;
}

// 4. PÁTIO EXTERNO DA ETEC DE CAMPO LIMPO PAULISTA & ESTAÇÃO BOTUJURU
function buildEtecCampus() {
  const yardMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 });
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4b8b3b, roughness: 0.95 });
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
  const cpsRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.55 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.4 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4, roughness: 0.2 });

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(110, 110), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  etecGroup.add(ground);

  const patio = new THREE.Mesh(new THREE.BoxGeometry(27, 0.12, 21), yardMat);
  patio.position.set(3.5, 0.06, 2);
  patio.receiveShadow = true;
  etecGroup.add(patio);

  // Quadra Poliesportiva Coberta da ETEC (right side)
  const court = new THREE.Mesh(
    new THREE.PlaneGeometry(10.5, 14),
    new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 })
  );
  court.rotation.x = -Math.PI / 2;
  court.position.set(12.2, 0.14, 3.8);
  etecGroup.add(court);

  const courtRoof = new THREE.Mesh(
    new THREE.BoxGeometry(11.0, 0.25, 14.4),
    new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.55 })
  );
  courtRoof.position.set(12.2, 5.2, 3.8);
  courtRoof.castShadow = true;
  etecGroup.add(courtRoof);

  // Main ETEC Building (Prédio Centro Paula Souza — Rua João Julião Moreira, Botujuru)
  const schoolBody = new THREE.Mesh(new THREE.BoxGeometry(22, 6.8, 8.2), buildingMat);
  schoolBody.position.set(2.5, 3.4, -9.5);
  schoolBody.castShadow = true;
  schoolBody.receiveShadow = true;
  etecGroup.add(schoolBody);
  addObstacleBox(2.5, -9.4, 22.2, 8.2, etecObstacles);

  const redBandTop = new THREE.Mesh(new THREE.BoxGeometry(22.4, 0.9, 8.4), cpsRedMat);
  redBandTop.position.set(2.5, 6.3, -9.5);
  etecGroup.add(redBandTop);

  const entranceAwning = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.32, 3.0), cpsRedMat);
  entranceAwning.position.set(2.5, 3.4, -4.4);
  etecGroup.add(entranceAwning);

  const schoolDoor = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 2.85, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.45 })
  );
  schoolDoor.position.set(2.5, 1.42, -5.36);
  etecGroup.add(schoolDoor);

  const doorSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.78, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ENTRAR NA ETEC", "Corredor, Labs, Salas & Cantina", "#7f1d1d", "#fef08a"),
    })
  );
  doorSign.position.set(2.5, 3.1, -5.28);
  etecGroup.add(doorSign);

  [-6.5, -2.5, 6.8, 10.8].forEach((wx) => {
    [1.9, 4.4].forEach((wy) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.35, 0.15), glassMat);
      win.position.set(wx, wy, -5.38);
      etecGroup.add(win);
    });
  });

  const etecBanner = new THREE.Mesh(
    new THREE.BoxGeometry(9.2, 1.4, 0.18),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(
        "ETEC DE CAMPO LIMPO PAULISTA",
        "Centro Paula Souza • Rua João Julião Moreira - Botujuru",
        "#991b1b",
        "#ffffff"
      ),
    })
  );
  etecBanner.position.set(2.5, 4.85, -5.28);
  etecGroup.add(etecBanner);

  // Estação Botujuru (Linha 7-Rubi) on the left with characteristic sloped ramp!
  const botPlatform = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.9, 24), yardMat);
  botPlatform.position.set(-13.5, 0.45, 0);
  etecGroup.add(botPlatform);
  addObstacleBox(-14.5, 0, 3.2, 24, etecObstacles);
  addObstacleBox(-11.0, -5.8, 0.6, 12.0, etecObstacles);
  addObstacleBox(-11.0, 7.8, 0.6, 8.0, etecObstacles);

  const ramp = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.25, 3.6), yardMat);
  ramp.position.set(-9.2, 0.48, 2);
  ramp.rotation.z = 0.18;
  etecGroup.add(ramp);

  const botTotem = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1.2, 5.6),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTAÇÃO BOTUJURU", "Linha 7-Rubi • Volta Terminal", "#881337", "#ffffff"),
    })
  );
  botTotem.position.set(-12.2, 3.2, 2);
  botTotem.rotation.y = Math.PI / 2;
  etecGroup.add(botTotem);

  const botRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.22, 18), steelMat);
  botRoof.position.set(-13.5, 4.3, 0);
  etecGroup.add(botRoof);

  const trainBot = createTrain7RubiModel("7-RUBI • TERMINAL CLP");
  trainBot.position.set(-18.2, 0.1, 0);
  etecGroup.add(trainBot);
}
buildEtecCampus();

// 5. INTERIOR GRANDE DA ETEC DE CAMPO LIMPO PAULISTA (32m x 26m — 5 Ambientes Completos!)
function buildEtecInside() {
  const tileTex = createTileFloorTexture("#e2e8f0", "#cbd5e1", 20);
  const floorMat = new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.65 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
  const cpsRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.55 });
  const deskWood = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
  const labGranite = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45 });
  const lockerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.5 });

  // Indoor School Lights
  [
    [-8, 5.5, -6],
    [8, 5.5, -6],
    [-8, 5.5, 6],
    [8, 5.5, 6],
  ].forEach(([lx, ly, lz]) => {
    const pt = new THREE.PointLight(0xffffff, 0.48, 28);
    pt.position.set(lx, ly, lz);
    etecInsideGroup.add(pt);
  });

  // Large School Floor (32m wide x 26m deep: x = -16..16, z = -13..13)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.24, 26.4), floorMat);
  floor.position.y = -0.12;
  floor.receiveShadow = true;
  etecInsideGroup.add(floor);

  // Outer Perimeter Walls (Back, Left, Right)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(32.4, 4.8, 0.3), wallMat);
  backWall.position.set(0, 2.4, -13.1);
  etecInsideGroup.add(backWall);

  const redStripeBack = new THREE.Mesh(new THREE.BoxGeometry(32.2, 0.5, 0.34), cpsRedMat);
  redStripeBack.position.set(0, 4.1, -13.08);
  etecInsideGroup.add(redStripeBack);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 26.4), wallMat);
  leftWall.position.set(-16.1, 2.4, 0);
  etecInsideGroup.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 26.4), wallMat);
  rightWall.position.set(16.1, 2.4, 0);
  etecInsideGroup.add(rightWall);

  // Interior Partition Walls with Wide Doorways (Central Corridor is x = -4.2 .. +4.2)
  function addInteriorWall(cx, cz, w, d) {
    const wMesh = new THREE.Mesh(new THREE.BoxGeometry(w, 3.8, d), wallMat);
    wMesh.position.set(cx, 1.9, cz);
    wMesh.castShadow = true;
    wMesh.receiveShadow = true;
    etecInsideGroup.add(wMesh);
    addObstacleBox(cx, cz, w, d, etecInsideObstacles);
  }

  // Left corridor wall segments (x = -4.2) with doorways at z = -6.5 and z = +5.5
  addInteriorWall(-4.2, -10.8, 0.28, 4.4); // z: -13 to -8.6
  addInteriorWall(-4.2, -2.0, 0.28, 5.2); // z: -4.6 to +0.6
  addInteriorWall(-4.2, 2.2, 0.28, 3.2); // z: +0.6 to +3.8
  addInteriorWall(-4.2, 10.1, 0.28, 5.8); // z: +7.2 to +13

  // Right corridor wall segments (x = +4.2) with doorways at z = -6.5 and z = +5.5
  addInteriorWall(4.2, -10.8, 0.28, 4.4);
  addInteriorWall(4.2, -2.0, 0.28, 5.2);
  addInteriorWall(4.2, 2.2, 0.28, 3.2);
  addInteriorWall(4.2, 10.1, 0.28, 5.8);

  // Horizontal room dividers (z = 0) separating North labs from South rooms
  addInteriorWall(-10.1, 0, 11.6, 0.28); // separates Lab Info (NW) from Sala de Aula (SW)
  addInteriorWall(10.1, 0, 11.6, 0.28); // separates Lab Química (NE) from Cantina (SE)

  // --- ALA NOROESTE (NW): LABORATÓRIO DE INFORMÁTICA / M-TEC (Muzzonline) ---
  const infoSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.8, 1.5, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("LAB. DE INFORMÁTICA • ETEC", "Desenvolvimento de Sistemas & Info", "#1e3a8a", "#38bdf8"),
    })
  );
  infoSign.position.set(-10.2, 2.7, -12.88);
  etecInsideGroup.add(infoSign);

  // Computer Lab Benches + PCs
  [-12.5, -8.2].forEach((bx) => {
    const pcDesk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 5.2), labGranite);
    pcDesk.position.set(bx, 0.45, -7.2);
    pcDesk.castShadow = true;
    etecInsideGroup.add(pcDesk);
    addObstacleBox(bx, -7.2, 2.3, 5.3, etecInsideObstacles);

    [-8.8, -7.2, -5.6].forEach((mz) => {
      const monitor = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.52, 0.78),
        new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.6 })
      );
      monitor.position.set(bx + 0.3, 1.22, mz);
      etecInsideGroup.add(monitor);
    });
  });

  // --- ALA NORDESTE (NE): LABORATÓRIO DE QUÍMICA & CIÊNCIAS (Kaio Wendell + Bancada NPK) ---
  const chemBoard = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, 1.65, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("LABORATÓRIO DE QUÍMICA • ETEC", "Estequiometria • pH • Síntese NPK", "#14532d", "#fef08a"),
    })
  );
  chemBoard.position.set(10.2, 2.7, -12.88);
  etecInsideGroup.add(chemBoard);

  // Main Chemistry Experimental Bench (Interactable!) at (10.2, 0, -9.2)
  const chemBench = new THREE.Mesh(new THREE.BoxGeometry(5.6, 1.05, 1.6), labGranite);
  chemBench.position.set(10.2, 0.525, -9.2);
  chemBench.castShadow = true;
  etecInsideGroup.add(chemBench);
  addObstacleBox(10.2, -9.2, 5.7, 1.7, etecInsideObstacles);

  [
    [8.2, 0x38bdf8],
    [9.2, 0x4ade80],
    [10.2, 0xec4899],
    [11.2, 0xa855f7],
    [12.2, 0xfacc15],
  ].forEach(([fx, col]) => {
    const flask = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.22, 0.48, 12),
      new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.35 })
    );
    flask.position.set(fx, 1.28, -9.2);
    etecInsideGroup.add(flask);
  });

  const chemBenchSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.62, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BANCADA QUÍMICA NPK", "Espaço / E: Sintetizar Adubo", "#0f172a", "#38bdf8"),
    })
  );
  chemBenchSign.position.set(10.2, 1.85, -8.4);
  etecInsideGroup.add(chemBenchSign);

  // --- ALA SUDOESTE (SW): SALA DE AULA (Ensino Médio / M-Tec) ---
  const classBoard = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 1.5, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SALA DE AULA • M-TEC ETEC", "Administração, Logística & Química", "#14532d", "#ffffff"),
    })
  );
  classBoard.position.set(-10.2, 2.5, 0.22);
  etecInsideGroup.add(classBoard);

  [
    [-12.8, 3.8],
    [-9.8, 3.8],
    [-12.8, 7.2],
    [-9.8, 7.2],
  ].forEach(([dx, dz]) => {
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.82, 1.1), deskWood);
    desk.position.set(dx, 0.41, dz);
    desk.castShadow = true;
    etecInsideGroup.add(desk);
    addObstacleBox(dx, dz, 1.8, 1.2, etecInsideObstacles);
  });

  // --- ALA SUDESTE (SE): CANTINA & REFEITÓRIO DA ETEC (Félix & Pão) ---
  const cantinaSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 1.4, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CANTINA & REFEITÓRIO ETEC", "Salgados, Lanches & Resenha", "#991b1b", "#fef08a"),
    })
  );
  cantinaSign.position.set(10.2, 2.6, 0.22);
  etecInsideGroup.add(cantinaSign);

  const cantinaCounter = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.1, 1.4), cpsRedMat);
  cantinaCounter.position.set(11.8, 0.55, 2.4);
  cantinaCounter.castShadow = true;
  etecInsideGroup.add(cantinaCounter);
  addObstacleBox(11.8, 2.4, 4.7, 1.5, etecInsideObstacles);

  const cantinaTable = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.85, 1.6), deskWood);
  cantinaTable.position.set(9.2, 0.425, 8.8);
  cantinaTable.castShadow = true;
  etecInsideGroup.add(cantinaTable);
  addObstacleBox(9.2, 8.8, 3.5, 1.7, etecInsideObstacles);

  // --- CORREDOR CENTRAL: Lockers, CPS Mural & Exit Door ---
  const cpsCenterSign = new THREE.Mesh(
    new THREE.BoxGeometry(6.6, 1.5, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ETEC DE CAMPO LIMPO PAULISTA", "Corredor Principal • Centro Paula Souza", "#7f1d1d", "#ffffff"),
    })
  );
  cpsCenterSign.position.set(0, 2.75, -12.88);
  etecInsideGroup.add(cpsCenterSign);

  // School Lockers along corridor wall
  const lockers = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2.3, 4.2), lockerMat);
  lockers.position.set(-3.65, 1.15, -2.0);
  lockers.castShadow = true;
  etecInsideGroup.add(lockers);
  addObstacleBox(-3.65, -2.0, 0.75, 4.3, etecInsideObstacles);

  // Exit Doormat at (0, 0, 11.4)
  const exitMat = new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.05, 1.3),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.85 })
  );
  exitMat.position.set(0, 0.025, 11.4);
  etecInsideGroup.add(exitMat);

  const exitBoard = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.72, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SAIR P/ O PÁTIO EXTERNO", "Rumo à Estação Botujuru", "#7f1d1d", "#fef08a"),
    })
  );
  exitBoard.position.set(0, 0.62, 12.35);
  etecInsideGroup.add(exitBoard);

  // Spawn the 4 memorable ETEC NPCs inside their respective rooms!
  const npcSpecs = [
    {
      id: "muzzonline",
      name: "Muzzonline",
      roleSub: "Lab Info • +Insanidade",
      pos: new THREE.Vector3(-6.0, 0, -4.5), // Inside Computer Lab (NW)
      yaw: 0.45,
      skinColor: 0xf3d2b8,
      shirtColor: 0x9ca3af, // Blusa cinza
      pantsColor: 0x6b7280, // Calça cinza
      shoeColor: 0xdc2626, // Tênis vermelho
      hairStyle: "messy",
      hairColor: 0x261c15,
      redGlasses: true,
    },
    {
      id: "kaio",
      name: "Kaio Wendell",
      roleSub: "Química • +Insanidade",
      pos: new THREE.Vector3(7.2, 0, -5.8), // Inside Chemistry Lab (NE)
      yaw: -0.35,
      skinColor: 0xf3d2b8,
      shirtColor: 0x1e293b, // Sobretudo estiloso
      pantsColor: 0x334155, // Calça social
      shoeColor: 0x09090b, // Sapato social estiloso
      hairStyle: "sparse", // Com cabelo visível!
      hairColor: 0x292524,
      trenchCoat: true,
    },
    {
      id: "felix",
      name: "Félix",
      roleSub: "Missões: PAC / Guloso",
      pos: new THREE.Vector3(6.8, 0, 5.2), // Inside Cantina (SE)
      yaw: -0.25,
      skinColor: 0xf3d2b8,
      shirtColor: 0x111827, // Blusa de frio preta
      pantsColor: 0x1e293b,
      shoeColor: 0x27272a,
      hairStyle: "long", // Cabelo grande
      hairColor: 0x1c140d,
    },
    {
      id: "pao",
      name: "Pão",
      roleSub: "Missões: Airfryer / Macho",
      pos: new THREE.Vector3(12.2, 0, 6.2), // Inside Cantina (SE)
      yaw: -0.55,
      skinColor: 0x8d5524, // Moreno
      shirtColor: 0xdc2626, // Camisa vermelha da ETEC
      pantsColor: 0x1d4ed8, // Calça jeans
      shoeColor: 0xf8fafc,
      hairStyle: "short",
      hairColor: 0x171717,
      etecBadge: true,
    },
  ];

  npcSpecs.forEach((spec) => {
    const mesh = createNpcModel(spec);
    mesh.position.copy(spec.pos);
    mesh.rotation.y = spec.yaw;
    etecInsideGroup.add(mesh);
    addObstacleBox(spec.pos.x, spec.pos.z, 1.15, 1.15, etecInsideObstacles);
    etecNpcs.push({ id: spec.id, name: spec.name, pos: spec.pos, mesh });
  });
}
buildEtecInside();

// Rain Particle System (follows player XZ so rain covers any outdoor location!)
function buildRainSystem() {
  const dropGeo = new THREE.BoxGeometry(0.04, 0.7, 0.04);
  const dropMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 200; i++) {
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.position.set((Math.random() - 0.5) * 44, Math.random() * 20 + 1, (Math.random() - 0.5) * 44);
    rainGroup.add(drop);
    rainDrops.push(drop);
  }
}
buildRainSystem();

// Alyffer "Macho" 3D Character Model
function createMachoPlayerModel() {
  const group = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xc98a63, roughness: 0.65 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x161412, roughness: 0.85 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1f4e2e, roughness: 0.7 });
  const pocketMat = new THREE.MeshStandardMaterial({ color: 0x14331e, roughness: 0.75 });
  const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.8 });
  const bootsMat = new THREE.MeshStandardMaterial({ color: 0x4a2c16, roughness: 0.85 });
  const strawMat = new THREE.MeshStandardMaterial({ color: 0xe9c46a, roughness: 0.85 });
  const hatBandMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.7 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.12, 0.52), shirtMat);
  torso.position.y = 1.4;
  torso.castShadow = true;
  group.add(torso);

  const chestDetail = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.04), pocketMat);
  chestDetail.position.set(0.22, 1.56, 0.27);
  group.add(chestDetail);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), skinMat);
  head.position.y = 2.34;
  head.castShadow = true;
  group.add(head);

  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.36, 0.16), hairMat);
  hairBack.position.set(0, 2.42, -0.3);
  group.add(hairBack);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  leftEye.position.set(-0.14, 2.38, 0.34);
  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  rightEye.position.set(0.14, 2.38, 0.34);
  group.add(leftEye, rightEye);

  const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.88, 0.08, 16), strawMat);
  hatBrim.position.y = 2.7;
  hatBrim.castShadow = true;
  group.add(hatBrim);

  const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.44, 0.36, 14), strawMat);
  hatCrown.position.y = 2.91;
  hatCrown.castShadow = true;
  group.add(hatCrown);

  const hatBand = new THREE.Mesh(new THREE.CylinderGeometry(0.445, 0.45, 0.09, 14), hatBandMat);
  hatBand.position.y = 2.77;
  group.add(hatBand);

  const armGeo = new THREE.BoxGeometry(0.26, 0.84, 0.26);
  const leftArm = new THREE.Mesh(armGeo, skinMat);
  leftArm.position.set(-0.62, 1.4, 0);
  leftArm.castShadow = true;
  group.add(leftArm);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.62, 1.72, 0);
  const rightArmMesh = new THREE.Mesh(armGeo, skinMat);
  rightArmMesh.position.set(0, -0.32, 0);
  rightArmMesh.castShadow = true;
  rightArmGroup.add(rightArmMesh);

  const canGroup = new THREE.Group();
  canGroup.position.set(0, -0.72, 0.26);
  const canBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.19, 0.34, 10),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.35, roughness: 0.4 })
  );
  canGroup.add(canBody);
  const canSpout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.06, 0.34, 8),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4 })
  );
  canSpout.position.set(0, 0.08, 0.22);
  canSpout.rotation.x = 0.85;
  canGroup.add(canSpout);
  rightArmGroup.add(canGroup);

  group.add(rightArmGroup);

  const legGeo = new THREE.BoxGeometry(0.32, 0.8, 0.32);
  const leftLeg = new THREE.Mesh(legGeo, jeansMat);
  leftLeg.position.set(-0.23, 0.44, 0);
  leftLeg.castShadow = true;
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, jeansMat);
  rightLeg.position.set(0.23, 0.44, 0);
  rightLeg.castShadow = true;
  group.add(rightLeg);

  const bootGeo = new THREE.BoxGeometry(0.35, 0.2, 0.44);
  const leftBoot = new THREE.Mesh(bootGeo, bootsMat);
  leftBoot.position.set(-0.23, 0.1, 0.05);
  group.add(leftBoot);

  const rightBoot = new THREE.Mesh(bootGeo, bootsMat);
  rightBoot.position.set(0.23, 0.1, 0.05);
  group.add(rightBoot);

  group.userData = {
    leftArm,
    rightArm: rightArmGroup,
    leftLeg,
    rightLeg,
    leftBoot,
    rightBoot,
    canGroup,
  };
  return group;
}

const playerMesh = createMachoPlayerModel();
scene.add(playerMesh);

// Optimized Shared Geometry & Material Cache for Garden Plots
const plots = [];
const plotHitMeshes = [];

const SOIL_COLORS = {
  raw: 0x6b7f3e,
  tilled: 0x7c5333,
  watered: 0x422817,
};

const SHARED_GEOS = {
  sproutLeaf: new THREE.BoxGeometry(0.14, 0.16, 0.06),
  lettuceCore2: new THREE.DodecahedronGeometry(0.15, 1),
  lettuceCore3: new THREE.DodecahedronGeometry(0.24, 1),
  lettuceLeaf2: new THREE.BoxGeometry(0.16, 0.18, 0.05),
  lettuceLeaf3: new THREE.BoxGeometry(0.26, 0.28, 0.08),
  stem2: new THREE.CylinderGeometry(0.03, 0.04, 0.48, 6),
  stem3: new THREE.CylinderGeometry(0.04, 0.05, 0.75, 6),
  bush2: new THREE.DodecahedronGeometry(0.18, 1),
  bush3: new THREE.DodecahedronGeometry(0.28, 1),
  berry: new THREE.SphereGeometry(0.085, 8, 8),
  frond2: new THREE.ConeGeometry(0.06, 0.25, 5),
  frond3: new THREE.ConeGeometry(0.09, 0.38, 5),
  carrotRoot: new THREE.ConeGeometry(0.11, 0.22, 8),
};

const SHARED_MATS = {};
function getCachedMat(colorHex, roughness = 0.7) {
  const key = `${colorHex}_${roughness}`;
  if (!SHARED_MATS[key]) {
    SHARED_MATS[key] = new THREE.MeshStandardMaterial({ color: colorHex, roughness });
  }
  return SHARED_MATS[key];
}

function createPlotMesh(index, x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x7a4e2a, roughness: 0.85 });
  const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.24, 2.55), woodMat);
  frameOuter.position.y = 0.12;
  frameOuter.castShadow = true;
  frameOuter.receiveShadow = true;
  group.add(frameOuter);

  const soilMat = new THREE.MeshStandardMaterial({ color: SOIL_COLORS.raw, roughness: 0.95 });
  const soilMesh = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.26, 2.25), soilMat);
  soilMesh.position.y = 0.13;
  soilMesh.receiveShadow = true;
  group.add(soilMesh);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.45, 1.62, 4),
    new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.rotation.z = Math.PI / 4;
  ring.position.y = 0.06;
  ring.visible = false;
  group.add(ring);

  const lockGroup = new THREE.Group();
  const stake = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.18), woodMat);
  stake.position.y = 0.45;
  lockGroup.add(stake);
  const lockPlate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.1), getCachedMat(0x9ca3af, 0.8));
  lockPlate.position.y = 0.78;
  lockGroup.add(lockPlate);
  group.add(lockGroup);

  const cropGroup = new THREE.Group();
  cropGroup.position.y = 0.26;
  group.add(cropGroup);

  const readyHalo = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.2, 0),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 })
  );
  readyHalo.position.y = 1.45;
  readyHalo.visible = false;
  group.add(readyHalo);

  exteriorGroup.add(group);
  soilMesh.userData.plotIndex = index;
  frameOuter.userData.plotIndex = index;
  plotHitMeshes.push(soilMesh, frameOuter);

  return {
    index,
    x,
    z,
    group,
    frameOuter,
    soilMesh,
    soilMat,
    ring,
    lockGroup,
    cropGroup,
    readyHalo,
    unlocked: index < 6,
    stage: "raw",
    cropId: null,
    growth: 0,
    waterTimer: 0,
    visualStage: -1,
    visualCropId: null,
  };
}

for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 4; c++) {
    const idx = r * 4 + c;
    const px = -7.8 + c * 3.1;
    const pz = -2.4 + r * 3.1;
    plots.push(createPlotMesh(idx, px, pz));
  }
}

function buildCropVisual(plot) {
  while (plot.cropGroup.children.length > 0) {
    plot.cropGroup.remove(plot.cropGroup.children[0]);
  }
  if (!plot.cropId || (plot.stage !== "growing" && plot.stage !== "ready")) {
    plot.visualStage = -1;
    plot.visualCropId = null;
    return;
  }

  const crop = CROPS[plot.cropId];
  const stageLevel = plot.stage === "ready" ? 3 : plot.growth > 0.55 ? 2 : 1;
  plot.visualStage = stageLevel;
  plot.visualCropId = plot.cropId;

  const offsets = [
    [-0.5, -0.5],
    [0.5, -0.5],
    [-0.5, 0.5],
    [0.5, 0.5],
  ];

  offsets.forEach(([ox, oz]) => {
    const plant = new THREE.Group();
    plant.position.set(ox, 0, oz);

    if (stageLevel === 1) {
      const leafMat = getCachedMat(0x86efac, 0.7);
      const l1 = new THREE.Mesh(SHARED_GEOS.sproutLeaf, leafMat);
      l1.position.set(-0.06, 0.08, 0);
      l1.rotation.z = 0.4;
      const l2 = new THREE.Mesh(SHARED_GEOS.sproutLeaf, leafMat);
      l2.position.set(0.06, 0.08, 0);
      l2.rotation.z = -0.4;
      plant.add(l1, l2);
    } else if (crop.style.startsWith("lettuce")) {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.62;
      const outerMat = getCachedMat(crop.leafColor, 0.72);
      const innerMat = getCachedMat(crop.color, 0.65);

      const core = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceCore3 : SHARED_GEOS.lettuceCore2, innerMat);
      core.position.y = 0.22 * scale;
      core.castShadow = true;
      plant.add(core);

      const leafCount = crop.style === "lettuce_round" ? 5 : 6;
      for (let k = 0; k < leafCount; k++) {
        const ang = (k / leafCount) * Math.PI * 2;
        const leaf = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceLeaf3 : SHARED_GEOS.lettuceLeaf2, outerMat);
        leaf.position.set(Math.cos(ang) * 0.2 * scale, 0.18 * scale, Math.sin(ang) * 0.2 * scale);
        leaf.rotation.y = -ang + Math.PI / 2;
        leaf.rotation.x = crop.style === "lettuce_round" ? 0.28 : 0.55;
        leaf.castShadow = true;
        plant.add(leaf);
      }
    } else if (crop.style === "tomato" || crop.style === "strawberry") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.65;
      const stem = new THREE.Mesh(isFull ? SHARED_GEOS.stem3 : SHARED_GEOS.stem2, getCachedMat(0x15803d, 0.8));
      stem.position.y = 0.32 * scale;
      plant.add(stem);

      const bush = new THREE.Mesh(isFull ? SHARED_GEOS.bush3 : SHARED_GEOS.bush2, getCachedMat(crop.leafColor, 0.8));
      bush.position.y = 0.44 * scale;
      bush.castShadow = true;
      plant.add(bush);

      if (isFull) {
        const fruitMat = getCachedMat(crop.color, 0.35);
        [
          [0.18, 0.38, 0.14],
          [-0.17, 0.5, 0.1],
          [0.05, 0.42, -0.2],
        ].forEach(([tx, ty, tz]) => {
          const fruit = new THREE.Mesh(SHARED_GEOS.berry, fruitMat);
          fruit.position.set(tx, ty, tz);
          plant.add(fruit);
        });
      }
    } else if (crop.style === "carrot") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.65;
      const topMat = getCachedMat(crop.leafColor, 0.8);
      for (let k = 0; k < 3; k++) {
        const frond = new THREE.Mesh(isFull ? SHARED_GEOS.frond3 : SHARED_GEOS.frond2, topMat);
        frond.position.set((k - 1) * 0.07, 0.22 * scale, 0);
        frond.rotation.z = (k - 1) * 0.25;
        plant.add(frond);
      }
      if (isFull) {
        const root = new THREE.Mesh(SHARED_GEOS.carrotRoot, getCachedMat(crop.color, 0.6));
        root.rotation.x = Math.PI;
        root.position.y = 0.07;
        plant.add(root);
      }
    }

    plot.cropGroup.add(plant);
  });
}

function refreshPlotAppearance(plot) {
  plot.lockGroup.visible = !plot.unlocked;
  plot.frameOuter.material.color.setHex(plot.unlocked ? 0x7a4e2a : 0x4b5563);

  if (!plot.unlocked) {
    plot.soilMat.color.setHex(0x4a5543);
  } else if (plot.stage === "raw") {
    plot.soilMat.color.setHex(SOIL_COLORS.raw);
  } else if (plot.waterTimer > 0) {
    plot.soilMat.color.setHex(SOIL_COLORS.watered);
  } else {
    plot.soilMat.color.setHex(SOIL_COLORS.tilled);
  }

  plot.readyHalo.visible = plot.unlocked && plot.stage === "ready";

  const desiredStage = !plot.unlocked
    ? -1
    : plot.stage === "ready"
    ? 3
    : plot.stage === "growing"
    ? plot.growth > 0.55
      ? 2
      : 1
    : -1;

  if (desiredStage !== plot.visualStage || plot.cropId !== plot.visualCropId) {
    buildCropVisual(plot);
  }
}

// Pooled Particle System for Zero-GC Smoothness
const PARTICLE_POOL_SIZE = 60;
const particlePool = [];
const particleGeo = new THREE.BoxGeometry(0.13, 0.13, 0.13);
for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
  const mat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 1 });
  const mesh = new THREE.Mesh(particleGeo, mat);
  mesh.visible = false;
  scene.add(mesh);
  particlePool.push({
    mesh,
    vel: new THREE.Vector3(),
    life: 0,
    maxLife: 0.75,
    active: false,
  });
}

function spawnParticles(pos, color = 0x4ade80, count = 10) {
  let spawned = 0;
  for (let i = 0; i < PARTICLE_POOL_SIZE && spawned < count; i++) {
    const pt = particlePool[i];
    if (!pt.active) {
      pt.active = true;
      pt.mesh.visible = true;
      pt.mesh.material.color.setHex(color);
      pt.mesh.material.opacity = 1;
      pt.mesh.scale.setScalar(1);
      pt.mesh.position.copy(pos);
      pt.vel.set((Math.random() - 0.5) * 4.5, Math.random() * 4 + 1.5, (Math.random() - 0.5) * 4.5);
      pt.life = 0.5 + Math.random() * 0.25;
      pt.maxLife = 0.75;
      spawned++;
    }
  }
}

// Game State
const state = {
  mode: "start", // start | playing | paused | modal
  location: "yard", // yard | room | terminal | etec | etec_inside
  money: 30,
  day: 1,
  dayMinutes: 7 * 60, // 07:00
  isRainy: false,
  reputation: 1,
  insanity: 0,
  isCrazy: false,
  visitedEtecToday: false,
  coringaTimer: 0,
  currentCoringaLine: "",
  energyTimer: 0, // Speed boost from Pastel/Caldo de Cana or Coffee
  npkDoneToday: false,
  compostDoneToday: false,
  coopEggs: 2, // Fresh eggs ready in the chicken coop
  felixStep: 0,
  paoStep: 0,
  titles: ["Estudante ETEC"],
  activeTitle: "Estudante ETEC",
  selectedCrop: "alface_crespa",
  water: 8,
  upgrades: {
    plotTier: 0,
    canLevel: 1,
    fertLevel: 1,
    standLevel: 1,
  },
  inventory: {
    alface_crespa: 0,
    alface_americana: 0,
    alface_roxa: 0,
    tomate: 0,
    cenoura: 0,
    morango: 0,
    ovo_caipira: 0,
  },
  dailyMult: {},
  hotCropId: "alface_crespa",
  orders: [],
  camYaw: 0.2,
  camPitch: 0.48,
  camDist: 16.5,
  animTime: 0,
  swingTimer: 0,
};

const player = {
  pos: new THREE.Vector3(0, 0, -6.5),
  facingYaw: 0,
  radius: 0.45,
};

function getMaxWater() {
  return [8, 12, 18, 25][state.upgrades.canLevel - 1] || 25;
}

function getGrowthMultiplier() {
  return 1 + (state.upgrades.fertLevel - 1) * 0.28;
}

function getDoubleHarvestChance() {
  return (state.upgrades.fertLevel - 1) * 0.16;
}

function getSellPriceMultiplier() {
  return 1 + (state.upgrades.standLevel - 1) * 0.16;
}

function getTotalBasketCount() {
  return CROP_KEYS.reduce((sum, id) => sum + (state.inventory[id] || 0), 0);
}

function syncCoopEggsVisual() {
  coopEggVisuals.forEach((mesh, idx) => {
    mesh.visible = idx < state.coopEggs;
  });
}

function rollDailyMarket() {
  CROP_KEYS.forEach((id) => {
    state.dailyMult[id] = 0.92 + Math.random() * 0.28;
  });
  const pool = ["alface_crespa", "alface_americana", "alface_roxa", "alface_crespa", "tomate", "cenoura", "morango"];
  state.hotCropId = pool[Math.floor(Math.random() * pool.length)];
  state.dailyMult[state.hotCropId] = 1.4;
}

function generateCityOrders() {
  const buyers = [
    "Feira de Campo Limpo Paulista",
    "Cantina da ETEC (CLP)",
    "Sacolão Centro de Campo Limpo",
    "Mercadinho de Pau Arcado",
    "Restaurante Av. Alfried Krupp",
  ];
  const orderPool = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango"];
  const orders = [];
  for (let i = 0; i < 3; i++) {
    const cropId = i === 0 ? "alface_crespa" : orderPool[Math.floor(Math.random() * orderPool.length)];
    const qty = 2 + Math.floor(Math.random() * 3) + Math.min(3, Math.floor(state.reputation / 2));
    const crop = CROPS[cropId];
    const bonusReward = Math.round(qty * crop.basePrice * 1.48 * getSellPriceMultiplier());
    orders.push({
      id: `${Date.now()}_${i}`,
      buyer: buyers[(i + state.day + Math.floor(Math.random() * 3)) % buyers.length],
      cropId,
      qty,
      reward: bonusReward,
      completed: false,
    });
  }
  state.orders = orders;
}

function getUnlockedPlotCount() {
  return Math.min(16, 6 + state.upgrades.plotTier * 2);
}

function syncUnlockedPlots() {
  const count = getUnlockedPlotCount();
  plots.forEach((p, idx) => {
    p.unlocked = idx < count;
    refreshPlotAppearance(p);
  });
}

// Persistence
function saveGame() {
  try {
    const data = {
      money: state.money,
      day: state.day,
      isRainy: state.isRainy,
      reputation: state.reputation,
      insanity: state.insanity,
      isCrazy: state.isCrazy,
      visitedEtecToday: state.visitedEtecToday,
      coopEggs: state.coopEggs,
      npkDoneToday: state.npkDoneToday,
      compostDoneToday: state.compostDoneToday,
      felixStep: state.felixStep,
      paoStep: state.paoStep,
      titles: state.titles,
      activeTitle: state.activeTitle,
      upgrades: state.upgrades,
      inventory: state.inventory,
      plots: plots.map((p) => ({
        stage: p.stage,
        cropId: p.cropId,
        growth: p.growth,
        waterTimer: p.waterTimer,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // ignore storage errors
  }
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (typeof data.money === "number") state.money = data.money;
    if (typeof data.day === "number") state.day = data.day;
    if (typeof data.isRainy === "boolean") state.isRainy = data.isRainy;
    if (typeof data.reputation === "number") state.reputation = data.reputation;
    if (typeof data.insanity === "number") state.insanity = data.insanity;
    state.isCrazy = state.insanity >= 100;
    if (typeof data.visitedEtecToday === "boolean") state.visitedEtecToday = data.visitedEtecToday;
    if (typeof data.coopEggs === "number") state.coopEggs = data.coopEggs;
    if (typeof data.npkDoneToday === "boolean") state.npkDoneToday = data.npkDoneToday;
    if (typeof data.compostDoneToday === "boolean") state.compostDoneToday = data.compostDoneToday;
    if (typeof data.felixStep === "number") state.felixStep = data.felixStep;
    if (typeof data.paoStep === "number") state.paoStep = data.paoStep;
    if (Array.isArray(data.titles) && data.titles.length) state.titles = data.titles;
    if (typeof data.activeTitle === "string") state.activeTitle = data.activeTitle;
    if (data.upgrades) Object.assign(state.upgrades, data.upgrades);
    if (data.inventory) Object.assign(state.inventory, data.inventory);
    if (Array.isArray(data.plots)) {
      data.plots.forEach((sp, idx) => {
        if (plots[idx]) {
          plots[idx].stage = sp.stage || "raw";
          plots[idx].cropId = sp.cropId || null;
          plots[idx].growth = sp.growth || 0;
          plots[idx].waterTimer = sp.waterTimer || 0;
        }
      });
    }
    return true;
  } catch (_) {
    return false;
  }
}

function setActiveSceneVisibility() {
  exteriorGroup.visible = state.location === "yard";
  interiorGroup.visible = state.location === "room";
  terminalGroup.visible = state.location === "terminal";
  etecGroup.visible = state.location === "etec";
  etecInsideGroup.visible = state.location === "etec_inside";
  playerMesh.userData.canGroup.visible = state.location === "yard";
  if (bus402YardMesh) {
    bus402YardMesh.visible = !state.isRainy;
  }
  syncCoopEggsVisual();
}

function resetToNewFarm() {
  localStorage.removeItem(STORAGE_KEY);
  state.location = "yard";
  state.isRainy = false;
  state.money = 30;
  state.day = 1;
  state.dayMinutes = 7 * 60;
  state.reputation = 1;
  state.insanity = 0;
  state.isCrazy = false;
  state.visitedEtecToday = false;
  state.coringaTimer = 0;
  state.currentCoringaLine = "";
  state.energyTimer = 0;
  state.npkDoneToday = false;
  state.compostDoneToday = false;
  state.coopEggs = 2;
  state.felixStep = 0;
  state.paoStep = 0;
  state.titles = ["Estudante ETEC"];
  state.activeTitle = "Estudante ETEC";
  state.selectedCrop = "alface_crespa";
  state.upgrades = { plotTier: 0, canLevel: 1, fertLevel: 1, standLevel: 1 };
  state.water = getMaxWater();
  CROP_KEYS.forEach((k) => (state.inventory[k] = 0));
  plots.forEach((p, idx) => {
    p.stage = idx === 2 || idx === 3 ? "tilled" : "raw";
    p.cropId = null;
    p.growth = 0;
    p.waterTimer = 0;
    p.visualStage = -99;
    p.visualCropId = null;
  });
  setActiveSceneVisibility();
  syncUnlockedPlots();
  rollDailyMarket();
  generateCityOrders();
  player.pos.set(0, 0, -6.5);
  player.facingYaw = 0;
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.y = player.facingYaw;
  updateSeedHotbarUI();
  updateHUD();
}

// HUD Updates
function updateSeedHotbarUI() {
  document.querySelectorAll(".seed-slot").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.crop === state.selectedCrop);
  });
}

const LOCATION_LABELS = {
  yard: "Pau Arcado",
  room: "Quarto (Casa)",
  terminal: "Terminal CLP",
  etec: "ETEC Botujuru",
  etec_inside: "Dentro da ETEC",
};

function updateHUD() {
  state.isCrazy = state.insanity >= 100;
  titleBadge.textContent = state.isCrazy ? `🤡 CORINGANDO (${state.activeTitle})` : state.activeTitle;
  moneyVal.textContent = formatBRL(state.money);
  const hh = String(Math.floor(state.dayMinutes / 60)).padStart(2, "0");
  const mm = String(Math.floor(state.dayMinutes % 60)).padStart(2, "0");
  dayTimeVal.textContent = `Dia ${state.day} • ${hh}:${mm} ${state.isRainy ? "🌧️" : "☀️"}`;
  locationVal.textContent = LOCATION_LABELS[state.location] || "Pau Arcado";

  const totalItems = getTotalBasketCount();
  basketVal.textContent = `🥬 ${totalItems} ${totalItems === 1 ? "item" : "itens"}`;

  const maxW = getMaxWater();
  waterText.textContent = `${state.water}/${maxW}`;
  waterBar.style.width = `${Math.min(100, (state.water / maxW) * 100)}%`;

  if (insanityLabel) {
    insanityLabel.textContent = state.isCrazy
      ? "🤡 CORINGANDO!"
      : state.visitedEtecToday
        ? "SANIDADE (FOI NA ETEC)"
        : "SANIDADE / CORINGA";
  }
  insanityText.textContent = state.isCrazy ? "100% 🤡" : `${state.insanity}%`;
  insanityBar.style.width = `${Math.min(100, state.insanity)}%`;
  insanityPill.classList.toggle("crazy", state.isCrazy);

  if (coringaBubble) {
    coringaBubble.classList.toggle("hidden", !(state.isCrazy && state.mode === "playing"));
  }

  if (state.energyTimer > 0) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `⚡ Energia (${Math.ceil(state.energyTimer)}s)`;
  } else {
    buffBadge.classList.add("hidden");
  }
}

function cycleEquippedTitle() {
  if (state.titles.length <= 1) {
    showToast("🏆", "TÍTULOS DA ETEC", "Cumpra as missões do Félix e do Pão na ETEC para ganhar novos títulos!");
    return;
  }
  const idx = state.titles.indexOf(state.activeTitle);
  state.activeTitle = state.titles[(idx + 1) % state.titles.length];
  sfx.play("plant");
  showToast("🏆", "TÍTULO EQUIPADO", `Agora você exibe o título "${state.activeTitle}"!`);
  updateHUD();
  saveGame();
}

if (farmerTagPill) {
  farmerTagPill.addEventListener("click", cycleEquippedTitle);
}

function getCropSellPrice(cropId) {
  const crop = CROPS[cropId];
  const daily = state.dailyMult[cropId] || 1;
  return Math.round(crop.basePrice * daily * getSellPriceMultiplier());
}

// Interactables & Context Detection across all 5 locations
const WELL_POS = new THREE.Vector3(-14.5, 0, 2);
const COOP_POS = new THREE.Vector3(-14.5, 0, -4.0);
const COMPOST_POS = new THREE.Vector3(-14.5, 0, 8.8);
const STAND_POS = new THREE.Vector3(10.5, 0, 6.2);
const DOOR_POS = new THREE.Vector3(0, 0, -7.2);
const BUS_STOP_YARD_POS = new THREE.Vector3(10.2, 0, 17.8);

const BED_POS = new THREE.Vector3(-3.2, 0, -0.4);
const MANGA_POS = new THREE.Vector3(0, 0, -2.5);
const ETEC_POS = new THREE.Vector3(3.2, 0, -1.6);
const EXIT_POS = new THREE.Vector3(0, 0, 3.3);

const TERM_BUS_BACK_POS = new THREE.Vector3(-8.6, 0, -3.2);
const TERM_SELL_POS = new THREE.Vector3(-1.6, 0, 4.4);
const TERM_PASTEL_POS = new THREE.Vector3(-9.2, 0, 4.2);
const TERM_TRAIN_POS = new THREE.Vector3(9.4, 0, 0);

const ETEC_TRAIN_BACK_POS = new THREE.Vector3(-11.4, 0, 2.0);
const ETEC_DOOR_IN_POS = new THREE.Vector3(2.5, 0, -4.6);

const ETEC_EXIT_POS = new THREE.Vector3(0, 0, 11.2);
const CHEM_BENCH_POS = new THREE.Vector3(10.2, 0, -7.6);

function distXZ(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function getFloorYAt(x, z) {
  if (state.location === "terminal") {
    if (x >= 5.7 && x <= 11.4 && z >= -13 && z <= 11) return 0.95;
    if (x >= 3.1 && x < 5.7 && z >= -1.6 && z <= 2.6) return ((x - 3.1) / 2.6) * 0.95;
    if (x >= -14.0 && x <= 2.5 && z >= -3.5 && z <= 8.5) return 0.26;
    return 0;
  }
  if (state.location === "etec") {
    if (x >= -16.1 && x <= -10.9 && z >= -12 && z <= 12) return 0.9;
    if (x > -10.9 && x <= -7.0 && z >= 0.2 && z <= 3.8) return ((-7.0 - x) / 3.9) * 0.9;
    if (x >= -10.0 && x <= 17.0 && z >= -8.5 && z <= 12.5) return 0.12;
    return 0;
  }
  return 0;
}

function switchLocation(loc, x, z, facingYaw, camYaw, camPitch, camDist) {
  state.location = loc;
  if (loc === "etec" || loc === "etec_inside") {
    state.visitedEtecToday = true;
  }
  setActiveSceneVisibility();
  player.pos.set(x, getFloorYAt(x, z), z);
  player.facingYaw = facingYaw;
  state.camYaw = camYaw;
  state.camPitch = camPitch;
  state.camDist = camDist;
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.y = player.facingYaw;
  sfx.play("plant");
  updateSkyAndTime(0);
  updateCamera(0.016, true);
  updateHUD();
  saveGame();
  renderer.render(scene, camera);
}

function enterRoom() {
  switchLocation("room", 0, 2.2, Math.PI, 0, 0.36, 8.4);
  showToast("🏠", "QUARTO DO ALYFFER", "Mangás, pôster do PAC (TazerCraft) e material da ETEC!");
}

function exitRoom() {
  switchLocation("yard", 0, -6.5, 0, 0.2, 0.48, 16.5);
}

function takeBus402ToTerminal() {
  if (state.isRainy) {
    sfx.play("error");
    showToast("🌧️", "ÔNIBUS 402 PARADO", "Está chovendo em Pau Arcado! O 402 não passa hoje. Durma até o próximo dia.");
    return;
  }
  switchLocation("terminal", -5.8, 0.2, 0, 0.2, 0.45, 16.5);
  showDayBanner("TERMINAL DE CAMPO LIMPO PAULISTA • LINHA 402");
}

function takeBus402ToYard() {
  switchLocation("yard", 10.2, 16.0, Math.PI, 0.2, 0.48, 16.5);
  showToast("🚌", "VOLTOU PRA PAU ARCADO", "Desceu do Ônibus 402 na Estrada do Garcia!");
}

function takeTrainToEtec() {
  switchLocation("etec", -6.4, 2.0, Math.PI / 2, 0.12, 0.46, 17.5);
  showDayBanner("ETEC DE CAMPO LIMPO PAULISTA • BOTUJURU");
}

function takeTrainToTerminal() {
  switchLocation("terminal", 8.0, 0.2, -Math.PI / 2, 0.2, 0.45, 16.5);
  showToast("🚆", "LINHA 7-RUBI", "Desembarcou na Estação Campo Limpo Paulista!");
}

function enterEtecInside() {
  switchLocation("etec_inside", 0, 9.2, Math.PI, 0, 0.46, 14.5);
  showToast("🏫", "INTERIOR DA ETEC", "Corredor, Lab de Química, Lab de Info, Sala M-Tec e Cantina!");
}

function exitEtecInside() {
  switchLocation("etec", 2.5, -3.5, 0, 0.12, 0.46, 17.5);
}

function findCurrentContext() {
  plots.forEach((p) => (p.ring.visible = false));

  if (state.location === "room") {
    if (distXZ(player.pos, EXIT_POS) < 1.7) {
      return { type: "exit_room", key: "Espaço / E", text: "Sair para o Quintal (Pau Arcado)" };
    }
    if (distXZ(player.pos, BED_POS) < 2.2) {
      return { type: "bed", key: "Espaço / E", text: "Dormir na Cama (Próximo Dia)" };
    }
    if (distXZ(player.pos, MANGA_POS) < 1.9) {
      return { type: "manga", key: "Espaço / E", text: "Ler Mangá & Ver Pôster do PAC (TazerCraft)" };
    }
    if (distXZ(player.pos, ETEC_POS) < 2.0) {
      return { type: "etec", key: "Espaço / E", text: "Revisar Cadernos da ETEC Campo Limpo Paulista" };
    }
    return null;
  }

  if (state.location === "terminal") {
    if (distXZ(player.pos, TERM_SELL_POS) < 3.0) {
      const items = getTotalBasketCount();
      return {
        type: "term_sell",
        key: "Espaço / E",
        text: items > 0 ? `Vender Colheita no Terminal (${items})` : "Abrir Bancas & Encomendas de CLP",
      };
    }
    if (distXZ(player.pos, TERM_PASTEL_POS) < 2.7) {
      return { type: "pastel", key: "Espaço / E", text: "Comprar Pastel + Caldo de Cana (R$ 8 • +Energia)" };
    }
    if (distXZ(player.pos, TERM_BUS_BACK_POS) < 2.8) {
      return { type: "bus_to_yard", key: "Espaço / E", text: "Pegar Ônibus 402 de volta p/ Pau Arcado" };
    }
    if (distXZ(player.pos, TERM_TRAIN_POS) < 3.0) {
      return { type: "train_to_etec", key: "Espaço / E", text: "Pegar Trem Linha 7-Rubi p/ ETEC (Botujuru)" };
    }
    return null;
  }

  if (state.location === "etec") {
    if (distXZ(player.pos, ETEC_TRAIN_BACK_POS) < 2.8) {
      return { type: "train_to_term", key: "Espaço / E", text: "Pegar Trem Linha 7-Rubi p/ Terminal CLP" };
    }
    if (distXZ(player.pos, ETEC_DOOR_IN_POS) < 2.6) {
      return { type: "enter_etec", key: "Espaço / E", text: "Entrar na ETEC (Labs, Salas e Cantina)" };
    }
    return null;
  }

  if (state.location === "etec_inside") {
    if (distXZ(player.pos, ETEC_EXIT_POS) < 2.2) {
      return { type: "exit_etec", key: "Espaço / E", text: "Sair para o Pátio / Estação Botujuru" };
    }
    if (distXZ(player.pos, CHEM_BENCH_POS) < 2.4) {
      return {
        type: "chem_bench",
        key: "Espaço / E",
        text: state.npkDoneToday
          ? "Fórmula NPK já sintetizada hoje ✓"
          : "Sintetizar Super-Adubo NPK no Lab de Química!",
      };
    }
    for (const npc of etecNpcs) {
      if (distXZ(player.pos, npc.pos) < 2.45) {
        return { type: "npc", npcId: npc.id, key: "Espaço / E", text: `Conversar com ${npc.name}` };
      }
    }
    return null;
  }

  // Yard (Pau Arcado) stations
  if (distXZ(player.pos, BUS_STOP_YARD_POS) < 3.2) {
    return {
      type: "bus_to_term",
      key: "Espaço / E",
      text: state.isRainy
        ? "Ônibus 402 parado pela chuva! Espere amanhã"
        : "Pegar Ônibus 402 → Terminal Campo Limpo Paulista",
    };
  }
  if (distXZ(player.pos, COOP_POS) < 2.8) {
    return {
      type: "coop",
      key: "Espaço / E",
      text: state.coopEggs > 0 ? `Recolher Ovos Caipiras (${state.coopEggs} 🥚)` : "Galinheiro (sem ovos agora)",
    };
  }
  if (distXZ(player.pos, WELL_POS) < 3.4) {
    return { type: "well", key: "Espaço / E", text: "Encher Regador no Poço" };
  }
  if (distXZ(player.pos, COMPOST_POS) < 2.9) {
    return {
      type: "compost",
      key: "Espaço / E",
      text: state.compostDoneToday
        ? "Composteira já usada hoje ✓"
        : "Usar Composteira Orgânica (+30% Crescimento na Horta)",
    };
  }
  if (dogCaramelo && distXZ(player.pos, dogCaramelo.mesh.position) < 2.1) {
    return { type: "dog", key: "Espaço / E", text: "Fazer carinho no Caramelo 🐕" };
  }
  if (distXZ(player.pos, STAND_POS) < 3.8) {
    return { type: "shop", key: "Espaço / E", text: "Abrir Cooperativa Rural (Melhorias)" };
  }
  if (distXZ(player.pos, DOOR_POS) < 2.3) {
    return { type: "door", key: "Espaço / E", text: "Entrar em Casa (Quarto do Macho)" };
  }

  let bestPlot = null;
  let bestDist = 2.45;
  for (const p of plots) {
    const d = Math.hypot(player.pos.x - p.x, player.pos.z - p.z);
    if (d < bestDist) {
      bestDist = d;
      bestPlot = p;
    }
  }

  if (bestPlot) {
    bestPlot.ring.visible = true;
    if (!bestPlot.unlocked) {
      return { type: "locked_plot", plot: bestPlot, key: "L", text: "Canteiro bloqueado — Compre na Loja!" };
    }
    if (bestPlot.stage === "raw") {
      return { type: "plot", plot: bestPlot, key: "Espaço / E", text: "Arar terra do canteiro" };
    }
    if (bestPlot.stage === "tilled") {
      const crop = CROPS[state.selectedCrop];
      return {
        type: "plot",
        plot: bestPlot,
        key: "Espaço / E",
        text: `Plantar ${crop.emoji} ${crop.name} (${formatBRL(crop.seedCost)})`,
      };
    }
    if (bestPlot.stage === "growing") {
      const crop = CROPS[bestPlot.cropId];
      const pct = Math.min(99, Math.floor(bestPlot.growth * 100));
      if (bestPlot.waterTimer <= 0) {
        return {
          type: "plot",
          plot: bestPlot,
          key: "Espaço / E",
          text: `Regar ${crop.name} (${pct}%)`,
        };
      }
      return {
        type: "info_plot",
        plot: bestPlot,
        key: "🌱",
        text: `${crop.name} crescendo (${pct}%) — Regado`,
      };
    }
    if (bestPlot.stage === "ready") {
      const crop = CROPS[bestPlot.cropId];
      return {
        type: "plot",
        plot: bestPlot,
        key: "Espaço / E",
        text: `Colher ${crop.emoji} ${crop.name}!`,
      };
    }
  }

  return null;
}

function waterPlot(plot, isSplash = false) {
  if (!plot.unlocked || plot.stage !== "growing" || plot.waterTimer > 0) return false;
  plot.waterTimer = 16;
  refreshPlotAppearance(plot);
  spawnParticles(new THREE.Vector3(plot.x, 0.55, plot.z), 0x38bdf8, isSplash ? 7 : 12);
  return true;
}

function interactWithPlot(plot) {
  if (!plot.unlocked) {
    openShopModal();
    return;
  }

  if (plot.stage === "raw") {
    plot.stage = "tilled";
    state.swingTimer = 0.25;
    sfx.play("dig");
    spawnParticles(new THREE.Vector3(plot.x, 0.35, plot.z), 0x8b5a2b, 12);
    refreshPlotAppearance(plot);
    saveGame();
    return;
  }

  if (plot.stage === "tilled") {
    const crop = CROPS[state.selectedCrop];
    if (state.money < crop.seedCost) {
      sfx.play("error");
      showToast("💸", "SEM DINHEIRO", `Precisa de ${formatBRL(crop.seedCost)} para plantar ${crop.name}.`);
      return;
    }
    state.money -= crop.seedCost;
    plot.stage = "growing";
    plot.cropId = crop.id;
    plot.growth = 0;
    plot.waterTimer = state.water > 0 ? 16 : 0;
    if (state.water > 0) {
      state.water -= 1;
    }
    state.swingTimer = 0.22;
    sfx.play("plant");
    spawnParticles(new THREE.Vector3(plot.x, 0.45, plot.z), crop.color, 10);
    refreshPlotAppearance(plot);
    updateHUD();
    saveGame();
    return;
  }

  if (plot.stage === "growing") {
    if (plot.waterTimer <= 0) {
      if (state.water <= 0) {
        sfx.play("error");
        showToast("💧", "REGADOR VAZIO", "Vá até o Poço d'Água à esquerda para encher!");
        return;
      }
      state.water -= 1;
      waterPlot(plot, false);
      if (state.upgrades.canLevel >= 3) {
        const neighbor = plots.find(
          (other) =>
            other !== plot &&
            other.unlocked &&
            other.stage === "growing" &&
            other.waterTimer <= 0 &&
            Math.hypot(other.x - plot.x, other.z - plot.z) < 3.5
        );
        if (neighbor) waterPlot(neighbor, true);
      }
      state.swingTimer = 0.28;
      sfx.play("water");
      updateHUD();
      saveGame();
    }
    return;
  }

  if (plot.stage === "ready") {
    const crop = CROPS[plot.cropId];
    const bonus = Math.random() < getDoubleHarvestChance() ? 2 : 1;
    state.inventory[crop.id] = (state.inventory[crop.id] || 0) + bonus;
    plot.stage = "tilled";
    plot.cropId = null;
    plot.growth = 0;
    plot.waterTimer = 0;
    state.swingTimer = 0.25;
    sfx.play("harvest");
    spawnParticles(new THREE.Vector3(plot.x, 0.65, plot.z), crop.color, 15);
    showToast(
      crop.emoji,
      "COLHEITA FRESCA",
      bonus > 1 ? `+2 ${crop.name} (Adubo turbinado!)` : `+1 ${crop.name} na cesta!`
    );
    refreshPlotAppearance(plot);
    updateHUD();
    saveGame();
  }
}

function boostAllGrowingPlots(amount) {
  let count = 0;
  plots.forEach((p) => {
    if (p.unlocked && p.stage === "growing") {
      p.growth = Math.min(1, p.growth + amount);
      p.waterTimer = Math.max(p.waterTimer, 16);
      if (p.growth >= 1) p.stage = "ready";
      refreshPlotAppearance(p);
      count++;
    }
  });
  return count;
}

function triggerContextAction() {
  const ctx = findCurrentContext();
  if (!ctx) return;
  if (ctx.type === "well") {
    state.water = getMaxWater();
    state.swingTimer = 0.25;
    sfx.play("refill");
    spawnParticles(new THREE.Vector3(WELL_POS.x, 1.3, WELL_POS.z), 0x38bdf8, 16);
    showToast("💧", "REGADOR CHEIO", `Água recarregada (${state.water}/${getMaxWater()}).`);
    updateHUD();
  } else if (ctx.type === "coop") {
    if (state.coopEggs <= 0) {
      showToast("🐔", "GALINHEIRO", "As galinhas já botaram hoje! Amanhã cedo tem mais ovos caipiras.");
      return;
    }
    const eggs = state.coopEggs;
    state.inventory.ovo_caipira = (state.inventory.ovo_caipira || 0) + eggs;
    state.coopEggs = 0;
    syncCoopEggsVisual();
    sfx.play("harvest");
    spawnParticles(new THREE.Vector3(COOP_POS.x, 0.8, COOP_POS.z), 0xfacc15, 14);
    showToast("🥚", "OVOS CAIPIRAS", `Recolheu +${eggs} Ovo(s) Caipira(s) no galinheiro!`);
    updateHUD();
    saveGame();
  } else if (ctx.type === "compost") {
    if (state.compostDoneToday) {
      showToast("🌿", "COMPOSTEIRA", "Você já usou o húmus da composteira hoje!");
      return;
    }
    state.compostDoneToday = true;
    const boosted = boostAllGrowingPlots(0.32);
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(COMPOST_POS.x, 1.1, COMPOST_POS.z), 0x4ade80, 16);
    showToast(
      "🌿",
      "ADUBO CASEIRO APLICADO!",
      boosted > 0
        ? `${boosted} canteiro(s) receberam +30% de crescimento imediato!`
        : "Composteira preparada! Plante nos canteiros para aproveitar."
    );
    updateHUD();
    saveGame();
  } else if (ctx.type === "dog") {
    sfx.play("bark");
    spawnParticles(dogCaramelo.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 10);
    showToast(
      "🐕",
      "CARAMELO FELIZ!",
      state.insanity > 0
        ? "Caramelo abanou o rabo! (Fique 1 dia sem ir na ETEC p/ descer 25% da barra)"
        : "Caramelo abanou o rabo e deu um latido de alegria!"
    );
    updateHUD();
    saveGame();
  } else if (ctx.type === "shop") {
    openShopModal();
  } else if (ctx.type === "bus_to_term") {
    takeBus402ToTerminal();
  } else if (ctx.type === "bus_to_yard") {
    takeBus402ToYard();
  } else if (ctx.type === "train_to_etec") {
    takeTrainToEtec();
  } else if (ctx.type === "train_to_term") {
    takeTrainToTerminal();
  } else if (ctx.type === "enter_etec") {
    enterEtecInside();
  } else if (ctx.type === "exit_etec") {
    exitEtecInside();
  } else if (ctx.type === "chem_bench") {
    if (state.npkDoneToday) {
      showToast("🧪", "LABORATÓRIO DE QUÍMICA", "A síntese NPK já foi feita hoje! Volte amanhã.");
      return;
    }
    state.npkDoneToday = true;
    const boosted = boostAllGrowingPlots(0.45);
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(10.2, 1.5, -9.2), 0x38bdf8, 18);
    showToast(
      "🧪",
      "SÍNTESE NPK NA ETEC!",
      `Reação química perfeita! ${boosted} canteiro(s) em Pau Arcado avançaram +45%!`
    );
    saveGame();
  } else if (ctx.type === "pastel") {
    if (state.money < 8) {
      sfx.play("error");
      showToast("💸", "SEM TROCO", "Precisa de R$ 8,00 para o Pastel + Caldo de Cana!");
      return;
    }
    state.money -= 8;
    state.energyTimer = 90;
    sfx.play("upgrade");
    showToast("🥟", "PASTEL COM CALDO DE CANA!", "+35% Velocidade de caminhada por 90s!");
    updateHUD();
    saveGame();
  } else if (ctx.type === "term_sell") {
    openSellModal();
  } else if (ctx.type === "npc") {
    openNpcModal(ctx.npcId);
  } else if (ctx.type === "door") {
    enterRoom();
  } else if (ctx.type === "exit_room") {
    exitRoom();
  } else if (ctx.type === "bed") {
    advanceToNextDay();
  } else if (ctx.type === "manga") {
    sfx.play("harvest");
    showToast(
      "📚",
      "MANGÁS & PAC (TAZERCRAFT)",
      state.insanity > 0
        ? "Leu mangá! (Para descer 25% da sanidade, fique o dia inteiro longe da ETEC!)"
        : "Leu um capítulo de mangá e viu o pôster do PAC (TazerCraft)!"
    );
    updateHUD();
    saveGame();
  } else if (ctx.type === "etec") {
    sfx.play("plant");
    showToast("🎒", "ETEC CAMPO LIMPO PAULISTA", "Cadernos em dia! Pegue o 402 e o trem 7-Rubi até Botujuru.");
  } else if (ctx.type === "plot" || ctx.type === "locked_plot") {
    interactWithPlot(ctx.plot);
  }
}

function advanceToNextDay() {
  const wasAtEtecToday = state.visitedEtecToday || state.location === "etec" || state.location === "etec_inside";
  const prevInsanity = state.insanity;

  state.day += 1;
  state.dayMinutes = 6.5 * 60;
  state.isRainy = Math.random() < 0.35;

  // Para a sanidade descer ele precisa ficar sem ir para a ETEC (cada dia longe reduz 25%)
  if (!wasAtEtecToday && state.insanity > 0) {
    state.insanity = Math.max(0, state.insanity - 25);
  }
  state.isCrazy = state.insanity >= 100;
  state.visitedEtecToday = false;

  // Se dormiu fora do sítio (ex: menu de pausa), acorda no quintal de Pau Arcado
  if (state.location !== "yard" && state.location !== "room") {
    state.location = "yard";
    player.pos.set(0, 0, -6.5);
    player.facingYaw = 0;
    state.camYaw = 0.2;
    state.camPitch = 0.48;
    state.camDist = 16.5;
    playerMesh.position.copy(player.pos);
    playerMesh.rotation.y = player.facingYaw;
  }

  state.npkDoneToday = false;
  state.compostDoneToday = false;
  state.coopEggs = Math.min(3, 2 + Math.floor(Math.random() * 2));

  plots.forEach((p) => {
    if (p.unlocked && p.stage === "growing") {
      p.growth = Math.min(1, p.growth + 0.35);
      p.waterTimer = Math.max(p.waterTimer, state.isRainy ? 20 : 10);
      if (p.growth >= 1) p.stage = "ready";
      refreshPlotAppearance(p);
    }
  });
  setActiveSceneVisibility();
  rollDailyMarket();
  generateCityOrders();
  sfx.play("sleep");
  const hotCrop = CROPS[state.hotCropId];
  if (state.isRainy) {
    showDayBanner(`DIA ${state.day} CHUVOSO 🌧️ • ÔNIBUS 402 PARADO! HORTA REGADA!`);
  } else {
    showDayBanner(`BOM DIA, MACHO! DIA ${state.day} ☀️ • ${hotCrop.emoji} ${hotCrop.name} EM ALTA!`);
  }

  if (prevInsanity > 0) {
    if (!wasAtEtecToday) {
      showToast(
        "🧘",
        "1 DIA LONGE DA ETEC (-25%)",
        `Você ficou sem ir na ETEC! A barra desceu de ${prevInsanity}% para ${state.insanity}%!`
      );
    } else {
      showToast(
        "🏫",
        "FOI NA ETEC ONTEM!",
        `A barra continua em ${state.insanity}%! Fique 1 dia sem ir na ETEC para reduzir 25%.`
      );
    }
  }
  if (state.isCrazy) {
    triggerCoringaBurst(false);
  }
  updateHUD();
  saveGame();
}

// Sell Modal Logic (Selling is only enabled at Terminal de Campo Limpo Paulista!)
function openSellModal() {
  clearActiveInputs();
  state.mode = "modal";
  renderSellModal();
  sellModal.classList.remove("hidden");
}

function closeSellModal() {
  sellModal.classList.add("hidden");
  state.mode = "playing";
}

function renderSellModal() {
  const atTerminal = state.location === "terminal";
  sellModeNotice.textContent = atTerminal
    ? "Você está nas Bancas do Terminal de Campo Limpo Paulista! Venda sua colheita ou entregue encomendas."
    : "Para vender seus produtos, pegue o Ônibus 402 na porteira de Pau Arcado até o Terminal de Campo Limpo Paulista!";
  sellActionArea.classList.toggle("hidden", !atTerminal);

  sellInventoryList.innerHTML = "";
  let totalPotential = 0;

  CROP_KEYS.forEach((id) => {
    const crop = CROPS[id];
    const qty = state.inventory[id] || 0;
    const price = getCropSellPrice(id);
    const subtotal = qty * price;
    totalPotential += subtotal;

    const isHot = state.hotCropId === id;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${crop.emoji}</span>
        <div>
          <div class="row-title">${crop.name} ${isHot ? "🔥 Em Alta!" : ""}</div>
          <div class="row-sub">Na cesta: <strong>${qty}</strong> • Preço hoje: <strong>${formatBRL(price)}</strong>/un</div>
        </div>
      </div>
      <button class="mini-btn" ${qty <= 0 || !atTerminal ? "disabled" : ""}>Vender (${formatBRL(subtotal)})</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!atTerminal || state.inventory[id] <= 0) return;
      state.money += subtotal;
      state.inventory[id] = 0;
      sfx.play("sell");
      showToast("💰", "VENDA NO TERMINAL", `+${formatBRL(subtotal)} vendendo ${crop.name}!`);
      updateHUD();
      renderSellModal();
      saveGame();
    });
    sellInventoryList.appendChild(row);
  });

  sellAllBtn.disabled = !atTerminal || totalPotential <= 0;
  sellAllBtn.textContent =
    totalPotential > 0 ? `Vender Tudo da Cesta (+${formatBRL(totalPotential)})` : "Cesta Vazia — Colha no Quintal!";

  ordersList.innerHTML = "";
  state.orders.forEach((order) => {
    const crop = CROPS[order.cropId];
    const have = state.inventory[order.cropId] || 0;
    const canDeliver = atTerminal && !order.completed && have >= order.qty;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${crop.emoji}</span>
        <div>
          <div class="row-title">${order.buyer}</div>
          <div class="row-sub">Quer <strong>${order.qty}x ${crop.name}</strong> (Você tem ${have}) • Paga <strong>${formatBRL(order.reward)}</strong> + ⭐1</div>
        </div>
      </div>
      <button class="mini-btn green" ${canDeliver ? "" : "disabled"}>
        ${order.completed ? "Entregue ✓" : atTerminal ? "Entregar" : "Vá ao Terminal"}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!atTerminal || order.completed || (state.inventory[order.cropId] || 0) < order.qty) return;
      state.inventory[order.cropId] -= order.qty;
      state.money += order.reward;
      state.reputation += 1;
      order.completed = true;
      sfx.play("upgrade");
      showToast("📦", "ENCOMENDA ENTREGUE!", `${order.buyer} pagou ${formatBRL(order.reward)}!`);
      updateHUD();
      renderSellModal();
      saveGame();
    });
    ordersList.appendChild(row);
  });
}

sellAllBtn.addEventListener("click", () => {
  if (state.location !== "terminal") return;
  let earned = 0;
  CROP_KEYS.forEach((id) => {
    const qty = state.inventory[id] || 0;
    if (qty > 0) {
      earned += qty * getCropSellPrice(id);
      state.inventory[id] = 0;
    }
  });
  if (earned <= 0) return;
  state.money += earned;
  sfx.play("sell");
  showToast("💰", "TUDO VENDIDO!", `Macho faturou ${formatBRL(earned)} no Terminal CLP!`);
  updateHUD();
  renderSellModal();
  saveGame();
});

// NPC Modal & Title Quests (Muzzonline, Kaio Wendell, Félix, Pão)
const FELIX_QUESTS = [
  {
    title: "Missão 1 do Félix: Lanche na ETEC",
    req: { alface_crespa: 3 },
    reqLabel: "3x Alface Crespa 🥬",
    rewardMoney: 45,
    rewardTitle: "PAC",
    quote: "E aí Macho! Tô varado de fome aqui na cantina da ETEC, traz 3 Alfaces Crespas pra eu virar fã número 1!",
  },
  {
    title: "Missão 2 do Félix: Banquete do Félix",
    req: { alface_roxa: 3, tomate: 2 },
    reqLabel: "3x Alface Roxa 🟣 + 2x Tomate Cereja 🍅",
    rewardMoney: 120,
    rewardTitle: "Homem Guloso",
    quote: "Agora quero o combo gourmet de Pau Arcado! Traz 3 Alfaces Roxas e 2 Tomates Cereja!",
  },
];

const PAO_QUESTS = [
  {
    title: "Missão 1 do Pão: Salada Crocante",
    req: { alface_americana: 3 },
    reqLabel: "3x Alface Americana 🥗",
    rewardMoney: 60,
    rewardTitle: "Airfryer",
    quote: "Fala Alyffer! Traz 3 Alfaces Americanas crocantes aqui pra galera da ETEC!",
  },
  {
    title: "Missão 2 do Pão: Desafio Raiz do Quintal",
    req: { alface_crespa: 4, cenoura: 3 },
    reqLabel: "4x Alface Crespa 🥬 + 3x Cenoura 🥕",
    rewardMoney: 140,
    rewardTitle: "Macho",
    quote: "Último desafio pra provar que você domina a roça de Pau Arcado: 4 Alfaces Crespas e 3 Cenouras!",
  },
];

const MUZZ_LINES = [
  "Muzzonline: 'Mano, se você fritar uma batata no sol de Pau Arcado ela vira um pendrive de 64GB, confia!'",
  "Muzzonline: 'Ontem um pombo me olhou torto na estação Botujuru e eu devolvi uma piscadela em código Morse!'",
  "Muzzonline: 'Meu tênis vermelho roda a 144 FPS no corredor da ETEC se eu tomar Toddynho vencido!'",
  "Muzzonline: 'Sabia que se você colocar gelo no microondas e cantar parabéns, ele vira água gelada quente?!'",
  "Muzzonline: 'Tô tentando ensinar meu cachorro a calcular regra de três pra ele passar em matemática por mim!'",
  "Muzzonline: 'Se o ônibus 402 tivesse asas, o motorista ia cobrar passagem de helicóptero ou de alface?'",
  "Muzzonline: 'Acabei de instalar o Windows 95 na calculadora científica e agora ela tá pedindo alface!'",
];

const KAIO_LINES = [
  "Kaio Wendell: 'Pela estequiometria da reação, se o pH do seu solo ficar abaixo de 6,0 a alface não absorve o Nitrato (NO₃⁻)!'",
  "Kaio Wendell: 'Acabei de fazer uma titulação ácido-base no lab da ETEC! Com fenolftaleína a solução ficou rosa choque!'",
  "Kaio Wendell: 'A fotossíntese é pura Química: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂! Sua alface é uma fábrica de glicose!'",
  "Kaio Wendell: 'Cuidado com as ligações covalentes do adubo NPK: Nitrogênio faz as folhas verdes, Fósforo dá raiz forte!'",
  "Kaio Wendell: 'Misturei sulfato de cobre (CuSO₄) com hidróxido de sódio no béquer e precipitou um azul absurdo!'",
  "Kaio Wendell: 'Se equilibrarmos os íons Potássio (K⁺) na solução aquosa do seu regador, a pressão osmótica da alface triplica!'",
];

const ALYFFER_CORINGA_LINES = [
  "HAHAHAHA! A ALFACE CRESPA ME CONTOU O SEGREDO DO ÔNIBUS 402!",
  "CORINGUEI! SE EU PLANTAR UM TÊNIS VERMELHO NASCE UM MUZZONLINE?!",
  "O KAIO MISTUROU H₂O COM CALDO DE CANA E AGORA TÔ VENDO EM 4D! KKKKK!",
  "POR QUE O TREM DA LINHA 7-RUBI NÃO É FEITO DE MORANGO?! HAHAHA!",
  "EU SOU O CORINGA DE PAU ARCADO! QUEM É BATMAN PERTO DO MACHO?!",
  "SE A CHUVA MOLHA A TERRA, QUEM É QUE REGOU A NUVEM?! KKKKKKK!",
  "ALÔ MOTORISTA DO 402, ACEITA 3 CENOURAS E UM OVO CAIPIRA DE PASSAGEM?!",
  "A TABELA PERIÓDICA TEM O ELEMENTO QUÍMICO DO PASTEL DE QUEIJO?! HAHAHA!",
  "MINHA ENXADA TÁ FALANDO EM CÓDIGO BINÁRIO COM AS GALINHAS DO QUINTAL!",
  "SE EU DORMIR DE PONTA-CABEÇA A ALFACE CRESCE PRO CENTRO DA TERRA!",
  "O CARAMELO LATIU EM JAPONÊS E PEDIU UM DIPLOMA DA ETEC! KKKKKK!",
  "VIVEMOS NUMA SALADA GIGANTE! TUDO É ALFACE ROXA! HAHAHAHA!",
  "COLOQUEI ADUBO NPK NO MEU CAFÉ E AGORA MEU CHAPÉU FAZ FOTOSSÍNTESE!",
  "SE O PÃO LIGAR UMA AIRFRYER DENTRO DE OUTRA ABRE UM PORTAL PRA BOTUJURU!",
  "O FÉLIX COMEU ATÉ O SEMÁFORO DA AV. ALFRIED KRUPP! HAHAHAHA!",
];

let currentNpcId = null;

function canFulfillReq(req) {
  return Object.entries(req).every(([cropId, need]) => (state.inventory[cropId] || 0) >= need);
}

function consumeReq(req) {
  Object.entries(req).forEach(([cropId, need]) => {
    state.inventory[cropId] -= need;
  });
}

function awardTitle(titleName) {
  if (!state.titles.includes(titleName)) {
    state.titles.push(titleName);
  }
  state.activeTitle = titleName;
}

function triggerCoringaBurst(playFullLaugh = false) {
  const candidates = ALYFFER_CORINGA_LINES.filter((l) => l !== state.currentCoringaLine);
  const pool = candidates.length > 0 ? candidates : ALYFFER_CORINGA_LINES;
  const line = pool[Math.floor(Math.random() * pool.length)];
  state.currentCoringaLine = line;
  state.coringaTimer = 4.5 + Math.random() * 1.5;

  if (coringaBubbleText) {
    coringaBubbleText.textContent = `"${line}"`;
  }
  if (coringaBubble && state.mode === "playing") {
    coringaBubble.classList.remove("hidden");
  }

  sfx.play(playFullLaugh ? "coringa" : "chuckle");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 2.2, 0)), 0xec4899, playFullLaugh ? 18 : 8);
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0x4ade80, playFullLaugh ? 14 : 6);
}

function addInsanity(amount) {
  state.visitedEtecToday = true;
  const wasCrazy = state.isCrazy;
  state.insanity = Math.min(100, state.insanity + amount);
  state.isCrazy = state.insanity >= 100;

  if (state.isCrazy) {
    triggerCoringaBurst(!wasCrazy);
    if (!wasCrazy) {
      showDayBanner("🤡 ALYFFER CORINGOU (100%)! COMEÇOU A FALAR SÓ BESTEIRA!");
    }
    showToast("🤡", "ALYFFER CORINGANDO (100%)!", state.currentCoringaLine);
  } else {
    sfx.play("plant");
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0xa855f7, 10);
  }
  updateHUD();
  saveGame();
}

function openNpcModal(npcId) {
  clearActiveInputs();
  currentNpcId = npcId;
  state.mode = "modal";
  renderNpcModal();
  npcModal.classList.remove("hidden");
}

function closeNpcModal() {
  npcModal.classList.add("hidden");
  currentNpcId = null;
  state.mode = "playing";
  updateHUD();
}

function renderNpcModal() {
  npcMissionBox.classList.add("hidden");
  npcActionBtn.disabled = false;

  if (currentNpcId === "muzzonline") {
    npcTag.textContent = "LAB DE INFORMÁTICA • ETEC CLP";
    npcName.textContent = "Muzzonline";
    npcAppearance.textContent = "Blusa cinza, calça cinza, tênis vermelho, cabelo bagunçado e óculos vermelho.";
    const muzzQuote = MUZZ_LINES[Math.floor(Math.random() * MUZZ_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${muzzQuote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : muzzQuote;
    npcActionBtn.textContent = state.isCrazy
      ? "Coringar Junto com Muzzonline (100% 🤡)"
      : "Ouvir Besteira Aleatória (+25% Sanidade/Coringa)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(25);
      if (!state.isCrazy) {
        showToast("🤪", "MUZZONLINE", `+25% (${state.insanity}%)! Cada ideia aleatória...`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "kaio") {
    npcTag.textContent = "LAB DE QUÍMICA • ETEC CLP";
    npcName.textContent = "Kaio Wendell (Cientista Louco)";
    npcAppearance.textContent = "Sobretudo estiloso, cabelo de cientista, calça social e sapato social.";
    const kaioQuote = KAIO_LINES[Math.floor(Math.random() * KAIO_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${kaioQuote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : kaioQuote;
    npcActionBtn.textContent = state.isCrazy
      ? "Coringar no Lab de Química (100% 🤡)"
      : "Ouvir Aula de Química (+30% Sanidade/Coringa)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(30);
      if (!state.isCrazy) {
        showToast("🧪", "KAIO WENDELL", `+30% (${state.insanity}%)! Pura química na cabeça!`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "felix") {
    npcTag.textContent = "CANTINA DA ETEC • MISSÕES DE TÍTULO";
    npcName.textContent = "Félix";
    npcAppearance.textContent = "Cabelo grande e blusa de frio preta.";
    if (state.felixStep >= FELIX_QUESTS.length) {
      npcDialogue.textContent = "Félix: 'Valeu pelos rangos da horta, Homem Guloso! Você é lenda na ETEC!'";
      npcActionBtn.textContent = "Missões do Félix Concluídas ✓";
      npcActionBtn.disabled = true;
      npcActionBtn.onclick = null;
    } else {
      const q = FELIX_QUESTS[state.felixStep];
      const ready = canFulfillReq(q.req);
      npcDialogue.textContent = `Félix: "${q.quote}"`;
      npcMissionBox.classList.remove("hidden");
      npcMissionTitle.textContent = q.title;
      npcMissionReq.textContent = `Precisa: ${q.reqLabel}`;
      npcMissionReward.textContent = `Recompensa: ${formatBRL(q.rewardMoney)} + Título "${q.rewardTitle}"`;
      npcActionBtn.textContent = ready
        ? `Entregar Missão & Ganhar Título "${q.rewardTitle}"`
        : "Ainda falta colheita na cesta";
      npcActionBtn.disabled = !ready;
      npcActionBtn.onclick = () => {
        if (!canFulfillReq(q.req)) return;
        consumeReq(q.req);
        state.money += q.rewardMoney;
        awardTitle(q.rewardTitle);
        state.felixStep += 1;
        sfx.play("upgrade");
        showDayBanner(`🏆 NOVO TÍTULO CONQUISTADO: "${q.rewardTitle.toUpperCase()}"!`);
        updateHUD();
        saveGame();
        renderNpcModal();
      };
    }
  } else if (currentNpcId === "pao") {
    npcTag.textContent = "CANTINA DA ETEC • MISSÕES DE TÍTULO";
    npcName.textContent = "Pão";
    npcAppearance.textContent = "Moreno, camisa vermelha da ETEC e calça jeans.";
    if (state.paoStep >= PAO_QUESTS.length) {
      npcDialogue.textContent = "Pão: 'É isso aí, Macho! Respeito máximo pelo rei da alface de Pau Arcado!'";
      npcActionBtn.textContent = "Missões do Pão Concluídas ✓";
      npcActionBtn.disabled = true;
      npcActionBtn.onclick = null;
    } else {
      const q = PAO_QUESTS[state.paoStep];
      const ready = canFulfillReq(q.req);
      npcDialogue.textContent = `Pão: "${q.quote}"`;
      npcMissionBox.classList.remove("hidden");
      npcMissionTitle.textContent = q.title;
      npcMissionReq.textContent = `Precisa: ${q.reqLabel}`;
      npcMissionReward.textContent = `Recompensa: ${formatBRL(q.rewardMoney)} + Título "${q.rewardTitle}"`;
      npcActionBtn.textContent = ready
        ? `Entregar Missão & Ganhar Título "${q.rewardTitle}"`
        : "Ainda falta colheita na cesta";
      npcActionBtn.disabled = !ready;
      npcActionBtn.onclick = () => {
        if (!canFulfillReq(q.req)) return;
        consumeReq(q.req);
        state.money += q.rewardMoney;
        awardTitle(q.rewardTitle);
        state.paoStep += 1;
        sfx.play("upgrade");
        showDayBanner(`🏆 NOVO TÍTULO CONQUISTADO: "${q.rewardTitle.toUpperCase()}"!`);
        updateHUD();
        saveGame();
        renderNpcModal();
      };
    }
  }
}

// Guide & Titles Modal Logic
function openGuideModal() {
  clearActiveInputs();
  state.mode = "modal";
  renderGuideModal();
  guideModal.classList.remove("hidden");
}

function closeGuideModal() {
  guideModal.classList.add("hidden");
  state.mode = "playing";
}

function renderGuideModal() {
  titlesList.innerHTML = "";
  ALL_TITLES.forEach((t) => {
    const unlocked = state.titles.includes(t);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `title-chip ${state.activeTitle === t ? "active" : ""} ${unlocked ? "" : "locked"}`;
    btn.textContent = unlocked ? `🏆 ${t}` : `🔒 ${t}`;
    btn.disabled = !unlocked;
    btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.activeTitle = t;
      sfx.play("plant");
      updateHUD();
      renderGuideModal();
      saveGame();
    });
    titlesList.appendChild(btn);
  });

  guideQuestsList.innerHTML = "";
  const questSummaries = [
    {
      npc: "Félix (Cantina ETEC)",
      done: state.felixStep >= FELIX_QUESTS.length,
      current: FELIX_QUESTS[Math.min(state.felixStep, FELIX_QUESTS.length - 1)],
      stepText: `${state.felixStep}/${FELIX_QUESTS.length}`,
    },
    {
      npc: "Pão (Cantina ETEC)",
      done: state.paoStep >= PAO_QUESTS.length,
      current: PAO_QUESTS[Math.min(state.paoStep, PAO_QUESTS.length - 1)],
      stepText: `${state.paoStep}/${PAO_QUESTS.length}`,
    },
  ];
  questSummaries.forEach((qs) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${qs.done ? "✅" : "🎯"}</span>
        <div>
          <div class="row-title">${qs.npc} (${qs.stepText})</div>
          <div class="row-sub">${
            qs.done
              ? "Todas as missões concluídas!"
              : `${qs.current.title} — Precisa: <strong>${qs.current.reqLabel}</strong> → Título <strong>"${qs.current.rewardTitle}"</strong>`
          }</div>
        </div>
      </div>
    `;
    guideQuestsList.appendChild(row);
  });
}

// Shop Modal Logic
function openShopModal() {
  clearActiveInputs();
  state.mode = "modal";
  renderShopModal();
  shopModal.classList.remove("hidden");
}

function closeShopModal() {
  shopModal.classList.add("hidden");
  state.mode = "playing";
}

function renderShopModal() {
  shopMoneyVal.textContent = formatBRL(state.money);
  shopItemsList.innerHTML = "";

  const plotCost = 35 + state.upgrades.plotTier * 45;
  const canCost = 30 * state.upgrades.canLevel;
  const fertCost = 40 * state.upgrades.fertLevel;
  const standCost = 45 * state.upgrades.standLevel;

  const items = [
    {
      emoji: "🌱",
      title: `Expandir Quintal (+2 Canteiros)`,
      sub: `Desbloqueados: ${getUnlockedPlotCount()}/16 canteiros`,
      cost: plotCost,
      maxed: state.upgrades.plotTier >= 5,
      buy: () => {
        state.upgrades.plotTier += 1;
        syncUnlockedPlots();
      },
    },
    {
      emoji: "🚿",
      title: `Regador Melhorado (Nível ${state.upgrades.canLevel}/4)`,
      sub:
        state.upgrades.canLevel < 3
          ? `Aumenta capacidade de água (atual: ${getMaxWater()})`
          : `Capacidade maior + rega canteiro vizinho grátis!`,
      cost: canCost,
      maxed: state.upgrades.canLevel >= 4,
      buy: () => {
        state.upgrades.canLevel += 1;
        state.water = getMaxWater();
      },
    },
    {
      emoji: "🌿",
      title: `Adubo Orgânico (Nível ${state.upgrades.fertLevel}/4)`,
      sub: `Crescimento +${(state.upgrades.fertLevel - 1) * 28}% • Chance de colheita dupla`,
      cost: fertCost,
      maxed: state.upgrades.fertLevel >= 4,
      buy: () => {
        state.upgrades.fertLevel += 1;
      },
    },
    {
      emoji: "🚚",
      title: `Fama nas Bancas do Terminal (Nível ${state.upgrades.standLevel}/4)`,
      sub: `Aumenta preço de venda em +16% por nível`,
      cost: standCost,
      maxed: state.upgrades.standLevel >= 4,
      buy: () => {
        state.upgrades.standLevel += 1;
      },
    },
  ];

  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const affordable = !it.maxed && state.money >= it.cost;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${affordable ? "" : "disabled"}>
        ${it.maxed ? "Nível Máx ✓" : `Comprar ${formatBRL(it.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (it.maxed || state.money < it.cost) return;
      state.money -= it.cost;
      it.buy();
      sfx.play("upgrade");
      showToast(it.emoji, "MELHORIA COMPRADA!", it.title);
      updateHUD();
      renderShopModal();
      saveGame();
    });
    shopItemsList.appendChild(row);
  });
}

// Input & Controls
const keys = {};

window.addEventListener("keydown", (e) => {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    if (state.mode === "playing") e.preventDefault();
  }

  if (e.code === "Escape") {
    if (!npcModal.classList.contains("hidden")) {
      closeNpcModal();
      return;
    }
    if (!guideModal.classList.contains("hidden")) {
      closeGuideModal();
      return;
    }
    if (!sellModal.classList.contains("hidden")) {
      closeSellModal();
      return;
    }
    if (!shopModal.classList.contains("hidden")) {
      closeShopModal();
      return;
    }
    if (state.mode === "playing" || state.mode === "paused") {
      togglePause();
      return;
    }
  }

  if (state.mode !== "playing") {
    keys[e.code] = true;
    return;
  }

  if (!keys[e.code]) {
    if (e.code === "Space" || e.code === "KeyE") {
      triggerContextAction();
    } else if (e.code === "KeyG") {
      openGuideModal();
    } else if (e.code === "KeyL") {
      openShopModal();
    } else if (e.code === "KeyO") {
      openSellModal();
    } else if (e.code === "KeyP") {
      togglePause();
    } else if (e.code === "KeyM") {
      toggleMute();
    } else if (e.code >= "Digit1" && e.code <= "Digit6") {
      const idx = Number(e.code.replace("Digit", "")) - 1;
      if (SEED_KEYS[idx]) {
        state.selectedCrop = SEED_KEYS[idx];
        updateSeedHotbarUI();
      }
    }
  }
  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

document.querySelectorAll(".seed-slot").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.selectedCrop = btn.dataset.crop;
    updateSeedHotbarUI();
  });
});

// Multi-Touch / Mouse Orbit, Pinch-to-Zoom & Raycast Click on 3D Plots
const canvasPointers = new Map();
let orbitPointerId = null;
let orbitMoved = false;
let orbitHadPinch = false;
let orbitButton = 0;
let downX = 0;
let downY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastPinchDist = 0;
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();

function getTwoPointerDist() {
  const pts = Array.from(canvasPointers.values());
  if (pts.length < 2) return 0;
  return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
}

renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("contextmenu", (e) => {
  if (state.mode === "playing") e.preventDefault();
});

renderer.domElement.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) return;
  canvasPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (canvasPointers.size === 1) {
    orbitPointerId = e.pointerId;
    orbitMoved = false;
    orbitHadPinch = false;
    orbitButton = e.button || 0;
    downX = e.clientX;
    downY = e.clientY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  } else if (canvasPointers.size === 2) {
    orbitHadPinch = true;
    orbitMoved = true;
    lastPinchDist = getTwoPointerDist();
  }
});

window.addEventListener("pointermove", (e) => {
  if (!canvasPointers.has(e.pointerId) || state.mode !== "playing") return;
  canvasPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (canvasPointers.size >= 2) {
    const newDist = getTwoPointerDist();
    if (lastPinchDist > 0 && newDist > 0) {
      const delta = lastPinchDist - newDist;
      state.camDist = THREE.MathUtils.clamp(state.camDist + delta * 0.045, 6.5, 26);
    }
    lastPinchDist = newDist;
    return;
  }

  if (e.pointerId === orbitPointerId) {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) {
      orbitMoved = true;
    }
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    const sens = e.pointerType === "touch" ? 0.0082 : 0.0065;
    state.camYaw -= dx * sens;
    state.camPitch = THREE.MathUtils.clamp(state.camPitch + dy * 0.0052, 0.22, 1.08);
  }
});

function handleCanvasPointerEnd(e, isCancel) {
  if (!canvasPointers.has(e.pointerId)) return;
  const wasTap =
    !isCancel &&
    e.pointerId === orbitPointerId &&
    canvasPointers.size === 1 &&
    (e.pointerType !== "mouse" || orbitButton === 0) &&
    !orbitMoved &&
    !orbitHadPinch &&
    state.mode === "playing" &&
    state.location === "yard";

  canvasPointers.delete(e.pointerId);

  if (canvasPointers.size === 1) {
    const [remainingId, pos] = Array.from(canvasPointers.entries())[0];
    orbitPointerId = remainingId;
    lastMouseX = pos.x;
    lastMouseY = pos.y;
    lastPinchDist = 0;
  } else if (canvasPointers.size === 0) {
    orbitPointerId = null;
    lastPinchDist = 0;
  }

  if (wasTap) {
    pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);
    const hits = raycaster.intersectObjects(plotHitMeshes, false);
    if (hits.length > 0) {
      const plotIndex = hits[0].object.userData.plotIndex;
      const plot = plots[plotIndex];
      if (plot) {
        const dist = Math.hypot(player.pos.x - plot.x, player.pos.z - plot.z);
        if (dist <= 3.6) {
          interactWithPlot(plot);
        } else {
          showToast("🥾", "CHEGA MAIS PERTO", "Ande até o canteiro para mexer na terra!");
        }
      }
    }
  }
}

window.addEventListener("pointerup", (e) => handleCanvasPointerEnd(e, false));
window.addEventListener("pointercancel", (e) => handleCanvasPointerEnd(e, true));

renderer.domElement.addEventListener(
  "wheel",
  (e) => {
    state.camDist = THREE.MathUtils.clamp(state.camDist + e.deltaY * 0.012, 6.5, 26);
  },
  { passive: true }
);

// Virtual Analog Joystick & Touch Action Controls
const joystickBase = document.getElementById("joystickBase");
const joystickKnob = document.getElementById("joystickKnob");
const touchActionBtn = document.getElementById("touchAction");
const touchActionEmoji = document.getElementById("touchActionEmoji");
const joyVec = new THREE.Vector2(0, 0);
let joystickPointerId = null;

function resetJoystick() {
  joystickPointerId = null;
  joyVec.set(0, 0);
  if (joystickKnob) {
    joystickKnob.style.transform = "translate(0px, 0px)";
  }
}

function updateJoystickFromPointer(e) {
  if (!joystickBase || !joystickKnob) return;
  const rect = joystickBase.getBoundingClientRect();
  const cx = rect.left + rect.width * 0.5;
  const cy = rect.top + rect.height * 0.5;
  const maxRadius = rect.width * 0.36;
  let dx = e.clientX - cx;
  let dy = e.clientY - cy;
  const dist = Math.hypot(dx, dy);
  if (dist > maxRadius) {
    dx = (dx / dist) * maxRadius;
    dy = (dy / dist) * maxRadius;
  }
  joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
  const normX = dx / maxRadius;
  const normY = dy / maxRadius;
  if (Math.hypot(normX, normY) < 0.12) {
    joyVec.set(0, 0);
  } else {
    joyVec.set(normX, normY);
  }
}

if (joystickBase) {
  joystickBase.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    joystickPointerId = e.pointerId;
    if (joystickBase.setPointerCapture) {
      try {
        joystickBase.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
    updateJoystickFromPointer(e);
  });
  joystickBase.addEventListener("pointermove", (e) => {
    if (e.pointerId !== joystickPointerId) return;
    e.preventDefault();
    updateJoystickFromPointer(e);
  });
  joystickBase.addEventListener("pointerup", (e) => {
    if (e.pointerId !== joystickPointerId) return;
    resetJoystick();
  });
  joystickBase.addEventListener("pointercancel", (e) => {
    if (e.pointerId !== joystickPointerId) return;
    resetJoystick();
  });
}

if (touchActionBtn) {
  touchActionBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.mode === "playing") triggerContextAction();
  });
}

function clearActiveInputs() {
  canvasPointers.clear();
  orbitPointerId = null;
  lastPinchDist = 0;
  resetJoystick();
  Object.keys(keys).forEach((k) => (keys[k] = false));
}

window.addEventListener("blur", clearActiveInputs);

contextPrompt.addEventListener("click", () => {
  if (state.mode === "playing") triggerContextAction();
});

// UI Buttons
function enterFarm() {
  sfx.init();
  startScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  sellModal.classList.add("hidden");
  shopModal.classList.add("hidden");
  npcModal.classList.add("hidden");
  guideModal.classList.add("hidden");
  hud.classList.remove("hidden");
  state.mode = "playing";
  setActiveSceneVisibility();
  updateSeedHotbarUI();
  updateHUD();
  updateCameraProjection();
  updateCamera(0.016, true);
  renderer.render(scene, camera);
  showDayBanner(`BEM-VINDO A PAU ARCADO, MACHO! PEGUE O 402 NA PORTEIRA P/ VENDER!`);
}

function togglePause() {
  if (state.mode === "playing") {
    clearActiveInputs();
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

startBtn.addEventListener("click", enterFarm);
resetSaveBtn.addEventListener("click", () => {
  resetToNewFarm();
  enterFarm();
});
resumeBtn.addEventListener("click", togglePause);
sleepPauseBtn.addEventListener("click", () => {
  togglePause();
  advanceToNextDay();
});
restartPauseBtn.addEventListener("click", () => {
  resetToNewFarm();
  pauseScreen.classList.add("hidden");
  state.mode = "playing";
  showDayBanner("SÍTIO REINICIADO! BOA COLHEITA, MACHO!");
});
pauseBtn.addEventListener("click", togglePause);
muteBtn.addEventListener("click", toggleMute);
guideHudBtn.addEventListener("click", openGuideModal);
ordersHudBtn.addEventListener("click", openSellModal);
shopHudBtn.addEventListener("click", openShopModal);
closeSellBtn.addEventListener("click", closeSellModal);
closeShopBtn.addEventListener("click", closeShopModal);
closeNpcBtn.addEventListener("click", closeNpcModal);
closeGuideBtn.addEventListener("click", closeGuideModal);

// Update Day/Night Sky & Lighting
const indoorBgColor = new THREE.Color(0x181420);
const rainySkyColor = new THREE.Color(0x526375);

function updateSkyAndTime(dt) {
  state.dayMinutes += dt * 4.5;
  if (state.dayMinutes >= 22 * 60) {
    advanceToNextDay();
    return;
  }

  rainGroup.visible = state.isRainy && state.location !== "room" && state.location !== "etec_inside";
  if (rainGroup.visible) {
    rainGroup.position.set(player.pos.x, 0, player.pos.z);
  }

  if (state.location === "room" || state.location === "etec_inside") {
    scene.background = indoorBgColor;
    scene.fog.color.copy(indoorBgColor);
    sunLight.intensity = 0.65;
    hemiLight.intensity = 0.72;
    return;
  }

  const hour = state.dayMinutes / 60;
  const tDay = THREE.MathUtils.clamp((hour - 6) / 14, 0, 1);
  const sunArc = Math.sin(tDay * Math.PI);

  const morningColor = new THREE.Color(0x9bd6ee);
  const noonColor = new THREE.Color(0x7cc6f2);
  const duskColor = new THREE.Color(0xe68a5c);
  const nightColor = new THREE.Color(0x16213e);

  if (hour < 12) {
    skyColor.lerpColors(morningColor, noonColor, THREE.MathUtils.clamp((hour - 6) / 6, 0, 1));
  } else if (hour < 17.5) {
    skyColor.lerpColors(noonColor, duskColor, THREE.MathUtils.clamp((hour - 15) / 2.5, 0, 1));
  } else {
    skyColor.lerpColors(duskColor, nightColor, THREE.MathUtils.clamp((hour - 17.5) / 2.5, 0, 1));
  }

  if (state.isRainy) {
    skyColor.lerp(rainySkyColor, 0.72);
  }

  scene.background = skyColor;
  scene.fog.color.copy(skyColor);

  sunLight.intensity = (state.isRainy ? 0.55 : 1) * (0.3 + sunArc * 1.05);
  sunLight.position.set(Math.cos(tDay * Math.PI) * 38, 12 + sunArc * 36, 20);
  hemiLight.intensity = 0.35 + sunArc * 0.55;

  const nightFactor = THREE.MathUtils.clamp((hour - 17) / 2.5, 0, 1);
  porchLight.intensity = 0.2 + nightFactor * 1.6;
  windowMat.emissiveIntensity = 0.2 + nightFactor * 0.9;
  lanternMat.emissiveIntensity = 0.35 + nightFactor * 1.0;

  fireflies.forEach((f) => {
    f.mesh.material.opacity = state.isRainy
      ? 0
      : nightFactor * (0.45 + 0.45 * Math.sin(state.animTime * 4 + f.phase));
    f.mesh.position.x = f.base.x + Math.sin(state.animTime * 0.9 + f.phase) * 0.9;
    f.mesh.position.y = f.base.y + Math.sin(state.animTime * 1.4 + f.phase) * 0.35;
  });
}

// Main Game Loop Update
let hudTickAccum = 0;
let lastCtxSignature = "";
const headProjVec = new THREE.Vector3();
const CONTEXT_ICONS = {
  well: "💧",
  coop: "🥚",
  compost: "🌿",
  dog: "🐕",
  shop: "🛒",
  bus_to_term: "🚌",
  bus_to_yard: "🚌",
  train_to_etec: "🚆",
  train_to_term: "🚆",
  enter_etec: "🏫",
  exit_etec: "🚪",
  chem_bench: "🧪",
  pastel: "🥟",
  term_sell: "💰",
  npc: "💬",
  door: "🏠",
  exit_room: "🚪",
  bed: "🛏️",
  manga: "📚",
  etec: "🎒",
};

function updateGame(dt) {
  state.animTime += dt;
  if (state.energyTimer > 0) {
    state.energyTimer = Math.max(0, state.energyTimer - dt);
  }
  if (state.location === "etec" || state.location === "etec_inside") {
    state.visitedEtecToday = true;
  }
  updateSkyAndTime(dt);

  if (keys["KeyQ"]) state.camYaw += 2.0 * dt;
  if (keys["KeyC"]) state.camYaw -= 2.0 * dt;

  let moveX = 0;
  let moveZ = 0;
  if (keys["KeyW"] || keys["ArrowUp"]) moveZ -= 1;
  if (keys["KeyS"] || keys["ArrowDown"]) moveZ += 1;
  if (keys["KeyA"] || keys["ArrowLeft"]) moveX -= 1;
  if (keys["KeyD"] || keys["ArrowRight"]) moveX += 1;

  const hasKb = moveX !== 0 || moveZ !== 0;
  if (!hasKb && joyVec.lengthSq() > 0) {
    moveX = joyVec.x;
    moveZ = joyVec.y;
  }

  const inputVec = new THREE.Vector2(moveX, moveZ);
  const inputLen = inputVec.length();
  const moving = inputLen > 0.01;
  if (moving) {
    const analogScale = hasKb ? 1 : Math.min(1, inputLen);
    inputVec.normalize();
    const sinY = Math.sin(state.camYaw);
    const cosY = Math.cos(state.camYaw);
    const worldMove = new THREE.Vector3(
      inputVec.x * cosY + inputVec.y * sinY,
      0,
      -inputVec.x * sinY + inputVec.y * cosY
    ).normalize();

    const baseSpeed = state.location === "room" ? 5.2 : 7.6;
    const boostMult = (state.isCrazy ? 1.25 : 1.0) * (state.energyTimer > 0 ? 1.32 : 1.0);
    const walkSpeed = baseSpeed * boostMult * analogScale;

    let minX = -20.5;
    let maxX = 20.5;
    let minZ = -19.5;
    let maxZ = 22.5;
    let activeObstacles = obstacles;

    if (state.location === "room") {
      minX = -4.6;
      maxX = 4.6;
      minZ = -3.4;
      maxZ = 3.6;
      activeObstacles = interiorObstacles;
    } else if (state.location === "terminal") {
      minX = -14.2;
      maxX = 10.6;
      minZ = -10.5;
      maxZ = 11.5;
      activeObstacles = terminalObstacles;
    } else if (state.location === "etec") {
      minX = -12.4;
      maxX = 16.0;
      minZ = -5.0;
      maxZ = 11.5;
      activeObstacles = etecObstacles;
    } else if (state.location === "etec_inside") {
      minX = -15.3;
      maxX = 15.3;
      minZ = -12.2;
      maxZ = 12.2;
      activeObstacles = etecInsideObstacles;
    }

    let finalX = THREE.MathUtils.clamp(player.pos.x + worldMove.x * walkSpeed * dt, minX, maxX);
    let finalZ = THREE.MathUtils.clamp(player.pos.z + worldMove.z * walkSpeed * dt, minZ, maxZ);

    // 2-pass AABB obstacle push-out so corners/walls never clip
    for (let iter = 0; iter < 2; iter++) {
      for (const obs of activeObstacles) {
        if (
          finalX + player.radius > obs.minX &&
          finalX - player.radius < obs.maxX &&
          finalZ + player.radius > obs.minZ &&
          finalZ - player.radius < obs.maxZ
        ) {
          const dLeft = Math.abs(finalX - obs.minX);
          const dRight = Math.abs(obs.maxX - finalX);
          const dTop = Math.abs(finalZ - obs.minZ);
          const dBot = Math.abs(obs.maxZ - finalZ);
          const minPen = Math.min(dLeft, dRight, dTop, dBot);
          if (minPen === dLeft) finalX = obs.minX - player.radius;
          else if (minPen === dRight) finalX = obs.maxX + player.radius;
          else if (minPen === dTop) finalZ = obs.minZ - player.radius;
          else finalZ = obs.maxZ + player.radius;
        }
      }
      finalX = THREE.MathUtils.clamp(finalX, minX, maxX);
      finalZ = THREE.MathUtils.clamp(finalZ, minZ, maxZ);
    }
    player.pos.x = finalX;
    player.pos.z = finalZ;
    player.pos.y = getFloorYAt(finalX, finalZ);

    const targetYaw = Math.atan2(worldMove.x, worldMove.z);
    let diff = targetYaw - player.facingYaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    player.facingYaw += diff * Math.min(1, 14 * dt);
  }

  // Animate Macho Character
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.y = player.facingYaw;
  playerMesh.rotation.z = state.isCrazy ? Math.sin(state.animTime * 15) * 0.08 : 0;
  const { leftArm, rightArm, leftLeg, rightLeg } = playerMesh.userData;

  if (state.swingTimer > 0) {
    state.swingTimer = Math.max(0, state.swingTimer - dt);
    rightArm.rotation.x = -1.25 + Math.sin(state.swingTimer * 24) * 0.45;
  } else if (state.isCrazy && !moving) {
    leftArm.rotation.x = -1.8 + Math.sin(state.animTime * 16) * 0.45;
    rightArm.rotation.x = -1.8 + Math.cos(state.animTime * 16) * 0.45;
    leftLeg.rotation.x = Math.sin(state.animTime * 10) * 0.2;
    rightLeg.rotation.x = -Math.sin(state.animTime * 10) * 0.2;
  } else if (moving) {
    const swing = Math.sin(state.animTime * (state.isCrazy ? 16 : 12)) * (state.isCrazy ? 0.85 : 0.65);
    leftArm.rotation.x = swing;
    rightArm.rotation.x = -swing * 0.7;
    leftLeg.rotation.x = -swing;
    rightLeg.rotation.x = swing;
  } else {
    leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, 0, 10 * dt);
    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -0.2, 10 * dt);
    leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, 0, 10 * dt);
    rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, 0, 10 * dt);
  }

  // Modo Coringando (100%): Fala frases cheias de besteiras acima da cabeça!
  if (state.isCrazy) {
    state.coringaTimer -= dt;
    if (state.coringaTimer <= 0) {
      triggerCoringaBurst(false);
    }
    if (coringaBubble) {
      coringaBubble.classList.remove("hidden");
      headProjVec.set(player.pos.x, player.pos.y + 3.35, player.pos.z);
      headProjVec.project(camera);
      const halfPad = Math.min(155, Math.max(85, window.innerWidth * 0.34));
      const sx = THREE.MathUtils.clamp((headProjVec.x * 0.5 + 0.5) * window.innerWidth, halfPad, window.innerWidth - halfPad);
      const sy = THREE.MathUtils.clamp((-headProjVec.y * 0.5 + 0.5) * window.innerHeight, 92, Math.max(100, window.innerHeight - 150));
      coringaBubble.style.left = `${sx}px`;
      coringaBubble.style.top = `${sy}px`;
    }
  } else if (coringaBubble && !coringaBubble.classList.contains("hidden")) {
    coringaBubble.classList.add("hidden");
  }

  // Update Crops Growth (Rain keeps all plots watered!)
  const growMult = getGrowthMultiplier();
  let anyPlotChanged = false;
  plots.forEach((p) => {
    if (!p.unlocked) return;
    if (p.stage === "growing") {
      if (state.isRainy) {
        p.waterTimer = Math.max(p.waterTimer, 12);
      }
      if (p.waterTimer > 0) {
        p.waterTimer = Math.max(0, p.waterTimer - dt);
        const crop = CROPS[p.cropId];
        p.growth += (dt * growMult) / crop.growTime;
        if (p.growth >= 1) {
          p.growth = 1;
          p.stage = "ready";
          anyPlotChanged = true;
          spawnParticles(new THREE.Vector3(p.x, 0.7, p.z), 0xfacc15, 8);
        }
      }
      refreshPlotAppearance(p);
    } else if (p.stage === "ready") {
      p.readyHalo.rotation.y += 2.4 * dt;
      p.readyHalo.position.y = 1.4 + Math.sin(state.animTime * 3.5 + p.index) * 0.14;
      p.cropGroup.rotation.y = Math.sin(state.animTime * 1.6 + p.index) * 0.05;
    }
  });
  if (anyPlotChanged) saveGame();

  // Animate Chickens & Dog Caramelo in the yard
  if (state.location === "yard") {
    chickens.forEach((ch) => {
      if (ch.wait > 0) {
        ch.wait -= dt;
        ch.mesh.rotation.x = Math.sin(state.animTime * 9) > 0.6 ? 0.25 : 0;
        if (ch.wait <= 0) {
          ch.target.set(
            ch.home.x + (Math.random() - 0.5) * 5.5,
            0,
            ch.home.z + (Math.random() - 0.5) * 5.5
          );
        }
      } else {
        ch.mesh.rotation.x = 0;
        const dx = ch.target.x - ch.mesh.position.x;
        const dz = ch.target.z - ch.mesh.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 0.2) {
          ch.wait = 1.5 + Math.random() * 2.5;
        } else {
          ch.mesh.position.x += (dx / dist) * 1.4 * dt;
          ch.mesh.position.z += (dz / dist) * 1.4 * dt;
          ch.mesh.rotation.y = Math.atan2(dx, dz);
        }
      }
    });

    if (dogCaramelo) {
      dogCaramelo.tail.rotation.z = Math.sin(state.animTime * 14) * 0.35;
      if (dogCaramelo.wait > 0) {
        dogCaramelo.wait -= dt;
        if (dogCaramelo.wait <= 0) {
          dogCaramelo.target.set(
            dogCaramelo.home.x + (Math.random() - 0.5) * 5,
            0,
            dogCaramelo.home.z + (Math.random() - 0.5) * 5
          );
        }
      } else {
        const dx = dogCaramelo.target.x - dogCaramelo.mesh.position.x;
        const dz = dogCaramelo.target.z - dogCaramelo.mesh.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 0.25) {
          dogCaramelo.wait = 2 + Math.random() * 2.5;
        } else {
          dogCaramelo.mesh.position.x += (dx / dist) * 2.1 * dt;
          dogCaramelo.mesh.position.z += (dz / dist) * 2.1 * dt;
          dogCaramelo.mesh.rotation.y = Math.atan2(dx, dz);
        }
      }
    }
  }

  // Update Context Prompt only when changed
  const ctx = findCurrentContext();
  const sig = ctx ? `${ctx.key}|${ctx.text}` : "";
  if (sig !== lastCtxSignature) {
    lastCtxSignature = sig;
    if (ctx) {
      contextKey.textContent = ctx.key;
      contextText.textContent = ctx.text;
      contextPrompt.classList.remove("hidden");
      if (touchActionBtn) touchActionBtn.classList.add("ready");
      if (touchActionEmoji) {
        touchActionEmoji.textContent = CONTEXT_ICONS[ctx.type] || (ctx.plot && ctx.plot.stage === "ready" ? "🥬" : "🌱");
      }
    } else {
      contextPrompt.classList.add("hidden");
      if (touchActionBtn) touchActionBtn.classList.remove("ready");
      if (touchActionEmoji) touchActionEmoji.textContent = "🌱";
    }
  }

  hudTickAccum += dt;
  if (hudTickAccum >= 0.4) {
    hudTickAccum = 0;
    updateHUD();
  }
}

function updateAmbient(dt) {
  clouds.forEach((c) => {
    c.mesh.position.x += c.speed * dt;
    if (c.mesh.position.x > 85) c.mesh.position.x = -85;
  });

  if (ceilingFanMesh && state.location === "room") {
    ceilingFanMesh.rotation.y += 3.2 * dt;
  }

  if (rainGroup.visible) {
    for (const drop of rainDrops) {
      drop.position.y -= 26 * dt;
      if (drop.position.y < 0) {
        drop.position.y = 18 + Math.random() * 4;
      }
    }
  }

  for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
    const pt = particlePool[i];
    if (!pt.active) continue;
    pt.life -= dt;
    pt.vel.y -= 11 * dt;
    pt.mesh.position.addScaledVector(pt.vel, dt);
    const ratio = Math.max(0, pt.life / pt.maxLife);
    pt.mesh.material.opacity = ratio;
    pt.mesh.scale.setScalar(Math.max(0.05, ratio));
    if (pt.life <= 0) {
      pt.active = false;
      pt.mesh.visible = false;
    }
  }
}

function updateCamera(dt, immediate = false) {
  if (state.mode === "start" && !immediate) {
    state.camYaw += 0.16 * dt;
  }
  const target =
    state.mode === "start"
      ? new THREE.Vector3(-1, 1.5, -1)
      : player.pos.clone().add(new THREE.Vector3(0, 1.6, 0));

  const dist = state.mode === "start" ? 26 : state.camDist;
  const pitch = state.mode === "start" ? 0.36 : state.camPitch;

  const camX = target.x + Math.sin(state.camYaw) * Math.cos(pitch) * dist;
  const camY = target.y + Math.sin(pitch) * dist;
  const camZ = target.z + Math.cos(state.camYaw) * Math.cos(pitch) * dist;

  if (immediate) {
    camera.position.set(camX, camY, camZ);
  } else {
    camera.position.lerp(
      new THREE.Vector3(camX, camY, camZ),
      state.mode === "start" ? 0.05 : Math.min(1, 10 * dt)
    );
  }
  camera.lookAt(target);
}

// Initialize farm state
const hasSave = loadSavedGame();
if (!hasSave) {
  resetToNewFarm();
} else {
  state.location = "yard";
  player.pos.set(0, 0, -6.5);
  player.facingYaw = 0;
  setActiveSceneVisibility();
  syncUnlockedPlots();
  state.water = getMaxWater();
  rollDailyMarket();
  generateCityOrders();
  resetSaveBtn.classList.remove("hidden");
  saveInfoLine.textContent = `Sítio salvo encontrado: Dia ${state.day} • Caixa ${formatBRL(state.money)} • Título: ${state.activeTitle}`;
  startBtn.textContent = "Continuar no Sítio do Macho";
}
updateHUD();
playerMesh.position.copy(player.pos);
playerMesh.rotation.y = player.facingYaw;
updateSkyAndTime(0);
updateCamera(0.016, true);
renderer.render(scene, camera);

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  updateAmbient(dt);
  if (state.mode === "playing") {
    updateGame(dt);
  }
  updateCamera(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

window.addEventListener("resize", updateCameraProjection);
window.addEventListener("orientationchange", () => {
  updateCameraProjection();
  setTimeout(updateCameraProjection, 160);
});
