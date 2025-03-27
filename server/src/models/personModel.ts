import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
    Name: string;
    Email: string;
    Phone: number;
    Address: string;
}

const personSchema: Schema = new Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Phone: { type: Number, required: true },
        Address: { type: String, required: true },

    }, { versionKey: false }
);
const Person = mongoose.model<IPerson>('Person', personSchema);

export default Person;
