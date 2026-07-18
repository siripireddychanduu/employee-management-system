const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "HR_MANAGER", "EMPLOYEE"],
      default: "EMPLOYEE",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    profileImage: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);