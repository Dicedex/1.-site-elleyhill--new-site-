"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, AccountType } from "@/context/AuthContext";
import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Building2,
  Home,
  Tractor,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

const ZAMBIAN_PROVINCES = [
  { name: "Lusaka Province", districts: ["Lusaka Urban", "Woodlands/Kabulonga", "Lusaka West", "Chilanga", "Chongwe", "Kafue", "Luangwa"] },
  { name: "Copperbelt Province", districts: ["Kitwe", "Ndola", "Chingola", "Mufulira", "Luanshya", "Kalulushi", "Chililabombwe"] },
  { name: "Central Province", districts: ["Kabwe", "Kapiri Mposhi", "Mkushi Farm Block", "Serenje", "Chibombo"] },
  { name: "Southern Province", districts: ["Mazabuka", "Choma", "Livingstone", "Monze", "Kalomo", "Siavonga"] },
  { name: "Eastern Province", districts: ["Chipata", "Petauke", "Katete", "Lundazi", "Nyimba"] },
  { name: "North-Western Province", districts: ["Solwezi", "Kalumbila", "Kansanshi", "Kasempa", "Mwinilunga"] },
  { name: "Northern Province", districts: ["Kasama", "Mbala", "Mporokoso", "Luwingu"] },
  { name: "Luapula Province", districts: ["Mansa", "Samfya", "Kawambwa", "Nchelenge"] },
  { name: "Muchinga Province", districts: ["Chinsali", "Mpika", "Nakonde", "Isoka"] },
  { name: "Western Province", districts: ["Mongu", "Kaoma", "Senanga", "Sesheke"] },
];

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/profile";

  const { signup, loginWithGoogle, user } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>("residential");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tpin, setTpin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState(ZAMBIAN_PROVINCES[0].name);
  const [district, setDistrict] = useState(ZAMBIAN_PROVINCES[0].districts[0]);
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  // Update district options when province changes
  const handleProvinceChange = (newProv: string) => {
    setProvince(newProv);
    const provObj = ZAMBIAN_PROVINCES.find((p) => p.name === newProv);
    if (provObj && provObj.districts.length > 0) {
      setDistrict(provObj.districts[0]);
    }
  };

  const currentProvinceObj = ZAMBIAN_PROVINCES.find((p) => p.name === province);

  const handleGoogleSignUp = async () => {
    setErrorMsg("");
    setIsGoogleLoading(true);
    const res = await loginWithGoogle();
    setIsGoogleLoading(false);

    if (res.success) {
      router.push(redirectUrl);
    } else {
      setErrorMsg(res.error || "Google sign-up failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name or primary contact name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your phone number for dispatch and warranty registration.");
      return;
    }
    if (!primaryAddress.trim()) {
      setErrorMsg("Please enter your physical site or delivery address.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password should be at least 6 characters long.");
      return;
    }
    if (!acceptTerms) {
      setErrorMsg("Please accept the Terms of Service & Warranty registration guidelines.");
      return;
    }

    setIsLoading(true);

    const result = await signup(
      {
        fullName,
        email,
        phone,
        accountType,
        companyName: accountType !== "residential" ? companyName : undefined,
        tpin: accountType !== "residential" ? tpin : undefined,
        primaryProvince: province,
        primaryDistrict: district,
        primaryAddress,
      },
      password
    );

    setIsLoading(false);

    if (result.success) {
      router.push(redirectUrl);
    } else {
      setErrorMsg(result.error || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute top-20 left-1/3 w-[600px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-light text-xs font-semibold text-secondary mb-4 hover:border-primary/40 shadow-sm transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>ELLEYHILL CLIENT REGISTRATION</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-charcoal font-headline">
            Create Your Solar Client Account
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant max-w-lg mx-auto">
            Register your installation site to activate 10-Year Lithium Battery Warranties, digital commissioning certificates, and expedited Lusaka dispatch.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl">
          {/* Google 1-Click Sign-up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-3 px-4 rounded-xl border border-border-medium hover:border-charcoal/40 bg-white hover:bg-surface-container-low text-charcoal font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 shadow-xs cursor-pointer active:scale-[0.99] disabled:opacity-50 mb-6"
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
            <span>Sign Up with Google (1-Click)</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-outline font-semibold tracking-wider">
                Or fill registration details
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-error text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-error" />
              <div>{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selector */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-2.5 uppercase tracking-wider">
                Select Installation Profile Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("residential")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    accountType === "residential"
                      ? "bg-primary-light border-primary text-charcoal shadow-sm"
                      : "bg-surface-container-low border-border-medium text-on-surface-variant hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Home className={`w-5 h-5 ${accountType === "residential" ? "text-primary" : "text-outline"}`} />
                    {accountType === "residential" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Residential</div>
                    <div className="text-[11px] text-on-surface-variant">Home &amp; Load-Shedding</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("commercial")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    accountType === "commercial"
                      ? "bg-secondary-light border-secondary text-charcoal shadow-sm"
                      : "bg-surface-container-low border-border-medium text-on-surface-variant hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className={`w-5 h-5 ${accountType === "commercial" ? "text-secondary" : "text-outline"}`} />
                    {accountType === "commercial" && <CheckCircle2 className="w-4 h-4 text-secondary" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Commercial</div>
                    <div className="text-[11px] text-on-surface-variant">Offices, Clinics &amp; Retail</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("agricultural")}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    accountType === "agricultural"
                      ? "bg-secondary-light border-secondary text-charcoal shadow-sm"
                      : "bg-surface-container-low border-border-medium text-on-surface-variant hover:border-secondary/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Tractor className={`w-5 h-5 ${accountType === "agricultural" ? "text-secondary" : "text-outline"}`} />
                    {accountType === "agricultural" && <CheckCircle2 className="w-4 h-4 text-secondary" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-charcoal">Agricultural</div>
                    <div className="text-[11px] text-on-surface-variant">Farms &amp; Solar Pumps</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Commercial / Agri Extra Fields */}
            {accountType !== "residential" && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-border-light grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                    Company / Farm Entity Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Copperbelt Agri Farms Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                    ZRA TPIN (For Tax Invoices)
                  </label>
                  <input
                    type="text"
                    value={tpin}
                    onChange={(e) => setTpin(e.target.value)}
                    placeholder="10-digit TPIN"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>
            )}

            {/* Personal / Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Contact Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Mwape Chilufya"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mwape@example.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Zambian Phone / WhatsApp *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0977 000 000 / +260"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Province *
                </label>
                <select
                  value={province}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  {ZAMBIAN_PROVINCES.map((prov) => (
                    <option key={prov.name} value={prov.name} className="text-charcoal">
                      {prov.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* District and Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  District / Area *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary cursor-pointer"
                >
                  {currentProvinceObj?.districts.map((d) => (
                    <option key={d} value={d} className="text-charcoal">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Physical Site / Delivery Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={primaryAddress}
                    onChange={(e) => setPrimaryAddress(e.target.value)}
                    placeholder="Plot / Stand number, Street, Suburb"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                Create Account Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal placeholder:text-outline/60 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-charcoal cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border-medium text-primary focus:ring-primary accent-primary"
              />
              <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer">
                I agree to the Elleyhill Power terms, digital warranty registration guidelines, and receive dispatch updates on my order.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering Profile...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration &amp; Open Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 text-center text-xs text-on-surface-variant border-t border-border-light pt-6">
            Already have an account?{" "}
            <Link
              href={`/login${redirectUrl !== "/profile" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-primary font-bold hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>10-Year Lithium Battery Warranty Vault</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>Official Engineering Support Lusaka</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container-low flex items-center justify-center text-charcoal">Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}
