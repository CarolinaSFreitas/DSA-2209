import express from 'express'
import { sequelize } from './database/conecta.js'
import { Vinho } from './models/Vinho.js'
import { Marca } from './models/Marca.js'
import routes from './routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');
    
    await Marca.sync({alter: true})          //A MARCA PRECISA CRIAR PRIMEIRO PQ ELA É A DONA DA FOREIGN KEY - vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Marcas: Ok!")

    await Vinho.sync({alter: true})          //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Vinhos: Ok!")
    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');
  } catch (error) {
    console.error('Impossível conectar ao banco de dados:', error);
  }
}
conecta_db()

app.listen(port, () => {
  console.log(`API da Vinícola Freitas Rodando na Porta ${port}`)
})

app.get('/', (req, res) => {
  res.send('Bem-vindo(a)!')
  res.send('Sistema da Vinícola Freitas')
})