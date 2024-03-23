const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development);

const AppError = require("../utils/appError");

const { sign } = require("jsonwebtoken")
const configJwt = require("../utils/jwt");

const Crypto = require("../utils/cryptoPassword");
const crypto = new Crypto()

class User {
    async createUser(req, res){
        try{
            const {name, email, password} = req.body;

            const passwordCrypto = await crypto.cryptoPassword(password);

            const data = await knex("users")
            .insert({
                name: name,
                email: email,
                password: passwordCrypto,
            })
            
        }catch(err){ 
            console.log("error", err)
        }
    }

    async dataUsers(req, res){
        try{
            const {email, password} = req.body;
            const data = await knex("users")
            .select("*").where("email", email).first()

            if(!data){
                const error = new AppError("Email e/ou Senha Inválido", 404)
                return res.send(error)
            }

            const compare = await crypto.cryptoCompare(password, data.password)
            console.log(compare)

            if(compare === false){
                throw new AppError("Email e/ou Senha Inválido", 404)
            }

            const { secret, expiresIn } = configJwt.jwt;

            const token = sign({}, secret, {
                subject: String(data.id),
                expiresIn
            })

            return res.status(200).json({data, token})
            
        }catch(err){ 
            console.log("error", err)
        }
    }
}

module.exports = User;