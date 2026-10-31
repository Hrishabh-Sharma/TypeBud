/**
 * TypeBud — Modern Browser-Based Typing Speed Game & Beginner Typing Academy
 * Tagline: Practice. Improve. Type Faster.
 * Pure Vanilla JavaScript (No frameworks, no external libraries)
 */

(function () {
  'use strict';

  // ==========================================================================
  // BEGINNER TYPING CURRICULUM (10 Step-by-Step Lessons)
  // ==========================================================================

  const BEGINNER_LESSONS = [
    {
      id: 1,
      title: "Home Row Anchors (F & J)",
      instruction: "Rest your left index finger on F and right index finger on J. Feel the small raised bump on each key! Keep wrists floating comfortably.",
      drill: "f j f j ff jj fff jjj fj jf fj fj jf jf ff jj fj fj"
    },
    {
      id: 2,
      title: "Inner Home Row (D & K)",
      instruction: "Left middle finger stays on D; right middle finger stays on K. Strike with a light, rhythmic tap.",
      drill: "d k dk kd dd kk f d j k fd jk dk fj kf jd dk jk fd kj"
    },
    {
      id: 3,
      title: "Ring Finger Keys (S & L)",
      instruction: "Left ring finger rests on S; right ring finger rests on L. Keep all other fingers gently anchored on their home keys.",
      drill: "s l sl ls ss ll as ld sk fl dslk lskd sl fl ks ld sl"
    },
    {
      id: 4,
      title: "Pinky Anchor Keys (A & ;)",
      instruction: "Rest left pinky on A and right pinky on semicolon (;). All 8 home row fingers are now established in home position!",
      drill: "a ; aa ;; a; ;a fa ja da ka sa la a; ;a fa la ka da sa"
    },
    {
      id: 5,
      title: "Full Home Row Words",
      instruction: "Form real English words using solely home row keys without moving your hand base away from home row.",
      drill: "as ask all fall salad flask dads sad lad salads falls flasks"
    },
    {
      id: 6,
      title: "Top Row Vowels (E & I)",
      instruction: "Reach left middle finger upward to E; reach right middle finger upward to I. Always return immediately to home row (D & K).",
      drill: "e i ee ii fe ji de ki see side life like leaf desk idea file"
    },
    {
      id: 7,
      title: "Top Row Index Reach (R & U)",
      instruction: "Reach left index finger up to R; reach right index finger up to U. Quick upward glance, then snap fingers back to F & J.",
      drill: "r u rr uu fr ju red use run rule sure true full dark fire pure"
    },
    {
      id: 8,
      title: "Bottom Row Index Reach (V, B, N, M)",
      instruction: "Reach left index down to V and B; reach right index down to N and M. Keep finger posture curved and relaxed.",
      drill: "v b n m fv jm fb jn van man men vine beam view mask verb fine"
    },
    {
      id: 9,
      title: "Common Sight Words",
      instruction: "Seamlessly combine home row, top row, and bottom row letters. Keep your eyes on the screen, not your hands!",
      drill: "the and that have with this from they word time make good know"
    },
    {
      id: 10,
      title: "Capital Letters & Punctuation",
      instruction: "Hold Shift with your opposite pinky to capitalize letters cleanly, and finish statements with a crisp period.",
      drill: "The sun is out. A quick start helps. Keep it up. Practice daily."
    }
  ];

  // ==========================================================================
  // TOUCH TYPING FINGER MAPPINGS & HANDS INTEGRATION
  // ==========================================================================

  const FINGER_MAP = {
    // Numbers
    '1': { finger: 'Left Pinky', class: 'finger-pinky', fingerId: 'left-pinky' },
    '2': { finger: 'Left Ring', class: 'finger-ring', fingerId: 'left-ring' },
    '3': { finger: 'Left Middle', class: 'finger-middle', fingerId: 'left-middle' },
    '4': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    '5': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    '6': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    '7': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    '8': { finger: 'Right Middle', class: 'finger-middle', fingerId: 'right-middle' },
    '9': { finger: 'Right Ring', class: 'finger-ring', fingerId: 'right-ring' },
    '0': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },
    '-': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },
    '=': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },

    // Top Row
    'q': { finger: 'Left Pinky', class: 'finger-pinky', fingerId: 'left-pinky' },
    'w': { finger: 'Left Ring', class: 'finger-ring', fingerId: 'left-ring' },
    'e': { finger: 'Left Middle', class: 'finger-middle', fingerId: 'left-middle' },
    'r': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    't': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    'y': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    'u': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    'i': { finger: 'Right Middle', class: 'finger-middle', fingerId: 'right-middle' },
    'o': { finger: 'Right Ring', class: 'finger-ring', fingerId: 'right-ring' },
    'p': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },
    '[': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },
    ']': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },

    // Home Row
    'a': { finger: 'Left Pinky', class: 'finger-pinky', fingerId: 'left-pinky' },
    's': { finger: 'Left Ring', class: 'finger-ring', fingerId: 'left-ring' },
    'd': { finger: 'Left Middle', class: 'finger-middle', fingerId: 'left-middle' },
    'f': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index', isAnchor: true },
    'g': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    'h': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    'j': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index', isAnchor: true },
    'k': { finger: 'Right Middle', class: 'finger-middle', fingerId: 'right-middle' },
    'l': { finger: 'Right Ring', class: 'finger-ring', fingerId: 'right-ring' },
    ';': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },
    '\'': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },

    // Bottom Row
    'z': { finger: 'Left Pinky', class: 'finger-pinky', fingerId: 'left-pinky' },
    'x': { finger: 'Left Ring', class: 'finger-ring', fingerId: 'left-ring' },
    'c': { finger: 'Left Middle', class: 'finger-middle', fingerId: 'left-middle' },
    'v': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    'b': { finger: 'Left Index', class: 'finger-index', fingerId: 'left-index' },
    'n': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    'm': { finger: 'Right Index', class: 'finger-index', fingerId: 'right-index' },
    ',': { finger: 'Right Middle', class: 'finger-middle', fingerId: 'right-middle' },
    '.': { finger: 'Right Ring', class: 'finger-ring', fingerId: 'right-ring' },
    '/': { finger: 'Right Pinky', class: 'finger-pinky', fingerId: 'right-pinky' },

    // Space
    ' ': { finger: 'Thumb (Left/Right)', class: 'finger-thumb', fingerId: 'left-thumb' }
  };

  const KEYBOARD_LAYOUT = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
    [' ']
  ];

  // ==========================================================================
  // WORD CORPORA & PRESETS
  // ==========================================================================

  const CORPORA = {
    easy: [
      "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
      "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
      "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
      "an", "will", "my", "one", "all", "would", "there", "their", "what",
      "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
      "when", "make", "can", "like", "time", "no", "just", "him", "know",
      "take", "people", "into", "year", "your", "good", "some", "could",
      "them", "see", "other", "than", "then", "now", "look", "only", "come",
      "its", "over", "think", "also", "back", "after", "use", "two", "how",
      "our", "work", "first", "well", "way", "even", "new", "want", "because",
      "any", "these", "give", "day", "most", "us", "water", "long", "find",
      "very", "still", "world", "hand", "life", "tell", "write", "call", "home",
      "small", "found", "place", "read", "line", "point", "help", "great",
      "under", "name", "show", "play", "air", "away", "large", "move", "book",
      "need", "land", "differ", "turn", "house", "city", "kind", "off", "page",
      "stand", "own", "earth", "head", "high", "light", "right", "side", "walk",
      "open", "stop", "start", "sound", "draw", "press", "night", "keep", "real",
      "sea", "tree", "plant", "food", "sun", "state", "door", "room", "grow",
      "fast", "road", "plan", "form", "hard", "left", "run", "learn", "close",
      "never", "next", "few", "idea", "river", "care", "mile", "late", "face"
    ],

    medium: [
      "Clean code always looks like it was written by someone who cares.",
      "Consistency is the true foundation upon which all great skills are built.",
      "Typing with precision allows your thoughts to flow straight to the screen.",
      "The quick brown fox jumps gracefully over the lazy dog every single morning.",
      "Technology is best when it brings people together and solves real problems.",
      "Every master was once a beginner who refused to surrender to frustration.",
      "Focus on accuracy first, and the speed will naturally follow with practice.",
      "Great software engineering requires patience, clarity, and thoughtful design.",
      "A journey of a thousand miles begins with a single deliberate step forward.",
      "The beautiful thing about learning is that nobody can take it away from you.",
      "Simplicity is prerequisite for reliability in modern computer systems.",
      "Pay attention to the rhythm of your fingers across the mechanical keyboard.",
      "Clear communication is often much harder than writing complex algorithms.",
      "Small daily improvements over time lead to stunning long-term results.",
      "Do not measure your progress using someone else's ruler or timeline.",
      "The keyboard is an instrument that translates human intent into digital reality.",
      "Stay curious, keep practicing every day, and never fear making mistakes.",
      "Success is the sum of small efforts repeated day in and day out.",
      "Creativity is intelligence having fun while exploring new possibilities.",
      "Deep focus is a rare superpower in a world full of digital distractions.",
      "Write programs that do one thing well and cooperate cleanly with others.",
      "Take a deep breath, relax your shoulders, and let your fingers glide smoothly."
    ],

    hard: [
      "The quintessential aspect of synchronization lies in harmonious concurrency; race-conditions (e.g., thread locks) cause catastrophic failures.",
      "According to Moore's Law (circa 1965), computational micro-architecture undergoes exponential density scaling every 18-24 months.",
      "Phenomenological observations suggest that cognitive flow states emerge when task challenge matches personal capability precisely.",
      "Algorithmic efficiency—specifically O(n log n) versus O(n^2)—distinguishes scalable infrastructure from fragile prototypes.",
      "\"Simplicity is the ultimate sophistication,\" remarked Leonardo da Vinci, an axiom revered throughout modern software design.",
      "Cryptographic hashes (such as SHA-256) ensure irreversible integrity verification across decentralized, peer-to-peer distributed ledgers.",
      "Juxtaposed against archaic paradigms, modern asynchronous programming provides non-blocking I/O operations under heavy network loads.",
      "The labyrinthine intricacies of natural language processing encompass syntactic parsing, semantic vectors, and transformer attention mechanisms.",
      "High-performance computing demands conscientious memory management, minimizing cache-misses and eliminating redundant garbage collection cycles.",
      "Ubiquitous computing platforms require multi-faceted security protocols: OAuth 2.0 tokens, TLS 1.3 handshakes, and strict zero-trust architectures."
    ]
  };

  const PRESETS = {
    tech: "Clean architecture and modular design empower modern software systems to scale gracefully under pressure. High cohesion and loose coupling ensure that independent components can evolve without triggering cascading failures across distributed clusters. By prioritizing readable, testable code over clever shortcuts, engineering teams build sustainable technology that stands the test of time.",
    stoic: "Waste no more time arguing about what a good man should be. Be one. When you arise in the morning, think of what a precious privilege it is to be alive—to breathe, to think, to enjoy, to love. You have power over your mind, not outside events. Realize this, and you will find radiant strength and tranquility.",
    prose: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. Whenever you feel like criticizing anyone, he told me, just remember that all the people in this world haven't had the advantages that you've had. In consequence, I'm inclined to reserve all judgments."
  };

  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================

  const state = {
    difficulty: 'medium', // 'beginner' | 'easy' | 'medium' | 'hard' | 'custom'
    timeLimit: 60,        // 60, 180, 300, 600, 900... 3600, or 0 (Untimed/Complete)
    timeRemaining: 60,
    timeElapsedUntimed: 0,
    timerInterval: null,
    isTestActive: false,
    hasStarted: false,

    // Pause timer state
    isPaused: false,
    pausedDuration: 0,
    pauseStartTime: null,
    
    // Beginner Academy & Hands
    currentLessonId: 1,
    isKeyboardVisible: true,

    // Custom / PDF template
    customTemplateText: '',
    customTemplateName: 'Custom Document',
    
    // Words and character tracking
    words: [],
    currentWordIndex: 0,
    currentCharIndex: 0,

    // Performance metrics
    startTime: null,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    incorrectKeystrokes: 0,
    wpmSamples: [],
    
    // Preferences
    soundEnabled: true,
    portfolioUrl: 'https://yourportfolio.com',
    
    // Cached DOM elements
    elements: {}
  };

  const STORAGE_KEY = 'typebud_user_records_v1';
  const SOUND_KEY = 'typebud_sound_pref_v1';
  const LESSON_KEY = 'typebud_beginner_progress_v1';
  const PORTFOLIO_KEY = 'typebud_portfolio_url_v1';
  const AVATAR_KEY = 'typebud_creator_avatar_v1';

  // ==========================================================================
  // AUDIO SYNTHESIZER (Web Audio API - 100% Offline, Zero Assets)
  // ==========================================================================

  class SoundEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playClick() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.035);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.035);
      } catch (e) {}
    }

    playError() {
      if (!state.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.07);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.07);
      } catch (e) {}
    }
  }

  const audioEngine = new SoundEngine();

  // ==========================================================================
  // INITIALIZATION & CACHING
  // ==========================================================================

  function initApp() {
    cacheElements();
    loadPreferences();
    buildVisualKeyboard();
    populateLessonDropdown();
    bindEvents();
    resetGame();
    renderPersonalRecordsTable();
  }

  function cacheElements() {
    state.elements = {
      // Header
      soundToggle: document.getElementById('soundToggle'),
      soundOnIcon: document.querySelector('.sound-on-icon'),
      soundOffIcon: document.querySelector('.sound-off-icon'),
      recordsBtn: document.getElementById('recordsBtn'),
      aboutBtn: document.getElementById('aboutBtn'),
      shortcutsBtn: document.getElementById('shortcutsBtn'),
      pdfTemplateBtn: document.getElementById('pdfTemplateBtn'),
      tutorHeaderBtn: document.getElementById('tutorHeaderBtn'),

      // Settings
      difficultyPills: document.querySelectorAll('#difficultyGroup .mode-pill'),
      timePills: document.querySelectorAll('#timeGroup .mode-pill'),
      customModePill: document.getElementById('customModePill'),
      beginnerModePill: document.getElementById('beginnerModePill'),

      // Beginner Tutor Panel
      beginnerPanel: document.getElementById('beginnerPanel'),
      lessonStepBadge: document.getElementById('lessonStepBadge'),
      lessonTitle: document.getElementById('lessonTitle'),
      lessonInstruction: document.getElementById('lessonInstruction'),
      lessonSelect: document.getElementById('lessonSelect'),
      prevLessonBtn: document.getElementById('prevLessonBtn'),
      nextLessonBtn: document.getElementById('nextLessonBtn'),
      hudTargetKey: document.getElementById('hudTargetKey'),
      hudTargetFinger: document.getElementById('hudTargetFinger'),

      // Visual Keyboard & Hands
      visualKeyboardCard: document.getElementById('visualKeyboardCard'),
      keyboardGrid: document.getElementById('keyboardGrid'),
      toggleKeyboardBtn: document.getElementById('toggleKeyboardBtn'),
      toggleKeyboardGlobalBtn: document.getElementById('toggleKeyboardGlobalBtn'),
      keyboardToggleText: document.getElementById('keyboardToggleText'),
      handsDiagramContainer: document.getElementById('handsDiagramContainer'),
      leftHandVisual: document.getElementById('leftHandVisual'),
      rightHandVisual: document.getElementById('rightHandVisual'),

      // Pause Controls
      pauseTimerBtn: document.getElementById('pauseTimerBtn'),
      pauseIcon: document.querySelector('.pause-icon'),
      playIcon: document.querySelector('.play-icon'),
      pauseBtnLabel: document.getElementById('pauseBtnLabel'),
      pauseOverlay: document.getElementById('pauseOverlay'),
      resumeTestBtn: document.getElementById('resumeTestBtn'),

      // Lesson Passed Modal
      lessonPassedModal: document.getElementById('lessonPassedModal'),
      lessonPassedTitle: document.getElementById('lessonPassedTitle'),
      lessonPassedSubtitle: document.getElementById('lessonPassedSubtitle'),
      lessonPassedAcc: document.getElementById('lessonPassedAcc'),
      lessonPassedWpm: document.getElementById('lessonPassedWpm'),
      retryLessonBtn: document.getElementById('retryLessonBtn'),
      advanceLessonBtn: document.getElementById('advanceLessonBtn'),

      // Live HUD
      hudTimer: document.getElementById('hudTimer'),
      hudTimerUnit: document.getElementById('hudTimerUnit'),
      hudTimerLabel: document.getElementById('hudTimerLabel'),
      timerProgressRing: document.getElementById('timerProgressRing'),
      timerProgressBar: document.getElementById('timerProgressBar'),
      hudWpm: document.getElementById('hudWpm'),
      hudAccuracy: document.getElementById('hudAccuracy'),
      hudCorrect: document.getElementById('hudCorrect'),
      hudIncorrect: document.getElementById('hudIncorrect'),

      // Arena
      arenaCard: document.getElementById('arenaCard'),
      customBanner: document.getElementById('customBanner'),
      customTemplateName: document.getElementById('customTemplateName'),
      editCustomTemplateBtn: document.getElementById('editCustomTemplateBtn'),
      wordsViewport: document.getElementById('wordsViewport'),
      wordsContainer: document.getElementById('wordsContainer'),
      smoothCaret: document.getElementById('smoothCaret'),
      hiddenInput: document.getElementById('hiddenInput'),
      capsIndicator: document.getElementById('capsIndicator'),
      focusOverlay: document.getElementById('focusOverlay'),
      restartBtn: document.getElementById('restartBtn'),

      // Results Modal
      resultsModal: document.getElementById('resultsModal'),
      resultTierBadge: document.getElementById('resultTierBadge'),
      newPbBadge: document.getElementById('newPbBadge'),
      resultModeMeta: document.getElementById('resultModeMeta'),
      finalWpm: document.getElementById('finalWpm'),
      finalRawWpm: document.getElementById('finalRawWpm'),
      finalAccuracy: document.getElementById('finalAccuracy'),
      finalConsistency: document.getElementById('finalConsistency'),
      finalTotalChars: document.getElementById('finalTotalChars'),
      finalCorrectChars: document.getElementById('finalCorrectChars'),
      finalIncorrectChars: document.getElementById('finalIncorrectChars'),
      finalTimeElapsed: document.getElementById('finalTimeElapsed'),
      finalKeystrokePace: document.getElementById('finalKeystrokePace'),
      modalRestartBtn: document.getElementById('modalRestartBtn'),
      modalChangeDiffBtn: document.getElementById('modalChangeDiffBtn'),
      modalShareBtn: document.getElementById('modalShareBtn'),
      shareBtnText: document.getElementById('shareBtnText'),

      // Personal Records Modal
      recordsModal: document.getElementById('recordsModal'),
      closeRecordsBtn: document.getElementById('closeRecordsBtn'),
      recordsDoneBtn: document.getElementById('recordsDoneBtn'),
      clearRecordsBtn: document.getElementById('clearRecordsBtn'),
      recordBestWpm: document.getElementById('recordBestWpm'),
      recordBestWpmMode: document.getElementById('recordBestWpmMode'),
      recordBestAccuracy: document.getElementById('recordBestAccuracy'),
      recordBestAccMode: document.getElementById('recordBestAccMode'),
      recordTotalTests: document.getElementById('recordTotalTests'),
      recordsTableBody: document.getElementById('recordsTableBody'),

      // Custom Template / PDF Modal
      customTemplateModal: document.getElementById('customTemplateModal'),
      closeCustomModalBtn: document.getElementById('closeCustomModalBtn'),
      cancelCustomBtn: document.getElementById('cancelCustomBtn'),
      applyCustomBtn: document.getElementById('applyCustomBtn'),
      fileDropzone: document.getElementById('fileDropzone'),
      templateFileInput: document.getElementById('templateFileInput'),
      customTextarea: document.getElementById('customTextarea'),
      templateWordCount: document.getElementById('templateWordCount'),
      templateCharCount: document.getElementById('templateCharCount'),
      templateEstTime: document.getElementById('templateEstTime'),
      presetButtons: document.querySelectorAll('.preset-btn'),

      // About Modal & Avatar Upload
      aboutModal: document.getElementById('aboutModal'),
      closeAboutBtn: document.getElementById('closeAboutBtn'),
      aboutDoneBtn: document.getElementById('aboutDoneBtn'),
      creatorImage: document.getElementById('creatorImage'),
      creatorPhotoUploadInput: document.getElementById('creatorPhotoUploadInput'),
      creatorCardPortfolioLink: document.getElementById('creatorCardPortfolioLink'),
      editPortfolioUrlBtn: document.getElementById('editPortfolioUrlBtn'),

      // Privacy Modal
      privacyModal: document.getElementById('privacyModal'),
      closePrivacyBtn: document.getElementById('closePrivacyBtn'),
      privacyDoneBtn: document.getElementById('privacyDoneBtn'),

      // Terms Modal
      termsModal: document.getElementById('termsModal'),
      closeTermsBtn: document.getElementById('closeTermsBtn'),
      termsDoneBtn: document.getElementById('termsDoneBtn'),

      // Shortcuts Modal
      shortcutsModal: document.getElementById('shortcutsModal'),
      closeShortcutsBtn: document.getElementById('closeShortcutsBtn'),
      shortcutsDoneBtn: document.getElementById('shortcutsDoneBtn'),

      // Footer Links
      footerAboutBtn: document.getElementById('footerAboutBtn'),
      footerPrivacyBtn: document.getElementById('footerPrivacyBtn'),
      footerTermsBtn: document.getElementById('footerTermsBtn'),
      footerTutorBtn: document.getElementById('footerTutorBtn'),
      footerCustomBtn: document.getElementById('footerCustomBtn'),
      footerPortfolioLink: document.getElementById('footerPortfolioLink'),
      footerPortfolioText: document.getElementById('footerPortfolioText')
    };
  }

  // ==========================================================================
  // VISUAL KEYBOARD & HANDS DIAGRAM ENGINE
  // ==========================================================================

  function buildVisualKeyboard() {
    const grid = state.elements.keyboardGrid;
    grid.innerHTML = '';

    KEYBOARD_LAYOUT.forEach(rowKeys => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'keyboard-row';

      rowKeys.forEach(k => {
        const keycap = document.createElement('div');
        keycap.className = 'keycap';
        keycap.dataset.key = k;

        const info = FINGER_MAP[k];
        if (info) {
          keycap.classList.add(info.class);
          if (info.isAnchor) {
            keycap.classList.add('home-anchor');
          }
        }

        if (k === ' ') {
          keycap.classList.add('key-space');
          keycap.textContent = 'Space';
        } else {
          keycap.textContent = k.toUpperCase();
        }

        rowDiv.appendChild(keycap);
      });

      grid.appendChild(rowDiv);
    });
  }

  function updateVisualTargetKey() {
    const currentWordEl = state.elements.wordsContainer.children[state.currentWordIndex];
    if (!currentWordEl) return;

    const currentWordText = state.words[state.currentWordIndex];
    let targetChar = '';

    if (state.currentCharIndex < currentWordText.length) {
      targetChar = currentWordText[state.currentCharIndex];
    } else {
      targetChar = ' ';
    }

    const lookupChar = targetChar.toLowerCase();
    const info = FINGER_MAP[lookupChar];

    // Update text callout
    state.elements.hudTargetKey.textContent = targetChar === ' ' ? 'Space' : targetChar.toUpperCase();
    state.elements.hudTargetFinger.textContent = info ? info.finger : 'Free choice';

    // 1. Highlight Key on Keyboard
    const prevTargets = state.elements.keyboardGrid.querySelectorAll('.keycap.active-target');
    prevTargets.forEach(el => el.classList.remove('active-target'));

    const targetKeyCap = state.elements.keyboardGrid.querySelector(`.keycap[data-key="${lookupChar}"]`);
    if (targetKeyCap) {
      targetKeyCap.classList.add('active-target');
    }

    // 2. Highlight Exact Finger on Flanking Hands SVGs
    const prevSvgFingers = document.querySelectorAll('.finger-group.active-finger, .finger-col.active-finger');
    prevSvgFingers.forEach(el => el.classList.remove('active-finger'));

    if (lookupChar === ' ') {
      const leftThumb = document.getElementById('finger-left-thumb');
      const rightThumb = document.getElementById('finger-right-thumb');
      if (leftThumb) leftThumb.classList.add('active-finger');
      if (rightThumb) rightThumb.classList.add('active-finger');
    } else if (info && info.fingerId) {
      const activeSvgFinger = document.getElementById(`finger-${info.fingerId}`);
      if (activeSvgFinger) {
        activeSvgFinger.classList.add('active-finger');
      }
      if (state.elements.handsDiagramContainer) {
        const activeFingerCol = state.elements.handsDiagramContainer.querySelector(`.finger-col[data-finger-id="${info.fingerId}"]`);
        if (activeFingerCol) {
          activeFingerCol.classList.add('active-finger');
        }
      }
    }
  }

  function flashPressedKeycap(key, isCorrect) {
    const lookupChar = (key === ' ' || key === 'Spacebar') ? ' ' : key.toLowerCase();
    const keycap = state.elements.keyboardGrid.querySelector(`.keycap[data-key="${lookupChar}"]`);
    if (keycap) {
      keycap.classList.add('key-pressed');
      setTimeout(() => keycap.classList.remove('key-pressed'), 120);
    }
  }

  function setKeyboardVisibility(show) {
    state.isKeyboardVisible = show;
    if (show) {
      state.elements.visualKeyboardCard.classList.remove('hidden');
      state.elements.keyboardToggleText.textContent = "Hide Keyboard Guide";
    } else {
      state.elements.visualKeyboardCard.classList.add('hidden');
      state.elements.keyboardToggleText.textContent = "Keyboard & Hands Guide";
    }
  }

  // ==========================================================================
  // TIMER PAUSE / RESUME LOGIC
  // ==========================================================================

  function togglePause() {
    if (!state.isTestActive) return;

    if (state.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }

  function pauseGame() {
    if (!state.isTestActive || state.isPaused) return;

    state.isPaused = true;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.pauseStartTime = Date.now();

    // UI Updates
    state.elements.pauseIcon.classList.add('hidden');
    state.elements.playIcon.classList.remove('hidden');
    state.elements.pauseBtnLabel.textContent = "Resume";
    state.elements.pauseTimerBtn.classList.add('paused');
    state.elements.pauseOverlay.classList.remove('hidden');
    state.elements.arenaCard.classList.remove('active-typing');
  }

  function resumeGame() {
    if (!state.isPaused) return;

    state.isPaused = false;
    if (state.pauseStartTime) {
      state.pausedDuration += (Date.now() - state.pauseStartTime);
      state.pauseStartTime = null;
    }

    // UI Updates
    state.elements.pauseIcon.classList.remove('hidden');
    state.elements.playIcon.classList.add('hidden');
    state.elements.pauseBtnLabel.textContent = "Pause";
    state.elements.pauseTimerBtn.classList.remove('paused');
    state.elements.pauseOverlay.classList.add('hidden');
    state.elements.arenaCard.classList.add('active-typing');

    // Restart Interval
    state.timerInterval = setInterval(() => {
      if (state.timeLimit === 0 || state.difficulty === 'beginner') {
        state.timeElapsedUntimed++;
        updateTimerDisplay();
        updateLiveStats();
      } else {
        state.timeRemaining--;

        updateTimerDisplay();
        updateLiveStats();

        if (state.timeRemaining <= 0) {
          clearInterval(state.timerInterval);
          state.timerInterval = null;
          finishTest();
        }
      }
    }, 1000);

    focusInput();
  }

  // ==========================================================================
  // BEGINNER TUTOR LESSON CONTROLLER
  // ==========================================================================

  function populateLessonDropdown() {
    const select = state.elements.lessonSelect;
    select.innerHTML = '';

    BEGINNER_LESSONS.forEach(lesson => {
      const opt = document.createElement('option');
      opt.value = lesson.id;
      opt.textContent = `Lesson ${lesson.id}: ${lesson.title}`;
      select.appendChild(opt);
    });
  }

  function loadLesson(lessonId) {
    const lesson = BEGINNER_LESSONS.find(l => l.id === lessonId) || BEGINNER_LESSONS[0];
    state.currentLessonId = lesson.id;

    state.elements.lessonStepBadge.textContent = `Lesson ${lesson.id} of ${BEGINNER_LESSONS.length}`;
    state.elements.lessonTitle.textContent = lesson.title;
    state.elements.lessonInstruction.innerHTML = lesson.instruction;
    state.elements.lessonSelect.value = lesson.id;

    state.elements.prevLessonBtn.disabled = lesson.id <= 1;
    state.elements.nextLessonBtn.disabled = lesson.id >= BEGINNER_LESSONS.length;

    try {
      localStorage.setItem(LESSON_KEY, lesson.id.toString());
    } catch (e) {}

    resetGame();
  }

  // ==========================================================================
  // TEXT GENERATION & CUSTOM TEMPLATES
  // ==========================================================================

  function generateText(difficulty) {
    if (difficulty === 'beginner') {
      const currentLesson = BEGINNER_LESSONS.find(l => l.id === state.currentLessonId) || BEGINNER_LESSONS[0];
      return currentLesson.drill.trim().split(/\s+/).filter(w => w.length > 0);
    }

    if (difficulty === 'custom') {
      if (state.customTemplateText && state.customTemplateText.trim().length > 0) {
        return state.customTemplateText.trim().split(/\s+/).filter(w => w.length > 0);
      }
      return PRESETS.tech.split(/\s+/);
    }

    if (difficulty === 'easy') {
      const bank = CORPORA.easy;
      const result = [];
      for (let i = 0; i < 90; i++) {
        const randWord = bank[Math.floor(Math.random() * bank.length)];
        result.push(randWord);
      }
      return result;
    }

    if (difficulty === 'medium') {
      const shuffledSentences = [...CORPORA.medium].sort(() => 0.5 - Math.random());
      const selected = shuffledSentences.slice(0, 5).join(" ");
      return selected.split(/\s+/).filter(w => w.length > 0);
    }

    if (difficulty === 'hard') {
      const shuffledHard = [...CORPORA.hard].sort(() => 0.5 - Math.random());
      const selected = shuffledHard.slice(0, 4).join(" ");
      return selected.split(/\s+/).filter(w => w.length > 0);
    }

    return CORPORA.easy.slice(0, 50);
  }

  // ==========================================================================
  // CLIENT-SIDE PDF & DOCUMENT PARSER
  // ==========================================================================

  async function extractTextFromPDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);

      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < uint8.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, uint8.subarray(i, i + chunkSize));
      }

      let extractedText = '';

      const btRegex = /BT[\s\S]*?ET/g;
      let match;
      while ((match = btRegex.exec(binary)) !== null) {
        const block = match[0];
        const tjRegex = /\(([^)]*)\)\s*Tj/g;
        let tjMatch;
        while ((tjMatch = tjRegex.exec(block)) !== null) {
          extractedText += tjMatch[1] + ' ';
        }
        const arrayTjRegex = /\[(.*?)\]\s*TJ/g;
        let atjMatch;
        while ((atjMatch = arrayTjRegex.exec(block)) !== null) {
          const inner = atjMatch[1];
          const innerRegex = /\(([^)]*)\)/g;
          let inMatch;
          while ((inMatch = innerRegex.exec(inner)) !== null) {
            extractedText += inMatch[1] + ' ';
          }
        }
      }

      if (extractedText.trim().length < 40 && typeof DecompressionStream !== 'undefined') {
        const streamStartRegex = /stream\r?\n/g;
        let sMatch;
        let streamCount = 0;

        while ((sMatch = streamStartRegex.exec(binary)) !== null && streamCount < 20) {
          streamCount++;
          const streamStart = sMatch.index + sMatch[0].length;
          const streamEnd = binary.indexOf('endstream', streamStart);

          if (streamEnd > streamStart && streamEnd - streamStart < 500000) {
            try {
              let streamData = uint8.subarray(streamStart, streamEnd);
              if (streamData.length > 2 && streamData[0] === 0x78) {
                streamData = streamData.subarray(2);
              }

              const ds = new DecompressionStream('deflate-raw');
              const writer = ds.writable.getWriter();
              writer.write(streamData);
              writer.close();

              const decompressed = await new Response(ds.readable).arrayBuffer();
              const decUint8 = new Uint8Array(decompressed);

              let decStr = '';
              for (let j = 0; j < decUint8.length; j += chunkSize) {
                decStr += String.fromCharCode.apply(null, decUint8.subarray(j, j + chunkSize));
              }

              let dMatch;
              while ((dMatch = btRegex.exec(decStr)) !== null) {
                const block = dMatch[0];
                const tjRegex = /\(([^)]*)\)\s*Tj/g;
                let tjMatch;
                while ((tjMatch = tjRegex.exec(block)) !== null) {
                  extractedText += tjMatch[1] + ' ';
                }
                const arrayTjRegex = /\[(.*?)\]\s*TJ/g;
                let atjMatch;
                while ((atjMatch = arrayTjRegex.exec(block)) !== null) {
                  const inner = atjMatch[1];
                  const innerRegex = /\(([^)]*)\)/g;
                  let inMatch;
                  while ((inMatch = innerRegex.exec(inner)) !== null) {
                    extractedText += inMatch[1] + ' ';
                  }
                }
              }
            } catch (err) {}
          }
        }
      }

      extractedText = extractedText
        .replace(/\\([()\\])/g, '$1')
        .replace(/\\r/g, ' ')
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return extractedText;
    } catch (err) {
      console.warn('PDF extraction notice:', err);
      return '';
    }
  }

  function handleFileUpload(file) {
    if (!file) return;

    const fileName = file.name || 'Custom Document';

    if (file.name.toLowerCase().endsWith('.pdf')) {
      state.elements.customTextarea.value = 'Extracting text from PDF client-side...';
      extractTextFromPDF(file).then(text => {
        if (text && text.length > 20) {
          state.elements.customTextarea.value = text;
          state.customTemplateName = fileName;
        } else {
          state.elements.customTextarea.value = `[Notice: We could not extract readable text streams directly from ${fileName}. It may contain scanned image pages. You can paste the text directly here.]`;
        }
        updateTemplateStats();
      }).catch(() => {
        state.elements.customTextarea.value = `Could not parse ${fileName}. Please paste your custom text directly below.`;
        updateTemplateStats();
      });
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        state.elements.customTextarea.value = e.target.result;
        state.customTemplateName = fileName;
        updateTemplateStats();
      };
      reader.readAsText(file);
    }
  }

  function updateTemplateStats() {
    const text = state.elements.customTextarea.value.trim();
    const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];
    const wordCount = words.length;
    const charCount = text.length;
    const estMinutes = wordCount > 0 ? (wordCount / 60).toFixed(1) : 0;

    state.elements.templateWordCount.textContent = `${wordCount} words`;
    state.elements.templateCharCount.textContent = `${charCount} characters`;
    state.elements.templateEstTime.textContent = `Est. ~${estMinutes} min`;
  }

  // ==========================================================================
  // GAME SETUP & RESET
  // ==========================================================================

  function resetGame() {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.isTestActive = false;
    state.hasStarted = false;
    state.isPaused = false;
    state.pausedDuration = 0;
    state.pauseStartTime = null;

    state.timeRemaining = state.timeLimit;
    state.timeElapsedUntimed = 0;
    state.startTime = null;
    state.totalKeystrokes = 0;
    state.correctKeystrokes = 0;
    state.incorrectKeystrokes = 0;
    state.currentWordIndex = 0;
    state.currentCharIndex = 0;
    state.wpmSamples = [];

    // Reset Pause UI
    state.elements.pauseIcon.classList.remove('hidden');
    state.elements.playIcon.classList.add('hidden');
    state.elements.pauseBtnLabel.textContent = "Pause";
    state.elements.pauseTimerBtn.classList.remove('paused');
    state.elements.pauseOverlay.classList.add('hidden');

    // Beginner Mode Setup
    if (state.difficulty === 'beginner') {
      state.elements.beginnerPanel.classList.remove('hidden');
      setKeyboardVisibility(true);
    } else {
      state.elements.beginnerPanel.classList.add('hidden');
      if (!state.isKeyboardVisible) {
        state.elements.visualKeyboardCard.classList.add('hidden');
      }
    }

    // Custom template UI indication
    if (state.difficulty === 'custom') {
      state.elements.customBanner.classList.remove('hidden');
      state.elements.customTemplateName.textContent = state.customTemplateName || 'Document';
    } else {
      state.elements.customBanner.classList.add('hidden');
    }

    // Reset UI displays
    updateTimerDisplay();
    updateLiveStats();
    resetProgressBar();

    // Generate and render fresh words
    state.words = generateText(state.difficulty);
    renderWordsDOM();

    // Reset container scroll offset
    state.elements.wordsContainer.style.top = '0px';

    setTimeout(() => {
      updateCaretPosition();
      updateVisualTargetKey();
    }, 15);

    hideModal(state.elements.resultsModal);
    hideModal(state.elements.lessonPassedModal);

    focusInput();
  }

  function renderWordsDOM() {
    const container = state.elements.wordsContainer;
    container.innerHTML = '';

    state.words.forEach((wordText, wIdx) => {
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word' + (wIdx === 0 ? ' active' : '');
      wordDiv.dataset.index = wIdx;

      for (let cIdx = 0; cIdx < wordText.length; cIdx++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = wordText[cIdx];
        charSpan.dataset.charIndex = cIdx;
        wordDiv.appendChild(charSpan);
      }

      container.appendChild(wordDiv);
    });
  }

  function appendMoreWords() {
    if (state.difficulty === 'custom' || state.difficulty === 'beginner') return;

    const additionalWords = generateText(state.difficulty);
    const container = state.elements.wordsContainer;
    const startIndex = state.words.length;

    state.words.push(...additionalWords);

    additionalWords.forEach((wordText, idx) => {
      const wIdx = startIndex + idx;
      const wordDiv = document.createElement('div');
      wordDiv.className = 'word';
      wordDiv.dataset.index = wIdx;

      for (let cIdx = 0; cIdx < wordText.length; cIdx++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = wordText[cIdx];
        charSpan.dataset.charIndex = cIdx;
        wordDiv.appendChild(charSpan);
      }

      container.appendChild(wordDiv);
    });
  }

  // ==========================================================================
  // INPUT HANDLING & CORE TYPING LOGIC
  // ==========================================================================

  function handleKeyDown(e) {
    if (e.getModifierState) {
      const isCaps = e.getModifierState('CapsLock');
      toggleCapsLockWarning(isCaps);
    }

    // Global Shortcuts
    if (e.key === 'Tab') {
      e.preventDefault();
      resetGame();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      resetGame();
      return;
    }

    // Alt + Space: Toggle Pause
    if (e.altKey && (e.code === 'Space' || e.key === ' ')) {
      e.preventDefault();
      togglePause();
      return;
    }

    if (e.altKey && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      toggleSound();
      return;
    }

    if (e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      showModal(state.elements.customTemplateModal);
      return;
    }

    if (e.altKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      activateBeginnerMode();
      return;
    }

    if (e.altKey && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      setKeyboardVisibility(!state.isKeyboardVisible);
      return;
    }

    // If game is paused, hitting any key unpauses!
    if (state.isPaused) {
      e.preventDefault();
      resumeGame();
      return;
    }

    // Enter handles retry or advance
    if (!state.elements.resultsModal.classList.contains('hidden') || !state.elements.lessonPassedModal.classList.contains('hidden')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!state.elements.lessonPassedModal.classList.contains('hidden')) {
          advanceToNextLesson();
        } else {
          resetGame();
        }
        return;
      }
    }

    // Ignore typing when modals are open
    if (!state.elements.customTemplateModal.classList.contains('hidden') ||
        !state.elements.recordsModal.classList.contains('hidden') ||
        !state.elements.aboutModal.classList.contains('hidden') ||
        !state.elements.privacyModal.classList.contains('hidden') ||
        !state.elements.termsModal.classList.contains('hidden') ||
        !state.elements.shortcutsModal.classList.contains('hidden') ||
        !state.elements.lessonPassedModal.classList.contains('hidden')) {
      return;
    }

    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length > 1 && e.key !== 'Backspace' && e.key !== ' ') return;

    if (!state.hasStarted && !state.isTestActive) {
      if (e.key === 'Backspace') return;
      startTestTimer();
    }

    if (!state.isTestActive) return;

    processKey(e.key, e);
  }

  function processKey(key, originalEvent) {
    const currentWordEl = state.elements.wordsContainer.children[state.currentWordIndex];
    if (!currentWordEl) return;

    const currentWordText = state.words[state.currentWordIndex];
    const chars = currentWordEl.querySelectorAll('.char');

    // Case 1: Backspace
    if (key === 'Backspace') {
      if (originalEvent) originalEvent.preventDefault();

      if (state.currentCharIndex > 0) {
        state.currentCharIndex--;
        const targetChar = chars[state.currentCharIndex];

        if (targetChar.classList.contains('extra')) {
          targetChar.remove();
        } else {
          targetChar.classList.remove('correct', 'incorrect');
        }

        updateCaretPosition();
        updateVisualTargetKey();
      } else if (state.currentCharIndex === 0 && state.currentWordIndex > 0) {
        const prevWordEl = state.elements.wordsContainer.children[state.currentWordIndex - 1];
        if (prevWordEl && prevWordEl.classList.contains('has-error')) {
          currentWordEl.classList.remove('active');
          state.currentWordIndex--;
          prevWordEl.classList.add('active');
          prevWordEl.classList.remove('has-error');

          const prevChars = prevWordEl.querySelectorAll('.char');
          state.currentCharIndex = prevChars.length;
          updateCaretPosition();
          adjustWordScroll();
          updateVisualTargetKey();
        }
      }
      return;
    }

    // Case 2: Spacebar (Word Completion)
    if (key === ' ' || key === 'Spacebar') {
      if (originalEvent) originalEvent.preventDefault();

      if (state.currentCharIndex === 0) return;

      state.totalKeystrokes++;
      flashPressedKeycap(' ', true);

      let wordHasError = false;
      const currentWordChars = currentWordEl.querySelectorAll('.char');

      if (state.currentCharIndex < currentWordText.length) {
        wordHasError = true;
        for (let i = state.currentCharIndex; i < currentWordText.length; i++) {
          currentWordChars[i].classList.add('incorrect');
          state.incorrectKeystrokes++;
        }
      }

      currentWordChars.forEach(c => {
        if (c.classList.contains('incorrect') || c.classList.contains('extra')) {
          wordHasError = true;
        }
      });

      if (wordHasError) {
        currentWordEl.classList.add('has-error');
        state.incorrectKeystrokes++;
        audioEngine.playError();
      } else {
        state.correctKeystrokes++;
        audioEngine.playClick();
      }

      currentWordEl.classList.remove('active');
      state.currentWordIndex++;
      state.currentCharIndex = 0;

      if (state.currentWordIndex >= state.words.length) {
        finishTest();
        return;
      }

      if (state.difficulty !== 'custom' && state.difficulty !== 'beginner' && state.currentWordIndex >= state.words.length - 10) {
        appendMoreWords();
      }

      const nextWordEl = state.elements.wordsContainer.children[state.currentWordIndex];
      if (nextWordEl) {
        nextWordEl.classList.add('active');
      }

      updateCaretPosition();
      adjustWordScroll();
      updateLiveStats();
      updateVisualTargetKey();
      return;
    }

    // Case 3: Standard Character Typed
    if (originalEvent) originalEvent.preventDefault();
    state.totalKeystrokes++;

    if (state.currentCharIndex < currentWordText.length) {
      const expectedChar = currentWordText[state.currentCharIndex];
      const charSpan = chars[state.currentCharIndex];

      if (key === expectedChar) {
        charSpan.classList.add('correct');
        charSpan.classList.remove('incorrect');
        state.correctKeystrokes++;
        audioEngine.playClick();
        flashPressedKeycap(key, true);
      } else {
        charSpan.classList.add('incorrect');
        charSpan.classList.remove('correct');
        state.incorrectKeystrokes++;
        audioEngine.playError();
        flashPressedKeycap(key, false);
      }

      state.currentCharIndex++;

      if (state.currentWordIndex === state.words.length - 1 && state.currentCharIndex === currentWordText.length) {
        if (state.timeLimit === 0 || state.difficulty === 'beginner') {
          finishTest();
          return;
        }
      }
    } else {
      // Word is complete — only space should advance; ignore extra chars
      // Count as an error but don't add extra span characters
      state.incorrectKeystrokes++;
      audioEngine.playError();
      flashPressedKeycap(key, false);
    }

    updateCaretPosition();
    updateLiveStats();
    updateVisualTargetKey();
  }

  // ==========================================================================
  // CARET & SCROLL POSITIONING
  // ==========================================================================

  function updateCaretPosition() {
    const caret = state.elements.smoothCaret;
    const currentWordEl = state.elements.wordsContainer.children[state.currentWordIndex];
    if (!currentWordEl) return;

    caret.classList.add('typing');
    clearTimeout(caret._typingTimer);
    caret._typingTimer = setTimeout(() => caret.classList.remove('typing'), 500);

    const chars = currentWordEl.querySelectorAll('.char');
    const viewportRect = state.elements.wordsViewport.getBoundingClientRect();

    if (state.currentCharIndex < chars.length) {
      const targetChar = chars[state.currentCharIndex];
      const charRect = targetChar.getBoundingClientRect();

      caret.style.left = `${charRect.left - viewportRect.left}px`;
      caret.style.top = `${charRect.top - viewportRect.top}px`;
      caret.style.height = `${charRect.height}px`;
    } else if (chars.length > 0) {
      const lastChar = chars[chars.length - 1];
      const charRect = lastChar.getBoundingClientRect();

      caret.style.left = `${charRect.right - viewportRect.left}px`;
      caret.style.top = `${charRect.top - viewportRect.top}px`;
      caret.style.height = `${charRect.height}px`;
    } else {
      const wordRect = currentWordEl.getBoundingClientRect();
      caret.style.left = `${wordRect.left - viewportRect.left}px`;
      caret.style.top = `${wordRect.top - viewportRect.top}px`;
      caret.style.height = `${wordRect.height || 28}px`;
    }
  }

  function adjustWordScroll() {
    const currentWordEl = state.elements.wordsContainer.children[state.currentWordIndex];
    if (!currentWordEl) return;

    const currentWordTop = currentWordEl.offsetTop;
    const wordsContainer = state.elements.wordsContainer;

    if (currentWordTop > 45) {
      const shiftY = currentWordTop - 40;
      wordsContainer.style.top = `-${shiftY}px`;
    } else {
      wordsContainer.style.top = '0px';
    }
  }

  // ==========================================================================
  // TIMER & LIVE METRICS
  // ==========================================================================

  function startTestTimer() {
    state.hasStarted = true;
    state.isTestActive = true;
    state.isPaused = false;
    state.pausedDuration = 0;
    state.startTime = Date.now();
    state.elements.arenaCard.classList.add('active-typing');

    state.timerInterval = setInterval(() => {
      if (state.timeLimit === 0 || state.difficulty === 'beginner') {
        state.timeElapsedUntimed++;
        updateTimerDisplay();
        updateLiveStats();
      } else {
        state.timeRemaining--;

        updateTimerDisplay();
        updateLiveStats();

        if (state.timeRemaining <= 0) {
          clearInterval(state.timerInterval);
          state.timerInterval = null;
          finishTest();
        }
      }
    }, 1000);
  }

  function formatTimerValue(totalSeconds) {
    if (totalSeconds < 60) return { value: String(totalSeconds), unit: 's' };
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return { value: `${mins}:${String(secs).padStart(2, '0')}`, unit: '' };
  }

  function updateTimerDisplay() {
    if (state.timeLimit === 0 || state.difficulty === 'beginner') {
      state.elements.hudTimerLabel.textContent = "Elapsed";
      const fmt = formatTimerValue(state.timeElapsedUntimed);
      state.elements.hudTimer.textContent = fmt.value;
      state.elements.hudTimerUnit.textContent = fmt.unit;

      const totalWords = state.words.length || 1;
      const progress = Math.min(1, state.currentWordIndex / totalWords);
      state.elements.timerProgressBar.style.transform = `scaleX(${progress})`;

      const ring = state.elements.timerProgressRing;
      const circumference = 2 * Math.PI * 18;
      ring.style.strokeDasharray = `${circumference}`;
      ring.style.strokeDashoffset = `${circumference * (1 - progress)}`;
      ring.classList.remove('warning');
    } else {
      state.elements.hudTimerLabel.textContent = "Time Left";
      const fmt = formatTimerValue(state.timeRemaining);
      state.elements.hudTimer.textContent = fmt.value;
      state.elements.hudTimerUnit.textContent = fmt.unit;

      const radius = 18;
      const circumference = 2 * Math.PI * radius;
      const progress = state.timeRemaining / state.timeLimit;
      const offset = circumference * (1 - progress);

      const ring = state.elements.timerProgressRing;
      ring.style.strokeDasharray = `${circumference}`;
      ring.style.strokeDashoffset = `${offset}`;

      if (state.timeRemaining <= 5 && state.isTestActive) {
        ring.classList.add('warning');
      } else {
        ring.classList.remove('warning');
      }

      state.elements.timerProgressBar.style.transform = `scaleX(${progress})`;
    }
  }

  function resetProgressBar() {
    state.elements.timerProgressBar.style.transform = 'scaleX(1)';
    const ring = state.elements.timerProgressRing;
    ring.classList.remove('warning');
    const circumference = 2 * Math.PI * 18;
    ring.style.strokeDashoffset = '0';
  }

  function calculateWPM() {
    if (!state.startTime) return 0;

    const actualTimeMs = (Date.now() - state.startTime) - state.pausedDuration;
    const elapsedSeconds = actualTimeMs / 1000;
    if (elapsedSeconds < 1) return 0;

    const minutes = elapsedSeconds / 60;
    const correctChars = state.correctKeystrokes;
    const netWpm = Math.round((correctChars / 5) / minutes);

    return Math.max(0, netWpm);
  }

  function calculateRawWPM() {
    if (!state.startTime) return 0;
    const actualTimeMs = (Date.now() - state.startTime) - state.pausedDuration;
    const elapsedSeconds = actualTimeMs / 1000;
    if (elapsedSeconds < 1) return 0;
    const minutes = elapsedSeconds / 60;
    const rawWpm = Math.round((state.totalKeystrokes / 5) / minutes);
    return Math.max(0, rawWpm);
  }

  function calculateAccuracy() {
    if (state.totalKeystrokes === 0) return 100;
    const acc = Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100);
    return Math.min(100, Math.max(0, acc));
  }

  function updateLiveStats() {
    const liveWpm = calculateWPM();
    const liveAcc = calculateAccuracy();

    state.elements.hudWpm.textContent = liveWpm;
    state.elements.hudAccuracy.textContent = liveAcc;
    state.elements.hudCorrect.textContent = state.correctKeystrokes;
    state.elements.hudIncorrect.textContent = state.incorrectKeystrokes;

    if (state.isTestActive && !state.isPaused) {
      state.wpmSamples.push(liveWpm);
    }
  }

  // ==========================================================================
  // TEST COMPLETION & RESULTS
  // ==========================================================================

  function finishTest() {
    state.isTestActive = false;
    state.isPaused = false;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.elements.arenaCard.classList.remove('active-typing');

    const totalActiveMs = state.startTime ? ((Date.now() - state.startTime) - state.pausedDuration) : 30000;
    const actualElapsed = Math.max(1, totalActiveMs / 1000);
    const effectiveTime = (state.timeLimit === 0 || state.difficulty === 'beginner') ? Math.round(actualElapsed) : (state.timeRemaining <= 0 ? state.timeLimit : Math.round(actualElapsed));
    const minutes = effectiveTime / 60;

    const finalWpmVal = minutes > 0 ? Math.max(0, Math.round((state.correctKeystrokes / 5) / minutes)) : 0;
    const finalRawWpmVal = minutes > 0 ? Math.max(0, Math.round((state.totalKeystrokes / 5) / minutes)) : 0;
    const finalAccuracyVal = calculateAccuracy();
    const totalChars = state.totalKeystrokes;
    const correctChars = state.correctKeystrokes;
    const incorrectChars = state.incorrectKeystrokes;

    if (state.difficulty === 'beginner') {
      handleBeginnerLessonCompletion(finalWpmVal, finalAccuracyVal);
      return;
    }

    const consistencyVal = calculateConsistency(state.wpmSamples);

    const isNewPB = saveRecord({
      difficulty: state.difficulty,
      timeLimit: state.timeLimit === 0 ? 'Untimed' : state.timeLimit,
      wpm: finalWpmVal,
      accuracy: finalAccuracyVal,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    });

    const tier = getSpeedTier(finalWpmVal);

    state.elements.resultTierBadge.textContent = tier.title;
    state.elements.resultTierBadge.style.color = tier.color;

    if (isNewPB) {
      state.elements.newPbBadge.classList.remove('hidden');
    } else {
      state.elements.newPbBadge.classList.add('hidden');
    }

    const diffLabel = state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
    const timeLabel = state.timeLimit === 0 ? "Complete Document" : `${state.timeLimit} Seconds`;
    state.elements.resultModeMeta.textContent = `${diffLabel} Mode • ${timeLabel}`;

    state.elements.finalWpm.textContent = finalWpmVal;
    state.elements.finalRawWpm.textContent = `Raw: ${finalRawWpmVal} WPM`;
    state.elements.finalAccuracy.textContent = finalAccuracyVal;
    state.elements.finalConsistency.textContent = `Consistency: ${consistencyVal}%`;

    state.elements.finalTotalChars.textContent = totalChars;
    state.elements.finalCorrectChars.textContent = `${correctChars} correct`;
    state.elements.finalIncorrectChars.textContent = `${incorrectChars} wrong`;

    state.elements.finalTimeElapsed.textContent = effectiveTime;
    const kps = effectiveTime > 0 ? (totalChars / effectiveTime).toFixed(1) : 0;
    state.elements.finalKeystrokePace.textContent = `${kps} keys/sec`;

    showModal(state.elements.resultsModal);
    renderPersonalRecordsTable();
  }

  function handleBeginnerLessonCompletion(wpm, accuracy) {
    const passed = accuracy >= 85;

    state.elements.lessonPassedAcc.textContent = `${accuracy}%`;
    state.elements.lessonPassedWpm.textContent = `${wpm} WPM`;

    if (passed) {
      state.elements.lessonPassedTitle.textContent = "Lesson Passed! 🎉";
      state.elements.lessonPassedSubtitle.textContent = `Excellent finger discipline! Ready for Lesson ${Math.min(BEGINNER_LESSONS.length, state.currentLessonId + 1)}.`;
      state.elements.advanceLessonBtn.classList.remove('hidden');
    } else {
      state.elements.lessonPassedTitle.textContent = "Keep Practicing! 💪";
      state.elements.lessonPassedSubtitle.textContent = "Touch typing takes patience. Aim for 85%+ accuracy to master this finger reach.";
      state.elements.advanceLessonBtn.classList.add('hidden');
    }

    showModal(state.elements.lessonPassedModal);
  }

  function advanceToNextLesson() {
    hideModal(state.elements.lessonPassedModal);
    if (state.currentLessonId < BEGINNER_LESSONS.length) {
      loadLesson(state.currentLessonId + 1);
    } else {
      alert("🏆 Congratulations! You have completed all 10 Beginner Touch Typing Lessons! You are now ready for Easy, Medium, and Hard challenges.");
      activateMode('easy');
    }
  }

  function calculateConsistency(samples) {
    if (!samples || samples.length <= 1) return 96;
    const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
    if (avg === 0) return 100;
    const variance = samples.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / samples.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = (stdDev / avg) * 100;
    const consistency = Math.round(100 - coefficientOfVariation);
    return Math.min(100, Math.max(30, consistency));
  }

  function getSpeedTier(wpm) {
    if (wpm >= 120) return { title: "⚡ Godspeed Legend", color: "#38bdf8" };
    if (wpm >= 90) return { title: "🚀 Master Typer", color: "#22d3ee" };
    if (wpm >= 70) return { title: "🔥 Pro Typist", color: "#10b981" };
    if (wpm >= 50) return { title: "✨ Fluent Typer", color: "#34d399" };
    if (wpm >= 35) return { title: "🌱 Speed Apprentice", color: "#f59e0b" };
    return { title: "🐣 Beginner Bud", color: "#94a3b8" };
  }

  // ==========================================================================
  // LOCAL STORAGE & PERSONAL RECORDS
  // ==========================================================================

  function getSavedRecords() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable');
    }

    return {
      bestWpm: 0,
      bestWpmMode: 'None',
      bestAccuracy: 0,
      bestAccMode: 'None',
      totalTests: 0,
      categories: {}
    };
  }

  function saveRecord(result) {
    const store = getSavedRecords();
    let isNewBest = false;

    store.totalTests = (store.totalTests || 0) + 1;

    const catKey = `${result.difficulty}_${result.timeLimit}`;
    const existingCat = store.categories[catKey];

    if (!existingCat || result.wpm > existingCat.wpm) {
      store.categories[catKey] = {
        wpm: result.wpm,
        accuracy: result.accuracy,
        date: result.date
      };
      isNewBest = true;
    }

    if (result.wpm > (store.bestWpm || 0)) {
      store.bestWpm = result.wpm;
      store.bestWpmMode = `${result.difficulty.toUpperCase()} ${result.timeLimit}${typeof result.timeLimit === 'number' ? 's' : ''}`;
      isNewBest = true;
    }

    if (result.accuracy > (store.bestAccuracy || 0)) {
      store.bestAccuracy = result.accuracy;
      store.bestAccMode = `${result.difficulty.toUpperCase()} ${result.timeLimit}${typeof result.timeLimit === 'number' ? 's' : ''}`;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.warn('Could not save to LocalStorage');
    }

    return isNewBest;
  }

  function renderPersonalRecordsTable() {
    const store = getSavedRecords();

    state.elements.recordBestWpm.textContent = store.bestWpm || 0;
    state.elements.recordBestWpmMode.textContent = store.bestWpmMode || 'No records yet';

    state.elements.recordBestAccuracy.textContent = store.bestAccuracy || 0;
    state.elements.recordBestAccMode.textContent = store.bestAccMode || 'No records yet';

    state.elements.recordTotalTests.textContent = store.totalTests || 0;

    const tbody = state.elements.recordsTableBody;
    tbody.innerHTML = '';

    const categories = ['easy', 'medium', 'hard', 'custom'];
    const timeLimits = [15, 30, 60, 120, 180, 300, 'Untimed'];
    let hasAnyCategory = false;

    categories.forEach(diff => {
      timeLimits.forEach(time => {
        const key = `${diff}_${time}`;
        const record = store.categories && store.categories[key];

        if (record) {
          hasAnyCategory = true;
          const tr = document.createElement('tr');
          const timeDisplay = typeof time === 'number' ? `${time}s` : time;
          tr.innerHTML = `
            <td style="text-transform: capitalize; font-weight: 600;">${diff}</td>
            <td>${timeDisplay}</td>
            <td style="color: var(--accent-cyan); font-weight: 700;">${record.wpm} WPM</td>
            <td style="color: var(--accent-emerald-bright);">${record.accuracy}%</td>
            <td style="color: var(--text-muted); font-size: 0.8rem;">${record.date}</td>
          `;
          tbody.appendChild(tr);
        }
      });
    });

    if (!hasAnyCategory) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
          No tests logged yet. Complete a test to establish your first record!
        </td>
      `;
      tbody.appendChild(tr);
    }
  }

  function clearAllRecords() {
    if (confirm('Are you sure you want to clear your TypeBud personal records? This cannot be undone.')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      renderPersonalRecordsTable();
    }
  }

  // ==========================================================================
  // PREFERENCES & PORTFOLIO
  // ==========================================================================

  function loadPreferences() {
    try {
      const savedSound = localStorage.getItem(SOUND_KEY);
      if (savedSound !== null) {
        state.soundEnabled = savedSound === 'true';
      }
      const savedLesson = localStorage.getItem(LESSON_KEY);
      if (savedLesson) {
        state.currentLessonId = parseInt(savedLesson, 10) || 1;
      }
      const savedPortfolio = localStorage.getItem(PORTFOLIO_KEY);
      if (savedPortfolio) {
        state.portfolioUrl = savedPortfolio;
      }
    } catch (e) {}

    updateSoundUI();
    updatePortfolioUI();
  }

  function updatePortfolioUI() {
    if (state.elements.creatorCardPortfolioLink) {
      state.elements.creatorCardPortfolioLink.href = state.portfolioUrl;
    }
    if (state.elements.footerPortfolioLink) {
      state.elements.footerPortfolioLink.href = state.portfolioUrl;
    }
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    try {
      localStorage.setItem(SOUND_KEY, state.soundEnabled ? 'true' : 'false');
    } catch (e) {}
    updateSoundUI();
  }

  function updateSoundUI() {
    if (state.soundEnabled) {
      state.elements.soundOnIcon.classList.remove('hidden');
      state.elements.soundOffIcon.classList.add('hidden');
      state.elements.soundToggle.setAttribute('title', 'Mute Sound (Alt + M)');
    } else {
      state.elements.soundOnIcon.classList.add('hidden');
      state.elements.soundOffIcon.classList.remove('hidden');
      state.elements.soundToggle.setAttribute('title', 'Enable Sound (Alt + M)');
    }
  }

  // ==========================================================================
  // MODALS & OVERLAYS
  // ==========================================================================

  function showModal(modalEl) {
    modalEl.classList.remove('hidden');
  }

  function hideModal(modalEl) {
    modalEl.classList.add('hidden');
  }

  function toggleCapsLockWarning(isCaps) {
    if (isCaps) {
      state.elements.capsIndicator.classList.remove('hidden');
    } else {
      state.elements.capsIndicator.classList.add('hidden');
    }
  }

  function focusInput() {
    if (state.elements.hiddenInput && !state.isPaused) {
      state.elements.hiddenInput.focus();
    }
  }

  function handleBlur() {
    // No focus overlay - silently handle blur
  }

  function copyResultsSummary() {
    const wpm = state.elements.finalWpm.textContent;
    const acc = state.elements.finalAccuracy.textContent;
    const diff = state.difficulty.toUpperCase();
    const time = state.timeLimit === 0 ? "Complete" : `${state.timeLimit}s`;
    const summary = `⚡ TypeBud Result ⚡\nSpeed: ${wpm} WPM | Accuracy: ${acc}%\nMode: ${diff} (${time})\nPractice. Improve. Type Faster.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(summary).then(() => {
        state.elements.shareBtnText.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          state.elements.shareBtnText.textContent = 'Copy Result';
        }, 2000);
      }).catch(() => fallbackCopy(summary));
    } else {
      fallbackCopy(summary);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      state.elements.shareBtnText.textContent = 'Copied!';
      setTimeout(() => {
        state.elements.shareBtnText.textContent = 'Copy Result';
      }, 2000);
    } catch (e) {}
    document.body.removeChild(ta);
  }

  function activateBeginnerMode() {
    state.difficulty = 'beginner';
    state.elements.difficultyPills.forEach(p => {
      p.classList.toggle('active', p.dataset.difficulty === 'beginner');
    });
    loadLesson(state.currentLessonId);
  }

  function activateMode(diff) {
    state.difficulty = diff;
    state.elements.difficultyPills.forEach(p => {
      p.classList.toggle('active', p.dataset.difficulty === diff);
    });
    resetGame();
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================

  function bindEvents() {
    window.addEventListener('keydown', handleKeyDown);

    state.elements.hiddenInput.addEventListener('input', (e) => {
      if (e.data && !state.isPaused) {
        processKey(e.data);
      }
      state.elements.hiddenInput.value = '';
    });

    state.elements.arenaCard.addEventListener('click', focusInput);
    window.addEventListener('blur', handleBlur);

    state.elements.restartBtn.addEventListener('click', () => {
      resetGame();
      focusInput();
    });

    // Pause timer controls
    state.elements.pauseTimerBtn.addEventListener('click', togglePause);
    state.elements.resumeTestBtn.addEventListener('click', resumeGame);

    state.elements.soundToggle.addEventListener('click', toggleSound);

    // Beginner header trigger
    state.elements.tutorHeaderBtn.addEventListener('click', activateBeginnerMode);
    state.elements.footerTutorBtn.addEventListener('click', activateBeginnerMode);

    // Mode Selection Pills
    state.elements.difficultyPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const targetDiff = pill.dataset.difficulty;
        if (targetDiff === 'beginner') {
          activateBeginnerMode();
          return;
        }

        if (targetDiff === 'custom') {
          if (!state.customTemplateText) {
            state.elements.customTextarea.value = PRESETS.tech;
            updateTemplateStats();
            showModal(state.elements.customTemplateModal);
            return;
          }
        }

        state.elements.difficultyPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.difficulty = targetDiff;
        resetGame();
      });
    });

    // Time Selection Pills
    state.elements.timePills.forEach(pill => {
      pill.addEventListener('click', () => {
        state.elements.timePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.timeLimit = parseInt(pill.dataset.time, 10);
        resetGame();
      });
    });

    // Beginner Lesson Navigation
    state.elements.prevLessonBtn.addEventListener('click', () => {
      if (state.currentLessonId > 1) {
        loadLesson(state.currentLessonId - 1);
      }
    });

    state.elements.nextLessonBtn.addEventListener('click', () => {
      if (state.currentLessonId < BEGINNER_LESSONS.length) {
        loadLesson(state.currentLessonId + 1);
      }
    });

    state.elements.lessonSelect.addEventListener('change', (e) => {
      loadLesson(parseInt(e.target.value, 10));
    });

    // Lesson Passed Modal Buttons
    state.elements.retryLessonBtn.addEventListener('click', () => {
      hideModal(state.elements.lessonPassedModal);
      resetGame();
    });

    state.elements.advanceLessonBtn.addEventListener('click', advanceToNextLesson);

    // Visual Keyboard Toggles
    state.elements.toggleKeyboardBtn.addEventListener('click', () => {
      setKeyboardVisibility(false);
    });

    state.elements.toggleKeyboardGlobalBtn.addEventListener('click', () => {
      setKeyboardVisibility(!state.isKeyboardVisible);
    });

    // Custom / PDF Template Buttons & Modal
    state.elements.pdfTemplateBtn.addEventListener('click', () => {
      if (!state.elements.customTextarea.value) {
        state.elements.customTextarea.value = PRESETS.tech;
      }
      updateTemplateStats();
      showModal(state.elements.customTemplateModal);
    });

    state.elements.editCustomTemplateBtn.addEventListener('click', () => {
      showModal(state.elements.customTemplateModal);
    });

    state.elements.closeCustomModalBtn.addEventListener('click', () => {
      hideModal(state.elements.customTemplateModal);
      focusInput();
    });

    state.elements.cancelCustomBtn.addEventListener('click', () => {
      hideModal(state.elements.customTemplateModal);
      focusInput();
    });

    // Dropzone & File Input
    state.elements.templateFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0]);
      }
    });

    const dropzone = state.elements.fileDropzone;
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt.files && dt.files[0]) {
        handleFileUpload(dt.files[0]);
      }
    });

    // Presets
    state.elements.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.dataset.preset;
        if (PRESETS[presetKey]) {
          state.elements.customTextarea.value = PRESETS[presetKey];
          state.customTemplateName = btn.textContent.replace(/^[^\w]+/, '').trim();
          updateTemplateStats();
        }
      });
    });

    state.elements.customTextarea.addEventListener('input', updateTemplateStats);

    state.elements.applyCustomBtn.addEventListener('click', () => {
      const text = state.elements.customTextarea.value.trim();
      if (!text) {
        alert('Please enter or upload text to use as a template.');
        return;
      }

      state.customTemplateText = text;
      state.difficulty = 'custom';

      state.elements.difficultyPills.forEach(p => {
        p.classList.toggle('active', p.dataset.difficulty === 'custom');
      });

      hideModal(state.elements.customTemplateModal);
      resetGame();
      focusInput();
    });

    // Results Modal Buttons
    state.elements.modalRestartBtn.addEventListener('click', resetGame);
    state.elements.modalShareBtn.addEventListener('click', copyResultsSummary);
    state.elements.modalChangeDiffBtn.addEventListener('click', () => {
      hideModal(state.elements.resultsModal);
      const diffs = ['beginner', 'easy', 'medium', 'hard'];
      const nextIdx = (diffs.indexOf(state.difficulty) + 1) % diffs.length;
      activateMode(diffs[nextIdx]);
    });

    // Records Modal
    state.elements.recordsBtn.addEventListener('click', () => {
      renderPersonalRecordsTable();
      showModal(state.elements.recordsModal);
    });

    state.elements.closeRecordsBtn.addEventListener('click', () => {
      hideModal(state.elements.recordsModal);
      focusInput();
    });

    state.elements.recordsDoneBtn.addEventListener('click', () => {
      hideModal(state.elements.recordsModal);
      focusInput();
    });

    state.elements.clearRecordsBtn.addEventListener('click', clearAllRecords);

    // About Modal, Photo Upload & Portfolio Link Customizer
    state.elements.aboutBtn.addEventListener('click', () => showModal(state.elements.aboutModal));
    state.elements.footerAboutBtn.addEventListener('click', () => showModal(state.elements.aboutModal));
    state.elements.closeAboutBtn.addEventListener('click', () => {
      hideModal(state.elements.aboutModal);
      focusInput();
    });
    state.elements.aboutDoneBtn.addEventListener('click', () => {
      hideModal(state.elements.aboutModal);
      focusInput();
    });

    // Privacy Modal
    state.elements.footerPrivacyBtn.addEventListener('click', () => showModal(state.elements.privacyModal));
    state.elements.closePrivacyBtn.addEventListener('click', () => {
      hideModal(state.elements.privacyModal);
      focusInput();
    });
    state.elements.privacyDoneBtn.addEventListener('click', () => {
      hideModal(state.elements.privacyModal);
      focusInput();
    });

    // Terms Modal
    state.elements.footerTermsBtn.addEventListener('click', () => showModal(state.elements.termsModal));
    state.elements.closeTermsBtn.addEventListener('click', () => {
      hideModal(state.elements.termsModal);
      focusInput();
    });
    state.elements.termsDoneBtn.addEventListener('click', () => {
      hideModal(state.elements.termsModal);
      focusInput();
    });

    // Footer custom button
    state.elements.footerCustomBtn.addEventListener('click', () => {
      if (!state.elements.customTextarea.value) {
        state.elements.customTextarea.value = PRESETS.tech;
      }
      updateTemplateStats();
      showModal(state.elements.customTemplateModal);
    });

    // Shortcuts Modal
    state.elements.shortcutsBtn.addEventListener('click', () => showModal(state.elements.shortcutsModal));
    state.elements.closeShortcutsBtn.addEventListener('click', () => {
      hideModal(state.elements.shortcutsModal);
      focusInput();
    });
    state.elements.shortcutsDoneBtn.addEventListener('click', () => {
      hideModal(state.elements.shortcutsModal);
      focusInput();
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          hideModal(modal);
          focusInput();
        }
      });
    });

    window.addEventListener('resize', () => {
      updateCaretPosition();
      adjustWordScroll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
