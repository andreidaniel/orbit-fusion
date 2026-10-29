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

// ==========================================================================
// 1A. BILINGUAL LOCALIZATION SYSTEM (ROMANIAN & ENGLISH)
// ==========================================================================

let currentLang = 'ro';
try {
    const savedLang = localStorage.getItem('orbit_fusion_lang');
    if (savedLang === 'en' || savedLang === 'ro') {
        currentLang = savedLang;
    }
} catch (_) {}

const I18N = {
    ro: {
        page_title: 'Orbit Fusion - Joc arcade cosmic',
        page_desc: 'Orbit Fusion este un joc arcade cosmic rapid, optimizat pentru desktop, telefon și tabletă.',
        canvas_aria: 'Zona de joc Orbit Fusion: rotește hexagonul și potrivește scuturile cu sferele colorate.',
        hud_aria: 'Informații de joc',
        hud_score: 'SCOR',
        hud_level: 'NIVEL',
        hud_stability: 'STABILITATE',
        hud_stability_short: 'STAB.',
        hud_session_time: 'TIMP SESIUNE',
        hud_session_short: 'TIMP',
        aria_lang_toggle: 'Schimbă limba în Engleză (Switch to English)',
        aria_theme_toggle: 'Comută modul luminos / întunecat',
        aria_pause_toggle: 'Pauză joc',
        aria_sound_off: 'Oprește sunetul',
        aria_sound_on: 'Pornește sunetul',
        touch_controls_aria: 'Comenzi de rotire',
        touch_left_aria: 'Rotește spre stânga',
        touch_right_aria: 'Rotește spre dreapta',
        touch_left: 'STÂNGA',
        touch_right: 'DREAPTA',
        rest_title: 'TIMP PENTRU O PAUZĂ',
        rest_text: 'Ai jucat 20 de minute! Este momentul ideal pentru o scurtă pauză de refacere a energiei și relaxare a ochilor.',
        rest_pause_btn: 'IA O PAUZĂ',
        rest_continue_btn: 'CONTINUĂ',
        endless_badge: '∞ MOD INFINIT PROGRESIV',
        start_tagline: 'Rotește hexagonul. Potrivește culorile. Fuzionează energia la nesfârșit.',
        mode_selector_title: 'MOD DE JOC',
        mode_classic_name: 'ARCADE CLASIC · ∞',
        mode_classic_desc: 'Dificultate crescândă infinită. Fuziunile refac scutul.',
        mode_zen_name: 'ZEN · RELAXARE',
        mode_zen_desc: 'Fără înfrângere. Flux infinit în ritmul tău.',
        quick_guide: 'Potrivește sfera cu latura de aceeași culoare. Fuziunile și loviturile perfecte îți regenerează scutul!',
        start_btn: 'JOACĂ ACUM',
        music_label: 'Muzică cosmică',
        music_off_hint: '0 = oprit',
        music_aria: 'Volum muzică cosmică; zero oprește muzica',
        tutorial_summary: 'CUM SE JOACĂ',
        tutorial_step_1: 'Privește sfera colorată care vine spre hexagon (sau sfera ★ aurie ce potrivește orice latură).',
        tutorial_step_2: 'Rotește hexagonul: sfera trebuie să atingă o latură de aceeași culoare.',
        tutorial_step_3: 'La o potrivire, latura avansează. Două laturi vecine de același nivel fuzionează automat, refac scutul și aduc bonus!',
        control_tip_html: '<strong>Calculator:</strong> ține apăsat A / D sau ← / →. <strong>Telefon:</strong> ține apăsat STÂNGA / DREAPTA sau glisează circular în jurul hexagonului.<br><strong>Pauză:</strong> butonul Ⅱ sau P / Escape. Pe măsură ce avansezi, viteza și valurile cosmice cresc, iar fuziunile îți mențin scutul viu la nesfârșit.',
        best_score_label: 'RECORD PERSONAL',
        history_title: 'Istoric Misiuni:',
        hist_level: 'Nivel',
        hist_pts: 'pct',
        btn_themes: 'TEME',
        btn_badges: 'EMBLEME',
        btn_stats: 'STATISTICI',
        go_title_default: 'REZUMAT MISIUNE & FLUX',
        go_title_zen: 'SESIUNE ZEN COMPLETATĂ',
        go_subtitle_default: 'Sesiune de concentrare finalizată cu succes!',
        go_subtitle_zen: 'O pauză de reîncărcare în starea de bine!',
        go_focus_score: 'SCOR FOCALIZARE',
        go_final_score: 'SCOR FINAL',
        go_precision: 'PRECIZIE ROTIRE',
        go_fusions: 'TOTAL FUZIONĂRI',
        go_max_combo: 'COMBO MAXIM',
        go_play_time: 'TIMP JOC',
        go_level: 'NIVEL ATINS',
        new_high_score: 'NOU RECORD!',
        restart_btn: 'CONTINUĂ CĂLĂTORIA',
        fb_precision: '🌟 Excelent! Precizia ta de rotire a fost excepțională. Un ritm de joc impecabil!',
        fb_combo: '🔥 Impresionant! Ai menținut serii valoroase de fuziuni și ai atins starea optimă de Flux.',
        fb_fusions: '⚡ Maestru al energiilor! Ai realizat fuziuni cosmice spectaculoase.',
        fb_zen: '🧘 Relaxant & Eficient! Ți-ai oferit o sesiune de joc fără stres, excelentă pentru minte.',
        fb_default: '👏 Bravo! Fiecare sesiune îți îmbunătățește atenția, focusul și timpii de reacție.',
        pause_title: 'JOC PAUZAT',
        pause_tagline: 'Ia-ți timpul necesar. Continuă când ești gata.',
        set_lang_label: 'Limbă / Language',
        set_lang_desc: 'Comută între Română și Engleză.',
        set_lang_val: 'ROMÂNĂ',
        set_markers_label: 'Cifre ajutătoare',
        set_markers_desc: 'Distingi culorile și prin numere.',
        markers_on: 'PORNITE',
        markers_off: 'OPRITE',
        set_mode_label: 'Mod de joc',
        set_mode_desc: 'Clasic cu provocări sau Zen fără înfrângere.',
        mode_classic_short: 'CLASIC',
        mode_zen_short: 'ZEN / FLOW',
        set_shake_label: 'Tremurul ecranului',
        set_shake_desc: 'Alege intensitatea efectului la impact.',
        shake_off: 'OPRIT',
        shake_medium: 'MEDIU',
        shake_intense: 'INTENS',
        set_theme_label: 'Aspectul jocului',
        set_theme_desc: 'Alege fundalul și paleta de culori.',
        set_theme_btn: 'SCHIMBĂ TEMĂ',
        set_badges_label: 'Embleme',
        set_badges_desc: 'Vezi realizările deblocate.',
        set_stats_label: 'Statistici',
        set_stats_desc: 'Vezi progresul și rezultatele tale.',
        breath_title: 'UN MOMENT DE RELAXARE',
        breath_subtitle: 'Urmărește cercul: câte 4 secunde pe etapă.',
        breath_subtext: 'Respiră în ritm cu cercul energetic pentru a-ți reseta atenția.',
        breath_inhale: 'INSPIRĂ',
        breath_hold: 'MENȚINE',
        breath_exhale: 'EXHALARE...',
        breath_rest: 'RELAXARE...',
        resume_btn: 'CONTINUĂ',
        level_up_title: 'NIVEL NOU!',
        level_up_sub: 'NIVELUL',
        theme_modal_title: 'SELECȚIE TEME COSMICE',
        theme_modal_subtitle: 'Alege o temă vizuală cosmică deblocată pentru a-ți personaliza jocul.',
        badges_modal_title: 'EMBLEME DE MAESTRIE',
        badges_modal_subtitle: 'Atinge performanțe în joc pentru a debloca toate cele 6 embleme cosmice.',
        stats_modal_title: 'STATISTICI PERSISTENTE',
        stats_modal_subtitle: 'Progresul și realizările tale pe termen lung salvate în profil.',
        stat_total_fusions: 'TOTAL FUZIUNI',
        stat_max_combo: 'MAX COMBO',
        stat_max_focus: 'SCOR FOCUS MAX',
        stat_total_time: 'TIMP TOTAL JOC',
        stat_total_runs: 'TOTAL MISIUNI',
        stat_perfect_hits: 'LOVITURI PERFECTE',
        badge_unlocked: 'DEBLOCAT',
        badge_locked: 'BLOCAT',
        theme_active: 'ACTIVĂ',
        theme_unlocked: 'DEBLOCATĂ',
        theme_locked: 'BLOCATĂ',
        theme_available_desc: 'Paletă disponibilă și optimizată vizual',
        theme_req_prefix: 'Necesar:',
        theme_btn_active: 'ACTIVĂ ÎN JOC',
        theme_btn_apply: 'APLICĂ TEMĂ',
        theme_btn_locked: 'BLOCATĂ',
        toast_badge_unlocked: 'Emblemă Deblocată!',
        toast_theme_unlocked: 'Temă Cosmică Deblocată!',
        float_perfect: 'Perfect!',
        float_prism: '★ PRISMĂ',
        float_chrono: '⏳ CRONO',
        float_fusion: 'FUZIUNE',
        float_supernova: 'SUPERNOVĂ',
        float_mismatch: 'GREȘIT',
         float_zen_deflect: 'DEVIAȚIE',
        sector_1: 'Orbită Calmă',
        sector_2: 'Vânt Solar',
        sector_3: 'Vortex Nebular',
        sector_4: 'Pulsar Cuantic',
        sector_5: 'Furtună Stelară',
        sector_inf: 'Orizont Infinit ∞'
    },
    en: {
        page_title: 'Orbit Fusion - Cosmic Arcade Game',
        page_desc: 'Orbit Fusion is a fast-paced cosmic arcade puzzle game optimized for desktop, phone, and tablet.',
        canvas_aria: 'Orbit Fusion play area: rotate the hexagon and match shield sides with incoming colored orbs.',
        hud_aria: 'Game HUD Information',
        hud_score: 'SCORE',
        hud_level: 'LEVEL',
        hud_stability: 'STABILITY',
        hud_stability_short: 'STAB.',
        hud_session_time: 'SESSION TIME',
        hud_session_short: 'TIME',
        aria_lang_toggle: 'Switch language to Romanian (Schimbă în Română)',
        aria_theme_toggle: 'Toggle Light / Dark mode',
        aria_pause_toggle: 'Pause game',
        aria_sound_off: 'Mute sound',
        aria_sound_on: 'Unmute sound',
        touch_controls_aria: 'Rotation controls',
        touch_left_aria: 'Rotate left',
        touch_right_aria: 'Rotate right',
        touch_left: 'LEFT',
        touch_right: 'RIGHT',
        rest_title: 'TIME FOR A BREAK',
        rest_text: 'You have played for 20 minutes! Now is a great moment for a short break to recharge and rest your eyes.',
        rest_pause_btn: 'TAKE A BREAK',
        rest_continue_btn: 'CONTINUE',
        endless_badge: '∞ ENDLESS PROGRESSIVE MODE',
        start_tagline: 'Rotate the hexagon. Match the colors. Fuse cosmic energy endlessly.',
        mode_selector_title: 'GAME MODE',
        mode_classic_name: 'CLASSIC ARCADE · ∞',
        mode_classic_desc: 'Endless rising difficulty. Fusions restore your shield.',
        mode_zen_name: 'ZEN · FLOW',
        mode_zen_desc: 'No defeat. Endless flow at your own pace.',
        quick_guide: 'Match each orb with the same-colored side. Fusions and perfect hits regenerate your shield!',
        start_btn: 'PLAY NOW',
        music_label: 'Cosmic music',
        music_off_hint: '0 = off',
        music_aria: 'Cosmic music volume; zero turns music off',
        tutorial_summary: 'HOW TO PLAY',
        tutorial_step_1: 'Watch the colored orb approaching the hexagon (or the golden ★ star orb that matches any side).',
        tutorial_step_2: 'Rotate the hexagon so the orb hits a side of the matching color.',
        tutorial_step_3: 'On a match, that side upgrades. Two adjacent sides of the same advanced level fuse automatically, heal your shield, and award bonus points!',
        control_tip_html: '<strong>Desktop:</strong> hold A / D or ← / →. <strong>Mobile:</strong> hold LEFT / RIGHT or drag in a circle around the hexagon.<br><strong>Pause:</strong> Ⅱ button or P / Escape. As you advance, speed and cosmic waves rise endlessly while fusions keep your shield alive.',
        best_score_label: 'PERSONAL BEST',
        history_title: 'Mission History:',
        hist_level: 'Level',
        hist_pts: 'pts',
        btn_themes: 'THEMES',
        btn_badges: 'BADGES',
        btn_stats: 'STATS',
        go_title_default: 'MISSION & FLOW SUMMARY',
        go_title_zen: 'ZEN SESSION COMPLETE',
        go_subtitle_default: 'Focus session completed successfully!',
        go_subtitle_zen: 'A mindful recharge session in flow state!',
        go_focus_score: 'FOCUS SCORE',
        go_final_score: 'FINAL SCORE',
        go_precision: 'ROTATION PRECISION',
        go_fusions: 'TOTAL FUSIONS',
        go_max_combo: 'MAX COMBO',
        go_play_time: 'PLAY TIME',
        go_level: 'LEVEL REACHED',
        new_high_score: 'NEW HIGH SCORE!',
        restart_btn: 'PLAY AGAIN',
        fb_precision: '🌟 Outstanding! Your rotation precision was exceptional. Impeccable rhythm!',
        fb_combo: '🔥 Impressive! You chained valuable fusion streaks and reached peak Flow state.',
        fb_fusions: '⚡ Energy Master! You triggered spectacular cosmic shield fusions.',
        fb_zen: '🧘 Relaxing & Mindful! You enjoyed a stress-free session that refreshes the mind.',
        fb_default: '👏 Great job! Every run sharpens your attention, focus, and reaction timing.',
        pause_title: 'GAME PAUSED',
        pause_tagline: 'Take your time. Resume whenever you are ready.',
        set_lang_label: 'Language / Limbă',
        set_lang_desc: 'Switch between English and Romanian.',
        set_lang_val: 'ENGLISH',
        set_markers_label: 'Color numbers',
        set_markers_desc: 'Distinguish segment and orb colors by number.',
        markers_on: 'ON',
        markers_off: 'OFF',
        set_mode_label: 'Game mode',
        set_mode_desc: 'Classic with rising challenge or Zen without defeat.',
        mode_classic_short: 'CLASSIC',
        mode_zen_short: 'ZEN / FLOW',
        set_shake_label: 'Screen shake',
        set_shake_desc: 'Choose impact vibration intensity.',
        shake_off: 'OFF',
        shake_medium: 'MEDIUM',
        shake_intense: 'INTENSE',
        set_theme_label: 'Visual theme',
        set_theme_desc: 'Choose the backdrop and color palette.',
        set_theme_btn: 'CHANGE THEME',
        set_badges_label: 'Badges',
        set_badges_desc: 'View unlocked mastery achievements.',
        set_stats_label: 'Statistics',
        set_stats_desc: 'View your lifetime progress and records.',
        breath_title: 'A MINDFUL MOMENT',
        breath_subtitle: 'Follow the circle: 4 seconds per stage.',
        breath_subtext: 'Breathe in rhythm with the energy ring to reset your focus.',
        breath_inhale: 'INHALE',
        breath_hold: 'HOLD',
        breath_exhale: 'EXHALE',
        breath_rest: 'REST',
        resume_btn: 'RESUME',
        level_up_title: 'LEVEL UP!',
        level_up_sub: 'LEVEL',
        theme_modal_title: 'COSMIC THEMES',
        theme_modal_subtitle: 'Choose an unlocked cosmic palette — comfortable in both Dark and Light mode.',
        badges_modal_title: 'MASTERY BADGES',
        badges_modal_subtitle: 'Reach gameplay milestones to unlock all 6 cosmic badges.',
        stats_modal_title: 'LIFETIME STATISTICS',
        stats_modal_subtitle: 'Your long-term progress and achievements saved locally.',
        stat_total_fusions: 'TOTAL FUSIONS',
        stat_max_combo: 'MAX COMBO',
        stat_max_focus: 'MAX FOCUS SCORE',
        stat_total_time: 'TOTAL PLAY TIME',
        stat_total_runs: 'TOTAL MISSIONS',
        stat_perfect_hits: 'PERFECT HITS',
        badge_unlocked: 'UNLOCKED',
        badge_locked: 'LOCKED',
        theme_active: 'ACTIVE',
        theme_unlocked: 'UNLOCKED',
        theme_locked: 'LOCKED',
        theme_available_desc: 'Visually balanced palette ready to use',
        theme_req_prefix: 'Requires:',
        theme_btn_active: 'ACTIVE IN GAME',
        theme_btn_apply: 'APPLY THEME',
        theme_btn_locked: 'LOCKED',
        toast_badge_unlocked: 'Badge Unlocked!',
        toast_theme_unlocked: 'Cosmic Theme Unlocked!',
        float_perfect: 'Perfect!',
        float_prism: '★ PRISM',
        float_chrono: '⏳ CHRONO',
        float_fusion: 'FUSION',
        float_supernova: 'SUPERNOVA',
        float_mismatch: 'MISMATCH',
        float_zen_deflect: 'DEFLECT',
        sector_1: 'Calm Orbit',
        sector_2: 'Solar Wind',
        sector_3: 'Nebula Vortex',
        sector_4: 'Quantum Pulsar',
        sector_5: 'Stellar Storm',
        sector_inf: 'Endless Horizon ∞'
    }
};

function t(key) {
    const dict = I18N[currentLang] || I18N.ro;
    return dict[key] !== undefined ? dict[key] : (I18N.ro[key] || key);
}

function getSectorName(lvl) {
    if (lvl <= 2) return t('sector_1');
    if (lvl <= 4) return t('sector_2');
    if (lvl <= 6) return t('sector_3');
    if (lvl <= 9) return t('sector_4');
    if (lvl <= 13) return t('sector_5');
    return t('sector_inf');
}

const COSMIC_THEMES = {
    cyber_neon: {
        id: 'cyber_neon',
        name: 'Cyber Neon',
        desc: 'Deblocat implicit (Clasic)',
        descEn: 'Unlocked by default (Classic Dark)',
        unlockedByDefault: true,
        isLight: false,
        colors: [
            { name: 'Plasmă Cyan', hex: '#22d3ee', glow: 'rgba(34, 211, 238, 0.55)' },
            { name: 'Impuls Neon', hex: '#f43f85', glow: 'rgba(244, 63, 133, 0.55)' },
            { name: 'Frecvență Solară', hex: '#fbbf24', glow: 'rgba(251, 191, 36, 0.55)' },
            { name: 'Aură Cuantică', hex: '#34d399', glow: 'rgba(52, 211, 153, 0.55)' },
            { name: 'Flux Gravitațional', hex: '#a78bfa', glow: 'rgba(167, 139, 250, 0.55)' },
            { name: 'Nucleu Supernovă', hex: '#f8fafc', glow: 'rgba(248, 250, 252, 0.8)' }
        ],
        canvasStyles: {
            bgGradient: ['#0d1326', '#050711'],
            gridColor: 'rgba(148, 163, 184, 0.042)',
            coreFill: '#050814',
            coreStroke: '#6366f1',
            canvasBg: 'rgba(6, 9, 19, 0.35)',
            starColor: '#e2e8f0'
        },
        cssVars: {
            '--bg-color': '#060913',
            '--panel-bg': 'rgba(13, 19, 36, 0.82)',
            '--cyan': '#22d3ee',
            '--magenta': '#f43f85',
            '--yellow': '#fbbf24',
            '--green': '#34d399',
            '--purple': '#a78bfa'
        },
        unlockCheck: () => true
    },
    solar_flare: {
        id: 'solar_flare',
        name: 'Solar Flare',
        desc: 'Atinge un Combo x5',
        descEn: 'Reach a x5 Combo streak',
        unlockedByDefault: false,
        isLight: false,
        colors: [
            { name: 'Chihlimbar Solar', hex: '#fb923c', glow: 'rgba(251, 146, 60, 0.55)' },
            { name: 'Coral Incandescent', hex: '#f43f5e', glow: 'rgba(244, 63, 94, 0.55)' },
            { name: 'Aur Plasmatic', hex: '#facc15', glow: 'rgba(250, 204, 21, 0.55)' },
            { name: 'Turcoaz Coronar', hex: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.55)' },
            { name: 'Gigantă Violet', hex: '#c084fc', glow: 'rgba(192, 132, 252, 0.55)' },
            { name: 'Nucleu Radiant', hex: '#fffbeb', glow: 'rgba(255, 251, 235, 0.85)' }
        ],
        canvasStyles: {
            bgGradient: ['#23100b', '#090302'],
            gridColor: 'rgba(251, 146, 60, 0.045)',
            coreFill: '#0c0402',
            coreStroke: '#fb923c',
            canvasBg: 'rgba(18, 6, 3, 0.35)',
            starColor: '#fde68a'
        },
        cssVars: {
            '--bg-color': '#090302',
            '--panel-bg': 'rgba(26, 11, 8, 0.82)',
            '--cyan': '#fb923c',
            '--magenta': '#f43f5e',
            '--yellow': '#facc15',
            '--green': '#2dd4bf',
            '--purple': '#c084fc'
        },
        unlockCheck: (stats, run) => (stats.highestCombo >= 5 || (run && run.maxCombo >= 5))
    },
    deep_nebula: {
        id: 'deep_nebula',
        name: 'Deep Nebula',
        desc: '10 min Zen sau 50 fuziuni',
        descEn: '10 min Zen play or 50 fusions',
        unlockedByDefault: false,
        isLight: false,
        colors: [
            { name: 'Teal Cosmic', hex: '#38bdf8', glow: 'rgba(56, 189, 248, 0.55)' },
            { name: 'Indigo Nebular', hex: '#818cf8', glow: 'rgba(129, 140, 248, 0.55)' },
            { name: 'Aură Violetă', hex: '#e879f9', glow: 'rgba(232, 121, 249, 0.55)' },
            { name: 'Safir Mentă', hex: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.55)' },
            { name: 'Stelar Coral', hex: '#fb7185', glow: 'rgba(251, 113, 133, 0.55)' },
            { name: 'Perlă Astrală', hex: '#f8fafc', glow: 'rgba(248, 250, 252, 0.85)' }
        ],
        canvasStyles: {
            bgGradient: ['#09152b', '#030712'],
            gridColor: 'rgba(129, 140, 248, 0.048)',
            coreFill: '#030712',
            coreStroke: '#818cf8',
            canvasBg: 'rgba(4, 10, 24, 0.35)',
            starColor: '#cbd5e1'
        },
        cssVars: {
            '--bg-color': '#030712',
            '--panel-bg': 'rgba(10, 19, 38, 0.82)',
            '--cyan': '#38bdf8',
            '--magenta': '#e879f9',
            '--yellow': '#2dd4bf',
            '--green': '#818cf8',
            '--purple': '#fb7185'
        },
        unlockCheck: (stats, run) => (stats.totalFusions >= 50 || stats.totalPlayTimeSeconds >= 600 || stats.zenPlayTimeSeconds >= 600)
    },
    dark_void: {
        id: 'dark_void',
        name: 'Dark Void',
        desc: 'Atinge Nivel 5 sau 100 fuziuni',
        descEn: 'Reach Level 5 or 100 fusions',
        unlockedByDefault: false,
        isLight: false,
        colors: [
            { name: 'Orizont Azur', hex: '#60a5fa', glow: 'rgba(96, 165, 250, 0.55)' },
            { name: 'Orizont Violet', hex: '#a78bfa', glow: 'rgba(167, 139, 250, 0.55)' },
            { name: 'Crimson Abisal', hex: '#f87171', glow: 'rgba(248, 113, 113, 0.55)' },
            { name: 'Aur de Eclipsă', hex: '#fbbf24', glow: 'rgba(251, 191, 36, 0.55)' },
            { name: 'Plasmă Smarald', hex: '#34d399', glow: 'rgba(52, 211, 153, 0.55)' },
            { name: 'Singularitate', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.9)' }
        ],
        canvasStyles: {
            bgGradient: ['#0b0d14', '#020305'],
            gridColor: 'rgba(255, 255, 255, 0.032)',
            coreFill: '#020305',
            coreStroke: '#a78bfa',
            canvasBg: 'rgba(4, 5, 8, 0.4)',
            starColor: '#94a3b8'
        },
        cssVars: {
            '--bg-color': '#020305',
            '--panel-bg': 'rgba(14, 16, 24, 0.85)',
            '--cyan': '#60a5fa',
            '--magenta': '#f87171',
            '--yellow': '#fbbf24',
            '--green': '#34d399',
            '--purple': '#a78bfa'
        },
        unlockCheck: (stats, run) => (stats.totalFusions >= 100 || (run && run.level && run.level >= 5))
    },
    light_ether: {
        id: 'light_ether',
        name: 'Light Ether',
        desc: 'Luminoasă • disponibilă tuturor',
        descEn: 'Daylight Mode • unlocked for everyone',
        unlockedByDefault: true,
        isLight: true,
        colors: [
            { name: 'Eter Cyan', hex: '#0284c7', glow: 'rgba(2, 132, 199, 0.45)' },
            { name: 'Sky Magenta', hex: '#db2777', glow: 'rgba(219, 39, 119, 0.45)' },
            { name: 'Chihlimbar Pur', hex: '#b45309', glow: 'rgba(180, 83, 9, 0.45)' },
            { name: 'Smarald Eteric', hex: '#047857', glow: 'rgba(4, 120, 87, 0.45)' },
            { name: 'Liliac Suav', hex: '#7c3aed', glow: 'rgba(124, 58, 237, 0.45)' },
            { name: 'Nucleu Astral', hex: '#1e293b', glow: 'rgba(30, 41, 59, 0.45)' }
        ],
        canvasStyles: {
            bgGradient: ['#f8fafc', '#e2eaf5'],
            gridColor: 'rgba(15, 23, 42, 0.045)',
            coreFill: '#eef2ff',
            coreStroke: '#6366f1',
            canvasBg: 'rgba(241, 245, 249, 0.38)',
            starColor: 'rgba(51, 65, 85, 0.24)'
        },
        cssVars: {
            '--bg-color': '#eef3f9',
            '--panel-bg': 'rgba(255, 255, 255, 0.90)',
            '--cyan': '#0284c7',
            '--magenta': '#db2777',
            '--yellow': '#b45309',
            '--green': '#047857',
            '--purple': '#7c3aed'
        },
        unlockCheck: () => true
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
        descEn: 'Reach a x5 combo streak during a mission.',
        check: (stats, run) => stats.highestCombo >= 5 || (run && run.maxCombo >= 5)
    },
    precision_rotator: {
        id: 'precision_rotator',
        name: 'Precision Rotator',
        icon: '🎯',
        desc: 'Realizează 5 lovituri perfecte (Perfect Hits) în centru.',
        descEn: 'Land 5 central Perfect Hits.',
        check: (stats, run) => stats.perfectHitsCount >= 5
    },
    mindful_gamer: {
        id: 'mindful_gamer',
        name: 'Mindful Gamer',
        icon: '🧘',
        desc: 'Acumulează 10 minute (600 sec) de joc Zen sau concentrat.',
        descEn: 'Accumulate 10 minutes (600s) of Zen or focused play.',
        check: (stats, run) => stats.totalPlayTimeSeconds >= 600 || stats.zenPlayTimeSeconds >= 600
    },
    fusion_master: {
        id: 'fusion_master',
        name: 'Fusion Master',
        icon: '💥',
        desc: 'Realizează 50 de fuziuni de scut în total.',
        descEn: 'Complete 50 total shield fusions.',
        check: (stats, run) => stats.totalFusions >= 50
    },
    cosmic_explorer: {
        id: 'cosmic_explorer',
        name: 'Cosmic Explorer',
        icon: '🌌',
        desc: 'Deblochează cel puțin 3 Teme Cosmice.',
        descEn: 'Unlock at least 3 Cosmic Themes.',
        check: (stats, run, unlockedThemesList) => (unlockedThemesList || unlockedThemes).length >= 3
    },
    focus_guru: {
        id: 'focus_guru',
        name: 'Focus Guru',
        icon: '🧠',
        desc: 'Obține un scor înalt de concentrare (Focus Score >= 85).',
        descEn: 'Achieve a high Focus Score (>= 85).',
        check: (stats, run) => stats.highestFocusScore >= 85
    }
};

let COLORS = COSMIC_THEMES.cyber_neon.colors;
let currentTheme = 'cyber_neon';
function isLightTheme() {
    return currentTheme === 'light_ether' || Boolean(COSMIC_THEMES[currentTheme] && COSMIC_THEMES[currentTheme].isLight);
}
let lastDarkTheme = 'cyber_neon';

function isLightTheme(themeName = currentTheme) {
    return themeName === 'light' || themeName === 'light_ether' || Boolean(COSMIC_THEMES[themeName] && COSMIC_THEMES[themeName].isLight);
}

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

let unlockedThemes = ['cyber_neon', 'light_ether'];
function loadUnlockedThemes() {
    try {
        const raw = localStorage.getItem('orbit_fusion_unlocked_themes');
        if (raw) {
            unlockedThemes = JSON.parse(raw);
            if (!unlockedThemes.includes('cyber_neon')) {
                unlockedThemes.push('cyber_neon');
            }
            if (!unlockedThemes.includes('light_ether')) {
                unlockedThemes.push('light_ether');
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
                showToastNotification(badge.icon, badge.name, t('toast_badge_unlocked'));
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
                showToastNotification("🎨", theme.name, t('toast_theme_unlocked'));
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
            showToastNotification(badge.icon, badge.name, t('toast_badge_unlocked'));
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

function updateThemeModeButtonsUI() {
    const startModeBtn = document.getElementById('start-theme-mode-btn');
    if (startModeBtn) {
        const isLight = isLightTheme();
        if (currentLang === 'en') {
            startModeBtn.textContent = isLight ? '☀️ Light' : '🌙 Dark';
        } else {
            startModeBtn.textContent = isLight ? '☀️ Luminos' : '🌙 Întunecat';
        }
        startModeBtn.setAttribute('aria-label', t('aria_theme_toggle'));
    }
}

function applyTheme(themeName, persist = true) {
    if (!COSMIC_THEMES[themeName]) {
        themeName = themeName === 'light' ? 'light_ether' : 'cyber_neon';
    }
    
    // Fallback if locked
    if (!unlockedThemes.includes(themeName) && !COSMIC_THEMES[themeName].unlockedByDefault) {
        themeName = 'cyber_neon';
    }

    if (!isLightTheme(themeName)) {
        lastDarkTheme = themeName;
    }

    document.documentElement.style.colorScheme = themeName === 'light_ether' ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]').content = COSMIC_THEMES[themeName].cssVars['--bg-color'];
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

    updateThemeModeButtonsUI();

    try {
        if (persist) localStorage.setItem('orbit_fusion_theme', themeName);
    } catch (err) {
        console.warn("Could not save theme to localStorage", err);
    }

    cachedBgGradient = null;
    if (typeof initOrbCache === 'function') initOrbCache();
    if (typeof initCoreGrad === 'function') initCoreGrad();
    if (typeof initStars === 'function') initStars();
    if (typeof initNebulae === 'function') initNebulae();
}

function toggleDarkLightMode() {
    const nextTheme = isLightTheme() ? (lastDarkTheme || 'cyber_neon') : 'light_ether';
    applyTheme(nextTheme, true);
    renderThemesGrid();
}

function renderBadgesGrid() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    grid.innerHTML = '';
    Object.keys(SKILL_BADGES).forEach(badgeId => {
        const badge = SKILL_BADGES[badgeId];
        const isUnlocked = unlockedBadges.includes(badgeId);
        const badgeDesc = currentLang === 'en' ? (badge.descEn || badge.desc) : badge.desc;
        
        const card = document.createElement('div');
        card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
            <div class="badge-card-icon">${badge.icon}</div>
            <div class="badge-card-info">
                <span class="badge-card-name">${badge.name}</span>
                <span class="badge-card-desc">${badgeDesc}</span>
                <span class="badge-card-status">${isUnlocked ? t('badge_unlocked') : t('badge_locked')}</span>
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
        const reqText = currentLang === 'en' ? (theme.descEn || theme.desc) : theme.desc;

        const card = document.createElement('div');
        card.className = `theme-card ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        const swatchesHtml = theme.colors.slice(0, 5).map(c => `<span class="swatch" style="background-color:${c.hex}"></span>`).join('');
        
        card.innerHTML = `
            <div class="theme-card-header">
                <span class="theme-card-title">${theme.name}</span>
                <span class="theme-card-badge">${isActive ? t('theme_active') : (isUnlocked ? t('theme_unlocked') : t('theme_locked'))}</span>
            </div>
            <div class="theme-swatches">${swatchesHtml}</div>
            <div class="theme-card-desc">${isUnlocked ? t('theme_available_desc') : `${t('theme_req_prefix')} ${reqText}`}</div>
            <button class="theme-select-btn" ${!isUnlocked ? 'disabled' : ''}>
                ${isActive ? t('theme_btn_active') : (isUnlocked ? t('theme_btn_apply') : t('theme_btn_locked'))}
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

function applyLanguage(lang, persist = true) {
    currentLang = lang === 'en' ? 'en' : 'ro';
    document.documentElement.lang = currentLang;
    document.title = t('page_title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('page_desc'));

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (key) el.innerHTML = t(key);
    });

    const stabLabel = document.querySelector('[data-i18n="hud_stability"]');
    if (stabLabel) stabLabel.setAttribute('data-short', t('hud_stability_short'));
    const timeLabel = document.querySelector('[data-i18n="hud_session_time"]');
    if (timeLabel) timeLabel.setAttribute('data-short', t('hud_session_short'));

    const canvasEl = document.getElementById('game-canvas');
    if (canvasEl) canvasEl.setAttribute('aria-label', t('canvas_aria'));
    const hudEl = document.getElementById('hud');
    if (hudEl) hudEl.setAttribute('aria-label', t('hud_aria'));
    const touchEl = document.getElementById('touch-controls');
    if (touchEl) touchEl.setAttribute('aria-label', t('touch_controls_aria'));
    const leftBtn = document.getElementById('rotate-left-btn');
    if (leftBtn) leftBtn.setAttribute('aria-label', t('touch_left_aria'));
    const rightBtn = document.getElementById('rotate-right-btn');
    if (rightBtn) rightBtn.setAttribute('aria-label', t('touch_right_aria'));

    const hudLangBtn = document.getElementById('hud-lang-toggle');
    if (hudLangBtn) {
        hudLangBtn.textContent = currentLang.toUpperCase();
        hudLangBtn.setAttribute('aria-label', t('aria_lang_toggle'));
    }
    const startLangBtn = document.getElementById('start-lang-btn');
    if (startLangBtn) {
        startLangBtn.textContent = currentLang === 'ro' ? '🌐 RO · EN' : '🌐 EN · RO';
        startLangBtn.setAttribute('aria-label', t('aria_lang_toggle'));
    }
    const pauseLangBtn = document.getElementById('lang-toggle-btn');
    if (pauseLangBtn) {
        pauseLangBtn.textContent = t('set_lang_val');
        pauseLangBtn.setAttribute('aria-label', t('aria_lang_toggle'));
    }

    const pauseBtn = document.getElementById('pause-toggle');
    if (pauseBtn) pauseBtn.setAttribute('aria-label', t('aria_pause_toggle'));
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn && typeof soundManager !== 'undefined') {
        soundBtn.setAttribute('aria-label', soundManager.muted ? t('aria_sound_on') : t('aria_sound_off'));
    }

    document.querySelectorAll('.music-volume').forEach(inp => {
        inp.setAttribute('aria-label', t('music_aria'));
    });

    updateThemeModeButtonsUI();
    if (typeof updateShakeButtonUI === 'function') updateShakeButtonUI();
    if (typeof updateColorMarkersToggle === 'function') updateColorMarkersToggle();
    if (typeof setGameMode === 'function' && typeof gameMode !== 'undefined') setGameMode(gameMode);
    if (typeof updateHistoryUI === 'function') updateHistoryUI();
    if (typeof updateHUD === 'function' && typeof segments !== 'undefined' && segments.length > 0) updateHUD();
    renderBadgesGrid();
    renderThemesGrid();
    renderStatsModal();

    if (persist) {
        try {
            localStorage.setItem('orbit_fusion_lang', currentLang);
        } catch (_) {}
    }
}

function toggleLanguage() {
    const nextLang = currentLang === 'ro' ? 'en' : 'ro';
    applyLanguage(nextLang, true);
}

let modalReturnState = null;
let lastFocusedElement = null;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'badges-modal') renderBadgesGrid();
        if (modalId === 'stats-modal') renderStatsModal();
        if (modalId === 'theme-modal') renderThemesGrid();

        modalReturnState = gameState;
        lastFocusedElement = document.activeElement;
        if (gameState === 'playing') {
            gameState = 'paused';
        }

        const hud = document.getElementById('hud');
        if (hud) hud.classList.add('hidden');
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');

        requestAnimationFrame(() => {
            const focusTarget = modal.querySelector('.close-btn, .modal-panel');
            if (focusTarget) focusTarget.focus();
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');

        if (modalReturnState === 'playing') {
            gameState = 'playing';
            lastTime = performance.now();
            const hud = document.getElementById('hud');
            if (hud) hud.classList.remove('hidden');
        }

        if (lastFocusedElement && lastFocusedElement.isConnected) {
            lastFocusedElement.focus();
        }
        modalReturnState = null;
        lastFocusedElement = null;
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
        if (this.ctx) { this.ctx.resume().catch(() => {}); return; }
        try {
            // Create audio context
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.ctx.resume().catch(() => {});
            startAmbientMusic(this);
        } catch (e) {
            console.error("Web Audio API is not supported in this browser", e);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        const icon = document.getElementById('sound-icon');
        const button = document.getElementById('sound-toggle');
        if (this.muted) {
            // Change SVG to Mute icon
            icon.innerHTML = '<path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M19,12C19,11.05 18.7,10.19 18.19,9.5L19.64,8.05C20.5,9.19 21,10.53 21,12C21,16.28 18.07,19.86 14,20.77V18.71C16.89,17.85 19,15.17 19,12M3,2.27L1.86,3.41L5.89,7.44L3,9H7L12,4V9.56L14,11.56V7.97C15.5,8.71 16.5,10.23 16.5,12C16.5,12.7 16.32,13.36 16,13.93L17.5,15.43C18.1,14.43 18.5,13.26 18.5,12A6.5,6.5 0 0,0 12,5.5V3.23C16.07,4.14 19,7.72 19,12C19,12.87 18.84,13.72 18.54,14.5L19.98,15.94C20.63,14.77 21,13.43 21,12C21,7.72 18.07,4.14 14,3.23V5.5L16.5,8M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.52C15.58,18.04 14.83,18.44 14,18.71V20.77C15.38,20.44 16.63,19.79 17.69,18.96L19.73,21L21,19.73L4.27,3Z"/>';
        } else {
            // Change SVG to Sound High icon
            icon.innerHTML = '<path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18.07,19.86 21,16.28 21,12C21,7.72 18.07,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.77 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>';
        }
        if (button) {
            button.setAttribute('aria-label', this.muted ? t('aria_sound_on') : t('aria_sound_off'));
            button.setAttribute('aria-pressed', this.muted ? 'true' : 'false');
        }
        if (this.musicBus) this.musicBus.gain.setTargetAtTime(this.muted ? 0 : ambientVolume, this.ctx.currentTime, 0.15);
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

    playPrism() {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5 major shimmer
        notes.forEach((freq, idx) => {
            this.playNote(freq, 'triangle', 0.4, 0.09, idx * 0.035);
        });
    }

    playChrono() {
        const notes = [587.33, 440.00, 329.63, 659.25];
        notes.forEach((freq, idx) => {
            this.playNote(freq, 'sine', 0.42, 0.09, idx * 0.05);
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

// Quiet, locally synthesized soundscape. A new tonal centre is chosen per load.
let ambientVolume = 0.22;
try {
    const storedVolume = localStorage.getItem('orbit_fusion_music_volume');
    if (storedVolume !== null && Number.isFinite(Number(storedVolume))) ambientVolume = Math.max(0, Math.min(1, Number(storedVolume)));
} catch (_) {}
const ambientRoot = [130.81, 146.83, 174.61, 196][Math.floor(Math.random() * 4)];
function startAmbientMusic(manager) {
    const audio = manager.ctx;
    const bus = audio.createGain();
    manager.musicBus = bus;
    bus.gain.value = manager.muted ? 0 : ambientVolume;
    bus.connect(audio.destination);
    function voice(frequency, start, duration, level) {
        const oscillator = audio.createOscillator();
        const envelope = audio.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        envelope.gain.setValueAtTime(0, start);
        envelope.gain.linearRampToValueAtTime(level, start + 1.5);
        envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        oscillator.connect(envelope);
        envelope.connect(bus);
        oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
        oscillator.start(start);
        oscillator.stop(start + duration);
    }
    function phrase() {
        if (audio.state !== 'running' || document.hidden) return;
        const now = audio.currentTime + 0.05;
        [1, 1.5, 2].forEach((ratio, i) => voice(ambientRoot * ratio, now + i * 0.4, 12, 0.045));
        const scale = [2, 2.25, 2.5, 3, 3.375];
        for (let i = 0; i < 3; i++) voice(ambientRoot * scale[Math.floor(Math.random() * scale.length)], now + i * 3, 5, 0.025);
    }
    phrase();
    manager.musicTimer = setInterval(phrase, 10000);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) audio.suspend().catch(() => {});
        else audio.resume().catch(() => {});
    });
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
let sessionElapsedSeconds = 0;
let runPlayTimeSeconds = 0;
let statsSaveAccumulator = 0;
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
let shakeSetting = 'off';
try {
    shakeSetting = localStorage.getItem('orbit_fusion_shake') || 'off';
} catch (e) {
    shakeSetting = 'off';
}

// Strict Memory Limit Caps (eliminates GC pressure & micro-stutters)
const MAX_PARTICLES = 250;
let maxParticles = MAX_PARTICLES;
const MAX_SHOCKWAVES = 20;
const MAX_FLOATING_TEXTS = 40;
const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

// High-Performance Offscreen Canvas & Gradient Caches for 60 FPS
let cachedBgGradient = null;
let orbCanvasCache = [];
let coreGlowGrad = null;

function hexToRgbComponents(hexStr) {
    const clean = (hexStr || '#22d3ee').replace('#', '');
    const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

function initOrbCache() {
    orbCanvasCache = [];
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth <= 800 ? 1.5 : 2);
    const orbSize = 7.5;
    const canvasSize = Math.ceil(orbSize * 4 * dpr);
    const center = canvasSize / 2;
    const drawRadius = orbSize * dpr;
    const lightMode = isLightTheme();

    COLORS.forEach((colorObj, idx) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = canvasSize;
        offCanvas.height = canvasSize;
        const offCtx = offCanvas.getContext('2d');
        const rgb = hexToRgbComponents(colorObj.hex);

        // Outer halo fades to same RGB with 0 alpha to avoid muddy dark halos in Light Mode
        const grad = offCtx.createRadialGradient(center, center, 0, center, center, drawRadius * 1.95);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(lightMode ? 0.38 : 0.32, colorObj.hex);
        grad.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lightMode ? 0.28 : 0.35})`);
        grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(center, center, drawRadius * 1.95, 0, Math.PI * 2);
        offCtx.fill();

        // Crisp inner sphere body for clear color legibility in both Light and Dark mode
        offCtx.beginPath();
        offCtx.arc(center, center, drawRadius * 0.82, 0, Math.PI * 2);
        offCtx.fillStyle = colorObj.hex;
        offCtx.fill();

        offCtx.beginPath();
        offCtx.arc(center - drawRadius * 0.2, center - drawRadius * 0.2, drawRadius * 0.32, 0, Math.PI * 2);
        offCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        offCtx.fill();

        orbCanvasCache[idx] = offCanvas;
    });
}

function initCoreGrad() {
    coreGlowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 64);
    if (isLightTheme()) {
        coreGlowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.22)');
        coreGlowGrad.addColorStop(0.55, 'rgba(14, 165, 233, 0.08)');
        coreGlowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    } else {
        coreGlowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.36)');
        coreGlowGrad.addColorStop(0.55, 'rgba(34, 211, 238, 0.12)');
        coreGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
}

// Touch Drag State
let isInputActive = false;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let lastTouchAngle = 0;

// Timing helper variables
let lastTime = 0;
let lastRenderTime = 0;
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
        toggleBtn.innerText = mode === 'zen' ? t('mode_zen_short') : t('mode_classic_short');
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
        phaseText.innerText = t('breath_inhale');
        outerRing.classList.add('inhale');
    } else if (phaseIndex === 1) {
        // Phase 2: Hold (4-8s) - Ring holds at 1.25 with subtle pulse
        scale = 1.25 + (Math.sin(Date.now() * 0.003) * 0.03);
        phaseText.innerText = t('breath_hold');
        outerRing.classList.add('hold');
    } else if (phaseIndex === 2) {
        // Phase 3: Exhale (8-12s) - Ring contracts smoothly 1.25 -> 0.75
        scale = 1.25 - (progressInPhase * 0.5);
        phaseText.innerText = t('breath_exhale');
        outerRing.classList.add('exhale');
    } else {
        // Phase 4: Rest (12-16s) - Ring rests at 0.75
        scale = 0.75 + (Math.sin(Date.now() * 0.003) * 0.02);
        phaseText.innerText = t('breath_rest');
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
        btn.innerText = t('shake_off');
    } else if (shakeSetting === 'medium') {
        btn.innerText = t('shake_medium');
    } else {
        btn.innerText = t('shake_intense');
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
    const minimumStars = width <= 800 ? 45 : 70;
    for (let i = 0; i < Math.max(minimumStars, count); i++) {
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
    const isLight = isLightTheme() || currentTheme === 'light_ether';
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
        grad.addColorStop(1, isLight ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0)');
        neb.cachedGrad = grad;
    });
}

function drawBackground() {
    const now = performance.now() * 0.001;

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
        const ox = Math.cos(neb.phase + now * neb.speed) * 40;
        const oy = Math.sin(neb.phase + now * neb.speed) * 40;
        
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
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(now * star.twinkleSpeed + star.phase) * 0.25);
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

// Optional numeric cues for players who have difficulty distinguishing colors.
let colorMarkersEnabled = false;
try { colorMarkersEnabled = localStorage.getItem('orbit_fusion_color_markers') === 'true'; } catch (_) {}

function drawOrbColorMarker(drawContext, x, y, colorIndex) {
    if (!colorMarkersEnabled) return;
    drawContext.save();
    drawContext.globalAlpha = 0.92;
    drawContext.shadowBlur = 0;
    drawContext.fillStyle = '#050508';
    drawContext.font = '800 7.5px "Plus Jakarta Sans", sans-serif';
    drawContext.textAlign = 'center';
    drawContext.textBaseline = 'middle';
    drawContext.fillText(String(colorIndex + 1), x, y);
    drawContext.restore();
}

function drawSegmentColorMarker(drawContext, x, y, colorIndex) {
    if (!colorMarkersEnabled) return;
    const isLight = isLightTheme() || currentTheme === 'light_ether';
    const segColor = (COLORS[colorIndex] && COLORS[colorIndex].hex) || '#22d3ee';
    drawContext.save();
    drawContext.globalAlpha = 0.92;
    drawContext.shadowBlur = 0;
    drawContext.setLineDash([]);
    drawContext.beginPath();
    drawContext.arc(x, y, 7, 0, Math.PI * 2);
    drawContext.fillStyle = isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(6, 9, 19, 0.90)';
    drawContext.fill();
    drawContext.lineWidth = 1.2;
    drawContext.strokeStyle = segColor;
    drawContext.stroke();
    drawContext.fillStyle = isLight ? '#0f172a' : '#f8fafc';
    drawContext.font = '800 8.5px "Plus Jakarta Sans", sans-serif';
    drawContext.textAlign = 'center';
    drawContext.textBaseline = 'middle';
    drawContext.fillText(String(colorIndex + 1), x, y);
    drawContext.restore();
}

class Orb {
    constructor(x, y, colorIndex, speed, type = 'normal') {
        this.x = x;
        this.y = y;
        this.colorIndex = colorIndex;
        this.speed = speed;
        this.type = type; // 'normal', 'prism' (wildcard), 'chrono' (slow-mo bonus)
        this.size = type === 'normal' ? 7.5 : 8.5;
        
        // Calculate initial distance and angle from center
        this.distance = Math.hypot(x, y);
        this.spawnDistance = this.distance || 400;
        this.angle = Math.atan2(y, x);
        
        // Smooth orbital curve scaling gently with level so higher levels feel more dynamic
        const curveScale = Math.min(0.32, 0.08 + Math.max(0, level - 1) * 0.018);
        this.curveSpeed = (Math.random() - 0.5) * curveScale;
    }

    update(dt) {
        // Gravitational acceleration curve as orb approaches center core (respects active Chrono field)
        const distRatio = 1.0 - Math.min(1.0, this.distance / this.spawnDistance);
        const chronoMult = (typeof chronoTimer !== 'undefined' && chronoTimer > 0) ? 0.62 : 1.0;
        const currentSpeed = this.speed * (1 + distRatio * 0.30) * chronoMult;

        // Move towards center
        this.distance -= currentSpeed * dt;
        
        // Slightly spiral inward
        this.angle += this.curveSpeed * chronoMult * dt;
        
        // Recalculate Cartesian coordinates
        this.x = Math.cos(this.angle) * this.distance;
        this.y = Math.sin(this.angle) * this.distance;

        // Leave glowing trail particles
        const trailChance = Math.min(1, dt * 27); // Same visual density at 60/90/120 Hz.
        if (Math.random() < trailChance && particles.length < maxParticles) {
            const pColor = this.type === 'prism'
                ? COLORS[Math.floor(Math.random() * (COLORS.length - 1))].hex
                : (COLORS[this.colorIndex] ? COLORS[this.colorIndex].hex : '#22d3ee');
            particles.push(new Particle(
                this.x, 
                this.y, 
                (Math.random() - 0.5) * 12, 
                (Math.random() - 0.5) * 12, 
                pColor, 
                0.65, 
                Math.random() * 2.5 + 1.5,
                0.6
            ));
        }
    }

    draw(ctx) {
        if (this.type === 'prism') {
            const cycleIdx = Math.floor(performance.now() * 0.008) % (COLORS.length - 1);
            if (orbCanvasCache[cycleIdx]) {
                const renderSize = this.size * 4.2;
                ctx.drawImage(orbCanvasCache[cycleIdx], this.x - renderSize / 2, this.y - renderSize / 2, renderSize, renderSize);
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 3, 0, Math.PI * 2);
            ctx.strokeStyle = isLightTheme() ? '#d97706' : '#fde047';
            ctx.lineWidth = 1.8;
            ctx.stroke();
            ctx.fillStyle = isLightTheme() ? '#0f172a' : '#ffffff';
            ctx.font = '800 9px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('★', this.x, this.y + 0.5);
            ctx.restore();
            return;
        }

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

        if (this.type === 'chrono') {
            ctx.save();
            const pulseR = this.size + 3.5 + Math.sin(performance.now() * 0.01) * 1.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, pulseR, 0, Math.PI * 2);
            ctx.strokeStyle = isLightTheme() ? '#0284c7' : '#67e8f9';
            ctx.lineWidth = 1.6;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.restore();
        }

        drawOrbColorMarker(ctx, this.x, this.y, this.colorIndex);
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
        ctx.shadowBlur = 6;
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
        ctx.shadowBlur = 11;
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
        this.vy = -52; // pixels per second up
    }

    update(dt) {
        this.y += this.vy * dt;
        this.alpha -= 0.95 * dt;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        const light = isLightTheme();
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.font = '700 15px "Plus Jakarta Sans", "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.lineWidth = 3;
        ctx.strokeStyle = light ? 'rgba(255, 255, 255, 0.92)' : 'rgba(6, 9, 19, 0.88)';
        ctx.strokeText(this.text, this.x, this.y);
        ctx.fillStyle = this.color || (light ? '#0f172a' : '#f8fafc');
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// ==========================================================================
// 5. INIȚIALIZARE JOC & LOGICĂ RESTART
// ==========================================================================

// Endless Progression & Special Field Timers
let chronoTimer = 0;
let levelUpGraceTimer = 0;
let lastSpawnAngle = null;
let waveOrbCounter = 0;

function initGame(trackRun = true) {
    score = 0;
    level = 1;
    xp = 0;
    xpNeeded = 140;
    stability = 100;
    hexAngle = 0;
    hexTargetSpeed = 0;
    hexCurrentSpeed = 0;
    orbSpawnRateModifier = 1.0;
    screenShake = 0;
    chronoTimer = 0;
    levelUpGraceTimer = 0;
    lastSpawnAngle = null;
    waveOrbCounter = 0;

    // Reset Run Mastery Metrics
    runSuccessfulMatches = 0;
    runTotalImpacts = 0;
    runTotalFusions = 0;
    runMaxCombo = 1;
    runPlayTimeSeconds = 0;
    statsSaveAccumulator = 0;

    // Increment Lifetime Runs
    if (trackRun) {
        lifetimeStats.totalRuns++;
        saveLifetimeStats();
        checkBadgesAndThemes();
    }

    resetCombo();
    updateShakeButtonUI();

    orbs = [];
    particles = [];
    shockwaves = [];
    floatingTexts = [];
    
    // Initialize 6 segments of the hexagon with a solvable, balanced starting pattern
    segments = [];
    for (let i = 0; i < 6; i++) {
        segments.push({
            colorIndex: i % 2 === 0 ? 0 : 1,
            health: 1.0,
            pulse: 1.0
        });
    }

    updateHUD();
    const highBadge = document.getElementById('new-high-score-badge');
    if (highBadge) highBadge.classList.add('hidden');
}

function updateHUD() {
    const scoreEl = document.getElementById('score-val');
    const levelEl = document.getElementById('level-val');
    const sectorEl = document.getElementById('sector-badge');
    if (scoreEl) scoreEl.innerText = score;
    if (levelEl) levelEl.innerText = level;
    if (sectorEl) sectorEl.innerText = `S${level} · ∞`;
    
    // XP progress
    const xpPercent = Math.min(100, (xp / xpNeeded) * 100);
    const xpFill = document.getElementById('xp-bar-fill');
    if (xpFill) xpFill.style.width = `${xpPercent}%`;
    
    // Stability progress
    const stabVal = document.getElementById('stability-val');
    if (stabVal) stabVal.innerText = `${Math.ceil(stability)}%`;
    const stabBar = document.getElementById('stability-bar-fill');
    if (stabBar) {
        stabBar.style.width = `${stability}%`;
        if (stability <= STABILITY_CRITICAL_THRESHOLD) {
            stabBar.classList.add('critical');
        } else {
            stabBar.classList.remove('critical');
        }
    }
}

// ==========================================================================
// 6. DETECTARE COLIZIUNI & MOTORUL DE FUZIUNE (FUSION ENGINE)
// ==========================================================================

function checkCollisions() {
    const checkRadiusMin = hexRadius - 11;
    const checkRadiusMax = hexRadius + 11;

    for (let i = orbs.length - 1; i >= 0; i--) {
        const orb = orbs[i];
        
        // If orb reaches the hexagon boundary
        if (orb.distance >= checkRadiusMin && orb.distance <= checkRadiusMax) {
            let relAngle = (orb.angle - hexAngle) % (Math.PI * 2);
            if (relAngle < 0) relAngle += Math.PI * 2;

            // 6 segments, each spans 60 degrees (PI / 3 radians)
            const segmentIndex = Math.floor(relAngle / (Math.PI / 3)) % 6;
            
            handleOrbImpact(orb, segmentIndex, i);
        } 
        // If the orb bypasses the shield completely and hits the central core
        else if (orb.distance < 20) {
            damageCore(10);
            createCoreDamageParticles();
            orbs.splice(i, 1);
        }
    }
    realignOrbColors();
}

function realignOrbColors() {
    if (orbs.length === 0) return;
    
    // Unique active colors on segments (excluding temporary Supernova index 5)
    const activeColors = [...new Set(segments.map(s => s.colorIndex).filter(c => c < COLORS.length - 1))];
    const usableColors = activeColors.length > 0 ? activeColors : [0];

    orbs.forEach(orb => {
        if (orb.type === 'prism') return; // Wildcard prism orb matches any side
        if (!usableColors.includes(orb.colorIndex)) {
            const newColorIndex = usableColors[Math.floor(Math.random() * usableColors.length)];
            orb.colorIndex = newColorIndex;
            
            for (let k = 0; k < 6; k++) {
                if (particles.length >= maxParticles) break;
                const angle = Math.random() * Math.PI * 2;
                const sp = 20 + Math.random() * 45;
                particles.push(new Particle(
                    orb.x, 
                    orb.y, 
                    Math.cos(angle) * sp, 
                    Math.sin(angle) * sp, 
                    COLORS[newColorIndex].hex, 
                    0.75, 
                    2.8,
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
    
    // Within 0.10 rad (~5.7 deg) of segment center is a Perfect central hit!
    const isPerfect = angleOffset < 0.10;
    const isPrism = orb.type === 'prism';
    const isMatch = isPrism || (segment.colorIndex === orb.colorIndex);

    if (isMatch) {
        // MATCH! Color matches (or Prismatic Wildcard) - extend combo streak
        runSuccessfulMatches++;
        registerComboHit(isPrism ? 2 : 1);

        const matchedColorHex = COLORS[segment.colorIndex] ? COLORS[segment.colorIndex].hex : COLORS[0].hex;

        // Level up the segment & restore shield integrity for endless play sustainability
        segment.colorIndex = Math.min(COLORS.length - 1, segment.colorIndex + 1);
        segment.health = isPerfect || isPrism ? 1.0 : Math.min(1.0, segment.health + 0.22);
        stability = Math.min(100, stability + (isPrism ? 8 : (isPerfect ? 3.5 : 1.5)));
        
        // Calculate points scaled by combo multiplier
        const basePoints = (isPrism ? 25 : 10) * level;
        const perfectBonus = isPerfect ? 50 * level : 0;
        const points = (basePoints + perfectBonus) * comboMultiplier;
        score += points;
        
        // Float text
        const px = Math.cos(orb.angle) * hexRadius;
        const py = Math.sin(orb.angle) * hexRadius;
        let textLabel = isPerfect ? `+${points} ${t('float_perfect')}` : `+${points}`;
        let textColor = isPerfect ? (isLightTheme() ? '#d97706' : '#fbbf24') : matchedColorHex;

        if (isPrism) {
            textLabel = `${t('float_prism')} +${points}!`;
            textColor = isLightTheme() ? '#d97706' : '#fde047';
            soundManager.playPrism();
        } else if (orb.type === 'chrono') {
            chronoTimer = 4.2;
            stability = Math.min(100, stability + 4);
            textLabel = `${t('float_chrono')} +${points}!`;
            textColor = isLightTheme() ? '#0284c7' : '#67e8f9';
            soundManager.playChrono();
        }

        floatingTexts.push(new FloatingText(px, py, textLabel, textColor));
        
        if (isPerfect) {
            if (!isPrism && orb.type !== 'chrono') soundManager.playPerfect();
            lifetimeStats.perfectHitsCount++;
            saveLifetimeStats();
            checkBadgesAndThemes();
            for (let k = 0; k < 18; k++) {
                if (particles.length >= maxParticles) break;
                const angle = Math.random() * Math.PI * 2;
                const sp = 80 + Math.random() * 120;
                particles.push(new Particle(
                    orb.x, 
                    orb.y, 
                    Math.cos(angle) * sp, 
                    Math.sin(angle) * sp, 
                    Math.random() < 0.5 ? '#fbbf24' : matchedColorHex, 
                    0.95, 
                    Math.random() * 3 + 2,
                    0.9
                ));
            }
        } else {
            if (!isPrism && orb.type !== 'chrono') soundManager.playMatch(comboMultiplier);
            for (let k = 0; k < 12; k++) {
                if (particles.length >= maxParticles) break;
                const angle = orb.angle + (Math.random() - 0.5) * 0.8;
                const sp = 60 + Math.random() * 80;
                particles.push(new Particle(
                    orb.x, 
                    orb.y, 
                    -Math.cos(angle) * sp, 
                    -Math.sin(angle) * sp, 
                    matchedColorHex, 
                    0.8, 
                    3
                ));
            }
        }

        // Add XP
        addXP(isPerfect || isPrism ? 16 : 11);
        
        // Check for adjacent color fusions
        checkFusions(segIdx);

        // Ensure a segment reaching Supernova (index 5) by direct upgrade also triggers Nova Blast
        // so no segment can ever get deadlocked at COLORS.length - 1!
        if (segments[segIdx] && segments[segIdx].colorIndex >= COLORS.length - 1) {
            triggerNovaBlast(segIdx);
        }

        // Remove orb
        orbs.splice(orbIdx, 1);
    } else {
        // MISMATCH! Wrong color
        soundManager.playError();
        const px = Math.cos(orb.angle) * hexRadius;
        const py = Math.sin(orb.angle) * hexRadius;

        if (gameMode === 'zen') {
            // Gentle deflection in Zen mode without harsh penalties
            segment.pulse = 0.92;
            floatingTexts.push(new FloatingText(px, py, t('float_zen_deflect'), isLightTheme() ? '#64748b' : '#94a3b8'));
            orbs.splice(orbIdx, 1);
            updateHUD();
            return;
        }

        resetCombo();
        screenShake = 14;
        
        // Reduce segment health
        segment.health -= 0.32;
        segment.pulse = 0.82;
        
        // Apply damage to overall stability
        if (segment.health <= 0) {
            segment.health = 0.15; // Keep segment visible as dashed rather than 0
            damageCore(12);
        } else {
            damageCore(5);
        }

        const errColor = isLightTheme() ? '#dc2626' : '#f87171';
        for (let k = 0; k < 8; k++) {
            if (particles.length >= maxParticles) break;
            particles.push(new Particle(
                orb.x, 
                orb.y, 
                (Math.random() - 0.5) * 120, 
                (Math.random() - 0.5) * 120, 
                errColor, 
                0.9, 
                3.5, 
                1.8
            ));
        }

        floatingTexts.push(new FloatingText(px, py, t('float_mismatch'), errColor));
        orbs.splice(orbIdx, 1);
    }
    
    updateHUD();
}

function checkFusions(originIdx) {
    let checkAgain = true;
    let iterations = 0;

    // Run iterative merging to handle chain reactions
    while (checkAgain && iterations < 6) {
        checkAgain = false;
        iterations++;

        for (let i = 0; i < 6; i++) {
            const left = i;
            const right = (i + 1) % 6;

            const segL = segments[left];
            const segR = segments[right];

            // If adjacent segments have the same advanced color, fuse them!
            if (segL.colorIndex === segR.colorIndex && segL.colorIndex < COLORS.length - 1 && segL.colorIndex > 0) {
                const fusionColorIdx = segL.colorIndex;
                runTotalFusions++;
                lifetimeStats.totalFusions++;
                saveLifetimeStats();
                checkBadgesAndThemes();
                
                // Add to combo streak for fusion
                registerComboHit(2);

                // Segment L gets upgraded & healed
                segL.colorIndex = Math.min(COLORS.length - 1, segL.colorIndex + 1);
                segL.health = 1.0;
                segL.pulse = 1.6;

                // Segment R resets to Level 0 (Cyan) & healed
                segR.colorIndex = 0;
                segR.health = 1.0;
                segR.pulse = 0.95;

                // Fusions actively regenerate core stability so skilled players can survive endlessly!
                stability = Math.min(100, stability + 6);

                // Play satisfying chord scaled by combo richness
                soundManager.playFusion(comboMultiplier);

                // Points & XP bonuses scaled by combo multiplier
                const bonus = 45 * level * (fusionColorIdx + 1) * comboMultiplier;
                score += bonus;
                addXP(22);

                // Shockwave at the fusion site (between left & right vertices)
                const angleBetween = (left * (Math.PI / 3) + right * (Math.PI / 3)) / 2 + hexAngle;
                const waveX = Math.cos(angleBetween) * hexRadius;
                const waveY = Math.sin(angleBetween) * hexRadius;
                shockwaves.push(new Shockwave(waveX, waveY, 155, COLORS[fusionColorIdx].hex));
                
                // Exploding high-impact starburst particles
                for (let k = 0; k < 24; k++) {
                    if (particles.length >= maxParticles) break;
                    const angle = Math.random() * Math.PI * 2;
                    const sp = 90 + Math.random() * 175;
                    const particleColor = Math.random() < 0.3 ? (isLightTheme() ? '#f59e0b' : '#ffffff') : COLORS[fusionColorIdx].hex;
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
                const nextColorHex = COLORS[Math.min(COLORS.length - 2, fusionColorIdx + 1)].hex;
                floatingTexts.push(new FloatingText(waveX, waveY, `${t('float_fusion')} +${bonus}!${comboStr}`, nextColorHex));

                // Special case: If we fused into Nova segment (Level 5, index 5), trigger a Nova Blast!
                if (segL.colorIndex === COLORS.length - 1) {
                    triggerNovaBlast(left);
                }

                checkAgain = true;
                updateHUD();
                break;
            }
        }
    }
}

function triggerNovaBlast(segIdx) {
    // Nova blast clears all active orbs on the screen, heals core & repairs all segments
    soundManager.playFusion(comboMultiplier);
    const blastColor = isLightTheme() ? '#7c3aed' : '#38bdf8';
    shockwaves.push(new Shockwave(0, 0, Math.max(window.innerWidth, window.innerHeight) * 0.48, blastColor));
    
    const novaBonus = 120 * level * comboMultiplier;
    score += novaBonus;
    floatingTexts.push(new FloatingText(0, -hexRadius * 1.25, `★ ${t('float_supernova')} +${novaBonus}!`, isLightTheme() ? '#7c3aed' : '#fbbf24'));

    orbs.forEach(orb => {
        const orbPts = 20 * level;
        score += orbPts;
        const orbColor = COLORS[orb.colorIndex] ? COLORS[orb.colorIndex].hex : blastColor;
        floatingTexts.push(new FloatingText(orb.x, orb.y, `+${orbPts}`, orbColor));
        
        for (let k = 0; k < 8; k++) {
            if (particles.length >= maxParticles) break;
            particles.push(new Particle(
                orb.x, orb.y, 
                (Math.random() - 0.5) * 110, 
                (Math.random() - 0.5) * 110, 
                orbColor, 
                0.85, 
                3
            ));
        }
    });
    
    orbs = [];
    stability = Math.min(100, stability + 22);
    segments.forEach(s => { s.health = 1.0; s.pulse = 1.35; });
    
    // Reset the Nova segment to Cyan (Level 0) after blast so gameplay continues seamlessly
    if (segments[segIdx]) {
        segments[segIdx].colorIndex = 0;
    }
    
    screenShake = 20;
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
            stability = 100;
        } else {
            gameOver();
        }
    }
}

function addXP(amount) {
    xp += amount;
    while (xp >= xpNeeded) {
        xp -= xpNeeded;
        levelUp();
    }
}

function levelUp() {
    level++;
    // Smooth endless XP progression curve
    xpNeeded = Math.round(130 + level * 42 + Math.pow(level, 1.35) * 8);
    soundManager.playLevelUp();
    
    // Restore core shield & repair segments on level up
    stability = Math.min(100, stability + 25);
    segments.forEach(s => { s.health = Math.min(1.0, s.health + 0.35); });
    
    shockwaves.push(new Shockwave(0, 0, Math.max(window.innerWidth, window.innerHeight) * 0.55, COLORS[1].hex));
    orbs = [];
    
    // Display LEVEL UP banner overlay with Cosmic Sector title
    const banner = document.getElementById('level-up-banner');
    const levelText = document.getElementById('level-up-text');
    if (levelText) {
        levelText.innerText = `${t('level_up_sub')} ${level} · ${getSectorName(level)}`;
    }
    if (banner) {
        banner.classList.remove('hidden');
    }
    
    // Frame-accurate breather window (no race conditions on rapid level-ups or restarts)
    levelUpGraceTimer = 1.5;
    setTimeout(() => {
        if (banner) banner.classList.add('hidden');
    }, 1500);

    for (let k = 0; k < 36; k++) {
        if (particles.length >= maxParticles) break;
        const angle = Math.random() * Math.PI * 2;
        const sp = 100 + Math.random() * 200;
        particles.push(new Particle(
            0, 0, 
            Math.cos(angle) * sp, 
            Math.sin(angle) * sp, 
            COLORS[k % (COLORS.length - 1)].hex, 
            1.0, 
            3.8, 
            0.55
        ));
    }

    checkBadgesAndThemes();
    updateHUD();
}

function createCoreDamageParticles() {
    soundManager.playError();
    screenShake = 16;
    for (let k = 0; k < 15; k++) {
        if (particles.length >= maxParticles) break;
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
// 7. GENERARE & SPAWNING ORBI (ENDLESS PROGRESSIVE WAVE ENGINE)
// ==========================================================================

function getCurrentSpawnInterval() {
    // Smooth asymptotic spawn interval (never hits 0 or impossible walls, scales endlessly)
    const prog = (level - 1) * 0.105 + Math.log2(1 + level * 0.5) * 0.14;
    const minInterval = gameMode === 'zen' ? 680 : 490;
    const rawInterval = BASE_SPAWN_INTERVAL / (1 + prog);
    const modeMult = gameMode === 'zen' ? 1.22 : 1.0;
    const graceMult = levelUpGraceTimer > 0 ? 2.4 : 1.0;
    const chronoMult = chronoTimer > 0 ? 1.35 : 1.0;
    return Math.max(minInterval, rawInterval * modeMult) * graceMult * chronoMult;
}

function spawnOrb() {
    if (gameState !== 'playing') return;

    waveOrbCounter++;

    // Smart angular fairness: at faster spawn rates, bound the angular jump from the previous orb
    // so the player can always physically rotate the hexagon in time to catch every orb!
    let angle = Math.random() * Math.PI * 2;
    if (lastSpawnAngle !== null) {
        const isHarmonicStream = level >= 3 && (waveOrbCounter % 5 === 0 || waveOrbCounter % 5 === 1);
        if (isHarmonicStream) {
            // Rhythmic 60-degree hex-aligned step for satisfying sweep catches
            const stepDir = (waveOrbCounter % 2 === 0) ? 1 : -1;
            angle = lastSpawnAngle + stepDir * (Math.PI / 3);
        } else {
            const maxStep = level >= 6 ? Math.PI * 0.62 : Math.PI * 0.80;
            const delta = (Math.random() * 2 - 1) * maxStep;
            angle = lastSpawnAngle + delta;
        }
    }
    lastSpawnAngle = angle;

    const spawnDist = Math.max(window.innerWidth, window.innerHeight) / 1.4;
    const startX = Math.cos(angle) * spawnDist;
    const startY = Math.sin(angle) * spawnDist;

    // Smooth logarithmic + progressive speed scaling for endless play
    const speedMult = gameMode === 'zen' ? 0.78 : 1.0;
    const levelSpeedBonus = Math.log2(1 + level * 0.75) * 0.25 + Math.min(0.45, (level - 1) * 0.018);
    const orbSpeed = BASE_ORB_SPEED * (1 + levelSpeedBonus) * speedMult;

    // Smart color selection: ONLY spawn colors currently present on the hexagon's segments
    const activeColors = [...new Set(segments.map(s => s.colorIndex).filter(c => c < COLORS.length - 1))];
    const usableColors = activeColors.length > 0 ? activeColors : [0];
    
    const weightedPool = [];
    usableColors.forEach(c => {
        const weight = Math.max(2, 6 - c);
        for (let i = 0; i < weight; i++) {
            weightedPool.push(c);
        }
    });
    const colorIndex = weightedPool[Math.floor(Math.random() * weightedPool.length)];

    // Progressive Special Orbs for high engagement
    let orbType = 'normal';
    const roll = Math.random();
    if (level >= 2 && roll < 0.085) {
        orbType = 'prism'; // Golden wildcard star orb
    } else if (level >= 3 && chronoTimer <= 0 && roll >= 0.085 && roll < 0.145) {
        orbType = 'chrono'; // Time-dilation orb
    }

    orbs.push(new Orb(startX, startY, colorIndex, orbSpeed, orbType));
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
    
    // Draw vertical grid lines deforming slightly near core
    for (let x = -width / 2; x < width / 2; x += gridSize) {
        ctx.beginPath();
        for (let y = -height / 2; y < height / 2; y += 15) {
            const d = Math.hypot(x, y);
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
    
    const isOverdrive = comboMultiplier >= 5;
    const pulseSpeed = isOverdrive ? 0.009 : 0.005;
    const pulseFactor = 1 + Math.sin(Date.now() * pulseSpeed) * (isOverdrive ? 0.14 : 0.09);
    const coreRadius = 22 * pulseFactor;

    if (!coreGlowGrad) initCoreGrad();
    ctx.save();
    ctx.scale(pulseFactor, pulseFactor);
    ctx.fillStyle = coreGlowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Active Chrono Field time-dilation ring
    if (chronoTimer > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, hexRadius * 1.18, 0, Math.PI * 2 * Math.min(1, chronoTimer / 4.2));
        ctx.strokeStyle = isLightTheme() ? 'rgba(2, 132, 199, 0.45)' : 'rgba(103, 232, 249, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.restore();
    }

    // Overdrive outer aura ring when combo >= x5
    if (isOverdrive) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, coreRadius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = isLightTheme() ? 'rgba(219, 39, 119, 0.45)' : 'rgba(244, 63, 133, 0.55)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    // Central Singularity Core
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
    ctx.fillStyle = themeStyles.coreFill;
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS[4] ? COLORS[4].hex : '#a78bfa';
    ctx.fill();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = isOverdrive ? (COLORS[1] ? COLORS[1].hex : '#f43f85') : themeStyles.coreStroke;
    ctx.stroke();

    // Display active combo multiplier inside core for immediate peripheral feedback
    if (gameState === 'playing' && comboCount >= 2) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = isLightTheme() ? '#0f172a' : '#f8fafc';
        ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`x${comboMultiplier}`, 0, 0.5);
    }

    ctx.restore();
}

function drawHexagon() {
    ctx.save();

    // Subtle directional guide arc for nearest approaching orb so player can read curved trajectories easily
    if (gameState === 'playing' && orbs.length > 0) {
        let nearest = null;
        let minDist = Infinity;
        for (let i = 0; i < orbs.length; i++) {
            if (orbs[i].distance > hexRadius && orbs[i].distance < minDist) {
                minDist = orbs[i].distance;
                nearest = orbs[i];
            }
        }
        if (nearest && minDist < hexRadius * 3.4) {
            const proximity = Math.max(0.12, 1 - (minDist - hexRadius) / (hexRadius * 2.4));
            const indicatorColor = nearest.type === 'prism'
                ? (isLightTheme() ? '#d97706' : '#fde047')
                : (COLORS[nearest.colorIndex] ? COLORS[nearest.colorIndex].hex : '#22d3ee');
            ctx.save();
            ctx.globalAlpha = proximity * 0.55;
            ctx.beginPath();
            ctx.arc(0, 0, hexRadius + 13, nearest.angle - 0.18, nearest.angle + 0.18);
            ctx.strokeStyle = indicatorColor;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
        }
    }
    
    // Vertices of the 6-sided hexagon shield
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = i * (Math.PI / 3) + hexAngle;
        points.push({
            x: Math.cos(angle) * hexRadius,
            y: Math.sin(angle) * hexRadius
        });
    }

    // Draw the 6 shield sides
    for (let i = 0; i < 6; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % 6];
        const segment = segments[i];
        const color = COLORS[segment.colorIndex] || COLORS[0];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        
        ctx.strokeStyle = color.hex;
        
        if (segment.health < 0.6) {
            ctx.setLineDash([12, 6]);
        } else {
            ctx.setLineDash([]);
        }

        ctx.shadowBlur = (isLightTheme() ? 5 : 7.5) * segment.pulse;
        ctx.shadowColor = color.hex;
        
        ctx.globalAlpha = 0.35 + (segment.health * 0.65);
        ctx.lineWidth = (4.2 + segment.colorIndex * 0.45) * segment.pulse;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Vertex joint dots for crisp geometric clarity
        ctx.shadowBlur = 0;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isLightTheme() ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.45)';
        ctx.fill();

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const midLen = Math.hypot(midX, midY) || 1;
        const markerDist = Math.max(0, midLen - 16);
        const markerX = (midX / midLen) * markerDist;
        const markerY = (midY / midLen) * markerDist;
        drawSegmentColorMarker(ctx, markerX, markerY, segment.colorIndex);

        if (segment.pulse > 1.0) {
            segment.pulse = Math.max(1.0, segment.pulse - 2.0 * 0.016);
        } else if (segment.pulse < 1.0) {
            segment.pulse = Math.min(1.0, segment.pulse + 1.0 * 0.016);
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
    
    if (typeof sessionHistory !== 'undefined' && sessionHistory.length > 0 && history.length === 0) {
        history = sessionHistory;
    } else if (typeof sessionHistory !== 'undefined' && sessionHistory.length > 0) {
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
            <span class="hist-level">${t('hist_level')} ${run.level}</span>
            <span class="hist-score neon-cyan">${run.score} ${t('hist_pts')}</span>
        `;
        historyList.appendChild(item);
    });
}

let sessionHistory = [];
try {
    sessionHistory = JSON.parse(localStorage.getItem('orbit_fusion_history') || '[]');
} catch (e) {
    sessionHistory = [];
}

function saveGameToHistory(finalScore, finalLevel) {
    if (finalScore <= 0) return;

    const locale = currentLang === 'en' ? 'en-US' : 'ro-RO';
    const dateStr = new Date().toLocaleDateString(locale, {
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

    sessionHistory.unshift(newRun);
    sessionHistory = sessionHistory.slice(0, 5);

    try {
        localStorage.setItem('orbit_fusion_history', JSON.stringify(sessionHistory));
    } catch (e) {
        console.warn("Could not save history to localStorage", e);
    }
}

function gameOver() {
    gameState = 'game_over';
    soundManager.playGameOver();
    
    saveGameToHistory(score, level);
    updateHistoryUI();
    
    let isNewHigh = false;
    if (score > highScore) {
        highScore = score;
        try {
            localStorage.setItem('orbit_fusion_highscore', highScore);
        } catch (e) {
            console.warn("Could not save to localStorage", e);
        }
        const bestValEl = document.getElementById('best-score-val');
        if (bestValEl) bestValEl.innerText = highScore;
        isNewHigh = true;
    }
    
    document.getElementById('hud').classList.add('hidden');
    
    const goScreen = document.getElementById('game-over-screen');

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

    if (goTitle) goTitle.innerText = gameMode === 'zen' ? t('go_title_zen') : t('go_title_default');
    if (goSubtitle) goSubtitle.innerText = gameMode === 'zen' ? t('go_subtitle_zen') : t('go_subtitle_default');
    if (goFocusScore) goFocusScore.innerText = focusScore;
    if (goScore) goScore.innerText = score;
    if (goPrecision) goPrecision.innerText = `${precisionPercent}%`;
    if (goFusions) goFusions.innerText = runTotalFusions;
    if (goMaxCombo) goMaxCombo.innerText = `x${runMaxCombo}`;
    if (goPlayTime) goPlayTime.innerText = playTimeStr;
    if (goLevel) goLevel.innerText = level;

    if (feedbackText) {
        if (precisionPercent >= 85) {
            feedbackText.innerText = t('fb_precision');
        } else if (runMaxCombo >= 3) {
            feedbackText.innerText = t('fb_combo');
        } else if (runTotalFusions >= 10) {
            feedbackText.innerText = t('fb_fusions');
        } else if (gameMode === 'zen') {
            feedbackText.innerText = t('fb_zen');
        } else {
            feedbackText.innerText = t('fb_default');
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
    if (gameState === 'start') {
        // Gentle ambient rotation of the preview hexagon behind the Start Screen
        hexAngle += 0.28 * dt;
        return;
    }

    if (gameState === 'paused') {
        updateBreathingWidget(dt);
        return;
    }

    if (gameState !== 'playing') return;

    // Count active play only
    sessionElapsedSeconds += dt;
    runPlayTimeSeconds += dt;
    lifetimeStats.totalPlayTimeSeconds += dt;
    statsSaveAccumulator += dt;

    if (chronoTimer > 0) {
        chronoTimer = Math.max(0, chronoTimer - dt);
    }
    if (levelUpGraceTimer > 0) {
        levelUpGraceTimer = Math.max(0, levelUpGraceTimer - dt);
    }

    const sessionTimeVal = document.getElementById('session-time-val');
    if (sessionTimeVal) {
        sessionTimeVal.innerText = formatTime(sessionElapsedSeconds);
    }

    if (sessionElapsedSeconds >= nextRestReminderTime) {
        showRestReminder();
        nextRestReminderTime += REST_REMINDER_INTERVAL;
    }

    if (gameMode === 'zen') {
        lifetimeStats.zenPlayTimeSeconds += dt;
    }

    if (statsSaveAccumulator >= 5) {
        statsSaveAccumulator %= 5;
        saveLifetimeStats();
        checkBadgesAndThemes();
    }

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

    // Keyboard, touch-button and drag rotation share the same acceleration model.
    hexTargetSpeed = 0;
    if (keys.Left || (tapDirection === -1 && performance.now() < tapUntil)) hexTargetSpeed = -HEX_MAX_SPEED;
    if (keys.Right || (tapDirection === 1 && performance.now() < tapUntil)) hexTargetSpeed = HEX_MAX_SPEED;
    hexCurrentSpeed += (hexTargetSpeed - hexCurrentSpeed) * (1 - Math.pow(1 - HEX_ACCEL, dt * 60));
    hexAngle += hexCurrentSpeed * dt;

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
    if (particles.length > maxParticles) {
        particles = particles.slice(particles.length - maxParticles);
    }
    if (shockwaves.length > MAX_SHOCKWAVES) {
        shockwaves = shockwaves.slice(shockwaves.length - MAX_SHOCKWAVES);
    }
    if (floatingTexts.length > MAX_FLOATING_TEXTS) {
        floatingTexts = floatingTexts.slice(floatingTexts.length - MAX_FLOATING_TEXTS);
    }
    orbs = orbs.filter(orb => orb.distance <= 2000);

    // Handle collision check
    checkCollisions();

    // Spawn new incoming orb using the endless progressive curve
    spawnTimer += dt * 1000;
    const currentSpawnInterval = getCurrentSpawnInterval();
    
    if (spawnTimer >= currentSpawnInterval) {
        spawnOrb();
        spawnTimer = 0;
    }
}

function draw() {
    ctx.save();
    let shakeMult = reducedMotionMedia.matches || shakeSetting === 'off' ? 0 : (shakeSetting === 'medium' ? 0.5 : 1.0);
    let effectiveShake = (gameState === 'playing' ? screenShake : 0) * shakeMult;

    if (effectiveShake > 0) {
        const dx = (Math.random() - 0.5) * effectiveShake;
        const dy = (Math.random() - 0.5) * effectiveShake;
        ctx.translate(window.innerWidth / 2 + dx, window.innerHeight / 2 + dy);
    } else {
        ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    }

    drawBackground();
    drawGrid();

    if (gameState === 'start' || segments.length === 0) {
        drawCore();
        if (segments.length > 0) drawHexagon();
        ctx.restore();
        return;
    }
    
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

    // Gameplay stays at the display refresh rate; menu/pause backdrops use less battery.
    const ambientFrameInterval = reducedMotionMedia.matches ? 100 : 33;
    if (gameState === 'playing' || timestamp - lastRenderTime >= ambientFrameInterval) {
        draw();
        lastRenderTime = timestamp;
    }

    requestAnimationFrame(gameLoop);
}

// ==========================================================================
// 11. EVENT LISTENERS & RESIZING
// ==========================================================================

function resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isCompact = width <= 800;
    const dprCap = isCompact ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    maxParticles = isCompact ? 140 : 250;
    
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    
    // Hexagon radius dynamic adjustments based on screen scale
    hexRadius = Math.min(width, height) * 0.18;
    if (hexRadius < 68) hexRadius = 68;
    if (hexRadius > 130) hexRadius = 130;

    cachedBgGradient = null;
    initStars();
    initNebulae();
    initOrbCache();
    initCoreGrad();
}

// Key Listeners
window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, select, textarea') || e.target.isContentEditable) return;
    if (e.repeat && ['Escape', ' ', 'p', 'P'].includes(e.key)) return;
    if (e.key === ' ' && e.target.closest('button, summary')) return;
    const isLeftControl = e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A';
    const isRightControl = e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D';
    if ((isLeftControl || isRightControl) && gameState === 'playing') {
        e.preventDefault();
    }
    if (isLeftControl) keys.Left = true;
    if (isRightControl) keys.Right = true;

    if (e.key === 'Escape') {
        const openModalElement = ['theme-modal', 'badges-modal', 'stats-modal']
            .map(id => document.getElementById(id))
            .find(modal => modal && !modal.classList.contains('hidden'));
        if (openModalElement) {
            e.preventDefault();
            closeModal(openModalElement.id);
            return;
        }
        if (gameState === 'playing' || gameState === 'paused') {
            e.preventDefault();
            togglePause();
            return;
        }
    }
    
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
    if (target && target.closest && (target.closest('.hud-controls') || target.closest('.touch-controls') || target.closest('.action-btn') || target.closest('.settings-container'))) return;
    
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

let tapUntil = 0;
let tapDirection = 0;
function handlePointerEnd() {
    if (!isInputActive) return;
    if (!isDragging && gameState === 'playing') {
        tapDirection = dragStartX < window.innerWidth / 2 ? -1 : 1;
        tapUntil = performance.now() + 150;
    }
    isInputActive = false;
    isDragging = false;
}
function clearRotationInput() {
    keys.Left = keys.Right = false;
    isInputActive = isDragging = false;
    tapUntil = 0;
    hexCurrentSpeed = 0;
    document.querySelectorAll('.touch-control-btn').forEach(b => b.classList.remove('is-active'));
}
window.addEventListener('touchcancel', clearRotationInput);
window.addEventListener('blur', clearRotationInput);

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
        if (gameState === 'playing' && e.target === canvas) e.preventDefault();
        const touch = e.touches[0];
        handlePointerStart(touch.clientX, touch.clientY, e.target);
    }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        if (gameState === 'playing' && e.target === canvas) e.preventDefault();
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY, e.target);
    }
}, { passive: false });

window.addEventListener('touchend', () => {
    handlePointerEnd();
});

function bindRotationButton(buttonId, direction) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const setActive = (active, event) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (active && gameState !== 'playing') return;
        keys[direction] = active;
        button.classList.toggle('is-active', active);
    };

    button.addEventListener('pointerdown', (event) => {
        setActive(true, event);
        if (button.setPointerCapture) button.setPointerCapture(event.pointerId);
    });
    button.addEventListener('pointerup', event => setActive(false, event));
    button.addEventListener('pointercancel', event => setActive(false, event));
    button.addEventListener('lostpointercapture', event => setActive(false, event));
}

bindRotationButton('rotate-left-btn', 'Left');
bindRotationButton('rotate-right-btn', 'Right');

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
    clearRotationInput();
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
    toggleDarkLightMode();
});

const startThemeModeBtn = document.getElementById('start-theme-mode-btn');
if (startThemeModeBtn) {
    startThemeModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundManager.init();
        toggleDarkLightMode();
    });
}

['hud-lang-toggle', 'start-lang-btn', 'lang-toggle-btn'].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            soundManager.init();
            toggleLanguage();
        });
    }
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
        saveLifetimeStats();
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
let resizeFrame = null;
window.addEventListener('resize', () => {
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        resizeCanvas();
    });
});
resizeCanvas();

// Load Persistence Data
loadLifetimeStats();
loadUnlockedBadges();
loadUnlockedThemes();
checkBadgesAndThemes();

// Detect and apply saved game mode
setGameMode(gameMode);

// Prepare the visual state without counting a mission before the player presses Start.
initGame(false);
gameState = 'start';

// Load and render history UI
updateHistoryUI();

// Follow the device until the player explicitly chooses a palette.
const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
let savedTheme = null;
try { savedTheme = localStorage.getItem('orbit_fusion_theme'); } catch (_) {}
applyTheme(savedTheme || (systemTheme.matches ? 'light_ether' : 'cyber_neon'), false);
systemTheme.addEventListener('change', event => {
    let explicit = null;
    try { explicit = localStorage.getItem('orbit_fusion_theme'); } catch (_) {}
    if (!explicit) applyTheme(event.matches ? 'light_ether' : 'cyber_neon', false);
});

// Set initial highscore on startup screen
document.getElementById('best-score-val').innerText = highScore;

// Keep the primary action above the fold on compact phones.
const tutorialDetails = document.querySelector('.tutorial-box');
if (tutorialDetails && window.matchMedia('(max-width: 600px)').matches) {
    tutorialDetails.removeAttribute('open');
}

// Enable offline replay after the first successful visit on a hosted HTTPS build.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(error => {
            console.warn('Service worker registration failed', error);
        });
    });
}

// Start game loop
requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
});

// Shared, persistent music volume controls on the start and pause screens.
document.querySelectorAll('.music-volume').forEach(input => {
    input.value = Math.round(ambientVolume * 100);
    input.addEventListener('input', () => {
        ambientVolume = Number(input.value) / 100;
        soundManager.init();
        if (soundManager.musicBus) soundManager.musicBus.gain.setTargetAtTime(soundManager.muted ? 0 : ambientVolume, soundManager.ctx.currentTime, 0.15);
        document.querySelectorAll('.music-volume').forEach(other => { other.value = input.value; });
        try { localStorage.setItem('orbit_fusion_music_volume', String(ambientVolume)); } catch (_) {}
    });
});

const colorMarkersToggle = document.getElementById('color-markers-toggle');
function updateColorMarkersToggle() {
    if (!colorMarkersToggle) return;
    colorMarkersToggle.textContent = colorMarkersEnabled ? t('markers_on') : t('markers_off');
    colorMarkersToggle.setAttribute('aria-pressed', String(colorMarkersEnabled));
}
if (colorMarkersToggle) {
    colorMarkersToggle.addEventListener('click', () => {
        colorMarkersEnabled = !colorMarkersEnabled;
        updateColorMarkersToggle();
        try { localStorage.setItem('orbit_fusion_color_markers', String(colorMarkersEnabled)); } catch (_) {}
    });
}
updateColorMarkersToggle();
applyLanguage(currentLang, false);
