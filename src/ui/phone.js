// ============================================================================
// CELULAR DO MACHO • REDES SOCIAIS & APP ONLY-RESENHA (@only_resenha_ / alfinetation)
// ============================================================================
let phoneCurrentApp = "home"; // home | only_resenha | zap | insta | minigame
let onlyResenhaTab = "feed"; // feed | create
let activeZapChatId = null;
let miniArcadeTimer = null;

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPhoneSignalLabel() {
  if (state.location === "basement") return "📵 Porão 0G (Multiverso)";
  if (state.location === "terminal" && state.maluquinho.active) return "📵 Panela 0G";
  if (state.location === "etec" || state.location === "etec_inside") return "📶 ETECAMP Wi-Fi";
  if (state.location === "terminal") return "📶 Terminal CLP 5G";
  if (state.location === "room") return "📶 Sítio_2.4G";
  return "📶 Pau Arcado 4G";
}

function updatePhoneStatusBar() {
  if (!phoneTimeBar) return;
  phoneTimeBar.textContent = formatHHMM(state.dayMinutes);
  if (phoneSignalBar) phoneSignalBar.textContent = getPhoneSignalLabel();
  if (phoneBatteryBar) {
    const mins = state.dayMinutes < 390 ? state.dayMinutes + 1440 : state.dayMinutes;
    const bat = Math.max(12, Math.min(99, Math.round(98 - ((mins - 390) / 1080) * 78)));
    phoneBatteryBar.textContent = `${state.isCrazy ? "🤡" : "🔋"} ${bat}%`;
  }
}

function stopMiniArcade() {
  if (miniArcadeTimer) {
    clearInterval(miniArcadeTimer);
    miniArcadeTimer = null;
  }
}

function openPhoneModal(initialApp = "home") {
  if (state.isSleeping || state.mode === "dead" || state.mode === "start") return;
  const held = typeof getHeldItem === "function" ? getHeldItem() : null;
  if (!held || held.id !== "celular") {
    sfx.play("error");
    const ownsPhone = typeof getItemCount === "function" && getItemCount("celular") > 0;
    showToast(
      "📱",
      ownsPhone ? "SEGURE O CELULAR!" : "SEM CELULAR!",
      ownsPhone
        ? "Coloque o 📱 Celular na mão (Hotbar 1–9) e aperte E para abrir!"
        : "Compre o 📱 Celular no Terminal CLP (Loja da Estação ou Bancas)!"
    );
    return;
  }
  clearActiveInputs();
  closeAllModals();
  state.mode = "modal";
  phoneCurrentApp = initialApp;
  activeZapChatId = null;
  if (state.phone) state.phone.unread = 0;
  sfx.play("phone_notif");
  updateHUD();
  renderPhoneApp();
  if (phoneModal) phoneModal.classList.remove("hidden");
  saveGame();
}

function closePhoneModal() {
  stopMiniArcade();
  if (phoneModal) phoneModal.classList.add("hidden");
  state.mode = "playing";
  updateHUD();
}

function navigatePhoneBack() {
  stopMiniArcade();
  sfx.play("phone_tap");
  if (phoneCurrentApp === "zap" && activeZapChatId) {
    activeZapChatId = null;
    renderPhoneApp();
    return;
  }
  if (phoneCurrentApp !== "home") {
    phoneCurrentApp = "home";
    renderPhoneApp();
    return;
  }
  closePhoneModal();
}

function buildOnlyResenhaFeed() {
  const posts = [];

  if (state.phone && Array.isArray(state.phone.userPosts)) {
    state.phone.userPosts.forEach((up) => posts.push(up));
  }

  // Posts reativos às loucuras reais acontecendo agora no jogo!
  if (state.isCrazy) {
    posts.push({
      id: "dyn_crazy",
      kicker: "🚨 PLANTÃO URGENTE • PF26🏅",
      emoji: "🤡🥬",
      bg: "linear-gradient(135deg, #be123c, #7e22ce)",
      headline: "JOVEM DE PAU ARCADO CORINGA 100% E DIZ QUE A ALFACE CRESPA TEM WI-FI 6G",
      caption: `Segundo nossas fontes inventadas agora na ETECAMP, ${state.activeTitle} Alyffer fez o sinal do 6-7 e saiu rindo de olho vermelho rumo à Linha 7-Rubi. Propaganda da desinformação feita com muito amor e carinho 🇧🇷🖕`,
      time: "Agora mesmo",
      likes: 184,
      comments: [
        { user: "@muzzonline.exe", text: "MANO O MACHO CORINGOU DE VERDADE KKKKKK 144 FPS" },
        { user: "@kaio.wendell", text: "Excesso de reagente + besteira aleatória no Lab!" },
      ],
    });
  }
  if (state.hasTamedJaguar) {
    posts.push({
      id: "dyn_tamed",
      kicker: "🐆 EXCLUSIVO PAU ARCADO",
      emoji: "🐆❤️",
      bg: "linear-gradient(135deg, #b45309, #991b1b)",
      headline: "MORADOR DOMA ONÇA PINTADA NA ENXADA E COLOCA ELA DE PORTEIRA DO SÍTIO",
      caption: "Moradores juram que a Onça só deixa entrar quem traz Alface Crespa ou ovo caipira pro Macho. O Jornal Nacional tentou checar e tomou block do @only_resenha_!",
      time: "Hoje",
      likes: 152,
      comments: [
        { user: "@marcelo.seguranca", text: "E mesmo assim me contrataram só pra tomar café perto das vacas 😎" },
        { user: "@orelha.dog", text: "au au (tenta chutar agora pra ver)" },
      ],
    });
  }
  if (state.marceloHired) {
    posts.push({
      id: "dyn_marcelo",
      kicker: "🛡️ PLANTÃO SEGURANÇA • ETECAMP",
      emoji: "🛡️🏏",
      bg: "linear-gradient(135deg, #1e293b, #0f766e)",
      headline: "SEGURANÇA MARCELO É CONTRATADO EM PAU ARCADO E ASSUSTA ATÉ O ÔNIBUS 402",
      caption: `Com ${state.marceloDaysLeft} dia(s) de contrato e seu taco lendário, Marcelo prometeu zerar ataque de onça com muito amor e carinho.`,
      time: "Hoje",
      likes: 98,
      comments: [
        { user: "@felix_guloso", text: "Segurança mais respeitado de Campo Limpo Paulista 🔥" },
      ],
    });
  }
  if (state.dayMinutes >= 18.5 * 60 || state.location === "terminal") {
    posts.push({
      id: "dyn_maluquinho",
      kicker: "🍲 ALERTA TERMINAL CLP",
      emoji: "🍲📱",
      bg: "linear-gradient(135deg, #1d4ed8, #0f172a)",
      headline: "MENINO COM PANELA NA CABEÇA INTERCEPTA PASSAGEIROS PERGUNTANDO: 'TEM JOGUINHO NO CELULAR?!'",
      caption: "Câmeras do Terminal Campo Limpo Paulista flagraram correria às 18:30 na Av. Alfried Krupp. Autoridades garantem que a panela amplifica o 5G.",
      time: "Plantão Noite",
      likes: 131,
      comments: [
        { user: "@menino_maluquinho", text: "EI MOÇO DEIXA EU JOGAR PEGA-ALFACE NO SEU CELULAR!! KKKKK" },
      ],
    });
  }
  if (state.isRainy) {
    posts.push({
      id: "dyn_rain",
      kicker: "🌧️ ÚLTIMA HORA • JUNDMOB",
      emoji: "🚌💦",
      bg: "linear-gradient(135deg, #334155, #1e3a8a)",
      headline: "CHOVE EM PAU ARCADO E MOTORISTA DO ÔNIBUS 402 DECIDE TIRAR COCHILO OFICIAL NO PONTO FINAL",
      caption: "Passageiros reclamam mas as alfaces comemoram: ninguém trabalha na chuva e os canteiros ficam regados sozinhos!",
      time: "Hoje",
      likes: 87,
      comments: [
        { user: "@pao_airfryer", text: "Dia de botar salgado na Airfryer e faltar na aula né Alyffer 😂" },
      ],
    });
  }

  // Posts oficiais inspirados na página @only_resenha_ (alfinetation) adaptados pro universo do jogo!
  const staticPosts = [
    {
      id: "or_pf26",
      kicker: "🏅 PRÊMIO PF26 • OFICIAL",
      emoji: "🏅🇧🇷",
      bg: "linear-gradient(135deg, #be185d, #ca8a04)",
      headline: "ALFINETATION (@only_resenha_) GANHA O PF26🏅 PELA 29ª VEZ PROPAGANDO DESINFORMAÇÃO COM CARINHO",
      caption: "Lar da maior fabricante de inverdades do Brasil — agora com sucursal oficial entre Pau Arcado, Terminal CLP e ETECAMP! Curtiu? Já virou verdade absoluta.",
      time: "Fixado 📌",
      likes: 600,
      comments: [
        { user: "@only_resenha_", text: "29 anos fabricando inverdades com muito amor e carinho 🇧🇷🖕" },
        { user: "@muzzonline.exe", text: "Fonte: eu sonhei ontem na aula do Centro Paula Souza" },
      ],
    },
    {
      id: "or_402",
      kicker: "🚌 INVERDADE VERIFICADA",
      emoji: "🚌💨",
      bg: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
      headline: "CONFIRMADO: ÔNIBUS 402 DA ESTRADA DO GARCIA AGORA VOA POR CIMA DO RIO JUNDIAÍ",
      caption: "Motorista garante que se o passageiro piscar na hora errada o 402 passa em 17 minutos antes ou só semana que vem. Confira no app JundMob 402!",
      time: "Há 2h",
      likes: 112,
      comments: [
        { user: "@macho.pauarcado", text: "Perdi o das 08:25 comprando adubo com o Kaio 😭" },
        { user: "@felix_guloso", text: "Se chegar atrasado não traz meu lanche na cantina não hein" },
      ],
    },
    {
      id: "or_kaio",
      kicker: "🧪 BOMBA NA ETECAMP",
      emoji: "🧪✨",
      bg: "linear-gradient(135deg, #047857, #0284c7)",
      headline: "CIENTISTA KAIO WENDELL INVENTA ADUBO QUE FAZ ALFACE CRESCER MAIS RÁPIDO QUE A NOTA DO BOLETIM",
      caption: "No Lab de Química de Botujuru, Kaio estaria vendendo Béquer Turbinado que transforma brotinho em Alface Dourado na hora!",
      time: "Há 4h",
      likes: 94,
      comments: [
        { user: "@kaio.wendell", text: "É pura estequiometria de íons K⁺ com Fenolftaleína, confia!" },
        { user: "@muzzonline.exe", text: "Eu bebi um gole achando que era Guaraná e fiquei em 4K" },
      ],
    },
    {
      id: "or_pac",
      kicker: "🎮 EXCLUSIVO TAURUS/PAC",
      emoji: "💙🌾",
      bg: "linear-gradient(135deg, #0369a1, #15803d)",
      headline: "PAC DO TAZERCRAFT TERIA AVALIADO A HORTA DO ALYFFER COM NOTA 1000 EM PAU ARCADO",
      caption: "Fontes do quarto do Macho afirmam que o pôster na parede piscou quando ele colheu o primeiro Alface Guloso. Fica a dica pro Félix!",
      time: "Ontem",
      likes: 164,
      comments: [
        { user: "@felix_guloso", text: "Traz 3 Alfaces Crespas pra mim que você ganha o título PAC na hora!" },
      ],
    },
    {
      id: "or_orelha",
      kicker: "🐶 POLÊMICA RURAL",
      emoji: "🐕💀",
      bg: "linear-gradient(135deg, #991b1b, #451a03)",
      headline: "CACHORRO ORELHA DÁ ENTREVISTA AO ONLY-RESENHA E AVISA: 'NEM TENTA DAR O CHUTE'",
      caption: "O animal mais respeitado de Campo Limpo Paulista afirmou que só aceita carinho. Quem apertar X perto dele descobre o atalho mais rápido pro Respawn.",
      time: "Ontem",
      likes: 219,
      comments: [
        { user: "@pao_airfryer", text: "O Orelha tem mais moral que a diretoria inteira KKKKK" },
        { user: "@only_resenha_", text: "Fato checado e inventado com sucesso 🏅" },
      ],
    },
    {
      id: "or_cantina",
      kicker: "🍗 CPI DA CANTINA",
      emoji: "🍗🔥",
      bg: "linear-gradient(135deg, #c2410c, #991b1b)",
      headline: "PÃO E FÉLIX ABREM CPI NA CANTINA DA ETEC PARA ACHAR QUEM ASSOU CENOURA NA AIRFRYER DA ESCOLA",
      caption: "Acusado pode levar o título de 'Airfryer' ou 'Homem Guloso'. Próximo capítulo sai assim que tocar o sinal em Botujuru!",
      time: "Há 2 dias",
      likes: 147,
      comments: [
        { user: "@pao_airfryer", text: "Se tiver Alface Americana crocante eu perdoo na hora!" },
      ],
    },
  ];

  return posts.concat(staticPosts);
}

function getDynamicZapChats() {
  const hotCrop = CROPS[state.hotCropId] || CROPS.alface_crespa;
  const userReplies = (state.phone && state.phone.zapReplies) || {};
  const appendExtra = (chatId, baseMsgs) => {
    const extra = Array.isArray(userReplies[chatId]) ? userReplies[chatId] : [];
    return baseMsgs.concat(extra);
  };

  return [
    {
      id: "etecamp",
      avatar: "🏫",
      name: "Resenha ETECAMP 3º Ano",
      status: "Muzzonline, Kaio, Félix, Pão, Você",
      preview: state.isCrazy ? "Muzz: ALYFFER CORINGOU KKKKK" : "Félix: Traz alface pra cantina!",
      messages: appendExtra("etecamp", [
        { sender: "Félix", text: `E aí Macho! Hoje o Terminal tá pagando bem por ${hotCrop.emoji} ${hotCrop.name} (${getCropSellPrice(hotCrop.id) ? formatBRL(getCropSellPrice(hotCrop.id)) : "em alta"})!` },
        { sender: "Muzzonline", text: "Mano, acabei de instalar TikTok no micro-ondas da ETECAMP e meu tênis vermelho tá rodando em 144 FPS 🕶️" },
        { sender: "Pão", text: "Bota essa energia na Airfryer aí Muzz 😭 Alyffer passa na cantina pegar missão!" },
        state.isCrazy
          ? { sender: "Kaio Wendell", text: "ALÔ @only_resenha_!! O Alyffer bateu 100% e começou a fazer 6-7 com o olho vermelho!" }
          : { sender: "Kaio Wendell", text: `Se precisar acelerar as plantas em Pau Arcado, tenho Adubo NPK (R$ 15) aqui no Lab de Química 🧪` },
      ]),
      replies: [
        { text: "Bora pra resenha na cantina! 😂", bot: "Pão", reply: "Fechou Macho! Desce na Estação Botujuru e passa aqui!" },
        { text: "Tô colhendo alface aqui em Pau Arcado 🥬", bot: "Félix", reply: "Boa Homem Guloso! Quero minha remessa fresquinha!" },
      ],
    },
    {
      id: "terminal402",
      avatar: "🚌",
      name: "Pau Arcado & Linha 402",
      status: "Ponto da Estrada do Garcia • Terminal CLP",
      preview: state.isRainy ? "Chuva: Ônibus 402 parado!" : "Próximo 402 ativo no ponto",
      messages: appendExtra("terminal402", [
        { sender: "Fiscal JundMob", text: state.isRainy ? "🌧️ Atenção Pau Arcado: chuva forte hoje, ônibus 402 fora de circulação!" : "🚌 Linha 402 operando! Lembre de conferir os horários no Calendário (K) antes de ir pro ponto." },
        { sender: "Feirante Av. Alfried Krupp", text: `Compramos ovos caipiras, leite, lã e muita ${hotCrop.name}! Pastel com caldo de cana saindo a R$ 8!` },
        { sender: "Menino Maluquinho", text: "EI MOÇO!! TEM JOGUINHO NO SEU CELULAR?! HEHEHE 🍲📱" },
      ]),
      replies: [
        { text: "Tem o Pega-Alface no celular sim kkkk 🎮", bot: "Menino Maluquinho", reply: "AEEEE!! VOU TE ESPERAR NA ESTAÇÃO LINHA 7-RUBI DE NOITE!!" },
        { text: "Passa um pastel de carne com caldo! 🥟", bot: "Feirante CLP", reply: "Saindo no capricho, só chegar na banca amarela do Terminal!" },
      ],
    },
    {
      id: "kaio_pv",
      avatar: "🧪",
      name: "Kaio Wendell (Lab Química)",
      status: "ETECAMP • Cientista Louco",
      preview: "Fórmula NPK pronta!",
      messages: appendExtra("kaio_pv", [
        { sender: "Kaio Wendell", text: `Macho, você tem ${state.kaioAdubo} Adubo NPK e ${state.kaioSuperAdubo} Super-Adubo na mochila.` },
        { sender: "Kaio Wendell", text: "Aperte F perto de qualquer canteiro crescendo pra aplicar direto na raiz! E não esqueça da bancada NPK grátis 1x/dia no Lab." },
      ]),
      replies: [
        { text: "Qual o pH ideal da alface hoje? 🧪", bot: "Kaio Wendell", reply: "Entre 6,0 e 6,5! Senão as moléculas entram em greve estequiométrica!" },
      ],
    },
    {
      id: "marcelo_pv",
      avatar: "🛡️",
      name: "Marcelo (Segurança)",
      status: state.marceloHired ? `Em serviço (${state.marceloDaysLeft}d)` : "Disponível na ETECAMP",
      preview: state.marceloHired ? "Taco pronto contra a Onça!" : "Contrate p/ vigiar seus animais!",
      messages: appendExtra("marcelo_pv", [
        state.marceloHired
          ? { sender: "Marcelo", text: `Patrulha em dia aqui em Pau Arcado! Faltam ${state.marceloDaysLeft} dia(s) de vigia. Nenhuma onça encosta nos seus bichos.` }
          : { sender: "Marcelo", text: "Se comprar vacas, ovelhas ou porcos no sítio, passa lá no corredor da ETECAMP e me contrata antes que a Onça apareça!" },
      ]),
      replies: [
        { text: "Valeu pela proteção, Marcelo! 🛡️", bot: "Marcelo", reply: "Tamo junto Macho! Qualquer rugido eu desço o taco!" },
      ],
    },
  ];
}

function getInstaFeedPosts() {
  const userPosts = (state.phone && Array.isArray(state.phone.userInstaPosts)) ? state.phone.userInstaPosts : [];
  const staticInsta = [
    {
      id: "insta_1",
      user: "@only_resenha_",
      badge: "alfinetation PF26🏅",
      emoji: "📸🚨",
      bg: "linear-gradient(135deg, #be123c, #f59e0b)",
      title: "Bastidores da Fábrica de Inverdades",
      caption: "Dia tranquilo em Campo Limpo Paulista inventando 12 notícias antes do Ônibus 402 das 08:25. Segue nois 🇧🇷🖕 #PF26 #Resenha",
      baseLikes: 44,
    },
    {
      id: "insta_2",
      user: "@muzzonline.exe",
      badge: "Lab Info • ETECAMP",
      emoji: "🕶️👟",
      bg: "linear-gradient(135deg, #334155, #dc2626)",
      title: "Setup Gamer de Tênis Vermelho",
      caption: "Rodei o jogo do Macho no PC da aula de informática enquanto o professor não olhava 😎🔥",
      baseLikes: 29,
    },
    {
      id: "insta_3",
      user: "@pao_airfryer",
      badge: "Cantina ETEC",
      emoji: "🥗🍟",
      bg: "linear-gradient(135deg, #b91c1c, #1d4ed8)",
      title: "Alface na Airfryer (Teste Cientifico)",
      caption: "Ficou crocante igual o Félix prometeu! Só falta o Alyffer trazer mais Alface Americana de Pau Arcado.",
      baseLikes: 37,
    },
    {
      id: "insta_4",
      user: "@macho.pauarcado",
      badge: "Quarto do Sítio",
      emoji: "💙📖",
      bg: "linear-gradient(135deg, #15803d, #0284c7)",
      title: "Cantinho do PAC & Mangás",
      caption: "Olhando o pôster do PAC (TazerCraft) antes de ir dormir às 19:00 pra acordar cedo regar alface 🌾",
      baseLikes: 53,
    },
  ];
  return userPosts.concat(staticInsta);
}

function renderPhoneHome() {
  phoneAppTitle.textContent = "MachoOS • Celular do Alyffer";
  if (phoneBackBtn) phoneBackBtn.classList.add("hidden");
  const hh = String(Math.floor(state.dayMinutes / 60)).padStart(2, "0");
  const mm = String(Math.floor(state.dayMinutes % 60)).padStart(2, "0");
  const cal = getCalendarInfo(state.day);
  const hotCrop = CROPS[state.hotCropId] || CROPS.alface_crespa;
  const topPost = buildOnlyResenhaFeed()[0];

  phoneBody.innerHTML = `
    <div class="phone-clock-widget">
      <div class="phone-big-time">${hh}:${mm}</div>
      <div class="phone-date-sub">${cal.weekdayFull}, ${String(cal.dayOfMonth).padStart(2, "0")}/${cal.monthShort} • ${state.isRainy ? "🌧️ Chuvoso (402 Parado)" : "☀️ Dia Bom na Roça"}</div>
      <div class="phone-date-sub" style="color:#fde047;margin-top:5px">🔥 Em alta no Terminal: ${hotCrop.emoji} ${hotCrop.name} (${formatBRL(getCropSellPrice(hotCrop.id))})</div>
    </div>

    <div id="homeBreakingWidget" class="phone-breaking-widget">
      <div class="phone-breaking-tag">🚨 AGORA NO ONLY-RESENHA (@only_resenha_) • PF26🏅</div>
      <div class="phone-breaking-headline">${escapeHtml(topPost.headline)}</div>
    </div>

    <div class="phone-app-grid">
      <button class="phone-app-tile" data-app="only_resenha" type="button">
        <div class="phone-app-icon app-bg-resenha">
          🔥
          <span class="app-mini-pill">PF26</span>
        </div>
        <span class="phone-app-name">Only-Resenha</span>
      </button>

      <button class="phone-app-tile" data-app="zap" type="button">
        <div class="phone-app-icon app-bg-zap">💬</div>
        <span class="phone-app-name">Zap da Roça</span>
      </button>

      <button class="phone-app-tile" data-app="insta" type="button">
        <div class="phone-app-icon app-bg-insta">📸</div>
        <span class="phone-app-name">InstaRoça</span>
      </button>

      <button class="phone-app-tile" data-app="minigame" type="button">
        <div class="phone-app-icon app-bg-game">🥬</div>
        <span class="phone-app-name">Pega-Alface</span>
      </button>

      <button class="phone-app-tile" data-app="bus402" type="button">
        <div class="phone-app-icon app-bg-bus">🚌</div>
        <span class="phone-app-name">JundMob 402</span>
      </button>

      <button class="phone-app-tile" data-app="guide" type="button">
        <div class="phone-app-icon app-bg-guide">🏆</div>
        <span class="phone-app-name">Títulos &amp; Mapa</span>
      </button>
    </div>

    <div class="row-sub" style="text-align:center;font-size:0.72rem;opacity:0.8">
      Seguidores no Only-Resenha: <strong>${state.phone.resenhaFollowers}</strong> • Recorde Pega-Alface: <strong>${state.phone.gameHighScore}</strong>
    </div>
  `;

  const bw = document.getElementById("homeBreakingWidget");
  if (bw) {
    bw.addEventListener("click", () => {
      sfx.play("phone_tap");
      phoneCurrentApp = "only_resenha";
      onlyResenhaTab = "feed";
      renderPhoneApp();
    });
  }

  phoneBody.querySelectorAll(".phone-app-tile").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.app;
      sfx.play("phone_tap");
      if (target === "bus402") {
        closePhoneModal();
        openCalendarModal();
        return;
      }
      if (target === "guide") {
        closePhoneModal();
        openGuideModal();
        return;
      }
      phoneCurrentApp = target;
      renderPhoneApp();
    });
  });
}

function renderOnlyResenhaApp() {
  phoneAppTitle.textContent = "only-resenha • @only_resenha_";
  if (phoneBackBtn) phoneBackBtn.classList.remove("hidden");

  const feedPosts = buildOnlyResenhaFeed();
  const templates = [
    {
      kicker: "🚨 URGENTE PAU ARCADO",
      emoji: "🥬💸",
      bg: "linear-gradient(135deg, #16a34a, #ca8a04)",
      headline: "ÔNIBUS 402 PASSA A ACEITAR ALFACE CRESPA COMO PAGAMENTO DE PASSAGEM",
      caption: "Motorista teria pedido 2 pés de alface e um ovo caipira na Estrada do Garcia. Empresa nega, @only_resenha_ confirma!",
    },
    {
      kicker: "🧪 BOMBA ETECAMP",
      emoji: "🧪🎸",
      bg: "linear-gradient(135deg, #7e22ce, #db2777)",
      headline: "ADUBO DO KAIO WENDELL FAZ PÉ DE MORANGO CANTAR FUNK DE MADRUGADA",
      caption: "Vizinhos de Pau Arcado dizem que a horta do Macho virou baile funk após síntese NPK no Lab de Química.",
    },
    {
      kicker: "🍲 PLANTÃO TERMINAL CLP",
      emoji: "🍲👑",
      bg: "linear-gradient(135deg, #0284c7, #4f46e5)",
      headline: "MENINO MALUQUINHO É ELEITO SÍNDICO DA ESTAÇÃO CAMPO LIMPO PAULISTA",
      caption: "Prometeu Wi-Fi grátis dentro da panela e liberação do joguinho no celular na fila da Linha 7-Rubi!",
    },
    {
      kicker: "🏅 EXCLUSIVO PF26",
      emoji: "🐆☕",
      bg: "linear-gradient(135deg, #b45309, #dc2626)",
      headline: "ONÇA PINTADA ABRE BARRACA DE PASTEL COM CALDO DE CANA AO LADO DO FÉLIX",
      caption: "Com muito amor e carinho, garantimos que essa inverdade já ganhou mais curtida que a nota da prova da ETEC!",
    },
  ];

  const profileHtml = `
    <div class="or-profile-card">
      <div class="or-profile-top">
        <div class="or-avatar-ring">
          <div class="or-avatar-inner">🔥</div>
        </div>
        <div class="or-stats-row">
          <div class="or-stat"><strong>${state.phone.resenhaPostsCount}</strong><span>posts</span></div>
          <div class="or-stat"><strong>${state.phone.resenhaFollowers}</strong><span>seguidores</span></div>
          <div class="or-stat"><strong>174</strong><span>seguindo</span></div>
        </div>
      </div>
      <div class="or-name-row">
        <span>alfinetation</span>
        <span class="or-verified" title="Verificado pela Resenha">☑️</span>
        <span class="or-pf26-badge">Ganhou PF26🏅</span>
      </div>
      <div class="or-handle">@only_resenha_ • Instagram Oficial Adaptado</div>
      <div class="or-bio">
        Lar da maior fabricante de inverdades do Brasil (e de Pau Arcado!), há 29 anos propagando a desinformação com muito amor e carinho 🇧🇷🖕<br/>
        Página de notícias que ganhou PF26🏅 • Correspondentes na ETECAMP &amp; Terminal CLP
      </div>
    </div>

    <div class="or-tabs">
      <button class="or-tab-btn ${onlyResenhaTab === "feed" ? "active" : ""}" data-tab="feed" type="button">📰 Feed (${feedPosts.length})</button>
      <button class="or-tab-btn ${onlyResenhaTab === "create" ? "active" : ""}" data-tab="create" type="button">🎙️ Fabricar Inverdade</button>
    </div>
  `;

  if (onlyResenhaTab === "create") {
    const canPost = !state.phone.postedFakeToday;
    phoneBody.innerHTML =
      profileHtml +
      `
      <div class="or-composer-box">
        <h3 style="margin-bottom:6px;color:#fde047">🎙️ Redação alfinetation (@only_resenha_)</h3>
        <p class="row-sub" style="margin-bottom:10px">
          ${canPost ? "Mande uma inverdade fresca hoje! Ganha <strong>seguidores no @only_resenha_</strong> e <strong>+1 Reputação</strong>!" : "Você já fabricou a manchete bombástica de hoje! Volte amanhã para mais desinformação."}
        </p>
        <input id="orCustomInput" class="or-input" type="text" maxlength="95" placeholder="Ou escreva sua própria manchete bombástica..." ${canPost ? "" : "disabled"} />
        <button id="orPublishCustomBtn" class="mini-btn green" style="width:100%;margin-bottom:10px" type="button" ${canPost ? "" : "disabled"}>
          🚀 Publicar Manchete Própria no @only_resenha_
        </button>
        <div class="row-sub" style="margin-bottom:6px">Ou escolha uma pauta pronta da ETECAMP:</div>
        <div class="or-template-list">
          ${templates
            .map(
              (t, idx) => `
            <button class="or-template-btn" data-tpl="${idx}" type="button" ${canPost ? "" : "disabled"}>
              <strong>${t.emoji} ${t.headline}</strong>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    const publishFakeNews = (postObj) => {
      if (state.phone.postedFakeToday) return;
      const gainFollowers = 4 + Math.floor(Math.random() * 5);
      state.phone.postedFakeToday = true;
      state.phone.resenhaPostsCount += 1;
      state.phone.resenhaFollowers += gainFollowers;
      state.reputation += 1;
      state.phone.userPosts.unshift({
        id: `user_${Date.now()}`,
        kicker: postObj.kicker,
        emoji: postObj.emoji,
        bg: postObj.bg,
        headline: postObj.headline.toUpperCase(),
        caption: postObj.caption,
        time: "Publicado agora",
        likes: 18 + Math.floor(Math.random() * 25),
        comments: [
          { user: "@only_resenha_", text: "Aprovado pelo conselho PF26🏅 com muito amor e carinho!" },
          { user: "@muzzonline.exe", text: "EU TAVA LÁ EU ERA A ENXADA KKKKKK" },
        ],
      });
      sfx.play("upgrade");
      onlyResenhaTab = "feed";
      showToast("🔥", "@ONLY_RESENHA_", `Inverdade viralizou! +${gainFollowers} seguidores e +1 ⭐ Reputação!`);
      updateHUD();
      saveGame();
      renderPhoneApp();
    };

    const customBtn = document.getElementById("orPublishCustomBtn");
    const customInput = document.getElementById("orCustomInput");
    if (customBtn && customInput) {
      customBtn.addEventListener("click", () => {
        const txt = customInput.value.trim();
        if (txt.length < 6) {
          sfx.play("error");
          showToast("✍️", "MANCHETE CURTA", "Escreva pelo menos 6 letras para fabricar uma boa inverdade!");
          return;
        }
        publishFakeNews({
          kicker: "🔥 EXPOSIÇÃO DO MACHO • PF26🏅",
          emoji: "📰🤡",
          bg: "linear-gradient(135deg, #be123c, #4f46e5)",
          headline: txt,
          caption: `Furo enviado por ${state.activeTitle} Alyffer direto de Pau Arcado! Checagem: inventada na hora com muito amor e carinho 🇧🇷`,
        });
      });
    }

    phoneBody.querySelectorAll(".or-template-btn").forEach((b) => {
      b.addEventListener("click", () => {
        const tpl = templates[Number(b.dataset.tpl)];
        if (tpl) publishFakeNews(tpl);
      });
    });
  } else {
    phoneBody.innerHTML =
      profileHtml +
      feedPosts
        .map((p) => {
          const liked = state.phone.likedIds.includes(p.id);
          const displayLikes = p.likes + (liked ? 1 : 0);
          return `
          <article class="or-post">
            <div class="or-post-head">
              <strong>🔥 alfinetation (@only_resenha_)</strong>
              <span style="color:#94a3b8">${escapeHtml(p.time)}</span>
            </div>
            <div class="or-post-poster" style="background:${p.bg}">
              <div class="or-poster-kicker">${escapeHtml(p.kicker)}</div>
              <div class="or-poster-emoji">${p.emoji}</div>
              <div class="or-poster-headline">${escapeHtml(p.headline)}</div>
              <div class="or-poster-watermark">alfinetation • @only_resenha_ • Ganhou PF26🏅</div>
            </div>
            <div class="or-post-body">
              <div class="or-post-caption">${escapeHtml(p.caption)}</div>
              <div class="or-post-actions">
                <button class="or-act-btn ${liked ? "liked" : ""}" data-like="${escapeHtml(p.id)}" type="button">
                  ${liked ? "❤️ Curtiu" : "🤍 Curtir"} (${displayLikes})
                </button>
                <button class="or-act-btn" data-laugh="${escapeHtml(p.id)}" type="button">
                  😂 Rir da Resenha
                </button>
              </div>
              <div class="or-comments">
                ${p.comments
                  .map((c) => `<div class="or-comment"><strong>${escapeHtml(c.user)}:</strong> ${escapeHtml(c.text)}</div>`)
                  .join("")}
              </div>
            </div>
          </article>
        `;
        })
        .join("");

    phoneBody.querySelectorAll("[data-like]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.like;
        const idx = state.phone.likedIds.indexOf(id);
        if (idx >= 0) {
          state.phone.likedIds.splice(idx, 1);
        } else {
          state.phone.likedIds.push(id);
          sfx.play("phone_tap");
        }
        saveGame();
        renderPhoneApp();
      });
    });

    phoneBody.querySelectorAll("[data-laugh]").forEach((btn) => {
      btn.addEventListener("click", () => {
        sfx.play("chuckle");
        showToast("😂", "ONLY-RESENHA", "Propagando a desinformação em Pau Arcado com muito amor e carinho 🇧🇷");
      });
    });
  }

  phoneBody.querySelectorAll(".or-tab-btn").forEach((tab) => {
    tab.addEventListener("click", () => {
      sfx.play("phone_tap");
      onlyResenhaTab = tab.dataset.tab;
      renderPhoneApp();
    });
  });
}

function renderZapApp() {
  if (phoneBackBtn) phoneBackBtn.classList.remove("hidden");
  const chats = getDynamicZapChats();

  if (!activeZapChatId) {
    phoneAppTitle.textContent = "Zap da Roça & ETECAMP";
    phoneBody.innerHTML = chats
      .map(
        (c) => `
      <button class="zap-chat-item" data-chat="${c.id}" type="button">
        <div class="zap-chat-avatar">${c.avatar}</div>
        <div style="flex:1;min-width:0">
          <div class="row-title">${escapeHtml(c.name)}</div>
          <div class="row-sub" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(c.preview)}</div>
        </div>
        <span style="color:#4ade80;font-size:0.8rem">▶</span>
      </button>
    `
      )
      .join("");
    phoneBody.querySelectorAll("[data-chat]").forEach((b) => {
      b.addEventListener("click", () => {
        sfx.play("phone_tap");
        activeZapChatId = b.dataset.chat;
        renderPhoneApp();
      });
    });
    return;
  }

  const chat = chats.find((c) => c.id === activeZapChatId) || chats[0];
  phoneAppTitle.textContent = `${chat.avatar} ${chat.name}`;
  phoneBody.innerHTML = `
    <div class="row-sub" style="text-align:center;margin-bottom:8px">${escapeHtml(chat.status)}</div>
    <div class="zap-messages">
      ${chat.messages
        .map(
          (m) => `
        <div class="zap-bubble ${m.me ? "me" : ""}">
          ${m.me ? "" : `<div class="zap-sender">${escapeHtml(m.sender)}</div>`}
          <div>${escapeHtml(m.text)}</div>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="zap-quick-replies">
      ${chat.replies
        .map(
          (r, idx) => `
        <button class="or-template-btn" data-reply="${idx}" type="button">💬 Responder: "${escapeHtml(r.text)}"</button>
      `
        )
        .join("")}
    </div>
  `;

  phoneBody.querySelectorAll("[data-reply]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const r = chat.replies[Number(btn.dataset.reply)];
      if (!r) return;
      if (!state.phone.zapReplies[chat.id]) state.phone.zapReplies[chat.id] = [];
      state.phone.zapReplies[chat.id].push({ sender: "Você", text: r.text, me: true });
      state.phone.zapReplies[chat.id].push({ sender: r.bot, text: r.reply, me: false });
      if (state.phone.zapReplies[chat.id].length > 8) {
        state.phone.zapReplies[chat.id] = state.phone.zapReplies[chat.id].slice(-8);
      }
      sfx.play("phone_notif");
      saveGame();
      renderPhoneApp();
      phoneBody.scrollTop = phoneBody.scrollHeight;
    });
  });
}

function renderInstaApp() {
  phoneAppTitle.textContent = "InstaRoça • Campo Limpo Paulista";
  if (phoneBackBtn) phoneBackBtn.classList.remove("hidden");

  const stories = [
    { icon: "🔥", label: "@only_resenha_" },
    { icon: "🌾", label: "@macho" },
    { icon: "🕶️", label: "@muzzonline" },
    { icon: "🧪", label: "@kaio.lab" },
    { icon: "😋", label: "@felix.pac" },
    { icon: "🍟", label: "@pao.etec" },
    { icon: "🛡️", label: "@marcelo" },
    { icon: "🐶", label: "@orelha" },
  ];
  const feed = getInstaFeedPosts();
  const canPostPhoto = !state.phone.postedInstaToday;

  phoneBody.innerHTML = `
    <div class="insta-stories">
      ${stories
        .map(
          (s) => `
        <div class="insta-story">
          <div class="insta-story-ring"><div class="insta-story-core">${s.icon}</div></div>
          <span>${s.label}</span>
        </div>
      `
        )
        .join("")}
    </div>

    <button id="postInstaPhotoBtn" class="mini-btn green" style="width:100%;margin-bottom:10px" type="button" ${canPostPhoto ? "" : "disabled"}>
      ${canPostPhoto ? "📸 Postar Foto do Momento (+1 ⭐ Reputação)" : "📸 Foto de hoje já postada ✓"}
    </button>

    ${feed
      .map((p) => {
        const liked = !!state.phone.instaLikes[p.id];
        const likes = (p.baseLikes || 12) + (liked ? 1 : 0);
        return `
        <article class="or-post">
          <div class="or-post-head">
            <strong>${escapeHtml(p.user)}</strong>
            <span style="color:#94a3b8">${escapeHtml(p.badge)}</span>
          </div>
          <div class="or-post-poster" style="background:${p.bg}">
            <div class="or-poster-emoji">${p.emoji}</div>
            <div class="or-poster-headline">${escapeHtml(p.title)}</div>
          </div>
          <div class="or-post-body">
            <div class="or-post-caption">${escapeHtml(p.caption)}</div>
            <button class="or-act-btn ${liked ? "liked" : ""}" data-ilike="${escapeHtml(p.id)}" type="button">
              ${liked ? "❤️" : "🤍"} ${likes} curtidas
            </button>
          </div>
        </article>
      `;
      })
      .join("")}
  `;

  const postBtn = document.getElementById("postInstaPhotoBtn");
  if (postBtn) {
    postBtn.addEventListener("click", () => {
      if (state.phone.postedInstaToday) return;
      state.phone.postedInstaToday = true;
      state.reputation += 1;
      const locText = LOCATION_LABELS[state.location] || "Pau Arcado";
      const emoji = state.hasTamedJaguar ? "🐆🥬" : state.animals.length > 0 ? "🐄🐖" : "🥬🚜";
      state.phone.userInstaPosts.unshift({
        id: `uinsta_${Date.now()}`,
        user: "@macho.pauarcado",
        badge: locText,
        emoji,
        bg: "linear-gradient(135deg, #16a34a, #0284c7)",
        title: `Selfie do ${state.activeTitle} em ${locText}`,
        caption: `Colhendo alface e fechando a resenha com ${getTotalBasketCount()} item(ns) na cesta! 🔥 #PauArcado #ETECAMP`,
        baseLikes: 35 + Math.floor(Math.random() * 40),
      });
      sfx.play("upgrade");
      showToast("📸", "POSTADO NO INSTAROÇA!", "A galera da ETECAMP curtiu! (+1 ⭐ Reputação)");
      updateHUD();
      saveGame();
      renderPhoneApp();
    });
  }

  phoneBody.querySelectorAll("[data-ilike]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.ilike;
      state.phone.instaLikes[id] = !state.phone.instaLikes[id];
      sfx.play("phone_tap");
      saveGame();
      renderPhoneApp();
    });
  });
}

function renderMiniGameApp() {
  phoneAppTitle.textContent = "🥬 Pega-Alface • Arcade";
  if (phoneBackBtn) phoneBackBtn.classList.remove("hidden");

  phoneBody.innerHTML = `
    <div class="row-sub" style="margin-bottom:8px;text-align:center;color:#bae6fd">
      🍲 O Menino Maluquinho perguntou: <strong>"Tem joguinho no celular?"</strong> Tem sim! Pegue 🥬/✨ e desvie de 💣/🐆!
    </div>
    <div class="mini-hud-row">
      <span id="miniScoreLabel">Pontos: 0</span>
      <span id="miniTimeLabel">Tempo: 15s</span>
      <span>Recorde: ${state.phone.gameHighScore}</span>
    </div>
    <div id="miniStage" class="mini-arcade-stage">
      <div id="miniBasket" class="mini-basket" style="left:50%">🧺</div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:8px">
      <button id="miniLeftBtn" class="mini-btn" style="flex:1" type="button">◀ Esquerda</button>
      <button id="miniRightBtn" class="mini-btn" style="flex:1" type="button">Direita ▶</button>
    </div>
    <button id="miniStartBtn" class="mini-btn green" style="width:100%" type="button">▶️ Jogar Rodada (15s)</button>
  `;

  const stage = document.getElementById("miniStage");
  const basket = document.getElementById("miniBasket");
  const scoreEl = document.getElementById("miniScoreLabel");
  const timeEl = document.getElementById("miniTimeLabel");
  const startMiniBtn = document.getElementById("miniStartBtn");
  const leftBtn = document.getElementById("miniLeftBtn");
  const rightBtn = document.getElementById("miniRightBtn");

  let basketX = 50;
  const setBasket = (nx) => {
    basketX = Math.max(10, Math.min(90, nx));
    if (basket) basket.style.left = `${basketX}%`;
  };

  if (stage) {
    stage.addEventListener("pointermove", (e) => {
      if (!miniArcadeTimer) return;
      const rect = stage.getBoundingClientRect();
      setBasket(((e.clientX - rect.left) / rect.width) * 100);
    });
    stage.addEventListener("pointerdown", (e) => {
      const rect = stage.getBoundingClientRect();
      setBasket(((e.clientX - rect.left) / rect.width) * 100);
    });
  }
  if (leftBtn) leftBtn.addEventListener("click", () => setBasket(basketX - 12));
  if (rightBtn) rightBtn.addEventListener("click", () => setBasket(basketX + 12));

  if (startMiniBtn) {
    startMiniBtn.addEventListener("click", () => {
      stopMiniArcade();
      startMiniBtn.disabled = true;
      let score = 0;
      let timeLeft = 15;
      let drops = [];
      let spawnTick = 0;

      const clearDrops = () => {
        drops.forEach((d) => d.el.remove());
        drops = [];
      };

      miniArcadeTimer = setInterval(() => {
        if (!document.getElementById("miniStage")) {
          stopMiniArcade();
          return;
        }
        timeLeft -= 0.05;
        spawnTick += 0.05;
        if (spawnTick >= 0.42) {
          spawnTick = 0;
          const r = Math.random();
          const item =
            r < 0.14
              ? { icon: "✨", pts: 3, speed: 3.1 }
              : r < 0.78
                ? { icon: "🥬", pts: 1, speed: 2.3 }
                : { icon: "💣", pts: -3, speed: 2.8 };
          const el = document.createElement("div");
          el.className = "mini-drop";
          el.textContent = item.icon;
          const x = 10 + Math.random() * 80;
          el.style.left = `${x}%`;
          el.style.top = "0%";
          stage.appendChild(el);
          drops.push({ el, x, y: 0, ...item });
        }

        for (let i = drops.length - 1; i >= 0; i--) {
          const d = drops[i];
          d.y += d.speed;
          d.el.style.top = `${d.y}%`;
          if (d.y >= 83 && d.y <= 96 && Math.abs(d.x - basketX) < 13) {
            score = Math.max(0, score + d.pts);
            sfx.play(d.pts > 0 ? "harvest" : "error");
            d.el.remove();
            drops.splice(i, 1);
          } else if (d.y > 102) {
            d.el.remove();
            drops.splice(i, 1);
          }
        }

        if (scoreEl) scoreEl.textContent = `Pontos: ${score}`;
        if (timeEl) timeEl.textContent = `Tempo: ${Math.max(0, Math.ceil(timeLeft))}s`;

        if (timeLeft <= 0) {
          stopMiniArcade();
          clearDrops();
          const newRecord = score > state.phone.gameHighScore;
          if (newRecord) state.phone.gameHighScore = score;
          if (score >= 8) {
            state.money += 6;
            sfx.play("sell");
            showToast("🎮", "CAMPEÃO DO PEGA-ALFACE!", `${score} pontos! Ganhou +R$ 6,00 na resenha!`);
          } else {
            sfx.play("phone_notif");
            showToast("🎮", "FIM DE JOGO!", `Fez ${score} pontos! Faça 8+ para ganhar R$ 6,00!`);
          }
          updateHUD();
          saveGame();
          renderPhoneApp();
        }
      }, 50);
    });
  }
}

function renderPhoneApp() {
  if (!phoneBody) return;
  updatePhoneStatusBar();
  stopMiniArcade();
  if (phoneCurrentApp === "only_resenha") renderOnlyResenhaApp();
  else if (phoneCurrentApp === "zap") renderZapApp();
  else if (phoneCurrentApp === "insta") renderInstaApp();
  else if (phoneCurrentApp === "minigame") renderMiniGameApp();
  else renderPhoneHome();
}

