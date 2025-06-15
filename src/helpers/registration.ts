import Validator from "../services/Validator";

export const validateRegister = () => {
  return [
    Validator.isValidUsername(),
    Validator.isValidEmail(),
    Validator.isValidPassword(),
  ];
};
