
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login ({handleSession, handleToken, setUser, token}) { 

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();


   const handleEmailChange = event => {
      const value = event.target.value;
      setEmail(value);
   };      
  
   const handlePasswordChange = event => {
         const value = event.target.value;
         setPassword(value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
      const response = await axios.post(
          "https://site--backend-vinted--z96jrv9g2mbz.code.run/user/login",
          {
          email: email,
          password: password,
          }
      );
      handleToken(response.data.token);
      handleSession(response.data._id)
      setUser(response.data);  
      navigate("/publish");
      } catch (error) {
         console.log(error.response.data)

         if (error.response.data.message) {
            setError(error.response.data.message)
         } else if (error.response.data.error) {
            setError(error.response.data.error);
         }
      }
   };


    return !token ? (
       <main className="login-subscribe">
           <div className="container">
                <form onSubmit={handleSubmit}>
                     <h1>Se connecter</h1>
                     <div className="input_email">
                        <label>Email
                           <input 
                              placeholder="Email"
                              type="Email"
                              name="email"
                              value={email}
                              onChange={handleEmailChange}                
                           ></input>
                        </label>
                     </div>
                     <div className="input_password">
                        <label>Mot de passe
                           <input
                               placeholder="Password"
                               type="password"
                               name="password"
                               value={password}
                               onChange={handlePasswordChange}                        
                           ></input>
                        </label>
                     </div>  
                     <button type="submit" value="Submit"  className="button button-primary">Continuer</button>     
                     <span className="error">
                            {error}
                     </span>                                                            
                </form>
                <div className="footer-form">
                Tu n'as pas de compte Vinted ? <Link className="u-block link button button-secondary" to="/signup" title="Créer un compte">S'inscrire</Link>  
                </div>   
         </div>
        </main>
    ): 
    <Navigate to="/login" />
  }
  
  export default Login
  