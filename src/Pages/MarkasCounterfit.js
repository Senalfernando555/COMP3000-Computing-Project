import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../ContractABI.json";
import "../Styles/MarkasCounterfeit.css";   

const contractAddress = "0x3bE619f7c833829c6EE58126aEA57450370AC40E";

function MarkDrugAsCounterfeit() {
  const [drugId, setDrugId] = useState("");
  const [status, setStatus] = useState("");

  const markDrugAsCounterfeit = async (drugId) => {
    if (!window.ethereum) {
      setStatus("Ethereum provider not found. Install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setStatus("Transaction in progress...");
      const tx = await contract.markAsCounterfeit(drugId);
      await tx.wait();
      setStatus(`success|Drug ${drugId} marked counterfeit`);
    } catch (error) {
      setStatus(`error|${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (drugId.trim()) {
      markDrugAsCounterfeit(drugId);
    } else {
      setStatus("error|Please enter a valid Drug ID.");
    }
  };

  // split status into flag and message
  const [flag, message] = status.split("|");

  return (
    <>
    <div className="mark-drug-page">
                <div className="header">
                    <p>Please make sure you enter your valid drug details. 
                       Ensure all information is accurate before submitting.</p>
                </div>
    </div>
    <div className="counterfeit-card">
      <h1>Mark Drug as Counterfeit</h1>
      <form className="counterfeit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          placeholder="Enter Drug ID"
        />
        <button type="submit">Mark Counterfeit</button>
      </form>
      {message && (
        <p
          className={`counterfeit-status ${
            flag === "success" ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  </>
  );
}

export default MarkDrugAsCounterfeit;

