import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


export default function threads() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
  
    const validateForm = () => {
      const newErrors = {};
      if (!title) newErrors.title = 'Le titre est obligatoire';
      if (!description) newErrors.description = 'La description est obligatoire';
      return newErrors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
  
      const postData = { title, description };
      const token = localStorage.getItem('access_token');
  
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        navigate('/post'); // Rediriger vers la liste des posts après création
      } else {
        console.error('Erreur lors de la création du post');
      }
    };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>
        <button type="submit">Publier</button>
      </form>
      <div>

      </div>
    </div>
  );
}
