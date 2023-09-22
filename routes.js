import { Router } from "express"
import { vinhoCreate, vinhoIndex, vinhoUpdate, vinhoDelete, vinhoAlteraPreco } from "./controllers/vinhoController.js"
import { marcaCreate, marcaIndex, marcaUpdate, marcaDelete } from "./controllers/marcaController.js"

const router = Router()

// --------------------------------------------------------- ROTAS DE VINHOS
router.get("/vinhos", vinhoIndex) //rota pra listagem
      .post("/vinhos", vinhoCreate) //rota pra criação de registro
      .put("/vinhos/:id", vinhoUpdate) //rota pra alteração do registro
      .patch("/vinhos/:taxa", vinhoAlteraPreco) //rota p alterar o preço dos vinhos com porcentagem, o ":taxa" é a varíavel em controller
      .delete("/vinhos/:id", vinhoDelete) //rota pra deletar registros da vinicola

// --------------------------------------------------------- ROTAS DE VINHOS
router.get("/marcas", marcaIndex) //rota pra listagem
      .post("/marcas", marcaCreate) //rota pra criação de registro
      .put("/marcas/:id", marcaUpdate) //rota pra alteração do registro
      .delete("/marcas/:id", marcaDelete) //rota pra deletar registros da vinicola

export default router

