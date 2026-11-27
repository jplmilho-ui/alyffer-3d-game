// Shop Modal Logic
function openShopModal() {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderShopModal();
  shopModal.classList.remove("hidden");
}

function closeShopModal() {
  shopModal.classList.add("hidden");
  state.mode = "playing";
}

function openCookModal() {
  if (!cookModal || state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderCookModal();
  cookModal.classList.remove("hidden");
}

function closeCookModal() {
  if (!cookModal) return;
  cookModal.classList.add("hidden");
  state.mode = "playing";
}

function renderCookModal() {
  if (!cookRecipesList) return;
  cookRecipesList.innerHTML = "";
  KITCHEN_RECIPES.forEach((rec) => {
    const canCook = canFulfillReq(rec.req);
    const ownedQty = state.inventory[rec.id] || 0;
    const sellPrice = getCropSellPrice(rec.id);
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${rec.emoji}</span>
        <div>
          <div class="row-title">${rec.name} (Na cesta: ${ownedQty})</div>
          <div class="row-sub">Ingredientes: <strong>${rec.reqLabel}</strong><br/>Venda no Terminal: <strong>${formatBRL(sellPrice)}</strong> • Comer: ${rec.eatEffect.msg}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
        <button class="mini-btn green cook-make-btn" ${canCook ? "" : "disabled"}>🍳 Cozinhar</button>
        <button class="mini-btn cook-eat-btn" ${ownedQty > 0 ? "" : "disabled"}>😋 Comer (${ownedQty})</button>
      </div>
    `;
    row.querySelector(".cook-make-btn").addEventListener("click", () => {
      if (!canFulfillReq(rec.req)) return;
      if (!canAddItemToInventory(rec.id, 1)) {
        sfx.play("error");
        showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de cozinhar!");
        return;
      }
      consumeReq(rec.req);
      addItemToInventory(rec.id, 1);
      if (typeof trackGoalProgress === "function") trackGoalProgress("cook", 1);
      sfx.play("cook");
      spawnFloatingText(STOVE_POS, `+1 ${rec.emoji}`, "#facc15");
      showToast(rec.emoji, "PRATO PREPARADO!", `${rec.name} pronto! Venda no Terminal ou coma agora.`);
      updateHUD();
      renderCookModal();
      saveGame();
    });
    row.querySelector(".cook-eat-btn").addEventListener("click", () => {
      if ((state.inventory[rec.id] || 0) <= 0) return;
      removeItemFromInventory(rec.id, 1, false);
      state.playerHp = Math.min(state.maxHp, rec.eatEffect.hp || state.maxHp);
      state.energyTimer = Math.max(state.energyTimer, rec.eatEffect.energy || 60);
      if (rec.eatEffect.insanityDelta) {
        state.insanity = THREE.MathUtils.clamp(state.insanity + rec.eatEffect.insanityDelta, 0, 100);
        state.isCrazy = state.insanity >= 100;
      }
      sfx.play("upgrade");
      showToast(rec.emoji, "DELÍCIA DA ROÇA!", rec.eatEffect.msg);
      updateHUD();
      renderCookModal();
      saveGame();
    });
    cookRecipesList.appendChild(row);
  });
}

function renderShopModal() {
  shopMoneyVal.textContent = formatBRL(state.money);
  shopItemsList.innerHTML = "";

  const addHeader = (text) => {
    const h = document.createElement("div");
    h.className = "shop-section-title";
    h.textContent = text;
    shopItemsList.appendChild(h);
  };

  // 0. SEMENTES DA ROÇA (Vão direto para o seu Inventário com stack ilimitado!)
  addHeader("🌱 SEMENTES DA ROÇA (VÃO PARA O INVENTÁRIO)");
  SEED_KEYS.forEach((cropId) => {
    const c = CROPS[cropId];
    const owned = getItemCount(`seed_${cropId}`);
    const isHot = cropId === state.hotCropId;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${c.emoji}</span>
        <div>
          <div class="row-title">Semente de ${c.name} ${isHot ? '<span class="hot-pill">🔥 +40%</span>' : ""}</div>
          <div class="row-sub">No inventário: <strong>${owned}x</strong> • Colheita hoje: ~${formatBRL(getCropSellPrice(cropId))}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
        <button type="button" class="mini-btn green" data-amt="1" ${state.money < c.seedCost ? "disabled" : ""}>+1 (${formatBRL(c.seedCost)})</button>
        <button type="button" class="mini-btn green" data-amt="5" ${state.money < c.seedCost * 5 ? "disabled" : ""}>+5 (${formatBRL(c.seedCost * 5)})</button>
      </div>
    `;
    row.querySelectorAll("[data-amt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (buySeedPack(cropId, Number(btn.dataset.amt))) renderShopModal();
      });
    });
    shopItemsList.appendChild(row);
  });

  // 1. TERRENOS & EXPANSÃO DA FAZENDA (Preços mais caros e equilibrados; canteiros dos terrenos são comprados à parte!)
  addHeader("🏞️ TERRENOS & EXPANSÃO DA FAZENDA");
  const landItems = [
    {
      emoji: "🌾",
      title: "Pasto Oeste (Terreno + Celeiro & +5 Animais)",
      sub: state.landLevel >= 1
        ? "Terreno Oeste adquirido! Limite p/ 11 animais e liberada a compra dos 12 canteiros do Oeste abaixo."
        : "Expande a fazenda p/ Oeste, aumenta limite p/ 11 animais e libera a compra de 12 novos canteiros!",
      cost: 3500,
      owned: state.landLevel >= 1,
      available: true,
      buy: () => {
        state.landLevel = 1;
        syncUnlockedPlots();
        showDayBanner("🏞️ PASTO OESTE ADQUIRIDO! AGORA COMPRE OS CANTEIROS DO OESTE NA LOJA!");
      },
    },
    {
      emoji: "🚜",
      title: "Fazenda Leste (Terreno + Acesso Lago & +5 Animais)",
      sub: state.landLevel >= 2
        ? "Fazenda Leste adquirida! Limite máximo de 16 animais e liberada a compra dos 12 canteiros do Leste abaixo."
        : state.landLevel < 1
          ? "Requer Pasto Oeste primeiro! Aumenta limite p/ 16 animais e libera compra de 12 canteiros."
          : "Expande a fazenda p/ Leste até a porteira do Lago! +5 animais e libera compra de 12 novos canteiros!",
      cost: 8500,
      owned: state.landLevel >= 2,
      available: state.landLevel >= 1,
      buy: () => {
        state.landLevel = 2;
        syncUnlockedPlots();
        showDayBanner("🚜 FAZENDA LESTE ADQUIRIDA! AGORA COMPRE OS CANTEIROS DO LESTE NA LOJA!");
      },
    },
  ];

  landItems.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const canBuy = !it.owned && it.available && state.money >= it.cost;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${canBuy ? "" : "disabled"}>
        ${it.owned ? "Comprado ✓" : !it.available ? "Bloqueado" : `Comprar ${formatBRL(it.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canBuy) return;
      state.money -= it.cost;
      it.buy();
      sfx.play("upgrade");
      updateHUD();
      renderShopModal();
      saveGame();
    });
    shopItemsList.appendChild(row);
  });

  // 2. ANIMAIS DO PASTO & CURRAL
  const aliveAnimals = state.animals.filter((a) => a.alive).length;
  const maxAn = getMaxAnimals();
  addHeader(`🐄 ANIMAIS DA FAZENDA (${aliveAnimals}/${maxAn} Animais)`);
  const animalList = [
    {
      type: "cow",
      emoji: "🐄",
      title: "Vaca Leiteira Caipira",
      sub: `Leite Fresco (${formatBRL(CROPS.leite_fresco.basePrice)} c/ Balde 🪣) • Reproduz com 🌾 Trigo (B)`,
      cost: ANIMAL_TYPES.cow.cost,
    },
    {
      type: "sheep",
      emoji: "🐑",
      title: "Ovelha da Mantiqueira",
      sub: `Lã Macia (${formatBRL(CROPS.la_ovelha.basePrice)} c/ Tesoura ✂️) • Reproduz com 🌾 Trigo (B)`,
      cost: ANIMAL_TYPES.sheep.cost,
    },
    {
      type: "pig",
      emoji: "🐷",
      title: "Porco Caipira Raro",
      sub: `Trufas Nobres (${formatBRL(CROPS.trufa_porco.basePrice)}) • Reproduz com 🥕 Cenoura (B)`,
      cost: ANIMAL_TYPES.pig.cost,
    },
  ];

  animalList.forEach((an) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const count = state.animals.filter((a) => a.alive && a.type === an.type).length;
    const canAfford = aliveAnimals < maxAn && state.money >= an.cost;
    const btnText = aliveAnimals >= maxAn ? "Curral Lotado" : `Comprar ${formatBRL(an.cost)}`;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${an.emoji}</span>
        <div>
          <div class="row-title">${an.title} (${count} no sítio)</div>
          <div class="row-sub">${an.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${canAfford ? "" : "disabled"}>${btnText}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canAfford) return;
      if (buyAnimal(an.type)) {
        state.money -= an.cost;
        sfx.play("sell");
        showToast(an.emoji, "NOVO ANIMAL ADQUIRIDO!", `${an.title} foi para o pasto! Compre um par p/ reproduzir.`);
        updateHUD();
        renderShopModal();
        saveGame();
      }
    });
    shopItemsList.appendChild(row);
  });

  // 3. AVISO DE FERRAMENTAS & ENXADAS NA ESTAÇÃO CLP
  addHeader("🚉 FERRAMENTAS & ENXADAS ESPECIAIS");
  const curHoe = getActiveHoe();
  const stationHint = document.createElement("div");
  stationHint.className = "row-card";
  stationHint.innerHTML = `
    <div class="row-info">
      <span class="row-emoji">🚉</span>
      <div>
        <div class="row-title">Loja da Estação Ferroviária CLP (Atual: ${curHoe.emoji} ${curHoe.name})</div>
        <div class="row-sub">Pegue o Ônibus 402 até o Terminal CLP e suba na plataforma da Estação p/ comprar Escopeta Cal. 12 🔫, Celular 📱, Enxadas Especiais ⛏️, Baldes 🪣 e Tesoura ✂️!</div>
      </div>
    </div>
  `;
  shopItemsList.appendChild(stationHint);

  // 4. CANTEIROS & MELHORIAS DO SÍTIO
  addHeader("💧 CANTEIROS, IRRIGAÇÃO & MELHORIAS");
  const plotCost = 180 + (state.upgrades.plotTier || 0) * 190;
  const westPlotTier = state.upgrades.westPlotTier || 0;
  const eastPlotTier = state.upgrades.eastPlotTier || 0;
  const westPlotCost = 750 + westPlotTier * 450;
  const eastPlotCost = 1400 + eastPlotTier * 700;
  const canCost = 160 * state.upgrades.canLevel;
  const autoWaterCost = state.upgrades.autoWaterLevel === 0 ? 650 : 1600;
  const fertCost = 220 * state.upgrades.fertLevel;
  const standCost = 280 * state.upgrades.standLevel;

  const basePlotsUnlocked = Math.min(36, 6 + (state.upgrades.plotTier || 0) * 3);
  const westPlotsUnlocked = Math.min(12, westPlotTier * 3);
  const eastPlotsUnlocked = Math.min(12, eastPlotTier * 3);
  const items = [
    {
      emoji: "🌱",
      title: `Canteiros da Horta Principal (+3 Canteiros)`,
      sub: `Horta base: ${basePlotsUnlocked}/36 canteiros • Total desbloqueado: ${getUnlockedPlotCount()}/60`,
      cost: plotCost,
      maxed: (state.upgrades.plotTier || 0) >= 10,
      buy: () => {
        state.upgrades.plotTier = (state.upgrades.plotTier || 0) + 1;
        syncUnlockedPlots();
      },
    },
    ...(state.landLevel >= 1
      ? [
          {
            emoji: "🌾",
            title: `Canteiros do Pasto Oeste (+3 Canteiros)`,
            sub: `Pasto Oeste: ${westPlotsUnlocked}/12 canteiros desbloqueados`,
            cost: westPlotCost,
            maxed: westPlotTier >= 4,
            buy: () => {
              state.upgrades.westPlotTier = westPlotTier + 1;
              syncUnlockedPlots();
            },
          },
        ]
      : []),
    ...(state.landLevel >= 2
      ? [
          {
            emoji: "🚜",
            title: `Canteiros da Fazenda Leste (+3 Canteiros)`,
            sub: `Fazenda Leste: ${eastPlotsUnlocked}/12 canteiros desbloqueados`,
            cost: eastPlotCost,
            maxed: eastPlotTier >= 4,
            buy: () => {
              state.upgrades.eastPlotTier = eastPlotTier + 1;
              syncUnlockedPlots();
            },
          },
        ]
      : []),
    {
      emoji: "💦",
      title:
        state.upgrades.autoWaterLevel === 0
          ? `Água Automática (Aspersores na Horta)`
          : `Irrigação Automática Pro (Nível ${state.upgrades.autoWaterLevel}/2)`,
      sub:
        state.upgrades.autoWaterLevel === 0
          ? `Instala 6 aspersores 3D que regam toda a horta automaticamente!`
          : state.upgrades.autoWaterLevel === 1
            ? `Nível 2: Irrigação contínua + bônus de +15% na velocidade das plantas!`
            : `Irrigação automática máxima ativa (+15% velocidade)!`,
      cost: autoWaterCost,
      maxed: state.upgrades.autoWaterLevel >= 2,
      buy: () => {
        state.upgrades.autoWaterLevel += 1;
        if (sprinklerGroup) {
          sprinklerGroup.visible = true;
          sprinklerHeads.forEach((shd) => {
            if (shd.mesh) shd.mesh.visible = (shd.landReq || 0) <= (state.landLevel || 0);
          });
        }
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
      title: `Solo Fértil da Roça (Nível ${state.upgrades.fertLevel}/4)`,
      sub: `Crescimento +${(state.upgrades.fertLevel - 1) * 25}% • Chance de colheita dupla (p/ adubo turbo, compre com o Kaio na ETEC!)`,
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

// ============================================================================
// INVENTÁRIO (TECLA I) & LOJA DA ESTAÇÃO CLP (ENXADAS, BALDE & TESOURA)
// ============================================================================
function openInventoryModal() {
  if (!inventoryModal || state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  invSelectedInspectSlot = state.activeHotbarSlot;
  renderInventoryModal();
  inventoryModal.classList.remove("hidden");
}

function closeInventoryModal() {
  if (!inventoryModal) return;
  if (typeof invHelpPopover !== "undefined" && invHelpPopover) invHelpPopover.classList.add("hidden");
  if (typeof returnCursorItemToInventory === "function") returnCursorItemToInventory();
  invHoveredSlot = -1;
  inventoryModal.classList.add("hidden");
  state.mode = "playing";
  updateHUD();
}

function renderInventoryModal() {
  if (typeof renderMcInventoryGrid === "function") {
    renderMcInventoryGrid();
  }
}

function openStationShopModal() {
  if (!stationShopModal || state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderStationShopModal();
  stationShopModal.classList.remove("hidden");
}

function closeStationShopModal() {
  if (!stationShopModal) return;
  stationShopModal.classList.add("hidden");
  state.mode = "playing";
  updateHUD();
}

function renderStationShopModal() {
  if (!stationShopItemsList) return;
  if (stationShopMoneyVal) stationShopMoneyVal.textContent = formatBRL(state.money);
  stationShopItemsList.innerHTML = "";

  const addStHeader = (text) => {
    const h = document.createElement("div");
    h.className = "shop-section-title";
    h.textContent = text;
    stationShopItemsList.appendChild(h);
  };

  addStHeader("🪣 FERRAMENTAS DE MANEJO ANIMAL (ESTAÇÃO CLP)");
  const baldeInfo = STATION_TOOLS.balde;
  const tesouraInfo = STATION_TOOLS.tesoura;
  const ownedTesoura = (state.inventory.tesoura || 0) >= 1;
  const ownedCelular = getItemCount("celular") > 0;
  const celularCost = 180;

  const toolEntries = [
    {
      emoji: "📱",
      title: `Celular do Macho ${ownedCelular ? "✓" : ""}`,
      sub: ownedCelular
        ? "Já está no seu Inventário! Segure na mão (Hotbar 1–9) e aperte E para abrir Only-Resenha, Zap, InstaRoça e Pega-Alface."
        : "Compre seu smartphone! Segure na mão (Hotbar) e aperte E para acessar Only-Resenha, Zap, InstaRoça e Mini-Game!",
      cost: celularCost,
      disabled: ownedCelular || state.money < celularCost,
      btnText: ownedCelular ? "Comprado ✓" : `Comprar ${formatBRL(celularCost)}`,
      onBuy: () => {
        if (!canAddItemToInventory("celular", 1)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar o Celular!");
          return;
        }
        state.money -= celularCost;
        addItemToInventory("celular", 1);
        equipItemToHotbar("celular");
        sfx.play("phone_notif");
        showDayBanner("📱 CELULAR DO MACHO COMPRADO NO TERMINAL! SEGURE NA MÃO E APERTE E!");
        showToast("📱", "CELULAR NA MÃO!", "Segure o Celular na Hotbar e aperte E (ou T) para abrir os apps!");
      },
    },
    {
      emoji: baldeInfo.emoji,
      title: `${baldeInfo.name} (Você tem: ${state.inventory.balde || 0}x)`,
      sub: baldeInfo.desc,
      cost: baldeInfo.cost,
      disabled: state.money < baldeInfo.cost,
      btnText: `Comprar ${formatBRL(baldeInfo.cost)}`,
      onBuy: () => {
        if (!canAddItemToInventory("balde", 1)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar!");
          return;
        }
        state.money -= baldeInfo.cost;
        addItemToInventory("balde", 1);
        sfx.play("sell");
        showToast("🪣", "BALDE NO INVENTÁRIO!", `Agora você tem ${state.inventory.balde} balde(s) vazio(s) no Inventário (I)!`);
      },
    },
    {
      emoji: tesouraInfo.emoji,
      title: `${tesouraInfo.name} ${ownedTesoura ? "✓" : ""}`,
      sub: tesouraInfo.desc,
      cost: tesouraInfo.cost,
      disabled: ownedTesoura || state.money < tesouraInfo.cost,
      btnText: ownedTesoura ? "Comprada ✓" : `Comprar ${formatBRL(tesouraInfo.cost)}`,
      onBuy: () => {
        if (!canAddItemToInventory("tesoura", 1)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar!");
          return;
        }
        state.money -= tesouraInfo.cost;
        addItemToInventory("tesoura", 1);
        sfx.play("upgrade");
        showDayBanner("✂️ TESOURA DE TOSA COMPRADA! AGORA VOCÊ PODE TOSQUIAR AS OVELHAS!");
        showToast("✂️", "TESOURA DE TOSA!", "Vá até as ovelhas com lã e aperte E para cortar lã!");
      },
    },
  ];

  toolEntries.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${it.disabled ? "disabled" : ""}>${it.btnText}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (it.disabled) return;
      it.onBuy();
      updateHUD();
      renderStationShopModal();
      saveGame();
    });
    stationShopItemsList.appendChild(row);
  });

  addStHeader("🔫 ARMAS & MUNIÇÃO CALIBRE 12 (ESTAÇÃO CLP)");
  const ownedShotgun = getItemCount("escopeta") > 0;
  const ownedAmmo = getItemCount("bala_escopeta");
  const shotgunEntries = [
    {
      emoji: "🔫",
      title: `Escopeta Calibre 12 ${ownedShotgun ? "✓" : "(Carregada + 4 extras!)"}`,
      sub: ownedShotgun
        ? `Carregada: ${state.shotgunMag}/${SHOTGUN_MAG_SIZE} • Reserva: ${ownedAmmo} bala(s). Aperte R para recarregar!`
        : "Escopeta pump-action de longo alcance! Vem carregada (6/6) + 4 cartuchos extras (R recarrega).",
      cost: 1150,
      disabled: ownedShotgun || state.money < 1150,
      btnText: ownedShotgun ? "Comprada ✓" : `Comprar ${formatBRL(1150)}`,
      onBuy: () => {
        if (!canAddItemToInventory("escopeta", 1)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere espaço no Inventário (I) antes de comprar a Escopeta!");
          return;
        }
        state.money -= 1150;
        addItemToInventory("escopeta", 1);
        state.shotgunMag = SHOTGUN_MAG_SIZE;
        addItemToInventory("bala_escopeta", 4);
        equipItemToHotbar("escopeta");
        sfx.play("pump_rack");
        showDayBanner("🔫 ESCOPETA CALIBRE 12 ADQUIRIDA! SEGURE NA MÃO • R RECARREGA!");
        showToast("🔫", "ESCOPETA PRONTA!", "Carregada (6/6) + 4 balas reservas! Clique/E atira • R recarrega.");
      },
    },
    {
      emoji: "🔴",
      title: `Caixa de Balas de Escopeta — +8 Balas (Você tem: ${ownedAmmo})`,
      sub: "Cartuchos calibre 12 para a Escopeta (stack ilimitado no inventário).",
      cost: 65,
      disabled: state.money < 65,
      btnText: `Comprar ${formatBRL(65)}`,
      onBuy: () => {
        if (!canAddItemToInventory("bala_escopeta", 8)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) para guardar as balas!");
          return;
        }
        state.money -= 65;
        addItemToInventory("bala_escopeta", 8);
        sfx.play("sell");
        showToast("🔴", "+8 BALAS CAL. 12!", `Total de munição: ${getItemCount("bala_escopeta")} balas.`);
      },
    },
    {
      emoji: "🔴",
      title: `Pacotão de Balas de Escopeta — +24 Balas (Você tem: ${ownedAmmo})`,
      sub: "Pacote econômico com 24 cartuchos calibre 12 para caçadas em Pau Arcado.",
      cost: 175,
      disabled: state.money < 175,
      btnText: `Comprar ${formatBRL(175)}`,
      onBuy: () => {
        if (!canAddItemToInventory("bala_escopeta", 24)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) para guardar as balas!");
          return;
        }
        state.money -= 175;
        addItemToInventory("bala_escopeta", 24);
        sfx.play("sell");
        showToast("🔴", "+24 BALAS CAL. 12!", `Total de munição: ${getItemCount("bala_escopeta")} balas.`);
      },
    },
  ];
  shotgunEntries.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${it.disabled ? "disabled" : ""}>${it.btnText}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (it.disabled) return;
      it.onBuy();
      updateHUD();
      renderStationShopModal();
      saveGame();
    });
    stationShopItemsList.appendChild(row);
  });

  addStHeader("⛏️ ENXADAS ESPECIAIS DE COMBATE & PLANTIO");
  HOE_KEYS.forEach((hoeKey) => {
    const hoe = HOES[hoeKey];
    const isOwned = state.ownedHoes.includes(hoe.id);
    const isActive = state.activeHoe === hoe.id;
    const canBuy = !isOwned && state.money >= hoe.cost;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${hoe.emoji}</span>
        <div>
          <div class="row-title">${hoe.name} ${isActive ? "⭐ Equipada" : ""}</div>
          <div class="row-sub">${hoe.effectDesc}</div>
        </div>
      </div>
      <button class="mini-btn ${isActive ? "" : "green"}" ${isActive || (!isOwned && !canBuy) ? "disabled" : ""}>
        ${isActive ? "Equipada ✓" : isOwned ? "Equipar" : `Comprar ${formatBRL(hoe.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (isActive) return;
      if (isOwned) {
        equipItemToHotbar(`hoe_${hoe.id}`);
        sfx.play("upgrade");
        showToast(hoe.emoji, "ENXADA NA HOTBAR!", `${hoe.name} colocada na sua mão!`);
      } else if (state.money >= hoe.cost) {
        if (!canAddItemToInventory(`hoe_${hoe.id}`, 1)) {
          sfx.play("error");
          showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar a enxada!");
          return;
        }
        state.money -= hoe.cost;
        addItemToInventory(`hoe_${hoe.id}`, 1);
        equipItemToHotbar(`hoe_${hoe.id}`);
        sfx.play("upgrade");
        showDayBanner(`⚔️ ${hoe.name.toUpperCase()} ADQUIRIDA NA ESTAÇÃO! ${hoe.effectDesc}`);
        showToast(hoe.emoji, "ENXADA COMPRADA!", `${hoe.name} adicionada ao Inventário e equipada!`);
      }
      updateHUD();
      renderStationShopModal();
      saveGame();
    });
    stationShopItemsList.appendChild(row);
  });
}

