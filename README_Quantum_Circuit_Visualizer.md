# 🧠 Quantum Circuit Visualizer

A **web-based quantum circuit visualization tool** built with **HTML, JavaScript, and QuTiP** (Quantum Toolbox in Python).  
This project provides an intuitive interface for designing, simulating, and rendering quantum circuits — bridging the gap between quantum algorithms and their visual representation.

---

## 🚀 Overview

The **Quantum Circuit Visualizer** enables users to construct quantum circuits interactively and visualize them in a clear, layered format.  
It leverages **QuTiP** as the computational backend for circuit construction and rendering, ensuring physically accurate representations of gates and states.

Key features include:  
- Interactive **circuit design interface** with drag-and-drop gate placement.  
- Backend integration with **QuTiP** for gate modeling and matrix-based simulation.  
- Circuit visualization in **SVG/PNG/JPG** formats for easy export and sharing.  
- Support for general **single- and multi-qubit gates**, including standard universal gate sets.  
- **Responsive and minimal UI**, optimized for both browser and local use.

---

## 🎯 Project Motivation

Quantum computing is a rapidly evolving field, but understanding and visualizing circuits can be challenging for beginners and researchers alike.  
This project aims to **simplify quantum circuit visualization** by providing an accessible web interface backed by reliable quantum simulation tools like QuTiP.  
It is designed to serve as both an **educational aid** and a **lightweight research tool** for exploring gate-level operations and their effects on quantum states.

---

## ⚙️ Features

- 🧩 **Custom Quantum Circuits:** Build circuits with any combination of standard gates.  
- 🔍 **Live Visualization:** Render the circuit structure instantly on demand.  
- 💾 **Download Option:** Export circuit images in `.png` or `.jpg`.  
- 🧮 **Backend Simulation:** Uses QuTiP for generating accurate matrix and circuit models.  
- 🧠 **Scalable Design:** Easily extendable for multi-qubit and multi-layered operations.  

---

## 🧰 Tech Stack

| Component | Technology |
|------------|-------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Python (Flask / QuTiP) |
| **Visualization** | QuTiP Circuit Plotter |
| **Output Formats** | PNG / JPG |

---

## 🧑‍💻 Getting Started

### Prerequisites
Make sure you have the following installed:  
- Python 3.8+  
- [QuTiP](https://qutip.org/)  
- Flask (for backend server)  

```bash
pip install qutip flask
```

### Running the App
1. Clone the repository:  
   ```bash
   git clone https://github.com/Bidipta-Saha-08/Quantum_circuit_visualiser.git
   cd Quantum_circuit_visualiser
   ```
2. Start the backend server:  
   ```bash
   python app.py
   ```
3. Open the HTML interface in your browser:  
   ```
   http://localhost:5000
   ```

---

## 📊 Example

Example circuit rendered using QuTiP backend:  

```
Qubit 0 ──H──●──X──┤M├  
              │  
Qubit 1 ──────⊕────┤M├  
```

Export options allow saving this visualization as PNG or JPG.

---

## 🧩 Future Extensions

- Integration with **Quantum Dynamics module** (time evolution of qubits).  
- Support for **gate animation** and **statevector visualization**.  
- Multi-qubit entanglement visualization on the Bloch sphere.  

---

## 📚 References

- [QuTiP Documentation](https://qutip.org/index.html)  
- [QuTiP Circuit Tutorials](https://nbviewer.org/urls/qutip.org/qutip-tutorials/tutorials-v5/quantum-circuits/matrenderer-plot.ipynb)  
