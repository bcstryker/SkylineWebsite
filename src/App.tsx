import { Route, Routes } from "react-router-dom";
import Skyline from "./Pages/Skyline";
import Skyline1 from "./Pages/Skyline1";
import Zoomies from "./Pages/Test";
import Catalog from "./Pages/Catalog";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Skyline />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/skyline1" element={<Skyline1 />} />
        <Route path="/test" element={<Zoomies />} />
      </Routes>
    </>
  );
}
