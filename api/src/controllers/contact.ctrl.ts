import { Request, Response } from "express";
import { Contact } from "../models";

// CRUD operations of the Contact Model.
export class ContactCtrl {
  // get all the contacts
  static async get(req: Request, res: Response) {
    const contacts = await Contact.find().lean();

    res.json(contacts);
  }

  // add a new contact
  static post(req: Request, res: Response) {
    console.log("contact");

    const { fullName, email, phoneNumber } = req.body;
    const contact = new Contact({ fullName, email, phoneNumber });
    contact
      .save()
      .then((addedContact) => {
        console.log(addedContact);
        res.json({ ok: true, addedContact });
      })
      .catch((err) => {
        console.log(err);
        res.json({ ok: false, err });
      });
  }

  // update a contact by its Id
  static async put(req: Request, res: Response) {
    const { id } = req.params;

    // TODO: Field Validation.
    //

    Contact.findOne({ _id: id }).then((contact) => {
      if (contact) {
        // The new attribute is needed in order to return the updated contact.
        Contact.findOneAndUpdate({ _id: id }, req.body, { new: true })
          .then((updatedContact) => {
            res.json({ ok: true, updatedContact });
          })
          .catch((err) => {
            console.log(err.message);
            res.json({ ok: false, err });
          });
      } else {
        res.json({ ok: false });
      }
    });
  }

  // Delete a contact by its ID
  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    Contact.deleteOne({ _id: id }).then((info) => {
      res.json(info);
    });
  }
}
