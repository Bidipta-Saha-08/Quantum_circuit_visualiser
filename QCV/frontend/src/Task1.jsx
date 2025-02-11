import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';

function Task1() {
    const [qubitNumber, setQubitNumber] = useState("");
    const [gate, setGate] = useState("H");
    const [layers, setLayers] = useState([]);
    const [circuitImage, setCircuitImage] = useState("");
    const [controlQubit1, setControlQubit1] = useState(0);
    const [controlQubit2, setControlQubit2] = useState(0);
    const [targetQubit, setTargetQubit] = useState(0);
  
    const handleQubitChange = (e) => {
      setQubitNumber(e.target.value);
    };
  
    const updateInputs = (e) => {
      setGate(e.target.value);
    };
  
    const addLayer = () => {
      if (!qubitNumber || qubitNumber < 1) {
        alert("Please enter a valid number of qubits.");
        return;
      }
  
      let newGate = { name: gate, qubits: [] };
  
      if (gate === "Toffoli") {
        newGate.qubits = [
          parseInt(targetQubit),
          parseInt(controlQubit1),
          parseInt(controlQubit2),
        ];
      } else if (["CNOT", "Swap", "ISWAP"].includes(gate)) {
        newGate.qubits = [parseInt(targetQubit), parseInt(controlQubit1)];
      } else {
        newGate.qubits = [parseInt(targetQubit)];
      }
  
      setLayers([...layers, newGate]);
    };
  
    const viewCircuit = async () => {
      if (!qubitNumber || qubitNumber < 1) {
        alert("Please enter a valid number of qubits.");
        return;
      }
  
      const requestBody = {
        qubit_no: parseInt(qubitNumber),
        gates: layers,
      };
  
      console.log(requestBody);
  
      try {
        const response = await fetch("http://localhost:8000/circuit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        if (data.image_url) {
          setCircuitImage(data.image_url);
        } else {
          alert("Error: No image URL received.");
        }
      } catch (error) {
        console.error("Error fetching circuit image:", error);
        alert("Failed to load the circuit image.");
      }
    };
  
    const downloadImage = () => {
      if (!circuitImage) {
        alert("No image to download!");
        return;
      }
      
      const newUrl = circuitImage.replace("/static/", "/download/");
      console.log(newUrl);
      console.log(circuitImage);
      window.location.href = newUrl;
    };
  
    const resetEverything = () => {
      setQubitNumber("");
      setGate("H");
      setLayers([]);
      setCircuitImage("");
      setControlQubit1(0);
      setControlQubit2(0);
      setTargetQubit(0);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <Link
            to="/task2"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Task2
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-6">Quantum Circuit Builder</h2>
  
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border">
          <div className="mb-4">
            <label className="block text-sm font-medium">Qubit Number:</label>
            <input
              type="number"
              min="1"
              value={qubitNumber}
              onChange={handleQubitChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium">Choose Gate:</label>
            <select
              value={gate}
              onChange={updateInputs}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="H">Hadamard (H)</option>
              <option value="X">Pauli-X (X)</option>
              <option value="Y">Pauli-Y (Y)</option>
              <option value="Z">Pauli-Z (Z)</option>
              <option value="CNOT">CNOT</option>
              <option value="Toffoli">Toffoli</option>
              <option value="Swap">SWAP</option>
              <option value="ISWAP">ISWAP</option>
              <option value="M0">M0</option>
            </select>
          </div>
  
          {["CNOT", "Swap", "ISWAP", "Toffoli"].includes(gate) && (
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Control Qubit 1:
              </label>
              <input
                type="number"
                min="0"
                max={qubitNumber - 1}
                value={controlQubit1}
                onChange={(e) => setControlQubit1(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
  
          {gate === "Toffoli" && (
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Control Qubit 2:
              </label>
              <input
                type="number"
                min="0"
                max={qubitNumber - 1}
                value={controlQubit2}
                onChange={(e) => setControlQubit2(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
  
          <div className="mb-4">
            <label className="block text-sm font-medium">Target Qubit:</label>
            <input
              type="number"
              min="0"
              max={qubitNumber - 1}
              value={targetQubit}
              onChange={(e) => setTargetQubit(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div className="flex space-x-4">
            <button
              onClick={addLayer}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Add Layer
            </button>
            <button
              onClick={viewCircuit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
            >
              View Circuit
            </button>
          </div>
        </div>
  
        <h3 className="text-2xl font-semibold mt-6">Quantum Circuit Layers:</h3>
        <ul className="bg-white p-4 mt-4 rounded-lg shadow-lg w-full max-w-lg border">
          {layers.length > 0 ? (
            layers.map((layer, index) => (
              <li
                key={index}
                className="py-2 border-b last:border-b-0 border-gray-300"
              >
                <strong>{layer.name}</strong> - Qubits: [{layer.qubits.join(", ")}
                ]
              </li>
            ))
          ) : (
            <p className="text-gray-500">No layers added yet.</p>
          )}
        </ul>
  
        <h3 className="text-2xl font-semibold mt-6">Generated Circuit:</h3>
        {circuitImage ? (
          <div className="flex flex-col items-center">
            <img
              src={circuitImage}
              alt="Quantum Circuit"
              className="mt-4 rounded-lg shadow-lg border border-gray-300"
            />
            <button
              onClick={downloadImage}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition"
            >
              Download Image
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No circuit generated yet.</p>
        )}
  
        <button
          onClick={resetEverything}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Reset
        </button>
      </div>
    );
}

export default Task1