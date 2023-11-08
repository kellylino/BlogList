const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  response.json(blog)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes, comment } = request.body

  if (!title || !author || !url) {
    return response.status(400).json({
      error: 'input cannot be empty'
    })
  }

  const user = await User.findById(request.userId)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: request.userId,
    comment: comment
  })

  const savedBlog = await blog.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user')

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(populatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const userID = blog.user.toString()

  const user = await User.findById(request.userId)

  if (userID === request.userId) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
    await user.save()
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'invalid user'
    })
  }
})

// blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
//   const { title, author, url, likes } = request.body
//   const blogs = await Blog.findById(request.params.id)

//   const userID = blogs.user.toString()

//   const blog = {
//     title: title,
//     author: author,
//     url: url,
//     likes: likes,
//     user: request.userId
//   }

//   if (userID === request.userId) {
//     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     response.status(200).json(updatedBlog)
//   } else {
//     return response.status(401).json({
//       error: 'invalid user'
//     })
//   }
// })

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, comment } = request.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: request.userId,
    comment: comment
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter