import { Routes, Route, Navigate } from "react-router-dom";
import Users from "../pages/users";
import Products from "../pages/products";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { PostUsers } from "../pages/users/handler";
import CobrancasDoDia from "../pages/payments";
import { Kanban } from "../pages/kanban/Kanban";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/users" element={<Users />} />
      <Route path="/users/create" element={<PostUsers />} />
      <Route path="/products" element={<Products />} />
      <Route path="/payments" element={<CobrancasDoDia />} />
      <Route path="/kanban" element={<Kanban />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
