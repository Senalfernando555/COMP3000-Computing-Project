import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "../ContractABI.json";
import "../Styles/DrugList.css";

const CONTRACT_ADDRESS = "0x3bE619f7c833829c6EE58126aEA57450370AC40E";

export default function DrugList() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  async function init() {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const { chainId } = await provider.getNetwork();
      console.log("Chain ID:", chainId);
      const chainIdNum = Number(chainId);  
      if (chainIdNum !== 11155111){
        throw new Error("Please switch MetaMask to Sepolia (chainId 11155111)");
     }

      const code = await provider.getCode(CONTRACT_ADDRESS);
      console.log("Bytecode at address:", code);
      if (code === "0x") {
        throw new Error(`No contract found at address ${CONTRACT_ADDRESS}`);
      }

      const signer   = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Confirm ABI includes getAllDrugIds
      if (typeof contract.getAllDrugIds !== "function") {
        throw new Error("ABI does not include getAllDrugIds()");
      }

      const ids = await contract.getAllDrugIds();                
      const details = await Promise.all(ids.map(async (id) => {
        const [ name, manufacturer, mfgTs, expTs, owner, authentic ] =
          await contract.getDrugDetails(id);

        return {
          id,
          name,
          manufacturer,
          manufactureDate: new Date(Number(mfgTs) * 1000)
                              .toLocaleDateString(),
          expiryDate:      new Date(Number(expTs) * 1000)
                              .toLocaleDateString(),
          owner,
          authentic
        };
      }));

      setDrugs(details);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (loading) return <p>Loading drugs…</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div class="table-responsive clearfix">
  <table class="floating-table">
    <thead>
      <tr>
        <th>Drug ID</th><th>Name</th><th>Manufacturer</th>
        <th>Manufacture Date</th><th>Expiry Date</th>
        <th>Current Owner</th><th>Authentic?</th>
      </tr>
    </thead>
    <tbody>
      {drugs.map((d) => (
        <tr key={d.id}>
          <td>{d.id}</td>
          <td>{d.name}</td>
          <td>{d.manufacturer}</td>
          <td>{d.manufactureDate}</td>
          <td>{d.expiryDate}</td>
          <td>{d.owner}</td>
          <td>{d.authentic ? "Yes" : "No"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}
