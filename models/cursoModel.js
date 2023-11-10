const mongoose = require('mongoose')

//definir esquema curso
const CursoSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[
            true, 
            "titulo es requerido"
        ],
        maxLength:[
            30,
            "el titulo no debe ser mayor a 30 caracteres"
        ],
        minLength:[
            10,
            "el titulo debe tener al menos 10 caracteres"
        ]
    },
    description: {
        type: String,
        required:[
            true, 
            "descripción es requerida"
        ],
        minLength:[
            10,
            "el titulo debe tener al menos 10 caracteres"
        ]
    },
    weeks: {
        type: Number,
        required:[
            true,
            "numero de semanas requerido"
        ],
        max:[
            9,
            "el numero maximo de semanas es 9"
        ]
    },
    enroll_cost: {
        type: Number,
        required:[
            true,
            "costo de inscripción requerido"
        ]
    },
    minimum_skill: {
        type: String,
        required:[
            true,
            "la habilidad minima es requerida"
        ],
        enum: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ]
    }
})

//Se exporta el modelo
module.exports = mongoose.model("Curso", CursoSchema)
