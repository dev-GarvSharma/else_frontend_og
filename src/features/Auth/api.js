import { post } from "../../app/axiosWrapper";

export const requestLoginCode = (phone) => post("auth/login", { phone });

export const registerAccount = (details) => post("auth/register", details);

export const requestVerificationCode = (phone) =>
  post("auth/verification/request", { phone });

export const confirmVerificationCode = ({ phone, code, purpose }) =>
  post("auth/verification/confirm", { phone, code, purpose });

export const signOutAccount = () => post("auth/logout", {});
