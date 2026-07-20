import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Bottle,
  Box,
  Lightbulb,
  Camera,
  Check,
  CheckCircle,
} from "./Icons";

export default function Trier() {
  const [step, setStep] = useState("select");
  const [wasteType, setWasteType] = useState(null);
  const [cartonSize, setCartonSize] = useState("moyenne");
  const [quantity, setQuantity] = useState("");
  const { addDepot } = useAuth();

  const calculatePoints = () => {
    const qty = parseInt(quantity) || 0;
    if (wasteType === "bouteille") return qty * 5;
    if (wasteType === "carton") {
      const pointsPerCarton =
        cartonSize === "petite" ? 1 : cartonSize === "moyenne" ? 2 : 3;
      return qty * pointsPerCarton;
    }
    return 0;
  };
  const estimatedPoints = calculatePoints();

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        <div className="bg-green-600 text-white px-5 pt-10 pb-6 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/citoyen"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold">Trier mes déchets</h1>
          </div>
          <p className="text-green-100 text-sm">
            Déclarez vos déchets triés et gagnez des points
          </p>
        </div>

        <div className="px-4 mt-5">
          {step === "select" && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-800 text-lg">
                Quel type de déchet ?
              </h2>

              <button
                onClick={() => {
                  setWasteType("bouteille");
                  setStep("scan");
                }}
                className={`w-full card flex items-center gap-4 hover:shadow-md transition border-2 ${wasteType === "bouteille" ? "border-yellow-400" : "border-transparent"}`}
              >
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bottle className="w-7 h-7 text-yellow-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Bouteille plastique</p>
                  <p className="text-sm text-gray-500">5 points / unité</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Bouteilles de jus, eau, lait
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setWasteType("carton");
                  setStep("scan");
                }}
                className={`w-full card flex items-center gap-4 hover:shadow-md transition border-2 ${wasteType === "carton" ? "border-blue-400" : "border-transparent"}`}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Box className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">Carton</p>
                  <p className="text-sm text-gray-500">
                    1-3 points / unité selon taille
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Petits, moyens et grands cartons
                  </p>
                </div>
              </button>

              <div className="card bg-green-50 border border-green-200">
                <div className="flex gap-3">
                  <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 text-sm">
                      Comment ça marche ?
                    </p>
                    <ol className="text-xs text-green-700 mt-1 space-y-1 list-decimal list-inside">
                      <li>Choisissez le type de déchet</li>
                      <li>Scannez le QR code du bac</li>
                      <li>L'agent valide la quantité</li>
                      <li>Recevez vos points automatiquement</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "scan" && (
            <div className="space-y-5">
              <button
                onClick={() => setStep("select")}
                className="flex items-center gap-1 text-green-600 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>

              <div
                className={`card border-2 ${wasteType === "bouteille" ? "border-yellow-400 bg-yellow-50" : "border-blue-400 bg-blue-50"}`}
              >
                <div className="flex items-center gap-3">
                  {wasteType === "bouteille" ? (
                    <Bottle className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Box className="w-6 h-6 text-blue-600" />
                  )}
                  <div>
                    <p className="font-bold text-gray-800 capitalize">
                      {wasteType}
                    </p>
                    <p className="text-xs text-gray-500">
                      {wasteType === "bouteille"
                        ? "5 pts/unité"
                        : `${cartonSize === "petite" ? 1 : cartonSize === "moyenne" ? 2 : 3} pts/unité`}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-gray-800 text-lg">
                Scanner le QR code du bac
              </h2>

              <div className="card flex flex-col items-center py-8 gap-4">
                <div className="w-48 h-48 border-4 border-green-500 rounded-2xl flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Camera className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="text-gray-400 text-xs mt-2">
                      Pointez vers le QR code
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm text-center">
                  Scannez le QR code affiché sur le bac ou au point de collecte
                </p>
              </div>

              <button
                onClick={() => setStep("confirm")}
                className="btn-primary w-full justify-center"
              >
                Simuler le scan (démo)
              </button>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-5">
              <button
                onClick={() => setStep("scan")}
                className="flex items-center gap-1 text-green-600 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>

              <div className="card bg-green-50 border border-green-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 text-sm flex items-center gap-1.5">
                    QR code scanné <Check className="w-3.5 h-3.5" />
                  </p>
                  <p className="text-xs text-green-600">
                    Point de collecte : Rue des Oliviers
                  </p>
                </div>
              </div>

              <h2 className="font-bold text-gray-800 text-lg">
                Confirmer le dépôt
              </h2>

              <div className="card space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Type de déchet
                  </label>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl ${wasteType === "bouteille" ? "bg-yellow-50 border border-yellow-300" : "bg-blue-50 border border-blue-300"}`}
                  >
                    {wasteType === "bouteille" ? (
                      <Bottle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <Box className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="font-medium capitalize text-gray-700">
                      {wasteType}
                    </span>
                  </div>
                </div>

                {wasteType === "carton" && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Taille du carton
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["petite", "moyenne", "grande"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setCartonSize(size)}
                          className={`py-2 rounded-xl border-2 text-sm font-medium transition capitalize ${
                            cartonSize === size
                              ? "border-blue-400 bg-blue-50 text-blue-700"
                              : "border-gray-100 text-gray-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    {wasteType === "bouteille"
                      ? "Nombre de bouteilles"
                      : "Nombre de cartons"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ex: 3"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    La quantité sera validée par l'agent de collecte
                  </p>
                </div>

                {quantity && parseInt(quantity) > 0 && (
                  <div className="bg-green-50 rounded-xl p-3 flex items-center justify-between">
                    <span className="text-sm text-green-700">
                      Points estimés
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      +{estimatedPoints} pts
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  const typeNormalise =
                    wasteType === "bouteille" ? "plastique" : "papier";
                  addDepot(typeNormalise, parseInt(quantity), estimatedPoints);
                  setStep("success");
                }}
                disabled={!quantity || parseInt(quantity) <= 0}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Soumettre le dépôt
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center text-center py-10 space-y-5">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dépôt enregistré !
                </h2>
                <p className="text-gray-500 mt-2">
                  Votre dépôt a été soumis avec succès. L'agent de collecte va
                  valider la quantité.
                </p>
              </div>
              <div className="card w-full bg-green-50 border border-green-200">
                <p className="text-green-700 font-semibold">
                  Points en attente de validation
                </p>
                <p className="text-4xl font-bold text-green-600 mt-1">
                  +{estimatedPoints}
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Seront crédités après validation
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setStep("select");
                    setWasteType(null);
                    setQuantity("");
                  }}
                  className="btn-secondary flex-1 justify-center"
                >
                  Nouveau dépôt
                </button>
                <Link
                  to="/citoyen"
                  className="btn-primary flex-1 justify-center"
                >
                  Accueil
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
