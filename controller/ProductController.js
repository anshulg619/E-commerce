import productModel from '../models/productModel.js'


class ProductController{

    static addProduct = async (req,res) => {
        const {title, url, color, description, category, seller, price, productHighlight, units, product_id } = req.body
        try {
            const product = await productModel.findOne({product_id:product_id})
            console.log(product)
            if (!product){
                if(
                    title&&url&&color&&description&&category&&seller&& price
                ){
                    const newProduct = new productModel({
                        product:product_id,
                        title:title, 
                        url:url, 
                        color:color, 
                        description:description, 
                        category:category, 
                        seller:seller,
                        price:price,
                        productHighlight:productHighlight,
                        units:units,
                        tagline:req.body.tagline,
                        discount:req.body.discount
                    })

                    const saveProduct = await newProduct.save();
                    if(saveProduct){
                        res.status(200).json({message:"product added successfully"})
                    }
                }else{
                    res.status(400).json({message:"All fields are required"})
                }
            }else{
                res.status(400).json({message:"product has already been added"})
            }
            
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static getProducts = async (req, res) =>{

        try {            
            const products = await  productModel.find();
            if(products){
            res.status(200).json(products);
            }else{res.status(404).json({message:"record not found"})}
        } catch (error) {
            res.status(400).json({message:error.message});            
        }
    }

    static getProductById = async (req,res) => {
        const {id} = req.params

        try {
            const fetchProductById = await productModel.findById({_id:id})
            if(fetchProductById){
                res.status(200).json(fetchProductById);
            }else{
                res.status(404).json({message:'invalid product Id'})
            }
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static addReview = async (req, res) => {
        const { user, product, rating, comment } = req.body;
    
        try {
            // Check if the product exists
            const isProduct = await productModel.findById(product);
    
            // Validate input
            if (!isProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            if (!user || !rating || !comment) {
                return res.status(400).json({ message: 'User, rating, and comment are required' });
            }
    
            // Push the new review to the product's reviews array
            isProduct.reviews.push({
                user: user,
                rating: rating,
                comment: comment,
            });
    
            // Save the updated product document
            const updatedProduct = await isProduct.save();
    
            // Respond with the updated product
            return res.status(200).json({
                message: 'Review added successfully',
                product: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    };
}

export default ProductController;