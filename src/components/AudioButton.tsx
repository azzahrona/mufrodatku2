import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioButton({ text, large = false }: { text: string; large?: boolean }) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      className={`audio-button ${large ? "large" : ""} ${speaking ? "speaking" : ""}`}
      onClick={speak}
      disabled={!supported}
      title={supported ? "Dengarkan pelafalan Bahasa Arab" : "Browser ini belum mendukung audio"}
      aria-label="Dengarkan pelafalan"
    >
      {supported ? <Volume2 size={large ? 21 : 17} /> : <VolumeX size={17} />}
      {large && <span>{speaking ? "Sedang diputar..." : "Dengarkan pelafalan"}</span>}
    </button>
  );
}