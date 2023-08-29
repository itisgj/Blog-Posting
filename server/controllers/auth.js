const User = require("../models/User")
const jwt = require('jsonwebtoken')

const register = async (req,res) =>{

    const {username, password} = req.body

    try {
        const newUser = await User.create({
            username,
            password
        })
    
        res.status(201).json({
            id:newUser._id,
            username
        })
    } catch (error) {
        res.status(400).json(error)
    }
    
}

const login = async (req,res) =>{

    const {username, password} = req.body
    const existingUser = await User.findOne({username})
    const match = await existingUser.comparePassword(password)

    if(match){
        jwt.sign({username, id:existingUser._id}, process.env.JWT_SECRET, {} ,(err, token)=>{
            if (err) throw err
            res.cookie('token', token).json({
                id:existingUser._id,
                username
            })
        })
    }
    else{
        res.status(400).json('wrong credentials')
    }
}

const profile = async (req,res) =>{
    const {token} = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info)=>{
        if (err) throw err
        res.json(info)
    })
}

const logout = async (req,res) =>{
    res.cookie('token', '').json('ok')
}

module.exports = {
    register,
    login,
    profile,
    logout
}