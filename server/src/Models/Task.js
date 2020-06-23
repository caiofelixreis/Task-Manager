const mongoose = require('../Database')

const TaskSchema = new mongoose.Schema({
    
    description:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task