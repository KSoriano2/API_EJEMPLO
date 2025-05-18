import { Router } from "express";
import { getUsuarios, getUsuariosxid, postUsuarios, putUsuarios, patchUsuarios, deleteUsuariosxid } from "../controladores/usuariosC.js";


const router = Router();

//armar las rutas "URL";
router.get('/usuarios', getUsuarios),
router.get('/usuarios/:id', getUsuariosxid)
router.post('/usuarios', postUsuarios )
router.put('/usarios/:id', putUsuarios)
router.patch('/usuarios/:id', patchUsuarios)
router.delete('/usuarios/:id', deleteUsuariosxid)

export default router;