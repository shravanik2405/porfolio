import { HorizontalScroll } from "./components/HorizontalScroll";
import { MobileBlocker } from "./components/MobileBlocker";
import "./App.css";

function App() {
  return (
    <div className='app'>
      <MobileBlocker />
      <div className='desktop-content'>
        <HorizontalScroll />
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .desktop-content {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
