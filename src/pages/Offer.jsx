import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // On appelle un state UseEffect pour qu'a l"ouverture de mon offre va chercher les données via axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
                );
                console.log(response.data)
                // On envoie les données à note state SetOffer
                setOffer(response.data); 
            } catch (error) {
                console.log("this is an error >> " + error.response);
            }   
        setIsLoading(false);  
        };
        fetchData();
    }, []);

    console.log(offer)
    return isLoading ? (
        <main className="loading">
           <div className="container u-flexbox u-align-items-center u-justify-content-center">Chargement...</div>
        </main>
     ): (
        <main className="offer-section">
            <div className="container">
                <div className="offer-container u-flexbox u-fill-width u-justify-content-space-between">
                    <div className="offer-medias">
                        {offer.product_pictures.map((picture, index) => {
                            return (
                            <div  key={"picture" + index}> <img src={picture.url} /> </div>
                            )
                        })}
                    </div>
                    <div  className="offer-infos">
                        <div className="price_container">
                            <div className="price">{offer.product_price}€</div>
                            <div className="price_inc">{offer.product_price}€</div>
                        </div>
                        <div className="description_container">
                            {offer.product_details.filter(Boolean).map((detail, index) => {
                                const keys = Object.keys(detail);
                                const key = keys[0];
                                return (
      
                                    <div key={"detail" + index}> 
                                        <div className="details-list__item">
                                            <div className="details-list__item-title">{key} {detail[key]} </div>
                                        </div>
                                    </div>
                                );
                            })}  
                        </div>                       
                        
                    </div>                  
                </div>
            </div>
        </main>
    )
  }
  
  export default Offer
  