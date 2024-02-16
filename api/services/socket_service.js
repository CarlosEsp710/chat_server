const { io } = require("../../index");
const Message = require("../models/message");
const User = require("../models/user");

io.on("connection", async (client) => {
    const uid = client.handshake.auth["user_uid"];

    // si es un usuario no autenticado
    if (!uid) {
        console.log("Cliente desconectado - no autenticado");
        return client.disconnect();
    }

    // Actualizar el estado del usuario a online
    console.log("Cliente autenticado");
    const user = await User.findById(uid);
    user.online = true;
    await user.save();

    io.emit("total-user", {})

    // User enters room
    // Global room (io), private room (client)
    client.join(uid);

    // Listen private-message
    client.on("private-message", async (payload) => {
        const message = new Message(payload);
        await message.save();
        io.emit("private-message", payload);
    });

    client.on("disconnect", async () => {
        console.log("Cliente desconectado");
        const user = await User.findById(uid);
        user.online = false;
        await user.save();
        io.emit("total-user", {})
    });
});