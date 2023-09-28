import { sequelize } from "../database/conecta.js"
import { Marca } from "../models/Marca.js"
import { Vinho } from "../models/Vinho.js"
import { Op } from 'sequelize';


//função de get - vai listar os vinhos no insomnia
export async function vinhoIndex(req, res) {
    try {
        const vinhos = await Vinho.findAll({
            include: Marca
        })
        res.status(200).json(vinhos)
    } catch (error) {
        res.status(400).send(error)
    }
}

// função de create - vai criar um novo registro no insomnia
export async function vinhoCreate(req, res) {
    const { tipo, marca_id, teor, preco } = req.body

    if (!tipo || !marca_id || !teor || !preco) {
        res.status(400).json("Erro... Informe tipo, marca_id, teor e preço.")
        return
    }

    try {
        const vinho = await Vinho.create({
            tipo, marca_id, teor, preco
        })
        res.status(201).json(vinho)
    } catch (error) {
        res.status(400).send(error)
    }
}

// função de update/alterar registro no insomnia
export async function vinhoUpdate(req, res) {
    const { id } = req.params

    const { tipo, marca_id, teor, preco } = req.body

    if (!tipo || !marca_id || !teor || !preco) {
        res.status(400).json("Erro... Informe tipo, marca_id, teor e preço.")
        return
    }

    try {
        const vinho = await vinho.update({
            tipo, marca_id, teor, preco
        }, {
            where: { id }
        })
        res.status(200).json(vinho)
    } catch (error) {
        res.status(400).send(error)
    }
}

// função para alterar os preços dos vinhos com porcentagem indicada na url no insomnia (10 por ex.)
export async function vinhoAlteraPreco(req, res) {
    const { taxa } = req.params
    const percentual = 1 + Number((taxa / 100))

    try {
        await sequelize.query(`update vinhos set preco = preco * ${percentual}`) // sem where ele vai alterar de todos

        res.status(200).json({ msg: "Ok! Preço alterado com sucesso." })
    } catch (error) {
        res.status(400).send(error)
    }
}

//função de deletar registro no insomnia
export async function vinhoDelete(req, res) {
    const { id } = req.params

    try {
        await Vinho.destroy({
            where: { id }
        })
        res.status(200).json({ msg: "Ok! Removido com sucesso :)" })
    } catch (error) {
        res.status(400).send(error)
    }
}

// método de filtro que o tipo contenha a string passada como parâmetro (ex: tinto, seco, suave)
export async function vinhoPorTipo(req, res) {
    const { tipo } = req.params;

    try {
        const vinhos = await Vinho.findAll({
            where: {
                tipo: {
                    [Op.like]: `%${tipo}%`,         //esse 'op.like' é um operador q vai verificar se a string(nesse caso :tipo) tem outra string, o perador 'op.lte' é de comparação menor ou igual
                },
            },
        });

        res.status(200).json(vinhos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocorreu um erro ao buscar o vinho pelo tipo." });
    }
}