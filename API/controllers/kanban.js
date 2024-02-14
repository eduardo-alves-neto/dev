import { db } from "../db.js";

// Função para buscar colunas
export const getColumns = (_, res) => {
  const query = "SELECT * FROM columns";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

// Função para buscar tarefas
export const getTasks = (_, res) => {
  const query = "SELECT * FROM tasks";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
