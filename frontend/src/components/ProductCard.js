import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductCard = ({title,desc,image ,rating,id ,price ,server_url}) => {
  const notify = () => toast.error("Login to add to cart");
  const {user , isAuthenticated} = useAuth0()
  const[success,setSuccess] = useState(false)
  const[open,setOpen]=useState(false)
    const addToCart = async (_id) => {
      if(isAuthenticated){
        const cartid = _id
        const email = user.email
       setOpen(true)
        let cart = await fetch(`${server_url}/users/updateCart`,{
             method:"Put",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
               cart:cartid,
               email
             })
        })
 
       let result = await cart.json()
       console.log(result)
       if(!result.message){
         setSuccess(true)
       }
      } 
      
    }



    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    }

   
     
    


    return (
        <Card sx={{ maxWidth: 345 , height:400}} style={{margin:"1rem  1rem "}}>
          <CardMedia
            component="img"
            alt="images"
            height="230"
            image={image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {desc}
            </Typography>
            <Rating name="read-only" value={rating} readOnly />
           {success ?   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added to cart successfully !
        </Alert>
      </Snackbar>: <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Item already exists in cart !
        </Alert>
      </Snackbar>}
          </CardContent>
          <CardActions>
           <Typography gutterBottom variant="h6" component="div" style={{margin:'0 0 0 0.9rem',color:'#3F0071'}}>Rs {price}</Typography>
            <Button size="small" onClick={() => { isAuthenticated ? addToCart(id) : notify() }} style={{color:'#3F0071'}}><AddShoppingCartIcon /></Button>
          </CardActions>
          <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
        </Card>
      );

}

export default ProductCard