import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import AvatarDefault from "../components/containers/img/AvatarDefault.jpg";


export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (!user) {
    return navigate("/connexion");
  }
  return (
    <div className="body">
      <img className="avatar"
        src={user.avatarUrl ? user.avatarUrl : AvatarDefault}
        alt="avatar"
      />
      <p className="welcome">
        Welcome {user.username}
      </p>
      <p className="mail">{user.email}</p>
      <button onClick={() => navigate("/modifier-profil")}>
        Modifier le profil
      </button> 
    </div>
  );
}

//   Etape 12  : Modification du profile
// Implémenter la fonctionnalité permettant a l'utilisateur de changer ses données: username et avatar.
// Dans le front:
// [ ] Ajouter un formulaire pour modifier le username et l'avatar (Donne un URL vers une image)
// [ ]  Lors de la soumission du formulaire, envoyer une requête PUT vers "/api/me"

// Dans la back
// [ ] Ajouter la route PUT sur /api/me
// [ ] Récupérer les données du corps de la requête
// [ ] Valider les données sinon retourner 400
// [ ] Verifier le token de l'utilisateur sinon retourner 401
// [ ] Modifier l'utilisateur dans la base de données
// [ ] Retourner l'utilisateur dans la réponse


// Etape 13  : Créer des posts
// Implémenté la fonctionnalité permettant a l'utilisateur de créer des posts (title, description, content, imageUrl):  (method: POST - URL: `/api/posts)

// Dans le back:
// [ ] Créer un schema et model pour les posts: (id, userID, title, description, imageUrl)
// [ ] Ajouter la route POST /api/posts
// [ ] Récupérer les données dans le corps de la requête
// [ ] Valider les données sinon 400
// [ ] Verifier la validité tu token sinon 401
// [ ] Créer le post dans la base de données
// [ ] Retourner le nouveau post

// Dans le front:
// [ ] Créer un formulaire avec messages d'erreurs. (title: obligatoire, description: obligatoire)
// [ ] Envoyer une requête avec les données et le token lors de la soumission du formulaire
