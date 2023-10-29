const express = require('express')
const AuthController = require('../controllers/auth.controller')

const api = express.Router()

api.post('/auth/register/', AuthController.register)
api.post('/auth/login/', AuthController.login)
api.post('/auth/refres_access_token/', AuthController.refreshAccesToken)

module.exports = api