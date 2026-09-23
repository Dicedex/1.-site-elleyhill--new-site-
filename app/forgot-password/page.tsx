"use client";

import React, { useState, Suspense, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ConfirmationResult } from "@/lib/firebase";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  Phone,
  KeyRound,
  ShieldCheck,
  ChevronLeft,
  RefreshCw,
  Send,
} from "lucide-react";

function ForgotPasswordContent() {
  const router = useRouter();
  const { resetPassword, setupRecaptcha, sendPhoneOtp, confirmPhoneOtp } = useAuth();

  const [mode, setMode] = useState<"email" | "phone">("email");

  // Email Flow
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Phone Flow
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const recaptchaVerifierRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Start Cooldown timer helper
  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 1. Handle Email Password Reset Request
  const handleEmailReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    const res = await resetPassword(cleanEmail);
    setIsLoading(false);

    if (res.success) {
      setEmailSent(true);
      setSuccessMsg(`A password reset link has been dispatched to ${cleanEmail}.`);
      startCooldown(60);
    } else {
      setErrorMsg(res.error || "Could not send password reset email. Please try again.");
    }
  };

  // 2. Handle Resend Email Link
  const handleResendEmail = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setErrorMsg("");
    setIsLoading(true);

    const res = await resetPassword(email.trim().toLowerCase());
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg(`Reset link re-sent to ${email}.`);
      startCooldown(60);
    } else {
      setErrorMsg(res.error || "Failed to resend reset email.");
    }
  };

  // 3. Handle Send Phone SMS OTP
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleanNum = phoneNumber.trim().replace(/\s+/g, "");
    if (!cleanNum) {
      setErrorMsg("Please enter a valid Zambian mobile phone number.");
      return;
    }

    let formattedPhone = cleanNum;
    if (cleanNum.startsWith("0")) {
      formattedPhone = `+260${cleanNum.substring(1)}`;
    } else if (!cleanNum.startsWith("+")) {
      formattedPhone = `+260${cleanNum}`;
    }

    try {
      setIsLoading(true);
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = setupRecaptcha("recaptcha-forgot-container");
      }

      const res = await sendPhoneOtp(formattedPhone, recaptchaVerifierRef.current);
      setIsLoading(false);

      if (res.success && res.confirmationResult) {
        setConfirmationResult(res.confirmationResult);
        setOtpSent(true);
        setSuccessMsg(`SMS verification code sent to ${formattedPhone}`);
      } else {
        setErrorMsg(res.error || "Could not send SMS verification code.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || "Failed to initialize phone verification.");
    }
  };

  // 4. Handle Verify Phone OTP
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!confirmationResult || !otpCode.trim()) {
      setErrorMsg("Please enter the 6-digit code received via SMS.");
      return;
    }

    setIsLoading(true);
    const res = await confirmPhoneOtp(confirmationResult, otpCode.trim());
    setIsLoading(false);

    if (res.success) {
      setPhoneVerified(true);
      setSuccessMsg("Phone identity confirmed! Redirecting to your account...");
      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } else {
      setErrorMsg(res.error || "Invalid OTP verification code.");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Invisible reCAPTCHA container for Phone Auth */}
      <div id="recaptcha-forgot-container"></div>

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
            <span>ELLEYHILL ACCOUNT RECOVERY</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal font-headline">
            Reset Your Password
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Receive a secure reset link to regain access to your account and warranties.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl">
          {/* Recovery Method Tabs */}
          {!emailSent && !otpSent && (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-surface-container mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode("email");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "email"
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
                  setMode("phone");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  mode === "phone"
                    ? "bg-white text-secondary shadow-xs"
                    : "text-on-surface-variant hover:text-charcoal"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Phone SMS OTP</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-error text-xs animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && !emailSent && !phoneVerified && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-secondary text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-secondary" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* MODE 1: EMAIL RESET */}
          {mode === "email" && !emailSent && (
            <form onSubmit={handleEmailReset} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Registered Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1.5">
                  We will send a secure password reset link to this email address.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 1: EMAIL SUCCESS STATE */}
          {mode === "email" && emailSent && (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-secondary">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-charcoal font-headline">Reset Email Dispatched</h3>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed max-w-sm mx-auto">
                  A password reset link has been dispatched to:
                </p>
                <div className="mt-1 font-bold text-sm text-primary break-all">{email}</div>
                <p className="text-[11px] text-on-surface-variant mt-2">
                  Please click the link inside the email to choose your new password. Check your spam or junk folder if you don't see it within a minute.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0 || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-semibold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>
                    {resendCooldown > 0 ? `Resend email in ${resendCooldown}s` : "Resend Reset Link"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="w-full py-2 text-xs text-on-surface-variant hover:text-charcoal flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Use a different email address</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: PHONE OTP REQUEST */}
          {mode === "phone" && !otpSent && (
            <form onSubmit={handleSendPhoneOtp} className="space-y-4">
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0977 123 456"
                    required
                    className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-sans"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant mt-1.5">
                  We will send a 6-digit SMS verification code to your mobile phone.
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
                    <span>Send SMS Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 2: PHONE OTP VERIFICATION */}
          {mode === "phone" && otpSent && !phoneVerified && (
            <form onSubmit={handleVerifyPhoneOtp} className="space-y-4 animate-fadeIn">
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
                      setErrorMsg("");
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
                    <span>Verify Code &amp; Access Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 2: PHONE VERIFIED SUCCESS */}
          {phoneVerified && (
            <div className="text-center py-6 space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-charcoal font-headline">Verification Complete</h3>
              <p className="text-xs text-on-surface-variant">
                Your mobile phone identity has been verified. Redirecting to your account dashboard...
              </p>
            </div>
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-container-low flex items-center justify-center text-charcoal">
          Loading...
        </div>
      }
    >
      <ForgotPasswordContent />
    </Suspense>
  );
}
