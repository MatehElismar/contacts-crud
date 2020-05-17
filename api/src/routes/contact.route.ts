import { Router } from "express";
import { ContactCtrl } from "../controllers";

export const contactRoutes = Router();

contactRoutes
  .route("/")
  .get(ContactCtrl.get)
  .post(ContactCtrl.post)
  .put(ContactCtrl.put)
  .delete(ContactCtrl.delete);
