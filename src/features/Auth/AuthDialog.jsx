import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LocalStorageService from "../../app/localStorageService";
import {
  clearAuthSession,
  closeAuthDialog,
  getAuthDialogOpen,
  getCurrentUser,
  getIsLoggedIn,
  setAuthSession,
} from "./authSlice";
import {
  confirmVerificationCode,
  registerAccount,
  requestLoginCode,
  requestVerificationCode,
  signOutAccount,
} from "./api";

const cleanPhone = (value) => value.replace(/[\s()-]/g, "");
const responseData = (response) => response?.data?.data;

export default function AuthDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getAuthDialogOpen);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getCurrentUser);
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("details");
  const [form, setForm] = useState({
    name: "",
    phone: "+91",
    email: "",
    marketingEmailSubscribed: false,
  });
  const [code, setCode] = useState("");
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape" && !busy) {
        dispatch(closeAuthDialog());
        setStep("details");
        setCode("");
        setVerification(null);
        setError("");
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [busy, dispatch, isOpen]);

  if (!isOpen) return null;

  const updateForm = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "email" && !value ? { marketingEmailSubscribed: false } : {}),
    }));
  };

  const startVerification = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const phone = cleanPhone(form.phone);

    try {
      const result = mode === "login"
        ? await requestLoginCode(phone)
        : await registerAccount({
            name: form.name.trim(),
            phone,
            email: form.email.trim() || null,
            marketingEmailSubscribed: form.marketingEmailSubscribed,
          });

      const challenge = responseData(result);
      if (!result?.success || !challenge) {
        setError(result?.message || "We couldn't send a verification code.");
        return;
      }

      setForm((current) => ({ ...current, phone }));
      setVerification({
        ...challenge,
        purpose: mode === "signup" ? "register" : challenge.purpose || "login",
      });
      setCode("");
      setStep("verify");
    } catch (requestError) {
      setError(requestError.message || "We couldn't send a verification code.");
    } finally {
      setBusy(false);
    }
  };

  const confirmCode = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const result = await confirmVerificationCode({
        phone: cleanPhone(form.phone),
        code: code.trim(),
        purpose: verification?.purpose,
      });
      const session = responseData(result);

      if (!result?.success || !session?.accessToken || !session?.user) {
        setError(result?.message || "That code didn't work. Check it and try again.");
        return;
      }

      LocalStorageService.setAuthData(session);
      dispatch(setAuthSession(session.user));
      dispatch(closeAuthDialog());
      setStep("details");
      setCode("");
      setVerification(null);
    } catch (requestError) {
      setError(requestError.message || "We couldn't verify that code.");
    } finally {
      setBusy(false);
    }
  };

  const resendCode = async () => {
    setBusy(true);
    setError("");

    try {
      const result = await requestVerificationCode(cleanPhone(form.phone));
      const challenge = responseData(result);
      if (!result?.success || !challenge) {
        setError(result?.message || "We couldn't send another code.");
        return;
      }
      setVerification(challenge);
      setCode("");
    } catch (requestError) {
      setError(requestError.message || "We couldn't send another code.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await signOutAccount();
      if (!result?.success) {
        setError(result?.message || "We couldn't sign you out. Please try again.");
        return;
      }
      LocalStorageService.clearAuthData();
      dispatch(clearAuthSession());
      dispatch(closeAuthDialog());
      setStep("details");
      setCode("");
      setVerification(null);
    } catch (requestError) {
      setError(requestError.message || "We couldn't sign you out. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    if (!busy) {
      dispatch(closeAuthDialog());
      setStep("details");
      setCode("");
      setVerification(null);
      setError("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
        className="relative w-full max-w-[440px] rounded-[24px] bg-white p-6 text-[#171717] shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close account dialog"
          onClick={close}
          disabled={busy}
          className="absolute right-4 top-4 rounded-full p-2 text-[#666] transition hover:bg-[#f3f1ee] disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {isLoggedIn ? (
          <div className="pt-5">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#957b60]">Your ELSE account</p>
            <h2 id="auth-dialog-title" className="text-2xl font-medium">{user?.name || "You're signed in"}</h2>
            {user?.email && <p className="mt-2 text-sm text-[#777]">{user.email}</p>}
            {user?.phone && <p className="mt-1 text-sm text-[#777]">{user.phone}</p>}
            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <button
              type="button"
              onClick={signOut}
              disabled={busy}
              className="mt-7 w-full rounded-full border border-[#d8d3ce] px-5 py-3 text-sm font-medium transition hover:bg-[#f8f6f3] disabled:opacity-50"
            >
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#957b60]">ELSE fragrances</p>
            <h2 id="auth-dialog-title" className="pr-8 text-2xl font-medium">
              {step === "verify" ? "Verify your phone" : mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mb-6 mt-2 text-sm leading-6 text-[#777]">
              {step === "verify"
                ? `Enter the 6-digit code sent to ${verification?.destination || form.phone}.`
                : "Sign in or create an account with your mobile number."}
            </p>

            {error && <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            {step === "details" ? (
              <form onSubmit={startVerification} className="space-y-4">
                {mode === "signup" && (
                  <>
                    <label className="block text-sm font-medium">
                      Name
                      <input
                        name="name"
                        value={form.name}
                        onChange={updateForm}
                        required
                        minLength={2}
                        autoComplete="name"
                        className="mt-2 w-full rounded-xl border border-[#dedad5] px-4 py-3 font-normal outline-none transition focus:border-[#8d6c4f] focus:ring-2 focus:ring-[#8d6c4f]/15"
                      />
                    </label>
                    <label className="block text-sm font-medium">
                      Email <span className="font-normal text-[#888]">(optional)</span>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateForm}
                        autoComplete="email"
                        className="mt-2 w-full rounded-xl border border-[#dedad5] px-4 py-3 font-normal outline-none transition focus:border-[#8d6c4f] focus:ring-2 focus:ring-[#8d6c4f]/15"
                      />
                    </label>
                  </>
                )}
                <label className="block text-sm font-medium">
                  Mobile number
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateForm}
                    required
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    aria-describedby="auth-phone-help"
                    className="mt-2 w-full rounded-xl border border-[#dedad5] px-4 py-3 font-normal outline-none transition focus:border-[#8d6c4f] focus:ring-2 focus:ring-[#8d6c4f]/15"
                  />
                  <span id="auth-phone-help" className="mt-2 block text-xs font-normal leading-5 text-[#888]">
                    Include your country code. We’ll text you a one-time code.
                  </span>
                </label>
                {mode === "signup" && form.email.trim() && (
                  <label className="flex items-start gap-3 text-xs leading-5 text-[#666]">
                    <input
                      name="marketingEmailSubscribed"
                      type="checkbox"
                      checked={form.marketingEmailSubscribed}
                      onChange={updateForm}
                      className="mt-1 accent-[#171717]"
                    />
                    Email me updates and offers from ELSE.
                  </label>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#39332e] disabled:cursor-wait disabled:opacity-60"
                >
                  {busy ? "Please wait…" : "Continue"}
                </button>
                <p className="pt-1 text-center text-sm text-[#777]">
                  {mode === "login" ? "New to ELSE?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === "login" ? "signup" : "login");
                      setError("");
                    }}
                    className="font-medium text-[#171717] underline underline-offset-4"
                  >
                    {mode === "login" ? "Create an account" : "Sign in"}
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={confirmCode} className="space-y-4">
                <label className="block text-sm font-medium">
                  Verification code
                  <input
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    minLength={6}
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="6-digit code"
                    className="mt-2 w-full rounded-xl border border-[#dedad5] px-4 py-3 text-center text-lg tracking-[0.35em] outline-none transition focus:border-[#8d6c4f] focus:ring-2 focus:ring-[#8d6c4f]/15"
                  />
                </label>
                {verification?.otp && (
                  <p className="rounded-lg bg-[#f6f3ef] px-3 py-2 text-xs text-[#71665a]">
                    Local test code: <b>{verification.otp}</b>
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy || code.length !== 6}
                  className="w-full rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#39332e] disabled:cursor-wait disabled:opacity-60"
                >
                  {busy ? "Verifying…" : "Verify and continue"}
                </button>
                <div className="flex items-center justify-between text-sm">
                  <button type="button" disabled={busy} onClick={() => { setStep("details"); setError(""); }} className="text-[#777] underline underline-offset-4">
                    Change number
                  </button>
                  <button type="button" disabled={busy} onClick={resendCode} className="font-medium underline underline-offset-4 disabled:opacity-50">
                    Resend code
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
}
