const bcrypt = require('bcryptjs')

const Users = require('./users-model')

module.exports = {
  restricted,
}

function restricted(req, res, next) {
  const { username, password } = req.headers

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) next()
        else res.status(401).json({ message: 'invalid credentials' })
      })
      .catch(err => res.status(500).json({ message: 'error validating credentials' }))
  } else res.status(404).json({ message: 'please provide valid credentials' })
}