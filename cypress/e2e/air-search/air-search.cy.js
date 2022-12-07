import { faker } from '@faker-js/faker';

describe("Tests for aircraft search", () => {


  beforeEach(function() {

    cy.fixture('search').then((search) => {
      this.search = search
    })
    cy.fixture('data').then((data) => {
      this.data = data
    })
    cy.fixture('login').then((login) => {
      this.login = login
    })
    cy.fixture('api').then((api) => {
      this.api = api
    })

    cy.log('Open main page')
    cy.visit('/')
  })
 

  context("US locale/Nearby point for Where From", () => {

    it("Search for unauth user", function() {

      const email = faker.internet.email()
      const password = faker.internet.password()

      cy.log('Select Where from - the nearest airport')
      cy.get(this.search.from).click({force: true})
      cy.get(this.search.nearby).click({force: true})
      cy.get(this.search.from_airport)
      .should('include.text', 'Zvartnots Intl')

      cy.log('Select  Where to -', this.data.city)
      cy.input(this.search.to, this.data.city)
      cy.get(this.search.list_to).click({force: true})
      cy.get(this.search.to_airport)
      .should('include.text', 'Humberto Delgado')

      cy.log('Click Search')
      cy.getContains('button', 'Search').click({force: true})
      cy.url().should('include', 'search')

      cy.log('Select air class Heavy')
      cy.get(this.search.class_heavy).click()
      cy.get(this.search.selected_class)
      .should('include.text', 'Heavy')

      cy.log('Select date')
      cy.get(this.search.present_day).click({force: true})
      cy.get(this.login.modal_login).should('be.exist')

      cy.log('Input incorrect email/password:', email, password)
      cy.input(this.login.email, email)
      cy.input(this.login.password, password)
      cy.intercept('POST', this.api.loginclient).as('apiCheck')
      cy.get(this.login.button).click()
      .wait('@apiCheck').its('response.statusCode').should('eq', 401)
      cy.get(this.login.error).should('include.text', 'Please try again')
    })
  })
})