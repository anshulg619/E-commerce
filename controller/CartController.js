import Cart from "../models/cartModel.js"


export  const saveCartitems = async (req,res) => {
    const {user,product} = req.body

    try{
    if(user&&product){
        const isCart = await Cart.findOne({user:user})

        if(!isCart){
        const newCartItem = new Cart({
            user:user,
            products:[product]
        })

        const saveCartItem = await newCartItem.save();
        if(saveCartItem){
            res.status(200).json({message:'cart created'})
        }
    }else{

        const itemExist = isCart.products.find(item => item === product)

        if(!itemExist){
            isCart.products.push(product)
            const updateCart = await isCart.save();
            res.status(200).json({message:'item added to the cart',cart:updateCart})
        }else{
            res.status(200).json({message:'item already exist'})  
        }
    }
    }else{
        res.status(400).json({message:'all fields are required'})
    }
    }catch(error){
        res.status(400).json({message:error.message})
    }

}


export const getCartItems = async (req,res) => {
    const {id} = req.params

    try {
        const cartitems = await Cart.findOne({user:id}).populate('products')
        if(cartitems){
            res.status(200).json(cartitems)
        }else{
            res.status(400).json({message:"No record found"})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


export const deleteById = async (req,res) => {
    const {user,product} = req.body

    try{        
        const isCart = await Cart.findOne({user:user});
        if(isCart){
            if(isCart.products.includes(product)){
            isCart.products = isCart.products.filter(item => item !== product)
            const updatedCart = await isCart.save();
            res.status(200).json({message:"item removed successfully", cart:updatedCart})
            }else{
                res.status(400).json({message:"product not found"})
            }
        }else{
            res.status(400).json({message:"invalid product id"})
        }
    }catch(error){
        res.status(400).json({message:error.message})
    }
}