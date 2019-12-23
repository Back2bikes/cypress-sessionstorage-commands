/* global Cypress, sessionStorage */

const { register } = require('./src/register')

register(Cypress, sessionStorage)
