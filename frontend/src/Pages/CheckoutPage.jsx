import React, { useCallback } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51QdPAbP2gp2kn1rnRPub4TtoVXqNPnOOr7L4f1D78rCQjOg41s764j9CMyIfESE8yqRodEwbzkRSVSxq5Uwh7kxZ00z4x5tMTQ");

const CheckoutForm = () => {
  const cartProducts = JSON.parse(localStorage.getItem("finalCartProducts"));
  console.log("this is the cartProducts", cartProducts);
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    // return fetch("/create-checkout-session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ items: cartProducts})
    // })
    //   .then((res) => res.json())
    //   .then((data) => data.clientSecret);

    //This sends cart information to backend to create a checkout session. Returns the client secret
    //client secret is used to set the items and payment amount to the stripe checkout
    console.log("checkout starting");
    const response = await axios.post("/api/stripe/create-checkout-session", { items: cartProducts });
    console.log("response", response);
    const { clientSecret } = response.data;
    return clientSecret;
    // eslint-disable-next-line
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
};

export default CheckoutForm;