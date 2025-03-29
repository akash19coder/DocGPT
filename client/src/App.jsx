import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import React, { Suspense } from "react";

const Chat = React.lazy(() => import("./components/Chat"));
const LoginForm = React.lazy(() => import("./components/Signin"));
const SignupForm = React.lazy(() => import("./components/Signup"));
const ResetPassword = React.lazy(() =>
  import("./components/ResetPasswordPage")
);
const ForgotPassword = React.lazy(() =>
  import("./components/ForgotPasswordPage")
);

import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import store from "./utils/Store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { pdfjs } from "react-pdf";
import Payment from "./components/Payment";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const stripePromise = loadStripe(
  "pk_test_51R7a8GPDsCrgRH8GQMBumsndGUzZXVOHkQLF95KZTVGiqayI6nedC16bx28DX1mVVBgG00sToxJwhTZHAdXG0iGE00Bm8QDCH1"
);
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/payment"
                element={
                  <Elements stripe={stripePromise}>
                    {" "}
                    <Payment />
                  </Elements>
                }
              />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
