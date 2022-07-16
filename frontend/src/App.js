import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import ShippingForm from "./components/ShippingForm";
function App() {
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Profile" element={<Profile />}></Route>
     </Routes>
    </div>
  );
}

export default App;
