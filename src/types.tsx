export type Expense = {
  type: string;
  description: string;
  amount: number;
  timestamp: string;
};

export type Group = {
  id: number;
  name: string;
  timestamp: string;
};

export type Category = {
  id: number;
  name: string;
  timestamp: string;
};
