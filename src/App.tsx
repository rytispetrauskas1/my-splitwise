import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import GroupExpenses from "./pages/ExpenseGroup";
import LoginPage from "./pages/LoginPage";
import { useGlobalState } from "./context/globalState";
import Header from "components/header/Header";
import "./App.css";

const App: React.FC = () => {
  const { currentUser } = useGlobalState().state;
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/summary"
            element={currentUser ? <SummaryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/group/:groupId"
            element={currentUser ? <GroupExpenses /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
