import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, openAuthDialog } from "../Auth/authSlice";

export default function AccountGate({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) dispatch(openAuthDialog());
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <main className="mx-auto min-h-[55vh] max-w-3xl px-5 py-20 text-center text-[#171717]">
        <h1 className="text-3xl font-medium">Sign in to view your account</h1>
        <p className="mt-3 text-neutral-600">Your orders and saved addresses are available after signing in.</p>
        <button onClick={() => dispatch(openAuthDialog())} className="mt-6 rounded-full bg-[#171717] px-7 py-3 text-sm text-white">Sign in or create account</button>
      </main>
    );
  }

  return children;
}
