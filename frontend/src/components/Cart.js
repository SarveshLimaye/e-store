import CartCard from "./CartCard";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
   const [cart,setCart] = useState()
   const[total,setTotal] = useState(0)
   const {user} = useAuth0();
   const email = user.email;
  //  console.log(cart)
   useEffect(() => {
     const fetchApi = async () => {
         const response = await fetch(`http://localhost:5000/api/users/cart/${email}`);
          const data = await response.json()
          setCart(data.cart)
          
      }
      fetchApi()
   },[cart])

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
          />
        ))}
      </div>
   )
    
}

export default Cart;