
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";


function Login ({ token}) {
    return (
       <div className="login-subscribe">
           <div className="container">
                <form>
                     <h1>Se connecter</h1>
                     <div className="input_email">
                        <label>Email
                           <input type="email"></input>
                        </label>
                     </div>
                     <div className="input_password">
                        <label>Mot de passe
                           <input type="password"></input>
                        </label>
                     </div>  
                     <button className="button button-primary">Continuer</button>                                         
                </form>
         </div>
        </div>
    )
  }
  
  export default Login
  