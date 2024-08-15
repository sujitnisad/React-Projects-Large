import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Vendor from "./Components/Vendor/Vendor";
import Queries from "./Components/Queries/Queries";
import Log from "./Components/Log/Log";
function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Vendor" element={<Vendor />} />
        <Route path="/Queries" element={<Queries />} />
        <Route path="/Log" element={<Log />} />
      </Routes>
    </div>
  );
}

export default App;
