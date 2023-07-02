describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown by default', function() {
        cy.get('input[name="Username"]').should('exist').should('be.empty')
        cy.get('input[name="Password"]').should('exist').should('be.empty')
        cy.contains('login').should('exist')
    })
})