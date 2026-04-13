const mongoose = require("mongoose");

// Função validadora para o array de fotos (Máximo 5)
function arrayLimit(val) {
    return val.length <= 5;
}

const profileSchema = new mongoose.Schema({
    userId: { 
        type: Number, // Este ID será o mesmo gerado pelo MySQL
        required: true, 
        unique: true 
    },
    foto_perfil: { 
        type: String, // String contendo a URL ou caminho do arquivo
        default: null 
    },
    sobre_mim: { 
        type: String, 
        maxlength: [1000, "O campo sobre mim não pode exceder 1000 caracteres."] 
    },
    profissao: { 
        type: String, // Será preenchido apenas se for prestador
        default: null
    },
    area_fotos: {
        type: [String], // Array de caminhos de imagens
        validate: [arrayLimit, "Limite máximo de 5 fotos atingido. Exclua uma antes de enviar nova."]
    }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;