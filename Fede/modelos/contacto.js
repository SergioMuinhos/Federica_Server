"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const mongoose_1 = require("mongoose");
const contactoSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
    },
    mensaje: {
        type: String,
        required: [true, "El mensaje es obligatorio"],
    }
});
contactoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Contacto = mongoose_1.model("Contacto", contactoSchema);
