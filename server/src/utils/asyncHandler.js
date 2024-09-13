export const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      const statusCode =
        error.code && Number.isInteger(error.code) ? error.code : 500;
      res.status(statusCode).json({
        success: false,
        message: "shitty error" || "Internal Server Error",
      });
    }
  };
};
