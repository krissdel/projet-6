require("dotenv").config();                //charge les variables d'environnement à partir d'un .env fichier dans process.env
const express    = require('express');
const helmet     = require ('helmet');     // aide à sécuriser l'applications Express en définissant divers en-têtes HTTP
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');    //facilite les interactions avec la base de données MongoDB
const path       = require('path');
const cors       = require('cors');   //Cross Origin Resource Sharing (accéde à notre API/ajoute les headers/envoie requêtes  GET,POST...)

const userRoutes  = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(cors());

app.use(helmet());

app.use(bodyParser.json()); // Transforme le corps de la requête en un objet JSON



// ----- [indique à Express qu'il faut gérer les images de manière statique]-------------------------------
app.use('/images', express.static(path.join(__dirname, 'images'))); 


//-----[route]---------------------------------------------------------------------------------------------

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);




module.exports = app;



