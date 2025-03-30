import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../ContractABI.json";

const contractAddress = "0x357EAFa5ee93C33219140CF55338757e1A7cA7B8";

function MarkDrugAsCounterfeit() {
  const [drugId, setDrugId] = useState("");
  const [status, setStatus] = useState("");

  // Function to mark a drug as counterfeit
  const markDrugAsCounterfeit = async (drugId) => {
    if (!window.ethereum) {
      setStatus("Ethereum provider not found. Install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const accounts = await provider.listAccounts();
      const manufacturerAddress = accounts[0];

      setStatus("Transaction in progress...");
      const tx = await contract.markAsCounterfeit(drugId);
      await tx.wait();

      setStatus(`Drug ${drugId} has been marked as counterfeit. Transaction hash: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setDrugId(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (drugId.trim()) {
      markDrugAsCounterfeit(drugId);
    } else {
      setStatus("Please enter a valid Drug ID.");
    }
  };

  return (
    <div>
      <h1>Mark Drug as Counterfeit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          color="Blue"
          value={drugId}
          onChange={handleInputChange}
          placeholder="Enter Drug ID"
        />
        <button type="submit">Mark as Counterfeit</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default MarkDrugAsCounterfeit;

