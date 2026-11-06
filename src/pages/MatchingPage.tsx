import { Check, RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";

type MatchCard = { id: string; pairId: string; kind: "arabic" | "meaning"; label: string; emoji: string };

function shuffle<T,>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createDeck(categoryId: string) {
  const pool = categoryId === "all" ? vocabulary : vocabulary.filter((word) => word.categoryId === categoryId);
  const chosen = shuffle(pool).slice(0, 6);
  const cards: MatchCard[] = chosen.flatMap((word) => [
    { id: `${word.id}-ar`, pairId: word.id, kind: "arabic" as const, label: word.arabic, emoji: word.emoji },
    { id: `${word.id}-id`, pairId: word.id, kind: "meaning" as const, label: word.meaning, emoji: word.emoji },
  ]);
  return { chosen, cards: shuffle(cards) };
}

export default function MatchingPage() {
  const [categoryId, setCategoryId] = useState("all");
  const [game, setGame] = useState(() => createDeck("all"));
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [saved, setSaved] = useState(false);
  const { saveMatchResult } = useProgress();
  const complete = matched.length === game.chosen.length && game.chosen.length > 0;

  const newGame = (nextCategory = categoryId) => {
    setGame(createDeck(nextCategory));
    setSelected([]);
    setMatched([]);
    setWrong([]);
    setAttempts(0);
    setSaved(false);
  };

  useEffect(() => { newGame(categoryId); }, [categoryId]);

  useEffect(() => {
    if (complete && !saved) {
      saveMatchResult();
      setSaved(true);
    }
  }, [complete, saved, saveMatchResult]);

  const handleCard = (card: MatchCard) => {
    if (selected.length >= 2 || matched.includes(card.pairId) || selected.includes(card.id)) return;
    if (selected.length === 0) {
      setSelected([card.id]);
      return;
    }
    const first = game.cards.find((item) => item.id === selected[0]);
    setAttempts((value) => value + 1);
    setSelected((value) => [...value, card.id]);
    if (first && first.pairId === card.pairId && first.kind !== card.kind) {
      setMatched((value) => [...value, card.pairId]);
      window.setTimeout(() => setSelected([]), 450);
    } else {
      setWrong([selected[0], card.id]);
      window.setTimeout(() => { setSelected([]); setWrong([]); }, 850);
    }
  };

  return (
    <>
      <PageHeader eyebrow="PERMAINAN KOSAKATA" title="Ayo cocokkan kata!" description="Temukan pasangan kosakata Bahasa Arab dan arti Bahasa Indonesianya." />
      <div className="game-toolbar">
        <div className="game-select"><label htmlFor="match-category">Tema permainan</label><select id="match-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="all">Semua tema</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div className="game-metrics"><div><strong>{matched.length}</strong><span> / 6 pasangan</span></div><div><strong>{attempts}</strong><span> percobaan</span></div></div>
        <button className="button button-outline" onClick={() => newGame()}><RefreshCw size={16} /> Acak ulang</button>
      </div>
      <div className="matching-instruction"><Sparkles size={18} /><span>Pilih satu kartu Bahasa Arab, lalu pilih kartu arti yang cocok.</span></div>
      {complete ? (
        <div className="match-complete">
          <div className="match-complete-emoji">🎉</div>
          <div className="eyebrow">HEBAT SEKALI!</div>
          <h2>Semua pasangan berhasil ditemukan!</h2>
          <p>Kamu menyelesaikan 6 pasangan dalam {attempts} percobaan.</p>
          <button className="button button-primary" onClick={() => newGame()}>Main lagi <RefreshCw size={16} /></button>
        </div>
      ) : (
        <div className="matching-grid">
          {game.cards.map((card) => {
            const isSelected = selected.includes(card.id);
            const isMatched = matched.includes(card.pairId);
            const isWrong = wrong.includes(card.id);
            return (
              <button key={card.id} className={`matching-card ${isSelected ? "selected" : ""} ${isMatched ? "matched" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => handleCard(card)} disabled={isMatched}>
                <span className="matching-card-emoji">{card.emoji}</span>
                <span className={card.kind === "arabic" ? "matching-arabic" : "matching-meaning"} dir={card.kind === "arabic" ? "rtl" : undefined}>{card.label}</span>
                <span className="matching-card-kind">{card.kind === "arabic" ? "BAHASA ARAB" : "ARTI INDONESIA"}</span>
                {isMatched && <span className="matched-check"><Check size={15} /></span>}
              </button>
            );
          })}
        </div>
      )}
      <div className="game-tip"><span>🌟</span><p><strong>Tips:</strong> Baca tulisan Arab dengan teliti. Jika belum cocok, coba ingat kembali materi yang sudah kamu pelajari.</p></div>
    </>
  );
}