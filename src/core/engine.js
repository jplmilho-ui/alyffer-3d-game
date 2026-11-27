// Three.js Scene & Renderer Setup (with ACES Filmic ToneMapping & sRGB)
const scene = new THREE.Scene();
const skyColor = new THREE.Color(0x87ceeb);
scene.background = skyColor;
scene.fog = new THREE.FogExp2(0x9fd8e8, 0.0055);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.28, 360);

function getResponsiveFov(aspect) {
  return aspect < 1 ? THREE.MathUtils.clamp(55 / Math.pow(Math.max(0.45, aspect), 0.42), 55, 76) : 55;
}

camera.fov = getResponsiveFov(camera.aspect);
camera.updateProjectionMatrix();

const IS_MOBILE_DEVICE =
  (window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(pointer: fine)").matches) ||
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
const MAX_PIXEL_RATIO = IS_MOBILE_DEVICE ? 1.5 : 2;
const SHADOW_MAP_SIZE = IS_MOBILE_DEVICE ? 1024 : 2048;
const SETTINGS_KEY = "macho_horta_3d_settings_v1";
const gameSettings = {
  shadows: IS_MOBILE_DEVICE ? "medium" : "high", // "high" | "medium" | "off"
  rainEnabled: true,
  minimapEnabled: true,
  sensitivity: 1.0, // 0.25..2.50 multiplicador de sensibilidade da câmera/mouse
};
try {
  const savedSet = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
  if (savedSet && typeof savedSet === "object") {
    if (["high", "medium", "off"].includes(savedSet.shadows)) gameSettings.shadows = savedSet.shadows;
    if (typeof savedSet.rainEnabled === "boolean") gameSettings.rainEnabled = savedSet.rainEnabled;
    if (typeof savedSet.minimapEnabled === "boolean") gameSettings.minimapEnabled = savedSet.minimapEnabled;
    if (typeof savedSet.sensitivity === "number" && Number.isFinite(savedSet.sensitivity)) {
      gameSettings.sensitivity = THREE.MathUtils.clamp(savedSet.sensitivity, 0.25, 2.5);
    }
  }
} catch (_) {
  // ignore storage errors
}

function saveGameSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(gameSettings));
  } catch (_) {
    // ignore storage errors
  }
}

function disposeObject3D(root, protectedGeos = null, protectedMats = null) {
  if (!root || typeof root.traverse !== "function") return;
  const disposedGeos = new Set();
  const disposedMats = new Set();
  const disposedTexs = new Set();

  const disposeMat = (mat) => {
    if (!mat || disposedMats.has(mat)) return;
    if (protectedMats && protectedMats.has(mat)) return;
    disposedMats.add(mat);
    const texKeys = ["map", "alphaMap", "aoMap", "bumpMap", "emissiveMap", "envMap", "lightMap", "metalnessMap", "normalMap", "roughnessMap"];
    for (let i = 0; i < texKeys.length; i++) {
      const tex = mat[texKeys[i]];
      if (tex && typeof tex.dispose === "function" && !disposedTexs.has(tex)) {
        disposedTexs.add(tex);
        tex.dispose();
      }
    }
    if (typeof mat.dispose === "function") mat.dispose();
  };

  root.traverse((obj) => {
    if (obj.geometry && typeof obj.geometry.dispose === "function" && !disposedGeos.has(obj.geometry)) {
      if (!protectedGeos || !protectedGeos.has(obj.geometry)) {
        disposedGeos.add(obj.geometry);
        obj.geometry.dispose();
      }
    }
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        for (let i = 0; i < obj.material.length; i++) disposeMat(obj.material[i]);
      } else {
        disposeMat(obj.material);
      }
    }
  });
}

function createRenderer() {
  const attempts = [
    { antialias: !IS_MOBILE_DEVICE, powerPreference: "high-performance" },
    { antialias: false },
  ];
  for (const opts of attempts) {
    try {
      const r = new THREE.WebGLRenderer(opts);
      r.setSize(window.innerWidth, window.innerHeight);
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
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

renderer.domElement.addEventListener("webglcontextlost", (e) => {
  e.preventDefault();
});

function updateCameraProjection() {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const aspect = w / h;
  camera.aspect = aspect;
  camera.fov = getResponsiveFov(aspect);
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  renderer.setSize(w, h);
}

// Lights
const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x2d4c2b, 0.88);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.25);
sunLight.position.set(28, 44, 24);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = SHADOW_MAP_SIZE;
sunLight.shadow.mapSize.height = SHADOW_MAP_SIZE;
sunLight.shadow.camera.near = 2;
sunLight.shadow.camera.far = 140;
const shadowBound = 42;
sunLight.shadow.camera.left = -shadowBound;
sunLight.shadow.camera.right = shadowBound;
sunLight.shadow.camera.top = shadowBound;
sunLight.shadow.camera.bottom = -shadowBound;
sunLight.shadow.bias = -0.0006;
if ("normalBias" in sunLight.shadow) sunLight.shadow.normalBias = 0.045;
scene.add(sunLight);
scene.add(sunLight.target);

function applyGraphicsSettings() {
  const sh = gameSettings.shadows;
  const enabled = sh !== "off";
  renderer.shadowMap.enabled = enabled;
  sunLight.castShadow = enabled;
  const sz = sh === "high" ? 2048 : 1024;
  if (sunLight.shadow.mapSize.width !== sz) {
    sunLight.shadow.mapSize.width = sz;
    sunLight.shadow.mapSize.height = sz;
    if (sunLight.shadow.map) {
      sunLight.shadow.map.dispose();
      sunLight.shadow.map = null;
    }
  }
  renderer.shadowMap.needsUpdate = true;
  if (typeof minimapWrap !== "undefined" && minimapWrap) {
    minimapWrap.classList.toggle("hidden", !gameSettings.minimapEnabled);
  }
}
applyGraphicsSettings();

const porchLight = new THREE.PointLight(0xffb74d, 0.4, 22);
porchLight.position.set(0, 3.6, -13.5);
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
  if (!line2) {
    ctx.font = "800 84px 'Space Grotesk', sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillText(line1, 384, 124, 710);
    ctx.textBaseline = "alphabetic";
  } else {
    ctx.font = "bold 62px 'Space Grotesk', sans-serif";
    ctx.fillText(line1, 384, 106, 710);

    ctx.fillStyle = "#86efac";
    ctx.font = "600 38px 'Inter', sans-serif";
    ctx.fillText(line2, 384, 180, 710);
  }

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createWornConcreteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Base cinza concreto cru sem pintura
  ctx.fillStyle = "#949994";
  ctx.fillRect(0, 0, 512, 512);

  // Manchas de desgaste e sujeira do tempo
  let s = 424242;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  for (let i = 0; i < 140; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const r = 10 + rnd() * 48;
    const shade = Math.floor(124 + rnd() * 42);
    ctx.fillStyle = `rgba(${shade}, ${shade + 2}, ${shade - 2}, ${0.08 + rnd() * 0.14})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Granulado áspero de cimento
  for (let i = 0; i < 1200; i++) {
    const x = rnd() * 512;
    const y = rnd() * 512;
    const dark = rnd() > 0.5;
    ctx.fillStyle = dark ? "rgba(55,60,55,0.16)" : "rgba(215,220,215,0.14)";
    ctx.fillRect(x, y, 2 + rnd() * 3, 2 + rnd() * 3);
  }

  // Juntas de dilatação e rachaduras finas no piso desgastado
  ctx.strokeStyle = "rgba(62,66,62,0.34)";
  ctx.lineWidth = 2;
  for (let g = 128; g < 512; g += 128) {
    ctx.beginPath();
    ctx.moveTo(0, g);
    ctx.lineTo(512, g);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(g, 0);
    ctx.lineTo(g, 512);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(48,52,48,0.42)";
  ctx.lineWidth = 1.4;
  for (let c = 0; c < 14; c++) {
    let cx = rnd() * 512;
    let cy = rnd() * 512;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    for (let st = 0; st < 6; st++) {
      cx += (rnd() - 0.5) * 38;
      cy += (rnd() - 0.5) * 38;
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 4);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}


function _setupRepeatTex(canvas, rx = 4, ry = 4) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(rx, ry);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createWoodPlankTexture(baseHex = "#8b5a2b", darkHex = "#5c3a1a", rx = 4, ry = 4) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  const plankH = 32;
  let s = 1337;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };

  for (let row = 0; row < 8; row++) {
    const y = row * plankH;
    // Slight per-plank tonal variation
    ctx.fillStyle = rnd() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
    ctx.fillRect(0, y, 256, plankH);
    // Fine wood grain lines
    ctx.strokeStyle = darkHex;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 1;
    for (let g = 0; g < 6; g++) {
      const gy = y + 3 + rnd() * (plankH - 6);
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(85, gy + (rnd() - 0.5) * 4, 170, gy + (rnd() - 0.5) * 4, 256, gy);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Horizontal plank seam
    ctx.fillStyle = "rgba(24,14,6,0.45)";
    ctx.fillRect(0, y, 256, 2);
    // Vertical staggered joint
    const jx = ((row * 97 + 40) % 210) + 20;
    ctx.fillRect(jx, y, 2, plankH);
  }
  return _setupRepeatTex(c, rx, ry);
}

function createRoofTileTexture(baseHex = "#b4532a", shadeHex = "#7c2d12", rx = 6, ry = 4) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  const cols = 8;
  const rows = 8;
  const tw = 256 / cols;
  const th = 256 / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tw + (r % 2) * (tw * 0.5) - tw * 0.5;
      const y = r * th;
      const grad = ctx.createLinearGradient(x, y, x + tw, y + th);
      grad.addColorStop(0, baseHex);
      grad.addColorStop(0.7, baseHex);
      grad.addColorStop(1, shadeHex);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, tw, th);
      ctx.strokeStyle = "rgba(40,15,5,0.38)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + tw * 0.5, y + th * 0.72, tw * 0.48, 0, Math.PI);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(35,12,4,0.28)";
    ctx.fillRect(0, r * th, 256, 2);
  }
  return _setupRepeatTex(c, rx, ry);
}

function createGrassTexture(baseHex = "#4f923e", patchHex = "#3f7d31", rx = 18, ry = 18) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  let s = 77711;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };

  for (let i = 0; i < 65; i++) {
    ctx.fillStyle = rnd() > 0.45 ? patchHex : "#62a84b";
    ctx.globalAlpha = 0.22 + rnd() * 0.18;
    ctx.beginPath();
    ctx.arc(rnd() * 256, rnd() * 256, 8 + rnd() * 24, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.28;
  for (let i = 0; i < 420; i++) {
    ctx.fillStyle = rnd() > 0.5 ? "#84cc16" : "#2d5e22";
    const gx = rnd() * 256;
    const gy = rnd() * 256;
    ctx.fillRect(gx, gy, 2, 4 + rnd() * 4);
  }
  ctx.globalAlpha = 1;
  return _setupRepeatTex(c, rx, ry);
}

function createDirtRoadTexture(rx = 2, ry = 14) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#9b7248";
  ctx.fillRect(0, 0, 256, 256);

  // Subtle tire ruts
  ctx.fillStyle = "rgba(85,55,28,0.22)";
  ctx.fillRect(46, 0, 38, 256);
  ctx.fillRect(172, 0, 38, 256);

  let s = 9191;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < 450; i++) {
    const shade = rnd();
    ctx.fillStyle = shade > 0.65 ? "rgba(218,186,144,0.32)" : shade > 0.3 ? "rgba(92,62,34,0.28)" : "rgba(120,113,108,0.35)";
    const r = 1.5 + rnd() * 3.5;
    ctx.beginPath();
    ctx.arc(rnd() * 256, rnd() * 256, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return _setupRepeatTex(c, rx, ry);
}

function createStuccoWallTexture(baseHex = "#f5ecd9", speckHex = "#d6c8ad", rx = 3, ry = 2) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  let s = 5151;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = rnd() > 0.5 ? speckHex : "rgba(255,255,255,0.25)";
    ctx.globalAlpha = 0.16 + rnd() * 0.14;
    ctx.fillRect(rnd() * 256, rnd() * 256, 2 + rnd() * 5, 2 + rnd() * 5);
  }
  ctx.globalAlpha = 1;
  return _setupRepeatTex(c, rx, ry);
}

function createCorrugatedMetalTexture(baseHex = "#9ca3af", rx = 6, ry = 4) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 256; x += 16) {
    const grad = ctx.createLinearGradient(x, 0, x + 16, 0);
    grad.addColorStop(0, "rgba(255,255,255,0.22)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.22)");
    grad.addColorStop(1, "rgba(255,255,255,0.22)");
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, 16, 256);
  }
  return _setupRepeatTex(c, rx, ry);
}

function createAsphaltTexture(rx = 8, ry = 2) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#334155";
  ctx.fillRect(0, 0, 256, 256);
  let s = 3030;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = rnd() > 0.5 ? "rgba(203,213,225,0.12)" : "rgba(15,23,42,0.22)";
    ctx.fillRect(rnd() * 256, rnd() * 256, 2, 2);
  }
  return _setupRepeatTex(c, rx, ry);
}

function createTvScreenTexture(title = "ETECAMP • AULA", sub = "Centro Paula Souza", accent = "#38bdf8") {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 512, 256);
  grad.addColorStop(0, "#0f172a");
  grad.addColorStop(1, "#1e293b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 512, 16);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(28, 42, 456, 174);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "800 34px Space Grotesk, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, 256, 122);

  ctx.fillStyle = accent;
  ctx.font = "700 22px Inter, sans-serif";
  ctx.fillText(sub, 256, 166);

  const tex = new THREE.CanvasTexture(c);
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

const basementGroup = new THREE.Group();
basementGroup.visible = false;
scene.add(basementGroup);

const rainGroup = new THREE.Group();
rainGroup.visible = false;
scene.add(rainGroup);
const rainDrops = [];
let rainInstancedMesh = null;
const _rainDummy = new THREE.Object3D();

const clouds = [];
const chickens = [];
const fireflies = [];
const obstacles = []; // Yard AABB colliders
const interiorObstacles = []; // House AABB colliders
const basementObstacles = []; // Secret Basement AABB colliders
const terminalObstacles = []; // Terminal + Station AABB colliders
const etecObstacles = []; // ETEC courtyard AABB colliders
const etecInsideObstacles = []; // ETEC large indoor school AABB colliders
const etecNpcs = [];
const basementClones = [];
const classroomFans = [];

let windowMat;
let lanternMat;
let wellWaterMesh;
let bus402YardMesh;
let bus402TermMesh;
let termJaguarMesh;
let secretTrapdoorMesh;
let ceilingFanMesh;
let dogOrelha;
let jaguarEntity;
let tamedJaguarEntity;
let marceloYardEntity;
let jessyEntity;
let alligatorEntity = null;
let maluquinhoEntity;
const LAKE_CENTER_X = 63.0;
const LAKE_CENTER_Z = -10.0;
const LAKE_WATER_RADIUS = 7.4;
const LAKE_DEEP_RADIUS = 4.2;
const LAKE_MAX_DEPTH = 1.68;
const LAKE_WATER_Y = -0.1;
let yardChestLidPivot = null;
const thrownEggs = [];
const shotgunPellets = [];
let yardBusClock = null;
let termBusClock = null;
let refeitorioDisplay = null;
let westOriginalFenceGroup;
let eastOriginalFenceGroup;
let expansionWestGroup;
let expansionEastGroup;
const livestockGroup = new THREE.Group();
const livestockEntities = [];
let hoeBladeMat;
let fpHoeBladeMat;
let coopEggVisuals = [];
let sprinklerGroup;
const sprinklerHeads = [];
let etecAutoGateMesh = null;
let etecAutoGateCollider = null;
let etecAutoGateLightMat = null;
let etecAutoGateOpen = 0;
let etecAutoRoofGroup = null;
let etecRobotPivot = null;
let etecRobotArm = null;
const etecConveyorBoxes = [];
let etecBall = null;

function addObstacleBox(cx, cz, w, d, targetList = obstacles, extra = null) {
  const box = {
    minX: cx - w / 2,
    maxX: cx + w / 2,
    minZ: cz - d / 2,
    maxZ: cz + d / 2,
  };
  if (extra && typeof extra === "object") Object.assign(box, extra);
  targetList.push(box);
  return box;
}

// Helper compartilhado de colisão AABB sólida (para Orelha, Menino Maluquinho e demais NPCs!)
function resolveEntityObstacles(pos, radius, obsList, vel = null, entityY = 0) {
  let hit = false;
  for (let iter = 0; iter < 2; iter++) {
    for (let i = 0; i < obsList.length; i++) {
      const obs = obsList[i];
      if (obs.isActive && !obs.isActive()) continue;
      if (obs.jumpable && entityY >= 1.55) continue;
      if (
        pos.x + radius > obs.minX &&
        pos.x - radius < obs.maxX &&
        pos.z + radius > obs.minZ &&
        pos.z - radius < obs.maxZ
      ) {
        hit = true;
        const dLeft = Math.abs(pos.x - obs.minX);
        const dRight = Math.abs(obs.maxX - pos.x);
        const dTop = Math.abs(pos.z - obs.minZ);
        const dBot = Math.abs(obs.maxZ - pos.z);
        const minPen = Math.min(dLeft, dRight, dTop, dBot);
        if (minPen === dLeft) {
          pos.x = obs.minX - radius;
          if (vel && vel.x > 0) vel.x = -vel.x * 0.48;
        } else if (minPen === dRight) {
          pos.x = obs.maxX + radius;
          if (vel && vel.x < 0) vel.x = -vel.x * 0.48;
        } else if (minPen === dTop) {
          pos.z = obs.minZ - radius;
          if (vel && vel.z > 0) vel.z = -vel.z * 0.48;
        } else {
          pos.z = obs.maxZ + radius;
          if (vel && vel.z < 0) vel.z = -vel.z * 0.48;
        }
      }
    }
  }
  return hit;
}

// Painel/Relógio Digital 3D do Ônibus 402 (montado no Ponto de Pau Arcado e no Terminal CLP!)
function createBusClockDisplay(headerTitle = "PONTO 402 • PAU ARCADO", doubleSided = false) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;

  const group = new THREE.Group();
  const housingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.55, roughness: 0.35 });
  const screenMat = new THREE.MeshBasicMaterial({ map: tex });
  const box = new THREE.Mesh(new THREE.BoxGeometry(2.55, 1.28, 0.2), housingMat);
  box.castShadow = true;
  group.add(box);

  const frontScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.38, 1.12), screenMat);
  frontScreen.position.z = 0.106;
  group.add(frontScreen);

  if (doubleSided) {
    const backScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.38, 1.12), screenMat);
    backScreen.rotation.y = Math.PI;
    backScreen.position.z = -0.106;
    group.add(backScreen);
  }

  let lastSig = "";
  const update = (direction) => {
    if (typeof state === "undefined" || typeof getBus402Status !== "function") return;
    const clockStr = formatHHMM(state.dayMinutes);
    let mainLine = "";
    let subLine = "";
    let accent = "#fde047";

    if (state.isRainy) {
      mainLine = "CHUVA • PARADO";
      subLine = "Sem ônibus 402 hoje";
      accent = "#fb923c";
    } else {
      const st = getBus402Status(direction);
      if (st.available) {
        mainLine = "402 NO PONTO!";
        subLine = `Saída ${st.activeTime} • Embarque (E)`;
        accent = "#4ade80";
      } else if (st.nextTime) {
        mainLine = `FALTA ${st.minsUntilNext} MIN`;
        subLine = `Próximo 402 às ${st.nextTime}`;
        accent = "#fde047";
      } else {
        mainLine = "ENCERRADO HOJE";
        subLine = "Primeiro 402 amanhã 06:00";
        accent = "#f87171";
      }
    }

    const sig = `${clockStr}|${mainLine}|${subLine}`;
    if (sig === lastSig) return;
    lastSig = sig;

    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Moldura LED interna
    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    // Cabeçalho superior com relógio atual
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(14, 14, canvas.width - 28, 52);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 22px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(headerTitle, 28, 48);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "800 28px Space Grotesk, monospace";
    ctx.textAlign = "right";
    ctx.fillText(`🕒 ${clockStr}`, canvas.width - 28, 49);

    // Contagem regressiva principal
    ctx.fillStyle = accent;
    ctx.font = "800 50px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(mainLine, canvas.width / 2, 148);

    // Subtítulo com horário
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "700 26px Inter, sans-serif";
    ctx.fillText(subLine, canvas.width / 2, 210);

    tex.needsUpdate = true;
  };

  return { group, update };
}

// Vehicle Builders Reformulados (Ônibus Urbano Detalhado & Trem CPTM Linha 7-Rubi — Zero Z-Fighting!)
function createBusModel(lineTitle = "402 PAU ARCADO", subTitle = "Rápido Campinas", bodyColor = 0x1d4ed8) {
  const bus = new THREE.Group();
  const topMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.36 });
  const lowerMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.42, metalness: 0.12 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.72 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.75, roughness: 0.25 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.72, roughness: 0.14 });
  const hlMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
  const tlMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });

  // Chassi inferior + faixa lateral + corpo superior empilhados sem faces coplanares
  const lower = new THREE.Mesh(new THREE.BoxGeometry(2.54, 1.18, 6.7), lowerMat);
  lower.position.y = 1.04;
  lower.castShadow = true;
  const midStripe = new THREE.Mesh(new THREE.BoxGeometry(2.58, 0.14, 6.74), stripeMat);
  midStripe.position.y = 1.66;
  const upper = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.3, 6.64), topMat);
  upper.position.y = 2.38;
  upper.castShadow = true;
  const roofCap = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.12, 6.45), topMat);
  roofCap.position.y = 3.08;
  const acUnit = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.24, 2.3), steelMat);
  acUnit.position.set(0, 3.24, -0.2);
  bus.add(lower, midStripe, upper, roofCap, acUnit);

  // Para-choques dianteiro e traseiro + grade + faróis + lanternas
  const bumpF = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 0.2), darkMat);
  bumpF.position.set(0, 0.62, -3.4);
  const bumpR = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 0.2), darkMat);
  bumpR.position.set(0, 0.62, 3.4);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.36, 0.06), darkMat);
  grille.position.set(0, 1.06, -3.38);
  bus.add(bumpF, bumpR, grille);

  [-0.9, 0.9].forEach((lx) => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.2, 0.06), hlMat);
    hl.position.set(lx, 1.02, -3.38);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.06), tlMat);
    tl.position.set(lx, 1.12, 3.38);
    const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 0.06), darkMat);
    mirrorArm.position.set(lx > 0 ? 1.36 : -1.36, 2.35, -3.12);
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.14), darkMat);
    mirror.position.set(lx > 0 ? 1.48 : -1.48, 2.22, -3.12);
    bus.add(hl, tl, mirrorArm, mirror);
  });

  // Janelas laterais individuais com colunas + porta de embarque
  [-2.2, -0.75, 0.7, 2.15].forEach((wz) => {
    [-1.27, 1.27].forEach((sx) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.84, 1.22), glassMat);
      win.position.set(sx, 2.34, wz);
      bus.add(win);
    });
  });
  // Porta frontal direita
  const doorF = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.9, 0.92), glassMat);
  doorF.position.set(1.28, 1.56, -2.52);
  bus.add(doorF);

  // Para-brisa dianteiro e vidro traseiro
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.22, 0.92, 0.06), glassMat);
  windshield.position.set(0, 2.24, -3.35);
  const rearWin = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.72, 0.06), glassMat);
  rearWin.position.set(0, 2.34, 3.35);
  bus.add(windshield, rearWin);

  // Letreiros LED dianteiro e traseiro claramente destacados da carroceria
  const ledTex = createWoodSignTexture(lineTitle, subTitle, "#09090b", "#facc15");
  const ledMat = new THREE.MeshBasicMaterial({ map: ledTex });
  const ledBack = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 0.4), ledMat);
  ledBack.position.set(0, 2.86, -3.37);
  ledBack.rotation.y = Math.PI;
  const ledFront = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 0.4), ledMat);
  ledFront.position.set(0, 2.86, 3.37);
  bus.add(ledBack, ledFront);

  // Rodas com calotas metálicas
  [[-1.2, 0.46, -2.05], [1.2, 0.46, -2.05], [-1.2, 0.46, 2.05], [1.2, 0.46, 2.05]].forEach(([wx, wy, wz]) => {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.34, 14), wheelMat);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(wx, wy, wz);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.37, 10), steelMat);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(wx, wy, wz);
    bus.add(tire, hub);
  });

  return bus;
}

function createTrain7RubiModel(label = "LINHA 7-RUBI") {
  const train = new THREE.Group();
  const steelMat = new THREE.MeshStandardMaterial({
    map: createCorrugatedMetalTexture("#cbd5e1", 1, 8),
    metalness: 0.62,
    roughness: 0.28,
  });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.5, roughness: 0.42 });
  // Vermelho vivo puro para o trem (sem puxar para rosa no ACES ToneMapping!)
  const trainRedMat = new THREE.MeshStandardMaterial({ color: 0xd91616, roughness: 0.35, metalness: 0.08 });
  const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.45, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.12 });
  const doorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.55, roughness: 0.26 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.7, roughness: 0.35 });
  const hlMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
  const redLightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 2 carros completos acoplados por sanfona (comprimento total ~27m, super detalhado!)
  const carLen = 13.0;
  const carPositions = [-6.9, 6.9];

  carPositions.forEach((cz, carIdx) => {
    const carGrp = new THREE.Group();
    carGrp.position.set(0, 0, cz);

    // Chassi inferior escuro + equipamentos sob o vagão
    const under = new THREE.Mesh(new THREE.BoxGeometry(2.86, 0.52, carLen - 0.3), darkTrimMat);
    under.position.y = 0.76;
    carGrp.add(under);

    // 2 Truques (bogies) com 4 rodas de aço por vagão
    [-4.1, 4.1].forEach((bz) => {
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.36, 2.3), darkTrimMat);
      bogie.position.set(0, 0.48, bz);
      carGrp.add(bogie);
      [-0.75, 0.75].forEach((wzOff) => {
        [-1.02, 1.02].forEach((wx) => {
          const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 14), wheelMat);
          wh.rotation.z = Math.PI / 2;
          wh.position.set(wx, 0.42, bz + wzOff);
          carGrp.add(wh);
        });
      });
    });

    // Corpo metálico escovado + teto chanfrado + faixa Rubi CPTM!
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.16, 2.75, carLen), steelMat);
    body.position.y = 2.38;
    body.castShadow = true;
    carGrp.add(body);

    const roofCrown = new THREE.Mesh(new THREE.BoxGeometry(2.84, 0.22, carLen - 0.15), roofMat);
    roofCrown.position.y = 3.84;
    carGrp.add(roofCrown);

    // Faixas horizontais VERMELHAS no trem (deslocadas 0.03m para fora — zero z-fighting!)
    [-1.6, 1.6].forEach((sx) => {
      const redBand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.56, carLen - 0.08), trainRedMat);
      redBand.position.set(sx, 1.54, 0);
      const topRed = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, carLen - 0.08), trainRedMat);
      topRed.position.set(sx, 3.52, 0);
      carGrp.add(redBand, topRed);
    });

    // 3 Portas duplas deslizantes + 4 Janelas panorâmicas por lado!
    [-3.8, 0, 3.8].forEach((dz) => {
      [-1.605, 1.605].forEach((sx) => {
        const dLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.08, 1.32), doorMat);
        dLeaf.position.set(sx, 2.15, dz);
        const dSeam = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.08, 0.04), darkTrimMat);
        dSeam.position.set(sx, 2.15, dz);
        const dWinL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.85, 0.44), glassMat);
        dWinL.position.set(sx, 2.52, dz - 0.32);
        const dWinR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.85, 0.44), glassMat);
        dWinR.position.set(sx, 2.52, dz + 0.32);
        carGrp.add(dLeaf, dSeam, dWinL, dWinR);
      });
    });
    [-5.35, -1.9, 1.9, 5.35].forEach((wz) => {
      [-1.605, 1.605].forEach((sx) => {
        const wFrame = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.04, 1.68), darkTrimMat);
        wFrame.position.set(sx, 2.56, wz);
        const wPane = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.9, 1.54), glassMat);
        wPane.position.set(sx, 2.56, wz);
        carGrp.add(wFrame, wPane);
      });
    });

    // Unidades de Ar-Condicionado no teto
    [-3.2, 3.2].forEach((az) => {
      const ac = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.32, 2.85), roofMat);
      ac.position.set(0, 4.08, az);
      const acVent = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 2.4), darkTrimMat);
      acVent.position.set(0, 4.25, az);
      carGrp.add(ac, acVent);
    });

    // Pantógrafo no teto do vagão 1
    if (carIdx === 0) {
      const pBase = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.14, 1.3), darkTrimMat);
      pBase.position.set(0, 4.02, 0);
      const pArm1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.55), trainRedMat);
      pArm1.position.set(0, 4.46, -0.3);
      pArm1.rotation.x = 0.62;
      const pArm2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.55), trainRedMat);
      pArm2.position.set(0, 5.1, -0.25);
      pArm2.rotation.x = -0.62;
      const pBar = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.07, 0.12), steelMat);
      pBar.position.set(0, 5.46, 0.32);
      carGrp.add(pBase, pArm1, pArm2, pBar);
    }

    // Cabines aerodinâmicas nas duas pontas do trem!
    const isFront = carIdx === 1;
    const endZ = isFront ? carLen / 2 : -carLen / 2;
    const dirZ = isFront ? 1 : -1;
    // Cabine limpa SEM placa no topo, com frente vermelha + para-brisa amplo!
    const cabMask = new THREE.Mesh(new THREE.BoxGeometry(3.18, 2.75, 0.24), darkTrimMat);
    cabMask.position.set(0, 2.38, endZ + dirZ * 0.1);
    const cabRedLower = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.72, 0.28), trainRedMat);
    cabRedLower.position.set(0, 1.46, endZ + dirZ * 0.12);
    const cabRedTop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 0.28), trainRedMat);
    cabRedTop.position.set(0, 3.56, endZ + dirZ * 0.12);
    const cabWin = new THREE.Mesh(new THREE.BoxGeometry(2.74, 1.24, 0.1), glassMat);
    cabWin.position.set(0, 2.66, endZ + dirZ * 0.22);
    const coupler = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.36, 0.55), darkTrimMat);
    coupler.position.set(0, 0.9, endZ + dirZ * 0.35);
    carGrp.add(cabMask, cabRedLower, cabRedTop, cabWin, coupler);

    [-1.08, 1.08].forEach((hx) => {
      const hl = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 10), hlMat);
      hl.rotation.x = Math.PI / 2;
      hl.position.set(hx, 1.48, endZ + dirZ * 0.27);
      const rl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 8), redLightMat);
      rl.rotation.x = Math.PI / 2;
      rl.position.set(hx * 0.72, 1.48, endZ + dirZ * 0.27);
      carGrp.add(hl, rl);
    });

    train.add(carGrp);
  });

  // Sanfona articulada ligando os dois vagões
  const gangway = new THREE.Mesh(new THREE.BoxGeometry(2.45, 2.45, 0.92), darkTrimMat);
  gangway.position.set(0, 2.32, 0);
  train.add(gangway);

  return train;
}
