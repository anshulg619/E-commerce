import express from 'express';
import UserController from '../controller/userController.js';
import ProductController from '../controller/ProductController.js';
import PaytmController from '../controller/PaytmController.js';
import AdminController from '../controller/adminController.js';
import multer from 'multer'
import fs from 'fs/promises';
import path from 'path';
import {checkIsUserAuthenticated, adminMiddleware, userMiddleware} from '../middlewares/authMiddleware.js';
import {addCategory,getAllCategory,getCategory, deleteCategory} from '../controller/CategoryController.js';
import OrderController from '../controller/orderController.js';
import { deleteById, getCartItems, saveCartitems } from '../controller/CartController.js';

const router = express.Router();


//multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/userFiles/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({storage: storage})


//userRoutes
router.post('/saveUser',upload.single('profilePhoto') ,UserController.saveNewUser);
router.post('/login',UserController.getUser);


//adminRoutes
router.post('/saveAdmin', upload.single('profilePhoto') ,AdminController.saveNewAdmin);
router.post('/adminLogin',AdminController.getAdmin);

//productRoutes
router.get('/products', ProductController.getProducts); 
router.get('/product/:id', ProductController.getProductById);
router.post('/product/save', checkIsUserAuthenticated, adminMiddleware,ProductController.addProduct)
router.put('/product/addReview', checkIsUserAuthenticated,userMiddleware, ProductController.addReview)

//categoryRoutes
router.post('/category/create',checkIsUserAuthenticated,adminMiddleware,addCategory)
router.get('/category/list',checkIsUserAuthenticated,adminMiddleware,getCategory)
router.get('/category/getAllCategories',checkIsUserAuthenticated,adminMiddleware,getAllCategory)
router.delete('/category/delete/:id', checkIsUserAuthenticated,adminMiddleware,deleteCategory)


//orderRoutes
router.post('/order/save',checkIsUserAuthenticated,OrderController.saveOrder);
router.get('/order/getOrders',checkIsUserAuthenticated,adminMiddleware,OrderController.getOrders)


//cartRoutes
router.post('/cart/save',checkIsUserAuthenticated,userMiddleware,saveCartitems)
router.put('/cart/delete',checkIsUserAuthenticated,userMiddleware,deleteById)
router.get('/cart/getItems/:id', checkIsUserAuthenticated,userMiddleware,getCartItems)



//paymentRoutes
router.post('/payment', PaytmController.addPaymentGateway)
//router.post('/callback', PaytmController.paymentResponse)

//route to get files 
router.get('/userFiles/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(process.cwd(), 'public', 'userFiles', fileName);
        const fileStream = await fs.readFile(filePath);
        //res.setHeader('Content-Type', 'image/jpeg'); 
        res.end(fileStream);
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'File not found' });
    }
  });



export default router;