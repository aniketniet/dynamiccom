const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // 2. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create new admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    return res
      .status(201)
      .json({ success: true, message: "Admin created successfully" });
  } catch (err) {
    console.error("[REGISTER_ADMIN_ERROR]", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on our end." });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // 2. Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 4. Generate token (for simplicity, we'll just return the admin ID)
    const token = admin._id;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("[LOGIN_ADMIN_ERROR]", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on our end." });
  }
};

exports.addVendor = async (req, res) => {
  const { name, email, password, storename, logo } = req.body;
  // 1. Basic validation
  if (!name || !email || !password || !storename) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // 2. Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ success: false, message: "Vendor already exists" });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate URL
    const url = `https://${storename
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}.your-domain.com`;

    // 4. Create new vendor
    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      storename,
      logo,
      url,
    });

    await vendor.save();

    return res
      .status(201)
      .json({ success: true, message: "Vendor created successfully" });
  } catch (err) {
    console.error("[ADD_VENDOR_ERROR]", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on our end." });
  }
};

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    return res.status(200).json({ success: true, vendors });
  } catch (err) {
    console.error("[GET_VENDORS_ERROR]", err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong on our end." });
  }
};
