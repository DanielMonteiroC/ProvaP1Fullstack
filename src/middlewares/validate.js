// Este middleware recebe um esquema de validação e testa o req.body
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next(); // Dados válidos, segue para o Controller
  } catch (error) {
    // Retorna erro 400 (Bad Request) detalhando o que falhou
    return res.status(400).json({
      erro: "Dados de entrada inválidos",
      detalhes: error.errors.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }))
    });
  }
};

module.exports = validate;