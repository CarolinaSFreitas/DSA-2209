# DSA-2209
Aula 9 de Desenvolvimento de Serviços e APIs - ASSOCIAÇÕES - 22/09

# VINÍCOLA

#### Documentação do Sequelize: 
+ https://sequelize.org/docs/v6/core-concepts/assocs/

### Lembrando que:

**Pra iniciar**:
1. `` npm init -y ``
2. `` npm i express sequelize mysql2 cors ``
3. `` npm i --save-dev nodemon ``
4. `` npx nodemon app ``
5. No VS, criar um "app.js" como o arquivo do repo
6. Alterar o "package.json", adicionando a linha `` "type": "module", `` após a linha de "main": "index.js","

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

**Chave Estrangeira - Para fazer o Relacionamento 1-N (um pra muitos)** 

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
````

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/1a24a73a-380e-4458-bd6d-17b3da744fd3)

Fazendo isso, ele vai importar no topo do código a outra tabela dona da key:

`` import { Marca } from "./Marca.js"; `` 

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/6d85c4e2-c7cd-4013-92ee-2c499e12eb3c)

2. Na tabela dona da chave estrangeira, deve-se indicar também:

````
Marca.hasMany(Vinho, {
    foreignKey: "marca_id"
})

````

![image](https://github.com/CarolinaSFreitas/DSA-2209/assets/99994934/0efec5c9-739d-4f3b-bfec-6e0afed444d6)


