// We are going to test a few things:
// 1. Test unauthorized routes using cy.visit + cy.request
// 2. Test using a regular form submission (old school POSTs)
// 3. Test error states
// 4. Test authenticated session states
// 5. Use cy.request for much faster performance
// 6. Create a custom command

// Be sure to run `npm start` to start the server
// before running the tests below.
import 'cypress-testing-library/add-commands';


describe('Logging In - HTML Web Form', function () {
    // we can use these values to log in
    const username = 'dave@tinypulse.com'
    const password = '_Y4Gvs5iR0^lvXj!hAqa'

    context('Unauthorized', function () {
        it('is login successully', function () {
            // we must have a valid session cookie to be logged
            // in else we are redirected to /unauthorized
            cy.visit('https://staging.tinyserver.info/signin')
            cy.title().should('contain', 'TINYpulse')
        })

        it('is redirected using cy.request', function () {
            // instead of visiting the page above we can test this by issuing
            // a cy.request, checking the status code and redirectedToUrl property.

            // See docs for cy.request: https://on.cypress.io/api/request

            // the 'redirectedToUrl' property is a special Cypress property under the hood
            // that normalizes the url the browser would normally follow during a redirect
            cy.request({
                url: 'https://tps-staging.tinyserver.info/profile',
                followRedirect: false, // turn off following redirects automatically
            }).then((resp) => {
                // should have status code 302
                expect(resp.status).to.eq(302)

            })
        })
    })

    context('HTML form submission', function () {
        beforeEach(function () {
            cy.visit('https://staging.tinyserver.info/signin')
            cy.title().should('contain', 'TINYpulse')
            cy.url().should('include', '/signin')

        })

        it('displays errors on login', function () {
            // incorrect username on purpose
            cy.get('#session_email').type('dave')
            cy.get('input[id=session_password]').type('password')
            cy.get('.controls > .btn').click()

            // we should have visible errors now
            cy.get('.alert.alert-error')
                .should('be.visible')
                .and('contain', 'Invalid email address / password combination. Please reach out to your TINYpulse administrator if you don\'t know the email associated with your TINYpulse account.\n')

            // and still be on the same URL
            cy.url().should('include', '/signin')
        })

        it('redirects to /dashboard on success', function () {
            cy.get('#session_email').type(username)
            cy.get('input[id=session_password]').type(password)
            // cy.get('.controls > .btn').click()
            cy.queryAllByText('Sign In ').click


            // we should be redirected to /dashboard
            cy.url().should('include', '/dashboard')


            // and our cookie should be set to 'cypress-session-cookie'
            // cy.getCookie('cypress-session-cookie').should('exist')
        })
    })

    // context('HTML form submission with cy.request', function () {
    //   it('can bypass the UI and yet still test log in', function () {
    //     // oftentimes once we have a proper e2e test around logging in
    //     // there is NO more reason to actually use our UI to log in users
    //     // doing so wastes is slow because our entire page has to load,
    //     // all associated resources have to load, we have to fill in the
    //     // form, wait for the form submission and redirection process
    //     //
    //     // with cy.request we can bypass this because it automatically gets
    //     // and sets cookies under the hood. This acts exactly as if the requests
    //     // came from the browser
    //     cy.request({
    //       method: 'POST',
    //       url: 'https://staging.tinyserver.info/signin', // baseUrl will be prepended to this url
    //       form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    //       body: {
    //         username,
    //         password
    //       },
    //     })
    //
    //     // just to prove we have a session
    //     cy.getCookie('cypress-session-cookie').should('exist')
    //   })
    // // })
})