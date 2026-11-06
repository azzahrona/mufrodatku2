import { ArrowLeft, ArrowRight, Layers3, RotateCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import WordVisual from "../components/WordVisual";
import AudioButton from "../components/AudioButton";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";

export default function FlashcardsPage() {
  const [categoryId, setCategoryId] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { markLearned, progress } = useProgress();
  const words = useMemo(() => categoryId === "all" ? vocabulary : vocabulary.filter((word) => word.categoryId === categoryId), [categoryId]);
  const word = words[index];

  useEffect(() => { setIndex(0); setFlipped(false); }, [categoryId]);

  const move = (direction: number) => {
    setIndex((current) => (current + direction + words.length) % words.length);
    setFlipped(false);
  };

  return (
    <>
      <PageHeader eyebrow="KARTU HAFALAN" title="Main kartu, ingat kosakata!" description="Coba tebak arti kata sebelum membalik kartu untuk melihat jawabannya." />
      <div className="flashcard-toolbar">
        <label htmlFor="flash-category">Pilih tema</label>
        <select id="flash-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="all">Semua tema</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <span className="toolbar-note"><Layers3 size={16} /> {words.length} kartu</span>
      </div>
      {word && (
        <div className="flashcard-stage">
          <div className="flashcard-instruction"><RotateCw size={16} /> Ketuk kartu untuk membaliknya</div>
          <button type="button" className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((value) => !value)}>
            <div className="flashcard-inner">
              <div className="flashcard-face flashcard-front">
                <div className="flashcard-label">APA BAHASA ARABNYA?</div>
                <WordVisual word={word} className="flashcard-visual" />
                <div className="flashcard-arabic" dir="rtl">{word.arabic}</div>
                <div className="flashcard-tap">Ketuk untuk melihat arti <span>↻</span></div>
              </div>
              <div className="flashcard-face flashcard-back">
                <div className="flashcard-label">ARTINYA ADALAH</div>
                <div className="flashcard-meaning">{word.meaning}</div>
                <div className="flashcard-latin">{word.latin}</div>
                <div className="flashcard-category">{categories.find((item) => item.id === word.categoryId)?.name}</div>
                <div className="flashcard-tap">Ketuk untuk kembali <span>↻</span></div>
              </div>
            </div>
          </button>
          <div className="flashcard-audio"><AudioButton text={word.arabic} large /></div>
          <div className="flashcard-controls">
            <button className="button button-outline" onClick={() => move(-1)}><ArrowLeft size={17} /> Sebelumnya</button>
            <span className="flashcard-count">{index + 1} / {words.length}</span>
            <button className="button button-primary" onClick={() => move(1)}>Berikutnya <ArrowRight size={17} /></button>
          </div>
          <button className="button button-success flashcard-learned" onClick={() => markLearned(word.id)}>
            {progress.learnedWordIds.includes(word.id) ? "✓ Sudah masuk daftar dipelajari" : "✓ Aku sudah hafal kata ini"}
          </button>
        </div>
      )}
    </>
  );
}