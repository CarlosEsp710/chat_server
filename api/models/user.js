const { Schema, model } = require("mongoose");

const UserSchema = Schema(
    {
        deviceId: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        online: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("User", UserSchema);