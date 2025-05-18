import { Router } from "express";
import { getPedidos, getPedidosxid, postPedidos, putPedidos, patchPedidos, deletePedidosxid } from "../controladores/pedidosC.js";

const router = Router();

//armar las rutas "URL";
router.get('/pedidos', getPedidos ),
router.get('/pedidos/:id', getPedidosxid )
router.post('/pedidos', postPedidos )
router.put('/pedidos/:id', putPedidos )
router.patch('/pedidos/:id', patchPedidos )
router.delete('/pedidos/:id', deletePedidosxid )

export default router; 