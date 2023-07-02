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

        const testBlog = {
            title: 'test_title',
            author: 'test_author',
            url: 'test_url',
        }

        beforeEach(function() {
            cy.login({ username: testUser.username, password: testUser.password })
            cy.visit('http://localhost:3000')
        })

        it('A blog can be created', function() {

            cy.contains('Create new blog').click()

            cy.get('input[name="title"]').type(testBlog.title)
            cy.get('input[name="author"]').type(testBlog.author)
            cy.get('input[name="url"]').type(testBlog.url)
            cy.contains('save').click()

            cy.contains(testBlog.title).should('exist')
            cy.contains(testBlog.author).should('exist')
        })

        it('A blog can be liked', function() {
            cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
            cy.contains('Details').click()
            cy.contains('Like it!').click()
            cy.contains('Likes: 1').should('exist')
        })

        it.only('The user who created a blog can delete it', function() {
            cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })
            cy.contains('Details').click()
            cy.contains('Delete').click()
            cy.contains(testBlog.title).should('not.exist')
        })

        it.only('The user who did not create a blog can not see delete button', function() {
            cy.createBlog({ title: testBlog.title, author: testBlog.author, url: testBlog.url })

            const testUser2 = {
                name: 'Test User2',
                username: 'testLogin2',
                password: 'testPass2'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users/`, testUser2)
            cy.login({ username: testUser2.username, password: testUser2.password })
            cy.visit('http://localhost:3000')
            cy.contains('Details').click()
            cy.contains('Delete').should('not.exist')
        })
    })
})