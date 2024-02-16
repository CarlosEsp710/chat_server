require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require("path");

// DB Connection
require("./api/database/config").dbConnection();

// Express Server
const app = express();

// Parser Body
app.use(express.json());
app.use(cors());
// Socket Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
require("./api/services/socket_service");

// Public Path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Routes
app.use("/api/users", require("./api/routes/users"));
app.use("/api/messages", require("./api/routes/messages"));

server.listen(process.env.PORT, '0.0.0.0', (err) => {
    if (err) throw new Error(err);

    console.log("Servidor corriendo en puerto", process.env.PORT);
});
