import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div>🧭</div>
      <h1>Halaman belum ditemukan</h1>
      <p>Sepertinya kamu tersesat. Yuk, kembali ke beranda!</p>
      <Link to="/" className="button button-primary">Kembali ke beranda</Link>
    </div>
  );
}