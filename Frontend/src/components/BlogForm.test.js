import { render, screen } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls the event handler with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const handleNewBlog = jest.fn()
  const title = 'title'
  const author = 'author'
  const url = 'http://test-blog-url.com'

  render(
    <BlogForm
      setNotification={() => {}}
      addNewBlog={handleNewBlog}
    />
  )

  const titleInput = screen.getByRole('textbox', { name: 'title' })
  const authorInput = screen.getByRole('textbox', { name: 'author' })
  const urlInput = screen.getByRole('textbox', { name: 'url' })
  const createButton = screen.getByText('create')

  await user.type(titleInput, title)
  await user.type(authorInput, author)
  await user.type(urlInput, url)
  await user.click(createButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0]).toEqual({
    title,
    author,
    url,
  })
})
