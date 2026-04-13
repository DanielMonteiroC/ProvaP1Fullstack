const db = require('../config/mysql');
const Car = require('../models/carModel');

async function getAllCars(){
    const [rows] = await db.query('SELECT * FROM cars');
    return rows.map(
        row => new Car(row.id, row.modelo, row.marca, row.ano, row.preco)
    );
}
    
async function getCarById(id) {
    const [rows] = await db.query(
        'SELECT * FROM cars WHERE id = ?',
        [id]
    )
    if (!rows[0]) return null;

    const row = rows[0];
    return new Car(row.id, row.modelo, row.marca, row.ano, row.preco);
}

async function createCar(carData) {
    const query = 'INSERT INTO cars (marca, modelo, ano, preco) VALUES (?, ?, ?, ?)';
    const values = [carData.marca, carData.modelo, carData.ano, carData.preco];

    const [result] = await db.execute(query, values);
    return result.insertId;
}

async function updateCar(id, carData) {
    const query = 'UPDATE cars SET marca = ?, modelo = ?, ano = ?, preco = ? WHERE id = ?';
    const values = [carData.marca, carData.modelo, carData.ano, carData.preco, id];

    const [result] = await db.execute(query, values);
    return result.affectedRows > 0;
}

async function deleteCar(id) {
    const query = 'DELETE FROM cars WHERE id = ?';

    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
}

module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
};