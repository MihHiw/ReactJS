import Employee, { IEmployee } from "../../models/employeeModel";

const createEmployee = async (personData: Partial<IEmployee>) => {
    const newEmployee = new Employee(personData);
    return await newEmployee.save();
};

export default createEmployee;