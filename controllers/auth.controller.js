const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.login = async (req, res) => {
  const { username, password, client_secret } = req.body
  try {
    const user = await User.findOne({ where: { username } })
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) throw new Error("Passwords didn't match")

    if (isEqual) {
      const token = jwt.sign(
        {
          username,
          user_id: user.id
        },
        client_secret,
        { expiresIn: '12h' }
      )
      return res.json({
        access_token: token,
        refresh_token: ''
      })
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports.get_active_user = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id)
    res.send(user)
  } catch (error) {
    res.send('An error occured')
  }
}