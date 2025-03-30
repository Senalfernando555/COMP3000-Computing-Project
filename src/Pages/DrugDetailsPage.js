import React, { useState } from "react";
import { ethers } from "ethers"; 
import contractABI from "../ContractABI.json";


const contractAddress = "0x357EAFa5ee93C33219140CF55338757e1A7cA7B8"; 

function DrugDetailsPage() {
  const [drugId, setDrugId] = useState("");
  const [drugDetails, setDrugDetails] = useState(null);

  const getDrugDetails = async () => {
    try {
      // Connect to the Ethereum provider (MetaMask or another wallet)
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
    <div>
      <h2>Drug Details</h2>
      <div>
        <input
          type="text"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
        />
        <button onClick={getDrugDetails}>Get Drug Details</button>
      </div>
      {drugDetails && (
        <div>
          <p>Name: {drugDetails[0]}</p>
          <p>Manufacturer: {drugDetails[1]}</p>
          Manufacture Date:{" "}
          {new Date(Number(drugDetails[2]) * 1000).toLocaleDateString()}
          Expiry Date:{" "}
          {new Date(Number(drugDetails[2]) * 1000).toLocaleDateString()}
          <p>Current Owner: {drugDetails[4]}</p>
          <p>Authenticity: {drugDetails[5] ? "Authentic" : "Counterfeit"}</p>
        </div>
      )}
    </div>
  );
}

export default DrugDetailsPage;

