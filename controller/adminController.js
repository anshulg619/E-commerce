import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

class AdminController {
  static saveNewAdmin = async (req, res) => {
    const { firstName, lastName, email, username, phoneNumber, password } =
      req.body;

    const isUser = await userModel.findOne({ email: email });

    try {
      if (!isUser) {
        if (
          firstName &&
          lastName &&
          email &&
          username &&
          phoneNumber &&
          password
        ) {
          const genSalt = await bcryptjs.genSalt(10);
          const hashPassword = await bcryptjs.hash(password, genSalt);

          const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            phoneNumber: phoneNumber,
            password: hashPassword,
            role:'admin',
            profilePhoto:req.file.filename
          });

          const saveUser = await newUser.save();
          if (saveUser) {
            res.status(200).json({ message: "user saved successfully" });
          }
        } else {
          res.status(400).json({ message: "All Feilds Are required" });
        }
      } else {
        res.status(400).json({ message: "user already exist" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getAdmin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
      if (username && password) {
        const isUser = await userModel.findOne({
          username: username});
          if (
            isUser.username == username && isUser.role==='admin' &&
            (await bcryptjs.compare(password, isUser.password))) {
              const token = jwt.sign({ userId: isUser._id }, "please subscribe", {
                expiresIn: "1d",
              });
  
              res
                .status(200)
                .json({
                  message: "logged in successfully",
                  token,
                  user:{email:isUser.email,
                    username:isUser.username,
                    id:isUser._id,
                    photo:isUser.profilePhoto,
                    role:isUser.role

                  }
                })
        } else {
          res.status(501).json({ message:"user not found" });
        }
      } else {
        res.status(204).json({ message: "All fields are required" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default AdminController;
