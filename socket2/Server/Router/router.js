const express = require('express');
const router = express.Router();
const userModel = require('../Model/userModel');
const likeModel = require('../Model/Model');
const mongoose = require('mongoose');


router.get('/get', async(req, res) =>{
    const user = await userModel.find()
    res.json({message: "found", data: user})
})
router.post('/create', async(req, res) =>{
    const {name} = req.body
    const user = await userModel.create({name})
    res.json({message: "created", data: user})
})
router.post('/:id/like', async (req, res) =>{
    const getUser = await userModel.findById(req.params.id)
    const createLike = new likeModel({user: req.params.id});

    createLike.user = getUser;
    createLike.save();

    getUser.like.push(mongoose.Types.ObjectId(createLike._id));
    getUser.save();

    res.json({
        message:"like", 
        data: createLike
    })
})

module.exports =  router;