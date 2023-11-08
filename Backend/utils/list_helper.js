const dummy = (blogs) => {
  const bloglength = blogs.length
  return bloglength
}

const totalLikes = (blogs) => {
  return blogs[0].likes
}

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((preBlog, currentBlog) => {
    return preBlog.likes > currentBlog.likes? preBlog : currentBlog
  }, {})

  const { title, author, likes } = favoriteBlog

  const result = {
    title,
    author,
    likes
  }

  return result
}

const mostBlogs = (blogs) => {

  const authors = []
  blogs.map((n,i) => {
    if(!authors.filter(author => author.author === n.author).length) {
      authors[i] = {
        author: n.author,
        blog: 1
      }
    } else {
      authors.map(author => {author.author === n.author? author.blog++ : author.blog })
      i--
    }
  })

  const mostBlogs = authors.reduce((preAuthor, author) => {
    return preAuthor.blog > author.blog ? preAuthor : author
  })
  return mostBlogs
}

const mostLikes = (blogs) => {
  const likes = []

  blogs.map((n,i) => {
    if(!likes.filter(author => author.author === n.author).length) {
      likes[i] = {
        author: n.author,
        likes: n.likes
      }
    } else {
      likes.map(author => {author.author === n.author? (author.likes += n.likes) : author.likes })
      i--
    }
  })

  const mostLikes = likes.reduce((preAuthor, author) => {
    return preAuthor.likes > author.likes ? preAuthor : author
  })

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}