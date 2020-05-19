import { Router, Request, Response } from "express";
import cors from "cors";
import { app } from "../app";
import { contactRoutes } from "./contact.route";
const router = Router();

// Cors Configuration
const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:4200"],
  allowedHeaders: ["content-type", "content-length"],
  exposedHeaders: [],
};

// Here we define all the routes related to the api part of this server.
export function routeAPI() {
  router.get("/", (req: Request, res: Response) => {
    res.send("contacts-crud-api is up!");
  });

  router.use("/contacts", contactRoutes);

  app.use("/api", cors(corsOptions), router);
}
