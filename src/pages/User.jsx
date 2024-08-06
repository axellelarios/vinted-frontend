import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Offers from "../components/Offers"

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
                         { user.account.avatar ?
                         <img src={user.account.avatar.secure_url} /> :
                         <div className="user-no-picture">{Array.from(user.account.username)[0]}</div>
                         }
                         <div className="user-description">
                            <span>Membre :</span>
                            <h2>{user.account.username}</h2>
                         </div>
                    </div>
                    <div className="user-right">
                              {session == user._id  ?
                                  <Link to='/' className="link button">
                                      Modifier mon profil
                                  </Link>  
                               : <></>
                               }
                    </div>              
                </div>

                <div className="martop-20 offers-content u-flexbox u-flex-wrap">  
                    
                     {
                     user.offers.length > 0 ? 
                     user.offers.map((offer) => { 
                        console.log(offer)    
                        return <div className="offer-wrapper"> <Offers  offer={offer} /></div> 
                     })
                     : <div className="no-result">Pas de résultats.</div>
                     }
                     
                </div>

          </div>
        </main>
    )
  }
  
  export default User
  