const http = require('http')
const express = require('express')

const app = express();
app.use(express.json())

const persons = [
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

app.get('/api/persons', (request, response) =>{
  response.json(persons)
})

app.get('/info', (req, res) => {
  res.json(`Phonebook has info for ${persons.length} people`);
  res.json(new Date.toISOSting());
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})