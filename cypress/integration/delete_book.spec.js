const { random } = require('faker');
const { BASE_URL, TIME_OUT } = require('../utils/constants');

const new_book = {
    name: random.words(4),
    author: "Mayumi Tamura"
}

describe("Given a created book", () => {
    
    before(() => {
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.wait(TIME_OUT);
        cy.get('#name').type(new_book.name);
        cy.wait(TIME_OUT)
        cy.get('#author').type(new_book.author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
    });

    describe("When the user wants to delete the book", () => {

        before(() => {
            cy.get("table").contains('tr', new_book.name).invoke("index").then((i) =>{
                cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
            })
            cy.get('[nztype="default"]').click();
        });

        it("Then the book should not be listed", () => {
            cy.get(
                'table').contains('td', new_book.name
                ).should('not.exist');
        });
    });
});