describe('Search BitoPro', () => {
  it('search BitoPro from Google', () => {
    cy.visit('https://www.google.com');

    cy.get('.gLFyf').type('BitoPro');
    cy.contains('Google 搜尋').click();

    cy.wait(1000);
    cy.contains('https://www.bitopro.com');
    cy.contains('BitoPro 台灣幣託交易所');
  });
});