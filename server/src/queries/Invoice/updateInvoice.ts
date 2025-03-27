import Invoice, { IInvoice } from "../../models/invoiceModel";

const updateInvoice = async (id: string, invoiceData: Partial<IInvoice>) => {
    return await Invoice.findByIdAndUpdate(id, invoiceData, { new: true });
};

export default updateInvoice;