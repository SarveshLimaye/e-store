import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="App">
     <Navbar />
     <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Success" element={<Success />}/>
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/Orders" element={<Orders />}></Route>
     </Routes>
    </div>
  );
}

export default App;
