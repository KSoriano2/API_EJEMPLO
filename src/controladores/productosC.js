import { conmysql } from "../bd.js";
export const obtenerProductos = (req, resp)=>{
    resp.send('Lista de Productos')
}
export const getProductos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from productos ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getProductosxid = async(req, res)=>{
try{
    const [result] = await conmysql.query(' select * from productos where prod_id=? ', [req.params.id])
    if(result.length<=0) return res.status(400).json({
        cli_id:0,
        message: "Producto no encontrado"
    })

    res.json(result[0])

} catch (error){
    return res.status(500).json({ message: "error en el servidor"})

}

}

//funcion para insertar un cliente
export const postProductos = async(req, res)=>{
    try{
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen} =req.body
        const [result] = await conmysql.query(' INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES(?,?,?,?,?,?)', 
        [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
        
        res.send({
            id: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putProductos=async(req,res)=>{
    try{
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=? WHERE prod_id=?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Producto no encontrado"
            })

            const [row] = await conmysql.query(' select * from productos WHERE prod_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchProductos=async(req,res)=>{
    try{
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen}=req.body

        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo=IFNULL(?, prod_codigo), prod_nombre=IFNULL(?, prod_nombre), prod_stock=IFNULL(?, prod_stock), prod_precio=IFNULL(?, prod_precio), prod_activo=IFNULL(?, prod_activo), prod_imagen=IFNULL(?, prod_imagen)  WHERE prod_id=?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Producto no encontrado"
            })

            const [row] = await conmysql.query(' select * from productos WHERE prod_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteProductosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from productos where prod_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Producto no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}


export const postProdu = async(req, res)=>{
    try {
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} =req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}`: null;
        //console.log("Datos del producto", req.body)    
        //console.log("Archivo imagen: ", req.file)
        
        const [fila] = await conmysql.query(' Select * from productos where prod_codigo=? ', [prod_codigo])
        if (fila.length > 0) return res.status(404).json({
            id: 0,
            message: 'Producto con codigo: ' + prod_codigo + ' ya está registrado '

        })

        const [rows] = await conmysql.query(' INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen) VALUES(?,?,?,?,?,?)', 
        [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen])
        
        res.send({
            id: rows.insertId,
            message: 'Producto registrado con éxito'
        })

    } catch (error) {
        return res.status(500).json({message: error})    
    }
    
}





export const putProdu = async(req, res)=>{
    try {
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} =req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}`: null;
        //console.log("Datos del producto", req.body)    
        //console.log("Archivo imagen: ", req.file)
        
        const [fila] = await conmysql.query(' Select * from productos where prod_codigo=? ', [prod_codigo])
        if (fila.length > 0) return res.status(404).json({
            id: 0,
            message: 'Producto con codigo: ' + prod_codigo + ' ya está registrado '

        })

        const [result] = await conmysql.query(
            'UPDATE productos SET prod_codigo=?, prod_nombre=?, prod_stock=?, prod_precio=?, prod_activo=?, prod_imagen=? WHERE prod_id=?',
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Producto no encontrado"
            })

            const [row] = await conmysql.query(' select * from productos WHERE prod_id=?', [id])
            res.json(row[0])


    } catch (error) {
        return res.status(500).json({message: error})    
    }
    
}



export const patchProdu = async(req, res)=>{
    try {
        const {id} = req.params
        const {prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo} =req.body
        const prod_imagen = req.file ? `/uploads/${req.file.filename}`: null;
        //console.log("Datos del producto", req.body)    
        //console.log("Archivo imagen: ", req.file)
        
        const [fila] = await conmysql.query(' Select * from productos where prod_codigo=? ', [prod_codigo])
        if (fila.length > 0) return res.status(404).json({
            id: 0,
            message: 'Producto con codigo: ' + prod_codigo + ' ya está registrado '

        })

        const [result] = await conmysql.query(
        'UPDATE productos SET prod_codigo=IFNULL(?, prod_codigo), prod_nombre=IFNULL(?, prod_nombre), prod_stock=IFNULL(?, prod_stock), prod_precio=IFNULL(?, prod_precio), prod_activo=IFNULL(?, prod_activo), prod_imagen=IFNULL(?, prod_imagen)  WHERE prod_id=?',
        [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id])

        if(result.affectedRows<=0) return res.status(404).json({
            message: "Producto no encontrado"
        })

        const [row] = await conmysql.query(' select * from productos WHERE prod_id=?', [id])
        res.json(row[0])


    } catch (error) {
        return res.status(500).json({message: error})    
    }
    
}
