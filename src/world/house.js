// 2. CASA AMPLIADA DO ALYFFER (Quarto, Sala, Cozinha, Banheiro & Segredo do Porão!) — Interior Reformulado!
function buildBedroomInterior() {
  const floorMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#8b5a2b", "#5c3a1a", 6, 5),
    roughness: 0.78,
  });
  const kitchenFloorMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#f1f5f9", "#cbd5e1", 10),
    roughness: 0.58,
  });
  const bathFloorMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e0f2fe", "#bae6fd", 8),
    roughness: 0.48,
  });
  const wallMat = new THREE.MeshStandardMaterial({
    map: createStuccoWallTexture("#efe8d8", "#d6ccb8", 4, 2),
    roughness: 0.86,
  });
  const bathWallMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e0f2fe", "#cfe8fc", 12),
    roughness: 0.52,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#6b4423", "#422710", 2, 2),
    roughness: 0.72,
  });
  const woodLightMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#a47148", "#6f4726", 2, 2),
    roughness: 0.74,
  });
  const whiteCeramic = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28, metalness: 0.08 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xb8c4d0, metalness: 0.72, roughness: 0.25 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.55, roughness: 0.35 });
  const graniteMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.15 });
  const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x4a2c16, roughness: 0.8 });

  // Iluminação completa da casa + luminárias visuais no teto!
  const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  [
    [-5.5, 3.8, -3.5],
    [5.5, 3.8, -3.5],
    [-4.0, 3.8, 4.5],
    [6.6, 3.8, 4.8],
  ].forEach(([lx, ly, lz], idx) => {
    const lamp = new THREE.PointLight(0xfff1c9, 0.78, 23);
    lamp.position.set(lx, ly, lz);
    interiorGroup.add(lamp);
    if (idx > 0) {
      const fixture = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.1, 14), steelMat);
      fixture.position.set(lx, 4.34, lz);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), bulbMat);
      dome.scale.set(1, 0.5, 1);
      dome.position.set(lx, 4.26, lz);
      interiorGroup.add(fixture, dome);
    }
  });

  // Forro do teto de madeira (FrontSide p/ baixo)
  const ceilingPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20.6, 16.6),
    new THREE.MeshStandardMaterial({
      map: createWoodPlankTexture("#d4b083", "#a88356", 5, 4),
      emissive: 0x6b4f2f,
      emissiveIntensity: 0.2,
      roughness: 0.85,
      side: THREE.FrontSide,
    })
  );
  ceilingPlane.rotation.x = Math.PI / 2;
  ceilingPlane.position.set(0, 4.4, 0);
  interiorGroup.add(ceilingPlane);

  // Parede frontal (FrontSide voltado p/ dentro)
  const frontWallIn = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 4.4),
    new THREE.MeshStandardMaterial({ map: createStuccoWallTexture("#efe8d8", "#d6ccb8", 4, 2), roughness: 0.85, side: THREE.FrontSide })
  );
  frontWallIn.rotation.y = Math.PI;
  frontWallIn.position.set(0, 2.2, 8.1);
  interiorGroup.add(frontWallIn);

  // Pisos (Madeira principal + Azulejo Cozinha + Azulejo Banheiro)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.2, 16.4), floorMat);
  floor.position.y = -0.1;
  floor.receiveShadow = true;
  interiorGroup.add(floor);

  const kitchenTile = new THREE.Mesh(new THREE.PlaneGeometry(9.0, 9.0), kitchenFloorMat);
  kitchenTile.rotation.x = -Math.PI / 2;
  kitchenTile.position.set(5.5, 0.012, -3.5);
  interiorGroup.add(kitchenTile);

  const bathTile = new THREE.Mesh(new THREE.PlaneGeometry(6.8, 7.0), bathFloorMat);
  bathTile.rotation.x = -Math.PI / 2;
  bathTile.position.set(6.6, 0.015, 4.5);
  interiorGroup.add(bathTile);

  // Paredes externas (Norte, Oeste, Leste) + rodapés de madeira!
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(20.4, 4.4, 0.25), wallMat);
  backWall.position.set(0, 2.2, -8.1);
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.4, 16.4), wallMat);
  leftWall.position.set(-10.1, 2.2, 0);
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.4, 16.4), wallMat);
  rightWall.position.set(10.1, 2.2, 0);
  interiorGroup.add(backWall, leftWall, rightWall);

  // Rodapés nas paredes externas
  const bbBack = new THREE.Mesh(new THREE.BoxGeometry(20.1, 0.16, 0.06), baseboardMat);
  bbBack.position.set(0, 0.08, -7.95);
  const bbLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 16.1), baseboardMat);
  bbLeft.position.set(-9.95, 0.08, 0);
  const bbRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 16.1), baseboardMat);
  bbRight.position.set(9.95, 0.08, 0);
  interiorGroup.add(bbBack, bbLeft, bbRight);

  // Janelas internas decorativas com luz natural & cortinas nas paredes Oeste e Leste!
  const winGlowMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd });
  const curtainMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.9 });
  [
    [-9.94, 2.35, -4.2, Math.PI / 2],
    [-9.94, 2.35, 4.5, Math.PI / 2],
    [9.94, 2.35, -3.0, -Math.PI / 2],
  ].forEach(([wx, wy, wz, ry]) => {
    const wg = new THREE.Group();
    wg.position.set(wx, wy, wz);
    wg.rotation.y = ry;
    const wf = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.45, 0.08), woodMat);
    const wp = new THREE.Mesh(new THREE.PlaneGeometry(1.86, 1.2), winGlowMat);
    wp.position.z = 0.048;
    const wv = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.24, 0.1), woodMat);
    const wh = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.06, 0.1), woodMat);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(2.26, 0.09, 0.24), woodMat);
    sill.position.set(0, -0.74, 0.08);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.55, 8), darkMetalMat);
    rod.rotation.z = Math.PI / 2;
    rod.position.set(0, 0.84, 0.12);
    [-1.08, 1.08].forEach((cx) => {
      const curt = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.85, 0.1), curtainMat);
      curt.position.set(cx, -0.05, 0.12);
      wg.add(curt);
    });
    wg.add(wf, wp, wv, wh, sill, rod);
    interiorGroup.add(wg);
  });

  function addHouseWall(cx, cz, w, d, mat = wallMat) {
    const wm = new THREE.Mesh(new THREE.BoxGeometry(w, 4.42, d), mat);
    wm.position.set(cx, 2.21, cz);
    wm.castShadow = true;
    wm.receiveShadow = true;
    interiorGroup.add(wm);
    addObstacleBox(cx, cz, w, d, interiorObstacles);
  }

  // Divisórias internas com portas amplas
  addHouseWall(-1.0, -5.4, 0.24, 5.2);
  addHouseWall(-1.0, 0.4, 0.24, 1.2);
  addHouseWall(-7.0, 1.0, 6.0, 0.24);
  addHouseWall(7.9, 1.0, 4.2, 0.24, bathWallMat);
  addHouseWall(3.2, 5.7, 0.24, 4.6, bathWallMat);

  // ===================== QUARTO DO ALYFFER (NO) =====================
  const ceilingBeam = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.16, 0.22), woodMat);
  ceilingBeam.position.set(-5.5, 4.28, -3.5);
  interiorGroup.add(ceilingBeam);
  const fanCanopy = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.1, 0.1, 12), steelMat);
  fanCanopy.position.set(-5.5, 4.14, -3.5);
  const fanRod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.48, 10), steelMat);
  fanRod.position.set(-5.5, 3.88, -3.5);
  interiorGroup.add(fanCanopy, fanRod);

  ceilingFanMesh = new THREE.Group();
  ceilingFanMesh.position.set(-5.5, 3.62, -3.5);
  ceilingFanMesh.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.16, 12), steelMat));
  for (let b = 0; b < 4; b++) {
    const bp = new THREE.Group();
    bp.rotation.y = (b * Math.PI) / 2;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, 0.06), steelMat);
    arm.position.set(0.22, 0, 0);
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.03, 0.22), woodMat);
    blade.position.set(0.56, 0, 0);
    blade.rotation.x = 0.08;
    bp.add(arm, blade);
    ceilingFanMesh.add(bp);
  }
  const fanGlobe = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, emissive: 0xfde68a, emissiveIntensity: 0.7 })
  );
  fanGlobe.position.y = -0.14;
  ceilingFanMesh.add(fanGlobe);
  interiorGroup.add(ceilingFanMesh);

  // Cama Reformulada do Alyffer em (-7.0, 0, -5.0) — cabeceira de madeira, edredom dobrado, 2 travesseiros & criado-mudo com abajur!
  const bed = new THREE.Group();
  bed.position.set(-7.0, 0, -5.0);
  const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.34, 2.72), woodMat);
  bedBase.position.y = 0.32;
  bedBase.castShadow = true;
  const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.08, 1.32, 0.14), woodMat);
  headboard.position.set(0, 0.66, -1.32);
  headboard.castShadow = true;
  const footboard = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.68, 0.12), woodMat);
  footboard.position.set(0, 0.34, 1.32);
  [[-0.96, -1.32], [0.96, -1.32], [-0.96, 1.32], [0.96, 1.32]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, pz < 0 ? 1.44 : 0.78, 0.14), baseboardMat);
    post.position.set(px, (pz < 0 ? 1.44 : 0.78) * 0.5, pz);
    bed.add(post);
  });
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(1.88, 0.28, 2.52),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
  );
  mattress.position.y = 0.62;
  const sheetFold = new THREE.Mesh(
    new THREE.BoxGeometry(1.94, 0.08, 0.34),
    new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.85 })
  );
  sheetFold.position.set(0, 0.77, -0.35);
  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(1.94, 0.31, 1.68),
    new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.82 })
  );
  blanket.position.set(0, 0.63, 0.44);
  [-0.44, 0.44].forEach((px) => {
    const pil = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.18, 0.48),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    );
    pil.position.set(px, 0.82, -0.94);
    pil.rotation.x = 0.12;
    bed.add(pil);
  });
  bed.add(bedBase, headboard, footboard, mattress, sheetFold, blanket);
  interiorGroup.add(bed);
  addObstacleBox(-7.0, -5.0, 2.1, 2.75, interiorObstacles);

  // Criado-mudo com abajur quentinho ao lado da cama (deixa o alçapão em -9.15, -7.05 livre!)
  const nightStand = new THREE.Group();
  nightStand.position.set(-5.45, 0, -6.1);
  const nsBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.62, 0.62), woodLightMat);
  nsBody.position.y = 0.31;
  nsBody.castShadow = true;
  const nsDrawer = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.2, 0.04), woodMat);
  nsDrawer.position.set(0, 0.42, 0.31);
  const nsPull = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.05), steelMat);
  nsPull.position.set(0, 0.42, 0.34);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.18, 10), steelMat);
  lampBase.position.y = 0.71;
  const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.19, 0.22, 12),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, emissive: 0xf59e0b, emissiveIntensity: 0.6, roughness: 0.5 })
  );
  lampShade.position.y = 0.9;
  nightStand.add(nsBody, nsDrawer, nsPull, lampBase, lampShade);
  interiorGroup.add(nightStand);
  addObstacleBox(-5.45, -6.1, 0.75, 0.68, interiorObstacles);

  // Pôster do PAC do TazerCraft na parede do quarto
  const pacFrame = new THREE.Mesh(new THREE.BoxGeometry(1.74, 2.04, 0.08), darkMetalMat);
  pacFrame.position.set(-7.0, 2.38, -7.94);
  const pacPoster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.78),
    new THREE.MeshBasicMaterial({ map: createPacPosterTexture() })
  );
  pacPoster.position.set(-7.0, 2.38, -7.88);
  interiorGroup.add(pacFrame, pacPoster);

  // Estante de Mangás Reformulada em (-3.6, 0, -7.45) — prateleiras reais, volumes variados e miniaturas!
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(-3.6, 0, -7.45);
  const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.66, 0.1), baseboardMat);
  shelfBack.position.set(0, 1.33, -0.26);
  const shelfSideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.66, 0.6), woodMat);
  shelfSideL.position.set(-1.05, 1.33, 0);
  const shelfSideR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.66, 0.6), woodMat);
  shelfSideR.position.set(1.05, 1.33, 0);
  shelfGroup.add(shelfBack, shelfSideL, shelfSideR);
  [0.08, 0.66, 1.32, 1.98, 2.62].forEach((sy) => {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.09, 0.62), woodLightMat);
    plank.position.set(0, sy, 0);
    plank.castShadow = true;
    shelfGroup.add(plank);
  });
  const mangaColors = [0xffffff, 0x18181b, 0xef4444, 0x3b82f6, 0xfacc15, 0x22c55e, 0xa855f7, 0xf97316];
  [0.92, 1.58, 2.24].forEach((sy, rowIdx) => {
    for (let m = 0; m < 10; m++) {
      const h = 0.34 + ((m + rowIdx) % 3) * 0.04;
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, h, 0.34),
        new THREE.MeshStandardMaterial({ color: mangaColors[(m + rowIdx * 3) % mangaColors.length], roughness: 0.6 })
      );
      book.position.set(-0.84 + m * 0.185, sy - 0.22 + h * 0.5, 0.04);
      if (m === 8 && rowIdx === 1) book.rotation.z = 0.24;
      shelfGroup.add(book);
    }
  });
  // Miniatura colecionável no topo da estante
  const figPed = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.06, 10), darkMetalMat);
  figPed.position.set(-0.45, 2.7, 0);
  const figBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.12), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
  figBody.position.set(-0.45, 2.86, 0);
  const figHead = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), new THREE.MeshStandardMaterial({ color: 0xf6dac4 }));
  figHead.position.set(-0.45, 3.06, 0);
  shelfGroup.add(figPed, figBody, figHead);
  interiorGroup.add(shelfGroup);
  addObstacleBox(-3.6, -7.45, 2.3, 0.72, interiorObstacles);

  // Escrivaninha da ETEC Reformulada em (-8.4, 0, -0.55) — gaveteiro, laptop aceso, luminária, mochila detalhada & cadeira!
  const deskGroup = new THREE.Group();
  deskGroup.position.set(-8.4, 0, -0.55);
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.1, 1.15), woodLightMat);
  deskTop.position.y = 0.92;
  deskTop.castShadow = true;
  const drawerUnit = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.86, 1.05), woodMat);
  drawerUnit.position.set(-0.72, 0.43, 0);
  [0.24, 0.58].forEach((dy) => {
    const pull = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.035, 0.05), steelMat);
    pull.position.set(-0.72, dy, 0.54);
    deskGroup.add(pull);
  });
  [[0.94, -0.46], [0.94, 0.46]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), darkMetalMat);
    leg.position.set(lx, 0.45, lz);
    deskGroup.add(leg);
  });
  // Laptop aberto brilhando + caderno + copo de canetas + luminária de mesa
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.03, 0.38), darkMetalMat);
  lapBase.position.set(-0.1, 0.985, 0.04);
  const lapLid = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.36, 0.03), darkMetalMat);
  lapLid.position.set(-0.1, 1.15, -0.15);
  lapLid.rotation.x = -0.2;
  const lapScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.48, 0.3),
    new THREE.MeshBasicMaterial({ map: createTvScreenTexture("ETEC • TCC", "Estudando em Pau Arcado", "#4ade80") })
  );
  lapScreen.position.set(-0.1, 1.15, -0.13);
  lapScreen.rotation.x = -0.2;
  const notebook = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.045, 0.32), new THREE.MeshStandardMaterial({ color: 0x2563eb }));
  notebook.position.set(0.58, 0.99, 0.14);
  notebook.rotation.y = -0.22;
  const penCup = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.14, 8), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
  penCup.position.set(0.78, 1.04, -0.32);
  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.62, 0.28), new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.78 }));
  backpack.position.set(0.68, 0.31, 0.38);
  const bpPocket = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.26, 0.08), new THREE.MeshStandardMaterial({ color: 0x7f1d1d }));
  bpPocket.position.set(0.68, 0.2, 0.53);
  deskGroup.add(deskTop, drawerUnit, lapBase, lapLid, lapScreen, notebook, penCup, backpack, bpPocket);
  interiorGroup.add(deskGroup);
  addObstacleBox(-8.4, -0.55, 2.2, 1.25, interiorObstacles);

  // Alçapão Secreto do Porão (invisível até completar os 2 passos escondidos!)
  secretTrapdoorMesh = new THREE.Group();
  secretTrapdoorMesh.position.set(-9.15, 0.03, -7.05);
  const hatchFrame = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 1.15), darkMetalMat);
  const hatchCore = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.08, 0.92),
    new THREE.MeshStandardMaterial({ color: 0x09090b, emissive: 0x581c87, emissiveIntensity: 0.45 })
  );
  const hatchRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.14, 0.025, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 })
  );
  hatchRing.rotation.x = Math.PI / 2;
  hatchRing.position.y = 0.05;
  secretTrapdoorMesh.add(hatchFrame, hatchCore, hatchRing);
  secretTrapdoorMesh.visible = false;
  interiorGroup.add(secretTrapdoorMesh);

  // ===================== COZINHA (NE) — ARMÁRIOS AÉREOS, BANCADA GRANITO, FOGÃO 4 BOCAS, GELADEIRA & MESA C/ CADEIRAS =====================
  const kCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.96, 0.95), woodMat);
  kCounter.position.set(3.2, 0.48, -7.45);
  kCounter.castShadow = true;
  const kTop = new THREE.Mesh(new THREE.BoxGeometry(3.72, 0.09, 1.04), graniteMat);
  kTop.position.set(3.2, 0.99, -7.45);
  // Portinhas e puxadores metálicos no balcão + armários aéreos na parede!
  [2.05, 3.2, 4.35].forEach((dx) => {
    const kDoor = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.78, 0.04), woodLightMat);
    kDoor.position.set(dx, 0.48, -6.96);
    const kPull = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.05), steelMat);
    kPull.position.set(dx + 0.36, 0.62, -6.92);
    interiorGroup.add(kDoor, kPull);
  });
  const upperCab = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.95, 0.54), woodLightMat);
  upperCab.position.set(3.2, 2.45, -7.68);
  const backsplash = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.85, 0.04), kitchenFloorMat);
  backsplash.position.set(3.9, 1.48, -7.95);
  const kSinkBasin = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.06, 0.58), steelMat);
  kSinkBasin.position.set(2.4, 1.04, -7.45);
  const kFaucetV = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.34, 8), steelMat);
  kFaucetV.position.set(2.4, 1.21, -7.78);
  const kFaucetH = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.24, 8), steelMat);
  kFaucetH.rotation.x = Math.PI / 2;
  kFaucetH.position.set(2.4, 1.36, -7.66);
  interiorGroup.add(kCounter, kTop, upperCab, backsplash, kSinkBasin, kFaucetV, kFaucetH);
  addObstacleBox(3.2, -7.45, 3.7, 1.05, interiorObstacles);

  // Fogão 4 bocas detalhado + coifa exaustora + panela + frigideira!
  const stove = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.98, 0.96), whiteCeramic);
  stove.position.set(5.75, 0.49, -7.45);
  const stoveTop = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.05, 0.96), steelMat);
  stoveTop.position.set(5.75, 1.0, -7.45);
  const ovenDoor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.52, 0.06), darkMetalMat);
  ovenDoor.position.set(5.75, 0.42, -6.96);
  const ovenHandle = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.045, 0.08), steelMat);
  ovenHandle.position.set(5.75, 0.72, -6.92);
  [[-0.26, -0.22], [0.26, -0.22], [-0.26, 0.2], [0.26, 0.2]].forEach(([bx, bz]) => {
    const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 0.03, 10), darkMetalMat);
    burner.position.set(5.75 + bx, 1.04, -7.45 + bz);
    interiorGroup.add(burner);
  });
  const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.18, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.4 }));
  pan.position.set(5.49, 1.13, -7.25);
  const panLid = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.03, 12), steelMat);
  panLid.position.set(5.49, 1.23, -7.25);
  const rangeHood = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.22, 0.72), steelMat);
  rangeHood.position.set(5.75, 2.28, -7.58);
  const hoodChimney = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.9, 0.36), steelMat);
  hoodChimney.position.set(5.75, 3.32, -7.76);
  interiorGroup.add(stove, stoveTop, ovenDoor, ovenHandle, pan, panLid, rangeHood, hoodChimney);
  addObstacleBox(5.75, -7.45, 1.2, 1.02, interiorObstacles);

  // Geladeira dupla no canto nordeste (preservando a fresta secreta em x=7.55, z=-7.95!)
  const fridge = new THREE.Mesh(new THREE.BoxGeometry(1.18, 2.34, 1.06), whiteCeramic);
  fridge.position.set(9.15, 1.17, -7.3);
  fridge.castShadow = true;
  const fridgeSeam = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.03, 1.08), darkMetalMat);
  fridgeSeam.position.set(9.15, 1.62, -7.3);
  const fridgeHandle1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.44, 0.07), steelMat);
  fridgeHandle1.position.set(8.68, 1.92, -6.75);
  const fridgeHandle2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.64, 0.07), steelMat);
  fridgeHandle2.position.set(8.68, 1.12, -6.75);
  const fridgeDisp = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.04), darkMetalMat);
  fridgeDisp.position.set(9.18, 1.26, -6.76);
  interiorGroup.add(fridge, fridgeSeam, fridgeHandle1, fridgeHandle2, fridgeDisp);
  addObstacleBox(9.15, -7.3, 1.22, 1.12, interiorObstacles);

  // Botão secreto minúsculo enferrujado escondido na fresta da parede atrás da geladeira!
  const hiddenSwitch1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.14, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x7c2d12, metalness: 0.5, roughness: 0.7 })
  );
  hiddenSwitch1.position.set(7.55, 0.72, -7.95);
  interiorGroup.add(hiddenSwitch1);

  // Mesa de Jantar da Cozinha com toalha, 4 cadeiras, bule vermelho e canecas!
  const kTable = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.1, 1.48), woodLightMat);
  kTable.position.set(5.4, 0.85, -2.6);
  kTable.castShadow = true;
  const tableRunner = new THREE.Mesh(
    new THREE.BoxGeometry(2.58, 0.02, 0.56),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.85 })
  );
  tableRunner.position.set(5.4, 0.91, -2.6);
  interiorGroup.add(kTable, tableRunner);
  [[-1.08, -0.58], [1.08, -0.58], [-1.08, 0.58], [1.08, 0.58]].forEach(([tx, tz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), woodMat);
    leg.position.set(5.4 + tx, 0.425, -2.6 + tz);
    interiorGroup.add(leg);
  });
  [[-0.65, -0.92, 0], [0.65, -0.92, 0], [-0.65, 0.92, Math.PI], [0.65, 0.92, Math.PI]].forEach(([cx, cz, ry]) => {
    const ch = new THREE.Group();
    ch.position.set(5.4 + cx, 0, -2.6 + cz);
    ch.rotation.y = ry;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.48), woodLightMat);
    seat.position.y = 0.48;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.48, 0.06), woodMat);
    back.position.set(0, 0.74, -0.21);
    [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].forEach(([lx, lz]) => {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.48, 0.055), woodMat);
      l.position.set(lx, 0.24, lz);
      ch.add(l);
    });
    ch.add(seat, back);
    interiorGroup.add(ch);
  });
  const coffeePot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.16, 0.32, 12),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.35, roughness: 0.35 })
  );
  coffeePot.position.set(5.4, 1.07, -2.6);
  const potLidK = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), darkMetalMat);
  potLidK.position.set(5.4, 1.25, -2.6);
  const mugK1 = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.15, 10), whiteCeramic);
  mugK1.position.set(4.92, 0.99, -2.42);
  const mugK2 = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.15, 10), whiteCeramic);
  mugK2.position.set(5.86, 0.99, -2.74);
  interiorGroup.add(coffeePot, potLidK, mugK1, mugK2);
  addObstacleBox(5.4, -2.6, 2.7, 1.75, interiorObstacles);

  // ===================== BANHEIRO (SE) — VASO, GABINETE C/ PIA E ESPELHO ILUMINADO, BOX COM CHUVEIRO & TOALHEIRO =====================
  const toiletBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.23, 0.46, 14), whiteCeramic);
  toiletBase.position.set(9.1, 0.23, 2.5);
  const toiletTank = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.62, 0.58), whiteCeramic);
  toiletTank.position.set(9.46, 0.68, 2.5);
  const flushBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 8), steelMat);
  flushBtn.position.set(9.46, 1.0, 2.5);
  const toiletLid = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.06, 14), whiteCeramic);
  toiletLid.position.set(9.1, 0.49, 2.5);
  const tpRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.13, 10), whiteCeramic);
  tpRoll.rotation.x = Math.PI / 2;
  tpRoll.position.set(9.86, 0.68, 1.78);
  interiorGroup.add(toiletBase, toiletTank, flushBtn, toiletLid, tpRoll);
  addObstacleBox(9.2, 2.5, 0.95, 0.9, interiorObstacles);

  const bSinkCabinet = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.84, 0.74), woodLightMat);
  bSinkCabinet.position.set(4.8, 0.42, 7.35);
  const bSinkTop = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.08, 0.78), whiteCeramic);
  bSinkTop.position.set(4.8, 0.86, 7.35);
  const bBasin = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.22, 0.12, 14), whiteCeramic);
  bBasin.position.set(4.8, 0.94, 7.3);
  const bFaucet = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.028, 0.24, 8), steelMat);
  bFaucet.position.set(4.8, 1.02, 7.62);
  const bMirrorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.26, 1.12, 0.06), woodMat);
  bMirrorFrame.position.set(4.8, 1.74, 7.92);
  const bMirror = new THREE.Mesh(
    new THREE.BoxGeometry(1.12, 0.98, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xbae6fd, metalness: 0.85, roughness: 0.08 })
  );
  bMirror.position.set(4.8, 1.74, 7.91);
  const bMirrorLight = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.08, 0.12), bulbMat);
  bMirrorLight.position.set(4.8, 2.38, 7.88);
  const towelBar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.72), steelMat);
  towelBar.position.set(3.42, 1.38, 6.2);
  const towelCloth = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.62, 0.56), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.9 }));
  towelCloth.position.set(3.46, 1.08, 6.2);
  interiorGroup.add(bSinkCabinet, bSinkTop, bBasin, bFaucet, bMirrorFrame, bMirror, bMirrorLight, towelBar, towelCloth);
  addObstacleBox(4.8, 7.35, 1.5, 0.85, interiorObstacles);

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.32,
    roughness: 0.1,
    metalness: 0.2,
  });
  const showerPane = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.45, 2.4), glassMat);
  showerPane.position.set(7.35, 1.225, 6.7);
  const showerFrameTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 2.44), steelMat);
  showerFrameTop.position.set(7.35, 2.46, 6.7);
  const showerFrameSide = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.48, 0.08), steelMat);
  showerFrameSide.position.set(7.35, 1.24, 5.52);
  interiorGroup.add(showerPane, showerFrameTop, showerFrameSide);
  addObstacleBox(7.35, 6.7, 0.18, 2.4, interiorObstacles);
  const showerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.1, 14), whiteCeramic);
  showerHead.position.set(9.4, 2.55, 6.6);
  const showerPipe = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.07, 0.07), steelMat);
  showerPipe.position.set(9.7, 2.6, 6.6);
  const showerTap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 10), steelMat);
  showerTap.rotation.z = Math.PI / 2;
  showerTap.position.set(9.92, 1.32, 6.6);
  const hiddenDrainValve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.04, 10),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
  );
  hiddenDrainValve.position.set(9.1, 0.03, 7.1);
  interiorGroup.add(showerHead, showerPipe, showerTap, hiddenDrainValve);

  // ===================== SALA DE ESTAR (SO / CENTRO) — SOFÁ C/ ALMOFADAS, MESINHA, RACK, TV & PLANTA =====================
  const livingRug = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 3.8),
    new THREE.MeshStandardMaterial({ map: createTileFloorTexture("#166534", "#14532d", 6), roughness: 0.95 })
  );
  livingRug.rotation.x = -Math.PI / 2;
  livingRug.position.set(-4.2, 0.015, 4.5);
  const rugBorder = new THREE.Mesh(new THREE.PlaneGeometry(5.45, 4.05), new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.95 }));
  rugBorder.rotation.x = -Math.PI / 2;
  rugBorder.position.set(-4.2, 0.013, 4.5);
  interiorGroup.add(rugBorder, livingRug);

  // Sofá aconchegante com braços, almofadas de assento/encosto e travesseiros decorativos!
  const sofaMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.88 });
  const sofaCushionMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.86 });
  const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.36, 3.2), sofaMat);
  sofaSeat.position.set(-8.6, 0.22, 4.5);
  sofaSeat.castShadow = true;
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.02, 3.2), sofaMat);
  sofaBack.position.set(-9.12, 0.62, 4.5);
  [-1.48, 1.48].forEach((az) => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.68, 0.28), sofaMat);
    arm.position.set(-8.6, 0.42, 4.5 + az);
    interiorGroup.add(arm);
  });
  [-0.92, 0, 0.92].forEach((cz) => {
    const cush = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.16, 0.88), sofaCushionMat);
    cush.position.set(-8.52, 0.46, 4.5 + cz);
    interiorGroup.add(cush);
  });
  const throwP1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.42), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.85 }));
  throwP1.position.set(-8.82, 0.72, 3.45);
  throwP1.rotation.z = -0.2;
  const throwP2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.42), new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.85 }));
  throwP2.position.set(-8.82, 0.72, 5.55);
  throwP2.rotation.z = -0.2;
  interiorGroup.add(sofaSeat, sofaBack, throwP1, throwP2);
  addObstacleBox(-8.7, 4.5, 1.45, 3.3, interiorObstacles);

  // Mesinha de centro + vaso de planta no canto
  const coffeeTbl = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 1.75), woodLightMat);
  coffeeTbl.position.set(-6.4, 0.46, 4.5);
  coffeeTbl.castShadow = true;
  [[-0.45, -0.75], [0.45, -0.75], [-0.45, 0.75], [0.45, 0.75]].forEach(([lx, lz]) => {
    const cl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.44, 0.08), darkMetalMat);
    cl.position.set(-6.4 + lx, 0.22, 4.5 + lz);
    interiorGroup.add(cl);
  });
  interiorGroup.add(coffeeTbl);
  addObstacleBox(-6.4, 4.5, 1.18, 1.82, interiorObstacles);

  // Rack Moderno + TV Smart com tela viva + Videogame!
  const tvRack = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.62, 0.74), woodMat);
  tvRack.position.set(-4.2, 0.31, 7.35);
  tvRack.castShadow = true;
  const tvShelf = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 0.64), darkMetalMat);
  tvShelf.position.set(-4.2, 0.44, 7.28);
  const tvFrameH = new THREE.Mesh(new THREE.BoxGeometry(1.92, 1.12, 0.09), darkMetalMat);
  tvFrameH.position.set(-4.2, 1.24, 7.45);
  const tvScreenH = new THREE.Mesh(
    new THREE.PlaneGeometry(1.78, 0.98),
    new THREE.MeshBasicMaterial({ map: createTvScreenTexture("TV PAU ARCADO", "Previsão & Novela das 8", "#facc15") })
  );
  tvScreenH.rotation.y = Math.PI;
  tvScreenH.position.set(-4.2, 1.24, 7.395);
  const tvStandH = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.28), steelMat);
  tvStandH.position.set(-4.2, 0.65, 7.42);
  const consoleBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.1, 0.32), whiteCeramic);
  consoleBox.position.set(-5.0, 0.67, 7.24);
  interiorGroup.add(tvRack, tvShelf, tvFrameH, tvScreenH, tvStandH, consoleBox);
  addObstacleBox(-4.2, 7.35, 2.5, 0.86, interiorObstacles);

  // Vaso de planta decorativo no canto da sala
  const housePot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.46, 10), new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.85 }));
  housePot.position.set(-9.2, 0.23, 7.2);
  const housePlant = new THREE.Mesh(new THREE.DodecahedronGeometry(0.48, 1), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 }));
  housePlant.position.set(-9.2, 0.78, 7.2);
  interiorGroup.add(housePot, housePlant);

  // Capacho da porta de saída
  const doormat = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.04, 1.1),
    new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.9 })
  );
  doormat.position.set(0, 0.02, 7.35);
  interiorGroup.add(doormat);
}
buildBedroomInterior();

// 2B. PORÃO SECRETO DO MULTIVERSO DOS MACHOS (Cópias Alternativas do Macho com Diversas Roupas e Cores!)
const MACHO_ALTERNATIVES = [
  {
    id: "clone_gold",
    name: "Macho Dourado",
    sub: "Universo 24K",
    quote: "No meu universo a Alface Crespa nasce de ouro maciço e o Ônibus 402 é uma limusine!",
    shirt: 0xfacc15,
    pocket: 0xca8a04,
    pants: 0xf8fafc,
    boots: 0xb45309,
    hat: 0xfef08a,
    band: 0xd97706,
    skin: 0xc98a63,
    pos: [-8.0, -5.8],
  },
  {
    id: "clone_cyber",
    name: "Macho Cyberpunk",
    sub: "Pau Arcado 2077",
    quote: "Em 2077 a ETECAMP flutua sobre Botujuru e o Muzzonline virou inteligência artificial!",
    shirt: 0x7e22ce,
    pocket: 0x06b6d4,
    pants: 0x0f172a,
    boots: 0xec4899,
    hat: 0x22d3ee,
    band: 0xf43f5e,
    skin: 0xc98a63,
    pos: [-4.2, -6.2],
  },
  {
    id: "clone_etec",
    name: "Macho ETECAMP",
    sub: "Aluno Exemplar",
    quote: "No meu universo eu tiro MB em tudo na ETEC de Campo Limpo Paulista sem nunca coringar!",
    shirt: 0xdc2626,
    pocket: 0x991b1b,
    pants: 0x1d4ed8,
    boots: 0xf8fafc,
    hat: 0xf8fafc,
    band: 0xdc2626,
    skin: 0xc98a63,
    pos: [0.0, -6.4],
  },
  {
    id: "clone_goth",
    name: "Macho Sombrio",
    sub: "Trevas da Roça",
    quote: "Eu só colho Alface Roxa às 3 da manhã ouvindo rock pesado no porão...",
    shirt: 0x111827,
    pocket: 0x6b21a8,
    pants: 0x09090b,
    boots: 0x3b0764,
    hat: 0x18181b,
    band: 0xa855f7,
    skin: 0xd6b49c,
    pos: [4.2, -6.2],
  },
  {
    id: "clone_beach",
    name: "Macho Praiano",
    sub: "Pau Arcado Beach",
    quote: "No meu universo o Rio Jundiaí virou praia de água azul e a gente surfa até o Terminal!",
    shirt: 0x06b6d4,
    pocket: 0xf97316,
    pants: 0xfde047,
    boots: 0xfb923c,
    hat: 0xfef3c7,
    band: 0x0284c7,
    skin: 0xb8764f,
    pos: [8.0, -5.8],
  },
  {
    id: "clone_joker",
    name: "Macho Coringa Prime",
    sub: "Sanidade Infinita",
    quote: "HAHAHAHA! Eu já nasci nos 100% de sanidade e sou dono oficial do @only_resenha_!",
    shirt: 0x6b21a8,
    pocket: 0x22c55e,
    pants: 0x581c87,
    boots: 0x16a34a,
    hat: 0x22c55e,
    band: 0xec4899,
    skin: 0xf1f5f9,
    pos: [-8.2, -0.5],
  },
  {
    id: "clone_lettuce",
    name: "Macho Alface Suprema",
    sub: "100% Orgânico",
    quote: "Eu não planto alface... EU SOU A PRÓPRIA ALFACE CRESPA!",
    shirt: 0x22c55e,
    pocket: 0x15803d,
    pants: 0x166534,
    boots: 0x4ade80,
    hat: 0x86efac,
    band: 0x14532d,
    skin: 0x86efac,
    pos: [8.2, -0.5],
  },
  {
    id: "clone_science",
    name: "Macho Cientista",
    sub: "Discípulo do Kaio",
    quote: "Sintetizei o Adubo NPK Quântico junto com o Kaio Wendell no Lab de Química!",
    shirt: 0xf8fafc,
    pocket: 0x38bdf8,
    pants: 0x334155,
    boots: 0x0f172a,
    hat: 0xe2e8f0,
    band: 0x0284c7,
    skin: 0xc98a63,
    pos: [-7.5, 4.2],
  },
  {
    id: "clone_ice",
    name: "Macho Glacial",
    sub: "Inverno em CLP",
    quote: "No meu universo neva todo dia em Campo Limpo Paulista e a Onça usa cachecol!",
    shirt: 0x38bdf8,
    pocket: 0xe0f2fe,
    pants: 0x0369a1,
    boots: 0xbae6fd,
    hat: 0xe0f2fe,
    band: 0x0284c7,
    skin: 0xdbeafe,
    pos: [7.5, 4.2],
  },
  {
    id: "clone_classic",
    name: "Macho Original",
    sub: "Restaurar Roupa Padrão",
    quote: "Quer voltar para o uniforme raiz da roça de Pau Arcado? Só falar comigo!",
    shirt: 0x1f4e2e,
    pocket: 0x14331e,
    pants: 0x1e3a5f,
    boots: 0x4a2c16,
    hat: 0xe9c46a,
    band: 0x7c2d12,
    skin: 0xc98a63,
    pos: [-3.4, 5.2],
  },
];

function createMachoCloneMesh(cfg) {
  const g = new THREE.Group();
  const sMat = new THREE.MeshStandardMaterial({ color: cfg.skin, roughness: 0.65 });
  const shMat = new THREE.MeshStandardMaterial({ color: cfg.shirt, roughness: 0.65 });
  const pkMat = new THREE.MeshStandardMaterial({ color: cfg.pocket, roughness: 0.7 });
  const pMat = new THREE.MeshStandardMaterial({ color: cfg.pants, roughness: 0.8 });
  const bMat = new THREE.MeshStandardMaterial({ color: cfg.boots, roughness: 0.7 });
  const hMat = new THREE.MeshStandardMaterial({ color: cfg.hat, roughness: 0.75 });
  const bdMat = new THREE.MeshStandardMaterial({ color: cfg.band, roughness: 0.6 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.12, 0.52), shMat);
  torso.position.y = 1.4;
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.04), pkMat);
  pocket.position.set(0.22, 1.56, 0.27);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), sMat);
  head.position.y = 2.34;
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x5c3416 });
  const lEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  lEye.position.set(-0.14, 2.38, 0.34);
  const rEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  rEye.position.set(0.14, 2.38, 0.34);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.84, 0.88, 0.08, 14), hMat);
  brim.position.y = 2.7;
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.44, 0.36, 12), hMat);
  crown.position.y = 2.91;
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.445, 0.45, 0.09, 12), bdMat);
  band.position.y = 2.77;
  const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.84, 0.25), sMat);
  lArm.position.set(-0.62, 1.4, 0);
  const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.84, 0.25), sMat);
  rArm.position.set(0.62, 1.4, 0);
  const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.8, 0.32), pMat);
  lLeg.position.set(-0.23, 0.44, 0);
  const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.8, 0.32), pMat);
  rLeg.position.set(0.23, 0.44, 0);
  const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.44), bMat);
  lBoot.position.set(-0.23, 0.1, 0.05);
  const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.44), bMat);
  rBoot.position.set(0.23, 0.1, 0.05);

  g.add(torso, pocket, head, lEye, rEye, brim, crown, band, lArm, rArm, lLeg, rLeg, lBoot, rBoot);
  return g;
}

function buildSecretBasement() {
  const floorMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#1e1b2e", "#13111f", 12),
    roughness: 0.7,
  });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x1c1926, roughness: 0.9 });
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.35 });

  // Iluminação neon misteriosa do Multiverso
  [
    [-6, 4.2, -5, 0xa855f7],
    [6, 4.2, -5, 0x38bdf8],
    [-6, 4.2, 4, 0x22c55e],
    [6, 4.2, 4, 0xfacc15],
  ].forEach(([lx, ly, lz, col]) => {
    const pt = new THREE.PointLight(col, 0.95, 22);
    pt.position.set(lx, ly, lz);
    basementGroup.add(pt);
  });

  const floor = new THREE.Mesh(new THREE.BoxGeometry(22.4, 0.24, 18.4), floorMat);
  floor.position.y = -0.12;
  floor.receiveShadow = true;
  basementGroup.add(floor);

  const ceil = new THREE.Mesh(
    new THREE.PlaneGeometry(22.4, 18.4),
    new THREE.MeshStandardMaterial({ color: 0x0f0d16, roughness: 0.95, side: THREE.FrontSide })
  );
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, 4.8, 0);
  basementGroup.add(ceil);

  const backW = new THREE.Mesh(new THREE.BoxGeometry(22.4, 4.8, 0.3), wallMat);
  backW.position.set(0, 2.4, -9.1);
  const leftW = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 18.4), wallMat);
  leftW.position.set(-11.1, 2.4, 0);
  const rightW = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 18.4), wallMat);
  rightW.position.set(11.1, 2.4, 0);
  const frontW = new THREE.Mesh(
    new THREE.PlaneGeometry(22.4, 4.8),
    new THREE.MeshStandardMaterial({ color: 0x1c1926, roughness: 0.9, side: THREE.FrontSide })
  );
  frontW.rotation.y = Math.PI;
  frontW.position.set(0, 2.4, 9.1);
  basementGroup.add(backW, leftW, rightW, frontW);

  // Canos industriais ao longo da parede do porão
  [-8.7, 8.7].forEach((px) => {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 17, 10), pipeMat);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(px, 3.7, 0);
    basementGroup.add(pipe);
  });


  // Escada de ferro de volta para a Casa
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(0, 0, 8.2);
  [-0.38, 0.38].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 4.4, 8), pipeMat);
    rail.position.set(rx, 2.2, 0);
    ladderGroup.add(rail);
  });
  for (let r = 0; r < 9; r++) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.78, 8), pipeMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, 0.4 + r * 0.46, 0);
    ladderGroup.add(rung);
  }
  basementGroup.add(ladderGroup);

  // Espalha todas as cópias alternativas do Macho pelo porão!
  MACHO_ALTERNATIVES.forEach((cfg) => {
    const mesh = createMachoCloneMesh(cfg);
    mesh.position.set(cfg.pos[0], 0, cfg.pos[1]);
    mesh.rotation.y = Math.atan2(-cfg.pos[0], 2 - cfg.pos[1]);
    basementGroup.add(mesh);
    addObstacleBox(cfg.pos[0], cfg.pos[1], 1.1, 1.1, basementObstacles);
    basementClones.push({ ...cfg, posVec: new THREE.Vector3(cfg.pos[0], 0, cfg.pos[1]), mesh });
  });
}
buildSecretBasement();

