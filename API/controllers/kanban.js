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

// Função para atualizar a posição de uma tarefa
export const PatchTaskPosition = (req, res) => {
  const { id, column_id } = req.body;

  const query = `UPDATE tasks SET column_id = ${column_id} WHERE id = ${id}`;

  db.query(query, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json();
  });
};
