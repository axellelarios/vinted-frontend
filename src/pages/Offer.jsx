import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = ({token}) => {
    const { id } = useParams();
    const [offer, setOffer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // On appelle un state UseEffect pour qu'a l"ouverture de mon offre va chercher les données via axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                `https://site--backend-vinted--z96jrv9g2mbz.code.run/offer/${id}` 
                );
                // On envoie les données à note state SetOffer
                console.log(response.data)
                setOffer(response.data); 
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
        <main className="offer-section">
            <div className="container">
                <div className="offer-container u-flexbox u-fill-width u-justify-content-space-between">
                    <div className="offer-medias">                    
                        {offer.product_image.length > 1 ? offer.product_image.map((picture, index) => {
                            return (
                            <div  key={"picture" + index}> <img src={picture.secure_url} /> </div>
                            )
                        }) :
                          <div  key={"picture" + offer.product_name}> <img src={offer.product_image.secure_url} /> </div>  
                        }
                    </div>
                    <div  className="offer-infos">
                        <div className="price_container">
                            <div className="price">{offer.product_price}€</div>
                            <div className="price_inc">{offer.product_price}€</div>
                        </div>
                        <div className="description_container">
                            {offer.product_details.filter(Boolean).map((detail, index) => {
                                // On vient chercher les noms de clés
                                const keys = Object.keys(detail);
                                const key = keys[0];
                                return (

                                        <div key={"detail" + index} className="details-list__item">
                                            <div className="details-list__item-title">
                                                <span> {key} </span>
                                                <span> {detail[key]} </span>
                                            </div>
                                        </div>
                                );
                            })}  
                        </div>                       
                        <div className="description_title">
                            <div className="title">{offer.product_name}</div>
                            <div className="title">{offer.product_description}</div>
                        </div>                              
                        <div className="description_buttons">

                            {token ?
                            <Link to='/payment' state={{data: offer}} className="button button-primary">Acheter</Link>                    
                            : 
                            <Link to='/login' className="button button-primary">Acheter</Link>                     
                            }
    
                        </div>                                            
                    </div>                  
                </div>
            </div>
        </main>
    )
  }
  
  export default Offer
  