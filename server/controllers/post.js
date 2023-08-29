const fs = require('fs')
const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

const createPost = async (req,res) =>{
    
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const {token} = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info)=>{
        if (err) throw err
        const {
            title,
            summary,
            content
        } = req.body
    
        const newPost = await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id
        })
        res.json(newPost)
    })
}

const getPosts = async (req,res) =>{
    const posts = await Post.find()
                            .populate('author', ['username'])
                            .sort({createdAt: -1})
                            .limit(20)
    res.json(posts)
}

const getMyPosts = async (req,res) =>{
    const {id} = req.params

    const post = await Post.findById(id).populate('author',['username'])
    res.json(post)
}

const editMyPosts = async (req,res) =>{
    let newPath = ''
    if(req.file){
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const {token} = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info)=>{
        if (err) throw err
        const {
            id,
            title,
            summary,
            content
        } = req.body

        const updatePost = await Post.findById(id)
        const isAuthorTrue = JSON.stringify(updatePost.author) === JSON.stringify(info.id)
        
        if(!isAuthorTrue){
            return res.status(400).json('You cannot edit this blog as you are not the author')
        }
        await updatePost.updateOne({
            title,
            summary,
            content,
            cover:newPath ? newPath : updatePost.cover
        })
        res.json(updatePost)
    })
       
}

module.exports = {
    createPost,
    getPosts,
    getMyPosts,
    editMyPosts
}