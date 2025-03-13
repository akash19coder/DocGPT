import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chat } from "./components/Chat";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* make it <Chat/> from <MainLayoutComponent /> */}
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="/chat/:id" element={<ChatPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
