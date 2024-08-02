
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login ({handleToken, setUser, token}) { 

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
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
          email: email,
          password: password,
          }
      );
      console.log(response.data.account.username);
      handleToken(response.data.token);
      setUser(response.data.account.username); 
      navigate("/publish");
      } catch (error) {
          console.log(error.message)
          setError(error.message);
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
         </div>
        </main>
    ): 
    <Navigate to="/login" />
  }
  
  export default Login
  