const express = require('express'),
  jwt = require('jsonwebtoken')

const isAuthenticatedMiddleware = express.Router(); 
isAuthenticatedMiddleware.use((req, res, next) => {
  if(!req.headers.authorization) {
    res.status(403).json({
      success: false, 
      error: 'Token no proveída.' 
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, req.app.get('jwtkey'), (err, decoded) => {      
      if (err) {
        return res.status(401).json({ 
          success: false,
          error: 'Token inválida' 
      });    
      }
      req.user_id = decoded;    
      next();
    });
  } else {
    res.status(403).json({
      success: false, 
      error: 'Token no proveída.' 
    });
  }
 });

module.exports = {
  isAuthenticatedMiddleware
}