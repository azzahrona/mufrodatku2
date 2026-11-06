import type { Vocabulary } from "../data/vocabulary";

export default function WordVisual({ word, className = "" }: { word: Vocabulary; className?: string }) {
  return (
    <div className={`word-visual ${className}`}>
      <img src={word.image} alt={`Ilustrasi ${word.meaning}`} />
    </div>
  );
}