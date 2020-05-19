import { createSchema, Type, typedModel } from "ts-mongoose";

const ContactSchema = createSchema({
  fullName: Type.string({ required: true }),
  phoneNumber: Type.string({ required: true }),
  email: Type.string({ required: false }),
});

export const Contact = typedModel("Contact", ContactSchema);
