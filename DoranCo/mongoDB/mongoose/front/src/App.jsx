import { useState, useEffect, createContext } from "react";
import "./App.css";
import "./Profile.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Inscription from "./pages/inscription.jsx";
import Connexion from "./pages/connexion.jsx";
import Profile from "./pages/profile.jsx";
import Edit from "./pages/edit.jsx";
import Threads from "./pages/threads.jsx"

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return;
      }
      const response = await fetch("/api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        return;
      }
      const user = await response.json();
      setUser(user.user);
    }
    getUser()
  }, []);

  function Logout() {
    localStorage.removeItem("access_token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <BrowserRouter>
        <nav>
          <Link to={"/"}>Accueil</Link>
          {
            // La condition est a changer plus tard
            ! user ? 
              <>
                <Link to={"/inscription"}>Inscription</Link>
                <Link to={"/connexion"}>Connexion</Link>
              </> :
              <>
         
              <Link to={"/profile"}>Profile</Link>
              <Link to="/modifier-profil">Modifier le profil</Link>
              <Link to="/threads">Threads</Link>
              <button onClick={Logout}>Se déconnecter</button>
            </>
}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/modifier-profil" element={<Edit />} />
          <Route path="/threads" element={<Threads />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;

// Créer un composant /components/TodoList.jsx
// Il y'aura un input et un bouton
// Quand on clique sur le bouton, afficher dans une alerte l'entrée de l'utilisateur


// Implementer la déconnexion
// Ajouter un bouton dans la navbar, qui quand on clique dessus:
// Supprimer le token de localStorage
// Mettre la variable d'état user a null
