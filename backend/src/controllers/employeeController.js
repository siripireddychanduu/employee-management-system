const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

//create employee//
const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    if (req.user.role === "HR_MANAGER" && data.role === "SUPER_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "HR Manager cannot create Super Admin",
      });
    }

    const exists = await Employee.findOne({
      email: data.email,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    const employee = await Employee.create(data);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get all employees//
const getEmployees = async (req, res) => {
  try {
    const {
      search = "",
      department,
      role,
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (department) filter.department = department;
    if (role) filter.role = role;
    if (status) filter.status = status;

    const totalEmployees = await Employee.countDocuments(filter);

    const sortOptions = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    const employees = await Employee.find(filter)
      .populate("manager", "name employeeId")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort(sortOptions);

    res.status(200).json({
      employees,
      totalEmployees,
      currentPage: Number(page),
      totalPages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get employee by id//
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "manager",
      "name email",
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      employee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//update employee//
const updateEmployee = async (req, res) => {
  try {
    if (req.user.role === "HR_MANAGER" && req.body.role === "SUPER_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "HR Manager cannot assign Super Admin role",
      });
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Employee updated successfully",
      employee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//upload profile image//
const uploadProfileImage = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.profileImage = req.file.path;

    await employee.save();

    res.json({
      success: true,
      profileImage: employee.profileImage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//delete employee//
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  uploadProfileImage,
};
