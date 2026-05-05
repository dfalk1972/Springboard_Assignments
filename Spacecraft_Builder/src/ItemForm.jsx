import { useState, useRef } from "react";
import "./ItemForm.css";

export default function ItemForm({ onAddItem, inventory }) {
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    purpose: "",
  });

  const [errors, setErrors] = useState({
    itemName: false,
    quantity: false,
    purpose: false,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {
      itemName: formData.itemName === "",
      quantity: formData.quantity === "",
      purpose: formData.purpose === "",
    };
    setErrors(newErrors);

    if (newErrors.itemName || newErrors.quantity || newErrors.purpose) {
      return;
    }

    const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
    const newItem = {
      id: id,
      itemName: formData.itemName,
      quantity:
        formData.quantity || !Number.isInteger(Number(formData.quantity)),
      purpose: formData.purpose,
    };

    onAddItem(newItem);
    setFormData({ itemName: "", quantity: "", purpose: "" });
    nameInputRef.current.focus();
  }
  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Item</h2>
      <div className="form-group">
        <label className="form-label"> </label>
        Item Name:
        <input
          className={`form-input ${errors.itemName ? "error" : ""}`}
          ref={nameInputRef}
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label className="form-label">Quantity: </label>
        <input
          className={`form-input ${errors.quantity ? "error" : ""}`}
          type="number"
          min="1"
          step="1"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label className="form-label">Purpose: </label>
        <input
          className={`form-input ${errors.purpose ? "error" : ""}`}
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        ></input>
      </div>
      <button className="submit-btn" type="submit">
        Add Item
      </button>
    </form>
  );
}
