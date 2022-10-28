import { useState , useEffect} from 'react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const CartCard = ({image,price,id,name,company,email,cart , isOrder , server_url}) => {
     const [quantity,setQuantity] = useState(1)
     const getQuantity = (value) => {
            setQuantity(value)
     }
     

     const deleteItem = async () => {
       let item = await fetch (`${server_url}/users/cart/${email}/delete/${id}`,{
        method:"Delete",
        headers:{
            "Content-Type":"application/json"
        },
       })
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
                 
                
                 
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div" style={{marginLeft:'3rem'}}>
                    Rs {price * quantity}
                </Typography>
              <Grid>
             {isOrder ? null : <div> <Button style={{marginTop:'4rem' , marginLeft:'3rem'}} onClick={() => { deleteItem() }}><DeleteIcon /></Button></div>}
              </Grid>  
              </Grid>
          
            </Grid>
          </Grid>
        </Paper>
      
      
       )
      
}

export default CartCard