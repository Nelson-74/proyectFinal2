import { devLogger, prodLogger } from "../middlewares/logger.middleware.js";

export default (req, res, next) => {
  // Establece el logger según el entorno
  req.logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;
  next();
};
