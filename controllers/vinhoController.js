import { Vinho } from "../models/Vinho.js"

//função de get - vai listar os vinhos no insomnia
export async function vinhoIndex(req, res) {
    try {
        const vinhos = await Vinho.findAll()
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
