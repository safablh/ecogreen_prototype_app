import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Leaf,
  Bell,
  HelpCircle,
  ChevronRight,
} from "./Icons";

export default function Profil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [notifications, setNotifications] = useState({
    deposits: true,
    rewards: true,
    news: false,
    reminders: true,
  });

  if (!user) {
    navigate("/");
    return null;
  }

  const toggleNotif = (key) =>
    setNotifications({ ...notifications, [key]: !notifications[key] });

  const renderSection = () => {
    if (activeSection === "notifications") {
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setActiveSection(null)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
          </div>
          <div className="card space-y-2">
            {[
              {
                key: "deposits",
                label: "Dépôts validés",
                desc: "Notification quand un dépôt est validé",
              },
              {
                key: "rewards",
                label: "Récompenses",
                desc: "Nouvelles récompenses disponibles",
              },
              {
                key: "news",
                label: "Actualités",
                desc: "Dernières nouvelles et événements",
              },
              {
                key: "reminders",
                label: "Rappels",
                desc: "Rappels pour trier vos déchets",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggleNotif(item.key)}
                  className={`w-12 h-6 rounded-full transition ${notifications[item.key] ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition ${notifications[item.key] ? "translate-x-6" : "translate-x-0.5"}`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "help") {
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setActiveSection(null)}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Aide et support</h2>
          </div>
          <div className="card mb-4 text-center">
            <p className="text-xs text-gray-400">Version 1.0.0 (démo)</p>
            <p className="text-xs text-gray-400 mt-1">© 2026 EcoGreen</p>
          </div>
          <div className="card space-y-1">
            <div className="flex items-center gap-3 p-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">
                support@ecogreen.demo
              </p>
            </div>
            <div className="flex items-center gap-3 p-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">0 800 700 438</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (activeSection) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-md mx-auto pb-24 pt-6 px-4">
          {renderSection()}
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        <div className="bg-green-600 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/citoyen"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold">Mon profil</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-bold">
                {user.prenom} {user.nom}
              </p>
              <p className="text-green-200 text-sm">{user.telephone}</p>
            </div>
          </div>
        </div>

        <div className="px-4 mt-5 space-y-4">
          {/* QR Code */}
          <div className="card text-center">
            <p className="font-bold text-gray-800 mb-3">
              Mon QR code personnel
            </p>
            <div className="flex justify-center mb-3">
              <div className="w-36 h-36 bg-white border-4 border-gray-800 rounded-xl flex items-center justify-center p-2">
                <div className="grid grid-cols-7 gap-0.5 w-full h-full">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const corners = [
                      0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35,
                      41, 42, 43, 44, 45, 46, 47, 48,
                    ];
                    const isFilled =
                      corners.includes(i) || (i * 7 + i) % 3 === 0;
                    return (
                      <div
                        key={i}
                        className={`rounded-sm ${isFilled ? "bg-gray-800" : "bg-white"}`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Présentez ce code lors de chaque dépôt
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <p className="text-2xl font-bold text-green-600">{user.points}</p>
              <p className="text-xs text-gray-500 mt-0.5">Points</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-gray-800">
                {user.depots.length}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Dépôts</p>
            </div>
          </div>

          {/* Level */}
          <div className="card flex items-center gap-4">
            <Leaf className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-bold text-gray-800">Citoyen Vert</p>
              <div className="mt-1.5 bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min((user.points / 400) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {user.points} / 400 pts → Éco-Champion
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="card space-y-1">
            {[
              {
                Icon: Bell,
                label: "Notifications",
                action: () => setActiveSection("notifications"),
              },
              {
                Icon: HelpCircle,
                label: "Aide et support",
                action: () => setActiveSection("help"),
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.action}
                className="w-full flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-gray-50 transition text-left"
              >
                <item.Icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="btn-secondary w-full justify-center"
          >
            Se déconnecter
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
