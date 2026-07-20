import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Leaf,
  User,
  Search,
  CheckCircle,
  Eye,
  EyeOff,
} from "./Icons";

export default function Inscription() {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    motDePasse: "",
    role: "citoyen",
  });
  const [erreur, setErreur] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isValid =
    form.prenom &&
    form.nom &&
    form.telephone.length >= 8 &&
    form.email.includes("@") &&
    form.motDePasse.length >= 6;

  const handleCreate = () => {
    try {
      register(form);
      setStep("success");
    } catch (err) {
      setErreur(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 pb-8">
        {/* Header */}
        <div className="bg-green-600 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Créer un compte</h1>
              <p className="text-green-100 text-xs mt-0.5">
                Rejoignez le programme EcoGreen
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6">
          {step === "form" && (
            <div className="space-y-5">
              <div className="card bg-green-50 border border-green-200 flex gap-3">
                <Leaf className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 text-sm">
                    Bienvenue sur EcoGreen !
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Créez votre compte pour commencer à trier vos déchets et
                    gagner des récompenses.
                  </p>
                </div>
              </div>

              <div className="card space-y-4">
                <h2 className="font-bold text-gray-800">Vos informations</h2>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Je suis :
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "citoyen", label: "Citoyen", Icon: User },
                      { key: "agent", label: "Agent", Icon: Search },
                    ].map((r) => (
                      <button
                        type="button"
                        key={r.key}
                        onClick={() => setForm({ ...form, role: r.key })}
                        className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition text-sm font-medium ${
                          form.role === r.key
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-100 text-gray-500"
                        }`}
                      >
                        <r.Icon className="w-5 h-5" />
                        <span>{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Prénom *
                  </label>
                  <input
                    name="prenom"
                    placeholder="..."
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Nom *
                  </label>
                  <input
                    name="nom"
                    placeholder="..."
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Numéro de téléphone *
                  </label>
                  <input
                    name="telephone"
                    type="tel"
                    placeholder="Ex: 0612345678"
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Ex: exemple@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      name="motDePasse"
                      type={showPassword ? "text" : "password"}
                      placeholder="6 caractères minimum"
                      value={form.motDePasse}
                      onChange={handleChange}
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
              </div>

              <button
                onClick={handleCreate}
                disabled={!isValid}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Créer mon compte
              </button>

              <p className="text-center text-sm text-gray-500">
                Déjà inscrit ?{" "}
                <Link to="/" className="text-green-600 font-semibold">
                  Se connecter
                </Link>
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  Compte créé !{" "}
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                  Bienvenue {form.prenom} {form.nom}
                </p>
              </div>

              <div className="card w-full">
                <p className="font-semibold text-gray-700 mb-3">
                  Récapitulatif de votre compte
                </p>
                <div className="bg-green-50 rounded-xl p-3 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Nom</p>
                    <p className="font-semibold text-gray-800">
                      {form.prenom} {form.nom}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="font-semibold text-gray-800">
                      {form.telephone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">{form.email}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/")}
                className="btn-primary w-full justify-center flex items-center gap-2"
              >
                Se connecter maintenant <Leaf className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
