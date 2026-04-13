const { z } = require('zod');

// Definimos as regras estritas para criar um Prestador
const prestadorSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().length(11, "O CPF deve ter exatamente 11 dígitos numéricos"),
  profissao: z.string().min(2, "A profissão é obrigatória"),
  
  // Alterado de z.string().datetime() para coerce.date() para evitar erros estritos de TimeZone (Z)
  data_nascimento: z.coerce.date({
    invalid_type_error: "Formato de data inválido. Use um formato reconhecido (ex: AAAA-MM-DD)",
  }),
  
  sobre_mim: z.string().max(1000, "Máximo de 1000 caracteres").optional(),
  foto_perfil: z.string().url("A foto de perfil deve ser um URL válido").optional(),
  fotos_portfolio: z.array(z.string().url()).max(5, "Máximo de 5 fotos no portfólio").optional()
});

module.exports = { prestadorSchema };