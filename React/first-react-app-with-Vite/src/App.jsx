import "./App.css";
import Chicken from "./Chicken";
import Dogs from "./Dogs";
import Greeter from "./Greeter";
import { Die } from "./Die";
import ListPicker from "./ListPicker";
import DoubleDice from "./DoubleDice";
import ColorList from "./ColorList";

function App() {
  return (
    <div>
      <ColorList colors={["red", "pink", "purple", "teal"]} />
      {/* <Chicken />
      <Dogs /> */}
      {/* <Greeter person="Trent" from="Delcy" />
      <Greeter person="Sadie" from="Trent" />
      <Greeter person="Belle" from="Sadie" />

      <Die numSides={20} />
      <Die numSides={10} />
      <Die numSides={6} /> */}
      {/* <ListPicker values={[1, 2, 3]} />
      <ListPicker values={["a", "b", "c"]} /> */}

      {/* <DoubleDice />
      <DoubleDice />
      <DoubleDice /> */}
    </div>
  );
}
export default App;
