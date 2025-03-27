import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    Name: string;
    Price: number;
    GroupId: mongoose.Types.ObjectId;
    Description: string;
}

const productSchema: Schema = new Schema(
    {
        Name: { type: String, required: true },
        Price: { type: Number, required: true },
        GroupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
        Description: { type: String, required: true },
    },
    { versionKey: false }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
