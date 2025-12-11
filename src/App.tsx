import { HorizontalScroll } from "./components/HorizontalScroll";
// MobileBlocker is no longer needed since we support mobile now, but let's keep it if user wants it back or remove it.
// User requested vertical scroll on mobile, so we should effectively disable the blocker logic or remove it.
// import { MobileBlocker } from "./components/MobileBlocker";
import "./App.css";

function App() {
  return (
    <div className='app'>
      {/* <MobileBlocker /> - Removed as we now support mobile vertical scroll */}
      <HorizontalScroll />
    </div>
  );
}

export default App;
