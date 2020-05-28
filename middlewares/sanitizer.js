/*============================
      check user's input
============================*/
'use strict'

const { check, validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

//userController
exports.register = [
  check("username")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 6, max: 12 })
    .withMessage("글자 : 6 ~ 12")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("password")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 8, max: 20 })
    .withMessage("글자 : 8 ~ 20")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("email")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ max: 40 })
    .withMessage("최대 40글자")
    .isEmail()
    .withMessage("email 양식을 맞추세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  }
];
exports.login = [
  check("username")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 6, max: 12 })
    .withMessage("글자 : 6 ~ 12")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("password")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 8, max: 20 })
    .withMessage("글자 : 8 ~ 20")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  }
];
exports.unregister = [
  check("username")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 6, max: 12 })
    .withMessage("글자 : 6 ~ 12")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("password")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 8, max: 20 })
    .withMessage("글자 : 8 ~ 20")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.findID = [
  check("email")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ max: 40 })
    .withMessage("최대 40글자")
    .isEmail()
    .withMessage("email 양식을 맞추세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.findPassword = [
  check("username")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ min: 6, max: 12 })
    .withMessage("글자 : 6 ~ 12")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("email")
    .notEmpty()
    .withMessage("공백 x")
    .isLength({ max: 40 })
    .withMessage("최대 40글자")
    .isEmail()
    .withMessage("email 양식을 맞추세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
],
  exports.checkPassword = [
    check("password")
      .notEmpty()
      .withMessage("공백 x")
      .isLength({ min: 8, max: 20 })
      .withMessage("글자 : 8 ~ 20")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
    check("password_verify")
      .notEmpty()
      .withMessage("공백 x")
      .isLength({ min: 8, max: 20 })
      .withMessage("글자 : 8 ~ 20")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
  ],
  exports.changePassword = [
    check("before_password")
      .notEmpty()
      .withMessage("공백 x")
      .isLength({ min: 8, max: 20 })
      .withMessage("글자 : 8 ~ 20")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
    check("after_password")
      .notEmpty()
      .withMessage("공백 x")
      .isLength({ min: 8, max: 20 })
      .withMessage("글자 : 8 ~ 20")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
  ],
  exports.verifyEmail = [
    check('key')
      .notEmpty()
      .withMessage("공백 x")
      .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
      .withMessage("특수문자 x"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
  ],

  //projectController 중복 어카지
  exports.createProject = [
    check("project_name")
      .notEmpty()
      .withMessage("공백 x")
      .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
      .withMessage("특수문자 x"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.fail(res, 401, extractedErrors);
    },
  ];
exports.deleteProject = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.updateProjectName = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("after")
    .notEmpty()
    .withMessage("공백 x")
    .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
    .withMessage("특수문자 x"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];

//modelController
exports.loadModelOfProject = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.updateModel = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.trainResult = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.testResult = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.trainModel = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.testModel = [
  check("project_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];

//imageController
exports.sendClassImage = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("limit")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("page")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.uploadImage = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.deleteImage = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("image_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.sendOriginalImage = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
]

//datasetController
exports.createDataset = [
  check("dataset_name")
    .notEmpty()
    .withMessage("공백 x")
    .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
    .withMessage("특수문자 x"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.deleteDataset = [
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.updateDatasetName = [
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("after")
    .notEmpty()
    .withMessage("공백 x")
    .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
    .withMessage("특수문자 x"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];

//classController
exports.loadClassOfDataset = [
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.createCalss = [
  check("class_name")
    .notEmpty()
    .withMessage("공백 x")
    .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
    .withMessage("특수문자 x"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.deleteClass = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
exports.updateClassName = [
  check("class_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("dataset_id")
    .notEmpty()
    .withMessage("공백 x")
    .isNumeric()
    .withMessage("정수 입력"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
  check("after")
    .notEmpty()
    .withMessage("공백 x")
    .matches(/[^~!@#$%^&*()_+|<>?:{}";`']/gi)
    .withMessage("특수문자 x"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.fail(res, 401, extractedErrors);
  },
];
