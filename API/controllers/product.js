import { db } from "../db.js";

export const getProducts = (_, res) => {
  const Query = "SELECT * FROM product";
  db.query(Query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
