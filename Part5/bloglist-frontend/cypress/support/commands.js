// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    localStorage.removeItem('BlogUser')
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('BlogUser', JSON.stringify(body))
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {

    cy.request({
        method: 'POST',
        url: `${Cypress.env('BACKEND')}/blogs`,
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('BlogUser')).token}`
        },
        body: {
            'title': title,
            'author': author,
            'url': url,
            'likes': likes
        }
    })
})

// cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
//         cy.request('POST', `${Cypress.env('BACKEND')}/users/`, testUser)

// cy.request({
//     
//     
//     
//     
//   })