const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const conectarDB = require('./config/db')

//dependencias de rutas
const bootcampRoutes = require('./routes/bootcampRoutes')
const cursoRoutes = require('./routes/cursoRoutes')
const reviewRoutes = require('./routes/reviewRoutes')

//vincular el archivo .env
dotenv.config(
    { path : './config/.env'}
)

//conectar a la base de datos
conectarDB()

//construir objeto app
const app = express()
//para que se reconozca el body cuando se realice una inserción o actualizacion 
app.use(express.json())

//conectar las rutas al objeto
app.use('/api/v1/devcamp/bootcamps', bootcampRoutes)
app.use('/api/v1/devcamp/cursos', cursoRoutes)
app.use('/api/v1/devcamp/reviews', reviewRoutes)

//rutas de prueba
app.get('/prueba' , (request , response) => {
    response.send("Hola")
})

//traer todos los usuarios
app.get('/usuarios' , (req, res) => {
    res.json({
        success: true,
        msg: "Aqui se mostraran todos los usuarios"
    })
})

//traer un usuario por id
app.get('/usuarios/:id' , (req, res) => {
    res.json({
        success: true,
        msg: `Aqui se mostrará un usuario cuyo id es ${req.params.id}`
    })
})

//crear un usuario
app.post('/usuarios' , (req, res) => {
    res.json({
        success: true,
        msg: "Aqui se creará un usuario"
    })
})

//actualizar/editar un usuario por id
app.put('/usuarios/:id' , (req, res) => {
    res.json({
        success: true,
        msg: `Aqui se actualizá el usuario cuyo id es ${req.params.id}`
    })
})

//eliminar un usuario por id
app.delete('/usuarios/:id' , (req, res) => {
    res.json({
        success: true,
        msg: `Aqui se eliminará el usuario cuyo id es ${req.params.id}`
    })
})

app.get('/prueba/:id' , (request , response) => {
    response.send(`Hola , ${ request.params.id }`)
})

app.listen ( process.env.PUERTO , () => {
    console.log(`Servidor en ejecución: ${process.env.PUERTO}`.bgYellow.green.bold)
})