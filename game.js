/* Simulador do Macho 3D — Horta no Quintal do Alyffer (Pau Arcado & Campo Limpo Paulista) */

const container = document.getElementById("gameContainer");

// UI Elements
const hud = document.getElementById("hud");
const startScreen = document.getElementById("startScreen");
const pauseScreen = document.getElementById("pauseScreen");
const sellModal = document.getElementById("sellModal");
const shopModal = document.getElementById("shopModal");
const npcModal = document.getElementById("npcModal");
const guideModal = document.getElementById("guideModal");
const calendarModal = document.getElementById("calendarModal");
const dayBanner = document.getElementById("dayBanner");
const dayBannerText = document.getElementById("dayBannerText");

const farmerTagPill = document.getElementById("farmerTagPill");
const titleBadge = document.getElementById("titleBadge");
const moneyVal = document.getElementById("moneyVal");
const calendarPill = document.getElementById("calendarPill");
const dayTimeVal = document.getElementById("dayTimeVal");
const locationVal = document.getElementById("locationVal");
const basketVal = document.getElementById("basketVal");
const aduboVal = document.getElementById("aduboVal");
const waterLabel = document.getElementById("waterLabel");
const waterBar = document.getElementById("waterBar");
const waterText = document.getElementById("waterText");
const insanityPill = document.getElementById("insanityPill");
const insanityLabel = document.getElementById("insanityLabel");
const insanityBar = document.getElementById("insanityBar");
const insanityText = document.getElementById("insanityText");
const buffBadge = document.getElementById("buffBadge");
const buffText = document.getElementById("buffText");
const hpPill = document.getElementById("hpPill");
const hpBar = document.getElementById("hpBar");
const hpText = document.getElementById("hpText");
const toolModeBtn = document.getElementById("toolModeBtn");
const toolModeIcon = document.getElementById("toolModeIcon");
const toolModeLabel = document.getElementById("toolModeLabel");
const jaguarHudBar = document.getElementById("jaguarHudBar");
const jaguarHpText = document.getElementById("jaguarHpText");
const jaguarHpFill = document.getElementById("jaguarHpFill");
const tamedJagPill = document.getElementById("tamedJagPill");
const tamedJagLabel = document.getElementById("tamedJagLabel");
const tamedJagBar = document.getElementById("tamedJagBar");
const tamedJagText = document.getElementById("tamedJagText");
const maluquinhoBubble = document.getElementById("maluquinhoBubble");
const maluquinhoBubbleText = document.getElementById("maluquinhoBubbleText");
const kickDogBtn = document.getElementById("kickDogBtn");
const sleepOverlay = document.getElementById("sleepOverlay");
const sleepTitle = document.getElementById("sleepTitle");
const sleepSub = document.getElementById("sleepSub");
const sleepProgressFill = document.getElementById("sleepProgressFill");
const deathModal = document.getElementById("deathModal");
const deathIcon = document.getElementById("deathIcon");
const deathTitle = document.getElementById("deathTitle");
const deathMsg = document.getElementById("deathMsg");
const respawnBtn = document.getElementById("respawnBtn");

const fpCrosshair = document.getElementById("fpCrosshair");
const crazyVignette = document.getElementById("crazyVignette");
const camModeBtn = document.getElementById("camModeBtn");
const camModeLabel = document.getElementById("camModeLabel");
const calendarHudBtn = document.getElementById("calendarHudBtn");
const closeCalendarBtn = document.getElementById("closeCalendarBtn");
const calendarMonthTitle = document.getElementById("calendarMonthTitle");
const calendarSummaryLine = document.getElementById("calendarSummaryLine");
const calendarGrid = document.getElementById("calendarGrid");
const busScheduleTitle = document.getElementById("busScheduleTitle");
const busStatusBanner = document.getElementById("busStatusBanner");
const busTimesPauArcado = document.getElementById("busTimesPauArcado");
const busTimesTerminal = document.getElementById("busTimesTerminal");

const contextPrompt = document.getElementById("contextPrompt");
const contextKey = document.getElementById("contextKey");
const contextText = document.getElementById("contextText");

const toastBox = document.getElementById("toastBox");
const toastIcon = document.getElementById("toastIcon");
const toastTitle = document.getElementById("toastTitle");
const toastText = document.getElementById("toastText");
const coringaBubble = document.getElementById("coringaBubble");
const coringaBubbleText = document.getElementById("coringaBubbleText");

const startBtn = document.getElementById("startBtn");
const resetSaveBtn = document.getElementById("resetSaveBtn");
const saveInfoLine = document.getElementById("saveInfoLine");
const resumeBtn = document.getElementById("resumeBtn");
const sleepPauseBtn = document.getElementById("sleepPauseBtn");
const restartPauseBtn = document.getElementById("restartPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const pauseBtn = document.getElementById("pauseBtn");
const guideHudBtn = document.getElementById("guideHudBtn");
const ordersHudBtn = document.getElementById("ordersHudBtn");
const shopHudBtn = document.getElementById("shopHudBtn");

const closeSellBtn = document.getElementById("closeSellBtn");
const sellModeNotice = document.getElementById("sellModeNotice");
const sellActionArea = document.getElementById("sellActionArea");
const sellInventoryList = document.getElementById("sellInventoryList");
const sellAllBtn = document.getElementById("sellAllBtn");
const ordersList = document.getElementById("ordersList");

const closeNpcBtn = document.getElementById("closeNpcBtn");
const npcTag = document.getElementById("npcTag");
const npcName = document.getElementById("npcName");
const npcAppearance = document.getElementById("npcAppearance");
const npcDialogue = document.getElementById("npcDialogue");
const npcMissionBox = document.getElementById("npcMissionBox");
const npcMissionTitle = document.getElementById("npcMissionTitle");
const npcMissionReq = document.getElementById("npcMissionReq");
const npcMissionReward = document.getElementById("npcMissionReward");
const kaioShopBox = document.getElementById("kaioShopBox");
const npcActionBtn = document.getElementById("npcActionBtn");

const closeShopBtn = document.getElementById("closeShopBtn");
const shopMoneyVal = document.getElementById("shopMoneyVal");
const shopItemsList = document.getElementById("shopItemsList");

const closeGuideBtn = document.getElementById("closeGuideBtn");
const titlesList = document.getElementById("titlesList");
const guideQuestsList = document.getElementById("guideQuestsList");

const vaselinaHudBtn = document.getElementById("vaselinaHudBtn");
const vaselinaHudLabel = document.getElementById("vaselinaHudLabel");
const phoneHudBtn = document.getElementById("phoneHudBtn");
const phoneNotifDot = document.getElementById("phoneNotifDot");
const phoneModal = document.getElementById("phoneModal");
const phoneTimeBar = document.getElementById("phoneTimeBar");
const phoneSignalBar = document.getElementById("phoneSignalBar");
const phoneBatteryBar = document.getElementById("phoneBatteryBar");
const phoneAppTitle = document.getElementById("phoneAppTitle");
const phoneBody = document.getElementById("phoneBody");
const phoneBackBtn = document.getElementById("phoneBackBtn");
const closePhoneBtn = document.getElementById("closePhoneBtn");
const phoneNavBack = document.getElementById("phoneNavBack");
const phoneNavHome = document.getElementById("phoneNavHome");
const phoneNavClose = document.getElementById("phoneNavClose");
const floatingFeedbackLayer = document.getElementById("floatingFeedbackLayer");
const cookModal = document.getElementById("cookModal");
const closeCookBtn = document.getElementById("closeCookBtn");
const cookRecipesList = document.getElementById("cookRecipesList");
const lambiPill = document.getElementById("lambiPill");
const lambiText = document.getElementById("lambiText");
const inventoryHudBtn = document.getElementById("inventoryHudBtn");
const inventoryModal = document.getElementById("inventoryModal");
const closeInventoryBtn = document.getElementById("closeInventoryBtn");
const invMoneyVal = document.getElementById("invMoneyVal");
const invBasketWorthVal = document.getElementById("invBasketWorthVal");
const inventoryList = document.getElementById("inventoryList");
const stationShopModal = document.getElementById("stationShopModal");
const closeStationShopBtn = document.getElementById("closeStationShopBtn");
const stationShopMoneyVal = document.getElementById("stationShopMoneyVal");
const stationShopItemsList = document.getElementById("stationShopItemsList");

// Crop & Product Definitions (Alface principalmente + produtos do quintal — tempo maior para valorizar o Adubo do Kaio!)
const CROPS = {
  alface_crespa: {
    id: "alface_crespa",
    name: "Alface Crespa",
    emoji: "🥬",
    seedCost: 5,
    basePrice: 16,
    growTime: 42,
    color: 0x4ade80,
    leafColor: 0x22c55e,
    style: "lettuce_curly",
    plantable: true,
  },
  alface_americana: {
    id: "alface_americana",
    name: "Alface Americana",
    emoji: "🥗",
    seedCost: 10,
    basePrice: 30,
    growTime: 58,
    color: 0xa3e635,
    leafColor: 0x84cc16,
    style: "lettuce_round",
    plantable: true,
  },
  alface_roxa: {
    id: "alface_roxa",
    name: "Alface Roxa",
    emoji: "🟣",
    seedCost: 18,
    basePrice: 52,
    growTime: 75,
    color: 0xa855f7,
    leafColor: 0x7e22ce,
    style: "lettuce_purple",
    plantable: true,
  },
  tomate: {
    id: "tomate",
    name: "Tomate Cereja",
    emoji: "🍅",
    seedCost: 24,
    basePrice: 68,
    growTime: 85,
    color: 0xef4444,
    leafColor: 0x16a34a,
    style: "tomato",
    plantable: true,
  },
  cenoura: {
    id: "cenoura",
    name: "Cenoura",
    emoji: "🥕",
    seedCost: 16,
    basePrice: 42,
    growTime: 60,
    color: 0xf97316,
    leafColor: 0x15803d,
    style: "carrot",
    plantable: true,
  },
  morango: {
    id: "morango",
    name: "Morango",
    emoji: "🍓",
    seedCost: 32,
    basePrice: 92,
    growTime: 100,
    color: 0xf43f5e,
    leafColor: 0x15803d,
    style: "strawberry",
    plantable: true,
  },
  alface_guloso: {
    id: "alface_guloso",
    name: "Alface Guloso",
    emoji: "😋",
    seedCost: 65,
    basePrice: 185,
    growTime: 88,
    color: 0x10b981,
    leafColor: 0x047857,
    style: "lettuce_guloso",
    plantable: true,
  },
  alface_dourado: {
    id: "alface_dourado",
    name: "Alface Dourado",
    emoji: "✨",
    seedCost: 110,
    basePrice: 310,
    growTime: 115,
    color: 0xfef08a,
    leafColor: 0xeab308,
    style: "lettuce_gold",
    plantable: true,
  },
  milho: {
    id: "milho",
    name: "Milho",
    emoji: "🌽",
    seedCost: 14,
    basePrice: 38,
    growTime: 56,
    color: 0xfacc15,
    leafColor: 0x22c55e,
    style: "corn",
    plantable: true,
  },
  trigo: {
    id: "trigo",
    name: "Trigo",
    emoji: "🌾",
    seedCost: 18,
    basePrice: 48,
    growTime: 62,
    color: 0xf59e0b,
    leafColor: 0x84cc16,
    style: "wheat",
    plantable: true,
  },
  ovo_caipira: {
    id: "ovo_caipira",
    name: "Ovo Caipira",
    emoji: "🥚",
    seedCost: 0,
    basePrice: 24,
    growTime: 0,
    color: 0xfef3c7,
    leafColor: 0xfde68a,
    style: "egg",
    plantable: false,
  },
  leite_fresco: {
    id: "leite_fresco",
    name: "Leite Fresco (Balde)",
    emoji: "🥛",
    seedCost: 0,
    basePrice: 95,
    growTime: 0,
    color: 0xf8fafc,
    leafColor: 0xe2e8f0,
    style: "animal",
    plantable: false,
  },
  la_ovelha: {
    id: "la_ovelha",
    name: "Lã de Ovelha",
    emoji: "🧶",
    seedCost: 0,
    basePrice: 72,
    growTime: 0,
    color: 0xf1f5f9,
    leafColor: 0xcbd5e1,
    style: "animal",
    plantable: false,
  },
  trufa_porco: {
    id: "trufa_porco",
    name: "Trufa da Roça",
    emoji: "🍄",
    seedCost: 0,
    basePrice: 115,
    growTime: 0,
    color: 0xa16207,
    leafColor: 0x713f12,
    style: "animal",
    plantable: false,
  },
  salada_macho: {
    id: "salada_macho",
    name: "Salada Gourmet do Macho",
    emoji: "🥗",
    seedCost: 0,
    basePrice: 140,
    growTime: 0,
    color: 0x4ade80,
    leafColor: 0x16a34a,
    style: "dish",
    plantable: false,
  },
  omelete_caipira: {
    id: "omelete_caipira",
    name: "Omelete Caipira",
    emoji: "🍳",
    seedCost: 0,
    basePrice: 120,
    growTime: 0,
    color: 0xfacc15,
    leafColor: 0xeab308,
    style: "dish",
    plantable: false,
  },
  vitamina_morango: {
    id: "vitamina_morango",
    name: "Vitamina de Morango",
    emoji: "🥤",
    seedCost: 0,
    basePrice: 220,
    growTime: 0,
    color: 0xf43f5e,
    leafColor: 0xfb7185,
    style: "dish",
    plantable: false,
  },
  risoto_trufa: {
    id: "risoto_trufa",
    name: "Risoto Fino de Trufa",
    emoji: "🍲",
    seedCost: 0,
    basePrice: 320,
    growTime: 0,
    color: 0xa855f7,
    leafColor: 0x7e22ce,
    style: "dish",
    plantable: false,
  },
};

const KITCHEN_RECIPES = [
  {
    id: "salada_macho",
    emoji: "🥗",
    name: "Salada Gourmet do Macho",
    req: { alface_crespa: 2, tomate: 1 },
    reqLabel: "2x Alface Crespa 🥬 + 1x Tomate 🍅",
    eatEffect: { hp: 100, energy: 70, insanityDelta: 0, msg: "Vida cheia + 70s de Energia!" },
  },
  {
    id: "omelete_caipira",
    emoji: "🍳",
    name: "Omelete Caipira de Pau Arcado",
    req: { ovo_caipira: 2, alface_americana: 1 },
    reqLabel: "2x Ovo Caipira 🥚 + 1x Alface Americana 🥗",
    eatEffect: { hp: 100, energy: 85, insanityDelta: -5, msg: "Vida cheia + 85s de Energia + -5% Insanidade!" },
  },
  {
    id: "vitamina_morango",
    emoji: "🥤",
    name: "Vitamina de Morango c/ Leite",
    req: { morango: 1, leite_fresco: 1 },
    reqLabel: "1x Morango 🍓 + 1x Leite Fresco 🥛",
    eatEffect: { hp: 100, energy: 105, insanityDelta: -15, msg: "+105s de Energia + -15% Insanidade!" },
  },
  {
    id: "risoto_trufa",
    emoji: "🍲",
    name: "Risoto Fino de Trufa & Alface Roxa",
    req: { alface_roxa: 1, trufa_porco: 1, leite_fresco: 1 },
    reqLabel: "1x Alface Roxa 🟣 + 1x Trufa 🍄 + 1x Leite 🥛",
    eatEffect: { hp: 100, energy: 140, insanityDelta: -25, msg: "+140s Mega Energia + -25% Insanidade!" },
  },
];

const SEED_KEYS = [
  "alface_crespa",
  "alface_americana",
  "alface_roxa",
  "tomate",
  "cenoura",
  "morango",
  "alface_guloso",
  "alface_dourado",
  "milho",
  "trigo",
];
const CROP_KEYS = Object.keys(CROPS);

const STATION_TOOLS = {
  balde: {
    id: "balde",
    name: "Balde Vazio",
    emoji: "🪣",
    cost: 35,
    stackable: true,
    desc: "Necessário para tirar leite das vacas e vender o balde de leite no Terminal CLP!",
  },
  tesoura: {
    id: "tesoura",
    name: "Tesoura de Tosa",
    emoji: "✂️",
    cost: 260,
    stackable: false,
    desc: "Ferramenta permanente para cortar lã das ovelhas (elas ficam tosquiadas!).",
  },
};

// Catálogo de Enxadas Especiais (disponível na Loja da Estação CLP!)
const HOES = {
  comum: {
    id: "comum",
    name: "Enxada Comum",
    shortName: "Enxada",
    emoji: "⛏️",
    cost: 0,
    damage: 25,
    knockback: 2.8,
    bladeColor: 0x94a3b8,
    emissive: 0x000000,
    emissiveIntensity: 0,
    effectDesc: "25 de dano na Onça • Ara 1 canteiro",
  },
  fogo: {
    id: "fogo",
    name: "Enxada de Fogo",
    shortName: "Enxada Fogo",
    emoji: "🔥",
    cost: 320,
    damage: 40,
    knockback: 3.1,
    burnDamage: 18,
    bladeColor: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 0.75,
    effectDesc: "40 dano + Queimadura na Onça (+18 dano) • Ara 1 vizinho grátis!",
  },
  gelo: {
    id: "gelo",
    name: "Enxada de Gelo",
    shortName: "Enxada Gelo",
    emoji: "❄️",
    cost: 480,
    damage: 35,
    knockback: 3.0,
    slowDuration: 4.5,
    bladeColor: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.7,
    effectDesc: "35 dano + Congela/desacelera Onça em 60% • Canteiro já nasce úmido!",
  },
  relampago: {
    id: "relampago",
    name: "Enxada Relâmpago",
    shortName: "Enxada Raio",
    emoji: "⚡",
    cost: 750,
    damage: 55,
    knockback: 4.8,
    speedBoost: 1.22,
    bladeColor: 0xfacc15,
    emissive: 0xeab308,
    emissiveIntensity: 0.85,
    effectDesc: "55 dano + Empurrão duplo • +22% velocidade andando enquanto segura!",
  },
  diamante: {
    id: "diamante",
    name: "Enxada de Diamante",
    shortName: "Enxada Diam.",
    emoji: "💎",
    cost: 1400,
    damage: 75,
    knockback: 4.2,
    aoeTill: true,
    doubleBonus: 0.25,
    bladeColor: 0x67e8f9,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.9,
    effectDesc: "75 dano (derruba Onça em 2 golpes!) • Ara em área 3x3 + +25% colheita dupla!",
  },
};
const HOE_KEYS = Object.keys(HOES);

// Catálogo de Animais da Fazenda (Vacas, Ovelhas, Porcos)
const ANIMAL_TYPES = {
  cow: {
    type: "cow",
    label: "Vaca Leiteira",
    emoji: "🐄",
    cost: 520,
    maxHp: 100,
    productId: "leite_fresco",
    breedCrop: "trigo",
    actionText: "Tirar Leite (c/ Balde) 🥛",
    names: ["Mimosa", "Estrela", "Malhada", "Pintada", "Bela", "Aurora"],
  },
  sheep: {
    type: "sheep",
    label: "Ovelha",
    emoji: "🐑",
    cost: 420,
    maxHp: 75,
    productId: "la_ovelha",
    breedCrop: "trigo",
    actionText: "Cortar Lã (c/ Tesoura) ✂️",
    names: ["Nuvem", "Algodão", "Fofinha", "Neve", "Branca", "Lãzinha"],
  },
  pig: {
    type: "pig",
    label: "Porco Caipira",
    emoji: "🐷",
    cost: 600,
    maxHp: 90,
    productId: "trufa_porco",
    breedCrop: "cenoura",
    actionText: "Recolher Trufa da Roça 🍄",
    names: ["Torresmo", "Bacon", "Pipo", "Roncador", "Gorducho", "Bolinha"],
  },
};
const ALL_TITLES = ["Estudante ETEC", "PAC", "Homem Guloso", "Airfryer", "Macho"];
const STORAGE_KEY = "macho_horta_3d_save_v2";
const WORK_END_MINUTES = 19 * 60; // Depois das 19:00 (7 da noite) não pode mais trabalhar!

// Calendário Rural (Dia 1 = Segunda-feira, 01 de Março, Ano 1)
const WEEKDAYS_FULL = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_INFO = [
  { name: "Março", short: "Mar", days: 31 },
  { name: "Abril", short: "Abr", days: 30 },
  { name: "Maio", short: "Mai", days: 31 },
  { name: "Junho", short: "Jun", days: 30 },
  { name: "Julho", short: "Jul", days: 31 },
  { name: "Agosto", short: "Ago", days: 31 },
  { name: "Setembro", short: "Set", days: 30 },
  { name: "Outubro", short: "Out", days: 31 },
  { name: "Novembro", short: "Nov", days: 30 },
  { name: "Dezembro", short: "Dez", days: 31 },
  { name: "Janeiro", short: "Jan", days: 31 },
  { name: "Fevereiro", short: "Fev", days: 28 },
];

function getCalendarInfo(dayNum) {
  const zeroIdx = Math.max(0, Math.floor(dayNum) - 1);
  // Dia 1 = Segunda (1)
  const dayOfWeek = (1 + zeroIdx) % 7;
  let rem = zeroIdx;
  let monthCursor = 0;
  let year = 1;
  while (rem >= MONTHS_INFO[monthCursor].days) {
    rem -= MONTHS_INFO[monthCursor].days;
    monthCursor++;
    if (monthCursor >= MONTHS_INFO.length) {
      monthCursor = 0;
      year++;
    }
  }
  const month = MONTHS_INFO[monthCursor];
  const dayOfMonth = rem + 1;
  const firstDayOfMonthWeek = (dayOfWeek - (dayOfMonth - 1) % 7 + 7) % 7;
  const scheduleType = dayOfWeek === 0 ? "sunday" : dayOfWeek === 6 ? "saturday" : "weekday";
  const scheduleLabel =
    scheduleType === "weekday" ? "Dias Úteis" : scheduleType === "saturday" ? "Sábados" : "Domingos e Feriados";

  return {
    dayNum,
    dayOfWeek,
    weekdayFull: WEEKDAYS_FULL[dayOfWeek],
    weekdayShort: WEEKDAYS_SHORT[dayOfWeek],
    dayOfMonth,
    monthName: month.name,
    monthShort: month.short,
    daysInMonth: month.days,
    firstDayOfMonthWeek,
    year,
    scheduleType,
    scheduleLabel,
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
  };
}

// Horários Oficiais Linha 402 (Pau Arcado ↔ Terminal Central) — Fonte: JundMob
const BUS_402_RAW = {
  weekday: {
    terminal: [
      "03:50", "05:00", "05:30", "06:20", "07:00", "07:40", "08:20", "09:50",
      "10:40", "12:00", "12:50", "14:00", "15:30", "17:00", "18:40", "20:05",
      "21:30", "22:50", "00:00",
    ],
    pauArcado: [
      "04:20", "05:40", "06:10", "07:00", "07:40", "08:20", "09:00", "10:30",
      "11:20", "12:40", "13:25", "14:40", "16:10", "17:45", "19:20", "20:45",
      "22:10", "23:30",
    ],
  },
  saturday: {
    terminal: [
      "03:50", "05:00", "06:10", "07:20", "08:30", "10:35", "11:45", "13:10",
      "14:25", "15:40", "16:50", "18:00", "20:10", "22:25", "00:00",
    ],
    pauArcado: [
      "04:30", "05:40", "06:50", "08:00", "09:10", "11:15", "12:30", "13:55",
      "15:10", "16:20", "17:30", "18:40", "20:50", "23:05",
    ],
  },
  sunday: {
    terminal: [
      "03:50", "05:00", "06:10", "07:20", "08:30", "10:35", "11:45", "13:10",
      "14:25", "15:40", "16:50", "18:00", "20:10", "22:25", "00:00",
    ],
    pauArcado: [
      "04:30", "05:40", "06:50", "08:00", "09:10", "11:15", "12:30", "13:55",
      "15:10", "16:20", "17:30", "18:40", "20:50", "23:05",
    ],
  },
};

function parseHHMM(str) {
  const [h, m] = str.split(":").map(Number);
  return h === 0 && m === 0 ? 24 * 60 : h * 60 + m;
}

function formatHHMM(totalMin) {
  const norm = ((Math.floor(totalMin) % 1440) + 1440) % 1440;
  const hh = String(Math.floor(norm / 60)).padStart(2, "0");
  const mm = String(norm % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Janela de embarque do ônibus no ponto: de -3 min até +17 min do horário programado
const BUS_BOARD_BEFORE = 3;
const BUS_BOARD_AFTER = 17;

function getBus402Status(direction, dayNum = state.day, nowMin = state.dayMinutes) {
  const cal = getCalendarInfo(dayNum);
  const rawList = BUS_402_RAW[cal.scheduleType][direction] || [];
  let activeTime = null;
  let nextTime = null;
  let minsUntilNext = Infinity;

  for (const label of rawList) {
    const dep = parseHHMM(label);
    const isMidnightWrap = dep === 24 * 60 && nowMin <= BUS_BOARD_AFTER;
    if ((nowMin >= dep - BUS_BOARD_BEFORE && nowMin <= dep + BUS_BOARD_AFTER) || isMidnightWrap) {
      activeTime = label;
    }
    if (dep > nowMin && dep - nowMin < minsUntilNext) {
      minsUntilNext = dep - nowMin;
      nextTime = label;
    }
  }

  return {
    cal,
    rawList,
    available: !state.isRainy && activeTime !== null,
    activeTime,
    nextTime,
    minsUntilNext: Number.isFinite(minsUntilNext) ? Math.ceil(minsUntilNext) : null,
  };
}

function isAfterWorkHours() {
  return state.dayMinutes >= WORK_END_MINUTES || state.dayMinutes < 6 * 60;
}

function formatBRL(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

// Web Audio SFX
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play(type) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const playTone = (freqStart, freqEnd, dur, wave = "sine", vol = 0.12, delay = 0) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freqStart, now + delay);
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + delay + dur);
      }
      gain.gain.setValueAtTime(vol, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    };

    if (type === "dig") {
      playTone(150, 70, 0.12, "triangle", 0.16);
    } else if (type === "plant") {
      playTone(320, 520, 0.11, "sine", 0.12);
    } else if (type === "water") {
      playTone(440, 680, 0.1, "sine", 0.09, 0);
      playTone(540, 780, 0.12, "sine", 0.08, 0.06);
    } else if (type === "refill") {
      playTone(330, 580, 0.14, "sine", 0.12, 0);
      playTone(580, 880, 0.16, "sine", 0.12, 0.08);
    } else if (type === "harvest") {
      playTone(523, 784, 0.12, "triangle", 0.14, 0);
      playTone(784, 1046, 0.16, "sine", 0.12, 0.08);
    } else if (type === "sell") {
      playTone(880, 880, 0.08, "sine", 0.12, 0);
      playTone(1174, 1318, 0.18, "triangle", 0.14, 0.07);
    } else if (type === "upgrade") {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        playTone(f, f * 1.02, 0.16, "triangle", 0.12, i * 0.07);
      });
    } else if (type === "sleep") {
      [392, 329.6, 261.6].forEach((f, i) => {
        playTone(f, f, 0.25, "sine", 0.1, i * 0.14);
      });
    } else if (type === "bark") {
      playTone(280, 420, 0.07, "sawtooth", 0.09, 0);
      playTone(310, 450, 0.08, "sawtooth", 0.09, 0.09);
    } else if (type === "coringa") {
      [587.3, 440, 698.5, 523.3, 880, 659.3].forEach((f, i) => {
        playTone(f, f * 1.18, 0.09, "sawtooth", 0.1, i * 0.065);
      });
    } else if (type === "chuckle") {
      [620, 480, 740].forEach((f, i) => {
        playTone(f, f * 1.12, 0.07, "triangle", 0.08, i * 0.055);
      });
    } else if (type === "roar") {
      playTone(170, 62, 0.34, "sawtooth", 0.16, 0);
      playTone(125, 48, 0.38, "square", 0.12, 0.06);
    } else if (type === "hit") {
      playTone(260, 95, 0.11, "sawtooth", 0.16, 0);
      playTone(540, 220, 0.09, "triangle", 0.12, 0.03);
    } else if (type === "death") {
      [340, 280, 210, 120].forEach((f, i) => {
        playTone(f, f * 0.78, 0.24, "sawtooth", 0.14, i * 0.13);
      });
    } else if (type === "maluquinho") {
      [740, 980, 660, 1120].forEach((f, i) => {
        playTone(f, f * 1.15, 0.08, "triangle", 0.1, i * 0.05);
      });
    } else if (type === "phone_tap") {
      playTone(640, 820, 0.055, "sine", 0.08);
    } else if (type === "phone_notif") {
      playTone(880, 1046, 0.07, "sine", 0.09, 0);
      playTone(1174, 1318, 0.09, "sine", 0.09, 0.06);
    } else if (type === "automation") {
      [440, 554.37, 659.25, 880, 1108.7].forEach((f, i) => {
        playTone(f, f * 1.04, 0.09, "square", 0.075, i * 0.055);
      });
    } else if (type === "goal") {
      [587.3, 783.99, 987.77, 1174.66].forEach((f, i) => {
        playTone(f, f * 1.05, 0.18, "triangle", 0.14, i * 0.08);
      });
    } else if (type === "cook") {
      playTone(360, 540, 0.12, "triangle", 0.11, 0);
      playTone(540, 760, 0.15, "sine", 0.12, 0.09);
    } else if (type === "error") {
      playTone(210, 140, 0.15, "sawtooth", 0.08);
    }
  }
}

const sfx = new SoundFX();

// Toast & Day Banner helpers
let toastTimer;
function showToast(icon, title, message) {
  toastIcon.textContent = icon;
  toastTitle.textContent = title;
  toastText.textContent = message;
  toastBox.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBox.classList.add("hidden");
  }, 2600);
}

let bannerTimer;
function showDayBanner(text) {
  dayBannerText.textContent = text;
  dayBanner.classList.remove("hidden");
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => {
    dayBanner.classList.add("hidden");
  }, 2600);
}

const _floatProj = new THREE.Vector3();
function spawnFloatingText(worldPos, text, borderColor = "#4ade80") {
  if (!floatingFeedbackLayer || !camera) return;
  _floatProj.set(worldPos.x, (worldPos.y || 0) + 1.25, worldPos.z);
  _floatProj.project(camera);
  if (_floatProj.z > 1) return;
  const sx = (_floatProj.x * 0.5 + 0.5) * window.innerWidth;
  const sy = (-_floatProj.y * 0.5 + 0.5) * window.innerHeight;
  if (sx < 20 || sx > window.innerWidth - 20 || sy < 40 || sy > window.innerHeight - 40) return;
  const el = document.createElement("div");
  el.className = "float-pop";
  el.style.left = `${sx}px`;
  el.style.top = `${sy}px`;
  el.style.borderColor = borderColor;
  el.textContent = text;
  floatingFeedbackLayer.appendChild(el);
  setTimeout(() => el.remove(), 960);
}

// Three.js Scene & Renderer Setup (with ACES Filmic ToneMapping & sRGB)
const scene = new THREE.Scene();
const skyColor = new THREE.Color(0x87ceeb);
scene.background = skyColor;
scene.fog = new THREE.FogExp2(0x9fd8e8, 0.0055);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 360);

function getResponsiveFov(aspect) {
  return aspect < 1 ? THREE.MathUtils.clamp(55 / Math.pow(Math.max(0.45, aspect), 0.42), 55, 76) : 55;
}

camera.fov = getResponsiveFov(camera.aspect);
camera.updateProjectionMatrix();

function createRenderer() {
  const attempts = [
    { antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true },
    { antialias: false, preserveDrawingBuffer: true },
  ];
  for (const opts of attempts) {
    try {
      const r = new THREE.WebGLRenderer(opts);
      r.setSize(window.innerWidth, window.innerHeight);
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      r.shadowMap.enabled = true;
      r.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.sRGBEncoding) r.outputEncoding = THREE.sRGBEncoding;
      if (THREE.ACESFilmicToneMapping) {
        r.toneMapping = THREE.ACESFilmicToneMapping;
        r.toneMappingExposure = 1.06;
      }
      return r;
    } catch (_) {
      // fallback
    }
  }
  return null;
}

const renderer = createRenderer();
if (!renderer) {
  container.innerHTML =
    '<div style="color:#fff;padding:24px;font-family:sans-serif">Erro ao iniciar WebGL 3D neste navegador.</div>';
  throw new Error("WebGLRenderer unavailable");
}
container.appendChild(renderer.domElement);

function updateCameraProjection() {
  const w = window.innerWidth || 1;
  const h = window.innerHeight || 1;
  const aspect = w / h;
  camera.aspect = aspect;
  camera.fov = getResponsiveFov(aspect);
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(w, h);
}

// Lights
const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x2d4c2b, 0.88);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.25);
sunLight.position.set(28, 44, 24);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 2;
sunLight.shadow.camera.far = 140;
const shadowBound = 38;
sunLight.shadow.camera.left = -shadowBound;
sunLight.shadow.camera.right = shadowBound;
sunLight.shadow.camera.top = shadowBound;
sunLight.shadow.camera.bottom = -shadowBound;
scene.add(sunLight);

const porchLight = new THREE.PointLight(0xffb74d, 0.4, 22);
porchLight.position.set(0, 3.6, -13.5);
scene.add(porchLight);

// Procedural High-Res Textures & Sign Generators
function createWoodSignTexture(line1, line2, bgColor = "#5c3a21", textColor = "#fef3c7") {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 240;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.font = "bold 62px 'Space Grotesk', sans-serif";
  ctx.fillText(line1, 384, 106, 710);

  ctx.fillStyle = "#86efac";
  ctx.font = "600 38px 'Inter', sans-serif";
  ctx.fillText(line2, 384, 180, 710);

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createTileFloorTexture(c1 = "#e2e8f0", c2 = "#cbd5e1", repeat = 16) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillRect(64, 64, 64, 64);
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

function createPacPosterTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 0, 300);
  grad.addColorStop(0, "#0ea5e9");
  grad.addColorStop(1, "#1e3a8a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 300);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let x = 0; x < 256; x += 32) {
    ctx.fillRect(x, 0, 2, 300);
  }

  // Stylized blocky PAC (TazerCraft) portrait
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(48, 175, 160, 75);
  ctx.fillStyle = "#1d4ed8";
  ctx.fillRect(48, 175, 30, 75);
  ctx.fillRect(178, 175, 30, 75);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillRect(110, 185, 7, 36);
  ctx.fillRect(139, 185, 7, 36);

  ctx.fillStyle = "#f1c29b";
  ctx.fillRect(76, 70, 104, 104);
  ctx.fillStyle = "#291d14";
  ctx.fillRect(76, 62, 104, 30);
  ctx.fillRect(76, 86, 16, 22);
  ctx.fillRect(164, 86, 16, 22);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(92, 114, 22, 14);
  ctx.fillRect(142, 114, 22, 14);
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(99, 116, 12, 12);
  ctx.fillRect(145, 116, 12, 12);
  ctx.fillStyle = "#7c2d12";
  ctx.fillRect(108, 148, 40, 8);

  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.fillRect(12, 240, 232, 48);
  ctx.fillStyle = "#38bdf8";
  ctx.textAlign = "center";
  ctx.font = "bold 24px 'Space Grotesk', sans-serif";
  ctx.fillText("PAC • TazerCraft", 128, 265);
  ctx.fillStyle = "#fef08a";
  ctx.font = "600 13px 'Inter', sans-serif";
  ctx.fillText("YouTuber Favorito do Macho", 128, 282);

  const tex = new THREE.CanvasTexture(canvas);
  if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
  return tex;
}

// Scene Groups & Collections
const exteriorGroup = new THREE.Group();
scene.add(exteriorGroup);

const interiorGroup = new THREE.Group();
interiorGroup.visible = false;
scene.add(interiorGroup);

const terminalGroup = new THREE.Group();
terminalGroup.visible = false;
scene.add(terminalGroup);

const etecGroup = new THREE.Group();
etecGroup.visible = false;
scene.add(etecGroup);

const etecInsideGroup = new THREE.Group();
etecInsideGroup.visible = false;
scene.add(etecInsideGroup);

const basementGroup = new THREE.Group();
basementGroup.visible = false;
scene.add(basementGroup);

const rainGroup = new THREE.Group();
rainGroup.visible = false;
scene.add(rainGroup);
const rainDrops = [];

const clouds = [];
const chickens = [];
const fireflies = [];
const obstacles = []; // Yard AABB colliders
const interiorObstacles = []; // House AABB colliders
const basementObstacles = []; // Secret Basement AABB colliders
const terminalObstacles = []; // Terminal + Station AABB colliders
const terminalRoofSlabs = []; // Coberturas do Terminal (sempre visíveis; translúcidas quando câmera sobe acima do teto)
const etecObstacles = []; // ETEC courtyard AABB colliders
const etecInsideObstacles = []; // ETEC large indoor school AABB colliders
const etecNpcs = [];
const basementClones = [];
const classroomFans = [];

let windowMat;
let lanternMat;
let wellWaterMesh;
let bus402YardMesh;
let bus402TermMesh;
let termJaguarMesh;
let secretTrapdoorMesh;
let ceilingFanMesh;
let dogOrelha;
let jaguarEntity;
let tamedJaguarEntity;
let marceloYardEntity;
let maluquinhoEntity;
let westOriginalFenceGroup;
let eastOriginalFenceGroup;
let expansionWestGroup;
let expansionEastGroup;
const livestockGroup = new THREE.Group();
const livestockEntities = [];
let hoeBladeMat;
let fpHoeBladeMat;
let coopEggVisuals = [];
let sprinklerGroup;
const sprinklerHeads = [];
let etecAutoGateMesh = null;
let etecAutoGateCollider = null;
let etecAutoGateLightMat = null;
let etecAutoGateOpen = 0;
let etecAutoRoofGroup = null;
let etecRobotPivot = null;
let etecRobotArm = null;
const etecConveyorBoxes = [];
let etecBall = null;

function addObstacleBox(cx, cz, w, d, targetList = obstacles) {
  targetList.push({
    minX: cx - w / 2,
    maxX: cx + w / 2,
    minZ: cz - d / 2,
    maxZ: cz + d / 2,
  });
}

// Vehicle Builders (Ônibus Rápido Campinas & Trem Linha 7-Rubi)
function createBusModel(lineTitle = "402 PAU ARCADO", subTitle = "Rápido Campinas", bodyColor = 0x1d4ed8) {
  const bus = new THREE.Group();
  const topMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.38 });
  const lowerMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.65, roughness: 0.15 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 });

  const lower = new THREE.Mesh(new THREE.BoxGeometry(2.55, 1.35, 6.6), lowerMat);
  lower.position.y = 1.05;
  lower.castShadow = true;
  bus.add(lower);

  const upper = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.28, 6.55), topMat);
  upper.position.y = 2.35;
  upper.castShadow = true;
  bus.add(upper);

  const windows = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.86, 5.5), glassMat);
  windows.position.set(0, 2.35, 0.1);
  bus.add(windows);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.95, 0.1), glassMat);
  windshield.position.set(0, 2.3, -3.26);
  bus.add(windshield);

  const ledTex = createWoodSignTexture(lineTitle, subTitle, "#09090b", "#facc15");
  const led = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 0.44), new THREE.MeshBasicMaterial({ map: ledTex }));
  led.position.set(0, 2.86, -3.3);
  led.rotation.y = Math.PI;
  bus.add(led);

  const ledFront = led.clone();
  ledFront.position.set(0, 2.86, 3.3);
  ledFront.rotation.y = 0;
  bus.add(ledFront);

  [
    [-1.18, 0.44, -2.0],
    [1.18, 0.44, -2.0],
    [-1.18, 0.44, 2.0],
    [1.18, 0.44, 2.0],
  ].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.34, 14), wheelMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(wx, wy, wz);
    bus.add(w);
  });

  return bus;
}

function createTrain7RubiModel(label = "LINHA 7-RUBI") {
  const train = new THREE.Group();
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.65, roughness: 0.25 });
  const rubiMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.4 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.1 });

  const car = new THREE.Mesh(new THREE.BoxGeometry(3.15, 3.25, 17.5), steelMat);
  car.position.y = 2.05;
  car.castShadow = true;
  train.add(car);

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.56, 17.55), rubiMat);
  stripe.position.y = 1.5;
  train.add(stripe);

  const sideWin = new THREE.Mesh(new THREE.BoxGeometry(3.19, 0.92, 14.8), glassMat);
  sideWin.position.y = 2.45;
  train.add(sideWin);

  const frontSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.65, 0.72),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(label, "Jundiaí ↔ Campo Limpo ↔ Barra Funda", "#881337", "#ffffff"),
    })
  );
  frontSign.position.set(0, 3.05, 8.78);
  train.add(frontSign);

  const roofAC = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.32, 13.5), steelMat);
  roofAC.position.y = 3.82;
  train.add(roofAC);

  return train;
}

// 1. SÍTIO EM PAU ARCADO (Estrada do Garcia / Zona Rural de Campo Limpo Paulista)
function buildCountrysideEnvironment() {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(280, 280),
    new THREE.MeshStandardMaterial({ color: 0x4b8b3b, roughness: 0.95 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  exteriorGroup.add(ground);

  const yardLawn = new THREE.Mesh(
    new THREE.PlaneGeometry(70, 62),
    new THREE.MeshStandardMaterial({ color: 0x589a45, roughness: 0.92 })
  );
  yardLawn.rotation.x = -Math.PI / 2;
  yardLawn.position.set(0, 0.015, 0);
  yardLawn.receiveShadow = true;
  exteriorGroup.add(yardLawn);

  // Estrada do Garcia / Estrada Rural de Pau Arcado (saída da porteira encontra Estrada do Garcia em z = 47)
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x9b7248, roughness: 0.95 });
  const mainRoad = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 96), roadMat);
  mainRoad.rotation.x = -Math.PI / 2;
  mainRoad.position.set(12.5, 0.024, 95);
  mainRoad.receiveShadow = true;
  exteriorGroup.add(mainRoad);

  const crossRoad = new THREE.Mesh(new THREE.PlaneGeometry(130, 6.0), roadMat);
  crossRoad.rotation.x = -Math.PI / 2;
  crossRoad.position.set(0, 0.025, 47.0);
  crossRoad.receiveShadow = true;
  exteriorGroup.add(crossRoad);

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

  // Serra / Hills around Pau Arcado
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x3b7430, roughness: 1 });
  [
    [-86, -85, 34, 15],
    [0, -98, 48, 20],
    [88, -86, 38, 17],
    [-98, 25, 36, 14],
    [98, 18, 40, 16],
    [-78, 95, 36, 13],
    [80, 96, 34, 14],
  ].forEach(([x, z, r, h]) => {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(r, h, 14), hillMat);
    hill.position.set(x, h * 0.35, z);
    hill.scale.set(1.4, 1, 1.1);
    exteriorGroup.add(hill);
  });

  // Distant Campo Limpo Paulista urban skyline
  const cityGroup = new THREE.Group();
  cityGroup.position.set(14, 0, 135);
  const bldgMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 });
  [
    [-12, 12, 4],
    [-6, 18, 4.5],
    [0, 24, 5],
    [6, 15, 4],
    [11, 20, 4.5],
    [16, 11, 3.5],
  ].forEach(([bx, bh, bw]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bw), bldgMat);
    b.position.set(bx, bh / 2, 0);
    cityGroup.add(b);
  });
  exteriorGroup.add(cityGroup);

  // Pesqueiro / Lago de Pau Arcado (fora da cerca leste em x = 62, z = -10)
  const pond = new THREE.Mesh(
    new THREE.CircleGeometry(7.2, 20),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.3 })
  );
  pond.rotation.x = -Math.PI / 2;
  pond.position.set(62, 0.03, -10);
  exteriorGroup.add(pond);

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
  // Colisão da cerca sul (deixa apenas a porteira x: 9.0..16.0 aberta p/ sair até o Terminal 402!)
  addObstacleBox(-12.5, 30, 43.0, 0.7);
  addObstacleBox(25.0, 30, 18.0, 0.7);
  addObstacleBox(-44.0, 30, 20.0, 0.7);
  addObstacleBox(44.0, 30, 20.0, 0.7);

  westOriginalFenceGroup = new THREE.Group();
  addFenceSegment(-34, -30, -34, 30, westOriginalFenceGroup);
  exteriorGroup.add(westOriginalFenceGroup);

  eastOriginalFenceGroup = new THREE.Group();
  addFenceSegment(34, -30, 34, 30, eastOriginalFenceGroup);
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
  // Celeiro / Abrigo dos Animais no Pasto Oeste
  const barnMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 });
  const barnRoofMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.75 });
  const hayMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.95 });
  const barn = new THREE.Mesh(new THREE.BoxGeometry(6.8, 3.8, 4.8), barnMat);
  barn.position.set(-47.0, 1.9, -22.0);
  barn.castShadow = true;
  expansionWestGroup.add(barn);
  const barnRoof = new THREE.Mesh(new THREE.ConeGeometry(5.1, 2.0, 4), barnRoofMat);
  barnRoof.position.set(-47.0, 4.8, -22.0);
  barnRoof.rotation.y = Math.PI / 4;
  barnRoof.scale.set(1.05, 1, 0.8);
  expansionWestGroup.add(barnRoof);
  [
    [-40.5, 0.45, -21.0],
    [-39.1, 0.45, -21.0],
    [-39.8, 1.3, -21.0],
  ].forEach(([hx, hy, hz]) => {
    const hay = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 1.0), hayMat);
    hay.position.set(hx, hy, hz);
    hay.castShadow = true;
    expansionWestGroup.add(hay);
  });
  const westSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PASTO OESTE • FAZENDA", "+12 Canteiros & Pasto", "#14532d", "#fef08a"),
    })
  );
  westSign.position.set(-36.2, 2.1, -26.5);
  expansionWestGroup.add(westSign);
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
  addFenceSegment(54, -30, 54, 30, expansionEastGroup);
  addFenceSegment(34, 30, 54, 30, expansionEastGroup);
  const eastSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("FAZENDA LESTE • PAU ARCADO", "+12 Canteiros & Pasto Grande", "#1e3a8a", "#fef08a"),
    })
  );
  eastSign.position.set(36.5, 2.1, 22.5);
  expansionEastGroup.add(eastSign);
  exteriorGroup.add(expansionEastGroup);

  // Helper para criar Cercados / Currais dos animais dentro da fazenda (com porteira aberta e colisão nas cercas!)
  const troughWoodMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.82 });
  const troughWaterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.2 });
  const penMudMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 1.0 });
  const penHayMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.95 });

  function addFencedPen({ minX, maxX, minZ, maxZ, gateSide, gateCenter, gateWidth = 4.0, title, sub, bgColor, signPos }) {
    const halfG = gateWidth * 0.5;
    // Norte (z = minZ)
    if (gateSide === "north") {
      addFenceSegment(minX, minZ, gateCenter - halfG, minZ);
      addFenceSegment(gateCenter + halfG, minZ, maxX, minZ);
      addObstacleBox((minX + gateCenter - halfG) * 0.5, minZ, gateCenter - halfG - minX, 0.55);
      addObstacleBox((gateCenter + halfG + maxX) * 0.5, minZ, maxX - (gateCenter + halfG), 0.55);
    } else {
      addFenceSegment(minX, minZ, maxX, minZ);
      addObstacleBox((minX + maxX) * 0.5, minZ, maxX - minX, 0.55);
    }
    // Sul (z = maxZ)
    if (gateSide === "south") {
      addFenceSegment(minX, maxZ, gateCenter - halfG, maxZ);
      addFenceSegment(gateCenter + halfG, maxZ, maxX, maxZ);
      addObstacleBox((minX + gateCenter - halfG) * 0.5, maxZ, gateCenter - halfG - minX, 0.55);
      addObstacleBox((gateCenter + halfG + maxX) * 0.5, maxZ, maxX - (gateCenter + halfG), 0.55);
    } else {
      addFenceSegment(minX, maxZ, maxX, maxZ);
      addObstacleBox((minX + maxX) * 0.5, maxZ, maxX - minX, 0.55);
    }
    // Oeste (x = minX)
    if (gateSide === "west") {
      addFenceSegment(minX, minZ, minX, gateCenter - halfG);
      addFenceSegment(minX, gateCenter + halfG, minX, maxZ);
      addObstacleBox(minX, (minZ + gateCenter - halfG) * 0.5, 0.55, gateCenter - halfG - minZ);
      addObstacleBox(minX, (gateCenter + halfG + maxZ) * 0.5, 0.55, maxZ - (gateCenter + halfG));
    } else {
      addFenceSegment(minX, minZ, minX, maxZ);
      addObstacleBox(minX, (minZ + maxZ) * 0.5, 0.55, maxZ - minZ);
    }
    // Leste (x = maxX)
    if (gateSide === "east") {
      addFenceSegment(maxX, minZ, maxX, gateCenter - halfG);
      addFenceSegment(maxX, gateCenter + halfG, maxX, maxZ);
      addObstacleBox(maxX, (minZ + gateCenter - halfG) * 0.5, 0.55, gateCenter - halfG - minZ);
      addObstacleBox(maxX, (gateCenter + halfG + maxZ) * 0.5, 0.55, maxZ - (gateCenter + halfG));
    } else {
      addFenceSegment(maxX, minZ, maxX, maxZ);
      addObstacleBox(maxX, (minZ + maxZ) * 0.5, 0.55, maxZ - minZ);
    }
    if (title && signPos) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.18), fenceMat);
      post.position.set(signPos[0], 1.1, signPos[1]);
      exteriorGroup.add(post);
      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.78, 0.12),
        new THREE.MeshBasicMaterial({ map: createWoodSignTexture(title, sub, bgColor || "#14532d", "#fef08a") })
      );
      sign.position.set(signPos[0], 2.05, signPos[1]);
      if (signPos[2]) sign.rotation.y = signPos[2];
      exteriorGroup.add(sign);
    }
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

  // Estrada do Garcia Road Sign at the Gate (z = 30)
  const gatePost = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.4, 0.22), fenceMat);
  gatePost.position.set(17.2, 1.2, 32.0);
  gatePost.castShadow = true;
  exteriorGroup.add(gatePost);
  const roadSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.95, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTRADA DO GARCIA ↓", "Ponto 402 ao lado direito →", "#14532d", "#fef08a"),
    })
  );
  roadSign.position.set(17.2, 2.15, 32.0);
  exteriorGroup.add(roadSign);

  // Alyffer's House in Pau Arcado
  const house = new THREE.Group();
  house.position.set(0, 0, -20.5);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xf5ecd9, roughness: 0.8 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.75 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.7 });
  const porchMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.85 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(10.8, 4.4, 7.2), wallMat);
  body.position.y = 2.2;
  body.castShadow = true;
  body.receiveShadow = true;
  house.add(body);

  // Beiral / forro sob o telhado principal (sem vãos e sem atravessar a varanda!)
  const roofSoffit = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.16, 8.2), trimMat);
  roofSoffit.position.y = 4.38;
  roofSoffit.castShadow = true;
  house.add(roofSoffit);

  // Telhado principal dimensionado exatamente sobre o corpo da casa (x: ±6.05, z: ±4.25)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(8.0, 3.0, 4), roofMat);
  roof.position.y = 5.92;
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.07, 1, 0.75);
  roof.castShadow = true;
  house.add(roof);

  // Torre lateral externa da Caixa d'Água Azul (fora do telhado, apoiada em estrutura firme!)
  const towerGroup = new THREE.Group();
  towerGroup.position.set(6.75, 0, -1.6);
  [
    [-0.72, -0.72],
    [0.72, -0.72],
    [-0.72, 0.72],
    [0.72, 0.72],
  ].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.3, 0.18), trimMat);
    leg.position.set(lx, 2.15, lz);
    leg.castShadow = true;
    towerGroup.add(leg);
  });
  [1.6, 3.1].forEach((by) => {
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
  const towerPlatform = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.18, 1.95), porchMat);
  towerPlatform.position.y = 4.35;
  towerPlatform.castShadow = true;
  towerGroup.add(towerPlatform);
  const waterTower = new THREE.Mesh(
    new THREE.CylinderGeometry(0.88, 0.78, 1.15, 16),
    new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.42 })
  );
  waterTower.position.set(0, 5.02, 0);
  waterTower.castShadow = true;
  towerGroup.add(waterTower);
  const waterLid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 0.92, 0.14, 16),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.4 })
  );
  waterLid.position.set(0, 5.64, 0);
  towerGroup.add(waterLid);
  house.add(towerGroup);
  addObstacleBox(6.75, -22.1, 2.0, 2.0);

  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 2.5, 0.85),
    new THREE.MeshStandardMaterial({ color: 0x8c3b23, roughness: 0.85 })
  );
  chimney.position.set(-3.0, 5.95, -1.1);
  chimney.castShadow = true;
  house.add(chimney);
  const chimneyCap = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.16, 1.05),
    new THREE.MeshStandardMaterial({ color: 0x6b2c1a, roughness: 0.85 })
  );
  chimneyCap.position.set(-3.0, 7.26, -1.1);
  house.add(chimneyCap);

  const porchDeck = new THREE.Mesh(new THREE.BoxGeometry(11.0, 0.35, 3.2), porchMat);
  porchDeck.position.set(0, 0.175, 5.1);
  porchDeck.receiveShadow = true;
  house.add(porchDeck);

  const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.22, 3.3), roofMat);
  porchRoof.position.set(0, 3.74, 5.15);
  porchRoof.rotation.x = 0.11;
  porchRoof.castShadow = true;
  house.add(porchRoof);

  [-4.9, -1.9, 1.9, 4.9].forEach((px) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.26, 3.28, 0.26), trimMat);
    pillar.position.set(px, 1.98, 6.45);
    pillar.castShadow = true;
    house.add(pillar);
  });

  const door = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.75, 0.18), trimMat);
  door.position.set(0, 1.55, 3.62);
  house.add(door);

  windowMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.3,
    roughness: 0.2,
  });
  [-3.2, 3.2].forEach((wx) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1.45, 0.16), trimMat);
    frame.position.set(wx, 2.25, 3.6);
    house.add(frame);
    const glass = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.15, 0.18), windowMat);
    glass.position.set(wx, 2.25, 3.62);
    house.add(glass);
  });

  // Porch Bench & Coffee Table
  const bench = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.45, 0.7), trimMat);
  bench.position.set(-3.3, 0.6, 4.7);
  bench.castShadow = true;
  house.add(bench);

  lanternMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.45,
  });
  const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.32), lanternMat);
  lantern.position.set(1.2, 3.25, 6.2);
  house.add(lantern);

  // Placa "SÍTIO DO MACHO" fixada na viga frontal da varanda (abaixo do beiral, sem encavalar no telhado)
  const porchFascia = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.28, 0.24), trimMat);
  porchFascia.position.set(0, 3.56, 6.60);
  porchFascia.castShadow = true;
  house.add(porchFascia);

  [-1.5, 1.5].forEach((sx) => {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.95, 0.14), trimMat);
    bracket.position.set(sx, 3.56, 6.72);
    house.add(bracket);
  });
  const houseSign = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.88, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SÍTIO DO MACHO", "Pau Arcado • ETEC CLP"),
    })
  );
  houseSign.position.set(0, 3.56, 6.82);
  house.add(houseSign);

  exteriorGroup.add(house);
  addObstacleBox(0, -18.8, 11.0, 10.2);

  // Galinheiro Caipira (Chicken Coop — produces Ovos Caipiras daily!) no cercadinho noroeste (-24.0, 0, -21.0)
  const coop = new THREE.Group();
  coop.position.set(-24.0, 0, -21.0);
  const coopBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 1.8, 2.6),
    new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.85 })
  );
  coopBody.position.y = 0.9;
  coopBody.castShadow = true;
  coop.add(coopBody);
  const coopRoof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 1.0, 4), roofMat);
  coopRoof.position.y = 2.25;
  coopRoof.rotation.y = Math.PI / 4;
  coopRoof.castShadow = true;
  coop.add(coopRoof);
  const coopSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.65, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("GALINHEIRO", "Ovos Caipiras Frescos", "#7c2d12", "#fef08a"),
    })
  );
  coopSign.position.set(0, 2.45, 1.25);
  coop.add(coopSign);

  // Visual eggs in nest box in front of coop
  coopEggVisuals = [];
  [-0.45, 0, 0.45].forEach((ex) => {
    const egg = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 })
    );
    egg.scale.set(1, 1.25, 1);
    egg.position.set(ex, 0.22, 1.52);
    coop.add(egg);
    coopEggVisuals.push(egg);
  });

  exteriorGroup.add(coop);
  addObstacleBox(-24.0, -21.0, 3.3, 2.7);

  // Water Well (Poço de Água) à esquerda da horta (-18.0, 0, -2.5)
  const well = new THREE.Group();
  well.position.set(-18.0, 0, -2.5);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.9 });
  const wellBase = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.5, 1.1, 14), stoneMat);
  wellBase.position.y = 0.55;
  wellBase.castShadow = true;
  well.add(wellBase);

  wellWaterMesh = new THREE.Mesh(
    new THREE.CircleGeometry(1.12, 16),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      roughness: 0.15,
    })
  );
  wellWaterMesh.rotation.x = -Math.PI / 2;
  wellWaterMesh.position.y = 1.12;
  well.add(wellWaterMesh);

  [-1.1, 1.1].forEach((px) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), trimMat);
    post.position.set(px, 1.85, 0);
    well.add(post);
  });
  const wellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.85, 1.1, 4), roofMat);
  wellRoof.position.y = 3.25;
  wellRoof.rotation.y = Math.PI / 4;
  well.add(wellRoof);

  const wellSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.6, 0.1),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("POÇO D'ÁGUA", "Encher Regador") })
  );
  wellSign.position.set(0, 2.55, 1.05);
  well.add(wellSign);

  exteriorGroup.add(well);
  addObstacleBox(-18.0, -2.5, 2.7, 2.7);

  // Composteira Orgânica bem espaçada à esquerda da horta (-18.0, 0, 6.5)
  const compost = new THREE.Group();
  compost.position.set(-18.0, 0, 6.5);
  const compBin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.1, 2.2), trimMat);
  compBin.position.y = 0.55;
  compBin.castShadow = true;
  compost.add(compBin);
  const compHumus = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.25, 1.9),
    new THREE.MeshStandardMaterial({ color: 0x291d12, roughness: 1 })
  );
  compHumus.position.y = 1.05;
  compost.add(compHumus);
  const compSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.6, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("COMPOSTEIRA", "Adubo Caseiro Grátis", "#14532d", "#86efac"),
    })
  );
  compSign.position.set(0, 1.65, 1.05);
  compost.add(compSign);
  exteriorGroup.add(compost);
  addObstacleBox(-18.0, 6.5, 2.3, 2.3);

  // Cooperativa Rural (Melhorias do Quintal) no lado nordeste (21.5, 0, -16.5)
  const stand = new THREE.Group();
  stand.position.set(21.5, 0, -16.5);
  stand.rotation.y = -0.25;

  const counter = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.15, 1.7), trimMat);
  counter.position.y = 0.575;
  counter.castShadow = true;
  stand.add(counter);

  [-1.9, 1.9].forEach((px) => {
    const pole = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.8, 0.18), trimMat);
    pole.position.set(px, 1.8, -0.65);
    stand.add(pole);
  });

  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.22, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.65 })
  );
  awning.position.set(0, 3.1, 0.15);
  awning.rotation.x = 0.18;
  stand.add(awning);

  const standSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.9, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("COOPERATIVA RURAL", "Melhorias • Pegue o 402 p/ Vender"),
    })
  );
  standSign.position.set(0, 3.65, 0.1);
  stand.add(standSign);

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

  const bus402StopBanner = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.86, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PONTO ÔNIBUS 402", "Estrada do Garcia → Terminal CLP", "#1e3a8a", "#fef08a"),
    })
  );
  bus402StopBanner.position.set(0, 3.04, 1.04);
  stopGroup.add(bus402StopBanner);
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
  const dogSnout = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.18, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x451a03 })
  );
  dogSnout.position.set(0, 0.66, 0.66);
  dog.add(dogSnout);
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
  const dogTag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.85, 0.48),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ORELHA 🐕", "E: Carinho • X: Chutar", "#78350f", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  dogTag.position.set(0, 1.38, 0);
  dog.add(dogTag);
  dog.position.set(6.8, 0, -12.5);
  exteriorGroup.add(dog);
  dogOrelha = {
    mesh: dog,
    tail: dogTail,
    leftEar,
    rightEar,
    legs: dogLegs,
    home: new THREE.Vector3(6.8, 0, -12.5),
    target: new THREE.Vector3(6.8, 0, -12.5),
    wait: 1.5,
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

  const jagTag = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 0.58),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("🐆 ONÇA PINTADA!", "Lute com a Enxada (R)", "#7f1d1d", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  jagTag.position.set(0, 2.05, 0.2);
  jagGroup.add(jagTag);

  jagGroup.visible = false;
  exteriorGroup.add(jagGroup);
  jaguarEntity = {
    mesh: jagGroup,
    legs: jagLegs,
    tail: jagTail,
    bodyMat: jagFurMat,
    tagMesh: jagTag,
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
  // Substitui a plaquinha no clone
  const tamedJagTag = tamedJag.children[tamedJag.children.length - 2];
  tamedJagTag.userData.isJagTag = true;
  tamedJagTag.material = new THREE.MeshBasicMaterial({
    map: createWoodSignTexture("🐆 ONÇA DO MACHO", "Domada ❤️ • Guarda o Sítio", "#14532d", "#fef08a"),
    transparent: true,
    side: THREE.DoubleSide,
  });
  tamedJag.position.set(9.5, 0, -12.0);
  tamedJag.visible = false;
  exteriorGroup.add(tamedJag);
  tamedJaguarEntity = {
    mesh: tamedJag,
    legs: tamedJagLegs,
    tail: tamedJagTail,
    tagMesh: tamedJagTag,
    home: new THREE.Vector3(9.5, 0, -12.0),
    target: new THREE.Vector3(9.5, 0, -12.0),
    wait: 1.5,
    attackCd: 0,
  };

  // Marcelo Careca (Segurança contratado na ETECAMP para matar a Onça e proteger os animais!)
  const marceloYard = new THREE.Group();
  const mSkinY = new THREE.MeshStandardMaterial({ color: 0xdca580, roughness: 0.55 });
  const mVestY = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.65 });
  const mPantsY = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const mBootY = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.5 });
  const mTorsoY = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.15, 0.54), mVestY);
  mTorsoY.position.y = 1.4;
  mTorsoY.castShadow = true;
  marceloYard.add(mTorsoY);
  const mHeadY = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), mSkinY);
  mHeadY.position.y = 2.34;
  mHeadY.castShadow = true;
  marceloYard.add(mHeadY);
  // Brilho careca no topo da cabeça do Marcelo!
  const mShineY = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
  );
  mShineY.scale.set(1.2, 0.3, 1.2);
  mShineY.position.set(0.12, 2.69, 0.12);
  marceloYard.add(mShineY);
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
  mLArmY.position.set(-0.63, 1.72, 0);
  const mLArmMeshY = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.84, 0.26), mSkinY);
  mLArmMeshY.position.y = -0.34;
  mLArmMeshY.castShadow = true;
  mLArmY.add(mLArmMeshY);
  const mRArmY = new THREE.Group();
  mRArmY.position.set(0.63, 1.72, 0);
  const mRArmMeshY = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.84, 0.26), mSkinY);
  mRArmMeshY.position.y = -0.34;
  mRArmMeshY.castShadow = true;
  mRArmY.add(mRArmMeshY);
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
  const mTagY = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.58),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("MARCELO 🛡️", "Guarda dos Animais & Caça-Onça", "#0f172a", "#4ade80"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  mTagY.position.set(0, 3.35, 0);
  marceloYard.add(mTagY);
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

  // Trees around the yard & distant countryside
  function addTree(x, z, scale = 1, type = "round") {
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale);

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.46, 2.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 })
    );
    trunk.position.y = 1.4;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliageColor = type === "ipe" ? 0xfacc15 : 0x2e7d32;
    const fMat = new THREE.MeshStandardMaterial({ color: foliageColor, roughness: 0.85 });
    const crown1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.85, 1), fMat);
    crown1.position.y = 3.6;
    crown1.castShadow = true;
    tree.add(crown1);

    const crown2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.3, 1), fMat);
    crown2.position.set(0.8, 4.4, 0.4);
    crown2.castShadow = true;
    tree.add(crown2);

    exteriorGroup.add(tree);
    if (Math.abs(x) < 52 && z > -30 && z < 48) {
      addObstacleBox(x, z, 0.95, 0.95);
    }
  }

  [
    [-12, -26, 1.15, "round"],
    [29, -24, 1.3, "ipe"],
    [27, 23, 1.15, "ipe"],
    [-36, -36, 1.45, "round"],
    [-58, 6, 1.5, "ipe"],
    [40, -35, 1.35, "round"],
    [58, 12, 1.45, "round"],
    [-26, 38, 1.3, "round"],
    [38, 39, 1.3, "ipe"],
    [-60, -16, 1.6, "round"],
    [60, -24, 1.5, "round"],
  ].forEach(([x, z, s, t]) => addTree(x, z, s, t));

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

  // Backyard Chickens
  syncChickensToCount(3);

  // Sistema de Irrigação Automática 3D (Aspersores nos cruzamentos da horta — visível após compra na Loja!)
  sprinklerGroup = new THREE.Group();
  sprinklerGroup.visible = false;
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.35 });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.65, roughness: 0.3 });
  [
    [-6.7, -4.95],
    [-0.5, -4.95],
    [5.7, -4.95],
    [-6.7, 4.35],
    [-0.5, 4.35],
    [5.7, 4.35],
  ].forEach(([sx, sz]) => {
    const sp = new THREE.Group();
    sp.position.set(sx, 0, sz);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.14, 10), pipeMat);
    base.position.y = 0.07;
    sp.add(base);
    const riser = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.56, 8), pipeMat);
    riser.position.y = 0.36;
    sp.add(riser);
    const head = new THREE.Group();
    head.position.y = 0.66;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 10), brassMat);
    head.add(cap);
    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.045, 0.05), brassMat);
    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, 0.54), brassMat);
    head.add(bar1, bar2);
    sp.add(head);
    sprinklerGroup.add(sp);
    sprinklerHeads.push({ head, x: sx, z: sz });
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

// 2. CASA AMPLIADA DO ALYFFER (Quarto, Sala, Cozinha, Banheiro & Segredo do Porão!)
function buildBedroomInterior() {
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 });
  const kitchenFloorMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#f1f5f9", "#cbd5e1", 10),
    roughness: 0.65,
  });
  const bathFloorMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e0f2fe", "#bae6fd", 8),
    roughness: 0.55,
  });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe6e2d3, roughness: 0.85 });
  const bathWallMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, roughness: 0.65 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.75 });
  const whiteCeramic = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.1 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.65, roughness: 0.3 });

  // Iluminação completa da casa
  [
    [-5.5, 3.8, -3.5],
    [5.5, 3.8, -3.5],
    [-4.0, 3.8, 4.5],
    [6.6, 3.8, 4.8],
  ].forEach(([lx, ly, lz]) => {
    const lamp = new THREE.PointLight(0xfff1c9, 0.75, 22);
    lamp.position.set(lx, ly, lz);
    interiorGroup.add(lamp);
  });

  // Forro do teto (FrontSide p/ baixo: visível em 1ª pessoa, transparente em 3ª pessoa)
  const ceilingPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 16.4),
    new THREE.MeshStandardMaterial({ color: 0xc29b6c, roughness: 0.85, side: THREE.FrontSide })
  );
  ceilingPlane.rotation.x = Math.PI / 2;
  ceilingPlane.position.set(0, 4.4, 0);
  interiorGroup.add(ceilingPlane);

  // Parede frontal (FrontSide voltado p/ dentro)
  const frontWallIn = new THREE.Mesh(
    new THREE.PlaneGeometry(20.4, 4.4),
    new THREE.MeshStandardMaterial({ color: 0xe6e2d3, roughness: 0.85, side: THREE.FrontSide })
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

  // Paredes externas (Norte, Oeste, Leste)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(20.4, 4.4, 0.25), wallMat);
  backWall.position.set(0, 2.2, -8.1);
  interiorGroup.add(backWall);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.4, 16.4), wallMat);
  leftWall.position.set(-10.1, 2.2, 0);
  interiorGroup.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.4, 16.4), wallMat);
  rightWall.position.set(10.1, 2.2, 0);
  interiorGroup.add(rightWall);

  function addHouseWall(cx, cz, w, d, mat = wallMat) {
    const wm = new THREE.Mesh(new THREE.BoxGeometry(w, 3.7, d), mat);
    wm.position.set(cx, 1.85, cz);
    wm.castShadow = true;
    wm.receiveShadow = true;
    interiorGroup.add(wm);
    addObstacleBox(cx, cz, w, d, interiorObstacles);
  }

  // Divisórias internas com portas amplas
  // Quarto (NO) x Cozinha (NE)
  addHouseWall(-1.0, -5.4, 0.24, 5.2); // z: -8 .. -2.8 (porta em -2.8 .. -0.2)
  addHouseWall(-1.0, 0.4, 0.24, 1.2); // z: -0.2 .. +1.0
  // Quarto (NO) x Sala (SO)
  addHouseWall(-7.0, 1.0, 6.0, 0.24); // x: -10 .. -4.0 (porta em -4.0 .. -1.0)
  // Cozinha (NE) x Banheiro (SE)
  addHouseWall(7.9, 1.0, 4.2, 0.24, bathWallMat); // x: 5.8 .. 10 (porta em 3.2 .. 5.8)
  // Sala (Centro) x Banheiro (SE)
  addHouseWall(3.2, 5.7, 0.24, 4.6, bathWallMat); // z: 3.4 .. 8.0 (porta em 1.0 .. 3.4)

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

  // Cama do Alyffer em (-7.0, 0, -5.0) — espaço discreto no canto extremo (-9.1, -7.0) p/ alçapão secreto!
  const bed = new THREE.Group();
  bed.position.set(-7.0, 0, -5.0);
  const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 2.7), woodMat);
  bedBase.position.y = 0.225;
  bedBase.castShadow = true;
  bed.add(bedBase);
  const mattress = new THREE.Mesh(
    new THREE.BoxGeometry(1.86, 0.28, 2.55),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 })
  );
  mattress.position.y = 0.58;
  bed.add(mattress);
  const blanket = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.3, 1.7),
    new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.8 })
  );
  blanket.position.set(0, 0.59, 0.4);
  bed.add(blanket);
  const pillow = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.18, 0.52),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
  );
  pillow.position.set(0, 0.78, -0.9);
  bed.add(pillow);
  interiorGroup.add(bed);
  addObstacleBox(-7.0, -5.0, 2.1, 2.75, interiorObstacles);

  // Pôster do PAC do TazerCraft na parede do quarto
  const pacFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 2.0, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
  );
  pacFrame.position.set(-7.0, 2.38, -7.94);
  interiorGroup.add(pacFrame);
  const pacPoster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.78),
    new THREE.MeshBasicMaterial({ map: createPacPosterTexture() })
  );
  pacPoster.position.set(-7.0, 2.38, -7.88);
  interiorGroup.add(pacPoster);

  // Estante de Mangás em (-3.6, 0, -7.45)
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(-3.6, 0, -7.45);
  const shelfBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.6, 0.6), woodMat);
  shelfBody.position.y = 1.3;
  shelfGroup.add(shelfBody);
  const mangaColors = [0xffffff, 0x18181b, 0xef4444, 0x3b82f6, 0xfacc15, 0x22c55e, 0xa855f7, 0xf97316];
  [0.55, 1.22, 1.88].forEach((sy, rowIdx) => {
    const recess = new THREE.Mesh(
      new THREE.BoxGeometry(1.92, 0.48, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x2b1a0e })
    );
    recess.position.set(0, sy, 0.25);
    shelfGroup.add(recess);
    for (let m = 0; m < 9; m++) {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.38, 0.28),
        new THREE.MeshStandardMaterial({ color: mangaColors[(m + rowIdx * 3) % mangaColors.length], roughness: 0.65 })
      );
      book.position.set(-0.76 + m * 0.19, sy - 0.03, 0.22);
      if (m === 7 && rowIdx === 1) book.rotation.z = 0.22;
      shelfGroup.add(book);
    }
  });
  const mangaSign = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.48, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("MANGÁS", "Coleção do Macho", "#1e1b4b", "#facc15") })
  );
  mangaSign.position.set(0, 2.86, 0.15);
  shelfGroup.add(mangaSign);
  interiorGroup.add(shelfGroup);
  addObstacleBox(-3.6, -7.45, 2.3, 0.72, interiorObstacles);

  // Escrivaninha da ETEC no quarto em (-8.4, 0, -0.55)
  const deskGroup = new THREE.Group();
  deskGroup.position.set(-8.4, 0, -0.55);
  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.14, 1.15), woodMat);
  deskTop.position.y = 0.95;
  deskGroup.add(deskTop);
  [[-0.9, -0.45], [0.9, -0.45], [-0.9, 0.45], [0.9, 0.45]].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.95, 0.11), woodMat);
    leg.position.set(lx, 0.475, lz);
    deskGroup.add(leg);
  });
  const notebook = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.4), whiteCeramic);
  notebook.position.set(-0.3, 1.05, 0.1);
  const backpack = new THREE.Mesh(
    new THREE.BoxGeometry(0.46, 0.6, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.75 })
  );
  backpack.position.set(0.7, 0.3, 0.4);
  deskGroup.add(notebook, backpack);
  const etecSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.72, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("ETECAMP", "Cadernos & Tarefas", "#7f1d1d", "#fef08a") })
  );
  etecSign.position.set(-1.35, 2.2, 0);
  etecSign.rotation.y = Math.PI / 2;
  deskGroup.add(etecSign);
  interiorGroup.add(deskGroup);
  addObstacleBox(-8.4, -0.55, 2.2, 1.25, interiorObstacles);

  // Alçapão Secreto do Porão (invisível até completar os 2 passos escondidos!)
  secretTrapdoorMesh = new THREE.Group();
  secretTrapdoorMesh.position.set(-9.15, 0.03, -7.05);
  const hatchFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 0.06, 1.15),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.4 })
  );
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

  // ===================== COZINHA (NE) =====================
  const kitchenSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.65, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("COZINHA DO SÍTIO", "Café Coado & Fogão", "#7c2d12", "#fef08a") })
  );
  kitchenSign.position.set(4.6, 2.95, -7.92);
  interiorGroup.add(kitchenSign);

  // Pia + Balcão + Fogão (parede norte da cozinha)
  const kCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.96, 0.95), woodMat);
  kCounter.position.set(3.2, 0.48, -7.45);
  interiorGroup.add(kCounter);
  const kTop = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.08, 1.02), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35 }));
  kTop.position.set(3.2, 0.99, -7.45);
  interiorGroup.add(kTop);
  const kSinkBasin = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.06, 0.56), steelMat);
  kSinkBasin.position.set(2.4, 1.04, -7.45);
  const kFaucet = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 8), steelMat);
  kFaucet.position.set(2.4, 1.2, -7.75);
  interiorGroup.add(kSinkBasin, kFaucet);
  addObstacleBox(3.2, -7.45, 3.7, 1.05, interiorObstacles);

  // Fogão 4 bocas ao lado do balcão
  const stove = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.98, 0.95), whiteCeramic);
  stove.position.set(5.75, 0.49, -7.45);
  const ovenDoor = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.52, 0.06), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
  ovenDoor.position.set(5.75, 0.42, -6.96);
  const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.16, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.4 }));
  pan.position.set(5.55, 1.06, -7.4);
  interiorGroup.add(stove, ovenDoor, pan);
  addObstacleBox(5.75, -7.45, 1.2, 1.02, interiorObstacles);

  // Geladeira no canto nordeste (com frestinha secreta à esquerda em x=7.4, z=-7.4!)
  const fridge = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.3, 1.05), whiteCeramic);
  fridge.position.set(9.15, 1.15, -7.3);
  fridge.castShadow = true;
  const fridgeHandle1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), steelMat);
  fridgeHandle1.position.set(8.7, 1.78, -6.75);
  const fridgeHandle2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), steelMat);
  fridgeHandle2.position.set(8.7, 1.0, -6.75);
  interiorGroup.add(fridge, fridgeHandle1, fridgeHandle2);
  addObstacleBox(9.15, -7.3, 1.22, 1.12, interiorObstacles);

  // Botão secreto minúsculo enferrujado escondido na fresta da parede atrás da geladeira!
  const hiddenSwitch1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.14, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x7c2d12, metalness: 0.5, roughness: 0.7 })
  );
  hiddenSwitch1.position.set(7.55, 0.72, -7.95);
  interiorGroup.add(hiddenSwitch1);

  // Mesa de Jantar da Cozinha + Bule de Café Coado
  const kTable = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.1, 1.45), woodMat);
  kTable.position.set(5.4, 0.85, -2.6);
  interiorGroup.add(kTable);
  [[-1.05, -0.58], [1.05, -0.58], [-1.05, 0.58], [1.05, 0.58]].forEach(([tx, tz]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), woodMat);
    leg.position.set(5.4 + tx, 0.425, -2.6 + tz);
    interiorGroup.add(leg);
  });
  const coffeePot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 0.32, 10),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.35, roughness: 0.35 })
  );
  coffeePot.position.set(5.4, 1.06, -2.6);
  interiorGroup.add(coffeePot);
  addObstacleBox(5.4, -2.6, 2.6, 1.55, interiorObstacles);

  // ===================== BANHEIRO (SE) =====================
  const bathSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.56, 0.08),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("BANHEIRO", "Chuveiro & Pia", "#0369a1", "#e0f2fe") })
  );
  bathSign.position.set(7.9, 2.8, 1.16);
  interiorGroup.add(bathSign);

  // Vaso Sanitário em (9.1, 0, 2.5)
  const toiletBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.46, 12), whiteCeramic);
  toiletBase.position.set(9.1, 0.23, 2.5);
  const toiletTank = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.56, 0.58), whiteCeramic);
  toiletTank.position.set(9.45, 0.65, 2.5);
  const toiletLid = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 12), whiteCeramic);
  toiletLid.position.set(9.1, 0.48, 2.5);
  interiorGroup.add(toiletBase, toiletTank, toiletLid);
  addObstacleBox(9.2, 2.5, 0.95, 0.9, interiorObstacles);

  // Pia + Espelho do Banheiro em (4.8, 0, 7.3)
  const bSinkCabinet = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.86, 0.72), whiteCeramic);
  bSinkCabinet.position.set(4.8, 0.43, 7.35);
  const bMirror = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, 1.0, 0.06),
    new THREE.MeshStandardMaterial({ color: 0xbae6fd, metalness: 0.85, roughness: 0.1 })
  );
  bMirror.position.set(4.8, 1.72, 7.9);
  interiorGroup.add(bSinkCabinet, bMirror);
  addObstacleBox(4.8, 7.35, 1.5, 0.85, interiorObstacles);

  // Box de Chuveiro Walk-in no canto Sudeste (x: 7.4..9.9, z: 5.2..7.9)
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.32,
    roughness: 0.1,
    metalness: 0.2,
  });
  const showerPane = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 2.4), glassMat);
  showerPane.position.set(7.35, 1.2, 6.7);
  interiorGroup.add(showerPane);
  addObstacleBox(7.35, 6.7, 0.18, 2.4, interiorObstacles);
  const showerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.12, 12), whiteCeramic);
  showerHead.position.set(9.4, 2.55, 6.6);
  const showerPipe = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.07, 0.07), steelMat);
  showerPipe.position.set(9.7, 2.6, 6.6);
  // Ralo/registro oculto no fundo do box (Passo 2 do porão secreto)
  const hiddenDrainValve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.04, 10),
    new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 })
  );
  hiddenDrainValve.position.set(9.1, 0.03, 7.1);
  interiorGroup.add(showerHead, showerPipe, hiddenDrainValve);

  // ===================== SALA DE ESTAR (SO / CENTRO) =====================
  const livingRug = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 3.8),
    new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.95 })
  );
  livingRug.rotation.x = -Math.PI / 2;
  livingRug.position.set(-4.2, 0.015, 4.5);
  interiorGroup.add(livingRug);

  // Sofá aconchegante
  const sofaMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.9 });
  const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.5, 3.2), sofaMat);
  sofaSeat.position.set(-8.6, 0.25, 4.5);
  const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.95, 3.2), sofaMat);
  sofaBack.position.set(-9.1, 0.65, 4.5);
  interiorGroup.add(sofaSeat, sofaBack);
  addObstacleBox(-8.7, 4.5, 1.45, 3.3, interiorObstacles);

  // Rack + TV da Sala
  const tvRack = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.62, 0.72), woodMat);
  tvRack.position.set(-4.2, 0.31, 7.35);
  const tvScreen = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 1.0, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x1e3a8a, emissiveIntensity: 0.35 })
  );
  tvScreen.position.set(-4.2, 1.15, 7.45);
  interiorGroup.add(tvRack, tvScreen);
  addObstacleBox(-4.2, 7.35, 2.3, 0.85, interiorObstacles);

  // Tapete & Placa de Saída para o Quintal
  const doormat = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.04, 1.1),
    new THREE.MeshStandardMaterial({ color: 0xb4532a, roughness: 0.9 })
  );
  doormat.position.set(0, 0.02, 7.35);
  interiorGroup.add(doormat);

  const exitSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 0.62, 0.08),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SAIR P/ QUINTAL", "Pau Arcado", "#14532d", "#fef08a"),
    })
  );
  exitSign.position.set(0, 0.65, 7.92);
  interiorGroup.add(exitSign);
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
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
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

  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 0.56),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(cfg.name, cfg.sub, "#1e1b4b", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  tag.position.set(0, 3.55, 0);
  g.add(torso, pocket, head, lEye, rEye, brim, crown, band, lArm, rArm, lLeg, rLeg, lBoot, rBoot, tag);
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

  const banner = new THREE.Mesh(
    new THREE.BoxGeometry(8.8, 1.5, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PORÃO SECRETO • MULTIVERSO DO MACHO", "Cópias Alternativas do Alyffer • Fale p/ Vestir!", "#3b0764", "#facc15"),
    })
  );
  banner.position.set(0, 3.1, -8.88);
  basementGroup.add(banner);

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
  const ladderSign = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.65, 0.1),
    new THREE.MeshBasicMaterial({ map: createWoodSignTexture("SUBIR P/ CASA", "Tecla E: Voltar ao Quarto", "#14532d", "#fef08a") })
  );
  ladderSign.position.set(0, 1.15, 0.45);
  ladderGroup.add(ladderSign);
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

// 3. TERMINAL URBANO DE CAMPO LIMPO PAULISTA & ESTAÇÃO LINHA 7-RUBI (Av. Alfried Krupp — Super Expandido)
function buildTerminalAndStation() {
  const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.92 });
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.94 });
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
  const paverMat = new THREE.MeshStandardMaterial({ color: 0x7c7f87, roughness: 0.88 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.42, metalness: 0.28 });
  const blueTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.45, metalness: 0.3 });
  const underRoofMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7, metalness: 0.35 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.55, roughness: 0.35 });
  const fenceIronMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.45, roughness: 0.5 });
  const whiteWallMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
  const rubiMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.45 });
  const yellowTactile = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.65 });
  const whiteLineMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 });
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.85 });

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), asphaltMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  terminalGroup.add(ground);

  // Rio Jundiaí channel passing behind/alongside the expanded railway corridor
  const river = new THREE.Mesh(
    new THREE.PlaneGeometry(9.0, 150),
    new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.25, metalness: 0.25 })
  );
  river.rotation.x = -Math.PI / 2;
  river.position.set(37.5, 0.02, 0);
  terminalGroup.add(river);

  // Av. Alfried Krupp (2 pistas largas bem à frente do terminal expandido, z = +22..+31)
  const avenueRoad = new THREE.Mesh(new THREE.PlaneGeometry(130, 9.0), roadMat);
  avenueRoad.rotation.x = -Math.PI / 2;
  avenueRoad.position.set(-6, 0.015, 26.5);
  terminalGroup.add(avenueRoad);

  for (let x = -56; x <= 42; x += 4.2) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.24), yellowTactile);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(x, 0.03, 26.5);
    terminalGroup.add(dash);
  }
  // Faixas de pedestres entrando no Terminal c/ aberturas largas
  [-17.2, -3.0, 6.0].forEach((cx) => {
    for (let sx = -2.2; sx <= 2.2; sx += 0.74) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 4.0), whiteLineMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(cx + sx, 0.032, 22.0);
      terminalGroup.add(stripe);
    }
  });

  // Gradil preto sobre mureta branca ao longo da Avenida (deixando entradas enormes livres)
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
  // Mureta azul longa nos fundos da baia do 402 (z = -27.2, deixa corredor largo atrás do ônibus)
  const blueLowWall = new THREE.Mesh(new THREE.BoxGeometry(52.0, 1.05, 0.45), blueTrimMat);
  blueLowWall.position.set(-14.0, 0.525, -27.2);
  blueLowWall.castShadow = true;
  terminalGroup.add(blueLowWall);
  addObstacleBox(-14.0, -27.2, 52.2, 0.65, terminalObstacles);

  // Torre Cilíndrica Azul da Caixa d'Água (afastada para fora dos corredores centrais)
  const waterTower = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.2, 11.5, 16), roofMat);
  waterTower.position.set(-24.5, 5.75, 16.5);
  waterTower.castShadow = true;
  terminalGroup.add(waterTower);
  const towerRing = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.35, 16), steelMat);
  towerRing.position.set(-24.5, 11.4, 16.5);
  terminalGroup.add(towerRing);
  addObstacleBox(-24.5, 16.5, 2.5, 2.5, terminalObstacles);

  // Canteiros verdes com árvores nas extremidades do Terminal (sem atrapalhar passagem)
  [
    [-30.0, 16.5],
    [5.0, 16.8],
    [-35.2, -16.5],
  ].forEach(([tx, tz]) => {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.42, 2.6), whiteWallMat);
    planter.position.set(tx, 0.21, tz);
    terminalGroup.add(planter);
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.34, 4.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 })
    );
    trunk.position.set(tx, 2.1, tz);
    terminalGroup.add(trunk);
    const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2, 1), bushMat);
    canopy.position.set(tx, 5.1, tz);
    canopy.castShadow = true;
    terminalGroup.add(canopy);
    addObstacleBox(tx, tz, 2.6, 2.6, terminalObstacles);
  });

  // Plataforma Coberta Super Expandida do Terminal CLP (x = -22.0..+6.0, z = -18.0..+14.0, y = 0.26)
  // Ampla circulação livre de 28m x 32m entre bancas, baia dos fundos (402) e rampas da Estação!
  const termMainPlaza = new THREE.Mesh(new THREE.BoxGeometry(28.0, 0.26, 32.0), paverMat);
  termMainPlaza.position.set(-8.0, 0.13, -2.0);
  termMainPlaza.receiveShadow = true;
  terminalGroup.add(termMainPlaza);

  const busCurbFront = new THREE.Mesh(new THREE.BoxGeometry(28.1, 0.28, 0.38), yellowTactile);
  busCurbFront.position.set(-8.0, 0.14, 13.9);
  terminalGroup.add(busCurbFront);
  const busCurbNorth = new THREE.Mesh(new THREE.BoxGeometry(28.1, 0.28, 0.38), yellowTactile);
  busCurbNorth.position.set(-8.0, 0.14, -17.9);
  terminalGroup.add(busCurbNorth);
  const busCurbWest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 32.1), yellowTactile);
  busCurbWest.position.set(-21.9, 0.14, -2.0);
  terminalGroup.add(busCurbWest);

  // Cobertura Azul Metálica Alta (7.7m) p/ câmera caber embaixo sem esconder o teto
  const termRoofMat = roofMat.clone();
  const termUnderMat = underRoofMat.clone();
  const addBlueCanopyWing = (cx, cz, w, d) => {
    const under = new THREE.Mesh(new THREE.BoxGeometry(w - 0.3, 0.18, d - 0.3), termUnderMat);
    under.position.set(cx, 7.35, cz);
    under.userData.cutY = 7.0;
    under.userData.baseMat = termUnderMat;
    terminalGroup.add(under);
    const fascia = new THREE.Mesh(new THREE.BoxGeometry(w, 0.65, d), termRoofMat);
    fascia.position.set(cx, 7.68, cz);
    fascia.castShadow = true;
    fascia.userData.cutY = 7.0;
    fascia.userData.baseMat = termRoofMat;
    terminalGroup.add(fascia);
    terminalRoofSlabs.push(under, fascia);
    [-d * 0.5 + 0.14, d * 0.5 - 0.14].forEach((dz) => {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(w, 0.32, 0.28), roofMat);
      beam.position.set(cx, 7.52, cz + dz);
      terminalGroup.add(beam);
    });
    const numTrusses = Math.max(3, Math.floor(w / 6));
    for (let i = 0; i <= numTrusses; i++) {
      const tx = cx - w * 0.44 + (i / numTrusses) * (w * 0.88);
      const truss = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, d - 0.6), steelMat);
      truss.position.set(tx, 7.16, cz);
      terminalGroup.add(truss);
    }
  };
  addBlueCanopyWing(-8.0, 6.2, 30.0, 14.5);
  addBlueCanopyWing(-11.0, -10.5, 32.0, 15.0);
  addBlueCanopyWing(-15.0, -21.5, 22.0, 8.5);

  // Apenas 6 colunas perimetrais bem espaçadas (centro e acessos 100% livres!)
  [
    [-20.8, 12.8], [-10.5, 12.8], [0.5, 12.8],
    [-20.8, -16.8], [-8.5, -16.8], [4.2, -16.8],
  ].forEach(([px, pz]) => {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 7.35, 12), blueTrimMat);
    col.position.set(px, 3.675, pz);
    col.castShadow = true;
    terminalGroup.add(col);
    addObstacleBox(px, pz, 0.55, 0.55, terminalObstacles);
  });

  // Placa Principal do Terminal
  const termSign = new THREE.Mesh(
    new THREE.BoxGeometry(10.5, 1.4, 0.22),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("TERMINAL URBANO CAMPO LIMPO PTA", "Av. Alfried Krupp • Expandido", "#1e3a8a", "#ffffff"),
    })
  );
  termSign.position.set(-7.5, 8.05, 13.55);
  terminalGroup.add(termSign);

  // Painel Eletrônico Azul de Horários embaixo do teto perto da baia
  const ledBoard = new THREE.Mesh(
    new THREE.BoxGeometry(4.0, 1.2, 0.22),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PAINEL DE HORÁRIOS CLP", "402 Pau Arcado • 401 Botujuru", "#0f172a", "#38bdf8"),
    })
  );
  ledBoard.position.set(-14.5, 5.4, -16.2);
  terminalGroup.add(ledBoard);

  // Guarita Azul & Branca deslocada p/ entrada frontal sul (fora das rampas e praça)
  const guarita = new THREE.Group();
  guarita.position.set(3.2, 0, 15.6);
  const gBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.25, 2.2), blueTrimMat);
  gBase.position.y = 0.625;
  const gTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.35, 2.2), whiteWallMat);
  gTop.position.y = 1.925;
  guarita.add(gBase, gTop);
  terminalGroup.add(guarita);
  addObstacleBox(3.2, 15.6, 2.5, 2.3, terminalObstacles);

  // Ônibus 402 PAU ARCADO na baia dos fundos bem espaçosa at (-15.0, 0, -22.2)
  const busTerm402 = createBusModel("402 PAU ARCADO", "Via Estrada do Garcia", 0x16a34a);
  busTerm402.position.set(-15.0, 0, -22.2);
  busTerm402.rotation.y = Math.PI / 2;
  terminalGroup.add(busTerm402);
  bus402TermMesh = busTerm402;
  addObstacleBox(-15.0, -22.2, 6.8, 2.7, terminalObstacles);

  const baySign = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.96, 0.16),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BAIA FUNDOS • 402 PAU ARCADO", "Embarque p/ Estrada do Garcia", "#14532d", "#facc15"),
    })
  );
  baySign.position.set(-15.0, 3.85, -18.5);
  terminalGroup.add(baySign);

  // Ônibus 401 Botujuru & Ônibus Municipal bem espaçados na pista oeste (x = -28.5)
  const busTerm401 = createBusModel("401 BOTUJURU", "Rápido Luxo Campinas", 0xea580c);
  busTerm401.position.set(-28.5, 0, 6.5);
  terminalGroup.add(busTerm401);
  addObstacleBox(-28.5, 6.5, 2.7, 6.8, terminalObstacles);

  const busMun = createBusModel("206 VILA SÃO JOSÉ", "Circular CLP", 0x0284c7);
  busMun.position.set(-28.5, 0, -6.5);
  terminalGroup.add(busMun);
  addObstacleBox(-28.5, -6.5, 2.7, 6.8, terminalObstacles);

  // Bancas do Produtor no Terminal at (-1.0, 0.26, 5.2) — 8.7m de corredor até o Pastel!
  const stall = new THREE.Group();
  stall.position.set(-1.0, 0.26, 5.2);
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.15, 1.7),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 })
  );
  counter.position.y = 0.575;
  counter.castShadow = true;
  stall.add(counter);
  const stallAwning = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 0.22, 2.3),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.65 })
  );
  stallAwning.position.set(0, 2.6, 0.15);
  stallAwning.rotation.x = 0.14;
  stall.add(stallAwning);
  [-1.3, -0.4, 0.5, 1.3].forEach((lx, idx) => {
    const veg = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.28, 1),
      new THREE.MeshStandardMaterial({ color: idx === 2 ? 0xa855f7 : 0x4ade80 })
    );
    veg.position.set(lx, 1.32, 0.2);
    stall.add(veg);
  });
  const stallSign = new THREE.Mesh(
    new THREE.BoxGeometry(4.3, 0.92, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("BANCAS DO TERMINAL", "Vender Colheita & Encomendas", "#14532d", "#fef08a"),
    })
  );
  stallSign.position.set(0, 3.25, 0.2);
  stall.add(stallSign);
  terminalGroup.add(stall);
  addObstacleBox(-1.0, 5.2, 4.5, 2.0, terminalObstacles);

  // Quiosque Madeira do Pastel & Caldo de Cana at (-13.8, 0.26, 5.2)
  const pastelStall = new THREE.Group();
  pastelStall.position.set(-13.8, 0.26, 5.2);
  const pCounter = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.15, 1.6),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.78 })
  );
  pCounter.position.y = 0.575;
  pCounter.castShadow = true;
  pastelStall.add(pCounter);
  const pAwning = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.22, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 })
  );
  pAwning.position.set(0, 2.55, 0.12);
  pastelStall.add(pAwning);
  const pSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 0.85, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PASTEL & CALDO DE CANA", "Energia + Insanidade -", "#991b1b", "#fef08a"),
    })
  );
  pSign.position.set(0, 3.15, 0.18);
  pastelStall.add(pSign);
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
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, lenZ), rubiMat);
    bar.position.set(9.8, 1.38, cz);
    terminalGroup.add(bar);
    addObstacleBox(9.8, cz, 0.55, lenZ, terminalObstacles);
  };
  addStationRail(-14.8, 18.4); // z = -24.0..-5.6
  addStationRail(6.5, 3.8);    // z = +4.6..+8.4
  addStationRail(17.8, 8.4);   // z = +13.6..+22.0
  // Limite leste da plataforma junto aos trilhos (deixa ~10.8m úteis de plataforma!)
  addObstacleBox(23.1, -1.0, 3.6, 48.0, terminalObstacles);

  // Prédio Histórico Creme & Tijolinho nos fundos da Estação
  const oldStationBody = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 4.4, 6.0),
    new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.82 })
  );
  oldStationBody.position.set(16.0, 3.15, -20.5);
  oldStationBody.castShadow = true;
  terminalGroup.add(oldStationBody);
  const oldStationRoof = new THREE.Mesh(
    new THREE.BoxGeometry(7.6, 0.55, 6.8),
    new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.8 })
  );
  oldStationRoof.position.set(16.0, 5.55, -20.5);
  terminalGroup.add(oldStationRoof);
  addObstacleBox(16.0, -20.5, 7.0, 6.2, terminalObstacles);

  // Fachada Branca Sul da Estação (posicionada ao sul sem obstruir a Rampa Sul)
  const whiteStHall = new THREE.Mesh(new THREE.BoxGeometry(4.4, 3.8, 4.6), whiteWallMat);
  whiteStHall.position.set(14.2, 2.85, 19.0);
  terminalGroup.add(whiteStHall);
  addObstacleBox(14.2, 19.0, 4.6, 4.8, terminalObstacles);

  // LOJA DA ESTAÇÃO CLP (Enxadas Especiais, Balde Vazio & Tesoura de Lã!) at (14.2, 0.95, -9.8) c/ amplo espaço ao redor
  const stShopGroup = new THREE.Group();
  stShopGroup.position.set(14.2, 0.95, -9.8);
  const stShopCounter = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 1.15, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.65 })
  );
  stShopCounter.position.y = 0.575;
  stShopCounter.castShadow = true;
  stShopGroup.add(stShopCounter);
  const stShopTop = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.14, 2.0),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
  );
  stShopTop.position.y = 1.2;
  stShopGroup.add(stShopTop);
  const stShopAwning = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.24, 2.4), rubiMat);
  stShopAwning.position.set(0, 2.75, 0);
  stShopGroup.add(stShopAwning);
  const dispBucket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.14, 0.34, 10),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.75, roughness: 0.25 })
  );
  dispBucket.position.set(-0.9, 1.44, 0.2);
  const dispBlade = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.08, 0.32),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.6, roughness: 0.25 })
  );
  dispBlade.position.set(0.05, 1.32, 0.2);
  const dispShear = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.06, 0.16),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.4, roughness: 0.35 })
  );
  dispShear.position.set(0.95, 1.31, 0.2);
  stShopGroup.add(dispBucket, dispBlade, dispShear);

  const stShopSign = new THREE.Mesh(
    new THREE.BoxGeometry(3.9, 0.95, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("LOJA DA ESTAÇÃO CLP", "Enxadas • Balde Leite • Tesoura", "#7f1d1d", "#fef08a"),
    })
  );
  stShopSign.position.set(0, 3.4, 0);
  stShopGroup.add(stShopSign);
  terminalGroup.add(stShopGroup);
  addObstacleBox(14.2, -9.8, 3.8, 2.0, terminalObstacles);

  const tactile = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 46.0), yellowTactile);
  tactile.position.set(21.1, 0.97, -1.0);
  terminalGroup.add(tactile);

  const stRoofMat = steelMat.clone();
  const stRoof = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.26, 30.0), stRoofMat);
  stRoof.position.set(15.6, 7.0, -1.0);
  stRoof.userData.cutY = 6.7;
  stRoof.userData.baseMat = stRoofMat;
  terminalGroup.add(stRoof);
  terminalRoofSlabs.push(stRoof);

  [-13.5, -6.2, 5.2, 14.2].forEach((pz) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 6.05, 0.28), steelMat);
    pillar.position.set(11.8, 3.975, pz);
    terminalGroup.add(pillar);
    addObstacleBox(11.8, pz, 0.4, 0.4, terminalObstacles);
  });

  const rubiBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1.05, 7.2),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CAMPO LIMPO PAULISTA", "Linha 7-Rubi • Sentido Botujuru", "#881337", "#ffffff"),
    })
  );
  rubiBoard.position.set(11.8, 5.4, 0);
  rubiBoard.rotation.y = -Math.PI / 2;
  terminalGroup.add(rubiBoard);

  // Passarela Elevada de Concreto deslocada ao setor norte (sem bloquear rampas)
  const overpassDeck = new THREE.Mesh(new THREE.BoxGeometry(19.0, 0.4, 2.9), concreteMat);
  overpassDeck.position.set(19.2, 6.2, -16.0);
  terminalGroup.add(overpassDeck);
  const overpassRail = new THREE.Mesh(new THREE.BoxGeometry(19.0, 0.95, 0.14), rubiMat);
  overpassRail.position.set(19.2, 6.85, -14.6);
  terminalGroup.add(overpassRail);
  const elevTower = new THREE.Mesh(new THREE.BoxGeometry(2.0, 7.2, 2.0), steelMat);
  elevTower.position.set(10.8, 3.6, -16.0);
  terminalGroup.add(elevTower);
  addObstacleBox(10.8, -16.0, 2.1, 2.1, terminalObstacles);
  const stairSlope = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.32, 2.2), concreteMat);
  stairSlope.position.set(7.8, 3.3, -16.0);
  stairSlope.rotation.z = 0.82;
  terminalGroup.add(stairSlope);

  const railMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
  const ballast = new THREE.Mesh(
    new THREE.BoxGeometry(9.0, 0.1, 80),
    new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 1 })
  );
  ballast.position.set(26.8, 0.05, 0);
  terminalGroup.add(ballast);

  [24.3, 25.7, 28.1, 29.5].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 80), railMat);
    rail.position.set(rx, 0.16, 0);
    terminalGroup.add(rail);
  });

  const trainTerm = createTrain7RubiModel("7-RUBI • BOTUJURU");
  trainTerm.position.set(25.0, 0.1, 0);
  terminalGroup.add(trainTerm);

  // Menino Maluquinho 3D (aparece no Terminal à noite para perseguir e atormentar o Alyffer!)
  const malu = new THREE.Group();
  const mSkin = new THREE.MeshStandardMaterial({ color: 0xf4cfa8, roughness: 0.65 });
  const mShirt = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.7 });
  const mShorts = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.75 });
  const mShoe = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55 });
  const potMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.65, roughness: 0.25 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });

  const mTorso = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.84, 0.4), mShirt);
  mTorso.position.y = 1.05;
  mTorso.castShadow = true;
  malu.add(mTorso);

  const mHead = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.54, 0.56), mSkin);
  mHead.position.y = 1.76;
  mHead.castShadow = true;
  malu.add(mHead);

  const mBlack = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const mLEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.05), mBlack);
  mLEye.position.set(-0.12, 1.8, 0.29);
  const mREye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.05), mBlack);
  mREye.position.set(0.12, 1.8, 0.29);
  const mSmile = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.05), new THREE.MeshBasicMaterial({ color: 0x991b1b }));
  mSmile.position.set(0, 1.62, 0.29);
  malu.add(mLEye, mREye, mSmile);

  const potGroup = new THREE.Group();
  potGroup.position.set(0, 2.12, 0);
  potGroup.rotation.z = -0.18;
  const potBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.44, 0.46, 16), potMat);
  potBody.castShadow = true;
  const potRim = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.06, 16), potMat);
  potRim.position.y = -0.22;
  const potHandle = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 0.1), handleMat);
  potHandle.position.set(0.58, 0.06, 0);
  potHandle.rotation.z = 0.25;
  potGroup.add(potBody, potRim, potHandle);
  malu.add(potGroup);

  const mLArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.64, 0.18), mSkin);
  mLArm.position.set(-0.46, 1.12, 0);
  const mRArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.64, 0.18), mSkin);
  mRArm.position.set(0.46, 1.12, 0);
  malu.add(mLArm, mRArm);

  const mLLeg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.56, 0.22), mShorts);
  mLLeg.position.set(-0.18, 0.36, 0);
  const mRLeg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.56, 0.22), mShorts);
  mRLeg.position.set(0.18, 0.36, 0);
  const mLShoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.34), mShoe);
  mLShoe.position.set(-0.18, 0.07, 0.05);
  const mRShoe = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.34), mShoe);
  mRShoe.position.set(0.18, 0.07, 0.05);
  malu.add(mLLeg, mRLeg, mLShoe, mRShoe);

  const maluTag = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 0.56),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("MENINO MALUQUINHO 🍲", "Atormentando no Terminal!", "#1e3a8a", "#facc15"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  maluTag.position.set(0, 2.95, 0);
  malu.add(maluTag);

  malu.visible = false;
  terminalGroup.add(malu);
  maluquinhoEntity = {
    mesh: malu,
    potGroup,
    lArm: mLArm,
    rArm: mRArm,
    lLeg: mLLeg,
    rLeg: mRLeg,
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
  name,
  roleSub = "Tecla E: Falar",
  skinColor,
  shirtColor,
  pantsColor,
  shoeColor,
  hairStyle, // "messy" | "sparse" | "long" | "short" | "bald" | "wavy_medium" | "curly_long"
  hairColor = 0x1e1b18,
  trenchCoat = false,
  redGlasses = false,
  squareGlasses = false,
  etecBadge = false,
  slimBody = false,
  bigHead = false,
}) {
  const npc = new THREE.Group();
  const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.65 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.75 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.45, metalness: 0.15 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.85 });

  const torsoW = slimBody ? 0.54 : 0.9;
  const torsoD = slimBody ? 0.32 : 0.5;
  const torso = new THREE.Mesh(new THREE.BoxGeometry(torsoW, 1.12, torsoD), shirtMat);
  torso.position.y = 1.4;
  torso.castShadow = true;
  npc.add(torso);

  if (trenchCoat) {
    // Sobretudo do Kaio Wendell
    const coatSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.68, 0.56), shirtMat);
    coatSkirt.position.y = 0.78;
    coatSkirt.castShadow = true;
    npc.add(coatSkirt);
    const lapel = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.8, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    lapel.position.set(0, 1.48, 0.26);
    npc.add(lapel);
  }

  if (etecBadge) {
    const badge = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.18, 0.04),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    badge.position.set(0, 1.58, 0.27);
    npc.add(badge);
  }

  // Grupo da cabeça (permite cabeça grande desproporcional em corpo fino!)
  const headScale = bigHead ? 1.62 : 1.0;
  const headGroup = new THREE.Group();
  headGroup.position.set(0, bigHead ? 2.5 : 2.32, 0);
  headGroup.scale.setScalar(headScale);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.66, 0.66), skinMat);
  head.castShadow = true;
  headGroup.add(head);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const lEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.05), eyeMat);
  lEye.position.set(-0.14, 0.04, 0.34);
  const rEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 0.05), eyeMat);
  rEye.position.set(0.14, 0.04, 0.34);
  headGroup.add(lEye, rEye);

  if (redGlasses) {
    // Óculos vermelho do Muzzonline
    const glassFrameMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const lRim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.06), glassFrameMat);
    lRim.position.set(-0.15, 0.04, 0.36);
    const rRim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.06), glassFrameMat);
    rRim.position.set(0.15, 0.04, 0.36);
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.06), glassFrameMat);
    bridge.position.set(0, 0.06, 0.36);
    headGroup.add(lRim, rRim, bridge);
  }

  if (squareGlasses) {
    // Óculos quadrados (Marcelo e B******)
    const sqFrameMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.4, roughness: 0.3 });
    const sqLensMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.42,
      metalness: 0.25,
      roughness: 0.15,
    });
    [-0.16, 0.16].forEach((gx) => {
      const topB = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.032, 0.045), sqFrameMat);
      topB.position.set(gx, 0.14, 0.355);
      const botB = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.032, 0.045), sqFrameMat);
      botB.position.set(gx, -0.05, 0.355);
      const leftB = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.21, 0.045), sqFrameMat);
      leftB.position.set(gx - 0.105, 0.045, 0.355);
      const rightB = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.21, 0.045), sqFrameMat);
      rightB.position.set(gx + 0.105, 0.045, 0.355);
      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.018), sqLensMat);
      lens.position.set(gx, 0.045, 0.35);
      headGroup.add(topB, botB, leftB, rightB, lens);
    });
    const sqBridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.032, 0.045), sqFrameMat);
    sqBridge.position.set(0, 0.07, 0.355);
    const tL = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.36), sqFrameMat);
    tL.position.set(-0.33, 0.07, 0.18);
    const tR = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.032, 0.36), sqFrameMat);
    tR.position.set(0.33, 0.07, 0.18);
    headGroup.add(sqBridge, tL, tR);
  }

  if (hairStyle === "messy") {
    const baseHair = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 0.72), hairMat);
    baseHair.position.set(0, 0.34, -0.02);
    headGroup.add(baseHair);
    [
      [-0.22, 0.5, 0.15, 0.35],
      [0.18, 0.52, -0.1, -0.4],
      [0, 0.54, 0.1, 0.2],
      [-0.1, 0.48, -0.22, -0.3],
      [0.26, 0.44, 0.12, 0.45],
    ].forEach(([hx, hy, hz, rot]) => {
      const tuft = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), hairMat);
      tuft.position.set(hx, hy, hz);
      tuft.rotation.z = rot;
      headGroup.add(tuft);
    });
  } else if (hairStyle === "sparse") {
    const topHair = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.2, 0.68), hairMat);
    topHair.position.set(0, 0.36, -0.02);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.32, 0.64), hairMat);
    sideL.position.set(-0.34, 0.16, -0.04);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.32, 0.64), hairMat);
    sideR.position.set(0.34, 0.16, -0.04);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.14), hairMat);
    back.position.set(0, 0.14, -0.31);
    const frontStrand = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.16), hairMat);
    frontStrand.position.set(-0.05, 0.35, 0.29);
    const wisp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.14), hairMat);
    wisp.position.set(0.16, 0.48, 0.06);
    wisp.rotation.z = -0.28;
    headGroup.add(topHair, sideL, sideR, back, frontStrand, wisp);
  } else if (hairStyle === "bald") {
    // Careca lustrosa do Marcelo!
    const shine = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
    );
    shine.scale.set(1.2, 0.28, 1.2);
    shine.position.set(0.12, 0.34, 0.12);
    headGroup.add(shine);
  } else if (hairStyle === "wavy_medium") {
    // Cabelo marrom escuro ondulado médio (B******)
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.22, 0.74), hairMat);
    top.position.set(0, 0.34, -0.02);
    headGroup.add(top);
    const backMid = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.72, 0.2), hairMat);
    backMid.position.set(0, -0.04, -0.32);
    headGroup.add(backMid);
    [-0.36, 0.36].forEach((sx, si) => {
      for (let w = 0; w < 3; w++) {
        const wave = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), hairMat);
        wave.scale.set(0.75, 1.15, 1.1);
        wave.position.set(sx + (w % 2 === 0 ? 0.03 : -0.03) * (si === 0 ? -1 : 1), 0.16 - w * 0.22, -0.02);
        headGroup.add(wave);
      }
    });
  } else if (hairStyle === "curly_long") {
    // Cabelo encaracolado longo volumoso (T*******)
    const top = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 10), hairMat);
    top.scale.set(1.05, 0.55, 1.05);
    top.position.set(0, 0.35, -0.03);
    headGroup.add(top);
    for (let row = 0; row < 5; row++) {
      const y = 0.22 - row * 0.2;
      [-0.38, 0.38].forEach((sx) => {
        const curl = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), hairMat);
        curl.position.set(sx + (row % 2 === 0 ? 0.04 : -0.04), y, -0.04);
        headGroup.add(curl);
      });
      [-0.24, 0, 0.24].forEach((bx) => {
        const backCurl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), hairMat);
        backCurl.position.set(bx, y, -0.34 - (row % 2) * 0.03);
        headGroup.add(backCurl);
      });
    }
  } else if (hairStyle === "long") {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.74), hairMat);
    top.position.set(0, 0.34, -0.02);
    const backLong = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.05, 0.18), hairMat);
    backLong.position.set(0, -0.17, -0.32);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.32), hairMat);
    sideL.position.set(-0.34, -0.14, -0.08);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.85, 0.32), hairMat);
    sideR.position.set(0.34, -0.14, -0.08);
    headGroup.add(top, backLong, sideL, sideR);
  } else {
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.7), hairMat);
    top.position.set(0, 0.33, -0.02);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.32, 0.14), hairMat);
    back.position.set(0, 0.12, -0.29);
    headGroup.add(top, back);
  }

  npc.add(headGroup);

  const armW = slimBody ? 0.14 : 0.24;
  const armX = slimBody ? 0.37 : 0.6;
  const lArm = new THREE.Mesh(new THREE.BoxGeometry(armW, 0.82, armW), trenchCoat ? shirtMat : skinMat);
  lArm.position.set(-armX, 1.4, 0);
  const rArm = new THREE.Mesh(new THREE.BoxGeometry(armW, 0.82, armW), trenchCoat ? shirtMat : skinMat);
  rArm.position.set(armX, 1.4, 0);
  npc.add(lArm, rArm);

  const legW = slimBody ? 0.18 : 0.3;
  const legX = slimBody ? 0.14 : 0.22;
  const lLeg = new THREE.Mesh(new THREE.BoxGeometry(legW, 0.8, legW), pantsMat);
  lLeg.position.set(-legX, 0.44, 0);
  const rLeg = new THREE.Mesh(new THREE.BoxGeometry(legW, 0.8, legW), pantsMat);
  rLeg.position.set(legX, 0.44, 0);
  npc.add(lLeg, rLeg);

  const lShoe = new THREE.Mesh(new THREE.BoxGeometry(legW + 0.03, 0.18, 0.38), shoeMat);
  lShoe.position.set(-legX, 0.09, 0.05);
  const rShoe = new THREE.Mesh(new THREE.BoxGeometry(legW + 0.03, 0.18, 0.38), shoeMat);
  rShoe.position.set(legX, 0.09, 0.05);
  npc.add(lShoe, rShoe);

  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 0.58),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(name, roleSub, "#0f172a", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  tag.position.set(0, bigHead ? 3.85 : 3.38, 0);
  npc.add(tag);

  return npc;
}

// 4. CAMPUS COMPLETO DA ETECAMP (Fiel à foto aérea: muros, entrada principal, estacionamento com portão automático, quadra aberta, fundos, entrada aberta do corredor e sala de automação!)
function buildEtecCampus() {
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0xb8bec6, roughness: 0.9 });
  const yardMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 });
  const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.92 });
  const parkingFloorMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.88 });
  const grassMat = new THREE.MeshStandardMaterial({ color: 0x4b8b3b, roughness: 0.95 });
  const buildingMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.8 });
  const roofCorrugMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.88 });
  const cpsRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.58 });
  const salmonWallMat = new THREE.MeshStandardMaterial({ color: 0xd98a76, roughness: 0.84 });
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

  // Terreno externo e árvores ao redor dos muros
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), grassMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  etecGroup.add(ground);

  // Pátio cimentado interno dentro de todos os muros (x = -33.6..33.6, z = -28.6..19.6)
  const campusFloor = new THREE.Mesh(new THREE.BoxGeometry(67.2, 0.12, 48.2), concreteMat);
  campusFloor.position.set(0, 0.06, -4.5);
  campusFloor.receiveShadow = true;
  etecGroup.add(campusFloor);

  // Calçada externa + Rua João Julião Moreira (frente da ETECAMP)
  const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(92, 0.14, 3.2), yardMat);
  sidewalk.position.set(0, 0.07, 21.6);
  sidewalk.receiveShadow = true;
  etecGroup.add(sidewalk);

  const street = new THREE.Mesh(new THREE.PlaneGeometry(110, 6.8), asphaltMat);
  street.rotation.x = -Math.PI / 2;
  street.position.set(0, 0.04, 26.5);
  street.receiveShadow = true;
  etecGroup.add(street);

  for (let dx = -48; dx <= 48; dx += 5.0) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.18), yellowMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(dx, 0.055, 26.5);
    etecGroup.add(dash);
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
    new THREE.BoxGeometry(7.8, 1.05, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ENTRADA PRINCIPAL (FRENTE)", "ETECAMP • ← Estacionamento | Corredor ↑ | Quadra →", "#991b1b", "#fef08a"),
    })
  );
  mainGateSign.position.set(0, 4.55, 20.38);
  etecGroup.add(mainGateSign);

  // Caixa d'água cilíndrica branca icônica ao lado da Entrada Principal (igual à foto!)
  const waterTower = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.38, 9.6, 20), whiteMat);
  waterTower.position.set(6.0, 4.8, 17.8);
  waterTower.castShadow = true;
  etecGroup.add(waterTower);
  const towerCap = new THREE.Mesh(new THREE.CylinderGeometry(1.42, 1.42, 0.28, 20), steelMat);
  towerCap.position.set(6.0, 9.68, 17.8);
  etecGroup.add(towerCap);
  addObstacleBox(6.0, 17.8, 2.9, 2.9, etecObstacles);

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
  const autoGateSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTACIONAMENTO • PORTÃO AUTOMÁTICO", "Aproxime-se para abrir automaticamente", "#1e293b", "#fde047"),
    })
  );
  autoGateSign.position.set(-24.0, 3.65, 20.35);
  etecGroup.add(autoGateSign);

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
    const bodyMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.35, roughness: 0.45 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.75, 4.1), bodyMat);
    body.position.y = 0.62;
    body.castShadow = true;
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.62, 2.1), glassMat);
    cabin.position.set(0, 1.25, -0.15);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 1.9), bodyMat);
    roof.position.set(0, 1.58, -0.15);
    car.add(body, cabin, roof);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
    [
      [-0.95, 0.34, 1.25],
      [0.95, 0.34, 1.25],
      [-0.95, 0.34, -1.25],
      [0.95, 0.34, -1.25],
    ].forEach(([wx, wy, wz]) => {
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 10), wheelMat);
      wh.rotation.z = Math.PI / 2;
      wh.position.set(wx, wy, wz);
      car.add(wh);
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

  // ===================== QUADRA POLIESPORTIVA (DIREITA — TUDO ABERTO!) =====================
  const court = new THREE.Mesh(
    new THREE.PlaneGeometry(16.5, 19.5),
    new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.86 })
  );
  court.rotation.x = -Math.PI / 2;
  court.position.set(23.2, 0.145, 6.2);
  court.receiveShadow = true;
  etecGroup.add(court);

  // Marcações brancas da quadra (bordas, linha central e círculo central)
  [
    [23.2, 15.6, 15.4, 0.16],
    [23.2, -3.2, 15.4, 0.16],
    [15.5, 6.2, 0.16, 18.8],
    [30.9, 6.2, 0.16, 18.8],
    [23.2, 6.2, 15.4, 0.16],
  ].forEach(([lx, lz, lw, ld]) => {
    const ln = new THREE.Mesh(new THREE.PlaneGeometry(lw, ld), whiteMat);
    ln.rotation.x = -Math.PI / 2;
    ln.position.set(lx, 0.155, lz);
    etecGroup.add(ln);
  });
  const centerRing = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.26, 28), whiteMat);
  centerRing.rotation.x = -Math.PI / 2;
  centerRing.position.set(23.2, 0.155, 6.2);
  etecGroup.add(centerRing);

  // Tabela e Cesta de Basquete ISOLADA ao lado da janela da parede leste (sem traves/outras cestas!)
  const hoopGroup = new THREE.Group();
  hoopGroup.position.set(12.6, 0.12, 1.6);
  const hoopPad = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.68), darkMetalMat);
  hoopPad.position.set(0, 0.09, 0);
  const hoopPole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 3.62, 12), steelMat);
  hoopPole.position.set(0, 1.84, 0);
  hoopPole.castShadow = true;
  const hoopArm = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.13, 0.13), steelMat);
  hoopArm.position.set(0.36, 3.45, 0);
  const hoopFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.22, 1.90), darkMetalMat);
  hoopFrame.position.set(0.65, 3.48, 0);
  const hoopBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, 1.12, 1.80),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 })
  );
  hoopBoard.position.set(0.71, 3.48, 0);
  hoopBoard.castShadow = true;
  const rimOrangeMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.4 });
  const sqTop = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.05, 0.62), rimOrangeMat);
  sqTop.position.set(0.76, 3.66, 0);
  const sqBot = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.05, 0.62), rimOrangeMat);
  sqBot.position.set(0.76, 3.20, 0);
  const sqL = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.50, 0.05), rimOrangeMat);
  sqL.position.set(0.76, 3.43, -0.29);
  const sqR = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.50, 0.05), rimOrangeMat);
  sqR.position.set(0.76, 3.43, 0.29);
  const hoopRim = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 10, 20), rimOrangeMat);
  hoopRim.rotation.x = Math.PI / 2;
  hoopRim.position.set(1.06, 3.12, 0);
  const hoopNet = new THREE.Mesh(
    new THREE.CylinderGeometry(0.30, 0.19, 0.44, 12, 2, true),
    new THREE.MeshBasicMaterial({ color: 0xf8fafc, wireframe: true })
  );
  hoopNet.position.set(1.06, 2.88, 0);
  hoopGroup.add(hoopPad, hoopPole, hoopArm, hoopFrame, hoopBoard, sqTop, sqBot, sqL, sqR, hoopRim, hoopNet);
  etecGroup.add(hoopGroup);
  addObstacleBox(12.6, 1.6, 0.78, 0.78, etecObstacles);

  const courtSign = new THREE.Mesh(
    new THREE.BoxGeometry(4.6, 0.9, 0.12),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("QUADRA ETECAMP", "Área Aberta • Arremesse na Cesta! 🏀", "#14532d", "#fef08a"),
    })
  );
  courtSign.position.set(33.4, 2.35, 6.2);
  courtSign.rotation.y = -Math.PI / 2;
  etecGroup.add(courtSign);

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

  // Blocos de telhado das salas (3 blocos por ala com faixa vermelha CPS nas bordas igual à foto!)
  [-11.8, -4.0, 3.8].forEach((bz) => {
    [-7.1, 7.1].forEach((bx) => {
      const blkRoof = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.32, 7.0), roofCorrugMat);
      blkRoof.position.set(bx, 4.76, bz);
      blkRoof.castShadow = true;
      const blkBand = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.55, 7.2), cpsRedMat);
      blkBand.position.set(bx, 4.45, bz);
      etecGroup.add(blkRoof, blkBand);
    });
  });

  // Janelas nas fachadas frente, fundos e laterais
  [-8.0, -5.0, 5.0, 8.0].forEach((wx) => {
    const winF = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.2, 0.14), glassMat);
    winF.position.set(wx, 2.55, 8.06);
    const winB = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.2, 0.14), glassMat);
    winB.position.set(wx, 2.55, -16.06);
    etecGroup.add(winF, winB);
  });
  [-11.5, -6.5, 5.0].forEach((wz) => {
    const winW = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.2, 2.4), glassMat);
    winW.position.set(-11.06, 2.55, wz);
    const winE = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.2, 2.4), glassMat);
    winE.position.set(11.06, 2.55, wz);
    etecGroup.add(winW, winE);
  });

  // 1) ENTRADA FRONTAL DO CORREDOR COM AS SALAS (reto após o Portão Principal!)
  const frontAwning = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 2.6), cpsRedMat);
  frontAwning.position.set(0, 3.35, 9.2);
  etecGroup.add(frontAwning);
  const frontDoor = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.85, 0.16), darkMetalMat);
  frontDoor.position.set(0, 1.425, 8.05);
  etecGroup.add(frontDoor);
  const frontDoorSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.95, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("CORREDOR & SALAS • ETECAMP", "Entrar (E): 3AI, 2AI, 1AI, Labs & Cantina", "#7f1d1d", "#fef08a"),
    })
  );
  frontDoorSign.position.set(0, 3.95, 10.45);
  etecGroup.add(frontDoorSign);

  // 2) ENTRADA LATERAL DO ESTACIONAMENTO PARA O CORREDOR (parede oeste x = -11.0, z = 1.0)
  const parkAwning = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.25, 4.2), cpsRedMat);
  parkAwning.position.set(-12.0, 3.25, 1.0);
  etecGroup.add(parkAwning);
  const parkDoor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.75, 2.6), blueGateMat);
  parkDoor.position.set(-11.06, 1.375, 1.0);
  etecGroup.add(parkDoor);
  const parkDoorSign = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.85, 4.0),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ENTRADA P/ CORREDOR", "Acesso pelo Estacionamento (E)", "#1e3a8a", "#fef08a"),
    })
  );
  parkDoorSign.position.set(-13.0, 3.7, 1.0);
  etecGroup.add(parkDoorSign);

  // 3) ENTRADA ABERTA (CORREDOR) NOS FUNDOS (z = -16.0 — pilares azuis + cobertura igual à foto!)
  const backArchGroup = new THREE.Group();
  backArchGroup.position.set(0, 0, -16.0);
  [-2.15, 2.15].forEach((px) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.05, 0.42), pillarBlueMat);
    col.position.set(px, 1.525, -2.1);
    col.castShadow = true;
    backArchGroup.add(col);
  });
  const backHeader = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.42, 2.5), whiteMat);
  backHeader.position.set(0, 3.18, -1.2);
  const backBlueTrim = new THREE.Mesh(new THREE.BoxGeometry(5.14, 0.2, 2.54), pillarBlueMat);
  backBlueTrim.position.set(0, 2.95, -1.2);
  const backGableL = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.16, 2.7), roofCorrugMat);
  backGableL.position.set(-1.3, 3.75, -1.2);
  backGableL.rotation.z = 0.34;
  const backGableR = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.16, 2.7), roofCorrugMat);
  backGableR.position.set(1.3, 3.75, -1.2);
  backGableR.rotation.z = -0.34;
  const backOpenVoid = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.85, 0.16), darkMetalMat);
  backOpenVoid.position.set(0, 1.425, -0.06);
  const backArchSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.0, 0.85, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ENTRADA ABERTA (CORREDOR)", "Entrar no Corredor pelos Fundos (E)", "#1e3a8a", "#ffffff"),
    })
  );
  backArchSign.position.set(0, 4.35, -2.42);
  backArchSign.rotation.y = Math.PI;
  backArchGroup.add(backHeader, backBlueTrim, backGableL, backGableR, backOpenVoid, backArchSign);
  etecGroup.add(backArchGroup);

  // ===================== PARTE EXTERNA (FUNDOS) =====================
  const backYardSign = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 0.9, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("PARTE EXTERNA (FUNDOS)", "Área dos Fundos • ETECAMP", "#14532d", "#fef08a"),
    })
  );
  backYardSign.position.set(-12.0, 2.2, -28.55);
  etecGroup.add(backYardSign);

  // Bancos de concreto na parte externa dos fundos
  [-15.5, -7.5, 8.5].forEach((bx) => {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.52, 0.65), yardMat);
    bench.position.set(bx, 0.38, -24.5);
    bench.castShadow = true;
    etecGroup.add(bench);
    addObstacleBox(bx, -24.5, 2.5, 0.8, etecObstacles);
  });

  // Árvores frondosas na parte externa dos fundos e atrás dos muros (fiel à foto!)
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.95 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.85 });
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
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.4, 2.8, 8), trunkMat);
    trunk.position.y = 1.4;
    trunk.castShadow = true;
    const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(2.15, 0), leafMat);
    crown.position.y = 3.7;
    crown.castShadow = true;
    tr.add(trunk, crown);
    etecGroup.add(tr);
    if (inside) addObstacleBox(tx, tz, 1.0, 1.0, etecObstacles);
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

  const autoSign = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.95, 5.4),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SALA DE AUTOMAÇÃO", "Robótica, CLPs & Esteira Industrial", "#0f172a", "#38bdf8"),
    })
  );
  autoSign.position.set(16.18, 3.45, -20.7);
  etecGroup.add(autoSign);

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

  const botRoof = new THREE.Mesh(new THREE.BoxGeometry(20.0, 0.22, 4.4), steelMat);
  botRoof.position.set(0, 4.15, 32.6);
  etecGroup.add(botRoof);
  [-8.0, 8.0].forEach((px) => {
    const bP = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.4, 0.24), steelMat);
    bP.position.set(px, 2.45, 32.6);
    etecGroup.add(bP);
  });

  const botTotem = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, 1.15, 0.24),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ESTAÇÃO BOTUJURU", "Linha 7-Rubi • Volta Terminal CLP (E)", "#881337", "#ffffff"),
    })
  );
  botTotem.position.set(0, 3.25, 30.8);
  etecGroup.add(botTotem);

  const trainBot = createTrain7RubiModel("7-RUBI • TERMINAL CLP");
  trainBot.rotation.y = Math.PI / 2;
  trainBot.position.set(0, 0.1, 36.8);
  etecGroup.add(trainBot);
}
buildEtecCampus();

// 5. INTERIOR EXPANDIDO DA ETECAMP (32m x 77m — 14 Salas fiéis à foto real!)
// Salas: 3AI (Pão & Muzzonline), 2AI, 1AI (Félix), 3A, 2A, 1A, Convivência,
// Lab Info 24 (B****** & T*******), Lab Info 15, Lab Info 7,
// Lab Química (Kaio Wendell + Bancada NPK), Lab Enfermagem, Cantina & Sala de Projetos + Marcelo!
function buildEtecInside() {
  const concreteTex = createTileFloorTexture("#9aa09c", "#8d938f", 32);
  const floorMat = new THREE.MeshStandardMaterial({ map: concreteTex, roughness: 0.72 });
  const corridorTileMat = new THREE.MeshStandardMaterial({
    map: createTileFloorTexture("#e2e8f0", "#cbd5e1", 26),
    roughness: 0.65,
  });
  const hallWallMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
  // Cores fiéis à foto real das salas da ETECAMP!
  const classGreenWallMat = new THREE.MeshStandardMaterial({ color: 0x507d4a, roughness: 0.86 });
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
  const pcCaseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55 });
  const nurseWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
  const nurseMintMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
  const lockerMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.5 });

  // Geometrias compartilhadas para carteiras + cadeiras atrás (alta performance!)
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

  // Iluminação fluorescente ao longo dos 77m do prédio
  [-27.5, -16.5, -5.5, 5.5, 16.5, 27.5, 38.5].forEach((lz) => {
    const ptC = new THREE.PointLight(0xffffff, 0.42, 26);
    ptC.position.set(0, 4.4, lz);
    etecInsideGroup.add(ptC);
    [-9.8, 9.8].forEach((lx) => {
      const lampBar = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.08, 0.38),
        new THREE.MeshBasicMaterial({ color: 0xf8fafc })
      );
      lampBar.position.set(lx, 4.72, lz);
      etecInsideGroup.add(lampBar);
    });
  });

  // Piso Geral (32m x 77m: x = -16..16, z = -33..44)
  const floor = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.24, 77.4), floorMat);
  floor.position.set(0, -0.12, 5.5);
  floor.receiveShadow = true;
  etecInsideGroup.add(floor);

  // Piso claro no Corredor Central (x = -3.8..+3.8)
  const corridorFloor = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 77.0), corridorTileMat);
  corridorFloor.rotation.x = -Math.PI / 2;
  corridorFloor.position.set(0, 0.012, 5.5);
  etecInsideGroup.add(corridorFloor);

  // Teto interno da ETEC (FrontSide voltado p/ baixo: visível em 1ª pessoa)
  const etecCeiling = new THREE.Mesh(
    new THREE.PlaneGeometry(32.4, 77.4),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.9, side: THREE.FrontSide })
  );
  etecCeiling.rotation.x = Math.PI / 2;
  etecCeiling.position.set(0, 4.8, 5.5);
  etecInsideGroup.add(etecCeiling);

  // Paredes Externas (Norte, Oeste, Leste, Sul)
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(32.4, 4.8, 0.3), hallWallMat);
  backWall.position.set(0, 2.4, -33.15);
  const redStripeBack = new THREE.Mesh(new THREE.BoxGeometry(32.2, 0.5, 0.34), cpsRedMat);
  redStripeBack.position.set(0, 4.15, -33.12);
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 77.4), classGreenWallMat);
  leftWall.position.set(-16.15, 2.4, 5.5);
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.8, 77.4), classGreenWallMat);
  rightWall.position.set(16.15, 2.4, 5.5);
  const frontWall = new THREE.Mesh(
    new THREE.PlaneGeometry(32.4, 4.8),
    new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85, side: THREE.FrontSide })
  );
  frontWall.rotation.y = Math.PI;
  frontWall.position.set(0, 2.4, 44.15);
  etecInsideGroup.add(backWall, redStripeBack, leftWall, rightWall, frontWall);

  function addInteriorWall(cx, cz, w, d, mat = classGreenWallMat) {
    const wMesh = new THREE.Mesh(new THREE.BoxGeometry(w, 4.2, d), mat);
    wMesh.position.set(cx, 2.1, cz);
    wMesh.receiveShadow = true;
    etecInsideGroup.add(wMesh);
    addObstacleBox(cx, cz, w, d, etecInsideObstacles);
  }

  // Carteira + 1 Cadeira ATRÁS idêntica à foto enviada!
  function createPhotoDeskAndChair(x, z, withPC = false) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);

    // Tampo branco
    const top = new THREE.Mesh(gDeskTop, deskTopMat);
    top.position.y = 0.76;
    top.castShadow = true;
    g.add(top);

    // Pernas de ferro verde escuro + pés horizontais + gradinha embaixo
    [-0.48, 0.48].forEach((lx) => {
      const post = new THREE.Mesh(gDeskLegV, greenSteelMat);
      post.position.set(lx, 0.38, 0);
      const foot = new THREE.Mesh(gDeskFoot, greenSteelMat);
      foot.position.set(lx, 0.02, 0);
      g.add(post, foot);
    });
    const basket = new THREE.Mesh(gDeskBasket, greenSteelMat);
    basket.position.set(0, 0.62, 0);
    g.add(basket);

    // Computador (nos Laboratórios de Informática 24, 15 e 7)
    if (withPC) {
      const mon = new THREE.Mesh(gMonitor, pcScreenMat);
      mon.position.set(-0.08, 1.06, -0.14);
      const stand = new THREE.Mesh(gMonStand, pcCaseMat);
      stand.position.set(-0.08, 0.84, -0.14);
      const kb = new THREE.Mesh(gKeyboard, pcCaseMat);
      kb.position.set(-0.08, 0.8, 0.14);
      const cpu = new THREE.Mesh(gCpu, pcCaseMat);
      cpu.position.set(0.38, 0.98, -0.06);
      g.add(mon, stand, kb, cpu);
    }

    // CADEIRA ATRÁS DA MESA (+z), voltada para o quadro branco (-z)!
    const cz = 0.56;
    const seat = new THREE.Mesh(gChairSeat, chairWoodMat);
    seat.position.set(0, 0.45, cz);
    const back = new THREE.Mesh(gChairBack, chairWoodMat);
    back.position.set(0, 0.78, cz + 0.21);
    g.add(seat, back);
    [
      [-0.21, cz - 0.18],
      [0.21, cz - 0.18],
      [-0.21, cz + 0.18],
      [0.21, cz + 0.18],
    ].forEach(([cx, clz]) => {
      const cl = new THREE.Mesh(gChairLeg, greenSteelMat);
      cl.position.set(cx, 0.22, clz);
      g.add(cl);
    });
    [-0.21, 0.21].forEach((ux) => {
      const up = new THREE.Mesh(gChairUp, greenSteelMat);
      up.position.set(ux, 0.65, cz + 0.21);
      g.add(up);
    });

    etecInsideGroup.add(g);
    addObstacleBox(x, z + 0.22, 1.14, 1.18, etecInsideObstacles);
  }

  // Construtor fiel de Sala de Aula / Lab Info da ETECAMP (12.2m x 11m)
  function buildPhotoRoom({ side, bandIndex, code, subtitle, isComputerLab = false, customKind = null }) {
    const isWest = side === "west";
    const zMin = -33 + bandIndex * 11;
    const zMax = zMin + 11;
    const zCenter = (zMin + zMax) * 0.5;
    const xCenter = isWest ? -9.9 : 9.9;
    const corrX = isWest ? -3.8 : 3.8;
    const outerX = isWest ? -15.95 : 15.95;

    // Parede divisória Sul da sala (se não for a última)
    if (bandIndex < 6) {
      addInteriorWall(xCenter, zMax, 12.1, 0.26, classGreenWallMat);
    }

    // Parede do Corredor com porta ampla de 2.6m perto da frente da sala (igual à foto!)
    // Porta fica de zMin + 1.0 até zMin + 3.6
    const doorZ1 = zMin + 1.0;
    const doorZ2 = zMin + 3.6;
    const doorMidZ = (doorZ1 + doorZ2) * 0.5;
    addInteriorWall(corrX, zMin + 0.5, 0.26, 1.0, hallWallMat);
    addInteriorWall(corrX, (doorZ2 + zMax) * 0.5, 0.26, zMax - doorZ2, hallWallMat);

    // Folha da Porta Azul Royal aberta p/ dentro ao lado da entrada + maçaneta prateada!
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.35, 0.08), blueDoorMat);
    doorPanel.position.set(corrX + (isWest ? -0.62 : 0.62), 1.175, doorZ1 + 0.08);
    const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.14), silverMat);
    doorHandle.position.set(corrX + (isWest ? -0.95 : 0.95), 1.05, doorZ1 + 0.12);
    etecInsideGroup.add(doorPanel, doorHandle);

    // Placa do Corredor identificando a sala acima da porta!
    const hallPlaque = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.72, 2.7),
      new THREE.MeshBasicMaterial({
        map: createWoodSignTexture(
          code,
          subtitle,
          isComputerLab ? "#1e3a8a" : customKind === "chem" ? "#0f766e" : customKind === "nurse" ? "#065f46" : "#14532d",
          "#fef08a"
        ),
      })
    );
    hallPlaque.position.set(corrX + (isWest ? 0.2 : -0.2), 2.95, doorMidZ);
    etecInsideGroup.add(hallPlaque);

    if (customKind === "cantina" || customKind === "lounge") {
      // Ambientes especiais (Cantina / Convivência)
      const roomSign = new THREE.Mesh(
        new THREE.BoxGeometry(5.2, 1.25, 0.1),
        new THREE.MeshBasicMaterial({
          map: createWoodSignTexture(code, subtitle, "#991b1b", "#fef08a"),
        })
      );
      roomSign.position.set(xCenter, 2.8, zMin + 0.24);
      etecInsideGroup.add(roomSign);

      if (customKind === "cantina") {
        const counter = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.1, 1.3), cpsRedMat);
        counter.position.set(xCenter + 1.2, 0.55, zMin + 2.2);
        etecInsideGroup.add(counter);
        addObstacleBox(xCenter + 1.2, zMin + 2.2, 5.3, 1.4, etecInsideObstacles);
        [zCenter + 1.2, zCenter + 3.6].forEach((tz) => {
          const tbl = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.82, 1.25), chairWoodMat);
          tbl.position.set(xCenter, 0.41, tz);
          etecInsideGroup.add(tbl);
          addObstacleBox(xCenter, tz, 4.3, 1.35, etecInsideObstacles);
        });
      } else {
        // Sala de Convivência / Armários CPS
        [-2.2, 1.6].forEach((ox) => {
          const lk = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.2, 4.4), lockerMat);
          lk.position.set(xCenter + ox, 1.1, zCenter + 1.0);
          etecInsideGroup.add(lk);
          addObstacleBox(xCenter + ox, zCenter + 1.0, 0.8, 4.5, etecInsideObstacles);
        });
      }
      return;
    }

    // --- DETALHES FIÉIS À FOTO EM TODAS AS SALAS & LABS ---
    // 1. Revestimento interno verde-oliva na parede norte da sala + faixa de madeira marrom em todas as paredes!
    const frontGreen = new THREE.Mesh(new THREE.PlaneGeometry(11.9, 4.2), classGreenWallMat);
    frontGreen.position.set(xCenter, 2.1, zMin + 0.16);
    etecInsideGroup.add(frontGreen);

    const trimFront = new THREE.Mesh(new THREE.BoxGeometry(11.9, 0.13, 0.06), woodTrimMat);
    trimFront.position.set(xCenter, 0.96, zMin + 0.18);
    const trimOuter = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.13, 10.6), woodTrimMat);
    trimOuter.position.set(outerX + (isWest ? 0.05 : -0.05), 0.96, zCenter);
    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(11.9, 0.13, 0.06), woodTrimMat);
    trimBack.position.set(xCenter, 0.96, zMax - 0.18);
    etecInsideGroup.add(trimFront, trimOuter, trimBack);

    // 2. Quadro Branco com moldura de alumínio na parede frontal (igual à foto!)
    const wbFrame = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.55, 0.08), silverMat);
    wbFrame.position.set(xCenter + (isWest ? -0.9 : 0.9), 2.15, zMin + 0.22);
    const wbSurface = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.38), whiteboardMat);
    wbSurface.position.set(xCenter + (isWest ? -0.9 : 0.9), 2.15, zMin + 0.27);
    etecInsideGroup.add(wbFrame, wbSurface);

    // Quadro de avisos na parede lateral externa
    const noticeBoard = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, 1.7), whiteboardMat);
    noticeBoard.position.set(outerX + (isWest ? 0.08 : -0.08), 2.1, zCenter - 1.2);
    etecInsideGroup.add(noticeBoard);

    // 3. Ventilador de parede com grade laranja + eletroduto vertical no canto (igual à foto!)
    const fanX = outerX + (isWest ? 0.36 : -0.36);
    const fanZ = zMin + 1.15;
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
      // --- LABORATÓRIO DE QUÍMICA (Kaio Wendell + Bancada NPK + Reagentes!) ---
      const chemBanner = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 1.25, 0.06),
        new THREE.MeshBasicMaterial({
          map: createWoodSignTexture("LAB. DE QUÍMICA • ETECAMP", "Kaio Wendell • Síntese NPK", "#0f766e", "#fef08a"),
        })
      );
      chemBanner.position.set(xCenter + 0.9, 2.15, zMin + 0.28);
      etecInsideGroup.add(chemBanner);

      // Armário de reagentes e capela química
      const reagentCab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.1, 0.7), labGranite);
      reagentCab.position.set(xCenter - 2.6, 1.05, zCenter + 3.2);
      etecInsideGroup.add(reagentCab);
      addObstacleBox(xCenter - 2.6, zCenter + 3.2, 2.7, 0.8, etecInsideObstacles);

      // Bancada Química NPK interativa em (12.4, 0, 2.2)!
      const benchX = 12.4;
      const benchZ = 2.2;
      const chemBench = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.02, 1.35), labGranite);
      chemBench.position.set(benchX, 0.51, benchZ);
      etecInsideGroup.add(chemBench);
      addObstacleBox(benchX, benchZ, 4.5, 1.45, etecInsideObstacles);
      [
        [benchX - 1.5, 0x38bdf8],
        [benchX - 0.75, 0x4ade80],
        [benchX, 0xec4899],
        [benchX + 0.75, 0xa855f7],
        [benchX + 1.5, 0xfacc15],
      ].forEach(([fx, col]) => {
        const flask = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.18, 0.44, 10),
          new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.35 })
        );
        flask.position.set(fx, 1.24, benchZ);
        etecInsideGroup.add(flask);
      });
      const benchSign = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 0.58, 0.08),
        new THREE.MeshBasicMaterial({
          map: createWoodSignTexture("BANCADA NPK DO KAIO", "Tecla E: Sintetizar Adubo", "#0f172a", "#38bdf8"),
        })
      );
      benchSign.position.set(benchX, 1.82, benchZ + 0.72);
      etecInsideGroup.add(benchSign);
      return;
    }

    if (customKind === "nurse") {
      // --- LABORATÓRIO DE ENFERMAGEM (Maca Hospitalar + Armário Cruz Verde + Curativos!) ---
      const nurseBanner = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 1.25, 0.06),
        new THREE.MeshBasicMaterial({
          map: createWoodSignTexture("LAB. DE ENFERMAGEM • ETECAMP", "Saúde & Primeiros Socorros", "#065f46", "#fef08a"),
        })
      );
      nurseBanner.position.set(xCenter + 0.9, 2.15, zMin + 0.28);
      etecInsideGroup.add(nurseBanner);

      // Maca hospitalar de enfermagem (interativa em (8.7, 0, 18.9)!)
      const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.72, 1.05), silverMat);
      bedFrame.position.set(xCenter - 1.2, 0.36, zCenter + 2.4);
      const bedSheet = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.2, 0.96), nurseWhiteMat);
      bedSheet.position.set(xCenter - 1.2, 0.8, zCenter + 2.4);
      const bedPillow = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.14, 0.72), nurseMintMat);
      bedPillow.position.set(xCenter - 2.0, 0.94, zCenter + 2.4);
      const bedSign = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.52, 0.08),
        new THREE.MeshBasicMaterial({
          map: createWoodSignTexture("ENFERMARIA • CURATIVO", "Tecla E: Recuperar Vida (+HP)", "#065f46", "#fef08a"),
        })
      );
      bedSign.position.set(xCenter - 1.2, 1.55, zCenter + 2.4);
      etecInsideGroup.add(bedFrame, bedSheet, bedPillow, bedSign);
      addObstacleBox(xCenter - 1.2, zCenter + 2.4, 2.3, 1.15, etecInsideObstacles);

      // Armário de medicamentos + Cruz verde + Mesa de triagem
      const medCab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.1, 0.65), nurseWhiteMat);
      medCab.position.set(xCenter + 4.4, 1.05, zCenter + 2.6);
      const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.05), nurseMintMat);
      crossV.position.set(xCenter + 4.4, 1.55, zCenter + 2.25);
      const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.16, 0.05), nurseMintMat);
      crossH.position.set(xCenter + 4.4, 1.55, zCenter + 2.25);
      const triageDesk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.0), nurseWhiteMat);
      triageDesk.position.set(xCenter + 2.2, 0.425, zCenter - 1.6);
      etecInsideGroup.add(medCab, crossV, crossH, triageDesk);
      addObstacleBox(xCenter + 4.4, zCenter + 2.6, 1.5, 0.75, etecInsideObstacles);
      addObstacleBox(xCenter + 2.2, zCenter - 1.6, 2.5, 1.1, etecInsideObstacles);
      return;
    }

    // 4. Fileiras de Carteiras + Cadeira ATRÁS (3 colunas x 3 fileiras = 9 mesas por sala!)
    const colOffsets = [-3.1, 0.0, 3.1];
    const rowZ = [zMin + 4.3, zMin + 6.65, zMin + 9.0];
    colOffsets.forEach((ox) => {
      rowZ.forEach((rz) => {
        createPhotoDeskAndChair(xCenter + ox, rz, isComputerLab);
      });
    });
  }

  // ===================== ALA OESTE: SALAS 3AI, 2AI, 1AI, 3A, 2A, 1A, CONVIVÊNCIA =====================
  buildPhotoRoom({ side: "west", bandIndex: 0, code: "SALA 3AI", subtitle: "Pão & Muzzonline" });
  buildPhotoRoom({ side: "west", bandIndex: 1, code: "SALA 2AI", subtitle: "Ensino Médio + Info" });
  buildPhotoRoom({ side: "west", bandIndex: 2, code: "SALA 1AI", subtitle: "Félix • Missões PAC" });
  buildPhotoRoom({ side: "west", bandIndex: 3, code: "SALA 3A", subtitle: "3º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "west", bandIndex: 4, code: "SALA 2A", subtitle: "2º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "west", bandIndex: 5, code: "SALA 1A", subtitle: "1º Ano A • ETECAMP" });
  buildPhotoRoom({ side: "west", bandIndex: 6, code: "CONVIVÊNCIA CPS", subtitle: "Armários & Mural", customKind: "lounge" });

  // ===================== ALA LESTE: LABS 24, 15, 7, QUÍMICA, ENFERMAGEM, CANTINA, PROJETOS =====================
  buildPhotoRoom({ side: "east", bandIndex: 0, code: "LAB. INFO 24", subtitle: "B****** & T*******", isComputerLab: true });
  buildPhotoRoom({ side: "east", bandIndex: 1, code: "LAB. INFO 15", subtitle: "Informática • PCs", isComputerLab: true });
  buildPhotoRoom({ side: "east", bandIndex: 2, code: "LAB. INFO 7", subtitle: "Informática • Redes", isComputerLab: true });
  buildPhotoRoom({ side: "east", bandIndex: 3, code: "LAB. QUÍMICA", subtitle: "Kaio Wendell • Adubo", customKind: "chem" });
  buildPhotoRoom({ side: "east", bandIndex: 4, code: "LAB. ENFERMAGEM", subtitle: "Saúde & Curativos", customKind: "nurse" });
  buildPhotoRoom({ side: "east", bandIndex: 5, code: "CANTINA ETECAMP", subtitle: "Salgados & Resenha", customKind: "cantina" });
  buildPhotoRoom({ side: "east", bandIndex: 6, code: "SALA PROJETOS", subtitle: "TCC & Feira CPS" });

  // Letreiro Principal no Fundo do Corredor + Saída no Sul (z = +42.4)
  const cpsCenterSign = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 1.5, 0.14),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ETECAMP • CAMPO LIMPO PAULISTA", "3AI..1AI • Labs Info • Química • Enfermagem", "#7f1d1d", "#ffffff"),
    })
  );
  cpsCenterSign.position.set(0, 2.85, -32.92);
  etecInsideGroup.add(cpsCenterSign);

  const exitMat = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.05, 1.4),
    new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.85 })
  );
  exitMat.position.set(0, 0.025, 42.4);
  etecInsideGroup.add(exitMat);

  const exitBoard = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 0.72, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SAIR P/ ENTRADA PRINCIPAL", "Pátio Aberto • Quadra • Estação", "#7f1d1d", "#fef08a"),
    })
  );
  exitBoard.position.set(0, 0.65, 43.5);
  etecInsideGroup.add(exitBoard);

  // Saída Aberta nos Fundos do Corredor (z = -31.4 -> Parte Externa Fundos)
  const exitBackMat = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.05, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.85 })
  );
  exitBackMat.position.set(0, 0.025, -31.4);
  etecInsideGroup.add(exitBackMat);

  const exitBackBoard = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.72, 0.1),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("ENTRADA ABERTA • SAIR P/ FUNDOS", "Parte Externa Fundos & Sala de Automação", "#1e3a8a", "#ffffff"),
    })
  );
  exitBackBoard.position.set(0, 0.95, -32.6);
  etecInsideGroup.add(exitBackBoard);

  // Saída Lateral do Corredor para o Estacionamento (x = -3.4, z = 40.2)
  const exitParkMat = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.05, 2.2),
    new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.85 })
  );
  exitParkMat.position.set(-3.15, 0.025, 40.2);
  etecInsideGroup.add(exitParkMat);

  const exitParkBoard = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.76, 3.0),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture("SAIR P/ ESTACIONAMENTO", "Acesso lateral ao estacionamento (E)", "#0f766e", "#fef08a"),
    })
  );
  exitParkBoard.position.set(-3.62, 2.15, 40.2);
  etecInsideGroup.add(exitParkBoard);

  // ===================== TODOS OS NPCs DA ETECAMP NAS SUAS SALAS EXATAS =====================
  const npcSpecs = [
    {
      id: "muzzonline",
      name: "Muzzonline",
      roleSub: "Sala 3AI • +Insanidade",
      pos: new THREE.Vector3(-7.0, 0, -30.5), // Sala 3AI (West Band 0)
      yaw: 0.25,
      skinColor: 0xf3d2b8,
      shirtColor: 0x9ca3af,
      pantsColor: 0x6b7280,
      shoeColor: 0xdc2626,
      hairStyle: "messy",
      hairColor: 0x261c15,
      redGlasses: true,
    },
    {
      id: "pao",
      name: "Pão",
      roleSub: "Sala 3AI • Missões",
      pos: new THREE.Vector3(-12.2, 0, -30.5), // Sala 3AI (West Band 0)
      yaw: 0.15,
      skinColor: 0x8d5524,
      shirtColor: 0xdc2626,
      pantsColor: 0x1d4ed8,
      shoeColor: 0xf8fafc,
      hairStyle: "short",
      hairColor: 0x171717,
      etecBadge: true,
    },
    {
      id: "felix",
      name: "Félix",
      roleSub: "Sala 1AI • Missões PAC",
      pos: new THREE.Vector3(-9.6, 0, -8.4), // Sala 1AI (West Band 2)
      yaw: 0.1,
      skinColor: 0xf3d2b8,
      shirtColor: 0x111827,
      pantsColor: 0x1e293b,
      shoeColor: 0x27272a,
      hairStyle: "long",
      hairColor: 0x1c140d,
    },
    {
      id: "kaio",
      name: "Kaio Wendell",
      roleSub: "Lab Química • Adubo",
      pos: new THREE.Vector3(7.6, 0, 2.8), // Lab Química (East Band 3)
      yaw: -0.3,
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
      pos: new THREE.Vector3(7.5, 0, -30.5), // Lab Info 24 (East Band 0)
      yaw: -0.2,
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
      pos: new THREE.Vector3(12.2, 0, -30.5), // Lab Info 24 (East Band 0)
      yaw: -0.35,
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
      roleSub: "Segurança & Vaselina",
      pos: new THREE.Vector3(1.6, 0, 12.0), // Corredor Principal da ETECAMP
      yaw: -0.15,
      skinColor: 0xdca580,
      shirtColor: 0x0f172a,
      pantsColor: 0x1e293b,
      shoeColor: 0x09090b,
      hairStyle: "bald",
      squareGlasses: true,
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

// Rain Particle System (follows player XZ so rain covers any outdoor location!)
function buildRainSystem() {
  const dropGeo = new THREE.BoxGeometry(0.04, 0.7, 0.04);
  const dropMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 200; i++) {
    const drop = new THREE.Mesh(dropGeo, dropMat);
    drop.position.set((Math.random() - 0.5) * 44, Math.random() * 20 + 1, (Math.random() - 0.5) * 44);
    rainGroup.add(drop);
    rainDrops.push(drop);
  }
}
buildRainSystem();

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

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.68, 0.68), skinMat);
  head.position.y = 2.34;
  head.castShadow = true;
  group.add(head);

  const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.36, 0.16), hairMat);
  hairBack.position.set(0, 2.42, -0.3);
  group.add(hairBack);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  leftEye.position.set(-0.14, 2.38, 0.34);
  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.05), eyeMat);
  rightEye.position.set(0.14, 2.38, 0.34);
  group.add(leftEye, rightEye);

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
    leftEye,
    rightEye,
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
  // Reanexa Regador e Enxada na mão direita da skin ativa para que apareçam em todas as skins!
  const { canGroup, hoeGroup } = playerMesh.userData;
  if (canGroup && hoeGroup && !activeRig.isStatic) {
    const handHost = activeRig.rightForearm || activeRig.rightArm;
    if (handHost) {
      const yOff = activeRig.rightForearm ? -0.34 : -0.78;
      if (canGroup.parent !== handHost) handHost.add(canGroup);
      if (hoeGroup.parent !== handHost) handHost.add(hoeGroup);
      canGroup.position.set(0, yOff, 0.24);
      hoeGroup.position.set(0, yOff, 0.16);
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

  fpToolGroup.add(fpCan, fpHoe);
  fpToolGroup.userData = { fpCan, fpHoe };
}
camera.add(fpToolGroup);

// Optimized Shared Geometry & Material Cache for Garden Plots
const plots = [];
const plotHitMeshes = [];

const SOIL_COLORS = {
  raw: 0x6b7f3e,
  tilled: 0x7c5333,
  watered: 0x422817,
};

const SHARED_GEOS = {
  sproutLeaf: new THREE.BoxGeometry(0.14, 0.16, 0.06),
  lettuceCore2: new THREE.DodecahedronGeometry(0.15, 1),
  lettuceCore3: new THREE.DodecahedronGeometry(0.24, 1),
  lettuceLeaf2: new THREE.BoxGeometry(0.16, 0.18, 0.05),
  lettuceLeaf3: new THREE.BoxGeometry(0.26, 0.28, 0.08),
  stem2: new THREE.CylinderGeometry(0.03, 0.04, 0.48, 6),
  stem3: new THREE.CylinderGeometry(0.04, 0.05, 0.75, 6),
  bush2: new THREE.DodecahedronGeometry(0.18, 1),
  bush3: new THREE.DodecahedronGeometry(0.28, 1),
  berry: new THREE.SphereGeometry(0.085, 8, 8),
  frond2: new THREE.ConeGeometry(0.06, 0.25, 5),
  frond3: new THREE.ConeGeometry(0.09, 0.38, 5),
  carrotRoot: new THREE.ConeGeometry(0.11, 0.22, 8),
  cornCob: new THREE.CylinderGeometry(0.065, 0.075, 0.24, 8),
};

const SHARED_MATS = {};
function getCachedMat(colorHex, roughness = 0.7) {
  const key = `${colorHex}_${roughness}`;
  if (!SHARED_MATS[key]) {
    SHARED_MATS[key] = new THREE.MeshStandardMaterial({ color: colorHex, roughness });
  }
  return SHARED_MATS[key];
}

function createPlotMesh(index, x, z) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x7a4e2a, roughness: 0.85 });
  const frameOuter = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.24, 2.55), woodMat);
  frameOuter.position.y = 0.12;
  frameOuter.castShadow = true;
  frameOuter.receiveShadow = true;
  group.add(frameOuter);

  const soilMat = new THREE.MeshStandardMaterial({ color: SOIL_COLORS.raw, roughness: 0.95 });
  const soilMesh = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.26, 2.25), soilMat);
  soilMesh.position.y = 0.13;
  soilMesh.receiveShadow = true;
  group.add(soilMesh);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.45, 1.62, 4),
    new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.rotation.z = Math.PI / 4;
  ring.position.y = 0.06;
  ring.visible = false;
  group.add(ring);

  const lockGroup = new THREE.Group();
  const stake = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.18), woodMat);
  stake.position.y = 0.45;
  lockGroup.add(stake);
  const lockPlate = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.1), getCachedMat(0x9ca3af, 0.8));
  lockPlate.position.y = 0.78;
  lockGroup.add(lockPlate);
  group.add(lockGroup);

  const cropGroup = new THREE.Group();
  cropGroup.position.y = 0.26;
  group.add(cropGroup);

  const readyHalo = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.2, 0),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 })
  );
  readyHalo.position.y = 1.45;
  readyHalo.visible = false;
  group.add(readyHalo);

  // Indicador 3D de planta precisando de água (gotinha azul flutuante)
  const dryDrop = new THREE.Mesh(
    new THREE.ConeGeometry(0.13, 0.28, 8),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  dryDrop.position.y = 1.12;
  dryDrop.visible = false;
  group.add(dryDrop);

  exteriorGroup.add(group);
  soilMesh.userData.plotIndex = index;
  frameOuter.userData.plotIndex = index;
  plotHitMeshes.push(soilMesh, frameOuter);

  return {
    index,
    x,
    z,
    group,
    frameOuter,
    soilMesh,
    soilMat,
    ring,
    lockGroup,
    cropGroup,
    readyHalo,
    dryDrop,
    popTimer: 0,
    unlocked: index < 6,
    stage: "raw",
    cropId: null,
    growth: 0,
    waterTimer: 0,
    fertilized: false,
    visualStage: -1,
    visualCropId: null,
  };
}

// Horta principal ampliada: 6x6 = 36 canteiros base (índices 0..35)
for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 6; c++) {
    const idx = r * 6 + c;
    const px = -8.25 + c * 3.1;
    const pz = -6.5 + r * 3.1;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 0;
    plots.push(pl);
  }
}
// +12 Canteiros na Expansão Oeste (Terreno Nível 1: índices 36..47)
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 3; c++) {
    const idx = 36 + r * 3 + c;
    const px = -49.0 + c * 3.3;
    const pz = -5.5 + r * 3.3;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 1;
    pl.unlocked = false;
    pl.group.visible = false;
    plots.push(pl);
  }
}
// +12 Canteiros na Expansão Leste (Terreno Nível 2: índices 48..59)
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 3; c++) {
    const idx = 48 + r * 3 + c;
    const px = 39.5 + c * 3.3;
    const pz = -5.5 + r * 3.3;
    const pl = createPlotMesh(idx, px, pz);
    pl.landReq = 2;
    pl.unlocked = false;
    pl.group.visible = false;
    plots.push(pl);
  }
}

// Construtor 3D de Animais da Fazenda (Vaca, Ovelha e Porco)
function createLivestockMesh(animal) {
  const g = new THREE.Group();
  const type = animal.type;
  const legMeshes = [];
  let headRef = null;
  let woolGroup = null;

  function addPivotedAnimalLeg(lx, hipY, lz, w, h, d, mat) {
    const lg = new THREE.Group();
    lg.position.set(lx, hipY, lz);
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.y = -h * 0.5;
    mesh.castShadow = true;
    lg.add(mesh);
    g.add(lg);
    legMeshes.push(lg);
  }

  if (type === "cow") {
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.78 });
    const spotMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.82 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.7 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.6 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.88, 1.65), whiteMat);
    body.position.y = 1.05;
    body.castShadow = true;
    g.add(body);
    [
      [-0.49, 1.12, 0.3],
      [0.49, 0.96, -0.25],
      [0, 1.5, 0.1],
    ].forEach(([sx, sy, sz]) => {
      const sp = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.42), spotMat);
      sp.position.set(sx, sy, sz);
      g.add(sp);
    });
    const udder = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.24, 0.44), pinkMat);
    udder.position.set(0, 0.56, -0.28);
    g.add(udder);
    const head = new THREE.Group();
    head.position.set(0, 1.38, 1.02);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.6, 0.64), whiteMat);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.28, 0.24), pinkMat);
    snout.position.set(0, -0.14, 0.36);
    head.add(skull, snout);
    [-0.24, 0.24].forEach((hx) => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.26, 6), hornMat);
      horn.position.set(hx, 0.38, -0.07);
      horn.rotation.z = hx < 0 ? 0.3 : -0.3;
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), spotMat);
      eye.position.set(hx * 0.7, 0.08, 0.33);
      head.add(horn, eye);
    });
    g.add(head);
    headRef = head;
    [
      [-0.32, 0.76, 0.58],
      [0.32, 0.76, 0.58],
      [-0.32, 0.76, -0.58],
      [0.32, 0.76, -0.58],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.2, 0.76, 0.2, spotMat));
  } else if (type === "sheep") {
    const woolMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.95 });
    const shavedMat = new THREE.MeshStandardMaterial({ color: 0xebb3a4, roughness: 0.88 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
    // Corpo tosquiado (sem lã, visível quando animal.sheared === true!)
    const shavedBody = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.54, 0.98), shavedMat);
    shavedBody.position.y = 0.78;
    shavedBody.castShadow = true;
    g.add(shavedBody);

    // Camada de Lã (oculta após tosquia com a tesoura!)
    woolGroup = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.72, 1.15), woolMat);
    body.position.y = 0.82;
    body.castShadow = true;
    const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45, 1), woolMat);
    puff.position.set(0, 1.02, 0);
    puff.scale.set(1.05, 0.72, 1.25);
    woolGroup.add(body, puff);

    const head = new THREE.Group();
    head.position.set(0, 1.0, 0.72);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.48), darkMat);
    const sEyeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    sEyeL.position.set(-0.12, 0.06, 0.24);
    const sEyeR = sEyeL.clone();
    sEyeR.position.x = 0.12;
    const topWool = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.42), woolMat);
    topWool.position.set(0, 0.25, -0.04);
    head.add(skull, sEyeL, sEyeR);
    woolGroup.add(topWool);
    topWool.position.set(0, 1.25, 0.68);
    woolGroup.visible = !animal.sheared;
    g.add(woolGroup, head);
    headRef = head;
    [
      [-0.24, 0.52, 0.38],
      [0.24, 0.52, 0.38],
      [-0.24, 0.52, -0.38],
      [0.24, 0.52, -0.38],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.15, 0.52, 0.15, darkMat));
  } else {
    // Porco Caipira
    const pigMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.72 });
    const snoutMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.65 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.64, 1.12), pigMat);
    body.position.y = 0.66;
    body.castShadow = true;
    g.add(body);
    const head = new THREE.Group();
    head.position.set(0, 0.84, 0.72);
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.5, 0.52), pigMat);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.18), snoutMat);
    snout.position.set(0, -0.08, 0.3);
    head.add(skull, snout);
    [-0.14, 0.14].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.05), eyeMat);
      eye.position.set(ex, 0.08, 0.27);
      head.add(eye);
    });
    g.add(head);
    headRef = head;
    const tail = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 6, 10), pigMat);
    tail.position.set(0, 0.76, -0.6);
    g.add(tail);
    [
      [-0.24, 0.4, 0.36],
      [0.24, 0.4, 0.36],
      [-0.24, 0.4, -0.36],
      [0.24, 0.4, -0.36],
    ].forEach(([lx, ly, lz]) => addPivotedAnimalLeg(lx, ly, lz, 0.16, 0.4, 0.16, pigMat));
  }

  const readyHalo = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.MeshBasicMaterial({ color: 0xfacc15 })
  );
  readyHalo.position.set(0, 2.25, 0);
  readyHalo.visible = !!animal.hasProduct;
  g.add(readyHalo);

  const info = ANIMAL_TYPES[type];
  const tag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 0.46),
    new THREE.MeshBasicMaterial({
      map: createWoodSignTexture(`${info.emoji} ${animal.name}`, `${info.label}`, "#14532d", "#fef08a"),
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  tag.position.set(0, 1.92, 0);
  g.add(tag);

  g.position.set(animal.x, 0, animal.z);
  if (animal.isBaby) g.scale.setScalar(0.65);
  return { mesh: g, legs: legMeshes, head: headRef, woolGroup, readyHalo, animal };
}

function spawnYardChicken(idx, isBaby = false) {
  const henMat = new THREE.MeshStandardMaterial({ color: 0xfef9ef, roughness: 0.8 });
  const combMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
  const hen = new THREE.Group();
  const hBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.54), henMat);
  hBody.position.y = 0.28;
  hBody.castShadow = true;
  const hHead = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), henMat);
  hHead.position.set(0, 0.52, 0.24);
  const hComb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.14), combMat);
  hComb.position.set(0, 0.67, 0.24);
  const hBeak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 4), beakMat);
  hBeak.rotation.x = Math.PI / 2;
  hBeak.position.set(0, 0.5, 0.4);
  hen.add(hBody, hHead, hComb, hBeak);
  if (isBaby) hen.scale.setScalar(0.65);

  const hx = THREE.MathUtils.clamp(-27.2 + (idx % 4) * 2.1 + (Math.random() - 0.5) * 0.6, -29.2, -18.8);
  const hz = THREE.MathUtils.clamp(-22.8 + Math.floor(idx / 4) * 2.2 + (Math.random() - 0.5) * 0.6, -25.2, -14.2);
  hen.position.set(hx, 0, hz);
  exteriorGroup.add(hen);
  chickens.push({
    mesh: hen,
    home: new THREE.Vector3(-24.2, 0, -19.2),
    target: new THREE.Vector3(hx, 0, hz),
    wait: Math.random() * 2,
    isBaby,
  });
}

function syncChickensToCount(targetCount = 3, babyCount = 0) {
  const count = THREE.MathUtils.clamp(Math.round(targetCount || 3), 1, 12);
  while (chickens.length > 0) {
    const c = chickens.pop();
    if (c && c.mesh) exteriorGroup.remove(c.mesh);
  }
  for (let i = 0; i < count; i++) {
    const isBaby = babyCount > 0 && i >= count - babyCount;
    spawnYardChicken(i, isBaby);
  }
}

function rebuildLivestockMeshes() {
  while (livestockGroup.children.length > 0) {
    livestockGroup.remove(livestockGroup.children[0]);
  }
  livestockEntities.length = 0;
  state.animals.forEach((a) => {
    if (!a.alive) return;
    const pen = getAnimalPenBounds(a.type);
    a.x = THREE.MathUtils.clamp(a.x, pen.minX, pen.maxX);
    a.z = THREE.MathUtils.clamp(a.z, pen.minZ, pen.maxZ);
    const ent = createLivestockMesh(a);
    ent.target = new THREE.Vector3(a.x, 0, a.z);
    ent.wait = Math.random() * 2;
    livestockGroup.add(ent.mesh);
    livestockEntities.push(ent);
  });
}

function buildCropVisual(plot) {
  while (plot.cropGroup.children.length > 0) {
    plot.cropGroup.remove(plot.cropGroup.children[0]);
  }
  if (!plot.cropId || (plot.stage !== "growing" && plot.stage !== "ready")) {
    plot.visualStage = -1;
    plot.visualCropId = null;
    return;
  }

  const crop = CROPS[plot.cropId];
  const stageLevel = plot.stage === "ready" ? 3 : plot.growth > 0.55 ? 2 : 1;
  plot.visualStage = stageLevel;
  plot.visualCropId = plot.cropId;

  const offsets = [
    [-0.36, -0.36],
    [0.36, -0.36],
    [-0.36, 0.36],
    [0.36, 0.36],
  ];

  offsets.forEach(([ox, oz]) => {
    const plant = new THREE.Group();
    plant.position.set(ox, 0, oz);

    if (stageLevel === 1) {
      const leafMat = getCachedMat(0x86efac, 0.7);
      const l1 = new THREE.Mesh(SHARED_GEOS.sproutLeaf, leafMat);
      l1.position.set(-0.06, 0.08, 0);
      l1.rotation.z = 0.4;
      const l2 = new THREE.Mesh(SHARED_GEOS.sproutLeaf, leafMat);
      l2.position.set(0.06, 0.08, 0);
      l2.rotation.z = -0.4;
      plant.add(l1, l2);
    } else if (crop.style.startsWith("lettuce")) {
      const isFull = stageLevel === 3;
      const isGold = crop.style === "lettuce_gold";
      const isGuloso = crop.style === "lettuce_guloso";
      const scale = (isFull ? 1.0 : 0.62) * (isGuloso ? 1.32 : isGold ? 1.15 : 1.0);
      const outerMat = isGold
        ? new THREE.MeshStandardMaterial({
            color: crop.leafColor,
            emissive: 0xca8a04,
            emissiveIntensity: 0.42,
            metalness: 0.45,
            roughness: 0.25,
          })
        : getCachedMat(crop.leafColor, 0.72);
      const innerMat = isGold
        ? new THREE.MeshStandardMaterial({
            color: crop.color,
            emissive: 0xfacc15,
            emissiveIntensity: 0.55,
            metalness: 0.5,
            roughness: 0.2,
          })
        : getCachedMat(crop.color, 0.65);

      const core = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceCore3 : SHARED_GEOS.lettuceCore2, innerMat);
      core.position.y = 0.22 * scale;
      core.scale.setScalar(isGuloso ? 1.28 : isGold ? 1.12 : 1.0);
      core.castShadow = true;
      plant.add(core);

      const leafCount = crop.style === "lettuce_round" ? 5 : isGuloso ? 8 : 6;
      for (let k = 0; k < leafCount; k++) {
        const ang = (k / leafCount) * Math.PI * 2;
        const leaf = new THREE.Mesh(isFull ? SHARED_GEOS.lettuceLeaf3 : SHARED_GEOS.lettuceLeaf2, outerMat);
        leaf.position.set(Math.cos(ang) * 0.2 * scale, 0.18 * scale, Math.sin(ang) * 0.2 * scale);
        leaf.rotation.y = -ang + Math.PI / 2;
        leaf.rotation.x = crop.style === "lettuce_round" ? 0.28 : 0.55;
        leaf.scale.setScalar(isGuloso ? 1.25 : isGold ? 1.1 : 1.0);
        leaf.castShadow = true;
        plant.add(leaf);
      }
    } else if (crop.style === "tomato" || crop.style === "strawberry") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.65;
      const stem = new THREE.Mesh(isFull ? SHARED_GEOS.stem3 : SHARED_GEOS.stem2, getCachedMat(0x15803d, 0.8));
      stem.position.y = 0.32 * scale;
      plant.add(stem);

      const bush = new THREE.Mesh(isFull ? SHARED_GEOS.bush3 : SHARED_GEOS.bush2, getCachedMat(crop.leafColor, 0.8));
      bush.position.y = 0.44 * scale;
      bush.castShadow = true;
      plant.add(bush);

      if (isFull) {
        const fruitMat = getCachedMat(crop.color, 0.35);
        [
          [0.18, 0.38, 0.14],
          [-0.17, 0.5, 0.1],
          [0.05, 0.42, -0.2],
        ].forEach(([tx, ty, tz]) => {
          const fruit = new THREE.Mesh(SHARED_GEOS.berry, fruitMat);
          fruit.position.set(tx, ty, tz);
          plant.add(fruit);
        });
      }
    } else if (crop.style === "carrot") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.65;
      const topMat = getCachedMat(crop.leafColor, 0.8);
      for (let k = 0; k < 3; k++) {
        const frond = new THREE.Mesh(isFull ? SHARED_GEOS.frond3 : SHARED_GEOS.frond2, topMat);
        frond.position.set((k - 1) * 0.07, 0.22 * scale, 0);
        frond.rotation.z = (k - 1) * 0.25;
        plant.add(frond);
      }
      if (isFull) {
        const root = new THREE.Mesh(SHARED_GEOS.carrotRoot, getCachedMat(crop.color, 0.6));
        root.rotation.x = Math.PI;
        root.position.y = 0.07;
        plant.add(root);
      }
    } else if (crop.style === "corn") {
      const isFull = stageLevel === 3;
      const scale = isFull ? 1.0 : 0.68;
      const stalk = new THREE.Mesh(isFull ? SHARED_GEOS.stem3 : SHARED_GEOS.stem2, getCachedMat(0x16a34a, 0.8));
      stalk.position.y = 0.38 * scale;
      stalk.scale.y = 1.25;
      plant.add(stalk);
      const leafMat = getCachedMat(crop.leafColor, 0.78);
      [-1, 1].forEach((side) => {
        const leaf = new THREE.Mesh(SHARED_GEOS.lettuceLeaf2, leafMat);
        leaf.position.set(side * 0.11, 0.34 * scale, 0);
        leaf.rotation.z = side * -0.7;
        plant.add(leaf);
      });
      if (isFull) {
        const cob = new THREE.Mesh(SHARED_GEOS.cornCob, getCachedMat(crop.color, 0.5));
        cob.position.set(0.08, 0.45, 0.04);
        cob.rotation.z = -0.35;
        plant.add(cob);
      }
    } else if (crop.style === "wheat") {
      const isFull = stageLevel === 3;
      const stalkH = isFull ? 1.0 : 0.6;
      const wMat = getCachedMat(isFull ? crop.color : crop.leafColor, 0.72);
      [-0.08, 0, 0.08].forEach((wx, idx) => {
        const reed = new THREE.Mesh(isFull ? SHARED_GEOS.frond3 : SHARED_GEOS.frond2, wMat);
        reed.position.set(wx, 0.24 * stalkH, (idx - 1) * 0.04);
        reed.rotation.z = (idx - 1) * 0.12;
        plant.add(reed);
      });
    }

    plot.cropGroup.add(plant);
  });
}

function refreshPlotAppearance(plot) {
  plot.lockGroup.visible = !plot.unlocked;
  plot.frameOuter.material.color.setHex(plot.unlocked ? 0x7a4e2a : 0x4b5563);

  if (!plot.unlocked) {
    plot.soilMat.color.setHex(0x4a5543);
  } else if (plot.stage === "raw") {
    plot.soilMat.color.setHex(SOIL_COLORS.raw);
  } else if (plot.fertilized && plot.waterTimer > 0) {
    plot.soilMat.color.setHex(0x283618); // Terra adubada e molhada
  } else if (plot.waterTimer > 0) {
    plot.soilMat.color.setHex(SOIL_COLORS.watered);
  } else if (plot.fertilized) {
    plot.soilMat.color.setHex(0x544b2c);
  } else {
    plot.soilMat.color.setHex(SOIL_COLORS.tilled);
  }

  plot.readyHalo.visible = plot.unlocked && plot.stage === "ready";
  if (plot.dryDrop) {
    plot.dryDrop.visible =
      plot.unlocked &&
      plot.stage === "growing" &&
      plot.waterTimer <= 0 &&
      !state.isRainy &&
      state.upgrades.autoWaterLevel < 2;
  }

  const desiredStage = !plot.unlocked
    ? -1
    : plot.stage === "ready"
    ? 3
    : plot.stage === "growing"
    ? plot.growth > 0.55
      ? 2
      : 1
    : -1;

  if (desiredStage !== plot.visualStage || plot.cropId !== plot.visualCropId) {
    buildCropVisual(plot);
  }
}

// Pooled Particle System for Zero-GC Smoothness
const PARTICLE_POOL_SIZE = 60;
const particlePool = [];
const particleGeo = new THREE.BoxGeometry(0.13, 0.13, 0.13);
for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
  const mat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 1 });
  const mesh = new THREE.Mesh(particleGeo, mat);
  mesh.visible = false;
  scene.add(mesh);
  particlePool.push({
    mesh,
    vel: new THREE.Vector3(),
    life: 0,
    maxLife: 0.75,
    active: false,
  });
}

function spawnParticles(pos, color = 0x4ade80, count = 10) {
  let spawned = 0;
  for (let i = 0; i < PARTICLE_POOL_SIZE && spawned < count; i++) {
    const pt = particlePool[i];
    if (!pt.active) {
      pt.active = true;
      pt.mesh.visible = true;
      pt.mesh.material.color.setHex(color);
      pt.mesh.material.opacity = 1;
      pt.mesh.scale.setScalar(1);
      pt.mesh.position.copy(pos);
      pt.vel.set((Math.random() - 0.5) * 4.5, Math.random() * 4 + 1.5, (Math.random() - 0.5) * 4.5);
      pt.life = 0.5 + Math.random() * 0.25;
      pt.maxLife = 0.75;
      spawned++;
    }
  }
}

function createDefaultPhoneState() {
  return {
    unread: 3,
    resenhaFollowers: 44, // Referência fiel ao @only_resenha_
    resenhaPostsCount: 600, // Referência fiel aos 600 posts
    likedIds: [],
    userPosts: [],
    postedFakeToday: false,
    instaLikes: {},
    userInstaPosts: [],
    postedInstaToday: false,
    zapReplies: {},
    gameHighScore: 0,
  };
}

// Game State
const state = {
  mode: "start", // start | playing | paused | modal
  location: "yard", // yard | room | basement | terminal | etec | etec_inside
  basementStep: 0,
  basementUnlocked: false,
  machoSkin: "clone_classic",
  money: 40,
  day: 1,
  dayMinutes: 7 * 60, // 07:00
  isRainy: false,
  reputation: 1,
  insanity: 0,
  isCrazy: false,
  isLambiHomem: false,
  lambiTriggeredDay: 0,
  lambiUntilDay: 0,
  knockedNpcs: {},
  visitedEtecToday: false,
  coringaTimer: 0,
  currentCoringaLine: "",
  energyTimer: 0, // Speed boost from Pastel/Caldo de Cana or Coffee
  vaselina: 0, // Frascos de Vaselina do Marcelo
  vaselinaTimer: 0, // Boost turbinado de velocidade da Vaselina!
  npkDoneToday: false,
  automationDoneToday: false,
  goalScoredToday: false,
  compostDoneToday: false,
  coopEggs: 2, // Fresh eggs ready in the chicken coop
  chickenCount: 3,
  chickenLove: 0,
  felixStep: 0,
  paoStep: 0,
  titles: ["Estudante ETEC"],
  activeTitle: "Estudante ETEC",
  selectedCrop: "alface_crespa",
  equippedTool: "water", // "water" (Regador) | "hoe" (Enxada)
  playerHp: 100,
  maxHp: 100,
  isSleeping: false,
  jaguar: {
    active: false,
    hp: 100,
    maxHp: 100,
    attackCd: 0,
    hitFlash: 0,
    spawnCooldown: 26,
    checkAccum: 0,
    slowTimer: 0,
    burnTimer: 0,
    targetAnimalId: null,
  },
  jaguarDefeated: false, // Onça derrotada e caída, aguardando ser domada
  jaguarDownPos: { x: 0, z: 0 },
  jaguarDownTimer: 0,
  hasTamedJaguar: false,
  tamedJaguarHp: 120,
  tamedJaguarMaxHp: 120,
  tamedJaguarDown: false,
  tamedJaguarRecoverTimer: 0,
  ridingJaguar: false,
  marceloHired: false,
  marceloDaysLeft: 0,
  ownedHoes: ["comum"],
  activeHoe: "comum",
  landLevel: 0,
  animals: [],
  nextAnimalId: 1,
  maluquinho: {
    active: false,
    tormentCd: 0,
    bubbleTimer: 0,
    currentLine: "",
    announced: false,
  },
  water: 8,
  kaioAdubo: 0,
  kaioSuperAdubo: 0,
  workEndNotifiedToday: false,
  autoWaterAccum: 0,
  firstPerson: false,
  fpPitch: 0,
  upgrades: {
    plotTier: 0,
    canLevel: 1,
    fertLevel: 1,
    standLevel: 1,
    autoWaterLevel: 0,
  },
  inventory: {
    alface_crespa: 0,
    alface_americana: 0,
    alface_roxa: 0,
    tomate: 0,
    cenoura: 0,
    morango: 0,
    alface_guloso: 0,
    alface_dourado: 0,
    milho: 0,
    trigo: 0,
    ovo_caipira: 0,
    leite_fresco: 0,
    la_ovelha: 0,
    trufa_porco: 0,
    salada_macho: 0,
    omelete_caipira: 0,
    vitamina_morango: 0,
    risoto_trufa: 0,
    balde: 0,
    tesoura: 0,
  },
  dailyMult: {},
  hotCropId: "alface_crespa",
  orders: [],
  phone: createDefaultPhoneState(),
  camYaw: 0.2,
  camPitch: 0.48,
  camDist: 16.5,
  animTime: 0,
  swingTimer: 0,
};

const player = {
  pos: new THREE.Vector3(0, 0, -11.5),
  facingYaw: 0,
  radius: 0.45,
  vy: 0,
  jumpOffset: 0,
};

function getMaxWater() {
  return [8, 12, 18, 25][state.upgrades.canLevel - 1] || 25;
}

function getGrowthMultiplier() {
  const base = 1 + (state.upgrades.fertLevel - 1) * 0.25;
  const irrBonus = state.upgrades.autoWaterLevel >= 2 ? 1.15 : 1.0;
  return base * irrBonus;
}

function getDoubleHarvestChance() {
  const hoe = HOES[state.activeHoe] || HOES.comum;
  return (state.upgrades.fertLevel - 1) * 0.16 + (hoe.doubleBonus || 0);
}

function getActiveHoe() {
  return HOES[state.activeHoe] || HOES.comum;
}

function getFarmBounds() {
  return {
    minX: state.landLevel >= 1 ? -52.5 : -32.5,
    maxX: state.landLevel >= 2 ? 52.5 : 32.5,
  };
}

const ANIMAL_PENS = {
  cow: { minX: 19.0, maxX: 29.8, minZ: -2.4, maxZ: 9.8 },
  pig: { minX: -29.8, maxX: -19.0, minZ: 15.6, maxZ: 25.8 },
  sheep: { minX: -11.4, maxX: 4.8, minZ: 17.2, maxZ: 25.8 },
};

function getAnimalPenBounds(type) {
  return ANIMAL_PENS[type] || ANIMAL_PENS.cow;
}

function getMaxAnimals() {
  return 6 + state.landLevel * 5;
}

function getAnimalSpawnPos(type = "cow") {
  const pen = getAnimalPenBounds(type);
  return {
    x: pen.minX + Math.random() * (pen.maxX - pen.minX),
    z: pen.minZ + Math.random() * (pen.maxZ - pen.minZ),
  };
}

function applyHoeVisual() {
  const hoe = getActiveHoe();
  [hoeBladeMat, fpHoeBladeMat].forEach((mat) => {
    if (!mat) return;
    mat.color.setHex(hoe.bladeColor);
    mat.emissive.setHex(hoe.emissive);
    mat.emissiveIntensity = hoe.emissiveIntensity;
  });
}

function syncLandExpansion() {
  if (expansionWestGroup) expansionWestGroup.visible = state.landLevel >= 1;
  if (expansionEastGroup) expansionEastGroup.visible = state.landLevel >= 2;
  if (westOriginalFenceGroup) westOriginalFenceGroup.visible = state.landLevel < 1;
  if (eastOriginalFenceGroup) eastOriginalFenceGroup.visible = state.landLevel < 2;
}

function getSellPriceMultiplier() {
  return 1 + (state.upgrades.standLevel - 1) * 0.16;
}

function getTotalBasketCount() {
  return CROP_KEYS.reduce((sum, id) => sum + (state.inventory[id] || 0), 0);
}

function syncCoopEggsVisual() {
  coopEggVisuals.forEach((mesh, idx) => {
    mesh.visible = idx < state.coopEggs;
  });
}

function rollDailyMarket() {
  CROP_KEYS.forEach((id) => {
    state.dailyMult[id] = 0.92 + Math.random() * 0.28;
  });
  const pool = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango", "milho", "trigo"];
  state.hotCropId = pool[Math.floor(Math.random() * pool.length)];
  state.dailyMult[state.hotCropId] = 1.4;
  updateSeedHotbarUI();
}

function generateCityOrders() {
  const buyers = [
    "Feira de Campo Limpo Paulista",
    "Cantina da ETEC (CLP)",
    "Sacolão Centro de Campo Limpo",
    "Mercadinho de Pau Arcado",
    "Restaurante Av. Alfried Krupp",
  ];
  const orderPool = ["alface_crespa", "alface_americana", "alface_roxa", "tomate", "cenoura", "morango", "milho", "trigo"];
  const orders = [];
  for (let i = 0; i < 3; i++) {
    const cropId = i === 0 ? "alface_crespa" : orderPool[Math.floor(Math.random() * orderPool.length)];
    const qty = 2 + Math.floor(Math.random() * 3) + Math.min(3, Math.floor(state.reputation / 2));
    const crop = CROPS[cropId];
    const bonusReward = Math.round(qty * crop.basePrice * 1.48 * getSellPriceMultiplier());
    orders.push({
      id: `${Date.now()}_${i}`,
      buyer: buyers[(i + state.day + Math.floor(Math.random() * 3)) % buyers.length],
      cropId,
      qty,
      reward: bonusReward,
      completed: false,
    });
  }
  state.orders = orders;
}

function getUnlockedPlotCount() {
  return Math.min(36, 6 + state.upgrades.plotTier * 3) + (state.landLevel >= 1 ? 12 : 0) + (state.landLevel >= 2 ? 12 : 0);
}

function syncUnlockedPlots() {
  const baseCount = Math.min(36, 6 + state.upgrades.plotTier * 3);
  syncLandExpansion();
  plots.forEach((p, idx) => {
    if (p.landReq > 0) {
      const owned = state.landLevel >= p.landReq;
      p.group.visible = owned;
      p.unlocked = owned;
    } else {
      p.unlocked = idx < baseCount;
    }
    refreshPlotAppearance(p);
  });
}

// Persistence
function saveGame() {
  try {
    const data = {
      money: state.money,
      day: state.day,
      isRainy: state.isRainy,
      reputation: state.reputation,
      insanity: state.insanity,
      isCrazy: state.isCrazy,
      isLambiHomem: state.isLambiHomem,
      lambiTriggeredDay: state.lambiTriggeredDay,
      lambiUntilDay: state.lambiUntilDay,
      knockedNpcs: state.knockedNpcs,
      visitedEtecToday: state.visitedEtecToday,
      coopEggs: state.coopEggs,
      chickenCount: state.chickenCount,
      chickenLove: state.chickenLove,
      npkDoneToday: state.npkDoneToday,
      automationDoneToday: state.automationDoneToday,
      goalScoredToday: state.goalScoredToday,
      compostDoneToday: state.compostDoneToday,
      felixStep: state.felixStep,
      paoStep: state.paoStep,
      titles: state.titles,
      activeTitle: state.activeTitle,
      kaioAdubo: state.kaioAdubo,
      kaioSuperAdubo: state.kaioSuperAdubo,
      hasTamedJaguar: state.hasTamedJaguar,
      tamedJaguarHp: state.tamedJaguarHp,
      tamedJaguarDown: state.tamedJaguarDown,
      tamedJaguarRecoverTimer: state.tamedJaguarRecoverTimer,
      marceloHired: state.marceloHired,
      marceloDaysLeft: state.marceloDaysLeft,
      basementStep: state.basementStep,
      basementUnlocked: state.basementUnlocked,
      machoSkin: state.machoSkin,
      vaselina: state.vaselina,
      ownedHoes: state.ownedHoes,
      activeHoe: state.activeHoe,
      landLevel: state.landLevel,
      animals: state.animals.filter((a) => a.alive),
      nextAnimalId: state.nextAnimalId,
      upgrades: state.upgrades,
      inventory: state.inventory,
      phone: state.phone,
      plots: plots.map((p) => ({
        stage: p.stage,
        cropId: p.cropId,
        growth: p.growth,
        waterTimer: p.waterTimer,
        fertilized: !!p.fertilized,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // ignore storage errors
  }
}

function loadSavedGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (typeof data.money === "number") state.money = data.money;
    if (typeof data.day === "number") state.day = data.day;
    if (typeof data.isRainy === "boolean") state.isRainy = data.isRainy;
    if (typeof data.reputation === "number") state.reputation = data.reputation;
    if (typeof data.insanity === "number") state.insanity = data.insanity;
    state.isCrazy = state.insanity >= 100;
    if (typeof data.isLambiHomem === "boolean") state.isLambiHomem = data.isLambiHomem;
    if (typeof data.lambiTriggeredDay === "number") state.lambiTriggeredDay = data.lambiTriggeredDay;
    if (typeof data.lambiUntilDay === "number") state.lambiUntilDay = data.lambiUntilDay;
    if (data.knockedNpcs && typeof data.knockedNpcs === "object") state.knockedNpcs = { ...data.knockedNpcs };
    if (typeof data.visitedEtecToday === "boolean") state.visitedEtecToday = data.visitedEtecToday;
    if (typeof data.coopEggs === "number") state.coopEggs = data.coopEggs;
    if (typeof data.chickenCount === "number") {
      state.chickenCount = THREE.MathUtils.clamp(data.chickenCount, 1, 12);
      syncChickensToCount(state.chickenCount);
    }
    if (typeof data.chickenLove === "number") state.chickenLove = data.chickenLove;
    if (typeof data.npkDoneToday === "boolean") state.npkDoneToday = data.npkDoneToday;
    if (typeof data.automationDoneToday === "boolean") state.automationDoneToday = data.automationDoneToday;
    else if (typeof data.musicPlayedToday === "boolean") state.automationDoneToday = data.musicPlayedToday;
    if (typeof data.goalScoredToday === "boolean") state.goalScoredToday = data.goalScoredToday;
    if (typeof data.compostDoneToday === "boolean") state.compostDoneToday = data.compostDoneToday;
    if (typeof data.felixStep === "number") state.felixStep = data.felixStep;
    if (typeof data.paoStep === "number") state.paoStep = data.paoStep;
    if (Array.isArray(data.titles) && data.titles.length) state.titles = data.titles;
    if (typeof data.activeTitle === "string") state.activeTitle = data.activeTitle;
    if (typeof data.kaioAdubo === "number") state.kaioAdubo = data.kaioAdubo;
    if (typeof data.kaioSuperAdubo === "number") state.kaioSuperAdubo = data.kaioSuperAdubo;
    if (typeof data.hasTamedJaguar === "boolean") state.hasTamedJaguar = data.hasTamedJaguar;
    if (typeof data.tamedJaguarHp === "number") state.tamedJaguarHp = THREE.MathUtils.clamp(data.tamedJaguarHp, 0, state.tamedJaguarMaxHp);
    if (typeof data.tamedJaguarDown === "boolean") state.tamedJaguarDown = data.tamedJaguarDown;
    if (typeof data.tamedJaguarRecoverTimer === "number") state.tamedJaguarRecoverTimer = Math.max(0, data.tamedJaguarRecoverTimer);
    if (state.tamedJaguarDown && tamedJaguarEntity) {
      tamedJaguarEntity.mesh.rotation.z = Math.PI / 2;
      tamedJaguarEntity.mesh.position.y = 0.45;
    }
    if (typeof data.marceloHired === "boolean") state.marceloHired = data.marceloHired;
    if (typeof data.marceloDaysLeft === "number") state.marceloDaysLeft = data.marceloDaysLeft;
    if (typeof data.basementStep === "number") state.basementStep = data.basementStep;
    if (typeof data.basementUnlocked === "boolean") state.basementUnlocked = data.basementUnlocked;
    if (typeof data.machoSkin === "string") state.machoSkin = data.machoSkin;
    if (typeof data.vaselina === "number") state.vaselina = data.vaselina;
    if (Array.isArray(data.ownedHoes) && data.ownedHoes.length) {
      state.ownedHoes = data.ownedHoes.filter((h) => HOES[h]);
      if (!state.ownedHoes.includes("comum")) state.ownedHoes.unshift("comum");
    }
    if (typeof data.activeHoe === "string" && HOES[data.activeHoe]) state.activeHoe = data.activeHoe;
    if (typeof data.landLevel === "number") state.landLevel = data.landLevel;
    if (Array.isArray(data.animals)) {
      state.animals = data.animals.filter((a) => a && ANIMAL_TYPES[a.type]).map((a) => ({ ...a, alive: true }));
    }
    if (typeof data.nextAnimalId === "number") state.nextAnimalId = data.nextAnimalId;
    if (data.upgrades) Object.assign(state.upgrades, data.upgrades);
    if (typeof state.upgrades.autoWaterLevel !== "number") state.upgrades.autoWaterLevel = 0;
    if (data.inventory) Object.assign(state.inventory, data.inventory);
    if (data.phone && typeof data.phone === "object") {
      state.phone = Object.assign(createDefaultPhoneState(), data.phone);
      if (!Array.isArray(state.phone.likedIds)) state.phone.likedIds = [];
      if (!Array.isArray(state.phone.userPosts)) state.phone.userPosts = [];
      if (!Array.isArray(state.phone.userInstaPosts)) state.phone.userInstaPosts = [];
    }
    if (Array.isArray(data.plots)) {
      data.plots.forEach((sp, idx) => {
        if (plots[idx]) {
          plots[idx].stage = sp.stage || "raw";
          plots[idx].cropId = sp.cropId || null;
          plots[idx].growth = sp.growth || 0;
          plots[idx].waterTimer = sp.waterTimer || 0;
          plots[idx].fertilized = !!sp.fertilized;
        }
      });
    }
    return true;
  } catch (_) {
    return false;
  }
}

function syncBusModelsVisibility() {
  if (bus402YardMesh) {
    bus402YardMesh.visible = getBus402Status("pauArcado").available;
  }
  if (bus402TermMesh) {
    bus402TermMesh.visible = getBus402Status("terminal").available;
  }
}

function syncHeldToolVisibility() {
  const isAirfryer = state.activeTitle === "Airfryer";
  const showTools = (state.location === "yard" || state.equippedTool === "hoe") && !state.isCrazy && !isAirfryer;
  if (playerMesh.userData.canGroup) {
    playerMesh.userData.canGroup.visible = showTools && state.equippedTool === "water" && state.location === "yard";
  }
  if (playerMesh.userData.hoeGroup) {
    playerMesh.userData.hoeGroup.visible = showTools && state.equippedTool === "hoe";
  }
}

function setActiveSceneVisibility() {
  exteriorGroup.visible = state.location === "yard";
  interiorGroup.visible = state.location === "room";
  basementGroup.visible = state.location === "basement";
  terminalGroup.visible = state.location === "terminal";
  etecGroup.visible = state.location === "etec";
  etecInsideGroup.visible = state.location === "etec_inside";
  syncHeldToolVisibility();
  if (sprinklerGroup) {
    sprinklerGroup.visible = state.upgrades.autoWaterLevel >= 1;
  }
  if (jaguarEntity) {
    jaguarEntity.mesh.visible = state.location === "yard" && (state.jaguar.active || state.jaguarDefeated);
  }
  if (tamedJaguarEntity) {
    tamedJaguarEntity.mesh.visible = state.location === "yard" && state.hasTamedJaguar;
    if (state.tamedJaguarDown) {
      tamedJaguarEntity.mesh.rotation.z = Math.PI / 2;
      tamedJaguarEntity.mesh.position.y = 0.45;
    } else if (!state.ridingJaguar) {
      tamedJaguarEntity.mesh.rotation.z = 0;
    }
  }
  if (termJaguarMesh) {
    termJaguarMesh.visible = state.location === "terminal" && state.hasTamedJaguar;
  }
  if (secretTrapdoorMesh) {
    secretTrapdoorMesh.visible = state.basementUnlocked || state.basementStep >= 2;
  }
  if (marceloYardEntity) {
    marceloYardEntity.mesh.visible = state.location === "yard" && state.marceloHired;
  }
  applyMachoSkin(state.machoSkin);
  syncPlayerTitleSkin();
  syncLandExpansion();
  applyHoeVisual();
  if (maluquinhoEntity) {
    maluquinhoEntity.mesh.visible = state.location === "terminal" && state.maluquinho.active;
  }
  syncBusModelsVisibility();
  syncCoopEggsVisual();
}

function resetToNewFarm() {
  localStorage.removeItem(STORAGE_KEY);
  state.location = "yard";
  state.isRainy = false;
  state.money = 40;
  state.day = 1;
  state.dayMinutes = 7 * 60;
  state.reputation = 1;
  state.insanity = 0;
  state.isCrazy = false;
  state.isLambiHomem = false;
  state.lambiTriggeredDay = 0;
  state.lambiUntilDay = 0;
  state.knockedNpcs = {};
  state.visitedEtecToday = false;
  state.coringaTimer = 0;
  state.currentCoringaLine = "";
  state.energyTimer = 0;
  state.vaselina = 0;
  state.vaselinaTimer = 0;
  state.npkDoneToday = false;
  state.automationDoneToday = false;
  state.goalScoredToday = false;
  state.compostDoneToday = false;
  state.coopEggs = 2;
  state.chickenCount = 3;
  state.chickenLove = 0;
  syncChickensToCount(3);
  state.felixStep = 0;
  state.paoStep = 0;
  state.titles = ["Estudante ETEC"];
  state.activeTitle = "Estudante ETEC";
  state.selectedCrop = "alface_crespa";
  state.equippedTool = "water";
  state.playerHp = 100;
  state.isSleeping = false;
  state.jaguar = {
    active: false, hp: 100, maxHp: 100, attackCd: 0, hitFlash: 0, spawnCooldown: 26, checkAccum: 0,
    slowTimer: 0, burnTimer: 0, targetAnimalId: null,
  };
  state.jaguarDefeated = false;
  state.jaguarDownTimer = 0;
  state.hasTamedJaguar = false;
  state.tamedJaguarHp = 120;
  state.tamedJaguarMaxHp = 120;
  state.tamedJaguarDown = false;
  state.tamedJaguarRecoverTimer = 0;
  state.ridingJaguar = false;
  if (tamedJaguarEntity) {
    tamedJaguarEntity.mesh.rotation.z = 0;
    tamedJaguarEntity.mesh.position.y = 0;
  }
  state.marceloHired = false;
  state.marceloDaysLeft = 0;
  state.basementStep = 0;
  state.basementUnlocked = false;
  state.machoSkin = "clone_classic";
  state.ownedHoes = ["comum"];
  state.activeHoe = "comum";
  state.landLevel = 0;
  state.animals = [];
  state.nextAnimalId = 1;
  rebuildLivestockMeshes();
  state.maluquinho = { active: false, tormentCd: 0, bubbleTimer: 0, currentLine: "", announced: false };
  state.kaioAdubo = 0;
  state.kaioSuperAdubo = 0;
  state.workEndNotifiedToday = false;
  state.autoWaterAccum = 0;
  state.firstPerson = false;
  state.fpPitch = 0;
  state.phone = createDefaultPhoneState();
  state.upgrades = { plotTier: 0, canLevel: 1, fertLevel: 1, standLevel: 1, autoWaterLevel: 0 };
  state.water = getMaxWater();
  CROP_KEYS.forEach((k) => (state.inventory[k] = 0));
  state.inventory.balde = 0;
  state.inventory.tesoura = 0;
  plots.forEach((p, idx) => {
    p.stage = idx === 2 || idx === 3 ? "tilled" : "raw";
    p.cropId = null;
    p.growth = 0;
    p.waterTimer = 0;
    p.fertilized = false;
    p.visualStage = -99;
    p.visualCropId = null;
  });
  setActiveSceneVisibility();
  syncUnlockedPlots();
  rollDailyMarket();
  generateCityOrders();
  player.pos.set(0, 0, -11.5);
  player.facingYaw = 0;
  playerMesh.position.copy(player.pos);
  playerMesh.rotation.y = player.facingYaw;
  updateSeedHotbarUI();
  updateHUD();
}

// HUD Updates
function updateSeedHotbarUI() {
  document.querySelectorAll(".seed-slot").forEach((btn) => {
    const cropId = btn.dataset.crop;
    btn.classList.toggle("active", cropId === state.selectedCrop);
    const isHot = cropId === state.hotCropId;
    btn.classList.toggle("hot-today", isHot);
    let badge = btn.querySelector(".seed-hot-tag");
    if (isHot) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "seed-hot-tag";
        badge.textContent = "🔥 +40%";
        btn.appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  });
}

const LOCATION_LABELS = {
  yard: "Pau Arcado",
  room: "Casa do Alyffer",
  basement: "Porão Secreto",
  terminal: "Terminal CLP",
  etec: "ETEC Botujuru",
  etec_inside: "ETECAMP (Salas)",
};

function updateHUD() {
  state.isCrazy = state.insanity >= 100;
  titleBadge.textContent = state.isCrazy ? `🤡 CORINGANDO (${state.activeTitle})` : state.activeTitle;
  moneyVal.textContent = formatBRL(state.money);
  const cal = getCalendarInfo(state.day);
  const clockStr = formatHHMM(state.dayMinutes);
  const dayStr = String(cal.dayOfMonth).padStart(2, "0");
  const weatherIcon = state.isRainy ? "🌧️" : isAfterWorkHours() ? "🌙" : "☀️";
  dayTimeVal.textContent = `${cal.weekdayShort}, ${dayStr}/${cal.monthShort} • ${clockStr} ${weatherIcon}`;
  locationVal.textContent = LOCATION_LABELS[state.location] || "Pau Arcado";

  const totalItems = getTotalBasketCount();
  basketVal.textContent = `🥬 ${totalItems} ${totalItems === 1 ? "item" : "itens"}`;

  if (aduboVal) {
    aduboVal.textContent = `🧪 ${state.kaioAdubo} • ⚗️ ${state.kaioSuperAdubo}`;
  }

  const maxW = getMaxWater();
  if (waterLabel) {
    waterLabel.textContent = state.upgrades.autoWaterLevel >= 1 ? "REGADOR • 💦 AUTO" : "REGADOR";
  }
  waterText.textContent = `${state.water}/${maxW}`;
  waterBar.style.width = `${Math.min(100, (state.water / maxW) * 100)}%`;

  if (insanityLabel) {
    insanityLabel.textContent = state.isCrazy
      ? "🤡 CORINGANDO!"
      : state.visitedEtecToday
        ? "SANIDADE (FOI NA ETEC)"
        : "SANIDADE / CORINGA";
  }
  insanityText.textContent = state.isCrazy ? "100% 🤡" : `${state.insanity}%`;
  insanityBar.style.width = `${Math.min(100, state.insanity)}%`;
  insanityPill.classList.toggle("crazy", state.isCrazy);

  if (camModeBtn && camModeLabel) {
    camModeBtn.classList.toggle("active-mode", state.firstPerson);
    camModeLabel.textContent = state.firstPerson ? "3ª Pessoa" : "1ª Pessoa";
  }
  if (toolModeBtn && toolModeIcon && toolModeLabel) {
    const isHoe = state.equippedTool === "hoe";
    toolModeBtn.classList.toggle("active-mode", isHoe);
    toolModeIcon.textContent = isHoe ? "⛏️" : "🚿";
    toolModeLabel.textContent = isHoe ? "Enxada (R)" : "Regador (R)";
  }
  if (hpPill && hpBar && hpText) {
    const showHp = state.jaguar.active || state.playerHp < state.maxHp;
    hpPill.classList.toggle("hidden", !showHp);
    hpText.textContent = `${Math.max(0, Math.round(state.playerHp))}`;
    hpBar.style.width = `${Math.max(0, Math.min(100, (state.playerHp / state.maxHp) * 100))}%`;
  }
  if (tamedJagPill && tamedJagBar && tamedJagText) {
    tamedJagPill.classList.toggle("hidden", !state.hasTamedJaguar);
    if (state.hasTamedJaguar) {
      const hp = Math.max(0, Math.round(state.tamedJaguarHp));
      const maxHp = Math.max(1, state.tamedJaguarMaxHp || 120);
      if (state.tamedJaguarDown) {
        tamedJagText.textContent = `💤 CAÍDA (${Math.ceil(state.tamedJaguarRecoverTimer)}s)`;
        tamedJagBar.style.width = "0%";
      } else {
        tamedJagText.textContent = `${hp}/${maxHp}`;
        tamedJagBar.style.width = `${Math.min(100, (hp / maxHp) * 100)}%`;
      }
      if (tamedJagLabel) {
        tamedJagLabel.textContent = state.ridingJaguar ? "🐆 MONTADA" : "🐆 ONÇA";
      }
    }
  }
  if (jaguarHudBar && jaguarHpFill && jaguarHpText) {
    const showJag = state.location === "yard" && state.jaguar.active && state.mode === "playing";
    jaguarHudBar.classList.toggle("hidden", !showJag);
    if (showJag) {
      jaguarHpText.textContent = `${Math.max(0, Math.round(state.jaguar.hp))} / ${state.jaguar.maxHp} HP`;
      jaguarHpFill.style.width = `${Math.max(0, (state.jaguar.hp / state.jaguar.maxHp) * 100)}%`;
    }
  }
  if (maluquinhoBubble && !(state.location === "terminal" && state.maluquinho.active && state.mode === "playing")) {
    maluquinhoBubble.classList.add("hidden");
  }
  if (fpCrosshair) {
    fpCrosshair.classList.toggle("hidden", !(state.firstPerson && state.mode === "playing"));
  }
  if (crazyVignette) {
    crazyVignette.classList.toggle("hidden", !(state.isCrazy && state.mode === "playing"));
  }

  if (coringaBubble) {
    coringaBubble.classList.toggle("hidden", !(state.isCrazy && state.mode === "playing"));
  }

  if (phoneNotifDot) {
    const unread = (state.phone && state.phone.unread) || 0;
    phoneNotifDot.textContent = unread > 9 ? "9+" : String(unread);
    phoneNotifDot.classList.toggle("hidden", unread <= 0);
  }
  if (phoneModal && !phoneModal.classList.contains("hidden") && typeof updatePhoneStatusBar === "function") {
    updatePhoneStatusBar();
  }

  if (vaselinaHudBtn && vaselinaHudLabel) {
    vaselinaHudBtn.classList.toggle("hidden", state.vaselina <= 0);
    vaselinaHudLabel.textContent = `Vaselina (${state.vaselina})`;
  }

  if (state.vaselinaTimer > 0) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `🧴 Vaselina (${Math.ceil(state.vaselinaTimer)}s)`;
  } else if (state.energyTimer > 0) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `⚡ Energia (${Math.ceil(state.energyTimer)}s)`;
  } else if (isAfterWorkHours()) {
    buffBadge.classList.remove("hidden");
    buffText.textContent = `🌙 Após 19h (Sem trabalho)`;
  } else {
    buffBadge.classList.add("hidden");
  }

  if (lambiPill && lambiText) {
    lambiPill.classList.toggle("hidden", !state.isLambiHomem);
    if (state.isLambiHomem) {
      lambiText.textContent =
        state.location === "etec_inside"
          ? "👅 LAMBI HOMEM! Aperte F nos alunos/NPCs"
          : "👅 LAMBI HOMEM! Vá à ETEC lamber NPCs (F)";
    }
  }
}

function triggerJump() {
  if (state.mode !== "playing" || state.isSleeping) return;
  if (state.activeTitle === "Airfryer") {
    showToast("🍟", "MODO AIRFRYER!", "Airfryer fica paradinha! Clique no título ou aperte G para trocar de título.");
    return;
  }
  if (player.jumpOffset <= 0.02 && player.vy <= 0) {
    player.vy = 9.0;
    player.jumpOffset = 0.03;
    sfx.play("plant");
    spawnParticles(new THREE.Vector3(player.pos.x, player.pos.y + 0.12, player.pos.z), 0xe2e8f0, 6);
  }
}

function drinkVaselina() {
  if (state.mode !== "playing" || state.isSleeping) return;
  if (state.vaselina <= 0) {
    sfx.play("error");
    showToast("🧴", "SEM VASELINA", "Compre Vaselina com o Marcelo no corredor da ETECAMP para ficar super rápido!");
    return;
  }
  state.vaselina -= 1;
  state.vaselinaTimer = 95;
  sfx.play("upgrade");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0x38bdf8, 22);
  showToast("🧴", "TOMOU VASELINA DO MARCELO!", "+65% Velocidade turbinada por 95 segundos! Deslizando pela roça!");
  updateHUD();
  saveGame();
}

function cycleEquippedTitle() {
  if (state.titles.length <= 1) {
    showToast("🏆", "TÍTULOS DA ETEC", "Cumpra as missões do Félix e do Pão na ETEC para ganhar novos títulos e skins!");
    return;
  }
  const idx = state.titles.indexOf(state.activeTitle);
  state.activeTitle = state.titles[(idx + 1) % state.titles.length];
  syncPlayerTitleSkin();
  sfx.play("plant");
  if (state.activeTitle === "Airfryer") {
    showToast("🍟", "TÍTULO AIRFRYER EQUIPADO!", "Você virou uma Airfryer parada! Clique no título ou aperte G para trocar.");
  } else {
    showToast("🏆", "TÍTULO & SKIN EQUIPADOS", `Agora você está com "${state.activeTitle}"!`);
  }
  updateHUD();
  saveGame();
}

if (farmerTagPill) {
  farmerTagPill.addEventListener("click", cycleEquippedTitle);
}

function getCropSellPrice(cropId) {
  const crop = CROPS[cropId];
  const daily = state.dailyMult[cropId] || 1;
  return Math.round(crop.basePrice * daily * getSellPriceMultiplier());
}

// Interactables & Context Detection across all 5 locations
const WELL_POS = new THREE.Vector3(-18.0, 0, -2.5);
const COOP_POS = new THREE.Vector3(-24.0, 0, -18.8);
const COMPOST_POS = new THREE.Vector3(-18.0, 0, 6.5);
const STAND_POS = new THREE.Vector3(21.5, 0, -16.5);
const DOOR_POS = new THREE.Vector3(0, 0, -13.2);
const BUS_STOP_YARD_POS = new THREE.Vector3(22.2, 0, 42.0);

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

const ETEC_EXIT_POS = new THREE.Vector3(0, 0, 42.4);
const ETEC_EXIT_BACK_POS = new THREE.Vector3(0, 0, -31.4);
const ETEC_EXIT_PARKING_POS = new THREE.Vector3(-2.8, 0, 40.2);
const CHEM_BENCH_POS = new THREE.Vector3(12.4, 0, 2.2);
const NURSE_BED_POS = new THREE.Vector3(8.7, 0, 18.9);
const ETEC_HOOP_RIM = new THREE.Vector3(13.66, 3.24, 1.6);

function distXZ(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function getFloorYAt(x, z) {
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

function toggleFirstPerson() {
  state.firstPerson = !state.firstPerson;
  if (state.firstPerson) {
    state.camYaw = player.facingYaw + Math.PI;
    state.fpPitch = 0;
    showToast("👁️", "MODO 1ª PESSOA", "Arraste para olhar em volta • V para voltar p/ 3ª Pessoa.");
  } else {
    state.camPitch = 0.46;
    showToast("🎥", "MODO 3ª PESSOA", "Câmera orbital restaurada!");
  }
  sfx.play("plant");
  updateHUD();
  updateCamera(0.016, true);
}

function toggleEquippedTool() {
  state.equippedTool = state.equippedTool === "water" ? "hoe" : "water";
  syncHeldToolVisibility();
  sfx.play("dig");
  showToast(
    state.equippedTool === "hoe" ? "⛏️" : "🚿",
    state.equippedTool === "hoe" ? "ENXADA EQUIPADA!" : "REGADOR EQUIPADO!",
    state.equippedTool === "hoe"
      ? "Segurando a Enxada! Ótima para arar a terra e enfrentar Onças (Tecla E)."
      : "Segurando o Regador! Pronto para molhar os canteiros."
  );
  updateHUD();
}

function triggerPlayerDeath(reason) {
  if (state.mode === "dead") return;
  clearActiveInputs();
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
  if (phoneModal) phoneModal.classList.add("hidden");
  if (cookModal) cookModal.classList.add("hidden");
  if (typeof stopMiniArcade === "function") stopMiniArcade();

  sfx.play("death");
  if (reason === "orelha") {
    deathIcon.textContent = "🐕💀";
    deathTitle.textContent = "VOCÊ MORREU!";
    deathMsg.textContent =
      "NUNCA tente chutar o Orelha! O Orelha desviou com estilo e o karma instantâneo de Pau Arcado derrubou o Macho na hora!";
  } else if (reason === "jaguar") {
    deathIcon.textContent = "🐆💀";
    deathTitle.textContent = "DERROTADO PELA ONÇA!";
    deathMsg.textContent =
      "A Onça Pintada foi mais rápida! Na próxima vez, equipe a ENXADA (R) e mantenha distância golpeando com E!";
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
  state.jaguar.spawnCooldown = 45;
  state.jaguarDefeated = false;
  if (jaguarEntity) {
    jaguarEntity.mesh.rotation.z = 0;
    jaguarEntity.mesh.position.y = 0;
  }
  state.maluquinho.active = false;
  state.maluquinho.announced = false;
  if (jaguarEntity) jaguarEntity.mesh.visible = false;
  if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;

  state.mode = "playing";
  switchLocation("yard", 0, -11.5, 0, 0.2, 0.48, 16.5);
  showToast("❤️", "DE VOLTA AO SÍTIO", "Você acordou bem em Pau Arcado! Respeite o Orelha e fique atento à Onça.");
}

function kickOrelha() {
  if (state.location !== "yard" || !dogOrelha) return;
  if (distXZ(player.pos, dogOrelha.mesh.position) > 3.2) {
    showToast("🐕", "ORELHA", "O Orelha está longe demais!");
    return;
  }
  sfx.play("bark");
  spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.3, 0)), 0xef4444, 24);
  triggerPlayerDeath("orelha");
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
      : "🐆 ALERTA! UMA ONÇA PINTADA INVADIU O SÍTIO! EQUIPE A ENXADA (R)!"
  );
  showToast(
    "🐆",
    "ONÇA NA FAZENDA!",
    state.marceloHired
      ? "O Marcelo já está correndo para proteger os animais! Ajude com a ENXADA (R)!"
      : "Aperte R para segurar a ENXADA e E para lutar! (Contrate o Marcelo na ETECAMP)"
  );
  updateHUD();
}

// Onça derrotada: pelo jogador fica caída (pode ser DOMADA); por Marcelo ou pela Onça domada, foge/morre
function defeatJaguar(byWho = "player") {
  if (!jaguarEntity) return;
  state.jaguar.active = false;
  state.jaguar.spawnCooldown = 68;
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
    showToast("⛏️", "EQUIPE A ENXADA (R)!", "Você está com o Regador! Aperte R ou clique no botão para pegar a ENXADA!");
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
    state.inventory.balde -= 1;
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
  state.inventory[info.productId] = (state.inventory[info.productId] || 0) + 1;
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
  state.inventory[cropId] -= 1;
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
  state.inventory.milho -= 1;
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
function startSleepTransition(fromBed = false) {
  if (state.isSleeping || state.mode === "dead") return;
  clearActiveInputs();
  state.ridingJaguar = false;
  state.isSleeping = true;
  state.mode = "sleeping";

  // Fecha quaisquer modais abertos
  pauseScreen.classList.add("hidden");
  sellModal.classList.add("hidden");
  shopModal.classList.add("hidden");
  npcModal.classList.add("hidden");
  guideModal.classList.add("hidden");
  calendarModal.classList.add("hidden");
  if (phoneModal) phoneModal.classList.add("hidden");
  if (cookModal) cookModal.classList.add("hidden");
  if (typeof stopMiniArcade === "function") stopMiniArcade();

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

  setTimeout(() => {
    if (state.mode === "dead") return;
    advanceToNextDay();
    if (sleepTitle) sleepTitle.textContent = `☀️ Amanhecendo — ${nextCal.weekdayFull}!`;
    if (sleepSub) {
      sleepSub.textContent = state.isRainy
        ? "🌧️ Dia chuvoso em Pau Arcado! Horta regada pela chuva."
        : "☀️ Sol raiando na Estrada do Garcia! Hora de cuidar da horta.";
    }
    if (sleepProgressFill) sleepProgressFill.style.width = "100%";
  }, 1250);

  setTimeout(() => {
    if (state.mode === "dead") return;
    if (sleepOverlay) sleepOverlay.classList.remove("visible");
  }, 2250);

  setTimeout(() => {
    if (state.mode === "dead") return;
    if (sleepOverlay) sleepOverlay.classList.add("hidden");
    playerMesh.rotation.set(0, player.facingYaw, 0);
    playerMesh.position.copy(player.pos);
    state.isSleeping = false;
    state.mode = "playing";
    updateHUD();
  }, 3100);
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
  playerMesh.position.set(player.pos.x, player.pos.y + 0.62, player.pos.z);
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
  showToast("🚆", "LINHA 7-RUBI", "Desembarcou na Estação Campo Limpo Paulista!");
}

function enterEtecInside(entry = "front") {
  if (entry === "back") {
    switchLocation("etec_inside", 0, -29.2, 0, Math.PI, 0.46, 15.5);
    showToast("🏫", "ENTRADA ABERTA (CORREDOR)", "Entrou no corredor pelos fundos da ETECAMP!");
  } else if (entry === "parking") {
    switchLocation("etec_inside", -1.6, 40.0, Math.PI / 2, 0, 0.46, 15.5);
    showToast("🏫", "ACESSO DO ESTACIONAMENTO", "Entrou no corredor da ETECAMP pelo estacionamento!");
  } else {
    switchLocation("etec_inside", 0, 40.2, Math.PI, 0, 0.46, 15.5);
    showToast("🏫", "ETECAMP EXPANDIDA", "Salas 3AI..1A • Labs Info 24/15/7 • Lab Química & Lab Enfermagem!");
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
    if (distXZ(player.pos, ETEC_DOOR_IN_POS) < 2.8) {
      return { type: "enter_etec", entry: "front", key: "E", text: "Entrar no Corredor com as Salas (Frente)" };
    }
    if (distXZ(player.pos, ETEC_PARKING_DOOR_POS) < 2.8) {
      return { type: "enter_etec", entry: "parking", key: "E", text: "Entrar no Corredor pelo Estacionamento" };
    }
    if (distXZ(player.pos, ETEC_BACK_DOOR_POS) < 2.8) {
      return { type: "enter_etec", entry: "back", key: "E", text: "Entrar no Corredor pela Entrada Aberta (Fundos)" };
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
    if (distXZ(player.pos, NURSE_BED_POS) < 2.6) {
      return {
        type: "nurse_care",
        key: "E",
        text: "Fazer Curativo na Enfermaria (Recupera Vida ❤️)",
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
      key: state.equippedTool === "hoe" ? "E" : "Tecla R",
      text:
        state.equippedTool === "hoe"
          ? `⛏️ Bater na Onça com a Enxada! (${state.jaguar.hp} HP)`
          : "⚠️ Aperte R para equipar a ENXADA e enfrentar a Onça!",
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
  if (distXZ(player.pos, COMPOST_POS) < 2.9) {
    return {
      type: "compost",
      key: "E",
      text: isAfterWorkHours()
        ? "🌙 Após 19:00 — Expediente encerrado!"
        : state.compostDoneToday
          ? "Composteira já usada hoje ✓"
          : "Usar Composteira Orgânica (+30% Crescimento na Horta)",
    };
  }
  if (dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 2.3) {
    return { type: "dog", key: "E", text: "Fazer carinho no Orelha 🐕" };
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
    if (bestPlot.stage === "raw") {
      return { type: "plot", plot: bestPlot, key: "E", text: "Arar terra do canteiro" };
    }
    if (bestPlot.stage === "tilled") {
      const crop = CROPS[state.selectedCrop];
      return {
        type: "plot",
        plot: bestPlot,
        key: "E",
        text: `Plantar ${crop.emoji} ${crop.name} (${formatBRL(crop.seedCost)})`,
      };
    }
    if (bestPlot.stage === "growing") {
      const crop = CROPS[bestPlot.cropId];
      const pct = Math.min(99, Math.floor(bestPlot.growth * 100));
      const hasAnyFert = state.kaioAdubo > 0 || state.kaioSuperAdubo > 0;
      if (bestPlot.waterTimer <= 0) {
        return {
          type: "plot",
          plot: bestPlot,
          key: "E",
          text: hasAnyFert ? `Regar ${crop.name} (${pct}%) • F: Adubo Kaio` : `Regar ${crop.name} (${pct}%)`,
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
  // Usa Adubo NPK regular primeiro (se tiver e não estiver adubado), ou Super-Adubo se só tiver dele / já adubado
  if (state.kaioAdubo > 0 && (!plot.fertilized || state.kaioSuperAdubo <= 0)) {
    state.kaioAdubo -= 1;
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
    state.kaioSuperAdubo -= 1;
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

  if (plot.stage === "raw") {
    if (lockedAction && lockedAction !== "till") return null;
    const hoe = getActiveHoe();
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
    const crop = CROPS[state.selectedCrop];
    if (state.money < crop.seedCost) {
      if (!lockedAction) {
        sfx.play("error");
        showToast("💸", "SEM DINHEIRO", `Precisa de ${formatBRL(crop.seedCost)} para plantar ${crop.name}.`);
      }
      return null;
    }
    state.money -= crop.seedCost;
    plot.stage = "growing";
    plot.cropId = crop.id;
    plot.growth = 0;
    plot.fertilized = false;
    plot.popTimer = 0.28;
    const iceHoe = state.activeHoe === "gelo";
    plot.waterTimer = state.upgrades.autoWaterLevel >= 1 || iceHoe ? 16 : state.water > 0 ? 16 : 0;
    if (state.upgrades.autoWaterLevel < 1 && !iceHoe && state.water > 0) {
      state.water -= 1;
    }
    state.swingTimer = 0.22;
    sfx.play("plant");
    spawnParticles(new THREE.Vector3(plot.x, 0.45, plot.z), crop.color, 10);
    spawnFloatingText(new THREE.Vector3(plot.x, 0.4, plot.z), `${crop.emoji} -R$ ${crop.seedCost}`, "#4ade80");
    refreshPlotAppearance(plot);
    updateHUD();
    saveGame();
    return "plant";
  }

  if (plot.stage === "growing") {
    if (plot.waterTimer <= 0) {
      if (lockedAction && lockedAction !== "water") return null;
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
      if (crop.id === "alface_guloso") bonus += 1 + Math.floor(Math.random() * 2);
      state.inventory[crop.id] = (state.inventory[crop.id] || 0) + bonus;
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

function triggerContextAction() {
  if (state.isSleeping || state.mode !== "playing") return;
  const ctx = findCurrentContext();
  if (!ctx) {
    // Se estiver segurando a enxada no quintal com a Onça ativa (ou livre), dá golpe de enxada!
    if (state.location === "yard" && state.jaguar.active) {
      attackJaguarWithHoe();
    } else if (state.equippedTool === "hoe") {
      state.swingTimer = 0.28;
      sfx.play("dig");
    }
    return;
  }
  if (ctx.type === "fight_jaguar") {
    attackJaguarWithHoe();
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
    if (state.coopEggs <= 0) {
      showToast("🐔", "GALINHEIRO", "As galinhas já botaram hoje! Amanhã cedo tem mais ovos caipiras.");
      return;
    }
    const eggs = state.coopEggs;
    state.inventory.ovo_caipira = (state.inventory.ovo_caipira || 0) + eggs;
    state.coopEggs = 0;
    syncCoopEggsVisual();
    sfx.play("harvest");
    spawnParticles(new THREE.Vector3(COOP_POS.x, 0.8, COOP_POS.z), 0xfacc15, 14);
    showToast("🥚", "OVOS CAIPIRAS", `Recolheu +${eggs} Ovo(s) Caipira(s) no galinheiro!`);
    updateHUD();
    saveGame();
  } else if (ctx.type === "compost") {
    if (blockAfterWorkHours()) return;
    if (state.compostDoneToday) {
      showToast("🌿", "COMPOSTEIRA", "Você já usou o húmus da composteira hoje!");
      return;
    }
    state.compostDoneToday = true;
    const boosted = boostAllGrowingPlots(0.32);
    sfx.play("upgrade");
    spawnParticles(new THREE.Vector3(COMPOST_POS.x, 1.1, COMPOST_POS.z), 0x4ade80, 16);
    showToast(
      "🌿",
      "ADUBO CASEIRO APLICADO!",
      boosted > 0
        ? `${boosted} canteiro(s) receberam +30% de crescimento imediato!`
        : "Composteira preparada! Plante nos canteiros para aproveitar."
    );
    updateHUD();
    saveGame();
  } else if (ctx.type === "dog") {
    sfx.play("bark");
    spawnParticles(dogOrelha.mesh.position.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 10);
    showToast(
      "🐕",
      "ORELHA FELIZ!",
      state.insanity > 0
        ? "Orelha balançou as orelhonas e o rabo! (Fique 1 dia sem ir na ETEC p/ descer 25%)"
        : "Orelha balançou as orelhonas de alegria! (Dica: NUNCA aperte X perto dele...)"
    );
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
  } else if (ctx.type === "talk_marcelo_yard") {
    sfx.play("plant");
    showToast("🛡️", "MARCELO (SEGURANÇA)", `De plantão em Pau Arcado! Restam ${state.marceloDaysLeft} dia(s). Se a onça aparecer, eu desço o sarrafo!`);
  } else if (ctx.type === "collect_animal") {
    collectAnimalProduct(ctx.ent);
  } else if (ctx.type === "pet_animal") {
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
    spawnParticles(new THREE.Vector3(12.4, 1.5, 2.2), 0x38bdf8, 18);
    showToast(
      "🧪",
      "SÍNTESE NPK NO LAB DE QUÍMICA!",
      `Reação química perfeita! ${boosted} canteiro(s) em Pau Arcado avançaram +45%!`
    );
    saveGame();
  } else if (ctx.type === "nurse_care") {
    state.playerHp = state.maxHp;
    state.insanity = Math.max(0, state.insanity - 5);
    state.isCrazy = state.insanity >= 100;
    sfx.play("upgrade");
    spawnParticles(NURSE_BED_POS.clone().add(new THREE.Vector3(0, 1.1, 0)), 0x10b981, 16);
    spawnFloatingText(NURSE_BED_POS, "🏥 Vida Cheia!", "#4ade80");
    showToast("🏥", "LAB. DE ENFERMAGEM", "Curativo e triagem completos! Vida 100% restaurada e -5% Insanidade!");
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
  state.jaguar.spawnCooldown = 28;
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
  state.compostDoneToday = false;
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

// Sell Modal Logic (Selling is only enabled at Terminal de Campo Limpo Paulista!)
function openSellModal() {
  clearActiveInputs();
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
      state.inventory[id] = 0;
      sfx.play("sell");
      showToast("💰", "VENDA NO TERMINAL", `+${formatBRL(subtotal)} vendendo ${crop.name}!`);
      updateHUD();
      renderSellModal();
      saveGame();
    });
    sellInventoryList.appendChild(row);
  });

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
      state.inventory[order.cropId] -= order.qty;
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
      state.inventory[id] = 0;
    }
  });
  if (earned <= 0) return;
  state.money += earned;
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
    quote: "E aí Macho! Tô varado de fome aqui na cantina da ETEC, traz 3 Alfaces Crespas pra eu virar fã número 1!",
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

function canFulfillReq(req) {
  return Object.entries(req).every(([cropId, need]) => (state.inventory[cropId] || 0) >= need);
}

function consumeReq(req) {
  Object.entries(req).forEach(([cropId, need]) => {
    state.inventory[cropId] -= need;
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
  clearActiveInputs();
  currentNpcId = npcId;
  state.mode = "modal";
  renderNpcModal();
  npcModal.classList.remove("hidden");
}

function closeNpcModal() {
  npcModal.classList.add("hidden");
  currentNpcId = null;
  state.mode = "playing";
  updateHUD();
}

function renderNpcModal() {
  npcMissionBox.classList.add("hidden");
  if (npcAppearance) {
    if (state.isLambiHomem && !isNpcKnockedOut(currentNpcId)) {
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
            state.kaioAdubo += 1;
          },
        },
        {
          emoji: "⚗️",
          name: "Super-Adubo Turbinado",
          sub: `Colheita 100% instantânea + chance extra dupla • Você tem: ${state.kaioSuperAdubo}`,
          price: 110,
          buy: () => {
            state.kaioSuperAdubo += 1;
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
    npcTag.textContent = "ETECAMP • SEGURANÇA & VASELINA";
    npcName.textContent = "Marcelo (Segurança da ETECAMP)";
    npcDialogue.textContent = state.marceloHired
      ? `Marcelo: "E aí, Macho! Faltam ${state.marceloDaysLeft} dia(s) de vigia no seu sítio. E se quiser correr igual foguete, tenho Vaselina fresquinha pra vender aqui!"`
      : `Marcelo: "Fala, Alyffer! Posso vigiar sua fazenda contra a Onça Pintada, e também vendo Vaselina turbinada — tomou, ficou muito mais rápido!"`;

    if (kaioShopBox) {
      kaioShopBox.classList.remove("hidden");
      kaioShopBox.innerHTML = `<div class="kaio-shop-header">🛡️ Loja do Marcelo (Vaselina &amp; Segurança) • Seu Caixa: ${formatBRL(state.money)}</div>`;
      const marceloItems = [
        {
          emoji: "🧴",
          name: `Vaselina do Marcelo (1 Frasco • Você tem: ${state.vaselina})`,
          sub: "Guarda na mochila! Aperte Z ou clique no botão p/ tomar e ganhar +65% velocidade por 95s!",
          price: 55,
          buy: () => {
            state.vaselina += 1;
            sfx.play("sell");
            showToast("🧴", "VASELINA COMPRADA!", `Você tem ${state.vaselina} frasco(s). Aperte Z para tomar e correr muito mais rápido!`);
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
        state.vaselina -= 1;
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
  }
}

// Calendar & Bus 402 Modal Logic
function openCalendarModal() {
  clearActiveInputs();
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
  clearActiveInputs();
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
  clearActiveInputs();
  stopMiniArcade();
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

// Shop Modal Logic
function openShopModal() {
  clearActiveInputs();
  state.mode = "modal";
  renderShopModal();
  shopModal.classList.remove("hidden");
}

function closeShopModal() {
  shopModal.classList.add("hidden");
  state.mode = "playing";
}

function openCookModal() {
  if (!cookModal) return;
  clearActiveInputs();
  state.mode = "modal";
  renderCookModal();
  cookModal.classList.remove("hidden");
}

function closeCookModal() {
  if (!cookModal) return;
  cookModal.classList.add("hidden");
  state.mode = "playing";
}

function renderCookModal() {
  if (!cookRecipesList) return;
  cookRecipesList.innerHTML = "";
  KITCHEN_RECIPES.forEach((rec) => {
    const canCook = canFulfillReq(rec.req);
    const ownedQty = state.inventory[rec.id] || 0;
    const sellPrice = getCropSellPrice(rec.id);
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${rec.emoji}</span>
        <div>
          <div class="row-title">${rec.name} (Na cesta: ${ownedQty})</div>
          <div class="row-sub">Ingredientes: <strong>${rec.reqLabel}</strong><br/>Venda no Terminal: <strong>${formatBRL(sellPrice)}</strong> • Comer: ${rec.eatEffect.msg}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end">
        <button class="mini-btn green cook-make-btn" ${canCook ? "" : "disabled"}>🍳 Cozinhar</button>
        <button class="mini-btn cook-eat-btn" ${ownedQty > 0 ? "" : "disabled"}>😋 Comer (${ownedQty})</button>
      </div>
    `;
    row.querySelector(".cook-make-btn").addEventListener("click", () => {
      if (!canFulfillReq(rec.req)) return;
      consumeReq(rec.req);
      state.inventory[rec.id] = (state.inventory[rec.id] || 0) + 1;
      sfx.play("cook");
      spawnFloatingText(STOVE_POS, `+1 ${rec.emoji}`, "#facc15");
      showToast(rec.emoji, "PRATO PREPARADO!", `${rec.name} pronto! Venda no Terminal ou coma agora.`);
      updateHUD();
      renderCookModal();
      saveGame();
    });
    row.querySelector(".cook-eat-btn").addEventListener("click", () => {
      if ((state.inventory[rec.id] || 0) <= 0) return;
      state.inventory[rec.id] -= 1;
      state.playerHp = Math.min(state.maxHp, rec.eatEffect.hp || state.maxHp);
      state.energyTimer = Math.max(state.energyTimer, rec.eatEffect.energy || 60);
      if (rec.eatEffect.insanityDelta) {
        state.insanity = THREE.MathUtils.clamp(state.insanity + rec.eatEffect.insanityDelta, 0, 100);
        state.isCrazy = state.insanity >= 100;
      }
      sfx.play("upgrade");
      showToast(rec.emoji, "DELÍCIA DA ROÇA!", rec.eatEffect.msg);
      updateHUD();
      renderCookModal();
      saveGame();
    });
    cookRecipesList.appendChild(row);
  });
}

function renderShopModal() {
  shopMoneyVal.textContent = formatBRL(state.money);
  shopItemsList.innerHTML = "";

  const addHeader = (text) => {
    const h = document.createElement("div");
    h.className = "shop-section-title";
    h.textContent = text;
    shopItemsList.appendChild(h);
  };

  // 1. TERRENOS & EXPANSÃO DA FAZENDA (Preços proporcionais ao progresso!)
  addHeader("🏞️ TERRENOS & EXPANSÃO DA FAZENDA");
  const landItems = [
    {
      emoji: "🌾",
      title: "Pasto Oeste (+12 Canteiros & +5 Animais)",
      sub: state.landLevel >= 1
        ? "Terreno Oeste desbloqueado! +12 canteiros e limite para 11 animais ativos."
        : "Expande a cerca oeste, aumenta limite p/ 11 animais e libera +12 canteiros de plantio!",
      cost: 1200,
      owned: state.landLevel >= 1,
      available: true,
      buy: () => {
        state.landLevel = 1;
        syncUnlockedPlots();
        showDayBanner("🏞️ PASTO OESTE ADQUIRIDO! +12 CANTEIROS & 11 ANIMAIS NO CURRAL!");
      },
    },
    {
      emoji: "🚜",
      title: "Fazenda Leste (+12 Canteiros & +5 Animais)",
      sub: state.landLevel >= 2
        ? "Fazenda Leste desbloqueada! +12 canteiros e limite máximo de 16 animais ativos."
        : state.landLevel < 1
          ? "Requer Pasto Oeste primeiro! Aumenta limite p/ 16 animais e +12 canteiros."
          : "Expande a cerca leste! Limite p/ 16 animais e +12 canteiros na horta (60 totais)!",
      cost: 2800,
      owned: state.landLevel >= 2,
      available: state.landLevel >= 1,
      buy: () => {
        state.landLevel = 2;
        syncUnlockedPlots();
        showDayBanner("🚜 FAZENDA LESTE ADQUIRIDA! 60 CANTEIROS TOTAIS & 16 ANIMAIS!");
      },
    },
  ];

  landItems.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const canBuy = !it.owned && it.available && state.money >= it.cost;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${canBuy ? "" : "disabled"}>
        ${it.owned ? "Comprado ✓" : !it.available ? "Bloqueado" : `Comprar ${formatBRL(it.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canBuy) return;
      state.money -= it.cost;
      it.buy();
      sfx.play("upgrade");
      updateHUD();
      renderShopModal();
      saveGame();
    });
    shopItemsList.appendChild(row);
  });

  // 2. ANIMAIS DO PASTO & CURRAL
  const aliveAnimals = state.animals.filter((a) => a.alive).length;
  const maxAn = getMaxAnimals();
  addHeader(`🐄 ANIMAIS DA FAZENDA (${aliveAnimals}/${maxAn} Animais)`);
  const animalList = [
    {
      type: "cow",
      emoji: "🐄",
      title: "Vaca Leiteira Caipira",
      sub: `Leite Fresco (${formatBRL(CROPS.leite_fresco.basePrice)} c/ Balde 🪣) • Reproduz com 🌾 Trigo (B)`,
      cost: ANIMAL_TYPES.cow.cost,
    },
    {
      type: "sheep",
      emoji: "🐑",
      title: "Ovelha da Mantiqueira",
      sub: `Lã Macia (${formatBRL(CROPS.la_ovelha.basePrice)} c/ Tesoura ✂️) • Reproduz com 🌾 Trigo (B)`,
      cost: ANIMAL_TYPES.sheep.cost,
    },
    {
      type: "pig",
      emoji: "🐷",
      title: "Porco Caipira Raro",
      sub: `Trufas Nobres (${formatBRL(CROPS.trufa_porco.basePrice)}) • Reproduz com 🥕 Cenoura (B)`,
      cost: ANIMAL_TYPES.pig.cost,
    },
  ];

  animalList.forEach((an) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const count = state.animals.filter((a) => a.alive && a.type === an.type).length;
    const canAfford = aliveAnimals < maxAn && state.money >= an.cost;
    const btnText = aliveAnimals >= maxAn ? "Curral Lotado" : `Comprar ${formatBRL(an.cost)}`;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${an.emoji}</span>
        <div>
          <div class="row-title">${an.title} (${count} no sítio)</div>
          <div class="row-sub">${an.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${canAfford ? "" : "disabled"}>${btnText}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (!canAfford) return;
      if (buyAnimal(an.type)) {
        state.money -= an.cost;
        sfx.play("sell");
        showToast(an.emoji, "NOVO ANIMAL ADQUIRIDO!", `${an.title} foi para o pasto! Compre um par p/ reproduzir.`);
        updateHUD();
        renderShopModal();
        saveGame();
      }
    });
    shopItemsList.appendChild(row);
  });

  // 3. AVISO DE FERRAMENTAS & ENXADAS NA ESTAÇÃO CLP
  addHeader("🚉 FERRAMENTAS & ENXADAS ESPECIAIS");
  const curHoe = getActiveHoe();
  const stationHint = document.createElement("div");
  stationHint.className = "row-card";
  stationHint.innerHTML = `
    <div class="row-info">
      <span class="row-emoji">🚉</span>
      <div>
        <div class="row-title">Loja da Estação Ferroviária CLP (Atual: ${curHoe.emoji} ${curHoe.name})</div>
        <div class="row-sub">Pegue o Ônibus 402 até o Terminal CLP e suba na plataforma da Estação p/ comprar Enxadas Especiais, Baldes de Leite 🪣 e Tesoura de Ovelha ✂️!</div>
      </div>
    </div>
  `;
  shopItemsList.appendChild(stationHint);

  // 4. MELHORIAS GERAIS & IRRIGAÇÃO
  addHeader("💧 MELHORIAS DO SÍTIO & IRRIGAÇÃO");
  const plotCost = 110 + state.upgrades.plotTier * 130;
  const canCost = 140 * state.upgrades.canLevel;
  const autoWaterCost = state.upgrades.autoWaterLevel === 0 ? 480 : 1150;
  const fertCost = 180 * state.upgrades.fertLevel;
  const standCost = 220 * state.upgrades.standLevel;

  const basePlotsUnlocked = Math.min(36, 6 + state.upgrades.plotTier * 3);
  const items = [
    {
      emoji: "🌱",
      title: `Expandir Horta Principal (+3 Canteiros)`,
      sub: `Horta base: ${basePlotsUnlocked}/36 canteiros • Total na fazenda: ${getUnlockedPlotCount()}/60`,
      cost: plotCost,
      maxed: state.upgrades.plotTier >= 10,
      buy: () => {
        state.upgrades.plotTier += 1;
        syncUnlockedPlots();
      },
    },
    {
      emoji: "💦",
      title:
        state.upgrades.autoWaterLevel === 0
          ? `Água Automática (Aspersores na Horta)`
          : `Irrigação Automática Pro (Nível ${state.upgrades.autoWaterLevel}/2)`,
      sub:
        state.upgrades.autoWaterLevel === 0
          ? `Instala 6 aspersores 3D que regam toda a horta automaticamente!`
          : state.upgrades.autoWaterLevel === 1
            ? `Nível 2: Irrigação contínua + bônus de +15% na velocidade das plantas!`
            : `Irrigação automática máxima ativa (+15% velocidade)!`,
      cost: autoWaterCost,
      maxed: state.upgrades.autoWaterLevel >= 2,
      buy: () => {
        state.upgrades.autoWaterLevel += 1;
        if (sprinklerGroup) sprinklerGroup.visible = true;
      },
    },
    {
      emoji: "🚿",
      title: `Regador Melhorado (Nível ${state.upgrades.canLevel}/4)`,
      sub:
        state.upgrades.canLevel < 3
          ? `Aumenta capacidade de água (atual: ${getMaxWater()})`
          : `Capacidade maior + rega canteiro vizinho grátis!`,
      cost: canCost,
      maxed: state.upgrades.canLevel >= 4,
      buy: () => {
        state.upgrades.canLevel += 1;
        state.water = getMaxWater();
      },
    },
    {
      emoji: "🌿",
      title: `Solo Fértil da Roça (Nível ${state.upgrades.fertLevel}/4)`,
      sub: `Crescimento +${(state.upgrades.fertLevel - 1) * 25}% • Chance de colheita dupla (p/ adubo turbo, compre com o Kaio na ETEC!)`,
      cost: fertCost,
      maxed: state.upgrades.fertLevel >= 4,
      buy: () => {
        state.upgrades.fertLevel += 1;
      },
    },
    {
      emoji: "🚚",
      title: `Fama nas Bancas do Terminal (Nível ${state.upgrades.standLevel}/4)`,
      sub: `Aumenta preço de venda em +16% por nível`,
      cost: standCost,
      maxed: state.upgrades.standLevel >= 4,
      buy: () => {
        state.upgrades.standLevel += 1;
      },
    },
  ];

  items.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    const affordable = !it.maxed && state.money >= it.cost;
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${affordable ? "" : "disabled"}>
        ${it.maxed ? "Nível Máx ✓" : `Comprar ${formatBRL(it.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (it.maxed || state.money < it.cost) return;
      state.money -= it.cost;
      it.buy();
      sfx.play("upgrade");
      showToast(it.emoji, "MELHORIA COMPRADA!", it.title);
      updateHUD();
      renderShopModal();
      saveGame();
    });
    shopItemsList.appendChild(row);
  });
}

// ============================================================================
// INVENTÁRIO (TECLA I) & LOJA DA ESTAÇÃO CLP (ENXADAS, BALDE & TESOURA)
// ============================================================================
function openInventoryModal() {
  if (!inventoryModal || state.isSleeping || state.mode === "dead") return;
  clearActiveInputs();
  state.mode = "modal";
  renderInventoryModal();
  inventoryModal.classList.remove("hidden");
}

function closeInventoryModal() {
  if (!inventoryModal) return;
  inventoryModal.classList.add("hidden");
  state.mode = "playing";
  updateHUD();
}

function renderInventoryModal() {
  if (!inventoryList) return;
  if (invMoneyVal) invMoneyVal.textContent = formatBRL(state.money);
  const totalWorth = CROP_KEYS.reduce((s, k) => s + (state.inventory[k] || 0) * getCropSellPrice(k), 0);
  if (invBasketWorthVal) invBasketWorthVal.textContent = formatBRL(totalWorth);
  inventoryList.innerHTML = "";

  const addInvHeader = (text) => {
    const h = document.createElement("div");
    h.className = "shop-section-title";
    h.textContent = text;
    inventoryList.appendChild(h);
  };

  addInvHeader("🧰 FERRAMENTAS, EQUIPAMENTOS & INSUMOS");
  const curHoe = getActiveHoe();
  const toolRows = [
    {
      emoji: "🪣",
      title: `Balde Vazio (${state.inventory.balde || 0}x)`,
      sub: "Usado automaticamente ao tirar leite das vacas (consome 1 balde -> +1 Leite Fresco!). Compre na Loja da Estação.",
    },
    {
      emoji: "✂️",
      title: `Tesoura de Tosa (${state.inventory.tesoura >= 1 ? "Equipada ✓" : "Não possui"})`,
      sub:
        state.inventory.tesoura >= 1
          ? "Ferramenta permanente! Aperte E perto de ovelhas com lã para tosquiar."
          : "Compre na Loja da Estação CLP para cortar lã das ovelhas!",
    },
    {
      emoji: curHoe.emoji,
      title: `Enxada Ativa: ${curHoe.name}`,
      sub: `${curHoe.effectDesc} • Possui ${state.ownedHoes.length}/${HOE_KEYS.length} enxada(s)`,
    },
    {
      emoji: "🚿",
      title: `Regador Nível ${state.upgrades.canLevel} (${state.water}/${getMaxWater()} água)`,
      sub: state.upgrades.autoWaterLevel >= 1 ? "Aspersores automáticos ativos na horta!" : "Encha no poço ao lado da casa.",
    },
    {
      emoji: "🧪",
      title: `Adubo Kaio (${state.kaioAdubo}) • Super-Adubo (${state.kaioSuperAdubo}) • Vaselina (${state.vaselina})`,
      sub: "Adubo: aperte F perto de planta crescendo • Vaselina: aperte Z (+65% velocidade!).",
    },
  ];

  toolRows.forEach((tr) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${tr.emoji}</span>
        <div>
          <div class="row-title">${tr.title}</div>
          <div class="row-sub">${tr.sub}</div>
        </div>
      </div>
    `;
    inventoryList.appendChild(row);
  });

  if (state.ownedHoes.length > 1) {
    state.ownedHoes.forEach((hId) => {
      const h = HOES[hId];
      if (!h) return;
      const isAct = state.activeHoe === h.id;
      const row = document.createElement("div");
      row.className = "row-card";
      row.innerHTML = `
        <div class="row-info">
          <span class="row-emoji">${h.emoji}</span>
          <div>
            <div class="row-title">${h.name}</div>
            <div class="row-sub">${h.effectDesc}</div>
          </div>
        </div>
        <button class="mini-btn ${isAct ? "" : "green"}" ${isAct ? "disabled" : ""}>${isAct ? "Equipada ✓" : "Equipar"}</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        state.activeHoe = h.id;
        applyHoeVisual();
        sfx.play("upgrade");
        updateHUD();
        renderInventoryModal();
        saveGame();
      });
      inventoryList.appendChild(row);
    });
  }

  addInvHeader("🧺 COLHEITAS, PRODUTOS ANIMAIS & RECEITAS");
  const breedNotes = {
    milho: " • 🌽 Reproduz Galinhas (B no galinheiro)",
    trigo: " • 🌾 Reproduz Vacas/Ovelhas (B perto delas)",
    cenoura: " • 🥕 Reproduz Porcos (B perto deles)",
  };
  const sortedCrops = [...CROP_KEYS].sort((a, b) => (state.inventory[b] || 0) - (state.inventory[a] || 0));
  sortedCrops.forEach((id) => {
    const crop = CROPS[id];
    const qty = state.inventory[id] || 0;
    const price = getCropSellPrice(id);
    const row = document.createElement("div");
    row.className = "row-card";
    row.style.opacity = qty > 0 ? "1" : "0.62";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${crop.emoji}</span>
        <div>
          <div class="row-title">${crop.name} (${qty}x)</div>
          <div class="row-sub">Valor hoje no Terminal: <strong>${formatBRL(price)}</strong>${breedNotes[id] || ""}</div>
        </div>
      </div>
    `;
    inventoryList.appendChild(row);
  });
}

function openStationShopModal() {
  if (!stationShopModal || state.isSleeping || state.mode === "dead") return;
  clearActiveInputs();
  state.mode = "modal";
  renderStationShopModal();
  stationShopModal.classList.remove("hidden");
}

function closeStationShopModal() {
  if (!stationShopModal) return;
  stationShopModal.classList.add("hidden");
  state.mode = "playing";
  updateHUD();
}

function renderStationShopModal() {
  if (!stationShopItemsList) return;
  if (stationShopMoneyVal) stationShopMoneyVal.textContent = formatBRL(state.money);
  stationShopItemsList.innerHTML = "";

  const addStHeader = (text) => {
    const h = document.createElement("div");
    h.className = "shop-section-title";
    h.textContent = text;
    stationShopItemsList.appendChild(h);
  };

  addStHeader("🪣 FERRAMENTAS DE MANEJO ANIMAL (ESTAÇÃO CLP)");
  const baldeInfo = STATION_TOOLS.balde;
  const tesouraInfo = STATION_TOOLS.tesoura;
  const ownedTesoura = (state.inventory.tesoura || 0) >= 1;

  const toolEntries = [
    {
      emoji: baldeInfo.emoji,
      title: `${baldeInfo.name} (Você tem: ${state.inventory.balde || 0}x)`,
      sub: baldeInfo.desc,
      cost: baldeInfo.cost,
      disabled: state.money < baldeInfo.cost,
      btnText: `Comprar ${formatBRL(baldeInfo.cost)}`,
      onBuy: () => {
        state.money -= baldeInfo.cost;
        state.inventory.balde = (state.inventory.balde || 0) + 1;
        sfx.play("sell");
        showToast("🪣", "BALDE COMPRADO!", `Agora você tem ${state.inventory.balde} balde(s) vazio(s) no Inventário (I)!`);
      },
    },
    {
      emoji: tesouraInfo.emoji,
      title: `${tesouraInfo.name} ${ownedTesoura ? "✓" : ""}`,
      sub: tesouraInfo.desc,
      cost: tesouraInfo.cost,
      disabled: ownedTesoura || state.money < tesouraInfo.cost,
      btnText: ownedTesoura ? "Comprada ✓" : `Comprar ${formatBRL(tesouraInfo.cost)}`,
      onBuy: () => {
        state.money -= tesouraInfo.cost;
        state.inventory.tesoura = 1;
        sfx.play("upgrade");
        showDayBanner("✂️ TESOURA DE TOSA COMPRADA! AGORA VOCÊ PODE TOSQUIAR AS OVELHAS!");
        showToast("✂️", "TESOURA DE TOSA!", "Vá até as ovelhas com lã e aperte E para cortar lã!");
      },
    },
  ];

  toolEntries.forEach((it) => {
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${it.emoji}</span>
        <div>
          <div class="row-title">${it.title}</div>
          <div class="row-sub">${it.sub}</div>
        </div>
      </div>
      <button class="mini-btn green" ${it.disabled ? "disabled" : ""}>${it.btnText}</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (it.disabled) return;
      it.onBuy();
      updateHUD();
      renderStationShopModal();
      saveGame();
    });
    stationShopItemsList.appendChild(row);
  });

  addStHeader("⛏️ ENXADAS ESPECIAIS DE COMBATE & PLANTIO");
  HOE_KEYS.forEach((hoeKey) => {
    const hoe = HOES[hoeKey];
    const isOwned = state.ownedHoes.includes(hoe.id);
    const isActive = state.activeHoe === hoe.id;
    const canBuy = !isOwned && state.money >= hoe.cost;
    const row = document.createElement("div");
    row.className = "row-card";
    row.innerHTML = `
      <div class="row-info">
        <span class="row-emoji">${hoe.emoji}</span>
        <div>
          <div class="row-title">${hoe.name} ${isActive ? "⭐ Equipada" : ""}</div>
          <div class="row-sub">${hoe.effectDesc}</div>
        </div>
      </div>
      <button class="mini-btn ${isActive ? "" : "green"}" ${isActive || (!isOwned && !canBuy) ? "disabled" : ""}>
        ${isActive ? "Equipada ✓" : isOwned ? "Equipar" : `Comprar ${formatBRL(hoe.cost)}`}
      </button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      if (isActive) return;
      if (isOwned) {
        state.activeHoe = hoe.id;
        applyHoeVisual();
        sfx.play("upgrade");
        showToast(hoe.emoji, "ENXADA EQUIPADA!", `${hoe.name} na sua mão!`);
      } else if (state.money >= hoe.cost) {
        state.money -= hoe.cost;
        state.ownedHoes.push(hoe.id);
        state.activeHoe = hoe.id;
        applyHoeVisual();
        sfx.play("upgrade");
        showDayBanner(`⚔️ ${hoe.name.toUpperCase()} ADQUIRIDA NA ESTAÇÃO! ${hoe.effectDesc}`);
        showToast(hoe.emoji, "ENXADA COMPRADA!", `${hoe.name} equipada!`);
      }
      updateHUD();
      renderStationShopModal();
      saveGame();
    });
    stationShopItemsList.appendChild(row);
  });
}

// Input & Controls
const keys = {};
let touchActionHeld = false;
const holdActionState = { timer: 0, lockedMode: null };

function cycleSelectedSeed(dir) {
  const curIdx = Math.max(0, SEED_KEYS.indexOf(state.selectedCrop));
  const nextIdx = (curIdx + dir + SEED_KEYS.length) % SEED_KEYS.length;
  state.selectedCrop = SEED_KEYS[nextIdx];
  updateSeedHotbarUI();
}

window.addEventListener("keydown", (e) => {
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) {
    if (e.code === "Escape" && phoneModal && !phoneModal.classList.contains("hidden")) {
      closePhoneModal();
    }
    return;
  }

  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    if (state.mode === "playing") e.preventDefault();
  }

  if (e.code === "Escape") {
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

  if (e.code === "KeyI") {
    if (inventoryModal && !inventoryModal.classList.contains("hidden")) {
      closeInventoryModal();
      return;
    }
    if (state.mode === "playing") {
      openInventoryModal();
      return;
    }
  }

  if (state.mode !== "playing") {
    keys[e.code] = true;
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
    } else if (e.code === "KeyT") {
      openPhoneModal("home");
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
      if (state.ridingJaguar) {
        dismountTamedJaguar();
      } else if (canMountTamedJaguar()) {
        mountTamedJaguar();
      } else {
        const nearTj = getActiveTamedJaguar();
        if (state.tamedJaguarDown && nearTj && nearTj.mesh.visible && distXZ(player.pos, nearTj.mesh.position) < 2.9) {
          showToast("💤", "ONÇA INATIVA!", `Ela apanhou muito e está deitada se recuperando (${Math.ceil(state.tamedJaguarRecoverTimer)}s).`);
        } else {
          toggleEquippedTool();
        }
      }
    } else if (e.code === "KeyX") {
      if (state.location === "yard" && dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 2.8) {
        kickOrelha();
      }
    } else if (e.code === "KeyV") {
      toggleFirstPerson();
    } else if (e.code === "KeyK") {
      openCalendarModal();
    } else if (e.code === "KeyG") {
      openGuideModal();
    } else if (e.code === "KeyL") {
      openShopModal();
    } else if (e.code === "KeyO") {
      openSellModal();
    } else if (e.code === "KeyP") {
      togglePause();
    } else if (e.code === "KeyM") {
      toggleMute();
    } else if (e.code === "BracketLeft") {
      cycleSelectedSeed(-1);
    } else if (e.code === "BracketRight") {
      cycleSelectedSeed(1);
    } else if (/^Digit[0-9]$/.test(e.code)) {
      const num = Number(e.code.replace("Digit", ""));
      const idx = num === 0 ? 9 : num - 1;
      if (SEED_KEYS[idx]) {
        state.selectedCrop = SEED_KEYS[idx];
        updateSeedHotbarUI();
      }
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

document.querySelectorAll(".seed-slot").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.selectedCrop = btn.dataset.crop;
    updateSeedHotbarUI();
  });
});

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

renderer.domElement.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) return;
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
    const sens = e.pointerType === "touch" ? 0.0082 : 0.0065;
    state.camYaw -= dx * sens;
    if (state.firstPerson) {
      state.fpPitch = THREE.MathUtils.clamp(state.fpPitch - dy * 0.0048, -0.85, 0.85);
    } else {
      state.camPitch = THREE.MathUtils.clamp(state.camPitch + dy * 0.0052, 0.22, 1.08);
    }
  }
});

function handleCanvasPointerEnd(e, isCancel) {
  if (!canvasPointers.has(e.pointerId)) return;
  const wasTap =
    !isCancel &&
    e.pointerId === orbitPointerId &&
    canvasPointers.size === 1 &&
    (e.pointerType !== "mouse" || orbitButton === 0) &&
    !orbitMoved &&
    !orbitHadPinch &&
    state.mode === "playing" &&
    state.location === "yard";

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

  if (wasTap) {
    if (state.jaguar.active && state.equippedTool === "hoe") {
      attackJaguarWithHoe();
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
    if (e.shiftKey && state.mode === "playing") {
      cycleSelectedSeed(e.deltaY > 0 ? 1 : -1);
      return;
    }
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
  pauseScreen.classList.add("hidden");
  sellModal.classList.add("hidden");
  shopModal.classList.add("hidden");
  npcModal.classList.add("hidden");
  guideModal.classList.add("hidden");
  calendarModal.classList.add("hidden");
  if (cookModal) cookModal.classList.add("hidden");
  if (phoneModal) phoneModal.classList.add("hidden");
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
    clearActiveInputs();
    state.mode = "paused";
    pauseScreen.classList.remove("hidden");
  } else if (state.mode === "paused") {
    state.mode = "playing";
    pauseScreen.classList.add("hidden");
  }
}

function toggleMute() {
  sfx.muted = !sfx.muted;
  muteBtn.textContent = sfx.muted ? "🔇" : "🔊";
}

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
if (toolModeBtn) toolModeBtn.addEventListener("click", toggleEquippedTool);
if (vaselinaHudBtn) vaselinaHudBtn.addEventListener("click", drinkVaselina);
if (kickDogBtn) kickDogBtn.addEventListener("click", kickOrelha);
if (respawnBtn) respawnBtn.addEventListener("click", respawnPlayer);
if (camModeBtn) camModeBtn.addEventListener("click", toggleFirstPerson);
if (calendarHudBtn) calendarHudBtn.addEventListener("click", openCalendarModal);
if (calendarPill) calendarPill.addEventListener("click", openCalendarModal);
if (closeCalendarBtn) closeCalendarBtn.addEventListener("click", closeCalendarModal);
guideHudBtn.addEventListener("click", openGuideModal);
ordersHudBtn.addEventListener("click", openSellModal);
shopHudBtn.addEventListener("click", openShopModal);
closeSellBtn.addEventListener("click", closeSellModal);
closeShopBtn.addEventListener("click", closeShopModal);
if (inventoryHudBtn) inventoryHudBtn.addEventListener("click", openInventoryModal);
if (closeInventoryBtn) closeInventoryBtn.addEventListener("click", closeInventoryModal);
if (closeStationShopBtn) closeStationShopBtn.addEventListener("click", closeStationShopModal);
closeNpcBtn.addEventListener("click", closeNpcModal);
closeGuideBtn.addEventListener("click", closeGuideModal);
if (closeCookBtn) closeCookBtn.addEventListener("click", closeCookModal);
if (phoneHudBtn) phoneHudBtn.addEventListener("click", () => openPhoneModal("home"));
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

// Update Day/Night Sky & Lighting
const indoorBgColor = new THREE.Color(0x181420);
const rainySkyColor = new THREE.Color(0x526375);

function updateSkyAndTime(dt) {
  state.dayMinutes += dt * 4.5;
  if (state.day >= 7 && state.day % 7 === 0 && state.dayMinutes >= 22 * 60 && state.lambiTriggeredDay !== state.day) {
    activateLambiHomem();
  }
  if (state.dayMinutes >= 24 * 60) {
    state.dayMinutes -= 24 * 60;
    state.day += 1;
    state.workEndNotifiedToday = false;
  }
  if (state.dayMinutes >= WORK_END_MINUTES && !state.workEndNotifiedToday) {
    state.workEndNotifiedToday = true;
    showDayBanner("🌙 19:00 — EXPEDIENTE ENCERRADO! DEPOIS DAS 19H O MACHO NÃO PODE TRABALHAR!");
    showToast("🌙", "HORA DE DESCANSAR", "Passou das 19:00! Vá dormir na cama quando quiser avançar o dia.");
  }
  syncBusModelsVisibility();

  rainGroup.visible = state.isRainy && state.location !== "room" && state.location !== "etec_inside" && state.location !== "basement";
  if (rainGroup.visible) {
    rainGroup.position.set(player.pos.x, 0, player.pos.z);
  }

  if (state.location === "room" || state.location === "etec_inside" || state.location === "basement") {
    scene.background = indoorBgColor;
    scene.fog.color.copy(indoorBgColor);
    sunLight.intensity = state.location === "basement" ? 0.35 : 0.65;
    hemiLight.intensity = state.location === "basement" ? 0.45 : 0.72;
    return;
  }

  const hour = state.dayMinutes / 60;
  const tDay = THREE.MathUtils.clamp((hour - 6) / 14, 0, 1);
  const sunArc = hour < 6 ? 0 : Math.sin(tDay * Math.PI);

  const morningColor = new THREE.Color(0x9bd6ee);
  const noonColor = new THREE.Color(0x7cc6f2);
  const duskColor = new THREE.Color(0xe68a5c);
  const nightColor = new THREE.Color(0x16213e);

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
  sunLight.position.set(Math.cos(tDay * Math.PI) * 38, 12 + sunArc * 36, 20);
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
  well: "💧",
  coop: "🥚",
  compost: "🌿",
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
  talk_marcelo_yard: "🛡️",
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

  const inputVec = new THREE.Vector2(moveX, moveZ);
  const inputLen = inputVec.length();
  const isAirfryerStatic = state.activeTitle === "Airfryer";
  if (isAirfryerStatic && inputLen > 0.01 && airfryerHintCd <= 0) {
    airfryerHintCd = 4.5;
    showToast("🍟", "MODO AIRFRYER PARADA!", "Com o título Airfryer você fica parado! Clique no título ou aperte G para trocar.");
  }
  const moving = !isAirfryerStatic && inputLen > 0.01;
  if (moving) {
    const analogScale = hasKb ? 1 : Math.min(1, inputLen);
    inputVec.normalize();
    const sinY = Math.sin(state.camYaw);
    const cosY = Math.cos(state.camYaw);
    const worldMove = new THREE.Vector3(
      inputVec.x * cosY + inputVec.y * sinY,
      0,
      -inputVec.x * sinY + inputVec.y * cosY
    ).normalize();

    const activeHoeData = HOES[state.activeHoe] || HOES.comum;
    const hoeSpeed = state.equippedTool === "hoe" ? (activeHoeData.speedBoost || 1.0) : 1.0;
    const baseSpeed = state.location === "room" ? 5.2 : 7.6;
    const vaselinaBoost = state.vaselinaTimer > 0 ? 1.65 : 1.0;
    const rideBoost = state.ridingJaguar ? 1.58 : 1.0;
    const boostMult = (state.isCrazy ? 1.25 : 1.0) * (state.energyTimer > 0 ? 1.32 : 1.0) * vaselinaBoost * hoeSpeed;
    const walkSpeed = baseSpeed * boostMult * rideBoost * analogScale;

    const farmBounds = getFarmBounds();
    let minX = farmBounds.minX;
    let maxX = farmBounds.maxX;
    let minZ = -28.5;
    let maxZ = 48.5;
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
      minX = -15.4;
      maxX = 15.4;
      minZ = -32.3;
      maxZ = 43.3;
      activeObstacles = etecInsideObstacles;
    }

    let finalX = THREE.MathUtils.clamp(player.pos.x + worldMove.x * walkSpeed * dt, minX, maxX);
    let finalZ = THREE.MathUtils.clamp(player.pos.z + worldMove.z * walkSpeed * dt, minZ, maxZ);

    // 2-pass AABB obstacle push-out so corners/walls never clip
    for (let iter = 0; iter < 2; iter++) {
      for (const obs of activeObstacles) {
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
  const rideYOffset = state.ridingJaguar ? 0.62 : 0;
  playerMesh.position.set(player.pos.x, player.pos.y + rideYOffset, player.pos.z);
  if (state.firstPerson) {
    player.facingYaw = state.camYaw + Math.PI;
  }
  playerMesh.rotation.y = player.facingYaw;
  playerMesh.rotation.z = state.isCrazy && !isAirfryerStatic ? Math.sin(state.animTime * 11) * 0.08 : 0;

  if (state.ridingJaguar) {
    const mountJag = getActiveTamedJaguar();
    if (mountJag) {
      mountJag.mesh.visible = true;
      setJagTagVisible(mountJag, false);
      mountJag.mesh.position.set(player.pos.x, player.pos.y, player.pos.z);
      mountJag.mesh.rotation.y = player.facingYaw;
      mountJag.mesh.rotation.z = 0;
      const gallop = moving ? Math.sin(state.animTime * 15) * 0.68 : 0;
      if (moving) mountJag.mesh.position.y += Math.abs(gallop) * 0.05;
      if (mountJag.legs && mountJag.legs.length === 4) {
        mountJag.legs[0].rotation.x = gallop;
        mountJag.legs[3].rotation.x = gallop;
        mountJag.legs[1].rotation.x = -gallop;
        mountJag.legs[2].rotation.x = -gallop;
      }
      if (mountJag.tail) {
        mountJag.tail.rotation.y = Math.sin(state.animTime * (moving ? 12 : 4)) * (moving ? 0.34 : 0.16);
      }
    }
  }

  const {
    leftEye,
    rightEye,
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
    leftEye.visible = !state.isCrazy && !lambi;
    rightEye.visible = !state.isCrazy && !lambi;
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
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, -0.78, 14 * dt);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -0.78, 14 * dt);
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, 0.24, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, -0.24, 14 * dt);
      if (leftShin) leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, 0.92, 14 * dt);
      if (rightShin) rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, 0.92, 14 * dt);
      if (modelRoot) {
        modelRoot.position.y = moving ? Math.abs(Math.sin(state.animTime * 15)) * 0.045 : 0;
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, moving ? 0.16 : 0.08, 10 * dt);
      }
    } else if (inAir) {
      leftLeg.rotation.z = THREE.MathUtils.lerp(leftLeg.rotation.z, 0, 14 * dt);
      rightLeg.rotation.z = THREE.MathUtils.lerp(rightLeg.rotation.z, 0, 14 * dt);
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, 0.38, 14 * dt);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -0.32, 14 * dt);
      if (leftShin) leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, 0.56, 14 * dt);
      if (rightShin) rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, 0.44, 14 * dt);
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
      if (leftShin) leftShin.rotation.x = liftL * 0.62 + 0.05;
      if (rightShin) rightShin.rotation.x = liftR * 0.62 + 0.05;
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
      if (leftShin) leftShin.rotation.x = THREE.MathUtils.lerp(leftShin.rotation.x, state.isCrazy ? 0.12 : 0, 11 * dt);
      if (rightShin) rightShin.rotation.x = THREE.MathUtils.lerp(rightShin.rotation.x, state.isCrazy ? 0.12 : 0, 11 * dt);
      if (modelRoot) {
        modelRoot.position.y = Math.sin(state.animTime * 2.4) * 0.015;
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, 0, 10 * dt);
      }
    }

    // 2. BRAÇOS, COTOVELOS & GOLPE DE FERRAMENTA (independentes das pernas!)
    if (state.swingTimer > 0) {
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
          spawnParticles(new THREE.Vector3(sh.x, 0.72, sh.z), 0x38bdf8, 4);
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

    if (dogOrelha) {
      dogOrelha.tail.rotation.z = Math.sin(state.animTime * 14) * 0.35;
      if (dogOrelha.leftEar && dogOrelha.rightEar) {
        dogOrelha.leftEar.rotation.z = 0.18 + Math.sin(state.animTime * 7) * 0.08;
        dogOrelha.rightEar.rotation.z = -0.18 - Math.sin(state.animTime * 7) * 0.08;
      }
      if (dogOrelha.wait > 0) {
        dogOrelha.wait -= dt;
        dogOrelha.mesh.position.y = THREE.MathUtils.lerp(dogOrelha.mesh.position.y, 0, 12 * dt);
        if (dogOrelha.legs) {
          dogOrelha.legs.forEach((lg) => {
            lg.rotation.x = THREE.MathUtils.lerp(lg.rotation.x, 0, 12 * dt);
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
          dogOrelha.mesh.position.x += (dx / dist) * 2.1 * dt;
          dogOrelha.mesh.position.z += (dz / dist) * 2.1 * dt;
          dogOrelha.mesh.rotation.y = Math.atan2(dx, dz);
          const trot = Math.sin(state.animTime * 15) * 0.55;
          dogOrelha.mesh.position.y = Math.abs(trot) * 0.05;
          if (dogOrelha.legs && dogOrelha.legs.length === 4) {
            dogOrelha.legs[0].rotation.x = trot;
            dogOrelha.legs[3].rotation.x = trot;
            dogOrelha.legs[1].rotation.x = -trot;
            dogOrelha.legs[2].rotation.x = -trot;
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
        if (state.jaguar.checkAccum >= 6.0) {
          state.jaguar.checkAccum = 0;
          // Onça aparece mais quando há animais na fazenda
          const chance = state.animals.some((a) => a.alive) ? 0.3 : 0.22;
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
            if (state.ridingJaguar) {
              damageTamedJaguar(24);
              state.playerHp = Math.max(0, state.playerHp - 12);
            } else {
              state.playerHp = Math.max(0, state.playerHp - 25);
              spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xef4444, 16);
              showToast("🐆", "ARRANHÃO DA ONÇA!", `Você perdeu 25 HP! Vida: ${state.playerHp}/${state.maxHp} • Use a Enxada (R)!`);
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
        mm.mesh.position.y = THREE.MathUtils.lerp(mm.mesh.position.y, 0, 10 * dt);
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
          tj.mesh.position.y = Math.abs(gallop) * 0.05;
          if (tj.legs && tj.legs.length === 4) {
            tj.legs[0].rotation.x = gallop;
            tj.legs[3].rotation.x = gallop;
            tj.legs[1].rotation.x = -gallop;
            tj.legs[2].rotation.x = -gallop;
          }
          if (tj.tail) tj.tail.rotation.y = Math.sin(state.animTime * 11) * 0.32;
        } else {
          tj.mesh.position.y = THREE.MathUtils.lerp(tj.mesh.position.y, 0, 10 * dt);
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
      state.jaguar.spawnCooldown = 35;
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

      // Colisão leve com a tabela branca da cesta isolada
      if (bPos.x < 13.55 && bPos.x > 13.1 && Math.abs(bPos.z - ETEC_HOOP_RIM.z) < 0.96 && bPos.y > 2.9 && bPos.y < 4.25) {
        bPos.x = 13.55;
        etecBall.vx = Math.abs(etecBall.vx) * 0.55;
      }

      // Cesta! Bola descendo pelo aro da cesta isolada ao lado da janela
      const rimDist = Math.hypot(bPos.x - ETEC_HOOP_RIM.x, bPos.z - ETEC_HOOP_RIM.z);
      if (etecBall.vy < 0 && etecBall.scoredCd <= 0 && rimDist < 0.48 && Math.abs(bPos.y - ETEC_HOOP_RIM.y) < 0.52) {
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
          showDayBanner("🏀 CESTA DE PLACA NA QUADRA DA ETECAMP! +R$ 10 & -10% INSANIDADE!");
          showToast("🏀", "CHUÁ NA CESTA!", "Você acertou a cesta isolada! Ganhou R$ 10 e relaxou -10% da mente!");
          updateHUD();
          saveGame();
        } else {
          showToast("🏀", "CHUÁ!!", "Mais uma bola na cesta isolada da ETECAMP!");
        }
      }

      if (bPos.x < 11.7) {
        bPos.x = 11.7;
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
    const chaseSpeed = 5.4;
    if (dist > 1.35) {
      const nx = THREE.MathUtils.clamp(mx + (dx / dist) * chaseSpeed * dt, -34.0, 20.0);
      const nz = THREE.MathUtils.clamp(mz + (dz / dist) * chaseSpeed * dt, -25.0, 21.0);
      maluquinhoEntity.mesh.position.set(nx, getFloorYAt(nx, nz), nz);
    }
    maluquinhoEntity.mesh.rotation.y = Math.atan2(dx, dz);
    // Animação agitada do Menino Maluquinho (panela balançando + pulinhos!)
    const bounce = Math.abs(Math.sin(state.animTime * 14)) * 0.22;
    maluquinhoEntity.mesh.position.y = getFloorYAt(maluquinhoEntity.mesh.position.x, maluquinhoEntity.mesh.position.z) + bounce;
    maluquinhoEntity.potGroup.rotation.z = -0.18 + Math.sin(state.animTime * 16) * 0.16;
    maluquinhoEntity.lArm.rotation.x = -1.2 + Math.sin(state.animTime * 18) * 0.7;
    maluquinhoEntity.rArm.rotation.x = -1.2 - Math.sin(state.animTime * 18) * 0.7;
    maluquinhoEntity.lLeg.rotation.x = Math.sin(state.animTime * 16) * 0.7;
    maluquinhoEntity.rLeg.rotation.x = -Math.sin(state.animTime * 16) * 0.7;

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
    if (dist < 2.8 && state.maluquinho.tormentCd <= 0) {
      state.maluquinho.tormentCd = 2.4;
      sfx.play("maluquinho");
      spawnParticles(player.pos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0x38bdf8, 10);
      addInsanity(8, false);
      showToast("🍲", "ATORMENTADO NO TERMINAL!", state.maluquinho.currentLine || "O Menino Maluquinho não te larga!");
    }
  } else {
    if (state.maluquinho.active) {
      state.maluquinho.active = false;
      state.maluquinho.announced = false;
      if (maluquinhoEntity) maluquinhoEntity.mesh.visible = false;
    }
    if (maluquinhoBubble) maluquinhoBubble.classList.add("hidden");
  }

  // Botão secundário "Chutar o Orelha" aparece quando perto do Orelha
  if (kickDogBtn) {
    const nearOrelha = state.location === "yard" && dogOrelha && distXZ(player.pos, dogOrelha.mesh.position) < 2.5;
    kickDogBtn.classList.toggle("hidden", !nearOrelha);
  }

  // Update Context Prompt only when changed
  const ctx = findCurrentContext();
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

  if (sprinklerGroup && sprinklerGroup.visible && state.location === "yard") {
    const spinSpeed = state.upgrades.autoWaterLevel >= 2 ? 7.0 : 4.2;
    sprinklerHeads.forEach((sh) => {
      sh.head.rotation.y += spinSpeed * dt;
    });
  }

  if (rainGroup.visible) {
    for (const drop of rainDrops) {
      drop.position.y -= 26 * dt;
      if (drop.position.y < 0) {
        drop.position.y = 18 + Math.random() * 4;
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

function updateCamera(dt, immediate = false) {
  if (state.mode === "start" && !immediate) {
    state.camYaw += 0.16 * dt;
  }

  if (state.firstPerson && state.mode !== "start") {
    playerMesh.visible = false;
    const baseEyeH = state.activeTitle === "Airfryer" ? 1.25 : 2.25;
    const eyeY = player.pos.y + baseEyeH + (state.isCrazy && state.activeTitle !== "Airfryer" ? Math.sin(state.animTime * 14) * 0.04 : 0);
    const desiredPos = new THREE.Vector3(player.pos.x, eyeY, player.pos.z);
    if (immediate) {
      camera.position.copy(desiredPos);
    } else {
      camera.position.lerp(desiredPos, Math.min(1, 18 * dt));
    }
    const lookDir = new THREE.Vector3(
      -Math.sin(state.camYaw) * Math.cos(state.fpPitch),
      Math.sin(state.fpPitch),
      -Math.cos(state.camYaw) * Math.cos(state.fpPitch)
    );
    camera.lookAt(desiredPos.clone().add(lookDir));

    // Braços em 1ª pessoa fazendo o gesto "6-7" quando Coringando, ou ferramenta equipada (Enxada / Regador)!
    fpCrazyArmsGroup.visible = state.isCrazy && state.activeTitle !== "Airfryer" && state.mode === "playing";
    fpToolGroup.visible = !state.isCrazy && state.activeTitle !== "Airfryer" && state.mode === "playing" && (state.location === "yard" || state.equippedTool === "hoe");
    if (fpToolGroup.visible) {
      fpToolGroup.userData.fpCan.visible = state.equippedTool === "water" && state.location === "yard";
      fpToolGroup.userData.fpHoe.visible = state.equippedTool === "hoe";
      const swingAmt = state.swingTimer > 0 ? Math.sin(state.swingTimer * 24) * 0.65 : 0;
      fpToolGroup.rotation.x = -swingAmt;
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
      ? new THREE.Vector3(-1, 1.5, -1)
      : player.pos.clone().add(new THREE.Vector3(0, 1.6, 0));

  const dist = state.mode === "start" ? 26 : state.camDist;
  const pitch = state.mode === "start" ? 0.36 : state.camPitch;

  const camX = target.x + Math.sin(state.camYaw) * Math.cos(pitch) * dist;
  const camY = target.y + Math.sin(pitch) * dist;
  const camZ = target.z + Math.cos(state.camYaw) * Math.cos(pitch) * dist;

  if (immediate) {
    camera.position.set(camX, camY, camZ);
  } else {
    camera.position.lerp(
      new THREE.Vector3(camX, camY, camZ),
      state.mode === "start" ? 0.05 : Math.min(1, 10 * dt)
    );
  }
  camera.lookAt(target);
  if (state.location === "terminal" && terminalRoofSlabs.length) {
    for (const slab of terminalRoofSlabs) {
      slab.visible = true;
      const mat = slab.userData.baseMat;
      if (!mat) continue;
      const shouldFade = !state.firstPerson && camera.position.y > (slab.userData.cutY || 7.0);
      if (slab.userData.faded !== shouldFade) {
        slab.userData.faded = shouldFade;
        mat.transparent = shouldFade;
        mat.opacity = shouldFade ? 0.52 : 1.0;
        mat.depthWrite = !shouldFade;
        mat.needsUpdate = true;
      }
    }
  }
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
  resetSaveBtn.classList.remove("hidden");
  saveInfoLine.textContent = `Sítio salvo encontrado: Dia ${state.day} • Caixa ${formatBRL(state.money)} • Título: ${state.activeTitle}`;
  startBtn.textContent = "Continuar no Sítio do Macho";
}
updateHUD();
playerMesh.position.copy(player.pos);
playerMesh.rotation.y = player.facingYaw;
updateSkyAndTime(0);
updateCamera(0.016, true);
renderer.render(scene, camera);

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  updateAmbient(dt);
  if (state.mode === "playing") {
    updateGame(dt);
  }
  updateCamera(dt);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

window.addEventListener("resize", updateCameraProjection);
window.addEventListener("orientationchange", () => {
  updateCameraProjection();
  setTimeout(updateCameraProjection, 160);
});
