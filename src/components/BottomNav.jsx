import { Link, useLocation } from "react-router-dom";
import { Home, Recycle, Star, Gift, Book } from "./Icons";

const navItems = [
  { href: "/citoyen", label: "Accueil", Icon: Home },
  { href: "/trier", label: "Trier", Icon: Recycle },
  { href: "/points", label: "Mes points", Icon: Star },
  { href: "/recompenses", label: "Récompenses", Icon: Gift },
  { href: "/apprendre", label: "Apprendre", Icon: Book },
];

export default function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              <item.Icon
                className={`w-5 h-5 ${isActive ? "text-green-600" : "text-gray-400"}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
