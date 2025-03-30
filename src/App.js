import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import RegisterDrugPage from "./Pages/RegisterDrugPage";
import TransferOwnershipPage from "./Pages/TransferOwnershipPage";
import VerifyDrugPage from "./Pages/VerifyDrugPage";
import DrugDetailsPage from "./Pages/DrugDetailsPage";
import MarkDrugAsCounterfeit from "./Pages/MarkasCounterfit"
import Header from "./Components/Header";
//import ConnectWallet from "./Connectwallet";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/register-drug" element={<RegisterDrugPage />} />
        <Route path="/transfer-ownership" element={<TransferOwnershipPage />} />
        <Route path="/verify-drug" element={<VerifyDrugPage />} />
        <Route path="/drug-details" element={<DrugDetailsPage />} />
        <Route path="/mark-counterfit" element={<MarkDrugAsCounterfeit/>} />
        {/* <Route path="/connect-wallet" element={<ConnectWallet />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
