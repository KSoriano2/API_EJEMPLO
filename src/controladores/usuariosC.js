import { conmysql } from "../bd.js";
export const obtenerUsuarios = (req, resp)=>{
    resp.send('Lista de Usuarios')
}
export const getUsuarios=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from usuarios ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getUsuariosxid = async(req, res)=>{
try{
    const [result] = await conmysql.query(' select * from usuarios where usr_id=? ', [req.params.id])
    if(result.length<=0) return res.status(400).json({
        cli_id:0,
        message: "Usuario no encontrado"
    })

    res.json(result[0])

} catch (error){
    return res.status(500).json({ message: "error en el servidor"})

}

}

//funcion para insertar un cliente
export const postUsuarios = async(req, res)=>{
    try{
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo} =req.body
        const [result] = await conmysql.query(' INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES(?,?,?,?,?,?)', 
        [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])
        
        res.send({
            id: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putUsuarios=async(req,res)=>{
    try{
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? WHERE usr_id=?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Usuario no encontrado"
            })

            const [row] = await conmysql.query(' select * from usuarios WHERE usr_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchUsuarios=async(req,res)=>{
    try{
        const {id} = req.params
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body

        const [result] = await conmysql.query(
            'UPDATE usuarios SET usr_usuario=IFNULL(?, usr_usuario), usr_clave=IFNULL(?, usr_clave), usr_telefono=IFNULL(?, usr_telefono), usr_correo=IFNULL(?, usr_correo), usr_activo=IFNULL(?, usr_activo) WHERE usr_id=?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Usuario no encontrado"
            })

            const [row] = await conmysql.query(' select * from usuarios WHERE usr_id=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteUsuariosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from usuarios where usr_id=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Usuario no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    