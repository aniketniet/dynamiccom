const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/admin-register", adminController.registerAdmin);
router.post("/admin-login", adminController.loginAdmin);

router.post("/add-vendor", adminController.addVendor);
router.get("/get-vendors", adminController.getVendors);

// Add your admin/vendor routes here in future
module.exports = router;
