const { verify } = require("jsonwebtoken");
const configJwt = require("../utils/jwt");
const AppError = require("../utils/appError");

function ensureAuthenticated(req, res, next){

    const authHeader = req.headers.authorization;

    if(!authHeader){
       return res.status(401).json({message:"erro"})
        
    }

    const [, token] = authHeader.split(" ");

    try{

        const {sub: user_id} = verify(token, configJwt.jwt.secret);
        req.user = {
            id: Number(user_id),
        };

        
        return next()
        
    }catch{

        throw new AppError("Error", 401);
    }
}

module.exports = ensureAuthenticated;