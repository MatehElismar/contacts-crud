import { Request, Response } from "express";
import { Contact } from "../models";

export class ContactCtrl {
  static async get(req: Request, res: Response) {
    const contacts = await Contact.find().lean();

    res.json(contacts);
  }

  static async post(req: Request, res: Response) {
    const contacts = await Contact.find().lean();

    res.json(contacts);
  }

  static async put(req: Request, res: Response) {
    const contacts = await Contact.find().lean();

    res.json(contacts);
  }

  static async delete(req: Request, res: Response) {
    const contacts = await Contact.find().lean();

    res.json(contacts);
  }
}
