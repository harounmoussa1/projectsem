// Search.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SearchBar = () => {
  const [query, setQuery] = useState(""); // Stores the search query
  const [suggestions, setSuggestions] = useState([]); // Stores recipe suggestions
  const [loading, setLoading] = useState(false); // Tracks loading state
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch suggestions as the user types
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
        params: {
          q: searchTerm, // User's query
          type: "public",
          app_id: "2924ba02", // Your App ID
          app_key: "5bddcb2069c125bfb9efe35124827718", // Your API Key
          from: 0, // Fetch the first few results
          to: 5, // Limit to 5 suggestions
        },
      });

      // Extract recipe names and store them as suggestions
      const recipeSuggestions = response.data.hits.map((hit) => ({
        id: hit.recipe.uri.split("#")[1],  // Extract the ID from the URI
        label: hit.recipe.label,
        image: hit.recipe.image,
      }));

      setSuggestions(recipeSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle query change and fetch suggestions
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
    fetchSuggestions(searchTerm);
  };

  // Handle suggestion selection and navigate to RecipeDetailPage
  const handleSuggestionClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`); // Navigate to recipe detail page
    setQuery(""); // Clear the search bar
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div style={{ textAlign: "center", margin: "20px auto", maxWidth: "600px" }}>
      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a dish..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          fontSize: "16px",
        }}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            margin: "10px 0 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#fff",
            position: "absolute",
            width: "100%",
            zIndex: 10,
          }}
        >
          {suggestions.map((recipe, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(recipe)} // Navigate to recipe detail page
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Use Link for internal navigation */}
              <img
                src={recipe.image}
                alt={recipe.label}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
              <span>{recipe.label}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Loading State */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SearchBar;
