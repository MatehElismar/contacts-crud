import { Router, Request, Response } from "express";
import cors from "cors";
import { app } from "../app";
import { contactRoutes } from "./contact.route";
const router = Router();

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:4200"],
  allowedHeaders: [],
  exposedHeaders: [],
};

export function routeAPI() {
  router.get("/", (req: Request, res: Response) => {
    res.send("contacts-crud-api is up!");
  });

  router.use("/contacts", contactRoutes);

  app.use("/api", cors(corsOptions), router);
}
