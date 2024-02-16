const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/getUser", async (req, res) => {
    try {
        const deviceId = req.body["device_id"];

        let user = await User.findOne({ deviceId });

        if (!user) {
            user = new User({
                deviceId,
                nickname: generateRandomNickname(),
            });

            await user.save();
        }

        res.json({
            ok: true,
            user,

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
});

router.post("/updateNickname", async (req, res) => {
    try {
        const { uid, nickname } = req.body;

        const user = await User.findById(uid);
        user.nickname = nickname;
        await user.save();

        res.json({
            ok: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
});

router.get("/getTotalUsers", async (req, res) => {
    try {
        // return the total number of users online
        const users = await User.find({ online: true });

        res.json({
            ok: true,
            total: users.length,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
});

// Generar un nickname aleatorio de 10 caracteres
function generateRandomNickname() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let nickname = "";

    for (let i = 0; i < 10; i++) {
        nickname += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return nickname;
}

module.exports = router;