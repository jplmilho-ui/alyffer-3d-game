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
  cornCob: new THREE.CylinderGeometry(0.065, 0.075, 0.24, 8),
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

  // Indicador 3D de planta precisando de água (gotinha azul flutuante)
  const dryDrop = new THREE.Mesh(
    new THREE.ConeGeometry(0.13, 0.28, 8),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  dryDrop.position.y = 1.12;
  dryDrop.visible = false;
  group.add(dryDrop);

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
    dryDrop,
    popTimer: 0,
    unlocked: index < 6,
    stage: "raw",
    cropId: null,
    growth: 0,
    waterTimer: 0,
    fertilized: false,
    visualStage: -1,
    visualCropId: null,
  };
}

// Horta principal ampliada: 6x6 = 36 canteiros base (índices 0..35)
for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 6; c++) {
    const idx = r * 6 + c;
    const px = -8.25 + c * 3.1;
    const pz = -6.5 + r * 3.1;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 0;
    plots.push(pl);
  }
}
// +12 Canteiros na Expansão Oeste (Terreno Nível 1: índices 36..47)
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 3; c++) {
    const idx = 36 + r * 3 + c;
    const px = -49.0 + c * 3.3;
    const pz = -5.5 + r * 3.3;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 1;
    pl.unlocked = false;
    pl.group.visible = false;
    plots.push(pl);
  }
}
// +12 Canteiros na Expansão Leste (Terreno Nível 2: índices 48..59)
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 3; c++) {
    const idx = 48 + r * 3 + c;
    const px = 39.5 + c * 3.3;
    const pz = -5.5 + r * 3.3;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 2;
    pl.unlocked = false;
    pl.group.visible = false;
    plots.push(pl);
  }
}

// Construtor 3D de Animais da Fazenda (Vaca, Ovelha e Porco)
function createLivestockMesh(animal) {
  const g = new THREE.Group();
  const type = animal.type;
  const legMeshes = [];
  let headRef = null;
  let woolGroup = null;

  function addPivotedAnimalLeg(lx, hipY, lz, w, h, d, mat) {
    const lg = new THREE.Group();
    lg.position.set(lx, hipY, lz);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.y = -h * 0.5;
    mesh.castShadow = true;
    lg.add(mesh);
    g.add(lg);
    legMeshes.push(lg);
  }

  if (type === "cow") {
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.78 });
    const spotMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.82 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.7 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.6 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.88, 1.65), whiteMat);
    body.position.y = 1.05;
    body.castShadow = true;
    g.add(body);
    [
      [-0.49, 1.12, 0.3],
      [0.49, 0.96, -0.25],
      [0, 1.5, 0.1],
    ].forEach(([sx, sy, sz]) => {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.42), spotMat);
      sp.position.set(sx, sy, sz);
      g.add(sp);
    });
    const udder = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.24, 0.44), pinkMat);
    udder.position.set(0, 0.56, -0.28);
    g.add(udder);
    const head = new THREE.Group();
    head.position.set(0, 1.38, 1.02);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.6, 0.64), whiteMat);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.28, 0.24), pinkMat);
    snout.position.set(0, -0.14, 0.36);
    head.add(skull, snout);
    [-0.24, 0.24].forEach((hx) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.26, 6), hornMat);
      horn.position.set(hx, 0.38, -0.07);
      horn.rotation.z = hx < 0 ? 0.3 : -0.3;
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), spotMat);
      eye.position.set(hx * 0.7, 0.08, 0.33);
      head.add(horn, eye);
    });
    g.add(head);
    headRef = head;
    [
      [-0.32, 0.76, 0.58],
      [0.32, 0.76, 0.58],
      [-0.32, 0.76, -0.58],
      [0.32, 0.76, -0.58],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.2, 0.76, 0.2, spotMat));
  } else if (type === "sheep") {
    const woolMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.95 });
    const shavedMat = new THREE.MeshStandardMaterial({ color: 0xebb3a4, roughness: 0.88 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
    // Corpo tosquiado (sem lã, visível quando animal.sheared === true!)
    const shavedBody = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.54, 0.98), shavedMat);
    shavedBody.position.y = 0.78;
    shavedBody.castShadow = true;
    g.add(shavedBody);

    // Camada de Lã (oculta após tosquia com a tesoura!)
    woolGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.72, 1.15), woolMat);
    body.position.y = 0.82;
    body.castShadow = true;
    const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 1), woolMat);
    puff.position.set(0, 1.02, 0);
    puff.scale.set(1.05, 0.72, 1.25);
    woolGroup.add(body, puff);

    const head = new THREE.Group();
    head.position.set(0, 1.0, 0.72);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.48), darkMat);
    const sEyeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    sEyeL.position.set(-0.12, 0.06, 0.24);
    const sEyeR = sEyeL.clone();
    sEyeR.position.x = 0.12;
    const topWool = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.42), woolMat);
    topWool.position.set(0, 0.25, -0.04);
    head.add(skull, sEyeL, sEyeR);
    woolGroup.add(topWool);
    topWool.position.set(0, 1.25, 0.68);
    woolGroup.visible = !animal.sheared;
    g.add(woolGroup, head);
    headRef = head;
    [
      [-0.24, 0.52, 0.38],
      [0.24, 0.52, 0.38],
      [-0.24, 0.52, -0.38],
      [0.24, 0.52, -0.38],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.15, 0.52, 0.15, darkMat));
  } else {
    // Porco Caipira
    const pigMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.72 });
    const snoutMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.65 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.64, 1.12), pigMat);
    body.position.y = 0.66;
    body.castShadow = true;
    g.add(body);
    const head = new THREE.Group();
    head.position.set(0, 0.84, 0.72);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.5, 0.52), pigMat);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.18), snoutMat);
    snout.position.set(0, -0.08, 0.3);
    head.add(skull, snout);
    [-0.14, 0.14].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.05), eyeMat);
      eye.position.set(ex, 0.08, 0.27);
      head.add(eye);
    });
    g.add(head);
    headRef = head;
    const tail = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 6, 10), pigMat);
    tail.position.set(0, 0.76, -0.6);
    g.add(tail);
    [
      [-0.24, 0.4, 0.36],
      [0.24, 0.4, 0.36],
      [-0.24, 0.4, -0.36],
      [0.24, 0.4, -0.36],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.16, 0.4, 0.16, pigMat));
  }

  const readyHalo = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 })
  );
  readyHalo.position.set(0, 2.25, 0);
  readyHalo.visible = !!animal.hasProduct;
  g.add(readyHalo);


  g.position.set(animal.x, 0, animal.z);
  if (animal.isBaby) g.scale.setScalar(0.65);
  return { mesh: g, legs: legMeshes, head: headRef, woolGroup, readyHalo, animal };
}

function spawnYardChicken(idx, isBaby = false) {
  const henMat = new THREE.MeshStandardMaterial({ color: 0xfef9ef, roughness: 0.8 });
  const combMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
  const hen = new THREE.Group();
  const hBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.54), henMat);
  hBody.position.y = 0.28;
  hBody.castShadow = true;
  const hHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), henMat);
  hHead.position.set(0, 0.52, 0.24);
  const hComb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.14), combMat);
  hComb.position.set(0, 0.67, 0.24);
  const hBeak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 4), beakMat);
  hBeak.rotation.x = Math.PI / 2;
  hBeak.position.set(0, 0.5, 0.4);
  hen.add(hBody, hHead, hComb, hBeak);
  if (isBaby) hen.scale.setScalar(0.65);

  const hx = THREE.MathUtils.clamp(-27.2 + (idx % 4) * 2.1 + (Math.random() - 0.5) * 0.6, -29.2, -18.8);
  const hz = THREE.MathUtils.clamp(-22.8 + Math.floor(idx / 4) * 2.2 + (Math.random() - 0.5) * 0.6, -25.2, -14.2);
  hen.position.set(hx, 0, hz);
  exteriorGroup.add(hen);
  chickens.push({
    mesh: hen,
    home: new THREE.Vector3(-24.2, 0, -19.2),
    target: new THREE.Vector3(hx, 0, hz),
    wait: Math.random() * 2,
    isBaby,
  });
}

function syncChickensToCount(targetCount = 3, babyCount = 0) {
  const count = THREE.MathUtils.clamp(Math.round(targetCount || 3), 1, 12);
  while (chickens.length > 0) {
    const c = chickens.pop();
    if (c && c.mesh) {
      exteriorGroup.remove(c.mesh);
      disposeObject3D(c.mesh);
    }
  }
  for (let i = 0; i < count; i++) {
    const isBaby = babyCount > 0 && i >= count - babyCount;
    spawnYardChicken(i, isBaby);
  }
}

function rebuildLivestockMeshes() {
  while (livestockGroup.children.length > 0) {
    const child = livestockGroup.children[0];
    livestockGroup.remove(child);
    disposeObject3D(child);
  }
  livestockEntities.length = 0;
  state.animals.forEach((a) => {
    if (!a.alive) return;
    const pen = getAnimalPenBounds(a.type);
    a.x = THREE.MathUtils.clamp(a.x, pen.minX, pen.maxX);
    a.z = THREE.MathUtils.clamp(a.z, pen.minZ, pen.maxZ);
    const ent = createLivestockMesh(a);
    ent.target = new THREE.Vector3(a.x, 0, a.z);
    ent.wait = Math.random() * 2;
    livestockGroup.add(ent.mesh);
    livestockEntities.push(ent);
  });
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
    [-0.36, -0.36],
    [0.36, -0.36],
    [-0.36, 0.36],
    [0.36, 0.36],
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
      const isGold = crop.style === "lettuce_gold";
      const isGuloso = crop.style === "lettuce_guloso";
      const scale = (isFull ? 1.0 : 0.62) * (isGuloso ? 1.32 : isGold ? 1.15 : 1.0);
      const outerMat = isGold
        ? new THREE.MeshStandardMaterial({
            color: crop.leafColor,
            emissive: 0xca8a04,
            emissiveIntensity: 0.42,
            metalness: 0.45,
            roughness: 0.25,
          })
        : getCachedMat(crop.leafColor, 0.72);
      const innerMat = isGold
        ? new THREE.MeshStandardMaterial({
            color: crop.color,
            emissive: 0xfacc15,
            emissiveIntensity: 0.55,
            metalness: 0.5,
            roughness: 0.2,
          })
        : getCachedMat(crop.color, 0.65);

      const core = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceCore3 : SHARED_GEOS.lettuceCore2, innerMat);
      core.position.y = 0.22 * scale;
      core.scale.setScalar(isGuloso ? 1.28 : isGold ? 1.12 : 1.0);
      core.castShadow = true;
      plant.add(core);

      const leafCount = crop.style === "lettuce_round" ? 5 : isGuloso ? 8 : 6;
      for (let k = 0; k < leafCount; k++) {
        const ang = (k / leafCount) * Math.PI * 2;
        const leaf = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceLeaf3 : SHARED_GEOS.lettuceLeaf2, outerMat);
        leaf.position.set(Math.cos(ang) * 0.2 * scale, 0.18 * scale, Math.sin(ang) * 0.2 * scale);
        leaf.rotation.y = -ang + Math.PI / 2;
        leaf.rotation.x = crop.style === "lettuce_round" ? 0.28 : 0.55;
        leaf.scale.setScalar(isGuloso ? 1.25 : isGold ? 1.1 : 1.0);
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
    } else if (crop.style === "corn") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.68;
      const stalk = new THREE.Mesh(isFull ? SHARED_GEOS.stem3 : SHARED_GEOS.stem2, getCachedMat(0x16a34a, 0.8));
      stalk.position.y = 0.38 * scale;
      stalk.scale.y = 1.25;
      plant.add(stalk);
      const leafMat = getCachedMat(crop.leafColor, 0.78);
      [-1, 1].forEach((side) => {
        const leaf = new THREE.Mesh(SHARED_GEOS.lettuceLeaf2, leafMat);
        leaf.position.set(side * 0.11, 0.34 * scale, 0);
        leaf.rotation.z = side * -0.7;
        plant.add(leaf);
      });
      if (isFull) {
        const cob = new THREE.Mesh(SHARED_GEOS.cornCob, getCachedMat(crop.color, 0.5));
        cob.position.set(0.08, 0.45, 0.04);
        cob.rotation.z = -0.35;
        plant.add(cob);
      }
    } else if (crop.style === "wheat") {
      const isFull = stageLevel === 3;
      const stalkH = isFull ? 1.0 : 0.6;
      const wMat = getCachedMat(isFull ? crop.color : crop.leafColor, 0.72);
      [-0.08, 0, 0.08].forEach((wx, idx) => {
        const reed = new THREE.Mesh(isFull ? SHARED_GEOS.frond3 : SHARED_GEOS.frond2, wMat);
        reed.position.set(wx, 0.24 * stalkH, (idx - 1) * 0.04);
        reed.rotation.z = (idx - 1) * 0.12;
        plant.add(reed);
      });
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
  } else if (plot.fertilized && plot.waterTimer > 0) {
    plot.soilMat.color.setHex(0x283618); // Terra adubada e molhada
  } else if (plot.waterTimer > 0) {
    plot.soilMat.color.setHex(SOIL_COLORS.watered);
  } else if (plot.fertilized) {
    plot.soilMat.color.setHex(0x544b2c);
  } else {
    plot.soilMat.color.setHex(SOIL_COLORS.tilled);
  }

  plot.readyHalo.visible = plot.unlocked && plot.stage === "ready";
  if (plot.dryDrop) {
    plot.dryDrop.visible =
      plot.unlocked &&
      plot.stage === "growing" &&
      plot.waterTimer <= 0 &&
      !state.isRainy &&
      state.upgrades.autoWaterLevel < 2;
  }

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

