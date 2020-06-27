'use strict'

const express = require('express');
const users = express.Router({ mergeParams: true });
const multer = require('multer');
const userController = require('@controllers/userController');
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
users.post('/register', sanitizer.isUserName, sanitizer.isPassword, sanitizer.isEmail, userController.register);
/** 
 * @swagger
 * 
 * /api/register:
 *  post:
 *    tags:
 *      - userController
 *    description: register
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: username
 
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 
 *      - in: body
 *        type: string
 *        required: true
 *        name: email
 
 *      - in: path
 *        type: string
 *        required: true
 *        default: null
 *        name: avatar
 
 *    responses:
 *        200:
 *            description: In case of successful sign up
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Sign up success - Please verify your email
 *        409-1:
 *            description: In case of making a duplicate userID
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicated userID
 *        409-2:
 *            description: In case of making a duplicate email
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicated email
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 *        
*/
users.post('/login', sanitizer.isUserName, sanitizer.isPassword, userController.login);
/**
 * @swagger 
 * 
 * /api/login:
 *  post:
 *    tags:
 *      - userController
 *    description: login
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: username
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 *   
 *    responses:
 *        200:
 *            description: In case of successful login
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Login success
 *        401-1:
 *            description: In case of don't authenticate email
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Email authentication required
 *        401-2:
 *            description: In case of incorrect ID or password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: UserID or Password error
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 * 
 */
users.post('/findid', sanitizer.isEmail, userController.findID);
/**
 * @swagger 
 * 
 * /api/findid:
 *  post:
 *    tags:
 *      - userController
 *    description: find user's id
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: email
 *   
 *    responses:
 *        200:
 *            description: In case of success finding an userID
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Finding userID success - Please check your email
 *        401:
 *            description: In case of entering a wrong email
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Email doesn't match
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 * 
 */
users.put('/findpasswd', sanitizer.isUserName, sanitizer.isEmail, userController.findPassword);
/**
 * @swagger 
 * 
 * /api/findpasswd:
 *  put:
 *    tags:
 *      - userController
 *    description: find user's password
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: username

 *      - in: body
 *        type: string
 *        required: true
 *        name: email
 *   
 *    responses:
 *        200:
 *            description: In case of success finding a password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Finding password success - Please check your email
 *        401:
 *            description: In case of entering a wrong userID or email
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: UserID or Email doesn't match
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
users.get('/verifyemail', sanitizer.isKey, userController.verifyEmail);
/**
 * @swagger 
 * 
 * /api/verifyemail?key~~:
 *  get:
 *    tags:
 *      - userController
 *    description: email verification
 *    parameters:
 *      - in: query
 *        type: string
 *        required: true
 *        name: key
 *      
 *    responses:
 *        200:
 *            description: In case of success authenticating email
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Authentication success - Loginable
 *        401:
 *            description: In case of problem about authentication key
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Authentication key error
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */

// session check required
users.get('/u', authenticator, userController.viewProfile);
/**
 * @swagger 
 * 
 * /api/u:
 *  get:
 *    tags:
 *      - userController
 *    description: view profile
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 *      
 *    responses:
 *        200:
 *            description: In case of viewing a user profile
 *            schema:
 *                type: object
 *                properties:
 *                    username:
 *                            type: string
 *                    email:
 *                         type: string
 *                    avatar:
 *                          type: string
 *        401:
 *            description: In case of doesn't exist a session
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */

users.get('/u/avatar', authenticator, userController.viewProfileImage);
/**
 * @swagger 
 * 
 * /api/u/avatar:
 *  get:
 *    tags:
 *      - userController
 *    description: view profile image
 *      
 *    responses:
 *        200-1:
 *            description: In case of viewing a basic profile image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: datauri
 *        200-2:
 *            description: In case of viewing a user profile image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: datauri
 *        401:
 *            description: In case of doesn't exist session
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 */
users.post('/u/checkpasswd', authenticator, sanitizer.isPasswordVerify, userController.checkPassword);
/**
 * @swagger 
 * 
 * /api/u/checkpasswd:
 *  post:
 *    tags:
 *      - userController
 *    description: check user's password
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: password_verify
 
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 
 *   
 *    responses:
 *        200:
 *            description: In case of success checking a user password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Identification completed
 *        401:
 *            description: In case of doesn't exist session
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        403:
 *            description: In case of doesn't match password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Password doesn't match
 */
users.put('/u/passwd', authenticator, sanitizer.isAfterPassword, sanitizer.isAfterPasswordVerify, userController.changePassword);
/**
 * @swagger 
 * 
 * /api/u/passwd:
 *  put:
 *    tags:
 *      - userController
 *    description: change user's password
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: after_password
 
 *      - in: body
 *        type: string
 *        required: true
 *        name: after_password_verify
 
 *   
 *    responses:
 *        200:
 *            description: In case of success changing a password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Password change completed
 *        403-1:
 *            description: In case of wrong entering a password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Entered the wrong password
 *        403-2:
 *            description: In case of changing a same password
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Can't change same password
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 * 
 */
users.put('/u/avatar', authenticator, avatarNavigator, avatar_upload.single('avatar'), userController.changeAvatar);
/**
 * @swagger 
 * 
 * /api/u/avatar:
 *  put:
 *    tags:
 *      - userController
 *    description: change profile image
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 *   
 *    responses:
 *        200:
 *            description: In case of success uploading a profile image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: Upload profile image success
 *        401:
 *            description: In case of doesn't exist session
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
users.delete('/u/avatar', authenticator, userController.deleteAvater);
/**
 * @swagger 
 * 
 * /api/u/avatar:
 *  delete:
 *    tags:
 *      - userController
 *    description: view profile image
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 *   
 *    responses:
 *        200:
 *            description: In case of success deleting a profile
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: Delete profile success
 *        401:
 *            description: In case of doesn't exist session
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
users.delete('/u/unregister', authenticator, sanitizer.isPassword, userController.unregister);
/**
 * @swagger 
 * 
 * /api/u/unregister:
 *  delete:
 *    tags:
 *      - userController
 *    description: unregister
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: username
 
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 
 *   
 *    responses:
 *        200:
 *            description: In case of success membership withdrawal
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Membership withdrawal success
 *        403:
 *            description: In case of entering a password doesn't match
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Password error
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 * 
 */

module.exports = users;
