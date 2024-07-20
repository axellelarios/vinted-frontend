
// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import axios from "axios";

// IMPORT COMPOSANTS
import Offers from "../components/Offers"
import Filters from "../components/Filters"
// IMPORT ASSETS
import banner from '../assets/banner.jpg'
import tear from '../assets/tear.f7439053.svg' 

function Home({ price, setPrice, search, setSearch, priceOrder, setPriceOrder}) {
    // On initialise data comme null
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log(price[0])

    // On appelle un state UseEffect pour qu'a la création de home, on va chercher les données via axios
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
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
    }, [price, search, priceOrder]);

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
            <Filters price={price} setPrice={setPrice} />
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
  