import Product, { IProduct } from "../../models/productModel";

const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
    try {
        const product = new Product(productData);
        const savedProduct = await product.save();
        return savedProduct;
    } catch (error: any) {
        throw new Error(`Error creating product: ${(error as Error).message}`);
    }
};

export default createProduct;
