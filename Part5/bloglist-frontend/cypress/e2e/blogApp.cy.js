describe('Blog app', function() {

    const testUser = {
        name: 'Test User',
        username: 'testLogin',
        password: 'testPass'
    }

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, testUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown by default', function() {
        cy.get('input[name="Username"]').should('exist').should('be.empty')
        cy.get('input[name="Password"]').should('exist').should('be.empty')
        cy.contains('login').should('exist')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('input[name="Username"]').type(testUser.username)
            cy.get('input[name="Password"]').type(testUser.password)
            cy.contains('login').click()
            cy.contains(testUser.name)
        })

        it('fails with wrong credentials with message', function() {
            cy.get('input[name="Username"]').type(`${testUser.username}1`)
            cy.get('input[name="Password"]').type(testUser.password)
            cy.contains('login').click()
            cy.contains('invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {

        beforeEach(function() {
            cy.login({ username: testUser.username, password: testUser.password })
            cy.visit('http://localhost:3000')
        })

        it('A blog can be created', function() {

            const testBlog = {
                title: 'test_title',
                author: 'test_author',
                url: 'test_url',
            }
            cy.contains('Create new blog').click()

            cy.get('input[name="title"]').type(testBlog.title)
            cy.get('input[name="author"]').type(testBlog.author)
            cy.get('input[name="url"]').type(testBlog.url)
            cy.contains('save').click()

            cy.contains(testBlog.title).should('exist')
            cy.contains(testBlog.author).should('exist')
        })
    })
})