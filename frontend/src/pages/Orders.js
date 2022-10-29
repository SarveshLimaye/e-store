import {React, useState , useEffect} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import OrderCard from '../components/OrderCard';
import { Grid } from "@mui/material";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Orders = ({server_url}) => {
    const [userId,setuserId] = useState('')
    const [orders,setOrders] = useState([])
    const [loadingInProgress, setLoading] = useState(true);
    let product = []
    const {user} = useAuth0();
    const email = user.email;
    const override = css`
    margin: 45rem;
    padding: 10rem;
    `;

    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch(`${server_url}/users`);
            const data = await response.json();
           data.map( (item) => {
              
                if(item.email === email){
                     setuserId(item._id)
                    
                }
              })
    }

    const fetchOrders = async () => {
        if(userId !== ''){
            const response = await fetch(`${server_url}/orders/${userId}`);
            console.log(response)
            const data = await response.json();
            setOrders(data)
            setLoading(false)
        }
        
       
    }
    fetchApi()
    fetchOrders()
    
},[userId])




    return(
        <div>
        {loadingInProgress ? ( <div style={{'textAlign':'center' ,  padding: '120px 0'}}>
        <ClipLoader
        color={"#372948"}
        loading={loadingInProgress}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>) : (<Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
        {orders.length > 0 ? orders.map(item => (
            <Grid item xs={12} sm={4} md={4} key={item._id}>
            <OrderCard 
                key={item._id}
                id={item._id}
                product={item.product}
                price={item.total}
                email = {item.email}
                payment_status = {item.payment_status}
                shipping = {item.shipping}
            />
            </Grid>
        )): <p> No orders yet</p>}
        </Grid>)}
        
        </div>
    )
}

export default Orders;