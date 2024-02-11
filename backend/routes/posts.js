const express = require('express')
const { getPost, getPosts, deletePost, updatePost, createPost } = require('../controllers/posts')
const { protect, authorize } = require('../middleware/auth')
const upload = require('../middleware/upload')
const router = express.Router()


router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.post('/posts', upload.array('photos', 12), protect, authorize('admin'), createPost)
router.delete('/posts/:id', protect, deletePost)
router.put('/posts/:id', protect, updatePost)



module.exports = router

