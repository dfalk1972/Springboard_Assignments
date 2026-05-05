import { useState } from "react";
import "./SpacecraftBuilder.css";
import ItemForm from "./ItemForm";
import InventoryDisplay from "./InventoryDisplay";

export default function SpacecraftBuilder() {
  const [inventory, setInventory] = useState([]);

  function handleAddItem(newItem) {
    setInventory([...inventory, newItem]);
  }

  function handleDeleteItem(id) {
    setInventory(inventory.filter((item) => item.id !== id));
  }
  return (
    <div className="spacecraft-builder">
      <h1 className="builder-title">⚙️ SPACECRAFT INVENTORY SYSTEM</h1>
      <ItemForm onAddItem={handleAddItem} inventory={inventory} />
      <InventoryDisplay onDeleteItem={handleDeleteItem} inventory={inventory} />
    </div>
  );
}
