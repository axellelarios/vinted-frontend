import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = ({session}) => { 
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // On appelle un state UseEffect pour qu'a l"ouverture de mon offre va chercher les données via axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                `https://site--backend-vinted--z96jrv9g2mbz.code.run/user/${id}` 
                );
                // On envoie les données à note state SetOffer
                console.log(response.data)
                setUser(response.data); 
            } catch (error) {
                console.log("this is an error >> " + error.response);
            }   
        setIsLoading(false);  
        };
        fetchData();
    }, []);

    return isLoading ? (
        <main className="loading">
           <div className="container u-flexbox u-align-items-center u-justify-content-center">Chargement...</div>
        </main>
     ): (
        <main className="user-section">
          <div className="container"> 
                <div className="user-header">
                    <div className="user-left">  
                         <img src={user.account.avatar.secure_url} /> 
                         <div className="user-description">
                            <span>Membre :</span>
                            <h2>{user.account.username}</h2>
                         </div>
                    </div>
                    <div className="user-right">
                              {session ?
                                  <Link to='/' className="link button">
                                      Modifier mon profil
                                  </Link>  
                               : <></>
                               }
                    </div>              
                </div>
          </div>
        </main>
    )
  }
  
  export default User
  