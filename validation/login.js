const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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

  return {
    isValid: true
  };
};