const express = require('express')

let forbidden = {
  success: false,
  error: 'Forbidden'
}

const hasAdminKey = express.Router(); 
hasAdminKey.use((req, res, next) => {

  if (!req.headers['admin-key']) {
    return res.status(403).json(forbidden)
  }
  const  adminKey = req.headers['admin-key']
  if(adminKey !== process.env.ADMINKEY) {
    return res.status(403).json(forbidden)
  }
  next()
})

module.exports = {
  hasAdminKey
}