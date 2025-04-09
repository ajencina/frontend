import React, { useState } from "react";
import "./TransactionModal.css";

const TransactionModal = ({ type, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    method: "Card",
    date: new Date().toISOString().slice(0, 10),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!form.date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      ...form,
      amount: type === "income" ? +form.amount : -Math.abs(form.amount),
    };
    onSave(data);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>New {type === "income" ? "Income" : "Expense"}</h3>

        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>Method</label>
          <select name="method" value={form.method} onChange={handleChange}>
            <option>Card</option>
            <option>Cash</option>
            <option>Bank</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            className={type === "income" ? "save income" : "save expense"}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
