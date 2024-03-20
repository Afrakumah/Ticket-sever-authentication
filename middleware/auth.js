import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const authUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        //jwt allows to pass payload.and allows to hide details
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('wrong token')
            } else {
                console.log({decoded})
                //using id in decoded to grab user in the db by id
                const user = await User.findById(decoded.id)
                //customize req object by adding user
                req.user = user
                // console.log(user)
                next();
            }
        })
    } else {
        res.status(401);
        throw new Error('no token');
    }

    

}