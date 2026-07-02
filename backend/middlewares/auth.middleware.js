import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado."
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Formato de token invalido. Usa: Bearer <token>"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expirado."
      });
    }

    return res.status(401).json({
      success: false,
      message: "Token invalido."
    });
  }
};
