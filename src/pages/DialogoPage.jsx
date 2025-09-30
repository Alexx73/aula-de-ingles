import { useRef, useState } from "react";
import dialogo from "../assets/dialogo_track 33.mp3"; // si importaste el mp3 con Vite/CRA

export default function DialogoPage() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);

  // Reproducir audio (control seguro)
  const playAudio = async () => {
    const a = audioRef.current;
    if (!a) {
      console.warn("Audio no inicializado aún (audioRef vacío).");
      return;
    }

    // Aseguramos la velocidad actual antes de reproducir
    a.playbackRate = rate;

    try {
      // play() retorna una promesa; capturamos errores (autoplay/CORS...)
      await a.play();
      setPlaying(true);
    } catch (err) {
      console.error("No se pudo reproducir el audio:", err);
      // Mensaje al usuario (opcional)
      alert(
        "No se pudo reproducir el audio. Asegurate de haber interactuado con la página y que el archivo esté disponible.",
      );
    }
  };

  // Pausar audio
  const pauseAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setPlaying(false);
  };

  // Toggle play/pause (un solo botón)
  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      await playAudio();
    } else {
      pauseAudio();
    }
  };

  // Cambiar velocidad (controlado)
  const changeSpeed = (e) => {
    const v = parseFloat(e.target.value) || 1;
    setRate(v);
    if (audioRef.current) {
      audioRef.current.playbackRate = v;
    }
  };

  return (
    <div className="p-2">
      {/* PDF embed */}
      <div className="mb-2 h-[70vh] w-full">
        <iframe
          src="https://drive.google.com/file/d/1cBb7XAJEa2hwAqPTWsB5gSTbWye5iX70/preview"
          className="px h-screen w-full"
          title="Diálogo PDF"
        ></iframe>
      </div>

      <div
        className="mb-4 flex flex-col items-center gap-4 rounded-md p-4 shadow md:flex-row md:justify-center md:gap-8"
        id="controles "
      >
        {/* Controles de audio */}
        <div className="mb-1 text-center">
          <figure>
            <figcaption className="pb-2">Dialog</figcaption>
            <audio className="" controls src={dialogo}></audio>
            <a className="pt-2" href={dialogo}>
              Download audio
            </a>
          </figure>

          {/* <button
            onClick={togglePlay}
            className="rounded-lg bg-green-500 px-6 py-2 font-bold text-white hover:bg-green-600"
          >
            {playing ? "⏸️ Pausar" : "▶️ Reproducir"}
          </button> */}

          {/* Botón extra play/pause separado (opcional) */}
          {/* <div className="flex gap-2">
          <button
            onClick={playAudio}
            className="rounded-lg bg-green-300 px-4 py-2 font-semibold text-white hover:bg-green-400"
          >
            ▶️
          </button>
          <button
            onClick={pauseAudio}
            className="rounded-lg bg-red-400 px-4 py-2 font-semibold text-white hover:bg-red-500"
          >
            ⏸️
          </button>
        </div> */}
        </div>

        {/* Selector de velocidad */}
        {/* <div className="text-center">
          <label className="mr-2 rounded-md border bg-green-200 px-2 py-1 font-bold dark:bg-gray-800 dark:text-white">
            🔊 Velocidad:
          </label>
          <select
            value={rate}
            onChange={changeSpeed}
            className="rounded-md border px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div> */}

        {/* Audio oculto */}
        <audio ref={audioRef} id="audio-dialogo" preload="auto">
          {/* Uso el mp3 importado con Vite/CRA (asegurate que exista en assets) */}
          <source src={dialogo} type="audio/mpeg" />
          Tu navegador no soporta audio.
        </audio>
      </div>
    </div>
  );
}
