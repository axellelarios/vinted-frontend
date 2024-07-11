import React, { useState, useEffect } from "react";
import axios from "axios";
import Offers from "../components/Offers"


function Home() {
    // On initialise data comme null
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    // On appelle un state UseEffect pour qu'a la création de home, on va chercher les données via axios
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://lereacteur-vinted-api.herokuapp.com/offers"
          );
          // On envoie les données à note state SetData
          setData(response.data); 
        } catch (error) {
            console.log("this is an error" + error.response);
        } 
        // On définit notre loading à false ** important ** doit être dans fetchData sinon ça ne marche pas 
        setIsLoading(false);    
      };
      fetchData();
    }, []);

    return isLoading ? (
       <main className="loading">
          <div className="container u-flexbox u-align-items-center u-justify-content-center">Chargement...</div>
       </main>
    ): (
        <main className="home-section">
            <section className="hero">
              <div className="container">
                
              </div>
            </section>
            <section className="offers">
              <div className="container">
                  <div className="offers-content u-flexbox u-flex-wrap">
                  {data.offers.map((offer) => {
                    return (
                        <div className="offer-wrapper" key={offer._id}>
                          {/* On envoie les données de l'objets data */}
                          <Offers offer={offer} key={offer._id} />
                        </div>
                      );
                  })}
                  </div>
              </div>
            </section>           
       </main>   
    );
  }
  
  export default Home
  