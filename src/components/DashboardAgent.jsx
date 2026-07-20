import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  User,
  Users,
  Recycle,
  BarChart,
  Star,
  Bottle,
  Box,
  X,
  Check,
  CheckCircle,
} from "./Icons";

export default function DashboardAgent() {
  const {
    user,
    getPendingDeposits,
    validateDeposit,
    rejectDeposit,
    scanAndValidate,
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");
  const [pending, setPending] = useState(getPendingDeposits());

  // Scan flow
  const [scanStep, setScanStep] = useState("scan");
  const [telephone, setTelephone] = useState("");
  const [type, setType] = useState("plastique");
  const [poids, setPoids] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [erreur, setErreur] = useState("");

  if (!user) {
    navigate("/");
    return null;
  }

  const refresh = () => setPending(getPendingDeposits());

  const citoyens = JSON.parse(
    localStorage.getItem("ecogreen_users") || "[]",
  ).filter((u) => u.role === "citoyen");
  const totalCitoyens = citoyens.length;
  const totalArticles = citoyens.reduce(
    (sum, c) => sum + c.depots.filter((d) => d.statut === "validé").length,
    0,
  );
  const totalPoints = citoyens.reduce((sum, c) => sum + c.points, 0);
  const participation =
    totalCitoyens > 0
      ? Math.round(
          (citoyens.filter((c) => c.depots.length > 0).length / totalCitoyens) *
            100,
        )
      : 0;
  const topCitizens = [...citoyens]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const today = new Date().toDateString();
  const todayDepots = citoyens
    .flatMap((c) => c.depots)
    .filter((d) => new Date(d.date).toDateString() === today);
  const todayValidated = todayDepots.filter(
    (d) => d.statut === "validé",
  ).length;
  const todayItems = todayDepots.filter((d) => d.statut === "validé").length;

  const allHistory = citoyens
    .flatMap((c) =>
      c.depots
        .filter((d) => d.statut !== "en_attente")
        .map((d) => ({ ...d, citoyen: `${c.prenom} ${c.nom}` })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleValidate = (dep) => {
    validateDeposit(dep.citoyenTelephone, dep.id);
    refresh();
  };
  const handleReject = (dep) => {
    rejectDeposit(dep.citoyenTelephone, dep.id);
    refresh();
  };

  const handleScan = () => {
    const found = citoyens.find((c) => c.telephone === telephone.trim());
    if (!found) {
      setErreur("Aucun citoyen trouvé avec ce numéro");
      return;
    }
    setErreur("");
    setScanResult(found);
    setScanStep("confirm");
  };

  const estimatedPoints = () => {
    const qty = parseFloat(poids) || 0;
    return Math.round(qty * 10);
  };

  const handleConfirmDeposit = () => {
    scanAndValidate(scanResult.telephone, type, parseFloat(poids));
    setScanStep("done");
  };

  const resetScan = () => {
    setScanStep("scan");
    setScanResult(null);
    setTelephone("");
    setPoids("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="bg-teal-700 text-white px-5 pt-10 pb-6 rounded-b-3xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <h1 className="text-xl font-bold">Interface Agent</h1>
              </div>
              <p className="text-teal-200 text-xs mt-0.5">
                Agent : {user.prenom} {user.nom}
              </p>
            </div>
            <Link
              to="/agent/profil"
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/15 rounded-xl p-2.5 text-center">
              <p className="text-xl font-bold">{todayValidated}</p>
              <p className="text-teal-200 text-xs">Validés (jour)</p>
            </div>
            <div className="bg-white/15 rounded-xl p-2.5 text-center">
              <p className="text-xl font-bold">{todayItems}</p>
              <p className="text-teal-200 text-xs">articles collectés</p>
            </div>
            <div className="bg-white/15 rounded-xl p-2.5 text-center">
              <p className="text-xl font-bold">{pending.length}</p>
              <p className="text-teal-200 text-xs">En attente</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl p-1 flex gap-1 shadow-sm overflow-x-auto">
            {[
              { key: "stats", label: "Statistiques" },
              { key: "pending", label: `En attente (${pending.length})` },
              { key: "scan", label: "Scanner" },
              { key: "history", label: "Historique" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  if (tab.key === "pending") refresh();
                }}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-teal-600 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 mt-4 space-y-4">
          {/* Stats */}
          {activeTab === "stats" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-3 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalCitoyens}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Citoyens inscrits
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-3 text-white">
                    <Recycle className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalArticles}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Articles collectés (total)
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mb-3 text-white">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {participation}%
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Taux de participation
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mb-3 text-white">
                    <Star className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalPoints}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Points distribués
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-gray-800 mb-4 text-sm">
                  Top Citoyens
                </h2>
                {topCitizens.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    Aucun citoyen inscrit pour le moment
                  </p>
                ) : (
                  <div className="space-y-2">
                    {topCitizens.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-yellow-400 text-white"
                              : i === 1
                                ? "bg-gray-300 text-white"
                                : i === 2
                                  ? "bg-orange-300 text-white"
                                  : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-800">
                            {c.prenom} {c.nom}
                          </p>
                          <p className="text-xs text-gray-400">
                            {
                              c.depots.filter((d) => d.statut === "validé")
                                .length
                            }{" "}
                            articles
                          </p>
                        </div>
                        <span className="text-sm font-bold text-teal-600">
                          {c.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pending */}
          {activeTab === "pending" && (
            <>
              {pending.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-500" />
                  <p className="font-semibold text-gray-700">
                    Tout est validé !
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Aucune validation en attente
                  </p>
                </div>
              ) : (
                pending.map((dep) => (
                  <div
                    key={dep.id}
                    className="bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700">
                          {dep.citoyenNom.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {dep.citoyenNom}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(dep.date).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${dep.type === "plastique" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {dep.type === "plastique" ? (
                          <Bottle className="w-3.5 h-3.5" />
                        ) : (
                          <Box className="w-3.5 h-3.5" />
                        )}
                        {dep.type === "plastique"
                          ? "Plastique"
                          : "Papier/Carton"}
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">
                          Quantité déclarée
                        </p>
                        <p className="font-bold text-gray-800">
                          {dep.poids} kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Points à attribuer
                        </p>
                        <p className="font-bold text-green-600">
                          +{dep.points} pts
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(dep)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition"
                      >
                        <X className="w-4 h-4" /> Rejeter
                      </button>
                      <button
                        onClick={() => handleValidate(dep)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
                      >
                        <Check className="w-4 h-4" /> Valider
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Scan */}
          {activeTab === "scan" && (
            <div className="space-y-4">
              {scanStep === "scan" && (
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
                  <h2 className="font-bold text-gray-800">
                    Rechercher le citoyen
                  </h2>
                  <p className="text-xs text-gray-400 -mt-2">
                    Simule le scan du QR code personnel du citoyen
                  </p>
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone du citoyen"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
                  <button
                    onClick={handleScan}
                    className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
                  >
                    Simuler le scan (démo)
                  </button>
                </div>
              )}

              {scanStep === "confirm" && scanResult && (
                <div className="space-y-4">
                  <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-teal-800">
                        {scanResult.prenom} {scanResult.nom}
                      </p>
                      <p className="text-xs text-teal-600">
                        {scanResult.points} pts actuels
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-800">
                      Enregistrer le dépôt
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setType("plastique")}
                        className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition ${type === "plastique" ? "border-yellow-400 bg-yellow-50 text-yellow-700" : "border-gray-100 text-gray-500"}`}
                      >
                        <Bottle className="w-4 h-4" /> Plastique
                      </button>
                      <button
                        onClick={() => setType("papier")}
                        className={`flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition ${type === "papier" ? "border-blue-400 bg-blue-50 text-blue-700" : "border-gray-100 text-gray-500"}`}
                      >
                        <Box className="w-4 h-4" /> Papier/Carton
                      </button>
                    </div>
                    <input
                      type="number"
                      placeholder="Poids en kg"
                      value={poids}
                      onChange={(e) => setPoids(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    {poids && parseFloat(poids) > 0 && (
                      <div className="bg-green-50 rounded-xl p-3 flex items-center justify-between">
                        <span className="text-sm text-green-700">
                          Points à attribuer
                        </span>
                        <span className="text-green-600 font-bold text-lg">
                          +{estimatedPoints()} pts
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={resetScan}
                        className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleConfirmDeposit}
                        disabled={!poids || parseFloat(poids) <= 0}
                        className="flex-1 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition disabled:opacity-50"
                      >
                        Valider le dépôt
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {scanStep === "done" && (
                <div className="bg-white rounded-2xl p-8 shadow-sm text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Dépôt validé !
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {scanResult.prenom} a reçu{" "}
                      <span className="font-bold text-green-600">
                        +{estimatedPoints()} points
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={resetScan}
                    className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
                  >
                    Scanner un autre citoyen
                  </button>
                </div>
              )}
            </div>
          )}

          {/* History */}
          {activeTab === "history" && (
            <div className="space-y-2">
              {allHistory.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                  <p className="text-sm text-gray-400">
                    Aucun dépôt enregistré pour le moment
                  </p>
                </div>
              ) : (
                allHistory.slice(0, 20).map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${item.type === "plastique" ? "bg-yellow-100" : "bg-blue-100"}`}
                      >
                        {item.type === "plastique" ? (
                          <Bottle className="w-4 h-4 text-yellow-700" />
                        ) : (
                          <Box className="w-4 h-4 text-blue-700" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {item.citoyen}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(item.date).toLocaleDateString("fr-FR")} ·{" "}
                          {item.poids}kg
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${item.statut === "validé" ? "text-green-600" : "text-red-500"}`}
                      >
                        {item.statut === "validé"
                          ? `+${item.points} pts`
                          : "Rejeté"}
                      </p>
                      <p
                        className={`text-xs ${item.statut === "validé" ? "text-green-400" : "text-red-400"}`}
                      >
                        {item.statut}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
