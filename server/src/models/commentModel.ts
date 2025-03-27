import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    Name: string;
    Email: string;
    Text: string;
}

// Định nghĩa Schema cho Comment
const commentSchema: Schema = new Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Text: { type: String, required: true },
    },
    { versionKey: false }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
