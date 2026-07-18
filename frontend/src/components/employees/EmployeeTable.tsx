import type { Employee } from "../../types/employee";

interface Props {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: Props) {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="p-4">ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} className="border-b text-center">
            <td className="p-4">{employee.employeeId}</td>

            <td>{employee.name}</td>

            <td>{employee.email}</td>

            <td>{employee.department}</td>

            <td>{employee.role}</td>

            <td>{employee.status}</td>

            <td>
              <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                Edit
              </button>

              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
