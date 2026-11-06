import { NavLink } from "react-router-dom";
import { BookOpen, House, Layers3, Puzzle, Trophy, ClipboardList, Sparkles } from "lucide-react";

const navItems = [
  { to: "/", label: "Beranda", icon: House, end: true },
  { to: "/materi", label: "Materi belajar", icon: BookOpen },
  { to: "/flashcard", label: "Kartu hafalan", icon: Layers3 },
  { to: "/kuis", label: "Kuis kosakata", icon: ClipboardList },
  { to: "/permainan", label: "Permainan", icon: Puzzle },
  { to: "/progres", label: "Progres belajar", icon: Trophy },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <div className="brand-mark">م</div>
        <div className="brand-copy">
          <strong>MufradatKu</strong>
          <span>Teman belajar Bahasa Arab</span>
        </div>
      </NavLink>
      <div className="sidebar-label">MENU UTAMA</div>
      <nav className="side-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={19} strokeWidth={2.1} />
            <span>{label}</span>
            {to === "/kuis" && <span className="nav-dot" />}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-card">
        <div className="sidebar-card-icon"><Sparkles size={20} /></div>
        <strong>Semangat belajar!</strong>
        <p>Satu kata baru setiap hari membuatmu semakin hebat.</p>
        <span className="mini-stars">✦ ✦ ✦</span>
      </div>
      <div className="sidebar-footer">Dibuat untuk siswa kelas 4 SD/MI</div>
    </aside>
  );
}