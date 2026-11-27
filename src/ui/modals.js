// Sell Modal Logic (Selling is only enabled at Terminal de Campo Limpo Paulista!)
function openSellModal() {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderSellModal();
  sellModal.classList.remove("hidden");
}

function closeSellModal() {
  sellModal.classList.add("hidden");
  state.mode = "playing";
}

function renderSellModal() {
  const atTerminal = state.location === "terminal";
  const canSellNow = atTerminal && !isAfterWorkHours();
  sellModeNotice.textContent = !atTerminal
    ? "Para vender seus produtos, pegue o Ônibus 402 (nos horários da JundMob) até o Terminal de Campo Limpo Paulista!"
    : isAfterWorkHours()
      ? "🌙 Já passou das 19:00! O expediente terminou e as bancas de venda fecharam. Pegue o 402 de volta e vá dormir!"
      : "Você está nas Bancas do Terminal de Campo Limpo Paulista! Venda sua colheita ou entregue encomendas.";
  sellActionArea.classList.toggle("hidden", !atTerminal);

  sellInventoryList.innerHTML = "";
  let totalPotential = 0;

  CROP_KEYS.forEach((id) => {
    const crop = CROPS[id];
    const qty = state.inventory[id] || 0;
    const price = getCropSellPrice(id);
    const subtotal = qty * price;
    totalPotential += subtotal;

    const isHot = state.hotCropId === id;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${crop.emoji}</span>
        <div>
          <div class="row-title">${crop.name} ${isHot ? "🔥 Em Alta!" : ""}</div>
          <div class="row-sub">Na cesta: <strong>${qty}</strong> • Preço hoje: <strong>${formatBRL(price)}</strong>/un</div>
        </div>
      </div>
      <button class="mini-btn" ${qty <= 0 || !canSellNow ? "disabled" : ""}>${isAfterWorkHours() ? "Fechado (19h+)" : `Vender (${formatBRL(subtotal)})`}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canSellNow || state.inventory[id] <= 0) return;
      state.money += subtotal;
      removeItemFromInventory(id, qty, false);
      if (typeof trackGoalProgress === "function") trackGoalProgress("sell", Math.round(subtotal));
      sfx.play("sell");
      showToast("💰", "VENDA NO TERMINAL", `+${formatBRL(subtotal)} vendendo ${crop.name}!`);
      updateHUD();
      renderSellModal();
      saveGame();
    });
    sellInventoryList.appendChild(row);
  });

  if (atTerminal && getItemCount("celular") <= 0) {
    const phoneCard = document.createElement("div");
    phoneCard.className = "row-card";
    const phonePrice = 180;
    phoneCard.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">📱</span>
        <div>
          <div class="row-title">Celular do Macho (Banca de Eletrônicos do Terminal)</div>
          <div class="row-sub">Item para o inventário! Segure na mão e aperte E para acessar Only-Resenha, Zap e Pega-Alface!</div>
        </div>
      </div>
      <button class="mini-btn green" type="button" ${state.money < phonePrice ? "disabled" : ""}>Comprar ${formatBRL(phonePrice)}</button>
    `;
    phoneCard.querySelector("button").addEventListener("click", () => {
      if (state.money < phonePrice) return;
      if (!canAddItemToInventory("celular", 1)) {
        sfx.play("error");
        showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar o Celular!");
        return;
      }
      state.money -= phonePrice;
      addItemToInventory("celular", 1);
      equipItemToHotbar("celular");
      sfx.play("phone_notif");
      showDayBanner("📱 CELULAR DO MACHO COMPRADO NO TERMINAL!");
      showToast("📱", "CELULAR NA MÃO!", "Segure na Hotbar e aperte E para abrir!");
      updateHUD();
      renderSellModal();
      saveGame();
    });
    sellInventoryList.appendChild(phoneCard);
  }

  sellAllBtn.disabled = !canSellNow || totalPotential <= 0;
  sellAllBtn.textContent = isAfterWorkHours()
    ? "🌙 Bancas Fechadas após 19:00"
    : totalPotential > 0
      ? `Vender Tudo da Cesta (+${formatBRL(totalPotential)})`
      : "Cesta Vazia — Colha no Quintal!";

  ordersList.innerHTML = "";
  state.orders.forEach((order) => {
    const crop = CROPS[order.cropId];
    const have = state.inventory[order.cropId] || 0;
    const canDeliver = canSellNow && !order.completed && have >= order.qty;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${crop.emoji}</span>
        <div>
          <div class="row-title">${order.buyer}</div>
          <div class="row-sub">Quer <strong>${order.qty}x ${crop.name}</strong> (Você tem ${have}) • Paga <strong>${formatBRL(order.reward)}</strong> + ⭐1</div>
        </div>
      </div>
      <button class="mini-btn green" ${canDeliver ? "" : "disabled"}>
        ${order.completed ? "Entregue ✓" : isAfterWorkHours() ? "Fechado 19h+" : atTerminal ? "Entregar" : "Vá ao Terminal"}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canSellNow || order.completed || (state.inventory[order.cropId] || 0) < order.qty) return;
      removeItemFromInventory(order.cropId, order.qty, false);
      state.money += order.reward;
      state.reputation += 1;
      order.completed = true;
      sfx.play("upgrade");
      showToast("📦", "ENCOMENDA ENTREGUE!", `${order.buyer} pagou ${formatBRL(order.reward)}!`);
      updateHUD();
      renderSellModal();
      saveGame();
    });
    ordersList.appendChild(row);
  });
}

sellAllBtn.addEventListener("click", () => {
  if (state.location !== "terminal" || isAfterWorkHours()) return;
  let earned = 0;
  CROP_KEYS.forEach((id) => {
    const qty = state.inventory[id] || 0;
    if (qty > 0) {
      earned += qty * getCropSellPrice(id);
      removeItemFromInventory(id, qty, false);
    }
  });
  if (earned <= 0) return;
  state.money += earned;
  if (typeof trackGoalProgress === "function") trackGoalProgress("sell", Math.round(earned));
  sfx.play("sell");
  showToast("💰", "TUDO VENDIDO!", `Macho faturou ${formatBRL(earned)} no Terminal CLP!`);
  updateHUD();
  renderSellModal();
  saveGame();
});

// NPC Modal & Title Quests (Muzzonline, Kaio Wendell, Félix, Pão)
const FELIX_QUESTS = [
  {
    title: "Missão 1 do Félix: Lanche na ETEC",
    req: { alface_crespa: 3 },
    reqLabel: "3x Alface Crespa 🥬",
    rewardMoney: 160,
    rewardTitle: "PAC",
    quote: "E aí Macho! Tô varado de fome aqui no refeitório da ETEC, traz 3 Alfaces Crespas pra eu virar fã número 1!",
  },
  {
    title: "Missão 2 do Félix: Banquete do Félix",
    req: { alface_roxa: 3, tomate: 2 },
    reqLabel: "3x Alface Roxa 🟣 + 2x Tomate Cereja 🍅",
    rewardMoney: 420,
    rewardTitle: "Homem Guloso",
    quote: "Agora quero o combo gourmet de Pau Arcado! Traz 3 Alfaces Roxas e 2 Tomates Cereja!",
  },
];

const PAO_QUESTS = [
  {
    title: "Missão 1 do Pão: Salada Crocante",
    req: { alface_americana: 3 },
    reqLabel: "3x Alface Americana 🥗",
    rewardMoney: 190,
    rewardTitle: "Airfryer",
    quote: "Fala Alyffer! Traz 3 Alfaces Americanas crocantes aqui pra galera da ETEC!",
  },
  {
    title: "Missão 2 do Pão: Desafio Raiz do Quintal",
    req: { alface_crespa: 4, cenoura: 3 },
    reqLabel: "4x Alface Crespa 🥬 + 3x Cenoura 🥕",
    rewardMoney: 520,
    rewardTitle: "Macho",
    quote: "Último desafio pra provar que você domina a roça de Pau Arcado: 4 Alfaces Crespas e 3 Cenouras!",
  },
];

const MUZZ_LINES = [
  "Muzzonline: 'Mano, se você fritar uma batata no sol de Pau Arcado ela vira um pendrive de 64GB, confia!'",
  "Muzzonline: 'Ontem um pombo me olhou torto na estação Botujuru e eu devolvi uma piscadela em código Morse!'",
  "Muzzonline: 'Meu tênis vermelho roda a 144 FPS no corredor da ETEC se eu tomar Toddynho vencido!'",
  "Muzzonline: 'Sabia que se você colocar gelo no microondas e cantar parabéns, ele vira água gelada quente?!'",
  "Muzzonline: 'Tô tentando ensinar meu cachorro a calcular regra de três pra ele passar em matemática por mim!'",
  "Muzzonline: 'Se o ônibus 402 tivesse asas, o motorista ia cobrar passagem de helicóptero ou de alface?'",
  "Muzzonline: 'Acabei de instalar o Windows 95 na calculadora científica e agora ela tá pedindo alface!'",
];

const KAIO_LINES = [
  "Kaio Wendell: 'Pela estequiometria da reação, se o pH do seu solo ficar abaixo de 6,0 a alface não absorve o Nitrato (NO₃⁻)!'",
  "Kaio Wendell: 'Acabei de fazer uma titulação ácido-base no lab da ETEC! Com fenolftaleína a solução ficou rosa choque!'",
  "Kaio Wendell: 'A fotossíntese é pura Química: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂! Sua alface é uma fábrica de glicose!'",
  "Kaio Wendell: 'Cuidado com as ligações covalentes do adubo NPK: Nitrogênio faz as folhas verdes, Fósforo dá raiz forte!'",
  "Kaio Wendell: 'Misturei sulfato de cobre (CuSO₄) com hidróxido de sódio no béquer e precipitou um azul absurdo!'",
  "Kaio Wendell: 'Se equilibrarmos os íons Potássio (K⁺) na solução aquosa do seu regador, a pressão osmótica da alface triplica!'",
];

const ALYFFER_CORINGA_LINES = [
  "6-7!! SEIS SETE!! 🤲🤡 OLHA O 6-7 NA HORTA DE PAU ARCADO!!",
  "HAHAHAHA! A ALFACE CRESPA ME CONTOU O SEGREDO DO ÔNIBUS 402!",
  "CORINGUEI! SE EU PLANTAR UM TÊNIS VERMELHO NASCE UM MUZZONLINE?!",
  "SEIS... SETE... 6-7!! 👅👀 MEUS OLHOS SAÍRAM PRA VER A ALFACE CRESCER!",
  "O KAIO MISTUROU H₂O COM CALDO DE CANA E AGORA TÔ VENDO EM 4D! KKKKK!",
  "POR QUE O TREM DA LINHA 7-RUBI NÃO É FEITO DE MORANGO?! HAHAHA!",
  "EU SOU O CORINGA DE PAU ARCADO! QUEM É BATMAN PERTO DO MACHO?!",
  "SE A CHUVA MOLHA A TERRA, QUEM É QUE REGOU A NUVEM?! KKKKKKK!",
  "ALÔ MOTORISTA DO 402, ACEITA 3 CENOURAS E UM OVO CAIPIRA DE PASSAGEM?!",
  "A TABELA PERIÓDICA TEM O ELEMENTO QUÍMICO DO PASTEL DE QUEIJO?! HAHAHA!",
  "MINHA ENXADA TÁ FALANDO EM CÓDIGO BINÁRIO COM AS GALINHAS DO QUINTAL!",
  "SE EU DORMIR DE PONTA-CABEÇA A ALFACE CRESCE PRO CENTRO DA TERRA!",
  "O ORELHA LATIU EM JAPONÊS E PEDIU UM DIPLOMA DA ETEC! KKKKKK!",
  "VIVEMOS NUMA SALADA GIGANTE! TUDO É ALFACE ROXA! HAHAHAHA!",
  "COLOQUEI ADUBO NPK NO MEU CAFÉ E AGORA MEU CHAPÉU FAZ FOTOSSÍNTESE!",
  "SE O PÃO LIGAR UMA AIRFRYER DENTRO DE OUTRA ABRE UM PORTAL PRA BOTUJURU!",
  "O FÉLIX COMEU ATÉ O SEMÁFORO DA AV. ALFRIED KRUPP! HAHAHAHA!",
];

const B_LAB24_LINES = [
  "B******: 'Pessoal do 3AI, parem de instalar joguinho nos PCs do Lab 24! Eu tô de olho em vocês!'",
  "B******: 'Alyffer, fecha esse @only_resenha_ aí no monitor do Lab 24 e termina o código antes do sinal!'",
  "B******: 'Quem mexeu no cabo de rede da máquina 12?! O Lab 24 é sagrado na ETECAMP!'",
  "B******: 'Não adianta esconder a tela que eu enxergo tudo daqui do Lab de Informática 24!'",
];

const T_LAB24_LINES = [
  "T*******: 'Oxe, Marcelo, cuida dos mininos direito aí no corredor, viu home!'",
  "T*******: 'Vixe Maria! Marcelo, cuida dos mininos que esse povo do 3AI tá fazendo uma zoada danada no Lab 24!'",
  "T*******: 'Ô meu fi, Alyffer, larga de leseira e vai estudar! E ô Marcelo, cuida dos mininos aí fora, visse!'",
  "T*******: 'Arre égua! Todo dia é a mesma resenha nessa ETECAMP! Marcelo, cuida dos mininos antes que eu dê um grito!'",
];

let currentNpcId = null;
const JESSY_OPENING_LINES = [
  'Jessy: "Fala, Macho! Manda qualquer conta ou equação de matemática aí que eu resolvo na hora!"',
  'Jessy: "Opa! Pode digitar sua pergunta de matemática aqui embaixo que eu calculo rapidinho."',
  'Jessy: "E aí, Alyffer! Qual conta de matemática você precisa resolver agora?"',
];

let jessyLastAnswer = "";

// Avaliador seguro de expressões matemáticas (sem eval!)
function safeEvalMathExpr(exprStr) {
  const tokens = [];
  let i = 0;
  const s = exprStr.replace(/\s+/g, "");
  while (i < s.length) {
    const ch = s[i];
    if (/[0-9.]/.test(ch)) {
      let num = "";
      while (i < s.length && /[0-9.]/.test(s[i])) num += s[i++];
      const val = Number(num);
      if (!Number.isFinite(val)) return null;
      tokens.push({ type: "num", val });
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      let id = "";
      while (i < s.length && /[a-zA-Z]/.test(s[i])) id += s[i++].toLowerCase();
      if (id === "pi") tokens.push({ type: "num", val: Math.PI });
      else if (id === "e") tokens.push({ type: "num", val: Math.E });
      else tokens.push({ type: "fn", val: id });
      continue;
    }
    if ("+-*/^()".includes(ch)) {
      tokens.push({ type: "op", val: ch });
      i++;
      continue;
    }
    return null;
  }
  if (!tokens.length) return null;

  let pos = 0;
  const peek = () => tokens[pos] || null;
  const next = () => tokens[pos++];

  function parseExpr() {
    let left = parseTerm();
    if (left === null) return null;
    while (peek() && peek().type === "op" && (peek().val === "+" || peek().val === "-")) {
      const op = next().val;
      const right = parseTerm();
      if (right === null) return null;
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseTerm() {
    let left = parsePower();
    if (left === null) return null;
    while (peek() && peek().type === "op" && (peek().val === "*" || peek().val === "/")) {
      const op = next().val;
      const right = parsePower();
      if (right === null) return null;
      if (op === "/") {
        if (Math.abs(right) < 1e-12) return "DIV_ZERO";
        left = left / right;
      } else {
        left = left * right;
      }
    }
    return left;
  }

  function parsePower() {
    let base = parseUnary();
    if (base === null || base === "DIV_ZERO") return base;
    if (peek() && peek().type === "op" && peek().val === "^") {
      next();
      const exp = parsePower();
      if (exp === null || exp === "DIV_ZERO") return exp;
      return Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary() {
    if (peek() && peek().type === "op" && (peek().val === "+" || peek().val === "-")) {
      const op = next().val;
      const val = parseUnary();
      if (val === null || val === "DIV_ZERO") return val;
      return op === "-" ? -val : val;
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const t = peek();
    if (!t) return null;
    if (t.type === "num") {
      next();
      return t.val;
    }
    if (t.type === "fn") {
      next();
      const arg = parsePrimary();
      if (arg === null || arg === "DIV_ZERO") return arg;
      if (t.val === "sqrt" || t.val === "raiz") return arg < 0 ? "NEG_SQRT" : Math.sqrt(arg);
      if (t.val === "sin" || t.val === "sen") return Math.sin((arg * Math.PI) / 180);
      if (t.val === "cos") return Math.cos((arg * Math.PI) / 180);
      if (t.val === "tan" || t.val === "tg") return Math.tan((arg * Math.PI) / 180);
      if (t.val === "abs") return Math.abs(arg);
      if (t.val === "log") return arg <= 0 ? null : Math.log10(arg);
      return null;
    }
    if (t.type === "op" && t.val === "(") {
      next();
      const inner = parseExpr();
      if (inner === null || typeof inner === "string") return inner;
      if (!peek() || peek().type !== "op" || peek().val !== ")") return null;
      next();
      return inner;
    }
    return null;
  }

  const res = parseExpr();
  if (pos !== tokens.length) return null;
  return res;
}

function formatMathNumber(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return String(n);
  if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
  return Number(n.toFixed(4)).toString().replace(".", ",");
}

function solveJessyMath(rawQuestion) {
  const original = String(rawQuestion || "").trim();
  if (!original) {
    return 'Jessy: "Digite uma conta de matemática na caixa abaixo para eu resolver."';
  }

  let q = original.toLowerCase().replace(/,/g, ".");
  // 1) Porcentagem: "25% de 200"
  const pctMatch = q.match(/(-?\d+(?:\.\d+)?)\s*%\s*(?:de|do|da|\*)\s*(-?\d+(?:\.\d+)?)/);
  if (pctMatch) {
    const p = Number(pctMatch[1]);
    const baseVal = Number(pctMatch[2]);
    const ans = (p / 100) * baseVal;
    return `Jessy: "${formatMathNumber(p)}% de ${formatMathNumber(baseVal)} = ${formatMathNumber(ans)}."`;
  }

  // 2) Equação linear simples em x: "2x + 6 = 14" ou "x - 5 = 12"
  if (q.includes("=") && /\bx\b|\d+x/.test(q)) {
    const parts = q.replace(/[^\dx.+\-*=]/g, "").split("=");
    if (parts.length === 2 && parts[0] && parts[1]) {
      const parseLinear = (side) => {
        let a = 0;
        let b = 0;
        const terms = side.replace(/-/g, "+-").split("+").filter(Boolean);
        for (const term of terms) {
          if (term.includes("x")) {
            const c = term.replace("x", "").replace("*", "");
            a += c === "" || c === "+" ? 1 : c === "-" ? -1 : Number(c);
          } else {
            b += Number(term);
          }
        }
        return Number.isFinite(a) && Number.isFinite(b) ? { a, b } : null;
      };
      const L = parseLinear(parts[0]);
      const R = parseLinear(parts[1]);
      if (L && R && Math.abs(L.a - R.a) > 1e-9) {
        const xVal = (R.b - L.b) / (L.a - R.a);
        return `Jessy: "Resolvendo a equação de 1º grau: x = ${formatMathNumber(xVal)}."`;
      }
    }
  }

  // 3) Frases em português -> expressão matemática
  let expr = q
    .replace(/quanto\s+[eé]|qual\s+[eé]|calcule|quanto\s+d[aá]|resolve|resolva|\?/g, " ")
    .replace(/raiz\s+quadrada\s+de\s*(-?\d+(?:\.\d+)?)/g, "sqrt($1)")
    .replace(/raiz\s+de\s*(-?\d+(?:\.\d+)?)/g, "sqrt($1)")
    .replace(/√\s*\(?(-?\d+(?:\.\d+)?)\)?/g, "sqrt($1)")
    .replace(/(-?\d+(?:\.\d+)?)\s+ao\s+quadrado/g, "($1^2)")
    .replace(/(-?\d+(?:\.\d+)?)\s+ao\s+cubo/g, "($1^3)")
    .replace(/\bmais\b/g, "+")
    .replace(/\bmenos\b/g, "-")
    .replace(/\bvezes\b/g, "*")
    .replace(/\bdividido\s+por\b|\bdividido\b/g, "/")
    .replace(/[×·]/g, "*")
    .replace(/÷/g, "/")
    .replace(/\*\*/g, "^")
    .replace(/(\d)\s*x\s*(\d)/g, "$1*$2")
    .trim();

  const val = safeEvalMathExpr(expr);
  if (val === "DIV_ZERO") {
    return 'Jessy: "Divisão por zero não é definida nos números reais."';
  }
  if (val === "NEG_SQRT") {
    return 'Jessy: "Raiz quadrada de número negativo não tem resultado real (pertence aos números complexos)."';
  }
  if (typeof val === "number" && Number.isFinite(val)) {
    return `Jessy: "${original} = ${formatMathNumber(val)}."`;
  }

  return `Jessy: "Não consegui interpretar '${original}'. Tente usar números e operadores como +, -, *, /, ^, %, raiz() ou uma equação com x."`;
}

function canFulfillReq(req) {
  return Object.entries(req).every(([cropId, need]) => (state.inventory[cropId] || 0) >= need);
}

function consumeReq(req) {
  Object.entries(req).forEach(([cropId, need]) => {
    removeItemFromInventory(cropId, need, false);
  });
}

function awardTitle(titleName) {
  if (!state.titles.includes(titleName)) {
    state.titles.push(titleName);
  }
  state.activeTitle = titleName;
  syncPlayerTitleSkin();
  if (titleName === "Airfryer") {
    showToast("🍟", "SKIN AIRFRYER ATIVADA!", "Você virou uma Airfryer parada! Clique no título ou aperte G para voltar a andar.");
  }
}

function triggerCoringaBurst(playFullLaugh = false) {
  const candidates = ALYFFER_CORINGA_LINES.filter((l) => l !== state.currentCoringaLine);
  const pool = candidates.length > 0 ? candidates : ALYFFER_CORINGA_LINES;
  const line = pool[Math.floor(Math.random() * pool.length)];
  state.currentCoringaLine = line;
  state.coringaTimer = 4.5 + Math.random() * 1.5;

  if (coringaBubbleText) {
    coringaBubbleText.textContent = `"${line}"`;
  }
  if (coringaBubble && state.mode === "playing") {
    coringaBubble.classList.remove("hidden");
  }

  sfx.play(playFullLaugh ? "coringa" : "chuckle");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 2.2, 0)), 0xec4899, playFullLaugh ? 18 : 8);
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0x4ade80, playFullLaugh ? 14 : 6);
}

function addInsanity(amount, fromEtec = true) {
  if (fromEtec) state.visitedEtecToday = true;
  const wasCrazy = state.isCrazy;
  state.insanity = Math.min(100, state.insanity + amount);
  state.isCrazy = state.insanity >= 100;

  if (state.isCrazy) {
    triggerCoringaBurst(!wasCrazy);
    if (!wasCrazy) {
      showDayBanner("🤡 ALYFFER CORINGOU (100%)! COMEÇOU A FALAR SÓ BESTEIRA!");
    }
    showToast("🤡", "ALYFFER CORINGANDO (100%)!", state.currentCoringaLine);
  } else {
    sfx.play("plant");
    spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0xa855f7, 10);
  }
  updateHUD();
  saveGame();
}

function openNpcModal(npcId) {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  currentNpcId = npcId;
  state.mode = "modal";
  renderNpcModal();
  npcModal.classList.remove("hidden");
}

function closeNpcModal() {
  npcModal.classList.add("hidden");
  currentNpcId = null;
  jessyLastAnswer = "";
  state.mode = "playing";
  updateHUD();
}

function renderNpcModal() {
  npcMissionBox.classList.add("hidden");
  if (npcAppearance) {
    if (state.isLambiHomem && state.location === "etec_inside" && !isNpcKnockedOut(currentNpcId)) {
      npcAppearance.textContent = "👅 Modo LAMBI HOMEM ativo! Feche esta janela e aperte F perto do NPC para lambê-lo (derruba por 1 dia)!";
      npcAppearance.classList.remove("hidden");
    } else {
      npcAppearance.textContent = "";
      npcAppearance.classList.add("hidden");
    }
  }
  if (kaioShopBox) {
    kaioShopBox.classList.add("hidden");
    kaioShopBox.innerHTML = "";
  }
  npcActionBtn.disabled = false;
  npcActionBtn.classList.remove("hidden");

  if (currentNpcId === "muzzonline") {
    npcTag.textContent = "SALA 3AI • ETECAMP";
    npcName.textContent = "Muzzonline";
    const muzzQuote = MUZZ_LINES[Math.floor(Math.random() * MUZZ_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${muzzQuote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : muzzQuote;
    npcActionBtn.textContent = state.isCrazy
      ? "Coringar Junto com Muzzonline (100% 🤡)"
      : "Ouvir Besteira Aleatória (+25% Insanidade)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(25);
      if (!state.isCrazy) {
        showToast("🤪", "MUZZONLINE", `+25% (${state.insanity}%)! Cada ideia aleatória...`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "kaio") {
    npcTag.textContent = "LAB. DE QUÍMICA • LOJA DE ADUBO DO KAIO";
    npcName.textContent = "Kaio Wendell (Cientista & Vendedor de Adubo)";
    const kaioQuote = KAIO_LINES[Math.floor(Math.random() * KAIO_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${kaioQuote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : kaioQuote;

    // Loja de Adubo Químico do Kaio na ETEC!
    if (kaioShopBox) {
      kaioShopBox.classList.remove("hidden");
      kaioShopBox.innerHTML = `<div class="kaio-shop-header">🧪 Adubo Químico do Kaio • Seu Caixa: ${formatBRL(state.money)}</div>`;
      const kaioProducts = [
        {
          emoji: "🧪",
          name: "Adubo NPK do Kaio",
          sub: `+50% crescimento na hora e 2x velocidade no canteiro • Você tem: ${state.kaioAdubo}`,
          price: 45,
          buy: () => {
            if (!canAddItemToInventory("adubo_npk", 1)) {
              state.money += 45;
              showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar!");
              return;
            }
            addItemToInventory("adubo_npk", 1);
          },
        },
        {
          emoji: "⚗️",
          name: "Super-Adubo Turbinado",
          sub: `Colheita 100% instantânea + chance extra dupla • Você tem: ${state.kaioSuperAdubo}`,
          price: 110,
          buy: () => {
            if (!canAddItemToInventory("super_adubo", 1)) {
              state.money += 110;
              showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar!");
              return;
            }
            addItemToInventory("super_adubo", 1);
          },
        },
      ];
      kaioProducts.forEach((prod) => {
        const row = document.createElement("div");
        row.className = "row-card";
        const canBuy = state.money >= prod.price;
        row.innerHTML = `
          <div class="row-info">
            <span class="row-emoji">${prod.emoji}</span>
            <div>
              <div class="row-title">${prod.name}</div>
              <div class="row-sub">${prod.sub}</div>
            </div>
          </div>
          <button class="mini-btn green" type="button" ${canBuy ? "" : "disabled"}>Comprar ${formatBRL(prod.price)}</button>
        `;
        row.querySelector("button").addEventListener("click", () => {
          if (state.money < prod.price) return;
          state.money -= prod.price;
          prod.buy();
          sfx.play("sell");
          showToast(prod.emoji, "ADUBO COMPRADO DO KAIO!", `Use com F ou E em qualquer planta crescendo na horta!`);
          updateHUD();
          saveGame();
          renderNpcModal();
        });
        kaioShopBox.appendChild(row);
      });
    }

    npcActionBtn.textContent = state.isCrazy
      ? "Coringar no Lab de Química (100% 🤡)"
      : "Ouvir Aula de Química (+30% Sanidade/Coringa)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(30);
      if (!state.isCrazy) {
        showToast("🧪", "KAIO WENDELL", `+30% (${state.insanity}%)! Pura química na cabeça!`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "felix") {
    npcTag.textContent = "SALA 1AI • MISSÕES DE TÍTULO";
    npcName.textContent = "Félix";
    if (state.felixStep >= FELIX_QUESTS.length) {
      npcDialogue.textContent = "Félix: 'Valeu pelos rangos da horta, Homem Guloso! Você é lenda na ETEC!'";
      npcActionBtn.textContent = "Missões do Félix Concluídas ✓";
      npcActionBtn.disabled = true;
      npcActionBtn.onclick = null;
    } else {
      const q = FELIX_QUESTS[state.felixStep];
      const ready = canFulfillReq(q.req);
      npcDialogue.textContent = `Félix: "${q.quote}"`;
      npcMissionBox.classList.remove("hidden");
      npcMissionTitle.textContent = q.title;
      npcMissionReq.textContent = `Precisa: ${q.reqLabel}`;
      npcMissionReward.textContent = `Recompensa: ${formatBRL(q.rewardMoney)} + Título "${q.rewardTitle}"`;
      npcActionBtn.textContent = ready
        ? `Entregar Missão & Ganhar Título "${q.rewardTitle}"`
        : "Ainda falta colheita na cesta";
      npcActionBtn.disabled = !ready;
      npcActionBtn.onclick = () => {
        if (!canFulfillReq(q.req)) return;
        consumeReq(q.req);
        state.money += q.rewardMoney;
        awardTitle(q.rewardTitle);
        state.felixStep += 1;
        sfx.play("upgrade");
        showDayBanner(`🏆 NOVO TÍTULO CONQUISTADO: "${q.rewardTitle.toUpperCase()}"!`);
        updateHUD();
        saveGame();
        renderNpcModal();
      };
    }
  } else if (currentNpcId === "pao") {
    npcTag.textContent = "SALA 3AI • MISSÕES DE TÍTULO";
    npcName.textContent = "Pão";
    if (state.paoStep >= PAO_QUESTS.length) {
      npcDialogue.textContent = "Pão: 'É isso aí, Macho! Respeito máximo pelo rei da alface de Pau Arcado!'";
      npcActionBtn.textContent = "Missões do Pão Concluídas ✓";
      npcActionBtn.disabled = true;
      npcActionBtn.onclick = null;
    } else {
      const q = PAO_QUESTS[state.paoStep];
      const ready = canFulfillReq(q.req);
      npcDialogue.textContent = `Pão: "${q.quote}"`;
      npcMissionBox.classList.remove("hidden");
      npcMissionTitle.textContent = q.title;
      npcMissionReq.textContent = `Precisa: ${q.reqLabel}`;
      npcMissionReward.textContent = `Recompensa: ${formatBRL(q.rewardMoney)} + Título "${q.rewardTitle}"`;
      npcActionBtn.textContent = ready
        ? `Entregar Missão & Ganhar Título "${q.rewardTitle}"`
        : "Ainda falta colheita na cesta";
      npcActionBtn.disabled = !ready;
      npcActionBtn.onclick = () => {
        if (!canFulfillReq(q.req)) return;
        consumeReq(q.req);
        state.money += q.rewardMoney;
        awardTitle(q.rewardTitle);
        state.paoStep += 1;
        sfx.play("upgrade");
        showDayBanner(`🏆 NOVO TÍTULO CONQUISTADO: "${q.rewardTitle.toUpperCase()}"!`);
        updateHUD();
        saveGame();
        renderNpcModal();
      };
    }
  } else if (currentNpcId === "marcelo") {
    npcTag.textContent = "ETECAMP • PROFESSOR, VASELINA & CAÇA-ONÇA";
    npcName.textContent = "Professor Marcelo";
    npcDialogue.textContent = state.marceloHired
      ? `Marcelo: "E aí, Macho! Faltam ${state.marceloDaysLeft} dia(s) de vigia no seu sítio. E se quiser correr igual foguete, tenho Vaselina fresquinha pra vender aqui!"`
      : `Marcelo: "Fala, Alyffer! Posso vigiar sua fazenda contra a Onça Pintada, e também vendo Vaselina turbinada — tomou, ficou muito mais rápido!"`;

    if (kaioShopBox) {
      kaioShopBox.classList.remove("hidden");
      kaioShopBox.innerHTML = `<div class="kaio-shop-header">👨‍🏫 Professor Marcelo (Vaselina &amp; Ajuda contra Onças) • Seu Caixa: ${formatBRL(state.money)}</div>`;
      const marceloItems = [
        {
          emoji: "🧴",
          name: `Vaselina do Marcelo (1 Frasco • Você tem: ${state.vaselina})`,
          sub: "Guarda na mochila! Aperte Z ou clique no botão p/ tomar e ganhar +65% velocidade por 95s!",
          price: 55,
          buy: () => {
            if (!canAddItemToInventory("vaselina", 1)) {
              state.money += 55;
              showToast("🎒", "MOCHILA LOTADA!", "Libere 1 slot no Inventário (I) antes de comprar!");
              return;
            }
            addItemToInventory("vaselina", 1);
            sfx.play("sell");
            showToast("🧴", "VASELINA NO INVENTÁRIO!", `Você tem ${state.vaselina} frasco(s). Segure na Hotbar ou aperte Z para tomar!`);
          },
        },
        {
          emoji: "⚡",
          name: "Tomar Vaselina Agora (Na Hora!)",
          sub: "Bebe na hora no corredor da ETECAMP e já sai voando (+65% velocidade por 95s)!",
          price: 65,
          buy: () => {
            state.vaselinaTimer = 95;
            sfx.play("upgrade");
            spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x38bdf8, 22);
            showToast("🧴", "TOMOU VASELINA NA HORA!", "+65% Velocidade turbinada por 95s!");
          },
        },
        {
          emoji: "🛡️",
          name: "Contratar Marcelo (3 Dias)",
          sub: "Patrulha o sítio com taco pesado (30 dano por golpe) e protege vacas, ovelhas e porcos!",
          price: 240,
          buy: () => {
            state.marceloHired = true;
            state.marceloDaysLeft = (state.marceloDaysLeft || 0) + 3;
            if (marceloYardEntity) marceloYardEntity.mesh.visible = state.location === "yard";
            sfx.play("upgrade");
            showDayBanner("🛡️ MARCELO CONTRATADO POR +3 DIAS! SEUS ANIMAIS ESTÃO PROTEGIDOS!");
            showToast("🛡️", "MARCELO CONTRATADO!", `Ele já foi para Pau Arcado vigiar seu sítio! (${state.marceloDaysLeft} dias restantes).`);
          },
        },
        {
          emoji: "⭐",
          name: "Contrato Semanal (7 Dias • Desconto!)",
          sub: "Proteção estendida por 7 dias seguidos contra qualquer ataque de onça!",
          price: 480,
          buy: () => {
            state.marceloHired = true;
            state.marceloDaysLeft = (state.marceloDaysLeft || 0) + 7;
            if (marceloYardEntity) marceloYardEntity.mesh.visible = state.location === "yard";
            sfx.play("upgrade");
            showDayBanner("🛡️ MARCELO CONTRATADO POR +7 DIAS! SEUS ANIMAIS ESTÃO PROTEGIDOS!");
            showToast("🛡️", "MARCELO CONTRATADO!", `Ele já foi para Pau Arcado vigiar seu sítio! (${state.marceloDaysLeft} dias restantes).`);
          },
        },
      ];
      marceloItems.forEach((plan) => {
        const row = document.createElement("div");
        row.className = "row-card";
        const canAfford = state.money >= plan.price;
        row.innerHTML = `
          <div class="row-info">
            <span class="row-emoji">${plan.emoji}</span>
            <div>
              <div class="row-title">${plan.name}</div>
              <div class="row-sub">${plan.sub}</div>
            </div>
          </div>
          <button class="mini-btn green" type="button" ${canAfford ? "" : "disabled"}>
            Comprar ${formatBRL(plan.price)}
          </button>
        `;
        row.querySelector("button").addEventListener("click", () => {
          if (state.money < plan.price) return;
          state.money -= plan.price;
          plan.buy();
          updateHUD();
          saveGame();
          renderNpcModal();
        });
        kaioShopBox.appendChild(row);
      });
    }

    npcActionBtn.textContent =
      state.vaselina > 0
        ? `🧴 Tomar Vaselina da Mochila (${state.vaselina}) — +65% Vel.`
        : "🧴 Comprar & Tomar Vaselina Agora (R$ 65)";
    npcActionBtn.disabled = state.vaselina <= 0 && state.money < 65;
    npcActionBtn.onclick = () => {
      if (state.vaselina > 0) {
        removeItemFromInventory("vaselina", 1, true);
        state.vaselinaTimer = 95;
        sfx.play("upgrade");
        showToast("🧴", "TOMOU VASELINA DO MARCELO!", "+65% Velocidade por 95s!");
      } else if (state.money >= 65) {
        state.money -= 65;
        state.vaselinaTimer = 95;
        sfx.play("upgrade");
        showToast("🧴", "TOMOU VASELINA NA HORA!", "+65% Velocidade por 95s!");
      }
      updateHUD();
      saveGame();
      renderNpcModal();
    };
  } else if (currentNpcId === "b_lab24") {
    npcTag.textContent = "LAB. DE INFORMÁTICA 24 • ETECAMP";
    npcName.textContent = "B******";
    const quote = B_LAB24_LINES[Math.floor(Math.random() * B_LAB24_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${quote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : quote;
    npcActionBtn.textContent = state.isCrazy
      ? "Coringar no Lab 24 com B****** (100% 🤡)"
      : "Conversar com B****** (+25% Insanidade)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(25);
      if (!state.isCrazy) {
        showToast("💻", "B****** (LAB 24)", `+25% Insanidade (${state.insanity}%)!`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "t_lab24") {
    npcTag.textContent = "LAB. DE INFORMÁTICA 24 • ETECAMP";
    npcName.textContent = "T*******";
    const quote = T_LAB24_LINES[Math.floor(Math.random() * T_LAB24_LINES.length)];
    npcDialogue.textContent = state.isCrazy
      ? `${quote}\n\n🤡 Alyffer Coringando: "${state.currentCoringaLine}"`
      : quote;
    npcActionBtn.textContent = state.isCrazy
      ? "Coringar no Lab 24 com T******* (100% 🤡)"
      : "Ouvir Recado pro Marcelo (+25% Insanidade)";
    npcActionBtn.onclick = () => {
      const wasCrazy = state.isCrazy;
      addInsanity(25);
      if (!state.isCrazy) {
        showToast("🗣️", "T******* (LAB 24)", `+25% Insanidade (${state.insanity}%)! Oxe, Marcelo, cuida dos mininos!`);
      } else if (wasCrazy) {
        showToast("🤡", "ALYFFER CORINGANDO!", state.currentCoringaLine);
      }
      renderNpcModal();
    };
  } else if (currentNpcId === "jessy") {
    npcTag.textContent = "LAGO DE PAU ARCADO • MATEMÁTICA";
    npcName.textContent = "Jessy";
    const baseText =
      jessyLastAnswer ||
      JESSY_OPENING_LINES[Math.floor(Math.random() * JESSY_OPENING_LINES.length)];
    npcDialogue.textContent = baseText;

    if (kaioShopBox) {
      kaioShopBox.classList.remove("hidden");
      kaioShopBox.innerHTML = `
        <div class="kaio-shop-header">🧮 Pergunte Matemática para o Jessy</div>
        <div style="display:flex;gap:6px">
          <input id="jessyMathInput" class="tabua-input" type="text" placeholder="Digite sua conta de matemática..." />
          <button id="jessyAskBtn" type="button" class="mini-btn green">Resolver</button>
        </div>
      `;
      const inp = kaioShopBox.querySelector("#jessyMathInput");
      const askBtn = kaioShopBox.querySelector("#jessyAskBtn");
      const runAsk = (qText) => {
        jessyLastAnswer = solveJessyMath(qText);
        sfx.play("phone_notif");
        renderNpcModal();
      };
      if (askBtn && inp) {
        askBtn.addEventListener("click", () => runAsk(inp.value));
        inp.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            runAsk(inp.value);
          }
        });
        setTimeout(() => inp.focus(), 30);
      }
    }

    npcActionBtn.classList.add("hidden");
    npcActionBtn.onclick = null;
  }
}

// Calendar & Bus 402 Modal Logic
function openCalendarModal() {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderCalendarModal();
  calendarModal.classList.remove("hidden");
}

function closeCalendarModal() {
  calendarModal.classList.add("hidden");
  state.mode = "playing";
}

function renderCalendarModal() {
  const cal = getCalendarInfo(state.day);
  calendarMonthTitle.textContent = `${cal.monthName} • Ano ${cal.year} (Dia ${state.day})`;

  const nowText = formatHHMM(state.dayMinutes);
  const workStatus = isAfterWorkHours()
    ? "🌙 Expediente encerrado (após 19:00 — vá dormir!)"
    : "☀️ Expediente ativo (trabalho permitido até 19:00)";
  calendarSummaryLine.innerHTML = `Hoje é <strong>${cal.weekdayFull}, ${String(cal.dayOfMonth).padStart(2, "0")} de ${cal.monthName}</strong> • Hora: <strong>${nowText}</strong> • Clima: <strong>${state.isRainy ? "Chuvoso 🌧️" : "Ensolarado ☀️"}</strong> • ${workStatus}`;

  calendarGrid.innerHTML = "";
  for (let i = 0; i < cal.firstDayOfMonthWeek; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-cell empty";
    calendarGrid.appendChild(empty);
  }
  for (let d = 1; d <= cal.daysInMonth; d++) {
    const dow = (cal.firstDayOfMonthWeek + d - 1) % 7;
    const isWeekend = dow === 0 || dow === 6;
    const isToday = d === cal.dayOfMonth;
    const isPast = d < cal.dayOfMonth;
    const cell = document.createElement("div");
    cell.className = `cal-cell${isWeekend ? " weekend" : ""}${isPast ? " past" : ""}${isToday ? " today" : ""}`;
    const tagText = isToday
      ? state.isRainy
        ? "🌧️ Hoje"
        : "☀️ Hoje"
      : dow === 6
        ? "🚌 Sáb"
        : dow === 0
          ? "🚌 Dom"
          : "";
    cell.innerHTML = `<span class="cal-num">${d}</span><span class="cal-tag">${tagText}</span>`;
    calendarGrid.appendChild(cell);
  }

  busScheduleTitle.textContent = `🚌 Linha 402 — Horários Oficiais JundMob (${cal.scheduleLabel})`;
  const pauStatus = getBus402Status("pauArcado");
  const termStatus = getBus402Status("terminal");

  if (state.isRainy) {
    busStatusBanner.className = "bus-status-banner blocked";
    busStatusBanner.textContent = "🌧️ Dia chuvoso em Pau Arcado! O Ônibus 402 não circula hoje.";
  } else if (pauStatus.available || termStatus.available) {
    busStatusBanner.className = "bus-status-banner available";
    const parts = [];
    if (pauStatus.available) parts.push(`Pau Arcado: NO PONTO (${pauStatus.activeTime})`);
    if (termStatus.available) parts.push(`Terminal CLP: NO PONTO (${termStatus.activeTime})`);
    busStatusBanner.textContent = `✅ Ônibus 402 disponível agora! ${parts.join(" • ")}`;
  } else {
    busStatusBanner.className = "bus-status-banner";
    const nextP = pauStatus.nextTime ? `${pauStatus.nextTime} (em ${pauStatus.minsUntilNext}m)` : "amanhã";
    const nextT = termStatus.nextTime ? `${termStatus.nextTime} (em ${termStatus.minsUntilNext}m)` : "amanhã";
    busStatusBanner.textContent = `⏳ Fora de horário agora (${nowText}). Próximo Pau Arcado: ${nextP} • Próximo Terminal: ${nextT}`;
  }

  function fillTimesGrid(el, statusObj) {
    el.innerHTML = "";
    statusObj.rawList.forEach((label) => {
      const dep = parseHHMM(label);
      const chip = document.createElement("span");
      let cls = "bus-time-chip";
      if (statusObj.activeTime === label && !state.isRainy) {
        cls += " active";
      } else if (statusObj.nextTime === label) {
        cls += " next";
      } else if (dep + BUS_BOARD_AFTER < state.dayMinutes) {
        cls += " past";
      }
      chip.className = cls;
      chip.textContent = label;
      el.appendChild(chip);
    });
  }
  fillTimesGrid(busTimesPauArcado, pauStatus);
  fillTimesGrid(busTimesTerminal, termStatus);
}

// Guide & Titles Modal Logic
function openGuideModal() {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  renderGuideModal();
  guideModal.classList.remove("hidden");
}

function closeGuideModal() {
  guideModal.classList.add("hidden");
  state.mode = "playing";
}

function renderGuideModal() {
  titlesList.innerHTML = "";
  ALL_TITLES.forEach((t) => {
    const unlocked = state.titles.includes(t);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `title-chip ${state.activeTitle === t ? "active" : ""} ${unlocked ? "" : "locked"}`;
    btn.textContent = unlocked ? `🏆 ${t}` : `🔒 ${t}`;
    btn.disabled = !unlocked;
    btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.activeTitle = t;
      syncPlayerTitleSkin();
      sfx.play("plant");
      if (t === "Airfryer") {
        showToast("🍟", "SKIN AIRFRYER EQUIPADA!", "Você virou uma Airfryer parada! Clique no título ou aperte G para trocar.");
      } else {
        showToast("🏆", "TÍTULO & SKIN EQUIPADOS", `Agora você está com "${t}"!`);
      }
      updateHUD();
      renderGuideModal();
      saveGame();
    });
    titlesList.appendChild(btn);
  });

  guideQuestsList.innerHTML = "";
  const questSummaries = [
    {
      npc: "Félix (Sala 1AI • ETECAMP)",
      done: state.felixStep >= FELIX_QUESTS.length,
      current: FELIX_QUESTS[Math.min(state.felixStep, FELIX_QUESTS.length - 1)],
      stepText: `${state.felixStep}/${FELIX_QUESTS.length}`,
    },
    {
      npc: "Pão (Sala 3AI • ETECAMP)",
      done: state.paoStep >= PAO_QUESTS.length,
      current: PAO_QUESTS[Math.min(state.paoStep, PAO_QUESTS.length - 1)],
      stepText: `${state.paoStep}/${PAO_QUESTS.length}`,
    },
  ];
  questSummaries.forEach((qs) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${qs.done ? "✅" : "🎯"}</span>
        <div>
          <div class="row-title">${qs.npc} (${qs.stepText})</div>
          <div class="row-sub">${
            qs.done
              ? "Todas as missões concluídas!"
              : `${qs.current.title} — Precisa: <strong>${qs.current.reqLabel}</strong> → Título <strong>"${qs.current.rewardTitle}"</strong>`
          }</div>
        </div>
      </div>
    `;
    guideQuestsList.appendChild(row);
  });
}

