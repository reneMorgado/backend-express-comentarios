const mongoose = require('mongoose')
mongoose.connection.on('open', () => console.log('db-connected'))

async function connectDb({ host, port, dbName }) {
    const uri = `mongodb://localhost:${port}/comments`
    await mongoose.connect(uri, { useNewUrlParser: true })
}

module.exports = connectDb