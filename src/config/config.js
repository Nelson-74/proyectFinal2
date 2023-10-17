import dotenv from "dotenv";
import { Command } from "commander";
const program = new Command();
program.option(" --mode <mode>","Modo de trabajo", "Development");
program.parse();
dotenv.config({
  path: program.opts().mode === "Development" ? ".env.development" : ".env",
  persistence: process.env.PERSISTENCE,
});
/* console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CLIENT_SECRET:", process.env.GITHUB_CLIENT_SECRET);
console.log("GITHUB_CALLBACK_URL:", process.env.GITHUB_CALLBACK_URL); */
export const config = {
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
};
export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,
};
