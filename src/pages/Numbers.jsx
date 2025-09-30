import React, { useEffect, useRef, useState } from "react";

// Lista de números y palabras
const numbers = [
  { digit: 1, word: "One" },
  { digit: 2, word: "Two" },
  { digit: 3, word: "Three" },
  { digit: 4, word: "Four" },
  { digit: 5, word: "Five" },
  { digit: 6, word: "Six" },
  { digit: 7, word: "Seven" },
  { digit: 8, word: "Eight" },
  { digit: 9, word: "Nine" },
  { digit: 10, word: "Ten" },
  { digit: 11, word: "Eleven" },
  { digit: 12, word: "Twelve" },
  { digit: 13, word: "Thirteen" },
  { digit: 14, word: "Fourteen" },
  { digit: 15, word: "Fifteen" },
  { digit: 16, word: "Sixteen" },
  { digit: 17, word: "Seventeen" },
  { digit: 18, word: "Eighteen" },
  { digit: 19, word: "Nineteen" },
  { digit: 20, word: "Twenty" },
];

// Colores para los números
const numberColors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-yellow-400",
  "bg-cyan-400",
  "bg-green-500",
  "bg-purple-600",
];

function getNumberColor(idx) {
  return numberColors[idx % numberColors.length];
}

export default function Numbers() {
  const [playing, setPlaying] = useState(null);
  const voicesRef = useRef([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Cargar voces al montar
  useEffect(() => {
    function loadVoices() {
      voicesRef.current = window.speechSynthesis.getVoices();
      setVoicesLoaded(true);
    }
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Pronunciar el número
  const handleSpeak = async (word, idx) => {
    if (playing !== null) return; // Evita reproducir múltiples

    setPlaying(idx);

    // Sintetizador de voz
    const utter = new window.SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    utter.rate = 0.8;

    // Buscar voz femenina en inglés
    const femaleVoice =
      voicesRef.current.find(
        (v) =>
          v.lang.includes("en") &&
          (v.name.toLowerCase().includes("female") ||
            v.name === "Samantha" ||
            v.name === "Microsoft Zira Desktop" ||
            v.name === "Google US English"),
      ) || voicesRef.current.find((v) => v.lang.includes("en"));

    if (femaleVoice) utter.voice = femaleVoice;

    utter.onend = () => setPlaying(null);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);

    // Intentar reproducir archivo de audio si existe
    try {
      const audio = new Audio(`/sounds/${word.toLowerCase()}.mp3`);
      audio.onended = () => setPlaying(null);
      audio.onerror = () => setPlaying(null);
      await audio.play();
    } catch {
      // Si falla el audio, solo usa la voz
    }
  };

  return (
    <div className="flex h-screen min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex w-full max-w-4xl flex-1 flex-col justify-center p-4">
        {/* <h2 className="title mb-4 text-center text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          😉 Numbers in English 😍
        </h2> */}
        <div className="numbers-grid grid flex-1 gap-2 md:gap-4">
          {numbers.map((num, idx) => (
            <div
              key={num.digit}
              className={`number flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg font-bold transition-transform select-none ${getNumberColor(
                idx,
              )} ${
                playing === idx
                  ? "scale-110 opacity-100"
                  : "opacity-100 hover:scale-105 active:scale-95"
              }`}
              style={{
                opacity: playing !== null && playing !== idx ? 0.6 : 1,
                pointerEvents:
                  playing !== null && playing !== idx ? "none" : "auto",
              }}
              onClick={() => handleSpeak(num.word, idx)}
            >
              <div className="digit mb-1 text-3xl md:text-5xl">{num.digit}</div>
              <div className="word text-lg md:text-2xl">{num.word}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .numbers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) {
          .numbers-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 768px) {
          .numbers-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .numbers-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
        @media (max-width: 480px) {
          .number {
            min-height: 80px !important;
          }
          .digit {
            font-size: 2rem !important;
          }
          .word {
            font-size: 1rem !important;
          }
          .title {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
