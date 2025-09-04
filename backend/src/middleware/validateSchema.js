export const validateZodSchema = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten().fieldErrors,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: ["Internal server error"] });
  }
};
