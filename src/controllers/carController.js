const carRepository = require("../repositories/carRepository");

//Listar
async function listCars(req,res) {
    const cars = await carRepository.getAllCars();
    res.json(cars);
};

//Buscar
async function getCar(req,res) {
    const car = await carRepository.getCarById(req.params.id);

    if (!car) {
        return res.status(404).json({ erro: "Carro não encontrado"}
        )
    }
    res.json(car);
};

//Adicionar
async function createCar(req,res) {
    try{
        const carData = req.body;
        if (!carData.marca || !carData.modelo || !carData.ano || !carData.preco){
            return res.status(400).json({ error: 'Todos os campos (marca, modelo, ano, preco) são obrigatórios.'});  
        }

        const insertId = await carRepository.createCar(carData);
        res.status(201).json({message: 'Carro criado com sucesso!', id: insertId});
    } catch (error){
        console.error('Erro ao criar carro', error);
        res.status(500).json({ error: 'Erro interno no servidor ao tentar criar o carro.'});
    }
};

//Modificar
async function updateCar(req,res) {
    try{
        const id = req.params.id;
        const carData = req.body;

        const updated = await carRepository.updateCar(id, carData);

        if (updated){
            res.status(200).json({ message: 'Carro atualizado com sucesso!'});
        } else {
            res.status(404).json({ error: 'Carro não encontrado.'});
        }
    }catch (error){
        console.error('Erro ao atualizar carro:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao tentar atualizar o carro.'});
    }
};

//Apagar
async function deleteCar(req,res) {
    try{
        const id = req.params.id;

        const deleted = await carRepository.deleteCar(id);

        if (deleted){
            res.status(200).json({ message: 'Carro deletado com sucesso!'});
        } else{
            res.status(404).json({ error: 'Carro não encontrado'});
        }
    } catch(error){
        console.error('Erro ao deletar carro', error);
        res.status(500).json({ error: 'Erro interno no servidor ao tentar deletar o carro'});
    }
};

module.exports = {
    listCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
};