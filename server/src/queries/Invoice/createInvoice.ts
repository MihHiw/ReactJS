import Invoice, { IInvoice } from '../../models/invoiceModel';
import { format, toZonedTime } from 'date-fns-tz';

const createInvoice = async (invoiceData: Partial<IInvoice>) => {
    try {
        const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
        const currentDate = new Date();
        const zonedCurrentDate = toZonedTime(currentDate, vietnamTimeZone);

        console.log('Zoned Current Date:', zonedCurrentDate);

        const formattedCurrentDate = format(zonedCurrentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone: vietnamTimeZone });

        console.log('Formatted Current Date (Vietnam Time):', formattedCurrentDate);

        const newData: Partial<IInvoice> = {
            ...invoiceData,
            ngayTao: formattedCurrentDate,
        };

        console.log('New Data:', newData);

        const newInvoice = new Invoice(newData);
        const savedInvoice = await newInvoice.save();

        console.log('Saved Invoice:', savedInvoice);

        return savedInvoice;
    } catch (error) {
        throw new Error(`Failed to create invoice: ${error}`);
    }
};

export default createInvoice;
