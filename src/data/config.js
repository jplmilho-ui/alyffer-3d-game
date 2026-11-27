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
    basePrice: 430,
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
    basePrice: 130,
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
    basePrice: 185,
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
    basePrice: 160,
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
    basePrice: 310,
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
    basePrice: 435,
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

