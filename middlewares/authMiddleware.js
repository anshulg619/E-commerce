import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


export const checkIsUserAuthenticated = async (req, res, next) =>{
    let  token ;
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            token = authorization.split(" ")[1];
            const {userId}= jwt.verify(token, "please subscribe");

            req.user = await userModel.findById(userId).select("--password");
            next();
        }catch(error){
            return res.status(401).json("Unauthorized User");
        }
    }else{
        return res.status(401).json("Unauthorized User");   
    }
}

export const adminMiddleware = (req,res,next) =>{
    if(req.user.role !== 'admin'){
        res.status(400).json({message:"AccessDenied"});
    }

    next();
}

export const userMiddleware = (req,res,next) =>{
    if(req.user.role !== 'user'){
        res.status(400).json({message:"AccessDenied"});
    }

    next();
}
