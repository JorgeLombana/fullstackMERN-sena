const { options } = require('../app')
const NewsLetter = require('../models/newsletter.model')

function suscribeEmail(req, res) {
  const { email } = req.body

  if (!email) {
    res.status(400).send({ msg: 'email obligatorio' })
  }

  const newsletter = new NewsLetter({
    email: email.toLowerCase(),
  })

  newsletter.save((error) => {
    if (error) {
      res.status(400).send({ msg: 'el mail ya esta registrao' })
    } else {
      res.status(200).send({ msg: 'email registrado excitado' })
    }
  })
}

function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  }

  NewsLetter.paginate({}, options, (error, emailStored) => {
    if (error) {
      res.status(400).send({ msg: 'error al obtener los emails' })
    } else {
      res.status(200).send(emailStored)
    }
  })
}

function deleteEmail(req, res) {
  const { id } = req.params

  NewsLetter.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'error al eliminar el registro ' })
    } else {
      res.status(200).send({ msg: 'deleteado correctamente' })
    }
  })
}

module.exports = {
  suscribeEmail,
  getEmails,
  deleteEmail
}
