import { Navigate, Route, Routes } from "react-router-dom";
import { useGame } from "./game/GameContext";
import Welcome from "./screens/Welcome";
import Onboarding from "./screens/Onboarding";
import Galaxy from "./screens/Galaxy";
import QuestionScreen from "./screens/Question";
import Results from "./screens/Results";
import Leaderboard from "./screens/Leaderboard";
import About from "./screens/About";

/** Sends players without a nickname back to onboarding. */
function RequirePlayer({ children }: { children: JSX.Element }) {
  const { state } = useGame();
  return state.nickname ? children : <Navigate to="/join" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/join" element={<Onboarding />} />
      <Route path="/galaxy" element={<RequirePlayer><Galaxy /></RequirePlayer>} />
      <Route path="/play" element={<RequirePlayer><QuestionScreen /></RequirePlayer>} />
      <Route path="/results" element={<RequirePlayer><Results /></RequirePlayer>} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
