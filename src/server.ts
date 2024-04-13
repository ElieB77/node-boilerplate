import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import * as dotenv from "dotenv";
import { exceptionHandler } from "./middlewares/globalError";
import logger from "./logger";
import helmet from "helmet";

const app = express();
dotenv.config();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use("/", router);
// Global error middleware (exceptionHandler) goes last 👇
app.use(exceptionHandler);

app.get("/health", (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});

const startServer = async () => {
  app
    .listen(port, () => logger.info(`🚀 Server ready at: ${baseUrl}:${port}`))
    .on("error", (error) => {
      logger.error(error.message);
      process.exit(1);
    });
};

startServer();

export default app;
