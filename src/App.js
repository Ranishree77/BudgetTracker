import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import AddExpense from "./AddExpense";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      filterCategory === "All" || expense.category === filterCategory;
    const matchesDate =
      (!dateRange.start || new Date(expense.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(expense.date) <= new Date(dateRange.end));
    return matchesCategory && matchesDate;
  });

  const totalByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  const colors = Object.keys(totalByCategory).map(() => generateRandomColor());

  const chartData = {
    labels: Object.keys(totalByCategory),
    datasets: [
      {
        label: "Total Spending by Category",
        data: Object.values(totalByCategory),
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Personal Budget Tracker</h1>

      <AddExpense onAddExpense={addExpense} />

      <div style={{ marginBottom: "20px" }}>
        <h2>Filter Expenses</h2>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          placeholder="End Date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>

      <h2>Expenses</h2>
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            {expense.date} - {expense.category} - ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <h2>Spending Overview</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default App;
