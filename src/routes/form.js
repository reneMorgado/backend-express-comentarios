const express = require('express');
const app = express();
const router = express.Router();
const { addComment, getComments, deleteComment, editComment, editPage } = require('../controllers/commentController')
var parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(parser())

router.post('/form', addComment)
router.get('/form', (req, res) => {
    res.render('index', { nombre: 'Nombre', email: 'Email', message: 'Comentario', linkForm: '/form', titleForm: 'Añadir Comentario', controlsButton: 'Ver Comentarios' })
})
router.get('/comments', getComments);
router.post('/comments/:id', deleteComment);

router.post('/comments/:id/edit', editComment);
router.get('/comments/:id/edit', editPage);
module.exports = router;