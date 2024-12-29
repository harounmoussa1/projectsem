import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipeDetailPage() {
  const { id } = useParams(); // On récupère l'ID de la recette depuis l'URL
  const [recipe, setRecipe] = useState(null); // Stocke les détails de la recette
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2/${id}`,
          {
            params: {
              type: "public",
              app_id: "2924ba02", // Remplacez par votre App ID
              app_key: "5bddcb2069c125bfb9efe35124827718", // Remplacez par votre API Key
            },
          }
        );
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recette non trouvée</div>;

  return (
    <div>
      <h1>{recipe.label}</h1>
      <img src={recipe.image} alt={recipe.label} />
      <h2>Ingrédients :</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </ul>
      <h2>Instructions :</h2>
      <p>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
          Voir les instructions complètes
        </a>
      </p>
    </div>
  );
}

export default RecipeDetailPage;
