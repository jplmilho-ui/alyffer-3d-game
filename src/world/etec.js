// 4. CAMPUS COMPLETO DA ETECAMP (Fiel à foto aérea: muros, entrada principal, estacionamento com portão automático, quadra aberta, fundos, entrada aberta do corredor e sala de automação!)
function buildEtecCampus() {
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0xb8bec6, roughness: 0.9 });
  const yardMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 });
  const asphaltMat = new THREE.MeshStandardMaterial({ map: createAsphaltTexture(12, 2), roughness: 0.92, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const parkingFloorMat = new THREE.MeshStandardMaterial({ map: createAsphaltTexture(4, 6), color: 0x94a3b8, roughness: 0.88, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const grassMat = new THREE.MeshStandardMaterial({ map: createGrassTexture("#4b8b3b", "#3d7a30", 24, 24), roughness: 0.95 });
  const buildingMat = new THREE.MeshStandardMaterial({ map: createStuccoWallTexture("#f1f5f9", "#cbd5e1", 5, 2), roughness: 0.8 });
  const roofCorrugMat = new THREE.MeshStandardMaterial({ map: createCorrugatedMetalTexture("#9ca3af", 6, 4), roughness: 0.72, metalness: 0.28 });
  const cpsRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.54 });
  const salmonWallMat = new THREE.MeshStandardMaterial({ map: createStuccoWallTexture("#d98a76", "#bd6f5b", 6, 2), roughness: 0.84 });
  const grayWallMat = new THREE.MeshStandardMaterial({ color: 0x8f969e, roughness: 0.88 });
  const wallCapMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
  const blueGateMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.3, roughness: 0.5 });
  const pillarBlueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.65 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.4 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.45, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.4, roughness: 0.2 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.78 });

  // Terreno amplo do vale de Botujuru (280m x 280m)
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(280, 280), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  etecGroup.add(ground);

  // Pátio cimentado interno dentro de todos os muros (x = -33.6..33.6, z = -28.6..19.6)
  const campusFloor = new THREE.Mesh(new THREE.BoxGeometry(67.2, 0.12, 48.2), concreteMat);
  campusFloor.position.set(0, 0.06, -4.5);
  campusFloor.receiveShadow = true;
  etecGroup.add(campusFloor);

  // Calçada externa estendida + Rua João Julião Moreira (220m) + faixa de pedestres na frente do portão!
  const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(200, 0.14, 3.2), yardMat);
  sidewalk.position.set(0, 0.07, 21.6);
  sidewalk.receiveShadow = true;
  etecGroup.add(sidewalk);

  const street = new THREE.Mesh(new THREE.PlaneGeometry(230, 6.8), asphaltMat);
  street.rotation.x = -Math.PI / 2;
  street.position.set(0, 0.04, 26.5);
  street.receiveShadow = true;
  etecGroup.add(street);

  const streetDashMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const crosswalkMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.7,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  for (let dx = -108; dx <= 108; dx += 5.0) {
    if (Math.abs(dx) < 3.6) continue;
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.18), streetDashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(dx, 0.06, 26.5);
    etecGroup.add(dash);
  }
  for (let cx = -2.8; cx <= 2.8; cx += 0.8) {
    const cw = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 5.2), crosswalkMat);
    cw.rotation.x = -Math.PI / 2;
    cw.position.set(cx, 0.06, 26.5);
    etecGroup.add(cw);
  }

  // ===================== MUROS CERCANDO TODA A ETECAMP =====================
  function addCampusWall(cx, cz, w, d, h = 2.9, mat = grayWallMat, collide = true) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    wall.position.set(cx, h * 0.5, cz);
    wall.castShadow = true;
    wall.receiveShadow = true;
    etecGroup.add(wall);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.14, d + 0.08), wallCapMat);
    cap.position.set(cx, h + 0.07, cz);
    etecGroup.add(cap);
    if (collide) addObstacleBox(cx, cz, w + 0.1, d + 0.1, etecObstacles);
  }

  // Muro dos fundos (Norte), Oeste e Leste
  addCampusWall(0, -29.0, 68.4, 0.6, 3.0, grayWallMat, true);
  addCampusWall(-34.0, -4.5, 0.6, 49.4, 3.0, grayWallMat, true);
  addCampusWall(34.0, -4.5, 0.6, 49.4, 3.0, grayWallMat, true);

  // Muro Frontal da Rua (Salmão/Terracota igual à foto!) em z = +20.0
  // Seg 1: x = -34..-28 | Portão Automático: x = -28..-20 | Seg 2: x = -20..-4 | Portão Principal: x = -4..+4 | Seg 3: x = +4..+18 | Portão Azul: x = +18..+26 | Seg 4: x = +26..+34
  addCampusWall(-31.0, 20.0, 6.0, 0.6, 2.8, salmonWallMat, true);
  addCampusWall(-12.0, 20.0, 16.0, 0.6, 2.8, salmonWallMat, true);
  addCampusWall(11.0, 20.0, 14.0, 0.6, 2.8, salmonWallMat, true);
  addCampusWall(30.0, 20.0, 8.0, 0.6, 2.8, salmonWallMat, true);

  // Portão Azul da Quadra encaixado no muro frontal (idêntico à foto!)
  const blueCourtGate = new THREE.Mesh(new THREE.BoxGeometry(8.0, 2.65, 0.28), blueGateMat);
  blueCourtGate.position.set(22.0, 1.325, 20.0);
  blueCourtGate.castShadow = true;
  etecGroup.add(blueCourtGate);
  addObstacleBox(22.0, 20.0, 8.0, 0.65, etecObstacles);

  // Portão Principal — ENTRADA PRINCIPAL (FRENTE) (x = -4..+4, z = 20.0 — aberto!)
  [-4.1, 4.1].forEach((px) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.75, 3.8, 0.75), buildingMat);
    col.position.set(px, 1.9, 20.0);
    col.castShadow = true;
    etecGroup.add(col);
  });
  const mainGateArch = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.75, 0.8), cpsRedMat);
  mainGateArch.position.set(0, 3.85, 20.0);
  etecGroup.add(mainGateArch);
  const mainGateSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.85, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ETECAMP", "ETEC de Campo Limpo Paulista", "#991b1b", "#fef08a"),
    })
  );
  mainGateSign.position.set(0, 4.55, 20.38);
  etecGroup.add(mainGateSign);

  // Floreiras ajardinadas flanqueando a Entrada Principal + postes de iluminação na rua!
  [-6.2, 6.2].forEach((fx) => {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.52, 0.85), buildingMat);
    planter.position.set(fx, 0.32, 20.85);
    const bush = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.42, 0.62), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 }));
    bush.position.set(fx, 0.72, 20.85);
    etecGroup.add(planter, bush);
  });
  [-28, -10, 10, 28].forEach((lx) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 6.2, 8), steelMat);
    pole.position.set(lx, 3.1, 22.8);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.6), steelMat);
    arm.position.set(lx, 6.1, 23.5);
    const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.62), new THREE.MeshBasicMaterial({ color: 0xfef9c3 }));
    bulb.position.set(lx, 6.02, 24.1);
    etecGroup.add(pole, arm, bulb);
  });

  // Caixa d'água cilíndrica branca icônica Reformulada (anéis de reforço, faixa CPS, escada lateral e cúpula!)
  const wtGroup = new THREE.Group();
  wtGroup.position.set(6.0, 0, 17.8);
  const wtBase = new THREE.Mesh(new THREE.CylinderGeometry(1.52, 1.62, 0.42, 20), steelMat);
  wtBase.position.y = 0.21;
  const waterTower = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.38, 9.5, 22), whiteMat);
  waterTower.position.y = 4.95;
  waterTower.castShadow = true;
  const wtBand = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.36, 0.62, 22), cpsRedMat);
  wtBand.position.y = 7.8;
  wtGroup.add(wtBase, waterTower, wtBand);
  [2.4, 5.0, 7.2, 9.4].forEach((ry) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.37, 0.04, 6, 22), steelMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = ry;
    wtGroup.add(ring);
  });
  // Escada vertical de manutenção na lateral oeste da caixa d'água
  [-0.18, 0.18].forEach((rz) => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 9.3, 6), darkMetalMat);
    rail.position.set(-1.46, 4.85, rz);
    wtGroup.add(rail);
  });
  for (let ly = 0.8; ly <= 9.2; ly += 0.55) {
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.38), darkMetalMat);
    rung.position.set(-1.46, ly, 0);
    wtGroup.add(rung);
  }
  const towerCap = new THREE.Mesh(new THREE.CylinderGeometry(1.44, 1.44, 0.26, 22), steelMat);
  towerCap.position.y = 9.78;
  const towerDome = new THREE.Mesh(new THREE.ConeGeometry(1.36, 0.55, 22), steelMat);
  towerDome.position.y = 10.18;
  wtGroup.add(towerCap, towerDome);
  etecGroup.add(wtGroup);
  addObstacleBox(6.0, 17.8, 3.0, 3.0, etecObstacles);

  // Portão Automático do Estacionamento (x = -28..-20, z = 20.0 — abre sozinho ao chegar perto!)
  const autoGateGroup = new THREE.Group();
  autoGateGroup.position.set(-24.0, 0, 20.0);
  const gatePanel = new THREE.Mesh(new THREE.BoxGeometry(7.9, 2.55, 0.22), steelMat);
  gatePanel.position.y = 1.32;
  gatePanel.castShadow = true;
  autoGateGroup.add(gatePanel);
  for (let gx = -3.4; gx <= 3.4; gx += 0.85) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.45, 0.28), darkMetalMat);
    bar.position.set(gx, 1.32, 0);
    autoGateGroup.add(bar);
  }
  const warnStripe = new THREE.Mesh(new THREE.BoxGeometry(7.92, 0.28, 0.26), yellowMat);
  warnStripe.position.y = 0.45;
  autoGateGroup.add(warnStripe);
  etecGroup.add(autoGateGroup);
  etecAutoGateMesh = autoGateGroup;
  etecAutoGateOpen = 0;
  etecAutoGateCollider = { minX: -28.0, maxX: -20.0, minZ: 19.65, maxZ: 20.35 };
  etecObstacles.push(etecAutoGateCollider);

  // Motor + Farolete sensor + placa do Portão Automático
  const gateMotor = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.55), darkMetalMat);
  gateMotor.position.set(-28.4, 0.35, 19.3);
  etecGroup.add(gateMotor);
  etecAutoGateLightMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xef4444,
    emissiveIntensity: 0.7,
  });
  const gateBeacon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.26, 10), etecAutoGateLightMat);
  gateBeacon.position.set(-19.8, 3.05, 20.0);
  etecGroup.add(gateBeacon);

  // ===================== ESTACIONAMENTO (ESQUERDA — ABERTO E DENTRO DO MURO!) =====================
  const parkingLot = new THREE.Mesh(new THREE.PlaneGeometry(19.5, 29.0), parkingFloorMat);
  parkingLot.rotation.x = -Math.PI / 2;
  parkingLot.position.set(-23.2, 0.135, 2.5);
  parkingLot.receiveShadow = true;
  etecGroup.add(parkingLot);

  // Vagas pintadas no estacionamento
  for (let pz = -9.0; pz <= 11.0; pz += 4.0) {
    const stallLine = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 0.14), whiteMat);
    stallLine.rotation.x = -Math.PI / 2;
    stallLine.position.set(-30.0, 0.145, pz);
    etecGroup.add(stallLine);
  }

  // Helper de carro estacionado 3D (usado no estacionamento e na rua)
  function addParkedCar(cx, cz, yaw, colorHex, collide = true) {
    const car = new THREE.Group();
    car.position.set(cx, 0.12, cz);
    car.rotation.y = yaw;
    const bodyMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.42, roughness: 0.36 });
    const winGlass = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.15 });
    const headLightMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.8, roughness: 0.2 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.68, 4.15), bodyMat);
    body.position.y = 0.62;
    body.castShadow = true;
    const hood = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.16, 1.15), bodyMat);
    hood.position.set(0, 0.96, 1.38);
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.62, 2.08), winGlass);
    cabin.position.set(0, 1.24, -0.15);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.1, 1.92), bodyMat);
    roof.position.set(0, 1.56, -0.15);
    const bumperF = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.2, 0.2), darkMetalMat);
    bumperF.position.set(0, 0.38, 2.08);
    const bumperR = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.2, 0.2), darkMetalMat);
    bumperR.position.set(0, 0.38, -2.08);
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.06), darkMetalMat);
    grille.position.set(0, 0.64, 2.08);
    car.add(body, hood, cabin, roof, bumperF, bumperR, grille);

    [-0.68, 0.68].forEach((lx) => {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.06), headLightMat);
      hl.position.set(lx, 0.68, 2.08);
      const tl = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.06), tailLightMat);
      tl.position.set(lx, 0.72, -2.08);
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.11, 0.12), bodyMat);
      mirror.position.set(lx > 0 ? 1.0 : -1.0, 1.06, 0.52);
      car.add(hl, tl, mirror);
    });

    [[-0.95, 0.34, 1.26], [0.95, 0.34, 1.26], [-0.95, 0.34, -1.26], [0.95, 0.34, -1.26]].forEach(([wx, wy, wz]) => {
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 12), wheelMat);
      wh.rotation.z = Math.PI / 2;
      wh.position.set(wx, wy, wz);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.26, 10), hubMat);
      hub.rotation.z = Math.PI / 2;
      hub.position.set(wx, wy, wz);
      car.add(wh, hub);
    });
    etecGroup.add(car);
    if (collide) {
      const horiz = Math.abs(Math.sin(yaw)) > 0.7;
      addObstacleBox(cx, cz, horiz ? 4.3 : 2.1, horiz ? 2.1 : 4.3, etecObstacles);
    }
  }

  // Carros estacionados encostados no muro oeste (pista larga x = -27..-12 totalmente livre!)
  addParkedCar(-30.2, -7.0, Math.PI / 2, 0x991b1b, true);
  addParkedCar(-30.2, -3.0, Math.PI / 2, 0x1d4ed8, true);
  addParkedCar(-30.2, 5.0, Math.PI / 2, 0xe2e8f0, true);
  addParkedCar(-30.2, 9.0, Math.PI / 2, 0x1f2937, true);
  // Carros decorativos na rua externa
  addParkedCar(-18.0, 28.6, Math.PI / 2, 0xcbd5e1, false);
  addParkedCar(18.0, 28.6, -Math.PI / 2, 0x991b1b, false);
  addParkedCar(28.0, 28.6, -Math.PI / 2, 0x475569, false);

  // ===================== QUADRA POLIESPORTIVA (CHÃO DESGASTADO SEM COR + REDE COLADA NA PAREDE!) =====================
  const wornCourtMat = new THREE.MeshStandardMaterial({
    map: createWornConcreteTexture(),
    color: 0xd4d6d2,
    roughness: 0.96,
    metalness: 0.02,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const court = new THREE.Mesh(new THREE.PlaneGeometry(16.5, 19.5), wornCourtMat);
  court.rotation.x = -Math.PI / 2;
  court.position.set(23.2, 0.145, 6.2);
  court.receiveShadow = true;
  etecGroup.add(court);

  // Marcações bem desgastadas/apagadas no cimento cru
  const fadedLineMat = new THREE.MeshStandardMaterial({
    color: 0xe2e4e0,
    transparent: true,
    opacity: 0.36,
    roughness: 0.95,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  [
    [23.2, 15.6, 15.4, 0.16],
    [23.2, -3.2, 15.4, 0.16],
    [15.5, 6.2, 0.16, 18.8],
    [30.9, 6.2, 0.16, 18.8],
    [23.2, 6.2, 15.4, 0.16],
  ].forEach(([lx, lz, lw, ld]) => {
    const ln = new THREE.Mesh(new THREE.PlaneGeometry(lw, ld), fadedLineMat);
    ln.rotation.x = -Math.PI / 2;
    ln.position.set(lx, 0.155, lz);
    etecGroup.add(ln);
  });
  const centerRing = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.26, 28), fadedLineMat);
  centerRing.rotation.x = -Math.PI / 2;
  centerRing.position.set(23.2, 0.155, 6.2);
  etecGroup.add(centerRing);

  // Apenas o aro + rede de basquete colado direto na parede leste do prédio (x = 11.0, z = 1.6 — sem poste nem tabela!)
  const hoopGroup = new THREE.Group();
  hoopGroup.position.set(11.0, 0.12, 1.6);
  const rimOrangeMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.42 });
  const wallBracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.24), darkMetalMat);
  wallBracket.position.set(0.04, 3.12, 0);
  const hoopRim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 10, 20), rimOrangeMat);
  hoopRim.rotation.x = Math.PI / 2;
  hoopRim.position.set(0.38, 3.12, 0);
  const hoopNet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.30, 0.19, 0.46, 12, 2, true),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc, wireframe: true })
  );
  hoopNet.position.set(0.38, 2.87, 0);
  hoopGroup.add(wallBracket, hoopRim, hoopNet);
  etecGroup.add(hoopGroup);


  // Bola de Basquete 3D interativa no centro da Quadra Aberta!
  const ballGroup = new THREE.Group();
  ballGroup.position.set(23.2, 0.405, 6.2);
  const bballMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.62 });
  const ballSphere = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 16), bballMat);
  ballSphere.castShadow = true;
  ballGroup.add(ballSphere);
  const seamMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.85 });
  const seamRingGeo = new THREE.TorusGeometry(0.261, 0.011, 6, 24);
  const seam1 = new THREE.Mesh(seamRingGeo, seamMat);
  const seam2 = new THREE.Mesh(seamRingGeo, seamMat);
  seam2.rotation.y = Math.PI / 2;
  const seam3 = new THREE.Mesh(seamRingGeo, seamMat);
  seam3.rotation.x = Math.PI / 2;
  ballGroup.add(seam1, seam2, seam3);
  etecGroup.add(ballGroup);
  etecBall = { mesh: ballGroup, vx: 0, vy: 0, vz: 0, scoredCd: 0 };

  // ===================== PRÉDIO PRINCIPAL DA ETECAMP (BLOCOS + CORREDOR CENTRAL) =====================
  // Prédio central x = -11..+11, z = -16..+8 (corredor comprido no meio + blocos de salas nas laterais igual à foto!)
  const schoolBody = new THREE.Mesh(new THREE.BoxGeometry(22.0, 4.6, 24.0), buildingMat);
  schoolBody.position.set(0, 2.3, -4.0);
  schoolBody.castShadow = true;
  schoolBody.receiveShadow = true;
  etecGroup.add(schoolBody);
  addObstacleBox(0, -4.0, 22.0, 24.0, etecObstacles);

  // Telhado comprido de duas águas do corredor central (correndo de frente a fundos, fiel à foto!)
  const corridorRoofL = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 25.4), roofCorrugMat);
  corridorRoofL.position.set(-1.55, 5.25, -4.0);
  corridorRoofL.rotation.z = 0.26;
  const corridorRoofR = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 25.4), roofCorrugMat);
  corridorRoofR.position.set(1.55, 5.25, -4.0);
  corridorRoofR.rotation.z = -0.26;
  etecGroup.add(corridorRoofL, corridorRoofR);

  // Blocos de telhado das salas (faixa vermelha deslocada 0.16m para fora da parede — ZERO z-fighting/tremida!)
  [-11.8, -4.0, 3.8].forEach((bz) => {
    [-7.12, 7.12].forEach((bx) => {
      const blkBand = new THREE.Mesh(new THREE.BoxGeometry(8.08, 0.44, 7.26), cpsRedMat);
      blkBand.position.set(bx, 4.62, bz);
      const blkRoof = new THREE.Mesh(new THREE.BoxGeometry(7.86, 0.28, 7.04), roofCorrugMat);
      blkRoof.position.set(bx, 4.96, bz);
      blkRoof.castShadow = true;
      etecGroup.add(blkBand, blkRoof);
    });
  });

  // Base cimentada + pilastras arquitetônicas separando os blocos da ETECAMP!
  const schoolPlinth = new THREE.Mesh(new THREE.BoxGeometry(22.25, 0.55, 24.25), grayWallMat);
  schoolPlinth.position.set(0, 0.275, -4.0);
  etecGroup.add(schoolPlinth);
  [-11.04, 11.04].forEach((px) => {
    [-15.8, -8.0, 0.0, 7.8].forEach((pz) => {
      const pil = new THREE.Mesh(new THREE.BoxGeometry(0.28, 4.6, 0.42), wallCapMat);
      pil.position.set(px, 2.3, pz);
      etecGroup.add(pil);
    });
  });

  // Janelas emolduradas com divisórias de alumínio e peitoril nas fachadas frente, fundos e laterais!
  const addFacadeWindow = (x, y, z, w, rotY = 0) => {
    const wg = new THREE.Group();
    wg.position.set(x, y, z);
    wg.rotation.y = rotY;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.18, 1.36, 0.14), steelMat);
    const pane = new THREE.Mesh(new THREE.BoxGeometry(w, 1.18, 0.16), glassMat);
    const barV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.2, 0.18), steelMat);
    const barH = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, 0.06, 0.18), steelMat);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.1, 0.28), whiteMat);
    sill.position.set(0, -0.7, 0.08);
    wg.add(frame, pane, barV, barH, sill);
    etecGroup.add(wg);
  };
  [-8.0, -5.0, 5.0, 8.0].forEach((wx) => {
    addFacadeWindow(wx, 2.55, 8.04, 2.1, 0);
    addFacadeWindow(wx, 2.55, -16.04, 2.1, Math.PI);
  });
  [-11.5, -6.5, 5.0].forEach((wz) => {
    addFacadeWindow(-11.04, 2.55, wz, 2.4, -Math.PI / 2);
    addFacadeWindow(11.04, 2.55, wz, 2.4, Math.PI / 2);
  });

  // 1) ENTRADA FRONTAL DO CORREDOR COM AS SALAS (marquise apoiada em pilares metálicos + porta dupla envidraçada!)
  const frontAwning = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.28, 2.7), cpsRedMat);
  frontAwning.position.set(0, 3.68, 9.25);
  frontAwning.castShadow = true;
  etecGroup.add(frontAwning);
  [-2.85, 2.85].forEach((px) => {
    const fCol = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.6, 10), steelMat);
    fCol.position.set(px, 1.8, 10.35);
    fCol.castShadow = true;
    etecGroup.add(fCol);
  });
  const frontDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(3.48, 3.52, 0.18), steelMat);
  frontDoorFrame.position.set(0, 1.76, 8.06);
  const frontDoor = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.4, 0.2), darkMetalMat);
  frontDoor.position.set(0, 1.7, 8.07);
  [-0.78, 0.78].forEach((dx) => {
    const dGlass = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.0, 0.22), glassMat);
    dGlass.position.set(dx, 2.1, 8.08);
    const pushBar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.26), whiteMat);
    pushBar.position.set(dx, 1.25, 8.09);
    etecGroup.add(dGlass, pushBar);
  });
  etecGroup.add(frontDoorFrame, frontDoor);

  // 2) ENTRADA LATERAL DO ESTACIONAMENTO PARA O CORREDOR (parede oeste x = -11.0, z = 1.0)
  const parkAwning = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 4.2), cpsRedMat);
  parkAwning.position.set(-12.0, 3.62, 1.0);
  etecGroup.add(parkAwning);
  const parkDoor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.35, 2.6), blueGateMat);
  parkDoor.position.set(-11.06, 1.675, 1.0);
  etecGroup.add(parkDoor);

  // 3) ENTRADA ABERTA (CORREDOR) NOS FUNDOS (z = -16.0 — pilares azuis + cobertura igual à foto!)
  const backArchGroup = new THREE.Group();
  backArchGroup.position.set(0, 0, -16.0);
  [-2.15, 2.15].forEach((px) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.55, 0.42), pillarBlueMat);
    col.position.set(px, 1.775, -2.1);
    col.castShadow = true;
    backArchGroup.add(col);
  });
  const backHeader = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.42, 2.5), whiteMat);
  backHeader.position.set(0, 3.72, -1.2);
  const backBlueTrim = new THREE.Mesh(new THREE.BoxGeometry(5.14, 0.2, 2.54), pillarBlueMat);
  backBlueTrim.position.set(0, 3.5, -1.2);
  const backGableL = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.16, 2.7), roofCorrugMat);
  backGableL.position.set(-1.3, 4.25, -1.2);
  backGableL.rotation.z = 0.34;
  const backGableR = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.16, 2.7), roofCorrugMat);
  backGableR.position.set(1.3, 4.25, -1.2);
  backGableR.rotation.z = -0.34;
  const backOpenVoid = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.4, 0.16), darkMetalMat);
  backOpenVoid.position.set(0, 1.7, -0.06);
  backArchGroup.add(backHeader, backBlueTrim, backGableL, backGableR, backOpenVoid);
  etecGroup.add(backArchGroup);

  // ===================== PARTE EXTERNA (FUNDOS) =====================

  // Bancos de pátio com encosto de madeira + lixeira ecológica na parte externa dos fundos!
  [-15.5, -7.5, 8.5].forEach((bx) => {
    const bg = new THREE.Group();
    bg.position.set(bx, 0.12, -24.5);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.56), woodMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.42, 0.08), woodMat);
    back.position.set(0, 0.78, -0.26);
    [-0.95, 0.95].forEach((lx) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.46, 0.52), yardMat);
      leg.position.set(lx, 0.23, 0);
      bg.add(leg);
    });
    bg.add(seat, back);
    etecGroup.add(bg);
    addObstacleBox(bx, -24.5, 2.5, 0.8, etecObstacles);
  });

  // Árvores frondosas em 2 tons na parte externa dos fundos e atrás dos muros!
  const trunkMat = new THREE.MeshStandardMaterial({ map: createWoodPlankTexture("#6b4423", "#3d2312", 1, 2), roughness: 0.95 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x245d3c, roughness: 0.86 });
  const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x3b8c54, roughness: 0.82 });
  const treeCoords = [
    [-25.5, -25.5, true],
    [-19.5, -25.8, true],
    [-3.5, -26.5, true],
    [11.5, -25.8, true],
    [-30.0, -34.0, false],
    [-14.0, -34.5, false],
    [2.0, -34.2, false],
    [18.0, -34.5, false],
    [31.0, -33.5, false],
    [-39.0, -12.0, false],
    [-39.0, 6.0, false],
    [39.0, -10.0, false],
  ];
  treeCoords.forEach(([tx, tz, inside]) => {
    const tr = new THREE.Group();
    tr.position.set(tx, 0, tz);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.42, 2.9, 8), trunkMat);
    trunk.position.y = 1.45;
    trunk.castShadow = true;
    const crown1 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.05, 1), leafMat);
    crown1.position.y = 3.7;
    crown1.castShadow = true;
    const crown2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.38, 1), leafMat2);
    crown2.position.set(0.85, 4.35, 0.4);
    crown2.castShadow = true;
    const crown3 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15, 1), leafMat2);
    crown3.position.set(-0.8, 4.15, -0.35);
    tr.add(trunk, crown1, crown2, crown3);
    etecGroup.add(tr);
    addObstacleBox(tx, tz, 1.05, 1.05, etecObstacles);
  });

  // ===================== SALA DE AUTOMAÇÃO (FUNDO-DIREITA — WALK-IN 3D!) =====================
  // Posicionada entre a Quadra e os Fundos (x = 16.5..32.5, z = -27.0..-14.5), porta aberta em x = 16.5, z = -20.7
  const autoFloor = new THREE.Mesh(
    new THREE.BoxGeometry(15.6, 0.16, 12.1),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.55, metalness: 0.15 })
  );
  autoFloor.position.set(24.5, 0.14, -20.75);
  autoFloor.receiveShadow = true;
  etecGroup.add(autoFloor);

  // Faixas amarelas de segurança industrial em volta da célula robótica
  const safetyZone = new THREE.Mesh(new THREE.RingGeometry(2.35, 2.55, 4), yellowMat);
  safetyZone.rotation.x = -Math.PI / 2;
  safetyZone.rotation.z = Math.PI / 4;
  safetyZone.position.set(25.2, 0.23, -20.75);
  etecGroup.add(safetyZone);

  // Paredes da Sala de Automação (porta aberta de 4.2m na parede oeste)
  function addAutoWall(cx, cz, w, d) {
    const wM = new THREE.Mesh(new THREE.BoxGeometry(w, 3.8, d), buildingMat);
    wM.position.set(cx, 1.9, cz);
    wM.castShadow = true;
    wM.receiveShadow = true;
    etecGroup.add(wM);
    addObstacleBox(cx, cz, w, d, etecObstacles);
  }
  addAutoWall(24.5, -27.0, 16.0, 0.42); // Norte
  addAutoWall(24.5, -14.5, 16.0, 0.42); // Sul
  addAutoWall(32.5, -20.75, 0.42, 12.5); // Leste
  addAutoWall(16.5, -24.9, 0.42, 4.2); // Oeste (lado norte da porta)
  addAutoWall(16.5, -16.55, 0.42, 4.1); // Oeste (lado sul da porta)
  const autoLint = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.9, 4.4), buildingMat);
  autoLint.position.set(16.5, 3.35, -20.7);
  etecGroup.add(autoLint);

  // Telhado de fibrocimento da Sala de Automação (oculta ao entrar para visão limpa!)
  etecAutoRoofGroup = new THREE.Group();
  const autoRoof = new THREE.Mesh(new THREE.BoxGeometry(16.8, 0.26, 13.4), roofCorrugMat);
  autoRoof.position.set(24.5, 3.95, -20.75);
  autoRoof.castShadow = true;
  etecAutoRoofGroup.add(autoRoof);
  etecGroup.add(etecAutoRoofGroup);


  // --- Equipamentos 3D do Laboratório de Automação Industrial ---
  const robotYellowMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.45, roughness: 0.35 });
  const hmiScreenMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.65 });
  const ledGreenMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 0.8 });
  const ledRedMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.7 });

  // 1. Braço Robótico Industrial Articulado (centro da célula — anima ao vivo!)
  const robotPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.82, 0.72, 16), darkMetalMat);
  robotPedestal.position.set(25.2, 0.58, -20.75);
  robotPedestal.castShadow = true;
  etecGroup.add(robotPedestal);

  etecRobotPivot = new THREE.Group();
  etecRobotPivot.position.set(25.2, 0.96, -20.75);
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.5, 0.36, 14), robotYellowMat);
  turret.position.y = 0.18;
  etecRobotPivot.add(turret);

  etecRobotArm = new THREE.Group();
  etecRobotArm.position.set(0, 0.36, 0);
  const lowerBoom = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.25, 0.28), robotYellowMat);
  lowerBoom.position.set(0, 0.55, 0.15);
  lowerBoom.rotation.x = 0.28;
  const elbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.36, 12), darkMetalMat);
  elbowJoint.rotation.z = Math.PI / 2;
  elbowJoint.position.set(0, 1.12, 0.32);
  const upperBoom = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 1.15), robotYellowMat);
  upperBoom.position.set(0, 1.12, 0.85);
  const clawL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.32), steelMat);
  clawL.position.set(-0.14, 1.08, 1.48);
  const clawR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.32), steelMat);
  clawR.position.set(0.14, 1.08, 1.48);
  etecRobotArm.add(lowerBoom, elbowJoint, upperBoom, clawL, clawR);
  etecRobotPivot.add(etecRobotArm);
  etecGroup.add(etecRobotPivot);
  addObstacleBox(25.2, -20.75, 1.8, 1.8, etecObstacles);

  // 2. Esteira Transportadora Industrial com sensor óptico e caixas deslizantes
  const beltFrame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.78, 6.4), steelMat);
  beltFrame.position.set(28.6, 0.6, -20.75);
  beltFrame.castShadow = true;
  const beltTrack = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.08, 6.2), darkMetalMat);
  beltTrack.position.set(28.6, 1.02, -20.75);
  const sensorArch = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.95, 0.18), robotYellowMat);
  sensorArch.position.set(28.6, 1.45, -20.75);
  const towerLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.34, 10), ledGreenMat);
  towerLamp.position.set(29.2, 2.1, -20.75);
  etecGroup.add(beltFrame, beltTrack, sensorArch, towerLamp);
  addObstacleBox(28.6, -20.75, 1.5, 6.5, etecObstacles);

  etecConveyorBoxes.length = 0;
  [-2.2, 0.0, 2.2].forEach((oz) => {
    const crate = new THREE.Mesh(
      new THREE.BoxGeometry(0.56, 0.44, 0.56),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 })
    );
    crate.position.set(28.6, 1.28, -20.75 + oz);
    crate.castShadow = true;
    etecGroup.add(crate);
    etecConveyorBoxes.push(crate);
  });

  // 3. Painéis Elétricos de CLP & Telas IHM (parede norte e parede leste)
  [21.5, 25.0, 28.5].forEach((px) => {
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.35, 0.72), steelMat);
    cab.position.set(px, 1.4, -26.2);
    cab.castShadow = true;
    const hmi = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.62, 0.06), hmiScreenMat);
    hmi.position.set(px - 0.3, 1.75, -25.82);
    const eStop = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 10), ledRedMat);
    eStop.rotation.x = Math.PI / 2;
    eStop.position.set(px + 0.55, 1.45, -25.82);
    const okLed = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), ledGreenMat);
    okLed.position.set(px + 0.55, 1.85, -25.82);
    etecGroup.add(cab, hmi, eStop, okLed);
    addObstacleBox(px, -26.2, 2.2, 0.9, etecObstacles);
  });

  // 4. Bancadas Didáticas de Pneumática, Sensores & Eletrônica (parede sul)
  [21.5, 26.5].forEach((bx) => {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.92, 1.1), darkMetalMat);
    bench.position.set(bx, 0.68, -15.4);
    const rack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.85, 0.16), whiteMat);
    rack.position.set(bx, 1.55, -14.95);
    const scope = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.42, 0.36), hmiScreenMat);
    scope.position.set(bx - 0.8, 1.35, -15.35);
    etecGroup.add(bench, rack, scope);
    addObstacleBox(bx, -15.4, 3.5, 1.2, etecObstacles);
  });

  // ===================== ESTAÇÃO BOTUJURU (LINHA 7-RUBI — FRENTE SUL DA RUA!) =====================
  const botPlatform = new THREE.Mesh(new THREE.BoxGeometry(26.0, 0.85, 4.6), yardMat);
  botPlatform.position.set(0, 0.425, 32.6);
  botPlatform.receiveShadow = true;
  etecGroup.add(botPlatform);
  // Colliders laterais da plataforma deixando rampa aberta no meio (x = -3..+3)
  addObstacleBox(-8.5, 32.6, 10.5, 4.6, etecObstacles);
  addObstacleBox(8.5, 32.6, 10.5, 4.6, etecObstacles);
  addObstacleBox(0, 34.4, 28.0, 1.2, etecObstacles);

  const ramp = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.24, 3.0), concreteMat);
  ramp.position.set(0, 0.34, 29.8);
  ramp.rotation.x = -0.18;
  etecGroup.add(ramp);

  const botTactile = new THREE.Mesh(new THREE.BoxGeometry(25.6, 0.04, 0.36), yellowMat);
  botTactile.position.set(0, 0.87, 34.45);
  etecGroup.add(botTactile);
  [-5.5, 5.5].forEach((bx) => {
    const bBench = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 0.55), steelMat);
    bBench.position.set(bx, 1.08, 31.35);
    etecGroup.add(bBench);
  });
  const botRoof = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.24, 4.6), roofCorrugMat);
  botRoof.position.set(0, 4.18, 32.6);
  botRoof.castShadow = true;
  const botBeam = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.18, 0.22), pillarBlueMat);
  botBeam.position.set(0, 4.02, 30.42);
  etecGroup.add(botRoof, botBeam);
  [-8.0, 8.0].forEach((px) => {
    const bP = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.4, 0.24), steelMat);
    bP.position.set(px, 2.45, 32.6);
    etecGroup.add(bP);
  });

  const botTotem = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.95, 0.22),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTAÇÃO BOTUJURU", "Estação Ferroviária", "#1e3a8a", "#ffffff"),
    })
  );
  botTotem.position.set(0, 3.35, 30.8);
  etecGroup.add(botTotem);
  [-1.9, 1.9].forEach((hx) => {
    const hanger = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.45, 0.1), steelMat);
    hanger.position.set(hx, 3.92, 30.8);
    etecGroup.add(hanger);
  });


  const botBallast = new THREE.Mesh(
    new THREE.BoxGeometry(220, 0.14, 5.2),
    new THREE.MeshStandardMaterial({ map: createWornConcreteTexture(), color: 0x6b6258, roughness: 1 })
  );
  botBallast.position.set(0, 0.07, 36.8);
  etecGroup.add(botBallast);

  // Dormentes de concreto instanciados na Linha 7-Rubi em Botujuru
  {
    const bSleepGeo = new THREE.BoxGeometry(0.24, 0.1, 2.35);
    const bSleepMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.95 });
    const bSleepCount = 156;
    const bSleepInst = new THREE.InstancedMesh(bSleepGeo, bSleepMat, bSleepCount);
    const _bsd = new THREE.Object3D();
    for (let i = 0; i < bSleepCount; i++) {
      _bsd.position.set(-104 + i * 1.34, 0.14, 36.8);
      _bsd.updateMatrix();
      bSleepInst.setMatrixAt(i, _bsd.matrix);
    }
    bSleepInst.instanceMatrix.needsUpdate = true;
    etecGroup.add(bSleepInst);
  }
  [36.1, 37.5].forEach((rz) => {
    const r = new THREE.Mesh(new THREE.BoxGeometry(220, 0.16, 0.12), steelMat);
    r.position.set(0, 0.2, rz);
    etecGroup.add(r);
  });
  // Postes e fio de catenária ao longo da estação Botujuru
  [-90, -68, -46, -24, 24, 46, 68, 90].forEach((mx) => {
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.22, 6.5, 0.22), steelMat);
    mast.position.set(mx, 3.25, 39.2);
    const cant = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 3.6), steelMat);
    cant.position.set(mx, 6.0, 37.6);
    etecGroup.add(mast, cant);
  });
  const botWire = new THREE.Mesh(new THREE.BoxGeometry(210, 0.035, 0.035), darkMetalMat);
  botWire.position.set(0, 5.65, 36.8);
  etecGroup.add(botWire);

  const trainBot = createTrain7RubiModel("7-RUBI • TERMINAL CLP");
  trainBot.rotation.y = Math.PI / 2;
  trainBot.position.set(0, 0.14, 36.8);
  etecGroup.add(trainBot);

  // ===================== CENÁRIO COMPLETO EM VOLTA DA ETECAMP (BAIRRO BOTUJURU, SERRA & MATA) =====================
  {
    const botEnv = new THREE.Group();
    const bHillMat = new THREE.MeshStandardMaterial({
      map: createGrassTexture("#4b8b3b", "#3d7a30", 8, 5),
      roughness: 0.96,
    });
    const bRoofTileMat = new THREE.MeshStandardMaterial({
      map: createRoofTileTexture("#a84824", "#6e270e", 4, 3),
      roughness: 0.78,
    });
    const bRoofDarkMat = new THREE.MeshStandardMaterial({
      map: createRoofTileTexture("#7c2d12", "#471708", 4, 3),
      roughness: 0.82,
    });
    const bWinWarm = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.18,
      roughness: 0.25,
    });
    const bBarkMat = new THREE.MeshStandardMaterial({
      map: createWoodPlankTexture("#6b4226", "#3d2312", 1, 2),
      roughness: 0.94,
    });
    const bLeaf1 = new THREE.MeshStandardMaterial({ color: 0x245d3c, roughness: 0.86 });
    const bLeaf2 = new THREE.MeshStandardMaterial({ color: 0x3b8c54, roughness: 0.82 });
    const bIpeMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.82 });
    const bRockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.92 });

    // 1. Serras e morros verdes cercando o vale de Botujuru
    [
      [-108, -98, 44, 24],
      [-28, -112, 52, 27],
      [48, -108, 48, 25],
      [112, -88, 44, 23],
      [-118, 12, 42, 21],
      [118, 10, 44, 22],
      [-98, 106, 46, 20],
      [0, 118, 54, 22],
      [102, 104, 46, 21],
    ].forEach(([hx, hz, hr, hh]) => {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(hr, hh, 14), bHillMat);
      hill.position.set(hx, hh * 0.36, hz);
      hill.scale.set(1.35, 1, 1.12);
      botEnv.add(hill);
    });

    // 2. Ruas transversais do bairro (Oeste e Leste dos muros da ETECAMP) + mais postes na rua principal!
    [-42.0, 42.0].forEach((rx) => {
      const sideRd = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 56.0), asphaltMat);
      sideRd.rotation.x = -Math.PI / 2;
      sideRd.position.set(rx, 0.036, -2.0);
      botEnv.add(sideRd);
    });
    [-72, -52, 52, 72].forEach((lx) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 6.2, 8), steelMat);
      pole.position.set(lx, 3.1, 22.8);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.6), steelMat);
      arm.position.set(lx, 6.1, 23.5);
      const bulb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.62), new THREE.MeshBasicMaterial({ color: 0xfef9c3 }));
      bulb.position.set(lx, 6.02, 24.1);
      botEnv.add(pole, arm, bulb);
    });

    // Pequeno ponto de ônibus escolar na calçada à esquerda do portão principal (x = -12.5, z = 21.3)
    const busSh = new THREE.Group();
    busSh.position.set(-12.5, 0.14, 21.15);
    const bsBack = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 0.12), steelMat);
    bsBack.position.set(0, 1.1, -0.45);
    const bsRoof = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.14, 1.5), pillarBlueMat);
    bsRoof.position.set(0, 2.25, 0.15);
    const bsBench = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.1, 0.42), woodMat);
    bsBench.position.set(0, 0.48, -0.1);
    [-1.55, 1.55].forEach((px) => {
      const bp = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.25, 0.1), steelMat);
      bp.position.set(px, 1.12, 0.72);
      busSh.add(bp);
    });
    busSh.add(bsBack, bsRoof, bsBench);
    botEnv.add(busSh);

    // 3. Casas e comércios do Bairro Botujuru (com cache compartilhado de geometria e materiais!)
    const botWallMatCache = new Map();
    const botUnitBox = new THREE.BoxGeometry(1, 1, 1);
    const botUnitGableShape = new THREE.Shape();
    botUnitGableShape.moveTo(-0.5, 0);
    botUnitGableShape.lineTo(0.5, 0);
    botUnitGableShape.lineTo(0, 1);
    botUnitGableShape.closePath();
    const botUnitGableGeo = new THREE.ExtrudeGeometry(botUnitGableShape, { depth: 1, bevelEnabled: false });

    const addBotHouse = (hx, hz, hw, hh, hd, wallHex, rotY = 0, isShop = false, shopName = "") => {
      const hg = new THREE.Group();
      hg.position.set(hx, 0, hz);
      hg.rotation.y = rotY;
      let hMat = botWallMatCache.get(wallHex);
      if (!hMat) {
        hMat = new THREE.MeshStandardMaterial({
          map: createStuccoWallTexture(wallHex, "#d6ccb8", 2, 2),
          roughness: 0.85,
        });
        botWallMatCache.set(wallHex, hMat);
      }
      const base = new THREE.Mesh(new THREE.BoxGeometry(hw + 0.15, 0.35, hd + 0.15), grayWallMat);
      base.position.y = 0.175;
      const body = new THREE.Mesh(new THREE.BoxGeometry(hw, hh, hd), hMat);
      body.position.y = hh * 0.5 + 0.32;
      body.castShadow = true;
      body.receiveShadow = true;
      hg.add(base, body);

      if (isShop) {
        const parapet = new THREE.Mesh(new THREE.BoxGeometry(hw + 0.2, 0.35, hd + 0.2), grayWallMat);
        parapet.position.y = hh + 0.44;
        const awn = new THREE.Mesh(new THREE.BoxGeometry(hw * 0.88, 0.14, 1.2), pillarBlueMat);
        awn.position.set(0, 2.75, hd * 0.5 + 0.55);
        awn.rotation.x = 0.24;
        const sWin = new THREE.Mesh(new THREE.BoxGeometry(hw * 0.5, 1.85, 0.08), darkMetalMat);
        sWin.position.set(-hw * 0.16, 1.35, hd * 0.5 + 0.04);
        const sDoor = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.15, 0.1), steelMat);
        sDoor.position.set(hw * 0.28, 1.4, hd * 0.5 + 0.04);
        hg.add(parapet, awn, sWin, sDoor);
        if (shopName) {
          const sign = new THREE.Mesh(
            new THREE.PlaneGeometry(Math.min(hw - 0.6, 4.4), 0.68),
            new THREE.MeshBasicMaterial({ map: createWoodSignTexture(shopName, "Bairro Botujuru", "#1e3a8a", "#fef08a") })
          );
          sign.position.set(0, 3.38, hd * 0.5 + 0.06);
          hg.add(sign);
        }
      } else {
        const topY = hh + 0.32;
        const peakH = 1.45;
        const gable = new THREE.Mesh(botUnitGableGeo, hMat);
        gable.scale.set(hw, peakH, hd);
        gable.position.set(0, topY - 0.02, -hd * 0.5);
        gable.castShadow = true;

        const rSlope = Math.atan2(peakH, hw * 0.5);
        const eave = 0.45;
        const roofT = 0.16;
        const rLen = Math.hypot(hw * 0.5, peakH) + eave + 0.12;
        const midAlong = (eave - 0.12) * 0.5;
        const lx = -hw * 0.25 - Math.cos(rSlope) * midAlong - Math.sin(rSlope) * (roofT * 0.5);
        const ly = topY + peakH * 0.5 - Math.sin(rSlope) * midAlong + Math.cos(rSlope) * (roofT * 0.5);
        const rMat = hh > 4.2 ? bRoofDarkMat : bRoofTileMat;
        const rl = new THREE.Mesh(botUnitBox, rMat);
        rl.scale.set(rLen, roofT, hd + 0.68);
        rl.position.set(lx, ly, 0);
        rl.rotation.z = rSlope;
        const rr = new THREE.Mesh(botUnitBox, rMat);
        rr.scale.set(rLen, roofT, hd + 0.68);
        rr.position.set(-lx, ly, 0);
        rr.rotation.z = -rSlope;
        const ridge = new THREE.Mesh(botUnitBox, woodMat);
        ridge.scale.set(0.24, 0.2, hd + 0.72);
        ridge.position.set(0, topY + peakH + 0.08, 0);

        const w1 = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.0, 0.08), bWinWarm);
        w1.position.set(-hw * 0.24, hh * 0.55 + 0.3, hd * 0.5 + 0.04);
        const dr = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.0, 0.08), woodMat);
        dr.position.set(hw * 0.22, 1.32, hd * 0.5 + 0.04);
        // Muro baixo na frente da casa
        const yardWall = new THREE.Mesh(new THREE.BoxGeometry(hw + 1.2, 1.1, 0.2), grayWallMat);
        yardWall.position.set(0, 0.55, hd * 0.5 + 1.4);
        hg.add(gable, rl, rr, ridge, w1, dr, yardWall);
      }
      botEnv.add(hg);
    };

    // Comércios e casas a Oeste (além da rua lateral x = -42)
    addBotHouse(-52.0, 14.5, 7.6, 3.6, 6.8, "#f5ead6", 0, true, "PADARIA BOTUJURU");
    addBotHouse(-52.5, 2.0, 6.8, 3.5, 5.8, "#dbeafe", Math.PI / 2, false);
    addBotHouse(-52.5, -10.5, 7.2, 5.2, 6.0, "#fef3c7", Math.PI / 2, false);
    addBotHouse(-52.5, -23.0, 6.6, 3.4, 5.6, "#e7dfd1", Math.PI / 2, false);
    addBotHouse(-65.0, 14.5, 7.0, 3.5, 5.8, "#f3d5c0", 0, false);

    // Comércios e casas a Leste (além da rua lateral x = +42)
    addBotHouse(52.0, 14.5, 7.6, 3.6, 6.8, "#e2e8f0", 0, true, "MERCADO DA ESTAÇÃO");
    addBotHouse(52.5, 2.0, 7.0, 5.0, 5.8, "#f5ead6", -Math.PI / 2, false);
    addBotHouse(52.5, -10.5, 6.6, 3.4, 5.6, "#e6c7a8", -Math.PI / 2, false);
    addBotHouse(52.5, -23.0, 7.2, 3.6, 5.8, "#dbeafe", -Math.PI / 2, false);
    addBotHouse(65.0, 14.5, 7.0, 3.5, 5.8, "#fef3c7", 0, false);

    // Bairro Botujuru ao Sul (do outro lado dos trilhos da Linha 7-Rubi, z = 47..68)
    const southHouses = [
      [-58, 50, 7.2, 3.6, 5.8, "#f5ead6"],
      [-42, 48, 6.8, 5.0, 5.6, "#dbeafe"],
      [-26, 51, 7.0, 3.4, 5.6, "#fef3c7"],
      [-10, 50, 7.4, 3.8, 5.8, "#e7dfd1"],
      [8, 52, 6.8, 3.5, 5.5, "#f3d5c0"],
      [24, 49, 7.2, 5.2, 5.8, "#e2e8f0"],
      [40, 51, 6.8, 3.5, 5.6, "#f5ead6"],
      [56, 49, 7.2, 3.6, 5.8, "#e6c7a8"],
      [-34, 65, 7.0, 3.6, 5.6, "#fef3c7"],
      [0, 67, 7.4, 3.8, 5.8, "#dbeafe"],
      [34, 65, 7.0, 3.5, 5.6, "#f3d5c0"],
    ];
    southHouses.forEach(([hx, hz, hw, hh, hd, col]) => {
      addBotHouse(hx, hz, hw, hh, hd, col, Math.PI, false);
    });

    // 4. Mata Atlântica densa nos fundos (Norte) & árvores/arbustos/pedras ao redor em InstancedMesh!
    let eSeed = 88123;
    const eRand = () => {
      eSeed = (eSeed * 1664525 + 1013904223) >>> 0;
      return eSeed / 4294967296;
    };
    const eTrees = [];
    // Mata nos fundos da escola (z = -36..-78)
    for (let i = 0; i < 42; i++) {
      const tx = -82 + eRand() * 164;
      const tz = -37 - eRand() * 42;
      eTrees.push([tx, tz, 1.15 + eRand() * 0.65, eRand() < 0.22]);
    }
    // Árvores nas laterais e ao sul da linha do trem
    [
      [-48, 30, 1.15, false], [-36, 42, 1.25, true], [-18, 43, 1.2, false],
      [18, 43, 1.25, true], [36, 42, 1.2, false], [52, 30, 1.15, false],
      [-64, -4, 1.35, false], [-66, -20, 1.4, true], [64, -4, 1.35, false], [66, -20, 1.4, true],
      [-52, 62, 1.35, false], [-16, 63, 1.3, true], [18, 63, 1.35, false], [52, 62, 1.3, false],
    ].forEach((t) => eTrees.push(t));

    const normalTrees = eTrees.filter((t) => !t[3]);
    const ipeTrees = eTrees.filter((t) => t[3]);
    const _ed = new THREE.Object3D();

    const buildInstTrees = (list, cMat1, cMat2) => {
      if (!list.length) return;
      const tk = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.24, 0.4, 2.9, 7), bBarkMat, list.length);
      const c1 = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.95, 1), cMat1, list.length);
      const c2 = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1.32, 1), cMat2, list.length);
      list.forEach(([tx, tz, ts], i) => {
        _ed.position.set(tx, 1.45 * ts, tz);
        _ed.rotation.set(0, i * 0.9, 0);
        _ed.scale.setScalar(ts);
        _ed.updateMatrix();
        tk.setMatrixAt(i, _ed.matrix);

        _ed.position.set(tx, 3.7 * ts, tz);
        _ed.updateMatrix();
        c1.setMatrixAt(i, _ed.matrix);

        _ed.position.set(tx + 0.72 * ts, 4.35 * ts, tz + 0.35 * ts);
        _ed.updateMatrix();
        c2.setMatrixAt(i, _ed.matrix);
      });
      tk.instanceMatrix.needsUpdate = true;
      c1.instanceMatrix.needsUpdate = true;
      c2.instanceMatrix.needsUpdate = true;
      botEnv.add(tk, c1, c2);
    };
    buildInstTrees(normalTrees, bLeaf1, bLeaf2);
    buildInstTrees(ipeTrees, bIpeMat, bIpeMat);

    // Arbustos e pedras espalhados fora dos muros da ETECAMP (em InstancedMesh)
    const eBushes = [];
    for (let i = 0; i < 64; i++) {
      const bx = -76 + eRand() * 152;
      const bz = -68 + eRand() * 134;
      // Mantém 100% fora do campus murado, rua principal e trilhos
      if (bx > -36 && bx < 36 && bz > -31 && bz < 40) continue;
      if (bz > 20 && bz < 40) continue;
      if (Math.abs(bx + 42) < 4.5 || Math.abs(bx - 42) < 4.5) continue;
      eBushes.push([bx, bz, 0.85 + eRand() * 0.75]);
    }
    const eBushInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.7, 1), bLeaf1, eBushes.length);
    eBushes.forEach(([bx, bz, bs], i) => {
      _ed.position.set(bx, 0.4 * bs, bz);
      _ed.rotation.set(0, i, 0);
      _ed.scale.set(1.25 * bs, 0.75 * bs, 1.15 * bs);
      _ed.updateMatrix();
      eBushInst.setMatrixAt(i, _ed.matrix);
    });
    eBushInst.instanceMatrix.needsUpdate = true;
    botEnv.add(eBushInst);

    const eRocks = [];
    for (let i = 0; i < 32; i++) {
      const rx = -74 + eRand() * 148;
      const rz = -66 + eRand() * 130;
      if (rx > -36 && rx < 36 && rz > -31 && rz < 40) continue;
      if (rz > 20 && rz < 40) continue;
      eRocks.push([rx, rz, 0.55 + eRand() * 0.9]);
    }
    const eRockInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.45, 0), bRockMat, eRocks.length);
    eRocks.forEach(([rx, rz, rs], i) => {
      _ed.position.set(rx, 0.16 * rs, rz);
      _ed.rotation.set(eRand(), eRand(), eRand());
      _ed.scale.set(1.25 * rs, 0.62 * rs, 1.0 * rs);
      _ed.updateMatrix();
      eRockInst.setMatrixAt(i, _ed.matrix);
    });
    eRockInst.instanceMatrix.needsUpdate = true;
    botEnv.add(eRockInst);

    etecGroup.add(botEnv);
  }
}
buildEtecCampus();

// 5. INTERIOR EXPANDIDO DA ETECAMP (40m x 102m — Corredor largo 9m, 8 setores/ala, TV em todas as salas, Sala Maker, Sala dos Professores & Refeitório!)
function buildEtecInside() {
  const concreteTex = createTileFloorTexture("#9aa09c", "#8d938f", 38);
  const floorMat = new THREE.MeshStandardMaterial({ map: concreteTex, roughness: 0.72 });
  const corridorTileMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e2e8f0", "#cbd5e1", 32),
    roughness: 0.65,
  });
  const hallWallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
  const classGreenWallMat = new THREE.MeshStandardMaterial({
    map: createStuccoWallTexture("#52804c", "#426b3d", 4, 2),
    roughness: 0.86,
  });
  const woodTrimMat = new THREE.MeshStandardMaterial({ color: 0x7c4a26, roughness: 0.72 });
  const blueDoorMat = new THREE.MeshStandardMaterial({ color: 0x1e4b8f, roughness: 0.55 });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.7, roughness: 0.28 });
  const whiteboardMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 });
  const deskTopMat = new THREE.MeshStandardMaterial({ color: 0xeaece7, roughness: 0.5 });
  const greenSteelMat = new THREE.MeshStandardMaterial({ color: 0x165a31, metalness: 0.35, roughness: 0.45 });
  const chairWoodMat = new THREE.MeshStandardMaterial({ color: 0x824822, roughness: 0.6 });
  const orangeGrateMat = new THREE.MeshStandardMaterial({
    color: 0xd07d24,
    metalness: 0.3,
    roughness: 0.45,
    wireframe: true,
  });
  const fanBladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const cpsRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.55 });
  const labGranite = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45 });
  const pcScreenMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.55 });
  const tvScreenMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x0ea5e9, emissiveIntensity: 0.28, roughness: 0.2 });
  const pcCaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55 });
  const nurseWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
  const nurseMintMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
  const lockerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.5 });
  const lockerDoorMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.42, roughness: 0.42 });
  const audBlueMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.55 });
  const audFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.4 });
  const bathroomTileMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e0f2fe", "#bae6fd", 26),
    roughness: 0.45,
  });
  const refeitorioTileMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#fef3c7", "#fde68a", 20),
    roughness: 0.55,
  });
  const waterJetMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.78 });

  // Geometrias compartilhadas para carteiras + cadeiras atrás (alta performance via InstancedMesh!)
  const gDeskTop = new THREE.BoxGeometry(1.12, 0.05, 0.66);
  const gDeskLegV = new THREE.BoxGeometry(0.05, 0.74, 0.05);
  const gDeskFoot = new THREE.BoxGeometry(0.05, 0.04, 0.62);
  const gDeskBasket = new THREE.BoxGeometry(0.92, 0.14, 0.48);
  const gChairSeat = new THREE.BoxGeometry(0.48, 0.04, 0.44);
  const gChairBack = new THREE.BoxGeometry(0.48, 0.28, 0.04);
  const gChairLeg = new THREE.BoxGeometry(0.04, 0.44, 0.04);
  const gChairUp = new THREE.BoxGeometry(0.04, 0.42, 0.04);
  const gMonitor = new THREE.BoxGeometry(0.54, 0.36, 0.06);
  const gMonStand = new THREE.BoxGeometry(0.14, 0.14, 0.12);
  const gKeyboard = new THREE.BoxGeometry(0.44, 0.025, 0.16);
  const gCpu = new THREE.BoxGeometry(0.18, 0.38, 0.36);

  // 4 luzes estratégicas + luminárias fluorescentes em InstancedMesh ao longo dos 102m
  [-24.0, 2.0, 28.0, 54.0].forEach((lz) => {
    const ptC = new THREE.PointLight(0xffffff, 0.58, 52);
    ptC.position.set(0, 4.4, lz);
    etecInsideGroup.add(ptC);
  });
  const lampZs = [-30, -18, -6, 7, 16.5, 25, 37, 49, 60.5];
  const lampInst = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1.8, 0.08, 0.4),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc }),
    lampZs.length * 3
  );
  const _lampDummy = new THREE.Object3D();
  let lampIdx = 0;
  lampZs.forEach((lz) => {
    [-12.25, 0, 12.25].forEach((lx) => {
      _lampDummy.position.set(lx, 4.74, lz);
      _lampDummy.updateMatrix();
      lampInst.setMatrixAt(lampIdx++, _lampDummy.matrix);
    });
  });
  lampInst.instanceMatrix.needsUpdate = true;
  etecInsideGroup.add(lampInst);

  // Piso Geral Expandido (40m x 102m: x = -20..+20, z = -36..+66)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(40.4, 0.24, 102.4), floorMat);
  floor.position.set(0, -0.12, 15.0);
  floor.receiveShadow = true;
  etecInsideGroup.add(floor);

  // Piso claro no Corredor Principal amplo (9m de largura: x = -4.5..+4.5)
  const corridorFloor = new THREE.Mesh(new THREE.PlaneGeometry(9.0, 102.0), corridorTileMat);
  corridorFloor.rotation.x = -Math.PI / 2;
  corridorFloor.position.set(0, 0.012, 15.0);
  etecInsideGroup.add(corridorFloor);

  // Teto interno contínuo da ETEC (selado em y = 4.80, claro e sem vãos!)
  const ceilMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    emissive: 0xcbd5e1,
    emissiveIntensity: 0.35,
    roughness: 0.9,
    side: THREE.FrontSide,
  });
  const ceilMesh = new THREE.Mesh(new THREE.PlaneGeometry(40.6, 102.6), ceilMat);
  ceilMesh.rotation.x = Math.PI / 2;
  ceilMesh.position.set(0, 4.8, 15.0);
  etecInsideGroup.add(ceilMesh);

  // Paredes Externas contínuas (Norte, Oeste, Leste e Sul)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(40.4, 4.84, 0.3), hallWallMat);
  backWall.position.set(0, 2.42, -36.15);
  const redStripeBack = new THREE.Mesh(new THREE.BoxGeometry(40.2, 0.5, 0.34), cpsRedMat);
  redStripeBack.position.set(0, 4.18, -36.12);
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.84, 102.4), classGreenWallMat);
  leftWall.position.set(-20.15, 2.42, 15.0);
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.84, 102.4), classGreenWallMat);
  rightWall.position.set(20.15, 2.42, 15.0);
  const frontWall = new THREE.Mesh(
    new THREE.PlaneGeometry(40.4, 4.84),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85, side: THREE.FrontSide })
  );
  frontWall.rotation.y = Math.PI;
  frontWall.position.set(0, 2.42, 66.15);
  etecInsideGroup.add(backWall, redStripeBack, leftWall, rightWall, frontWall);

  // Corredor Horizontal Contínuo dedicado (z = 14.0..19.0, x = -20..+20) atravessando os DOIS lados!
  const fullCrossFloor = new THREE.Mesh(new THREE.PlaneGeometry(40.0, 5.0), corridorTileMat);
  fullCrossFloor.rotation.x = -Math.PI / 2;
  fullCrossFloor.position.set(0, 0.015, 16.5);
  etecInsideGroup.add(fullCrossFloor);

  // Janelões claros nas duas pontas do Corredor Horizontal (Oeste e Leste)
  const crossWinMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd });
  [-19.96, 19.96].forEach((wx) => {
    const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.45, 4.3), silverMat);
    winFrame.position.set(wx, 2.5, 16.5);
    const winPane = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.2, 4.0), crossWinMat);
    winPane.position.set(wx, 2.5, 16.5);
    const winBarH = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 4.1), silverMat);
    winBarH.position.set(wx, 2.5, 16.5);
    etecInsideGroup.add(winFrame, winPane, winBarH);
  });

  function addInteriorWall(cx, cz, w, d, mat = classGreenWallMat) {
    const wMesh = new THREE.Mesh(new THREE.BoxGeometry(w, 4.82, d), mat);
    wMesh.position.set(cx, 2.41, cz);
    wMesh.receiveShadow = true;
    etecInsideGroup.add(wMesh);
    addObstacleBox(cx, cz, w, d, etecInsideObstacles);
  }

  // Textura compartilhada p/ todas as TVs das salas & laboratórios (alta nitidez + zero peso extra!)
  const sharedRoomTvMat = new THREE.MeshBasicMaterial({
    map: createTvScreenTexture("ETECAMP • CPS", "Campo Limpo Paulista", "#38bdf8"),
  });

  // Helper de TV de parede detalhada (bezel fino, tela viva, soundbar inferior e suporte!)
  function addRoomWallTV(x, y, z, rotY = 0, scale = 1.0) {
    const tv = new THREE.Group();
    tv.position.set(x, y, z);
    tv.rotation.y = rotY;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.22 * scale, 1.28 * scale, 0.09), audFrameMat);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.04 * scale, 1.1 * scale), sharedRoomTvMat);
    screen.position.z = 0.052;
    const soundbar = new THREE.Mesh(new THREE.BoxGeometry(1.4 * scale, 0.11 * scale, 0.12), audFrameMat);
    soundbar.position.set(0, -0.74 * scale, 0.04);
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.02), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    led.position.set(0.86 * scale, -0.58 * scale, 0.052);
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.24, 0.1), silverMat);
    mount.position.z = -0.06;
    tv.add(frame, screen, soundbar, led, mount);
    etecInsideGroup.add(tv);
  }

  // Armários escolares CPS no Corredor Principal
  function addCorridorLockerBank(xWall, zCenter, count = 6) {
    const step = 0.72;
    const totalLen = count * step;
    const isEast = xWall > 0;
    const lx = xWall + (isEast ? -0.34 : 0.34);
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.54, 1.98, totalLen), lockerMat);
    body.position.set(lx, 0.99, zCenter);
    body.castShadow = true;
    etecInsideGroup.add(body);
    for (let i = 0; i < count; i++) {
      const dz = zCenter - totalLen * 0.5 + (i + 0.5) * step;
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.82, step - 0.06), lockerDoorMat);
      door.position.set(lx + (isEast ? -0.27 : 0.27), 0.99, dz);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.04), silverMat);
      handle.position.set(lx + (isEast ? -0.31 : 0.31), 1.05, dz + 0.18);
      etecInsideGroup.add(door, handle);
    }
    addObstacleBox(lx, zCenter, 0.6, totalLen + 0.08, etecInsideObstacles);
  }

  // Bancos de madeira e vasos de planta no corredor amplo
  function addCorridorBench(x, z, rotY = 0) {
    const bg = new THREE.Group();
    bg.position.set(x, 0, z);
    bg.rotation.y = rotY;
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.09, 0.54), chairWoodMat);
    seat.position.y = 0.46;
    seat.castShadow = true;
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.44, 0.48), audFrameMat);
    leg1.position.set(-0.82, 0.22, 0);
    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.44, 0.48), audFrameMat);
    leg2.position.set(0.82, 0.22, 0);
    bg.add(seat, leg1, leg2);
    etecInsideGroup.add(bg);
    const horiz = Math.abs(Math.sin(rotY)) > 0.7;
    addObstacleBox(x, z, horiz ? 0.65 : 2.2, horiz ? 2.2 : 0.65, etecInsideObstacles);
  }

  function addIndoorPlant(x, z) {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.48, 10), woodTrimMat);
    pot.position.set(x, 0.24, z);
    const bush = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.46, 1),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 })
    );
    bush.position.set(x, 0.78, z);
    etecInsideGroup.add(pot, bush);
    addObstacleBox(x, z, 0.6, 0.6, etecInsideObstacles);
  }

  // Pias enormes com várias torneiras de apertar
  function buildDrinkingSinkTrough(cx, cz, rotY = 0) {
    const grp = new THREE.Group();
    grp.position.set(cx, 0, cz);
    grp.rotation.y = rotY;
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.74, 0.72), hallWallMat);
    pedestal.position.y = 0.37;
    const basinRim = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.14, 0.84), silverMat);
    basinRim.position.y = 0.81;
    const basinWell = new THREE.Mesh(new THREE.BoxGeometry(3.25, 0.06, 0.6), labGranite);
    basinWell.position.y = 0.86;
    const splash = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.52, 0.1), silverMat);
    splash.position.set(0, 1.12, 0.36);
    grp.add(pedestal, basinRim, basinWell, splash);

    [-1.3, -0.65, 0, 0.65, 1.3].forEach((tx) => {
      const mount = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.08), silverMat);
      mount.position.set(tx, 1.16, 0.28);
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.22, 8), silverMat);
      spout.rotation.x = Math.PI / 3;
      spout.position.set(tx, 1.18, 0.16);
      const pushBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 8), cpsRedMat);
      pushBtn.position.set(tx, 1.28, 0.23);
      const waterStream = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.24, 0.032), waterJetMat);
      waterStream.position.set(tx, 1.0, 0.07);
      grp.add(mount, spout, pushBtn, waterStream);
    });

    etecInsideGroup.add(grp);
    addObstacleBox(cx, cz, 3.55, 0.92, etecInsideObstacles);
  }

  // Fila de carteiras/cadeiras/PCs para InstancedMesh (12 carteiras por sala!)
  const deskPlacements = [];
  function createPhotoDeskAndChair(x, z, withPC = false) {
    deskPlacements.push({ x, z, withPC });
    addObstacleBox(x, z + 0.22, 1.14, 1.18, etecInsideObstacles);
  }

  function flushInstancedDesks() {
    const n = deskPlacements.length;
    if (!n) return;
    const pcDesks = deskPlacements.filter((d) => d.withPC);
    const mPc = pcDesks.length;
    const dummy = new THREE.Object3D();

    const makeInst = (geo, mat, count, castShadow = false) => {
      const im = new THREE.InstancedMesh(geo, mat, count);
      im.castShadow = castShadow;
      im.receiveShadow = true;
      etecInsideGroup.add(im);
      return im;
    };

    const imTop = makeInst(gDeskTop, deskTopMat, n, true);
    const imLegV = makeInst(gDeskLegV, greenSteelMat, n * 2);
    const imFoot = makeInst(gDeskFoot, greenSteelMat, n * 2);
    const imBasket = makeInst(gDeskBasket, greenSteelMat, n);
    const imSeat = makeInst(gChairSeat, chairWoodMat, n);
    const imBack = makeInst(gChairBack, chairWoodMat, n);
    const imChairLeg = makeInst(gChairLeg, greenSteelMat, n * 4);
    const imChairUp = makeInst(gChairUp, greenSteelMat, n * 2);

    const setM = (im, idx, x, y, z) => {
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      im.setMatrixAt(idx, dummy.matrix);
    };

    let legIdx = 0, clIdx = 0, upIdx = 0;
    const cz = 0.56;
    for (let i = 0; i < n; i++) {
      const { x, z } = deskPlacements[i];
      setM(imTop, i, x, 0.76, z);
      setM(imBasket, i, x, 0.62, z);
      setM(imLegV, legIdx, x - 0.48, 0.38, z);
      setM(imFoot, legIdx++, x - 0.48, 0.02, z);
      setM(imLegV, legIdx, x + 0.48, 0.38, z);
      setM(imFoot, legIdx++, x + 0.48, 0.02, z);

      setM(imSeat, i, x, 0.45, z + cz);
      setM(imBack, i, x, 0.78, z + cz + 0.21);
      setM(imChairLeg, clIdx++, x - 0.21, 0.22, z + cz - 0.18);
      setM(imChairLeg, clIdx++, x + 0.21, 0.22, z + cz - 0.18);
      setM(imChairLeg, clIdx++, x - 0.21, 0.22, z + cz + 0.18);
      setM(imChairLeg, clIdx++, x + 0.21, 0.22, z + cz + 0.18);
      setM(imChairUp, upIdx++, x - 0.21, 0.65, z + cz + 0.21);
      setM(imChairUp, upIdx++, x + 0.21, 0.65, z + cz + 0.21);
    }
    [imTop, imLegV, imFoot, imBasket, imSeat, imBack, imChairLeg, imChairUp].forEach((im) => {
      im.instanceMatrix.needsUpdate = true;
    });

    if (mPc > 0) {
      const imMon = makeInst(gMonitor, pcScreenMat, mPc);
      const imStand = makeInst(gMonStand, pcCaseMat, mPc);
      const imKb = makeInst(gKeyboard, pcCaseMat, mPc);
      const imCpu = makeInst(gCpu, pcCaseMat, mPc);
      for (let i = 0; i < mPc; i++) {
        const { x, z } = pcDesks[i];
        setM(imMon, i, x - 0.08, 1.06, z - 0.14);
        setM(imStand, i, x - 0.08, 0.84, z - 0.14);
        setM(imKb, i, x - 0.08, 0.8, z + 0.14);
        setM(imCpu, i, x + 0.38, 0.98, z - 0.06);
      }
      [imMon, imStand, imKb, imCpu].forEach((im) => {
        im.instanceMatrix.needsUpdate = true;
      });
    }
  }

  // 8 Faixas Z bem espaçosas (12m/14m) + Corredor Horizontal (z = 14..19)
  const BAND_RANGES = [
    [-36, -24], // 0: Lab Info 24 / Sala 3AI (12m)
    [-24, -12], // 1: Lab Info 15 / Sala 2AI (12m)
    [-12, 0],   // 2: Lab Info 7  / Sala 1AI (12m)
    [0, 14],    // 3: Lab Química (14m) / Banheiros F/M (14m)
    [19, 31],   // 4: Lab Enfermagem / Sala 3A (12m) — abaixo do Corredor Horizontal (z = 14..19)
    [31, 43],   // 5: Auditório / Sala 2A (12m)
    [43, 55],   // 6: Sala Maker / Sala 1A (12m)
    [55, 66],   // 7: Refeitório ETECAMP / Sala dos Professores (11m)
  ];

  // Construtor de Salas, Labs, Auditório, Sala Maker, Sala dos Professores, Refeitório e Banheiros (15.5m largura!)
  function buildPhotoRoom({ side, bandIndex, code, subtitle, isComputerLab = false, customKind = null }) {
    const isWest = side === "west";
    const dir = isWest ? -1 : 1;
    const [zMin, zMax] = BAND_RANGES[bandIndex];
    const zCenter = (zMin + zMax) * 0.5;
    const roomW = 15.5;
    const xCenter = isWest ? -12.25 : 12.25;
    const corrX = isWest ? -4.5 : 4.5;
    const outerX = isWest ? -19.95 : 19.95;

    if (bandIndex === 4) {
      addInteriorWall(xCenter, zMin, roomW - 0.1, 0.26, classGreenWallMat);
    }
    if (bandIndex < 7) {
      addInteriorWall(xCenter, zMax, roomW - 0.1, 0.26, classGreenWallMat);
    }

    // --- SETOR ESPECIAL: BANHEIROS F/M (z = 0..14, x = 4.5..20.0 — fiel ao croqui!) ---
    if (customKind === "open_restrooms") {
      const zLeftWall = zMin + 3.8;   // 3.8
      const zMuro = zMin + 7.0;       // 7.0
      const zRightWall = zMin + 10.2; // 10.2

      const vestibuleFloor = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 6.4), corridorTileMat);
      vestibuleFloor.rotation.x = -Math.PI / 2;
      vestibuleFloor.position.set(6.3, 0.015, zMuro);
      etecInsideGroup.add(vestibuleFloor);

      const bathCenterFloor = new THREE.Mesh(new THREE.PlaneGeometry(12.0, 6.4), bathroomTileMat);
      bathCenterFloor.rotation.x = -Math.PI / 2;
      bathCenterFloor.position.set(14.0, 0.014, zMuro);
      const bathFemFloor = new THREE.Mesh(new THREE.PlaneGeometry(roomW, 3.8), bathroomTileMat);
      bathFemFloor.rotation.x = -Math.PI / 2;
      bathFemFloor.position.set(xCenter, 0.014, zMin + 1.9);
      const bathMascFloor = new THREE.Mesh(new THREE.PlaneGeometry(roomW, 3.8), bathroomTileMat);
      bathMascFloor.rotation.x = -Math.PI / 2;
      bathMascFloor.position.set(xCenter, 0.014, zRightWall + 1.9);
      etecInsideGroup.add(bathCenterFloor, bathFemFloor, bathMascFloor);

      addInteriorWall(corrX, zMin + 1.9, 0.26, 3.8, hallWallMat);
      addInteriorWall(corrX, zRightWall + 1.9, 0.26, 3.8, hallWallMat);

      // Paredes internas deixando entradas largas de 3.4m no fundo (x = 16.6..20.0)
      addInteriorWall(10.55, zLeftWall, 12.1, 0.26, hallWallMat);
      addInteriorWall(10.55, zRightWall, 12.1, 0.26, hallWallMat);

      // Muro central encostado na parede do fundo (x = 20.0) até x = 8.0
      addInteriorWall(14.0, zMuro, 12.0, 0.32, hallWallMat);

      // Duas pias grandes com torneiras + espelhos
      buildDrinkingSinkTrough(11.8, zLeftWall + 0.56, Math.PI);
      const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.95, 0.04), silverMat);
      mirrorL.position.set(11.8, 1.72, zLeftWall + 0.16);
      etecInsideGroup.add(mirrorL);

      buildDrinkingSinkTrough(11.8, zRightWall - 0.56, 0);
      const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.95, 0.04), silverMat);
      mirrorR.position.set(11.8, 1.72, zRightWall - 0.16);
      etecInsideGroup.add(mirrorR);

      // Cabines Feminino (Esquerda)
      [6.4, 8.4, 10.4, 12.4, 14.4].forEach((sx, idx) => {
        const part = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.0, 1.45), hallWallMat);
        part.position.set(sx - 0.92, 1.0, zMin + 0.85);
        const toilet = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.44, 0.6), nurseWhiteMat);
        toilet.position.set(sx, 0.22, zMin + 0.72);
        const tank = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.22), nurseWhiteMat);
        tank.position.set(sx, 0.62, zMin + 0.42);
        etecInsideGroup.add(part, toilet, tank);
        if (idx % 2 === 1) addObstacleBox(sx - 0.4, zMin + 0.85, 1.9, 1.45, etecInsideObstacles);
      });

      // Cabines + mictórios Masculino (Direita)
      [6.4, 8.4, 10.4].forEach((sx) => {
        const part = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.0, 1.45), hallWallMat);
        part.position.set(sx - 0.92, 1.0, zMax - 0.85);
        const toilet = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.44, 0.6), nurseWhiteMat);
        toilet.position.set(sx, 0.22, zMax - 0.72);
        const tank = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.48, 0.22), nurseWhiteMat);
        tank.position.set(sx, 0.62, zMax - 0.42);
        etecInsideGroup.add(part, toilet, tank);
        addObstacleBox(sx, zMax - 0.85, 1.4, 1.45, etecInsideObstacles);
      });
      [12.4, 13.7, 15.0].forEach((ux) => {
        const uri = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.72, 0.32), nurseWhiteMat);
        uri.position.set(ux, 0.88, zMax - 0.3);
        etecInsideGroup.add(uri);
      });

      const femPlaque = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.34, 1.15),
        new THREE.MeshBasicMaterial({ map: createWoodSignTexture("FEMININO", "← Esquerda", "#9d174d", "#ffffff") })
      );
      femPlaque.position.set(corrX - 0.17, 3.15, zLeftWall - 0.9);
      const mascPlaque = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.34, 1.15),
        new THREE.MeshBasicMaterial({ map: createWoodSignTexture("MASCULINO", "Direita →", "#1e40af", "#ffffff") })
      );
      mascPlaque.position.set(corrX - 0.17, 3.15, zRightWall + 0.9);
      etecInsideGroup.add(femPlaque, mascPlaque);
      return;
    }

    const roomZMax = zMax;
    const roomZCenter = zCenter;

    // Parede do Corredor com porta alta de 3.45m + verga até o teto (4.82m)
    const doorZ1 = zMin + 1.0;
    const doorZ2 = zMin + 3.8;
    const doorMidZ = (doorZ1 + doorZ2) * 0.5;
    addInteriorWall(corrX, zMin + 0.5, 0.26, 1.0, hallWallMat);
    addInteriorWall(corrX, (doorZ2 + roomZMax) * 0.5, 0.26, roomZMax - doorZ2, hallWallMat);

    const doorHeaderWall = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.37, doorZ2 - doorZ1), hallWallMat);
    doorHeaderWall.position.set(corrX, 4.135, doorMidZ);
    doorHeaderWall.receiveShadow = true;
    const doorFrameTop = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, doorZ2 - doorZ1 + 0.06), woodTrimMat);
    doorFrameTop.position.set(corrX, 3.45, doorMidZ);
    etecInsideGroup.add(doorHeaderWall, doorFrameTop);

    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(1.18, 3.38, 0.08), blueDoorMat);
    doorPanel.position.set(corrX + (isWest ? -0.66 : 0.66), 1.69, doorZ1 + 0.08);
    const doorVision = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.85, 0.095),
      new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.15, metalness: 0.2 })
    );
    doorVision.position.set(corrX + (isWest ? -0.78 : 0.78), 2.25, doorZ1 + 0.08);
    const doorKick = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.24, 0.09), silverMat);
    doorKick.position.set(corrX + (isWest ? -0.66 : 0.66), 0.14, doorZ1 + 0.08);
    const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.15), silverMat);
    doorHandle.position.set(corrX + (isWest ? -1.02 : 1.02), 1.48, doorZ1 + 0.12);
    const jamb1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.45, 0.08), woodTrimMat);
    jamb1.position.set(corrX, 1.725, doorZ1 + 0.02);
    const jamb2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.45, 0.08), woodTrimMat);
    jamb2.position.set(corrX, 1.725, doorZ2 - 0.02);
    etecInsideGroup.add(doorPanel, doorVision, doorKick, doorHandle, jamb1, jamb2);

    const plaqueBg =
      isComputerLab ? "#1e3a8a" :
      customKind === "chem" ? "#0f766e" :
      customKind === "nurse" ? "#065f46" :
      customKind === "auditorium" ? "#1e40af" :
      customKind === "maker" ? "#7c2d12" :
      customKind === "refeitorio" ? "#991b1b" :
      customKind === "teachers" ? "#4c1d95" : "#14532d";

    const hallPlaque = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.36, 1.32),
      new THREE.MeshBasicMaterial({ map: createWoodSignTexture(code, subtitle, plaqueBg, "#fef08a") })
    );
    hallPlaque.position.set(corrX + (isWest ? 0.17 : -0.17), 3.9, doorMidZ);
    etecInsideGroup.add(hallPlaque);

    // ===================== REFEITÓRIO DA ETECAMP (ANTIGA CANTINA — CARDÁPIO POR DIA DA SEMANA!) =====================
    if (customKind === "refeitorio") {
      const refFloor = new THREE.Mesh(new THREE.PlaneGeometry(roomW - 0.3, zMax - zMin - 0.2), refeitorioTileMat);
      refFloor.rotation.x = -Math.PI / 2;
      refFloor.position.set(xCenter, 0.014, zCenter);
      etecInsideGroup.add(refFloor);

      // TV na parede oeste do Refeitório
      addRoomWallTV(outerX + 0.16, 2.7, zCenter, Math.PI / 2, 1.15);

      // Balcão comprido de servir merenda na parede Norte (x = -14.2, z = 57.2) + vidro protetor + geladeira industrial!
      const cX = xCenter - dir * 1.4; // -13.65
      const cZ = zMin + 2.1; // 57.1
      const counterBase = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.02, 1.35), cpsRedMat);
      counterBase.position.set(cX, 0.51, cZ);
      counterBase.castShadow = true;
      const counterTop = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.1, 1.48), silverMat);
      counterTop.position.set(cX, 1.06, cZ);
      const sneezeGlass = new THREE.Mesh(
        new THREE.BoxGeometry(6.8, 0.55, 0.06),
        new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.38, roughness: 0.1 })
      );
      sneezeGlass.position.set(cX, 1.42, cZ + 0.55);
      etecInsideGroup.add(counterBase, counterTop, sneezeGlass);
      addObstacleBox(cX, cZ, 7.4, 1.5, etecInsideObstacles);

      // Geladeira de inox & armário de bandejas no fundo
      const fridge = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 1.1), silverMat);
      fridge.position.set(outerX + 1.1, 1.2, zMin + 1.0);
      etecInsideGroup.add(fridge);
      addObstacleBox(outerX + 1.1, zMin + 1.0, 1.5, 1.2, etecInsideObstacles);

      // Vitrine 3D DINÂMICA da Merenda do Dia sobre o balcão!
      refeitorioDisplay = new THREE.Group();
      refeitorioDisplay.position.set(cX, 1.12, cZ);

      // 1) Seg/Ter: Pilha de Bolachas (Madeira Prensada) + Copos de Leite c/ Chocolate
      const monTueGrp = new THREE.Group();
      const woodCrackerMat = new THREE.MeshStandardMaterial({ color: 0xb6895b, roughness: 0.96 });
      const cupWMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const chocoM = new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.25 });
      [-1.8, -0.4, 1.0].forEach((ox) => {
        const tray = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.65), audFrameMat);
        tray.position.set(ox, 0.02, 0);
        monTueGrp.add(tray);
        for (let b = 0; b < 4; b++) {
          const plank = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.24), woodCrackerMat);
          plank.position.set(ox - 0.18, 0.06 + b * 0.045, 0);
          monTueGrp.add(plank);
        }
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.085, 0.24, 12), cupWMat);
        cup.position.set(ox + 0.22, 0.16, 0);
        const liq = new THREE.Mesh(new THREE.CylinderGeometry(0.098, 0.098, 0.02, 12), chocoM);
        liq.position.set(ox + 0.22, 0.27, 0);
        monTueGrp.add(cup, liq);
      });

      // Helper para Pote Circular Pequeno + Colher Azul (usado Quarta e Quinta!)
      const buildSmallBowlShowcase = (fillHex, hasCereal) => {
        const grp = new THREE.Group();
        const bMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
        const fMat = new THREE.MeshStandardMaterial({ color: fillHex, roughness: 0.35 });
        const sMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.35 });
        const cMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });
        [-1.8, -0.4, 1.0, 2.2].forEach((ox) => {
          const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 0.14, 14), bMat);
          bowl.position.set(ox, 0.07, 0);
          const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.03, 14), fMat);
          fill.position.set(ox, 0.13, 0);
          const sp = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.26, 0.018), sMat);
          sp.position.set(ox + 0.12, 0.2, 0.02);
          sp.rotation.z = -0.5;
          grp.add(bowl, fill, sp);
          if (hasCereal) {
            [[-0.06, 0.03], [0.05, -0.04], [0, 0.02], [-0.04, -0.05]].forEach(([fx, fz]) => {
              const flk = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.018, 0.04), cMat);
              flk.position.set(ox + fx, 0.15, fz);
              grp.add(flk);
            });
          }
        });
        return grp;
      };

      const wedGrp = buildSmallBowlShowcase(0xf8fafc, true);
      const thuCanjicaGrp = buildSmallBowlShowcase(0xfef3c7, false);
      const thuArrozGrp = buildSmallBowlShowcase(0xf5efe6, false);

      // 5) Sexta: Bolo de Cenoura Recheado com Chocolate!
      const friGrp = new THREE.Group();
      const cOr = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.78 });
      const cCh = new THREE.MeshStandardMaterial({ color: 0x3f1d0b, roughness: 0.32 });
      [-1.5, 0.2, 1.8].forEach((ox) => {
        const pan = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.05, 0.72), silverMat);
        pan.position.set(ox, 0.025, 0);
        const bot = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.1, 0.56), cOr);
        bot.position.set(ox, 0.1, 0);
        const mid = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.05, 0.58), cCh);
        mid.position.set(ox, 0.175, 0);
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.1, 0.56), cOr);
        top.position.set(ox, 0.25, 0);
        const glaze = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.045, 0.6), cCh);
        glaze.position.set(ox, 0.32, 0);
        friGrp.add(pan, bot, mid, top, glaze);
      });

      refeitorioDisplay.add(monTueGrp, wedGrp, thuCanjicaGrp, thuArrozGrp, friGrp);
      refeitorioDisplay.userData = { monTueGrp, wedGrp, thuCanjicaGrp, thuArrozGrp, friGrp };
      etecInsideGroup.add(refeitorioDisplay);

      // 3 mesas longas de refeitório com bancos dos dois lados!
      [zMin + 5.2, zMin + 7.5, zMin + 9.7].forEach((tz) => {
        const tbl = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.09, 1.15), deskTopMat);
        tbl.position.set(xCenter - 0.5, 0.78, tz);
        tbl.castShadow = true;
        const b1 = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.07, 0.36), chairWoodMat);
        b1.position.set(xCenter - 0.5, 0.45, tz - 0.85);
        const b2 = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.07, 0.36), chairWoodMat);
        b2.position.set(xCenter - 0.5, 0.45, tz + 0.85);
        [-2.8, 2.8].forEach((lx) => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.76, 1.9), greenSteelMat);
          leg.position.set(xCenter - 0.5 + lx, 0.38, tz);
          etecInsideGroup.add(leg);
        });
        etecInsideGroup.add(tbl, b1, b2);
        addObstacleBox(xCenter - 0.5, tz, 6.9, 2.05, etecInsideObstacles);
      });
      return;
    }

    // ===================== SALA MAKER (SALA DE ESTUDO COLABORATIVA: MESAS RETANGULARES, MESAS CIRCULARES, MESA DO PROFESSOR & TV!) =====================
    if (customKind === "maker") {
      // Acabamento de sala de estudo normal (parede verde frontal, frisos de madeira, lousa, relógio, TV na parede & ventilador)
      const frontGreenM = new THREE.Mesh(new THREE.PlaneGeometry(roomW - 0.2, 4.8), classGreenWallMat);
      frontGreenM.position.set(xCenter, 2.4, zMin + 0.16);
      const trimFrontM = new THREE.Mesh(new THREE.BoxGeometry(roomW - 0.2, 0.13, 0.06), woodTrimMat);
      trimFrontM.position.set(xCenter, 0.96, zMin + 0.18);
      const trimOuterM = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, roomZMax - zMin - 0.4), woodTrimMat);
      trimOuterM.position.set(outerX + 0.05, 0.96, roomZCenter);
      const trimBackM = new THREE.Mesh(new THREE.BoxGeometry(roomW - 0.2, 0.13, 0.06), woodTrimMat);
      trimBackM.position.set(xCenter, 0.96, roomZMax - 0.18);
      etecInsideGroup.add(frontGreenM, trimFrontM, trimOuterM, trimBackM);

      // Lousa Branca com bandeja/apagador + Relógio + TV de parede ao lado!
      const mWbX = xCenter + 1.4;
      const wbFrameM = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 0.08), silverMat);
      wbFrameM.position.set(mWbX, 2.2, zMin + 0.22);
      const wbSurfM = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.34), whiteboardMat);
      wbSurfM.position.set(mWbX, 2.2, zMin + 0.27);
      const wbTrayM = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.06, 0.14), silverMat);
      wbTrayM.position.set(mWbX, 1.44, zMin + 0.3);
      const clockRimM = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 16), audFrameMat);
      clockRimM.rotation.x = Math.PI / 2;
      clockRimM.position.set(mWbX, 3.42, zMin + 0.24);
      const clockFaceM = new THREE.Mesh(new THREE.CircleGeometry(0.21, 16), whiteboardMat);
      clockFaceM.position.set(mWbX, 3.42, zMin + 0.275);
      etecInsideGroup.add(wbFrameM, wbSurfM, wbTrayM, clockRimM, clockFaceM);

      addRoomWallTV(xCenter - 3.6, 2.42, zMin + 0.24, 0, 1.08);

      // Quadro de avisos + Armário + Lixeira + Ventilador de parede
      const noticeM = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, 1.9), whiteboardMat);
      noticeM.position.set(outerX + 0.08, 2.1, zCenter - 1.2);
      const roomCabM = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.95, 1.5), lockerMat);
      roomCabM.position.set(outerX + 0.45, 0.975, zMax - 1.4);
      const trashM = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.48, 8), audFrameMat);
      trashM.position.set(corrX - 0.65, 0.24, zMax - 0.75);
      etecInsideGroup.add(noticeM, roomCabM, trashM);
      addObstacleBox(outerX + 0.45, zMax - 1.4, 0.8, 1.6, etecInsideObstacles);

      // Mesa do Professor completa na frente da Sala Maker
      const mPdX = xCenter - 4.4;
      const mPdZ = zMin + 2.1;
      const mProfTop = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.08, 0.88), deskTopMat);
      mProfTop.position.set(mPdX, 0.78, mPdZ);
      mProfTop.castShadow = true;
      const mProfFront = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.68, 0.08), chairWoodMat);
      mProfFront.position.set(mPdX, 0.4, mPdZ + 0.36);
      [-0.86, 0.86].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.8), greenSteelMat);
        leg.position.set(mPdX + lx, 0.38, mPdZ);
        etecInsideGroup.add(leg);
      });
      const mLapB = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.03, 0.34), audFrameMat);
      mLapB.position.set(mPdX - 0.32, 0.835, mPdZ);
      const mLapT = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.03), pcScreenMat);
      mLapT.position.set(mPdX - 0.32, 0.98, mPdZ + 0.16);
      const mProfChairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.07, 0.5), audBlueMat);
      mProfChairSeat.position.set(mPdX, 0.46, mPdZ - 0.62);
      const mProfChairBack = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.5, 0.07), audBlueMat);
      mProfChairBack.position.set(mPdX, 0.74, mPdZ - 0.85);
      etecInsideGroup.add(mProfTop, mProfFront, mLapB, mLapT, mProfChairSeat, mProfChairBack);
      addObstacleBox(mPdX, mPdZ, 1.95, 0.95, etecInsideObstacles);

      // Materiais distintos para as mesas e cadeiras modernas da Sala Maker!
      const makerTableTopMat = new THREE.MeshStandardMaterial({
        map: createWoodPlankTexture("#d8b88a", "#b08b57", 2, 1),
        roughness: 0.52,
      });
      const makerLegMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.55, roughness: 0.38 });
      const makerChairColors = [0x0284c7, 0x0f766e, 0xea580c, 0x2563eb];

      const addMakerChair = (cx, cz, rotY, colorHex) => {
        const ch = new THREE.Group();
        ch.position.set(cx, 0, cz);
        ch.rotation.y = rotY;
        const cMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.52 });
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.46), cMat);
        seat.position.y = 0.46;
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.38, 0.06), cMat);
        back.position.set(0, 0.74, -0.21);
        [[-0.2, -0.19], [0.2, -0.19], [-0.2, 0.19], [0.2, 0.19]].forEach(([lx, lz]) => {
          const l = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.02, 0.46, 6), makerLegMat);
          l.position.set(lx, 0.23, lz);
          ch.add(l);
        });
        ch.add(seat, back);
        etecInsideGroup.add(ch);
      };

      // 4 MESAS RETANGULARES GRANDES p/ grupos de 6 alunos (o que mais tem na Sala Maker!)
      [
        [xCenter - 3.6, zMin + 5.2],
        [xCenter + 2.6, zMin + 5.2],
        [xCenter - 3.6, zMin + 9.2],
        [xCenter + 2.6, zMin + 9.2],
      ].forEach(([tx, tz], ti) => {
        const tW = 3.55;
        const tD = 1.25;
        const top = new THREE.Mesh(new THREE.BoxGeometry(tW, 0.08, tD), makerTableTopMat);
        top.position.set(tx, 0.77, tz);
        top.castShadow = true;
        top.receiveShadow = true;
        const frame = new THREE.Mesh(new THREE.BoxGeometry(tW - 0.2, 0.08, tD - 0.2), makerLegMat);
        frame.position.set(tx, 0.7, tz);
        etecInsideGroup.add(top, frame);
        [[-1.6, -0.5], [1.6, -0.5], [-1.6, 0.5], [1.6, 0.5]].forEach(([lx, lz]) => {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 0.08), makerLegMat);
          leg.position.set(tx + lx, 0.36, tz + lz);
          etecInsideGroup.add(leg);
        });
        // 6 cadeiras modernas (3 em cada lado comprido)
        [-1.12, 0, 1.12].forEach((ox, ci) => {
          const col = makerChairColors[(ti + ci) % makerChairColors.length];
          addMakerChair(tx + ox, tz - 0.84, 0, col);
          addMakerChair(tx + ox, tz + 0.84, Math.PI, col);
        });
        addObstacleBox(tx, tz, tW + 0.15, tD + 0.9, etecInsideObstacles);
      });

      // 2 MESAS CIRCULARES GRANDES p/ grupos de 5 alunos (bem espaçadas na faixa central/lateral!)
      [
        [xCenter - 0.5, zMin + 3.0],
        [xCenter - 0.5, zMin + 7.2],
      ].forEach(([cx, cz], ci) => {
        const rad = 1.02;
        const top = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, 0.08, 22), makerTableTopMat);
        top.position.set(cx, 0.77, cz);
        top.castShadow = true;
        top.receiveShadow = true;
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.73, 12), makerLegMat);
        ped.position.set(cx, 0.365, cz);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.56, 0.05, 16), makerLegMat);
        foot.position.set(cx, 0.025, cz);
        etecInsideGroup.add(top, ped, foot);
        // 5 cadeiras distribuídas ao redor da mesa circular
        for (let k = 0; k < 5; k++) {
          const ang = (k / 5) * Math.PI * 2 + ci * 0.4;
          const chX = cx + Math.sin(ang) * (rad + 0.34);
          const chZ = cz + Math.cos(ang) * (rad + 0.34);
          addMakerChair(chX, chZ, ang + Math.PI, makerChairColors[(ci + k) % makerChairColors.length]);
        }
        addObstacleBox(cx, cz, rad * 2 + 0.5, rad * 2 + 0.5, etecInsideObstacles);
      });
      return;
    }

    // ===================== SALA DOS PROFESSORES (MESA DE REUNIÃO, CAFÉ, SOFÁ, ARMÁRIOS & TV!) =====================
    if (customKind === "teachers") {
      const tFloor = new THREE.Mesh(new THREE.PlaneGeometry(roomW - 0.3, zMax - zMin - 0.2), corridorTileMat);
      tFloor.rotation.x = -Math.PI / 2;
      tFloor.position.set(xCenter, 0.014, zCenter);
      etecInsideGroup.add(tFloor);

      // TV + Quadro de avisos na parede Norte
      addRoomWallTV(xCenter - 2.2, 2.45, zMin + 0.24, 0, 1.1);
      const cork = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.3, 0.08), woodTrimMat);
      cork.position.set(xCenter + 2.4, 2.2, zMin + 0.22);
      etecInsideGroup.add(cork);

      // Grande mesa de reuniões central com 8 cadeiras
      const mtX = xCenter - 0.8;
      const mtZ = zCenter + 0.5;
      const meetTop = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.1, 2.0), chairWoodMat);
      meetTop.position.set(mtX, 0.82, mtZ);
      meetTop.castShadow = true;
      [-2.3, 2.3].forEach((lx) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.8, 1.6), audFrameMat);
        leg.position.set(mtX + lx, 0.4, mtZ);
        etecInsideGroup.add(leg);
      });
      etecInsideGroup.add(meetTop);
      addObstacleBox(mtX, mtZ, 6.4, 2.2, etecInsideObstacles);

      [-2.2, -0.75, 0.75, 2.2].forEach((cx) => {
        [-1.32, 1.32].forEach((czOff) => {
          const ch = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.46, 0.52), audBlueMat);
          ch.position.set(mtX + cx, 0.23, mtZ + czOff);
          const bk = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.52, 0.1), audBlueMat);
          bk.position.set(mtX + cx, 0.72, mtZ + czOff + (czOff > 0 ? 0.22 : -0.22));
          etecInsideGroup.add(ch, bk);
        });
      });

      // Cantinho do Café + Armários dos Professores na parede Leste (outerX = +19.95)
      const cofDesk = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.92, 3.6), hallWallMat);
      cofDesk.position.set(outerX - 0.65, 0.46, zMin + 2.8);
      const cofMach = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.52, 0.42), audFrameMat);
      cofMach.position.set(outerX - 0.65, 1.18, zMin + 2.2);
      const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.05, 0.55), nurseWhiteMat);
      cooler.position.set(outerX - 0.65, 0.525, zMin + 5.2);
      const jug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.55, 10),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
      );
      jug.position.set(outerX - 0.65, 1.32, zMin + 5.2);
      const tLockers = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.1, 3.6), lockerMat);
      tLockers.position.set(outerX - 0.55, 1.05, zMin + 8.4);
      etecInsideGroup.add(cofDesk, cofMach, cooler, jug, tLockers);
      addObstacleBox(outerX - 0.65, zCenter, 1.15, 9.2, etecInsideObstacles);

      // Sofá confortável no fundo Sul
      const sofa = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.52, 1.05), audBlueMat);
      sofa.position.set(xCenter - 2.2, 0.26, zMax - 0.9);
      const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.68, 0.22), audBlueMat);
      sofaBack.position.set(xCenter - 2.2, 0.72, zMax - 0.45);
      etecInsideGroup.add(sofa, sofaBack);
      addObstacleBox(xCenter - 2.2, zMax - 0.9, 3.5, 1.15, etecInsideObstacles);
      return;
    }

    // ===================== AUDITÓRIO ETECAMP =====================
    if (customKind === "auditorium") {
      const audFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(roomW - 0.3, zMax - zMin - 0.3),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.78 })
      );
      audFloor.rotation.x = -Math.PI / 2;
      audFloor.position.set(xCenter, 0.015, zCenter);
      etecInsideGroup.add(audFloor);

      const audWallGreen = new THREE.Mesh(new THREE.PlaneGeometry(roomW - 0.2, 4.8), classGreenWallMat);
      audWallGreen.position.set(xCenter, 2.4, zMin + 0.16);
      etecInsideGroup.add(audWallGreen);

      // Palco de madeira elevado + púlpito + painéis acústicos laterais + TV gigante + caixas de som!
      const audStage = new THREE.Mesh(new THREE.BoxGeometry(roomW - 0.8, 0.26, 2.6), chairWoodMat);
      audStage.position.set(xCenter, 0.13, zMin + 1.45);
      audStage.receiveShadow = true;
      const podium = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.15, 0.65), woodTrimMat);
      podium.position.set(xCenter + 4.4, 0.82, zMin + 2.0);
      [-4.4, 4.4].forEach((px) => {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 0.08), woodTrimMat);
        panel.position.set(xCenter + px, 2.45, zMin + 0.2);
        etecInsideGroup.add(panel);
      });
      etecInsideGroup.add(audStage, podium);

      // TV gigante centralizada + caixas de som
      const tvFrame = new THREE.Mesh(new THREE.BoxGeometry(4.6, 2.3, 0.14), audFrameMat);
      tvFrame.position.set(xCenter, 2.55, zMin + 0.26);
      const tvScreen = new THREE.Mesh(new THREE.PlaneGeometry(4.3, 2.02), pcScreenMat);
      tvScreen.position.set(xCenter, 2.55, zMin + 0.34);
      const mediaRack = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.56, 0.55), audFrameMat);
      mediaRack.position.set(xCenter, 0.28, zMin + 0.55);
      [-3.1, 3.1].forEach((sx) => {
        const spk = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.45, 0.55), audFrameMat);
        spk.position.set(xCenter + sx, 0.725, zMin + 0.65);
        etecInsideGroup.add(spk);
      });
      etecInsideGroup.add(tvFrame, tvScreen, mediaRack);
      addObstacleBox(xCenter, zMin + 0.55, 6.8, 0.7, etecInsideObstacles);

      const rowZList = [zMin + 4.3, zMin + 6.0, zMin + 7.7, zMin + 9.4];
      [xCenter - 4.0, xCenter + 4.0].forEach((bankX) => {
        rowZList.forEach((rz) => {
          const bank = new THREE.Group();
          bank.position.set(bankX, 0, rz);
          const linkBar = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.09, 0.1), audFrameMat);
          linkBar.position.set(0, 0.35, 0.02);
          bank.add(linkBar);
          [-1.8, 1.8].forEach((lx) => {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.44), audFrameMat);
            leg.position.set(lx, 0.17, 0.02);
            bank.add(leg);
          });
          [-1.65, -0.55, 0.55, 1.65].forEach((sx) => {
            const seat = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.52), audBlueMat);
            seat.position.set(sx, 0.46, 0);
            const back = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.68, 0.1), audBlueMat);
            back.position.set(sx, 0.86, 0.22);
            bank.add(seat, back);
          });
          etecInsideGroup.add(bank);
          addObstacleBox(bankX, rz + 0.04, 4.5, 0.68, etecInsideObstacles);
        });
      });
      return;
    }

    // ===================== SALAS DE AULA & LABORATÓRIOS (COM TV EM TODAS + MAIS CARTEIRAS!) =====================
    const frontGreen = new THREE.Mesh(new THREE.PlaneGeometry(roomW - 0.2, 4.8), classGreenWallMat);
    frontGreen.position.set(xCenter, 2.4, zMin + 0.16);
    etecInsideGroup.add(frontGreen);

    const trimFront = new THREE.Mesh(new THREE.BoxGeometry(roomW - 0.2, 0.13, 0.06), woodTrimMat);
    trimFront.position.set(xCenter, 0.96, zMin + 0.18);
    const trimOuterLen = roomZMax - zMin - 0.4;
    const trimOuter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, trimOuterLen), woodTrimMat);
    trimOuter.position.set(outerX + (isWest ? 0.05 : -0.05), 0.96, roomZCenter);
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(roomW - 0.2, 0.13, 0.06), woodTrimMat);
    trimBack.position.set(xCenter, 0.96, roomZMax - 0.18);
    etecInsideGroup.add(trimFront, trimOuter, trimBack);

    // Lousa Branca + TV de parede ao lado em TODAS as salas e laboratórios!
    const wbX = xCenter - dir * 1.4;
    const wbFrame = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.55, 0.08), silverMat);
    wbFrame.position.set(wbX, 2.2, zMin + 0.22);
    const wbSurface = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.38), whiteboardMat);
    wbSurface.position.set(wbX, 2.2, zMin + 0.27);
    const wbTray = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.14), silverMat);
    wbTray.position.set(wbX, 1.42, zMin + 0.3);
    const wbEraser = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.09), audBlueMat);
    wbEraser.position.set(wbX - 0.85, 1.48, zMin + 0.31);
    const wbPen1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6), cpsRedMat);
    wbPen1.rotation.z = Math.PI / 2;
    wbPen1.position.set(wbX + 0.25, 1.46, zMin + 0.31);
    const wbPen2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6), audFrameMat);
    wbPen2.rotation.z = Math.PI / 2;
    wbPen2.position.set(wbX + 0.62, 1.46, zMin + 0.31);
    // Relógio escolar redondo acima da lousa
    const clockRim = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.06, 16), audFrameMat);
    clockRim.rotation.x = Math.PI / 2;
    clockRim.position.set(wbX, 3.45, zMin + 0.24);
    const clockFace = new THREE.Mesh(new THREE.CircleGeometry(0.22, 16), whiteboardMat);
    clockFace.position.set(wbX, 3.45, zMin + 0.275);
    etecInsideGroup.add(wbFrame, wbSurface, wbTray, wbEraser, wbPen1, wbPen2, clockRim, clockFace);

    addRoomWallTV(xCenter + dir * 3.6, 2.45, zMin + 0.24, 0, 1.08);

    const noticeBoard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, 1.9), whiteboardMat);
    noticeBoard.position.set(outerX + (isWest ? 0.08 : -0.08), 2.1, zCenter - 1.2);
    etecInsideGroup.add(noticeBoard);

    // Ventilador de parede giratório
    const fanX = outerX + (isWest ? 0.36 : -0.36);
    const fanZ = zMin + 1.25;
    const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 6), silverMat);
    conduit.position.set(fanX, 2.0, fanZ);
    const switchBox = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.14), silverMat);
    switchBox.position.set(fanX, 1.55, fanZ);
    const fanGrate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 14), orangeGrateMat);
    fanGrate.rotation.z = Math.PI / 2;
    fanGrate.position.set(fanX + (isWest ? 0.18 : -0.18), 3.18, fanZ);
    const fanSpinner = new THREE.Group();
    fanSpinner.position.copy(fanGrate.position);
    for (let b = 0; b < 3; b++) {
      const bl = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.34, 0.08), fanBladeMat);
      bl.rotation.x = (b * Math.PI * 2) / 3;
      fanSpinner.add(bl);
    }
    classroomFans.push(fanSpinner);
    etecInsideGroup.add(conduit, switchBox, fanGrate, fanSpinner);

    if (customKind === "chem") {
      // Lab Química ampliado (15.5m x 14m): Bancada NPK do Kaio + 2 bancadas de alunos + capela + armário reagentes
      const reagentCab = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 0.75), labGranite);
      reagentCab.position.set(xCenter - dir * 3.0, 1.1, roomZMax - 0.72);
      etecInsideGroup.add(reagentCab);
      addObstacleBox(xCenter - dir * 3.0, roomZMax - 0.72, 3.3, 0.85, etecInsideObstacles);

      // Bancada Química NPK interativa em (-15.2, 0, 3.0)!
      const benchX = -15.2;
      const benchZ = 3.0;
      const chemBench = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.02, 1.4), labGranite);
      chemBench.position.set(benchX, 0.51, benchZ);
      etecInsideGroup.add(chemBench);
      addObstacleBox(benchX, benchZ, 4.9, 1.5, etecInsideObstacles);
      [
        [benchX - 1.6, 0x38bdf8],
        [benchX - 0.8, 0x4ade80],
        [benchX, 0xec4899],
        [benchX + 0.8, 0xa855f7],
        [benchX + 1.6, 0xfacc15],
      ].forEach(([fx, col]) => {
        const flask = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.18, 0.44, 10),
          new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.35 })
        );
        flask.position.set(fx, 1.24, benchZ);
        etecInsideGroup.add(flask);
      });

      // 2 bancadas extras de laboratório p/ os alunos de Química
      [7.4, 10.6].forEach((lz) => {
        const stuBench = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.94, 1.3), labGranite);
        stuBench.position.set(xCenter, 0.47, lz);
        etecInsideGroup.add(stuBench);
        addObstacleBox(xCenter, lz, 6.5, 1.4, etecInsideObstacles);
      });
      return;
    }

    if (customKind === "nurse") {
      // Lab Enfermagem ampliado: 2 macas hospitalares (principal em -11.2, 0, 27.4), armários médicos e mesa de triagem
      const bedX = -11.2;
      const bedZ = zCenter + 2.4; // 27.4
      [bedX, bedX - 4.4].forEach((bx, bi) => {
        const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.72, 1.05), silverMat);
        bedFrame.position.set(bx, 0.36, bedZ);
        const bedSheet = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.2, 0.96), nurseWhiteMat);
        bedSheet.position.set(bx, 0.8, bedZ);
        const bedPillow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.14, 0.72), nurseMintMat);
        bedPillow.position.set(bx + 0.72, 0.94, bedZ);
        etecInsideGroup.add(bedFrame, bedSheet, bedPillow);
        addObstacleBox(bx, bedZ, 2.3, 1.15, etecInsideObstacles);
        if (bi === 0) {
          // Biombo hospitalar entre as macas
          const screen = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.9, 1.6), nurseMintMat);
          screen.position.set(bx - 2.2, 0.95, bedZ);
          etecInsideGroup.add(screen);
        }
      });

      const medCab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.7), nurseWhiteMat);
      medCab.position.set(outerX + 1.2, 1.1, zCenter - 2.0);
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.05), nurseMintMat);
      crossV.position.set(outerX + 1.2, 1.55, zCenter - 1.62);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.16, 0.05), nurseMintMat);
      crossH.position.set(outerX + 1.2, 1.55, zCenter - 1.62);
      const triageDesk = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 1.05), nurseWhiteMat);
      triageDesk.position.set(xCenter + 1.6, 0.425, zCenter - 2.0);
      etecInsideGroup.add(medCab, crossV, crossH, triageDesk);
      addObstacleBox(outerX + 1.2, zCenter - 2.0, 1.7, 0.8, etecInsideObstacles);
      addObstacleBox(xCenter + 1.6, zCenter - 2.0, 2.9, 1.15, etecInsideObstacles);
      return;
    }

    // Mesa do Professor detalhada (tampo, painel frontal, laptop, pilha de livros & cadeira!)
    const pdX = xCenter + dir * 4.6;
    const pdZ = zMin + 2.4;
    const profDeskTop = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.08, 0.88), deskTopMat);
    profDeskTop.position.set(pdX, 0.78, pdZ);
    profDeskTop.castShadow = true;
    const profDeskFront = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.68, 0.08), chairWoodMat);
    profDeskFront.position.set(pdX, 0.4, pdZ + 0.36);
    [-0.86, 0.86].forEach((lx) => {
      const pLeg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.8), greenSteelMat);
      pLeg.position.set(pdX + lx, 0.38, pdZ);
      etecInsideGroup.add(pLeg);
    });
    const pLapBase = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.03, 0.34), audFrameMat);
    pLapBase.position.set(pdX - 0.35, 0.835, pdZ);
    const pLapTop = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.03), pcScreenMat);
    pLapTop.position.set(pdX - 0.35, 0.98, pdZ + 0.16);
    const pBook = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.24), cpsRedMat);
    pBook.position.set(pdX + 0.48, 0.87, pdZ - 0.08);
    const pChairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.07, 0.5), audBlueMat);
    pChairSeat.position.set(pdX, 0.46, pdZ - 0.62);
    const pChairBack = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.5, 0.07), audBlueMat);
    pChairBack.position.set(pdX, 0.74, pdZ - 0.85);
    etecInsideGroup.add(profDeskTop, profDeskFront, pLapBase, pLapTop, pBook, pChairSeat, pChairBack);
    const roomCab = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.95, 1.5), lockerMat);
    roomCab.position.set(outerX + (isWest ? 0.45 : -0.45), 0.975, zMax - 1.4);
    const trashBin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.18, 0.48, 8), audFrameMat);
    trashBin.position.set(corrX + (isWest ? -0.65 : 0.65), 0.24, zMax - 0.75);
    etecInsideGroup.add(roomCab, trashBin);
    addObstacleBox(xCenter + dir * 4.6, zMin + 2.4, 1.95, 0.95, etecInsideObstacles);
    addObstacleBox(outerX + (isWest ? 0.45 : -0.45), zMax - 1.4, 0.8, 1.6, etecInsideObstacles);

    const colOffsets = [-4.5, -1.5, 1.5, 4.5];
    const rowZ = [zMin + 4.7, zMin + 7.2, zMin + 9.7];
    colOffsets.forEach((ox) => {
      rowZ.forEach((rz) => {
        createPhotoDeskAndChair(xCenter + ox, rz, isComputerLab);
      });
    });
  }

  // ===================== ALA ESQUERDA (OESTE — 8 SETORES!) =====================
  buildPhotoRoom({ side: "west", bandIndex: 0, code: "LAB. INFO 24", subtitle: "B****** & T*******", isComputerLab: true });
  buildPhotoRoom({ side: "west", bandIndex: 1, code: "LAB. INFO 15", subtitle: "Informática • PCs", isComputerLab: true });
  buildPhotoRoom({ side: "west", bandIndex: 2, code: "LAB. INFO 7", subtitle: "Informática • Redes", isComputerLab: true });
  buildPhotoRoom({ side: "west", bandIndex: 3, code: "LAB. QUÍMICA", subtitle: "Kaio Wendell • Adubo", customKind: "chem" });
  buildPhotoRoom({ side: "west", bandIndex: 4, code: "LAB. ENFERMAGEM", subtitle: "Saúde & Curativos", customKind: "nurse" });
  buildPhotoRoom({ side: "west", bandIndex: 5, code: "AUDITÓRIO ETECAMP", subtitle: "TV & Apresentações", customKind: "auditorium" });
  buildPhotoRoom({ side: "west", bandIndex: 6, code: "SALA MAKER", subtitle: "Sala de Estudo • Mesas", customKind: "maker" });
  buildPhotoRoom({ side: "west", bandIndex: 7, code: "REFEITÓRIO ETECAMP", subtitle: "Merenda Escolar (Seg–Sex)", customKind: "refeitorio" });

  // ===================== ALA DIREITA (LESTE — 8 SETORES!) =====================
  buildPhotoRoom({ side: "east", bandIndex: 0, code: "SALA 3AI", subtitle: "Pão & Muzzonline" });
  buildPhotoRoom({ side: "east", bandIndex: 1, code: "SALA 2AI", subtitle: "Ensino Médio + Info" });
  buildPhotoRoom({ side: "east", bandIndex: 2, code: "SALA 1AI", subtitle: "Félix • Missões PAC" });
  buildPhotoRoom({ side: "east", bandIndex: 3, code: "BANHEIROS F/M", subtitle: "Bebedouros & Pias", customKind: "open_restrooms" });
  buildPhotoRoom({ side: "east", bandIndex: 4, code: "SALA 3A", subtitle: "3º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "east", bandIndex: 5, code: "SALA 2A", subtitle: "2º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "east", bandIndex: 6, code: "SALA 1A", subtitle: "1º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "east", bandIndex: 7, code: "SALA DOS PROFESSORES", subtitle: "Reuniões & Café", customKind: "teachers" });

  flushInstancedDesks();

  // Mobiliário do Corredor Principal & Horizontal (armários, bancos e plantas!)
  addCorridorLockerBank(-4.5, -17.0, 6);
  addCorridorLockerBank(-4.5, 25.5, 6);
  addCorridorLockerBank(-4.5, 37.5, 6);
  addCorridorLockerBank(-4.5, 49.5, 6);
  addCorridorLockerBank(4.5, 25.5, 6);
  addCorridorLockerBank(4.5, 37.5, 6);
  addCorridorLockerBank(4.5, 49.5, 6);
  addCorridorLockerBank(4.5, 61.5, 5);

  addCorridorBench(-3.6, -5.0, Math.PI / 2);
  addCorridorBench(3.6, -5.0, Math.PI / 2);
  addCorridorBench(-12.0, 14.6, 0);
  addCorridorBench(12.0, 14.6, 0);
  // Entradas de todas as salas 100% livres (plantas removidas das portas!)

  // Tapetes das 3 saídas
  const exitMat = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.05, 1.4),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.85 })
  );
  exitMat.position.set(0, 0.025, 64.4);
  etecInsideGroup.add(exitMat);

  const exitBackMat = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.05, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.85 })
  );
  exitBackMat.position.set(0, 0.025, -34.4);
  etecInsideGroup.add(exitBackMat);

  const exitParkMat = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.05, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.85 })
  );
  exitParkMat.position.set(-3.85, 0.025, 62.2);
  etecInsideGroup.add(exitParkMat);

  // ===================== TODOS OS NPCs DA ETECAMP NAS SUAS SALAS EXPANDIDAS =====================
  const npcSpecs = [
    {
      id: "muzzonline",
      name: "Muzzonline",
      roleSub: "Sala 3AI • +Insanidade",
      pos: new THREE.Vector3(8.5, 0, -33.2), // Sala 3AI (East Band 0)
      yaw: -0.25,
      skinColor: 0xf3d2b8,
      shirtColor: 0x9ca3af,
      pantsColor: 0x4b5563,
      shoeColor: 0xdc2626,
      hairStyle: "messy",
      hairColor: 0x261c15,
      redGlasses: true,
      hoodie: true,
    },
    {
      id: "pao",
      name: "Pão",
      roleSub: "Sala 3AI • Missões",
      pos: new THREE.Vector3(14.5, 0, -33.2), // Sala 3AI (East Band 0)
      yaw: -0.15,
      skinColor: 0x8d5524,
      shirtColor: 0x18181b,
      pantsColor: 0x1d4ed8,
      shoeColor: 0xf8fafc,
      hairStyle: "short",
      hairColor: 0x171717,
      squareGlasses: true,
      etecShirt: true,
    },
    {
      id: "felix",
      name: "Félix",
      roleSub: "Sala 1AI • Missões PAC",
      pos: new THREE.Vector3(11.8, 0, -9.2), // Sala 1AI (East Band 2)
      yaw: -0.1,
      skinColor: 0xf3d2b8,
      shirtColor: 0x111827,
      pantsColor: 0x1e293b,
      shoeColor: 0x27272a,
      hairStyle: "curly_big",
      hairColor: 0x1c140d,
      metalRectGlasses: true,
    },
    {
      id: "kaio",
      name: "Kaio Wendell",
      roleSub: "Lab Química • Adubo",
      pos: new THREE.Vector3(-9.5, 0, 3.2), // Lab Química (West Band 3)
      yaw: 0.3,
      skinColor: 0xf3d2b8,
      shirtColor: 0x1e293b,
      pantsColor: 0x334155,
      shoeColor: 0x09090b,
      hairStyle: "sparse",
      hairColor: 0x292524,
      trenchCoat: true,
    },
    {
      id: "b_lab24",
      name: "B******",
      roleSub: "Lab Info 24 • +Insanidade",
      pos: new THREE.Vector3(-9.5, 0, -33.2), // Lab Info 24 (West Band 0)
      yaw: 0.2,
      skinColor: 0xf6dac4,
      shirtColor: 0x4338ca,
      pantsColor: 0x1e293b,
      shoeColor: 0x18181b,
      hairStyle: "wavy_medium",
      hairColor: 0x3b2417,
      squareGlasses: true,
      slimBody: true,
      bigHead: true,
    },
    {
      id: "t_lab24",
      name: "T*******",
      roleSub: "Lab Info 24 • +Insanidade",
      pos: new THREE.Vector3(-15.0, 0, -33.2), // Lab Info 24 (West Band 0)
      yaw: 0.35,
      skinColor: 0x9c6438,
      shirtColor: 0xbe123c,
      pantsColor: 0x1d4ed8,
      shoeColor: 0x27272a,
      hairStyle: "curly_long",
      hairColor: 0x1a120d,
      slimBody: true,
      bigHead: true,
    },
    {
      id: "marcelo",
      name: "Marcelo",
      roleSub: "Professor • Vaselina & Onças",
      pos: new THREE.Vector3(2.0, 0, 21.5), // Corredor Principal da ETECAMP
      yaw: -0.15,
      skinColor: 0xdca580,
      shirtColor: 0x94a3b8,
      pantsColor: 0x2563eb,
      shoeColor: 0x3b2618,
      hairStyle: "middle_aged",
      hairColor: 0x6b7280,
      squareGlasses: true,
      teacherShirt: true,
    },
  ];

  npcSpecs.forEach((spec) => {
    const mesh = createNpcModel(spec);
    mesh.position.copy(spec.pos);
    mesh.rotation.y = spec.yaw;
    etecInsideGroup.add(mesh);
    addObstacleBox(spec.pos.x, spec.pos.z, 1.15, 1.15, etecInsideObstacles);
    etecNpcs.push({ id: spec.id, name: spec.name, pos: spec.pos, mesh });
  });
}
buildEtecInside();

// Rain Particle System via THREE.InstancedMesh (200 gotas em 1 único draw call!)
function buildRainSystem() {
  const count = 200;
  const dropGeo = new THREE.BoxGeometry(0.04, 0.7, 0.04);
  const dropMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.55 });
  rainInstancedMesh = new THREE.InstancedMesh(dropGeo, dropMat, count);
  rainInstancedMesh.frustumCulled = false;
  for (let i = 0; i < count; i++) {
    const d = {
      x: (Math.random() - 0.5) * 44,
      y: Math.random() * 20 + 1,
      z: (Math.random() - 0.5) * 44,
    };
    rainDrops.push(d);
    _rainDummy.position.set(d.x, d.y, d.z);
    _rainDummy.updateMatrix();
    rainInstancedMesh.setMatrixAt(i, _rainDummy.matrix);
  }
  rainInstancedMesh.instanceMatrix.needsUpdate = true;
  rainGroup.add(rainInstancedMesh);
}
buildRainSystem();

