import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-shell">
        <header className="mobile-topbar">
          <div className="brand-mark small">م</div>
          <div>
            <strong>MufradatKu</strong>
            <span>Belajar jadi menyenangkan</span>
          </div>
          <span className="topbar-sparkle">✦</span>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}