import { useEffect , useState} from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';

const Products = () => {
    const[products,setProducts]=useState([])
    useEffect(()=>{
     const fetchApi = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/products`)
        const resJson = await response.json()
        setProducts(resJson)
     }
     fetchApi()
    },[])
    return (
        <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <ProductCard styles={{margin:'1rem 0 1rem 0'}} 
          title={product.name} 
          description={product.description} 
          rating={product.rating} 
          image={product.image}
          id={product._id}  
          />
        </Grid>
      ))}
    </Grid>
    );
}

export default Products;