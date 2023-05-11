//@ts-nocheck

const mongoose = require('mongoose')

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

if (process.argv.length < 3) {
    console.log('give password as argument at least')
    process.exit(1)
}

const url = 'test'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name,
    number,
})

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

}
else {
    person.save().then(result => {
        console.log('person saved!', result)
        mongoose.connection.close()
    })
}

