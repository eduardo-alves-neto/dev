import { productsTypeRequest, productsTypeResponse } from "./types";
import { Api } from "../../../shared/services/api/axios-config";

export class productsTypeServices {
  static async get(): Promise<productsTypeResponse[]> {
    try {
      const { data } = await Api.get("/products"); // Certifique-se de que este é o caminho correto para a sua API.
      return data;
    } catch (error) {
      // Adicione um tratamento de erro adequado aqui
      console.error("Erro na solicitação:", error);
      throw new Error("Falha ao obter os dados do usuário"); // Customize a mensagem de erro conforme necessário
    }
  }

  static async create(values: productsTypeRequest): Promise<void> {
    await Api.post("/products", values);
  }

  static async patch(values: productsTypeRequest): Promise<void> {
    await Api.patch("/products", values);
  }
}
