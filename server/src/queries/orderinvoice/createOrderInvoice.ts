import OrderInvoice, { IOrderInvoice } from '../../models/oderinvoiceModels';


const createOrderInvoice = async (orderinvoiceData: Partial<IOrderInvoice>) => {
    const newOrderInvoice = new OrderInvoice(orderinvoiceData);
    return await newOrderInvoice.save();
};

export default createOrderInvoice;
