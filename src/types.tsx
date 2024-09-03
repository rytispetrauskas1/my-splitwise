export type Expense = {
  id: number;
  type: string;
  description: string;
  amount: number;
  timestamp: string;
  groupId: number;
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

// src/types/User.ts

export type User = {
  id: number;
  username: string;
};
