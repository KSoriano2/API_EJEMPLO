import { conmysql } from "../bd.js";
export const obtenerPedidosDetalle = (req, resp)=>{
    resp.send('Lista de PedidosDetalle')
}
export const getPedidosDetalle=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from pedidos_detalle ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getPedidosDetallexid = async(req, res)=>{
try{
    const [result] = await conmysql.query(' select * from pedidos_detalle where det_id=? ', [req.params.id])
    if(result.length<=0) return res.status(400).json({
        cli_id:0,
        message: "PedidoDetalle no encontrado"
    })

    res.json(result[0])

} catch (error){
    return res.status(500).json({ message: "error en el servidor"})

}

}

//funcion para insertar un cliente
export const postPedidosDetalle = async(req, res)=>{
    try{
        const {prod_id, ped_id, det_cantidad, det_precio} =req.body
        const [result] = await conmysql.query(' INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES(?,?,?,?)', 
        [prod_id, ped_id, det_cantidad, det_precio])
        
        res.send({
            id: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putPedidosDetalle=async(req,res)=>{
    try{
        const {id} = req.params
        const {prod_id, ped_id, det_cantidad, det_precio}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE pedidos SET prod_id=?, ped_id=?, det_cantidad=?, det_precio=? WHERE det_id=?',
            [prod_id, ped_id, det_cantidad, det_precio, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "PedidoDetalle no encontrado"
            })

            const [row] = await conmysql.query(' select * from pedidos_detalle WHERE det_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchPedidosDetalle=async(req,res)=>{
    try{
        const {id} = req.params
        const {prod_id, ped_id, det_cantidad, det_precio}=req.body

        const [result] = await conmysql.query(
            'UPDATE usuarios SET prod_id=IFNULL(?, prod_id), ped_id=IFNULL(?, ped_id), det_cantidad=IFNULL(?, det_cantidad), det_precio=IFNULL(?, det_precio)  WHERE det_id=?',
            [prod_id, ped_id, det_cantidad, det_precio, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "PedidoDetalle no encontrado"
            })

            const [row] = await conmysql.query(' select * from pedidos_detalle WHERE det_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deletePedidosDetallexid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from pedidos_detalle where det_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "PedidoDetalle no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    