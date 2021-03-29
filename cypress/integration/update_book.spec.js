const { BASE_URL, TIME_OUT } = require('../utils/constants');
const { random } = require('faker');

const createdBook = {
    name: random.words(4),
    author: "Mayumi Tamura"
}

let updatedBook;

describe("Given a created book", () => {

    before(() => {
        cy.visit(BASE_URL);
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.wait(TIME_OUT);
        cy.get('#name').type(createdBook.name);
        cy.wait(TIME_OUT)
        cy.get('#author').type(createdBook.author);
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();
        cy.contains('10 / page').click();
        cy.contains('50 / page').click();
    });

    describe("When the user wants to update the book", () => {

        before(() => {
            updatedBook = {
                name: random.words(4),
                author: createdBook.author
            };

            cy.get("table").contains('tr', createdBook.name).invoke("index").then((i) =>{  
                cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
            });
        
            cy.wait(TIME_OUT);
            cy.get("#name").clear().type(updatedBook.name);
            cy.wait(TIME_OUT);
            cy.get("#author").clear().type(updatedBook.author);    
            cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click();    

        })

        it("Then the book should be listed with the right name and author", () => {
            cy.get(
                'table').contains('td', updatedBook.name
                ).should("be.visible");
            cy.get(
                'table').contains('td', updatedBook.author
                ).should("be.visible");
        })

    });

});