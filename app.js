/**
 * Orbit Fusion - Game Engine & Logic
 * Built using Vanilla HTML5 Canvas & Web Audio API
 */

// ==========================================================================
// 1. CONSTANTS & SYSTEM CONFIGURATION
// ==========================================================================

const PALETTES = {
    dark: [
        { name: 'Plasmă Cyan', hex: '#00f0ff', glow: 'rgba(0, 240, 255, 0.6)' },      // Level 1
        { name: 'Impuls Neon', hex: '#ff007f', glow: 'rgba(255, 0, 127, 0.6)' },      // Level 2
        { name: 'Frecvență Solară', hex: '#ffdd00', glow: 'rgba(255, 221, 0, 0.6)' }, // Level 3
        { name: 'Aură Cuantică', hex: '#00ff66', glow: 'rgba(0, 255, 102, 0.6)' },     // Level 4
        { name: 'Flux Gravitațional', hex: '#aa00ff', glow: 'rgba(170, 0, 255, 0.6)' },// Level 5
        { name: 'Nucleu Supernovă', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' } // Level 6 (Special)
    ],
    light: [
        { name: 'Plasmă Cyan', hex: '#00a3cc', glow: 'rgba(0, 163, 204, 0.5)' },      // Level 1 (Contrast mărit pe fundal deschis)
        { name: 'Impuls Neon', hex: '#d9006c', glow: 'rgba(217, 0, 108, 0.5)' },      // Level 2
        { name: 'Frecvență Solară', hex: '#cda100', glow: 'rgba(205, 161, 0, 0.5)' },  // Level 3
        { name: 'Aură Cuantică', hex: '#00a33c', glow: 'rgba(0, 163, 60, 0.5)' },      // Level 4
        { name: 'Flux Gravitațional', hex: '#8800cc', glow: 'rgba(136, 0, 204, 0.5)' },// Level 5
        { name: 'Nucleu Supernovă', hex: '#1c1c24', glow: 'rgba(28, 28, 36, 0.4)' }    // Level 6 (Special - nucleu întunecat)
    ]
};

let COLORS = PALETTES.dark; // Va deține paleta activă în funcție de temă
let currentTheme = 'dark';

let themeStyles = {
    gridColor: 'rgba(255, 255, 255, 0.035)',
    coreFill: '#010103',
    coreStroke: '#4b0082',
    canvasBg: 'rgba(5, 5, 8, 0.3)',
    starColor: '#ffffff'
};

function applyTheme(themeName) {
    currentTheme = themeName;
    const icon = document.getElementById('theme-icon');
    if (themeName === 'light') {
        COLORS = PALETTES.light;
        themeStyles.gridColor = 'rgba(0, 0, 0, 0.04)';
        themeStyles.coreFill = '#fdfdfd';
        themeStyles.coreStroke = '#aa00ff';
        themeStyles.canvasBg = 'rgba(244, 245, 248, 0.35)';
        themeStyles.starColor = 'rgba(0, 0, 0, 0.2)'; // Scântei întunecate, fine
        document.body.classList.add('light-theme');
        if (icon) {
            // Crescent Moon SVG path (pentru comutarea înapoi în modul întunecat)
            icon.setAttribute('d', 'M12.1,22C6.5,22 2,17.5 2,11.9C2,7.4 5,3.5 9.2,2.2C9.8,2 10.4,2.4 10.5,3C10.6,3.6 10.2,4.2 9.6,4.3C6.4,5 4,7.8 4,11.9C4,16.4 7.6,20 12.1,20C16.2,20 19,17.6 19.7,14.4C19.8,13.8 20.4,13.4 21,13.5C21.6,13.6 22,14.2 21.8,14.8C20.5,19 16.6,22 12.1,22Z');
        }
    } else {
        COLORS = PALETTES.dark;
        themeStyles.gridColor = 'rgba(255, 255, 255, 0.035)';
        themeStyles.coreFill = '#010103';
        themeStyles.coreStroke = '#4b0082';
        themeStyles.canvasBg = 'rgba(5, 5, 8, 0.3)';
        themeStyles.starColor = '#ffffff';
        document.body.classList.remove('light-theme');
        if (icon) {
            // Sun SVG path (pentru comutarea în modul deschis)
            icon.setAttribute('d', 'M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z');
        }
    }
    // Re-inițializăm particulele pe noul fundal
    if (typeof initStars === 'function') initStars();
    if (typeof initNebulae === 'function') initNebulae();
}

const STABILITY_CRITICAL_THRESHOLD = 30; // Under 30% health, the bar animations change to red/alert
const BASE_ORB_SPEED = 160;             // Base pixels per second (up from 110 for better pace)
const BASE_SPAWN_INTERVAL = 1600;       // Base ms between spawns (down from 2200 for faster start)

// ==========================================================================
// 2. PROCEDURAL SOUND SYNTHESIZER (Web Audio API)
// ==========================================================================

class SoundManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (this.ctx) return;
        try {
            // Create audio context
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error("Web Audio API is not supported in this browser", e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        const icon = document.getElementById('sound-icon');
        if (this.muted) {
            // Change SVG to Mute icon
            icon.innerHTML = '<path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M19,12C19,11.05 18.7,10.19 18.19,9.5L19.64,8.05C20.5,9.19 21,10.53 21,12C21,16.28 18.07,19.86 14,20.77V18.71C16.89,17.85 19,15.17 19,12M3,2.27L1.86,3.41L5.89,7.44L3,9H7L12,4V9.56L14,11.56V7.97C15.5,8.71 16.5,10.23 16.5,12C16.5,12.7 16.32,13.36 16,13.93L17.5,15.43C18.1,14.43 18.5,13.26 18.5,12A6.5,6.5 0 0,0 12,5.5V3.23C16.07,4.14 19,7.72 19,12C19,12.87 18.84,13.72 18.54,14.5L19.98,15.94C20.63,14.77 21,13.43 21,12C21,7.72 18.07,4.14 14,3.23V5.5L16.5,8M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.52C15.58,18.04 14.83,18.44 14,18.71V20.77C15.38,20.44 16.63,19.79 17.69,18.96L19.73,21L21,19.73L4.27,3Z"/>';
        } else {
            // Change SVG to Sound High icon
            icon.innerHTML = '<path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18.07,19.86 21,16.28 21,12C21,7.72 18.07,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>';
        }
        return this.muted;
    }

    // Play a clean synthesizer pluck note
    playNote(freq, type = 'sine', duration = 0.3, volume = 0.15, delay = 0) {
        if (this.muted || !this.ctx) return;
        
        // Resume context if suspended (browser security)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        
        // Volume envelope (fast attack, exponential decay)
        gainNode.gain.setValueAtTime(0, this.ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + delay + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);
        
        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration);
    }

    // Sounds
    playMatch() {
        // Pentatonic scale note based on score/combo
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
        const note = notes[Math.floor(Math.random() * notes.length)];
        this.playNote(note * 1.5, 'sine', 0.25, 0.12);
        // Small delay harmonic
        this.playNote(note * 3, 'sine', 0.15, 0.04, 0.05);
    }

    playFusion() {
        // Arpeggio sound
        const root = 261.63; // C4
        const ratio = [1, 1.25, 1.5, 2]; // Major Chord
        ratio.forEach((r, idx) => {
            this.playNote(root * r * 1.5, 'triangle', 0.4, 0.08, idx * 0.06);
        });
    }

    playLevelUp() {
        const root = 196.00; // G3
        const notes = [1, 1.2, 1.5, 1.8, 2, 2.4, 3]; // G major arpeggio rising
        notes.forEach((ratio, idx) => {
            this.playNote(root * ratio, 'sine', 0.6, 0.1, idx * 0.08);
        });
    }

    playError() {
        // Short, buzzing alert tone
        this.playNote(110, 'triangle', 0.15, 0.2);
        this.playNote(105, 'sawtooth', 0.15, 0.08);
    }

    playGameOver() {
        // Slow downward synth slide
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 1.2);
        
        gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        
        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 1.3);
    }
}

const soundManager = new SoundManager();

// ==========================================================================
// 3. JOC STATE & CONFIGURARE ELEMENTE
// ==========================================================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let highScore = 0;
try {
    highScore = parseInt(localStorage.getItem('orbit_fusion_highscore') || '0');
} catch (e) {
    console.warn("localStorage is not accessible, using memory fallback.", e);
}
let level = 1;
let xp = 0;
let xpNeeded = 80;
let stability = 100;
let gameState = 'start'; // 'start', 'playing', 'game_over'
let screenShake = 0;

// Timing helper variables
let lastTime = 0;
let spawnTimer = 0;
let orbSpawnRateModifier = 1.0;

// Hexagon (Player Shield) parameters
let hexRadius = 100;
let hexAngle = 0;
let hexTargetSpeed = 0;
let hexCurrentSpeed = 0;
const HEX_ACCEL = 0.25;
const HEX_FRICTION = 0.88;
const HEX_MAX_SPEED = 6.0;

// Segment details
let segments = [];

// Game Lists
let orbs = [];
let particles = [];
let shockwaves = [];
let floatingTexts = [];

// Stars and cosmic background
let stars = [];
let nebulae = [];

// Controls state
const keys = { Left: false, Right: false };

function initStars() {
    stars = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = Math.floor((width * height) / 10000); // density based on resolution
    for (let i = 0; i < Math.max(70, count); i++) {
        stars.push({
            x: (Math.random() - 0.5) * width * 1.5,
            y: (Math.random() - 0.5) * height * 1.5,
            size: Math.random() * 1.8 + 0.4,
            alpha: Math.random() * 0.5 + 0.3,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 1.8 + 0.4
        });
    }
}

function initNebulae() {
    const size = Math.min(window.innerWidth, window.innerHeight);
    const isLight = currentTheme === 'light';
    nebulae = [
        {
            x: -window.innerWidth * 0.25,
            y: -window.innerHeight * 0.2,
            radius: size * 0.55,
            color: isLight ? 'rgba(0, 163, 204, 0.06)' : 'rgba(0, 240, 255, 0.04)',
            phase: 0,
            speed: 0.03
        },
        {
            x: window.innerWidth * 0.25,
            y: window.innerHeight * 0.2,
            radius: size * 0.65,
            color: isLight ? 'rgba(217, 0, 108, 0.06)' : 'rgba(255, 0, 127, 0.04)',
            phase: Math.PI,
            speed: 0.025
        }
    ];
}

function drawBackground() {
    // 1. Draw Nebulae
    nebulae.forEach(neb => {
        neb.phase += neb.speed * 0.016; // slow orbit phase
        const ox = Math.cos(neb.phase) * 40;
        const oy = Math.sin(neb.phase) * 40;
        
        const grad = ctx.createRadialGradient(neb.x + ox, neb.y + oy, 0, neb.x + ox, neb.y + oy, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x + ox, neb.y + oy, neb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    // 2. Draw Twinkling Stars
    ctx.save();
    stars.forEach(star => {
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(Date.now() * 0.001 * star.twinkleSpeed + star.phase) * 0.25);
        ctx.globalAlpha = currentAlpha;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = themeStyles.starColor;
        ctx.fill();
    });
    ctx.restore();
}

// ==========================================================================
// 4. CLASE GAMEPLAY (Orbi, Particule, Shockwaves, Text)
// ==========================================================================

class Orb {
    constructor(x, y, colorIndex, speed) {
        this.x = x;
        this.y = y;
        this.colorIndex = colorIndex;
        this.speed = speed;
        this.size = 7;
        
        // Calculate initial distance and angle from center
        this.distance = Math.hypot(x, y);
        this.angle = Math.atan2(y, x);
        
        // Small rotation offset for curved trajectories (adds premium cosmic feel)
        this.curveSpeed = (Math.random() - 0.5) * 0.15;
    }

    update(dt) {
        // Move towards center
        this.distance -= this.speed * dt;
        
        // Slightly spiral inward
        this.angle += this.curveSpeed * dt;
        
        // Recalculate Cartesian coordinates
        this.x = Math.cos(this.angle) * this.distance;
        this.y = Math.sin(this.angle) * this.distance;

        // Leave faint trail of tail particles
        if (Math.random() < 0.35) {
            particles.push(new Particle(
                this.x, 
                this.y, 
                (Math.random() - 0.5) * 15, 
                (Math.random() - 0.5) * 15, 
                COLORS[this.colorIndex].hex, 
                0.6, 
                4,
                0.4
            ));
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Glowing radial gradient
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, COLORS[this.colorIndex].hex);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, vx, vy, color, initialAlpha = 1.0, size = 3, decay = 1.2) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.alpha = initialAlpha;
        this.size = size;
        this.decay = decay; // alpha decay per second
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        
        // Pull particles slightly to the gravity center (accretion disk effect)
        const d = Math.hypot(this.x, this.y);
        if (d > 10) {
            this.vx -= (this.x / d) * 40 * dt;
            this.vy -= (this.y / d) * 40 * dt;
        }

        this.alpha -= this.decay * dt;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
    }
}

class Shockwave {
    constructor(x, y, maxRadius, color) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = maxRadius;
        this.color = color;
        this.alpha = 0.8;
    }

    update(dt) {
        // Expand rapidly
        this.radius += (this.maxRadius - this.radius) * 6.0 * dt;
        this.alpha -= 1.0 * dt;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.stroke();
        ctx.restore();
    }
}

class FloatingText {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.alpha = 1.0;
        this.vy = -50; // pixels per second up
    }

    update(dt) {
        this.y += this.vy * dt;
        this.alpha -= 1.0 * dt;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.font = 'bold 16px "Inter"';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// ==========================================================================
// 5. INIȚIALIZARE JOC & LOGICĂ RESTART
// ==========================================================================

function initGame() {
    score = 0;
    level = 1;
    xp = 0;
    xpNeeded = 150; // Increased from 80 for longer levels
    stability = 100;
    hexAngle = 0;
    hexTargetSpeed = 0;
    hexCurrentSpeed = 0;
    orbSpawnRateModifier = 1.0;
    screenShake = 0;

    orbs = [];
    particles = [];
    shockwaves = [];
    floatingTexts = [];
    
    // Initialize 6 segments of the hexagon
    // Standard startup: random mix of Level 1 (Cyan) and Level 2 (Magenta)
    segments = [];
    for (let i = 0; i < 6; i++) {
        segments.push({
            colorIndex: Math.random() < 0.6 ? 0 : 1, // Cyan or Magenta
            health: 1.0,
            pulse: 1.0
        });
    }

    updateHUD();
    document.getElementById('new-high-score-badge').classList.add('hidden');
}

function updateHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('level-val').innerText = level;
    
    // XP progress
    const xpPercent = Math.min(100, (xp / xpNeeded) * 100);
    document.getElementById('xp-bar-fill').style.width = `${xpPercent}%`;
    
    // Stability progress
    document.getElementById('stability-val').innerText = `${Math.ceil(stability)}%`;
    const stabBar = document.getElementById('stability-bar-fill');
    stabBar.style.width = `${stability}%`;
    
    if (stability <= STABILITY_CRITICAL_THRESHOLD) {
        stabBar.classList.add('critical');
    } else {
        stabBar.classList.remove('critical');
    }
}

// ==========================================================================
// 6. DETECTARE COLIZIUNI & MOTORUL DE FUZIUNE (FUSION ENGINE)
// ==========================================================================

function checkCollisions() {
    const checkRadiusMin = hexRadius - 10;
    const checkRadiusMax = hexRadius + 10;

    for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        
        // If orb reaches the hexagon boundary
        if (orb.distance >= checkRadiusMin && orb.distance <= checkRadiusMax) {
            // Find relative angle of the orb on the rotating hexagon
            // Map the angle between 0 and 2*PI
            let relAngle = (orb.angle - hexAngle) % (Math.PI * 2);
            if (relAngle < 0) relAngle += Math.PI * 2;

            // 6 segments, each spans 60 degrees (PI / 3 radians)
            const segmentIndex = Math.floor(relAngle / (Math.PI / 3)) % 6;
            
            handleOrbImpact(orb, segmentIndex, i);
        } 
        // If the orb bypasses the shield completely and hits the central core
        else if (orb.distance < 20) {
            damageCore(12); // Damage from hitting the core directly
            createCoreDamageParticles();
            orbs.splice(i, 1);
        }
    }
}

function handleOrbImpact(orb, segIdx, orbIdx) {
    const segment = segments[segIdx];
    
    // Trigger visual scale pulse
    segment.pulse = 1.4;

    if (segment.colorIndex === orb.colorIndex) {
        // MATCH! Color matches
        soundManager.playMatch();
        
        // Level up the segment
        segment.colorIndex = Math.min(COLORS.length - 1, segment.colorIndex + 1);
        segment.health = Math.min(1.0, segment.health + 0.15); // Repair a bit
        
        // Calculate points
        const points = 10 * level;
        score += points;
        
        // Float text
        const px = Math.cos(orb.angle) * hexRadius;
        const py = Math.sin(orb.angle) * hexRadius;
        floatingTexts.push(new FloatingText(px, py, `+${points}`, COLORS[orb.colorIndex].hex));
        
        // Spark particles
        for (let k = 0; k < 12; k++) {
            const angle = orb.angle + (Math.random() - 0.5) * 0.8;
            const sp = 60 + Math.random() * 80;
            particles.push(new Particle(
                orb.x, 
                orb.y, 
                -Math.cos(angle) * sp, 
                -Math.sin(angle) * sp, 
                COLORS[orb.colorIndex].hex, 
                0.8, 
                3
            ));
        }

        // Add XP
        addXP(10); // Decreased from 15
        
        // Check for adiacent color fusions
        checkFusions(segIdx);

        // Remove orb
        orbs.splice(orbIdx, 1);
    } else {
        // MISMATCH! Wrong color
        soundManager.playError();
        screenShake = 15;
        
        // Break segment health
        segment.health -= 0.35;
        segment.pulse = 0.8; // Shrink feedback
        
        // If segment is cracked, apply damage to overall stability
        if (segment.health <= 0) {
            segment.health = 0;
            damageCore(15); // Breaking shield deals damage
        } else {
            damageCore(6);  // Deflecting wrong color deals minor damage
        }

        // Glitch particles (Red/orange error sparkles)
        for (let k = 0; k < 8; k++) {
            particles.push(new Particle(
                orb.x, 
                orb.y, 
                (Math.random() - 0.5) * 120, 
                (Math.random() - 0.5) * 120, 
                '#ff3344', 
                0.9, 
                4, 
                1.8
            ));
        }

        // Float warning text
        const px = Math.cos(orb.angle) * hexRadius;
        const py = Math.sin(orb.angle) * hexRadius;
        floatingTexts.push(new FloatingText(px, py, "MISMATCH", '#ff3344'));

        orbs.splice(orbIdx, 1);
    }
    
    updateHUD();
}

function checkFusions(originIdx) {
    let checkAgain = true;
    let iterations = 0;

    // Run iterative merging to handle chain reactions
    while (checkAgain && iterations < 5) {
        checkAgain = false;
        iterations++;

        for (let i = 0; i < 6; i++) {
            const left = i;
            const right = (i + 1) % 6;

            const segL = segments[left];
            const segR = segments[right];

            // If adjacent segments have the same color, fuse them!
            // Exclude already maxed out Nova (white) level 5 segments, unless they trigger a special blast
            if (segL.colorIndex === segR.colorIndex && segL.colorIndex < COLORS.length - 1 && segL.colorIndex > 0) {
                const fusionColorIdx = segL.colorIndex;
                
                // Segment L gets upgraded
                segL.colorIndex = Math.min(COLORS.length - 1, segL.colorIndex + 1);
                segL.health = 1.0; // Fully restored
                segL.pulse = 1.6;

                // Segment R resets to Level 0 (Cyan)
                segR.colorIndex = 0;
                segR.health = 1.0;
                segR.pulse = 0.9;

                // Play satisfying chord
                soundManager.playFusion();

                // Points & XP bonuses
                const bonus = 40 * level * (fusionColorIdx + 1);
                score += bonus;
                addXP(20); // Decreased from 30

                // Shockwave at the fusion site (between left & right vertices)
                const angleBetween = (left * (Math.PI / 3) + right * (Math.PI / 3)) / 2 + hexAngle;
                const waveX = Math.cos(angleBetween) * hexRadius;
                const waveY = Math.sin(angleBetween) * hexRadius;
                shockwaves.push(new Shockwave(waveX, waveY, 150, COLORS[fusionColorIdx].hex));
                
                // Exploding starburst particles
                for (let k = 0; k < 20; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    const sp = 80 + Math.random() * 150;
                    particles.push(new Particle(
                        waveX, 
                        waveY, 
                        Math.cos(angle) * sp, 
                        Math.sin(angle) * sp, 
                        COLORS[fusionColorIdx].hex, 
                        0.9, 
                        4,
                        0.8
                    ));
                }

                // Floating points text
                floatingTexts.push(new FloatingText(waveX, waveY, `FUSION +${bonus}!`, COLORS[fusionColorIdx + 1].hex));

                // Special case: If we fused into Nova segment (Level 5, index 5), trigger a mini blast!
                if (segL.colorIndex === COLORS.length - 1) {
                    triggerNovaBlast(left);
                }

                checkAgain = true; // Run another loop to check if the new color matches its neighbors
                updateHUD();
                break;
            }
        }
    }
}

function triggerNovaBlast(segIdx) {
    // Nova blast clears all active orbs on the screen and heals core
    soundManager.playFusion();
    shockwaves.push(new Shockwave(0, 0, window.innerWidth / 2, currentTheme === 'light' ? '#8800cc' : '#ffffff'));
    
    orbs.forEach(orb => {
        // Turn each cleared orb into floating scores
        score += 15 * level;
        floatingTexts.push(new FloatingText(orb.x, orb.y, "+15", currentTheme === 'light' ? '#1c1c24' : '#ffffff'));
        
        for (let k = 0; k < 8; k++) {
            particles.push(new Particle(
                orb.x, orb.y, 
                (Math.random() - 0.5) * 100, 
                (Math.random() - 0.5) * 100, 
                COLORS[orb.colorIndex].hex, 
                0.8, 
                3
            ));
        }
    });
    
    orbs = [];
    stability = Math.min(100, stability + 20); // Heals 20% stability
    
    // Reset the Nova segment to Cyan (Level 0) after blast
    segments[segIdx].colorIndex = 0;
    
    // Screen flash effect
    screenShake = 25;
}

function damageCore(amount) {
    stability -= amount;
    if (stability <= 0) {
        stability = 0;
        if (gameState === 'start') {
            stability = 100; // Reset health in demo preview mode
        } else {
            gameOver();
        }
    }
}

function addXP(amount) {
    xp += amount;
    if (xp >= xpNeeded) {
        xp -= xpNeeded;
        levelUp();
    }
}

function levelUp() {
    level++;
    xpNeeded = 100 + (level * 50); // Scale up requirement curve (was 80 + level * 20)
    soundManager.playLevelUp();
    
    // Restores core shield
    stability = Math.min(100, stability + 25);
    
    // Set game state briefly to clear screen
    shockwaves.push(new Shockwave(0, 0, window.innerWidth / 1.5, COLORS[1].hex));
    orbs = []; // Clear current enemies
    
    // Display LEVEL UP banner overlay
    const banner = document.getElementById('level-up-banner');
    document.getElementById('level-up-text').innerText = `NIVELUL ${level}`;
    banner.classList.remove('hidden');
    
    // Bullet time/pause effect
    const prevModifier = orbSpawnRateModifier;
    orbSpawnRateModifier = 0.1; // slow down incoming orbs
    
    setTimeout(() => {
        banner.classList.add('hidden');
        orbSpawnRateModifier = prevModifier + 0.15; // slightly faster spawns next
    }, 1500);

    // Dynamic level up screen particles
    for (let k = 0; k < 40; k++) {
        const angle = Math.random() * Math.PI * 2;
        const sp = 100 + Math.random() * 200;
        particles.push(new Particle(
            0, 0, 
            Math.cos(angle) * sp, 
            Math.sin(angle) * sp, 
            COLORS[1].hex, 
            1.0, 
            4, 
            0.5
        ));
    }

    updateHUD();
}

function createCoreDamageParticles() {
    soundManager.playError();
    screenShake = 18;
    for (let k = 0; k < 15; k++) {
        const angle = Math.random() * Math.PI * 2;
        const sp = 80 + Math.random() * 120;
        particles.push(new Particle(
            0, 0, 
            Math.cos(angle) * sp, 
            Math.sin(angle) * sp, 
            COLORS[2].hex, 
            0.9, 
            3, 
            1.5
        ));
    }
}

// ==========================================================================
// 7. GENERARE & SPAWNING ORBI
// ==========================================================================

function spawnOrb() {
    if (gameState !== 'playing' && gameState !== 'start') return;

    // Angle of spawn (from outside the screen)
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = Math.max(window.innerWidth, window.innerHeight) / 1.4;
    const startX = Math.cos(angle) * spawnDist;
    const startY = Math.sin(angle) * spawnDist;

    // Orb Speed increases with Level
    const orbSpeed = BASE_ORB_SPEED * (1 + level * 0.08);

    // Smart color selection: ONLY spawn colors currently present on the hexagon's segments
    // to guarantee the puzzle is 100% solvable and fair.
    let colorIndex = 0;
    const activeColors = [...new Set(segments.map(s => s.colorIndex).filter(c => c < COLORS.length - 1))];
    const usableColors = activeColors.length > 0 ? activeColors : [0];
    
    // We add a weight bias so that lower-level colors spawn more frequently than higher-level ones,
    // which makes the difficulty progression feel balanced and natural.
    const weightedPool = [];
    usableColors.forEach(c => {
        const weight = 6 - c; // e.g. Cyan (0) gets weight 6, Purple (4) gets weight 2
        for (let i = 0; i < weight; i++) {
            weightedPool.push(c);
        }
    });
    colorIndex = weightedPool[Math.floor(Math.random() * weightedPool.length)];

    orbs.push(new Orb(startX, startY, colorIndex, orbSpeed));
}

// ==========================================================================
// 8. RENDERARE GRAFICĂ (Grid Cosmic, Nucleu, Hexagon, Scut)
// ==========================================================================

function drawGrid() {
    ctx.save();
    ctx.strokeStyle = themeStyles.gridColor;
    ctx.lineWidth = 1;
    
    const gridSize = 60;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Center alignment offset
    const offsetX = (width / 2) % gridSize;
    const offsetY = (height / 2) % gridSize;

    // Draw vertical grid lines deforming slightly near core
    for (let x = -width / 2; x < width / 2; x += gridSize) {
        ctx.beginPath();
        for (let y = -height / 2; y < height / 2; y += 15) {
            const d = Math.hypot(x, y);
            
            // Gravity bending effect near the black hole core (accel lens simulation)
            let pull = 0;
            if (d > 20 && d < 300) {
                pull = (1 - (d / 300)) * 25;
            }
            
            const px = x - (x / (d || 1)) * pull;
            const py = y - (y / (d || 1)) * pull;
            
            if (y === -height / 2) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = -height / 2; y < height / 2; y += gridSize) {
        ctx.beginPath();
        for (let x = -width / 2; x < width / 2; x += 15) {
            const d = Math.hypot(x, y);
            let pull = 0;
            if (d > 20 && d < 300) {
                pull = (1 - (d / 300)) * 25;
            }
            const px = x - (x / (d || 1)) * pull;
            const py = y - (y / (d || 1)) * pull;
            
            if (x === -width / 2) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
    }
    
    ctx.restore();
}

function drawCore() {
    ctx.save();
    
    // Core glow pulse based on level / time
    const pulseFactor = 1 + Math.sin(Date.now() * 0.005) * 0.1;
    const coreRadius = 22 * pulseFactor;

    // Outer gravity glow
    const outerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60 * pulseFactor);
    outerGrad.addColorStop(0, currentTheme === 'light' ? 'rgba(170, 0, 255, 0.15)' : 'rgba(15, 10, 30, 0.6)');
    outerGrad.addColorStop(0.5, currentTheme === 'light' ? 'rgba(170, 0, 255, 0.05)' : 'rgba(10, 0, 20, 0.2)');
    outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 60 * pulseFactor, 0, Math.PI * 2);
    ctx.fill();

    // Dark core void (Singularity effect)
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = themeStyles.coreFill;
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS[4].hex;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = themeStyles.coreStroke;
    ctx.stroke();

    ctx.restore();
}

function drawHexagon() {
    ctx.save();
    
    // Vertices of the 6-sided hexagon shield
    const points = [];
    for (let i = 0; i < 6; i++) {
        // Angles: 0, 60, 120, 180, 240, 300 degrees + current rotation
        const angle = i * (Math.PI / 3) + hexAngle;
        points.push({
            x: Math.cos(angle) * hexRadius,
            y: Math.sin(angle) * hexRadius
        });
    }

    // Draw the 6 neon lines
    for (let i = 0; i < 6; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % 6];
        const segment = segments[i];
        const color = COLORS[segment.colorIndex];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        // Stilizare linie neon în funcție de nivelul segmentului și viața acestuia
        ctx.strokeStyle = color.hex;
        
        // Damaged segment displays dashed line style
        if (segment.health < 0.6) {
            ctx.setLineDash([12, 6]);
        } else {
            ctx.setLineDash([]);
        }

        // Segment glow intensity scales with segment.pulse
        ctx.shadowBlur = 10 * segment.pulse;
        ctx.shadowColor = color.hex;
        
        // Mismatch/health dimming
        ctx.globalAlpha = 0.3 + (segment.health * 0.7);
        ctx.lineWidth = 4 * segment.pulse;
        ctx.stroke();
        
        // Outer glowing faint halo ring to guide alignments
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255,255,255,0.015)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Slow return pulse scale to 1.0 (smooth return after hits)
        if (segment.pulse > 1.0) {
            segment.pulse -= 2.0 * 0.016; // Approx based on dt
        } else if (segment.pulse < 1.0) {
            segment.pulse += 1.0 * 0.016;
        }
    }

    ctx.restore();
}

// ==========================================================================
// 9. GAME OVER & SALVARE DATE
// ==========================================================================

function updateHistoryUI() {
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem('orbit_fusion_history') || '[]');
    } catch (e) {
        console.warn("localStorage is not accessible, using memory fallback.", e);
    }
    
    // Fallback if localStorage was blocked but we want session history
    if (typeof sessionHistory !== 'undefined' && sessionHistory.length > 0 && history.length === 0) {
        history = sessionHistory;
    } else if (typeof sessionHistory !== 'undefined' && sessionHistory.length > 0) {
        // Synchronize in case memory is newer
        history = sessionHistory;
    }

    const historyBox = document.getElementById('history-box');
    const historyList = document.getElementById('history-list');

    if (!historyBox || !historyList) return;

    if (history.length === 0) {
        historyBox.classList.add('hidden');
        return;
    }

    historyBox.classList.remove('hidden');
    historyList.innerHTML = '';

    history.forEach(run => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <span class="hist-date">${run.date}</span>
            <span class="hist-level">Nivel ${run.level}</span>
            <span class="hist-score neon-cyan">${run.score} pct</span>
        `;
        historyList.appendChild(item);
    });
}

// Global session fallback if localStorage throws SecurityError
let sessionHistory = [];
try {
    sessionHistory = JSON.parse(localStorage.getItem('orbit_fusion_history') || '[]');
} catch (e) {
    sessionHistory = [];
}

function saveGameToHistory(finalScore, finalLevel) {
    // Only save runs that actually started (score > 0)
    if (finalScore <= 0) return;

    const dateStr = new Date().toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const newRun = {
        score: finalScore,
        level: finalLevel,
        date: dateStr
    };

    // 1. Add to session history memory fallback
    sessionHistory.unshift(newRun);
    sessionHistory = sessionHistory.slice(0, 5);

    // 2. Try to write to localStorage
    try {
        localStorage.setItem('orbit_fusion_history', JSON.stringify(sessionHistory));
    } catch (e) {
        console.warn("Could not save history to localStorage", e);
    }
}

function gameOver() {
    gameState = 'game_over';
    soundManager.playGameOver();
    
    // Save current game to history
    saveGameToHistory(score, level);
    updateHistoryUI();
    
    // Save Highscore
    let isNewHigh = false;
    if (score > highScore) {
        highScore = score;
        try {
            localStorage.setItem('orbit_fusion_highscore', highScore);
        } catch (e) {
            console.warn("Could not save to localStorage", e);
        }
        isNewHigh = true;
    }
    
    document.getElementById('hud').classList.add('hidden');
    
    const goScreen = document.getElementById('game-over-screen');
    document.getElementById('go-score').innerText = score;
    document.getElementById('go-level').innerText = level;
    
    if (isNewHigh) {
        document.getElementById('new-high-score-badge').classList.remove('hidden');
    }
    
    goScreen.classList.remove('hidden');
}

// ==========================================================================
// 10. GAME LOOP & UPDATE MATH
// ==========================================================================

function update(dt) {
    if (gameState !== 'playing' && gameState !== 'start') return;

    // Apply Screen Shake decay
    if (screenShake > 0) {
        screenShake -= 45 * dt;
        if (screenShake < 0) screenShake = 0;
    }

    if (gameState === 'start') {
        // Autopilot / Attract Mode: rotate hexagon automatically to catch spheres
        if (orbs.length === 0) {
            hexAngle += 0.25 * dt; // slow default rotation
        } else {
            // Find the closest sphere
            let nearestOrb = null;
            let minDist = Infinity;
            orbs.forEach(orb => {
                if (orb.distance < minDist) {
                    minDist = orb.distance;
                    nearestOrb = orb;
                }
            });

            if (nearestOrb) {
                // Find matching color segment index
                let matchIdx = -1;
                for (let i = 0; i < 6; i++) {
                    if (segments[i].colorIndex === nearestOrb.colorIndex) {
                        matchIdx = i;
                        break;
                    }
                }
                
                if (matchIdx === -1) matchIdx = 0;

                // Target hex angle to align matching segment with sphere angle
                const targetAngle = nearestOrb.angle - matchIdx * (Math.PI / 3);
                
                // Shortest path angle difference interpolation
                let diff = (targetAngle - hexAngle) % (Math.PI * 2);
                if (diff < -Math.PI) diff += Math.PI * 2;
                if (diff > Math.PI) diff -= Math.PI * 2;
                
                hexAngle += diff * 5.0 * dt;
            }
        }
    } else {
        // Keyboard controls input logic
        hexTargetSpeed = 0;
        if (keys.Left) hexTargetSpeed = -HEX_MAX_SPEED;
        if (keys.Right) hexTargetSpeed = HEX_MAX_SPEED;

        // Apply rotation friction and acceleration
        hexCurrentSpeed += (hexTargetSpeed - hexCurrentSpeed) * HEX_ACCEL;
        hexAngle += hexCurrentSpeed * dt;
    }

    // Rotate orbs, particles, shockwaves
    orbs.forEach(orb => orb.update(dt));
    particles.forEach(p => p.update(dt));
    shockwaves.forEach(s => s.update(dt));
    floatingTexts.forEach(t => t.update(dt));

    // Clean up expired items
    particles = particles.filter(p => p.alpha > 0);
    shockwaves = shockwaves.filter(s => s.alpha > 0);
    floatingTexts = floatingTexts.filter(t => t.alpha > 0);

    // Handle collision check
    checkCollisions();

    // Spawn new incoming orb
    spawnTimer += dt * 1000; // convert to ms
    const currentSpawnInterval = BASE_SPAWN_INTERVAL * Math.max(0.35, 1 - (level * 0.06)) / orbSpawnRateModifier;
    
    if (spawnTimer >= currentSpawnInterval) {
        spawnOrb();
        spawnTimer = 0;
    }
}

function draw() {
    // Clear viewport with a slight trailing opacity for canvas glowing particles
    ctx.save();
    ctx.fillStyle = themeStyles.canvasBg;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.restore();

    // Guard: if game hasn't started or segments aren't ready, only draw grid and core
    if (gameState === 'start' || segments.length === 0) {
        ctx.save();
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
        drawGrid();
        drawCore();
        ctx.restore();
        return;
    }

    // Center coordinates context
    ctx.save();
    
    // Apply Screen Shake if mismatched colors
    if (screenShake > 0) {
        const dx = (Math.random() - 0.5) * screenShake;
        const dy = (Math.random() - 0.5) * screenShake;
        ctx.translate(window.innerWidth / 2 + dx, window.innerHeight / 2 + dy);
    } else {
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    }

    drawBackground();
    drawGrid();
    
    // Render game objects
    particles.forEach(p => p.draw(ctx));
    shockwaves.forEach(s => s.draw(ctx));
    
    drawCore();
    drawHexagon();
    
    orbs.forEach(orb => orb.draw(ctx));
    floatingTexts.forEach(t => t.draw(ctx));

    ctx.restore();
}

function gameLoop(timestamp) {
    // Frame-rate independent delta time
    if (!lastTime) lastTime = timestamp;
    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Cap delta time to prevent physics breaking during browser lag spikes
    if (dt > 0.1) dt = 0.1;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}

// ==========================================================================
// 11. EVENT LISTENERS & RESIZING
// ==========================================================================

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Hexagon radius dynamic adjustments based on screen scale
    hexRadius = Math.min(width, height) * 0.18;
    if (hexRadius < 75) hexRadius = 75;
    if (hexRadius > 130) hexRadius = 130;

    initStars();
    initNebulae();
}

// Key Listeners
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.Left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.Right = true;
    
    // Space or 'P' to toggle pause
    if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        if (gameState === 'playing' || gameState === 'paused') {
            e.preventDefault(); // Prevent page scrolling down on Space
            togglePause();
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.Left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.Right = false;
});

// Mouse & Touch Controls (Split Screen Mobile support)
function handleControlStart(clientX) {
    if (gameState !== 'playing') return;
    const midPoint = window.innerWidth / 2;
    if (clientX < midPoint) {
        keys.Left = true;
    } else {
        keys.Right = true;
    }
}

function handleControlEnd() {
    keys.Left = false;
    keys.Right = false;
}

window.addEventListener('mousedown', (e) => {
    // Don't trigger movement if clicking HUD buttons (mute, pause, start buttons)
    if (e.target.closest('.hud-controls') || e.target.closest('.action-btn')) return;
    handleControlStart(e.clientX);
});
window.addEventListener('mouseup', handleControlEnd);

window.addEventListener('touchstart', (e) => {
    if (e.target.closest('.hud-controls') || e.target.closest('.action-btn')) return;
    // Prevent default scroll behaviors
    e.preventDefault();
    handleControlStart(e.touches[0].clientX);
}, { passive: false });

window.addEventListener('touchend', (e) => {
    handleControlEnd();
});

// UI Event Listeners
document.getElementById('start-btn').addEventListener('click', () => {
    soundManager.init();
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    
    initGame();
    gameState = 'playing';
});

document.getElementById('restart-btn').addEventListener('click', () => {
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    
    initGame();
    gameState = 'playing';
});

// Pause Logic Functions
function pauseGame() {
    if (gameState !== 'playing') return;
    gameState = 'paused';
    document.getElementById('pause-screen').classList.remove('hidden');
    
    // Change pause toggle icon to play icon
    document.getElementById('pause-icon').setAttribute('d', 'M8,5.14V19.14L19,12.14L8,5.14Z');
}

function resumeGame() {
    if (gameState !== 'paused') return;
    gameState = 'playing';
    document.getElementById('pause-screen').classList.add('hidden');
    
    // Change pause toggle icon to pause icon
    document.getElementById('pause-icon').setAttribute('d', 'M14,19H18V5H14M6,19H10V5H6V19Z');
    
    // Reset lastTime to avoid huge dt spike
    lastTime = performance.now();
}

function togglePause() {
    if (gameState === 'playing') {
        pauseGame();
    } else if (gameState === 'paused') {
        resumeGame();
    }
}

// UI Controls
document.getElementById('sound-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    soundManager.init();
    soundManager.toggleMute();
});

document.getElementById('pause-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    soundManager.init();
    togglePause();
});

document.getElementById('resume-btn').addEventListener('click', () => {
    resumeGame();
});

document.getElementById('theme-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    soundManager.init();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
        localStorage.setItem('orbit_fusion_theme', nextTheme);
    } catch (err) {
        console.warn("Could not save theme to localStorage", err);
    }
});

// Auto pause on focus loss or visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && gameState === 'playing') {
        pauseGame();
    }
});

window.addEventListener('blur', () => {
    if (gameState === 'playing') {
        pauseGame();
    }
});

// Start engine
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize the game state so that autopilot starts immediately behind the start panel
initGame();
gameState = 'start';

// Load and render history UI
updateHistoryUI();

// Detect and apply theme (respects prefers-color-scheme by default)
let savedTheme = 'dark';
try {
    savedTheme = localStorage.getItem('orbit_fusion_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
} catch (e) {
    savedTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
applyTheme(savedTheme);

// Set initial highscore on startup screen
document.getElementById('best-score-val').innerText = highScore;

// Start game loop
requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
});
