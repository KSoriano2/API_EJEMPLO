import { Router } from "express";
import { deleteClientesxid, getClientes, getClientesxid, patchClientes, postClientes, putClientes } from "../controladores/clientesC.js";



const router = Router();

//armar las rutas "URL";
router.get('/clientes', getClientes ),
router.get('/clientes/:id', getClientesxid)
router.post('/clientes', postClientes)
router.put('/clientes/:id', putClientes)
router.patch('/clientes/:id', patchClientes)
router.delete('/clientes/:id', deleteClientesxid)

export default router;