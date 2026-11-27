// Update Day/Night Sky & Lighting (Zero-GC pre-allocated colors!)
const indoorBgColor = new THREE.Color(0x181420);
const rainySkyColor = new THREE.Color(0x526375);
const morningColor = new THREE.Color(0x9bd6ee);
const noonColor = new THREE.Color(0x7cc6f2);
const duskColor = new THREE.Color(0xe68a5c);
const nightColor = new THREE.Color(0x16213e);

function updateSkyAndTime(dt) {
  state.dayMinutes += dt * 4.5;
  if (state.day >= 7 && state.day % 7 === 0 && state.dayMinutes >= 22 * 60 && state.lambiTriggeredDay !== state.day) {
    activateLambiHomem();
  }
  if (state.dayMinutes >= 24 * 60) {
    state.dayMinutes -= 24 * 60;
    if (typeof rolloverMidnightDay === "function") rolloverMidnightDay();
    else {
      state.day += 1;
      state.workEndNotifiedToday = false;
    }
  }
  if (state.dayMinutes >= WORK_END_MINUTES && !state.workEndNotifiedToday) {
    state.workEndNotifiedToday = true;
    showDayBanner("🌙 19:00 — EXPEDIENTE ENCERRADO! DEPOIS DAS 19H O MACHO NÃO PODE TRABALHAR!");
    showToast("🌙", "HORA DE DESCANSAR", "Passou das 19:00! Vá dormir na cama quando quiser avançar o dia.");
  }
  syncBusModelsVisibility();
  if (typeof yardBusClock !== "undefined" && yardBusClock) yardBusClock.update("pauArcado");
  if (typeof termBusClock !== "undefined" && termBusClock) termBusClock.update("terminal");

  rainGroup.visible =
    gameSettings.rainEnabled &&
    state.isRainy &&
    state.location !== "room" &&
    state.location !== "etec_inside" &&
    state.location !== "basement";
  if (rainGroup.visible) {
    rainGroup.position.set(player.pos.x, 0, player.pos.z);
  }

  if (state.location === "room" || state.location === "etec_inside" || state.location === "basement") {
    scene.background = indoorBgColor;
    scene.fog.color.copy(indoorBgColor);
    sunLight.intensity = state.location === "basement" ? 0.35 : 0.68;
    hemiLight.intensity = state.location === "basement" ? 0.48 : 0.85;
    return;
  }

  const hour = state.dayMinutes / 60;
  const tDay = THREE.MathUtils.clamp((hour - 6) / 14, 0, 1);
  const sunArc = hour < 6 ? 0 : Math.sin(tDay * Math.PI);

  if (hour < 5) {
    skyColor.copy(nightColor);
  } else if (hour < 6) {
    skyColor.lerpColors(nightColor, morningColor, hour - 5);
  } else if (hour < 12) {
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
  // Sombra acompanha o jogador (alinhada em grade de 2m p/ evitar tremor) cobrindo Pasto Oeste/Leste inteiros!
  const snapX = Math.round(player.pos.x * 0.5) * 2;
  const snapZ = Math.round(player.pos.z * 0.5) * 2;
  sunLight.target.position.set(snapX, 0, snapZ);
  sunLight.position.set(snapX + Math.cos(tDay * Math.PI) * 38, 12 + sunArc * 36, snapZ + 20);
  hemiLight.intensity = 0.35 + sunArc * 0.55;

  const nightFactor =
    hour < 5 ? 1 : hour < 6 ? 1 - (hour - 5) : THREE.MathUtils.clamp((hour - 17) / 2.5, 0, 1);
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
  fight_jaguar: "⛏️",
  fight_alligator: "🐊",
  well: "💧",
  coop: "🥚",
  chest: "🧰",
  dog: "🐕",
  shop: "🛒",
  bus_to_term: "🚌",
  bus_to_yard: "🚌",
  train_to_etec: "🚆",
  train_to_term: "🚆",
  enter_etec: "🏫",
  exit_etec: "🚪",
  use_automation: "🤖",
  shoot_ball: "🏀",
  stove: "🍳",
  chem_bench: "🧪",
  nurse_care: "🏥",
  refeitorio_merenda: "🍽️",
  drink_fountain: "💧",
  pastel: "🥟",
  station_shop: "🚉",
  term_sell: "💰",
  npc: "💬",
  npc_knocked: "👅",
  door: "🏠",
  exit_room: "🚪",
  bed: "🛏️",
  manga: "📚",
  etec: "🎒",
  tame_jaguar: "❤️",
  tamed_jaguar_idle: "🐆",
  tamed_jaguar_down: "💤",
  mounted_jaguar: "🚉",
  talk_marcelo_yard: "👨‍🏫",
  talk_jessy: "🧮",
  collect_animal: "🥛",
  pet_animal: "🐄",
  coffee: "☕",
  toilet: "🚽",
  secret_sw1: "⚙️",
  secret_sw2: "🔧",
  secret_hatch: "🪜",
  exit_basement: "🪜",
  macho_clone: "🌀",
};

let airfryerHintCd = 0;
let footstepAccum = 0;
const _moveInputVec = new THREE.Vector2();
const _worldMoveVec = new THREE.Vector3();

function updateGame(dt) {
  state.animTime += dt;
  if (state.energyTimer > 0) {
    state.energyTimer = Math.max(0, state.energyTimer - dt);
  }
  if (state.vaselinaTimer > 0) {
    state.vaselinaTimer = Math.max(0, state.vaselinaTimer - dt);
  }
  if (airfryerHintCd > 0) {
    airfryerHintCd = Math.max(0, airfryerHintCd - dt);
  }
  if (state.location === "etec" || state.location === "etec_inside") {
    state.visitedEtecToday = true;
  }
  updateSkyAndTime(dt);

  if (keys["KeyQ"]) state.camYaw += 2.0 * dt;
  if (keys["KeyC"]) state.camYaw -= 2.0 * dt;
  if (
    state.firstPerson &&
    document.pointerLockElement !== renderer.domElement &&
    typeof fpEdgeTurnDir === "number" &&
    fpEdgeTurnDir !== 0
  ) {
    state.camYaw -= fpEdgeTurnDir * 2.2 * (gameSettings.sensitivity || 1.0) * dt;
  }

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

  _moveInputVec.set(moveX, moveZ);
  const inputLen = _moveInputVec.length();
  const isAirfryerStatic = state.activeTitle === "Airfryer";
  if (isAirfryerStatic && inputLen > 0.01 && airfryerHintCd <= 0) {
    airfryerHintCd = 4.5;
    showToast("🍟", "MODO AIRFRYER PARADA!", "Com o título Airfryer você fica parado! Clique no título ou aperte G para trocar.");
  }
  const inLakeWater = state.location === "yard" && player.pos.y < LAKE_WATER_Y - 0.12;
  const moving = !isAirfryerStatic && inputLen > 0.01;
  if (moving && player.grounded && !state.ridingJaguar) {
    footstepAccum += dt * (state.vaselinaTimer > 0 ? 1.55 : state.energyTimer > 0 ? 1.25 : 1.0);
    if (footstepAccum >= (inLakeWater ? 0.38 : 0.34)) {
      footstepAccum = 0;
      if (inLakeWater) {
        sfx.play("splash");
        spawnParticles(new THREE.Vector3(player.pos.x, LAKE_WATER_Y + 0.06, player.pos.z), 0xbae6fd, 5);
      } else {
        const isGrass = state.location === "yard" && player.pos.z < 36;
        sfx.play(isGrass ? "step_grass" : "step_hard");
      }
    }
  } else if (!moving) {
    footstepAccum = 0.24;
  }
  if (moving) {
    const analogScale = hasKb ? 1 : Math.min(1, inputLen);
    _moveInputVec.normalize();
    const sinY = Math.sin(state.camYaw);
    const cosY = Math.cos(state.camYaw);
    const worldMove = _worldMoveVec
      .set(
        _moveInputVec.x * cosY + _moveInputVec.y * sinY,
        0,
        -_moveInputVec.x * sinY + _moveInputVec.y * cosY
      )
      .normalize();

    const activeHoeData = HOES[state.activeHoe] || HOES.comum;
    const hoeSpeed = state.equippedTool === "hoe" ? (activeHoeData.speedBoost || 1.0) : 1.0;
    const baseSpeed = state.location === "room" ? 5.2 : 7.6;
    const vaselinaBoost = state.vaselinaTimer > 0 ? 1.65 : 1.0;
    const rideBoost = state.ridingJaguar ? 1.58 : 1.0;
    const boostMult = (state.isCrazy ? 1.25 : 1.0) * (state.energyTimer > 0 ? 1.32 : 1.0) * vaselinaBoost * hoeSpeed;
    const waterSlow = inLakeWater ? 0.68 : 1.0;
    const walkSpeed = baseSpeed * boostMult * rideBoost * waterSlow * analogScale;

    // Sem paredes invisíveis no sítio! Limites amplos no vale; as cercas reais têm colisor pulável com Espaço!
    let minX = -66.0;
    let maxX = 76.0;
    let minZ = -36.0;
    let maxZ = 49.0;
    let activeObstacles = obstacles;

    if (state.location === "room") {
      minX = -9.4;
      maxX = 9.4;
      minZ = -7.4;
      maxZ = 7.4;
      activeObstacles = interiorObstacles;
    } else if (state.location === "basement") {
      minX = -10.4;
      maxX = 10.4;
      minZ = -8.4;
      maxZ = 8.4;
      activeObstacles = basementObstacles;
    } else if (state.location === "terminal") {
      minX = -38.0;
      maxX = 21.2;
      minZ = -26.6;
      maxZ = 24.0;
      activeObstacles = terminalObstacles;
    } else if (state.location === "etec") {
      minX = -33.2;
      maxX = 33.2;
      minZ = -28.2;
      maxZ = 31.6;
      activeObstacles = etecObstacles;
    } else if (state.location === "etec_inside") {
      minX = -19.4;
      maxX = 19.4;
      minZ = -35.3;
      maxZ = 65.3;
      activeObstacles = etecInsideObstacles;
    }

    let finalX = THREE.MathUtils.clamp(player.pos.x + worldMove.x * walkSpeed * dt, minX, maxX);
    let finalZ = THREE.MathUtils.clamp(player.pos.z + worldMove.z * walkSpeed * dt, minZ, maxZ);

    // 2-pass AABB obstacle push-out (ignora cercas desativadas e permite pular por cima das cercas!)
    const canClearFence = player.jumpOffset >= 0.42;
    for (let iter = 0; iter < 2; iter++) {
      for (const obs of activeObstacles) {
        if (obs.isActive && !obs.isActive()) continue;
        if (obs.jumpable && canClearFence) continue;
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

    const targetYaw = Math.atan2(worldMove.x, worldMove.z);
    let diff = targetYaw - player.facingYaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    player.facingYaw += diff * Math.min(1, 14 * dt);
  }

  // Física vertical do pulo (Espaço / botão Pular)
  if (isAirfryerStatic) {
    player.vy = 0;
    player.jumpOffset = 0;
  } else if (player.jumpOffset > 0 || player.vy !== 0) {
    player.vy -= 24.0 * dt;
    player.jumpOffset += player.vy * dt;
    if (player.jumpOffset <= 0) {
      player.jumpOffset = 0;
      player.vy = 0;
    }
  }
  player.pos.y = getFloorYAt(player.pos.x, player.pos.z) + player.jumpOffset;

  // Animate Macho Character & Title Skins
  if (state.firstPerson) {
    player.facingYaw = state.camYaw + Math.PI;
  }
  const rideYOffset = state.ridingJaguar ? 0.37 : 0;
  const rideGallop = state.ridingJaguar && moving ? Math.sin(state.animTime * 14) * 0.68 : 0;
  const rideBounce = state.ridingJaguar
    ? (moving ? Math.abs(rideGallop) * 0.055 : Math.sin(state.animTime * 2.4) * 0.012)
    : 0;
  const rideBackDist = state.ridingJaguar ? -0.13 : 0;
  const seatOffX = rideBackDist ? Math.sin(player.facingYaw) * rideBackDist : 0;
  const seatOffZ = rideBackDist ? Math.cos(player.facingYaw) * rideBackDist : 0;

  playerMesh.position.set(player.pos.x + seatOffX, player.pos.y + rideYOffset + rideBounce, player.pos.z + seatOffZ);
  playerMesh.rotation.y = player.facingYaw;
  playerMesh.rotation.z = state.isCrazy && !isAirfryerStatic ? Math.sin(state.animTime * 11) * 0.08 : 0;

  if (state.ridingJaguar) {
    const mountJag = getActiveTamedJaguar();
    if (mountJag) {
      mountJag.mesh.visible = true;
      setJagTagVisible(mountJag, false);
      mountJag.mesh.position.set(player.pos.x, player.pos.y + rideBounce, player.pos.z);
      mountJag.mesh.rotation.y = player.facingYaw;
      mountJag.mesh.rotation.z = 0;
      mountJag.mesh.rotation.x = moving ? Math.cos(state.animTime * 14) * 0.045 : 0;
      if (mountJag.legs && mountJag.legs.length === 4) {
        mountJag.legs[0].rotation.x = rideGallop;
        mountJag.legs[3].rotation.x = rideGallop;
        mountJag.legs[1].rotation.x = -rideGallop;
        mountJag.legs[2].rotation.x = -rideGallop;
      }
      if (mountJag.tail) {
        mountJag.tail.rotation.y = Math.sin(state.animTime * (moving ? 12 : 4)) * (moving ? 0.34 : 0.16);
      }
    }
  }

  const {
    leftEye,
    rightEye,
    normalFaceGroup,
    crazyFaceGroup,
    leftCrazyEye,
    rightCrazyEye,
    lPupil,
    rPupil,
    tongueGroup,
    torsoMesh,
    skinMat,
    shirtMat,
    chestDetail,
    hatBrim,
    hatCrown,
    hatBand,
    lambiHairTop,
    bareChestGroup,
    lambiEyeGroup,
    lambiTongueGroup,
  } = playerMesh.userData;
  const rig = playerMesh.userData.activeRig || playerMesh.userData;
  const lambi = !!state.isLambiHomem;

  // Skin do Lambi Homem (sem camisa, sem chapéu, olhos vermelhos, língua gigante até o joelho!)
  if (torsoMesh && skinMat && shirtMat) torsoMesh.material = lambi ? skinMat : shirtMat;
  if (chestDetail) chestDetail.visible = !lambi;
  if (bareChestGroup) bareChestGroup.visible = lambi;
  if (hatBrim) hatBrim.visible = !lambi;
  if (hatCrown) hatCrown.visible = !lambi;
  if (hatBand) hatBand.visible = !lambi;
  if (lambiHairTop) lambiHairTop.visible = lambi;
  if (lambiEyeGroup) lambiEyeGroup.visible = lambi;
  if (lambiTongueGroup) {
    lambiTongueGroup.visible = lambi;
    if (lambi) {
      lambiTongueGroup.rotation.z = Math.sin(state.animTime * 9) * 0.14;
      lambiTongueGroup.rotation.x = 0.08 + Math.sin(state.animTime * 14) * 0.1;
    }
  }

  // Alterna rosto normal x Coringando x Lambi Homem
  if (leftEye && rightEye && crazyFaceGroup) {
    const showNormalFace = !state.isCrazy && !lambi;
    if (normalFaceGroup) normalFaceGroup.visible = showNormalFace;
    leftEye.visible = showNormalFace;
    rightEye.visible = showNormalFace;
    crazyFaceGroup.visible = state.isCrazy && !lambi;
    if (state.isCrazy && !lambi) {
      const bulge = 1.0 + Math.sin(state.animTime * 18) * 0.14;
      leftCrazyEye.scale.set(1.0, 1.0, bulge);
      rightCrazyEye.scale.set(1.0, 1.0, 2.0 - bulge);
      if (lPupil && rPupil) {
        lPupil.position.x = Math.sin(state.animTime * 23) * 0.032;
        lPupil.position.y = Math.cos(state.animTime * 19) * 0.028;
        rPupil.position.x = -Math.cos(state.animTime * 25) * 0.032;
        rPupil.position.y = Math.sin(state.animTime * 21) * 0.028;
      }
      if (tongueGroup) {
        tongueGroup.rotation.z = Math.sin(state.animTime * 16) * 0.24;
        tongueGroup.rotation.x = Math.sin(state.animTime * 22) * 0.18;
      }
    }
  }
  syncHeldToolVisibility();

  if (state.swingTimer > 0) {
    state.swingTimer = Math.max(0, state.swingTimer - dt);
  }
  if (state.shotgunRecoilTimer > 0) {
    state.shotgunRecoilTimer = Math.max(0, state.shotgunRecoilTimer - dt);
  }
  if (state.shotgunPumpTimer > 0) {
    state.shotgunPumpTimer = Math.max(0, state.shotgunPumpTimer - dt);
  }
  // Máquina de estados da recarga da Escopeta (cartucho por cartucho + pump final!)
  if (state.shotgunReloadPhase !== "idle") {
    const curHeldSg = typeof getHeldItem === "function" ? getHeldItem() : null;
    if (!curHeldSg || curHeldSg.id !== "escopeta") {
      if (typeof cancelShotgunReload === "function") cancelShotgunReload();
    } else {
      state.shotgunReloadTimer -= dt;
      if (state.shotgunReloadPhase === "loading" && state.shotgunReloadTimer <= 0) {
        if (state.shotgunMag < SHOTGUN_MAG_SIZE && state.shotgunReloadQueue > 0 && removeItemFromInventory("bala_escopeta", 1, false)) {
          state.shotgunMag += 1;
          state.shotgunReloadQueue -= 1;
          sfx.play("reload_shell");
          updateHUD();
          saveGame();
        } else {
          state.shotgunReloadQueue = 0;
        }
        if (state.shotgunReloadQueue > 0 && state.shotgunMag < SHOTGUN_MAG_SIZE && getItemCount("bala_escopeta") > 0) {
          state.shotgunReloadTimer = 0.42;
        } else {
          state.shotgunReloadPhase = "pump";
          state.shotgunReloadTimer = 0.38;
          sfx.play("pump_rack");
        }
      } else if (state.shotgunReloadPhase === "pump" && state.shotgunReloadTimer <= 0) {
        state.shotgunReloadPhase = "idle";
        state.shotgunReloadTimer = 0;
        state.shotgunReloadQueue = 0;
        updateHUD();
      }
    }
  }
  if (playerMesh.userData.tpShotgunGroup && (!rig || rig.isStatic)) {
    playerMesh.userData.tpShotgunGroup.visible = false;
  }
  if (rig && !rig.isStatic && rig.leftArm && rig.rightArm && rig.leftLeg && rig.rightLeg) {
    const { leftArm, rightArm, leftForearm, rightForearm, leftLeg, rightLeg, leftShin, rightShin, modelRoot } = rig;
    const gaitFreq = state.vaselinaTimer > 0 ? 15.8 : state.energyTimer > 0 ? 13.0 : state.isCrazy ? 14.2 : 10.6;
    const phase = state.animTime * gaitFreq;
    const stride = Math.sin(phase);
    const liftL = Math.max(0, -Math.cos(phase));
    const liftR = Math.max(0, Math.cos(phase));
    const inAir = player.jumpOffset > 0.06;

    // 1. PERNAS, JOELHOS & BALANÇO DO CORPO (nunca travam ao usar ferramenta andando!)
    if (state.ridingJaguar) {
      // Pernas abertas para fora (-Z na esquerda, +Z na direita) abraçando a sela da onça sem atravessar o corpo!
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, -0.52, 14 * dt);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -0.52, 14 * dt);
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, -0.54, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, 0.54, 14 * dt);
      if (leftShin) {
        leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, 0.72, 14 * dt);
        leftShin.rotation.z = THREE.MathUtils.lerp(leftShin.rotation.z, 0.42, 14 * dt);
      }
      if (rightShin) {
        rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, 0.72, 14 * dt);
        rightShin.rotation.z = THREE.MathUtils.lerp(rightShin.rotation.z, -0.42, 14 * dt);
      }
      if (modelRoot) {
        modelRoot.position.y = THREE.MathUtils.lerp(modelRoot.position.y, 0, 14 * dt);
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, moving ? 0.14 : 0.06, 10 * dt);
      }
    } else if (inAir) {
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, 0, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, 0, 14 * dt);
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, 0.38, 14 * dt);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -0.32, 14 * dt);
      if (leftShin) {
        leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, 0.56, 14 * dt);
        leftShin.rotation.z = THREE.MathUtils.lerp(leftShin.rotation.z, 0, 14 * dt);
      }
      if (rightShin) {
        rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, 0.44, 14 * dt);
        rightShin.rotation.z = THREE.MathUtils.lerp(rightShin.rotation.z, 0, 14 * dt);
      }
      if (modelRoot) {
        modelRoot.position.y = THREE.MathUtils.lerp(modelRoot.position.y, 0, 14 * dt);
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, 0.06, 10 * dt);
      }
    } else if (moving) {
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, 0, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, 0, 14 * dt);
      const legAmp = state.vaselinaTimer > 0 ? 0.78 : state.isCrazy ? 0.82 : 0.66;
      leftLeg.rotation.x = -stride * legAmp;
      rightLeg.rotation.x = stride * legAmp;
      if (leftShin) {
        leftShin.rotation.x = liftL * 0.62 + 0.05;
        leftShin.rotation.z = THREE.MathUtils.lerp(leftShin.rotation.z, 0, 14 * dt);
      }
      if (rightShin) {
        rightShin.rotation.x = liftR * 0.62 + 0.05;
        rightShin.rotation.z = THREE.MathUtils.lerp(rightShin.rotation.z, 0, 14 * dt);
      }
      if (modelRoot) {
        modelRoot.position.y = Math.abs(stride) * (state.vaselinaTimer > 0 ? 0.085 : 0.062);
        const targetLean = state.vaselinaTimer > 0 ? 0.14 : state.energyTimer > 0 ? 0.09 : 0.065;
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, targetLean, 10 * dt);
      }
    } else {
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, 0, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, 0, 14 * dt);
      const idleLeg = state.isCrazy ? Math.sin(state.animTime * 9.5) * 0.14 : 0;
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, idleLeg, 11 * dt);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -idleLeg, 11 * dt);
      if (leftShin) {
        leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, state.isCrazy ? 0.12 : 0, 11 * dt);
        leftShin.rotation.z = THREE.MathUtils.lerp(leftShin.rotation.z, 0, 14 * dt);
      }
      if (rightShin) {
        rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, state.isCrazy ? 0.12 : 0, 11 * dt);
        rightShin.rotation.z = THREE.MathUtils.lerp(rightShin.rotation.z, 0, 14 * dt);
      }
      if (modelRoot) {
        modelRoot.position.y = Math.sin(state.animTime * 2.4) * 0.015;
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, 0, 10 * dt);
      }
    }

    // 2. BRAÇOS, COTOVELOS & GOLPE DE FERRAMENTA (independentes das pernas!)
    const heldNowAnim = typeof getHeldItem === "function" ? getHeldItem() : null;
    const holdingTwoHandGun = !!(heldNowAnim && heldNowAnim.id === "escopeta");
    if (!holdingTwoHandGun) {
      rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, 0, 14 * dt);
      leftArm.rotation.y = THREE.MathUtils.lerp(leftArm.rotation.y, 0, 14 * dt);
    }

    const tpSg = playerMesh.userData.tpShotgunGroup;
    if (tpSg) tpSg.visible = holdingTwoHandGun && !isAirfryerStatic;

    if (holdingTwoHandGun) {
      // SEGURANDO ESCOPETA COM AS DUAS MÃOS EM 3ª PESSOA (cinemática exata: mão direita na coronha, mão esquerda na telha, cano reto +Z!)
      const bobY = modelRoot ? modelRoot.position.y : 0;
      const swayY = moving ? Math.sin(state.animTime * 10.0) * 0.018 : Math.sin(state.animTime * 2.4) * 0.008;
      const skinGunY =
        !state.isLambiHomem && state.activeTitle === "Macho"
          ? 1.62
          : !state.isLambiHomem && state.activeTitle === "PAC"
            ? 1.56
            : !state.isLambiHomem && state.activeTitle === "Homem Guloso"
              ? 1.44
              : 1.48;
      const skinGunZ = !state.isLambiHomem && state.activeTitle === "Macho" ? 0.58 : !state.isLambiHomem && state.activeTitle === "Homem Guloso" ? 0.62 : 0.48;
      const k = Math.min(1, 20 * dt);
      let pumpSlide = 0;

      if (state.shotgunReloadPhase === "loading") {
        // Recarga cartucho por cartucho: escopeta inclina levemente, mão esquerda desce ao cinto e empurra cartucho na abertura inferior!
        const p = 1 - THREE.MathUtils.clamp(state.shotgunReloadTimer / 0.42, 0, 1);
        const push = Math.sin(p * Math.PI);

        rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -1.05, k);
        rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, -1.05, k);
        rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.50, k);
        if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, -1.18, k);

        leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, THREE.MathUtils.lerp(-0.42, -1.14, push), k);
        leftArm.rotation.y = THREE.MathUtils.lerp(leftArm.rotation.y, THREE.MathUtils.lerp(0.62, 0.60, push), k);
        leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, THREE.MathUtils.lerp(0.18, 0.72, push), k);
        if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, THREE.MathUtils.lerp(-0.78, -0.49, push), k);

        if (tpSg) {
          tpSg.position.set(0.05, skinGunY + bobY + swayY + push * 0.02, skinGunZ);
          tpSg.rotation.set(-0.22 - push * 0.05, -0.22, 0.28);
          if (tpSg.userData.tpLoadShell) {
            tpSg.userData.tpLoadShell.visible = true;
            tpSg.userData.tpLoadShell.position.set(0, -0.18 + push * 0.16, 0.08);
          }
        }
      } else if (state.shotgunReloadPhase === "pump") {
        // Pump final ("chk-chk"): mão esquerda desliza a telha de madeira para trás e para frente!
        const p = 1 - THREE.MathUtils.clamp(state.shotgunReloadTimer / 0.38, 0, 1);
        const rack = Math.sin(p * Math.PI);
        pumpSlide = rack;

        rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -1.34, k);
        rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, -1.03, k);
        rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.72, k);
        if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, -0.97, k);

        leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, THREE.MathUtils.lerp(-1.42, -1.29, rack), k);
        leftArm.rotation.y = THREE.MathUtils.lerp(leftArm.rotation.y, THREE.MathUtils.lerp(0.50, 0.79, rack), k);
        leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.72, k);
        if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, THREE.MathUtils.lerp(-0.18, -0.70, rack), k);

        if (tpSg) {
          tpSg.position.set(0.01, skinGunY + bobY + swayY - rack * 0.015, skinGunZ - rack * 0.03);
          tpSg.rotation.set(-rack * 0.07, 0, rack * 0.05);
          if (tpSg.userData.tpLoadShell) tpSg.userData.tpLoadShell.visible = false;
        }
      } else {
        // Pose de mira horizontal com as DUAS mãos + recuo do tiro + pump pós-disparo!
        const recoil = state.shotgunRecoilTimer > 0 ? Math.sin((state.shotgunRecoilTimer / 0.24) * Math.PI) : 0;
        const postPump =
          state.shotgunRecoilTimer <= 0.04 && state.shotgunPumpTimer > 0
            ? Math.sin((state.shotgunPumpTimer / 0.36) * Math.PI)
            : 0;
        pumpSlide = postPump;

        rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, THREE.MathUtils.lerp(-1.34, -1.24, recoil), k);
        rightArm.rotation.y = THREE.MathUtils.lerp(rightArm.rotation.y, THREE.MathUtils.lerp(-1.03, -1.05, recoil), k);
        rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.72, k);
        if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, THREE.MathUtils.lerp(-0.97, -1.22, recoil), k);

        const lTargetX = recoil > 0.02 ? THREE.MathUtils.lerp(-1.42, -1.45, recoil) : THREE.MathUtils.lerp(-1.42, -1.29, postPump);
        const lTargetY = recoil > 0.02 ? THREE.MathUtils.lerp(0.50, 0.74, recoil) : THREE.MathUtils.lerp(0.50, 0.79, postPump);
        const lForeX = recoil > 0.02 ? THREE.MathUtils.lerp(-0.18, -0.65, recoil) : THREE.MathUtils.lerp(-0.18, -0.70, postPump);

        leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, lTargetX, k);
        leftArm.rotation.y = THREE.MathUtils.lerp(leftArm.rotation.y, lTargetY, k);
        leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.72, k);
        if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, lForeX, k);

        if (tpSg) {
          tpSg.position.set(0.01, skinGunY + bobY + swayY + recoil * 0.04, skinGunZ - recoil * 0.09 - postPump * 0.02);
          tpSg.rotation.set(-recoil * 0.24 - postPump * 0.05, 0, postPump * 0.04);
          if (tpSg.userData.tpLoadShell) tpSg.userData.tpLoadShell.visible = false;
        }
      }

      if (tpSg && tpSg.userData && tpSg.userData.tpPump) {
        tpSg.userData.tpPump.position.z = tpSg.userData.pumpRestZ - pumpSlide * 0.14;
      }
    } else if (state.swingTimer > 0) {
      rightArm.rotation.x = -1.48 + Math.sin(state.swingTimer * 26) * 0.68;
      rightArm.rotation.z = -0.06;
      if (rightForearm) rightForearm.rotation.x = -0.38;
      if (moving) {
        leftArm.rotation.x = stride * 0.54;
        leftArm.rotation.z = 0.05;
        if (leftForearm) leftForearm.rotation.x = -0.18 - Math.max(0, -stride) * 0.24;
      } else {
        leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, 0.12, 10 * dt);
        leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.06, 10 * dt);
        if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, -0.12, 10 * dt);
      }
    } else if (state.isCrazy) {
      // Gesto "6-7" (67): ambos braços dobrados pra frente com palmas p/ cima subindo e descendo alternadamente!
      const pump67 = Math.sin(state.animTime * 9.5);
      leftArm.rotation.x = -0.58 + pump67 * 0.36;
      rightArm.rotation.x = -0.58 - pump67 * 0.36;
      leftArm.rotation.z = 0.14;
      rightArm.rotation.z = -0.14;
      if (leftForearm) leftForearm.rotation.x = -1.35 + pump67 * 0.25;
      if (rightForearm) rightForearm.rotation.x = -1.35 - pump67 * 0.25;
    } else if (state.ridingJaguar) {
      const reinBob = moving ? Math.sin(state.animTime * 14) * 0.06 : 0;
      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, -0.76 + reinBob, 14 * dt);
      leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.14, 14 * dt);
      if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, -0.46, 14 * dt);
      const holdingTool = typeof getHeldItem === "function" && !!getHeldItem();
      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, (holdingTool ? -0.58 : -0.76) - reinBob, 14 * dt);
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, holdingTool ? -0.06 : -0.14, 14 * dt);
      if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, holdingTool ? -0.32 : -0.46, 14 * dt);
    } else if (inAir) {
      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, -0.78, 14 * dt);
      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -0.72, 14 * dt);
      leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.22, 12 * dt);
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.22, 12 * dt);
      if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, -0.35, 12 * dt);
      if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, -0.35, 12 * dt);
    } else if (moving) {
      const armAmp = state.vaselinaTimer > 0 ? 0.68 : 0.56;
      leftArm.rotation.x = stride * armAmp;
      rightArm.rotation.x = -stride * (armAmp * 0.85) - 0.12;
      leftArm.rotation.z = 0.05;
      rightArm.rotation.z = -0.05;
      if (leftForearm) leftForearm.rotation.x = -0.16 - Math.max(0, -stride) * 0.28;
      if (rightForearm) rightForearm.rotation.x = -0.24 - Math.max(0, stride) * 0.22;
    } else {
      const breath = Math.sin(state.animTime * 2.4) * 0.03;
      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, breath, 10 * dt);
      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -0.18 - breath, 10 * dt);
      leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, 0.04, 10 * dt);
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.04, 10 * dt);
      if (leftForearm) leftForearm.rotation.x = THREE.MathUtils.lerp(leftForearm.rotation.x, -0.08, 10 * dt);
      if (rightForearm) rightForearm.rotation.x = THREE.MathUtils.lerp(rightForearm.rotation.x, -0.16, 10 * dt);
    }
  }

  // Segurar E (ou botão AGIR) na horta: ação contínua inteligente (arar / plantar / regar / colher em sequência!)
  if ((keys["KeyE"] || touchActionHeld) && state.mode === "playing" && !state.isSleeping && state.location === "yard" && !state.jaguar.active) {
    holdActionState.timer -= dt;
    if (holdActionState.timer <= 0) {
      holdActionState.timer = 0.13;
      const holdCtx = findCurrentContext();
      if (holdCtx && holdCtx.type === "plot" && holdCtx.plot) {
        const res = interactWithPlot(holdCtx.plot, {
          lockedAction: holdActionState.lockedMode,
          silentToast: !!holdActionState.lockedMode,
        });
        if (res && !holdActionState.lockedMode) {
          holdActionState.lockedMode = res;
        }
      }
    }
  }

  // Modo Coringando (100%): Fala frases cheias de besteiras acima da cabeça!
  if (state.isCrazy) {
    state.coringaTimer -= dt;
    if (state.coringaTimer <= 0) {
      triggerCoringaBurst(false);
    }
    if (coringaBubble) {
      coringaBubble.classList.remove("hidden");
      if (state.firstPerson) {
        coringaBubble.style.left = `${window.innerWidth * 0.5}px`;
        coringaBubble.style.top = `145px`;
      } else {
        headProjVec.set(player.pos.x, player.pos.y + 3.35, player.pos.z);
        headProjVec.project(camera);
        const halfPad = Math.min(155, Math.max(85, window.innerWidth * 0.34));
        const sx = THREE.MathUtils.clamp((headProjVec.x * 0.5 + 0.5) * window.innerWidth, halfPad, window.innerWidth - halfPad);
        const sy = THREE.MathUtils.clamp((-headProjVec.y * 0.5 + 0.5) * window.innerHeight, 92, Math.max(100, window.innerHeight - 150));
        coringaBubble.style.left = `${sx}px`;
        coringaBubble.style.top = `${sy}px`;
      }
    }
  } else if (coringaBubble && !coringaBubble.classList.contains("hidden")) {
    coringaBubble.classList.add("hidden");
  }

  // Irrigação Automática (Aspersores 3D giram e regam todos os canteiros!)
  if (state.upgrades.autoWaterLevel >= 1) {
    if (sprinklerGroup) sprinklerGroup.visible = true;
    state.autoWaterAccum += dt;
    const waterInterval = state.upgrades.autoWaterLevel >= 2 ? 1.2 : 2.6;
    if (state.autoWaterAccum >= waterInterval) {
      state.autoWaterAccum = 0;
      plots.forEach((p) => {
        if (p.unlocked && p.stage === "growing" && p.waterTimer <= 3) {
          p.waterTimer = 18;
          refreshPlotAppearance(p);
        }
      });
      if (state.location === "yard") {
        sprinklerHeads.forEach((sh) => {
          if ((sh.landReq || 0) <= (state.landLevel || 0)) {
            spawnParticles(new THREE.Vector3(sh.x, 0.72, sh.z), 0x38bdf8, 4);
          }
        });
      }
    }
  }

  // Update Crops Growth (Rain & Auto-Water keep plots watered; Adubo do Kaio dobra a velocidade!)
  const growMult = getGrowthMultiplier();
  let anyPlotChanged = false;
  plots.forEach((p) => {
    if (!p.unlocked) return;
    if (p.popTimer > 0) {
      p.popTimer = Math.max(0, p.popTimer - dt);
    }
    if (p.stage === "growing") {
      if (state.isRainy || state.upgrades.autoWaterLevel >= 2) {
        p.waterTimer = Math.max(p.waterTimer, 12);
      }
      if (p.waterTimer > 0) {
        p.waterTimer = Math.max(0, p.waterTimer - dt);
        const crop = CROPS[p.cropId];
        const fertSpeed = p.fertilized ? 2.0 : 1.0;
        p.growth += (dt * growMult * fertSpeed) / crop.growTime;
        if (p.growth >= 1) {
          p.growth = 1;
          p.stage = "ready";
          p.popTimer = 0.3;
          anyPlotChanged = true;
          spawnParticles(new THREE.Vector3(p.x, 0.7, p.z), 0xfacc15, 8);
        }
      }
      refreshPlotAppearance(p);
      if (p.popTimer > 0) {
        const popBoost = 1 + Math.sin((p.popTimer / 0.28) * Math.PI) * 0.22;
        p.cropGroup.scale.setScalar(popBoost);
      } else {
        p.cropGroup.scale.setScalar(1);
      }
      p.cropGroup.rotation.z = Math.sin(state.animTime * 2.2 + p.index * 0.7) * 0.04;
      if (p.dryDrop && p.dryDrop.visible) {
        p.dryDrop.position.y = 1.08 + Math.sin(state.animTime * 4.4 + p.index) * 0.1;
      }
    } else if (p.stage === "ready") {
      if (p.popTimer > 0) {
        const popBoost = 1 + Math.sin((p.popTimer / 0.3) * Math.PI) * 0.18;
        p.cropGroup.scale.setScalar(popBoost);
      } else {
        p.cropGroup.scale.setScalar(1);
      }
      p.readyHalo.rotation.y += 2.4 * dt;
      p.readyHalo.position.y = 1.4 + Math.sin(state.animTime * 3.5 + p.index) * 0.14;
      p.cropGroup.rotation.y = Math.sin(state.animTime * 1.6 + p.index) * 0.05;
      p.cropGroup.rotation.z = Math.sin(state.animTime * 2.1 + p.index * 0.7) * 0.045;
    } else {
      p.cropGroup.scale.setScalar(1);
      p.cropGroup.rotation.z = 0;
    }
  });
  if (anyPlotChanged) saveGame();

  // Animate Chickens & Dog Caramelo in the yard
  if (state.location === "yard") {
    chickens.forEach((ch, idx) => {
      if (ch.wait > 0) {
        ch.wait -= dt;
        ch.mesh.position.y = 0;
        ch.mesh.rotation.x = Math.sin(state.animTime * 9 + idx) > 0.6 ? 0.25 : 0;
        if (ch.wait <= 0) {
          ch.target.set(
            THREE.MathUtils.clamp(ch.home.x + (Math.random() - 0.5) * 6.5, -29.4, -18.6),
            0,
            THREE.MathUtils.clamp(ch.home.z + (Math.random() - 0.5) * 6.5, -25.4, -13.6)
          );
        }
      } else {
        ch.mesh.rotation.x = 0;
        const dx = ch.target.x - ch.mesh.position.x;
        const dz = ch.target.z - ch.mesh.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 0.2) {
          ch.wait = 1.5 + Math.random() * 2.5;
          ch.mesh.position.y = 0;
        } else {
          ch.mesh.position.x += (dx / dist) * 1.4 * dt;
          ch.mesh.position.z += (dz / dist) * 1.4 * dt;
          ch.mesh.position.y = Math.abs(Math.sin(state.animTime * 14 + idx)) * 0.055;
          ch.mesh.rotation.y = Math.atan2(dx, dz);
        }
      }
    });

    const getYardEntityFloorY = (ex, ez) => {
      const raw = getFloorYAt(ex, ez);
      return raw < -0.55 ? -0.55 : raw;
    };
    if (dogOrelha) {
      if (dogOrelha.ragdoll) {
        // Física Ragdoll 3D: voa, gira nos 3 eixos, quica no chão e chacoalha patas/orelhas (nunca morre!)
        dogOrelha.ragdollTimer -= dt;
        dogOrelha.vel.y -= 24.0 * dt;
        dogOrelha.mesh.position.x = THREE.MathUtils.clamp(dogOrelha.mesh.position.x + dogOrelha.vel.x * dt, -63.5, 73.5);
        dogOrelha.mesh.position.z = THREE.MathUtils.clamp(dogOrelha.mesh.position.z + dogOrelha.vel.z * dt, -34.0, 47.0);
        dogOrelha.mesh.position.y += dogOrelha.vel.y * dt;
        // Colisão sólida no ragdoll: quica na casa, cercas, árvores e paredes sem atravessar nada!
        if (resolveEntityObstacles(dogOrelha.mesh.position, 0.52, obstacles, dogOrelha.vel, dogOrelha.mesh.position.y)) {
          dogOrelha.angVel.multiplyScalar(-0.7);
        }

        dogOrelha.mesh.rotation.x += dogOrelha.angVel.x * dt;
        dogOrelha.mesh.rotation.y += dogOrelha.angVel.y * dt;
        dogOrelha.mesh.rotation.z += dogOrelha.angVel.z * dt;

        const oFloorY = getYardEntityFloorY(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z);
        if (dogOrelha.mesh.position.y <= oFloorY + 0.34) {
          dogOrelha.mesh.position.y = oFloorY + 0.34;
          if (Math.abs(dogOrelha.vel.y) > 1.8) {
            dogOrelha.vel.y = Math.abs(dogOrelha.vel.y) * 0.44;
            sfx.play(oFloorY < -0.15 ? "water" : "dig");
            spawnParticles(dogOrelha.mesh.position.clone(), oFloorY < -0.15 ? 0x38bdf8 : 0xd6b588, 6);
          } else {
            dogOrelha.vel.y = 0;
          }
          dogOrelha.vel.x *= Math.pow(0.08, dt);
          dogOrelha.vel.z *= Math.pow(0.08, dt);
          dogOrelha.angVel.multiplyScalar(Math.pow(0.06, dt));
        }

        // Patas, orelhas e rabo soltos no ragdoll
        const flail = Math.sin(state.animTime * 28);
        if (dogOrelha.legs) {
          dogOrelha.legs.forEach((lg, idx) => {
            lg.rotation.x = flail * (idx % 2 === 0 ? 1.15 : -1.15);
            lg.rotation.z = Math.cos(state.animTime * 24 + idx) * 0.55;
          });
        }
        if (dogOrelha.leftEar && dogOrelha.rightEar) {
          dogOrelha.leftEar.rotation.z = 0.8 + flail * 0.5;
          dogOrelha.rightEar.rotation.z = -0.8 - flail * 0.5;
        }
        dogOrelha.tail.rotation.z = flail * 0.9;

        const speedSq = dogOrelha.vel.lengthSq();
        if (dogOrelha.ragdollTimer <= 0 && speedSq < 1.2) {
          dogOrelha.ragdoll = false;
          dogOrelha.vel.set(0, 0, 0);
          dogOrelha.angVel.set(0, 0, 0);
          dogOrelha.mesh.position.y = getYardEntityFloorY(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z);
          dogOrelha.mesh.rotation.x = 0;
          dogOrelha.mesh.rotation.z = 0;
          if (dogOrelha.legs) {
            dogOrelha.legs.forEach((lg) => {
              lg.rotation.set(0, 0, 0);
            });
          }
          if (dogOrelha.pendingAngry && !dogOrelha.angry) {
            dogOrelha.pendingAngry = false;
            dogOrelha.angry = true;
            dogOrelha.angryTimer = 28.0;
            dogOrelha.barkCd = 0;
            if (dogOrelha.eyeMat) {
              dogOrelha.eyeMat.color.setHex(0xff1111);
              dogOrelha.eyeMat.emissive.setHex(0xef4444);
              dogOrelha.eyeMat.emissiveIntensity = 1.2;
            }
            sfx.play("roar");
            sfx.play("bark");
            showDayBanner("😡 O ORELHA FICOU FURIOSO! CORRE QUE É HITKILL!");
            showToast("🐕😡", "ORELHA FURIOSO!", "Ele levantou com sangue nos olhos e tá correndo pra te matar (HITKILL)!");
          }
        }
      } else if (dogOrelha.angry) {
        // Modo Orelha Furioso: corre muito rápido atrás do jogador e mata com 1 toque (HITKILL)!
        dogOrelha.angryTimer -= dt;
        dogOrelha.barkCd -= dt;
        if (dogOrelha.barkCd <= 0) {
          dogOrelha.barkCd = 1.4;
          sfx.play("bark");
          spawnParticles(dogOrelha.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0)), 0xef4444, 6);
        }
        const dx = player.pos.x - dogOrelha.mesh.position.x;
        const dz = player.pos.z - dogOrelha.mesh.position.z;
        const dist = Math.hypot(dx, dz) || 0.01;
        const chaseSpd = 9.2;
        dogOrelha.mesh.position.x = THREE.MathUtils.clamp(dogOrelha.mesh.position.x + (dx / dist) * chaseSpd * dt, -63.5, 73.5);
        dogOrelha.mesh.position.z = THREE.MathUtils.clamp(dogOrelha.mesh.position.z + (dz / dist) * chaseSpd * dt, -34.0, 47.0);
        // Colisão sólida perseguindo: respeita casa, cercas e paredes!
        resolveEntityObstacles(dogOrelha.mesh.position, 0.52, obstacles, null, 0);
        dogOrelha.mesh.rotation.x = 0;
        dogOrelha.mesh.rotation.z = 0;
        dogOrelha.mesh.rotation.y = Math.atan2(dx, dz);

        const sprint = Math.sin(state.animTime * 26) * 0.9;
        dogOrelha.mesh.position.y = getYardEntityFloorY(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z) + Math.abs(sprint) * 0.14;
        dogOrelha.tail.rotation.z = Math.sin(state.animTime * 24) * 0.55;
        if (dogOrelha.leftEar && dogOrelha.rightEar) {
          dogOrelha.leftEar.rotation.z = 0.55 + Math.sin(state.animTime * 20) * 0.2;
          dogOrelha.rightEar.rotation.z = -0.55 - Math.sin(state.animTime * 20) * 0.2;
        }
        if (dogOrelha.legs && dogOrelha.legs.length === 4) {
          dogOrelha.legs[0].rotation.x = sprint;
          dogOrelha.legs[3].rotation.x = sprint;
          dogOrelha.legs[1].rotation.x = -sprint;
          dogOrelha.legs[2].rotation.x = -sprint;
        }

        if (dist < 1.35 && player.jumpOffset < 0.72) {
          state.playerHp = 0;
          if (typeof triggerDamageFeedback === "function") triggerDamageFeedback(0.8);
          spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xef4444, 24);
          triggerPlayerDeath("orelha");
          return;
        }

        if (dogOrelha.angryTimer <= 0) {
          dogOrelha.angry = false;
          dogOrelha.kickCount = 0;
          if (dogOrelha.eyeMat) {
            dogOrelha.eyeMat.color.setHex(0x111111);
            dogOrelha.eyeMat.emissive.setHex(0x000000);
            dogOrelha.eyeMat.emissiveIntensity = 0;
          }
          showToast("🐕", "ORELHA SE ACALMOU", "O Orelha cansou de correr atrás de você e voltou pro quintal.");
        }
      } else {
        dogOrelha.mesh.rotation.x = THREE.MathUtils.lerp(dogOrelha.mesh.rotation.x, 0, 12 * dt);
        dogOrelha.mesh.rotation.z = THREE.MathUtils.lerp(dogOrelha.mesh.rotation.z, 0, 12 * dt);
        dogOrelha.tail.rotation.z = Math.sin(state.animTime * 14) * 0.35;
        if (dogOrelha.leftEar && dogOrelha.rightEar) {
          dogOrelha.leftEar.rotation.z = 0.18 + Math.sin(state.animTime * 7) * 0.08;
          dogOrelha.rightEar.rotation.z = -0.18 - Math.sin(state.animTime * 7) * 0.08;
        }
        if (dogOrelha.wait > 0) {
          dogOrelha.wait -= dt;
          dogOrelha.mesh.position.y = THREE.MathUtils.lerp(dogOrelha.mesh.position.y, getYardEntityFloorY(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z), 12 * dt);
          if (dogOrelha.legs) {
            dogOrelha.legs.forEach((lg) => {
              lg.rotation.x = THREE.MathUtils.lerp(lg.rotation.x, 0, 12 * dt);
              lg.rotation.z = THREE.MathUtils.lerp(lg.rotation.z, 0, 12 * dt);
            });
          }
          if (dogOrelha.wait <= 0) {
            dogOrelha.target.set(
              dogOrelha.home.x + (Math.random() - 0.5) * 5,
              0,
              dogOrelha.home.z + (Math.random() - 0.5) * 5
            );
          }
        } else {
          const dx = dogOrelha.target.x - dogOrelha.mesh.position.x;
          const dz = dogOrelha.target.z - dogOrelha.mesh.position.z;
          const dist = Math.hypot(dx, dz);
          if (dist < 0.25) {
            dogOrelha.wait = 2 + Math.random() * 2.5;
          } else {
            dogOrelha.mesh.position.x = THREE.MathUtils.clamp(dogOrelha.mesh.position.x + (dx / dist) * 2.1 * dt, -63.5, 73.5);
            dogOrelha.mesh.position.z = THREE.MathUtils.clamp(dogOrelha.mesh.position.z + (dz / dist) * 2.1 * dt, -34.0, 47.0);
            if (resolveEntityObstacles(dogOrelha.mesh.position, 0.52, obstacles, null, 0)) {
              dogOrelha.wait = 0.8 + Math.random() * 1.2;
            }
            dogOrelha.mesh.rotation.y = Math.atan2(dx, dz);
            const trot = Math.sin(state.animTime * 15) * 0.55;
            dogOrelha.mesh.position.y = getYardEntityFloorY(dogOrelha.mesh.position.x, dogOrelha.mesh.position.z) + Math.abs(trot) * 0.05;
            if (dogOrelha.legs && dogOrelha.legs.length === 4) {
              dogOrelha.legs[0].rotation.x = trot;
              dogOrelha.legs[3].rotation.x = trot;
              dogOrelha.legs[1].rotation.x = -trot;
              dogOrelha.legs[2].rotation.x = -trot;
            }
          }
        }
      }
    }


    // Jacaré 3D no Lago de Pau Arcado: patrulha na água e ataca o jogador quando chega perto!
    if (alligatorEntity) {
      const g = alligatorEntity;
      if (!g.alive) {
        g.respawnTimer -= dt;
        if (g.respawnTimer <= 0) {
          resetAlligator();
        }
      } else {
        g.mesh.visible = true;
        if (g.attackCd > 0) g.attackCd = Math.max(0, g.attackCd - dt);
        if (g.biteAnim > 0) g.biteAnim = Math.max(0, g.biteAnim - dt);
        if (g.hitFlash > 0) {
          g.hitFlash = Math.max(0, g.hitFlash - dt);
          g.bodyMat.emissive.setHex(g.hitFlash > 0 ? 0xdc2626 : 0x000000);
          g.bodyMat.emissiveIntensity = g.hitFlash > 0 ? 0.85 : 0;
        }

        const gPos = g.mesh.position;
        const distPlayerToLake = Math.hypot(player.pos.x - LAKE_CENTER_X, player.pos.z - LAKE_CENTER_Z);
        const distToPlayer = distXZ(gPos, player.pos);
        const shouldAggro = !state.isSleeping && state.mode === "playing" && (distPlayerToLake < 10.6 || distToPlayer < 8.8);
        g.aggro = shouldAggro;

        let targetX, targetZ, moveSpeed;
        if (shouldAggro) {
          // Persegue o jogador na água e até a margem arenosa (r <= 9.6)
          const pdx = player.pos.x - LAKE_CENTER_X;
          const pdz = player.pos.z - LAKE_CENTER_Z;
          const pd = Math.hypot(pdx, pdz) || 1;
          const maxChaseR = 9.5;
          if (pd > maxChaseR) {
            targetX = LAKE_CENTER_X + (pdx / pd) * maxChaseR;
            targetZ = LAKE_CENTER_Z + (pdz / pd) * maxChaseR;
          } else {
            targetX = player.pos.x;
            targetZ = player.pos.z;
          }
          const gDistLake = Math.hypot(gPos.x - LAKE_CENTER_X, gPos.z - LAKE_CENTER_Z);
          moveSpeed = gDistLake < LAKE_WATER_RADIUS ? 6.2 : 4.2;
        } else {
          // Patrulha tranquila circulando dentro do lago
          g.patrolAngle += dt * 0.48;
          const pr = 3.8 + Math.sin(g.patrolAngle * 1.7) * 1.25;
          targetX = LAKE_CENTER_X + Math.cos(g.patrolAngle) * pr;
          targetZ = LAKE_CENTER_Z + Math.sin(g.patrolAngle) * pr;
          moveSpeed = 2.4;
        }

        const mdx = targetX - gPos.x;
        const mdz = targetZ - gPos.z;
        const mdist = Math.hypot(mdx, mdz);
        if (mdist > (shouldAggro ? 1.55 : 0.25)) {
          let nx = gPos.x + (mdx / mdist) * moveSpeed * dt;
          let nz = gPos.z + (mdz / mdist) * moveSpeed * dt;
          // Evita encostar no Jessy (o jacaré respeita o Jessy!)
          if (jessyEntity) {
            const jdx = nx - jessyEntity.worldPos.x;
            const jdz = nz - jessyEntity.worldPos.z;
            const jd = Math.hypot(jdx, jdz);
            if (jd < 2.0 && jd > 0.01) {
              nx = jessyEntity.worldPos.x + (jdx / jd) * 2.0;
              nz = jessyEntity.worldPos.z + (jdz / jd) * 2.0;
            }
          }
          gPos.x = nx;
          gPos.z = nz;
        }

        // Rotação suave na direção do alvo (ou do jogador se bem perto)
        const faceDx = shouldAggro ? player.pos.x - gPos.x : mdx;
        const faceDz = shouldAggro ? player.pos.z - gPos.z : mdz;
        if (Math.hypot(faceDx, faceDz) > 0.15) {
          const wantYaw = Math.atan2(faceDx, faceDz);
          let gDiff = wantYaw - g.mesh.rotation.y;
          while (gDiff > Math.PI) gDiff -= Math.PI * 2;
          while (gDiff < -Math.PI) gDiff += Math.PI * 2;
          g.mesh.rotation.y += gDiff * Math.min(1, (shouldAggro ? 7.5 : 3.5) * dt);
        }

        // Altura realista: flutua na linha d'água dentro do lago e sobe na areia quando ataca na margem!
        const gFloorY = getFloorYAt(gPos.x, gPos.z);
        const targetGatorY = Math.max(gFloorY + 0.04, LAKE_WATER_Y - 0.16 + Math.sin(state.animTime * 3.0) * 0.03);
        gPos.y = THREE.MathUtils.lerp(gPos.y, targetGatorY, Math.min(1, 10 * dt));

        // Animação da cauda, patas, mandíbula e ondinha na água
        const swimRate = shouldAggro ? 11.5 : 5.0;
        const swimWave = Math.sin(state.animTime * swimRate);
        if (g.tail1) g.tail1.rotation.y = swimWave * (shouldAggro ? 0.42 : 0.28);
        if (g.tail2) g.tail2.rotation.y = Math.sin(state.animTime * swimRate - 0.9) * (shouldAggro ? 0.52 : 0.34);
        if (g.legs && g.legs.length === 4) {
          g.legs[0].rotation.y = swimWave * 0.45;
          g.legs[3].rotation.y = swimWave * 0.45;
          g.legs[1].rotation.y = -swimWave * 0.45;
          g.legs[2].rotation.y = -swimWave * 0.45;
        }
        if (g.jawGroup) {
          const biteOpen = g.biteAnim > 0 ? Math.sin((g.biteAnim / 0.45) * Math.PI) * 0.72 : (shouldAggro && distToPlayer < 4.5 ? 0.22 : 0.03);
          g.jawGroup.rotation.x = THREE.MathUtils.lerp(g.jawGroup.rotation.x, biteOpen, Math.min(1, 18 * dt));
        }
        if (g.ripple) {
          const gInWater = gFloorY < LAKE_WATER_Y - 0.05;
          g.ripple.visible = gInWater;
          if (gInWater) {
            const rs = 0.9 + ((state.animTime * 0.65) % 1) * 0.55;
            g.ripple.scale.setScalar(rs);
            g.ripple.material.opacity = Math.max(0, 0.5 * (1 - ((state.animTime * 0.65) % 1)));
          }
        }

        // Mordida quando chega perto do jogador!
        if (shouldAggro && distToPlayer < 2.25 && g.attackCd <= 0 && player.jumpOffset < 0.85) {
          g.attackCd = 1.45;
          g.biteAnim = 0.45;
          sfx.play("roar");
          sfx.play("hit");
          sfx.play("splash");
          if (typeof triggerDamageFeedback === "function") triggerDamageFeedback(0.55);

          // Empurra o jogador para longe das mandíbulas
          const kdx = player.pos.x - gPos.x;
          const kdz = player.pos.z - gPos.z;
          const kd = Math.hypot(kdx, kdz) || 1;
          player.pos.x = THREE.MathUtils.clamp(player.pos.x + (kdx / kd) * 1.45, -66.0, 76.0);
          player.pos.z = THREE.MathUtils.clamp(player.pos.z + (kdz / kd) * 1.45, -36.0, 49.0);

          if (state.ridingJaguar) {
            damageTamedJaguar(24);
            state.playerHp = Math.max(0, state.playerHp - 14);
          } else {
            state.playerHp = Math.max(0, state.playerHp - 28);
            spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 0.9, 0)), 0xef4444, 14);
            spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 0.5, 0)), 0xbae6fd, 10);
            spawnFloatingText(player.pos, "🐊 -28 HP!", "#ef4444");
          }
          updateHUD();
          if (state.playerHp <= 0) {
            triggerPlayerDeath("alligator");
            return;
          }
        }
      }
    }

    // Evento Aleatório: Onça Pintada no Quintal!
    if (state.jaguarDefeated && jaguarEntity) {
      jaguarEntity.mesh.visible = true;
      state.jaguarDownTimer -= dt;
      if (state.jaguarDownTimer <= 0) {
        state.jaguarDefeated = false;
        jaguarEntity.mesh.visible = false;
        jaguarEntity.mesh.rotation.z = 0;
        jaguarEntity.mesh.position.y = 0;
        showToast("🐆", "A ONÇA FUGIU", "A Onça acordou e fugiu para a mata antes de ser domada!");
      }
    } else if (!state.jaguar.active) {
      state.jaguar.spawnCooldown = Math.max(0, state.jaguar.spawnCooldown - dt);
      if (state.jaguar.spawnCooldown <= 0 && !state.isSleeping) {
        state.jaguar.checkAccum += dt;
        if (state.jaguar.checkAccum >= 18.0) {
          state.jaguar.checkAccum = 0;
          // Chance bem mais equilibrada: ataque ocasional, não toda hora!
          const hasAnimals = state.animals.some((a) => a.alive);
          const chance = hasAnimals ? 0.09 : 0.05;
          if (Math.random() < chance) {
            spawnJaguar();
          }
        }
      }
    } else if (jaguarEntity) {
      jaguarEntity.mesh.visible = true;
      const jpos = jaguarEntity.mesh.position;

      // Escolhe alvo: prioriza animais vivos; só foca no player se ele estiver perto dela!
      const playerDist = distXZ(jpos, player.pos);
      const tamedActive =
        state.hasTamedJaguar &&
        !state.tamedJaguarDown &&
        !state.ridingJaguar &&
        tamedJaguarEntity &&
        tamedJaguarEntity.mesh.visible;
      const tamedDist = tamedActive ? distXZ(jpos, tamedJaguarEntity.mesh.position) : Infinity;

      let targetPos = null;
      let targetEnt = null;
      let targetType = "roam";
      let bestAnimalDist = Infinity;
      livestockEntities.forEach((ent) => {
        if (!ent.animal.alive) return;
        const d = distXZ(jpos, ent.mesh.position);
        if (d < bestAnimalDist) {
          bestAnimalDist = d;
          targetEnt = ent;
        }
      });

      if (playerDist < 5.2 && (!targetEnt || bestAnimalDist > 2.4)) {
        targetType = "player";
        targetPos = player.pos;
        targetEnt = null;
      } else if (tamedActive && tamedDist < 2.6 && (!targetEnt || bestAnimalDist > 2.4)) {
        targetType = "tamed";
        targetPos = tamedJaguarEntity.mesh.position;
        targetEnt = null;
      } else if (targetEnt) {
        targetType = "animal";
        targetPos = targetEnt.mesh.position;
      } else if (tamedActive && tamedDist < 6.5) {
        targetType = "tamed";
        targetPos = tamedJaguarEntity.mesh.position;
      } else if (playerDist < 7.5) {
        targetType = "player";
        targetPos = player.pos;
      } else {
        targetType = "roam";
        if (!state.jaguar.roamTarget || distXZ(jpos, state.jaguar.roamTarget) < 1.6) {
          const b = getFarmBounds();
          state.jaguar.roamTarget = {
            x: THREE.MathUtils.clamp((Math.random() - 0.5) * 34, b.minX + 2, b.maxX - 2),
            z: THREE.MathUtils.clamp((Math.random() - 0.5) * 36, -24, 24),
          };
        }
        targetPos = state.jaguar.roamTarget;
      }

      const dx = targetPos.x - jpos.x;
      const dz = targetPos.z - jpos.z;
      const dist = Math.hypot(dx, dz) || 0.01;

      // Efeitos das enxadas: congelamento e queimadura
      let speedMult = 1;
      if (state.jaguar.slowTimer > 0) {
        state.jaguar.slowTimer = Math.max(0, state.jaguar.slowTimer - dt);
        speedMult = 0.4;
      }
      if (state.jaguar.burnTimer > 0) {
        state.jaguar.burnTimer = Math.max(0, state.jaguar.burnTimer - dt);
        state.jaguar.hp = Math.max(0, state.jaguar.hp - (18 / 3) * dt);
        if (Math.random() < 0.3) spawnParticles(jpos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xf97316, 2);
        if (state.jaguar.hp <= 0) {
          defeatJaguar("player");
          return;
        }
      }

      const jagSpeed = 4.6 * speedMult;
      if (dist > 1.3) {
        const b = getFarmBounds();
        jpos.x = THREE.MathUtils.clamp(jpos.x + (dx / dist) * jagSpeed * dt, b.minX, b.maxX);
        jpos.z = THREE.MathUtils.clamp(jpos.z + (dz / dist) * jagSpeed * dt, -28.5, 28.5);
      }
      jaguarEntity.mesh.rotation.y = Math.atan2(dx, dz);
      jpos.y = THREE.MathUtils.lerp(jpos.y, getYardEntityFloorY(jpos.x, jpos.z), 10 * dt);
      // Animação de corrida e flash ao levar enxadada
      const runCycle = Math.sin(state.animTime * 15 * speedMult);
      jaguarEntity.legs[0].rotation.x = runCycle * 0.65;
      jaguarEntity.legs[3].rotation.x = runCycle * 0.65;
      jaguarEntity.legs[1].rotation.x = -runCycle * 0.65;
      jaguarEntity.legs[2].rotation.x = -runCycle * 0.65;
      jaguarEntity.tail.rotation.y = Math.sin(state.animTime * 12) * 0.35;
      if (state.jaguar.hitFlash > 0) {
        state.jaguar.hitFlash = Math.max(0, state.jaguar.hitFlash - dt);
        jaguarEntity.bodyMat.emissive.setHex(0xef4444);
        jaguarEntity.bodyMat.emissiveIntensity = 0.7;
      } else if (state.jaguar.slowTimer > 0) {
        jaguarEntity.bodyMat.emissive.setHex(0x0ea5e9);
        jaguarEntity.bodyMat.emissiveIntensity = 0.5;
      } else if (state.jaguar.burnTimer > 0) {
        jaguarEntity.bodyMat.emissive.setHex(0xea580c);
        jaguarEntity.bodyMat.emissiveIntensity = 0.45;
      } else {
        jaguarEntity.bodyMat.emissive.setHex(0x000000);
        jaguarEntity.bodyMat.emissiveIntensity = 0;
      }
      // Ataque da Onça (em animais, na onça domada ou no Alyffer)
      state.jaguar.attackCd = Math.max(0, state.jaguar.attackCd - dt);
      if (targetType !== "roam" && state.jaguar.attackCd <= 0) {
        const hitAnimal = targetType === "animal" && targetEnt && dist <= 1.75;
        const hitTamed = !hitAnimal && tamedActive && tamedDist <= 2.35 && (targetType === "tamed" || tamedDist <= playerDist);
        const hitPlayer = !hitAnimal && !hitTamed && targetType === "player" && playerDist <= 1.85;
        if (hitAnimal || hitTamed || hitPlayer) {
          state.jaguar.attackCd = 1.35;
          sfx.play("roar");
          if (hitAnimal) {
            const a = targetEnt.animal;
            a.hp = Math.max(0, a.hp - 48);
            spawnParticles(targetEnt.mesh.position.clone().add(new THREE.Vector3(0, 1.1, 0)), 0xef4444, 14);
            if (a.hp <= 0) {
              killAnimal(targetEnt);
            } else {
              const info = ANIMAL_TYPES[a.type];
              showToast("🐆", `ONÇA ATACANDO ${a.name.toUpperCase()}!`, `${info.emoji} ${a.name}: ${a.hp}/${info.maxHp} HP • Defenda com a Enxada!`);
            }
          } else if (hitTamed) {
            damageTamedJaguar(28);
          } else {
            if (typeof triggerDamageFeedback === "function") triggerDamageFeedback(state.ridingJaguar ? 0.28 : 0.45);
            if (state.ridingJaguar) {
              damageTamedJaguar(24);
              state.playerHp = Math.max(0, state.playerHp - 12);
            } else {
              state.playerHp = Math.max(0, state.playerHp - 25);
              spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xef4444, 16);
              showToast("🐆", "ARRANHÃO DA ONÇA!", `Você perdeu 25 HP! Vida: ${state.playerHp}/${state.maxHp} • Use a Enxada na Hotbar (1–9)!`);
            }
            updateHUD();
            if (state.playerHp <= 0) {
              triggerPlayerDeath("jaguar");
              return;
            }
          }
        }
      }
    }

    // Marcelo Segurança: patrulha a fazenda e caça a Onça
    if (marceloYardEntity && state.marceloHired) {
      const mm = marceloYardEntity;
      mm.mesh.visible = true;
      let tgt;
      let running = false;
      if (state.jaguar.active && jaguarEntity) {
        tgt = jaguarEntity.mesh.position;
        running = true;
      } else {
        if (mm.wait > 0) {
          mm.wait -= dt;
          if (mm.wait <= 0) {
            const b = getFarmBounds();
            mm.target.set(
              THREE.MathUtils.clamp(mm.home.x + (Math.random() - 0.5) * 28, b.minX + 1, b.maxX - 1),
              0,
              THREE.MathUtils.clamp(mm.home.z + (Math.random() - 0.5) * 28, -27, 27)
            );
          }
        }
        tgt = mm.target;
      }
      const mdx = tgt.x - mm.mesh.position.x;
      const mdz = tgt.z - mm.mesh.position.z;
      const md = Math.hypot(mdx, mdz) || 0.01;
      const mSpeed = running ? 5.6 : 2.4;
      if (md > (running ? 1.8 : 0.3)) {
        mm.mesh.position.x += (mdx / md) * mSpeed * dt;
        mm.mesh.position.z += (mdz / md) * mSpeed * dt;
        mm.mesh.position.y = Math.abs(Math.sin(state.animTime * (running ? 15 : 9))) * 0.05;
        mm.mesh.rotation.y = Math.atan2(mdx, mdz);
        const sw = Math.sin(state.animTime * (running ? 15 : 9)) * 0.62;
        mm.lLeg.rotation.x = sw;
        mm.rLeg.rotation.x = -sw;
        mm.lArm.rotation.x = -sw * 0.85;
      } else {
        mm.mesh.position.y = THREE.MathUtils.lerp(mm.mesh.position.y, getYardEntityFloorY(mm.mesh.position.x, mm.mesh.position.z), 10 * dt);
        mm.lLeg.rotation.x = THREE.MathUtils.lerp(mm.lLeg.rotation.x, 0, 10 * dt);
        mm.rLeg.rotation.x = THREE.MathUtils.lerp(mm.rLeg.rotation.x, 0, 10 * dt);
        mm.lArm.rotation.x = THREE.MathUtils.lerp(mm.lArm.rotation.x, 0, 10 * dt);
        if (!running && mm.wait <= 0) {
          mm.wait = 2 + Math.random() * 3;
        }
      }
      mm.attackCd = Math.max(0, mm.attackCd - dt);
      if (mm.swingTimer > 0) {
        mm.swingTimer = Math.max(0, mm.swingTimer - dt);
        mm.rArm.rotation.x = -1.4 + Math.sin(mm.swingTimer * 22) * 0.7;
      } else {
        mm.rArm.rotation.x = THREE.MathUtils.lerp(mm.rArm.rotation.x, -0.2, 8 * dt);
      }
      if (running && md <= 2.3 && mm.attackCd <= 0 && state.jaguar.active) {
        mm.attackCd = 1.1;
        mm.swingTimer = 0.3;
        sfx.play("hit");
        damageJaguar(30, mm.mesh.position, 2.2);
        if (state.jaguar.hp <= 0) defeatJaguar("marcelo");
        updateHUD();
      }
    }

    // Onça Domada: segue o Alyffer e defende a fazenda (ou fica caída/inativa se HP zerar)
    if (tamedJaguarEntity && state.hasTamedJaguar) {
      const tj = tamedJaguarEntity;
      tj.mesh.visible = true;
      if (state.tamedJaguarDown) {
        tj.mesh.rotation.z = Math.PI / 2;
        tj.mesh.position.y = 0.45;
        for (const lg of tj.legs || []) lg.rotation.x = 0;
        if (tj.tail) tj.tail.rotation.y = 0;
        state.tamedJaguarRecoverTimer = Math.max(0, state.tamedJaguarRecoverTimer - dt);
        if (state.tamedJaguarRecoverTimer <= 0) {
          state.tamedJaguarDown = false;
          state.tamedJaguarHp = Math.round((state.tamedJaguarMaxHp || 120) * 0.5);
          tj.mesh.rotation.z = 0;
          tj.mesh.position.y = 0;
          updateHUD();
          showToast("🐆", "ONÇA SE RECUPEROU!", `Ela levantou com ${state.tamedJaguarHp}/${state.tamedJaguarMaxHp || 120} HP!`);
        }
      } else if (!state.ridingJaguar) {
        setJagTagVisible(tj, true);
        tj.mesh.rotation.z = 0;
        let tgt = player.pos;
        let hunting = false;
        if (state.jaguar.active && jaguarEntity) {
          tgt = jaguarEntity.mesh.position;
          hunting = true;
        }
        const tdx = tgt.x - tj.mesh.position.x;
        const tdz = tgt.z - tj.mesh.position.z;
        const td = Math.hypot(tdx, tdz) || 0.01;
        const followDist = hunting ? 1.7 : 3.2;
        if (td > followDist) {
          const sp = hunting ? 6.2 : td > 8 ? 6.5 : 3.6;
          tj.mesh.position.x += (tdx / td) * sp * dt;
          tj.mesh.position.z += (tdz / td) * sp * dt;
          tj.mesh.rotation.y = Math.atan2(tdx, tdz);
          const gallop = Math.sin(state.animTime * (sp > 5 ? 15 : 10)) * 0.62;
          tj.mesh.position.y = getYardEntityFloorY(tj.mesh.position.x, tj.mesh.position.z) + Math.abs(gallop) * 0.05;
          if (tj.legs && tj.legs.length === 4) {
            tj.legs[0].rotation.x = gallop;
            tj.legs[3].rotation.x = gallop;
            tj.legs[1].rotation.x = -gallop;
            tj.legs[2].rotation.x = -gallop;
          }
          if (tj.tail) tj.tail.rotation.y = Math.sin(state.animTime * 11) * 0.32;
        } else {
          tj.mesh.position.y = THREE.MathUtils.lerp(tj.mesh.position.y, getYardEntityFloorY(tj.mesh.position.x, tj.mesh.position.z), 10 * dt);
          if (tj.legs) {
            tj.legs.forEach((lg) => {
              lg.rotation.x = THREE.MathUtils.lerp(lg.rotation.x, 0, 10 * dt);
            });
          }
          if (tj.tail) tj.tail.rotation.y = Math.sin(state.animTime * 3.5) * 0.18;
        }
        tj.attackCd = Math.max(0, tj.attackCd - dt);
        if (hunting && td <= 2.0 && tj.attackCd <= 0 && state.jaguar.active) {
          tj.attackCd = 1.25;
          sfx.play("roar");
          damageJaguar(22, tj.mesh.position, 2.0);
          if (state.jaguar.hp <= 0) defeatJaguar("tamed");
          updateHUD();
        }
      }
    }

    // Animais pastando
    livestockEntities.forEach((ent) => {
      const a = ent.animal;
      if (ent.woolGroup) ent.woolGroup.visible = !a.sheared;
      ent.mesh.scale.setScalar(a.isBaby ? 0.65 : 1);
      ent.readyHalo.visible = !!a.hasProduct;
      if (a.hasProduct) {
        ent.readyHalo.rotation.y += 2.4 * dt;
        ent.readyHalo.position.y = 2.25 + Math.sin(state.animTime * 3 + a.id) * 0.12;
      }
      const pen = getAnimalPenBounds(a.type);
      // Foge da Onça se ela estiver perto (dentro do próprio cercado)!
      let fleeing = false;
      if (state.jaguar.active && jaguarEntity && distXZ(ent.mesh.position, jaguarEntity.mesh.position) < 7) {
        fleeing = true;
        const fx = ent.mesh.position.x - jaguarEntity.mesh.position.x;
        const fz = ent.mesh.position.z - jaguarEntity.mesh.position.z;
        const fl = Math.hypot(fx, fz) || 1;
        ent.target.set(
          THREE.MathUtils.clamp(ent.mesh.position.x + (fx / fl) * 4, pen.minX, pen.maxX),
          0,
          THREE.MathUtils.clamp(ent.mesh.position.z + (fz / fl) * 4, pen.minZ, pen.maxZ)
        );
        ent.wait = 0;
      }
      if (ent.wait > 0) {
        ent.wait -= dt;
        ent.legs.forEach((leg) => {
          leg.rotation.x = THREE.MathUtils.lerp(leg.rotation.x, 0, 10 * dt);
        });
        if (ent.head) {
          ent.head.rotation.x = THREE.MathUtils.lerp(
            ent.head.rotation.x,
            0.16 + Math.sin(state.animTime * 2.6 + a.id) * 0.1,
            6 * dt
          );
        }
        if (ent.wait <= 0) {
          ent.target.set(
            pen.minX + Math.random() * (pen.maxX - pen.minX),
            0,
            pen.minZ + Math.random() * (pen.maxZ - pen.minZ)
          );
        }
      } else {
        const adx = ent.target.x - ent.mesh.position.x;
        const adz = ent.target.z - ent.mesh.position.z;
        const ad = Math.hypot(adx, adz);
        if (ad < 0.25) {
          ent.wait = 2.5 + Math.random() * 4;
        } else {
          const sp = fleeing ? 3.4 : 1.1;
          ent.mesh.position.x = THREE.MathUtils.clamp(ent.mesh.position.x + (adx / ad) * sp * dt, pen.minX, pen.maxX);
          ent.mesh.position.z = THREE.MathUtils.clamp(ent.mesh.position.z + (adz / ad) * sp * dt, pen.minZ, pen.maxZ);
          a.x = ent.mesh.position.x;
          a.z = ent.mesh.position.z;
          ent.mesh.rotation.y = Math.atan2(adx, adz);
          if (ent.head) ent.head.rotation.x = THREE.MathUtils.lerp(ent.head.rotation.x, 0, 8 * dt);
          const lc = Math.sin(state.animTime * (fleeing ? 14 : 7)) * 0.45;
          ent.legs.forEach((leg, i) => (leg.rotation.x = i % 3 === 0 ? lc : -lc));
        }
      }
    });
  } else {
    // Se sair do quintal, a Onça recua para a mata
    if (state.jaguar.active && jaguarEntity) {
      state.jaguar.active = false;
      state.jaguar.spawnCooldown = 110;
      jaguarEntity.mesh.visible = false;
    }
  }

  // Física da Bola de Basquete 3D na Quadra Aberta da ETECAMP (drible + arremesso na cesta isolada!)
  if (state.location === "etec" && etecBall && etecBall.mesh) {
    const bPos = etecBall.mesh.position;
    if (etecBall.scoredCd > 0) etecBall.scoredCd = Math.max(0, etecBall.scoredCd - dt);
    const groundY = bPos.x < 15.5 ? 0.385 : 0.405;
    const bdx = bPos.x - player.pos.x;
    const bdz = bPos.z - player.pos.z;
    const bDist = Math.hypot(bdx, bdz);
    if (bDist < 0.88 && bPos.y < groundY + 0.55 && player.jumpOffset < 0.65) {
      const nx = bDist > 0.02 ? bdx / bDist : Math.sin(player.facingYaw);
      const nz = bDist > 0.02 ? bdz / bDist : Math.cos(player.facingYaw);
      const pushSpeed = moving ? (state.vaselinaTimer > 0 ? 10.5 : 7.5) : 3.8;
      if (Math.hypot(etecBall.vx, etecBall.vz) < 1.8) sfx.play("phone_tap");
      etecBall.vx = nx * pushSpeed;
      etecBall.vz = nz * pushSpeed;
      etecBall.vy = Math.max(etecBall.vy, moving ? 2.5 : 1.4);
      bPos.x = player.pos.x + nx * 0.90;
      bPos.z = player.pos.z + nz * 0.90;
    }

    const speedH = Math.hypot(etecBall.vx, etecBall.vz);
    const airborne = bPos.y > groundY + 0.005 || Math.abs(etecBall.vy) > 0.04;
    if (speedH > 0.02 || airborne) {
      if (airborne) {
        etecBall.vy -= 18.5 * dt;
        bPos.y += etecBall.vy * dt;
      }
      bPos.x += etecBall.vx * dt;
      bPos.z += etecBall.vz * dt;
      etecBall.mesh.rotation.x += etecBall.vz * dt * 3.1;
      etecBall.mesh.rotation.z -= etecBall.vx * dt * 3.1;

      if (bPos.y <= groundY) {
        bPos.y = groundY;
        if (etecBall.vy < -1.15) {
          etecBall.vy = -etecBall.vy * 0.56;
          sfx.play("phone_tap");
        } else {
          etecBall.vy = 0;
        }
        const damp = Math.exp(-2.1 * dt);
        etecBall.vx *= damp;
        etecBall.vz *= damp;
        if (speedH < 0.05) {
          etecBall.vx = 0;
          etecBall.vz = 0;
        }
      }

      // Rebote direto na parede do prédio onde a rede está colada (x = 11.0)!
      if (bPos.x < 11.28) {
        bPos.x = 11.28;
        etecBall.vx = Math.abs(etecBall.vx) * 0.62;
      }

      // Cesta! Bola descendo pelo aro colado na parede
      const rimDist = Math.hypot(bPos.x - ETEC_HOOP_RIM.x, bPos.z - ETEC_HOOP_RIM.z);
      if (etecBall.vy < 0 && etecBall.scoredCd <= 0 && rimDist < 0.52 && Math.abs(bPos.y - ETEC_HOOP_RIM.y) < 0.54) {
        etecBall.scoredCd = 1.6;
        etecBall.vx = 0.85;
        etecBall.vz *= 0.2;
        sfx.play("goal");
        spawnParticles(ETEC_HOOP_RIM.clone(), 0xf97316, 24);
        spawnParticles(ETEC_HOOP_RIM.clone(), 0xfacc15, 16);
        spawnFloatingText(ETEC_HOOP_RIM, "🏀 CESTA!!", "#f97316");
        if (!state.goalScoredToday) {
          state.goalScoredToday = true;
          state.money += 10;
          state.insanity = Math.max(0, state.insanity - 10);
          if (state.insanity < 100) state.isCrazy = false;
          showDayBanner("🏀 CESTA NA QUADRA DA ETECAMP! +R$ 10 & -10% INSANIDADE!");
          if (typeof trackGoalProgress === "function") trackGoalProgress("hoop", 1);
          updateHUD();
          saveGame();
        }
      }

      if (bPos.x < 11.28) {
        bPos.x = 11.28;
        etecBall.vx = Math.abs(etecBall.vx) * 0.68;
      } else if (bPos.x > 30.6) {
        bPos.x = 30.6;
        etecBall.vx = -Math.abs(etecBall.vx) * 0.68;
      }
      if (bPos.z < -3.05) {
        bPos.z = -3.05;
        etecBall.vz = Math.abs(etecBall.vz) * 0.68;
      } else if (bPos.z > 15.45) {
        bPos.z = 15.45;
        etecBall.vz = -Math.abs(etecBall.vz) * 0.68;
      }
    }
  }

  // Menino Maluquinho no Terminal à Noite (>= 18:30): persegue e atormenta o Alyffer!
  const MALUQUINHO_LINES = [
    "OI MOÇO!! TEM JOGUINHO NO SEU CELULAR?! HEHEHE!!",
    "A PANELA NA MINHA CABEÇA TÁ PEGANDO WI-FI DO TERMINAL!!",
    "EI ALYFFER!! VAI PERDER O ÔNIBUS 402!! KKKKKKK!!",
    "MOÇO, ME DÁ UMA ALFACE E R$ 2 PRO PASTEL?! POR FAVORZINHOOO!!",
    "PÓ-PÓ-PÓ!! TÔ TE PERSEGUINDO ATÉ A LINHA 7-RUBI!!",
    "VOCÊ É O MACHO DE PAU ARCADO?! DEIXA EU MEXER NA SUA CESTA!!",
  ];
  const isNightTerminal = state.location === "terminal" && (state.dayMinutes >= 18.5 * 60 || state.dayMinutes < 5.5 * 60);
  if (isNightTerminal && maluquinhoEntity) {
    if (!state.maluquinho.active) {
      state.maluquinho.active = true;
      const sx = player.pos.x > -4 ? -15.5 : 4.5;
      const sz = player.pos.z > 2 ? -5.0 : 9.5;
      maluquinhoEntity.mesh.position.set(sx, getFloorYAt(sx, sz), sz);
      maluquinhoEntity.mesh.visible = true;
      state.maluquinho.tormentCd = 1.2;
      state.maluquinho.bubbleTimer = 0;
      if (!state.maluquinho.announced) {
        state.maluquinho.announced = true;
        sfx.play("maluquinho");
        showDayBanner("🍲 CUIDADO! O MENINO MALUQUINHO APARECEU NO TERMINAL À NOITE!");
        showToast("🍲", "MENINO MALUQUINHO!", "Ele está te perseguindo e atormentando no Terminal! Pegue o 402 ou o trem!");
      }
    }
    const mx = maluquinhoEntity.mesh.position.x;
    const mz = maluquinhoEntity.mesh.position.z;
    const dx = player.pos.x - mx;
    const dz = player.pos.z - mz;
    const dist = Math.hypot(dx, dz) || 0.01;

    if (maluquinhoEntity.ragdoll) {
      // Ragdoll após levar chute (com colisão sólida nos obstáculos do Terminal!)
      maluquinhoEntity.ragdollTimer -= dt;
      maluquinhoEntity.vel.y -= 23.0 * dt;
      maluquinhoEntity.mesh.position.x = THREE.MathUtils.clamp(mx + maluquinhoEntity.vel.x * dt, -36.5, 20.4);
      maluquinhoEntity.mesh.position.z = THREE.MathUtils.clamp(mz + maluquinhoEntity.vel.z * dt, -25.5, 22.5);
      maluquinhoEntity.mesh.position.y += maluquinhoEntity.vel.y * dt;

      if (resolveEntityObstacles(maluquinhoEntity.mesh.position, 0.52, terminalObstacles, maluquinhoEntity.vel, 0)) {
        maluquinhoEntity.angVel.multiplyScalar(-0.65);
      }

      const floorNow = getFloorYAt(maluquinhoEntity.mesh.position.x, maluquinhoEntity.mesh.position.z);
      if (maluquinhoEntity.mesh.position.y <= floorNow + 0.32) {
        maluquinhoEntity.mesh.position.y = floorNow + 0.32;
        if (Math.abs(maluquinhoEntity.vel.y) > 1.8) {
          maluquinhoEntity.vel.y = Math.abs(maluquinhoEntity.vel.y) * 0.42;
          sfx.play("dig");
        } else {
          maluquinhoEntity.vel.y = 0;
        }
        maluquinhoEntity.vel.x *= Math.pow(0.08, dt);
        maluquinhoEntity.vel.z *= Math.pow(0.08, dt);
        maluquinhoEntity.angVel.multiplyScalar(Math.pow(0.06, dt));
      }

      if (maluquinhoEntity.bodyGroup) {
        maluquinhoEntity.bodyGroup.rotation.x += maluquinhoEntity.angVel.x * dt;
        maluquinhoEntity.bodyGroup.rotation.z += maluquinhoEntity.angVel.z * dt;
      }
      const mFlail = Math.sin(state.animTime * 26);
      maluquinhoEntity.lArm.rotation.x = mFlail * 1.4;
      maluquinhoEntity.rArm.rotation.x = -mFlail * 1.4;
      maluquinhoEntity.lLeg.rotation.x = -mFlail * 1.1;
      maluquinhoEntity.rLeg.rotation.x = mFlail * 1.1;

      if (maluquinhoEntity.ragdollTimer <= 0 && maluquinhoEntity.vel.lengthSq() < 1.2) {
        maluquinhoEntity.ragdoll = false;
        maluquinhoEntity.vel.set(0, 0, 0);
        maluquinhoEntity.angVel.set(0, 0, 0);
        if (maluquinhoEntity.bodyGroup) maluquinhoEntity.bodyGroup.rotation.set(0, 0, 0);
        maluquinhoEntity.mesh.position.y = floorNow;
      }
    } else {
      const chaseSpeed = 5.4;
      const maluRunning = dist > 1.7;
      if (maluRunning) {
        const nx = THREE.MathUtils.clamp(mx + (dx / dist) * chaseSpeed * dt, -36.5, 20.4);
        const nz = THREE.MathUtils.clamp(mz + (dz / dist) * chaseSpeed * dt, -25.5, 22.5);
        maluquinhoEntity.mesh.position.x = nx;
        maluquinhoEntity.mesh.position.z = nz;
        resolveEntityObstacles(maluquinhoEntity.mesh.position, 0.52, terminalObstacles, null, 0);
        maluquinhoEntity.mesh.position.y = getFloorYAt(maluquinhoEntity.mesh.position.x, maluquinhoEntity.mesh.position.z);
      }
      const targetMaluYaw = Math.atan2(dx, dz);
      let mDiff = targetMaluYaw - maluquinhoEntity.mesh.rotation.y;
      while (mDiff > Math.PI) mDiff -= Math.PI * 2;
      while (mDiff < -Math.PI) mDiff += Math.PI * 2;
      maluquinhoEntity.mesh.rotation.y += mDiff * Math.min(1, 10 * dt);

      // Animação articulada fluida do Menino Maluquinho (corrida real com braços/pernas em oposição + panela balançando!)
      const baseFloor = getFloorYAt(maluquinhoEntity.mesh.position.x, maluquinhoEntity.mesh.position.z);
      if (maluRunning) {
        const mStride = Math.sin(state.animTime * 14);
        maluquinhoEntity.mesh.position.y = baseFloor + Math.abs(mStride) * 0.11;
        if (maluquinhoEntity.bodyGroup) {
          maluquinhoEntity.bodyGroup.rotation.x = THREE.MathUtils.lerp(maluquinhoEntity.bodyGroup.rotation.x, 0.14, 10 * dt);
          maluquinhoEntity.bodyGroup.rotation.z = mStride * 0.05;
        }
        if (maluquinhoEntity.headGroup) {
          maluquinhoEntity.headGroup.rotation.y = Math.sin(state.animTime * 7) * 0.12;
          maluquinhoEntity.headGroup.rotation.x = -0.06;
        }
        maluquinhoEntity.potGroup.rotation.z = -0.18 + mStride * 0.12;
        maluquinhoEntity.lLeg.rotation.x = -mStride * 0.78;
        maluquinhoEntity.rLeg.rotation.x = mStride * 0.78;
        maluquinhoEntity.lArm.rotation.x = mStride * 0.82;
        maluquinhoEntity.rArm.rotation.x = -mStride * 0.82;
        maluquinhoEntity.lArm.rotation.z = 0.1;
        maluquinhoEntity.rArm.rotation.z = -0.1;
      } else {
        const hop = Math.abs(Math.sin(state.animTime * 10));
        maluquinhoEntity.mesh.position.y = baseFloor + hop * 0.18;
        if (maluquinhoEntity.bodyGroup) {
          maluquinhoEntity.bodyGroup.rotation.x = THREE.MathUtils.lerp(maluquinhoEntity.bodyGroup.rotation.x, 0, 10 * dt);
          maluquinhoEntity.bodyGroup.rotation.z = Math.sin(state.animTime * 10) * 0.06;
        }
        if (maluquinhoEntity.headGroup) {
          maluquinhoEntity.headGroup.rotation.y = Math.sin(state.animTime * 5) * 0.16;
          maluquinhoEntity.headGroup.rotation.x = -0.08;
        }
        maluquinhoEntity.potGroup.rotation.z = -0.18 + Math.sin(state.animTime * 12) * 0.15;
        maluquinhoEntity.lLeg.rotation.x = THREE.MathUtils.lerp(maluquinhoEntity.lLeg.rotation.x, -hop * 0.25, 12 * dt);
        maluquinhoEntity.rLeg.rotation.x = THREE.MathUtils.lerp(maluquinhoEntity.rLeg.rotation.x, -hop * 0.25, 12 * dt);
        maluquinhoEntity.lArm.rotation.x = -2.2 + Math.sin(state.animTime * 14) * 0.35;
        maluquinhoEntity.rArm.rotation.x = -2.2 - Math.sin(state.animTime * 14) * 0.35;
        maluquinhoEntity.lArm.rotation.z = 0.28;
        maluquinhoEntity.rArm.rotation.z = -0.28;
      }
    }

    state.maluquinho.bubbleTimer -= dt;
    if (state.maluquinho.bubbleTimer <= 0) {
      state.maluquinho.bubbleTimer = 3.2;
      state.maluquinho.currentLine = MALUQUINHO_LINES[Math.floor(Math.random() * MALUQUINHO_LINES.length)];
      if (maluquinhoBubbleText) maluquinhoBubbleText.textContent = `"${state.maluquinho.currentLine}"`;
    }
    if (maluquinhoBubble) {
      maluquinhoBubble.classList.remove("hidden");
      headProjVec.set(
        maluquinhoEntity.mesh.position.x,
        maluquinhoEntity.mesh.position.y + 3.25,
        maluquinhoEntity.mesh.position.z
      );
      headProjVec.project(camera);
      const halfPad = Math.min(155, Math.max(85, window.innerWidth * 0.34));
      const sx = THREE.MathUtils.clamp((headProjVec.x * 0.5 + 0.5) * window.innerWidth, halfPad, window.innerWidth - halfPad);
      const sy = THREE.MathUtils.clamp((-headProjVec.y * 0.5 + 0.5) * window.innerHeight, 92, Math.max(100, window.innerHeight - 150));
      maluquinhoBubble.style.left = `${sx}px`;
      maluquinhoBubble.style.top = `${sy}px`;
    }

    // Atormentando o Alyffer quando chega perto!
    state.maluquinho.tormentCd = Math.max(0, state.maluquinho.tormentCd - dt);
    if (!maluquinhoEntity.ragdoll && dist < 2.8 && state.maluquinho.tormentCd <= 0) {
      state.maluquinho.tormentCd = 2.4;
      sfx.play("maluquinho");
      spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0x38bdf8, 10);
      addInsanity(8, false);
      spawnFloatingText(player.pos, "🍲 +8% Insanidade", "#f97316");
    }
  } else {
    if (state.maluquinho.active) {
      state.maluquinho.active = false;
      state.maluquinho.announced = false;
      if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;
    }
    if (maluquinhoBubble) maluquinhoBubble.classList.add("hidden");
  }

  // Botão secundário "Chutar" aparece perto do Orelha (Sítio) OU do Menino Maluquinho (Terminal)
  if (kickDogBtn) {
    const nearOrelha = state.location === "yard" && dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 3.0;
    const nearMalu =
      state.location === "terminal" &&
      state.maluquinho.active &&
      maluquinhoEntity &&
      !maluquinhoEntity.ragdoll &&
      distXZ(player.pos, maluquinhoEntity.mesh.position) < 3.4;
    kickDogBtn.classList.toggle("hidden", !(nearOrelha || nearMalu));
    const kickLbl = kickDogBtn.querySelector(".kick-label");
    if (kickLbl) {
      kickLbl.textContent = nearMalu ? "🦵 Chutar o Maluquinho" : "🦵 Chutar o Orelha";
    }
  }

  // Update Context Prompt only when changed
  const ctx = findCurrentContext();
  if (typeof quickBuySeedBtn !== "undefined" && quickBuySeedBtn) {
    const heldNow = typeof getHeldItem === "function" ? getHeldItem() : null;
    const showQuickSeed =
      state.mode === "playing" &&
      state.location === "yard" &&
      ctx &&
      ctx.type === "plot" &&
      ctx.plot &&
      ctx.plot.stage === "tilled" &&
      !(heldNow && heldNow.seedCropId);
    quickBuySeedBtn.classList.toggle("hidden", !showQuickSeed);
  }
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

  if (state.location === "etec_inside") {
    for (let i = 0; i < classroomFans.length; i++) {
      classroomFans[i].rotation.x += 12 * dt;
    }
    for (let i = 0; i < etecNpcs.length; i++) {
      const npc = etecNpcs[i];
      const down = isNpcKnockedOut(npc.id);
      npc.mesh.rotation.z = THREE.MathUtils.lerp(npc.mesh.rotation.z, down ? Math.PI / 2 : 0, Math.min(1, 10 * dt));
      npc.mesh.position.y = THREE.MathUtils.lerp(npc.mesh.position.y, down ? 0.42 : 0, Math.min(1, 10 * dt));
      if (!down && npc.mesh.userData && npc.mesh.userData.headGroup) {
        const phase = state.animTime * 2.0 + i * 1.3;
        npc.mesh.userData.headGroup.rotation.y = Math.sin(phase * 0.7) * 0.08;
        npc.mesh.userData.headGroup.rotation.x = Math.sin(phase) * 0.03;
      }
    }
  }

  // Portão automático do estacionamento da ETECAMP + Sala de Automação (teto, robô e esteira!)
  if (state.location === "etec") {
    if (etecAutoGateMesh && etecAutoGateCollider) {
      const distGate = Math.hypot(player.pos.x - -24.0, player.pos.z - 20.0);
      const targetOpen = distGate < 6.0 ? 1 : 0;
      etecAutoGateOpen += (targetOpen - etecAutoGateOpen) * Math.min(1, dt * 4.5);
      const gateX = -24.0 - etecAutoGateOpen * 7.2;
      etecAutoGateMesh.position.x = gateX;
      etecAutoGateCollider.minX = gateX - 4.0;
      etecAutoGateCollider.maxX = gateX + 4.0;
      if (etecAutoGateLightMat) {
        const isOpen = etecAutoGateOpen > 0.25;
        etecAutoGateLightMat.color.setHex(isOpen ? 0x22c55e : 0xef4444);
        etecAutoGateLightMat.emissive.setHex(isOpen ? 0x22c55e : 0xef4444);
      }
    }
    if (etecAutoRoofGroup) {
      const insideAuto =
        player.pos.x >= 16.2 && player.pos.x <= 32.8 && player.pos.z >= -27.2 && player.pos.z <= -14.2;
      etecAutoRoofGroup.visible = !insideAuto;
    }
    if (etecRobotPivot && etecRobotArm) {
      etecRobotPivot.rotation.y = Math.sin(state.animTime * 1.25) * 1.15;
      etecRobotArm.rotation.x = 0.16 + Math.sin(state.animTime * 2.5) * 0.24;
    }
    if (etecConveyorBoxes.length > 0) {
      for (let i = 0; i < etecConveyorBoxes.length; i++) {
        const crate = etecConveyorBoxes[i];
        crate.position.z += 1.35 * dt;
        if (crate.position.z > -17.9) {
          crate.position.z = -23.6;
        }
      }
    }
  }

  if (jessyEntity && state.location === "yard") {
    const t = state.animTime;
    if (jessyEntity.lArm) jessyEntity.lArm.rotation.x = -0.35 + Math.sin(t * 2.6) * 0.25;
    if (jessyEntity.rArm) jessyEntity.rArm.rotation.x = -0.45 + Math.cos(t * 3.1) * 0.3;
    if (jessyEntity.headGroup) {
      jessyEntity.headGroup.rotation.y = Math.sin(t * 0.55) * 0.12;
      jessyEntity.headGroup.rotation.x = 0;
    }
    if (jessyEntity.ripple1 && jessyEntity.ripple2) {
      const r1 = 0.85 + ((t * 0.55) % 1) * 0.75;
      const r2 = 0.85 + (((t * 0.55) + 0.5) % 1) * 0.75;
      jessyEntity.ripple1.scale.setScalar(r1);
      jessyEntity.ripple1.material.opacity = Math.max(0, 0.72 * (1 - ((t * 0.55) % 1)));
      jessyEntity.ripple2.scale.setScalar(r2);
      jessyEntity.ripple2.material.opacity = Math.max(0, 0.62 * (1 - (((t * 0.55) + 0.5) % 1)));
    }
  }

  if (sprinklerGroup && sprinklerGroup.visible && state.location === "yard") {
    const spinSpeed = state.upgrades.autoWaterLevel >= 2 ? 7.0 : 4.2;
    sprinklerHeads.forEach((sh) => {
      if ((sh.landReq || 0) <= (state.landLevel || 0)) {
        sh.head.rotation.y += spinSpeed * dt;
      }
    });
  }

  if (rainGroup.visible && rainInstancedMesh) {
    for (let i = 0; i < rainDrops.length; i++) {
      const d = rainDrops[i];
      d.y -= 26 * dt;
      if (d.y < 0) d.y = 18 + Math.random() * 4;
      _rainDummy.position.set(d.x, d.y, d.z);
      _rainDummy.updateMatrix();
      rainInstancedMesh.setMatrixAt(i, _rainDummy.matrix);
    }
    rainInstancedMesh.instanceMatrix.needsUpdate = true;
  }
  if (typeof sfx !== "undefined" && typeof sfx.updateAmbient === "function") {
    const isNightNow = state.dayMinutes < 6 * 60 || state.dayMinutes >= 18.5 * 60;
    sfx.updateAmbient(dt, state.location, state.isRainy && gameSettings.rainEnabled, isNightNow, state.mode === "playing");
  }
  if (typeof updateMinimap === "function") {
    updateMinimap(dt);
  }

  // Tampa articulada do Baú do Sítio (abre suavemente quando chestModal está aberto!)
  if (yardChestLidPivot && state.location === "yard") {
    const chestOpen = chestModal && !chestModal.classList.contains("hidden");
    const targetLidRot = chestOpen ? -1.15 : 0;
    yardChestLidPivot.rotation.x = THREE.MathUtils.lerp(yardChestLidPivot.rotation.x, targetLidRot, Math.min(1, 10 * dt));
  }

  // Física e impacto das Balas de Escopeta (6 chumbos por disparo — alto dano contra Onça, Jacaré e ragdoll!)
  if (shotgunPellets.length > 0) {
    const curObs =
      state.location === "room"
        ? interiorObstacles
        : state.location === "basement"
          ? basementObstacles
          : state.location === "terminal"
            ? terminalObstacles
            : state.location === "etec"
              ? etecObstacles
              : state.location === "etec_inside"
                ? etecInsideObstacles
                : obstacles;

    for (let i = shotgunPellets.length - 1; i >= 0; i--) {
      const pel = shotgunPellets[i];
      pel.life -= dt;
      if (pel.location !== state.location || pel.life <= 0) {
        scene.remove(pel.mesh);
        shotgunPellets.splice(i, 1);
        continue;
      }

      // Sub-stepping (2 passos) para projétil rápido nunca atravessar alvos/paredes finas!
      let hit = false;
      const subDt = dt * 0.5;
      for (let step = 0; step < 2 && !hit; step++) {
        pel.vel.y -= 4.0 * subDt;
        pel.mesh.position.addScaledVector(pel.vel, subDt);
        const pp = pel.mesh.position;
        const floorY = getFloorYAt(pp.x, pp.z);

        // 1) Acertou a Onça Pintada!
        if (state.location === "yard" && state.jaguar.active && jaguarEntity && distXZ(pp, jaguarEntity.mesh.position) < 1.35 && pp.y < 2.2) {
          hit = true;
          damageJaguar(pel.damage, pp, 1.4);
          spawnParticles(pp.clone(), 0xef4444, 6);
          if (state.jaguar.hp <= 0) defeatJaguar("player");
          break;
        }

        // 2) Acertou o Jacaré do Lago!
        if (state.location === "yard" && alligatorEntity && alligatorEntity.alive && distXZ(pp, alligatorEntity.mesh.position) < 1.45 && pp.y < 1.3) {
          hit = true;
          damageAlligator(pel.damage, pp, 1.2);
          spawnParticles(pp.clone(), 0x38bdf8, 6);
          break;
        }

        // 3) Acertou o Orelha (voa em ragdoll e fica bravo mais rápido, imortal!)
        if (state.location === "yard" && dogOrelha && distXZ(pp, dogOrelha.mesh.position) < 0.95 && pp.y < 1.4) {
          hit = true;
          if (!dogOrelha.ragdoll) {
            const dx = dogOrelha.mesh.position.x - player.pos.x;
            const dz = dogOrelha.mesh.position.z - player.pos.z;
            const d = Math.hypot(dx, dz) || 1;
            dogOrelha.vel.set((dx / d) * 18.0, 10.5, (dz / d) * 18.0);
            dogOrelha.angVel.set(14, 10, -12);
            dogOrelha.ragdoll = true;
            dogOrelha.ragdollTimer = 2.6;
            dogOrelha.kickCount = (dogOrelha.kickCount || 0) + 2;
            if (!dogOrelha.angry && dogOrelha.kickCount >= 3) dogOrelha.pendingAngry = true;
            sfx.play("bark");
          }
          spawnParticles(pp.clone(), 0xfacc15, 6);
          break;
        }

        // 4) Acertou o Menino Maluquinho (voa longe no ragdoll!)
        if (state.location === "terminal" && state.maluquinho.active && maluquinhoEntity && distXZ(pp, maluquinhoEntity.mesh.position) < 1.0 && pp.y < 2.6) {
          hit = true;
          if (!maluquinhoEntity.ragdoll) {
            const dx = maluquinhoEntity.mesh.position.x - player.pos.x;
            const dz = maluquinhoEntity.mesh.position.z - player.pos.z;
            const d = Math.hypot(dx, dz) || 1;
            maluquinhoEntity.vel.set((dx / d) * 18.0, 9.5, (dz / d) * 18.0);
            maluquinhoEntity.angVel.set(11, 10, -10);
            maluquinhoEntity.ragdoll = true;
            maluquinhoEntity.ragdollTimer = 2.8;
            state.maluquinho.tormentCd = 6.0;
            sfx.play("maluquinho");
          }
          spawnParticles(pp.clone(), 0x38bdf8, 8);
          break;
        }

        // 5) Acertou NPC da ETECAMP!
        if (state.location === "etec_inside") {
          for (let n = 0; n < etecNpcs.length; n++) {
            const npc = etecNpcs[n];
            if (distXZ(pp, npc.pos) < 0.85 && pp.y < 3.1) {
              hit = true;
              spawnParticles(pp.clone(), 0xfacc15, 6);
              break;
            }
          }
          if (hit) break;
        }

        // 6) Acertou parede / obstáculo
        for (let oi = 0; oi < curObs.length; oi++) {
          const o = curObs[oi];
          if (o.isActive && !o.isActive()) continue;
          if (pp.x > o.minX && pp.x < o.maxX && pp.z > o.minZ && pp.z < o.maxZ && pp.y < (o.jumpable ? 1.45 : 4.4)) {
            hit = true;
            spawnParticles(pp.clone(), 0xfde047, 5);
            break;
          }
        }
        if (hit) break;

        // 7) Acertou o chão
        if (pp.y <= floorY + 0.08) {
          pp.y = floorY + 0.08;
          hit = true;
          spawnParticles(pp.clone(), 0xd6b588, 5);
        }
      }

      if (hit) {
        scene.remove(pel.mesh);
        shotgunPellets.splice(i, 1);
      }
    }
  }

  // Física e impacto dos Ovos Jogados (3D projectile + splash de gema + chance de nascer pintinho!)
  if (thrownEggs.length > 0) {
    const curObs =
      state.location === "room"
        ? interiorObstacles
        : state.location === "basement"
          ? basementObstacles
          : state.location === "terminal"
            ? terminalObstacles
            : state.location === "etec"
              ? etecObstacles
              : state.location === "etec_inside"
                ? etecInsideObstacles
                : obstacles;

    for (let i = thrownEggs.length - 1; i >= 0; i--) {
      const eg = thrownEggs[i];
      eg.life -= dt;
      if (eg.location !== state.location || eg.life <= 0) {
        scene.remove(eg.mesh);
        thrownEggs.splice(i, 1);
        continue;
      }

      eg.vel.y -= 18.5 * dt;
      eg.mesh.position.addScaledVector(eg.vel, dt);
      eg.mesh.rotation.x += 12 * dt;
      eg.mesh.rotation.z += 8 * dt;

      const ep = eg.mesh.position;
      const floorY = getFloorYAt(ep.x, ep.z);
      let hit = false;
      let hitEntity = false;

      // 1) Acertou a Onça Pintada no sítio!
      if (state.location === "yard" && state.jaguar.active && jaguarEntity && distXZ(ep, jaguarEntity.mesh.position) < 1.35 && ep.y < 2.2) {
        hit = true;
        hitEntity = true;
        damageJaguar(12, ep, 2.2);
        if (state.jaguar.hp <= 0) {
          defeatJaguar("player");
        } else {
          showToast("🥚", "OVADA NA ONÇA!", `-12 HP na Onça Pintada! (${state.jaguar.hp}/${state.jaguar.maxHp} HP)`);
        }
      }

      // 1.5) Acertou o Jacaré no lago!
      if (!hit && state.location === "yard" && alligatorEntity && alligatorEntity.alive && distXZ(ep, alligatorEntity.mesh.position) < 1.35 && ep.y < 1.2) {
        hit = true;
        hitEntity = true;
        damageAlligator(10, ep, 1.8);
        spawnFloatingText(ep, "🥚 -10 HP 🐊", "#facc15");
      }

      // 2) Acertou Jessy no lago!
      if (!hit && state.location === "yard" && jessyEntity && distXZ(ep, jessyEntity.worldPos) < 1.15 && ep.y < 3.4) {
        hit = true;
        hitEntity = true;
        spawnFloatingText(ep, "🥚 SPLASH!", "#facc15");
      }

      // 3) Acertou Orelha no sítio!
      if (!hit && state.location === "yard" && dogOrelha && distXZ(ep, dogOrelha.mesh.position) < 1.0 && ep.y < 1.4) {
        hit = true;
        hitEntity = true;
        sfx.play("bark");
        spawnFloatingText(ep, "🐕 😋", "#facc15");
      }

      // 4) Acertou NPC da ETECAMP!
      if (!hit && state.location === "etec_inside") {
        for (let n = 0; n < etecNpcs.length; n++) {
          const npc = etecNpcs[n];
          if (distXZ(ep, npc.pos) < 0.95 && ep.y < 3.2) {
            hit = true;
            hitEntity = true;
            spawnFloatingText(ep, "🥚 SPLASH!", "#facc15");
            break;
          }
        }
      }

      // 5) Acertou animal da fazenda
      if (!hit && state.location === "yard" && livestockEntities.length > 0) {
        for (let k = 0; k < livestockEntities.length; k++) {
          const lv = livestockEntities[k];
          if (lv.animal && lv.animal.alive && distXZ(ep, lv.mesh.position) < 1.15 && ep.y < 1.8) {
            hit = true;
            hitEntity = true;
            spawnFloatingText(ep, "🥚 SPLASH!", "#facc15");
            break;
          }
        }
      }

      // 6) Acertou parede / obstáculo
      if (!hit) {
        for (let oi = 0; oi < curObs.length; oi++) {
          const o = curObs[oi];
          if (o.isActive && !o.isActive()) continue;
          if (ep.x > o.minX && ep.x < o.maxX && ep.z > o.minZ && ep.z < o.maxZ && ep.y < (o.jumpable ? 1.45 : 4.2)) {
            hit = true;
            break;
          }
        }
      }

      // 7) Acertou o chão
      if (!hit && ep.y <= floorY + 0.12) {
        ep.y = floorY + 0.12;
        hit = true;
      }

      if (hit) {
        sfx.play("egg_crack");
        spawnParticles(ep.clone(), 0xfacc15, 10);
        spawnParticles(ep.clone(), 0xfef3c7, 8);
        // Chance de 15% de nascer um pintinho quando o ovo quebra no quintal (igual Minecraft!)
        if (!hitEntity && state.location === "yard" && state.chickenCount < 12 && Math.random() < 0.15) {
          state.chickenCount = Math.min(12, state.chickenCount + 1);
          syncChickensToCount(state.chickenCount, 1);
          sfx.play("upgrade");
          showToast("🐣", "NASCEU UM PINTINHO!", `O ovo jogado chocou! Agora você tem ${state.chickenCount} galinhas!`);
          updateHUD();
          saveGame();
        }
        scene.remove(eg.mesh);
        thrownEggs.splice(i, 1);
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

const _camDesiredPos = new THREE.Vector3();
const _camLookDir = new THREE.Vector3();
const _camLookAt = new THREE.Vector3();
const _camTarget = new THREE.Vector3();
const _camGoalPos = new THREE.Vector3();

function updateCamera(dt, immediate = false) {
  if (state.mode === "start" && !immediate) {
    state.camYaw += 0.16 * dt;
  }

  if (state.firstPerson && state.mode !== "start") {
    playerMesh.visible = false;
    const baseEyeH = (state.activeTitle === "Airfryer" ? 1.25 : 2.25) + (state.ridingJaguar ? 0.37 : 0);
    const isMovingNow =
      state.mode === "playing" &&
      (keys["KeyW"] || keys["KeyS"] || keys["KeyA"] || keys["KeyD"] ||
       keys["ArrowUp"] || keys["ArrowDown"] || keys["ArrowLeft"] || keys["ArrowRight"] ||
       joyVec.lengthSq() > 0.01);
    const walkBob = isMovingNow && player.grounded && !state.ridingJaguar ? Math.sin(state.animTime * 10.5) * 0.032 : 0;
    const crazyBob = state.isCrazy && state.activeTitle !== "Airfryer" ? Math.sin(state.animTime * 14) * 0.035 : 0;

    let fpShakeX = 0, fpShakeY = 0;
    if (typeof camShakeTimer === "number" && camShakeTimer > 0 && state.mode === "playing") {
      camShakeTimer = Math.max(0, camShakeTimer - dt);
      const amp = camShakeIntensity * 0.35 * (camShakeTimer / 0.34);
      fpShakeX = (Math.random() - 0.5) * amp;
      fpShakeY = (Math.random() - 0.5) * amp;
    }

    // Posição e rotação 100% travadas ao jogador (zero lerp atrasado -> zero travamento ao andar!)
    camera.position.set(player.pos.x + fpShakeX, player.pos.y + baseEyeH + walkBob + crazyBob + fpShakeY, player.pos.z);
    camera.rotation.order = "YXZ";
    camera.rotation.set(state.fpPitch, state.camYaw, 0);

    // Braços em 1ª pessoa: gesto "6-7" quando Coringando, ou item segurado na Hotbar!
    const fpHeld = typeof getHeldItem === "function" ? getHeldItem() : null;
    fpCrazyArmsGroup.visible = state.isCrazy && state.activeTitle !== "Airfryer" && state.mode === "playing";
    fpToolGroup.visible = !state.isCrazy && state.activeTitle !== "Airfryer" && state.mode === "playing" && !!fpHeld;
    if (fpToolGroup.visible) {
      const isFpShotgun = fpHeld.id === "escopeta";
      fpToolGroup.userData.fpCan.visible = fpHeld.id === "regador";
      fpToolGroup.userData.fpHoe.visible = !!fpHeld.hoeId;
      if (fpToolGroup.userData.fpShotgunGroup) {
        fpToolGroup.userData.fpShotgunGroup.visible = isFpShotgun;
      }
      if (fpToolGroup.userData.fpHeldItem && typeof updateGenericHeldItemRig === "function") {
        if (fpHeld.id !== "regador" && !fpHeld.hoeId && !isFpShotgun) {
          updateGenericHeldItemRig(fpToolGroup.userData.fpHeldItem, fpHeld);
        } else {
          fpToolGroup.userData.fpHeldItem.visible = false;
        }
      }

      if (isFpShotgun && fpToolGroup.userData.fpShotgunGroup) {
        fpToolGroup.rotation.x = 0;
        const sgU = fpToolGroup.userData.fpShotgunGroup.userData;
        const gunPiv = sgU.fpGunPivot;
        const swayX = isMovingNow ? Math.cos(state.animTime * 8.5) * 0.016 : Math.sin(state.animTime * 1.8) * 0.004;
        const swayY = isMovingNow ? Math.abs(Math.sin(state.animTime * 8.5)) * 0.014 : Math.cos(state.animTime * 1.8) * 0.003;

        if (state.shotgunReloadPhase === "loading") {
          // Recarga cartucho por cartucho: inclina a escopeta, mão esquerda desce e empurra cartucho vermelho p/ dentro!
          const p = 1 - THREE.MathUtils.clamp(state.shotgunReloadTimer / 0.42, 0, 1);
          const push = Math.sin(p * Math.PI);
          gunPiv.position.set(swayX - 0.06, swayY - 0.03 + push * 0.015, 0.05);
          gunPiv.rotation.set(0.28 + push * 0.05, 0.22, -0.34);
          sgU.fpPump.position.z = sgU.pumpRestZ;
          sgU.fpLeftHandGrp.position.set(-0.04, -0.24 + push * 0.16, -0.06 - (1 - push) * 0.08);
          sgU.fpLeftHandGrp.rotation.set(0.35 - push * 0.25, 0.3, 0.2);
          sgU.fpLoadShell.visible = true;
          sgU.fpLoadShell.position.set(0, -0.18 + push * 0.16, -0.05);
        } else if (state.shotgunReloadPhase === "pump") {
          // Pump final ("chk-chk") após carregar os cartuchos!
          const p = 1 - THREE.MathUtils.clamp(state.shotgunReloadTimer / 0.38, 0, 1);
          const rack = Math.sin(p * Math.PI);
          gunPiv.position.set(swayX, swayY - rack * 0.015, rack * 0.03);
          gunPiv.rotation.set(rack * 0.08, 0.04, -0.06 * rack);
          sgU.fpPump.position.z = sgU.pumpRestZ + rack * 0.14;
          sgU.fpLeftHandGrp.position.set(
            sgU.leftHandRestPos.x,
            sgU.leftHandRestPos.y,
            sgU.leftHandRestPos.z + rack * 0.14
          );
          sgU.fpLeftHandGrp.rotation.set(0, 0, 0);
          sgU.fpLoadShell.visible = false;
        } else {
          // Mira 1ª pessoa com as duas mãos + recuo + pump pós-tiro!
          const recoil = state.shotgunRecoilTimer > 0 ? Math.sin((state.shotgunRecoilTimer / 0.24) * Math.PI) : 0;
          const postPump =
            state.shotgunRecoilTimer <= 0.04 && state.shotgunPumpTimer > 0
              ? Math.sin((state.shotgunPumpTimer / 0.36) * Math.PI)
              : 0;
          gunPiv.position.set(swayX, swayY + recoil * 0.035, recoil * 0.12 + postPump * 0.025);
          gunPiv.rotation.set(recoil * 0.26 + postPump * 0.06, 0, -postPump * 0.05);
          sgU.fpPump.position.z = sgU.pumpRestZ + postPump * 0.14;
          sgU.fpLeftHandGrp.position.set(
            sgU.leftHandRestPos.x,
            sgU.leftHandRestPos.y,
            sgU.leftHandRestPos.z + postPump * 0.14
          );
          sgU.fpLeftHandGrp.rotation.set(0, 0, 0);
          sgU.fpLoadShell.visible = false;
        }
      } else {
        const swingAmt = state.swingTimer > 0 ? Math.sin(state.swingTimer * 24) * 0.65 : 0;
        fpToolGroup.rotation.x = -swingAmt;
      }
    }
    if (fpCrazyArmsGroup.visible) {
      const p67 = Math.sin(state.animTime * 9.5);
      fpCrazyArmsGroup.userData.fpLeftHand.position.y = -0.3 + p67 * 0.12;
      fpCrazyArmsGroup.userData.fpRightHand.position.y = -0.3 - p67 * 0.12;
      fpCrazyArmsGroup.userData.fpLeftHand.rotation.x = p67 * 0.22;
      fpCrazyArmsGroup.userData.fpRightHand.rotation.x = -p67 * 0.22;
    }
    return;
  }

  playerMesh.visible = true;
  fpCrazyArmsGroup.visible = false;
  fpToolGroup.visible = false;

  const target =
    state.mode === "start"
      ? _camTarget.set(-1, 1.5, -1)
      : _camTarget.set(player.pos.x, player.pos.y + 1.6, player.pos.z);

  let dist = state.mode === "start" ? 26 : state.camDist;
  const pitch = state.mode === "start" ? 0.36 : state.camPitch;
  const dirX = Math.sin(state.camYaw) * Math.cos(pitch);
  const dirY = Math.sin(pitch);
  const dirZ = Math.cos(state.camYaw) * Math.cos(pitch);

  // Spring-arm anti-parede em interiores (Casa, Porão, ETECAMP) para a câmera nunca atravessar paredes!
  if (state.mode !== "start" && (state.location === "room" || state.location === "basement" || state.location === "etec_inside")) {
    const camBounds =
      state.location === "room"
        ? { minX: -9.8, maxX: 9.8, minZ: -7.8, maxZ: 7.8, maxY: 4.1 }
        : state.location === "basement"
          ? { minX: -10.5, maxX: 10.5, minZ: -8.5, maxZ: 8.5, maxY: 4.1 }
          : { minX: -19.6, maxX: 19.6, minZ: -35.6, maxZ: 65.6, maxY: 4.45 };

    let maxSafeT = dist;
    if (dirX > 0.001) maxSafeT = Math.min(maxSafeT, (camBounds.maxX - target.x) / dirX);
    else if (dirX < -0.001) maxSafeT = Math.min(maxSafeT, (camBounds.minX - target.x) / dirX);
    if (dirZ > 0.001) maxSafeT = Math.min(maxSafeT, (camBounds.maxZ - target.z) / dirZ);
    else if (dirZ < -0.001) maxSafeT = Math.min(maxSafeT, (camBounds.minZ - target.z) / dirZ);
    if (dirY > 0.001) maxSafeT = Math.min(maxSafeT, (camBounds.maxY - target.y) / dirY);

    const wallObs =
      state.location === "room"
        ? interiorObstacles
        : state.location === "basement"
          ? basementObstacles
          : etecInsideObstacles;
    for (let i = 0; i < wallObs.length; i++) {
      const o = wallObs[i];
      const w = o.maxX - o.minX;
      const d = o.maxZ - o.minZ;
      if (!((w <= 0.45 && d >= 1.2) || (d <= 0.45 && w >= 1.2))) continue;
      let tmin = 0.0;
      let tmax = maxSafeT;
      const invX = Math.abs(dirX) > 1e-5 ? 1 / dirX : 1e9;
      const tx1 = (o.minX - 0.18 - target.x) * invX;
      const tx2 = (o.maxX + 0.18 - target.x) * invX;
      tmin = Math.max(tmin, Math.min(tx1, tx2));
      tmax = Math.min(tmax, Math.max(tx1, tx2));
      const invZ = Math.abs(dirZ) > 1e-5 ? 1 / dirZ : 1e9;
      const tz1 = (o.minZ - 0.18 - target.z) * invZ;
      const tz2 = (o.maxZ + 0.18 - target.z) * invZ;
      tmin = Math.max(tmin, Math.min(tz1, tz2));
      tmax = Math.min(tmax, Math.max(tz1, tz2));
      if (tmax >= tmin && tmin > 0.35 && tmin < maxSafeT) {
        maxSafeT = tmin - 0.25;
      }
    }
    dist = Math.max(2.6, Math.min(dist, maxSafeT));
  }

  let shakeX = 0, shakeY = 0;
  if (typeof camShakeTimer === "number" && camShakeTimer > 0 && state.mode === "playing") {
    camShakeTimer = Math.max(0, camShakeTimer - dt);
    const amp = camShakeIntensity * (camShakeTimer / 0.34);
    shakeX = (Math.random() - 0.5) * amp;
    shakeY = (Math.random() - 0.5) * amp;
  }

  const camX = target.x + dirX * dist + shakeX;
  const camY = target.y + dirY * dist + shakeY;
  const camZ = target.z + dirZ * dist;

  if (immediate) {
    camera.position.set(camX, camY, camZ);
  } else {
    _camGoalPos.set(camX, camY, camZ);
    camera.position.lerp(
      _camGoalPos,
      state.mode === "start" ? 0.05 : Math.min(1, 12 * dt)
    );
  }
  camera.lookAt(target);
  // Coberturas do Terminal & Estação agora são 100% sólidas e opacas!
}

// Initialize farm state
const hasSave = loadSavedGame();
if (!hasSave) {
  resetToNewFarm();
} else {
  state.location = "yard";
  player.pos.set(0, 0, -11.5);
  player.facingYaw = 0;
  setActiveSceneVisibility();
  syncUnlockedPlots();
  state.water = getMaxWater();
  rollDailyMarket();
  generateCityOrders();
  if (!Array.isArray(state.dailyGoals) || state.dailyGoals.length === 0) {
    if (typeof generateDailyGoals === "function") generateDailyGoals();
  }
  resetSaveBtn.classList.remove("hidden");
  saveInfoLine.textContent = `Sítio salvo encontrado: Dia ${state.day} • Caixa ${formatBRL(state.money)} • Título: ${state.activeTitle}`;
  startBtn.textContent = "Continuar no Sítio do Macho";
}
if (typeof bindSettingsControls === "function") bindSettingsControls();
if (typeof syncRefeitorioMenuVisual === "function") syncRefeitorioMenuVisual();
updateHUD();
if (typeof updateMinimap === "function") updateMinimap(1, true);
playerMesh.position.copy(player.pos);
playerMesh.rotation.y = player.facingYaw;
updateSkyAndTime(0);
updateCamera(0.016, true);
renderer.render(scene, camera);

let lastTime = performance.now();
let rafId = null;

function animate(now) {
  if (document.hidden) {
    rafId = null;
    return;
  }
  rafId = requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  updateAmbient(dt);
  if (state.mode === "playing") {
    updateGame(dt);
  }
  updateCamera(dt);
  renderer.render(scene, camera);
}

function startRenderLoop() {
  if (rafId === null && !document.hidden) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(animate);
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearActiveInputs();
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  } else {
    startRenderLoop();
  }
});

startRenderLoop();

window.addEventListener("resize", updateCameraProjection);
window.addEventListener("orientationchange", () => {
  updateCameraProjection();
  setTimeout(updateCameraProjection, 160);
});
