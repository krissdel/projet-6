const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {            
        console.log("1>", req);
        const token = req.headers.authorization.split('')[1];


        console.log("2>", token);

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');


        console.log("3>", decodedToken);

        const userId = decodedToken.userId;


        console.log("3>", userId, req.body.userId && req.body.userId !== userId);

        if(req.body.userId && req.body.userId !== userId) {
            throw 'user ID non valable !';    
        }else {
            next();
        }
        }catch(error) {
        res.status(401).json({ error: error | 'Requète non authentifiée !'});
        
    }
   
    
};