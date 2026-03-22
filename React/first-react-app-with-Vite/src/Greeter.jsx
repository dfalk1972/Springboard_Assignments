export default function Greeter({ person = "Everyone", from = "Anonymous" }) {
  return (
    <div>
      <h1>Hi, {person}!!!</h1>
      <h2>Love, {from} </h2>
    </div>
  );
}
