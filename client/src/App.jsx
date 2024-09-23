import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayoutComponent } from "./components/main-layout";
import LandingPage from "./components/landing-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<MainLayoutComponent />} />
        {/* <Route path="/chat/:id" element={<ChatPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
