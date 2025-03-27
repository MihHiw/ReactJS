import Invoice from "../../models/invoiceModel";

const deleteInvoice = async (id: string) => {
    return await Invoice.findByIdAndDelete(id);
};

export default deleteInvoice;