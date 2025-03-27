import Product, { IProduct } from "../../models/productModel";

const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        return updatedProduct;
    } catch (error: any) {
        throw new Error(`Error updating product: ${(error as Error).message}`);
    }
};

export default updateProduct;
