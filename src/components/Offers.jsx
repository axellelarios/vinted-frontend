import { Link } from "react-router-dom";

export default function OfferCard ({offer}) {

        return (
                <div className="card-item">
                    { offer.owner.account ?
                    <Link to={`/user/${offer.owner._id}`} className="card-header u-flexbox u-align-items-center">

                         { offer.owner.account.avatar ?
                         <span><img src={offer.owner.account.avatar.secure_url} /></span> :
                         <div className="user-no-picture">{Array.from(offer.owner.account.username)[0]}</div>
                         }
                        
                        <div className="card-username">{offer.owner.account.username}</div>

                    </Link>
                    : <></> }
                    <Link to={`/offer/${offer._id}`} className="card-image">

                       {offer.product_image.length > 1 ?    
                            <div  key={"picture" + offer.product_name}> <img src={offer.product_image[0].secure_url} /> </div>
                         :
                          <div  key={"picture" + offer.product_name}> <img src={offer.product_image.secure_url} /> </div>  
                        }
           
                    </Link>
                    <Link to={`/offer/${offer._id}`} className="card-footer">
                        <div className="card-details u-flexbox u-flex-column">
                        {offer.product_details.map((detail, index) => {
                            return (
                                <div key={"detail" + index}>
                                    <div>{detail.MARQUE}</div>
                                    <div>{detail.TAILLE}</div>
                                    <div>{detail.ÉTAT}</div>
                                </div>
                            );
                        })}  
                        </div>
                        <div className="price_inc">{offer.product_price}€ incl. </div>                     
                    </Link>
                </div>  
        )
}