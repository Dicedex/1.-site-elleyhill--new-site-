"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  Phone,
  KeyRound,
  ShieldCheck,
  ChevronLeft,
  Eye,
  EyeOff,
} from "lucide-react";

function ForgotPasswordContent() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Step 1: Send OTP / Link
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("Please enter your registered email address or phone number.");
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsLoading(false);

    setOtpCode("482910"); // Pre-populate demo code for immediate testing ease
    setStep(2);
    setSuccessMsg(`A 6-digit security recovery PIN has been sent to ${identifier}. (Test PIN: 482910)`);
  };

  // Step 2: Verify Code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (otpCode.trim().length < 6) {
      setErrorMsg("Please enter the 6-digit security PIN sent to your device.");
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));
    setIsLoading(false);

    setStep(3);
    setSuccessMsg("Security verification successful. Please create a new password.");
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setIsLoading(false);

    alert("Password updated successfully! You can now sign in with your new credentials.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-light text-xs font-semibold text-secondary mb-4 hover:border-primary/40 shadow-sm transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>ELLEYHILL SECURITY PORTAL</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal font-headline">
            Reset Your Password
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            {step === 1 && "Enter your registered email or phone to receive a recovery code."}
            {step === 2 && "Enter the 6-digit verification PIN sent to your phone or email."}
            {step === 3 && "Create a secure new password for your solar client account."}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-secondary text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* STEP 1: Request Reset */}
          {step === 1 && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Email Address or Zambian Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. mwape@gmail.com or 0977 452 819"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Enter Verification PIN */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  6-Digit Recovery PIN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="482910"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-border-medium text-center font-mono text-xl tracking-[0.4em] text-primary focus:bg-white focus:outline-none focus:border-primary font-bold"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-on-surface-variant">Didn't receive PIN?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode("482910");
                      setSuccessMsg("Security PIN re-dispatched: 482910");
                    }}
                    className="text-primary hover:underline font-bold cursor-pointer"
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Validating PIN...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Security Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-2 text-xs text-on-surface-variant hover:text-charcoal flex items-center justify-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Change Email / Phone Number</span>
              </button>
            </form>
          )}

          {/* STEP 3: Create New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Save New Password &amp; Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Back Link */}
          <div className="mt-6 text-center text-xs text-on-surface-variant border-t border-border-light pt-6">
            Remember your credentials?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Return to Sign In
            </Link>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>256-Bit SSL Encrypted Recovery</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>Zambian Technical Desk Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container-low flex items-center justify-center text-charcoal">Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
