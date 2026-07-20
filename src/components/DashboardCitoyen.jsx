import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import {
  User,
  Trophy,
  Recycle,
  Gift,
  Star,
  Book,
  Bottle,
  Box,
  Leaf,
} from "./Icons";

export default function DashboardCitoyen() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  const recentActivities = user.depots.slice().reverse().slice(0, 3);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        {/* Header */}
        <div className="bg-green-600 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm flex items-center gap-1.5">
                Bonjour
              </p>
              <h1 className="text-xl font-bold">
                {user.prenom} {user.nom}
              </h1>
            </div>
            <Link
              to="/profil"
              className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          <div className="bg-white/15 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs mb-1">
                Mes points accumulés
              </p>
              <p className="text-4xl font-bold">{user.points}</p>
              <p className="text-green-200 text-xs mt-1 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> Rang : Citoyen Vert
              </p>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-2 text-center">
              <p className="text-xs text-green-100">Dépôts</p>
              <p className="text-2xl font-bold">{user.depots.length}</p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/trier"
              className="card flex flex-col items-center gap-2 py-5 hover:shadow-md transition text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-semibold text-gray-800">
                Faire un dépôt
              </span>
            </Link>
            <Link
              to="/recompenses"
              className="card flex flex-col items-center gap-2 py-5 hover:shadow-md transition text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-semibold text-gray-800">Récompenses</span>
            </Link>
            <Link
              to="/points"
              className="card flex flex-col items-center gap-2 py-5 hover:shadow-md transition text-center"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="font-semibold text-gray-800">Mes points</span>
            </Link>
            <Link
              to="/apprendre"
              className="card flex flex-col items-center gap-2 py-5 hover:shadow-md transition text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-800">Guide du tri</span>
            </Link>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="font-bold text-gray-800 mb-3">Activité récente</h2>
            {recentActivities.length === 0 ? (
              <div className="card text-center text-sm text-gray-500 flex items-center justify-center gap-1.5">
                Aucun dépôt encore. Lancez-vous !{" "}
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
            ) : (
              <div className="space-y-2">
                {recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="card flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "plastique"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {activity.type === "plastique" ? (
                          <Bottle className="w-5 h-5 text-yellow-700" />
                        ) : (
                          <Box className="w-5 h-5 text-blue-700" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm capitalize">
                          {activity.poids} kg — {activity.type}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    {activity.statut === "validé" ? (
                      <span className="text-green-600 font-bold">
                        +{activity.points} pts
                      </span>
                    ) : activity.statut === "rejeté" ? (
                      <span className="text-red-500 text-xs font-semibold">
                        Rejeté
                      </span>
                    ) : (
                      <span className="text-yellow-600 text-xs font-semibold">
                        En attente
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
