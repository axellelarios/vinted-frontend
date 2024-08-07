import React, { useState, useEffect } from "react";
// RENOMMAGE DES ROUTES
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";

// IMPORT ASSETS
import logo from './assets/logo.svg'
import Cookies from "js-cookie";

// IMPORT COMPOSANTS
import Header from './components/Header.jsx'

// IMPORT PAGES
import Home from "./pages/Home";
import Product from "./pages/Offer";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Publish from "./pages/Publish.jsx"; 
import User from "./pages/User.jsx";
import Payment from "./pages/Payment.jsx";

import './App.css' 

function App() {

  const [user, setUser] = useState([]);

  const [token, setToken] = useState(
    Cookies.get("userToken") || null
  );

  const [session, setSession] = useState(
    Cookies.get("session") || null
  );

  const handleSession = (userId) => {
    if (userId) {
      Cookies.set("session", userId, { expires: 7 });
      setSession(userId);   
    } else {
      Cookies.remove("session");
      setSession(null); 
    }
  }

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
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState([0, 200]);
  const [priceOrder, setPriceOrder] = useState("");

  return  (
    <Router>
      <Header handleSession={handleSession} session={session} handleToken={handleToken} user={user} token={token} logo={logo} sort={sort} setSort={setSort} search={search} setSearch={setSearch}  />
      <Routes>
        <Route path="/" element={<Home setPriceOrder={setPriceOrder} sort={sort} setSort={setSort} priceOrder={priceOrder} search={search} setSearch={setSearch} price={price} setPrice={setPrice} />} />
        <Route path="/offer/:id" element={<Product token={token} />} />
        <Route path="/payment/" element={<Payment token={token} />} />
        <Route path="/login" element={<Login handleSession={handleSession} session={session}  handleToken={handleToken} setUser={setUser} token={token} user={user} />} />
        <Route path="/user/:id" element={<User handleSession={handleSession} session={session}  handleToken={handleToken} setUser={setUser} token={token} user={user} />} />
        <Route path="/signup" element={<Signup handleSession={handleSession} session={session}  handleToken={handleToken} user={user} setUser={setUser} setToken={setToken} token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes> 
      <footer>
          <div className="container">
                
          </div>
      </footer>
    </Router>
  )
}

export default App
