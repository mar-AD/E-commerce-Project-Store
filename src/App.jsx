import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage.jsx";
import Shop from "./Pages/Shop/Shop.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Favorites from "./Pages/Favorites/Favorites";
import Payment from "./Pages/Payment/Payment.jsx";
import About from "./Pages/About/About.jsx";
import Terms from "./Pages/Terms/Terms.jsx";
import PasswordReset from "./Pages/ResetPassword/ResetPassword.jsx";
import Backtothetop from "./Components/backtothetop/backtothetop.jsx";
import React, { useContext, useState } from "react";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.jsx";
import Checkout from "./Pages/checkout/Checkout.jsx";
import Profil from "./Pages/Profile/profile.jsx";

import { AuthContext } from "./Components/Logincontext/Logincontext.jsx";
function App() {
  const authCtx = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };
  return (
    <BrowserRouter>
      <Navbar onSearchChange={handleSearchChange} />
      <Routes>
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/About" element={<About />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/reset-password/:token" element={<PasswordReset />} />
        </>
        {!authCtx.token || authCtx.refToken ? (
          <>
            <Route path="*" element={<HomePage />} />

            {/* <Route path="/Favorites" element={<HomePage />} /> */}
          </>
        ) : (
          <>
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/Favorites" element={<Favorites />} />
          </>
        )}
      </Routes>
      <Backtothetop />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
