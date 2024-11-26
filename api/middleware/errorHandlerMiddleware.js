// errorHandlerMiddleware.js
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
  
    // Handle Sequelize unique constraint error
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
  
    // Handle Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: err.errors.map(error => error.message),
      });
    }
  
    // Handle any other errors
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
};

module.exports = errorHandlerMiddleware;
