
// RENOMMAGE DES ROUTES
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// IMPORT ASSETS
import logo from './assets/logo.svg'

// IMPORT COMPOSANTS
import Header from './components/Header'

// IMPORT PAGES
import Home from "./pages/Home";
import Product from "./pages/Offer";
import './App.css'

function App() { 
  return  (
    <Router>
      <Header logo={logo} />
      <Routes>
        <Route path="/" element={<Home />} />
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
