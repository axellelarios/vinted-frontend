import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => { 
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

        </main>
    )
  }
  
  export default User
  