import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import DashboardCitoyen from "./components/DashboardCitoyen";
import Trier from "./components/Trier";
import Points from "./components/Points";
import Recompenses from "./components/Recompenses";
import Apprendre from "./components/Apprendre";
import CitoyenProfil from "./components/CitoyenProfil";
import DashboardAgent from "./components/DashboardAgent";
import AgentProfil from "./components/AgentProfil";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/citoyen" element={<DashboardCitoyen />} />
          <Route path="/trier" element={<Trier />} />
          <Route path="/points" element={<Points />} />
          <Route path="/recompenses" element={<Recompenses />} />
          <Route path="/apprendre" element={<Apprendre />} />
          <Route path="/profil" element={<CitoyenProfil />} />
          <Route path="/agent" element={<DashboardAgent />} />
          <Route path="/agent/profil" element={<AgentProfil />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
