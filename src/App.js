// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Router, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Pages/Home";
// import RegisterDrugPage from "./Pages/RegisterDrugPage";
// import VerifyDrugPage from "./Pages/VerifyDrugPage";
// import DrugDetailsPage from "./Pages/DrugDetailsPage";
// import MarkDrugAsCounterfeit from "./Pages/MarkasCounterfit";
// import DrugList from "./Pages/DrugList";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import Login from "./Firebase/login";
// import Register from "./Firebase/register";
// import Profile from "./Firebase/profile";
// import { auth } from "./Firebase/firebase";

// import "./App.css";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
//     return unsubscribe;
//   }, []);

//       return (
//         <BrowserRouter>
//           <Header />
//           <Routes className="content">
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/home" element={<Home />} />  
//             <Route path="/register-drug" element={<RegisterDrugPage />} />
//             <Route path="/verify-drug" element={<VerifyDrugPage />} />
//             <Route path="/drug-details" element={<DrugDetailsPage />} />
//             <Route path="/mark-counterfit" element={<MarkDrugAsCounterfeit/>} />
//             <Route path="/drug-list" element={<DrugList />} />
//             {/* <Route path="/connect-wallet" element={<ConnectWallet />} /> */}
//           </Routes>
//           <Footer/>
//         </BrowserRouter>
//       );
//   }

//     export default App;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Login               from "./Firebase/login";
import Register            from "./Firebase/register";
import Profile             from "./Firebase/profile";
import Home                from "./Pages/Home";
import RegisterDrugPage    from "./Pages/RegisterDrugPage";
import VerifyDrugPage      from "./Pages/VerifyDrugPage";
import DrugDetailsPage     from "./Pages/DrugDetailsPage";
import MarkDrugAsCounterfeit from "./Pages/MarkasCounterfit";
import DrugList            from "./Pages/DrugList";

function App() {
  return (
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  );
}

function PageLayout() {
  const { pathname } = useLocation();

  const hideOn = [ "/", "/register" ];
  const hideHeaderFooter = hideOn.includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <main className="content">
        <Routes>
          <Route path="/"               element={<Login />} />
          <Route path="/register"       element={<Register />} />
          <Route path="/profile"        element={<Profile />} />
          <Route path="/home"           element={<Home />} />
          <Route path="/register-drug"  element={<RegisterDrugPage />} />
          <Route path="/verify-drug"    element={<VerifyDrugPage />} />
          <Route path="/drug-details"   element={<DrugDetailsPage />} />
          <Route path="/mark-counterfit" element={<MarkDrugAsCounterfeit />}/>
          <Route path="/drug-list"      element={<DrugList />} />
        </Routes>
      </main>

      {/* only render Footer when we’re not on login or register */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
