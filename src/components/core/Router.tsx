import { Routes, Route } from "react-router-dom";
import HomePage from "/src/pages/home";
import SecondaryPage from "/src/pages/secondary-page";

const Router = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/secondary-page" element={<SecondaryPage />} />
  </Routes>
)

export default Router