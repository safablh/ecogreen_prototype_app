import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("ecogreen_current_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const getUsers = () =>
    JSON.parse(localStorage.getItem("ecogreen_users") || "[]");
  const saveUsers = (users) =>
    localStorage.setItem("ecogreen_users", JSON.stringify(users));

  const syncCurrentUser = (telephone) => {
    const users = getUsers();
    const updated = users.find((u) => u.telephone === telephone);
    if (updated) {
      setUser(updated);
      localStorage.setItem("ecogreen_current_user", JSON.stringify(updated));
    }
  };

  const register = ({ prenom, nom, telephone, email, motDePasse, role }) => {
    const users = getUsers();
    if (users.find((u) => u.telephone === telephone))
      throw new Error("Ce numéro est déjà utilisé");
    if (users.find((u) => u.email === email))
      throw new Error("Cet email est déjà utilisé");
    const newUser = {
      prenom,
      nom,
      telephone,
      email,
      motDePasse,
      role,
      points: 0,
      depots: [],
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  };

  const login = (identifiant, motDePasse) => {
    const users = getUsers();
    const value = identifiant.trim();
    const found = users.find(
      (u) =>
        (u.telephone === value || u.email === value) &&
        u.motDePasse === motDePasse.trim(),
    );
    if (!found) throw new Error("Identifiants incorrects");
    setUser(found);
    localStorage.setItem("ecogreen_current_user", JSON.stringify(found));
    return found;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecogreen_current_user");
  };

  // declare deposit
  const addDepot = (type, quantite, points) => {
    const depot = {
      id: Date.now().toString(),
      type,
      poids: quantite,
      points,
      date: new Date().toISOString(),
      statut: "en_attente",
    };
    const users = getUsers();
    const index = users.findIndex((u) => u.telephone === user.telephone);
    users[index].depots.push(depot);
    saveUsers(users);
    syncCurrentUser(user.telephone);
  };

  // list of deposits
  const getPendingDeposits = () => {
    const users = getUsers().filter((u) => u.role === "citoyen");
    return users.flatMap((u) =>
      u.depots
        .filter((d) => d.statut === "en_attente")
        .map((d) => ({
          ...d,
          citoyenTelephone: u.telephone,
          citoyenNom: `${u.prenom} ${u.nom}`,
        })),
    );
  };

  // Agent valide
  const validateDeposit = (citoyenTelephone, depotId) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.telephone === citoyenTelephone);
    const depotIndex = users[index].depots.findIndex((d) => d.id === depotId);
    users[index].depots[depotIndex].statut = "validé";
    users[index].points += users[index].depots[depotIndex].points;
    saveUsers(users);
    if (user && user.telephone === citoyenTelephone)
      syncCurrentUser(citoyenTelephone);
  };

  // Agent reject
  const rejectDeposit = (citoyenTelephone, depotId) => {
    const users = getUsers();
    const index = users.findIndex((u) => u.telephone === citoyenTelephone);
    const depotIndex = users[index].depots.findIndex((d) => d.id === depotId);
    users[index].depots[depotIndex].statut = "rejeté";
    saveUsers(users);
    if (user && user.telephone === citoyenTelephone)
      syncCurrentUser(citoyenTelephone);
  };

  // Agent scanne the citoyen qr code and valide
  const scanAndValidate = (telephone, type, poids) => {
    const points = Math.round(poids * 10);
    const users = getUsers();
    const index = users.findIndex((u) => u.telephone === telephone);
    if (index === -1) throw new Error("Citoyen introuvable");
    const depot = {
      id: Date.now().toString(),
      type,
      poids,
      points,
      date: new Date().toISOString(),
      statut: "validé",
    };
    users[index].depots.push(depot);
    users[index].points += points;
    saveUsers(users);
    if (user && user.telephone === telephone) syncCurrentUser(telephone);
    return { citoyen: users[index], points };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        addDepot,
        getPendingDeposits,
        validateDeposit,
        rejectDeposit,
        scanAndValidate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
