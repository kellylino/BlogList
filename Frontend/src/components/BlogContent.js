import blogService from '../services/blogs'

const BlogContent = ({ blog, user, setBlogs, handleLike }) => {

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }

  const removeStyle = {
    background: 'lightblue',
    radius: 3
  }

  return (
    <div>
      <div> {blog.url} </div>
      <div> {blog.likes} <button onClick={handleLike}>like</button></div>
      <div> {user.username} </div>
      {blog.user.username === user.username && <div> <button onClick={handleDelete} style={removeStyle}>Remove</button> </div>}
    </div>
  )
}

export default BlogContent