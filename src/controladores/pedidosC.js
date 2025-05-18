import { conmysql } from "../bd.js";
export const obtenerPedidos = (req, resp)=>{
    resp.send('Lista de Pedidos')
}
export const getPedidos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from pedidos ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getPedidosxid = async(req, res)=>{
try{
    const [result] = await conmysql.query(' select * from pedidos where ped_id=? ', [req.params.id])
    if(result.length<=0) return res.status(400).json({
        cli_id:0,
        message: "Pedido no encontrado"
    })

    res.json(result[0])

} catch (error){
    return res.status(500).json({ message: "error en el servidor"})

}

}

//funcion para insertar un cliente
export const postPedidos = async(req, res)=>{
    try{
        const {cli_id, ped_fecha, usr_id, ped_estado} =req.body
        const [result] = await conmysql.query(' INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES(?,?,?,?)', 
        [cli_id, ped_fecha, usr_id, ped_estado])
        
        res.send({
            id: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putPedidos=async(req,res)=>{
    try{
        const {id} = req.params
        const {cli_id, ped_fecha, usr_id, ped_estado}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE pedidos SET cli_id=?, ped_fecha=?, usr_id=?, ped_estado=? WHERE ped_id=?',
            [cli_id, ped_fecha, usr_id, ped_estado, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Pedido no encontrado"
            })

            const [row] = await conmysql.query(' select * from pedidos WHERE ped_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchPedidos=async(req,res)=>{
    try{
        const {id} = req.params
        const {cli_id, ped_fecha, usr_id, ped_estado}=req.body

        const [result] = await conmysql.query(
            'UPDATE usuarios SET cli_id=IFNULL(?, cli_id), ped_fecha=IFNULL(?, ped_fecha), usr_id=IFNULL(?, usr_id), ped_estado=IFNULL(?, ped_estado)  WHERE ped_id=?',
            [cli_id, ped_fecha, usr_id, ped_estado, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Pedido no encontrado"
            })

            const [row] = await conmysql.query(' select * from pedidos WHERE ped_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deletePedidosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from pedidos where ped_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Pedido no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    