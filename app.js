const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://kriss:Moon_74@cluster0.zsyla.mongodb.net/SoPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//=====[]==============================================================================


// app.post('/api/auth/signup', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: 'signup'
//     });
// });

// app.post('/api/auth/login', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Sauces({
//         ...req.body
//     });
//     sauces.save()
//     .then(() => res.status(201).json({message: ''}))
//     .catch(() => rest.status(400).json({ error}));
// });

module.exports = app;