import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";

const rewards = [
  {
    id: 1,
    title: "Accès gratuit à la piscine municipale",
    desc: "Séances gratuites à la piscine municipale",
    points: 150,
    icon: "🏊",
  },
  {
    id: 2,
    title: "Tickets de transport offerts",
    desc: "Tickets de bus gratuits",
    points: 100,
    icon: "🚌",
  },
  {
    id: 3,
    title: "Stationnement gratuit",
    desc: "Places de stationnement gratuites ou à tarif réduit",
    points: 120,
    icon: "🅿️",
  },
  {
    id: 4,
    title: "Réduction crèche municipale",
    desc: "Réductions sur les frais de crèche",
    points: 200,
    icon: "👶",
  },
];

export default function Recompenses() {
  const userPoints = 247;
  const [redeemed, setRedeemed] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const handleRedeem = (id) => {
    setRedeemed([...redeemed, id]);
    setShowModal(null);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        <div className="bg-purple-600 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/citoyen"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              ←
            </Link>
            <h1 className="text-xl font-bold">Récompenses</h1>
          </div>
          <div className="bg-white/15 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs">Mes points disponibles</p>
              <p className="text-4xl font-bold mt-1">{userPoints}</p>
            </div>
            <div className="text-5xl">🎁</div>
          </div>
        </div>

        <div className="px-4 mt-5 space-y-4">
          <p className="text-gray-500 text-sm">
            Échangez vos points contre des avantages exclusifs
          </p>

          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            const isRedeemed = redeemed.includes(reward.id);
            return (
              <div
                key={reward.id}
                className={`card border-2 transition ${isRedeemed ? "border-green-300 bg-green-50" : canAfford ? "border-purple-200 hover:shadow-md" : "border-transparent opacity-60"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-gray-800">{reward.title}</p>
                      {isRedeemed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          ✓ Obtenu
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{reward.desc}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className={`font-bold text-sm ${canAfford ? "text-purple-600" : "text-gray-400"}`}
                      >
                        {reward.points} pts
                      </span>
                      {!isRedeemed && (
                        <button
                          onClick={() => setShowModal(reward.id)}
                          disabled={!canAfford}
                          className={`text-sm font-semibold px-4 py-1.5 rounded-xl transition ${canAfford ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                        >
                          {canAfford
                            ? "Échanger"
                            : `Il manque ${reward.points - userPoints} pts`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm">
            {(() => {
              const reward = rewards.find((r) => r.id === showModal);
              return (
                <>
                  <div className="text-center mb-5">
                    <div className="text-5xl mb-3">{reward.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {reward.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">{reward.desc}</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-4 text-center mb-5">
                    <p className="text-gray-600 text-sm">Coût de l'échange</p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">
                      {reward.points} pts
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowModal(null)}
                      className="btn-secondary flex-1 justify-center"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleRedeem(reward.id)}
                      className="btn-primary flex-1 justify-center"
                    >
                      Confirmer
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
