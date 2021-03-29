const { random } = require('faker');
const { BASE_URL, TIME_OUT } = require('../utils/constants');

const new_book = {
    name: random.words(4),
    author: "Mayumi Tamura"
}

describe("When the user wants to create a book incorrectly", () => {

    describe("When the user wants to create a book but fields are null", () => {
        
        before(() => {
            cy.visit(BASE_URL);
            cy.get('.ant-btn-primary > .ng-star-inserted').click()
            cy.wait(TIME_OUT);
        })

        it("Then the save button should be disabled"), () => {
            cy.get(
                '.ant-modal-footer > .ant-btn-primary'
                ).should("be.disabled");
        }
    })
});