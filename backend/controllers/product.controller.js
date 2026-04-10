import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/product.model.js';


// add product functionn
const addProduct = async (req, res) => {
    try {
        const {name, description, price, subCategory, category, sizes, bestSeller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) =>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url;
            })
        )
        const productData = {
            name, 
            description,
            price: Number(price),
            images: imagesUrl, 
            category, 
            subCategory, 
            sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
            bestSeller: bestSeller === "true" ? true : false,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();
        res.json({success: true, message: "Product added successfully"})
        
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while adding product" })
        
    }
}



// List  products functionn
const listProducts = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// remove product functionn
const removeProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


// single product info functionn
const singleProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


export {addProduct, listProducts, removeProduct, singleProduct};