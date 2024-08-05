
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import axios from "axios";

// IMPORT COMPOSANTS
import Offers from "../components/Offers"
import Filters from "../components/Filters"
// IMPORT ASSETS
import banner from '../assets/banner.jpg'
import tear from '../assets/tear.f7439053.svg' 

function Home({ price, sort, setSort, setPrice, search, priceOrder}) {
    // On initialise data comme null
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // On appelle un state UseEffect pour qu'a la création de home, on va chercher les données via axios
    useEffect(() => {
      const fetchData = async () => {
        try {
          // On appelle notre requete avec les filtres
          const response = await axios.get(
            `https://site--backend-vinted--z96jrv9g2mbz.code.run/offers?title=${search}&priceMin=${price[0]}&priceMax=${price[1]}&sort=${sort}`
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
       // on oublie pas de mettre nos dépendances pour que Useeffect garde un oeil sur leur changement
    }, [price, search, sort, priceOrder]); 

    return isLoading ? (
       <main className="loading">
          <div className="container u-flexbox u-align-items-center u-justify-content-center">Chargement...</div>
       </main>
    ): (
        <main className="home-section">
            <section className="hero">
                <div>
                    <img src={banner} />
                </div>
                <div className="hero-overlay">
                    <img src={tear} />
                </div>                
            </section>
            <Filters sort={sort} setSort={setSort} price={price} setPrice={setPrice} />
            <section className="offers">
              <div className="container">
                  <div className="offers-content u-flexbox u-flex-wrap">  
                     
                  {
                  data.offers.length > 0 ? 
                  data.offers.map((offer) => {
                    return (
                        <div className="offer-wrapper" key={offer._id}>
                          {/* On envoie les données de l'object data */}
                          <Offers offer={offer} key={offer._id} />
                        </div> 
                      );
                  })
                  : <div className="no-result">Pas de résultats.</div>
                  }
                  </div>
              </div>
            </section>           
       </main>   
    );
  }
  
  export default Home
  