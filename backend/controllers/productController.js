const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

//create Product -- for only admin
exports.createProduct = catchAsyncErrors(
    async (req, res, next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }
)

//get all product
exports.getAllProducts = catchAsyncErrors(
    async (req, res) =>{

        const resultPerPage = 5

        const productCount = await Product.countDocuments()

        const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

        const products = await apiFeature.query
         
        res.status(200).json({
            success:true,
            products
        })
    }
)

//get product details
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next)=>{
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("Product not found", 404))
            
        }
    
        res.status(200).json({
            success:true,
            product,
            productCount,
        })
    }
)

//update Product -- for admin

exports.updateProduct =catchAsyncErrors(
    async (req, res, next)=>{
        let product = await Product.findById(req.params.id)
    
        if(!product){
            return res.status(500).json({
                success:false,
                message:"product not found"
            })
        }
    
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true,
            useFindAndModify:false
        })
    
        res.status(200).json({
            success:true,
            product
        })
    }
    
)
//delete product --admin

exports.deleteProduct = catchAsyncErrors(
    async (req,res,next)=>{
        const product = await Product.findById(req.params.id)
    
        if(!product){
            return next(new ErrorHandler("Product not found", 404))
        }
    
        await product.remove()
    
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    }
)