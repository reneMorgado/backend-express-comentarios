const express = require('express')
const path = require('path')
const dbConfig = require('./config');
const app = express();
const indexRoute = require('./routes/form.js')
var parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

const connectDb = require('./db/mongodb') //BD



var parser = require('body-parser');

app.use(parser())

app.set('port', process.env.PORT || 8001);



app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use('/', indexRoute)


async function initApp(dbConfig) {
    try {
        connectDb(dbConfig) //BD
        app.listen(app.get('port'), () => {
            console.log('app launched on port: ' + app.get('port'))
        })
    } catch (e) {
        console.log(e)
        process.exit(0)
    }
}
initApp(dbConfig)