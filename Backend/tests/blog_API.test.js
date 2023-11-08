const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('test for blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('name be defined', async () => {
    const response = await api.get('/api/blogs')
    if(!response){
      expect(response.body.id).toBeDefined()
      expect(response.body._id).toBeUndefined()
    }
  })

  test('blog has beed added', async () => {
    const newBlog = {
      title: 'old',
      author: 'cutie',
      url: 'http://localhost:3001/api/blogs',
      likes: '297'
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hdCIsImlkIjoiNjRiZmIxOWVhN2U2YmRhZTNkNDk2ZDBiIiwiaWF0IjoxNjkwMzU1NjU1fQ.MvwahOM3Cis9E-H1DpkRou5Syb4Q8rtcRtFelqs2Ysw'

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    expect(contents).toContain('old')
  })

  test('blog add fail', async () => {
    const newBlog = {
      title: 'old',
      author: 'cutie',
      url: 'http://localhost:3001/api/blogs',
      likes: '297'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect(response => {
        expect(response.body).toContain( 'Unauthorized. Token missing or invalid')
      })

  })

  test('likes is missing', async () => {
    const newBlog = {
      title: 'good date',
      author: 'start',
      url: 'http://localhost:3001/api/blogs'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body[helper.initialBlogs.length].likes

    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
    expect(contents).toEqual(0)
  })

  test('without title and url', async () => {
    const newBlog = {
      author: 'start'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('deleted a blog', async () => {
    const blogAtBegin = await helper.blogsInDb()
    const deletedBlog = blogAtBegin[0]

    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length-1)

    const contents = blogAtEnd.map(b => b.title)

    expect(contents).not.toContain(deletedBlog.title)
  })

  test('updated a blog', async () => {
    const blogs = await helper.blogsInDb()
    const updatedBlog = {
      title: 'new',
      author: 'cute',
      url: 'http://localhost:3001/api/blogs',
      likes: 999
    }

    const updatedBlogID = blogs.find(b => b.title === updatedBlog.title).id

    await api
      .put(`/api/blogs/${updatedBlogID}`)
      .send(updatedBlog)
      .expect(200)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toContainEqual(expect.objectContaining(updatedBlog))
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation failed with a duplicate username', async () => {
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((response) => {
        expect(response.body.errors.username.message).toContain('`username` to be unique')
      })
  })

  test('creation failed with an invalid username', async () => {
    const newUser = {
      username: '',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((response) => {
        expect(response.body.errors.username.message).toContain('`username` is required.')
      })
  })

  test('creation failed with an invalid username length', async () => {
    const newUser = {
      username: 'as',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((response) => {
        expect(response.body.errors.username.message).toContain('`username` (`as`) is shorter than the minimum allowed length (3)')
      })
  })

  test('creation failed with an invalid password', async () => {
    const newUser = {
      username: 'cuite',
      name: 'Matti Luukkainen',
      password: ''
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toContain('password must be given')
  })

  test('creation failed with an invalid password length', async () => {
    const newUser = {
      username: 'cuite',
      name: 'Matti Luukkainen',
      password: 'as'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toContain('Password and username must be at least 3 characters long')
  })
})
