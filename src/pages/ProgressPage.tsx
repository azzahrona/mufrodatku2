import { Award, BookOpen, ClipboardList, RotateCcw, Target, Trophy } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";
import { useProgress } from "../context/ProgressContext";

export default function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const completion = Math.round((progress.learnedWordIds.length / vocabulary.length) * 100);
  const handleReset = () => {
    if (window.confirm("Yakin ingin menghapus seluruh progres belajar di browser ini?")) resetProgress();
  };

  return (
    <>
      <PageHeader eyebrow="PERKEMBANGAN BELAJAR" title="Lihat pencapaianmu!" description="Setiap langkah kecil adalah kemajuan. Terus belajar dan kumpulkan lebih banyak bintang!" action={<button className="button button-outline reset-progress" onClick={handleReset}><RotateCcw size={15} /> Reset progres</button>} />
      <section className="progress-overview">
        <div className="progress-circle" style={{ background: `conic-gradient(#43A66D ${completion * 3.6}deg, #e8f0e9 0deg)` }}>
          <div><strong>{completion}%</strong><span>selesai</span></div>
        </div>
        <div className="progress-overview-copy"><div className="eyebrow">PERJALANANMU</div><h2>{completion === 100 ? "Luar biasa, semua kosakata sudah dipelajari!" : "Kamu sedang berkembang!"}</h2><p>Kamu sudah mempelajari <strong>{progress.learnedWordIds.length} dari {vocabulary.length} kosakata</strong>. Teruskan perjalanan belajarmu sampai tuntas.</p><div className="progress-track wide"><div className="progress-fill" style={{ width: `${completion}%` }} /></div></div>
        <div className="progress-overview-decoration">🌱</div>
      </section>
      <section className="stats-grid progress-stats">
        <StatCard icon={BookOpen} label="Kata dipelajari" value={progress.learnedWordIds.length} note={`Dari ${vocabulary.length} kosakata`} tone="green" />
        <StatCard icon={ClipboardList} label="Kuis selesai" value={progress.quizAttempts} note="Jumlah kuis dikerjakan" tone="blue" />
        <StatCard icon={Trophy} label="Nilai terbaik" value={`${progress.bestQuizScore}%`} note="Rekor kuismu" tone="yellow" />
        <StatCard icon={Target} label="Game selesai" value={progress.matchGamesCompleted} note="Permainan menjodohkan" tone="purple" />
      </section>
      <section className="section-block">
        <div className="section-heading"><div><div className="eyebrow">RINCIAN MATERI</div><h2>Progres setiap tema</h2><p>Lihat tema mana yang sudah kamu kuasai.</p></div></div>
        <div className="progress-category-list">
          {categories.map((category) => {
            const words = vocabulary.filter((word) => word.categoryId === category.id);
            const learned = words.filter((word) => progress.learnedWordIds.includes(word.id)).length;
            const percent = Math.round((learned / words.length) * 100);
            return (
              <div className="progress-category-row" key={category.id}>
                <div className="progress-category-icon" style={{ background: category.color }}>{category.emoji}</div>
                <div className="progress-category-info"><div className="progress-category-title"><strong>{category.name}</strong><span>{learned}/{words.length} kata</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div></div>
                <div className="progress-category-percent">{percent}%</div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="progress-note"><Award size={20} /><div><strong>Ingat, belajar bukan perlombaan!</strong><span>Yang terpenting adalah terus mencoba dan mengulang materi sampai kamu benar-benar paham.</span></div></div>
      <p className="storage-note">Progres tersimpan di browser/perangkat ini. Jika data browser dihapus atau kamu berganti perangkat, progres tidak otomatis berpindah.</p>
    </>
  );
}