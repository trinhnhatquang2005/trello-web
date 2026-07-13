import Board from "./pages/Boards/_id";
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/boards/6a44b4595f226356d79def9b' replace={true} />} />
      <Route path="/boards/:boardId" element={<Board />} />



      {/* Auth */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}