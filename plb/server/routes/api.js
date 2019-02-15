const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const User = require('../modelos/user');
const Course = require('../modelos/cursos');
const Category = require('../modelos/categorias');
var VerifyToken = require('../auth/VerifyToken');
var config = require('../config');

const cnx = 'mongodb://lintellect:lintellect1@ds135305.mlab.com:35305/crudlogin';

mongoose.connect(cnx, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.error("Error => " + error);
    } else {
        console.log("Conectando con MongoDb");
    }
});

router.get('/', (req, res) => {
    res.send({
        status: "ok",
        msg: 'From API LOGIN'
    });
});

/**
 * Registro de Usuarios a la app
 */
router.post('/register', (req, res) => {
    let userData = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 13);
    userData.password = hashedPassword;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
            res.status(500).send({
                auth: false,
                status: "error",
                msg: "problemas al registrar el usuario."
            });
        } else {
            let payload = {
                subject: registeredUser._id
            };
            let token = jwt.sign(payload, config.secret, {
                expiresIn: 300
            });
            res.status(200).send({
                auth: true,
                status: "ok",
                token: token
            });
        }
    });
});

/**
 * Login de usuarios
 */
router.post('/login', (req, res) => {
    let userData = req.body;
    console.log(userData);

    User.findOne({
        userName: userData.userName
    }, (error, user) => {
        if (error) res.status(500).send({
            auth: false,
            status: "error",
            msg: 'Error en el server.'
        });
        if (!user) res.status(401).send({
            auth: false,
            status: "error",
            msg: 'Usuario Invalido'
        });

        if (!error && user) {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                res.status(401).send({
                    auth: false,
                    status: "error",
                    msg: 'Password Invalido'
                });
            } else {
                let payload = {
                    subject: user._id
                };
                let token = jwt.sign(payload, config.secret, {
                    expiresIn: 300
                });
                res.status(200).send({
                    auth: true,
                    status: "ok",
                    token: token
                });
            }
        }

    });
});

/**
 * Permite realizar el logout de la app
 */
router.get('/logout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

/**
 * Verifica la existencia del token con el usuario logeado
 */
router.get('/me', VerifyToken, function (req, res, next) {

    User.findById(req.userId, {
        password: 0
    }, function (err, user) {
        if (err) return res.status(500).send({
            auth: false,
            status: "error",
            msg: "Existe un problema al buscar al usuario."
        });
        if (!user) return res.status(404).send({
            auth: false,
            status: "error",
            msg: "Usuario no encontrado"
        });
        res.status(200).send({
            status: "ok",
            objetos: user
        });
    });

});

///---------------------------------------------------------------------
/**
 * Adicionar Categoria
 */
router.post('/categoria', (req, res) => {
    let categoryData = req.body;

    let categoria = new Category(categoryData);
    categoria.save((error, registeredCategory) => {
        if (error) {
            res.status(500).send({
                auth: false,
                status: "error",
                msg: "problemas al registrar categoria."
            });
        } else {
            res.status(200).send({
                status: "ok",
                objetos: registeredCategory
            });
        }
    });
});

/**
 * obtener todas las categorias
 */
router.get('/allcategory', (req, res) => {
    Category.find({}, function (err, categories) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "problemas al buscar las categorias."
        });
        res.status(200).send({
            status: "ok",
            objetos: categories
        });
    });
});

/**
 * obtener por ID una categoria
 */
router.get('/categoria/:id', function (req, res) {
    Category.findById(req.params.id, function (err, categoria) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "Problemas al buscar la categoria"
        });
        if (!categoria) return res.status(404).send({
            status: "error",
            msg: "Categoria no Encontrada"
        });
        res.status(200).send({
            status: "ok",
            objetos: categoria
        });
    });
});

/**
 * Borrar categoria de la DB
 */
router.delete('/categoria/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err, categoria) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "Problemas al borrar categoria."
        });
        res.status(200).send({
            status: "ok",
            msg: "Categoria Eliminada."
        });
    });
});

/**
 * Actualizar Categoria
 */
router.put('/categoria/:id', /* VerifyToken, */ function (req, res) {
    Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, categoria) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "problema al actualizar categoria"
        });
        res.status(200).send({
            status: "ok",
            objetos: categoria
        });
    });
});

//---------------------------------------------------
/**
 * Adicionar Cursos
 */
router.post('/cursos', (req, res) => {
    let courseData = req.body;

    let curso = new Course(courseData);
    curso.save((error, registeredCourse) => {
        if (error) {
            res.status(500).send({
                auth: false,
                status: "error",
                msg: "problemas al registrar Curso."
            });
        } else {
            res.status(200).send({
                status: "ok",
                objetos: registeredCourse
            });
        }
    });
});

/**
 * obtener todas los cursos
 */
router.get('/allcourses', (req, res) => {
    Course.find({}, function (err, courses) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "problemas al buscar los cursos."
        });
        res.status(200).send({
            status: "ok",
            objetos: courses
        });
    });
});

/**
 * obtener por ID un curso
 */
router.get('/cursos/:id', function (req, res) {
    Course.findById(req.params.id, function (err, curso) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "Problemas al buscar el curso"
        });
        if (!curso) return res.status(404).send({
            status: "error",
            msg: "Curso no Encontrado"
        });
        res.status(200).send({
            status: "ok",
            objetos: curso
        });
    });
});

/**
 * Borrar categoria de la DB
 */
router.delete('/cursos/:id', function (req, res) {
    Course.findByIdAndRemove(req.params.id, function (err, curso) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "Problemas al borrar Curso."
        });
        res.status(200).send({
            status: "ok",
            msg: "Curso Eliminado."
        });
    });
});

/**
 * Actualizar Categoria
 */
router.put('/cursos/:id', /* VerifyToken, */ function (req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, curso) {
        if (err) return res.status(500).send({
            status: "error",
            msg: "problema al actualizar Curso"
        });
        res.status(200).send({
            status: "ok",
            objetos: curso
        });
    });
});


module.exports = router;