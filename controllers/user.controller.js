const {User} = require('../models')
const Joi = require('@hapi/joi');
const {Op} = require('sequelize')
const bcrypt = require("bcrypt");

module.exports.create = async (req,res) => {
    try {
        const {full_name,username,password} = req.body
        const validator = userValidator(req.body)
        if(validator.error){
            let message = validator.error.details.map(err => err.message);
            res.status(400).send(message)
        }
        let hashPassword = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
        const user = await User.create({
            full_name,username,password: hashPassword
        }) 
        res.status(201).send({
            object: user,
            message: "Foydalanuvchi yaratildi"
        })
    } catch (error) {
        res.status(409).json(error.message)
    }
}

userValidator = (fields) => {
    const validatorSchema = {
        full_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.required(),
    }
    return Joi.validate(fields,validatorSchema);
}