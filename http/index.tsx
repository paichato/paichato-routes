import axios from "axios";


export const http = axios.create({
  baseURL: "http://127.0.0.1:3333",
  timeout: 7000,
  timeoutErrorMessage: "Servidor indisponível. Tente novamente mais tarde.",
});
