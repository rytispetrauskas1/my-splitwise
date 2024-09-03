import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Category, Expense, Group } from "../types";

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
};

type Action =
  | { type: "ADD_GROUP"; payload: Group }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "UPDATE_EXPENSE"; payload: Expense }
  | { type: "ADD_CATEGORY"; payload: Category };

const loadStateFromLocalStorage = (): GlobalState => {
  const storedGroups = localStorage.getItem("groups");
  const storedExpenses = localStorage.getItem("expenses");
  const storedCategories = localStorage.getItem("categories");

  return {
    groups: storedGroups ? JSON.parse(storedGroups) : [],
    expenses: storedExpenses ? JSON.parse(storedExpenses) : [],
    categories: storedCategories
      ? JSON.parse(storedCategories)
      : defaultCategories,
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
      return { ...state, groups: [...state.groups, action.payload] };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(state.groups));
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("categories", JSON.stringify(state.categories));
  }, [state.groups, state.expenses, state.categories]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
