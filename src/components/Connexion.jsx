import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Recycle,
  User,
  Search,
  Leaf,
  Star,
  Gift,
  BarChart,
  Eye,
  EyeOff,
} from "./Icons";
export default function Connexion() {
  const [role, setRole] = useState("citoyen");
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erreur, setErreur] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const u = login(identifiant, motDePasse);
      navigate(u.role === "agent" ? "/agent" : "/citoyen");
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <div className="bg-green-600 text-white px-5 pt-16 pb-12 rounded-b-3xl shadow-md text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Recycle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold">EcoGreen</h1>
          <p className="text-green-100 mt-2 text-sm">
            Triez vos déchets, gagnez des récompenses, améliorez votre commune
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 mt-8 flex-1 space-y-5">
          <div className="card">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Je suis :
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "citoyen", label: "Citoyen", Icon: User },
                { key: "agent", label: "Agent", Icon: Search },
              ].map((r) => (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition text-sm font-medium ${
                    role === r.key
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <r.Icon className="w-5 h-5" />
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-4">
            <h2 className="font-bold text-gray-800">Se connecter</h2>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                Téléphone ou Email
              </label>
              <input
                type="text"
                placeholder="Ex: 0612345678 ou email@exemple.com"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Votre mot de passe"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {erreur && <p className="text-red-500 text-sm">{erreur}</p>}

            <button type="submit" className="btn-primary w-full justify-center">
              Se connecter
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link to="/inscription" className="text-green-600 font-semibold">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="space-y-2 pb-8">
            {[
              { Icon: Leaf, text: "Triez plastique et papier/carton" },
              { Icon: Star, text: "Gagnez des points à chaque dépôt" },
              { Icon: Gift, text: "Échangez contre des récompenses" },
              { Icon: BarChart, text: "Suivez votre impact écologique" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-2">
                <f.Icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
