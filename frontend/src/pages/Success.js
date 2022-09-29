import { Box, Typography ,Button} from "@mui/material"
import Confetti from 'react-confetti'
import { Link } from "react-router-dom"

const Success = () => {
    return (
        <>
        
        <Box
  display="flex"
  justifyContent="center"
  mt={6}
>
 
  <Typography variant="h5" color={"dark-green"}>Thank you for shopping with us !</Typography>
 
</Box>

<Box
 justifyContent="center"
 display="flex"
  mt={6}
>
   <Link to="/" style={{'textDecoration':'none'}}><Button variant="contained"> Back to Home</Button></Link>
</Box>

<Confetti width={window.innerWidth} height={window.innerHeight}/>
</>
    )
   

}

export default Success