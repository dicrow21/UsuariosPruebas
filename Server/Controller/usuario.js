const express = require('Express');
const MdUsuario = require('../Models/usuario'); //Se crea un objeto
const bcrypt = require('bcrypt');
const _ = require('underscore'); // el estandar de underscore es "_" pero se puede usar cualquier cosa
const app = express();


app.get('/usuario', function(req, res) {
    // res.json('get usuario LOCAL!!!!!!!!!')

    let paginacion = req.query.paginacion || 0;
    paginacion = Number(paginacion);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    let EstadoReg = req.query.EstadoReg || true;
    EstadoReg = Boolean(EstadoReg);

    MdUsuario.find({ estado: EstadoReg }, 'nombre email estado edad')
        .skip(paginacion)
        .limit(limite)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            MdUsuario.count({ estado: EstadoReg }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuario: usuario,
                    NumReg: conteo
                })
            });


        })
})

app.post('/usuario', function(req, res) {

    let body = req.body;
    // res.json('post usuario')

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'

    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

    let usuario = new MdUsuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        edad: body.edad
    });

    usuario.save((err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        //Esta es una forma de devolver el objeto sin el password al mostrase en el postman pero como null
        // usuariodb.password = null

        res.json({
            ok: true,
            usuario: usuariodb
        });
    });

});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let cuerpo = _.pick(req.body, ['nombre', 'role', 'estado']);

    // Esta forma se hace cuando no se tiene muchos objetos a actualizar
    // delete cuerpo.password;
    // delete cuerpo.estado;

    MdUsuario.findOneAndUpdate(id, cuerpo, { new: true, runValidators: true }, (err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.json({
            ok: true,
            usuario: usuariodb
        });
    });

    // res.json('put usuario')
});

app.delete('/usuario', function(req, res) {
    res.json('delete usuario')
})

module.exports = app;