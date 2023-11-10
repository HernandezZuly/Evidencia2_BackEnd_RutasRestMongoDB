const express = require('express')
const mongoose = require('mongoose')

//Definir el ruteador
const router = express.Router()

//Se trae el model de curso
const CursoModel = require('../models/cursoModel')

//RUTAS DE CURSOS

//traer todos los cursos
router.get('/' , async (req, res) => {
    //utilizar el modelo para seleccionar todos los cursos que hay en la bd
    try {
        const cursos =
            await CursoModel.find()

        if (cursos.length > 0){
            res.
                status(200).
                json({
                    success: true,
                    data: cursos
                })
        }else{
            res.
                status(400).
                json({
                    success: false,
                    message: 'No hay cursos'
                })
        }
    } catch (error) {
        res.
            status(400).
            json({
                success: false,
                message: error.message
            })
    }
})

//traer un curso por id
router.get('/:id' , async (req, res) => {
    try {
        //extraer el id del curso del parametro de la url
        cursoId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(cursoId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const curso = 
                await CursoModel.findById(cursoId)
            
            if(curso){
                res.
                    status(200).
                    json({
                        success: true,
                        data : curso
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay cursos cuyo id es:${cursoId}`
                    })
            }
        }
    } catch (error) {
        res.
            status(400).
            json({
                success: false,
                message: error.message
            })
    }
})

//crear un curso
router.post('/' , async (req, res) => {
    //el nuevo curso vendra al servidor a traves del body de la request
    try {
        const newCurso = 
            await CursoModel.create(req.body)

        res.
            status(201).
            json({
            success: true,
            data: newCurso
        })
    } catch (error) {
        res.
            status(400).
            json({
                success: false,
                message: error.message
            })
    }
})

//actualizar/editar un curso por id
router.put('/:id' , async (req, res) => {
    try {
        //extraer el id del curso del parametro de la url
        const cursoId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(cursoId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            //la actualizacion del curso vendra al servidor a traves del body de la request
            const updCurso = 
                await CursoModel.findByIdAndUpdate(
                    cursoId,
                    req.body,
                    {   
                        //para que nos muestre el cambio en el response
                        new: true
                    }
                )

            if(updCurso){
                res.
                    status(200).
                    json({
                        success: true,
                        data: updCurso
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay cursos cuyo id es:${cursoId}`
                    })
            }
        }
    } catch (error) {
        res.
            status(400).
            json({
                success: false,
                message: error.message
            })
    }
})

//eliminar un curso por id
router.delete('/:id' , async (req, res) => {
    try {
        //extraer el id del curso del parametro de la url
        const cursoId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(cursoId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const delCurso = 
                await CursoModel.findByIdAndDelete(cursoId)

            if(delCurso){
                res.
                    status(200).
                    json({
                        success: true,
                        data: delCurso
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay cursos cuyo id es:${cursoId} y no se puede eliminar`
                    })
            }
        }
    } catch (error) {
        res.
            status(400).
            json({
                success: false,
                message: error.message
            })
    }
    
})

//exportar el router
module.exports = router