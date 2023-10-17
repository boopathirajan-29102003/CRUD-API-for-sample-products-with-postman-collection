const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Product=require('./models/productModel')

app.use(express.json());

app.get('/products', async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

app.get('/products/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const products=await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

app.post('/product',async (req,res)=>{
    try {
        const product= await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:error.message});
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product)
            res.status(404).json({message:`cannot find any product in ${id}`});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params; 
        const product=await Product.findByIdAndDelete(id);
        if(!product)
            res.status(404).json({message:`cannot find any product in ${id}`});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
})

mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1:27017/API-1')
.then(()=>{
    console.log("database connected....")
    app.listen(3500,()=>{
    console.log("App running on port 3500...");
})
})
.catch((err)=>{
    console.error(err);
})