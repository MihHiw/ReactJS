"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const xlsx_1 = __importDefault(require("xlsx"));
const getComments_1 = __importDefault(require("./queries/Comment/getComments"));
const createComment_1 = __importDefault(require("./queries/Comment/createComment"));
const updateComment_1 = __importDefault(require("./queries/Comment/updateComment"));
const deleteComment_1 = __importDefault(require("./queries/Comment/deleteComment"));
const getProducts_1 = __importDefault(require("./queries/Product/getProducts"));
const createProduct_1 = __importDefault(require("./queries/Product/createProduct"));
const updateProduct_1 = __importDefault(require("./queries/Product/updateProduct"));
const deleteProduct_1 = __importDefault(require("./queries/Product/deleteProduct"));
const createInvoice_1 = __importDefault(require("./queries/Invoice/createInvoice"));
const getInvoices_1 = __importDefault(require("./queries/Invoice/getInvoices"));
const getGroups_1 = __importDefault(require("./queries/Group/getGroups"));
const productModel_1 = __importDefault(require("./models/productModel"));
const getOrderInvoices_1 = __importDefault(require("./queries/orderinvoice/getOrderInvoices"));
const createOrderInvoice_1 = __importDefault(require("./queries/orderinvoice/createOrderInvoice"));
const deleteInvoice_1 = __importDefault(require("./queries/Invoice/deleteInvoice"));
const deleteOrderInvoice_1 = __importDefault(require("./queries/orderinvoice/deleteOrderInvoice"));
const oderinvoiceModels_1 = __importDefault(require("./models/oderinvoiceModels"));
const getEmployee_1 = __importDefault(require("./queries/Employee/getEmployee"));
const createEmployee_1 = __importDefault(require("./queries/Employee/createEmployee"));
const UpdateEmployee_1 = __importDefault(require("./queries/Employee/UpdateEmployee"));
const deleteEmployee_1 = __importDefault(require("./queries/Employee/deleteEmployee"));
const updateInvoice_1 = __importDefault(require("./queries/Invoice/updateInvoice"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
// Route Comments
app.get('/api/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, getComments_1.default)();
        res.json(comments);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/api/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = yield (0, createComment_1.default)(req.body);
        res.status(201).json(newComment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/api/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedComment = yield (0, updateComment_1.default)(req.params.id, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/api/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComment = yield (0, deleteComment_1.default)(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
// Routes Products
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, getProducts_1.default)();
        res.json(products);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield (0, createProduct_1.default)(req.body);
        res.status(201).json(newProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield (0, updateProduct_1.default)(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error' });
        }
    }
}));
app.delete('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield (0, deleteProduct_1.default)(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
}));
// Routes Invoices
app.get('/api/invoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield (0, getInvoices_1.default)();
        res.json(invoices);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/api/invoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newInvoice = yield (0, createInvoice_1.default)(req.body);
        res.status(201).json(newInvoice);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/api/invoices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UpdatedInvoice = yield (0, updateInvoice_1.default)(req.params.id, req.body);
        if (!UpdatedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(UpdatedInvoice);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/api/invoices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedInvoice = yield (0, deleteInvoice_1.default)(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json({ message: 'Invoice deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'An error occurred while deleting the Invoice' });
    }
}));
// Route Groups
app.get('/api/groups', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield (0, getGroups_1.default)();
        res.json(groups);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
// Routes OrderInvoices
app.get('/api/orderinvoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderinvoices = yield (0, getOrderInvoices_1.default)();
        res.json(orderinvoices);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.get('/api/orderInvoices/:orderInvoiceId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderInvoiceId } = req.params;
    try {
        const orderInvoice = yield oderinvoiceModels_1.default.findById(orderInvoiceId);
        if (!orderInvoice) {
            return res.status(404).json({ error: 'OrderInvoice not found' });
        }
        res.json(orderInvoice);
    }
    catch (error) {
        console.error('Error retrieving OrderInvoice:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
app.post('/api/orderinvoices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderInvoice = yield (0, createOrderInvoice_1.default)(req.body);
        res.status(201).json(newOrderInvoice);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/api/orderinvoices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrderInvoice = yield (0, deleteOrderInvoice_1.default)(req.params.id);
        if (!deletedOrderInvoice) {
            return res.status(404).json({ message: 'OrderInvoice not found' });
        }
        res.json({ message: 'OrderInvoice deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'An error occurred while deleting the Invoice' });
    }
}));
const validateAndCleanData = (data) => {
    const cleanedData = [];
    for (const item of data) {
        if (item['Tên sản phẩm'] && item['Giá tiền'] && item['Nhóm'] && item['Mô tả']) {
            const cleanedItem = {
                Name: item['Tên sản phẩm'],
                Price: parseFloat(item['Giá tiền']),
                GroupId: item['Nhóm'],
                Description: item['Mô tả'],
            };
            cleanedData.push(cleanedItem);
        }
        else {
            const missingFields = [];
            if (!item['Tên sản phẩm']) {
                missingFields.push('Tên sản phẩm');
            }
            if (!item['Giá tiền']) {
                missingFields.push('Giá tiền');
            }
            if (!item['Nhóm']) {
                missingFields.push('Nhóm');
            }
            if (!item['Mô tả']) {
                missingFields.push('Mô tả');
            }
            const errorMessage = `Missing required fields (${missingFields.join(', ')}): ${JSON.stringify(item)}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
    return cleanedData;
};
const isError = (error) => {
    return error.message !== undefined;
};
app.post('/api/products/upload', upload.array('files'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    let errorOccurred = false;
    try {
        for (const file of files) {
            const filePath = file.path;
            if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const workbook = xlsx_1.default.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const results = xlsx_1.default.utils.sheet_to_json(worksheet);
                try {
                    const cleanedData = validateAndCleanData(results);
                    yield productModel_1.default.insertMany(cleanedData);
                    fs_1.default.unlinkSync(filePath);
                }
                catch (validationError) {
                    console.error('Validation error:', validationError);
                    if (isError(validationError)) {
                        res.status(400).send('Validation error: ' + validationError.message);
                        errorOccurred = true;
                    }
                }
                finally {
                    if (!errorOccurred) {
                        res.status(200).send('Files uploaded and data saved successfully!');
                    }
                }
            }
        }
    }
    catch (error) {
        console.error('Error processing files:', error);
        if (isError(error)) {
            res.status(500).send('Error processing files: ' + error.message);
        }
        else {
            res.status(500).send('An unknown error occurred while processing files');
        }
    }
}));
//Routes Person
app.get('/api/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, getEmployee_1.default)();
        res.json(employees);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.post('/api/employee', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = yield (0, createEmployee_1.default)(req.body);
        res.status(201).json(newEmployee);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.put('/api/employee/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UpdatedEmployee = yield (0, UpdateEmployee_1.default)(req.params.id, req.body);
        if (!UpdatedEmployee) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(UpdatedEmployee);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
app.delete('/api/employee/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedEmployee = yield (0, deleteEmployee_1.default)(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
