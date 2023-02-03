import express from "express";
import { getFlavorOfMonth } from "../controller/scrape-controller.js";

const scrapeRouter = express();

scrapeRouter.get("/", getFlavorOfMonth);

export default scrapeRouter;
