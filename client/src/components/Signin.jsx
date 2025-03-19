import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/ui/AuthLayout";
import AuthHeader from "../components/ui/AuthHeader";
import InputField from "../components/ui/InputField";
import AuthButton from "../components/ui/AuthButton";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../utils/userSlice";
import toast, { Toaster } from "react-hot-toast";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Logging in...");
    setLoading(true);

    // Simulate API call
    const data = {
      email: email.current.value,
      password: password.current.value,
    };
    const response = await fetch("http://localhost:3002/api/v1/user/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const user = await response.json();

    if (user.error) {
      toast.dismiss(user.error);
    } else {
      toast.dismiss();
      toast.success("Logged In");
      dispatch(setIsAuthenticated());
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/chat");
    }, 1000);
  };

  return (
    <AuthLayout
      imageSide="right"
      image="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1974&auto=format&fit=crop"
    >
      <Toaster />
      <AuthHeader
        title="Welcome back"
        description="Enter your credentials to access your account"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className=" text-sm font-medium text-foreground">Email</label>
        <div>
          <input
            type="email"
            placeholder="ben@gmail.com"
            ref={email}
            className=" w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <label className=" text-sm font-medium text-foreground">Password</label>
        <div>
          <input
            type="password"
            placeholder="......."
            ref={password}
            className=" w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.05, 0.7, 0.1, 1] }}
          className="flex items-center justify-end"
        >
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        <AuthButton
          type="submit"
          loading={loading}
          className="w-full"
          delay={3}
        >
          Sign In
        </AuthButton>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
