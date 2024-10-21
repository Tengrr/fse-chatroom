describe('Frontend test cases', () => {
  it('Logging in with valid username and password should lead to the chat page', () => {
    cy.visit('http://127.0.0.1:3000')

    cy.get('#username').type('fengshiyu')
    cy.get('#password').type('aaaaa')

    cy.get('input[type="submit"]').click();

    cy.url().should('include', '/chatroom');
  })

  it('Logging in with invalid username and password should stay at the login page', () => {
    cy.visit('http://127.0.0.1:3000')

    cy.get('#username').type('fengshiyufake')
    cy.get('#password').type('aaaaa')

    cy.get('input[type="submit"]').click();

    cy.url().should('not.include', '/chatroom');
  })

  it('After the user post a message, it should be displayed in the chatroom', () => {
    cy.visit('http://127.0.0.1:3000')

    cy.get('#username').type('fengshiyu')
    cy.get('#password').type('aaaaa')

    cy.get('input[type="submit"]').click();

    cy.get('#message').type('Hello, this is a test message!');

    cy.get('input[type="submit"]').click();

    cy.get('.chat-messages').should('contain', 'Hello, this is a test message!');
  })

})
    