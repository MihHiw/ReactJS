import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import xlsx from 'xlsx';

import getComments from './queries/Comment/getComments';
import createComment from './queries/Comment/createComment';
import updateComment from './queries/Comment/updateComment';
import deleteComment from './queries/Comment/deleteComment';

import getProducts from './queries/Product/getProducts';
import createProduct from './queries/Product/createProduct';
import updateProduct from './queries/Product/updateProduct';
import deleteProduct from './queries/Product/deleteProduct';

import createInvoice from './queries/Invoice/createInvoice';
import getInvoices from './queries/Invoice/getInvoices';
import getGroups from './queries/Group/getGroups';
import Product from './models/productModel';

import getOrderInvoices from './queries/orderinvoice/getOrderInvoices';
import createOrderInvoice from './queries/orderinvoice/createOrderInvoice';
import deleteInvoice from './queries/Invoice/deleteInvoice';
import deleteOrderInvoice from './queries/orderinvoice/deleteOrderInvoice';
import OrderInvoice from './models/oderinvoiceModels';
import getEmployee from './queries/Employee/getEmployee';
import createEmployee from './queries/Employee/createEmployee';
import UpdateEmployee from './queries/Employee/UpdateEmployee';
import deleteEmployee from './queries/Employee/deleteEmployee';
import updateInvoice from './queries/Invoice/updateInvoice';





dotenv.config();

const app: Application = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

// Route Comments
app.get('/api/comments', async (req: Request, res: Response) => {
    try {
        const comments = await getComments();
        res.json(comments);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

app.post('/api/comments', async (req: Request, res: Response) => {
    try {
        const newComment = await createComment(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.put('/api/comments/:id', async (req: Request, res: Response) => {
    try {
        const updatedComment = await updateComment(req.params.id, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.delete('/api/comments/:id', async (req: Request, res: Response) => {
    try {
        const deletedComment = await deleteComment(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

// Routes Products
app.get('/api/products', async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

app.post('/api/products', async (req: Request, res: Response) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.put('/api/products/:id', async (req: Request, res: Response) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'An unknown error' });
        }
    }
});

app.delete('/api/products/:id', async (req: Request, res: Response) => {
    try {
        const deletedProduct = await deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
});

// Routes Invoices
app.get('/api/invoices', async (req: Request, res: Response) => {
    try {
        const invoices = await getInvoices();
        res.json(invoices);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

app.post('/api/invoices', async (req: Request, res: Response) => {
    try {
        const newInvoice = await createInvoice(req.body);
        res.status(201).json(newInvoice);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});


app.put('/api/invoices/:id', async (req: Request, res: Response) => {
    try {
        const UpdatedInvoice = await updateInvoice(req.params.id, req.body);
        if (!UpdatedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(UpdatedInvoice);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.delete('/api/invoices/:id', async (req: Request, res: Response) => {
    try {
        const deletedInvoice = await deleteInvoice(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'An error occurred while deleting the Invoice' });
    }
});

// Route Groups
app.get('/api/groups', async (req: Request, res: Response) => {
    try {
        const groups = await getGroups();
        res.json(groups);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});


// Routes OrderInvoices
app.get('/api/orderinvoices', async (req: Request, res: Response) => {
    try {
        const orderinvoices = await getOrderInvoices();
        res.json(orderinvoices);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});


app.get('/api/orderInvoices/:orderInvoiceId', async (req: Request, res: Response) => {
    const { orderInvoiceId } = req.params;

    try {
        const orderInvoice = await OrderInvoice.findById(orderInvoiceId);

        if (!orderInvoice) {
            return res.status(404).json({ error: 'OrderInvoice not found' });
        }

        res.json(orderInvoice);
    } catch (error) {
        console.error('Error retrieving OrderInvoice:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/api/orderinvoices', async (req: Request, res: Response) => {
    try {
        const newOrderInvoice = await createOrderInvoice(req.body);
        res.status(201).json(newOrderInvoice);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});


app.delete('/api/orderinvoices/:id', async (req: Request, res: Response) => {
    try {
        const deletedOrderInvoice = await deleteOrderInvoice(req.params.id);
        if (!deletedOrderInvoice) {
            return res.status(404).json({ message: 'OrderInvoice not found' });
        }
        res.json({ message: 'OrderInvoice deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice:', error);
        res.status(500).json({ message: 'An error occurred while deleting the Invoice' });
    }
});


const validateAndCleanData = (data: any[]): any[] => {
    const cleanedData: any[] = [];
    for (const item of data) {
        if (item['Tên sản phẩm'] && item['Giá tiền'] && item['Nhóm'] && item['Mô tả']) {
            const cleanedItem = {
                Name: item['Tên sản phẩm'],
                Price: parseFloat(item['Giá tiền']),
                GroupId: item['Nhóm'],
                Description: item['Mô tả'],
            };
            cleanedData.push(cleanedItem);
        } else {
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

const isError = (error: unknown): error is Error => {
    return (error as Error).message !== undefined;
};

app.post('/api/products/upload', upload.array('files'), async (req, res) => {
    const files = req.files as Express.Multer.File[];
    let errorOccurred = false;

    try {
        for (const file of files) {
            const filePath = file.path;

            if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const results = xlsx.utils.sheet_to_json(worksheet);

                try {
                    const cleanedData = validateAndCleanData(results);
                    await Product.insertMany(cleanedData);
                    fs.unlinkSync(filePath);
                } catch (validationError) {
                    console.error('Validation error:', validationError);
                    if (isError(validationError)) {
                        res.status(400).send('Validation error: ' + validationError.message);
                        errorOccurred = true;
                    }
                } finally {
                    if (!errorOccurred) {
                        res.status(200).send('Files uploaded and data saved successfully!');
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
        if (isError(error)) {
            res.status(500).send('Error processing files: ' + error.message);
        } else {
            res.status(500).send('An unknown error occurred while processing files');
        }
    }
});





//Routes Person
app.get('/api/employee', async (req: Request, res: Response) => {
    try {
        const employees = await getEmployee();
        res.json(employees);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

app.post('/api/employee', async (req: Request, res: Response) => {
    try {
        const newEmployee = await createEmployee(req.body);
        res.status(201).json(newEmployee);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.put('/api/employee/:id', async (req: Request, res: Response) => {
    try {
        const UpdatedEmployee = await UpdateEmployee(req.params.id, req.body)
        if (!UpdatedEmployee) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json(UpdatedEmployee);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});

app.delete('/api/employee/:id', async (req: Request, res: Response) => {
    try {
        const deletedEmployee = await deleteEmployee(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }

});



// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
