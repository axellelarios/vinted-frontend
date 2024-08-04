
import React, { useState, useEffect, useLayoutEffect } from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Header({handleToken, token, setUser, user, logo, setSearch, search}) {

  const navigate = useNavigate(); 

  const handleTitleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDisconned = () => {
    handleToken(null);
    setUser([]);
  }

  const location = useLocation();

  // scroll to top of page after a page transition.
  useLayoutEffect(() => {
      document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
  }, [location.pathname]);

  return (

    <header>
        <Outlet />
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
                        {token?
                         <div className="login-wrapper">
                              <Link to={`user/${user._id}`} className="username-wrap"> 
                                    Bienvenue {user.account.username}
                              </Link>  

                              {token ? (
                                  <a className="u-block button button-secondary" onClick={handleDisconned} > Se déconnecter </a>
                                ): 
                                <></>
                              }                                     
                         </div>                     
                        : 
                          <Link className="u-block button button-secondary" to="/signup" title="S'incrire">
                          S'inscrire / Se connecter
                          </Link>                        
                        }
                        <Link to="/publish" title="S'incrire" className="button button-primary hidden-small">
                            Vends tes articles
                        </Link> 
                        <Link to="/publish" title="S'incrire" className="hidden-tab-and-up button button-primary">
                            Vendre
                        </Link>                                  
                </div>  
          </div>          
        </div>
    </header>
  )
}

export default Header