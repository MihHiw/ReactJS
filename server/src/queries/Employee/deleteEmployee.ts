import Employee, { IEmployee } from "../../models/employeeModel";

const deleteEmployee = async (id: string) => {
    return await Employee.findByIdAndDelete(id);
};
export default deleteEmployee;