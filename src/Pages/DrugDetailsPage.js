import React, { useState } from "react";
import { ethers } from "ethers"; 
import contractABI from "../ContractABI.json";
import "../Styles/DrugDetails.css";


const contractAddress = "0x3bE619f7c833829c6EE58126aEA57450370AC40E"; 

function DrugDetailsPage() {
  const [drugId, setDrugId] = useState("");
  const [drugDetails, setDrugDetails] = useState(null);

  const getDrugDetails = async () => {
    try {
      
      // Connect to the Ethereum provider (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the getDrugDetails function from the contract
      const details = await contract.getDrugDetails(drugId);

      // If the drug details are fetched, set them to state
      if (details) {
        setDrugDetails(details);
        console.log("Drug Details:", details);
      } else {
        alert("Drug not found!");
      }
    } catch (error) {
      alert("Error fetching drug details: " + error.message);
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
    <div className="drug-details-page">
        <div className="header">
            <p>Please make sure you enter your valid drug details. 
               Ensure all information is accurate before submitting.</p>
        </div>
    </div>
    <div className="details-card">
      <h2 className="details-title">Drug Details</h2>

      <div className="details-form">
        <input
          className="details-input"
          type="text"
          placeholder="Enter Drug ID"
          value={drugId}
          onChange={e => setDrugId(e.target.value)}
        />
        <button
          className="details-button"
          onClick={getDrugDetails}
        >
          Fetch
        </button>
      </div>

      {drugDetails && (
        <div className="details-result">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{drugDetails[0]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Manufacturer:</span>
            <span className="detail-value">{drugDetails[1]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Manufacture Date:</span>
            <span className="detail-value">
              {new Date(Number(drugDetails[2]) * 1000)
                .toLocaleDateString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Expiry Date:</span>
            <span className="detail-value">
              {new Date(Number(drugDetails[3]) * 1000)
                .toLocaleDateString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Current Owner:</span>
            <span className="detail-value">{drugDetails[4]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Authenticity:</span>
            <span className={`detail-value ${drugDetails[5] ? 'auth-yes' : 'auth-no'}`}>
              {drugDetails[5] ? '✅ Authentic' : '❌ Counterfeit'}
            </span>
          </div>
        </div>
      )}
    </div>
  </>
  );
}

export default DrugDetailsPage;

