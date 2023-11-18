# DSA-2209
Aula 9 de Desenvolvimento de Serviços e APIs - ASSOCIAÇÕES - 1-N - 22/09

# 🍷 VINÍCOLA

#### Documentação do Sequelize: 
+ https://sequelize.org/docs/v6/core-concepts/assocs/

### Lembrando que:

**Pra iniciar**:
1. `` npm init -y ``
2. `` npm i express sequelize mysql2 cors ``
3. `` npm i --save-dev nodemon ``
4. `` npx nodemon app ``
5. No VS, criar um "app.js" como o arquivo do repo
6. ⚠️ Alterar o "package.json", adicionando a linha `` "type": "module", `` após a linha de "main": "index.js","

**Banco de Dados**:
1. Criar a pasta "database" com um arquivo chamado "conecta.js" e lá dentro inserir:

```
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('aula', 'aluno', 'senacrs', {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: 3306 
  });
  
````

**No Insomnia**:
1. URL: http://localhost:3000/aula
2. Criar uma pasta pro projeto
3. **CRUD**: Criar as HTTP Requests básicas (GET (listagem), POST (criação do registro no banco), PUT (alterações no registro), DEL (exclusão do registro))

----

## ⚠️ Atenção: Em 'app.js'

Deve-se criar primeiro a tabela que é dona da chave estrangeira, como nesse caso, **marcas**

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/9260e37d-9ac4-4e0a-97f3-e9186c595143)

## 🔑 Chave Estrangeira - Para fazer o Relacionamento 1-N (um pra muitos)

1. Após criar as tabelas em Models (Marca, Vinho), fora da definição dos campos deve-se indicar na tabela que vai receber a chave estrangeira:

````
Vinho.belongsTo(Marca, {
    foreignKey: {
        name: "marca_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Marca.hasMany(Vinho, {
    foreignKey: "marca_id"
})
````

Dessa forma ele importará a model 'Marca.js' e receberá a foreign key 

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/3f3d3c10-3e58-4c35-841f-08f65bd8cd71)

## 🕹️ Controllers e Routes 🛣️

1. Tem que criar um controller para cada na pasta controllers, o **vinhoController** e **marcaController**.

2. Em 'routes.js', deve-se criar rotas para cada controller, como da seguinte forma: 

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/5fe2d46b-f6eb-4755-8439-c715a17efaca)

## Pra listagem trazer os dados da tabela que tá como FK, deve-se adicionar a linha no controller de vinhos e marcas:

+ Em vinhoController:

````
    try {
        const vinhos = await Vinho.findAll({
          include: Marca
        })
````

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/f88cd9ab-3345-4997-9720-4af8a8510e85)

+ Em marcaController:

````
    try {
        const marcas = await Marca.findAll({
            include: Vinho
        })
````

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/7969d0c6-68a3-45e1-a038-fc4bbee479d9)

Dessa forma, a listagem de marcas ficará como: 
![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/9450379c-57a0-450b-854e-61896f563393)

E a listagem de vinhos ficará:
![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/613cc010-1abf-4653-8be2-baba16f607dd)

#### Para alteração única, como de preço por percentagem, usar o '.patch' e não o '.put'. Exemplo de função pra isso: 

````
// função para alterar os preços dos vinhos com porcentagem indicada na url no insomnia (10 por ex.)
export async function vinhoAlteraPreco(req, res) {
    const { taxa } = req.params
    const percentual = 1 + Number((taxa / 100))

    try {
      await sequelize.query(`update vinhos set preco = preco * ${percentual}`) //altera todos os preços porque não tem where

        res.status(200).json({msg: "Ok! Preço alterado com sucesso."})
    } catch (error) {
        res.status(400).send(error)
    }
}
````

Em rotas: ``  .patch("/vinhos/:taxa", vinhoAlteraPreco) `` 


----

## 10/11 Criptografia 

+ Instalar o bcrypt usando `` npm i bcrypt ``

Como fica a senha:
  ![image](https://github.com/CarolinaSFreitas/api-vinicola-dsa-2209/assets/99994934/f8285f0d-4cb3-4a4f-83b5-49fd9e75651b)

+ Instalar o jsonwebtoken ``npm i jsonwebtoken``

+ Instalar o dotenv `` npm i dotenv ``

----

Como fica após verificar se a senha do login do usuário tá correta: 
![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/0e4a1044-486c-40fc-bef3-27f078fc96b5)
se tiver errada retorna uma mensagem "Email ou senha incorretos"

Sem o token a autenticação vai ter falha e não vai permitir a listagem das marcas (tem um Middleware na rota de listagem de Marcas de Vinho)
Dessa forma:
![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/df81c2c0-88dc-466c-b03d-aaec5bfed2d1)

Pra fazer a autenticação de forma correta, ir no Insomnia em: Headers > Add > Preencher o campo como "Authorization" e o outro como "Behave <token do usuário>", esse token é o que o usuário recebe quando faz login com sucesso. Então com a autenticação feita com sucesso, agora a listagem de Marcas de Vinho é feita sem erros:

![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/61355076-2ad9-4b66-aeba-3f7251b0c4f9)

Lembrar de criar um arquivo ".env" para armazenar como hidden os tokens, por exemplo:

![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/b1ae37cc-ec58-4c7c-82ff-de64382e2a35)

----

## Aula dia 17/11 - Exclusão não verdadeira e Recuperação de senha por e-mail

+ https://sequelize.org/docs/v6/core-concepts/paranoid/ - doc. sobre a exclusão não verdadeira
+ https://nodemailer.com/about/ - pacote pra parte de e-mails
+ https://mailtrap.io/pt/ - serviço do envio de e-mails


No Mailtrap ir em:
    1. Email testing
    2. Inboxes
    3. Escolhe o Node com o Nodemailer
    
![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/b40f0a6d-da98-41c4-ab5e-fa15fa2a068d)

**Instalações:**
+ `` npm i nodemailer ``
+ `` npm i md5 ``

Inbox do Mailtrap depois da solicitação de troca de senha:

![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/2d43ceac-c54e-4a0d-8d38-74615c05b5e7)

Onde buscar a URL pra trocar a senha lá no Mailtrap:

- Na aba "text":
    ![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/331d1c02-2fab-4177-81b7-6fa26561886d)

Cola URL no Insomnia:

![image](https://github.com/CarolinaSFreitas/api-vinicola_dsa/assets/99994934/599a0492-2669-465a-b86b-5c6243a53777)


