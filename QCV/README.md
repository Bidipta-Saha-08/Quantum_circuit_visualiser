# Project Setup Guide

## Prerequisites

1. **Install Node.js**  
   Download and install Node.js from [nodejs.org](https://nodejs.org).  
   Verify the installation by running:  
   ```sh
   node --version
   npm --version
   ```

2. **Unzip the Project**  
   - Extract the provided zip file into a folder.  
   - Open a terminal in the unzipped folder containing `frontend/`, `static/`, `main.py`, and `README.md`.

---

## Backend Setup

1. **Install Dependencies**  
   Run the following commands to install required Python packages:
   ```sh
   pip install numpy
   pip install matplotlib
   pip install fastapi
   pip install qutip
   pip install qutip-qip
   pip install uvicorn
   ```

2. **Start the Backend Server**  
   ```sh
   uvicorn main:app
   ```

---

## Frontend Setup
Do not close the backend server and open a new terminal for starting the frontend.

1. **Navigate to the `frontend` Folder**  
   ```sh
   cd frontend
   ```

2. **Install Dependencies**  
   ```sh
   npm i
   ```

3. **Start the Frontend**  
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the link shown in the terminal) to view the frontend.
