import express from "express";
import scrapeRouter from "./routes/scrape-routes.js";
import cors from "cors";

const app = express();

const PORT = process.env.port || 3000;

app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use("/api/flavor", scrapeRouter);
app.use("/api", (req, res, next) => {
  res.send("Marylous News is live");
});

app.listen(PORT, () => {
  console.log(`Marylous News is running on PORT:${PORT}`);
});
