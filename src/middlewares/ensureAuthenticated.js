const { verify } = require("jsonwebtoken");
const configJwt = require("../utils/jwt");
const AppError = require("../utils/appError");

function ensureAuthenticated(req, res, next){

    console.log("sdadsadsadssa")
    const authHeader = req.headers.authorization;

    if(!authHeader){
        const res = new AppError("Token vazio", 404)
        return next(res)
    }

    const [, token] = authHeader.split(" ");

    try{

        const {sub: user_id} = verify(token, configJwt.jwt.secret);
        req.user = {
            id: Number(user_id),
        };

        console.log("com token")
        return next()
        
    }catch(err){
        const res = new AppError("Error", err)
        return next(res)
    }
}

module.exports = ensureAuthenticated;