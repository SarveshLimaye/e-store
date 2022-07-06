import { useState , useEffect} from 'react';
import { Typography } from '@mui/material';
import * as React from 'react';
import { getInitColorSchemeScript, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { QuantityPicker } from 'react-qty-picker';
import { Box } from '@mui/system';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const CartCard = ({image,price,id,name,company}) => {
     const [quantity,setQuantity] = useState(1)
     const getQuantity = (value) => {
            setQuantity(value)
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
              <ButtonBase sx={{ width: 128, height: 128 }}>
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
                  <Grid item> 
  
                  </Grid>
                <Box>
                <Typography variant="body2" color="text.secondary">
                   Qty : <QuantityPicker smooth min={1} value={1} onChange = {getQuantity}/>
                  </Typography>
                </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                    {price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      
      
       )
      
}

export default CartCard