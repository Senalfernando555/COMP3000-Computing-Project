
import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "../ContractABI.json";
import "../Styles/RegisterDrugPage.css";

const contractAddress = "0x3bE619f7c833829c6EE58126aEA57450370AC40E";

function RegisterDrugPage() {
    const [drugId, setDrugId] = useState("");
    const [name, setName] = useState("");
    const [manufactureDate, setManufactureDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");

    // Connect to MetaMask
    const connectToEthereum = async () => {
        if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const account = await signer.getAddress();
            setCurrentAccount(account);
        } else {
            alert("Please install MetaMask to interact with this app.");
        }
    };

    // Register Drug Function
    const registerDrug = async () => {
        if (!currentAccount) {
            await connectToEthereum();
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(contractAddress, contractABI, signer);

        try {
            const tx = await contract.registerDrug(
                drugId,
                name,
                Math.floor(new Date(manufactureDate).getTime() / 1000),
                Math.floor(new Date(expiryDate).getTime() / 1000)
            );
            await tx.wait();
            alert("Drug registered successfully!");
        } catch (error) {
            alert("Error registering drug: " + error.message);
            console.error(error);
        }
    };

    return (       
        <>
            <div className="register-drug-page">
                <div className="header">
                    <p>Please make sure you enter your valid drug details. 
                       Ensure all information is accurate before submitting.</p>
                </div>
            </div>
            <div className="register-container">
                <h2>Register Drug</h2>
                <div className="register-form">
                    <input type="text" placeholder="Drug ID" value={drugId} onChange={(e) => setDrugId(e.target.value)} />
                    <input type="text" placeholder="Drug Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <p>Enter Manufacture Date</p>
                    <input type="date" placeholder="Manufacture Date" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} />
                    <p>Enter Expiry Date</p>
                    <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <br />
                    <button onClick={registerDrug}>Register Drug</button>
                </div>
            </div>
        </>
    );
}

export default RegisterDrugPage;


