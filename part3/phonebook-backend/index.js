// @ts-nocheck
const express = require('express')  //initializes express into a constant
const app = express() //initializes express app in a constant

const morgan = require('morgan')
const logger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
})

app.use(express.json()) //Enables express to accept JSON requests (JSON middleware). Parses raw data into body property of request object.
app.use(logger)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
//Set up the express server app to listen on port 3001


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

//set up a get route for homepage

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${persons.length} people<div><div>${new Date}<div>`)
})

//set up a get route for info page

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//set up a get route for all people in phonebook

app.get('/api/persons/:id', (request, response) => {
    const requestedID = Number(request.params.id)
    const requestedPerson = persons.find(person => person.id == requestedID)
    if (!requestedPerson) {
        response.status(404).send('Not found')
    } else {
        response.send(requestedPerson)
    }
})

//set up a get route using params entered into the URL for a person with specific ID

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

//set up delete route using params entered into the URL for specific person from phonebook with specific ID

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

//add person object to phonebook