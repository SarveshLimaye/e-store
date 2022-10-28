import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Orders from "./pages/Orders";

function App() {
  const server_url = process.env.REACT_APP_SERVER_URL
  return (
    <div className="App">
     <Navbar server_url={server_url}/>
     <Routes>
      <Route path="/" element={<Products  server_url= {server_url}/>} />
      <Route path="/Products" element={<Products server_url= {server_url} />} />
      <Route path="/Success" element={<Success  />}/>
      <Route path="/Cart" element={<Cart server_url= {server_url}/>} />
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Orders" element={<Orders server_url= {server_url}/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
