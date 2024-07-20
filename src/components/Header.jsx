
import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header({logo, setSearch, search}) {

  const navigate = useNavigate(); 

  const handleTitleChange = (event) => {
    setSearch(event.target.value)
  }

  //const handleChange = async (event) => {
  //  event.preventDefault();
  //  try {
  //    setSearch({
  //      ...search,
  //      title: searchTitle,
  //    });
  //    console.log(search)
  //    navigate("/");
  //  } catch (error) {
  //    console.log(error.response);
  //  }
  //};

  return (
    <header>
        <div className="container u-flexbox u-align-items-center">
          <div className="header u-flexbox u-align-items-center u-fill-width u-justify-content-space-between">
                <div className="header__logo">
                        <Link className="u-block" to="/" title="Vinted logo">
                            <img src={logo} />
                        </Link>
                </div>
                <form className="header__search u-flexbox u-align-items-center u-fill-width u-justify-content-center">
                        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M7 11.5a4.5 4.5 0 1 1 .01-9.01A4.5 4.5 0 0 1 7 11.5zm4.74-.82a6 6 0 1 0-1.06 1.06l3.25 3.25L15 13.93l-3.25-3.25z"></path></svg>
                        <input value={search} onChange={handleTitleChange} placeholder="Rechercher des articles"></input>
                </form>  
                <div className="header__right u-flexbox u-align-items-center u-justify-content-end">
                        <Link className="u-block button button-secondary" to="/subscribe" title="S'incrire">
                            S'inscrire / Se connecter
                        </Link>  
                        <a href="/" title="S'incrire" className="button button-primary hidden-small">
                            Vends tes articles
                        </a>  
                        <a href="/" title="S'incrire" className="hidden-tab-and-up button button-primary">
                            Vendre
                        </a>                                  
                </div>  
          </div>          
        </div>
    </header>
  )
}

export default Header