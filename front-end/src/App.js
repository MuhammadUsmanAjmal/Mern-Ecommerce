import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route exact path="/shipping" element={<Navigate replace to="/login" /> ? <ShippingScreen/> : ""}/>
              <Route exact path="/payment" element={<PaymentScreen/>}/>
              <Route exact path="/placeorder" element={<PlaceOrderScreen/>}/>
              <Route exact path="/login" element={<LoginScreen/>}/>
              <Route exact path="/register" element={<RegisterScreen/>}/>
              <Route exact path="/profile" element={<ProfileScreen/>}/>
              <Route exact path="/product/:id" element={<ProductScreen />} />
              <Route exact path="/cart/:id" element={<CartScreen />} />
              <Route exact path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
