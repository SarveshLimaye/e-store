import { useEffect , useState} from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@mui/material";
import Search from "./Search";

const Products = () => {
    const[products,setProducts]=useState([])
    const [query,setQuery]=useState("")
    useEffect(()=>{
     const fetchApi = async () => {
        const response = await fetch(query ? `http://localhost:5000/api/v1/products/search?name=${query}`: `http://localhost:5000/api/v1/products`);
        const resJson = await response.json()
        setProducts(resJson)
     }
     fetchApi()
    },[query])
    return (
        <div >
        <div style={{display:'flex' , justifyContent:'center' , margin:'1rem 0 1rem 0'}}>
         <Search getQuery={ (q) => {setQuery (q)}}/>
         </div>
        <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          <ProductCard styles={{margin:'1rem 0 1rem 0'}} 
          title={product.name} 
          description={product.description} 
          rating={product.rating} 
          image={product.image}
          id={product._id}
          price={product.price}  
          />
        </Grid>
      ))}
    </Grid>
    </div>
    );
}

export default Products;