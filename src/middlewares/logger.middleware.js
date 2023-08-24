import { devLogger, prodLogger } from "../utils/logger.js";

startLogger = (req, res, next) => {
  // Establece el logger según el entorno
  req.logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;
  next();
};
export default startLogger;