import "./App.css";
import InitialCanvas from "./components/InitialCanvas";
import Information from "./components/Information";

function App() {
  return (
    <div className="App">
      <h1 class="font-black text-4xl mt-3">Convex Hull Visualizer</h1>
      <InitialCanvas />
      <Information />
    </div>
  );
}

export default App;
