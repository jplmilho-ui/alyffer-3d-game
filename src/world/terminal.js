// 3. TERMINAL URBANO DE CAMPO LIMPO PAULISTA & ESTAÇÃO LINHA 7-RUBI (Av. Alfried Krupp — Reformulado & Teto Sólido!)
function buildTerminalAndStation() {
  const asphaltMat = new THREE.MeshStandardMaterial({
    map: createAsphaltTexture(22, 22),
    color: 0x64748b,
    roughness: 0.92,
  });
  const roadMat = new THREE.MeshStandardMaterial({
    map: createAsphaltTexture(18, 2),
    color: 0x475569,
    roughness: 0.94,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const concreteMat = new THREE.MeshStandardMaterial({
    map: createWornConcreteTexture(),
    color: 0xcbd5e1,
    roughness: 0.85,
  });
  const paverMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#9ca3af", "#8b929e", 18),
    roughness: 0.86,
  });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.42, metalness: 0.3 });
  const roofTopCorrugMat = new THREE.MeshStandardMaterial({
    map: createCorrugatedMetalTexture("#cbd5e1", 10, 6),
    roughness: 0.55,
    metalness: 0.38,
  });
  const blueTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.44, metalness: 0.32 });
  const underRoofMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.72, metalness: 0.15 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.32 });
  const fenceIronMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.45 });
  const whiteWallMat = new THREE.MeshStandardMaterial({
    map: createStuccoWallTexture("#f1f5f9", "#cbd5e1", 3, 2),
    roughness: 0.8,
  });
  const rubiMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.42, metalness: 0.15 });
  const yellowTactile = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.62,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const whiteLineMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.7,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.85 });
  const bushMat2 = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.82 });
  const glassTintMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.75, roughness: 0.14 });
  const glassClearMat = new THREE.MeshStandardMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.38,
    roughness: 0.12,
    metalness: 0.25,
  });
  const ledStripMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

  // Base verde do vale de Campo Limpo Paulista + piso urbano asfaltado na área do terminal!
  const termValleyGrassMat = new THREE.MeshStandardMaterial({
    map: createGrassTexture("#4b8b3b", "#3d7a30", 36, 36),
    roughness: 0.95,
  });
  const valleyGround = new THREE.Mesh(new THREE.PlaneGeometry(320, 320), termValleyGrassMat);
  valleyGround.rotation.x = -Math.PI / 2;
  valleyGround.receiveShadow = true;
  terminalGroup.add(valleyGround);

  // Pátio urbano asfaltado do Terminal e Estação (x = -46..+33, z = -34..+46)
  const urbanApronMat = new THREE.MeshStandardMaterial({
    map: createAsphaltTexture(12, 12),
    color: 0x64748b,
    roughness: 0.92,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 82), urbanApronMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(-6.5, 0.018, 6.0);
  ground.receiveShadow = true;
  terminalGroup.add(ground);

  // Rio Jundiaí estendido com margens cimentadas correndo atrás da ferrovia
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(9.4, 240),
    new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.22,
      metalness: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.set(37.5, 0.03, 0);
  terminalGroup.add(river);
  [32.6, 42.4].forEach((bx) => {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.45, 240), concreteMat);
    bank.position.set(bx, 0.225, 0);
    terminalGroup.add(bank);
  });

  // Av. Alfried Krupp estendida (x = -125..+115) com 2 pistas largas, ponte sobre o Rio Jundiaí e faixas!
  const avenueRoad = new THREE.Mesh(new THREE.PlaneGeometry(240, 9.2), roadMat);
  avenueRoad.rotation.x = -Math.PI / 2;
  avenueRoad.position.set(-5, 0.032, 26.5);
  avenueRoad.receiveShadow = true;
  terminalGroup.add(avenueRoad);

  for (let x = -114; x <= 104; x += 4.6) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.24), yellowTactile);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(x, 0.055, 26.5);
    terminalGroup.add(dash);
  }

  // Ponte / Viaduto baixo da Av. Alfried Krupp atravessando os trilhos e o Rio Jundiaí
  [21.7, 31.3].forEach((rz) => {
    const bridgeWall = new THREE.Mesh(new THREE.BoxGeometry(20.5, 0.85, 0.34), concreteMat);
    bridgeWall.position.set(33.2, 0.425, rz);
    bridgeWall.castShadow = true;
    const bridgeRail = new THREE.Mesh(new THREE.BoxGeometry(20.6, 0.14, 0.14), blueTrimMat);
    bridgeRail.position.set(33.2, 0.94, rz);
    terminalGroup.add(bridgeWall, bridgeRail);
  });
  [-17.2, -3.0, 6.0].forEach((cx) => {
    for (let sx = -2.2; sx <= 2.2; sx += 0.74) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 3.8), whiteLineMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(cx + sx, 0.05, 22.0);
      terminalGroup.add(stripe);
    }
  });

  // Postes de iluminação dupla ao longo da Av. Alfried Krupp
  [-32, -16, 0, 14].forEach((lx) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 7.2, 8), steelMat);
    pole.position.set(lx, 3.6, 20.6);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 2.2), steelMat);
    arm.position.set(lx, 7.1, 21.5);
    const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.68), ledStripMat);
    lampHead.position.set(lx, 7.0, 22.4);
    terminalGroup.add(pole, arm, lampHead);
  });

  // Gradil preto sobre mureta branca ao longo da Avenida
  const addFenceWall = (cx, cz, lenX, lenZ, matWall = whiteWallMat) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(lenX, 0.5, lenZ), matWall);
    wall.position.set(cx, 0.25, cz);
    wall.castShadow = true;
    terminalGroup.add(wall);
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(lenX, 0.08, lenZ * 0.45), fenceIronMat);
    topBar.position.set(cx, 1.55, cz);
    terminalGroup.add(topBar);
    const isX = lenX >= lenZ;
    const span = isX ? lenX : lenZ;
    const count = Math.max(2, Math.floor(span / 1.1));
    for (let i = 0; i <= count; i++) {
      const t = -span * 0.5 + (i / count) * span;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.06), fenceIronMat);
      post.position.set(isX ? cx + t : cx, 1.0, isX ? cz : cz + t);
      terminalGroup.add(post);
    }
    addObstacleBox(cx, cz, lenX + 0.25, lenZ + 0.25, terminalObstacles);
  };
  addFenceWall(-28.0, 19.2, 16.0, 0.28);
  addFenceWall(-11.0, 19.2, 7.0, 0.28);

  // Mureta azul longa nos fundos da baia do 402 com acabamento superior
  const blueLowWall = new THREE.Mesh(new THREE.BoxGeometry(52.0, 1.05, 0.45), blueTrimMat);
  blueLowWall.position.set(-14.0, 0.525, -27.2);
  blueLowWall.castShadow = true;
  const blueWallCap = new THREE.Mesh(new THREE.BoxGeometry(52.2, 0.12, 0.56), concreteMat);
  blueWallCap.position.set(-14.0, 1.11, -27.2);
  terminalGroup.add(blueLowWall, blueWallCap);
  addObstacleBox(-14.0, -27.2, 52.2, 0.65, terminalObstacles);

  // Torre Cilíndrica Azul da Caixa d'Água Reformulada (base, anéis, escada e cúpula!)
  const tWtGrp = new THREE.Group();
  tWtGrp.position.set(-24.5, 0, 16.5);
  const tWtBase = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.55, 0.55, 18), concreteMat);
  tWtBase.position.y = 0.275;
  const waterTower = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.22, 11.2, 20), roofMat);
  waterTower.position.y = 6.0;
  waterTower.castShadow = true;
  const tWtStripe = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.7, 20), whiteWallMat);
  tWtStripe.position.y = 9.3;
  const towerRing = new THREE.Mesh(new THREE.CylinderGeometry(1.28, 1.28, 0.34, 20), steelMat);
  towerRing.position.y = 11.72;
  const towerDome = new THREE.Mesh(new THREE.ConeGeometry(1.22, 0.55, 20), steelMat);
  towerDome.position.y = 12.15;
  tWtGrp.add(tWtBase, waterTower, tWtStripe, towerRing, towerDome);
  [3.0, 6.0, 8.6, 11.2].forEach((ry) => {
    const r = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.04, 6, 20), steelMat);
    r.rotation.x = Math.PI / 2;
    r.position.y = ry;
    tWtGrp.add(r);
  });
  terminalGroup.add(tWtGrp);
  addObstacleBox(-24.5, 16.5, 2.7, 2.7, terminalObstacles);

  // Canteiros verdes com árvores frondosas em 2 tons nas extremidades do Terminal
  const termBarkMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#5c3a21", "#3a2110", 1, 2),
    roughness: 0.92,
  });
  [
    [-30.0, 16.5],
    [5.0, 16.8],
    [-35.2, -16.5],
  ].forEach(([tx, tz]) => {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.48, 2.7), whiteWallMat);
    planter.position.set(tx, 0.24, tz);
    planter.castShadow = true;
    const soil = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.08, 2.35),
      new THREE.MeshStandardMaterial({ color: 0x3f2e1e, roughness: 1 })
    );
    soil.position.set(tx, 0.46, tz);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 4.1, 8), termBarkMat);
    trunk.position.set(tx, 2.35, tz);
    trunk.castShadow = true;
    const canopy1 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.05, 1), bushMat);
    canopy1.position.set(tx, 5.1, tz);
    canopy1.castShadow = true;
    const canopy2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.38, 1), bushMat2);
    canopy2.position.set(tx + 0.85, 5.65, tz + 0.45);
    canopy2.castShadow = true;
    const canopy3 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.18, 1), bushMat2);
    canopy3.position.set(tx - 0.78, 5.45, tz - 0.42);
    terminalGroup.add(planter, soil, trunk, canopy1, canopy2, canopy3);
    addObstacleBox(tx, tz, 2.7, 2.7, terminalObstacles);
  });

  // Plataforma Coberta Super Expandida do Terminal CLP (x = -22.0..+6.0, z = -18.0..+14.0, y = 0.26)
  const termMainPlaza = new THREE.Mesh(new THREE.BoxGeometry(28.0, 0.26, 32.0), paverMat);
  termMainPlaza.position.set(-8.0, 0.13, -2.0);
  termMainPlaza.receiveShadow = true;
  terminalGroup.add(termMainPlaza);

  // Guias amarelas sem faces coplanares com a plataforma
  const busCurbFront = new THREE.Mesh(new THREE.BoxGeometry(28.14, 0.28, 0.36), yellowTactile);
  busCurbFront.position.set(-8.0, 0.145, 13.94);
  const busCurbNorth = new THREE.Mesh(new THREE.BoxGeometry(28.14, 0.28, 0.36), yellowTactile);
  busCurbNorth.position.set(-8.0, 0.145, -17.94);
  const busCurbWest = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.28, 32.14), yellowTactile);
  busCurbWest.position.set(-21.94, 0.145, -2.0);
  terminalGroup.add(busCurbFront, busCurbNorth, busCurbWest);

  // Bancos metálicos de espera + lixeiras no pátio do Terminal (fora das rotas centrais!)
  [[-19.5, -1.5, Math.PI / 2], [-19.5, -9.5, Math.PI / 2], [-6.5, 11.4, 0]].forEach(([bx, bz, ry]) => {
    const bg = new THREE.Group();
    bg.position.set(bx, 0.26, bz);
    bg.rotation.y = ry;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 0.56), blueTrimMat);
    seat.position.y = 0.46;
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.42, 0.07), blueTrimMat);
    back.position.set(0, 0.76, -0.25);
    [-1.0, 1.0].forEach((lx) => {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.46, 0.5), steelMat);
      l.position.set(lx, 0.23, 0);
      bg.add(l);
    });
    bg.add(seat, back);
    terminalGroup.add(bg);
    const horiz = Math.abs(Math.sin(ry)) > 0.7;
    addObstacleBox(bx, bz, horiz ? 0.7 : 2.7, horiz ? 2.7 : 0.7, terminalObstacles);
  });

  // COBERTURA SÓLIDA E OPACA DO TERMINAL (Telhado metálico ondulado + forro branco + vigas + faixa azul + LEDs!)
  const addSolidTerminalCanopy = (cx, cz, w, d, yBase = 7.4) => {
    // Forro sólido inferior (branco claro, sempre opaco!)
    const soffit = new THREE.Mesh(new THREE.BoxGeometry(w - 0.16, 0.14, d - 0.16), underRoofMat);
    soffit.position.set(cx, yBase, cz);
    soffit.receiveShadow = true;

    // Telhado metálico ondulado sólido acima
    const deck = new THREE.Mesh(new THREE.BoxGeometry(w + 0.12, 0.26, d + 0.12), roofTopCorrugMat);
    deck.position.set(cx, yBase + 0.46, cz);
    deck.castShadow = true;
    deck.receiveShadow = true;

    // 4 testeiras / platibandas azuis contornando a borda (sem sobrepor faces internas!)
    const fFront = new THREE.Mesh(new THREE.BoxGeometry(w + 0.24, 0.58, 0.16), roofMat);
    fFront.position.set(cx, yBase + 0.28, cz + d * 0.5 + 0.06);
    const fBack = new THREE.Mesh(new THREE.BoxGeometry(w + 0.24, 0.58, 0.16), roofMat);
    fBack.position.set(cx, yBase + 0.28, cz - d * 0.5 - 0.06);
    const fLeft = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, d + 0.04), roofMat);
    fLeft.position.set(cx - w * 0.5 - 0.06, yBase + 0.28, cz);
    const fRight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, d + 0.04), roofMat);
    fRight.position.set(cx + w * 0.5 + 0.06, yBase + 0.28, cz);

    terminalGroup.add(soffit, deck, fFront, fBack, fLeft, fRight);

    // Treliças metálicas e calhas de LED sob o forro
    const numTrusses = Math.max(3, Math.floor(w / 6.5));
    for (let i = 0; i <= numTrusses; i++) {
      const tx = cx - w * 0.44 + (i / numTrusses) * (w * 0.88);
      const truss = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, d - 0.45), steelMat);
      truss.position.set(tx, yBase - 0.18, cz);
      terminalGroup.add(truss);
      if (i < numTrusses) {
        const led = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 0.28), ledStripMat);
        led.position.set(tx + (w * 0.44) / numTrusses, yBase - 0.1, cz);
        terminalGroup.add(led);
      }
    }
  };
  // Cobertura contínua principal cobrindo toda a praça (z = -18..+14) + baia do 402 (z = -26..-18)!
  addSolidTerminalCanopy(-8.0, -2.0, 29.6, 32.2, 7.45);
  addSolidTerminalCanopy(-14.5, -22.2, 18.5, 8.2, 6.85);

  // Colunas estruturais com base cimentada + capitel metálico
  [
    [-20.8, 12.8], [-10.5, 12.8], [0.5, 12.8],
    [-20.8, -2.0], [4.2, -2.0],
    [-20.8, -16.8], [-8.5, -16.8], [4.2, -16.8],
  ].forEach(([px, pz]) => {
    const colBase = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.55, 12), concreteMat);
    colBase.position.set(px, 0.52, pz);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 7.05, 14), blueTrimMat);
    col.position.set(px, 3.85, pz);
    col.castShadow = true;
    const colCap = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.22, 0.62), steelMat);
    colCap.position.set(px, 7.3, pz);
    terminalGroup.add(colBase, col, colCap);
    addObstacleBox(px, pz, 0.65, 0.65, terminalObstacles);
  });

  // Placa Principal iluminada do Terminal (bem destacada da fachada frontal)
  const termSignFrame = new THREE.Mesh(new THREE.BoxGeometry(10.8, 1.56, 0.24), fenceIronMat);
  termSignFrame.position.set(-7.5, 7.95, 14.32);
  const termSign = new THREE.Mesh(
    new THREE.PlaneGeometry(10.5, 1.38),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("TERMINAL URBANO CAMPO LIMPO PTA", "Av. Alfried Krupp", "#1e3a8a", "#ffffff"),
    })
  );
  termSign.position.set(-7.5, 7.95, 14.46);
  terminalGroup.add(termSignFrame, termSign);

  // Guarita Azul & Branca Reformulada (janelas de vidro escuro, telhadinho projetado, porta e balcão interno!)
  const guarita = new THREE.Group();
  guarita.position.set(3.2, 0, 15.6);
  const gBase = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.15, 2.3), blueTrimMat);
  gBase.position.y = 0.575;
  gBase.castShadow = true;
  const gMid = new THREE.Mesh(new THREE.BoxGeometry(2.46, 1.25, 2.26), whiteWallMat);
  gMid.position.y = 1.775;
  const gWinF = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.85, 0.08), glassTintMat);
  gWinF.position.set(0, 1.78, 1.14);
  const gWinL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 1.65), glassTintMat);
  gWinL.position.set(-1.24, 1.78, 0);
  const gWinR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 1.65), glassTintMat);
  gWinR.position.set(1.24, 1.78, 0);
  const gDoorB = new THREE.Mesh(new THREE.BoxGeometry(0.86, 2.1, 0.08), steelMat);
  gDoorB.position.set(0, 1.05, -1.14);
  const gRoof = new THREE.Mesh(new THREE.BoxGeometry(3.05, 0.24, 2.85), roofMat);
  gRoof.position.y = 2.52;
  gRoof.castShadow = true;
  const gRoofTop = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.14, 2.65), roofTopCorrugMat);
  gRoofTop.position.y = 2.7;
  guarita.add(gBase, gMid, gWinF, gWinL, gWinR, gDoorB, gRoof, gRoofTop);
  terminalGroup.add(guarita);
  addObstacleBox(3.2, 15.6, 2.6, 2.4, terminalObstacles);

  // Ônibus 402 PAU ARCADO na baia dos fundos bem espaçosa at (-15.0, 0, -22.2)
  const busTerm402 = createBusModel("402 PAU ARCADO", "Via Estrada do Garcia", 0x16a34a);
  busTerm402.position.set(-15.0, 0, -22.2);
  busTerm402.rotation.y = Math.PI / 2;
  terminalGroup.add(busTerm402);
  bus402TermMesh = busTerm402;
  addObstacleBox(-15.0, -22.2, 6.8, 2.7, terminalObstacles);

  // Relógio/Painel Digital 3D no Terminal CLP indicando quanto tempo falta pro 402 sair!
  const termClockPedestal = new THREE.Group();
  termClockPedestal.position.set(-10.8, 0.26, -17.6);
  [-0.9, 0.9].forEach((px) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 2.7, 8), blueTrimMat);
    leg.position.set(px, 1.35, 0);
    leg.castShadow = true;
    termClockPedestal.add(leg);
  });
  termBusClock = createBusClockDisplay("BAIA 402 • TERMINAL CLP", true);
  termBusClock.group.position.set(0, 3.1, 0);
  termClockPedestal.add(termBusClock.group);
  terminalGroup.add(termClockPedestal);
  addObstacleBox(-10.8, -17.6, 2.2, 0.6, terminalObstacles);


  // Ônibus 401 Botujuru & Ônibus Municipal bem espaçados na pista oeste (x = -28.5)
  const busTerm401 = createBusModel("401 BOTUJURU", "Rápido Luxo Campinas", 0xea580c);
  busTerm401.position.set(-28.5, 0, 6.5);
  terminalGroup.add(busTerm401);
  addObstacleBox(-28.5, 6.5, 2.7, 6.8, terminalObstacles);

  const busMun = createBusModel("206 VILA SÃO JOSÉ", "Circular CLP", 0x0284c7);
  busMun.position.set(-28.5, 0, -6.5);
  terminalGroup.add(busMun);
  addObstacleBox(-28.5, -6.5, 2.7, 6.8, terminalObstacles);

  // Bancas do Produtor no Terminal at (-1.0, 0.26, 5.2) — Estrutura completa com 4 pilares, toldo listrado, caixotes e placa!
  const stall = new THREE.Group();
  stall.position.set(-1.0, 0.26, 5.2);
  const stallWoodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.82 });
  const stallTrimMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
  const stallTopMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.72 });
  const stallGreenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.62 });
  const stallCreamMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.7 });
  const crateMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 });

  const stallBase = new THREE.Mesh(new THREE.BoxGeometry(4.36, 0.14, 1.72), stallTrimMat);
  stallBase.position.y = 0.07;
  const counter = new THREE.Mesh(new THREE.BoxGeometry(4.3, 1.0, 1.64), stallWoodMat);
  counter.position.y = 0.62;
  counter.castShadow = true;
  counter.receiveShadow = true;
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(4.52, 0.12, 1.86), stallTopMat);
  counterTop.position.y = 1.15;
  counterTop.castShadow = true;
  stall.add(stallBase, counter, counterTop);
  for (let s = -1.8; s <= 1.81; s += 0.45) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.94, 0.05), stallTrimMat);
    slat.position.set(s, 0.62, 0.83);
    stall.add(slat);
  }
  [
    [-2.08, -0.74, 2.76],
    [2.08, -0.74, 2.76],
    [-2.08, 0.74, 2.52],
    [2.08, 0.74, 2.52],
  ].forEach(([px, pz, ph]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, ph, 0.14), stallTrimMat);
    post.position.set(px, ph * 0.5, pz);
    post.castShadow = true;
    stall.add(post);
  });
  const sBeamFront = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.12, 0.12), stallTrimMat);
  sBeamFront.position.set(0, 2.48, 0.74);
  const sBeamBack = new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.12, 0.12), stallTrimMat);
  sBeamBack.position.set(0, 2.72, -0.74);
  stall.add(sBeamFront, sBeamBack);

  const stallRoofGroup = new THREE.Group();
  stallRoofGroup.position.set(0, 2.66, 0.05);
  stallRoofGroup.rotation.x = 0.15;
  const stripeCount = 9;
  const stripeW = 4.86 / stripeCount;
  for (let i = 0; i < stripeCount; i++) {
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(stripeW + 0.01, 0.14, 2.28),
      i % 2 === 0 ? stallGreenMat : stallCreamMat
    );
    stripe.position.x = -2.43 + stripeW * (i + 0.5);
    stripe.castShadow = true;
    stallRoofGroup.add(stripe);
    const valance = new THREE.Mesh(
      new THREE.BoxGeometry(stripeW + 0.01, 0.24, 0.06),
      i % 2 === 0 ? stallGreenMat : stallCreamMat
    );
    valance.position.set(-2.43 + stripeW * (i + 0.5), -0.14, 1.12);
    stallRoofGroup.add(valance);
  }
  stall.add(stallRoofGroup);

  [
    { x: -1.45, color: 0x4ade80, count: 4 },
    { x: -0.48, color: 0xa855f7, count: 4 },
    { x: 0.48, color: 0xef4444, count: 5 },
    { x: 1.45, color: 0xf97316, count: 5 },
  ].forEach((cs) => {
    const cg = new THREE.Group();
    cg.position.set(cs.x, 1.24, 0.15);
    cg.rotation.x = 0.14;
    const cBox = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.2, 0.72), crateMat);
    cg.add(cBox);
    const vMat = new THREE.MeshStandardMaterial({ color: cs.color, roughness: 0.65 });
    for (let k = 0; k < cs.count; k++) {
      const vx = ((k % 3) - 1) * 0.22;
      const vz = (Math.floor(k / 3) - 0.3) * 0.24;
      const veg = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 1), vMat);
      veg.position.set(vx, 0.16, vz);
      cg.add(veg);
    }
    stall.add(cg);
  });

  const stallSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.72, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BANCAS DO TERMINAL", "Vender Colheita & Encomendas", "#14532d", "#fef08a"),
    })
  );
  stallSign.position.set(0, 2.98, 0.72);
  stall.add(stallSign);
  [-1.45, 1.45].forEach((bx) => {
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.1), stallTrimMat);
    br.position.set(bx, 2.66, 0.72);
    stall.add(br);
  });
  terminalGroup.add(stall);
  addObstacleBox(-1.0, 5.2, 4.5, 2.0, terminalObstacles);

  // Quiosque do Pastel & Caldo de Cana at (-13.8, 0.26, 5.2) — 4 pilares, estufa de pastéis, moenda de cana e placa!
  const pastelStall = new THREE.Group();
  pastelStall.position.set(-13.8, 0.26, 5.2);
  const pRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.58 });
  const pWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55 });
  const pSteelMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.68, roughness: 0.25 });
  const pWoodDark = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.8 });
  const pGlassMat = new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.36, roughness: 0.1 });

  const pBase = new THREE.Mesh(new THREE.BoxGeometry(3.66, 0.14, 1.66), pWoodDark);
  pBase.position.y = 0.07;
  const pCounter = new THREE.Mesh(
    new THREE.BoxGeometry(3.58, 1.0, 1.56),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.76 })
  );
  pCounter.position.y = 0.62;
  pCounter.castShadow = true;
  pCounter.receiveShadow = true;
  const pFrontPanel = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.74, 0.05), pRedMat);
  pFrontPanel.position.set(0, 0.62, 0.79);
  const pTop = new THREE.Mesh(new THREE.BoxGeometry(3.76, 0.12, 1.76), pSteelMat);
  pTop.position.y = 1.15;
  pTop.castShadow = true;
  pastelStall.add(pBase, pCounter, pFrontPanel, pTop);

  [
    [-1.72, -0.7, 2.74],
    [1.72, -0.7, 2.74],
    [-1.72, 0.7, 2.52],
    [1.72, 0.7, 2.52],
  ].forEach(([px, pz, ph]) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, ph, 0.12), pWoodDark);
    post.position.set(px, ph * 0.5, pz);
    post.castShadow = true;
    pastelStall.add(post);
  });
  const pBeamF = new THREE.Mesh(new THREE.BoxGeometry(3.56, 0.11, 0.11), pWoodDark);
  pBeamF.position.set(0, 2.48, 0.7);
  const pBeamB = new THREE.Mesh(new THREE.BoxGeometry(3.56, 0.11, 0.11), pWoodDark);
  pBeamB.position.set(0, 2.7, -0.7);
  pastelStall.add(pBeamF, pBeamB);

  const pRoofGroup = new THREE.Group();
  pRoofGroup.position.set(0, 2.64, 0.05);
  pRoofGroup.rotation.x = 0.14;
  const pStripes = 7;
  const pSw = 4.06 / pStripes;
  for (let i = 0; i < pStripes; i++) {
    const stp = new THREE.Mesh(
      new THREE.BoxGeometry(pSw + 0.01, 0.14, 2.16),
      i % 2 === 0 ? pRedMat : pWhiteMat
    );
    stp.position.x = -2.03 + pSw * (i + 0.5);
    stp.castShadow = true;
    pRoofGroup.add(stp);
    const val = new THREE.Mesh(
      new THREE.BoxGeometry(pSw + 0.01, 0.22, 0.06),
      i % 2 === 0 ? pRedMat : pWhiteMat
    );
    val.position.set(-2.03 + pSw * (i + 0.5), -0.14, 1.06);
    pRoofGroup.add(val);
  }
  pastelStall.add(pRoofGroup);

  const estufaBase = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.08, 0.66), pSteelMat);
  estufaBase.position.set(-0.75, 1.25, 0.12);
  const estufaGlass = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.52, 0.62), pGlassMat);
  estufaGlass.position.set(-0.75, 1.54, 0.12);
  const estufaTop = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.06, 0.66), pSteelMat);
  estufaTop.position.set(-0.75, 1.82, 0.12);
  pastelStall.add(estufaBase, estufaGlass, estufaTop);
  const pastelMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.62 });
  for (let pi = 0; pi < 5; pi++) {
    const psl = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.18), pastelMat);
    psl.position.set(-1.05 + (pi % 3) * 0.3, 1.34 + Math.floor(pi / 3) * 0.14, 0.12);
    psl.rotation.y = (pi % 2) * 0.12;
    pastelStall.add(psl);
  }
  const pressBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.52, 0.42), pSteelMat);
  pressBody.position.set(0.88, 1.47, -0.08);
  const caneMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.65 });
  for (let c = 0; c < 3; c++) {
    const cane = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.85, 6), caneMat);
    cane.position.set(1.32 + c * 0.07, 1.62, -0.15);
    cane.rotation.z = 0.16;
    pastelStall.add(cane);
  }
  const cup1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.06, 0.22, 8),
    new THREE.MeshStandardMaterial({ color: 0xd9f99d, roughness: 0.3 })
  );
  cup1.position.set(0.32, 1.32, 0.32);
  const ketchup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.22, 8), pRedMat);
  ketchup.position.set(0.02, 1.32, 0.42);
  const mustard = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.05, 0.22, 8),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 })
  );
  mustard.position.set(0.14, 1.32, 0.42);
  pastelStall.add(pressBody, cup1, ketchup, mustard);

  const pSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.68, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PASTEL & CALDO DE CANA", "Energia + Insanidade -", "#991b1b", "#fef08a"),
    })
  );
  pSign.position.set(0, 2.95, 0.68);
  pastelStall.add(pSign);
  [-1.3, 1.3].forEach((bx) => {
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.1), pWoodDark);
    br.position.set(bx, 2.64, 0.68);
    pastelStall.add(br);
  });
  terminalGroup.add(pastelStall);
  addObstacleBox(-13.8, 5.2, 3.7, 1.85, terminalObstacles);

  // Estação Ferroviária Campo Limpo Paulista Larga (x = 10.0..21.5, z = -24.0..+22.0, y = 0.95)
  const stationPlatform = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.95, 46.0), concreteMat);
  stationPlatform.position.set(15.75, 0.475, -1.0);
  stationPlatform.receiveShadow = true;
  terminalGroup.add(stationPlatform);

  // DUAS Rampas Largas & Suaves conectando Praça (y = 0.26 em x = 6.0) à Estação (y = 0.95 em x = 10.0)
  // Rampa Principal Central (10.2m largura: z = -5.6..+4.6) + Rampa Sul (5.2m largura: z = +8.4..+13.6)
  const addStationRamp = (cz, lenZ) => {
    const rMesh = new THREE.Mesh(new THREE.BoxGeometry(4.12, 0.22, lenZ), concreteMat);
    rMesh.position.set(8.0, 0.495, cz);
    rMesh.rotation.z = 0.171;
    rMesh.receiveShadow = true;
    terminalGroup.add(rMesh);
  };
  addStationRamp(-0.5, 10.2);
  addStationRamp(11.0, 5.2);

  // Guarda-corpos visuais apenas entre/fora das rampas p/ sinalizar claramente as aberturas de acesso
  const addStationRail = (cz, lenZ) => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.72, lenZ), concreteMat);
    curb.position.set(9.8, 0.62, cz);
    terminalGroup.add(curb);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, lenZ), blueTrimMat);
    bar.position.set(9.8, 1.38, cz);
    terminalGroup.add(bar);
    addObstacleBox(9.8, cz, 0.55, lenZ, terminalObstacles);
  };
  addStationRail(-14.8, 18.4); // z = -24.0..-5.6
  addStationRail(6.5, 3.8);    // z = +4.6..+8.4
  addStationRail(17.8, 8.4);   // z = +13.6..+22.0
  // Limite leste da plataforma junto aos trilhos (deixa ~10.8m úteis de plataforma!)
  addObstacleBox(23.1, -1.0, 3.6, 48.0, terminalObstacles);

  // Prédio Histórico Creme & Tijolinho nos fundos da Estação — Telhado Duas Águas FECHADO com empenas triangulares & beiral!
  const oldStGroup = new THREE.Group();
  oldStGroup.position.set(16.0, 0.95, -20.5);
  const oldCreamMat = new THREE.MeshStandardMaterial({
    map: createStuccoWallTexture("#f6ead2", "#decba4", 3, 2),
    roughness: 0.84,
  });
  const oldTileMat = new THREE.MeshStandardMaterial({
    map: createRoofTileTexture("#9a3412", "#6b2109", 6, 4),
    roughness: 0.76,
  });
  const oldBrickTrimMat = new THREE.MeshStandardMaterial({ color: 0x8c2d19, roughness: 0.78 });
  const oldWoodEaveMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#5c3a21", "#3b2210", 2, 1),
    roughness: 0.8,
  });

  const oldBase = new THREE.Mesh(new THREE.BoxGeometry(7.05, 0.56, 6.25), oldBrickTrimMat);
  oldBase.position.y = 0.28;
  const oldStationBody = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.05, 6.0), oldCreamMat);
  oldStationBody.position.y = 2.58;
  oldStationBody.castShadow = true;
  oldStationBody.receiveShadow = true;

  // Empenas triangulares fechando totalmente frente (+Z) e fundos (-Z) sob o telhado (ZERO vão aberto!)
  const oldGableShape = new THREE.Shape();
  oldGableShape.moveTo(-3.4, 0);
  oldGableShape.lineTo(3.4, 0);
  oldGableShape.lineTo(0, 1.95);
  oldGableShape.closePath();
  const oldGableGeo = new THREE.ExtrudeGeometry(oldGableShape, { depth: 0.28, bevelEnabled: false });
  [2.72, -3.0].forEach((gz) => {
    const gable = new THREE.Mesh(oldGableGeo, oldCreamMat);
    gable.position.set(0, 4.58, gz);
    gable.castShadow = true;
    oldStGroup.add(gable);
  });

  // Telhado duas águas perfeitamente alinhado às empenas + cumeeira + beirais de madeira!
  const oldSlopeAng = Math.atan2(1.95, 3.4); // ~0.521 rad
  const oldSlopeLen = Math.hypot(3.4, 1.95) + 0.65; // ~4.57m com beiral
  const oldRoofL = new THREE.Mesh(new THREE.BoxGeometry(oldSlopeLen, 0.2, 6.75), oldTileMat);
  oldRoofL.position.set(-1.86, 5.42, 0);
  oldRoofL.rotation.z = oldSlopeAng;
  oldRoofL.castShadow = true;
  const oldRoofR = new THREE.Mesh(new THREE.BoxGeometry(oldSlopeLen, 0.2, 6.75), oldTileMat);
  oldRoofR.position.set(1.86, 5.42, 0);
  oldRoofR.rotation.z = -oldSlopeAng;
  oldRoofR.castShadow = true;
  const oldRidge = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 6.82), oldWoodEaveMat);
  oldRidge.position.set(0, 6.62, 0);
  const oldEaveL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 6.78), oldWoodEaveMat);
  oldEaveL.position.set(-3.76, 4.28, 0);
  const oldEaveR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 6.78), oldWoodEaveMat);
  oldEaveR.position.set(3.76, 4.28, 0);

  // Moldura superior + janelas com travessas + porta almofadada + relógio com ponteiros!
  const oldCornice = new THREE.Mesh(new THREE.BoxGeometry(6.95, 0.16, 6.15), oldWoodEaveMat);
  oldCornice.position.y = 4.56;
  [-1.9, 1.9].forEach((wx) => {
    const wf = new THREE.Mesh(new THREE.BoxGeometry(1.28, 1.48, 0.1), oldBrickTrimMat);
    wf.position.set(wx, 2.55, 3.02);
    const wp = new THREE.Mesh(new THREE.BoxGeometry(1.04, 1.24, 0.12), glassTintMat);
    wp.position.set(wx, 2.55, 3.04);
    const wv = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.26, 0.14), oldWoodEaveMat);
    wv.position.set(wx, 2.55, 3.05);
    const wh = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.05, 0.14), oldWoodEaveMat);
    wh.position.set(wx, 2.55, 3.05);
    const ws = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.1, 0.22), oldWoodEaveMat);
    ws.position.set(wx, 1.8, 3.08);
    oldStGroup.add(wf, wp, wv, wh, ws);
  });
  const oldDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.62, 2.58, 0.12), oldBrickTrimMat);
  oldDoorFrame.position.set(0, 1.32, 3.02);
  const oldDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.42, 0.14), oldWoodEaveMat);
  oldDoor.position.set(0, 1.24, 3.04);
  const stClockRim = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.1, 16), fenceIronMat);
  stClockRim.rotation.x = Math.PI / 2;
  stClockRim.position.set(0, 3.82, 3.04);
  const stClockFace = new THREE.Mesh(new THREE.CircleGeometry(0.36, 16), whiteLineMat);
  stClockFace.position.set(0, 3.82, 3.1);
  const stHandH = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.02), fenceIronMat);
  stHandH.position.set(0, 3.9, 3.11);
  const stHandM = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.02), fenceIronMat);
  stHandM.position.set(0.1, 3.82, 3.11);
  oldStGroup.add(
    oldBase, oldStationBody, oldCornice, oldRoofL, oldRoofR, oldRidge, oldEaveL, oldEaveR,
    oldDoorFrame, oldDoor, stClockRim, stClockFace, stHandH, stHandM
  );
  terminalGroup.add(oldStGroup);
  addObstacleBox(16.0, -20.5, 7.0, 6.2, terminalObstacles);

  // Fachada Branca Sul da Estação Reformulada (bilheteria, janelões de vidro, faixa Rubi e cobertura!)
  const hallGrp = new THREE.Group();
  hallGrp.position.set(14.2, 0.95, 19.0);
  const whiteStHall = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.7, 4.6), whiteWallMat);
  whiteStHall.position.y = 1.85;
  whiteStHall.castShadow = true;
  const hallBand = new THREE.Mesh(new THREE.BoxGeometry(4.62, 0.45, 4.72), blueTrimMat);
  hallBand.position.y = 3.55;
  const hallRoof = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.22, 5.0), roofTopCorrugMat);
  hallRoof.position.y = 3.88;
  const ticketWin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.25, 0.1), glassTintMat);
  ticketWin.position.set(0, 1.8, -2.32);
  const ticketShelf = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.1, 0.35), concreteMat);
  ticketShelf.position.set(0, 1.15, -2.42);
  hallGrp.add(whiteStHall, hallBand, hallRoof, ticketWin, ticketShelf);
  terminalGroup.add(hallGrp);
  addObstacleBox(14.2, 19.0, 4.6, 4.8, terminalObstacles);

  // LOJA DA ESTAÇÃO CLP (Enxadas Especiais, Celular, Balde & Tesoura) em (14.2, 0.95, -9.8)
  const stShopGroup = new THREE.Group();
  stShopGroup.position.set(14.2, 0.95, -9.8);
  const stBlueMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 });
  const stNavyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.55, metalness: 0.35 });
  const stYellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.48 });
  const stBoardMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.78 });

  const stBase = new THREE.Mesh(new THREE.BoxGeometry(3.72, 0.14, 1.92), stNavyMat);
  stBase.position.y = 0.07;
  const stShopCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.02, 1.8), stBlueMat);
  stShopCounter.position.y = 0.64;
  stShopCounter.castShadow = true;
  stShopCounter.receiveShadow = true;
  const stFrontStripe = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.16, 0.05), stYellowMat);
  stFrontStripe.position.set(0, 0.88, 0.92);
  const stShopTop = new THREE.Mesh(new THREE.BoxGeometry(3.82, 0.14, 2.02), stYellowMat);
  stShopTop.position.y = 1.21;
  stShopTop.castShadow = true;
  stShopGroup.add(stBase, stShopCounter, stFrontStripe, stShopTop);

  [[-1.76, -0.84], [1.76, -0.84], [-1.76, 0.84], [1.76, 0.84]].forEach(([px, pz]) => {
    const pil = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.76, 0.14), stNavyMat);
    pil.position.set(px, 1.38, pz);
    pil.castShadow = true;
    stShopGroup.add(pil);
  });
  const stBackWall = new THREE.Mesh(new THREE.BoxGeometry(3.48, 1.5, 0.1), stBoardMat);
  stBackWall.position.set(0, 1.96, -0.84);
  stShopGroup.add(stBackWall);

  [
    { x: -1.15, col: 0xf97316, em: 0xea580c },
    { x: -0.38, col: 0x38bdf8, em: 0x0284c7 },
    { x: 0.38, col: 0xfacc15, em: 0xeab308 },
    { x: 1.15, col: 0x67e8f9, em: 0x06b6d4 },
  ].forEach((dHoe) => {
    const hHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.028, 0.86, 6),
      new THREE.MeshStandardMaterial({ color: 0x7c4a21, roughness: 0.85 })
    );
    hHandle.position.set(dHoe.x, 1.94, -0.75);
    const hBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.18, 0.05),
      new THREE.MeshStandardMaterial({ color: dHoe.col, emissive: dHoe.em, emissiveIntensity: 0.45, metalness: 0.65, roughness: 0.25 })
    );
    hBlade.position.set(dHoe.x + 0.08, 2.34, -0.73);
    stShopGroup.add(hHandle, hBlade);
  });

  const stShopAwning = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 2.46), blueTrimMat);
  stShopAwning.position.set(0, 2.82, 0.04);
  stShopAwning.castShadow = true;
  const stAwningTrim = new THREE.Mesh(new THREE.BoxGeometry(4.24, 0.1, 2.5), stNavyMat);
  stAwningTrim.position.set(0, 2.7, 0.04);
  stShopGroup.add(stShopAwning, stAwningTrim);

  const dispBucket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.14, 0.34, 10),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.78, roughness: 0.22 })
  );
  dispBucket.position.set(-1.05, 1.45, 0.22);
  const dispBucketRim = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.02, 6, 12),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
  );
  dispBucketRim.rotation.x = Math.PI / 2;
  dispBucketRim.position.set(-1.05, 1.62, 0.22);

  const dispShearGroup = new THREE.Group();
  dispShearGroup.position.set(0.0, 1.31, 0.28);
  const shBladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
  const shRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
  const shB1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.03, 0.06), shBladeMat);
  shB1.rotation.y = 0.22;
  const shB2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.03, 0.06), shBladeMat);
  shB2.rotation.y = -0.22;
  const shH1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.08), shRedMat);
  shH1.position.set(-0.18, 0, 0.06);
  const shH2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.08), shRedMat);
  shH2.position.set(-0.18, 0, -0.06);
  dispShearGroup.add(shB1, shB2, shH1, shH2);

  const regBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.38), stNavyMat);
  regBox.position.set(1.12, 1.43, 0.16);
  const regScreen = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.04), new THREE.MeshBasicMaterial({ color: 0x4ade80 }));
  regScreen.position.set(1.12, 1.62, 0.28);
  stShopGroup.add(dispBucket, dispBucketRim, dispShearGroup, regBox, regScreen);

  const stShopSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.75, 0.74, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("LOJA DA ESTAÇÃO CLP", "Escopeta • Celular • Enxadas • Itens", "#1e3a8a", "#fef08a"),
    })
  );
  stShopSign.position.set(0, 3.26, 0.88);
  stShopGroup.add(stShopSign);
  [-1.4, 1.4].forEach((bx) => {
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.36, 0.1), stNavyMat);
    br.position.set(bx, 2.96, 0.88);
    stShopGroup.add(br);
  });

  terminalGroup.add(stShopGroup);
  addObstacleBox(14.2, -9.8, 3.8, 2.0, terminalObstacles);

  // Linha tátil amarela na plataforma + bancos de espera + catracas decorativas na entrada sul!
  const tactile = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 45.6), yellowTactile);
  tactile.position.set(21.1, 0.98, -1.0);
  terminalGroup.add(tactile);

  [4.0, 12.2].forEach((bz) => {
    const sb = new THREE.Group();
    sb.position.set(14.6, 0.95, bz);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.08, 2.8), blueTrimMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 2.8), blueTrimMat);
    back.position.set(-0.27, 0.76, 0);
    back.castShadow = true;
    [-1.05, 1.05].forEach((lz) => {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.46, 0.1), steelMat);
      l.position.set(0, 0.23, lz);
      sb.add(l);
    });
    sb.add(seat, back);
    terminalGroup.add(sb);
    addObstacleBox(14.6, bz, 0.72, 2.9, terminalObstacles);
  });

  // COBERTURA SÓLIDA DA ESTAÇÃO LINHA 7-RUBI (Telha ondulada + forro + testeira Rubi + luminárias LED!)
  const stSoffit = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.14, 30.8), underRoofMat);
  stSoffit.position.set(16.0, 6.82, -1.0);
  const stRoof = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.24, 31.2), roofTopCorrugMat);
  stRoof.position.set(16.0, 7.18, -1.0);
  stRoof.castShadow = true;
  const stFasciaW = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 31.3), roofMat);
  stFasciaW.position.set(11.16, 7.04, -1.0);
  const stFasciaE = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 31.3), roofMat);
  stFasciaE.position.set(20.84, 7.04, -1.0);
  terminalGroup.add(stSoffit, stRoof, stFasciaW, stFasciaE);

  [-11.0, -3.5, 4.0, 11.5].forEach((lz) => {
    const sLed = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 3.2), ledStripMat);
    sLed.position.set(16.0, 6.72, lz);
    terminalGroup.add(sLed);
  });

  [-13.5, -6.2, 5.2, 13.8].forEach((pz) => {
    const pBase = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.35, 0.54), concreteMat);
    pBase.position.set(11.8, 1.12, pz);
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 5.85, 0.28), steelMat);
    pillar.position.set(11.8, 4.05, pz);
    pillar.castShadow = true;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.22, 0.24), steelMat);
    arm.position.set(14.5, 6.72, pz);
    terminalGroup.add(pBase, pillar, arm);
    addObstacleBox(11.8, pz, 0.55, 0.55, terminalObstacles);
  });

  // Placa dupla-face da Estação + Painel de Próximo Trem!
  const rubiBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 1.05, 7.2),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CAMPO LIMPO PAULISTA", "Estação Ferroviária • Sentido Botujuru", "#1e3a8a", "#ffffff"),
    })
  );
  rubiBoard.position.set(11.8, 5.55, 0);
  terminalGroup.add(rubiBoard);
  [-2.6, 2.6].forEach((hz) => {
    const rod = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.15, 0.1), steelMat);
    rod.position.set(11.8, 6.45, hz);
    terminalGroup.add(rod);
  });

  const nextTrainBoard = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.72, 0.16),
    new THREE.MeshBasicMaterial({
      map: createTvScreenTexture("ESTAÇÃO CLP • BOTUJURU", "Embarque na Plataforma 1 (E)", "#38bdf8"),
    })
  );
  nextTrainBoard.position.set(17.5, 5.8, -1.0);
  terminalGroup.add(nextTrainBoard);

  // PASSARELA ELEVADA + TORRE DE ELEVADOR ENVIDRAÇADA + ESCADA APOIADA NO CHÃO (BUG DA IMAGEM 6 CORRIGIDO!)
  const overpassDeck = new THREE.Mesh(new THREE.BoxGeometry(21.2, 0.42, 3.0), concreteMat);
  overpassDeck.position.set(20.6, 6.15, -16.0);
  overpassDeck.castShadow = true;
  const overpassRoof = new THREE.Mesh(new THREE.BoxGeometry(21.4, 0.2, 3.3), roofTopCorrugMat);
  overpassRoof.position.set(20.6, 8.65, -16.0);
  // Guarda-corpos de vidro + barra Rubi dos dois lados da passarela + pilar de apoio no lado leste!
  [-17.44, -14.56].forEach((rz) => {
    const rGlass = new THREE.Mesh(new THREE.BoxGeometry(20.8, 1.05, 0.08), glassClearMat);
    rGlass.position.set(20.6, 6.88, rz);
    const rTop = new THREE.Mesh(new THREE.BoxGeometry(21.0, 0.14, 0.14), blueTrimMat);
    rTop.position.set(20.6, 7.45, rz);
    terminalGroup.add(rGlass, rTop);
  });
  [-17.35, -14.65].forEach((pz) => {
    const eastSupport = new THREE.Mesh(new THREE.BoxGeometry(0.42, 8.65, 0.42), steelMat);
    eastSupport.position.set(30.8, 4.325, pz);
    eastSupport.castShadow = true;
    const midPost = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.4, 0.16), steelMat);
    midPost.position.set(20.6, 7.45, pz);
    terminalGroup.add(eastSupport, midPost);
  });
  terminalGroup.add(overpassDeck, overpassRoof);

  // Torre de Elevador estruturada (base sólida + caixa de vidro panorâmico + porta metálica + topo!)
  const elevGrp = new THREE.Group();
  elevGrp.position.set(11.1, 0.95, -16.0);
  const elevBase = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.35, 2.3), concreteMat);
  elevBase.position.y = 0.175;
  const elevShaft = new THREE.Mesh(new THREE.BoxGeometry(2.05, 7.3, 2.05), glassClearMat);
  elevShaft.position.y = 3.85;
  [[-1.04, -1.04], [1.04, -1.04], [-1.04, 1.04], [1.04, 1.04]].forEach(([ex, ez]) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.18, 7.6, 0.18), steelMat);
    col.position.set(ex, 3.8, ez);
    col.castShadow = true;
    elevGrp.add(col);
  });
  const elevDoorL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.25, 0.72), steelMat);
  elevDoorL.position.set(1.06, 1.25, -0.38);
  const elevDoorR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.25, 0.72), steelMat);
  elevDoorR.position.set(1.06, 1.25, 0.38);
  const elevCap = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.32, 2.42), blueTrimMat);
  elevCap.position.y = 7.72;
  elevGrp.add(elevBase, elevShaft, elevDoorL, elevDoorR, elevCap);
  terminalGroup.add(elevGrp);
  addObstacleBox(11.1, -16.0, 2.4, 2.4, terminalObstacles);

  // Escada removida p/ visão limpa da casinha histórica da estação (acesso à passarela pela torre de elevador!)

  // Via Férrea Detalhada (brita + 64 dormentes instanciados + trilhos de aço + postes/fios de catenária!)
  const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.78, roughness: 0.28 });
  const ballast = new THREE.Mesh(
    new THREE.BoxGeometry(9.6, 0.14, 220),
    new THREE.MeshStandardMaterial({ map: createWornConcreteTexture(), color: 0x6b6258, roughness: 1.0 })
  );
  ballast.position.set(26.8, 0.07, 0);
  terminalGroup.add(ballast);

  // Dormentes de concreto sob as 2 vias em InstancedMesh ao longo dos 220m
  const sleeperGeo = new THREE.BoxGeometry(2.35, 0.1, 0.24);
  const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.95 });
  const sleeperCount = 156;
  const sleeperInst = new THREE.InstancedMesh(sleeperGeo, sleeperMat, sleeperCount * 2);
  const _slDummy = new THREE.Object3D();
  let slIdx = 0;
  for (let i = 0; i < sleeperCount; i++) {
    const sz = -104 + i * 1.34;
    [25.0, 28.8].forEach((sx) => {
      _slDummy.position.set(sx, 0.14, sz);
      _slDummy.updateMatrix();
      sleeperInst.setMatrixAt(slIdx++, _slDummy.matrix);
    });
  }
  sleeperInst.instanceMatrix.needsUpdate = true;
  terminalGroup.add(sleeperInst);

  [24.3, 25.7, 28.1, 29.5].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 220), railMat);
    rail.position.set(rx, 0.22, 0);
    terminalGroup.add(rail);
  });

  // Postes e cabos da rede aérea (catenária) ao longo da ferrovia!
  [-90, -70, -50, -30, -10, 10, 30, 50, 70, 90].forEach((cz) => {
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.22, 6.8, 0.22), steelMat);
    mast.position.set(31.2, 3.4, cz);
    const cant = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.14, 0.14), steelMat);
    cant.position.set(27.8, 6.3, cz);
    terminalGroup.add(mast, cant);
  });
  [25.0, 28.8].forEach((wx) => {
    const wire = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 210), fenceIronMat);
    wire.position.set(wx, 5.7, 0);
    terminalGroup.add(wire);
  });

  const trainTerm = createTrain7RubiModel("7-RUBI • BOTUJURU");
  trainTerm.position.set(25.0, 0.12, 0);
  terminalGroup.add(trainTerm);
  // ===================== CENÁRIO COMPLETO EM VOLTA DO TERMINAL & ESTAÇÃO CLP =====================
  {
    const envGroup = new THREE.Group();
    const sGrassMat = new THREE.MeshStandardMaterial({
      map: createGrassTexture("#4b8b3b", "#3d7a30", 8, 5),
      roughness: 0.96,
    });
    const sTileRoofMat = new THREE.MeshStandardMaterial({
      map: createRoofTileTexture("#a84824", "#6e270e", 4, 3),
      roughness: 0.76,
    });
    const sTileRoofDark = new THREE.MeshStandardMaterial({
      map: createRoofTileTexture("#7c2d12", "#471708", 4, 3),
      roughness: 0.8,
    });
    const sSidewalkMat = new THREE.MeshStandardMaterial({
      map: createTileFloorTexture("#cbd5e1", "#b6c2d0", 14),
      roughness: 0.88,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const sWoodMat = new THREE.MeshStandardMaterial({
      map: createWoodPlankTexture("#6b4423", "#422710", 2, 2),
      roughness: 0.82,
    });
    const sWinWarmMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.18,
      roughness: 0.25,
    });

    // 1. Serras e morros verdes cercando o horizonte de Campo Limpo Paulista
    [
      [-115, -110, 44, 22],
      [0, -125, 56, 26],
      [110, -108, 48, 24],
      [-128, 12, 42, 20],
      [126, 8, 46, 24],
      [-110, 118, 46, 21],
      [15, 128, 54, 23],
      [115, 116, 44, 20],
    ].forEach(([hx, hz, hr, hh]) => {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(hr, hh, 14), sGrassMat);
      hill.position.set(hx, hh * 0.36, hz);
      hill.scale.set(1.35, 1, 1.12);
      envGroup.add(hill);
    });

    // 2. Calçada Sul da Av. Alfried Krupp (z = 31.1..35.2) + semáforo + faixa de comércios do Centro!
    const southWalk = new THREE.Mesh(new THREE.BoxGeometry(118, 0.16, 4.2), sSidewalkMat);
    southWalk.position.set(-16, 0.08, 33.2);
    southWalk.receiveShadow = true;
    envGroup.add(southWalk);

    // Semáforo urbano na esquina da travessia central
    const tfPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.8, 8), fenceIronMat);
    tfPole.position.set(-6.5, 2.4, 31.6);
    const tfBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.1, 0.36), fenceIronMat);
    tfBox.position.set(-6.5, 4.35, 31.6);
    [
      [4.68, 0xef4444],
      [4.35, 0xfacc15],
      [4.02, 0x22c55e],
    ].forEach(([ly, col]) => {
      const l = new THREE.Mesh(new THREE.CircleGeometry(0.11, 10), new THREE.MeshBasicMaterial({ color: col }));
      l.position.set(-6.5, ly, 31.41);
      l.rotation.y = Math.PI;
      envGroup.add(l);
    });
    envGroup.add(tfPole, tfBox);

    // Helper: Loja / Sobrado Comercial Brasileiro de Centro de Cidade (térreo comercial + 2º andar + toldo + placa!)
    const addTownShop = (x, z, w, d, floors, wallHex, awningHex, title, sub, rotY = 0) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.rotation.y = rotY;
      const wMat = new THREE.MeshStandardMaterial({
        map: createStuccoWallTexture(wallHex, "#d6ccb8", 2, 2),
        roughness: 0.84,
      });
      const aMat = new THREE.MeshStandardMaterial({ color: awningHex, roughness: 0.65 });
      const totalH = floors === 2 ? 6.4 : 3.7;

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(w + 0.14, 0.38, d + 0.14), concreteMat);
      plinth.position.y = 0.19;
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, totalH, d), wMat);
      body.position.y = totalH * 0.5 + 0.32;
      body.castShadow = true;
      body.receiveShadow = true;
      const parapet = new THREE.Mesh(new THREE.BoxGeometry(w + 0.24, 0.35, d + 0.24), concreteMat);
      parapet.position.y = totalH + 0.44;
      g.add(plinth, body, parapet);

      // Vitrine comercial + porta no térreo (fachada +Z)
      const shopGlass = new THREE.Mesh(new THREE.BoxGeometry(w * 0.52, 1.95, 0.08), glassTintMat);
      shopGlass.position.set(-w * 0.16, 1.38, d * 0.5 + 0.03);
      const shopDoor = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.25, 0.1), steelMat);
      shopDoor.position.set(w * 0.28, 1.48, d * 0.5 + 0.03);
      // Toldo inclinado + placa de fachada
      const awning = new THREE.Mesh(new THREE.BoxGeometry(w * 0.9, 0.16, 1.35), aMat);
      awning.position.set(0, 2.82, d * 0.5 + 0.62);
      awning.rotation.x = 0.24;
      awning.castShadow = true;
      g.add(shopGlass, shopDoor, awning);

      if (title) {
        const sign = new THREE.Mesh(
          new THREE.PlaneGeometry(Math.min(w - 0.8, 4.8), 0.72),
          new THREE.MeshBasicMaterial({ map: createWoodSignTexture(title, sub, awningHex, "#ffffff") })
        );
        sign.position.set(0, 3.42, d * 0.5 + 0.06);
        g.add(sign);
      }

      // Janelas e sacada no 2º andar (sobrado)
      if (floors === 2) {
        [-w * 0.28, w * 0.28].forEach((wx) => {
          const wf = new THREE.Mesh(new THREE.BoxGeometry(1.32, 1.28, 0.1), whiteWallMat);
          wf.position.set(wx, 5.05, d * 0.5 + 0.03);
          const wp = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.06, 0.12), sWinWarmMat);
          wp.position.set(wx, 5.05, d * 0.5 + 0.04);
          g.add(wf, wp);
        });
      }
      envGroup.add(g);
    };

    // Fileira de comércios autênticos em frente ao Terminal (Sul da Av. Alfried Krupp, voltados p/ Norte = rotY PI)
    addTownShop(-40.0, 41.2, 8.2, 7.6, 2, "#f5ead6", "#b91c1c", "PADARIA CENTRAL", "Pão Quente & Café", Math.PI);
    addTownShop(-30.5, 41.0, 7.8, 7.4, 1, "#e2e8f0", "#1d4ed8", "FARMÁCIA POPULAR", "24 Horas • Centro", Math.PI);
    addTownShop(-21.2, 41.4, 8.6, 7.8, 2, "#fef3c7", "#15803d", "MERCADO KRUPP", "Hortifruti & Açougue", Math.PI);
    addTownShop(-11.4, 41.0, 7.4, 7.2, 1, "#e7dfd1", "#c2410c", "PAPELARIA SÃO JOSÉ", "Xerox & Materiais", Math.PI);
    addTownShop(-2.4, 41.3, 8.2, 7.6, 2, "#dbeafe", "#0f766e", "LANCHONETE DA PRAÇA", "Salgados & Sucos", Math.PI);
    addTownShop(7.0, 41.0, 7.8, 7.4, 1, "#f3e8d8", "#7c2d12", "BARBEARIA DO ZÉ", "Corte & Barba", Math.PI);
    addTownShop(16.2, 41.2, 8.0, 7.5, 2, "#e5e7eb", "#1e3a8a", "LOJA DO CENTRO", "Utilidades & Celular", Math.PI);

    // 2 prédios pequenos icônicos de Campo Limpo Paulista ao fundo sul (respeitando a cidade!)
    [
      [-16.0, 62.0, 9.0, 14.5, 8.5, "#d6d3cb"],
      [4.5, 66.0, 8.5, 16.5, 8.2, "#cbd5e1"],
    ].forEach(([bx, bz, bw, bh, bd, col]) => {
      const bMat = new THREE.MeshStandardMaterial({ map: createStuccoWallTexture(col, "#94a3b8", 2, 4), roughness: 0.85 });
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), bMat);
      bMesh.position.set(bx, bh * 0.5, bz);
      bMesh.castShadow = true;
      const cap = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.4, 0.45, bd + 0.4), concreteMat);
      cap.position.set(bx, bh + 0.2, bz);
      envGroup.add(bMesh, cap);
      for (let wy = 3.0; wy < bh - 1.5; wy += 2.6) {
        [-bw * 0.28, 0, bw * 0.28].forEach((wx) => {
          const w = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.15, 0.08), sWinWarmMat);
          w.position.set(bx + wx, wy, bz - bd * 0.5 - 0.04);
          envGroup.add(w);
        });
      }
    });

    // 3. Carros estacionados/circulando na Av. Alfried Krupp (z = 29.0, fora da área jogável z <= 24!)
    const addStreetCar = (cx, cz, yaw, colorHex) => {
      const car = new THREE.Group();
      car.position.set(cx, 0.05, cz);
      car.rotation.y = yaw;
      const cMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.42, roughness: 0.36 });
      const cBody = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.65, 4.0), cMat);
      cBody.position.y = 0.58;
      cBody.castShadow = true;
      const cCab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.58, 2.0), glassTintMat);
      cCab.position.set(0, 1.16, -0.1);
      const cRoof = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.1, 1.84), cMat);
      cRoof.position.set(0, 1.46, -0.1);
      car.add(cBody, cCab, cRoof);
      [[-0.92, 0.32, 1.2], [0.92, 0.32, 1.2], [-0.92, 0.32, -1.2], [0.92, 0.32, -1.2]].forEach(([wx, wy, wz]) => {
        const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 10), fenceIronMat);
        wh.rotation.z = Math.PI / 2;
        wh.position.set(wx, wy, wz);
        car.add(wh);
      });
      envGroup.add(car);
    };
    addStreetCar(-34.0, 29.0, Math.PI / 2, 0xdc2626);
    addStreetCar(-14.0, 29.0, Math.PI / 2, 0xe2e8f0);
    addStreetCar(10.0, 29.0, Math.PI / 2, 0x1d4ed8);
    addStreetCar(-48.0, 24.4, -Math.PI / 2, 0x334155);
    addStreetCar(52.0, 28.8, Math.PI / 2, 0xfacc15);

    // 4. Praça Municipal arborizada a Oeste do Terminal (x = -46..-72, z = -22..+18)
    const plazaFloor = new THREE.Mesh(new THREE.BoxGeometry(24, 0.14, 34), sSidewalkMat);
    plazaFloor.position.set(-59, 0.07, -2);
    plazaFloor.receiveShadow = true;
    const plazaLawn = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.18, 26),
      new THREE.MeshStandardMaterial({ map: createGrassTexture("#569643", "#437d33", 5, 7), roughness: 0.92 })
    );
    plazaLawn.position.set(-59, 0.09, -2);
    // Coreto rústico no centro da praça!
    const gazeboBase = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.55, 8), concreteMat);
    gazeboBase.position.set(-59, 0.275, -2);
    const gazeboRoof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 1.8, 8), sTileRoofMat);
    gazeboRoof.position.set(-59, 4.1, -2);
    gazeboRoof.castShadow = true;
    envGroup.add(plazaFloor, plazaLawn, gazeboBase, gazeboRoof);
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      const gp = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.1, 8), whiteWallMat);
      gp.position.set(-59 + Math.cos(a) * 2.75, 2.0, -2 + Math.sin(a) * 2.75);
      envGroup.add(gp);
    }

    // 5. Galpões industriais & garagem de ônibus ao Norte do Terminal (z = -38..-58)
    [
      [-32.0, -45.0, 18.0, 6.2, 12.0, "#cbd5e1"],
      [-8.0, -46.0, 20.0, 6.8, 13.0, "#d6d3cb"],
      [12.0, -44.0, 12.0, 5.2, 10.0, "#e2e8f0"],
    ].forEach(([gx, gz, gw, gh, gd, col]) => {
      const gMat = new THREE.MeshStandardMaterial({ map: createStuccoWallTexture(col, "#94a3b8", 4, 2), roughness: 0.85 });
      const shed = new THREE.Mesh(new THREE.BoxGeometry(gw, gh, gd), gMat);
      shed.position.set(gx, gh * 0.5, gz);
      shed.castShadow = true;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(gw + 0.6, 0.35, gd + 0.6), roofTopCorrugMat);
      roof.position.set(gx, gh + 0.2, gz);
      const rollDoor = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.6, 0.12), steelMat);
      rollDoor.position.set(gx, 1.8, gz + gd * 0.5 + 0.05);
      envGroup.add(shed, roof, rollDoor);
    });

    // 6. Bairro residencial do outro lado do Rio Jundiaí (Leste: x = 49..84) + Casas a Oeste!
    const bgWallMatCache = new Map();
    const bgUnitBox = new THREE.BoxGeometry(1, 1, 1);
    const bgWinGeo = new THREE.BoxGeometry(1.1, 0.95, 0.08);
    const bgDoorGeo = new THREE.BoxGeometry(0.95, 1.9, 0.08);
    const bgUnitGableShape = new THREE.Shape();
    bgUnitGableShape.moveTo(-0.5, 0);
    bgUnitGableShape.lineTo(0.5, 0);
    bgUnitGableShape.lineTo(0, 1);
    bgUnitGableShape.closePath();
    const bgUnitGableGeo = new THREE.ExtrudeGeometry(bgUnitGableShape, { depth: 1, bevelEnabled: false });

    const addBgHouse = (hx, hz, hw, hh, hd, wallHex, rotY = 0, darkRoof = false) => {
      const hg = new THREE.Group();
      hg.position.set(hx, 0, hz);
      hg.rotation.y = rotY;
      let hMat = bgWallMatCache.get(wallHex);
      if (!hMat) {
        hMat = new THREE.MeshStandardMaterial({ color: wallHex, roughness: 0.86 });
        bgWallMatCache.set(wallHex, hMat);
      }
      const body = new THREE.Mesh(bgUnitBox, hMat);
      body.scale.set(hw, hh, hd);
      body.position.y = hh * 0.5;
      body.castShadow = true;

      const peakH = 1.4;
      const gable = new THREE.Mesh(bgUnitGableGeo, hMat);
      gable.scale.set(hw, peakH, hd);
      gable.position.set(0, hh - 0.02, -hd * 0.5);
      gable.castShadow = true;

      const rSlope = Math.atan2(peakH, hw * 0.5);
      const eave = 0.45;
      const roofT = 0.16;
      const rLen = Math.hypot(hw * 0.5, peakH) + eave + 0.12;
      const midAlong = (eave - 0.12) * 0.5;
      const lx = -hw * 0.25 - Math.cos(rSlope) * midAlong - Math.sin(rSlope) * (roofT * 0.5);
      const ly = hh + peakH * 0.5 - Math.sin(rSlope) * midAlong + Math.cos(rSlope) * (roofT * 0.5);
      const rMat = darkRoof ? sTileRoofDark : sTileRoofMat;
      const rl = new THREE.Mesh(bgUnitBox, rMat);
      rl.scale.set(rLen, roofT, hd + 0.65);
      rl.position.set(lx, ly, 0);
      rl.rotation.z = rSlope;
      const rr = new THREE.Mesh(bgUnitBox, rMat);
      rr.scale.set(rLen, roofT, hd + 0.65);
      rr.position.set(-lx, ly, 0);
      rr.rotation.z = -rSlope;
      const ridge = new THREE.Mesh(bgUnitBox, sWoodMat);
      ridge.scale.set(0.24, 0.2, hd + 0.68);
      ridge.position.set(0, hh + peakH + 0.08, 0);

      const win = new THREE.Mesh(bgWinGeo, sWinWarmMat);
      win.position.set(-hw * 0.22, hh * 0.56, hd * 0.5 + 0.03);
      const door = new THREE.Mesh(bgDoorGeo, sWoodMat);
      door.position.set(hw * 0.22, 0.95, hd * 0.5 + 0.03);
      hg.add(body, gable, rl, rr, ridge, win, door);
      envGroup.add(hg);
    };

    const houseColors = ["#f5ead6", "#e6c7a8", "#dbeafe", "#fef3c7", "#e2e8f0", "#f3d5c0"];
    // Encosta Leste (além do Rio Jundiaí)
    [
      [52, -32, 6.8, 3.4, 5.6, 0], [54, -18, 7.2, 3.8, 5.8, -Math.PI / 2],
      [53, -4, 6.4, 3.3, 5.4, -Math.PI / 2], [55, 10, 7.0, 3.6, 5.6, -Math.PI / 2],
      [54, 40, 6.8, 3.5, 5.5, Math.PI], [68, -24, 7.2, 3.6, 5.8, -Math.PI / 2],
      [70, -8, 6.6, 3.4, 5.5, -Math.PI / 2], [69, 8, 7.4, 4.0, 6.0, -Math.PI / 2],
      [68, 42, 6.8, 3.4, 5.4, Math.PI],
      // Bairro atrás da Praça (Oeste)
      [-80, -18, 7.0, 3.6, 5.6, Math.PI / 2], [-80, -4, 6.6, 3.4, 5.4, Math.PI / 2],
      [-80, 10, 7.2, 3.8, 5.8, Math.PI / 2], [-58, 42, 7.0, 3.5, 5.5, Math.PI],
    ].forEach(([hx, hz, hw, hh, hd, ry], idx) => {
      addBgHouse(hx, hz, hw, hh, hd, houseColors[idx % houseColors.length], ry, idx % 2 === 1);
    });

    // 7. Árvores e mata ciliar em InstancedMesh ao longo do Rio Jundiaí, Praça e calçadas (alto FPS!)
    const treePts = [
      // Margens do Rio Jundiaí
      [44.5, -52, 1.3], [45.0, -38, 1.2], [44.2, -24, 1.35], [45.2, -12, 1.25],
      [44.6, 2, 1.3], [45.0, 14, 1.2], [44.5, 38, 1.35], [45.2, 52, 1.25],
      [60.0, -44, 1.4], [62.0, -14, 1.3], [61.5, 16, 1.35], [62.0, 34, 1.25],
      // Praça Oeste & Calçada Sul
      [-49.5, -16, 1.25], [-49.5, 12, 1.25], [-68.5, -16, 1.3], [-68.5, 12, 1.3],
      [-59.0, -16, 1.15], [-59.0, 12, 1.15],
      [-36.0, 33.2, 0.95], [-16.0, 33.2, 0.95], [2.5, 33.2, 0.95], [21.0, 33.2, 0.95],
      // Fundo Norte & Sul
      [-48, -36, 1.35], [-20, -34, 1.2], [20, -36, 1.3], [-48, 56, 1.4], [28, 56, 1.35],
    ];
    const tTrunkInst = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.24, 0.38, 3.0, 7), termBarkMat, treePts.length);
    const tCrownInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.95, 1), bushMat, treePts.length);
    const tCrown2Inst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.3, 1), bushMat2, treePts.length);
    const _td = new THREE.Object3D();
    treePts.forEach(([tx, tz, ts], i) => {
      _td.position.set(tx, 1.5 * ts, tz);
      _td.rotation.set(0, i * 0.7, 0);
      _td.scale.setScalar(ts);
      _td.updateMatrix();
      tTrunkInst.setMatrixAt(i, _td.matrix);

      _td.position.set(tx, 3.8 * ts, tz);
      _td.updateMatrix();
      tCrownInst.setMatrixAt(i, _td.matrix);

      _td.position.set(tx + 0.7 * ts, 4.4 * ts, tz + 0.35 * ts);
      _td.updateMatrix();
      tCrown2Inst.setMatrixAt(i, _td.matrix);
    });
    tTrunkInst.instanceMatrix.needsUpdate = true;
    tCrownInst.instanceMatrix.needsUpdate = true;
    tCrown2Inst.instanceMatrix.needsUpdate = true;
    envGroup.add(tTrunkInst, tCrownInst, tCrown2Inst);

    // Arbustos ao longo da margem do rio e praça
    const rBushes = [];
    for (let bz = -60; bz <= 60; bz += 6.5) {
      if (bz > 20 && bz < 33) continue;
      rBushes.push([43.8 + (Math.abs(bz) % 3) * 0.5, bz, 0.9 + (Math.abs(bz) % 4) * 0.15]);
    }
    const rBushInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.75, 1), bushMat, rBushes.length);
    rBushes.forEach(([bx, bz, bs], i) => {
      _td.position.set(bx, 0.42 * bs, bz);
      _td.rotation.set(0, i, 0);
      _td.scale.set(1.25 * bs, 0.78 * bs, 1.1 * bs);
      _td.updateMatrix();
      rBushInst.setMatrixAt(i, _td.matrix);
    });
    rBushInst.instanceMatrix.needsUpdate = true;
    envGroup.add(rBushInst);

    terminalGroup.add(envGroup);
  }


  // Menino Maluquinho 3D (rig articulado corretamente nos ombros, quadris e cabeça com panela!)
  const malu = new THREE.Group();
  const mBodyGroup = new THREE.Group();
  malu.add(mBodyGroup);

  const mSkin = new THREE.MeshStandardMaterial({ color: 0xf4cfa8, roughness: 0.65 });
  const mShirt = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.7 });
  const mShorts = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.75 });
  const mShoe = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55 });
  const mSole = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.75 });
  const mHairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.85 });
  const potMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.65, roughness: 0.25 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });

  // Torso amarelo + bermuda na cintura + pescoço
  const mTorso = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.76, 0.38), mShirt);
  mTorso.position.y = 1.1;
  mTorso.castShadow = true;
  const mWaist = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.14, 0.38), mShorts);
  mWaist.position.y = 0.68;
  const mNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.14, 8), mSkin);
  mNeck.position.y = 1.54;
  mBodyGroup.add(mTorso, mWaist, mNeck);

  // Cabeça pivotada no pescoço com olhos expressivos, sorriso e panela acoplada!
  const mHeadGroup = new THREE.Group();
  mHeadGroup.position.set(0, 1.82, 0);
  const mHead = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.52, 0.54), mSkin);
  mHead.castShadow = true;
  const mHairBack = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.24, 0.1), mHairMat);
  mHairBack.position.set(0, 0.06, -0.24);
  mHeadGroup.add(mHead, mHairBack);

  const mWhite = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const mBlack = new THREE.MeshBasicMaterial({ color: 0x5c3416 });
  [-0.12, 0.12].forEach((ex) => {
    const sc = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.09, 0.014), mWhite);
    sc.position.set(ex, 0.04, 0.278);
    const pu = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.072, 0.014), mBlack);
    pu.position.set(ex, 0.04, 0.288);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.024, 0.016), mHairMat);
    br.position.set(ex, 0.12, 0.282);
    mHeadGroup.add(sc, pu, br);
  });
  const mSmile = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.055, 0.016), new THREE.MeshBasicMaterial({ color: 0x991b1b }));
  mSmile.position.set(0, -0.12, 0.278);
  mHeadGroup.add(mSmile);

  const potGroup = new THREE.Group();
  potGroup.position.set(0, 0.34, 0);
  potGroup.rotation.z = -0.18;
  const potBody = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.42, 0.44, 16), potMat);
  potBody.castShadow = true;
  const potRim = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.06, 16), potMat);
  potRim.position.y = -0.21;
  const potHandle = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.08, 0.1), handleMat);
  potHandle.position.set(0.54, 0.06, 0);
  potHandle.rotation.z = 0.25;
  potGroup.add(potBody, potRim, potHandle);
  mHeadGroup.add(potGroup);
  mBodyGroup.add(mHeadGroup);

  // Braços pivotados nos ombros (com manga amarela + antebraço + mão)
  const makeMaluArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * 0.44, 1.42, 0);
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.2), mShirt);
    sleeve.position.y = -0.12;
    sleeve.castShadow = true;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), mSkin);
    arm.position.y = -0.44;
    arm.castShadow = true;
    ag.add(sleeve, arm);
    mBodyGroup.add(ag);
    return ag;
  };
  const mLArm = makeMaluArm(-1);
  const mRArm = makeMaluArm(1);

  // Pernas pivotadas nos quadris (bermuda + canela + tênis vermelho COM solado acoplado à perna!)
  const makeMaluLeg = (sx) => {
    const lg = new THREE.Group();
    lg.position.set(sx * 0.17, 0.64, 0);
    const shortLeg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.22), mShorts);
    shortLeg.position.y = -0.14;
    shortLeg.castShadow = true;
    const calf = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.16), mSkin);
    calf.position.y = -0.4;
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.11, 0.32), mShoe);
    shoe.position.set(0, -0.56, 0.05);
    shoe.castShadow = true;
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.035, 0.34), mSole);
    sole.position.set(0, -0.625, 0.05);
    lg.add(shortLeg, calf, shoe, sole);
    mBodyGroup.add(lg);
    return lg;
  };
  const mLLeg = makeMaluLeg(-1);
  const mRLeg = makeMaluLeg(1);

  malu.visible = false;
  terminalGroup.add(malu);
  maluquinhoEntity = {
    mesh: malu,
    bodyGroup: mBodyGroup,
    headGroup: mHeadGroup,
    potGroup,
    lArm: mLArm,
    rArm: mRArm,
    lLeg: mLLeg,
    rLeg: mRLeg,
    vel: new THREE.Vector3(),
    angVel: new THREE.Vector3(),
    ragdoll: false,
    ragdollTimer: 0,
  };

  // Onça Domada estacionada na praça ampla do Terminal (y = 0.26 sobre o piso)
  if (tamedJaguarEntity && tamedJaguarEntity.mesh) {
    termJaguarMesh = tamedJaguarEntity.mesh.clone();
    const tjLegs = [];
    let tjTail = null;
    termJaguarMesh.traverse((ch) => {
      if (ch.userData && ch.userData.isJagLeg) tjLegs.push(ch);
      if (ch.userData && ch.userData.isJagTail) tjTail = ch;
    });
    termJaguarMesh.userData = { legs: tjLegs, tail: tjTail };
    termJaguarMesh.position.set(1.5, 0.26, -10.0);
    termJaguarMesh.rotation.y = Math.PI * 0.35;
    termJaguarMesh.visible = false;
    terminalGroup.add(termJaguarMesh);
  }
}
buildTerminalAndStation();

// 3D NPC Character Builder for ETEC de Campo Limpo Paulista
function createNpcModel({
  id = "",
  name,
  roleSub = "Tecla E: Falar",
  skinColor,
  shirtColor,
  pantsColor,
  shoeColor,
  hairStyle, // "messy" | "sparse" | "long" | "short" | "bald" | "middle_aged" | "wavy_medium" | "curly_long"
  hairColor = 0x1e1b18,
  trenchCoat = false,
  hoodie = false,
  etecShirt = false,
  teacherShirt = false,
  redGlasses = false,
  squareGlasses = false,
  metalRectGlasses = false,
  etecBadge = false,
  slimBody = false,
  bigHead = false,
}) {
  const npc = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.62 });
  const skinShadeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(skinColor).multiplyScalar(0.86),
    roughness: 0.68,
  });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.72 });
  const shirtAccentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(shirtColor).multiplyScalar(0.75),
    roughness: 0.78,
  });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.45, metalness: 0.12 });
  const soleMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.75 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.82 });
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65 });
  const buckleMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.7, roughness: 0.25 });

  // ===================== TORSO, GOLA, CINTO & DETALHES DE ROUPA =====================
  const torsoW = slimBody ? 0.56 : 0.86;
  const torsoD = slimBody ? 0.34 : 0.46;
  const torso = new THREE.Mesh(new THREE.BoxGeometry(torsoW, 1.04, torsoD), shirtMat);
  torso.position.y = 1.42;
  torso.castShadow = true;
  torso.receiveShadow = true;
  npc.add(torso);

  // Gola da camiseta / blusa + barra inferior
  const collar = new THREE.Mesh(new THREE.BoxGeometry(torsoW * 0.56, 0.1, torsoD + 0.03), shirtAccentMat);
  collar.position.set(0, 1.91, 0);
  const hem = new THREE.Mesh(new THREE.BoxGeometry(torsoW + 0.02, 0.08, torsoD + 0.02), shirtAccentMat);
  hem.position.set(0, 0.93, 0);
  npc.add(collar, hem);

  // Cinto + fivela metálica (exceto se estiver de sobretudo fechado ou moletom solto)
  if (!trenchCoat && !hoodie) {
    const belt = new THREE.Mesh(new THREE.BoxGeometry(torsoW + 0.03, 0.09, torsoD + 0.03), beltMat);
    belt.position.set(0, 0.89, 0);
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.04), buckleMat);
    buckle.position.set(0, 0.89, torsoD * 0.5 + 0.02);
    npc.add(belt, buckle);
  }

  // Pescoço conectando torso à cabeça
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(slimBody ? 0.11 : 0.14, slimBody ? 0.12 : 0.16, 0.22, 10),
    skinShadeMat
  );
  neck.position.set(0, 2.02, 0);
  npc.add(neck);

  if (trenchCoat) {
    // Sobretudo detalhado do Kaio Wendell (lapelas, camisa interna, abas e botões)
    const innerShirt = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.98, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 })
    );
    innerShirt.position.set(0, 1.43, torsoD * 0.5 + 0.01);
    const coatBack = new THREE.Mesh(new THREE.BoxGeometry(torsoW + 0.08, 0.7, torsoD + 0.06), shirtMat);
    coatBack.position.set(0, 0.72, -0.02);
    coatBack.castShadow = true;
    const lapelL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.06), shirtAccentMat);
    lapelL.position.set(-0.22, 1.62, torsoD * 0.5 + 0.02);
    lapelL.rotation.z = 0.16;
    const lapelR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.06), shirtAccentMat);
    lapelR.position.set(0.22, 1.62, torsoD * 0.5 + 0.02);
    lapelR.rotation.z = -0.16;
    const coatCollar = new THREE.Mesh(new THREE.BoxGeometry(torsoW * 0.72, 0.16, torsoD + 0.08), shirtAccentMat);
    coatCollar.position.set(0, 1.94, -0.02);
    npc.add(innerShirt, coatBack, lapelL, lapelR, coatCollar);
  }

  // Moletom cinza do Muzzonline (capuz nas costas + bolso canguru frontal + barra canelada — sem listras no peito!)
  if (hoodie) {
    const hoodBack = new THREE.Mesh(new THREE.BoxGeometry(torsoW * 0.68, 0.34, 0.24), shirtAccentMat);
    hoodBack.position.set(0, 1.84, -torsoD * 0.5 - 0.08);
    hoodBack.rotation.x = 0.24;
    const hoodNeck = new THREE.Mesh(new THREE.BoxGeometry(torsoW * 0.64, 0.14, torsoD + 0.07), shirtAccentMat);
    hoodNeck.position.set(0, 1.92, -0.02);
    const kangaroo = new THREE.Mesh(new THREE.BoxGeometry(torsoW * 0.62, 0.28, 0.06), shirtAccentMat);
    kangaroo.position.set(0, 1.14, torsoD * 0.5 + 0.025);
    npc.add(hoodBack, hoodNeck, kangaroo);
  }

  // Camisa da ETEC vermelho e preto (Pão) — limpa, sem listras estranhas!
  if (etecShirt) {
    const etecRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.68 });
    const etecWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    // Painel superior vermelho nos ombros/peito + faixa horizontal fina branca + brasão ETEC
    const redUpper = new THREE.Mesh(new THREE.BoxGeometry(torsoW + 0.02, 0.44, torsoD + 0.02), etecRedMat);
    redUpper.position.set(0, 1.72, 0);
    const whiteTrim = new THREE.Mesh(new THREE.BoxGeometry(torsoW + 0.025, 0.045, torsoD + 0.025), etecWhiteMat);
    whiteTrim.position.set(0, 1.49, 0);
    const badgeBg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.025), etecWhiteMat);
    badgeBg.position.set(0.2, 1.72, torsoD * 0.5 + 0.02);
    const badgeInner = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.03), etecRedMat);
    badgeInner.position.set(0.14, 1.72, torsoD * 0.5 + 0.024);
    npc.add(redUpper, whiteTrim, badgeBg, badgeInner);
  } else if (etecBadge) {
    const badgeBg = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.14, 0.03),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
    );
    badgeBg.position.set(-0.18, 1.64, torsoD * 0.5 + 0.02);
    const badgeDot = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.08, 0.035),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 })
    );
    badgeDot.position.set(-0.26, 1.64, torsoD * 0.5 + 0.025);
    npc.add(badgeBg, badgeDot);
  }

  // Professor normal de meia idade (Marcelo: camisa cinza social/polo com bolsinho e caneta, sem colete tático!)
  if (teacherShirt) {
    const collarL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), shirtAccentMat);
    collarL.position.set(-0.11, 1.9, torsoD * 0.5 + 0.02);
    collarL.rotation.z = -0.22;
    const collarR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.09, 0.05), shirtAccentMat);
    collarR.position.set(0.11, 1.9, torsoD * 0.5 + 0.02);
    collarR.rotation.z = 0.22;
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.03), shirtAccentMat);
    pocket.position.set(0.22, 1.56, torsoD * 0.5 + 0.015);
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.14, 6),
      new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })
    );
    pen.position.set(0.25, 1.65, torsoD * 0.5 + 0.028);
    npc.add(collarL, collarR, pocket, pen);
  }

  // ===================== CABEÇA EXPRESSIVA (MANTENDO O PADRÃO CABEÇUDO DA B****** E T*******!) =====================
  const headScale = bigHead ? 1.62 : 1.0;
  const headGroup = new THREE.Group();
  headGroup.position.set(0, bigHead ? 2.54 : 2.38, 0);
  headGroup.scale.setScalar(headScale);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.66, 0.62), skinMat);
  head.castShadow = true;
  head.receiveShadow = true;
  headGroup.add(head);

  // Orelhas laterais
  [-0.33, 0.33].forEach((ex) => {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.16, 0.1), skinShadeMat);
    ear.position.set(ex, 0.0, -0.02);
    headGroup.add(ear);
  });

  // Olhos detalhados (esclera branca + pupila escura + brilho) + sobrancelhas
  const whiteEyeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x5c3416 });
  const shineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const browMat = new THREE.MeshStandardMaterial({
    color: hairStyle === "bald" ? 0x292524 : hairColor,
    roughness: 0.85,
  });

  [-0.14, 0.14].forEach((ex) => {
    const sclera = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.1, 0.03), whiteEyeMat);
    sclera.position.set(ex, 0.04, 0.312);
    const pupil = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.08, 0.035), pupilMat);
    pupil.position.set(ex, 0.04, 0.318);
    const sparkle = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.024, 0.04), shineMat);
    sparkle.position.set(ex + 0.018, 0.062, 0.322);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.032, 0.035), browMat);
    brow.position.set(ex, 0.135, 0.318);
    headGroup.add(sclera, pupil, sparkle, brow);

    if (bigHead || hairStyle === "wavy_medium" || hairStyle === "curly_long") {
      const lash = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.022, 0.038), pupilMat);
      lash.position.set(ex, 0.092, 0.32);
      const blush = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.045, 0.018),
        new THREE.MeshBasicMaterial({ color: 0xfb7185, transparent: true, opacity: 0.32 })
      );
      blush.position.set(ex * 1.28, -0.055, 0.312);
      headGroup.add(lash, blush);
    }
  });

  // Nariz sutil + boca
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.06), skinShadeMat);
  nose.position.set(0, -0.03, 0.325);
  const mouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.03, 0.025),
    new THREE.MeshStandardMaterial({
      color: bigHead ? 0xbe123c : 0x7c2d12,
      roughness: 0.6,
    })
  );
  mouth.position.set(0, -0.16, 0.314);
  headGroup.add(nose, mouth);

  // Helper de óculos com armação vazada e lentes translúcidas (suporta retangular metálico fino!)
  const addGlasses = (frameHex, opts = {}) => {
    const isRectMetal = !!opts.rectangularMetal;
    const frameMat = new THREE.MeshStandardMaterial({
      color: frameHex,
      metalness: isRectMetal ? 0.85 : 0.35,
      roughness: isRectMetal ? 0.2 : 0.28,
    });
    const lensMat = new THREE.MeshStandardMaterial({
      color: isRectMetal ? 0xf1f5f9 : 0xe2e8f0,
      transparent: true,
      opacity: isRectMetal ? 0.28 : 0.34,
      metalness: 0.22,
      roughness: 0.12,
    });
    const rimT = isRectMetal ? 0.02 : 0.03;
    const boxW = isRectMetal ? 0.24 : 0.22;
    const boxH = isRectMetal ? 0.13 : 0.19;
    const halfW = boxW * 0.5 - rimT * 0.5;
    const topY = 0.045 + boxH * 0.5 - rimT * 0.5;
    const botY = 0.045 - boxH * 0.5 + rimT * 0.5;
    [-0.155, 0.155].forEach((gx) => {
      const topB = new THREE.Mesh(new THREE.BoxGeometry(boxW, rimT, 0.036), frameMat);
      topB.position.set(gx, topY, 0.34);
      const botB = new THREE.Mesh(new THREE.BoxGeometry(boxW, rimT, 0.036), frameMat);
      botB.position.set(gx, botY, 0.34);
      const leftB = new THREE.Mesh(new THREE.BoxGeometry(rimT, boxH, 0.036), frameMat);
      leftB.position.set(gx - halfW, 0.045, 0.34);
      const rightB = new THREE.Mesh(new THREE.BoxGeometry(rimT, boxH, 0.036), frameMat);
      rightB.position.set(gx + halfW, 0.045, 0.34);
      const lens = new THREE.Mesh(new THREE.BoxGeometry(boxW - rimT * 2, boxH - rimT * 2, 0.012), lensMat);
      lens.position.set(gx, 0.045, 0.336);
      headGroup.add(topB, botB, leftB, rightB, lens);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.085, rimT, 0.036), frameMat);
    bridge.position.set(0, 0.068, 0.34);
    const tL = new THREE.Mesh(new THREE.BoxGeometry(rimT, rimT, 0.36), frameMat);
    tL.position.set(-0.325, 0.068, 0.17);
    const tR = new THREE.Mesh(new THREE.BoxGeometry(rimT, rimT, 0.36), frameMat);
    tR.position.set(0.325, 0.068, 0.17);
    headGroup.add(bridge, tL, tR);
  };

  if (redGlasses) addGlasses(0xef4444);
  if (squareGlasses) addGlasses(0x09090b);
  if (metalRectGlasses) addGlasses(0x9ca3af, { rectangularMetal: true });

  // ===================== CABELOS APRIMORADOS =====================
  if (hairStyle === "messy") {
    const baseHair = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.68), hairMat);
    baseHair.position.set(0, 0.33, -0.02);
    const backHair = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.14), hairMat);
    backHair.position.set(0, 0.12, -0.29);
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.11, 0.12), hairMat);
    bangs.position.set(-0.04, 0.25, 0.29);
    headGroup.add(baseHair, backHair, bangs);
    [
      [-0.22, 0.48, 0.14, 0.35],
      [0.18, 0.5, -0.08, -0.38],
      [0.02, 0.52, 0.09, 0.18],
      [-0.1, 0.46, -0.2, -0.28],
      [0.25, 0.42, 0.1, 0.42],
    ].forEach(([hx, hy, hz, rot]) => {
      const tuft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.2), hairMat);
      tuft.position.set(hx, hy, hz);
      tuft.rotation.z = rot;
      headGroup.add(tuft);
    });
  } else if (hairStyle === "sparse") {
    const topHair = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.19, 0.66), hairMat);
    topHair.position.set(0, 0.35, -0.02);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.58), hairMat);
    sideL.position.set(-0.33, 0.15, -0.04);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.58), hairMat);
    sideR.position.set(0.33, 0.15, -0.04);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.36, 0.14), hairMat);
    back.position.set(0, 0.13, -0.29);
    const frontStrand = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.09, 0.14), hairMat);
    frontStrand.position.set(-0.05, 0.32, 0.27);
    const wisp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.12), hairMat);
    wisp.position.set(0.15, 0.46, 0.06);
    wisp.rotation.z = -0.28;
    headGroup.add(topHair, sideL, sideR, back, frontStrand, wisp);
  } else if (hairStyle === "middle_aged") {
    // Visual clássico de professor de meia idade: topo calvo com cabelo curto grisalho nas laterais e atrás
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 })
    );
    shine.scale.set(1.15, 0.22, 1.15);
    shine.position.set(0.1, 0.335, 0.08);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.42), hairMat);
    sideL.position.set(-0.32, 0.12, -0.08);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.42), hairMat);
    sideR.position.set(0.32, 0.12, -0.08);
    const backFringe = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.24, 0.1), hairMat);
    backFringe.position.set(0, 0.1, -0.29);
    headGroup.add(shine, sideL, sideR, backFringe);
  } else if (hairStyle === "bald") {
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
    );
    shine.scale.set(1.2, 0.25, 1.2);
    shine.position.set(0.12, 0.34, 0.11);
    headGroup.add(shine);
  } else if (hairStyle === "wavy_medium") {
    // Cabelo marrom escuro ondulado médio com franja lateral suave (B******)
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.7), hairMat);
    top.position.set(0, 0.34, -0.02);
    const sideBangL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.11, 0.12), hairMat);
    sideBangL.position.set(-0.2, 0.25, 0.29);
    sideBangL.rotation.z = 0.22;
    const sideBangR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.11, 0.12), hairMat);
    sideBangR.position.set(0.18, 0.24, 0.29);
    sideBangR.rotation.z = -0.26;
    const backMid = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.74, 0.2), hairMat);
    backMid.position.set(0, -0.04, -0.3);
    headGroup.add(top, sideBangL, sideBangR, backMid);
    [-0.35, 0.35].forEach((sx, si) => {
      for (let w = 0; w < 4; w++) {
        const wave = new THREE.Mesh(new THREE.SphereGeometry(0.135, 10, 10), hairMat);
        wave.scale.set(0.72, 1.15, 1.12);
        wave.position.set(
          sx + (w % 2 === 0 ? 0.028 : -0.028) * (si === 0 ? -1 : 1),
          0.18 - w * 0.19,
          -0.02
        );
        headGroup.add(wave);
      }
    });
  } else if (hairStyle === "curly_long") {
    // Cabelo encaracolado longo volumoso bem modelado (T*******)
    const top = new THREE.Mesh(new THREE.SphereGeometry(0.41, 12, 10), hairMat);
    top.scale.set(1.06, 0.56, 1.04);
    top.position.set(0, 0.35, -0.03);
    headGroup.add(top);
    [-0.22, -0.07, 0.08, 0.22].forEach((fx, fi) => {
      const fCurl = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), hairMat);
      fCurl.position.set(fx, 0.27 + (fi % 2) * 0.03, 0.27);
      headGroup.add(fCurl);
    });
    for (let row = 0; row < 5; row++) {
      const y = 0.22 - row * 0.19;
      [-0.37, 0.37].forEach((sx) => {
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.145, 9, 9), hairMat);
        curl.position.set(sx + (row % 2 === 0 ? 0.038 : -0.038), y, -0.03);
        headGroup.add(curl);
      });
      [-0.23, 0, 0.23].forEach((bx) => {
        const backCurl = new THREE.Mesh(new THREE.SphereGeometry(0.155, 9, 9), hairMat);
        backCurl.position.set(bx, y, -0.32 - (row % 2) * 0.03);
        headGroup.add(backCurl);
      });
    }
  } else if (hairStyle === "curly_big") {
    // Cabelo grande e encaracolado volumoso na cabeça (Félix) — sem cair longo abaixo da cabeça!
    const crownBase = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), hairMat);
    crownBase.scale.set(1.12, 0.66, 1.08);
    crownBase.position.set(0, 0.38, -0.02);
    headGroup.add(crownBase);

    // Cachos volumosos no topo e franja cacheada
    const topCurls = [
      [-0.26, 0.44, 0.18, 0.14],
      [-0.09, 0.5, 0.22, 0.15],
      [0.09, 0.51, 0.2, 0.15],
      [0.26, 0.44, 0.17, 0.14],
      [-0.3, 0.45, -0.04, 0.15],
      [-0.12, 0.54, -0.04, 0.16],
      [0.12, 0.54, -0.05, 0.16],
      [0.3, 0.45, -0.04, 0.15],
      [-0.24, 0.42, -0.24, 0.15],
      [0, 0.48, -0.26, 0.16],
      [0.24, 0.42, -0.24, 0.15],
      // Cachos na testa (franja curta cacheada)
      [-0.2, 0.3, 0.29, 0.105],
      [-0.06, 0.32, 0.31, 0.11],
      [0.08, 0.31, 0.31, 0.11],
      [0.21, 0.29, 0.28, 0.105],
    ];
    topCurls.forEach(([cx, cy, cz, r]) => {
      const curl = new THREE.Mesh(new THREE.SphereGeometry(r, 9, 8), hairMat);
      curl.position.set(cx, cy, cz);
      headGroup.add(curl);
    });

    // Cachos cheios nas laterais e atrás, parando na altura da orelha/nuca (não passa da cabeça!)
    [-0.36, 0.36].forEach((sx) => {
      [0.24, 0.1].forEach((sy, idx) => {
        const sCurl1 = new THREE.Mesh(new THREE.SphereGeometry(0.135, 8, 8), hairMat);
        sCurl1.position.set(sx, sy, 0.08 - idx * 0.04);
        const sCurl2 = new THREE.Mesh(new THREE.SphereGeometry(0.135, 8, 8), hairMat);
        sCurl2.position.set(sx, sy, -0.14 - idx * 0.03);
        headGroup.add(sCurl1, sCurl2);
      });
    });
    [-0.22, 0, 0.22].forEach((bx) => {
      [0.24, 0.08].forEach((by) => {
        const bCurl = new THREE.Mesh(new THREE.SphereGeometry(0.145, 8, 8), hairMat);
        bCurl.position.set(bx, by, -0.32);
        headGroup.add(bCurl);
      });
    });
  } else if (hairStyle === "long") {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.7), hairMat);
    top.position.set(0, 0.34, -0.02);
    const fringe = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.1, 0.1), hairMat);
    fringe.position.set(0.06, 0.25, 0.29);
    fringe.rotation.z = -0.14;
    const backLong = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.02, 0.18), hairMat);
    backLong.position.set(0, -0.16, -0.3);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.84, 0.3), hairMat);
    sideL.position.set(-0.34, -0.13, -0.07);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.84, 0.3), hairMat);
    sideR.position.set(0.34, -0.13, -0.07);
    headGroup.add(top, fringe, backLong, sideL, sideR);
  } else {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.2, 0.66), hairMat);
    top.position.set(0, 0.33, -0.02);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.34, 0.14), hairMat);
    back.position.set(0, 0.12, -0.28);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.44), hairMat);
    sideL.position.set(-0.32, 0.18, -0.05);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.44), hairMat);
    sideR.position.set(0.32, 0.18, -0.05);
    headGroup.add(top, back, sideL, sideR);
  }

  npc.add(headGroup);

  // ===================== BRAÇOS COM MANGAS, ANTEBRAÇOS & MÃOS =====================
  const armW = slimBody ? 0.14 : 0.22;
  const armX = slimBody ? 0.37 : 0.56;
  const makeNpcArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * armX, 1.86, 0);
    ag.rotation.z = sx * -0.06;
    const isLongSleeve = trenchCoat || hoodie;
    const sleeveH = isLongSleeve ? 0.68 : 0.34;
    const sleeveMat = etecShirt ? new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.68 }) : shirtMat;
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(armW + 0.03, sleeveH, armW + 0.03), sleeveMat);
    sleeve.position.y = -sleeveH * 0.5;
    sleeve.castShadow = true;
    ag.add(sleeve);

    if (hoodie) {
      const cuff = new THREE.Mesh(new THREE.BoxGeometry(armW + 0.02, 0.07, armW + 0.02), shirtAccentMat);
      cuff.position.y = -sleeveH;
      ag.add(cuff);
    }

    if (!isLongSleeve) {
      const forearm = new THREE.Mesh(new THREE.BoxGeometry(armW, 0.36, armW), skinMat);
      forearm.position.y = -sleeveH - 0.18;
      forearm.castShadow = true;
      ag.add(forearm);
    }
    const hand = new THREE.Mesh(new THREE.BoxGeometry(armW * 0.92, 0.14, armW * 0.95), skinMat);
    hand.position.y = -0.76;
    ag.add(hand);
    return ag;
  };
  const lArm = makeNpcArm(-1);
  const rArm = makeNpcArm(1);
  npc.add(lArm, rArm);

  // Props característicos nas mãos dos NPCs da escola
  if (id === "kaio") {
    rArm.rotation.x = -0.45;
    const vial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.055, 0.075, 0.22, 8),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, emissive: 0x16a34a, emissiveIntensity: 0.45, roughness: 0.2 })
    );
    vial.position.set(0, -0.82, 0.12);
    rArm.add(vial);
  } else if (id === "b_lab24" || id === "t_lab24") {
    rArm.rotation.x = -0.35;
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.3, 0.05),
      new THREE.MeshStandardMaterial({ color: id === "b_lab24" ? 0x6366f1 : 0xf43f5e, roughness: 0.6 })
    );
    book.position.set(0, -0.78, 0.12);
    rArm.add(book);
  }

  // ===================== PERNAS & TÊNIS COM SOLADO =====================
  const legW = slimBody ? 0.18 : 0.28;
  const legX = slimBody ? 0.14 : 0.21;
  [-1, 1].forEach((sx) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(legW, 0.72, legW), pantsMat);
    leg.position.set(sx * legX, 0.5, 0);
    leg.castShadow = true;
    const cuff = new THREE.Mesh(
      new THREE.BoxGeometry(legW + 0.02, 0.06, legW + 0.02),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(pantsColor).multiplyScalar(0.8), roughness: 0.85 })
    );
    cuff.position.set(sx * legX, 0.17, 0);
    const shoeUpper = new THREE.Mesh(new THREE.BoxGeometry(legW + 0.04, 0.12, 0.36), shoeMat);
    shoeUpper.position.set(sx * legX, 0.1, 0.05);
    shoeUpper.castShadow = true;
    const shoeSole = new THREE.Mesh(new THREE.BoxGeometry(legW + 0.06, 0.05, 0.38), soleMat);
    shoeSole.position.set(sx * legX, 0.025, 0.05);
    npc.add(leg, cuff, shoeUpper, shoeSole);
  });

  npc.userData = { headGroup, lArm, rArm };
  return npc;
}
