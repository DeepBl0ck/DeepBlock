"use strict";

const { check, validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

async function isUserName(req, res, next) {
  await check("username")
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("username: You can't enter spaces")
    .isLength({ min: 6, max: 12 })
    .withMessage("username: You can enter in 6 to 12 characters")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage(
      "username: You can enter lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("project_name: You can't enter spaces")
    .isLength({ max: 30 })
    .withMessage("project_name: You can enter up to 30 characters")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage(
      "project_name: You can enter lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("dataset_name: You can't enter spaces")
    .isLength({ max: 30 })
    .withMessage("dataset_name: You can enter up to 30 characters")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage(
      "dataset_name: You can enter lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("class_name: You can't enter spaces")
    .isLength({ max: 30 })
    .withMessage("class_name: You can enter up to 30 characters")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage(
      "class_name: You can enter lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("password: You can't enter spaces")
    .isLength({ min: 8, max: 20 })
    .withMessage("password: You can enter in 8 to 20 characters")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage(
      "password: You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only"
    )
    .run(req);

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
    .withMessage("password_verify: You can't enter spaces")
    .isLength({ min: 8, max: 20 })
    .withMessage("password_verify: You can enter in 8 to 20 characters")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage(
      "password_verify: You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only"
    )
    .run(req);

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
    .withMessage("after_password: You can't enter spaces")
    .isLength({ min: 8, max: 20 })
    .withMessage("after_password: You can enter in 8 to 20 characters")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage(
      "after_password: You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only"
    )
    .run(req);

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
    .withMessage("after_password_verify: You can't enter spaces")
    .isLength({ min: 8, max: 20 })
    .withMessage("after_password_verify: You can enter in 8 to 20 characters")
    .matches("^[a-zA-Z0-9~!+@#=$%^&*_-]+$")
    .withMessage(
      "after_password_verify: You can enter lowercase uppercase numeric special characters(~!+@#=$%^&*_-]+$) only"
    )
    .run(req);

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
    .withMessage("email: You can't enter spaces")
    .isLength({ max: 40 })
    .withMessage("email: You can enter up to 40 characters")
    .isEmail()
    .withMessage("email: Fill out the email form")
    .run(req);

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
    .withMessage("key: You can't enter spaces")
    .matches("^[a-zA-Z0-9]+$")
    .withMessage("key: You can enter lowercase uppercase numeric only")
    .run(req);

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
    .withMessage("description: You can enter up to 30 characters")
    .matches("^[a-zA-Z0-9_.]*$")
    .withMessage(
      "description: You enter null lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("after: You can't enter spaces")
    .matches("^[a-zA-Z0-9_.]+$")
    .withMessage(
      "after: You enter lowercase uppercase numeric special characters(_.) only"
    )
    .run(req);

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
    .withMessage("project_id: You can't enter spaces")
    .isNumeric()
    .withMessage("project_id: You can only enter integers")
    .run(req);

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
    .withMessage("dataset_id: You can't enter spaces")
    .isNumeric()
    .withMessage("dataset_id: You can only enter integers")
    .run(req);

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
    .withMessage("class_id: You can't enter spaces")
    .isNumeric()
    .withMessage("class_id: You can only enter integers")
    .run(req);

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
    .withMessage("image_id: You can't enter spaces")
    .isNumeric()
    .withMessage("image_id: You can only enter integers")
    .run(req);

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
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("limit: You can't enter spaces")
    .isNumeric()
    .withMessage("limit: You can only enter integers")
    .run(req);

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
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("offset: You can't enter spaces")
    .isNumeric()
    .withMessage("offset: You can only enter integers")
    .run(req);

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
    .matches("^[^ \t\n\r\f\v]+$")
    .withMessage("save_option: You can't enter spaces")
    .isBoolean()
    .withMessage("save_option: You can only enter true or false")
    .run(req);

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
  isUserName,
  isProjectName,
  isDatasetName,
  isClassName,
  isPassword,
  isPasswordVerify,
  isAfterPassword,
  isAfterPasswordVerify,
  isEmail,
  isKey,
  isDescription,
  isAfter,
  isProjectID,
  isDatasetID,
  isClassID,
  isImageID,
  isLimit,
  isOffset,
  isSaveOption,
};
