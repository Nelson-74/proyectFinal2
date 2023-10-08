import winston from "winston";

export const devLogger = () => {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [new winston.transports.Console()],
  });
};

export const prodLogger = () => {
  return winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "./errors.log", level: "error" }),
      new winston.transports.File({ filename: "./fatal-errors.log", level: "fatal" }),
    ],
  });
};
export const logger = process.env.NODE_ENV === "production" ? prodLogger() : devLogger();

