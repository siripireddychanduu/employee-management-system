const Employee = require("../models/Employee");

const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      status: "Active",
    });

    const inactiveEmployees = await Employee.countDocuments({
      status: "Inactive",
    });

    const departmentCount = await Employee.distinct("department");

    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
        },
      },
    ]);

    res.json({
      dashboard: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentCount: departmentCount.length,
        departmentStats,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
