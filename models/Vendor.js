const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    storename: { type: String, required: true },
    logo: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
