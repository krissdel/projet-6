// require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  //crée et vérifie les TOKEN
const User = require('../models/User');


exports.signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10); // [10 est le salt (10 tours)]
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        await user.save()
        // res.status(201).json({ message: 'Utilisateur créé !' })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(() => res.status(500).json({ message: 'mot de passe incorrect !' }));
    }
    
    // catch { res.status(501).json({ message: 'utilisateur déjas crée!' });
      // }
      catch (error) {res.status(500).json({ error: 'utilisateur non trouvé !' });
  }

};





exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouveé !' });
        }
        const valid = await bcrypt.compare(req.body.password, user.password)
        
        .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: "Mot de passe incorrect !" });
             }
                        res.status(200).json({
                          userId: user._id,
                          token: jwt.sign(
                            { userId: user._id },
                            'TOKEN_SECRET_KEY',
                            { expiresIn: "24h" },
                          ),
                        });
                      })
        .catch(error => {
          // console.error(error);
          res.status(500).json({ error })
        });
                  }
    
    
    catch (error) {
      // console.error(error);
      return res.status(500).json({ error });
  };

};


