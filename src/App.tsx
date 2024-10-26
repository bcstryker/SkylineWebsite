import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Skyline";
import Catalog from "./Pages/Catalog";
import "./App.css";
import Services from "./Pages/Services";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}
