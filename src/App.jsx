import song from "./assets/love.mp3";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import photo1 from "./assets/photo1.jpeg";
import photo2 from "./assets/photo2.jpeg";
import photo3 from "./assets/photo3.jpeg";
import photo4 from "./assets/photo4.jpeg";
import photo5 from "./assets/photo5.jpeg";
import photo6 from "./assets/photo6.jpeg";
import photo7 from "./assets/photo7.jpeg";
import photo8 from "./assets/photo8.jpeg";
import photo9 from "./assets/photo9.jpeg";
import photo10 from "./assets/photo10.jpeg";
import photo11 from "./assets/photo11.jpeg";
import photo12 from "./assets/photo12.jpeg";

function App() {
  const audioRef = useRef(null);

  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");

  const [showIntro, setShowIntro] = useState(true);

  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

  const photos = [
    photo1, photo2, photo3, photo4,
    photo5, photo6, photo7, photo8,
    photo9, photo10, photo11, photo12
  ];

  // 🎥 CINEMATIC INTRO
  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  // 🎵 AUDIO SETUP
  useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 0;
      audioRef.current.play();

      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.6) {
          vol += 0.05;
          audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    } else {
      audioRef.current.pause();
    }
  };

  // 🔐 PASSWORD CHECK
  const checkPassword = () => {
    if (password === "1406") {
      setUnlocked(true);
    } else {
      alert("Wrong password 💔");
    }
  };

  // 📱 SWIPE GALLERY
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      setCurrent((prev) => (prev + 1) % photos.length);
    } else if (endX - startX > 50) {
      setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  // 💖 HEART EFFECT
  const createHeart = (e) => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = "28px";
    heart.style.animation = "floatUp 1.2s ease-out";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  };

  // 🌙 INTRO SCREEN
  if (showIntro) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="text-4xl text-pink-400"
        >
          💖 Our Love Story Begins 💖
        </motion.h1>
      </div>
    );
  }

  // 🔐 LOCK SCREEN
  if (!unlocked) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl text-pink-400">Enter Secret Code 💖</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 p-2 rounded text-black"
          placeholder="Enter password"
        />

        <button
          onClick={checkPassword}
          className="mt-4 bg-pink-500 px-4 py-2 rounded"
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={createHeart}
      className="min-h-screen overflow-hidden bg-gradient-to-br from-black via-pink-950 to-black text-white relative flex flex-col items-center justify-center px-6 py-10"
    >

      {/* AUDIO */}
      <audio ref={audioRef} src={song} loop />

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
              x: [0, 30, -30, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute text-pink-400 text-2xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="backdrop-blur-lg bg-white/10 border border-pink-500/30 shadow-2xl rounded-3xl p-8 max-w-6xl w-full z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-center text-pink-400">
          Happy Anniversary ❤️
        </h1>

        {/* SLIDESHOW */}
        <div
          className="mt-10 flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={current}
            src={photos[current]}
            className="h-96 w-full max-w-md object-cover rounded-3xl shadow-2xl border border-pink-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        </div>

        {/* MESSAGE */}
        <p className="text-center text-pink-200 mt-6 text-lg">
          I love you forever ❤️
        </p>

        {/* FINAL */}
        <div className="text-center mt-16">
          <p className="text-3xl text-pink-300 font-semibold">
            I’d choose you in every lifetime ❤️
          </p>
          <div className="text-7xl mt-6">💖</div>
        </div>
      </motion.div>

      {/* MUSIC BUTTON */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 bg-pink-500 px-4 py-2 rounded-full z-50"
      >
        🎵 Play / Pause
      </button>

      {/* CSS */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
      `}</style>

    </div>
  );
}

export default App;