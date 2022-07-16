import { useState , useEffect} from 'react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import { QuantityPicker } from 'react-qty-picker';
import {Link} from "react-router-dom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const CartCard = ({image,price,id,name,company,email,cart}) => {
     const [quantity,setQuantity] = useState(1)
     const getQuantity = (value) => {
            setQuantity(value)
     }

     const deleteItem = async () => {
       let item = await fetch (`http://localhost:5000/api/users/cart/${email}/delete/${id}`,{
        method:"Delete",
        headers:{
            "Content-Type":"application/json"
        },
       })
     }

     const buyNow = async () => {
       let product = await fetch(`http://localhost:5000/api/orders/add`,{
        method:"Post",
        headers:{
          "Content-Type":"application/json"
      },
       body:JSON.stringify({
         orders:id,
         email,
         price
       })

       })

       console.log(await product.json())
     }


     
        return(
          <Paper
          sx={{
            p: 2,
            margin: '1rem 0 1rem 8rem',
            maxWidth: 900,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: '8rem', height: '8rem' }}>
                <Img alt="complex" src={image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                   {name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {company}
                  </Typography>
                    </Grid>
                  <Grid item> 
                 
                <Typography variant="body2" color="text.secondary">
                   Qty : <QuantityPicker smooth min={1} value={1} onChange = {getQuantity}/>  
                  </Typography>
                 
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div" style={{marginLeft:'3rem'}}>
                    Rs {price * quantity}
                </Typography>
              <Grid>
              <Button style={{marginTop:'4rem'}} onClick={() => { deleteItem() }}><DeleteIcon /></Button>
              <Link to={"/Orders"}  style={{textDecoration:"none"}}><Button style={{marginTop:'4rem'}} onClick={() => { buyNow()}}>Buy Now</Button></Link>
              </Grid>  
              </Grid>
          
            </Grid>
          </Grid>
        </Paper>
      
      
       )
      
}

export default CartCard