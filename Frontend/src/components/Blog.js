import Togglable from './Togglable'
import BlogContent from './BlogContent'
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const blogRef = useRef()

  const [button, setButton] = useState('view')

  const handleView = () => {
    setButton(button === 'view' ? 'hide' : 'view')
    blogRef.current.togglaVisibility()
  }


  const handleLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: user.id
    }

    await blogService.update(blog.id, updatedBlog)
    blogService.getAll().then(blogs => setBlogs(blogs))
  }

  return (
    <div style={blogStyle}>
      <div className='blog'> {blog.title} {blog.author} <button onClick={handleView}> {button} </button></div>
      <Togglable ref={blogRef}>
        {button === 'hide' && <BlogContent blog={blog} user={user} setBlogs={setBlogs} handleLike={handleLike}/>}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog