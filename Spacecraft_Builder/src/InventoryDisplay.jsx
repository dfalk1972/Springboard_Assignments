import "./InventoryDisplay.css";
import "./ItemCard.css";
import ItemCard from "./ItemCard";
import ItemAction from "./ItemAction";

export default function InventoryDisplay({ inventory, onDeleteItem }) {
  return (
    <div className="inventory-display">
      <h2 className="inventory-title">INVENTORY MANIFEST</h2>
      {inventory.length === 0 ? (
        <p className="empty-message">No Items Logged</p>
      ) : (
        inventory.map((item) => (
          <div className="inventory-row" key={item.id}>
            <ItemCard item={item} />
            <ItemAction id={item.id} onDeleteItem={onDeleteItem} />
          </div>
        ))
      )}
    </div>
  );
}
