const mongoose = require('mongoose');
const unicoValidador = require('mongoose-unique-validator');

let ValidaRoles = {
    values: ['Admin', 'USER_ROLE'],
    message: '{VALUE} no es valido'
};

let ValidaEstado = {
    values: ['true', 'false'],
    message: '{VALUE} no es valido el estatus'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    edad: {
        type: String,
        require: false
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'Es requerido el pass']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ValidaRoles
    },
    estado: {
        type: Boolean,
        default: true,
        enum: ValidaEstado
    }
});

usuarioSchema.methods.toJSON = function() {
    let usuario = this;
    let objetousuario = usuario.toObject();

    delete objetousuario.password;

    return objetousuario;
}

usuarioSchema.plugin(unicoValidador, { message: '{PATH tiene que ser unico' });

module.exports = mongoose.model('usuario', usuarioSchema);