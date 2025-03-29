from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import numpy as np
from pydantic import BaseModel
import qutip
from qutip_qip.circuit import QubitCircuit
import asyncio
import os
import matplotlib
import matplotlib.pyplot as plt
from qutip import Bloch, about, basis, mesolve, sigmam, sigmax, sigmay, sigmaz
import uuid  # Import the uuid module

# Fix: Use a non-GUI backend
matplotlib.use("Agg")  # Prevents GUI-related issues

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure 'static' directory exists
STATIC_DIR = "static"
os.makedirs(STATIC_DIR, exist_ok=True)

# Serve static images
app.mount("/static", StaticFiles(directory="static"), name="static")

# Pydantic model for request validation
class Gate(BaseModel):
    name: str
    qubits: list[int]

class CircuitRequest(BaseModel):
    qubit_no: int
    gates: list[Gate]
    
@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "Hello, World!"}

@app.post("/circuit")
async def get_circuit_image(request: CircuitRequest):
    """Generate a quantum circuit image based on received gates and return its URL."""
    try:
        unique_id = uuid.uuid4()  # Generate a unique identifier
        image_path = f"{STATIC_DIR}/circuit_{unique_id}.png"
        qc = QubitCircuit(request.qubit_no, num_cbits=1)

        for gate in request.gates:
            if gate.name == "H":
                qc.add_gate("H", targets=gate.qubits[0])
            elif gate.name == "X":
                qc.add_gate("X", targets=gate.qubits[0])
            elif gate.name == "Y":
                qc.add_gate("Y", targets=gate.qubits[0])
            elif gate.name == "Z":
                qc.add_gate("Z", targets=gate.qubits[0])
            elif gate.name == "CNOT" and len(gate.qubits) >= 2:
                qc.add_gate("CNOT", controls=gate.qubits[1], targets=gate.qubits[0])
            elif gate.name == "Toffoli" and len(gate.qubits) >= 3:
                qc.add_gate("Toffoli", controls=gate.qubits[1:], targets=gate.qubits[0])
            elif gate.name == "SWAP" and len(gate.qubits) == 2:
                qc.add_gate("SWAP", targets=gate.qubits)
            elif gate.name == "ISWAP" and len(gate.qubits) == 2:
                qc.add_gate("ISWAP", targets=gate.qubits)
            elif gate.name == "M0" and len(gate.qubits) > 0:
                qc.add_measurement(targets=gate.qubits[0], classical_store=0)

        # Save the circuit image asynchronously
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, lambda: qc.draw(file_path=image_path, file_type="png", save=True))

        # Return the static image URL
        return JSONResponse({"image_url": f"https://quantum-circuit-visualiser.onrender.com/{image_path}"})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
    
@app.get("/download/{file_name}")
def download_file(file_name: str):
    file_path = f"static/{file_name}"
    return FileResponse(file_path, media_type='application/octet-stream', filename=file_name)

@app.post("/dynamics")
async def get_dynamics_image(request: dict):
    try:
        unique_id = uuid.uuid4()  # Generate a unique identifier
        image_path = f"{STATIC_DIR}/dynamics_{unique_id}.png"
        # coefficients
        delta = request["delta"]
        beta = request["beta"]

        # hamiltonian
        H = delta / 2.0 * sigmax()

        # list of collapse operators
        c_ops = [np.sqrt(beta) * sigmaz()]

        # initial state
        psi0 = basis(2, 0)

        # times
        tlist = np.linspace(0, 5, 100)

        res = mesolve(H, psi0, tlist, c_ops, [sigmaz()])

        sz_analytic = np.cos(2 * np.pi * tlist) * np.exp(-tlist * beta)

        plt.scatter(tlist, res.expect[0], c="r", marker="x", label="mesolve")
        plt.plot(tlist, sz_analytic, label="Analytic")
        plt.xlabel("Time"), plt.ylabel("<sigma_z>")
        plt.legend()
        plt.savefig(image_path)
        plt.close()

        # Return the static image URL
        return JSONResponse({"image_url": f"https://quantum-circuit-visualiser.onrender.com/{image_path}"})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)