import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();

const port: number = 3000;

app.listen(port, () => {
  console.log(`🚀 Server ready at: http://localhost:${port}`);
});
