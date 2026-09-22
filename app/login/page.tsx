"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Home,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/profile";

  const { login, loginWithDemo, user, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If already logged in, redirect accordingly
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin" && redirectUrl === "/profile") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    }
  }, [user, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      if (result.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    } else {
      setErrorMsg(result.error || "Invalid credentials. Please check and try again.");
    }
  };

  const handleDemoClick = (type: "residential" | "commercial" | "admin") => {
    loginWithDemo(type);
    if (type === "admin") {
      router.push("/admin");
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Background ambient solar accents */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-light text-xs font-semibold text-secondary mb-4 hover:border-primary/40 shadow-sm transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>ELLEYHILL CLIENT &amp; ADMIN PORTAL</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal font-headline">
            Sign In to Your Account
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Access warranty certificates, Lusaka dispatch tracking, or admin operations.
          </p>
        </div>

        {/* 1-Click Demo Accounts Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-border-light shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>Quick Test Demo Profiles</span>
            </div>
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">1-Click Sign In</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <button
              type="button"
              onClick={() => handleDemoClick("residential")}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-border-light hover:border-primary text-left text-xs font-medium transition-all group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-charcoal truncate">Mwape Chilufya</div>
                <div className="text-[10px] text-on-surface-variant">6kW Woodlands System</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoClick("commercial")}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-border-light hover:border-secondary text-left text-xs font-medium transition-all group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-md bg-secondary-light flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-charcoal truncate">Kafue Agri-Holdings</div>
                <div className="text-[10px] text-on-surface-variant">50kW Commercial Array</div>
              </div>
            </button>
          </div>

          {/* Admin Demo Button */}
          <button
            type="button"
            onClick={() => handleDemoClick("admin")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-primary-light border border-primary/20 hover:bg-primary/20 text-left text-xs font-medium transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-charcoal flex items-center gap-1.5 truncate">
                  <span>Elleyhill Operations Admin</span>
                  <span className="px-1.5 py-0.2 rounded bg-primary text-white text-[9px] font-extrabold uppercase">ADMIN</span>
                </div>
                <div className="text-[10px] text-primary">HQ Operations, Dispatch &amp; Inventory Console</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mwape@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border-medium text-primary focus:ring-primary accent-primary"
                />
                <span className="text-xs text-on-surface-variant font-medium">Remember this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-outline font-semibold tracking-wider">
                New to Elleyhill?
              </span>
            </div>
          </div>

          {/* Link to Signup */}
          <div className="text-center">
            <Link
              href={`/signup${redirectUrl !== "/profile" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-semibold text-xs tracking-wide transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Create a New Client Account</span>
            </Link>
          </div>
        </div>

        {/* Security & Verification Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>256-Bit SSL Encrypted Portal</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>ERB &amp; ZABS Certified Hardware</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-charcoal transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need help accessing your warranty or order? Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container-low flex items-center justify-center text-charcoal">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
