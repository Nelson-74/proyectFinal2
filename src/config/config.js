import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option(" --mode <mode>","Modo de trabajo", "Development");
program.parse();

dotenv.config({
    path: program.opts().mode === "DEVELOPMENT",
    persistence: process.env.PERSISTENCE
});

export default{
    port : process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,
};

export const config = {
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL:process.env.GITHUB_CALLBACK_URL,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
    },
}; 