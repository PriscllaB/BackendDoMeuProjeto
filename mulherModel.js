const mongoose = require('mongoose')

const MulherSchema = new mongoose.Schema({
    nome: {
        type: String, 
        require : true        
    },
    imagem: {
        type: String,
        require: true
    },
    citacao: {
        type: String,
        required:true
    },
    minibio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('diva', MulherSchema)