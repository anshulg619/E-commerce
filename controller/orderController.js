import orderModel from '../models/orderModel.js'
import productModel from '../models/productModel.js'


class OrderController {

    static saveOrder = async (req,res) => {
        console.log(req.body);
        const {user, products, totalPrice, shippingAddress, paymentMethod} =req.body
        try {
            if(
                user&&products&&totalPrice&&shippingAddress&&paymentMethod
            ){
                const newOrder = new orderModel({
                    user:user,
                    products:products,
                    totalPrice:totalPrice,
                    shippingAddress:shippingAddress,
                    paymentMethod:paymentMethod,
                })

                const saveOrder = await newOrder.save();
                if(saveOrder){
                    res.status(200).json({message:"order placed successfully", orderId:saveOrder._id})
                }
            }else{
                res.status(400).json({message:"All fields are required"})
            }
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static getOrders = async (req,res) => {
        const {id} = req.params;
        
        const orders = await orderModel.find();

        if(orders && orders.length>0){
            res.status(200).json(orders)
        }else{
            res.status(500).json({message:"No records found"})
        }
    }
}

export default OrderController;