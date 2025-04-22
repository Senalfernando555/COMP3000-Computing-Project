import React, { useState } from "react";
import { ethers } from "ethers"; 
import contractABI from "../ContractABI.json";
import "../Styles/VerifyDrug.css";

const contractAddress = "0x3bE619f7c833829c6EE58126aEA57450370AC40E"; 

function VerifyDrugPage() {
  const [drugId, setDrugId] = useState("");
  const [isAuthentic, setIsAuthentic] = useState(null);

  const verifyDrug = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const authenticity = await contract.verifyDrug(drugId);
      setIsAuthentic(authenticity);
    } catch (error) {
      alert("Error verifying drug: " + error.message);
    }
  };

  return (
    <>
    <div className="verify-drug-page">
                <div className="header">
                    <p>Please make sure you enter your valid drug details. 
                       Ensure all information is accurate before submitting.</p>
                </div>
    </div>
    <div className="verify-card">
      <h2 className="verify-title">Verify Drug</h2>
      <div className="verify-form">
        <input
          className="verify-input"
          type="text"
          placeholder="Enter Drug ID"
          value={drugId}
          onChange={e => setDrugId(e.target.value)}
        />
        <button className="verify-button" onClick={verifyDrug}>
          Verify
        </button>
      </div>
      {isAuthentic !== null && (
        <div
          className={
            isAuthentic 
              ? "verify-result verify-success" 
              : "verify-result verify-fail"
          }
        >
          {isAuthentic 
            ? "✅ This drug is authentic." 
            : "❌ This drug is counterfeit."}
        </div>
      )}
    </div>
  </>
  );
}

export default VerifyDrugPage;