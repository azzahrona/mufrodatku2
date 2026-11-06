import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/categories";
import { vocabulary } from "../data/vocabulary";

export default function MaterialsPage() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => categories.filter((category) => {
    const words = vocabulary.filter((word) => word.categoryId === category.id);
    const query = search.toLowerCase().trim();
    return !query || category.name.toLowerCase().includes(query) || category.arabic.includes(query) ||
      words.some((word) => word.meaning.toLowerCase().includes(query) || word.arabic.includes(query));
  }), [search]);

  return (
    <>
      <PageHeader eyebrow="JELAJAHI MATERI" title="Pilih tema belajar" description="Ada banyak kosakata menarik yang bisa kamu pelajari. Pilih tema yang kamu suka!" />
      <div className="materials-toolbar">
        <div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari tema atau kosakata..." /></div>
        <div className="toolbar-note"><SlidersHorizontal size={16} /> {filtered.length} tema tersedia</div>
      </div>
      {filtered.length > 0 ? (
        <div className="category-grid materials-grid">
          {filtered.map((category) => (
            <CategoryCard key={category.id} category={category} words={vocabulary.filter((word) => word.categoryId === category.id)} />
          ))}
        </div>
      ) : (
        <div className="empty-state"><div>🔎</div><h3>Belum menemukan materi</h3><p>Coba kata pencarian yang lain, ya.</p></div>
      )}
      <div className="tip-box"><span>💡</span><p><strong>Tips belajar:</strong> Pilih satu tema, pelajari gambarnya, dengarkan pelafalannya, lalu coba ingat artinya sebelum membuka jawaban.</p></div>
    </>
  );
}