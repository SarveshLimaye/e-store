import { Grid, TextField ,Button, Typography ,MenuItem} from "@mui/material";
import { useState , React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const ShippingForm = () => {
 const [address, setAddress] = useState("");
 const [city,setCity] = useState("")
 const [state,setState] = useState("")
 const [country,setCountry] = useState("")
 const [zip,setZip] = useState("")
 const [contact,setContact] = useState("")
 const [paymentDetails,setPaymentMode] = useState("")
 const {user} = useAuth0()

 const collectData = async () => {
    const email = user.email;
    let result = await fetch("http://localhost:5000/api/users/shippingDetails", {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,address,city,state,country,zip,contact,paymentDetails})

    })
    result = await result.json();
    console.log(result);
 }


return (
    <Grid container spacing={2}
    alignItems="center"
    justify="center"
    direction="column"
    style={{ minHeight: "100vh" , marginTop:'1.5rem' }}>
      <Typography variant="h4">Shipping Form</Typography> <br/>
      
      <Grid item sm={6} xs= {12} spacing={15}>
        <TextField required label="Address" margin="normal" onChange={(e) => {setAddress(e.target.value)}} variant="outlined" style={{marginRight:'1.5rem'}} />
        <TextField required label="City" margin="normal" variant="outlined" onChange={(e) => {setCity(e.target.value)}} />
      </Grid>
      <Grid item sm={6} xs= {12} spacing={8}>
        <TextField required label="State" margin="normal" onChange={(e) => {setState(e.target.value)}} variant="outlined" style={{marginRight:'1.5rem'}} />
        <TextField required label="Country" margin="normal" variant="outlined" onChange={(e) => {setCountry(e.target.value)}} />
      </Grid>
      <Grid item sm={6} xs= {12} spacing={8}>
        <TextField required label="ZIP Code" margin="normal" onChange={(e) => {setZip(e.target.value)}} variant="outlined" style={{marginRight:'1.5rem'}} />
        <TextField required label="Contact" margin="normal" onChange={(e) => {setContact(e.target.value)}} variant="outlined"/>
        
      </Grid>
      <TextField
          id="outlined-select-currency"
          select
          label="Select"
          margin="normal"
          onChange={(e) =>{setPaymentMode(e.target.value)}}
          helperText="Please select your Payment Mode"
        >
            <MenuItem value="COD">
                COD
            </MenuItem>
        </TextField>
        <Button variant="contained" style={{marginTop:'1rem'}}  onClick={() => {collectData()}} >Submit</Button>
  </Grid>
)

}

export default ShippingForm;