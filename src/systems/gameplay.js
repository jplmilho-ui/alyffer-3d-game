// Interactables & Context Detection across all 5 locations
const WELL_POS = new THREE.Vector3(-18.0, 0, -2.5);
const COOP_POS = new THREE.Vector3(-24.0, 0, -18.8);
const CHEST_POS = new THREE.Vector3(-18.0, 0, 6.5);
const STAND_POS = new THREE.Vector3(21.5, 0, -16.5);
const DOOR_POS = new THREE.Vector3(0, 0, -13.2);
const BUS_STOP_YARD_POS = new THREE.Vector3(22.2, 0, 42.0);
const JESSY_LAKE_POS = new THREE.Vector3(61.1, -1.68, -8.5);

const BED_POS = new THREE.Vector3(-7.0, 0, -5.0);
const MANGA_POS = new THREE.Vector3(-3.6, 0, -7.0);
const ETEC_POS = new THREE.Vector3(-8.2, 0, -0.55);
const COFFEE_POS = new THREE.Vector3(5.4, 0, -2.6);
const STOVE_POS = new THREE.Vector3(5.75, 0, -6.4);
const TOILET_POS = new THREE.Vector3(9.1, 0, 2.5);
const SECRET_SWITCH_1_POS = new THREE.Vector3(7.55, 0, -7.4);
const SECRET_SWITCH_2_POS = new THREE.Vector3(9.1, 0, 7.1);
const SECRET_HATCH_POS = new THREE.Vector3(-9.15, 0, -7.05);
const EXIT_POS = new THREE.Vector3(0, 0, 7.2);

const BASEMENT_EXIT_POS = new THREE.Vector3(0, 0, 7.8);

const TERM_BUS_BACK_POS = new THREE.Vector3(-15.0, 0, -18.6);
const TERM_JAGUAR_POS = new THREE.Vector3(1.5, 0.26, -10.0);
const TERM_SELL_POS = new THREE.Vector3(-1.0, 0.26, 7.2);
const TERM_PASTEL_POS = new THREE.Vector3(-13.8, 0.26, 7.1);
const TERM_STATION_SHOP_POS = new THREE.Vector3(14.2, 0.95, -7.6);
const TERM_TRAIN_POS = new THREE.Vector3(19.6, 0.95, 0);

const ETEC_TRAIN_BACK_POS = new THREE.Vector3(0, 0, 29.6);
const ETEC_DOOR_IN_POS = new THREE.Vector3(0, 0, 9.2);
const ETEC_PARKING_DOOR_POS = new THREE.Vector3(-12.2, 0, 1.0);
const ETEC_BACK_DOOR_POS = new THREE.Vector3(0, 0, -17.6);
const ETEC_AUTOMATION_POS = new THREE.Vector3(24.5, 0, -21.0);

const ETEC_EXIT_POS = new THREE.Vector3(0, 0, 64.4);
const ETEC_EXIT_BACK_POS = new THREE.Vector3(0, 0, -34.4);
const ETEC_EXIT_PARKING_POS = new THREE.Vector3(-3.6, 0, 62.2);
const CHEM_BENCH_POS = new THREE.Vector3(-15.2, 0, 3.0);
const NURSE_BED_POS = new THREE.Vector3(-11.2, 0, 27.4);
const ETEC_FOUNTAIN_L_POS = new THREE.Vector3(11.8, 0, 5.2);
const ETEC_FOUNTAIN_R_POS = new THREE.Vector3(11.8, 0, 8.8);
const ETEC_REFEITORIO_POS = new THREE.Vector3(-13.65, 0, 58.6);
const ETEC_HOOP_RIM = new THREE.Vector3(11.38, 3.24, 1.6);

let refeitorioGrabCd = 0;

function getTodayRefeitorioMenu(dayNum = state.day) {
  const cal = getCalendarInfo(dayNum);
  const dow = cal.dayOfWeek; // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab
  if (dow === 0 || dow === 6) {
    return { closed: true, label: "Fechado no fim de semana", items: [] };
  }
  if (dow === 1 || dow === 2) {
    return {
      closed: false,
      key: "mon_tue",
      label: "Bolacha da ETEC (Madeira Prensada) + Copo de Leite c/ Chocolate",
      items: ["merenda_bolacha", "merenda_leite_choc"],
    };
  }
  if (dow === 3) {
    return {
      closed: false,
      key: "wed",
      label: "Ração do Exército (Pote c/ Leite, Sucrilhos & Colher Azul)",
      items: ["merenda_racao"],
    };
  }
  if (dow === 4) {
    // Alterna entre Canjica e Arroz Doce às quintas (ambos no pote circular pequeno c/ colher azul!)
    const isArroz = Math.floor(Math.max(0, dayNum - 1) / 7) % 2 === 1;
    return isArroz
      ? {
          closed: false,
          key: "thu_arroz",
          label: "Arroz Doce (Pote Circular c/ Colher Azul)",
          items: ["merenda_arroz_doce"],
        }
      : {
          closed: false,
          key: "thu_canjica",
          label: "Canjica (Pote Circular c/ Colher Azul)",
          items: ["merenda_canjica"],
        };
  }
  return {
    closed: false,
    key: "fri",
    label: "Bolo de Cenoura Recheado com Chocolate",
    items: ["merenda_bolo"],
  };
}

function syncRefeitorioMenuVisual() {
  if (!refeitorioDisplay || !refeitorioDisplay.userData) return;
  const u = refeitorioDisplay.userData;
  const menu = getTodayRefeitorioMenu(state.day);
  u.monTueGrp.visible = !menu.closed && menu.key === "mon_tue";
  u.wedGrp.visible = !menu.closed && menu.key === "wed";
  u.thuCanjicaGrp.visible = !menu.closed && menu.key === "thu_canjica";
  u.thuArrozGrp.visible = !menu.closed && menu.key === "thu_arroz";
  u.friGrp.visible = !menu.closed && menu.key === "fri";
}

function distXZ(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function getFloorYAt(x, z) {
  if (state.location === "yard") {
    const ld = Math.hypot(x - LAKE_CENTER_X, z - LAKE_CENTER_Z);
    if (ld < LAKE_WATER_RADIUS + 0.08) {
      if (ld <= LAKE_DEEP_RADIUS) return -LAKE_MAX_DEPTH;
      const t = (ld - LAKE_DEEP_RADIUS) / (LAKE_WATER_RADIUS + 0.08 - LAKE_DEEP_RADIUS);
      const smooth = t * t * (3 - 2 * t);
      return -LAKE_MAX_DEPTH * (1 - smooth);
    }
    return 0;
  }
  if (state.location === "terminal") {
    if (x >= 10.0 && x <= 22.0 && z >= -24.0 && z <= 22.0) return 0.95;
    if (x >= 6.0 && x < 10.0 && ((z >= -5.6 && z <= 4.6) || (z >= 8.4 && z <= 13.6))) {
      return 0.26 + ((x - 6.0) / 4.0) * 0.69;
    }
    if (x >= -22.0 && x <= 6.0 && z >= -18.0 && z <= 14.0) return 0.26;
    return 0;
  }
  if (state.location === "etec") {
    if (x >= 16.5 && x <= 32.5 && z >= -27.0 && z <= -14.5) return 0.22;
    if (x >= -33.6 && x <= 33.6 && z >= -28.6 && z <= 19.6) return 0.12;
    if (z > 19.6 && z <= 23.2) return 0.14;
    if (x >= -2.8 && x <= 2.8 && z >= 28.3 && z <= 31.3) return ((z - 28.3) / 3.0) * 0.85;
    if (z > 31.3) return 0.85;
    return 0.04;
  }
  return 0;
}

function switchLocation(loc, x, z, facingYaw, camYaw, camPitch, camDist, keepJaguarMount = false) {
  state.location = loc;
  if (!keepJaguarMount && state.ridingJaguar) {
    state.ridingJaguar = false;
  }
  if (loc === "etec" || loc === "etec_inside") {
    state.visitedEtecToday = true;
    if (typeof trackGoalProgress === "function") trackGoalProgress("etec", 1);
  }
  setActiveSceneVisibility();
  player.vy = 0;
  player.jumpOffset = 0;
  player.pos.set(x, getFloorYAt(x, z), z);
  player.facingYaw = facingYaw;
  state.camYaw = state.firstPerson ? facingYaw + Math.PI : camYaw;
  state.camPitch = camPitch;
  state.fpPitch = 0;
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

function syncPointerLockUI() {
  const locked = document.pointerLockElement === renderer.domElement;
  const needLock = state.firstPerson && state.mode === "playing" && !IS_MOBILE_DEVICE && !locked;
  if (typeof fpLockHint !== "undefined" && fpLockHint) {
    fpLockHint.classList.toggle("hidden", !needLock);
  }
  if (renderer && renderer.domElement) {
    renderer.domElement.classList.toggle("fp-no-cursor", state.firstPerson && state.mode === "playing");
  }
}

function requestFirstPersonPointerLock() {
  if (!state.firstPerson || state.mode !== "playing") return;
  try {
    const el = renderer && renderer.domElement;
    if (el && document.pointerLockElement !== el && el.requestPointerLock) {
      const res = el.requestPointerLock();
      if (res && typeof res.catch === "function") {
        res.catch(() => {
          syncPointerLockUI();
        });
      }
    }
  } catch (_) {
    // ignore pointer lock denial
  }
  syncPointerLockUI();
}

function exitFirstPersonPointerLock() {
  try {
    if (document.pointerLockElement && document.exitPointerLock) {
      document.exitPointerLock();
    }
  } catch (_) {
    // ignore
  }
  syncPointerLockUI();
}

function toggleFirstPerson() {
  state.firstPerson = !state.firstPerson;
  if (state.firstPerson) {
    state.camYaw = player.facingYaw + Math.PI;
    state.fpPitch = 0;
    requestFirstPersonPointerLock();
  } else {
    exitFirstPersonPointerLock();
    state.camPitch = 0.46;
  }
  sfx.play("plant");
  syncPointerLockUI();
  updateHUD();
  updateCamera(0.016, true);
}

function triggerPlayerDeath(reason) {
  if (state.mode === "dead") return;
  clearSleepTimers();
  clearActiveInputs();
  closeAllModals();
  state.ridingJaguar = false;
  state.mode = "dead";
  state.isSleeping = false;
  if (sleepOverlay) {
    sleepOverlay.classList.remove("visible");
    sleepOverlay.classList.add("hidden");
  }
  if (jaguarHudBar) jaguarHudBar.classList.add("hidden");
  if (maluquinhoBubble) maluquinhoBubble.classList.add("hidden");
  if (kickDogBtn) kickDogBtn.classList.add("hidden");

  sfx.play("death");
  if (reason === "orelha") {
    deathIcon.textContent = "🐕😡💀";
    deathTitle.textContent = "DEVORADO PELO ORELHA!";
    deathMsg.textContent =
      "Você chutou demais o Orelha! Ele ficou furioso, correu atrás de você e deu uma mordida HITKILL!";
  } else if (reason === "jaguar") {
    deathIcon.textContent = "🐆💀";
    deathTitle.textContent = "DERROTADO PELA ONÇA!";
    deathMsg.textContent =
      "A Onça Pintada foi mais rápida! Na próxima vez, segure a ENXADA na Hotbar (1–9) e mantenha distância golpeando com E!";
  } else if (reason === "alligator") {
    deathIcon.textContent = "🐊💀";
    deathTitle.textContent = "MORDIDO PELO JACARÉ DO LAGO!";
    deathMsg.textContent =
      "O Jacaré do Lago de Pau Arcado não perdoou! Use uma ENXADA (1–9) para espantá-lo antes de entrar na água!";
  } else {
    deathIcon.textContent = "💀";
    deathTitle.textContent = "VOCÊ MORREU!";
    deathMsg.textContent = "O Macho desmaiou em Pau Arcado!";
  }
  deathModal.classList.remove("hidden");
  updateHUD();
}

function respawnPlayer() {
  deathModal.classList.add("hidden");
  state.playerHp = state.maxHp;
  state.jaguar.active = false;
  state.jaguar.hp = state.jaguar.maxHp;
  state.jaguar.spawnCooldown = 140;
  state.jaguarDefeated = false;
  if (jaguarEntity) {
    jaguarEntity.mesh.rotation.z = 0;
    jaguarEntity.mesh.position.y = 0;
  }
  state.maluquinho.active = false;
  state.maluquinho.announced = false;
  if (jaguarEntity) jaguarEntity.mesh.visible = false;
  if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;
  resetDogOrelha();
  resetAlligator();

  playerMesh.rotation.set(0, 0, 0);
  state.mode = "playing";
  switchLocation("yard", 0, -11.5, 0, 0.2, 0.48, 16.5);
  showToast("❤️", "DE VOLTA AO SÍTIO", "Você acordou bem em Pau Arcado! Respeite o Orelha e fique atento à Onça.");
}

function resetDogOrelha() {
  if (!dogOrelha) return;
  dogOrelha.ragdoll = false;
  dogOrelha.ragdollTimer = 0;
  dogOrelha.angry = false;
  dogOrelha.pendingAngry = false;
  dogOrelha.angryTimer = 0;
  dogOrelha.kickCount = 0;
  dogOrelha.vel.set(0, 0, 0);
  dogOrelha.angVel.set(0, 0, 0);
  dogOrelha.mesh.position.copy(dogOrelha.home);
  dogOrelha.mesh.rotation.set(0, 0, 0);
  dogOrelha.target.copy(dogOrelha.home);
  dogOrelha.wait = 1.5;
  if (dogOrelha.eyeMat) {
    dogOrelha.eyeMat.color.setHex(0x111111);
    dogOrelha.eyeMat.emissive.setHex(0x000000);
    dogOrelha.eyeMat.emissiveIntensity = 0;
  }
}

function kickOrelha() {
  if (state.location !== "yard" || !dogOrelha) return;
  if (distXZ(player.pos, dogOrelha.mesh.position) > 3.5) {
    showToast("🐕", "ORELHA", "O Orelha está longe demais!");
    return;
  }
  const dx = dogOrelha.mesh.position.x - player.pos.x;
  const dz = dogOrelha.mesh.position.z - player.pos.z;
  const d = Math.hypot(dx, dz);
  const dirX = d > 0.1 ? dx / d : Math.sin(player.facingYaw);
  const dirZ = d > 0.1 ? dz / d : Math.cos(player.facingYaw);

  // Lança o Orelha voando com ragdoll (ele nunca morre!)
  const power = 14.5 + Math.random() * 3.5;
  dogOrelha.vel.set(dirX * power, 9.2 + Math.random() * 2.4, dirZ * power);
  dogOrelha.angVel.set(
    (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 7),
    (Math.random() - 0.5) * 14,
    (Math.random() > 0.5 ? 1 : -1) * (9 + Math.random() * 7)
  );
  dogOrelha.ragdoll = true;
  dogOrelha.ragdollTimer = 2.5;
  dogOrelha.mesh.position.y = Math.max(0.38, dogOrelha.mesh.position.y);
  dogOrelha.kickCount = (dogOrelha.kickCount || 0) + 1;

  state.swingTimer = 0.25;
  sfx.play("hit");
  sfx.play("bark");
  spawnParticles(dogOrelha.mesh.position.clone().add(new THREE.Vector3(0, 0.6, 0)), 0xfacc15, 16);

  // Quanto mais chuta, maior a chance de ele levantar FURIOSO (hitkill)!
  if (!dogOrelha.angry && !dogOrelha.pendingAngry && dogOrelha.kickCount >= 3) {
    const angerChance = dogOrelha.kickCount === 3 ? 0.35 : dogOrelha.kickCount === 4 ? 0.7 : 1.0;
    if (Math.random() < angerChance) {
      dogOrelha.pendingAngry = true;
    }
  }

  // Sem spam de notificação ao chutar — só alerta quando ele realmente fica furioso!
}

function kickMaluquinho() {
  if (state.location !== "terminal" || !state.maluquinho.active || !maluquinhoEntity) return false;
  const dist = distXZ(player.pos, maluquinhoEntity.mesh.position);
  if (dist > 3.6) {
    showToast("🍲", "MENINO MALUQUINHO", "Ele está longe demais para chutar!");
    return false;
  }
  const dx = maluquinhoEntity.mesh.position.x - player.pos.x;
  const dz = maluquinhoEntity.mesh.position.z - player.pos.z;
  const d = Math.hypot(dx, dz);
  const dirX = d > 0.1 ? dx / d : Math.sin(player.facingYaw);
  const dirZ = d > 0.1 ? dz / d : Math.cos(player.facingYaw);

  const power = 15.0 + Math.random() * 3.0;
  maluquinhoEntity.vel.set(dirX * power, 8.2 + Math.random() * 2.0, dirZ * power);
  maluquinhoEntity.angVel.set(
    (Math.random() > 0.5 ? 1 : -1) * 9.5,
    (Math.random() - 0.5) * 12,
    (Math.random() > 0.5 ? 1 : -1) * 8.5
  );
  maluquinhoEntity.ragdoll = true;
  maluquinhoEntity.ragdollTimer = 2.4;
  state.maluquinho.tormentCd = 5.5;
  state.swingTimer = 0.25;
  sfx.play("hit");
  sfx.play("maluquinho");
  spawnParticles(maluquinhoEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0x38bdf8, 16);
  return true;
}

function spawnJaguar() {
  if (!jaguarEntity || state.jaguar.active || state.jaguarDefeated || state.location !== "yard") return;
  const b = getFarmBounds();
  const spawns = [
    new THREE.Vector3(12.5, 0, 27.5),
    new THREE.Vector3(b.maxX - 2.5, 0, -24.0),
    new THREE.Vector3(-14.0, 0, -24.0),
    new THREE.Vector3(b.maxX - 2.5, 0, 22.0),
  ];
  let best = spawns[0];
  let bestD = -1;
  spawns.forEach((sp) => {
    const d = distXZ(player.pos, sp);
    if (d > bestD) {
      bestD = d;
      best = sp;
    }
  });
  jaguarEntity.mesh.position.copy(best);
  jaguarEntity.mesh.rotation.set(0, 0, 0);
  jaguarEntity.mesh.visible = true;
  if (jaguarEntity.tagMesh) jaguarEntity.tagMesh.visible = true;
  state.jaguar.active = true;
  state.jaguar.hp = state.jaguar.maxHp;
  state.jaguar.attackCd = 1.0;
  state.jaguar.hitFlash = 0;
  state.jaguar.slowTimer = 0;
  state.jaguar.burnTimer = 0;
  sfx.play("roar");
  const hasAnimals = state.animals.some((a) => a.alive);
  showDayBanner(
    hasAnimals
      ? "🐆 ALERTA! UMA ONÇA INVADIU A FAZENDA E QUER ATACAR SEUS ANIMAIS!"
      : "🐆 ALERTA! UMA ONÇA PINTADA INVADIU O SÍTIO! SEGURE A ENXADA!"
  );
  showToast(
    "🐆",
    "ONÇA NA FAZENDA!",
    state.marceloHired
      ? "O Marcelo já está correndo para proteger os animais! Ajude com a ENXADA (R)!"
      : "Selecione a ENXADA na Hotbar (1–9) e E para lutar! (Contrate o Marcelo na ETECAMP)"
  );
  updateHUD();
}

// Onça derrotada: pelo jogador fica caída (pode ser DOMADA); por Marcelo ou pela Onça domada, foge/morre
function defeatJaguar(byWho = "player") {
  if (!jaguarEntity) return;
  state.jaguar.active = false;
  state.jaguar.spawnCooldown = 210;
  state.jaguar.burnTimer = 0;
  state.jaguar.slowTimer = 0;
  jaguarEntity.bodyMat.emissive.setHex(0x000000);
  jaguarEntity.bodyMat.emissiveIntensity = 0;
  state.playerHp = state.maxHp;

  if (byWho === "player") {
    state.jaguarDefeated = true;
    state.jaguarDownTimer = 30;
    state.jaguarDownPos = { x: jaguarEntity.mesh.position.x, z: jaguarEntity.mesh.position.z };
    // Onça deitada de lado, atordoada
    jaguarEntity.mesh.rotation.z = Math.PI / 2;
    jaguarEntity.mesh.position.y = 0.45;
    if (jaguarEntity.tagMesh) jaguarEntity.tagMesh.visible = false;
    state.money += 60;
    sfx.play("upgrade");
    showDayBanner("🏆 ONÇA DERROTADA COM A ENXADA! +R$ 60 • CHEGUE PERTO PARA DOMAR!");
    showToast(
      "🐆",
      "A ONÇA ESTÁ CAÍDA!",
      state.hasTamedJaguar
        ? "Você já tem uma Onça domada. Chegue perto para soltar esta na mata (+R$ 40)."
        : "Chegue perto e aperte E para DOMAR a Onça! Ela vai proteger sua fazenda!"
    );
  } else {
    jaguarEntity.mesh.visible = false;
    state.money += 40;
    sfx.play("upgrade");
    const who = byWho === "marcelo" ? "O Marcelo" : "Sua Onça domada";
    showDayBanner(`🛡️ ${who.toUpperCase()} DERROTOU A ONÇA SELVAGEM! +R$ 40`);
    showToast("🛡️", "FAZENDA PROTEGIDA!", `${who} expulsou a Onça e protegeu os animais! +R$ 40,00`);
  }
  updateHUD();
  saveGame();
}

function tameJaguar() {
  if (!state.jaguarDefeated || !jaguarEntity) return;
  state.jaguarDefeated = false;
  jaguarEntity.mesh.visible = false;
  jaguarEntity.mesh.rotation.z = 0;
  jaguarEntity.mesh.position.y = 0;
  if (state.hasTamedJaguar) {
    state.money += 40;
    sfx.play("sell");
    showToast("🌳", "ONÇA SOLTA NA MATA", "Você soltou a Onça longe da fazenda e ganhou R$ 40 do IBAMA de Pau Arcado!");
  } else {
    state.hasTamedJaguar = true;
    state.tamedJaguarHp = state.tamedJaguarMaxHp || 120;
    state.tamedJaguarDown = false;
    state.tamedJaguarRecoverTimer = 0;
    if (tamedJaguarEntity) {
      tamedJaguarEntity.mesh.position.set(state.jaguarDownPos.x, 0, state.jaguarDownPos.z);
      tamedJaguarEntity.mesh.rotation.z = 0;
      tamedJaguarEntity.target.copy(tamedJaguarEntity.mesh.position);
      tamedJaguarEntity.mesh.visible = state.location === "yard";
    }
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(state.jaguarDownPos.x, 1.2, state.jaguarDownPos.z), 0xf472b6, 22);
    showDayBanner("❤️ ONÇA DOMADA! APERTE R PERTO DELA P/ MONTAR E F MONTADA P/ IR À ESTAÇÃO!");
    showToast("🐆", "ONÇA DOMADA!", "Defende os animais, tem HP própria e te leva à Estação CLP (R monta, F viaja)!");
  }
  updateHUD();
  saveGame();
}

function damageJaguar(amount, sourcePos, knockback = 2.8) {
  if (!state.jaguar.active || !jaguarEntity) return;
  state.jaguar.hp = Math.max(0, state.jaguar.hp - amount);
  state.jaguar.hitFlash = 0.25;
  const kx = jaguarEntity.mesh.position.x - sourcePos.x;
  const kz = jaguarEntity.mesh.position.z - sourcePos.z;
  const klen = Math.hypot(kx, kz) || 1;
  const b = getFarmBounds();
  jaguarEntity.mesh.position.x = THREE.MathUtils.clamp(jaguarEntity.mesh.position.x + (kx / klen) * knockback, b.minX + 1, b.maxX - 1);
  jaguarEntity.mesh.position.z = THREE.MathUtils.clamp(jaguarEntity.mesh.position.z + (kz / klen) * knockback, -27.5, 28.0);
  spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 14);
  spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0)), 0xef4444, 8);
}

function attackJaguarWithHoe() {
  if (!state.jaguar.active || !jaguarEntity || state.location !== "yard") return false;
  if (state.equippedTool !== "hoe") {
    sfx.play("error");
    showToast("⛏️", "SEGURE A ENXADA!", "Você está com o Regador! Selecione a ENXADA na Hotbar (1–9) para atacar!");
    return true;
  }
  const hoe = getActiveHoe();
  state.swingTimer = 0.3;
  const dist = distXZ(player.pos, jaguarEntity.mesh.position);
  if (dist > 4.2) {
    sfx.play("dig");
    showToast(hoe.emoji, "GOLPE DE ENXADA!", "Chegue um pouco mais perto da Onça para acertar!");
    return true;
  }
  sfx.play("hit");
  damageJaguar(hoe.damage, player.pos, hoe.knockback);

  // Efeitos especiais das Enxadas
  let effectMsg = "";
  if (hoe.burnDamage) {
    state.jaguar.burnTimer = 3.0;
    effectMsg = " 🔥 Queimando!";
    spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xf97316, 16);
  }
  if (hoe.slowDuration) {
    state.jaguar.slowTimer = hoe.slowDuration;
    effectMsg = " ❄️ Congelada!";
    spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0x7dd3fc, 16);
  }
  if (hoe.id === "relampago") {
    effectMsg = " ⚡ Eletrocutada!";
    spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.6, 0)), 0xfde047, 20);
  }
  if (hoe.id === "diamante") {
    effectMsg = " 💎 Golpe Crítico!";
    spawnParticles(jaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 1.3, 0)), 0x67e8f9, 20);
  }

  if (state.jaguar.hp <= 0) {
    defeatJaguar("player");
  } else {
    showToast(hoe.emoji, `${hoe.shortName.toUpperCase()} NA ONÇA!`, `-${hoe.damage} HP${effectMsg} • Onça: ${state.jaguar.hp}/${state.jaguar.maxHp}`);
  }
  updateHUD();
  return true;
}

// Animais da Fazenda

function resetAlligator() {
  if (!alligatorEntity) return;
  alligatorEntity.hp = alligatorEntity.maxHp;
  alligatorEntity.alive = true;
  alligatorEntity.respawnTimer = 0;
  alligatorEntity.attackCd = 0;
  alligatorEntity.biteAnim = 0;
  alligatorEntity.hitFlash = 0;
  alligatorEntity.aggro = false;
  alligatorEntity.mesh.visible = true;
  alligatorEntity.mesh.position.set(LAKE_CENTER_X + 2.4, LAKE_WATER_Y - 0.16, LAKE_CENTER_Z - 1.4);
  if (alligatorEntity.jawGroup) alligatorEntity.jawGroup.rotation.x = 0;
  if (alligatorEntity.bodyMat) {
    alligatorEntity.bodyMat.emissive.setHex(0x000000);
    alligatorEntity.bodyMat.emissiveIntensity = 0;
  }
}

function damageAlligator(amount, sourcePos, knockback = 2.6) {
  if (!alligatorEntity || !alligatorEntity.alive) return;
  alligatorEntity.hp = Math.max(0, alligatorEntity.hp - amount);
  alligatorEntity.hitFlash = 0.22;
  const dx = alligatorEntity.mesh.position.x - sourcePos.x;
  const dz = alligatorEntity.mesh.position.z - sourcePos.z;
  const d = Math.hypot(dx, dz) || 1;
  let nx = alligatorEntity.mesh.position.x + (dx / d) * knockback;
  let nz = alligatorEntity.mesh.position.z + (dz / d) * knockback;
  // Mantém o jacaré dentro dos limites do lago/margem
  const ldx = nx - LAKE_CENTER_X;
  const ldz = nz - LAKE_CENTER_Z;
  const ld = Math.hypot(ldx, ldz);
  if (ld > 8.6) {
    nx = LAKE_CENTER_X + (ldx / ld) * 8.6;
    nz = LAKE_CENTER_Z + (ldz / ld) * 8.6;
  }
  alligatorEntity.mesh.position.x = nx;
  alligatorEntity.mesh.position.z = nz;
  spawnParticles(alligatorEntity.mesh.position.clone().add(new THREE.Vector3(0, 0.5, 0)), 0x38bdf8, 12);

  if (alligatorEntity.hp <= 0) {
    alligatorEntity.alive = false;
    alligatorEntity.respawnTimer = 45.0;
    alligatorEntity.aggro = false;
    alligatorEntity.mesh.visible = false;
    state.money += 35;
    sfx.play("upgrade");
    spawnFloatingText(alligatorEntity.mesh.position, "🐊 +R$ 35!", "#4ade80");
    showToast("🐊", "JACARÉ AFUGENTADO!", "O Jacaré mergulhou pro fundo do lago! +R$ 35 • Lago seguro por 45s.");
    updateHUD();
    saveGame();
  }
}

function attackAlligatorWithHoe() {
  if (!alligatorEntity || !alligatorEntity.alive || state.location !== "yard") return false;
  const dist = distXZ(player.pos, alligatorEntity.mesh.position);
  if (dist > 4.4) return false;
  if (state.equippedTool !== "hoe") {
    sfx.play("error");
    showToast("⛏️", "SEGURE A ENXADA!", "Selecione a ENXADA na Hotbar (1–9) para espantar o Jacaré!");
    return true;
  }
  const hoe = getActiveHoe();
  state.swingTimer = 0.28;
  sfx.play("hit");
  sfx.play("splash");
  damageAlligator(hoe.damage, player.pos, hoe.knockback || 2.8);
  if (alligatorEntity.alive) {
    spawnFloatingText(alligatorEntity.mesh.position, `-${hoe.damage} HP 🐊`, "#facc15");
  }
  updateHUD();
  return true;
}

function buyAnimal(type) {
  const info = ANIMAL_TYPES[type];
  const aliveCount = state.animals.filter((a) => a.alive).length;
  if (aliveCount >= getMaxAnimals()) {
    showToast("🐄", "CURRAL LOTADO", `Máximo de ${getMaxAnimals()} animais! Compre Pasto Oeste/Leste para expandir.`);
    return false;
  }
  const pos = getAnimalSpawnPos(type);
  const used = state.animals.filter((a) => a.type === type).length;
  const animal = {
    id: state.nextAnimalId++,
    type,
    name: info.names[used % info.names.length],
    x: pos.x,
    z: pos.z,
    hp: info.maxHp,
    alive: true,
    hasProduct: true,
    sheared: false,
    isBaby: false,
    inLove: false,
  };
  state.animals.push(animal);
  rebuildLivestockMeshes();
  return true;
}

function collectAnimalProduct(ent) {
  const a = ent.animal;
  const info = ANIMAL_TYPES[a.type];
  if (blockAfterWorkHours()) return;
  if (!a.hasProduct) {
    showToast(info.emoji, a.name.toUpperCase(), `${a.name} ainda não está pronta(o). Volte amanhã! (Use B com ${CROPS[info.breedCrop].emoji} para reproduzir)`);
    return;
  }
  if (a.type === "cow") {
    if ((state.inventory.balde || 0) <= 0) {
      sfx.play("error");
      showToast("🪣", "PRECISA DE BALDE!", "Compre Balde Vazio na Loja da Estação CLP para tirar leite das vacas!");
      return;
    }
    removeItemFromInventory("balde", 1, true);
  } else if (a.type === "sheep") {
    if ((state.inventory.tesoura || 0) <= 0) {
      sfx.play("error");
      showToast("✂️", "PRECISA DE TESOURA!", "Compre a Tesoura de Tosa na Loja da Estação CLP para cortar a lã das ovelhas!");
      return;
    }
    a.sheared = true;
    if (ent.woolGroup) ent.woolGroup.visible = false;
  }
  a.hasProduct = false;
  ent.readyHalo.visible = false;
  if (!addItemToInventory(info.productId, 1)) {
    showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de coletar!");
  } else if (typeof trackGoalProgress === "function") {
    trackGoalProgress("animal", 1);
  }
  state.swingTimer = 0.25;
  sfx.play("harvest");
  spawnParticles(ent.mesh.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xfacc15, 12);
  const product = CROPS[info.productId];
  showToast(
    product.emoji,
    info.label.toUpperCase(),
    a.type === "cow"
      ? `+1 ${product.name} de ${a.name} (usou 1 Balde 🪣)! Venda no Terminal.`
      : a.type === "sheep"
        ? `+1 ${product.name} de ${a.name} (tosquiada ✂️)! A lã cresce amanhã.`
        : `+1 ${product.name} de ${a.name}! Venda no Terminal.`
  );
  updateHUD();
  saveGame();
}

function breedLivestock(ent) {
  if (blockAfterWorkHours()) return;
  const a = ent.animal;
  const info = ANIMAL_TYPES[a.type];
  const cropId = info.breedCrop;
  const crop = CROPS[cropId];
  if (a.isBaby) {
    showToast("🐣", a.name.toUpperCase(), `${a.name} ainda é filhote! Cresce amanhã para poder reproduzir.`);
    return;
  }
  const aliveCount = state.animals.filter((x) => x.alive).length;
  if (aliveCount >= getMaxAnimals()) {
    showToast("🐄", "CURRAL LOTADO", `Máximo de ${getMaxAnimals()} animais! Compre Pasto Oeste/Leste na Cooperativa.`);
    return;
  }
  const sameAdults = state.animals.filter((x) => x.alive && !x.isBaby && x.type === a.type);
  if (sameAdults.length < 2) {
    showToast(info.emoji, "PRECISA DE UM PAR!", `Compre ou tenha 2 adultos de ${info.label} para reproduzir!`);
    return;
  }
  if ((state.inventory[cropId] || 0) < 1) {
    sfx.play("error");
    showToast(crop.emoji, `PRECISA DE ${crop.name.toUpperCase()}!`, `Colha ${crop.name} na horta para alimentar ${info.label} (aperte B)!`);
    return;
  }
  if (a.inLove) {
    showToast("❤️", a.name.toUpperCase(), `${a.name} já está apaixonada(o)! Alimente outro(a) ${info.label} com ${crop.emoji} ${crop.name}!`);
    return;
  }
  removeItemFromInventory(cropId, 1, true);
  state.swingTimer = 0.22;
  spawnParticles(ent.mesh.position.clone().add(new THREE.Vector3(0, 1.3, 0)), 0xf472b6, 14);
  const partner = sameAdults.find((x) => x.id !== a.id && x.inLove);
  if (partner) {
    partner.inLove = false;
    a.inLove = false;
    const bx = (a.x + partner.x) * 0.5;
    const bz = (a.z + partner.z) * 0.5;
    const used = state.animals.filter((x) => x.type === a.type).length;
    const baby = {
      id: state.nextAnimalId++,
      type: a.type,
      name: `${info.names[used % info.names.length]} Jr.`,
      x: bx,
      z: bz,
      hp: Math.round(info.maxHp * 0.75),
      alive: true,
      hasProduct: false,
      sheared: false,
      isBaby: true,
      inLove: false,
    };
    state.animals.push(baby);
    rebuildLivestockMeshes();
    sfx.play("upgrade");
    showDayBanner(`💕 NASCEU UM FILHOTE DE ${info.label.toUpperCase()} (${baby.name})!`);
    showToast("💕", "REPRODUÇÃO CONCLUÍDA!", `+1 ${info.emoji} ${baby.name} com ${crop.emoji} ${crop.name}! Cresce amanhã.`);
  } else {
    a.inLove = true;
    sfx.play("plant");
    showToast("❤️", `${a.name.toUpperCase()} ALIMENTADA(O)!`, `Comeu 1 ${crop.emoji} ${crop.name}! Agora aperte B em outro(a) ${info.label} adulto.`);
  }
  updateHUD();
  saveGame();
}

function breedChicken() {
  if (blockAfterWorkHours()) return;
  if (state.chickenCount >= 12) {
    showToast("🐔", "GALINHEIRO LOTADO", "Você já tem o máximo de 12 galinhas no galinheiro!");
    return;
  }
  if ((state.inventory.milho || 0) < 1) {
    sfx.play("error");
    showToast("🌽", "PRECISA DE MILHO!", "Plante e colha Milho (tecla 9) para alimentar e reproduzir as galinhas com B!");
    return;
  }
  removeItemFromInventory("milho", 1, true);
  state.swingTimer = 0.22;
  spawnParticles(new THREE.Vector3(COOP_POS.x, 1.0, COOP_POS.z), 0xfacc15, 14);
  if (state.chickenLove <= 0) {
    state.chickenLove = 1;
    sfx.play("plant");
    showToast("🌽", "GALINHA ALIMENTADA!", "1 galinha comeu Milho! Aperte B com mais 1 🌽 Milho no galinheiro para chocar um pintinho!");
  } else {
    state.chickenLove = 0;
    state.chickenCount = Math.min(12, state.chickenCount + 1);
    state.coopEggs = Math.min(6, state.coopEggs + 1);
    syncChickensToCount(state.chickenCount, 1);
    syncCoopEggsVisual();
    sfx.play("upgrade");
    showDayBanner(`🐣 NASCEU UM PINTINHO NO GALINHEIRO! (${state.chickenCount} Galinhas)`);
    showToast("🐣", "GALINHAS REPRODUZIRAM!", `Agora há ${state.chickenCount} galinhas no quintal botando mais ovos!`);
  }
  updateHUD();
  saveGame();
}

function getCurrentAbsMinutes() {
  return state.day * 1440 + Math.floor(state.dayMinutes);
}

function isNpcKnockedOut(npcId) {
  return Boolean(state.knockedNpcs && state.knockedNpcs[npcId] > getCurrentAbsMinutes());
}

function activateLambiHomem() {
  state.isLambiHomem = true;
  state.lambiTriggeredDay = state.day;
  state.lambiUntilDay = state.day + 1;
  syncPlayerTitleSkin();
  sfx.play("roar");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0xf43f5e, 24);
  showDayBanner("👅 PASSOU DAS 22:00 NO DIA 7! ALYFFER VIROU O LAMBI HOMEM!");
  showToast(
    "👅",
    "TRANSFORMAÇÃO: LAMBI HOMEM!",
    "Você não dormiu antes das 22:00! Sem camisa, olhos vermelhos e língua gigante até amanhã à noite — vá à ETEC e aperte F para lamber alunos e NPCs!"
  );
  updateHUD();
  saveGame();
}

function lambiLickNpc(npc) {
  if (!state.isLambiHomem) return false;
  if (isNpcKnockedOut(npc.id)) {
    showToast("👅", `${npc.name.toUpperCase()} JÁ DERRUBADO(A)!`, "Já tomou uma lambida e vai ficar caído(a) por 1 dia inteiro.");
    return false;
  }
  state.knockedNpcs[npc.id] = getCurrentAbsMinutes() + 1440;
  state.swingTimer = 0.34;
  sfx.play("roar");
  spawnParticles(npc.pos.clone().add(new THREE.Vector3(0, 1.3, 0)), 0xfb7185, 22);
  spawnFloatingText(npc.pos.clone().add(new THREE.Vector3(0, 2.0, 0)), "👅 LAMBIDO! (-1 Dia)", "#fb7185");
  showDayBanner(`👅 LAMBI HOMEM LAMBEU ${npc.name.toUpperCase()}! FICOU DERRUBADO(A) POR 1 DIA!`);
  showToast("😈", "LAMBIDA CERTEIRA!", `${npc.name} desabou no chão da ETECAMP por 24 horas (1 dia)!`);
  saveGame();
  return true;
}

function killAnimal(ent) {
  const a = ent.animal;
  const info = ANIMAL_TYPES[a.type];
  a.alive = false;
  a.hp = 0;
  spawnParticles(ent.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xef4444, 22);
  livestockGroup.remove(ent.mesh);
  const idx = livestockEntities.indexOf(ent);
  if (idx >= 0) livestockEntities.splice(idx, 1);
  state.animals = state.animals.filter((x) => x.alive);
  sfx.play("death");
  showDayBanner(`💀 A ONÇA PEGOU ${info.emoji} ${a.name.toUpperCase()}! CONTRATE O MARCELO NA ETECAMP!`);
  showToast("🐆", "ANIMAL PERDIDO!", `A Onça matou ${a.name} (${info.label}). Proteja seus animais!`);
  state.jaguar.targetAnimalId = null;
  saveGame();
}

// Animação suave de sono (evita pular o dia abruptamente!)
let sleepTimers = [];
function clearSleepTimers() {
  for (let i = 0; i < sleepTimers.length; i++) clearTimeout(sleepTimers[i]);
  sleepTimers.length = 0;
}

function startSleepTransition(fromBed = false) {
  if (state.isSleeping || state.mode === "dead") return;
  clearSleepTimers();
  clearActiveInputs();
  closeAllModals();
  state.ridingJaguar = false;
  state.isSleeping = true;
  state.mode = "sleeping";

  // Deita o Alyffer na cama se estiver no quarto!
  if (fromBed && state.location === "room") {
    playerMesh.position.set(-7.0, 0.9, -5.0);
    playerMesh.rotation.set(-Math.PI / 2, 0, 0);
  }

  sfx.play("sleep");
  const nextCal = getCalendarInfo(state.day + 1);
  if (sleepTitle) sleepTitle.textContent = "😴 Alyffer foi dormir...";
  if (sleepSub) sleepSub.textContent = "Descansando na roça de Pau Arcado até amanhecer...";
  if (sleepProgressFill) sleepProgressFill.style.width = "0%";
  if (sleepOverlay) {
    sleepOverlay.classList.remove("hidden");
    requestAnimationFrame(() => {
      sleepOverlay.classList.add("visible");
      if (sleepProgressFill) sleepProgressFill.style.width = "55%";
    });
  }

  sleepTimers.push(
    setTimeout(() => {
      if (state.mode === "dead" || !state.isSleeping) return;
      advanceToNextDay();
      if (sleepTitle) sleepTitle.textContent = `☀️ Amanhecendo — ${nextCal.weekdayFull}!`;
      if (sleepSub) {
        sleepSub.textContent = state.isRainy
          ? "🌧️ Dia chuvoso em Pau Arcado! Horta regada pela chuva."
          : "☀️ Sol raiando na Estrada do Garcia! Hora de cuidar da horta.";
      }
      if (sleepProgressFill) sleepProgressFill.style.width = "100%";
    }, 1250),
    setTimeout(() => {
      if (state.mode === "dead" || !state.isSleeping) return;
      if (sleepOverlay) sleepOverlay.classList.remove("visible");
    }, 2250),
    setTimeout(() => {
      if (state.mode === "dead" || !state.isSleeping) return;
      if (sleepOverlay) sleepOverlay.classList.add("hidden");
      playerMesh.rotation.set(0, player.facingYaw, 0);
      playerMesh.position.copy(player.pos);
      state.isSleeping = false;
      state.mode = "playing";
      sleepTimers.length = 0;
      updateHUD();
    }, 3100)
  );
}

function enterRoom() {
  switchLocation("room", 0, 5.8, Math.PI, 0, 0.4, 11.5);
  showToast("🏠", "CASA DO ALYFFER", "Quarto, Sala, Cozinha e Banheiro em Pau Arcado!");
}

function exitRoom() {
  switchLocation("yard", 0, -11.5, 0, 0.2, 0.48, 16.5);
}

function enterBasement() {
  switchLocation("basement", 0, 6.2, Math.PI, 0, 0.42, 13.5);
  sfx.play("upgrade");
  showDayBanner("🌀 PORÃO SECRETO DESCOBERTO! O MULTIVERSO DOS MACHOS!");
  showToast("🌀", "PORÃO SECRETO DO ALYFFER", "Fale com as cópias alternativas do Macho para vestir as roupas e cores delas!");
}

function exitBasement() {
  switchLocation("room", -8.95, -5.2, 0, 0, 0.4, 11.5);
  showToast("🪜", "DE VOLTA AO QUARTO", "Você subiu a escada do porão secreto.");
}

function getActiveTamedJaguar() {
  if (!state.hasTamedJaguar) return null;
  if (state.location === "terminal" && typeof termJaguarMesh !== "undefined" && termJaguarMesh) {
    return { mesh: termJaguarMesh, legs: termJaguarMesh.userData.legs || [], tail: termJaguarMesh.userData.tail || null };
  }
  if (state.location === "yard" && tamedJaguarEntity) {
    return tamedJaguarEntity;
  }
  return null;
}

function canMountTamedJaguar() {
  if (!state.hasTamedJaguar || state.tamedJaguarDown || state.ridingJaguar) return false;
  const tj = getActiveTamedJaguar();
  return !!(tj && tj.mesh.visible && distXZ(player.pos, tj.mesh.position) < 2.9);
}

function setJagTagVisible(jagEnt, visible) {
  if (!jagEnt || !jagEnt.mesh) return;
  if (jagEnt.tagMesh) {
    jagEnt.tagMesh.visible = visible;
    return;
  }
  jagEnt.mesh.children.forEach((ch) => {
    if (ch.userData && ch.userData.isJagTag) ch.visible = visible;
  });
}

function mountTamedJaguar() {
  if (!state.hasTamedJaguar) return false;
  if (state.tamedJaguarDown) {
    showToast("💤", "ONÇA CAÍDA!", `Ela apanhou muito e está descansando no chão (${Math.ceil(state.tamedJaguarRecoverTimer)}s)!`);
    return false;
  }
  const tj = getActiveTamedJaguar();
  if (!tj || !tj.mesh.visible) return false;
  state.ridingJaguar = true;
  setJagTagVisible(tj, false);
  player.pos.x = tj.mesh.position.x;
  player.pos.z = tj.mesh.position.z;
  player.pos.y = getFloorYAt(player.pos.x, player.pos.z);
  player.vy = 0;
  player.grounded = true;
  const sOffX = Math.sin(player.facingYaw) * -0.13;
  const sOffZ = Math.cos(player.facingYaw) * -0.13;
  playerMesh.position.set(player.pos.x + sOffX, player.pos.y + 0.37, player.pos.z + sOffZ);
  sfx.play("roar");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 14);
  showToast("🐆", "MONTADO NA ONÇA!", "Aperte F em cima dela p/ Fast Travel até a Estação CLP, ou R para descer!");
  updateHUD();
  return true;
}

function dismountTamedJaguar(silent = false) {
  if (!state.ridingJaguar) return false;
  state.ridingJaguar = false;
  const floorY = getFloorYAt(player.pos.x, player.pos.z);
  const tj = getActiveTamedJaguar();
  if (tj) {
    setJagTagVisible(tj, true);
    tj.mesh.position.set(player.pos.x, floorY, player.pos.z);
    tj.mesh.rotation.x = 0;
    tj.mesh.rotation.z = 0;
    if (tj.target) tj.target.copy(tj.mesh.position);
    for (const leg of tj.legs || []) leg.rotation.x = 0;
  }
  const sideX = Math.cos(player.facingYaw) * 1.35;
  const sideZ = -Math.sin(player.facingYaw) * 1.35;
  const b = state.location === "terminal"
    ? { minX: -38.0, maxX: 21.2, minZ: -26.6, maxZ: 24.0 }
    : { ...getFarmBounds(), minZ: -28.5, maxZ: 48.5 };
  player.pos.x = THREE.MathUtils.clamp(player.pos.x + sideX, b.minX, b.maxX);
  player.pos.z = THREE.MathUtils.clamp(player.pos.z + sideZ, b.minZ, b.maxZ);
  player.pos.y = getFloorYAt(player.pos.x, player.pos.z);
  playerMesh.position.copy(player.pos);
  if (!silent) {
    showToast("🐆", "DESCEU DA ONÇA", "Aperte R perto dela para montar novamente.");
  }
  updateHUD();
  return true;
}

function fastTravelJaguarToStation() {
  if (!state.hasTamedJaguar || !state.ridingJaguar || state.tamedJaguarDown) return false;
  sfx.play("roar");
  if (state.location === "yard") {
    switchLocation("terminal", TERM_JAGUAR_POS.x, TERM_JAGUAR_POS.z, 0.35, 0.15, 0.24, 15.0, true);
    if (typeof termJaguarMesh !== "undefined" && termJaguarMesh) {
      termJaguarMesh.position.set(TERM_JAGUAR_POS.x, getFloorYAt(TERM_JAGUAR_POS.x, TERM_JAGUAR_POS.z), TERM_JAGUAR_POS.z);
      termJaguarMesh.rotation.y = 0.35;
      termJaguarMesh.rotation.z = 0;
      setJagTagVisible({ mesh: termJaguarMesh }, false);
    }
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 22);
    showDayBanner("🚉 FAST TRAVEL DE ONÇA: ESTAÇÃO CAMPO LIMPO PAULISTA (LINHA 7-RUBI)!");
    showToast("🐆", "ESTAÇÃO CLP!", "Chegou na Estação! Aperte F montado para voltar ao Pau Arcado ou R para descer.");
  } else if (state.location === "terminal") {
    switchLocation("yard", 12.5, 25.0, Math.PI, 0.2, 0.48, 16.5, true);
    if (tamedJaguarEntity) {
      tamedJaguarEntity.mesh.position.set(12.5, 0, 25.0);
      tamedJaguarEntity.mesh.rotation.y = Math.PI;
      tamedJaguarEntity.mesh.rotation.z = 0;
      tamedJaguarEntity.target.set(12.5, 0, 25.0);
    }
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 22);
    showToast("🐆", "VOLTOU P/ PAU ARCADO!", "A Onça Domada voou baixo na Estrada do Garcia!");
  } else {
    showToast("🐆", "SEM CAMINHO", "Saia do cômodo antes do Fast Travel com a Onça!");
    return false;
  }
  updateHUD();
  return true;
}

function damageTamedJaguar(amount) {
  if (!state.hasTamedJaguar || state.tamedJaguarDown) return;
  const maxHp = state.tamedJaguarMaxHp || 120;
  state.tamedJaguarHp = Math.max(0, state.tamedJaguarHp - amount);
  const tj = getActiveTamedJaguar();
  if (tj) {
    spawnParticles(tj.mesh.position.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xef4444, 8);
    spawnFloatingText(tj.mesh.position.clone().add(new THREE.Vector3(0, 1.6, 0)), `-${amount} HP`, "#fca5a5");
  }
  if (state.tamedJaguarHp <= 0) {
    state.tamedJaguarDown = true;
    state.tamedJaguarRecoverTimer = 45;
    if (state.ridingJaguar) {
      dismountTamedJaguar(true);
    }
    if (tamedJaguarEntity) {
      tamedJaguarEntity.mesh.rotation.z = Math.PI / 2;
      tamedJaguarEntity.mesh.position.y = 0.45;
      for (const leg of tamedJaguarEntity.legs || []) leg.rotation.x = 0;
    }
    sfx.play("death");
    showDayBanner("💤 SUA ONÇA APANHOU DEMAIS E CAIU INATIVA NO CHÃO!");
    showToast("🩹", "ONÇA INATIVA!", "Ela ficou deitada se recuperando (45s ou durma na cama para curar 100%).");
  }
  updateHUD();
}

function takeBus402ToTerminal() {
  if (state.isRainy) {
    sfx.play("error");
    showToast("🌧️", "ÔNIBUS 402 PARADO", "Está chovendo em Pau Arcado! O 402 não passa hoje. Durma até o próximo dia.");
    return;
  }
  const busInfo = getBus402Status("pauArcado");
  if (!busInfo.available) {
    sfx.play("error");
    const nextMsg = busInfo.nextTime
      ? `Próximo 402 (${busInfo.cal.scheduleLabel}) sai às ${busInfo.nextTime} (em ${busInfo.minsUntilNext} min). Aperte K p/ ver tabela!`
      : `Sem mais saídas do 402 hoje! Durma até amanhã.`;
    showToast("🚌", "ÔNIBUS 402 FORA DE HORÁRIO", nextMsg);
    return;
  }
  switchLocation("terminal", -7.5, -1.5, 0, 0.2, 0.24, 15.0);
  showDayBanner(`TERMINAL DE CAMPO LIMPO PAULISTA • LINHA 402 (${busInfo.activeTime})`);
}

function takeBus402ToYard() {
  if (state.isRainy) {
    sfx.play("error");
    showToast("🌧️", "ÔNIBUS 402 PARADO", "Chuva forte em Pau Arcado! Use Pausar (P) → Dormir se precisar voltar.");
    return;
  }
  const busInfo = getBus402Status("terminal");
  if (!busInfo.available) {
    sfx.play("error");
    const nextMsg = busInfo.nextTime
      ? `Próximo 402 (${busInfo.cal.scheduleLabel}) sai do Terminal às ${busInfo.nextTime} (em ${busInfo.minsUntilNext} min). Aperte K p/ ver tabela!`
      : `Sem mais saídas do 402 hoje no Terminal! Use P → Dormir até amanhã.`;
    showToast("🚌", "ÔNIBUS 402 FORA DE HORÁRIO", nextMsg);
    return;
  }
  switchLocation("yard", 21.8, 42.4, Math.PI, 0.2, 0.48, 16.5);
  showToast("🚌", "VOLTOU PRA PAU ARCADO", `Desceu do Ônibus 402 (${busInfo.activeTime}) no ponto ao lado da Estrada do Garcia!`);
}

function takeTrainToEtec() {
  switchLocation("etec", 0, 27.6, Math.PI, 0, 0.44, 18.5);
  showDayBanner("ETEC DE CAMPO LIMPO PAULISTA • ENTRADA PRINCIPAL");
}

function takeTrainToTerminal() {
  switchLocation("terminal", 17.6, 0, -Math.PI / 2, 0.2, 0.24, 15.0);
  
}

function enterEtecInside(entry = "front") {
  const cal = getCalendarInfo(state.day);
  if (cal.isWeekend) {
    sfx.play("error");
    showToast("🔒", "ETECAMP FECHADA", `Hoje é ${cal.weekdayFull}! A escola só abre de Segunda a Sexta.`);
    return;
  }
  syncRefeitorioMenuVisual();
  if (entry === "back") {
    switchLocation("etec_inside", 0, -32.0, 0, Math.PI, 0.46, 15.5);
  } else if (entry === "parking") {
    switchLocation("etec_inside", -2.2, 62.0, Math.PI / 2, 0, 0.46, 15.5);
  } else {
    switchLocation("etec_inside", 0, 62.2, Math.PI, 0, 0.46, 15.5);
  }
}

function exitEtecInside(exitPoint = "front") {
  if (exitPoint === "back") {
    switchLocation("etec", 0, -19.5, Math.PI, Math.PI, 0.44, 18.0);
  } else if (exitPoint === "parking") {
    switchLocation("etec", -13.4, 1.0, -Math.PI / 2, -Math.PI / 2, 0.44, 18.0);
  } else {
    switchLocation("etec", 0, 10.6, 0, 0, 0.44, 18.5);
  }
}

function findCurrentContext() {
  plots.forEach((p) => (p.ring.visible = false));

  if (state.location === "room") {
    if (distXZ(player.pos, EXIT_POS) < 1.8) {
      return { type: "exit_room", key: "E", text: "Sair para o Quintal (Pau Arcado)" };
    }
    if (state.basementUnlocked && distXZ(player.pos, SECRET_HATCH_POS) < 1.35) {
      return { type: "secret_hatch", key: "E", text: "Descer pelo Alçapão Secreto 🪜" };
    }
    if (!state.basementUnlocked && state.basementStep === 0 && distXZ(player.pos, SECRET_SWITCH_1_POS) < 1.05) {
      return { type: "secret_sw1", key: "E", text: "Mexer no pino enferrujado na fresta da parede" };
    }
    if (!state.basementUnlocked && state.basementStep === 1 && distXZ(player.pos, SECRET_SWITCH_2_POS) < 1.15) {
      return { type: "secret_sw2", key: "E", text: "Girar registro solto no ralo do box" };
    }
    if (distXZ(player.pos, BED_POS) < 2.5) {
      return { type: "bed", key: "E", text: "Dormir na Cama (Próximo Dia)" };
    }
    if (distXZ(player.pos, MANGA_POS) < 1.9) {
      return { type: "manga", key: "E", text: "Ler Mangá & Ver Pôster do PAC (TazerCraft)" };
    }
    if (distXZ(player.pos, ETEC_POS) < 2.1) {
      return { type: "etec", key: "E", text: "Revisar Cadernos da ETEC Campo Limpo Paulista" };
    }
    if (distXZ(player.pos, STOVE_POS) < 2.2) {
      return { type: "stove", key: "E", text: "Usar Fogão da Cozinha (Receitas da Roça) 🍳" };
    }
    if (distXZ(player.pos, COFFEE_POS) < 2.3) {
      return { type: "coffee", key: "E", text: "Tomar Café Coado na Cozinha (+Energia ⚡)" };
    }
    if (distXZ(player.pos, TOILET_POS) < 1.65) {
      return { type: "toilet", key: "E", text: "Usar o Banheiro da Casa" };
    }
    return null;
  }

  if (state.location === "basement") {
    if (distXZ(player.pos, BASEMENT_EXIT_POS) < 2.0) {
      return { type: "exit_basement", key: "E", text: "Subir Escada de Volta para o Quarto" };
    }
    for (const clone of basementClones) {
      if (distXZ(player.pos, clone.posVec) < 2.15) {
        const equipped = state.machoSkin === clone.id;
        return {
          type: "macho_clone",
          clone,
          key: "E",
          text: equipped
            ? `Falar com ${clone.name} (Roupa Equipada ✓)`
            : `Falar com ${clone.name} & Vestir Roupa Alternativa`,
        };
      }
    }
    return null;
  }

  if (state.location === "terminal") {
    if (state.hasTamedJaguar && !state.ridingJaguar) {
      const tjPos = typeof termJaguarMesh !== "undefined" && termJaguarMesh ? termJaguarMesh.position : TERM_JAGUAR_POS;
      if (distXZ(player.pos, tjPos) < 2.9) {
        if (state.tamedJaguarDown) {
          return {
            type: "tamed_jaguar_down",
            key: "💤",
            text: `Onça caída no chão (${Math.ceil(state.tamedJaguarRecoverTimer)}s) • E: Acariciar (-5s)`,
          };
        }
        return {
          type: "tamed_jaguar_idle",
          key: "R",
          text: `🐆 Montar na Onça (R) • HP ${Math.round(state.tamedJaguarHp)}/${state.tamedJaguarMaxHp || 120} • E: Carinho`,
        };
      }
    }
    if (distXZ(player.pos, TERM_SELL_POS) < 3.4) {
      const items = getTotalBasketCount();
      return {
        type: "term_sell",
        key: "E",
        text: isAfterWorkHours()
          ? "Bancas fechadas após 19:00 (ver encomendas)"
          : items > 0
            ? `Vender Colheita no Terminal (${items})`
            : "Abrir Bancas & Encomendas de CLP",
      };
    }
    if (distXZ(player.pos, TERM_PASTEL_POS) < 3.2) {
      return { type: "pastel", key: "E", text: "Comprar Pastel + Caldo de Cana (R$ 24 • +Energia)" };
    }
    if (distXZ(player.pos, TERM_STATION_SHOP_POS) < 3.4) {
      return { type: "station_shop", key: "E", text: "Abrir Loja da Estação CLP (Enxadas, Balde & Tesoura) 🚉" };
    }
    if (distXZ(player.pos, TERM_BUS_BACK_POS) < 3.5) {
      const bus = getBus402Status("terminal");
      return {
        type: "bus_to_yard",
        key: "E",
        text: bus.available
          ? `Embarcar Ônibus 402 (${bus.activeTime}) → Pau Arcado`
          : bus.nextTime
            ? `Ônibus 402 fora de horário • Próximo às ${bus.nextTime} (em ${bus.minsUntilNext}m)`
            : "Ônibus 402 encerrou hoje • Pressione K p/ tabela",
      };
    }
    if (distXZ(player.pos, TERM_TRAIN_POS) < 3.4) {
      return { type: "train_to_etec", key: "E", text: "Pegar Trem Linha 7-Rubi p/ ETEC (Botujuru)" };
    }
    if (state.ridingJaguar) {
      return {
        type: "mounted_jaguar",
        key: "F / R",
        text: "🐆 Em cima da Onça: F Fast Travel p/ Pau Arcado • R Descer",
      };
    }
    return null;
  }

  if (state.location === "etec") {
    if (distXZ(player.pos, ETEC_TRAIN_BACK_POS) < 3.0) {
      return { type: "train_to_term", key: "E", text: "Pegar Trem Linha 7-Rubi p/ Terminal CLP" };
    }
    const isWknd = getCalendarInfo(state.day).isWeekend;
    if (distXZ(player.pos, ETEC_DOOR_IN_POS) < 2.8) {
      return {
        type: "enter_etec",
        entry: "front",
        key: isWknd ? "🔒" : "E",
        text: isWknd ? "ETECAMP fechada no fim de semana (Seg–Sex)" : "Entrar na ETECAMP (Frente)",
      };
    }
    if (distXZ(player.pos, ETEC_PARKING_DOOR_POS) < 2.8) {
      return {
        type: "enter_etec",
        entry: "parking",
        key: isWknd ? "🔒" : "E",
        text: isWknd ? "ETECAMP fechada no fim de semana (Seg–Sex)" : "Entrar na ETECAMP pelo Estacionamento",
      };
    }
    if (distXZ(player.pos, ETEC_BACK_DOOR_POS) < 2.8) {
      return {
        type: "enter_etec",
        entry: "back",
        key: isWknd ? "🔒" : "E",
        text: isWknd ? "ETECAMP fechada no fim de semana (Seg–Sex)" : "Entrar na ETECAMP pelos Fundos",
      };
    }
    if (distXZ(player.pos, ETEC_AUTOMATION_POS) < 4.6) {
      return {
        type: "use_automation",
        key: "E",
        text: state.automationDoneToday
          ? "Testar Braço Robótico & CLP na Sala de Automação 🤖"
          : "Programar CLP na Sala de Automação 🤖 (+35% Horta & -10% Insanidade)",
      };
    }
    if (etecBall && distXZ(player.pos, etecBall.mesh.position) < 2.55) {
      return { type: "shoot_ball", key: "E", text: "Arremessar Bola na Cesta de Basquete! 🏀" };
    }
    return null;
  }

  if (state.location === "etec_inside") {
    if (distXZ(player.pos, ETEC_EXIT_POS) < 2.4) {
      return { type: "exit_etec", exitPoint: "front", key: "E", text: "Sair para a Área Aberta / Entrada Principal" };
    }
    if (distXZ(player.pos, ETEC_EXIT_BACK_POS) < 2.4) {
      return { type: "exit_etec", exitPoint: "back", key: "E", text: "Sair pela Entrada Aberta (Parte Externa Fundos)" };
    }
    if (distXZ(player.pos, ETEC_EXIT_PARKING_POS) < 2.2) {
      return { type: "exit_etec", exitPoint: "parking", key: "E", text: "Sair para o Estacionamento" };
    }
    if (distXZ(player.pos, CHEM_BENCH_POS) < 2.8) {
      return {
        type: "chem_bench",
        key: "E",
        text: isAfterWorkHours()
          ? "Lab fechado após 19:00 — Vá descansar!"
          : state.npkDoneToday
            ? "Fórmula NPK já sintetizada hoje ✓"
            : "Sintetizar Super-Adubo NPK no Lab de Química!",
      };
    }
    if (distXZ(player.pos, ETEC_REFEITORIO_POS) < 3.8) {
      const menu = getTodayRefeitorioMenu(state.day);
      const taken = state.merendaTakenToday || 0;
      return {
        type: "refeitorio_merenda",
        key: "E",
        text: menu.closed
          ? "Refeitório fechado no fim de semana"
          : taken >= 2
            ? "Limite diário da merenda atingido (2/2) ✓"
            : `Pegar Merenda (${2 - taken} restante${2 - taken === 1 ? "" : "s"}): ${menu.label} 🍽️`,
      };
    }
    if (distXZ(player.pos, NURSE_BED_POS) < 2.6) {
      return {
        type: "nurse_care",
        key: "E",
        text: "Fazer Curativo na Enfermaria (Recupera Vida ❤️)",
      };
    }
    if (distXZ(player.pos, ETEC_FOUNTAIN_L_POS) < 2.5 || distXZ(player.pos, ETEC_FOUNTAIN_R_POS) < 2.5) {
      const fPos = distXZ(player.pos, ETEC_FOUNTAIN_L_POS) <= distXZ(player.pos, ETEC_FOUNTAIN_R_POS)
        ? ETEC_FOUNTAIN_L_POS
        : ETEC_FOUNTAIN_R_POS;
      return {
        type: "drink_fountain",
        pos: fPos,
        key: "E",
        text: "Apertar Torneira e Beber Água na Pia 💧 (+Vida & -Insanidade)",
      };
    }
    for (const npc of etecNpcs) {
      if (distXZ(player.pos, npc.pos) < 2.45) {
        if (isNpcKnockedOut(npc.id)) {
          const hrsLeft = Math.max(1, Math.ceil((state.knockedNpcs[npc.id] - getCurrentAbsMinutes()) / 60));
          return {
            type: "npc_knocked",
            npcId: npc.id,
            npc,
            key: "👅",
            text: `${npc.name} está derrubado(a) pela lambida do Lambi Homem! (${hrsLeft}h p/ acordar)`,
          };
        }
        const talkText =
          npc.id === "kaio"
            ? "Conversar / Comprar Adubo com Kaio Wendell"
            : npc.id === "marcelo"
              ? "Falar com Marcelo (Segurança & Vaselina) 🛡️"
              : `Conversar com ${npc.name}`;
        return {
          type: "npc",
          npcId: npc.id,
          npc,
          key: state.isLambiHomem ? "E / F" : "E",
          text: state.isLambiHomem ? `${talkText} • 👅 F: LAMBER!` : talkText,
        };
      }
    }
    return null;
  }

  // Yard (Pau Arcado) stations
  // Onça caída atordoada pronta para ser domada!
  if (state.jaguarDefeated && jaguarEntity && jaguarEntity.mesh.visible && distXZ(player.pos, jaguarEntity.mesh.position) < 3.2) {
    return {
      type: "tame_jaguar",
      key: "E",
      text: state.hasTamedJaguar
        ? "Soltar Onça Atordoada na Mata (+R$ 40 do IBAMA) 🌳"
        : "Domar a Onça Pintada! ❤️🐆 (Defende a fazenda e leva ao Terminal!)",
    };
  }

  // Onça domada seguindo ou caída no pasto
  if (state.hasTamedJaguar && !state.ridingJaguar && tamedJaguarEntity && tamedJaguarEntity.mesh.visible && distXZ(player.pos, tamedJaguarEntity.mesh.position) < 2.8) {
    if (state.tamedJaguarDown) {
      return {
        type: "tamed_jaguar_down",
        key: "💤",
        text: `Onça caída no chão (${Math.ceil(state.tamedJaguarRecoverTimer)}s) • E: Acalmar (-5s)`,
      };
    }
    return {
      type: "tamed_jaguar_idle",
      key: "R",
      text: `🐆 Montar na Onça (R) • HP ${Math.round(state.tamedJaguarHp)}/${state.tamedJaguarMaxHp || 120} • F montada p/ Estação!`,
    };
  }

  // Marcelo Segurança no quintal/pasto
  if (state.marceloHired && marceloYardEntity && marceloYardEntity.mesh.visible && distXZ(player.pos, marceloYardEntity.mesh.position) < 2.5) {
    return {
      type: "talk_marcelo_yard",
      key: "E",
      text: `Falar com Marcelo Segurança (${state.marceloDaysLeft} dia(s) de vigia) 🛡️`,
    };
  }

  // Animais do sítio (Vacas, Ovelhas, Porcos)
  if (livestockEntities && livestockEntities.length > 0) {
    for (const ent of livestockEntities) {
      if (ent.animal && ent.animal.alive && distXZ(player.pos, ent.mesh.position) < 2.8) {
        const info = ANIMAL_TYPES[ent.animal.type];
        const breedCrop = CROPS[info.breedCrop];
        const loveTag = ent.animal.inLove ? " ❤️" : "";
        const breedHint = ent.animal.isBaby
          ? " • 🐣 Filhote"
          : ` • B: Reproduzir (${breedCrop.emoji} ${breedCrop.name})`;
        if (ent.animal.hasProduct) {
          return {
            type: "collect_animal",
            ent,
            key: "E / B",
            text: `${info.actionText} de ${ent.animal.name}${loveTag}${breedHint}`,
          };
        } else {
          return {
            type: "pet_animal",
            ent,
            key: "E / B",
            text: `Acariciar ${ent.animal.name} (${info.label})${loveTag}${breedHint}`,
          };
        }
      }
    }
  }

  if (state.jaguar.active && jaguarEntity && distXZ(player.pos, jaguarEntity.mesh.position) < 4.3) {
    return {
      type: "fight_jaguar",
      key: state.equippedTool === "hoe" ? "E" : "1–9",
      text:
        state.equippedTool === "hoe"
          ? `⛏️ Bater na Onça com a Enxada! (${state.jaguar.hp} HP)`
          : "⚠️ Selecione a ENXADA na Hotbar (1–9) para enfrentar a Onça!",
    };
  }
  if (distXZ(player.pos, BUS_STOP_YARD_POS) < 4.5) {
    const bus = getBus402Status("pauArcado");
    return {
      type: "bus_to_term",
      key: "E",
      text: state.isRainy
        ? "Ônibus 402 parado pela chuva! Espere amanhã"
        : bus.available
          ? `Embarcar Ônibus 402 (${bus.activeTime}) → Terminal CLP`
          : bus.nextTime
            ? `Ônibus 402 fora de horário • Próximo às ${bus.nextTime} (em ${bus.minsUntilNext}m)`
            : "Sem mais ônibus 402 hoje • Veja Calendário (K)",
    };
  }
  if (distXZ(player.pos, COOP_POS) < 2.8) {
    return {
      type: "coop",
      key: "E / B",
      text: isAfterWorkHours()
        ? "🌙 Após 19:00 — Sem trabalho! Vá dormir"
        : state.coopEggs > 0
          ? `Recolher Ovos (${state.coopEggs} 🥚) • B: Reproduzir Galinhas (🌽 Milho)`
          : `Galinheiro (${state.chickenCount} galinhas) • B: Reproduzir (🌽 Milho)`,
    };
  }
  if (distXZ(player.pos, WELL_POS) < 3.4) {
    return {
      type: "well",
      key: "E",
      text: isAfterWorkHours() ? "🌙 Após 19:00 — Expediente encerrado!" : "Encher Regador no Poço",
    };
  }
  if (distXZ(player.pos, CHEST_POS) < 3.0) {
    return {
      type: "chest",
      key: "E",
      text: "Abrir Baú do Sítio (Guardar & Pegar Itens) 🧰",
    };
  }
  if (dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 2.3) {
    return { type: "dog", key: "E", text: "Fazer carinho no Orelha 🐕" };
  }
  if (alligatorEntity && alligatorEntity.alive && distXZ(player.pos, alligatorEntity.mesh.position) < 4.2) {
    return {
      type: "fight_alligator",
      key: state.equippedTool === "hoe" ? "E" : "1–9",
      text:
        state.equippedTool === "hoe"
          ? `⛏️ Bater no Jacaré com a Enxada! (${Math.round(alligatorEntity.hp)} HP)`
          : "🐊 Jacaré atacando! Selecione a ENXADA (1–9) ou saia da água!",
    };
  }
  if (distXZ(player.pos, JESSY_LAKE_POS) < 6.4 || (jessyEntity && distXZ(player.pos, jessyEntity.worldPos) < 6.4)) {
    return { type: "talk_jessy", key: "E", text: "Falar com Jessy no Lago (Matemática) 🧮" };
  }
  if (distXZ(player.pos, STAND_POS) < 3.8) {
    return { type: "shop", key: "E", text: "Abrir Cooperativa Rural (Melhorias & Água Auto)" };
  }
  if (distXZ(player.pos, DOOR_POS) < 2.3) {
    return { type: "door", key: "E", text: "Entrar em Casa (Quarto do Macho)" };
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
    if (isAfterWorkHours()) {
      return {
        type: "plot",
        plot: bestPlot,
        key: "🌙 19h+",
        text: "Depois das 19:00 o Macho não trabalha! Vá dormir em casa",
      };
    }
    const held = getHeldItem();
    if (bestPlot.stage === "raw") {
      return {
        type: "plot",
        plot: bestPlot,
        key: held && held.hoeId ? "E" : "1–9",
        text: held && held.hoeId ? `Arar terra com ${held.emoji} ${held.shortName}` : "Segure uma Enxada (Hotbar 1–9) para arar!",
      };
    }
    if (bestPlot.stage === "tilled") {
      if (held && held.seedCropId) {
        const crop = CROPS[held.seedCropId];
        return {
          type: "plot",
          plot: bestPlot,
          key: "E",
          text: `Plantar 🌱 ${crop.emoji} ${crop.name} (na mão)`,
        };
      }
      return {
        type: "plot",
        plot: bestPlot,
        key: "1–9 / I",
        text: "Segure uma Semente 🌱 na Hotbar p/ plantar (compre no I ou Cooperativa)",
      };
    }
    if (bestPlot.stage === "growing") {
      const crop = CROPS[bestPlot.cropId];
      const pct = Math.min(99, Math.floor(bestPlot.growth * 100));
      const hasAnyFert = state.kaioAdubo > 0 || state.kaioSuperAdubo > 0;
      if (held && (held.id === "adubo_npk" || held.id === "super_adubo")) {
        return {
          type: "plot",
          plot: bestPlot,
          key: "E",
          text: `Aplicar ${held.emoji} ${held.shortName} em ${crop.name} (${pct}%)`,
        };
      }
      if (bestPlot.waterTimer <= 0) {
        const holdingCan = !!(held && held.id === "regador");
        return {
          type: "plot",
          plot: bestPlot,
          key: holdingCan ? "E" : "1–9",
          text: holdingCan
            ? (hasAnyFert ? `Regar ${crop.name} (${pct}%) • F: Adubo Kaio` : `Regar ${crop.name} (${pct}%)`)
            : `Segure o Regador 🚿 (Hotbar 1–9) para regar ${crop.name} (${pct}%)`,
        };
      }
      if (hasAnyFert) {
        const fertLabel =
          !bestPlot.fertilized && state.kaioAdubo > 0
            ? `Aplicar Adubo NPK do Kaio (+50% e 2x vel.)`
            : state.kaioSuperAdubo > 0
              ? `Aplicar Super-Adubo do Kaio (Colheita Já!)`
              : `Aplicar Adubo NPK do Kaio (+50%)`;
        return {
          type: "plot",
          plot: bestPlot,
          key: "E / F",
          text: `${crop.name} (${pct}%) — ${fertLabel}`,
        };
      }
      return {
        type: "info_plot",
        plot: bestPlot,
        key: "🌱",
        text: `${crop.name} crescendo (${pct}%) — ${bestPlot.fertilized ? "Adubado ⚡" : "Regado"}`,
      };
    }
    if (bestPlot.stage === "ready") {
      const crop = CROPS[bestPlot.cropId];
      return {
        type: "plot",
        plot: bestPlot,
        key: "E",
        text: `Colher ${crop.emoji} ${crop.name}!`,
      };
    }
  }

  if (state.ridingJaguar) {
    return {
      type: "mounted_jaguar",
      key: "F / R",
      text: "🐆 Montado na Onça: F Fast Travel p/ Estação CLP • R Descer",
    };
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

function blockAfterWorkHours() {
  if (!isAfterWorkHours()) return false;
  sfx.play("error");
  showToast("🌙", "EXPEDIENTE ENCERRADO (19:00)", "Depois das 19:00 o Macho não pode mais trabalhar! Vá dormir em casa.");
  return true;
}

function applyKaioFertilizer(plot) {
  if (!plot || !plot.unlocked || plot.stage !== "growing") {
    sfx.play("error");
    showToast("🧪", "ADUBO DO KAIO", "Chegue perto de um canteiro com planta crescendo para aplicar o adubo!");
    return false;
  }
  if (blockAfterWorkHours()) return false;
  if (state.kaioAdubo <= 0 && state.kaioSuperAdubo <= 0) {
    sfx.play("error");
    showToast("🧪", "SEM ADUBO DO KAIO", "Compre Adubo NPK ou Super-Adubo com o Kaio Wendell no Lab de Química da ETEC!");
    return false;
  }

  const crop = CROPS[plot.cropId];
  const held = getHeldItem();
  const forceSuper = held && held.id === "super_adubo" && state.kaioSuperAdubo > 0;
  const forceNpk = held && held.id === "adubo_npk" && state.kaioAdubo > 0;
  if (!forceSuper && (forceNpk || (state.kaioAdubo > 0 && (!plot.fertilized || state.kaioSuperAdubo <= 0)))) {
    removeItemFromInventory("adubo_npk", 1, true);
    plot.fertilized = true;
    plot.growth = Math.min(1, plot.growth + 0.5);
    plot.waterTimer = Math.max(plot.waterTimer, 20);
    if (plot.growth >= 1) plot.stage = "ready";
    state.swingTimer = 0.25;
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(plot.x, 0.55, plot.z), 0x84cc16, 16);
    showToast(
      "🧪",
      "ADUBO NPK DO KAIO!",
      plot.stage === "ready"
        ? `${crop.name} amadureceu na hora!`
        : `${crop.name} saltou +50% e agora cresce em 2x velocidade!`
    );
  } else if (state.kaioSuperAdubo > 0) {
    removeItemFromInventory("super_adubo", 1, true);
    plot.fertilized = true;
    plot.growth = 1;
    plot.stage = "ready";
    plot.waterTimer = Math.max(plot.waterTimer, 20);
    state.swingTimer = 0.28;
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(plot.x, 0.65, plot.z), 0xfacc15, 20);
    showToast("⚗️", "SUPER-ADUBO DO KAIO!", `${crop.emoji} ${crop.name} amadureceu 100% instantaneamente!`);
  }
  refreshPlotAppearance(plot);
  updateHUD();
  saveGame();
  return true;
}

function interactWithPlot(plot, opts = {}) {
  const lockedAction = opts.lockedAction || null;
  const silentToast = !!opts.silentToast;

  if (!plot.unlocked) {
    if (!lockedAction) openShopModal();
    return null;
  }
  if (blockAfterWorkHours()) return null;

  const held = getHeldItem();

  if (plot.stage === "raw") {
    if (lockedAction && lockedAction !== "till") return null;
    if (!held || !held.hoeId) {
      if (!lockedAction) {
        sfx.play("error");
        showToast("⛏️", "SEGURE UMA ENXADA!", "Selecione sua Enxada na Hotbar (1–9) para arar a terra!");
      }
      return null;
    }
    const hoe = HOES[held.hoeId] || getActiveHoe();
    const tillOne = (p) => {
      if (!p.unlocked || p.stage !== "raw") return false;
      p.stage = "tilled";
      p.popTimer = 0.22;
      if (hoe.id === "gelo") p.waterTimer = 0;
      spawnParticles(new THREE.Vector3(p.x, 0.35, p.z), hoe.id === "comum" ? 0x8b5a2b : hoe.bladeColor, 10);
      refreshPlotAppearance(p);
      return true;
    };
    tillOne(plot);
    let extra = 0;
    if (hoe.aoeTill || hoe.id === "fogo") {
      const radius = hoe.aoeTill ? 4.6 : 3.5;
      const neighbors = plots
        .filter((o) => o !== plot && o.unlocked && o.stage === "raw" && Math.hypot(o.x - plot.x, o.z - plot.z) < radius)
        .sort((a, b) => Math.hypot(a.x - plot.x, a.z - plot.z) - Math.hypot(b.x - plot.x, b.z - plot.z));
      const limit = hoe.aoeTill ? 8 : 1;
      neighbors.slice(0, limit).forEach((n) => {
        if (tillOne(n)) extra++;
      });
    }
    spawnFloatingText(new THREE.Vector3(plot.x, 0.3, plot.z), extra > 0 ? `⛏️ Arou +${extra + 1}!` : "⛏️ Arado!", "#eab308");
    if (extra > 0 && !silentToast) {
      showToast(hoe.emoji, hoe.name.toUpperCase(), `Arou +${extra} canteiro(s) extra com um golpe só!`);
    }
    state.swingTimer = 0.25;
    sfx.play("dig");
    saveGame();
    return "till";
  }

  if (plot.stage === "tilled") {
    if (lockedAction && lockedAction !== "plant") return null;
    if (!held || !held.seedCropId) {
      if (!lockedAction) {
        sfx.play("error");
        showToast("🌱", "SEGURE UMA SEMENTE!", "Selecione uma Semente 🌱 na Hotbar (1–9) ou compre no Inventário (I) / Cooperativa!");
      }
      return null;
    }
    const crop = CROPS[held.seedCropId];
    if (!removeItemFromInventory(held.id, 1, true)) {
      if (!lockedAction) {
        sfx.play("error");
        showToast("🌱", "SEM SEMENTES", `Compre mais Semente de ${crop.name} no Inventário (I) ou na Cooperativa!`);
      }
      return null;
    }
    plot.stage = "growing";
    plot.cropId = crop.id;
    plot.growth = 0;
    plot.fertilized = false;
    plot.popTimer = 0.28;
    const iceHoe = state.ownedHoes.includes("gelo") && state.activeHoe === "gelo";
    plot.waterTimer = state.upgrades.autoWaterLevel >= 1 || iceHoe ? 16 : 0;
    state.swingTimer = 0.22;
    sfx.play("plant");
    spawnParticles(new THREE.Vector3(plot.x, 0.45, plot.z), crop.color, 10);
    spawnFloatingText(new THREE.Vector3(plot.x, 0.4, plot.z), `🌱 ${crop.emoji} Plantado!`, "#4ade80");
    refreshPlotAppearance(plot);
    updateHUD();
    saveGame();
    return "plant";
  }

  if (plot.stage === "growing") {
    if (held && (held.id === "adubo_npk" || held.id === "super_adubo")) {
      applyKaioFertilizer(plot);
      return "fert";
    }
    if (plot.waterTimer <= 0) {
      if (lockedAction && lockedAction !== "water") return null;
      if (!held || held.id !== "regador") {
        if (!lockedAction) {
          sfx.play("error");
          showToast("🚿", "SEGURE O REGADOR!", "Selecione o Regador 🚿 na Hotbar (1–9) para molhar o canteiro!");
        }
        return null;
      }
      if (state.water <= 0) {
        if (!lockedAction) {
          sfx.play("error");
          showToast("💧", "REGADOR VAZIO", "Vá até o Poço d'Água à esquerda para encher!");
        }
        return null;
      }
      state.water -= 1;
      waterPlot(plot, false);
      let wateredCount = 1;
      if (state.upgrades.canLevel >= 3) {
        plots
          .filter(
            (other) =>
              other !== plot &&
              other.unlocked &&
              other.stage === "growing" &&
              other.waterTimer <= 0 &&
              Math.hypot(other.x - plot.x, other.z - plot.z) < 3.6
          )
          .slice(0, state.upgrades.canLevel >= 4 ? 2 : 1)
          .forEach((nb) => {
            if (waterPlot(nb, true)) wateredCount++;
          });
      }
      spawnFloatingText(
        new THREE.Vector3(plot.x, 0.5, plot.z),
        wateredCount > 1 ? `💦 Regou ${wateredCount}!` : "💦 Regado!",
        "#38bdf8"
      );
      if (typeof trackGoalProgress === "function") trackGoalProgress("water", wateredCount);
      state.swingTimer = 0.28;
      sfx.play("water");
      updateHUD();
      saveGame();
      return "water";
    } else if (!lockedAction && (state.kaioAdubo > 0 || state.kaioSuperAdubo > 0)) {
      applyKaioFertilizer(plot);
      return "fert";
    }
    return null;
  }

  if (plot.stage === "ready") {
    if (lockedAction && lockedAction !== "harvest") return null;
    const harvestSingle = (p) => {
      const crop = CROPS[p.cropId];
      const doubleChance = getDoubleHarvestChance() + (p.fertilized ? 0.35 : 0);
      let bonus = Math.random() < doubleChance ? 2 : 1;
      if (crop.id === "alface_guloso" && Math.random() < 0.65) bonus += 1;
      if (!addItemToInventory(crop.id, bonus)) {
        showToast("🎒", "MOCHILA LOTADA!", "45/45 slots ocupados! Organize o Inventário (I) para guardar mais colheitas.");
      }
      p.stage = "tilled";
      p.cropId = null;
      p.growth = 0;
      p.waterTimer = 0;
      p.fertilized = false;
      p.popTimer = 0.24;
      spawnParticles(new THREE.Vector3(p.x, 0.65, p.z), crop.color, 14);
      if (crop.id === "alface_dourado") {
        spawnParticles(new THREE.Vector3(p.x, 1.0, p.z), 0xfacc15, 18);
        state.reputation += 1;
      }
      spawnFloatingText(new THREE.Vector3(p.x, 0.65, p.z), `+${bonus} ${crop.emoji}`, "#facc15");
      refreshPlotAppearance(p);
      return { crop, bonus };
    };

    const mainRes = harvestSingle(plot);
    let totalCount = mainRes.bonus;
    let plotsHarvested = 1;
    // Colheita em Cesta Rápida: já colhe canteiros maduros vizinhos ao alcance do braço!
    const sweepLimit = state.activeHoe === "diamante" ? 4 : 2;
    plots
      .filter((o) => o !== plot && o.unlocked && o.stage === "ready" && Math.hypot(o.x - plot.x, o.z - plot.z) <= 3.35)
      .sort((a, b) => Math.hypot(a.x - plot.x, a.z - plot.z) - Math.hypot(b.x - plot.x, b.z - plot.z))
      .slice(0, sweepLimit)
      .forEach((nb) => {
        const r = harvestSingle(nb);
        totalCount += r.bonus;
        plotsHarvested++;
      });

    state.swingTimer = 0.25;
    sfx.play(mainRes.crop.id === "alface_dourado" ? "upgrade" : "harvest");
    if (!silentToast) {
      showToast(
        mainRes.crop.emoji,
        plotsHarvested > 1
          ? `COLHEITA RÁPIDA (${plotsHarvested} CANTEIROS)!`
          : mainRes.crop.id === "alface_dourado"
            ? "✨ ALFACE DOURADO RARO!"
            : "COLHEITA FRESCA",
        `+${totalCount} item(ns) direto na cesta!`
      );
    }
    if (typeof trackGoalProgress === "function") trackGoalProgress("harvest", plotsHarvested);
    updateHUD();
    saveGame();
    return "harvest";
  }
  return null;
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

const _eggGeoShared = new THREE.SphereGeometry(0.11, 10, 8);
const _eggMatShared = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.35 });

const _pelletGeoShared = new THREE.SphereGeometry(0.055, 6, 6);
const _pelletMatShared = new THREE.MeshBasicMaterial({ color: 0xfef08a });
let shotgunLastFireMs = 0;

function cancelShotgunReload() {
  state.shotgunReloadPhase = "idle";
  state.shotgunReloadTimer = 0;
  state.shotgunReloadQueue = 0;
}

function startShotgunReload() {
  if (state.mode !== "playing" || state.isSleeping) return false;
  const held = typeof getHeldItem === "function" ? getHeldItem() : null;
  if (!held || held.id !== "escopeta") return false;
  if (state.shotgunReloadPhase !== "idle") return true;

  if (state.shotgunMag >= SHOTGUN_MAG_SIZE) {
    return false;
  }
  const reserve = getItemCount("bala_escopeta");
  if (reserve <= 0) {
    sfx.play("empty_click");
    showToast("🔴", "SEM BALAS NA MOCHILA!", "Compre Balas de Escopeta na Loja da Estação CLP!");
    return true;
  }

  const needed = Math.min(SHOTGUN_MAG_SIZE - state.shotgunMag, reserve);
  state.shotgunReloadPhase = "loading";
  state.shotgunReloadQueue = needed;
  state.shotgunReloadTimer = 0.42;
  sfx.play("phone_tap");
  updateHUD();
  return true;
}

function fireShotgun() {
  if (state.mode !== "playing" || state.isSleeping) return false;
  const held = typeof getHeldItem === "function" ? getHeldItem() : null;
  if (!held || held.id !== "escopeta") return false;

  const nowMs = performance.now();
  if (nowMs - shotgunLastFireMs < 580) return true;

  // Permite interromper recarga no meio se já houver pelo menos 1 cartucho na arma!
  if (state.shotgunReloadPhase !== "idle") {
    if (state.shotgunMag > 0) {
      cancelShotgunReload();
    } else {
      return true;
    }
  }

  if (state.shotgunMag <= 0) {
    shotgunLastFireMs = nowMs - 260;
    sfx.play("empty_click");
    if (getItemCount("bala_escopeta") > 0) {
      showToast("🔫", "ESCOPETA DESCARREGADA!", "Aperte R para recarregar os cartuchos!");
    } else {
      showToast("🔴", "SEM BALAS!", "Compre Balas de Escopeta na Loja da Estação CLP!");
    }
    return true;
  }

  state.shotgunMag = Math.max(0, state.shotgunMag - 1);
  shotgunLastFireMs = nowMs;
  state.shotgunRecoilTimer = 0.24;
  state.shotgunPumpTimer = 0.36;

  // Direção base do tiro (mira 1ª pessoa ou frente do personagem em 3ª pessoa)
  let baseDirX, baseDirY, baseDirZ;
  if (state.firstPerson) {
    baseDirX = -Math.sin(state.camYaw) * Math.cos(state.fpPitch);
    baseDirY = Math.sin(state.fpPitch);
    baseDirZ = -Math.cos(state.camYaw) * Math.cos(state.fpPitch);
  } else {
    baseDirX = Math.sin(player.facingYaw);
    baseDirY = 0.02;
    baseDirZ = Math.cos(player.facingYaw);
  }
  const bLen = Math.hypot(baseDirX, baseDirY, baseDirZ) || 1;
  baseDirX /= bLen;
  baseDirY /= bLen;
  baseDirZ /= bLen;

  const muzzleY = player.pos.y + (state.firstPerson ? 2.02 : 1.48);
  const muzzlePos = new THREE.Vector3(
    player.pos.x + baseDirX * 1.08,
    muzzleY + baseDirY * 0.65,
    player.pos.z + baseDirZ * 1.08
  );

  // Dispara 6 chumbos em cone de dispersão realista!
  const pelletSpeed = 48.0;
  for (let p = 0; p < 6; p++) {
    const spreadH = (Math.random() - 0.5) * 0.16;
    const spreadV = (Math.random() - 0.5) * 0.11;
    const rightX = -baseDirZ;
    const rightZ = baseDirX;
    let dx = baseDirX + rightX * spreadH;
    let dy = baseDirY + spreadV;
    let dz = baseDirZ + rightZ * spreadH;
    const dl = Math.hypot(dx, dy, dz) || 1;
    dx /= dl;
    dy /= dl;
    dz /= dl;

    const mesh = new THREE.Mesh(_pelletGeoShared, _pelletMatShared);
    mesh.position.copy(muzzlePos);
    scene.add(mesh);

    shotgunPellets.push({
      mesh,
      vel: new THREE.Vector3(dx * pelletSpeed, dy * pelletSpeed, dz * pelletSpeed),
      life: 0.55,
      location: state.location,
      damage: 11,
    });
  }

  // Flash de boca + fumaça + recuo leve na câmera!
  spawnParticles(muzzlePos, 0xfacc15, 10);
  spawnParticles(muzzlePos, 0xf97316, 8);
  spawnParticles(muzzlePos, 0xcbd5e1, 8);
  if (typeof camShakeTimer === "number") {
    camShakeTimer = Math.max(camShakeTimer, 0.2);
    camShakeIntensity = Math.max(camShakeIntensity || 0, 0.32);
  }
  sfx.play("shotgun");
  updateHUD();
  saveGame();
  return true;
}

function throwHeldEgg() {
  if (state.mode !== "playing" || state.isSleeping) return false;
  const held = typeof getHeldItem === "function" ? getHeldItem() : null;
  if (!held || held.id !== "ovo_caipira") return false;
  if (!removeItemFromInventory("ovo_caipira", 1, true)) return false;

  const mesh = new THREE.Mesh(_eggGeoShared, _eggMatShared);
  mesh.scale.set(0.84, 1.2, 0.84);
  mesh.castShadow = true;

  let dirX, dirY, dirZ;
  if (state.firstPerson) {
    const pitch = state.fpPitch + 0.12;
    dirX = -Math.sin(state.camYaw) * Math.cos(pitch);
    dirY = Math.sin(pitch);
    dirZ = -Math.cos(state.camYaw) * Math.cos(pitch);
  } else {
    dirX = Math.sin(player.facingYaw);
    dirY = 0.28;
    dirZ = Math.cos(player.facingYaw);
  }
  const len = Math.hypot(dirX, dirY, dirZ) || 1;
  dirX /= len;
  dirY /= len;
  dirZ /= len;

  const startY = player.pos.y + (state.firstPerson ? 2.0 : 1.55);
  mesh.position.set(player.pos.x + dirX * 0.65, startY, player.pos.z + dirZ * 0.65);
  scene.add(mesh);

  const speed = 19.5;
  thrownEggs.push({
    mesh,
    vel: new THREE.Vector3(dirX * speed, dirY * speed + (state.firstPerson ? 1.8 : 2.6), dirZ * speed),
    life: 4.0,
    location: state.location,
  });

  state.swingTimer = 0.24;
  sfx.play("throw");
  updateHUD();
  saveGame();
  return true;
}

function triggerContextAction() {
  if (state.isSleeping || state.mode !== "playing") return;
  const heldCtx = typeof getHeldItem === "function" ? getHeldItem() : null;
  const ctx = findCurrentContext();
  if (!ctx) {
    if (heldCtx && heldCtx.id === "escopeta") {
      fireShotgun();
      return;
    }
    if (state.location === "yard" && state.jaguar.active) {
      attackJaguarWithHoe();
    } else if (state.location === "yard" && alligatorEntity && alligatorEntity.alive && distXZ(player.pos, alligatorEntity.mesh.position) < 4.4) {
      attackAlligatorWithHoe();
    } else if (useHeldConsumable()) {
      return;
    } else if (state.equippedTool === "hoe") {
      state.swingTimer = 0.28;
      sfx.play("dig");
    }
    return;
  }
  // Sobre canteiro não-maduro segurando Escopeta, Celular, Ovo, Vaselina ou Comida, prioriza usar o item na mão!
  if (
    ctx.type === "plot" &&
    ctx.plot &&
    ctx.plot.stage !== "ready" &&
    heldCtx &&
    (heldCtx.id === "escopeta" || heldCtx.id === "celular" || heldCtx.id === "ovo_caipira" || heldCtx.id === "vaselina" || heldCtx.foodEffect)
  ) {
    if (useHeldConsumable()) return;
  }
  if (ctx.type === "fight_jaguar") {
    const hJag = typeof getHeldItem === "function" ? getHeldItem() : null;
    if (hJag && hJag.id === "escopeta") fireShotgun();
    else attackJaguarWithHoe();
    return;
  }
  if (ctx.type === "fight_alligator") {
    const hGat = typeof getHeldItem === "function" ? getHeldItem() : null;
    if (hGat && hGat.id === "escopeta") fireShotgun();
    else attackAlligatorWithHoe();
    return;
  }
  if (ctx.type === "well") {
    if (blockAfterWorkHours()) return;
    state.water = getMaxWater();
    state.swingTimer = 0.25;
    sfx.play("refill");
    spawnParticles(new THREE.Vector3(WELL_POS.x, 1.3, WELL_POS.z), 0x38bdf8, 16);
    showToast("💧", "REGADOR CHEIO", `Água recarregada (${state.water}/${getMaxWater()}).`);
    updateHUD();
  } else if (ctx.type === "coop") {
    if (blockAfterWorkHours()) return;
    const heldCoop = getHeldItem();
    if (heldCoop && heldCoop.id === "milho") {
      breedChicken();
      return;
    }
    if (state.coopEggs <= 0) {
      showToast("🐔", "GALINHEIRO", "As galinhas já botaram hoje! Segure 🌽 Milho e aperte E (ou B) para reproduzir.");
      return;
    }
    const eggs = state.coopEggs;
    if (!addItemToInventory("ovo_caipira", eggs)) {
      showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) para recolher ovos!");
      return;
    }
    if (typeof trackGoalProgress === "function") trackGoalProgress("animal", 1);
    state.coopEggs = 0;
    syncCoopEggsVisual();
    sfx.play("harvest");
    spawnParticles(new THREE.Vector3(COOP_POS.x, 0.8, COOP_POS.z), 0xfacc15, 14);
    showToast("🥚", "OVOS CAIPIRAS", `Recolheu +${eggs} Ovo(s) Caipira(s) no galinheiro!`);
    updateHUD();
    saveGame();
  } else if (ctx.type === "chest") {
    openChestModal();
  } else if (ctx.type === "dog") {
    sfx.play("bark");
    spawnParticles(dogOrelha.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 10);
    spawnFloatingText(dogOrelha.mesh.position, "🐕 ❤️", "#facc15");
    updateHUD();
    saveGame();
  } else if (ctx.type === "tame_jaguar") {
    tameJaguar();
  } else if (ctx.type === "tamed_jaguar_idle") {
    const tj = getActiveTamedJaguar();
    if (tj) {
      sfx.play("bark");
      spawnParticles(tj.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0x22c55e, 14);
    }
    if (state.tamedJaguarHp < (state.tamedJaguarMaxHp || 120)) {
      state.tamedJaguarHp = Math.min(state.tamedJaguarMaxHp || 120, state.tamedJaguarHp + 15);
      updateHUD();
      showToast("❤️", "CARINHO NA ONÇA!", `Onça ronronou e recuperou +15 HP (${Math.round(state.tamedJaguarHp)}/${state.tamedJaguarMaxHp || 120})! Aperte R p/ montar.`);
    } else {
      showToast("🐆", "ONÇA DOMADA!", "Aperte R para montar na Onça e F em cima dela p/ ir à Estação!");
    }
  } else if (ctx.type === "tamed_jaguar_down") {
    state.tamedJaguarRecoverTimer = Math.max(0, state.tamedJaguarRecoverTimer - 5);
    sfx.play("bark");
    if (tamedJaguarEntity) {
      spawnParticles(tamedJaguarEntity.mesh.position.clone().add(new THREE.Vector3(0, 0.7, 0)), 0x4ade80, 10);
    }
    updateHUD();
    showToast("🩹", "CUIDANDO DA ONÇA", `Ela se mexeu devagar (-5s p/ levantar: ${Math.ceil(state.tamedJaguarRecoverTimer)}s).`);
  } else if (ctx.type === "mounted_jaguar") {
    fastTravelJaguarToStation();
  } else if (ctx.type === "talk_jessy") {
    openNpcModal("jessy");
  } else if (ctx.type === "talk_marcelo_yard") {
    sfx.play("plant");
    showToast("👨‍🏫", "PROFESSOR MARCELO", `De plantão em Pau Arcado! Restam ${state.marceloDaysLeft} dia(s). Se a onça aparecer, eu dou jeito nela!`);
  } else if (ctx.type === "collect_animal") {
    const heldA = getHeldItem();
    const aInfo = ANIMAL_TYPES[ctx.ent.animal.type];
    if (heldA && heldA.id === aInfo.breedCrop) {
      breedLivestock(ctx.ent);
    } else {
      collectAnimalProduct(ctx.ent);
    }
  } else if (ctx.type === "pet_animal") {
    const heldP = getHeldItem();
    const pInfo = ANIMAL_TYPES[ctx.ent.animal.type];
    if (heldP && heldP.id === pInfo.breedCrop) {
      breedLivestock(ctx.ent);
      return;
    }
    sfx.play("bark");
    spawnParticles(ctx.ent.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0)), 0xfacc15, 10);
    const info = ANIMAL_TYPES[ctx.ent.animal.type];
    showToast(info.emoji, `${ctx.ent.animal.name.toUpperCase()} FELIZ!`, `${ctx.ent.animal.name} está bem alimentada e protegida no pasto!`);
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
    enterEtecInside(ctx.entry || "front");
  } else if (ctx.type === "exit_etec") {
    exitEtecInside(ctx.exitPoint || "front");
  } else if (ctx.type === "use_automation") {
    sfx.play("automation");
    spawnParticles(new THREE.Vector3(25.2, 1.9, -20.75), 0x38bdf8, 18);
    if (!state.automationDoneToday) {
      state.automationDoneToday = true;
      const boosted = boostAllGrowingPlots(0.35);
      state.insanity = Math.max(0, state.insanity - 10);
      spawnFloatingText(new THREE.Vector3(25.2, 1.8, -20.75), "🤖 CLP +35% HORTA!", "#38bdf8");
      showToast(
        "🤖",
        "SALA DE AUTOMAÇÃO ATIVADA!",
        `CLP calibrado! ${boosted} canteiro(s) avançaram +35% e irrigados • Insanidade -10%!`
      );
      updateHUD();
      saveGame();
    } else {
      showToast("🤖", "LABORATÓRIO DE AUTOMAÇÃO", "Braço robótico e esteira operando em ciclo ótimo! Volte amanhã p/ novo boost.");
    }
  } else if (ctx.type === "shoot_ball") {
    if (etecBall) {
      const bPos = etecBall.mesh.position;
      const dx = ETEC_HOOP_RIM.x - bPos.x;
      const dz = ETEC_HOOP_RIM.z - bPos.z;
      const dist = Math.hypot(dx, dz);
      const g = 18.5;
      const flightT = THREE.MathUtils.clamp(0.68 + dist * 0.042, 0.72, 1.24);
      player.facingYaw = Math.atan2(dx, dz);
      etecBall.vx = dx / flightT;
      etecBall.vz = dz / flightT;
      etecBall.vy = (ETEC_HOOP_RIM.y - bPos.y + 0.5 * g * flightT * flightT) / flightT;
      state.swingTimer = 0.24;
      sfx.play("dig");
      spawnParticles(bPos.clone(), 0xf97316, 10);
    }
  } else if (ctx.type === "stove") {
    openCookModal();
  } else if (ctx.type === "chem_bench") {
    if (blockAfterWorkHours()) return;
    if (state.npkDoneToday) {
      showToast("🧪", "LABORATÓRIO DE QUÍMICA", "A síntese NPK já foi feita hoje! Volte amanhã.");
      return;
    }
    state.npkDoneToday = true;
    const boosted = boostAllGrowingPlots(0.45);
    sfx.play("upgrade");
    spawnParticles(CHEM_BENCH_POS.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x38bdf8, 18);
    showToast(
      "🧪",
      "SÍNTESE NPK NO LAB DE QUÍMICA!",
      `Reação química perfeita! ${boosted} canteiro(s) em Pau Arcado avançaram +45%!`
    );
    saveGame();
  } else if (ctx.type === "refeitorio_merenda") {
    const nowMs = performance.now();
    if (nowMs < refeitorioGrabCd) return;
    const menu = getTodayRefeitorioMenu(state.day);
    if (menu.closed || !menu.items.length) {
      sfx.play("error");
      showToast("🔒", "REFEITÓRIO FECHADO", "A escola e o refeitório funcionam de Segunda a Sexta!");
      return;
    }
    if ((state.merendaTakenToday || 0) >= 2) {
      sfx.play("error");
      showToast("🍽️", "MERENDA ESGOTADA HOJE", "A tia da merenda só libera 2 porções por dia! Volte amanhã.");
      return;
    }
    for (let i = 0; i < menu.items.length; i++) {
      if (!canAddItemToInventory(menu.items[i], 1)) {
        sfx.play("error");
        showToast("🎒", "MOCHILA LOTADA!", "Libere espaço no Inventário (I) para pegar a merenda!");
        return;
      }
    }
    refeitorioGrabCd = nowMs + 850;
    state.merendaTakenToday = (state.merendaTakenToday || 0) + 1;
    menu.items.forEach((id) => addItemToInventory(id, 1));
    equipItemToHotbar(menu.items[0]);
    state.swingTimer = 0.24;
    sfx.play("harvest");
    spawnParticles(ETEC_REFEITORIO_POS.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xfacc15, 14);
    spawnFloatingText(ETEC_REFEITORIO_POS, `🍽️ Pegou Merenda!`, "#facc15");
    updateHUD();
    saveGame();
  } else if (ctx.type === "drink_fountain") {
    const fPos = ctx.pos || ETEC_FOUNTAIN_L_POS;
    state.playerHp = Math.min(state.maxHp, state.playerHp + 15);
    state.insanity = Math.max(0, state.insanity - 5);
    state.isCrazy = state.insanity >= 100;
    state.energyTimer = Math.max(state.energyTimer || 0, 20);
    sfx.play("water");
    spawnParticles(fPos.clone().add(new THREE.Vector3(0, 1.15, -0.15)), 0x38bdf8, 16);
    spawnFloatingText(fPos, "💧 +15 HP • -5% Insanidade", "#38bdf8");
    updateHUD();
    saveGame();
  } else if (ctx.type === "nurse_care") {
    state.playerHp = state.maxHp;
    state.insanity = Math.max(0, state.insanity - 5);
    state.isCrazy = state.insanity >= 100;
    sfx.play("upgrade");
    spawnParticles(NURSE_BED_POS.clone().add(new THREE.Vector3(0, 1.1, 0)), 0x10b981, 16);
    spawnFloatingText(NURSE_BED_POS, "🏥 Vida Cheia!", "#4ade80");
    updateHUD();
    saveGame();
  } else if (ctx.type === "pastel") {
    if (state.money < 24) {
      sfx.play("error");
      showToast("💸", "SEM TROCO", "Precisa de R$ 24,00 para o Pastel + Caldo de Cana!");
      return;
    }
    state.money -= 24;
    state.energyTimer = 90;
    sfx.play("upgrade");
    showToast("🥟", "PASTEL COM CALDO DE CANA!", "+35% Velocidade de caminhada por 90s!");
    updateHUD();
    saveGame();
  } else if (ctx.type === "station_shop") {
    openStationShopModal();
  } else if (ctx.type === "npc_knocked") {
    const hrsLeft = Math.max(1, Math.ceil((state.knockedNpcs[ctx.npcId] - getCurrentAbsMinutes()) / 60));
    sfx.play("error");
    showToast("👅", "NPC DERRUBADO!", `${ctx.npc.name} foi lambido(a) pelo Lambi Homem e fica no chão por ${hrsLeft}h!`);
  } else if (ctx.type === "term_sell") {
    openSellModal();
  } else if (ctx.type === "npc") {
    openNpcModal(ctx.npcId);
  } else if (ctx.type === "door") {
    enterRoom();
  } else if (ctx.type === "exit_room") {
    exitRoom();
  } else if (ctx.type === "bed") {
    startSleepTransition(true);
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
    showToast("🎒", "ETEC CAMPO LIMPO PAULISTA", "Cadernos em dia! Pegue o 402 (ou a Onça domada!) e o trem 7-Rubi até Botujuru.");
  } else if (ctx.type === "coffee") {
    state.energyTimer = Math.max(state.energyTimer, 35);
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(COFFEE_POS.x, 1.25, COFFEE_POS.z), 0xd97706, 12);
    showToast("☕", "CAFÉ COADO DE PAU ARCADO!", "Quentinho na cozinha! +32% Velocidade por 35s!");
    updateHUD();
  } else if (ctx.type === "toilet") {
    sfx.play("water");
    showToast("🚽", "BANHEIRO DA CASA", "Alívio garantido! Tudo limpinho no banheiro do sítio.");
  } else if (ctx.type === "secret_sw1") {
    state.basementStep = 1;
    sfx.play("dig");
    spawnParticles(new THREE.Vector3(7.55, 0.72, -7.85), 0xf97316, 10);
    showToast("⚙️", "*CLIQUE METÁLICO*", "Você apertou um pino oculto atrás da geladeira... Um barulho estranho ecoou no encanamento do banheiro!");
    saveGame();
  } else if (ctx.type === "secret_sw2") {
    state.basementStep = 2;
    state.basementUnlocked = true;
    if (secretTrapdoorMesh) secretTrapdoorMesh.visible = true;
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(9.1, 0.35, 7.1), 0x38bdf8, 18);
    showToast("🔧", "*ESTRONDOS SOB O PISO*", "O registro do ralo girou! Algo pesado deslizou no assoalho do quarto, atrás da cama...");
    saveGame();
  } else if (ctx.type === "secret_hatch") {
    enterBasement();
  } else if (ctx.type === "exit_basement") {
    exitBasement();
  } else if (ctx.type === "macho_clone" && ctx.clone) {
    state.machoSkin = ctx.clone.id;
    state.activeTitle = "Estudante ETEC";
    applyMachoSkin(ctx.clone.id);
    syncPlayerTitleSkin();
    sfx.play("upgrade");
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.6, 0)), ctx.clone.shirt, 20);
    showToast("🌀", `${ctx.clone.name.toUpperCase()} (${ctx.clone.sub})`, `"${ctx.clone.quote}" • Roupa equipada!`);
    updateHUD();
    saveGame();
  } else if (ctx.type === "plot" || ctx.type === "locked_plot") {
    return interactWithPlot(ctx.plot);
  }
  return null;
}

function advanceToNextDay() {
  const wasAtEtecToday = state.visitedEtecToday || state.location === "etec" || state.location === "etec_inside";
  const prevInsanity = state.insanity;

  state.day += 1;
  state.dayMinutes = 6.5 * 60;
  state.workEndNotifiedToday = false;
  state.isRainy = Math.random() < 0.35;
  state.playerHp = state.maxHp;
  state.jaguar.active = false;
  state.jaguar.hp = state.jaguar.maxHp;
  state.jaguar.spawnCooldown = 110;
  state.jaguarDefeated = false;
  state.jaguarDownTimer = 0;
  if (jaguarEntity) {
    jaguarEntity.mesh.visible = false;
    jaguarEntity.mesh.rotation.z = 0;
    jaguarEntity.mesh.position.y = 0;
  }
  state.tamedJaguarHp = state.tamedJaguarMaxHp || 120;
  state.tamedJaguarDown = false;
  state.tamedJaguarRecoverTimer = 0;
  state.ridingJaguar = false;
  if (tamedJaguarEntity) {
    tamedJaguarEntity.mesh.rotation.z = 0;
    tamedJaguarEntity.mesh.position.y = 0;
  }
  state.maluquinho.active = false;
  state.maluquinho.announced = false;
  if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;
  if (typeof resetDogOrelha === "function") resetDogOrelha();
  if (typeof resetAlligator === "function") resetAlligator();

  // Animais crescem, recuperam lã e produção diária
  let needAnimalRebuild = false;
  if (state.animals && state.animals.length > 0) {
    state.animals.forEach((a) => {
      if (a.alive) {
        if (a.isBaby) needAnimalRebuild = true;
        a.hasProduct = true;
        a.sheared = false;
        a.isBaby = false;
        a.inLove = false;
      }
    });
    if (needAnimalRebuild) {
      rebuildLivestockMeshes();
    } else if (typeof livestockEntities !== "undefined" && livestockEntities) {
      livestockEntities.forEach((ent) => {
        if (ent.readyHalo) ent.readyHalo.visible = true;
        if (ent.woolGroup) ent.woolGroup.visible = true;
        ent.mesh.scale.setScalar(1);
      });
    }
  }

  // Maldição do Lambi Homem expira após o dia seguinte à transformação; NPCs lambidos acordam após 24h
  if (state.isLambiHomem && state.day > (state.lambiUntilDay || 0)) {
    state.isLambiHomem = false;
    showToast("👕", "FIM DO LAMBI HOMEM", "Alyffer vestiu a camisa e voltou ao normal! Cuidado com 22:00 a cada 7 dias.");
  }
  if (state.knockedNpcs) {
    const curAbs = getCurrentAbsMinutes();
    Object.keys(state.knockedNpcs).forEach((id) => {
      if (state.knockedNpcs[id] <= curAbs) delete state.knockedNpcs[id];
    });
  }

  // Contrato do Marcelo Segurança
  if (state.marceloHired) {
    state.marceloDaysLeft = (state.marceloDaysLeft || 1) - 1;
    if (state.marceloDaysLeft <= 0) {
      state.marceloHired = false;
      state.marceloDaysLeft = 0;
      if (marceloYardEntity) marceloYardEntity.mesh.visible = false;
      showToast("🛡️", "CONTRATO DO MARCELO", "O contrato do Marcelo segurança terminou! Renove na ETECAMP.");
    }
  }
  if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;

  // Para a sanidade descer ele precisa ficar sem ir para a ETEC (cada dia longe reduz 25%)
  if (!wasAtEtecToday && state.insanity > 0) {
    state.insanity = Math.max(0, state.insanity - 25);
  }
  state.isCrazy = state.insanity >= 100;
  state.visitedEtecToday = false;

  // Se dormiu fora do sítio (ex: menu de pausa), acorda no quintal de Pau Arcado
  if (state.location !== "yard" && state.location !== "room") {
    state.location = "yard";
    player.pos.set(0, 0, -11.5);
    player.facingYaw = 0;
    state.camYaw = state.firstPerson ? Math.PI : 0.2;
    state.camPitch = 0.48;
    state.fpPitch = 0;
    state.camDist = 16.5;
    playerMesh.position.copy(player.pos);
    playerMesh.rotation.y = player.facingYaw;
  }

  state.npkDoneToday = false;
  state.automationDoneToday = false;
  state.goalScoredToday = false;
  state.merendaTakenToday = 0;
  state.chickenLove = 0;
  syncChickensToCount(state.chickenCount, 0);
  state.coopEggs = Math.min(6, Math.max(2, state.chickenCount - 1 + Math.floor(Math.random() * 2)));
  if (state.phone) {
    state.phone.postedFakeToday = false;
    state.phone.postedInstaToday = false;
    state.phone.unread = Math.min(9, (state.phone.unread || 0) + 1);
  }

  plots.forEach((p) => {
    if (p.unlocked && p.stage === "growing") {
      p.growth = Math.min(1, p.growth + (p.fertilized ? 0.36 : 0.22));
      p.waterTimer = Math.max(p.waterTimer, state.isRainy || state.upgrades.autoWaterLevel >= 1 ? 20 : 10);
      if (p.growth >= 1) p.stage = "ready";
      refreshPlotAppearance(p);
    }
  });
  setActiveSceneVisibility();
  rollDailyMarket();
  generateCityOrders();
  if (typeof generateDailyGoals === "function") generateDailyGoals();
  if (typeof syncRefeitorioMenuVisual === "function") syncRefeitorioMenuVisual();
  sfx.play("sleep");
  const hotCrop = CROPS[state.hotCropId];
  const cal = getCalendarInfo(state.day);
  const dateLabel = `${cal.weekdayShort}, ${String(cal.dayOfMonth).padStart(2, "0")}/${cal.monthShort}`;
  if (state.isRainy) {
    showDayBanner(`${dateLabel} • CHUVOSO 🌧️ • ÔNIBUS 402 PARADO! HORTA REGADA!`);
  } else {
    showDayBanner(`BOM DIA, MACHO! ${dateLabel} ☀️ • ${hotCrop.emoji} ${hotCrop.name} EM ALTA!`);
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

// Virada completa de dia quando o jogador passa da meia-noite (24:00) acordado!
function rolloverMidnightDay() {
  state.day += 1;
  state.workEndNotifiedToday = false;
  state.visitedEtecToday = state.location === "etec" || state.location === "etec_inside";
  state.npkDoneToday = false;
  state.automationDoneToday = false;
  state.goalScoredToday = false;
  state.merendaTakenToday = 0;
  state.chickenLove = 0;
  syncChickensToCount(state.chickenCount, 0);
  state.coopEggs = Math.min(6, Math.max(2, state.chickenCount - 1 + Math.floor(Math.random() * 2)));
  state.animals.forEach((a) => {
    if (!a.alive) return;
    a.productReady = true;
    a.bredToday = false;
    a.hp = ANIMAL_TYPES[a.type] ? ANIMAL_TYPES[a.type].maxHp : a.hp;
  });
  if (state.phone) {
    state.phone.postedFakeToday = false;
    state.phone.postedInstaToday = false;
  }
  state.isRainy = Math.random() < 0.25;
  rollDailyMarket();
  generateCityOrders();
  if (typeof generateDailyGoals === "function") generateDailyGoals();
  if (typeof syncRefeitorioMenuVisual === "function") syncRefeitorioMenuVisual();

  const cal = getCalendarInfo(state.day);
  if (state.location === "etec_inside" && !isEtecOpenDay(state.day)) {
    switchLocation("etec", new THREE.Vector3(0, 0.14, 15.0), 0);
    showToast("🏫", "FIM DE SEMANA!", `Virou ${cal.weekdayFull}: a ETEC fechou as salas até segunda!`);
  }
  const dateLabel = `${cal.weekdayShort}, ${String(cal.dayOfMonth).padStart(2, "0")}/${cal.monthShort}`;
  showDayBanner(`🌙 MEIA-NOITE! NOVO DIA: ${dateLabel}`);
  updateHUD();
  saveGame();
}
