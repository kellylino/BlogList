describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    const user2 = {
      name: 'Starts',
      username: 'mat',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login test', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('Mat')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://www.cypress.io')
      cy.get('#create-button').click()
      cy.contains('a new blog created by cypress')

      cy.contains('a new blog cypress')
        .contains('view')
        .click()

      cy.contains(0)
        .contains('like')
        .click()
      cy.contains(1)

      cy.contains('Remove').click()
      cy.contains('a new blog cypress').should('not.exist')
    })
  })

  describe('remove button visiblity test', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.createBlog({
        title: 'a new blog',
        author: 'cypress',
        url: 'https://www.cypress.io',
        likes: 0
      })

      cy.contains('logout').click()
    })

    it('invisible', function () {
      cy.login({ username: 'mat', password: 'salainen' })
      cy.contains('login').click()
      cy.get('#username').type('mat')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mat logged in').should('exist')

      cy.contains('a new blog cypress')
        .contains('view')
        .click()
      cy.contains('Remove').should('not.exist')
    })
  })

  describe('sorting blog', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.createBlog({
        title: '1',
        author: 'cypress',
        url: 'https://www.cypress.io',
        likes: 1
      })

      cy.createBlog({
        title: '2',
        author: 'cypress',
        url: 'https://www.cypress.io',
        likes: 2
      })

      cy.createBlog({
        title: '3',
        author: 'cypress',
        url: 'https://www.cypress.io',
        likes: 3
      })
    })

    it.only('the blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.get('.blog').eq(0).should('contain', '3 cypress')
      cy.get('.blog').eq(1).should('contain', '2 cypress')
      cy.get('.blog').eq(2).should('contain', '1 cypress')
    })
  })
})