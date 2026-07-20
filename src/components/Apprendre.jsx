import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import { ArrowLeft, Bottle, Box, ChevronDown } from "./Icons";

const faq = [
  {
    q: "Pourquoi trier ses déchets ?",
    a: "Le tri permet de recycler les matériaux, réduire la pollution et économiser les ressources naturelles.",
  },
  {
    q: "Comment gagner plus de points ?",
    a: "Triez régulièrement vos bouteilles plastiques (5 pts) et cartons (1-3 pts selon taille).",
  },
  {
    q: "Que faire si je me trompe de bac ?",
    a: "Retirez le déchet du mauvais bac et mettez-le dans le bon, ou demandez à un agent.",
  },
];

export default function Apprendre() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-md mx-auto pb-24">
        <div className="bg-blue-600 text-white px-5 pt-10 pb-8 rounded-b-3xl shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/citoyen"
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-xl font-bold">Apprendre à trier</h1>
          </div>
          <p className="text-blue-100 text-sm">
            Guides pratiques pour bien trier vos déchets
          </p>
        </div>

        <div className="px-4 mt-5 space-y-5">
          <div className="card">
            <h2 className="font-bold text-gray-800 mb-4">
              Guide visuel des bacs
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 text-center">
                <Bottle className="w-9 h-9 mx-auto mb-2 text-yellow-600" />
                <p className="font-bold text-yellow-700 text-sm">Bac Jaune</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Plastique uniquement
                </p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-center">
                <Box className="w-9 h-9 mx-auto mb-2 text-blue-600" />
                <p className="font-bold text-blue-700 text-sm">Bac Bleu</p>
                <p className="text-xs text-blue-600 mt-1">Papier / Carton</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-gray-800 mb-3">
              Questions fréquentes
            </h2>
            <div className="space-y-2">
              {faq.map((item, i) => (
                <div key={i} className="card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <p className="font-semibold text-gray-800 text-sm pr-3">
                      {item.q}
                    </p>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
                      {item.a}
                    </p>
                  )}
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
