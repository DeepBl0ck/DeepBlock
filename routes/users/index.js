'use strict'

const express = require('express');
const users = express.Router({ mergeParams: true });
const multer = require('multer');

const userController = require('@controllers/userController');

// middlewares
const avatarNavigator = require('@middlewares/navigator').avatar;
const authenticator = require('@middlewares/authenticator');
const sanitizer = require('@middlewares/sanitizer');

// Init multer for avatar upload
const avatar_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = req.profile_path;
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let filename = `${new Date().valueOf()}_` + req.profile_name;
    let mimetype = null;

    switch (file.img_type) {
      case "image/jpeg":
        mimetype = ".jpg";
        break;
      case "image/png":
        mimetype = ".png";
        break;
      case "image/gif":
        mimetype = ".gif";
        break;
      case "image/bmp":
        mimetype = ".bmp";
        break;
      default:
        mimetype = ".jpg";
        break;
    }
    cb(null, filename + mimetype);
  }
})
const avatar_upload = multer({
  storage: avatar_storage,
  limits: { fileSize: 3 * 1024 * 1024 }
})


/* ==== userControllers ==== */
// No session check required

/**
 * @route POST /auth
 * @param  {} '/register'
 * @param  {} sanitizer.register
 * @param  {} userController.register
 */
users.post('/register', sanitizer.register, userController.register);

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: username
 *       - name: password
 *         description: password
 *     responses:
 *       200:
 *         description: login
 */
users.post('/login', sanitizer.login, userController.login);
users.post('/findid', sanitizer.findID, userController.findID);
users.put('/findpasswd', sanitizer.findPassword, userController.findPassword);
users.get('/verifyemail', sanitizer.verifyEmail, userController.verifyEmail);

// session check required
users.get('/u', authenticator, userController.viewProfile);
users.delete('/u/logout', authenticator, userController.logout);
users.get('/u/avatar', authenticator, userController.viewProfileImage);
users.post('/u/checkpasswd', authenticator, sanitizer.checkPassword, userController.checkPassword);
users.put('/u/passwd', authenticator, sanitizer.changePassword, userController.changePassword);
users.put('/u/avatar', authenticator, avatarNavigator, avatar_upload.single('avatar'), userController.changeAvatar);
users.delete('/u/deleteavatar', authenticator, userController.deleteAvater);
users.delete('/u/unregister', authenticator, sanitizer.unregister, userController.unregister);

module.exports = users;
