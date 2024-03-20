const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile.development);

class User {
    async createUser(req, res){
        try{
            const {name, email, password} = req.body;

            const data = await knex("dish")
            .insert({
                name: name,
                email: email,
                password: password,
            })
            
        }catch(err){ 
            console.log("error", err)
        }
    }
}