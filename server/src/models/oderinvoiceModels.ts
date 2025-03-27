import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
    ID: mongoose.Types.ObjectId;
    Name: string;
    Quantity: number;
    Price: number;
    EmployeeID: mongoose.Types.ObjectId;
}

export interface IOrderInvoice extends Document {
    orderItems: IOrderItem[];
    totalAmount: number;
}

const orderinvoiceSchema: Schema = new Schema(
    {
        orderItems: [{
            EmployeeID: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
            ID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            Name: { type: String, required: true },
            Quantity: { type: Number, required: true },
            Price: { type: Number, required: true }
        }],
        totalAmount: { type: Number, required: true }

    },
    { versionKey: false }
);

const OrderInvoice = mongoose.model<IOrderInvoice>('OrderInvoice', orderinvoiceSchema);

export default OrderInvoice;
