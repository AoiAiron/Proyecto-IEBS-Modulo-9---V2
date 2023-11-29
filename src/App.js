
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import FundHubABI from './FundHubABI.json';

function App() {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        // Modern DApp browsers
        const newWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(newWeb3);
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        // Legacy DApp browsers
        const newWeb3 = new Web3(window.web3.currentProvider);
        setWeb3(newWeb3);
      } else {
        console.error('No Ethereum browser detected');
      }
    };
  
    initWeb3();
  }, []);

  const [fundHubContract, setFundHubContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      if (web3) {
        const contractAddress = '0xa89946eDf63eA59435E0498C6Aff8A8FA7AeacBe';  // Replace with your deployed contract address
        const newFundHubContract = new web3.eth.Contract(FundHubABI, contractAddress);
        setFundHubContract(newFundHubContract);
      }
    };
  
    initContract();
  }, [web3]);

  const handleCreateCampaign = async () => {
    try {
      // Get values from input fields
      const cause = document.getElementById('Campaign_Name-Input').value;
      const beneficiaryAddress = document.getElementById('Campaign_Address-Input').value;
      const campaignDuration = parseInt(document.getElementById('Campaign_Duration-Input').value);
  
      // Get the user's Ethereum accounts
      const accounts = await web3.eth.getAccounts();
  
      // Call the crearCampana function on the smart contract
      await fundHubContract.methods.crearCampana(cause, beneficiaryAddress, campaignDuration).send({ from: accounts[0] });
  
      // Optionally, you can update the UI or show a success message
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  //Code

  return (
    <div className="App" style={{ backgroundColor: '#1464a5', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <header className="App-header">
        <h1 style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>IEBS - DApp</h1>
        <h2 style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>FundHub</h2>
          <p style={{ color: '#fff', marginBottom: '30px', textAlign: 'center' }}>
            Crea campañas y realiza donaciones para apoyar diversas causas.
          </p>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {/* Left Column - Creation */}
        <section style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.8) 0px 0px 25px', borderRadius: '20px', padding: '30px', textAlign: 'left' }}>
          <h2 style={{ color: '#000', marginBottom: '20px' }}>Crear Campaña</h2>
          <p style={{ color: '#000', marginBottom: '10px' }}>Causa:</p>
          <input type="text" id="Campaign_Name-Input" name="Campaign_Name-Input" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }} />

          <p style={{ color: '#000', marginBottom: '10px' }}>Dirección del beneficiario:</p>
          <input type="text" id="Campaign_Address-Input" name="Campaign_Address-Input" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }} />

          <p style={{ color: '#000', marginBottom: '10px' }}>Duración de la campaña (días):</p>
          <input type="text" id="Campaign_Duration-Input" name="Campaign_Duration-Input" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }} />

          <button id="Creation-Button" onClick={handleCreateCampaign} style={{ backgroundColor: '#1464a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', width: '100%' }}>Crear campaña</button>
        </section>

        {/* Right Column - Donation */}
        <section style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.8) 0px 0px 25px', borderRadius: '20px', padding: '30px', textAlign: 'left' }}>
          <h2 style={{ color: '#000', marginBottom: '20px' }}>Realizar Donación</h2>

          <p style={{ color: '#000', marginBottom: '10px' }}>Cantidad de Donación (ETH):</p>
          <input type="text" id="Donation_Amount-Input" name="Donation_Amount-Input" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }} />

          <p style={{ color: '#000', marginBottom: '10px' }}>Seleccionar Campaña para Donación:</p>
          <select id="Campaign_Selector" name="Campaign_Selector" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
            {/* Add options for campaigns */}
            <option value="campaign1">Campaign 1</option>
            <option value="campaign2">Campaign 2</option>
          </select>

          <button id="Donation-Button" style={{ backgroundColor: '#1464a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', width: '100%' }}>Realizar donación</button>

          {/* Additional Text */}
          <p style={{ color: '#000', marginTop: '20px', fontWeight: 'bold' }}>Descripción de la Campaña Seleccionada:</p>
          <p id="Description-Label" style={{ color: '#000' }}>No ha seleccionado ninguna campaña.</p>
        </section>

        {/* New Section - Withdraw Funds */}
        <section style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.8) 0px 0px 25px', borderRadius: '20px', padding: '30px', textAlign: 'left' }}>
          <p style={{ color: '#000', marginBottom: '10px', fontWeight: 'bold' }}>Seleccionar Campaña para Retiro:</p>
          <select id="Campaign_Selector2" name="Campaign_Selector2" style={{ marginBottom: '20px', width: '100%', padding: '10px', boxSizing: 'border-box' }}>
            {/* Add options for campaigns */}
            <option value="campaign1">Campaign 1</option>
            <option value="campaign2">Campaign 2</option>
          </select>

          <button id="Withdraw-Button" style={{ backgroundColor: '#1464a5', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none', width: '100%' }}>Retirar Fondos</button>
        </section>
      </main>
    </div>
  );
}

//Functions




export default App;
