import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button , Grid} from "@mui/material";

const Cart = () => {
   const [cart,setCart] = useState()
   const [id,setId] = useState('')
   let productId = []
   const[url,setUrl] = useState('')
   const {user} = useAuth0();
   const email = user.email;
  
  

   const stripe = async () => {
    let response = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart,
        userId:id,
        productId:productId,
      })

  })
  let result = await response.json();
   setUrl(result.url)
  
   }

   useEffect(() => {
     const fetchApi = async () => {
         const response = await fetch(`http://localhost:5000/api/users/cart/${email}`);
          const data = await response.json()
          setId(data._id)
          setCart(data.cart)
          
      }  
      fetchApi()
      stripe()
      
   },[cart])

   const getProductId = async () => {
      cart?.map((item) => {
        productId.push(item._id)
      })

    
   }
   getProductId()
  
   
   return(
      <div>
        {cart?.map((product) => (
          <CartCard 
          key={product._id} 
          id={product._id}
          image={product.image} 
          name={product.name} 
          price = {product.price}  
          company = {product.company}
          email={email}
          cart={cart}
          isOrder={false}
          />
        )
        )}
        <Grid container spacing={2}
    alignItems="center"
    justify="center"
    direction="column"
    style={{ marginTop:'1.5rem' }}>
        <Button onClick={() => {console.log("i am clicked")}} variant="contained" style={{marginTop:'1rem'}} ><a style={{textDecoration:"none",color: 'white'}} href={url}>Checkout</a></Button>
       </Grid>
      </div>
   )
    
}

export default Cart;