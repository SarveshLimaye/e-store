import { useEffect , useState ,  CSSProperties } from "react";
import ProductCard from "../components/ProductCard";
import { Grid } from "@mui/material";
import Search from "../components/Search";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Products = ({server_url}) => {
    const[products,setProducts]=useState([])
    const [loadingInProgress, setLoading] = useState(true);
    const [query,setQuery]=useState("")
    const override = css`
    margin: 45rem;
    padding: 10rem;
    `;
    
    useEffect(()=>{
     const fetchApi = async () => {
        const response = await fetch(query ? `${server_url}/v1/products/search?name=${query}`: `${server_url}/v1/products`);
        const resJson = await response.json()
        setProducts(resJson)
        setLoading(false)
     }
     fetchApi()
    },[query])
    return (
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
        </div>) : (<div>
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
          server_url={server_url}  
          />
        </Grid>
      ))}
    </Grid>
    </div>
    </div>)}
      </div>     
      
    );
}

export default Products;