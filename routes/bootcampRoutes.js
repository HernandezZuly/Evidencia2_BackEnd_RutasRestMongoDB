const express = require('express')
const mongoose = require('mongoose')

//Definir el ruteador
const router = express.Router()

//Se trae el model de bootcamps
const BootcampModel = require('../models/bootcampModel')


//rutas de bootcamps
//endpoints 
//traer todos los bootcamps
router.get('/' , async (req, res) => {
    //utilizar el modelo para seleccionar todos los bootcamps que hay en la bd
    try {
        const bootcamps =
            await BootcampModel.find()

        if (bootcamps.length > 0){
            res.
                status(200).
                json({
                    success: true,
                    data: bootcamps
                })
        }else{
            res.
                status(400).
                json({
                    success: false,
                    message: 'No hay bootcamps'
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


//traer un bootcamp por id
router.get('/:id' , async (req, res) => {
    try {
        //extraer el id del bootcamp del parametro de la url
        bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const bootcamp = 
                await BootcampModel.findById(bootcampId)
            
            if(bootcamp){
                res.
                    status(200).
                    json({
                        success: true,
                        data : bootcamp
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay bootcamps cuyo id es:${bootcampId}`
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

//crear un bootcamp
router.post('/' , async (req, res) => {
    //el nuevo bootcamp vendra al servidor a traves del body de la request
    try {
        const newBootcamp = 
            await BootcampModel.create(req.body)

        res.
            status(201).
            json({
            success: true,
            data: newBootcamp
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

//actualizar/editar un bootcamp por id
router.put('/:id' , async (req, res) => {
    try {
        //extraer el id del bootcamp del parametro de la url
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            //la actualizacion del bootcamp vendra al servidor a traves del body de la request
            const updBootcamp = 
                await BootcampModel.findByIdAndUpdate(
                    bootcampId,
                    req.body,
                    {   
                        //para que nos muestre el cambio en el response
                        new: true
                    }
                )

            if(updBootcamp){
                res.
                    status(200).
                    json({
                        success: true,
                        data: updBootcamp
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay bootcamps cuyo id es:${bootcampId}`
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

//eliminar un bootcamp por id
router.delete('/:id' , async (req, res) => {
    try {
        //extraer el id del bootcamp del parametro de la url
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const delBootcamp = 
                await BootcampModel.findByIdAndDelete(bootcampId)

            if(delBootcamp){
                res.
                    status(200).
                    json({
                        success: true,
                        data: delBootcamp
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay bootcamps cuyo id es:${bootcampId} y no se puede eliminar`
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