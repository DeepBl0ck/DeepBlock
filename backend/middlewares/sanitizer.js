"use strict";

const { check, validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

async function isUserName(req, res, next) {
  await check("username")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the ID")
    .isLength({ min: 6, max: 12 })
    .withMessage("You can enter in 6 to 12 characters in the ID")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(_.) only in the ID")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isProjectName(req, res, next) {
  await check("project_name")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the project name")
    .isLength({ max: 30 })
    .withMessage("You can enter up to 30 characters in the project name")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(_.) only in the project name")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isDatasetName(req, res, next) {
  await check("dataset_name")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the dataset name")
    .isLength({ max: 30 })
    .withMessage("You can enter up to 30 characters in the dataset name")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(_.) only in the dataset name")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isClassName(req, res, next) {
  await check("class_name")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the class name")
    .isLength({ max: 30 })
    .withMessage("You can enter up to 30 characters in the class name")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(_.) only in the class name")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isPassword(req, res, next) {
  await check("password")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the password")
    .isLength({ min: 8, max: 20 })
    .withMessage("You can enter in 8 to 20 characters in the password")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only in the password")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isPasswordVerify(req, res, next) {
  await check("password_verify")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the password")
    .isLength({ min: 8, max: 20 })
    .withMessage("You can enter in 8 to 20 characters in the password")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only in the password")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isAfterPassword(req, res, next) {
  await check("after_password")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the password")
    .isLength({ min: 8, max: 20 })
    .withMessage("You can enter in 8 to 20 characters in the password")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only in the password")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isAfterPasswordVerify(req, res, next) {
  await check("after_password_verify")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the password")
    .isLength({ min: 8, max: 20 })
    .withMessage("You can enter in 8 to 20 characters in the password")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage("You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only in the password")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isEmail(req, res, next) {
  await check("email")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the email")
    .isLength({ max: 40 })
    .withMessage("You can enter up to 40 characters in the email")
    .isEmail()
    .withMessage("Fill out the email form")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isKey(req, res, next) {
  await check("key")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the key")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("You can enter lowercase uppercase numeric only in the key")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isDescription(req, res, next) {
  await check("description")
    .isLength({ max: 30 })
    .withMessage("You can enter up to 30 characters in the description")
    .matches("^[a-zA-Z0-9_.]*$")
    .withMessage("You enter null lowercase uppercase numeric special characters(_.) only in the description")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isAfter(req, res, next) {
  await check("after")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the name")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage("You enter lowercase uppercase numeric special characters(_.) only in the name")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isProjectID(req, res, next) {
  await check("project_id")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the id")
    .isNumeric()
    .withMessage("You can only enter integers in the id")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isDatasetID(req, res, next) {
  await check("dataset_id")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the id")
    .isNumeric()
    .withMessage("You can only enter integers in the id")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isClassID(req, res, next) {
  await check("class_id")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the id")
    .isNumeric()
    .withMessage("You can only enter integers in the id")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isImageID(req, res, next) {
  await check("image_id")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the id")
    .isNumeric()
    .withMessage("You can only enter integers in the id")
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

async function isTestID(req, res, next) {
  await check('test_id')
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("You can't enter spaces in the id")
    .isNumeric()
    .withMessage("You can only enter integers in the id")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isLimit(req, res, next) {
  await check("limit")
    .notEmpty()
    .withMessage("You can't enter spaces in the limit")
    .isNumeric()
    .withMessage("You can only enter integers in the limit")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isOffset(req, res, next) {
  await check("offset")
    .notEmpty()
    .withMessage("You can't enter spaces in the offset")
    .isNumeric()
    .withMessage("You can only enter integers in the offset")
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

async function isType(req, res, next) {
  await check('type')
    .notEmpty()
    .withMessage("You can't enter spaces in the type")
    .isNumeric()
    .withMessage("You can only enter integers in the type")
    .run(req)

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

async function isSaveOption(req, res, next) {
  await check("save_option")
    .notEmpty()
    .withMessage("You can't enter spaces in option")
    .isBoolean()
    .withMessage("You can only enter true or false in option")
    .run(req)


  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const extractedErrors = [];
    errors
      .array({ onlyFirstError: true })
      .map((err) => extractedErrors.push(err.msg));
    return responseHandler.custom(res, 401, {
      result: "fail",
      message: extractedErrors[0],
    });
  }
}

module.exports = {
  isUserName, isProjectName, isDatasetName, isClassName,
  isPassword, isPasswordVerify, isAfterPassword, isAfterPasswordVerify,
  isEmail, isKey,
  isDescription, isAfter,
  isProjectID, isDatasetID, isClassID, isImageID, isTestID,
  isLimit, isOffset, isType,
  isSaveOption
}
