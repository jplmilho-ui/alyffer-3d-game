function createDefaultPhoneState() {
  return {
    unread: 3,
    resenhaFollowers: 44, // Referência fiel ao @only_resenha_
    resenhaPostsCount: 600, // Referência fiel aos 600 posts
    likedIds: [],
    userPosts: [],
    postedFakeToday: false,
    instaLikes: {},
    userInstaPosts: [],
    postedInstaToday: false,
    zapReplies: {},
    gameHighScore: 0,
  };
}

// Game State
const state = {
  mode: "start", // start | playing | paused | modal
  location: "yard", // yard | room | basement | terminal | etec | etec_inside
  basementStep: 0,
  basementUnlocked: false,
  machoSkin: "clone_classic",
  money: 40,
  day: 1,
  dayMinutes: 7 * 60, // 07:00
  isRainy: false,
  reputation: 1,
  insanity: 0,
  isCrazy: false,
  isLambiHomem: false,
  lambiTriggeredDay: 0,
  lambiUntilDay: 0,
  knockedNpcs: {},
  visitedEtecToday: false,
  coringaTimer: 0,
  currentCoringaLine: "",
  energyTimer: 0, // Speed boost from Pastel/Caldo de Cana or Coffee
  vaselina: 0, // Frascos de Vaselina do Marcelo
  vaselinaTimer: 0, // Boost turbinado de velocidade da Vaselina!
  npkDoneToday: false,
  automationDoneToday: false,
  goalScoredToday: false,
  merendaTakenToday: 0,
  coopEggs: 2, // Fresh eggs ready in the chicken coop
  chickenCount: 3,
  chickenLove: 0,
  felixStep: 0,
  paoStep: 0,
  titles: ["Estudante ETEC"],
  activeTitle: "Estudante ETEC",
  selectedCrop: "alface_crespa",
  equippedTool: "hoe", // "water" (Regador) | "hoe" (Enxada) | "item" (outro item/mão vazia)
  slots: null, // 45 slots unificados (0..8 Hotbar, 9..44 Mochila)
  chestSlots: null, // 36 slots do Baú do Sítio (stack ilimitado)
  activeHotbarSlot: 0,
  playerHp: 100,
  maxHp: 100,
  isSleeping: false,
  jaguar: {
    active: false,
    hp: 100,
    maxHp: 100,
    attackCd: 0,
    hitFlash: 0,
    spawnCooldown: 150,
    checkAccum: 0,
    slowTimer: 0,
    burnTimer: 0,
    targetAnimalId: null,
  },
  jaguarDefeated: false, // Onça derrotada e caída, aguardando ser domada
  jaguarDownPos: { x: 0, z: 0 },
  jaguarDownTimer: 0,
  hasTamedJaguar: false,
  tamedJaguarHp: 120,
  tamedJaguarMaxHp: 120,
  tamedJaguarDown: false,
  tamedJaguarRecoverTimer: 0,
  ridingJaguar: false,
  marceloHired: false,
  marceloDaysLeft: 0,
  ownedHoes: ["comum"],
  activeHoe: "comum",
  landLevel: 0,
  animals: [],
  nextAnimalId: 1,
  maluquinho: {
    active: false,
    tormentCd: 0,
    bubbleTimer: 0,
    currentLine: "",
    announced: false,
  },
  water: 8,
  kaioAdubo: 0,
  kaioSuperAdubo: 0,
  workEndNotifiedToday: false,
  autoWaterAccum: 0,
  firstPerson: false,
  fpPitch: 0,
  upgrades: {
    plotTier: 0,
    westPlotTier: 0,
    eastPlotTier: 0,
    canLevel: 1,
    fertLevel: 1,
    standLevel: 1,
    autoWaterLevel: 0,
  },
  inventory: {
    alface_crespa: 0,
    alface_americana: 0,
    alface_roxa: 0,
    tomate: 0,
    cenoura: 0,
    morango: 0,
    alface_guloso: 0,
    alface_dourado: 0,
    milho: 0,
    trigo: 0,
    ovo_caipira: 0,
    leite_fresco: 0,
    la_ovelha: 0,
    trufa_porco: 0,
    salada_macho: 0,
    omelete_caipira: 0,
    vitamina_morango: 0,
    risoto_trufa: 0,
    balde: 0,
    tesoura: 0,
  },
  dailyMult: {},
  hotCropId: "alface_crespa",
  orders: [],
  dailyGoals: [],
  phone: createDefaultPhoneState(),
  camYaw: 0.2,
  camPitch: 0.48,
  camDist: 16.5,
  animTime: 0,
  swingTimer: 0,
  shotgunMag: 0,
  shotgunRecoilTimer: 0,
  shotgunPumpTimer: 0,
  shotgunReloadPhase: "idle", // "idle" | "loading" | "pump"
  shotgunReloadTimer: 0,
  shotgunReloadQueue: 0,
};
const SHOTGUN_MAG_SIZE = 6;

const player = {
  pos: new THREE.Vector3(0, 0, -11.5),
  facingYaw: 0,
  radius: 0.45,
  vy: 0,
  jumpOffset: 0,
};

function getMaxWater() {
  return [8, 12, 18, 25][state.upgrades.canLevel - 1] || 25;
}

function getGrowthMultiplier() {
  const base = 1 + (state.upgrades.fertLevel - 1) * 0.25;
  const irrBonus = state.upgrades.autoWaterLevel >= 2 ? 1.15 : 1.0;
  return base * irrBonus;
}

function getDoubleHarvestChance() {
  const hoe = HOES[state.activeHoe] || HOES.comum;
  return (state.upgrades.fertLevel - 1) * 0.16 + (hoe.doubleBonus || 0);
}

function getActiveHoe() {
  return HOES[state.activeHoe] || HOES.comum;
}

function getFarmBounds() {
  return {
    minX: state.landLevel >= 1 ? -52.5 : -32.5,
    maxX: state.landLevel >= 2 ? 52.5 : 32.5,
  };
}

const ANIMAL_PENS = {
  cow: { minX: 19.0, maxX: 29.8, minZ: -2.4, maxZ: 9.8 },
  pig: { minX: -29.8, maxX: -19.0, minZ: 15.6, maxZ: 25.8 },
  sheep: { minX: -11.4, maxX: 4.8, minZ: 17.2, maxZ: 25.8 },
};

function getAnimalPenBounds(type) {
  return ANIMAL_PENS[type] || ANIMAL_PENS.cow;
}

function getMaxAnimals() {
  return 6 + state.landLevel * 5;
}

function getAnimalSpawnPos(type = "cow") {
  const pen = getAnimalPenBounds(type);
  return {
    x: pen.minX + Math.random() * (pen.maxX - pen.minX),
    z: pen.minZ + Math.random() * (pen.maxZ - pen.minZ),
  };
}

function applyHoeVisual() {
  const hoe = getActiveHoe();
  [hoeBladeMat, fpHoeBladeMat].forEach((mat) => {
    if (!mat) return;
    mat.color.setHex(hoe.bladeColor);
    mat.emissive.setHex(hoe.emissive);
    mat.emissiveIntensity = hoe.emissiveIntensity;
  });
}

function syncLandExpansion() {
  if (sprinklerGroup) {
    sprinklerGroup.visible = state.upgrades.autoWaterLevel >= 1;
    sprinklerHeads.forEach((sh) => {
      if (sh.mesh) sh.mesh.visible = (sh.landReq || 0) <= (state.landLevel || 0);
    });
  }
  if (expansionWestGroup) expansionWestGroup.visible = state.landLevel >= 1;
  if (expansionEastGroup) expansionEastGroup.visible = state.landLevel >= 2;
  if (westOriginalFenceGroup) westOriginalFenceGroup.visible = state.landLevel < 1;
  if (eastOriginalFenceGroup) eastOriginalFenceGroup.visible = state.landLevel < 2;
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
  const pool = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango", "milho", "trigo"];
  state.hotCropId = pool[Math.floor(Math.random() * pool.length)];
  state.dailyMult[state.hotCropId] = 1.4;
  updateSeedHotbarUI();
}

function generateCityOrders() {
  const buyers = [
    "Feira de Campo Limpo Paulista",
    "Cantina da ETEC (CLP)",
    "Sacolão Centro de Campo Limpo",
    "Mercadinho de Pau Arcado",
    "Restaurante Av. Alfried Krupp",
  ];
  const orderPool = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango", "milho", "trigo"];
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
  const baseC = Math.min(36, 6 + (state.upgrades.plotTier || 0) * 3);
  const westC = state.landLevel >= 1 ? Math.min(12, (state.upgrades.westPlotTier || 0) * 3) : 0;
  const eastC = state.landLevel >= 2 ? Math.min(12, (state.upgrades.eastPlotTier || 0) * 3) : 0;
  return baseC + westC + eastC;
}

function syncUnlockedPlots() {
  const baseCount = Math.min(36, 6 + (state.upgrades.plotTier || 0) * 3);
  const westCount = state.landLevel >= 1 ? Math.min(12, (state.upgrades.westPlotTier || 0) * 3) : 0;
  const eastCount = state.landLevel >= 2 ? Math.min(12, (state.upgrades.eastPlotTier || 0) * 3) : 0;
  syncLandExpansion();
  plots.forEach((p, idx) => {
    if (p.landReq === 1) {
      p.group.visible = state.landLevel >= 1;
      p.unlocked = state.landLevel >= 1 && idx - 36 < westCount;
    } else if (p.landReq === 2) {
      p.group.visible = state.landLevel >= 2;
      p.unlocked = state.landLevel >= 2 && idx - 48 < eastCount;
    } else {
      p.unlocked = idx < baseCount;
    }
    refreshPlotAppearance(p);
  });
}

function closeAllModals() {
  if (typeof exitFirstPersonPointerLock === "function") exitFirstPersonPointerLock();
  if (pauseScreen) pauseScreen.classList.add("hidden");
  if (sellModal) sellModal.classList.add("hidden");
  if (shopModal) shopModal.classList.add("hidden");
  if (npcModal) npcModal.classList.add("hidden");
  if (guideModal) guideModal.classList.add("hidden");
  if (calendarModal) calendarModal.classList.add("hidden");
  if (phoneModal) phoneModal.classList.add("hidden");
  if (cookModal) cookModal.classList.add("hidden");
  if (inventoryModal) inventoryModal.classList.add("hidden");
  if (stationShopModal) stationShopModal.classList.add("hidden");
  if (typeof chestModal !== "undefined" && chestModal) chestModal.classList.add("hidden");
  if (typeof cmdBar !== "undefined" && cmdBar) cmdBar.classList.add("hidden");
  if (typeof returnCursorItemToInventory === "function") returnCursorItemToInventory();
  if (typeof stopMiniArcade === "function") stopMiniArcade();
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
      isLambiHomem: state.isLambiHomem,
      lambiTriggeredDay: state.lambiTriggeredDay,
      lambiUntilDay: state.lambiUntilDay,
      knockedNpcs: state.knockedNpcs,
      visitedEtecToday: state.visitedEtecToday,
      coopEggs: state.coopEggs,
      chickenCount: state.chickenCount,
      chickenLove: state.chickenLove,
      npkDoneToday: state.npkDoneToday,
      automationDoneToday: state.automationDoneToday,
      goalScoredToday: state.goalScoredToday,
      merendaTakenToday: state.merendaTakenToday,
      felixStep: state.felixStep,
      paoStep: state.paoStep,
      titles: state.titles,
      activeTitle: state.activeTitle,
      kaioAdubo: state.kaioAdubo,
      kaioSuperAdubo: state.kaioSuperAdubo,
      hasTamedJaguar: state.hasTamedJaguar,
      tamedJaguarHp: state.tamedJaguarHp,
      tamedJaguarDown: state.tamedJaguarDown,
      tamedJaguarRecoverTimer: state.tamedJaguarRecoverTimer,
      marceloHired: state.marceloHired,
      marceloDaysLeft: state.marceloDaysLeft,
      basementStep: state.basementStep,
      basementUnlocked: state.basementUnlocked,
      machoSkin: state.machoSkin,
      vaselina: state.vaselina,
      ownedHoes: state.ownedHoes,
      activeHoe: state.activeHoe,
      landLevel: state.landLevel,
      animals: state.animals.filter((a) => a.alive),
      nextAnimalId: state.nextAnimalId,
      upgrades: state.upgrades,
      inventory: state.inventory,
      slots: state.slots,
      chestSlots: state.chestSlots,
      activeHotbarSlot: state.activeHotbarSlot,
      shotgunMag: state.shotgunMag,
      dailyGoals: state.dailyGoals,
      phone: state.phone,
      plots: plots.map((p) => ({
        stage: p.stage,
        cropId: p.cropId,
        growth: p.growth,
        waterTimer: p.waterTimer,
        fertilized: !!p.fertilized,
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
    if (typeof data.isLambiHomem === "boolean") state.isLambiHomem = data.isLambiHomem;
    if (typeof data.lambiTriggeredDay === "number") state.lambiTriggeredDay = data.lambiTriggeredDay;
    if (typeof data.lambiUntilDay === "number") state.lambiUntilDay = data.lambiUntilDay;
    if (data.knockedNpcs && typeof data.knockedNpcs === "object") state.knockedNpcs = { ...data.knockedNpcs };
    if (typeof data.visitedEtecToday === "boolean") state.visitedEtecToday = data.visitedEtecToday;
    if (typeof data.coopEggs === "number") state.coopEggs = data.coopEggs;
    if (typeof data.chickenCount === "number") {
      state.chickenCount = THREE.MathUtils.clamp(data.chickenCount, 1, 12);
    }
    if (typeof data.chickenLove === "number") state.chickenLove = data.chickenLove;
    if (typeof data.npkDoneToday === "boolean") state.npkDoneToday = data.npkDoneToday;
    if (typeof data.automationDoneToday === "boolean") state.automationDoneToday = data.automationDoneToday;
    else if (typeof data.musicPlayedToday === "boolean") state.automationDoneToday = data.musicPlayedToday;
    if (typeof data.goalScoredToday === "boolean") state.goalScoredToday = data.goalScoredToday;
    if (typeof data.merendaTakenToday === "number") state.merendaTakenToday = Math.max(0, Math.floor(data.merendaTakenToday));
    if (typeof data.felixStep === "number") state.felixStep = data.felixStep;
    if (typeof data.paoStep === "number") state.paoStep = data.paoStep;
    if (Array.isArray(data.titles) && data.titles.length) state.titles = data.titles;
    if (typeof data.activeTitle === "string") state.activeTitle = data.activeTitle;
    if (typeof data.kaioAdubo === "number") state.kaioAdubo = data.kaioAdubo;
    if (typeof data.kaioSuperAdubo === "number") state.kaioSuperAdubo = data.kaioSuperAdubo;
    if (typeof data.hasTamedJaguar === "boolean") state.hasTamedJaguar = data.hasTamedJaguar;
    if (typeof data.tamedJaguarHp === "number") state.tamedJaguarHp = THREE.MathUtils.clamp(data.tamedJaguarHp, 0, state.tamedJaguarMaxHp);
    if (typeof data.tamedJaguarDown === "boolean") state.tamedJaguarDown = data.tamedJaguarDown;
    if (typeof data.tamedJaguarRecoverTimer === "number") state.tamedJaguarRecoverTimer = Math.max(0, data.tamedJaguarRecoverTimer);
    if (state.tamedJaguarDown && tamedJaguarEntity) {
      tamedJaguarEntity.mesh.rotation.z = Math.PI / 2;
      tamedJaguarEntity.mesh.position.y = 0.45;
    }
    if (typeof data.marceloHired === "boolean") state.marceloHired = data.marceloHired;
    if (typeof data.marceloDaysLeft === "number") state.marceloDaysLeft = data.marceloDaysLeft;
    if (typeof data.basementStep === "number") state.basementStep = data.basementStep;
    if (typeof data.basementUnlocked === "boolean") state.basementUnlocked = data.basementUnlocked;
    if (typeof data.machoSkin === "string") state.machoSkin = data.machoSkin;
    if (typeof data.vaselina === "number") state.vaselina = data.vaselina;
    if (Array.isArray(data.ownedHoes) && data.ownedHoes.length) {
      state.ownedHoes = data.ownedHoes.filter((h) => HOES[h]);
      if (!state.ownedHoes.includes("comum")) state.ownedHoes.unshift("comum");
    }
    if (typeof data.activeHoe === "string" && HOES[data.activeHoe]) state.activeHoe = data.activeHoe;
    if (typeof data.landLevel === "number") state.landLevel = data.landLevel;
    if (Array.isArray(data.animals)) {
      state.animals = data.animals.filter((a) => a && ANIMAL_TYPES[a.type]).map((a) => ({ ...a, alive: true }));
    }
    if (typeof data.nextAnimalId === "number") state.nextAnimalId = data.nextAnimalId;
    if (data.upgrades) Object.assign(state.upgrades, data.upgrades);
    if (typeof state.upgrades.autoWaterLevel !== "number") state.upgrades.autoWaterLevel = 0;
    if (typeof state.upgrades.westPlotTier !== "number") state.upgrades.westPlotTier = 0;
    if (typeof state.upgrades.eastPlotTier !== "number") state.upgrades.eastPlotTier = 0;
    if (data.inventory) Object.assign(state.inventory, data.inventory);
    if (data.phone && typeof data.phone === "object") {
      state.phone = Object.assign(createDefaultPhoneState(), data.phone);
      if (!Array.isArray(state.phone.likedIds)) state.phone.likedIds = [];
      if (!Array.isArray(state.phone.userPosts)) state.phone.userPosts = [];
      if (!Array.isArray(state.phone.userInstaPosts)) state.phone.userInstaPosts = [];
    }
    if (Array.isArray(data.plots)) {
      data.plots.forEach((sp, idx) => {
        if (plots[idx]) {
          plots[idx].stage = sp.stage || "raw";
          plots[idx].cropId = sp.cropId || null;
          plots[idx].growth = sp.growth || 0;
          plots[idx].waterTimer = sp.waterTimer || 0;
          plots[idx].fertilized = !!sp.fertilized;
        }
      });
    }
    if (Array.isArray(data.chestSlots) && data.chestSlots.length > 0 && typeof createEmptyChestSlots === "function") {
      state.chestSlots = createEmptyChestSlots();
      for (let i = 0; i < Math.min(data.chestSlots.length, CHEST_SIZE); i++) {
        const cs = data.chestSlots[i];
        if (cs && typeof cs.id === "string" && getItemDef(cs.id) && typeof cs.qty === "number" && cs.qty > 0) {
          state.chestSlots[i] = { id: cs.id, qty: Math.floor(cs.qty) };
        }
      }
    } else if (typeof createEmptyChestSlots === "function") {
      state.chestSlots = createEmptyChestSlots();
    }
    const hasInChest = (id) => Array.isArray(state.chestSlots) && state.chestSlots.some((s) => s && s.id === id);
    if (Array.isArray(data.slots) && data.slots.length > 0) {
      state.slots = createEmptySlots();
      for (let i = 0; i < Math.min(data.slots.length, INVENTORY_SIZE); i++) {
        const s = data.slots[i];
        if (s && typeof s.id === "string" && getItemDef(s.id) && typeof s.qty === "number" && s.qty > 0) {
          state.slots[i] = { id: s.id, qty: Math.floor(s.qty) };
        }
      }
      if (typeof data.activeHotbarSlot === "number") {
        state.activeHotbarSlot = THREE.MathUtils.clamp(Math.floor(data.activeHotbarSlot), 0, HOTBAR_SIZE - 1);
      }
      if (typeof data.shotgunMag === "number" && Number.isFinite(data.shotgunMag)) {
        state.shotgunMag = THREE.MathUtils.clamp(Math.floor(data.shotgunMag), 0, SHOTGUN_MAG_SIZE);
      }
      if (findFirstSlotWithItem("regador") === -1 && !hasInChest("regador")) addItemToInventory("regador", 1);
      if (!HOE_KEYS.some((h) => findFirstSlotWithItem(`hoe_${h}`) !== -1 || hasInChest(`hoe_${h}`))) {
        addItemToInventory("hoe_comum", 1);
      }
      syncLegacyFromSlots();
    } else {
      migrateLegacyToSlots();
    }
    if (Array.isArray(data.dailyGoals) && data.dailyGoals.length > 0) {
      state.dailyGoals = data.dailyGoals;
    }
    syncChickensToCount(state.chickenCount);
    rebuildLivestockMeshes();
    return true;
  } catch (_) {
    return false;
  }
}

function syncBusModelsVisibility() {
  if (bus402YardMesh) {
    bus402YardMesh.visible = getBus402Status("pauArcado").available;
  }
  if (bus402TermMesh) {
    bus402TermMesh.visible = getBus402Status("terminal").available;
  }
}

function syncHeldToolVisibility() {
  const isAirfryer = state.activeTitle === "Airfryer";
  const canShowInHand = !state.isCrazy && !isAirfryer;
  const held = typeof getHeldItem === "function" ? getHeldItem() : null;

  if (playerMesh.userData.canGroup) {
    playerMesh.userData.canGroup.visible = canShowInHand && !!(held && held.id === "regador");
  }
  if (playerMesh.userData.hoeGroup) {
    playerMesh.userData.hoeGroup.visible = canShowInHand && !!(held && held.hoeId);
  }
  if (playerMesh.userData.heldItemGroup && typeof updateGenericHeldItemRig === "function") {
    if (canShowInHand && held && held.id !== "regador" && !held.hoeId) {
      updateGenericHeldItemRig(playerMesh.userData.heldItemGroup, held);
    } else {
      playerMesh.userData.heldItemGroup.visible = false;
    }
  }
}

function setActiveSceneVisibility() {
  exteriorGroup.visible = state.location === "yard";
  interiorGroup.visible = state.location === "room";
  basementGroup.visible = state.location === "basement";
  terminalGroup.visible = state.location === "terminal";
  etecGroup.visible = state.location === "etec";
  etecInsideGroup.visible = state.location === "etec_inside";
  syncHeldToolVisibility();
  if (sprinklerGroup) {
    sprinklerGroup.visible = state.upgrades.autoWaterLevel >= 1;
    sprinklerHeads.forEach((sh) => {
      if (sh.mesh) sh.mesh.visible = (sh.landReq || 0) <= (state.landLevel || 0);
    });
  }
  if (jaguarEntity) {
    jaguarEntity.mesh.visible = state.location === "yard" && (state.jaguar.active || state.jaguarDefeated);
  }
  if (tamedJaguarEntity) {
    tamedJaguarEntity.mesh.visible = state.location === "yard" && state.hasTamedJaguar;
    if (state.tamedJaguarDown) {
      tamedJaguarEntity.mesh.rotation.z = Math.PI / 2;
      tamedJaguarEntity.mesh.position.y = 0.45;
    } else if (!state.ridingJaguar) {
      tamedJaguarEntity.mesh.rotation.z = 0;
    }
  }
  if (termJaguarMesh) {
    termJaguarMesh.visible = state.location === "terminal" && state.hasTamedJaguar;
  }
  if (secretTrapdoorMesh) {
    secretTrapdoorMesh.visible = state.basementUnlocked || state.basementStep >= 2;
  }
  if (marceloYardEntity) {
    marceloYardEntity.mesh.visible = state.location === "yard" && state.marceloHired;
  }
  applyMachoSkin(state.machoSkin);
  syncPlayerTitleSkin();
  syncLandExpansion();
  applyHoeVisual();
  if (maluquinhoEntity) {
    maluquinhoEntity.mesh.visible = state.location === "terminal" && state.maluquinho.active;
  }
  syncBusModelsVisibility();
  syncCoopEggsVisual();
}

function resetToNewFarm() {
  if (typeof clearSleepTimers === "function") clearSleepTimers();
  closeAllModals();
  if (deathModal) deathModal.classList.add("hidden");
  if (sleepOverlay) {
    sleepOverlay.classList.remove("visible");
    sleepOverlay.classList.add("hidden");
  }
  localStorage.removeItem(STORAGE_KEY);
  state.location = "yard";
  state.isRainy = false;
  state.money = 40;
  state.day = 1;
  state.dayMinutes = 7 * 60;
  state.reputation = 1;
  state.insanity = 0;
  state.isCrazy = false;
  state.isLambiHomem = false;
  state.lambiTriggeredDay = 0;
  state.lambiUntilDay = 0;
  state.knockedNpcs = {};
  state.visitedEtecToday = false;
  state.coringaTimer = 0;
  state.currentCoringaLine = "";
  state.energyTimer = 0;
  state.vaselina = 0;
  state.vaselinaTimer = 0;
  state.npkDoneToday = false;
  state.automationDoneToday = false;
  state.goalScoredToday = false;
  state.merendaTakenToday = 0;
  state.coopEggs = 2;
  state.chickenCount = 3;
  state.chickenLove = 0;
  syncChickensToCount(3);
  state.felixStep = 0;
  state.paoStep = 0;
  state.titles = ["Estudante ETEC"];
  state.activeTitle = "Estudante ETEC";
  state.selectedCrop = "alface_crespa";
  state.equippedTool = "water";
  state.playerHp = 100;
  state.isSleeping = false;
  state.jaguar = {
    active: false, hp: 100, maxHp: 100, attackCd: 0, hitFlash: 0, spawnCooldown: 150, checkAccum: 0,
    slowTimer: 0, burnTimer: 0, targetAnimalId: null,
  };
  state.jaguarDefeated = false;
  state.jaguarDownTimer = 0;
  state.hasTamedJaguar = false;
  state.tamedJaguarHp = 120;
  state.tamedJaguarMaxHp = 120;
  state.tamedJaguarDown = false;
  state.tamedJaguarRecoverTimer = 0;
  state.ridingJaguar = false;
  if (tamedJaguarEntity) {
    tamedJaguarEntity.mesh.rotation.z = 0;
    tamedJaguarEntity.mesh.position.y = 0;
  }
  state.marceloHired = false;
  state.marceloDaysLeft = 0;
  state.basementStep = 0;
  state.basementUnlocked = false;
  state.machoSkin = "clone_classic";
  state.ownedHoes = ["comum"];
  state.activeHoe = "comum";
  state.landLevel = 0;
  state.animals = [];
  state.nextAnimalId = 1;
  rebuildLivestockMeshes();
  state.maluquinho = { active: false, tormentCd: 0, bubbleTimer: 0, currentLine: "", announced: false };
  state.kaioAdubo = 0;
  state.kaioSuperAdubo = 0;
  state.workEndNotifiedToday = false;
  state.autoWaterAccum = 0;
  state.firstPerson = false;
  state.fpPitch = 0;
  state.phone = createDefaultPhoneState();
  state.upgrades = { plotTier: 0, westPlotTier: 0, eastPlotTier: 0, canLevel: 1, fertLevel: 1, standLevel: 1, autoWaterLevel: 0 };
  if (typeof resetDogOrelha === "function") resetDogOrelha();
  state.water = getMaxWater();
  state.shotgunMag = 0;
  state.shotgunRecoilTimer = 0;
  state.shotgunPumpTimer = 0;
  state.shotgunReloadPhase = "idle";
  state.shotgunReloadTimer = 0;
  state.shotgunReloadQueue = 0;
  CROP_KEYS.forEach((k) => (state.inventory[k] = 0));
  state.inventory.balde = 0;
  state.inventory.tesoura = 0;
  if (typeof initDefaultInventorySlots === "function") initDefaultInventorySlots();
  if (typeof createEmptyChestSlots === "function") state.chestSlots = createEmptyChestSlots();
  plots.forEach((p, idx) => {
    p.stage = idx === 2 || idx === 3 ? "tilled" : "raw";
    p.cropId = null;
    p.growth = 0;
    p.waterTimer = 0;
    p.fertilized = false;
    p.visualStage = -99;
    p.visualCropId = null;
  });
  setActiveSceneVisibility();
  syncUnlockedPlots();
  rollDailyMarket();
  generateCityOrders();
  if (typeof generateDailyGoals === "function") generateDailyGoals();
  player.pos.set(0, 0, -11.5);
  player.facingYaw = 0;
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.set(0, player.facingYaw, 0);
  updateSeedHotbarUI();
  updateHUD();
}

// HUD Updates
function updateSeedHotbarUI() {
  if (typeof renderHotbarUI === "function") renderHotbarUI();
}

const LOCATION_LABELS = {
  yard: "Pau Arcado",
  room: "Casa do Alyffer",
  basement: "Porão Secreto",
  terminal: "Terminal CLP",
  etec: "ETEC Botujuru",
  etec_inside: "ETECAMP (Salas)",
};

function updateHUD() {
  state.isCrazy = state.insanity >= 100;
  titleBadge.textContent = state.isCrazy ? `🤡 CORINGANDO (${state.activeTitle})` : state.activeTitle;
  moneyVal.textContent = formatBRL(state.money);
  const cal = getCalendarInfo(state.day);
  const clockStr = formatHHMM(state.dayMinutes);
  const dayStr = String(cal.dayOfMonth).padStart(2, "0");
  const weatherIcon = state.isRainy ? "🌧️" : isAfterWorkHours() ? "🌙" : "☀️";
  dayTimeVal.textContent = `${cal.weekdayShort}, ${dayStr}/${cal.monthShort} • ${clockStr} ${weatherIcon}`;
  locationVal.textContent = LOCATION_LABELS[state.location] || "Pau Arcado";

  if (typeof basketVal !== "undefined" && basketVal) {
    const totalItems = getTotalBasketCount();
    basketVal.textContent = `🥬 ${totalItems} ${totalItems === 1 ? "item" : "itens"}`;
  }
  if (typeof aduboVal !== "undefined" && aduboVal) {
    aduboVal.textContent = `🧪 ${state.kaioAdubo} • ⚗️ ${state.kaioSuperAdubo}`;
  }
  if (typeof waterText !== "undefined" && waterText && typeof waterBar !== "undefined" && waterBar) {
    const maxW = getMaxWater();
    if (typeof waterLabel !== "undefined" && waterLabel) {
      waterLabel.textContent = state.upgrades.autoWaterLevel >= 1 ? "REGADOR • 💦 AUTO" : "REGADOR";
    }
    waterText.textContent = `${state.water}/${maxW}`;
    waterBar.style.width = `${Math.min(100, (state.water / maxW) * 100)}%`;
  }

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

  // Modo 1ª/3ª pessoa alternado exclusivamente pela tecla F4; troca de itens feita na Hotbar (1–9)
  if (typeof renderHotbarUI === "function") renderHotbarUI();
  if (typeof updateTrackerHUD === "function") updateTrackerHUD();
  if (hpPill && hpBar && hpText) {
    const showHp = state.jaguar.active || state.playerHp < state.maxHp;
    hpPill.classList.toggle("hidden", !showHp);
    hpText.textContent = `${Math.max(0, Math.round(state.playerHp))}`;
    hpBar.style.width = `${Math.max(0, Math.min(100, (state.playerHp / state.maxHp) * 100))}%`;
  }
  if (tamedJagPill && tamedJagBar && tamedJagText) {
    tamedJagPill.classList.toggle("hidden", !state.hasTamedJaguar);
    if (state.hasTamedJaguar) {
      const hp = Math.max(0, Math.round(state.tamedJaguarHp));
      const maxHp = Math.max(1, state.tamedJaguarMaxHp || 120);
      if (state.tamedJaguarDown) {
        tamedJagText.textContent = `💤 CAÍDA (${Math.ceil(state.tamedJaguarRecoverTimer)}s)`;
        tamedJagBar.style.width = "0%";
      } else {
        tamedJagText.textContent = `${hp}/${maxHp}`;
        tamedJagBar.style.width = `${Math.min(100, (hp / maxHp) * 100)}%`;
      }
      if (tamedJagLabel) {
        tamedJagLabel.textContent = state.ridingJaguar ? "🐆 MONTADA" : "🐆 ONÇA";
      }
    }
  }
  if (jaguarHudBar && jaguarHpFill && jaguarHpText) {
    const showJag = state.location === "yard" && state.jaguar.active && state.mode === "playing";
    jaguarHudBar.classList.toggle("hidden", !showJag);
    if (showJag) {
      jaguarHpText.textContent = `${Math.max(0, Math.round(state.jaguar.hp))} / ${state.jaguar.maxHp} HP`;
      jaguarHpFill.style.width = `${Math.max(0, (state.jaguar.hp / state.jaguar.maxHp) * 100)}%`;
    }
  }
  if (maluquinhoBubble && !(state.location === "terminal" && state.maluquinho.active && state.mode === "playing")) {
    maluquinhoBubble.classList.add("hidden");
  }
  if (fpCrosshair) {
    fpCrosshair.classList.toggle("hidden", !(state.firstPerson && state.mode === "playing"));
  }
  if (crazyVignette) {
    crazyVignette.classList.toggle("hidden", !(state.isCrazy && state.mode === "playing"));
  }

  if (coringaBubble) {
    coringaBubble.classList.toggle("hidden", !(state.isCrazy && state.mode === "playing"));
  }

  if (typeof phoneNotifDot !== "undefined" && phoneNotifDot) {
    const unread = (state.phone && state.phone.unread) || 0;
    phoneNotifDot.textContent = unread > 9 ? "9+" : String(unread);
    phoneNotifDot.classList.toggle("hidden", unread <= 0);
  }
  if (phoneModal && !phoneModal.classList.contains("hidden") && typeof updatePhoneStatusBar === "function") {
    updatePhoneStatusBar();
  }

  if (vaselinaHudBtn && vaselinaHudLabel) {
    vaselinaHudBtn.classList.toggle("hidden", state.vaselina <= 0);
    vaselinaHudLabel.textContent = `Vaselina (${state.vaselina})`;
  }

  if (state.vaselinaTimer > 0) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `🧴 Vaselina (${Math.ceil(state.vaselinaTimer)}s)`;
  } else if (state.energyTimer > 0) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `⚡ Energia (${Math.ceil(state.energyTimer)}s)`;
  } else if (isAfterWorkHours()) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `🌙 Após 19h (Sem trabalho)`;
  } else {
    buffBadge.classList.add("hidden");
  }

  if (lambiPill && lambiText) {
    lambiPill.classList.toggle("hidden", !state.isLambiHomem);
    if (state.isLambiHomem) {
      lambiText.textContent =
        state.location === "etec_inside"
          ? "👅 LAMBI HOMEM! Aperte F nos alunos/NPCs"
          : "👅 LAMBI HOMEM! Vá à ETEC lamber NPCs (F)";
    }
  }
}

function triggerJump() {
  if (state.mode !== "playing" || state.isSleeping) return;
  if (state.activeTitle === "Airfryer") {
    showToast("🍟", "MODO AIRFRYER!", "Airfryer fica paradinha! Clique no título ou aperte G para trocar de título.");
    return;
  }
  if (player.jumpOffset <= 0.02 && player.vy <= 0) {
    player.vy = 9.0;
    player.jumpOffset = 0.03;
    sfx.play("plant");
    spawnParticles(new THREE.Vector3(player.pos.x, player.pos.y + 0.12, player.pos.z), 0xe2e8f0, 6);
  }
}

function drinkVaselina() {
  if (state.mode !== "playing" || state.isSleeping) return;
  if (state.vaselina <= 0) {
    sfx.play("error");
    showToast("🧴", "SEM VASELINA", "Compre Vaselina com o Marcelo no corredor da ETECAMP para ficar super rápido!");
    return;
  }
  removeItemFromInventory("vaselina", 1, true);
  state.vaselinaTimer = 95;
  sfx.play("upgrade");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x38bdf8, 22);
  showToast("🧴", "TOMOU VASELINA DO MARCELO!", "+65% Velocidade turbinada por 95 segundos! Deslizando pela roça!");
  updateHUD();
  saveGame();
}

function cycleEquippedTitle() {
  if (state.titles.length <= 1) {
    showToast("🏆", "TÍTULOS DA ETEC", "Cumpra as missões do Félix e do Pão na ETEC para ganhar novos títulos e skins!");
    return;
  }
  const idx = state.titles.indexOf(state.activeTitle);
  state.activeTitle = state.titles[(idx + 1) % state.titles.length];
  syncPlayerTitleSkin();
  sfx.play("plant");
  if (state.activeTitle === "Airfryer") {
    showToast("🍟", "TÍTULO AIRFRYER EQUIPADO!", "Você virou uma Airfryer parada! Clique no título ou aperte G para trocar.");
  } else {
    showToast("🏆", "TÍTULO & SKIN EQUIPADOS", `Agora você está com "${state.activeTitle}"!`);
  }
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

