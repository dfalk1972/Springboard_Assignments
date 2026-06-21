import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Routing from "./Routes/Routing";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ErrorBoundary>
        <Routing />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
