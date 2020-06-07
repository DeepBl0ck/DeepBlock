'use strict';

const { check, validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

async function isUserName(req, res, next) {
  await check('username')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("username: 공백은 입력할 수 없습니다")
    .isLength({ min: 6, max: 12 })
    .withMessage("username: 6 ~ 12 글자로 입력하세요")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("username: 소문자 대문자 숫자 특수문자 _. 만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isProjectName(req, res, next) {
  await check('project_name')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("project_name: 공백은 입력할 수 없습니다")
    .isLength({ max: 12 })
    .withMessage("project_name: 최대 12 글자까지 입력 가능합니다")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("project_name: 소문자 대문자 숫자만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isDatasetName(req, res, next) {
  await check('dataset_name')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("dataset_name: 공백은 입력할 수 없습니다")
    .isLength({ max: 12 })
    .withMessage("dataset_name: 최대 12 글자까지 입력 가능합니다")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("dataset_name: 소문자 대문자 숫자만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isClassName(req, res, next) {
  await check('class_name')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("class_name: 공백은 입력할 수 없습니다")
    .isLength({ max: 12 })
    .withMessage("class_name: 최대 12 글자까지 입력 가능합니다")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("class_name: 소문자 대문자 숫자만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isPassword(req, res, next) {
  await check('password')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("password: 공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("password: 8 ~ 20 글자로 입력하세요")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("password: 소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isPasswordVerify(req, res, next) {
  await check('password_verify')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("password_verify: 공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("password_verify: 8 ~ 20 글자로 입력하세요")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("password_verify: 소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isAfterPassword(req, res, next) {
  await check('after_password')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("after_password: 공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("after_password: 8 ~ 20 글자로 입력하세요")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("after_password: 소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isAfterPasswordVerify(req, res, next) {
  await check('after_password_verify')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("after_password_verify: 공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("after_password_verify: 8 ~ 20 글자로 입력하세요")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("after_password_verify: 소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isEmail(req, res, next) {
  await check('email')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("email: 공백은 입력할 수 없습니다")
    .isLength({ max: 40 })
    .withMessage("email: 최대 40글자까지 입력 가능 합니다")
    .isEmail()
    .withMessage("email 양식에 맞게 작성하세요")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isKey(req, res, next) {
  await check('key')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("key: 공백은 입력할 수 없습니다")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("key: 소문자, 대문자, 숫자만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isDescription(req, res, next) {
  await check('description')
    .isLength({ max: 24 })
    .withMessage("description: 최대 24 글자까지 입력 가능합니다")
    .matches("^[a-zA-Z0-9]*$")
    .withMessage("description: null 과 소문자 대문자 숫자만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isAfter(req, res, next) {
  await check('after')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("after: 공백은 입력할 수 없습니다")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("after: 소문자, 대문자, 숫자만 사용 가능 합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isProjectID(req, res, next) {
  await check('project_id')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("project_id: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("project_id: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isDatasetID(req, res, next) {
  await check('dataset_id')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("dataset_id: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("dataset_id: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isClassID(req, res, next) {
  await check('class_id')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("class_id: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("class_id: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isImageID(req, res, next) {
  await check('image_id')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("image_id: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("image_id: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isLimit(req, res, next) {
  await check('limit')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("limit: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("limit: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isOffset(req, res, next) {
  await check('offset')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("offset: 공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("offset: 정수만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

async function isSaveOption(req, res, next) {
  await check('save_option')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("save_option: 공백은 입력할 수 없습니다")
    .isBoolean()
    .withMessage("save_option: true or false 만 입력 가능합니다")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    })
  }
}

module.exports = {
  isUserName, isProjectName, isDatasetName, isClassName,
  isPassword, isPasswordVerify, isAfterPassword, isAfterPasswordVerify,
  isEmail, isKey,
  isDescription, isAfter,
  isProjectID, isDatasetID, isClassID, isImageID,
  isLimit, isOffset,
  isSaveOption
}



