// Web Audio SFX + Ambient Rain/Location Sound + Optional Cozy Procedural BGM
const AUDIO_PREFS_KEY = "macho_horta_3d_audio_v1";

class SoundFX {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.muted = false;
    this.volume = 1.0;
    this.ambientEnabled = true;
    this.bgmEnabled = false;

    // Ambient nodes
    this.noiseBuffer = null;
    this.rainSource = null;
    this.rainFilter = null;
    this.rainGain = null;
    this.ambSource = null;
    this.ambFilter = null;
    this.ambGain = null;
    this.bgmTimer = null;
    this.bgmStep = 0;
    this.cricketTimer = 0;

    try {
      const saved = JSON.parse(localStorage.getItem(AUDIO_PREFS_KEY) || "null");
      if (saved && typeof saved === "object") {
        this.muted = Boolean(saved.muted);
        if (typeof saved.volume === "number" && Number.isFinite(saved.volume)) {
          this.volume = Math.max(0, Math.min(1, saved.volume));
        }
        if (typeof saved.ambientEnabled === "boolean") this.ambientEnabled = saved.ambientEnabled;
        if (typeof saved.bgmEnabled === "boolean") this.bgmEnabled = saved.bgmEnabled;
      }
    } catch (_) {
      // ignore storage errors
    }
  }

  savePrefs() {
    try {
      localStorage.setItem(
        AUDIO_PREFS_KEY,
        JSON.stringify({
          muted: this.muted,
          volume: this.volume,
          ambientEnabled: this.ambientEnabled,
          bgmEnabled: this.bgmEnabled,
        })
      );
    } catch (_) {
      // ignore storage errors
    }
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime, 0.04);
    }
    this.savePrefs();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, Number(vol) || 0));
    if (this.masterGain && this.ctx && !this.muted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.04);
    }
    this.savePrefs();
  }

  setAmbientEnabled(enabled) {
    this.ambientEnabled = Boolean(enabled);
    if (!this.ambientEnabled && this.ctx) {
      if (this.rainGain) this.rainGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
      if (this.ambGain) this.ambGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    }
    this.savePrefs();
  }

  setBgmEnabled(enabled) {
    this.bgmEnabled = Boolean(enabled);
    if (this.bgmEnabled) {
      this.init();
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }
    this.savePrefs();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.muted ? 0 : this.volume;
        this.masterGain.connect(this.ctx.destination);
        this.initAmbientNodes();
        if (this.bgmEnabled) this.startBgmLoop();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      try {
        const res = this.ctx.resume();
        if (res && typeof res.catch === "function") res.catch(() => {});
      } catch (_) {
        // ignore autoplay resume errors
      }
    }
  }

  initAmbientNodes() {
    if (!this.ctx || !this.masterGain || this.noiseBuffer) return;
    try {
      const sr = this.ctx.sampleRate || 44100;
      const len = sr * 2;
      const buf = this.ctx.createBuffer(1, len, sr);
      const data = buf.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.04 * white) / 1.04;
        data[i] = lastOut * 2.8;
      }
      this.noiseBuffer = buf;

      // Rain bed
      this.rainSource = this.ctx.createBufferSource();
      this.rainSource.buffer = this.noiseBuffer;
      this.rainSource.loop = true;
      this.rainFilter = this.ctx.createBiquadFilter();
      this.rainFilter.type = "bandpass";
      this.rainFilter.frequency.value = 1100;
      this.rainFilter.Q.value = 0.65;
      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.value = 0;
      this.rainSource.connect(this.rainFilter);
      this.rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      this.rainSource.start();

      // Location breeze / hum bed
      this.ambSource = this.ctx.createBufferSource();
      this.ambSource.buffer = this.noiseBuffer;
      this.ambSource.loop = true;
      this.ambFilter = this.ctx.createBiquadFilter();
      this.ambFilter.type = "lowpass";
      this.ambFilter.frequency.value = 320;
      this.ambGain = this.ctx.createGain();
      this.ambGain.gain.value = 0;
      this.ambSource.connect(this.ambFilter);
      this.ambFilter.connect(this.ambGain);
      this.ambGain.connect(this.masterGain);
      this.ambSource.start();
    } catch (_) {
      // ignore audio node errors
    }
  }

  updateAmbient(dt, location, isRainy, isNight, active) {
    if (!this.ctx || !this.rainGain || !this.ambGain) return;
    const now = this.ctx.currentTime;
    const canPlay = active && this.ambientEnabled && !this.muted && this.volume > 0 && !document.hidden;
    const isIndoor = location === "room" || location === "basement" || location === "etec_inside";

    const targetRain = canPlay && isRainy ? (isIndoor ? 0.018 : 0.065) : 0;
    this.rainGain.gain.setTargetAtTime(targetRain, now, 0.25);

    let targetAmb = 0;
    let targetFreq = 320;
    if (canPlay) {
      if (location === "terminal") {
        targetAmb = 0.032;
        targetFreq = 260;
      } else if (location === "yard" || location === "etec") {
        targetAmb = 0.022;
        targetFreq = 420;
      } else {
        targetAmb = 0.008;
        targetFreq = 180;
      }
    }
    this.ambFilter.frequency.setTargetAtTime(targetFreq, now, 0.3);
    this.ambGain.gain.setTargetAtTime(targetAmb, now, 0.25);

    // Subtle rural crickets at night/dusk in Pau Arcado
    if (canPlay && location === "yard" && isNight && !isRainy) {
      this.cricketTimer -= dt;
      if (this.cricketTimer <= 0) {
        this.cricketTimer = 2.6 + Math.random() * 3.4;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(4200, now);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.012, now + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    }
  }

  startBgmLoop() {
    if (this.bgmTimer || !this.bgmEnabled) return;
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 392.0],  // G6
    ];
    this.bgmTimer = setInterval(() => {
      if (!this.bgmEnabled || this.muted || this.volume <= 0 || document.hidden || !this.ctx || !this.masterGain) return;
      if (typeof state !== "undefined" && state.mode !== "playing") return;
      const now = this.ctx.currentTime;
      const chord = chords[this.bgmStep % chords.length];
      this.bgmStep++;
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        g.gain.setValueAtTime(0.0001, now + idx * 0.06);
        g.gain.linearRampToValueAtTime(idx === 0 ? 0.022 : 0.014, now + idx * 0.06 + 0.35);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.45);
        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(now + idx * 0.06);
        osc.stop(now + 2.55);
      });
    }, 2600);
  }

  stopBgmLoop() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  play(type) {
    if (this.muted || this.volume <= 0) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

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
      gain.connect(this.masterGain);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    };

    if (type === "step_grass") {
      playTone(115 + Math.random() * 25, 62, 0.045, "triangle", 0.032);
    } else if (type === "step_hard") {
      playTone(230 + Math.random() * 40, 120, 0.035, "sine", 0.028);
    } else if (type === "splash") {
      playTone(300 + Math.random() * 90, 130, 0.09, "sine", 0.06, 0);
      playTone(460 + Math.random() * 110, 220, 0.08, "triangle", 0.045, 0.03);
    } else if (type === "dig") {
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
    } else if (type === "shotgun") {
      // Estouro grave + ruído branco filtrado (tiro de calibre 12) + "chk-chk" da bomba!
      playTone(135, 36, 0.22, "sawtooth", 0.24, 0);
      playTone(220, 52, 0.16, "triangle", 0.18, 0.01);
      if (this.noiseBuffer) {
        try {
          const src = this.ctx.createBufferSource();
          src.buffer = this.noiseBuffer;
          const flt = this.ctx.createBiquadFilter();
          flt.type = "lowpass";
          flt.frequency.setValueAtTime(2200, now);
          flt.frequency.exponentialRampToValueAtTime(260, now + 0.26);
          const gn = this.ctx.createGain();
          gn.gain.setValueAtTime(0.32, now);
          gn.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          src.connect(flt);
          flt.connect(gn);
          gn.connect(this.masterGain);
          src.start(now, Math.random() * 0.8, 0.3);
        } catch (_) {}
      }
      // Som mecânico da bomba ("chk-chk") logo após o tiro
      playTone(720, 480, 0.045, "square", 0.06, 0.28);
      playTone(540, 880, 0.05, "square", 0.06, 0.36);
    } else if (type === "reload_shell") {
      // Cartucho entrando no tubo carregador da escopeta
      playTone(380, 620, 0.055, "triangle", 0.09, 0);
      playTone(840, 520, 0.04, "square", 0.05, 0.045);
    } else if (type === "pump_rack") {
      // "Chk-chk" mecânico da telha pump-action!
      playTone(680, 420, 0.06, "square", 0.08, 0);
      playTone(460, 860, 0.065, "square", 0.085, 0.11);
    } else if (type === "empty_click") {
      playTone(950, 420, 0.035, "square", 0.07, 0);
    } else if (type === "throw") {
      playTone(480, 190, 0.11, "sine", 0.1);
    } else if (type === "egg_crack") {
      playTone(320, 95, 0.08, "triangle", 0.12, 0);
      playTone(620, 240, 0.06, "sawtooth", 0.07, 0.02);
    } else if (type === "chest_open") {
      playTone(180, 260, 0.12, "triangle", 0.11, 0);
      playTone(260, 340, 0.12, "sine", 0.09, 0.07);
    } else if (type === "chest_close") {
      playTone(280, 140, 0.12, "triangle", 0.11);
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
  }, 3600);
}

let bannerTimer;
function showDayBanner(text) {
  dayBannerText.textContent = text;
  dayBanner.classList.remove("hidden");
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => {
    dayBanner.classList.add("hidden");
  }, 3500);
}

// Floating 3D-projected feedback popups (+R$, +1 Alface, etc.)
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
