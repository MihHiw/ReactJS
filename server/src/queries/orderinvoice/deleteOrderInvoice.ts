import OrderInvoice from "../../models/oderinvoiceModels";

const deleteOrderInvoice = async (id: string) => {
    return await OrderInvoice.findByIdAndDelete(id);
};
export default deleteOrderInvoice;