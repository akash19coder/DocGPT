import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Chat } from "./components/Chat";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/Signin";
import SignupForm from "./components/Signup";
import ResetPassword from "./components/ResetPasswordPage";
import ForgotPassword from "./components/ForgotPasswordPage";

import store from "./utils/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute />}>
            {/* TODO: it is not the right way of doing it...*/}
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
