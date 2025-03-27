import Employee, { IEmployee } from "../../models/employeeModel";

const UpdateEmployee = async (id: string, employeeData: Partial<IEmployee>) => {
    return await Employee.findByIdAndUpdate(id, employeeData, { new: true });
};

export default UpdateEmployee;