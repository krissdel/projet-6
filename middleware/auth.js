const jwt = require('jsonwebtoken'); 
require("dotenv").config();

// module.exports = (req, res, next) => {
//     // next();
//     // return
//     try {            
//         console.log("1>");
//         const token = req.headers.authorization.split(' ')[1];


//         console.log("2>", token);
//             try{
//                 const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

//             }catch(err){
//                 console.log('>>>>>>>>>>>>>>>>', err)
//             }


//         console.log("3>", decodedToken);

//         const userId = decodedToken.userId;


//         console.log("4>", userId, req.body.userId && req.body.userId !== userId);

//         if(req.body.userId && req.body.userId !== userId) {
//             throw 'user ID non valable !';    
//         }else {
//             next();
//         }
//         }catch(error) {
//         res.status(401).json({ error: error | 'Requète non authentifiée !'});
        
//     }
   
    
// };




module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("ID non valable !");
    } else {
      next();
    }
  } catch {
    res.status(401).json({error: Error || 'Invalid request!'})
  } 
    
};

  
