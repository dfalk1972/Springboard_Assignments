import Message from "./message";

export default function InventoryItem({ name, type, quantity = 0, price = 0 }) {
  const lowStock = 5;
  const highValue = 1000;
  const totalValue = price * quantity;

  return (
    <div>
      <h2>
        {name} ({type})
      </h2>
      {quantity < lowStock && (
        <Message>
          ⚠️ <b>Low Stock!</b> {quantity} remaining.
        </Message>
      )}
      {totalValue > highValue && (
        <Message>
          💰 <b>High value - consider extra protection!</b>
        </Message>
      )}
    </div>
  );
}
