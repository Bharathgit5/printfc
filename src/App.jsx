import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './pages/Home';
import Termsandconditions from './pages/Termsandconditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Refund from './pages/Refund';
import Aboutus from './pages/Aboutus';
import OrderSummary from './pages/OrderSummary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/Termsandconditions" element={<Termsandconditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/Refund" element={<Refund />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/order-summary/:id" element={<OrderSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
