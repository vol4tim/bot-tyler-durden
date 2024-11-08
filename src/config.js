import dotenv from "dotenv";
import path from "path";
import logger from "./tools/logger";

const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(process.cwd(), `.env.` + env);
logger.info(`Loading .env file: ${envPath}`);
dotenv.config({ path: envPath });
