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
import Login from "./pages/Login.jsx";
import Subscribe from "./pages/Subscribe.jsx";
import './App.css'


function App() { 

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  // Creation d'un cookie
  const [token, setToken] = useState(
    Cookies.get("token") || null
    // soit je trouve un cookie, soit c'est nulL
  );

  // Creation d'un state pour ma barre de recherche
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([25, 100]);
  const [priceOrder, setPriceOrder] = useState("");

  return  (
    <Router>
      <Header logo={logo} search={search} setSearch={setSearch}  />
      <Routes>
        <Route path="/" element={<Home setPriceOrder={setPriceOrder} priceOrder={priceOrder} search={search} setSearch={setSearch} price={price} setPrice={setPrice} />} />
        <Route path="/offer/:id" element={<Product />} />
        <Route path="/login" element={<Login token={token} />} />
        <Route path="/subscribe" element={<Subscribe token={token} />} />
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
