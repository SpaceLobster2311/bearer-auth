'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { user } = require('../models/index.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString)
  let [username, pass] = decodedString.split(':');

  try {
    req.user = await user.authenticateBasic(username, user.pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

// try {
//   const user = await users.findOne({ where: { username: username } });
//   const valid = await bcrypt.compare(password, user.password);
//   if (valid) {
//     req.user = user;
//     next();
//     // res.status(200).json(user);
//   }
//   else {
//     throw new Error('Invalid User')
//   }
// } catch (error) { res.status(403).send("Invalid Login"); }
// }