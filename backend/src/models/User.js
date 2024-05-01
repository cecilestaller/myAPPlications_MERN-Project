import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        email: { type: String, required: true },
        pwHash: { type: String, required: true },
        pwSalt: { type: String, required: true },
    }, {collection: "users", timestamps: true}
)

// ===== Pre-Save-Hook
// EMAIL toLowerCase bevor sie gespeichter wird
// --> bei registrierung & durch ".isModified()" bei aktualisierung der Email
userSchema.pre("save", function () {
    const user = this;
    if (user.isModified("email")) {
        user.email = user.email.toLowerCase();
    }
});

userSchema.statics.findByEmail = function (email) {
    if (typeof email !== "string") return null;
    return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);

export default User;