const jsonSchema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");

function validateBook(req, res, next) {
  const result = jsonSchema.validate(req.body, bookSchema);
  if (!result.valid) {
    return res.status(400).json({ errors: result.errors.map((e) => e.stack) });
  }
  next();
}
module.exports = validateBook;
