import { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url
    }

    {await props.addNewBlog(blog) }
    setTitle('')
    setAuthor('')
    setUrl('')
    { props.setNotification(`${title} created by ${author}`) }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            id='title'
            type="text"
            aria-label="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            aria-label="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            aria-label="url"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm