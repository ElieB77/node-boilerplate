import app from "./index";
import logger from "./logger";

const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;

const startServer = async () => {
  app
    .listen(port, () => logger.info(`🚀 Server ready at: ${baseUrl}:${port}`))
    .on("error", (error) => {
      logger.error(error.message);
      process.exit(1);
    });
};

startServer();
