const passportSetup = require("./passport");
const MongoStore = require("connect-mongo");
const authRoute = require("./routes/auth");
const session = require("express-session");
const flash = require("connect-flash")
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const debug = require("debug");
const http = require("http");
const cors = require("cors");

const app = express();

const dbcreds = require("./credentials");
app.use(express.urlencoded({ extended: true}));

const dbURI = `mongodb+srv://${dbcreds.clusterName}:${dbcreds.databasePassword}@cluster0.psmwl.mongodb.net/${dbcreds.databaseName}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("Connected to database!"); })
.catch(() => { console.log("Connection failed!"); });

app.use( session({ 
    secret: dbcreds.sessionSecret, 
    store: MongoStore.create({ mongoUrl: dbURI }), 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 100 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use( cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true, exposedHeaders: ['set-cookie'] }) );

app.use("/auth", authRoute);

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    // named pipe and port
    if (isNaN(port)) return val;
    if (port >= 0) return port;
  
    return false;
  };
  
  // Setting up callbacks
  const onError = error => {
    if (error.syscall !== "listen") throw error;
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
  };
  
  const onServerStart = () => {
    console.log('Weather App server is running on PORT: ', app.get('port'));
  }
  
  // Set the PORT
  const port = normalizePort(process.env.PORT || "3001");
  app.set("port", port);
  
  // Start the Server
  const server = http.createServer(app);
  server.on("error", onError);
  server.on("listening", onListening);
  server.listen(port, onServerStart);