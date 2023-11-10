const mongoose = require('mongoose')

//definir esquema bootcamp
const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "nombre ya está"],
        required:[
            true, 
            "nombre es requerido"
        ]
    },
    phone: {
        type: Number,
        required:[
            true, 
            "telefono requerido"
        ],
        max:[
            1010101010,
            "telefono no debe ser mayor a 10 digitos"
        ],
        min:[
            1425301,
            "telefono no debe tener al menos 7 digitos"
        ]
    },
    address: {
        type: String,
        required:[
            true,
            "direccion requerida"
        ]
    },
    topics: {
        type: [String],
        enum: [
            "Backend",
            "Frontend",
            "Devops",
            "AI"
        ]
    },
    createdAt: Date
})

//Se exporta el modelo
module.exports = mongoose.model("Bootcamp", BootcampSchema)
