import mongoose, { Schema, Document } from 'mongoose';

export interface IGroup extends Document {
    name: string;
}

const groupSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
    },
    { versionKey: false }
);

const Group = mongoose.model<IGroup>('Group', groupSchema);

export default Group;
