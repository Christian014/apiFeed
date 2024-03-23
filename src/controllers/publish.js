const knexfile = require("../../knexfile");                                       
const knex = require("knex")(knexfile.development);
const AppError = require("../utils/appError")

class Publish {
    async createPublish(req, res){
        try{
            const {text, id} = req.body;

            const data = await knex("publish")
            .insert({
                text: text,
                user_id: id,
            })

            return res.status(200).json(data)
            
        }catch(err){
            
            
            return res.status(500)
            
        }
    }

    async previewPublish(req, res){
        try{
            const data = await knex.select("*").from("publish");

            if (data.length > 0) {
                console.log(data);
                res.status(200).json(data);
            } else {
                res.status(404).send("No publish found");
            }
        }catch(err){ 
            console.log("error", err)
        }
    }
}

module.exports = Publish;