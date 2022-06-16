import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

function App() {
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
      <Route path="/Logout" element={<Logout />}></Route>
     </Routes>
    </div>
  );
}

export default App;
