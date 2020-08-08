const commentSchema = require('../models/comments');

async function addComment(req, res) {
    try {
        const {
            name,
            email,
            message
        } = req.body
        const comment = commentSchema({
            name,
            email,
            message
        })
        const commentStored = await comment.save()
            /* res.status(201).send({ commentStored }) */
        res.render('thanks', { nombre: req.body.name, email: req.body.email })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

async function getComments(req, res) {
    const comments = await commentSchema.find().lean().exec() //lean lo convierte a objetos planos de js,
        //exec es para ejecutar la conslta
        /* res.status(200).send({ comments }) */
    res.render('comments', {
        comments: comments,
        commentIndex: 0,
        rowsIndex: 0
    })
}

async function deleteComment(req, res) {
    commentSchema.find({ _id: req.params.id }).deleteOne({ _id: req.params.id }, function(error) {
        if (error) {
            res.send('Error al intentar eliminar el personaje.');
        } else {
            res.redirect('/comments');
        }
    });
}
async function editComment(req, res) {
    commentSchema.findById(req.params.id, function(err, documento) {
        if (err) {
            res.send('Error al intentar modificar el personaje.');
        } else {
            var comment = documento;
            comment.name = req.body.name;
            comment.email = req.body.email;
            comment.message = req.body.message;
            comment.save(function(error, documento) {
                if (error) {
                    res.send('Error al intentar guardar el personaje.');
                } else {
                    res.redirect('/comments');
                }
            });
        }
    });
}
async function editPage(req, res) {
    const commentEdit = await commentSchema.findOne({ '_id': req.params.id }, 'name email message', function(err, comment) {
        if (err) return handleError(err);
        console.log('name: %s email: %s message: %s.', comment.name, comment.email,
            comment.message);
        res.render('index', { nombre: comment.name, email: comment.email, message: comment.message, linkForm: `/comments/${req.params.id}/edit`, titleForm: 'Editar Comentario', controlsButton: 'Regresar' })
    });
}

module.exports = {
    addComment,
    getComments,
    deleteComment,
    editComment,
    editPage
}