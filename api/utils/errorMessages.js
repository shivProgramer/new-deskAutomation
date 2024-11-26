// errorMessages.js

module.exports = {
    // Handle duplicate email error
    handleDuplicateEmailError: () => {
      return {
        statusCode: 400,
        message: 'Email already exists. Please use a different email address.',
      };
    },
  
    // Handle validation errors (if any)
    handleValidationError: (errors) => {
      return {
        statusCode: 400,
        message: `Validation failed: ${errors.join(', ')}`,
      };
    },
  
    // Handle general database errors
    handleDatabaseError: () => {
      return {
        statusCode: 500,
        message: 'Database error occurred. Please try again later.',
      };
    },
  
    // Generic error for unexpected errors
    handleUnknownError: () => {
      return {
        statusCode: 500,
        message: 'An unexpected error occurred.',
      };
    },
  
    // Handle other specific errors here
  };
  