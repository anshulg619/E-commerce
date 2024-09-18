import mongoose from'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,        
    },
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    phoneNumber:{
        type:String,
        required:true,
        maxlength:10
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    profilePhoto:{
        type:String,
        trim:true
    }
    
});


// Create the User model
const User = mongoose.model('User', userSchema);

export default User;