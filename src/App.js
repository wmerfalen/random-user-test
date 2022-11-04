import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/members" element={<Members />} />
        <Route path="/profile/:memberId" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
