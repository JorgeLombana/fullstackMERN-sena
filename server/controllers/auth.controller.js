const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('../utils/jwt')

function login(req, res) {
  const { email, password } = req.body
  if (!email) res.status(400).send({ message: 'Email obligatorio' })
  if (!password) res.status(400).send({ message: 'Contraseña obligatoria' })

  const emailLowerCase = email.toLowerCase()

  User.findOne({ email: emailLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: 'error del servidor :/ ' })
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: 'error del servidor' })
        } else if (!check) {
          res.status(400).send({ msg: 'usuario o contraseña incorrecta' })
        } else if (!userStore.active) {
          res.status(401).send({ msg: 'Usuario no autorizado o no activo' })
        } else {
          res.status(200).send({
            access: jwt.createAccesToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          })
        }
      })
    }
  })
}

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body
  console.log(req.body)

  if (!email) res.status(400).send({ message: 'Email obligatorio' })
  if (!password) res.status(400).send({ message: 'Contraseña obligatoria' })

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email: email.toLowerCase(),
      role: 'user',
      active: false,
    })

    const userStorage = await user.save()
    res.status(200).send(userStorage)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

function refreshAccesToken(req, res) {
  const { token } = req.body
  if (!token) res.status(400).send({ msg: 'error token requerido' })
  const { user_id } = jwt.decoded(token)

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: 'Error del server' })
    } else {
      res.status(200).send({
        accesToken: jwt.createAccesToken(userStorage),
      })
    }
  })
}

module.exports = {
  register,
  login,
  refreshAccesToken,
}
