import express from "express";
import morgan from "morgan";
import path from "path";

export const app = express();

// App Variables
app.set("port", process.env.PORT);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
// Solamente cargamos los logs cuando estamos en entorno de desarrollo.
if (process.env.DEV) app.use(morgan("dev"));

// Set and serve angular app application as static
app.use("/", express.static(path.resolve("../dist/contacts-crud/")));
