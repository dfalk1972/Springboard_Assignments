export default function DoubleDice() {
  const num1 = Math.floor(Math.random() * 3) + 1;
  const num2 = Math.floor(Math.random() * 3) + 1;
  return (
    <div>
      <p>num1: {num1}</p>
      <p>num2: {num2}</p>
    </div>
  );
}
