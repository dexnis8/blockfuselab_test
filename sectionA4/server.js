const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const http = require("http");
const socketServer = require("./events/socketServer");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
// Inmporting routes
const userRoutes = require("./routes/userroutes");

socketServer.attach(server);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// api routes
app.use("/api/users", userRoutes);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
