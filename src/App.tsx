import { Route, Routes } from "react-router-dom";
import Skyline from "./Pages/Landing";
import Catalog from "./Pages/Catalog";
import "./App.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Skyline />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
  );
}
