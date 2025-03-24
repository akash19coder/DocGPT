import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/ui/AuthLayout";
import AuthHeader from "../components/ui/AuthHeader";
import InputField from "../components/ui/InputField";
import AuthButton from "../components/ui/AuthButton";
import toast, { Toaster } from "react-hot-toast";
import useValidation from "../hooks/useFormDataValidator";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { errors, validate } = useValidation();

  const otp = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      return setError("Password did not match");
    }
    toast.loading("Reseting Password...");
    setLoading(true);

    const data = {
      otp: otp.current.value,
      password: password.current.value,
    };

    if (!validate(errors)) {
      toast.dismiss();
      toast.error("Failed to Reset Password");
      return;
    }

    // Simulate API call
    const response = await fetch(
      "http://localhost:3002/api/v1/user/reset-password",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const reply = await response.json();
    toast.dismiss();

    if (reply.error) {
      toast.error("Failed To Reset Password...");
      setError(reply.error);
    } else {
      toast.success("Password Reset");
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout
      imageSide="right"
      image="https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1770&auto=format&fit=crop"
    >
      <Toaster />
      <AuthHeader
        title="Create new password"
        description="Enter the code sent to your email and set a new password"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block text-sm font-medium text-foreground">
          Enter OTP
        </label>
        <div>
          <input
            type="text"
            placeholder="123456"
            ref={otp}
            className="block w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <label className="block text-sm font-medium text-foreground">
          New Password
        </label>
        <div>
          <input
            type="password"
            placeholder="askjaskdj"
            ref={password}
            className="block w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <label className="block text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <div>
          <input
            type="password"
            placeholder="asdlkjfa"
            ref={confirmPassword}
            className="block w-full rounded-md border border-input bg-background px-4 py-3 text-foreground shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {errors && (
            <span className="pt-4 text-red-500 text-sm italic">
              {errors.password}
            </span>
          )}
        </div>

        <AuthButton
          type="submit"
          onClick={handleSubmit}
          loading={loading}
          className="w-full"
          delay={4}
        >
          Reset Password
        </AuthButton>
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
