import "./ItemAction.css";
export default function ItemAction({ id, onDeleteItem }) {
  return (
    <>
      <button className="delete-btn" onClick={() => onDeleteItem(id)}>
        Purge
      </button>
    </>
  );
}
