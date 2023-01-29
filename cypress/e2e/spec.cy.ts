
describe('landing page', () => {
  const URL = 'http://localhost:3000';

  it('open', () => {
    cy.visit(URL);
  });

  it('should open login page', () => {
    cy.visit(URL);
    cy.get('button').and('contain.text', 'Logowanie').click();
  });
})