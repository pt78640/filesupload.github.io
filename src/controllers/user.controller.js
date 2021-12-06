const express = require('express');

const router=express.Router();

const User=require('../models/user.model');

const upload= require('../middlewares/upload');

const fs=require('fs');

router.post("",upload.single("image"),async (req, res) => {
    try {
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            image: req.file.path
        });
        res.status(200).send(user);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.get("",async (req, res) => {
    try {
        const users= await User.find().lean().exec();
        res.status(200).send(users);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.patch("/:id",upload.single("image"),async (req, res) => {
    try {
        const users= await User.findById(req.params.id).lean().exec();
        const user=await User.findByIdAndUpdate(req.params.id,{
            first_name: req.body?.first_name,
            last_name: req.body?.last_name,
            image: req.file?.path
        },{new:true}).lean().exec();
        if(req.file?.path) {
            fs.unlinkSync(users.image)
            res.status(200).send(user);
           
        }
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async (req, res) => {
    try {
        const user=await User.findByIdAndDelete(req.params.id).lean().exec();
        fs.unlinkSync(user.image);
        res.send(user);
        
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

module.exports = router;