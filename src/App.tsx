import { HorizontalScroll } from "./components/HorizontalScroll";
import { MobileBlocker } from "./components/MobileBlocker";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <MobileBlocker />
      <HorizontalScroll />
    </div>
  );
}

export default App;
