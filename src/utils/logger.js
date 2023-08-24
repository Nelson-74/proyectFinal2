import winston from "winston";

const devLogger = winston.createLogger({  
      level:"debug",
      format: winston.format.combine(winston.format.colorize({all:true}),
      winston.format.timestamp(),
      winston.format.printf(({timestamp, level, message}) => {
        return `${timestamp} ${level}:  ${message}`;
      })
    ),
    transports: [ new winston.transports.Console()]
    });

const prodLogger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports:[
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({filename:"./errors.log",
        level:"warning",})
        ]
        });
      
export { devLogger, prodLogger };