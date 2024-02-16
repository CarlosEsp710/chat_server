const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
    {
        userUid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

MessageSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model("Message", MessageSchema);