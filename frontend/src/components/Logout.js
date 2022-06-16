import { Grid, Typography ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
  return(
    <Grid container
    spacing={0}
    alignItems="center"
    justify="center"
    direction="column"
    style={{ minHeight: "100vh" , marginTop:'1.5rem' }}>
        <Typography variant="h8">Are you sure you want to Logout</Typography> <br/>
        <Button variant="contained"  onClick={() => {logout()}} >Logout</Button>

    </Grid>
  )
}

export default Logout