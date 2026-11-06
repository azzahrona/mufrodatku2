import { ArrowRight, CheckCircle2, CircleHelp, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import WordVisual from "../components/WordVisual";
import AudioButton from "../components/AudioButton";
import { categories } from "../data/categories";
import { vocabulary, type Vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";

type QuizQuestion = { word: Vocabulary; options: Vocabulary[] };

function shuffle<T,>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildQuestions(categoryId: string): QuizQuestion[] {
  const pool = categoryId === "all" ? vocabulary : vocabulary.filter((word) => word.categoryId === categoryId);
  return shuffle(pool).slice(0, Math.min(10, pool.length)).map((word) => {
    const distractors = shuffle(vocabulary.filter((item) => item.id !== word.id)).slice(0, 3);
    return { word, options: shuffle([word, ...distractors]) };
  });
}


export default function QuizPage() {
  const [categoryId, setCategoryId] = useState("all");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const { saveQuizResult, progress } = useProgress();
  const current = questions[index];
  const percentage = questions.length ? Math.round((score / questions.length) * 100) : 0;

  const startQuiz = () => {
    const nextQuestions = buildQuestions(categoryId);
    setQuestions(nextQuestions);
    setIndex(0);
    setSelectedId(null);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const chooseAnswer = (id: string) => {
    if (selectedId || !current) return;
    setSelectedId(id);
    if (id === current.word.id) setScore((value) => value + 1);
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex((value) => value + 1);
      setSelectedId(null);
    } else {
      saveQuizResult(score, questions.length);
      setFinished(true);
    }
  };

  const resultMessage = percentage >= 90 ? "Luar biasa! Kamu hebat sekali!" : percentage >= 70 ? "Bagus! Terus tingkatkan!" : percentage >= 50 ? "Sudah bagus, ayo berlatih lagi!" : "Jangan menyerah, coba sekali lagi!";

  return (
    <>
      <PageHeader eyebrow="UJI KEMAMPUANMU" title="Kuis tebak arti kosakata" description="Pilih jawaban yang paling tepat. Setiap soal akan membantumu mengingat kosakata." />
      {!started && (
        <section className="quiz-start-card">
          <div className="quiz-start-art"><div className="quiz-big-icon">🧠</div><span className="quiz-spark spark-a">✦</span><span className="quiz-spark spark-b">✧</span></div>
          <div className="quiz-start-content">
            <div className="eyebrow">SIAP BERMAIN?</div>
            <h2>Uji ingatanmu dengan kuis seru!</h2>
            <p>Jawab hingga 10 pertanyaan pilihan ganda. Pilih tema tertentu atau campur semua tema.</p>
            <label className="field-label" htmlFor="quiz-category">Pilih tema kuis</label>
            <select id="quiz-category" className="select-field" value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
              <option value="all">Semua tema</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <div className="quiz-info-row"><span><CircleHelp size={16} /> Maksimal 10 soal</span><span><Trophy size={16} /> Nilai tersimpan</span></div>
            <button className="button button-primary button-wide" onClick={startQuiz}>Mulai kuis <ArrowRight size={17} /></button>
          </div>
        </section>
      )}

      {started && !finished && current && (
        <section className="quiz-card">
          <div className="quiz-topline"><span className="soft-tag">SOAL {index + 1} DARI {questions.length}</span><span className="quiz-score-pill"><Trophy size={15} /> {score} benar</span></div>
          <div className="quiz-progress-track"><div className="quiz-progress-fill" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
          <div className="quiz-question-area">
            <div className="quiz-question-visual"><WordVisual word={current.word} /></div>
            <div className="quiz-question-copy">
              <div className="eyebrow">APA ARTI KOSAKATA INI?</div>
              <div className="quiz-arabic" dir="rtl">{current.word.arabic}</div>
              <AudioButton text={current.word.arabic} large />
              <p>Pilih arti yang benar dalam Bahasa Indonesia.</p>
            </div>
          </div>
          <div className="quiz-options">
            {current.options.map((option, optionIndex) => {
              const isCorrect = option.id === current.word.id;
              const isSelected = selectedId === option.id;
              const showCorrect = Boolean(selectedId) && isCorrect;
              const showWrong = Boolean(selectedId) && isSelected && !isCorrect;
              return (
                <button key={option.id} className={`quiz-option ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`} onClick={() => chooseAnswer(option.id)} disabled={Boolean(selectedId)}>
                  <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                  <span>{option.meaning}</span>
                  {showCorrect && <CheckCircle2 size={19} />}
                  {showWrong && <XCircle size={19} />}
                </button>
              );
            })}
          </div>
          {selectedId && (
            <div className={`answer-feedback ${selectedId === current.word.id ? "positive" : "negative"}`}>
              {selectedId === current.word.id ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <div><strong>{selectedId === current.word.id ? "Tepat sekali!" : "Belum tepat, tidak apa-apa!"}</strong><span>{current.word.arabic} artinya {current.word.meaning}. Yuk, ingat kata ini!</span></div>
            </div>
          )}
          <div className="quiz-footer"><span>Jawab dengan teliti, ya!</span><button className="button button-primary" disabled={!selectedId} onClick={nextQuestion}>{index === questions.length - 1 ? "Lihat hasil" : "Soal berikutnya"} <ArrowRight size={16} /></button></div>
        </section>
      )}

      {started && finished && (
        <section className="quiz-result-card">
          <div className="result-confetti">✦　✧　✦</div>
          <div className="result-trophy"><Trophy size={42} /></div>
          <div className="eyebrow">HASIL KUISMU</div>
          <h2>{resultMessage}</h2>
          <div className="result-score">{score}<span>/{questions.length}</span></div>
          <div className="result-percent">{percentage}% jawaban benar</div>
          <p>Terus berlatih agar kosakata Bahasa Arabmu semakin banyak.</p>
          <div className="result-stats">
            <div><strong>{score}</strong><span>Jawaban benar</span></div>
            <div><strong>{questions.length - score}</strong><span>Perlu dipelajari</span></div>
            <div><strong>{progress.bestQuizScore}%</strong><span>Nilai terbaik</span></div>
          </div>
          <div className="result-actions">
            <button className="button button-outline" onClick={() => { setStarted(false); setFinished(false); }}><RotateCcw size={16} /> Kembali</button>
            <button className="button button-primary" onClick={startQuiz}>Coba lagi <ArrowRight size={16} /></button>
          </div>
        </section>
      )}
    </>
  );
}