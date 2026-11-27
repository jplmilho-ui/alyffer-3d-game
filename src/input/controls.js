// Input & Controls
const keys = {};
let touchActionHeld = false;
const holdActionState = { timer: 0, lockedMode: null };

function cycleSelectedSeed(dir) {
  if (typeof cycleHotbarSlot === "function") cycleHotbarSlot(dir);
}

window.addEventListener("keydown", (e) => {
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
    if (e.code === "Escape") {
      if (cmdBar && !cmdBar.classList.contains("hidden")) closeCommandBar();
      else if (phoneModal && !phoneModal.classList.contains("hidden")) closePhoneModal();
      else if (npcModal && !npcModal.classList.contains("hidden")) closeNpcModal();
    }
    return;
  }

  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    if (state.mode === "playing") e.preventDefault();
  }

  if (e.code === "F4") {
    e.preventDefault();
    if (state.mode === "playing" && !state.isSleeping) {
      toggleFirstPerson();
    }
    return;
  }

  if (state.mode === "playing" && (e.key === "/" || e.code === "Slash" || e.code === "NumpadDivide")) {
    e.preventDefault();
    openCommandBar();
    return;
  }

  if (e.code === "Escape") {
    if (cmdBar && !cmdBar.classList.contains("hidden")) {
      closeCommandBar();
      return;
    }
    if (chestModal && !chestModal.classList.contains("hidden")) {
      closeChestModal();
      return;
    }
    if (phoneModal && !phoneModal.classList.contains("hidden")) {
      closePhoneModal();
      return;
    }
    if (inventoryModal && !inventoryModal.classList.contains("hidden")) {
      closeInventoryModal();
      return;
    }
    if (stationShopModal && !stationShopModal.classList.contains("hidden")) {
      closeStationShopModal();
      return;
    }
    if (cookModal && !cookModal.classList.contains("hidden")) {
      closeCookModal();
      return;
    }
    if (!calendarModal.classList.contains("hidden")) {
      closeCalendarModal();
      return;
    }
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

  const modalToggles = {
    KeyI: [inventoryModal, openInventoryModal, closeInventoryModal],
    KeyT: [phoneModal, () => openPhoneModal("home"), closePhoneModal],
    KeyK: [calendarModal, openCalendarModal, closeCalendarModal],
    KeyG: [guideModal, openGuideModal, closeGuideModal],
    KeyL: [shopModal, openShopModal, closeShopModal],
    KeyO: [sellModal, openSellModal, closeSellModal],
  };
  if (modalToggles[e.code]) {
    const [el, openFn, closeFn] = modalToggles[e.code];
    if (el && !el.classList.contains("hidden")) {
      closeFn();
      return;
    }
    if (state.mode === "playing") {
      openFn();
      return;
    }
    return;
  }

  if (e.code === "KeyP" && (state.mode === "playing" || state.mode === "paused")) {
    togglePause();
    return;
  }

  if (
    inventoryModal &&
    !inventoryModal.classList.contains("hidden") &&
    /^Digit[1-9]$/.test(e.code) &&
    typeof invHoveredSlot === "number" &&
    invHoveredSlot >= 0 &&
    !invCursorItem
  ) {
    const hbIdx = Number(e.code.replace("Digit", "")) - 1;
    swapSlotsDirect(invHoveredSlot, hbIdx);
    return;
  }

  if (state.mode !== "playing") {
    return;
  }

  if (!keys[e.code]) {
    if (e.code === "Space") {
      triggerJump();
    } else if (e.code === "KeyE") {
      const actRes = triggerContextAction();
      holdActionState.lockedMode = typeof actRes === "string" ? actRes : null;
      holdActionState.timer = 0.24;
    } else if (e.code === "KeyB") {
      const ctx = findCurrentContext();
      if (ctx && (ctx.type === "collect_animal" || ctx.type === "pet_animal") && ctx.ent) {
        breedLivestock(ctx.ent);
      } else if (ctx && ctx.type === "coop") {
        breedChicken();
      } else {
        showToast("💕", "REPRODUZIR ANIMAIS", "Chegue perto de Vaca/Ovelha (🌾 Trigo), Porco (🥕 Cenoura) ou Galinheiro (🌽 Milho) e aperte B!");
      }
    } else if (e.code === "KeyZ") {
      drinkVaselina();
    } else if (e.code === "KeyF") {
      if (state.ridingJaguar) {
        fastTravelJaguarToStation();
      } else {
        const ctx = findCurrentContext();
        if (state.isLambiHomem && state.location === "etec_inside" && ctx && ctx.type === "npc" && ctx.npc) {
          lambiLickNpc(ctx.npc);
        } else if (ctx && ctx.type === "npc_knocked") {
          showToast("👅", "JÁ DERRUBADO!", `${ctx.npc.name} já foi lambido(a) e fica caído(a) por 1 dia.`);
        } else if (ctx && ctx.plot) {
          applyKaioFertilizer(ctx.plot);
        } else {
          showToast(
            state.isLambiHomem && state.location === "etec_inside" ? "👅" : "🧪",
            state.isLambiHomem && state.location === "etec_inside" ? "LAMBER ALUNOS/NPCS" : "ADUBO DO KAIO",
            state.isLambiHomem && state.location === "etec_inside"
              ? "Chegue perto de qualquer aluno ou NPC na ETECAMP e aperte F para lamber e derrubar!"
              : "Fique perto de um canteiro com planta crescendo e aperte F (ou F montado na Onça p/ ir à Estação)!"
          );
        }
      }
    } else if (e.code === "KeyR") {
      const heldRKey = typeof getHeldItem === "function" ? getHeldItem() : null;
      if (heldRKey && heldRKey.id === "escopeta" && typeof startShotgunReload === "function") {
        if (startShotgunReload()) return;
      }
      if (state.ridingJaguar) {
        dismountTamedJaguar();
      } else if (canMountTamedJaguar()) {
        mountTamedJaguar();
      } else {
        const nearTj = getActiveTamedJaguar();
        if (state.tamedJaguarDown && nearTj && nearTj.mesh.visible && distXZ(player.pos, nearTj.mesh.position) < 2.9) {
          showToast("💤", "ONÇA INATIVA!", `Ela apanhou muito e está deitada se recuperando (${Math.ceil(state.tamedJaguarRecoverTimer)}s).`);
        }
      }
    } else if (e.code === "KeyX") {
      if (state.location === "yard" && dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 3.5) {
        kickOrelha();
      } else if (state.location === "terminal" && state.maluquinho.active && maluquinhoEntity) {
        kickMaluquinho();
      }
    // 1ª/3ª pessoa agora na tecla F4
    } else if (e.code === "KeyM") {
      toggleMute();
    } else if (e.code === "KeyN") {
      gameSettings.minimapEnabled = !gameSettings.minimapEnabled;
      saveGameSettings();
      applyGraphicsSettings();
      if (typeof syncSettingsUI === "function") syncSettingsUI();
      if (typeof updateMinimap === "function") updateMinimap(1, true);
    } else if (e.code === "BracketLeft") {
      cycleHotbarSlot(-1);
    } else if (e.code === "BracketRight") {
      cycleHotbarSlot(1);
    } else if (/^Digit[1-9]$/.test(e.code)) {
      const idx = Number(e.code.replace("Digit", "")) - 1;
      selectHotbarSlot(idx);
    }
  }
  keys[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
  if (e.code === "KeyE" && !touchActionHeld) {
    holdActionState.lockedMode = null;
    holdActionState.timer = 0;
  }
});

// Cliques nos slots da Hotbar são gerenciados dinamicamente em renderHotbarUI() (inventory.js)

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

let fpHoverLastX = null;
let fpHoverLastY = null;
let fpEdgeTurnDir = 0;

// Olhar 360° infinito em 1ª Pessoa (Pointer Lock trava e esconde o mouse + fallback sem travar nas bordas!)
window.addEventListener("mousemove", (e) => {
  if (!state.firstPerson || state.mode !== "playing") {
    fpHoverLastX = null;
    fpHoverLastY = null;
    fpEdgeTurnDir = 0;
    return;
  }
  const sensMult = gameSettings.sensitivity || 1.0;
  if (document.pointerLockElement === renderer.domElement) {
    const mx = THREE.MathUtils.clamp(e.movementX || 0, -140, 140);
    const my = THREE.MathUtils.clamp(e.movementY || 0, -140, 140);
    state.camYaw -= mx * 0.0024 * sensMult;
    state.fpPitch = THREE.MathUtils.clamp(state.fpPitch - my * 0.0022 * sensMult, -1.22, 1.22);
    fpHoverLastX = null;
    fpHoverLastY = null;
    fpEdgeTurnDir = 0;
    return;
  }
  // Fallback livre caso Pointer Lock ainda não esteja ativo: usa movementX + rotação contínua nas bordas da tela!
  if (canvasPointers.size === 0) {
    const w = window.innerWidth || 1;
    const edgeZone = w * 0.14;
    if (e.clientX < edgeZone) fpEdgeTurnDir = -((edgeZone - e.clientX) / edgeZone);
    else if (e.clientX > w - edgeZone) fpEdgeTurnDir = (e.clientX - (w - edgeZone)) / edgeZone;
    else fpEdgeTurnDir = 0;

    let dx = 0;
    let dy = 0;
    if (typeof e.movementX === "number" && (e.movementX !== 0 || e.movementY !== 0)) {
      dx = THREE.MathUtils.clamp(e.movementX, -90, 90);
      dy = THREE.MathUtils.clamp(e.movementY, -90, 90);
    } else if (fpHoverLastX !== null && fpHoverLastY !== null) {
      dx = THREE.MathUtils.clamp(e.clientX - fpHoverLastX, -90, 90);
      dy = THREE.MathUtils.clamp(e.clientY - fpHoverLastY, -90, 90);
    }
    state.camYaw -= dx * 0.0036 * sensMult;
    state.fpPitch = THREE.MathUtils.clamp(state.fpPitch - dy * 0.0032 * sensMult, -1.22, 1.22);
    fpHoverLastX = e.clientX;
    fpHoverLastY = e.clientY;
  }
});

document.addEventListener("pointerlockchange", () => {
  fpHoverLastX = null;
  fpHoverLastY = null;
  fpEdgeTurnDir = 0;
  if (typeof syncPointerLockUI === "function") syncPointerLockUI();
});

window.addEventListener("blur", () => {
  fpHoverLastX = null;
  fpHoverLastY = null;
  fpEdgeTurnDir = 0;
});

// Garante travamento imediato do mouse (Pointer Lock) em clique/mousedown no canvas em 1ª pessoa!
renderer.domElement.addEventListener("mousedown", (e) => {
  if (state.firstPerson && state.mode === "playing" && document.pointerLockElement !== renderer.domElement) {
    requestFirstPersonPointerLock();
  }
});
renderer.domElement.addEventListener("click", () => {
  if (state.firstPerson && state.mode === "playing" && document.pointerLockElement !== renderer.domElement) {
    requestFirstPersonPointerLock();
  }
});

renderer.domElement.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) return;
  if (state.firstPerson && state.mode === "playing" && e.pointerType === "mouse") {
    if (document.pointerLockElement !== renderer.domElement) {
      requestFirstPersonPointerLock();
      return;
    }
    // Com Pointer Lock ativo em 1ª pessoa: clique direito joga ovo se estiver segurando; clique esquerdo age/ataca/usa!
    if (e.button === 2) {
      const heldR = typeof getHeldItem === "function" ? getHeldItem() : null;
      if (heldR && heldR.id === "ovo_caipira") throwHeldEgg();
      return;
    }
    if (e.button === 0) {
      const heldL = typeof getHeldItem === "function" ? getHeldItem() : null;
      if (heldL && heldL.id === "escopeta") {
        fireShotgun();
        return;
      }
      if (heldL && heldL.id === "ovo_caipira") {
        throwHeldEgg();
        return;
      }
      if (heldL && heldL.id === "celular") {
        openPhoneModal("home");
        return;
      }
      if (state.location === "yard" && state.jaguar.active && state.equippedTool === "hoe") {
        attackJaguarWithHoe();
        return;
      }
      if (state.location === "yard" && alligatorEntity && alligatorEntity.alive && state.equippedTool === "hoe" && distXZ(player.pos, alligatorEntity.mesh.position) < 4.4) {
        attackAlligatorWithHoe();
        return;
      }
      if (state.location === "yard") {
        pointerNDC.set(0, 0);
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObjects(plotHitMeshes, false);
        if (hits.length > 0) {
          const plot = plots[hits[0].object.userData.plotIndex];
          if (plot && Math.hypot(player.pos.x - plot.x, player.pos.z - plot.z) <= 4.0) {
            interactWithPlot(plot);
            return;
          }
        }
      }
      triggerContextAction();
    }
    return;
  }
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
    const sensMult = gameSettings.sensitivity || 1.0;
    const sens = (e.pointerType === "touch" ? 0.0082 : 0.0065) * sensMult;
    state.camYaw -= dx * sens;
    if (state.firstPerson) {
      state.fpPitch = THREE.MathUtils.clamp(state.fpPitch - dy * 0.0048 * sensMult, -0.85, 0.85);
    } else {
      state.camPitch = THREE.MathUtils.clamp(state.camPitch + dy * 0.0052 * sensMult, 0.22, 1.08);
    }
  }
});

function handleCanvasPointerEnd(e, isCancel) {
  if (!canvasPointers.has(e.pointerId)) return;
  const wasRightTap =
    !isCancel &&
    e.pointerId === orbitPointerId &&
    canvasPointers.size === 1 &&
    e.pointerType === "mouse" &&
    orbitButton === 2 &&
    !orbitMoved &&
    !orbitHadPinch &&
    state.mode === "playing";

  const wasLeftTapAny =
    !isCancel &&
    e.pointerId === orbitPointerId &&
    canvasPointers.size === 1 &&
    (e.pointerType !== "mouse" || orbitButton === 0) &&
    !orbitMoved &&
    !orbitHadPinch &&
    state.mode === "playing";

  const wasTap = wasLeftTapAny && state.location === "yard";

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

  if (wasRightTap) {
    const heldR = typeof getHeldItem === "function" ? getHeldItem() : null;
    if (heldR && heldR.id === "ovo_caipira") {
      throwHeldEgg();
      return;
    }
    if (heldR && heldR.id === "escopeta") {
      fireShotgun();
      return;
    }
  }

  if (wasLeftTapAny) {
    const heldAny = typeof getHeldItem === "function" ? getHeldItem() : null;
    if (heldAny && heldAny.id === "escopeta") {
      fireShotgun();
      return;
    }
  }

  if (wasTap) {
    if (state.jaguar.active && state.equippedTool === "hoe") {
      attackJaguarWithHoe();
      return;
    }
    if (alligatorEntity && alligatorEntity.alive && state.equippedTool === "hoe" && distXZ(player.pos, alligatorEntity.mesh.position) < 4.4) {
      attackAlligatorWithHoe();
      return;
    }
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
    if (state.mode !== "playing") return;
    state.camDist = THREE.MathUtils.clamp(state.camDist + e.deltaY * 0.012, 6.5, 26);
  },
  { passive: true }
);

// Virtual Analog Joystick & Touch Action Controls
const joystickBase = document.getElementById("joystickBase");
const joystickKnob = document.getElementById("joystickKnob");
const touchActionBtn = document.getElementById("touchAction");
const touchActionEmoji = document.getElementById("touchActionEmoji");
const touchJumpBtn = document.getElementById("touchJump");
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
    touchActionHeld = true;
    if (state.mode === "playing") {
      const actRes = triggerContextAction();
      holdActionState.lockedMode = typeof actRes === "string" ? actRes : null;
      holdActionState.timer = 0.24;
    }
  });
  const endTouchAction = () => {
    touchActionHeld = false;
    if (!keys["KeyE"]) {
      holdActionState.lockedMode = null;
      holdActionState.timer = 0;
    }
  };
  touchActionBtn.addEventListener("pointerup", endTouchAction);
  touchActionBtn.addEventListener("pointercancel", endTouchAction);
  touchActionBtn.addEventListener("pointerleave", endTouchAction);
}

if (touchJumpBtn) {
  touchJumpBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.mode === "playing") triggerJump();
  });
}

function clearActiveInputs() {
  canvasPointers.clear();
  orbitPointerId = null;
  lastPinchDist = 0;
  touchActionHeld = false;
  holdActionState.lockedMode = null;
  holdActionState.timer = 0;
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
  closeAllModals();
  if (deathModal) deathModal.classList.add("hidden");
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
    if (typeof exitFirstPersonPointerLock === "function") exitFirstPersonPointerLock();
    clearActiveInputs();
    state.mode = "paused";
    if (typeof syncSettingsUI === "function") syncSettingsUI();
    pauseScreen.classList.remove("hidden");
  } else if (state.mode === "paused") {
    state.mode = "playing";
    pauseScreen.classList.add("hidden");
  }
}

function syncMuteButtonUI() {
  if (muteBtn) muteBtn.textContent = sfx.muted ? "🔇" : "🔊";
}

function toggleMute() {
  sfx.setMuted(!sfx.muted);
  syncMuteButtonUI();
}
syncMuteButtonUI();

startBtn.addEventListener("click", enterFarm);
resetSaveBtn.addEventListener("click", () => {
  resetToNewFarm();
  enterFarm();
});
resumeBtn.addEventListener("click", togglePause);
sleepPauseBtn.addEventListener("click", () => {
  pauseScreen.classList.add("hidden");
  startSleepTransition(false);
});
restartPauseBtn.addEventListener("click", () => {
  resetToNewFarm();
  pauseScreen.classList.add("hidden");
  state.mode = "playing";
  showDayBanner("SÍTIO REINICIADO! BOA COLHEITA, MACHO!");
});
pauseBtn.addEventListener("click", togglePause);
muteBtn.addEventListener("click", toggleMute);
// Troca de ferramentas é feita exclusivamente pelos slots da Hotbar (1–9)
if (vaselinaHudBtn) vaselinaHudBtn.addEventListener("click", drinkVaselina);
if (kickDogBtn) {
  kickDogBtn.addEventListener("click", () => {
    if (state.location === "terminal" && state.maluquinho.active) kickMaluquinho();
    else kickOrelha();
  });
}
if (quickBuySeedBtn) {
  quickBuySeedBtn.addEventListener("click", () => {
    const cropId = SEED_KEYS.includes(state.selectedCrop) ? state.selectedCrop : "alface_crespa";
    if (buySeedPack(cropId, 5)) {
      equipItemToHotbar(`seed_${cropId}`);
      updateHUD();
    }
  });
}
if (respawnBtn) respawnBtn.addEventListener("click", respawnPlayer);
// Alternância de 1ª pessoa controlada pela tecla F4
if (calendarHudBtn) calendarHudBtn.addEventListener("click", openCalendarModal);
if (calendarPill) calendarPill.addEventListener("click", openCalendarModal);
if (closeCalendarBtn) closeCalendarBtn.addEventListener("click", closeCalendarModal);
guideHudBtn.addEventListener("click", openGuideModal);
ordersHudBtn.addEventListener("click", openSellModal);
// Loja da Cooperativa Rural acessível indo até o balcão (E) ou tecla L
closeSellBtn.addEventListener("click", closeSellModal);
closeShopBtn.addEventListener("click", closeShopModal);
if (inventoryHudBtn) inventoryHudBtn.addEventListener("click", openInventoryModal);
if (closeInventoryBtn) closeInventoryBtn.addEventListener("click", closeInventoryModal);
if (closeStationShopBtn) closeStationShopBtn.addEventListener("click", closeStationShopModal);
closeNpcBtn.addEventListener("click", closeNpcModal);
closeGuideBtn.addEventListener("click", closeGuideModal);
if (closeCookBtn) closeCookBtn.addEventListener("click", closeCookModal);
if (typeof fpLockHint !== "undefined" && fpLockHint) {
  fpLockHint.addEventListener("click", () => requestFirstPersonPointerLock());
}
if (typeof invHelpBtn !== "undefined" && invHelpBtn && typeof invHelpPopover !== "undefined" && invHelpPopover) {
  invHelpBtn.addEventListener("click", () => {
    invHelpPopover.classList.toggle("hidden");
  });
}
if (closeChestBtn) closeChestBtn.addEventListener("click", closeChestModal);
if (cmdInput) {
  cmdInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      const val = cmdInput.value;
      closeCommandBar();
      executeGameCommand(val);
    } else if (ev.key === "Escape") {
      ev.preventDefault();
      closeCommandBar();
    }
  });
}
if (cmdRunBtn) {
  cmdRunBtn.addEventListener("click", () => {
    const val = cmdInput ? cmdInput.value : "";
    closeCommandBar();
    executeGameCommand(val);
  });
}
if (closePhoneBtn) closePhoneBtn.addEventListener("click", closePhoneModal);
if (phoneNavClose) phoneNavClose.addEventListener("click", closePhoneModal);
if (phoneBackBtn) phoneBackBtn.addEventListener("click", navigatePhoneBack);
if (phoneNavBack) phoneNavBack.addEventListener("click", navigatePhoneBack);
if (phoneNavHome) {
  phoneNavHome.addEventListener("click", () => {
    sfx.play("phone_tap");
    phoneCurrentApp = "home";
    activeZapChatId = null;
    renderPhoneApp();
  });
}

