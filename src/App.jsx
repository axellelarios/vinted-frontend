import React, { useState, useEffect } from "react";
// RENOMMAGE DES ROUTES
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// IMPORT ASSETS
import logo from './assets/logo.svg'
import Cookies from "js-cookie";
// IMPORT COMPOSANTS
import Header from './components/Header'

// IMPORT PAGES
import Home from "./pages/Home";
import Product from "./pages/Offer";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Publish from "./pages/Publish.jsx"; 
import './App.css' 


function App() {

  const [user, setUser] = useState("");

  const [token, setToken] = useState(
    Cookies.get("userToken") || null
  );

  console.log(token)
  console.log(user)

  // fonction pour permettre de récupérer le token et de le stoker ou l'enlever
  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setToken(token);   
    } else {
      Cookies.remove("userToken");
      setToken(null);
    }
  }

  // Creation d'un state pour ma barre de recherche
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 200]);
  const [priceOrder, setPriceOrder] = useState("");

  return  (
    <Router>
      <Header handleToken={handleToken} token={token} user={user} logo={logo} search={search} setSearch={setSearch}  />
      <Routes>
        <Route path="/" element={<Home setPriceOrder={setPriceOrder} priceOrder={priceOrder} search={search} setSearch={setSearch} price={price} setPrice={setPrice} />} />
        <Route path="/offer/:id" element={<Product />} />
        <Route path="/login" element={<Login handleToken={handleToken} setUser={setUser} token={token} user={user} />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} user={user} setUser={setUser} setToken={setToken} token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
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
