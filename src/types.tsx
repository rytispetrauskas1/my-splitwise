export type Expense = {
  id: number;
  type: string;
  description: string;
  amount: number;
  timestamp: string;
  groupId: number;
  userId: number;
  // split: Split[];
};

// export type Split = {
//   userId: number;
//   portion: number;
// };

export type Group = {
  id: number;
  name: string;
  timestamp: string;
  users: number[];
};

export type Category = {
  id: number;
  name: string;
  timestamp: string;
};

export type User = {
  id: number;
  username: string;
};
