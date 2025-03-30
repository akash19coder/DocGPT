import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/ui/AuthLayout";
import AuthHeader from "../components/ui/AuthHeader";
import AuthButton from "../components/ui/AuthButton";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import useValidation from "../hooks/useFormDataValidator";
import { BASE_URL } from "../utils/constant";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { errors, validate } = useValidation();

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Logging in...");
    setLoading(true);

    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    if (!validate(data)) {
      return;
    }

    const response = await fetch(`${BASE_URL}/api/v1/user/signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const user = await response.json();
    toast.dismiss();

    if (user.error) {
      toast.error("Failed to Login");
    } else {
      toast.success("Logged In");
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
          {errors && (
            <span className="pt-4 text-red-500 text-sm italic">
              {errors.email}
            </span>
          )}
        </div>

        <label className=" text-sm font-medium text-foreground">Password</label>
        <div>
          <input
            type="password"
            placeholder="......."
            ref={password}
            className=" w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors && (
            <span className="pt-4 text-red-500 text-sm italic">
              {errors.password}
            </span>
          )}
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
