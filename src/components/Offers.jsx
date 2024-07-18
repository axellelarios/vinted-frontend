import { Link } from "react-router-dom";

export default function OfferCard ({offer}) {
        return (
                <Link className="card-item" to={`/offer/${offer._id}`}>
                    <div className="card-header u-flexbox u-align-items-center">
                        <span><img src={offer.owner.account.avatar?.secure_url} /></span>
                        <div className="card-username">{offer.owner.account.username}</div>
                    </div>
                    <div className="card-image">
                        <img src={offer.product_image.secure_url} />
                    </div>
                    <div className="card-footer">
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
                    </div>
                </Link>  
        )
}