import mongoose from "mongoose";

const connectToMongoDb = async () => {
    mongoose.connect(process.env.MongoDB_URL)
    .then( () => {console.log("MongoDB database is connected")})
    .catch((error) => {console.log(error.message)});
}

export default connectToMongoDb;