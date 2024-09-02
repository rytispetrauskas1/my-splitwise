import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SummaryPage from "./pages/SummaryPage";
import { Expense } from "./types";

const defaultCategories = [
  "Food",
  "Transport",
  "Entertainment",
  "Groceries",
  "Utilities",
];

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    JSON.parse(localStorage.getItem("expenses") || "[]")
  );

  const [categories, setCategories] = useState<string[]>(() =>
    JSON.parse(
      localStorage.getItem("categories") || JSON.stringify(defaultCategories)
    )
  );

  // Save expenses and categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              expenses={expenses}
              setExpenses={setExpenses}
              categories={categories}
              setCategories={setCategories}
            />
          }
        />
        <Route path="/summary" element={<SummaryPage expenses={expenses} />} />
      </Routes>
    </Router>
  );
};

export default App;
