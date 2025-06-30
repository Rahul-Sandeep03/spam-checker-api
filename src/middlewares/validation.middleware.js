import { body, query, validationResult } from 'express-validator';

// Common error handler
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// Auth validations
export const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .matches(/^\d{10}$/).withMessage('Phone must be a 10-digit number'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email')
    .matches(/@gmail\.com$/).withMessage('Must be a @gmail.com address'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('At least 8 characters')
    .matches(/[A-Z]/).withMessage('At least 1 uppercase letter')
    .matches(/[a-z]/).withMessage('At least 1 lowercase letter')
    .matches(/\d/).withMessage('At least 1 number')
    .matches(/[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~` -]/).withMessage('At least 1 special character')
];

export const loginValidation = [
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .matches(/^\d{10}$/).withMessage('Phone must be a 10-digit number'),
  body('password').notEmpty().withMessage('Password is required')
];

// Contacts validation
export const addContactValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .matches(/^\d{10}$/).withMessage('Phone must be a 10-digit number')
];

// Search by phone validation
export const searchByPhoneValidation = [
  query('phone')
    .notEmpty().withMessage('Phone query param is required')
    .matches(/^\d{10}$/).withMessage('Phone must be a 10-digit number')
];
