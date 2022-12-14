import { Router } from "express";
import { StudentCtrl } from "../controllers";

export const contactRoutes = Router();

contactRoutes
  .route("/:id?")
  .get(StudentCtrl.get)
  .post(StudentCtrl.post)
  .put(StudentCtrl.put)
  .delete(StudentCtrl.delete);
