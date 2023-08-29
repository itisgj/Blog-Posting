const multer = require('multer')
const uploadMiddleware = multer({
    dest: 'uploads/'
})

const express = require('express')
const router = express.Router()

const {createPost, getPosts, getMyPosts, editMyPosts} = require('../controllers/post')

router.route('/post').post(uploadMiddleware.single('file'), createPost).put(uploadMiddleware.single('file'), editMyPosts).get(getPosts)
router.get('/post/:id',getMyPosts)

module.exports = router