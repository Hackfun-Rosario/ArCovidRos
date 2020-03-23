const Users = require('../models/user-model')
const jwt = require('jsonwebtoken')

let forbidden = {
  success: false,
  error: 'Forbidden'
}

const signIn = (req, res) => {
  const body = req.body
  if(!body) {
    return res.status(403).json(forbidden)
  }
  
  Users.findOne(
    {username: body.username}
  )
  .then(user => {
    user.comparePassword(body.password, (err, isMatch) => {
      if(err) {
        console.log(err)
        return res.status(403).json(forbidden)
      }
      if(isMatch) {
        let expireTime = process.env.JWTEXPIRE || 1440
        const token = jwt.sign({_id:user.id}, req.app.get('jwtkey'), {
          expiresIn: parseInt(expireTime)
        });
        return res.json({
          success: true,
          token: token,
          expire: expireTime
        });
      } 
      return res.status(403).json(forbidden)
    })
  })

}

const registerUser = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Es necesario cargar los datos para guardar.'
    })
  }
  const user = new Users(body)
  user.save(function(err) {
    if(err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    return res.status(200).json({
      success: true,
      data: 'Usuario creado'
    })
  })

}

module.exports = {
  registerUser,
  signIn
}