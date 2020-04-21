const Users = require("../models/user-model"),
  jwt = require("jsonwebtoken"),
  responses = require("../responses");

const signIn = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(403).json(responses.forbidden);
  }

  Users.findOne({ username: body.username }).then((user) => {
    if (!user) {
      return res.status(403).json(responses.forbidden);
    }
    user.comparePassword(body.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        return res.status(403).json(responses.forbidden);
      }
      if (isMatch) {
        let expireTime = process.env.JWTEXPIRE || 10000;
        const token = jwt.sign({ _id: user.id }, req.app.get("jwtkey"), {
          expiresIn: parseInt(expireTime),
        });
        return res.json({
          success: true,
          token: token,
          expire: expireTime,
        });
      }
      return res.status(403).json(responses.forbidden);
    });
  });
};

const registerUser = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json(responses.faltanDatos);
  }
  const user = new Users(body);
  user.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json(responses.errorAlCargar);
    }
    return res.status(200).json(responses.responseData("Usuario Creado"));
  });
};

module.exports = {
  registerUser,
  signIn,
};
