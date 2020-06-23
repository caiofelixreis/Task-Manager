const express = require('express')

const router = express.Router()

const Task = require('../Models/Task')


router.get('/list', async (req, res) => {
    try {
        const tasks = await Task.find()

        return res.send(tasks)
    } catch (err) {
        return res.status(400).send({ error: 'Error listing tasks', err })
    }
})

router.post('/create', async (req, res) => {

    const { description } = req.body
    try {
        if (await Task.findOne({ description })) {
            return res.json({ error: 'Task already exists' })
        }

        const task = await Task.create(req.body)

        return res.send(task)

    } catch (err) {
        return res.status(400).send({ error: 'Error creating task', err })
    }


})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(id)

        return res.send(task)

    } catch (err) {
        return res.status(400).send({ error: 'Error deleting task', err })
    }

})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {

        const task = await Task.findByIdAndUpdate(id, {
            '$set': req.body
        })

        return res.send(task)

    } catch (err) {
        return res.send({ error: 'Error updating task', err })
    }
})

router.post('/filter', async (req, res) => {
    const { search } = req.body
    console.log(req.body)

    try {
        const tasks = await Task.find()

        const filteredTask = Array()

        tasks.map(task => {
            const description = task.description
            if (description.includes(search)) {
                filteredTask.push(task)
            }
        });

        return res.json(filteredTask)
    } catch (err) {
        return res.status(400).send({ error: 'Error filtering tasks', err })
    }

})

router.get('/unic/:id', async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findById(id)
        console.log(task)

        return res.json({ task })
    } catch (err) {
        return res.json({ error: 'Task not found', err })
    }
})

module.exports = app => app.use('/', router)