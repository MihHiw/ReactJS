import Product from "../../models/productModel";

const getProducts = async () => {
    try {
        const products = await Product.find().populate('categoryId');
        return products;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Lỗi khi lấy sản phẩm');
    }
};

export default getProducts;
