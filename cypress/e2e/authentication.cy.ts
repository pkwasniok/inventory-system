describe('register', () => {
  const URL = 'http://localhost:3000';
  const NAME = "Lorem Ipsum";
  const EMAIL = 'valid@test.com';
  const PASSWORD = 'ValidPassword123';

  beforeEach(() => {
    cy.visit(URL + '/register');
  });

  it('with existing user data', () => {
    cy.get('input[name=name]').type(NAME);
    cy.get('input[name=email]').type(EMAIL);
    cy.get('input[name=password]').type(PASSWORD);
    cy.get('button[type=submit]').click();

    cy.url().should('equal', URL + '/register');
  });
});

describe('login', () => {
  const URL = 'http://localhost:3000';
  const EMAIL = 'valid@test.com';
  const PASSWORD = 'ValidPassword123';

  beforeEach(() => {
    cy.visit(URL + '/login');
  })

  it('with valid credentials', () => {
    cy.get('input[name=email]').type(EMAIL);
    cy.get('input[name=password]').type(PASSWORD);
    cy.get('button[type=submit]').click();

    cy.url().should('equal', URL + '/app');
  });

  it('with invalid credentials', () => {
    cy.get('input[name=email]').type('invalid@gmail.com');
    cy.get('input[name=password]').type('InvalidPassword123');
    cy.get('button[type=submit]').click();

    cy.url().should('equal', URL + '/login');
  });

  it('with invalid email', () => {
    cy.get('input[name=email]').type('invalid@gmail.com');
    cy.get('input[name=password]').type(PASSWORD);
    cy.get('button[type=submit]').click();

    cy.url().should('equal', URL + '/login');
  });

  it('with invalid password', () => {
    cy.get('input[name=email]').type(EMAIL);
    cy.get('input[name=password]').type('InvalidPassword123');
    cy.get('button[type=submit]').click();

    cy.url().should('equal', URL + '/login');
  });
});
