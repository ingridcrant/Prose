const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    return {
      message: "Name field is required",
      isValid: false
    };
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    return {
      message: "Email field is required",
      isValid: false
    };
  } else if (!Validator.isEmail(data.email)) {
    return {
      message: "Email is invalid",
      isValid: false
    };
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    return {
      message: "Password field is required",
      isValid: false
    };
  }

  if (Validator.isEmpty(data.password2)) {
    return {
      message: "Confirm password field is required",
      isValid: false
    };
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    return {
      message: "Password must be at least 6 characters",
      isValid: false
    };
  }

  if (!Validator.equals(data.password, data.password2)) {
    return {
      message: "Passwords must match",
      isValid: false
    };
  }

  return {
    isValid: true
  };
};