const {User} = require('../models')
const Joi = require('@hapi/joi');
const {Op} = require('sequelize')
const bcrypt = require("bcrypt");

module.exports.create = async (req,res) => {
    try {
        const {full_name,username,password} = req.body
        const validatorSchema = {
            full_name: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.required(),
        }

        const result = Joi.validate(req.body,validatorSchema);
        if(result.error){
            let message = result.error.details.map(err => err.message);
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
        res.status(400).json(error.message)
    }
}