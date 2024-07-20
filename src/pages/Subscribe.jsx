
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Subscribe ({ token}) {
    return (
    <div className="login-subscribe">
           <div className="container">
                <form>
                     <div className="input_name">
                        <label>Nom d'utilisateur
                            <input/>
                            <span>
                                Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.
                            </span>
                        </label>
                     </div>
                     <div className="input_email">
                        <label>Email
                           <input type="email"/>
                        </label>
                     </div>
                     <div className="input_password">
                        <label>Mot de passe
                           <input type="password"/>
                            <span>
                            Il doit contenir 7 lettres minimum, dont au moins un chiffre.
                            </span>
                        </label>    
                     </div>  
                     <button className="button button-primary">Continuer</button>                                                         
                </form>
                <div className="footer-form">
                    Tu as déjà un compte ? <Link className="u-block link button button-secondary" to="/login" title="Se">Se connecter</Link>  
                </div>                   
            </div>
        </div>
    )
  }
  
  export default Subscribe
  