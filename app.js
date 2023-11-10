import express from 'express'
import { sequelize } from './database/conecta.js'
import { Vinho } from './models/Vinho.js'
import { Marca } from './models/Marca.js'
import { Usuario } from './models/Usuario.js'
import routes from './routes.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)
app.use(express.static('images'));


async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem sucedida.');

    await Marca.sync({ alter: true })          //A MARCA PRECISA CRIAR PRIMEIRO PQ ELA É A DONA DA FOREIGN KEY - vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Marcas: Ok!")

    await Vinho.sync({ alter: true })          //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Vinhos: Ok!")

    await Usuario.sync({ alter: true })          //vai ciar a tabela no banco(se nao existir já) e permitir alterações de campos 
    console.log("Tabela de Usuários: Ok!")

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
  res.send(`
    <html lang="pt-br">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href="./garrafa.png" type="image/x-icon" />
      <title>Vinícola Freitas</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');
          .welcome-text {
            font-family: 'Montserrat', sans-serif;
            font-size: 32px;
            color: #010103;
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
          }
          .center-image {
            display: block; 
            margin: 0 auto; 
            margin-top: 20px;
            border-radius: 10px;
          }
          .button-container {
            text-align: center;
            margin-top: 20px; 
          }
          .button-container button {
            display: inline-block; 
            padding: 10px 10px; 
            background-color: #7B152C; 
            border: none;
            border-radius: 10px; 
            cursor: pointer; 
            margin: 10px; 
          }
          .button-container button a{
            color: #f1f1f1; 
            text-decoration: none; 
            font-family: 'Montserrat', sans-serif; 
            font-size: 18px; 
          }
          .button-container button:hover {
            background-color: #8B1531; 
        </style>
      </head>
      <body>
        <div class="welcome-text">Bem-vindo(a)! <br> Sistema da Vinícola Freitas</div>
        <img src="/vinicola.jpg" class="center-image" width="650px">
        
        <div class="button-container">
        <button><a href="/vinhos" target="_blank" style="display: block; text-align: center; padding: 5px;">Ir para Vinhos</a></button>
      
        <button><a href="/marcas" target="_blank" style="display: block; text-align: center; padding: 5px;">Ir para Marcas</a></button>
        </div>
 
        <div style="text-align: center; margin-top: 20px;">
        <img src="/garrafa.png" alt="Garrafa de Vinho 1" width="150px" style="margin: 10px;">
        <img src="/garrafa.png" alt="Garrafa de Vinho 2" width="150px" style="margin: 10px;">
        <img src="/garrafa.png" alt="Garrafa de Vinho 3" width="150px" style="margin: 10px;">
        </div>

      </body>
    </html>
  `);
});


