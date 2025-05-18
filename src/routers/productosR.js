import { Router } from "express";
import { getProductos, getProductosxid, postProductos, putProductos, patchProductos, deleteProductosxid, postProdu, putProdu, patchProdu } from "../controladores/productosC.js";
import multer from "multer";




const router = Router();


//configurar multer para almacenar las imagenes
const storage = multer.diskStorage({
destination: (req, file, cb)=>{
    cb(null, 'uploads'); //carpeta donde se guardan las imagenes
},
filename:(req, file, cb)=>{
    cb(null, `${Date.now()}-${file.originalname}`);
}
})


const upload = multer({storage});


//armar las rutas "URL";
router.get('/productos', getProductos ),
router.get('/productos/:id', getProductosxid)
//router.post('/productos', postProductos )
//router.put('/productos/:id', putProductos)
//router.patch('/productos/:id', patchProductos )
router.delete('/productos/:id', deleteProductosxid )
router.post('/productos', upload.single('prod_imagen'), postProdu)
router.put('/productos/:id', upload.single('prod_imagen'), putProdu)
router.patch('/productos/:id', upload.single('prod_imagen'), patchProdu)
export default router; 