import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptores";
import { Environment } from "../../../environment";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (erro) => errorInterceptor(erro)
);

export { Api };
