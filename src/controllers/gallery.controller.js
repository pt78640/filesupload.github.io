const express = require('express');

const Gallery = require('../models/gallery.model');

const router=express.Router();

const upload= require('../middlewares/upload');

const fs=require('fs');

router.get('',async (req, res) => {
    try {
        const gallery = await Gallery.find().lean().exec();
        res.status(201).send(gallery);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.post("",upload.any("images"),async (req, res) => {
    try {
        let arr=req.files.map(file => file.path);
        const gallery= await Gallery.create({
            images: arr
        });
        res.status(250).send(gallery);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async (req, res) => {
    try {
        const gallery=await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        res.send(gallery);
        for(let i=0; i<gallery.images.length; i++) {
            fs.unlinkSync(gallery.images[i]);
        }
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})
module.exports =router;