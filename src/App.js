import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RegisterDrugPage from "./Pages/RegisterDrugPage";
import VerifyDrugPage from "./Pages/VerifyDrugPage";
import DrugDetailsPage from "./Pages/DrugDetailsPage";
import MarkDrugAsCounterfeit from "./Pages/MarkasCounterfit"
import Header from "./Components/Header";
import DrugList from "./Pages/DrugList";
import Footer from "./Components/Footer";
import "./App.css";
//import ConnectWallet from "./Connectwallet";

function App() {
  return (
    <div className="App">
    <Router>
      <Header />
      <Routes className="content">
        <Route path="/" element={<Home />} />  
        <Route path="/register-drug" element={<RegisterDrugPage />} />
        <Route path="/verify-drug" element={<VerifyDrugPage />} />
        <Route path="/drug-details" element={<DrugDetailsPage />} />
        <Route path="/mark-counterfit" element={<MarkDrugAsCounterfeit/>} />
        <Route path="/drug-list" element={<DrugList />} />
        {/* <Route path="/connect-wallet" element={<ConnectWallet />} /> */}
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
