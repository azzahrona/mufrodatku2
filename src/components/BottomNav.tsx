import { NavLink } from "react-router-dom";
import { House, BookOpen, ClipboardList, Puzzle, Trophy } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/materi", label: "Materi", icon: BookOpen },
  { to: "/kuis", label: "Kuis", icon: ClipboardList },
  { to: "/permainan", label: "Game", icon: Puzzle },
  { to: "/progres", label: "Progres", icon: Trophy },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => `bottom-nav-link ${isActive ? "active" : ""}`}>
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}