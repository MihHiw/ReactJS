import Product from "../../models/productModel";

const deleteProduct = async (id: string) => {
    return await Product.findByIdAndDelete(id);
};

export default deleteProduct;
