import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "../data/categories";
import type { Vocabulary } from "../data/vocabulary";

export default function CategoryCard({ category, words, compact = false }: {
  category: Category;
  words: Vocabulary[];
  compact?: boolean;
}) {
  return (
    <Link to={`/belajar/${category.id}`} className={`category-card ${compact ? "compact" : ""}`} style={{ background: category.color }}>
      <div className="category-card-top">
        <span className="category-emoji">{category.emoji}</span>
        <span className="category-arrow"><ArrowUpRight size={18} /></span>
      </div>
      <div className="category-arabic" dir="rtl">{category.arabic}</div>
      <h3>{category.name}</h3>
      {!compact && <p>{category.description}</p>}
      <div className="category-card-bottom">
        <span><BookOpen size={14} /> {words.length} kosakata</span>
        <span className="category-open">Mulai belajar</span>
      </div>
    </Link>
  );
}