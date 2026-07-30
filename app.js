/**
 * Orbit Fusion - Game Engine & Logic
 * Built using Vanilla HTML5 Canvas & Web Audio API
 */

// ==========================================================================
// 1. CONSTANTS & SYSTEM CONFIGURATION
// ==========================================================================

// ==========================================================================
// 1. CONSTANTS, COSMIC THEMES & MASTERY SYSTEM CONFIGURATION
// ==========================================================================

const COSMIC_THEMES = {
    cyber_neon: {
        id: 'cyber_neon',
        name: 'Cyber Neon',
        desc: 'Deblocat implicit (Clasic)',
        unlockedByDefault: true,
        colors: [
            { name: 'Plasmă Cyan', hex: '#00f0ff', glow: 'rgba(0, 240, 255, 0.6)' },
            { name: 'Impuls Neon', hex: '#ff007f', glow: 'rgba(255, 0, 127, 0.6)' },
            { name: 'Frecvență Solară', hex: '#ffdd00', glow: 'rgba(255, 221, 0, 0.6)' },
            { name: 'Aură Cuantică', hex: '#00ff66', glow: 'rgba(0, 255, 102, 0.6)' },
            { name: 'Flux Gravitațional', hex: '#aa00ff', glow: 'rgba(170, 0, 255, 0.6)' },
            { name: 'Nucleu Supernovă', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.8)' }
        ],
        canvasStyles: {
            bgGradient: ['#0f1026', '#030307'],
            gridColor: 'rgba(255, 255, 255, 0.035)',
            coreFill: '#010103',
            coreStroke: '#4b0082',
            canvasBg: 'rgba(5, 5, 8, 0.3)',
            starColor: '#ffffff'
        },
        cssVars: {
            '--bg-color': '#050508',
            '--panel-bg': 'rgba(10, 10, 18, 0.75)',
            '--cyan': '#00f0ff',
            '--magenta': '#ff007f',
            '--yellow': '#ffdd00',
            '--green': '#00ff66',
            '--purple': '#aa00ff'
        },
        unlockCheck: () => true
    },
    solar_flare: {
        id: 'solar_flare',
        name: 'Solar Flare',
        desc: 'Atinge un Combo x5',
        unlockedByDefault: false,
        colors: [
            { name: 'Chihlimbar Solar', hex: '#ffaa00', glow: 'rgba(255, 170, 0, 0.6)' },
            { name: 'Coral Incandescent', hex: '#ff4400', glow: 'rgba(255, 68, 0, 0.6)' },
            { name: 'Aur Plasmatic', hex: '#ffe600', glow: 'rgba(255, 230, 0, 0.6)' },
            { name: 'Portocaliu Coronar', hex: '#ff7700', glow: 'rgba(255, 119, 0, 0.6)' },
            { name: 'Gigantă Roșie', hex: '#ff0044', glow: 'rgba(255, 0, 68, 0.6)' },
            { name: 'Nucleu Radiant', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)' }
        ],
        canvasStyles: {
            bgGradient: ['#260c04', '#080100'],
            gridColor: 'rgba(255, 170, 0, 0.05)',
            coreFill: '#0a0200',
            coreStroke: '#ff4400',
            canvasBg: 'rgba(18, 5, 2, 0.35)',
            starColor: '#ffddaa'
        },
        cssVars: {
            '--bg-color': '#080200',
            '--panel-bg': 'rgba(24, 8, 4, 0.8)',
            '--cyan': '#ffaa00',
            '--magenta': '#ff4400',
            '--yellow': '#ffe600',
            '--green': '#ff7700',
            '--purple': '#ff0044'
        },
        unlockCheck: (stats, run) => (stats.highestCombo >= 5 || (run && run.maxCombo >= 5))
    },
    deep_nebula: {
        id: 'deep_nebula',
        name: 'Deep Nebula',
        desc: '10 min Zen sau 50 fuziuni',
        unlockedByDefault: false,
        colors: [
            { name: 'Teal Cosmic', hex: '#00e5ff', glow: 'rgba(0, 229, 255, 0.6)' },
            { name: 'Indigo Nebular', hex: '#7d5fff', glow: 'rgba(125, 95, 255, 0.6)' },
            { name: 'Aură Violetă', hex: '#be2edd', glow: 'rgba(190, 46, 221, 0.6)' },
            { name: 'Safir Profund', hex: '#18dcff', glow: 'rgba(24, 220, 255, 0.6)' },
            { name: 'Stelar Magenta', hex: '#ff3f34', glow: 'rgba(255, 63, 52, 0.6)' },
            { name: 'Perlă Astrală', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.85)' }
        ],
        canvasStyles: {
            bgGradient: ['#081226', '#02050f'],
            gridColor: 'rgba(125, 95, 255, 0.05)',
            coreFill: '#01030a',
            coreStroke: '#7d5fff',
            canvasBg: 'rgba(4, 10, 24, 0.35)',
            starColor: '#d1ccc0'
        },
        cssVars: {
            '--bg-color': '#030611',
            '--panel-bg': 'rgba(8, 16, 36, 0.8)',
            '--cyan': '#00e5ff',
            '--magenta': '#be2edd',
            '--yellow': '#18dcff',
            '--green': '#7d5fff',
            '--purple': '#ff3f34'
        },
        unlockCheck: (stats, run) => (stats.totalFusions >= 50 || stats.totalPlayTimeSeconds >= 600 || stats.zenPlayTimeSeconds >= 600)
    },
    dark_void: {
        id: 'dark_void',
        name: 'Dark Void',
        desc: 'Atinge Nivel 5 sau 100 fuziuni',
        unlockedByDefault: false,
        colors: [
            { name: 'Cenușă Obscură', hex: '#8899a6', glow: 'rgba(136, 153, 166, 0.6)' },
            { name: 'Orizont Violet', hex: '#8c7ae6', glow: 'rgba(140, 122, 230, 0.6)' },
            { name: 'Crimson Abisal', hex: '#e84118', glow: 'rgba(232, 65, 24, 0.6)' },
            { name: 'Aur de Eclipsă', hex: '#fbc531', glow: 'rgba(251, 197, 49, 0.6)' },
            { name: 'Plasmă Întunecată', hex: '#9c88ff', glow: 'rgba(156, 136, 255, 0.6)' },
            { name: 'Singularitate', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)' }
        ],
        canvasStyles: {
            bgGradient: ['#08080c', '#000000'],
            gridColor: 'rgba(255, 255, 255, 0.025)',
            coreFill: '#000000',
            coreStroke: '#8c7ae6',
            canvasBg: 'rgba(4, 4, 6, 0.4)',
            starColor: '#aaaaaa'
        },
        cssVars: {
            '--bg-color': '#000000',
            '--panel-bg': 'rgba(14, 14, 20, 0.85)',
            '--cyan': '#8899a6',
            '--magenta': '#e84118',
            '--yellow': '#fbc531',
            '--green': '#8c7ae6',
            '--purple': '#9c88ff'
        },
        unlockCheck: (stats, run) => (stats.totalFusions >= 100 || (run && run.level && run.level >= 5))
    },
    light_ether: {
        id: 'light_ether',
        name: 'Light Ether',
        desc: 'Atinge Nivel 3 sau 5 Lovituri Perfecte',
        unlockedByDefault: false,
        colors: [
            { name: 'Eter Cyan', hex: '#00a3cc', glow: 'rgba(0, 163, 204, 0.5)' },
            { name: 'Sky Magenta', hex: '#d9006c', glow: 'rgba(217, 0, 108, 0.5)' },
            { name: 'Chihlimbar Pur', hex: '#cda100', glow: 'rgba(205, 161, 0, 0.5)' },
            { name: 'Smarald Eteric', hex: '#00a33c', glow: 'rgba(0, 163, 60, 0.5)' },
            { name: 'Liliac Suav', hex: '#8800cc', glow: 'rgba(136, 0, 204, 0.5)' },
            { name: 'Nucleu Obscur', hex: '#1c1c24', glow: 'rgba(28, 28, 36, 0.4)' }
        ],
        canvasStyles: {
            bgGradient: ['#f4f6fa', '#e1e5ee'],
            gridColor: 'rgba(0, 0, 0, 0.04)',
            coreFill: '#fdfdfd',
            coreStroke: '#aa00ff',
            canvasBg: 'rgba(244, 245, 248, 0.35)',
            starColor: 'rgba(0, 0, 0, 0.2)'
        },
        cssVars: {
            '--bg-color': '#eaf0f6',
            '--panel-bg': 'rgba(255, 255, 255, 0.85)',
            '--cyan': '#0088cc',
            '--magenta': '#c90060',
            '--yellow': '#b88e00',
            '--green': '#008f35',
            '--purple': '#7700bb'
        },
        unlockCheck: (stats, run) => (stats.perfectHitsCount >= 5 || (run && run.level && run.level >= 3))
    }
};

const PALETTES = {
    dark: COSMIC_THEMES.cyber_neon.colors,
    light: COSMIC_THEMES.light_ether.colors,
    cyber_neon: COSMIC_THEMES.cyber_neon.colors,
    solar_flare: COSMIC_THEMES.solar_flare.colors,
    deep_nebula: COSMIC_THEMES.deep_nebula.colors,
    dark_void: COSMIC_THEMES.dark_void.colors,
    light_ether: COSMIC_THEMES.light_ether.colors
};

const SKILL_BADGES = {
    combo_master: {
        id: 'combo_master',
        name: 'Combo Master',
        icon: '⚡',
        desc: 'Atinge o serie de combo x5 în timpul unei misiuni.',
        check: (stats, run) => stats.highestCombo >= 5 || (run && run.maxCombo >= 5)
    },
    precision_rotator: {
        id: 'precision_rotator',
        name: 'Precision Rotator',
        icon: '🎯',
        desc: 'Realizează 5 lovituri perfecte (Perfect Hits) în centru.',
        check: (stats, run) => stats.perfectHitsCount >= 5
    },
    mindful_gamer: {
        id: 'mindful_gamer',
        name: 'Mindful Gamer',
        icon: '🧘',
        desc: 'Acumulează 10 minute (600 sec) de joc Zen sau concentrat.',
        check: (stats, run) => stats.totalPlayTimeSeconds >= 600 || stats.zenPlayTimeSeconds >= 600
    },
    fusion_master: {
        id: 'fusion_master',
        name: 'Fusion Master',
        icon: '💥',
        desc: 'Realizează 50 de fuziuni de scut în total.',
        check: (stats, run) => stats.totalFusions >= 50
    },
    cosmic_explorer: {
        id: 'cosmic_explorer',
        name: 'Cosmic Explorer',
        icon: '🌌',
        desc: 'Deblochează cel puțin 3 Teme Cosmice.',
        check: (stats, run, unlockedThemesList) => (unlockedThemesList || unlockedThemes).length >= 3
    },
    focus_guru: {
        id: 'focus_guru',
        name: 'Focus Guru',
        icon: '🧠',
        desc: 'Obține un scor înalt de concentrare (Focus Score >= 85).',
        check: (stats, run) => stats.highestFocusScore >= 85
    }
};

let COLORS = COSMIC_THEMES.cyber_neon.colors;
let currentTheme = 'cyber_neon';

let themeStyles = { ...COSMIC_THEMES.cyber_neon.canvasStyles };

// Lifetime Statistics State & Load / Save Handlers
let lifetimeStats = {
    totalFusions: 0,
    highestCombo: 1,
    highestFocusScore: 0,
    totalPlayTimeSeconds: 0,
    totalRuns: 0,
    perfectHitsCount: 0,
    zenPlayTimeSeconds: 0
};

function loadLifetimeStats() {
    try {
        const raw = localStorage.getItem('orbit_fusion_stats');
        if (raw) {
            const parsed = JSON.parse(raw);
            lifetimeStats = { ...lifetimeStats, ...parsed };
        }
    } catch (e) {
        console.warn("Could not load orbit_fusion_stats from localStorage", e);
    }
}

function saveLifetimeStats() {
    try {
        localStorage.setItem('orbit_fusion_stats', JSON.stringify(lifetimeStats));
    } catch (e) {
        console.warn("Could not save orbit_fusion_stats to localStorage", e);
    }
}

let unlockedBadges = [];
function loadUnlockedBadges() {
    try {
        const raw = localStorage.getItem('orbit_fusion_badges');
        if (raw) {
            unlockedBadges = JSON.parse(raw);
        }
    } catch (e) {
        console.warn("Could not load orbit_fusion_badges from localStorage", e);
    }
}

function saveUnlockedBadges() {
    try {
        localStorage.setItem('orbit_fusion_badges', JSON.stringify(unlockedBadges));
    } catch (e) {
        console.warn("Could not save orbit_fusion_badges to localStorage", e);
    }
}

let unlockedThemes = ['cyber_neon'];
function loadUnlockedThemes() {
    try {
        const raw = localStorage.getItem('orbit_fusion_unlocked_themes');
        if (raw) {
            unlockedThemes = JSON.parse(raw);
            if (!unlockedThemes.includes('cyber_neon')) {
                unlockedThemes.push('cyber_neon');
            }
        }
    } catch (e) {
        console.warn("Could not load orbit_fusion_unlocked_themes from localStorage", e);
    }
}

function saveUnlockedThemes() {
    try {
        localStorage.setItem('orbit_fusion_unlocked_themes', JSON.stringify(unlockedThemes));
    } catch (e) {
        console.warn("Could not save orbit_fusion_unlocked_themes to localStorage", e);
    }
}

function showToastNotification(icon, title, message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

function checkBadgesAndThemes() {
    let changed = false;
    const runState = {
        maxCombo: typeof runMaxCombo !== 'undefined' ? runMaxCombo : 1,
        fusions: typeof runTotalFusions !== 'undefined' ? runTotalFusions : 0,
        level: typeof level !== 'undefined' ? level : 1,
        playTime: typeof runPlayTimeSeconds !== 'undefined' ? runPlayTimeSeconds : 0
    };

    // Evaluate locked badges
    Object.keys(SKILL_BADGES).forEach(badgeId => {
        if (!unlockedBadges.includes(badgeId)) {
            const badge = SKILL_BADGES[badgeId];
            const isUnlocked = badge.check(lifetimeStats, runState, unlockedThemes);
            if (isUnlocked) {
                unlockedBadges.push(badgeId);
                saveUnlockedBadges();
                showToastNotification(badge.icon, badge.name, "Emblemă Deblocată!");
                if (typeof soundManager !== 'undefined' && soundManager.playLevelUp) {
                    soundManager.playLevelUp();
                }
                changed = true;
            }
        }
    });

    // Evaluate locked themes
    Object.keys(COSMIC_THEMES).forEach(themeId => {
        if (!unlockedThemes.includes(themeId)) {
            const theme = COSMIC_THEMES[themeId];
            const isUnlocked = theme.unlockCheck(lifetimeStats, runState);
            if (isUnlocked) {
                unlockedThemes.push(themeId);
                saveUnlockedThemes();
                showToastNotification("🎨", theme.name, "Temă Cosmică Deblocată!");
                if (typeof soundManager !== 'undefined' && soundManager.playLevelUp) {
                    soundManager.playLevelUp();
                }
                changed = true;
            }
        }
    });

    // Re-check cosmic_explorer badge if theme count increased
    if (!unlockedBadges.includes('cosmic_explorer')) {
        const badge = SKILL_BADGES.cosmic_explorer;
        if (badge.check(lifetimeStats, runState, unlockedThemes)) {
            unlockedBadges.push('cosmic_explorer');
            saveUnlockedBadges();
            showToastNotification(badge.icon, badge.name, "Emblemă Deblocată!");
            if (typeof soundManager !== 'undefined' && soundManager.playLevelUp) {
                soundManager.playLevelUp();
            }
            changed = true;
        }
    }

    if (changed) {
        renderBadgesGrid();
        renderThemesGrid();
        renderStatsModal();
    }
}

function applyTheme(themeName) {
    if (!COSMIC_THEMES[themeName]) {
        themeName = themeName === 'light' ? 'light_ether' : 'cyber_neon';
    }
    
    // Fallback if locked
    if (!unlockedThemes.includes(themeName) && !COSMIC_THEMES[themeName].unlockedByDefault) {
        themeName = 'cyber_neon';
    }

    currentTheme = themeName;
    const themeDef = COSMIC_THEMES[themeName];
    COLORS = themeDef.colors;
    themeStyles = { ...themeDef.canvasStyles };

    // Apply CSS vars to document
    if (themeDef.cssVars) {
        Object.keys(themeDef.cssVars).forEach(key => {
            document.documentElement.style.setProperty(key, themeDef.cssVars[key]);
        });
    }

    const icon = document.getElementById('theme-icon');
    if (themeName === 'light_ether') {
        document.body.classList.add('light-theme');
        if (icon) {
            icon.setAttribute('d', 'M12.1,22C6.5,22 2,17.5 2,11.9C2,7.4 5,3.5 9.2,2.2C9.8,2 10.4,2.4 10.5,3C10.6,3.6 10.2,4.2 9.6,4.3C6.4,5 4,7.8 4,11.9C4,16.4 7.6,20 12.1,20C16.2,20 19,17.6 19.7,14.4C19.8,13.8 20.4,13.4 21,13.5C21.6,13.6 22,14.2 21.8,14.8C20.5,19 16.6,22 12.1,22Z');
        }
    } else {
        document.body.classList.remove('light-theme');
        if (icon) {
            icon.setAttribute('d', 'M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z');
        }
    }

    try {
        localStorage.setItem('orbit_fusion_theme', themeName);
    } catch (err) {
        console.warn("Could not save theme to localStorage", err);
    }

    cachedBgGradient = null;
    if (typeof initOrbCache === 'function') initOrbCache();
    if (typeof initCoreGrad === 'function') initCoreGrad();
    if (typeof initStars === 'function') initStars();
    if (typeof initNebulae === 'function') initNebulae();
}

function renderBadgesGrid() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    grid.innerHTML = '';
    Object.keys(SKILL_BADGES).forEach(badgeId => {
        const badge = SKILL_BADGES[badgeId];
        const isUnlocked = unlockedBadges.includes(badgeId);
        
        const card = document.createElement('div');
        card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="badge-card-icon">${badge.icon}</div>
            <div class="badge-card-info">
                <span class="badge-card-name">${badge.name}</span>
                <span class="badge-card-desc">${badge.desc}</span>
                <span class="badge-card-status">${isUnlocked ? 'DEBLOCAT' : 'BLOCAT'}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderStatsModal() {
    const fusions = document.getElementById('stat-total-fusions');
    const combo = document.getElementById('stat-max-combo');
    const focus = document.getElementById('stat-max-focus');
    const time = document.getElementById('stat-total-time');
    const runs = document.getElementById('stat-total-runs');
    const perfect = document.getElementById('stat-perfect-hits');

    if (fusions) fusions.innerText = lifetimeStats.totalFusions;
    if (combo) combo.innerText = `x${lifetimeStats.highestCombo}`;
    if (focus) focus.innerText = lifetimeStats.highestFocusScore;
    if (time) time.innerText = formatTime(lifetimeStats.totalPlayTimeSeconds);
    if (runs) runs.innerText = lifetimeStats.totalRuns;
    if (perfect) perfect.innerText = lifetimeStats.perfectHitsCount;
}

function renderThemesGrid() {
    const grid = document.getElementById('themes-grid');
    if (!grid) return;

    grid.innerHTML = '';
    Object.keys(COSMIC_THEMES).forEach(themeId => {
        const theme = COSMIC_THEMES[themeId];
        const isUnlocked = unlockedThemes.includes(themeId) || theme.unlockedByDefault;
        const isActive = currentTheme === themeId;

        const card = document.createElement('div');
        card.className = `theme-card ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        const swatchesHtml = theme.colors.slice(0, 5).map(c => `<span class="swatch" style="background-color:${c.hex}"></span>`).join('');
        
        card.innerHTML = `
            <div class="theme-card-header">
                <span class="theme-card-title">${theme.name}</span>
                <span class="theme-card-badge">${isActive ? 'ACTIVĂ' : (isUnlocked ? 'DEBLOCATĂ' : 'BLOCATĂ')}</span>
            </div>
            <div class="theme-swatches">${swatchesHtml}</div>
            <div class="theme-card-desc">${isUnlocked ? 'Paletă activabilă' : `Necesar: ${theme.desc}`}</div>
            <button class="theme-select-btn" ${!isUnlocked ? 'disabled' : ''}>
                ${isActive ? 'ACTIVĂ ÎN JOC' : (isUnlocked ? 'APLICĂ TEMĂ' : 'BLOCATĂ')}
            </button>
        `;

        const btn = card.querySelector('.theme-select-btn');
        if (btn && isUnlocked && !isActive) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                applyTheme(themeId);
                renderThemesGrid();
            });
        }

        grid.appendChild(card);
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'badges-modal') renderBadgesGrid();
        if (modalId === 'stats-modal') renderStatsModal();
        if (modalId === 'theme-modal') renderThemesGrid();
        const hud = document.getElementById('hud');
        if (hud) hud.classList.add('hidden');
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        if (gameState === 'playing') {
            const hud = document.getElementById('hud');
            if (hud) hud.classList.remove('hidden');
        }
    }
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
    playMatch(comboMultiplier = 1) {
        if (gameMode === 'zen') {
            // Soft sine wave with gentle release envelope for Zen mode
            const zenNotes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
            const note = zenNotes[Math.floor(Math.random() * zenNotes.length)];
            this.playNote(note, 'sine', 0.45, 0.08);
            this.playNote(note * 1.5, 'sine', 0.35, 0.03, 0.06);
            return;
        }
        // Pentatonic scale note based on score/combo
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4, D4, E4, G4, A4, C5
        const baseNote = notes[Math.floor(Math.random() * notes.length)];
        const pitchMult = 1 + Math.min(1.2, (comboMultiplier - 1) * 0.12);
        const note = baseNote * pitchMult;
        
        this.playNote(note * 1.5, 'sine', 0.25, 0.12);
        // Small delay harmonic
        this.playNote(note * 3, 'sine', 0.15, 0.04, 0.05);

        // Extra harmonic chime on high combo
        if (comboMultiplier >= 3) {
            this.playNote(note * 2, 'triangle', 0.2, 0.06, 0.08);
        }
    }

    playPerfect() {
        // High-pitched golden chime sequence for Perfect! central hits
        const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
        notes.forEach((freq, idx) => {
            this.playNote(freq, 'sine', 0.35, 0.1, idx * 0.04);
        });
    }

    playFusion(comboMultiplier = 1) {
        // Arpeggio sound scaled by combo richness
        const root = 261.63; // C4
        const pitchMult = 1 + Math.min(0.8, (comboMultiplier - 1) * 0.1);
        const ratio = comboMultiplier >= 4 ? [1, 1.25, 1.5, 1.75, 2] : [1, 1.25, 1.5, 2]; // Major 7th Chord at high combos
        ratio.forEach((r, idx) => {
            this.playNote(root * pitchMult * r * 1.5, 'triangle', 0.45, 0.09, idx * 0.05);
        });
    }

    playComboStinger(comboMult) {
        // Dynamic multi-tone fanfare when reaching combo tiers
        if (this.muted || !this.ctx) return;
        const baseFreq = comboMult >= 5 ? 523.25 : 392.00; // C5 or G4
        const chord = [1, 1.25, 1.5];
        chord.forEach((ratio, idx) => {
            this.playNote(baseFreq * ratio, 'sine', 0.5, 0.08, idx * 0.06);
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
        if (gameMode === 'zen') {
            // Soft muted deflection chime instead of harsh buzz in Zen mode
            this.playNote(220, 'sine', 0.25, 0.05);
            return;
        }
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
let gameState = 'start'; // 'start', 'playing', 'game_over', 'paused'
let screenShake = 0;

// Milestone 3 (R2): Mindful Gaming & Zen State Variables
let sessionStartTime = Date.now();
let sessionElapsedSeconds = 0;
let runPlayTimeSeconds = 0;
const REST_REMINDER_INTERVAL = 20 * 60; // 20 minutes in seconds (1200s)
let nextRestReminderTime = REST_REMINDER_INTERVAL;

// Zen / Flow Mode State ('classic' or 'zen')
let gameMode = 'classic';
try {
    gameMode = localStorage.getItem('orbit_fusion_mode') || 'classic';
} catch (e) {
    gameMode = 'classic';
}

// Run Mastery & Positive Reinforcement Metrics Tracking
let runSuccessfulMatches = 0;
let runTotalImpacts = 0;
let runTotalFusions = 0;
let runMaxCombo = 1;

// Mindfulness Box Breathing Widget Cycle State (Inhale 4s -> Hold 4s -> Exhale 4s -> Rest 4s)
let breathingCycleTime = 0;
const BREATHING_PHASE_DURATION = 4.0; // Seconds per phase

// Combo Multiplier System State
let comboCount = 0;
let comboTimer = 0;
const COMBO_WINDOW = 3.5; // Seconds window to extend combo streak
let comboMultiplier = 1;

// Screen Shake Intensity Setting ('off', 'medium', 'intense')
let shakeSetting = 'intense';
try {
    shakeSetting = localStorage.getItem('orbit_fusion_shake') || 'intense';
} catch (e) {
    shakeSetting = 'intense';
}

// Strict Memory Limit Caps (eliminates GC pressure & micro-stutters)
const MAX_PARTICLES = 250;
const MAX_SHOCKWAVES = 20;
const MAX_FLOATING_TEXTS = 40;

// High-Performance Offscreen Canvas & Gradient Caches for 60 FPS
let cachedBgGradient = null;
let orbCanvasCache = [];
let coreGlowGrad = null;

function initOrbCache() {
    orbCanvasCache = [];
    const dpr = window.devicePixelRatio || 1;
    const orbSize = 7;
    const canvasSize = Math.ceil(orbSize * 4 * Math.min(dpr, 2));
    const center = canvasSize / 2;
    const drawRadius = orbSize * Math.min(dpr, 2);

    COLORS.forEach((colorObj, idx) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = canvasSize;
        offCanvas.height = canvasSize;
        const offCtx = offCanvas.getContext('2d');

        const grad = offCtx.createRadialGradient(center, center, 0, center, center, drawRadius * 2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, colorObj.hex);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(center, center, drawRadius * 2, 0, Math.PI * 2);
        offCtx.fill();

        orbCanvasCache[idx] = offCanvas;
    });
}

function initCoreGrad() {
    coreGlowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
    if (currentTheme === 'light' || currentTheme === 'light_ether') {
        coreGlowGrad.addColorStop(0, 'rgba(170, 0, 255, 0.15)');
        coreGlowGrad.addColorStop(0.5, 'rgba(170, 0, 255, 0.05)');
    } else {
        coreGlowGrad.addColorStop(0, 'rgba(15, 10, 30, 0.6)');
        coreGlowGrad.addColorStop(0.5, 'rgba(10, 0, 20, 0.2)');
    }
    coreGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
}

// Touch Drag State
let isInputActive = false;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lastTouchAngle = 0;

// Timing helper variables
let lastTime = 0;
let spawnTimer = 0;
let orbSpawnRateModifier = 1.0;

// Helper: Format Time in MM:SS (or HH:MM:SS)
function formatTime(totalSeconds) {
    const sec = Math.floor(totalSeconds % 60);
    const min = Math.floor((totalSeconds / 60) % 60);
    const hrs = Math.floor(totalSeconds / 3600);
    const pad = (num) => num.toString().padStart(2, '0');
    if (hrs > 0) {
        return `${pad(hrs)}:${pad(min)}:${pad(sec)}`;
    }
    return `${pad(min)}:${pad(sec)}`;
}

// Helper: Set Game Mode (Classic Arcade vs Zen / Flow)
function setGameMode(mode) {
    gameMode = mode;
    try {
        localStorage.setItem('orbit_fusion_mode', mode);
    } catch (e) {
        console.warn("Could not save game mode to localStorage", e);
    }
    
    // Update main menu mode selector buttons
    const classicBtn = document.getElementById('mode-classic-btn');
    const zenBtn = document.getElementById('mode-zen-btn');
    if (classicBtn && zenBtn) {
        if (mode === 'zen') {
            classicBtn.classList.remove('active');
            zenBtn.classList.add('active');
        } else {
            classicBtn.classList.add('active');
            zenBtn.classList.remove('active');
        }
    }

    // Update pause menu setting button text
    const toggleBtn = document.getElementById('mode-toggle-btn');
    if (toggleBtn) {
        toggleBtn.innerText = mode === 'zen' ? 'ZEN / FLOW' : 'CLASIC';
    }

    // Toggle serene visual atmosphere class on body
    if (mode === 'zen') {
        document.body.classList.add('zen-mode');
        if (stability < 100) {
            stability = 100;
            updateHUD();
        }
    } else {
        document.body.classList.remove('zen-mode');
    }
}

// Helper: Show/Hide Session Rest Reminder Banner
function showRestReminder() {
    const banner = document.getElementById('rest-reminder-banner');
    if (banner) banner.classList.remove('hidden');
}

function hideRestReminder() {
    const banner = document.getElementById('rest-reminder-banner');
    if (banner) banner.classList.add('hidden');
}

// Helper: Update Pause Screen Box Breathing Visualizer Widget
function updateBreathingWidget(dt) {
    const outerRing = document.getElementById('breathing-ring-outer');
    const phaseText = document.getElementById('breathing-phase-text');
    const timerText = document.getElementById('breathing-timer-text');
    if (!outerRing || !phaseText || !timerText) return;

    breathingCycleTime += dt;
    const cycleTotal = BREATHING_PHASE_DURATION * 4; // 16s
    const currentCycleTime = breathingCycleTime % cycleTotal;
    
    const phaseIndex = Math.floor(currentCycleTime / BREATHING_PHASE_DURATION); // 0, 1, 2, 3
    const phaseTimeRemaining = BREATHING_PHASE_DURATION - (currentCycleTime % BREATHING_PHASE_DURATION);
    const progressInPhase = (currentCycleTime % BREATHING_PHASE_DURATION) / BREATHING_PHASE_DURATION;

    outerRing.classList.remove('inhale', 'hold', 'exhale', 'rest');

    let scale = 1.0;
    if (phaseIndex === 0) {
        // Phase 1: Inhale (0-4s) - Ring expands smoothly 0.75 -> 1.25
        scale = 0.75 + (progressInPhase * 0.5);
        phaseText.innerText = "INHALARE...";
        outerRing.classList.add('inhale');
    } else if (phaseIndex === 1) {
        // Phase 2: Hold (4-8s) - Ring holds at 1.25 with subtle pulse
        scale = 1.25 + (Math.sin(Date.now() * 0.003) * 0.03);
        phaseText.innerText = "MENȚINERE...";
        outerRing.classList.add('hold');
    } else if (phaseIndex === 2) {
        // Phase 3: Exhale (8-12s) - Ring contracts smoothly 1.25 -> 0.75
        scale = 1.25 - (progressInPhase * 0.5);
        phaseText.innerText = "EXHALARE...";
        outerRing.classList.add('exhale');
    } else {
        // Phase 4: Rest (12-16s) - Ring rests at 0.75
        scale = 0.75 + (Math.sin(Date.now() * 0.003) * 0.02);
        phaseText.innerText = "RELAXARE...";
        outerRing.classList.add('rest');
    }

    timerText.innerText = `${Math.ceil(phaseTimeRemaining)}s`;
    outerRing.style.transform = `scale(${scale.toFixed(3)})`;
}

function getComboMultiplier(count) {
    if (count < 2) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    if (count <= 9) return 5;
    return 8;
}

function registerComboHit(bonusCount = 1) {
    const prevMult = comboMultiplier;
    comboCount += bonusCount;
    comboTimer = COMBO_WINDOW;
    comboMultiplier = getComboMultiplier(comboCount);
    runMaxCombo = Math.max(runMaxCombo, comboMultiplier);

    if (comboMultiplier > lifetimeStats.highestCombo) {
        lifetimeStats.highestCombo = comboMultiplier;
        saveLifetimeStats();
    }

    if (comboMultiplier > prevMult && comboMultiplier >= 2) {
        soundManager.playComboStinger(comboMultiplier);
    }
    updateComboHUD();
    checkBadgesAndThemes();
}

function resetCombo() {
    comboCount = 0;
    comboTimer = 0;
    comboMultiplier = 1;
    updateComboHUD();
}

function updateComboHUD() {
    const badge = document.getElementById('combo-badge');
    if (!badge) return;

    if (comboCount >= 2) {
        badge.classList.remove('hidden');
        badge.innerText = `x${comboMultiplier} COMBO!`;

        badge.classList.remove('combo-tier-1', 'combo-tier-2', 'combo-tier-3');
        if (comboMultiplier === 2) {
            badge.classList.add('combo-tier-1');
        } else if (comboMultiplier >= 3 && comboMultiplier < 5) {
            badge.classList.add('combo-tier-2');
        } else if (comboMultiplier >= 5) {
            badge.classList.add('combo-tier-3');
        }

        badge.style.animation = 'none';
        badge.offsetHeight; // force reflow
        badge.style.animation = null;
    } else {
        badge.classList.add('hidden');
    }
}

function applyShakeSetting(setting) {
    shakeSetting = setting;
    try {
        localStorage.setItem('orbit_fusion_shake', setting);
    } catch (e) {
        console.warn("Could not save shake setting to localStorage", e);
    }
    updateShakeButtonUI();
}

function updateShakeButtonUI() {
    const btn = document.getElementById('shake-toggle-btn');
    if (!btn) return;
    if (shakeSetting === 'off') {
        btn.innerText = 'OPRIT';
    } else if (shakeSetting === 'medium') {
        btn.innerText = 'MEDIU';
    } else {
        btn.innerText = 'INTENS';
    }
}

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
    const isLight = currentTheme === 'light' || currentTheme === 'light_ether';
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

    // Pre-create cached radial gradients relative to (0,0) for each nebula to eliminate GC allocations
    nebulae.forEach(neb => {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        neb.cachedGrad = grad;
    });
}

function drawBackground() {
    // 0. Draw Theme Radial Background Gradient (Cached)
    if (!cachedBgGradient && themeStyles.bgGradient && themeStyles.bgGradient.length >= 2) {
        const maxDim = Math.max(window.innerWidth, window.innerHeight) * 0.8;
        cachedBgGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, maxDim);
        cachedBgGradient.addColorStop(0, themeStyles.bgGradient[0]);
        cachedBgGradient.addColorStop(1, themeStyles.bgGradient[1]);
    }
    if (cachedBgGradient) {
        ctx.save();
        ctx.fillStyle = cachedBgGradient;
        ctx.fillRect(-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth, window.innerHeight);
        ctx.restore();
    }

    // 1. Draw Nebulae using pre-computed gradients
    nebulae.forEach(neb => {
        neb.phase += neb.speed * 0.016; // slow orbit phase
        const ox = Math.cos(neb.phase) * 40;
        const oy = Math.sin(neb.phase) * 40;
        
        ctx.save();
        ctx.translate(neb.x + ox, neb.y + oy);
        ctx.fillStyle = neb.cachedGrad || neb.color;
        ctx.beginPath();
        ctx.arc(0, 0, neb.radius, 0, Math.PI * 2);
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
        this.spawnDistance = this.distance || 400;
        this.angle = Math.atan2(y, x);
        
        // Small rotation offset for curved trajectories (adds premium cosmic feel)
        this.curveSpeed = (Math.random() - 0.5) * 0.15;
    }

    update(dt) {
        // Gravitational acceleration curve as orb approaches center core
        const distRatio = 1.0 - Math.min(1.0, this.distance / this.spawnDistance);
        const currentSpeed = this.speed * (1 + distRatio * 0.35);

        // Move towards center
        this.distance -= currentSpeed * dt;
        
        // Slightly spiral inward
        this.angle += this.curveSpeed * dt;
        
        // Recalculate Cartesian coordinates
        this.x = Math.cos(this.angle) * this.distance;
        this.y = Math.sin(this.angle) * this.distance;

        // Leave glowing trail particles
        if (Math.random() < 0.45 && particles.length < MAX_PARTICLES) {
            particles.push(new Particle(
                this.x, 
                this.y, 
                (Math.random() - 0.5) * 12, 
                (Math.random() - 0.5) * 12, 
                COLORS[this.colorIndex].hex, 
                0.65, 
                Math.random() * 2.5 + 1.5,
                0.6
            ));
        }
    }

    draw(ctx) {
        if (orbCanvasCache[this.colorIndex]) {
            const renderSize = this.size * 4;
            ctx.drawImage(orbCanvasCache[this.colorIndex], this.x - renderSize / 2, this.y - renderSize / 2, renderSize, renderSize);
        } else {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = COLORS[this.colorIndex] ? COLORS[this.colorIndex].hex : '#ffffff';
            ctx.fill();
            ctx.restore();
        }
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

    // Reset Run Mastery Metrics
    runSuccessfulMatches = 0;
    runTotalImpacts = 0;
    runTotalFusions = 0;
    runMaxCombo = 1;
    runPlayTimeSeconds = 0;

    // Increment Lifetime Runs
    lifetimeStats.totalRuns++;
    saveLifetimeStats();
    checkBadgesAndThemes();

    resetCombo();
    updateShakeButtonUI();

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
    realignOrbColors();
}

function realignOrbColors() {
    if (orbs.length === 0) return;
    
    // Obținem culorile unice prezente pe segmente (excluzând Supernova, index 5, care este temporară)
    const activeColors = [...new Set(segments.map(s => s.colorIndex).filter(c => c < COLORS.length - 1))];
    const usableColors = activeColors.length > 0 ? activeColors : [0];

    orbs.forEach(orb => {
        if (!usableColors.includes(orb.colorIndex)) {
            const oldColorIndex = orb.colorIndex;
            // Selectăm o nouă culoare din cele active curent pe hexagon
            const newColorIndex = usableColors[Math.floor(Math.random() * usableColors.length)];
            orb.colorIndex = newColorIndex;
            
            // Generăm particule vizuale cu noua culoare la poziția orbului
            for (let k = 0; k < 8; k++) {
                if (particles.length >= MAX_PARTICLES) break;
                const angle = Math.random() * Math.PI * 2;
                const sp = 20 + Math.random() * 50;
                particles.push(new Particle(
                    orb.x, 
                    orb.y, 
                    Math.cos(angle) * sp, 
                    Math.sin(angle) * sp, 
                    COLORS[newColorIndex].hex, 
                    0.8, 
                    3,
                    1.2
                ));
            }
        }
    });
}

function handleOrbImpact(orb, segIdx, orbIdx) {
    const segment = segments[segIdx];
    runTotalImpacts++;
    
    // Trigger visual scale pulse
    segment.pulse = 1.4;

    // Calculate precision alignment relative to target segment center
    let relAngle = (orb.angle - hexAngle) % (Math.PI * 2);
    if (relAngle < 0) relAngle += Math.PI * 2;
    
    const segCenterAngle = (segIdx + 0.5) * (Math.PI / 3);
    let angleOffset = Math.abs(relAngle - segCenterAngle);
    if (angleOffset > Math.PI) angleOffset = Math.PI * 2 - angleOffset;
    
    // Segment width is PI/3 (~0.5236 rad, 60 deg). Within 0.09 rad (~5 deg) is a Perfect central hit!
    const isPerfect = angleOffset < 0.09;

    if (segment.colorIndex === orb.colorIndex) {
        // MATCH! Color matches - extend combo streak
        runSuccessfulMatches++;
        registerComboHit(1);

        // Level up the segment
        segment.colorIndex = Math.min(COLORS.length - 1, segment.colorIndex + 1);
        segment.health = Math.min(1.0, segment.health + 0.15); // Repair a bit
        
        // Calculate points scaled by combo multiplier
        const basePoints = 10 * level;
        const perfectBonus = isPerfect ? 50 * level : 0;
        const points = (basePoints + perfectBonus) * comboMultiplier;
        score += points;
        
        // Float text
        const px = Math.cos(orb.angle) * hexRadius;
        const py = Math.sin(orb.angle) * hexRadius;
        const textLabel = isPerfect ? `+${points} Perfect!` : `+${points}`;
        const textColor = isPerfect ? '#ffdd00' : COLORS[orb.colorIndex].hex;
        floatingTexts.push(new FloatingText(px, py, textLabel, textColor));
        
        if (isPerfect) {
            soundManager.playPerfect();
            lifetimeStats.perfectHitsCount++;
            saveLifetimeStats();
            checkBadgesAndThemes();
            // Golden sparkle particles on Perfect central hit
            for (let k = 0; k < 20; k++) {
                if (particles.length >= MAX_PARTICLES) break;
                const angle = Math.random() * Math.PI * 2;
                const sp = 80 + Math.random() * 120;
                particles.push(new Particle(
                    orb.x, 
                    orb.y, 
                    Math.cos(angle) * sp, 
                    Math.sin(angle) * sp, 
                    Math.random() < 0.5 ? '#ffdd00' : '#ffffff', 
                    0.95, 
                    Math.random() * 3 + 2,
                    0.9
                ));
            }
        } else {
            soundManager.playMatch(comboMultiplier);
            // Spark particles
            for (let k = 0; k < 12; k++) {
                if (particles.length >= MAX_PARTICLES) break;
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
        }

        // Add XP
        addXP(isPerfect ? 15 : 10);
        
        // Check for adjacent color fusions
        checkFusions(segIdx);

        // Remove orb
        orbs.splice(orbIdx, 1);
    } else {
        // MISMATCH! Wrong color - break combo streak
        resetCombo();
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
            if (particles.length >= MAX_PARTICLES) break;
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
            if (segL.colorIndex === segR.colorIndex && segL.colorIndex < COLORS.length - 1 && segL.colorIndex > 0) {
                const fusionColorIdx = segL.colorIndex;
                runTotalFusions++;
                lifetimeStats.totalFusions++;
                saveLifetimeStats();
                checkBadgesAndThemes();
                
                // Add to combo streak for fusion
                registerComboHit(2);

                // Segment L gets upgraded
                segL.colorIndex = Math.min(COLORS.length - 1, segL.colorIndex + 1);
                segL.health = 1.0; // Fully restored
                segL.pulse = 1.6;

                // Segment R resets to Level 0 (Cyan)
                segR.colorIndex = 0;
                segR.health = 1.0;
                segR.pulse = 0.9;

                // Play satisfying chord scaled by combo richness
                soundManager.playFusion(comboMultiplier);

                // Points & XP bonuses scaled by combo multiplier
                const bonus = 40 * level * (fusionColorIdx + 1) * comboMultiplier;
                score += bonus;
                addXP(20);

                // Shockwave at the fusion site (between left & right vertices)
                const angleBetween = (left * (Math.PI / 3) + right * (Math.PI / 3)) / 2 + hexAngle;
                const waveX = Math.cos(angleBetween) * hexRadius;
                const waveY = Math.sin(angleBetween) * hexRadius;
                shockwaves.push(new Shockwave(waveX, waveY, 150, COLORS[fusionColorIdx].hex));
                
                // Exploding high-impact starburst particles
                for (let k = 0; k < 25; k++) {
                    if (particles.length >= MAX_PARTICLES) break;
                    const angle = Math.random() * Math.PI * 2;
                    const sp = 90 + Math.random() * 180;
                    const particleColor = Math.random() < 0.3 ? '#ffffff' : COLORS[fusionColorIdx].hex;
                    particles.push(new Particle(
                        waveX, 
                        waveY, 
                        Math.cos(angle) * sp, 
                        Math.sin(angle) * sp, 
                        particleColor, 
                        0.95, 
                        Math.random() * 3.5 + 2,
                        0.7
                    ));
                }

                // Floating points text
                const comboStr = comboMultiplier > 1 ? ` (x${comboMultiplier})` : '';
                floatingTexts.push(new FloatingText(waveX, waveY, `FUSION +${bonus}!${comboStr}`, COLORS[fusionColorIdx + 1].hex));

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
            if (particles.length >= MAX_PARTICLES) break;
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
    if (gameMode === 'zen') {
        stability = 100;
        updateHUD();
        return;
    }
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
        if (particles.length >= MAX_PARTICLES) break;
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
        if (particles.length >= MAX_PARTICLES) break;
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

    // Orb Speed increases with Level (softer speed progression in Zen mode)
    const speedMult = gameMode === 'zen' ? 0.75 : 1.0;
    const orbSpeed = BASE_ORB_SPEED * (1 + level * 0.08) * speedMult;

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

    // Outer gravity glow (using pre-created coreGlowGrad scaled by pulseFactor)
    if (!coreGlowGrad) initCoreGrad();
    ctx.save();
    ctx.scale(pulseFactor, pulseFactor);
    ctx.fillStyle = coreGlowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Dark core void (Singularity effect)
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = themeStyles.coreFill;
    ctx.shadowBlur = 15;
    ctx.shadowColor = COLORS[4] ? COLORS[4].hex : '#aa00ff';
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

    // Calculate Positive Mastery Metrics
    const precisionPercent = runTotalImpacts > 0 ? Math.round((runSuccessfulMatches / runTotalImpacts) * 100) : 100;
    const focusScore = Math.round(score * 1.25 + runTotalFusions * 50 + runMaxCombo * 80 + level * 60);
    const playTimeStr = formatTime(runPlayTimeSeconds);

    if (focusScore > lifetimeStats.highestFocusScore) {
        lifetimeStats.highestFocusScore = focusScore;
    }
    saveLifetimeStats();
    checkBadgesAndThemes();

    const goTitle = document.getElementById('go-title');
    const goSubtitle = document.getElementById('go-subtitle');
    const goFocusScore = document.getElementById('go-focus-score');
    const goScore = document.getElementById('go-score');
    const goPrecision = document.getElementById('go-precision');
    const goFusions = document.getElementById('go-fusions');
    const goMaxCombo = document.getElementById('go-max-combo');
    const goPlayTime = document.getElementById('go-play-time');
    const goLevel = document.getElementById('go-level');
    const feedbackText = document.getElementById('positive-feedback-text');

    if (goTitle) goTitle.innerText = gameMode === 'zen' ? 'SESIUNE ZEN COMPLETATĂ' : 'REZUMAT MISIUNE & FLUX';
    if (goSubtitle) goSubtitle.innerText = gameMode === 'zen' ? 'O pauză de reîncărcare în starea de bine!' : 'Sesiune de concentrare finalizată cu succes!';
    if (goFocusScore) goFocusScore.innerText = focusScore;
    if (goScore) goScore.innerText = score;
    if (goPrecision) goPrecision.innerText = `${precisionPercent}%`;
    if (goFusions) goFusions.innerText = runTotalFusions;
    if (goMaxCombo) goMaxCombo.innerText = `x${runMaxCombo}`;
    if (goPlayTime) goPlayTime.innerText = playTimeStr;
    if (goLevel) goLevel.innerText = level;

    // Positive Feedback Message Selection
    if (feedbackText) {
        if (precisionPercent >= 85) {
            feedbackText.innerText = "🌟 Excelent! Precizia ta de rotire a fost excepțională. Un ritm de joc impecabil!";
        } else if (runMaxCombo >= 3) {
            feedbackText.innerText = "🔥 Impresionant! Ai menținut serii valoroase de fuziuni și ai atins starea optimă de Flux.";
        } else if (runTotalFusions >= 10) {
            feedbackText.innerText = "⚡ Maestru al energiilor! Ai realizat fuziuni cosmice spectaculoase.";
        } else if (gameMode === 'zen') {
            feedbackText.innerText = "🧘 Relaxant & Eficient! Ți-ai oferit o sesiune de joc fără stres, excelentă pentru minte.";
        } else {
            feedbackText.innerText = "👏 Bravo! Fiecare sesiune îți îmbunătățește atenția, focusul și timpii de reacție.";
        }
    }
    
    if (isNewHigh) {
        document.getElementById('new-high-score-badge').classList.remove('hidden');
    }
    
    goScreen.classList.remove('hidden');
}

// ==========================================================================
// 10. GAME LOOP & UPDATE MATH
// ==========================================================================

function update(dt) {
    // Session duration tracking & HUD update
    sessionElapsedSeconds += dt;
    const sessionTimeVal = document.getElementById('session-time-val');
    if (sessionTimeVal) {
        sessionTimeVal.innerText = formatTime(sessionElapsedSeconds);
    }

    // 20-minute rest reminder threshold check
    if (sessionElapsedSeconds >= nextRestReminderTime) {
        showRestReminder();
        nextRestReminderTime += REST_REMINDER_INTERVAL;
    }

    if (gameState === 'playing') {
        runPlayTimeSeconds += dt;
        lifetimeStats.totalPlayTimeSeconds += dt;
        if (gameMode === 'zen') {
            lifetimeStats.zenPlayTimeSeconds += dt;
        }
        // Save and check criteria periodically (every 5s)
        if (Math.floor(lifetimeStats.totalPlayTimeSeconds) % 5 === 0) {
            saveLifetimeStats();
            checkBadgesAndThemes();
        }
    } else if (gameState === 'paused') {
        updateBreathingWidget(dt);
    }

    if (gameState !== 'playing' && gameState !== 'start') return;

    // Combo timer countdown
    if (comboTimer > 0) {
        comboTimer -= dt;
        if (comboTimer <= 0) {
            resetCombo();
        }
    }

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

    // Cap array lists to strictly enforce memory limits and eliminate GC pressure
    if (particles.length > MAX_PARTICLES) {
        particles = particles.slice(particles.length - MAX_PARTICLES);
    }
    if (shockwaves.length > MAX_SHOCKWAVES) {
        shockwaves = shockwaves.slice(shockwaves.length - MAX_SHOCKWAVES);
    }
    if (floatingTexts.length > MAX_FLOATING_TEXTS) {
        floatingTexts = floatingTexts.slice(floatingTexts.length - MAX_FLOATING_TEXTS);
    }
    // Filter out-of-bounds orbs
    orbs = orbs.filter(orb => orb.distance <= 2000);

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
    
    // Apply Screen Shake with intensity setting modifier
    let shakeMult = shakeSetting === 'off' ? 0 : (shakeSetting === 'medium' ? 0.5 : 1.0);
    let effectiveShake = screenShake * shakeMult;

    if (effectiveShake > 0) {
        const dx = (Math.random() - 0.5) * effectiveShake;
        const dy = (Math.random() - 0.5) * effectiveShake;
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
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    
    // Hexagon radius dynamic adjustments based on screen scale
    hexRadius = Math.min(width, height) * 0.18;
    if (hexRadius < 75) hexRadius = 75;
    if (hexRadius > 130) hexRadius = 130;

    cachedBgGradient = null;
    initStars();
    initNebulae();
    initOrbCache();
    initCoreGrad();
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

// Pointer & Touch Controls (Direct Touch Drag Angle Tracking + Split Screen Taps)
function getAngleFromCenter(clientX, clientY) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    return Math.atan2(clientY - centerY, clientX - centerX);
}

function handlePointerStart(clientX, clientY, target) {
    if (gameState !== 'playing') return;
    if (target && target.closest && (target.closest('.hud-controls') || target.closest('.action-btn') || target.closest('.settings-container'))) return;
    
    isInputActive = true;
    isDragging = false;
    dragStartX = clientX;
    dragStartY = clientY;
    lastTouchAngle = getAngleFromCenter(clientX, clientY);
}

function handlePointerMove(clientX, clientY, target) {
    if (!isInputActive || gameState !== 'playing') return;

    const distMoved = Math.hypot(clientX - dragStartX, clientY - dragStartY);
    if (distMoved > 8) {
        isDragging = true;
    }

    if (isDragging) {
        const currentAngle = getAngleFromCenter(clientX, clientY);
        let delta = currentAngle - lastTouchAngle;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        hexAngle += delta;
        lastTouchAngle = currentAngle;
    }
}

function handlePointerEnd() {
    if (!isInputActive) return;
    
    // If user tapped without dragging, trigger split-screen rotation
    if (!isDragging && gameState === 'playing') {
        const midPoint = window.innerWidth / 2;
        if (dragStartX < midPoint) {
            keys.Left = true;
            setTimeout(() => { keys.Left = false; }, 150);
        } else {
            keys.Right = true;
            setTimeout(() => { keys.Right = false; }, 150);
        }
    }

    isInputActive = false;
    isDragging = false;
    keys.Left = false;
    keys.Right = false;
}

window.addEventListener('mousedown', (e) => {
    handlePointerStart(e.clientX, e.clientY, e.target);
});

window.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY, e.target);
});

window.addEventListener('mouseup', () => {
    handlePointerEnd();
});

window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerStart(touch.clientX, touch.clientY, e.target);
    }
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY, e.target);
    }
}, { passive: true });

window.addEventListener('touchend', () => {
    handlePointerEnd();
});

// Screen Shake Toggle UI Listener
const shakeBtn = document.getElementById('shake-toggle-btn');
if (shakeBtn) {
    shakeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        const nextSetting = shakeSetting === 'intense' ? 'medium' : (shakeSetting === 'medium' ? 'off' : 'intense');
        applyShakeSetting(nextSetting);
    });
}

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
    const hud = document.getElementById('hud');
    if (hud) hud.classList.add('hidden');
    document.getElementById('pause-screen').classList.remove('hidden');
    
    // Change pause toggle icon to play icon
    document.getElementById('pause-icon').setAttribute('d', 'M8,5.14V19.14L19,12.14L8,5.14Z');
}

function resumeGame() {
    if (gameState !== 'paused') return;
    gameState = 'playing';
    document.getElementById('pause-screen').classList.add('hidden');
    const hud = document.getElementById('hud');
    if (hud) hud.classList.remove('hidden');
    
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
    openModal('theme-modal');
});

// Progression Modals Open Listeners
const openThemeBtn = document.getElementById('open-theme-btn');
if (openThemeBtn) openThemeBtn.addEventListener('click', () => { soundManager.init(); openModal('theme-modal'); });

const openBadgesBtn = document.getElementById('open-badges-btn');
if (openBadgesBtn) openBadgesBtn.addEventListener('click', () => { soundManager.init(); openModal('badges-modal'); });

const openStatsBtn = document.getElementById('open-stats-btn');
if (openStatsBtn) openStatsBtn.addEventListener('click', () => { soundManager.init(); openModal('stats-modal'); });

const pauseThemeBtn = document.getElementById('pause-theme-select-btn');
if (pauseThemeBtn) pauseThemeBtn.addEventListener('click', () => { soundManager.init(); openModal('theme-modal'); });

const pauseBadgesBtn = document.getElementById('pause-badges-btn');
if (pauseBadgesBtn) pauseBadgesBtn.addEventListener('click', () => { soundManager.init(); openModal('badges-modal'); });

const pauseStatsBtn = document.getElementById('pause-stats-btn');
if (pauseStatsBtn) pauseStatsBtn.addEventListener('click', () => { soundManager.init(); openModal('stats-modal'); });

// Modals Close Listeners
const themeCloseBtn = document.getElementById('theme-close-btn');
if (themeCloseBtn) themeCloseBtn.addEventListener('click', () => closeModal('theme-modal'));

const badgesCloseBtn = document.getElementById('badges-close-btn');
if (badgesCloseBtn) badgesCloseBtn.addEventListener('click', () => closeModal('badges-modal'));

const statsCloseBtn = document.getElementById('stats-close-btn');
if (statsCloseBtn) statsCloseBtn.addEventListener('click', () => closeModal('stats-modal'));

// Close modals when clicking backdrop overlay
['theme-modal', 'badges-modal', 'stats-modal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(id);
            }
        });
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

// Rest Reminder Button Listeners
const restPauseBtn = document.getElementById('rest-pause-btn');
if (restPauseBtn) {
    restPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        hideRestReminder();
        if (gameState === 'playing') {
            pauseGame();
        }
    });
}

const restContinueBtn = document.getElementById('rest-continue-btn');
if (restContinueBtn) {
    restContinueBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        hideRestReminder();
    });
}

// Game Mode Selector Listeners
const modeClassicBtn = document.getElementById('mode-classic-btn');
if (modeClassicBtn) {
    modeClassicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        setGameMode('classic');
    });
}

const modeZenBtn = document.getElementById('mode-zen-btn');
if (modeZenBtn) {
    modeZenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        setGameMode('zen');
    });
}

const modeToggleBtn = document.getElementById('mode-toggle-btn');
if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        const nextMode = gameMode === 'classic' ? 'zen' : 'classic';
        setGameMode(nextMode);
    });
}

// Start engine
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Load Persistence Data
loadLifetimeStats();
loadUnlockedBadges();
loadUnlockedThemes();
checkBadgesAndThemes();

// Detect and apply saved game mode
setGameMode(gameMode);

// Initialize the game state so that autopilot starts immediately behind the start panel
initGame();
gameState = 'start';

// Load and render history UI
updateHistoryUI();

// Detect and apply theme (respects saved choice or defaults to cyber_neon)
let savedTheme = 'cyber_neon';
try {
    savedTheme = localStorage.getItem('orbit_fusion_theme') || 'cyber_neon';
} catch (e) {
    savedTheme = 'cyber_neon';
}
applyTheme(savedTheme);

// Set initial highscore on startup screen
document.getElementById('best-score-val').innerText = highScore;

// Start game loop
requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
});
