const http = require('http')
const express = require('express');
const { response } = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { token } = require('morgan');


const app = express();
app.use(express.json())

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

// Middlewares
app.use(morgan('tiny'));
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});


app.get('/api/persons', (request, response) =>{
  response.json(persons)
})

app.get('/info', (req, res) => {
  const header = `Phonebook has info for ${persons.length} people`
  const date = new Date();
  res.send(header + "<br/><br/>" + date);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if(person){
  response.json(person);
  } else {
    response.status(404).end();
  }
})



app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
})

app.post('/api/persons', morgan(':body'), (request, response) => {
  const person = request.body;
  const ids = persons.map(person => person.id);
  const maxId = Math.max(...ids);
  const names = persons.map(person => person.name)
  const findName = names.find(name => {
    return name === person.name;
  })
  if(!person.name || !person.number){
    response.status(400).json({
      error: "Content missing"
    });
  } else if(findName === person.name){
    response.status(406).json({
      error: "Name must be unique"
    })
  } else {
    const newPerson = {
      id: maxId + 1,
      name: person.name,
      number: person.number 
    };
    persons = [...persons, newPerson];
    response.status(204).json(newPerson);
  
  }
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})