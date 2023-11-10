import { Usuario } from "../models/Usuario.js"

//função de get - vai listar os marcas no insomnia
export async function usuarioIndex(req, res) {
    try {
        const usuario = await Usuario.findAll()
        res.status(200).json(usuario)
    } catch (error) {
        res.status(400).send(error)
    }
}

// função de create - vai criar um novo registro no insomnia
export async function usuarioCreate(req, res) {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha ){
        res.status(400).json("Erro... Informe nome, email e senha.")
        return
    }

    try {
        const usuario = await Usuario.create({
            nome, email, senha
        })
        res.status(201).json(usuario)
    } catch (error) {
        res.status(400).send(error)
    }
}

