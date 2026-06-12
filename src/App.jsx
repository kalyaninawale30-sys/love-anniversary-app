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

  // INTRO
  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // AUTO SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // AUDIO
  useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 0.6;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // PASSWORD
  const checkPassword = () => {
    if (password === "1406") {
      setUnlocked(true);
    } else {
      alert("Wrong password 💔");
    }
  };

  // SWIPE
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

  // HEART EFFECT
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

  // INTRO SCREEN
  if (showIntro) {
    return (
      <div style={styles.center}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          style={{ color: "#ff4da6", textAlign: "center" }}
        >
          💖 Our Love Story Begins 💖
        </motion.h1>
      </div>
    );
  }

  // LOCK SCREEN
  if (!unlocked) {
    return (
      <div style={styles.center}>
        <h1 style={{ color: "#ff4da6" }}>Enter Secret Code 💖</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={checkPassword} style={styles.button}>
          Enter
        </button>
      </div>
    );
  }

  return (
    <div style={styles.app} onClick={createHeart}>

      <audio ref={audioRef} src={song} loop />

      {/* FLOATING HEARTS */}
      <div style={styles.hearts}>
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
              x: [0, 25, -25, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={styles.heart}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* MAIN CARD */}
      <div style={styles.card}>
        <h1 style={styles.title}>
          Happy Anniversary ❤️
        </h1>

        {/* SLIDESHOW GRID STYLE (PERFECT ALIGN FIX) */}
        <div
          style={styles.sliderWrap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={current}
            src={photos[current]}
            style={styles.image}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <p style={styles.text}>
          I love you forever ❤️
        </p>

        <p style={styles.subText}>
          I’d choose you in every lifetime 💖
        </p>

        <div style={{ fontSize: "50px", textAlign: "center" }}>
          💖
        </div>
      </div>

      {/* MUSIC BUTTON */}
      <button onClick={toggleMusic} style={styles.musicBtn}>
        🎵 Music
      </button>

      {/* ANIMATION */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
      `}</style>

    </div>
  );
}

export default App;

/* ================= PERFECT STYLES ================= */
const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, black, #2b0018, black)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    color: "white"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "black",
    color: "white"
  },

  card: {
    width: "100%",
    maxWidth: "850px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid #ff4da6",
    borderRadius: "25px",
    padding: "25px",
    zIndex: 10,
    textAlign: "center"
  },

  title: {
    color: "#ff4da6",
    fontSize: "32px",
    marginBottom: "10px"
  },

  sliderWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },

  image: {
    height: "450px",
    width: "100%",
    maxWidth: "380px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "25px",
    border: "2px solid #ff4da6",
    boxShadow: "0 10px 30px rgba(255,77,166,0.3)"
  },

  text: {
    marginTop: "15px",
    fontSize: "18px"
  },

  subText: {
    marginTop: "10px",
    fontSize: "20px",
    color: "#ffb3d9"
  },

  input: {
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px"
  },

  button: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#ff4da6",
    color: "white",
    border: "none",
    borderRadius: "10px"
  },

  musicBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#ff4da6",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "25px"
  },

  hearts: {
    position: "absolute",
    inset: 0,
    overflow: "hidden"
  },

  heart: {
    position: "absolute",
    color: "#ff4da6",
    fontSize: "20px"
  }
};