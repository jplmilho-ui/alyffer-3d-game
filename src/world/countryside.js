// 1. SÍTIO EM PAU ARCADO (Estrada do Garcia / Zona Rural de Campo Limpo Paulista)
function buildCountrysideEnvironment() {
  // Terreno principal com recorte circular real para a bacia funda do Lago de Pau Arcado!
  const groundShape = new THREE.Shape();
  groundShape.moveTo(-140, -140);
  groundShape.lineTo(140, -140);
  groundShape.lineTo(140, 140);
  groundShape.lineTo(-140, 140);
  groundShape.closePath();
  const lakeHolePath = new THREE.Path();
  // Após rotation.x = -PI/2, shape(x, y) -> world(x, 0, -y), logo worldZ = -10 => shapeY = +10!
  lakeHolePath.absarc(LAKE_CENTER_X, -LAKE_CENTER_Z, LAKE_WATER_RADIUS - 0.05, 0, Math.PI * 2, true);
  groundShape.holes.push(lakeHolePath);
  const grassTexWide = createGrassTexture("#4b8b3b", "#3d7a30", 34, 34);
  const yardGrassTex = createGrassTexture("#599c46", "#4a8a39", 14, 12);
  const dirtRoadTex = createDirtRoadTexture(2, 16);

  const ground = new THREE.Mesh(
    new THREE.ShapeGeometry(groundShape, 36),
    new THREE.MeshStandardMaterial({ map: grassTexWide, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  exteriorGroup.add(ground);

  const yardLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(70, 62),
    new THREE.MeshStandardMaterial({
      map: yardGrassTex,
      roughness: 0.92,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  yardLawn.rotation.x = -Math.PI / 2;
  yardLawn.position.set(0, 0.025, 0);
  yardLawn.receiveShadow = true;
  exteriorGroup.add(yardLawn);

  // Estrada do Garcia / Estrada Rural de Pau Arcado (textura de terra batida c/ pedrinhas + anti-z-fighting!)
  const roadMat = new THREE.MeshStandardMaterial({
    map: dirtRoadTex,
    roughness: 0.95,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  const mainRoad = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 96), roadMat);
  mainRoad.rotation.x = -Math.PI / 2;
  mainRoad.position.set(12.5, 0.024, 95);
  mainRoad.receiveShadow = true;
  exteriorGroup.add(mainRoad);

  const crossRoad = new THREE.Mesh(new THREE.PlaneGeometry(165, 6.0), roadMat);
  crossRoad.rotation.x = -Math.PI / 2;
  crossRoad.position.set(12, 0.025, 47.0);
  crossRoad.receiveShadow = true;
  exteriorGroup.add(crossRoad);

  // Trilha de terra saindo da Estrada do Garcia até a margem seca do Lago (sem invadir o buraco!)
  const lakeTrail = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 48.0), roadMat);
  lakeTrail.rotation.x = -Math.PI / 2;
  lakeTrail.position.set(55.6, 0.023, 23.0);
  lakeTrail.receiveShadow = true;
  exteriorGroup.add(lakeTrail);

  // Calçada / Recuo pavimentado do Ponto 402 ENCOSTADO ao lado norte da Estrada do Garcia (fora do meio da pista!)
  const bayMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.88 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const busBay = new THREE.Mesh(new THREE.PlaneGeometry(16.9, 5.4), bayMat);
  busBay.rotation.x = -Math.PI / 2;
  busBay.position.set(23.65, 0.028, 41.3);
  busBay.receiveShadow = true;
  exteriorGroup.add(busBay);

  const busCurb = new THREE.Mesh(new THREE.BoxGeometry(16.9, 0.14, 0.24), curbMat);
  busCurb.position.set(23.65, 0.07, 43.92);
  busCurb.receiveShadow = true;
  exteriorGroup.add(busCurb);

  // Caminhos internos da fazenda ligando casa, horta, galinheiro, poço, cooperativa, cercados e porteira
  const gatePath = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 59.5), roadMat);
  gatePath.rotation.x = -Math.PI / 2;
  gatePath.position.set(12.5, 0.023, 17.25);
  gatePath.receiveShadow = true;
  exteriorGroup.add(gatePath);

  const northPath = new THREE.Mesh(new THREE.PlaneGeometry(40.0, 3.0), roadMat);
  northPath.rotation.x = -Math.PI / 2;
  northPath.position.set(2.0, 0.022, -11.5);
  northPath.receiveShadow = true;
  exteriorGroup.add(northPath);

  const westPath = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 25.5), roadMat);
  westPath.rotation.x = -Math.PI / 2;
  westPath.position.set(-13.2, 0.022, 0.8);
  westPath.receiveShadow = true;
  exteriorGroup.add(westPath);

  const southPath = new THREE.Mesh(new THREE.PlaneGeometry(31.0, 2.8), roadMat);
  southPath.rotation.x = -Math.PI / 2;
  southPath.position.set(-2.5, 0.022, 13.0);
  southPath.receiveShadow = true;
  exteriorGroup.add(southPath);

  // Serra / Hills around Pau Arcado com a mesma textura nova de grama do chão!
  const hillMat = new THREE.MeshStandardMaterial({
    map: createGrassTexture("#4b8b3b", "#3d7a30", 8, 5),
    roughness: 0.96,
  });
  [
    [-92, -92, 34, 15],
    [0, -104, 48, 20],
    [94, -92, 38, 17],
    [-118, 20, 34, 14],
    [136, 16, 36, 16],
    [-82, 98, 34, 13],
    [84, 102, 34, 14],
  ].forEach(([x, z, r, h]) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(r, h, 14), hillMat);
    hill.position.set(x, h * 0.35, z);
    hill.scale.set(1.4, 1, 1.1);
    exteriorGroup.add(hill);
  });

  // Horizonte fiel de Campo Limpo Paulista: APENAS 2 prédios pequenos + sombras/silhuetas de casinhas espalhadas!
  const cityGroup = new THREE.Group();
  cityGroup.position.set(14, 0, 132);
  const smallBldgMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 });
  const houseShadowMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.95 });
  const roofShadowMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.95 });
  const tinyWinMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // Os 2 únicos prédios pequenos de Campo Limpo Paulista!
  [
    [-8.5, 9.5, 4.4, 4.0],
    [7.5, 11.2, 4.8, 4.2],
  ].forEach(([bx, bh, bw, bd]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), smallBldgMat);
    b.position.set(bx, bh / 2, 0);
    cityGroup.add(b);
    const roofCap = new THREE.Mesh(new THREE.BoxGeometry(bw + 0.3, 0.35, bd + 0.3), roofShadowMat);
    roofCap.position.set(bx, bh + 0.15, 0);
    cityGroup.add(roofCap);
    for (let wy = 2.0; wy < bh - 1.2; wy += 2.2) {
      [-1.0, 1.0].forEach((wx) => {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.08), tinyWinMat);
        win.position.set(bx + wx, wy, -bd / 2 - 0.03);
        cityGroup.add(win);
      });
    }
  });

  // Sombras/silhuetas de casinhas baixas ao longo do horizonte
  [
    [-42, -4, 3.6, 2.2, 3.0],
    [-35, 3, 4.2, 2.5, 3.2],
    [-28, -2, 3.4, 2.1, 2.8],
    [-21, 2, 4.0, 2.4, 3.0],
    [-15, -3, 3.2, 2.0, 2.8],
    [-2, 1, 3.8, 2.3, 3.0],
    [2.5, -2, 3.2, 2.0, 2.6],
    [15, 2, 3.8, 2.4, 3.0],
    [22, -3, 4.2, 2.5, 3.2],
    [29, 1, 3.4, 2.1, 2.8],
    [36, -2, 4.0, 2.3, 3.0],
    [44, 3, 3.6, 2.2, 2.8],
  ].forEach(([hx, hz, hw, hh, hd]) => {
    const hBody = new THREE.Mesh(new THREE.BoxGeometry(hw, hh, hd), houseShadowMat);
    hBody.position.set(hx, hh / 2, hz);
    const hRoof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(hw, hd) * 0.78, 1.35, 4), roofShadowMat);
    hRoof.position.set(hx, hh + 0.65, hz);
    hRoof.rotation.y = Math.PI / 4;
    cityGroup.add(hBody, hRoof);
  });
  exteriorGroup.add(cityGroup);

  // Ambientação completa ao longo da Estrada Sul (z = 52..122, dos dois lados da pista!)
  {
    const southEnvGroup = new THREE.Group();
    const sPoleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
    const sWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.92 });
    const sLeafMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.86 });
    const sIpeMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.85 });
    const sBushMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.88 });
    const sRockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.92 });
    const sGrassMat = new THREE.MeshStandardMaterial({ color: 0x3f8f34, roughness: 0.92 });

    // Postes de luz rurais ao longo da estrada sul + cerca baixa lateral
    for (let pz = 56; pz <= 118; pz += 15) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6.2, 6), sPoleMat);
      pole.position.set(17.2, 3.1, pz);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.12), sPoleMat);
      arm.position.set(16.6, 5.9, pz);
      southEnvGroup.add(pole, arm);
    }

    // Árvores dos dois lados da estrada sul até o horizonte
    const southTrees = [
      [-18, 58, 1.3, false], [32, 57, 1.35, true], [-34, 66, 1.45, false], [44, 68, 1.4, false],
      [-8, 70, 1.25, true], [26, 74, 1.3, false], [-25, 82, 1.5, false], [38, 84, 1.45, true],
      [-4, 88, 1.35, false], [24, 92, 1.4, false], [-18, 98, 1.45, true], [34, 102, 1.5, false],
      [2, 108, 1.35, false], [25, 112, 1.4, true], [-28, 114, 1.5, false], [48, 96, 1.45, false],
    ];
    southTrees.forEach(([tx, tz, ts, isIpe]) => {
      const tr = new THREE.Group();
      tr.position.set(tx, 0, tz);
      tr.scale.setScalar(ts);
      const tk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.44, 2.8, 7), sWoodMat);
      tk.position.y = 1.4;
      const cr = new THREE.Mesh(new THREE.DodecahedronGeometry(1.85, 1), isIpe ? sIpeMat : sLeafMat);
      cr.position.y = 3.6;
      tr.add(tk, cr);
      southEnvGroup.add(tr);
    });

    // Mato, arbustos e pedras instanciados na área sul (z = 51..122, fora da pista x = 9..16)
    let sSeed = 998123;
    const sRand = () => {
      sSeed = (sSeed * 1664525 + 1013904223) >>> 0;
      return sSeed / 4294967296;
    };
    const sDummy = new THREE.Object3D();

    const sBushPts = [];
    for (let i = 0; i < 65; i++) {
      const bx = -58 + sRand() * 126;
      const bz = 52 + sRand() * 70;
      if (bx > 7.5 && bx < 17.5) continue;
      sBushPts.push({ x: bx, z: bz, s: 0.9 + sRand() * 0.85 });
    }
    const sBushInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.72, 1), sBushMat, sBushPts.length);
    sBushPts.forEach((b, i) => {
      sDummy.position.set(b.x, 0.42 * b.s, b.z);
      sDummy.rotation.set(0, sRand() * Math.PI, 0);
      sDummy.scale.set(1.25 * b.s, 0.75 * b.s, 1.15 * b.s);
      sDummy.updateMatrix();
      sBushInst.setMatrixAt(i, sDummy.matrix);
    });
    sBushInst.instanceMatrix.needsUpdate = true;

    const sGrassPts = [];
    for (let i = 0; i < 160; i++) {
      const gx = -58 + sRand() * 126;
      const gz = 51 + sRand() * 72;
      if (gx > 8.5 && gx < 16.5) continue;
      sGrassPts.push({ x: gx, z: gz, s: 0.8 + sRand() * 0.9 });
    }
    const sGrassInst = new THREE.InstancedMesh(new THREE.ConeGeometry(0.2, 0.56, 4), sGrassMat, sGrassPts.length);
    sGrassPts.forEach((g, i) => {
      sDummy.position.set(g.x, 0.24 * g.s, g.z);
      sDummy.rotation.set(0.15, sRand() * Math.PI, 0.12);
      sDummy.scale.setScalar(g.s);
      sDummy.updateMatrix();
      sGrassInst.setMatrixAt(i, sDummy.matrix);
    });
    sGrassInst.instanceMatrix.needsUpdate = true;

    const sRockPts = [];
    for (let i = 0; i < 36; i++) {
      const rx = -55 + sRand() * 120;
      const rz = 52 + sRand() * 68;
      if (rx > 8.2 && rx < 16.8) continue;
      sRockPts.push({ x: rx, z: rz, s: 0.6 + sRand() * 1.1 });
    }
    const sRockInst = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(0.48, 0), sRockMat, sRockPts.length);
    sRockPts.forEach((r, i) => {
      sDummy.position.set(r.x, 0.18 * r.s, r.z);
      sDummy.rotation.set(sRand(), sRand(), sRand());
      sDummy.scale.set(1.3 * r.s, 0.65 * r.s, 1.0 * r.s);
      sDummy.updateMatrix();
      sRockInst.setMatrixAt(i, sDummy.matrix);
    });
    sRockInst.instanceMatrix.needsUpdate = true;

    southEnvGroup.add(sBushInst, sGrassInst, sRockInst);
    exteriorGroup.add(southEnvGroup);
  }

  // Pesqueiro / Lago de Pau Arcado COM PROFUNDIDADE REAL 3D (x = 63, z = -10, fundo a -1.68m!)
  const lakeGroup = new THREE.Group();
  lakeGroup.position.set(LAKE_CENTER_X, 0, LAKE_CENTER_Z);

  // Margem de areia/terra seca ao redor da borda do lago (anel furado no centro!)
  const lakeShore = new THREE.Mesh(
    new THREE.RingGeometry(LAKE_WATER_RADIUS - 0.08, 9.8, 36),
    new THREE.MeshStandardMaterial({ color: 0xc2a378, roughness: 0.94 })
  );
  lakeShore.rotation.x = -Math.PI / 2;
  lakeShore.position.y = 0.018;
  lakeShore.receiveShadow = true;
  lakeGroup.add(lakeShore);

  // Bacia 3D escavada (perfil suave exatamente igual a getFloorYAt: fundo plano -1.68m até r=4.2, subindo até y=0 em r=7.45!)
  const basinPts = [new THREE.Vector2(0.01, -LAKE_MAX_DEPTH), new THREE.Vector2(LAKE_DEEP_RADIUS, -LAKE_MAX_DEPTH)];
  for (let si = 1; si <= 10; si++) {
    const t = si / 10;
    const r = LAKE_DEEP_RADIUS + t * (LAKE_WATER_RADIUS + 0.08 - LAKE_DEEP_RADIUS);
    const smooth = t * t * (3 - 2 * t);
    const y = -LAKE_MAX_DEPTH * (1 - smooth) + 0.015 * smooth;
    basinPts.push(new THREE.Vector2(r, y));
  }
  const lakeBasinGeo = new THREE.LatheGeometry(basinPts, 36);
  const lakeBasinMat = new THREE.MeshStandardMaterial({
    color: 0x5c5340,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const lakeBasin = new THREE.Mesh(lakeBasinGeo, lakeBasinMat);
  lakeBasin.receiveShadow = true;
  lakeGroup.add(lakeBasin);

  // Fundo arenoso mais escuro no centro profundo + pedras submersas para dar forte percepção de profundidade!
  const deepMud = new THREE.Mesh(
    new THREE.CircleGeometry(LAKE_DEEP_RADIUS - 0.1, 28),
    new THREE.MeshStandardMaterial({ color: 0x3b3528, roughness: 1.0 })
  );
  deepMud.rotation.x = -Math.PI / 2;
  deepMud.position.y = -LAKE_MAX_DEPTH + 0.025;
  deepMud.receiveShadow = true;
  lakeGroup.add(deepMud);

  const lakeRockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
  const subRockMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.95 });
  const reedMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

  // Pedras submersas no fundo do lago
  [
    [1.8, -LAKE_MAX_DEPTH + 0.15, -1.6, 0.55],
    [-2.4, -LAKE_MAX_DEPTH + 0.18, -2.2, 0.62],
    [2.6, -LAKE_MAX_DEPTH + 0.14, 2.0, 0.48],
    [0.2, -LAKE_MAX_DEPTH + 0.12, -3.1, 0.52],
    [-0.5, -LAKE_MAX_DEPTH + 0.14, 3.2, 0.45],
  ].forEach(([rx, ry, rz, rs]) => {
    const sr = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), subRockMat);
    sr.position.set(rx, ry, rz);
    sr.scale.set(1.3, 0.55, 1.0);
    lakeGroup.add(sr);
  });

  // Camada de volume azul profundo a meia-altura + superfície de água translúcida em y = -0.10!
  const deepWaterTint = new THREE.Mesh(
    new THREE.CircleGeometry(5.6, 28),
    new THREE.MeshBasicMaterial({
      color: 0x0369a1,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  deepWaterTint.rotation.x = -Math.PI / 2;
  deepWaterTint.position.y = -0.92;
  lakeGroup.add(deepWaterTint);

  const pondWater = new THREE.Mesh(
    new THREE.CircleGeometry(LAKE_WATER_RADIUS, 36),
    new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.12,
      metalness: 0.22,
      transparent: true,
      opacity: 0.56,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  pondWater.rotation.x = -Math.PI / 2;
  pondWater.position.y = LAKE_WATER_Y;
  pondWater.receiveShadow = true;
  lakeGroup.add(pondWater);

  // Pedras e taboas decorativas na borda seca do lago (r > 7.6)
  [
    [-7.3, 0.2, -4.1, 0.55],
    [-4.8, 0.22, -6.9, 0.65],
    [4.6, 0.26, -6.6, 0.72],
    [7.8, 0.2, 1.4, 0.58],
    [3.8, 0.22, 7.2, 0.62],
    [-4.2, 0.18, 7.1, 0.48],
  ].forEach(([rx, ry, rz, rs]) => {
    const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), lakeRockMat);
    rk.position.set(rx, ry, rz);
    rk.scale.set(1.2, 0.65, 1.0);
    rk.castShadow = true;
    lakeGroup.add(rk);
  });
  [
    [-6.9, -4.7],
    [-6.4, -5.2],
    [7.1, -3.4],
    [7.4, -2.8],
    [5.4, 5.9],
  ].forEach(([tx, tz]) => {
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 1.45, 6), reedMat);
    stalk.position.set(tx, 0.72, tz);
    const tip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.26, 6),
      new THREE.MeshStandardMaterial({ color: 0x713f12, roughness: 0.9 })
    );
    tip.position.set(tx, 1.38, tz);
    lakeGroup.add(stalk, tip);
  });

  // ===================== LANCHE NA BORDA SECA DO LAGO (fora da água! x global ≈ 57.0, z global ≈ -2.9) =====================
  // Pedra lisa na areia seca (dist = 8.68m > raio da água 7.25m) com a Bolacha da ETEC CLP + Caneca Branca c/ Alça de Leite c/ Chocolate
  const snackGroup = new THREE.Group();
  snackGroup.position.set(-5.6, 0.02, 7.2);

  const snackStone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.8, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.88 })
  );
  snackStone.position.y = 0.06;
  snackStone.receiveShadow = true;
  snackGroup.add(snackStone);

  // 1) BOLACHA DA ETEC DE CAMPO LIMPO dentro de um SACO TRANSPARENTE!
  const bagGroup = new THREE.Group();
  bagGroup.position.set(-0.26, 0.12, -0.04);
  bagGroup.rotation.y = 0.3;
  bagGroup.scale.setScalar(1.12);

  const crackerMat = new THREE.MeshStandardMaterial({ color: 0xe6be8a, roughness: 0.78 });
  const crackerDotMat = new THREE.MeshStandardMaterial({ color: 0x9a6b3b, roughness: 0.9 });
  for (let bi = 0; bi < 6; bi++) {
    const cracker = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.032, 0.22), crackerMat);
    cracker.position.set(0, 0.025 + bi * 0.038, 0);
    cracker.rotation.y = (bi % 2) * 0.06 - 0.03;
    cracker.castShadow = true;
    bagGroup.add(cracker);
    if (bi === 5) {
      [[-0.06, -0.05], [0.06, -0.05], [0, 0], [-0.06, 0.05], [0.06, 0.05]].forEach(([dx, dz]) => {
        const dot = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.01, 0.018), crackerDotMat);
        dot.position.set(dx, 0.044 + bi * 0.038, dz);
        bagGroup.add(dot);
      });
    }
  }
  const plasticBagMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    roughness: 0.12,
    metalness: 0.08,
    depthWrite: false,
  });
  const bagBody = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.32, 0.3), plasticBagMat);
  bagBody.position.y = 0.16;
  const bagTopTwist = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.12, 8), plasticBagMat);
  bagTopTwist.position.y = 0.36;
  bagTopTwist.rotation.x = Math.PI;
  const bagTie = new THREE.Mesh(
    new THREE.TorusGeometry(0.048, 0.012, 6, 10),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.5 })
  );
  bagTie.rotation.x = Math.PI / 2;
  bagTie.position.y = 0.32;
  const etecTag = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.075, 0.01),
    new THREE.MeshBasicMaterial({ color: 0xb91c1c })
  );
  etecTag.position.set(0, 0.17, 0.158);
  const etecTagStripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.022, 0.01),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc })
  );
  etecTagStripe.position.set(0, 0.17, 0.166);
  bagGroup.add(bagBody, bagTopTwist, bagTie, etecTag, etecTagStripe);
  snackGroup.add(bagGroup);

  // 2) CANECA BRANCA COM ALÇA (LOCAL PARA SEGURAR) DE LEITE COM CHOCOLATE ao lado da bolacha!
  const mugGroup = new THREE.Group();
  mugGroup.position.set(0.24, 0.12, 0.08);
  mugGroup.rotation.y = -0.35;
  mugGroup.scale.setScalar(1.15);
  const whiteMugMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.26, metalness: 0.05 });
  const chocoMilkMat = new THREE.MeshStandardMaterial({ color: 0x5c3317, roughness: 0.22, metalness: 0.1 });
  const mugBody = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.13, 0.27, 18), whiteMugMat);
  mugBody.position.y = 0.135;
  mugBody.castShadow = true;
  const mugRim = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.016, 8, 18), whiteMugMat);
  mugRim.rotation.x = Math.PI / 2;
  mugRim.position.y = 0.27;
  // Alça da caneca em formato "C" bem visível na lateral para segurar!
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.022, 8, 16, Math.PI), whiteMugMat);
  mugHandle.rotation.z = -Math.PI / 2;
  mugHandle.position.set(0.132, 0.14, 0);
  mugHandle.castShadow = true;
  const chocoLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.118, 0.118, 0.02, 16), chocoMilkMat);
  chocoLiquid.position.y = 0.252;
  const chocoFoam = new THREE.Mesh(
    new THREE.CircleGeometry(0.045, 10),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.4 })
  );
  chocoFoam.rotation.x = -Math.PI / 2;
  chocoFoam.position.set(0.025, 0.266, -0.02);
  mugGroup.add(mugBody, mugRim, mugHandle, chocoLiquid, chocoFoam);
  snackGroup.add(mugGroup);

  lakeGroup.add(snackGroup);

  // ===================== JESSY — HOMEM ALTO (2 METROS!) TOMANDO BANHO NO LAGO =====================
  // Camisa da ETEC (vermelho e preto), bermuda preta e tênis preto dentro da água!
  const jessyGroup = new THREE.Group();
  // Dentro da parte funda do lago (global x = 61.1, z = -8.5, pés no fundo em y = -1.68, água até o peito!)
  jessyGroup.position.set(-1.9, -LAKE_MAX_DEPTH, 1.5);
  jessyGroup.rotation.y = -Math.PI * 0.65;

  const jSkinMat = new THREE.MeshStandardMaterial({ color: 0xf6dac4, roughness: 0.58 });
  const jSkinShade = new THREE.MeshStandardMaterial({ color: 0xe2bda2, roughness: 0.65 });
  const jBlackMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.78 });
  const jEtecRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.65 });
  const jWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
  const jShoeMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.42, metalness: 0.18 });
  const jShoeSoleMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });
  const jHairMat = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.85 });

  // Escala vertical alta (1.22x altura => ~2m de estatura real frente aos NPCs comuns!)
  const jBodyRoot = new THREE.Group();
  jBodyRoot.scale.set(1.06, 1.24, 1.06);

  // Pernas com BERMUDA PRETA + canelas à mostra + TÊNIS PRETO dentro do lago!
  [-0.2, 0.2].forEach((lx) => {
    // Bermuda preta (coxa até o joelho)
    const shortsLeg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.42, 0.28), jBlackMat);
    shortsLeg.position.set(lx, 0.72, 0);
    shortsLeg.castShadow = true;
    // Canela / perna exposta abaixo da bermuda
    const calf = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, 0.22), jSkinMat);
    calf.position.set(lx, 0.34, 0);
    // Tênis preto (usando tênis dentro do lago tomando banho!)
    const sneaker = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.13, 0.38), jShoeMat);
    sneaker.position.set(lx, 0.1, 0.05);
    sneaker.castShadow = true;
    const sneakerSole = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.4), jShoeSoleMat);
    sneakerSole.position.set(lx, 0.02, 0.05);
    jBodyRoot.add(shortsLeg, calf, sneaker, sneakerSole);
  });
  const shortsWaist = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.16, 0.44), jBlackMat);
  shortsWaist.position.set(0, 0.94, 0);
  jBodyRoot.add(shortsWaist);

  // Torso com CAMISA DA ETEC (partes empilhadas sem sobreposição/z-fighting!)
  const jTorso = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.54, 0.44), jBlackMat);
  jTorso.position.set(0, 1.27, 0);
  jTorso.castShadow = true;
  const jWhiteTrim = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.045, 0.45), jWhiteMat);
  jWhiteTrim.position.set(0, 1.56, 0);
  const jRedUpper = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.44, 0.45), jEtecRedMat);
  jRedUpper.position.set(0, 1.8, 0);
  jRedUpper.castShadow = true;
  const jBadgeBg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.012), jWhiteMat);
  jBadgeBg.position.set(0.2, 1.8, 0.233);
  const jBadgeDot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.012), jEtecRedMat);
  jBadgeDot.position.set(0.14, 1.8, 0.243);
  const jNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.14, 0.2, 10), jSkinShade);
  jNeck.position.set(0, 2.09, 0);
  jBodyRoot.add(jTorso, jWhiteTrim, jRedUpper, jBadgeBg, jBadgeDot, jNeck);

  // Braços articulados (mangas vermelhas da ETEC) fazendo movimento de banho/respingo!
  const makeJessyArm = (sx) => {
    const ag = new THREE.Group();
    ag.position.set(sx * 0.55, 1.92, 0);
    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.24), jEtecRedMat);
    sleeve.position.y = -0.17;
    sleeve.castShadow = true;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.46, 0.2), jSkinMat);
    arm.position.y = -0.55;
    arm.castShadow = true;
    ag.add(sleeve, arm);
    return ag;
  };
  const jLArm = makeJessyArm(-1);
  const jRArm = makeJessyArm(1);
  jBodyRoot.add(jLArm, jRArm);

  // Cabeça expressiva do Jessy (camadas separadas em Z sem coplanaridade/z-fighting!)
  const jHeadGroup = new THREE.Group();
  jHeadGroup.position.set(0, 2.44, 0);
  const jHead = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.64, 0.6), jSkinMat);
  jHead.castShadow = true;
  jHead.receiveShadow = false;
  jHeadGroup.add(jHead);
  [-0.33, 0.33].forEach((ex) => {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.15, 0.1), jSkinShade);
    ear.position.set(ex, 0, -0.02);
    jHeadGroup.add(ear);
  });
  const jEyeW = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const jEyeP = new THREE.MeshBasicMaterial({ color: 0x4f5d32 });
  const jMouthMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.65 });
  [-0.14, 0.14].forEach((ex) => {
    const sc = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.014), jEyeW);
    sc.position.set(ex, 0.04, 0.312);
    const pu = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.072, 0.014), jEyeP);
    pu.position.set(ex, 0.04, 0.324);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.016), jHairMat);
    br.position.set(ex, 0.135, 0.316);
    jHeadGroup.add(sc, pu, br);
  });
  const jNose = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.08, 0.05), jSkinShade);
  jNose.position.set(0, -0.035, 0.326);
  const jSmile = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.032, 0.014), jMouthMat);
  jSmile.position.set(0, -0.15, 0.312);
  // Cabelo curto molhado do banho (claramente deslocado fora das faces da cabeça — zero z-fighting!)
  const jHairTop = new THREE.Mesh(new THREE.BoxGeometry(0.67, 0.17, 0.66), jHairMat);
  jHairTop.position.set(0, 0.345, -0.015);
  const jHairBack = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.34, 0.11), jHairMat);
  jHairBack.position.set(0, 0.13, -0.315);
  jHeadGroup.add(jNose, jSmile, jHairTop, jHairBack);
  jBodyRoot.add(jHeadGroup);

  jessyGroup.add(jBodyRoot);

  // Ondinhas animadas na água em volta do Jessy tomando banho!
  const jRippleMat1 = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
  const jRippleMat2 = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
  const jRipple1 = new THREE.Mesh(new THREE.RingGeometry(0.58, 0.76, 22), jRippleMat1);
  jRipple1.rotation.x = -Math.PI / 2;
  jRipple1.position.y = LAKE_MAX_DEPTH + LAKE_WATER_Y + 0.015;
  const jRipple2 = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.16, 22), jRippleMat2);
  jRipple2.rotation.x = -Math.PI / 2;
  jRipple2.position.y = LAKE_MAX_DEPTH + LAKE_WATER_Y + 0.012;
  jessyGroup.add(jRipple1, jRipple2);

  lakeGroup.add(jessyGroup);
  exteriorGroup.add(lakeGroup);

  // Sem bloqueio no lago — agora o jogador pode entrar e nadar/andar na parte funda junto com o Jessy (cuidado com o Jacaré!)
  jessyEntity = {
    mesh: jessyGroup,
    headGroup: jHeadGroup,
    lArm: jLArm,
    rArm: jRArm,
    ripple1: jRipple1,
    ripple2: jRipple2,
    worldPos: new THREE.Vector3(LAKE_CENTER_X - 1.9, -LAKE_MAX_DEPTH, LAKE_CENTER_Z + 1.5),
  };

  // ===================== JACARÉ 3D DENTRO DO LAGO (ATACA QUANDO O JOGADOR CHEGA PERTO!) =====================
  {
    const gatorGroup = new THREE.Group();
    const gBodyMat = new THREE.MeshStandardMaterial({ color: 0x2d4a22, roughness: 0.78 });
    const gDarkMat = new THREE.MeshStandardMaterial({ color: 0x1b3014, roughness: 0.85 });
    const gBellyMat = new THREE.MeshStandardMaterial({ color: 0xd6cc99, roughness: 0.85 });
    const gEyeMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xeab308, emissiveIntensity: 0.45 });
    const gPupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const gToothMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

    // Corpo blindado + barriga clara + placas dorsais (osteodermos)
    const gTorso = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.46, 2.05), gBodyMat);
    gTorso.position.set(0, 0.28, 0);
    gTorso.castShadow = true;
    const gBelly = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.14, 1.9), gBellyMat);
    gBelly.position.set(0, 0.08, 0);
    gatorGroup.add(gTorso, gBelly);

    [-0.72, -0.36, 0, 0.36, 0.72].forEach((sz) => {
      [-0.22, 0.22].forEach((sx) => {
        const scute = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.24), gDarkMat);
        scute.position.set(sx, 0.54, sz);
        gatorGroup.add(scute);
      });
    });

    // Cabeça + focinho comprido + cristas dos olhos amarelos + dentes superiores
    const gHeadGroup = new THREE.Group();
    gHeadGroup.position.set(0, 0.32, 1.02);
    const gSkull = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.34, 0.62), gBodyMat);
    gSkull.position.set(0, 0.04, 0.28);
    gSkull.castShadow = true;
    const gUpperSnout = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.2, 0.95), gBodyMat);
    gUpperSnout.position.set(0, 0.04, 0.96);
    gUpperSnout.castShadow = true;
    gHeadGroup.add(gSkull, gUpperSnout);

    // Narinas + olhos amarelos de réptil acima da linha d'água
    [-0.14, 0.14].forEach((nx) => {
      const nostril = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.08), gDarkMat);
      nostril.position.set(nx, 0.15, 1.34);
      gHeadGroup.add(nostril);
    });
    [-0.26, 0.26].forEach((ex) => {
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.2), gDarkMat);
      ridge.position.set(ex, 0.23, 0.36);
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.12), gEyeMat);
      eye.position.set(ex * 1.12, 0.23, 0.38);
      const slit = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.08, 0.04), gPupilMat);
      slit.position.set(ex * 1.28, 0.23, 0.39);
      gHeadGroup.add(ridge, eye, slit);
    });
    // Dentes brancos afiados no focinho superior
    [0.64, 0.84, 1.04, 1.24].forEach((tz) => {
      [-0.24, 0.24].forEach((tx) => {
        const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.09, 4), gToothMat);
        tooth.rotation.x = Math.PI;
        tooth.position.set(tx, -0.07, tz);
        gHeadGroup.add(tooth);
      });
    });

    // Mandíbula inferior articulada (abre e fecha mordendo!)
    const gJawGroup = new THREE.Group();
    gJawGroup.position.set(0, -0.06, 0.38);
    const gLowerJaw = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 0.98), gBellyMat);
    gLowerJaw.position.set(0, -0.04, 0.5);
    const gJawRim = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.07, 0.98), gBodyMat);
    gJawRim.position.set(0, -0.06, 0.5);
    gJawGroup.add(gLowerJaw, gJawRim);
    [0.24, 0.44, 0.64, 0.84].forEach((tz) => {
      [-0.21, 0.21].forEach((tx) => {
        const bTooth = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.08, 4), gToothMat);
        bTooth.position.set(tx, 0.04, tz);
        gJawGroup.add(bTooth);
      });
    });
    gHeadGroup.add(gJawGroup);
    gatorGroup.add(gHeadGroup);

    // Cauda articulada em 2 segmentos balançando na água
    const gTail1 = new THREE.Group();
    gTail1.position.set(0, 0.24, -1.0);
    const t1Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.34, 1.05), gBodyMat);
    t1Mesh.position.set(0, 0, -0.5);
    t1Mesh.castShadow = true;
    const t1Ridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.9), gDarkMat);
    t1Ridge.position.set(0, 0.2, -0.5);
    gTail1.add(t1Mesh, t1Ridge);

    const gTail2 = new THREE.Group();
    gTail2.position.set(0, -0.02, -1.0);
    const t2Mesh = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 1.05), gBodyMat);
    t2Mesh.position.set(0, 0, -0.5);
    const t2Fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.95), gDarkMat);
    t2Fin.position.set(0, 0.15, -0.5);
    gTail2.add(t2Mesh, t2Fin);
    gTail1.add(gTail2);
    gatorGroup.add(gTail1);

    // 4 patas abertas laterais nadando
    const gLegs = [];
    [
      [-0.5, 0.18, 0.62],
      [0.5, 0.18, 0.62],
      [-0.5, 0.18, -0.62],
      [0.5, 0.18, -0.62],
    ].forEach(([lx, ly, lz]) => {
      const lg = new THREE.Group();
      lg.position.set(lx, ly, lz);
      const limb = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.22), gDarkMat);
      limb.position.set(lx > 0 ? 0.14 : -0.14, -0.06, 0);
      lg.add(limb);
      gatorGroup.add(lg);
      gLegs.push(lg);
    });

    // Onda na superfície acompanhando o jacaré
    const gRippleMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const gRipple = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.15, 20), gRippleMat);
    gRipple.rotation.x = -Math.PI / 2;
    gRipple.position.set(0, 0.22, 0.2);
    gatorGroup.add(gRipple);

    gatorGroup.position.set(LAKE_CENTER_X + 2.4, LAKE_WATER_Y - 0.16, LAKE_CENTER_Z - 1.4);
    exteriorGroup.add(gatorGroup);

    alligatorEntity = {
      mesh: gatorGroup,
      bodyMat: gBodyMat,
      jawGroup: gJawGroup,
      tail1: gTail1,
      tail2: gTail2,
      legs: gLegs,
      ripple: gRipple,
      hp: 90,
      maxHp: 90,
      alive: true,
      respawnTimer: 0,
      attackCd: 0,
      biteAnim: 0,
      hitFlash: 0,
      patrolAngle: 0.4,
      aggro: false,
    };
  }

  // Cerca ampliada da fazenda (x: -34..34, z: -30..30, porteira aberta em x: 9.0..16.0, z: 30)
  const fenceMat = new THREE.MeshStandardMaterial({ color: 0x7c502b, roughness: 0.85 });
  function addFenceSegment(x1, z1, x2, z2, targetGroup = exteriorGroup) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    const steps = Math.max(1, Math.round(len / 3.4));
    for (let i = 0; i <= steps; i++) {
      const px = x1 + (dx * i) / steps;
      const pz = z1 + (dz * i) / steps;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.45, 0.24), fenceMat);
      post.position.set(px, 0.72, pz);
      post.castShadow = true;
      targetGroup.add(post);
    }
    const angle = Math.atan2(dx, dz);
    [0.55, 1.15].forEach((ry) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, len), fenceMat);
      rail.position.set((x1 + x2) / 2, ry, (z1 + z2) / 2);
      rail.rotation.y = angle;
      rail.castShadow = true;
      targetGroup.add(rail);
    });
  }
  addFenceSegment(-34, -30, 34, -30);
  addFenceSegment(-34, 30, 9.0, 30);
  addFenceSegment(16.0, 30, 34, 30);

  // Porteira / Portal de Entrada do Sítio (x = 12.5, z = 30.0) com a placa "SÍTIO DO MACHO"!
  {
    const gateArch = new THREE.Group();
    gateArch.position.set(12.5, 0, 30.0);
    const archWoodMat = new THREE.MeshStandardMaterial({
      map: createWoodPlankTexture("#6b4423", "#422710", 2, 2),
      roughness: 0.8,
    });
    const archStoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.94 });
    const archRoofMat = new THREE.MeshStandardMaterial({
      map: createRoofTileTexture("#b4532a", "#7c2d12", 4, 2),
      roughness: 0.74,
    });

    // Dois mourões mais altos (5.6m) com base de pedra p/ passagem folgada sem nunca bater a cabeça!
    [-3.55, 3.55].forEach((px) => {
      const pBase = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.7, 0.72), archStoneMat);
      pBase.position.set(px, 0.35, 0);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.42, 5.45, 0.42), archWoodMat);
      post.position.set(px, 2.95, 0);
      post.castShadow = true;
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.25, 0.18), archWoodMat);
      brace.position.set(px + (px < 0 ? 0.45 : -0.45), 4.75, 0);
      brace.rotation.z = px < 0 ? -0.78 : 0.78;
      gateArch.add(pBase, post, brace);
    });

    // Viga transversal bem alta (y = 5.65) + telhadinho caipira de proteção acima (y = 6.2)
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(7.9, 0.32, 0.38), archWoodMat);
    topBeam.position.set(0, 5.65, 0);
    topBeam.castShadow = true;
    const capL = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.14, 0.98), archRoofMat);
    capL.position.set(0, 6.18, -0.35);
    capL.rotation.x = -0.38;
    capL.castShadow = true;
    const capR = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.14, 0.98), archRoofMat);
    capR.position.set(0, 6.18, 0.35);
    capR.rotation.x = 0.38;
    capR.castShadow = true;
    const capRidge = new THREE.Mesh(new THREE.BoxGeometry(8.25, 0.16, 0.2), archWoodMat);
    capRidge.position.set(0, 6.38, 0);
    gateArch.add(topBeam, capL, capR, capRidge);

    // Placa dupla-face suspensa ABAIXO da viga (y = 4.75, fundo a 4.18m — 100% à mostra dos dois lados e bem acima do chapéu!)
    const signTex = createWoodSignTexture("SÍTIO DO MACHO", "", "#5c3a21", "#fef3c7");
    const hangerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.35 });
    [-1.85, 1.85].forEach((hx) => {
      const hanger = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.55, 8), hangerMat);
      hanger.position.set(hx, 5.36, 0);
      gateArch.add(hanger);
    });
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(5.1, 1.14, 0.2), archWoodMat);
    signBoard.position.set(0, 4.75, 0);
    signBoard.castShadow = true;
    const signFaceS = new THREE.Mesh(new THREE.PlaneGeometry(4.92, 0.98), new THREE.MeshBasicMaterial({ map: signTex }));
    signFaceS.position.set(0, 4.75, 0.115);
    const signFaceN = new THREE.Mesh(new THREE.PlaneGeometry(4.92, 0.98), new THREE.MeshBasicMaterial({ map: signTex }));
    signFaceN.rotation.y = Math.PI;
    signFaceN.position.set(0, 4.75, -0.115);
    gateArch.add(signBoard, signFaceS, signFaceN);

    exteriorGroup.add(gateArch);
  }

  // Todas as cercas agora são PULÁVEIS (Espaço) e só têm colisão quando estão visíveis (zero parede invisível!)
  const fenceOpt = { jumpable: true };
  const westExpFenceOpt = { jumpable: true, isActive: () => state.landLevel >= 1 };
  const eastExpFenceOpt = { jumpable: true, isActive: () => state.landLevel >= 2 };
  const westOrigFenceOpt = { jumpable: true, isActive: () => state.landLevel < 1 };
  const eastOrigFenceOpt = { jumpable: true, isActive: () => state.landLevel < 2 };

  // Colisão da cerca norte e sul principal
  addObstacleBox(0, -30, 68.0, 0.7, obstacles, fenceOpt);
  addObstacleBox(-12.5, 30, 43.0, 0.7, obstacles, fenceOpt);
  addObstacleBox(25.0, 30, 18.0, 0.7, obstacles, fenceOpt);

  // Colisão das cercas de expansão (ativas somente quando o pasto foi comprado!)
  addObstacleBox(-44.0, 30, 20.0, 0.7, obstacles, westExpFenceOpt);
  addObstacleBox(-44.0, -30, 20.0, 0.7, obstacles, westExpFenceOpt);
  addObstacleBox(-54.0, 0, 0.7, 60.0, obstacles, westExpFenceOpt);

  addObstacleBox(44.0, 30, 20.0, 0.7, obstacles, eastExpFenceOpt);
  addObstacleBox(44.0, -30, 20.0, 0.7, obstacles, eastExpFenceOpt);
  addObstacleBox(54.0, -21.5, 0.7, 17.0, obstacles, eastExpFenceOpt);
  addObstacleBox(54.0, 11.5, 0.7, 37.0, obstacles, eastExpFenceOpt);

  westOriginalFenceGroup = new THREE.Group();
  addFenceSegment(-34, -30, -34, 30, westOriginalFenceGroup);
  addObstacleBox(-34, 0, 0.7, 60.0, obstacles, westOrigFenceOpt);
  exteriorGroup.add(westOriginalFenceGroup);

  eastOriginalFenceGroup = new THREE.Group();
  addFenceSegment(34, -30, 34, 30, eastOriginalFenceGroup);
  addObstacleBox(34, 0, 0.7, 60.0, obstacles, eastOrigFenceOpt);
  exteriorGroup.add(eastOriginalFenceGroup);

  // Expansão de Terreno Nível 1 (Pasto Oeste x: -54..-34, z: -30..30)
  expansionWestGroup = new THREE.Group();
  expansionWestGroup.visible = false;
  const westLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(20.5, 60.5),
    new THREE.MeshStandardMaterial({ color: 0x62a84b, roughness: 0.92 })
  );
  westLawn.rotation.x = -Math.PI / 2;
  westLawn.position.set(-44.2, 0.017, 0);
  westLawn.receiveShadow = true;
  expansionWestGroup.add(westLawn);
  addFenceSegment(-54, -30, -34, -30, expansionWestGroup);
  addFenceSegment(-54, -30, -54, 30, expansionWestGroup);
  addFenceSegment(-54, 30, -34, 30, expansionWestGroup);
  // Celeiro Caipira Reformulado no Pasto Oeste (portas brancas em X, sótão de feno, telhado de telha e ventilador de cumeeira!)
  const barnGroup = new THREE.Group();
  barnGroup.position.set(-47.0, 0, -22.0);
  const barnPlankMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#991b1b", "#5c0f0f", 3, 2),
    roughness: 0.82,
  });
  const barnTrimW = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 });
  const barnRoofMat = new THREE.MeshStandardMaterial({
    map: createRoofTileTexture("#7c2d12", "#451a03", 5, 3),
    roughness: 0.78,
  });
  const barnStoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.92 });
  const hayMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.95 });
  const ropeMat = new THREE.MeshStandardMaterial({ color: 0x7c4a21, roughness: 0.9 });

  const barnFound = new THREE.Mesh(new THREE.BoxGeometry(7.05, 0.36, 5.05), barnStoneMat);
  barnFound.position.y = 0.18;
  const barnBody = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.65, 4.8), barnPlankMat);
  barnBody.position.y = 2.15;
  barnBody.castShadow = true;
  barnBody.receiveShadow = true;
  barnGroup.add(barnFound, barnBody);

  // Pilastras brancas nos 4 cantos
  [[-3.38, -2.38], [3.38, -2.38], [-3.38, 2.38], [3.38, 2.38]].forEach(([cx, cz]) => {
    const corner = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.7, 0.22), barnTrimW);
    corner.position.set(cx, 2.15, cz);
    barnGroup.add(corner);
  });

  // Portas duplas do celeiro com moldura branca em X na fachada Sul (+Z)
  const bDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(2.85, 2.55, 0.12), barnTrimW);
  bDoorFrame.position.set(0, 1.5, 2.42);
  const bDoorInner = new THREE.Mesh(new THREE.BoxGeometry(2.52, 2.32, 0.14), barnPlankMat);
  bDoorInner.position.set(0, 1.5, 2.43);
  const bDoorMid = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.36, 0.16), barnTrimW);
  bDoorMid.position.set(0, 1.5, 2.44);
  barnGroup.add(bDoorFrame, bDoorInner, bDoorMid);
  [-0.64, 0.64].forEach((dx) => {
    const d1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.35, 0.16), barnTrimW);
    d1.position.set(dx, 1.5, 2.45);
    d1.rotation.z = 0.46;
    const d2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.35, 0.16), barnTrimW);
    d2.position.set(dx, 1.5, 2.45);
    d2.rotation.z = -0.46;
    barnGroup.add(d1, d2);
  });

  // Janela do sótão de feno + viga de roldana
  const loftFrame = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.92, 0.12), barnTrimW);
  loftFrame.position.set(0, 3.35, 2.42);
  const loftDark = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.14), new THREE.MeshStandardMaterial({ color: 0x1c1917 }));
  loftDark.position.set(0, 3.35, 2.43);
  const pulleyBeam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 1.2), ropeMat);
  pulleyBeam.position.set(0, 3.92, 2.8);
  barnGroup.add(loftFrame, loftDark, pulleyBeam);

  // Empenas triangulares fechando o telhado do celeiro (zero vão!) + telhado duas águas
  const barnGableShape = new THREE.Shape();
  barnGableShape.moveTo(-3.4, 0);
  barnGableShape.lineTo(3.4, 0);
  barnGableShape.lineTo(0, 1.72);
  barnGableShape.closePath();
  const barnGable = new THREE.Mesh(new THREE.ExtrudeGeometry(barnGableShape, { depth: 4.8, bevelEnabled: false }), barnPlankMat);
  barnGable.position.set(0, 3.94, -2.4);
  barnGable.castShadow = true;
  barnGroup.add(barnGable);

  const bSlope = Math.atan2(1.72, 3.4);
  const bLen = Math.hypot(3.4, 1.72) + 0.6;
  const bRoofL = new THREE.Mesh(new THREE.BoxGeometry(bLen, 0.22, 5.55), barnRoofMat);
  bRoofL.position.set(-1.84, 4.78, 0);
  bRoofL.rotation.z = bSlope;
  bRoofL.castShadow = true;
  const bRoofR = new THREE.Mesh(new THREE.BoxGeometry(bLen, 0.22, 5.55), barnRoofMat);
  bRoofR.position.set(1.84, 4.78, 0);
  bRoofR.rotation.z = -bSlope;
  bRoofR.castShadow = true;
  const bRidge = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 5.6), barnTrimW);
  bRidge.position.set(0, 5.74, 0);
  const cupolaBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.72, 0.95), barnTrimW);
  cupolaBase.position.set(0, 5.95, 0);
  const cupolaRoof = new THREE.Mesh(new THREE.ConeGeometry(0.82, 0.55, 4), barnRoofMat);
  cupolaRoof.position.set(0, 6.55, 0);
  cupolaRoof.rotation.y = Math.PI / 4;
  barnGroup.add(bRoofL, bRoofR, bRidge, cupolaBase, cupolaRoof);

  expansionWestGroup.add(barnGroup);
  addObstacleBox(-47.0, -22.0, 7.0, 5.0, obstacles, westExpFenceOpt ? { isActive: () => state.landLevel >= 1 } : null);

  // Fardos de feno amarrados com corda
  [
    [-40.5, 0.45, -21.0],
    [-39.1, 0.45, -21.0],
    [-39.8, 1.32, -21.0],
  ].forEach(([hx, hy, hz]) => {
    const hay = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.88, 1.0), hayMat);
    hay.position.set(hx, hy, hz);
    hay.castShadow = true;
    const strap1 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.9, 0.08), ropeMat);
    strap1.position.set(hx, hy, hz - 0.26);
    const strap2 = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.9, 0.08), ropeMat);
    strap2.position.set(hx, hy, hz + 0.26);
    expansionWestGroup.add(hay, strap1, strap2);
  });
  exteriorGroup.add(expansionWestGroup);

  // Expansão de Terreno Nível 2 (Fazenda Leste x: 34..54, z: -30..30)
  expansionEastGroup = new THREE.Group();
  expansionEastGroup.visible = false;
  const eastLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(20.5, 60.5),
    new THREE.MeshStandardMaterial({ color: 0x62a84b, roughness: 0.92 })
  );
  eastLawn.rotation.x = -Math.PI / 2;
  eastLawn.position.set(44.2, 0.017, 0);
  eastLawn.receiveShadow = true;
  expansionEastGroup.add(eastLawn);
  addFenceSegment(34, -30, 54, -30, expansionEastGroup);
  addFenceSegment(54, -30, 54, -13, expansionEastGroup);
  addFenceSegment(54, -7, 54, 30, expansionEastGroup);
  addFenceSegment(34, 30, 54, 30, expansionEastGroup);
  exteriorGroup.add(expansionEastGroup);

  // Helper para criar Cercados / Currais dos animais dentro da fazenda (com porteira aberta e colisão nas cercas!)
  const troughWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.82 });
  const troughWaterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.2 });
  const penMudMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 1.0 });
  const penHayMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.95 });

  function addFencedPen({ minX, maxX, minZ, maxZ, gateSide, gateCenter, gateWidth = 4.0, title, sub, bgColor, signPos }) {
    const halfG = gateWidth * 0.5;
    // Norte (z = minZ) — cercados também podem ser pulados com Espaço!
    if (gateSide === "north") {
      addFenceSegment(minX, minZ, gateCenter - halfG, minZ);
      addFenceSegment(gateCenter + halfG, minZ, maxX, minZ);
      addObstacleBox((minX + gateCenter - halfG) * 0.5, minZ, gateCenter - halfG - minX, 0.55, obstacles, fenceOpt);
      addObstacleBox((gateCenter + halfG + maxX) * 0.5, minZ, maxX - (gateCenter + halfG), 0.55, obstacles, fenceOpt);
    } else {
      addFenceSegment(minX, minZ, maxX, minZ);
      addObstacleBox((minX + maxX) * 0.5, minZ, maxX - minX, 0.55, obstacles, fenceOpt);
    }
    // Sul (z = maxZ)
    if (gateSide === "south") {
      addFenceSegment(minX, maxZ, gateCenter - halfG, maxZ);
      addFenceSegment(gateCenter + halfG, maxZ, maxX, maxZ);
      addObstacleBox((minX + gateCenter - halfG) * 0.5, maxZ, gateCenter - halfG - minX, 0.55, obstacles, fenceOpt);
      addObstacleBox((gateCenter + halfG + maxX) * 0.5, maxZ, maxX - (gateCenter + halfG), 0.55, obstacles, fenceOpt);
    } else {
      addFenceSegment(minX, maxZ, maxX, maxZ);
      addObstacleBox((minX + maxX) * 0.5, maxZ, maxX - minX, 0.55, obstacles, fenceOpt);
    }
    // Oeste (x = minX)
    if (gateSide === "west") {
      addFenceSegment(minX, minZ, minX, gateCenter - halfG);
      addFenceSegment(minX, gateCenter + halfG, minX, maxZ);
      addObstacleBox(minX, (minZ + gateCenter - halfG) * 0.5, 0.55, gateCenter - halfG - minZ, obstacles, fenceOpt);
      addObstacleBox(minX, (gateCenter + halfG + maxZ) * 0.5, 0.55, maxZ - (gateCenter + halfG), obstacles, fenceOpt);
    } else {
      addFenceSegment(minX, minZ, minX, maxZ);
      addObstacleBox(minX, (minZ + maxZ) * 0.5, 0.55, maxZ - minZ, obstacles, fenceOpt);
    }
    // Leste (x = maxX)
    if (gateSide === "east") {
      addFenceSegment(maxX, minZ, maxX, gateCenter - halfG);
      addFenceSegment(maxX, gateCenter + halfG, maxX, maxZ);
      addObstacleBox(maxX, (minZ + gateCenter - halfG) * 0.5, 0.55, gateCenter - halfG - minZ, obstacles, fenceOpt);
      addObstacleBox(maxX, (gateCenter + halfG + maxZ) * 0.5, 0.55, maxZ - (gateCenter + halfG), obstacles, fenceOpt);
    } else {
      addFenceSegment(maxX, minZ, maxX, maxZ);
      addObstacleBox(maxX, (minZ + maxZ) * 0.5, 0.55, maxZ - minZ, obstacles, fenceOpt);
    }
    // Placas dos cercados removidas para visual rural mais limpo
  }

  function addWaterTrough(x, z, rotY = 0) {
    const tg = new THREE.Group();
    tg.position.set(x, 0, z);
    tg.rotation.y = rotY;
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 0.95), troughWoodMat);
    box.position.y = 0.325;
    box.castShadow = true;
    const water = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.72), troughWaterMat);
    water.position.y = 0.63;
    tg.add(box, water);
    exteriorGroup.add(tg);
    addObstacleBox(x, z, rotY ? 1.0 : 2.4, rotY ? 2.4 : 1.0);
  }

  // 1) Curral das Vacas (Leste da fazenda: x 17.5..31.5, z -4.0..11.5)
  addFencedPen({
    minX: 17.5,
    maxX: 31.5,
    minZ: -4.0,
    maxZ: 11.5,
    gateSide: "west",
    gateCenter: 3.8,
    gateWidth: 4.2,
    title: "CURRAL DAS VACAS 🐄",
    sub: "Leite Fresco Diário",
    bgColor: "#14532d",
    signPos: [17.5, -1.2, -Math.PI / 2],
  });
  addWaterTrough(29.2, -1.6, 0);
  [
    [28.5, 0.45, 9.2],
    [29.9, 0.45, 9.2],
    [29.2, 1.3, 9.2],
  ].forEach(([hx, hy, hz]) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.85, 0.95), penHayMat);
    h.position.set(hx, hy, hz);
    h.castShadow = true;
    exteriorGroup.add(h);
  });

  // 2) Chiqueiro dos Porcos (Sudoeste da fazenda: x -31.5..-17.5, z 14.0..27.5)
  addFencedPen({
    minX: -31.5,
    maxX: -17.5,
    minZ: 14.0,
    maxZ: 27.5,
    gateSide: "east",
    gateCenter: 20.8,
    gateWidth: 4.2,
    title: "CHIQUEIRO DOS PORCOS 🐷",
    sub: "Trufas Caipiras",
    bgColor: "#7c2d12",
    signPos: [-17.5, 16.0, Math.PI / 2],
  });
  const mudPool = new THREE.Mesh(new THREE.CircleGeometry(3.1, 16), penMudMat);
  mudPool.rotation.x = -Math.PI / 2;
  mudPool.position.set(-25.8, 0.026, 22.0);
  mudPool.receiveShadow = true;
  exteriorGroup.add(mudPool);
  addWaterTrough(-29.2, 16.2, 0);

  // 3) Cercado das Ovelhas (Centro-Sul da fazenda: x -13.0..6.5, z 15.5..27.5)
  addFencedPen({
    minX: -13.0,
    maxX: 6.5,
    minZ: 15.5,
    maxZ: 27.5,
    gateSide: "north",
    gateCenter: -3.2,
    gateWidth: 4.2,
    title: "CERCADO DAS OVELHAS 🐑",
    sub: "Lã Macia da Mantiqueira",
    bgColor: "#1e3a8a",
    signPos: [1.8, 15.5, 0],
  });
  addWaterTrough(-10.2, 25.0, 0);
  [
    [3.8, 0.45, 25.2],
    [5.1, 0.45, 25.2],
  ].forEach(([hx, hy, hz]) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.85, 0.95), penHayMat);
    h.position.set(hx, hy, hz);
    h.castShadow = true;
    exteriorGroup.add(h);
  });

  // 4) Cercadinho do Galinheiro (Noroeste da fazenda: x -30.5..-17.5, z -26.5..-12.5)
  addFencedPen({
    minX: -30.5,
    maxX: -17.5,
    minZ: -26.5,
    maxZ: -12.5,
    gateSide: "east",
    gateCenter: -17.5,
    gateWidth: 4.2,
  });

  exteriorGroup.add(livestockGroup);


  // Alyffer's House in Pau Arcado — Exterior Reformulado (reboco texturizado, rodapé de pedra, telha cerâmica, varanda com guarda-corpo, floreiras & torre d'água detalhada!)
  const house = new THREE.Group();
  house.position.set(0, 0, -20.5);

  const wallMat = new THREE.MeshStandardMaterial({
    map: createStuccoWallTexture("#f6eedc", "#dfd0b4", 3, 2),
    roughness: 0.84,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#6b4423", "#422710", 2, 2),
    roughness: 0.78,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    map: createRoofTileTexture("#b4532a", "#7c2d12", 7, 5),
    roughness: 0.72,
  });
  const porchMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#8b5a2b", "#5c3a1a", 5, 2),
    roughness: 0.84,
  });
  const houseStoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.94 });
  const shutterMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.78 });
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.65, roughness: 0.35 });
  const houseBrassMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.78, roughness: 0.25 });

  // Fundação de pedra + corpo principal
  const foundation = new THREE.Mesh(new THREE.BoxGeometry(11.15, 0.55, 7.55), houseStoneMat);
  foundation.position.y = 0.275;
  foundation.receiveShadow = true;
  const body = new THREE.Mesh(new THREE.BoxGeometry(10.8, 4.2, 7.2), wallMat);
  body.position.y = 2.45;
  body.castShadow = true;
  body.receiveShadow = true;
  house.add(foundation, body);

  // Pilastras de canto em madeira rústica
  [[-5.38, -3.58], [5.38, -3.58], [-5.38, 3.58], [5.38, 3.58]].forEach(([cx, cz]) => {
    const corner = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.45, 0.24), trimMat);
    corner.position.set(cx, 2.25, cz);
    house.add(corner);
  });

  // Empenas triangulares (oitões) fechando perfeitamente as laterais Oeste/Leste sob o telhado duas águas!
  const gableShape = new THREE.Shape();
  gableShape.moveTo(-3.6, 0);
  gableShape.lineTo(3.6, 0);
  gableShape.lineTo(0, 2.35);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, { depth: 0.28, bevelEnabled: false });
  [-5.39, 5.11].forEach((gx) => {
    const gable = new THREE.Mesh(gableGeo, wallMat);
    gable.rotation.y = Math.PI / 2;
    gable.position.set(gx, 4.54, 0);
    gable.castShadow = true;
    house.add(gable);
  });

  // Telhado Duas Águas perfeitamente alinhado ao corpo da casa (zero cantos sobrando, zero sobreposição!)
  const slopeAngle = Math.atan2(2.35, 3.6); // ~0.578 rad
  const slopeLen = Math.hypot(3.6, 2.35) + 0.78; // 5.08m com beiral limpo
  const roofWidth = 11.7;

  const roofFront = new THREE.Mesh(new THREE.BoxGeometry(roofWidth, 0.2, slopeLen), roofMat);
  roofFront.position.set(0, 5.56, 1.98);
  roofFront.rotation.x = slopeAngle;
  roofFront.castShadow = true;
  roofFront.receiveShadow = true;

  const roofBack = new THREE.Mesh(new THREE.BoxGeometry(roofWidth, 0.2, slopeLen), roofMat);
  roofBack.position.set(0, 5.56, -1.98);
  roofBack.rotation.x = -slopeAngle;
  roofBack.castShadow = true;
  roofBack.receiveShadow = true;

  // Cumeeira + testeiras de madeira nas bordas
  const ridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(roofWidth + 0.12, 0.24, 0.34), trimMat);
  ridgeBeam.position.set(0, 6.94, 0);
  const fasciaFront = new THREE.Mesh(new THREE.BoxGeometry(roofWidth + 0.04, 0.22, 0.14), trimMat);
  fasciaFront.position.set(0, 4.18, 4.08);
  const fasciaBack = new THREE.Mesh(new THREE.BoxGeometry(roofWidth + 0.04, 0.22, 0.14), trimMat);
  fasciaBack.position.set(0, 4.18, -4.08);
  house.add(roofFront, roofBack, ridgeBeam, fasciaFront, fasciaBack);

  // Torre lateral externa da Caixa d'Água Azul com escada metálica e tubulação!
  const towerGroup = new THREE.Group();
  towerGroup.position.set(6.75, 0, -1.6);
  [[-0.72, -0.72], [0.72, -0.72], [-0.72, 0.72], [0.72, 0.72]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.35, 0.18), trimMat);
    leg.position.set(lx, 2.175, lz);
    leg.castShadow = true;
    towerGroup.add(leg);
  });
  [1.4, 2.85].forEach((by) => {
    const braceX1 = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 0.12), trimMat);
    braceX1.position.set(0, by, 0.72);
    const braceX2 = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 0.12), trimMat);
    braceX2.position.set(0, by, -0.72);
    const braceZ1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.55), trimMat);
    braceZ1.position.set(0.72, by, 0);
    const braceZ2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.55), trimMat);
    braceZ2.position.set(-0.72, by, 0);
    towerGroup.add(braceX1, braceX2, braceZ1, braceZ2);
  });
  // Escada metálica lateral + cano PVC descendo para a casa
  [-0.22, 0.22].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 4.4, 6), ironMat);
    rail.position.set(rx, 2.2, 0.88);
    towerGroup.add(rail);
  });
  for (let ry = 0.45; ry <= 4.1; ry += 0.48) {
    const rung = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.04), ironMat);
    rung.position.set(0, ry, 0.88);
    towerGroup.add(rung);
  }
  const pvcPipe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 4.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.45 })
  );
  pvcPipe.position.set(-0.62, 2.2, 0.0);
  towerGroup.add(pvcPipe);

  const towerPlatform = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.2, 2.05), porchMat);
  towerPlatform.position.y = 4.38;
  towerPlatform.castShadow = true;
  towerGroup.add(towerPlatform);
  const waterTower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.78, 1.18, 18),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.38 })
  );
  waterTower.position.set(0, 5.06, 0);
  waterTower.castShadow = true;
  const tankRib = new THREE.Mesh(
    new THREE.TorusGeometry(0.85, 0.035, 6, 18),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.4 })
  );
  tankRib.rotation.x = Math.PI / 2;
  tankRib.position.set(0, 5.18, 0);
  const waterLid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.94, 0.94, 0.14, 18),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.4 })
  );
  waterLid.position.set(0, 5.7, 0);
  towerGroup.add(waterTower, tankRib, waterLid);
  house.add(towerGroup);
  addObstacleBox(6.75, -22.1, 2.0, 2.0);

  // Chaminé de tijolo com moldura
  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.88, 2.55, 0.88),
    new THREE.MeshStandardMaterial({ color: 0x8c3b23, roughness: 0.88 })
  );
  chimney.position.set(-3.0, 6.05, -1.1);
  chimney.castShadow = true;
  const chimneyCap = new THREE.Mesh(
    new THREE.BoxGeometry(1.12, 0.18, 1.12),
    new THREE.MeshStandardMaterial({ color: 0x6b2c1a, roughness: 0.85 })
  );
  chimneyCap.position.set(-3.0, 7.38, -1.1);
  house.add(chimney, chimneyCap);

  // Varanda frontal de madeira com degraus + guarda-corpo lateral!
  const porchDeck = new THREE.Mesh(new THREE.BoxGeometry(11.1, 0.36, 3.25), porchMat);
  porchDeck.position.set(0, 0.18, 5.12);
  porchDeck.receiveShadow = true;
  const porchStep = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.18, 0.65), porchMat);
  porchStep.position.set(0, 0.09, 6.95);
  porchStep.receiveShadow = true;
  house.add(porchDeck, porchStep);

  // Guarda-corpos da varanda à esquerda e direita (deixa o centro aberto para entrada!)
  [-3.4, 3.4].forEach((rx) => {
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.1, 0.12), trimMat);
    topRail.position.set(rx, 1.18, 6.52);
    const botRail = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.08, 0.1), trimMat);
    botRail.position.set(rx, 0.52, 6.52);
    house.add(topRail, botRail);
    for (let bx = rx - 1.25; bx <= rx + 1.26; bx += 0.5) {
      const bal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.68, 0.08), trimMat);
      bal.position.set(bx, 0.85, 6.52);
      house.add(bal);
    }
  });

  const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.18, 3.4), roofMat);
  porchRoof.position.set(0, 3.84, 5.22);
  porchRoof.rotation.x = 0.12;
  porchRoof.castShadow = true;
  house.add(porchRoof);

  [-4.9, -1.9, 1.9, 4.9].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.32, 0.24), trimMat);
    pillar.position.set(px, 2.0, 6.5);
    pillar.castShadow = true;
    const pBase = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.36), houseStoneMat);
    pBase.position.set(px, 0.44, 6.5);
    house.add(pillar, pBase);
  });

  // Porta frontal almofadada com batente, puxador dourado e capacho
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.82, 2.86, 0.2), trimMat);
  doorFrame.position.set(0, 1.72, 3.6);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.56, 2.68, 0.18), porchMat);
  door.position.set(0, 1.68, 3.64);
  const doorKnob = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), houseBrassMat);
  doorKnob.position.set(0.56, 1.54, 3.76);
  const doorWin = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.56, 0.05), new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.3 }));
  doorWin.position.set(0, 2.38, 3.74);
  const porchMatRug = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.04, 0.78), new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.95 }));
  porchMatRug.position.set(0, 0.38, 4.35);
  house.add(doorFrame, door, doorKnob, doorWin, porchMatRug);

  // Janelas frontais e laterais com venezianas verdes, travessas e floreiras!
  windowMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.3,
    roughness: 0.2,
  });
  const flowerBoxMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.85 });
  const flowerLeafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8 });
  const flowerPetMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.65 });

  [-3.25, 3.25].forEach((wx) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.78, 1.48, 0.16), trimMat);
    frame.position.set(wx, 2.34, 3.61);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.48, 1.18, 0.18), windowMat);
    glass.position.set(wx, 2.34, 3.63);
    const mullV = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.2, 0.2), trimMat);
    mullV.position.set(wx, 2.34, 3.64);
    const mullH = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.07, 0.2), trimMat);
    mullH.position.set(wx, 2.34, 3.64);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.12, 0.34), trimMat);
    sill.position.set(wx, 1.58, 3.69);
    // Venezianas verdes abertas nas laterais
    [-1.12, 1.12].forEach((sx) => {
      const shut = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.44, 0.08), shutterMat);
      shut.position.set(wx + sx, 2.34, 3.65);
      house.add(shut);
    });
    // Floreira com florzinhas sob a janela
    const fBox = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.26, 0.34), flowerBoxMat);
    fBox.position.set(wx, 1.4, 3.74);
    const fLeaf = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.14, 0.24), flowerLeafMat);
    fLeaf.position.set(wx, 1.56, 3.74);
    [-0.4, 0, 0.4].forEach((fx) => {
      const fl = new THREE.Mesh(new THREE.DodecahedronGeometry(0.085, 0), flowerPetMat);
      fl.position.set(wx + fx, 1.66, 3.74);
      house.add(fl);
    });
    house.add(frame, glass, mullV, mullH, sill, fBox, fLeaf);
  });

  // Banco rústico com encosto + mesinha de café na varanda
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 0.68), porchMat);
  benchSeat.position.set(-3.3, 0.84, 4.72);
  benchSeat.castShadow = true;
  const benchBack = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.56, 0.1), porchMat);
  benchBack.position.set(-3.3, 1.24, 4.4);
  [-4.22, -2.38].forEach((bx) => {
    const bLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5, 0.62), trimMat);
    bLeg.position.set(bx, 0.6, 4.72);
    house.add(bLeg);
  });
  const porchTable = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.52, 0.68), trimMat);
  porchTable.position.set(3.25, 0.62, 4.75);
  const porchMug = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.16, 10), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
  porchMug.position.set(3.25, 0.96, 4.75);
  house.add(benchSeat, benchBack, porchTable, porchMug);

  // Lanterna metálica suspensa na varanda
  lanternMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.45,
  });
  const lanternChain = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.36, 6), ironMat);
  lanternChain.position.set(1.2, 3.55, 6.2);
  const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.16, 4), ironMat);
  lanternCap.position.set(1.2, 3.36, 6.2);
  lanternCap.rotation.y = Math.PI / 4;
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.26), lanternMat);
  lantern.position.set(1.2, 3.16, 6.2);
  house.add(lanternChain, lanternCap, lantern);

  // Viga frontal limpa da varanda (placa SÍTIO DO MACHO movida para o portal da entrada do sítio!)
  const porchFascia = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.22, 0.2), trimMat);
  porchFascia.position.set(0, 3.52, 6.52);
  porchFascia.castShadow = true;
  house.add(porchFascia);

  exteriorGroup.add(house);
  addObstacleBox(0, -18.8, 11.0, 10.2);

  // Galinheiro Caipira Reformulado (-24.0, 0, -21.0) — tábuas de madeira, rampa, telhado 2 águas, ninho de palha e comedouro!
  const coop = new THREE.Group();
  coop.position.set(-24.0, 0, -21.0);
  const coopWoodMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#9a3412", "#5c1f0a", 2, 2),
    roughness: 0.85,
  });
  const strawMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.96 });
  const coopBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.75, 2.55), coopWoodMat);
  coopBody.position.y = 1.05;
  coopBody.castShadow = true;
  coopBody.receiveShadow = true;
  coop.add(coopBody);

  // Pernas elevadas + pilares de canto
  [[-1.54, -1.2], [1.54, -1.2], [-1.54, 1.2], [1.54, 1.2]].forEach(([px, pz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.96, 0.16), trimMat);
    leg.position.set(px, 0.98, pz);
    coop.add(leg);
  });

  // Empenas triangulares fechando o telhado do galinheiro (zero vão!)
  const coopGableShape = new THREE.Shape();
  coopGableShape.moveTo(-1.6, 0);
  coopGableShape.lineTo(1.6, 0);
  coopGableShape.lineTo(0, 0.75);
  coopGableShape.closePath();
  const coopGable = new THREE.Mesh(new THREE.ExtrudeGeometry(coopGableShape, { depth: 2.55, bevelEnabled: false }), coopWoodMat);
  coopGable.position.set(0, 1.9, -1.275);
  coop.add(coopGable);

  const cSlope = Math.atan2(0.75, 1.6);
  const cLen = Math.hypot(1.6, 0.75) + 0.38;
  const coopRoofL = new THREE.Mesh(new THREE.BoxGeometry(cLen, 0.14, 3.0), roofMat);
  coopRoofL.position.set(-0.88, 2.28, 0);
  coopRoofL.rotation.z = cSlope;
  coopRoofL.castShadow = true;
  const coopRoofR = new THREE.Mesh(new THREE.BoxGeometry(cLen, 0.14, 3.0), roofMat);
  coopRoofR.position.set(0.88, 2.28, 0);
  coopRoofR.rotation.z = -cSlope;
  coopRoofR.castShadow = true;
  const coopRidge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 3.05), trimMat);
  coopRidge.position.set(0, 2.72, 0);
  coop.add(coopRoofL, coopRoofR, coopRidge);

  // Portinha das galinhas + rampa de madeira + janela telada
  const cDoor = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.72, 0.1), new THREE.MeshStandardMaterial({ color: 0x1c1917 }));
  cDoor.position.set(-0.85, 0.62, 1.26);
  const cRamp = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.08, 1.05), porchMat);
  cRamp.position.set(-0.85, 0.24, 1.72);
  cRamp.rotation.x = 0.44;
  const cWireWin = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.62, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, wireframe: true })
  );
  cWireWin.position.set(0.65, 1.28, 1.28);
  coop.add(cDoor, cRamp, cWireWin);

  // Caixa-ninho de madeira com palha + ovos visíveis
  const nestBox = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.34, 0.65), trimMat);
  nestBox.position.set(0.25, 0.17, 1.54);
  const nestStraw = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.12, 0.52), strawMat);
  nestStraw.position.set(0.25, 0.3, 1.54);
  coop.add(nestBox, nestStraw);

  coopEggVisuals = [];
  [-0.22, 0.25, 0.72].forEach((ex) => {
    const egg = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 })
    );
    egg.scale.set(1, 1.25, 1);
    egg.position.set(ex, 0.38, 1.54);
    coop.add(egg);
    coopEggVisuals.push(egg);
  });

  // Comedouro vermelho ao lado do galinheiro
  const feederBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.36, 0.14, 12),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 })
  );
  feederBase.position.set(1.95, 0.07, 0.7);
  const feederTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 0.42, 12),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 })
  );
  feederTop.position.set(1.95, 0.32, 0.7);
  coop.add(feederBase, feederTop);

  exteriorGroup.add(coop);
  addObstacleBox(-24.0, -21.0, 3.4, 2.8);

  // Poço d'Água Caipira Reformulado (-18.0, 0, -2.5) — pedras em anéis, manivela, corda, balde pendurado e telhado de telha!
  const well = new THREE.Group();
  well.position.set(-18.0, 0, -2.5);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.92 });
  const stoneDarkMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.96 });

  const wellCore = new THREE.Mesh(new THREE.CylinderGeometry(1.26, 1.38, 1.12, 16), stoneDarkMat);
  wellCore.position.y = 0.56;
  wellCore.castShadow = true;
  well.add(wellCore);

  // Blocos de pedra arredondados formando a parede do poço
  for (let row = 0; row < 3; row++) {
    const count = 12;
    for (let k = 0; k < count; k++) {
      const ang = (k / count) * Math.PI * 2 + (row % 2) * 0.26;
      const rad = 1.34 - row * 0.04;
      const blk = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.32, 0.28), k % 2 === 0 ? stoneMat : stoneDarkMat);
      blk.position.set(Math.cos(ang) * rad, 0.2 + row * 0.35, Math.sin(ang) * rad);
      blk.rotation.y = -ang + Math.PI / 2;
      blk.castShadow = true;
      well.add(blk);
    }
  }
  const wellRimCap = new THREE.Mesh(new THREE.TorusGeometry(1.26, 0.16, 8, 20), stoneMat);
  wellRimCap.rotation.x = Math.PI / 2;
  wellRimCap.position.y = 1.14;
  well.add(wellRimCap);

  wellWaterMesh = new THREE.Mesh(
    new THREE.CircleGeometry(1.12, 18),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.15,
    })
  );
  wellWaterMesh.rotation.x = -Math.PI / 2;
  wellWaterMesh.position.y = 1.08;
  well.add(wellWaterMesh);

  // Postes de madeira + eixo da manivela + corda + balde pendurado!
  [-1.18, 1.18].forEach((px) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.15, 0.2), trimMat);
    post.position.set(px, 2.08, 0);
    post.castShadow = true;
    well.add(post);
  });
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.5, 10), porchMat);
  axle.rotation.z = Math.PI / 2;
  axle.position.set(0, 2.1, 0);
  const crankArm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.06), ironMat);
  crankArm.position.set(1.34, 2.26, 0);
  const crankHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.26, 8), trimMat);
  crankHandle.rotation.z = Math.PI / 2;
  crankHandle.position.set(1.48, 2.42, 0);
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.72, 6),
    new THREE.MeshStandardMaterial({ color: 0xd6b588, roughness: 0.95 })
  );
  rope.position.set(0, 1.72, 0);
  const wellBucket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.17, 0.34, 12), porchMat);
  wellBucket.position.set(0, 1.38, 0);
  const wellBucketBand = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.018, 6, 12), ironMat);
  wellBucketBand.rotation.x = Math.PI / 2;
  wellBucketBand.position.set(0, 1.44, 0);
  well.add(axle, crankArm, crankHandle, rope, wellBucket, wellBucketBand);

  // Telhado duas águas do poço
  const wRoofL = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.14, 2.45), roofMat);
  wRoofL.position.set(-0.74, 3.42, 0);
  wRoofL.rotation.z = 0.54;
  wRoofL.castShadow = true;
  const wRoofR = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.14, 2.45), roofMat);
  wRoofR.position.set(0.74, 3.42, 0);
  wRoofR.rotation.z = -0.54;
  wRoofR.castShadow = true;
  const wRidge = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 2.5), trimMat);
  wRidge.position.set(0, 3.86, 0);
  well.add(wRoofL, wRoofR, wRidge);

  exteriorGroup.add(well);
  addObstacleBox(-18.0, -2.5, 2.75, 2.75);

  // Baú de Madeira do Sítio p/ guardar itens (no lugar da antiga composteira em -18.0, 0, 6.5)
  const chestGroup = new THREE.Group();
  chestGroup.position.set(-18.0, 0, 6.5);
  chestGroup.rotation.y = Math.PI / 2;

  const chestWoodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.78 });
  const chestDarkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
  const chestIronMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.72, roughness: 0.35 });
  const chestGoldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.78, roughness: 0.25 });

  // Base do baú + faixas metálicas
  const chestBase = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.92, 1.32), chestWoodMat);
  chestBase.position.y = 0.46;
  chestBase.castShadow = true;
  chestBase.receiveShadow = true;
  const chestBottomTrim = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.14, 1.4), chestDarkMat);
  chestBottomTrim.position.y = 0.07;
  chestGroup.add(chestBase, chestBottomTrim);

  [-0.92, 0, 0.92].forEach((bx) => {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.94, 1.38), chestIronMat);
    strap.position.set(bx, 0.47, 0);
    chestGroup.add(strap);
  });

  // Tampa articulada (pivô na borda traseira z = -0.66 para abrir suavemente!)
  yardChestLidPivot = new THREE.Group();
  yardChestLidPivot.position.set(0, 0.92, -0.66);
  const lidBox = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.36, 1.36), chestWoodMat);
  lidBox.position.set(0, 0.18, 0.66);
  lidBox.castShadow = true;
  const lidTopArch = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.14, 1.02), chestDarkMat);
  lidTopArch.position.set(0, 0.4, 0.66);
  yardChestLidPivot.add(lidBox, lidTopArch);
  [-0.92, 0, 0.92].forEach((bx) => {
    const lStrap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.38, 1.4), chestIronMat);
    lStrap.position.set(bx, 0.19, 0.66);
    yardChestLidPivot.add(lStrap);
  });
  // Fecho dourado na frente da tampa
  const clasp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.34, 0.1), chestGoldMat);
  clasp.position.set(0, 0.02, 1.36);
  const keyhole = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.12), chestDarkMat);
  keyhole.position.set(0, -0.02, 1.37);
  yardChestLidPivot.add(clasp, keyhole);

  chestGroup.add(yardChestLidPivot);
  exteriorGroup.add(chestGroup);
  addObstacleBox(-18.0, 6.5, 1.65, 2.35);

  // Cooperativa Rural (Sementes & Melhorias do Quintal) no lado nordeste (21.5, 0, -16.5)
  const stand = new THREE.Group();
  stand.position.set(21.5, 0, -16.5);
  stand.rotation.y = -0.25;

  const coopWoodDark = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
  const coopTopMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.72 });
  const coopGreenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.62 });
  const coopCreamMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.72 });
  const sackMat = new THREE.MeshStandardMaterial({ color: 0xd6b588, roughness: 0.9 });

  const standBase = new THREE.Mesh(new THREE.BoxGeometry(4.28, 0.14, 1.76), coopWoodDark);
  standBase.position.y = 0.07;
  const counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.0, 1.66), trimMat);
  counter.position.y = 0.62;
  counter.castShadow = true;
  counter.receiveShadow = true;
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(4.42, 0.12, 1.88), coopTopMat);
  counterTop.position.y = 1.15;
  counterTop.castShadow = true;
  stand.add(standBase, counter, counterTop);

  [
    [-2.02, -0.74, 2.86],
    [2.02, -0.74, 2.86],
    [-2.02, 0.74, 2.6],
    [2.02, 0.74, 2.6],
  ].forEach(([px, pz, ph]) => {
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.15, ph, 0.15), coopWoodDark);
    pole.position.set(px, ph * 0.5, pz);
    pole.castShadow = true;
    stand.add(pole);
  });
  const cBeamF = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 0.12), coopWoodDark);
  cBeamF.position.set(0, 2.55, 0.74);
  const cBeamB = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.12, 0.12), coopWoodDark);
  cBeamB.position.set(0, 2.8, -0.74);
  stand.add(cBeamF, cBeamB);

  const coopRoofGroup = new THREE.Group();
  coopRoofGroup.position.set(0, 2.74, 0.05);
  coopRoofGroup.rotation.x = 0.16;
  const cStripes = 9;
  const cSw = 4.72 / cStripes;
  for (let i = 0; i < cStripes; i++) {
    const stp = new THREE.Mesh(
      new THREE.BoxGeometry(cSw + 0.01, 0.14, 2.34),
      i % 2 === 0 ? coopGreenMat : coopCreamMat
    );
    stp.position.x = -2.36 + cSw * (i + 0.5);
    stp.castShadow = true;
    coopRoofGroup.add(stp);
    const val = new THREE.Mesh(
      new THREE.BoxGeometry(cSw + 0.01, 0.22, 0.06),
      i % 2 === 0 ? coopGreenMat : coopCreamMat
    );
    val.position.set(-2.36 + cSw * (i + 0.5), -0.14, 1.15);
    coopRoofGroup.add(val);
  }
  stand.add(coopRoofGroup);

  [-1.3, -0.55, 0.2].forEach((sx, idx) => {
    const sack = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.23, 0.42, 8), sackMat);
    sack.position.set(sx, 1.41, 0.12);
    const ribbon = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.19, 0.06, 8),
      new THREE.MeshStandardMaterial({ color: idx === 0 ? 0x22c55e : idx === 1 ? 0xef4444 : 0xfacc15 })
    );
    ribbon.position.set(sx, 1.54, 0.12);
    stand.add(sack, ribbon);
  });
  const seedCrate = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.26, 0.68), coopWoodDark);
  seedCrate.position.set(1.22, 1.34, 0.1);
  stand.add(seedCrate);

  const standSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.72, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("COOPERATIVA RURAL", "Sementes & Melhorias do Sítio", "#14532d", "#fef08a"),
    })
  );
  standSign.position.set(0, 3.06, 0.74);
  stand.add(standSign);
  [-1.45, 1.45].forEach((bx) => {
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.42, 0.1), coopWoodDark);
    br.position.set(bx, 2.74, 0.74);
    stand.add(br);
  });

  exteriorGroup.add(stand);
  addObstacleBox(21.5, -16.5, 4.2, 2.2);

  // Ponto / Mini-Terminal do Ônibus 402 ENCOSTADO ao lado da Estrada do Garcia (fora do meio da pista!)
  const stopGroup = new THREE.Group();
  stopGroup.position.set(21.8, 0, 39.8);
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.4 });
  const stopGlassMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.38, roughness: 0.15 });
  const shelterBack = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.45, 0.14), metalMat);
  shelterBack.position.set(0, 1.225, -0.72);
  shelterBack.castShadow = true;
  stopGroup.add(shelterBack);
  // 4 pilares verticais firmes apoiados direto no chão (y = 0)
  [
    [-2.14, -0.68],
    [2.14, -0.68],
    [-2.14, 0.78],
    [2.14, 0.78],
  ].forEach(([px, pz]) => {
    const pil = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.48, 0.14), metalMat);
    pil.position.set(px, 1.24, pz);
    pil.castShadow = true;
    stopGroup.add(pil);
  });
  [-2.14, 2.14].forEach((sx) => {
    const sidePane = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.1, 1.38), stopGlassMat);
    sidePane.position.set(sx, 1.22, 0.05);
    stopGroup.add(sidePane);
  });
  const shelterRoof = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 2.15), metalMat);
  shelterRoof.position.set(0, 2.52, 0.08);
  shelterRoof.castShadow = true;
  stopGroup.add(shelterRoof);
  const benchStop = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 0.54), trimMat);
  benchStop.position.set(0, 0.52, -0.2);
  stopGroup.add(benchStop);
  [-1.35, 1.35].forEach((bx) => {
    const bLeg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5, 0.44), metalMat);
    bLeg.position.set(bx, 0.25, -0.2);
    stopGroup.add(bLeg);
  });
  // Poste de Parada JundMob 402 ao lado do abrigo
  const stopPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.9, 8), metalMat);
  stopPole.position.set(2.9, 1.45, 0.75);
  stopPole.castShadow = true;
  stopGroup.add(stopPole);
  const stopPolePlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("402", "JundMob", "#1d4ed8", "#ffffff") })
  );
  stopPolePlate.position.set(2.9, 2.65, 0.75);
  stopGroup.add(stopPolePlate);

  // Relógio/Painel Digital 3D no Ponto 402 indicando o tempo que falta para o ônibus chegar!
  yardBusClock = createBusClockDisplay("PONTO 402 • PAU ARCADO", true);
  yardBusClock.group.position.set(0, 3.24, 0.52);
  stopGroup.add(yardBusClock.group);
  [-0.95, 0.95].forEach((cx) => {
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.24, 0.1), metalMat);
    br.position.set(cx, 2.62, 0.52);
    stopGroup.add(br);
  });

  exteriorGroup.add(stopGroup);
  addObstacleBox(21.8, 39.8, 4.7, 1.65);

  // Ônibus 402 estacionado paralelo à Estrada do Garcia, encostado na calçada do ponto (hidden on rainy days!)
  bus402YardMesh = createBusModel("402 PAU ARCADO", "Via Estrada do Garcia");
  bus402YardMesh.position.set(28.0, 0, 42.9);
  bus402YardMesh.rotation.y = Math.PI / 2;
  exteriorGroup.add(bus402YardMesh);
  addObstacleBox(28.0, 42.9, 6.7, 2.65);

  // Cachorro Orelha 3D ("Orelha") no quintal — nunca tente chutar ele!
  const dog = new THREE.Group();
  const carameloMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.75 });
  const earMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });
  const dogBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.42, 0.82), carameloMat);
  dogBody.position.y = 0.46;
  dogBody.castShadow = true;
  dog.add(dogBody);
  const dogHead = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.36, 0.4), carameloMat);
  dogHead.position.set(0, 0.72, 0.42);
  dog.add(dogHead);
  // Orelhas grandes e caídas do Orelha!
  const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.22), earMat);
  leftEar.position.set(-0.23, 0.68, 0.42);
  leftEar.rotation.z = 0.18;
  const rightEar = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.22), earMat);
  rightEar.position.set(0.23, 0.68, 0.42);
  rightEar.rotation.z = -0.18;
  dog.add(leftEar, rightEar);
  const dogEyeMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0x000000, emissiveIntensity: 0 });
  const dogLEye = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.04), dogEyeMat);
  dogLEye.position.set(-0.1, 0.78, 0.625);
  const dogREye = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.04), dogEyeMat);
  dogREye.position.set(0.1, 0.78, 0.625);
  const dogSnout = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x451a03 })
  );
  dogSnout.position.set(0, 0.66, 0.66);
  dog.add(dogLEye, dogREye, dogSnout);
  const dogTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 0.1), carameloMat);
  dogTail.position.set(0, 0.68, -0.45);
  dogTail.rotation.x = -0.5;
  dog.add(dogTail);
  const dogLegs = [];
  [
    [-0.16, 0.34, 0.28],
    [0.16, 0.34, 0.28],
    [-0.16, 0.34, -0.28],
    [0.16, 0.34, -0.28],
  ].forEach(([lx, ly, lz]) => {
    const lg = new THREE.Group();
    lg.position.set(lx, ly, lz);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.34, 0.12), carameloMat);
    leg.position.y = -0.17;
    lg.castShadow = true;
    lg.add(leg);
    dog.add(lg);
    dogLegs.push(lg);
  });
  dog.position.set(6.8, 0, -12.5);
  exteriorGroup.add(dog);
  dogOrelha = {
    mesh: dog,
    tail: dogTail,
    leftEar,
    rightEar,
    legs: dogLegs,
    eyeMat: dogEyeMat,
    home: new THREE.Vector3(6.8, 0, -12.5),
    target: new THREE.Vector3(6.8, 0, -12.5),
    wait: 1.5,
    vel: new THREE.Vector3(),
    angVel: new THREE.Vector3(),
    ragdoll: false,
    ragdollTimer: 0,
    kickCount: 0,
    angry: false,
    pendingAngry: false,
    angryTimer: 0,
    barkCd: 0,
  };

  // Onça Pintada 3D (Evento aleatório no quintal — Alyffer luta com a Enxada!)
  const jagGroup = new THREE.Group();
  const jagFurMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.72 });
  const jagSpotMat = new THREE.MeshStandardMaterial({ color: 0x291509, roughness: 0.85 });
  const jagBellyMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.8 });
  const jagEyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  const jagBody = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.66, 1.65), jagFurMat);
  jagBody.position.set(0, 0.86, 0);
  jagBody.castShadow = true;
  jagGroup.add(jagBody);

  const jagBelly = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.16, 1.4), jagBellyMat);
  jagBelly.position.set(0, 0.56, 0);
  jagGroup.add(jagBelly);

  // Pintas da Onça Pintada
  [
    [-0.39, 0.96, 0.42],
    [0.39, 0.84, 0.2],
    [-0.39, 0.78, -0.25],
    [0.39, 1.0, -0.45],
    [0, 1.2, 0.35],
    [-0.18, 1.2, -0.15],
    [0.2, 1.2, -0.52],
  ].forEach(([sx, sy, sz]) => {
    const spot = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.18), jagSpotMat);
    spot.position.set(sx, sy, sz);
    jagGroup.add(spot);
  });

  const jagHead = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.54, 0.64), jagFurMat);
  jagHead.position.set(0, 1.12, 0.98);
  jagHead.castShadow = true;
  jagGroup.add(jagHead);

  const jagSnout = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.3), jagBellyMat);
  jagSnout.position.set(0, 0.98, 1.34);
  jagGroup.add(jagSnout);

  const jagNose = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.08), jagSpotMat);
  jagNose.position.set(0, 1.06, 1.49);
  jagGroup.add(jagNose);

  [-0.22, 0.22].forEach((ex) => {
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.1), jagFurMat);
    ear.position.set(ex, 1.44, 0.9);
    jagGroup.add(ear);
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, 0.06), jagEyeMat);
    eye.position.set(ex * 0.75, 1.18, 1.31);
    jagGroup.add(eye);
  });

  const jagLegs = [];
  [
    [-0.26, 0.68, 0.56],
    [0.26, 0.68, 0.56],
    [-0.26, 0.68, -0.56],
    [0.26, 0.68, -0.56],
  ].forEach(([lx, ly, lz]) => {
    const lg = new THREE.Group();
    lg.position.set(lx, ly, lz);
    lg.userData.isJagLeg = true;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.68, 0.22), jagFurMat);
    leg.position.y = -0.34;
    leg.castShadow = true;
    lg.add(leg);
    jagGroup.add(lg);
    jagLegs.push(lg);
  });

  const jagTail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 1.05), jagFurMat);
  jagTail.position.set(0, 0.96, -1.25);
  jagTail.rotation.x = 0.25;
  jagTail.userData.isJagTail = true;
  jagGroup.add(jagTail);

  jagGroup.visible = false;
  exteriorGroup.add(jagGroup);
  jaguarEntity = {
    mesh: jagGroup,
    legs: jagLegs,
    tail: jagTail,
    bodyMat: jagFurMat,
    tagMesh: null,
  };

  // Onça Domada do Alyffer (com coleira verde/dourada — defende a fazenda e os animais!)
  const tamedJag = jagGroup.clone();
  const tamedJagLegs = [];
  let tamedJagTail = null;
  tamedJag.children.forEach((ch) => {
    if (ch.userData && ch.userData.isJagLeg) tamedJagLegs.push(ch);
    if (ch.userData && ch.userData.isJagTail) tamedJagTail = ch;
  });
  const collar = new THREE.Mesh(
    new THREE.TorusGeometry(0.32, 0.06, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 0.4 })
  );
  collar.position.set(0, 1.05, 0.72);
  tamedJag.add(collar);

  // Sela de couro, cinta, estribos e rédeas na Onça Domada para o Alyffer sentar firme!
  const saddleLeatherMat = new THREE.MeshStandardMaterial({ color: 0x5c3416, roughness: 0.78 });
  const saddleTrimMat = new THREE.MeshStandardMaterial({ color: 0x3b1f0b, roughness: 0.82 });
  const stirrupMetalMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.75, roughness: 0.25 });

  const saddleGroup = new THREE.Group();
  const saddlePad = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.09, 0.68), saddleLeatherMat);
  saddlePad.position.set(0, 1.21, -0.12);
  const saddlePommel = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.11, 0.12), saddleTrimMat);
  saddlePommel.position.set(0, 1.27, 0.18);
  const saddleCantle = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.13, 0.12), saddleTrimMat);
  saddleCantle.position.set(0, 1.28, -0.42);
  const cinchStrap = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.68, 0.13), saddleTrimMat);
  cinchStrap.position.set(0, 0.86, -0.12);
  saddleGroup.add(saddlePad, saddlePommel, saddleCantle, cinchStrap);

  [-0.41, 0.41].forEach((sx) => {
    const sideFlap = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.44), saddleLeatherMat);
    sideFlap.position.set(sx, 1.04, -0.1);
    const stirrupStrap = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.34, 0.06), saddleTrimMat);
    stirrupStrap.position.set(sx * 1.04, 0.76, -0.02);
    const stirrupBar = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.14), stirrupMetalMat);
    stirrupBar.position.set(sx * 1.06, 0.58, -0.02);
    saddleGroup.add(sideFlap, stirrupStrap, stirrupBar);

    const rein = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.035, 0.58), saddleTrimMat);
    rein.position.set(sx * 0.72, 1.26, 0.45);
    rein.rotation.x = -0.26;
    saddleGroup.add(rein);
  });
  tamedJag.add(saddleGroup);
  tamedJag.position.set(9.5, 0, -12.0);
  tamedJag.visible = false;
  exteriorGroup.add(tamedJag);
  tamedJaguarEntity = {
    mesh: tamedJag,
    legs: tamedJagLegs,
    tail: tamedJagTail,
    tagMesh: null,
    home: new THREE.Vector3(9.5, 0, -12.0),
    target: new THREE.Vector3(9.5, 0, -12.0),
    wait: 1.5,
    attackCd: 0,
  };

  // Professor Marcelo (professor normal de meia idade — camisa cinza e calça jeans, vende vaselina e luta contra onças!)
  const marceloYard = new THREE.Group();
  const mSkinY = new THREE.MeshStandardMaterial({ color: 0xdca580, roughness: 0.58 });
  const mShirtY = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.72 });
  const mShirtAccentY = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.78 });
  const mPantsY = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.82 });
  const mBootY = new THREE.MeshStandardMaterial({ color: 0x3b2618, roughness: 0.55 });
  const mHairY = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.85 });
  const mTorsoY = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.06, 0.48), mShirtY);
  mTorsoY.position.y = 1.42;
  mTorsoY.castShadow = true;
  const mPocketY = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.03), mShirtAccentY);
  mPocketY.position.set(0.22, 1.56, 0.255);
  const mBeltY = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.09, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.65 })
  );
  mBeltY.position.y = 0.89;
  marceloYard.add(mTorsoY, mPocketY, mBeltY);
  const mHeadY = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.66, 0.64), mSkinY);
  mHeadY.position.y = 2.36;
  mHeadY.castShadow = true;
  marceloYard.add(mHeadY);
  // Cabelo grisalho lateral/traseiro + topo calvo de professor de meia idade
  const mSideLY = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.42), mHairY);
  mSideLY.position.set(-0.33, 2.48, -0.08);
  const mSideRY = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.42), mHairY);
  mSideRY.position.set(0.33, 2.48, -0.08);
  const mBackHairY = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.24, 0.1), mHairY);
  mBackHairY.position.set(0, 2.46, -0.29);
  const mShineY = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 })
  );
  mShineY.scale.set(1.15, 0.24, 1.15);
  mShineY.position.set(0.1, 2.7, 0.08);
  marceloYard.add(mSideLY, mSideRY, mBackHairY, mShineY);
  // Óculos quadrados do Marcelo!
  const mFrameMatY = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.45, roughness: 0.35 });
  const mLensMatY = new THREE.MeshStandardMaterial({
    color: 0xcbd5e1,
    transparent: true,
    opacity: 0.45,
    metalness: 0.3,
    roughness: 0.15,
  });
  [-0.16, 0.16].forEach((gx) => {
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.05), mFrameMatY);
    topBar.position.set(gx, 2.47, 0.36);
    const botBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.05), mFrameMatY);
    botBar.position.set(gx, 2.27, 0.36);
    const leftBar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.22, 0.05), mFrameMatY);
    leftBar.position.set(gx - 0.105, 2.37, 0.36);
    const rightBar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.22, 0.05), mFrameMatY);
    rightBar.position.set(gx + 0.105, 2.37, 0.36);
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.17, 0.02), mLensMatY);
    lens.position.set(gx, 2.37, 0.355);
    marceloYard.add(topBar, botBar, leftBar, rightBar, lens);
  });
  const mBridgeY = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.035, 0.05), mFrameMatY);
  mBridgeY.position.set(0, 2.4, 0.36);
  const mTempleLY = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.035, 0.36), mFrameMatY);
  mTempleLY.position.set(-0.34, 2.4, 0.18);
  const mTempleRY = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.035, 0.36), mFrameMatY);
  mTempleRY.position.set(0.34, 2.4, 0.18);
  marceloYard.add(mBridgeY, mTempleLY, mTempleRY);
  const mLArmY = new THREE.Group();
  mLArmY.position.set(-0.58, 1.84, 0);
  const mLSleeveY = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.34, 0.25), mShirtY);
  mLSleeveY.position.y = -0.17;
  const mLArmMeshY = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.46, 0.22), mSkinY);
  mLArmMeshY.position.y = -0.55;
  mLArmMeshY.castShadow = true;
  mLArmY.add(mLSleeveY, mLArmMeshY);
  const mRArmY = new THREE.Group();
  mRArmY.position.set(0.58, 1.84, 0);
  const mRSleeveY = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.34, 0.25), mShirtY);
  mRSleeveY.position.y = -0.17;
  const mRArmMeshY = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.46, 0.22), mSkinY);
  mRArmMeshY.position.y = -0.55;
  mRArmMeshY.castShadow = true;
  mRArmY.add(mRSleeveY, mRArmMeshY);
  // Enxada / Bastão caça-onça do Marcelo
  const mClub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 1.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x7c4a21 })
  );
  mClub.rotation.x = Math.PI / 2;
  mClub.position.set(0, -0.68, 0.55);
  const mClubHead = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.36, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.3 })
  );
  mClubHead.position.set(0, -0.82, 1.25);
  mRArmY.add(mClub, mClubHead);
  marceloYard.add(mLArmY, mRArmY);
  const makeMarceloLeg = (sx) => {
    const lg = new THREE.Group();
    lg.position.set(sx * 0.22, 0.84, 0);
    const pant = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.68, 0.32), mPantsY);
    pant.position.y = -0.34;
    pant.castShadow = true;
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.2, 0.44), mBootY);
    boot.position.set(0, -0.74, 0.05);
    lg.add(pant, boot);
    return lg;
  };
  const mLLegY = makeMarceloLeg(-1);
  const mRLegY = makeMarceloLeg(1);
  marceloYard.add(mLLegY, mRLegY);
  marceloYard.position.set(-10.5, 0, -14.5);
  marceloYard.visible = false;
  exteriorGroup.add(marceloYard);
  marceloYardEntity = {
    mesh: marceloYard,
    lArm: mLArmY,
    rArm: mRArmY,
    lLeg: mLLegY,
    rLeg: mRLegY,
    home: new THREE.Vector3(-10.5, 0, -14.5),
    target: new THREE.Vector3(-10.5, 0, -14.5),
    wait: 1.2,
    attackCd: 0,
    swingTimer: 0,
  };

  // Trees around the yard & distant countryside — Reformuladas (raízes, galhos, copa cheia em 2 tons & pétalas no chão!)
  const sharedBarkMat = new THREE.MeshStandardMaterial({
    map: createWoodPlankTexture("#6b4226", "#3d2312", 1, 2),
    roughness: 0.92,
  });
  const sharedLeafDark = new THREE.MeshStandardMaterial({ color: 0x1e5e26, roughness: 0.88 });
  const sharedLeafBright = new THREE.MeshStandardMaterial({ color: 0x3b8c3e, roughness: 0.84 });
  const sharedIpeDeep = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.84 });
  const sharedIpeBright = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.8 });

  function addTree(x, z, scale = 1, type = "round") {
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.46, 2.9, 9), sharedBarkMat);
    trunk.position.y = 1.45;
    trunk.castShadow = true;
    tree.add(trunk);

    // Raízes na base + 2 galhos bifurcados
    for (let r = 0; r < 3; r++) {
      const ang = (r / 3) * Math.PI * 2 + x * 0.1;
      const root = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.34, 0.62), sharedBarkMat);
      root.position.set(Math.cos(ang) * 0.34, 0.14, Math.sin(ang) * 0.34);
      root.rotation.y = -ang;
      root.rotation.x = 0.45;
      tree.add(root);
    }
    const br1 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 1.35, 6), sharedBarkMat);
    br1.position.set(0.45, 2.75, 0.25);
    br1.rotation.z = -0.58;
    const br2 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.17, 1.25, 6), sharedBarkMat);
    br2.position.set(-0.42, 2.65, -0.2);
    br2.rotation.z = 0.55;
    tree.add(br1, br2);

    const isIpe = type === "ipe";
    const matA = isIpe ? sharedIpeDeep : sharedLeafDark;
    const matB = isIpe ? sharedIpeBright : sharedLeafBright;

    const cMain = new THREE.Mesh(new THREE.DodecahedronGeometry(1.82, 1), matA);
    cMain.position.set(0, 3.7, 0);
    cMain.scale.set(1.12, 0.92, 1.08);
    cMain.castShadow = true;

    const cSide1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.28, 1), matB);
    cSide1.position.set(0.95, 4.15, 0.48);
    cSide1.castShadow = true;

    const cSide2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.18, 1), matA);
    cSide2.position.set(-0.92, 3.85, -0.45);
    cSide2.castShadow = true;

    const cTop = new THREE.Mesh(new THREE.DodecahedronGeometry(1.05, 1), matB);
    cTop.position.set(-0.15, 4.82, 0.15);
    cTop.castShadow = true;

    tree.add(cMain, cSide1, cSide2, cTop);

    // Pétalas amarelas caídas sob os Ipês!
    if (isIpe) {
      const petalRing = new THREE.Mesh(
        new THREE.CircleGeometry(1.85, 14),
        new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.34 })
      );
      petalRing.rotation.x = -Math.PI / 2;
      petalRing.position.y = 0.028;
      tree.add(petalRing);
    }

    exteriorGroup.add(tree);
    const trunkHit = Math.max(0.85, 0.82 * scale);
    addObstacleBox(x, z, trunkHit, trunkHit);
  }

  [
    [-12, -26, 1.15, "round"],
    [29, -24, 1.3, "ipe"],
    [27, 23, 1.15, "ipe"],
    [-36, -36, 1.45, "round"],
    [-58, 6, 1.5, "ipe"],
    [40, -35, 1.35, "round"],
    [72, 8, 1.35, "round"],
    [-26, 38, 1.3, "round"],
    [38, 39, 1.3, "ipe"],
    [-60, -16, 1.6, "round"],
    [62, -25, 1.45, "round"],
    [-46, 39, 1.35, "round"],
    [48, -24, 1.25, "ipe"],
    [-10, 38, 1.2, "round"],
    [73, -18, 1.4, "ipe"],
  ].forEach(([x, z, s, t]) => addTree(x, z, s, t));

  // ===================== VEGETAÇÃO, MATOS, FLORES & PEDRAS (INSTANCEDMESH — ALTO FPS!) =====================
  {
    let seed = 20261126;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const isClearForProp = (x, z, pad = 1.6) => {
      // Horta principal + hortas das expansões
      if (x > -11.5 - pad && x < 10.5 + pad && z > -9.5 - pad && z < 9.5 + pad) return false;
      if (x > -51.5 - pad && x < -35.5 + pad && z > -8.5 - pad && z < 8.5 + pad) return false;
      if (x > 35.5 - pad && x < 51.5 + pad && z > -8.5 - pad && z < 8.5 + pad) return false;
      // Casa e varanda
      if (x > -9.5 - pad && x < 9.5 + pad && z > -26.5 - pad && z < -10.0 + pad) return false;
      // Estrada do Garcia, recuo do ponto 402 e trilha do lago
      if (z > 42.5 - pad && z < 51.0 + pad) return false;
      if (x > 13.5 - pad && x < 33.5 + pad && z > 37.0 - pad && z < 45.0 + pad) return false;
      if (x > 52.8 - pad && x < 58.6 + pad && z > -14.0 && z < 47.0) return false;
      // Caminhos internos da fazenda
      if (x > 9.4 - pad && x < 15.6 + pad && z > -12.5 && z < 47.0) return false;
      if (x > -18.5 && x < 22.5 && z > -13.4 - pad && z < -9.6 + pad) return false;
      if (x > -15.0 - pad && x < -11.4 + pad && z > -12.0 && z < 14.0) return false;
      if (x > -18.0 && x < 13.5 && z > 11.4 - pad && z < 14.6 + pad) return false;
      // Estações e construções (Poço, Galinheiro, Composteira, Cooperativa, Celeiro)
      if (Math.hypot(x - -18.0, z - -2.5) < 3.6 + pad) return false;
      if (Math.hypot(x - -24.0, z - -21.0) < 4.2 + pad) return false;
      if (Math.hypot(x - -18.0, z - 6.5) < 3.2 + pad) return false;
      if (Math.hypot(x - 21.5, z - -16.5) < 4.5 + pad) return false;
      if (Math.hypot(x - -47.0, z - -22.0) < 5.5 + pad) return false;
      // Lago e margem seca do lanche do Jessy
      if (Math.hypot(x - 62.0, z - -10.0) < 9.8 + pad) return false;
      // Evita interior central dos currais (mantém animais livres)
      if (x > 18.0 && x < 31.0 && z > -3.5 && z < 11.0) return false;
      if (x > -31.0 && x < -18.0 && z > 14.5 && z < 27.0) return false;
      if (x > -12.5 && x < 6.0 && z > 16.0 && z < 27.0) return false;
      // Evita sobrepor cercas principais
      if (Math.abs(z - 30) < 1.2 || Math.abs(z + 30) < 1.2) return false;
      if (Math.abs(x - 34) < 1.2 || Math.abs(x + 34) < 1.2) return false;
      if (Math.abs(x - 54) < 1.2 || Math.abs(x + 54) < 1.2) return false;
      return true;
    };

    const dummy = new THREE.Object3D();

    // 1) Tufos de Mato / Capim (280 tufos espalhados na fazenda e fora dela — 2 lâminas cruzadas)
    const grassSpots = [];
    for (let tries = 0; tries < 950 && grassSpots.length < 280; tries++) {
      const gx = -64 + rand() * 140;
      const gz = -35 + rand() * 82;
      if (!isClearForProp(gx, gz, 0.7)) continue;
      grassSpots.push({ x: gx, z: gz, s: 0.7 + rand() * 0.85, r: rand() * Math.PI });
    }
    const grassGeo = new THREE.ConeGeometry(0.18, 0.52, 4);
    const grassMat1 = new THREE.MeshStandardMaterial({ color: 0x3f8f34, roughness: 0.92 });
    const grassMat2 = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.9 });
    const grassInst1 = new THREE.InstancedMesh(grassGeo, grassMat1, grassSpots.length * 2);
    const grassInst2 = new THREE.InstancedMesh(grassGeo, grassMat2, grassSpots.length);
    grassInst1.receiveShadow = true;
    grassInst2.receiveShadow = true;
    let gi1 = 0;
    for (let i = 0; i < grassSpots.length; i++) {
      const g = grassSpots[i];
      dummy.position.set(g.x, 0.22 * g.s, g.z);
      dummy.rotation.set(0.18, g.r, 0.14);
      dummy.scale.set(g.s, g.s, g.s);
      dummy.updateMatrix();
      grassInst1.setMatrixAt(gi1++, dummy.matrix);

      dummy.position.set(g.x + 0.14 * g.s, 0.19 * g.s, g.z - 0.1 * g.s);
      dummy.rotation.set(-0.2, g.r + 1.8, -0.15);
      dummy.scale.set(g.s * 0.85, g.s * 0.88, g.s * 0.85);
      dummy.updateMatrix();
      grassInst1.setMatrixAt(gi1++, dummy.matrix);

      dummy.position.set(g.x - 0.12 * g.s, 0.18 * g.s, g.z + 0.12 * g.s);
      dummy.rotation.set(0.15, g.r + 3.4, -0.22);
      dummy.scale.set(g.s * 0.82, g.s * 0.78, g.s * 0.82);
      dummy.updateMatrix();
      grassInst2.setMatrixAt(i, dummy.matrix);
    }
    grassInst1.instanceMatrix.needsUpdate = true;
    grassInst2.instanceMatrix.needsUpdate = true;
    exteriorGroup.add(grassInst1, grassInst2);

    // 2) Arbustos / Moitas rurais (~10% menos arbustos: 55 no total)
    const bushSpots = [];
    [
      [-32.0, -28.0, 1.15], [-32.2, -10.0, 1.0], [-20.0, -28.2, 1.1], [18.0, -28.0, 1.2],
      [32.0, -27.5, 1.15], [32.0, 27.0, 1.1], [-32.0, 28.0, 1.05],
      [36.5, 33.5, 1.25], [-16.0, 34.5, 1.3], [49.0, 35.0, 1.3],
      [51.5, -26.0, 1.25], [69.0, -21.0, 1.35], [72.5, -4.0, 1.3], [67.0, 2.0, 1.25],
      [-57.0, -26.0, 1.35], [-58.5, 22.0, 1.3],
    ].forEach(([bx, bz, bs]) => bushSpots.push({ x: bx, z: bz, s: bs, r: rand() * Math.PI * 2 }));
    for (let tries = 0; tries < 500 && bushSpots.length < 55; tries++) {
      const bx = -64 + rand() * 138;
      const bz = -34 + rand() * 80;
      if (!isClearForProp(bx, bz, 1.6)) continue;
      bushSpots.push({ x: bx, z: bz, s: 0.85 + rand() * 0.65, r: rand() * Math.PI * 2 });
    }
    const bushGeo = new THREE.DodecahedronGeometry(0.68, 1);
    const bushMatDark = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.88 });
    const bushMatLight = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.85 });
    const bushInst1 = new THREE.InstancedMesh(bushGeo, bushMatDark, bushSpots.length);
    const bushInst2 = new THREE.InstancedMesh(bushGeo, bushMatLight, bushSpots.length);
    bushInst1.castShadow = true;
    bushInst1.receiveShadow = true;
    bushInst2.castShadow = true;
    for (let i = 0; i < bushSpots.length; i++) {
      const b = bushSpots[i];
      dummy.position.set(b.x, 0.42 * b.s, b.z);
      dummy.rotation.set(0, b.r, 0);
      dummy.scale.set(1.25 * b.s, 0.78 * b.s, 1.15 * b.s);
      dummy.updateMatrix();
      bushInst1.setMatrixAt(i, dummy.matrix);

      dummy.position.set(b.x + Math.cos(b.r) * 0.34 * b.s, 0.52 * b.s, b.z + Math.sin(b.r) * 0.34 * b.s);
      dummy.rotation.set(0.2, b.r + 1.1, 0);
      dummy.scale.set(0.85 * b.s, 0.68 * b.s, 0.85 * b.s);
      dummy.updateMatrix();
      bushInst2.setMatrixAt(i, dummy.matrix);
    }
    bushInst1.instanceMatrix.needsUpdate = true;
    bushInst2.instanceMatrix.needsUpdate = true;
    exteriorGroup.add(bushInst1, bushInst2);

    // 3) Flores silvestres coloridas no gramado (amarelas, brancas e lilás — 96 flores em 3 InstancedMeshes!)
    const flowerGeo = new THREE.DodecahedronGeometry(0.11, 0);
    const flowerColors = [0xfef08a, 0xf8fafc, 0xd8b4fe];
    flowerColors.forEach((hex) => {
      const fSpots = [];
      for (let tries = 0; tries < 260 && fSpots.length < 32; tries++) {
        const fx = -60 + rand() * 132;
        const fz = -32 + rand() * 76;
        if (!isClearForProp(fx, fz, 0.8)) continue;
        fSpots.push({ x: fx, z: fz, s: 0.75 + rand() * 0.65 });
      }
      const fInst = new THREE.InstancedMesh(flowerGeo, new THREE.MeshStandardMaterial({ color: hex, roughness: 0.7 }), fSpots.length);
      for (let i = 0; i < fSpots.length; i++) {
        const f = fSpots[i];
        dummy.position.set(f.x, 0.14 * f.s, f.z);
        dummy.rotation.set(0, rand() * Math.PI, 0);
        dummy.scale.set(f.s, f.s * 0.75, f.s);
        dummy.updateMatrix();
        fInst.setMatrixAt(i, dummy.matrix);
      }
      fInst.instanceMatrix.needsUpdate = true;
      exteriorGroup.add(fInst);
    });

    // 4) Pedras espalhadas (~10% menos pedras: 48 pequenas/médias + 7 rochas grandes)
    const rockGeo = new THREE.DodecahedronGeometry(0.45, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.92 });
    const rockSpots = [];
    for (let tries = 0; tries < 400 && rockSpots.length < 48; tries++) {
      const rx = -64 + rand() * 138;
      const rz = -35 + rand() * 82;
      if (!isClearForProp(rx, rz, 1.2)) continue;
      rockSpots.push({ x: rx, z: rz, s: 0.45 + rand() * 0.85, r: rand() * Math.PI * 2 });
    }
    const rockInst = new THREE.InstancedMesh(rockGeo, rockMat, rockSpots.length);
    rockInst.castShadow = true;
    rockInst.receiveShadow = true;
    for (let i = 0; i < rockSpots.length; i++) {
      const rk = rockSpots[i];
      dummy.position.set(rk.x, 0.16 * rk.s, rk.z);
      dummy.rotation.set(rand() * 0.5, rk.r, rand() * 0.5);
      dummy.scale.set(1.25 * rk.s, 0.62 * rk.s, 1.0 * rk.s);
      dummy.updateMatrix();
      rockInst.setMatrixAt(i, dummy.matrix);
    }
    rockInst.instanceMatrix.needsUpdate = true;
    exteriorGroup.add(rockInst);

    // Rochas grandes com colisor nos campos externos e arredores do lago
    const boulderMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.95 });
    [
      [-42.0, 35.5, 1.55],
      [-58.0, -3.5, 1.75],
      [44.5, 36.5, 1.5],
      [71.5, -2.0, 1.65],
      [68.5, -22.5, 1.7],
      [-24.0, -34.0, 1.6],
      [46.0, -33.5, 1.65],
    ].forEach(([bx, bz, bs]) => {
      const boulder = new THREE.Mesh(rockGeo, boulderMat);
      boulder.position.set(bx, 0.36 * bs, bz);
      boulder.scale.set(1.35 * bs, 0.82 * bs, 1.15 * bs);
      boulder.rotation.y = (bx + bz) * 0.3;
      boulder.castShadow = true;
      boulder.receiveShadow = true;
      exteriorGroup.add(boulder);
      addObstacleBox(bx, bz, 0.95 * bs, 0.85 * bs);
    });
  }

  // Fluffy drifting clouds
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.88 });
  for (let i = 0; i < 10; i++) {
    const cGroup = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(2.6 + (j % 2), 1), cloudMat);
      puff.position.set((j - 1) * 2.5, (j % 2) * 0.7, 0);
      puff.scale.set(1.3, 0.65, 1.0);
      cGroup.add(puff);
    }
    cGroup.position.set((Math.random() - 0.5) * 140, 28 + Math.random() * 12, (Math.random() - 0.5) * 120);
    exteriorGroup.add(cGroup);
    clouds.push({ mesh: cGroup, speed: 0.8 + Math.random() * 0.7 });
  }

  // Backyard Chickens são inicializadas após farm.js carregar (em loop.js / loadSavedGame / resetToNewFarm)

  // Sistema de Irrigação Automática 3D (Aspersores nos cruzamentos da horta — visível após compra na Loja!)
  sprinklerGroup = new THREE.Group();
  sprinklerGroup.visible = false;
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.35 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.65, roughness: 0.3 });
  const spBaseGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.14, 10);
  const spRiserGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.56, 8);
  const spCapGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 10);
  const spBar1Geo = new THREE.BoxGeometry(0.54, 0.045, 0.05);
  const spBar2Geo = new THREE.BoxGeometry(0.05, 0.045, 0.54);
  [
    [-6.7, -4.95, 0], [-0.5, -4.95, 0], [5.7, -4.95, 0],
    [-6.7, 4.35, 0], [-0.5, 4.35, 0], [5.7, 4.35, 0],
    [-47.35, -3.85, 1], [-44.05, -3.85, 1], [-47.35, 2.75, 1], [-44.05, 2.75, 1],
    [41.15, -3.85, 2], [44.45, -3.85, 2], [41.15, 2.75, 2], [44.45, 2.75, 2],
  ].forEach(([sx, sz, landReq]) => {
    const sp = new THREE.Group();
    sp.position.set(sx, 0, sz);
    sp.visible = landReq === 0;
    const base = new THREE.Mesh(spBaseGeo, pipeMat);
    base.position.y = 0.07;
    const riser = new THREE.Mesh(spRiserGeo, pipeMat);
    riser.position.y = 0.36;
    const head = new THREE.Group();
    head.position.y = 0.66;
    head.add(new THREE.Mesh(spCapGeo, brassMat), new THREE.Mesh(spBar1Geo, brassMat), new THREE.Mesh(spBar2Geo, brassMat));
    sp.add(base, riser, head);
    sprinklerGroup.add(sp);
    sprinklerHeads.push({ mesh: sp, head, x: sx, z: sz, landReq });
  });
  exteriorGroup.add(sprinklerGroup);

  // Fireflies for dusk/night atmosphere
  for (let i = 0; i < 24; i++) {
    const ff = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0 })
    );
    ff.position.set((Math.random() - 0.5) * 38, 0.8 + Math.random() * 2.5, (Math.random() - 0.5) * 34);
    exteriorGroup.add(ff);
    fireflies.push({
      mesh: ff,
      base: ff.position.clone(),
      phase: Math.random() * Math.PI * 2,
    });
  }
}
buildCountrysideEnvironment();

