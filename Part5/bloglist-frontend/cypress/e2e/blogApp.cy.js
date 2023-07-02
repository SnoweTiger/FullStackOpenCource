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
})