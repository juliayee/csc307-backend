//link frontend backend 
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result1 = findUserByName(name);
        let result2 = findUserByJob(job);
        let result = result1 && result2;
        result = {users_list: result};
        res.send(result);
    }
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    if (job != undefined){
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

 app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    let id = randomID();
    req.body['id'] = id;
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

function randomID(){
    const az = "abcdefghijklmnopqrstuvwxyz";
    let letters = "";
    let numbers = "";
    for (let i = 0; i < 3; i++) {
        letters = letters.concat(az[Math.floor(Math.random() * az.length)]);    
    }
    for (let i = 0; i < 3; i++) {
        numbers = numbers.concat(Math.floor(Math.random() * 100).toString);
    }
    let id = id.concat(letters, numbers);
    return id;
}

function addUser(user){
    users['users_list'].push(user);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.delete('/users/:id', (req, res) => {
    const userToDelete = req.params['id'];
    let id = findUserById(userToDelete);
    if (id === undefined || id.length == 0){
        res.status(404).send('Resource not found.').end();
    }
    else{
        users['users_list'] = users['users_list'].filter((user)=>user['id'] !== id);
        res.send(id);
        res.status(204).end();
    }
    
});

function findIndexById(id) {
    return users['users_list'].findIndex( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function deleteUser(id){
    users['users_list'].splice(id, 1);
}
