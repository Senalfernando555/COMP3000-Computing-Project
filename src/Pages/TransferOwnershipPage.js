import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../ContractABI.json";


const contractAddress = "0x357EAFa5ee93C33219140CF55338757e1A7cA7B8"; 

function TransferOwnershipPage() {
  const [drugId, setDrugId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectToEthereum = async () => {
    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
      setCurrentAccount(account);
    } else {
      alert("Please install MetaMask to interact with this app.");
    }
  };

  const transferOwnership = async () => {
    if (!currentAccount) {
      await connectToEthereum();
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try{
        let recipientAddress = newOwner;
        if(newOwner.endsWith(".eth")){
            recipientAddress = await provider.resolveName(newOwner);
            if(recipientAddress){
                alert(recipientAddress + " Valid ENS name");
            } else {
                alert("Invalid ENS name");
                return;
            }
    }
    } catch (error) {
        alert("Error resolving ENS name: " + error.message);
        console.error(error);
        return; 
    }
    
    try {
      const tx = await contract.transferOwnership(drugId, newOwner);
      await tx.wait();
      alert("Ownership transferred successfully!");
    } catch (error) {
      alert("Error transferring ownership: " + error.message);
      console.error(error);
    }
  };
  
  return (
    <div>
      <h2>Transfer Ownership</h2>
      <div>
        <input
          type="text"
          placeholder="Drug ID"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Owner Address"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
        />
        <button onClick={transferOwnership}>Transfer Ownership</button>
      </div>
    </div>
  );
}

export default TransferOwnershipPage;