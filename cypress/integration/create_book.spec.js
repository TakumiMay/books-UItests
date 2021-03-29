const { random } = require('faker');
const { BASE_URL, TIME_OUT } = require('../utils/constants');

const new_book = {
    name: random.words(4),
    author: "Mayumi Tamura"
}

describe("When the user wants to create a book", () => {

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
    })

    it("Then the book should be listed with the right name and author", () => {
        cy.get(
            'table').contains('td', new_book.name
            ).should("be.visible");
        cy.get(
            'table').contains('td', new_book.author
            ).should("be.visible");
    })
});