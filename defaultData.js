import {products} from './config/data.js';
import productModel from './models/productModel.js';

const DefaultData= async () => {
    try{
        await productModel.insertMany(products);
        console.log("Data inserted successfully")

    }catch(error){
        console.log(error.message);
    }
}


export default DefaultData;