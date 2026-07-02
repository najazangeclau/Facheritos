import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

import "./config/firebase.config.js";

import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "API de productos funcionando correctamente.",
    endpoints: {
      products: "/api/products",
      login: "/auth/login"
    }
  });
});

app.use("/api/products", productsRoutes);
app.use("/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada."
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Error interno del servidor."
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
