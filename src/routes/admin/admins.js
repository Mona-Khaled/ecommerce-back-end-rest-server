const express = require("express");
const router = express.Router();
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { createAdmin, getUsers } = require("../../controller/admin/admins");

router.post("/admin/createAdmins", requireSignin, adminMiddleware, createAdmin);
router.get("/admin/getusers", requireSignin, adminMiddleware, getUsers);
module.exports = router;
