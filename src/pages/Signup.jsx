
// IMPORT PACKAGES
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup ({ handleToken, setUser, token, setToken, user}) {

    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleNameChange = event => {
        const value = event.target.value;
        setName(value);
    };

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };      
    
    const handlePasswordChange = event => {
        const value = event.target.value;
        console.log(value.length)
        if (value.length < 6) {
           setError("Le mot de passe doit contenir 6 lettres minimum, dont au moins un chiffre.")
        } else {
            setError("")
        }
        setPassword(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            {
            username : username,
            email: email,
            password: password,
            newsletter: false
            }
        );
        console.log(response.data.account.username);
        handleToken(response.data.token);
        setUser(response.data.account.username); 
        navigate("/");
        } catch (error) {
            console.log(error.message)
            setError(error.response.data.message);
        }
    };

    return (
    <div className="login-subscribe">
           <div className="container">
            
                <form onSubmit={handleSubmit}>
                     <h1>Inscris-toi avec ton email</h1>
                     <div className="input_name">
                        <label>Nom d'utilisateur
                            <input
                            placeholder=""
                            type="text"
                            name="name"
                            value={username}
                            onChange={handleNameChange}                          
                            />
                            <span>
                                Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.
                            </span>
                        </label>
                     </div>
                     <div className="input_email">
                        <label
                        >Email
                           <input                         
                           placeholder="Email"
                           name="email"
                           value={email}
                           onChange={handleEmailChange}                        
                           type="email"/>
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
                           />
                        </label>    
                     </div>  
                     <button type="submit" value="Submit" className="button button-primary">Continuer</button>       

                     <span className="error">
                            {error}
                     </span>                  

                </form>
                <div className="footer-form">
                    Tu as déjà un compte ? <Link className="u-block link button button-secondary" to="/login" title="Se connecter">Se connecter</Link>  
                </div>                   
            </div>
        </div>
    )
  }
  
  export default Signup
  