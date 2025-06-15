import { check, ValidationChain } from "express-validator";

import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../constants/regex";

class Validator {
  static isValidEmail(): ValidationChain {
    return check("email")
      .notEmpty()
      .withMessage("This field is required")
      .matches(EMAIL_REGEX)
      .withMessage("Email is not valid")
      .normalizeEmail();
  }

  static isValidPassword(): ValidationChain {
    return check("password")
      .notEmpty()
      .withMessage("This field is required")
      .matches(PASSWORD_REGEX)
      .withMessage(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
  }

  static isValidUsername(): ValidationChain {
    return check("username")
      .notEmpty()
      .withMessage("This field is required")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long.")
      .matches(USERNAME_REGEX)
      .withMessage(
        "Username can only use letters, numbers, underscores, and periods."
      );
  }
}

export default Validator;
