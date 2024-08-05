
// IMPORT PACKAGES
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Signup ({handleSession, handleToken, setUser, token, setToken, user}) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [avatar, setAvatar] = useState();
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("newsletter", newsletter);
    formData.append("avatar", avatar)


    const handleNameChange = event => {
        const value = event.target.value;
        setUsername(value);
    };

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };      
    
    const handlePasswordChange = event => {
        const value = event.target.value;
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
            "https://site--backend-vinted--z96jrv9g2mbz.code.run/user/signup",
            formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
            }    
        );
        if (response.data._id) { 
            handleToken(response.data.token);
            handleSession(response.data._id)
            navigate(`/user/${response.data._id}`);
        }

        } catch (error) {
            console.log(error.response.data)

            if (error.response.data.message) {
               setError(error.response.data.message)
            } else if (error.response.data.error) {
               setError(error.response.data.error);
            }
        }
    };

    return (
    <div className="login-subscribe">
           <div className="container">
            
                <form onSubmit={handleSubmit}>
                     <h1>Inscris-toi avec ton email</h1>

                     <div className="avatar_file">
                            <div className="dashed-preview-without" >
                            <div className="input-design-default">
                                <div className="link button button-file">
                                <label htmlFor="filePicker" > 
                                    <span>Choisissez un avatar</span>
                                </label>
                                <input
                                    style={{ display: "none" }}
                                    id="filePicker"
                                    type="file"
                                    onChange={(event) => {
                                    setAvatar(event.target.files[0]);
                                    }}
                                />
                                {avatar && (
                                    <img src={URL.createObjectURL(avatar)} alt="avartar"/>
                                )}
                                </div>
                            </div>
                            </div>
                    </div>

                     <div className="input_name">
                        <label>Nom d'utilisateur
                            <input
                            placeholder=""
                            type="text"
                            name="username"
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
  