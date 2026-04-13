const userRepository = require("../repositories/userRepository");
const Profile = require("../models/userModel");

// POST - Criar Usuário
async function createUser(req, res) {
    // Dados que vêm no body da requisição
    const { nome, cpf, data_nascimento, tipo, profissao, sobre_mim } = req.body;

    if (!nome || !cpf || !data_nascimento || !tipo) {
        return res.status(400).json({ erro: "Nome, CPF, data de nascimento e tipo são obrigatórios." });
    }

    try {
        // 1. Salva os dados no MySQL e pega o ID gerado
        const insertId = await userRepository.createUser({ nome, cpf, data_nascimento, tipo });

        // 2. Prepara o documento do MongoDB
        const profileData = { 
            userId: insertId,
            sobre_mim: sobre_mim || null
        };
        
        // Regra: Se for prestador, adiciona a profissão.
        if (tipo === 'prestador' && profissao) {
            profileData.profissao = profissao;
        }

        const profile = new Profile(profileData);
        await profile.save();

        res.status(201).json({ message: "Usuário criado com sucesso!", userId: insertId });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ erro: "Erro interno ao tentar criar o usuário." });
    }
}

// PUT - Atualizar Foto de Perfil (Apenas 1, sobrescreve a antiga)
async function updateProfilePhoto(req, res) {
    const userId = req.params.id;
    // Em um sistema real, o nome/caminho da foto viria do Multer (req.file.path). 
    // Aqui usamos string no body para testes via JSON.
    const { novaFotoUrl } = req.body; 

    try {
        const profile = await Profile.findOne({ userId: userId });
        if (!profile) return res.status(404).json({ erro: "Perfil não encontrado." });

        // Lógica de deletar a foto antiga (fs.unlinkSync) entraria aqui antes de sobrescrever

        profile.foto_perfil = novaFotoUrl;
        await profile.save();

        res.json({ message: "Foto de perfil atualizada!", foto: profile.foto_perfil });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar foto de perfil." });
    }
}

// POST - Adicionar Foto no Portfólio (Máximo 5, só prestador)
async function addPortfolioPhoto(req, res) {
    const userId = req.params.id;
    const { novaFotoUrl } = req.body;

    try {
        // Verifica no MySQL se o usuário é prestador
        const user = await userRepository.getUserById(userId);
        if (!user || user.tipo !== 'prestador') {
            return res.status(403).json({ erro: "Apenas prestadores podem ter área de fotos." });
        }

        // Busca o perfil no MongoDB
        const profile = await Profile.findOne({ userId: userId });
        if (!profile) return res.status(404).json({ erro: "Perfil não encontrado." });
        
        // Verifica se já tem 5 fotos
        if (profile.area_fotos.length >= 5) {
            return res.status(400).json({ erro: "Limite de 5 fotos atingido. Exclua uma antes de adicionar nova." });
        }

        // Adiciona a nova foto
        profile.area_fotos.push(novaFotoUrl);
        await profile.save();

        res.json({ message: "Foto adicionada ao portfólio!", fotos: profile.area_fotos });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

// GET - Listar Usuários e seus perfis combinados
async function listUsers(req, res) {
    try {
        const usersMySQL = await userRepository.getAllUsers();
        const perfisMongo = await Profile.find();
        
        // Junta os dados dos dois bancos
        const usuariosCompletos = usersMySQL.map(user => {
            const perfil = perfisMongo.find(p => p.userId === user.id) || {};
            return { ...user, perfil };
        });

        res.json(usuariosCompletos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar usuários." });
    }
}

module.exports = { createUser, updateProfilePhoto, addPortfolioPhoto, listUsers };