import Employee from '../../models/employeeModel'

const getEmployee = async () => {
    try {
        const employee = await Employee.find();
        return employee;

    } catch (error) {
        throw new Error('Error getting comments');

    }
}
export default getEmployee;