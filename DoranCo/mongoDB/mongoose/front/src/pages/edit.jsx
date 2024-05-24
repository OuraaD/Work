import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const navigate = useNavigate();

  if (!user) return "No user";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changement = {
      username,
      avatarUrl,
    };

    const garder = localStorage.getItem("access_token");

    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${garder}`,
      },
      body: JSON.stringify(changement),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      navigate("/profile");
    } else {
      console.error("Erreur de mise à jour du profil");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="avatarUrl">URL de l'Avatar:</label>
          <input
            type="text"
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            required
          />

        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
