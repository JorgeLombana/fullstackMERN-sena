const jwt = require('jsonwebtoken')

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    res
      .status(403)
      .send({ msg: 'la peticion no tiene la cabecera de autenticación' })
  }

  const token = req.headers.authorization.replace('Bearer', '').trim()

  try {
    const payload = jwt.decode(token)

    const { exp } = payload
    const currenData = new Date().getTime()

    // console.log(payload);
    // console.log(exp);
    // console.log(currenData);

    if (exp <= currenData) {
      return res.status(400).send({ msg: 'el token a expirado' })
    }

    req.user = payload
    next()
  } catch (error) {
    res.status(400).send({ msg: 'token invalido' })
  }
}

module.exports = {
  asureAuth,
}
