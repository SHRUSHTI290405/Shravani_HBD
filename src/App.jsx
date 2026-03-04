import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Cake, ChevronRight, Sparkles, Gift, Star, Music, Camera, Smile, 
  Zap, Quote, Trophy, Info, Volume2, Calendar, Award, HeartHandshake,
  CheckCircle2, XCircle, MousePointer2, Utensils, Plane, Ghost, 
  Laugh, VolumeX, AlertCircle
} from 'lucide-react';

// --- Configuration & Data ---
const HER_NAME = "Shravani"; 

// Update this URL with Shravani's best photo for the final reveal!
const SHRAVANI_HERO_PHOTO = "hero.jpeg";

// Interactive Memories used in the Game and Stack stages
const MEMORIES = [
  {
    url: "/public/hero.jpeg",
    caption: "The beginning of a beautiful chapter."
  },
  {
    url: "/public/m4.jpeg",
    caption: "Shravani, your energy is infectious!"
  },
  {
    url: "/public/m3.jpeg",
    caption: "Radiating joy on your special day."
  },
  {
    url: "/public/m2.jpeg",
    caption: "To the endless adventures ahead!"
  }
];

// Dedicated Collection Photos for the final page
const COLLECTION_PHOTOS = [
  { url: "/public/c1.jpeg", title: "Celebration 1" },
  { url: "/public/c2.jpeg", title: "Vibe 2" },
  { url: "/public/c3.jpeg", title: "Magic 3" },
  { url: "/public/c4.jpeg", title: "Party 4" },
  { url: "/public/c5.jpeg", title: "Happy 5" },
  { url: "/public/C6.jpeg", title: "Squad 6" },
  { url: "/public/m4.jpeg", title: "Night 7" },
  { url: "/public/m2.jpeg", title: "Dream 8" }
];

const ROASTS = [
  "Shravani's logic: Jr mala kahi avdla tr te expensive nahiye te investment ahe 💸",
  "Mala as vatat mala gadi chalvta yeta ...... mala khr yete ka? 🚴‍♂️",
  "He bolnyat expert ki 'Me 5 min ale' But still bathroom madhech. 🚿",
  "Mi svta chya improvement sathi jevan banvayla shikle ki aai chya taunt mule ?🧠"
];

const REFLECTION_THEMES = [
  { title: "Travel", icon: <Plane size={24} />, color: "bg-blue-100", text: "To all the places we've yet to see!", img: "/public/nautanki.jpeg" },
  { title: "Food", icon: <Utensils size={24} />, color: "bg-orange-100", text: "May your year be full of treats!", img: "/public/foodie.jpeg" },
  { title: "Laughs", icon: <Ghost size={24} />, color: "bg-yellow-100", text: "To the jokes only we understand!", img: "/public/laughs.jpeg" },
  { title: "Vibe", icon: <Music size={24} />, color: "bg-purple-100", text: "Always keeping it 100% Shravani.", img: "/public/vibe.jpeg" }
];

const TRIVIA_QUESTIONS = [
  { q: "What is Shravani's absolute favorite way to spend a weekend?", a: ["Sleeping till noon", "Cafe hopping", "Binge-watching shows", "Adventure trips"], correct: 0 },
  { q: "Which of these describes Shravani's vibe best?", a: ["The Calm Soul", "The Chaos Creator", "The Pure Sunshine", "The Mystery Woman"], correct: 2 },
  { q: "If Shravani was a color, which one would she be?", a: ["Soft Tulip Pink", "Electric Purple", "Sun-kissed Yellow", "Classic White"], correct: 0 }
];

const VIRTUES = ["Kind-Hearted", "Hilarious", "Resilient", "Fashionista", "Brilliant", "Supportive", "Empathetic", "Pure Soul"];

const BIRTHDAY_WISHES = [
  "May your year be as bright as your smile! ✨",
  "Sending you endless love and cake today! 🎂",
  "To a year of big wins and even bigger laughs! 🏆",
  "Stay fabulous, stay you, Shravani! 💖",
  "May every dream you have take flight this year! 🕊️"
];

// --- Global Audio Component ---
const GlobalMusic = ({ isPlaying, toggleMusic }) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => console.log("User interaction required for audio"));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/public/song.mp3" 
        loop 
      />
      <button 
        onClick={toggleMusic}
        className="fixed bottom-6 left-6 z-[200] bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 text-pink-600 hover:bg-pink-50 transition-all focus:outline-none"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </>
  );
};

// --- Background Components ---
const PoppingTulips = () => {
  const [tulips, setTulips] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTulip = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: Math.random() * 20 + 20,
      };
      setTulips(prev => [...prev.slice(-8), newTulip]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {tulips.map(t => (
          <motion.div
            key={t.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="absolute"
            style={{ left: `${t.x}%`, top: `${t.y}%`, fontSize: `${t.size}px` }}
          >
            🌷
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const Background = () => {
  const elements = useMemo(() => Array.from({ length: 20 }), []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#fff8fa]">
      <PoppingTulips />
      {elements.map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: i % 2 === 0 ? '#f472b6' : '#fda4af'
          }}
          animate={{ y: [0, -100, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {i % 3 === 0 ? <Heart size={20} fill="currentColor" /> : <Star size={15} fill="currentColor" />}
        </motion.div>
      ))}
    </div>
  );
};

const CustomConfetti = () => {
  const pieces = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 5, duration: 3 + Math.random() * 3,
    color: ['#f472b6', '#ec4899', '#fbcfe8', '#ffffff', '#fbbf24'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
  })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, x: `${p.x}vw`, rotate: 0 }}
          animate={{ y: '110vh', rotate: 720, x: `${p.x + (Math.random() * 10 - 5)}vw` }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
          className="absolute"
          style={{ backgroundColor: p.color, width: p.size, height: p.size, borderRadius: i % 2 === 0 ? '50%' : '2px' }}
        />
      ))}
    </div>
  );
};

// --- Step Screens ---

const EntryScreen = ({ onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center relative z-10">
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full">
      <div className="mb-8 relative inline-block">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 border-2 border-dashed border-pink-200 rounded-full" />
        <div className="bg-white p-6 rounded-full shadow-xl relative z-10 border border-pink-50">
           <Gift className="w-12 h-12 text-pink-500" />
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-pink-700 leading-tight mb-4 tracking-tighter">SHRAVANI'S <br /> <span className="text-rose-400 italic font-serif font-light">Memory Vault</span></h1>
      <p className="text-pink-400 font-bold tracking-[0.2em] uppercase mb-12 text-xs md:text-sm">A customized interactive journey</p>
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        onClick={onNext} 
        className="w-full max-w-xs px-8 py-5 bg-pink-600 text-white rounded-2xl font-black text-xl shadow-lg flex items-center justify-center gap-3 mx-auto"
      >
        Open the Vault <ChevronRight />
      </motion.button>
    </motion.div>
  </div>
);

const HeartCatcherGame = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [basketPos, setBasketPos] = useState(50);
  const [items, setItems] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  
  const gameRef = useRef(null);
  const basketRef = useRef(50);
  const scoreRef = useRef(0);
  const hasTriggeredComplete = useRef(false);
  const targetScore = 12;

  useEffect(() => { basketRef.current = basketPos; }, [basketPos]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  const handleMove = (e) => {
    if (!gameRef.current || isFinished) return;
    const rect = gameRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.max(8, Math.min(92, x)));
  };

  useEffect(() => {
    let lastTime = performance.now();
    let spawnTimer = 0;
    let frameId;

    const gameLoop = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (scoreRef.current < targetScore) {
        spawnTimer += deltaTime;
        if (spawnTimer > 0.9) {
          setItems(prev => [...prev, { id: Math.random(), x: 10 + Math.random() * 80, y: -10, type: Math.random() > 0.2 ? 'heart' : 'star' }]);
          spawnTimer = 0;
        }

        setItems(prev => {
          const bX = basketRef.current;
          const bY = 82; 
          const collisionWidth = 12;
          return prev.map(item => ({ ...item, y: item.y + 30 * deltaTime }))
            .filter(item => {
              const hit = Math.abs(item.y - bY) < 6 && Math.abs(item.x - bX) < collisionWidth;
              if (hit) {
                setScore(s => s + (item.type === 'heart' ? 1 : 2));
                return false;
              }
              return item.y < 105;
            });
        });
        frameId = requestAnimationFrame(gameLoop);
      }
    };
    frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (score >= targetScore && !hasTriggeredComplete.current) {
      hasTriggeredComplete.current = true;
      setIsFinished(true);
      setTimeout(onComplete, 1200);
    }
  }, [score, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-pink-700">Catch the Birthday Vibes!</h2>
        <div className="inline-block mt-2 px-4 py-1 bg-white/80 rounded-full font-black text-pink-600 shadow-sm border border-pink-100 text-sm">
          PROGRESS: {score} / {targetScore}
        </div>
      </div>
      <div 
        ref={gameRef} onMouseMove={handleMove} onTouchMove={handleMove}
        className="relative w-full max-w-md h-[55vh] md:h-[60vh] bg-white/40 backdrop-blur-xl rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden touch-none cursor-none"
      >
        {items.map(item => (
          <div key={item.id} className="absolute pointer-events-none" style={{ top: `${item.y}%`, left: `${item.x}%`, transform: 'translate(-50%, -50%)' }}>
            {item.type === 'heart' ? <Heart className="text-pink-500 fill-pink-500 w-8 h-8" /> : <Star className="text-yellow-400 fill-yellow-400 w-10 h-10" />}
          </div>
        ))}
        <div className="absolute bottom-12 left-0 transition-all duration-100 pointer-events-none" style={{ left: `${basketPos}%`, transform: 'translateX(-50%)' }}>
          <div className="w-20 h-10 bg-pink-500 rounded-b-full rounded-t-lg shadow-xl border-t-2 border-white flex items-center justify-center">
             <Smile className="text-white w-6 h-6" />
          </div>
        </div>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-pink-600/95 flex items-center justify-center z-50 p-6 text-center text-white">
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                 <Zap size={60} className="mx-auto mb-4 fill-white" />
                 <h3 className="text-4xl font-black mb-2 italic">Level Unlocked!</h3>
                 <p className="font-bold tracking-widest uppercase text-xs">Preparing Trivia Challenge...</p>
             </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TriviaChallenge = ({ onNext }) => {
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const handleAnswer = (index) => {
    if (index === TRIVIA_QUESTIONS[current].correct) {
      setFeedback('correct');
      setTimeout(() => {
        if (current < TRIVIA_QUESTIONS.length - 1) { setCurrent(current + 1); setFeedback(null); } 
        else { onNext(); }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white mx-auto text-center relative overflow-hidden">
        <Trophy className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-pink-800 mb-1">Shravani Trivia</h2>
        <p className="text-pink-500 font-bold mb-6 tracking-widest uppercase text-[10px]">Q{current + 1} of {TRIVIA_QUESTIONS.length}</p>
        <div className="mb-8 min-h-[60px] flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.p key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-lg md:text-xl font-serif text-pink-900 italic font-medium leading-tight">
               "{TRIVIA_QUESTIONS[current].q}"
             </motion.p>
           </AnimatePresence>
        </div>
        <div className="grid gap-3">
          {TRIVIA_QUESTIONS[current].a.map((ans, i) => (
            <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(i)} className="w-full py-4 px-5 rounded-xl font-bold text-pink-800 bg-white border border-pink-100 hover:border-pink-400 transition-colors shadow-sm text-sm">
              {ans}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="absolute inset-0 flex items-center justify-center bg-white/95 z-20">
               {feedback === 'correct' ? <CheckCircle2 className="w-20 h-20 text-green-500" /> : <XCircle className="w-20 h-20 text-red-500" />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const WishJar = ({ onNext }) => {
  const [currentWish, setCurrentWish] = useState("");
  const popWish = () => { setCurrentWish(BIRTHDAY_WISHES[Math.floor(Math.random() * BIRTHDAY_WISHES.length)]); };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xs w-full mx-auto">
        <h2 className="text-3xl font-black text-pink-700 mb-2 uppercase">Magic Wish Jar</h2>
        <p className="text-pink-500 mb-10 italic text-sm">Tap for a birthday secret!</p>
        <div className="relative mb-16 h-48 flex items-center justify-center">
          <motion.div whileTap={{ scale: 0.9, rotate: 5 }} onClick={popWish} className="cursor-pointer relative z-20">
            <div className="w-40 h-52 bg-white/50 backdrop-blur-md rounded-b-[3.5rem] rounded-t-xl border-4 border-white shadow-2xl flex flex-col items-center pt-6 overflow-hidden">
               <div className="w-full h-3 bg-pink-200 absolute top-3" />
               <Gift size={64} className="text-pink-400 mt-8" />
               <div className="absolute bottom-4 text-pink-300 font-black tracking-widest text-[9px]">TAP TO OPEN</div>
            </div>
          </motion.div>
          <AnimatePresence>
            {currentWish && (
              <motion.div key={currentWish} initial={{ scale: 0, y: 50, opacity: 0 }} animate={{ scale: 1, y: -160, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="absolute top-0 z-30 bg-white p-6 rounded-2xl shadow-2xl border-2 border-pink-100 w-full left-0">
                <p className="text-pink-700 font-black text-lg leading-tight">{currentWish}</p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b-2 border-r-2 border-pink-100" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={onNext} className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black shadow-xl flex items-center justify-center gap-2">
          Why You're Special <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
};

const VirtueWall = ({ onNext }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center">
    <h2 className="text-3xl font-black text-pink-700 mb-2 tracking-tighter">Why We Celebrate You</h2>
    <p className="text-pink-400 font-bold mb-10 tracking-widest uppercase text-[10px]">What makes Shravani iconic</p>
    <div className="flex flex-wrap justify-center gap-2 max-w-md mb-12">
      {VIRTUES.map((v, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.1 }} className="px-4 py-2 bg-white rounded-full text-sm md:text-base font-bold text-pink-600 shadow-md border border-pink-50 flex items-center gap-1">
          <Sparkles size={14} className="text-yellow-400" /> {v}
        </motion.div>
      ))}
    </div>
    <motion.button onClick={onNext} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-base flex items-center gap-3 shadow-xl">
      Continue to Photos <ChevronRight size={18} />
    </motion.button>
  </div>
);

const SnapshotStack = ({ onNext }) => {
  const [stack, setStack] = useState(MEMORIES.map((m, i) => ({ ...m, id: i })));

  const handleExit = (id) => {
    setStack(prev => {
      const newStack = prev.filter(item => item.id !== id);
      if (newStack.length === 0) setTimeout(onNext, 1000);
      return newStack;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 overflow-hidden select-none">
      <h2 className="text-2xl md:text-3xl font-black text-pink-700 mb-1 text-center">The Snapshot Stack</h2>
      <p className="text-pink-400 font-bold mb-10 uppercase tracking-widest text-[9px] text-center">Flick photos to clear the path!</p>
      
      <div className="relative w-64 h-80 md:w-80 md:h-[450px] perspective-1000 mx-auto">
        <AnimatePresence>
          {stack.map((item, i) => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                const isTossed = Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 400 || Math.abs(info.offset.y) > 120;
                if (isTossed) handleExit(item.id);
              }}
              initial={{ scale: 0.95, rotate: (i - 1) * 3, y: i * 3 }}
              animate={{ scale: 1, rotate: (i - 1) * 3, y: 0 }}
              exit={{ x: 800, rotate: 60, opacity: 0, transition: { duration: 0.4 } }}
              whileDrag={{ scale: 1.05 }}
              className="absolute inset-0 bg-white p-3 shadow-2xl border-2 border-pink-50 rounded-2xl cursor-grab active:cursor-grabbing flex flex-col"
              style={{ zIndex: stack.length - i }}
            >
              <div className="flex-grow rounded-xl overflow-hidden bg-pink-50 pointer-events-none">
                 <img src={item.url} alt="Snapshot" className="w-full h-full object-cover" />
              </div>
              <div className="h-12 flex items-center justify-center font-serif text-pink-400 italic text-sm font-bold">
                 #{item.id + 1} Captured Joy
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {stack.length === 0 && (
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center justify-center h-full text-pink-600 font-black text-2xl">
              <Sparkles className="mb-2 text-yellow-400" size={48} />
              CLEARED!
           </motion.div>
        )}
      </div>
    </div>
  );
};

const MemoryVault = ({ onNext }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <div className="max-w-2xl w-full bg-white/60 backdrop-blur-2xl p-4 md:p-8 rounded-[2.5rem] border border-white shadow-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden bg-pink-50 shadow-inner">
               <img src={MEMORIES[index].url} className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20" alt="blur" />
               <img src={MEMORIES[index].url} className="relative z-10 w-full h-full object-contain p-2" alt="Memory" />
            </div>
            <p className="text-lg md:text-2xl font-serif italic text-pink-900 leading-snug text-center mt-6 px-4">"{MEMORIES[index].caption}"</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between items-center px-2">
           <div className="flex gap-1.5">
              {MEMORIES.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-pink-500' : 'w-2 bg-pink-200'}`} />
              ))}
           </div>
           <motion.button whileTap={{ scale: 0.9 }} onClick={() => index < MEMORIES.length - 1 ? setIndex(index + 1) : onNext()} className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
             <ChevronRight size={24} />
           </motion.button>
        </div>
      </div>
    </div>
  );
};

const ReflectionCards = ({ onNext }) => {
  const [revealed, setRevealed] = useState([]);
  const toggleCard = (idx) => { if (!revealed.includes(idx)) setRevealed([...revealed, idx]); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <h2 className="text-2xl md:text-3xl font-black text-pink-700 mb-2 text-center">Reflection Cards</h2>
      <p className="text-pink-400 font-bold mb-10 uppercase tracking-widest text-[10px] text-center">Reveal the 4 pillars of the squad</p>
      <div className="grid grid-cols-2 gap-4 max-w-sm w-full mb-12">
        {REFLECTION_THEMES.map((theme, i) => (
          <motion.div key={i} whileTap={{ scale: 0.95 }} onClick={() => toggleCard(i)} className={`relative aspect-[3/4] rounded-2xl shadow-xl cursor-pointer overflow-hidden border-2 border-white ${theme.color}`}>
            <AnimatePresence mode="wait">
              {!revealed.includes(i) ? (
                <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="bg-white p-3 rounded-full text-pink-400 mb-2 shadow-sm">{theme.icon}</div>
                  <h3 className="font-black text-pink-600 text-xs md:text-sm uppercase tracking-tighter">{theme.title}</h3>
                </motion.div>
              ) : (
                <motion.div key="back" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 bg-white">
                   <img src={theme.img} className="w-full h-full object-cover opacity-20" alt="reveal" />
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <p className="text-pink-900 font-serif italic text-[10px] md:text-xs leading-tight font-bold">"{theme.text}"</p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <motion.button disabled={revealed.length !== 4} onClick={onNext} className={`px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-opacity ${revealed.length !== 4 ? 'opacity-30' : 'opacity-100'}`}>
        Squad Messages <ChevronRight size={16} />
      </motion.button>
    </div>
  );
};

const FriendshipNotes = ({ onNext }) => {
  const notes = [
    { text: "Happy B'day Shravani! You're the best!", from: "Shrushti", color: "bg-yellow-100" },
    { text: "To many more midnight snacks!", from: "Shrushti", color: "bg-pink-100" },
    { text: "Keep shining, you absolute star!", from: "Shrushti", color: "bg-blue-100" },
    { text: "The world needs more of your laugh!", from: "Shrushti", color: "bg-green-100" },
    { text: "To the person who makes every memory magical. Love you!", from: "Shrushti", color: "bg-orange-100" }
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10">
      <h2 className="text-3xl font-black text-pink-700 mb-10 text-center">Squad's Messages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full mb-12">
        {notes.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`${n.color} p-6 shadow-xl flex flex-col justify-between aspect-square rounded-sm border-b-4 border-black/5`}>
             <Quote className="text-black/5 w-10 h-10" />
             <p className="text-sm md:text-base font-bold text-zinc-800 leading-snug">{n.text}</p>
             <p className="text-right font-black text-[10px] uppercase tracking-widest text-pink-600">— {n.from}</p>
          </motion.div>
        ))}
      </div>
      <motion.button onClick={onNext} className="px-8 py-4 bg-pink-600 text-white rounded-2xl font-black text-sm flex items-center gap-3 shadow-lg">
        The Roast-o-Matic <Laugh size={18} />
      </motion.button>
    </div>
  );
};

const RoastOMatic = ({ onNext }) => {
  const [currentRoast, setCurrentRoast] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const getRoast = () => { setCurrentRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)]); setClickCount(c => c + 1); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center">
      <div className="mb-10 bg-pink-100 px-4 py-2 rounded-full border border-pink-200 inline-flex items-center gap-2">
        <AlertCircle size={16} className="text-pink-600" />
        <span className="text-pink-800 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">100% Personal Accuracy</span>
      </div>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-sm w-full bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border-2 border-pink-100 mx-auto">
        <Laugh size={48} className="text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-pink-700 mb-2">Roast-o-Matic</h2>
        <p className="text-pink-400 text-xs font-medium italic mb-6">Birthday teasing is required by law.</p>
        <div className="min-h-[100px] mb-8 flex items-center justify-center bg-white/50 rounded-2xl p-4 border border-pink-50">
          <AnimatePresence mode="wait">
            {currentRoast ? (
              <motion.p key={currentRoast} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-base font-bold text-pink-900 leading-relaxed">{currentRoast}</motion.p>
            ) : (
              <p className="text-pink-200 font-black tracking-widest uppercase text-xs">Ready?</p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={getRoast} className="w-full py-4 bg-pink-500 text-white rounded-xl font-black text-base shadow-md">Get Roast! 💥</button>
          {clickCount >= 3 && <button onClick={onNext} className="w-full py-4 bg-zinc-900 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2">I Forgive You <Heart size={14} fill="white" /></button>}
        </div>
      </motion.div>
    </div>
  );
};

const SuspenseScreen = ({ onNext }) => {
  const [progress, setProgress] = useState(0);
  const [pops, setPops] = useState([]);
  const triggerRef = useRef(false);

  useEffect(() => {
    if (progress >= 100 && !triggerRef.current) { triggerRef.current = true; onNext(); }
  }, [progress, onNext]);

  useEffect(() => {
    const int = setInterval(() => setProgress(p => (p < 100 ? p + 1 : 100)), 50);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    const int = setInterval(() => {
      if (progress < 100) {
        const p = { id: Date.now(), url: MEMORIES[Math.floor(Math.random()*MEMORIES.length)].url, x: 10 + Math.random()*80, y: 10 + Math.random()*80 };
        setPops(prev => [...prev.slice(-3), p]);
      }
    }, 1000);
    return () => clearInterval(int);
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AnimatePresence>
          {pops.map(p => (
            <motion.div key={p.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} exit={{ scale: 0, opacity: 0 }} className="absolute w-32 h-32 md:w-48 md:h-48 rounded-xl border-2 border-white/20 overflow-hidden" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}>
              <img src={p.url} className="w-full h-full object-cover" alt="pop" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-10 text-center w-full max-w-xs">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="mb-10 mx-auto">
          <Heart size={80} className="text-pink-500 fill-pink-500" />
        </motion.div>
        <h2 className="text-pink-500 font-black tracking-[0.2em] mb-8 uppercase text-[10px]">Processing 24 Years...</h2>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-4"><motion.div className="h-full bg-pink-600" style={{ width: `${progress}%` }} /></div>
        <div className="font-mono text-3xl font-black text-pink-400">{progress}%</div>
      </div>
    </div>
  );
};

const CakeCeremony = ({ onNext }) => {
  const [isCut, setIsCut] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center">
      <h2 className="text-3xl font-black text-pink-800 mb-16 uppercase tracking-tighter">MAKE A WISH! 🎂</h2>
      <div className="relative cursor-pointer mx-auto" onClick={() => !isCut && setIsCut(true)}>
        <Cake className={`w-48 h-48 md:w-64 md:h-64 text-pink-400 z-10 transition-all duration-1000 ${isCut ? 'scale-150 opacity-10 rotate-12' : ''}`} />
        {isCut && (
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex items-center justify-center">
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="px-10 py-5 bg-pink-600 text-white rounded-2xl font-black text-xl shadow-2xl animate-bounce">THE REVEAL! 🎊</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const FinalSurprise = () => (
  <div className="min-h-screen relative py-16 px-6 bg-gradient-to-b from-rose-50 via-pink-50 to-white text-center z-10">
    <CustomConfetti />
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative mb-12">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -inset-4 bg-pink-400 rounded-full blur-2xl" />
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-10 mx-auto">
          <img src={SHRAVANI_HERO_PHOTO} alt="Birthday Girl" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517841905240-472988babdf9"; }} />
        </div>
      </motion.div>
      <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-3xl md:text-6xl font-black leading-tight text-pink-600 tracking-tighter mb-16 uppercase">
        HAPPY BIRTHDAY <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">{HER_NAME}</span>
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white/80 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] shadow-xl border border-white mb-20">
          <p className="text-lg md:text-3xl font-serif italic text-pink-900 leading-snug">
             "Today the world is just a little bit brighter because it's celebrating you. May your new year be filled with unapologetic joy, massive success, and memories that make your soul dance."
          </p>
      </motion.div>
      <div className="w-full">
        <h2 className="text-2xl font-black text-pink-700 mb-8 flex items-center justify-center gap-2"><Camera size={20} /> THE COLLECTION</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTION_PHOTOS.map((m, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-white p-3 rounded-2xl shadow-lg border border-pink-50 aspect-square flex items-center justify-center overflow-hidden">
              <img src={m.url} className="w-full h-full object-contain rounded-xl" alt="collect" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-20 py-8 border-t border-pink-100 w-full">
         <div className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-full shadow-lg text-sm md:text-lg font-black tracking-tighter">🏆 2026 IS SHRAVANI'S YEAR</div>
         <p className="mt-8 text-pink-300 font-bold uppercase text-[9px] tracking-[0.4em]">Digitally Crafted With Love</p>
      </div>
    </div>
  </div>
);

// --- Stable Main App ---
export default function App() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const nextStep = () => { if (step === 0) setIsPlaying(true); setStep(prev => prev + 1); window.scrollTo(0, 0); };
  const toggleMusic = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-[#fffdfd] font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden relative">
      <Background />
      <GlobalMusic isPlaying={isPlaying} toggleMusic={toggleMusic} />
      <main className="relative w-full">
        <AnimatePresence mode="wait">
          {step === 0 && <EntryScreen key="0" onNext={nextStep} />}
          {step === 1 && <HeartCatcherGame key="1" onComplete={nextStep} />}
          {step === 2 && <TriviaChallenge key="2" onNext={nextStep} />}
          {step === 3 && <WishJar key="3" onNext={nextStep} />}
          {step === 4 && <VirtueWall key="4" onNext={nextStep} />}
          {step === 5 && <SnapshotStack key="5" onNext={nextStep} />}
          {step === 6 && <MemoryVault key="6" onNext={nextStep} />}
          {step === 7 && <ReflectionCards key="7" onNext={nextStep} />}
          {step === 8 && <FriendshipNotes key="8" onNext={nextStep} />}
          {step === 9 && <RoastOMatic key="9" onNext={nextStep} />}
          {step === 10 && <SuspenseScreen key="10" onNext={nextStep} />}
          {step === 11 && <CakeCeremony key="11" onNext={nextStep} />}
          {step === 12 && <FinalSurprise key="12" />}
        </AnimatePresence>
      </main>
      <motion.div className="fixed top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-600 to-rose-400 origin-left z-[110]" animate={{ scaleX: (step + 1) / 13 }} transition={{ type: 'spring', damping: 25 }} />
    </div>
  );
}

const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
`;
document.head.appendChild(style);
