import express from "express";

export const app = express();

// App Variables
app.set("port", process.env.PORT);

// Middlewares
