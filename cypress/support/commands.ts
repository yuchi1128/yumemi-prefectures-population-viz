/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    selectPrefecture(prefName: string): Chainable<Element>;
  }
}

Cypress.Commands.add('selectPrefecture', (prefName: string) => {
  cy.contains(prefName).click();
  cy.get('.highcharts-container').should('exist');
});