import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  userRoutes,
  postRoutes,
  commentRoutes,
  berryRoutes,
  tagRoutes,
  followRoutes,
  discoverRoutes,
} from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/berries", berryRoutes);
app.use("/tags", tagRoutes);
app.use("/followings", followRoutes);
app.use("/discover", discoverRoutes);

const PORT = parseInt(process.env.PORT || "8000");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});
