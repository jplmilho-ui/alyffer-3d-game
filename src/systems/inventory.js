// ============================================================================
// SISTEMA UNIFICADO DE INVENTÁRIO (45 SLOTS) & HOTBAR (9 SLOTS) — ESTILO MINECRAFT
// Sem limite de stack por slot • Todos os itens, ferramentas, sementes e colheitas
// ============================================================================

const HOTBAR_SIZE = 9;
const BACKPACK_ROWS = 4;
const INVENTORY_SIZE = HOTBAR_SIZE + BACKPACK_ROWS * 9; // 9 hotbar (0..8) + 36 mochila (9..44) = 45 slots
const CHEST_SIZE = 36; // 4 linhas x 9 colunas no Baú do Sítio (stack ilimitado)

function createEmptyChestSlots() {
  return new Array(CHEST_SIZE).fill(null);
}

const ITEM_CATALOG = {};

function buildItemCatalog() {
  ITEM_CATALOG.regador = {
    id: "regador",
    name: "Regador",
    shortName: "Regador",
    emoji: "🚿",
    category: "tool",
    stackable: false,
    color: 0x0284c7,
    accentColor: 0x38bdf8,
    desc: "Rega canteiros secos (E) e pode ser recarregado no Poço d'Água.",
  };

  HOE_KEYS.forEach((hId) => {
    const h = HOES[hId];
    const itemId = `hoe_${hId}`;
    ITEM_CATALOG[itemId] = {
      id: itemId,
      hoeId: hId,
      name: h.name,
      shortName: h.shortName,
      emoji: h.emoji,
      category: "tool",
      stackable: false,
      color: h.bladeColor,
      accentColor: h.emissive || 0x94a3b8,
      desc: h.effectDesc,
    };
  });

  ITEM_CATALOG.tesoura = {
    id: "tesoura",
    name: STATION_TOOLS.tesoura.name,
    shortName: "Tesoura",
    emoji: STATION_TOOLS.tesoura.emoji,
    category: "tool",
    stackable: false,
    color: 0xdc2626,
    accentColor: 0xe2e8f0,
    desc: STATION_TOOLS.tesoura.desc,
  };

  ITEM_CATALOG.celular = {
    id: "celular",
    name: "Celular do Macho",
    shortName: "Celular",
    emoji: "📱",
    category: "tool",
    stackable: false,
    color: 0x0f172a,
    accentColor: 0x38bdf8,
    desc: "Comprado no Terminal CLP! Segure na mão (Hotbar 1–9) e aperte E (ou T) para acessar Only-Resenha, Zap, InstaRoça e Pega-Alface!",
  };

  ITEM_CATALOG.escopeta = {
    id: "escopeta",
    name: "Escopeta Calibre 12",
    shortName: "Escopeta",
    emoji: "🔫",
    category: "tool",
    stackable: false,
    color: 0x1e293b,
    accentColor: 0x6b3e1e,
    desc: "Escopeta pump-action comprada na Estação CLP! Segure na mão e aperte E (ou clique) para atirar usando Balas de Escopeta!",
  };

  ITEM_CATALOG.bala_escopeta = {
    id: "bala_escopeta",
    name: "Balas de Escopeta (Cal. 12)",
    shortName: "Balas Cal.12",
    emoji: "🔴",
    category: "supply",
    stackable: true,
    color: 0xdc2626,
    accentColor: 0xfacc15,
    desc: "Munição calibre 12 usada automaticamente pela Escopeta! Compre caixas extras na Loja da Estação CLP.",
  };

  ITEM_CATALOG.balde = {
    id: "balde",
    name: STATION_TOOLS.balde.name,
    shortName: "Balde",
    emoji: STATION_TOOLS.balde.emoji,
    category: "supply",
    stackable: true,
    color: 0xe2e8f0,
    accentColor: 0x94a3b8,
    desc: STATION_TOOLS.balde.desc,
  };

  ITEM_CATALOG.adubo_npk = {
    id: "adubo_npk",
    name: "Adubo NPK do Kaio",
    shortName: "Adubo NPK",
    emoji: "🧪",
    category: "supply",
    stackable: true,
    color: 0x4ade80,
    accentColor: 0x16a34a,
    desc: "Segure na mão e aperte E (ou F) num canteiro crescendo: +50% progresso e 2x velocidade!",
  };

  ITEM_CATALOG.super_adubo = {
    id: "super_adubo",
    name: "Super-Adubo do Kaio",
    shortName: "Super-Adubo",
    emoji: "⚗️",
    category: "supply",
    stackable: true,
    color: 0xfacc15,
    accentColor: 0xeab308,
    desc: "Segure na mão e aperte E (ou F) num canteiro crescendo: amadurece 100% na hora!",
  };

  ITEM_CATALOG.vaselina = {
    id: "vaselina",
    name: "Vaselina do Marcelo",
    shortName: "Vaselina",
    emoji: "🧴",
    category: "supply",
    stackable: true,
    color: 0x38bdf8,
    accentColor: 0x0284c7,
    desc: "Segure na mão e aperte E (ou Z) para tomar: +65% velocidade por 95s!",
  };

  SEED_KEYS.forEach((cropId) => {
    const c = CROPS[cropId];
    const itemId = `seed_${cropId}`;
    ITEM_CATALOG[itemId] = {
      id: itemId,
      seedCropId: cropId,
      name: `Semente de ${c.name}`,
      shortName: `Sem. ${c.name.split(" ")[0]}`,
      emoji: "🌱",
      subEmoji: c.emoji,
      category: "seed",
      stackable: true,
      seedCost: c.seedCost,
      color: c.color,
      accentColor: c.leafColor,
      desc: `Segure na mão e aperte E num canteiro arado para plantar ${c.name} (${c.emoji}). Compre mais na Cooperativa ou aba Sementes (${formatBRL(c.seedCost)}).`,
    };
  });

  const recipeMap = {};
  KITCHEN_RECIPES.forEach((r) => {
    recipeMap[r.id] = r;
  });
  const breedHints = {
    milho: " • Segure e aperte E (ou B) no Galinheiro para reproduzir galinhas",
    trigo: " • Segure e aperte E (ou B) perto de Vacas/Ovelhas para reproduzir",
    cenoura: " • Segure e aperte E (ou B) perto de Porcos para reproduzir",
    ovo_caipira: " • Segure na mão e aperte E (ou clique direito) para JOGAR o ovo!",
  };

  // 3.5 Merendas do Refeitório da ETECAMP (Seg–Sex, stack ilimitado!)
  const merendaDefs = [
    {
      id: "merenda_bolacha",
      name: "Bolacha da ETEC (Madeira Prensada)",
      shortName: "Bolacha ETEC",
      emoji: "🪵",
      color: 0xb6895b,
      accentColor: 0x7c532d,
      foodEffect: { hp: 20, energy: 25, insanityDelta: 12, msg: "Dura igual madeira prensada! +12% Insanidade!" },
      desc: "Merenda de Segunda e Terça! Bolacha seca igual madeira prensada. Segure e aperte E para comer (+12% Insanidade).",
    },
    {
      id: "merenda_leite_choc",
      name: "Copo de Leite c/ Chocolate (ETEC)",
      shortName: "Leite c/ Choc",
      emoji: "🥤",
      color: 0x5c3317,
      accentColor: 0xf8fafc,
      foodEffect: { hp: 20, energy: 25, insanityDelta: 10, msg: "Leite achocolatado da merenda! +10% Insanidade!" },
      desc: "Merenda de Segunda e Terça! Acompanha a bolacha de madeira prensada. Segure e aperte E para tomar (+10% Insanidade).",
    },
    {
      id: "merenda_racao",
      name: "Ração do Exército (Sucrilhos c/ Leite)",
      shortName: "Ração Exérc.",
      emoji: "🥣",
      color: 0xd97706,
      accentColor: 0x2563eb,
      foodEffect: { hp: 30, energy: 30, insanityDelta: 28, msg: "Ração do Exército na colher azul! +28% Insanidade!" },
      desc: "Merenda de Quarta-feira! Pote circular pequeno com leite, sucrilhos e colher azul. Segure e aperte E (+28% Insanidade!).",
    },
    {
      id: "merenda_canjica",
      name: "Canjica da ETEC (Colher Azul)",
      shortName: "Canjica",
      emoji: "🥣",
      color: 0xfef3c7,
      accentColor: 0x2563eb,
      foodEffect: { hp: 65, energy: 60, insanityDelta: -22, msg: "Canjica quentinha! -22% Insanidade (+Sanidade)!" },
      desc: "Merenda de Quinta-feira! Pote circular pequeno com colher azul. Segure e aperte E para aumentar a sanidade (-22% Insanidade).",
    },
    {
      id: "merenda_arroz_doce",
      name: "Arroz Doce da ETEC (Colher Azul)",
      shortName: "Arroz Doce",
      emoji: "🥣",
      color: 0xf5efe6,
      accentColor: 0x2563eb,
      foodEffect: { hp: 65, energy: 60, insanityDelta: -22, msg: "Arroz doce cremoso! -22% Insanidade (+Sanidade)!" },
      desc: "Merenda de Quinta-feira! Pote circular pequeno com colher azul. Segure e aperte E para aumentar a sanidade (-22% Insanidade).",
    },
    {
      id: "merenda_bolo",
      name: "Bolo de Cenoura Recheado c/ Chocolate",
      shortName: "Bolo Cenoura",
      emoji: "🍰",
      color: 0xf97316,
      accentColor: 0x3f1d0b,
      foodEffect: { hp: 100, energy: 95, insanityDelta: -40, msg: "Bolo de cenoura recheado c/ chocolate! -40% Insanidade (+Muita Sanidade)!" },
      desc: "Merenda de Sexta-feira! O melhor dia do Refeitório. Segure e aperte E (+Muita Sanidade: -40% Insanidade!).",
    },
  ];
  merendaDefs.forEach((m) => {
    ITEM_CATALOG[m.id] = {
      ...m,
      category: "dish",
      stackable: true,
      isMerenda: true,
    };
  });

  CROP_KEYS.forEach((cropId) => {
    const c = CROPS[cropId];
    const rec = recipeMap[cropId];
    ITEM_CATALOG[cropId] = {
      id: cropId,
      cropId: cropId,
      name: c.name,
      shortName: c.name.length > 11 ? c.name.split(" ")[0] : c.name,
      emoji: c.emoji,
      category: c.style === "dish" ? "dish" : c.plantable ? "crop" : "animal",
      stackable: true,
      color: c.color,
      accentColor: c.leafColor,
      visualStyle: c.style,
      foodEffect: rec ? rec.eatEffect : null,
      desc: rec
        ? `Prato caseiro! Segure na mão e aperte E para comer (${rec.eatEffect.msg}) ou venda no Terminal CLP.`
        : `Colheita/Produto para vender no Terminal CLP ou cozinhar em casa${breedHints[cropId] || ""}.`,
    };
  });
}
buildItemCatalog();

let invCursorItem = null; // { id, qty, originSlot }
let invHoveredSlot = -1;
let invSelectedInspectSlot = -1;

function getItemDef(itemId) {
  return itemId ? ITEM_CATALOG[itemId] || null : null;
}

function createEmptySlots() {
  return new Array(INVENTORY_SIZE).fill(null);
}

function formatStackQty(qty) {
  if (qty >= 1000000) return `${(qty / 1000000).toFixed(1)}M`;
  if (qty >= 10000) return `${(qty / 1000).toFixed(1)}k`;
  return String(qty);
}

function getItemCount(itemId) {
  if (!state.slots || !itemId) return 0;
  let total = 0;
  for (let i = 0; i < state.slots.length; i++) {
    const s = state.slots[i];
    if (s && s.id === itemId) total += s.qty;
  }
  if (invCursorItem && invCursorItem.id === itemId) total += invCursorItem.qty;
  return total;
}

function findFirstSlotWithItem(itemId, startIdx = 0, endIdx = INVENTORY_SIZE) {
  if (!state.slots) return -1;
  for (let i = startIdx; i < endIdx; i++) {
    if (state.slots[i] && state.slots[i].id === itemId) return i;
  }
  return -1;
}

function findFirstEmptySlot(startIdx = 0, endIdx = INVENTORY_SIZE) {
  if (!state.slots) return -1;
  for (let i = startIdx; i < endIdx; i++) {
    if (!state.slots[i]) return i;
  }
  return -1;
}

function getHeldSlot() {
  if (!state.slots) return null;
  const idx = THREE.MathUtils.clamp(state.activeHotbarSlot || 0, 0, HOTBAR_SIZE - 1);
  return state.slots[idx] || null;
}

function getHeldItem() {
  const sl = getHeldSlot();
  return sl ? getItemDef(sl.id) : null;
}

function syncLegacyFromSlots() {
  if (!state.slots) return;
  CROP_KEYS.forEach((k) => {
    state.inventory[k] = 0;
  });
  state.inventory.balde = 0;
  state.inventory.tesoura = 0;
  state.kaioAdubo = 0;
  state.kaioSuperAdubo = 0;
  state.vaselina = 0;
  const hoeSet = new Set();

  const tally = (id, qty) => {
    const def = getItemDef(id);
    if (!def || qty <= 0) return;
    if (def.cropId) state.inventory[def.cropId] = (state.inventory[def.cropId] || 0) + qty;
    else if (def.id === "balde") state.inventory.balde += qty;
    else if (def.id === "tesoura") state.inventory.tesoura += qty;
    else if (def.id === "adubo_npk") state.kaioAdubo += qty;
    else if (def.id === "super_adubo") state.kaioSuperAdubo += qty;
    else if (def.id === "vaselina") state.vaselina += qty;
    else if (def.hoeId) hoeSet.add(def.hoeId);
  };

  for (let i = 0; i < state.slots.length; i++) {
    const sl = state.slots[i];
    if (!sl || !sl.id || sl.qty <= 0 || !getItemDef(sl.id)) {
      state.slots[i] = null;
      continue;
    }
    tally(sl.id, sl.qty);
  }
  if (invCursorItem && invCursorItem.id && invCursorItem.qty > 0) {
    tally(invCursorItem.id, invCursorItem.qty);
  }

  state.ownedHoes = HOE_KEYS.filter((k) => hoeSet.has(k));
  if (state.ownedHoes.length === 0) state.ownedHoes = ["comum"];

  const held = getHeldItem();
  if (held && held.hoeId) {
    state.equippedTool = "hoe";
    state.activeHoe = held.hoeId;
  } else if (held && held.id === "regador") {
    state.equippedTool = "water";
  } else {
    state.equippedTool = "item";
    if (!hoeSet.has(state.activeHoe)) {
      state.activeHoe = state.ownedHoes[state.ownedHoes.length - 1] || "comum";
    }
  }
  if (held && held.seedCropId) {
    state.selectedCrop = held.seedCropId;
  }

  if (typeof applyHoeVisual === "function") applyHoeVisual();
  if (typeof syncHeldToolVisibility === "function") syncHeldToolVisibility();
}

function canAddItemToInventory(itemId, qty = 1) {
  const def = getItemDef(itemId);
  if (!def || qty <= 0) return false;
  if (!state.slots) return true;
  if (def.stackable) {
    if (findFirstSlotWithItem(itemId) !== -1) return true;
    return findFirstEmptySlot() !== -1;
  }
  if (findFirstSlotWithItem(itemId) !== -1 || (invCursorItem && invCursorItem.id === itemId)) return true;
  return findFirstEmptySlot() !== -1;
}

function addItemToInventory(itemId, qty = 1, preferredSlot = -1) {
  const def = getItemDef(itemId);
  if (!def || qty <= 0) return false;
  if (!state.slots) state.slots = createEmptySlots();

  if (def.stackable) {
    // Sem limite de stack: empilha no slot existente do mesmo item!
    const existing = findFirstSlotWithItem(itemId);
    if (existing !== -1) {
      state.slots[existing].qty += qty;
      syncLegacyFromSlots();
      renderHotbarUI();
      return true;
    }
    if (preferredSlot >= 0 && preferredSlot < INVENTORY_SIZE && !state.slots[preferredSlot]) {
      state.slots[preferredSlot] = { id: itemId, qty };
      syncLegacyFromSlots();
      renderHotbarUI();
      return true;
    }
    const empty = findFirstEmptySlot();
    if (empty !== -1) {
      state.slots[empty] = { id: itemId, qty };
      syncLegacyFromSlots();
      renderHotbarUI();
      return true;
    }
    return false;
  } else {
    if (findFirstSlotWithItem(itemId) !== -1 || (invCursorItem && invCursorItem.id === itemId)) {
      syncLegacyFromSlots();
      renderHotbarUI();
      return true;
    }
    const target =
      preferredSlot >= 0 && preferredSlot < INVENTORY_SIZE && !state.slots[preferredSlot]
        ? preferredSlot
        : findFirstEmptySlot();
    if (target !== -1) {
      state.slots[target] = { id: itemId, qty: 1 };
      syncLegacyFromSlots();
      renderHotbarUI();
      return true;
    }
    return false;
  }
}

function removeItemFromInventory(itemId, qty = 1, preferActiveSlot = true) {
  if (!state.slots || !itemId || qty <= 0) return false;
  let remaining = qty;

  if (preferActiveSlot) {
    const activeIdx = THREE.MathUtils.clamp(state.activeHotbarSlot || 0, 0, HOTBAR_SIZE - 1);
    const activeSl = state.slots[activeIdx];
    if (activeSl && activeSl.id === itemId) {
      const take = Math.min(activeSl.qty, remaining);
      activeSl.qty -= take;
      remaining -= take;
      if (activeSl.qty <= 0) state.slots[activeIdx] = null;
    }
  }

  for (let i = 0; i < state.slots.length && remaining > 0; i++) {
    const sl = state.slots[i];
    if (sl && sl.id === itemId) {
      const take = Math.min(sl.qty, remaining);
      sl.qty -= take;
      remaining -= take;
      if (sl.qty <= 0) state.slots[i] = null;
    }
  }

  syncLegacyFromSlots();
  renderHotbarUI();
  return remaining === 0;
}

function equipItemToHotbar(itemId) {
  if (!state.slots || !itemId) return false;
  const idx = findFirstSlotWithItem(itemId);
  if (idx === -1) return false;
  if (idx < HOTBAR_SIZE) {
    selectHotbarSlot(idx, true);
    return true;
  }
  const emptyHb = findFirstEmptySlot(0, HOTBAR_SIZE);
  const targetHb = emptyHb !== -1 ? emptyHb : state.activeHotbarSlot;
  const tmp = state.slots[targetHb];
  state.slots[targetHb] = state.slots[idx];
  state.slots[idx] = tmp;
  selectHotbarSlot(targetHb, true);
  return true;
}

function initDefaultInventorySlots() {
  invCursorItem = null;
  updateInvCursorVisual();
  state.slots = createEmptySlots();
  state.activeHotbarSlot = 0;
  state.slots[0] = { id: "hoe_comum", qty: 1 };
  state.slots[1] = { id: "regador", qty: 1 };
  state.slots[2] = { id: "seed_alface_crespa", qty: 8 };
  syncLegacyFromSlots();
  renderHotbarUI();
}

function migrateLegacyToSlots() {
  invCursorItem = null;
  updateInvCursorVisual();
  state.slots = createEmptySlots();
  state.activeHotbarSlot = 0;
  const activeHoeId = HOES[state.activeHoe] ? state.activeHoe : "comum";
  addItemToInventory(`hoe_${activeHoeId}`, 1, 0);
  addItemToInventory("regador", 1, 1);
  addItemToInventory("seed_alface_crespa", 8, 2);

  (state.ownedHoes || []).forEach((hId) => {
    if (HOES[hId]) addItemToInventory(`hoe_${hId}`, 1);
  });
  if ((state.inventory.balde || 0) > 0) addItemToInventory("balde", state.inventory.balde);
  if ((state.inventory.tesoura || 0) > 0) addItemToInventory("tesoura", 1);
  if ((state.kaioAdubo || 0) > 0) addItemToInventory("adubo_npk", state.kaioAdubo);
  if ((state.kaioSuperAdubo || 0) > 0) addItemToInventory("super_adubo", state.kaioSuperAdubo);
  if ((state.vaselina || 0) > 0) addItemToInventory("vaselina", state.vaselina);
  CROP_KEYS.forEach((k) => {
    const q = state.inventory[k] || 0;
    if (q > 0) addItemToInventory(k, q);
  });
  syncLegacyFromSlots();
  renderHotbarUI();
}

function selectHotbarSlot(index, silent = false) {
  if (typeof cancelShotgunReload === "function" && state.shotgunReloadPhase !== "idle") {
    const nextIdxCheck = ((index % HOTBAR_SIZE) + HOTBAR_SIZE) % HOTBAR_SIZE;
    const nextSl = state.slots && state.slots[nextIdxCheck];
    if (!nextSl || nextSl.id !== "escopeta") cancelShotgunReload();
  }
  const next = ((index % HOTBAR_SIZE) + HOTBAR_SIZE) % HOTBAR_SIZE;
  state.activeHotbarSlot = next;
  syncLegacyFromSlots();
  renderHotbarUI();
  updateHUD();
  if (!silent) {
    const held = getHeldItem();
    if (held) sfx.play("phone_tap");
  }
}

function cycleHotbarSlot(dir) {
  selectHotbarSlot((state.activeHotbarSlot || 0) + dir, true);
}

function buySeedPack(cropId, amount = 1) {
  const crop = CROPS[cropId];
  if (!crop) return false;
  const totalCost = crop.seedCost * amount;
  if (state.money < totalCost) {
    sfx.play("error");
    showToast("💸", "SEM DINHEIRO", `Precisa de ${formatBRL(totalCost)} para comprar ${amount}x Semente de ${crop.name}.`);
    return false;
  }
  if (!canAddItemToInventory(`seed_${cropId}`, amount)) {
    sfx.play("error");
    showToast("🎒", "MOCHILA LOTADA!", "Todos os 45 slots estão cheios! Organize ou libere 1 slot no Inventário (I).");
    return false;
  }
  state.money -= totalCost;
  addItemToInventory(`seed_${cropId}`, amount);
  sfx.play("sell");
  showToast("🌱", "SEMENTES NO INVENTÁRIO!", `+${amount}x Semente de ${crop.name} (${crop.emoji}) adicionada à mochila!`);
  updateHUD();
  saveGame();
  return true;
}

function useHeldConsumable() {
  const held = getHeldItem();
  if (!held) return false;
  if (held.id === "escopeta" && typeof fireShotgun === "function") {
    return fireShotgun();
  }
  if (held.id === "celular") {
    openPhoneModal("home");
    return true;
  }
  if (held.id === "ovo_caipira" && typeof throwHeldEgg === "function") {
    return throwHeldEgg();
  }
  if (held.id === "vaselina") {
    drinkVaselina();
    return true;
  }
  if (held.foodEffect) {
    if (!removeItemFromInventory(held.id, 1, true)) return false;
    const eff = held.foodEffect;
    if (eff.hp) state.playerHp = Math.min(state.maxHp, state.playerHp + eff.hp);
    if (eff.energy) state.energyTimer = Math.max(state.energyTimer, eff.energy);
    if (eff.insanityDelta) {
      if (eff.insanityDelta > 0) {
        addInsanity(eff.insanityDelta, false);
      } else {
        state.insanity = THREE.MathUtils.clamp(state.insanity + eff.insanityDelta, 0, 100);
        state.isCrazy = state.insanity >= 100;
      }
    }
    state.swingTimer = 0.25;
    sfx.play(eff.insanityDelta > 0 ? "chuckle" : "upgrade");
    spawnParticles(
      player.pos.clone().add(new THREE.Vector3(0, 1.5, 0)),
      eff.insanityDelta > 0 ? 0xec4899 : 0x4ade80,
      14
    );
    showToast(held.emoji, held.shortName.toUpperCase(), eff.msg);
    updateHUD();
    saveGame();
    return true;
  }
  return false;
}

// ============================================================================
// RENDERIZAÇÃO DA HOTBAR INFERIOR (9 SLOTS)
// ============================================================================
function renderHotbarUI() {
  if (!mcHotbar || !state.slots) return;

  if (mcHotbar.children.length !== HOTBAR_SIZE) {
    mcHotbar.innerHTML = "";
    for (let i = 0; i < HOTBAR_SIZE; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mc-slot hotbar-slot";
      btn.dataset.slot = String(i);
      btn.addEventListener("click", () => selectHotbarSlot(i));
      mcHotbar.appendChild(btn);
    }
  }

  const activeIdx = THREE.MathUtils.clamp(state.activeHotbarSlot || 0, 0, HOTBAR_SIZE - 1);
  for (let i = 0; i < HOTBAR_SIZE; i++) {
    const btn = mcHotbar.children[i];
    const sl = state.slots[i];
    const def = sl ? getItemDef(sl.id) : null;
    btn.classList.toggle("active", i === activeIdx);
    btn.classList.toggle("empty", !def);
    btn.classList.toggle("hot-today", !!(def && (def.cropId === state.hotCropId || def.seedCropId === state.hotCropId)));

    if (!def) {
      btn.title = `Slot ${i + 1} (Vazio) — Abra o Inventário (I) para organizar`;
      btn.innerHTML = `<span class="mc-slot-num">${i + 1}</span><span class="mc-slot-empty-dot"></span>`;
    } else {
      const isWater = def.id === "regador";
      const isShotgun = def.id === "escopeta";
      const badgeText = isWater
        ? `${state.water}/${getMaxWater()}`
        : isShotgun
          ? `${state.shotgunMag}/${getItemCount("bala_escopeta")}`
          : def.stackable
            ? formatStackQty(sl.qty)
            : "";
      const subBadge = def.subEmoji ? `<span class="mc-slot-subemoji">${def.subEmoji}</span>` : "";
      const hotBadge =
        def.cropId === state.hotCropId || def.seedCropId === state.hotCropId
          ? `<span class="seed-hot-tag">🔥 +40%</span>`
          : "";
      btn.title = `[${i + 1}] ${def.name}${def.stackable ? ` (${sl.qty}x)` : ""} — ${def.desc}`;
      btn.innerHTML = `
        <span class="mc-slot-num">${i + 1}</span>
        ${hotBadge}
        <span class="mc-slot-icon">${def.emoji}${subBadge}</span>
        ${badgeText ? `<span class="mc-slot-qty ${isWater ? "water-qty" : ""}">${badgeText}</span>` : ""}
      `;
    }
  }

  if (hotbarHeldName) {
    const heldSlot = getHeldSlot();
    const heldDef = heldSlot ? getItemDef(heldSlot.id) : null;
    if (!heldDef) {
      hotbarHeldName.textContent = `Slot ${activeIdx + 1}: Mão vazia • [I] Inventário`;
    } else if (heldDef.id === "regador") {
      hotbarHeldName.textContent = `🚿 ${heldDef.name} (${state.water}/${getMaxWater()} água)`;
    } else if (heldDef.id === "escopeta") {
      const shells = getItemCount("bala_escopeta");
      const statusTxt =
        state.shotgunReloadPhase !== "idle"
          ? "Recarregando..."
          : `${state.shotgunMag}/${SHOTGUN_MAG_SIZE} • Reserva: ${shells} • [R] Recarregar`;
      hotbarHeldName.textContent = `🔫 ${heldDef.name} • ${statusTxt}`;
    } else {
      const qtyTxt = heldDef.stackable ? ` • ${heldSlot.qty}x` : "";
      const extraEmoji = heldDef.subEmoji ? ` ${heldDef.subEmoji}` : "";
      hotbarHeldName.textContent = `${heldDef.emoji}${extraEmoji} ${heldDef.name}${qtyTxt}`;
    }
  }
}

// ============================================================================
// MODAL DO INVENTÁRIO ESTILO MINECRAFT (CLIQUE, BOTÃO DIREITO, SHIFT-CLIQUE, 1–9)
// ============================================================================
function updateInvCursorVisual(clientX, clientY) {
  if (!invCursor) return;
  if (!invCursorItem) {
    invCursor.classList.add("hidden");
    return;
  }
  const def = getItemDef(invCursorItem.id);
  if (!def) {
    invCursor.classList.add("hidden");
    return;
  }
  invCursor.classList.remove("hidden");
  invCursor.innerHTML = `
    <span class="mc-slot-icon">${def.emoji}${def.subEmoji ? `<span class="mc-slot-subemoji">${def.subEmoji}</span>` : ""}</span>
    ${def.stackable ? `<span class="mc-slot-qty">${formatStackQty(invCursorItem.qty)}</span>` : ""}
  `;
  if (typeof clientX === "number" && typeof clientY === "number") {
    invCursor.style.left = `${clientX}px`;
    invCursor.style.top = `${clientY}px`;
  }
}

window.addEventListener("pointermove", (e) => {
  if (invCursorItem && invCursor && !invCursor.classList.contains("hidden")) {
    invCursor.style.left = `${e.clientX}px`;
    invCursor.style.top = `${e.clientY}px`;
  }
});

function returnCursorItemToInventory() {
  if (!invCursorItem) return;
  const item = invCursorItem;
  invCursorItem = null;
  updateInvCursorVisual();
  const def = getItemDef(item.id);
  if (!def) return;

  const origArr = item.originContainer === "chest" ? state.chestSlots : state.slots;
  const maxLen = item.originContainer === "chest" ? CHEST_SIZE : INVENTORY_SIZE;
  if (origArr && typeof item.originSlot === "number" && item.originSlot >= 0 && item.originSlot < maxLen) {
    const orig = origArr[item.originSlot];
    if (!orig) {
      origArr[item.originSlot] = { id: item.id, qty: item.qty };
      syncLegacyFromSlots();
      renderHotbarUI();
      return;
    }
    if (def.stackable && orig.id === item.id) {
      orig.qty += item.qty;
      syncLegacyFromSlots();
      renderHotbarUI();
      return;
    }
  }
  if (!addItemToInventory(item.id, item.qty) && state.chestSlots) {
    const emptyChest = state.chestSlots.findIndex((s) => !s);
    if (emptyChest !== -1) state.chestSlots[emptyChest] = { id: item.id, qty: item.qty };
  }
}

function quickTransferSlot(slotIdx) {
  const sl = state.slots[slotIdx];
  if (!sl) return;
  const def = getItemDef(sl.id);
  if (!def) return;

  const isHotbar = slotIdx < HOTBAR_SIZE;
  const start = isHotbar ? HOTBAR_SIZE : 0;
  const end = isHotbar ? INVENTORY_SIZE : HOTBAR_SIZE;

  if (def.stackable) {
    const existing = findFirstSlotWithItem(sl.id, start, end);
    if (existing !== -1) {
      state.slots[existing].qty += sl.qty;
      state.slots[slotIdx] = null;
      sfx.play("phone_tap");
      syncLegacyFromSlots();
      renderHotbarUI();
      renderInventoryModal();
      saveGame();
      return;
    }
  }
  const empty = findFirstEmptySlot(start, end);
  if (empty !== -1) {
    state.slots[empty] = sl;
    state.slots[slotIdx] = null;
    sfx.play("phone_tap");
    syncLegacyFromSlots();
    renderHotbarUI();
    renderInventoryModal();
    saveGame();
  }
}

function swapSlotsDirect(slotA, slotB) {
  if (slotA < 0 || slotA >= INVENTORY_SIZE || slotB < 0 || slotB >= INVENTORY_SIZE || slotA === slotB) return;
  const tmp = state.slots[slotA];
  state.slots[slotA] = state.slots[slotB];
  state.slots[slotB] = tmp;
  sfx.play("phone_tap");
  syncLegacyFromSlots();
  renderHotbarUI();
  renderInventoryModal();
  saveGame();
}

function handleInventorySlotClick(slotIdx, e) {
  invSelectedInspectSlot = slotIdx;
  const target = state.slots[slotIdx];

  if (e && e.shiftKey && !invCursorItem) {
    quickTransferSlot(slotIdx);
    return;
  }

  if (!invCursorItem) {
    if (!target) {
      renderInventoryModal();
      return;
    }
    invCursorItem = { id: target.id, qty: target.qty, originSlot: slotIdx };
    state.slots[slotIdx] = null;
    sfx.play("phone_tap");
    updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
  } else {
    const curDef = getItemDef(invCursorItem.id);
    if (!target) {
      state.slots[slotIdx] = { id: invCursorItem.id, qty: invCursorItem.qty };
      invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual();
    } else if (curDef && curDef.stackable && target.id === invCursorItem.id) {
      target.qty += invCursorItem.qty;
      invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual();
    } else {
      const prev = { id: target.id, qty: target.qty, originSlot: slotIdx };
      state.slots[slotIdx] = { id: invCursorItem.id, qty: invCursorItem.qty };
      invCursorItem = prev;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    }
  }

  syncLegacyFromSlots();
  renderHotbarUI();
  renderInventoryModal();
  saveGame();
}

function handleInventorySlotRightClick(slotIdx, e) {
  if (e) e.preventDefault();
  invSelectedInspectSlot = slotIdx;
  const target = state.slots[slotIdx];

  if (!invCursorItem) {
    if (!target) return;
    const def = getItemDef(target.id);
    if (!def || !def.stackable || target.qty <= 1) {
      handleInventorySlotClick(slotIdx, e);
      return;
    }
    const half = Math.ceil(target.qty / 2);
    target.qty -= half;
    if (target.qty <= 0) state.slots[slotIdx] = null;
    invCursorItem = { id: def.id, qty: half, originSlot: slotIdx };
    sfx.play("phone_tap");
    updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
  } else {
    const curDef = getItemDef(invCursorItem.id);
    if (!curDef) return;
    if (!target) {
      state.slots[slotIdx] = { id: invCursorItem.id, qty: 1 };
      invCursorItem.qty -= 1;
      if (invCursorItem.qty <= 0) invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    } else if (curDef.stackable && target.id === invCursorItem.id) {
      target.qty += 1;
      invCursorItem.qty -= 1;
      if (invCursorItem.qty <= 0) invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    }
  }

  syncLegacyFromSlots();
  renderHotbarUI();
  renderInventoryModal();
  saveGame();
}

function sortBackpackSlots() {
  returnCursorItemToInventory();
  const catOrder = { tool: 0, seed: 1, supply: 2, crop: 3, animal: 4, dish: 5 };
  const merged = new Map();
  const uniques = [];
  for (let i = HOTBAR_SIZE; i < INVENTORY_SIZE; i++) {
    const sl = state.slots[i];
    if (!sl) continue;
    const def = getItemDef(sl.id);
    if (!def) continue;
    if (def.stackable) merged.set(sl.id, (merged.get(sl.id) || 0) + sl.qty);
    else uniques.push({ id: sl.id, qty: 1 });
    state.slots[i] = null;
  }
  const combined = [...uniques];
  merged.forEach((qty, id) => combined.push({ id, qty }));
  combined.sort((a, b) => {
    const da = getItemDef(a.id);
    const db = getItemDef(b.id);
    const ca = catOrder[da.category] ?? 9;
    const cb = catOrder[db.category] ?? 9;
    if (ca !== cb) return ca - cb;
    return da.name.localeCompare(db.name, "pt-BR");
  });
  combined.forEach((item, idx) => {
    if (HOTBAR_SIZE + idx < INVENTORY_SIZE) state.slots[HOTBAR_SIZE + idx] = item;
  });
  sfx.play("upgrade");
  syncLegacyFromSlots();
  renderHotbarUI();
  renderInventoryModal();
  saveGame();
}

function renderMcInventoryGrid() {
  if (!inventoryList) return;
  if (invMoneyVal) invMoneyVal.textContent = formatBRL(state.money);
  const totalWorth = CROP_KEYS.reduce((s, k) => s + (state.inventory[k] || 0) * getCropSellPrice(k), 0);
  if (invBasketWorthVal) invBasketWorthVal.textContent = formatBRL(totalWorth);

  inventoryList.innerHTML = "";

  const tabBar = document.createElement("div");
  tabBar.className = "inv-toolbar";
  tabBar.style.justifyContent = "flex-end";
  tabBar.innerHTML = `
    <button type="button" class="mini-btn" id="sortBagBtn" title="Organizar e empilhar mochila">✨ Organizar</button>
  `;
  const sortBtn = tabBar.querySelector("#sortBagBtn");
  if (sortBtn) sortBtn.addEventListener("click", sortBackpackSlots);
  inventoryList.appendChild(tabBar);

  // Mostra barra compacta de inspeção SOMENTE quando um item for clicado/selecionado (sem o card de mochila/texto padrão!)
  const inspectSlot = invSelectedInspectSlot >= 0 ? state.slots[invSelectedInspectSlot] : null;
  const inspectData = invCursorItem || inspectSlot;
  const inspectDef = inspectData ? getItemDef(inspectData.id) : null;

  if (inspectDef) {
    const inspector = document.createElement("div");
    inspector.className = "inv-inspector";
    const catLabels = {
      tool: "Ferramenta",
      seed: "Semente",
      supply: "Insumo",
      crop: "Colheita",
      animal: "Produto Animal",
      dish: "Prato Caseiro",
    };
    const priceExtra = inspectDef.cropId ? ` • Terminal hoje: <strong>${formatBRL(getCropSellPrice(inspectDef.cropId))}</strong>` : "";
    const qtyInfo =
      inspectDef.id === "regador"
        ? `Água: <strong>${state.water}/${getMaxWater()}</strong>`
        : inspectDef.id === "escopeta"
          ? `Carregada: <strong>${state.shotgunMag}/${SHOTGUN_MAG_SIZE}</strong> • Reserva: <strong>${getItemCount("bala_escopeta")}</strong>`
          : inspectDef.stackable
            ? `Quantidade: <strong>${inspectData.qty}x</strong>`
            : "Item único";
    const canQuickUse = !invCursorItem && (inspectDef.id === "vaselina" || !!inspectDef.foodEffect);
    const canQuickMove = !invCursorItem && invSelectedInspectSlot >= 0 && !!state.slots[invSelectedInspectSlot];
    inspector.innerHTML = `
      <div class="inv-insp-icon">${inspectDef.emoji}${inspectDef.subEmoji ? `<span class="mc-slot-subemoji">${inspectDef.subEmoji}</span>` : ""}</div>
      <div class="inv-insp-meta">
        <div class="inv-insp-title">${inspectDef.name} <span class="inv-cat-pill">${catLabels[inspectDef.category] || "Item"}</span></div>
        <div class="inv-insp-sub">${qtyInfo}${priceExtra} — ${inspectDef.desc}</div>
      </div>
      <div class="inv-insp-actions">
        ${canQuickUse ? `<button type="button" class="mini-btn green" id="invQuickUseBtn">${inspectDef.id === "vaselina" ? "🧴 Usar" : "🍽️ Comer"}</button>` : ""}
        ${canQuickMove ? `<button type="button" class="mini-btn" id="invQuickMoveBtn">${invSelectedInspectSlot < HOTBAR_SIZE ? "↓ p/ Mochila" : "↑ p/ Hotbar"}</button>` : ""}
      </div>
    `;
    const useBtn = inspector.querySelector("#invQuickUseBtn");
    if (useBtn) {
      useBtn.addEventListener("click", () => {
        if (inspectDef.id === "vaselina") {
          drinkVaselina();
        } else if (inspectDef.foodEffect && removeItemFromInventory(inspectDef.id, 1, false)) {
          const eff = inspectDef.foodEffect;
          if (eff.hp) state.playerHp = Math.min(state.maxHp, state.playerHp + eff.hp);
          if (eff.energy) state.energyTimer = Math.max(state.energyTimer, eff.energy);
          if (eff.insanityDelta) {
            if (eff.insanityDelta > 0) addInsanity(eff.insanityDelta, false);
            else {
              state.insanity = THREE.MathUtils.clamp(state.insanity + eff.insanityDelta, 0, 100);
              state.isCrazy = state.insanity >= 100;
            }
          }
          sfx.play(eff.insanityDelta > 0 ? "chuckle" : "upgrade");
          showToast(inspectDef.emoji, inspectDef.shortName.toUpperCase(), eff.msg);
          updateHUD();
          saveGame();
        }
        renderInventoryModal();
      });
    }
    const mvBtn = inspector.querySelector("#invQuickMoveBtn");
    if (mvBtn) mvBtn.addEventListener("click", () => quickTransferSlot(invSelectedInspectSlot));
    inventoryList.appendChild(inspector);
  }

  const buildSlotEl = (slotIdx, isHotbar) => {
    const sl = state.slots[slotIdx];
    const def = sl ? getItemDef(sl.id) : null;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `mc-slot inv-grid-slot${isHotbar ? " is-hotbar" : ""}${isHotbar && slotIdx === state.activeHotbarSlot ? " active" : ""}${slotIdx === invSelectedInspectSlot ? " selected" : ""}${!def ? " empty" : ""}`;
    cell.dataset.slot = String(slotIdx);

    if (def) {
      const isWater = def.id === "regador";
      const isSg = def.id === "escopeta";
      const badge = isWater
        ? `${state.water}/${getMaxWater()}`
        : isSg
          ? `${state.shotgunMag}/${getItemCount("bala_escopeta")}`
          : def.stackable
            ? formatStackQty(sl.qty)
            : "";
      cell.title = `${def.name}${def.stackable ? ` (${sl.qty}x)` : ""}\n${def.desc}`;
      cell.innerHTML = `
        ${isHotbar ? `<span class="mc-slot-num">${slotIdx + 1}</span>` : ""}
        <span class="mc-slot-icon">${def.emoji}${def.subEmoji ? `<span class="mc-slot-subemoji">${def.subEmoji}</span>` : ""}</span>
        ${badge ? `<span class="mc-slot-qty ${isWater ? "water-qty" : ""}">${badge}</span>` : ""}
      `;
    } else {
      cell.innerHTML = isHotbar ? `<span class="mc-slot-num">${slotIdx + 1}</span>` : "";
    }

    if (def) {
      cell.draggable = true;
      cell.addEventListener("dragstart", (e) => {
        if (invCursorItem) returnCursorItemToInventory();
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", String(slotIdx));
          e.dataTransfer.effectAllowed = "move";
        }
        cell.classList.add("dragging");
      });
      cell.addEventListener("dragend", () => cell.classList.remove("dragging"));
    }
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      cell.classList.add("drag-over");
    });
    cell.addEventListener("dragleave", () => cell.classList.remove("drag-over"));
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      cell.classList.remove("drag-over");
      const fromIdx = Number(e.dataTransfer ? e.dataTransfer.getData("text/plain") : -1);
      if (!Number.isInteger(fromIdx) || fromIdx < 0 || fromIdx >= INVENTORY_SIZE || fromIdx === slotIdx) return;
      const src = state.slots[fromIdx];
      const dst = state.slots[slotIdx];
      if (!src) return;
      const srcDef = getItemDef(src.id);
      if (dst && srcDef && srcDef.stackable && dst.id === src.id) {
        dst.qty += src.qty;
        state.slots[fromIdx] = null;
        sfx.play("phone_tap");
        syncLegacyFromSlots();
        renderHotbarUI();
        renderInventoryModal();
        saveGame();
      } else {
        swapSlotsDirect(fromIdx, slotIdx);
      }
    });

    cell.addEventListener("mouseenter", () => { invHoveredSlot = slotIdx; });
    cell.addEventListener("mouseleave", () => { if (invHoveredSlot === slotIdx) invHoveredSlot = -1; });
    cell.addEventListener("click", (e) => handleInventorySlotClick(slotIdx, e));
    cell.addEventListener("contextmenu", (e) => handleInventorySlotRightClick(slotIdx, e));
    return cell;
  };

  const bagLabel = document.createElement("div");
  bagLabel.className = "inv-section-label";
  bagLabel.textContent = "MOCHILA (36 SLOTS)";
  inventoryList.appendChild(bagLabel);

  const bagGrid = document.createElement("div");
  bagGrid.className = "inv-grid";
  for (let i = HOTBAR_SIZE; i < INVENTORY_SIZE; i++) {
    bagGrid.appendChild(buildSlotEl(i, false));
  }
  inventoryList.appendChild(bagGrid);

  const hbLabel = document.createElement("div");
  hbLabel.className = "inv-section-label hotbar-label";
  hbLabel.textContent = "HOTBAR INFERIOR (TECLAS 1–9)";
  inventoryList.appendChild(hbLabel);

  const hbGrid = document.createElement("div");
  hbGrid.className = "inv-grid inv-grid-hotbar";
  for (let i = 0; i < HOTBAR_SIZE; i++) {
    hbGrid.appendChild(buildSlotEl(i, true));
  }
  inventoryList.appendChild(hbGrid);
}


// ============================================================================
// BAÚ DO SÍTIO (36 SLOTS • STACK ILIMITADO • TRANSFERÊNCIA MOCHILA ↔ BAÚ)
// ============================================================================
function getContainerSlots(containerName) {
  if (containerName === "chest") {
    if (!state.chestSlots) state.chestSlots = createEmptyChestSlots();
    return state.chestSlots;
  }
  if (!state.slots) state.slots = createEmptySlots();
  return state.slots;
}

function quickTransferChestPlayer(fromContainer, slotIdx) {
  const srcArr = getContainerSlots(fromContainer);
  const dstContainer = fromContainer === "chest" ? "player" : "chest";
  const dstArr = getContainerSlots(dstContainer);
  const sl = srcArr[slotIdx];
  if (!sl) return;
  const def = getItemDef(sl.id);
  if (!def) return;

  if (def.stackable) {
    for (let i = 0; i < dstArr.length; i++) {
      if (dstArr[i] && dstArr[i].id === sl.id) {
        dstArr[i].qty += sl.qty;
        srcArr[slotIdx] = null;
        sfx.play("phone_tap");
        syncLegacyFromSlots();
        renderHotbarUI();
        renderChestModal();
        saveGame();
        return;
      }
    }
  }
  for (let i = 0; i < dstArr.length; i++) {
    if (!dstArr[i]) {
      dstArr[i] = sl;
      srcArr[slotIdx] = null;
      sfx.play("phone_tap");
      syncLegacyFromSlots();
      renderHotbarUI();
      renderChestModal();
      saveGame();
      return;
    }
  }
  sfx.play("error");
  showToast("📦", dstContainer === "chest" ? "BAÚ LOTADO!" : "MOCHILA LOTADA!", "Não há espaço livre no destino.");
}

function handleChestGridClick(containerName, slotIdx, e) {
  const arr = getContainerSlots(containerName);
  const target = arr[slotIdx];

  if (e && e.shiftKey && !invCursorItem) {
    quickTransferChestPlayer(containerName, slotIdx);
    return;
  }

  if (!invCursorItem) {
    if (!target) return;
    invCursorItem = { id: target.id, qty: target.qty, originSlot: slotIdx, originContainer: containerName };
    arr[slotIdx] = null;
    sfx.play("phone_tap");
    updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
  } else {
    const curDef = getItemDef(invCursorItem.id);
    if (!target) {
      arr[slotIdx] = { id: invCursorItem.id, qty: invCursorItem.qty };
      invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual();
    } else if (curDef && curDef.stackable && target.id === invCursorItem.id) {
      target.qty += invCursorItem.qty;
      invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual();
    } else {
      const prev = { id: target.id, qty: target.qty, originSlot: slotIdx, originContainer: containerName };
      arr[slotIdx] = { id: invCursorItem.id, qty: invCursorItem.qty };
      invCursorItem = prev;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    }
  }

  syncLegacyFromSlots();
  renderHotbarUI();
  renderChestModal();
  saveGame();
}

function handleChestGridRightClick(containerName, slotIdx, e) {
  if (e) e.preventDefault();
  const arr = getContainerSlots(containerName);
  const target = arr[slotIdx];

  if (!invCursorItem) {
    if (!target) return;
    const def = getItemDef(target.id);
    if (!def || !def.stackable || target.qty <= 1) {
      handleChestGridClick(containerName, slotIdx, e);
      return;
    }
    const half = Math.ceil(target.qty / 2);
    target.qty -= half;
    if (target.qty <= 0) arr[slotIdx] = null;
    invCursorItem = { id: def.id, qty: half, originSlot: slotIdx, originContainer: containerName };
    sfx.play("phone_tap");
    updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
  } else {
    const curDef = getItemDef(invCursorItem.id);
    if (!curDef) return;
    if (!target) {
      arr[slotIdx] = { id: invCursorItem.id, qty: 1 };
      invCursorItem.qty -= 1;
      if (invCursorItem.qty <= 0) invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    } else if (curDef.stackable && target.id === invCursorItem.id) {
      target.qty += 1;
      invCursorItem.qty -= 1;
      if (invCursorItem.qty <= 0) invCursorItem = null;
      sfx.play("phone_tap");
      updateInvCursorVisual(e ? e.clientX : undefined, e ? e.clientY : undefined);
    }
  }

  syncLegacyFromSlots();
  renderHotbarUI();
  renderChestModal();
  saveGame();
}

function sortChestSlots() {
  returnCursorItemToInventory();
  const arr = getContainerSlots("chest");
  const catOrder = { tool: 0, seed: 1, supply: 2, crop: 3, animal: 4, dish: 5 };
  const merged = new Map();
  const uniques = [];
  for (let i = 0; i < CHEST_SIZE; i++) {
    const sl = arr[i];
    if (!sl) continue;
    const def = getItemDef(sl.id);
    if (!def) continue;
    if (def.stackable) merged.set(sl.id, (merged.get(sl.id) || 0) + sl.qty);
    else uniques.push({ id: sl.id, qty: 1 });
    arr[i] = null;
  }
  const combined = [...uniques];
  merged.forEach((qty, id) => combined.push({ id, qty }));
  combined.sort((a, b) => {
    const da = getItemDef(a.id);
    const db = getItemDef(b.id);
    const ca = catOrder[da.category] ?? 9;
    const cb = catOrder[db.category] ?? 9;
    if (ca !== cb) return ca - cb;
    return da.name.localeCompare(db.name, "pt-BR");
  });
  combined.forEach((item, idx) => {
    if (idx < CHEST_SIZE) arr[idx] = item;
  });
  sfx.play("upgrade");
  renderChestModal();
  saveGame();
}

function openChestModal() {
  if (!chestModal || state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  if (!state.chestSlots) state.chestSlots = createEmptyChestSlots();
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  sfx.play("chest_open");
  renderChestModal();
  chestModal.classList.remove("hidden");
}

function closeChestModal() {
  if (!chestModal) return;
  returnCursorItemToInventory();
  chestModal.classList.add("hidden");
  state.mode = "playing";
  sfx.play("chest_close");
  updateHUD();
}

function renderChestModal() {
  if (!chestModalBody) return;
  if (!state.chestSlots) state.chestSlots = createEmptyChestSlots();
  chestModalBody.innerHTML = "";

  const toolbar = document.createElement("div");
  toolbar.className = "inv-toolbar";
  toolbar.innerHTML = `
    <span class="desc compact" style="margin:0"><strong>Shift + Clique</strong> transfere rápido entre Baú e Mochila • <strong>Clique Dir.:</strong> divide / solta 1 • <strong>Arraste</strong> para organizar</span>
    <button type="button" class="mini-btn green" id="sortChestBtn">✨ Organizar Baú</button>
  `;
  const sBtn = toolbar.querySelector("#sortChestBtn");
  if (sBtn) sBtn.addEventListener("click", sortChestSlots);
  chestModalBody.appendChild(toolbar);

  const buildUnifiedSlot = (containerName, slotIdx, isHotbar = false) => {
    const arr = getContainerSlots(containerName);
    const sl = arr[slotIdx];
    const def = sl ? getItemDef(sl.id) : null;
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = `mc-slot inv-grid-slot${isHotbar ? " is-hotbar" : ""}${isHotbar && slotIdx === state.activeHotbarSlot ? " active" : ""}${!def ? " empty" : ""}`;

    if (def) {
      const isWater = def.id === "regador";
      const badge = isWater ? `${state.water}/${getMaxWater()}` : def.stackable ? formatStackQty(sl.qty) : "";
      cell.title = `${def.name}${def.stackable ? ` (${sl.qty}x)` : ""}\n${def.desc}`;
      cell.innerHTML = `
        ${isHotbar ? `<span class="mc-slot-num">${slotIdx + 1}</span>` : ""}
        <span class="mc-slot-icon">${def.emoji}${def.subEmoji ? `<span class="mc-slot-subemoji">${def.subEmoji}</span>` : ""}</span>
        ${badge ? `<span class="mc-slot-qty ${isWater ? "water-qty" : ""}">${badge}</span>` : ""}
      `;
      cell.draggable = true;
      cell.addEventListener("dragstart", (e) => {
        if (invCursorItem) returnCursorItemToInventory();
        if (e.dataTransfer) {
          e.dataTransfer.setData("text/plain", `${containerName}:${slotIdx}`);
          e.dataTransfer.effectAllowed = "move";
        }
        cell.classList.add("dragging");
      });
      cell.addEventListener("dragend", () => cell.classList.remove("dragging"));
    } else {
      cell.innerHTML = isHotbar ? `<span class="mc-slot-num">${slotIdx + 1}</span>` : "";
    }

    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      cell.classList.add("drag-over");
    });
    cell.addEventListener("dragleave", () => cell.classList.remove("drag-over"));
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      cell.classList.remove("drag-over");
      const raw = e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
      const [fromCont, idxStr] = raw.split(":");
      const fromIdx = Number(idxStr);
      if ((fromCont !== "chest" && fromCont !== "player") || !Number.isInteger(fromIdx)) return;
      if (fromCont === containerName && fromIdx === slotIdx) return;
      const srcArr = getContainerSlots(fromCont);
      const dstArr = getContainerSlots(containerName);
      const src = srcArr[fromIdx];
      const dst = dstArr[slotIdx];
      if (!src) return;
      const srcDef = getItemDef(src.id);
      if (dst && srcDef && srcDef.stackable && dst.id === src.id) {
        dst.qty += src.qty;
        srcArr[fromIdx] = null;
      } else {
        dstArr[slotIdx] = src;
        srcArr[fromIdx] = dst;
      }
      sfx.play("phone_tap");
      syncLegacyFromSlots();
      renderHotbarUI();
      renderChestModal();
      saveGame();
    });

    cell.addEventListener("click", (e) => handleChestGridClick(containerName, slotIdx, e));
    cell.addEventListener("contextmenu", (e) => handleChestGridRightClick(containerName, slotIdx, e));
    return cell;
  };

  const chestLbl = document.createElement("div");
  chestLbl.className = "inv-section-label hotbar-label";
  chestLbl.textContent = "🧰 BAÚ DO SÍTIO (36 SLOTS • STACK ILIMITADO)";
  chestModalBody.appendChild(chestLbl);

  const chestGrid = document.createElement("div");
  chestGrid.className = "inv-grid";
  for (let i = 0; i < CHEST_SIZE; i++) {
    chestGrid.appendChild(buildUnifiedSlot("chest", i, false));
  }
  chestModalBody.appendChild(chestGrid);

  const bagLbl = document.createElement("div");
  bagLbl.className = "inv-section-label";
  bagLbl.textContent = "🎒 SUA MOCHILA (36 SLOTS)";
  chestModalBody.appendChild(bagLbl);

  const bagGrid = document.createElement("div");
  bagGrid.className = "inv-grid";
  for (let i = HOTBAR_SIZE; i < INVENTORY_SIZE; i++) {
    bagGrid.appendChild(buildUnifiedSlot("player", i, false));
  }
  chestModalBody.appendChild(bagGrid);

  const hbLbl = document.createElement("div");
  hbLbl.className = "inv-section-label hotbar-label";
  hbLbl.textContent = "HOTBAR (1–9)";
  chestModalBody.appendChild(hbLbl);

  const hbGrid = document.createElement("div");
  hbGrid.className = "inv-grid inv-grid-hotbar";
  for (let i = 0; i < HOTBAR_SIZE; i++) {
    hbGrid.appendChild(buildUnifiedSlot("player", i, true));
  }
  chestModalBody.appendChild(hbGrid);
}
