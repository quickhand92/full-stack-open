// @ts-nocheck
const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('Main Page')
})

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people<div><div>${new Date}<div>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const requestedID = Number(request.params.id)
    const requestedPerson = persons.find(person => person.id == requestedID)
    if (!requestedPerson) {
        response.status(404).send('Not found')
    } else {
        response.send(requestedPerson)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const requestedID = Number(request.params.id)
    const requestedPerson = persons.find(person => person.id == requestedID)
    if (!requestedPerson) {
        response.status(404).send('Not found')
    } else {
        persons = persons.filter(person => person.id != requestedID)
        response.status(200).send('Successfully deleted')
    }
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    const newID = Math.floor((Math.random() * 100000000))

    if (!body || !body.number || !body.name) {
        return response.status(400).json({
            error: 'Number or name is missing from request.'
        })
    }

    if (persons.find(person => person.name == body.name)) {
        return response.status(409).json({
            error: 'Name already exists in phonebook'
        })
    }
    else {
        const personObject = {
            id: newID,
            name: body.name,
            number: body.number
        }
        persons = persons.concat(personObject)
        return response.status(200).json(request.body)
    }
})