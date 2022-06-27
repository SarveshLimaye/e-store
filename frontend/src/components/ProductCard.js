import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const ProductCard = ({title,desc,image ,rating,id}) => {
    const addToCart = (id) => {
       console.log(id)
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

          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small" onClick={() => {addToCart(id)}}><AddShoppingCartIcon /></Button>
          </CardActions>
        </Card>
      );

}

export default ProductCard