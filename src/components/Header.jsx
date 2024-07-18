
import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header({logo, setSearch, search}) {

  const navigate = useNavigate(); 
  const [searchTitle, setSearchTitle] = useState("");
  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSearch({
        ...search,
        title: searchTitle,
      });
      console.log(search)
      navigate("/");
      searchTitle("");
      
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <header>
        <div className="container u-flexbox u-align-items-center">
          <div className="header u-flexbox u-align-items-center u-fill-width u-justify-content-space-between">
                <div className="header__logo">
                        <Link className="u-block" to="/" title="Vinted logo">
                            <img src={logo} />
                        </Link>
                </div>
                <form onSubmit={handleSubmit} className="header__search u-flexbox u-align-items-center u-fill-width u-justify-content-center">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M7 11.5a4.5 4.5 0 1 1 .01-9.01A4.5 4.5 0 0 1 7 11.5zm4.74-.82a6 6 0 1 0-1.06 1.06l3.25 3.25L15 13.93l-3.25-3.25z"></path></svg>
                        <input value={searchTitle} onChange={handleTitleChange} placeholder="Rechercher des articles"></input>
                </form>  
                <div className="header__right u-flexbox u-align-items-center u-justify-content-end">
                        <a href="/" title="S'incrire" className="button button-secondary">
                            S'inscrire
                        </a>
                        <a href="/" title="S'incrire" className="button button-secondary">
                            Se connecter
                        </a>   
                        <a href="/" title="S'incrire" className="button button-primary">
                            Vends tes articles
                        </a>                  
                </div>  
          </div>          
        </div>
    </header>
  )
}

export default Header