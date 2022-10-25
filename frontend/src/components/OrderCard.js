import React from 'react'
import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import { Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
const Img = styled('img')({
  margin: 'auto',
  width: '4rem',
  height:'4rem',
  borderRadius:'50%'
});

export default function OrderCard({id,product,price,email,payment_status,shipping}) {
    return (
    <Card sx={{ maxWidth: 345 , height:400}} style={{margin:"1rem  1rem "}}>
    <Box sx={{textAlign:'center'}} mt={2}>
    <Typography variant='h7' fontWeight={'bold'}>
      Order : {id}
    </Typography>
    </Box>
    {product.map(item => (
      <div>
      <Box mt={3} mb={3} mr={3} ml>
      <Img src={item.image}/>
      <Box sx={{textAlign:'right'}} mt={-7}>
      <Typography variant='subtitle1' >
          {item.name}
        </Typography>
        <Typography variant='subtitle1' >
          {item.company}
        </Typography>
        <Typography variant='subtitle1' color="GrayText">
          Rs {item.price}
        </Typography>
      </Box>
      </Box>
      <Divider />
      </div>

    ))}

    <Box>
      
    </Box>
    <Box style={{display:'flex' , justifyContent:'space-between', margin:'1rem'}}>

    <Typography variant='subtitle1' color="GrayText">
          {payment_status === 'paid' ? 'Paid ✅' : 'Not Paid'}
        </Typography>

        <Typography variant='subtitle1' color="GrayText">
          Rs {(price)/100}
        </Typography>

    </Box>
    </Card>
    
  )
}
