const express = require('express')
const { API_VERSION } = require('./constants')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// imporar rutas
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const menuRoutes = require('./routes/menu.routes')
const courseRoutes = require('./routes/course.routes')
const postRoutes = require('./routes/post.routes')
const NewsletterRoutes = require('./routes/newsletter.routes')


// configurar body parse
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//configuración carpeta static
app.use(express.static('uploads'))

// configarar Header HTTP - CORS
app.use(cors())

// configurar rutas
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)
app.use(`/api/${API_VERSION}`, courseRoutes)
app.use(`/api/${API_VERSION}`, postRoutes)
app.use(`/api/${API_VERSION}`, NewsletterRoutes)



module.exports = app
