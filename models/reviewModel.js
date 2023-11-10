const mongoose = require('mongoose')

//definir esquema curso
const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[
            true, 
            "titulo es requerido"
        ],
        maxLength:[
            20,
            "el titulo no debe ser mayor a 20 caracteres"
        ]
    },
    text: {
        type: String,
        required:[
            true, 
            "texto es requerida"
        ],
        maxLength:[
            50,
            "el texto no debe ser mayor a 50 caracteres"
        ]
    },
    rating: {
        type: Number,
        required:[
            true,
            "la calificación es requerida"
        ],
        enum: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            "La calificacion puede ser unicamente de 1 a 10"
        ]
    }
})

//Se exporta el modelo
module.exports = mongoose.model("Review", ReviewSchema)
