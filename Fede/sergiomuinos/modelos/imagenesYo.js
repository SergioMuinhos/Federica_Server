"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesYo = void 0;
const mongoose_1 = require("mongoose");
const imagenesYoSchema = new mongoose_1.Schema({
    img: {
        type: String,
        unique: true
    }
});
exports.ImagenesYo = mongoose_1.model("ImagenesYo", imagenesYoSchema);
