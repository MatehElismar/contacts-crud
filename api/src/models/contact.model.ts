import { createSchema, Type, typedModel } from "ts-mongoose";

const ContactSchema = createSchema({
  id: Type.objectId(),
  fullName: Type.string(),
  phoneNumber: Type.string(),
  email: Type.string(),
});

export const Contact = typedModel("Contact", ContactSchema);
