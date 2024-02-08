import { db } from "../db.js";

export const getUsers = (_, res) => {
  const Query = "SELECT * FROM users";
  db.query(Query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const postUser = (req, res) => {
  const { name, email, phone, address } = req.body;
  const Query = `INSERT INTO users (name, email, phone, address) VALUES (?, ?, ?, ?)`;
  db.query(Query, [name, email, phone, address], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json({ message: "Usuário criado com sucesso!" });
  });
};

