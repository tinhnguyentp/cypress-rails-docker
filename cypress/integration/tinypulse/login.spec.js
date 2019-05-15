describe('Validate login TInypulse', function(){
    beforeEach(function () {
        cy.visit('http://staging.tinyserver.info');
    })
    it('contains the Tinypulse in the title', function () {
        cy.title().should('contain', 'TINYpulse')

        // cy.url().should('contain', '')
    });
});
