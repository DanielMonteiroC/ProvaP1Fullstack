const db = require('../config/mysql');

async function createUser(userData) {
    const query = 'INSERT INTO users (nome, cpf, data_nascimento, tipo) VALUES (?, ?, ?, ?)';
    const values = [userData.nome, userData.cpf, userData.data_nascimento, userData.tipo];

    const [result] = await db.execute(query, values);
    return result.insertId;
}

async function getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] || null;
}

async function getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers
};