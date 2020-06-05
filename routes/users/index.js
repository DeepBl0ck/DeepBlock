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
 *        description: 유저 아이디
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 *        description: 유저 비밀번호
 *      - in: body
 *        type: string
 *        required: true
 *        name: email
 *        description: 유저 이메일
 *      - in: path
 *        type: string
 *        required: true
 *        default: null
 *        name: avatar
 *        description: 유저 프로필 경로
 *    responses:
 *        200:
 *            description: 회원가입에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 회원가입 성공 이메일 인증을 해주세요
 *        409-1:
 *            description: 중복된 아이디로 만들 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 중복된 아이디 입니다
 *        409-2:
 *            description: 중복된 이메일로 만들 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 중복된 이메일 입니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 유저 아이디
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 *        description: 유저 비밀번호
 *   
 *    responses:
 *        200:
 *            description: 로그인에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 로그인 성공
 *        401-1:
 *            description: 이메일 인증을 안한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 이메일 인증필요
 *        401-2:
 *            description: 아이디 또는 비밀번호를 잘못친 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 아이디 비밀번호 오류
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 유저 이메일
 *   
 *    responses:
 *        200:
 *            description: 아이디 찾기에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 아이디 찾기 성공 - 이메일을 확인해주세요
 *        401:
 *            description: 이메일을 잘못 입력한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 이메일이 일치하지 않습니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 유저 아이디
 *      - in: body
 *        type: string
 *        required: true
 *        name: email
 *        description: 유저 이메일
 *   
 *    responses:
 *        200:
 *            description: 비밀번호 찾기에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 비밀번호 찾기 성공 - 이메일을 확인해주세요
 *        401:
 *            description: 아이디 또는 이메일을 잘못 입력한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 아이디 또는 이메일이 일치하지 않습니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 인증키
 *      
 *    responses:
 *        200:
 *            description: 이메일 인증에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 인증 성공 - 로그인 가능
 *        401:
 *            description: 인증키에 문제가 생긴 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 인증키 오류
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        name: userID
 *        description: 유서 세션 아이디
 *      
 *    responses:
 *        200:
 *            description: 프로필 보기 성공한 경우
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
 *            description: 세션값이 존재하지 않을 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못된 접근
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
 */
users.delete('/u/logout', authenticator, userController.logout);
/**
 * @swagger 
 * 
 * /api/u/logout:
 *  delete:
 *    tags:
 *      - userController
 *    description: logout
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      
 *    responses:
 *        200:
 *            description: 로그아웃에 성공했을 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 로그아웃 성공
 *        401:
 *            description: 세션값이 존재하지 않을 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 로그아웃 실패
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
 *        200:
 *            description: 프로필 사진을 볼 경우
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
 *            description: 세션값이 존재하지 않을 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 로그아웃 실패
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
 *        description: 비밀번호 확인
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 비밀번호 확인에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 본인 확인 완료
 *        401:
 *            description: 세션 정보가 없는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못된 접근
 *        403:
 *            description: 비밀번호가 맞지 않는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 비밀번호가 일치하지 않습니다
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
 *        description: 변경할 비밀번호
 *      - in: body
 *        type: string
 *        required: true
 *        name: after_password_verify
 *        description: 변경할 비밀번호 확인
 *   
 *    responses:
 *        200:
 *            description: 비밀번호 변경에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 비밀번호 변경 완료
 *        403-1:
 *            description: 입력한 두 비밀번호가 일치하지 않는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 비밀번호를 잘못 입력하셨습니다
 *        403-2:
 *            description: 원래 비밀번호와 동일한 비밀번호로 변경하려고 할 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 동일한 비밀번호로 바꿀 수 없습니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 프로필 이미지 업로드에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: 프로필 이미지 업로드 성공
 *        401:
 *            description: 세션값이 존재하지 않을 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못된 접근
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
 */
users.delete('/u/deleteavatar', authenticator, userController.deleteAvater);
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
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 프로필 삭제에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    avatar:
 *                        type: string
 *                        example: 프로필 삭제 성공
 *        401:
 *            description: 세션값이 존재하지 않을 때
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못된 접근
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 유저 아이디
 *      - in: body
 *        type: string
 *        required: true
 *        name: password
 *        description: 유저 비밀번호
 *   
 *    responses:
 *        200:
 *            description: 회원탈퇴에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 회월탈퇴 성공
 *        403:
 *            description: 입력한 비밀번호가 일치하지 않는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 비밀번호 오류
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
 * 
 */

module.exports = users;
