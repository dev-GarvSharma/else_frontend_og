import { post } from "../../app/axiosWrapper";

export const sendContactMessage = (message) => post("contact", message);
