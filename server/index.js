const mongoose = require('mongoose')
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION,
} = require('./constants.js')
const app = require('./app.js')

const PORT = process.env.POST || 3000

mongoose.set('strictQuery', false) //desactivo el modo estricto para que acepte consultas que no cumplen con las restricciones de validación predeterminadas

app.listen(PORT, () => {
  console.log(
    `##########################################
########### SERVER IS WORKING ############
##########################################
http://${IP_SERVER}:${PORT}/api/${API_VERSION}`
  )
})

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}.huklefy.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('contectado a mongo :v'))
  .catch((error) => console.log(error, 'error al conectarse a la DB')) //conecto el server a la db utilizando las credenciales guardadas en constants.js
