import express from "express";
import morgan from "morgan";
import cors from "cors";
import  { userRoutes, postRoutes, activityRoutes } from './routes/index.js'
import { requireAuth } from "./middleware/index.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use(requireAuth);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/activities", activityRoutes);
app.use("/tags", tagsRoutes);


app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
