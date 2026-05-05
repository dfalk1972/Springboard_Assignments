export default function ItemCard({ item }) {
  return (
    <div className="item-card">
      <span className="item-field">
        <span className="field-label">ITEM:</span>
        {item.itemName}
      </span>
      <span className="item-field">
        <span className="field-label">QTY:</span>
        {item.quantity}
      </span>
      <span className="item-field">
        <span className="field-label">PURPOSE:</span>
        {item.purpose}
      </span>
    </div>
  );
}
