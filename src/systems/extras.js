// ============================================================================
// EXTRAS v8: MINIMAPA 2D, METAS DIÁRIAS, FEEDBACK DE DANO, CONFIGURAÇÕES & BACKUP
// ============================================================================

// --- 1. Screen Shake & Red Damage Flash ---
let camShakeTimer = 0;
let camShakeIntensity = 0;
let damageFlashTimer = null;

function triggerDamageFeedback(intensity = 0.42) {
  camShakeTimer = Math.max(camShakeTimer, 0.34);
  camShakeIntensity = Math.max(camShakeIntensity, intensity);
  if (damageFlash) {
    damageFlash.classList.remove("hidden");
    damageFlash.classList.add("active");
    clearTimeout(damageFlashTimer);
    damageFlashTimer = setTimeout(() => {
      damageFlash.classList.remove("active");
      damageFlash.classList.add("hidden");
    }, 340);
  }
}

// --- 2. Metas Diárias (Late-game & Progressão Contínua) ---
const DAILY_GOAL_POOL = [
  { type: "harvest", label: "Colher 4 plantações", emoji: "🥬", target: 4, reward: 45 },
  { type: "water", label: "Regar 4 canteiros", emoji: "💧", target: 4, reward: 35 },
  { type: "sell", label: "Faturar R$ 60 no Terminal", emoji: "💰", target: 60, reward: 55 },
  { type: "animal", label: "Coletar 2 produtos/ovos", emoji: "🥚", target: 2, reward: 50 },
  { type: "etec", label: "Visitar a ETECAMP hoje", emoji: "🏫", target: 1, reward: 40 },
  { type: "cook", label: "Preparar 1 receita no fogão", emoji: "🍳", target: 1, reward: 65 },
  { type: "hoop", label: "Fazer 1 cesta na Quadra ETEC", emoji: "🏀", target: 1, reward: 60 },
];

function generateDailyGoals() {
  const pool = [...DAILY_GOAL_POOL];
  const chosen = [];
  // Sempre garante pelo menos 1 meta de horta (colher ou regar)
  const farmIdx = Math.floor(Math.random() * 2);
  chosen.push({ ...pool.splice(farmIdx, 1)[0], progress: 0, done: false });
  while (chosen.length < 3 && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    chosen.push({ ...pool.splice(idx, 1)[0], progress: 0, done: false });
  }
  state.dailyGoals = chosen;
  updateTrackerHUD();
}

function trackGoalProgress(type, amount = 1) {
  if (!Array.isArray(state.dailyGoals) || amount <= 0) return;
  let changed = false;
  for (let i = 0; i < state.dailyGoals.length; i++) {
    const g = state.dailyGoals[i];
    if (g.done || g.type !== type) continue;
    g.progress = Math.min(g.target, (g.progress || 0) + amount);
    changed = true;
    if (g.progress >= g.target) {
      g.done = true;
      state.money += g.reward;
      state.reputation += 1;
      sfx.play("goal");
      showToast("🎯", "META DIÁRIA CONCLUÍDA!", `${g.emoji} ${g.label} • +${formatBRL(g.reward)} & ⭐ +1 Reputação!`);
    }
  }
  if (changed) {
    updateTrackerHUD();
    updateHUD();
    saveGame();
  }
}

// --- 3. HUD Tracker (Próximo 402 + Metas Diárias) ---
function updateTrackerHUD() {
  if (dailyGoalsList && Array.isArray(state.dailyGoals)) {
    dailyGoalsList.innerHTML = state.dailyGoals
      .map((g) => {
        const pct = Math.min(g.target, Math.floor(g.progress || 0));
        return `<div class="goal-mini-row${g.done ? " done" : ""}"><span>${g.done ? "✅" : g.emoji} ${g.label}</span><strong>${pct}/${g.target}</strong></div>`;
      })
      .join("");
  }
}

// --- 4. Minimapa 2D Canvas (Renderizado sob demanda ~15 FPS) ---
let minimapAccum = 0;

function updateMinimap(dt, force = false) {
  if (!minimapCanvas || !minimapWrap || !gameSettings.minimapEnabled || state.mode === "start") return;
  minimapAccum += dt;
  if (!force && minimapAccum < 0.065) return;
  minimapAccum = 0;

  const ctx = minimapCanvas.getContext("2d");
  if (!ctx) return;
  const W = minimapCanvas.width;
  const H = minimapCanvas.height;
  const loc = state.location;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = loc === "yard" ? "#1c331e" : loc === "etec_inside" ? "#1e293b" : "#1a2433";
  ctx.fillRect(0, 0, W, H);

  // Define bounds do mapa atual
  let minX = -34, maxX = 34, minZ = -30, maxZ = 48;
  if (loc === "yard") {
    const fb = getFarmBounds();
    minX = fb.minX - 2;
    maxX = 72;
    minZ = -30;
    maxZ = 49;
  } else if (loc === "room") {
    minX = -11; maxX = 11; minZ = -9; maxZ = 9;
  } else if (loc === "basement") {
    minX = -11.5; maxX = 11.5; minZ = -9.5; maxZ = 9.5;
  } else if (loc === "terminal") {
    minX = -40; maxX = 24; minZ = -28; maxZ = 25;
  } else if (loc === "etec") {
    minX = -35; maxX = 35; minZ = -30; maxZ = 38;
  } else if (loc === "etec_inside") {
    minX = -21; maxX = 21; minZ = -37; maxZ = 67;
  }

  const pad = 8;
  const spanX = Math.max(1, maxX - minX);
  const spanZ = Math.max(1, maxZ - minZ);
  const scale = Math.min((W - pad * 2) / spanX, (H - pad * 2) / spanZ);
  const offX = (W - spanX * scale) * 0.5;
  const offY = (H - spanZ * scale) * 0.5;
  const toX = (wx) => offX + (wx - minX) * scale;
  const toY = (wz) => offY + (wz - minZ) * scale;

  const drawRect = (cx, cz, rw, rd, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(toX(cx - rw * 0.5), toY(cz - rd * 0.5), Math.max(2, rw * scale), Math.max(2, rd * scale));
  };
  const drawDot = (wx, wz, r, color, stroke = null) => {
    ctx.beginPath();
    ctx.arc(toX(wx), toY(wz), r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  };

  if (loc === "yard") {
    // Estrada do Garcia
    drawRect(0, 42, spanX, 9, "#334155");
    // Casa, Cooperativa, Poço, Galinheiro, Baú, Ponto 402
    drawRect(0, -20.5, 13, 10, "#92400e");
    drawRect(21.5, -16.5, 4.5, 2.5, "#16a34a");
    drawRect(21.8, 39.8, 5, 2.5, "#2563eb");
    drawDot(WELL_POS.x, WELL_POS.z, 3.2, "#38bdf8");
    drawDot(COOP_POS.x, COOP_POS.z, 3.2, "#f59e0b");
    drawRect(CHEST_POS.x, CHEST_POS.z, 2.4, 3.0, "#facc15");
    // Canteiros
    for (let i = 0; i < plots.length; i++) {
      const p = plots[i];
      if (!p.unlocked) continue;
      const col = p.stage === "ready" ? "#facc15" : p.stage === "growing" ? "#4ade80" : p.stage === "tilled" ? "#a16207" : "#4d7c0f";
      drawRect(p.x, p.z, 2.0, 2.0, col);
    }
    // Lago de Pau Arcado + Trilha + Jessy + Jacaré
    drawRect(55.6, 23, 3.6, 48, "#785a3a");
    drawDot(LAKE_CENTER_X, LAKE_CENTER_Z, Math.max(5.8, LAKE_WATER_RADIUS * scale), "#0284c7", "#c2a378");
    if (jessyEntity) drawDot(jessyEntity.worldPos.x, jessyEntity.worldPos.z, 3.0, "#38bdf8", "#ffffff");
    if (alligatorEntity && alligatorEntity.alive) {
      drawDot(alligatorEntity.mesh.position.x, alligatorEntity.mesh.position.z, 3.2, "#22c55e", "#facc15");
    }
    if (dogOrelha) drawDot(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z, 2.5, "#fde68a");
    if (state.marceloHired && marceloYardEntity) drawDot(marceloYardEntity.mesh.position.x, marceloYardEntity.mesh.position.z, 3, "#94a3b8");
    if (state.hasTamedJaguar && tamedJaguarEntity) drawDot(tamedJaguarEntity.mesh.position.x, tamedJaguarEntity.mesh.position.z, 3.3, "#22c55e", "#fff");
    if (state.jaguar.active && jaguarEntity) drawDot(jaguarEntity.mesh.position.x, jaguarEntity.mesh.position.z, 4.2, "#ef4444", "#fef08a");
  } else if (loc === "terminal") {
    drawRect(-7.5, -2, 28, 30, "#475569");
    drawRect(15.75, -1, 11.5, 46, "#64748b");
    drawDot(TERM_BUS_BACK_POS.x, TERM_BUS_BACK_POS.z, 3.8, "#3b82f6", "#fff");
    drawDot(TERM_SELL_POS.x, TERM_SELL_POS.z, 3.6, "#22c55e", "#fff");
    drawDot(TERM_PASTEL_POS.x, TERM_PASTEL_POS.z, 3.4, "#ef4444");
    drawDot(TERM_STATION_SHOP_POS.x, TERM_STATION_SHOP_POS.z, 3.6, "#facc15", "#000");
    drawDot(TERM_TRAIN_POS.x, TERM_TRAIN_POS.z, 3.8, "#be123c", "#fff");
    if (state.maluquinho.active && maluquinhoEntity) drawDot(maluquinhoEntity.mesh.position.x, maluquinhoEntity.mesh.position.z, 3.5, "#f97316");
  } else if (loc === "etec") {
    drawRect(0, -4, 22, 24, "#991b1b");
    drawRect(-23, -2, 16, 26, "#475569");
    drawRect(23, 2, 18, 22, "#15803d");
    drawRect(24.5, -21, 15, 11, "#0ea5e9");
    drawRect(0, 32.6, 20, 5, "#881337");
    drawDot(ETEC_DOOR_IN_POS.x, ETEC_DOOR_IN_POS.z, 3.5, "#facc15", "#000");
    drawDot(ETEC_TRAIN_BACK_POS.x, ETEC_TRAIN_BACK_POS.z, 3.5, "#f43f5e", "#fff");
  } else if (loc === "etec_inside") {
    // Corredor principal (9m) + Corredor horizontal (z = 14..19)
    drawRect(0, 15, 9.0, 102, "#94a3b8");
    drawRect(0, 16.5, 40, 5, "#cbd5e1");
    // Alas Oeste e Leste expandidas (15.5m)
    drawRect(-12.25, -11, 15, 50, "#3f6240");
    drawRect(-12.25, 37, 15, 36, "#3f6240");
    drawRect(-12.25, 60.5, 15, 11, "#b45309"); // Refeitório
    drawRect(12.25, -18, 15, 36, "#3f6240");
    drawRect(12.25, 7, 15, 14, "#38bdf8"); // Banheiros
    drawRect(12.25, 37, 15, 36, "#3f6240");
    drawRect(12.25, 60.5, 15, 11, "#6d28d9"); // Sala dos Professores
    // Saídas, Refeitório e NPCs
    drawDot(ETEC_EXIT_POS.x, ETEC_EXIT_POS.z, 3.2, "#ef4444");
    drawDot(ETEC_EXIT_BACK_POS.x, ETEC_EXIT_BACK_POS.z, 3.2, "#3b82f6");
    drawDot(ETEC_REFEITORIO_POS.x, ETEC_REFEITORIO_POS.z, 2.8, "#f97316");
    for (let i = 0; i < etecNpcs.length; i++) {
      const n = etecNpcs[i];
      drawDot(n.pos.x, n.pos.z, 2.7, isNpcKnockedOut(n.id) ? "#64748b" : "#facc15");
    }
  } else if (loc === "room") {
    drawRect(0, 0, 20, 16, "#44372d");
    drawDot(BED_POS.x, BED_POS.z, 3.5, "#60a5fa");
    drawDot(STOVE_POS.x, STOVE_POS.z, 3.5, "#f97316");
    drawDot(EXIT_POS.x, EXIT_POS.z, 3.5, "#4ade80");
    if (state.basementUnlocked || state.basementStep >= 2) drawDot(SECRET_HATCH_POS.x, SECRET_HATCH_POS.z, 3.5, "#a855f7");
  } else if (loc === "basement") {
    drawRect(0, 0, 22, 18, "#2e1065");
    drawDot(BASEMENT_EXIT_POS.x, BASEMENT_EXIT_POS.z, 3.6, "#4ade80");
    for (let i = 0; i < basementClones.length; i++) {
      drawDot(basementClones[i].pos.x, basementClones[i].pos.z, 2.5, "#facc15");
    }
  }

  // Seta do Jogador orientada pela direção atual
  const px = toX(player.pos.x);
  const py = toY(player.pos.z);
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-player.facingYaw + Math.PI);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.lineTo(4.2, 4.5);
  ctx.lineTo(0, 2.2);
  ctx.lineTo(-4.2, 4.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Indicador Norte
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "bold 9px Inter, sans-serif";
  ctx.fillText("N", W - 13, 12);
}

// --- 5. Exportar & Importar Save (JSON) ---
function exportSaveJson() {
  saveGame();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      showToast("⚠️", "SEM SAVE", "Ainda não há progresso salvo para exportar.");
      return;
    }
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `horta-do-macho-save-dia-${state.day}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    sfx.play("sell");
    showToast("💾", "SAVE EXPORTADO!", `Backup do Dia ${state.day} baixado em JSON!`);
  } catch (_) {
    sfx.play("error");
    showToast("❌", "ERRO NO BACKUP", "Não foi possível exportar o arquivo de save.");
  }
}

function importSaveJson(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      if (!parsed || typeof parsed !== "object" || typeof parsed.day !== "number" || typeof parsed.money !== "number") {
        throw new Error("Invalid save format");
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      if (loadSavedGame()) {
        state.location = "yard";
        player.pos.set(0, 0, -11.5);
        player.facingYaw = 0;
        setActiveSceneVisibility();
        syncUnlockedPlots();
        rollDailyMarket();
        generateCityOrders();
        updateHUD();
        updateMinimap(1, true);
        sfx.play("upgrade");
        showToast("📂", "SAVE IMPORTADO!", `Progresso restaurado: Dia ${state.day} • Caixa ${formatBRL(state.money)}!`);
      }
    } catch (_) {
      sfx.play("error");
      showToast("❌", "ARQUIVO INVÁLIDO", "Selecione um backup JSON válido da Horta do Macho 3D.");
    }
  };
  reader.readAsText(file);
}

// --- 6. Sincronização da UI de Configurações na Tela de Pausa ---
function syncSettingsUI() {
  if (volumeSlider) volumeSlider.value = String(Math.round((sfx.volume || 0) * 100));
  if (volumeValLabel) volumeValLabel.textContent = `${Math.round((sfx.volume || 0) * 100)}%`;
  const sensPct = Math.round((gameSettings.sensitivity || 1.0) * 100);
  if (typeof sensitivitySlider !== "undefined" && sensitivitySlider) sensitivitySlider.value = String(sensPct);
  if (typeof sensitivityValLabel !== "undefined" && sensitivityValLabel) sensitivityValLabel.textContent = `${sensPct}%`;
  if (ambientToggle) ambientToggle.checked = !!sfx.ambientEnabled;
  if (bgmToggle) bgmToggle.checked = !!sfx.bgmEnabled;
  if (shadowQualitySelect) shadowQualitySelect.value = gameSettings.shadows;
  if (rainToggle) rainToggle.checked = !!gameSettings.rainEnabled;
  if (minimapToggle) minimapToggle.checked = !!gameSettings.minimapEnabled;
}

function bindSettingsControls() {
  syncSettingsUI();
  if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
      const pct = Number(volumeSlider.value) || 0;
      sfx.setVolume(pct / 100);
      if (volumeValLabel) volumeValLabel.textContent = `${pct}%`;
      if (pct > 0 && sfx.muted) {
        sfx.setMuted(false);
        if (typeof syncMuteButtonUI === "function") syncMuteButtonUI();
      }
    });
  }
  if (typeof sensitivitySlider !== "undefined" && sensitivitySlider) {
    sensitivitySlider.addEventListener("input", () => {
      const pct = THREE.MathUtils.clamp(Number(sensitivitySlider.value) || 100, 25, 250);
      gameSettings.sensitivity = pct / 100;
      if (typeof sensitivityValLabel !== "undefined" && sensitivityValLabel) {
        sensitivityValLabel.textContent = `${pct}%`;
      }
      saveGameSettings();
    });
  }
  if (ambientToggle) {
    ambientToggle.addEventListener("change", () => {
      sfx.init();
      sfx.setAmbientEnabled(ambientToggle.checked);
    });
  }
  if (bgmToggle) {
    bgmToggle.addEventListener("change", () => {
      sfx.init();
      sfx.setBgmEnabled(bgmToggle.checked);
    });
  }
  if (shadowQualitySelect) {
    shadowQualitySelect.addEventListener("change", () => {
      gameSettings.shadows = shadowQualitySelect.value;
      saveGameSettings();
      applyGraphicsSettings();
      showToast("⚙️", "SOMBRAS ATUALIZADAS", `Qualidade de sombras: ${shadowQualitySelect.options[shadowQualitySelect.selectedIndex].text}`);
    });
  }
  if (rainToggle) {
    rainToggle.addEventListener("change", () => {
      gameSettings.rainEnabled = rainToggle.checked;
      saveGameSettings();
      updateSkyAndTime(0);
    });
  }
  if (minimapToggle) {
    minimapToggle.addEventListener("change", () => {
      gameSettings.minimapEnabled = minimapToggle.checked;
      saveGameSettings();
      applyGraphicsSettings();
      updateMinimap(1, true);
    });
  }
  if (exportSaveBtn) exportSaveBtn.addEventListener("click", exportSaveJson);
  if (importSaveBtn && importSaveInput) {
    importSaveBtn.addEventListener("click", () => importSaveInput.click());
    importSaveInput.addEventListener("change", () => {
      if (importSaveInput.files && importSaveInput.files[0]) {
        importSaveJson(importSaveInput.files[0]);
        importSaveInput.value = "";
      }
    });
  }
  if (minimapToggleBtn) {
    minimapToggleBtn.addEventListener("click", () => {
      gameSettings.minimapEnabled = !gameSettings.minimapEnabled;
      saveGameSettings();
      applyGraphicsSettings();
      syncSettingsUI();
      updateMinimap(1, true);
    });
  }
}


// ============================================================================
// CONSOLE DE COMANDOS (TECLA "/" — Ex: /money 99999)
// ============================================================================
function openCommandBar() {
  if (!cmdBar || !cmdInput || state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  if (typeof exitFirstPersonPointerLock === "function") exitFirstPersonPointerLock();
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  cmdBar.classList.remove("hidden");
  cmdInput.value = "/";
  setTimeout(() => {
    cmdInput.focus();
    cmdInput.setSelectionRange(cmdInput.value.length, cmdInput.value.length);
  }, 15);
}

function closeCommandBar() {
  if (!cmdBar) return;
  cmdBar.classList.add("hidden");
  if (cmdInput) cmdInput.blur();
  if (state.mode === "modal") state.mode = "playing";
}

function executeGameCommand(rawStr) {
  const txt = String(rawStr || "").trim();
  if (!txt || txt === "/") return;
  const clean = txt.startsWith("/") ? txt.slice(1).trim() : txt;
  const parts = clean.split(/\s+/);
  const cmd = (parts[0] || "").toLowerCase();
  const arg1 = parts[1];
  const arg2 = parts[2];

  if (cmd === "money" || cmd === "dinheiro") {
    if (!arg1) {
      sfx.play("error");
      return;
    }
    const isAdd = arg1.startsWith("+");
    const val = Number(arg1.replace(",", "."));
    if (!Number.isFinite(val) || val < 0) {
      sfx.play("error");
      return;
    }
    state.money = isAdd ? Math.round((state.money + val) * 100) / 100 : Math.round(val * 100) / 100;
    sfx.play("sell");
    updateHUD();
    saveGame();
    showToast("💰", "SALDO ATUALIZADO", `Caixa: ${formatBRL(state.money)}`);
  } else if (cmd === "give" || cmd === "item") {
    const itemId = (arg1 || "").toLowerCase();
    const qty = Math.max(1, Math.floor(Number(arg2) || 1));
    const def = getItemDef(itemId);
    if (!def) {
      sfx.play("error");
      return;
    }
    if (!addItemToInventory(def.id, def.stackable ? qty : 1)) {
      sfx.play("error");
      showToast("🎒", "MOCHILA LOTADA", "Libere 1 slot no inventário primeiro!");
      return;
    }
    sfx.play("upgrade");
    updateHUD();
    saveGame();
    showToast(def.emoji, "ITEM ADICIONADO", `${def.stackable ? `${qty}x ` : ""}${def.name}`);
  } else if (cmd === "day" || cmd === "dia") {
    const d = Math.max(1, Math.floor(Number(arg1) || 1));
    state.day = d;
    sfx.play("upgrade");
    updateHUD();
    saveGame();
    showToast("📅", "DIA ATUALIZADO", `Dia ${state.day}`);
  } else if (cmd === "time" || cmd === "hora") {
    if (!arg1) {
      sfx.play("error");
      return;
    }
    const [hStr, mStr] = arg1.split(":");
    const h = Number(hStr);
    const m = Number(mStr || 0);
    if (!Number.isFinite(h) || !Number.isFinite(m) || h < 0 || h >= 24 || m < 0 || m >= 60) {
      sfx.play("error");
      return;
    }
    state.dayMinutes = h * 60 + m;
    updateSkyAndTime(0);
    updateHUD();
    showToast("⏰", "HORÁRIO ATUALIZADO", `${formatHHMM(state.dayMinutes)}`);
  } else if (cmd === "tp") {
    const loc = (arg1 || "").toLowerCase();
    if (loc === "yard" || loc === "sitio" || loc === "fazenda") switchLocation("yard", 0, -11.5, 0, 0.2, 0.48, 16.5);
    else if (loc === "lago" || loc === "jessy") switchLocation("yard", 55.5, -6.5, Math.PI * 0.4, -1.2, 0.44, 15.5);
    else if (loc === "terminal") switchLocation("terminal", -1.0, 8.5, Math.PI, 0, 0.45, 16.0);
    else if (loc === "etec") switchLocation("etec", 0, 15.0, Math.PI, 0, 0.46, 16.5);
    else if (loc === "etec_inside" || loc === "escola") { syncRefeitorioMenuVisual(); switchLocation("etec_inside", 0, 62.2, Math.PI, 0, 0.46, 15.5); }
    else if (loc === "room" || loc === "casa") switchLocation("room", 0, 5.5, Math.PI, 0, 0.5, 13.5);
    else if (loc === "basement" || loc === "porao") switchLocation("basement", 0, 5.5, Math.PI, 0, 0.45, 14.5);
    else {
      sfx.play("error");
      return;
    }
  } else if (cmd === "heal" || cmd === "vida") {
    state.playerHp = state.maxHp;
    state.tamedJaguarHp = state.tamedJaguarMaxHp || 120;
    state.tamedJaguarDown = false;
    state.water = getMaxWater();
    sfx.play("upgrade");
    updateHUD();
  } else if (cmd === "rain" || cmd === "chuva") {
    state.isRainy = !state.isRainy;
    updateSkyAndTime(0);
    updateHUD();
  } else {
    sfx.play("error");
  }
}
