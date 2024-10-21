describe('Backend API - Login', () => {
  it('Should allow a valid user to log in', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/login',
      body: {
        username: 'fengshiyu',
        password: 'aaaaa'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('Should reject an invalid login attempt', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/login',
      failOnStatusCode: false,
      body: {
        username: 'fengshiyufake',
        password: 'aaaaa'
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('Should store user message when it is sent', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/login',
      body: {
        username: 'fengshiyu',
        password: 'aaaaa'
      }
    }).then((response) => {
      cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:3000/message',
        body: {
          message: 'Hello, this is a backend test message'
        }
      }).then((messageResponse) => {
        expect(messageResponse.status).to.eq(201);

        cy.request({
          method: 'GET',
          url: 'http://127.0.0.1:3000/message',

        }).then((response) => {
          expect(response.status).to.eq(200);

          const messages = response.body.data.messages;
          expect(messages).to.be.an('array');
          const lastMessage = messages[messages.length - 1];
          expect(lastMessage).to.have.property('content', 'Hello, this is a backend test message');
        });
      });
    });
  });
});
