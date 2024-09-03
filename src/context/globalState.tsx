import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Category, Expense, Group, User } from "../types";

const defaultCategories = [
  { id: 1, name: "Food", timestamp: new Date().toISOString() },
  { id: 2, name: "Transport", timestamp: new Date().toISOString() },
  { id: 3, name: "Entertainment", timestamp: new Date().toISOString() },
  { id: 4, name: "Groceries", timestamp: new Date().toISOString() },
  { id: 5, name: "Utilities", timestamp: new Date().toISOString() },
];

type GlobalState = {
  groups: Group[];
  expenses: Expense[];
  categories: Category[];
  currentUser: User | null;
};

type Action =
  | { type: "ADD_GROUP"; payload: Group }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "UPDATE_EXPENSE"; payload: Expense }
  | { type: "SET_CURRENT_USER"; payload: User }
  | { type: "ADD_CATEGORY"; payload: Category };

const loadStateFromLocalStorage = (): GlobalState => {
  const storedGroups = localStorage.getItem("groups");
  const storedExpenses = localStorage.getItem("expenses");
  const storedCategories = localStorage.getItem("categories");
  const storedCurrentUser = localStorage.getItem("currentUser");

  return {
    groups: storedGroups ? JSON.parse(storedGroups) : [],
    expenses: storedExpenses ? JSON.parse(storedExpenses) : [],
    categories: storedCategories
      ? JSON.parse(storedCategories)
      : defaultCategories,
    currentUser: storedCurrentUser ? JSON.parse(storedCurrentUser) : null,
  };
};

const initialState: GlobalState = loadStateFromLocalStorage();

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "ADD_GROUP":
      localStorage.setItem(
        "groups",
        JSON.stringify([...state.groups, action.payload])
      );
      return { ...state, groups: [...state.groups, action.payload] };
    case "ADD_EXPENSE":
      localStorage.setItem(
        "expenses",
        JSON.stringify([...state.expenses, action.payload])
      );
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "ADD_CATEGORY":
      localStorage.setItem(
        "categories",
        JSON.stringify([...state.categories, action.payload])
      );
      return { ...state, categories: [...state.categories, action.payload] };
    case "SET_CURRENT_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

// Action Creators
export const updateExpense = (expense: Expense) => ({
  type: "UPDATE_EXPENSE",
  payload: expense,
});

export const setCurrentUser = (user: User) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
