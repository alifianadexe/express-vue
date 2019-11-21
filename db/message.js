const Joi = require('@hapi/joi');
const db = require('./connection');

const schema = Joi.object().keys({
   username: Joi.string().alphanum().required(),
   subject:Joi.string().required(),
   message: Joi.string().max(500).required(),
   imageURL: Joi.string().uri({
    scheme:[
        /https?/
    ]
   })
});

const data = db.get('messages');

function getAll(){
    return data.find();
}

function create(message){
    if(!message.username){
        message.username = 'Anonymous';
    }

    const result = schema.validate(message);
    if(result.error == null){
        message.created = new Date();
        return data.insert(message);
    }else{
        return Promise.reject(result.error);
    }
}

module.exports = {
    create, getAll
}