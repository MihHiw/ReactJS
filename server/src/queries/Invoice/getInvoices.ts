import Invoice from '../../models/invoiceModel';

const getInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return invoices;
    } catch (error) {
        throw new Error('Error getting comments');
    }
};

export default getInvoices;
