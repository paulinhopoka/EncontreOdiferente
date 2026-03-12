import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Maximize, Settings, Play, ArrowLeft, Youtube, ThumbsUp, MessageCircle, Type, Palette, Sparkles, Music, Layers, Grid } from 'lucide-react';

type Language = 'pt' | 'en' | 'es';

interface PhaseData {
  normalImage: string | null;
  differentImage: string | null;
  rows: number;
  cols: number;
  targetRow: number;
  targetCol: number;
  randomizeTarget: boolean;
}

interface Config {
  language: Language;
  rows: number;
  cols: number;
  timeLimit: number;
  bgColor1: string;
  bgColor2: string;
  gridColor: string;
  textColor: string;
  titleLine1: string;
  titleLine2: string;
  emoji: string;
  totalPhases: number;
  phasesData: PhaseData[];
  channelName: string;
  backgroundStyle: 'none' | 'random' | 'animated' | 'bg1' | 'bg2' | 'bg3' | 'bg4' | 'bg5';
  transitionTime: number;
  isRandomMode: boolean;
  bgMusic: string | null;
  bgMusicVolume: number;
  transitionText: string;
  likePhase: number | null;
  subscribePhase: number | null;
  commentPhase: number | null;
  enableExtraEmojis: boolean;
  targetBoxStyle: 'question' | 'shadow';
  transitionType: 'default' | 'whirlpool' | 'none';
  titleShineInterval: number;
  enableBorderShine: boolean;
  enableClawShine: boolean;
  titleScale: number;
  titleYOffset: number;
  gridSizeMode: 'global' | 'individual' | 'random';
  randomDifficulty: 'easy' | 'normal' | 'hard';
}

const defaultConfig: Config = {
  language: 'pt',
  rows: 4,
  cols: 4,
  timeLimit: 10,
  bgColor1: '#6a82fb',
  bgColor2: '#fc5c7d',
  gridColor: '#ffd700',
  textColor: '#ffffff',
  titleLine1: 'ENCONTRE',
  titleLine2: 'DIFERENTE',
  emoji: '😉',
  totalPhases: 1,
  phasesData: [{ normalImage: null, differentImage: null, rows: 4, cols: 4, targetRow: 0, targetCol: 0, randomizeTarget: true }],
  channelName: '@MACAQUIZ',
  backgroundStyle: 'random',
  transitionTime: 0.5,
  isRandomMode: false,
  bgMusic: null,
  bgMusicVolume: 0.5,
  transitionText: 'PREPARE-SE!',
  likePhase: null,
  subscribePhase: null,
  commentPhase: null,
  enableExtraEmojis: false,
  targetBoxStyle: 'question',
  transitionType: 'default',
  titleShineInterval: 5,
  enableBorderShine: false,
  enableClawShine: false,
  titleScale: 1,
  titleYOffset: 0,
  gridSizeMode: 'global',
  randomDifficulty: 'normal',
};

const t = {
  pt: {
    setup: 'Configuração',
    start: 'Iniciar Jogo',
    rows: 'Linhas',
    cols: 'Colunas',
    time: 'Tempo (s)',
    phases: 'Fases',
    normalImg: 'Imagem Normal',
    diffImg: 'Imagem Diferente',
    title1: 'Título Linha 1',
    title2: 'Título Linha 2',
    target: 'Selecione o alvo na grade abaixo:',
    bgColors: 'Cores de Fundo',
    gridColor: 'Cor da Grade',
    textColor: 'Cor do Texto',
    defaultTitle1: 'ENCONTRE',
    defaultTitle2: 'DIFERENTE',
    emoji: '😉',
    upload: 'Fazer Upload',
    back: 'Voltar',
    nextPhase: 'Próxima Fase',
    phase: 'Fase',
    channelName: 'Nome do Canal',
    backgroundStyle: 'Estilo de Fundo',
    transitionTime: 'Tempo de Transição (s)',
    bgNone: 'Nenhum',
    bgRandom: 'Aleatório',
    bgAnimated: 'Animado Aleatório',
    bg1: 'Fundo 1',
    bg2: 'Fundo 2',
    bg3: 'Fundo 3',
    bg4: 'Fundo 4',
    bg5: 'Fundo 5',
    randomMode: 'Modo Aleatório',
    bgMusic: 'Música de Fundo',
    bgMusicVolume: 'Volume da Música',
    transitionText: 'Texto da Transição',
    likePhase: 'Fase do Botão Like',
    subscribePhase: 'Fase do Botão Inscreva-se',
    commentPhase: 'Fase do Balão de Comentário',
    none: 'Nenhuma',
    subscribeBtn: 'INSCREVA-SE',
    extraEmojis: 'Emojis Extras (Espaços)',
    targetBoxStyle: 'Estilo da Caixa Alvo',
    boxQuestion: 'Interrogação',
    boxShadow: 'Sombra Animada',
    transitionType: 'Tipo de Transição',
    transDefault: 'Padrão',
    transWhirlpool: 'Redemoinho',
    transNone: 'Nenhuma',
    titleShine: 'Tempo do Brilho no Título (s)',
    borderShine: 'Borda com Brilho',
    clawShine: 'Brilho na Garra',
    titleScale: 'Tamanho do Título',
    titleYOffset: 'Posição Y do Título',
    gridSizeMode: 'Modo da Grade',
    gridGlobal: 'Global (Igual para todas)',
    gridIndividual: 'Individual (Por fase)',
    gridRandom: 'Aleatório',
    difficulty: 'Dificuldade (Aleatório)',
    diffEasy: 'Fácil (Máx 4x4)',
    diffNormal: 'Normal (Máx 6x6)',
    diffHard: 'Difícil (Máx 8x8)',
    contentMode: 'Conteúdo do Jogo',
    contentEmojis: 'Emojis Aleatórios',
    contentCustom: 'Imagens Personalizadas',
    tabGame: 'Jogo',
    tabText: 'Textos',
    tabAppearance: 'Aparência',
    tabEffects: 'Efeitos',
    tabAudio: 'Áudio',
    tabPhases: 'Fases',
    randomizeTarget: 'Posição Aleatória do Alvo',
    targetRow: 'Linha do Alvo',
    targetCol: 'Coluna do Alvo',
  },
  en: {
    setup: 'Setup',
    start: 'Start Game',
    rows: 'Rows',
    cols: 'Columns',
    time: 'Time (s)',
    phases: 'Phases',
    normalImg: 'Normal Image',
    diffImg: 'Different Image',
    title1: 'Title Line 1',
    title2: 'Title Line 2',
    target: 'Select target on the grid below:',
    bgColors: 'Background Colors',
    gridColor: 'Grid Color',
    textColor: 'Text Color',
    defaultTitle1: 'FIND THE',
    defaultTitle2: 'DIFFERENT',
    emoji: '😉',
    upload: 'Upload',
    back: 'Back',
    nextPhase: 'Next Phase',
    phase: 'Phase',
    channelName: 'Channel Name',
    backgroundStyle: 'Background Style',
    transitionTime: 'Transition Time (s)',
    bgNone: 'None',
    bgRandom: 'Random',
    bgAnimated: 'Random Animated',
    bg1: 'Background 1',
    bg2: 'Background 2',
    bg3: 'Background 3',
    bg4: 'Background 4',
    bg5: 'Background 5',
    randomMode: 'Random Mode',
    bgMusic: 'Background Music',
    bgMusicVolume: 'Music Volume',
    transitionText: 'Transition Text',
    likePhase: 'Like Button Phase',
    subscribePhase: 'Subscribe Button Phase',
    commentPhase: 'Comment Balloon Phase',
    none: 'None',
    subscribeBtn: 'SUBSCRIBE',
    extraEmojis: 'Extra Emojis (Spaces)',
    targetBoxStyle: 'Target Box Style',
    boxQuestion: 'Question Mark',
    boxShadow: 'Animated Shadow',
    transitionType: 'Transition Type',
    transDefault: 'Default',
    transWhirlpool: 'Whirlpool',
    transNone: 'None',
    titleShine: 'Title Shine Time (s)',
    borderShine: 'Shine Border',
    clawShine: 'Claw Shine',
    titleScale: 'Title Scale',
    titleYOffset: 'Title Y Offset',
    gridSizeMode: 'Grid Mode',
    gridGlobal: 'Global (Same for all)',
    gridIndividual: 'Individual (Per phase)',
    gridRandom: 'Random',
    difficulty: 'Difficulty (Random)',
    diffEasy: 'Easy (Max 4x4)',
    diffNormal: 'Normal (Max 6x6)',
    diffHard: 'Hard (Max 8x8)',
    contentMode: 'Game Content',
    contentEmojis: 'Random Emojis',
    contentCustom: 'Custom Images',
    tabGame: 'Game',
    tabText: 'Texts',
    tabAppearance: 'Appearance',
    tabEffects: 'Effects',
    tabAudio: 'Audio',
    tabPhases: 'Phases',
    randomizeTarget: 'Random Target Position',
    targetRow: 'Target Row',
    targetCol: 'Target Column',
  },
  es: {
    setup: 'Configuración',
    start: 'Comenzar Juego',
    rows: 'Filas',
    cols: 'Columnas',
    time: 'Tiempo (s)',
    phases: 'Fases',
    normalImg: 'Imagen Normal',
    diffImg: 'Imagen Diferente',
    title1: 'Título Línea 1',
    title2: 'Título Línea 2',
    target: 'Seleccione el objetivo en la cuadrícula:',
    bgColors: 'Colores de Fondo',
    gridColor: 'Color de Cuadrícula',
    textColor: 'Color de Texto',
    defaultTitle1: 'ENCUENTRA',
    defaultTitle2: 'EL DIFERENTE',
    emoji: '😉',
    upload: 'Subir',
    back: 'Volver',
    nextPhase: 'Siguiente Fase',
    phase: 'Fase',
    channelName: 'Nombre del Canal',
    backgroundStyle: 'Estilo de Fondo',
    transitionTime: 'Tiempo de Transición (s)',
    bgNone: 'Ninguno',
    bgRandom: 'Aleatorio',
    bgAnimated: 'Animado Aleatorio',
    bg1: 'Fondo 1',
    bg2: 'Fondo 2',
    bg3: 'Fondo 3',
    bg4: 'Fondo 4',
    bg5: 'Fondo 5',
    randomMode: 'Modo Aleatorio',
    bgMusic: 'Música de Fondo',
    bgMusicVolume: 'Volumen de Música',
    transitionText: 'Texto de Transición',
    likePhase: 'Fase del Botón Me Gusta',
    subscribePhase: 'Fase del Botón Suscribirse',
    commentPhase: 'Fase del Globo de Comentario',
    none: 'Ninguna',
    subscribeBtn: 'SUSCRÍBETE',
    extraEmojis: 'Emojis Extras (Espacios)',
    targetBoxStyle: 'Estilo de Caja Objetivo',
    boxQuestion: 'Interrogación',
    boxShadow: 'Sombra Animada',
    transitionType: 'Tipo de Transición',
    transDefault: 'Por Defecto',
    transWhirlpool: 'Remolino',
    transNone: 'Ninguna',
    titleShine: 'Tiempo de Brillo del Título (s)',
    borderShine: 'Borde con Brillo',
    clawShine: 'Brillo en la Garra',
    titleScale: 'Tamaño del Título',
    titleYOffset: 'Posición Y del Título',
    gridSizeMode: 'Modo de Cuadrícula',
    gridGlobal: 'Global (Igual para todas)',
    gridIndividual: 'Individual (Por fase)',
    gridRandom: 'Aleatorio',
    difficulty: 'Dificultad (Aleatorio)',
    diffEasy: 'Fácil (Máx 4x4)',
    diffNormal: 'Normal (Máx 6x6)',
    diffHard: 'Difícil (Máx 8x8)',
    contentMode: 'Contenido del Juego',
    contentEmojis: 'Emojis Aleatorios',
    contentCustom: 'Imágenes Personalizadas',
    tabGame: 'Juego',
    tabText: 'Textos',
    tabAppearance: 'Apariencia',
    tabEffects: 'Efectos',
    tabAudio: 'Audio',
    tabPhases: 'Fases',
    randomizeTarget: 'Posición Aleatoria del Objetivo',
    targetRow: 'Fila del Objetivo',
    targetCol: 'Columna del Objetivo',
  }
};

// --- Sound Engine ---
const playTone = (ctx: AudioContext, freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
  if (!ctx || ctx.state === 'suspended') return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

const playTick = (ctx: AudioContext) => playTone(ctx, 800, 'sine', 0.1, 0.05);
const playTimeUp = (ctx: AudioContext) => {
  playTone(ctx, 400, 'sawtooth', 0.5, 0.1);
  setTimeout(() => playTone(ctx, 600, 'sawtooth', 0.5, 0.1), 200);
};
const playClawMove = (ctx: AudioContext) => {
  if (!ctx || ctx.state === 'suspended') return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.4);
  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
};
const playGrab = (ctx: AudioContext) => {
  playTone(ctx, 300, 'square', 0.2, 0.1);
  setTimeout(() => playTone(ctx, 200, 'square', 0.2, 0.1), 100);
};
const playReveal = (ctx: AudioContext) => {
  playTone(ctx, 523.25, 'sine', 0.2, 0.1);
  setTimeout(() => playTone(ctx, 659.25, 'sine', 0.2, 0.1), 200);
  setTimeout(() => playTone(ctx, 783.99, 'sine', 0.4, 0.1), 400);
};

const randomEmojiPairs = [
  ['😀', '😃'], ['🍎', '🍅'], ['🚗', '🚕'], ['🐶', '🐺'], ['🌞', '🌝'],
  ['🍔', '🥪'], ['⚽', '🏀'], ['🎸', '🎻'], ['🌲', '🌳'], ['🐱', '🐯'],
  ['🍓', '🍒'], ['🍉', '🍈'], ['🚀', '🛸'], ['🚢', '🛥️'], ['🚆', '🚄'],
  ['🐼', '🐻'], ['🦊', '🐺'], ['🐸', '🐢'], ['🦋', '🐝'], ['🌻', '🌼'],
  ['🍩', '🥯'], ['🍕', '🌮'], ['🍦', '🍧'], ['🍺', '🍻'], ['🍷', '🥂'],
  ['🎈', '🏮'], ['🎁', '📦'], ['📚', '📖'], ['✏️', '🖍️'], ['✂️', '🔪'],
  ['🔑', '🗝️'], ['🔒', '🔓'], ['❤️', '💖'], ['⭐', '🌟'], ['🔥', '💥'],
  ['💧', '💦'], ['⛄', '☃️'], ['🎃', '👻'], ['👽', '👾'], ['🤖', '🤡']
];

type PhaseParams = {
  rows: number;
  cols: number;
  timeLimit: number;
  normalEmoji: string;
  differentEmoji: string;
  targetRow?: number;
  targetCol?: number;
};

export default function App() {
  const [config, setConfig] = useState<Config>(() => {
    try {
      const saved = localStorage.getItem('findTheDifferentConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.phasesData || !Array.isArray(parsed.phasesData) || parsed.phasesData.length === 0) {
          parsed.phasesData = defaultConfig.phasesData;
        }
        // Pad or slice phasesData to match totalPhases
        if (parsed.totalPhases) {
          if (parsed.phasesData.length < parsed.totalPhases) {
            while (parsed.phasesData.length < parsed.totalPhases) {
              parsed.phasesData.push({ normalImage: null, differentImage: null, rows: 4, cols: 4, targetRow: 0, targetCol: 0, randomizeTarget: true });
            }
          } else if (parsed.phasesData.length > parsed.totalPhases) {
            parsed.phasesData = parsed.phasesData.slice(0, parsed.totalPhases);
          }
        }
        return { ...defaultConfig, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load config', e);
    }
    return defaultConfig;
  });

  useEffect(() => {
    try {
      localStorage.setItem('findTheDifferentConfig', JSON.stringify(config));
    } catch (e: any) {
      if (e.name === 'QuotaExceededError' || e.message.includes('exceeded the quota')) {
        console.warn('Config too large for localStorage, saving without images.');
        try {
          const configToSave = { ...config };
          // Keep the array length but remove the large image data and music
          configToSave.phasesData = config.phasesData.map((p) => ({ ...p, normalImage: null, differentImage: null }));
          configToSave.bgMusic = null;
          localStorage.setItem('findTheDifferentConfig', JSON.stringify(configToSave));
        } catch (innerError) {
          console.error('Failed to save config even without images and music', innerError);
        }
      } else {
        console.error('Failed to save config', e);
      }
    }
  }, [config]);

  const [gameState, setGameState] = useState<'setup' | 'playing' | 'animating' | 'finished' | 'transitioning'>('setup');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentTarget, setCurrentTarget] = useState({ r: 0, c: 0 });
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [currentBgStyle, setCurrentBgStyle] = useState(config.backgroundStyle);
  const [randomPhases, setRandomPhases] = useState<PhaseParams[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animatedColors, setAnimatedColors] = useState({ c1: 'hsl(120, 80%, 60%)', c2: 'hsl(60, 80%, 60%)' });

  useEffect(() => {
    if (config.backgroundStyle === 'animated' && gameState !== 'setup') {
      const interval = setInterval(() => {
        setAnimatedColors({ 
          c1: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`, 
          c2: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)` 
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [config.backgroundStyle, gameState]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = config.bgMusicVolume;
      if (gameState === 'playing' || gameState === 'animating' || gameState === 'transitioning') {
        audioRef.current.play().catch(e => console.warn("Autoplay prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [gameState, config.bgMusicVolume, config.bgMusic]);

  useEffect(() => {
    if (config.backgroundStyle === 'random') {
      const styles = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];
      setCurrentBgStyle(styles[Math.floor(Math.random() * styles.length)] as any);
    } else {
      setCurrentBgStyle(config.backgroundStyle);
    }
  }, [currentPhase, config.backgroundStyle]);

  const getBackgroundStyles = () => {
    switch (currentBgStyle) {
      case 'animated':
        return { background: 'transparent' };
      case 'bg1':
        return { background: 'linear-gradient(160deg, #00a8ff 35%, #ff3838 35%, #ff3838 65%, #00a8ff 65%)' };
      case 'bg2':
        return { background: 'conic-gradient(from 45deg at 50% 50%, #00a8ff 0deg 90deg, #fbc531 90deg 180deg, #00a8ff 180deg 270deg, #fbc531 270deg 360deg)' };
      case 'bg3':
        return { background: 'linear-gradient(180deg, #fbc531 30%, #4cd137 30%, #4cd137 70%, #fbc531 70%)' };
      case 'bg4':
        return { background: '#9c88ff' };
      case 'bg5':
        return { background: 'linear-gradient(160deg, #4cd137 60%, #ff3838 60%)' };
      default:
        return { background: `linear-gradient(135deg, ${config.bgColor1}, ${config.bgColor2})` };
    }
  };

  const startGameRef = useRef<() => void>();

  // Fullscreen on Spacebar, Restart on R, Menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(console.error);
        } else {
          document.exitFullscreen().catch(console.error);
        }
      } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
        if (gameState === 'playing' || gameState === 'finished') {
          e.preventDefault();
          if (startGameRef.current) startGameRef.current();
        }
      } else if (e.code === 'Escape') {
        if (gameState !== 'setup') {
          setGameState('setup');
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const questionBoxRef = useRef<HTMLDivElement>(null);

  const [clawPos, setClawPos] = useState({ x: 200, y: 50 });
  const [clawOpen, setClawOpen] = useState(true);
  const [itemInClaw, setItemInClaw] = useState(false);
  const [itemInBox, setItemInBox] = useState(false);
  const [itemInGrid, setItemInGrid] = useState(true);

  const handlePhaseImageUpload = (index: number, type: 'normalImage' | 'differentImage', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhasesData = [...(config.phasesData || defaultConfig.phasesData)];
        newPhasesData[index] = {
          ...newPhasesData[index],
          [type]: event.target?.result as string
        };
        setConfig({ ...config, phasesData: newPhasesData });
      };
      reader.readAsDataURL(file);
    }
  };

  const startGame = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.warn("Autoplay prevented:", e));
    }
    let ctx = audioCtx;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioCtx(ctx);
    }
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    setCurrentPhase(1);
    
    const newRandomPhases: PhaseParams[] = [];
    for (let i = 1; i <= config.totalPhases; i++) {
      let rows = 4, cols = 4;
      let targetRow: number | undefined = undefined;
      let targetCol: number | undefined = undefined;
      
      if (config.gridSizeMode === 'random') {
        const minSize = 3;
        let maxSize = 8;
        if (config.randomDifficulty === 'easy') maxSize = 4;
        else if (config.randomDifficulty === 'normal') maxSize = 6;
        else if (config.randomDifficulty === 'hard') maxSize = 8;
        
        rows = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        cols = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      } else if (config.gridSizeMode === 'individual') {
        const phaseData = config.phasesData[i - 1] || { rows: 4, cols: 4, targetRow: 0, targetCol: 0, randomizeTarget: true };
        rows = phaseData.rows || 4;
        cols = phaseData.cols || 4;
        if (phaseData.randomizeTarget === false) {
          targetRow = Math.min(phaseData.targetRow || 0, rows - 1);
          targetCol = Math.min(phaseData.targetCol || 0, cols - 1);
        }
      } else {
        rows = config.rows;
        cols = config.cols;
        const phaseData = config.phasesData[i - 1];
        if (phaseData && phaseData.randomizeTarget === false) {
          targetRow = Math.min(phaseData.targetRow || 0, rows - 1);
          targetCol = Math.min(phaseData.targetCol || 0, cols - 1);
        }
      }
      
      const timeLimit = config.timeLimit;
      const pair = randomEmojiPairs[Math.floor(Math.random() * randomEmojiPairs.length)];
      newRandomPhases.push({ rows, cols, timeLimit, normalEmoji: pair[0], differentEmoji: pair[1], targetRow, targetCol });
    }
    setRandomPhases(newRandomPhases);
    
    const firstPhase = newRandomPhases[0];
    setCurrentTarget({ 
      r: firstPhase.targetRow !== undefined ? firstPhase.targetRow : Math.floor(Math.random() * firstPhase.rows), 
      c: firstPhase.targetCol !== undefined ? firstPhase.targetCol : Math.floor(Math.random() * firstPhase.cols) 
    });
    setTimeLeft(firstPhase.timeLimit);
    
    if (config.transitionType === 'none') {
      setItemInGrid(true);
      setItemInBox(false);
      setItemInClaw(false);
      setClawOpen(true);
      setGameState('playing');
    } else {
      setItemInGrid(true);
      setItemInBox(false);
      setItemInClaw(false);
      setClawOpen(true);
      setGameState('transitioning');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setItemInGrid(true);
        setIsTransitioning(false);
        setGameState('playing');
      }, config.transitionTime * 1000 * 1.2);
    }
  };

  useEffect(() => {
    startGameRef.current = startGame;
  }, [startGame]);

  const nextPhase = () => {
    setIsTransitioning(true);
    setGameState('transitioning');
    
    setTimeout(() => {
      setCurrentPhase(p => {
        const nextPhaseNum = p + 1;
        const phaseParams = randomPhases[nextPhaseNum - 1];
        setCurrentTarget({ 
          r: phaseParams.targetRow !== undefined ? phaseParams.targetRow : Math.floor(Math.random() * phaseParams.rows), 
          c: phaseParams.targetCol !== undefined ? phaseParams.targetCol : Math.floor(Math.random() * phaseParams.cols) 
        });
        setTimeLeft(phaseParams.timeLimit);
        return nextPhaseNum;
      });
      
      setItemInGrid(true);
      setItemInBox(false);
      setItemInClaw(false);
      setClawPos({ x: containerRef.current?.clientWidth ? containerRef.current.clientWidth / 2 : 200, y: 50 });
      setClawOpen(true);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setGameState('playing');
      }, (config.transitionTime * 1000 * 1.2) / 2);
    }, (config.transitionTime * 1000 * 1.2) / 2);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Timer Logic
  useEffect(() => {
    if (gameState === 'playing') {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(t => t - 1);
          if (audioCtx) playTick(audioCtx);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        if (audioCtx) playTimeUp(audioCtx);
        setGameState('animating');
      }
    }
  }, [gameState, timeLeft, audioCtx]);

  // Initial Claw Position
  useEffect(() => {
    if (gameState === 'playing' && questionBoxRef.current && containerRef.current) {
      const qRect = questionBoxRef.current.getBoundingClientRect();
      const cRect = containerRef.current.getBoundingClientRect();
      setClawPos({
        x: qRect.left - cRect.left + qRect.width / 2,
        y: 0
      });
    }
  }, [gameState]);

  // Animation Sequence
  useEffect(() => {
    if (gameState === 'animating') {
      const sequence = async () => {
        if (targetRef.current && containerRef.current && questionBoxRef.current) {
          const targetRect = targetRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const qRect = questionBoxRef.current.getBoundingClientRect();
          
          const targetX = targetRect.left - containerRect.left + targetRect.width / 2;
          const targetY = targetRect.top - containerRect.top - 70; // Adjusted overshoot
          
          // 1. Move to target X
          if (audioCtx) playClawMove(audioCtx);
          setClawPos(prev => ({ ...prev, x: targetX }));
          await new Promise(r => setTimeout(r, 400));

          // 2. Move to target Y
          if (audioCtx) playClawMove(audioCtx);
          setClawPos({ x: targetX, y: targetY });
          await new Promise(r => setTimeout(r, 400));
          
          // 3. Grab
          setClawOpen(false);
          if (audioCtx) playGrab(audioCtx);
          await new Promise(r => setTimeout(r, 200));
          setItemInGrid(false);
          setItemInClaw(true);
          
          // 4. Move up
          if (audioCtx) playClawMove(audioCtx);
          setClawPos({ x: targetX, y: 50 });
          await new Promise(r => setTimeout(r, 400));

          // 5. Move to Question Box X
          const qX = qRect.left - containerRect.left + qRect.width / 2;
          const qY = qRect.top - containerRect.top - 40; // Adjusted overshoot
          
          if (audioCtx) playClawMove(audioCtx);
          setClawPos({ x: qX, y: 50 });
          await new Promise(r => setTimeout(r, 400));

          // 6. Move to Question Box Y
          if (audioCtx) playClawMove(audioCtx);
          setClawPos({ x: qX, y: qY });
          await new Promise(r => setTimeout(r, 400));
          
          // 7. Drop
          setClawOpen(true);
          setItemInClaw(false);
          setItemInBox(true);
          if (audioCtx) playReveal(audioCtx);
          
          // Move claw out of the way
          setClawPos({ x: qX, y: -150 });

          await new Promise(r => setTimeout(r, 1500));
          
          if (currentPhase < config.totalPhases) {
            const setupNextPhase = () => {
              const nextPhaseNum = currentPhase + 1;
              setCurrentPhase(nextPhaseNum);
              
              const phaseParams = randomPhases[nextPhaseNum - 1];
              setCurrentTarget({ 
                r: phaseParams.targetRow !== undefined ? phaseParams.targetRow : Math.floor(Math.random() * phaseParams.rows), 
                c: phaseParams.targetCol !== undefined ? phaseParams.targetCol : Math.floor(Math.random() * phaseParams.cols) 
              });
              setTimeLeft(phaseParams.timeLimit);
              
              setItemInGrid(true);
              setItemInBox(false);
              setItemInClaw(false);
              setClawPos({ x: containerRef.current?.clientWidth ? containerRef.current.clientWidth / 2 : 200, y: 50 });
              setClawOpen(true);
            };

            if (config.transitionType === 'none') {
              setupNextPhase();
              setGameState('playing');
            } else {
              setIsTransitioning(true);
              setGameState('transitioning');
              
              setTimeout(() => {
                setupNextPhase();
                
                setTimeout(() => {
                  setIsTransitioning(false);
                  setGameState('playing');
                }, (config.transitionTime * 1000 * 1.2) / 2);
              }, (config.transitionTime * 1000 * 1.2) / 2);
            }
          } else {
            setGameState('finished');
          }
        }
      };
      sequence();
    }
  }, [gameState, audioCtx, currentPhase, config.totalPhases, config.rows, config.cols, config.timeLimit]);

  const renderItem = (isTarget: boolean, r: number, c: number, className: string = "w-[95%] h-[95%]", isExtra: boolean = false) => {
    const activeCols = config.isRandomMode && randomPhases[currentPhase - 1] ? randomPhases[currentPhase - 1].cols : config.cols;
    const delay = `${(r * activeCols + c) * 0.05}s`;
    
    const sizeClass = isExtra ? "text-xl sm:text-2xl md:text-3xl" : "text-4xl sm:text-5xl md:text-6xl";
    
    if (config.isRandomMode && randomPhases[currentPhase - 1]) {
      const emoji = isTarget ? randomPhases[currentPhase - 1].differentEmoji : randomPhases[currentPhase - 1].normalEmoji;
      return (
        <motion.div 
          className={`${className} flex items-center justify-center ${sizeClass} drop-shadow-2xl animate-gentle-float`}
          style={{ animationDelay: delay }}
        >
          {emoji}
        </motion.div>
      );
    }

    const safePhasesData = config.phasesData && config.phasesData.length > 0 ? config.phasesData : defaultConfig.phasesData;
    const currentPhaseData = safePhasesData[currentPhase - 1] || safePhasesData[0];
    const img = isTarget ? currentPhaseData?.differentImage : currentPhaseData?.normalImage;
    
    if (img) {
      return (
        <motion.img 
          src={img} 
          className={`${className} object-contain drop-shadow-2xl animate-gentle-float`} 
          alt="" 
          draggable={false}
          style={{ animationDelay: delay }}
        />
      );
    }
    return (
      <motion.div 
        className={`${className} rounded-xl shadow-lg animate-gentle-float ${isTarget ? 'bg-red-500' : 'bg-blue-500'}`}
        style={{ animationDelay: delay }}
      />
    );
  };

  const clawThemes = [
    { base: 'from-red-600 to-red-800', prong: 'from-gray-300 to-gray-500' },
    { base: 'from-blue-600 to-blue-800', prong: 'from-slate-300 to-slate-500' },
    { base: 'from-emerald-600 to-emerald-800', prong: 'from-zinc-300 to-zinc-500' },
    { base: 'from-purple-600 to-purple-800', prong: 'from-stone-300 to-stone-500' },
    { base: 'from-amber-500 to-amber-700', prong: 'from-orange-200 to-orange-400' },
  ];
  const themeIndex = Math.max(0, (currentPhase - 1)) % clawThemes.length;
  const currentClawTheme = clawThemes[themeIndex] || clawThemes[0];

  const lang = (config.language && t[config.language as keyof typeof t]) ? config.language as keyof typeof t : 'pt';
  const currentT = t[lang];

  const [activeTab, setActiveTab] = useState<'game' | 'text' | 'appearance' | 'effects' | 'audio' | 'phases'>('game');

  const setupTabs = [
    { id: 'game', icon: <Settings className="w-5 h-5" />, label: currentT.tabGame },
    { id: 'phases', icon: <Layers className="w-5 h-5" />, label: currentT.tabPhases },
    { id: 'text', icon: <Type className="w-5 h-5" />, label: currentT.tabText },
    { id: 'appearance', icon: <Palette className="w-5 h-5" />, label: currentT.tabAppearance },
    { id: 'effects', icon: <Sparkles className="w-5 h-5" />, label: currentT.tabEffects },
    { id: 'audio', icon: <Music className="w-5 h-5" />, label: currentT.tabAudio },
  ];

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8 overflow-y-auto font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
              <Settings className="w-8 h-8 text-emerald-500" />
              App Setup
            </h1>
            <button onClick={toggleFullscreen} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Maximize className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white/5 rounded-3xl border border-white/10 p-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {setupTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl">
              
              {/* GAME TAB */}
              {activeTab === 'game' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">Language / Idioma</label>
                      <div className="flex gap-2">
                        {['pt', 'en', 'es'].map(l => (
                          <button 
                            key={l}
                            onClick={() => setConfig({...config, language: l as Language})}
                            className={`flex-1 py-2 rounded-xl font-bold uppercase transition-all ${config.language === l ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.phases}</label>
                      <input 
                        type="number" min="1" max="20" 
                        value={config.totalPhases} 
                        onChange={e => {
                          const newPhases = parseInt(e.target.value) || 1;
                          let newPhasesData = [...(config.phasesData || defaultConfig.phasesData)];
                          if (newPhases > newPhasesData.length) {
                            while (newPhasesData.length < newPhases) {
                              newPhasesData.push({ normalImage: null, differentImage: null, rows: 4, cols: 4, targetRow: 0, targetCol: 0, randomizeTarget: true });
                            }
                          } else {
                            newPhasesData = newPhasesData.slice(0, newPhases);
                          }
                          setConfig({...config, totalPhases: newPhases, phasesData: newPhasesData});
                        }} 
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/70">{currentT.contentMode}</label>
                        <select 
                          value={config.isRandomMode ? 'emojis' : 'custom'}
                          onChange={e => setConfig({...config, isRandomMode: e.target.value === 'emojis'})}
                          className="bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="emojis">{currentT.contentEmojis}</option>
                          <option value="custom">{currentT.contentCustom}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/70">{currentT.extraEmojis}</label>
                        <button 
                          onClick={() => setConfig({...config, enableExtraEmojis: !config.enableExtraEmojis})}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enableExtraEmojis ? 'bg-emerald-500' : 'bg-white/20'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${config.enableExtraEmojis ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.time}</label>
                      <input type="number" min="3" max="60" value={config.timeLimit} onChange={e => setConfig({...config, timeLimit: parseInt(e.target.value) || 10})} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.transitionTime}</label>
                      <input 
                        type="number" 
                        min="0.5" max="1.5" step="0.1"
                        value={config.transitionTime}
                        onChange={e => setConfig({...config, transitionTime: parseFloat(e.target.value) || 0.5})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PHASES TAB */}
              {activeTab === 'phases' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col justify-center bg-black/30 border border-white/10 rounded-xl px-4 py-3 mb-4">
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-sm font-medium text-white/70 block mb-2">{currentT.gridSizeMode}</label>
                        <select 
                          value={config.gridSizeMode}
                          onChange={e => setConfig({...config, gridSizeMode: e.target.value as any})}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="global">{currentT.gridGlobal}</option>
                          <option value="individual">{currentT.gridIndividual}</option>
                          <option value="random">{currentT.gridRandom}</option>
                        </select>
                      </div>
                      
                      {config.gridSizeMode === 'random' && (
                        <div>
                          <label className="text-sm font-medium text-white/70 block mb-2">{currentT.difficulty}</label>
                          <select 
                            value={config.randomDifficulty}
                            onChange={e => setConfig({...config, randomDifficulty: e.target.value as any})}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                          >
                            <option value="easy">{currentT.diffEasy}</option>
                            <option value="normal">{currentT.diffNormal}</option>
                            <option value="hard">{currentT.diffHard}</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Grid Size */}
                  {config.gridSizeMode === 'global' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/70">{currentT.rows}</label>
                        <input 
                          type="number" 
                          min="2" max="8" 
                          value={config.rows} 
                          onChange={e => {
                            const newRows = parseInt(e.target.value) || 2;
                            setConfig({...config, rows: newRows});
                          }} 
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/70">{currentT.cols}</label>
                        <input 
                          type="number" 
                          min="2" max="6" 
                          value={config.cols} 
                          onChange={e => {
                            const newCols = parseInt(e.target.value) || 2;
                            setConfig({...config, cols: newCols});
                          }} 
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500" 
                        />
                      </div>
                    </div>
                  )}

                  {/* Phase Images */}
                  {!config.isRandomMode && (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto p-2 border border-white/10 rounded-xl bg-black/20">
                      {(config.phasesData || []).map((phase, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg space-y-3">
                          <h4 className="font-bold text-sm text-emerald-400">Fase {index + 1}</h4>
                          
                          {config.gridSizeMode === 'individual' && (
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <label className="block text-xs mb-1 text-white/70">{currentT.rows}</label>
                                <input 
                                  type="number" 
                                  min="2" max="8" 
                                  value={phase.rows || 4} 
                                  onChange={e => {
                                    const newRows = parseInt(e.target.value) || 2;
                                    const newPhasesData = [...config.phasesData];
                                    newPhasesData[index] = { ...newPhasesData[index], rows: newRows };
                                    setConfig({...config, phasesData: newPhasesData});
                                  }} 
                                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs mb-1 text-white/70">{currentT.cols}</label>
                                <input 
                                  type="number" 
                                  min="2" max="8" 
                                  value={phase.cols || 4} 
                                  onChange={e => {
                                    const newCols = parseInt(e.target.value) || 2;
                                    const newPhasesData = [...config.phasesData];
                                    newPhasesData[index] = { ...newPhasesData[index], cols: newCols };
                                    setConfig({...config, phasesData: newPhasesData});
                                  }} 
                                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm" 
                                />
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs mb-2 text-white/70">{currentT.normalImg}</label>
                              <label className="flex flex-col items-center justify-center h-24 bg-black/30 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors relative overflow-hidden group">
                                {phase.normalImage ? (
                                  <img src={phase.normalImage} className="absolute inset-0 w-full h-full object-contain p-2" />
                                ) : (
                                  <Upload className="w-6 h-6 text-white/40 group-hover:text-emerald-500 transition-colors" />
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={e => handlePhaseImageUpload(index, 'normalImage', e)} />
                              </label>
                            </div>
                            <div>
                              <label className="block text-xs mb-2 text-white/70">{currentT.diffImg}</label>
                              <label className="flex flex-col items-center justify-center h-24 bg-black/30 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors relative overflow-hidden group">
                                {phase.differentImage ? (
                                  <img src={phase.differentImage} className="absolute inset-0 w-full h-full object-contain p-2" />
                                ) : (
                                  <Upload className="w-6 h-6 text-white/40 group-hover:text-emerald-500 transition-colors" />
                                )}
                                <input type="file" accept="image/*" className="hidden" onChange={e => handlePhaseImageUpload(index, 'differentImage', e)} />
                              </label>
                            </div>
                          </div>

                          {config.gridSizeMode !== 'random' && (
                            <>
                              <div className="flex items-center justify-between mt-3 bg-black/20 p-2 rounded-lg">
                                <label className="text-xs font-medium text-white/70">{currentT.randomizeTarget}</label>
                                <button 
                                  onClick={() => {
                                    const newPhasesData = [...config.phasesData];
                                    newPhasesData[index] = { ...newPhasesData[index], randomizeTarget: phase.randomizeTarget === false ? true : false };
                                    setConfig({...config, phasesData: newPhasesData});
                                  }}
                                  className={`w-10 h-5 rounded-full transition-colors relative ${phase.randomizeTarget !== false ? 'bg-emerald-500' : 'bg-white/20'}`}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-white absolute top-1 transition-transform ${phase.randomizeTarget !== false ? 'left-6' : 'left-1'}`} />
                                </button>
                              </div>
                              
                              {phase.randomizeTarget === false && (
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                  <div>
                                    <label className="block text-xs mb-1 text-white/70">{currentT.targetRow}</label>
                                    <input 
                                      type="number" 
                                      min="1" max={config.gridSizeMode === 'individual' ? (phase.rows || 4) : config.rows} 
                                      value={(phase.targetRow || 0) + 1} 
                                      onChange={e => {
                                        const newRow = (parseInt(e.target.value) || 1) - 1;
                                        const newPhasesData = [...config.phasesData];
                                        newPhasesData[index] = { ...newPhasesData[index], targetRow: newRow };
                                        setConfig({...config, phasesData: newPhasesData});
                                      }} 
                                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm" 
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs mb-1 text-white/70">{currentT.targetCol}</label>
                                    <input 
                                      type="number" 
                                      min="1" max={config.gridSizeMode === 'individual' ? (phase.cols || 4) : config.cols} 
                                      value={(phase.targetCol || 0) + 1} 
                                      onChange={e => {
                                        const newCol = (parseInt(e.target.value) || 1) - 1;
                                        const newPhasesData = [...config.phasesData];
                                        newPhasesData[index] = { ...newPhasesData[index], targetCol: newCol };
                                        setConfig({...config, phasesData: newPhasesData});
                                      }} 
                                      className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm" 
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TEXT TAB */}
              {activeTab === 'text' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.title1}</label>
                      <input 
                        type="text" 
                        value={config.titleLine1}
                        onChange={e => setConfig({...config, titleLine1: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">Emoji</label>
                      <input 
                        type="text" 
                        value={config.emoji}
                        onChange={e => setConfig({...config, emoji: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.title2}</label>
                      <input 
                        type="text" 
                        value={config.titleLine2}
                        onChange={e => setConfig({...config, titleLine2: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.channelName}</label>
                      <input 
                        type="text" 
                        value={config.channelName}
                        onChange={e => setConfig({...config, channelName: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.transitionText}</label>
                      <input 
                        type="text" 
                        value={config.transitionText}
                        onChange={e => setConfig({...config, transitionText: e.target.value})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* APPEARANCE TAB */}
              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.bgColors}</label>
                      <div className="flex gap-2">
                        <input type="color" value={config.bgColor1} onChange={e => setConfig({...config, bgColor1: e.target.value})} className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0" />
                        <input type="color" value={config.bgColor2} onChange={e => setConfig({...config, bgColor2: e.target.value})} className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.gridColor}</label>
                      <input type="color" value={config.gridColor} onChange={e => setConfig({...config, gridColor: e.target.value})} className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.backgroundStyle}</label>
                      <select 
                        value={config.backgroundStyle}
                        onChange={e => setConfig({...config, backgroundStyle: e.target.value as any})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="none">{currentT.bgNone}</option>
                        <option value="random">{currentT.bgRandom}</option>
                        <option value="animated">{currentT.bgAnimated}</option>
                        <option value="bg1">{currentT.bg1}</option>
                        <option value="bg2">{currentT.bg2}</option>
                        <option value="bg3">{currentT.bg3}</option>
                        <option value="bg4">{currentT.bg4}</option>
                        <option value="bg5">{currentT.bg5}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.targetBoxStyle}</label>
                      <select 
                        value={config.targetBoxStyle}
                        onChange={e => setConfig({...config, targetBoxStyle: e.target.value as any})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="question">{currentT.boxQuestion}</option>
                        <option value="shadow">{currentT.boxShadow}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* EFFECTS TAB */}
              {activeTab === 'effects' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.transitionType}</label>
                      <select 
                        value={config.transitionType}
                        onChange={e => setConfig({...config, transitionType: e.target.value as any})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="default">{currentT.transDefault}</option>
                        <option value="whirlpool">{currentT.transWhirlpool}</option>
                        <option value="none">{currentT.transNone}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.titleShine}</label>
                      <input 
                        type="number" 
                        min="1" max="20" step="1"
                        value={config.titleShineInterval}
                        onChange={e => setConfig({...config, titleShineInterval: parseInt(e.target.value) || 5})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/70">{currentT.borderShine}</label>
                        <button 
                          onClick={() => setConfig({...config, enableBorderShine: !config.enableBorderShine})}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enableBorderShine ? 'bg-emerald-500' : 'bg-white/20'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${config.enableBorderShine ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/70">{currentT.clawShine}</label>
                        <button 
                          onClick={() => setConfig({...config, enableClawShine: !config.enableClawShine})}
                          className={`w-12 h-6 rounded-full transition-colors relative ${config.enableClawShine ? 'bg-emerald-500' : 'bg-white/20'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${config.enableClawShine ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.titleScale} ({config.titleScale.toFixed(1)}x)</label>
                      <input 
                        type="range" 
                        min="0.5" max="2" step="0.1"
                        value={config.titleScale}
                        onChange={e => setConfig({...config, titleScale: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.titleYOffset} ({config.titleYOffset}px)</label>
                      <input 
                        type="range" 
                        min="-200" max="200" step="10"
                        value={config.titleYOffset}
                        onChange={e => setConfig({...config, titleYOffset: parseInt(e.target.value)})}
                        className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-4"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.likePhase}</label>
                      <select 
                        value={config.likePhase === null ? 'none' : config.likePhase}
                        onChange={e => setConfig({...config, likePhase: e.target.value === 'none' ? null : parseInt(e.target.value)})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="none">{currentT.none}</option>
                        {Array.from({ length: config.totalPhases }).map((_, i) => (
                          <option key={i} value={i + 1}>{currentT.phase} {i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.subscribePhase}</label>
                      <select 
                        value={config.subscribePhase === null ? 'none' : config.subscribePhase}
                        onChange={e => setConfig({...config, subscribePhase: e.target.value === 'none' ? null : parseInt(e.target.value)})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="none">{currentT.none}</option>
                        {Array.from({ length: config.totalPhases }).map((_, i) => (
                          <option key={i} value={i + 1}>{currentT.phase} {i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.commentPhase}</label>
                      <select 
                        value={config.commentPhase === null ? 'none' : config.commentPhase}
                        onChange={e => setConfig({...config, commentPhase: e.target.value === 'none' ? null : parseInt(e.target.value)})}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="none">{currentT.none}</option>
                        {Array.from({ length: config.totalPhases }).map((_, i) => (
                          <option key={i} value={i + 1}>{currentT.phase} {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* AUDIO TAB */}
              {activeTab === 'audio' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">{currentT.bgMusic}</label>
                      <div className="flex items-center gap-2">
                        <label className="flex-1 flex items-center justify-center h-12 bg-black/30 border border-white/10 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors relative overflow-hidden group px-4">
                          <span className="text-sm truncate text-white/70 group-hover:text-emerald-500">
                            {config.bgMusic ? 'Música Selecionada' : 'Fazer Upload (MP3/WAV)'}
                          </span>
                          <input 
                            type="file" 
                            accept="audio/*" 
                            className="hidden" 
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setConfig({...config, bgMusic: e.target?.result as string});
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                        </label>
                        {config.bgMusic && (
                          <button 
                            onClick={() => setConfig({...config, bgMusic: ''})}
                            className="h-12 px-4 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                          >
                            X
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/70">
                        {currentT.bgMusicVolume} ({Math.round(config.bgMusicVolume * 100)}%)
                      </label>
                      <input 
                        type="range" 
                        min="0" max="1" step="0.01"
                        value={config.bgMusicVolume}
                        onChange={e => setConfig({...config, bgMusicVolume: parseFloat(e.target.value)})}
                        className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-4"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          <button onClick={startGame} className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-2xl font-black tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3">
            <Play className="w-8 h-8 fill-current" />
            {currentT.start}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-neutral-950 overflow-hidden">
      <div 
        ref={containerRef}
        className="relative w-full h-full max-w-[calc(100vh*9/16)] flex flex-col items-center shadow-2xl overflow-hidden transition-colors duration-1000"
        style={{
          ...getBackgroundStyles(),
          color: config.textColor,
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        {config.enableBorderShine && (
          <div className="border-shine-wrapper" />
        )}

        {/* Animated Background Layers */}
        {currentBgStyle === 'animated' && (
          <>
            <div 
              className="absolute inset-0 z-0 transition-colors duration-[3000ms] ease-in-out"
              style={{ backgroundColor: animatedColors.c1 }}
            />
            <div 
              className="absolute inset-0 z-0 transition-colors duration-[3000ms] ease-in-out"
              style={{ 
                backgroundColor: animatedColors.c2,
                clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0 100%)'
              }}
            />
          </>
        )}

        {/* Watermarks */}
        {Array.from({ length: 15 }).map((_, i) => (
          <svg key={i} className="watermark" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
            height: `${50 + Math.random() * 100}px`,
            animationDelay: `-${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
            zIndex: 1
          }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z"/>
          </svg>
        ))}

        {/* Title */}
        <div className="relative mt-8 mb-4 z-30 flex flex-col items-center justify-center text-center px-4 w-full"
             style={{ transform: `scale(${config.titleScale}) translateY(${config.titleYOffset}px)` }}>
          <div 
            className="relative font-black uppercase tracking-tighter leading-none w-full flex flex-col items-center"
            style={{ 
              fontFamily: '"Arial Black", Impact, sans-serif',
              filter: `
                drop-shadow(3px 3px 0px white) 
                drop-shadow(-3px -3px 0px white) 
                drop-shadow(3px -3px 0px white) 
                drop-shadow(-3px 3px 0px white)
                drop-shadow(0px 6px 0px white)
                drop-shadow(0px -6px 0px white)
                drop-shadow(6px 0px 0px white)
                drop-shadow(-6px 0px 0px white)
                drop-shadow(0px 12px 15px rgba(0,0,0,0.5))
              `
            }}
          >
            <div className="shine-element" style={{ '--shine-interval': `${config.titleShineInterval}s` } as any} />
            <div className="flex items-center justify-center gap-2 sm:gap-4 relative z-10">
              <div 
                className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] text-white"
                style={{ 
                  WebkitTextStroke: '10px black', 
                  paintOrder: 'stroke fill',
                }}
              >
                {config.titleLine1}
              </div>
              
              {config.emoji && (
                <div 
                  className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] animate-gentle-float"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                >
                  {config.emoji}
                </div>
              )}
            </div>

            <div 
              className="text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] text-[#FFCC00] relative z-20 -mt-2 sm:-mt-4"
              style={{ 
                WebkitTextStroke: '12px black', 
                paintOrder: 'stroke fill',
              }}
            >
              {config.titleLine2}
            </div>
          </div>
        </div>

        {/* Question Box */}
        <div 
          ref={questionBoxRef}
          className="mt-8 w-32 h-32 bg-gradient-to-b from-white to-gray-200 rounded-3xl border-b-8 border-gray-400 shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-center justify-center relative z-40 overflow-hidden"
        >
          {itemInBox ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 flex items-center justify-center"
            >
              {renderItem(true, 0, 0, "w-full h-full")}
            </motion.div>
          ) : (
            <>
              {gameState === 'playing' && config.likePhase === currentPhase ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-blue-600 drop-shadow-md"
                >
                  <ThumbsUp className="w-16 h-16 fill-current" />
                </motion.div>
              ) : gameState === 'playing' && config.subscribePhase === currentPhase ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center drop-shadow-md"
                >
                  <span className="text-sm font-black tracking-tight leading-none">{currentT.subscribeBtn}</span>
                </motion.div>
              ) : gameState === 'playing' && config.commentPhase === currentPhase ? (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-gray-700 drop-shadow-md relative"
                >
                  <MessageCircle className="w-16 h-16 fill-current" />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl pb-2">...</span>
                </motion.div>
              ) : config.targetBoxStyle === 'shadow' ? (
                <div className="w-full h-full flex items-center justify-center opacity-30 brightness-0 animate-pulse">
                  {renderItem(true, 0, 0, "w-24 h-24")}
                </div>
              ) : (
                <span className="text-7xl font-black text-red-600 drop-shadow-md animate-slide-horizontal">?</span>
              )}
            </>
          )}
        </div>

        {/* Grid */}
        <div className="flex-1 w-full flex items-center justify-center p-2 z-30 min-h-0">
          <div 
            className="grid w-full max-w-[98%] h-full max-h-[75vh]"
            style={{ 
              gridTemplateColumns: `repeat(${randomPhases[currentPhase - 1]?.cols || config.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${randomPhases[currentPhase - 1]?.rows || config.rows}, minmax(0, 1fr))`,
              gap: '4px'
            }}
          >
            {Array.from({ length: randomPhases[currentPhase - 1]?.rows || config.rows }).map((_, r) => (
              Array.from({ length: randomPhases[currentPhase - 1]?.cols || config.cols }).map((_, c) => {
                const isTarget = r === currentTarget.r && c === currentTarget.c;
                const showItem = !isTarget || itemInGrid;
                
                const activeRows = randomPhases[currentPhase - 1]?.rows || config.rows;
                const activeCols = randomPhases[currentPhase - 1]?.cols || config.cols;
                const isLastRow = r === activeRows - 1;
                const isLastCol = c === activeCols - 1;
                
                return (
                  <div 
                    key={`${r}-${c}`}
                    id={`cell-${r}-${c}`}
                    ref={isTarget ? targetRef : null}
                    className="flex items-center justify-center relative"
                  >
                    {showItem && renderItem(isTarget, r, c, "w-full h-full")}
                    {config.enableExtraEmojis && !isLastRow && !isLastCol && (
                      <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] z-10 pointer-events-none flex items-center justify-center">
                        {renderItem(false, r, c, "w-full h-full", true)}
                      </div>
                    )}
                  </div>
                )
              })
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-8 pb-8 z-30 relative">
          <motion.div 
            className="h-12 w-full bg-neutral-900 rounded-full border-4 border-black overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            animate={
              timeLeft === 0 
                ? { scaleX: [1, 1.1, 0], opacity: [1, 1, 0], transition: { duration: 0.5 } }
                : { scaleX: 1, opacity: 1 }
            }
          >
            <motion.div 
              className={`h-full relative animate-spiral transition-colors duration-500 ${timeLeft / config.timeLimit > 0.5 ? 'bg-emerald-500' : timeLeft / config.timeLimit > 0.2 ? 'bg-yellow-500' : 'bg-red-500'}`}
              initial={{ width: '100%' }}
              animate={{ width: gameState === 'playing' ? '0%' : '100%' }}
              transition={{ duration: gameState === 'playing' ? config.timeLimit : 0.3, ease: "linear" }}
            />
          </motion.div>

          {/* Channel Name overlay (Persistent) */}
          {config.channelName && (
            <div className="absolute inset-0 pb-8 flex items-center justify-center pointer-events-none z-40">
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-white font-black text-sm drop-shadow-md">
                <div className="w-5 h-3.5 bg-red-600 rounded-sm flex items-center justify-center shadow-sm">
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                </div>
                <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)' }}>
                  {config.channelName}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Claw Assembly (String + Body) */}
        <motion.div
          animate={{ x: clawPos.x, y: clawPos.y }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 z-50 flex flex-col items-center"
          style={{ marginLeft: -64 }} // Center the 128px wide claw (w-32)
        >
          {/* String extending infinitely upwards */}
          <div className="absolute bottom-full w-3 bg-gradient-to-b from-neutral-800 to-neutral-500 border-x border-black" style={{ height: '2000px' }} />
          
          {/* Claw Base */}
          <div className={`w-24 h-12 bg-gradient-to-b ${currentClawTheme.base} border-2 border-black rounded-t-2xl relative z-10 shadow-lg flex justify-center items-center`}>
            <div className="w-12 h-3 bg-black/40 rounded-full" />
          </div>
          
          {/* Prongs Container */}
          <div className="relative w-32 h-24 -mt-2">
            {/* Left Prong */}
            <motion.div
              animate={{ rotate: clawOpen ? 40 : 10 }}
              className={`absolute top-0 left-4 w-5 h-24 bg-gradient-to-b ${currentClawTheme.prong} border-2 border-black origin-top-right rounded-bl-3xl shadow-sm overflow-hidden`}
            >
              <div className="absolute bottom-0 left-full w-6 h-6 bg-gray-400 border-2 border-black border-l-0 rounded-r-lg -ml-1" />
              {config.enableClawShine && <div key={`shine-left-${currentPhase}`} className="animate-claw-shine" />}
            </motion.div>
            {/* Right Prong */}
            <motion.div
              animate={{ rotate: clawOpen ? -40 : -10 }}
              className={`absolute top-0 right-4 w-5 h-24 bg-gradient-to-b ${currentClawTheme.prong} border-2 border-black origin-top-left rounded-br-3xl shadow-sm overflow-hidden`}
            >
              <div className="absolute bottom-0 right-full w-6 h-6 bg-gray-400 border-2 border-black border-r-0 rounded-l-lg -mr-1" />
              {config.enableClawShine && <div key={`shine-right-${currentPhase}`} className="animate-claw-shine" />}
            </motion.div>
            
            {/* Item in claw */}
            {itemInClaw && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 z-0 flex items-center justify-center">
                {renderItem(true, 0, 0, "w-full h-full")}
              </div>
            )}
          </div>
        </motion.div>

        {/* Finished Overlay */}
        {gameState === 'finished' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
          >
            {currentPhase < config.totalPhases ? (
              <button 
                onClick={nextPhase}
                className="px-8 py-4 bg-emerald-500 text-white rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-3"
              >
                <Play className="w-8 h-8" />
                {currentT.nextPhase}
              </button>
            ) : (
              <button 
                onClick={() => {
                  setGameState('setup');
                  setTimeLeft(config.timeLimit);
                  setItemInGrid(true);
                  setItemInBox(false);
                  setItemInClaw(false);
                  setClawPos({ x: containerRef.current?.clientWidth ? containerRef.current.clientWidth / 2 : 200, y: 50 });
                  setClawOpen(true);
                }}
                className="px-8 py-4 bg-white text-black rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-3"
              >
                <ArrowLeft className="w-8 h-8" />
                {currentT.back}
              </button>
            )}
          </motion.div>
        )}

        {/* Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && config.transitionType !== 'none' && (
            <motion.div
              key="transition-overlay"
              className="absolute inset-0 z-[100] overflow-hidden pointer-events-none flex items-center justify-center"
            >
              {config.transitionType === 'whirlpool' ? (
                <>
                  <div 
                    className="absolute w-10 h-10 bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500 animate-whirlpool"
                    style={{ '--transition-time': `${config.transitionTime}s` } as any}
                  />
                  <motion.div
                    className="absolute z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: config.transitionTime / 2, delay: config.transitionTime / 2 }}
                  >
                    <span className="text-white font-black text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] whitespace-nowrap">
                      {config.transitionText}
                    </span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    className="absolute w-[300%] h-[300%] bg-[#ff007f] origin-center"
                    initial={{ x: '100%', y: '-100%', rotate: 45 }}
                    animate={{ x: '-100%', y: '100%', rotate: 45 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: config.transitionTime, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-[300%] h-[300%] bg-[#00e5ff] origin-center"
                    initial={{ x: '100%', y: '-100%', rotate: 45 }}
                    animate={{ x: '-100%', y: '100%', rotate: 45 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: config.transitionTime, ease: "easeInOut", delay: config.transitionTime * 0.1 }}
                  />
                  <motion.div
                    className="absolute w-[300%] h-[300%] bg-[#ffaa00] origin-center flex items-center justify-center"
                    initial={{ x: '100%', y: '-100%', rotate: 45 }}
                    animate={{ x: '-100%', y: '100%', rotate: 45 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: config.transitionTime, ease: "easeInOut", delay: config.transitionTime * 0.2 }}
                  >
                    <span className="text-white font-black text-6xl md:text-8xl drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] -rotate-45 whitespace-nowrap">
                      {config.transitionText}
                    </span>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Music */}
        {config.bgMusic && (
          <audio 
            ref={audioRef} 
            src={config.bgMusic} 
            loop 
            preload="auto"
          />
        )}
      </div>
    </div>
  );
}
