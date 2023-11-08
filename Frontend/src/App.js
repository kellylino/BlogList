import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [classname, setClassname] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const getUser = window.localStorage.getItem('user')
    if (getUser) {
      const user = JSON.parse(getUser)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const blogRef = useRef()

  const notificationFadeOut = () => {
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setClassname('success')
      setNotification(`${username} loggin successful`)
      setUsername('')
      setPassword('')
      notificationFadeOut()
    } catch (exception) {
      setClassname('error')
      setNotification(exception.response.data.error)
      notificationFadeOut()
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      setClassname('success')
      blogRef.current.togglaVisibility()
      notificationFadeOut()
      blogService.getAll().then(blogs => setBlogs(blogs))
    } catch (exception) {
      setClassname('error')
      setNotification(exception.response.data.error)
      notificationFadeOut()
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div>
        {!user &&
          <div>
            <h2>login in to application</h2>
            <Notification notification={notification} classname={classname} />
            <Login
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </div>
        }
      </div>
      <div>
        {user &&
          <div>
            <h2>blogs</h2>
            <Notification notification={notification} classname={classname} />
            <p>{user.username} logged in <button onClick={() => handleLogout()}>logout</button></p>
            <Togglable buttonLabels={['create new blog', 'cancel']} ref={blogRef}>
              <BlogForm
                addNewBlog={addNewBlog}
                setNotification={setNotification}
              />
            </Togglable>
            {sortedBlogs.map(blog => <div key={blog.id}> <Blog blog={blog} user={user} setBlogs={setBlogs} /> </div>)}
          </div>
        }
      </div>
    </div>
  )
}

export default App