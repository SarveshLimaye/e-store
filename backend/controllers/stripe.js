 require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const payment = async (req,res) => {
  // console.log(req.body.userId)
  const customer = await stripe.customers.create({
    metadata:{
       userId: req.body.userId,
       cart:JSON.stringify(req.body.cart)
    }
  })
    const line_items = req.body.cart.map((item) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.name,
              images:[item.image],
              description: item.company,
              metadata:{
                name: item.name,
                price:item.price,
                image:item.image

              }

            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA','IN'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'inr',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'inr',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/Success',
      cancel_url: 'http://localhost:3000/',
    });
  
    res.send({url: session.url});

  
   
}

module.exports= {payment}

