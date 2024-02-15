import { IColumns, IItem } from "../types";
import { Api } from "../../../shared/services/api/axios-config";

export class KanbanServices {
  static async getColumns(): Promise<IColumns[]> {
    try {
      const { data } = await Api.get("/kanban/columns");
      return data;
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw new Error("Falha ao obter as colunas");
    }
  }

  // static async createColumn(values: IColumns): Promise<void> {
  //   await axios.post("http://localhost:8800/columns", values);
  // }

  static async updateColumn(values: IColumns): Promise<void> {
    await Api.patch(`/columns/${values.id}`, values);
  }

  static async getItems(): Promise<IItem[]> {
    try {
      const { data } = await Api.get("/kanban/tasks");
      return data;
    } catch (error) {
      console.error("Erro na solicitação:", error);
      throw new Error("Falha ao obter as tarefas");
    }
  }

  // static async createItem(values: IItem): Promise<void> {
  //   await axios.post("http://localhost:8800/items", values);
  // }

  static async updateItemPosition(task: IItem): Promise<void> {
    await Api.patch(`/kanban/task/edit`, task);
  }
}
