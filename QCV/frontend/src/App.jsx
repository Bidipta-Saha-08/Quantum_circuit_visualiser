import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task1 from "./Task1";
import Task2 from "./Task2";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/task1" element={<Task1/>} />
        <Route path="/task2" element={<Task2/>} />
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </Router>
  );
}

export default App;
