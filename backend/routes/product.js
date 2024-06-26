//routes for products
import express from "express";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsByUserId } from "../controllers/product.controller.js";


const router = express.Router();

router.get('/', getAllProducts);
//router to get product by its id
router.get('/get/:id', getProductById);
//
router.get('/merchant/:id', getProductsByUserId);
router.patch('/update/:id', updateProduct);
//delete the product based on ID
router.delete('/delete/:id', deleteProduct);
//to add a new product
router.post('/add', addProduct);


export default router;