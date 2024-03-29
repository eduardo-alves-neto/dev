import { AxiosError } from "axios";

export const errorInterceptor = (erro: AxiosError) => {
  if (erro.message === "Network Error") {
    return Promise.reject(new Error("Erro de Conexão"));
  }

  if (erro.response?.status === 401) {
    // erro de autenticação
  }

  return Promise.reject(erro);
};
