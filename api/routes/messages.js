const { Router } = require("express");
const Message = require("../models/message");

const router = Router();

router.get("/getAllMessages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: "desc" });;

        res.json({
            ok: true,
            messages,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
});

module.exports = router;