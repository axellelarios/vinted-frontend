
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Navigate, Link} from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

// Cette ligne permet de vous connecter à votre compte Stripe en fournissant votre clef publique
const stripePromise = loadStripe(
  "pk_live_51PkAEvBQggVPMzNaDYP21zh8AgyfybPYrWd9kWBCmfM8gbQTT62ZofNuSNmu9OsKZx487NuuceRq4Y3UDl5h6Wgw00SLrUgnih"  
);

const Payment = ({token}) => {
  const location = useLocation()

  const productData = location.state.data

  if (!token) {
    return <Navigate to="/login" />
  }
  if (!location.state) {
    return <Navigate to="/" />
  }

  const getPrice = (price) => {
    const subtotal = parseInt((price + 1.2) * 100) 
    return subtotal
  }


  console.log(getPrice(productData.product_price))


  return (
    <main>
      <div className="payment-wrapper">
          <div className="container">
             <h1>Paiement</h1>
             <div className="payment-stripe">
                  <div className="payment-information">

                    <div class="description_container">

                        <div class="details-list__item">
                               <Link to={`/offer/${productData._id}`} className=" button button-secondary"> 
                                 ← Retour
                               </Link>
                          </div>                   

                          <div class="details-list__item">
                                <Link to={`/offer/${productData._id}`} className="detail-list__item-photo"> 
                                  {productData.product_image.length > 1 ? <img key={productData._id} src={productData.product_image[0].secure_url} /> 
                                  : <img key={productData._id} src={productData.product_image.secure_url} /> 
                                  } 
                              </Link>
                          </div>
                          
                          <div class="details-list__item">
                            <div className="details-list__item-price">
                              <span> COMMANDE </span>
                              <span> {productData.product_price.toFixed(2)} €</span>
                            </div>
                          </div>

                          <div class="details-list__item">
                            <div class="details-list__item-fees">
                              <span> Frais </span>
                              <span> 1.20 € </span>
                            </div>
                          </div>

                          <div class="details-list__item">
                            <div class="details-list__item-total">
                              <span> Total </span>
                              <span> {(productData.product_price + 1.2).toFixed(2)} €</span>
                            </div>
                          </div>
                    </div>

                  </div>
                  <Elements stripe={stripePromise} options={
                    {
                      mode: "payment",
                      amount: getPrice(productData.product_price),
                      currency: "eur"
                    }
                    }>
                    <CheckoutForm />
                  </Elements>
              </div>
          </div>
       </div>
    </main>
  );
};

export default Payment;