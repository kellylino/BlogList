import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogContent from './BlogContent'

test('renders blog title and author, but not URL or number of likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
    likes: 42,
  }

  const user = {
    username: 'testuser'
  }

  const xh_function = () => {}

  const { container } = render(<Blog blog={blog} user={user} setBlogs={xh_function}/>)

  expect(container).toHaveTextContent('Test Blog Test Author')
  expect(container).not.toHaveTextContent('http://test-url.com 42')
})

test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
    likes: 42,
  }

  const user = {
    username: 'testuser'
  }

  const xh_function = () => {}

  render(<Blog blog={blog} user={user} setBlogs={xh_function}/>)

  const button = screen.getByText('view')
  await userEvent.click(button)

  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText(blog.likes.toString())).toBeInTheDocument()
})

test('the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
    likes: 42,
  }

  const User = {
    username: 'testuser'
  }

  const xh_function = () => {}

  const mockHandler = jest.fn()

  render(<BlogContent blog={blog} user={User} setBlogs={xh_function} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

