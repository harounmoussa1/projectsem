import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./app.css";
import Loginbutton from "./loginbutton";
import Registerbutton from "./registerbutton";
import Logoutbutton from "./logoutbutton";
import Allrecipiesbutton from "./allrecepiesbutton";
import { Link } from "react-router-dom"; // Import Link for internal routing

const handleClick = () => {
  window.open("/", "_self");
};

const signedin = localStorage.getItem("signedin");
console.log(signedin);

const username = localStorage.getItem("users");

function Header() {
  const [query, setQuery] = useState(""); // Search bar input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch recipe suggestions
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm) {
      setSuggestions([]); // Clear suggestions when input is empty
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
        params: {
          q: searchTerm,
          type: "public",
          app_id: "2924ba02", // Replace with your Edamam App ID
          app_key: "5bddcb2069c125bfb9efe35124827718", // Replace with your Edamam API Key
          from: 0,
          to: 5, // Fetch top 5 suggestions
        },
      });

      const recipeSuggestions = response.data.hits.map((hit) => ({
        label: hit.recipe.label,
        image: hit.recipe.image,
        url: hit.recipe.url,
      }));

      setSuggestions(recipeSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search bar input change
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setSuggestions([]); // Clear suggestions if input is empty
    } else {
      fetchSuggestions(searchTerm); // Fetch suggestions if input is not empty
    }
  };

 // Handle suggestion selection
  const handleSuggestionClick = (recipe) => {
    window.open(recipe.url, "_blank"); // Open recipe in a new tab
    setQuery(""); // Clear the search bar
    setSuggestions([]); // Clear suggestions
  };
  // Handle pressing Enter (optional, if you want to use Enter for search)
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      setQuery(""); // Clear the search bar
      setSuggestions([]); // Clear suggestions
    }
  };

  return (
    <div>
      <header className="header">
        <a onClick={handleClick}>
          <img src="assets/logo.png" alt="Logo" className="logo" />
        </a>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleSearchSubmit} // Handle Enter key press
            placeholder="Search"
            className="search-input"
          />
          {loading && <div className="loading">Loading...</div>}
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((recipe, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(recipe)}
                  className="suggestion-item"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.label}
                    className="suggestion-image"
                  />
                  <span>{recipe.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Authentication Buttons */}
        <div className="auth-buttons">
          <Allrecipiesbutton />
          {signedin === "false" ? (
            <>
              <Loginbutton />
              <Registerbutton />
            </>
          ) : (
            <> 
              <span>Hello, welcome again</span>
              <Logoutbutton />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
