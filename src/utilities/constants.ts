export const expenseCategory = [
  {
    id: 1,
    categoryName: "Home",
    subCategory: [
      { id: 1, subCategoryName: "Other" },
      { id: 2, subCategoryName: "EMI" },
      { id: 3, subCategoryName: "Rent" },
    ],
  },
  {
    id: 2,
    categoryName: "Bills",
    subCategory: [
      { id: 1, subCategoryName: "Other" },
      { id: 2, subCategoryName: "Internet" },
      { id: 3, subCategoryName: "Mobile Recharge" },
      { id: 4, subCategoryName: "Light Bill" },
      { id: 5, subCategoryName: "Gas Bill" },
    ],
  },
  {
    id: 3,
    categoryName: "Other",
    subCategory: [{ id: 1, subCategoryName: "Other" }],
  },
];

export const expenseMode = [
  "Cash",
  "UPI",
  "Credit Card",
  "Bank Transfer",
  "Other",
];

export const expenseDetails = [
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
  { Title: "1, feb 2024", content: "demo" },
];

export const data = [
  {
    id: 1,
    date: new Date().toLocaleString("default", {
      month: "short",
      //   year: "numeric",
      day: "2-digit",
      weekday: "short",
    }),
    amount: "12,233",
    tableData: [
      {
        id: 1,
        category: "Home",
        subCategory: "EMI",
        mode: "UPI",
        description: "This is demo entry",
        amount: 120.56,
      },
      {
        id: 2,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120,
      },
      {
        id: 3,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120.56,
      },
      {
        id: 4,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description: "",
        amount: 120.56,
      },
    ],
  },
  {
    id: 2,
    date: new Date().toLocaleString("default", {
      month: "short",
      //   year: "numeric",
      day: "2-digit",
      weekday: "short",
    }),
    amount: 12434,
    tableData: [
      {
        id: 1,
        category: "Home",
        subCategory: "EMI",
        mode: "UPI",
        description: "This is demo entry",
        amount: 120.56,
      },
      {
        id: 2,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120,
      },
      {
        id: 3,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120.56,
      },
      {
        id: 4,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description: "",
        amount: 120.56,
      },
    ],
  },
  {
    id: 3,
    date: new Date().toLocaleString("default", {
      month: "short",
      //   year: "numeric",
      day: "2-digit",
      weekday: "short",
    }),
    amount: 4856,
    tableData: [
      {
        id: 1,
        category: "Home",
        subCategory: "EMI",
        mode: "UPI",
        description: "This is demo entry",
        amount: 120.56,
      },
      {
        id: 2,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120,
      },
      {
        id: 3,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description:
          "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
        amount: 120.56,
      },
      {
        id: 4,
        category: "Bill",
        subCategory: "EMI",
        mode: "UPI",
        description: "",
        amount: 120.56,
      },
    ],
  },
];

export const expenseTableData = [
  {
    id: 1,
    category: "Home",
    subCategory: "EMI",
    mode: "UPI",
    description: "This is demo entry",
    amount: 120.56,
  },
  {
    id: 2,
    category: "Bill",
    subCategory: "EMI",
    mode: "UPI",
    description:
      "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
    amount: 120,
  },
  {
    id: 3,
    category: "Bill",
    subCategory: "EMI",
    mode: "UPI",
    description:
      "This is demo entry. this is entry this is thbkcjjks ncsb fncj ncn",
    amount: 120.56,
  },
  {
    id: 4,
    category: "Bill",
    subCategory: "EMI",
    mode: "UPI",
    description: "",
    amount: 120.56,
  },
];

export const BASE_URL =
  "https://expense-tracker-production-6b8d.up.railway.app";

export const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const categoryData = [
  { id: 1, categoryName: "demo1", subCategory: ["1", "2"] },
  { id: 2, categoryName: "demo2", subCategory: ["1", "2"] },
  { id: 3, categoryName: "demo3", subCategory: ["1", "2"] },
  { id: 4, categoryName: "demo4", subCategory: ["1", "2"] },
];
