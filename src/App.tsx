import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import GroupExpenses from "./pages/ExpenseGroup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/group/:groupId" element={<GroupExpenses />} />
      </Routes>
    </Router>
  );
};

export default App;
