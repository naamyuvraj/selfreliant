"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabaseClient";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google login error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F0] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#E2725B]">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin ? "Login to continue shopping" : "Join us and start shopping"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-sm font-medium ${
              isLogin ? "text-[#E2725B] border-b-2 border-[#E2725B]" : "text-gray-500"
            } pb-1`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-sm font-medium ${
              !isLogin ? "text-[#E2725B] border-b-2 border-[#E2725B]" : "text-gray-500"
            } pb-1`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
          />
          <button
            type="submit"
            className="w-full bg-[#E2725B] text-white py-2 rounded-md hover:bg-[#c85c48] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative text-center">
          <span className="absolute left-0 top-2 w-full border-t border-gray-200"></span>
          <span className="bg-white px-2 text-sm text-gray-500 relative z-10">
            or continue with
          </span>
        </div>

        {/* Google Auth Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border flex items-center justify-center gap-3 py-2 rounded-md bg-white hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm text-gray-600">Continue with Google</span>
        </button>

        {/* Toggle Text */}
        <p className="text-center text-sm text-gray-500">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            className="text-[#E2725B] font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
