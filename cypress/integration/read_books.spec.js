const { BASE_URL, TIME_OUT } = require('../utils/constants');

describe("When the user wants to list the existing books", () => {

    before(()=>{
        cy.visit(BASE_URL);
    });

    it("Then there should be more than zero elements",() =>{
        cy.get(
            'table').find('tr'
            ).should('have.length.greaterThan', 0);
    });

});