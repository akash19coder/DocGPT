"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function SubscriptionPlansBw() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: ["Basic access", "1 user", "1GB storage", "Community support"],
    },
    {
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      features: [
        "Full access",
        "Unlimited users",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t to-gray-900 from-black"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[200%] aspect-[2/1]">
          <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent rounded-[100%] blur-2xl"></div>
        </div>
      </div>
      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white"
        >
          Choose Your Plan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center space-x-4"
        >
          <span
            className={`text-sm ${!isYearly ? "text-white" : "text-gray-400"}`}
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-white"
          />
          <span
            className={`text-sm ${isYearly ? "text-white" : "text-gray-400"}`}
          >
            Yearly (2 months free)
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800"
            >
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                <p className="text-4xl font-bold text-white">
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                  <span className="text-base font-normal text-gray-400">
                    /{isYearly ? "year" : "month"}
                  </span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5 + featureIndex * 0.1,
                        duration: 0.3,
                      }}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <Check className="w-5 h-5 text-white" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-800">
                <Button className="w-full bg-white hover:bg-gray-200 text-black">
                  {plan.name === "Free" ? "Get Started" : "Upgrade to Pro"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-4 px-6 text-left text-white">Feature</th>
                <th className="py-4 px-6 text-center text-white">Free</th>
                <th className="py-4 px-6 text-center text-white">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Access to all basic features",
                "Priority customer support",
                "Access to premium content",
                "Collaboration tools",
                "Advanced analytics",
              ].map((feature, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
                >
                  <td className="py-4 px-6 text-gray-300">{feature}</td>
                  <td className="py-4 px-6 text-center">
                    {index < 1 ? (
                      <Check className="w-5 h-5 text-white mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check className="w-5 h-5 text-white mx-auto" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
