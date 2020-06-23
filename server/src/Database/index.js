const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo', { useFindAndModify: false ,useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise

module.exports = mongoose