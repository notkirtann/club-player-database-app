import jwt from 'jsonwebtoken';
import Club from '../models/club.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const club = await Club.findOne({ 
            _id: decoded._id,  
            'tokens.token': token 
        });

        if (!club) {
            throw new Error('Club not found');
        }

        req.token = token;
        req.club = club;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default auth;