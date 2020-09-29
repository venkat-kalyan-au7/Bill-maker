  
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage.js";
import RegisterPage from "./Pages/RegisterPage/RegisterPage.js";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import AddProduct from "./Pages/Add ProductPage/AddProduct"
import AddCustomer from "./Pages/Add Customer/AddCustomer"



function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/addproduct" component={Auth(AddProduct, true)} />
          <Route exact path="/addcustomer" component={Auth(AddCustomer, true)}/>
         
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;