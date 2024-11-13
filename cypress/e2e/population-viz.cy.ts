describe('Prefecture Population Visualization', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/api/v1/prefectures').as('getPrefectures');
    cy.intercept('GET', '**/api/v1/population/composition/perYear**').as('getPopulation');
    cy.wait('@getPrefectures');
  });

  describe('Basic UI Elements', () => {
    it('displays the title and empty state', () => {
      cy.get('h1').should('contain', 'グラフで見る都道府県別人口推移');
      cy.contains('都道府県を選択してください').should('be.visible');
    });
  });

  describe('Chart Display and Data Type Selection', () => {
    it('displays total population chart when prefecture is selected', () => {
      cy.contains('東京都').click();
      cy.wait('@getPopulation');
      
      cy.get('.highcharts-title').should('contain', '総人口の推移');
      cy.get('.highcharts-yaxis .highcharts-axis-title')
        .should('contain', '総人口数');
    });

    it('can switch between different population types', () => {
      cy.contains('東京都').click();
      cy.wait('@getPopulation');

      const dataTypes = [
        { label: '年少人口', title: '年少人口の推移' },
        { label: '生産年齢人口', title: '生産年齢人口の推移' },
        { label: '老年人口', title: '老年人口の推移' }
      ];

      dataTypes.forEach(({ label, title }) => {
        cy.contains(label).click();
        cy.get('.highcharts-title').should('contain', title);
      });
    });

    it('displays correct chart elements', () => {
      cy.contains('東京都').click();
      cy.wait('@getPopulation');

      cy.get('.highcharts-legend-item').should('contain', '東京都');
      cy.get('.highcharts-yaxis-labels').should('exist');
    });
  });

  describe('Prefecture Selection', () => {
    it('can handle multiple prefecture selection', () => {
      cy.contains('東京都').click();
      cy.wait('@getPopulation');

      cy.contains('大阪府').click();
      cy.wait('@getPopulation');

      cy.contains('2件選択中').should('be.visible');
      cy.get('.highcharts-legend-item').should('have.length', 2);
      cy.get('.highcharts-legend-item').should('contain', '東京都');
      cy.get('.highcharts-legend-item').should('contain', '大阪府');
    });

    it('can clear prefecture selection', () => {
      cy.contains('東京都').click();
      cy.wait('@getPopulation');

      cy.contains('全ての選択を解除').click();

      cy.contains('都道府県を選択してください').should('be.visible');
      cy.contains('0件選択中').should('be.visible');
    });
  });
});