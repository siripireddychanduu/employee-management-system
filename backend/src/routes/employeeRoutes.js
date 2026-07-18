const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  uploadProfileImage,
} = require("../controllers/employeeController");

// Super Admin & HR
router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  createEmployee,
);

// All logged-in users
router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  getEmployees,
);

router.get("/:id", authenticate, getEmployeeById);
router.post(
  "/upload/:id",
  authenticate,
  upload.single("profileImage"),
  uploadProfileImage,
);

// Super Admin & HR
router.put(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "HR_MANAGER"),
  updateEmployee,
);

// Only Super Admin
router.delete("/:id", authenticate, authorize("SUPER_ADMIN"), deleteEmployee);

module.exports = router;
