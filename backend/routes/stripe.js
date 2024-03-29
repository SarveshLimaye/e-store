const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_KEY);

const {payment , createOrder} = require('../controllers/stripe')

router.post('/create-checkout-session',payment)

const endpointSecret = "whsec_39cc0aac9fde1d7da9b626cdd3c864661664f510d4938f27dcceb55c949325f4";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  const payload = request.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: "whsec_39cc0aac9fde1d7da9b626cdd3c864661664f510d4938f27dcceb55c949325f4" ,
  });

  let data
  let eventType

  if(endpointSecret){
    let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  } 
   data = event.data.object;
   eventType = event.type;
  }  
  else {
     data = request.body.data.object;
     eventType = request.body.type;
  }

  

  // Handle the event
  if(eventType === 'checkout.session.completed'){
    stripe.customers.retrieve(data.customer)
      .then((customer) =>  {
        createOrder(customer,data)
      }).catch((err) => {
        console.log(err)
      })  
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



module.exports = router