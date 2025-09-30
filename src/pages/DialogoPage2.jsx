import { useRef, useState, useEffect } from "react";

// si importaste el mp3 con Vite/CRA
// import dialogoDatos
//  from "../assets/dialogo_track 33.mp3";

// 🎵 Importar audios individuales
import jack1 from "../assets/02 - Jack 1.mp3";
import tom1 from "../assets/03 - Tom 1.mp3";
import jack2 from "../assets/04 - Jack 2.mp3";
import tom2 from "../assets/05 - Tom 2.mp3";
import jack3 from "../assets/06 - Jack 3.mp3";
import tom3 from "../assets/07 - Tom 3.mp3";
import jack4 from "../assets/08 - Jack 4.mp3";
import tom4 from "../assets/09 - Tom 4.mp3";
import jack5 from "../assets/10 - Jack 5.mp3";
import tom5 from "../assets/11 - Tom 5.mp3";
import jack6 from "../assets/12 - Jack 6.mp3";
import tom6 from "../assets/13 - Tom 6.mp3";
import jack7 from "../assets/14 - Jack 7.mp3";
import tom7 from "../assets/15 - Tom 7.mp3";
import jack8 from "../assets/16 - Jack 8.mp3";
import tom8 from "../assets/17 - Tom 8.mp3";
import jack9 from "../assets/18 - Jack 9.mp3";

// ... importa todos los demás hasta Jack 9

// 🗨️ Definir el diálogo
const dialogoDatos = [
  {
    personaje: "Jack",
    texto: "Hi, Tom! Is that your new __________?",
    audio: jack1,
    traduccion: "¡Hola, Tom! ¿Es esa tu nueva __________?",
  },
  {
    personaje: "Tom",
    texto: "Yeah! And it’s __________ my favourite apps.",
    audio: tom1,
    traduccion: "¡Sí! Y tiene __________ una de mis aplicaciones favoritas.",
  },
  {
    personaje: "Jack",
    texto: "Wow! That’s fabulous.",
    audio: jack2,
    traduccion: "¡Guau! Eso es fabuloso.",
  },
  {
    personaje: "Tom",
    texto:
      "Look! This is an app for creating characters. Our IT teacher is super cool and she’s got an avatar. And now my schoolmates and I __________ got our own avatars at school too.",

    audio: tom2,
    traduccion: "¡Sí! Y es __________ una de mis aplicaciones favoritas.",
  },
  { personaje: "Jack", texto: "Cool! Is it easy to use?", audio: jack3 },
  // ... y así hasta Jack 9
  {
    personaje: "Tom",
    texto: "Yes, it is! This character is my __________.",
    audio: tom3,
  },
  {
    personaje: "Jack",
    texto: "Fantastic! He’s exactly the same.",
    audio: jack4,
  },
  {
    personaje: "Tom",
    texto: "Let me design you a character. Is __________ character tall?",
    audio: tom4,
  },
  {
    personaje: "Jack",
    texto: "Yes, he is. And he __________ got long legs.",
    audio: jack5,
  },
  // Completa con los demás diálogos y audios
  {
    personaje: "Tom",
    texto: "Oh, and has he __________ strong arms?",
    audio: tom5,
  },
  { personaje: "Jack", texto: "Yes, he has.", audio: jack6 },
  {
    personaje: "Tom",
    texto: "Is he a basketball player?",
    audio: tom6,
  },
  {
    personaje: "Jack",
    texto: "Yes, he __________. And he’s got brown eyes.",
    audio: jack7,
  },
  {
    personaje: "Tom",
    texto: "Has he got a __________ nose?",
    audio: tom7,
  },
  { personaje: "Jack", texto: "Yes, he has.", audio: jack8 },
  { personaje: "Tom", texto: "Is he LeBron James?", audio: tom8 },
  {
    personaje: "Jack",
    texto: "Yes, he is. You know I’m a big __________ of James.",
    audio: jack9,
  },
];

const dialogo1 = [
  {
    frase: "Hi, Tom! Is that your new __________?",
    personaje: "Jack",
    pista: "02",
    traduccion: "¡Hola, Tom! ¿Es ese tu nuevo __________?",
  },
  {
    frase: "Yeah! And it’s __________ my favourite apps.",
    personaje: "Tom",
    pista: "03",
    traduccion: "¡Sí! Y es __________ una de mis aplicaciones favoritas.",
  },
  {
    frase: "Wow! That’s fabulous.",
    personaje: "Jack",
    pista: "04",
    traduccion: "¡Guau! Eso es fabuloso.",
  },
  {
    frase:
      "Look! This is an app for creating characters. Our IT teacher is super cool and she’s got an avatar. And now my schoolmates and I __________ got our own avatars at school too.",
    personaje: "Tom",
    pista: "05",
    traduccion:
      "¡Mira! Esta es una aplicación para crear personajes. Nuestra profe de informática es súper copada y tiene un avatar. Y ahora mis compañeros y yo __________ también tenemos nuestros propios avatares en la escuela.",
  },
  {
    frase: "Cool! Is it easy to use?",
    personaje: "Jack",
    pista: "06",
    traduccion: "¡Genial! ¿Es fácil de usar?",
  },
  {
    frase: "Yes, it is! This character is my __________.",
    personaje: "Tom",
    pista: "07",
    traduccion: "Sí, lo es. Este personaje es mi __________.",
  },
  {
    frase: "Fantastic! He’s exactly the same.",
    personaje: "Jack",
    pista: "08",
    traduccion: "¡Fantástico! Es exactamente igual.",
  },
  {
    frase: "Let me design you a character. Is __________ character tall?",
    personaje: "Tom",
    pista: "09",
    traduccion:
      "Déjame diseñarte un personaje. ¿Es __________ ese personaje alto?",
  },
  {
    frase: "Yes, he is. And he __________ got long legs.",
    personaje: "Jack",
    pista: "10",
    traduccion: "Sí, lo es. Y __________ tiene piernas largas.",
  },
  {
    frase: "Oh, and has he __________ strong arms?",
    personaje: "Tom",
    pista: "11",
    traduccion: "Ah, ¿y tiene __________ brazos fuertes?",
  },
  {
    frase: "Yes, he has.",
    personaje: "Jack",
    pista: "12",
    traduccion: "Sí, los tiene.",
  },
  {
    frase: "Is he a basketball player?",
    personaje: "Tom",
    pista: "13",
    traduccion: "¿Es él un jugador de baloncesto?",
  },
  {
    frase: "Yes, he __________. And he’s got brown eyes.",
    personaje: "Jack",
    pista: "14",
    traduccion: "Sí, __________ lo es. Y tiene ojos marrones.",
  },
  {
    frase: "Has he got a __________ nose?",
    personaje: "Tom",
    pista: "15",
    traduccion: "¿Tiene una nariz __________?",
  },
  {
    frase: "Yes, he has.",
    personaje: "Jack",
    pista: "16",
    traduccion: "Sí, la tiene.",
  },
  {
    frase: "Is he LeBron James?",
    personaje: "Tom",
    pista: "17",
    traduccion: "¿Es él LeBron James?",
  },
  {
    frase: "Yes, he is. You know I’m a big __________ of James.",
    personaje: "Jack",
    pista: "18",
    traduccion: "Sí, lo es. Sabes que soy un gran __________ de James.",
  },
];

const dialogos = [
  {
    frase: "Hi, Tom! Is that your new __________?",
    personaje: "Jack",
    pista: "02 - Jack.mp3",
  },
  {
    frase: "Yeah! And it’s __________ my favourite apps.",
    personaje: "Tom",
    pista: "03 - Tom 1.mp3",
  },
  {
    frase: "Wow! That’s fabulous.",
    personaje: "Jack",
    pista: "04 - Jack 2.mp3",
  },
  {
    frase:
      "Look! This is an app for creating characters. Our IT teacher is super cool and she’s got an avatar. And now my schoolmates and I __________ got our own avatars at school too.",
    personaje: "Tom",
    pista: "05 - Tom 2.mp3",
  },
  {
    frase: "Cool! Is it easy to use?",
    personaje: "Jack",
    pista: "06 - Jack 3.mp3",
  },
  {
    frase: "Yes, it is! This character is my __________.",
    personaje: "Tom",
    pista: "07 - Tom 3.mp3",
  },
  {
    frase: "Fantastic! He’s exactly the same.",
    personaje: "Jack",
    pista: "08 - Jack 4.mp3",
  },
  {
    frase: "Let me design you a character. Is __________ character tall?",
    personaje: "Tom",
    pista: "09 - Tom 4.mp3",
  },
  {
    frase: "Yes, he is. And he __________ got long legs.",
    personaje: "Jack",
    pista: "10 - Jack 5.mp3",
  },
  {
    frase: "Oh, and has he __________ strong arms?",
    personaje: "Tom",
    pista: "11 - Tom 5.mp3",
  },
  { frase: "Yes, he has.", personaje: "Jack", pista: "12 - Jack 6.mp3" },
  {
    frase: "Is he a basketball player?",
    personaje: "Tom",
    pista: "13 - Tom 6.mp3",
  },
  {
    frase: "Yes, he __________. And he’s got brown eyes.",
    personaje: "Jack",
    pista: "14 - Jack 7.mp3",
  },
  {
    frase: "Has he got a __________ nose?",
    personaje: "Tom",
    pista: "15 - Tom 7.mp3",
  },
  { frase: "Yes, he has.", personaje: "Jack", pista: "16 - Jack 8.mp3" },
  { frase: "Is he LeBron James?", personaje: "Tom", pista: "17 - Tom 8.mp3" },
  {
    frase: "Yes, he is. You know I’m a big __________ of James.",
    personaje: "Jack",
    pista: "18 - Jack 9.mp3",
  },
];

const dialogoTiempos = [
  {
    inicio: 0,
    fin: 3,
    personaje: "Jack",
    texto: ["Hello", "Tom,", "how", "are", "you", "today?"],
  },
  {
    inicio: 3,
    fin: 6,
    personaje: "Tom",
    texto: ["I'm", "fine", "Jack,", "thank", "you!", "And", "you?"],
  },
  {
    inicio: 6,
    fin: 9,
    personaje: "Jack",
    texto: ["I'm", "great", "too,", "thanks", "for", "asking."],
  },
];
// Diccionario de glosario
const glosario = {
  Hello: "Hola",
  fine: "Bien",
  thanks: "Gracias",
  asking: "Preguntar",
  today: "Hoy",
};

export default function DialogoPage2() {
  const audioRef = useRef(null);
  const [modo, setModo] = useState("normal"); // "normal" | "pausas"
  const [fraseActual, setFraseActual] = useState(-1);

  // 🔗 refs dinámicos para cada frase
  const frasesRefs = useRef([]);

  // ⬆️ Auto-scroll cuando cambia la frase
  useEffect(() => {
    if (fraseActual >= 0 && frasesRefs.current[fraseActual]) {
      frasesRefs.current[fraseActual].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [fraseActual]);

  // ▶️ Reproducir frase actual
  const reproducirFrase = (index) => {
    if (index < 0 || index >= dialogoDatos.length) return;
    setFraseActual(index);
    const a = audioRef.current;
    a.src = dialogoDatos[index].audio;
    a.play();

    if (modo === "normal") {
      a.onended = () => reproducirFrase(index + 1); // continúa automático
    } else {
      a.onended = null; // espera input del usuario
    }
  };

  const iniciar = () => reproducirFrase(0);
  const siguiente = () => reproducirFrase(fraseActual + 1);
  const anterior = () => reproducirFrase(fraseActual - 1);

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      <h2 className="mb-4 text-xl font-bold text-green-700">
        🎧 Diálogo interactivo
      </h2>

      {/* Selector de modo */}
      <div className="mb-4 flex gap-4">
        <label>
          <input
            type="radio"
            checked={modo === "normal"}
            onChange={() => setModo("normal")}
          />
          <span className="ml-2">Modo Normal</span>
        </label>
        <label>
          <input
            type="radio"
            checked={modo === "pausas"}
            onChange={() => setModo("pausas")}
          />
          <span className="ml-2">Modo con Pausas</span>
        </label>
      </div>

      {/* Botones de control */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={iniciar}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          ▶️ Iniciar
        </button>
        {modo === "pausas" && (
          <>
            <button
              onClick={anterior}
              className="rounded bg-gray-400 px-4 py-2 text-white"
            >
              ⏮️ Anterior
            </button>
            <button
              onClick={siguiente}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              ⏭️ Siguiente
            </button>
          </>
        )}
      </div>

      {/* Botones fijos abajo */}
      {fraseActual >= 0 && (
        <div className="fixed right-0 bottom-0 left-0 flex border-t bg-white dark:bg-gray-900">
          {/* Botón Anterior */}
          <button
            onClick={anterior}
            className="w-1/2 flex-[2] bg-green-600/80 py-4 text-2xl text-white hover:bg-green-700/80"
          >
            ⏮️
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={siguiente}
            className="flex-[2] bg-blue-600/80 py-4 text-2xl text-white hover:bg-blue-700/80"
          >
            ⏭️
          </button>
          {/* Botón Salir */}
          <button
            onClick={() => setFraseActual(-1)}
            className="flex-[2] bg-red-500/80 py-4 text-2xl text-white hover:bg-red-700/80"
          >
            ❌
          </button>
        </div>
      )}

      {/* Texto estilo WhatsApp */}
      <div className="flex flex-col space-y-3 overflow-y-auto bg-[#ECE5DD] p-4 pb-28 dark:bg-[#0B141A]">
        {" "}
        {dialogoDatos.map((f, i) => {
          const isJack = f.personaje === "Jack"; // Jack = enviado
          const isActive = i === fraseActual;

          return (
            <div
              key={i}
              ref={(el) => (frasesRefs.current[i] = el)}
              className={`flex ${isJack ? "justify-end" : "justify-start"}`}
            >
              <div className="relative max-w-[75%]">
                <p
                  className={`rounded-lg px-4 py-2 break-words shadow transition-all ${isActive ? "scale-105" : ""} ${
                    isJack
                      ? isActive
                        ? "bg-[#DCF8C6] dark:bg-[#056162]" // 📌 Jack (verde WhatsApp)
                        : "bg-[#DCF8C6] dark:bg-[#056162]"
                      : isActive
                        ? "bg-white dark:bg-[#262D31]" // 📌 Tom (gris WhatsApp)
                        : "bg-white dark:bg-[#262D31]"
                  } ${isJack ? "rounded-bl-2xl" : "rounded-br-2xl"} `}
                >
                  {/* Nombre del personaje */}
                  <strong
                    className={`mb-1 block text-sm font-bold ${
                      isJack
                        ? "text-[#075E54] dark:text-[#25D366]" // Verde oscuro en claro, verde neón en oscuro
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {f.personaje}
                  </strong>

                  {/* Texto con glosario */}
                  {f.texto.split(" ").map((word, j) => (
                    <span key={j} className="mr-1">
                      {glosario[word.replace(/[^a-zA-Z]/g, "")] ? (
                        <button
                          className="rounded bg-yellow-100 px-1 hover:bg-yellow-200 dark:bg-yellow-700 dark:hover:bg-yellow-600"
                          title={glosario[word.replace(/[^a-zA-Z]/g, "")]}
                        >
                          {word}
                        </button>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </p>

                {/* 📌 Cola estilo WhatsApp */}
                {isJack ? (
                  <span className="absolute -right-2 bottom-2 h-0 w-0 border-b-[10px] border-l-[10px] border-b-transparent border-l-[#DCF8C6] dark:border-l-[#056162]"></span>
                ) : (
                  <span className="absolute bottom-2 -left-2 h-0 w-0 border-r-[10px] border-b-[10px] border-r-white border-b-transparent dark:border-r-[#262D31]"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Audio oculto */}
      <audio ref={audioRef} preload="auto" />
    </div>
  );
}
