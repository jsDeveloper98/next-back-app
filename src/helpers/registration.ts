import Validator from "../services/Validator.service";

export const validateRegister = () => {
  return [
    Validator.isValidUsername(),
    Validator.isValidEmail(),
    Validator.isValidPassword(),
  ];
};
