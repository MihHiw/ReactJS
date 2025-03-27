import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    Name: string;
    Email: string;
    Phone: number;
    Address: string;
}

const employeeSchema: Schema = new Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Phone: { type: Number, required: true },
        Address: { type: String, required: true },

    }, { versionKey: false }
);
const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
