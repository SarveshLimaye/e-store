import Navbar from "./components/Navbar";
import {Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Logout from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Login" element={<Logout />}></Route>
      <Route path="/Register" element={<Register />}></Route>
     </Routes>
    </div>
  );
}

export default App;
