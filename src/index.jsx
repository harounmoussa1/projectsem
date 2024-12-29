import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure Router is used for routing
import ReactDOM from 'react-dom';
import './app.css';  
import Home from './home';
import Login from './login';
import Register from './register';
import SearchBar from './search';  // Import SearchBar for searching recipes
import RecipeDetailPage from './RecipeDetailPage';  // Import the recipe detail page
import Allrecipies from './allrecipies';
import Italy from './italy/italy';
import Korea from './korea/korea';
import Pizza from './italy/pizza/pizza';
import Mexico from './mexico/mexico';
import Enchiladas from './mexico/enchiladas/enchiladas';
import Header from './header';

ReactDOM.render(
  <Router>
    <Routes>
      {/* Home route */}
      
      <Route path="/" element={<Home />} />


      {/* Recipe detail page route */}
      <Route path="/recipe/:id" element={<RecipeDetailPage />} /> {/* Detail page for individual recipe */}

      {/* Other routes */}
      <Route path="/allrecipies" element={<Allrecipies />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/italy" element={<Italy />} />
      <Route path="/korea" element={<Korea />} />
      <Route path="/pizza" element={<Pizza />} />
      <Route path="/mexico" element={<Mexico />} />
      <Route path="/enchiladas" element={<Enchiladas />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
