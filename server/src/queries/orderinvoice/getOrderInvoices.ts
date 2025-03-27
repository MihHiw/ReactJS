import OrderInvoice from '../../models/oderinvoiceModels';

const getOrderInvoices = async () => {
    try {
        const orderinvoices = await OrderInvoice.find();
        return orderinvoices;
    } catch (error) {
        throw new Error('Error getting comments');
    }
};

export default getOrderInvoices;
