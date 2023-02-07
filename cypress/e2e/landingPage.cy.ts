describe('landing page', () => {
  const URL = 'http://localhost:3000';

  it('open', () => {
    cy.visit(URL);
  });
})