import express from "express";
import cors from "cors";
import router from "./routes";
import * as dotenv from "dotenv";
import { exceptionHandler } from "./middlewares/globalError";
import logger from "./logger";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);
app.use(exceptionHandler);

const startServer = async () => {
  app
    .listen(port, () =>
      logger.info(`🚀 Server ready at: http://localhost:${port}`)
    )
    .on("error", (error) => {
      logger.error(error.message);
      process.exit(1);
    });
};

startServer();

export default app;
