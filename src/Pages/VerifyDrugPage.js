import React, { useState } from "react";
import { ethers } from "ethers"; 
import contractABI from "../ContractABI.json";

const contractAddress = "0x357EAFa5ee93C33219140CF55338757e1A7cA7B8"; 

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
    <div>
      <h2>Verify Drug</h2>
      <div>
        <input
          type="text"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
        />
        <button onClick={verifyDrug}>Verify Drug</button>
      </div>
      {isAuthentic !== null && (
        <div>
          <p>{isAuthentic ? "This drug is authentic." : "This drug is counterfeit."}</p>
        </div>
      )}
    </div>
  );
}

export default VerifyDrugPage;