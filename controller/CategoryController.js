import slugify from 'slugify'; 
import Category from '../models/categoryModel.js';

const createCategoryList = (categories, parentId = null) => {
    let categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId === undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (let cat of category) {
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategoryList(categories, cat._id)
        });
    }

    return categoryList;
};

export const addCategory = async (req, res) => {
    const { name, parentId } = req.body;

    try {
        if (name) {
            const categoryObject = {
                name: name,
                slug: slugify(name)
            };

            if (parentId) {
                categoryObject.parentId = parentId;
            }

            const newCategory = new Category(categoryObject); 

            const savedCategory = await newCategory.save();
            if (savedCategory) {
                res.status(201).json({ message: "Category added successfully", category: savedCategory });
            }
        } else {
            res.status(400).json({ message: 'Name field is required' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const Categories = await Category.find();

        if (Categories.length > 0) {
            const categoryList = createCategoryList(Categories);
            res.status(200).json({ categoryList });
        } else {
            res.status(400).json({ message: "No records found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getAllCategory = async (req, res) => {
    try {
        const Categories = await Category.find();

        if (Categories.length > 0) {
            res.status(200).json(Categories);
        } else {
            res.status(400).json({ message: "No records found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategory = async (req,res) => {
        const {id} = req.params
    try {
        const isDeleted = await Category.findByIdAndDelete({_id:id})
        
        if(isDeleted){
            res.status(200).json({message:'category deleted successfully'})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
