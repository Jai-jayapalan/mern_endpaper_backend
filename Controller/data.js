const blogModel = require('../models/models')

const addnewpost = async(req,res)=>{
    const newblogs = new blogModel({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        subCategory: req.body.subCategory,
        author: req.body.author
    })
    try{
        const blgs = await newblogs.save()
        res.status(201).json(blgs)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {addnewpost}