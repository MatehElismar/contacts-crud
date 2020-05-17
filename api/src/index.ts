import { app } from "./app";
import { startDBConnection } from "./database";
import { routeAPI } from "./routes/";

// Route the app with only the api routes
routeAPI();

// Init Server
startDBConnection().then((res) => {
  app.listen(app.get("port"), () => {
    console.log("This api is running on port", app.get("port"));
  });
});
