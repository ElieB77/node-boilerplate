import developmentLogger from "./developmentLogger";
import productionLogger from "./productionLogger";

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = developmentLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = productionLogger();
}

export default logger;
