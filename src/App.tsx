import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import LearnPage from "./pages/LearnPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import QuizPage from "./pages/QuizPage";
import MatchingPage from "./pages/MatchingPage";
import ProgressPage from "./pages/ProgressPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/materi" element={<MaterialsPage />} />
        <Route path="/belajar/:categoryId" element={<LearnPage />} />
        <Route path="/flashcard" element={<FlashcardsPage />} />
        <Route path="/kuis" element={<QuizPage />} />
        <Route path="/permainan" element={<MatchingPage />} />
        <Route path="/progres" element={<ProgressPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}