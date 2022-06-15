import { Grid, TextField ,Button, Typography} from "@mui/material";
import { useState , React } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const collectData = async () => {
    let result = await fetch("http://localhost:5000/api/users/register", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})

    })
    result = await result.json();
    console.log(result);
    navigate("/");
 }
  return (
    <Grid container
    spacing={0}
    alignItems="center"
    justify="center"
    direction="column"
    style={{ minHeight: "100vh" , marginTop:'1.5rem' }}>
        <Typography variant="h4">Register</Typography> <br/>
        <TextField  label="Name" margin="normal" variant="outlined" fullwidth onChange={(e) => { setName(e.target.value)}}></TextField><br/>
        <TextField  label="E-mail" margin="normal" variant="outlined" fullwidth onChange={(e) => {setEmail(e.target.value)}} ></TextField><br/>
        <TextField  label="Password" margin="normal" variant="outlined" fullwidth onChange={(e) => {setPassword(e.target.value)}}></TextField><br/>
        <Button variant="contained"  onClick={() => {collectData()}} >Register</Button>
        </Grid>
    
  );
}


export default Register;