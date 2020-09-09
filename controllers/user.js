const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');



exports.signup = async (req, res, next) => {
    // bcrypt.hash(req.body.password, 10)
    // .then(hash => {
    //     const user = new user({
    //         email: req.body.email,
    //         password: hash
    //     });
    //     user.save()
    //         .then(() => rest.status(201).json({ message: 'Utilisateur créé !'}))
    //         .catch(error => rest.status(400).json({ error }));

    // })
    // .catch(error => rest.status(500).json({ error }));

    try {
        const hash = await bcrypt.hash(req.body.password, 10); // [10 est le salt (10 tours)]
        console.log('hash');
        const user = new userModel({
            email: req.body.email,
            password: hash
        
        });
        console.log('user');
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé !' });
        next();
    }
    catch (error) {
        res.status(500).json({ error });
    }
    
};

exports.login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(401).json({ error: 'Utilisateur non trouveé !' });
        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' });
        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_SECRET_KEY',
                { expiresIn: '24h' }
            )
            
        });
        console.log('user');
        console.Log('valid');
        next();
    }
    catch (error) {
        res.status(500).json({ error });
    }
};