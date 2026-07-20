import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import { ArrowLeft, Leaf, Bottle, Box, Smartphone } from "./Icons";

const history = [
  {
    date: "05 Mar 2026",
    type: "bouteille",
    quantity: 2,
    points: 10,
    status: "validé",
  },
  {
    date: "01 Mar 2026",
    type: "carton moyenne",
    quantity: 3,
    points: 6,
    status: "validé",
  },
  {
    date: "25 Fév 2026",
    type: "bouteille",
    quantity: 2,
    points: 10,
    status: "validé",
  },
];

const monthlyData = [
  { month: "Déc", items: 8 },
  { month: "Jan", items: 12 },
  { month: "Fév", items: 15 },
  { month: "Mar", items: 9 },
];
const maxItems = Math.max(...monthlyData.map((d) => d.items));

export default function Points() {
  const totalPoints = 247,
    thisMonthPoints = 27,
    totalItems = 15;

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        <div className="bg-yellow-500 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/citoyen"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold">Mes points</h1>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold">{totalPoints}</p>
              <p className="text-yellow-100 text-xs mt-1">Total points</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold">+{thisMonthPoints}</p>
              <p className="text-yellow-100 text-xs mt-1">Ce mois</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-3 text-center">
              <p className="text-3xl font-bold">{totalItems}</p>
              <p className="text-yellow-100 text-xs mt-1">articles collectés</p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-5 space-y-5">
          <div className="card flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-7 h-7 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">Citoyen Vert</p>
              <p className="text-xs text-gray-500 mt-0.5">Niveau actuel</p>
              <div className="mt-2 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                247 / 400 pts pour atteindre "Éco-Champion"
              </p>
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-gray-800 mb-4">
              Évolution mensuelle
            </h2>
            <div className="flex items-end gap-3 h-24">
              {monthlyData.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <span className="text-xs text-gray-500 font-medium">
                    {d.items}
                  </span>
                  <div
                    className="w-full bg-green-500 rounded-t-lg transition-all"
                    style={{ height: `${(d.items / maxItems) * 72}px` }}
                  ></div>
                  <span className="text-xs text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-gray-800 mb-1">Barème des points</h2>
            <p className="text-xs text-gray-400 mb-3">
              Points gagnés par article collecté
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="badge-plastic flex items-center gap-1.5">
                  <Bottle className="w-3.5 h-3.5" /> Bouteille plastique
                </span>
                <span className="font-bold text-gray-700">5 pts / unité</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="badge-paper flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Carton petite taille
                </span>
                <span className="font-bold text-gray-700">1 pt / unité</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="badge-paper flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" /> Carton moyenne/grande
                </span>
                <span className="font-bold text-gray-700">2-3 pts / unité</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-gray-800 mb-3">
              Historique des dépôts
            </h2>
            <div className="space-y-2">
              {history.map((item, i) => (
                <div key={i} className="card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === "bouteille" ? "bg-yellow-100" : "bg-blue-100"}`}
                    >
                      {item.type === "bouteille" ? (
                        <Bottle className="w-5 h-5 text-yellow-700" />
                      ) : (
                        <Box className="w-5 h-5 text-blue-700" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 capitalize">
                        {item.type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.date} · {item.quantity} unités
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-green-600">
                    +{item.points} pts
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
