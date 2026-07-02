import { login as loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const authData = await loginService({ username, password });

    return res.status(200).json({
      success: true,
      message: "Inicio de sesion exitoso.",
      ...authData
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Error interno del servidor."
    });
  }
};
