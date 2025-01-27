// AddExpense.js
import React, { useState } from "react";
import "./AddExpense.css";

const AddExpense = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || !date) {
      alert("Please enter a valid amount and date.");
      return;
    }
    onAddExpense({ amount: parseFloat(amount), category, date });
    setAmount("");
    setDate("");
  };

  return (
    <form className="add-expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select"
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input"
      />
      <button type="submit" className="button">
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
