import { ArrowRight, BookOpen, CheckCircle2, ClipboardList, Flame, Gamepad2, Sparkles, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import CategoryCard from "../components/CategoryCard";
import StatCard from "../components/StatCard";
import WordVisual from "../components/WordVisual";
import AudioButton from "../components/AudioButton";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";

export default function HomePage() {
  const { progress } = useProgress();
  const completion = Math.round((progress.learnedWordIds.length / vocabulary.length) * 100);
  const featured = vocabulary[0];

  return (
    <>
      <PageHeader eyebrow="HALO, TEMAN BELAJAR!" title="Ayo belajar Bahasa Arab!" description="Tambah kosakata baru, dengarkan cara membacanya, lalu uji kemampuanmu." />
      <section className="hero-banner">
        <div className="hero-copy">
          <div className="hero-pill"><Sparkles size={14} /> BELAJAR SAMBIL BERMAIN</div>
          <h2>Petualangan seru<br />mengenal <span>mufradat!</span></h2>
          <p>Belajar sedikit demi sedikit. Kamu pasti bisa menguasai banyak kosakata Bahasa Arab!</p>
          <div className="hero-actions">
            <Link to="/materi" className="button button-white">Mulai belajar <ArrowRight size={17} /></Link>
            <Link to="/kuis" className="hero-text-link">Coba kuis <span>↗</span></Link>
          </div>
          <div className="hero-mini-note"><Star size={14} fill="currentColor" /> Belajar jadi lebih menyenangkan!</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-sun" />
          <div className="hero-book">📚</div>
          <div className="hero-pencil">✏️</div>
          <div className="hero-star star-one">✦</div>
          <div className="hero-star star-two">✧</div>
          <div className="hero-arabic" dir="rtl">مَرْحَبًا</div>
          <div className="hero-cloud">Ahlan wa sahlan!</div>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard icon={BookOpen} label="Total kosakata" value={vocabulary.length} note="Siap untuk dipelajari" tone="green" />
        <StatCard icon={CheckCircle2} label="Sudah dipelajari" value={progress.learnedWordIds.length} note={`${completion}% dari semua kata`} tone="blue" />
        <StatCard icon={ClipboardList} label="Kuis dikerjakan" value={progress.quizAttempts} note="Terus latih kemampuanmu" tone="yellow" />
        <StatCard icon={Trophy} label="Nilai terbaik" value={`${progress.bestQuizScore}%`} note="Pencapaian kuismu" tone="purple" />
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><div className="eyebrow">PILIH PETUALANGANMU</div><h2>Materi pembelajaran</h2><p>Belajar berdasarkan tema yang dekat dengan keseharianmu.</p></div>
          <Link to="/materi" className="text-link">Lihat semua <ArrowRight size={16} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} words={vocabulary.filter((word) => word.categoryId === category.id)} />
          ))}
        </div>
      </section>

      <section className="home-bottom-grid">
        <div className="daily-word-card">
          <div className="daily-word-copy">
            <div className="eyebrow">KATA HARI INI <span>✦</span></div>
            <h3>Yuk, kenali satu kata baru!</h3>
            <p>Mulai dari satu kosakata sederhana. Dengarkan dan coba ucapkan dengan lantang.</p>
            <Link to={`/belajar/${featured.categoryId}`} className="button button-primary">Pelajari kata <ArrowRight size={16} /></Link>
          </div>
          <div className="daily-word-preview">
            <WordVisual word={featured} />
            <div className="arabic-word" dir="rtl">{featured.arabic}</div>
            <div className="word-meaning">{featured.meaning}</div>
            <AudioButton text={featured.arabic} />
          </div>
        </div>
        <div className="challenge-card">
          <div className="challenge-icon"><Gamepad2 size={23} /></div>
          <div className="eyebrow">TANTANGAN SERU</div>
          <h3>Seberapa banyak kata yang kamu ingat?</h3>
          <p>Jawab pertanyaan singkat dan kumpulkan nilai terbaikmu.</p>
          <Link to="/kuis" className="button button-dark">Mulai tantangan <ArrowRight size={16} /></Link>
          <div className="challenge-decoration">✦</div>
        </div>
      </section>

      <section className="encouragement-strip">
        <div className="encouragement-icon"><Flame size={22} /></div>
        <div><strong>Terus semangat, calon ahli Bahasa Arab!</strong><span>Setiap kata yang kamu pelajari adalah langkah menuju keberhasilan.</span></div>
        <div className="encouragement-stars">✦ ✦ ✦</div>
      </section>
    </>
  );
}