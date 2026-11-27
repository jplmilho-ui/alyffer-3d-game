// Textura procedural de olhos esbugalhados vermelhos injetados de sangue (Modo Coringando)
function createCrazyRedEyeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Esclera avermelhada
  const grad = ctx.createRadialGradient(64, 64, 14, 64, 64, 64);
  grad.addColorStop(0, "#ffe4e6");
  grad.addColorStop(0.55, "#fca5a5");
  grad.addColorStop(1, "#dc2626");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Veias vermelhas intensas
  ctx.strokeStyle = "#b91c1c";
  ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(64 + Math.cos(a) * 62, 64 + Math.sin(a) * 62);
    ctx.quadraticCurveTo(
      64 + Math.cos(a + 0.18) * 38,
      64 + Math.sin(a + 0.18) * 38,
      64 + Math.cos(a - 0.1) * 24,
      64 + Math.sin(a - 0.1) * 24
    );
    ctx.stroke();
  }

  // Íris vermelha brilhante + pupila minúscula insana
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(64, 64, 21, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#09090b";
  ctx.beginPath();
  ctx.arc(64, 64, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(58, 58, 3.5, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createGenericHeldItemRig(isFirstPerson = false) {
  const root = new THREE.Group();
  root.visible = false;
  const s = isFirstPerson ? 0.72 : 1.0;

  // 1. Balde (vazio ou com leite)
  const bucketGroup = new THREE.Group();
  const bMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.75, roughness: 0.25 });
  const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.12 * s, 0.28 * s, 10), bMat);
  const bRim = new THREE.Mesh(new THREE.TorusGeometry(0.16 * s, 0.018 * s, 6, 12), bMat);
  bRim.rotation.x = Math.PI / 2;
  bRim.position.y = 0.14 * s;
  const bMilk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.145 * s, 0.145 * s, 0.03 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
  );
  bMilk.position.y = 0.11 * s;
  bMilk.visible = false;
  bucketGroup.add(bBody, bRim, bMilk);
  bucketGroup.visible = false;

  // 2. Tesoura de Tosa
  const shearsGroup = new THREE.Group();
  const shMetal = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
  const shRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
  const shB1 = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.03 * s, 0.34 * s), shMetal);
  shB1.position.set(0.03 * s, 0, 0.12 * s);
  shB1.rotation.y = 0.22;
  const shB2 = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.03 * s, 0.34 * s), shMetal);
  shB2.position.set(-0.03 * s, 0, 0.12 * s);
  shB2.rotation.y = -0.22;
  const shH1 = new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.04 * s, 0.16 * s), shRed);
  shH1.position.set(0.05 * s, 0, -0.1 * s);
  const shH2 = new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.04 * s, 0.16 * s), shRed);
  shH2.position.set(-0.05 * s, 0, -0.1 * s);
  shearsGroup.add(shB1, shB2, shH1, shH2);
  shearsGroup.visible = false;

  // 3. Frasco Químico (Adubo NPK / Super-Adubo)
  const flaskGroup = new THREE.Group();
  const flaskLiquidMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, emissive: 0x16a34a, emissiveIntensity: 0.45, roughness: 0.25 });
  const fBody = new THREE.Mesh(new THREE.CylinderGeometry(0.09 * s, 0.14 * s, 0.26 * s, 10), flaskLiquidMat);
  const fNeck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05 * s, 0.06 * s, 0.12 * s, 8),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.72, roughness: 0.15 })
  );
  fNeck.position.y = 0.17 * s;
  const fCork = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045 * s, 0.045 * s, 0.06 * s, 8),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 })
  );
  fCork.position.y = 0.24 * s;
  flaskGroup.add(fBody, fNeck, fCork);
  flaskGroup.visible = false;

  // 4. Pote de Vaselina
  const jarGroup = new THREE.Group();
  const jBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12 * s, 0.12 * s, 0.22 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.3 })
  );
  const jLabel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.124 * s, 0.124 * s, 0.1 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 })
  );
  const jLid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13 * s, 0.13 * s, 0.06 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.35 })
  );
  jLid.position.y = 0.13 * s;
  jarGroup.add(jBody, jLabel, jLid);
  jarGroup.visible = false;

  // 5. Pacote de Sementes
  const pouchGroup = new THREE.Group();
  const pouchBag = new THREE.Mesh(
    new THREE.BoxGeometry(0.22 * s, 0.28 * s, 0.09 * s),
    new THREE.MeshStandardMaterial({ color: 0xd6b588, roughness: 0.9 })
  );
  const pouchTagMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.55 });
  const pouchTag = new THREE.Mesh(new THREE.BoxGeometry(0.16 * s, 0.14 * s, 0.105 * s), pouchTagMat);
  pouchTag.position.y = -0.02 * s;
  const pouchTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.18 * s, 0.05 * s, 0.1 * s),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 })
  );
  pouchTop.position.y = 0.13 * s;
  pouchGroup.add(pouchBag, pouchTag, pouchTop);
  pouchGroup.visible = false;

  // 6. Plantações, Colheitas, Produtos Animais e Pratos
  const prodMainMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.6 });
  const prodLeafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.72 });

  const leafyGroup = new THREE.Group();
  const leafCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16 * s, 1), prodMainMat);
  const leafOuter1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.13 * s, 0), prodLeafMat);
  leafOuter1.position.set(0.09 * s, -0.02 * s, 0.05 * s);
  const leafOuter2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.13 * s, 0), prodLeafMat);
  leafOuter2.position.set(-0.09 * s, -0.02 * s, -0.04 * s);
  leafyGroup.add(leafCore, leafOuter1, leafOuter2);
  leafyGroup.visible = false;

  const roundGroup = new THREE.Group();
  const rBall = new THREE.Mesh(new THREE.SphereGeometry(0.15 * s, 10, 8), prodMainMat);
  const rCap = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.08 * s, 5), prodLeafMat);
  rCap.position.y = 0.15 * s;
  roundGroup.add(rBall, rCap);
  roundGroup.visible = false;

  const carrotGroup = new THREE.Group();
  const cRoot = new THREE.Mesh(new THREE.ConeGeometry(0.08 * s, 0.34 * s, 8), prodMainMat);
  cRoot.rotation.x = Math.PI;
  cRoot.position.y = -0.04 * s;
  const cTop = new THREE.Mesh(new THREE.ConeGeometry(0.09 * s, 0.16 * s, 6), prodLeafMat);
  cTop.position.y = 0.18 * s;
  carrotGroup.add(cRoot, cTop);
  carrotGroup.rotation.x = 0.45;
  carrotGroup.visible = false;

  const cornGroup = new THREE.Group();
  const cob = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.085 * s, 0.34 * s, 8), prodMainMat);
  const husk1 = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.24 * s, 0.12 * s), prodLeafMat);
  husk1.position.set(0.07 * s, -0.05 * s, 0);
  husk1.rotation.z = -0.2;
  const husk2 = new THREE.Mesh(new THREE.BoxGeometry(0.05 * s, 0.24 * s, 0.12 * s), prodLeafMat);
  husk2.position.set(-0.07 * s, -0.05 * s, 0);
  husk2.rotation.z = 0.2;
  cornGroup.add(cob, husk1, husk2);
  cornGroup.rotation.x = 0.35;
  cornGroup.visible = false;

  const wheatGroup = new THREE.Group();
  for (let w = -1; w <= 1; w++) {
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.028 * s, 0.022 * s, 0.42 * s, 6), prodMainMat);
    stalk.position.set(w * 0.055 * s, 0.02 * s, 0);
    stalk.rotation.z = w * -0.14;
    wheatGroup.add(stalk);
  }
  const tie = new THREE.Mesh(
    new THREE.CylinderGeometry(0.095 * s, 0.095 * s, 0.04 * s, 8),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 })
  );
  tie.position.y = -0.06 * s;
  wheatGroup.add(tie);
  wheatGroup.rotation.x = 0.35;
  wheatGroup.visible = false;

  const eggGroup = new THREE.Group();
  const eggMesh = new THREE.Mesh(new THREE.SphereGeometry(0.11 * s, 10, 8), prodMainMat);
  eggMesh.scale.set(0.85, 1.18, 0.85);
  eggGroup.add(eggMesh);
  eggGroup.visible = false;

  const dishGroup = new THREE.Group();
  const bowl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19 * s, 0.12 * s, 0.13 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 })
  );
  const food = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.14 * s, 0.07 * s, 10), prodMainMat);
  food.position.y = 0.06 * s;
  dishGroup.add(bowl, food);
  dishGroup.visible = false;

  // 7. Celular 3D do Macho (chassi preto, tela iluminada com ícones e câmera traseira)
  const phoneGroup = new THREE.Group();
  const phBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.16 * s, 0.29 * s, 0.026 * s),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.55, roughness: 0.25 })
  );
  const phScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.138 * s, 0.252 * s, 0.01 * s),
    new THREE.MeshBasicMaterial({ color: 0x1e293b })
  );
  phScreen.position.z = 0.014 * s;
  const phApp1 = new THREE.Mesh(new THREE.BoxGeometry(0.036 * s, 0.036 * s, 0.008 * s), new THREE.MeshBasicMaterial({ color: 0xec4899 }));
  phApp1.position.set(-0.034 * s, 0.055 * s, 0.02 * s);
  const phApp2 = new THREE.Mesh(new THREE.BoxGeometry(0.036 * s, 0.036 * s, 0.008 * s), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  phApp2.position.set(0.034 * s, 0.055 * s, 0.02 * s);
  const phApp3 = new THREE.Mesh(new THREE.BoxGeometry(0.036 * s, 0.036 * s, 0.008 * s), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  phApp3.position.set(-0.034 * s, -0.015 * s, 0.02 * s);
  const phApp4 = new THREE.Mesh(new THREE.BoxGeometry(0.036 * s, 0.036 * s, 0.008 * s), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  phApp4.position.set(0.034 * s, -0.015 * s, 0.02 * s);
  const phCam = new THREE.Mesh(
    new THREE.BoxGeometry(0.05 * s, 0.06 * s, 0.01 * s),
    new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.2 })
  );
  phCam.position.set(0.035 * s, 0.08 * s, -0.016 * s);
  phoneGroup.add(phBody, phScreen, phApp1, phApp2, phApp3, phApp4, phCam);
  phoneGroup.rotation.x = isFirstPerson ? -0.18 : -0.35;
  phoneGroup.visible = false;

  // 8. Bolacha da ETEC (Madeira Prensada!)
  const woodCrackerGroup = new THREE.Group();
  const wcBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.24 * s, 0.045 * s, 0.22 * s),
    new THREE.MeshStandardMaterial({ color: 0xb6895b, roughness: 0.96 })
  );
  const wcSpeckMat = new THREE.MeshStandardMaterial({ color: 0x7c532d, roughness: 1.0 });
  [[-0.06, -0.05], [0.06, -0.05], [0, 0], [-0.06, 0.05], [0.06, 0.05]].forEach(([dx, dz]) => {
    const dot = new THREE.Mesh(new THREE.BoxGeometry(0.022 * s, 0.052 * s, 0.022 * s), wcSpeckMat);
    dot.position.set(dx * s, 0, dz * s);
    woodCrackerGroup.add(dot);
  });
  woodCrackerGroup.add(wcBase);
  woodCrackerGroup.rotation.x = 0.4;
  woodCrackerGroup.visible = false;

  // 9. Copo com Leite e Chocolate (Refeitório)
  const chocoCupGroup = new THREE.Group();
  const ccBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11 * s, 0.085 * s, 0.24 * s, 14),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
  );
  const ccLiq = new THREE.Mesh(
    new THREE.CylinderGeometry(0.098 * s, 0.098 * s, 0.025 * s, 14),
    new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.25 })
  );
  ccLiq.position.y = 0.1 * s;
  chocoCupGroup.add(ccBody, ccLiq);
  chocoCupGroup.visible = false;

  // 10. Pote Circular Pequeno com Colher Azul (Ração do Exército / Canjica / Arroz Doce!)
  const smallBowlGroup = new THREE.Group();
  const sbMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
  const sbBody = new THREE.Mesh(new THREE.CylinderGeometry(0.145 * s, 0.105 * s, 0.11 * s, 16), sbMat);
  const sbFillMat = new THREE.MeshStandardMaterial({ color: 0xfefce8, roughness: 0.3 });
  const sbFill = new THREE.Mesh(new THREE.CylinderGeometry(0.13 * s, 0.13 * s, 0.025 * s, 16), sbFillMat);
  sbFill.position.y = 0.042 * s;
  // Sucrilhos flutuando no leite (visível somente na Ração do Exército!)
  const sbCerealGroup = new THREE.Group();
  const cerealMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.78 });
  [[-0.05, 0.02], [0.04, -0.04], [-0.01, -0.05], [0.06, 0.03], [-0.06, -0.04], [0.01, 0.04]].forEach(([cx, cz]) => {
    const flk = new THREE.Mesh(new THREE.BoxGeometry(0.038 * s, 0.012 * s, 0.03 * s), cerealMat);
    flk.position.set(cx * s, 0.058 * s, cz * s);
    flk.rotation.y = (cx + cz) * 12;
    sbCerealGroup.add(flk);
  });
  // Colher AZUL apoiada na borda do pote!
  const blueSpoonMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
  const spHandle = new THREE.Mesh(new THREE.BoxGeometry(0.026 * s, 0.2 * s, 0.014 * s), blueSpoonMat);
  spHandle.position.set(0.08 * s, 0.11 * s, 0.02 * s);
  spHandle.rotation.z = -0.48;
  const spHead = new THREE.Mesh(new THREE.SphereGeometry(0.032 * s, 8, 6), blueSpoonMat);
  spHead.scale.set(1, 0.45, 1.25);
  spHead.position.set(0.02 * s, 0.052 * s, 0.02 * s);
  smallBowlGroup.add(sbBody, sbFill, sbCerealGroup, spHandle, spHead);
  smallBowlGroup.visible = false;

  // 11. Bolo de Cenoura Recheado com Chocolate (Sexta-feira!)
  const carrotCakeGroup = new THREE.Group();
  const cakeOrangeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.78 });
  const cakeChocMat = new THREE.MeshStandardMaterial({ color: 0x3f1d0b, roughness: 0.32 });
  const cakeBot = new THREE.Mesh(new THREE.BoxGeometry(0.24 * s, 0.065 * s, 0.2 * s), cakeOrangeMat);
  cakeBot.position.y = -0.05 * s;
  const cakeMidFill = new THREE.Mesh(new THREE.BoxGeometry(0.245 * s, 0.036 * s, 0.205 * s), cakeChocMat);
  cakeMidFill.position.y = 0.0;
  const cakeTop = new THREE.Mesh(new THREE.BoxGeometry(0.24 * s, 0.065 * s, 0.2 * s), cakeOrangeMat);
  cakeTop.position.y = 0.05 * s;
  const cakeGlaze = new THREE.Mesh(new THREE.BoxGeometry(0.252 * s, 0.03 * s, 0.212 * s), cakeChocMat);
  cakeGlaze.position.y = 0.095 * s;
  carrotCakeGroup.add(cakeBot, cakeMidFill, cakeTop, cakeGlaze);
  carrotCakeGroup.visible = false;

  // 12. Escopeta Calibre 12 3D (coronha de madeira, receptor escuro, cano longo, tubo carregador, telha pump e massa de mira!)
  const shotgunGroup = new THREE.Group();
  const sgWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b3e1e, roughness: 0.72 });
  const sgMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.78, roughness: 0.28 });
  const sgSteelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.82, roughness: 0.24 });
  const sgSightMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  // Em 1ª pessoa o cano aponta para frente (-Z); em 3ª pessoa aponta para frente (+Z)!
  const sgDir = isFirstPerson ? -1 : 1;
  const sgStock = new THREE.Mesh(new THREE.BoxGeometry(0.08 * s, 0.14 * s, 0.34 * s), sgWoodMat);
  sgStock.position.set(0, -0.04 * s, -0.24 * s * sgDir);
  sgStock.rotation.x = 0.16 * sgDir;
  const sgGrip = new THREE.Mesh(new THREE.BoxGeometry(0.075 * s, 0.12 * s, 0.12 * s), sgWoodMat);
  sgGrip.position.set(0, -0.02 * s, -0.06 * s * sgDir);
  const sgReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.085 * s, 0.12 * s, 0.26 * s), sgMetalMat);
  sgReceiver.position.set(0, 0.03 * s, 0.06 * s * sgDir);
  const sgEjectPort = new THREE.Mesh(new THREE.BoxGeometry(0.09 * s, 0.045 * s, 0.09 * s), sgSteelMat);
  sgEjectPort.position.set(0, 0.045 * s, 0.06 * s * sgDir);
  const sgBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.028 * s, 0.03 * s, 0.76 * s, 10), sgMetalMat);
  sgBarrel.rotation.x = Math.PI / 2;
  sgBarrel.position.set(0, 0.068 * s, 0.48 * s * sgDir);
  const sgTube = new THREE.Mesh(new THREE.CylinderGeometry(0.024 * s, 0.024 * s, 0.56 * s, 10), sgSteelMat);
  sgTube.rotation.x = Math.PI / 2;
  sgTube.position.set(0, 0.018 * s, 0.38 * s * sgDir);
  const sgPump = new THREE.Mesh(new THREE.CylinderGeometry(0.042 * s, 0.042 * s, 0.24 * s, 10), sgWoodMat);
  sgPump.rotation.x = Math.PI / 2;
  sgPump.position.set(0, 0.015 * s, 0.42 * s * sgDir);
  const sgSight = new THREE.Mesh(new THREE.BoxGeometry(0.018 * s, 0.028 * s, 0.022 * s), sgSightMat);
  sgSight.position.set(0, 0.105 * s, 0.84 * s * sgDir);
  const sgGuard = new THREE.Mesh(new THREE.BoxGeometry(0.03 * s, 0.06 * s, 0.1 * s), sgMetalMat);
  sgGuard.position.set(0, -0.055 * s, 0.03 * s * sgDir);
  shotgunGroup.add(sgStock, sgGrip, sgReceiver, sgEjectPort, sgBarrel, sgTube, sgPump, sgSight, sgGuard);
  shotgunGroup.userData = { sgPump, sgPumpRestZ: 0.42 * s * sgDir, sgDir };
  if (isFirstPerson) {
    shotgunGroup.position.set(-0.04, -0.02, -0.1);
  } else {
    // Alinhada p/ segurar firme com as DUAS mãos apontando para frente em 3ª pessoa!
    shotgunGroup.position.set(-0.14, 0.08, 0.16);
    shotgunGroup.rotation.set(0.36, -0.22, 0.04);
  }
  shotgunGroup.visible = false;

  // 13. Cartucho / Bala de Escopeta Calibre 12 (vermelho + base de latão dourado!)
  const shellGroup = new THREE.Group();
  const shHull = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045 * s, 0.045 * s, 0.14 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  shHull.position.y = 0.03 * s;
  const shBrass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.047 * s, 0.047 * s, 0.055 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.24 })
  );
  shBrass.position.y = -0.06 * s;
  const shRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.054 * s, 0.054 * s, 0.016 * s, 10),
    new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.85, roughness: 0.2 })
  );
  shRim.position.y = -0.09 * s;
  shellGroup.add(shHull, shBrass, shRim);
  shellGroup.rotation.z = 0.25;
  shellGroup.visible = false;

  root.add(
    bucketGroup, shearsGroup, flaskGroup, jarGroup, pouchGroup,
    leafyGroup, roundGroup, carrotGroup, cornGroup, wheatGroup,
    eggGroup, dishGroup, phoneGroup,
    woodCrackerGroup, chocoCupGroup, smallBowlGroup, carrotCakeGroup,
    shotgunGroup, shellGroup
  );
  root.userData = {
    bucketGroup, bMilk, shearsGroup, flaskGroup, flaskLiquidMat, jarGroup, pouchGroup, pouchTagMat,
    leafyGroup, roundGroup, carrotGroup, cornGroup, wheatGroup, eggGroup, dishGroup, phoneGroup,
    woodCrackerGroup, chocoCupGroup, smallBowlGroup, sbFillMat, sbCerealGroup, carrotCakeGroup,
    shotgunGroup, shellGroup,
    prodMainMat, prodLeafMat,
  };
  return root;
}

function updateGenericHeldItemRig(rig, itemDef) {
  if (!rig || !rig.userData) return false;
  const u = rig.userData;
  [
    u.bucketGroup, u.shearsGroup, u.flaskGroup, u.jarGroup, u.pouchGroup,
    u.leafyGroup, u.roundGroup, u.carrotGroup, u.cornGroup, u.wheatGroup, u.eggGroup, u.dishGroup, u.phoneGroup,
    u.woodCrackerGroup, u.chocoCupGroup, u.smallBowlGroup, u.carrotCakeGroup,
    u.shotgunGroup, u.shellGroup,
  ].forEach((p) => { if (p) p.visible = false; });

  if (!itemDef || itemDef.id === "regador" || itemDef.hoeId) {
    rig.visible = false;
    return false;
  }

  rig.visible = true;
  if (itemDef.id === "balde" || itemDef.id === "leite_fresco") {
    u.bucketGroup.visible = true;
    u.bMilk.visible = itemDef.id === "leite_fresco";
  } else if (itemDef.id === "tesoura") {
    u.shearsGroup.visible = true;
  } else if (itemDef.id === "adubo_npk" || itemDef.id === "super_adubo") {
    u.flaskGroup.visible = true;
    const isSuper = itemDef.id === "super_adubo";
    u.flaskLiquidMat.color.setHex(isSuper ? 0xfacc15 : 0x4ade80);
    u.flaskLiquidMat.emissive.setHex(isSuper ? 0xeab308 : 0x16a34a);
  } else if (itemDef.id === "vaselina") {
    u.jarGroup.visible = true;
  } else if (itemDef.id === "celular") {
    u.phoneGroup.visible = true;
  } else if (itemDef.id === "escopeta") {
    // Em 3ª pessoa usa o modelo dedicado `tpShotgunGroup` alinhado nas duas mãos (sem entortar no pulso!)
    u.shotgunGroup.visible = false;
  } else if (itemDef.id === "bala_escopeta") {
    u.shellGroup.visible = true;
  } else if (itemDef.id === "merenda_bolacha") {
    u.woodCrackerGroup.visible = true;
  } else if (itemDef.id === "merenda_leite_choc") {
    u.chocoCupGroup.visible = true;
  } else if (itemDef.id === "merenda_racao" || itemDef.id === "merenda_canjica" || itemDef.id === "merenda_arroz_doce") {
    u.smallBowlGroup.visible = true;
    u.sbCerealGroup.visible = itemDef.id === "merenda_racao";
    u.sbFillMat.color.setHex(
      itemDef.id === "merenda_racao" ? 0xf8fafc : itemDef.id === "merenda_canjica" ? 0xfef3c7 : 0xf5efe6
    );
  } else if (itemDef.id === "merenda_bolo") {
    u.carrotCakeGroup.visible = true;
  } else if (itemDef.seedCropId) {
    u.pouchGroup.visible = true;
    u.pouchTagMat.color.setHex(itemDef.color || 0x4ade80);
  } else {
    u.prodMainMat.color.setHex(itemDef.color || 0x4ade80);
    u.prodLeafMat.color.setHex(itemDef.accentColor || 0x15803d);
    const style = itemDef.visualStyle || "round";
    if (style.startsWith("lettuce")) u.leafyGroup.visible = true;
    else if (style === "carrot") u.carrotGroup.visible = true;
    else if (style === "corn") u.cornGroup.visible = true;
    else if (style === "wheat") u.wheatGroup.visible = true;
    else if (style === "egg") u.eggGroup.visible = true;
    else if (style === "dish") u.dishGroup.visible = true;
    else u.roundGroup.visible = true;
  }
  return true;
}

// Alyffer "Macho" 3D Character Model (com braços articulados p/ gesto 6-7, olhos esbugalhados vermelhos e língua p/ fora!)
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

  const skinShadeMat = new THREE.MeshStandardMaterial({ color: 0xab714d, roughness: 0.7 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), skinMat);
  head.position.y = 2.34;
  head.castShadow = true;
  group.add(head);

  // Pescoço e orelhas sutis
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.18, 10), skinShadeMat);
  neck.position.set(0, 1.98, 0);
  group.add(neck);
  [-0.35, 0.35].forEach((ex) => {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.1), skinShadeMat);
    ear.position.set(ex, 2.31, 0.02);
    group.add(ear);
  });

  // Cabelo completo embaixo do chapéu (nuca, laterais/costeletas, base sob a aba + franja reta fininha na testa!)
  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.71, 0.44, 0.14), hairMat);
  hairBack.position.set(0, 2.43, -0.32);
  const hairUnderHat = new THREE.Mesh(new THREE.BoxGeometry(0.71, 0.12, 0.71), hairMat);
  hairUnderHat.position.set(0, 2.63, -0.01);
  const sideHairL = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.34, 0.56), hairMat);
  sideHairL.position.set(-0.345, 2.47, -0.06);
  const sideHairR = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.34, 0.56), hairMat);
  sideHairR.position.set(0.345, 2.47, -0.06);
  // Franja bem pequena, reta como uma linha na testa, encostada na aba do chapéu (aba começa em y = 2.66)!
  const frontBangs = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.058, 0.048), hairMat);
  frontBangs.position.set(0, 2.631, 0.348);
  group.add(hairBack, hairUnderHat, sideHairL, sideHairR, frontBangs);

  // Rosto normal melhorado: olhos detalhados (esclera + pupila + brilho + sobrancelha), nariz e boca!
  const normalFaceGroup = new THREE.Group();
  const whiteEyeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x9a6536 });
  const eyeShineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mouthOuterMat = new THREE.MeshStandardMaterial({ color: 0x6b2c1a, roughness: 0.65 });
  const mouthTeethMat = new THREE.MeshBasicMaterial({ color: 0xfef9f3 });

  const leftEye = new THREE.Group();
  const rightEye = new THREE.Group();
  [
    [-0.15, leftEye],
    [0.15, rightEye],
  ].forEach(([ex, eyeGrp]) => {
    const sclera = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.095, 0.016), whiteEyeMat);
    sclera.position.set(ex, 2.38, 0.348);
    const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.078, 0.016), eyeMat);
    pupil.position.set(ex, 2.38, 0.358);
    const sparkle = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.014), eyeShineMat);
    sparkle.position.set(ex + 0.018, 2.402, 0.366);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.032, 0.018), hairMat);
    brow.position.set(ex, 2.475, 0.352);
    eyeGrp.add(sclera, pupil, sparkle, brow);
    normalFaceGroup.add(eyeGrp);
  });

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.085, 0.048), skinShadeMat);
  nose.position.set(0, 2.295, 0.36);
  const mouthBase = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.044, 0.016), mouthOuterMat);
  mouthBase.position.set(0, 2.155, 0.348);
  const mouthSmileLine = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.018, 0.012), mouthTeethMat);
  mouthSmileLine.position.set(0, 2.162, 0.356);
  const mouthCornerL = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.024, 0.014), mouthOuterMat);
  mouthCornerL.position.set(-0.098, 2.168, 0.348);
  const mouthCornerR = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.024, 0.014), mouthOuterMat);
  mouthCornerR.position.set(0.098, 2.168, 0.348);
  normalFaceGroup.add(nose, mouthBase, mouthSmileLine, mouthCornerL, mouthCornerR);
  group.add(normalFaceGroup);

  // Rosto Coringando: Olhos ESBUGALHADOS para fora e VERMELHOS + LÍNGUA PARA FORA!
  const crazyFaceGroup = new THREE.Group();
  crazyFaceGroup.visible = false;
  const crazyEyeMat = new THREE.MeshStandardMaterial({
    map: createCrazyRedEyeTexture(),
    color: 0xffb4b4,
    emissive: 0xdc2626,
    emissiveIntensity: 0.58,
    roughness: 0.25,
  });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });

  const leftCrazyEye = new THREE.Group();
  leftCrazyEye.position.set(-0.16, 2.39, 0.38);
  const lEyeBall = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 14), crazyEyeMat);
  lEyeBall.scale.set(1.0, 1.05, 1.75);
  lEyeBall.position.z = 0.08;
  const lPupil = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), pupilMat);
  lPupil.position.set(0, 0, 0.31);
  leftCrazyEye.add(lEyeBall, lPupil);

  const rightCrazyEye = new THREE.Group();
  rightCrazyEye.position.set(0.16, 2.39, 0.38);
  const rEyeBall = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 14), crazyEyeMat);
  rEyeBall.scale.set(1.0, 1.05, 1.75);
  rEyeBall.position.z = 0.08;
  const rPupil = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), pupilMat);
  rPupil.position.set(0, 0, 0.31);
  rightCrazyEye.add(rEyeBall, rPupil);

  // Boca escancarada + Língua enorme para fora!
  const crazyMouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.16, 0.06),
    new THREE.MeshBasicMaterial({ color: 0x2b070c })
  );
  crazyMouth.position.set(0, 2.13, 0.35);

  const tongueGroup = new THREE.Group();
  tongueGroup.position.set(0, 2.11, 0.36);
  const tongueMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0x9f1239,
    emissiveIntensity: 0.25,
    roughness: 0.35,
  });
  const tongueBase = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.065, 0.34), tongueMat);
  tongueBase.position.set(0, -0.04, 0.15);
  tongueBase.rotation.x = 0.38;
  const tongueTip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), tongueMat);
  tongueTip.scale.set(1.0, 0.45, 1.15);
  tongueTip.position.set(0, -0.11, 0.31);
  const tongueLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.025, 0.02, 0.24),
    new THREE.MeshBasicMaterial({ color: 0x9f1239 })
  );
  tongueLine.position.set(0, -0.015, 0.16);
  tongueLine.rotation.x = 0.38;
  tongueGroup.add(tongueBase, tongueTip, tongueLine);

  crazyFaceGroup.add(leftCrazyEye, rightCrazyEye, crazyMouth, tongueGroup);
  group.add(crazyFaceGroup);

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

  // Visual do Lambi Homem (sem camisa, sem chapéu, olhos vermelhos, língua gigante até os joelhos!)
  const lambiHairTop = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 0.7), hairMat);
  lambiHairTop.position.set(0, 2.73, 0);
  lambiHairTop.visible = false;
  group.add(lambiHairTop);

  const bareChestGroup = new THREE.Group();
  bareChestGroup.visible = false;
  const bareShade = new THREE.MeshStandardMaterial({ color: 0xa66b46, roughness: 0.72 });
  [-0.2, 0.2].forEach((px) => {
    const pecLine = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.05), skinMat);
    pecLine.position.set(px, 1.62, 0.26);
    const nip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), bareShade);
    nip.position.set(px * 1.1, 1.56, 0.29);
    bareChestGroup.add(pecLine, nip);
  });
  const bellyLine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.48, 0.04), bareShade);
  bellyLine.position.set(0, 1.24, 0.26);
  bareChestGroup.add(bellyLine);
  group.add(bareChestGroup);

  const lambiRedEyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const lambiSocketMat = new THREE.MeshBasicMaterial({ color: 0x2a0606 });
  const lambiEyeGroup = new THREE.Group();
  lambiEyeGroup.visible = false;
  [-0.14, 0.14].forEach((ex) => {
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.13, 0.055), lambiSocketMat);
    rim.position.set(ex, 2.38, 0.34);
    const re = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.095, 0.075), lambiRedEyeMat);
    re.position.set(ex, 2.38, 0.352);
    lambiEyeGroup.add(rim, re);
  });
  group.add(lambiEyeGroup);

  // Língua enorme do Lambi Homem chegando até o joelho (boca y=2.12 -> joelho y=0.32!)
  const lambiTongueGroup = new THREE.Group();
  lambiTongueGroup.position.set(0, 2.12, 0.36);
  lambiTongueGroup.visible = false;
  const ltBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.24), tongueMat);
  ltBase.position.set(0, -0.04, 0.1);
  const ltLongShaft = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.72, 0.09), tongueMat);
  ltLongShaft.position.set(0, -0.9, 0.16);
  ltLongShaft.rotation.x = -0.04;
  const ltLongTip = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 10), tongueMat);
  ltLongTip.scale.set(1.05, 1.2, 0.65);
  ltLongTip.position.set(0, -1.78, 0.2);
  const ltGroove = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 1.56, 0.03),
    new THREE.MeshBasicMaterial({ color: 0x9f1239 })
  );
  ltGroove.position.set(0, -0.88, 0.21);
  lambiTongueGroup.add(ltBase, ltLongShaft, ltLongTip, ltGroove);
  group.add(lambiTongueGroup);

  // Braços articulados (ombro + antebraço + palma) para o gesto "6-7" ao coringar!
  const upperArmGeo = new THREE.BoxGeometry(0.25, 0.44, 0.25);
  const forearmGeo = new THREE.BoxGeometry(0.23, 0.42, 0.23);
  const palmGeo = new THREE.BoxGeometry(0.26, 0.08, 0.28);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.62, 1.72, 0);
  const leftUpper = new THREE.Mesh(upperArmGeo, skinMat);
  leftUpper.position.set(0, -0.22, 0);
  leftUpper.castShadow = true;
  leftArmGroup.add(leftUpper);
  const leftForearmGroup = new THREE.Group();
  leftForearmGroup.position.set(0, -0.42, 0);
  const leftForearmMesh = new THREE.Mesh(forearmGeo, skinMat);
  leftForearmMesh.position.set(0, -0.2, 0);
  leftForearmMesh.castShadow = true;
  const leftPalm = new THREE.Mesh(palmGeo, skinMat);
  leftPalm.position.set(0, -0.42, 0.04);
  leftForearmGroup.add(leftForearmMesh, leftPalm);
  leftArmGroup.add(leftForearmGroup);
  group.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.62, 1.72, 0);
  const rightUpper = new THREE.Mesh(upperArmGeo, skinMat);
  rightUpper.position.set(0, -0.22, 0);
  rightUpper.castShadow = true;
  rightArmGroup.add(rightUpper);
  const rightForearmGroup = new THREE.Group();
  rightForearmGroup.position.set(0, -0.42, 0);
  const rightForearmMesh = new THREE.Mesh(forearmGeo, skinMat);
  rightForearmMesh.position.set(0, -0.2, 0);
  rightForearmMesh.castShadow = true;
  const rightPalm = new THREE.Mesh(palmGeo, skinMat);
  rightPalm.position.set(0, -0.42, 0.04);
  rightForearmGroup.add(rightForearmMesh, rightPalm);

  const canGroup = new THREE.Group();
  canGroup.position.set(0, -0.34, 0.24);
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
  rightForearmGroup.add(canGroup);

  // Enxada 3D (arma do Alyffer contra a Onça e ferramenta da horta!)
  const hoeGroup = new THREE.Group();
  hoeGroup.position.set(0, -0.34, 0.16);
  hoeGroup.rotation.x = 0.35;
  const hoeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.045, 1.65, 8),
    new THREE.MeshStandardMaterial({ color: 0x7c4a21, roughness: 0.85 })
  );
  hoeHandle.rotation.x = Math.PI / 2;
  hoeHandle.position.set(0, 0.04, 0.45);
  hoeHandle.castShadow = true;
  const hoeCollar = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.12, 0.14),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.65, roughness: 0.35 })
  );
  hoeCollar.position.set(0, 0.04, 1.24);
  hoeBladeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.72, roughness: 0.28 });
  const hoeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.44, 0.045), hoeBladeMat);
  hoeBlade.position.set(0, -0.16, 1.28);
  hoeBlade.rotation.x = 0.22;
  hoeBlade.castShadow = true;
  hoeGroup.add(hoeHandle, hoeCollar, hoeBlade);
  hoeGroup.visible = false;
  rightForearmGroup.add(hoeGroup);

  const heldItemGroup = createGenericHeldItemRig(false);
  heldItemGroup.position.set(0, -0.34, 0.24);
  rightForearmGroup.add(heldItemGroup);

  rightArmGroup.add(rightForearmGroup);
  group.add(rightArmGroup);

  const thighGeo = new THREE.BoxGeometry(0.32, 0.42, 0.32);
  const shinGeo = new THREE.BoxGeometry(0.3, 0.36, 0.3);
  const bootGeo = new THREE.BoxGeometry(0.35, 0.2, 0.44);

  const makeBaseLeg = (sx) => {
    const hip = new THREE.Group();
    hip.position.set(sx * 0.23, 0.86, 0);
    const thigh = new THREE.Mesh(thighGeo, jeansMat);
    thigh.position.y = -0.21;
    thigh.castShadow = true;
    hip.add(thigh);

    const shinGroup = new THREE.Group();
    shinGroup.position.set(0, -0.42, 0);
    const shin = new THREE.Mesh(shinGeo, jeansMat);
    shin.position.y = -0.17;
    shin.castShadow = true;
    const boot = new THREE.Mesh(bootGeo, bootsMat);
    boot.position.set(0, -0.34, 0.05);
    boot.castShadow = true;
    shinGroup.add(shin, boot);
    hip.add(shinGroup);
    group.add(hip);
    return { hip, shinGroup, boot };
  };

  const lL = makeBaseLeg(-1);
  const rL = makeBaseLeg(1);

  group.userData = {
    modelRoot: group,
    leftArm: leftArmGroup,
    rightArm: rightArmGroup,
    leftForearm: leftForearmGroup,
    rightForearm: rightForearmGroup,
    leftLeg: lL.hip,
    rightLeg: rL.hip,
    leftShin: lL.shinGroup,
    rightShin: rL.shinGroup,
    leftBoot: lL.boot,
    rightBoot: rL.boot,
    canGroup,
    hoeGroup,
    heldItemGroup,
    leftEye,
    rightEye,
    normalFaceGroup,
    crazyFaceGroup,
    leftCrazyEye,
    rightCrazyEye,
    lPupil,
    rPupil,
    tongueGroup,
    skinMat,
    shirtMat,
    pocketMat,
    jeansMat,
    bootsMat,
    strawMat,
    hatBandMat,
    torsoMesh: torso,
    chestDetail,
    hatBrim,
    hatCrown,
    hatBand,
    lambiHairTop,
    bareChestGroup,
    lambiEyeGroup,
    lambiTongueGroup,
  };
  return group;
}

const playerBaseModel = createMachoPlayerModel();

// Texturas procedurais para as Skins dos Títulos (PAC Minecraft, Airfryer, Homem Guloso Chad, Macho Peludo!)
function createPacMcFaceTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d");
  // Pele estilo Minecraft
  ctx.fillStyle = "#f2c6a0";
  ctx.fillRect(0, 0, 64, 64);
  // Cabelo castanho escuro do PAC (franja pixelada clássica do TazerCraft!)
  ctx.fillStyle = "#2b1910";
  ctx.fillRect(0, 0, 64, 18);
  ctx.fillRect(0, 18, 12, 12);
  ctx.fillRect(52, 18, 12, 12);
  ctx.fillRect(16, 16, 18, 7);
  ctx.fillRect(38, 16, 10, 5);
  // Olhos Minecraft (branco + azul-escuro do PAC)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(8, 28, 16, 8);
  ctx.fillRect(40, 28, 16, 8);
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(16, 28, 8, 8);
  ctx.fillRect(40, 28, 8, 8);
  // Sorriso pixelado simpático
  ctx.fillStyle = "#7c3f24";
  ctx.fillRect(20, 46, 24, 6);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(24, 46, 16, 3);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createAirfryerPanelTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 240, 112);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 44px monospace";
  ctx.textAlign = "center";
  ctx.fillText("200°C", 128, 58);
  ctx.fillStyle = "#facc15";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText("🍟 AIRFRYER • 15:00", 128, 98);
  const tex = new THREE.CanvasTexture(c);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createChadFaceTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#c98a63";
  ctx.fillRect(0, 0, 128, 128);
  // Sombreamento esculpido das maçãs do rosto e mandíbula de Chad
  ctx.fillStyle = "rgba(80,40,18,0.34)";
  ctx.beginPath();
  ctx.moveTo(8, 62);
  ctx.lineTo(36, 78);
  ctx.lineTo(20, 108);
  ctx.lineTo(4, 96);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(120, 62);
  ctx.lineTo(92, 78);
  ctx.lineTo(108, 108);
  ctx.lineTo(124, 96);
  ctx.fill();
  // Sobrancelhas grossas e anguladas de Gigachad
  ctx.fillStyle = "#181412";
  ctx.fillRect(16, 30, 34, 8);
  ctx.fillRect(78, 30, 34, 8);
  // Olhos confiantes semicerrados
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(20, 42, 26, 10);
  ctx.fillRect(82, 42, 26, 10);
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(28, 43, 12, 9);
  ctx.fillRect(88, 43, 12, 9);
  // Nariz marcado
  ctx.fillStyle = "#a66a46";
  ctx.fillRect(58, 46, 12, 26);
  // Sorriso de canto confiante (Chad smirk) + barba desenhada no queixo
  ctx.strokeStyle = "#3f1d0b";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(42, 90);
  ctx.quadraticCurveTo(66, 98, 88, 84);
  ctx.stroke();
  ctx.fillStyle = "rgba(24,20,18,0.45)";
  ctx.fillRect(24, 104, 80, 22);
  const tex = new THREE.CanvasTexture(c);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createHairyChestTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#c98a63";
  ctx.fillRect(0, 0, 128, 128);
  // Definição muscular do peitoral e tanquinho
  ctx.strokeStyle = "rgba(92, 46, 20, 0.45)";
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 14, 48, 36);
  ctx.strokeRect(68, 14, 48, 36);
  ctx.strokeRect(28, 58, 32, 18);
  ctx.strokeRect(68, 58, 32, 18);
  ctx.strokeRect(28, 82, 32, 18);
  ctx.strokeRect(68, 82, 32, 18);
  // Pelos densos por todo o peito e abdômen (Macho Peludo!)
  ctx.strokeStyle = "#1c1410";
  ctx.lineWidth = 2.2;
  for (let i = 0; i < 140; i++) {
    const px = 14 + Math.random() * 100;
    const py = 10 + Math.random() * 104;
    if (py > 52 && (px < 36 || px > 92)) continue;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + (Math.random() - 0.5) * 9, py + 4, px + (Math.random() - 0.5) * 8, py + 9);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createMachoBeardFaceTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#c98a63";
  ctx.fillRect(0, 0, 128, 128);
  // Barba cheia e grossa
  ctx.fillStyle = "#1c1410";
  ctx.fillRect(10, 72, 108, 56);
  ctx.fillRect(6, 56, 16, 40);
  ctx.fillRect(106, 56, 16, 40);
  // Bigode grosso
  ctx.fillRect(34, 68, 60, 14);
  // Boca firme
  ctx.fillStyle = "#7c3f24";
  ctx.fillRect(46, 86, 36, 7);
  // Sobrancelhas fechadas de força
  ctx.fillStyle = "#18120e";
  ctx.fillRect(18, 28, 34, 9);
  ctx.fillRect(76, 28, 34, 9);
  // Olhos intensos
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(24, 42, 22, 10);
  ctx.fillRect(82, 42, 22, 10);
  ctx.fillStyle = "#111827";
  ctx.fillRect(32, 43, 10, 9);
  ctx.fillRect(86, 43, 10, 9);
  const tex = new THREE.CanvasTexture(c);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

// 1) TÍTULO "PAC" — Skin do Minecraft do PAC do TazerCraft!
function createPacMinecraftModel() {
  const g = new THREE.Group();
  const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.72 });
  const hoodieLightMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.7 });
  const cordMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x2b1910, roughness: 0.85 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf2c6a0, roughness: 0.7 });
  const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.65 });
  const soleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.08, 0.46), hoodieMat);
  torso.position.y = 1.38;
  torso.castShadow = true;
  g.add(torso);
  // Detalhe frontal do moletom azul do PAC + bolso canguru + cordões + capuz
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.22, 0.48), hoodieLightMat);
  stripe.position.set(0, 1.54, 0);
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.28, 0.06), hoodieLightMat);
  pocket.position.set(0, 1.04, 0.24);
  const hoodBack = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.26, 0.34), hoodieMat);
  hoodBack.position.set(0, 1.94, -0.22);
  const cordL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.04), cordMat);
  cordL.position.set(-0.14, 1.72, 0.25);
  const cordR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.04), cordMat);
  cordR.position.set(0.14, 1.72, 0.25);
  g.add(stripe, pocket, hoodBack, cordL, cordR);

  // Cabeça quadrada Minecraft com textura do PAC
  const faceMat = new THREE.MeshStandardMaterial({ map: createPacMcFaceTexture(), roughness: 0.65 });
  const headMats = [hairMat, hairMat, hairMat, skinMat, faceMat, hairMat];
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.74, 0.74), headMats);
  head.position.y = 2.32;
  head.castShadow = true;
  g.add(head);

  const makeArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * 0.6, 1.82, 0);
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.74, 0.34), hoodieMat);
    sleeve.position.y = -0.37;
    sleeve.castShadow = true;
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.32), skinMat);
    hand.position.y = -0.84;
    ag.add(sleeve, hand);
    return ag;
  };
  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  g.add(leftArm, rightArm);

  const makeLeg = (sx) => {
    const lg = new THREE.Group();
    lg.position.set(sx * 0.22, 0.84, 0);
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.38), jeansMat);
    thigh.position.y = -0.18;
    thigh.castShadow = true;
    const sg = new THREE.Group();
    sg.position.y = -0.36;
    const shin = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.32, 0.36), jeansMat);
    shin.position.y = -0.16;
    shin.castShadow = true;
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.16, 0.44), shoeMat);
    shoe.position.set(0, -0.38, 0.03);
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.39, 0.05, 0.45), soleMat);
    sole.position.set(0, -0.46, 0.03);
    sg.add(shin, shoe, sole);
    lg.add(thigh, sg);
    return { lg, sg };
  };
  const lLeg = makeLeg(-1);
  const rLeg = makeLeg(1);
  g.add(lLeg.lg, rLeg.lg);

  g.visible = false;
  g.userData = {
    modelRoot: g,
    leftArm,
    rightArm,
    leftForearm: null,
    rightForearm: null,
    leftLeg: lLeg.lg,
    rightLeg: rLeg.lg,
    leftShin: lLeg.sg,
    rightShin: rLeg.sg,
  };
  return g;
}

// 2) TÍTULO "AIRFRYER" — Vira uma Airfryer 3D e fica parada!
function createAirfryerModel() {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.28, metalness: 0.35 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.22, metalness: 0.85 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x090d14, roughness: 0.5 });

  // 4 pés de borracha
  [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].forEach(([fx, fz]) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.12, 10), darkMat);
    foot.position.set(fx, 0.06, fz);
    g.add(foot);
  });

  // Corpo principal arredondado preto brilhante
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.64, 1.52, 20), bodyMat);
  body.position.y = 0.86;
  body.castShadow = true;
  g.add(body);

  // Tampa superior arredondada + saída de ar
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.68, 0.24, 20), bodyMat);
  topCap.position.y = 1.72;
  const silverRing = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.03, 8, 24), silverMat);
  silverRing.rotation.x = Math.PI / 2;
  silverRing.position.y = 1.6;
  const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 16), darkMat);
  vent.position.y = 1.85;
  g.add(topCap, silverRing, vent);

  // Gaveta inferior + puxador prateado na frente (+z)
  const drawerSeam = new THREE.Mesh(new THREE.CylinderGeometry(0.67, 0.65, 0.04, 20), silverMat);
  drawerSeam.position.y = 0.72;
  const handleTop = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.26), silverMat);
  handleTop.position.set(0, 0.64, 0.72);
  const handleBot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 0.26), silverMat);
  handleBot.position.set(0, 0.28, 0.72);
  const handleBar = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.46, 0.12), bodyMat);
  handleBar.position.set(0, 0.46, 0.84);
  const handleTrim = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.04), silverMat);
  handleTrim.position.set(0, 0.46, 0.91);
  g.add(drawerSeam, handleTop, handleBot, handleBar, handleTrim);

  // Painel digital LED frontal (200°C • 15:00)
  const panel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.78, 0.4),
    new THREE.MeshBasicMaterial({ map: createAirfryerPanelTexture() })
  );
  panel.position.set(0, 1.24, 0.68);
  g.add(panel);

  g.visible = false;
  g.userData = { isStatic: true, leftArm: null, rightArm: null, leftForearm: null, rightForearm: null, leftLeg: null, rightLeg: null };
  return g;
}

// 3) TÍTULO "HOMEM GULOSO" — Bombado, sem camisa, bumbum grande e cara de Chad!
function createHomemGulosoModel() {
  const g = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xc98a63, roughness: 0.55 });
  const skinShadeMat = new THREE.MeshStandardMaterial({ color: 0xb5754e, roughness: 0.6 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x161412, roughness: 0.7 });
  const shortsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
  const bootMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

  // Torso bombado em V (sem camisa!)
  const upperTorso = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.72, 0.6), skinMat);
  upperTorso.position.y = 1.66;
  upperTorso.castShadow = true;
  const waist = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.48, 0.5), skinMat);
  waist.position.y = 1.1;
  g.add(upperTorso, waist);

  // Peitorais esculpidos + 6-pack abs
  [-0.29, 0.29].forEach((px) => {
    const pec = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.36, 0.18), skinMat);
    pec.position.set(px, 1.72, 0.3);
    g.add(pec);
  });
  for (let row = 0; row < 3; row++) {
    [-0.17, 0.17].forEach((ax) => {
      const ab = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.12), skinShadeMat);
      ab.position.set(ax, 1.38 - row * 0.17, 0.26);
      g.add(ab);
    });
  }

  // Shorts + BUMBUM GRANDE esculpido atrás (-z)!
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.42, 0.56), shortsMat);
  hips.position.y = 0.86;
  g.add(hips);
  [-0.26, 0.26].forEach((bx) => {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 14), shortsMat);
    cheek.scale.set(1.02, 1.08, 1.25);
    cheek.position.set(bx, 0.84, -0.34);
    cheek.castShadow = true;
    g.add(cheek);
  });

  // Cabeça com CARA DE CHAD (mandíbula quadrada proeminente + cabelo penteado pra trás!)
  const chadFaceMat = new THREE.MeshStandardMaterial({ map: createChadFaceTexture(), roughness: 0.55 });
  const headMats = [skinMat, skinMat, hairMat, skinMat, chadFaceMat, hairMat];
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.72, 0.68), headMats);
  head.position.y = 2.42;
  head.castShadow = true;
  const chadJaw = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.22, 0.24), skinMat);
  chadJaw.position.set(0, 2.08, 0.28);
  const chadHairTop = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.76), hairMat);
  chadHairTop.position.set(0, 2.84, -0.02);
  const chadPompadour = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.16, 0.26), hairMat);
  chadPompadour.position.set(0, 2.92, 0.26);
  g.add(head, chadJaw, chadHairTop, chadPompadour);

  // Braços gigantes bombados
  const makeBuffArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * 0.82, 1.88, 0);
    const delt = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), skinMat);
    const bicep = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.5, 0.36), skinMat);
    bicep.position.y = -0.3;
    bicep.castShadow = true;
    const fg = new THREE.Group();
    fg.position.y = -0.52;
    const fore = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.46, 0.3), skinMat);
    fore.position.y = -0.22;
    fg.add(fore);
    ag.add(delt, bicep, fg);
    return { ag, fg };
  };
  const lA = makeBuffArm(-1);
  const rA = makeBuffArm(1);
  g.add(lA.ag, rA.ag);

  const makeLeg = (sx) => {
    const lg = new THREE.Group();
    lg.position.set(sx * 0.26, 0.72, 0);
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.4), skinMat);
    thigh.position.y = -0.16;
    const sg = new THREE.Group();
    sg.position.y = -0.32;
    const calf = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.36), skinMat);
    calf.position.y = -0.12;
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.48), bootMat);
    boot.position.set(0, -0.3, 0.05);
    sg.add(calf, boot);
    lg.add(thigh, sg);
    return { lg, sg };
  };
  const lLeg = makeLeg(-1);
  const rLeg = makeLeg(1);
  g.add(lLeg.lg, rLeg.lg);

  g.visible = false;
  g.userData = {
    modelRoot: g,
    leftArm: lA.ag,
    rightArm: rA.ag,
    leftForearm: lA.fg,
    rightForearm: rA.fg,
    leftLeg: lLeg.lg,
    rightLeg: rLeg.lg,
    leftShin: lLeg.sg,
    rightShin: rLeg.sg,
  };
  return g;
}

// 4) TÍTULO "MACHO" — Sem camisa, PELUDO, BOMBADO e FORTE!
function createMachoHairyBuffModel() {
  const g = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xc4825a, roughness: 0.62 });
  const hairyChestMat = new THREE.MeshStandardMaterial({ map: createHairyChestTexture(), roughness: 0.75 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1c1410, roughness: 0.92 });
  const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, roughness: 0.85 });
  const bootMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });

  // Torso ultra-bombado e peludo sem camisa
  const torsoMats = [skinMat, skinMat, skinMat, skinMat, hairyChestMat, skinMat];
  const upperTorso = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.82, 0.66), torsoMats);
  upperTorso.position.y = 1.66;
  upperTorso.castShadow = true;
  const traps = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.24, 0.54), skinMat);
  traps.position.y = 2.12;
  const lowerTorso = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.46, 0.56), torsoMats);
  lowerTorso.position.y = 1.06;
  g.add(upperTorso, traps, lowerTorso);

  // Peitorais maciços + tufos de pelos 3D no peito!
  [-0.33, 0.33].forEach((px) => {
    const pec = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.4, 0.2), hairyChestMat);
    pec.position.set(px, 1.72, 0.34);
    g.add(pec);
  });
  [
    [-0.3, 1.76, 0.45],
    [0.3, 1.76, 0.45],
    [0, 1.62, 0.42],
    [-0.18, 1.56, 0.43],
    [0.18, 1.56, 0.43],
    [0, 1.32, 0.34],
  ].forEach(([hx, hy, hz]) => {
    const tuft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.05), hairMat);
    tuft.position.set(hx, hy, hz);
    g.add(tuft);
  });

  // Cabeça barbuda e forte do Macho
  const beardFaceMat = new THREE.MeshStandardMaterial({ map: createMachoBeardFaceTexture(), roughness: 0.65 });
  const headMats = [skinMat, skinMat, hairMat, hairMat, beardFaceMat, hairMat];
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.72, 0.7), headMats);
  head.position.y = 2.52;
  head.castShadow = true;
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.2, 0.74), hairMat);
  hairTop.position.y = 2.92;
  g.add(head, hairTop);

  // Braços gigantes bombados e peludos
  const makePowerArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * 0.9, 1.9, 0);
    const delt = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 12), skinMat);
    const bicep = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.54, 0.42), skinMat);
    bicep.position.y = -0.32;
    bicep.castShadow = true;
    const armHair = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.24), hairMat);
    armHair.position.set(0, -0.32, 0.12);
    const fg = new THREE.Group();
    fg.position.y = -0.56;
    const fore = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.5, 0.36), skinMat);
    fore.position.y = -0.24;
    const foreHair = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.2), hairMat);
    foreHair.position.set(0, -0.22, 0.11);
    fg.add(fore, foreHair);
    ag.add(delt, bicep, armHair, fg);
    return { ag, fg };
  };
  const lA = makePowerArm(-1);
  const rA = makePowerArm(1);
  g.add(lA.ag, rA.ag);

  const makeLeg = (sx) => {
    const lg = new THREE.Group();
    lg.position.set(sx * 0.28, 0.84, 0);
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.44), jeansMat);
    thigh.position.y = -0.18;
    thigh.castShadow = true;
    const sg = new THREE.Group();
    sg.position.y = -0.36;
    const shin = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.4), jeansMat);
    shin.position.y = -0.16;
    shin.castShadow = true;
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.22, 0.52), bootMat);
    boot.position.set(0, -0.38, 0.05);
    sg.add(shin, boot);
    lg.add(thigh, sg);
    return { lg, sg };
  };
  const lLeg = makeLeg(-1);
  const rLeg = makeLeg(1);
  g.add(lLeg.lg, rLeg.lg);

  g.visible = false;
  g.userData = {
    modelRoot: g,
    leftArm: lA.ag,
    rightArm: rA.ag,
    leftForearm: lA.fg,
    rightForearm: rA.fg,
    leftLeg: lLeg.lg,
    rightLeg: rLeg.lg,
    leftShin: lLeg.sg,
    rightShin: rLeg.sg,
  };
  return g;
}

const playerPacModel = createPacMinecraftModel();
const playerAirfryerModel = createAirfryerModel();
const playerGulosoModel = createHomemGulosoModel();
const playerMachoModel = createMachoHairyBuffModel();

const playerMesh = new THREE.Group();
playerMesh.add(playerBaseModel, playerPacModel, playerAirfryerModel, playerGulosoModel, playerMachoModel);
playerMesh.userData = {
  ...playerBaseModel.userData,
  titleModels: {
    "Estudante ETEC": playerBaseModel,
    PAC: playerPacModel,
    Airfryer: playerAirfryerModel,
    "Homem Guloso": playerGulosoModel,
    Macho: playerMachoModel,
  },
  activeRig: playerBaseModel.userData,
};

// Escopeta 3ª Pessoa dedicada (presa ao peito/playerMesh, 100% horizontal apontando p/ +Z, segurada pelas DUAS mãos!)
const tpShotgunGroup = new THREE.Group();
tpShotgunGroup.visible = false;
tpShotgunGroup.position.set(0.01, 1.48, 0.48);
{
  const tpWood = new THREE.MeshStandardMaterial({ color: 0x6b3e1e, roughness: 0.68 });
  const tpMetal = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.78, roughness: 0.28 });
  const tpSteel = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.84, roughness: 0.22 });
  const tpSight = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  // Coronha encostada limpa no peito (z = -0.22 -> mundo z = 0.26), cano longo horizontal p/ frente (+Z)!
  const tpStock = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.145, 0.28), tpWood);
  tpStock.position.set(0, -0.045, -0.16);
  tpStock.rotation.x = 0.14;
  tpStock.castShadow = true;
  const tpGrip = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.13, 0.12), tpWood);
  tpGrip.position.set(0, -0.025, -0.04);
  const tpRec = new THREE.Mesh(new THREE.BoxGeometry(0.098, 0.135, 0.28), tpMetal);
  tpRec.position.set(0, 0.025, 0.08);
  tpRec.castShadow = true;
  const tpEject = new THREE.Mesh(new THREE.BoxGeometry(0.104, 0.046, 0.095), tpSteel);
  tpEject.position.set(0, 0.042, 0.08);
  const tpGuard = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.06, 0.1), tpMetal);
  tpGuard.position.set(0, -0.055, 0.03);
  const tpBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.033, 0.82, 10), tpMetal);
  tpBarrel.rotation.x = Math.PI / 2;
  tpBarrel.position.set(0, 0.068, 0.54);
  tpBarrel.castShadow = true;
  const tpTube = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.6, 10), tpSteel);
  tpTube.rotation.x = Math.PI / 2;
  tpTube.position.set(0, 0.016, 0.43);
  const tpPump = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.25, 10), tpWood);
  tpPump.rotation.x = Math.PI / 2;
  tpPump.position.set(0, 0.012, 0.24);
  tpPump.castShadow = true;
  const tpSightBead = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.032, 0.024), tpSight);
  tpSightBead.position.set(0, 0.11, 0.93);

  // Cartucho vermelho visível entrando na escopeta durante recarga em 3ª pessoa!
  const tpLoadShell = new THREE.Group();
  const tlHull = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.09, 8),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  tlHull.rotation.x = Math.PI / 2;
  const tlBrass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.028, 0.032, 8),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.2 })
  );
  tlBrass.rotation.x = Math.PI / 2;
  tlBrass.position.z = -0.055;
  tpLoadShell.add(tlHull, tlBrass);
  tpLoadShell.visible = false;
  tpLoadShell.position.set(0, -0.14, 0.08);

  tpShotgunGroup.add(tpStock, tpGrip, tpRec, tpEject, tpGuard, tpBarrel, tpTube, tpPump, tpSightBead, tpLoadShell);
  tpShotgunGroup.userData = { tpPump, tpLoadShell, pumpRestZ: 0.24 };
}
playerMesh.add(tpShotgunGroup);
playerMesh.userData.tpShotgunGroup = tpShotgunGroup;

scene.add(playerMesh);

function syncPlayerTitleSkin() {
  if (!playerMesh || !playerMesh.userData || !playerMesh.userData.titleModels) return;
  const models = playerMesh.userData.titleModels;
  const key = !state.isLambiHomem && models[state.activeTitle] ? state.activeTitle : "Estudante ETEC";
  Object.entries(models).forEach(([k, m]) => {
    m.visible = k === key;
    if (k !== key) {
      m.position.y = 0;
      m.rotation.set(0, 0, 0);
    }
  });
  const activeRig = models[key].userData;
  playerMesh.userData.activeRig = activeRig;
  // Reanexa Regador, Enxada e Item Segurado na mão direita da skin ativa!
  const { canGroup, hoeGroup, heldItemGroup } = playerMesh.userData;
  if (canGroup && hoeGroup && !activeRig.isStatic) {
    const handHost = activeRig.rightForearm || activeRig.rightArm;
    if (handHost) {
      const yOff = activeRig.rightForearm ? -0.34 : -0.78;
      if (canGroup.parent !== handHost) handHost.add(canGroup);
      if (hoeGroup.parent !== handHost) handHost.add(hoeGroup);
      if (heldItemGroup && heldItemGroup.parent !== handHost) handHost.add(heldItemGroup);
      canGroup.position.set(0, yOff, 0.24);
      hoeGroup.position.set(0, yOff, 0.16);
      if (heldItemGroup) heldItemGroup.position.set(0, yOff, 0.24);
    }
  }
  syncHeldToolVisibility();
}

function applyMachoSkin(skinId) {
  const cfg = MACHO_ALTERNATIVES.find((c) => c.id === skinId) || MACHO_ALTERNATIVES.find((c) => c.id === "clone_classic");
  if (!cfg || !playerMesh || !playerMesh.userData) return;
  const u = playerMesh.userData;
  if (u.shirtMat) u.shirtMat.color.setHex(cfg.shirt);
  if (u.pocketMat) u.pocketMat.color.setHex(cfg.pocket);
  if (u.jeansMat) u.jeansMat.color.setHex(cfg.pants);
  if (u.bootsMat) u.bootsMat.color.setHex(cfg.boots);
  if (u.strawMat) u.strawMat.color.setHex(cfg.hat);
  if (u.hatBandMat) u.hatBandMat.color.setHex(cfg.band);
  if (u.skinMat) u.skinMat.color.setHex(cfg.skin);
}

// Mãos em 1ª Pessoa fazendo o gesto "6-7" quando Coringando!
const fpCrazyArmsGroup = new THREE.Group();
fpCrazyArmsGroup.visible = false;
{
  const fpSkinMat = new THREE.MeshStandardMaterial({ color: 0xc98a63, roughness: 0.65 });
  const fpLeftHand = new THREE.Group();
  fpLeftHand.position.set(-0.34, -0.34, -0.68);
  const fpLArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.46), fpSkinMat);
  fpLArm.position.set(0, 0, 0.14);
  const fpLPalm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.2), fpSkinMat);
  fpLPalm.position.set(0, 0.02, -0.14);
  fpLeftHand.add(fpLArm, fpLPalm);

  const fpRightHand = new THREE.Group();
  fpRightHand.position.set(0.34, -0.34, -0.68);
  const fpRArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.46), fpSkinMat);
  fpRArm.position.set(0, 0, 0.14);
  const fpRPalm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.2), fpSkinMat);
  fpRPalm.position.set(0, 0.02, -0.14);
  fpRightHand.add(fpRArm, fpRPalm);

  fpCrazyArmsGroup.add(fpLeftHand, fpRightHand);
  fpCrazyArmsGroup.userData = { fpLeftHand, fpRightHand };
}
scene.add(camera);
camera.add(fpCrazyArmsGroup);

// Ferramenta em 1ª Pessoa (Regador ou Enxada na mão direita!)
const fpToolGroup = new THREE.Group();
fpToolGroup.visible = false;
{
  const fpCan = new THREE.Group();
  fpCan.position.set(0.42, -0.34, -0.78);
  fpCan.rotation.set(0.15, -0.35, 0);
  const fpCanBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.14, 0.24, 10),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.35, roughness: 0.4 })
  );
  const fpCanSpout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.045, 0.26, 8),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4 })
  );
  fpCanSpout.position.set(0, 0.06, -0.16);
  fpCanSpout.rotation.x = -0.85;
  fpCan.add(fpCanBody, fpCanSpout);

  const fpHoe = new THREE.Group();
  fpHoe.position.set(0.42, -0.32, -0.72);
  fpHoe.rotation.set(0.2, -0.18, -0.12);
  const fpHoeHandle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.028, 0.032, 1.05, 8),
    new THREE.MeshStandardMaterial({ color: 0x7c4a21, roughness: 0.85 })
  );
  fpHoeHandle.rotation.x = Math.PI / 2;
  fpHoeHandle.position.set(0, 0, -0.25);
  fpHoeBladeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.72, roughness: 0.28 });
  const fpHoeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.3, 0.035), fpHoeBladeMat);
  fpHoeBlade.position.set(0, -0.12, -0.76);
  fpHoeBlade.rotation.x = -0.22;
  fpHoe.add(fpHoeHandle, fpHoeBlade);

  const fpHeldItem = createGenericHeldItemRig(true);
  fpHeldItem.position.set(0.38, -0.28, -0.66);
  fpHeldItem.rotation.set(0.18, -0.35, 0);

  // Viewmodel 1ª Pessoa da Escopeta com AS DUAS MÃOS + telha pump deslizante + cartucho entrando na recarga!
  const fpShotgunGroup = new THREE.Group();
  fpShotgunGroup.visible = false;
  fpShotgunGroup.position.set(0.16, -0.27, -0.58);

  const fpGunPivot = new THREE.Group();
  const fpsWood = new THREE.MeshStandardMaterial({ color: 0x6b3e1e, roughness: 0.68 });
  const fpsMetal = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.78, roughness: 0.28 });
  const fpsSteel = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.84, roughness: 0.22 });
  const fpsSight = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const fpsSkin = new THREE.MeshStandardMaterial({ color: 0xc98a63, roughness: 0.65 });
  const fpsSleeve = new THREE.MeshStandardMaterial({ color: 0x1f4e2e, roughness: 0.7 });

  // Corpo da escopeta apontando para -Z (frente da câmera)
  const fpStock = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.135, 0.36), fpsWood);
  fpStock.position.set(0, -0.055, 0.26);
  fpStock.rotation.x = -0.18;
  const fpGrip = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.125, 0.13), fpsWood);
  fpGrip.position.set(0, -0.025, 0.08);
  const fpRec = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.122, 0.28), fpsMetal);
  fpRec.position.set(0, 0.025, -0.05);
  const fpEject = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.044, 0.095), fpsSteel);
  fpEject.position.set(0.042, 0.04, -0.05);
  const fpGuard = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.055, 0.1), fpsMetal);
  fpGuard.position.set(0, -0.055, -0.01);
  const fpBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.031, 0.86, 12), fpsMetal);
  fpBarrel.rotation.x = Math.PI / 2;
  fpBarrel.position.set(0, 0.068, -0.54);
  const fpTube = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.64, 12), fpsSteel);
  fpTube.rotation.x = Math.PI / 2;
  fpTube.position.set(0, 0.016, -0.43);
  const fpSightBead = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.03, 0.022), fpsSight);
  fpSightBead.position.set(0, 0.106, -0.94);

  // Telha de madeira pump-action (desliza em Z!)
  const fpPump = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.044, 0.26, 12), fpsWood);
  fpPump.rotation.x = Math.PI / 2;
  fpPump.position.set(0, 0.012, -0.46);

  // Cartucho vermelho/latão animado subindo pela abertura inferior durante a recarga!
  const fpLoadShell = new THREE.Group();
  const flHull = new THREE.Mesh(
    new THREE.CylinderGeometry(0.024, 0.024, 0.085, 10),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
  );
  flHull.rotation.x = Math.PI / 2;
  const flBrass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.026, 0.026, 0.03, 10),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.2 })
  );
  flBrass.rotation.x = Math.PI / 2;
  flBrass.position.z = 0.052;
  fpLoadShell.add(flHull, flBrass);
  fpLoadShell.visible = false;
  fpLoadShell.position.set(0, -0.14, -0.05);

  // MÃO DIREITA segurando a empunhadura / coronha
  const fpRightHandGrp = new THREE.Group();
  fpRightHandGrp.position.set(0.04, -0.09, 0.13);
  const fpRPalm = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.1, 0.13), fpsSkin);
  const fpRForearm = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.11, 0.34), fpsSkin);
  fpRForearm.position.set(0.09, -0.08, 0.2);
  fpRForearm.rotation.set(0.28, 0.26, 0);
  const fpRSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.138, 0.135, 0.22), fpsSleeve);
  fpRSleeve.position.set(0.16, -0.15, 0.38);
  fpRSleeve.rotation.set(0.28, 0.26, 0);
  fpRightHandGrp.add(fpRPalm, fpRForearm, fpRSleeve);

  // MÃO ESQUERDA alcançando pela esquerda para segurar a telha pump (e desce p/ recarregar!)
  const fpLeftHandGrp = new THREE.Group();
  fpLeftHandGrp.position.set(-0.04, -0.035, -0.45);
  const fpLPalm = new THREE.Mesh(new THREE.BoxGeometry(0.105, 0.085, 0.135), fpsSkin);
  const fpLForearm = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.105, 0.44), fpsSkin);
  fpLForearm.position.set(-0.18, -0.12, 0.22);
  fpLForearm.rotation.set(0.32, -0.58, 0.14);
  const fpLSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.13, 0.24), fpsSleeve);
  fpLSleeve.position.set(-0.34, -0.22, 0.4);
  fpLSleeve.rotation.set(0.32, -0.58, 0.14);
  fpLeftHandGrp.add(fpLPalm, fpLForearm, fpLSleeve);

  fpGunPivot.add(
    fpStock, fpGrip, fpRec, fpEject, fpGuard, fpBarrel, fpTube, fpSightBead,
    fpPump, fpLoadShell, fpRightHandGrp, fpLeftHandGrp
  );
  fpShotgunGroup.add(fpGunPivot);
  fpShotgunGroup.userData = {
    fpGunPivot,
    fpPump,
    fpLoadShell,
    fpRightHandGrp,
    fpLeftHandGrp,
    pumpRestZ: -0.46,
    leftHandRestPos: new THREE.Vector3(-0.04, -0.035, -0.45),
  };

  fpToolGroup.add(fpCan, fpHoe, fpHeldItem, fpShotgunGroup);
  fpToolGroup.userData = { fpCan, fpHoe, fpHeldItem, fpShotgunGroup };
}
camera.add(fpToolGroup);

