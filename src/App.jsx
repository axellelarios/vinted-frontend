import React, { useState, useEffect } from "react";
// RENOMMAGE DES ROUTES
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// IMPORT ASSETS
import logo from './assets/logo.svg'
import Cookies from "js-cookie";
// IMPORT COMPOSANTS
import Header from './components/Header'

// IMPORT PAGES
import Home from "./pages/Home";
import Product from "./pages/Offer";
import './App.css'


function App() { 

  // Creation d'un cookie
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // soit je trouve un cookie, soit c'est nul
  );

  // Creation d'un state pour ma barre de recherche
  const [search, setSearch] = useState({
    sort: "",
    priceRange: [0, 50],
    title: "",
  });
  
  return  (
    <Router>
      <Header logo={logo} search={search} setSearch={setSearch}  />
      <Routes>
        
        <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
        <Route path="/offer/:id" element={<Product />} />
      </Routes>
      <footer>
          <div className="container">
              Made with love by Axelle for Le Reateur   
          </div>
      </footer>
    </Router>
  )
}

export default App
