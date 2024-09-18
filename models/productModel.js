import mongoose from "mongoose";



const reviewSchema = new mongoose.Schema({
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
      },
      rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
      },
      comment: {
          type: String,
          required: true,
          trim: true
      },
      createdAt: {
          type: Date,
          default: Date.now
      },
      updatedAt: {
          type: Date,
          default: Date.now
      }
  }, { _id: false });

const productSchema = new mongoose.Schema({
  product_id:{
    type:String,
    trim:true
  },
  title: {
    type: Object,
    required:true
  },
  url: {
    type: String,
    required:true
  },
  color:[{
    title:{type:String},
  detailUrl: {
    type: [String],
  },
}],
  productHighlight: {
    type: String,
    trim: true
    },
    seller:{
      type:String,
      required:true
    },
  price: {
    type: Object,
    required:true
  },
  units: {
    type: Number,
  },
  description: {
    type: String,
    required:true
  },
  discount:{type:String},
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  reviews:[reviewSchema],
  tagline: {
    type: String,
  },
});

const productModel = mongoose.model("productt", productSchema);

export default productModel;



// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     productHighlight: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: true
//     },
//     subCategory: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Subcategory',
//         required: true
//     },
//     section: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Section',
//         required: true
//     },
//     rating: [{
//         average:{
//         type: Number,
//         min: 0,
//         max: 5,
//         default: 0
//     },
//     count:{
//         type:Number,
//         min:0,
//         default:0,
//     }
// }],
//     reviews: [reviewSchema],
//     markPrice: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     sellingPrice: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     discount: {
//         type: Number,
//         default: function() {
//             let calculate= ((this.markPrice - this.sellingPrice)/this.markPrice)*100;
//             return calculate;
//         }
//     }
// });

// // Middleware to update the discount before saving
// productSchema.pre('save', function(next) {
//     this.discount = calculate;
//     next();
// });

// // Create the Product model
// const Product = mongoose.model('Product', productSchema);

// export default {
//     Category,
//     Subcategory,
//     Section,
//     Product
// };
