require("dotenv").config();  //charge les variables d'environnement à partir d'un .env fichier dans process.env
const jwt = require('jsonwebtoken');  //crée et vérifie les TOKEN
  


// -----[ protége les routes et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi des requêtes. ]------------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("ID non valable !");
    } else {
      next();
    }
  } catch {
    res.status(401).json({error: Error || 'Invalid request!'})
  } 
    
};

  
