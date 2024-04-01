import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

// app.use("/api", protect, router);
// app.post("/user", createNewUser);
// app.post("/signin", signin);

export default app;
