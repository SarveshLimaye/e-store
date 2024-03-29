import CartCard from "../components/CartCard";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button , Grid} from "@mui/material";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Cart = ({server_url}) => {
   const [cart,setCart] = useState()
   const [id,setId] = useState('')
   const [loadingInProgress, setLoading] = useState(true);
   let productId = []
   const[url,setUrl] = useState('')
   const {user} = useAuth0();
   const email = user.email;
   const override = css`
    margin: 45rem;
    padding: 10rem;
    `;
  
  

   const stripe = async () => {
    let response = await fetch(`${server_url}/stripe/create-checkout-session`, {
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
         const response = await fetch(`${server_url}/users/cart/${email}`);
          const data = await response.json()
          setId(data._id)
          setCart(data.cart)
          setLoading(false)
          
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
     {loadingInProgress ? (<div style={{'textAlign':'center' ,  padding: '120px 0'}}>
        <ClipLoader
        color={"#372948"}
        loading={loadingInProgress}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>) : (
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
          server_url={server_url}
          />
        )
        )}
        <Grid container spacing={2}
    alignItems="center"
    justify="center"
    direction="column"
    style={{ marginTop:'1.5rem' }}>
        <Button onClick={() => {console.log("i am clicked")}} variant="contained" style={{marginTop:'1rem' ,  backgroundColor: '#372948',}} ><a style={{textDecoration:"none",color: 'white'}} href={url}>Checkout</a></Button>
       </Grid>
      </div>
     )}
    
      </div>
   )
    
}

export default Cart;