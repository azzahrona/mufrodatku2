import type { LucideIcon } from "lucide-react";

export default function StatCard({ icon: Icon, label, value, note, tone = "green" }: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  note: string;
  tone?: "green" | "yellow" | "blue" | "purple";
}) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-icon"><Icon size={20} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}