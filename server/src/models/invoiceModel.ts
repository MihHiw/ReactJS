import mongoose, { Document, Schema } from 'mongoose';
import { format, toZonedTime } from 'date-fns-tz';

export interface IInvoice extends Document {
    noiDung: string;
    totalAmount: number;
    orderInvoiceId: mongoose.Types.ObjectId;
    ngayTao: string;
}

const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

const invoiceSchema: Schema = new Schema(
    {
        noiDung: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        orderInvoiceId: { type: Schema.Types.ObjectId, ref: 'OrderInvoice', required: true },
        ngayTao: {
            type: String,
            default: () => {
                const currentDate = new Date();
                const zonedCurrentDate = toZonedTime(currentDate, vietnamTimeZone);
                return format(zonedCurrentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: vietnamTimeZone });
            },
        },

    },
    { versionKey: false }
);

const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);

export default Invoice;
