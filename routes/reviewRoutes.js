const express = require('express')
const mongoose = require('mongoose')

//Definir el ruteador
const router = express.Router()

//Se trae el model de curso
const ReviewModel = require('../models/reviewModel')

//RUTAS DE REVIEWS

//traer todos las reviews
router.get('/' , async (req, res) => {
    //utilizar el modelo para seleccionar todas las reviews que hay en la bd
    try {
        const reviews =
            await ReviewModel.find()

        if (reviews.length > 0){
            res.
                status(200).
                json({
                    success: true,
                    data: reviews
                })
        }else{
            res.
                status(400).
                json({
                    success: false,
                    message: 'No hay reviews'
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

//traer un review por id
router.get('/:id' , async (req, res) => {
    try {
        //extraer el id del curso del parametro de la url
        reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const review = 
                await ReviewModel.findById(reviewId)
            
            if(review){
                res.
                    status(200).
                    json({
                        success: true,
                        data : review
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay reviews cuyo id es:${reviewId}`
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

//crear una review
router.post('/' , async (req, res) => {
    //el nuevo review vendra al servidor a traves del body de la request
    try {
        const newReview = 
            await ReviewModel.create(req.body)

        res.
            status(201).
            json({
            success: true,
            data: newReview
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

//actualizar/editar una review por id
router.put('/:id' , async (req, res) => {
    try {
        //extraer el id del review del parametro de la url
        const reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            //la actualizacion del review vendra al servidor a traves del body de la request
            const updReview = 
                await ReviewModel.findByIdAndUpdate(
                    reviewId,
                    req.body,
                    {   
                        //para que nos muestre el cambio en el response
                        new: true
                    }
                )

            if(updReview){
                res.
                    status(200).
                    json({
                        success: true,
                        data: updReview
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay reviews cuyo id es:${reviewId}`
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

//eliminar un review por id
router.delete('/:id' , async (req, res) => {
    try {
        //extraer el id del review del parametro de la url
        const reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
                .status(500)
                .json({
                    success: false,
                    msg: "Identificador invalido"
                })
        }else{
            const delReview = 
                await ReviewModel.findByIdAndDelete(reviewId)

            if(delReview){
                res.
                    status(200).
                    json({
                        success: true,
                        data: delReview
                    })
            }else{
                res.
                    status(400).
                    json({
                        success: false,
                        message: `No hay review cuyo id es:${reviewId} y no se puede eliminar`
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