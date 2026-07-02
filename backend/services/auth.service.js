import jwt from "jsonwebtoken";

const getCredentials = () => ({
  username: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD
});

export const login = ({ username, password }) => {
  const validCredentials = getCredentials();

  if (!username || !password) {
    const error = new Error("Debes enviar username y password.");
    error.statusCode = 400;
    throw error;
  }

  if (
    username !== validCredentials.username ||
    password !== validCredentials.password
  ) {
    const error = new Error("Credenciales invalidas.");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    tokenType: "Bearer"
  };
};
