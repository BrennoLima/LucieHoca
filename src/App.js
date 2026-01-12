import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./routes/Home";
// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
