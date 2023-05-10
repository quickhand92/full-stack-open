// @ts-nocheck
const Person = require('./models/person')
const express = require('express')  //initializes express into a constant
const app = express() //initializes express app in a constant

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

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
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(express.json()) //Enables express to accept JSON requests (JSON middleware). Parses raw data into body property of request object.
app.use(logger)

const PORT = process.env.PORT || 3001


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
//Set up the express server app to listen on port 3001


// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('Main Page')
})

//set up a get route for homepage

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then((count) => {
            response.send(`<div>Phonebook has info for ${count} people<div><div>${new Date}<div>`)
        })
        .catch((error) => {
            console.log(error)
        })
})

//set up a get route for info page

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

//set up a get route for all people in phonebook

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

//set up a get route using params entered into the URL for a person with specific ID

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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
        const person = new Person(
            {
                id: newID,
                name: body.name,
                number: body.number
            }
        )
        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
        // persons = persons.concat(personObject)
        // return response.status(200).json(request.body)
    }
})
//add person object to phonebook

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})