import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/ui/AuthLayout";
import AuthHeader from "../components/ui/AuthHeader";
import InputField from "../components/ui/InputField";
import AuthButton from "../components/ui/AuthButton";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const email = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Processing...");
    setLoading(true);

    const response = await fetch(
      "http://localhost:3002/api/v1/user/request-password-reset",
      {
        method: "POST",
        body: JSON.stringify({ email: email.current.value }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const reply = await response.json();
    toast.dismiss();

    if (reply.error) {
      toast.error("Operation Failed...");
      setError(reply.error);
    } else {
      toast.success("Check Email for OTP");
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/reset-password");
    }, 1000);
  };

  return (
    <AuthLayout
      imageSide="left"
      image="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1974&auto=format&fit=crop"
    >
      <Toaster />
      <AuthHeader
        title="Reset your password"
        description="Enter your email address to receive a password reset code"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className=" text-sm font-medium text-foreground">Email</label>
        <div>
          <input
            type="email"
            placeholder="ben@gmail.com"
            ref={email}
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {error && (
          <span className="pt-4 text-red-500 text-sm italic">{error}</span>
        )}

        <AuthButton
          type="submit"
          loading={loading}
          className="w-full"
          delay={2}
        >
          Send Reset Code
        </AuthButton>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Back to sign in
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
