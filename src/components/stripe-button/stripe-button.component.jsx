import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './stripe-button.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-stripe'>
      <CardElement options={{
        hidePostalCode: true
      }}/>
      <CustomButton type="submit">
        Pay
      </CustomButton>
    </form>
  )
};

export default StripeCheckoutButton;