import { Router } from "express";
import { getPedidosDetalle, getPedidosDetallexid, postPedidosDetalle, putPedidosDetalle, patchPedidosDetalle, deletePedidosDetallexid } from "../controladores/pedidosDetalleC.js";

const router = Router();

//armar las rutas "URL";
router.get('/pedidos_detalle', getPedidosDetalle ),
router.get('/pedidos_detalle/:id', getPedidosDetallexid )
router.post('/pedidos_detalle', postPedidosDetalle )
router.put('/pedidos_detalle/:id', putPedidosDetalle )
router.patch('/pedidos_detalle/:id', patchPedidosDetalle )
router.delete('/pedidos_detalle/:id', deletePedidosDetallexid )

export default router; 