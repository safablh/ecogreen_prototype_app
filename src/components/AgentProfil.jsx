import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Shield } from "./Icons";

export default function AgentProfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    deposits: true,
    validations: true,
  });

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pb-8">
        <div className="bg-teal-700 text-white px-5 pt-10 pb-6 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/agent"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-lg font-bold">Mon profil</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {user.prenom} {user.nom}
              </h2>
              <p className="text-teal-200 text-sm">Agent de collecte</p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">
              Informations personnelles
            </h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Nom complet</span>
                <span className="text-sm font-semibold text-gray-800">
                  {user.prenom} {user.nom}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Téléphone</span>
                <span className="text-sm font-semibold text-gray-800">
                  {user.telephone}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Rôle</span>
                <span className="text-sm font-semibold text-teal-600">
                  Agent de collecte
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">
              Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Nouveaux dépôts
                  </p>
                  <p className="text-xs text-gray-400">
                    Être alerté d'un nouveau dépôt à valider
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      deposits: !notifications.deposits,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition ${notifications.deposits ? "bg-teal-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition ${notifications.deposits ? "translate-x-6" : "translate-x-0.5"}`}
                  ></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Validations effectuées
                  </p>
                  <p className="text-xs text-gray-400">
                    Résumé quotidien de vos validations
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      validations: !notifications.validations,
                    })
                  }
                  className={`w-12 h-6 rounded-full transition ${notifications.validations ? "bg-teal-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition ${notifications.validations ? "translate-x-6" : "translate-x-0.5"}`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
