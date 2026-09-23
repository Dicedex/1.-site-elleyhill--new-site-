"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ConfirmationResult } from "@/lib/firebase";
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
  Phone,
  KeyRound,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/profile";

  const {
    login,
    loginWithGoogle,
    setupRecaptcha,
    sendPhoneOtp,
    confirmPhoneOtp,
    user,
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

  // Email form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Phone form state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const recaptchaVerifierRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === "admin" && redirectUrl === "/profile") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    }
  }, [user, router, redirectUrl]);

  // Handle Email Submit
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

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

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsGoogleLoading(true);

    const result = await loginWithGoogle();
    setIsGoogleLoading(false);

    if (result.success) {
      if (result.role === "admin") {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    } else {
      setErrorMsg(result.error || "Google sign-in was cancelled or failed.");
    }
  };

  // Handle Phone Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanNum = phoneNumber.trim().replace(/\s+/g, "");
    if (!cleanNum) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    // Format phone with Zambia +260 if local format
    let formattedPhone = cleanNum;
    if (cleanNum.startsWith("0")) {
      formattedPhone = `+260${cleanNum.substring(1)}`;
    } else if (!cleanNum.startsWith("+")) {
      formattedPhone = `+260${cleanNum}`;
    }

    try {
      setIsLoading(true);
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = setupRecaptcha("recaptcha-container");
      }

      const res = await sendPhoneOtp(formattedPhone, recaptchaVerifierRef.current);
      setIsLoading(false);

      if (res.success && res.confirmationResult) {
        setConfirmationResult(res.confirmationResult);
        setOtpSent(true);
        setSuccessMsg(`SMS verification code sent to ${formattedPhone}`);
      } else {
        setErrorMsg(res.error || "Could not send SMS OTP code.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || "Failed to initialize phone verification.");
    }
  };

  // Handle OTP Confirmation
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!confirmationResult || !otpCode.trim()) {
      setErrorMsg("Please enter the 6-digit OTP code received via SMS.");
      return;
    }

    setIsLoading(true);
    const res = await confirmPhoneOtp(confirmationResult, otpCode.trim());
    setIsLoading(false);

    if (res.success) {
      router.push(redirectUrl);
    } else {
      setErrorMsg(res.error || "Invalid OTP code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Invisible reCAPTCHA container for Phone Auth */}
      <div id="recaptcha-container"></div>

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
            <span>ELLEYHILL ACCOUNT LOGIN</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal font-headline">
            Sign In to Your Account
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Access warranty certificates, Lusaka dispatch tracking, or admin operations.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl">
          {/* Google Sign-In One-Click Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-3 px-4 rounded-xl border border-border-medium hover:border-charcoal/40 bg-white hover:bg-surface-container-low text-charcoal font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white px-3 text-outline font-semibold tracking-wider">
                Or choose sign-in method
              </span>
            </div>
          </div>

          {/* Auth Method Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-surface-container mb-5">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("email");
                setErrorMsg("");
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMethod === "email"
                  ? "bg-white text-primary shadow-xs"
                  : "text-on-surface-variant hover:text-charcoal"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Address</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod("phone");
                setErrorMsg("");
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMethod === "phone"
                  ? "bg-white text-secondary shadow-xs"
                  : "text-on-surface-variant hover:text-charcoal"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone SMS OTP</span>
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 flex items-start gap-2.5 text-status-success text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-status-success" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* Method 1: Email Form */}
          {authMethod === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                    name="email"
                    id="login-email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. you@example.com"
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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-charcoal transition-colors cursor-pointer"
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
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Email</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Method 2: Phone SMS OTP Form */}
          {authMethod === "phone" && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                      Zambian Mobile Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary font-bold text-xs">
                        +260
                      </div>
                      <input
                        type="tel"
                        name="tel"
                        id="login-phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 0977 123 456"
                        required
                        className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-sans"
                      />
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-1">
                      We will send a 6-digit verification code via SMS to your mobile phone.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-secondary/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending SMS Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Verification Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                        Enter 6-Digit SMS Code
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpCode("");
                        }}
                        className="text-xs text-secondary font-semibold hover:underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-center text-lg tracking-widest font-mono text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-secondary/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm &amp; Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

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
              <span>Create a New Account</span>
            </Link>
          </div>
        </div>

        {/* Security & Verification Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>256-Bit SSL Secure Connection</span>
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
