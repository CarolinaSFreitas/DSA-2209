import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

import * as dotenv from 'dotenv'
dotenv.config()

import { Usuario } from "../models/Usuario.js"

export async function loginUsuario(req, res){
    const { email, senha } = req.body

    const mensaErroPadrao = "Erro... Login ou senha Inválidos"
}


