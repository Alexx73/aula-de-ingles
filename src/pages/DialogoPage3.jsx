import React, { useEffect, useRef, useState } from "react";

// 🎨 Colores estilo WhatsApp (puedes editarlos aquí)
const colors = {
  speaker1: { light: "#DCF8C6", dark: "#056162" }, // Verde (enviado)
  speaker2: { light: "#FFFFFF", dark: "#262d31" }, // Blanco / gris (recibido)
};

export default function DialogoPage3({ audioFile, transcriptFile }) {
  const audioRef = useRef(null);
  const frasesRefs = useRef([]);
  const [transcript, setTranscript] = useState([]);
  const [fraseActual, setFraseActual] = useState(-1);
  const [modo, setModo] = useState("normal"); // "normal" | "pausas"
  const [darkMode, setDarkMode] = useState(false);

  // en lugar de fetch
  useEffect(() => {
    if (transcriptFile) {
      setTranscript(transcriptFile.segments);
    }
  }, [transcriptFile]);

  // ▶️ Reproducir frase actual
  const reproducirFrase = (index) => {
    if (index < 0 || index >= transcript.length) return;
    setFraseActual(index);
    const audio = audioRef.current;

    audio.currentTime = transcript[index].start_time;
    audio.play();

    if (modo === "normal") {
      audio.onended = () => reproducirFrase(index + 1);
    } else {
      audio.onended = null; // espera input del usuario
    }
  };

  const iniciar = () => reproducirFrase(0);
  const siguiente = () => reproducirFrase(fraseActual + 1);
  const anterior = () => reproducirFrase(fraseActual - 1);
  const salir = () => {
    setFraseActual(-1);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // ⬆️ Auto-scroll al cambiar frase
  useEffect(() => {
    if (fraseActual >= 0 && frasesRefs.current[fraseActual]) {
      frasesRefs.current[fraseActual].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [fraseActual]);

  return (
    <div
      className={`flex h-screen flex-col ${darkMode ? "bg-[#111b21]" : "bg-[#ECE5DD]"}`}
    >
      {/* 🔹 Header */}
      <div className="flex items-center justify-between bg-green-600 p-4 font-bold text-white">
        <span>📖 Interactive Dialogue</span>
        <div className="flex gap-3">
          {/* Selector de modo */}
          <label className="text-sm">
            <input
              type="radio"
              checked={modo === "normal"}
              onChange={() => setModo("normal")}
            />{" "}
            Normal
          </label>
          <label className="text-sm">
            <input
              type="radio"
              checked={modo === "pausas"}
              onChange={() => setModo("pausas")}
            />{" "}
            Pausas
          </label>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded bg-gray-800 px-2 py-1 text-sm text-white"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* 🔹 Chat del diálogo */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4 pb-32">
        {transcript.map((seg, i) => {
          const isSpeaker1 = seg.speaker.id === "speaker_1";
          const isActive = i === fraseActual;

          return (
            <div
              key={i}
              ref={(el) => (frasesRefs.current[i] = el)}
              className={`flex ${isSpeaker1 ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[75%] rounded-lg px-4 py-2 shadow ${
                  isSpeaker1 ? "rounded-bl-2xl" : "rounded-br-2xl"
                }`}
                style={{
                  backgroundColor: darkMode
                    ? isSpeaker1
                      ? colors.speaker1.dark
                      : colors.speaker2.dark
                    : isSpeaker1
                      ? colors.speaker1.light
                      : colors.speaker2.light,
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Nombre del personaje */}
                <strong
                  className={`mb-1 block text-sm font-bold ${
                    isSpeaker1
                      ? "text-[#075E54] dark:text-[#25D366]"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {seg.speaker.id === "speaker_1" ? "Jack" : "Tom"}
                </strong>
                <p className="text-sm break-words">{seg.text}</p>

                {/* 📌 Cola estilo WhatsApp */}
                {isSpeaker1 ? (
                  <span className="absolute -right-2 bottom-2 h-0 w-0 border-b-[10px] border-l-[10px] border-b-transparent border-l-[#DCF8C6] dark:border-l-[#056162]"></span>
                ) : (
                  <span className="absolute bottom-2 -left-2 h-0 w-0 border-r-[10px] border-b-[10px] border-r-white border-b-transparent dark:border-r-[#262d31]"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Botones fijos abajo */}
      {fraseActual >= 0 && (
        <div className="fixed right-0 bottom-0 left-0 flex bg-black/70">
          <button
            onClick={anterior}
            className="flex-1 bg-green-600/80 py-4 text-2xl text-white hover:bg-green-700/80"
          >
            ⏮️
          </button>
          <button
            onClick={siguiente}
            className="flex-1 bg-blue-600/80 py-4 text-2xl text-white hover:bg-blue-700/80"
          >
            ⏭️
          </button>
          <button
            onClick={salir}
            className="flex-1 bg-red-600/80 py-4 text-2xl text-white hover:bg-red-700/80"
          >
            ❌
          </button>
        </div>
      )}

      {/* 🔹 Botón inicial */}
      {fraseActual < 0 && (
        <div className="flex items-center justify-center py-6">
          <button
            onClick={iniciar}
            className="rounded-lg bg-green-500 px-6 py-3 text-xl text-white hover:bg-green-600"
          >
            ▶️ Iniciar diálogo
          </button>
        </div>
      )}

      {/* 🔹 Audio oculto */}
      <audio ref={audioRef} src={audioFile} preload="auto" />
    </div>
  );
}
