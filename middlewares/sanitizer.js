/*============================
      check user's input
============================*/
'use strict'

const { check, validationResult } = require("express-validator");
const responseHandler = require("../utils/responseHandler");

//userController
exports.register = [
  check("username")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 6, max: 12 })
    .withMessage("6 ~ 12 글자로 입력하세요")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("password")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("8 ~ 20 글자로 입력 해주세요")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("email")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ max: 40 })
    .withMessage("최대 40글자까지 가능 합니다")
    .isEmail()
    .withMessage("email 양식에 맞게 작성하세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
]
exports.login = [
  check("username")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 6, max: 12 })
    .withMessage("6 ~ 12 글자로 입력하세요")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("password")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("8 ~ 20 글자로 입력 해주세요")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  }
];
exports.unregister = [
  check("password")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 8, max: 20 })
    .withMessage("8 ~ 20 글자로 입력 해주세요")
    .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
    .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.findID = [
  check("email")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ max: 40 })
    .withMessage("최대 40글자까지 가능 합니다")
    .isEmail()
    .withMessage("email 양식에 맞게 작성하세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.findPassword = [
  check("username")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ min: 6, max: 12 })
    .withMessage("6 ~ 12 글자로 입력하세요")
    .matches(/[a-z0-9_.]/)
    .withMessage("소문자, 숫자, 특수문자 _ . 만 사용 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("email")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isLength({ max: 40 })
    .withMessage("최대 40글자까지 가능 합니다")
    .isEmail()
    .withMessage("email 양식에 맞게 작성하세요"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
],
  exports.checkPassword = [
    check("password_verify")
      .not()
      .matches(/ /gi, "")
      .withMessage("공백은 입력할 수 없습니다")
      .isLength({ min: 8, max: 20 })
      .withMessage("8 ~ 20 글자로 입력 해주세요")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
  ],
  exports.changePassword = [
    check("after_password")
      .not()
      .matches(/ /gi, "")
      .withMessage("공백은 입력할 수 없습니다")
      .isLength({ min: 8, max: 20 })
      .withMessage("8 ~ 20 글자로 입력 해주세요")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
    check("after_password_verify")
      .not()
      .matches(/ /gi, "")
      .withMessage("공백은 입력할 수 없습니다")
      .isLength({ min: 8, max: 20 })
      .withMessage("8 ~ 20 글자로 입력 해주세요")
      .matches(/[a-zA-Z0-9!@#$%^~*+=-_]/)
      .withMessage("소문자, 대문자, 특수문자 ~!@#$%^&*_-+= 만 사용 가능 합니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
  ],
  exports.verifyEmail = [
    check('key')
      .not()
      .matches(/ /gi, "")
      .withMessage("공백은 입력할 수 없습니다")
      .matches(/[a-zA-Z0-9]/)
      .withMessage("특수문자를 입력하면 안됩니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
  ],

  //projectController 중복 어카지
  exports.createProject = [
    check("project_name")
      .not()
      .matches(/ /gi, "")
      .withMessage("공백은 입력할 수 없습니다")
      .matches(/[a-zA-Z0-9]/)
      .withMessage("특수문자를 입력하면 안됩니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
    check("description")
      .isLength({ max: 24 })
      .withMessage("최대 24글자까지 가능 합니다")
      .matches(/[a-zA-Z0-9]/)
      .withMessage("특수문자를 입력하면 안됩니다"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      const extractedErrors = []
      errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
      return responseHandler.custom(res, 401, {
        "result": "fail",
        "message": extractedErrors[0]
      });
    },
  ];
exports.deleteProject = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.updateProjectName = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("after")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];

//modelController
exports.loadModelOfProject = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.updateModel = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.trainResult = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.testResult = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.trainModel = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.testModel = [
  check("project_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isBoolean()
    .withMessage("true or false만 입력 가능 합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];

//imageController
exports.sendClassImage = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("limit")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("offset")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.uploadImage = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.deleteImage = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("image_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.sendOriginalImage = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
]

//datasetController
exports.createDataset = [
  check("dataset_name")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("description")
    .isLength({ max: 24 })
    .withMessage("최대 24글자까지 가능 합니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.deleteDataset = [
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.updateDatasetName = [
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("after")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];

//classController
exports.loadClassOfDataset = [
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.createCalss = [
  check("class_name")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.deleteClass = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
exports.updateClassName = [
  check("class_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("dataset_id")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .isNumeric()
    .withMessage("정수만 입력 가능합니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
  check("after")
    .not()
    .matches(/ /gi, "")
    .withMessage("공백은 입력할 수 없습니다")
    .matches(/[a-zA-Z0-9]/)
    .withMessage("특수문자를 입력하면 안됩니다"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return responseHandler.custom(res, 401, {
      "result": "fail",
      "message": extractedErrors[0]
    });
  },
];
