import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import WordVisual from "../components/WordVisual";
import AudioButton from "../components/AudioButton";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";
import NotFoundPage from "./NotFoundPage";

export default function LearnPage() {
  const { categoryId } = useParams();
  const category = categories.find((item) => item.id === categoryId);
  const words = useMemo(() => vocabulary.filter((word) => word.categoryId === categoryId), [categoryId]);
  const [index, setIndex] = useState(0);
  const { progress, markLearned } = useProgress();

  if (!category || words.length === 0) return <NotFoundPage />;
  const word = words[index];
  const learned = progress.learnedWordIds.includes(word.id);
  const learnedInCategory = words.filter((item) => progress.learnedWordIds.includes(item.id)).length;

  const goNext = () => setIndex((current) => Math.min(current + 1, words.length - 1));
  const goPrevious = () => setIndex((current) => Math.max(current - 1, 0));

  return (
    <>
      <div className="back-row"><Link to="/materi" className="back-link"><ArrowLeft size={16} /> Kembali ke materi</Link><span className="breadcrumb">Materi / {category.name}</span></div>
      <PageHeader eyebrow={`TEMA ${category.name.toUpperCase()}`} title={`Belajar ${category.name}`} description={category.description} />
      <div className="learn-progress-row">
        <div><strong>{learnedInCategory} dari {words.length} kata</strong><span> sudah kamu pelajari</span></div>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${(learnedInCategory / words.length) * 100}%` }} /></div>
      </div>
      <section className="learning-card">
        <div className="learning-card-top"><span className="soft-tag">KOSAKATA {index + 1} / {words.length}</span><span className="category-tag">{category.emoji} {category.name}</span></div>
        <div className="learning-main">
          <div className="learning-image-wrap"><WordVisual word={word} className="learning-image" /></div>
          <div className="learning-word-content">
            <div className="eyebrow">KOSAKATA BAHASA ARAB</div>
            <div className="learning-arabic" dir="rtl">{word.arabic}</div>
            <div className="learning-latin">{word.latin}</div>
            <div className="learning-divider" />
            <div className="learning-meaning-label">ARTI DALAM BAHASA INDONESIA</div>
            <h2>{word.meaning}</h2>
            <AudioButton text={word.arabic} large />
          </div>
        </div>
        <div className="learning-card-bottom">
          <button className="button button-outline" onClick={goPrevious} disabled={index === 0}><ArrowLeft size={16} /> Sebelumnya</button>
          <button className={`button ${learned ? "button-success" : "button-soft"}`} onClick={() => markLearned(word.id)}>
            {learned ? <CheckCircle2 size={17} /> : <Check size={17} />}
            {learned ? "Sudah dipelajari" : "Tandai sudah hafal"}
          </button>
          <button className="button button-primary" onClick={goNext} disabled={index === words.length - 1}>Berikutnya <ArrowRight size={16} /></button>
        </div>
      </section>
      <div className="word-navigation">
        <div className="word-dots">{words.map((item, itemIndex) => <button key={item.id} className={`word-dot ${itemIndex === index ? "active" : ""} ${progress.learnedWordIds.includes(item.id) ? "done" : ""}`} onClick={() => setIndex(itemIndex)} aria-label={`Buka kosakata ${itemIndex + 1}`} />)}</div>
        <span>{learnedInCategory === words.length ? "Hebat! Semua kata dalam tema ini sudah kamu pelajari." : "Pelajari semua kata untuk menyelesaikan tema ini."}</span>
        <button className="reset-index" onClick={() => setIndex(0)}><RotateCcw size={14} /> Mulai dari awal</button>
      </div>
    </>
  );
}